let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const moment = require('moment')
const UUID = require('uuid/v4')

class BomAssignData {
  static async getMeBomDesigneeData(id) {
    let sql = squel.select().from('bom_designee', 'a')
      .field('a.id', 'id')
      .field('a.seq', 'seq')
      .field('a.user_id', 'user_id')
      .field('b.name_a', 'user_name')
      .field('a.function_team_name', 'function_team_name')
      .field('a.isfunctionteam', 'isfunctionteam')
      .left_join('wiprocurement.user', 'b', 'a.user_id = b.emplid')
      .where('bom_project_id = ? ', id)
      .order('seq', true)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async updateDesigneeData(client, pjId, info){
    try{
      // get alreadt designee
      // if id is exist update else insert
      let alreadyExist = await this.alreadyExistDesignee(client, pjId)
      let maxSeq = _.maxBy(alreadyExist, (o) => { return o.seq})
      let seq  = 0
      await Promise.all(
        _.forEach(info, async (v, idx) =>{
          let checkRes = _.findIndex(alreadyExist, (o) => { return o.id ==  v.id})
  
          if(checkRes > -1){
            // need update
            let sql = squel.update().table('bom_designee')
            sql.set('user_id', v.user_id)
            sql.set('update_time', moment().utc().format())
            sql.set('isfunctionteam',  v.function_team_name ? true : false)
            sql.set('function_team_name',  v.function_team_name ? v.function_team_name : '')
            sql.where('id = ? and bom_project_id = ?', v.id, pjId)
            await client.query(sql.toParam())
          }else{
            seq = seq == 0 ? maxSeq.seq + 1 : seq + 1
            let sql = squel.insert().into('bom_designee')
            sql.set('bom_project_id', pjId)
            sql.set('user_id', v.user_id)
            sql.set('id', UUID())
            sql.set('seq', seq)
            sql.set('isfunctionteam',  v.function_team_name ? true : false)
            sql.set('function_team_name',  v.function_team_name ? v.function_team_name : '')
            sql.set('update_time', moment().utc().format())
            await client.query(sql.toParam())
          }
        })
      )
    }catch(err){
      throw err
    }
  }

  static async insertDesigneeData(client, id, info){
    try{
      await client.query(this.insertMESqlGenerate(id, info))
    }catch(err){
      throw err
    }
  }

  static insertMESqlGenerate(id, info){
    let insertArr = []
    _.forEach(info, (v, idx) =>{
      let obj = {}
      obj.bom_project_id = id
      obj.id = UUID()
      obj.seq = idx + 1
      obj.user_id = v.user_id
      obj.isfunctionteam = v.function_team_name ? true : false
      v.function_team_name ?  obj.function_team_name = v.function_team_name :  obj.function_team_name = ''
      obj.update_time = moment().utc().format()
      insertArr.push(obj)
    })
    return squel.insert().into('bom_designee').setFieldsRows(insertArr).toString()
  }

  static async getDesigneeById(bomId, userId) {
    let sql = squel.select()
      .field('id')
      .from('bom_designee')
      .where('user_id = ?', userId)
      .where('bom_project_id = ?', bomId)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  }

  static async checkEditUser(id, userId){
    let sql = squel.select().from('bom_designee', 'a')
      .field('a.user_id', 'user_id')
      .field('a.function_team_name', 'function_team_name')
      .field('a.isfunctionteam', 'isfunctionteam')
      .left_join('wiprocurement.user', 'b', 'a.user_id = b.emplid')
      .join('bom_projects', 'c', 'c.id = a.bom_project_id')
      .where('a.bom_project_id = ? and (a.user_id = ? or c.create_by = ? or c.approved_by = ?)', id, userId, userId, userId)
      .distinct()
      
    const result = await systemDB.Query(sql.toParam())
    if(result.rows.length > 0){
      return true
    }
    return false
  }
  
  static async alreadyExistDesignee(client, pjId){
    try{
      let sql = squel.select().field('user_id').field('id').field('seq').from('bom_designee')
      sql.where('bom_project_id = ?', pjId)
      return client.query(sql.toParam())
    }catch(err){
      throw err
    }
  }

  static async getAlreadyDesigneeCount(id){
    let sql = squel.select().from('bom_designee')
      .where('bom_project_id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    if(result.rows){
      return result.rows.length
    }
    return 0
  }
}
module.exports = BomAssignData