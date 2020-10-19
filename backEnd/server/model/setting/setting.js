const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')

class Setting {
  static async getEeAssignmentList() {
    let sql = squel.select()
      .field('id')
      .field('type1')
      .field('type2')
      .field('pic')
      .field('pic_emplid')
      .field('proxy')
      .field('proxy_emplid')
      .from('ee_assignment')
      .order('type1')

    let res = await systemDB.Query(sql.toParam())
    return res.rows

  }
  static async assign(type1, pic, pic_emplid, proxy, proxy_emplid) {
    try {
      let sql = squel.update().table('ee_assignment')
      sql.set('pic', pic)
      sql.set('pic_emplid', pic_emplid)
      sql.set('proxy', proxy)
      sql.set('proxy_emplid', proxy_emplid)
        .where('type1 = ? ', type1)
      await systemDB.Query(sql.toParam())
      return 'assign success'
    }catch(e){
      throwApiError('update failed', errorCode.updateFailed)
    }
  }

  static async searchUser(keyword){
    let joinSql = squel.select().field('c.emplid', 'roleEmplid').from('rbac_user_role', 'c')
      .join('rbac_roles', 'd', 'c.role_id = d.id')
    joinSql.where(
      squel.expr().and('d.role_name = ?', 'CE:EE')
        .or('d.role_name = ?', 'CE:ME')
        .or('d.role_name = ?', 'CE:ME_EE')
    )
    let sql = squel.select().from('wiprocurement.user', 'a')
      .field('emplid', 'key')
      .field('name_a', 'value')
      .distinct()
      .join(joinSql, 'b', 'a.emplid = b.roleEmplid')
    if(keyword){
      sql.where(
        squel.expr().and('UPPER(emplid) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(name_a) LIKE UPPER(?)', `%${keyword}%`)
      )
    }
    sql.order('name_a')
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }

  static async getProductTypeByRole(role) {
    let sql = squel.select()
      .field('product_type')
      .from('xray_dropdown')
      .distinct()
      .where('eeme = UPPER(?)', role)
      .order('product_type')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getTypeI(role, productType) {
    let sql = squel.select()
      .field('type1')
      .from('xray_dropdown')
      .distinct()
      // .where('eeme = UPPER(?) and product_type = ?', role, productType)
      .where('eeme = UPPER(?)', role)
      .order('type1')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getTypeII(role, type1) {
    let sql = squel.select()
      .field('type2')
      .from('xray_dropdown')
      .distinct()
      .where('eeme = UPPER(?) and type1 = ?', role, type1)
      .order('type2')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  /**
   * 透過物料的type1, type2取得物料的spec
   * @param {string} type1 物料的type1
   * @param {string} type2 物料的type2
   * @returns {array} 物料的spec
   */
  static async getItemSpec(type1, type2) {
    let sql = squel.select()
      .field('spec1')
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('type1.type1name = ? and type2.type2name = ? and mara.zzeeme = ? and spec.spec1 is not null', type1, type2, 'ME')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  /**
   * 透過物料的type1, type2, spec1取得物料的spec
   * @param {string} spec1 物料的spec1 name
   * @param {string} type1 物料的type1
   * @param {string} type2 物料的type2
   * @returns {array} 物料的spec title (ME)
   */
  static async getMeSpecTitle(spec1, type1, type2) {
    let sql = squel.select()
      .field('spec_t2').field('spec_t3').field('spec_t4').field('spec_t5')
      .field('spec_t6').field('spec_t7').field('spec_t8').field('spec_t9').field('spec_t10')
      .field('spec_t11').field('spec_t12').field('spec_t13').field('spec_t14').field('spec_t15')
      .field('spec_t16').field('spec_t17').field('spec_t18').field('spec_t19').field('spec_t20')
      .field('spec_t21').field('spec_t22').field('spec_t23').field('spec_t24').field('spec_t25')
      .field('spec_t26').field('spec_t27').field('spec_t28').field('spec_t29').field('spec_t30')
      .field('ins2by').field('ins2date').field('ins3by').field('ins3date').field('ins4by').field('ins4date')
      .field('ins5by').field('ins5date')
      .field('ins6by').field('ins6date').field('ins7by').field('ins7date').field('ins8by').field('ins8date')
      .field('ins9by').field('ins9date').field('ins10by').field('ins10date')
      .field('ins11by').field('ins11date').field('ins12by').field('ins12date').field('ins13by').field('ins13date')
      .field('ins14by').field('ins14date').field('ins15by').field('ins15date')
      .field('ins16by').field('ins16date').field('ins17by').field('ins17date')
      .field('ins18by').field('ins18date').field('ins19by').field('ins19date').field('ins20by').field('ins20date')
      .field('ins21by').field('ins21date').field('ins22by').field('ins22date').field('ins23by').field('ins23date')
      .field('ins24by').field('ins24date').field('ins25by').field('ins25date')
      .field('ins26by').field('ins26date').field('ins27by').field('ins27date')
      .field('ins28by').field('ins28date').field('ins29by').field('ins29date')
      .field('ins30by').field('ins30date')
      .from('me_spec_title')
      .where('spec1 = ? and type1name = ? and type2name = ?', spec1, type1, type2)
      .order('type1name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : []
  }
  /**
   * 透過物料的type1取得物料的type1 ID
   * @param {string} type1 物料的type1
   * @returns {array} 物料的type1 ID
   */
  static async getType1ID(type1) {
    let sql = squel.select()
      .field('type1id')
      .from('epur_type1')
      .where('type1name = ?', type1)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  /**
   * 透過物料的type1, type2取得物料的type2 ID
   * @param {string} type1 物料的type1
   * @param {string} type2 物料的type2
   * @returns {array} 物料的type2 ID
   */
  static async getType2ID(type1, type2) {
    let sql = squel.select()
      .field('type2id')
      .from('view_epur_spec_title')
      .where('type1name = ? and type2name = ?', type1, type2)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async insertKey(spec1, type1, type2, type1id, type2id) {
    let sql = squel.insert().onConflict().into('wiprocurement.me_spec_title')
      .set('spec1', spec1)
      .set('type1name', type1)
      .set('type2name', type2)
      .set('type1id', type1id)
      .set('type2id', type2id)
      
    let res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  static async updateMeSpecTitle(spec1, type1, type2, spec_no, title, username) {
    let sql = squel.update().table('me_spec_title')
      .set(`spec_t${spec_no}`, title)
      .set(`ins${spec_no}by`, username)
      .set(`ins${spec_no}date`, 'NOW()')
      .where('spec1 = ? and type1name = ? and type2name = ?', spec1, type1, type2)

    let res = await systemDB.Query(sql.toParam())
    return 'update success '


  }
}

module.exports = Setting