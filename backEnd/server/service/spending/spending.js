const bomItemModel = require('../../model/bom/bomItem')
const rbacService = require('../admin/rbac.js')
const bomManagerModel = require('../../model/bom/bomManager.js')
const emdmModel = require('../../model/bom/emdmBomMain.js')
const spendingModel = require('../../model/spending/spending.js')
const xrayModel = require('../../model/xray/xray.js')
const eeBomDetailModel = require('../../model/bom/eeBomDetail.js')
const eeBomMainModel = require('../../model/bom/eeBomMain.js')
const { supplyType, odmOemType } = require('../../../config')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const fixMath = require('../../helpers/math/math.js')
const bomItemService = require('../bom/bomItem.js')
const { formatFloat } = require('../../helpers/utils.js')
const validator = require('validator')
const meBomCost = require('../../utils/cost/meBomCost')
const excelHeader = require('../../utils/excelHeader/getExportHeader.js')
const pcbService = require('../../service/bom/pcb.js').pcb
const eeBomService = require('../../service/bom/eeBom.js')
const { dashboardFilterType } = require('../../../config.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Spending|Dashboard Service')
const { xraySupplyType: supplyTypeConfig, bomSupplyType } = require('../../../config')
const fs = require('fs')
const xlsxPopulate = require('xlsx-populate')
const path = require('path')
const { getSupplyType } = require('../xray/analysis')
const eeBomUtils = require('../../utils/eebom/eebomUtils')
const costUtils = require('../../utils/cost/exchangeRate')
const exangeRateUtils = require('../../utils/exchangeRateExport/utils')
const exchangeRate = require('../../utils/exchangeRateExport/exchangeRate.js')
const { Excel } = require('../../utils/dataFrame/excel')
const PCB_SPEC_REG = /^spec[\d]+$/
const meBomUtils = require('../../utils/mebom/meBomUtils.js')
const emdmBomUtils = require('../../utils/emdmBom/emdmBomUtils.js')
const xrayUtilsLogical = require('../../utils/xray/logical.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')


const meFloatPoint = new DecimalGetter('MEBom')
const dashBoardFloatPoint = new DecimalGetter('DashBoard')

const DEFALT_UUID_LIST = {
  '00000000-0000-0000-c000-000000000046': true,
}
function _isDefaultUuid (id){
  return DEFALT_UUID_LIST.hasOwnProperty(id)
}

class Spending {
  constructor() {
    this.insertCombineVersion = this.insertCombineVersion.bind(this)
    this.MEexport = this.MEexport.bind(this)
  }
  static getMeSkuFromVersionName (meVersionName) {
    let meSku = ''
    let meVersionNameSplit = meVersionName.split('_')
    if (meVersionNameSplit.length === 3) {
      meSku = meVersionNameSplit[2]
    } else if(meVersionNameSplit.length === 4) {
      meSku = meVersionNameSplit[3]
    }
    return meSku
  }
  static async getEeBomProjects (pages, items, column, keyword, project) {
    let offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    let projectToLowerCase = project.toLowerCase()
    // let eeBomMaxVersionResults = await spendingModel.getMaxVersionForEachEebomProjects()
    let result = await spendingModel.getEeBomProjects(items, offset, column, keywordToLowerCase, projectToLowerCase)
    let projectCount = await spendingModel.getProjectCount(column, keywordToLowerCase, projectToLowerCase)
    // let defaultUUid = '00000000-0000-0000-c000-000000000046'
    let getMap = await spendingModel.getDashboardMapped()

    let tmp = []
    for (const m of result) {
      let detail = []
      // let  eeInfos = await spendingModel.getEeInfosByProjectCode(m.project_code)
      for (let i = 0; i < getMap.length; i++) {
        if (m.project_code == getMap[i].project_code || m.me_project_code == getMap[i].project_code) {
          // let status_version = m.status_version ? m.status_version : null
          if (_isDefaultUuid(getMap[i].ee_version_id)) {
            let eeMeDetail = {
              id: getMap[i].id,
              ee: {
                id: null,
                sku: null,
                version: null,
                platform: null,
                panel_size: null,
                status_version: null,
                stage: null,
                pcbno: null,
              },
              me: {
                id: getMap[i].me_version_id,
                sku: getMap[i].me_version_name,
                version: getMap[i].me_version ?  'V' + getMap[i].me_version : null,
              },
              create_time: getMap[i].create_time,
            }
            detail.push(eeMeDetail)
          } else if (_isDefaultUuid(getMap[i].me_version_id)) {
            let eeRes = await spendingModel.getEeInfosByEdmVersionId(getMap[i].ee_version_id)
            let pcbno = eeRes.length > 0 ? eeRes[0].pcbno ?  eeRes[0].pcbno : 'NA' : 'NA'
            let eeMeDetail = {
              id: getMap[i].id,
              ee: {
                id: getMap[i].ee_version_id,
                sku: getMap[i].ee_sku,
                version: eeRes.length > 0 ? eeRes[0].version : null,
                platform: eeRes.length > 0 ? eeRes[0].platform : null,
                panel_size: eeRes.length > 0 ? eeRes[0].panel_size : null,
                status_version: eeRes.length > 0 ?  eeRes[0].status_version.indexOf('.') > -1 ? 'V' + eeRes[0].status_version : 'V' + eeRes[0].status_version + '.0' : null,
                stage: eeRes.length > 0 ? pcbno + '_' + eeRes[0].stage : pcbno + '_' ,
                pcbno: pcbno,
              },
              me: {
                id: null,
                sku: null,
                version: null,
              },
              create_time: getMap[i].create_time,

            }
            detail.push(eeMeDetail)
          } else {
            let eeRes = await spendingModel.getEeInfosByEdmVersionId(getMap[i].ee_version_id)
            let pcbno = eeRes.length > 0 ? eeRes[0].pcbno ?  eeRes[0].pcbno : 'NA' : 'NA'
            let eeMeDetail = {
              id: getMap[i].id,
              ee: {
                id: getMap[i].ee_version_id,
                sku: getMap[i].ee_sku,
                version: eeRes.length > 0 ? eeRes[0].version : null,
                platform: eeRes.length > 0 ? eeRes[0].platform : null,
                panel_size: eeRes.length > 0 ? eeRes[0].panel_size : null,
                status_version: eeRes.length > 0 ?  eeRes[0].status_version.indexOf('.') > -1 ? 'V' + eeRes[0].status_version : 'V' + eeRes[0].status_version + '.0' : null,
                stage: eeRes.length > 0 ? pcbno + '_' + eeRes[0].stage : pcbno + '_' ,
                pcbno: pcbno,
              },
              me: {
                id: getMap[i].me_version_id,
                sku: getMap[i].me_version_name,
                version: getMap[i].me_version ?  'V' + getMap[i].me_version : null,
              },
              create_time: getMap[i].create_time,
            }
            detail.push(eeMeDetail)
          }
        }
      }
      let body = {
        ee_id: m.id,
        me_id: m.me_id,
        customer: m.customer || m.me_customer,
        project_code: m.project_code || m.me_project_code,
        project_name: m.project_name || m.me_project_name,
        product_type: m.product_type || m.me_product_type,
        stage: {
          ee: m.stage,
          me: m.me_stage_name,
        },
        version: {
          ee: m.status_version,
          me: m.version_name,
        },
        version_remark: m.version_remark,
        sku_description: m.me_sku_desc,
        detail: detail,
      }
      tmp.push(body)
    }

    return {
      numberOfProject: projectCount,
      projectList: tmp,
    }
  }
  static async getTypes(query) {
    let result = await spendingModel.getSpendingTypes(query)
    return {
      typeList: _.uniqWith(result, _.isEqual),
    }
  }
  static async getPlants() {
    let data = await spendingModel.getPlants()
    let result = data.map(x => {
      return {
        plant: x.plant,
        plantName: x.plantname,
        bg: x.bg,
      }
    })
    return { plantList: result }
  }
  static async getUserList(user){
    const { isCe, userID } = user
    let response = { userList:[] }
    let sourcers = []
    const isSupervisor  = await spendingModel.isSupervisor(userID)
    if (isCe || isSupervisor) {
      sourcers = await xrayModel.getSCode(null)
    } else {
      sourcers = await xrayModel.getSCode(userID)
      if(sourcers.length == 0) {
        return response
      }
      let sourcerColleague = await spendingModel.getColleague(sourcers[0].deptid)
      let sourcerProxy = await xrayModel.getProxy(userID)
      let subordinate = await xrayModel.getSubordinateSCode(userID)
      sourcers.push(...subordinate, ...sourcerProxy, ...sourcerColleague)
      sourcers = _.uniqBy(sourcers, 'sourcer')
    }

    for(let i = 0 ; i < sourcers.length ; i++) {
      let role = 'none'
      if(sourcers[i].groupname == 'MM-EE' || sourcers[i].groupname == 'CPBG-EE' || sourcers[i].groupname == 'WIWYNN888') {
        role = 'EE'
      } else if(sourcers[i].groupname == 'CPBG01-ME' || sourcers[i].groupname == 'CPBG02-ME' || sourcers[i].groupname == 'CSBG-ME' || sourcers[i].groupname == 'EBG-ME' || sourcers[i].groupname == 'CBG'){
        role = 'ME'
      }
      // let user = {}
      if(role != 'none') {
        user = {
          role:role,
          scode:sourcers[i].scode,
          name:sourcers[i].sourcer,
        }
        response.userList.push(user)
      }
    }
    return response
  }
  static async getSupplyList() {
    let typeIDs = Object.keys(supplyType)
    let result = []
    for(let i = 0 ; i < typeIDs.length ; i++) {
      let tmp = {
        typeID: supplyType[`${typeIDs[i]}`],
        category: odmOemType[`${typeIDs[i]}`],
        sapID: parseInt(typeIDs[i]),
      }
      result.push(tmp)
    }
    return { supplyList: result }
  }

