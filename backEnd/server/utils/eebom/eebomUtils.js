
const _ = require('lodash')
const { formatFloat } = require('../../helpers/utils.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const fixMath = require('../../helpers/math/math.js')
const DEFAULT_VALUE = 0
const ODM_SUPPLYT_TYPE = 'AV,W,S,Empty'
const ODM_PARTS_FILTER = ODM_SUPPLYT_TYPE.toUpperCase().split(',')
const eeFloatPoint = new DecimalGetter('EEBom')


/**
 *
 * P/N 開頭為「78」，「078」=> MLCC
 * P/N 開頭為「63」，「063」，「64」，「064」=> RES
 */
const _typeByPN = (part_number) => {
  if (part_number && part_number.match(/\./)) {
    let first_number = part_number.split('.')[0]
    if(first_number) {
      if (first_number.match(/^0*78$/)) {
        return 'MLCC'
      } else if (first_number.match(/^0*63$/)) {
        return 'RES'
      } else if (first_number.match(/^0*64$/)) {
        return 'RES'
      }
    }
  }

  return null
}

/**
 *
 * Type I 為「MLCC」且 Type II 為「SMD」=> MLCC
 * Type I 為「RES」且 Type II 為「RES-SMD」=> RES
 */
const _typeByTypeIAndTypeII = (type1, type2) => {
  if (type1 && type2) {
    if (type1.toUpperCase() == 'MLCC' && type2.toUpperCase() == 'SMD') {
      return 'MLCC'
    } else if (type1.toUpperCase() == 'RES' && type2.toUpperCase() == 'RES-SMD') {
      return 'RES'
    }
  }

  return null
}

class EebomUtils {
  static eeBomFilter(src, filterColumn, filters = []){
    if (!filters.length || !filterColumn) { // 全選跟全不選相同，因此此處直接return
      return src
    }
    let res = []
    if (src && src.length > DEFAULT_VALUE) {
      _.forEach(filters, (filter) => {
        let filterRes = _.filter(src, (info) => {
          if(filter === 'EMPTY'){
            return _.isNull(info[filterColumn]) ? true : info[filterColumn].toUpperCase() === filter
          }else{
            return info[filterColumn] === filter
          }
        })
        if (filterRes && filterRes.length > DEFAULT_VALUE) {
          _.forEach(filterRes, (info) => {
            res.push(info)
          })
        }
      })
    }
    return res
  }
  /**
   * 計算單一筆bom的SubTotalLastPrice
   * @param {Object} bomInfo 一筆bom
   * @returns {Number}
   */
  static calculationSubTotalLastPrice(eeBomInfo){

    eeBomInfo.sub_total_last_price = eeBomInfo.current_price ? formatFloat(formatFloat(eeBomInfo.current_price, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default')) : null
    eeBomInfo.sub_total_lowest_price = eeBomInfo.lowest_price ? formatFloat(formatFloat(eeBomInfo.lowest_price, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default')) : null
    eeBomInfo.sub_total_2nd_highest_price = eeBomInfo.second_highest_price ? formatFloat(formatFloat(eeBomInfo.second_highest_price, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default')) : null
    // return eeBomInfo.current_price ?
    //   formatFloat(formatFloat(eeBomInfo.current_price, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default')) :
    //   formatFloat(formatFloat(eeBomInfo.sourcer_cost, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default'))
  }

  /**
   * 計算單一筆eebom的totalSuggestionCost、totalLastPrice與totalPartsCount(qty)
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Object}
{
      totalSuggestionCost: 0,
      totalLastPrice: 0,
      partsCount: 0
}
   */
  static calculationBomPrice(eeBomInfo){
    let result = {
      totalSuggestionCost: DEFAULT_VALUE,
      totalLastPrice: DEFAULT_VALUE,
      totalLowestPrice: DEFAULT_VALUE,
      total2ndHighestPrice: DEFAULT_VALUE,
      totalPartsCount: parseFloat(eeBomInfo.qty),
    }
    if(!_.isNil(eeBomInfo.sub_total_suggestion_cost)) {
      result.totalSuggestionCost = eeBomInfo.sub_total_suggestion_cost// formatFloat(formatFloat(eeBomInfo.suggestion_cost, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default'))
    }
    this.calculationSubTotalLastPrice(eeBomInfo)

    result.totalLastPrice = eeBomInfo.sub_total_last_price
    result.totalLowestPrice = eeBomInfo.sub_total_lowest_price
    result.total2ndHighestPrice = eeBomInfo.sub_total_2nd_highest_price

    return result
  }
  /**
   * 統計pcb清單內的suggestionCost、sub_total_last_price與qty
   * 其中資料來源已預先將suggestionCost與sub_total_last_price和qty相乘過
   * 因此此方法不再將其與qty相乘
   * @param {Array} pcbInfoList pcb清單，資料來源:pcbService.pcbExportFormat
   * @returns {Object}
{
      totalSuggestionCost: 0,
      totalLastPrice: 0,
      partsCount: 0
}
   */
  static calculationTotalPcbPrice(pcbInfoList){
    let result = {
      totalSuggestionCost: DEFAULT_VALUE,
      totalLastPrice: DEFAULT_VALUE,
      totalLowestPrice: DEFAULT_VALUE,
      totalPartsCount: DEFAULT_VALUE,
    }
    for (let pcbInfo of pcbInfoList) {
      result.totalSuggestionCost += pcbInfo.suggestionCost
      result.totalLastPrice += pcbInfo.sub_total_last_price
      result.totalLowestPrice += pcbInfo.sub_total_lowest_price
      result.totalPartsCount += pcbInfo.qty
    }
    return result
  }
  /**
 *
 * 統計Eebom清單內的totalSuggestionCost、totalLastPrice與totalPartsCount(qty)
 * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
 * @returns {Object}
{
      totalSuggestionCost: 0,
      totalLastPrice: 0,
      totalPartsCount: 0,
}
 */
  static calculationTotalBomPrice(eeBomInfoList){
    let result = {
      totalSuggestionCost: DEFAULT_VALUE,
      totalLastPrice: DEFAULT_VALUE,
      totalLowestPrice: DEFAULT_VALUE,
      total2ndHighestPrice: DEFAULT_VALUE,
      totalPartsCount: DEFAULT_VALUE,
    }
    for(let eeBomInfo of eeBomInfoList){
      let calResult = this.calculationBomPrice(eeBomInfo)

      result.totalSuggestionCost += calResult.totalSuggestionCost
      result.totalLastPrice += calResult.totalLastPrice
      result.totalLowestPrice += calResult.totalLowestPrice
      result.total2ndHighestPrice += calResult.total2ndHighestPrice
      result.totalPartsCount += calResult.totalPartsCount
    }
    return result
  }
  /**
   * EEBom清單內 指定 type1 最高/最低/第二高價做統計
   * @param {*} eeBomInfoList
   * @param {*} options for last price, 指定的type1用最高價/第二高價, 其餘則使用最低價統計 {
   *  highest: ['RES'],
   *  second_highest: []
   * }
   * @param {*} suggOptions for Suggestion Price, 指定的type1用最高價/第二高價/最低價, 其餘則使用Suggestion Price統計 {
   *  highest: ['RES'],
   *  second_highest: [],
   *  lowest: [],
   * }
   */
  static calculationTotalPriceByOptions(eeBomInfoList, options = { highest: [], second_highest: [] }, suggOptions = { highest: [], second_highest: [], lowest: [] }){
    let result = {
      totalPrice: DEFAULT_VALUE,
      totalSuggestionCost: DEFAULT_VALUE,
    }

    for(let eeBomInfo of eeBomInfoList){
      let calResult = this.calculationBomPrice(eeBomInfo)
      let pn_type = this.determineType(eeBomInfo.part_number, eeBomInfo.type1, eeBomInfo.type2)

      // last price
      if (options.highest.length > 0 && eeBomInfo.type1 && options.highest.includes(pn_type)){
        result.totalPrice += calResult.totalLastPrice
      } else if (options.second_highest.length > 0 && eeBomInfo.type1 && options.second_highest.includes(pn_type)) {
        result.totalPrice += calResult.total2ndHighestPrice
      } else {
        result.totalPrice += calResult.totalLowestPrice
      }

      // suggestion cost
      if (suggOptions.highest.length > 0 && eeBomInfo.type1 && suggOptions.highest.includes(pn_type)){
        result.totalSuggestionCost += calResult.totalLastPrice
      } else if (suggOptions.second_highest.length > 0 && eeBomInfo.type1 && suggOptions.second_highest.includes(pn_type)) {
        result.totalSuggestionCost += calResult.total2ndHighestPrice
      } else if (suggOptions.lowest.length > 0 && eeBomInfo.type1 && suggOptions.lowest.includes(pn_type)){
        result.totalSuggestionCost += calResult.totalLowestPrice
      } else {
        result.totalSuggestionCost += calResult.totalSuggestionCost
      }
    }
    return result
  }

  /**
   * 將eeBomInfoList內的資料依照參數進行分組統計，僅統計total_last、suggestion、total_parts_count
   * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
   * @param {String} groupColumn 要分組的propertyName
   * @returns {Array}
 groupColumn = module
 EX:
[{
      module: 'Connector'
      totalSuggestionCost: 0,
      totalLastPrice: 0,
      totalPartsCount: 0,
}...]
   */
  static calculationTotalBomPriceWithGroup(eeBomInfoList, groupColumn){
    let result =  _.chain(eeBomInfoList)
      .groupBy((eeBomInfo)=>  eeBomInfo[groupColumn])
      .map((groupEebomInfoList, groupName) =>{
        let calResult = this.calculationTotalBomPrice(groupEebomInfoList)
        calResult[groupColumn] = groupName
        return calResult
      }).value()
    return result
  }
  /**
   * 個別統計eeBomInfoList與pcbInfoList後，將其totalSuggestionCost、totalLastPrice、totalPartsCount加總
   * 並輸出個別統計與加總後的結果
   * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
   * @param {Array} pcbInfoList pcb清單，資料來源:pcbService.pcbExportFormat
   * @returns {Object}
{
      calBomPriceInfo:{
        totalSuggestionCost: 0,
        totalLastPrice: 0,
        totalLowestPrice: 0,
        total2ndHighestLastPrice: 0,
        totalPartsCount: 0,
      },
      calPcbPriceInfo: {
        totalSuggestionCost: 0,
        totalLastPrice: 0,
        totalLowestPrice: 0,
        totalPartsCount: 0,
      },
      totalSuggestionCost: 221.19594,
      totalLastPrice:313.21591,
      totalPartsCount: 913,
    }
   */
  static calculationAllPrice(eeBomInfoList, pcbInfoList){
    let calBomPriceInfo = this.calculationTotalBomPrice(eeBomInfoList)
    let calPcbPriceInfo = this.calculationTotalPcbPrice(pcbInfoList)
    return {
      calBomPriceInfo:calBomPriceInfo,
      calPcbPriceInfo: calPcbPriceInfo,
      totalSuggestionCost: fixMath.fixedPoint(calBomPriceInfo.totalSuggestionCost + calPcbPriceInfo.totalSuggestionCost, eeFloatPoint.get('default')),
      totalLastPrice:fixMath.fixedPoint(calBomPriceInfo.totalLastPrice + calPcbPriceInfo.totalLastPrice, eeFloatPoint.get('default')),
      totalLowestPrice:fixMath.fixedPoint(calBomPriceInfo.totalLowestPrice + calPcbPriceInfo.totalLowestPrice, eeFloatPoint.get('default')),
      total2ndHighestPrice:fixMath.fixedPoint(calBomPriceInfo.total2ndHighestPrice + calPcbPriceInfo.totalLowestPrice, eeFloatPoint.get('default')),

      totalPartsCount: calBomPriceInfo.totalPartsCount + calPcbPriceInfo.totalPartsCount,
    }
  }
  static calculationSummaryPrice(bomlist, pcbInfoList){

    // (不含PCB) 取 MLCC 第二高價 + RES 最高價 + Others (除MLCC/RES外其他TypeI項目) 最低價
    let calPriceWithMlcc = this.calculationTotalPriceByOptions(bomlist, {
      highest: ['RES'],
      second_highest: ['MLCC'],
    })

    // (不含PCB, MLCC) 取 RES 最高價 + Others (除MLCC/RES外其他TypeI項目) 最低價
    let withoutMlccList = _.filter(bomlist, (bom) => bom.type1 == null || (this.determineType(bom.part_number, bom.type1, bom.type2) != 'MLCC'))
    let calPriceWithoutMlcc = this.calculationTotalPriceByOptions(withoutMlccList, {
      highest: ['RES'],
      second_highest: [],
    }, {
      highest: ['RES'],
      second_highest: [],
      lowest: [],
    })

    let mlccList = _.filter(bomlist, (bom) => this.determineType(bom.part_number, bom.type1, bom.type2) == 'MLCC')
    let calMlccPriceInfo = this.calculationTotalBomPrice(mlccList)
    let calPcbPriceInfo = this.calculationTotalPcbPrice(pcbInfoList)

    return {
      total_with_mlcc: fixMath.fixedPoint(calPriceWithMlcc.totalPrice, eeFloatPoint.get('default')),
      total_without_mlcc: fixMath.fixedPoint(calPriceWithoutMlcc.totalPrice, eeFloatPoint.get('default')),
      total_suggestion_cost: fixMath.fixedPoint(calPriceWithoutMlcc.totalSuggestionCost, eeFloatPoint.get('default')),
      total_mlcc_lowest: fixMath.fixedPoint(calMlccPriceInfo.totalLowestPrice, eeFloatPoint.get('default')),
      total_mlcc_highest: fixMath.fixedPoint(calMlccPriceInfo.totalLastPrice, eeFloatPoint.get('default')),
      total_mlcc_2nd_highest: fixMath.fixedPoint(calMlccPriceInfo.total2ndHighestPrice, eeFloatPoint.get('default')),
      total_pcb_cost: fixMath.fixedPoint(calPcbPriceInfo.totalLowestPrice, eeFloatPoint.get('default')),
    }
  }
  /**
   * 判斷此筆Bom是否屬於BuPriceList的Power Module
   * 此處sheet(頁碼)需符合規範才能被計入Power
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isBuPowerModule(eeBomInfo){
    const sheet = parseInt(eeBomInfo.sheet) // 過濾非數字以外的各種情況 EX: ''、undefined.. etc
    if(Number.isNaN(sheet)){
      return false
    } else if((eeBomInfo.sheet >= 44 && eeBomInfo.sheet <= 54) || (eeBomInfo.sheet >= 85 && eeBomInfo.sheet <= 86)){
      return true
    }
    return false
  }
  /**
   * 判斷此筆Bom是否屬於BuPriceList的Connector Module
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isBuConnectorModule(eeBomInfo){
    return this.isTargetModule('CONNECTOR', eeBomInfo)
  }
  /**
   * 判斷此筆Bom是否屬於BuPriceList的Other Module
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isOtherModule(eeBomInfo){
    return this.isBuConnectorModule(eeBomInfo) ? false : !this.isBuPowerModule(eeBomInfo)
  }
  /**
   * 判斷此筆Bom是否屬於BuPriceList的PCB Module
   * 只有在取得詳細資訊時才會使用
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isBuPCBModule(eeBomInfo){
    return this.isTargetModule('PCB', eeBomInfo)
  }
  /**
   * 根據category與moduleId取得指定的eeBomInfo
   * @param {String} category ex:bu
   * @param {String} moduleId ex: Connector
   * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
   */
  static getModuleList(category, moduleId, eeBomInfoList){
    let result = null
    const upperCaseCategory = category.toLocaleUpperCase()
    switch (upperCaseCategory) {
      case 'BU':
        result = this.getBuMoudleListByModuleId(moduleId, eeBomInfoList)
        break
      case 'MODULE':
        result = this.getMoudleListByModuleId(moduleId, eeBomInfoList)
        break
      default:
        break
    }
    return result
  }
  /**
   * 取得View By Bu的module清單
   * @param {String} moduleId ex: Connector
   * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
   */
  static getBuMoudleListByModuleId(moduleId, eeBomInfoList){
    const upperCaseModuleId = moduleId.toUpperCase()
    let filterFn = null
    if(this.isBuConnectorModule({ type1 : upperCaseModuleId })){
      filterFn = this.isBuConnectorModule.bind(this)
    } else {
      switch (upperCaseModuleId) {
        case 'POWER':
          filterFn = this.isBuPowerModule
          break
        case 'OTHERS':
          filterFn = this.isOtherModule.bind(this)
          break
        case 'RTC BTY': // 尚未接入資料，因此尚無方法
          break
        case 'PCB':
          filterFn = this.isBuPCBModule.bind(this)
          break
        default:
          break
      }
    }
    return _.isNull(filterFn) ? [] : _.filter(eeBomInfoList, filterFn)
  }
  /**
   * 取得View By Module的module清單
   * @param {String} moduleId ex: Power
   * @param {Array} eeBomInfoList eeBomInfoList，資料來源:eeBomService.genSuggestionInfoFromEEDetail
   * @returns {Array} 指定的eeBomInfoList
   */
  static getMoudleListByModuleId(moduleId, eeBomInfoList){
    const upperCaseModuleId = moduleId.toUpperCase()
    if(upperCaseModuleId === 'POWER'){
      return _.filter(eeBomInfoList, this.isPowerModule)
    }
    const result = _.filter(eeBomInfoList, (eeBomInfo) =>{
      return eeBomInfo.module.toUpperCase() === upperCaseModuleId
    })
    return result
  }
  /**
   * 判斷此筆Bom是否屬於Module的Power分類資訊
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isPowerModule(eeBomInfo){
    return eeBomInfo.module.toUpperCase() === 'POWER'
  }
  /**
   * 判斷此筆Bom是否屬於指定的分類
   * @param {String} upperCaseModuleId 指定的分類
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isTargetModule(upperCaseModuleId, eeBomInfo){
    return eeBomInfo.type1.toUpperCase() === upperCaseModuleId
  }
  /**
   * 判斷此筆Bom是否屬於Odm Parts
   * @param {Object} eeBomInfo 一筆bom
   * @returns {Boolean}
   */
  static isOdmParts(eeBomInfo){
    return !this.isTargetModule('PCB', eeBomInfo)
  }
  /**
   * 取得odm parts清單
   * @param {Array} eeBomInfoList 資料來源:eeBomService.genSuggestionInfoFromEEDetail
   * @returns {Array}
   */
  static getOdmPartsList(eeBomInfoList){
    let odmPartsList = this.eeBomFilter(eeBomInfoList, 'supply_type', ODM_PARTS_FILTER)
    return _.filter(odmPartsList, this.isOdmParts.bind(this))
  }
  /**
   * 取得odm parts supplyType
   * @returns {Array}
   */
  static getOdmPartsSupplyType(){
    return ODM_SUPPLYT_TYPE
  }
  /**
   * 取得Pcb odm parts清單
   */
  static getPcbOdmPartsList(pcbList) {
    return this.eeBomFilter(pcbList, 'supply_type', ODM_PARTS_FILTER)
  }

/**
 * 判斷料號 屬於 'MLCC', 'RES', or 'OTHERS'
 * @param {*} partnumber 使用料號開頭判斷type
 * @param {*} type1name 使用type1name與type2name判斷type
 * @param {*} type2name 使用type1name與type2name判斷type
 */
  static determineType(partnumber, type1name, type2name) {
    let type = 'OTHERS'
    let typeByPN = _typeByPN(partnumber)
    if (typeByPN) return typeByPN

    let typeByTypeI = _typeByTypeIAndTypeII(type1name, type2name)
    if (typeByTypeI) return typeByTypeI

    return type
  }
}

module.exports = EebomUtils
