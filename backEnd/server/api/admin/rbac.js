const rbacService = require('../../service/admin/rbac.js');
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Rbac')
const { ROLE_GROUP_COMMA } = require('../../utils/const')

class RBAC {
  async getPermission(ctx){
    console.log(ctx.request.query);
    let query = ctx.request.query;
    let {userID} = ctx.request.user;
    console.log(`get ${userID}'s policy:`, query);
    let result = await rbacService.getPolicyByUser(userID, query);
    ctx.body = result;
    ctx.status = 200;
  }

  async getRbacRoleList(ctx) {
    let { orderBy, roleGroup } = ctx.request.query
    let result = await rbacService.getRbacRoleList(orderBy, roleGroup)
    ctx.body = result
    ctx.status = 200
  }

  async createRbacRole(ctx) {
    let { roleName, groupName, refRole } = ctx.request.body

    if (!roleName || !groupName) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    if (roleName.includes(ROLE_GROUP_COMMA) || groupName.includes(ROLE_GROUP_COMMA)) {
      throwApiError('roleName, groupName have unavailable char', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.createRbacRole(roleName, groupName, refRole)
    ctx.body = result
    ctx.status = 200
  }

  async deleteRbacRole(ctx) {
    try {
      let roleId = ctx.params.roleId
      if (!roleId) {
        throwApiError('missing parameter', errorCode.ERRORFORMAT)
      }

      let result = await rbacService.deleteRbacRole(roleId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for deleteRbacRole', err)
      throwApiError(err.message, err.status)
    }
  }

  async updateRbacRole(ctx) {
    let data = ctx.request.body

    data.forEach(d => {
      let { roleId, groupName, roleName } = d
      if (!roleId || !groupName || !roleName) {
        throwApiError('missing parameter', errorCode.ERRORFORMAT)
      }

      if (roleName.includes(ROLE_GROUP_COMMA) || groupName.includes(ROLE_GROUP_COMMA)) {
        throwApiError('roleName, groupName have unavailable char', errorCode.ERRORFORMAT)
      }
    })

    let result = await rbacService.updateRbacRole(data)
    ctx.body = result
    ctx.status = 200
  }

  async getRbacActionList(ctx) {
    let result = await rbacService.getRbacActionList()
    ctx.body = result
    ctx.status = 200
  }

  async createRbacAction(ctx) {
    let { action, rs } = ctx.request.body

    if (!action) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.createRbacAction(action, rs)
    ctx.body = result
    ctx.status = 200
  }

  async deleteRbacAction(ctx) {
    try {
      let action = ctx.params.action
      if (!action) {
        throwApiError('missing parameter', errorCode.ERRORFORMAT)
      }

      let result = await rbacService.deleteRbacAction(action)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for deleteRbacRole', err)
      throwApiError(err.message, err.status)
    }
  }

  async updateRbacAction(ctx) {
    try {
      let action = ctx.params.action
      let { rs } = ctx.request.body
      if (!action) {
        throwApiError('missing parameter', errorCode.ERRORFORMAT)
      }

      let result = await rbacService.updateRbacAction(action, rs)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for updateRbacRole', err)
      throwApiError(err.message, err.status)
    }
  }

  async getRbacResourcesList(ctx) {
    let { is_root } = ctx.request.query
    let result = await rbacService.getRbacResourcesList(is_root)
    ctx.body = result
    ctx.status = 200
  }

  async createRbacResources(ctx) {
    let { rsNode, rsPath } = ctx.request.body

    if (!rsNode || !rsPath) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.createRbacResources(rsNode, rsPath)
    ctx.body = result
    ctx.status = 200
  }

  async deleteRbacResources(ctx) {
    let id = ctx.params.id
    if (!id) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.deleteRbacResources(id)
    ctx.body = result
    ctx.status = 200
  }

  async updateRbacResources(ctx) {
    let id = ctx.params.id
    let { rsNode, rsPath } = ctx.request.body

    if (!id || !rsNode || !rsPath) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.updateRbacResources(id, rsNode, rsPath)
    ctx.body = result
    ctx.status = 200
  }

  async getRbacPoliciesList(ctx) {
    const { rs_id } = ctx.request.query
    let result = await rbacService.getRbacPoliciesList(rs_id)
    ctx.body = result
    ctx.status = 200
  }

  async createRbacPolicies(ctx) {
    let { action, rsId, effect } = ctx.request.body

    if (!action || !rsId) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.createRbacPolicies(action, rsId, effect)
    ctx.body = result
    ctx.status = 200
  }

  async deleteRbacPolicies(ctx) {
    let id = ctx.params.id
    if (!id) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.deleteRbacPolicies(id)
    ctx.body = result
    ctx.status = 200
  }

  async updateRbacPolicies(ctx) {
    let id = ctx.params.id
    let { action, rsId, effect } = ctx.request.body

    if (!id || !action || !rsId) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    let result = await rbacService.updateRbacPolicies(id, action, rsId, effect)
    ctx.body = result
    ctx.status = 200
  }

  async getPolicyRoles(ctx) {
    let { rs_id } = ctx.request.query
    if (!rs_id) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }
    let result = await rbacService.getPolicyRoles(rs_id)
    ctx.body = result
    ctx.status = 200
  }

  async createPolicyRole(ctx) {
    let { policyId, roleId } = ctx.request.body

    if (!policyId || !roleId) {
      throwApiError('missing parameter', errorCode.ERRORFORMAT)
    }

    ctx.body = await rbacService.createPolicyRole(policyId, roleId)
    ctx.status = 200
  }

  async updatePolicyRole(ctx) {
    let data = ctx.request.body
    data.forEach(d => {
      if (!d.roleId) {
        throwApiError('missing parameter', errorCode.ERRORFORMAT)
      }
    })

    ctx.body = await rbacService.updatePolicyRole(data)
    ctx.status = 200
  }

  async deletePolicyRole(ctx) {
    let { id } = ctx.params

    ctx.body = await rbacService.deletePolicyRole(id)
    ctx.status = 200
  }

  async getRoleGroupFilterType(ctx) {
    let result = await rbacService.getRoleGroupFilterType()
    ctx.body = result
    ctx.status = 200
  }

  async getRoleNameFilterType(ctx) {
    let group = ctx.params.group

    let result = await rbacService.getRoleNameFilterType(group)
    ctx.body = result
    ctx.status = 200
  }

  async getRbacPermissions(ctx) {
    let { group, name } = ctx.request.query
    let result = await rbacService.getRbacPermissions(group, name)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = RBAC