  static async getWaterful(info) {
    let { type2, category, measure } = info
    let typetwo = []
    for (let i = 0 ; i < type2.length; i++) {
      if(type2[i] != null) {
        typetwo.push(type2[i])
      }
    }
    info.type2 = typetwo
    let classification = 'none'
    if(info.type2.length == 0 && category == 'none') {
      classification = 'type1'
    }else if(info.type2.length > 0 && category == 'none') {
      classification = 'type2'
    }
    let data = await spendingModel.getWaterful(info, classification)
    if(data == 'null') {
      return {
        category: '',
        requestData: info,
        waterfall: [],
      }
    }
    if(measure == 'amount') {
      let NTDexchangeRates = await spendingModel.getCurrencys('all', 'NTD', moment().format('YYYYMMDD'))
      let USDexchangeRates = await spendingModel.getCurrencys('all', 'USD', moment().format('YYYYMMDD'))
      for(let i = 0 ; i < data.info.length; i++) {
        let NTDexchangeRate, USDexchangeRate
        if(data.info[i].currency == 'NTD'){
          NTDexchangeRate = 1
        } else{
          let findNTDCurrenecy = false
          for(let j = 0 ; j < NTDexchangeRates.length ;j++ ) {
            if(NTDexchangeRates[j].from_currency == data.info[i].currency ) {
              NTDexchangeRate = NTDexchangeRates[j].exange_rate
              findNTDCurrenecy = true
              break
            }
          }
          if(!findNTDCurrenecy) throwApiError(`${data.info[i].currency} to NTD exchange rate not found`, errorCode.exchangeRateNotFound)
        }
        if(data.info[i].currency == 'USD'){
          USDexchangeRate = 1
        } else {
          let findUSDCurrenecy = false
          for(let j = 0 ; j < USDexchangeRates.length ;j++ ) {
            if(USDexchangeRates[j].from_currency == data.info[i].currency ) {
              USDexchangeRate = USDexchangeRates[j].exange_rate
              findUSDCurrenecy = true
              break
            }
          }
          if(!findUSDCurrenecy) throwApiError(`${data.info[i].currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
        }
        let NTDAmount = fixMath.fixedPoint(parseFloat(data.info[i].quantity) * NTDexchangeRate, 6)
        let USDAmount = fixMath.fixedPoint(parseFloat(data.info[i].quantity) * USDexchangeRate, 6)
        data.info[i].quantity = USDAmount
        data.info[i].NTDAmount = NTDAmount
        data.info[i].USDAmount = USDAmount
      }
    } else {
      for(let i = 0 ; i < data.info.length; i++) {
        data.info[i].NTDAmount = 0
        data.info[i].USDAmount = 0
      }
    }

    let response = { category: data.category, requestData:info, waterfall: []  }
    let others = { category: 'others', quantity: 0, USDAmount:0, NTDAmount:0, percentage: 0, suppliers: 0, pn: 0 }
    let total = { category: 'total', quantity: 0, USDAmount:0, NTDAmount:0, percentage: 0, suppliers: 0, pn: 0 }
    // unit = 1k
    let removeRepeatCategory = []
    let index
    data.info.map((x) => {
      x.USDAmount /= 1000
      x.NTDAmount /= 1000
      index = removeRepeatCategory.findIndex(t => t.category == x.category)
      if(index == -1) {
        removeRepeatCategory.push(x)
      } else {
        removeRepeatCategory[index].quantity = fixMath.fixedPoint(removeRepeatCategory[index].quantity + x.quantity, 6)
        removeRepeatCategory[index].USDAmount = fixMath.fixedPoint(removeRepeatCategory[index].USDAmount + x.USDAmount, 6)
        removeRepeatCategory[index].NTDAmount = fixMath.fixedPoint(removeRepeatCategory[index].NTDAmount + x.NTDAmount, 6)
        removeRepeatCategory[index].suppliers = fixMath.fixedPoint(removeRepeatCategory[index].suppliers + x.suppliers, 6)
        removeRepeatCategory[index].pn = fixMath.fixedPoint(removeRepeatCategory[index].pn + x.pn, 6)
      }
    })
    data.info = removeRepeatCategory
    data.info = data.info.sort(function (a, b) {
      return a.quantity < b.quantity ? 1 : -1
    })
    for(let i = 0 ; i < data.info.length; i++) {
      total.quantity = fixMath.fixedPoint(total.quantity + data.info[i].quantity, 6)
      total.USDAmount = fixMath.fixedPoint(total.USDAmount + data.info[i].USDAmount, 6)
      total.NTDAmount = fixMath.fixedPoint(total.NTDAmount + data.info[i].NTDAmount, 6)
      total.suppliers = fixMath.fixedPoint(total.suppliers + data.info[i].suppliers, 6)
      total.pn += data.info[i].pn
      if(i > 8) {
        others.quantity =  fixMath.fixedPoint(others.quantity + data.info[i].quantity, 6)
        others.USDAmount = fixMath.fixedPoint(others.USDAmount + data.info[i].USDAmount, 6)
        others.NTDAmount = fixMath.fixedPoint(others.NTDAmount + data.info[i].NTDAmount, 6)
        others.suppliers = fixMath.fixedPoint(others.suppliers + data.info[i].suppliers, 6)
        others.pn = fixMath.fixedPoint(others.pn + data.info[i].pn, 6)
      } else {
        let tmp = {
          category: data.info[i].category,
          quantity: data.info[i].quantity,
          USDAmount: fixMath.fixedPoint(data.info[i].USDAmount, 6),
          NTDAmount: fixMath.fixedPoint(data.info[i].NTDAmount, 6),
          pn: data.info[i].pn,
          suppliers: data.info[i].suppliers,
        }
        response.waterfall.push(tmp)
      }
    }
    total.USDAmount = fixMath.fixedPoint(total.USDAmount, 6)
    total.NTDAmount = fixMath.fixedPoint(total.NTDAmount, 6)
    others.USDAmount = fixMath.fixedPoint(others.USDAmount, 6)
    others.NTDAmount = fixMath.fixedPoint(others.NTDAmount, 6)

    for(let i = 0 ; i < response.waterfall.length; i++) {
      let percentage = fixMath.fixedPoint(fixMath.fixedPoint(response.waterfall[i].quantity / total.quantity, 6) * 100, 0)
      // if measure is amount reset quantity
      if(measure == 'amount')  response.waterfall[i].quantity = 0
      total.percentage = fixMath.fixedPoint(total.percentage + percentage, 0)
      response.waterfall[i].percentage = percentage
    }
    if(data.info.length > 9) {
      others.percentage = fixMath.fixedPoint(fixMath.fixedPoint(others.quantity / total.quantity, 6) * 100, 0)
      total.percentage = fixMath.fixedPoint(total.percentage + others.percentage, 0)
      others.percentage = fixMath.fixedPoint(others.percentage, 0)
      if(measure == 'amount')   others.quantity = 0
      response.waterfall.push(others)
    }
    others.percentage = fixMath.fixedPoint(others.percentage, 0)
    total.percentage = fixMath.fixedPoint(total.percentage, 0)
    let rounderr = 0
    rounderr = 100 - total.percentage
    total.percentage = 0
    response.waterfall[0].percentage += rounderr
    for(let i = 0 ; i < response.waterfall.length; i++) {
      total.percentage = fixMath.fixedPoint(total.percentage + response.waterfall[i].percentage, 0)
      response.waterfall[i].percentage += '%'
    }
    total.percentage += '%'
    // 去除6.16999998 problem
    if(measure == 'amount')   total.quantity = 0
    total.USDAmount = fixMath.fixedPoint(total.USDAmount, 6)
    response.waterfall.push(total)
    return response
  }
  static async getDashBoardFilterItems(column = null) {
    const ee = await spendingModel.getEeFilterItems(column)
    const me = await spendingModel.getMeFilterItems(column)
    let tmp = ee.concat(me)
    tmp.sort()
    let result = tmp.filter((el, i, arr) => arr.indexOf(el) === i)
    return result
  }
  // static async getDashboardCost(edm_id, id, userID, assign, sku) {
  static async getDashboardCost(dashboardId, supply_type, manufacturer) {
    let res = await spendingModel.getDashboardInfo(dashboardId)
    let meManufacturerFilter = manufacturer ? manufacturer.toUpperCase().split(',') : []

    let result = []
    let resObj = {}
    if (res && res.length > 0) {
      let edm_version_id = res[0].ee_version_id
      let me_version_id = res[0].me_version_id
      let sku = this.getMeSkuFromVersionName(res[0].me_version_name)
      let eeCost = null
      let projectName = null
      let meCost = null
      let eeVersion = null
      let project_code = null
      if (_isDefaultUuid(edm_version_id)) {
        result.push({
          id: 'EE',
          total_last: 0,
          total_suggestion: 0,
          module: [],
          bu: [],
        })
      } else {
        eeCost = await this.getEeCostV2(edm_version_id, supply_type)
        let projectNameRes = await spendingModel.getEeProjectName(edm_version_id)
        eeVersion = await spendingModel.getEeSku(edm_version_id)
        project_code = projectNameRes.length > 0 ? projectNameRes[0].project_code : null
        projectName = projectNameRes.length > 0 ? projectNameRes[0].project_name : null
        result.push(eeCost)
      }
      if(_isDefaultUuid(me_version_id)){
        result.push({
          id: 'ME',
          total_last: 0,
          total_suggestion: 0,
          module: [],
        })
      } else {
        meCost = await this.getMeCost(me_version_id, sku, meManufacturerFilter)
        let searchRes = await bomManagerModel.getMeIdVersionId(me_version_id)
        let bomId = searchRes.bom_id
        let isEmdmProject = await emdmBomUtils.isEmdmProject(bomId)
        let projectInfo = {}
        if (isEmdmProject) {
          projectInfo = await emdmModel.getEmdmBomDetailById(bomId)
        } else {
          projectInfo = await bomManagerModel.getMeBomDetailById(bomId)
        }
        projectName = projectName ? projectName : projectInfo[0].project_name ? projectInfo[0].project_name : ''
        project_code = project_code ? project_code : projectInfo[0].project_code ? projectInfo[0].project_code : ''
        let detail = meCost.list ? meCost.list : {
          id: 'ME',
          total_last: 0,
          total_suggestion: 0,
          module: [],
        }
        result.push(detail)
      }
      result.push({ id: 'Others' })

      let combineTotalLast = 0
      let combineTotalSuggest = 0
      if (meCost != null) {
        combineTotalLast += meCost.total_last ? meCost.total_last : 0
        combineTotalSuggest += meCost.total_suggestion ? meCost.total_suggestion : 0
      }
      if(eeCost != null){
        combineTotalLast += eeCost.total_last ? eeCost.total_last : 0
        combineTotalSuggest += eeCost.total_suggestion ? eeCost.total_suggestion : 0
      }
      resObj.edm_version_id = edm_version_id
      resObj.me_version_id = me_version_id
      resObj.project_name = projectName
      resObj.ee_show_detail = !_isDefaultUuid(edm_version_id)
      resObj.me_show_detail = !_isDefaultUuid(me_version_id)
      resObj.project_code = project_code
      resObj.total_last = formatFloat(combineTotalLast, dashBoardFloatPoint.get('default'))
      resObj.total_suggestion = formatFloat(combineTotalSuggest, dashBoardFloatPoint.get('default'))
      resObj.sku = { ee: eeVersion && eeVersion.length > 0 && eeVersion[0].version ? eeVersion[0].version : '', me: sku }
      resObj.lists =  result
      return resObj
    } else {
      resObj.edm_version_id = null
      resObj.me_version_id = null
      resObj.project_name = null
      resObj.ee_show_detail = false
      resObj.me_show_detail = false
      resObj.project_code = null
      resObj.total_last = null
      resObj.total_suggestion = null
      resObj.sku = { ee: null, me: null }
      resObj.lists = null
      return resObj
    }
  }
  /**
   * 取得Dashboard用的EE BOM COST表，
   * @param {String} id edm_version_id
   * @param {String} supply_type 要過濾的supply_type
   */
  static async getEeCostV2(edmVersionId, supply_type = null) {
    try {
      let eeBomInfoList = await this.getEeBomInfoList(edmVersionId, supply_type)
      let pcbInfoList = await pcbService.pcbExportFormat(edmVersionId, supply_type)
      let calculationAllPrice = eeBomUtils.calculationAllPrice(eeBomInfoList, pcbInfoList)
      let buPriceList = getBuPriceList(eeBomInfoList, pcbInfoList, calculationAllPrice.calPcbPriceInfo)
      let modulePriceList = getModulePriceList(eeBomInfoList)
      return {
        id:'EE',
        total_suggestion: calculationAllPrice.totalSuggestionCost,
        total_last: calculationAllPrice.totalLastPrice,
        bu: buPriceList,
        module: modulePriceList,
        pcb_total_last_price: calculationAllPrice.calPcbPriceInfo.totalLastPrice,
        totalPartsCount: calculationAllPrice.totalPartsCount,
      }
    } catch (err) {
      throw err
    }
  }

  static async getModuleDetail(version_id, module_id) {
    const result = await spendingModel.getModuleDetail(version_id, module_id)
    return { response: result }
  }
  static async getModuleDetailV2(version_id, module_id, category = 'bu', supply_type = null) {
    let eeSupplyFilter = supply_type ? supply_type.toUpperCase().split(',') : []
    let exchangeRateForSheet = []

    let result = await spendingModel.getModuleDetailV2(version_id)
    let versionInfos = await eeBomDetailModel.getEdmVersionInfo(version_id)

    if(result.length > 0 && Object.keys(versionInfos).length > 0) {
      result = await eeBomService.genSuggestionInfoFromEEDetail(result, versionInfos.avl)
    }

    result = eeBomUtils.eeBomFilter(result, 'supply_type', eeSupplyFilter)
    result = eeBomUtils.getModuleList(category, module_id, result)
    result = _.orderBy(result, ['type1', 'type2'], ['asc', 'asc'])
    let detail = _.map(result, (eebomInfo, idx) => {
      let spa_part_number = eebomInfo.other_manufacture_info ? eebomInfo.other_manufacture_info.spa_partnumber : null
      let spa_manufacturer = null
      let spa_original_currency = eebomInfo.other_manufacture_info && eebomInfo.other_manufacture_info.original_currency ? eebomInfo.other_manufacture_info.original_currency : null
      let spa_original_price = eebomInfo.other_manufacture_info && eebomInfo.other_manufacture_info.original_spa_price ? eebomInfo.other_manufacture_info.original_spa_price : null
      let spa_valid_from = eebomInfo.other_manufacture_info && eebomInfo.other_manufacture_info.spa_valid_from ? eebomInfo.other_manufacture_info.spa_valid_from : null
      let alt_grouping = eebomInfo.alt_grouping ? eebomInfo.alt_grouping.join() : null
      eebomInfo.alt_grouping = alt_grouping
      if(eebomInfo.other_manufacture_info) {
        try {
          spa_manufacturer = JSON.parse(eebomInfo.other_manufacture_info.spa_manufacturer).join()
        } catch (err) {
          logger.warn('Spending getModuleDetailV2 :Can not parse json : spa_manufacturer.')
          throw err
        }
      }


      let avl_spa_part_number = eebomInfo.avl_spa_other_info ? eebomInfo.avl_spa_other_info.spa_partnumber : null
      eebomInfo.avl_spa_pn = avl_spa_part_number

      eebomInfo.avl_spa_cost = fixMath.transStringToFloat(eebomInfo.avl_spa)
      eebomInfo.avl_spa_org_curr = eebomInfo.avl_spa_other_info && eebomInfo.avl_spa_other_info.original_currency ? eebomInfo.avl_spa_other_info.original_currency : null
      eebomInfo.avl_spa_org_cost = eebomInfo.avl_spa_other_info && eebomInfo.avl_spa_other_info.original_spa_price ? fixMath.transStringToFloat(eebomInfo.avl_spa_other_info.original_spa_price) : null
      eebomInfo.avl_spa_valid_from = eebomInfo.avl_spa_other_info && eebomInfo.avl_spa_other_info.spa_valid_from ? moment(eebomInfo.avl_spa_other_info.spa_valid_from).locale('zh-tw').format('YYYYMMDD') : null

      if(eebomInfo.avl_spa_other_info) {
        eebomInfo.avl_spa_manufacturer = JSON.parse(eebomInfo.avl_spa_other_info.spa_manufacturer).join()
      } else {
        eebomInfo.avl_spa_manufacturer = null
      }

      let avl_alt_part_number = eebomInfo.avl_alt_other_info ? eebomInfo.avl_alt_other_info.alt_lowest_partnumber : null
      eebomInfo.avl_alt_lowest_pn = avl_alt_part_number
      eebomInfo.avl_alt_lowest_cost = fixMath.transStringToFloat(eebomInfo.avl_alt)
      eebomInfo.avl_alt_lowest_grouping = alt_grouping
      eebomInfo.avl_alt_lowest_manufacturer = eebomInfo.avl_alt_other_info ? eebomInfo.avl_alt_other_info.alt_manufacturer : null

      /**
        avl_spa_cost
        avl_spa_org_curr
        avl_spa_org_cost
        avl_spa_valid_from
        avl_spa_pn
        avl_spa_manufacturer
        avl_spa_supply_type
        avl_alt_lowest_cost
        avl_alt_lowest_pn
        avl_alt_lowest_manufacturer
        avl_alt_lowest_grouping
        avl_spa_bolder
        avl_alt_bolder
       */
      eebomInfo = _.omit(eebomInfo, ['other_manufacture_info', 'avl_alt_other_info', 'avl_spa_other_info'])
      eebomInfo.spaPartNumber = spa_part_number
      eebomInfo.spaManufacturer = spa_manufacturer
      eebomInfo.spaOriginCurrency = spa_original_currency
      eebomInfo.spaOriginPrice = fixMath.transStringToFloat(spa_original_price)
      eebomInfo.spaValidFrom = spa_valid_from
      eebomInfo.clean_sheet_cost = null
      eebomInfo.exp = eebomInfo.current_price ? 'N' : 'Y'
      eebomInfo.last_price_currency_price = fixMath.transStringToFloat(eebomInfo.last_price_currency_price)
      eebomInfo.last_price = fixMath.transStringToFloat(eebomInfo.current_price)
      eebomInfo.current_price = fixMath.transStringToFloat(eebomInfo.current_price)
      eebomInfo.spa = fixMath.transStringToFloat(eebomInfo.spa)
      eebomInfo.lpp = fixMath.transStringToFloat(eebomInfo.lpp)
      eebomInfo.ce_cost = fixMath.transStringToFloat(eebomInfo.ce_cost)
      eebomInfo.suggestion_cost = fixMath.transStringToFloat(eebomInfo.suggestion_cost)
      eebomInfo.qty = fixMath.transStringToFloat(eebomInfo.qty)
      eebomInfo.sub_total_suggestion_cost = fixMath.transStringToFloat(eebomInfo.sub_total_suggestion_cost)
      eebomInfo.sourcer_cost = fixMath.transStringToFloat(eebomInfo.sourcer_cost)
      eebomInfo.sub_total_last_price = fixMath.transStringToFloat(eebomInfo.subTotalLastPrice)
      eebomInfo.subTotalLastPrice = fixMath.transStringToFloat(eebomInfo.subTotalLastPrice)
      eebomInfo.clean_sheet_cost = fixMath.transStringToFloat(eebomInfo.clean_sheet_cost)
      eebomInfo.alt_lowest_price = fixMath.transStringToFloat(eebomInfo.alt_lowest_price)
      eebomInfo.currrent_price_adj_percentage = fixMath.transStringToFloat(eebomInfo.currrent_price_adj_percentage)
      eebomInfo.currency = eebomInfo.last_price_currency
      eebomInfo.cmp = eebomInfo.is_common_parts ? 'Y' : 'N'
      eebomInfo.costDiff = fixMath.transStringToFloat(eebomInfo.subTotalLastPrice) - fixMath.transStringToFloat(eebomInfo.sub_total_suggestion_cost)
      return {
        ...eebomInfo,
      }
    })
    exchangeRateForSheet = await getNewModuleExchangeRateSheet(version_id, detail)
    let supplyList = await getSPASupplyTypeByPN(detail.map(e => e.spaPartNumber))
    let avlSupplyList = await getSPASupplyTypeByPN(detail.map(e => e.avl_spa_pn))

    detail.forEach(e => {
      let supplyRes = supplyList.find(s => s.matnr == e.spaPartNumber)
      e.spaSupplyType = supplyRes ? supplyRes.supply_type.join() : null

      let avlSupplyRes = avlSupplyList.find(s => s.matnr == e.avl_spa_pn)
      e.avl_spa_supply_type = avlSupplyRes ? avlSupplyRes.supply_type.join() : null
    })
    return {
      response: detail,
      exchangeRate: exchangeRateForSheet.exchangeRate.length > 0 ? exchangeRateForSheet.exchangeRate : [],
      exchangeRateDefault: exchangeRateForSheet.defaultExchangeRate,
      // exchangeRate: exchangeRateForSheet.exchangeRate.length > 0 ? exchangeRateForSheet.exchangeRate : [['']],
      // exchangeRateDefault: exchangeRateForSheet.defaultExchangeRate.length > 0 ? exchangeRateForSheet.defaultExchangeRate : [['']] ,
    }
  }

  static async getMeCost(vid, sku, filterArray = []) {
    let queryRes = await this.getBomTableByCompleteVersionId(vid, sku)
    let res = {}
    if (queryRes == null) {
      res.project_name = ''
      res.project_code = ''
      res.total_last = 0
      res.total_suggest = 0
      res.list = {
        id: 'ME',
        total_last: 0,
        total_suggest: 0,
        module: [],
      }
      return res
    }
    let bomItems = queryRes.bomItems
    let findAllParentType = _.filter(bomItems, (i) => { return i.level == 'DC/65' || (i.level == '2' && !i.sub_leve)})
    // 20190906 add filter
    findAllParentType = meBomCost.meBomFilter(findAllParentType, 'odm_oem', filterArray)
    queryRes.skuCost = meBomCost.setSkuSumObject(meBomCost.getSingleSkuSum(findAllParentType, sku))

    let filterSkuCost = queryRes.skuCost ? _.find(queryRes.skuCost, (v) => { return v[sku] }) : null
    let total_suggest = filterSkuCost ? filterSkuCost[sku] ? filterSkuCost[sku] : 0 : 0

    findAllParentType = _.orderBy(findAllParentType, ['parts_ctgy_1'], ['asc'])
    let groupRes = _.groupBy(findAllParentType, 'parts_ctgy_1')
    let calMeModule = []
    let total_last = 0
    // let total_suggest = 0
    _.forEach(Object.keys(groupRes), (v) =>{
      let moduleObj = {}
      let moduleName = v == 'null' ? '' : v
      let module_last = 0
      let module_suggest = 0
      _.forEach(groupRes[v], (dv) =>{
        let suggestionCost = dv.ce_cost_sku_amount
        let skuNum = dv[sku] ? dv[sku] : 0
        // [#308] ME Last Price 由 Last Price & Sourcer Cost 取一，若兩者都有價錢，則以 Last Price 為主
        let lastCost = dv.last_price_up ? dv.last_price_up : 0
        if (lastCost === 0 && dv.sourcer_cost_up) {
          lastCost = dv.sourcer_cost_up
        }
        lastCost *= skuNum
        // module_last += (lastCost * skuNum)
        // module_suggest += (suggestionCost * skuNum)
        module_last += lastCost
        module_suggest += suggestionCost

      })
      total_last += module_last
      // total_suggest +=  module_suggest
      moduleObj.module = moduleName
      moduleObj.total_last = formatFloat(module_last, dashBoardFloatPoint.get('default'))
      moduleObj.suggestion = formatFloat(module_suggest, dashBoardFloatPoint.get('default'))
      calMeModule.push(moduleObj)
    })
    res.project_name = queryRes ? queryRes.project_name : ''
    res.project_code = queryRes ? queryRes.project_code : ''
    res.total_last = formatFloat(total_last, dashBoardFloatPoint.get('default'))
    res.total_suggestion = formatFloat(total_suggest, dashBoardFloatPoint.get('default'))
    res.list = {
      id:'ME',
      total_last: formatFloat(total_last, dashBoardFloatPoint.get('default')),
      total_suggestion: formatFloat(total_suggest, dashBoardFloatPoint.get('default')),
      module:calMeModule,
    }
    return res
  }
  // static async getMeDetail(id, userID, assign, sku, type1) {
  static async getMeDetail(id, sku, type1, manufacturer) {
    let detail = []
    let queryRes = await this.getBomTableByCompleteVersionId(id, sku)
    if (queryRes == null) {
      return { response: detail }
    }
    if (!type1) type1 = null
    let meManufacturerFilter = manufacturer ? manufacturer.toUpperCase().split(',') : []
    let bomItems = queryRes.bomItems
    let findAllParentType = _.filter(bomItems, (i) => {
      return i.level == 'DC/65' || (i.level == '2' && !i.sub_leve)
        && i.parts_ctgy_1 == type1 && i[sku] > 0
    })

    // 20190906 add filter
    findAllParentType = meBomCost.meBomFilter(findAllParentType, 'odm_oem', meManufacturerFilter)

    _.forEach(findAllParentType, (v) => {
      // let suggestionCost = meBomCost.getItemSuggestionCost(v)
      let resBase = {
        part_number: v.part_number,
        part_name:v.part_name,
        type1: v.parts_ctgy_1,
        type2: v.parts_ctgy_2,
        gb_assy_ctgy: v.gb_assy_ctgy,
        last_price: v.last_price_up ? v.last_price_up : 0,
        clean_sheet_cost: v.system_cost,
        spa_cost: v.spa_cost_up,
        sourcer_cost: v.inquiry_cost_up,
        suggestion_cost: v.suggestionCost,
        remark: v.remark ? v.remark : '',
      }
      detail.push(resBase)
    })
    detail = _.orderBy(detail, ['type1', 'gb_assy_ctgy'], ['asc', 'asc'])
    return { response: detail }
  }

  static async getCombineVersion(project_code, eeProjectID, meID) {
    // let assign = 'all'
    let meSku = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']
    let emdmResult = []
    let meRes = []
    let eeResult = []
    // const eeResult = await spendingModel.getEeVersion(project_code)
    if(project_code){
      let queryRes = await spendingModel.getEeVersion(project_code, eeProjectID)
      _.forEach(queryRes, (dv) =>{
        let obj = {}
        obj.id = dv.id
        obj.version =  `${dv.version}`
        obj.sku = dv.sku
        obj.version_num = `V${parseFloat(dv.status_version).toFixed(1)}`
        obj.platform = dv.platform
        obj.stage = dv.stage
        obj.pcbno = dv.pcbno
        eeResult.push(obj)
      })
      let emdmRes = await spendingModel.getEmdmCompleteVersion(project_code)
      _.forEach(emdmRes, (versionItem) =>{
        let version_id = versionItem.version_id
        let version_name =  versionItem.version_name
        let emdm_version = `${versionItem.source_version}_${moment(versionItem.create_time).format('YYYYMMDDHHmm')}`
        _.forEach(meSku, (skuName) =>{
          let obj = {
            id: version_id,
            emdm_version: emdm_version,
            version_num: version_name,
            version: `${emdm_version}_V${version_name}_${skuName}`,
            sku: skuName,
          }
          emdmResult.push(obj)
        })
      })
    }

    if(meID != 0) {
      let Vid = await spendingModel.getMeCompleteVersion(project_code, meID)
      _.forEach(Vid, (dv) =>{
        let version_id = dv.version_id
        let version_name =  dv.version_name
        _.forEach(meSku, (v) =>{
          let obj = {}
          obj.id = version_id
          obj.version_num = version_name
          obj.version =  `MEBOM_V${obj.version_num}_${v}`
          obj.sku = v
          meRes.push(obj)
        })
      })
    }

    return {
      meVersions: meRes,
      emdmVersions: emdmResult,
      eeVersions: eeResult,
    }
  }
  static async insertCombineVersion(ee_sku, eeVersionID, ee_version_name, ee_version, meVersionID, meVersionName, me_version, project_code) {
    let tmp = {
      project_code:project_code,
      ee_sku:ee_sku,
      ee_version_id: eeVersionID,
      ee_version_name:ee_version_name,
      ee_version:ee_version,
      me_version_id:meVersionID,
      me_version_name:meVersionName,
      me_version:me_version,
    }
    const result = await spendingModel.insertCombineVersion(tmp)
    return result
  }

  static async getBomTableByCompleteVersionId(id, skuNum = 'sku1') {
    // let project = await bomItemModel.bomPNameAndDesc(id)
    let result = await bomItemModel.getBomTableByCompleteVersionId(id)

    // can not find data
    if(result.rows.length == 0){
      return null
    }

    // root
    // DC/65 等同於LEVEL 2 但是現在沒有
    // 找出所有母階bom Item
    let root = _.chain(result.rows)
      .filter((o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      .sortBy((s) => {
        return s.order_id
      })
      .value()

    let recordCount = {}
    // 取出所有子階
    _.chain(result.rows)
      .filter((o) => { return o.sub_level && o.parent_level != null })
      .groupBy((o) => { return o.level })
      // .sortBy((s) => s.order_id) Complete的版本無此屬性
      .map((value) => {
        value.map(v => {
          let idx = root.findIndex(r => v.parent_level == r.id) // 找出母階所在位置
          let count = isNaN(recordCount[v.parent_level]) ? 0 : recordCount[v.parent_level] + 1
          root.splice(idx + 1 + count, 0, v) // 將子階項目插入到母階後
          recordCount[v.parent_level] = count
        })
      })
      .value()

    // compute clean sheet cost
    // 取得計算組工費參數
    let datetimeCondition = root && root[0].version_create_time ? root[0].version_create_time : null
    let laboragePara = await meBomCost.getLaborageParamater(datetimeCondition)
    meBomCost.computeLaborage(root, skuNum, laboragePara)
    let skuSum = meBomCost.getSingleSkuSum(root, skuNum)
    // let skuSum = meBomCost.computeSkuSumCost(root)
    // let bomItemsPart = filterPartList(root)
    let unEditCount = 0
    let partListCount = 0
    let version = 'V0.0'
    let project_code = ''
    let project_name = ''
    let bom_id = ''
    let customer = ''
    let stage_name = ''
    let bom_project_create_time = ''
    let sku_desc = ''
    let bomItems = _.map(root, (bomItem, idx) => {
      version = bomItem.version_name
      project_code = bomItem.project_code
      project_name = bomItem.project_name
      bom_id = bomItem.bom_id
      customer = bomItem.customer
      stage_name = bomItem.stage_name
      sku_desc = bomItem.sku_desc
      bom_project_create_time = bomItem.bom_project_create_time
      let resBase =  meBomUtils.getBomBaseObj(bomItem, idx)
      meBomUtils.addCostInfoInObj(bomItem, resBase, skuNum)
      return resBase
    })


    // if isRDME == empty, user != RDME so can view sku_cost
    let sku_cost = null
    if(skuSum != null && skuSum.length > 0){
      sku_cost = [{ sku0: skuSum[0] }, { sku1: skuSum[1] }, { sku2: skuSum[2] }, { sku3: skuSum[3] },
        { sku4: skuSum[4] }, { sku5: skuSum[5] }]
    }else{
      sku_cost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    }

    return {
      totalItems: result.rowCount,
      skuCost: sku_cost,
      skuDesc: sku_desc,
      bomItems,
      totalPartlistCount:partListCount,
      unEditCount: unEditCount,
      version: version,
      project_code: project_code,
      project_name: project_name,
      bom_id:bom_id,
      customer:customer,
      stage_name:stage_name,
      bom_project_create_time:bom_project_create_time,
    }
  }


  // TO Ian: function for ME export
  static async MEexport(versionId, sku, manufacturer) {
    let queryRes = await this.getBomTableByCompleteVersionId(versionId, sku)
    let resObj = {}
    let meManufacturerFilter = manufacturer ? manufacturer.toUpperCase().split(',') : []
    let detailArr = []
    resObj.export_date = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
    resObj.export_from = 'Dashboard'
    if (queryRes) {
      resObj.skuDesc = queryRes.skuDesc ? queryRes.skuDesc : ''
      resObj.customer = queryRes.queryRes ? queryRes.queryRes : ''
      resObj.project_name = queryRes.project_name ? queryRes.project_name : ''
      resObj.project_code = queryRes.project_code ? queryRes.project_code : ''
      resObj.version = queryRes.version ? queryRes.version : ''
      resObj.stage_name = queryRes.stage_name ? queryRes.stage_name : ''
      resObj.create_time = queryRes.bom_project_create_time ? moment(queryRes.bom_project_create_time).format('YYYY-MM-DD') : ''
      resObj.total_parts_count = 0
      let totalSkuCost = 0

      if(queryRes.bomItems && queryRes.bomItems.length > 0){

        let findAllParentType = _.filter(queryRes.bomItems, (i) => {
          return i.level == 'DC/65' || (i.level == '2' && !i.sub_leve)
            && i[sku] > 0
        })
        // 20190906 add filter
        findAllParentType = meBomCost.meBomFilter(findAllParentType, 'odm_oem', meManufacturerFilter)
        resObj.total_parts_count = findAllParentType.length
        queryRes.skuCost = meBomCost.setSkuSumObject(meBomCost.getSingleSkuSum(findAllParentType, sku))
        let filterSkuCost = queryRes.skuCost ? _.find(queryRes.skuCost, (v) => { return v[sku] }) : null
        totalSkuCost = filterSkuCost ? filterSkuCost[sku] ? filterSkuCost[sku] : 0 : 0

        _.forEach(findAllParentType, (dv, idx) =>{
          let detailObj = {}
          // let suggestionCost = meBomCost.getItemSuggestionCost(dv)
          let skuNum = dv[sku] ? formatFloat(dv[sku], meFloatPoint.get('SKU')) : 0
          // totalSkuCost += (suggestionCost * skuNum)

          detailObj.parts_ctgy_1 = dv.parts_ctgy_1 ?  dv.parts_ctgy_1 : null
          detailObj.gb_assy_ctgy = dv.gb_assy_ctgy ?  dv.gb_assy_ctgy : null
          detailObj.part_name = dv.part_name ?  dv.part_name : null
          detailObj.part_number = dv.part_number ?  dv.part_number : null
          detailObj.sku = sku
          detailObj.func_ctgy = dv.func_ctgy ?  dv.func_ctgy : null
          detailObj.qty = skuNum
          detailObj.bu_target_cost = null
          detailObj.bu_target_total_cost = null
          detailObj.ce_cost = formatFloat(dv.ce_cost_up, meFloatPoint.get('ceCostUP'))
          // detailObj.ce_total_cost = formatFloat(dv.suggestion_cost * skuNum, 4)
          detailObj.ce_total_cost = formatFloat(dv.ce_cost_sku_amount, meFloatPoint.get('ceCostSKU'))
          detailObj.cm_cost = null
          detailObj.cm_total_cost = null
          // detailObj.remark = _.isEmpty(dv.extra) ? null : dv.extra.remark ? dv.extra.remark : ''
          detailObj.remark = dv.remark ? dv.remark : null
          detailArr.push(detailObj)
        })
      }
      resObj.total_suggestion_cost = formatFloat(totalSkuCost, meFloatPoint.get('ceCostSKU'))
    }

    detailArr = _.orderBy(detailArr, ['parts_ctgy_1', 'gb_assy_ctgy'], ['asc', 'asc'])
    resObj.detail = detailArr
    // console.log('=====resObj=====>', resObj)
    return resObj
  }

  static async exportDashboard(meData, fullBomPartsList, odmPartData, pcbPartData, userID, manufacturer, skuCount, supply_type, fileName, folderPath) {
    const exportFrom = 'Dashboard'
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = path.join('dashboard', 'excel-dashboard.yaml')
    let rawData = {}
    let meSummary = {}
    let exportPermission = await rbacService.getPolicyByUser(userID, {
      action: 'List',
      resource: 'dashboard',
    })
    if(_.isEmpty(exportPermission)) {
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    let nonValueSummary = {
      export_from: 'Dashboard',
      eecost_gap: null,
      others: null,
      export_date: null,
      customer: null,
      project_name: null,
      project_code: null,
      version: null,
      bom_create_date: null,
      rfq_finish_date: null,
      total_parts_count: null,
      total_part_number_count: null,
      total_last_price_sap: null,
      total_suggestion_cost: null,
      total_opportunity: null,
      pcb_last_price: null,
      opp_common_parts: null,
      opp_sbm: null,
      opp_ee: null,
      total_opp_type1: null,
      opp_common_parts_type1: null,
      opp_sbm_type1: null,
      opp_ee_type1:  null,
      bu_target_date: null,
      bu_target_cost: null,
      hit_rate: null,
      eedm_ver: null,
      status_version: null,
      supply_type: null,
    }

    // for me information summary
    meSummary = {
      export_from: meData.export_from,
      export_date: meData.export_date,
      sku_desc: meData.skuDesc,
      customer: meData.customer,
      project_name: meData.project_name,
      project_code: meData.project_code,
      version: meData.version,
      stage_name: meData.stage_name,
      create_time: meData.create_time,
      total_parts_count: meData.total_parts_count,
      sku_cost: meData.total_suggestion_cost,
    }
    rawData = {
      DashboardMeSummary: meSummary,
      DashboardMeItem: meData.detail,
      CostTable: [],
      fullBomSummary: fullBomPartsList.summary,
      fullBomItem: fullBomPartsList.detail,
      odmPartSummary: odmPartData.summary,
      odmPartItem: odmPartData.detail,
      cost: fullBomPartsList.summary,
      costFilter: odmPartData.summary,
      opportunity: fullBomPartsList.summary,
      opportunityFilter: odmPartData.summary,
      pcbSummary: pcbPartData.summary,
      pcbItem: pcbPartData.detail,
      hitRate: excelHeader.getNewModuleCommonParts(fullBomPartsList.detail),
      odmHitRate: excelHeader.getNewModuleCommonParts(odmPartData.detail),
      exchangeRate: fullBomPartsList.exchangeRate,
      exchangeRateDefault: fullBomPartsList.exchangeRateDefault,
      buItem: fullBomPartsList.by_bu,
      moduleItem: fullBomPartsList.by_module,
      odmPartNewOpportunity: null,
    }
    if(_.isEmpty(meData) && !_.isEmpty(fullBomPartsList)) {
      fullBomPartsList.summary['supply_type'] = supply_type
      fullBomPartsList.summary['export_from'] = exportFrom
      odmPartData.summary['export_from'] = exportFrom
      pcbPartData.summary['export_from'] = exportFrom
      rawData['DashboardMeItem'] = []

    }else if(!_.isEmpty(meData) && _.isEmpty(fullBomPartsList)) {
      rawData['fullBomSummary'] = nonValueSummary
      rawData['odmPartSummary'] = nonValueSummary
      rawData['fullBomItem'] = []
      rawData['odmPartItem'] = []
      rawData['pcbSummary'] = nonValueSummary
      rawData['pcbItem'] = []
      rawData['opportunity'] = nonValueSummary
      rawData['opportunityFilter'] = nonValueSummary
      rawData['cost'] = nonValueSummary
      rawData['costFilter'] = nonValueSummary
      rawData['exchangeRate'] = []
      rawData['exchangeRateDefault'] = []
      rawData['buItem'] = []
      rawData['moduleItem'] = []

    }else {
      fullBomPartsList.summary['supply_type'] = supply_type
      fullBomPartsList.summary['export_from'] = exportFrom
      odmPartData.summary['export_from'] = exportFrom
      pcbPartData.summary['export_from'] = exportFrom
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath, skuCount)
    console.log(`get the excel path: ${await excel.execute()}`)
  }

  static async getEeCost(id) {
    const result = await spendingModel.getEeCost(id)
    let currTotal = 0, suggTotal = 0
    _.map(result, v => {
      if(v.current || v.suggestion) {
        v.current = fixMath.fixedPoint(parseFloat(v.current), 5)
        v.suggestion = fixMath.fixedPoint(parseFloat(v.suggestion), 5)
        currTotal += v.current
        suggTotal += v.suggestion
      }

    })
    let res = []
    let tmp = {
      id:'EE',
      total_suggestion: fixMath.fixedPoint(suggTotal, 5),
      current: fixMath.fixedPoint(currTotal, 5),
      module: result
    }
    res.push(tmp)
    return {
      info:{
        lists:res,
      },
    }
  }

  static async exportItemView(data, category, edm_version_id, item_id, supply_type, filePath, excelFolder) {
    const exportFrom = 'Dashboard'
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${excelFolder}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${excelFolder}/${filePath}.xlsx`)
    let excelYmlPath
    let rawData = {}
    let project = await spendingModel.getEeProjectDetail(edm_version_id)
    let total_part_number_count = 0
    let itemTmp
    let calPriceObj = null
    if(item_id.toLowerCase() == 'pcb') {
      itemTmp = data
      calPriceObj = eeBomUtils.calculationTotalPcbPrice(itemTmp)
    }else {
      itemTmp = data.response
      calPriceObj = eeBomUtils.calculationTotalBomPrice(itemTmp)
    }
    if (itemTmp.length > 0) {
      // part number count
      let uniqPN = _.chain(itemTmp)
        .map(value => value.part_number)
        .uniqBy()
        .value()
      total_part_number_count = uniqPN.length
    }
    let opportunity = calPriceObj.totalLastPrice - calPriceObj.totalSuggestionCost
    let summary = {
      export_from: exportFrom,
      export_date: moment(new Date()).format('YYYYMMDD HH:mm:ss'),
      customer: project.customer ? project.customer : null,
      project_name: project.project_name ? project.project_name : null,
      project_code: project.project_code ? project.project_code : null,
      version: project.version ? fixMath.versionNumberToFloat(project.version) : null,
      bom_create_date: project.create_time ? moment(project.create_time).format('YYYYMMDD HH:mm') : null,
      rfq_finish_date: project.rfq_finish_date ? moment(project.rfq_finish_date).format('YYYYMMDD HH:mm') : null,
      bu_target_date: null, // 目前先給 null
      bu_target_cost: null, // 目前先給 null
      eedm_ver: project.eedm_ver ? project.eedm_ver : null,
      total_opportunity: opportunity,
      supply_type: supply_type,
      view_by: category,
      category: item_id,
      total_part_number_count: total_part_number_count,
      total_parts_count: calPriceObj.totalPartsCount,
      total_last_price_sap: calPriceObj.totalLastPrice,
      total_suggestion_cost: calPriceObj.totalSuggestionCost,
    }
    if(item_id.toLowerCase() == 'pcb') {
      excelYmlPath = path.join('dashboard-item', 'excel-dashboard-pcb.yaml')
      let exchangeRateForSheet = await getNewModuleExchangeRateSheet(edm_version_id, data)
      rawData = {
        itemSummary: summary,
        pcbDetail: data,
        exchangeRate: exchangeRateForSheet.exchangeRate.length > 0 ? exchangeRateForSheet.exchangeRate : [],
        exchangeRateDefault: exchangeRateForSheet.defaultExchangeRate,
      }
    }else {
      excelYmlPath = path.join('dashboard-item', 'excel-dashboard-item.yaml')
      rawData = {
        itemSummary: summary,
        itemDetail: data.response,
        exchangeRate: data.exchangeRate,
        exchangeRateDefault: data.exchangeRateDefault,
      }
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)
  }

  static async getDashboardInfo(dashboardId){
    let res = await spendingModel.getDashboardInfo(dashboardId)
    return res
  }

  static async getDashBoardFilterType() {
    // 20190906 asana feedback 下拉選單是為固定值
    return dashboardFilterType
  }
  static async getEebomExportProjectInfo(edm_version_id) {
    let project = await spendingModel.getEeProjectDetail(edm_version_id)
    if (project.length <= 0) {
      logger.debug(`dashboard get eebom project detail length 0 : edm id ${edm_version_id}`)
      return throwApiError('edm_version_id not found any project detail', errorCode.NOT_FOUND)
    }

    return {
      customer: project.customer ? project.customer : null,
      project_name: project.project_name ? project.project_name : null,
      project_code: project.project_code ? project.project_code : null,
      version: project.version ? fixMath.versionNumberToFloat(project.version) : null,
      bom_create_date: project.create_time ? moment(project.create_time).format('YYYYMMDD HH:mm') : null,
      rfq_finish_date: project.rfq_finish_date ? moment(project.rfq_finish_date).format('YYYYMMDD') : null,
      eedm_ver: project.eedm_ver ? project.eedm_ver : null,
      status_version: project.status_version,
      plant: project.plant ? project.plant : null,

      product_type: project.product_type,
      platform: project.platform,
      sku: project.sku,
      pcb_no_stage: project.pcbno_stage,
      stage: null, // 先留空
      purchase_org_plant: _.map(project.purchase_org_plant, (plantCode) => {
        return `${plantCode.purchasing_organization}:${plantCode.plants.join(',')}`
      }).join(';'), // ex: 'PWKS:F720,F721;PWCD:F130,F131'
      avl_filter: project.avl ? 'Y' : 'N',
    }
  }
  /**
   * Return EE Bom data new format for using new export module
   * @param {String} edm_version_id ee version id
   * @param {String} supplytype filter supply type
   * @returns {Object} return new eebom format for export
   */
  static async exportEENewModuleData(edm_version_id, eedomDetail, projectInfo, supplytype = null) {
    let eebomDetail = []
    let buForExcel = {}
    let moduleForExcel = {}
    let exchangeRateForSheet = []
    let eeSupplyFilter = supplytype ? supplytype.toUpperCase().split(',') : []
    // let projectInfo = await this.getEebomExportProjectInfo(edm_version_id)

    // sheet all: PCB
    let pcbRes = await pcbService.pcbExportFormat(edm_version_id, supplytype) // test id:('661ed6d1-ac3d-45c6-a5d5-35d0bcb48301')
    if (pcbRes.length > 0) {
      eebomDetail = _.sortBy(pcbRes, ['type1', 'type2', 'part_number'])
    }

    let info = {
      edm_version_id,
      isOdmParts: false,
    }
    // sheet all: eebom
    let eebomRes = await getEEBomDetailList(eedomDetail, info)

    //20190909 add filter
    eebomRes = eeBomUtils.eeBomFilter(eebomRes, 'supply_type', eeSupplyFilter)
    eebomRes = _.sortBy(eebomRes, ['type1', 'type2', 'part_number', 'supply_type'])

    eebomDetail.push(...eebomRes)

    let totalOpportunity = genEebomSummaryOpportunity(eebomDetail)

    // 20190925 新增 spaOriginPrice, spaOriginCurrency, last_price_currency, last_price_currency_price for EXcel 修改格式 and exchange rate
    // get exchange rate
    exchangeRateForSheet = await getNewModuleExchangeRateSheet(edm_version_id, eebomDetail)

    // by_BU & by_module
    let eecost = await this.getEeCostV2(edm_version_id, supplytype)

    // parsing data from getEeCostV2 function result
    let by_bu = _.pick(eecost, ['bu']).bu
    buForExcel = parsingDataForNewModule(by_bu)

    let by_module = _.pick(eecost, ['module']).module
    moduleForExcel = parsingDataForNewModule(_.sortBy(by_module, ['module']))

    let summary = {
      export_from: null,
      eecost_gap: null,
      others: 'N/A',
      export_date: moment(new Date()).format('YYYYMMDD HH:mm'),
      ...projectInfo,
      total_parts_count: eecost.totalPartsCount,
      total_last_price_sap: eecost.total_last,
      total_suggestion_cost: eecost.total_suggestion,
      total_opportunity: eecost.total_last - eecost.total_suggestion,
      pcb_last_price: eecost.pcb_total_last_price,
      ...totalOpportunity,
      bu_target_date: null, // 目前先給 null
      bu_target_cost: null, // 目前先給 null
      hit_rate: null, // 目前先給 null
    }

    return {
      summary: summary,
      detail: eebomDetail,
      by_bu: buForExcel,
      by_module: moduleForExcel,
      exchangeRate: exchangeRateForSheet.exchangeRate.length > 0 ? exchangeRateForSheet.exchangeRate : [],
      exchangeRateDefault: exchangeRateForSheet.defaultExchangeRate,
    }
  }
  /**
   * 取得Eebom的ODM Part
   * @param {String} edm_version_id
   * @param {String} supplyType
   * @returns {Array}
   */
  static async getExportEebomOdmPartInfoList(edm_version_id, eedomDetail, projectInfo, supplyType = null){
    // let projectInfo = await this.getEebomExportProjectInfo(edm_version_id)
    let info = {
      edm_version_id,
      isOdmParts: 'true',
    }
    let odmPartsInfoList = await getEEBomDetailList(eedomDetail, info, supplyType)
    odmPartsInfoList = _.sortBy(odmPartsInfoList, ['type1', 'type2', 'part_number', 'supply_type'])

    // let odmPartsInfoList = eeBomUtils.getOdmPartsList(eeBomInfoList)
    let odmSupplyType = eeBomUtils.getOdmPartsSupplyType()
    let pcbSupplyType = (supplyType) ? `${supplyType},${odmSupplyType}` : odmSupplyType
    let pcbInfo = await this.getExportPcbPartInfoList(edm_version_id, projectInfo, pcbSupplyType)

    let totalOpportunity = genEebomSummaryOpportunity(odmPartsInfoList)

    let calculationTotlaPrice = eeBomUtils.calculationTotalBomPrice(odmPartsInfoList)
    let summary = {
      export_from: null,
      eecost_gap: null,
      others: 'N/A',
      export_date: moment(new Date()).format('YYYYMMDD HH:mm'),
      ...projectInfo,
      ...totalOpportunity,
      total_parts_count: calculationTotlaPrice.totalPartsCount,
      total_last_price_sap: calculationTotlaPrice.totalLastPrice,
      total_suggestion_cost: calculationTotlaPrice.totalSuggestionCost,
      total_opportunity: totalOpportunity.opp_common_parts + totalOpportunity.opp_non_common_parts, // calculationTotlaPrice.totalLastPrice - calculationTotlaPrice.totalSuggestionCost,
      pcb_last_price: pcbInfo.summary.total_last_price_sap,
      bu_target_date: null, // 目前先給 null
      bu_target_cost: null, // 目前先給 null
      hit_rate: null, // 目前先給 null
    }
    return {
      summary: summary,
      detail: odmPartsInfoList,
    }
  }
  /**
   * 取得export用的pcb sheet資料
   * @param {String} edm_version_id
   * @param {String} supplytype
   */
  static async getExportPcbPartInfoList(edm_version_id, projectInfo, supplytype){

    let pcbRes = await pcbService.pcbExportFormat(edm_version_id, supplytype)
    pcbRes = _.sortBy(pcbRes, ['type1', 'type2', 'part_number'])

    if (pcbRes.length > 0) {
      await Promise.all(pcbRes.map(async (pcb) => {
        pcb.valid_date = pcb.valid_date ? moment(pcb.valid_date).format('YYYYMMDD') : null
        pcb.last_price_currency_price = pcb.origin_last_price ? pcb.origin_last_price : null
        pcb.currency = pcb.origin_currency ? pcb.origin_currency : null
        pcb.part_number = pcb.partNumber ? pcb.partNumber : null
        pcb.vendor_part_no = pcb.vendorPartNumber ? pcb.vendorPartNumber : null
        pcb.current_price = pcb.lastPrice ? pcb.lastPrice : null
        pcb.ce_cost = pcb.ceCost ? pcb.ceCost : null
        pcb.suggestion_cost = pcb.suggestionCost ? pcb.suggestionCost : null
        pcb.count = 'Y'
        if(pcb.part_number){
          // 此處因料號不一定找的到資料，因此使用catch來額外處理
          const pcbSpecInfo = await pcbService.getPCBSpecByWistronPN(pcb.part_number, edm_version_id, projectInfo.plant).catch((err)=>{
            logger.debug(err)
            return {
              spec: {},
            }
          })
          if(_.isNull(pcbSpecInfo.spec)) pcbSpecInfo['spec'] = {}
          Object.keys(pcbSpecInfo.spec).forEach((propName)=>{
            if(PCB_SPEC_REG.test(propName)){
              const specValue = pcbSpecInfo.spec[propName]
              if(Array.isArray(specValue) && specValue.length === 0){
                pcb[propName] = null
              } else {
                pcb[propName] = specValue
              }
            }
          })
        }
      }))
    }
    let calculationTotalPcbPrice = eeBomUtils.calculationTotalPcbPrice(pcbRes)
    let summary = {
      export_from: null,
      eecost_gap: null,
      others: 'N/A',
      export_date: moment(new Date()).format('YYYYMMDD HH:mm'),
      ...projectInfo,
      total_suggestion_cost: calculationTotalPcbPrice.totalSuggestionCost,
      total_last_price_sap: calculationTotalPcbPrice.totalLastPrice,
      total_parts_count: calculationTotalPcbPrice.totalPartsCount,
      opportunity: calculationTotalPcbPrice.totalLastPrice - calculationTotalPcbPrice.totalSuggestionCost,
      total_part_number_count: _.uniqBy(pcbRes, 'part_number').length,
    }
    return {
      summary: summary,
      detail: pcbRes,
    }
  }
  /**
   * Get EebomInfoList
   * @param {String} edmVersionId
   * @param {String or null} supplyType
   * @returns {Array}
   */
  static async getEeBomInfoList(edmVersionId, supplyType = null){
    // let eeBomInfoList = await eeBomDetailModel.getAllBomDetail({
    //   'edm_version_id': edmVersionId,
    // })
    let { bomDetailInfos: eeBomInfoList, bomVersionInfo } = await eeBomService.genAllBomInfosByVersion({
      'edm_version_id': edmVersionId,
    })
    let eeSupplyFilter = supplyType ? supplyType.toUpperCase().split(',') : []

    eeBomInfoList = eeBomUtils.eeBomFilter(eeBomInfoList, 'supply_type', eeSupplyFilter)
    return eeBomInfoList
  }
  /**
   * Altrenative export altrenative sheet 資料
   * @param {String} edm_version_id
   */
  static async getExportAlternative(eedomDetail, projectInfo, edm_version_id) {
    let eedomFullDetail = []
    // filter supply for odm part bom and pcb
    let pcbDetail = await pcbService.pcbExportFormat(edm_version_id)

    let pcbOdmPartsInfoList = eeBomUtils.getPcbOdmPartsList(pcbDetail)
    pcbOdmPartsInfoList = _.sortBy(pcbOdmPartsInfoList, ['type1', 'type2', 'part_number'])
    eedomFullDetail.push(...pcbOdmPartsInfoList)

    let odmPartsInfoList = eeBomUtils.getOdmPartsList(eedomDetail)
    odmPartsInfoList.map((detail) => eeBomUtils.calculationSubTotalLastPrice(detail))
    odmPartsInfoList = _.sortBy(odmPartsInfoList, ['type1', 'type2', 'part_number', 'supply_type'])
    eedomFullDetail.push(...odmPartsInfoList)

    // 用來判斷 Main P/N & ALT P/N 是否為 AVL
    let avlList = await eeBomDetailModel.getAvlListByProject(edm_version_id)
    let altrenativeDetail = await genAltrenativeDetail(eedomFullDetail, avlList)

    // summary
    let avl_doc_ver = await spendingModel.getAvlVersionDoc(edm_version_id)
    let totalOpportunity = genEebomSummaryOpportunity(altrenativeDetail, { costDiff: 'price_gap' })
    let calculationTotalPrice = eeBomUtils.calculationAllPrice(odmPartsInfoList, pcbOdmPartsInfoList)

    // console.log('altrenativeDetail', altrenativeDetail[6])
    return {
      summary: {
        export_from: null,
        ...projectInfo,
        ...totalOpportunity,

        avl_doc_ver: avl_doc_ver,
        total_opportunity: totalOpportunity.opp_common_parts + totalOpportunity.opp_non_common_parts, // calculationTotalPrice.totalLowestPrice - calculationTotalPrice.totalSuggestionCost,

        // 未來為從PLM取值, 目前先留空
        rd_contact_window: null,
        pm_contact_window: null,
        fcst: null,
        bu: null,
        bg: null,
        business_type_c_flow: null,
        customer_type: null,
        project_type: null,
        project_manufacturing_plant_code: projectInfo.purchase_org_plant,

        /**
         *
          export_from
          // from projectInfo
            customer
            product_type
            project_name
            project_code
            platform
            sku
            pcb_no_stage
            stage

          // 第二行
            rd_contact_window
            pm_contact_window
            fcst
            bu
            bg
            business_type_c_flow
            customer_type
            project_type
            project_manufacturing_plant_code

          // 第三行
          // from calculationTotalPrice
            total_opportunity
          // from totalOpportunity
            opp_common_parts:
            opp_non_common_parts:
            total_opp_type1
            opp_common_parts_type1
            opp_non_common_parts_type1

          // from avl_doc_ver
            avl_doc_ver
          // from projectInfo
            avl_filter
        **/
      },
      altrenativeDetail: altrenativeDetail,
    }
  }
  static async getExportFullBom(eedomDetail, projectInfo, edm_version_id) {
    let eedomFullDetail = []
    // filter supply for odm part bom and pcb
    let pcbDetail = await pcbService.pcbExportFormat(edm_version_id)
    pcbDetail = _.sortBy(pcbDetail, ['type1', 'type2', 'part_number'])
    eedomFullDetail.push(...pcbDetail)

    // let eebomList = eeBomUtils.getOdmPartsList(eedomDetail)
    eedomDetail.map((detail) => eeBomUtils.calculationSubTotalLastPrice(detail))
    eedomDetail = _.sortBy(eedomDetail, ['type1', 'type2', 'part_number', 'supply_type'])
    eedomFullDetail.push(...eedomDetail)

    // detail
    let avlList = await eeBomDetailModel.getAvlListByProject(edm_version_id)
    let eebomFullDetail = await generalEebomExport(eedomFullDetail, avlList)

    // summary
    let avl_doc_ver = await spendingModel.getAvlVersionDoc(edm_version_id)
    let totalOpportunity = genEebomSummaryOpportunity(eebomFullDetail, { costDiff: 'price_gap' })
    let totalPrice = eeBomUtils.calculationAllPrice(eedomDetail, pcbDetail)
    let totalSummaryPrice = eeBomUtils.calculationSummaryPrice(eedomDetail, pcbDetail)

    return {
      summary: {
        export_from: null,
        export_date: moment(new Date()).format('YYYYMMDD HH:mm'),
        ...projectInfo,
        ...totalOpportunity,
        ...totalSummaryPrice,
        total_parts_count: totalPrice.totalPartsCount,
        total_opportunity: totalOpportunity.opp_common_parts + totalOpportunity.opp_non_common_parts, // totalPrice.totalLowestPrice - totalPrice.totalSuggestionCost,
        avl_doc_ver,
        /**
         *
            export_from:
            export_date: : moment(new Date()).format('YYYYMMDD HH:mm'),

          from projectInfo
            customer:
            product_type:
            project_name:
            project_code:
            platform:
            sku:
            pcb_no_stage:
            stage:
            version:
            eedm_ver:
            purchase_org_plant:
            avl_filter:

          from totalOpportunity
            total_part_number_count:
            opp_common_parts:
            opp_non_common_parts:
            total_opp_type1
            opp_common_parts_type1
            opp_non_common_parts_type1

          from totalPrice
            total_parts_count
            total_opportunity

          from totalSummaryPrice
            total_with_mlcc
            total_without_mlcc
            total_suggestion_cost
            total_mlcc_lowest
            total_mlcc_highest
            total_mlcc_2nd_highest
            total_pcb_cost

          avl_doc_ver:
        **/
      },
      detail: eebomFullDetail,
      // exchangeRateDefault: exchangeRateDefault,
    }
  }
  /**
   * eebom export Odm part sheet 資料
   * @param {String} edm_version_id
   */
  static async getExportOdmBom(eedomDetail, projectInfo, edm_version_id) {
    let eedomFullDetail = []
    // filter supply for odm part bom and pcb
    let pcbDetail = await pcbService.pcbExportFormat(edm_version_id)

    let pcbOdmPartsInfoList = eeBomUtils.getPcbOdmPartsList(pcbDetail)
    pcbOdmPartsInfoList = _.sortBy(pcbOdmPartsInfoList, ['type1', 'type2', 'part_number'])
    eedomFullDetail.push(...pcbOdmPartsInfoList)

    let odmPartsInfoList = eeBomUtils.getOdmPartsList(eedomDetail)
    odmPartsInfoList.map((detail) => eeBomUtils.calculationSubTotalLastPrice(detail))
    odmPartsInfoList = _.sortBy(odmPartsInfoList, ['type1', 'type2', 'part_number', 'supply_type'])
    eedomFullDetail.push(...odmPartsInfoList)

    // second_odm_part
    let avlList = await eeBomDetailModel.getAvlListByProject(edm_version_id)
    let odmBomDetail = await genEebomExportOdmBomDetail(eedomFullDetail, avlList)

    // summary
    let avl_doc_ver = await spendingModel.getAvlVersionDoc(edm_version_id)
    let totalOpportunity = genEebomSummaryOpportunity(odmBomDetail, { costDiff: 'price_gap' })
    let totalPrice = eeBomUtils.calculationAllPrice(odmPartsInfoList, pcbOdmPartsInfoList)
    let totalSummaryPrice = eeBomUtils.calculationSummaryPrice(odmPartsInfoList, pcbDetail)

    return {
      summary: {
        export_from: null,
        export_date: moment(new Date()).format('YYYYMMDD HH:mm'),
        ...projectInfo,
        ...totalOpportunity,
        ...totalSummaryPrice,
        total_parts_count: totalPrice.totalPartsCount,
        total_opportunity: totalOpportunity.opp_common_parts + totalOpportunity.opp_non_common_parts, // totalPrice.totalLowestPrice - totalPrice.totalSuggestionCost,
        avl_doc_ver,
      },
      detail: odmBomDetail,
      // exchangeRateDefault: exchangeRateDefault,
    }
  }

  static async getExportOdmBomSummary(secondOdmPartItems) {
    let boardList = _.compact(_.uniq(_.map(secondOdmPartItems, (item) => item.board && item.board.toLowerCase())))
    // sort : 處理DB-N 會在MB 後面呈現
    let index = boardList.indexOf('mb')
    if (index > -1) {
      boardList.splice(index, 1)
      boardList.sort()
      boardList.splice(0, 0, 'mb')
    } else {
      boardList.sort()
    }

    let buViewList = ['connector', 'power', 'others', 'rtc_bty', 'pcb']

    let odm_lowest = getOdmLowestSummary(buViewList, boardList, secondOdmPartItems)
    // let odm_highest = getOdmHighestSummary(buViewList, boardList, secondOdmPartItems)
    let mlcc = getMLCCSummary(boardList, secondOdmPartItems)

    return {
      odm_lowest,
      // odm_highest,
      mlcc,
    }
  }

  static async getEebomExportBase(edm_version_id) {
    let projectInfo = await this.getEebomExportProjectInfo(edm_version_id)
    // let eebomAllDetail = await eeBomDetailModel.getAllBomDetail({
    //   edm_version_id: edm_version_id,
    // })
    let { bomDetailInfos: eebomAllDetail } = await eeBomService.genAllBomInfosByVersion({
      edm_version_id: edm_version_id,
    })
    return {
      projectInfo,
      eebomAllDetail,
    }
  }
  static async  getDefaultExchangeRate(specified_time = null) {
    let defaultCurrencyList = ['RMB', 'NTD', 'JPY']
    let exchangeRateDefaultList = []
    let exchangeRateTime = null
    if (specified_time) exchangeRateTime = moment(specified_time).tz('Asia/Taipei').format('YYYYMMDD')
    else exchangeRateTime = moment().tz('Asia/Taipei').format('YYYYMMDD')

    let exchangeRateRes = await costUtils.getExchangeRateByDate(defaultCurrencyList, exchangeRateTime)

    let exchangeRateDefault = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes, 'USD').reverse()
    // _.map(exchangeRateDefault, i => {
    //   exchangeRateDefaultList.push([i[2]])
    // })
    _.map(defaultCurrencyList, (i, idx) => {
      let tmp = {}
      tmp['exchange_rate'] = null
      tmp[i] = exchangeRateDefault[idx].sap_exchange_rate
      exchangeRateDefaultList.push(tmp)
    })
    return exchangeRateDefaultList
  }
}

/**
 * 2nd Summary - MLCC Summary 表格
 * @param boardList ex: ['MB', 'DB-1', 'DB-2']
 * @param secondOdmPartItems ODM BOM 資料List
 */
const getMLCCSummary = (boardList, secondOdmPartItems) => {
  let mlccItems = _.filter(secondOdmPartItems, (item) => eeBomUtils.determineType(item.part_number, item.type1, item.type2) == 'MLCC')
  let mlcc = {}

  let mlccLowestPrice = addUpBoardPrice(mlccItems, boardList, { price: 'sub_total_last_price_l' })
  mlcc['lowest'] = mlccLowestPrice

  let mlccHighestPrice = addUpBoardPrice(mlccItems, boardList, { price: 'sub_total_last_price_h' })
  mlcc['highest'] = mlccHighestPrice

  let mlcc2ndHighestPrice = addUpBoardPrice(mlccItems, boardList, { price: 'sub_total_last_price_m' })
  mlcc['highest_2nd'] = mlcc2ndHighestPrice

  return mlcc
}
/**
 * 2nd Summary - ODM Highest 表格
 */
const getOdmHighestSummary = (buViewList, boardList, secondOdmPartItems) => {
  let sumBuViewList = ['connector', 'rtc_bty', 'pcb', 'power', 'others']
  let odm_highest = {}

  _.map(buViewList, (buView) => {
    // replace 空白 to 底線 for rtc_bty 在bu view 是以 空白呈現, yaml的key 無法使用字串有空白的key
    let items = _.filter(secondOdmPartItems, (item) => item.bu_view && item.bu_view.replace(' ', '_').toLowerCase() == buView)
    let rowBasicData = addUpBoardPrice(items, boardList, { price: 'sub_total_last_price_h' })
    odm_highest[buView] = rowBasicData
  })

  odm_highest['total_cost'] = addUpBuViewTotal(boardList, sumBuViewList, odm_highest)

  return odm_highest
}
/**
 * 2nd Summary - ODM lowest 表格
 */
const getOdmLowestSummary = (buViewList, boardList, secondOdmPartItems) => {
  let sumBuViewList = ['connector', 'rtc_bty', 'pcb', 'power', 'others']
  let odm_lowest = {}

  _.map(buViewList, (buView) => {
    let items = _.filter(secondOdmPartItems, (item) => item.bu_view && item.bu_view.replace(' ', '_').toLowerCase() == buView)
    let rowBasicData = addUpBoardPrice(items, boardList, { price: 'sub_total_last_price_l' })
    odm_lowest[buView] = rowBasicData
  })

  // power mlcc
  let powerItems = _.filter(secondOdmPartItems, (item) => item.bu_view && item.bu_view.toLowerCase() == 'power')
  let rowPowerData = addUpBoardPrice(powerItems, boardList, { price: 'sub_total_last_price_m' })
  odm_lowest['power_mlcc'] = rowPowerData

  // others mlcc
  let othersItems = _.filter(secondOdmPartItems, (item) => item.bu_view && item.bu_view.toLowerCase() == 'others')
  let rowOthersData = addUpBoardPrice(othersItems, boardList, { price: 'sub_total_last_price_m' })
  odm_lowest['others_mlcc'] = rowOthersData

  odm_lowest['total_cost'] = addUpBuViewTotal(boardList, sumBuViewList, odm_lowest)

  return odm_lowest
}
/**
 * 統整 各個 board 下的價格
 */
const addUpBuViewTotal = (boardList, sumBuViewList, buViewInfos) => {
  let lowestTotalRow = {
    total: {
      price: 0,
      suggestion: 0,
    },
  }

  _.forEach(sumBuViewList, (buView) => {
    let buInfos = buViewInfos[buView]
    /*
    {
      'total': { price: 0.1398, suggestion: 0.1398 },
      'mb: { price: 0.1398, suggestion: 0.1398 },
      'db-1': { price: 0, suggestion: 0 },
    }
    */

    _.forEach(boardList, (board) => {
      if (lowestTotalRow[board]) {
        lowestTotalRow[board].price += buInfos[board].price
        lowestTotalRow[board].suggestion += buInfos[board].suggestion
      } else {
        lowestTotalRow[board] = {
          price: buInfos[board].price,
          suggestion: buInfos[board].suggestion,
        }
      }

      lowestTotalRow['total'].price = fixMath.transStringToFloat(lowestTotalRow.total.price + buInfos[board].price, 5)
      lowestTotalRow['total'].suggestion = fixMath.transStringToFloat(lowestTotalRow.total.suggestion + buInfos[board].suggestion, 5)
    })
  })

  return lowestTotalRow
}
/**
 * 計算 此bu view 下各個 board 價格與 總價格
 */
const addUpBoardPrice = (items, boardList, keys) => {
  let rowData = {
    total: {
      price: 0,
      suggestion: 0,
    },
  }

  // basic board 'db-1', 'mb'
  _.forEach(boardList, (board) => {
    let itemsByBoard = _.filter(items, (item) => item.board && item.board.toLowerCase() == board)
    let buViewPrice = addUpBoardItemPrice(itemsByBoard, keys)

    rowData['total'].price = fixMath.transStringToFloat(rowData.total.price + buViewPrice.price, 5)
    rowData['total'].suggestion = fixMath.transStringToFloat(rowData.total.suggestion + buViewPrice.suggestion, 5)
    rowData[board] = buViewPrice
  })
  return rowData
}
/**
 * 計算 bu view與board 分類下的 price & suggestion cost
 */
const addUpBoardItemPrice = (items, keys) => {

  let price = 0
  let suggestion = 0
  _.forEach(items, (item) => {
    price += item[keys.price] ? fixMath.transStringToFloat(item[keys.price]) : 0
    suggestion += item.sub_total_suggestion_cost ? fixMath.transStringToFloat(item.sub_total_suggestion_cost) : 0
  })

  return {
    price: fixMath.transStringToFloat(price, 5),
    suggestion: fixMath.transStringToFloat(suggestion, 5),
  }
}
// const genItemExcel = async (contentTemp, category, item_id, allItem, rawPath, total_part_number_count, total_parts_count, total_last_price_sap, total_suggestion_cost, supply_type, exchangeRateList, exchangeRateDefault) => {
//   logger.debug('generate excel')
//   await xlsxPopulate.fromBlankAsync()
//     .then(workbook => {
//       const eeBom = workbook.sheet(0)
//       let transCategory
//       if(category.toLowerCase() == 'bu') {
//         transCategory = 'BU'
//       }else {
//         transCategory = 'Module'
//       }
//       let opportunity = total_last_price_sap - total_suggestion_cost
//       const summaryHeaderLeft = [['Export from'], ['Customer'], ['Project Name'], ['Project Code'], ['Version Status'], ['BU Target Date'], ['BOM Create Date'], ['RFQ Finish Date'], ['']]
//       const summaryHeaderMiddle = [['Export Date'], ['View By'], ['Category'], ['Total Part Number Count'], ['Total Parts Count'], ['Total Last Price (SAP)'], ['Total Suggestion Cost'], ['BU Target Cost'], ['eEDM Ver.']]
//       const summaryHeaderRight = [['Supply Type'], ['Opportunity']]
//       const summaryDataLeft = [['Dashboard'], [contentTemp.customer], [contentTemp.project_name],
//         [contentTemp.project_code], [contentTemp.version], [contentTemp.bu_target_date],
//         [contentTemp.bom_create_date], [contentTemp.rfq_finish_date], ['']]
//       const summaryDataMiddle = [[contentTemp.export_date], [transCategory], [item_id], [total_part_number_count], [total_parts_count], [total_last_price_sap], [total_suggestion_cost], [contentTemp.bu_target_cost],
//         [contentTemp.eedm_ver]]
//       const summaryDataRight = [[supply_type], [opportunity]]
//       let exchangeHeaderLeft = [['Exchange Rate'], [''], ['']]
//       let exchangeHeaderRight = [['RMB-USD', ''], ['NTD-USD', ''], ['JPY-USD', '']]
//       let contentHeader
//       if(item_id.toLowerCase() == 'pcb') {
//         // for 9/30 release
//         contentHeader = [['Type I', 'Type II', 'Part Number', 'Description', 'PCB No._Stage', 'Manufacturer', 'Supply Type', 'Merged', 'Remark',
//           'Sourcer Cost', 'Last Price',
//           'Org. Curr.', 'Org. Last Price', 'ValidFrom', 'Clean Sheet Cost', 'CE Cost', 'Suggestion Cost', 'QTY', 'Sub Total Last Price',
//           'Sub Total Suggestion Cost', 'Vendor Name', 'Vendor P/N', 'OBS', 'EXP/EOL', 'Cost Diff.']]
//       }else {
//         // for 9/30 release
//         contentHeader = [['Type I', 'Type II', 'Part Number', 'Description', 'Manufacturer', 'Vendor Name', 'Vendor P/N', 'Supply Type',
//           'Sourcer Cost', 'Last Price', 'Org. Curr.', 'Org. Last Price', 'ValidFrom',
//           'SPA Cost', 'SPA Org. Curr.', 'SPA Org. Cost', 'SPA ValidFrom', 'SPA P/N', 'SPA Manufacturer', 'SPA Supply Type',
//           'ALT. Lowest Cost', 'ALT. Lowest  P/N', 'ALT. Lowest Manufacturer', 'ALT. Grouping',
//           'LPP Cost', 'CE ADJ %', 'CE Cost', 'Suggestion Cost', 'Remark', 'QTY',
//           'Sub Total Last Price', 'Sub Total Suggestion cost',
//           'CMP', 'OBS', 'EXP/EOL', 'Cost Diff.']]
//       }
//       eeBom.name('EE-Item')
//       eeBom.cell('A1').value(summaryHeaderLeft).style({ fontColor: '000000', fill: 'FFBB66', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true })
//       eeBom.cell('C1').value(summaryHeaderMiddle).style({ fontColor: '000000', fill: 'FFBB66', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true })
//       eeBom.cell('E1').value(summaryHeaderRight).style({ fontColor: '000000', fill: 'FFBB66', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true })
//       eeBom.cell('B1').value(summaryDataLeft).style('border', true)
//       eeBom.cell('D1').value(summaryDataMiddle).style({ border: true, wrapText: true, numberFormat:'#,##0.00000'})
//       eeBom.cell('F1').value(summaryDataRight).style('border', true)
//       eeBom.cell('H1').value(exchangeHeaderLeft).style({ fontColor: '000000', fill: 'FFBB66', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true })
//       eeBom.cell('I1').value(exchangeHeaderRight).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true })
//       eeBom.cell('J1').value(exchangeRateDefault).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true, numberFormat: '#,##0.00000' })
//       eeBom.cell('A11').value(contentHeader).style({ fontColor: 'FFFFFF', fill: '0070C0', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true }).autoFilter()
//       eeBom.cell('A12').value(allItem).style({ border: true, horizontalAlignment: 'center', borderColor: 'ED7D31', numberFormat: '#,##0.00000' })
//       let findADJ = eeBom.find('Last Price*%')
//       let findQTY = eeBom.find('QTY')
//       if(findADJ.length > 0) {
//         eeBom.column(findADJ[0]._columnNumber).style('numberFormat', '#,##0.00')
//       }
//       if(findQTY.length > 0) {
//         eeBom.column(findQTY[0]._columnNumber).style('numberFormat', '#,##0')
//       }
//       // for 9/30 release
//       // mark, because xlsx-popualte will make some error for font bold
//       if(item_id.toLowerCase() == 'pcb') {
//         _.map(allItem, (i, idx) => {
//           // if CMP, OBS, EXP is true, then set font bold
//           if(i[22] == 'Y') {
//             eeBom.cell(`W${idx + 12}`).style('bold', true)
//           }
//           if(i[23] == 'Y') {
//             eeBom.cell(`X${idx + 12}`).style('bold', true)
//           }
//         })
//       }else {
//         _.map(allItem, (i, idx) => {
//           // if CMP, OBS, EXP is true, then set font bold
//           if(i[32] == 'Y') {
//             eeBom.cell(`AG${idx + 12}`).style('bold', true)
//           }
//           if(i[33] == 'Y') {
//             eeBom.cell(`AH${idx + 12}`).style('bold', true)
//           }
//           if(i[34] == 'Y') {
//             eeBom.cell(`AI${idx + 12}`).style('bold', true)
//           }
//         })
//       }
//       excelHeader.wrapTextOrNot(eeBom, allItem)
//       fixMath.setExcelColumnWidth(eeBom, contentHeader[0], allItem)
//       fixMath.summaryWidth(eeBom, summaryHeaderLeft, 1)
//       fixMath.summaryWidth(eeBom, summaryDataLeft, 2)
//       fixMath.summaryWidth(eeBom, summaryHeaderMiddle, 3)
//       fixMath.summaryWidth(eeBom, summaryDataMiddle, 4)
//       let eeExchangeRateExport = new exchangeRate(workbook, _.uniqWith(exchangeRateList, _.isEqual))
//       eeExchangeRateExport.export()

//       return workbook.toFileAsync(rawPath)
//     })
//   logger.debug('excel path:', rawPath)
// }

const stringToArray = (stringCase) => {
  let str = stringCase.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"')

  try {
    return  JSON.parse(str)
  } catch (e) {
    return str
  }
}

function checkSpecIsNotNull(spec) {
  let flag = false
  let speckeys = Object.keys(spec).filter(s => s.includes('spec'))
  speckeys.some((specKey) => {
    if (spec[specKey] != null) {
      flag = true
      return true
    }
  })
  return flag
}

const getItemInAvlOrNot = (manufacturer, pn_spec, avl_pair = []) => {
  if(avl_pair && avl_pair.length > 0) {
    // 判斷 AVL SPEC & brand
    manufacturer = stringToArray(manufacturer)
    let meetAvl = _.map(avl_pair, (avl) => {
      let avlBrands = _.map(_.get(avl, 'avl_brand'), (b) => b.toLowerCase())
      // P/N manufacturer 是否符合 avl brand 條件
      let inBrand = false
      if (_.isString(manufacturer)) {
        inBrand = avlBrands.includes(manufacturer.toLowerCase())
      } else {
        inBrand = manufacturer.find(m => avlBrands.includes(m.toLowerCase()))
      }

      if (inBrand) {
        // P/N spec 是否符合 avl spec 條件
        let avl_spec = avl.avl_spec
        if (Object.keys(avl_spec).length > 0) {
          return determineSpec(pn_spec, avl_spec)
        } else {
          // avl spec 為空時, 代表 符合條件 不需判斷
          return true
        }
      }
      return false
    })
    return meetAvl.find(avl => avl) ? true : false
  }
  return false
}

const determineSpec = (itemSpec, specCondition) => {
  let flag = []

  _.forEach(Object.keys(specCondition), (specKey) => {
    let spec = specCondition[specKey].trim().split(/([<>=]+)/).filter(e => e)
    let specSymbol = spec.filter(Number)[0]
    let specNumber = spec.filter(Boolean)[0]

    if(itemSpec[specKey.toLowerCase()]) {
      switch (specSymbol) {
        case '>=':
          itemSpec[specKey.toLowerCase()] >= specNumber ? flag.push(true) : flag.push(false)
          break
        case '<=':
          itemSpec[specKey.toLowerCase()] <= specNumber ? flag.push(true) : flag.push(false)
          break
        case '>':
          itemSpec[specKey.toLowerCase()] > specNumber ? flag.push(true) : flag.push(false)
          break
        case '<':
          itemSpec[specKey.toLowerCase()] < specNumber ? flag.push(true) : flag.push(false)
          break
        default:
          itemSpec[specKey.toLowerCase()].toUpperCase() == specNumber.toUpperCase() ? flag.push(true) : flag.push(false)
          break
      }
    } else {
      flag.push(false)
    }
  })
  // 如果有false, 代表 不符合alt 要求
  return !flag.includes(false)
}

/**
 * 拿到sheet all eebom的detail by eedm id
 * @param {uuid} info {
 *  edm_version_id: '',
 *  isOdmParts: true, // 只需要odmPart的資料
 * }
 */
const getEEBomDetailList = async (detailRes, info, supplyType) => {
  let eeSupplyFilter = supplyType ? supplyType.toUpperCase().split(',') : []
  let avlList = await eeBomDetailModel.getAvlListByProject(info.edm_version_id)
  // let detailRes = await eeBomDetailModel.getAllBomDetail(info)
  if (info.isOdmParts) {
    detailRes = eeBomUtils.getOdmPartsList(detailRes)
  }

  let orgPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(detailRes, 'part_number')))
  let suggPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(detailRes, 'suggestion_part_number')))

  let partNumberCommonParts = await spendingModel.getAllPartNumberCommonParts()
  if (detailRes.length > 0) {
    let eebomRes = _.map(detailRes, data => {

      let altInfo = genExportAltInfos(data, partNumberCommonParts, data.current_price)
      let spaInfo = genExportSpaInfos(data, partNumberCommonParts)

      let avlAvlSpaInfos = genExportAvlSpaInfos(data, partNumberCommonParts)
      let avlAvlAltInfos = genExportAvlAltInfos(data, partNumberCommonParts, data.current_price, altInfo.alt_grouping)

      data.org_pn_avl = null // 先給 null
      data.sugg_pn_avl = null // 先給 null

      if (avlList.length > 0) {
        data.org_pn_avl = determinePnInAvl(data, avlList, orgPnSpecs, { partnumber: 'part_number', manufacturer: 'manufacturer' }, false)
        data.sugg_pn_avl = determinePnInAvl(data, avlList, suggPnSpecs, { partnumber: 'suggestion_part_number', manufacturer: 'suggestion_manufacturer' })
      }

      data.current_price = fixMath.transStringToFloat(data.current_price)
      data.last_price_currency_price = formatFloat(data.last_price_currency_price, 5)
      data.sourcer_cost = fixMath.transStringToFloat(data.sourcer_cost)
      data.qty = fixMath.transStringToFloat(data.qty)
      let costDiff = fixMath.transStringToFloat(data.sub_total_last_price) - fixMath.transStringToFloat(data.sub_total_suggestion_cost)

      let RBopportunity = null
      if(costDiff > 0) {
        RBopportunity = 'EE'
        if(data.suggestion_is_common_part != 'Y' && data.is_common_parts) {
          RBopportunity = 'SBM'
        }

      }

      return {
        ...data,
        ...altInfo,
        ...spaInfo,
        ...avlAvlSpaInfos,
        ...avlAvlAltInfos,
        supply_type_list: _.isNil(data.supply_type_list) ? null : data.supply_type_list.join(','),
        is_common_parts: data.is_common_parts ? 'Y' : 'N',
        currency: data.last_price_currency,
        PcbStageNo: null, // PCB only
        parallelBoard: null, // PCB only
        spaInfo,
        altInfo,
        clean_sheet_cost: null, // null
        valid_from: data.valid_from ? moment(data.valid_from).format('YYYYMMDD') : null,
        RBopportunity: RBopportunity,
        costDiff: costDiff,
        feedback: null,
      }
    })

    let supplyList = await getSPASupplyTypeByPN(eebomRes.map(e => e.spa_part_number))
    let avlSupplyList = await getSPASupplyTypeByPN(eebomRes.map(e => e.avl_spa_pn))

    eebomRes.forEach(eebom => {
      let supplyRes = supplyList.find(s => s.matnr == eebom.spa_part_number)
      eebom.spa_supply_type = supplyRes ? supplyRes.supply_type.join() : null

      let avlSupplyRes = avlSupplyList.find(s => s.matnr == eebom.avl_spa_pn)
      eebom.avl_spa_supply_type = avlSupplyRes ? avlSupplyRes.supply_type.join() : null
    })

    eebomRes = _.sortBy(eebomRes, ['type1', 'type2'])
    eebomRes = eeBomUtils.eeBomFilter(eebomRes, 'supply_type', eeSupplyFilter)

    return eebomRes
  }
}
/**
 * export AVL SPA 資料整理
 * @param {Object} data 此料號的基本資料
 * @param {Array} commonPartList common part list
 */
