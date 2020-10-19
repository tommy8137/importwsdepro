const turningService = require('../../service/database/turning.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Turning')
const tsystemDB = require('../../helpers/database/tPostgres.js')

class Turning {
  // -- Turning Parameters --
  async getTurningParameter(ctx) {
    try {
      let result = await turningService.fetchTurningParameter()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Turning getTurningParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 牙徑清單 --
  async getDiameter(ctx) {
    try {
      const result = await turningService.fetchDiameter()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getDiameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putDiameter(ctx) {
    try {
      let { items } = ctx.request.body

      let result = await turningService.modifyDiameter(items)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Turning putDiameter function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // -- 加工費 熱處理 單位費用 --
  async getHeatTreatmentPrice(ctx) {
    try {
      const result = await turningService.fetchHeatTreatmentPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getHeatTreatmentPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 加工費 電鍍 單位費用 --
  async getPlatingPrice(ctx) {
    try {
      const result = await turningService.fetchPlatingPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getPlatingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Turning Material Price --
  async getTurningMaterialPrice(ctx) {
    try {
      const result = await turningService.fetchTurningMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getTurningMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async getTurningPartCategory(ctx) {
    try {
      const result = await turningService.fetchTurningPartCategory()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getTurningPartCategory function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getTurningMaterialPartCate(ctx) {
    try {
      const result = await turningService.fetchTurningMaterialPartCate()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getTurningMaterialPartCate function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getTurningNutType(ctx) {
    try {
      const result = await turningService.fetchTurningNutType()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getTurningNutType function', err)
      throwApiError(err.message, err.status)
    }
  }
  async postTurningNutType(ctx) {
    let { materialId, nutTypeId } = ctx.request.body

    if(!materialId || !nutTypeId) {
      throwApiError('not found request data', errorCode.NOT_FOUND)
    }

    let client = await new tsystemDB()
    try {
      const result = await turningService.modifyTurningNutType(client, materialId, nutTypeId)
      await client.commit()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      await client.rollback()
      logger.warn('error request for Database Turning getTurningNutType function', err)
      throwApiError(err.message, err.status)
    }
  }
  async postTurningMaterial(ctx) {
    try {
      let { material, partCategory2Id = [], density = 0, nutTypeId = null, value = 0 } = ctx.request.body
      if(partCategory2Id.length <= 0 || !material) {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await turningService.postTurningMaterial(partCategory2Id, material, nutTypeId, density, value)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning postTurningMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async archiveTurningMaterial(ctx) {
    try {
      let body = ctx.request.body
      await turningService.archiveTurningMaterial(body)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Turning archiveTurningMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async unblockTurningMaterial(ctx) {
    try {
      let body = ctx.request.body
      await turningService.unblockTurningMaterial(body)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Turning unblockTurningMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 加工費 耐落 --
  async getNylokPrice(ctx) {
    try {
      const result = await turningService.fetchNylokPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Turning getNylokPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

}

module.exports = Turning
