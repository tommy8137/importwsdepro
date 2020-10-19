const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('rbacService')
const rbacModel = require('../../model/admin/rbac.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { ROLE_GROUP_COMMA } = require('../../utils/const')

class RBACService {

  static async getPolicyByUser(userID, query = {}){
    let result = await rbacModel.getPoliciesByUser(userID, query);
    let permission = {};
    result.forEach(function(item){
      if(permission.hasOwnProperty(item.action)){
        if(item.effect){
          permission[item.action].allow.push(item.rs_path);
        } else{
          permission[item.action].deny.push(item.rs_path);
        }
      } else {
        if(item.effect){
          permission = { ...permission, [item.action]:{ allow : [item.rs_path], deny : [] }};
        } else{
          permission = { ...permission, [item.action]:{ allow : [], deny : [item.rs_path] }};
        }
      }
    });
    return permission;
  }

  static async getRbacRoleList(orderBy, roleGroup) {
    let groups = _.isEmpty(roleGroup) ? null : roleGroup.split(',')
    const roles = await rbacModel.getRbacRoleList(orderBy, groups)
    const result = []

    roles.forEach(role => {
      let roleResult = result.find(r => r.role_group === role.role_group)
      if (typeof roleResult === 'undefined') {
        result.push({
          role_group: role.role_group,
          roles: (role.role_name !== '' ? [role] : []),
        })
      } else {
        if (role.role_name !== '') {
          roleResult.roles.push(role)
        }
      }
    })
    return result
  }

  static async createRbacRole(roleName, groupName, refRoleId) {
    let client = await new tsystemDB()
    try {
      let name = groupName + ROLE_GROUP_COMMA + roleName
      let role = await rbacModel.getRbacRole({ roleName: name })

      if (role) {
        throwApiError('role name is already exist', errorCode.INSERT_DUPLICATE)
      }

      let result = await rbacModel.createRbacRole(client, name)

      if(!_.isNil(refRoleId)) {
        let refRole = await rbacModel.getRbacRole({ id: refRoleId })
        if (!refRole) {
          throwApiError('ref role not exist', errorCode.INSERT_DUPLICATE)
        }
        let policyRoles = await rbacModel.getPolicyRoles({ roleId: refRoleId })
        if (!_.isEmpty(policyRoles)) {
          policyRoles.forEach(e => {
            e.role_id = result
          })
          await rbacModel.createPolicyRole(policyRoles, client)
        }
      }

      await client.commit()
      return 'create success'
    } catch (e) {
      await client.rollback()
      logger.error('createRbacRole error', e)
      throw e
    }
  }

  static async deleteRbacRole(roleId) {
    let client = await new tsystemDB()
    try {
      let roleIds = roleId.split(',').map(v => Number(v))

      let inUseUserRole = await rbacModel.getUserRoles({ roleIds })
      if (inUseUserRole.length > 0) {
        throwApiError('E00001', errorCode.INSERT_DUPLICATE)
      }

      for (const id of roleIds) {
        let role = await rbacModel.getRbacRole({ id })
        if (_.isNil(role)) {
          throwApiError('role not exist', errorCode.INSERT_DUPLICATE)
        }
        if (!role.is_editable) {
          throwApiError('role is default cant delete', errorCode.INSERT_DUPLICATE)
        }
      }

      await rbacModel.deletePolicyRole({ roleIds }, client)
      let result = await rbacModel.deleteRbacRole({ ids: roleIds }, client)

      await client.commit()
      return result
    } catch (e) {
      await client.rollback()
      logger.error('deleteRbacRole error', e)
      throw e
    }
  }

  static async updateRbacRole(data) {
    let client = await new tsystemDB()

    try {
      for (const d of data) {
        let id = d.roleId
        let roleName = d.groupName + ROLE_GROUP_COMMA + d.roleName

        let role = await rbacModel.getRbacRole({ id })
        if (_.isNil(role)) {
          throwApiError('role not exist', errorCode.INSERT_DUPLICATE)
        }

        if (!role.is_editable) {
          throwApiError('role is default cant update', errorCode.INSERT_DUPLICATE)
        }

        let dupRole = await rbacModel.getRbacRole({ roleName, excludeId: id })
        if (!_.isNil(dupRole)) {
          throwApiError('role name already use', errorCode.INSERT_DUPLICATE)
        }

        await rbacModel.updateRbacRole({
          role: {
            id,
            roleName,
          },
        }, client)
      }
      await client.commit()
      return 'update success'
    } catch (e) {
      await client.rollback()
      logger.error('updateRbacRole error', e)
      throw e
    }
  }

  static async getRbacActionList() {
    let result = await rbacModel.getRbacActionList()
    return { 'RbacActionList': result }
  }

  static async createRbacAction(action, rs) {
    try {
      let result = await rbacModel.createRbacAction(action, rs)
      return result
    } catch (err) {
      throwApiError('action is already exist', errorCode.INSERT_DUPLICATE)
    }
  }

  static async deleteRbacAction(action) {
    let result = await rbacModel.deleteRbacAction(action)
    return result
  }

  static async updateRbacAction(action, rs) {
    let result = await rbacModel.updateRbacAction(action, rs)
    return result
  }

  static async getRbacResourcesList(is_root) {
    let result = await rbacModel.getRbacResourcesList(is_root)
    return result
  }

  static async createRbacResources(rsNode, rsPath) {
    try {
      let result = await rbacModel.createRbacResources(rsNode, rsPath)
      return result
    } catch (err) {
      throwApiError('path is already exist', errorCode.INSERT_DUPLICATE)
    }
  }

  static async deleteRbacResources(id) {
    let result = await rbacModel.deleteRbacResources(id)
    return result
  }

  static async updateRbacResources(id, rsNode, rsPath) {
    try {
      let result = await rbacModel.updateRbacResources(id, rsNode, rsPath)
      return result
    } catch (err) {
      throwApiError('path is already exist', errorCode.INSERT_DUPLICATE)
    }
  }

  static async getRbacPoliciesList(rs_id) {
    let result = await rbacModel.getRbacPoliciesList(rs_id)
    return result
  }

  static async createRbacPolicies(action, rsId, effect) {
    let rbacAction = await rbacModel.getRbacActionByAction(action)
    let rbacResources = await rbacModel.getRbacResourcesById(rsId)
    if (rbacAction == null || rbacResources == null) {
      throwApiError('action or rsId is not exist', errorCode.INSERT_DUPLICATE)
    }

    try {
      let result = await rbacModel.createRbacPolicies(action, rsId, effect)
      return result
    } catch (err) {
      throwApiError('create failed', errorCode.INSERT_DUPLICATE)
    }
  }

  static async deleteRbacPolicies(id) {
    let result = await rbacModel.deleteRbacPolicies(id)
    return result
  }

  static async updateRbacPolicies(id, action, rsId) {
    let rbacAction = await rbacModel.getRbacActionByAction(action)
    let rbacResources = await rbacModel.getRbacResourcesById(rsId)
    if (rbacAction == null || rbacResources == null) {
      throwApiError('action or rsId is not exist', errorCode.INSERT_DUPLICATE)
    }

    try {
      let result = await rbacModel.updateRbacPolicies(id, action, rsId)
      return result
    } catch (err) {
      throwApiError('update failed', errorCode.updateFailed)
    }
  }

  static async getPolicyRoles(rs_id) {
    let data = await rbacModel.getPolicyRoles({ rsId: rs_id })

    let result = _.groupBy(data, 'policy_id')
    return result
  }

  static async createPolicyRole(policyId, roleId) {
    let policy = await rbacModel.getRbacPolicies(policyId)
    let role = await rbacModel.getRbacRole({ id: roleId })

    if (!policy || !role) {
      throwApiError('policy or role is not exist', errorCode.INSERT_DUPLICATE)
    }

    let policyRole = await rbacModel.getPolicyRole({ policyId, roleId })
    if (policyRole) {
      throwApiError('policy role already exist', errorCode.INSERT_DUPLICATE)
    }

    let result = await rbacModel.createPolicyRole([{ policy_id: policyId, role_id: roleId }])
    return result
  }

  static async updatePolicyRole(data) {
    let client = await new tsystemDB()
    try {
      for (const d of data) {
        let role = await rbacModel.getRbacRole({ id: d.roleId })
        if (_.isNil(role)) {
          throwApiError('role not exist', errorCode.INSERT_DUPLICATE)
        }

        if (!_.isEmpty(d.add)) {
          let currentPolicyRoles = await rbacModel.getPolicyRoles({ policyIds: d.add, roleId: role.id })
          if (!_.isEmpty(currentPolicyRoles)) {
            throwApiError('role already create', errorCode.INSERT_DUPLICATE)
          }
          await rbacModel.createPolicyRole(d.add.map(policyId => ({ policy_id: policyId, role_id: role.id })), client)
        }

        if (!_.isEmpty(d.remove)) {
          await rbacModel.deletePolicyRole({ roleId: role.id, policies: d.remove }, client)
        }
      }

      await client.commit()
      return 'udpate success'
    } catch (e) {
      await client.rollback()
      logger.error('updatePolicyRole error', e)
      throw e
    }
  }

  static async deletePolicyRole(id) {
    if (!id) {
      throwApiError('policy or role is not exist', errorCode.INSERT_DUPLICATE)
    }

    let policyRole = await rbacModel.getPolicyRole({ id })
    if (!policyRole) {
      throwApiError('policy role not exist', errorCode.INSERT_DUPLICATE)
    }

    return rbacModel.deletePolicyRole({ id })
  }

  static async getRoleGroupFilterType() {
    let result = []
    let list = await rbacModel.getRbacRoleGroup()
    result = list.map(role => role.role_group)
    return result
  }

  static async getRoleNameFilterType(group) {
    let result = []
    if(group == 'contactwindow') {
      return result
    }
    let list = await rbacModel.getRbacRoleList(null, [group])
    result = list.map(role => role.role_name)
    return result
  }

  static async getRbacPermissions(group, name) {
    let role = group + ROLE_GROUP_COMMA + name
    let result = await rbacModel.getRbacPermissionByRole(role)
    let permission = {}
    result.forEach(function(item){
      if(permission.hasOwnProperty(item.action)){
        if(item.effect){
          permission[item.action].allow.push(item.rs_path)
        } else{
          permission[item.action].deny.push(item.rs_path)
        }
      } else {
        if(item.effect){
          permission = { ...permission, [item.action]:{ allow : [item.rs_path], deny : [] }}
        } else{
          permission = { ...permission, [item.action]:{ allow : [], deny : [item.rs_path] }}
        }
      }
    })
    return permission
  }
}

module.exports = RBACService