const genExportAvlSpaInfos = (data, commonPartList) => {
  let avl_spa_part_number = data.avl_spa_other_info ? data.avl_spa_other_info.spa_partnumber : null

  return {
    avl_spa_pn: avl_spa_part_number,
    avl_spa_cost: fixMath.transStringToFloat(data.avl_spa),
    avl_spa_org_curr: data.avl_spa_other_info && data.avl_spa_other_info.original_currency ? data.avl_spa_other_info.original_currency : null,
    avl_spa_org_cost: data.avl_spa_other_info && data.avl_spa_other_info.original_spa_price ? fixMath.transStringToFloat(data.avl_spa_other_info.original_spa_price) : null,
    avl_spa_valid_from: data.avl_spa_other_info && data.avl_spa_other_info.spa_valid_from ? moment(data.avl_spa_other_info.spa_valid_from).locale('zh-tw').format('YYYYMMDD') : null,
    avl_spa_manufacturer: data.avl_spa_other_info ? JSON.parse(data.avl_spa_other_info.spa_manufacturer).join() : null,
    avl_spa_pn_cmp: avl_spa_part_number && commonPartList.find(i => { return i.partnumber == avl_spa_part_number }) ? 'Y' : 'N'
  }
}
/**
 * export SPA 資料整理
 * @param {Object} data 此料號的基本資料
 * @param {Array} commonPartList common part list
 */
