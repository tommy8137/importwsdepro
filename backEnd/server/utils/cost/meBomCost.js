/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')

const { formatFloat } = require('../../helpers/utils.js')
const { suggestionCostType, meLastPriceSite } = require('../../../config.js')
const log4js = require('../../utils/logger/logger')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

const bomItemModel = require('../../model/bom/bomItem')
const analysisModel = require('../../model/xray/analysis.js')

const logger = log4js.getLogger('meBomCost')
const { floatPointMap } = suggestionCostType
const meFloatPoint = new DecimalGetter('MEBom')
const COMPUTE_TYPE_CHILD = 'child'
const COMPUTE_TYPE_PARENT = 'parent'

/**
 * 取出指定的sugges cost
 * 未提供type的狀況 則自動判定已選的type
 * @param {Object} bomItem
 * @param {String} skuNum
 * @param {String} suggesType
 */
const getSuggestionCost = (bomItem, skuNum = 'sku1', suggesType = null) =>{
  if (!suggesType) {
    suggesType = bomItem.suggestion_cost_type
  }
  let suggestionCost = getCostBySuggesType(bomItem, suggesType)// */getSuggestionCostNoSku(bomItem)
  let sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], meFloatPoint.get('SKU')) : 0
  return  formatFloat(suggestionCost, meFloatPoint.get(floatPointMap[suggesType] || 'default')) * sku
}
/**
 * 取出指定的sugges cost unit price
 * 未提供type的狀況 則自動判定已選的type
 * @param {Object} bomItem
 * @param {String} suggesType ce_cost_assembly or clean_sheet_cost ...
 */
function getCostBySuggesType(bomItem, suggesType = null){
  let cost = null
  if (!suggesType) {
    suggesType = bomItem.suggestion_cost_type
  }
  if (suggesType === 'last_price') {
    let isValidPrice = _.get(bomItem, 'last_price.isValidPrice', true) // 找不到屬性表示為舊資料，不會存無效價格
    if (!isValidPrice) {
      return null
    }
  }
  if(suggestionCostType.path.hasOwnProperty(suggesType)) {
    let costPathList = suggestionCostType.path[suggesType]
    if(!Array.isArray(costPathList)) {
      costPathList = [costPathList]
    }
    for (const costPath of costPathList) {
      let splitCostPath = costPath.split('.')
      splitCostPath.forEach((key) => {
        if (!key){
          return
        }
        if (cost) {
          cost = cost[key]
        } else {
          cost = bomItem[key]
        }
      })
      if (cost) {
        break
      }
    }
  }
  
  return _.isNull(cost) ? cost : formatFloat(cost, meFloatPoint.get(floatPointMap[suggesType] || 'default'))
}
/**
   * 取得ce運檢包
   * @param {Object} bomItem
   */
function getCeShipping(bomItem){
  let ceShipping =  (_.isNil(bomItem.shipping_check_cost)) ? (_.isNil(bomItem.sourcer_shipping)) ? 0 : Number(bomItem.sourcer_shipping) :  Number(bomItem.shipping_check_cost)
  return (ceShipping === 0) ? 0 : formatFloat(ceShipping, meFloatPoint.get('ceShipping'))
}
/**
     * 取得原本的ce pl
     * @param {Object} bomItem
     */
function getCepl(bomItem){
  return _.isNull(bomItem.ce_pl) ? 0 : formatFloat(bomItem.ce_pl, meFloatPoint.get('cePL'))
}
/**
   * 20200701 變更為預設空值，不再帶入sourcer_cost_up
   * 取得getInquiryCost，預設會直接帶入sourcer_cost_up
   * sourcer_cost_up是從20191224起由sourcer import excel後更新進來的資料
   * sourcr_cost是在以前舊資料時的sourcer_cost_up
   * 兩者不會同時存在
   * @param {Object} bomItem
   */
function getInquiryCost(bomItem){
  return getCostBySuggesType(bomItem, 'inquiry_cost')
}
/**
 * 取得sourcer cost
 * @param {Object} bomItem
 */
function getSourcerCost(bomItem){
  return getCostBySuggesType(bomItem, 'sourcer_cost')
}
/*
  ####   ####  #    # #####  #    # ##### ######     ####  #    # # #      #####
 #    # #    # ##  ## #    # #    #   #   #         #    # #    # # #      #    #
 #      #    # # ## # #    # #    #   #   #####     #      ###### # #      #    #
 #      #    # #    # #####  #    #   #   #         #      #    # # #      #    #
 #    # #    # #    # #      #    #   #   #         #    # #    # # #      #    #
  ####   ####  #    # #       ####    #   ######     ####  #    # # ###### #####
*/
/**
 * 計算子階價格
 * @param {Object} param 計算參數
 * @param {String} suggesType 價格類型，沒有指定則自動查詢已選suggestion_cost_type項目
 */
