const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')

const { systemDB } = require('../../helpers/database')
const { orderByString, squelOrderBy } = require('../../helpers/query/orderBy.js')
class User {
  static async getUserByKeyword(items, offset, orderBy, keyword, roleGroup, roleName) {
    let contactWindowSql = squel.select().field('*')
      .from( squel.select()
        .field('users.emplid')
        .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
        .from('wiprocurement.user', 'users')
        .left_join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
        .left_join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_roles.id = rbac_user_role.role_id')
      , 't').where('t.role_name = \'CONTACT_WINDOW\'')
    let subsql = squel.select()
      .field('users.emplid')
      .field('users.name_a')
      .field('users.email_address')
      .field('users.phone')
      .field('contact.role_name', 'contact_window')
      .field('split_part(rbac_roles.role_name, \':\', 1)', 'role_group')
      .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
      .from('wiprocurement.user', 'users')
      .left_join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
      .left_join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_roles.id = rbac_user_role.role_id')
      .left_join(contactWindowSql, 'contact', 'contact.emplid = users.emplid')
    let sql = squel.select()
      .field('emplid')
      .field('name_a')
      .field('email_address')
      .field('phone')
      .field('role_group')
      .field('role_name')
      .field('contact_window')
      .from(subsql, 's')
    sql.where(
      squel.expr().or('UPPER(emplid) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(name_a) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(email_address) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(phone) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(role_name) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(role_group) LIKE UPPER(?)', `%${keyword}%`)
        .or('UPPER(contact_window) LIKE UPPER(?)', `%${keyword}%`)
    )
    if (roleGroup.length > 0) {
      let group = roleGroup.split(',')
      if (group.length == 1 && typeof roleName != 'undefined' && !_.isEmpty(roleName)) {
        sql.where(
          squel.expr().or('UPPER(role_group) = UPPER(?)', roleGroup)
            .and('UPPER(role_name) = UPPER(?)', roleName)
        )
      } else {
        roleGroup = roleGroup.toUpperCase()
        let groups = roleGroup.split(',')
        sql.where(
          squel.expr().or('UPPER(role_group) in ?', groups)
        )
      }
    }
    let orderByCloumn = orderBy.replace('-', '')
    sql.where('role_group != \'CONTACT_WINDOW\' or role_group is null ')
    sql.group('emplid').group('name_a').group('email_address').group('phone').group('role_group').group('role_name').group('contact_window')
    sql.order(orderByCloumn, squelOrderBy(orderBy)).limit(items).offset(offset)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getUserByKeywordNumber(keyword, roleGroup, roleName) {
    let sql
    if(keyword.length == 0 && roleGroup.length == 0) {
      sql = squel.select()
        .field('count(distinct(users.emplid))', 'total')
        .from('wiprocurement.user', 'users')

    } else {
      let contactWindowSql = squel.select().field('*')
        .from( squel.select()
          .field('users.emplid')
          .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
          .from('wiprocurement.user', 'users')
          .left_join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
          .left_join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_roles.id = rbac_user_role.role_id')
        , 't').where('t.role_name = \'CONTACT_WINDOW\'')
      let subsql = squel.select()
        .field('users.emplid')
        .field('users.name_a')
        .field('users.email_address')
        .field('users.phone')
        .field('contact.role_name', 'contact_window')
        .field('split_part(rbac_roles.role_name, \':\', 1)', 'role_group')
        .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
        .from('wiprocurement.user', 'users')
        .left_join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
        .left_join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_roles.id = rbac_user_role.role_id')
        .left_join(contactWindowSql, 'contact', 'contact.emplid = users.emplid')
      sql = squel.select()
        .field('count(distinct(emplid))', 'total')
        .from(subsql, 's')

      sql.where(
        squel.expr().and('UPPER(emplid) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(name_a) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(email_address) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(phone) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(role_name) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(role_group) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(contact_window) LIKE UPPER(?)', `%${keyword}%`)
      )
      if (roleGroup.length > 0) {
        let group = roleGroup.split(',')
        if (group.length == 1 && roleName.length > 0 ) {
          sql.where(
            squel.expr().or('UPPER(role_group) = UPPER(?)', roleGroup)
              .and('UPPER(role_name) = UPPER(?)', roleName)
          )
        } else {
          let groups = roleGroup.split(',')
          sql.where(
            squel.expr().or('UPPER(role_group) in ?', groups)
          )
        }
      }
    }
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount == 1 ? res.rows[0].total : 0
  }

  static async getUserInfo(id) {
    let sql = squel.select()
      .field('users.emplid')
      .field('users.name_a')
      .field('users.email_address')
      .field('users.phone')
      .field('users.is_superuser')
      .field('split_part(rbac_roles.role_name, \':\', 1)', 'role_group')
      .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
      .from('wiprocurement.user', 'users')
      .left_join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
      .left_join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_user_role.role_id = rbac_roles.id')
      .where('users.emplid = ?', id)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getContactWindowList() {
    // let sql = squel.select()
    //   .field('emplid')
    //   .field('name_a')
    //   .field('email_address')
    //   .field('phone')
    //   .field('is_me')
    //   .field('is_ce')
    //   .field('is_ee')
    //   .field('is_superuser')
    //   .field('is_sourcer')
    //   .field('is_rd')
    //   .field('is_pm')
    //   .field('is_me_tm_fm')
    //   .field('is_account')
    //   .field('is_contact_window')
    //   .from('wiprocurement.user')
    //   .where('is_contact_window')
    // const res = await systemDB.Query('SELECT emplid, name_a, email_address, phone, is_me, is_ce, is_ee, is_superuser, is_sourcer, is_rd, is_pm, is_me_tm_fm, is_account, is_contact_window FROM wiprocurement.user WHERE is_contact_window')
    let sql = squel.select()
      .field('users.emplid')
      .field('users.name_a')
      .field('users.email_address')
      .field('users.phone')
      .field('users.is_superuser')
      .field('split_part(rbac_roles.role_name, \':\', 1)', 'role_group')
      .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
      .field('rbac_roles.role_name', 'role_type')
      .from('wiprocurement.user', 'users')
      .join('wiprocurement.rbac_user_role', 'rbac_user_role', 'users.emplid = rbac_user_role.emplid')
      .join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_user_role.role_id = rbac_roles.id')
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async updateUser(isCe, isMe, isEe, isMeTmFm, isRd, isSourcer, isPm, isAccount, isContactWindow, id) {
    try {
      let sql = squel.update().table('wiprocurement.user')
      if (typeof isCe !== 'undefined') sql.set('is_ce', isCe)
      if (typeof isMe !== 'undefined') sql.set('is_me', isMe)
      if (typeof isEe !== 'undefined') sql.set('is_ee', isEe)
      if (typeof isMeTmFm !== 'undefined') sql.set('is_me_tm_fm', isMeTmFm)
      if (typeof isRd !== 'undefined') sql.set('is_rd', isRd)
      if (typeof isSourcer !== 'undefined') sql.set('is_sourcer', isSourcer)
      if (typeof isPm !== 'undefined') sql.set('is_pm', isPm)
      if (typeof isAccount !== 'undefined') sql.set('is_account', isAccount)
      if (typeof isContactWindow !== 'undefined') sql.set('is_contact_window', isContactWindow)
        .where('emplid = ?', id)

      // await systemDB.Query('UPDATE wiprocurement.user SET is_ce = $1, is_me = $2, is_ee = $3, is_me_tm_fm = $4, is_rd = $5, is_sourcer = $6, is_pm = $7, is_account = $8, is_contact_window = $9 WHERE emplid = $10 ', [isCe, isMe, isEe, isMeTmFm, isRd, isSourcer, isPm, isAccount, isContactWindow, id])
      await systemDB.Query(sql.toParam())
      return 'update success'
    } catch (e) {
      console.log(e)
      throwApiError('update failed', errorCode.updateFailed)
    }
  }

  static async createUser(info) {
    const { emplid, name, phone, email, product_type_me, product_type_ee } = info
    try {
      let sql = squel.insert().into('wiprocurement.user')
        .set('emplid', emplid).set('name_a', name).set('phone', phone)
        .set('email_address', email).set('insdate', 'NOW()')
      await systemDB.Query(sql.toParam())
      return 'create success'
    } catch (e) {
      throwApiError('account already exist', errorCode.accountAlreadyExist)
    }
  }

  static async deleteUser(id) {
    await systemDB.Query('delete from wiprocurement.user where emplid = $1', [id])
    return 'delete success'
  }

  static async searchUser(query) {
    const { emplid, name, phone, email } = query
    let sql = squel.select().from('ps_ee_prcrmnt_vw_a')
      .field('emplid', 'emplid')
      .field('name_a', 'name')
      .field('email_address_a', 'email')
      .field('phone_a', 'phone')
      .order('name_a')
    if (emplid) sql.where('emplid like UPPER(?)', `%${emplid}%`)
    if (name) sql.where('UPPER(name_a) like UPPER(?)', `%${name}%`)
    if (phone) sql.where('phone_a like UPPER(?)', `%${phone}%`)
    if (email) sql.where('UPPER(email_address_a) like UPPER(?)', `%${email}%`)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getID() {
    const res = await systemDB.Query('SELECT emplid  FROM wiprocurement.ps_ee_prcrmnt_vw_a ', [])
    return res.rows
  }

  static async getUserByType(type, keyword) {
    let joinSql = squel.select().field('emplid', 'roleEmplid').from('rbac_user_role', 'b')
      .join('rbac_roles', 'c', 'c.id=b.role_id')

    if (type) {
      if (type.toUpperCase() == 'LEADER') {
        joinSql.where('c.role_name = ?', 'PM:ACCOUNT')
      }
      if (type.toUpperCase() == 'APPROVEBY') {
        joinSql.where('c.role_name = ?', 'RD:ME_TM_FM')
      }
      if (type.toUpperCase() == 'DESIGNEE') {
        joinSql.where('c.role_name = ?', 'RD:ME')
      }
    }

    let sql = squel.select().from('wiprocurement.user', 'a')
      .field('emplid', 'key')
      .field('name_a', 'value')
      .join(joinSql, 'b', 'a.emplid = b.roleEmplid')
    if (keyword) {
      sql.where(
        squel.expr().and('UPPER(emplid) LIKE UPPER(?)', `%${keyword}%`)
          .or('UPPER(name_a) LIKE UPPER(?)', `%${keyword}%`)
      )
    }
    sql.where('emplid != ?', '10700001')
    sql.order('name_a')
    const res = await systemDB.Query(sql.toParam())
    return res.rows
  }

  static async getRoleType(emplid) {
    let sql = squel.select()
      .field('split_part(rbac_roles.role_name, \':\', 1)', 'role_group')
      .field('split_part(rbac_roles.role_name, \':\', 2)', 'role_name')
      .field('rbac_user_role.emplid')
      .from('wiprocurement.rbac_user_role', 'rbac_user_role')
      .join('wiprocurement.rbac_roles', 'rbac_roles', 'rbac_roles.id = rbac_user_role.role_id')
      .where('rbac_user_role.emplid = ?', emplid)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getUserType1(emplids, usedOn = false) {
    let sql = squel.select()
      .field('perm_user_type1_meee.emplid')
      .field('perm_type1_meee.id', 'id')
      .field('perm_type1_meee.type1')
      .field('perm_type1_meee.category')
      .from('wiprocurement.perm_user_type1_meee', 'perm_user_type1_meee')
      .join('wiprocurement.perm_type1_meee', 'perm_type1_meee', 'perm_user_type1_meee.type1_id = perm_type1_meee.id')
      .where('perm_user_type1_meee.emplid in ?', emplids)
    if(usedOn) sql.where('used_on = ?', usedOn)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getUserProductType(emplids) {
    let sql = squel.select()
      .field('perm_pt.emplid')
      .field('perm_pt.product_type_me')
      .field('perm_pt.product_type_ee')
      .from('wiprocurement.perm_user_product_type_meee', 'perm_pt')
      .where('perm_pt.emplid in ?', emplids)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getComebineProductType(emplids) {
    let sql = squel.select()
      .from(
        squel.select()
          .field('me.emplid')
          .field('me.product_type_me')
          .field('null', 'product_type_ee')
          .from('wiprocurement.perm_product_type_me', 'me')
          .where('me.emplid in ?', emplids)
          .union_all(
            squel.select()
              .field('ee.emplid')
              .field('null', 'product_type_me')
              .field('ee.product_type_ee')
              .from('wiprocurement.perm_product_type_ee', 'ee')
              .where('ee.emplid in ?', emplids)
          ),
        'a'
      )
      .order('a.emplid', true)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getUserMeProductType(emplids) {
    let sql = squel.select()
      .field('me.emplid')
      .field('me.product_type_me')
      .field('null', 'product_type_ee')
      .from('wiprocurement.perm_product_type_me', 'me')
      .where('me.emplid in ?', emplids)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkUserMeProductType(emplid, productType) {
    let sql = squel.select()
      .field('me.emplid')
      .field('me.product_type_me')
      .from('wiprocurement.perm_product_type_me', 'me')
      .where('me.emplid = ?', emplid)
      .where('me.product_type_me = ?', productType)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0
  }

  static async getUserEEProductType(emplids) {
    let sql = squel.select()
      .field('ee.emplid')
      .field('null', 'product_type_me')
      .field('ee.product_type_ee')
      .from('wiprocurement.perm_product_type_ee', 'ee')
      .where('ee.emplid in ?', emplids)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkUserEeProductType(emplid, productType) {
    let sql = squel.select()
      .field('ee.emplid')
      .field('ee.product_type_ee')
      .from('wiprocurement.perm_product_type_ee', 'ee')
      .where('ee.emplid = ?', emplid)
      .where('ee.product_type_ee = ?', productType)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0
  }

  static async getUsers(ids) {
    let sql = squel.select()
      .field('users.emplid')
      .field('users.name_a')
      .field('users.email_address')
      .field('users.phone')
      .from('wiprocurement.user', 'users')
      .where('users.emplid in ?', ids)
    const  res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0  ? res.rows : []
  }
  static async checkIfEmpExist(emplid) {
    let sql = squel.select(1).from('wiprocurement.user')
      .where('emplid = ?', emplid)
    const res = await systemDB.Query(sql.toParam())
    return res.rowCount == 1
  }

}
module.exports = User
