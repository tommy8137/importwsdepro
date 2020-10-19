const thermalGraphiteService = require('../../service/database/thermalgraphite.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database ThermalGraphite API')

class ThermalGraphite {
  async getThicknessPrice(ctx) {
    try {
      let result = await thermalGraphiteService.fetchThicknessPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database ThermalGraphite fetchThicknessPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getGluePrice(ctx) {
    try {
      let result = await thermalGraphiteService.fetchGluePrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database ThermalGraphite fetchGluePrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  
  async getPetPrice(ctx) {
    try {
      let result = await thermalGraphiteService.fetchPetPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database ThermalGraphite fetchPetPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getProcessPrice(ctx) {
    try {
      let result = await thermalGraphiteService.fetchProcessPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database ThermalGraphite fetchProcessPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = ThermalGraphite
