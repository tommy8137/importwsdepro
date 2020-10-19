/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')

const { formatFloat, formatFloatNotNull } = require('../../helpers/utils')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const log4js = require('../../utils/logger/logger')

const commonModel = require('../../model/database/common.js').Common

const logger = log4js.getLogger('database utils')
const floatPoint = new DecimalGetter('Database')

/**
 *
 * @param {*} valueKey array object中取哪一個Key的值 (, price, value...etc)
 * @param {*} dateKey 用來判斷現在過去未來的key ex: activate_date...etc
 * @param {*} data array object ex:
 * [ { materialId: '0e7b2628-e59d-11e9-a30d-0242ac110002',
    thicknessId: 'fd79c4c8-e5b6-11e9-aac5-0242ac110002',
    category_name: 'Metal',
    name: 'C1840',
    density: '8.8',
    thickness: '0.30',
    value: 'null',
    activate_date: '1970-01-01',
    id: 7 } ]
 *
 * @returns {Object} ex: { current: 1.01, next: '1.02 }
 */
const getValueByDateFormat = (data, valueKey, dateKey) => {
  let dateFormat = {}
  let today = moment().format('YYYY-MM-DD')
  dateFormat['last'] = null
  dateFormat['current'] = null
  dateFormat['next'] = null

  data = _.sortBy(data, [dateKey])
  if(data.length == 1) {
    if (data[0][dateKey] > today) {
      dateFormat['next'] = formatFloatNotNull(data[0][valueKey], floatPoint.get('price'))
    } else {
      dateFormat['current'] = formatFloatNotNull(data[0][valueKey], floatPoint.get('price'))
    }
  } else if (data.length == 2) {
    let largeActivateDate = moment(data[1][dateKey]).format('YYYY-MM-DD')
    if (largeActivateDate > today) {
      dateFormat['current'] = formatFloatNotNull(data[0][valueKey], floatPoint.get('price'))
      dateFormat['next'] = formatFloatNotNull(data[1][valueKey], floatPoint.get('price'))
    } else {
      dateFormat['last'] = formatFloatNotNull(data[0][valueKey], floatPoint.get('price'))
      dateFormat['current'] = formatFloatNotNull(data[1][valueKey], floatPoint.get('price'))
    }
  } else if(data.length == 3) {
    let largeActivateDate = moment(data[2][dateKey]).format('YYYY-MM-DD')
    if (largeActivateDate > today) {
      dateFormat['last'] = formatFloatNotNull(data[0][valueKey], floatPoint.get('price'))
      dateFormat['current'] = formatFloatNotNull(data[1][valueKey], floatPoint.get('price'))
      dateFormat['next'] = formatFloatNotNull(data[2][valueKey], floatPoint.get('price'))
    } else {
      dateFormat['last'] = formatFloatNotNull(data[1][valueKey], floatPoint.get('price'))
      dateFormat['current'] = formatFloatNotNull(data[2][valueKey], floatPoint.get('price'))
    }
  }

  return dateFormat
}
/**
 *
 * @param {Array} data ex: [ { activate_date: '2019-10-31', activation_date_id: 2}, { activate_date: '2020-01-01', activation_date_id: 3 }]
 * @param {String} dateKey ex: activate_date
 * @param {String} dateIdKey ex: activation_date_id
 *
 * @returns {Object} ex: { current: '2019-10-31', currentId: 2, next: '2020-01-01', nextId: 3 }
 */
const getDateFormat = (data, dateKey, dateIdKey) => {
  let date = _.chain(data)
    .map((res) => {
      return {
        date: moment(res[dateKey]).format('YYYY-MM-DD'),
        activationDateId: res[dateIdKey],
      }
    })
    .uniqBy('date')
    .sortBy(['date'])
    .remove((item) => item.activationDateId !== null)// 排除 null 的日期
    .value()

  let today = moment().format('YYYY-MM-DD')
  let dateFormat = {}

  if(date.length == 1) {
    dateFormat['current'] = date[0].date
    dateFormat['currentId'] = date[0].activationDateId
  } else if (date.length == 2) {
    if (date[1].date > today) {
      dateFormat['current'] = date[0].date
      dateFormat['currentId'] = date[0].activationDateId

      dateFormat['next'] = date[1].date
      dateFormat['nextId'] = date[1].activationDateId
    } else {
      dateFormat['last'] = date[0].date
      dateFormat['lastId'] = date[0].activationDateId

      dateFormat['current'] = date[1].date
      dateFormat['currentId'] = date[1].activationDateId
    }
  } else if(date.length == 3) {
    if (date[2].date > today) {
      dateFormat['last'] = date[0].date
      dateFormat['lastId'] = date[0].activationDateId

      dateFormat['current'] = date[1].date
      dateFormat['currentId'] = date[1].activationDateId

      dateFormat['next'] = date[2].date
      dateFormat['nextId'] = date[2].activationDateId
    } else {

      dateFormat['last'] = date[1].date
      dateFormat['lastId'] = date[1].activationDateId

      dateFormat['current'] = date[2].date
      dateFormat['currentId'] = date[2].activationDateId
    }
  }
  return dateFormat
}

