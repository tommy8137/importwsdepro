/* eslint-disable no-unused-vars */
const _ = require('lodash')
const UUID = require('uuid/v4')
const dbHelper = require('../../utils/helper/db_helper')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('pcbService')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { pcb: pcbModel } = require('../../model/bom/pcb.js')
const eeBomMainModel = require('../../model/bom/eeBomMain.js')
const eeBomDetailModel = require('../../model/bom/eeBomDetail.js')
const spendingModel = require('../../model/spending/spending.js')
const pcbFormulaService = require('../../service/bom/pcbFormula')
const { formatNumberLength } = require('../../helpers/utils.js')
const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')
const traverse = require('traverse')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const moment = require('moment')
const moveFile = require('move-file')
const meBomCost = require('../../utils/cost/meBomCost')
const partListService = require('./partList')
const xlsxPopulate = require('xlsx-populate')
const fixMath = require('../../helpers/math/math.js')
const exchangeRate = require('../../utils/exchangeRateExport/exchangeRate.js')
const ut = require('util')
const eeBomUtils = require('../../utils/eebom/eebomUtils')
const { formatFloat } = require('../../helpers/utils.js')
const utilsService = require('../../service/utils/formula.js')
const { Excel } = require('../../utils/dataFrame/excel')
const partlistUtil = require('../../utils/partlist/index.js')
const requestUtil = require('../../utils/request/index.js')
const Formula = require('../../api/utils/formula.js')
const { pcbRule } = require('../../../config.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const formula = new Formula()

const EEDM_PCB_TEMP_PARALLEL_NUM = 2
const eeFloatPoint = new DecimalGetter('EEBom')


function getPriceData(item) {
  return item.content ? item.content.Price || {} : {}
}

const SPEC_COMPARE_KEYS = [
  'manufacturer', 'SPEC01', 'SPEC02', 'SPEC03', 'SPEC04', 'SPEC05', 'SPEC06',
  'SPEC07', 'SPEC08', 'SPEC09', 'SPEC10', 'SPEC11', 'SPEC12', 'SPEC13', 'SPEC14',
  'SPEC15', 'SPEC16', 'SPEC17', 'SPEC18', 'SPEC19', 'SPEC20', 'SPEC21', 'SPEC22',
  'SPEC23', 'SPEC24',
]

const PCBTYPEABBR = {
  uma: 'U',
  discrete: 'D',
}
const pcbFormatter = (data) => {
  return data.map((item)=> {
    const priceData = getPriceData(item)
    let SPEC24 = priceData ? priceData.SPEC24 : null
    if (SPEC24 === true) {
      SPEC24 = 'N'
    } else if (SPEC24 === false) {
      SPEC24 = 'Y'
    }
    return ({
      ...item,
      Price: { ...priceData, SPEC24 },
      cost: parseFloat(item.cost),
      qty: parseInt(item.qty),
    })
  })
}
const getMaxSerialNum = (data) => {
  if (data.length === 0) {
    return 0
  }
  let pns = data.map((item) => {
    return parseInt(item.part_number.slice(-3)) || 0
  })
  return pns.reduce(function (prev, current) {
    return (prev > current) ? prev : current
  })
}
const getPCBPartNumberCmp = async (edmVersionId, type) => {
  logger.info(`get edm version id: ${edmVersionId}`)
  let edmVersionObj = await pcbModel.getEdmVersionInfo(edmVersionId)
  if (edmVersionObj === false) {
    logger.error('no edm version found')
    throwApiError('EDM VERSION NOT FOUND', errorCode.DATANOTFOUND)
  }
  let edmVersion = edmVersionObj.version
  logger.info(`get edm version: ${edmVersion}`)
  let pjInfo =  await pcbModel.getPcbPcbTypeDateFromProject(edmVersionId)
  let [pcb, pcbType, date] = [pjInfo.pcbno || '', pjInfo.sku, edmVersionObj.version]
  let pcbTypeAbbr = PCBTYPEABBR[pcbType.toLowerCase()]
  let pcbAmount = await pcbModel.getPcbByQuery({
    type,
    edm_version_id: edmVersionId,
  })
  pcbAmount = getMaxSerialNum(pcbAmount.rows)
  if (pcbAmount > 99) {
    logger.error('pcb amount reaches to limit 99')
    throwApiError('SIZELIMIT', errorCode.SIZELIMIT)
  }
  return [pcbTypeAbbr, pcb, pcbAmount]
}
// 產生 主板 part number
const getPCBPartNumberForMainBoard = (pcbTypeAbbr, pcb, pcbAmount) => {
  pcbAmount = formatNumberLength(pcbAmount, 3)
  return `48${pcbTypeAbbr}.${pcb}.D${pcbAmount}`
}
// 產生 小板 part number
const getPCBPartNumberForSubBoard = (pcbTypeAbbr, pcb, pcbAmount) => {
  pcbAmount = formatNumberLength(pcbAmount, 3)
  return `488.dummy.${pcbAmount}`
}
/**
 * 當pcb清單內物件的supply Type為null時，將其替換為預設值。
 * 當指定物件存在supplyType屬性時才會被替換
 * @param {Array} pcbInfoList pcbInfoList
 */
const formatPcbSupplyType = (pcbInfoList) => {
  const replaceNullSupplyType = utilsService.getDefaultSupplyType()
  for(let pcbInfo of pcbInfoList){
    if(_.isNull(pcbInfo.supply_type)){
      pcbInfo.supply_type = replaceNullSupplyType
      const PcbPartNumberForm = pcbInfo.content.formData.pcbTab.PcbPartNumber
      const contentPriceForm = pcbInfo.content.Price
      const contentSpecForm = pcbInfo.content.spec
      const priceForm = pcbInfo.Price
      replacePcbObjSupplyType(PcbPartNumberForm, replaceNullSupplyType)
      replacePcbObjSupplyType(contentPriceForm, replaceNullSupplyType)
      replacePcbObjSupplyType(contentSpecForm, replaceNullSupplyType)
      replacePcbObjSupplyType(priceForm, replaceNullSupplyType)
    }
  }
}
/**
 * 替換指定物件下的supply_type屬性的值，supply_type為null時才會替換，其他狀況均不替換
 * @param {Object} pcbSubObj pcbInfo的子物件
 * @param {String} replaceValue 要替換的值
 */
const replacePcbObjSupplyType = (pcbSubObj, replaceValue) => {
  if(!_.isUndefined(pcbSubObj) && pcbSubObj.hasOwnProperty('supply_type')){
    pcbSubObj.supply_type = replacePcbSupplyType(pcbSubObj.supply_type, replaceValue)
  }
}
/**
 * 替換supply_type的值，supply_type為null時才會替換，其他狀況均不替換
 * @param {String or null} supplyType
 * @param {String} replaceValue 要替換的值
 */
const replacePcbSupplyType = (supplyType, replaceValue) => {
  return _.isNull(supplyType) ? replaceValue : supplyType
}

class PcbBaseService {
  static async updatePersonalCheck(info){
    await pcbModel.updateEdmVersion(info)
  }
  static async updateLeaderCheck(info){
    let  edmVersionInfo = await pcbModel.getEdmVersionInfo(info.id)
    if(!edmVersionInfo) {
      throwApiError('update pcb leader check err, edmversion info is empty', errorCode.DATANOTFOUND)
      logger.debug('update pcb leader check err, edmversion info is empty')
    }
    if(!edmVersionInfo.is_pcb_personal_submitted && !edmVersionInfo.is_reject) {
      logger.debug('update pcb leader check err, personal submitted is not complete')
      throwApiError('update pcb leader check err, personal submitted is not complete', errorCode.APPROVEERROR)
    }
    await pcbModel.updateEdmVersion(info)
  }
  static async updateLeaderSubmitted(userID, info, version_remark){
    let  edmVersionInfo = await pcbModel.getEdmVersionInfo(info.id)
    if(!edmVersionInfo) {
      throwApiError('update pcb leader check err, edmversion info is empty', errorCode.DATANOTFOUND)
      logger.debug('update pcb leader check err, edmversion info is empty')
    }
    if(info.leader_submitted_status == 'reject') {
      info['is_pcb_personal_checked'] = false
      info['is_pcb_personal_submitted'] = false
      info['leader_checked_status'] = null
      info['leader_submitted_status'] = null
      info['is_reject'] = true
      await pcbModel.updateEdmVersion(info)
    } else if (info.leader_submitted_status == 'approve') {
      info['is_pcb_personal_checked'] = true
      info['is_pcb_personal_submitted'] = true
      info['is_reject'] = false
      await pcbModel.updateEdmVersion(info)
    } else if (info.leader_checked_status == 'approve' || info.leader_checked_status == 'reject') {
      info['is_pcb_personal_checked'] = true
      info['is_pcb_personal_submitted'] = true
      await pcbModel.updateEdmVersion(info)
    } else {
      await pcbModel.updateEdmVersion(info)
    }
    let pcbInfo = await pcbModel.getEdmVersionInfo(info.id)
    if(pcbInfo.leader_submitted_status == 'approve') {
      await pcbModel.updateEdmVersion({ id: info.id, is_pcb_approved: true })
      let approveInfo = {
        edm_version_id: info.id,
        type: 'pcb',
        user: userID,
      }
      if(typeof version_remark != 'undefined') {
        approveInfo.version_remark = version_remark
      }
      await eebomService.approve(approveInfo)
    }
  }
  static async updatePersonalSubmitted(info){
    let  edmVersionInfo = await pcbModel.getEdmVersionInfo(info.id)
    if(!edmVersionInfo) {
      throwApiError('update pcb personal submitted err, edmversion info is empty', errorCode.DATANOTFOUND)
      logger.debug('update pcb personal submitted err, edmversion info is empty')
    }
    if(!edmVersionInfo.is_pcb_personal_checked) {
      logger.debug('update pcb personal submitted err, personal check is not complete')
      throwApiError('update pcb personal submitted err, personal check is not complete', errorCode.APPROVEERROR)
    }
    await pcbModel.updateEdmVersion(info)
  }
  static async getProjectInfoByVersionID(info){
    let edmVersionInfo =  await eeBomDetailModel.getEdmVersionInfo(info.id)
    if(!edmVersionInfo) {
      throwApiError('pcb id not correct', errorCode.DATANOTFOUND)
      logger.debug('pcb id not correct')
    }
    let eeBomInfo = await eeBomMainModel.getEeBomInfoByID(edmVersionInfo.eebom_project_id)
    logger.debug('eeBomInfo', eeBomInfo)
    return eeBomInfo
  }
  static async getType2(){
    let type2Infos = await pcbModel.getType2()
    type2Infos = type2Infos.map((x)=>{
      return x.type2
    })
    return {
      type2: type2Infos,
    }
  }


  static async getPCB(edm_version_id, column, keyword, filterCountField = true) {
    let pcbBomItemList = await pcbModel.getPCB(edm_version_id, column, keyword, filterCountField)
    const edmVersion = await eeBomDetailModel.getEdmVersionInfo(edm_version_id)
    const eebomProject = await eeBomMainModel.getEeBomInfoByID(edmVersion.eebom_project_id)
    const layout = await this._getPcbPartListLayout()
    layout.layout[0].items.find(item => item.key === 'PcbContent').items
      .reduce((acc, item) => ({
        ...acc,
        [item.key]: item,
      }), {})

    //  因為有兩組料號，一組緯創料號另一組自組的，因為要組出last price 所以有以下可怕的寫法
    let wistronpns = []
    for (let pcbBomItem of pcbBomItemList) {
      if (getPriceData(pcbBomItem).hasOwnProperty('wistronpn')) {
        pcbBomItem.part_number_tmp = pcbBomItem.part_number
        pcbBomItem.part_number = pcbBomItem.content.Price.wistronpn
        wistronpns.push(pcbBomItem.content.Price.wistronpn)
      } else {
        pcbBomItem.part_number_tmp = pcbBomItem.part_number
        pcbBomItem.part_number = null
      }
    }
    let descriptionInfoList = []
    if(wistronpns.length > 0) {
      wistronpns = Array.from(new Set(wistronpns))
      descriptionInfoList = await pcbModel.getDescriptions(wistronpns)
    }
    await pcbFormulaService.pcbFormula.addPcbLastpriceInfo(pcbBomItemList)
    pcbBomItemList = await this.getObsByPn(pcbBomItemList)
    let res = pcbFormatter(pcbBomItemList).map((pcbBomItem) => {
      pcbBomItem.description = null
      const priceData = getPriceData(pcbBomItem)
      for(let descriptionInfo of descriptionInfoList) {
        if(descriptionInfo.wistron_pn == pcbBomItem.part_number) {
          pcbBomItem.description = descriptionInfo.description
          break
        }
      }
      pcbBomItem.last_price = JSON.parse(pcbBomItem.last_price)
      pcbBomItem.wistronpn =  pcbBomItem.part_number == 'null' ? null  : pcbBomItem.part_number
      pcbBomItem.part_number = pcbBomItem.part_number_tmp
      const priceInfo = this._getPcbBomItemPriceInfo(pcbBomItem)
      this.genSuggestionInfoFromPCB(pcbBomItem)
      // 191227 pcb儲存後可修改需求，因此追加此項，搬移舊資料的typeii位置
      const pcbTabInfo = pcbBomItem.content.formData.pcbTab
      if(pcbTabInfo.hasOwnProperty('PcbContent') && pcbTabInfo.PcbContent.hasOwnProperty('typeii')){
        if(pcbTabInfo.hasOwnProperty('PcbPartNumber')){
          pcbTabInfo.PcbPartNumber.typeii = pcbTabInfo.PcbContent.typeii
          delete pcbTabInfo.PcbContent.typeii
        }
      }
      const result = {
        ...pcbBomItem,
        Price: priceData,
        remark: priceData.remark,
        type1: 'PCB',
        type2: priceData.typeii,
        PcbStageNo: pcbBomItem.stage_no,
        ce_cost: priceInfo.ceCost,
        clean_sheet_cost: priceInfo.cleanSheetCost,
        last_price: priceInfo.lastPrice,
        exp: _.isNull(priceInfo.lastPrice) ? 'Y' : 'N',
        valid_date: pcbBomItem.last_price.validDate,
        sourcer_cost: priceInfo.sourcerCost,
        // suggestion_cost: parseFloat(suggestion_cost), 已在genSuggestionInfoFromPCB追加
        sub_total_last_price: this._calulatePcbSubTotalLastPrice(priceInfo.lastPrice, priceInfo.sourcerCost, pcbBomItem.qty),
        sub_total_highest_last_price: this._calulatePcbSubTotalLastPrice(pcbBomItem.highestLastPriceInfo.unitPrice, priceInfo.sourcerCost, pcbBomItem.qty),
        sub_total_lowest_last_price: this._calulatePcbSubTotalLastPrice(pcbBomItem.lowestLastPriceInfo.unitPrice, priceInfo.sourcerCost, pcbBomItem.qty),
        sub_total_suggestion_cost: formatFloat(formatFloat(pcbBomItem.suggestion_cost,  eeFloatPoint.get('default')) * pcbBomItem.qty,  eeFloatPoint.get('default')),
        qty: parseInt(pcbBomItem.qty),
        vendor: pcbBomItem.last_price.vendor,
        vendor_pn: pcbBomItem.last_price.vendor_pn,
        obs: pcbBomItem.obs,
        originCurrency: pcbBomItem.originCurrency,
        origin_last_price: pcbBomItem.origin_last_price,
      }
      this._addPcbHighestAndLowestLastPriceInfoInResponse(result, pcbBomItem)
      return result
    })
    // order by getpcb list by create_time
    res = _.orderBy(res, ['create_time'], ['desc'])
    formatPcbSupplyType(res)
    return {
      status_version: edmVersion.status_version,
      edm_version_id: edm_version_id,
      plant: eebomProject.plant,
      list: res,
    }
  }
  /**
   * 在res body物件上追加pcbBomItem的最低與最高價資訊
   * @param {Object} resResult response body object
   * @param {Object} pcbBomItem 用於取得價格物件的父物件，
   * function getPCBs使用時傳入pcbBomItem.(Bom Management的pcb detail用)
   * function calculatePCBs使用時則傳入經過公式運算後的cost物件.(PCB Cleansheet用)
   */
  static _addPcbHighestAndLowestLastPriceInfoInResponse(resResult, pcbBomItem){
    resResult.highest_last_price_info = pcbBomItem.highestLastPriceInfo
    resResult.lowest_last_price_info = pcbBomItem.lowestLastPriceInfo
    if(resResult.hasOwnProperty('highestLastPriceInfo')){
      delete resResult.highestLastPriceInfo
    }
    if(resResult.hasOwnProperty('lowestLastPriceInfo')){
      delete resResult.lowestLastPriceInfo
    }
  }
  /**
   * 計算pcb的SubTotalLastPrice
   * @param {Number} lastPrice
   * @param {Number} sourcerCost
   * @param {Number} itemQty
   */
  static _calulatePcbSubTotalLastPrice(lastPrice, sourcerCost, itemQty){
    if(!_.isNull(lastPrice)){
      return formatFloat(formatFloat(lastPrice,  eeFloatPoint.get('default')) * itemQty,  eeFloatPoint.get('default'))
    }
    return formatFloat(formatFloat(sourcerCost,  eeFloatPoint.get('default')) * itemQty,  eeFloatPoint.get('default'))
  }
  /**
   * 產出pcbBomItem的價格相關資訊
   * @param {Object} pcbBomItem
   * @returns {Object}
   */
  static _getPcbBomItemPriceInfo(pcbBomItem){
    const priceData = getPriceData(pcbBomItem)
    return {
      lastPrice: pcbBomItem.last_price.unitPrice ? parseFloat(pcbBomItem.last_price.unitPrice) : null, // lastprcie最低價
      cleanSheetCost: parseFloat(pcbBomItem.cost),  // 系統計算的價格
      sourcerCost: pcbBomItem.sourcer_cost ? parseFloat(pcbBomItem.sourcer_cost) : null, // sourcer填寫的價格
      ceCost: (priceData && priceData.PcbFillInPrice) ? parseFloat(priceData.PcbFillInPrice) : null, // 填寫pcb detail時才會有的自填價格
    }
  }
  /**
   * 在pcbBomItem上追加Suggestion cost的相關資訊
   * @param {Object} pcbBomItem
   */
  static genSuggestionInfoFromPCB(pcbBomItem) {
    const priceInfo = this._getPcbBomItemPriceInfo(pcbBomItem)
    if(!_.isNull(priceInfo.ceCost)){
      pcbBomItem.suggestion_cost = priceInfo.ceCost
      pcbBomItem.suggestion_from = 'CE Cost'
      return
    }
    let compareData = []
    if (priceInfo.lastPrice) {
      compareData.push({
        price: priceInfo.lastPrice,
        type: 'Main Source',
      })
    }
    if (priceInfo.sourcerCost) {
      compareData.push({
        price: priceInfo.sourcerCost,
        type: 'Sourcer Cost',
      })
    }

    if(priceInfo.cleanSheetCost) {
      compareData.push({
        price: priceInfo.cleanSheetCost,
        type: 'Clean Sheet Cost',
      })
    }
    if (_.isNull(pcbBomItem.suggestion_cost) && compareData.length > 0) {
      let result = _.orderBy(compareData, ['price'], ['asc'])
      pcbBomItem.suggestion_cost = result[0].price
      pcbBomItem.suggestion_from = result[0].type
    }
  }

  static async pcbExportFormat(edm_version_id, supply_type = null) {
    let results = await this.getPCB(edm_version_id, false, false)
    let eeSupplyFilter = supply_type ? supply_type.toUpperCase().split(',') : []
    let commonPartList = await spendingModel.getAllPartNumberCommonParts()

    let res = results.list.map((result, idx)=>{
      let costDiff = fixMath.transStringToFloat(result.sub_total_last_price) - fixMath.transStringToFloat(result.sub_total_suggestion_cost)
      return {
        type1: 'PCB',
        type2: result.content.Price.typeii,
        PcbStageNo: result.PcbStageNo,
        parallelBoard: result.content.Price.SPEC24,
        // partNumber: result.part_number,
        partNumber: result.wistronpn,
        part_number: result.wistronpn, // for dashboard item pcb
        description: result.description,
        manufacturer: result.content.Price.manufacturer,
        valid_date: result.valid_date ? moment(result.valid_date).format('YYYYMMDD') : null,
        cleanSheetCost: fixMath.transStringToFloat(result.clean_sheet_cost),

        lastPrice: fixMath.transStringToFloat(result.last_price),
        current_price: fixMath.transStringToFloat(result.last_price), // for dashboard item pcb
        lowest_price: result.lowest_last_price_info.unitPrice ? fixMath.transStringToFloat(result.lowest_last_price_info.unitPrice) : null,
        // sprint 26: 目前 2nd highest price 只有MLCC, 其餘皆用最低價
        second_highest_price: result.lowest_last_price_info.unitPrice ? fixMath.transStringToFloat(result.lowest_last_price_info.unitPrice) : null,

        spaCost: null,
        spaPartNumber: null,
        spaManufacturer: null,
        spaSupplyType: null,
        lpp: null,
        ceAdj: null,
        ceCost: fixMath.transStringToFloat(result.ce_cost),
        ce_cost: fixMath.transStringToFloat(result.ce_cost), // for dashboard item pcb
        // pcb.suggestionCost ? (pcb.suggestionCost * parseInt(pcb.qty)) : 0
        suggestion_cost: result.suggestion_cost,
        suggestion_from: result.suggestion_from ? result.suggestion_from : null,
        suggestionCost: result.suggestion_cost ? formatFloat(formatFloat(result.suggestion_cost,  eeFloatPoint.get('default')) * parseInt(result.qty),  eeFloatPoint.get('default')) : 0,
        // suggestion_cost: result.suggestion_cost ? formatFloat(formatFloat(result.suggestion_cost, 5) * parseInt(result.qty), 5) : 0, // for dashboard item pcb
        remark: result.remark,
        qty: result.qty,
        totalSuggestionCost: fixMath.transStringToFloat(result.sub_total_suggestion_cost), // for export excel 使用
        subTotalLastPrice: fixMath.transStringToFloat(result.sub_total_last_price), // for export excel 使用
        vendor: result.vendor,
        vendorPartNumber: result.vendor_pn,
        vendor_part_no: result.vendor_pn, // for dashboard item pcb
        supplyType: result.supply_type,
        supply_type: result.supply_type, // for dashboard item pcb
        obs: result.obs,
        exp: result.exp,
        sub_total_last_price: fixMath.transStringToFloat(result.sub_total_last_price),

        sub_total_highest_price: fixMath.transStringToFloat(result.sub_total_highest_last_price),
        sub_total_lowest_price: fixMath.transStringToFloat(result.sub_total_lowest_last_price),
        sub_total_2nd_highest_price: fixMath.transStringToFloat(result.sub_total_lowest_last_price),
        sub_total_suggestion_cost: fixMath.transStringToFloat(result.sub_total_suggestion_cost),
        sourcer_cost: fixMath.transStringToFloat(result.sourcer_cost),
        status_version: results.status_version,
        origin_currency: result.originCurrency ? result.originCurrency : null,
        currency: 'USD', //result.originCurrency, // for dashboard item pcb
        last_price_currency_price: result.origin_last_price ? result.origin_last_price : null, // for dashboard item pcb
        origin_last_price: result.origin_last_price ? result.origin_last_price : null,
        costDiff, // for dashboard item pcb
        RBopportunity: costDiff > 0 ? 'EE' : null,
        board:result.board,
        module:result.module,
        // RBopportunity, for export, 如果 costDiff > 0 且 是common part的話 為 'SBM', pcb 好像沒有判斷料號是否為CMP 故costDiff > 0 都給 'EE'

        lowest_price_valid_from: result.lowest_last_price_info.validDate ? moment(result.lowest_last_price_info.validDate).format('YYYYMMDD') : null,
        second_highest_price_valid_from: result.lowest_last_price_info.validDate ? moment(result.lowest_last_price_info.validDate).format('YYYYMMDD') : null,
        valid_from: result.valid_date ? moment(result.valid_date).format('YYYYMMDD') : null,
        is_common_parts: commonPartList.find(i => i.partnumber == result.wistronpn ) ? 'Y' : 'N',
      }
    })
    res = _.orderBy(res, ['type2'], ['asc'])
    res = eeBomUtils.eeBomFilter(res, 'supplyType', eeSupplyFilter)
    return res
  }
  static async deletePCB(ids) {
    const result = await pcbModel.deletePCB(ids)
    return result
  }
  static async importPCBAdder(type, file) {
    if(!file) {
      let isGeneralExist = await pcbModel.isGeneralAdderExist()
      let isUSDAdderExist = await pcbModel.isUSDAdderExist()

      if(isGeneralExist && isUSDAdderExist) {
        console.log('pcb spec already has data')
        return true
      }
      let file = {}
      if(!isGeneralExist) {
        file['path'] = path.resolve(__dirname, '../../utils/initExcel/pcb/general_adder.xlsx')
        file['name'] = path.resolve(__dirname, '../../utils/initExcel/pcb/general_adder.xlsx')
        let adderResult = await parseExcel(file, true)
        await this.importAdder('general', adderResult.sheetNames, adderResult.excelToJson)
      }
      if(!isUSDAdderExist) {
        file['path'] = path.resolve(__dirname, '../../utils/initExcel/pcb/usd_adder.xlsx')
        file['name'] = path.resolve(__dirname, '../../utils/initExcel/pcb/usd_adder.xlsx')
        let  USDResult = await parseExcel(file, true)
        await this.importAdder('usd', USDResult.sheetNames, USDResult.excelToJson)
      }

    } else {
      if(type != 'usd' && type != 'general') {
        logger.debug('import pcb format excel error, type  not give')
        throwApiError('request body error, type not give', errorCode.ERRORFORMAT)
      }
      let { sheetNames, excelToJson, filePath } = await parseExcel(file, false)
      await pcbModel.truncatePCBSpec(type)
      await this.importAdder(type, sheetNames, excelToJson)
      if(filePath){
        type == 'usd' ? await moveFile(filePath, path.resolve(__dirname, '../../utils/initExcel/pcb/usd_adder.xlsx')) : await moveFile(filePath, path.resolve(__dirname, '../../utils/initExcel/pcb/general_adder.xlsx'))
      }
    }
    return true
  }
  static async importAdder(type, sheetNames, excelToJson) {
    let client = await new tsystemDB()
    let header =  [], manufacturers = [], references = []
    let nowtime = moment().utc().format()

    for (const sheetName of sheetNames) {
      let referenceStartIndex = 0
      let referenceEndIndex = 0

      try {
        header = Object.keys(excelToJson[sheetName][0])
        referenceStartIndex = header.indexOf('Reference1')
        referenceEndIndex = header.indexOf('END') - 1
      } catch(e) {
        logger.debug('importAdder error, err:', e)
        throwApiError('parse body error', errorCode.ERRORFORMAT)
      }
      for (let data of excelToJson[sheetName]){
        let start = referenceStartIndex, end = referenceStartIndex + 2
        let pcbSpec = {}, manufacturer = {}
        for(let i = 0 ; i < referenceStartIndex ; i++) {
          pcbSpec[header[i]] = data[header[i]]
        }
        pcbSpec['insert_type'] = type
        let pcbSpecUUID
        try {
          pcbSpecUUID = await pcbModel.insertPCBSpec(pcbSpec)
        } catch(e) {
          logger.debug('pcb adder import error, err:', e)
          await pcbModel.truncatePCBSpec()
          await this.importPCBAdder(false, false)
          throwApiError('pcb adder import error', errorCode.ERRORFORMAT)
        }
        pcbSpec['uuid'] = pcbSpecUUID
        // 塞reference 進table
        while(end <= referenceEndIndex) {
          let reference = {}
          for(let i = start ; i <= end ; i++) {
            if(i == start &&  data[header[i]] == null) break
            if(header[i].includes('value')) {
              reference['reference_value'] = data[header[i]]
            } else if(header[i].includes('Column')) {
              reference['spec'] = data[header[i]]
            } else  {
              reference['reference'] = data[header[i]]
            }
          }
          if(!_.isEmpty(reference)) {
            reference['pcb_typeii_spec01_uuid'] = pcbSpecUUID
            reference['create_time'] = nowtime
            references.push(reference)
          }
          // reference 的start end指標位移3
          start += 3
          end += 3
        }

        // insert  vendor table
        for(let i = referenceEndIndex + 2 ; i < header.length ; i++) {
          manufacturer = {}
          if(header[i] == '__EMPTY') continue
          if(data[header[i]] == null) {
            type == 'usd' ? manufacturer['price'] = 0 : manufacturer['percentage'] = 0
          } else if( type == 'usd' && data[header[i]].includes('=')) {
            manufacturer['price'] = data[header[i]].replace('=', '')
          } else{
            type == 'usd' ? manufacturer['price'] =  data[header[i]] : manufacturer['percentage'] =  data[header[i]]
          }
          manufacturer['manufacturer'] = header[i]
          manufacturer['pcb_typeii_spec01_uuid'] = pcbSpecUUID
          manufacturer['create_time'] = nowtime
          manufacturers.push(manufacturer)
        }
      }
      try{
        if(type == 'usd') {
          await pcbModel.insertUSDAdderRules(client, references)
          await pcbModel.insertPCBManufacturerUsd(client, manufacturers)
        } else {
          await pcbModel.insertAdderRules(client, references)
          await pcbModel.insertPCBManufacturerAdder(client, manufacturers)
        }
      } catch (e) {
        logger.debug('pcb adder import error, err:', e)
        await pcbModel.truncatePCBSpec(type)
        await this.importPCBAdder(false, false)
        throwApiError('pcb adder import error', errorCode.ERRORFORMAT)
      }
    }
    await client.commit()
    return true
  }
  static async importBasePrice(file) {
    if(!file) {
      let isBasePrice = await pcbModel.getBasePrice()
      if(isBasePrice) {
        console.log('base price already has data')
        return true
      }
      let file = {}
      file['path'] = path.resolve(__dirname, '../../utils/initExcel/pcb/base_price.xlsx')
      file['name'] = path.resolve(__dirname, '../../utils/initExcel/pcb/base_price.xlsx')
      let { sheetNames, excelToJson } = await parseExcel(file, true)
      await this.saveBasePrice(sheetNames, excelToJson)

    } else {
      let { sheetNames, excelToJson, filePath } = await parseExcel(file, false)
      await pcbModel.truncateBasePrice()
      let result = await this.saveBasePrice(sheetNames, excelToJson)
      await moveFile(filePath, path.resolve(__dirname, '../../utils/initExcel/pcb/base_price.xlsx'))
      return result
    }

  }

  static async saveBasePrice(sheetNames, excelToJson) {
    let  client = await new tsystemDB()

    let header =  [], obj = []
    _.forEach(sheetNames, (sheetName) => {
      header = Object.keys(excelToJson[sheetName][0])
      excelToJson[sheetName].map(async(data) => {
        let tmp = {
          typeii: data.TypeII,
          manufacturer: data.Manufacturer,
          spec01: data.SPEC01,
          spec02: data.SPEC02,
          spec03: data.SPEC03,
          base_price: data.Base_Price,
          create_time: 'NOW()',
        }
        obj.push(tmp)
      })
    })
    let result
    try {
      result = await pcbModel.insertBasePrice(client, obj)
      client.commit()
    } catch (e) {
      logger.debug('import base price error, err:', e)
      throwApiError('import base price error', errorCode.ERRORFORMAT)
    }
    return result
  }

  static async getPCBSpecByWistronPN(wistron_pn, edmVersionID, plant) {
    let PcbStageNo = null
    let supply_type = null
    if (edmVersionID && plant) {
      logger.info(`query with edmVersionID: ${edmVersionID} and plant: ${plant}`)
      const edmVersion = await eeBomDetailModel.getEdmVersionInfo(edmVersionID)
      const eebomProject = await eeBomMainModel.getEeBomInfoByID(edmVersion.eebom_project_id)
      let stage = eebomProject.stage
      supply_type =  await pcbModel.getSupplyType(wistron_pn, plant)
      PcbStageNo = await genPcbStageNo(wistron_pn)
    }
    let pcbSpecwithWistronPN =  await pcbModel.getPCBSpecByWistronPN(wistron_pn)
    if(!pcbSpecwithWistronPN.length) {
      // 2020/1/31 因使用者想要沒有spec也可以下一步，因此改不檢查
      // throwApiError('Cannot find PCB DATA by this wistron P/N', errorCode.DATANOTFOUND)
      logger.debug('Cannot find PCB DATA by this wistron P/N:', wistron_pn)
    }
    supply_type = replacePcbSupplyType(supply_type, utilsService.getDefaultSupplyType())
    const result = pcbSpecwithWistronPN.reduce((acc, item) => {
      if (!acc) {
        return {
          ...item,
          spec17: item.spec17 ? item.spec17.split(';') : [],
          spec18: item.spec18 ? item.spec18.split('/') : [],
          spec19: item.spec19 ? item.spec19.split(';') : [],
          spec20: item.spec20 ? item.spec20.split(';') : [],
          manufacturer: [item.manufacturer],
          PcbStageNo,
          supply_type,
        }
      }
      return {
        ...acc,
        manufacturer: acc.manufacturer.concat(item.manufacturer),
        PcbStageNo,
        supply_type,
      }
    }, null)
    return { data: pcbSpecwithWistronPN, spec: result }
  }

  static async exportPCBResult(userID, data, fileName, folderPath) {
    const exportFrom = 'Clean Sheet'
    const item = 'PCB'
    let exportDate = moment(new Date()).format('YYYY-MM-DD HH:mm')
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = path.join('pcb-cls', 'excel-pcb.yaml')
    const exchangeRateList = await meBomCost.getExchangeRateByCurrencyKey(data.info, 'originCurrency')
    let exchangeDate = exchangeRateList.filter(item => item.originCurrency).map(item => {
      return { from: item.originCurrency, to: item.currency, sap_exchange_rate: item.exchangeRate, date: item.exchangeDate }
    })
    if(exchangeDate.length == 0) {
      exchangeDate = []
    }
    let itemData = data.info
    itemData.map(data => {
      data.SPEC17 = data.SPEC17.join(',')
      data.SPEC18 = data.SPEC18.join(',')
      data.SPEC19 = data.SPEC19.join(',')
      data.SPEC20 = data.SPEC20.join(',')
    })
    let summary = {
      export_from: exportFrom,
      export_date: exportDate,
      item: item,
    }
    let rawData = {
      pcbSummary: summary,
      pcbItem: itemData,
      exchangeRate: exchangeDate,
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)
  }

  static async  getObsByPn(result) {
    let partNumbers = []
    for(let x of result) partNumbers.push(x.part_number)
    let pdmParts = []
    if(partNumbers.length > 0) {
      partNumbers = _.uniq(partNumbers)
      pdmParts = await pcbModel.getPdmpartsByPns(partNumbers)
    }
    if(pdmParts.length ==  0) {
      for(let x of result) x.obs = 'N'
    }
    for(let x of result) {
      let IsPnNotExistPdmparts = true
      for(let v of pdmParts) {
        if(x.part_number == v.part_number) {
          v.lifecyclestate  == 'LcsObsoleted' ? x.obs = 'Y' : x.obs = 'N'
          IsPnNotExistPdmparts = false
          break
        }
      }
      if(IsPnNotExistPdmparts) {
        x.obs = 'N'
      }
    }
    return result
  }
  /**
 * 檢查pcb清單內的物件的supplyType是否一致
 * @param {Object} pcbInfoList pcbInfo清單
 * @returns {Boolean}
 */
  static checkPcbListSupplyType(pcbInfoList){
    let isPass = true
    for(const pcbInfo of pcbInfoList){
      const sourceSupplyType = pcbInfo.supply_type
      const pcbPartNumberSupplyType = pcbInfo.content.formData.pcbTab.PcbPartNumber.supply_type
      const pcbPrcieSupplyType = pcbInfo.content.Price.supply_type
      // 舊資料處理
      if(_.isUndefined(pcbPartNumberSupplyType) && _.isUndefined(pcbPrcieSupplyType)){
        continue
      }
      // 新資料檢查
      if(sourceSupplyType !== pcbPartNumberSupplyType ||
        sourceSupplyType !== pcbPrcieSupplyType){
        isPass = false
        break
      }
    }
    return isPass
  }
  /**
   * 處理被寫入table - eedm_pcb_temp的資料
   * 此方法僅在dbsync sync完eedm時才會被呼叫
   */
  static async syncEedmPcbBomItem(){
    try {
      const startTime = new Date().toISOString()
      const eedmPcbBomItemList = await pcbModel.getEedmPcbBomItemListByPcbTemp()
      let processEedmPcbBomItemList = await Promise.all(eedmPcbBomItemList.map(this._processEedmPcbBomItem.bind(this)))
      this._formatIsCountByEdmVersionIdAndStageNo(processEedmPcbBomItemList)
      const splitEedmPcbBomItemList = _.chunk(processEedmPcbBomItemList, EEDM_PCB_TEMP_PARALLEL_NUM)
      for(let partEedmPcbBomItemList of splitEedmPcbBomItemList){
        const partEedmPcbBomItemDataList = partEedmPcbBomItemList.map((eedmPcbBomItem)=> eedmPcbBomItem.data)
        await createOrUpdatePCBs(partEedmPcbBomItemDataList)
        const client = await new tsystemDB()
        const tempIdList = partEedmPcbBomItemList.map((eedmPcbBomItem)=> eedmPcbBomItem.id)
        await pcbModel.updateEedmPcbTempUploadTime(client, tempIdList)
        client.commit()
      }
      const endTime = new Date().toISOString()
      logger.info(`[PcbService][syncEedmPcbBomItem] Success ! data length : ${processEedmPcbBomItemList.length}. startTime : ${startTime}, endTime : ${endTime}`)
    } catch (error) {
      logger.error('[PcbService][syncEedmPcbBomItem]error :', error)
      await requestUtil.requestToDbSync('/eedm/pcbSyncResult', {
        'isSuccess':false,
        'message':JSON.stringify(error, null, 2),
      })
      throw error
    }
  }
  static async _processEedmPcbBomItem(eedmPcbBomItem){
    try {
      const pcbSpecInfo = await this.getPCBSpecByWistronPN(eedmPcbBomItem.part_number, eedmPcbBomItem.edm_version_id, eedmPcbBomItem.plant)
      const formatPcbSpecInfo = this._formatPcbSpec(pcbSpecInfo)
      const pcbLayout = await this._getPcbPartListLayout()
      const pcbFormData = this._getPcbFormData(eedmPcbBomItem, pcbLayout, formatPcbSpecInfo)
      const priceData = formula.getPriceData(pcbFormData, pcbLayout)
      return {
        'id':eedmPcbBomItem.id,
        'data':this._formatPcbData(eedmPcbBomItem, pcbSpecInfo, pcbFormData, priceData),
      }
    } catch (error) {
      logger.error('[PcbService][_processEedmPcbBomItem]error :', error)
      throw error
    }
  }
  /**
   * 在已經做完預處理的的EedmPcbBomItem清單上，根據edmVersionId與StageNo，修改pcbBomItem.isCount
   * 板號相同且StageNo的pcbBomItem，只有一個pcbBomItem的isCount可以設為true
   * 優先順序如下:
   * 1.第一筆被找到為大板的pcbBomItem
   * 2.都沒有大板的情況下，把第一筆為小板的pcbBomItem設為true
   * @param {Array} processEedmPcbBomItemList
   */
  static  _formatIsCountByEdmVersionIdAndStageNo(processEedmPcbBomItemList){
    const groupProcessEedmPcbBomItemList = _.groupBy(processEedmPcbBomItemList, (processEedmPcbBomItem)=> processEedmPcbBomItem.data.edm_version_id)
    _.forEach(groupProcessEedmPcbBomItemList, (groupEdmVersionIdProcessEedmPcbBomItemList, edm_version_id)=>{
      this._checkSameStageNoPcbBomItem(groupEdmVersionIdProcessEedmPcbBomItemList)
    })
  }
  static _checkSameStageNoPcbBomItem(groupEdmVersionIdProcessEedmPcbBomItemList){
    const groupStageNoProcessEedmPcbBomItemList = _.groupBy(groupEdmVersionIdProcessEedmPcbBomItemList, (processEedmPcbBomItem)=> {
      const priceData = getPriceData(processEedmPcbBomItem.data)
      return priceData.PcbStageNo
    })
    _.forEach(groupStageNoProcessEedmPcbBomItemList, (processEedmPcbBomItemList, stageNo)=>{
      if(_.isNull(stageNo)){ // stageNo為null的情況下，全部設為true
        processEedmPcbBomItemList.forEach((processEedmPcbBomItem)=>{
          processEedmPcbBomItem.data.is_count = true
        })
      } else {
        // 存在複數筆的情況下，將第一個找到且為大板的pcbBomItem設為true
        let hasBigBoardPcb = false
        for(let processEedmPcbBomItem of processEedmPcbBomItemList){
          // 把第一個找到的大板的is_count設為true，因為相同的stageNo，只能有一個is_count為true
          if(this.isBigBoardPcb(processEedmPcbBomItem.data.type)){
            processEedmPcbBomItem.data.is_count = true
            hasBigBoardPcb = true
            break
          }
        }
        // 都沒有大板，就把第一筆設為true
        if(!hasBigBoardPcb){
          processEedmPcbBomItemList[0].data.is_count = true
        }
      }
    })
  }
  static _getPcbFormData(eedmPcbBomItem, pcbLayout, formatPcbSpecInfo){
    const pcbFormData = partlistUtil.getPcbInitFormData(pcbLayout.layout, formatPcbSpecInfo.spec)
    pcbFormData.pcbTab.PcbPartNumber.wistronpn = eedmPcbBomItem.part_number
    return pcbFormData
  }
  static _formatPcbData(eedmPcbBomItem, pcbSpecInfo, pcbFormData, priceData){
    return {
      'edm_version_id':eedmPcbBomItem.edm_version_id,
      'is_count': false, // 這裡雖然固定為false，但在create前會經過_checkSameStageNoPcbBomItem重新修改為正確的值
      'type':eedmPcbBomItem.board_type,
      'board':eedmPcbBomItem.board,
      'module':eedmPcbBomItem.module,
      'qty':eedmPcbBomItem.qty,
      'content':{
        'formData':pcbFormData,
        'Price': priceData.pcb,
        'spec':pcbSpecInfo.spec,
      },
      'supply_type':pcbFormData.pcbTab.PcbPartNumber.supply_type,
      'spec':pcbSpecInfo.spec,
    }
  }
  /**
   * @param {Number} board
   */
  static isBigBoardPcb(board){
    return board === pcbRule.boardType.big
  }
  static async _getPcbPartListLayout(){
    const layout = await partListService.getPartListLayout('pcbEdit')
    return layout
  }
  static _formatPcbSpec(pcbSpecInfo){
    let specKeyList = []
    if(!_.isNil(pcbSpecInfo.spec)){
      specKeyList = Object.keys(pcbSpecInfo.spec)
      pcbSpecInfo.spec.manufacturer = pcbSpecInfo.spec.manufacturer[0]
    } else {
      pcbSpecInfo.spec = {}
    }
    const toUpperCaseKeyReg = /^spec\d{2}$/
    for(let specKey of specKeyList){
      if(toUpperCaseKeyReg.test(specKey)){
        const newSpecKey = specKey.toUpperCase()
        pcbSpecInfo.spec[newSpecKey] = pcbSpecInfo.spec[specKey]
        delete pcbSpecInfo.spec[specKey]
      }
    }
    return pcbSpecInfo
  }
  /**
   * 用pcb代號換成pcb板子名稱 MB是大版 DB是小板
   * @param {Number} boardType 0:主板 1:小板
   * @returns {String}
   */
  static getBoardInfoByBoardType(boardType){
    return this.isBigBoardPcb(boardType) ? 'MB' : 'DB'
  }
  /**
   * 取得目前最大的小板流水號
   * @param {Array} smallPcbBomItemList 只有小板的pcbBomItem清單
   * @returns {Number}
   */
  static _getMaxSmallBoardNum(smallPcbBomItemList){
    const startSerial = -1
    if(smallPcbBomItemList.length === 0){
      return startSerial
    }
    const numberList = smallPcbBomItemList.map((smallPcbBomItem)=>{
      const serialNum = _.isNil(smallPcbBomItem.board) ? startSerial : smallPcbBomItem.board.split('-').pop() // 取得流水號
      return _.isFinite(parseInt(serialNum, 10)) ? serialNum : startSerial
    })
    return _.max(numberList)
  }
  /**
   * 利用pcbBomItemList產生只有小板的pcbBomItem清單與已被勾選(is_count)的StageNo清單
   * @param {Array} pcbBomItemList
   * @returns {Object}
   */
  static _filterSmallPcbBomItemAndExistIsCountStageNoList(pcbBomItemList){
    let smallPcbBomItemList = []
    let existIsCountStageNoList = {}
    pcbBomItemList.forEach((pcbBomItem)=>{
      // 過濾出小板的清單，只用來產生新增小板時的流水號
      if(pcbBomItem.type === pcbRule.boardType.small){
        smallPcbBomItemList.push(pcbBomItem)
      }
      // 取得有wistron pn的pcbBomItem，用於產生is count為1的stage清單
      // is_count用於紀錄該pcb是否會被計入總價格，只會有0（不選）跟1（選）
      // 擁有同一個stage的料號，只能選擇其中一個，這裡紀錄已經被選擇的stage
      if(!_.isNil(pcbBomItem.stage_no) && pcbBomItem.is_count){
        existIsCountStageNoList[pcbBomItem.stage_no] = true
      }
    })
    return {
      smallPcbBomItemList,
      existIsCountStageNoList,
    }
  }
}


async function parseExcel( file, isInitnial) {
  const downPath = path.resolve(__dirname, '../../utils/excel/')
  const reader = fs.createReadStream(file.path)	// read file strem
  const ext = file.name.split('.').pop()		// get upload file extensio
  let type = ''
  if (ext != 'xlsx' && ext != 'xls' && ext != 'xlsm') {
    // Wrong Formate
    throw new Error('C000101')
  }
  const filename = createFileName(10)
  const filePath = path.resolve(`${downPath}/${filename}.${ext}`)
  const upStream = fs.createWriteStream(filePath)
  await getFile(reader, upStream)
  const workbook = xlsx.readFile(filePath)
  const sheetNames = workbook.SheetNames
  let result = {}

  sheetNames.forEach(function(sheetName) {
    let worksheet = workbook.Sheets[sheetName]
    result[sheetName] = xlsx.utils.sheet_to_json(worksheet, { raw: true, defval: null })
  })
  // await deleteFile(filePath)
  if(!isInitnial) {
    await deleteFile(file.path)
  }
  return {
    sheetNames: sheetNames,
    excelToJson: result,
    filePath:  isInitnial ?  false : filePath,
  }
}
async function getFile(reader, upStream) {
  return new Promise(function (result) {
    let stream = reader.pipe(upStream)
    stream.on('finish', function (err) {
      result(err)
    })
  })
}
async function deleteFile(path) {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.log(`fail deleted ${path}`)
  }
}
function createFileName(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  _.times(length, () => {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  })

  return text
}