function computeChild(param, suggesType = null) {
  let {
    bomItem, // {Object} 要計算的part
    skuNum,  // {String} 要計算的sku
  } = param
  // let result.sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], FLOAT_POINT) : 0
  let result = {
    sku : bomItem[skuNum] ? formatFloat(bomItem[skuNum], meFloatPoint.get('SKU')) : 0,
    suggestionCost : getSuggestionCost(bomItem, skuNum, suggesType),
    calCeCostUp : getCostBySuggesType(bomItem, suggesType),
  }
  if(bomItem.hasOwnProperty('suggestionCost')){
    result.suggestionCost = bomItem.suggestionCost
    result.calCeCostUp = bomItem.calCeCostUp
  } else {
    // let result.suggestionCost = getSuggestionCost(bomItem, skuNum)
    // let result.calCeCostUp = getCostBySuggesType(bomItem)// */getSuggestionCostNoSku(bomItem)
    const cepl = getCepl(bomItem) // CE P/L，管銷
    let shippingCheckCost =  getCeShipping(bomItem)
    // 20191003 運檢包需乘 sku number再加入
    const totalShippingCheckCost = formatFloat(shippingCheckCost * result.sku, meFloatPoint.get('ceShipping'))
    switch ((suggesType && suggestionCostType.optionsAvailable.includes(suggesType)) ? suggesType : bomItem.suggestion_cost_type) {
      // case 'sub_total_cost': // 20200312 移除舊選項
      case 'ce_cost_assembly':
        // ce cost u/p (原子階建議總價 + 組工費)
        // 運檢包不乘 sku number, 先乘後再加入運檢包
        // 子階建議價 乘以sku number
        // 20191003 運檢包需乘 sku number再加入
        result.calCeCostUp = formatFloat(result.suggestionCost + totalShippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))
        result.suggestionCost = formatFloat(result.calCeCostUp * result.sku, meFloatPoint.get('ceCostSKU'))
        if(suggesType !== null && result.calCeCostUp ===  formatFloat(totalShippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))) {// 自動最低價 排除只有運包價格的狀況
          result.calCeCostUp = null
          result.suggestionCost = null
        }
        break
      // case 'system_cost': //  = clean_sheet up // 20200312 移除舊選項
      case 'clean_sheet_cost':
      // case 'sourcer_cost': // 20200312 移除舊選項
      // case 'inquiry_cost': // = sourcer_cost // 20200312 移除舊選項
        // 20191003 運檢包需乘 sku number再加入
        // 20191218 增加管銷
        result.calCeCostUp = formatFloat(result.calCeCostUp + shippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))
        result.suggestionCost = formatFloat(result.calCeCostUp * result.sku, meFloatPoint.get('ceCostSKU'))
        if(suggesType !== null && result.calCeCostUp === formatFloat(shippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))) {// 自動最低價 排除只有 運包,組工,管銷 價格的狀況
          result.calCeCostUp = null
          result.suggestionCost = null
        }
        break
    }
  }
  return result
}
/*
                                                                                             
  ####   ####  #    # #####  #    # ##### ######    #####    ##   #####  ###### #    # #####
 #    # #    # ##  ## #    # #    #   #   #         #    #  #  #  #    # #      ##   #   #
 #      #    # # ## # #    # #    #   #   #####     #    # #    # #    # #####  # #  #   #
 #      #    # #    # #####  #    #   #   #         #####  ###### #####  #      #  # #   #
 #    # #    # #    # #      #    #   #   #         #      #    # #   #  #      #   ##   #
  ####   ####  #    # #       ####    #   ######    #      #    # #    # ###### #    #   #
                                                                                             
*/
/**
 * 計算母階價格
 * @param {Object} param 計算參數
 * @param {String} suggesType 價格類型，沒有指定則自動查詢已選suggestion_cost_type項目
 */
