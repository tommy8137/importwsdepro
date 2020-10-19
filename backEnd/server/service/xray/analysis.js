const analysisModel = require('../../model/xray/analysis.js')
const xrayModel = require('../../model/xray/xray.js')

const { xraySupplyType: supplyTypeConfig } = require('../../../config')
const moment = require('moment')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const _ = require('lodash')
const xrayService = require('./xray')

const items = require('./itemsCtrl.js')
const { formatFloat, formatDate, asyncForEach, chunkArray } = require('../../helpers/utils.js')
const xrayCalculateUtils = require('../../utils/xray/calculate.js')
const xrayLogicalUtils = require('../../utils/xray/logical.js')
const fixMath = require('../../helpers/math/math.js')

const pallelNum = 100

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xray SPA Analysis service')


const calculatePriceDiff = (item, minPrice, priceKey, decimal = 3) => {
  if (fixMath.fixedPoint(item[priceKey.value], 5) <= 0) {
    item[priceKey.key] = '0%'
  } else {
    item[priceKey.key] = fixMath.fixedPoint((_.subtract(item[priceKey.value], minPrice) / minPrice * 100), decimal) + '%'
  }
}

/**
 * 補充料號資訊. partNumber Desc, spec item等
 *
 * @param {*} items 料號detail列表
 * @param {*} mlist 料號列表
 * @param {*} specKeys ['spec01', 'spce02']
 * @param {*} specOthers ['spec03', 'spec04', ...]
 */
const collateItemDetail = async (list, specKeys, specOthers) => {
  let collateRes = []

  if(list.length > 0) {
    list = list.sort(function(obj1, obj2) {
      return obj1.unitPrice - obj2.unitPrice
    })
    let minPrice = list[0].unitPrice

    let partNumbers = _.chain(list).map('partNumber').uniq().value()
    let specList = await analysisModel.getSpecByPartNumber(partNumbers)

    _.forEach(_.sortBy(list, ['unitPrice', 'partNumber']), (item) => {
      let spec = _.find(specList, d => d.item == item.partNumber)
      let res = {}
      if (spec) {
        let specKeysList = _.pick(spec, specKeys)
        let moreSpec = _.pick(spec, specOthers) // [...specKeys, 'scode', 'partNumber', 'partDesc', 'supply', 'plant'])

        calculatePriceDiff(item, minPrice, { key: 'priceDiff', value: 'unitPrice' })

        // collate item info
        res['infoList'] = {
          ...item,
          unitPrice: fixMath.fixedPoint(item.unitPrice, 5),
        }
        res['specList'] = specKeysList
        res['moreSpec'] = {
          ...specKeysList,
          ...moreSpec,
        }

        collateRes.push(res)
      }
    })
  }
  return collateRes
}

/**
 * retrun SPEC title by ME or EE
 * @param {*} productType ex: ["Notebook","Service BG"]
 * @param {*} role ex: ME
 * @param {*} type1 ex: Connector
 * @param {*} type2 ex: USB
 *
 * @returns {Object} ex: { spec1: 'Tooling', spec2: 'PIN', spec: null, .... }
 */
const getSpecTitle = async (productType, role, type1, type2) => {
  let productArr = []
  if(!Array.isArray(productType)){
    productArr.push(productType)
  } else {
    productArr = productType
  }

  let specTitleRes = await xrayModel.getSpecTitleByRole(role, type1, type2, productArr)
  if(role == 'ME' && specTitleRes.length > 0) {
    specTitleRes[0]['spec_t1'] = '產品別'
  }
  if (specTitleRes.length > 0) {
    return _.mapKeys(specTitleRes[0], (v, key) => {
      let specNum = key.split('spec_t')[1]
      return specNum < 10 ? 'spec0' + specNum : 'spec' + specNum
    })
  } else {
    let specTitle = {}
    _.range(1, 31).map(key => {
      let k = key >= 10 ? 'spec' + key : 'spec0' + key
      return specTitle[k] = null
    })
    if(role == 'ME') {
      specTitle['spec01'] = '產品別'
    }
    return specTitle
  }

}

