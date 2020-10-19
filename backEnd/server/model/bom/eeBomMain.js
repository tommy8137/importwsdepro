let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
const moment = require('moment')

class EeMainBomData {

  static async getEeData(items, offset, orderBy, column, keyword) {
    let sql = this.generateQuerySql(items, offset.toString(), orderBy, column, keyword)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getEeDataBySearch(items, offset, orderBy, column, keyword, project, product_type) {
    let sql = this.generateQuerySqlBySearch(items, offset.toString(), orderBy, column, keyword, project, product_type)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getEeCount(column, keyword) {
    let sql = this.generateQuerySql('', '', '', column, keyword)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }
  static async getEeCountBySearch(product_type, column, keyword, project) {
    let sql = this.generateQuerySqlBySearch('', '', '', column, keyword, project, product_type)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  }
  static async getEeBomInfoByID(id) {
    let sql_case = `
    case
      when projects.plant_code is not null then
        projects.plant_code
      when projects.plant is null or projects.purchasing_organization is null then
        json_build_array()
      else
        json_build_array(json_build_object('plants', STRING_TO_ARRAY(projects.plant, ''),
        'purchasing_organization', projects.purchasing_organization ))
    end
    `
    let sql = squel.select()
      .distinct('edm_version.eebom_project_id')
      .field('projects.id')
      .field('projects.project_code')
      .field('projects.customer')
      .field('projects.product_type')
      .field('projects.project_name')
      .field('projects.stage', 'stage')
      .field('projects.sku')
      .field('projects.project_leader')
      .field('projects.plant')
      .field('projects.purchasing_organization')
      .field('projects.create_time')
      .field('projects.caculation_date')
      .field('projects.update_time')
      .field('projects.is_next_stage')
      .field('projects.platform')
      .field('projects.panel_size')
      .field(sql_case, 'plant_code')
      .field('edm_version.status_version', 'version')
      .field('edm_version.approve_time', 'approve_time')
      .field('edm_version.version_remark', 'version_remark')
      .field('edm_version.id', 'edm_version_id')
      .field('edm_version.version', 'eedm_version')
      .from('eebom_projects', 'projects')
      .join('edm_version', 'edm_version', 'projects.id = edm_version.eebom_project_id')
      .order('edm_version.eebom_project_id, edm_version.upload_time', false)
      .order('edm_version.status_version', false)
      .where('projects.id = ?', id)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : {}
  }
  static async getEeBomInfoByEdmVersionID(id, edm_version_id) {
    let sql_case = `
    case
      when projects.plant_code is not null then
        projects.plant_code
      when projects.plant is null or projects.purchasing_organization is null then
        json_build_array()
      else
        json_build_array(json_build_object('plants', STRING_TO_ARRAY(projects.plant, ''),
        'purchasing_organization', projects.purchasing_organization ))
    end
    `
    let sql = squel.select()
      .field('projects.project_code')
      .field('projects.customer')
      .field('projects.product_type')
      .field('projects.project_name')
      .field('projects.stage', 'stage')
      .field('projects.sku')
      .field('projects.project_leader')
      .field('projects.plant')
      .field('projects.purchasing_organization')
      .field('projects.caculation_date')
      .field(sql_case, 'plant_code')
      .field('edm_version.status_version', 'version')
      .field('edm_version.version_remark', 'version_remark')
      .field('edm_version.version', 'eedm_version')
      .field('edm_version.avl', 'avl')
      .from('eebom_projects', 'projects')
      .join('edm_version', 'edm_version', 'projects.id = edm_version.eebom_project_id')
      .where('projects.id = ? and edm_version.id = ?', id, edm_version_id)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : {}
  }
  static async getEeBomPlantCodeByID(id) {
    let sql = squel.select()
      .distinct('edm_version.eebom_project_id')
      .field('projects.id')
      .field('case when projects.origin_plant_code is null then json_build_array(json_build_object(\'plants\', STRING_TO_ARRAY(projects.plant, \'\'), \'purchasing_organization\', projects.purchasing_organization )) else projects.origin_plant_code end', 'origin_plant_code')
      // .field('projects.origin_plant_code', 'origin_origin_plant_code')
      .field('projects.plant_code', 'plant_code')
      .from('eebom_projects', 'projects')
      .join('edm_version', 'edm_version', 'projects.id = edm_version.eebom_project_id')
      .order('edm_version.eebom_project_id, edm_version.upload_time', false)
      .order('edm_version.status_version', false)
      .where('projects.id = ?', id)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : {}
  }
  static async updateEeBomInfo(client, info) {
    let nowtime = moment().utc().format()
    let sql = squel.select()
      .distinct('edm_version.eebom_project_id')
      .field('edm_version.id', 'edm_version_id')
      .from('eebom_projects', 'projects')
      .join('edm_version', 'edm_version', 'projects.id = edm_version.eebom_project_id')
      .order('edm_version.eebom_project_id, edm_version.upload_time', false)
      .order('edm_version.status_version', false)
      .where('projects.id = ?', info.id)

    const result = await systemDB.Query(sql.toParam())
    let edm_version_id = result.rowCount > 0 ? result.rows[0].edm_version_id : null

    if(edm_version_id) {
      sql = squel.update()
        .table('edm_version').where('id = ?', edm_version_id)
        .set('version_remark', info.version_remark)
        .set('update_time', nowtime)

      await client.query(sql.toParam())
    } else {
      return
    }
  }

  static async updateEeBomInfoByEdmVersionId(client, info) {
    let nowtime = moment().utc().format()

    let sql = squel.update()
      .table('edm_version')
      .where('id = ?', info.edm_version_id)
      .where('eebom_project_id = ?', info.id)
      .set('avl', info.avl)
      .set('update_time', nowtime)

    await client.query(sql.toParam())
  }

  static async updateEeBomProjectPlantCode(client, project_id, plant_code) {
    let nowtime = moment().utc().format()

    let sql = squel.update()
      .table('eebom_projects')
      .where('id = ?', project_id)
      .set('plant_code', JSON.stringify(plant_code))
      .set('update_time', nowtime)

    if (plant_code.length > 0) {
      sql.set('plant', plant_code[0].plants[0])
      sql.set('purchasing_organization', plant_code[0].purchasing_organization)

    }
    await client.query(sql.toParam())
  }

  static async getApprovedVersion(id) {
    let sql = squel.select().field('eedm_version').from('eebom_projects').where('id = ?', id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0].eedm_version : false
  }
  static async getApprovedVersionDate(id, version) {
    let sql = squel.select().field('upload_time').from('edm_version').where('eebom_project_id = ? and version = ?', id, version)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0].upload_time : false
  }
  static async getVersions(id, versionUploadTime) {
    let response = []
    // if versionUploadTime is not null，代表此project已經有approved的版本
    if(versionUploadTime != null) {
      let sql = squel.select()
        .field('id', 'id')
        .field('version', 'version')
        .field('eebom_project_id', 'eebom_project_id')
        .field('substr(upload_time,0,9)', 'upload_time')
        .from('edm_version').where('eebom_project_id = ? and substr(upload_time,0,9) > ?', id, versionUploadTime)
        .order('upload_time', false)
      let result = await systemDB.Query(sql.toParam())
      // 找出日期大於 already approved 的version
      if(result.rowCount > 0 && result.rows[0].upload_time > versionUploadTime) {
        let versions = result.rows
        let maxTime = result.rows[0].upload_time
        for(let i = 0 ; i < versions.length ; i++) {
          if(maxTime == versions[i].upload_time) {
            response.push(versions[i])
          } else {
            break
          }
        }
        return response
      } else return []
    } else {
      let sql = squel.select()
        .field('id', 'id')
        .field('status_version')
        .field('approve_time')
        .field('version', 'version')
        .field('eebom_project_id', 'eebom_project_id')
        .field('substr(upload_time,0,9)', 'upload_time')
        .from('edm_version').where('eebom_project_id = ? ', id)
        .order('upload_time', false)
      let result = await systemDB.Query(sql.toParam())
      return result.rowCount > 0 ? result.rows : []
    }
  }

  static generateQuerySql(items, offset = '', orderBy, column, keyword) {
    let sql = squel.select()
      .field('*')
      .from('eebom_projects')
    if (column && keyword){
      sql.where(`UPPER(${column}) like UPPER(?)`, `%${keyword}%`)
    }
    if (orderBy) {
      let orderByCloumn = orderBy.replace('-', '')
      sql.order(orderByCloumn, squelOrderBy(orderBy)).order('update_time', false)
    } else {
      sql.order('update_time', false)
    }
    if (offset) {
      sql.limit(items).offset(offset)
    }
    return sql
  }
  static generateQuerySqlBySearch(items, offset,  orderBy, column, keyword, project, product_type) {
    let sql = squel.select()
      .distinct('edm_version.eebom_project_id')
      .field('projects.id')
      .field('projects.project_code')
      .field('projects.customer')
      .field('projects.product_type')
      .field('projects.project_name')
      .field('concat(projects.pcbno,\'_\',projects.stage)', 'pcbno_stage')
      .field('projects.sku')
      .field('projects.version_remark')
      .field('projects.project_leader')
      .field('projects.plant')
      .field('projects.purchasing_organization')
      .field('projects.create_time')
      .field('projects.caculation_date')
      .field('projects.update_time')
      .field('projects.is_next_stage')
      .field('projects.platform')
      .field('projects.panel_size')
      .field('edm_version.status_version', 'version')
      .field('edm_version.approve_time', 'approve_time')
      .from('eebom_projects', 'projects')
      .join('edm_version', 'edm_version', 'projects.id = edm_version.eebom_project_id')
      .order('edm_version.eebom_project_id, edm_version.upload_time', false)
      .order('edm_version.status_version', false)
      .where(`projects.product_type similar to ?`, `(${product_type})`)


    if (column && keyword){
      sql.where(`UPPER(${column}) like UPPER(?)`, `${keyword}`)
    }
    if(project) {
      sql.where('UPPER(project_code) like UPPER(?) or UPPER(project_name) like UPPER(?)', `%${project}%`, `%${project}%`)
    }

    let projectSql = squel.select()
      .field('*')
      .from(sql, 'project')

    if (orderBy) {
      let orderByCloumn = orderBy.replace('-', '')
      projectSql.order(`project.${orderByCloumn}`, squelOrderBy(orderBy)).order('project.create_time', false)
    } else {
      projectSql.order('project.create_time', false)
    }
    if (offset) {
      projectSql.limit(items).offset(offset)
    }
    return projectSql
  }
  static async approve(client, obj, id) {
    let sql = squel.update()
      .table('edm_version')
      .where('id = ?', id)
      .setFields(obj)
    await client.query(sql.toParam())
  }
  static async resetCheckAndSubmitted(client, id) {
    let sql1 = squel.update()
      .table('edm_version')
      .where('id = ?', id)
      .set('is_pcb_personal_submitted = ?', false)
      .set('is_pcb_personal_checked = ?', false)
      .set('is_pcb_leader_checked = ?', false)
    await client.query(sql1.toParam())

    let sql2 = squel.update()
      .table('eebom_detail')
      .where('edm_version_id = ?', id)
      .set('is_personal_checked = ?', false)
      .set('is_leader_checked = ?', false)
      .set('is_personal_submitted = ?', false)
    await systemDB.Query(sql2.toParam())
  }
  static async updateMainBom(client, obj, id) {
    let sql = squel.update()
      .table('eebom_projects')
      .where('id = ?', id)
      .set('approve_time = ?', 'now()')
      .setFields(obj)
    await client.query(sql.toParam())
  }
  static async getProductTypeBaseData() {
    let plmSql = squel.select()
      .field('producttype', 'product_type')
      .from('all_pmprjtbl_for_dashboard')
      .where('producttype IS NOT NULL')
      .distinct()
    let pfwSql = squel.select()
      .field('product_type_desc', 'product_type')
      .from('v_businessorg_bo')
      .where('product_type_desc IS NOT NULL')
      .distinct()
    let sql = squel.select()
      .distinct()
      .from(plmSql.union_all(pfwSql), 'a')
      .order('a.product_type', true)
    
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  // 拿取plm table裡面product type list的資料
  static async getProductTypeBaseDataPLM() {
    let sql = squel.select()
      .field('producttype', 'product_type')
      .from('all_pmprjtbl_for_dashboard')
      .where('producttype IS NOT NULL')
      .distinct()
      .order('producttype')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  /* 由於rfq 的取product type邏輯是用rfq table中的profit center去對應到v_businessorg_bo中
    的product_type_desc, 因此要拿到rfq會使用到的product type list就只要到v_businessorg_bo中
    拿product_type_desc就好
  */
  static async getProductTypeBaseDataRFQ() {
    let sql = squel.select()
      .field('product_type_desc', 'product_type')
      .from('v_businessorg_bo')
      .where('product_type_desc IS NOT NULL')
      .distinct()
      .order('product_type_desc')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getEdmVersionRefreshTime(edm_version_id) {
    let sql = squel.select()
      .field('refresh_time')
      .from('edm_version')
      .where('id = ?', edm_version_id)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0].refresh_time : null
  }
}

module.exports = EeMainBomData