function computeParent(param, suggesType = null){
  let {
    bomItem,        // {Object} 要計算的part
    childItem,      // {Object} 子階part
    skuNum,         // {String} 要計算的sku
    suggestionCost, // {Number} 子階加總
    laborage,       // {Number} 組工費
  } = param
  /* let loger = function(msg){
    if (bomItem.part_name === 'child 2') {
      console.log('loger:', bomItem.part_name, msg)
    }
  } */
  let result = null
  const cepl = getCepl(bomItem) // CE P/L，管銷
  let calCeCostUp = getCostBySuggesType(bomItem, suggesType)// getSuggestionCostNoSku(bomItem)
  let sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], meFloatPoint.get('SKU')) : 0
  if(bomItem.id == childItem.parent_level){
    let shippingCheckCost =  getCeShipping(bomItem)
    switch (suggesType ? suggesType : bomItem.suggestion_cost_type) {
      // case 'sub_total_cost': // 20200312 移除舊選項
      case 'ce_cost_assembly':
        // ce cost u/p (原子階建議總價 + 組工費)
        // 運檢包不乘 sku number, 先乘後再加入運檢包
        // 子階建議價 乘以sku number
        // 20191003 運檢包需乘 sku number再加入
        // 子階建議總價的算法 = (子階建議總價 + 組工費 + 運包 + 管銷 ) * sku
        calCeCostUp = formatFloat(suggestionCost + shippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))
        suggestionCost = formatFloat(calCeCostUp * sku, meFloatPoint.get('ceCostSKU'))
        // loger(shippingCheckCost)
        // loger(cepl)
        // loger(sku)
        // loger(suggestionCost)
        if(suggesType !== null && calCeCostUp === formatFloat(shippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))) {// 自動最低價 排除只有運包價格的狀況

          suggestionCost = null
        }
        break
      // case 'system_cost': // 20200312 移除舊選項
      case 'clean_sheet_cost':
        // 20191003 運檢包需乘 sku number再加入
        // 20191218 增加管銷
        // cleanSheetCost UP
        suggestionCost = getSuggestionCost(bomItem, skuNum, suggesType)
        suggestionCost = formatFloat(suggestionCost + formatFloat(shippingCheckCost * sku, meFloatPoint.get('ceShipping'))  + formatFloat(cepl * sku, meFloatPoint.get('cePL')), meFloatPoint.get('ceCostSKU'))
        calCeCostUp = formatFloat(calCeCostUp + shippingCheckCost + cepl, meFloatPoint.get('ceCostUP')) // 算單價
        if(suggesType !== null && calCeCostUp === formatFloat(shippingCheckCost + cepl, meFloatPoint.get('ceCostUP'))) {// 自動最低價 排除只有 運包,組工,管銷 價格的狀況
          suggestionCost = null
        }
        break
      case 'inquiry_cost':
      case 'sourcer_cost':
      // 20200226 將 CeCostUp=inquiry_cost_up
        suggestionCost = getSuggestionCost(bomItem, skuNum, suggesType)
        suggestionCost = formatFloat(suggestionCost, meFloatPoint.get('ceCostSKU'))
        calCeCostUp = formatFloat(calCeCostUp, meFloatPoint.get('ceCostUP')) // 算單價
        break
      default: // 20190801 選擇為spa, last price選項，自動設定為suggestion cost且無須加入運檢包與管銷
        suggestionCost = getSuggestionCost(bomItem, skuNum, suggesType)
        break
    }
    result = {}
    // let sku1 = v.sku1 ? Number(v.sku1) : 0
    result.sku = sku
    result.laborageCost = formatFloat(laborage * sku, meFloatPoint.get('ceAssembly')) // 總組工費
    result.shippingCheckCost = formatFloat(shippingCheckCost * sku, meFloatPoint.get('ceShipping'))
    result.cepl = formatFloat(cepl * sku, meFloatPoint.get('cePL'))
    result.calCeCostUp = calCeCostUp
    // v.suggestionCost = formatFloat(formatFloat(suggestionCost, FLOAT_POINT) * sku, FLOAT_POINT)
    result.suggestionCost = formatFloat(suggestionCost, meFloatPoint.get('ceCostSKU'))
  }
  return result
}

/**
  ####   ####  #    # #####  #    # ##### ######      ##    ####   ####  ###### #    # #####  #      #   #
 #    # #    # ##  ## #    # #    #   #   #          #  #  #      #      #      ##  ## #    # #       # #
 #      #    # # ## # #    # #    #   #   #####     #    #  ####   ####  #####  # ## # #####  #        #
 #      #    # #    # #####  #    #   #   #         ######      #      # #      #    # #    # #        #
 #    # #    # #    # #      #    #   #   #         #    # #    # #    # #      #    # #    # #        #
  ####   ####  #    # #       ####    #   ######    #    #  ####   ####  ###### #    # #####  ######   #

 * 計算組工費
 * @param {Object} laboragePara 組工費參數
 * @param {Number} skuSum 組裝次數
 */
