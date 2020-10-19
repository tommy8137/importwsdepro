const _ = require('lodash')
const partListSvc = require('../../service/bom/partList')
const bomItemService = require('../../service/bom/bomItem.js')
const bomVersionModel = require('../../model/bom/bomVersion.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { throwApiError, errorCode, apiErrorRes } = require('../../helpers/errorCode/apiErrorHelper.js')
const validator = require('validator')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('PartListCtrl')

class PartListCtrller {
  async getPartListLayout(ctx) {
    let { partlistname, product_type_id, product_type_name, bom_id } = ctx.params
    if (!partlistname) {
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    const queryRes = await partListSvc.getPartListLayout(partlistname, product_type_id, product_type_name, bom_id)
    if (queryRes) {
      ctx.body = queryRes
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getPartList(ctx) {
    try {
      const { bom_id } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.listPartListByBomId(bom_id)
      ctx.body = res
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }

  async updatePartList(ctx) {
    try {
      const { bom_id, part_type } = ctx.params
      if (!validator.isUUID(bom_id)) throw new Error('me bom input item id incorrect.')
      let req = ctx.request.body
      let res = await partListSvc.updatePartListByBomId(bom_id, part_type, req)
      ctx.body = res
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async getDefaultData(ctx) {
    try {
      const { bom_id, type1, type2, key, version } = ctx.params
      // const { versionid } = ctx.request.body
      let user = ctx.request.user
      let res = {}
      if(!version || (version && version.toUpperCase() != 'CURRENT')){
        res = await partListSvc.getHistoryDefaultData(bom_id, type1, type2, key)
      }else{
        res = await partListSvc.getDefaultData(bom_id, type1, type2, key)
      }
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async getDieInfo(ctx) {
    try {
      const { hmToolingStageDieCount, hmToolingProgressiveDieCount, hmToolingRivetingDieCount } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getDieInfo(hmToolingStageDieCount, hmToolingProgressiveDieCount, hmToolingRivetingDieCount)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getMaterialExpandSize(ctx) {
    try {
      const { hmpartsexpandwidth, hmpartsexpandlength, hmToolingMaterialWidth, hmToolingMaterialLength } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getMaterialExpandSize(hmpartsexpandwidth, hmpartsexpandlength, hmToolingMaterialWidth, hmToolingMaterialLength)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getNetWeight(ctx) {
    try {
      const { hmthickness, hmpartsexpandwidth, hmpartsexpandlength, hmmaterial } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getNetWeight(hmthickness, hmpartsexpandwidth, hmpartsexpandlength, hmmaterial)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getGrossWeight(ctx) {
    try {
      const { hmthickness, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmmaterial } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getGrossWeight(hmthickness, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmmaterial)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getStageDiePress(ctx) {
    try {
      const { hmToolingStageDieCount, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmToolingProgressiveDieStation } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getStageDiePress(hmToolingStageDieCount, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmToolingProgressiveDieStation)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getProgressiveDiePress(ctx) {
    try {
      const { hmToolingProgressiveDieCount, hmToolingProgressiveDieStation, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getProgressiveDiePress(hmToolingProgressiveDieCount, hmToolingProgressiveDieStation, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getRivetingDiePress(ctx) {
    try {
      const { hmToolingRivetingDieCount, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmToolingProgressiveDieStation } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getRivetingDiePress(hmToolingRivetingDieCount, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength, hmToolingProgressiveDieStation)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getGlueWeight(ctx) {
    try {
      const { productType, cmfProcessListThermalBondingPathLength, cmfProcessListThermalBondingGlueSyringeDiameter } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getGlueWeight(productType, cmfProcessListThermalBondingPathLength, cmfProcessListThermalBondingGlueSyringeDiameter)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async confirm(ctx) {
    try {
      const { type2 } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.confirm(type2)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async getPartWeightEnable(ctx) {
    try {
      const { type2 } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getPartWeightEnable(type2)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getMachineTon(ctx) {
    try {
      const { type2, hpToolingSizeWidth, hpToolingSizeLength, hpToolingSizeHigh } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getMachineTon(type2, hpToolingSizeWidth, hpToolingSizeLength, hpToolingSizeHigh)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getPaintingColor(ctx) {
    try {
      const { cmfPPaintingType } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getPaintingColor(cmfPPaintingType)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getPaintingVendor(ctx) {
    try {
      const { cmfPPaintingType } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getPaintingVendor(cmfPPaintingType)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async getMachinePrice(ctx) {

    try {
      const { hpToolingMachineTon, hpModule } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getMachinePrice(hpToolingMachineTon, hpModule)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async gethmMaterialPrice(ctx) {
    try {
      const { hmmaterial, hmthickness } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.gethmMaterialPrice(hmmaterial, hmthickness)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }
  }

  async getIntervalPrice(ctx) {
    try {
      const { bom_id, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength } = ctx.params
      let user = ctx.request.user
      let res = await partListSvc.getIntervalPrice(bom_id, hmToolingMaterialExpandWidth, hmToolingMaterialExpandLength)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C001000', errorCode.ERRORFORMAT)
    }

  }

  async uploadImage(ctx, next) {
    const userName = ctx.request.user.username
    const file = ctx.request.files.image
    const result = await partListSvc.uploadImage(file, userName)
    ctx.body = result
    ctx.status = 200
  }

  async getImage(ctx) {
    const { imageid } = ctx.params
    const result = await partListSvc.getImage(imageid)
    ctx.body = result
    ctx.status = 200
  }

  async getDropdownWithFilter(ctx) {
    const { parentItemName, fieldName, key } = ctx.params
    const result = await partListSvc.getDropdownWithFilter(parentItemName, fieldName, key)
    ctx.body = result
    ctx.status = 200
  }

  async updatePartListDetail(ctx){
    const { bom_item_id } = ctx.params
    const { formate, partlistValue, product_type_id, product_type_name } = ctx.request.body
    let { userID } = ctx.request.user
    let client = await new tsystemDB()
    try {
      if (!bom_item_id || !formate || _.isNil(partlistValue) || _.isNil(product_type_id) || _.isNil(product_type_name)) {
        apiErrorRes(ctx, 'missing paramaters', errorCode.ERRORFORMAT)
        return
      }
      let res = await partListSvc.updatePartList(bom_item_id, ctx.request.body, userID)

      if (res.isNeedUpdateVersion) {
        let bomRes = await bomVersionModel.getBomIdbyItemId(bom_item_id)
        await bomItemService.reCalPartlistPrice(client, bomRes[0].bom_id, true, [bom_item_id])
      }
      await client.commit()
      ctx.body = res
      ctx.status = 200
    }catch (err) {
      await client.rollback()
      logger.warn('error request for updatePartListDetail', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }

  async getCmfPaintingMachineType(ctx) {
    try {
      const { emdmVersion, projectCode, emdmppid } = ctx.params
      let res = await partListSvc.getCmfPaintingMachineType(emdmVersion, projectCode, emdmppid)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      if (err.message === 'NO_RESULT_ERROR') {
        ctx.body = { msg: '[NO_RESULT_ERROR]Can not find any result. Please check your param' }
        ctx.status = 400
        return
      }
      if (err.message === 'PARSING_ERROR') {
        ctx.body = { msg: '[PARSING_ERROR]Can not get cmfPaintingMachineType' }
        ctx.status = 400
        return
      }
      if (err.message === 'NOT_UNIQUE_ERROR') {
        ctx.body = { msg: '[NOT_UNIQUE_ERROR]Have Multiple Result' }
        ctx.status = 400
        return
      }
      ctx.body = { msg: '[Bad Request]' }
      ctx.status = 400
      return
    }
  }

  async getCmfPaintingCycleTime(ctx) {
    try {
      const { emdmVersion, projectCode, emdmppid } = ctx.params
      let res = await partListSvc.getCmfPaintingCycleTime(emdmVersion, projectCode, emdmppid)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      if (err.message === 'NO_RESULT_ERROR') {
        ctx.body = { msg: '[NO_RESULT_ERROR]Can not find any result. Please check your param' }
        ctx.status = 400
        return
      }
      if (err.message === 'PARSING_ERROR') {
        ctx.body = { msg: '[PARSING_ERROR]Can not get cmfPaintingCycleTime' }
        ctx.status = 400
        return
      }
      if (err.message === 'NOT_UNIQUE_ERROR') {
        ctx.body = { msg: '[NOT_UNIQUE_ERROR]Have Multiple Result' }
        ctx.status = 400
        return
      }
      ctx.body = { msg: '[Bad Request]' }
      ctx.status = 400
      return
    }
  }

  async getHmToolingMaterialExpand(ctx) {
    try {
      const { emdmVersion, projectCode, emdmppid, sizeL, sizeW, partCategory2Id, productTypeId } = ctx.params
      let res = null
      if (emdmVersion === 'null' || projectCode === 'null' || emdmppid === 'null') { // url path 給空字串會 404 故 null 是 字串'null'
        res = await partListSvc.calHmToolingMaterialExpand(sizeL, sizeW, partCategory2Id, productTypeId)
      } else {
        res = await partListSvc.getHmToolingMaterialExpand(emdmVersion, projectCode, emdmppid)
      }
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      if(err.message && err.status) {
        logger.warn(err)
        ctx.body = err.message
        ctx.status = err.status
      } else {
        logger.error(err)
        ctx.status = errorCode.INTERNAL_ERROR
      }
      return
    }
  }

  async getCmfPaintingAreaInfo(ctx) {
    try {
      const { emdmVersion, projectCode, emdmppid } = ctx.params
      let res = await partListSvc.getCmfPaintingAreaInfo(emdmVersion, projectCode, emdmppid)
      ctx.body = res
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for bom_item', err)
      if (err.message === 'NO_RESULT_ERROR') {
        ctx.body = { msg: '[NO_RESULT_ERROR]Can not find any result. Please check your param' }
        ctx.status = 400
        return
      }
      if (err.message === 'PARSING_ERROR') {
        ctx.body = { msg: '[PARSING_ERROR]Can not get getCmfPaintingAreaInfo' }
        ctx.status = 400
        return
      }
      if (err.message === 'NOT_UNIQUE_ERROR') {
        ctx.body = { msg: '[NOT_UNIQUE_ERROR]Have Multiple Result' }
        ctx.status = 400
        return
      }
      ctx.body = { msg: '[Bad Request]' }
      ctx.status = 400
      return
    }
  }
  async getToolingMaterialInfo(ctx) {
    try {
      const { emdmVersion, projectCode, emdmppid } = ctx.params
      let res = await partListSvc.getToolingMaterialInfo(emdmVersion, projectCode, emdmppid)
      ctx.body = res
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for bom_item', err)
      if (err.message === 'NO_RESULT_ERROR') {
        ctx.body = { msg: '[NO_RESULT_ERROR]Can not find any result. Please check your param' }
        ctx.status = 400
        return
      }
      if (err.message === 'PARSING_ERROR') {
        ctx.body = { msg: '[PARSING_ERROR]Can not get ToolingMaterialInfo' }
        ctx.status = 400
        return
      }
      if (err.message === 'NOT_UNIQUE_ERROR') {
        ctx.body = { msg: '[NOT_UNIQUE_ERROR]Have Multiple Result' }
        ctx.status = 400
        return
      }
      ctx.body = { msg: '[Bad Request]' }
      ctx.status = 400
      return
    }
  }
}

module.exports = PartListCtrller