const genExportSpaInfos = (data, commonPartList) => {
  let spa_part_number = data.other_manufacture_info ? data.other_manufacture_info.spa_partnumber : null

  return {
    spa_part_number: spa_part_number,
    spa_cost: fixMath.transStringToFloat(data.spa),
    spa_manufacturer: data.other_manufacture_info ? JSON.parse(data.other_manufacture_info.spa_manufacturer).join(): null,
    spa_original_currency: data.other_manufacture_info && data.other_manufacture_info.original_currency ? data.other_manufacture_info.original_currency : null,
    spa_original_price: data.other_manufacture_info && data.other_manufacture_info.original_spa_price ? formatFloat(data.other_manufacture_info.original_spa_price, dashBoardFloatPoint('default')) : null,
    spa_valid_from: data.other_manufacture_info && data.other_manufacture_info.spa_valid_from ? moment(data.other_manufacture_info.spa_valid_from).locale('zh-tw').format('YYYYMMDD') : null,
    spa_is_common_parts: spa_part_number && commonPartList.find(i => { return i.partnumber == spa_part_number }) ? 'Y' : 'N',
  }
}

/**
 * export ALT 資料整理
 * @param {Object} detail 此料號的基本資料
 * @param {Array} commonPartList common part list
 * @param {Number} lowest_price 最低價
 */