function computeAssembly (laboragePara, skuSum) {
  //  20191015 add 組工費參數由databae取得
  let spendTime = laboragePara ? laboragePara.standup_assembly_spend_time ?  formatFloat(laboragePara.standup_assembly_spend_time, meFloatPoint.get('ceAssembly')) : 0 : 0
  let perCost = laboragePara ? laboragePara.standup_assembly_cost ?  formatFloat(laboragePara.standup_assembly_cost, meFloatPoint.get('ceAssembly')) : 0 : 0
  // 20191230 CE組工= sum(skun的子階qty) - (skun的子階parts_category2為StandOff, Net的qty) -1 * 12/60 * 0.045
  let laborage = formatFloat(((skuSum - 1) * spendTime / 60) * perCost, meFloatPoint.get('ceAssembly'))
  if(laborage < 0) laborage = 0
  return laborage
}

/**
  ####   ####  #    # #####  #    # ##### ######    #       ####  #    # ######  ####  #####
 #    # #    # ##  ## #    # #    #   #   #         #      #    # #    # #      #        #
 #      #    # # ## # #    # #    #   #   #####     #      #    # #    # #####   ####    #
 #      #    # #    # #####  #    #   #   #         #      #    # # ## # #           #   #
 #    # #    # #    # #      #    #   #   #         #      #    # ##  ## #      #    #   #
  ####   ####  #    # #       ####    #   ######    ######  ####  #    # ######  ####    #

 * 計算最低價
 * @param {Object} param 傳入計算用的參數 根據type需要不同的參數
 * @param {String} computeType 計算哪種階層的item 'parent' or 'child'
 */
function computeLowest (param, computeType = COMPUTE_TYPE_CHILD) {
  let { bomItem } = param
  let result = null
  if (bomItem.suggestion_cost_type === 'auto_lowest_cost' /* || _.isNull(bomItem.suggestion_cost_type) */) {
    let tmpRes = []
    let filterRes = []
    // 如果不是最底下的子階，會有母階的計算紀錄 直接拿算好的
    if (bomItem.hasOwnProperty('costInfo') && bomItem.costInfo.hasOwnProperty('filterCostList')) {
      filterRes = bomItem.costInfo.filterCostList
    } else {
    // 一次算出全部的類型
      for (const suggesType of suggestionCostType.optionsAvailable) {
        if(suggesType === 'auto_lowest_cost'){
          continue
        }
        tmpRes.push({
          suggesType,
          result : (computeType === COMPUTE_TYPE_CHILD) ? computeChild(param, suggesType) : computeParent(param, suggesType),
        })
      }
      tmpRes.sort((a, b) => {
        if (a.result.suggestionCost !== b.result.suggestionCost) {
          return a.result.suggestionCost - b.result.suggestionCost // 照價格排序
        } else {
          return suggestionCostType.lowestCostOrder.indexOf(a.suggesType) - suggestionCostType.lowestCostOrder.indexOf(b.suggesType) // 當價格相同 照類型排序
        }
      })
      filterRes = tmpRes.filter((item)=> item.result.suggestionCost !== 0 && item.result.suggestionCost !== null) // 過濾掉0元
      if (!bomItem.hasOwnProperty('costInfo')){
        bomItem.costInfo = {
          filterCostList:[],
          allCostList:[],
        }
      }
      bomItem.costInfo.filterCostList = filterRes
      bomItem.costInfo.allCostList = tmpRes
    }
    if (filterRes.length) {
      bomItem.lowestCost = filterRes[0].suggesType // 紀錄最低價形式
      result = filterRes[0].result
    }
  }
  return result
}

