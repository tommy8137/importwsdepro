const moment = require('moment')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const _ = require('lodash')
const UUID = require('uuid/v4')

const items = require('./itemsCtrl.js')
const cacheStore = require('./storeCache.js')
const spaAnalysis = require('./analysis.js')
const altAnalysis = require('./altAnalysis.js')

const importDataModel = require('../../model/xray/importData.js')
const multiAnalysisModel = require('../../model/xray/multiAnalysis.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const fixMath = require('../../helpers/math/math.js')
const { formatDate, formatFloat, asyncForEach, chunkArray, parseUniqDataByKey } = require('../../helpers/utils.js')
const xrayCalculateUtils = require('../../utils/xray/calculate.js')
const xrayLogicalUtils = require('../../utils/xray/logical.js')
const costUtils = require('../../utils/cost/exchangeRate')
const exangeRateUtils = require('../../utils/exchangeRateExport/utils')
const fileUtils = require('../../utils/importExcel/fileUtils.js')

const { supplyType, bomSupplyType } = require('../../../config')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xray import file for multiple analysis')

const filterTypeIList = ['MLCC', 'RES']
const defaltCurrency = ['RMB', 'NTD', 'JPY']
const chunkArrayLength = 100

const filterTypeI = (data) => {
  return data.filter(d => {
    if (d.typeI) return filterTypeIList.indexOf(d.typeI.toUpperCase()) < 0
  })
}

const parseType1 = (data) => {
  return _.uniq(_.map(data, (d) => {
    return d.typeI ? d.typeI.toUpperCase() : null
  }))
}

const parseType2 = (data) => {
  return _.uniq(_.map(data, (d) => {
    return d.typeII ? d.typeII.toUpperCase() : null
  }))
}

/**
 *
 * 檢查 spec rules 的 spec item 是否都為null
 *
 * @param {Object} specRules {
  type1: 'ASIC',
  type2: 'CLK-PLL',
  rules: [ 'spec01', 'spec02', 'spec03', 'spec08', 'spec15', 'spec22' ]}
 * @param {Object} specItems {
  item: '071.00304.000W',
  spec01: 'CLK BUFFER',
  spec02: '4', ... }
 */

const checkSpecItemIsNotNull = (specRules, specItems) => {
  let rules = _.pick(specRules, ['rules']).rules
  let flag = false

  rules.forEach((rule) => {
    if (specItems[rule] != null) flag = true
  })
  return flag
}

const onlyGetRule = (data) => {
  let specRules = _.omit(data, 'update_time', 'type1', 'type2')
  let spec = []

  Object.keys(specRules).map(k => {
    if (data[k] == 'Y') {
      let key = k.split('spec')[1]
      let specK = key >= 10 ? 'spec' + key : 'spec0' + key

      return spec.push(specK)
    }
  })

  return spec
}

const parseRules = (ceSpecGroup) => {
  return _.map(ceSpecGroup, (group) => {
    let specRuleslist = onlyGetRule(group)
    return {
      type1: group.type1,
      type2: group.type2,
      rules: specRuleslist,
    }
  })
}


/**
 * 將資料 做merge, for Opportunity PN List
 * @param {Array} data
 * @param {Array} mrpList 料號 & plant的mrp 需求量
 * @param {Array} cmpList 是CMP的料號list
 */
const mergeInfoData = (data, mrpList, cmpList) => {

  data.forEach((d, idx) => {
    // d['no'] = d.no ? d.no : idx + 1
    d['originalPrice'] = d.originalPrice ? fixMath.fixedPoint(d.originalPrice, 5) : null
    d['cmp'] = _.includes(cmpList, d['wistronPN']) ? 'Y' : 'N'

    d['supplyType'] = d && d.supplyType ? d.supplyType : '-' // multi partnumber excel 中並沒有plant資訊, 故先留'-'

    let mrp = _.find(mrpList, (mrp) => mrp.partnumber == d['wistronPN'])
    d['mrp'] = mrp ? fixMath.numberWithCommas(fixMath.fixedPoint(mrp.demand, 0)) : null
  })
}

/**
 *
 * @param {*} supplyTypeFilter 從supply type list filter出是這個料號的 supply type list, 可能有W, AV, S, A, B, C
 * @param {*} supplyTypeByOrder 依照 客戶所提供的 supply type 優先序 找到的supply type, ex: { supply_type: 'W', odm_oem: 'ODM' }
 */
const selectSupplyType = (supplyTypeFilter, supplyTypeByOrder) => {
  let supplyType = null

  if (supplyTypeByOrder && supplyTypeByOrder.supply_type ) {
    supplyType = supplyTypeByOrder.supply_type
  } else if (supplyTypeByOrder){
    supplyType = 'W'
  } else if (supplyTypeFilter.length > 0) {
    supplyType = supplyTypeFilter[0].supply_type
  }

  return supplyType
}

const selectOdmOem = (supplyTypeByOrder) => {
  return supplyTypeByOrder ? supplyTypeByOrder.odm_oem ? supplyTypeByOrder.odm_oem : 'ODM' : null
}

/**
 * 給 BOM/CMP 使用, mergr 此料號的資訊
 * @param {*} data
 * @param {*} priceList
 * @param {*} TypeList
 * @param {*} supplyTypeList
 */
const mergeInitDataInfo = (data, priceList, TypeList, supplyTypeList, descList) => {
  return _.chain(data)
    .map((d) => {
      let priceListByPn = _.filter(priceList, (p) => p.partnumber == d.wistronPN)
      let price = xrayLogicalUtils.getMinPriceByCurrency(_.orderBy(priceListByPn, ['price', 'valid_from', 'knumh'], ['asc', 'desc', 'desc']), {
        'partnumber': 'partnumber',
        'price': 'price',
        'originalCurrency': 'originalCurrency',
      })

      let type = _.find(TypeList, (t) => t.partnumber == d.wistronPN)

      let supplyTypeFilter = _.filter(supplyTypeList, (t) => t.partnumber == d.wistronPN)
      let supplyTypeByOrder = xrayLogicalUtils.supplyTypeByPerferredOrder(supplyTypeFilter, 'supply_type')
      let supplyType = selectSupplyType(supplyTypeFilter, supplyTypeByOrder)
      let odmOem = selectOdmOem(supplyTypeByOrder)

      let description = _.find(descList, (desc) => desc.item == d.wistronPN)

      return {
        ...d,
        purGroup: null,
        oemODM: odmOem,
        description: description ? description.partDesc : null,
        vendorName: price ? price.vendor_name : null,
        manufacturer: price ? price.manufacturer : null,
        vendorPN: price ? price.vendor_pn : null,
        currency: price ? price.currency : null,
        price: price ? formatFloat(price.price, 5) : null,
        validFrom: price ? price.valid_from : null,
        supplyType: supplyType,
        typeI: type ? type.type1 : null,
        typeII: type ? type.type2 : null,
      }
    })
    .filter(d => d.typeI && d.typeII)
    .value()
}

/**
 * 加總 這個group 的last price & suggestion cost by key
 * @param {*} dataSet
 * @param {*} key key-value的方式 用key的value為取 來源資料的價格, {
    lastPrice: 'price',
    suggCost: 'suggLastPrice',
  }
 */
const calLastPriceSuggCost = (dataSet, key) => {
  let lastPrice = 0, suggestionCost = 0
  _.forEach(dataSet, (data) => {
    lastPrice += data[key.lastPrice] ? formatFloat(data[key.lastPrice], 5) : 0

    if (data.suggLastPrice) {
      suggestionCost += data[key.suggCost] ? formatFloat(data[key.suggCost], 5) : 0
    }
  })

  return {
    lastPrice: formatFloat(lastPrice, 5),
    suggestionCost: formatFloat(suggestionCost, 5),
  }
}

/**
 * 以type2做分類整理的 function, return 這個分類的 價格與 opportunity 資訊
 * @param {*} data
 */
const summaryBySubType2 = (data) => {
  let subLastPrice = 0, subSuggestionCost = 0
  let subRes = _.chain(data)
    .groupBy(d => d.typeII)
    .map((d, k) => {

      let { lastPrice, suggestionCost } = calLastPriceSuggCost(d, {
        lastPrice: 'price',
        suggCost: 'suggLastPrice',
      })

      let { opportunity, opportunityPercent } = xrayCalculateUtils.countOpportunity(lastPrice, suggestionCost)
      subLastPrice += lastPrice
      subSuggestionCost += suggestionCost
      return {
        type1: d[0].typeI,
        type2: k,
        lastPrice: formatFloat(lastPrice, 5),
        suggestionCost: formatFloat(suggestionCost, 5),
        opportunity,
        opportunityPercent,
      }
    })
    .value()

  return {
    subRes: subRes.length > 0 ? _.sortBy(subRes, ['type2']) : [],
    subLastPrice,
    subSuggestionCost,
  }
}

/**
 * 以manufacturer & vendorName做分類整理的 function, return 這個分類的 價格與 opportunity 資訊
 * @param {*} data
 */
const summaryBySubVendor = (data) => {
  let splitMark = '|-|'
  let subLastPrice = 0, subSuggestionCost = 0
  let subRes = _.chain(data)
    .groupBy(d => d.manufacturer + splitMark + d.vendorName)
    .map((d, k) => {
      let { lastPrice, suggestionCost } = calLastPriceSuggCost(d, {
        lastPrice: 'price',
        suggCost: 'suggLastPrice',
      })
      let { opportunity, opportunityPercent } = xrayCalculateUtils.countOpportunity(lastPrice, suggestionCost)

      subLastPrice += lastPrice
      subSuggestionCost += suggestionCost

      return {
        type1: d[0].typeI,
        manufacturer: k.split(splitMark)[0],
        vendorName: k.split(splitMark)[1],
        lastPrice: formatFloat(lastPrice, 5),
        suggestionCost: formatFloat(suggestionCost, 5),
        opportunity,
        opportunityPercent,
      }
    })
    .value()

  return {
    subRes: subRes.length > 0 ? _.sortBy(subRes, ['manufacturer', 'vendorName']) : [],
    subLastPrice,
    subSuggestionCost,
  }
}
/**
 * 以typeI做分類整理的 function, return 這個分類的 價格與 opportunity 資訊
 * @param {*} dataSet
 * @param {*} subSummaryFunc typeI分類後的資料, 用哪個 function 繼續去做分類
 */
const summaryByTypeI = (dataSet, subSummaryFunc) => {

  if (dataSet.length > 0) {
    let res = {}
    let type1LastPrice = 0, type1SuggestionCost = 0

    _.chain(dataSet)
      .groupBy(d => d.typeI)
      .forEach((data, key) => {

        let { subRes, subLastPrice, subSuggestionCost } = subSummaryFunc(data)
        let { opportunity, opportunityPercent } = xrayCalculateUtils.countOpportunity(subLastPrice, subSuggestionCost)

        type1LastPrice += subLastPrice
        type1SuggestionCost += subSuggestionCost

        res[key] = {
          subItems: subRes,
          subTotalCost: {
            lastPrice: formatFloat(subLastPrice, 5),
            suggestionCost: formatFloat(subSuggestionCost, 5),
            opportunity,
            opportunityPercent,
          },
        }
      })
      .value()
    let { opportunity, opportunityPercent } = xrayCalculateUtils.countOpportunity(type1LastPrice, type1SuggestionCost)
    return {
      type1Cost: res,
      type1TotalCost: {
        lastPrice: formatFloat(type1LastPrice, 5),
        suggestionCost: formatFloat(type1SuggestionCost, 5),
        opportunity,
        opportunityPercent,
      },
    }
  } else {
    return {}
  }

}

/**
 * 過濾 不需要用的supply type key
 */
// const analysisSupplyType = () => {
//   // get supplyType for get items
//   let supplyTypeKey = {}
//   _.forEach(Object.keys(supplyType), (s) => {
//     if (_.includes(bomSupplyType, supplyType[s])) {
//       supplyTypeKey[s] = supplyType[s]
//     }
//   })

//   return supplyTypeKey
// }
/**
 *
 * @param {*} spa {key: 'AAA', data: [{}, {}]}
 * @param {*} alt {key: 'AAA', data: [{}, {}]}
 * @param {*} data { wistronPN: 'AAA', price: '0.1' }
 */
const calSuggOpportunity = (spa, alt, data) => {
  let spaOpportunity = xrayCalculateUtils.findSuggOpportunity('spa', data.wistronPN, {
    'partnumber': 'spaPartNumber',
    'price': 'spaLastPrice',
    'originalCurrency': 'spaOriginalCurrency',
    'cmp': 'spaCmp',
    'supplyType': 'spaSupplyType',
  }, spa)

  let altOpportunity = xrayCalculateUtils.findSuggOpportunity('alt', data.wistronPN, {
    'partnumber': 'altPartNumber',
    'price': 'altLastPrice',
    'originalCurrency': 'altOriginalCurrency',
    'cmp': 'altCmp',
    'supplyType': 'altSupplyType',
  }, alt)

  const defalutColumns = {
    ...spaOpportunity,
    ...altOpportunity,
    suggCmp: data.cmp,
    suggObs: null,
    suggExp: null,
    suggPartNumber: data.wistronPN,
    suggDescription: data.description,
    suggLastPrice: data.price,
    opportunity: 0,
    opportunityPercent: '0%',
    suggInAltGroup: 'N',
    suggFrom: 'Org. P/N',
  }

  if(!spa && !alt){
    // 如果spa 跟alt 都不存在
    return defalutColumns
  }

  if(
    (spaOpportunity.spaLastPrice && !altOpportunity.altLastPrice && (data.price == null || spaOpportunity.spaLastPrice < data.price)) ||
    (spaOpportunity.spaLastPrice && altOpportunity.altLastPrice &&
      (data.price == null && spaOpportunity.spaLastPrice <= altOpportunity.altLastPrice || spaOpportunity.spaLastPrice < data.price && spaOpportunity.spaLastPrice <= altOpportunity.altLastPrice))) {
    // 1. 如果spaOpportunity 存在
    //    a. last.price != null
    //    b. spa < last price
    // 2. 兩者都存在:
    //    a. last.price != null 且 spa <= alt
    //    b. spa < last price && spa <= alt
    // suggInAltGroup則判斷兩者partnumber是否為同一個
    let calRes = xrayCalculateUtils.calSuggOpportunity('spa', spaOpportunity, data.price)
    let suggInAltGroup = spa && alt && spa.spaPartNumber == alt.altPartNumber ? 'Y' : 'N'

    // 整合 spaOpportunity, altOpportunity, suggOpportunity, suggInAltGroup
    return Object.assign({}, defalutColumns, calRes, { suggInAltGroup })
  } else if (
    (!spaOpportunity.spaLastPrice && altOpportunity.altLastPrice && (data.price == null || altOpportunity.altLastPrice < data.price)) ||
  (spaOpportunity.spaLastPrice && altOpportunity.altLastPrice &&
    (data.price == null && altOpportunity.altLastPrice < spaOpportunity.spaLastPrice || altOpportunity.altLastPrice < data.price && altOpportunity.altLastPrice < spaOpportunity.spaLastPrice))) {
    // 1. 如果altOpportunity 存在
    //    a. last.price != null
    //    b. alt < last price
    // 2. 兩者都存在:
    //    a. last.price != null 且 alt < spa
    //    b. alt < last price && alt < spa
    let calRes = xrayCalculateUtils.calSuggOpportunity('alt', altOpportunity, data.price)

    // 整合 spaOpportunity, altOpportunity, suggOpportunity, suggInAltGroup
    return Object.assign({}, defalutColumns, calRes, { suggInAltGroup: 'Y' })
  } else {
    let suggInAltGroup = alt && data.wistronPN == alt.altPartNumber ? 'Y' : 'N'
    return Object.assign({}, defalutColumns, { suggInAltGroup: suggInAltGroup })
  }

}

/**
 * 取出 三個分析結果 中的original currency for exchange rate sheet
 * @param {*} originalList
 * @param {*} spaList
 * @param {*} altList
 */
const getCurrencies = (originalList, spaList, altList) => {
  logger.info('get data currency for exchange rate sheet')
  let origin = parseUniqDataByKey(originalList, 'originalCurrency')
  let spa = parseUniqDataByKey(spaList, 'spaOriginalCurrency')
  let alt = parseUniqDataByKey(altList, 'altOriginalCurrency')

  return _.without(_.uniq(_.concat(origin, spa, alt)), 'USD')
}

class Xray {
  static sortOutData(dataSet, header, fileName){
    // let parentFilterRes = _.filter(data, (dv)=>{return !dv.ParentsPartName})
    let perpareArr = []
    let sourcer_price_column = 'Q'

    for (const data of dataSet) {
      try {
        let obj = {}
        obj.file_name = fileName
        obj.no = data['No.'] ? data['No.'] : null
        obj.pur_group = data['Pur.Group'] ? data['Pur.Group'] : null
        obj.oem_odm = data['OEM/ODM'] ? data['OEM/ODM'] : null
        // obj.type1 = data['TypeI'] ? data['TypeI'] : null
        // obj.type2 = data['TypeII'] ? data['TypeII'] : null
        obj.wistron_pn = data['WistronP/N'] ? data['WistronP/N'] : null
        obj.description = data['Description'] ? data['Description'] : null

        obj.vendor_name = data['VendorName'] ? data['VendorName'] : null
        obj.manufacturer = data['Manufacturer'] ? data['Manufacturer'] : null
        obj.vendor_pn = data['VendorP/N'] ? data['VendorP/N'] : null
        obj.currency = data['Currency'] ? data['Currency'] : null
        obj.last_price = header[sourcer_price_column] && data[header[sourcer_price_column]] ? data[header[sourcer_price_column]] : null
        obj.valid_from = header[sourcer_price_column] ? header[sourcer_price_column] : null

        perpareArr.push(obj)
      } catch(err){
        logger.error('ERROR', err)
        logger.warn('sortOutData', data)
      }
    }
    return perpareArr
  }

  static async confirmSourcerData(data) {
    const colRules = [{
      key: 'no',
      errorCode: 'X000101',
    }, {
      key: 'oem_odm',
      errorCode: 'X000103',
    }, {
      key: 'pur_group',
      errorCode: 'X000102',
    }, {
      key: 'wistron_pn',
      errorCode: 'X000106',
    }, {
      key: 'description',
      errorCode: 'X000107',
    }, {
      key: 'last_price',
      errorCode: 'X000112',
    }]

    let { failmessage: failMessage, failRes, successRes } = fileUtils.confirmData(data, colRules)
    return {
      failMessage,
      failRes,
      successRes,
    }
  }

  static async confirmBomData(items) {
    const colRules = [{
      key: 'no',
      errorCode: 'X000101',
    }, {
      key: 'wistron_pn',
      errorCode: 'X000106',
    }]

    let { failmessage: failMessage, failRes, successRes } = fileUtils.confirmData(items, colRules)
    return {
      failMessage,
      failRes,
      successRes,
    }
  }

  static async insertTmpData(sortData){
    // let insertData = _.filter(sortData, (v) => v.pass)
    let chunkCalArray = chunkArray(sortData, chunkArrayLength)
    let uuid = UUID()

    await asyncForEach(chunkCalArray, async (dataElms) => {
      await importDataModel.insertImportData(dataElms, uuid)
    })

    return uuid
  }

  static async deleteTmpDataByID(uploadId){
    let client = await new tsystemDB()
    await importDataModel.deleteImportData(client, uploadId)
    await client.commit()
    return uploadId
  }

  static async fetchImportDataByID(uploadId) {
    let rawData = await importDataModel.selectImportData(uploadId)
    let importFile = await importDataModel.getImportFileName(uploadId)

    return {
      rawData,
      importFile,
    }
  }

  static async getCmpPartnumbers() {
    let res = await multiAnalysisModel.getCmpPartnumbers()
    return _.sortBy(res, ['wistronPN'])
  }

  static async getPurchaseOrgList() {
    let res = await multiAnalysisModel.getPurchaseOrgList()
    return _.map(res, 'purchase_org')
  }

  // get partnumbers 的 last price等資料
  static async getInitDataInfoAndPrice(rawData, purchaseOrg = null) {
    let data = []
    let chunkCalArray = chunkArray(rawData, chunkArrayLength)

    await asyncForEach(chunkCalArray, async (dataElms) => {
      let partnumbers = parseUniqDataByKey(dataElms)
      logger.info('getInitDataInfoAndPrice', partnumbers)

      let itemsCtrl = new items(partnumbers)

      let typesList = await itemsCtrl.getPartNumberTypes()
      let priceRes = await itemsCtrl.getPartNumberLastPrice(purchaseOrg)
      let descList = await itemsCtrl.getDescription()

      // 轉換幣別
      await xrayCalculateUtils.calculatePrice(priceRes)

      // get supplyType for get items
      let supplyTypeKey = xrayLogicalUtils.analysisSupplyType(supplyType, bomSupplyType)
      let plantList = await itemsCtrl.getPlantAndSupplyTypeAndOdmOem(Object.keys(supplyTypeKey), purchaseOrg)

      let res = mergeInitDataInfo(dataElms, priceRes, typesList, plantList, descList)

      // 200102 filter 掉 supply type 不是W AV, S的
      let filterSupplyTypeRes = xrayLogicalUtils.filterSupplyType(res)
      data = data.concat(filterSupplyTypeRes)
    })

    return _.sortBy(data, ['no', 'typeI', 'typeII'])
  }

  static async multiBomAnalysis(rawData, mrp, block, exp, cmp) {
    let data = filterTypeI(rawData)
    logger.info('start to multiAnalysis and data length', data.length)

    if(data.length > 0) {
      // filter 沒有last price, typeI, typeII 的料號, 不做SPA, ALT分析, Summary
      let analysisData = _.filter(data, (d) => d.price && d.typeI && d.typeII)

      // get spa raw data
      let spaRawData = await this.getSPARawData(analysisData, mrp, block, exp, cmp)
      let spaDataForSheet = xrayLogicalUtils.parseRawDataForSheet(spaRawData, 'spaLastPrice', 'spaPartNumber')

      // get alt raw data
      let partnumbers = parseUniqDataByKey(analysisData)
      // console.log(partnumbers)
      let altRawData = await this.getALTRawData(partnumbers)
      // logger.debug('filter ALT data by option', mrp, block, exp, cmp)
      let altfilterData = xrayLogicalUtils.filterRawDataByOption(altRawData, mrp, block, exp, cmp, {
        mrp: 'altMrp',
        obs: 'altObs',
        exp: 'altExp',
        cmp: 'altCmp',
      })
      let altDataForSheet = xrayLogicalUtils.parseRawDataForSheet(altfilterData, 'altLastPrice', 'altPartNumber')

      // get sheet - opportunity PN
      let opportunityPN = await this.getOpportunityPNList(data)
      let opportunityPNForSheet = this.opportunitySheet(opportunityPN, spaDataForSheet, altDataForSheet)

      // parse summary by typeI
      let summaryByType = this.summaryByType(opportunityPNForSheet)

      // parse summary by vendor
      let summaryByVendor = this.summaryByVendor(opportunityPNForSheet)

      // get lastPrice, SPA, ALT exchangeRateForSheet, ALT沒有raw data, 故是從 opportunityPNForSheet中有出現的altOriginalCurrency
      let currency = getCurrencies(opportunityPN, spaRawData, opportunityPNForSheet)
      let exchangeRateRes = await costUtils.getExchangeRateByDate(currency)
      let exchangeRateForSheet = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes)

      // get common exchange rate
      let defaltExchageRate = await costUtils.getExchangeRateByDate(defaltCurrency)
      let defaltExchageRateForSheet = await exangeRateUtils.parseExchangeRateForDefaultSheet(defaltExchageRate, defaltCurrency)

      return {
        spaDataForSheet,
        altDataForSheet,
        opportunityPN: opportunityPNForSheet,
        summaryByType,
        summaryByVendor,
        exchangeRate: exchangeRateForSheet.length > 0 ? exchangeRateForSheet : [],
        exchangeRateDefault: defaltExchageRateForSheet.length > 0 ? defaltExchageRateForSheet : [],
      }
    } else {
      throwApiError('X000202', errorCode.ERRORFORMAT)
    }
  }

  static async multiAnalysis(rawData, mrp, block, exp, cmp) {
    let data = filterTypeI(rawData)
    logger.info('start to multiAnalysis and data length', data.length)

    if(data.length > 0) {
      // get spa raw data
      let spaRawData = await this.getSPARawData(data, mrp, block, exp, cmp)
      let spaDataForSheet = xrayLogicalUtils.parseRawDataForSheet(spaRawData, 'spaLastPrice', 'spaPartNumber')

      // get alt raw data
      let partnumbers = parseUniqDataByKey(data)
      let altRawData = await this.getALTRawData(partnumbers)

      logger.debug('filter ALT data by option', mrp, block, exp, cmp)
      let altfilterData = xrayLogicalUtils.filterRawDataByOption(altRawData, mrp, block, exp, cmp, {
        mrp: 'altMrp',
        obs: 'altObs',
        exp: 'altExp',
        cmp: 'altCmp',
      })
      let altDataForSheet = xrayLogicalUtils.parseRawDataForSheet(altfilterData, 'altLastPrice', 'altPartNumber')

      // get sheet - opportunity PN
      let opportunityPN = await this.getOpportunityPNList(data)
      let opportunityPNForSheet = this.opportunitySheet(opportunityPN, spaDataForSheet, altDataForSheet)

      // parse summary by typeI
      let summaryByType = this.summaryByType(opportunityPNForSheet)

      // parse summary by vendor
      let summaryByVendor = this.summaryByVendor(opportunityPNForSheet)

      // get lastPrice, SPA, ALT exchangeRateForSheet, ALT沒有raw data, 故是從 opportunityPNForSheet中有出現的altOriginalCurrency
      let currency = getCurrencies(opportunityPN, spaRawData, opportunityPNForSheet)
      let exchangeRateRes = await costUtils.getExchangeRateByDate(currency)
      let exchangeRateForSheet = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes)

      // get common exchange rate
      let defaltExchageRate = await costUtils.getExchangeRateByDate(defaltCurrency)
      let defaltExchageRateForSheet = await exangeRateUtils.parseExchangeRateForDefaultSheet(defaltExchageRate, defaltCurrency)

      return {
        spaDataForSheet,
        opportunityPN: opportunityPNForSheet,
        summaryByType,
        summaryByVendor,
        exchangeRate: exchangeRateForSheet.length > 0 ? exchangeRateForSheet : [],
        exchangeRateDefault: defaltExchageRateForSheet.length > 0 ? defaltExchageRateForSheet : [],
      }
    } else {
      throwApiError('X000202', errorCode.ERRORFORMAT)
    }
  }

  /**
   *
   * @param {*} partNumbers ex: ['071.00304.000W', '71.00304.A0W']
   *
   * @returns {Array} ex: [{
      key: '071.00304.000W',
      data: [ [Object], [Object], [Object] ]
    }]
   */
  static async getALTRawData(rawPartNumbers) {

    logger.info('start to get ALT raw data', rawPartNumbers.length)
    let storeCache = new cacheStore()
    let altRawData = []
    let chunkCalArray = chunkArray(rawPartNumbers, chunkArrayLength)

    await asyncForEach(chunkCalArray, async (partNumbers) => {
    // let altGroupingList = [ { partNumber: '071.00304.000W', altnum: [ '71.06304.00W' ] }]
      let altGroupingList = await altAnalysis.getAltGroup(partNumbers)

      // get supplyType for get items
      let supplyTypeKey = xrayLogicalUtils.analysisSupplyType(supplyType, bomSupplyType)

      for(let i = 0; i < partNumbers.length; i++) {
        let altGrouping = _.find(altGroupingList, (group) => group.partNumber == partNumbers[i])
        if (altGrouping) {
          let altRes = await altAnalysis.getAltPrice(supplyTypeKey, partNumbers[i], storeCache, altGrouping.altnum)
          altRawData = _.concat(altRawData, altRes)
        }
      }
    })

    chunkCalArray = []
    storeCache.cleanCache()
    return altRawData
  }

  /**
   * get SPA Raw Data
   * @param {Array} data ex: [{
      typeI: 'ASIC',
      typeII: 'PCIE',
      wistronPN: '071.02043.0003'},... }]
   * @param {Array} partnumbers data中的partnumber list
   * @param {Boolean} exp true: expire 的料 也列入計算
   */
  static async getSPARawData(rawData, mrp, block, exp, cmp) {
    let spaRawData = []

    logger.info('start to get SPA raw data')
    let storeCache = new cacheStore()
    let chunkCalArray = chunkArray(rawData, chunkArrayLength)

    await asyncForEach(chunkCalArray, async (data) => {
      let partnumbers = parseUniqDataByKey(data)

      // new spa
      let typeI = parseType1(data)
      let typeII = parseType2(data)

      // 找相似料號的條件
      let rulesByType = await spaAnalysis.getCeSpecGroup(typeI, typeII)
      let typeRules = parseRules(rulesByType)

      // get partnumber 的specs
      let specItems = await spaAnalysis.getSpec(partnumbers)

      // get supplyType for get items
      let supplyTypeKey = xrayLogicalUtils.analysisSupplyType(supplyType, bomSupplyType)

      // get spa raw data by import wistron PN
      for(let i = 0; i < data.length; i++) {

        logger.debug(i, '-- start to get spa Raw Data with: ', data[i].wistronPN, data[i].typeI, data[i].typeII, '--')

        let rule = _.find(typeRules, (r) => r.type1.toUpperCase() == data[i].typeI.toUpperCase() && r.type2.toUpperCase() == data[i].typeII.toUpperCase() )
        let itemSpec = _.find(specItems, (s) => s.item == data[i].wistronPN)

        if (rule && itemSpec && checkSpecItemIsNotNull(rule, itemSpec)) {
          logger.debug('-- start --', data[i].wistronPN)

          let spaRes = await spaAnalysis.multiSPAAnalysis(data[i], itemSpec, rule, supplyTypeKey, mrp, block, exp, cmp, storeCache)
          spaRawData = _.concat(spaRawData, spaRes)

        } else {
          logger.debug(i, '-- typeI & typeII NOT FOUND CE spec rules', data[i].wistronPN, data[i].typeI, data[i].typeII, '--')
        }
      }
    })

    logger.info('get spa raw data length', spaRawData.length)
    chunkCalArray = []
    storeCache.cleanCache()
    return spaRawData
  }

  /**
   *
   * @param {*} data
   [ { no: 1,
    purGroup: 'S73',
    oemODM: 'ODM',
    typeI: 'ASIC',
    typeII: 'PCIE',
    wistronPN: '071.02043.0003',
    description: 'IC MULT/DEMU CBTL02043ABQ,115 DHVQFN 20P',
    vendorName: 'WPI',
    manufacturer: 'NXP',
    vendorPN: 'CBTL02043ABQ,115' },
   * @param {*} unit currency
   */
  static async getOpportunityPNList(data){
    let res = []

    let chunkCalArray = chunkArray(data, chunkArrayLength)
    await asyncForEach(chunkCalArray, async (dataElms) => {
      let partnumbers = parseUniqDataByKey(dataElms)
      logger.info('getOpportunityPNList', partnumbers)

      let itemsCtrl = new items(partnumbers)

      // get mrp
      let mrpList = await itemsCtrl.getMRP()

      // get cmp
      let cmpList = await itemsCtrl.getCommonPart()

      // get block
      // let blockList = await itemsCtrl.getBlock()

      // exchange rate for last price
      await xrayCalculateUtils.calculatePrice(dataElms)

      logger.debug('merge data with mrp, cmp, obs')
      mergeInfoData(dataElms, mrpList, cmpList)

      res = res.concat(dataElms)
    })

    logger.debug('total return opportunityPN length', data.length)
    chunkCalArray = []
    return res
  }

  static opportunitySheet(dataList, spaList, altList){
    logger.info('start to parse opportunity part number')

    return _.map(dataList, (data, idx) => {
      let spa = _.find(spaList, (spa) => spa.key == data.wistronPN )
      let alt = _.find(altList, (alt) => alt.key == data.wistronPN )

      let suggOpportunity = calSuggOpportunity(spa, alt, data)

      let no = data.no ? data.no : idx + 1
      return Object.assign({}, data, suggOpportunity, { 'no': no })
    })
  }

  static summaryByType(items){
    logger.info('start to parse summaryByType sheet data')
    let odm = items.filter(item => item.price && item.typeI && item.typeII && item.oemODM && item.oemODM.toUpperCase() == 'ODM')
    let oem = items.filter(item => item.price && item.typeI && item.typeII && item.oemODM && item.oemODM.toUpperCase() == 'OEM')

    let odmRes = summaryByTypeI(odm, summaryBySubType2)
    let oemRes = summaryByTypeI(oem, summaryBySubType2)

    return {
      ODM: odmRes,
      OEM: oemRes,
    }
  }

  static summaryByVendor(items){
    logger.info('start to parse summaryByVendor sheet data')
    let odm = items.filter(item => item.price && item.typeI && item.typeII && item.oemODM && item.oemODM.toUpperCase() == 'ODM')
    let oem = items.filter(item => item.price && item.typeI && item.typeII && item.oemODM && item.oemODM.toUpperCase() == 'OEM')

    let odmRes = summaryByTypeI(odm, summaryBySubVendor)
    let oemRes = summaryByTypeI(oem, summaryBySubVendor)

    return {
      ODM: odmRes,
      OEM: oemRes,
    }
  }
}

module.exports = Xray
