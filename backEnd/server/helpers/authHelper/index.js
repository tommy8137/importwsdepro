const jwt = require('jsonwebtoken')
const { tokenSecret, expiresTime } = require('../../../config')
const { throwApiError, errorCode } = require('../errorCode/apiErrorHelper.js')
const { sqlInjection } = require('../../../server/middlewares/sqlInjection.js')
const loginModel = require('../../../server/model/admin/login.js')
const moment = require('moment')

class authHelper {
  static jwtVerify(token) {
    let decoded = { verified: false }
    try {
      const options = {}
      decoded = Object.assign(jwt.verify(token, tokenSecret, options), { verified: true })
    } catch(err) {
      decoded.err = err
    }
    return decoded
  }

  static signToken(username, userID, roleType) {
    let  { isAdmin } = roleType
    const jwtObject = {
      username,
      userID,
      isAdmin: isAdmin,
      loginTime: Date.now(),
    }
    let access_token = jwt.sign(jwtObject, tokenSecret, { expiresIn: `${expiresTime} s` })
    return {
      access_token,
    }
  }

  /**
   * JWT Required middleware.
   */
  async isJWTAuthenticated(ctx, next){
    let { request: req } = ctx
    let token = null
    const rule = /^[bB]earer\s(.+)$/
    if (!rule.test(req.get('Authorization'))) {
      throwApiError('Unauthorized', errorCode.UNAUTHORIZED)
    }
    token = rule.exec(req.get('Authorization'))[1]
    let user = authHelper.jwtVerify(token)
    if (!user.verified) {
      throwApiError('Unauthorized', errorCode.UNAUTHORIZED)
    }else{
      // if is logout method do not check expire time
      if(ctx.request.url.indexOf('logout') == -1){
        let checkRes = await authHelper.checkTokenExpire(user.userID, token)
        if(!checkRes){
          throwApiError('authorized expire', errorCode.UNAUTHORIZED)
        }else{
          await loginModel.updateTokenTime(user.userID, token)
        }
      }
    }
    user.token = token
    ctx.request.user = user
    await next()
  }

  static async checkTokenExpire(userId, token){
    let res = await loginModel.getTokeExpireTime(userId, token)
    if(res && res.expire_time){
      let nowTime = moment().utc().format('YYYY-MM-DD HH:mm:ss')
      let isExpire = moment(nowTime).isAfter(res.expire_time)
      if(isExpire){
        await loginModel.deleteToken(userId, token)
        return false
      }
      return true
    }
    return false
  }

  static async insertTokenExpire(userId, token){
    return await loginModel.insertToken(userId, token)
  }

  static async insertTokenExpireForTestUse(userId, token){
    return await loginModel.insertTokenForTest(userId, token)
  }

  static async deleteToken(userId, token){
    return await loginModel.deleteToken(userId, token)
  }

  async xrayPermission(ctx, next) {
    let { request: req } = ctx

    if (!req.user.isCe && !req.user.isSourcer && !req.user.isAdmin) {
      throwApiError('Unauthorized', errorCode.UNAUTHORIZED)
    }
    await next()
  }
}

module.exports = authHelper
