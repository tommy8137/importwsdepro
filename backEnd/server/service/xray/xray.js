require('core-js/modules/es.promise')
require('core-js/modules/es.string.includes')
require('core-js/modules/es.object.assign')
require('core-js/modules/es.object.keys')
require('core-js/modules/es.symbol')
require('core-js/modules/es.symbol.async-iterator')
require('regenerator-runtime/runtime')
const xrayModel = require('../../model/xray/xray.js')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const path = require('path')
const XlsxPopulate = require('xlsx-populate')
const moment = require('moment')
const rbacService = require('../admin/rbac.js')
const fs = require('fs')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Xray Service')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const fixMath = require('../../helpers/math/math.js')
const { type1InFilter, type12InFilter } = require('../../utils/dirty/dirty_filter')
const costUtils = require('../../utils/cost/exchangeRate')
const exangeRateUtils = require('../../utils/exchangeRateExport/utils')
const exchangeRateSheet = require('../../utils/exchangeRateExport/exchangeRate.js')
const commonCalculate = require('../../utils/xray/calculate.js')
const { opportunityPN, summaryByType, summaryByVendor, importFile, importDate, unit, exchangeRateDefault, exchangeRate, spaDataForSheet } = require('../../../test/unit/dataFrame/xray-data.js')
require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');

const genExcel = require('exceljs/dist/es5');
const { xraySummaryHeader } = require('../../utils/excelHeader/getXraySummaryHeader.js')
const { Excel } = require('../../utils/dataFrame/excel')
const excelColumnName = require('excel-column-name')

/**
 * 回傳一個所有spec都為空的 Object
 * @returns {Object} ex: { spec01: [], spec02: [], spec03: []...}
 */
// const newSpecList = () => {
//   // return Array.from(Array(30).keys()).reduce((o, key) => {
//   //   key += 1
//   //   key = key >= 10 ? 'spec' + key : 'spec0' + key
//   //   return { ...o, [key]: [] }
//   // }, {})

//   let nullSpec = {}
//   _.range(1, 31).map(key => {
//     let k = key >= 10 ? 'spec' + key : 'spec0' + key
//     return nullSpec[k] = []
//   })

//   return nullSpec
// }

/**
 * 調整spec 順序, 由英文字母(不分大小寫)->數字->其他
 * @param {*} values
 */
const compare = (values) => {

  let obs = []
  let regex = /^[a-zA-Z].*$/

  _.forEach(values, (value) => {
    let stringHeader = null
    let numberHeader = null

    if(regex.test(value.replace(/\n/g, ''))) {
      stringHeader = value.toLowerCase()
    } else {
      numberHeader = value.replace(/\'/g, '')
    }

    obs.push({
      value: value,
      stringHeader: stringHeader ? stringHeader : null,
      numberHeader: numberHeader ? numberHeader.toString() : null,
    })
  })


  return _.map(_.orderBy(obs, ['stringHeader', 'numberHeader'], ['asc', 'asc']), 'value')
}

/**
 * 將spec list 的資料做整理
 * @param {Array} items ex: [ { spec01: 'CPBG', spec02: 'AIO' }, { spec01: 'CPBG', spec02: 'DT' },...]
 *
 * @returns {Object} ex: { spec01: [ 'CPBG'], spec02: ['AIO', 'DT'], ...}
 */
const collateSpecList = (items) => {
  let speclist = {}

  if (items.length > 0) {
    _.map(Object.keys(items[0]), (key) => {
      let value = _.chain(items)
        .map(key)
        .uniq()
        .filter(v => !!v)
        .value()

      speclist[key] = compare(value)
    })
  }

  return speclist
}

/**
 *
 * @param {Array} groupScode ex: [ { g_id: 2962, scode: 'S01' }...]
 * @param {Array} groupSpec ex: [ { g_id: 2962, spec: 1, item: 'CPBG' }...]
 *
 * @returns {Object} sourcer ex: { '2962': ['S01', ...] }
 * @returns {Object} spec ex: { '2962': { spec01: ['CPBG', ...], } }
 */
const getGroupInfo = (groupScode, groupSpec) => {

  let sourcer = {}
  _.chain(groupScode)
    .groupBy(s => s.g_id)
    .map((v, k) => {
      sourcer[k] = _.map(v, 'scode')
    })
    .value()

  let spec = {}
  _.chain(groupSpec)
    .groupBy(s => s.g_id)
    .map((value, k) => {
      _.chain(value)
        .groupBy(v => v.spec)
        .map((v, key) => {
          let specKey = key >= 10 ? 'spec' + key : 'spec0' + key
          spec[k] = {
            ...spec[k],
            [specKey]: _.map(v, 'item'),
          }
        })
        .value()
    })
    .value()

  return {
    sourcer,
    spec,
  }
}

/**
 * 將spa spec rule 的資料做整理
 * @param {Object} spa spec rule ex: { type1: 'Connector', type2: 'FPC', spec1: null, spec2: 'Y', ... }
 *
 * @returns {Array} ex: [ true, false, ... ]
 */

const onlyGetRule = (data) => {
  if (!_.isEmpty(data)) {
    let specRules = _.omit(data, 'type1', 'type2', 'update_time')
    return Object.keys(specRules).map(k => {
      return data[k] == 'Y'
    })
  } else {
    return _.range(1, 31).map(key => {
      return false
    })
  }
}

/**
 * 拿到exchange rate的資料
 * @param {Array} items ex: [ { last_price_currency: 'USD', ...}, { last_price_currency: 'RMB', ...},...]
 *
 * @returns {Object} ex: { exchangeRate: [ ['NTD', 0.21], [...]], defaultExchangeRate: [[0.141], [0.2], [0.113]]}
 */
const getExchangeRateSheet = async (detail) => {
  let currency = []
  let exchangeRateForSheet = []
  let exchangeRateDefaultValue = []
  let exchangeRateDefaultList = []
  let defaultList = ['RMB', 'NTD', 'JPY']
  let refresh_time = moment(new Date()).format()
  if (detail.length > 0) {

    _.forEach(detail, (data) => {

      // last currency & pcb currency
      if(data.last_price_currency && data.last_price_currency != 'USD' && currency.indexOf(data.last_price_currency) < 0) {
        currency.push(data.last_price_currency)
      }
    })
  }

  if(currency.length > 0 && refresh_time) {
    // get exchange_rate by date
    let exchangeRateRes = await costUtils.getExchangeRateByDate(currency, moment(refresh_time).tz('Asia/Taipei').format('YYYYMMDD'))
    exchangeRateForSheet = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes, 'USD')
  // get
  }

  // defalt JPY, NTD, RMB
  if(refresh_time) {
    let exchangeRateRes = await costUtils.getExchangeRateByDate(defaultList, moment(refresh_time).tz('Asia/Taipei').format('YYYYMMDD'))
    exchangeRateDefaultValue = exangeRateUtils.parseNewModuleExchangeRateForSheet(exchangeRateRes, 'USD').reverse()

    _.map(defaultList, (i, idx) => {
      let tmp = {}
      tmp['exchange_rate'] = null
      tmp[i] = exchangeRateDefaultValue[idx].sap_exchange_rate
      exchangeRateDefaultList.push(tmp)
    })
  }

  return {
    exchangeRate: exchangeRateForSheet,
    defaultExchangeRate: exchangeRateDefaultList,
  }
}



