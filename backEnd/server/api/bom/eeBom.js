const eeBomService = require('../../service/bom/eeBom.js')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const spendingService = require('../../service/spending/spending.js')
const bomItemService = require('../../service/bom/bomItem.js')
const moment = require('moment')
const send = require('koa-send')
const path = require('path')
const  delDir = require('../../helpers/clean/deleteDir.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')

const _ = require('lodash')

class Eebom {
  async getEeBomInfo(ctx) {
    let { id } = ctx.params
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects', action: 'List' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let result = false
    result = await eeBomService.getEeBomInfoByID(id)
    if(result) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
  async getEeBomPlantCode(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)

    let { id } = ctx.params
    let result = await eeBomService.getEeBomPlantCodeDropDown(id)
    if(result) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
  async getEeBomInfoByEdmVersionId(ctx) {
    let { id, edm_version_id } = ctx.params
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects', action: 'List' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let result = false
    result = await eeBomService.getEeBomInfoByEdmVersionId(id, edm_version_id)
    if(result) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async updateEeBomInfo(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)

    let info = {
      id: ctx.params.id,
      version_remark: ctx.request.body.version_remark,
    }
    let plant_code = ctx.request.body.plant_code

    await eeBomService.updateEeBomInfo(info, plant_code)
    ctx.body = { id: info.id }
    ctx.status = 200
  }

  async updateEeBomInfoByEdmVersionId(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)

    let info = {
      id: ctx.params.id,
      edm_version_id: ctx.params.edm_version_id,
      avl: ctx.request.body.avl,
    }

    await eeBomService.updateEeBomInfoByEdmVersionId(info)
    ctx.body = { id: info.id, version: info.edm_version_id }
    ctx.status = 200
  }

