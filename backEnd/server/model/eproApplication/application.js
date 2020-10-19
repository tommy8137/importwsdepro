let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const {  useParenthesesForArr } = require('../../helpers/query/processString.js')
const moment = require('moment')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
class Application {
  static async getProjectInfoByProjectCode(project_code){
    let sql  = squel.select()
      .field('project_code')
      .field('project_name')
      .field('product_type')
      .field('purchasing_organization')
      .field('stage')
      .from('wiprocurement.eebom_projects').where('project_code LIKE ?', `%${project_code}%`)
      .group('project_code').group('project_name').group('product_type').group('purchasing_organization').group('stage')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getSkus(project_code, stage){
    let sql  = squel.select()
      .field('sku')
      .from('wiprocurement.eebom_projects')
      .where('project_code = ?', project_code)
      .where('stage = ?', stage)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
}

module.exports = Application
