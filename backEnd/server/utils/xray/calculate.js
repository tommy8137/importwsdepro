
const _ = require('lodash')
const moment = require('moment')

const costUtils = require('../cost/exchangeRate.js')
const fixMath = require('../../helpers/math/math.js')
const { formatFloat } = require('../../helpers/utils.js')
const xrayLogicalUtils = require('./logical.js')


/**
 * 回傳一個所有spec都為空的 Object
 * @returns {Object} ex: { spec01: [], spec02: [], spec03: []...}
 */
const newSpecList = () => {
  let nullSpec = {}
  _.range(1, 31).map(key => {
    let k = key >= 10 ? 'spec' + key : 'spec0' + key
    return nullSpec[k] = []
  })

  return nullSpec
}

const emptyObject = (type) => {
  const columns = [
    'PartNumber', 'Description', 'Vendor', 'Manufacturer',
    'VendorPN', 'SupplyType', 'Mrp', 'Currency', 'LastPrice',
    'OriginalCurrency', 'OriginalPrice', 'ValidFrom', 'Cmp', 'Obs', 'Exp']

  let obj = {}
  let keys = []
  _.forEach(columns, (c) => {
    obj[`${type}${c}`] = null
    keys.push(`${type}${c}`)
  })

  return {
    suggOpporDefaultCols: obj,
    columns: keys,
  }
}

/**
 * 轉換匯率 into USD, 取得原始價格&原始幣別
 *
 * @param {array} items 料號資訊 ex: [{
      "partNumber": "5260031400G$AA",
      "matnr": "MPN02927184",
      "datab": "2019-02-10T16:00:00.000Z",
      "unitPrice": 0.00001,
      "unit": "1000",
      "currency": "RMB",
      "manufacturer": "VISHAY",
      "knumh": "0173215116"
  }]
 * @returns {array} 轉換完的料號資訊
 */

const calculatePrice = async (items, dateTo = null) => {
  let calculateDate = dateTo ? dateTo : moment(new Date()).format('YYYYMMDD')

  // unitPrice : if currency diff, exchange currency into USD
  let currencies = _.chain(items)
    .map('currency')
    .uniq()
    .filter(c => c != 'USD')
    .value()

  let exchangeRate = []
  if (currencies.length > 0) {
    exchangeRate = await costUtils.getExchangeRateByDate(currencies, calculateDate)
  }

  items.map((m) => {
    m['originalPrice'] = m.price ? parseFloat(m.price) : null
    m['originalCurrency'] = m.currency
    m['exchangeRate'] = 1
    m['price'] = m.price ? parseFloat(m.price) : null

    if (m.price && m.currency && m.currency != 'USD') {
      let rate
      let fcurr = exchangeRate.find(r => r.fcurr == m.currency)
      if (!fcurr) {
        rate = 0
      } else {
        rate = fcurr.exchangeRate
      }

      m.exchangeRate = formatFloat(rate, 5)
      m.currency = 'USD'
      // eslint-disable-next-line operator-assignment
      m.price *= rate
    }
  })

}

/**
 *
 * 找到 SPA or ALT 最低價, 且比對partnumber 是否與 原始料號相同
 * @param {string} type SPA or ALT
 * @param {Array} suggData 此料號的 spa or alt 資料
 * @param {string} wistronPN 比對的料號
 * @param {object} mappingKey mapping key value for 共用function ex: {
    'partnumber': 'spaPartNumber',
    'price': 'spaLastPrice',
    'originalCurrency': 'spaOriginalCurrency',
    'cmp': 'spaCmp',
    'supplyType': 'spaSupplyType',
  }
 * @returns 回傳 SPA or ALT partnumber跟原始料號不相同的 最低價格資訊
 *
 */
const findSuggOpportunity = (type, wistronPN, mappingKey, suggData = null) => {
  let { suggOpporDefaultCols, columns } = emptyObject(type)

  if (suggData) {
    let sortByPrice = _.sortBy(suggData.data, [mappingKey.price])
    let minRes = xrayLogicalUtils.getMinPriceByPreferredOrder(sortByPrice, mappingKey)

    if (minRes[mappingKey.partnumber] != wistronPN ) {
      return _.pick(minRes, columns)
    }
  }
  return suggOpporDefaultCols
}

/**
 * 計算Sugg Opportunity 和 opportunityPercent , 回傳 by type的 opportunity需要的 資訊
 * @param {*} type SPA or ALT
 * @param {*} suggData 此料號的 spa or alt 資料 ex: {
  spaPartNumber: '022.10011.0231',
  spaDescription: 'SKT SFP R-DP-008040-6-F-M-13,PA9T+LCP',
  ...
  spaExp: 'N'
 }
 * @param {*} price 原始的價格
 */
const calSuggOpportunity = (type, suggData, price) => {
  let suggObj = _.mapKeys(suggData, function(value, key) {
    return 'sugg' + key.split(type)[1]
  })

  let suggRes = _.pick(suggObj, ['suggCmp', 'suggObs', 'suggExp', 'suggPartNumber', 'suggDescription', 'suggLastPrice'])
  // let opportunity = price != null & suggRes.suggLastPrice != null ? formatFloat((price - suggRes.suggLastPrice), 5) : null

  let { opportunity, opportunityPercent } = countOpportunity(price, suggRes.suggLastPrice)

  return {
    ...suggRes,
    opportunity: opportunity ? opportunity : 'NA',
    opportunityPercent,
    // opportunityPercent: opportunity != null && price && price > 0 ? formatFloat((opportunity / price), 2) + '%' : 'NA',
    suggFrom: type.toUpperCase(),
  }
}

/**
 * 做opportunity 計算
 * @param {*} lastPrice 最低價格
 * @param {*} suggCost 建議價格
 *
 * @returns {Object}
 *  opportunity: lastPrice - suggCost, 小數點取5位
 *  opportunityPercent: opportunity/lastPrice, 小數點取2位
 */
const countOpportunity = (lastPrice, suggCost) => {
  let opportunity = lastPrice != null && suggCost != null ? fixMath.fixedPoint((lastPrice - suggCost), 5) : null

  return {
    opportunity,
    opportunityPercent: opportunity != null && lastPrice && lastPrice > 0 ? fixMath.fixedPoint((opportunity / lastPrice) * 100, 2) + '%' : 'NA',
  }
}

module.exports = {
  newSpecList,
  calculatePrice,
  findSuggOpportunity,
  calSuggOpportunity,
  countOpportunity,
}