async function genPcbStageNo(wistron_pn = null) {

  const pcbform = await pcbModel.getPCBStageByPartNumber(wistron_pn)

  let stage = pcbform.stage ? pcbform.stage : 'NA'
  let tmp = pcbform.pcbno ? pcbform.pcbno : 'NA'

  return `${tmp}_${stage}`
}

async function createPCBDataProcessor(createList) {
  let result = {
    data: [],
    cost: [],
  }
  let createListGroup = _.groupBy(createList, item => item.edm_version_id)
  await Promise.all(Object.keys(createListGroup).map(async (edm_version_id, idx) => {
    // 取得已存在的pcb清單，
    const existPcbBomItemList = await pcbModel.getPCB(edm_version_id, null, null, false)
    const { smallPcbBomItemList, existIsCountStageNoList } = PcbBaseService._filterSmallPcbBomItemAndExistIsCountStageNoList(existPcbBomItemList)
    let smallPcbBoardSerial = PcbBaseService._getMaxSmallBoardNum(smallPcbBomItemList)
    const boardPartNumberSerial = { // 大板小板的流水號
      big : idx,
      small: idx,
    }
    await Promise.all(createListGroup[edm_version_id].map(async (item) => {
      let [pcbTypeAbbr, pcb, pcbAmount] = await getPCBPartNumberCmp(edm_version_id, item.type)
      // 0 是 主板 1 是小板
      const boardType = parseInt(item.type, 10)
      let part_number = null
      // 此處的item.board在syncEedmPcbBomItem時才會有
      let board = PcbBaseService.getBoardInfoByBoardType(boardType)
      // 此處的item.module在syncEedmPcbBomItem時才會有
      const module = _.isNil(item.module) ? null : item.module
      if(PcbBaseService.isBigBoardPcb(boardType)){ // 大板處理
        part_number = getPCBPartNumberForMainBoard(pcbTypeAbbr, pcb, pcbAmount + boardPartNumberSerial.big + 1)
        boardPartNumberSerial.big++
      } else {  // 小板處理
        part_number = getPCBPartNumberForSubBoard(pcbTypeAbbr, pcb, pcbAmount + boardPartNumberSerial.small + 1)
        boardPartNumberSerial.small++
        // 將board串成流水號
        smallPcbBoardSerial++
        board = _.isNil(item.board) ? `${board}-${smallPcbBoardSerial}` : item.board
      }
      
      const extendData = {}
      if (item.hasOwnProperty('content')) {
        extendData.content = JSON.stringify(item.content)
      }
      const priceData = getPriceData(item)
      let stageNo = priceData.PcbStageNo
      // 先前已存在相同stage且已被勾選，因此將此料號改為不勾選，此情形只發生於eedm sync到同一個stage時才會發生
      // 手動新增因為前端固定為false，所以沒有這個問題
      if(existIsCountStageNoList.hasOwnProperty(stageNo)){
        logger.warn(`[PcbService][createPCBDataProcessor] this stage_no(${stageNo}) is already select. this pcbBomItem.is_count will force set to false. \needm_pcb_temp id :${item.id}`)
        item.is_count = false
      }
      const calculateResult = await pcbFormulaService.calculateFormulaProcedure(item.content.Price)
      let cost = null
      if(calculateResult.hasOwnProperty('result')){
        let formula4Cost = calculateResult.result[item.content.Price.manufacturer].formula4
        // 此處因formula4Cost計算出來為NaN為字串而非數字，因此需要先parse才能判斷是否為NaN
        cost = _.isNaN(parseFloat(formula4Cost)) ? null : formula4Cost
      }
      result.data.push({
        ...item,
        part_number,
        module: module,
        board: board,
        cost: cost,
        supply_type: item.supply_type,
        stage_no: stageNo,
        ...extendData,
      })
      result.cost.push(cost)
    }))
  }))
  return result
}

