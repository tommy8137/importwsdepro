let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const _ = require('lodash')


class Common {
  /**
   * 從一張table中取得指定的欄位資訊
   * @param {Array} columnNameList
   * @param {String} tableName
   * @param {Array} whereCondition
   * @returns {Object}
   */
  static async getDataByTable(columnNameList, tableName, whereConditionList = null, limit = null){
    let sql = squel.select()
    for(let column of columnNameList){
      sql = sql.field(column)
    }
    sql = sql.from(tableName)
    if(!_.isNull(whereConditionList)){
      for(let condition of whereConditionList){
        sql = sql.where(condition)
      }
    }
    if(!_.isNull(limit)){
      sql = sql.limit(limit)
    }
    let res = await systemDB.Query(sql.toParam())
    return res.rows || []
  }
  /**
   * 將指定的資料封存
   * @param {Object} transactionClient postgres sql transaction client
   * @param {String} tableName data table
   * @param {Object} whereConditionList update condition. example :
   * {
   *  a : 1
   * }
   *  = where(a = 1))
   * {
   *  a: 1,
   *  b: 2
   * }
   * = where(a = 1 and b = 2)
   * {
   *  a : [1, 2, 3]
   * }
   * @param {String} disableColumnKey set to Disable time column name
   */
  static async archiveData(transactionClient, tableName, whereConditionList = null, disableColumnKey = 'disable_time'){
    let sql = squel.update()
      .table(tableName)
      .set(disableColumnKey, 'NOW()')
      .where(`${disableColumnKey} is Null`)
    if(!_.isNull(whereConditionList)){
      Object.keys(whereConditionList).forEach((columnKey)=>{
        let conditionValue = whereConditionList[columnKey]
        if(Array.isArray(conditionValue)){
          sql.where(`${columnKey} in ?`, conditionValue)
        } else {
          sql.where(`${columnKey} = ?`, conditionValue)
        }
      })
    }
    let res = await transactionClient.query(sql.toParam())
    return res.rows || []
  }
  /**
   * 將指定的資料解除封存
   * @param {Object} transactionClient postgres sql transaction client
   * @param {String} tableName data table
   * @param {Object} whereConditionList update condition. example :
   * whereConditionList = {
   *  a : 1
   * }
   *  => SQL: where(a = 1))
   * whereConditionList = {
   *  a: 1,
   *  b: 2
   * }
   * => SQL: where(a = 1 and b = 2)
   * whereConditionList = {
   *  a: [1, 2, 3],
   *  b: 2
   * }
   * => SQL: where((a in (1, 2, 3)) and b = 2)
   * @param {String} disableColumnKey set to Disable time column name
   */
  static async unblockData(transactionClient, tableName, whereConditionList = null, disableColumnKey = 'disable_time'){
    let sql = squel.update()
      .table(tableName)
      .set(disableColumnKey, null)
      .where(`${disableColumnKey} is not Null`)

    if(!_.isNull(whereConditionList)){
      Object.keys(whereConditionList).forEach((columnKey)=>{
        let conditionValue = whereConditionList[columnKey]
        if(Array.isArray(conditionValue)){
          sql.where(`${columnKey} in ?`, conditionValue)
        } else {
          sql.where(`${columnKey} = ?`, conditionValue)
        }
      })
    }
    let res = await transactionClient.query(sql.toParam())
    return res.rows || []
  }
  /**
     * 將指定的資料改名稱
     * @param {Object} transactionClient postgres sql transaction client
     * @param {String} tableName data table
     * @param {Object} whereConditionList update condition. example :
     * whereConditionList = {
     *  a : 1
     * }
     *  => SQL: where(a = 1))
     * whereConditionList = {
     *  a: 1,
     *  b: 2
     * }
     * => SQL: where(a = 1 and b = 2)
     * whereConditionList = {
     *  a: [1, 2, 3],
     *  b: 2
     * }
     * => SQL: where((a in (1, 2, 3)) and b = 2)
     * @param {String} settingColumnKey set column name, ex:
     * {
     *  key: 'material_name', // table的key
     *  value: 'ABC' // item 改名為 'ABC'
     * }
     */
  static async updateItemName(transactionClient, tableName, settingColumnKey, whereConditionList = null){
    let sql = squel.update()
      .table(tableName)
      .set(settingColumnKey.key, settingColumnKey.value)
      // .where(`${disableColumnKey} is not Null`)

    if(!_.isNull(whereConditionList)){
      Object.keys(whereConditionList).forEach((columnKey)=>{
        let conditionValue = whereConditionList[columnKey]
        if(Array.isArray(conditionValue)){
          sql.where(`${columnKey} in ?`, conditionValue)
        } else {
          sql.where(`${columnKey} = ?`, conditionValue)
        }
      })
    }
    // console.log(sql.toString())
    let res = await transactionClient.query(sql.toParam())
    return res.rows || []
  }
}

module.exports = Common
