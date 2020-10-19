const loginService = require('../../service/admin/login.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Login {
  async login(ctx) {
    const { request: req } = ctx
    let { body: { username: id, password: pw } } = req
    if (!id || !pw) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
    }
    const result  = await loginService.login(id, pw, false)
    ctx.body = result
    ctx.status = 200
  }
  async bcakLogin(ctx) {
    const { request: req } = ctx
    let { body: { username: id, password: pw } } = req
    if (!id ) {
      throwApiError('body parse error', errorCode.UNPROCESSABLE)
    }
    const result  = await loginService.login(id, pw, true)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = Login
