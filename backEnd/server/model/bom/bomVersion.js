let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const _ = require('lodash')
const UUID = require('uuid/v4')
const moment = require('moment')

class BomVersoion {
  static async insertVersionDataWithTran(client, bomId, stage, version) {
    let sql = squel.insert().into('bom_stage_version')
    if (bomId) sql.set('bom_id', bomId)
    if (stage) sql.set('stage_id', stage)
    if (version) sql.set('version_name', version)
    sql.set('create_time', moment().utc().format())
    sql.set('id', UUID())
    sql.returning('id')

    try {
      let id = await client.query(sql.toParam())
      return id[0].id
    } catch (err) {
      throw err
    }
  }

  static async insertVersionDataWithAtomic(client, bomId, stage, version) {
    let sql = squel.insert().into('bom_stage_version')
    if (bomId) sql.set('bom_id', bomId)
    if (stage) sql.set('stage_id', stage)
    if (version) sql.set('version_name', version)
    sql.set('create_time', moment().utc().format())
    sql.set('id', UUID())
    sql.returning('id')

    try {
      let id = await client.query(sql.toParam())
      if(id.rows){
        return id.rows[0].id
      }else{
        return id[0].id
      }
    } catch (err) {
      throw err
    }
  }

  static async insertVersionData(bomId, stage, version) {
    let sql = squel.insert().into('bom_stage_version')
    if (bomId) sql.set('bom_id', bomId)
    if (stage) sql.set('stage_id', stage)
    if (version) sql.set('version_name', version)
    sql.set('create_time', moment().utc().format())
    sql.set('id', UUID())

    try {
      await systemDB.Query(sql.toParam())
    } catch (err) {
      throwApiError(err, errorCode.updateFailed)
      return false
    }
    return true
  }
  /**
   * 更新stage
   * @param {postgres} client 
   * @param {number} id 
   * @param {string} version_id 
   * @param {string} stage 
   */
  static async updateStage(client, id, version_id, stage){
    let sql = squel.update().table('bom_stage_version')
      .set('stage_id', stage)
      .where('bom_id = ? and id = ?', id, version_id)
    const result = await client.query(sql.toParam())
    return result.rows
  }

  static async updateVerion(client, bomId, vname){

    let sql = squel.update()
      .table('bom_stage_version')
      // .where('bom_id = ?', bomId)
      .where('id = ?',  squel.select().field('id').from('bom_stage_version').where('bom_id = ?', bomId).order('create_time', false).limit(1))
      .set('version_name', vname)
      .returning('*')
      .toParam()
    const result = await client.query(sql)
    return result.rows
  }

