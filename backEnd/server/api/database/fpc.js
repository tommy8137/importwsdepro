const fpcService = require('../../service/database/fpc.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Cable FPC')

class CableFPC {
  // -- Cable FPC Parameters --
  async getFpcParameter(ctx) {
    try {
      let result = await fpcService.fetchFpcParameter()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FPC getFpcParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable FPC 材料單價Price m2 價目表 --
  async getFpcMaterialUnitPrice(ctx) {
    try {
      let result = await fpcService.fetchFpcMaterialUnitPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFpcMaterialUnitPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putMaterialUnitPrice(ctx) {
    try {
      let { nextId, items } = ctx.request.body
      let result = await fpcService.modifyMaterialUnitPrice(nextId, items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC putMaterialUnitPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable FPC Shielding 價目表 --
  async getFpcShieldingPrice(ctx) {
    try {
      let result = await fpcService.fetchFpcShieldingPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFpcShieldingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putShieldingPrice(ctx) {
    try {
      let { nextId, items } = ctx.request.body
      let result = await fpcService.modifyShieldingPrice(nextId, items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC putShieldingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = CableFPC