/**
    
  ####   ####  #    # #####  #    # ##### ######
 #    # #    # ##  ## #    # #    #   #   #
 #      #    # # ## # #    # #    #   #   #####
 #      #    # #    # #####  #    #   #   #
 #    # #    # #    # #      #    #   #   #
  ####   ####  #    # #       ####    #   ######
                                                 
 * 計算此Item 的 價格
 * @param {Array} src bom table
 * @param {Object} findRes 子階項目
 * @param {String} skuNum 要計算的sku Ex:'sku1'
 * @param {Object} laboragePara 組工費參數
 * 1. 選擇不為子階建議價
    suggestion cost = 選擇為SPA, Sourcer, Last Pprice三選項之一 * SKU n 數量
   2. 選擇子階建議價
    suggestion cost = ((子階總價 + 組工費+ 運檢包)  * SKU  n 數量)
        組工費 = (SUM(SKU1數量) * 12 / 60) * 0.045
        子階總價  = (SUM(各SKU 1~5 子階建議價))
   3. 選擇cleansheet
     suggestion cost = (cleansheet cost  + 運檢包)  * SKU n 數量
   4. 20191015 add 組工費參數由databae取得
 */
const compute = (src, findRes, skuNum, laboragePara) => {
  // let findRes = _.find(src, (dv) => { return dv.id == itemId })
  let parentId = findRes.parent_level
  let findSameParent = _.filter(src, (v) => { return v.parent_level == parentId})
  if(findSameParent && findSameParent.length > 0) {
    let skuSum = 0
    let suggestionCostSum = 0
    // 跟這顆料 相同母階的料號們
    // 算子階
    _.forEach(findSameParent, (childItem) => {

      let computeChildRes = computeLowest({ bomItem: childItem, skuNum }, COMPUTE_TYPE_CHILD)
      // 其他類型價格 及 無法找出最低價
      if (computeChildRes === null) {
        computeChildRes = computeChild({ bomItem: childItem, skuNum })
      }
      // console.log('child--', childItem.part_name, ':', suggestionCostSum, computeChildRes);
      // 20191230 type2是Standoff or nut的不算
      let type2 = childItem.parts_ctgy_2 ? childItem.parts_ctgy_2.toUpperCase() : null
      if(type2 != 'STANDOFF' && type2 != 'NUT') {
        skuSum = formatFloat(skuSum + computeChildRes.sku, meFloatPoint.get('SKU'))
      }
      suggestionCostSum = formatFloat(suggestionCostSum + computeChildRes.suggestionCost, meFloatPoint.get('ceCostSKU'))
    })
    let laborage = computeAssembly(laboragePara, skuSum)
    let suggestionCost = formatFloat(suggestionCostSum + laborage, meFloatPoint.get('ceCostSKU'))
    // 將子階的價錢做加總
    // 算母階
    let parentItem = src.find((item) => item.id === parentId)
    let param = {
      bomItem: parentItem,
      childItem: findRes,
      skuNum,
      suggestionCost,
      laborage,
    }
    let computeParentRes = computeLowest(param, COMPUTE_TYPE_PARENT)
    // 其他類型價格 及 無法找出最低價
    if (computeParentRes === null) {
      computeParentRes = computeParent(param)
    }
    // console.log('parent--', parentItem.part_name, ':', suggestionCostSum, computeParentRes);  console.log('\n');
    if (computeParentRes) {
      parentItem.laborageCost = computeParentRes.laborageCost
      parentItem.shippingCheckCost = computeParentRes.shippingCheckCost
      parentItem.cepl = computeParentRes.cepl
      parentItem.calCeCostUp = computeParentRes.calCeCostUp
      parentItem.suggestionCost = computeParentRes.suggestionCost
    }
  }
}

/**
 * 計算bomItem
 * @param {*} src 所有料
 * @param {*} skuNum
 * @param {*} laboragePara
 */
const computeLaborageWithSku = (src, skuNum, laboragePara) =>{
  // console.log('\n');  console.log('\n');

  let group = _.groupBy(src, 'level')
  let groupOrder = Object.keys(group).sort((a, b) => b - a)
  let ignoreParentIdList = [] // 紀錄已計算的母階
  // 計算 子階並加入母階 由最下層開始向上算
  _.forEach(groupOrder, (levelKey) => {
    _.forEach(group[levelKey], (bomItem) => {
      if(bomItem.parent_level) {
        let parentId = bomItem.parent_level
        if (!ignoreParentIdList.includes(parentId)) {
          compute(src, bomItem, skuNum, laboragePara)
          ignoreParentIdList.push(parentId)
        }
      }
    })
  })
  

  _.forEach(src, (bomItem) => {
    // 計算尚未被統計的料(無子階的料)
    if(_.isNil(bomItem.suggestionCost)){
      let childRes = computeLowest({ bomItem, skuNum }, COMPUTE_TYPE_CHILD)
      if (childRes === null) {
        childRes = computeChild({ bomItem, skuNum })
      }
      bomItem.calCeCostUp = childRes.calCeCostUp
      bomItem.suggestionCost = formatFloat(childRes.suggestionCost, meFloatPoint.get('ceCostSKU'))
      bomItem.haschild = false
    }else{
      bomItem.haschild = true
    }
  })
}


