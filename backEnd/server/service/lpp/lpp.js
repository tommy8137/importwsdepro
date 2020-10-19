const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../admin/rbac.js')
const { lppConfig } = require('../../../config.js')
const _ = require('lodash')
const http = require('http')
const Promise = require('bluebird')

class Lpp {
  static getLppModule(tmp) {
    return Promise.try(() => {
      return getLppData(tmp)
    })
  }
}

module.exports = Lpp


function getLppData(ctx) {
  return new Promise((fulfill, reject) => {
    const change = JSON.stringify(ctx)
    const option = {
      hostname: lppConfig.lppIp,
      port: lppConfig.lppPort,
      // path: '/bom/partlist/gethmMaterialPrice',
      path: '/ocpu/library/eProcurement/R/predfunc_LPP/json?digit=6',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false,
    }

    const req = http.request(option, (res) => {
      let str = ''
      res.setEncoding('utf8')
      if(res.statusCode == 201) {
        res.on('data', (chunk) => {
          str += chunk
        })
        res.on('end', () => {
          fulfill(JSON.parse(str))
        })
      }else if (res.statusCode == 400) {
        res.on('data', function(d) {
          const errorMessage = JSON.parse(d.toString())
          reject({ message: errorMessage.message, code: errorMessage.code })
        })
      } else if (res.statusCode == 408) {
        reject({ message: 'Request Timeout', code: errorCode.TIMEOUT })
      } else {
        reject({ message: 'modles/risks test err', code: errorCode.INTERNAL_ERROR })
      }
    })
    req.on('error', ex => throwApiError({ message: ex.message, code: errorCode.INTERNAL_ERROR }))
    req.write(change)
    req.end()
  })

}