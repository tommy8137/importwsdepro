// const { systemDB } = require('../../helpers/database')
const ActiveDirectory = require('activedirectory')
const { errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { wistronAD, tokenExpiresConfig, ADConfig } = require('../../../config.js')
const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')

class Login {
  static async dbVer() {
    let res = await systemDB.Query('SELECT version()')
    return res
  }
  static async login(userID, password) {
    const userinfo = await this.getUserInfo(userID)
    if (!userinfo) {
      reject({ message: 'Account or Password is not correct', code: errorCode.AUTH_WRONG })
    }
    
    let ldapIP = ADConfig[`${userinfo.location}`] != null ? ADConfig[`${userinfo.location}`] : ADConfig['WHC']
    let domain = await this.getDomain(userinfo.location)
    
    const ad = new ActiveDirectory({ url: `ldaps://`+ldapIP+``, baseDN: 'DC='+userinfo.location+',DC=wistron', tlsOptions: {
          rejectUnauthorized: false
      }
   })
    return await new Promise((resolve, reject) => {
      //return ad.authenticate(username, password, function (err, auth) {
        return ad.authenticate(domain + '\\' + userID, password, function (err, auth) {
        if (err || !auth) {
          reject({ message: 'Account or Password is not correct', code: errorCode.AUTH_WRONG })
        }
        resolve(JSON.stringify({ result: 'ok' }))
      })
    })
  }

  static async getUserInfo(userID) {
    const res = await systemDB.Query('SELECT emplid, deptid, name_a, email_address_a, supervisor_id, phone_a, location FROM wiprocurement.ps_ee_prcrmnt_vw_a WHERE emplid = $1', [userID])
    return res.rowCount !== 1 ? false : res.rows[0]
  }

  static async getDomain(location) {
    let domain = 'WHQ'
    switch (location) {
      case 'WHC':
        domain = 'WHQ'
        break
      case 'WIH':
          domain = 'WIH'
          break
      case 'WKS':
          domain = 'WKSCN'
          break
      case 'WCD':
          domain = 'WKSCN'
          break
      case 'WCQ':
          domain = 'WKSCN'
          break
      case 'WTZ':
          domain = 'WKSCN'
          break
      case 'WZS':
          domain = 'WZS'
          break
      case 'WMX':
          domain = 'WMX'
          break
      case 'WCZ':
          domain = 'WCZ'
          break
      case 'WPH':
          domain = 'WPH'
          break
      default:
          break
      }
    return domain
  }

  static async initUser(user) {
    console.log(user)
    const { emplid, name_a, email_address_a, supervisor_id, ee, me, ce, deptid, phone_a, sourcer } = user
    const result = await systemDB.Query('SELECT deptid, is_superuser,DEPTID, phone FROM wiprocurement.user WHERE emplid = $1 AND deptid =$2 ', [emplid, deptid])
    if (result.rowCount === 0) {
      await systemDB.Query('DELETE FROM wiprocurement.user WHERE emplid = $1', [emplid])
    }
    try {
      const result = await systemDB.Query(`INSERT INTO wiprocurement.user(emplid, name_a, email_address, supervisor_id, deptid ,insdate, login_time, phone)
       values($1 ,$2 ,$3 ,$4 ,$5, NOW(), NOW(), $6) returning  is_superuser`, [emplid, name_a, email_address_a, supervisor_id, deptid, phone_a])
      return result.rows[0]
    } catch (e) {
      console.log(e)
    }
  }

  static async getLoginInfo(emplid) {
    const res = await systemDB.Query('SELECT * FROM wiprocurement.user WHERE emplid = $1 ', [emplid])
    const result = res.rowCount !== 1 ? false : res.rows[0]
    return result
  }
  static async updateLoginInfo(login_fail_count, login_time, userID) {
    const res = await systemDB.Query('UPDATE wiprocurement.user SET login_fail_count = $1,login_time = $2  WHERE emplid = $3 ', [parseInt(login_fail_count), login_time, userID])
    return res
  }

  static async insertToken(userID, token) {
    let sql = squel.insert().into('user_token')
    let expire_time = this.getExpireTime()

    sql.set('token', token)
    sql.set('user_id', userID)
    sql.set('expire_time', expire_time)
    let res = await systemDB.Query(sql.toString()).then((res) => { return true }).catch((err) => { return false })
    return res
  }

  static async updateTokenTime(userID, token) {
    let sql = squel.update().table('user_token')
    sql.set('expire_time', this.getExpireTime())
    sql.where('token = ? and user_id = ?', token, userID)
    let res = await systemDB.Query(sql.toParam()).then((res) => { return true }).catch((err) => { return false })
    return res
  }

  static async deleteToken(userID, token = '') {
    let sql = squel.delete().from('user_token')
    if (userID) sql.where('user_id = ?', userID)
    if (token) sql.where('token = ?', token)
    let res = await systemDB.Query(sql.toParam()).then((res) => { return true }).catch((err) => { return false })
    return res
  }

  static async deleteTokeByTime(userID) {
    let sql = squel.delete().from('user_token')
    if (userID) sql.where('user_id = ?', userID)
    sql.where('expire_time < ?', moment().utc().format())
    let res = await systemDB.Query(sql.toParam()).then((res) => { return true }).catch((err) => { return false })
    return res
  }

  static async getTokeExpireTime(userID, token) {
    let sql = squel.select()
      .field('token', 'token')
      .field('expire_time', 'expire_time')
      .from('user_token')
      .where('token = ? and user_id = ?', token, userID)
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : {}
  }

  static getExpireTime() {
    let extractHour = tokenExpiresConfig.hour
    let extractMinutes = tokenExpiresConfig.minutes
    let extractSeconds = tokenExpiresConfig.seconds
    return moment().utc().add(extractHour, 'hours').add(extractMinutes, 'minutes').add(extractSeconds, 'seconds').format()
  }

  static setExpireTime(extraMin) {
    return moment().utc().add(extraMin, 'minutes').format()
  }

  static async insertTokenForTest(userID, token) {
    let sql = squel.insert().into('user_token')
    let expire_time = moment().utc().add(6, 'days').add(12, 'hours').format('YYYY-MM-DD HH:mm:ss')

    sql.set('token', token)
    sql.set('user_id', userID)
    sql.set('expire_time', expire_time)
    let res = await systemDB.Query(sql.toString()).then((res) => { return true }).catch((err) => { return false })
    return res
  }
}
module.exports = Login
