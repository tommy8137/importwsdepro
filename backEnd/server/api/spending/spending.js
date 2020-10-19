const bomManagerService = require('../../service/bom/bomManager.js')
const spendingService = require('../../service/spending/spending.js')
const pcbService = require('../../service/bom/pcb.js').pcb
const analysisService = require('../../service/spending/analysis.js')
const reportService = require('../../service/spending/report.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')
const send = require('koa-send')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Spending|Dashboard api')
const path = require('path')
const delDir = require('../../helpers/clean/deleteDir.js')
const moment = require('moment')
const STATUS_OK = 200
const ERROR_CODE_MAPPING = {
  'Permission deny': errorCode.AUTH_WRONG,
  'No Data': errorCode.DATANOTFOUND,
  'Missing paramater': errorCode.ERRORFORMAT,
}
function _getErrorStatusCode (err){
  return  ERROR_CODE_MAPPING.hasOwnProperty(err.message) ? ERROR_CODE_MAPPING[err.message] : err.status
}

class Spending {
  async getEeBomProjects(ctx) {
    try {
      const { userID } = ctx.request.user
      let { pages, items, column, keyword, project } = ctx.query
      if (_.isUndefined(pages) || _.isUndefined(items)) {
        throw new Error('pages or items or orderBy required')
      }
      if (_.isUndefined('undefined') || _.isUndefined(project)) {
        keyword = ''
      }
      let viewPermission = await rbacService.getPolicyByUser(userID, {
        action: 'List',
        resource: 'dashboard',
      })
      if(_.isEmpty(viewPermission)){
        throw new Error('Permission deny')
      }
      const result  = await spendingService.getEeBomProjects(pages, items, column, keyword, project)
      ctx.body = result
      ctx.status = STATUS_OK
    } catch (err) {
      logger.warn('error request for Spending getEeBomProjects', err)
      throwApiError(err.message, _getErrorStatusCode(err))
    }
  }

