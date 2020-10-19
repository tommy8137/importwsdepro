
const _ = require('lodash')
const moment = require('moment')
const { formatFloat } = require('../../helpers/utils.js')

/**
 *
 * @param {*} rate ex: [{
  date: '20190301',
  fcurr: 'JPY',
  exchangeRate: '0.00900000000000000000'
}]
 * @param {*} unit ex: 'USD'
 * @retruns {Array} ex: [ [ 'JPY', 'USD', 0.009, '20190301' ]]
 */

const parseExchangeRateForSheet = (rate, unit = 'USD') => {

  let currency = []
  let exchangeRateList = []

  _.forEach(rate, (r) => {
    if (!_.includes(currency), r.fcurr) {
      currency.push(r.fcurr)
      exchangeRateList.push([r.fcurr, unit, formatFloat(r.exchangeRate, 5), moment(r.date).format('YYYYMMDD')])
    }
  })

  return exchangeRateList
}
/**
 * New exchange rate data format for using new export module
 * @param {*} rate ex: [{
  date: '20190301',
  fcurr: 'JPY',
  exchangeRate: '0.00900000000000000000'
}]
 * @param {*} unit ex: 'USD'
 * @retruns {Array} ex:
  [ { from: 'NTD',
    to: 'USD',
    sap_exchange_rate: 0.033,
    date: '20191101' },
  { from: 'RMB',
    to: 'USD',
    sap_exchange_rate: 0.142,
    date: '20191101' } ]
 */
const parseNewModuleExchangeRateForSheet = (rate, unit = 'USD') => {

  let currency = []
  let exchangeRateList = []

  _.forEach(rate, (r) => {
    if (!_.includes(currency), r.fcurr) {
      currency.push(r.fcurr)
      exchangeRateList.push({
        from: r.fcurr,
        to: unit,
        sap_exchange_rate: formatFloat(r.exchangeRate, 5),
        date: moment(r.date).format('YYYYMMDD'),
      })
    }
  })

  return exchangeRateList
}

/**
 * 將parseExchangeRateForDefaultSheet function return 的值
 * 轉換成sheet default exchange rate的格式
 *
 * @param {*} list [
  { date: '20190301',
    fcurr: 'NTD',
    exchangeRate: '0.03300000000000000000' },
  { date: '20190301',
    fcurr: 'RMB',
    exchangeRate: '0.15000000000000000000' } ]
 * @param {*} exchangeRateDefault ex: ['RMB', 'NTD']
 *
 * @returns {Array} ex: "exchangeRateDefaultList": [{
      exchange_rate: null,
      "RMB": 0.145,
    }, {
      exchange_rate: null,
      "NTD": 0.35,
    }],
 */
const parseExchangeRateForDefaultSheet = (exchangeRateDefault, currencies = ['RMB', 'NTD', 'JPY']) => {

  return _.map(currencies, (currency) => {
    let tmp = {}

    let rateRes = _.find(exchangeRateDefault, (rate) => rate.fcurr == currency)
    tmp['exchange_rate'] = null
    tmp[currency] = rateRes ? formatFloat(rateRes.exchangeRate, 5) : null

    return tmp
  })
}

module.exports = {
  parseExchangeRateForSheet,
  parseNewModuleExchangeRateForSheet,
  parseExchangeRateForDefaultSheet,
}