/**
 * 判斷 specOriginalItem 是否存在於speclist 中, 如果有 spec item 中的 value 就會是true
 * @param {Object} specOriginalItem ex: { spec01: ['D-SUB', 'D-Sub', 'D-sub', 'DVI'], spec02: [], ... }
 * @param {Object} speclistFromGroup ex: { spec01: [ 'D-SUB', 'DVI' ] }
 * @param {Boolean} alwaysTrue true 就不需要判斷 value, specOriginalItem中 的spec item 都為勾選的內容
 *
 * @returns {Array} ex: { spec01: [{ "item_name": "D-SUB", "value": true }, { "item_name": "D-Sub", "value": false }], spec02: [] ...}
 */

const collateSpecItemValue = (specOriginalItem, speclistFromGroup, alwaysTrue = false) => {

  let newSpecGrouplist = commonCalculate.newSpecList()

  Object.keys(specOriginalItem).forEach((key) => {
    if (specOriginalItem[key].length > 0) {
      specOriginalItem[key].forEach((s) => {
        let value = true

        if (!alwaysTrue) {
          value = (speclistFromGroup[key] && speclistFromGroup[key].length > 0) ? speclistFromGroup[key].includes(s) ? true : false : false
        }

        newSpecGrouplist[key].push({
          item_name: s,
          value,
        })
      })
    }
  })

  return newSpecGrouplist
}

const collateSpecForRefPN = (specOriginalItem, speclistByPN, CESpecGroup = []) => {

  let newSpecGrouplist = commonCalculate.newSpecList()

  Object.keys(specOriginalItem).forEach((key, idx) => {
    if (specOriginalItem[key].length > 0) {

      specOriginalItem[key].forEach((s) => {
        let isItemSpec = (speclistByPN[key] && speclistByPN[key].length > 0) ? speclistByPN[key].includes(s) ? true : false : false


        newSpecGrouplist[key].push({
          item_name: s,
          isHighlight: isItemSpec,
          value: CESpecGroup[idx],
        })
      })
    }
  })

  return newSpecGrouplist
}

class Xray {
  static async fetchProductType(userID, role) {
    await this.checkViewPermissionByRole(userID, role)

    let productType = await xrayModel.getProductTypeByRole(role)
    let list = _.map(productType, 'product_type')
    return list
  }

  static async fetchTypeI(userID, role, productType) {
    await this.checkViewPermissionByRole(userID, role)

    let type1 = await xrayModel.getTypeI(role, productType)
    let res = await this.getType1InPerm(userID, role, _.map(type1, 'type1'))

    // this is fucking stupid & dirty code
    //
    if (role.toUpperCase() == 'ME') {
      res = res.filter((e) => type1InFilter(e))
    }


    return _.chain(res).uniq().sortBy().value()

  }

  static async fetchTypeII(userID, role, productType, type1) {
    await this.checkViewPermissionByRole(userID, role)
    await this.checkType1Permission(userID, role, type1)

    let type2 = await xrayModel.getTypeII(role, type1, productType)
    let list = _.map(type2, 'type2')

    // this is fucking stupid & dirty code
    //
    if (role.toUpperCase() == 'ME') {
      list = list.filter((e) => type12InFilter(type1, e))
    }

    return list
  }

  static async fetchSourcers(userID, role, productType, type1, type2) {
    await this.checkViewPermissionByRole(userID, role)
    await this.checkType1Permission(userID, role, type1)

    let sourcers = await xrayModel.getSourcer(role, type1, type2, productType)
    return {
      sourcerList: sourcers,
    }
  }

  static async fetchSpecTitle(userID, role, type1, type2, productType) {
    await this.checkViewPermissionByRole(userID, role)
    if (!role || (role.toUpperCase() != 'ME' && role.toUpperCase() != 'EE')) {
      throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
      return
    } else if (!type1 || !type2) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
      return
    }

    let specTitle = await xrayModel.getSpecTitleByRole(role, type1, type2, productType)
    let specTitleArray = specTitle.length > 0 ? Object.values(specTitle[0]) : Array.from(Array(30)).map(() => null)

