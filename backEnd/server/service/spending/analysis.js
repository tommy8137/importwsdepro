const spendingModel = require('../../model/spending/analysis.js')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const limitAmount = 9
const unitK = 1000

class Spending {
  static async chartMonthAnalysis(query) {
    const rawData = await spendingModel.getSpendingBaseTableGrouping(query)
    const rates = await spendingModel.getExchangeRate(moment(new Date()).format('YYYYMMDD'), null, ['USD', 'NTD'])
    // Currency handling
    addExchange(rates, rawData)
    // Group => Sum => Order => Rank
    const groupData = dataGrouping(query.selection, rawData)
    // Data limit 10 item
    const limti10 = dataLimiting(groupData)
    return {
      data: limti10,
    }
  }
}

function fixedPoint(value, n = 6) {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
}
function addExchange(rates, rawData) {
  return rawData.map((item, idx) => {
    // throw error if not exchange found
    let thisCurr = 'NTD'
    const rateNTD = (item.currency == thisCurr) ? { exchangerate: 1 } : rates.find(x => x.fcurr == item.currency && x.tcurr == thisCurr)
    if (!rateNTD) throwApiError(`${item.currency} to ${thisCurr} exchange rate not found`, errorCode.exchangeRateNotFound)
    rawData[idx].amountNTD = fixedPoint(item.po_price * rateNTD.exchangerate)
    thisCurr = 'USD'
    const rateUSD = (item.currency == thisCurr) ? { exchangerate: 1 } : rates.find(x => x.fcurr == item.currency && x.tcurr == thisCurr)
    if (!rateUSD) throwApiError(`${item.currency} to ${thisCurr} exchange rate not found`, errorCode.exchangeRateNotFound)
    rawData[idx].amountUSD = fixedPoint(item.po_price * rateUSD.exchangerate)
  })
}
function dataGrouping(selection, raw) {
  const groupData = (selection == 'group') ? _.groupBy(raw, 'vgname') : _.groupBy(raw, 'vbase')
  const kData = _.chain(groupData)
    .map((x, idx) => ({
      name: idx,
      amountNTD: fixedPoint(_.sumBy(x, 'amountNTD') / unitK),
      amountUSD: fixedPoint(_.sumBy(x, 'amountUSD') / unitK),
    }))
    .orderBy('amountNTD', 'desc')
    .map((x, idx) => ({ key: idx + 1, ...x }))
    .value()
  return kData
}
function dataLimiting(data) {
  const sum = data.reduce((a, b) => (a + b.amountNTD), 0)
  // split to 2
  let firstPart = data.slice(0, limitAmount)
  let restPart = data.slice(limitAmount, data.length)
  // if the rest more than 2, combine to one
  let last = (restPart.length > 1) ? restPart.reduce((a, b) => ({
    key: a.key,
    name: 'Others',
    amountNTD: fixedPoint(a.amountNTD + b.amountNTD),
    amountUSD: fixedPoint(a.amountUSD + b.amountUSD),
  })) : restPart.pop()
  if (last) firstPart.push(last) // push the rest back
  let pp = 0 // previous percentage, 前n-1個百分比總和
  const map10 = firstPart.map((x, idx) => {
    // the last one need to add the difference(100-pp)
    let currP = (idx == firstPart.length - 1) ? fixedPoint(100 - pp, 2) : fixedPoint(x.amountNTD / sum * 100, 2)
    pp += +(currP)
    return { ...x,  percentage: currP }
  })
  return map10
}

module.exports = Spending
