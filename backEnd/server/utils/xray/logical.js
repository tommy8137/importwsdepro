
const _ = require('lodash')
const fixMath = require('../../helpers/math/math.js')
const { formatFloat } = require('../../helpers/utils.js')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xray logical utils')

const currencyPerferredOrder = ['USD', 'NTD', 'RMB', 'JPY']
const supplyTypePerferredOrder = ['W', 'AV', 'S', null]
const supplyTypeKeepList = ['W', 'AV', 'S']


/**
 * 如果資料中有cmp = 'Y'的資料, 如果沒有則回傳原始資料
 * @param {*} items
 * @param {*} cmpKey ex: spaCmp
 */

const commonPartByPreferredOrder = (items, cmpKey) => {
  let cmpRes = _.filter(items, (item) => item[cmpKey] == 'Y')
  if(cmpRes.length > 0) {
    return cmpRes
  }
  return items
}
/**
 * 找到最低的價格, 最低價會依據 partnumber排序的第一筆
 * 2019/12/31 更新為 改用CMP = Y, and supply type 的排序
 *
 * @param {*} data
 * @param {*} mappingKey ex: {
  partnumber: spaPartNumber,
  originalCurrency: spaOriginalCurrency,
  cmp: spaCmp,
  supplyType: spaSupplyType,
  price: spaLastPrice,
  }
 */
const getMinPriceByPreferredOrder = (data, mappingKey) => {
  let minPriceList = _.groupBy(data, m => m[mappingKey.price])
  let minPrice = _.min(Object.keys(minPriceList))
  let listCollatedByCMP = commonPartByPreferredOrder(minPriceList[minPrice], mappingKey.cmp)
  let sortOutData = _.sortBy(listCollatedByCMP, [mappingKey.partnumber])

  let dataByPerferredOrder = supplyTypeByPerferredOrder(sortOutData, mappingKey.supplyType)

  if(dataByPerferredOrder) return dataByPerferredOrder
  else return sortOutData[0]
}

/**
 * get 最低價格, order by 幣別, 用於找最低價時 同一組料號有中有多個Mpn料號 都為同為最低價
 * @param {*} data
 * @param {*} mappingKey
 */
const getMinPriceByCurrency = (data, mappingKey) => {
  let minPriceList = _.groupBy(data, m => m[mappingKey.price])
  let minPrice = _.min(Object.keys(minPriceList))

  // order by Wistron partnumber 由小至大
  let lowerPartnumber = _.chain(minPriceList[minPrice])
    .orderBy(mappingKey.partnumber, ['asc'])
    .groupBy(m => m[mappingKey.partnumber])
    .map((v) => {
      // 依 原始幣別優先序做選擇
      let origin = originalByPerferredOrder(v, mappingKey.originalCurrency)

      if(origin) return origin
      else return v[0]
    })
    .slice(0, 1)
    .value()

  return lowerPartnumber[0]
}

const originalByPerferredOrder = (arr, originalCurrencyKey) => {
  for (let i = 0; i < currencyPerferredOrder.length; i++){
    let inOrderArr = _.find(arr, (a) => a[originalCurrencyKey] == currencyPerferredOrder[i])
    if(inOrderArr) {
      return (inOrderArr)
    }
  }
}

const filterSupplyType = (data) => {
  return data.filter(r => _.includes(supplyTypeKeepList, r.supplyType))
}

const supplyTypeByPerferredOrder = (arr, supplyTypeKey) => {
  for (let i = 0; i < supplyTypePerferredOrder.length; i++){
    let inOrderArr = _.find(arr, (a) => a[supplyTypeKey] == supplyTypePerferredOrder[i])
    if(inOrderArr) {
      return (inOrderArr)
    }
  }
  return null
}

const removeNoNeedKey = (data, keys = []) => {
  return data.map((v) => {
    return _.omit(v, keys)
  })
}

/* ex:
[{
   data: [{
      "spaPartNumber": "071.10224.0003",
      "spaDescription": "IC DP/USB DEMUX TS3DS10224RUKR WQFN 20P",
      "spaVendor": "WINTECH",
      "spaManufacturer": "TI",
      ...
    }, {
      "spaPartNumber": "071.10224.0003",
      "spaDescription": "IC DP/USB DEMUX TS3DS10224RUKR WQFN 20P",
      "spaVendor": "WINTECH",
      "spaManufacturer": "TI",
      ...
  }],
  key: "5050001900G$CA",
}]

191211: 限制輸出資料數量為最低價排序後五筆
*/
const parseRawDataForSheet = (rawData, sortByPriceKey, sortByNameKey) => {
  let sheetRes = _.chain(rawData)
    .groupBy(d => d.wistronPN)

    .map((data, key) => {
      return {
        key,
        data: _.sortBy(data, [sortByPriceKey, sortByNameKey]).slice(0, 5),
      }
    })
    .value()

  return sheetRes
}

