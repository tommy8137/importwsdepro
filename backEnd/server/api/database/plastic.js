const _ = require('lodash')
const plasticService = require('../../service/database/plastic.js')
const { throwApiError, errorCode, apiErrorRes } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Plastic')

class Plastic {
  async getPlasticMaterialPrice(ctx) {

    try {

      const result = await plasticService.fetchPlasticMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPlasticMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getPartCategory(ctx) {
    let { material } = ctx.query

    let partCategory = await plasticService.getPartCategory(material)
    ctx.body = partCategory
    ctx.status = 200
  }

  async linkPlasticMaterialPrice(ctx) {

    try {

      let { materialId, materialName, materialSpecName, partCategory } = ctx.request.body
      if(!materialId) {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await plasticService.linkPlasticMaterialPrice(materialId, materialName, materialSpecName, partCategory)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic linkPlasticMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async postPlasticMaterialSpec(ctx) {
    try {
      let { materialSpec, remark = null } = ctx.request.body
      if(!materialSpec || materialSpec == '') {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await plasticService.postPlasticMaterialSpec(materialSpec, remark)

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic postPlasticMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }

  async postPlasticMaterial(ctx) {
    try {
      let { materialSpecId, material, value = 0 } = ctx.request.body
      if(!materialSpecId || !material || material == '') {
        throwApiError('not found request data', errorCode.NOT_FOUND)
      }

      const result = await plasticService.postPlasticMaterial(materialSpecId, material, value)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic postPlasticMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  // Printing製程價目表
  async getPrintingProcessPrice(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.fetchPrintingProcessPrice(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPrintingProcessPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 埋釘製程價目表
  async getEmbeddedPrice(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.fetchEmbeddedPrice(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getEmbeddedPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getPaintBottomTop(ctx) {
    try {

      const result = await plasticService.fetchPaintBottomTop()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintBottomTop function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getPlasticParameter(ctx) {
    try {
      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.fetchPlasticParameter(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic fetchPlasticParameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆組合清單
  async getSprayPaintCombinationList(ctx) {
    try {

      const result = await plasticService.fetchSprayPaintCombinationList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic fetchSprayPaintCombinationList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 噴漆機台價目表
  async getSprayPaintMachinePriceList(ctx) {
    try {
      const result = await plasticService.getSprayPaintMachinePriceList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getSprayPaintMachinePriceList function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putSprayPaintMachinePriceList(ctx) {
    try {
      let { nextId, sprayPaintMachinePriceList } = ctx.request.body

      let result = await plasticService.modifySprayPaintMachinePriceList(nextId, sprayPaintMachinePriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putSprayPaintMachinePriceList function', err)
    }
  }
  // 噴漆類型價目表
  async getPaintTypePrice(ctx) {
    try {

      let { paintBottomTopId } = ctx.query

      if(!paintBottomTopId) {
        throwApiError('not found paint Bottom Top ID', errorCode.NOT_FOUND)
      }

      const result = await plasticService.fetchPaintTypePrice(paintBottomTopId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintTypePrice function', err)
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

      const result = await plasticService.fetchPaintFormulaPrice(paintId, vendorId, dateId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintFormulaPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 塗料廠商
  async getPaintVendor(ctx) {
    try {

      const result = await plasticService.fetchPaintVendor()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintVendor function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 材料 Loss Rate 維護表
  async getMaterialLossRate(ctx) {
    try {
      const result = await plasticService.getMaterialLossRate()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getMaterialLossRate function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 機台Module清單
  async fetchMachineModule(ctx) {
    try {

      const result = await plasticService.fetchMachineModule()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic fetchMachineModule function', err)
      throwApiError(err.message, err.status)
    }
  }

  async modifyMachineModule(ctx) {
    try {
      let { machineModule } = ctx.request.body
      await plasticService.checkMachineModule(machineModule)
      const result = await plasticService.modifyMachineModule(machineModule)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic modifyMachineModule function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 機台噸數價目表
  async fetchMachineTonnesList(ctx) {
    try {

      const result = await plasticService.fetchMachineTonnesList()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic fetchMachineTonnesList function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 機台頓數價目表
  async putMachineTonnes(ctx) {
    try {
      let { nextId, machineTonnesList } = ctx.request.body

      let result = await plasticService.modifyMachineTonnes(nextId, machineTonnesList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putMachineTonnes function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  // 噴漆類型及顏色清單
  async getPaintTypeColor(ctx) {
    try {

      const result = await plasticService.fetchPaintTypeColor()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintTypeColor function', err)
      throwApiError(err.message, err.status)
    }
  }
  // 產品打磨費用明細
  async getGrindingPriceList(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.getGrindingPriceList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getGrindingPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // EMI Sputtering 清單
  async fetchEmiSputteringList(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.fetchEmiSputteringList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic fetchEmiSputteringList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // EMI Sputtering Base 本體材料清單
  async getEmiSputteringBase(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.fetchEmiSputteringBase(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getEmiSputteringBase function', err)
      throwApiError(err.message, err.status)
    }
  }
  // EMI Sputtering 價目表
  async getEmiSputteringPrice(ctx) {
    try {

      let { siteGroupId, productTypeId = 1 } = ctx.query
      if(!siteGroupId) {
        throwApiError('not found group ID', errorCode.NOT_FOUND)
      }

      const result = await plasticService.fetchEmiSputteringPrice(siteGroupId, productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getEmiSputteringPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // 噴塗人工單價及工時表
  async getPaintManPowerHour(ctx) {
    try {

      const result = await plasticService.fetchPaintManPowerHour()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintManPowerHourList function', err)
      throwApiError(err.message, err.status)
    }
  }
  // EMI Sputtering Site Group
  async getEmiSputteringSiteGroupList(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.getEmiSputteringSiteGroupList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getEmiSputteringSiteGroupList function', err)
      throwApiError(err.message, err.status)
    }
  }
  async getEmiSiteGroupList(ctx) {
    try {

      let { productTypeId = 1 } = ctx.request.query

      const result = await plasticService.getEmiSiteGroupList(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getEmiSiteGroupList function', err)
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

      const result = await plasticService.fetchPaintManPowerPrice(productTypeId)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Plastic getPaintManPowerPriceList function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putPrintingProcessPrice(ctx) {
    try {
      let { nextId, printingProcessPriceList } = ctx.request.body

      let result = await plasticService.putPrintingProcessPrice(nextId, printingProcessPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPrintingProcessPrice function', err)
    }
  }
  async putMaterialSpec(ctx) {
    try {
      let { items } = ctx.request.body
      let result = await plasticService.modifyMaterialSpec(items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putMaterialSpec function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putEmbeddedPrice(ctx) {
    try {
      let { nextId, embeddedPriceList } = ctx.request.body

      let result = await plasticService.putEmbeddedPrice(nextId, embeddedPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putEmbeddedPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putPaintVendor(ctx) {
    try {
      let { paintVendor } = ctx.request.body

      let result = await plasticService.putPaintVendor(paintVendor)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintVendor function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putPaintFormulaPrice(ctx) {
    try {
      let {paintId, vendorId, nextId, paintFormulaPirce } = ctx.request.body

      let result = await plasticService.putPaintFormulaPrice(paintId, vendorId, nextId, paintFormulaPirce)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintFormulaPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putEmiSputteringPrice(ctx) {
    try {
      let { nextId, emiSputteringPriceList } = ctx.request.body

      let result = await plasticService.modifyEmiSputteringPrice(nextId, emiSputteringPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putEmiSputteringPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async putPaintManPowerHour(ctx) {
    try {
      let { nextId, paintManPowerHourList } = ctx.request.body

      let result = await plasticService.modifyPaintManPowerHour(nextId, paintManPowerHourList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintManPowerHour function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putPaintManPowerPrice(ctx) {
    try {
      let { nextId, paintManPowerPriceList } = ctx.request.body

      let result = await plasticService.modifyPaintManPowerPrice(nextId, paintManPowerPriceList)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintManPowerPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putMaterialLossRate(ctx) {
    try {
      let { nextId, materialLossRate } = ctx.request.body

      let result = await plasticService.modifyMaterialLossRate(nextId, materialLossRate)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintManPowerPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async modifyGrindingPrice(ctx) {
    try {
      let { nextId, grindingPriceList } = ctx.request.body
      let result = await plasticService.modifyGrindingPrice(nextId, grindingPriceList)
      ctx.body = result
      ctx.status = 200
    } catch (error) {
      logger.warn('error request for Database Plastic modifyGrindingPrice function', error)
      throwApiError(error)
    }
  }
  async putEmiSputteringList(ctx) {
    try {
      let { emiSputteringList } = ctx.request.body
      let result = await plasticService.modifySputteringList(emiSputteringList)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintManPowerPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async putEmiSputteringSiteGroup(ctx) {
    try {
      let { emiSputteringSiteGroupList, productTypeId = 1 } = ctx.request.body

      let result = await plasticService.modifyEmiSputteringSiteGroup(emiSputteringSiteGroupList, productTypeId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic putPaintManPowerPrice function', err)
      if(err['code'] && err['code'] == '23505') throwApiError('C000100', errorCode.updateFailed)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async archivePlasticMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await plasticService.archivePlasticMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic archivePlasticMaterial function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async unblockPlasticMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await plasticService.unblockPlasticMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic unblockPlasticMaterial function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async archivePlasticMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await plasticService.archivePlasticMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic archivePlasticMaterialSpec function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }

  async unblockPlasticMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await plasticService.unblockPlasticMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Plastic unblockPlasticMaterialSpec function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
}
module.exports = Plastic
