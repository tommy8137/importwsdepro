const thermalService = require('../../service/database/thermal.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Thermal')

class Thermal {
  async getFanBaselinePrice(ctx) {
    try {
      let result = await thermalService.fetchFanBaselinePrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal getFanBaselinePrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putFanBaselinePrice (ctx) {
    try {
      let { nextId, fanBaselinePrice } = ctx.request.body

      let result = await thermalService.modifyFanBaselinePrice(nextId, fanBaselinePrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal putFanBaselinePrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async getGreaseList(ctx) {
    try {

      const result = await thermalService.fetchGreaseList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Thermal fetchGreaseList function', err)
    }
  }

  async putGreaseList(ctx) {
    try {
      let { nextId, greaseList } = ctx.request.body
      const result = await thermalService.modifyGreasePrice(nextId, greaseList)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Thermal modifyGreasePrice function', err)
    }
  }

  async getThermalPadList(ctx) {
    try {

      const result = await thermalService.fetchThermalPadList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Thermal fetchThermalPadList function', err)
    }
  }

  async getThermalParameter(ctx) {
    try {
      let result = await thermalService.fetchThermalParameter()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal getThermalParameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  async getFanBearing(ctx) {
    try {
      let result = await thermalService.fetchFanBearing()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal fetchFanBearing function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putThermalPadList(ctx) {
    try {
      let { nextId, thermalPadList } = ctx.request.body
      const result = await thermalService.modifyThermalPadList(nextId, thermalPadList)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Thermal putThermalPadList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Fan 軸承差異 價目表單 --
  async getFanBearingPrice(ctx) {
    try {
      let result = await thermalService.fetchFanBearingPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal getFanBearingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putFanBearingPrice (ctx) {
    try {
      let { nextId, fanBearingList } = ctx.request.body

      let result = await thermalService.modifyFanBearingPrice(nextId, fanBearingList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal putFanBearingPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // -- Fan 軸承差異 價目表單 --
  async fetchPipeList(ctx) {
    try {

      let result = await thermalService.fetchPipeList()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal fetchPipeList function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putPipeList(ctx) {
    try {
      let { nextId, pipeList } = ctx.request.body

      let result = await thermalService.modifyPipePrice(nextId, pipeList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal modifyPipePrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // -- Fan 扇葉材料 --
  async getFanMaterial(ctx) {
    try {
      let result = await thermalService.fetchFanMaterial()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal fetchFanMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getFanMaterialPrice(ctx) {
    try {
      let result = await thermalService.fetchFanMaterialPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal getFanMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putFanMaterialPrice (ctx) {
    try {
      let { nextId, fanMaterialList } = ctx.request.body

      let result = await thermalService.modifyFanMaterialPrice(nextId, fanMaterialList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Thermal putFanMaterialPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // -- Fan 扇葉材料 --

  async getMagnetMaterialList(ctx){
    let result = await thermalService.getMagnetMaterialList()
    ctx.body = result
    ctx.status = 200
  }
  async getMagnetMaterialPrice(ctx){
    let result = await thermalService.getMagnetMaterialPrice()
    ctx.body = result
    ctx.status = 200
  }
  async modifyMagnetMaterialPrice(ctx){
    try {
      let { nextId, magnetMaterialPriceList } = ctx.request.body
      let result = await thermalService.modifyMagnetMaterialPrice(nextId, magnetMaterialPriceList)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Therml modifyMagnetMaterialPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async getMotorDiffList(ctx){
    let result = await thermalService.getMotorDiffList()
    ctx.body = result
    ctx.status = 200
  }
  async getMotorDiffPrice(ctx){
    let result = await thermalService.getMotorDiffPrice()
    ctx.body = result
    ctx.status = 200
  }
  async modifyMotorDiffPrice(ctx){
    try {
      let { nextId, motorDiffPriceList } = ctx.request.body
      let result = await thermalService.modifyMotorDiffPrice(nextId, motorDiffPriceList)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Therml modifyMotorDiffPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
}

module.exports = Thermal
