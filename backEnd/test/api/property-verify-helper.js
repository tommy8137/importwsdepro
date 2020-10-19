const { systemDB } = require('../../server/helpers/database/index.js')
const { asyncForEach, formatFloat } = require('../../server/helpers/utils.js')
let squel = require('squel').useFlavour('postgres')
const { expect } = require('chai')

class PropertyVerifyHelper {
  /**
   * 根據 parameterId 及 activateDateId 取得 parameterValue
   * api testing 核對數值是否正確
   * @param {Array} parameterIdList
   * @param {Array} activateDateIdList
   */
  static async getMultiParameterValue (parameterIdList = [], activateDateIdList = []) {
    let sql = squel.select()
      .field('parameter_id')
      .field('activate_date_id')
      .field('value')
      .from('formula.parameter_value')
      .where('parameter_id in ?', parameterIdList)
      .where('activate_date_id in ?', activateDateIdList)
    const result = await systemDB.Query(sql.toParam())    
    return result.rowCount > 0 ? result.rows : []
  }
  /**
   * 核對物件內容及型別
   * @param {Object} item 要核對的物件
   * @param {Array} propertyList 核對清單 
   * EX:[
   *  ['key', 'vlaueType', 'special_check'],
   *  ['name', 'string'], // 屬性名稱 name 型別為 string
   *  ['name', 'string', can_be_null'], // 屬性名稱 name 型別為 string 值可以是 null
   *  ['name', 'string', can_be_undefind'], // 屬性名稱 name 型別為 string name屬性可以不存在
   * ] 
   */
  static propertyTypeVerify(item, propertyList) {
    
    propertyList.forEach((prop) => {
      switch (prop[2]) {
        case 'can_be_null': // 值可以是null
          expect(item).to.have.property(prop[0])
          if (item[prop[0]] !== null) {
            expect(item[prop[0]]).to.be.a(prop[1], `property:${prop[0]}`)
          }
          break;
        case 'can_be_undefind': // 屬性可以未定義
          if (item.hasOwnProperty(prop[0])) {
            expect(item[prop[0]]).to.be.a(prop[1], `property:${prop[0]}`)
          }
          break;
        default:
          expect(item).to.have.property(prop[0])
          expect(item[prop[0]]).to.be.a(prop[1], `property:${prop[0]}`)
          break;
      }     
    })
  }

  /**
   * 常用格式date檢查
   {
      "last": '2019/01/01',
      "lastId": 1,
      "current": '2019/06/01',
      "currentId": 2,
      "next": '2019/12/01',
      "nextId": 3,
   }
   * @param {Object}} date 
   */
  static verifyPropertyDate(date) {
    let verifyList = [
      ['last', 'string', 'can_be_undefind'],
      ['lastId', 'number', 'can_be_undefind'],
      ['current', 'string'],
      ['currentId', 'number'],
      ['next', 'string', 'can_be_undefind'],
      ['nextId', 'number', 'can_be_undefind'],
    ]
    this.propertyTypeVerify(date, verifyList)
  }

