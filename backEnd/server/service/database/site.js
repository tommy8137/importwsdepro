const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../admin/rbac.js')
const siteModel = require('../../model/database/site.js')
const _ = require('lodash')
const commonModel = require('../../model/database/common.js').Common
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database site Service')

class site {
  static async getSite() {
    let result = await siteModel.getSite()
    let sites = {
      siteList: result
    }
    return sites
  }

  static async modifySite(items) {
    try {
      let client = await new tsystemDB()
      let results = await commonModel.modifyStringById(client, items, 'site', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySite function', err)
      throw err
    }
  }
}
module.exports = site
