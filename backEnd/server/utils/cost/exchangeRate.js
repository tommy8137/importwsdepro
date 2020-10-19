
const _ = require('lodash')
const moment = require('moment')
const analysisModel = require('../../model/xray/analysis.js')

module.exports = {
  /**
 * 找出 exchange rate by 時間 & currency
 * @param {*} currencyList ex: ['RMB', 'NTD', 'JPY']
 * @param {*} validDate ex: '20190924'
 */

  getExchangeRateByDate: async (currencyList, validDate = null) => {
    let date = null
    if (validDate) date = moment(validDate).format('YYYYMMDD')
    else date = moment().format('YYYYMMDD')

    if(currencyList && currencyList.length > 0){
      return await analysisModel.getExchangeRate(date, currencyList)
    } else {
      return []
    }
  },
}