const sortOutSPAData = async (spaData, orgPn) => {
  if (spaData.length > 0) {
    let specList = await analysisModel.getSpecByPartNumber(_.map(spaData, 'partNumber'))
    return _.map(spaData, (data) => {
      let spec = _.find(specList, d => d.item == data.partNumber)

      return {
        // spaPlant: data.plant,
        // spaMatnr: data.matnr,
        wistronPN: orgPn,
        spaPartNumber: data.partNumber,
        spaDescription: data.partDesc,
        spaManufacturer: data.manufacturer,
        spaVendor: data.vendor,
        spaVendorPN: data.vendorPN,
        spaSupplyType: data.supplyType,

        spaCurrency: data.currency,
        spaLastPrice: fixMath.fixedPoint(data.unitPrice, 5),
        spaOriginalCurrency: data.originalCurrency,
        spaOriginalPrice: fixMath.fixedPoint(data.originalPrice, 5),
        spaValidFrom: formatDate(data.datab),
        // spaPriceDiff: data.priceDiff,

        spaMrp: data.mrp ? fixMath.numberWithCommas(fixMath.fixedPoint(data.mrp, 0)) : null,
        spaCmp: data.isCommonPart ? 'Y' : 'N',
        spaObs: data.obs,
        spaExp: data.exp,
        ...spec,
      }
    })
  } else {
    return []
  }
}

/**
 * 由CE gruop中的rules, 整理 SPA尋找相似料號的spec
 * @param {*} spec { spec01: "10cm", spec02: "white", spec03: "20"...}
 * @param {*} rules [{ rules: ['spec01', 'spec02]}]
 *
 * @returns {*} ex: [{ spec1: ['10cm'], spec2: ['white'], spec3: [] }]
 */
const parseSpecWithRules = (spec, rules) => {
  let newSpec = xrayCalculateUtils.newSpecList()
  let rule = _.pick(rules, ['rules']).rules

  _.map(Object.keys(newSpec), (specKey) => {
    if(_.includes(rule, specKey)) {
      newSpec[specKey].push(spec[specKey])
    }
  })
  return newSpec
}

/**
 * 將typeI typeII, spec 組合成一個字串, for cache
 */
const combineStringForCache = (type1, type2, specItems) => {
  let specString = `type1=${type1}&type2=${type2}`

  Object.keys(specItems).forEach((k) => {
    let num = k.split('spec')[1]
    if (specItems[k] != null) {
      specString += `&spec${Number(num)}=${specItems[k]}`
    }
  })
  return specString
}

const sortOutData = (dataSet, mrpList, cmpList, blockList, descriptionList, supplyTypeList) => {
  let res = _.map(dataSet, (item) => {
    let mrp = _.find(mrpList, (mrpItem) => item.partNumber == mrpItem.partnumber)
    let desc = _.find(descriptionList, (l) => item.partNumber == l.item)

    let supplyTypeFilterRes = _.filter(supplyTypeList, (s) => item.partNumber == s.partnumber)
    let supplyTypeRes = xrayLogicalUtils.supplyTypeByPerferredOrder(supplyTypeFilterRes, 'supply_type')

    return {
      partNumber: item.partNumber,
      // plant: item.plant,
      partDesc: desc ? desc.partDesc : null,
      // matnr: item.matnr,
      manufacturer: item.manufacturer,
      supplyType: supplyTypeRes ? supplyTypeRes.supply_type : 'W', // xrayLogicalUtils.getSupplyType(supplyType.supply_type, supplyTypeMapping),
      vendor: item.vendorName,
      vendorPN: item.vendorPN,
      currency: item.currency,
      originalCurrency: item.originalCurrency,
      originalPrice: fixMath.fixedPoint(item.originalPrice, 5),
      exchangeRate: fixMath.fixedPoint(item.exchangeRate, 5),
      unitPrice: item.price,
      datab: item.datab,

      mrp: mrp ? fixMath.fixedPoint(mrp.demand, 0) : null,
      exp: item.datbi >= moment(new Date()).format('YYYY-MM-DD') ? 'N' : 'Y',
      isCommonPart: _.includes(cmpList, item.partNumber) ? true : false,
      obs: _.includes(blockList, item.partNumber) ? 'Y' : 'N',
    }
  })

  return res
}

const getInfoAndSortOut = async (partNumbers, spaPriceList, supplyTypeMapping, role = 'EE') => {
  let itemsCtrl = new items(partNumbers)

  // description
  let descriptionList = await itemsCtrl.getDescription()

  // cmp
  let cmpList = []
  if (role.toUpperCase() == 'EE') {
    cmpList = await itemsCtrl.getCommonPart()
  }

  // obs
  let blockList = await itemsCtrl.getBlock()

  // suppl type
  let supplyTypeList = await itemsCtrl.getSupplyTypeList(Object.keys(supplyTypeMapping))

  // mrp
  let mrpList = await itemsCtrl.getMRP()

  // step5: 轉匯率, 記住原始的幣別跟價格, if currency diff, exchange currency into USD
  await xrayCalculateUtils.calculatePrice(spaPriceList)

  // sort out
  logger.info('sortOutData', spaPriceList.length)
  let res = sortOutData(spaPriceList, mrpList, cmpList, blockList, descriptionList, supplyTypeList)
  return res
}