const getExchangeRateByCurrencyKey = async (list, currencyKey = 'currency') => {
  let rate = []
  if (list && list.length > 0) {
    let currencyList = getCurrencyList(list, currencyKey)
    let exchangeCurrency = _.filter(currencyList, c => c != 'USD')
    if(exchangeCurrency && exchangeCurrency.length > 0){
      rate = await analysisModel.getExchangeRate(moment().format('YYYYMMDD'), exchangeCurrency)
    }

    list.map((m) => {
      m.originCurrency = m[currencyKey]
      m.origin_last_price = formatFloat(m.unitprice, meFloatPoint.get('exchangeRate'))
      let exchangeDate = moment().format('YYYY-MM-DD')
      if (m[currencyKey] != 'USD') {
        let exchangeRate
        let fcurr = rate.find(r => r.fcurr == m[currencyKey])
        if (!fcurr) {
          exchangeRate = 0
        } else {
          exchangeDate = fcurr.date
          exchangeRate = fcurr.exchangeRate
        }
        m.exchangeDate = exchangeDate
        m.datab = moment(m.datab).format('YYYY-MM-DD')
        m.datbi = moment(m.datbi).format('YYYY-MM-DD')
        m.currency = 'USD'
        m.exchangeRate = formatFloat(exchangeRate, meFloatPoint.get('exchangeRate'))
        m.unitPrice = formatFloat(formatFloat(exchangeRate, meFloatPoint.get('exchangeRate')) * formatFloat(m.unitprice, meFloatPoint.get('exchangeRate')), meFloatPoint.get('exchangeRate'))
      } else {
        m.unitPrice = formatFloat(m.unitprice, meFloatPoint.get('exchangeRate'))
        m.exchangeRate = formatFloat(1, meFloatPoint.get('exchangeRate'))
        m.exchangeDate = exchangeDate
      }
    })
  }
  return list
}

const getCurrencyList = (list, currencyKey) => {
  return _.chain(list).map(currencyKey).uniq().value()
}
/**
 * 根據規則過濾並選出lastPrice
 * @param {Array} lastPriceList 要過濾的 last price 列表
 * @param {String} site 專案的site
 * @returns {Object} 各part number 的結果
 * {
 *   'ABC.DEF.123':{
 *     ...
 *   },
 *   'ABC.EEF.143':{
 *     ...
 *   },
 * }
 */