const genExportAltInfos = (detail, commonPartList, lowest_price) => {
  return {
    alt_lowest_partnumber: detail.alt_lowest_partnumber,
    alt_manufacturer: detail.alt_manufacturer,
    alt_lowest_price: fixMath.transStringToFloat(detail.alt_lowest_price),
    alt_vendor_pn: detail.alt_other_info ? detail.alt_other_info.vendor_pn : null,

    alt_is_common_parts: commonPartList.find(i => i.partnumber == detail.alt_lowest_partnumber ) ? 'Y' : 'N',
    alt_grouping: detail.alt_grouping ? detail.alt_grouping.join() : null,
    price_gap_main_alt: lowest_price && detail.alt_lowest_price ? fixMath.transStringToFloat((fixMath.transStringToFloat(lowest_price) - fixMath.transStringToFloat(detail.alt_lowest_price)) * detail.qty) : null,

    alt_lowest_partnumber_without_main_pn: detail.alt_lowest_partnumber_without_main_pn,
    alt_manufacturer_without_main_pn: detail.alt_manufacturer_without_main_pn,
    alt_lowest_price_without_main_pn: fixMath.transStringToFloat(detail.alt_lowest_price_without_main_pn),
    alt_vendor_pn_without_main_pn: detail.alt_other_info_without_main_pn ? detail.alt_other_info_without_main_pn.vendor_pn : null,

    alt_is_common_parts_without_main_pn: commonPartList.find(i => i.partnumber == detail.alt_lowest_partnumber_without_main_pn ) ? 'Y' : 'N',
    alt_grouping_without_main_pn: detail.alt_grouping ? _.without(detail.alt_grouping, detail.part_number).join() : null,
    price_gap_main_alt_without_main_pn: lowest_price && detail.alt_lowest_price_without_main_pn ? fixMath.transStringToFloat((fixMath.transStringToFloat(lowest_price) - fixMath.transStringToFloat(detail.alt_lowest_price_without_main_pn)) * detail.qty) : null,
  }
}
/**
 * export AVL ALT 資料整理
 * @param {Object} detail 此料號的基本資料
 * @param {Array} commonPartList common part list
 * @param {Number} lowest_price 最低價
 * @param {Array} alt_grouping 此料號的替代料
 */