  /**
   * 與資料庫中 parameter_value 核對資料
   * @param {Object} date date 物件
    {
      "last": '2019/01/01',
      "lastId": 1,
      "current": '2019/06/01',
      "currentId": 2,
      "next": '2019/12/01',
      "nextId": 3,
    }
   * @param {Object} item 價格資料
    [ 
      {
        id: '666-666-666',
        last: 0,
        current: 0,
        next: 0,
        ...
      },
      {
        id: '666-666-666',
        last: 0,
        current: 0,
        next: 0,
        ...
      }
    ]
   * @param {String} idKey 存放 parameter_id 的 key 預設為 'id'
   */
  static async verifyValue(date, dataList, idKey = 'id'){
    let parameterIdList = []
    let activateDateIdList = []
    let valueList = []
    let activateDateIdKeyList = [['lastId', 'last'], ['currentId', 'current'], ['nextId', 'next']]
    let activateDateIdKeyLength = activateDateIdKeyList.length
    for(let i = 0; i < activateDateIdKeyLength; i++){
      let key = activateDateIdKeyList[i]
      let idExist = date.hasOwnProperty(key[0])
      activateDateIdList.push(date[key[0]])
      await asyncForEach(dataList, async (item) => {
        let valueNotNull = item[key[1]] !== null
        expect((idExist && !valueNotNull) || (!idExist && valueNotNull)).to.be.false // XOR 必須同時存在或不存在
        if (valueNotNull) {
          expect(item).to.have.property(idKey)
          parameterIdList.push(item[idKey])
          valueList.push({
            'value': (item.hasOwnProperty('unit') && item.unit === '%')?item[key[1]]/100 : item[key[1]],
            'id': item[idKey],
            'dateId': date[key[0]],
          })
        }
      })
    }
    let searchValueList = await this.getMultiParameterValue(parameterIdList, activateDateIdList)
    let valueMap = new Map()
    searchValueList.forEach((item) => {
      let key = item.parameter_id + ':' + item.activate_date_id
      expect(valueMap.has(key)).to.be.false
      valueMap.set(key, item.value)
    })
    valueList.forEach((valueItem) => {
      let key = valueItem.id + ':' + valueItem.dateId
      expect(valueMap.has(key)).to.be.true
      expect(formatFloat(valueMap.get(key), 8)).to.equal(valueItem.value)
    })
  }
  /**
   * 與資料庫中 parameter_value 核對資料
   * @param {Object} date date 物件
  {
      "last": '2019/01/01',
      "lastId": 1,
      "current": '2019/06/01',
      "currentId": 2,
      "next": '2019/12/01',
      "nextId": 3,
   }
   * @param {Array} dataList 價格資料
  [
    {
      name: 'test',
      items:[
        {
          id: '666-666-666',
          last: 0,
          current: 0,
          next: 0,
          ...
        }
      ]
    },
    {
      name: 'test2',
      items:[
        {
          id: '666-666-666',
          last: 0,
          current: 0,
          next: 0,
          ...
        }
      ]
    }
  ]
   * @param {String} subItemKey 子物件名稱 預設為 'items'
   * @param {String} idKey 存放 parameter_id 的 key 預設為 'id'
   */
  static async verifySubItemsValue(date, dataList, subItemKey = 'items', idKey = 'id'){
    let parameterIdList = []
    let activateDateIdList = []
    let valueList = []
    let activateDateIdKeyList = [['lastId', 'last'], ['currentId', 'current'], ['nextId', 'next']]
    await asyncForEach(activateDateIdKeyList, async (key) => {
      let idExist = date.hasOwnProperty(key[0])
      activateDateIdList.push(date[key[0]])
      await asyncForEach(dataList, async (item) => {
        expect(item).to.have.property(subItemKey)
        expect(item[subItemKey]).to.be.a('array')
        await asyncForEach(item[subItemKey], async (subItem) => {
          let valueNotNull = subItem[key[1]] !== null
          expect((idExist && !valueNotNull) || (!idExist && valueNotNull)).to.be.false // XOR 必須同時存在或不存在
          if (valueNotNull) {
            expect(subItem).to.have.property(idKey)
            parameterIdList.push(subItem[idKey])
            valueList.push({
              'value': (subItem.hasOwnProperty('unit') && subItem.unit === '%')?subItem[key[1]]/100 : subItem[key[1]],
              'id': subItem[idKey],
              'dateId': date[key[0]],
            })
          }
        })
      })
    })
    let searchValueList = await this.getMultiParameterValue(parameterIdList, activateDateIdList)
    let valueMap = new Map()
    searchValueList.forEach((item) => {
      let key = item.parameter_id + ':' + item.activate_date_id
      expect(valueMap.has(key)).to.be.false
      valueMap.set(key, item.value)
    })
    valueList.forEach((valueItem) => {
      let key = valueItem.id + ':' + valueItem.dateId
      expect(valueMap.has(key)).to.be.true
      expect(formatFloat(valueMap.get(key), 8)).to.equal(valueItem.value, key)
    })
  }
  /**
   * 取得要驗證的子物件清單
   * @param {Object} item
   * @param {Object} exceptPropList 要除外的清單
ex:
{
  id: true,
}
   */
  static getVerifyPropertyObjectList(item, exceptPropList) {
    return Object.keys(item)
      .filter((prop) => exceptPropList.hasOwnProperty(prop) ? false : true)
      .map((prop) => {
        expect(item[prop]).to.be.a('object')
        return [prop, 'object']
      })
  }
}
module.exports = PropertyVerifyHelper