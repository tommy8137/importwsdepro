/* eslint-disable no-magic-numbers */
const { formatFloat } = require('../../helpers/utils.js')
const _ = require('lodash')
const { suggestionCosType, meLastPriceSite } = require('../../../config.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('meBomCost')
const bomItemModel = require('../../model/bom/bomItem')
const analysisModel = require('../../model/xray/analysis.js')
const moment = require('moment')
const FLOAT_POINT = 4
/**
   * 取得ce運檢包
   * @param {Object} bomItem
   */
function getCeShipping(bomItem){
  let ceShipping =  (_.isNil(bomItem.shipping_check_cost)) ? (_.isNil(bomItem.sourcer_shipping)) ? 0 : Number(bomItem.sourcer_shipping) :  Number(bomItem.shipping_check_cost)
  return (ceShipping === 0) ? 0 : formatFloat(ceShipping, FLOAT_POINT)
}
/**
     * 取得原本的ce pl
     * @param {Object} bomItem
     */
function getCepl(bomItem){
  return _.isNull(bomItem.ce_pl) ? 0 : formatFloat(bomItem.ce_pl, FLOAT_POINT)
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
  return _.isNull(bomItem.inquiry_cost_up) ? 0 : formatFloat(bomItem.inquiry_cost_up, FLOAT_POINT)
}
/**
 * 取得sourcer cost
 * @param {Object} bomItem
 */
function getSourcerCost(bomItem){
  return _.isNull(bomItem.sourcer_cost_up) ? _.isNull(bomItem.source_cost) ? 0 : formatFloat(bomItem.source_cost, FLOAT_POINT) : formatFloat(bomItem.sourcer_cost_up, FLOAT_POINT)
}
/**
 * 計算此Item 的 價格
 * @param {*} src
 * @param {*} itemId
 * @param {*} skuNum
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
const compute = (src, itemId, skuNum, laboragePara) => {
  let findRes = _.find(src, (dv) => { return dv.id == itemId })
  let findSameParent = _.filter(src, (v) => { return v.parent_level == findRes.parent_level})
  if(findSameParent && findSameParent.length > 0) {
    let skuSum = 0
    let systemCostSum = 0
    let suggestionCostSum = 0
    let inquiryCostSum = 0
    let sourcerCostSum = 0
    // 跟這顆料 相同母階的料號們
    // 算子階
    _.forEach(findSameParent, (dv) => {
      // sprint 25 skuNum 改用 前端畫面選取Sku, 價錢 以該Sku的 Qty 做計算
      // let sku1 = _.isNil(dv.sku1) ? 0 : formatFloat(dv.sku1, FLOAT_POINT)
      let system_cost = !_.isNil(dv.system_cost) ? formatFloat(dv.system_cost, FLOAT_POINT) : 0
      let cepl = getCepl(dv) // CE P/L，管銷
      let _inquiryCost = getInquiryCost(dv)
      let _sourcerCost = getSourcerCost(dv)
      // suggestion cost type is Clean Sheet Cost (加) or 子階建議價 + 組工費  加上運包撿
      // 20191219 運包部分修改，如果運包無資料，則預設為sourcer_shipping
      let shippingCheckCost =  getCeShipping(dv)
      // 20191003 運檢包需乘 sku number再加入
      let sku = dv[skuNum] ? formatFloat(dv[skuNum], FLOAT_POINT) : 0

      // shippingCheckCost, cepl, itemSuggestionCost 皆以*SkuQty
      shippingCheckCost = formatFloat(shippingCheckCost * sku, FLOAT_POINT)
      cepl = formatFloat(cepl * sku, FLOAT_POINT)
      _inquiryCost = formatFloat(_inquiryCost * sku, FLOAT_POINT)
      _sourcerCost = formatFloat(_sourcerCost * sku, FLOAT_POINT)
      let itemSuggestionCost = getSuggestionCost(dv, skuNum)
      // 運包與管銷計算---------
      switch (dv.suggestion_cost_type) {
        case 'ce_cost_assembly':
        case 'clean_sheet_cost':
          itemSuggestionCost = formatFloat(itemSuggestionCost + shippingCheckCost + cepl, FLOAT_POINT)
          break
        case 'inquiry_cost':
        case 'spa_cost':
        case 'last_price':
        case 'sourcer_cost':
          // last_price, spa_cost, inquiry_cost, sourcer_cost不需要計算
          itemSuggestionCost = formatFloat(itemSuggestionCost, FLOAT_POINT)
          break
        default:
          break
      }

      // 20191230 type2是Standoff or nut的不算
      let type2 = dv.parts_ctgy_2 ? dv.parts_ctgy_2.toUpperCase() : null
      if(type2 != 'STANDOFF' && type2 != 'NUT') {
        skuSum = formatFloat(skuSum + sku, FLOAT_POINT)
      }
      // systemCostSum += dv.cleanSheetCost ? dv.cleanSheetCost : system_cost
      systemCostSum = formatFloat(system_cost + systemCostSum, FLOAT_POINT)
      inquiryCostSum = formatFloat(_inquiryCost + inquiryCostSum, FLOAT_POINT)
      sourcerCostSum = formatFloat(_sourcerCost + sourcerCostSum, FLOAT_POINT)
      let suggestCost = dv.suggestionCost ? formatFloat(dv.suggestionCost, FLOAT_POINT) :
        formatFloat(itemSuggestionCost, FLOAT_POINT)
      suggestionCostSum = formatFloat(suggestionCostSum + suggestCost, FLOAT_POINT)
      // dv.suggestionCost = itemSuggestionCost

    })
    //  20191015 add 組工費參數由databae取得
    let spendTime = laboragePara ? laboragePara.standup_assembly_spend_time ?  formatFloat(laboragePara.standup_assembly_spend_time, FLOAT_POINT) : 0 : 0
    let perCost = laboragePara ? laboragePara.standup_assembly_cost ?  formatFloat(laboragePara.standup_assembly_cost, FLOAT_POINT) : 0 : 0
    // 20191230 CE組工= sum(skun的子階qty) - (skun的子階parts_category2為StandOff, Net的qty) -1 * 12/60 * 0.045
    let laborage = formatFloat(((skuSum - 1) * spendTime / 60) * perCost, FLOAT_POINT)
    if(laborage < 0) laborage = 0
    // let laborage = formatFloat((skuSum * 12 / 60) * 0.045, FLOAT_POINT)
    let cleanSheetCost = formatFloat(systemCostSum + laborage, FLOAT_POINT)
    let inquiryCost = formatFloat(inquiryCostSum + laborage, FLOAT_POINT)
    let sourcerCost = formatFloat(sourcerCostSum + laborage, FLOAT_POINT)
    let suggestionCost = formatFloat(suggestionCostSum + laborage, FLOAT_POINT)

    // 將子階的價錢做加總
    // 算母階
    _.forEach(src, (bomItem) => {
      const cepl = getCepl(bomItem) // CE P/L，管銷
      let calCeCostUp = getSuggestionCostNoSku(bomItem)
      let sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], FLOAT_POINT) : 0
      if(bomItem.id == findRes.parent_level){
        let shippingCheckCost =  getCeShipping(bomItem)
        switch (bomItem.suggestion_cost_type) {
          // case 'sub_total_cost': // 20200312 移除舊選項
          case 'ce_cost_assembly':
            // ce cost u/p (原子階建議總價 + 組工費)
            // 運檢包不乘 sku number, 先乘後再加入運檢包
            // 子階建議價 乘以sku number
            // 20191003 運檢包需乘 sku number再加入
            // 子階建議總價的算法 = (子階建議總價 + 組工費 + 運包 + 管銷 ) * sku
            suggestionCost = formatFloat(suggestionCost + shippingCheckCost + cepl, FLOAT_POINT)
            calCeCostUp = suggestionCost
            suggestionCost = formatFloat(suggestionCost * sku, FLOAT_POINT)
            break
          // case 'system_cost': // 20200312 移除舊選項
          case 'clean_sheet_cost':
            // 20191003 運檢包需乘 sku number再加入
            // 20191218 增加管銷
            // cleanSheetCost UP
            suggestionCost = getSuggestionCost(bomItem, skuNum)
            suggestionCost = formatFloat(suggestionCost + formatFloat(shippingCheckCost * sku, FLOAT_POINT)  + formatFloat(cepl * sku, FLOAT_POINT), FLOAT_POINT)
            calCeCostUp = formatFloat(calCeCostUp + shippingCheckCost + cepl, FLOAT_POINT) // 算單價
            break
          case 'inquiry_cost':
          case 'sourcer_cost':
          // 20200226 將 CeCostUp=inquiry_cost_up
            suggestionCost = getSuggestionCost(bomItem, skuNum)
            suggestionCost = formatFloat(suggestionCost, FLOAT_POINT)
            calCeCostUp = formatFloat(calCeCostUp, FLOAT_POINT) // 算單價
            break
          default: // 20190801 選擇為spa, last price選項，自動設定為suggestion cost且無須加入運檢包與管銷
            suggestionCost = getSuggestionCost(bomItem, skuNum)
            break
        }
        // let sku1 = v.sku1 ? Number(v.sku1) : 0
        bomItem.laborageCost = formatFloat(laborage * sku, FLOAT_POINT) // 總組工費
        bomItem.cleanSheetCost = cleanSheetCost
        bomItem.shippingCheckCost = formatFloat(shippingCheckCost * sku, FLOAT_POINT)
        bomItem.cepl = formatFloat(cepl * sku, FLOAT_POINT)
        bomItem.calCeCostUp = calCeCostUp
        // v.suggestionCost = formatFloat(formatFloat(suggestionCost, FLOAT_POINT) * sku, FLOAT_POINT)
        bomItem.suggestionCost = formatFloat(suggestionCost, FLOAT_POINT)
        bomItem.inquiryCost = formatFloat(inquiryCost, FLOAT_POINT)
        bomItem.sourcerCost = formatFloat(sourcerCost, FLOAT_POINT)
      }
    })
  }
}

const getSuggestionCost = (bomItem, skuNum = 'sku1') =>{
  let suggestionCost = getSuggestionCostNoSku(bomItem)
  /* let findSuggestionType = _.find(suggestionCosType, (dv) =>{
    return dv.type == item.suggestion_cost_type})
  if(!_.isUndefined(findSuggestionType)){
    switch (findSuggestionType.column) {
      case 'last_price':
        suggestionCost = _.isEmpty(item.last_price) ? 0 : item.last_price ? item.last_price.unitPrice ? item.last_price.unitPrice : 0 : 0
        break
      case 'inquiry_cost': // 預設會帶入 sourcer_cost
        suggestionCost = getInquiryCost(item)
        break
      case 'cleanSheetCost':
      case 'system_cost':
        suggestionCost = item.system_cost
        break
      case 'spa_cost':
        suggestionCost = item[findSuggestionType.column]
        break
      default:
        break
    }
  }*/
  let sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], FLOAT_POINT) : 0
  return  formatFloat(suggestionCost, FLOAT_POINT) * sku
}
/**
 * 取得指定的suggestion_cost_type對應的SuggestionCost
 */
