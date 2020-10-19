const monitorService = require('../../service/admin/monitor.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Monitor {
  async info(ctx) {
    let response = { db_is_live: true, msg:'service  ok' }
    let result
    try{
      result  = await monitorService.info()
    } catch(e) {
      response.db_is_live = false
      response.msg = e
    }
    ctx.body = response
    ctx.status = 200
  }
}
module.exports = Monitor