/**
 *
 * @param {*} list
 * @param {*} keyMapping ex: {
  mrp: 'mrp',
  obs: 'obs',
  exp: 'exp',
  cmp: null,
  price: 'unitPrice',
  partnumber: 'partNumber',
  validFrom: 'datab',
}
 * @param {*} option 是否對 mrp, obs, exp 做filter ex: {
   mrp: false,
  obs: false,
  exp: false,
 }
 * @param {Array} sortBy ['unitPrice', 'PartNumber']
 */
const mergeAndFilterSPA = (list, keyMapping, option, sortBy) => {

  let mrp = option.mrp ? option.mrp : false
  let block = option.block ? option.block : false
  let exp = option.exp ? option.exp : false
  let cmp = option.cmp ? option.cmp : {}

  logger.debug('filter data by options', mrp, block, exp, keyMapping)
  let filterData = xrayLogicalUtils.filterRawDataByOption(list, mrp, block, exp, cmp, keyMapping)
  logger.debug('filter data by options後長度', filterData.length)

  logger.debug('將相同 partnumber & unit price 合併成一個, call mergeSamePrice function', moment(new Date()).format('HH:mm:ss'))
  let mergeRes = xrayLogicalUtils.mergeSamePrice(filterData, keyMapping, sortBy)
  logger.debug('合併後的長度', mergeRes.length)

  return mergeRes
}

/**
 *
 * @param {*} data
 * @param {*} keyMapping ex: { key: 'spaPriceDiff', value: 'spaLastPrice' }
 */
const parsePriceDiff = (data, keyMapping) => {

  let minPrice = null
  if(data.length > 0) {
    let sortByData = _.sortBy(data, [keyMapping.value])
    minPrice = sortByData[0][keyMapping.value]
  }

  _.forEach(data, (spa) => {
    calculatePriceDiff(spa, minPrice, keyMapping, 2)
  })
}

class Xray {
  static async getCeSpecGroup(type1, type2) {
    let ceSpecGroup = await analysisModel.getCESpecGroupbyMultiType(type1, type2)
    return ceSpecGroup
  }

  static async getSpec(partNumbers){
    let chunkCalArray = chunkArray(partNumbers, 100)
    let res = []

    await asyncForEach(chunkCalArray, async (dataElms) => {
      let specItems = await analysisModel.getSpecByPartNumber(dataElms)

      res = res.concat(specItems)
    })

    return res
  }

  static async spaAnalysis(userID, role, productType, sourcer, type1, type2, dateFrom, dateTo, mrp, block, spec, referencePN, exp = false) {
    // if (dateTo == null || dateTo == '') dateTo = moment(new Date()).format('YYYY-MM-DD')
    logger.debug('xray spa Analysis:', type1, type2)
    await xrayService.checkViewPermissionByRole(userID, role)

    if (!SpecIsNotNull(spec) || _.isEmpty(type1) || _.isEmpty(type2)) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
    }

    let materialList = await this.getSPAPrice(role, type1, type2, spec, sourcer, supplyTypeConfig, exp)

    let keyMapping = {
      mrp: 'mrp',
      obs: 'obs',
      exp: 'exp',
      cmp: null,
      price: 'unitPrice',
      partnumber: 'partNumber',
      validFrom: 'datab',
    }
    let mergeRes = mergeAndFilterSPA(materialList, keyMapping, { mrp, block, exp }, ['unitPrice', 'PartNumber'])

    let specKeys = Object.keys(spec).filter((Num) => spec[Num].length > 0)
    let specOthers = Object.keys(spec).filter((Num) => spec[Num].length <= 0)

    materialList = await collateItemDetail(mergeRes, specKeys, specOthers)

    let specTitle
    if(role == 'ME') {
      specTitle = await getSpecTitle(spec.spec01, role, type1, type2)
    }else {
      specTitle = await getSpecTitle(productType, role, type1, type2)
    }

    let manufacturer = null
    if(referencePN) {
      manufacturer = await analysisModel.getPnManufacturer(referencePN)
    }