    if(role.toUpperCase() == 'ME') {
      if(productType.length <= 0) {
        specTitleArray = Array.from(Array(30)).map(() => null)
      }
      specTitleArray.splice(0, 0, '產品別')
      return specTitleArray
    }else {
      return specTitle.length > 0 ? Object.values(specTitle[0]) : Array.from(Array(30)).map(() => null)
    }

  }

  static async fetchSpecItemsForEE(userID, productType, type1, type2, sourcer) {
    await this.checkViewPermissionByRole(userID, 'EE')
    await this.checkType1Permission(userID, 'EE', type1)

    let specItems = await xrayModel.getSpecItemForEE(productType, type1, type2, sourcer)
    let specTitle = await this.fetchSpecTitle(userID, 'EE', type1, type2, null)
    let ceSpecGroup = await xrayModel.getCESpecGroupbyType(type1, type2)
    let specRuleslist = onlyGetRule(ceSpecGroup)

    let spec
    if (specItems.length > 0 ) {
      spec = collateSpecList(specItems)
    } else {
      spec = commonCalculate.newSpecList()
    }
    return {
      spec: spec,
      specTitle,
      ceSpecGroup: specRuleslist,
    }
  }

  static async fetchSpecItemsForME(userID, productType, type1, type2, sourcer, specN, spec) {
    await this.checkViewPermissionByRole(userID, 'ME')
    await this.checkType1Permission(userID, 'ME', type1)

    // check spec
    for (let i = specN - 1; i >= 1; i--) {
      let specKey = i < 10 ? `spec0${i}` : `spec${i}`

      if (_.isEmpty(spec[specKey])) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
      }
    }

    let specItems = await xrayModel.getSpecItemForME(type1, type2, sourcer, specN, spec, productType)
    let specTitle = await this.fetchSpecTitle(userID, 'ME', type1, type2, spec.spec01)
    let specNitem = []
    let specKeyName = specN < 10 ? `spec0${specN}` : `spec${specN}`
    if (specItems.length > 0) {
      specNitem = compare(_.chain(specItems)
        .map(`spec${specN}`)
        .uniq()
        .filter(v => !!v)
        .value())
    }

    return {
      spec: specNitem,
      key: specKeyName,
      specTitle,
    }
  }

  static async addSpecGroup(userID, role, specGroupName, productType, type1, type2, sourcerList, specList) {
    await this.checkViewPermissionByRole(userID, role)

    let checkSpecGroup = await xrayModel.checkSpecGroup(userID, specGroupName, role)

    if (checkSpecGroup) {
      // search bar
      if (productType.length > 0) {
        productType = productType.join(';')
      } else {
        productType = null
      }

      try {
        let client = await new tsystemDB()
        let specGroup = await xrayModel.postSpecGroup(client, userID, role, specGroupName, type1, type2, productType)

        if (!_.isEmpty(specGroup)) {
          let specGroupID = specGroup.g_id

          // sourcer
          if (sourcerList.length > 0) {
            let values = sourcerList.map((s) => ({
              g_id: specGroupID,
              scode: s,
            }))
            await xrayModel.postSpecGroupSourcer(client, values)
          }

          // spec
          let insertValue = []
          _.map(Object.keys(specList), (key) => {
            if (specList[key].length > 0) {
              let specNum = parseInt(key.toLowerCase().split('spec')[1])
              specList[key].map((item) => insertValue.push({
                g_id: specGroupID,
                spec: specNum,
                item: (/\'/).test(item) ? item.replace(/\'/g, '\'\'') : item,
              }))
            }
          })

          if (insertValue.length > 0) {
            await xrayModel.postSpecGroupSpec(client, insertValue)
          }

          await client.commit()
          return {
            specGroupID,
          }

        } else {
          throwApiError('add group error', errorCode.ERRORFORMAT)
        }
      } catch (err) {
        throwApiError(err, errorCode.ERRORFORMAT)
      }
    } else {
      throwApiError('The Group Name already existed.', errorCode.INSERT_DUPLICATE)
    }
  }

  static async deleteSpecGroup(userId, groupId) {
    // 檢查 gid是否是自己的group, 是的話 才可以被修改
    let checkResult = await xrayModel.checkGroupPermission(userId, groupId)

    if (checkResult) {
      try {
        let client = await new tsystemDB()
        await xrayModel.deleteGroupSpec(client, groupId)
        await client.commit()

        return {
          specGroupID: parseInt(groupId),
        }
      } catch (err) {
        console.log('deleteSpecGroup', err)
        throw err
      }

    } else {
      throwApiError('The Group Name not found.', errorCode.NOT_FOUND)
    }
  }

  static async modifySpecGroup(userID, role, specGroupName, productType, type1, type2, sourcerList, specList, groupId) {
    await this.checkViewPermissionByRole(userID, role)

    let checkResult = await xrayModel.checkGroupPermission(userID, groupId)
    if (checkResult) {
      // 檢查 修改的名稱 是否與 其他的group 名稱相同
      let checkSpecGroup = await xrayModel.checkOtherSpecGroupName(userID, specGroupName, groupId, role)

      if (checkSpecGroup) {

        try {
          let client = await new tsystemDB()
          await xrayModel.deleteGroupSpec(client, groupId)
          await client.commit()

          let newGroupId = await this.addSpecGroup(userID, role, specGroupName, productType, type1, type2, sourcerList, specList)
          return newGroupId
        } catch (err) {
          console.log('modifySpecGroup', err)
          throw err
        }
      } else {
        throwApiError('The Group Name already existed.', errorCode.INSERT_DUPLICATE)
      }
    } else {
      throwApiError('The Group Name not found.', errorCode.NOT_FOUND)
    }
  }

  static async fetchSpecGroups(userID, role) {
    await this.checkViewPermissionByRole(userID, role)

    let groupList = await xrayModel.getSpecGroup(userID, role)
    let groupScode = await xrayModel.getSpecGroupScode(userID, role)
    let groupSpec = await xrayModel.getSpecGroupSpec(userID, role)

    let { sourcer, spec } = getGroupInfo(groupScode, groupSpec)

    let specGroupList = []
    if (groupList.length > 0) {
      for (let i = 0; i < groupList.length; i++) {
        let specByGid = spec[groupList[i].g_id]
        let newSpecGrouplist = commonCalculate.newSpecList()

        if (specByGid) {
          Object.keys(newSpecGrouplist).forEach((key) => {
            if (specByGid[key]) {
              newSpecGrouplist[key] = specByGid[key]
            }
          })
        }

        let sourcerByGid = _.isEmpty(sourcer[groupList[i].g_id]) ? [] : sourcer[groupList[i].g_id]
        specGroupList.push({
          specGroupName: groupList[i].g_name,
          specGroupID: groupList[i].g_id,
          owner: groupList[i].owner,
          productType: groupList[i].product_type ? groupList[i].product_type.split(';') : groupList[i].product_type,
          sourcer: sourcerByGid,
          type1: groupList[i].type1,
          type2: groupList[i].type2,
          specGroup: newSpecGrouplist,
        })
      }
    }
    return {
      specGroupList,
    }
  }

  static async fetchSpecGroupByGroupID(userID, role, groupID) {
    await this.checkViewPermissionByRole(userID, role)

    let groupList = await xrayModel.getSpecGroup(userID, role, groupID)
    let groupScode = await xrayModel.getSpecGroupScode(userID, role, groupID)
    let groupSpec = await xrayModel.getSpecGroupSpec(userID, role, groupID)
    let { sourcer, spec } = getGroupInfo(groupScode, groupSpec)

    // let specGroupList = []
    if (groupList.length > 0) {
      groupList = groupList[0]

      // check type1 permission
      // await this.checkType1Permission(userID, role, groupList.type1)

      // for (let i = 0; i < groupList.length; i++ ) {
      let specByGid = spec[groupList.g_id]
      let sourcerByGid = _.isEmpty(sourcer[groupList.g_id]) ? [] : sourcer[groupList.g_id]
      let product_type = groupList.product_type ? groupList.product_type.split(';') : []

      let newSpecGrouplist = commonCalculate.newSpecList()

      if (!_.isEmpty(specByGid)) {
        let specItems = []
        if (role == 'EE') {
          specItems = await xrayModel.getSpecItemForEE(product_type, groupList.type1, groupList.type2, sourcerByGid)
        } else {
          specItems = await xrayModel.getSpecItemForMEBySpec(groupList.type1, groupList.type2, sourcerByGid, specByGid, product_type)
        }
        if (specItems.length > 0) {
          let speclist = collateSpecList(specItems)
          newSpecGrouplist = collateSpecItemValue(speclist, specByGid)
        }
      }
      // spec title
      let specTitle
      let spec1
      if(role == 'ME') {
        spec1 = groupSpec.length > 0 ? [groupSpec[0].item] : []
        specTitle = await this.fetchSpecTitle(userID, role, groupList.type1, groupList.type2, spec1)
      }else {
        specTitle = await this.fetchSpecTitle(userID, role, groupList.type1, groupList.type2, product_type)
      }

      return {
        specGroupName: groupList.g_name,
        specGroupID: groupList.g_id,
        owner: groupList.owner,
        sourcer: sourcerByGid,
        productType: groupList.product_type ? groupList.product_type.split(';') : [],
        type1: groupList.type1,
        type2: groupList.type2,
        specGroup: newSpecGrouplist,
        specTitle,
      }
    } else {
      throwApiError('group not found.', errorCode.NOT_FOUND)
    }
    // }

    // return {
    //   specGroupList,
    // }
  }

  static async fetchSpecItemsForMEBySpec(productType, type1, type2, sourcer, spec) {

    let specItems = await xrayModel.getSpecItemForMEBySpec(type1, type2, sourcer, spec, productType)
    let speclist = collateSpecList(specItems)
    let newSpecGrouplist = collateSpecItemValue(speclist, spec)

    return newSpecGrouplist
  }

  // v1
  static async getSpecItems(sourcer, type1, type2) {

    let speclist = commonCalculate.newSpecList()

    let sourcers = sourcer.replace(/\s/g, '').split(',')

    let re = /select|update|delete|exec|count|’|"|=|;|>|<|%/i;
    if (re.test(sourcer) || re.test(type1) || re.test(type2)) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
    }

    let SpecItems = await xrayModel.getSpecItems(sourcers, type1, type2)
    if (SpecItems.length > 0) {
      SpecItems.map((spec) => {
        Object.keys(spec).forEach((num) => {
          let specKey = num.split('spec')[1] >= 10 ? num : 'spec0' + num.split('spec')[1]
          if (spec[num] != null && !speclist[specKey].includes(spec[num])) {
            speclist[specKey].push(spec[num])
          }
        })
      })
    }
    let specTitles = await xrayModel.getSpecTitle(type1, type2)

    return {
      speclist,
      specTitle: specTitles.length > 0 ? Object.values(specTitles[0]) : Array.from(Array(30)).map(() => null),
    }
  }
  // v1 ce get all sourcer, and other get proxy & himself & subordinate
  static async fetchSourcer(usreID, isCE) {

    let result = []
    let sourcers = []

    if (isCE) {
      sourcers = await xrayModel.getSCode(null)
    } else {
      sourcers = await xrayModel.getSCode(usreID)

      let sourcerProxy = await xrayModel.getProxy(usreID)
      let subordinate = await xrayModel.getSubordinateSCode(usreID)
      sourcers.push(...subordinate, ...sourcerProxy)
      sourcers = _.uniqBy(sourcers, 'sourcer')
    }

    if (sourcers.length != 0) {
      // let type = await xrayModel.getTypeIAndTypeII(sourcers.map(s => `('${s.scode}')`)
      let type = await xrayModel.getTypeIAndTypeII(sourcers.map(s => s.scode))

      let typeGroup = _.groupBy(type, (b) => b.scode)

      _.map(sourcers, (v) => {
        let typeList = typeGroup[v.scode]
        if (typeList) {
          result.push({
            ...v,
            type: typeList.map((i) => {
              return {
                type1: i.type1,
                type2: i.type2,
              }
            }),
          })
        }
      })
      return {
        sourcerList: result.length > 0 ? _.orderBy(result, ['sourcer'], ['asc']) : [],
      }
    }

    return { sourcerList: [] }
  }

  static async fetchPartNumber(userID, role, partNumber) {
    await this.checkViewPermissionByRole(userID, role)

    let searchBar = await xrayModel.getPartNumberSearchBar(role, partNumber)
    let partnumberSpec = await xrayModel.getPartNumberSpec(role, partNumber)
    let type1, type2, productType
    // search bar
    productType = _.chain(searchBar).map('productType').uniq().value()
    type1 = searchBar[0].type1
    type2 = searchBar[0].type2

    // check type1 permission
    await this.checkType1Permission(userID, role, type1)

    // get partnumber Spec title
    let specTitle
    let spec1
    if(role == 'ME') {
      spec1 = partnumberSpec.length > 0 ? [partnumberSpec[0].spec01] : []
      specTitle = await this.fetchSpecTitle(userID, role, type1, type2, spec1)
    } else {
      specTitle = await this.fetchSpecTitle(userID, role, type1, type2, productType)
    }

    // default Spec items
    let newSpecGrouplist = commonCalculate.newSpecList()

    let speclist = {}
    if (partnumberSpec.length > 0) {
      speclist = collateSpecList(partnumberSpec)
      newSpecGrouplist = collateSpecItemValue(speclist, {}, true)
    }

    let specRuleslist = []
    if (role == 'EE') {
      let ceSpecGroup = await xrayModel.getCESpecGroupbyType(type1, type2)
      specRuleslist = onlyGetRule(ceSpecGroup)

      let specItems = await xrayModel.getSpecItemForEE(productType, type1, type2, [])
      if (specItems.length > 0 ) {
        let speclistByType = collateSpecList(specItems)
        newSpecGrouplist = collateSpecForRefPN(speclistByType, speclist, specRuleslist)
      }
    }

    return {
      productType: productType ? productType : null,
      type1: type1 ? type1 : null,
      type2: type2 ? type2 : null,
      spec: newSpecGrouplist,
      specTitle,
      ceSpecGroup: specRuleslist,
    }
  }

  static async spaSummaryExport(exportData, fileName, folderPath) {
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    if(!fs.existsSync(excelFolderPath)) fs.mkdirSync(excelFolderPath)
    let fileInfo = {
      importFile: exportData.importFile,
      importDate: exportData.importDate,
      unit: exportData.unit,
    }
    const workbook = new genExcel.Workbook()
    const typesheet = workbook.addWorksheet('Summary - Type I II')
    const vendorsheet = workbook.addWorksheet('Summary - Vendor')
    const worksheet = workbook.addWorksheet("Opportunity-PN")
    const spasheet = workbook.addWorksheet('SPA Raw Data')
    const exchangesheet = workbook.addWorksheet('Exchange Rate')

    let newArray = [].concat(...Array(1).fill(exportData.opportunityPN))
    let spaArray = [].concat(...Array(1).fill(exportData.spaDataForSheet))
    let exchangeArray = [].concat(...Array(1).fill(exportData.exchangeRateDefault))
    let partNumberColor = xraySummaryHeader.partNumberColor
    let exchangeArrayValue = xraySummaryHeader.eRateDefaultFirstHeader
    let currencyArrayValue = xraySummaryHeader.eRateDefaultSecondHeader
    let priceArrayValue = exchangeArray.length > 0 ? [exchangeArray[0].RMB, exchangeArray[1].NTD, exchangeArray[2].JPY] : [null, null, null]
    let borderStyle = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    }
    let exchangeCol = worksheet.getColumn(6)
    let currencyCol = worksheet.getColumn(7)
    let priceCol = worksheet.getColumn(8)
    let spaExchangeCol = spasheet.getColumn(6)
    let spaCurrencyCol = spasheet.getColumn(7)
    let spaPriceCol = spasheet.getColumn(8)
    exchangeCol.values = exchangeArrayValue
    currencyCol.values = currencyArrayValue
    spaExchangeCol.values = exchangeArrayValue
    spaCurrencyCol.values = currencyArrayValue
    priceCol.values = priceArrayValue
    spaPriceCol.values = priceArrayValue
    worksheet.mergeCells('F1:F3')
    spasheet.mergeCells('F1:F3')
    exchangeCol.fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{ argb:'FFBB66' }
    }
    exchangeCol.border = borderStyle
    currencyCol.border = borderStyle
    priceCol.border = borderStyle
    spaExchangeCol.fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{ argb:'FFBB66' }
    }
    spaExchangeCol.border = borderStyle
    spaCurrencyCol.border = borderStyle
    spaPriceCol.border = borderStyle

    let header = xraySummaryHeader.opportunityHeaderKey
    let spaHeader = xraySummaryHeader.spaHeaderKey
    let headerTmp = xraySummaryHeader.opportunityHeader

    let spaHeaderTmp = xraySummaryHeader.spaHeader
    // set summary typei ii and summary vendor and exchange rate sheet
    this.setSummarySheet(typesheet, exportData.summaryByType, fileInfo, 'C', 'G', 'type')
    this.setSummarySheet(vendorsheet, exportData.summaryByVendor, fileInfo, 'D', 'H', 'vendor')
    this.setExchangeRateSheet(exchangesheet, exportData.exchangeRate)

    // set opportunity column width

    this.setDataWidth(header, newArray, headerTmp)
    // set spa raw data column width
    let spreadArray = []
    spaArray.forEach((sdata, sidx) => {
      spreadArray.push(...sdata.data)
    })
    this.setDataWidth(spaHeader, spreadArray, spaHeaderTmp)
    worksheet.getRow(6).values = headerTmp
    worksheet.columns = header
    spasheet.getRow(6).values = spaHeaderTmp
    spasheet.columns = spaHeader
    // add opportunity item data
    newArray.forEach((item, idx) => {
      worksheet.addRow(item)
    })
    // add spa item data
    spaArray.forEach((rawdata, idx) => {
      rawdata.data.map((itemData, iidx) => {
        spasheet.addRow(itemData)
      })
    })

    // set opportunity header column name
    let headerStyleKey = []
    for(let i = 1; i <= headerTmp.length; i++) {
      headerStyleKey.push(`${excelColumnName.intToExcelCol(i)}6`)
    }
    // set spa raw data header column name
    let spaHeaderStyleKey = []
    for(let i = 1; i <= spaHeaderTmp.length; i++) {
      spaHeaderStyleKey.push(`${excelColumnName.intToExcelCol(i)}6`)
    }
    // header setting
    headerStyleKey.forEach((key, idx) => {
      worksheet.getCell(key).font = {
        color: { argb: 'FFFFFF' },
        bold: true
      }
      if(idx < 18) {
        worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'808080' }
        }
      } else if(idx > 17 && idx < 28) {
        worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'70ad47' }
        }
      } else if(idx > 27 && idx < 43) {
        worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'0070c0' }
        }
      } else if( idx > 42 && idx < 58) {
        worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'ffc000' }
        }
      }
    })
    // spa header setting
    spaHeaderStyleKey.forEach((key, idx) => {
      spasheet.getCell(key).font = {
        color: { argb: 'FFFFFF' },
        bold: true
      }
      if(idx < 17) {
        spasheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'0070c0' }
        }
      } else {
        spasheet.getCell(key).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'808080' }
        }
      }
    })
    // set opportunity border
    this.setBorder(worksheet, newArray.length, borderStyle)
    // set spa raw data border
    let count = _.reduce(spaArray, (sum, n) => {
      return sum + n.data.length
    }, 0)// get spa raw data item count
    this.setBorder(spasheet, count, borderStyle)
    // set opportunoity value = Y font is bold part
    this.setBold(worksheet, newArray.length)
    // set spa raw data value = Y font is bold part
    this.setBold(spasheet, count, 'spa')
    // spa raw data wistron pn group array
    let uniqPN = []
    spaArray.forEach((item, idx) => {
      uniqPN.push(item.key)
    })
    // find ref partnumber draw different color begining site and end site
    let findDrawColorSite = uniqPN.map((number, idx) => {
      return spreadArray.findIndex(x => x['wistronPN'] === number) + 7
    })
    for(let i = 7; i < spreadArray.length + 7; i++) {
      findDrawColorSite.forEach((num, idx) => {
        if(i >= num) {
          let row = spasheet.getRow(i)
          row.getCell('wistronPN').fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor: { argb: partNumberColor[idx % 10] }
          }
        }
      })
    }
    // set opportunity auto filter
    this.setFilter(worksheet, headerTmp.length)
    // set spa raw data auto filter
    this.setFilter(spasheet, spaHeaderTmp.length)
    await workbook.xlsx.writeFile(excelPath)
  }
  static setSummarySheet(sheet, data, fileInfo, middleSite, endSite, category) {
    let header = xraySummaryHeader.summaryBasicHeaderKey
    let borderStyle = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
    sheet.columns = header
    sheet.addRow(fileInfo)
    sheet.getCell('A1').border = borderStyle
    sheet.getCell('A2').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thick'}, right: {style:'thin'} }
    sheet.getCell('B1').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thick'} }
    sheet.getCell('B2').border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thick'}, right: {style:'thick'} }
    sheet.getCell(`${endSite}3`).value = `Unit:${fileInfo.unit}`
    let itemTotal = 0
    if(!_.isEmpty(data.ODM)) {
      let addSum = _.reduce(Object.keys(data.ODM.type1Cost), (sum, init) => {
        return sum + data.ODM.type1Cost[init].subItems.length
      }, 0)
      itemTotal = addSum + Object.keys(data.ODM.type1Cost).length + 1
    }

    this.setSummaryTable(sheet, data, data.ODM, 4, endSite, middleSite, category, 'ODM')
    this.setSummaryTable(sheet, data, data.OEM, itemTotal + 7, endSite, middleSite, category, 'OEM')
  }
  static setSummaryTable(sheet, allData, data, site, endSite, middleSite, category, type) {
    let header
    let headerKey
    if(category == 'type') {
      header = xraySummaryHeader.summaryTypeHeader
      header[0] =  `${type}`
      headerKey = xraySummaryHeader.summaryTypeHeaderKey
    } else {
      header = xraySummaryHeader.summaryVendorHeader
      header[0] = `${type}`
      headerKey = xraySummaryHeader.summaryVendorHeaderKey
    }
    if(!_.isEmpty(data)) {
      this.setSummaryWidth(allData, headerKey, header)
    }

    let headerSetting = sheet.getRow(site)
    sheet.getRow(site).values = header

    headerSetting.eachCell({includeEmpty: true}, (cell, idx) => {
      if(idx == excelColumnName.excelColToInt(middleSite) || idx == excelColumnName.excelColToInt(endSite)) {
        cell.border = { top: {style: 'thick'}, left: {style:'thin'}, bottom: { style: 'thick'}, right: {style: 'thick'}}
      } else if(idx == 2) {
        cell.border = { top: {style:'thick'}, left: {style:'thick'}, bottom: {style:'thick'}, right: {style:'thin'} }
      } else {
        cell.border = { top: {style:'thick'}, left: {style:'thin'}, bottom: {style:'thick'}, right: {style:'thin'} }
      }
      cell.font = {
        bold: true
      }
    })

    sheet.columns = headerKey
    let itemTotal = 0
    if(!_.isEmpty(data)) {
      let addSum = _.reduce(Object.keys(data.type1Cost), (sum, init) => {
      return sum + data.type1Cost[init].subItems.length
      }, 0)
      itemTotal = addSum + Object.keys(data.type1Cost).length + 1

      Object.keys(data.type1Cost).forEach((itemKey, idx) => {
        _.map(data.type1Cost[itemKey].subItems, (item, iidx) =>{
          let itemSetting = sheet.addRow(item)// item
          itemSetting.eachCell({includeEmpty: true}, (cell, idx) => {
            if(idx == excelColumnName.excelColToInt(middleSite) || idx == excelColumnName.excelColToInt(endSite)) {
              cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thick'} }
            } else if(idx == 2) {
              cell.border = { top: {style:'thin'}, left: {style:'thick'}, bottom: {style:'thin'}, right: {style:'thin'} }
            } else {
              cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
            }
          })
        })
        data.type1Cost[itemKey].subTotalCost.type1 = `${itemKey}合計`
        let itemFont = sheet.addRow(data.type1Cost[itemKey].subTotalCost)// item total
        itemFont.eachCell({includeEmpty: true}, (cell, idx) => {
          cell.font = {
            bold: true
          }
          if(idx == excelColumnName.excelColToInt(middleSite) || idx == excelColumnName.excelColToInt(endSite)) {
            cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thick'}, right: {style:'thick'} }
          } else if(idx == 2) {
            cell.border = { top: {style:'thin'}, left: {style:'thick'}, bottom: {style:'thick'}, right: {style:'thin'} }
          } else {
            cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thick'}, right: {style:'thin'} }
          }
        })
      })
      data.type1TotalCost.vendor = `${type}合計`
      let totalFont = sheet.addRow(data.type1TotalCost)
      totalFont.eachCell({includeEmpty: true}, (cell, idx) => {
        cell.font = {
          bold: true
        }
      })
    } else {
      data.vendor = `${type}合計`
      let totalFont = sheet.addRow(data)
      totalFont.eachCell({includeEmpty: true}, (cell, idx) => {
        cell.font = {
          bold: true
        }
      })
    }
    // merge cell
    if(!_.isEmpty(data.type1Cost)) {
      sheet.mergeCells(`A${site}:A${site + itemTotal -1}`)
      sheet.mergeCells(`A${site + itemTotal}:C${site + itemTotal}`)
      for(let i = 1; i <= excelColumnName.excelColToInt(endSite); i++) {
        sheet.getCell(`${excelColumnName.intToExcelCol(i)}${site + itemTotal}`).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'FFC000' }
        }
        sheet.getCell(`${excelColumnName.intToExcelCol(i)}${site + itemTotal}`).border = {
          top: {style:'thick'},
          left: {style:'thin'},
          bottom: {style:'thick'},
          right: {style:'thin'}
        }
      }
      let total = 0
      Object.keys(data.type1Cost).forEach((itemKey, idx) => {
        let start
        let end
        total += data.type1Cost[itemKey].subItems.length
        if(idx == 0) {
          start = site + 1
          end = site + 1 + data.type1Cost[itemKey].subItems.length - 1
          sheet.mergeCells(`B${start}:B${end}`)
        }else {
          start = site + 1 + total - data.type1Cost[itemKey].subItems.length + idx
          end = site + 1 + idx + total - 1
          sheet.mergeCells(`B${start}:B${end}`)
        }
      })
    } else {
      sheet.mergeCells(`A${site + 1}:C${site + 1}`)
      for(let i = 1; i <= excelColumnName.excelColToInt(endSite); i++) {
        sheet.getCell(`${excelColumnName.intToExcelCol(i)}${site + 1}`).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{ argb:'FFC000' }
        }
        sheet.getCell(`${excelColumnName.intToExcelCol(i)}${site + 1}`).border = {
          top: {style:'thick'},
          left: {style:'thin'},
          bottom: {style:'thick'},
          right: {style:'thin'}
        }
      }
    }
  }
  static setSummaryWidth(data, headerKey, header) {
    let width = []
    if(Object.keys(data.ODM).length > 1 && Object.keys(data.OEM).length <= 1) {
      _.map(Object.keys(data.ODM.type1Cost), (itemKey, idx) => {
        width.push(...data.ODM.type1Cost[itemKey].subItems)
      })
    } else if(Object.keys(data.OEM).length > 1 && Object.keys(data.ODM).length <= 1) {
      _.map(Object.keys(data.OEM.type1Cost), (itemKey, idx) => {
        width.push(...data.OEM.type1Cost[itemKey].subItems)
      })
    } else if(Object.keys(data.ODM).length > 1 && Object.keys(data.OEM).length > 1) {
        _.map(Object.keys(data), (vendor, vidx) => {
          _.map(Object.keys(data[vendor].type1Cost), (itemKey, idx) => {
            width.push(...data[vendor].type1Cost[itemKey].subItems)
          })
        })
    }
    if(Object.keys(data.ODM).length > 1 || Object.keys(data.OEM).length > 1) {
      headerKey.map((hKey, idx) => {
        let length = Math.max(...width.map(o => String(o[hKey.key]).length)) + 10
        if(length <= header[idx].length) {
          length = header[idx].length + 5
        }
        if(length > 45) {
          length = 45
        }
        hKey['width'] = length
      })
    }
  }

  static setDataWidth(header, dataArray, dataArrayTmp) {
    // set spa raw data column width
    header.map((key, idx) => {
      let width = Math.max(...dataArray.map(o => String(o[key.key]).length)) + 5
      if(width <= dataArrayTmp[idx].length) {
        width = dataArrayTmp[idx].length + 5
      }
      if(width > 45) {
        width = 45
      }
      key['width'] = width
    })
  }
  static setBorder(sheet, length, borderStyle) {
    for(let i = 6; i <=length + 6; i++) {
      sheet.findRow(i).eachCell({ includeEmpty: true}, (cell, idx) => {
        cell.border = borderStyle
      })
    }
  }
  static setBold(sheet, length, flag = 'opportunity') {
    for(let i = 6; i <= length + 6; i++) {
      let row = sheet.getRow(i)
      if(flag == 'opportunity') {
        if(row.getCell('cmp').value == 'Y') row.getCell('cmp').font = { bold: true}
        if(row.getCell('suggCmp').value == 'Y') row.getCell('suggCmp').font = { bold: true}
        if(row.getCell('suggObs').value == 'Y') row.getCell('suggObs').font = { bold: true}
        if(row.getCell('suggExp').value == 'Y') row.getCell('suggExp').font = { bold: true}
        if(row.getCell('suggInAltGroup').value == 'Y') row.getCell('suggInAltGroup').font = { bold: true}
        if(row.getCell('spaCmp').value == 'Y') row.getCell('spaCmp').font = { bold: true}
        if(row.getCell('spaObs').value == 'Y') row.getCell('spaObs').font = { bold: true}
        if(row.getCell('spaExp').value == 'Y') row.getCell('spaExp').font = { bold: true}
        if(row.getCell('altCmp').value == 'Y') row.getCell('altCmp').font = { bold: true}
        if(row.getCell('altObs').value == 'Y') row.getCell('altObs').font = { bold: true}
        if(row.getCell('altExp').value == 'Y') row.getCell('altExp').font = { bold: true}
      }
      else {
        if(row.getCell('spaCmp').value == 'Y') row.getCell('spaCmp').font = { bold: true}
        if(row.getCell('spaObs').value == 'Y') row.getCell('spaObs').font = { bold: true}
        if(row.getCell('spaExp').value == 'Y') row.getCell('spaExp').font = { bold: true}
      }
    }
  }
  static setFilter(sheet, colNumber) {
    // set filter
    sheet.autoFilter = {
      from: 'A6',
      to: `${excelColumnName.intToExcelCol(colNumber)}6`
    }
  }
  static setExchangeRateSheet(sheet, data) {
    let header = xraySummaryHeader.exchangeRateHeaderKey
    sheet.columns = header
    data.map((item, idx) => {
      let itemBorder = sheet.addRow(item)
      itemBorder.eachCell({includeEmpty: true}, (cell, idx) => {
        cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
      })
    })
    let headerSetting = sheet.getRow(1)
    headerSetting.eachCell({includeEmpty: true}, (cell, idx) => {
      cell.font = {
        color: { argb: 'FFFFFF' }
      }
      cell.fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'0070C0' }
      }
      cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} }
    })
  }
  static async spaExport(data, role, fileName, folderPath) {
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}`)
    let excelYmlPath = path.join('spa', 'excel-spa.yaml')
    let exportDate = moment(new Date()).format('YYYYMMDD hh:mm')
    if(data.materialList[0] != null) {
      let exchangeRatePre = _.map(data.materialList, i => {
        const tmp =  { ...i.infoList }
        tmp['last_price_currency'] = tmp['originalCurrency']
        return tmp
      })
      let exchangeRateList = await getExchangeRateSheet(exchangeRatePre)
      let exchangeRateForSheet = exchangeRateList.exchangeRate.length > 0 ? exchangeRateList.exchangeRate : []
      let exchangeRateDefaultList = exchangeRateList.defaultExchangeRate
      let summary = {
        export_from: 'X-Ray SPA',
        search: 'Category',
        export_date: exportDate,
        type1: data.type1,
        type2: data.type2,
        referencePN: data.referencePN,
      }
      let header = [...data.infoProperty, ...data.specOthers]// for dynamicHeaderTable的header key array
      let value = data.materialList.map(x => {
        const val = { ...x.infoList, ...x.moreSpec }
        if (role.toUpperCase() != 'ME') val['isCommonPart'] = val['isCommonPart'] ? 'Y' : 'N'
        val['priceDiff'] = val['priceDiff'].split('%')
        val['datab'] = val['datab'] ? moment(val['datab']).format('YYYYMMDD') : null
        val['priceDiff'] = fixMath.transStringToFloat(val['priceDiff'][0]) / 100
        return val
      })

      let infoHeader = {}
      _.map(data.infoProperty, item => {
        infoHeader[`${item}`] = null
      })
      let headerKey = { ...infoHeader, ...data.specTitle }// 所有header的title
      if(role.toUpperCase() == 'ME') {// me沒有cmp欄位
        let index = header.indexOf('isCommonPart')
        if (index !== -1) header.splice(index, 1)
        delete headerKey['isCommonPart']
      }
      let item = {
        value: value,
        header: header,
        headerKey: headerKey,
      }
      let rawData = {
        spaSummary: summary,
        spaItem: item,
        exchangeRate: exchangeRateForSheet,
        exchangeRateDefault: exchangeRateDefaultList,
      }
      let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
      console.log(`get the excel path: ${await excel.execute()}`)
    }
  }

  static async checkViewPermissionByRole(userID, role) {
    let resource

    if (role == 'ME') resource = 'xray.me'
    else resource = 'xray.ee'

    let permission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: resource,
    })

    if (!permission || !permission.View || permission.View.allow.indexOf(resource) < 0) {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
      return
    } else {
      return true
    }
  }

  static async getType1InPerm(userID, role, type1) {
    let roleCategory = 0
    if (role.toUpperCase() == 'ME') {
      roleCategory = 1
    } else if (role.toUpperCase() == 'EE') {
      roleCategory = 2
    } else {
      return []
    }

    let type1ByPerm = await xrayModel.getType1ByUser(userID, roleCategory)

    let type1Res = type1ByPerm.map(t => t.type1).filter(function (e) {
      return type1.indexOf(e) > -1
    })

    return type1Res
  }

  static async checkType1Permission(userID, role, type1) {
    // get user can view type1 list
    let type1Res = await this.getType1InPerm(userID, role, type1)
    // if type1Res is null, mean user without this type1 permission
    if (_.isEmpty(type1Res)) {
      logger.debug('user without type1 permission')
      throwApiError('type1 permission denid', errorCode.ERRORFORMAT)
      return
    } else {
      return true
    }
  }
}

module.exports = Xray