async function updatePCBDataProcessor(updateList) {
  const result = {
    data: [],
    cost: [],
  }
  let editListGroup = _.groupBy(updateList, item => item.edm_version_id)
  await Promise.all(Object.keys(editListGroup).map(async (k) => {
    // 2019.12.04 因此處改為需要修改supply_type，因此將原本的方法參數從{ supply_type, ...item }變更為整個item
    await Promise.all(editListGroup[k].map(async (item) => {
      const priceData = getPriceData(item)
      let stageNo = priceData.PcbStageNo
      // if (!stageNo) {
      //   stageNo = await genPcbStageNo(k)
      // }
      const extendData = {}
      if (item.hasOwnProperty('content')) {
        extendData.content = JSON.stringify(item.content)
      }

      const cost = await pcbFormulaService.calculateFormulaProcedure(item.content.Price)

      result.data.push({
        ...item,
        cost: parseFloat(cost.result[item.content.Price.manufacturer].formula4),
        stage_no: stageNo,
        ...extendData,
      })

      result.cost.push(cost)
    }))
  }))
  return result
}
function removeManufactorKey (calCost) {
  let rmKey = Object.keys(calCost.result)[0]
  let rmAdderKey = Object.keys(calCost.adder)[0]
  let adder = calCost.adder[rmAdderKey]
  let sum_adder = adder.reduce(function (acc, current) {
    return acc + current
  }, 0)
  let result = calCost.result[rmKey]
  result = { ...result, sum_adder }
  return { ...calCost, result, adder }
}

