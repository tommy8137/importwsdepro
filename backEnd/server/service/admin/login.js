const loginModel = require('../../model/admin/login.js')
const rbacModel = require('../../model/admin/rbac.js')
const { expiresTime, loginFailedLockTimes, loginFailedMinutes } = require('../../../config')
const authHelper = require('../../helpers/authHelper')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const moment = require('moment-timezone')
const { adminPW } = require('../../../config')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('login')
const resetFailCount = 0
const getDiffMintues = (fail_login_time) => {
  let now_time = new Date().toUTCString()
  let fail_time = new Date(fail_login_time).toUTCString()
  let millseconds = new Date(now_time).getTime() - new Date(fail_time).getTime()
  let diff_minutes = (Math.floor(millseconds / (1000 * 60)))
  return diff_minutes
}
class Login {
  static async login(userID, pw, isBack) {
    // assign role
    let loginInfos = await loginModel.getLoginInfo(userID)
    let { login_fail_count, login_time } = loginInfos
    let username = loginInfos.name_a

    if (!loginInfos) {
      logger.debug(`It is not allowed to login without the permission of administrator, userID: ${userID}`)
      throwApiError('AUTH FAILED', errorCode.AUTH_WRONG)
    }

    // lock account
    const diff_minutes = getDiffMintues(login_time)
    if ((login_fail_count >= loginFailedLockTimes) && (diff_minutes <= loginFailedMinutes)) {
      logger.debug(`Error Password Over Three Times, userID: ${userID}`)
      throwApiError('Error Password Over Three Times', errorCode.AUTH_WRONG)
    }
    // call HR  get domain
    try {
      if (userID == '10700001') {
        if (pw != adminPW) {
          throw 'login error'
        }
      } else if (!isBack) {
        await loginModel.login(userID, pw)
      }
      await loginModel.updateLoginInfo(resetFailCount, moment().utc(), userID)
    } catch (e) {
      await loginModel.updateLoginInfo(login_fail_count + 1, moment().utc(), userID)
      logger.debug(`Account or Password is not correct, userID: ${userID}`)
      throwApiError('Account or Password is not correct', errorCode.AUTH_WRONG)
    }
    // sign token
    let roleType = {
      isAdmin: loginInfos.is_superuser,
    }

    let { access_token } = await authHelper.signToken(username, userID, roleType)


    // delete log accesstoken expire_time smaller then now by user id
    await loginModel.deleteTokeByTime(userID)
    // log accessToken into table
    await loginModel.insertToken(userID, access_token)

    return {
      username,
      access_token,
      'token_type': 'bearer',
      'expires_in': expiresTime,
      'userid': loginInfos.emplid,
    }
  }
}

module.exports = Login