const getPriceAndLossRateFormat = (price, lossRate) => {
  let res = {}
  let dateFormat = ['last', 'current', 'next']

  _.forEach(dateFormat, (dateKey) => {
    if (price[dateKey] || lossRate[dateKey]) {
      res[dateKey] = {
        price: price[dateKey],
        lossRate: lossRate[dateKey],
      }
    }
  })
  return res
}
const collateMaterialPrice = (results) => {
  let dateFormat = getDateFormat(results, 'activate_date', 'activation_date_id')

  let materialPriceList = []
  _.chain(results)
    .groupBy(res => res.materialSpecId)
    .map((data, key) => {
      let material = []

      _.chain(data)
        .groupBy(d => d.materialId)
        .map((materialDatas, k) => {
          let materialData = _.sortBy(_.uniqBy(materialDatas, 'activate_date'), 'activate_date')

          let materialValue = getValueByDateFormat(materialData, 'value', 'activate_date')
          material.push({
            id: k,
            type2Id: materialData[0].type2Id,
            materialSpec: materialData[0].materialSpecName,
            material: materialData[0].materialName,
            disable: _.isNil(materialData[0].materialDisable) ? false : true,
            ...materialValue,
          })
        })
        .value()

      materialPriceList.push({
        id: key,
        type2Id: data[0].type2Id,
        materialSpec: data[0].materialSpecName,
        disable: _.isNil(data[0].materialSpecDisable) ? false : true,
        remark: data[0].remark,
        subMaterial: material,
      })
    })
    .value()
  return {
    date: dateFormat,
    materialPriceList: _.sortBy(materialPriceList, 'materialSpec'),
  }
}

const getPercentValues = (value) => {
  let res = {}
  let dateFormat = ['last', 'current', 'next']
  _.forEach(dateFormat, (dateKey) => {
    if(!_.isNull(value[dateKey])) {
      res[dateKey] = formatFloat(value[dateKey] * 100, floatPoint.get('price'))
    } else {
      res[dateKey] = value[dateKey]
    }
  })
  return res
}

const collatePartCategory = (result, materialRes) => {
  let partCategory = _.chain(result)
    .groupBy(res => res.pc1_id)
    .map((data, key) => {
      let items = data.map(d => {
        let findRes = materialRes.find(res => res.pc1_id == key && res.pc2_id == d.pc2_id)
        return {
          id: d.pc2_id,
          name: d.pc2_name,
          isSelected: findRes ? true : false,
        }
      })

      return {
        id: key,
        name: data[0].pc1_name,
        items,
      }
    })
    .value()

  return partCategory
}

const collateParameter = (type_label, parameterRes, sortBy = 'label_name') => {
  let parameter = []

  Object.keys(type_label)
    .forEach((type) => {
      let typeFilterData = parameterRes.filter(r => r.part_type == type)
      let groupRes = []
      _.chain(typeFilterData)
        .groupBy(d => d.common_parameter_id)
        .forEach((idGroupItem, k) => {
          let itemData = _.sortBy(_.uniqBy(idGroupItem, 'activate_date'), 'activate_date')
          let itemValue = getValueByDateFormat(itemData, 'value', 'activate_date')

          if(itemData[0].unit == '%') {
            itemValue = getPercentValues(itemValue)
          }

          groupRes.push({
            id: k,
            ...itemData[0],
            // item: itemData[0].label_name,
            // unit: itemData[0].unit,
            ...itemValue,
          })
        })
        .value()

      let sortRes = _.chain(groupRes).sortBy(item => item.hasOwnProperty(sortBy) ? item[sortBy] : item.id).value()
      parameter.push({
        id: type,
        type: type_label[type],
        items: sortRes.map((item) => {
          return {
            'id':item.id,
            'item':item.label_name,
            'unit': item.unit,
            'last': item.last,
            'current': item.current,
            'next': item.next,
          }
        }),
      })
    })
  return parameter
}
/**
 * 針對單表查詢的資料或是單層的資料格式化為可直接輸出給前端的資訊
 * 如果資料內含有disable_Time，則輸出時會自動帶有該屬性，並更名為:disable，且將值轉換為boolean
 * @param {Array} priceData 欲格式化的資料
 * @param {String} idKey 作為資料分類用的來源id屬性名稱
 * @param {Object} mappingKeyList  除了預設輸出的屬性(value, last, current, next)以外，需要追加格式化後要映射輸出的屬性清單
ex:
{
  "parameter_id": "id"
  "shielding_name":"name"
}
輸出後的元素會增加name屬性，其值為來源資料的shielding_name屬性
以key-value的方式 key: 來源屬性 value: 輸出屬性
 * @returns {Array} 格式化後的資訊
ex:
 [{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "name": "NA",
        "last": 0,
        "current": 0,
        "next": 0,
        "disable": false
    }]
 */