const genExportAvlAltInfos = (detail, commonPartList, lowest_price, alt_grouping = null) => {
  let avl_alt_part_number = detail.avl_alt_other_info ? detail.avl_alt_other_info.alt_lowest_partnumber : null
  let avl_alt_part_number_without_main_pn = detail.avl_alt_other_info_without_main_pn ? detail.avl_alt_other_info_without_main_pn.alt_lowest_partnumber : null

  return {
    avl_alt_lowest_pn: avl_alt_part_number,
    avl_alt_lowest_cost: fixMath.transStringToFloat(detail.avl_alt),
    avl_alt_lowest_manufacturer: detail.avl_alt_other_info ? detail.avl_alt_other_info.alt_manufacturer : null,
    avl_alt_lowest_vendor_pn: detail.avl_alt_other_info ? detail.avl_alt_other_info.vendor_pn : null,

    avl_alt_is_common_parts: commonPartList.find(i => { return i.partnumber == avl_alt_part_number }) ? 'Y' : 'N',
    avl_alt_lowest_grouping: alt_grouping,
    price_gap_main_avl_alt: lowest_price && detail.avl_alt ? fixMath.transStringToFloat((fixMath.transStringToFloat(lowest_price) - fixMath.transStringToFloat(detail.avl_alt)) * detail.qty) : null,

    avl_alt_lowest_pn_without_main_pn: avl_alt_part_number_without_main_pn,
    avl_alt_lowest_cost_without_main_pn: fixMath.transStringToFloat(detail.avl_alt_without_main_pn),
    avl_alt_lowest_manufacturer_without_main_pn: detail.avl_alt_other_info_without_main_pn ? detail.avl_alt_other_info_without_main_pn.alt_manufacturer : null,
    avl_alt_lowest_vendor_pn_without_main_pn: detail.avl_alt_other_info_without_main_pn ? detail.avl_alt_other_info_without_main_pn.vendor_pn : null,

    avl_alt_is_common_parts_without_main_pn: commonPartList.find(i => { return i.partnumber == avl_alt_part_number_without_main_pn }) ? 'Y' : 'N',
    avl_alt_lowest_grouping_without_main_pn: alt_grouping ? _.without(alt_grouping, detail.part_number) : null,
    price_gap_main_avl_alt_without_main_pn: lowest_price && detail.avl_alt_without_main_pn ? fixMath.transStringToFloat((fixMath.transStringToFloat(lowest_price) - fixMath.transStringToFloat(detail.avl_alt_without_main_pn)) * detail.qty) : null,

  }
}
const genExportAvlPN = (eeBomInfoList) => {

  for(let eeBomInfo of eeBomInfoList){
    eeBomInfo.avl_alt_lowest_pn = eeBomInfo.avl_alt_other_info ? eeBomInfo.avl_alt_other_info.alt_lowest_partnumber : null
    eeBomInfo.avl_alt_lowest_pn_without_main_pn = eeBomInfo.avl_alt_other_info_without_main_pn ? eeBomInfo.avl_alt_other_info_without_main_pn.alt_lowest_partnumber : null
    eeBomInfo.avl_alt_lowest_manufacturer_without_main_pn = eeBomInfo.avl_alt_other_info_without_main_pn ? eeBomInfo.avl_alt_other_info_without_main_pn.alt_manufacturer : null
  }

  return eeBomInfoList
}
/**
 *
 * @param keys {Object} 使用指定的key 來取得資料 {
 *  partnumber: 'part_number',
 *  manufacturer: 'manufacturer'
 * }
 * @param typeBySpec {Boolean} 用來判斷 spec 要從哪邊取,
 *  false: 用原始的detail 中的typeI, typeII
 *  true: 使用系統所維護的 CBG 資料來判斷
 *
 * @retruns {String} Y 代表是，並改變為紅色；N 代表否。NA 代表無法進行比較。 空白沒有限定邏輯。
 * NA 指的是 typeI 為null, 或是 沒有 spec, 沒有 manufacturer, 也沒有partnumber
 * null 指的是 avl list中沒有此typeI, typeII 的邏輯
 */
