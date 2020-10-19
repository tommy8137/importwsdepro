const settingService = require('../../service/setting/setting.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')
class EeAssignment {
  async getEeAssignmentList(ctx) {
    const { userID } = ctx.request.user
    let result
    let res = await rbacService.getPolicyByUser(userID, {
      action:'List',
    })
    if(res){
      if(res.List && res.List.allow && res.List.allow.indexOf('setting.ee') > -1 || res.List.allow.indexOf('setting.me') > -1){
        result = await settingService.getEeAssignmentList(userID)
      }else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    }else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }

    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async assign(ctx) {
    let { type1, pic, pic_emplid, proxy, proxy_emplid } = ctx.request.body
    let { userID } = ctx.request.user
    let result
    let res = await rbacService.getPolicyByUser(userID)
    if(res){
      if(res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.ee') > -1) {
        result = await settingService.assign(type1, pic, pic_emplid, proxy, proxy_emplid)
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }
    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async searchUser(ctx){
    let { userID } = ctx.request.user
    let { keyword } = ctx.query
    if( typeof keyword == 'undefined') {
      keyword = ''
    }
    let permissionRes = await rbacService.getPolicyByUser(userID, {
      action: 'EditAll',
      resource: 'setting.ee'
    })
    if(_.isEmpty(permissionRes)) throwApiError('permission denied', errorCode.ERRORFORMAT)
    const result  = await settingService.searchUser(keyword)
    ctx.body = result
    ctx.status = 200
  }
  async fetchProductType(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      }
      const result = await settingService.fetchProductType(userID, query.role)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      throwApiError(err.message, err.status)
    }
  }

  async fetchTypeI(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      // let { productType } = ctx.query
      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      }
      const result = await settingService.fetchTypeI(userID, query.role)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      throwApiError(err.message, err.status)
    }
  }

  async fetchTypeII(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      let { type1 } = ctx.query
      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!type1) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }
      const result = await settingService.fetchTypeII(userID, query.role, type1)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      throwApiError(err.message, err.status)
    }
  }

  async fetchSpec01(ctx) {
    try {
      let { userID } = ctx.request.user
      let { type1, type2 } = ctx.query
      if (!type1 || !type2) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }
      const result = await settingService.fetchSpec01(userID, type1, type2)
      ctx.body = result
      ctx.status  = 200
    } catch (err) {
      throwApiError(err.message, err.status)
    }
  }

  async getMeSpecTitle(ctx) {
    const { userID } = ctx.request.user
    const { spec1, type1, type2 } = ctx.query
    let result
    let res = await rbacService.getPolicyByUser(userID, {
      action:'List',
    })
    if(res){
      if(res.List && res.List.allow && res.List.allow.indexOf('setting.ee') > -1 || res.List.allow.indexOf('setting.me') > -1){
        result = await settingService.getMeSpecTitle(userID, spec1, type1, type2)
      }else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    }else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }
    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }

  async updateMeSpecTitle(ctx) {
    const { username, userID } = ctx.request.user
    const { spec1, type1, type2, spec_no, title } = ctx.request.body
    let result
    let res = await rbacService.getPolicyByUser(userID)
    if(res){
      if(res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.me') > -1) {
        if(!spec1 || !type1 || !type2 || !spec_no || !title || parseInt(spec_no) <= 0 || parseInt(spec_no) > 30 ){
          throwApiError('body parse error', errorCode.UNPROCESSABLE)
          return
        }
        result = await settingService.updateMeSpecTitle(spec1, type1, type2, spec_no, title, username)
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }

    if(!_.isEmpty(result)){
      ctx.body = result
      ctx.status = 200
    }else{
      throwApiError('No Data', errorCode.DATANOTFOUND)
      return
    }
  }
}
function checkRole(role) {
  if (!role || (role.toUpperCase() != 'ME' && role.toUpperCase() != 'EE')) {
    return false
  } else {
    return true
  }
}

module.exports = EeAssignment
