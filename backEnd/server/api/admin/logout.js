const logoutService = require('../../service/admin/logout.js')

class Logout {
  async logout(ctx) {
    let userId = ctx.request.user.userID
    let token = ctx.request.user.token
    await logoutService.logout(userId, token)
    ctx.type = 'application/json'
    // ctx.body = JSON.stringify({ 'msg': 'log out successfully' })
    ctx.body = 'log out successfully'
    ctx.status = 200
  }
}
module.exports = Logout