/**
 *
 * @param {*} rawData
 * @param {Boolean} mrp true: 結果有需求以及沒有需求的p/n, false: 結果只列出有需求的p/n
 * @param {Boolean} obs true: 在PLM被禁用以及沒有被禁用的p/n, false: 結果只列出沒有被禁用的p/n
 * @param {Boolean} exp true: 沒有在維護的物料也一併列入SPA分析作價格比較, false: 只呈現目前有在維護的
 * @param {Object} cmp { 'Y': true, 'N': false }, Y: 結果是否列出CMP為Y的p/n, N: 結果是否列出CMP為N的p/n
 * @param {*} keyMapping 共用function, 所以用keyValue的方式, 找到 rawData的值, key: 要抓取什麼值, value: rawData中的key值
 ex: {
    mrp: 'spaMrp',
    obs: 'spaObs',
    exp: 'spaExp',
    cmp: 'spaCmp', // or null 代表不需要做CMP的 filter
  }
 *
 */
const filterRawDataByOption = (rawData, mrp, obs, exp, cmp, keyMapping) => {
  // mrp
  if(!mrp) rawData = _.filter(rawData, (data) => data[keyMapping['mrp']])

  // block
  if(!obs) rawData = _.filter(rawData, (data) => data[keyMapping['obs']] == 'N')

  // exp
  if(!exp) rawData = _.filter(rawData, (data) => data[keyMapping['exp']] == 'N')

  if (keyMapping.cmp) {
    // cmp
    let isCmpRes = [], isNotCmpRes = []
    if(cmp.Y) isCmpRes = _.filter(rawData, (data) => data[keyMapping.cmp] == 'Y')

    if(cmp.N) {
      isNotCmpRes = _.filter(rawData, (data) => data[keyMapping.cmp] == 'N')
    }

    return _.concat(isCmpRes, isNotCmpRes)
  } else {
    return rawData
  }
}

/**
 * 將相同 partnumber & unit price 合併成一筆資料
 * 料號的 資訊(vendor, vendorName...) 採用價格為最新的那一筆資料
 *
 * @param {*} list 料號列表
 * @param {Object} keyMapping {
  price: 'unitPrice',
  partnumber: 'partNumber',
  validFrom: 'datab'
}
 * @param {Arrya} sortByKey ['unitPrice', 'PartNumber']
 */
const mergeSamePrice = (list, keyMapping, sortByKey) => {

  if (list.length > 0) {
    return _.chain(list)
      .groupBy(v => v[keyMapping['partnumber']] + '-' + fixMath.fixedPoint(v[keyMapping['price']], 5))
      .map((v) => {
        // 取相同partNumber-unitPrice group中的最新的那一筆資料
        return _.maxBy(v, (o) => o[keyMapping['validFrom']])
      })
      .filter(x => !!x)
      .sortBy(sortByKey)
      .value()
  }
  return []
}

/**
 * 將所抓到的supply type 做轉換, 如果為null 則轉換成W
 * supply type 為13時, 顯示 AV
 * @param {*} sapID supply type value
 */
const getSupplyType = (sapID, getSupplyType) => {
  // console.log('utils', 'getSupplyType')
  if (sapID == null) {
    return 'W'
  } else if(_.includes(Object.keys(getSupplyType), sapID)) {
    return getSupplyType[sapID]
  } else {
    logger.warn('can not find supply type key by supply id')
  }
}

/**
 * 過濾 不需要用的supply type key
 */
const analysisSupplyType = (originSupplyType, needSupplyType) => {
  // get supplyType for get items
  let supplyTypeKey = {}
  _.forEach(Object.keys(originSupplyType), (s) => {
    if (_.includes(needSupplyType, originSupplyType[s])) {
      supplyTypeKey[s] = originSupplyType[s]
    }
  })

  return supplyTypeKey
}

module.exports = {
  getMinPriceByPreferredOrder,
  getMinPriceByCurrency,
  parseRawDataForSheet,
  filterRawDataByOption,
  mergeSamePrice,
  getSupplyType,
  supplyTypeByPerferredOrder,
  filterSupplyType,
  analysisSupplyType,
}