const getMeLastPrice = (lastPriceList, site) => {
  if(!site){
    logger.error('[meBomCost.getMeLastPrice] param site should not be:', site)
  }
  let result = {}
  let groupRes = _.groupBy(lastPriceList, 'part_number')
  let targetSite = []
  if (meLastPriceSite.hasOwnProperty(site)) {
    targetSite = meLastPriceSite[site]
  } else {
    targetSite = [`P${site}`]
  }
  for(let partNumber in groupRes){
    if (!groupRes.hasOwnProperty(partNumber)) {
      continue
    }
    let vaildPriceList = []
    let notVaildPriceList = []
    let notVaildSiteList = []
    groupRes[partNumber].forEach((item) => {
      let isDateVaild = item.datbi === '2099-12-31' // 日期為有效的判定
      let isSiteVaild = targetSite.includes(item.purchase_org) // 符合專案的site
      if(isDateVaild && isSiteVaild){
        vaildPriceList.push(item)
      } else if(!isDateVaild && isSiteVaild) {
        notVaildPriceList.push(item)
      } else if(!isSiteVaild) {
        notVaildSiteList.push(item)
      }
    })
    if(vaildPriceList.length > 0) { // 有效的最低價
      result[partNumber.trim().toUpperCase()] = {
        'isValidPrice':true,
        'priceInfo' : _.minBy(vaildPriceList, (item) => item.unitPrice), // 取最低價
        'failReason' : '',
      }
    } else if(notVaildPriceList.length > 0) { // 無效的最低價
      result[partNumber.trim().toUpperCase()] = {
        'isValidPrice':false,
        // 'priceInfo' : _.minBy(notVaildPriceList, (item) => item.unitPrice), // 取最低價 // 2020-08-26 無效價格改顯示空白
        'failReason' : 'Cost expire.',
      }
    } else if (notVaildSiteList.length  > 0) {
      result[partNumber.trim().toUpperCase()] = {
        'failReason' : 'No cost in site.',
      }
    } else {
      result[partNumber.trim().toUpperCase()] = {
        'failReason' : 'No cost.',
      }
    }
  }
  return result
}
const getMaterialLastPrice =  async(src, site) =>{
  let partNumber = []
  let price = []
  let minLastPriceList = null
  _.map(src, (v) => {
    let requestPartNumber =  v.part_number ? v.part_number.trim().toUpperCase() : null
    if (requestPartNumber) {
      if(partNumber.indexOf(requestPartNumber) <= -1) partNumber.push(requestPartNumber)
    }
  })
  if (partNumber && partNumber.length > 0) {
    price = await bomItemModel.getPartNumberPrice(partNumber)
    let priceExchanged = await getExchangeRateByCurrencyKey(price, 'currency')
    minLastPriceList = getMeLastPrice(priceExchanged, site)
    /* let groupRes = _.groupBy(priceExchanged, 'part_number')
    _.forEach(groupRes, (v, key) => {
      minPrice.push(_.maxBy(groupRes[key], function (o) { return o.knumh }))
    })*/
  }
  _.forEach(src, (v) => {
    let obj = {
      'unitPrice' : null,
      'validDate' : null,
      'purchaseOrg': null,
      'currency' : null,
      'vendor' : null,
      'vendor_pn' : null,
      'oriUnitPrice' : null,
      'oriCurrency' : null,
      'isValidPrice': null,
    }
    if(minLastPriceList){
      let requestPartNumber =  v.part_number ? v.part_number.trim().toUpperCase() : null
      if (requestPartNumber) {
        if(minLastPriceList.hasOwnProperty(requestPartNumber)){
          const minLastPrice = minLastPriceList[requestPartNumber]
          const lastPriceInfo = minLastPrice.hasOwnProperty('priceInfo') ? minLastPrice.priceInfo : {}
          obj.unitPrice = _.isNil(lastPriceInfo.unitPrice) ? null : parseFloat(lastPriceInfo.unitPrice).toString()
          obj.validDate = _.has(lastPriceInfo, 'datab') ? _.get(lastPriceInfo, 'datab') : null
          obj.currency = lastPriceInfo.currency ? lastPriceInfo.currency : null
          obj.vendor = lastPriceInfo.vendor ? lastPriceInfo.vendor : null // 廠商
          obj.vendor_pn = lastPriceInfo.vendor_pn ? lastPriceInfo.vendor_pn : null  // 廠商 part number
          obj.oriUnitPrice = lastPriceInfo.origin_last_price ?  parseFloat(lastPriceInfo.origin_last_price).toString() : null // 原始幣別價格
          obj.oriCurrency = lastPriceInfo.originCurrency ?  lastPriceInfo.originCurrency : null // 原始幣別
          obj.purchaseOrg = lastPriceInfo.purchase_org ? lastPriceInfo.purchase_org : null // 採購廠區
          // v.last_price = JSON.stringify(obj)
          obj.isValidPrice = minLastPrice.isValidPrice ? minLastPrice.isValidPrice : null // 價格是否有效
          obj.failReason = minLastPrice.failReason ? minLastPrice.failReason : ''
          v.originCurrency = lastPriceInfo.originCurrency ?  lastPriceInfo.originCurrency : null
          v.origin_last_price = lastPriceInfo.origin_last_price ?  lastPriceInfo.origin_last_price : null
          v.exchangeRate = lastPriceInfo.exchangeRate
        } else {
          // obj.unitPrice = '-' // 20200826 取消 last price 找不到時顯示 '-' 邏輯
          obj.failReason = 'No cost.'
        }
      }
    }
    v.last_price = JSON.stringify(obj)
    // console.log('lastPriceRes:', obj)
  })
}


