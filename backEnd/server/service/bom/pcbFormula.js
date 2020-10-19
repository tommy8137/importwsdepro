const log4js = require('../../utils/logger/logger')
const _groupBy = require('lodash/groupBy')
const _ = require('lodash')
const math = require('mathjs')
const meBomCost = require('../../utils/cost/meBomCost')
const fakePcbFormulaData = require('./FakePcbFormulaData')
const { pcb: pcbModel } = require('../../model/bom/pcb')
const logger = log4js.getLogger('pcbFormula')
const ut = require('util')
const bomItemModel = require('../../model/bom/bomItem')
// const {
//   throwApiError,
//   errorCode,
// } = require('../../helpers/errorCode/apiErrorHelper.js')


/**
 * Formula 1.
 * SQI per pcs =
 * length(spec4) * width(spec5) / (25.4 * 25.4) / array(spec6)
 *
 * Formula 2.
 * Targer price's quotation base =
 * base_price / 100
 *
 * Formula 3.
 * Clean-sheet U/P without adder
 * [SQI per pcs] * [Targer price's quotation base]
 *
 * Formula 4.
 * Clean-sheet U/P with adder
 * Clean-sheet U/P without adder * (1 + total adder%) + G/F pin(spec10) * G/F spec(spec11)
 *
 * Formula 5.
 * Clean-Sheet U/P vs Pur. U/P gap
 * [Clean-Sheet U/P adder] - [Price(SAP_USD)]
 *
 * Formula 6.
 * Clean-Sheet U/P vs Pur. U/P gap % =
 * [Clean-Sheet U/P vs Pur. U/P gap] / [Clean-Sheet U/P adder]
 *
 */