  async spending(ctx) {
    const result  = await spendingService.spending()
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getTypes(ctx) {
    const { body } = ctx.request
    const filter = {
      plants: body.plant && body.plant.length ? body.plant : [null],
      scodes: body.scode && body.scode.length ? body.scode : [null],
    }
    const result  = await spendingService.getTypes(filter)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getPlants(ctx) {
    const result  = await spendingService.getPlants()
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async userList(ctx) {
    const result  = await spendingService.getUserList(ctx.request.user)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getSupplyList(ctx) {
    const result  = await spendingService.getSupplyList()
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getWaterful(ctx) {
    console.log(`${ctx.request.user.userID} get waterfall report`)
    console.log('gen waterful data::', moment().format('h:mm:ss a'))
    const result  = await spendingService.getWaterful(ctx.request.body)
    console.log('end waterful data::', moment().format('h:mm:ss a'))
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async chartMonthAnalysis(ctx) {
    const { body } = ctx.request
    const query = {
      plants: body.plant && body.plant.length ? body.plant : null,
      scodes: body.scode && body.scode.length ? body.scode : null,
      dateFrom: body.dateFrom && body.dateFrom.length ? body.dateFrom : null,
      dateTo: body.dateTo && body.dateTo.length ? body.dateTo : null,
      type1: body.type1 && body.type1.length ? body.type1 : null,
      type2: body.type2 && body.type2.length ? body.type2 : null,
      supplyType: body.supplyType && body.supplyType.length ? body.supplyType : [''],
      selection: body.vendorSelection ? body.vendorSelection : null,
    }
    const result  = await analysisService.chartMonthAnalysis(query)
    ctx.body = { 'query': query, ...result }
    ctx.status = STATUS_OK
  }
  async genRawDataExcel(ctx) {
    console.log(`${ctx.request.user.userID} get raw data report`)
    const date = new Date()
    const spendingFileDate = moment(new Date()).format('YYYYMMDD')
    if(ctx.request.body.plant != null) {
      const result  = await reportService.genRawDataExcel(ctx.request.body)
      const spendingPath = `/server${result}`
      ctx.attachment(result)
      ctx.status = STATUS_OK
      await send(ctx, spendingPath)
    }else {
      ctx.body = { message: 'no record'}
      ctx.status = 401
    }
  }
  async genSummaryExcel(ctx) {
    console.log(`${ctx.request.user.userID} get summary report`)
    const date = new Date()
    const summaryFileDate = moment(new Date()).format('YYYYMMDD')
    if(ctx.request.body.plant != null) {
      const result  = await reportService.genSummaryExcel(ctx.request.body)
      const summaryPath = `/server/utils/excel/Spending_sum_${summaryFileDate}.xlsx`
      ctx.attachment(summaryPath)
      ctx.body = result
      ctx.status = STATUS_OK
      await send(ctx, summaryPath)
    }else {
      ctx.body = { message: 'no record'}
      ctx.status = 401
    }
  }
  async report(ctx) {
    const result  = await reportService.report(ctx.request.body)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getEeCostV2(ctx) {
    try {
      const result = await spendingService.getEeCostV2(ctx.params.edm_version_id)
      if(_.isEmpty(result)) {
        throw new Error('No Data')
      }
      ctx.body = result
      ctx.status = STATUS_OK
    } catch (err) {
      logger.warn('error request for Spending getEeCostV2', err)
      throwApiError(err.message, _getErrorStatusCode(err))
    }
  }
  async getModuleDetail(ctx) {
    const result = await spendingService.getModuleDetail(ctx.params.edm_version_id, ctx.params.module_id)
    if(!_.isEmpty(result)) {
      ctx.body = result
      ctx.status = STATUS_OK
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getModuleDetailV2(ctx) {
    const { userID } = ctx.request.user
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'List',
      resource: 'dashboard',
    })
    if(_.isEmpty(viewPermission)){
      throwApiError('Permission deny', errorCode.AUTH_WRONG)
      return
    }

    const { projectID, moduleID, category, supply_type } = ctx.query
    if(!projectID && !moduleID || !category){
      throwApiError('Missing paramater', errorCode.ERRORFORMAT)
      return
    }
    const result = await spendingService.getModuleDetailV2(projectID, moduleID, category, supply_type)
    if(!_.isEmpty(result)) {
      ctx.body = result
      ctx.status = STATUS_OK
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async getDashBoardFilterItems(ctx){
    try{
      const { column } = ctx.params
      let result = {}
      result  = await spendingService.getDashBoardFilterItems(column)
      ctx.body = { res : result }
      ctx.status = STATUS_OK
    }catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, err.status)
    }
  }
  async getMeCost(ctx){
    const { bom_id, sku } = ctx.params
    const { userID } = ctx.request.user
    let assign = 'all'
    const result = await spendingService.getMeCost(bom_id, userID, assign, sku)
    ctx.status = STATUS_OK
    ctx.body = result
  }
  async getDashboardCost(ctx) {
    try{
      const { dashboard, supply_type,  manufacturer } = ctx.query
      const { userID } = ctx.request.user
      let viewPermission = await rbacService.getPolicyByUser(userID, {
        action: 'List',
        resource: 'dashboard',
      })
      if(_.isEmpty(viewPermission)){
        throw new Error('Permission deny')
      } else if(!dashboard){
        throw new Error('Missing paramater')
      }
      const result = await spendingService.getDashboardCost(dashboard, supply_type, manufacturer)
      ctx.status = STATUS_OK
      ctx.body = result
    }catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, _getErrorStatusCode(err))
    }
  }
  async getMeDetail(ctx) {
    const { projectID, sku, moduleID, manufacturer } = ctx.query
    const { userID } = ctx.request.user
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'List',
      resource: 'dashboard',
    })
    if(_.isEmpty(viewPermission)){
      throwApiError('Permission deny', errorCode.AUTH_WRONG)
      return
    }
    // let assign = 'all'
    // const result = await spendingService.getMeDetail(projectID, userID, assign, sku, moduleID)
    if(!projectID && sku){
      throwApiError('Missing paramater', errorCode.ERRORFORMAT)
      return
    }
    try{
      const result = await spendingService.getMeDetail(projectID, sku, moduleID, manufacturer)
      ctx.status = STATUS_OK
      ctx.body = result
    }catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, err.status)
    }

  }
  async getCombineVersion(ctx) {
    let { project_code, ee_id, me_id } = ctx.query
    const { userID } = ctx.request.user
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'List',
      resource: 'dashboard',
    })
    if(_.isEmpty(viewPermission)){
      throwApiError('Permission deny', errorCode.AUTH_WRONG)
      return
    }
    let meID = me_id
    if(isNaN(me_id)) {
      meID = 0
    }
    try{
      let result = await spendingService.getCombineVersion(project_code, ee_id, meID)
      ctx.body = result
      ctx.status = STATUS_OK
    }catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, err.status)
    }
  }
  async insertCombineVersion(ctx) {
    const { userID } = ctx.request.user
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'List',
      resource: 'dashboard',
    })
    if(_.isEmpty(viewPermission)){
      throwApiError('Permission deny', errorCode.AUTH_WRONG)
      return
    }

    try{
      const { ee_sku, ee_version_id, ee_version_name, ee_version, me_version_id, me_version_name, me_version, project_code } = ctx.request.body
      if(_.isNil(project_code)){
        throwApiError('Missing paramater', errorCode.ERRORFORMAT)
        return
      }
      let eeVersionID = ee_version_id || '00000000-0000-0000-C000-000000000046'
      let meVersionID = me_version_id || '00000000-0000-0000-C000-000000000046'
      let meVersionName = me_version_name || ''
      const result = await spendingService.insertCombineVersion(ee_sku, eeVersionID, ee_version_name, ee_version, meVersionID, meVersionName, me_version, project_code)
      ctx.body = { 'id': result }
      ctx.status = STATUS_OK
    }catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, err.status)
    }
  }

  async ExportDashboardByID(ctx) {
    try {
      let defaultUuid = '00000000-0000-0000-c000-000000000046'
      let { dashboardID } = ctx.params
      let { supply_type, manufacturer } = ctx.query
      let userID = ctx.request.user.userID
      let eeResult = {}
      let meResult = {}
      let odmPartsList = {}
      let pcbPartsList = {}
      let response = null

      if (!dashboardID) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      let exportPermission = await rbacService.getPolicyByUser(userID, {
        action: 'List',
        resource: 'dashboard'
      })
      if(_.isEmpty(exportPermission)) {
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
      }
      // use dashboard combine id query ee_version_id and me_version_id
      let dashboardCombinInfo = await spendingService.getDashboardInfo(dashboardID)
      let edm_version_id = ''
      let me_version_id = ''
      let meSku = ''
      if (dashboardCombinInfo && dashboardCombinInfo.length > 0) {
        edm_version_id =  dashboardCombinInfo[0].ee_version_id
        me_version_id =  dashboardCombinInfo[0].me_version_id
        meSku = spendingService.getMeSkuFromVersionName(dashboardCombinInfo[0].me_version_name)
      }
      let exportDate = moment(new Date()).format('YYYYMMDD')
      let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
      let folderPath
      let fileName
      let skuCount = meSku ? meSku.substring(3) : ''
      folderPath = `Eprocurement_Dashboard_${timeStamp}`
      fileName = `Eprocurement_Dashboard_${exportDate}`
      if(edm_version_id && edm_version_id != defaultUuid){
        let eebomExportBase = await spendingService.getEebomExportBase(edm_version_id)
        // eeResult = await spendingService.exportEENewModuleData(edm_version_id, eebomExportProjectInfo, supply_type)
        // odmPartsList = await spendingService.getExportEebomOdmPartInfoList(edm_version_id, eebomExportProjectInfo, supply_type)
        // pcbPartsList = await spendingService.getExportPcbPartInfoList(edm_version_id, eebomExportProjectInfo)

        pcbPartsList = await spendingService.getExportPcbPartInfoList(edm_version_id, eebomExportBase.projectInfo)
        eeResult = await spendingService.exportEENewModuleData(edm_version_id, eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo, supply_type)
        odmPartsList = await spendingService.getExportEebomOdmPartInfoList(edm_version_id, eebomExportBase.eebomAllDetail, eebomExportBase.projectInfo, supply_type)
      }

      if(me_version_id && me_version_id != defaultUuid) meResult = await spendingService.MEexport(me_version_id, meSku, manufacturer)
      response = await spendingService.exportDashboard(meResult, eeResult, odmPartsList, pcbPartsList, userID, manufacturer, skuCount, supply_type, fileName, folderPath)

      if(_.isEmpty(eeResult) && _.isEmpty(meResult)) {
        throwApiError('no record.', errorCode.DATANOTFOUND)
      } else {
        // TODO: call Tommy function for excel format
        let resultPath = `/server/utils/excel/${folderPath}/${fileName}.xlsx`
        ctx.attachment(resultPath)
        ctx.body = response
        ctx.status = STATUS_OK
        await send(ctx, resultPath)
      //   await delDir(filePath)
      }
    } catch (err) {
      logger.warn('error request for Dashboard', err)
      throwApiError(err.message, err.status)
    }
  }
  async exportItemView(ctx) {
    try {
      let userID = ctx.request.user.userID
      let { edm_version_id, category, item, supply_type } = ctx.query
      let exportPermission = await rbacService.getPolicyByUser(userID, {
        action: 'List',
        resource: 'dashboard',
      })
      if(_.isEmpty(exportPermission)) {
        throw new Error('Permission deny')
      }
      let result = null
      let response = null
      if(item.toUpperCase() == 'PCB') {
        result = await pcbService.pcbExportFormat(edm_version_id, supply_type)
      }else {
        result = await spendingService.getModuleDetailV2(edm_version_id, item, category, supply_type)
      }
      const exportDate = moment(new Date()).format('YYYYMMDD')
      const timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
      const itemName = item.replace(/(?:\\[rn]|[*]|[/]+)+/g, '').replace(/ /g, '')
      const excelFolder = `EE_Dashboard_${category}_${itemName}_${timeStamp}`
      const fileName = `EE_Dashboard_${category}_${itemName}_${exportDate}`
      const resultPath = `/server/utils/excel/${excelFolder}/${fileName}.xlsx`
      response = await spendingService.exportItemView(result, category, edm_version_id, item, supply_type, fileName, excelFolder)
      ctx.attachment(resultPath)
      ctx.body = response
      ctx.status = STATUS_OK
      await send(ctx, resultPath)
    } catch (err) {
      logger.warn('error request for Spending exportItemView', err)
      throwApiError(err.message, _getErrorStatusCode(err))
    }
  }
  async getEeCost(ctx) {
    // const userID = ctx.request.user.userID
    const result = await spendingService.getEeCost(ctx.params.edm_version_id)
    if(!_.isEmpty(result)) {
      ctx.body = result
      ctx.status = 200
    } else {
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
    ctx.status = STATUS_OK
  }

  // async exportMeDashboard(ctx) {
  //   let { bomID, assign } = ctx.params
  //   let userID = ctx.request.user.userID

  //   const resultFileDate = moment(new Date()).format('YYYYMMDD')
  //   const result = await spendingService.exportMeDashboard(ctx.request.body, bomID, userID, assign)
  //   if(result == false) {
  //     throwApiError('no record.', errorCode.DATANOTFOUND)
  //   } else {
  //     const excelFolder = `Me_Dashboard_${resultFileDate}`
  //     const filePath = path.resolve(__dirname, `../../utils/excel/${excelFolder}`)
  //     const resultPath = `/server/utils/excel/${excelFolder}/${excelFolder}.xlsx`
  //     ctx.attachment(resultPath)
  //     ctx.body = result
  //     ctx.status = STATUS_OK
  //     await send(ctx, resultPath)
  //     await delDir(filePath)
  //   }
  // }

  // async exportEeDashboard(ctx) {
  //   // let { bomID, assign } = ctx.params
  //   let userID = ctx.request.user.userID

  //   const resultFileDate = moment(new Date()).format('YYYYMMDD')
  //   const result = await spendingService.exportEeDashboard(/*ctx.request.body, bomID, userID, assign*/)
  //   if(result == false) {
  //     throwApiError('no record.', errorCode.DATANOTFOUND)
  //   } else {
  //     const excelFolder = `Ee_Dashboard_${resultFileDate}`
  //     const filePath = path.resolve(__dirname, `../../utils/excel/${excelFolder}`)
  //     const resultPath = `/server/utils/excel/${excelFolder}/${excelFolder}.xlsx`
  //     ctx.attachment(resultPath)
  //     ctx.body = result
  //     ctx.status = STATUS_OK
  //     await send(ctx, resultPath)
  //     // await delDir(filePath)

  //   }
  // }

  async getDashboadrFilterItems(ctx){
    let userID = ctx.request.user.userID
    let res = await spendingService.getDashBoardFilterType()
    ctx.body = res
    ctx.status = STATUS_OK
  }
}
module.exports = Spending