const getSuggestionCostNoSku = (bomItem) => {
  let suggestionCost = null
  let findSuggestionType = _.find(suggestionCosType, (mappingObj) =>{
    return mappingObj.type == bomItem.suggestion_cost_type
  })
  if(!_.isUndefined(findSuggestionType)){
    switch (findSuggestionType.column) {
      case 'last_price':
        suggestionCost = _.isEmpty(bomItem.last_price) ? 0 : bomItem.last_price ? bomItem.last_price.unitPrice ? bomItem.last_price.unitPrice : 0 : 0
        break
      case 'inquiry_cost': // 預設會帶入 sourcer_cost
        suggestionCost = getInquiryCost(bomItem)
        break
      case 'sourcer_cost':
        suggestionCost = getSourcerCost(bomItem)
        break
      case 'cleanSheetCost':
      case 'system_cost':
        suggestionCost = bomItem.system_cost
        break
      case 'spa_cost':
        suggestionCost = bomItem[findSuggestionType.column]
        break
      default:
        break
    }
  }
  return _.isNull(suggestionCost) ? suggestionCost : formatFloat(suggestionCost, FLOAT_POINT)
}
/**
 * 計算bomItem
 * @param {*} src 所有料
 * @param {*} lastLeafs 沒有子階的料
 * @param {*} skuNum
 * @param {*} laboragePara
 */
