const rubberService = require('../../service/database/rubber.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Rubber')

class Rubber {
  // -- Rubber Parameters --
  async getRubberParameter(ctx) {
    try {
      let result = await rubberService.fetchRubberParameter()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getRubberParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Rubber Material Price --
  async getMaterialPrice(ctx) {
    try {
      let result = await rubberService.fetchMaterialPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putRubberMaterialSpec(ctx) {
    try {
      const { items } = ctx.request.body
      let result = await rubberService.modifyRubberMaterialSpec(items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber putRubberMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }
  async postRubberMaterialSpec(ctx) {
    try {
      let { materialSpec, density = 0, remark = null } = ctx.request.body
      if(!materialSpec || materialSpec == '') {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await rubberService.postRubberMaterialSpec(materialSpec, density, remark)

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Rubber postRubberMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }

  async postRubberMaterial(ctx) {
    try {
      let { materialSpecId, material, value = 0 } = ctx.request.body
      if(!materialSpecId || !material || material == '') {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await rubberService.postRubberMaterial(materialSpecId, material, value)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Rubber postRubberMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async archiveRubberMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await rubberService.archiveRubberMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber archiveRubberMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async archiveRubberMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await rubberService.archiveRubberMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber archiveRubberMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }

  async unblockRubberMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await rubberService.unblockRubberMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber unblockRubberMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async unblockRubberMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await rubberService.unblockRubberMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber unblockRubberMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 機台費用價目表 --
  async getMachinePrice(ctx) {
    try {
      let result = await rubberService.fetchMachinePrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getMachinePrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putMachinePrice(ctx) {
    try {
      let { nextId, machinePrice } = ctx.request.body

      let result = await rubberService.modifyMachinePrice(nextId, machinePrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber putMachinePrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // -- 成品沖型價目表 --
  async getStampingPrice(ctx) {
    try {
      let result = await rubberService.fetchStampingPrice()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getStampingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putStampingPrice(ctx) {
    try {
      let { nextId, stampingPrice } = ctx.request.body

      let result = await rubberService.modifyStampingPrice(nextId, stampingPrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber putStampingPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }


  // -- 貼背膠價目表 --
  async getAdhesivePrice(ctx) {
    try {
      let result = await rubberService.fetchAdhesivePrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getAdhesivePrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- 外觀印刷價目表 --
  async getPrintingPrice(ctx) {
    try {
      let result = await rubberService.fetchPrintingPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber getPrintingPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putAdhesivePrice(ctx) {
    try {
      let { nextId, adhesivePrice } = ctx.request.body

      let result = await rubberService.modifyAdhesivePrice(nextId, adhesivePrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber putAdhesivePrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putPrintingPrice(ctx) {
    try {
      let { nextId, printingPrice } = ctx.request.body

      let result = await rubberService.modifyPrintingPrice(nextId, printingPrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Rubber modifyPrintingPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // --- Machine Rate / 穴數計算維護表 ---
  async getMachineRate(ctx) {
    try {

      let result = await rubberService.fetchMachineRate()
      ctx.body = result
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for Database Rubber getMachineRate function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putMachineRate(ctx) {
    try {
      let { nextId, machineRate } = ctx.request.body

      let result = await rubberService.modifyMachineRate(nextId, machineRate)

      ctx.body = result
      ctx.status = 200
    } catch(err) {
      logger.warn('error request for Database Rubber putMachineRate function', err)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = Rubber
