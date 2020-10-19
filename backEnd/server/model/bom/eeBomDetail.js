let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const {  useParenthesesForArr } = require('../../helpers/query/processString.js')
const moment = require('moment')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
const uuidv1 = require('uuid/v4')
const DETAIL_COLS = [
  'currrent_price_adj_percentage',
  'sourcer_cost',
  'ce_cost',
  'remark',
  'is_personal_checked',
  'is_leader_checked',
  'is_personal_submitted',
  'leader_checked_status',
  'leader_submitted_status',
  'is_reject',
  'type1',
  'type2',
]

class EeBomDetailData {
  static async updatePersonalCheck(client, info) {
    let sql = squel.update().table('eebom_detail').where('id = ?', info.id).set('is_personal_checked', info.is_personal_checked)
    await client.query(sql.toParam())
  }
  static async getEeBomDetailInfo(id) {
    let sql = squel.select().field('*').from('eebom_detail').where('id = ?', id).order('type1', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : false
  }
  static async getEdmVersionInfo(id) {
    let sql = squel.select().field('*').from('edm_version').where('id = ?', id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : {}
  }

  static async getAvlListByProject(edm_version_id) {
    const sql = squel.select()
      .field('type1')
      .field('type2')
      .field('brand::json', 'avl_brand')
      .field('spec::json', 'avl_spec')
      .from('wiprocurement.eebom_avl avl')
      .join('wiprocurement.eebom_projects', 'project', '(upper(project.customer) = upper(avl.customer) and upper(project.product_type) = upper(avl.bu))')
      .join('wiprocurement.edm_version', 'version', 'version.eebom_project_id = project.id')
      .where('version.id = ?', edm_version_id)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpecByPartnumbers(partNumbers = []) {
    let sql = squel.select().distinct()
      .field('spec.item', 'item')
      .field('type1.type1name', 'type1')
      .field('type2.type2name', 'type2')
      .field('spec1', 'spec01').field('spec2', 'spec02').field('spec3', 'spec03').field('spec4', 'spec04').field('spec5', 'spec05')
      .field('spec6', 'spec06').field('spec7', 'spec07').field('spec8', 'spec08').field('spec9', 'spec09').field('spec10')
      .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
      .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
      .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
      .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
      .from('epur_itemtype', 'item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .left_join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .left_join('epur_itemspec', 'spec', 'spec.item = item.item')
      .where('spec.item in ?', partNumbers)

    const result = await systemDB.Query(sql.toParam())
    return result.rows

  }
  static async getEEbomDetailByVersionID(edm_version_id) {
    let sql = squel.select().field('*').from('eebom_detail').where('edm_version_id = ?', edm_version_id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async updateMainProjectVersion(info) {
    let sql = squel.update()
      .table('eebom_projects')
      .where('id = ?', info.id)
      .set('version', parseFloat(info.version) + 0.5 )
      .set('is_next_stage', true)
    await systemDB.Query(sql.toParam())
  }
  static async updateEeBomDetailInfo(client, info) {
    let sql = squel.update().table('eebom_detail').where('id = ?', info.id).setFields(info)
    await client.query(sql.toParam())
  }
  static async getEEBOMDetailOnConflictSql(){
    let onConflictClause = ' ON CONFLICT ("id") DO UPDATE SET '
    DETAIL_COLS.forEach((c, idx) => {
      if (idx == DETAIL_COLS.length - 1) {
        onConflictClause += `${c}=EXCLUDED.${c}`
      } else {
        onConflictClause += `${c}=EXCLUDED.${c}, `
      }
    })
    return onConflictClause
  }

  static async upsertEeBomDetailInfo(client, info) {
    let onConflictClause = await this.getEEBOMDetailOnConflictSql()
    let sql = squel.insert()
      .into('wiprocurement.eebom_detail')
      .setFieldsRows(info)
      .toParam()
    sql.text += onConflictClause
    await client.query(sql)
  }
  static async getTypes() {
    let sql = squel.select()
      .field('type1')
      .field('type2')
      .from('xray_dropdown')
      .where('eeme = \'EE\'')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getProxyInfoByUserID(userID) {
    let sql = squel.select().field('*').from('ee_assignment').where('proxy_emplid = ?', userID)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPicType1(userID) {
    let sql = squel.select().field('type1').distinct().from('ee_assignment').where('pic_emplid = ?', userID)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getProxyType1(userID) {
    let sql = squel.select().field('type1').distinct().from('ee_assignment').where('proxy_emplid = ?', userID)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPicByType1(type1) {
    let sql = squel.select().field('pic')
      .field('type1')
      .field('type2')
      .distinct().from('ee_assignment')
      .where('type1 in ?', type1)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPersonalBomDetail(info) {
    let sql = squel.select().field('*')
      .from('view_eebom_detail')
      .where('edm_version_id = ? and type1 = ?', info.edm_version_id, squel.rstr(`ANY(VALUES ${useParenthesesForArr(info.type1)})`))
    if (info.orderBy) {
      let orderByCloumn = info.orderBy.replace('-', '')
      // sql.order(orderByCloumn, squelOrderBy(info.orderBy)).order('update_time', false)
      sql.order(orderByCloumn, squelOrderBy(info.orderBy)).order('create_time', false)
    } else {
      // sql.order('update_time', false)
      sql.order('create_time', false)
    }
    sql.order('id', true)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getProjectCopyList(edm_version_id, partlist, start_time, end_time) {
    let sql = squel.select().field('view_eebom_detail.part_number')
      .field('view_eebom_detail.manufacturer')
      .field('view_eebom_detail.current_price')
      .field('view_eebom_detail.other_manufacture_info')
      .field('view_eebom_detail.spa')
      .field('view_eebom_detail.lpp')
      .field('edm_version.approve_time')
      .field('currrent_price_adj_percentage')
      .field('ce_cost')
      .field('sourcer_cost')
      .field('remark')
      .field('view_eebom_detail.edm_version_id')
      .field('last_price_currency')
      .field('last_price_currency_price')
      .from('eebom_projects', 'eebom_projects')
      .join('edm_version', 'edm_version', 'eebom_projects.id = edm_version.eebom_project_id')
      .join('view_eebom_detail', 'view_eebom_detail', 'edm_version.id = view_eebom_detail.edm_version_id')
      .where('edm_version.status_version > 0 and edm_version.status_version::varchar not like \'%.5\'')
      .where('edm_version.approve_time >= ? and edm_version.approve_time <= ?', start_time, end_time)
      .where('view_eebom_detail.part_number in ?', partlist)
      .where('edm_version.id != ?', edm_version_id)
      .order('edm_version.approve_time', false)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPcbTotalPrice(info) {
    let sql = squel.select().field('sum(cast(suggestion_cost as numeric) *  qty)', 'pcb_total_price')
      .from('view_pcb')
      .where('edm_version_id = ? and is_count = ? and suggestion_cost != ? and suggestion_cost!=\'\'', info.edm_version_id, true, 'NaN')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0].pcb_total_price : 0
  }
  static async getAllBomDetail(info) {
    let sql = squel.select().field('*')
      .from('wiprocurement.view_eebom_detail')
      .where('edm_version_id = ?', info.edm_version_id)
    if( info.isOdmParts == 'true') {
      sql.where('supply_type = \'AV\' or supply_type = \'W\' or supply_type = \'S\' or supply_type = \'Empty\' or supply_type is null ')
    }
    if (info.orderBy) {
      let orderByCloumn = info.orderBy.replace('-', '')
      // sql.order(orderByCloumn, squelOrderBy(info.orderBy)).order('update_time', false)
      sql.order(orderByCloumn, squelOrderBy(info.orderBy)).order('create_time', false)
    } else {
      // sql.order('update_time', false)
      sql.order('create_time', false)
    }
    sql.order('id', true)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async copyEdmVersion(edm_version_id) {
    let fields = ['eebom_project_id', 'version', 'upload_time',
      'pcb_approved_by', 'bom_approved_by', 'approve_time', 'status_version', 'refresh_time']
    let subSql = squel.select()
      .from('wiprocurement.edm_version').where('id = ?', edm_version_id)
    fields.forEach(f=> {
      subSql.field(f)
    })
    let sql = squel.insert()
      .into('wiprocurement.edm_version')
      .fromQuery(
        fields,
        subSql
      )
      .returning('id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0].id : null
  }
  static async copyEEbomDetail(client, eebomDetails) {
    let sql = squel.insert()
      .into('wiprocurement.eebom_detail')
      .setFieldsRows(eebomDetails)
    let result = await client.query(sql.toParam())
    return result
  }
  static async deleteEdmVersionByID(edm_version_id) {
    let sql = squel.delete()
      .from('wiprocurement.edm_version')
      .where('id = ?', edm_version_id)
    await systemDB.Query(sql.toParam())
  }
  /**
   * update edmversion 版號
   * @param {object} client
   * @param {array} info  edm_version data
   */
  static async updateEdmVersion(client, info) {
    let sql = squel.update().table('wiprocurement.edm_version')
      .setFields(info)
      .set('update_time = now()')
      .where('id = ?', info.id)
      .returning('id')
    await client.query(sql.toParam())
  }
  static async getEdmVersionStatusVersionByID (eebomProjectId, edmVersion) {
    let sql = squel.select()
      .from('edm_version')
      .field('id', 'edm_version_id')
      .field('status_version')
      .order('status_version', false)
      .where('version = ?', edmVersion)
      .where('eebom_project_id = ?', eebomProjectId)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getEeBomDetailInfoByIds(ids) {
    let sql = squel.select().field('*').from('eebom_detail').where('id in ?', ids)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getCommonParts() {
    let sql = squel.select().field('partnumber')
      .from('wiprocurement.view_common_parts')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getEEBomProductType(id) {
    let sql = squel.select()
      .field('product_type')
      .from('eebom_projects')
      .where('id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  // static async updateEeBomDetail(info) {
  //   let nowtime = moment().utc().format()
  //   if(info.ce_cost !== null) {
  //     let sql = squel.update()
  //       .table('eebom_detail')
  //       .set('currrent_price_adj_percentage', info.currrent_price_adj_percentage)
  //       .set('remark', info.remark)
  //       .set('is_personal_checked', info.is_personal_checked)
  //       .set('update_time', nowtime)
  //       .set('ce_cost', info.ce_cost )
  //       .where('id = ? ', info.id)
  //     await systemDB.Query(sql.toParam())
  //     return true
  //   } else {
  //     try {
  //       let sql = squel.update()
  //         .table('eebom_detail')
  //         .set('currrent_price_adj_percentage', info.currrent_price_adj_percentage)
  //         .set('remark', info.remark)
  //         .set('is_personal_checked', info.is_personal_checked)
  //         .set('update_time', nowtime)
  //         .set('ce_cost',
  //           squel.select()
  //             .field(`round(((current_price * ${info.currrent_price_adj_percentage}) /100), 6)`)
  //             .from('eebom_detail')
  //             .where('id = ? and current_price is not null', info.id)
  //         )
  //         .where('id = ? ', info.id)
  //       await systemDB.Query(sql.toParam())
  //       return true
  //     } catch(err) {
  //       throwApiError('update failed', errorCode.updateFailed)
  //     }
  //   }
  // }

}

module.exports = EeBomDetailData
