const commomParameterService = require('../../service/database/commomParameter.js')
const siteService = require('../../service/database/site.js')
const productTypeService = require('../../service/database/productType.js')
const commonService = require('../../service/database/common.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Common')

class Common {
  async getCommonParameter(ctx) {
    let commonParameter = await commomParameterService.getCommonParameter()
    ctx.body = commonParameter
    ctx.status = 200
  }
  async getSite(ctx) {
    let site = await siteService.getSite()
    ctx.body =  site
    ctx.status = 200
  }
  async getProductType(ctx) {
    let productType = await productTypeService.getProductType()
    ctx.body =  productType
    ctx.status = 200
  }
  async getProductTypeByformulaType(ctx) {
    let { formulaType } = ctx.request.query
    let productType = await productTypeService.getProductTypeByformulaType(formulaType)

    ctx.body =  productType
    ctx.status = 200
  }

  async putCommonParameter(ctx) {
    try {
      let { nextId, items } = ctx.request.body

      let result = await commomParameterService.modifyCommonParameter(nextId, items)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Common putCommonParameter function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putCommonPrice(ctx) {
    try {
      let { nextId, items } = ctx.request.body

      let result = await commonService.modifyCommonPrice(nextId, items)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Common putCommonPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putProductType(ctx) {
    try {
      let { productTypeList } = ctx.request.body

      let result = await productTypeService.modifyProductType(productTypeList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Common putProductType function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putSite(ctx) {
    try {
      let { siteList } = ctx.request.body

      let result = await siteService.modifySite(siteList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Common putSite function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async scheduleNew(ctx) {

    let { formulaType, nextDate, productTypeId = 1 } = ctx.request.body
    await commonService.scheduleNewByFormulaType(formulaType, nextDate, productTypeId)

    // metal 沖壓 以及 plastic 的 材料 成型 塗料噴漆 不須依造product type區分 所以是使用另外的schedule id
    if(formulaType == 'housing_metal' || formulaType == 'housing_plastic') {
      await commonService.scheduleNewByFormulaType(formulaType, nextDate, null)
    }

    ctx.status = 200
  }

  async getNextDate(ctx) {
    let { formulaType, productTypeId = 1 } = ctx.query

    let result = await commonService.getNextDate(formulaType, productTypeId)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = Common
