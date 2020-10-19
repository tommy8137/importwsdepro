let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { bomFilterType } = require('../../../config.js')
const _ = require('lodash')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
const moment = require('moment')

const matchedProjectSource = ['EMDM']
class BomManagerData {

  static async getMeData(items, offset, orderBy, column, keyword) {
    let sql = this.generateQuerySql(items, offset.toString(), orderBy, column, keyword)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getMeDataBySearch(items, offset, orderBy, column, keyword, project, product_type) {
    let sql = this.generateQuerySqlBySearch(items, offset.toString(), orderBy, column, keyword, project, product_type)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getMeCount(column, keyword, userId = ''){
    let sql = this.generateQuerySql('', '', '', column, keyword)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }

  static async getMeCountBySearch(product_type, column, keyword, project, userId = ''){
    let sql = this.generateQuerySqlBySearch('', '', '', column, keyword, project, product_type)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }

  static async getMeCountByProjectCode(project_code, ignoreBomId){
    let joinSql = squel.select().field('b.bom_id').field('e.stage_name').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
      squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    let sql = squel.select()
      .field('a.id', 'id')
      .from('bom_projects', 'a')
      .where(`a.project_source is NULL`)
      .left_join(joinSql, 'd', 'd.bom_id = a.id')
      .where('a.project_code = ?', project_code)

    if (ignoreBomId) {
      sql.where('a.id != ?', ignoreBomId)
    }
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }

  static async getMeBomDetailById(id, projectSource = ''){
    // the following sql is stage are select by bom_stage table
    let joinSql =
      squel.select()
        .field('b.bom_id').field('e.stage_name').field('b.stage_id').field('b.create_time')
        .field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name')
        .from('wiprocurement.bom_stage_version', 'b')
        .join(squel.select().field('bom_id').from('wiprocurement.bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
        .join('wiprocurement.bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    // let joinSql = squel.select().field('b.bom_id').field('b.stage_id', 'stage_name').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
    //   squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')

    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.customer', 'customer')
      .field('a.project_name', 'project_name')
      .field('a.product_type', 'product_type')
      .field('pt.id', 'product_type_id')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('d.version_id', 'version_id')
      .field('d.version_name', 'version')
      .field('a.project_leader', 'project_leader')
      .field('g.name_a', 'project_leader_name')
      .field('a.approved_by', 'approved_by')
      .field('f.name_a', 'approved_by_name')
      .field('a.create_by', 'create_by')
      .field('a.project_code', 'project_code')
      .field('a.project_name', 'project_name')
      // .field('a.system_model_pn', 'system_model_pn')
      // .field('a.id_cmf_file_data', 'id_cmf_file_data')
      .field('a.sku_desc', 'sku_desc')
      .field('a.product_spec', 'product_spec')
      .field('a.site', 'site')
      .field('a.project_source', 'project_source')
      .field('a.source_version', 'source_version')
      .from('wiprocurement.bom_projects', 'a')
      .join('formula.product_type', 'pt', 'pt.type_name = a.product_type')
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')
      .left_join('wiprocurement.user', 'f', 'f.emplid = a.approved_by')
      .left_join('wiprocurement.user', 'g', 'g.emplid = a.project_leader')
      .where('a.id = ? ', id)
      // .where(`a.project_source is NULL`)
    if (projectSource && matchedProjectSource.includes(projectSource)) {
      sql.where('a.project_source = ?', projectSource)
    } else {
      sql.where('a.project_source is NULL')
    }
    const bomPjRes = await systemDB.Query(sql.toParam())
    return bomPjRes.rows
  }

  static async getMeIdVersionId (version_id) {
    let bomId = squel.select()
      .field('bom_id')
      .from('wiprocurement.bom_stage_version')
      .where('id = ?', version_id)
    const bomPjRes = await systemDB.Query(bomId.toParam())
    return bomPjRes.rows[0]
  }

  static async getDataByUser(userId, items, offset, orderBy, column, keyword ){
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.customer', 'customer')
      .field('a.product', 'product')
      .field('a.status', 'status')
      .field('a.version', 'version')
      .field('a.project_leader', 'project_leader')
      .field('a.approved_by', 'approved_by')
      .from('bom_projects', 'a')
      .distinct()
      .join('bom_assign_data', 'b', 'b.bom_project_id = a.id')
      .where(`a.project_source is NULL`)

    sql.where('b.user_id = ?', userId)
    if (column && keyword){
      sql.where(`${column} like UPPER(?)`, `%${keyword}%`)
    // sql.where('bg like UPPER(?) or customer like UPPER(?) or product like UPPER(?) or stage like UPPER(?) or version like UPPER(?) or project_leader like UPPER(?)' +
    //   'or approved_by like UPPER(?)', `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%` )
    }
    if(orderBy){
      orderBy = 'a.' + orderBy
      sql.order(orderBy, false)
    }else{
      sql.order('a.id', false)
    }
    sql.limit(items).offset(offset)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getBomFilterItems(column, userID, projectSource = ''){
    try{
      let filterValue = new BomFilterValue({ column: column })
      return filterValue.getFilterValue(userID, projectSource)
    }catch(err){
      throw err
    }
  }
  static async getEEBomFilterItems(column, userID){
    try{
      let filterValue = new BomFilterValue({ column: column })
      return filterValue.getFilterEEBomValue(userID)
    }catch(err){
      throw err
    }
  }

  static getBomFilterType(role){
    let filterRes = bomFilterType[role.toUpperCase()]
    let res = []
    _.forEach(filterRes, (v, idx) =>{
      let obj = {}
      obj.key = v
      obj.value = idx
      res.push(obj)
    })
    return res
  }

  static async updateData(client, id, info){
    const { customer, product_type, project_leader, approved_by, project_code, project_name, site, /*system_model_pn, id_cmf_file_data,*/ product_spec, sku_desc } = info
    let sql = squel.update().table('bom_projects')

    if(customer) sql.set('customer', customer)
    if(product_type) sql.set('product_type', product_type)
    if(project_leader) sql.set('project_leader', project_leader)
    if(approved_by) sql.set('approved_by', approved_by)
    // if(project_code) sql.set('project_code', project_code)
    sql.set('project_code', project_code)
    if(project_name) sql.set('project_name', project_name)
    if(site) sql.set('site', site)
    // if(system_model_pn) sql.set('system_model_pn', system_model_pn)
    // if(id_cmf_file_data) sql.set('id_cmf_file_data', id_cmf_file_data)
    if(product_spec) sql.set('product_spec', product_spec)
    // if(sku_desc != null && sku_desc != undefined) sql.set('sku_desc', sku_desc)
    sql.set('sku_desc', sku_desc)
    sql.set('update_time', moment().utc().format())
    sql.where('id = ?', id)

    try{
      await client.query(sql.toParam())
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return false
    }
    return true
  }

  static async insertData(client, user_id, info){
    const { customer, product_type, project_leader, approved_by, project_code, project_name, site, /*system_model_pn, id_cmf_file_data,*/ product_spec, sku_desc } = info

    // If input stage is string trnasfer it
    // console.log('stageId', await this.getStageId(client, stage))
    let sql = squel.insert().into('bom_projects')
    if(customer) sql.set('customer', customer)
    if(product_type) sql.set('product_type', product_type)
    // if(stage) sql.set('stage', stage)
    // if(current_version) sql.set('version', current_version)
    if(project_leader) sql.set('project_leader', project_leader)
    if(approved_by) sql.set('approved_by', approved_by)
    if(project_code) sql.set('project_code', project_code)
    if(project_name) sql.set('project_name', project_name)
    if(site) sql.set('site', site)
    // if(system_model_pn) sql.set('system_model_pn', system_model_pn)
    // if(id_cmf_file_data) sql.set('id_cmf_file_data', id_cmf_file_data)
    if(product_spec) sql.set('product_spec', product_spec)
    if(sku_desc) sql.set('sku_desc', sku_desc)
    sql.set('update_time', moment().utc().format())
    sql.set('create_by', user_id)
    sql.returning('id')

    try{
      let id = await client.query(sql.toParam())
      return id[0].id
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return false
    }
  }

  static async uploadImage(name, fpath, userName){
    let sql = squel.insert().into('image')
    sql.set('name', name)
      .set('fpath', fpath)
      .set('created_time', 'NOW()')
      .set('created_by', userName)
    sql = sql.toString() + ' RETURNING id'
    let res = await systemDB.Query(sql).then((res) => { return res.rows[0].id}).catch((err) => { throwApiError(err, errorCode.updateFailed); return false})
    return res
  }

  static async getCustomerBaseData(){
    let sql = squel.select()
      .field('key', 'key')
      .field('value', 'value')
      .from('bom_create_basedata')
      .distinct()
      .where('type = ?', 'CUSTOMER')
      .order('key')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getProductTypeBaseData(){
    let sql = squel.select()
      .field('type_name', 'key')
      .field('type_name', 'value')
      .from('formula.product_type')
      .where('disable_time is null')
      .distinct()
      .order('type_name')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getCreateProductTypeData(userId) {
    let sql = squel.select()
      .field('product_type_me', 'key')
      .field('product_type_me', 'value')
      .from('wiprocurement.perm_product_type_me')
      .where('emplid = ? and product_type_me is NOT NULL', userId)
      .left_join('formula.product_type', 'pt', 'pt.type_name = product_type_me')
      .where('pt.disable_time is null')
      .distinct()
      .order('product_type_me')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async bomGetVersion(Bid, num) {
    let sql = squel.select()
      .field('id')
      .field('stage_id')
      .from('bom_stage_version')
      .where('bom_id = ? and version_name like ?', Bid, `%.${num}`)
      .order('create_time', false)
      .limit(1)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getStageData(){
    let sql = squel.select()
      .field('id', 'key')
      .field('stage_name', 'value')
      .from('bom_stage')
      .order('id')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSiteData(){
    let sql = squel.select()
      .field('site_name', 'key')
      .field('site_name', 'value')
      .from('formula.site')
      .distinct()
      // .where('type = ?', 'SITE')
      .order('site_name')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getFunctionTeamName(){
    let sql = squel.select()
      .field('key', 'key')
      .field('value', 'value')
      .from('bom_create_basedata')
      .distinct()
      .where('type = ?', 'FUNCTIONTEAM')
      .order('key')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getStageId(client, stage){
    let sql = squel.select().field('id').from('bom_stage').where('stage_name = ?', stage)
    try{
      let id = await client.query(sql.toParam())
      if(id && id.length > 0){
        return id[0].id
      }
      return false
    }catch(err){
      throwApiError(err, errorCode.updateFailed)
      return false
    }
  }

  static async getVersionDuration(bomId) {
    let sql = squel.select()
      .field('b.bom_id')
      .field('b.version_name')
      .field('b.create_time')
      .from('bom_projects', 'a')
      .join(squel.select().field('bom_id')
        .field('version_name')
        .field('max(create_time)', 'create_time')
        .from('wiprocurement.bom_stage_version')
        .group('bom_id').group('version_name').order('version_name', false), 'b', 'a.id=b.bom_id')
      .where('b.bom_id in ?', bomId)
      .where(`a.project_source is NULL`)
      .order('bom_id', false)
      .order('create_time', false)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static generateQuerySql(items, offset = '', orderBy, column, keyword){
    // the following sql is stage are select by bom_stage table
    let joinSql = squel.select().field('b.bom_id').field('e.stage_name').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
      squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    // let joinSql = squel.select().field('b.bom_id').field('b.stage_id', 'stage_name').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
    //   squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')

    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.customer', 'customer')
      .field('a.project_name', 'project_name')
      .field('a.product_type', 'product')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('d.version_id', 'version_id')
      .field('d.version_name', 'version')
      .field('a.project_leader', 'project_leader')
      .field('a.approved_by', 'approved_by')
      .field('a.create_by', 'create_by')
      .field('a.sku_desc', 'sku_desc')
      // .field('a.system_model_pn', 'system_model_pn')
      .field('a.create_time', 'create_time')
      .from('bom_projects', 'a')
      .where(`a.project_source is NULL`)
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')
    if (column && keyword){
      if(column.toLowerCase() === 'stage_id'){
        sql.where('d.stage_name like UPPER(?)', `%${keyword}%`)
      }else{
        sql.where(`UPPER(a.${column}) like UPPER(?)`, `%${keyword}%`)
      }

      // sql.where('bg like UPPER(?) or customer like UPPER(?) or product like UPPER(?) or stage like UPPER(?) or version like UPPER(?) or project_leader like UPPER(?)' +
      //   'or approved_by like UPPER(?)', `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%` )
    }
    if(orderBy){
      let orderByCloumn = orderBy.replace('-', '')
      sql.order(orderByCloumn, squelOrderBy(orderBy))
    }else{
      sql.order('id', false)
    }
    if(offset){
      sql.limit(items).offset(offset)
    }
    return sql
  }


  static generateQuerySqlBySearch(items, offset = '', orderBy, column, keyword, project, product_type){
    // the following sql is stage are select by bom_stage table
    let joinSql = squel.select().field('b.bom_id').field('e.stage_name').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
      squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
      .join('bom_stage', 'e', 'e.id::text = b.stage_id')

    // the following sql is stage are input string
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.customer', 'customer')
      .field('a.project_code', 'project_code')
      .field('a.project_name', 'project_name')
      .field('a.product_type', 'product')
      .field('d.stage_id', 'stage_id')
      .field('d.stage_name', 'stage')
      .field('d.version_id', 'version_id')
      .field('d.version_name', 'version')
      .field('a.project_leader', 'project_leader')
      .field('a.approved_by', 'approved_by')
      .field('a.create_by', 'create_by')
      .field('a.sku_desc', 'sku_desc')
      .field('a.create_time', 'create_time')
      .from('bom_projects', 'a')
      .where(`a.project_source is NULL and a.product_type similar to ?`, `(${product_type})`)
      .left_join(
        joinSql, 'd', 'd.bom_id = a.id')

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

    if(orderBy){
      let orderByCloumn = orderBy.replace('-', '')
      sql.order(orderByCloumn, squelOrderBy(orderBy))
    }else{
      sql.order('id', false)
    }
    if(offset){
      sql.limit(items).offset(offset)
    }
    return sql
  }
  static async getBomMEProductType(id) {
    let sql = squel.select()
      .field('product_type')
      .from('bom_projects')
      .where('id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async insertBomProjectParams(client, bomId, productTypeName, ignoreConflict = false) {
    let subsql = squel.select()
      .field(`${bomId}`)
      .field('para.id')
      .field('pv.value')
      .field('pv.value_type')
      .from('wiprocurement.bom_project_parameter', 'para')
      .from('formula.parameter_value', 'pv')
      .where('para.product_type_id = ?', 
        squel.select()
          .field('id')
          .from('formula.product_type')
          .where('type_name = ?', productTypeName)
      )
      .where('pv.parameter_id = para.default_value_parameter_id')
      .where('pv.activate_date_id = ?', 
        squel.select()
          .field('MAX(id)')
          .from('formula.schedule_date')
          .where('formula_type_id = para.formula_type_id')
          .where('product_type_id = para.product_type_id')
      )

    let sql = squel.insert().into('wiprocurement.bom_project_parameter_value')
      .fromQuery(
        ['bom_id', 'type_id', 'value', 'value_type'],
        subsql
      )
    let insertSql = sql.toParam()
    if (ignoreConflict) {
      insertSql = sql.toString() + 'on conflict do nothing'
    }
    let result = await client.query(insertSql)
    return result
  }
  static async getBomProjectParams(bomId) {
    let sql = squel.select()
      .field('value.id')
      .field('type.label_name::varchar')
      .field(`ft."name"` , 'group_name')
      .field('value.value')
      .field('value.value_type')
      .field('type.unit')
      .from('wiprocurement.bom_project_parameter_value', 'value')
      .left_join('wiprocurement.bom_projects', 'bp', 'bp.id = value.bom_id')
      .left_join('wiprocurement.bom_project_parameter', 'type' ,'type.id = value.type_id and type.product_type_id = (select id from formula.product_type where type_name = bp.product_type)')
      .left_join('formula.formula_type', 'ft', 'type.formula_type_id = ft.id')
      .where('value.bom_id = ?', bomId)
      .where('type.label_name is not null')
    let result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getMultiBomProjectParams(bomIds) {
    let sql = squel.select()
      .field('value.id')
      .field('type.label_name::varchar')
      .field(`ft."name"` , 'group_name')
      .field('value.value')
      .field('value.value_type')
      .field('type.unit')
      .field('value.bom_id')
      .from('wiprocurement.bom_project_parameter_value', 'value')
      .left_join('wiprocurement.bom_projects', 'bp', 'bp.id = value.bom_id')
      .left_join('wiprocurement.bom_project_parameter', 'type' ,'type.id = value.type_id and type.product_type_id = (select id from formula.product_type where type_name = bp.product_type)')
      .left_join('formula.formula_type', 'ft', 'type.formula_type_id = ft.id')
      .where('value.bom_id in ?', bomIds)
    let result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async setBomProjectParams(client, id, value) {
    let sql = squel.update()
      .table('wiprocurement.bom_project_parameter_value')
      .set('value', value)
      .where('id = ?', id)
    let result = await client.query(sql.toParam())
    return result
  }
  static async getSourcerPermission(bomId) {
    try {
      const subSql = squel.select()
        .field('sourcer_permission_id')
        .from('wiprocurement.bom_projects')
        .where('id = ?', bomId)
      const sql = squel.select()
        .field('*')
        .from('wiprocurement.bom_project_sourcer_permission')
        .where('id = ?', subSql)
      let result = await systemDB.Query(sql.toString())
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
  static async upsertSourcerPermission(dbClient, sourcerPermissionId, sourcerPermission) {
    try {
      let sql = squel.insert()
        .into('wiprocurement.bom_project_sourcer_permission')
        .set('id', sourcerPermissionId)
        .set('sourcer_permission', JSON.stringify(sourcerPermission))
      const upsertSQL =  'ON CONFLICT ("id") DO UPDATE SET sourcer_permission = EXCLUDED.sourcer_permission'
      await dbClient.query(`${sql.toString()}${upsertSQL}`)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async updateSourcerPermissionIdByBomProjectIdList(dbClient, sourcerPermissionId, bomProjectIdList) {
    try {
      let sql = squel.update()
        .table('wiprocurement.bom_projects')
        .set('sourcer_permission_id', sourcerPermissionId)
        .where('id in ?', bomProjectIdList)
        .toParam()
      await dbClient.query(sql)
    } catch (error) {
      throw new Error(error)
    }
  }
}

class BomFilterValue {
  constructor(prob){
    this._column = prob.column.toLowerCase()
    this.userId = prob.userId
  }

  async getFilterValue(userID, project_source){
    let res = []
    let result
    try{
      if(this._column.toLowerCase() === 'stage_id'){
        let joinSql = squel.select().field('b.bom_id').field('e.stage_name').order('e.id').field('b.stage_id').field('b.create_time').field('b.id', 'version_id').field(' \'V\' || b.version_name', 'version_name').from('bom_stage_version', 'b').join(
          squel.select().field('bom_id').from('bom_stage_version').field('max(create_time)', 'create_time').group('bom_id'), 'c', 'c.bom_id = b.bom_id and b.create_time = c.create_time')
          .join('bom_stage', 'e', 'e.id::text = b.stage_id')
        let sql = squel.select()
          .field('d.stage_name')
          .from('bom_projects', 'a')
          .distinct('d.stage_name')
          .left_join(
            joinSql, 'd', 'd.bom_id = a.id')
          .join(squel.select().field('product_type_me').from('perm_product_type_me').where('emplid = ?', userID).order('product_type_me')
          .distinct('product_type_me'), 'permission', 'permission.product_type_me = a.product_type')
          if (project_source) {
            sql.where('a.project_source = ?', project_source)
          } else {
            sql.where('a.project_source is NULL')
          }
        result = await systemDB.Query(sql.toParam())
        _.forEach(result.rows, (v, idx) =>{
          res.push(v.stage_name)
        })
      } else{
        let sql = squel.select().field(this._column).from('bom_projects', 'bom').order(this._column).distinct(this._column)
          .join(squel.select().field('product_type_me').from('perm_product_type_me').where('emplid = ?', userID).order('product_type_me')
          .distinct('product_type_me'), 'permission', 'permission.product_type_me = bom.product_type')
        if (project_source) {
          sql.where('project_source = ?', project_source)
        } else {
          sql.where('project_source is NULL')
        }
        result = await systemDB.Query(sql.toParam())
        _.forEach(result.rows, (v, idx) =>{
          if(v[this._column]){
            res.push(v[this._column])
          }
        })
      }

    }catch(err){
      throw err
    }
    return res
  }
  async getFilterEEBomValue(userID){
    let res = []
    let result
    try{
        let sql = squel.select().field(this._column).from('eebom_projects', 'bom').order(this._column).distinct(this._column)
        .join(squel.select().field('product_type_ee').from('perm_product_type_ee')
          .where('emplid = ?', userID).order('product_type_ee').distinct('product_type_ee'), 'permission', 'permission.product_type_ee = bom.product_type')
        result = await systemDB.Query(sql.toParam())
        _.forEach(result.rows, (v, idx) =>{
          if(v[this._column]){
            res.push(v[this._column])
          }
        })
    }catch(err){
      throw err
    }
    return res
  }
}

module.exports = BomManagerData