/* eslint-disable no-magic-numbers */
const bomManagerService = require('../../service/bom/bomManager.js')
const bomItemModel = require('../../model/bom/bomItem')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const userService = require('../../service/admin/user.js')
const _ = require('lodash')
const fs = require('fs')
const moment = require('moment')
const mkdirp = require('async-mkdirp')
const path = require('path')
const send = require('koa-send')
const { imageLimit } = require('../../../config.js')
const log4js = require('../../utils/logger/logger')
const rbacService = require('../../service/admin/rbac.js')


const logger = log4js.getLogger('bomManagerAPI')

class BomManager {
  constructor() {
    this.getBomFilterType = this.getBomFilterType.bind(this)
    this.getBomFilterItems = this.getBomFilterItems.bind(this)
    this.updateBomData = this.updateBomData.bind(this)
    this.insertBomData = this.insertBomData.bind(this)
  }

  async getBomData(ctx) {
    // const { role } = ctx.params
    let user = ctx.request.user
    let { pages, items, orderBy, column, keyword, role } = ctx.query
    if (typeof pages == 'undefined' || typeof items == 'undefined') {
      throwApiError('pages or items or orderBy required', errorCode.ERRORFORMAT)
    }
    if (typeof keyword == 'undefined') {
      keyword = ''
    }
    let result = {}
    let res = await rbacService.getPolicyByUser(user.userID)
    if(!role){
      throwApiError('role type is required', errorCode.ERRORFORMAT)
    }
    if(res){
      if(res.View && res.View.allow && res.View.allow.includes('me_bom_projects') && role.toUpperCase() === 'ME' ) {
        result = await bomManagerService.getMeBomData(pages, items, orderBy, column, keyword, user.userID)
      } else if(res.List && res.List.allow && res.List.allow.includes('ee_bom_projects') && role.toUpperCase() === 'EE') {
        result = await bomManagerService.getEeBomData(pages, items, orderBy, column, keyword, user.userID)
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else{
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }

    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getBomDataBySearch(ctx) {
    let user = ctx.request.user
    let { pages, items, orderBy, column, keyword, role, project, disable = false } = ctx.query
    if (typeof pages == 'undefined' || typeof items == 'undefined') {
      throwApiError('pages or items or orderBy required', errorCode.ERRORFORMAT)
    }
    if (typeof keyword == 'undefined') {
      keyword = ''
    }
    if (typeof project == 'undefined') {
      project = ''
    }

    disable = disable == 'true'
    let result = {}
    let res = await rbacService.getPolicyByUser(user.userID)
    let userProductTypePermission = await userService.getPersonalUserProductType(user.userID, 'bom')

    if(!role){
      throwApiError('role type is required', errorCode.ERRORFORMAT)
    }
    if(res){
      if(res.List && res.List.allow && res.List.allow.includes('ee_bom_projects') && role.toUpperCase() === 'EE') {
        result = await bomManagerService.getEeBomDataBySearch(pages, items, orderBy, column, keyword, project, user.userID, userProductTypePermission)
      } else if(res.List && res.List.allow && res.List.allow.includes('me_bom_projects') && role.toUpperCase() === 'ME') {
        result = await bomManagerService.getMeBomDataBySearch(pages, items, orderBy, column, keyword, project, user.userID, userProductTypePermission)
      } else if(res.List && res.List.allow && res.List.allow.includes('me_bom_projects') && role.toUpperCase() === 'EMDM') {
        result = await bomManagerService.getEmdmBomDataBySearch(pages, items, orderBy, column, keyword, project, user.userID, userProductTypePermission, disable)
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else{
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }

    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getBomDetailInfo(ctx) {
    let userID = ctx.request.user.userID
    const { id } = ctx.params
    if(!id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, id)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    const result  = await bomManagerService.getMeBomDetailData(id)
    if(result){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async updateBomData(ctx) {
    let user = ctx.request.user
    const { id } = ctx.params

    if(!id || !ctx.request.body){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    if(!ctx.request.body.bomProject || !ctx.request.body.bomDesignee){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    if(!ctx.request.body.bomProject.version_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    // By spec assign people must smaller than 10, larger than 0
    if(ctx.request.body.bomDesignee.length <= 0){
      throwApiError('missing bomDesignee', errorCode.ERRORFORMAT)
      return
    }
    if(ctx.request.body.bomDesignee.length > 0){
      await this.checkDessign(ctx.request.body.bomDesignee, id)
    }

    let res = await rbacService.getPolicyByUser(user.userID, { resource: 'me_bom_projects', action: 'EditOwn' })
    if(res && res.EditOwn && res.EditOwn.allow){
      if(res.EditOwn.allow.indexOf('me_bom_projects') > -1 ){
        // 被assign至本BOM表且有Create權限的使用者才可進行編輯
        if(!await bomManagerService.checkEditUser(id, user.userID)){
          throwApiError('permission denied', errorCode.ERRORFORMAT)
          return
        }
      }else{
        throwApiError('permission denied', errorCode.ERRORFORMAT)
        return
      }
    }else{
      throwApiError('permission denied', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(user.userID, id)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }

    try{
      const result  = await bomManagerService.updateBomData(id, ctx.request.body)
      if (typeof result === 'string') {
        throwApiError(result, errorCode.ERRORFORMAT)
      }
      if(result){
        ctx.body = result
        ctx.status = 200
      }
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async insertBomData(ctx) {
    let user = ctx.request.user
    let res = await rbacService.getPolicyByUser(user.userID, { resource: 'me_bom_projects', action: 'CreateNextStatus' })

    if(!ctx.request.body || !ctx.request.body.bomProject || !ctx.request.body.bomDesignee){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    if(ctx.request.body.bomDesignee.length < 1){
      throwApiError('missing bomDesignee', errorCode.ERRORFORMAT)
      return
    }
    if(ctx.request.body.bomDesignee.length > 0){
      await this.checkDessign(ctx.request.body.bomDesignee)
    }

    if(!res || !res.CreateNextStatus || res.CreateNextStatus.allow.indexOf('me_bom_projects') < 0 ){
      throwApiError('permission denid', errorCode.ERRORFORMAT)
      return
    }
    try{
      const result  = await bomManagerService.insertBomData(user.userID, ctx.request.body)
      if (typeof result === 'string') {
        throwApiError(result, errorCode.ERRORFORMAT)
      }
      if(result){
        ctx.body = result
        ctx.status = 200
      }
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }
  }

  async getBomFilterType(ctx){
    let { role } = ctx.query
    let roleStr = this.getRoleString(ctx.request.user)
    if(role){
      roleStr = role
    }
    const res = bomManagerService.getBomFilterType(roleStr)
    ctx.body = res
    ctx.status = 200
  }

  async getBomFilterItems(ctx){
    const userID = ctx.request.user.userID
    const { column } = ctx.params
    let { role } = ctx.query
    let result = {}
    switch(role){
      case 'ME':
        result  = await bomManagerService.getBomFilterItems(column, userID)
        break
      case 'EMDM':
        result  = await bomManagerService.getBomFilterItems(column, userID, 'EMDM')
        break
      case 'EE':
        result  = await bomManagerService.getEEBomFilterItems(column, userID)
        break
    }

    ctx.body = { res : result }
    ctx.status = 200
  }

  getRoleString(user){
    let { isMe, isEe, isMeTmFm, isCe } = user
    return (isMe || isMeTmFm) ? 'ME' : isCe ? 'CE' : isEe ? 'EE' : 'OTHER'
  }

  async uploadImage(ctx, next) {
    const userName = ctx.request.user.username
    const dirDate = moment(new Date()).format('YYYYMMDD')
    const file = ctx.request.files.image
    let filePath = path.resolve(__dirname, `../../utils/uploadImage/${dirDate}`)
    const ext = file.name.split('.').pop()
    const fileNameTmp = file.path.slice(5)
    let fileResource = filePath + `/${fileNameTmp}.${ext}`
    const reader = fs.createReadStream(file.path)
    const ba64Convert = `data:image/${ext};base64,`
    if(file.size > imageLimit) {
      throwApiError('Image Oversize', errorCode.SIZELIMIT)
    }
    if(!fs.existsSync(filePath)) {
      await mkdirp(filePath)
      let upStream = fs.createWriteStream(fileResource)
      await reader.pipe(upStream)
    }else {
      let upStream = fs.createWriteStream(fileResource)
      await reader.pipe(upStream)
    }
    let ba64Tmp = fs.readFileSync(file.path, 'base64')
    const ba64Img = ba64Convert.concat(ba64Tmp)
    const result = await bomManagerService.uploadImage(fileNameTmp, fileResource, userName)
    ctx.body = {
      id: result,
      data: ba64Img,
    }
    ctx.status = 200
  }


  async updateBomStageAndVersion(ctx){

    let user = ctx.request.user
    const { id } = ctx.params

    if(!id || !ctx.request.body){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    if(ctx.request.bomProject && ctx.request.body.bomDesignee){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    if(ctx.request.body.bomDesignee.length <= 0){
      throwApiError('missing bomDesignee', errorCode.ERRORFORMAT)
      return
    }
    if(ctx.request.body.bomDesignee.length > 0){
      let meFilter = _.filter(ctx.request.body.bomDesignee, (o) => { return !o.function_team_name})
      if(meFilter.length > 10){
        throwApiError('the bomDesignee are over limit', errorCode.ERRORFORMAT)
        return
      }
    }
    // 被assign至本BOM表且有Create權限的使用者才可進行編輯
    if(!await bomManagerService.checkEditUser(id, user.userID)){
      throwApiError('permission denied', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(user.userID, id)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    try{
      const result  = await bomManagerService.updateMeBomStageAndVersion(id, ctx.request.body)
      if(result){
        ctx.body = result
        ctx.status = 200
      }
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return
    }

    if(!ctx.request.body && ctx.request.body.currentStage && ctx.request.body.version_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
  }

  async getCreateBomBaseData(ctx){
    let userID = ctx.request.user.userID
    const result  = await bomManagerService.getCreateBomBaseData(userID)
    ctx.body = result
    ctx.status = 200
  }

  async checkDessign(info, bomId = ''){
    let meFilter = _.filter(info, (o) => { return !o.function_team_name})
    let functionTeamFilter = _.filter(info, (o) => { return o.function_team_name})
    // let group = _.groupBy(functionTeamFilter, 'function_team_name')
    // by release plane 20190403_v0.71 Function Team 這幾版只允許加一個team 一個人，不允許一個team有多個owner
    // _.forEach(Object.keys(group), (v, idx) =>{
    //   if(group[v].length > 1){
    //     throwApiError(`one function team [${v}] can not assign multiple people`, errorCode.ERRORFORMAT)
    //     return
    //   }
    // })

    // 20190730 Assignment 增加 Function Team 設置人員上限, 可以 Assign 至多10位 Function Team
    if (functionTeamFilter) {
      if (functionTeamFilter.length > 10) {
        throwApiError('the bomDesignee are over limit', errorCode.ERRORFORMAT)
        return
      }
    }

    // Update 時 assign過的人數不可往下減少
    if(bomId){
      if(await bomManagerService.getAlreadyDesigneeCount(bomId) > info.length){
        throwApiError('the bomDesignee can not less than init', errorCode.ERRORFORMAT)
        return
      }
    }

    if(meFilter.length > 10){
      throwApiError('the bomDesignee are over limit', errorCode.ERRORFORMAT)
      return
    }
  }

  async getCopyVersionByProject(ctx) {
    let userID = ctx.request.user.userID
    let queryRes = await bomManagerService.getCopyProjectList(userID)
    if(queryRes) {
      ctx.body = queryRes
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getCopyVersionList(ctx) {
    if (!ctx.params.bom_id) {
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    let bomId = ctx.params.bom_id
    let userID = ctx.request.user.userID
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomId)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    let queryRes = await bomManagerService.getCopyVersionList(bomId)
    if(queryRes) {
      ctx.body = queryRes
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async bomApproval(ctx) {
    const { request: req } = ctx
    let userID = ctx.request.user.userID
    let { bomID, copyCostBomID } = req.body

    if(!bomID){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    if (bomID === copyCostBomID) {
      throwApiError('incurrect paramater', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    let queryRes = await bomManagerService.bomApproval(bomID, userID, copyCostBomID)
    if(queryRes) {
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async bomComplete(ctx) {
    const { request: req } = ctx
    let userID = ctx.request.user.userID

    if(!req.body.bomID){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }
    let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, req.body.bomID)
    if(!checkProductTypePermission) {
      throwApiError('permission denied', errorCode.ERRORFORMAT)
    }
    let queryRes = await bomManagerService.bomComplete(req.body.bomID, userID)
    if(queryRes) {
      ctx.status = 200

    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }

  }

  /* async test(ctx) {
    console.log(ctx.params.versionID)
    let queryRes = await bomManagerService.test(ctx.params.versionID)
    ctx.status = 200
  } */

  async getBomProjectParams(ctx) {
    if (ctx.params.id) {
      const bomId = ctx.params.id
      let queryRes = await bomManagerService.getBomProjectParams(bomId)
      ctx.status = 200
      ctx.body = queryRes
    } else {
      throwApiError('Missing param id.', errorCode.BAD_REQUEST)
    }
  }

  async updateBomProjectParams(ctx) {
    if (ctx.params.id && ctx.request.body) {
      const bomId = ctx.params.id
      const params = ctx.request.body.bomParams
      let userID = ctx.request.user.userID
      await bomManagerService.updateBomProjectParams(bomId, params, userID)
      ctx.status = 200
    } else {
      throwApiError('Missing param id.', errorCode.BAD_REQUEST)
    }
  }

  async exportMeBom(ctx) {
    let { bomID, sku } = ctx.params
    let userID = ctx.request.user.userID
    let assign = 'all'
    if (!ctx.request.body.currency) {
      throwApiError('Missing param currency.', errorCode.BAD_REQUEST)
    }
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    const timeStamp = moment(new Date()).format('YYYYMMDDDhmmss')
    const project = await bomItemModel.getMeBomHeader(bomID)
    let fileName = project.project_name != null ? project.project_name.indexOf('/') != -1 ? project.project_name.replace(/\//g, '_') : project.project_name : project.project_name
    const excelFolder = `Eprocurement_BOM_ME_${fileName}_${timeStamp}`
    const filePath = `Eprocurement_BOM_ME_${fileName}_${resultFileDate}`
    const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`
    const result = await bomManagerService.exportMeBom(ctx.request.body, bomID, userID, assign, sku, filePath, excelFolder)
    if(result == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      ctx.attachment(resultPath)
      ctx.body = result
      ctx.status = 200
      await send(ctx, resultPath)
    }
  }

  async setBomFavorite(ctx) {
    let { project_code, site, stage_id } = ctx.request.body
    let user_id = ctx.request.user.userID
    if(!project_code || !site || !stage_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    try {
      let result = await bomManagerService.setBomFavorite(user_id, project_code, site, stage_id)

      ctx.body = result
      ctx.status = 200
    } catch(err) {
      throwApiError(err.message, err.status)
    }
  }

  async delBomFavorite(ctx) {

    const { fav_id } = ctx.params
    if(!fav_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    try {
      let result = await bomManagerService.delBomFavorite(fav_id)

      // let result = 'ok'
      ctx.body = result
      ctx.status = 200
    } catch(err) {
      throwApiError(err.message, err.status)
    }
  }

  async setBomArchive(ctx) {
    let { project_code, site, stage_id } = ctx.request.body
    // let user_id = ctx.request.user.userID

    if(!project_code || !site || !stage_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    try {
      let result = await bomManagerService.setBomArchive(project_code, site, stage_id)
      ctx.body = result
      ctx.status = 200
    } catch(err) {
      throwApiError(err.message, err.status)
    }
  }
  async delBomArchive(ctx) {
    const { archive_id } = ctx.params
    if(!archive_id){
      throwApiError('missing paramater', errorCode.ERRORFORMAT)
      return
    }

    try {
      let result = await bomManagerService.delBomArchive(archive_id)

      ctx.body = result
      ctx.status = 200
    } catch(err) {
      throwApiError(err.message, err.status)
    }
  }
  async spaceRateFilterBy(ctx) {
    let userID = ctx.request.user.userID
    let { product, customer, stage, after, before } = ctx.query
    try {
      let res = await rbacService.getPolicyByUser(userID)
      if(res){
        if(res.View && res.View.allow && res.View.allow.includes('me_bom_projects')) {
          let result = await bomManagerService.getSpaceRateFilterBy(userID, {
            product,
            customer,
            stage,
            after,
            before,
          })
          ctx.body = result
          ctx.status = 200
        } else {
          throwApiError('permission denid', errorCode.ERRORFORMAT)
        }
      } else{
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } catch(err) {
      throwApiError(err.message, err.status)
    }
  }
  async spaceRateExportBySearch(ctx){
    let userID = ctx.request.user.userID
    let { product, customer, stage, after, before } = ctx.query
    try {
      let res = await rbacService.getPolicyByUser(userID)
      if(res){
        if(res.View && res.View.allow && res.View.allow.includes('me_bom_projects')) {

          const resultFileDate = moment(new Date()).format('YYYYMMDD')
          const timeStamp = moment(new Date()).format('YYYYMMDDDhmmss')
          let fileName = ''
          let nameRule = { product, customer, stage, after, before }
          let keyList = Object.keys(nameRule)
          keyList.forEach((key) => {
            if (nameRule[key]){
              if (fileName !== '') {
                fileName += '_'
              }
              if (key === 'after' || key === 'before') {
                fileName += `${key.toUpperCase()}-${nameRule[key]}`
              } else {
                fileName += nameRule[key]
              }
            }
          })
          if (fileName === '') {
            fileName = 'ALLBOM'
          }
          const excelFolder = `Eprocurement_BOM_SpaceRate_report_${fileName}_${timeStamp}`
          const filePath = `Eprocurement_BOM_SpaceRate_${fileName}_${resultFileDate}`
          const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`
          const result = await bomManagerService.exportSpaceRateSummary(userID, filePath, excelFolder, {
            product,
            customer,
            stage,
            after,
            before,
          })
          ctx.attachment(resultPath)
          ctx.body = result
          ctx.status = 200
          await send(ctx, resultPath)
        } else {
          throwApiError('permission denid', errorCode.ERRORFORMAT)
        }
      } else{
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } catch(err) {
      logger.error('spaceRateExportBySearch exec with error:', err.message, err.stack)
      throwApiError('internal error', errorCode.INTERNAL_ERROR)
    }
  }
  async getSourcerPermission(ctx) {
    try {
      const userID = ctx.request.user.userID
      const { bom_id } = ctx.params
      if(_.isNil(bom_id)){
        throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bom_id)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      }
      const result = await bomManagerService.getSourcerPermission(bom_id)
      ctx.body = result
      ctx.status = 200
    } catch (error) {
      throwApiError(error.message, error.status)
    }
  }
  async setSourcerPermission(ctx) {
    try {
      const userID = ctx.request.user.userID
      const { bom_id, sourcer_permission } = ctx.request.body
      if(_.isNil(bom_id) || !Array.isArray(sourcer_permission)){
        throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bom_id)
      let cePermission = await rbacService.getPolicyByUser(userID, {
        action: 'EditAll',
        resource: 'me_bom_projects.spa_sourcer_suggestion',
      })
      let isCePermissionDeney = _.isEmpty(cePermission)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      } else if(isCePermissionDeney){
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
      }
      const result = await bomManagerService.setSourcerPermission(bom_id, sourcer_permission)
      ctx.body = result
      ctx.status = 200
    } catch (error) {
      throwApiError(error.message, error.status)
    }
  }
  async postMailToCE(ctx) {
    try {
      const userID = ctx.request.user.userID
      const { bom_id } = ctx.request.body
      if(_.isNil(bom_id)){
        throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bom_id)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      }
      let sourcerPermission = await rbacService.getPolicyByUser(userID, {
        action: 'View',
        resource: 'me_bom_projects.bom_item.source_cost',
      })
      let isSourcerPermissionDeney = Object.keys(sourcerPermission).length !== 0
      if(isSourcerPermissionDeney){
        logger.warn('[API][BomManager][postMailToCE]  permission deny. need permisson: me_bom_projects.bom_item.source_cost')
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
      }
      await bomManagerService.sendMailToCE(bom_id)
      ctx.status = 200
    } catch (error) {
      throwApiError(error.message, error.status)
    }
  }

  async getBomHistory(ctx) {
    const { bomID } = ctx.params
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    const timeStamp = moment(new Date()).format('YYYYMMDDDhmmss')
    const project = await bomItemModel.getMeBomHeader(bomID)
    let projectName = project.project_name != null ? project.project_name.indexOf('/') != -1 ? project.project_name.replace(/\//g, '_') : project.project_name : project.project_name
    let projectCode = project.project_code != null ? project.project_code.indexOf('/') != -1 ? project.project_code.replace(/\//g, '_') : project.project_code : project.project_code
    let emdmVersion = project.emdm_version != null ? project.emdm_version.indexOf('/') != -1 ? project.emdm_version.replace(/\//g, '_') : project.emdm_version : project.emdm_version
    const excelFolder = `Eprocurement_${projectName}(${projectCode})_${emdmVersion}_EditHistory_${timeStamp}`
    const filePath = `Eprocurement_${projectName}(${projectCode})_${emdmVersion}_EditHistory_${resultFileDate}`
    const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`

    let result = await bomManagerService.getBomHistory(bomID, filePath, excelFolder)
    if(result == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      ctx.attachment(resultPath)
      ctx.body = result
      ctx.status = 200
      await send(ctx, resultPath)
    }
  }
  async postMailToSourcer(ctx) {
    try {
      const userID = ctx.request.user.userID
      const { bom_id } = ctx.request.body
      if(_.isNil(bom_id)){
        throwApiError('missing paramater.', errorCode.INVALIDCONTENT)
      }
      let checkProductTypePermission = await bomManagerService.checkUserMEProductType(userID, bom_id)
      let cePermission = await rbacService.getPolicyByUser(userID, {
        action: 'EditAll',
        resource: 'me_bom_projects.spa_sourcer_suggestion',
      })
      let isCePermissionDeney = _.isEmpty(cePermission)
      if(!checkProductTypePermission) {
        logger.warn(`[API][BomManager][postMailToSourcer] Product Type permission denied. ProductTypePermission result :${JSON.stringify(cePermission, null, 2)}`)
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      } else if(isCePermissionDeney){
        logger.warn(`[API][BomManager][postMailToSourcer]  permission deny. cePermission result :${JSON.stringify(cePermission, null, 2)}`)
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
      }
      await bomManagerService.sendMailToSourcer(bom_id)
      ctx.status = 200
    } catch (error) {
      throwApiError(error.message, error.status)
    }
  }
  async getSourcerList(ctx) {
    let userID = ctx.request.user.userID
    let cePermission = await rbacService.getPolicyByUser(userID, {
      action: 'EditAll',
      resource: 'me_bom_projects.spa_sourcer_suggestion',
    })
    let isCePermissionDeney = _.isEmpty(cePermission)
    if(isCePermissionDeney){
      logger.warn('[API][BomManager][getSourcerList]  permission deny. need permisson: me_bom_projects.spa_sourcer_suggestion')
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    const result  = await userService.getUserByKeyword(1, 999, 'name_a', '', 'SOURCER', '')
    ctx.body = result
    ctx.status = 200
  }

  async exportWsdBom(ctx) {
    
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    const timeStamp = moment(new Date()).format('YYYYMMDDDhmmss')
    let fileName = 'Summary'
    const excelFolder = `Eprocurement_WSD_BOM_ME_${fileName}_${timeStamp}`
    const filePath = `Eprocurement_WSD_BOM_ME_${fileName}_${resultFileDate}`
    const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`
    const result = await bomManagerService.exportWsdBom(filePath, excelFolder)
    if(result == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      ctx.attachment(resultPath)
      ctx.body = result
      ctx.status = 200
      await send(ctx, resultPath)
    }
  }
}
module.exports = BomManager