const formatSigleTablePriceData = (priceData, idKey, mappingKeyList) =>{
  const sourceKeyList = Object.keys(mappingKeyList)
  return _.chain(priceData)
    .groupBy((priceInfo)=>priceInfo[idKey])
    .map((subPriceList, id)=>{
      let adderPriceData = _.sortBy(_.uniqBy(subPriceList, 'activate_date'), 'activate_date')
      let adderPriceValue = getValueByDateFormat(adderPriceData, 'value', 'activate_date')
      let baseObj = {
        ...adderPriceValue,
      }
      baseObj[idKey] = id
      for(const sourceKey of sourceKeyList){
        const mappingKey = mappingKeyList[sourceKey]
        baseObj[mappingKey] = subPriceList[0][sourceKey]
      }
      if(subPriceList[0].hasOwnProperty('disable_time'))
        baseObj.disable = subPriceList[0].disable_time ? true : false
      return baseObj
    }).value()
}
/**
 * 多項 price 同時輸出時使用的格式
 * @param {Array} priceData 資料
 * @param {String or Array} idKey 資料分類屬性名稱 '屬性' 或多個屬性分類 ['屬性1', '屬性2']
 * @param {Object} mappingKeyList  映射輸出屬性清單
 * @param {*} itemNameKey 項目屬性名稱
 * @param {*} itemMappingKeyList 除了預設輸出的屬性(value, last, current, next, disable)以外，需要追加格式化後要映射輸出的屬性清單
 * ex:[{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "name": "NA",
        "項目1"": {
            "itemId"": 1,
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
            "disable": false
        },
        "項目2": {
            "itemId": 2,
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
            "disable": false
        }
    }]
 */
const formatMultiItemPriceData = (priceData, idKey, mappingKeyList, itemNameKey, itemMappingKeyList) =>{
  const sourceKeyList = Object.keys(mappingKeyList)
  const itemKeyList = Object.keys(itemMappingKeyList)
  return _.chain(priceData)
    .groupBy((priceInfo)=>{
      if (Array.isArray(idKey)) {
        let groupKey = ''
        idKey.forEach((key)=> {
          groupKey += priceInfo[key]
        })
        return groupKey
      } else {
        return priceInfo[idKey]
      }
    })
    .map((subPriceList)=>{
      let baseObj = {}
      for(const sourceKey of sourceKeyList){
        const mappingKey = mappingKeyList[sourceKey]
        baseObj[mappingKey] = subPriceList[0][sourceKey]
      }
      _.chain(subPriceList)
        .groupBy(priceInfo=> priceInfo[itemNameKey])
        .map((itemList, name) => {
          let adderPriceData = _.sortBy(_.uniqBy(itemList, 'activate_date'), 'activate_date')
          let adderPriceValue = getValueByDateFormat(adderPriceData, 'value', 'activate_date')
          baseObj[name] = {
            ...adderPriceValue,
          }
          if(adderPriceData[0].hasOwnProperty('disable_time')){
            baseObj[name].disable = adderPriceData[0].disable_time ? true : false
          }
          for(const itemKey of itemKeyList){
            const mappingKey = itemMappingKeyList[itemKey]
            baseObj[name][mappingKey] = adderPriceData[0][itemKey]
          }
        }).value()
      return baseObj
    }).value()
}

