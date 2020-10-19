const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../admin/rbac.js')
const commonParameterModel = require('../../model/database/commonParameter.js')
const databaseUtils = require('../../utils/database/databaseUtils.js')
const _ = require('lodash')
const commonModel = require('../../model/database/common.js').Common
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Common Parameter Service')

class commonParameter {
  static async getCommonParameter() {
    let results = await commonParameterModel.getCommonParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let commonParameterList = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data, key) => {
        let value = databaseUtils.getValueByDateFormat(data, 'value', 'activate_date')
        if(data[0].unit == '%') {
          value = databaseUtils.getPercentValues(value)
        }
        commonParameterList.push({
          id: key,
          item: data[0].name,
          unit: data[0].unit,
          ...value,
        })
      })
      .value()

    return {
      date: dateFormat,
      commonParameterList
    }
  }

  static async modifyCommonParameter(nextId, items) {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      let results = await commonModel.modifyCommonParameterPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyCommonParameter function', err)
      throw err
    }
  }
}
module.exports = commonParameter