module.exports = {
  /**
   * @param src bom 所有的bom item
   * @param lastLeafs 沒有子階的 bom item(parent_level is null, level =2 or DC/65)
   * @param skuNum
   * @param laboragePara
   */
  computeLaborage: (src, skuNum, laboragePara) => {
    skuNum = skuNum ? skuNum : 'sku1'
    try{
      computeLaborageWithSku(src, skuNum, laboragePara)
    }catch(error){
      logger.error(error)
    }
  },
  computeAllSkuSumCost:(src, laboragePara) =>{
    let skuArr = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']
    let res = [0, 0, 0, 0, 0, 0]
    _.forEach(skuArr, (v, idx) => {
      let tmp = _.cloneDeep(src)
      computeLaborageWithSku(tmp, v, laboragePara)
      let findAllRootParent = _.filter(tmp, (o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      _.forEach(findAllRootParent, (dv) =>{
        res[idx] =  formatFloat( formatFloat(res[idx], meFloatPoint.get('totalCostSKU')) + dv.suggestionCost, meFloatPoint.get('totalCostSKU'))
      })
    })
    return res
  },
  getMaterialLastPriceByBomId: async (src, bomId) => {
    let site = ''
    if (bomId) {
      let queryRes = await bomItemModel.bomPNameAndDesc(bomId)
      if (queryRes.length && queryRes[0].site) {
        site = queryRes[0].site
      }
    }
    await getMaterialLastPrice(src, site)
  },
  getMaterialLastPrice,
  getItemSuggestionCost: (item) => {
    let suggestionCost = 0
    let suggestionType = item.suggestion_cost_type ? item.suggestion_cost_type.toLowerCase().trim() : ''
    if (suggestionType == 'sourcer_cost') {
      suggestionCost = item.sourcer_cost ? item.sourcer_cost : 0
    } else if (suggestionType == 'system_cost') {
      suggestionCost = item.system_cost ? item.system_cost : 0
    } else if (suggestionType == 'spa_cost') {
      suggestionCost = item.spa_cost ? item.spa_cost.cost ? item.spa_cost.cost : 0 : 0
    } else if (suggestionType == 'current_price') {
      suggestionCost = item.current_price ? item.current_price.price ? item.current_price.price : 0 : 0
    } else {
      suggestionCost = 0
    }
    return suggestionCost
  },

  // 20190926 add filter
  meBomFilter : (src, filterColumn, filters = []) =>{
    if(!filters || !filterColumn){
      return src
    }
    let res = []
    if(filters.length <= 0){
      return res
    }
    if(src && src.length > 0){
      _.forEach(filters, (v) =>{
        let filterRes = null
        // 20190927 TBD type include in odmoem is null
        if(v.toUpperCase() == 'TBD'){
          filterRes = _.filter(src, (dv) => { return dv[filterColumn] == v || dv[filterColumn] == null})
        }else{
          filterRes = _.filter(src, (dv) => { return dv[filterColumn] == v })
        }
        if(filterRes && filterRes.length > 0){
          _.forEach(filterRes, (rv) => {
            res.push(rv)
          })
        }
      })
    }
    return res
  },

  setSkuSumObject:(src) =>{
    let sku_cost = null
    if(src != null && src.length > 0){
      sku_cost = [{ sku0: src[0] }, { sku1: src[1] }, { sku2: src[2] }, { sku3: src[3] },
        { sku4: src[4] }, { sku5: src[5] }]
    }else{
      sku_cost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    }
    return sku_cost
  },
  getSingleSkuSum:(src, skuNum) =>{
    let skuArr = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']
    let res = [0, 0, 0, 0, 0, 0]
    let finIndex = _.findIndex(skuArr, (v) => {return v == skuNum})
    if(finIndex > -1){
      let findAllRootParent = _.filter(src, (o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      _.forEach(findAllRootParent, (v) =>{
        let suggestionCost = v.suggestionCost ? v.suggestionCost : v.suggestion_cost ? v.suggestion_cost : 0

        res[finIndex] =  formatFloat(formatFloat(res[finIndex], meFloatPoint.get('totalCostSKU')) +  formatFloat(suggestionCost, meFloatPoint.get('totalCostSKU')), meFloatPoint.get('totalCostSKU'))
      })
    }

    return res
  },
  getLaborageParamater:async(datetime = null) =>{
    datetime = datetime ? moment(datetime).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')

    // 取得計算組工費參數
    let res = await bomItemModel.getLaborageParamater(datetime)
    let laborageParaObj = { standup_assembly_spend_time: 0, standup_assembly_cost: 0 }
    if(res){
      let findSpendTime = _.find(res, (v) => {return v.label == 'standup_assembly_spend_time'})
      let findSpendCost = _.find(res, (v) => {return v.label == 'standup_assembly_cost'})
      if(findSpendTime) laborageParaObj.standup_assembly_spend_time = findSpendTime.value
      if(findSpendCost) laborageParaObj.standup_assembly_cost = findSpendCost.value
    }
    return laborageParaObj
  },
  getExchangeRateByCurrencyKey,
  getInquiryCost,
  getCepl,
  getCeShipping,
  getSourcerCost,
}
