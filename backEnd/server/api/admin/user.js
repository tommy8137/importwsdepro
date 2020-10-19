const userService = require('../../service/admin/user.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const authHelper = require('../../helpers/authHelper/index.js')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')

class User {
  async userList(ctx) {
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'permission.all', action: 'List' })
    if(_.isEmpty(res) || !res.List.allow.includes('permission.all')) throwApiError('PERMISSION DENIED', errorCode.FORBIDDEN)
    let { pages, items, orderBy, keyword, role_group, role_name } = ctx.query
    if(typeof pages == 'undefined' || typeof items == 'undefined' || typeof orderBy == 'undefined') {
      throwApiError('pages or items or orderBy required', errorCode.ERRORFORMAT)
    }
    if( typeof keyword == 'undefined') {
      keyword = ''
    }
    const result  = await userService.getUserByKeyword(pages, items, orderBy, keyword, role_group, role_name)
    ctx.body = result
    ctx.status = 200
  }

  async getContactWindow(ctx) {
    const result = await userService.getContactWindowList()
    ctx.body = result
    ctx.status = 200
  }

  async getUserInfo(ctx) {
    let { id } = ctx.params
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'permission.all', action: 'List' })
    if(_.isEmpty(res) || !res.List.allow.includes('permission.all')) throwApiError('PERMISSION DENIED', errorCode.FORBIDDEN)
    if(typeof id == 'undefined') {
      throwApiError('id required', errorCode.ERRORFORMAT)
    }
    const result  = await userService.getUserInfo(id)
    ctx.body = result
    ctx.status = 200
  }

  async updateUser(ctx) {
    let input = ctx.request.body
    const  { isAdmin, userID } = ctx.request.user
    const { id } = ctx.params
    input.emplid = id
    let res = await rbacService.getPolicyByUser(userID, { resource: 'permission.all', action: 'Edit' })
    if(!isAdmin && _.isEmpty(res)){
      throwApiError('PERMISSION DENIED', errorCode.FORBIDDEN)
    }
    console.log(`${ctx.request.user.userID} update user: ${id}`)
    const result  = await userService.updateUser(input)
    ctx.body = result
    ctx.status = 200
  }

  async createUser(ctx) {
    const  { isAdmin, userID } = ctx.request.user
    let userInfos = await userService.getUserInfo(userID)
    let res = await rbacService.getPolicyByUser(userID, { resource: 'permission.all', action: 'Edit' })
    let resContacWindow = await rbacService.getPolicyByUser(userID, { resource: 'permission.contact_window', action: 'Edit' })
    let result = false
    const input = ctx.request.body
    console.log(`${ctx.request.user.userID} create user: ${input.emplid}`)
    if(!userInfos.userInfo.isAdmin && _.isEmpty(res) && _.isEmpty(resContacWindow) && !isAdmin){
      throwApiError('PERMISSION DENIED', errorCode.FORBIDDEN)
    }
    if(isAdmin || !_.isEmpty(res)) {
      const result = await userService.createUser(input)
      ctx.body = result
      ctx.status = 200
    }
  }
  async deleteUser(ctx) {
    const  { isAdmin } = ctx.request.user

    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'permission.all', action: 'Edit' })
    if(!isAdmin && _.isEmpty(res) || !res.Edit.allow.includes('permission.all')) throwApiError('PERMISSION DENIED', errorCode.FORBIDDEN)
    if(ctx.params.id == ctx.request.user.userID) {
      throwApiError('Delete Wrong User', errorCode.NOTADMIN)
    }
    console.log(`${ctx.request.user.userID} delete user: ${ctx.params.id}`)
    const result  = await userService.deleteUser(ctx.params.id)
    ctx.body = result
    ctx.status = 200
  }
  async searchUser(ctx) {
    let query = ctx.request.body
    const result  = await userService.searchUser(query)
    ctx.body = result
    ctx.status = 200
  }
  /**
   * @deprecated
   * 此api目前已無使用到
   * @param {*} ctx
   */
  async getPermission(ctx) {
    let { token } = ctx.params
    const result = authHelper.jwtVerify(token)
    let response
    if(!result.verified){
      throwApiError('AUTH FAILED', errorCode.AUTH_WRONG)
    }else{
      response = {
        userID: result.userID,
        isAdmin: result.isAdmin,
        isCe: result.isCe,
        isMe: result.isMe,
        isEe: result.isEe,
        isSourcer: result.isSourcer,
        isRd: result.isRd,
        isPm: result.isPm,
        isMeTmFm: result.isMeTmFm,
        isAccount: result.isAccount,
        isContactWindow: result.isContactWindow,
      }
    }
    ctx.body = response
    ctx.status = 200
  }

  async getUserByType(ctx){
    let { type } = ctx.params
    let { keyword } = ctx.query
    // by 20190403 release plan_v0.71
    // Type define = LEADER, APPROVEBY, DESIGNEE
    // LEADER -> Role Type is PM
    // APPROVEBY -> Role Name is ME and Role Type is RD or ME TM/FM
    // DESIGNEE -> Role Name is ME and Role Type is RD

    if( typeof keyword == 'undefined') {
      keyword = ''
    }
    if(typeof type == 'undefined') {
      throwApiError('type required', errorCode.ERRORFORMAT)
    }
    const result  = await userService.getUserByType(type, keyword)
    ctx.body = result
    ctx.status = 200
  }
  async getNopUserInfo(ctx) {
    let { id } = ctx.params
    if(typeof id == 'undefined') {
      throwApiError('id required', errorCode.ERRORFORMAT)
    }
    const result  = await userService.getUserInfo(id)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = User