    return {
      referencePN: referencePN ? referencePN : null,
      manufacturer: manufacturer ? manufacturer : null,
      type1,
      type2,
      specProperty: specKeys,
      specOthers: [
        ...specKeys,
        ...specOthers,
      ],
      specTitle,
      infoProperty: [
        'partNumber',
        'partDesc',
        'manufacturer',
        'vendor',
        'vendorPN',
        'supplyType',
        'mrp',
        'currency',
        'unitPrice',
        'originalCurrency',
        'originalPrice',
        'datab',
        'priceDiff',
        'isCommonPart',
        'obs',
        'exp',
      ],

      minUnitPrice: Math.min.apply(Math, materialList.map(function(o) { return o.infoList.unitPrice })),
      maxUnitPrice: Math.max.apply(Math, materialList.map(function(o) { return o.infoList.unitPrice })),
      supplyTypeList: (materialList.length > 0) ? _.uniq(materialList.map(item => item.infoList.supplyType)) : [],
      materialList,
    }
  }

  static async multiSPAAnalysis(data, itemSpec, rule, supplyTypeKey, mrp, block, exp, cmp, storeCache) {
    let spec = parseSpecWithRules(itemSpec, rule)
    let specString = combineStringForCache(data.typeI, data.typeII, spec)

    // check have same SPA result
    let cacheRes = storeCache.findSameKey(specString)

    if (!_.isEmpty(cacheRes)) {
      logger.info('get spa data from cache', data.wistronPN)

      return _.map(cacheRes, (c) => {
        return {
          ...c,
          wistronPN: data.wistronPN,
        }
      })
    } else {
      // get SPA
      logger.info('get spa data from spaAnalysis', data.wistronPN)
      let spaPriceRes = await this.getSPAPrice('EE', data.typeI, data.typeII, spec, [], supplyTypeKey, exp)

      let spaSortOutData = await sortOutSPAData(spaPriceRes, data.wistronPN)
      let keyMapping = {
        mrp: 'spaMrp',
        obs: 'spaObs',
        exp: 'spaExp',
        cmp: 'spaCmp',
        price: 'spaLastPrice',
        partnumber: 'spaPartNumber',
        validFrom: 'spaValidFrom',
      }
      let spafilterData = mergeAndFilterSPA(spaSortOutData, keyMapping, { mrp, block, exp, cmp }, ['spaLastPrice', 'spaPartNumber'])

      parsePriceDiff(spafilterData, { key: 'spaPriceDiff', value: 'spaLastPrice' })

      storeCache.storeCache(specString, spafilterData)
      return spafilterData
    }
  }

  static async getSPAPrice(role, type1, type2, spec, sourcer, supplyTypeMapping, exp = true) {
    logger.debug('xray spa Analysis supply type:', Object.keys(supplyTypeMapping))

    // step1: 找到相似料號
    let materialItems = await analysisModel.getItembySpec(Object.keys(supplyTypeMapping), type1, type2, spec, role, sourcer)

    // step2: 切分 相似料號 是否太多
    let similarPns = _.chain(materialItems).map('partNumber').uniq().value()
    logger.debug(`similar partNumber length: ${similarPns.length}`)

    let resList = []
    if (similarPns.length > 0) {
      let chunkCalArray = chunkArray(similarPns, pallelNum)

      await asyncForEach(chunkCalArray, async (dataElms, idx) => {
        // step4: get Price
        logger.debug('-----------get item from', (idx * pallelNum), 'to', ((idx * pallelNum) + dataElms.length - 1), moment(new Date()).format('HH:mm:ss'), '---------')
        let spaPriceList = null
        // if(purchaseOrg == null) {
        spaPriceList = await analysisModel.getMinPartnumberBySlice(dataElms, exp)
        // } else {
        //   spaPriceList = await analysisModel.getMinPartnumberByPurchaseOrg(dataElms, purchaseOrg, exp)
        // }

        if (spaPriceList.length > 0) {
          // get info and sort Out
          let res = await getInfoAndSortOut(dataElms, spaPriceList, supplyTypeMapping, role)

          // step6: return response
          resList.push(...res)
          logger.debug('-----END------get item from', (idx * pallelNum), 'to', ((idx * pallelNum) + dataElms.length - 1), moment(new Date()).format('HH:mm:ss'), '---------')
        }
      })
    }

    return resList
  }

  /**
   * 將所抓到的supply type 做轉換, 如果為null 則轉換成W
   * supply type 為13時, 顯示 AV
   * @param {*} sapID supply type value
   */
  static getSupplyType(sapID, getSupplyType) {

    if (sapID == null) {
      return 'W'
    } else if(_.includes(Object.keys(getSupplyType), sapID)) {
      return getSupplyType[sapID]
    } else {
      logger.warn('can not find supply type key by supply id')
    }
  }

  static async lppAnalysis(userID, role, productType, sourcer, type1, type2, mrp, spec) {
  }
}

function SpecIsNotNull(specs) {
  return Object.keys(specs).map(s => specs[s].length > 0).find(t => t)
}


module.exports = Xray