  static async updateVerionWithLastRecord(client, bomId, vname){
    let subSql = squel.select().field('b.id', 'id').from('bom_stage_version', 'b').join(
      squel.select().field('bom_id').field('max(create_time)', 'create_time').from('bom_stage_version').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .where('b.bom_id = ?', bomId)

    let sql = squel.update()
      .table('bom_stage_version')
      .where('id = ?', subSql)
      .set('version_name', vname)
      .returning('*')
      .toParam()
    const result = await client.query(sql)
    return result.rows
  }

  /**
   * 確認目前的stage是否需要更新
  * @param {number} id 
  * @param {string} version_id 
  * @param {string} stage 
  */
  static async checkNeedUpdateStage(bomId, version_id, stage){
    let sql = squel.select().from('bom_stage_version')
      .field('stage_id', 'id')
      .where('bom_id = ?', bomId)
      .where('id = ? ', version_id)
      .where('stage_id = ? ', stage)
      .limit(1)
    let res = await systemDB.Query(sql.toParam())
    if(res.rows && res.rows.length > 0){ // stage 是相同的 不需要更新
      return false
    }
    return true
  }

  static async checkNeedUpdateProductType(bomId, productType) {
    let sql = squel.select()
      .field('product_type')
      .from('wiprocurement.bom_projects')
      .where('id = ?', bomId)
      .where('product_type = ?', productType)
      .limit(1)
    let res = await systemDB.Query(sql.toParam())
    if(res.rows && res.rows.length > 0){
      return false
    }
    return true
  }

  static async updateVersionById(bomId, versionId, versionName){
    let sql = squel.update().table('bom_stage_version')
      .set('version_name', versionName)
      .set('create_time', moment().utc().format())
      .where('bom_id = ? and id = ?', bomId, versionId)
    const result = await systemDB.Query(sql.toParam())
    return result
  }

  static async updateVersionByStage(bomId, stageId, versionName){
    let sql = squel.update().table('bom_stage_version')
      .set('version_name', versionName)
      .set('create_time', moment().utc().format())
      .where('create_time = ? ', squel.select().from('bom_stage_version').field('max(create_time)', 'create_time').where('bom_id = ? and stage_id = ?', bomId, stageId).group('bom_id'))
    const result = await systemDB.Query(sql.toParam())
    return result
  }

  static async getNextVersion(bomId, stageId, eventType) {
    let sql = squel.select().from('bom_stage_version')
      .field('id', 'id')
      .field('version_name', 'version_name')
      .where('bom_id = ? and stage_id = ? ', bomId, stageId).order('create_time', false).limit(1)
    const result = await systemDB.Query(sql.toParam())
    let currentVersion
    let mainVersion = '0'
    let subVersion = '.0'

    if (result.rows && result.rows.length > 0) {
      currentVersion = result.rows[0].version_name
      mainVersion = currentVersion.split('.')[0]
      subVersion = currentVersion.split('.')[1]
      if (eventType.toUpperCase() == 'EDIT') {
        subVersion = '.5'
      } else if (eventType.toUpperCase() == 'APPROVE') {
        subVersion = '.7'
      } else if (eventType.toUpperCase() == 'VERSIONCOMPLETE') {
        mainVersion = Number(mainVersion) + 1
        subVersion = '.0'
      }
    }
    
    return mainVersion + subVersion
  }
  
  static async getBomStage(bomId){
    let sql = squel.select()
      .field('b.bom_id')
      .field('e.stage_name')
      .field('b.stage_id')
      .field('b.create_time')
      .field('b.id', 'version_id')
      .field('b.version_name', 'version_name')
      .from('bom_stage_version', 'b')
      .join(
        squel.select()
          .field('bom_id')
          .field('max(create_time)', 'create_time')
          .from('bom_stage_version')
          .group('bom_id'),
        'c',
        'c.bom_id = b.bom_id and b.create_time = c.create_time'
      )
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')
      .where('b.bom_id = ?', bomId)
    try {
      let result = await systemDB.Query(sql.toParam())
      return result.rows
    } catch (err) {
      throw err
    }
  }

  static async getNextVersionUuid(client, bomId, type = null) {
    let stageRes = await this.getBomStage(bomId)
    let currentVersion
    let mainVersion = '0'
    let subVersion = '.0'
    let tmp_version_id = stageRes[0].version_id
    let new_version_id = null
    let newVer = null

    if (stageRes.length > 0) {
      currentVersion = stageRes[0].version_name
      mainVersion = currentVersion.split('.')[0]
      subVersion = currentVersion.split('.')[1]
      if (!type) {
        subVersion = '.5'
      } else {
        if (type.toUpperCase() == 'EDIT') {
          subVersion = '.5'
        } else if (type.toUpperCase() == 'APPROVE') {
          subVersion = '.7'
        } else if (type.toUpperCase() == 'VERSIONCOMPLETE') {
          mainVersion = Number(mainVersion) + 1
          subVersion = '.0'
        }
      }
      newVer = mainVersion + subVersion
      if(newVer != currentVersion){
        new_version_id = await this.insertVersionDataWithAtomic(client, bomId, stageRes[0].stage_id, newVer)
      }else{
        new_version_id = tmp_version_id
      }
      return { 'old_version_id': tmp_version_id, 'new_version_id': new_version_id, 'stage_id': stageRes[0].stage_id, 'isNewRecord': !(new_version_id == tmp_version_id) }
    }
    return null
  }

  static async updateBomItemVersionId(client, oldVersionId, newVersionId) {
    let sql = squel.update().table('wiprocurement.bom_item')
      .set('version_id', newVersionId)
      .where('version_id = ? ', oldVersionId)
    const result = await client.query(sql.toParam())
    return result
  }

  static async getBomIdbyItemId(bomItemId){
    let sql = squel.select().field('a.bom_id')
      .from('bom_stage_version', 'a')
      .join(squel.select().field('version_id').from('wiprocurement.bom_item').where('id = ?', bomItemId), 'b', 'a.id = b.version_id')
    try {
      let result = await systemDB.Query(sql.toParam())
      return result.rows
    } catch (err) {
      throw err
    }
  }

  static async getBomIdbyHistoryItemId(bomItemId){
    let sql = squel.select().field('a.bom_id')
      .from('bom_stage_version', 'a')
      .join(squel.select().field('version_id').from('wiprocurement.bom_item_complete_version').where('id = ?', bomItemId), 'b', 'a.id = b.version_id')
    try {
      let result = await systemDB.Query(sql.toParam())
      return result.rows
    } catch (err) {
      throw err
    }
  }
}
module.exports = BomVersoion