const roleService = require('../../service/permissions/roleManagement.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { roleMenus } = require('../../../config.js')
const permService = require('../../service/permissions/roleManagement')

class Role {
  async getMenus(ctx) {
    ctx.body = roleMenus
    ctx.status = 200
  }

  async getType1Scope(ctx) {
    const queryRes = await permService.getType1ScopeByReq(ctx.query)
    ctx.body = queryRes
  }

  async getRoles(ctx) {
    const result = await roleService.getRoles()
    ctx.body = result
    ctx.status = 200
  }

  async createUserType1Scope(ctx) {
    const { emplid, type1_id } = ctx.request.body
    const queryRes = await permService.createUserType1Scope(emplid, type1_id)
    ctx.body = queryRes
    ctx.status = 200
  }
  async deleteUserType1Scope(ctx) {
    const { emplid, type1_id } = ctx.request.body
    const queryRes = await permService.deleteUserType1Scope(emplid, type1_id)
    ctx.body = queryRes
    ctx.status = 200
  }
  async getProductTypeScope(ctx) {
    const queryRes = await permService.getProductTypeScopeByReq(ctx.query)
    ctx.body = queryRes
  }
}
module.exports = Role