/**
 * collate two date object value,
 * 根據mappingKeyList 去組合 兩個array 的價格object
 * @param {*} price ex: [{
    price: 0.032,
    activate_date: '1970-01-01'
  }, {
    price: 0.035,
    activate_date: '2019-11-21',
  }]
 * @param {*} secondData ex: [{
    processtime: '75',
    activate_date: '1970-01-01'
  }, {
    processtime: '76',
    activate_date: '2019-11-21',
  }]
 * @param {*} mappingKeyList ex: { price: 'price', processtime: 'processTime' }
 * 以key: value的方式 key: 來源屬性名稱 value: 輸出屬性名稱
 *
 * @returns {Object} ex: {
 *  "last": {
      "price": null,
      "processTime": null
    },
    "current": {
      "price": 0.032,
      "processTime": '75'
    },
    "next": {
      "price": 0.035,
      "processTime": '76',
    }}
 */
const calcPriceByDateObject = (fristData, secondData, mappingKeyList) => {
  if(Object.keys(mappingKeyList).length != 2) {
    logger.warn('[Wrong] calcPriceByDateObject mapping key length')
    return {}
  }

  let firstUniq = _.sortBy(_.uniqBy(fristData, 'activate_date'), 'activate_date')
  let secondUniq = _.sortBy(_.uniqBy(secondData, 'activate_date'), 'activate_date')

  let first = getValueByDateFormat(firstUniq, _.keys(mappingKeyList)[0], 'activate_date')
  let second = getValueByDateFormat(secondUniq, _.keys(mappingKeyList)[1], 'activate_date')

  let dateFormat = ['last', 'current', 'next']

  let res = {}
  _.forEach(dateFormat, (dateKey) => {
    res[dateKey] = {}
    if (first[dateKey] || second[dateKey]) {
      res[dateKey][_.values(mappingKeyList)[0]] = first[dateKey]
      res[dateKey][_.values(mappingKeyList)[1]] = second[dateKey]
    } else {
      res[dateKey][_.values(mappingKeyList)[0]] = null
      res[dateKey][_.values(mappingKeyList)[1]] = null
    }
  })

  return res
}
/**
 *  針對一張表有多個parameterValue的資料，進行格式化的方法。
 * 可輸入多筆資料進行格式化，亦可將多筆整理為一筆再輸入。
 * 呼叫commonModel.fetchSingleTableMultiParameterValues方法時，只需將回傳值在包裝為陣列後
，作為priceDataList參數直接使用
 * @param {Array} priceDataList 輸入資料清單。第一層陣列作為清單，而元素才是資料陣列。ex:
 1.多筆資料時的輸入:
 [ [{
      "id": 1,
      "item":  "",
      "unit_price": 12,
      "disable_time":  ...,
    }, ...], [{
      "id": 1,
      "item":  "",
      "process_time": 12,
      "disable_time":  ...,
    }] ]
2.將多筆資料整理為一筆時的輸入:
    [ [{
      "id": 1,
      "item":  "",
      "unit_price": 12,
      "process_time": 12,
      "disable_time":  ...,
    }] ]
 * @param {Array} idKeyList 分類資料的id，此清單對應priceDataList內的資料陣列的id。
  1.多筆資料時的輸入:
  ex: [
          ['id'],
          ['id'],
      ]
  2.將多筆資料整理為一筆時的輸入:
    ex: [
          ['id'],
      ]
 * @param {Array} valueKeyList  value的來源屬性名稱。
  1.多筆資料時的輸入:
  ex: [
      ['unit_price'],
      ['process_time']
  ]
  2.將多筆資料整理為一筆時的輸入:
    ex: [
      ['unit_price','process_time']
  ]
 * @param {Array} mappingKeyList 除了預設輸出的屬性(last, current, next, disable)以外，以key value的方式追加格式化後要映射輸出的屬性清單
 請注意：此映射清單最後會被整合在一個物件中，請不要使用相同的映射名稱
  1.多筆資料時的輸入:
  ex: [
          {
            'id': 'id',
            'item': 'item',
            'unit_price': 'unitPrice',
          },
          {
            'process_time': 'processTime',
          },
    ]
  2.將多筆資料整理為一筆時的輸入:
    ex: [
      {
            'id': 'id',
            'adhesive_name': 'item',
            'unit_price': 'unitPrice',
            'process_time': 'processTime',
      }
  ]
 * @returns {Array}
ex:
 [
        {
            "last": {
                "unitPrice": 0,
                "processTime": 0,
                "usageAmount": 0
            },
            "current": {
                "unitPrice": 0.6666,
                "processTime": 0.7777,
                "usageAmount": 0
            },
            "next": {
                "unitPrice": null,
                "processTime": null,
                "usageAmount": null
            },
            "id": "11ee03a4-01d9-11ea-9ea5-0242ac110002",
            "item": "N/A"
        },
  ]
 */