class pcbFormula {
  static async calculateFormula(payload) {
    const manufacturers = !payload.manufacturer ? [] : [payload.manufacturer.toUpperCase()]
    // 因使用者要求同步的pcb沒有type2與manufacturer也要能帶出last price，故增加判斷跳過clean sheet cost計算
    if(_.isNil(payload.typeii) && _.isNil(payload.manufacturer)){
      return null
    }
    // 找出 base price
    const basePricesReult = await pcbModel.getPcbBasePrice(
      payload.typeii,
      manufacturers,
      payload.SPEC01,
      payload.SPEC02,
      payload.SPEC03
    )
    const basePrices = _groupBy(basePricesReult, item => item.manufacturer)

    // 從DB 取得所有廠商所有的adder rule。 adderRules = { 'manufacturer': [adderRules] }
    const baseAdderRules = await pcbModel.getPcbAdderRules(payload.typeii, manufacturers, payload.SPEC01)
    // 從DB 取得所有廠商所有的usd rule。 usdRules = { 'manufacturer': [usdRules] }
    const baseUsdRules = await pcbModel.getPcbUsdRules(payload.typeii, manufacturers, payload.SPEC01)
    // const baseRules = fakePcbFormulaData.adder
    const adderRules = baseAdderRules.reduce((acc, item) => {
      const existManufacturerRule = acc[item.manufacturer] || []
      return {
        ...acc,
        [item.manufacturer]: existManufacturerRule.concat(item),
      }
    }, {})

    const usdRules = baseUsdRules.reduce((acc, item) => {
      const existManufacturerRule = acc[item.manufacturer] || []
      return {
        ...acc,
        [item.manufacturer]: existManufacturerRule.concat(item),
      }
    }, {})



    // 2. 找出每間製造商的加價 及 金手指
    const adderAndUsdObj = manufacturers.reduce((acc, key) => {
      // 3. 將同一個比對規則放對同一個陣列 ruleSet = { 'ruleUUID': [adderRules] }
      const ruleSpec13 = []
      const adderRuleSet = (adderRules[key] || []).reduce((acc, item) => {
        if (item.spec.toUpperCase() === 'SPEC13') ruleSpec13.push(item)

        const existRule = acc[item.uuid] || []
        return {
          ...acc,
          [item.uuid]: existRule.concat(item),
        }
      }, {})


      // 處理特殊規則
      // SPEC13
      const spec13Percentage = SPECIAL_RULE.SPEC13(payload, _groupBy(ruleSpec13, item => item.uuid))
      // SPEC23
      const spec23Percentages = SPECIAL_RULE.SPEC23(payload)

      // 4. 回傳 所有加價項目 { 'manufacturer': [adder_items] }
      const manufacturerAdder = Object.keys(adderRuleSet)
        .filter(key => formulaRuleFilter(payload, adderRuleSet[key]))
        .map(key => adderRuleSet[key][0].percentage)



      const manufacturerUsd = (usdRules[key] || []).reduce((acc, item) => {
        if (item.spec.toUpperCase() === 'SPEC10') {
          return acc
        } else if (item.spec.toUpperCase() === 'SPEC11' && formulaRuleFilter(payload, [item], true)) {
          return [...acc, payload.SPEC10 * item.price]
        } else if (formulaRuleFilter(payload, [item], true)) {
          return [
            ...acc,
            item.price,
          ]
        }
        return acc
      }, [])

      return {
        adder: {
          ...(acc.adder || {}),
          [key]: [...manufacturerAdder, spec13Percentage, ...spec23Percentages],
        },
        adderItems: {
          ...(acc.adder || {}),
          [key]: [Object.keys(adderRuleSet)
            .filter(key => formulaRuleFilter(payload, adderRuleSet[key]))
            .map(key => adderRuleSet[key][0])],
        },
        usd: {
          ...(acc.usd || {}),
          [key]: [...manufacturerUsd],
        },
        spec23Percentages: {
          ...(acc.usd || {}),
          [key]: spec23Percentages,
        },
      }
    }, {})

    const SPECS4_RESULT = [{
      value: 'YM',
      price: 0.1,
    }, {
      value: 'YCD',
      price: 0.01,
    }]

    // 計算公式
    const result = manufacturers.reduce((acc, manufacturer) => {
      const spec24Item = SPECS4_RESULT.find(item => item.value === payload.SPEC24)
      // 如果spec24 符合 SPECS4_RESULT.value 任何一個值，就直接回傳該值對應的 price
      if (spec24Item) {
        return {
          ...acc,
          [manufacturer]: {
            formula1: null,
            formula2: null,
            formula3: null,
            formula4: spec24Item.price,
            formula5: formula5(spec24Item.price, payload.sap_price),
            formula6: formula6(spec24Item.price, formula5(spec24Item.price, payload.sap_price)),
          },
        }
      }

      const manufacturerBasePrice = basePrices[manufacturer] ? basePrices[manufacturer][0].baseprice : 0
      const manufacturerAdder = adderAndUsdObj.adder[manufacturer]
      const result1 = formula1(payload.SPEC04, payload.SPEC05, payload.SPEC06)
      const result2 = formula2(manufacturerBasePrice)
      const result3 = formula3(result1, result2)
      const result4 = formula4(result3, manufacturerAdder.reduce((acc, val) => acc + val), payload.SPEC10, payload.SPEC11)
      const result5 = formula5(result4, payload.sap_price)
      const result6 = formula6(result4, result5)


      return {
        ...acc,
        [manufacturer]: {
          formula1: result1,
          formula2: result2,
          formula3: result3,
          formula4: result4,
          formula5: result5,
          formula6: result6,
          other5Adder: adderAndUsdObj.spec23Percentages[manufacturer].reduce((acc, perc) => acc + perc, 0),
          sapPrice: payload.sap_price || null,
          originCurrency: payload.originCurrency || null,
          currency: payload.currency || null,
          exchangeDate: payload.exchangeDate || null,
        },
      }
    }, {})

    return {
      adderRules,
      usdRules,
      basePrices,
      adder: adderAndUsdObj.adder,
      usd: adderAndUsdObj.usd,
      adderItems: adderAndUsdObj.adderItems,
      result,
    }
  }
  /**
   * 在每個pcbbomItem的物件裡追加lastprice的相關資訊
   * 此方法會更改原物件內容
   * @param {Array} pcbBomItemList
   */
  static async addPcbLastpriceInfo(pcbBomItemList){
    let partNumberList = _getPartNumberListByPcbBomItemList(pcbBomItemList)
    let partnumberPriceList = []
    let lastPriceInfoList = {}
    if(partNumberList.length > 0){
      try {
        partnumberPriceList = await bomItemModel.getPartNumberPrice(partNumberList)
        lastPriceInfoList = await _getLastpriceInfoList(partnumberPriceList)
      } catch (error) {
        logger.error('[pcbService][addPcbLastpriceInfo] error :', error)
        throw new Error(error)
      }
    }
    for(let pcbBomItem of pcbBomItemList){
      const partnumberKey = pcbBomItem.part_number ? _getLastPriceInfoPartNumberKey(pcbBomItem.part_number) : null
      let lastPriceInfo = {}
      if(!_.isNull(partnumberKey) && lastPriceInfoList.hasOwnProperty(partnumberKey)){
        lastPriceInfo = lastPriceInfoList[partnumberKey]
        pcbBomItem.originCurrency = lastPriceInfo.lowestPriceInfo.originCurrency ?  lastPriceInfo.lowestPriceInfo.originCurrency : null
        pcbBomItem.origin_last_price = lastPriceInfo.lowestPriceInfo.origin_last_price ?  lastPriceInfo.lowestPriceInfo.origin_last_price : null
        pcbBomItem.exchangeRate = lastPriceInfo.lowestPriceInfo.exchangeRate
      }
      pcbBomItem.highestLastPriceInfo = this._getLastPriceObj(lastPriceInfo.highestPriceInfo)
      pcbBomItem.lowestLastPriceInfo = this._getLastPriceObj(lastPriceInfo.lowestPriceInfo)
      pcbBomItem.last_price = JSON.stringify(pcbBomItem.lowestLastPriceInfo) // excel與suggestion_cost計算用
    }
  }
  static _getLastPriceObj(lastPriceInfo = {}){
    return {
      'unitPrice': _.isNil(lastPriceInfo.unitPrice) ? null : parseFloat(lastPriceInfo.unitPrice).toString(),
      'validDate': lastPriceInfo.datab || null,
      'currency': lastPriceInfo.currency || null,
      'vendor': lastPriceInfo.vendor || null,
      'vendor_pn': lastPriceInfo.vendor_pn || null,
      'originCurrency':lastPriceInfo.originCurrency || null,
      'originLastPriceup': lastPriceInfo.origin_last_price || null,
    }
  }
}

