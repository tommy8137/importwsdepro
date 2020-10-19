const https = require('https')
const axios = require('axios')
const config = require('../../../config.js')
const { throwApiError } = require('../../helpers/errorCode/apiErrorHelper.js')
const DB_SYNC_BASE_URI = `http://${config.dbSyncConfig.dbsyncIp}:${config.dbSyncConfig.dbsyncPort}`

class Request {
  static async _request(url, body, headers = {}, isHttps = false){
    let agent = null
    if(isHttps){
      agent = {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
      if(Object.keys(headers).length > 0) {
        agent['headers'] = headers
      }
    }
    try {
      const res = await axios.post(url, body, agent)
      return res
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        let errMsg = error.response.data.hasOwnProperty('errorMsg') ? error.response.data.errorMsg : error.response.data
        throwApiError(errMsg, error.response.status )
      } else {
        throw new Error(error)
      }
    }
  }
  static async requestToDbSync(route, body){
    const url = `${DB_SYNC_BASE_URI}${route}`
    try {
      await this._request(url, body)
    } catch (error) {
      throw error
    }
  }
  static async requestToEmdm(route, body, headers = {}) {
    let url = `${config.emdmServerConfig.emdmServerProtocol}://${config.emdmServerConfig.emdmServerIp}:${config.emdmServerConfig.emdmServerPort}/${route}`

    try {
      if(config.emdmServerConfig.enableEmdmImage) {
        return await this._request(url, body, headers, true)
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = Request
