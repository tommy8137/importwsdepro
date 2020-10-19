const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')

class permission {

  /**
   * 利用sourcer code找type1
   * @param {string} scode sourcer code
   * @param {string} usedOn resource scope, ex: xray
   */
  static async getType1ByScode(scode, usedOn) {
    let joinSql = squel.select()
      .field('distinct(t.type1name)', 'type1')
      .field('e.ekgrp', 'scode')
      .from('wiprocurement.eine', 'e')
      .from('wiprocurement.eina', 'a')
      .from('wiprocurement.epur_item_type', 't')
      .where('t.item = a.bmatn and e.infnr = a.infnr and e.ekgrp = ?', scode)

    let sql = squel.select('*')
      .from('wiprocurement.perm_type1_meee', 'ptm')
      .join(joinSql, 'st', 'st.type1 = ptm.type1')
      .where('used_on = ? ', usedOn)

    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  /**
   * 利用ee/me找type1
   * @param {array} scode ee or me代號
   * @param {string} usedOn resource scope, ex: xray
   */
  static async getType1ByEEME(eeme, usedOn) {
    let sql = squel.select('*')
      .from('wiprocurement.perm_type1_meee')
      .where('category in ? and used_on = ? ', eeme, usedOn)
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  /**
   * 建立使用者與type1之間的關聯性
   * @param {array} permRows 例如：[{ 'type1_id': [1,2,3], 'emplid': 10504301 }]
   */
  static async createUserType1(permRows) {
    let sql = squel.insert()
      .into('wiprocurement.perm_user_type1_meee')
      .setFieldsRows(permRows)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount
  }

  /**
   * 刪除使用者與type1之間的關聯性
   * @param {string} emplid 員工工號
   * @param {array} type1 type1的list
   */
  static async deleteUserType1(emplid, type1) {
    let sql = squel.delete()
      .from('wiprocurement.perm_user_type1_meee')
      .where('emplid=? and type1_id in ?', emplid, type1)

    const res = await systemDB.Query(sql.toParam())
    return res.rowCount
  }
  /**
   * 刪除此使用者的所有type1關聯性
   * @param {string} emplid 員工工號
   */
  static async deleteAllUserType1(emplid) {
    let sql = squel.delete()
      .from('wiprocurement.perm_user_type1_meee')
      .where('emplid=? ', emplid)
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  /**
   * 建立使用者與product type me之間的關聯性
   * @param {array} permRows 例如：[{ 'product_type_me': 'AIO', 'emplid': 10504301}]
   */
  static async createUserMeProductTypePermission(data) {
    let sql = squel.insert()
      .into('wiprocurement.perm_product_type_me')
      .setFieldsRows(data)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount
  }
  /**
   * 建立使用者與product type ee之間的關聯性
   * @param {array} permRows 例如：[{ 'product_type_ee': 'Audio', 'emplid': 10504301}]
   */
  static async createUserEeProductTypePermission(data) {
    let sql = squel.insert()
      .into('wiprocurement.perm_product_type_ee')
      .setFieldsRows(data)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount
  }
  /**
   * 刪除此使用者的所有product type關聯性
   * @param {string} emplid 員工工號
   */
  static async deleteAllUserMeProductType(emplid) {
    let sql = squel.delete()
      .from('wiprocurement.perm_product_type_me')
      .where('emplid=? ', emplid)
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  static async deleteAllUserEeProductType(emplid) {
    let sql = squel.delete()
      .from('wiprocurement.perm_product_type_ee')
      .where('emplid=? ', emplid)
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }
}

module.exports = permission