const SPECIAL_RULE = {
  SPEC13: (payload, ruleSet) => {
    if (!payload.SPEC13 && payload.SPEC13 !== 0) return 0
    if (payload.SPEC13 === 'NA') return 0
    // 5. 處理特殊規則 SPEC13: 1/1.5 分別對應對 line_space : 1 line_width 1.5 後比對加價
    // 前端應該傳 SPEC13, line_space, line_width 這三個欄位
    const replacedNASpec13 = NAReplacer(payload.SPEC13).toString()
    const [lineSpace, lineWidth] = replacedNASpec13.includes('/') ? replacedNASpec13.split('/') : [replacedNASpec13, replacedNASpec13]

    const filterKey = Object.keys(ruleSet).map(key => {
      const rule = ruleSet[key]
      const filterRule = rule.filter(r => {
        if (r.reference === 'Line_space')
          return eval(`() => ${lineSpace}${r.referencevalue}`)()
        if (r.reference === 'Line_width')
          return eval(`() => ${lineWidth}${r.referencevalue}`)()
      })
      return filterRule.length > 0 && filterRule.length === rule.length ? filterRule[0].percentage : 0
    })

    // 找出符合條件中 最大的percentage
    return filterKey.length > 0 ? Math.max(...filterKey) : 0
  },
  SPEC23: (payload) => {
    // 6. 處理特殊規則 SPEC20: XXX(10%); OOO(20%) 加價則為： 10%, 20%
    const percentageRegExp = (payload.SPEC23 || '').match(/\(([\d\.]*)%\)/g) || []
    return percentageRegExp.map(percentage => +percentage.substring(1, percentage.length - 2) / 100)
  },

}

