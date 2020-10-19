const loginModel = require('../../model/admin/login.js')
const authHelper = require('../../helpers/authHelper')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Logout {
  static async logout(userId, token){
    return await loginModel.deleteToken(userId, token)
  }
}
module.exports = Logout