const computeLaborageWithSku = (src, lastLeafs, skuNum, laboragePara) =>{
  // 計算 子階的料, 從母階中 找到子階們 去做計算
  _.forEach(lastLeafs, (v) => {
    let findRes = v
    while(findRes && findRes.parent_level){
      compute(src, findRes.id, skuNum, laboragePara)
      findRes = _.find(src, (dv) => {return dv.id == findRes.parent_level})
    }
  })

  _.forEach(src, (bomItem) => {
    // 計算尚未被統計的料(無子階的料)
    if(_.isNil(bomItem.suggestionCost)){
      let sku = bomItem[skuNum] ? formatFloat(bomItem[skuNum], FLOAT_POINT) : 0
      /* let shippingCheckCost = v.shipping_check_cost == null || v.shipping_check_cost == undefined ? 0 :  Number(v.shipping_check_cost)*/
      // shippingCheckCost = formatFloat(shippingCheckCost * v[skuNum])
      let suggestionCost = getSuggestionCost(bomItem, skuNum)
      let calCeCostUp = getSuggestionCostNoSku(bomItem)
      const cepl = getCepl(bomItem) // CE P/L，管銷
      let shippingCheckCost =  getCeShipping(bomItem)
      const totalShippingCheckCost = formatFloat(shippingCheckCost * bomItem[skuNum], FLOAT_POINT)

      switch (bomItem.suggestion_cost_type) {
        // case 'sub_total_cost': // 20200312 移除舊選項
        case 'ce_cost_assembly':
          // ce cost u/p (原子階建議總價 + 組工費)
          // 運檢包不乘 sku number, 先乘後再加入運檢包
          // 子階建議價 乘以sku number
          // 20191003 運檢包需乘 sku number再加入
          suggestionCost = formatFloat(formatFloat(suggestionCost, FLOAT_POINT) + formatFloat(totalShippingCheckCost, FLOAT_POINT)   + formatFloat(cepl, FLOAT_POINT), FLOAT_POINT)
          calCeCostUp = suggestionCost
          suggestionCost = formatFloat(suggestionCost * sku, FLOAT_POINT)
          break
        // case 'system_cost': //  = clean_sheet up // 20200312 移除舊選項
        case 'clean_sheet_cost':
        // case 'sourcer_cost': // 20200312 移除舊選項
        // case 'inquiry_cost': // = sourcer_cost // 20200312 移除舊選項
          // 20191003 運檢包需乘 sku number再加入
          // 20191218 增加管銷
          suggestionCost = formatFloat(suggestionCost + formatFloat(totalShippingCheckCost, FLOAT_POINT)  + formatFloat(cepl * sku, FLOAT_POINT), FLOAT_POINT)
          calCeCostUp = formatFloat(calCeCostUp + shippingCheckCost + cepl, FLOAT_POINT)
          break
        case 'inquiry_cost':
        // 20200226 將 CeCostUp=inquiry_cost_up
          suggestionCost = formatFloat(suggestionCost, FLOAT_POINT)
          calCeCostUp = formatFloat(calCeCostUp, FLOAT_POINT)
          break
        default: // 20190801 選擇為spa, last price選項，自動設定為suggestion cost且無須加入運檢包與管銷
          suggestionCost = getSuggestionCost(bomItem, skuNum)
          break
      }
      /* if (v.suggestion_cost_type == 'sub_total_cost' || v.suggestion_cost_type == 'system_cost') {
        suggestionCost = formatFloat(formatFloat(suggestionCost, FLOAT_POINT) + formatFloat(shippingCheckCost, FLOAT_POINT), FLOAT_POINT)
      }*/
      bomItem.calCeCostUp = calCeCostUp
      bomItem.suggestionCost = formatFloat(suggestionCost, FLOAT_POINT)
      bomItem.haschild = false
    }else{
      bomItem.haschild = true
    }
  })
  // console.log('computeLaborage ============>', src)
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
      m.origin_last_price = formatFloat(m.unitprice, FLOAT_POINT)
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
        m.exchangeRate = formatFloat(exchangeRate, FLOAT_POINT)
        m.unitPrice = formatFloat(formatFloat(exchangeRate, FLOAT_POINT) * formatFloat(m.unitprice, FLOAT_POINT), FLOAT_POINT)
      } else {
        m.unitPrice = formatFloat(m.unitprice, FLOAT_POINT)
        m.exchangeRate = formatFloat(1, FLOAT_POINT)
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
    groupRes[partNumber].forEach((item) => {
      let isDateVaild = item.datbi === '2099-12-31' // 日期為有效的判定
      let isSiteVaild = targetSite.includes(item.purchase_org) // 符合專案的site
      if(isDateVaild && isSiteVaild){
        vaildPriceList.push(item)
      } else if(!isDateVaild && isSiteVaild) {
        notVaildPriceList.push(item)
      }
    })
    if(vaildPriceList.length > 0) { // 有效的最低價
      result[partNumber.trim().toUpperCase()] = {
        'isValidPrice':true,
        'priceInfo' : _.minBy(vaildPriceList, (item) => item.unitPrice), // 取最低價
      }
    } else if(notVaildPriceList.length > 0) { // 無效的最低價
      result[partNumber.trim().toUpperCase()] = {
        'isValidPrice':false,
        'priceInfo' : _.minBy(notVaildPriceList, (item) => item.unitPrice), // 取最低價
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
          const lastPriceInfo = minLastPrice.priceInfo
          obj.unitPrice = parseFloat(lastPriceInfo.unitPrice).toString()
          obj.validDate = lastPriceInfo.datab
          obj.currency = lastPriceInfo.currency
          obj.vendor = lastPriceInfo.vendor // 廠商
          obj.vendor_pn = lastPriceInfo.vendor_pn // 廠商 part number
          obj.oriUnitPrice = lastPriceInfo.origin_last_price ?  parseFloat(lastPriceInfo.origin_last_price).toString() : null // 原始幣別價格
          obj.oriCurrency = lastPriceInfo.originCurrency ?  lastPriceInfo.originCurrency : null // 原始幣別
          obj.purchaseOrg = lastPriceInfo.purchase_org ? lastPriceInfo.purchase_org : null // 採購廠區
          // v.last_price = JSON.stringify(obj)
          obj.isValidPrice = minLastPrice.isValidPrice // 價格是否有效
          v.originCurrency = lastPriceInfo.originCurrency ?  lastPriceInfo.originCurrency : null
          v.origin_last_price = lastPriceInfo.origin_last_price ?  lastPriceInfo.origin_last_price : null
          v.exchangeRate = lastPriceInfo.exchangeRate
        } else {
          obj.unitPrice = '-'
        }
      }
    }
    v.last_price = JSON.stringify(obj)
  })
}