function formulaRuleFilter(payload, ruleArray = [], showConsole = false) {
  if (!ruleArray.length) return false

  const result = ruleArray.filter(item => {
    let flag = false
    // console.log(payload, item)
    const val = payload[item.spec.toUpperCase()]
    // 確認輸入的字串是否可以轉成數字
    const compareValue = typeof val === 'string' && /^[-.\d]*$/.test(val) && val !== '' ? Number(val) : val
    const { referencevalue } = item

    switch (typeof compareValue) {
      // string 可比較方式有 字串比對、分號分割、布林值 Y/N
      case 'string':
        // 布林值 Y/N
        if (
          referencevalue.toUpperCase() === 'Y' ||
          referencevalue.toUpperCase() === 'N'
        ) {
          if (compareValue === referencevalue) flag = true
        } else if (
          Array.isArray(compareValue) &&
          compareValue.includes(referencevalue)
        ) {
          // 分號分割
          flag = true
        } else if (
          referencevalue.toUpperCase() === compareValue.toUpperCase()
        ) {
          // 字串比對
          flag = true
        }
        break
      // number 可比較方式有 比大小、區間
      case 'number':
        // 區間比對
        if (referencevalue.includes('~')) {
          const rangeRule = referencevalue.match(/^(\S*)~(\S*)$/)
          const range1 = rangeRule[1]
          const range2 = rangeRule[2]
          if (compareValue >= range1 && compareValue <= range2) flag = true
        } else if (
          referencevalue.includes('>') ||
          referencevalue.includes('>=') ||
          referencevalue.includes('<=') ||
          referencevalue.includes('<') ||
          referencevalue.includes('=')
        ) {
          console.log(`SPEC: ${item.spec} ,eval`, `() => ${compareValue}${
            referencevalue.startsWith('=')
              ? '==' + referencevalue
              : referencevalue
          }`)
          // 比大小
          if (
            // eslint-disable-next-line no-eval
            eval(
              `() => ${compareValue}${
                referencevalue.startsWith('=')
                  ? '==' + referencevalue
                  : referencevalue
              }`
            )()
          )
            flag = true
        }
        break
      case 'object':
        if (Array.isArray(compareValue)) {
          if (compareValue.includes(referencevalue)) flag = true
        }
        break
    }

    if (showConsole) {
      console.log('ruleArray', ruleArray)
      console.log('flag', flag)
    }
    return flag
  })

  if (showConsole) {
    console.log('result', result)
  }
  return result.length > 0 && result.length === ruleArray.length
}

/**
 * SQI per pcs =
 * length(spec4) * width(spec5) / (25.4 * 25.4) / array(spec6)
 */
function formula1(spec4, spec5, spec6) {
  const result = (spec4 * spec5 / (25.4 * 25.4) / spec6)
  return result
}
/**
 * Targer price's quotation base =
 * base_price / 100
 */
function formula2(basePrice) {
  const result = basePrice / 100
  return result

}
/**
 * Clean-sheet U/P without adder
 * [SQI per pcs] * [Targer price's quotation base]
 */
function formula3(result1, result2) {
  const result = result1 * result2
  return result
}

/**
 * Clean-sheet U/P with adder
 * Clean-sheet U/P without adder * (1 + total adder%) + G/F pin(spec10) * G/F spec(spec11)
 */
function formula4(result3, adder, spec10, spec11) {
  const result = result3 * (1 + (adder)) + (NAReplacer(spec10) * NAReplacer(spec11))
  return math.round(result, 5)

}
/**

 * Clean-Sheet U/P vs Pur. U/P gap
 * [Clean-Sheet U/P adder] - [Price(SAP_USD)]
 */
function formula5(result4, sapPrice) {
  // 1.995 為 現價  要去查表 view_eebom_detail
  const result = result4 - NAReplacer(sapPrice)
  return math.round(result, 5)

}
/**
 * Clean-Sheet U/P vs Pur. U/P gap % =
 * [Clean-Sheet U/P vs Pur. U/P gap] / [Clean-Sheet U/P adder]
 */
