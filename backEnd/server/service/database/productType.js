const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../admin/rbac.js')
const productTypeModel = require('../../model/database/productType.js')
const _ = require('lodash')
const commonModel = require('../../model/database/common.js').Common
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database productType Service')

class productType {
  static async getProductType() {
    let result = await productTypeModel.getProductType()
    let productTypeList = {
      productTypeList: result
    }
    return productTypeList
  }

  static async modifyProductType(items) {
    try {
      let client = await new tsystemDB()
      let results = await commonModel.modifyStringById(client, items, 'product_type', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyCommonParameter function', err)
      throw err
    }
  }

  static async getProductTypeByformulaType(type = null) {
    let result = await productTypeModel.getProductTypeByformulaType(type)

    return {
      productTypeList: result,
    }
  }
}
module.exports = productType