const determinePnInAvl = (detail, avlList, pnSpecs, keys, typeBySpec = true) => {
  let spec = _.find(pnSpecs, (spec) => spec.item == detail[keys.partnumber])

  let upperType1 = null
  let upperType2 = null

  if (detail[keys.partnumber] && detail[keys.manufacturer]) {

    if(typeBySpec && spec && spec.type1) {
      upperType1 = spec.type1.toUpperCase()
      upperType2 = _.isNil(spec.type2) ? null : spec.type2.toUpperCase()
    } else if (typeBySpec == false && spec && detail.type1) {
      upperType1 = detail.type1.toUpperCase()
      upperType2 = _.isNil(detail.type2) ? null : detail.type2.toUpperCase()
    } else {
      return 'NA'
    }

    let matchAvlList = eeBomService.getMatchAVLRule(upperType1, upperType2, avlList)
    // 此料號typeI, typeII 有沒有限定邏輯
    if (matchAvlList.length > 0) {
      // 有符合typeI typeII的 avl 清單, 但此料號的 manufacturer 為空, 所以不能判斷avl
      if(checkSpecIsNotNull(spec)) {
        return getItemInAvlOrNot(detail[keys.manufacturer], spec, matchAvlList) ? 'Y' : 'N'
      } else {
        return 'NA'
      }
    }
    return null
  }
  return 'NA'
}
/**
 *
 * 根據CE所提供的分類方式，判斷料號屬於哪個Bu view
 *
 * @param {*} detail
 */
const determineBuView = (detail) => {
  let bu_view = 'Others'

  let buViewByTypeI = _buViewByTypeI(detail.type1)
  if (buViewByTypeI) return buViewByTypeI

  let buViewByPN = _buViewByPN(detail.part_number)
  if (buViewByPN) return buViewByPN

  let buViewByReference = _buViewByReference(detail.reference)
  if (buViewByReference) return buViewByReference

  let buViewByEedmDescription = _buViewByEedmDescription(detail.eedm_description)
  if (buViewByEedmDescription) return buViewByEedmDescription

  return bu_view
}

/**
 *
 * Type I 為「Connector」=> Connector
 * Type I 為「BTY_RTC」=> RTC Bty
 * Type I 為 「PCB」=> PCB
 */
const _buViewByTypeI = (type1) => {
  if (type1) {
    if (type1.toUpperCase() == 'CONNECTOR') {
      return 'Connector'
    } else if (type1.toUpperCase() == 'BTY_RTC') {
      return 'RTC Bty'
    } else if (type1.toUpperCase() == 'PCB') {
      return 'PCB'
    }
  }
  return null
}
/**
 *
 * P/N 開頭為「20」，「020」，「21」，「021」，「22」，「022」，「62」，「062」 => Connector
 * P/N 第一個小數點前一、二碼為 「23」=> RTC Bty
 * P/N 第一個小數點前一、二碼為 「48」=> PCB
 */
const _buViewByPN = (part_number) => {
  if (part_number && part_number.match(/\./)) {
    let first_number = part_number.split('.')[0]
    if(first_number) {
      if (first_number.match(/^0*20$/)) {
        return 'Connector'
      } else if (first_number.match(/^0*21$/)) {
        return 'Connector'
      } else if (first_number.match(/^0*22$/)) {
        return 'Connector'
      } else if (first_number.match(/^0*62$/)) {
        return 'Connector'
      } else if (first_number.match(/23$/)) {
        return 'RTC Bty'
      } else if (first_number.match(/48$/)) {
        return 'Power'
      }
    }
  }
  return null
}

/**
 * 「Reference」欄位第一碼為 “P” => Power
 */
const _buViewByReference = (reference) => {
  if (reference) {
    if (reference.match(/^P/)) return 'Power'
  }
  return null
}

/**
 * 「Description」欄位前三碼有「PCB」字眼且不分大小寫 => PCB
 */
const _buViewByEedmDescription = (eedm_description) => {
  if (eedm_description) {
    if (eedm_description.toUpperCase().match(/^PCB/)) return 'PCB'
  }
  return null
}



const genAltrenativeDetail = async (baseDetail, avlList) => {
  let fullbom = await generalEebomExport(baseDetail, avlList)
  return _.map(fullbom, (item) => {
    let alter_sugg_sourcer_price = item.avl_alt_lowest_cost_without_main_pn
    let main_sourcer_price = item.price_usd_l

    let alter_sugg_sourcer_cmp = item.avl_alt_is_common_parts_without_main_pn
    let main_sourcer_cmp = item.is_common_parts

    let main_sourcer_priority = _.isNil(main_sourcer_price) || _.isNil(alter_sugg_sourcer_price) ? null : main_sourcer_price <= alter_sugg_sourcer_price ? 1 : 2
    let alter_sugg_sourcer_priority = _.isNil(main_sourcer_price) || _.isNil(alter_sugg_sourcer_price) ? null : main_sourcer_price > alter_sugg_sourcer_price ? 1 :  2

    let item_type = eeBomUtils.determineType(item.part_number, item.type1, item.type2)

    // Main Common part=Y, Main & Alt 淺灰色註記
    let main_sourcer_color = null
    let alter_sugg_sourcer_color =  null
    if (main_sourcer_cmp == 'Y') {
      main_sourcer_color = 'G'
      alter_sugg_sourcer_color = 'G'
    } else if (main_sourcer_cmp == 'N') {
      // Main Common part=N, Alt Priority 1 or 空格 , Alt 黃色註記 (不含MLCC & RES)
      if ((alter_sugg_sourcer_priority == 1 || alter_sugg_sourcer_priority == null) && (item_type != 'MLCC' && item_type != 'RES')) {
        alter_sugg_sourcer_color = 'Y'
      }
    }

    return {
      /*
      // base column
      type1
      type2
      part_number
      description
      manufacturer
      vendor
      vendor_part_no
      supply_type
      supply_type_list
      avap
      price_usd_l
      obs
      exp
      qty

      // e-Pro. ALT Lowest Suggestion(w/ AVL)
      avl_alt_lowest_pn_without_main_pn
      avl_alt_lowest_manufacturer_without_main_pn
      avl_alt_lowest_cost_without_main_pn
      price_gap_main_avl_alt_without_main_pn


      // e-Pro. Common Part Check(Y/N)
      is_common_parts
      avl_alt_is_common_parts_without_main_pn

      // e-Pro. AVL Check(Y/N/NA)
      org_pn_avl
      avl_alt_pn_avl_without_main_pn
      */
      ...item,
      // Main Source
      main_sourcer_priority,
      main_sourcer_remark: null,
      main_sourcer_color: main_sourcer_color,

      // Alternative Suggestion by Sourcer
      alter_sugg_sourcer_priority,
      alter_sugg_sourcer_part_number: item.avl_alt_lowest_pn_without_main_pn,
      alter_sugg_sourcer_brand: item.avl_alt_lowest_manufacturer_without_main_pn,
      alter_sugg_sourcer_vendor_part_no: item.avl_alt_lowest_vendor_pn_without_main_pn,
      alter_sugg_sourcer_price: item.avl_alt_lowest_cost_without_main_pn,
      alter_sugg_sourcer_remark: null,
      alter_sugg_sourcer_color: alter_sugg_sourcer_color,
    }
  })
}
const generalEebomExport = async (baseDetail, avlList) => {
  genExportAvlPN(baseDetail)
  let commonPartList = await spendingModel.getAllPartNumberCommonParts()

  let orgPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(baseDetail, 'part_number')))
  let suggPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(baseDetail, 'suggestion_part_number')))
  let avlPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(baseDetail, 'alt_lowest_partnumber')))
  let altPnWithMainPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(baseDetail, 'alt_lowest_partnumber_without_main_pn')))
  let avlAltPnWithMainPnSpecs = await eeBomDetailModel.getSpecByPartnumbers(_.uniq(_.map(baseDetail, 'avl_alt_lowest_pn_without_main_pn')))

  return _.map(baseDetail, (detail) => {

    // eeBomUtils.calculationSubTotalLastPrice(detail)
    let altInfo = genExportAltInfos(detail, commonPartList, detail.lowest_price)
    let avlAltInfo = genExportAvlAltInfos(detail, commonPartList, detail.lowest_price)

    let org_pn_avl = null, sugg_pn_avl = null, alt_pn_avl = null, alt_pn_avl_without_main_pn = null, avl_alt_pn_avl_without_main_pn = null
    if (avlList.length > 0) {
      org_pn_avl = determinePnInAvl(detail, avlList, orgPnSpecs, { partnumber: 'part_number', manufacturer: 'manufacturer' }, false)
      sugg_pn_avl = determinePnInAvl(detail, avlList, suggPnSpecs, { partnumber: 'suggestion_part_number', manufacturer: 'suggestion_manufacturer' })
      alt_pn_avl = determinePnInAvl(detail, avlList, avlPnSpecs, { partnumber: 'alt_lowest_partnumber', manufacturer: 'alt_manufacturer' })
      alt_pn_avl_without_main_pn = determinePnInAvl(detail, avlList, altPnWithMainPnSpecs, { partnumber: 'alt_lowest_partnumber_without_main_pn', manufacturer: 'alt_manufacturer_without_main_pn' })
      avl_alt_pn_avl_without_main_pn = determinePnInAvl(detail, avlList, avlAltPnWithMainPnSpecs, { partnumber: 'avl_alt_lowest_pn_without_main_pn', manufacturer: 'avl_alt_lowest_manufacturer_without_main_pn' })
    }

    let spec = _.find(orgPnSpecs, (spec) => spec.item == detail.part_number)
    let bu_view = determineBuView(detail)

    return {
      ...detail,
      // for Hit-Rate Sheet
      spec01: spec ? spec.spec01 : null,
      supply_type_list: _.isNil(detail.supply_type_list) ? null : detail.supply_type_list.join(','),
      qty: fixMath.transStringToFloat(detail.qty),
      // for PCB common part 已經判斷為Y/N了
      is_common_parts: detail.is_common_parts == 'Y' || detail.is_common_parts == 'N' ? detail.is_common_parts : detail.is_common_parts ? 'Y' : 'N',
      price_usd_l: fixMath.transStringToFloat(detail.lowest_price),
      price_usd_m: fixMath.transStringToFloat(detail.second_highest_price),
      price_usd_h: fixMath.transStringToFloat(detail.current_price),
      valid_from_l: detail.lowest_price_valid_from ? moment(detail.lowest_price_valid_from).format('YYYYMMDD') : null,
      valid_from_m: detail.second_highest_price_valid_from ? moment(detail.second_highest_price_valid_from).format('YYYYMMDD') : null,
      valid_from_h: detail.valid_from ? moment(detail.valid_from).format('YYYYMMDD') : null,

      sub_total_last_price_l: fixMath.transStringToFloat(detail.sub_total_lowest_price),
      sub_total_last_price_m: fixMath.transStringToFloat(detail.sub_total_2nd_highest_price),
      sub_total_last_price_h: fixMath.transStringToFloat(detail.sub_total_last_price),
      price_gap: detail.sub_total_lowest_price && detail.sub_total_suggestion_cost ? fixMath.transStringToFloat(detail.sub_total_lowest_price) - fixMath.transStringToFloat(detail.sub_total_suggestion_cost) : null,

      sourcer_single: null, // 先留空
      sourcer_pn: null, // 先留空
      sourcer_manufacturer: null, // 先留空
      sourcer_price: null, // 先留空
      sourcer_remark: null, // 先留空

      ...altInfo,
      ...avlAltInfo,
      org_pn_avl,
      sugg_pn_avl,
      alt_pn_avl,
      alt_pn_avl_without_main_pn,
      avl_alt_pn_avl_without_main_pn,
      bu_view,
    }
  })
