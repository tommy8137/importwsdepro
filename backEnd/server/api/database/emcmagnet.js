const emcmagnetService = require('../../service/database/emcmagnet.js')
const commonService = require('../../service/database/common.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Emc Magnet')

class EmcMagnet {
  // -- Emc Magnet Parameters --
  async getEmcMagnetParameter(ctx) {
    try {
      let result = await emcmagnetService.fetchEmcMagnetParameter()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Emc Magnet getEmcMagnetParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Emc Magnet Material Price --
  async getEmcMagnetMaterialPrice(ctx) {
    try {

      const result = await emcmagnetService.fetchEmcMagnetMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Emc Magnet getEmcMagnetMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 裁切邊料耗損率 --
  async getCutLossRate(ctx){
    try {
      const result = await emcmagnetService.fetchCutLossRate()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Emc Magnet getCutLossRate function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putCutLossRate(ctx){
    try {
      let { nextId, items } = ctx.request.body
      let result = await emcmagnetService.modifyCutLossRate(nextId, items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database putCutLossRate function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // -- (充磁費+人工費) 價目表 --
  async getManPowerPrice(ctx){
    try {
      const result = await emcmagnetService.fetchManPowerPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Emc Magnet getManPowerPrice function', err)
      throwApiError(err.message, err.status)
    }
  }


}

module.exports = EmcMagnet
