const { expect } = require('chai')
const verifyHelper = require('../../property-verify-helper.js')

class TestGet{
  constructor(api){
    this.api = api
  }
  /**
   *  發送get請求後，驗證res的狀態碼
   * @param {String} route API Route
   * @param {String} Authorization access Token
   * @param {Number} statusCode http statusCode
   * @param {Function} callback mocha done
   */
  checkStatusCode(route, Authorization, statusCode, callback){
    this.api.get(route)
      .set('Authorization', `Bearer ${Authorization}`)
      .expect(statusCode, callback)
  }
  /**
   *  發送get請求後，驗證res的內容
   * @param {String} Authorization access Token
   * @param {Number} statusCode   http statusCode
   * @param {Object} apiTestInfo API Test Config Info
   * @param {Function} callback mocha done
   */
  checkGetResBody(Authorization, statusCode, apiTestInfo, callback){
    this.api.get(apiTestInfo.route)
      .set('Authorization', `Bearer ${Authorization}`)
      .expect(statusCode)
      .end(async (err, res) => {
        if (err) {
          return callback(err)
        }
        const body = res.body
        expect(body).to.be.a('object')
        if(apiTestInfo.isCheckDate){
          expect(body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
        }
        expect(body).to.have.property(apiTestInfo.listName)
        const dataList = body[apiTestInfo.listName]
        expect(dataList).to.be.a('array')
        for(const info of dataList){
          verifyHelper.propertyTypeVerify(info, apiTestInfo.propertyList)
        }
        this._checkSubList(dataList, apiTestInfo.subList)
        await this._verifySubItemsValue(body.date, dataList, apiTestInfo.subList)
        return callback()
      })
  }
  /**
   * 檢查指定的資料子物件內容是否符合設定檔
   * @param {Array} dataList 來源資訊
   * @param {Object} subList API Test Config Info. source : apiTestInfo.subList
   */
  _checkSubList(dataList, subList){
    switch (subList.type) {
      case 'array':
        this._checkSubListArray(dataList, subList.name, subList.propertyList)
        break
      case 'object':
        this._checkSubListObj(dataList, subList.propertyList, subList.notObjPropertyList)
        break
      case 'none':
      case '':
        break
      default:
        throw new Error(`unknow subListType : ${subList.type}. The subListType only: array or object`)
    }
  }
  /**
   * 適用於子物件型別為陣列的資訊。核對該資訊的子物件的內容是否符合設定
   * @param {Array} dataList 來源資訊
   * @param {String} subListName 子物件屬性名稱
   * @param {Array} subPropertyList 要核對的子物件清單
   */
  _checkSubListArray(dataList, subListName, subPropertyList){
    for(const data of dataList){
      expect(data).to.have.property(subListName)
      const subDataList = data[subListName]
      for(const subData of subDataList){
        verifyHelper.propertyTypeVerify(subData, subPropertyList)
      }
    }
  }
  /**
   * 適用於子物件型別為物件的資訊。核對該資訊的子物件的內容是否符合設定
   * @param {Array} dataList 來源資訊
   * @param {Array} subPropertyList 要核對的子物件清單
   * @param {Array} notObjPropertyList 非物件的屬性清單. ex:['id', 'item', 'disable']
   */
  _checkSubListObj(dataList, subPropertyList, notObjPropertyList){
    let expectList = {
      'id': true,
      'disable': true,
    }
    notObjPropertyList.forEach((propName) => {
      expectList[propName] = true
    })
    for(const data of dataList){
      let subObjectPropList = verifyHelper.getVerifyPropertyObjectList(data, expectList)
      verifyHelper.propertyTypeVerify(data, subObjectPropList)
      subObjectPropList.forEach((propInfo) => {
        const propName = propInfo[0]
        verifyHelper.propertyTypeVerify(data[propName], subPropertyList)
      })
    }
  }
  /**
   * 到資料庫驗證資料內容是否正確
   * @param {Object} date 日期物件 ex:{
        "current": "1970-01-01",
        "currentId": 133,
        "next": "2019-11-29",
        "nextId": 134
    }
   * @param {Array} dataList 資料清單
   * @param {String} subListName 子物件屬性名稱
   */
  async _verifySubItemsValue(date, dataList, subList){
    switch (subList.type) {
      case 'array':
        await this._verifySubItemsValue(date, dataList, subList.name)
        break
      case 'object':
        break
      case 'none':
      case '':
        break
      default:
    }
  }
}

module.exports = TestGet