const bomManagerService = require('../../service/bom/bomManager.js')
const bomItemService = require('../../service/bom/bomItem.js')
const bomItemModel = require('../../model/bom/bomItem')
const moment = require('moment')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')
const  delDir = require('../../helpers/clean/deleteDir.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const log4js = require('../../utils/logger/logger')
const _ = require('lodash')

const logger = log4js.getLogger('bomItemAPI')

class BomItem {
  async getBomAssignList(ctx) {
    let { bomID } = ctx.params
    let userID = ctx.request.user.userID

    if(!bomID){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }

    const queryRes = await bomItemService.getBomAssignList(bomID, userID)

    if(queryRes) {
      ctx.body = queryRes
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getBomItemByItemId(ctx){
    let { bomID, bomItemID, assign } = ctx.params
    let userID = ctx.request.user.userID
    let { versionid } = ctx.request.body
    if(!bomItemID || !bomID || !assign){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    // 檢查是否有這個product type的權限
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    // 20190925 add get history data
    let queryRes = {}
    if(versionid && versionid.toUpperCase() != 'CURRENT'){
      queryRes = await bomItemService.getBomItemHistroyByItemId(versionid, bomItemID)
    }else{
      queryRes = await bomItemService.getBomItemByItemId(bomID, bomItemID, assign, userID)
    }

    ctx.body = queryRes
    ctx.status = 200
  }

  async updateBomItemCost(ctx){
    let { bomID } = ctx.params
    let userID = ctx.request.user.userID
    if(!bomID){
      throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
    }
    let { bomItems } = ctx.request.body
    if(!bomItems || bomItems.length === 0){
      throwApiError('missing data.', errorCode.INVALIDCONTENT)
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    try {
      let itemCostHistory = await bomItemService.updateBomItemCost(bomID, bomItems, userID)
      let sourcerCostHistory = await bomItemService.updateBomItemSourcerCost(bomID, bomItems, userID)

      await bomItemService.insertItemCostEditHistory(bomID, userID, sourcerCostHistory, itemCostHistory)

      ctx.status = 200
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }
  async updateBomItemSourcerCost(ctx){
    let { bomID } = ctx.params
    let userID = ctx.request.user.userID
    if(!bomID){
      throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
    }
    let { bomItems } = ctx.request.body
    if(!bomItems || bomItems.length === 0){
      throwApiError('missing data.', errorCode.INVALIDCONTENT)
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    try {
      let sourcerCostHistory = await bomItemService.updateBomItemSourcerCost(bomID, bomItems, userID)
      await bomItemService.insertItemCostEditHistory(bomID, userID, sourcerCostHistory)

      ctx.status = 200
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }
  async updateBomItemLastPriceByBomId(ctx){
    let { bomID } = ctx.params
    let userID = ctx.request.user.userID
    const { request: req } = ctx
    let isUpdateAll = true
    if(req.body.updatesomepart){
      isUpdateAll = !req.body.updatesomepart
    }
    if(!bomID){
      throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    try {
      const result = await bomItemService.updateBomItemLastPriceByBomId(bomID, isUpdateAll)
      ctx.status = 200
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async updateBomItemCostWhenIsParent(ctx) {
    // let userID = ctx.request.user.userID
    try {
      const result = await bomItemService.updateBomItemCostWhenIsParent()
      ctx.status = 200
    } catch (err) {
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async setAllOrderId(ctx) {
    try {
      const result = await bomItemService.setAllOrderId()
      ctx.status = 200
    } catch (err) {
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async downloadTemplate(ctx) {
    try {
      const resultPath = '/server/utils/me-template/ME_Input_BOM_ME_051520.xlsm'
      ctx.attachment(resultPath)
      ctx.body = 'download successs'
      ctx.status = 200
      await send(ctx, resultPath)
    } catch (err) {
      throwApiError(err, errorCode.DATANOTFOUND)
      return
    }
  }

  async updateTemplate(ctx) {
    try {
      const file = ctx.request.files.File
      const reader = fs.createReadStream(file.path)

      let filePath = path.resolve(__dirname, '../../utils/me-template')
      let fileResource = `${filePath}/ME_Input_BOM_ME.xlsm`

      const fileExistsStatus = fs.existsSync(fileResource)

      if (fileExistsStatus) {
        const newPath = `${filePath}//ME_Input_BOM_ME_${moment(new Date()).format('YYYYMMDDhmmss')}.xlsm`
        fs.renameSync(fileResource, newPath)
      }

      let upStream = fs.createWriteStream(fileResource)
      await reader.pipe(upStream)

      ctx.status = 200
    } catch (error) {
      throwApiError(error, errorCode.updateFailed)
      return
    }
  }

  async getCompleteVersion(ctx) {
    try {
      let { bomID } = ctx.params
      let userID = ctx.request.user.userID
      if(!bomID){
        throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      }
      const result = await bomItemService.getAllCompleteVersion(bomID)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async getBomDetailByVersion(ctx) {
    try {
      let { bomID, assign } = ctx.params
      let { project, partlist, versionid, skuNum = 'sku1' } = ctx.request.body
      let userID = ctx.request.user.userID

      if (!bomID || !assign) {
        throwApiError('missing paramater', errorCode.ERRORFORMAT)
        return
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      }
      let queryRes = null
      // 20190920 has versionid data from bom_item_complete_version table, else from bom_item table
      // 20190920 only CE/ME_EE, CE/ME can check history version
      if (versionid && versionid.toUpperCase() != 'CURRENT') {
        // CE
        let versionCompletePermission = await rbacService.getPolicyByUser(userID, {
          action: 'VersionComplete',
          resource: 'me_bom_projects',
        })
        if (!_.isEmpty(versionCompletePermission)) {
          queryRes = await bomItemService.getAllCompleteBomByVersion(versionid, assign, bomID, skuNum)
        } else {
          throwApiError('permission denied', errorCode.ERRORFORMAT)
        }
      } else{
        queryRes = await bomItemService.getBomItem(bomID, userID, assign, skuNum)
      }

      let res = {}
      if(queryRes){
        res = await bomItemService.getBomItemBySearch(queryRes, project, partlist)
      }

      ctx.body = res
      ctx.status = 200

    } catch (err) {
      logger.error('getBomDetailByVersion with error:', err)
      throwApiError(err, errorCode.ERRORFORMAT)
      return
    }
  }

  // 取得BOM item的驗証規則
  async getBomItemsValidRules(ctx) {
    const queryRes = await bomItemService.getRuleData()
    ctx.body = queryRes
    ctx.status = 200
  }

  async getBomItemsNoDependencyRule(ctx) {
    const queryRes = await bomItemService.getBomItemsNoDependencyRule()
    ctx.body = queryRes
    ctx.status = 200
  }
  async getBomItemHistory(ctx) {
    let { bomID } = ctx.params
    let { sourceItemID } = ctx.query
    // let userID = ctx.request.user.userID
    const queryRes = await bomItemService.getBomItemHistory(bomID, sourceItemID)
    ctx.body = queryRes
    ctx.status = 200
  }
  async getBomItemImage(ctx) {
    let { bomID, sourceItemID, type } = ctx.params

    try {
      const queryRes = await bomItemService.getBomItemImage(bomID, sourceItemID, type)
      ctx.body = queryRes
      ctx.status = 200
    } catch (err) {
      console.log(err.message, err.status)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = BomItem