module.exports = {
  /**
   * @param src bom 所有的bom item
   * @param lastLeafs 沒有子階的 bom item(parent_level is null, level =2 or DC/65)
   * @param skuNum
   * @param laboragePara
   */
  computeLaborage: (src, lastLeafs, skuNum, laboragePara) => {
    skuNum = skuNum ? skuNum : 'sku1'
    computeLaborageWithSku(src, lastLeafs, skuNum, laboragePara)
  },
  computeSkuSumCost:(src) =>{
    let findAllRootParent = _.filter(src, (o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
    let res = [0, 0, 0, 0, 0, 0]
    _.forEach(findAllRootParent, (v) =>{
      // let sku0 = v.sku0 == null || v.sku0 == undefined ? 0 : Number(v.sku0)
      // let sku1 = v.sku1 == null || v.sku1 == undefined ? 0 : Number(v.sku1)
      // let sku2 = v.sku2 == null || v.sku2 == undefined ? 0 : Number(v.sku2)
      // let sku3 = v.sku3 == null || v.sku3 == undefined ? 0 : Number(v.sku3)
      // let sku4 = v.sku4 == null || v.sku4 == undefined ? 0 : Number(v.sku4)
      // let sku5 = v.sku5 == null || v.sku5 == undefined ? 0 : Number(v.sku5)
      let suggestionCost = v.suggestionCost ? v.suggestionCost : v.suggestion_cost ? v.suggestion_cost : 0
      res[0] = formatFloat(res[0] + (suggestionCost), FLOAT_POINT)
      res[1] = formatFloat(res[1] + (suggestionCost), FLOAT_POINT)
      res[2] = formatFloat(res[2] + (suggestionCost), FLOAT_POINT)
      res[3] = formatFloat(res[3] + (suggestionCost), FLOAT_POINT)
      res[4] = formatFloat(res[4] + (suggestionCost), FLOAT_POINT)
      res[5] = formatFloat(res[5] + (suggestionCost), FLOAT_POINT)
    })
    return res
  },
  computeAllSkuSumCost:(src, lastLeafs, laboragePara) =>{
    let skuArr = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']
    let res = [0, 0, 0, 0, 0, 0]
    _.forEach(skuArr, (v, idx) => {
      let tmp = _.cloneDeep(src)
      computeLaborageWithSku(tmp, lastLeafs, v, laboragePara)
      let findAllRootParent = _.filter(tmp, (o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      _.forEach(findAllRootParent, (dv) =>{
        res[idx] =  formatFloat( formatFloat(res[idx], FLOAT_POINT) + dv.suggestionCost, FLOAT_POINT)
      })
    })
    return res
  },
  computeExportSkuCost:(src, sku_count) =>{
    let findAllRootParent = _.filter(src, (o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
    let res = [0, 0, 0, 0, 0, 0]
    _.forEach(findAllRootParent, (v) =>{
      let sku0 = v.sku0 == null || v.sku0 == undefined ? 0 : Number(v.sku0)
      let sku1 = v.sku1 == null || v.sku1 == undefined ? 0 : Number(v.sku1)
      let sku2 = v.sku2 == null || v.sku2 == undefined ? 0 : Number(v.sku2)
      let sku3 = v.sku3 == null || v.sku3 == undefined ? 0 : Number(v.sku3)
      let sku4 = v.sku4 == null || v.sku4 == undefined ? 0 : Number(v.sku4)
      let sku5 = v.sku5 == null || v.sku5 == undefined ? 0 : Number(v.sku5)
      // let findSuggestionType = _.find(suggestionCosType, (dv) =>{ return dv.type == v.suggestion_cost_type})
      let suggestionCost = v.suggestionCost ? v.suggestionCost : 0
      // if(findSuggestionType && (v[findSuggestionType.column] != null && v[findSuggestionType.column] != undefined)){
      //   if(findSuggestionType.column === 'last_price'){
      //     suggestionCost = _.isEmpty(v.last_price) ? 0 : v.last_price ? v.last_price.unitPrice ? v.last_price.unitPrice : 0 : 0
      //   }else{
      //     suggestionCost = v[findSuggestionType.column]
      //   }
      // }else{
      //   if(findSuggestionType && findSuggestionType.column === 'cleanSheetCost'){
      //     suggestionCost = v.system_cost
      //   }
      // }
      switch(sku_count) {
        case 'sku0':
          res[0] = formatFloat(res[0] + (suggestionCost * sku0), FLOAT_POINT)
          break
        case 'sku1':
          res[1] = formatFloat(res[1] + (v.suggestionCost), FLOAT_POINT)
          break
        case 'sku2':
          res[2] = formatFloat(res[2] + (suggestionCost * sku2), FLOAT_POINT)
          break
        case 'sku3':
          res[3] = formatFloat(res[3] + (suggestionCost * sku3), FLOAT_POINT)
          break
        case 'sku4':
          res[4] = formatFloat(res[4] + (suggestionCost * sku4), FLOAT_POINT)
          break
        case 'sku5':
          res[5] = formatFloat(res[5] + (suggestionCost * sku5), FLOAT_POINT)
          break
        default:
          res[0] = formatFloat(res[0] + (suggestionCost * sku0), FLOAT_POINT)
          res[1] = formatFloat(res[1] + (suggestionCost * sku1), FLOAT_POINT)
          res[2] = formatFloat(res[2] + (suggestionCost * sku2), FLOAT_POINT)
          res[3] = formatFloat(res[3] + (suggestionCost * sku3), FLOAT_POINT)
          res[4] = formatFloat(res[4] + (suggestionCost * sku4), FLOAT_POINT)
          res[5] = formatFloat(res[5] + (suggestionCost * sku5), FLOAT_POINT)

      }


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

        res[finIndex] =  formatFloat(formatFloat(res[finIndex], FLOAT_POINT) +  formatFloat(suggestionCost, FLOAT_POINT), FLOAT_POINT)
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
  getCurrencyList,
  getInquiryCost,
  getCepl,
  getCeShipping,
  getSourcerCost,
}
