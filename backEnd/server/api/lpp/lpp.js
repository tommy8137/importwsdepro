const lppService = require('../../service/lpp/lpp.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')
class lpp {
  async getLppModule(ctx) {
    // const { userID } = ctx.request.user
    const req = ctx.request.body
    const result = await lppService.getLppModule(req)
    ctx.body = result
    ctx.status = 200
  }
}


module.exports = lpp