const calcMultiPriceDataByDateObject = (priceDataList, idKeyList, valueKeyList, mappingKeyList) => {
  if(priceDataList.length !== valueKeyList.length){
    throw new Error('The priceDataList length !== valueKeyList length')
  }
  let result = []
  let valueInfoList = {}
  const activateDateKey = 'activate_date'
  const dateFormat = ['last', 'current', 'next']
  priceDataList.forEach((subPriceDataList, index) => {
    const idKeyInfo = idKeyList[index]
    const mappinInfo = mappingKeyList[index]
    for(const idKey of idKeyInfo){
      _.chain(subPriceDataList)
        .groupBy((priceData) => priceData[idKey])
        .map((priceData, id) => {
          let mappingIdKey = mappinInfo[idKey] || 'id'
          let exceptMappingKeyList = {}
          let sortData = _.sortBy(_.uniqBy(priceData, activateDateKey), activateDateKey)
          for(const valueKey of valueKeyList[index]){
            if(!valueInfoList.hasOwnProperty(id)){
              valueInfoList[id] = {
                'last': {},
                'current':{},
                'next':{},
              }
            }
            let valueByDateFormat = getValueByDateFormat(sortData, valueKey, activateDateKey)
            let mappingValueKey = [mappinInfo[valueKey]]
            exceptMappingKeyList[mappingValueKey] = true
            valueInfoList[id][mappingIdKey] = id
            dateFormat.forEach((dateKey) => {
              valueInfoList[id][dateKey][mappingValueKey] = valueByDateFormat[dateKey]
            })
          }
          Object.keys(mappinInfo).forEach((sourceKey) => {
            const mappingKey = mappinInfo[sourceKey]
            if(!valueInfoList.hasOwnProperty(mappingKey) && !exceptMappingKeyList.hasOwnProperty(mappingKey)){
              valueInfoList[id][mappingKey] = priceData[0][sourceKey]
            }
          })
          if(priceData[0].hasOwnProperty('disable_time')){
            valueInfoList[id].disable = priceData[0].disable_time ? true : false
          }
        }).value()
    }
  })
  Object.keys(valueInfoList).forEach((id) =>{
    result.push(valueInfoList[id])
  })
  return result
}

/**
 *
 * @param mappingKeyList key為輸出屬性名稱, value價格資訊 ex:{
  unitPrice: {
    next: 1,
    last: 2,
    current: 3,
  },
  processTime: {
    next: 1,
    last: 2,
    current: 3,
  },
  usageAmount: {
    next: 1,
    last: 2,
    current: 3,
  }
}
 * @returns ex: {
  "last": {
    "unitPrice": null,
    "processTime": null,
    "usageAmount": null
  },
  "current": {
      "unitPrice": 0.01,
      "processTime": 10,
      "usageAmount": 1
  },
  "next": {
      "unitPrice": 0.01,
      "processTime": 15,
      "usageAmount": 1
  },
}
*/
const calcByMultiDateObject = (mappingKeyList) => {

  let dateFormat = ['last', 'current', 'next']
  let keys = Object.keys(mappingKeyList)

  let res = {}
  _.forEach(dateFormat, (dateKey) => {
    res[dateKey] = {}
    _.forEach(keys, (key) => {
      res[dateKey][key] = mappingKeyList[key][dateKey]
    })
  })

  return res
}

const getInsertScheduleDate = async (formulaType) => {
  let scheduleDate = await commonModel.getScheduleDateForAdd(formulaType)

  let { currentId, nextId = null } = getDateFormat(scheduleDate, 'activate_date', 'id')

  let scheduleList = []
  scheduleList.push(currentId)
  if (nextId) {
    scheduleList.push(nextId)
  }

  return scheduleList
}
const checkItemInoperable = (item) => {
  let inoperableString = 'Other_Fill_ME_Remark'

  if (item.toUpperCase() == inoperableString.toUpperCase()) {
    return true
  }
  return false
}

module.exports = {
  getValueByDateFormat,
  getDateFormat,
  getPriceAndLossRateFormat,
  collateMaterialPrice,
  getPercentValues,
  collatePartCategory,
  collateParameter,
  formatSigleTablePriceData,
  formatMultiItemPriceData,
  calcPriceByDateObject,
  calcByMultiDateObject,
  calcMultiPriceDataByDateObject,
  getInsertScheduleDate,
  checkItemInoperable,
}