const createOrUpdatePCBs = dbHelper.atomic(async (client, data) => {
  let createList = []
  let updateList = []
  data.forEach((item) => {
    let insertData = { ...item }
    if (item.hasOwnProperty('id')) {
      updateList.push(item)
    } else {
      insertData = { id: UUID(), ...insertData }
      createList.push(insertData)
    }
  })

  let result = []
  let cost = []
  if (createList.length) {
    const createPayload = await createPCBDataProcessor(createList)
    result = result.concat(await pcbModel.createPCBs(client, createPayload.data))
    cost = cost.concat(createPayload.cost)
  }
  if (updateList.length) {
    const updatePayload = await updatePCBDataProcessor(updateList)
    result = result.concat(await pcbModel.updatePCBs(client, updatePayload.data))
    cost = cost.concat(updatePayload.cost)
  }

  return {
    cost,
    result: pcbFormatter(result.filter((item)=>(item != null))),
  }
})

module.exports = {
  pcb : PcbBaseService,
  getPCBPartNumberCmp,
  createOrUpdatePCBs,
  copyPCBsByEdmVersionID: dbHelper.atomic(async (client, fromEdmVId, toEdmVId) => {
    logger.info(`copy pcb from EdmId: ${fromEdmVId} to another EdmId: ${toEdmVId}`)
    /* call select insert sql in the model layer*/
    try {
      let result = await pcbModel.copyPCBsByEdmVersionID(client, fromEdmVId, toEdmVId)
      logger.info(`copy length: ${result}`)
      return true
    } catch (e) {
      logger.error(`copying pcb fails: ${e} `)
      throwApiError('PCB COPY FAIL', errorCode.METHOD_WRONG)
    }
  }),
  calculatePCBs: async (data) => {
    logger.info(`pcb: start to cal ${ut.inspect(data, null, 10)}`)
    let result = []
    await Promise.all(data.map(async (item) => {
      let calcost = await pcbFormulaService.calculateFormulaProcedure(item.content.Price)
      // 追加輸出時的最高與最低價資訊
      calcost = removeManufactorKey(calcost)
      PcbBaseService._addPcbHighestAndLowestLastPriceInfoInResponse(calcost, calcost)
      if (!item.hasOwnProperty('id')) {
        item = { id: UUID(), ...item }
      }
      result.push({
        ...item,
        calcost,
      })
    }))
    let ret = pcbFormatter(result)
    logger.info(`cal result: ${ut.inspect(ret, null, 10)}`)
    return ret
  },
}
const eebomService = require('../../service/bom/eeBom')
