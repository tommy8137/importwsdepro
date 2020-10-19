let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class siteModel {
  static async getSite() {
    let sql = squel.select()
      .field('id')
      .field('site_name')
      .field('remark')
      .from('formula.site')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = siteModel
