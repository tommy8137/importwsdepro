const { systemDB } = require('../../helpers/database')
const _ = require('lodash')
let squel = require('squel').useFlavour('postgres')
const { useSemicolonForArr, useParenthesesForArr } = require('../../helpers/query/processString.js')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Spending {
  static generateQuerySql(items = '', offset = '', column, keyword, project, eeBomMaxVersionResults) {
    // involved stage condition
    let meVersionSql = squel.select()
      .field('b.bom_id')
      .field('e.stage_name')
      .field('b.stage_id')
      .field('b.create_time')
      .field('b.id', 'id')
      .field(' \'V\' || b.version_name', 'version_name')
      .from('wiprocurement.bom_stage_version', 'b')
      .join(squel.select()
        .field('g.bom_id', 'bom_id')
        .field('max(g.version_name)', 'version_name')
        .field('max(h.stage_id)', 'stage_id')
        .from(squel.select()
          .field('bom_id')
          .field('max(version_name)', 'version_name')
          .from('wiprocurement.bom_stage_version')
          .where(squel.str(`version_name like '%${'.0'}%' and version_name <> '${'0.0'}'`))
          .group('bom_id'), 'g')
        .join(squel.select()
          .field('bom_id')
          .field('max(stage_id)', 'stage_id')
          .from('wiprocurement.bom_stage_version')
          .where(squel.str(`version_name like '%${'.0'}%' and version_name <> '${'0.0'}'`))
          .group('bom_id'), 'h', 'g.bom_id = h.bom_id')
        .group('g.bom_id'), 'c', 'c.bom_id = b.bom_id and b.version_name = c.version_name and c.stage_id = b.stage_id')
      .left_join('wiprocurement.bom_stage', 'e', 'e.id::text = b.stage_id')

    // 找出每個emdm專案的最新版本
    let emdmJoinSql = squel.select()
      .field('Max(a.id)', 'id')
      .from('bom_projects', 'a')
      .left_join(meVersionSql, 'd', 'd.bom_id = a.id')
      .where(`a.project_source = 'EMDM'`)
      .group('a.project_code, a.site, d.stage_id')

    let meSql = squel.select()
      .field('me_project.id', 'me_id')
      .field('me_project.product_type', 'me_product_type')
      .field('me_project.project_leader', 'me_project_leader')
      .field('me_project.approved_by', 'me_approved_by')
      .field('me_project.project_code', 'me_project_code')
      .field('me_project.project_name', 'me_project_name')
      .field('me_project.site', 'me_site')
      .field('me_project.sku_desc', 'me_sku_desc')
      .field('me_project.product_spec', 'me_product_spec')
      .field('me_version.version_name', 'version_name')
      .field('me_version.id', 'me_version_id')
      .field('me_project.customer', 'me_customer')
      .field('me_version.stage_name', 'me_stage_name')
      .from(squel.select()
        .from('wiprocurement.bom_projects')
        .where('(source_version is null AND project_source is null) OR id in ?', emdmJoinSql), 'me_project')
      .join(meVersionSql, 'me_version', 'me_version.bom_id=me_project.id')

    // 這段eesql 會找出整數版的version 並且依照project_code ,version,update_time做排列
    let eeSql  = squel.select()
      .field(' \'V\' || Max(e.status_version) || \'.0\'', 'status_version')
      .field( 'b.project_code')
      .field('b.customer')
      .field('b.project_name')
      .field('b.product_type')
      .from('wiprocurement.edm_version','e')
      .join('wiprocurement.eebom_projects' ,'b',' e.eebom_project_id = b.id' )
      .where('(MOD(round(e.status_version/0.5),2)=0) and e.status_version > 0')
      .group('b.project_code')
      .group('b.customer')
      .group('b.project_name')
      .group('b.product_type')

    // let eeSql = squel.select()
    //   .field('ee_project.*')
    //   .field('ee_version.id', 'ee_version_id')
    //   .field('ee_version.status_version', 'status_version')
    //   .field('ee_version.version', 'edm_version_version')
    //   .from('wiprocurement.eebom_projects', 'ee_project')
    //   .join('wiprocurement.edm_version', 'ee_version', 'ee_version.eebom_project_id=ee_project.id')
    //   .where('ee_project.id in ?', eeBomMaxVersionResults.project_code && eeBomMaxVersionResults.project_code.length > 0 ? eeBomMaxVersionResults.project_code : [])
    //   .where('ee_version.id in ?', eeBomMaxVersionResults.edm_version_id && eeBomMaxVersionResults.edm_version_id.length > 0 ? eeBomMaxVersionResults.edm_version_id : [])
    //   .order('project_code, version, update_time', false)

    let combinSql = squel.select()
      .field('me_project.*')
      .field('ee_project.*')
      .from(meSql, 'me_project FULL')
      .outer_join(eeSql, 'ee_project', 'me_project.me_project_code=ee_project.project_code')
    if (column == 'customer' && keyword && !project) {
      combinSql.where(`(upper(me_project.me_customer) like upper('${keyword}')) or (upper(ee_project.customer) like upper('${keyword}'))`)
    } else if (column && keyword && project) {
      combinSql.where(`((upper(me_project.me_project_code) like upper('%${project}%')) or (upper(ee_project.project_code) like upper('${project}'))
      or (upper(ee_project.project_name)like upper('%${project}%'))
      or (upper(me_project.me_project_name) like upper('%${project}%')))`)
        .where(`(upper(me_project.me_customer) like upper('${keyword}')) or (upper(ee_project.customer) like upper('${keyword}'))`)
    } else if(!column && !keyword && project){
      combinSql.where(`(((upper(me_project.me_project_code) like upper('%${project}%')) or (upper(ee_project.project_code) like upper('${project}'))
      or (upper(ee_project.project_name)like upper('%${project}%'))
      or (upper(me_project.me_project_name) like upper('%${project}%'))))`)
    }

    if (items != '' && offset != '') {
      combinSql.limit(items).offset(offset)
    }
    return combinSql
  }
  static async getEeBomProjects(items, offset, column, keyword, project, eeBomMaxVersionResults) {
    let querySql = this.generateQuerySql(items.toString(), offset.toString(), column, keyword, project, eeBomMaxVersionResults)
    const result = await systemDB.Query(querySql.toParam())
    return result.rows
  }
  static async getProjectCount(column, keyword, project, eeBomMaxVersionResults) {
    let querySql = this.generateQuerySql('', '', column, keyword, project, eeBomMaxVersionResults)
    const result = await systemDB.Query(querySql.toParam())
    return result.rowCount
  }

  static async getDashboardMapped() {
    let sql = squel.select()
      .field('id')
      .field('ee_sku')
      .field('ee_version_id')
      .field('ee_version_name')
      .field('ee_version')
      .field('me_version_name')
      .field('me_version_id')
      .field('me_version')
      .field('create_time')
      .field('project_code')
      .from('dashboard_version')
    let res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  static async getMeFilterItems(column) {
    let res = []
    let result
    try{
      let sql = squel.select().field(column)
        .from('bom_projects', 'project')
        .join('bom_stage_version', 'version', 'version.bom_id=project.id')
        .where('version.version_name::numeric>=1.0')
        .order(column)
        .distinct(column)
      result = await systemDB.Query(sql.toParam())
      _.forEach(result.rows, (v, idx) =>{
        if(v[column]){
          res.push(v[column])
        }
      })

    }catch(err){
      throw err
    }
    return res
  }
  static async getEeFilterItems(column) {
    let res = []
    let result
    try{
      let sql = squel.select().field(column)
        .from('eebom_projects')
        // .where('version::numeric>=1.0')
        .order(column)
        .distinct(column)
      result = await systemDB.Query(sql.toParam())
      _.forEach(result.rows, (v, idx) =>{
        if(v[column]){
          res.push(v[column])
        }
      })

    }catch(err){
      throw err
    }
    return res
  }

  static async getPlants() {
    let sql = squel.select().from('plant_list')
    const result = await systemDB.Query('SELECT * from plant_list')
    return result.rows
  }
  static async getColleague(deptId) {
    let sql = squel.select()
      .field('a.scode', 'scode')
      .field('b.name_a', 'sourcer')
      .field('b.deptid', 'deptid')
      .field('a.groupname', 'groupname')
      .from('epur_sourcerdef', 'a')
      .join('ps_ee_prcrmnt_vw_a', 'b', 'a.eno = a.emplid')
    if(deptId){
      sql.where('a.deptid = ?', deptId)
    }

    // let query = `SELECT Sourcer.scode, PS.name_a AS sourcer, PS.deptid, Sourcer.groupname
    //   FROM wiprocurement.epur_sourcerdef as Sourcer
    //   INNER JOIN wiprocurement.ps_ee_prcrmnt_vw_a AS PS on Sourcer.eno = PS.emplid`

    // query = deptId != null ? query + ` WHERE PS.deptid = '${deptId}';` : query + ';'
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async isSupervisor(userID) {
    let sql = squel.select()
      .field('emplid')
      .field('name_a')
      .field('deptid')
      .from('ps_ee_prcrmnt_vw_a')
      .where('supervisor_id = ?', userID)

    // let str = `SELECT emplid, name_a, deptid
    //   FROM wiprocurement.ps_ee_prcrmnt_vw_a
    //   WHERE supervisor_id = '${userID}'`
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async getSpendingTypes(query) {
    let sql = squel.select().field('type1').field('type2').from('spending_types')
    if (query.plants) sql.where('plant IN ?', query.plants)
    if (query.scodes) sql.where('scode IN ?', query.scodes)
    sql.order('type1').order('type2')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getWaterful(info, classification) {
    let { plant, user, dateFrom, dateTo, type1, type2, supplyType, category, measure } = info
    let useCategory = 'sum(po_price) as quantity'

    let querySql = squel.select()
    let groupColumn = category == 'manufacturer' &&  category != 'none' ? 'manufacturer' : category == 'vendor' ?  'vendor_group' : ''
    let queryColumn =  category == 'vendor' ? 'vendor_group' : category
    let queryMeasure = measure == 'amount' ? 'sum(po_price)' : 'sum( cast ( quantity as float))'

    if(category != 'none'){
      querySql
        .field(queryColumn, 'category')
        .field(queryMeasure, 'quantity')
      if(measure == 'amount') querySql.field('currency')

      querySql.field('count(DISTINCT materialnumber)', 'pn')
        .field('count(DISTINCT vendorcode)', 'suppliers')
        .from('spending_base')
        .where('DATE >= to_date(?, \'YYYY-MM-DD\') AND DATE <= to_date(?, \'YYYY-MM-DD\')', dateFrom, dateTo)
        .where('plant = ? AND sourcer = ? AND type1 = ? ',
          squel.rstr(`ANY(VALUES ${useParenthesesForArr(plant)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(user)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(type1)})`))
        .group(groupColumn)
      if(measure == 'amount') querySql.group('currency')
    }else{
      querySql
        .field(classification, 'category')
        .field(queryMeasure, 'quantity')
      if(measure == 'amount') querySql.field('currency')
      querySql.field('count(DISTINCT materialnumber)', 'pn')
        .field('count(DISTINCT vendorcode)', 'suppliers')
        .from('spending_base')
        .where('DATE >= to_date(?, \'YYYY-MM-DD\') AND DATE <= to_date(?, \'YYYY-MM-DD\')', dateFrom, dateTo)
        .where('plant = ? AND sourcer = ? AND type1 = ? ',
          squel.rstr(`ANY(VALUES ${useParenthesesForArr(plant)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(user)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(type1)})`))
        .group(classification)
      if(measure == 'amount') querySql.group('currency')
    }

    querySql.order('quantity', false)
    let sql = `SELECT category, measure, count(DISTINCT materialnumber) AS pn,count(DISTINCT vendorcode) AS suppliers, currency FROM
              wiprocurement.spending_base  WHERE DATE >= to_date('${dateFrom}', 'YYYY-MM-DD') AND DATE <= to_date('${dateTo}', 'YYYY-MM-DD')
              AND plant = ANY(VALUES ${useParenthesesForArr(plant)}) and sourcer =  ANY(VALUES ${useParenthesesForArr(user)})
              AND type1 = ANY(VALUES ${useParenthesesForArr(type1)})
     `
    if(type2.length > 0) {
      querySql.where('type2 = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(type2)})`))
      sql += ` AND type2 = ANY(VALUES ${useParenthesesForArr(type2)}) `
    }
    if(supplyType.length > 0) {
      querySql.where('supply_type = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(supplyType)})`))
      sql += ` AND supply_type = ANY(VALUES ${useParenthesesForArr(supplyType)})`
    }
    if(category == 'manufacturer') {
      sql += ' group by manufacturer'
      sql = sql.replace('category', 'manufacturer as category')
      useCategory = 'manufacturer'
    } else if(category == 'vendor') {
      sql += ' group by vendor_group'
      sql = sql.replace('category', 'vendor_group as category')
      useCategory = 'vendor'
    } else {
      sql += ` group by ${classification}`
      sql = sql.replace('category', ` ${classification} as category`)
      useCategory = classification
    }
    if(measure == 'amount') {
      sql = sql.replace('measure', 'sum(po_price) as quantity')
      sql += ', currency order by quantity desc'
    } else {
      sql = sql.replace(', currency', '')
      sql = sql.replace('measure', 'sum( cast ( quantity as float)) as quantity')
      sql += ' order by quantity desc'
    }
    const result = await systemDB.Query(querySql.toParam())
    return result.rowCount > 0 ? { info:result.rows, category: useCategory } : 'null'

  }

  static async getCurrencys(fromCurrency, toCurrency, toDate) {
    let querySql = squel.select()
    if(fromCurrency == 'all'){
      querySql
        .field('fcurr', 'from_currency')
        .field('(UKURS*TFACT/FFACT)', 'exange_rate')
        .field('gdatu', 'date')
        .from('exchange_rate')
        .where('tcurr = ? AND gdatu <= ? ', toCurrency, toDate)
        .order('fcurr', false)
        .order('gdatu', false)
      // sql = `SELECT fcurr as from_currency, (UKURS*TFACT/FFACT) as exange_rate, gdatu as date FROM wiprocurement.exchange_rate where  tcurr = '${toCurrency}' and gdatu <= '${toDate}' order by fcurr desc, gdatu desc `
    } else {
      querySql
        .field('(UKURS*TFACT/FFACT)', 'exange_rate')
        .field('gdatu', 'date')
        .from('exchange_rate')
        .where('tcurr = ? AND fcurr = ? AND gdatu <= ? ', toCurrency, fromCurrency, toDate)
        .order('gdatu', false)
      // sql = ` SELECT (UKURS*TFACT/FFACT) as exange_rate, gdatu as date FROM wiprocurement.exchange_rate where tcurr = '${toCurrency}' and fcurr = '${fromCurrency}' and gdatu <= '${toDate}' order by gdatu desc `
    }
    const result = await systemDB.Query(querySql.toParam())
    return result.rows
  }
  static async getConnectorCost(id) {
    let subSql = squel.select()
      .field('qty')
      .field('type1', 'id')
      .field('CASE WHEN current_price IS NOT NULL THEN (current_price * qty)\
              ELSE (sourcer_cost * qty) END', 'current')
      .field('suggestion_cost * qty', 'suggestion')
      .from('view_eebom_detail')
      .where('edm_version_id = ? and type1 = ?  ', id, 'Connector')
    let sql = squel.select()
      .field('sum(qty)', 'count')
      .field('sum(current)', 'current')
      .field('sum(suggestion)', 'suggestion')
      .field('id', 'id')
      .from(subSql, 't')
      .group('id')
    // let sql = squel.select()
    //   .field('SUM(qty)', 'count')
    //   .field('type1', 'id')
    //   .field('SUM(current_price * qty)', 'current')
    //   .field('SUM(suggestion_cost * qty)', 'suggestion')
    //   .from('view_eebom_detail')
    //   .where('edm_version_id = ? and type1 = ?  ', id, 'Connector')
    //   .group('type1')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getEeProjectName(edm_id) {
    let sql = squel.select()
      .field('project.project_name')
      .field('project.project_code')
      .from('eebom_projects', 'project')
      .join('edm_version', 'version', 'version.eebom_project_id=project.id')
      .where('version.id = ?', edm_id)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getPowerCost(id) {
    let subSql = squel.select()
      .field('qty')
      .field('CASE WHEN current_price IS NOT NULL THEN current_price * qty\
            ELSE (sourcer_cost * qty) END', 'current')
      .field('(suggestion_cost * qty)', 'suggestion')
      .from('view_eebom_detail')
      .where('edm_version_id = ? and ((sheet::INTEGER >= ? and sheet::INTEGER <= ? ) or (sheet::INTEGER >= ? and sheet::INTEGER <= ?)) and type1 != ?', id, 44, 54, 85, 86, 'Connector')

    let sql = squel.select()
      .field('SUM(qty)', 'count')
      .field('SUM(current)', 'current')
      .field('SUM(suggestion)', 'suggestion')
      .from(subSql, 't')
    // let sql = squel.select()
    //   .field('SUM(qty)', 'count')
    //   .field('SUM(current_price * qty)', 'current')
    //   .field('SUM(suggestion_cost * qty)', 'suggestion')
    //   .from('wiprocurement.view_eebom_detail')
    //   .where('edm_version_id = ? and ((sheet >= ? and sheet <= ? ) or (sheet >= ? and sheet <= ?)) and type1 != ?', id, 44, 54, 85, 86, 'Connector')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  /**
 * 透過edm_version_id 取得所有的物料花費
 * @param {String} id
 */
  static async getAllCost(id) {
    let subSql = squel.select()
      .field('qty')
      .field('CASE WHEN current_price IS NOT NULL THEN current_price * qty\
            ELSE (sourcer_cost * qty) END', 'current')
      .field('suggestion_cost * qty', 'suggestion')
      .from('view_eebom_detail')
      .where('edm_version_id = ?', id)
    let sql = squel.select()
      .field('SUM(qty)', 'count')
      .field('SUM(current)', 'current')
      .field('SUM(suggestion)', 'suggestion')
      .from(subSql, 't')
    // let sql = squel.select()
    //   .field('SUM(qty)', 'count')
    //   .field('SUM(current_price * qty)', 'current')
    //   .field('SUM(suggestion_cost * qty)', 'suggestion')
    //   .from('view_eebom_detail')
    //   .where('edm_version_id = ?', id)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  /**
   * 透過edm_version_id 取得eebom_detail的total last price 和 total suggestion cost
   * @param {String} id  edm_version_id
   */
  static async getTotalPrice(id) {
    let subSql = squel.select()
      .field('CASE WHEN current_price IS NOT NULL THEN current_price * qty \
              ELSE (sourcer_cost * qty) END', 'total_last_price')
      .field('(suggestion_cost * qty)', 'total_suggestion_cost')
      .from('view_eebom_detail')
      .where('edm_version_id = ?', id)
    let sql = squel.select()
      .field('sum(total_last_price)', 'total_last_price')
      .field('sum(total_suggestion_cost)', 'total_suggestion_cost')
      .from(subSql, 't')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : {}
  }


  static async getModuleDetail(version_id, module_id) {
    let sql = squel.select()
      .field('part_number').field('type1').field('type2')
      .field('current_price').field('spa').field('lpp')
      .from('view_eebom_detail')
      .where(
        squel.expr().and('edm_version_id = ?', version_id )
          .and('type1 = ?', module_id )
      )
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  /**
   * 透過edm_version_id取得eebom_detail的item detail
   * @param {String} version_id  edm_version_id
   * @returns {Array} return item's detail information
   */
  static async getModuleDetailV2(version_id) {
    let sql = squel.select()
      .field('part_number')
      .field('type1')
      .field('type2')
      .field('current_price')
      .field('spa')
      .field('lpp')
      .field('currrent_price_adj_percentage')
      .field('ce_cost')
      .field('suggestion_cost')
      .field('remark')
      .field('description')
      .field('qty')
      .field('sub_total_suggestion_cost')
      .field('sourcer_cost')
      .field('sub_total_last_price', '"subTotalLastPrice"')
      .field('other_manufacture_info::json')
      .field('obs')
      .field('sheet')
      .field('module')
      .field('is_common_parts')
      .field('supply_type')
      .field('manufacturer')
      .field('vendor')
      .field('vendor_part_no')
      .field('last_price_currency')
      .field('last_price_currency_price')
      .field('alt_lowest_price')
      .field('alt_lowest_partnumber')
      .field('alt_manufacturer')
      .field('alt_grouping::json')
      .field('alt_other_info::json')
      .field('to_char(valid_from, \'YYYY-MM-DD\')', 'valid_date')
      .field('Version.status_version')
      .field('avl_spa')
      .field('avl_alt')
      .field('avl_spa_other_info::json')
      .field('avl_alt_other_info::json')
      .field('avl_spa_bolder')
      .field('avl_alt_bolder')
      .from('view_eebom_detail')
      .join('wiprocurement.edm_version', 'Version', 'Version.id=view_eebom_detail.edm_version_id')
      .where('edm_version_id = ?', version_id)
      /* 此處已移到eebomUtil做
    if(module_id.toLowerCase() == 'connector') {
      sql.where(
        squel.expr().and('edm_version_id = ?', version_id )
          .and('type1 = ?', module_id )
      )
    }else if(module_id.toLowerCase() == 'power' && category == 'bu') {
      sql.where(
        squel.expr()
          .and('edm_version_id = ? and ((sheet::INTEGER >= ? and sheet::INTEGER <= ? ) or (sheet::INTEGER >= ? and sheet::INTEGER <= ?)) and type1 != ?', version_id, 44, 54, 85, 86, 'Connector' )
      )
    }else if(module_id.toLowerCase() == 'power' && category == 'module') {
      sql.where(
        squel.expr().and('edm_version_id = ?', version_id)
          .and('module = ?', module_id)
      )
    }else if(module_id.toLowerCase() == 'others') {
      sql.where(
        squel.expr()
          .and('edm_version_id = ? and ((sheet::INTEGER < ? or sheet::INTEGER > ? ) and (sheet::INTEGER < ? or sheet::INTEGER > ?)) and type1 != ?', version_id, 44, 54, 85, 86, 'Connector' )
      )
    }else if(module_id.toLowerCase() != 'rtc bty') {
      sql.where(
        squel.expr().and('edm_version_id = ?', version_id)
          .and('module = ?', module_id)
      )
    }else {
      sql.where(
        squel.expr().and('edm_version_id = ?', version_id )
          .and('type1 = ?', module_id )
      )
    }*/

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []

  }
  static async getProjectCode(bom_id) {
    let sql = squel.select()
      .field('project_code')
      .from('bom_projects')
      .where('id = ?', bom_id)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].project_code : null
  }
  static async getEeVersion(code, eeid) {
    let sql = squel.select()
      .field('edm.id')
      .field('edm.version')
      .field('eebom.sku')
      .field('eebom.stage')
      .field('eebom.pcbno')
      .field('eebom.version', 'version_num')
      .field('edm.status_version', 'status_version')
      .field('eebom.platform', 'platform')
      .from('wiprocurement.edm_version', 'edm')
      .join('wiprocurement.eebom_projects', 'eebom', 'eebom.id=edm.eebom_project_id')
      .where('eebom.project_code = ?', code)
      .where('(MOD(round(edm.status_version/0.5),2)=0)')
      .where('edm.status_version > 0')
      .order('edm.status_version', true)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getEeSku(edm_id) {
    let sql = squel.select()
      .field('version')
      .from('edm_version')
      .where('id = ?', edm_id)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  // static async getMeVersion(bom_id) {
  //   let sql = squel.select()
  //     .field('')
  // }
  static async getMeLatestVersion(code, id) {
    let sql = squel.select()
      .field('bom_stage_version.id')
      .field('bom_stage_version.version_name')
      .from('bom_stage_version')
      .join('bom_projects', 'project', 'project.id=bom_stage_version.bom_id')
      // .where('bom_id = ? and version_name = ?', bom_id, '1.0')
      .where('project.project_code = ? and bom_stage_version.bom_id = ?', code, id)
      .where(squel.str(`version_name ~'${'^[1-9].[0]'}'`))
      .order('bom_stage_version.create_time', false)
      // .limit(1)

    let res = await systemDB.Query(sql.toParam())
    // if (res.rowCount > 0)
    return res.rowCount > 0 ? res.rows[0] : []
  }
  static async insertCombineVersion(body) {
    try{
      let sql = squel.insert()
        .into('dashboard_version')
        .setFields(body)
        .returning('id')
      let res = await systemDB.Query(sql.toParam())
      return res.rows[0].id
    }catch(err) {
      throwApiError('record already exist', errorCode.INSERT_DUPLICATE)
    }
  }
  static async getMeBomID(bid) {
    let sql = squel.select()
      .field('bom_id')
      .from('bom_stage_version')
      .where('id = ?', bid)
    let res = await systemDB.Query(sql.toParam())
    // if (res.rowCount > 0)
    return res.rowCount > 0 ? res.rows[0] : []
  }
  static async getBomItem(Bid, assign) {
    let Vid = await this.getMeLatestVersion(Bid)
    let sql = squel.select()
      .field('Item.id')
      .field('customer_pn')
      .field('rfq_pn')
      .field('ref_part_num', 'reference_pn')
      .field('part_name')
      .field('image_id')
      .field('image.fpath', 'image_path')
      .field('level')
      .field('parent_level')
      .field('sub_leve', 'sub_level')
      .field('qty')
      .field('part_size_l')
      .field('part_size_w')
      .field('part_size_h')
      .field('part_size_m')
      .field('part_size_ef')
      .field('part_size_l2')
      .field('part_size_w2')
      // .field('PC1.item_name', 'parts_ctgy_1')
      // .field('PC2.item_name', 'parts_ctgy_2')
      // .field('BG.item_name', 'gb_assy_ctgy')
      // .field('FC.item_name', 'func_ctgy')
      // .field('ST.item_name', 'supply_type')
      // .field('material_spec.item_name', 'material_spec')
      // .field('material.item_name', 'material')
      // .field('odmoem.item_name', 'odm_oem')
      // .field('initAddDel.item_name', 'initaddmodidel')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('BG.gb_assy_ctgy_name', 'gb_assy_ctgy')
      .field('FC.func_ctgy_name', 'func_ctgy')
      .field('ST.supply_type_name', 'supply_type')
      .field('odmoem.odm_oem_name', 'odm_oem')
      .field('initAddDel.operation_name', 'initaddmodidel')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('thickness')
      .field('part_weight')
      .field('modified_time', 'update_time')
      .field('Item.source_cost')
      .field('Item.system_cost')
      .field('Item.spa_cost_material_remark')
      .field('Item.spa_cost')
      .field('Item.suggestion_cost_type', 'suggestion_cost_type')
      .field('partlist.partlist_value', 'partlistvalue')
      .field('partlist.partlist_price', 'partlistprice')
      .field('partlist.image_value', 'partlistimage')
      .field('partlist.partlist_amount', 'partlistamount')
      .field('partlist.formate', 'partlistformate')
      .field('Item.extra', 'extra')
      .field('Item.sku0', 'sku0')
      .field('Item.sku1', 'sku1')
      .field('Item.sku2', 'sku2')
      .field('Item.sku3', 'sku3')
      .field('Item.sku4', 'sku4')
      .field('Item.sku5', 'sku5')
      .field('Item.last_price', 'last_price')
      .field('Item.part_number', 'part_number')
      .field(' \'V\' || Version.version_name', 'version_name')
      .from('bom_stage_version', 'Version')
      .join('bom_item', 'Item', 'Item.version_id = Version.id')
      // .left_join('drop_down_item', 'ST', 'Item.supply_type = ST.id')
      // .left_join('drop_down_item', 'BG', 'Item.gb_assy_ctgy = BG.id')
      // .left_join('drop_down_item', 'FC', 'Item.func_ctgy = FC.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      // .left_join('drop_down_item', 'odmoem', 'Item.odm_oem = odmoem.id')
      // .left_join('drop_down_item', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('formula.supply_type', 'ST', 'Item.supply_type = ST.id')
      .left_join('formula.gb_assy_ctgy', 'BG', 'Item.gb_assy_ctgy = BG.id')
      .left_join('formula.func_ctgy', 'FC', 'Item.func_ctgy = FC.id')
      .left_join('formula.part_category_1', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join('formula.part_category_2', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').distinct()
        , 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join('formula.v_me_bom_materialspec_and_material_value', 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .left_join('formula.odm_oem', 'odmoem', 'Item.odm_oem = odmoem.id')
      .left_join('formula.operation', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('image', 'image', 'image.id = Item.image_id')
      .join('bom_designee', 'Designee', 'Designee.id = owner')
      .left_join('bom_partlist_value', 'partlist', 'partlist.bom_item_id = Item.id')
      .where('Version.bom_id = ? and Version.id = ? ', Bid, Vid.id)

    if (assign != 'all') {
      sql.where('Designee.id = ?', assign)
    }
    sql.field('usertable.name_a', 'owner')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')

    const result = await systemDB.Query(sql.toParam())
    return result
  }
  static async getMeCompleteVersion(project_code, meID) {
    let sql = squel.select()
      .field('a.id', 'version_id')
      .field('a.version_name', 'version_name')
      .from('wiprocurement.bom_stage_version', 'a')
      .left_join('wiprocurement.bom_projects', 'b', 'a.bom_id=b.id')
      .where(squel.str(`a.version_name like '%${'.0'}%' and a.version_name <> '${'0.0'}'`))
      .where('b.project_source is null')
    if(project_code) sql.where('b.project_code = ? ', project_code)
    if(meID) sql.where('a.bom_id = ?', meID)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getEmdmCompleteVersion(project_code, bomId) {
    let sql = squel.select()
      .field('a.id', 'version_id')
      .field('a.version_name', 'version_name')
      .field('b.source_version')
      .field('b.create_time')
      .from('wiprocurement.bom_stage_version', 'a')
      .left_join('wiprocurement.bom_projects', 'b', 'a.bom_id=b.id')
      .where(squel.str(`a.version_name like '%${'.0'}%' and a.version_name <> '${'0.0'}'`))
      .where('b.project_source = ?', 'EMDM')
    if(project_code) sql.where('b.project_code = ? ', project_code)
    if(bomId) sql.where('a.bom_id = ?', bomId)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getDashboardInfo(id) {
    let sql = squel.select()
      .field('*')
      .from('dashboard_version')
      .where('id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getEeProjectDetail(edm_id) {
    // 20190909 version changet to edm.status_version ??
    let sql = squel.select()
      .field('product_type')
      .field('sku')
      .field('platform')
      .field('concat(project.pcbno,\'_\',project.stage)', 'pcbno_stage')
      .field(`
      case
        when project.plant_code is not null then
          project.plant_code
        when project.plant is null or project.purchasing_organization is null then
          json_build_array()
        else
          json_build_array(json_build_object('plants', STRING_TO_ARRAY(project.plant, ''),
          'purchasing_organization', project.purchasing_organization ))
      end
      `, 'purchase_org_plant')
      .field('project_name')
      .field('project_code')
      .field('project.approve_time', 'rfq_finish_date')
      .field('project.customer')
      .field('project.plant')
      .field('edm.status_version', 'version')
      .field('project.create_time')
      .field('edm.version', 'eedm_ver')
      .field('edm.status_version')
      .field('edm.avl')
      .from('edm_version', 'edm')
      .join('eebom_projects', 'project', 'project.id = edm.eebom_project_id')
      .where('edm.id = ?', edm_id)

    /*
    select edm.id, edm."version", eebom_project_id ,
    eebom.edm_version_id, eebom.eedm_version, eebom.edm_version_id
    from edm_version as edm
    join eebom_projects as eebom on (eebom.id = edm.eebom_project_id)
    where edm.id = 'ef68ff06-1993-4c02-89f5-444c503d2f22'
    */
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : []
  }

  static async getAvlVersionDoc(edm_version_id) {
    let sql = squel.select()
      .distinct()
      .field('customer_doc')
      .from('eebom_avl avl')
      .join('eebom_projects', 'project', 'Upper(avl.customer) = Upper(project.customer) and Upper(avl.bu) = Upper(project.product_type)')
      .join('edm_version', 'edm', 'project.id = edm.eebom_project_id')
      .where('edm.id = ?', edm_version_id)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].customer_doc : ''
  }

  static async getMaxVersionForEachEebomProjects() {
    // v1.0::
    // let sql = squel.select()
    //   .field('id,project_code, project_name,customer,stage,version,sku,update_time,edm_version_id')
    //   .from('wiprocurement.eebom_projects')
    //   .where('(MOD(round(version/0.5),2)=0)')
    //   // .where('version > 0')
    //   .group('id ,project_code, project_name,customer,stage,version,sku,update_time')
    //   .order('project_code', false)
    //   .order('version', false)
    // v2.0::
    // let sql = squel.select()
    //   .field('b.eebom_project_id', 'id').field('a.project_code').field('a.project_name').field('a.customer').field('a.stage')
    //   .field('b.status_version').field('a.version_remark').field('b.edm_version_id')
    //   .from('wiprocurement.eebom_projects', 'a')
    //   .join(
    //     squel.select().field('a.eebom_project_id').field('a.status_version').field('a.version').field('a.id', 'edm_version_id').from('wiprocurement.edm_version', 'a').join(
    //       squel.select().field('eebom_project_id').field('max(status_version)', 'max_status_version').from('wiprocurement.edm_version', 'b').group('eebom_project_id')
    //       , 'b', 'a.eebom_project_id=b.eebom_project_id and a.status_version=b.max_status_version').where('a.status_version >= 1')
    //     , 'b', 'a.id=b.eebom_project_id'
    //   )
    //   .order('project_code', false)
    //   .order('b.version', false)
    let sql  = squel.select()
      .field('Max(e.status_version)' , 'max_status_version')
      .field( 'b.project_code')
      .field('b.customer')
      .field('b.project_name')
      .from('wiprocurement.edm_version','e')
      .join('wiprocurement.eebom_projects' ,'b',' e.eebom_project_id = b.id' )
      .group('b.project_code')
      .group('b.customer')
      .group('b.project_name')
    let result = await systemDB.Query(sql.toParam())
    return  result.rowCount > 0 ? result.rows : []
    // let eebomInfos = result.rows
    // let tmp1 = []
    // let tmp2 = []
    // let tmp3 = []
    // for( let info of eebomInfos) {
    //   // if(tmp1.indexOf(info.project_code) == -1) {
    //   //   tmp1.push(info.project_code)
    //   //   tmp2.push(info.id)
    //   //   if(info.edm_version_id) tmp3.push(info.edm_version_id)
    //   // }
    //   tmp2.push(info.id)
    //   if(info.edm_version_id) tmp3.push(info.edm_version_id)
    // }
    // return { project_code: tmp2, edm_version_id: tmp3 }
  }
  static async getEeInfosByProjectCode(projectcode) {
    let sql = squel.select()
      .field('eebom_projects.sku,eebom_projects.create_time')
      .field('edm_version.version as version')
      .from('wiprocurement.eebom_projects', 'eebom_projects')
      .join('wiprocurement.edm_version', 'edm_version', 'eebom_projects.id = edm_version.eebom_project_id')
      .where('eebom_projects.project_code = ?', projectcode)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  /*
  static async getConnectorCostWithoutSummary(id) {
    let subSql = squel.select()
      .field('qty')
      .field('type1', 'id')
      .field('CASE WHEN current_price IS NOT NULL THEN (current_price)\
              ELSE (sourcer_cost) END', 'current')
      .field('suggestion_cost', 'suggestion')
      .field('supply_type')
      .from('view_eebom_detail')
      .where('edm_version_id = ? and type1 = ?  ', id, 'Connector')
    let res = await systemDB.Query(subSql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getPowerCostWithoutSummary(id) {
    let subSql = squel.select()
      .field('qty')
      .field('CASE WHEN current_price IS NOT NULL THEN current_price\
            ELSE (sourcer_cost) END', 'current')
      .field('(suggestion_cost)', 'suggestion')
      .field('supply_type')
      .from('view_eebom_detail')
      .where('edm_version_id = ? and ((sheet::INTEGER >= ? and sheet::INTEGER <= ? ) or (sheet::INTEGER >= ? and sheet::INTEGER <= ?)) and type1 != ?', id, 44, 54, 85, 86, 'Connector')
    let res = await systemDB.Query(subSql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }*/

  /**
* 透過edm_version_id 取得所有的物料花費
* @param {String} id
*/
  /*
  static async getAllCostWithoutSummary(id) {
    let subSql = squel.select()
      .field('qty')
      .field('module')
      .field('CASE WHEN current_price IS NOT NULL THEN current_price\
            ELSE (sourcer_cost) END', 'current')
      .field('suggestion_cost', 'suggestion')
      .field('supply_type')
      .from('view_eebom_detail')
      .where('edm_version_id = ?', id)

    let res = await systemDB.Query(subSql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }*/

  static async getEeInfosByEdmVersionId(id) {
    let sql = squel.select()
      .field('eebom_projects.sku,eebom_projects.create_time')
      .field('eebom_projects.stage')
      .field('eebom_projects.platform')
      .field('eebom_projects.panel_size')
      .field('eebom_projects.sku')
      .field('eebom_projects.pcbno')
      .field('edm_version.version', 'version')
      .field('edm_version.version_remark')
      .field('edm_version.status_version')
      .from('wiprocurement.eebom_projects', 'eebom_projects')
      .join('wiprocurement.edm_version', 'edm_version', 'eebom_projects.id = edm_version.eebom_project_id')
      .where('edm_version.id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getAllPartNumberCommonParts() {
    let sql = squel.select()
      .field('partnumber')
      .from('wiprocurement.view_common_parts')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  /**
 *
 * @param {String} id edm_version_id
 * @returns {Array} 透過group by module 算出 total_parts_count, total_last, suggestion
 */

  static async getEeCost(id) {
    let subSql = squel.select()
      .field('module')
      .field('qty', 'total_parts_count')
      .field('CASE WHEN current_price IS NOT NULL THEN (current_price * qty)\
            ELSE (sourcer_cost * qty) END', 'total_last')
      .field('suggestion_cost * qty', 'suggestion')
      .from('wiprocurement.view_eebom_detail')
      .where('edm_version_id = ?', id)
    let sql = squel.select()
      .field('t.module')
      .field('sum(t.total_last)', 'total_last')
      .field('sum(t.suggestion)', 'suggestion')
      .field('sum(t.total_parts_count)', 'total_parts_count')
      .from(subSql, 't')
      .group('module')
    // let sql = squel.select()
    //   .field('module')
    //   .field('SUM(qty)', 'total_parts_count')
    //   .field('SUM(current_price * qty)', 'total_last')
    //   .field('SUM(suggestion_cost * qty)', 'suggestion')
    //   .from('wiprocurement.view_eebom_detail')
    //   .where('edm_version_id = ?', id)
    //   .group('module')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

}


module.exports = Spending
