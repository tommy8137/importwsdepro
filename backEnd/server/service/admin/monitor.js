const monitorModel = require('../../model/admin/monitor.js')
const authHelper = require('../../helpers/authHelper')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Monitor {
  static async info(){
    return await monitorModel.info()
  }
}
module.exports = Monitor