  async getEdmVersion(ctx) {
    let { id } = ctx.params
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.version', action: 'List' })
    if(_.isEmpty(res)) {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }
    let result = false
    result = await eeBomService.getEdmVersion(id, userID)
    if(result) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
  async updatePersonalCheck(ctx) {
    if (_.isEmpty(ctx.request.body.info)) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
      return
    }
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await eeBomService.updatePersonalCheck(ctx.request.body.info)
    ctx.body = 'update success'
    ctx.status = 200
  }
  async updateLeaderCheck(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'LeaderSubmit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await eeBomService.updateLeaderCheck(ctx.request.body.info)
    ctx.body = 'update success'
    ctx.status = 200
  }
  async updateLeaderSubmitted(ctx) {
    let userID = ctx.request.user.userID
    let { info, version_remark } = ctx.request.body
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'LeaderSubmit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await eeBomService.updateEeBomDetail( info, ctx.request.user.userID, version_remark)
    ctx.body = 'update success'
    ctx.status = 200
  }
  async updatePersonalSubmitted(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    if (_.isEmpty(ctx.request.body.info)) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
      return
    }
    await eeBomService.updatePersonalSubmitted(ctx.request.body.info)
    let  bomInfo = await eeBomService.getEebomProjectInfoByDetailID(ctx.request.body.info[0].id)
    await eeBomService.upadteVersion(bomInfo)
    ctx.body = 'update success'
    ctx.status = 200
  }
  async getDetailTabInfo(ctx) {
    let { userID, username } = ctx.request.user
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail' })
    if(_.isEmpty(res.List))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let { edm_version_id, eebom_project_id } = ctx.params
    let checkProductTypePermission = await eeBomService.checkUserEEProductType(userID, eebom_project_id)
      if(!checkProductTypePermission) {
        throwApiError('permission denied', errorCode.ERRORFORMAT)
      }

    let eeBom = await eeBomService.getEeBomInfoByID(eebom_project_id)
    let edmVerion = await eeBomService.getEdmVersionByVersionID(edm_version_id)
    let { project_code, project_name, version_remark } = eeBom.bomInfo
    let proxyInfo = await eeBomService.getProxyInfoByUserID(userID)
    let types = await eeBomService.getPicType1(userID)
    let response = []
    if(types.length > 0 && !_.isEmpty(res.Edit)) {
      response.push({
        type: 'personal',
        emplid: userID,
        user_name: username,
        eebom_project_id: eebom_project_id,
        project_code: project_code,
        project_name: project_name,
        edm_version_id: edm_version_id,
        edm_version: edmVerion.version,
        version_remark: version_remark,
      })
    }
    if(!_.isEmpty(res.Approve)) {
      response.push( {
        type: 'approver',
        emplid: userID,
        user_name: username,
        eebom_project_id: eebom_project_id,
        project_code: project_code,
        project_name: project_name,
        edm_version_id: edm_version_id,
        edm_version: edmVerion.version,
        version_remark: version_remark,
      })
    }
    response.push( {
      type: 'viewAll',
      emplid: userID,
      user_name: username,
      eebom_project_id: eebom_project_id,
      project_code: project_code,
      project_name: project_name,
      edm_version_id: edm_version_id,
      edm_version: edmVerion.version,
      version_remark: version_remark,
    })
    if(proxyInfo.length > 0 && !_.isEmpty(res.Edit)) {
      response.push( {
        type: 'proxy',
        emplid: userID,
        user_name: username,
        eebom_project_id: eebom_project_id,
        project_code: project_code,
        project_name: project_name,
        edm_version_id: edm_version_id,
        edm_version: edmVerion.version,
        version_remark: version_remark,
      })
    }

    ctx.body = response
    ctx.status = 200
  }
  async getDetailProject(ctx) {
    let { edm_version_id, type } = ctx.params
    let { userID } = ctx.request.user
    let { orderBy } = ctx.request.query
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'List' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let response
    let info = {
      edm_version_id: edm_version_id,
      isPCB: false,
      orderBy: orderBy,
    }
    let type1 = []
    const exception_type1 = '<NULL>'
    if(type == 'personal') {
      let types = await eeBomService.getPicType1(userID)
      if(types.length == 0) {
        throwApiError('not assign type1 for this account', errorCode.ERRORFORMAT)
      }
      types.map((type) => {
        if(type.type1 == 'PCB') info.isPCB = true
        type1.push(type.type1)
      })
      type1.push(exception_type1)
      info.type1 = type1
      response = await eeBomService.getPersonalBomDetail(info)
    } else if(type == 'proxy') {
      let types = await eeBomService.getProxyType1(userID)
      if(types.length == 0) {
        throwApiError('not assign type1 for this account', errorCode.ERRORFORMAT)
      }
      types.map((type) => {
        if(type.type1 == 'PCB') info.isPCB = true
        type1.push(type.type1)
      })
      type1.push(exception_type1)
      info.type1 = type1
      response = await eeBomService.getPersonalBomDetail(info)
    } else if(type == 'approver') {
      response = await eeBomService.getAllBomDetail(info, true)
    } else {
      response = await eeBomService.getAllBomDetail(info, false)
    }
    ctx.body = response
    ctx.status = 200
  }

  async getCopyCost(ctx) {
    let { edm_version_id, type } = ctx.params
    let { userID } = ctx.request.user
    let { weeks } = ctx.request.query
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'List' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let response, bomdetail
    let info = {
      edm_version_id: edm_version_id,
      isPCB: false,
      weeks: weeks,
      orderBy: 'type1',
    }
    let type1 = []
    if(type == 'personal') {
      let types = await eeBomService.getPicType1(userID)
      if(types.length == 0) {
        throwApiError('not assign type1 for this account', errorCode.ERRORFORMAT)
      }
      types.map((type) => {
        if(type.type1 == 'PCB') info.isPCB = true
        type1.push(type.type1)
      })
      info.type1 = type1
      bomdetail = await eeBomService.getPersonalBomDetail(info)
      response = await eeBomService.getPersonalCopyCost(bomdetail, info)
    } else if(type == 'proxy') {
      let types = await eeBomService.getProxyType1(userID)
      if(types.length == 0) {
        throwApiError('not assign type1 for this account', errorCode.ERRORFORMAT)
      }
      types.map((type) => {
        if(type.type1 == 'PCB') info.isPCB = true
        type1.push(type.type1)
      })
      info.type1 = type1
      bomdetail = await eeBomService.getPersonalBomDetail(info)
      response = await eeBomService.getPersonalCopyCost(bomdetail, info)
    } else if(type == 'approver') {
      bomdetail = await eeBomService.getAllBomDetail(info, true)
      response = await eeBomService.getPersonalCopyCost(bomdetail, info)
    } else {
      bomdetail = await eeBomService.getAllBomDetail(info, false)
      response = await eeBomService.getPersonalCopyCost(bomdetail, info)
    }
    ctx.body = response
    ctx.status = 200
  }

  async updateEeBomDetail(ctx) {
    let req = ctx.request.body
    let { info } = req
    let { userID } = ctx.request.user
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail' })
    if(_.isEmpty(res.Edit)) throwApiError('permission denid', errorCode.ERRORFORMAT)
    if (_.isEmpty(info)) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
      return
    }
    let result = await eeBomService.updateEeBomDetail(info, userID)
    // for(let t of info) {
    //   if(t.is_personal_submitted) {
    //     let  bomInfo = await eeBomService.getEebomProjectInfoByDetailID(t.id)
    //     await eeBomService.upadteVersion(bomInfo)
    //     break
    //   }
    // }

    // if(!_.isEmpty(res.Approve) && is_approver) {
    //   await eeBomService.updateLeaderCheck(info)
    // }
    if (result) {
      ctx.body = 'update success'
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
  async getTypes(ctx) {
    let { userID } = ctx.request.user
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail' })
    if(_.isEmpty(res.Edit)) throwApiError('permission denid', errorCode.ERRORFORMAT)
    let response = await eeBomService.getTypes()
    ctx.body = response
    ctx.status = 200
  }
  async getAllDetailProject(ctx) {
    let { edm_version_id, type } = ctx.params
    let { userID } = ctx.request.user
    let { orderBy, isOdmParts = 'true' } =  ctx.request.query
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'List' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let response
    let info = {
      edm_version_id: edm_version_id,
      isPCB: false,
      orderBy: orderBy,
      isOdmParts: isOdmParts,
    }
    if(type == 'pn') {
      response = await eeBomService.getAllBomDetail(info, false)
    } else {
      response = await eeBomService.getBomDetailByModule(info)
    }
    ctx.body = response
    ctx.status = 200
  }
  async approve(ctx) {
    let { edm_version_id, type } = ctx.params
    let { userID } = ctx.request.user
    let { versionRemark } = ctx.request.body
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Approve' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let info = {
      edm_version_id: edm_version_id,
      type: type,
      user: userID,
      version_remark: versionRemark,
    }
    await eeBomService.approve(info)
    ctx.body = 'approve success'
    ctx.status = 200
  }
  async getUpgradeEdmversionID(ctx) {
    let { edm_version_id } = ctx.params
    // let { userID } = ctx.request.user
    // let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Approve' })
    // if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let result_edm_version_id =  await eeBomService.getUpgradeEdmversionID(edm_version_id)
    ctx.body = { edm_version_id:result_edm_version_id }
    ctx.status = 200
  }
  async getEdmVersionStatusVersionByID(ctx) {
    let { projectid, edmversion } = ctx.params
    let userID = ctx.request.user.userID
    let result = []
    result = await eeBomService.getEdmVersionStatusVersionByID(projectid, edmversion)
    if(result) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
  async refreshBomDetail(ctx) {
    let req = ctx.request.body
    let edm_version_id = req.edm_version_id
    let { userID } = ctx.request.user
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    if(_.isEmpty(res.Edit)) throwApiError('permission denid', errorCode.FORBIDDEN)
    if (_.isEmpty(edm_version_id)) {
      throwApiError('edm version id required', errorCode.UNPROCESSABLE)
      return
    }

    let result = await eeBomService.refreshBomDetail(edm_version_id)

    if (result) {

      if (result == 'unrefreshable') {
        throwApiError('Bom already start editing', errorCode.updateFailed)
      }

      else if (result == 'ECONNREFUSED') {
        throwApiError('ECONNREFUSED', errorCode.FAILED_DEPENDENCY)
      }

      else {
        ctx.body = 'update success'
        ctx.status = 200
      }
    } else {
      throwApiError('Refresh failed', errorCode.FAILED_DEPENDENCY)
    }
  }
  async exportAlternative(ctx) {
    let { edm_version_id } = ctx.params
    let userID = ctx.request.user.userID
    let exportPermission = await rbacService.getPolicyByUser(userID, {
      action: 'Export',
      resource: 'ee_bom_projects.detail',
    })
    if(_.isEmpty(exportPermission)) {
      return throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    let response
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
    let eebomExportBase = await spendingService.getEebomExportBase(edm_version_id)


    let alternative = await spendingService.getExportAlternative(eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo, edm_version_id)
    // let secondSummary = await spendingService.getExport2ndSummary(secondOdmPartBom.secondOdmPart)

    // exchange_rate
    let refresh_time = await eeBomService.getEdmVersionRefreshTime(edm_version_id)
    let exchangeRateDefault = await spendingService.getDefaultExchangeRate(refresh_time)

    let fileName = eebomExportBase.projectInfo.project_name != null ? eebomExportBase.projectInfo.project_name.indexOf('/') != -1 ? eebomExportBase.projectInfo.project_name.replace(/\//g, '_') : eebomExportBase.projectInfo.project_name : eebomExportBase.projectInfo.project_name
    const excelFolder = `Eprocurement_Alternative_EE_${fileName}_${timeStamp}`
    const filePath = `Eprocurement_Alternative_EE_${fileName}_${resultFileDate}`
    const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`

    let sheetData = {
      alternative,
      // secondSummary,
    }

    let commonData = {
      filePath,
      excelFolder,
      exchangeRateDefault,
    }
    response = await eeBomService.exportEeAlternative(sheetData, commonData)
    if(response == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      ctx.attachment(resultPath)
      ctx.body = response
      ctx.status = 200
      await send(ctx, resultPath)
      // await delDir(filePath)
    }
  }

  async exportEeBom(ctx) {
    let { edm_version_id } = ctx.params
    let userID = ctx.request.user.userID
    let exportPermission = await rbacService.getPolicyByUser(userID, {
      action: 'Export',
      resource: 'ee_bom_projects.detail',
    })
    if(_.isEmpty(exportPermission)) {
      return throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    let response
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')

    let eebomExportBase = await spendingService.getEebomExportBase(edm_version_id)
    let pcbPartsList = await spendingService.getExportPcbPartInfoList(edm_version_id, eebomExportBase.projectInfo)

    let fullBomPartsList = await spendingService.getExportFullBom(eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo, edm_version_id)
    // let fullBomPartsList = await spendingService.exportEENewModuleData(edm_version_id, eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo)
    // let odmPartsList = await spendingService.getExportEebomOdmPartInfoList(edm_version_id, eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo)
    // console.log(odmPartsList.detail)
    // // ep-299 new bom sheet
    let odmBomRawData = await spendingService.getExportOdmBom(eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo, edm_version_id)
    let odmBomSummary = await spendingService.getExportOdmBomSummary(odmBomRawData.detail)
    // exchange_rate
    let refresh_time = await eeBomService.getEdmVersionRefreshTime(edm_version_id)
    let exchangeRateDefault = await spendingService.getDefaultExchangeRate(refresh_time)

    let fileName = fullBomPartsList.summary.project_name != null ? fullBomPartsList.summary.project_name.indexOf('/') != -1 ? fullBomPartsList.summary.project_name.replace(/\//g, '_') : fullBomPartsList.summary.project_name : fullBomPartsList.summary.project_name
    const excelFolder = `Eprocurement_BOM_EE_${fileName}_${timeStamp}`
    const filePath = `Eprocurement_BOM_EE_${fileName}_${resultFileDate}`
    const resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`

    let sheetData = {
      fullBomPartsList,
      // odmPartsList,
      pcbPartsList,
      odmBomRawData,
      odmBomSummary,
    }

    let commonData = {
      filePath,
      excelFolder,
      exchangeRateDefault,
    }
    response = await eeBomService.exportEeBom(sheetData, commonData)

    // response = await eeBomService.exportEeBom(fullBomPartsList, odmPartsList, pcbPartsList, secondOdmPartBom, secondSummary, filePath, excelFolder)
    if(response == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      ctx.attachment(resultPath)
      ctx.body = response
      ctx.status = 200
      await send(ctx, resultPath)
      // await delDir(filePath)
    }
  }
}


module.exports = Eebom
