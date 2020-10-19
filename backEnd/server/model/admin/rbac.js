const squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { squelOrderBy } = require('../../helpers/query/orderBy.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('rbac')
const _ = require('lodash')

const getDic2Cond = function(sql, query) {
  if (!query.resource && query.action){
    return sql.where('actions.action = ?', query.action)
  } else if (query.resource && !query.action){
    return sql.where('resources.rs_path LIKE ?', `${query.resource}%`)
  } else if (query.resource &&  query.action){
    return sql.where('resources.rs_path LIKE ?', `${query.resource}%`).where('actions.action=?', query.action)
  } else {
    return ''
  }
}

class RBAC {
  static async getPoliciesByUser(userID, query) {
    let policySql = squel.select()
      .field('policies.id')
      .field('policies.effect')
      .field('actions.action')
      .field('resources.rs_node')
      .field('resources.rs_path')
      .from('wiprocurement.rbac_policies', 'policies')
      .join('wiprocurement.rbac_resources', 'resources', 'policies.rs_id = resources.id')
      .join('wiprocurement.rbac_actions', 'actions', 'actions.action = policies.action')
    let d2ccond = getDic2Cond(policySql, query)
    let policyRoleSql = squel.select()
      .from ('wiprocurement.rbac_policy_role', 'policy_role')
      .join(policySql, 's_policy', 's_policy.id = policy_role.policy_id')
    let userRolePolicySql = squel.select()
      .from('wiprocurement.rbac_user_role', 'user_role')
      .join(policyRoleSql, 'pr', 'pr.role_id=user_role.role_id')
      .where(`user_role.emplid='${userID}'`)
    //console.log(userRolePolicySql.toString())
    let result = await systemDB.Query(userRolePolicySql.toParam())
    // console.log(result);
    return result.rows
  }
  static async createOrUpdateUserRole(userID, roles) {
    if (roles.length === 0){
      console.log('no roles to update for', userID)
      return {}
    }
    let querySql = squel.select()
      .field('emplid')
      .from('wiprocurement.rbac_user_role')
      .where('emplid = ?', userID)
    let deleteSql = squel.delete()
      .from('wiprocurement.rbac_user_role', 'user_role')
      .where('user_role.emplid IN ?', querySql)
    console.log(deleteSql.toString())
    let result = await systemDB.Query(deleteSql.toParam())

    let insertData = roles.map((role)=>{
      return { emplid : userID,
        role_id: role }
    })
    let insertSql = squel.insert()
      .into('wiprocurement.rbac_user_role')
      .setFieldsRows(insertData)
    console.log(insertSql.toString())
    result = await systemDB.Query(insertSql.toParam())
    querySql.field('role_id')
    result = await systemDB.Query(querySql.toParam())
    console.log('after modify reult:', result.rows)
    return result.rows
  }

  static async getRbacRoleGroup() {
    let selSql = squel.select()
      .field(`
        split_part(r.role_name, ':', 1) as role_group
      `)
      .from('rbac_roles as r')
      .where('typ = ?', '0')
    let sql = squel.select()
      .field('role_group')
      .from(`(${selSql.toString()})`, 'r')
      .group('role_group')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRbacRoleList(orderBy, groups) {
    let sql = squel.select()
      .field(`
        split_part(r.role_name, ':', 1) as role_group,
        split_part(r.role_name, ':', 2) as role_name,
        r.role_name as role_type,
        r.is_editable,
        r.id
      `)
      .from('wiprocurement.rbac_roles as r')
      .where('typ = ?', '0')

    if (orderBy) {
      let orderByCloumn = orderBy.replace('-', '')
      sql.order(orderByCloumn, squelOrderBy(orderBy)).order('role_group', false)
    } else {
      sql.order('role_group', false)
    }

    let selSql = squel.select()
      .field('*')
      .from(`(${sql.toString()})`, 'r')


    if (!_.isEmpty(groups)) {
      selSql.where('role_group in ?', groups)
    }

    let result = await systemDB.Query(selSql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRbacRole({ id, roleName, excludeId }) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_roles')
    if (!_.isNil(id)) {
      sql.where('id = ?', id)
    }
    if (!_.isNil(roleName)) {
      sql.where('role_name = ?', roleName)
    }
    if (!_.isNil(excludeId)) {
      sql.where('id != ?', excludeId)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount === 1 ? result.rows[0] : null
  }

  static async getRbacRoleInfoByRole(roleName) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_roles')
      .where('role_name =?', roleName)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : []
  }

  static async createRbacRole(client, roleName) {
    let sql = squel.insert()
      .into('wiprocurement.rbac_roles')
      .set('role_name', roleName)
      .returning('id')

    let result = await client.queryWithoutRollback(sql.toParam())
    return result[0].id
  }

  static async deleteRbacRole({ ids }, client) {
    let sql = squel.delete()
      .from('wiprocurement.rbac_roles')

    if (!_.isEmpty(ids)) {
      sql.where('id in ?', ids)
    }

    if (!_.isNil(client)) {
      await client.queryWithoutRollback(sql.toParam())
    } else {
      await systemDB.Query(sql.toParam())
    }

    return 'delete success'
  }

  static async updateRbacRole({ role }, client) {
    let sql = squel.update()
      .table('wiprocurement.rbac_roles')
      .where('id = ?', role.id)
      .set('role_name', role.roleName)

    if (!_.isNil(client)) {
      await client.queryWithoutRollback(sql.toParam())
    } else {
      await systemDB.Query(sql.toParam())
    }
    return 'update success'
  }

  static async getRbacActionList() {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_actions')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRbacActionByAction(action) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_actions')
      .where('action = ?', action)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount === 1 ? result.rows[0] : null
  }

  static async createRbacAction(action, rs) {
    let sql = squel.insert()
      .into('wiprocurement.rbac_actions')
      .set('action', action)
      .set('rs', rs)

    await systemDB.Query(sql.toParam())
    return 'create success'
  }

  static async deleteRbacAction(action) {
    let sql = squel.delete()
      .from('wiprocurement.rbac_actions')
      .where('action = ?', action)

    await systemDB.Query(sql.toParam())
    return 'delete success'
  }

  static async updateRbacAction(action, rs) {
    let sql = squel.update()
      .table('rbac_actions')
      .where('action = ?', action)
      .set('rs', rs)

    await systemDB.Query(sql.toParam())
    return 'update success'
  }

  static async getRbacResourcesList(is_root) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_resources')
    if(!_.isNil(is_root)) {
      sql.where('is_root = ?', JSON.parse(is_root))
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRbacResourcesById(id) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_resources')
      .where('id = ?', id)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount === 1 ? result.rows[0] : null
  }

  static async createRbacResources(rsNode, rsPath) {
    let sql = squel.insert()
      .into('wiprocurement.rbac_resources')
      .set('rs_node', rsNode)
      .set('rs_path', rsPath)
      .returning('id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  }

  static async deleteRbacResources(id) {
    let sql = squel.delete()
      .from('wiprocurement.rbac_resources')
      .where('id = ?', id)

    await systemDB.Query(sql.toParam())
    return 'delete success'
  }

  static async updateRbacResources(id, rsNode, rsPath) {
    let sql = squel.update()
      .table('rbac_resources')
      .where('id = ?', id)

    if (!_.isEmpty(rsNode)) {
      sql.set('rs_node', rsNode)
    }
    if (!_.isEmpty(rsPath)) {
      sql.set('rs_path', rsPath)
    }

    await systemDB.Query(sql.toParam())
    return 'update success'
  }

  static async getRbacPoliciesList(rs_id) {

    let sql = squel.select()
      .field('policies.id')
      .field('policies.action')
      .field('actions.rs')
      .field('policies.rs_id')
      .field('resources.rs_node')
      .field('resources.rs_path')
      .field('policies.effect')
      .field('policies.description')
      .from('wiprocurement.rbac_policies', 'policies')
      .left_join('wiprocurement.rbac_actions', 'actions', 'actions.action = policies.action')
      .left_join('wiprocurement.rbac_resources', 'resources', 'resources.id = policies.rs_id')
      .where('resources.rs_path like (select rs_path from wiprocurement.rbac_resources where is_root = true and id = ?)||\'%\'', rs_id)
      .where('policies.is_editable = true')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPolicyRoles({ rsId, roleId, policyIds }) {
    let sql = squel.select()
      .field('rpr.*')
      .field('policies.action')
      .field('policies.effect')
      .field('policies.description')
      .field('resources.rs_path')
      .from('wiprocurement.rbac_policy_role', 'rpr')
      .left_join('wiprocurement.rbac_policies', 'policies', 'rpr.policy_id = policies.id')
      .left_join('wiprocurement.rbac_actions', 'actions', 'actions.action = policies.action')
      .left_join('wiprocurement.rbac_resources', 'resources', 'resources.id = policies.rs_id')
    if (!_.isNil(rsId)) {
      sql.where('resources.rs_path like (select rs_path from wiprocurement.rbac_resources where is_root = true and id = ?)||\'%\'', rsId)
    }
    if (!_.isNil(roleId)) {
      sql.where('rpr.role_id = ?', roleId)
    }
    if (!_.isEmpty(policyIds)) {
      sql.where('rpr.policy_id in ?', policyIds)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPolicyRole({ id, policyId, roleId }) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_policy_role')

    if (!_.isNil(id)) {
      sql.where('id = ?', id)
    }
    if (!_.isNil(policyId)) {
      sql.where('policy_id = ?', policyId)
    }
    if (!_.isNil(roleId)) {
      sql.where('role_id = ?', roleId)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  }

  static async createPolicyRole(data, client) {
    let rows = data.map(d => ({ policy_id: d.policy_id, role_id: d.role_id }))

    let sql = squel.insert()
      .into('wiprocurement.rbac_policy_role')
      .setFieldsRows(rows)

    if (!_.isNil(client)) {
      await client.queryWithoutRollback(sql.toParam())
    } else {
      await systemDB.Query(sql.toParam())
    }
    return 'create success'
  }

  static async deletePolicyRole({ id, roleIds, roleId, policies }, client) {
    let sql = squel.delete()
      .from('wiprocurement.rbac_policy_role')

    if (!_.isNil(id)) {
      sql.where('id = ?', id)
    }

    if (!_.isEmpty(roleIds)) {
      sql.where('role_id in ?', roleIds)
    }

    if (!_.isEmpty(policies)) {
      sql.where('policy_id in ?', policies)
    }

    if (!_.isNil(roleId)) {
      sql.where('role_id = ?', roleId)
    }

    if (!_.isNil(client)) {
      await client.queryWithoutRollback(sql.toParam())
    } else {
      await systemDB.Query(sql.toParam())
    }

    return 'delete success'
  }

  static async getRbacPolicies(id) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.rbac_policies')
      .where('id = ?', id)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : null
  }

  static async createRbacPolicies(action, rsId, effect) {
    let sql = squel.insert()
      .into('wiprocurement.rbac_policies')
      .set('action', action)
      .set('rs_id', rsId)
      .set('effect', effect)
      .returning('id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  }

  static async deleteRbacPolicies(id) {
    let sql = squel.delete()
      .from('wiprocurement.rbac_policies')
      .where('id = ?', id)

    await systemDB.Query(sql.toParam())
    return 'delete success'
  }

  static async updateRbacPolicies(id, action, rsId) {
    let sql = squel.update()
      .table('rbac_policies')
      .where('id = ?', id)

    if (!_.isEmpty(action)) {
      sql.set('action', action)
    }
    if (rsId != 'undefined' || rsId != null) {
      sql.set('rs_id', rsId)
    }

    await systemDB.Query(sql.toParam())
    return 'update success'
  }

  static async insertUsertRole(info) {
    let sql = squel.insert()
      .into('wiprocurement.rbac_user_role')
      .setFields(info)
      .returning('id')
    let result = await systemDB.Query(sql.toParam())
    logger.warn(` insert  ${result.rowCount} user role`)
  }

  static async getUserRoles({ roleIds, roleId }) {
    let sql = squel.select()
      .field('rur.*')
      .from('wiprocurement.rbac_user_role', 'rur')

    if (!_.isEmpty(roleIds)) {
      sql.where('role_id in ?', roleIds )
    }

    if (!_.isNil(roleId)) {
      sql.where('role_id = ?', roleId)
    }

    let result = await systemDB.Query(sql.toParam())

    return result.rowCount > 0 ? result.rows : []
  }

  static async getRbacPermissionByRole(role) {
    let sql = squel.select()
      .field('actions.action')
      .field('policies.effect')
      .field('resources.rs_path')
      .field('resources.rs_node')
      .from('wiprocurement.rbac_roles', 'roles')
      .join('wiprocurement.rbac_policy_role', 'policyRoles', 'policyRoles.role_id = roles.id')
      .join('wiprocurement.rbac_policies', 'policies', 'policies.id = policyRoles.policy_id')
      .join('wiprocurement.rbac_actions', 'actions', 'actions.action = policies.action')
      .join('wiprocurement.rbac_resources', 'resources', 'resources.id = policies.rs_id')
      .where('roles.role_name = ?', role)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}
module.exports = RBAC
