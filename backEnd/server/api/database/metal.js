/* eslint-disable no-magic-numbers */
const metalService = require('../../service/database/metal.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Metal')

class Metal {
  async getMetalMaterialPrice(ctx) {

    try {

      const result = await metalService.fetchMetalMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getMetalMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async postMetalMaterial(ctx) {
    try {

      let { material, density = 0 } = ctx.request.body
      if(!material || material == '') {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await metalService.postMetalMaterial(material, density)

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal postMetalMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  async postMetalMaterialThickness(ctx) {
    try {

      let { materialId, thickness = null, price = 0 } = ctx.request.body
      if(!materialId || !thickness) {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await metalService.postMetalMaterialThickness(materialId, thickness, price )

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal postMetalMaterialThickness function', err)
      throwApiError(err.message, err.status)
    }
  }

  async archiveMetalMaterial(ctx) {
    try {
      let { materialId } = ctx.request.body
      await metalService.archiveMetalMaterial(materialId)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal archiveMetalMaterial function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async unblockMetalMaterial(ctx) {
    try {
      let { materialId } = ctx.request.body
      await metalService.unblockMetalMaterial(materialId)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal unblockMetalMaterial function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async archiveMetalMaterialThickness(ctx) {
    try {
      let { materialId, materialThickness } = ctx.request.body
      await metalService.archiveMetalMaterialThickness(materialId, materialThickness)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal archiveMetalMaterialThickness function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async unblockMetalMaterialThickness(ctx) {
    try {
      let { materialId, materialThickness } = ctx.request.body
      await metalService.unblockMetalMaterialThickness(materialId, materialThickness)

      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal unblockMetalMaterialThickness function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async getMetalParameter(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await metalService.fetchMetalParameter(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getMetalParameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 陽極顏色價目表
  async getAnodeColorPriceList(ctx) {
    try {
      let { productTypeId = 1 } = ctx.request.query

      const result = await metalService.fetchAnodeColorPriceList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getAnodeColorPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 噴漆類型價目表
  async getSprayPaintPriceList(ctx) {
    try {

      const result = await metalService.fetchSprayPaintPriceList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getSprayPaintPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 膠水型號價目表
  async getGlueModelPriceList(ctx) {
    try {
      let { productTypeId = 1 } = ctx.request.query

      const result = await metalService.fetchGlueModelPriceList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getGlueModelPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 熱壓膠水針筒內徑表
  async getSyringeList(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await metalService.fetchSyringeList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getSyringeList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 機台 Module 清單
  async getMachineModuleList(ctx) {
    try {

      const result = await metalService.fetchMachineModuleList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getMachineModuleList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 機台噸數價目表
  async getMachineTonnesList(ctx) {
    try {

      const result = await metalService.fetchMachineTonnesList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getMachineTonnesList function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putMetalMaterialPrice(ctx) {
    try {
      let { nextId, materialId, subMaterial } = ctx.request.body

      let result = await metalService.modifyMetalMaterialPrice(nextId, subMaterial, materialId)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putMetalMaterialPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putMetalParameter(ctx) {
    try {
      let { nextId, typeId, items } = ctx.request.body

      let result = await metalService.modifyMetalParameter(nextId, typeId, items)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putMetalParameter function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // 噴漆類型價目表
  async putSprayPaintPrice(ctx) {
    try {
      let { nextId, sprayPaintPriceList } = ctx.request.body

      let result = await metalService.modifySprayPaintPrice(nextId, sprayPaintPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putSprayPaintPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // 熱壓膠水針筒內徑表
  async putSyringePrice(ctx) {
    try {
      let { nextId, syringeList } = ctx.request.body

      let result = await metalService.modifySyringePrice(nextId, syringeList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putSyringePrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // 陽極顏色價目表
  async putAnodeColorPrice(ctx) {
    try {
      let { nextId, anodeColorPrice } = ctx.request.body

      let result = await metalService.modifyAnodeColorPrice(nextId, anodeColorPrice)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putAnodeColorPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // 膠水型號價目表
  async putGlueModelPrice(ctx) {
    try {
      let { nextId, glueModelPriceList } = ctx.request.body

      let result = await metalService.modifyGlueModelPrice(nextId, glueModelPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putGlueModelPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // 機台 Module 清單
  async putMachineModule(ctx) {
    try {
      let { machineModule } = ctx.request.body
      await metalService.checkMachineModule(machineModule)
      const result = await metalService.modifyMachineModule(machineModule)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal modifyMachineModule function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 機台頓數價目表
  async putMachineTonnes(ctx) {
    try {
      let { nextId, machineTonnesList } = ctx.request.body

      let result = await metalService.modifyMachineTonnes(nextId, machineTonnesList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putMachineTonnes function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  // link MetalMaterialPrice
  async linkMetalMaterialPrice(ctx) {
    try {
      let { materialId, materialName, partCategory } = ctx.request.body

      let result = await metalService.linkMetalMaterialPrice(materialId, materialName, partCategory)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal linkMetalMaterialPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async getPartCategory(ctx) {
    let { material } = ctx.query

    let partCategory = await metalService.getPartCategory(material)
    ctx.body = partCategory
    ctx.status = 200
  }

  async getDrillPrice(ctx) {
    try {

      const result = await metalService.fetchDrillPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal fetchDrillPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async getPaintBottomTop(ctx) {
    try {

      const result = await metalService.fetchPaintBottomTop()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getPaintBottomTop function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆組合清單
  async getSprayPaintCombinationList(ctx) {
    try {

      const result = await metalService.fetchSprayPaintCombinationList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal fetchSprayPaintCombinationList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆機台價目表
  async getSprayPaintMachinePriceList(ctx) {
    try {
      const result = await metalService.getSprayPaintMachinePriceList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getSprayPaintMachinePriceList function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putSprayPaintMachinePriceList(ctx) {
    try {
      let { nextId, sprayPaintMachinePriceList } = ctx.request.body

      let result = await metalService.modifySprayPaintMachinePriceList(nextId, sprayPaintMachinePriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putSprayPaintMachinePriceList function', err)
    }
  }
  // 噴漆類型價目表
  async getPaintTypePrice(ctx) {
    try {

      let { paintBottomTopId } = ctx.query

      if(!paintBottomTopId) {
        throwApiError('not found paint Bottom Top ID', errorCode.NOT_FOUND)
      }

      const result = await metalService.fetchPaintTypePrice(paintBottomTopId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getPaintTypePrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆配方價目表
  async getPaintFormulaPrice(ctx) {
    try {
      let { paintId, vendorId, dateId } = ctx.query


      if(!paintId) {
        throwApiError('not found paint type color bottom top ID', errorCode.NOT_FOUND)
      }
      if(!vendorId) {
        throwApiError('not found paint Vendor ID', errorCode.NOT_FOUND)
      }
      if(!dateId) {
        throwApiError('not found paint date ID', errorCode.NOT_FOUND)
      }

      const result = await metalService.fetchPaintFormulaPrice(paintId, vendorId, dateId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getPaintFormulaPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 塗料廠商
  async getPaintVendor(ctx) {
    try {
  
      const result = await metalService.fetchPaintVendor()
      ctx.body = result
      ctx.status = 200
  
    } catch (err) {
      logger.warn('error request for Database Metal getPaintVendor function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆類型及顏色清單
  async getPaintTypeColor(ctx) {
    try {

      const result = await metalService.fetchPaintTypeColor()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getPaintTypeColor function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴塗人工單價及工時表
  async getPaintManPowerHour(ctx) {
    try {

      const result = await metalService.fetchPaintManPowerHour()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Metal getPaintManPowerHourList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴塗線人工及總人工費用表
  async getPaintManPowerPrice(ctx) {
    try {
  
      let { productTypeId } = ctx.query
      if(!productTypeId) {
        throwApiError('not found product ID', errorCode.NOT_FOUND)
      }
  
      const result = await metalService.fetchPaintManPowerPrice(productTypeId)
      ctx.body = result
      ctx.status = 200
  
    } catch (err) {
      logger.warn('error request for Database Metal getPaintManPowerPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putPaintVendor(ctx) {
    try {
      let { paintVendor } = ctx.request.body

      let result = await metalService.putPaintVendor(paintVendor)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putPaintVendor function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putPaintFormulaPrice(ctx) {
    try {
      let { paintId, vendorId, nextId, paintFormulaPirce } = ctx.request.body

      let result = await metalService.putPaintFormulaPrice(paintId, vendorId, nextId, paintFormulaPirce)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putPaintFormulaPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putPaintManPowerHour(ctx) {
    try {
      let { nextId, paintManPowerHourList } = ctx.request.body

      let result = await metalService.modifyPaintManPowerHour(nextId, paintManPowerHourList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putPaintManPowerHour function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putPaintManPowerPrice(ctx) {
    try {
      let { nextId, paintManPowerPriceList } = ctx.request.body

      let result = await metalService.modifyPaintManPowerPrice(nextId, paintManPowerPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Metal putPaintManPowerPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
}

module.exports = Metal
