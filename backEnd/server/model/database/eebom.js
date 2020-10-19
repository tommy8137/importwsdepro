const { systemDB } = require('../../helpers/database')
const squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Eebom model')
const commonModel = require('../common/common.js')

class EebomModel {
  /**
   *  clean avl version from database
   * @param {Object} client transaction postgres clinet
   * @param {String} avlId
   */
  static async cleanAvlVersion(client, avlId = null) {
    const truncateSql = squel.delete()
      .from('wiprocurement.eebom_avl_version')

    if (avlId) truncateSql.where('id = ?', avlId)

    // console.log(truncateSql.toString())
    await client.query(truncateSql.toParam())
  }

  /**
   *  clean connector common pool version from database
   * @param {Object} client transaction postgres clinet
   * @param {String} connectorId
   */
  static async cleanConnectorVersion(client, connectorId = null) {
    const truncateSql = squel.delete()
      .from('wiprocurement.eebom_connector_common_pool_version')

    if (connectorId) truncateSql.where('id = ?', connectorId)
    await client.query(truncateSql.toParam())
  }


  /**
   *  clean avl data from database
   * @param {Object} client transaction postgres clinet
   * @param {String} avlId
   */
  static async cleanAvl(client, avlId = null){
    const truncateSql = squel.delete()
      .from('wiprocurement.eebom_avl')

    if (avlId) truncateSql.where('avl_id = ?', avlId)

    await client.query(truncateSql.toParam())
  }
  /**
   *  upload avl file info to avl version schema
   * @param {Object} client transaction postgres clinet
   * @param {Array} avlDataList
   */
  static async uploadAvlVersion(client, avlVersionInfo){
    const insertSql = squel.insert()
      .into('wiprocurement.eebom_avl_version')
      .setFields(avlVersionInfo)

    await client.query(insertSql.toParam())
  }

  /**
   *  upload connector common pool file info to connector common pool version schema
   * @param {Object} client transaction postgres clinet
   * @param {Array} connectorDataList
   */
  static async uploadConnectorVersion(client, connectorVersionInfo){
    const insertSql = squel.insert()
      .into('wiprocurement.eebom_connector_common_pool_version')
      .setFields(connectorVersionInfo)

    await client.query(insertSql.toParam())
  }

  static async getAvlVersion() {
    const sql = squel.select()
      .field('id')
      .field('version', 'version')
      .field('filename')
      .from('wiprocurement.eebom_avl_version')
      .order('update_time', false)
      .limit(1) // .group('filename')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : { version: 0, filename: null }
  }

  static async getConnectorVersion() {
    const sql = squel.select()
      .field('id')
      .field('version', 'version')
      .field('filename')
      .from('wiprocurement.eebom_connector_common_pool_version')
      .order('update_time', false)
      .limit(1)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : { version: 0, filename: null }
  }

  /**
   *  upload avl excel data to temp schema
   * @param {Object} client transaction postgres clinet
   * @param {Array} avlDataList
   */
  static async uploadAvl(client, avlDataList){
    const insertSql = squel.insert()
      .into('wiprocurement.eebom_avl')
      .setFieldsRows(avlDataList)

    await client.query(insertSql.toParam())
  }

  /**
   *
   * @param {UUid} avlId avl upload id
   * @returns {Array}
   */
  static async getAvlInfoById(avlId){
    const result = await commonModel.getDataByTable(['*'], 'wiprocurement.eebom_avl_version', [`id = '${avlId}'`])

    return result.length > 0 ? result[0] : []
  }

  /**
   *
   * @param {UUid} commonId connector common pool upload id
   * @returns {Array}
   */
  static async getConnectorInfoById(commonId){
    const result = await commonModel.getDataByTable(['*'], 'wiprocurement.eebom_connector_common_pool_version', [`id = '${commonId}'`])

    return result.length > 0 ? result[0] : []
  }

  /**
   *
   * @returns {Array}
   */
  static async getAvlList(){
    const sql = squel.select().distinct()
      .from('wiprocurement.eebom_avl_version avl')
      .field('avl.id', 'avl_id')
      .field('avl.filename', 'file_name')
      .field('to_char(avl.update_time, \'YYYY-MM-DD HH24:MI\')', 'update_time')
      .field('avl.version')
      .field('usertable.name_a', 'update_by')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = avl.update_by')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  /**
   *
   * @returns {Array}
   */
  static async getConnectorList(){
    const sql = squel.select().distinct()
      .from('wiprocurement.eebom_connector_common_pool_version connector')
      .field('connector.id', 'common_pool_id')
      .field('connector.filename', 'file_name')
      .field('to_char(connector.update_time, \'YYYY-MM-DD HH24:MI\')', 'update_time')
      .field('connector.version')
      .field('usertable.name_a', 'update_by')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = connector.update_by')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  /**
   *
   * @returns {Array}
   */
  static async getCommonPoolList(){
    const sql = squel.select().field('*').from('wiprocurement.eedm_common_parts')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  /**
   *  clean common part upload table data
   * @param {Object} client transaction postgres clinet
   * @param {String} version_id
   */
  static async cleanCommonPart(client, version_id) {
    const truncateSql = squel.delete()
      .from('wiprocurement.database_common_parts')

    if (version_id) truncateSql.where('version_id = ?', version_id)

    await client.query(truncateSql.toParam())
  }

  /**
   *  upload common part excel data to DB
   * @param {Object} client transaction postgres clinet
   * @param {Array} avlDataList
   */
  static async uploadCommonPart(client, dataSet) {
    const insertSql = squel.insert()
      .into('wiprocurement.database_common_parts')
      .setFieldsRows(dataSet)

    await client.query(insertSql.toParam())
  }

  /**
   *
   * @returns {Array}
   */
  static async getTemporaryFileList(){
    const sql = squel.select().distinct()
      .from('wiprocurement.eebom_temporary_file_version temporary')
      .field('temporary.id', 'temporary_id')
      .field('temporary.filename', 'file_name')
      .field('to_char(temporary.update_time, \'YYYY-MM-DD HH24:MI\')', 'update_time')
      .field('usertable.name_a', 'update_by')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = temporary.update_by')
      .order('update_time', false)
      
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  /**
   *  upload temporary file info to temporary version schema
   * @param {Object} client transaction postgres clinet
   * @param {Array} temporaryDataList
   */
  static async uploadTemporaryVersion(client, temporaryVersionInfo){
    const insertSql = squel.insert()
      .into('wiprocurement.eebom_temporary_file_version')
      .setFields(temporaryVersionInfo)

    await client.query(insertSql.toParam())
  }

  /**
   *
   * @param {UUid} temporaryId temporary file upload id
   * @returns {Array}
   */
  static async getTemporaryInfoById(temporaryId){
    const result = await commonModel.getDataByTable(['*'], 'wiprocurement.eebom_temporary_file_version', [`id = '${temporaryId}'`])

    return result.length > 0 ? result[0] : []
  }
  /**
   *  clean temporary file from database
   * @param {Object} client transaction postgres clinet
   * @param {String} temporaryId
   */
  static async cleanTemporaryVersion(client, temporaryId = null) {
    const truncateSql = squel.delete()
      .from('wiprocurement.eebom_temporary_file_version')
      .where('id = ?', temporaryId)

    await client.query(truncateSql.toParam())
  }
}


module.exports = EebomModel
