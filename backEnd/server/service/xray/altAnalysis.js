const _ = require('lodash')
const moment = require('moment')
const items = require('./itemsCtrl.js')
const altAnalysisModel = require('../../model/xray/altAnalysis.js')
const xrayCalculateUtils = require('../../utils/xray/calculate.js')
const xrayLogicalUtils = require('../../utils/xray/logical.js')

const { formatFloat, asyncForEach, chunkArray } = require('../../helpers/utils.js')
const fixMath = require('../../helpers/math/math.js')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('ALT service')

/**
 * 過濾 supply type為A, B, C的相似料號
 * @param {*} partnumbers 原始相似料號list
 */
const filterSuppyType = async (partnumbers, supplyType) => {
  let filterSupplyTypeRes = await altAnalysisModel.getSuppyType(Object.keys(supplyType), partnumbers)
  return _.map(filterSupplyTypeRes, 'partnumber')
}

/**
 * cache的key 將typeI typeII 與spec 做字串串接
 * @param {string} type1 'type1'
 * @param {string} type2 'type2'
 * @param {object} specItems '{spect01=DIP, spec02=WIREWOUND, ...}'
 *
 * @returns {string} 回傳typeI&typeII&spec的字串
 */
const combineStringForCache = (partnumbers) => {
  return _.sortedUniq(partnumbers).join(',')
}

const getInfoAndSortOut = async (partNumber, altPartnumbers, altPriceList, supplyTypeMapping) => {
  let itemsCtrl = new items(altPartnumbers)

  // step5: 轉匯率, 記住原始的幣別跟價格, if currency diff, exchange currency into USD
  await xrayCalculateUtils.calculatePrice(altPriceList)

  // obs
  let obsList = await itemsCtrl.getBlock()

  // cmp
  let cmpList = await itemsCtrl.getCommonPart()

  // suppl type
  let supplyTypeList = await itemsCtrl.getSupplyTypeList(Object.keys(supplyTypeMapping))

  // mrp
  // let plants = _.chain(supplyTypeList).map('plant').uniq().value()
  let mrpList = await itemsCtrl.getMRP()

  // sort out
  return sortOutData(partNumber, altPriceList, cmpList, mrpList, obsList, supplyTypeList)
}

const sortOutData = (partNumber, altList, cmpList, mrpList, blockList, supplyTypeList) => {
  let dateTo = moment(new Date()).format('YYYY-MM-DD')

  let res = []
  _.forEach(_.sortBy(altList, ['price']), (alt) => {
    let mrp = _.find(mrpList, (mrp) => alt.partNumber == mrp.partnumber)

    let supplyTypeFilterRes = _.filter(supplyTypeList, (s) => alt.partNumber == s.partnumber)
    let supplyTypeRes = xrayLogicalUtils.supplyTypeByPerferredOrder(supplyTypeFilterRes, 'supply_type')

    res.push({
      // altPlant: alt.plant,
      wistronPN: partNumber,
      altPartNumber: alt.partNumber,
      altDescription: alt.partDesc,
      altVendor: alt.vendorName,
      altManufacturer: alt.manufacturer,
      altVendorPN: alt.vendorPN,
      altSupplyType: supplyTypeRes ? supplyTypeRes.supply_type : 'W', // xrayLogicalUtils.getSupplyType(supplyType.supply_type, supplyTypeMapping),
      altCurrency: alt.currency,
      altLastPrice: formatFloat(alt.price, 5),
      altOriginalCurrency: alt.originalCurrency,
      altOriginalPrice: formatFloat(alt.originalPrice, 5),
      altValidFrom: alt.datab ? moment(alt.datab).format('YYYYMMDD') : null,
      altCmp: _.includes(cmpList, alt.partNumber) ? 'Y' : 'N',
      altMrp: mrp ? fixMath.numberWithCommas(fixMath.fixedPoint(mrp.demand, 0)) : null,
      altExp: alt.datbi < dateTo ? 'Y' : 'N',
      altObs: _.includes(blockList, alt.partNumber) ? 'Y' : 'N',
    })
  })
  return res
}

class Alt {
  /**
   *
   * @param {*} data partnummbers 要找alt group的partnumber
   */
  static async getAltGroup(data) {
    let spec = ['spec1', 'spec2']
    let res = []

    let chunkCalArray = chunkArray(data, 100)
    // await asyncForEach(this.partNumbers, async (partNumber) => {
    await asyncForEach(chunkCalArray, async (dataElms) => {

      await Promise.all(
        _.map(dataElms, async (partNumber, idx) =>{
          let altGroupList = await altAnalysisModel.getAltPartNumbers(partNumber, spec)
          if (altGroupList.length > 0) {
            res.push({
              partNumber,
              altnum: _.map(altGroupList, 'altnum'),
            })
          }
          return
        })
      )
    })
    return res
  }
  /**
   * 找出料號的 替代料 的價格與資訊
   *
   * @param {Object} supplyTypeMapping 只需要 替代料 supply type 不為 A,B, C的 ex: {
      '15': 'S',
      '13': 'AV',
      '14': 'W',
    }
   *
   * @param {String} partNumber 料號 ex: '071.00304.000W'
   * @param {Array} storeCache cache機制, 若料號的替代料相同時可以不需要重複尋找價格, array-object object的key: 相似料號組成的string, value: 這些替代料的結果
   * @param {Array} altPartnumbers 替代料: 此料號所可以替代的料號 ex: ['071.00304.00AQ', '071.00304.00A1']
   *
   * @returns {Array} 此料號的它替代料的所有價格 raw data ex: { key: '071.00304.000W', data: [ [Object], [Object], [Object] ] }
   */

  static async getAltPrice(supplyTypeMapping, partNumber, storeCache, altPartnumbers = []) {
    altPartnumbers = await filterSuppyType(altPartnumbers, supplyTypeMapping)

    // // step2: 過濾 alt partnumber 被block的
    // altPartnumbers = await filterOBS(altPartnumbers)

    if (altPartnumbers.length > 0) {
      logger.debug(partNumber, 'getAltPrice function start, and alt partnumbers', altPartnumbers)

      // step3: cache
      // step3-1: 組成cache key
      let pnsString = combineStringForCache(altPartnumbers)
      // step3-2: 拿到cache的資料後 回傳
      let findObject = storeCache.findSameKey(pnsString)
      if (!_.isEmpty(findObject)) {
        return _.map(findObject, (c) => {
          return {
            ...c,
            wistronPN: partNumber,
          }
        })
      }

      // step4: 找到 這些替代料的最低價(USD, NTD, RMB), 如果這些料 沒有合理價格裡面的最低價的話 return 預設值
      let altPriceList = []
      // if(purchaseOrg == null) {
      altPriceList = await altAnalysisModel.getAltPrice(altPartnumbers)
      // } else {
      //   altPriceList = await altAnalysisModel.getAltPriceByPurchaseOrg(altPartnumbers, purchaseOrg)
      // }

      if (altPriceList.length > 0) {
        // get info and sort Out
        let altRes = await getInfoAndSortOut(partNumber, altPartnumbers, altPriceList, supplyTypeMapping)

        // step6: 塞cache
        storeCache.storeCache(pnsString, altRes)

        // step7: return response
        logger.debug(partNumber, 'get alt price', altRes.length)
        return altRes
      } else {
        logger.debug(partNumber, 'get price', altPriceList.length)
        return []
      }
    } else {
      logger.debug(partNumber, 'before filterSuppyType altPartnumbers length', altPartnumbers.length)
      return []
    }
  }
}

module.exports = Alt