/**
    from base
    type1
    type2
    part_number
    description
    manufacturer
    vendor
    vendor_part_no
    supply_type
    obs
    exp
    qty
    board
    by_module
    suggestion_cost
    suggestion_part_number
    suggestion_is_common_part
    sub_total_suggestion_cost
    suggestion_from
    is_common_parts

    price_usd_l
    price_usd_m
    price_usd_h
    valid_from_l
    valid_from_m
    valid_from_h
    sub_total_last_price_l
    sub_total_last_price_m
    sub_total_last_price_h
    price_gap

    altInfo
    alt_lowest_partnumber
    alt_manufacturer
    alt_lowest_price
    price_gap_main_alt
    alt_is_common_parts

    avlAltInfo
    avl_alt_is_common_parts
    avl_alt_lowest_pn
    avl_alt_lowest_manufacturer
    avl_alt_lowest_cost
    price_gap_main_avl_alt

    alt_pn_avl
    org_pn_avl
    sugg_pn_avl

    bu_view

    sourcer_single: null // 先留空
    sourcer_pn: null // 先留空
    sourcer_manufacturer: null // 先留空
    sourcer_price: null // 先留空
    sourcer_remark: null // 先留空

  */
}
const genEebomExportOdmBomDetail = async (baseDetail, avlList) => {
  let fullbom = await generalEebomExport(baseDetail, avlList)
  return _.map(fullbom, (item) => {
    return {
      ...item,
    }
  })
}
// /**
//  * 將supply type 轉換成 key 值
//  * @param {Int} sapID ex: 13
//  */
// function getSupplyType(sapID) {
//   if (sapID == null) {
//     return 'W'
//   } else if (supplyTypeConfig[sapID] == 'V' && sapID == 13) {
//     return 'AV'
//   } else {
//     return supplyTypeConfig[sapID]
//   }
// }
/**
 * @param {Object} keys 用來判斷export中不同key的使用
 *
 * 不計算 MLCC, RES 分類的 Opportunity
 */
const genEebomSummaryOpportunity = (bom, keys = { costDiff: 'costDiff' }) => {
  let filterType1List = ['MLCC', 'RES']
  let total_opp_type1 = []
  let opp_common_parts_type1 = []
  let opp_non_common_parts_type1 = []
  // let opp_sbm_type1 = []
  // let opp_ee_type1 = []
  let opp_common_parts = 0
  let opp_non_common_parts = 0
  // let opp_sbm = 0
  // let opp_ee = 0
  let total_part_number_count = 0

  total_part_number_count = _.uniqBy(bom, 'part_number').length

  _.forEach(bom, (detail) => {
    let item_type = eeBomUtils.determineType(detail.part_number, detail.type1, detail.type2)
    // if(demFilterType1 && filterType1List.includes(eeBomUtils.determineType(detail.part_number, detail.type1, detail.type2))){
    //   return
    // }
    if(detail[keys.costDiff] > 0) {
      total_opp_type1.push(detail.type1)
    }

    if(detail.is_common_parts == 'Y' && detail[keys.costDiff] > 0 && !filterType1List.includes(item_type)) {
      opp_common_parts += detail[keys.costDiff]
      opp_common_parts_type1.push(detail.type1)
    } else if (detail[keys.costDiff] > 0 && !filterType1List.includes(item_type)) {
      opp_non_common_parts += detail[keys.costDiff]
      opp_non_common_parts_type1.push(detail.type1)
    }

    // if(detail.RBopportunity == 'SBM') {
    //   opp_sbm += detail[keys.costDiff]
    //   opp_sbm_type1.push(detail.type1)
    // }else if(detail.RBopportunity == 'EE') {
    //   opp_ee += detail[keys.costDiff]
    //   opp_ee_type1.push(detail.type1)
    // }
  })

  return {
    total_opp_type1: total_opp_type1.length > 0 ? _.uniq(total_opp_type1).join('/') : '',
    opp_common_parts: fixMath.transStringToFloat(opp_common_parts),
    opp_common_parts_type1: opp_common_parts_type1.length > 0 ? _.uniq(opp_common_parts_type1).join('/') : '',
    opp_non_common_parts: fixMath.transStringToFloat(opp_non_common_parts),
    opp_non_common_parts_type1: opp_non_common_parts_type1.length > 0 ? _.uniq(opp_non_common_parts_type1).join('/') : '',
    // opp_sbm: fixMath.transStringToFloat(opp_sbm),
    // opp_sbm_type1: opp_sbm_type1.length > 0 ? _.uniq(opp_sbm_type1).join('/') : '',
    // opp_ee: fixMath.transStringToFloat(opp_ee),
    // opp_ee_type1: opp_ee_type1 ? _.uniq(opp_ee_type1).join('/') : '',
    total_part_number_count,
  }
}
/**
 * get SPA supply type by SPA parnumber
 * @param {Array} eebom eebom partnumber ex: [ '75.00099.J7D', '83.BAV99.P11' ]
 */
const getSPASupplyTypeByPN = async (eebomPN) => {
  let pallelNum = 100
  let idx = 0
  let supplyList = []
  let supplyTypeConfigList = xrayUtilsLogical.analysisSupplyType(supplyTypeConfig, bomSupplyType)

  eebomPN = _.uniq(eebomPN)

  while(idx < eebomPN.length) {
    let selectedElms
    if((idx + pallelNum) < eebomPN.length) {
      selectedElms = eebomPN.slice(idx, (idx + pallelNum))
    } else {
      selectedElms = eebomPN.slice(idx)
    }

    let resPromise = await xrayModel.spaSupplyTypeByPN(selectedElms, Object.keys(supplyTypeConfigList))
    supplyList.push(...resPromise)

    idx += pallelNum
  }

  supplyList = _.chain(supplyList)
    .groupBy(s => s.matnr)
    .map((value, key) => {
      return {
        matnr: key,
        supply_type: _.chain(value).map(v => xrayUtilsLogical.getSupplyType(v.supply, supplyTypeConfigList)).uniq().value(),
      }
    })
    .value()

  return supplyList
}

/**
 *
 * @param {Array} dataByModule ex: [{ module: 'Connector', total_parts_count: 28, suggestion: 4.1, total_last: 4.5 }]
 * @returns {Object} ex: { Connector: {
      total_parts_count: 28,
      suggestion: 4.16067,
      total_last: 4.5244,
      hit_rate_FG: 0.08742,
      bu_target_cost: null,
      hit_rate_GI: 0 } }
 */

const parsingDataForSheet = (dataByModule) => {
  let result = {}
  _.chain(dataByModule)
    .forEach((data) => {
      let key = data.module.split(' ').join('_')
      let value = _.omit(data, ['module'])

      result[`${key}`] = {
        ...value,
        hit_rate_FG: value.total_last && value.suggestion && value.suggestion != 0 ? fixMath.fixedPoint(((value.total_last - value.suggestion) / value.suggestion), 5) : 0,
        bu_target_cost: null,
        hit_rate_GI: 0,
      }
    })
    .value()

  return result
}

/**
 *
 * @param {Array} dataByModule ex: [{ module: 'Connector', total_parts_count: 28, suggestion: 4.1, total_last: 4.5 }]
 * @returns {Object} ex: [{
      module: Connector
      total_parts_count: 28,
      suggestion: 4.16067,
      total_last: 4.5244,
      hit_rate_FG: 0.08742,
      bu_target_cost: null,
      hit_rate_GI: 0,
      cost_diff_first: 0,
      cost_diff_second: 0 }]
 */
const parsingDataForNewModule = (dataByModule) => {
  let result = []
  _.chain(dataByModule)
    .forEach((data) => {
      let key = data.module.split(' ').join('_')
      let value = _.omit(data, ['module'])
      let bu_target_cost = value.bu_target_cost ? value.bu_target_cost : 0

      result.push({
        ...value,
        module: key,
        hit_rate_FG: value.total_last && value.suggestion && value.suggestion != 0 ? fixMath.fixedPoint(((value.total_last - value.suggestion) / value.suggestion), 5) : 0,
        bu_target_cost: null,
        hit_rate_GI: 0,
        cost_diff_first: value.total_last && value.suggestion ? fixMath.fixedPoint(value.total_last - value.suggestion, 5) : 0,
        cost_diff_second: fixMath.fixedPoint(value.suggestion - bu_target_cost, 5),
      })
    })
    .value()
  return result
}

/**
 * 產生BuPriceList的內容
 * 將eeBomInfoList以規範的module分類並統計其total_parts_count、suggestion、total_last，部分module的價格會需要額外扣除其他料\
目前的module：
 * 1.module : connector，僅計算type1為Connector的料
 * 2.module : Power，僅計算sheet(頁碼)為44~54與85~86的料，且不計type1為connector的料
 * 3.module : other，計算connector與power以外的所有料(包含type1為PCB的料)
 * 4.module : RTC Bty，目前尚未接入資料，因此固定為null
 * 5.module : PCB，只計算PCB的料價，因lastPrice可能過期，因此total_last預設為null，由程式確認lastPrice有效才會更新值
 * @param {Array} eeBomInfoList eebomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
 * @param {Array} pcbInfoList pcb清單，資料來源:pcbService.pcbExportFormat
 * @param {Object} calPcbPriceInfo 統計完成的pcb價格資訊
 * @returns {Array}
[
    {
      module: 'Connector',
      total_parts_count: 0,
      suggestion: 0,
      total_last: 0,
    },...
]
 */
const getBuPriceList = (eeBomInfoList, pcbInfoList, calPcbPriceInfo) => {
  let buPriceList =  [
    {
      module: 'Connector',
      total_parts_count: 0,
      suggestion: 0,
      total_last: 0,
    },
    {
      module: 'Power',
      total_parts_count: 0,
      suggestion: 0,
      total_last: 0,
    },
    {
      module: 'Others',
      total_parts_count: 0,
      suggestion: 0,
      total_last: 0,
    },
    {
      module: 'RTC Bty',
      total_parts_count: 0,
      suggestion: null,
      total_last: null,
    },
    {
      module: 'PCB',
      total_parts_count: 0,
      suggestion: 0,
      total_last: null,
    },
  ]
  for(let eeBomInfo of eeBomInfoList){
    let calResult = eeBomUtils.calculationBomPrice(eeBomInfo)
    let targetCalObjIndex = 2 // is module: 'Others'
    if(eeBomUtils.isBuConnectorModule(eeBomInfo)){
      targetCalObjIndex = 0
    } else if(eeBomUtils.isBuPowerModule(eeBomInfo)){
      targetCalObjIndex = 1
    }
    let buCalObj = buPriceList[targetCalObjIndex]
    buCalObj.total_parts_count += calResult.totalPartsCount
    buCalObj.suggestion += calResult.totalSuggestionCost
    buCalObj.total_last += calResult.totalLastPrice
    eeBomUtils.calculationSubTotalLastPrice(eeBomInfo)
  }
  buPriceListProcess(buPriceList, pcbInfoList, calPcbPriceInfo)
  return buPriceList
}
/**
 * 對buPriceList的部分module做額外的資料處理
 * 1.module : PCB，套用PCB的料價，因lastPrice可能過期，因此total_last預設為null，由程式確認lastPrice有效才會更新值
 * @param {Array} eeBomInfoList eebomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
 * @param {Array} pcbInfoList pcb清單，資料來源:pcbService.pcbExportFormat
 * @param {Object} calPcbPriceInfo 統計完成的pcb價格資訊
 */
const buPriceListProcess = (buPriceList, pcbInfoList, calPcbPriceInfo) => {
  let buCalPcbObj = buPriceList[4] // Module : PCB
  buCalPcbObj.suggestion = calPcbPriceInfo.totalSuggestionCost
  for(let pcbInfo of pcbInfoList){
    if(!_.isNull(pcbInfo.lastPrice) || !_.isNull(pcbInfo.sourcer_cost)){
      buCalPcbObj.total_last = calPcbPriceInfo.totalLastPrice
      break
    }
  }
}
/**
 * 利用eeBomInfoList產生ModulePriceList
 * @param {Array} eeBomInfoList eebomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
 */
const getModulePriceList = (eeBomInfoList) => {
  let modulePriceList = eeBomUtils.calculationTotalBomPriceWithGroup(eeBomInfoList, 'module')
  modulePriceList = modulePriceList.map((calInfo)=> {
    return {
      module: calInfo.module,
      total_last: calInfo.totalLastPrice,
      suggestion: calInfo.totalSuggestionCost,
      total_parts_count: calInfo.totalPartsCount,
    }
  })
  return modulePriceList
}
/**
 * get new exchange rate data format for using new export module
 * @param {String} eedm_id eebom version id
 * @param {Array} 要處理的資料
 * @returns {Object} ex:
  {
    exchangeRate:
      [ { from: 'NTD',
          to: 'USD',
          sap_exchange_rate: 0.033,
          date: '20191101' },
        { from: 'RMB',
          to: 'USD',
          sap_exchange_rate: 0.142,
          date: '20191101' }
      ],
    defaultExchangeRate:
    [ { exchange_rate: null, RMB: 0.142 },
      { exchange_rate: null, NTD: 0.033 },
      { exchange_rate: null, JPY: 0.009 },
    ]
  }
 */
const getNewModuleExchangeRateSheet = async (eedm_id, detail) => {
  let currency = []
  let exchangeRate = []
  let exchangeRateForSheet = []
  let exchangeRateDefault = []
  let exchangeRateDefaultList = []
  let defaultList = ['RMB', 'NTD', 'JPY']

  let refresh_time = await eeBomMainModel.getEdmVersionRefreshTime(eedm_id)

  if (detail.length > 0) {

    _.forEach(detail, (data) => {

      // spa currency
      if(data.spaOriginCurrency && data.spaOriginCurrency != 'USD' && currency.indexOf(data.spaOriginCurrency) < 0) {
        currency.push(data.spaOriginCurrency)
      }

      // last currency & pcb currency
      if(data.last_price_currency && data.last_price_currency != 'USD' && currency.indexOf(data.last_price_currency) < 0) {
        currency.push(data.last_price_currency)
      }

      // alt last currency
      if(data.alt_other_info && data.alt_other_info.origin_currency && data.alt_other_info.origin_currency != 'USD' && currency.indexOf(data.alt_other_info.origin_currency) < 0) {
        currency.push(data.alt_other_info.origin_currency)
      }

      // // pcb currency
      // data.origin_currency && data.origin_currency != 'USD' &&
      // currency.indexOf(data.origin_currency) < 0 ? currency.push(data.origin_currency) : null
    })
  }

  if(currency.length > 0 && refresh_time) {
    // get exchange_rate by date
    let exchangeRateRes = await costUtils.getExchangeRateByDate(currency, moment(refresh_time).tz('Asia/Taipei').format('YYYYMMDD'))
    exchangeRateForSheet = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes, 'USD')
  // get
  }

  // defalt JPY, NTD, RMB
  if(refresh_time) {
    let exchangeRateRes = await costUtils.getExchangeRateByDate(defaultList, moment(refresh_time).tz('Asia/Taipei').format('YYYYMMDD'))
    exchangeRateDefault = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes, 'USD').reverse()
    // _.map(exchangeRateDefault, i => {
    //   exchangeRateDefaultList.push([i[2]])
    // })
    _.map(defaultList, (i, idx) => {
      let tmp = {}
      tmp['exchange_rate'] = null
      tmp[i] = exchangeRateDefault[idx].sap_exchange_rate
      exchangeRateDefaultList.push(tmp)
    })

  }

  return {
    exchangeRate: exchangeRateForSheet,
    defaultExchangeRate: exchangeRateDefaultList,
  }
}



module.exports = Spending