function formula6(result4, result5) {
  const result = (result5 / result4) * 100
  return math.round(result, 5)

}

function NAReplacer(val) {
  return val === 'NA' || val === 'N/A' ? 0 : val
}

async function getLastPrice(payload) {
  let result = {
    ...payload,
    sap_price : null,
    currency : null,
    originCurrency: null,
    highest_last_price_info: null,
    lowest_last_price_info: null,
  }
  let partNumberList = [{ part_number: payload.wistronpn }]
  try {
    if (payload.wistronpn.length > 0) {
      await pcbFormula.addPcbLastpriceInfo(partNumberList)
      const pcbBomItemInfo = (partNumberList[0]) ? partNumberList[0] : null
      const lastPriceInfo = _.isNull(pcbBomItemInfo) ? {} : JSON.parse(pcbBomItemInfo.last_price)
      logger.info(`use wistron_pn: ${payload.wistronpn} to get last price: ${ut.inspect(lastPriceInfo, null, 5)}`)
      result.sap_price = lastPriceInfo.unitPrice || null // 舊price物件  給formula計算用
      result.currency = lastPriceInfo.currency || null // 舊price物件  給formula計算用
      result.originCurrency = _.isNull(pcbBomItemInfo) ? null : pcbBomItemInfo.originCurrency  // 舊price物件  給formula計算用
      _addHighestAndLowestLastPriceInfo(result, pcbBomItemInfo)
    }
    logger.info(`after getLastPrice, payload: ${ut.inspect(result, null, 5)}`)
    return result
  } catch (error) {
    logger.error('[PcbFormulaService][getLastPrice] Error :', error)
    throw new Error(error)
  }
}

async function calculateFormulaProcedure(payload) {
  const payloadWithLastPrice = await getLastPrice(payload)
  const calculateFormulaResult = await pcbFormula.calculateFormula(payloadWithLastPrice)
  let result = _.isNull(calculateFormulaResult) ? payloadWithLastPrice : calculateFormulaResult
  // calculateFormula輸出出來的物件內容沒有包含最低價與最高價，所以要重新追加
  _addHighestAndLowestLastPriceInfo(result, payloadWithLastPrice)
  logger.info(`after calculateFormulaProcedure, result: ${ut.inspect(result, null, 5)}`)
  return result
}

/**
 * 在baseObj追加lastPrice的最低價與最高價的資訊內容
 * @param {Object} baseObj
 * @param {Object} lastPriceInfo
 */
function _addHighestAndLowestLastPriceInfo(baseObj, lastPriceInfo){
  baseObj.highestLastPriceInfo = lastPriceInfo.highestLastPriceInfo || null
  baseObj.lowestLastPriceInfo = lastPriceInfo.lowestLastPriceInfo || null
}

function _getPartNumberListByPcbBomItemList(pcbBomItemList){
  let partNumberList = []
  for(let pcbBomItem of pcbBomItemList){
    const requestPartNumber =  pcbBomItem.part_number ? pcbBomItem.part_number.trim().toUpperCase() : null
    if(_.isNull(requestPartNumber)){
      continue
    }
    if(partNumberList.indexOf(requestPartNumber) <= -1){
      partNumberList.push(requestPartNumber)
    }
  }
  return partNumberList
}
async function _getLastpriceInfoList(partnumberPriceList){
  let lastPriceInfoList = {}
  const exchangeRate = await meBomCost.getExchangeRateByCurrencyKey(partnumberPriceList, 'currency')
  let groupPartnumberList = _.groupBy(exchangeRate, 'part_number')
  _.forEach(groupPartnumberList, (partNumberList, partNumber) => {
    const partNumberKey = _getLastPriceInfoPartNumberKey(partNumber)
    lastPriceInfoList[partNumberKey] = {
      highestPriceInfo: _.maxBy(partNumberList, 'price'),
      lowestPriceInfo: _.minBy(partNumberList, 'price'),
    }
  })
  return lastPriceInfoList
}
function _getLastPriceInfoPartNumberKey(partNumber){
  return partNumber.trim().toUpperCase()
}

module.exports = { pcbFormula, calculateFormulaProcedure }
