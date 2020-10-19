let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { emdmServerConfig } = require('../../../config.js')
const _ = require('lodash')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
const requestUtil = require('../../utils/request/index.js')

// const moment = require('moment')
// const BomManager = require('./bomManager.js')

class EmdmBomData/* extends BomManager*/{

  static async getNewestEmdmBomProjectIdByBomProjectId(bomProjectId){
    const projectCodeListSql = squel.select()
      .field('project_code')
      .from('wiprocurement.bom_projects')
      .where('id = ?', bomProjectId)
    const sql = squel.select()
      .field('id')
      .from('wiprocurement.bom_projects')
      .where('project_code = ?', projectCodeListSql)
      .where('project_source = \'EMDM\'')
      .order('create_time', false)
      .limit(1)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpaceRateFilterBy(product, customer, stage, after, before) {
    let sql = this.generateQuerySqlBySearch(null, null, null, null, product, null, null, null, null, false, after, before, customer, stage)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getEmdmDataBySearch(items, offset, orderBy, column, keyword, project, product_type, site, user_id = null, disable = null) {
    let sql = this.generateQuerySqlBySearch(orderBy, column, keyword, project, product_type, site, items, offset.toString(), user_id, disable)
    // sql.where('fav_id is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getFavEmdmDataBySearch(items, offset, orderBy, column, keyword, project, product_type, user_id, disable) {
    let sql = this.generateQuerySqlBySearch(orderBy, column, keyword, project, product_type, '', items, offset.toString(), user_id, disable)
    sql.where('fav_id is not null')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getEmdmCountBySearch(product_type, column, keyword, project, disable){
    let sql = this.generateQuerySqlBySearch('', column, keyword, project, product_type, '', '', '', null, disable)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }

  static async getVersions(rowData){
    const sql = this.getProjectBySearchResult(rowData)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getEmdmBomDetailById(id){

    let joinSql = squel.select()
      .field('b.bom_id')
      .field('e.stage_name')
      .field('b.stage_id')
      .field('b.create_time')
      .field('b.id', 'version_id')
      .field('b.version_name', 'version_name')
      .from('bom_stage_version', 'b')
      .join(squel.select()
        .field('bom_id')
        .from('bom_stage_version')
        .field('max(create_time)', 'create_time')
        .group('bom_id'),
      'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.product_type')
      .field('ptype.id', 'product_type_id') // 重算 partlist (reCalPartlistPrice)會用到
      .field('a.project_name', 'project_name')
      .field('a.project_code', 'project_code')
      .field('a.customer', 'customer')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('a.site')
      .field('d.version_id', 'cost_version_id')
      .field('d.version_name', 'cost_version')
      .field('d.create_time', 'cost_create_time')
      .field('a.create_time', 'create_time')
      .field('a.create_by', 'create_by')
      .field('a.project_leader', 'project_leader')
      // .field('g.name_a', 'project_leader_name')
      // 找不到 emdm project 的 user name 時，使用sync時提供的名子
      .field('CASE WHEN g.name_a is not null THEN g.name_a ELSE a.approved_by_name END', 'project_leader_name')
      .field('a.approved_by', 'approved_by')
      // .field('f.name_a', 'approved_by_name')
      // 找不到 emdm project 的 user name 時，使用sync時提供的名子
      .field('CASE WHEN f.name_a is not null THEN f.name_a ELSE a.approved_by_name END', 'approved_by_name')
      .field('a.approve_time')
      .field('a.source_version')
      .field('a.sku_desc', 'sku_desc')
      .field('a.product_spec', 'product_spec')
      .from('bom_projects', 'a')
      .where('a.project_source = \'EMDM\'')
      .where('a.id = ?', id)
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')
      .left_join('formula.product_type', 'ptype', 'ptype.type_name = a.product_type')
      .left_join('wiprocurement.user', 'f', 'f.emplid = a.approved_by')
      .left_join('wiprocurement.user', 'g', 'g.emplid = a.project_leader')
    const bomPjRes = await systemDB.Query(sql.toParam())
    return bomPjRes.rows
  }

  static generateQuerySqlBySearch(
    orderBy,
    column,
    keyword,
    project,
    productTypeList,
    site,
    items,
    offset = '',
    user_id = null,
    disable = null,
    after = null,
    before = null,
    customer = null,
    stage = null
  ){
    // the following sql is stage are select by bom_stage table

    let archiveJoinSql = squel.select()
      .field('id', 'archive_id')
      .field('stage_id')
      .field('site')
      .field('project_code')
      .field('create_time', 'archive_time')
      .from('bom_projects_archive')

    let favJoinSql = squel.select()
      .field('id', 'fav_id')
      .field('stage_id')
      .field('site')
      .field('project_code')
      .field('create_time', 'fav_create_time')
      .from('bom_user_favorite')
      .where('user_id = ?', user_id)

    let joinSql = squel.select()
      .field('b.bom_id')
      .field('e.stage_name')
      .field('b.stage_id')
      .field('b.create_time')
      .field('b.id', 'version_id')
      .field('b.version_name', 'version_name')
      .from('bom_stage_version', 'b')
      .join(squel.select()
        .field('bom_id')
        .from('bom_stage_version')
        .field('max(create_time)', 'create_time')
        .group('bom_id'),
      'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    let sqlForId = squel.select()
      .field('Max(a.id)', 'id')
      // .field('a.project_code', 'project_code')
      // .field('d.stage_id', 'stage_id')
      // .field('a.site')
      .from('bom_projects', 'a')
      .left_join(joinSql, 'd', 'd.bom_id = a.id')
      .where('a.project_source = \'EMDM\'')
      .group('a.project_code, a.site, d.stage_id')

    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.product_type', 'product')
      .field('a.project_name', 'project_name')
      .field('a.project_code', 'project_code')
      .field('a.customer', 'customer')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('a.site')
      .field('a.create_time', 'create_time')
      .field('archive.archive_id')
      .field('archive.archive_time')

      .from('bom_projects', 'a')

      // .where(`a.id in ? and a.product_type similar to ?`, sqlForId, `(${product_type})`)
      .where('a.id in ?', sqlForId)
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')
      .left_join(
        archiveJoinSql, 'archive', 'd.stage_id = archive.stage_id AND a.site = archive.site AND a.project_code = archive.project_code'
      )

    if (user_id) {
      sql
        .field('f.fav_create_time')
        .field('f.fav_id')
        .left_join(favJoinSql, 'f', 'd.stage_id = f.stage_id AND a.site = f.site AND a.project_code = f.project_code')
    }

    if (column && keyword){
      if(column.toLowerCase() === 'stage_id'){
        sql.where('d.stage_name like UPPER(?)', `%${keyword}%`)
      }else{
        sql.where(`UPPER(a.${column}) like UPPER(?)`, `%${keyword}%`)
      }
    }

    if(project) {
      sql.where('UPPER(a.project_code) like UPPER(?) or UPPER(a.project_name) like UPPER(?)', `%${project}%`, `%${project}%`)
    }
    if(productTypeList && Array.isArray(productTypeList) && productTypeList.length) {
      sql.where('a.product_type in ?', productTypeList)
    }
    if(site) {
      sql.where('TRIM(UPPER(a.site)) = TRIM(UPPER(?))', site)
    }

    if (customer) {
      sql.where('TRIM(UPPER(a.customer)) = TRIM(UPPER(?))', customer)
    }

    if (stage) {
      sql.where('TRIM(UPPER(d.stage_name)) = TRIM(UPPER(?))', stage)
    }

    // disable == null 時, 不作過濾
    if (!_.isNull(disable)) {
      if (disable) {
        sql.where('archive_id is not null')
      } else {
        sql.where('archive_id is null')
      }
    }

    if (after) {
      sql.where('a.create_time >= ?', after)
    }

    if (before) {
      sql.where('a.create_time <= ?::TIMESTAMP + INTERVAL \'1 day\'', before)
      // sql.where('a.create_time <= ?', before)
    }

    if(user_id) {
      sql.order('f.fav_create_time')
    }

    if(orderBy){
      let orderByCloumn = orderBy.replace('-', '')
      sql.order(orderByCloumn, squelOrderBy(orderBy))
    } else{
      sql.order('id', false)
    }

    if(offset){
      sql.limit(items).offset(offset)
    }

    return sql
  }

  static getProjectBySearchResult(searchResult){
    let projectCodeList = []
    let stageList = []
    let siteList = []
    searchResult.forEach((item) => {
      let codeResult = projectCodeList.find((a) => a === item.project_code)
      if (!codeResult) {
        projectCodeList.push(item.project_code)
      }
      let stageResult = stageList.find((a) => a === item.stage_id)
      if (!stageResult) {
        stageList.push(item.stage_id)
      }
      let siteResult = siteList.find((a) => a === item.site)
      if (!siteResult) {
        siteList.push(item.site)
      }
    })
    let joinSql = squel.select()
      .field('b.bom_id')
      .field('e.stage_name')
      .field('b.stage_id')
      .field('b.create_time')
      .field('b.id', 'version_id')
      .field('b.version_name', 'version_name')
      .from('bom_stage_version', 'b')
      .join(squel.select()
        .field('bom_id')
        .from('bom_stage_version')
        .field('max(create_time)', 'create_time')
        .group('bom_id'),
      'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.product_type', 'product')
      .field('a.project_name', 'project_name')
      .field('a.project_code', 'project_code')
      .field('a.customer', 'customer')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('a.site')
      .field('d.version_id', 'cost_version_id')
      .field('d.version_name', 'cost_version')
      .field('d.create_time', 'cost_create_time')
      .field('a.project_leader', 'project_leader')
      .field('a.create_time', 'create_time')
      .field('a.approve_time')
      .field('a.source_version')
      .field('a.sourcer_permission_id')
      .from('bom_projects', 'a')
      .where('a.project_source = \'EMDM\'')
      .where('a.project_code in ?', projectCodeList)
      .where('d.stage_id in ?', stageList)
      .where('a.site in ?', siteList)
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')

    return sql
  }
  static async getBomEditHistory(bom_id_list, item_id = []) {
    let sql = squel.select().distinct()
      .field('h.bom_id', 'bom_id')
      .field('h.role')
      .field('h.create_time')
      .field('h.value')
      .field('h.source_item_id')

      .field('u.name_a', 'user_name')
      .field('et.label_name')
      .field('et.part_type')
      .field('et.action_type')
      .field('bv.version_name')

      // .field('bi.part_number')
      // .field('bi.part_name')

      .from('wiprocurement.bom_project_edit_history', 'h')
      .join('wiprocurement.user', 'u', 'u.emplid = h.user_id')
      .join('wiprocurement.bom_project_edit_type', 'et', 'et.id = h.field_type_id')
      .join('wiprocurement.bom_stage_version', 'bv', 'bv.id = h.bom_version_id and h.bom_id = bv.bom_id')
      // .left_join('wiprocurement.bom_item', 'bi', 'h.source_item_id = bi.source_item_id')
      .where('h.bom_id in ?', bom_id_list)

    if (item_id.length > 0) {
      sql.where('h.source_item_id in ?', item_id)
    }

    const result = await systemDB.Query(sql.toString())
    return result.rows
  }
  static async getBomImages(project_code, version) {
    let body = {
      projectCode: project_code,
      version,
    }
    let  headers =  {
      'content-type': 'application/json; charset=utf-8',
      'Authorization': emdmServerConfig.emdmImageAuthorization,
    }
    try {
      let res = await requestUtil.requestToEmdm('eprocurement/getPpIdsNewestObjectKeys', body, headers)
      return res ? res.data.data : []
    } catch(err) {
      throw err
    }

  }
  static async getImageURL(objectKeys) {
    let body = {
      objectKeys,
    }

    let headers =  {
      'content-type': 'application/json; charset=utf-8',
      'Authorization': emdmServerConfig.emdmImageAuthorization,
    }
    let res = await requestUtil.requestToEmdm('eprocurement/getDownloadPresignedUrl', body, headers)
    return res ? res.data : []
  }
  static async getBomItemPartName(bom_id) {
    let sql = squel.select().distinct()
      .field('bi.part_number')
      .field('bi.part_name')
      .field('source_item_id')
      .field('bv.bom_id')
      .from('wiprocurement.bom_item', 'bi')
      .join('wiprocurement.bom_stage_version', 'bv', 'bi.version_id = bv.id')
      .where('bv.bom_id in ?', bom_id)

    const result = await systemDB.Query(sql.toString())
    return result.rows
  }

  static async setCostOfNewEmdmVersion (client, bomItem, bomId, version_id, emdm_id) {
    let updatetData = {
      'spa_cost': bomItem.spa_cost,
      'spa_cost_material_remark': bomItem.spa_cost_material_remark,
      'sourcer_shipping': bomItem.sourcer_shipping,
      'sourcer_pl': bomItem.sourcer_pl,
      'sourcer_assembly': bomItem.sourcer_assembly,
      'sourcer_cost_up': bomItem.sourcer_cost_up,
      'sourcer_remark': bomItem.sourcer_remark,
      'shipping_check_cost':bomItem.shipping_check_cost, // ce 運包
      'ce_pl':bomItem.ce_pl,
      'inquiry_cost_up': bomItem.inquiry_cost_up,
      'suggestion_cost_type':bomItem.suggestion_cost_type, // ce cost
      'suggestion_cost_remark':bomItem.suggestion_cost_remark, // ce Remark
      'sourcer_import_curr':bomItem.sourcer_import_curr,
      'ori_sourcer_shipping':bomItem.ori_sourcer_shipping,
      'ori_sourcer_pl':bomItem.ori_sourcer_pl,
      'ori_sourcer_assembly':bomItem.ori_sourcer_assembly,
      'ori_sourcer_cost_up':bomItem.ori_sourcer_cost_up,
    }

    /*
    let sql = squel.update()
      .table('wiprocurement.bom_item')
      .setFields(updatetData)
      .where('version_id = ?', version_id)
      .where('source_item_id = ?', source_item_id)
    */
    let sql = squel.update()
      .table('wiprocurement.bom_item', 'bi')
      .setFields(updatetData)
      .from('wiprocurement.bom_item_emdm_extra', 'extra')
      .where('bi.source_item_id = extra.source_item_id', )
      .where('bi.version_id = ?', version_id)
      .where('extra.bom_id = ?', bomId)
      .where('extra.emdm_id = ?', emdm_id)
    let result = await client.query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  }

  static async insertCopyCostRecord (client, bomID, fromBomID, fromCostVersion) {
    let sql = squel.insert().into('wiprocurement.emdm_copy_cost_record')
      .set('bom_id', bomID)
      .set('from_bom_id', fromBomID)
      .set('from_cost_version', fromCostVersion)
    try{
      await client.query(sql.toParam())
      return true
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return false
    }
  }
  static async getCopyFromProjectID (bomID) {
    let sql = squel.select()
      .field('from_bom_id')
      .from('wiprocurement.emdm_copy_cost_record')
      .where('bom_id = ?', bomID)
    const result = await systemDB.Query(sql.toParam())
    if (result.rows.length) {
      return result.rows[0].from_bom_id
    } else {
      return null
    }
  }

  static async checkBomManagementListExist(tableSchema, params) {
    let sql = squel.select()
      .field('id')
      .from(tableSchema)

    _.forEach(Object.keys(params), (paramKey) => {
      sql.where(`${paramKey} = ?`, params[paramKey])
    })

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0
  }

  static async setBomManagementList(client, tableSchema, params) {

    let sql = squel.insert()
      .into(tableSchema)
      .setFields(params)
      .returning('id')

    let result = await client.query(sql.toParam())
    return result.length > 0 ? result[0].id : null
  }

  static async delBomManagementList(client, tableSchema, conditions) {
    let sql = squel.delete()
      .from(tableSchema)

    _.forEach(Object.keys(conditions), (key) => {
      sql.where(`${key} = ?`, conditions[key])
    })

    let result = await client.query(sql.toParam())
    return result
  }

}
/* (async() => {
  let result = await EmdmBomData.getEmdmDataBySearch(10, 0, '-create_time', '', '', '')
  console.log(result);

})()*/
module.exports = EmdmBomData
