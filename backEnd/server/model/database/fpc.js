const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('./common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable FPC model')

class CableFPC {
  static async fetchFpcParameter() {
    let res = await generalSQL.Common.fetchParameterByType('cable_fpc')
    return res
  }
}

module.exports = CableFPC
