const _ = require('lodash')
// const moment = require('moment')
const metalModel = require('../../model/database/metal.js')
const commonModel = require('../../model/database/common.js').Common
const productTypeModel = require('../../model/database/productType.js')
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Metal Service')
const bomItemSvc = require('../../service/bom/bomItem.js')
const cacheHelper = require('../../utils/helper/cacheHelperDaily')// singleton
const { formatFloat } = require('../../helpers/utils.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const dbFloatPoint = new DecimalGetter('Database')
class Metal {
  static async _modifyMachineTonnesPrice(client, params){
    let { nextId, tonnesId, pressTypeId, moduleMetalId, next } = params
    let getRes = await metalModel.getMachinePressLink(client, params)
    let linkId = getRes ? getRes.id : null
    let isDisable = getRes && getRes.disable_time ? true : false
    let isUpdatePrice = false
    if (next === null) { // disable
      if(linkId && !isDisable) {// do disable
        await metalModel.updateMachinePressLink(client, { linkId, 'newStatus':false })
        isUpdatePrice = true // update price to null
      }
    } else { // enable or insert
      if (!linkId) {// do insert
        await metalModel.insertMachinePressLink(client, { tonnesId, pressTypeId, moduleMetalId })
      }else if(isDisable) {// do enable
        await metalModel.updateMachinePressLink(client, { linkId, 'newStatus':true })
      }
      isUpdatePrice = true
    }
    if (isUpdatePrice) {
      let getLinkRes = await metalModel.getMachinePressLink(client, params)
      if (getLinkRes && getLinkRes.id) {
        await commonModel.insertPriceWithSourceName(client, getLinkRes.id, nextId, next, 'number', 'metal_press_module_machine_type')
      } else {
        throw new Error('_modifyMachineTonnesPrice link id not exist. unable to insert parameter_value.')
      }
    }
  }
  static async putPaintTypePrice(nextId, items, client = null) {
    let outerClient = false
    try {
      if (!client){
        client = await new tsystemDB()
      } else {
        outerClient = true
      }
      for(let i = 0; i < items.length; i++) {
        for(let j = 0; j < items[i].vendorList.length; j++) {
          if (items[i].vendorList[j].hasOwnProperty('next') && typeof items[i].vendorList[j].next !== 'number') {
            continue
          }
          let checkRes = await metalModel.checkPaintTypeVendor(items[i].id, items[i].vendorList[j].vendorId)
          let typeColorVendorId = null
          if (!checkRes) {
            typeColorVendorId = await metalModel.insertPaintTypeVendor(client, items[i].id, items[i].vendorList[j])
          } else {
            typeColorVendorId = checkRes.id
            if (checkRes.disable_time) {
              await metalModel.updatePaintTypeVendor(client, typeColorVendorId, false) // 取消disable
            }
          }
          let checkPriceRes = await metalModel.checkPaintTypePrice(nextId, items[i].id, items[i].vendorList[j])
          if (checkPriceRes) {
            await metalModel.modifyPaintTypePrice(client, nextId, items[i].id, items[i].vendorList[j])
          } else {
            await commonModel.insertPriceWithSourceName(client, typeColorVendorId, nextId, items[i].vendorList[j].next, 'number', 'metal_paint_vendor_type_color_bottom_top')
          }
        }
      }
      if (!outerClient) {
        await client.commit()
      }
    } catch (err) {
      logger.error('Update table fail, putPaintTypePrice function', err)
      throw err
    }
  }
  static async putPaintFormulaPrice(paintId, vendorId, nextId, paintFormulaPirce) {

    let getter = function(arr, key) {
      let findRes = arr.find((item) => {
        return item.key === key
      })

      if (!findRes || !findRes.value) {
        return 0
      }
      if (typeof findRes.value === 'number') {
        return findRes.value
      } else {
        return formatFloat(parseFloat(findRes.value), dbFloatPoint.get('default'))
      }
    }
    let vars = {
      'main_unit_price':getter(paintFormulaPirce, 'main_unit_price'),
      'main_amount':getter(paintFormulaPirce, 'main_amount'),
      'hardener_unit_price':getter(paintFormulaPirce, 'hardener_unit_price'),
      'hardener_amount':getter(paintFormulaPirce, 'hardener_amount'),
      'solvent_unit_price':getter(paintFormulaPirce, 'solvent_unit_price'),
      'solvent_amount':getter(paintFormulaPirce, 'solvent_amount'),
    }

    let totalAmount = vars.main_amount + vars.hardener_amount + vars.solvent_amount
    let getUnitPrice = function (key) {
      let unitPrice = vars[`${key}_unit_price`] || 0
      let amount = vars[`${key}_amount`] || 0
      if (amount === 0 || totalAmount === 0) {
        return 0
      }
      return unitPrice * ( amount / totalAmount)
    }
    let totalPrice = getUnitPrice('main') + getUnitPrice('hardener') + getUnitPrice('solvent')
    let priceObj = [{
      'id': paintId,
      'vendorList': [{
        'vendorId': vendorId,
        'next': formatFloat(totalPrice, dbFloatPoint.get('default')),
      }],
    }]
    let client = await new tsystemDB()
    try{
      await Metal.putPaintTypePrice(nextId, priceObj)
      let checkRes = await metalModel.checkPaintTypeVendor(paintId, vendorId)
      let linkId = null
      if (!checkRes || checkRes.disable_time) {
        throw new Error('expect linkId not null')
      } else {
        linkId = checkRes.id
      }
      for (let key in vars) {
        if (!vars.hasOwnProperty(key)) {
          continue
        }
        let value = vars[key]
        let formulaId = await metalModel.getPaintFormulaId(linkId, key)
        if (!formulaId) {
          formulaId = await metalModel.insertPaintFormulaId(linkId, key)
        }
        await commonModel.insertPriceWithSourceName(client, formulaId, nextId, value, 'number', 'metal_paint_formula')
      }
      client.commit()
    }catch(err){
      await client.rollback()
      logger.error('Update table fail, fetchPaintFormulaPrice function', err)
      throw err
    }
  }

}

const getMaterialSpecPath = async (category1Name, category2Name, materialName) => {
  let ctgy1 = await bomItemSvc.getDropDownUuid(category1Name, 'parts_ctgy_1', { parts_ctgy_1: null, parts_ctgy_2: null, material_spec: null })
  let ctg1Path = ctgy1.path ? ctgy1.path : null

  let ctgy2 = await bomItemSvc.getDropDownUuid(category2Name, 'parts_ctgy_2', { parts_ctgy_1: category1Name, parts_ctgy_2: category2Name, material_spec: null }, ctg1Path)
  let ctg2Path = ctgy2.path ? ctgy2.path : null

  let materialSpec = await bomItemSvc.getDropDownUuid(materialName, 'material_spec',
    { parts_ctgy_1: category1Name, parts_ctgy_2: category2Name, material_spec: materialName }, ctg2Path)

  return {
    materialSpecPath: !_.isNull(materialSpec) && materialSpec.hasOwnProperty('path') ?
      materialSpec.path.includes(ctg2Path) ? materialSpec.path : null : null,
    ctg2Path: ctg2Path ? ctg2Path : null,
  }
}

module.exports = {
  Metal,
  fetchMetalMaterialPrice: async () => {
    let metalList = await metalModel.fetchMetalMaterial()
    let materialPriceResults = await metalModel.fetchMetalMaterialPrice()
    let dateFormat = databaseUtils.getDateFormat(materialPriceResults, 'activate_date', 'activation_date_id')

    let materialPriceList = []
    _.chain(metalList)
      .groupBy(res => res.materialId)
      .map((data, key) => {

        let thicknessData = _.filter(materialPriceResults, (r) => r.materialId == key)
        let thickness = databaseUtils.formatSigleTablePriceData(thicknessData, 'thicknessId', {
          'thicknessId': 'id',
          'thickness': 'thickness',
          'disable_time': 'disable',
        })

        _.map(thickness, (t) => delete t.thicknessId)

        materialPriceList.push({
          id: key,
          material: data[0].name,
          density: data[0].density,
          disable: data[0].materialDisable ? true : false,
          subMaterial: thickness,
        })
      })
      .value()
    return {
      date: dateFormat,
      materialPriceList: _.sortBy(materialPriceList, 'material'),
    }
  },
  postMetalMaterial: async (material, density) => {
    try {
      let inoperable = databaseUtils.checkItemInoperable(material)
      if(inoperable) {
        logger.warn(`material: ${material} 不可被新增/刪除(封存) 項目`)
        throwApiError('F000113', errorCode.BAD_REQUEST)
      }

      let materialExist = await metalModel.checkMetalMaterial(material)
      if (materialExist) {
        logger.warn(`duplicate material: ${material}`)
        throwApiError('F000110', errorCode.BAD_REQUEST)
      }

      let client = await new tsystemDB()

      let materialId = await metalModel.addMetalMaterial(client, material, density)
      await metalModel.addPartCateMaterial(client, materialId)

      await client.commit()
      return {
        materialId: materialId,
      }
    } catch (err) {
      logger.debug('Update table fail, postMetalMaterial function', err)
      throw err
    }
  },
  postMetalMaterialThickness: async (materialId, thickness, price) => {
    try {

      let thicknessExist = await metalModel.checkMetalMaterialThickness(materialId, thickness)
      if (thicknessExist) {
        logger.warn(`duplicate thickness: ${thickness}`)
        throwApiError('F000111', errorCode.BAD_REQUEST)
      }

      let client = await new tsystemDB()

      let materialThicknessId = await metalModel.addMetalMaterialThickness(client, materialId, thickness)

      let formulaType = 'material'
      let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
      let sourceTable = 'material_thinkness'
      await commonModel.addParameterValue(client, materialThicknessId, price, scheduleList, sourceTable)

      await client.commit()

      return {
        materialThicknessId: materialThicknessId,
      }
    } catch (err) {
      logger.debug('Update table fail, postMetalMaterialThickness function', err)
      throw err
    }
  },
  archiveMetalMaterial: async (materialIdList) => {
    try {
      let client = await new tsystemDB()
      await metalModel.archiveMetalMaterial(client, materialIdList)

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveMetalMaterial function', err)
      throw err
    }
  },
  unblockMetalMaterial: async (materialIdList) => {
    try {
      let client = await new tsystemDB()
      await metalModel.unblockMetalMaterial(client, materialIdList)

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockMetalMaterial function', err)
      throw err
    }
  },
  archiveMetalMaterialThickness: async (materialId, materialThicknessList) => {
    try {
      let client = await new tsystemDB()
      await metalModel.archiveMetalMaterialThickness(client, materialId, materialThicknessList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveMetalMaterialThickness function', err)
      throw err
    }
  },
  unblockMetalMaterialThickness: async (materialId, materialThicknessList) => {
    try {
      let client = await new tsystemDB()
      await metalModel.unblockMetalMaterialThickness(client, materialId, materialThicknessList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockMetalMaterialThickness function', err)
      throw err
    }
  },
  fetchMetalParameter: async (productTypeId) => {
    let results = await metalModel.fetchMetalParameter(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let type_label = {
      'housing_metal_material': '材料',
      'housing_metal_stamping': '沖壓',
      'housing_metal_secondary_processing': '二次加工',
      'housing_metal_management_and_profit': '管銷利潤',
      'housing_metal_painting': '塗裝噴漆',
    }

    let metalParameter = databaseUtils.collateParameter(type_label, results)

    return {
      date: dateFormat,
      metalParameter: metalParameter,
    }
  },
  // 陽極顏色價目表
  fetchAnodeColorPriceList: async (productTypeId) => {
    let priceResults = await metalModel.fetchAnodeColorPriceList('usd_mm2', productTypeId)
    let lossRateResults = await metalModel.fetchAnodeColorPriceList('loss_rate', productTypeId)

    let dateFormat = databaseUtils.getDateFormat(priceResults, 'activate_date', 'activation_date_id')
    let anodeColorPrice = []

    _.chain(priceResults)
      .groupBy(res => res.anode_color_id)

      .map((anodeData, key) => {
        let data = _.sortBy(_.uniqBy(anodeData, 'activate_date'), 'activate_date')
        let lossRateData = _.filter(lossRateResults, (lossRate) => lossRate.anode_color_id == key)

        _.forEach(lossRateData, (item) => {
          item.loss_rate = item.loss_rate ? item.loss_rate > 0 ? item.loss_rate * 100 : 0 : null
        })

        let priceAndLossRate = databaseUtils.calcPriceByDateObject(data, lossRateData, {
          'usd_mm2': 'price',
          'loss_rate': 'lossRate',
        })

        anodeColorPrice.push({
          id: key,
          item: data[0].name,
          ...priceAndLossRate,
        })
      })
      .value()

    return {
      date: dateFormat,
      anodeColorPrice: _.sortBy(anodeColorPrice, 'item'),
    }
  },
  // 噴漆類型價目表
  fetchSprayPaintPriceList: async () => {
    let results = await metalModel.fetchSprayPaintPriceList()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let sprayPaintPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'painting_name': 'color',
    })

    return {
      date: dateFormat,
      sprayPaintPriceList: sprayPaintPriceList, // _.sortBy(sprayPaintPriceList, 'color'),
    }
  },

  // 膠水型號價目表
  fetchGlueModelPriceList: async (productTypeId) => {
    let priceResults = await metalModel.fetchGlueModelPriceList('usd_g', productTypeId)
    let densityResults = await metalModel.fetchGlueModelPriceList('density', productTypeId)

    let dateFormat = databaseUtils.getDateFormat(priceResults, 'activate_date', 'activation_date_id')
    let glueModelPriceList = []

    _.chain(priceResults)
      .groupBy(res => res.glue_id)
      .map((priceData, key) => {
        let densityData = densityResults.filter(d => d.glue_id == key)
        let data = _.sortBy(_.uniqBy(priceData, 'activate_date'), 'activate_date')

        let price = databaseUtils.getValueByDateFormat(data, 'usd_g', 'activate_date')
        glueModelPriceList.push({
          id: data[0].glue_id,
          glueType: data[0].glue_name,
          density: densityData[0].density,
          ...price,
        })
      })
      .value()

    return {
      date: dateFormat,
      glueModelPriceList: glueModelPriceList, // _.sortBy(sprayPaintPriceList, 'color'),
    }
  },

  // 熱壓膠水針筒內徑表
  fetchSyringeList: async (productTypeId) => {
    let results = await metalModel.fetchSyringeList(productTypeId)

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let syringeList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'syringe_name': 'syringeName',
    })

    return {
      date: dateFormat,
      syringeList: syringeList, // _.sortBy(sprayPaintPriceList, 'color'),
    }
  },
  // 機台 Module 清單
  fetchMachineModuleList: async () => {
    let moduleList = await metalModel.fetchMdouleList() // 取出module清單
    let results = await metalModel.fetchMachineModuleList()
    let typeList = await productTypeModel.getProductType()
    let machineModelList = _.chain(moduleList)
      .groupBy((module) => module.module_name)
      .map((moduleGroup, module_name)=>{
        let model = {
          'moduleId':moduleGroup[0].id,
          'moduleName': module_name,
          'remark': moduleGroup[0].remark,
        }
        typeList.forEach((type) => {
          model[type.type_name] = {
            'productTypeId':type.id,
            'metalTypeId': null,
            'metalTypeName': '',
          }
        })
        return model
      })
      .value()
    results.forEach((data) => {
      let module = machineModelList.find((item) => {
        return item.moduleName === data.module_name
      })
      module[data.type_name].metalTypeId = data.metal_type_id
      module[data.type_name].metalTypeName = data.metal_type_name
    })

    let metalType = await metalModel.fetchMetalType()
    let metalTypes = []
    metalType.forEach((item) => {
      metalTypes.push({
        'id' :item.id,
        'name' :item.type_name,
      })
    })

    machineModelList.sort((a, b) => {
      let aNum = parseInt(a.moduleName.split(' ')[1]) // Module 105 => 105
      let bNum = parseInt(b.moduleName.split(' ')[1])
      return aNum - bNum
    })
    return {
      'machineModule': machineModelList,
      'metalType':metalTypes,
    }
  },
  checkMachineModule: async (machineModule) => {
    let moduleList = await metalModel.fetchMdouleList() // 取出module清單
    let productTypeList = await productTypeModel.getProductType() // 取出產品類型清單

    let inputModuleList = new Map() // 輸入module清單
    let inputPtAndMt = new Map() // 輸入 productType + MetalType 清單
    machineModule.forEach((module) => {
      if (inputModuleList.has(module.moduleId)) {
        logger.warn(`duplicate moduleId:${module.moduleId}`)
        throwApiError('F000101', errorCode.BAD_REQUEST)// module重複
      } else {
        inputModuleList.set(module.moduleId, 1) // 建立輸入module清單
      }
      let inputProductTypeList = new Map() // 輸入產品類型清單
      let inputMetalTypeList = new Map() // metalType 清單
      module.items.forEach((item) => {

        if (inputProductTypeList.has(item.productTypeId)) {
          logger.warn(`duplicate productTypeId:${item.productTypeId} in module:${module.moduleId}`)
          throwApiError('F000102', errorCode.BAD_REQUEST)// 產品類型重複
        } else {
          inputProductTypeList.set(item.productTypeId, 1)// 建立輸入產品類型清單
        }
        if (item.metalTypeId) {
          let key = `${item.productTypeId}-${item.metalTypeId}`
          if (inputPtAndMt.has(key)) {
            logger.warn(`duplicate key:${key} in module:${module.moduleId}`)
            throwApiError('F000107', errorCode.BAD_REQUEST)// productType + MetalType重複
          } else {
            inputPtAndMt.set(key, 1) // 建立輸入productType + MetalType清單
          }

          if (inputMetalTypeList.has(item.metalTypeId)) {
            logger.warn(`duplicate metalTypeId:${item.metalTypeId} in module:${module.moduleId}`)
            throwApiError('F000108', errorCode.BAD_REQUEST)// metalType重複
          } else {
            inputMetalTypeList.set(item.metalTypeId, 1)// 建立輸入metalType清單
          }
        }
      })
      if (inputMetalTypeList.size !== 1) {
        logger.warn(`not set metal type in module:${module.moduleId}`)
        throwApiError('F000109', errorCode.BAD_REQUEST)
      }
      if (inputProductTypeList.size !== productTypeList.length) {// 產品類型 數量不足
        logger.warn(`not enouth product type in module:${module.moduleId}`)
        throwApiError('F000104', errorCode.BAD_REQUEST)
      }
    })
    if(inputModuleList.size !== moduleList.length){// module 數量不足
      logger.warn('not enouth modules')
      throwApiError('F000103', errorCode.BAD_REQUEST)
    }
  },
  modifyMachineModule: async (machineModule) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      for (let i = 0; i < machineModule.length; i++) {
        let module = machineModule[i]
        let itemsLength = module.items.length
        for(let k = 0 ; k < itemsLength ; k++) {
          let item = module.items[k]
          await metalModel.modifyMachineModuleString(client, module.moduleId, module.remark)
            .catch((err) => {
              logger.debug('Update table fail, modifyMachineModuleString function', err)
              throw err
            })
          if (item.metalTypeId) {
            await metalModel.modifyMachineModule(client, module.moduleId, item.metalTypeId, item.productTypeId)
              .catch((err) => {
                logger.debug('Update table fail, modifyMachineModule function', err)
                throw err
              })
          }
        }
      }
      cacheHelper.flushAll()
      await client.commit()
    } catch (err) {
      throw err
    }
  },
  // 機台噸數價目表
  fetchMachineTonnesList: async () => {

    let results = await metalModel.fetchMachineTonnesList()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let machineTonnesList = databaseUtils.formatMultiItemPriceData(
      results,
      ['machine_metal_id', 'press_type_id'],
      {
        'unique_id': 'uniqueId',
        'machine_metal_id': 'id',
        'ton': 'ton',
        'bloster': 'bloster',
        'remark': 'remark',
        'press_type_id': 'pressTypeId',
        'press_type_name': 'pressTypeName',
      },
      'module_name',
      {
        'module_metal_id': 'moduleMetalId',
      }
    )
    machineTonnesList.sort((a, b) => {
      return parseInt(a.ton) - parseInt(b.ton)
    })
    return{
      date: dateFormat,
      machineTonnesList: machineTonnesList,
    }
  },

  modifyMetalMaterialPrice: async (nextId, subMaterial) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, subMaterial, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMetalMaterialPrice function', err)
      throw err
    }
  },

  modifyMetalParameter: async (nextId, typeId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyCommonParameterPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMetalParameter function', err)
      throw err
    }
  },

  modifySprayPaintPrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'next', 'metal_painting', 'usd_kg')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySprayPaintPrice function', err)
      throw err
    }
  },

  modifySyringePrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'next', 'metal_syringe', 'syringe_diameter')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySyringePrice function', err)
      throw err
    }
  },

  modifyAnodeColorPrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'price', 'metal_anode_color', 'usd_mm2')

      _.forEach(items, (item) => {
        item.lossRate = item.lossRate ? _.isNumber(item.lossRate) && item.lossRate > 0 ? item.lossRate / 100 : 0 : null
      })
      await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'lossRate', 'metal_anode_color', 'loss_rate')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyAnodeColorPrice function', err)
      throw err
    }
  },

  modifyGlueModelPrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'next', 'metal_glue', 'usd_g')
      await commonModel.modifyNumberByColumnId(client, items, 'id', 'density', 'metal_glue', 'density')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyGlueModelPrice function', err)
      throw err
    }
  },

  modifyMachineTonnes: async (nextId, machineTonnesList) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      for (let i = 0; i < machineTonnesList.length; i++) {
        let { id: tonnesId, pressTypeId, bloster, remark, modules } = machineTonnesList[i]
        // modify remark & bloster
        await metalModel.modifyMachineTonnesString(client, { 'machineId': tonnesId, pressTypeId, bloster, remark })

        let queryDump = []
        modules.forEach((item) => {
          let next = null
          if (typeof item.next === 'number') {
            next = item.next
          }else if(!isNaN(parseFloat(item.next))) {
            next = parseFloat(item.next)
          }
          let promise = Metal._modifyMachineTonnesPrice(client, {
            nextId,
            tonnesId,
            pressTypeId,
            'moduleMetalId': item.moduleMetalId,
            next,
          })
          queryDump.push(promise)
        })
        await Promise.all(queryDump)
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMachineTonnes function', err)
      throw err
    }
  },

  linkMetalMaterialPrice: async (materialId, materialName, partCategory) => {
    try {
      let type = 'housing_metal'
      let originMaterial = await metalModel.getPartCategoryWithMaterial(type, materialId)

      let client = await new tsystemDB()
      for (let i = 0; i < partCategory.length; i++) {
        let res = _.chain(originMaterial)
          .filter(origin => origin.pc1_id == partCategory[i].category1Id)
          .map(d => {
            return {
              category2Id: d.pc2_id.toString(),
              category2Name: d.pc2_name,
            }
          })
          .value()

        let insertCategory2 = _.differenceBy(partCategory[i].category2, res, 'category2Id')

        for (let k = 0; k < insertCategory2.length; k++) {
          let isExist = await metalModel.checkPartCategoryMetalMaterial(materialId, insertCategory2[k])
          if (isExist == false) {
            logger.debug('insert category2 to table: part_category_material and Category2:', insertCategory2[k].category2Name)
            await metalModel.linkPartCategoryMetalMaterial(client, materialId, insertCategory2[k])
          } else {
            logger.debug('update distable time, table: part_category_material and Category2:', insertCategory2[k].category2Name)
            await metalModel.updatePartCategoryMetalMaterial(client, materialId, insertCategory2[k])
          }

          // dropdwon
          let { materialSpecPath, ctg2Path } = await getMaterialSpecPath(partCategory[i].category1Name.toUpperCase(), insertCategory2[k].category2Name.toUpperCase(), materialName.toUpperCase())

          let newMaterialPath = await commonModel.getDropDownPath(materialName, 'material')
          let pathName = newMaterialPath ? newMaterialPath.split('.')[2] : materialName.toUpperCase()
          let insertPath = ctg2Path + '.' + pathName

          if(_.isNull(materialSpecPath)) {
            // insert path to dropdwon
            await commonModel.insertDropDown(client, 'material_spec', materialName, insertPath)
          } else {
            await commonModel.updateDropDown(client, 'material_spec', materialName, insertPath)
          }
        }

        let removeCategory = _.differenceBy(res, partCategory[i].category2, 'category2Id')

        for (let k = 0; k < removeCategory.length; k++) {
          await metalModel.unlinkPartCategoryMetalMaterial(client, materialId, partCategory[i].category1Id, removeCategory[k])

          // dropdown
          let { materialSpecPath } = await getMaterialSpecPath(partCategory[i].category1Name.toUpperCase(), removeCategory[k].category2Name.toUpperCase(), materialName.toUpperCase())
          if(materialSpecPath) {
            // update disable time to dropdwon
            await commonModel.updateDropDownDisable(client, 'material_spec', materialName, materialSpecPath)
          }
        }
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, linkMetalMaterialPrice function', err)
      throw err
    }
  },
  getPartCategory: async (material) => {
    let type = 'housing_metal'

    let result = await commonModel.getPartCategoryByType(type)
    let materialRes = await metalModel.getPartCategoryWithMaterial(type, material)
    let partCategory = databaseUtils.collatePartCategory(result, materialRes)

    return {
      partCategory,
    }
  },
  async fetchDrillPrice() {
    let results = await metalModel.fetchDrillPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    results = results.map(info => {
      info.name = `${info.typeName}${info.featureTypeName || ''}`
      return info
    })
    let result =  databaseUtils.formatSigleTablePriceData(results, 'id', {
      id: 'id',
      name: 'name' })
    return {
      date: dateFormat,
      drillPrice: result,
    }
  },
  fetchPaintBottomTop: async () => {
    let results = await metalModel.fetchPaintBottomTop()
    return {
      paintBottomTopList: _.sortBy(results, 'paintBottomTopName'),
    }
  },
  fetchSprayPaintCombinationList: async () => {
    let results = await metalModel.fetchSprayPaintCombinationList()
    let combinations = []
    _.chain(results)
      .groupBy(res => res.type_id + res.color_id)
      .map((data) => {
        let typeColor = {
          'paintTypeId': data[0].type_id,
          'paintType': data[0].type_name,
          'colorId':data[0].color_id,
          'color': data[0].color_name,
          'top': false,
          'bottom': false,
        }
        data.forEach((item) => {
          if (item.bottom_top_name === '面漆') {
            typeColor.top = true
          }
          if (item.bottom_top_name === '底漆') {
            typeColor.bottom = true
          }
        })
        combinations.push(typeColor)
      })
      .value()
    return { 'paintCombinationList': combinations }
  },
  getSprayPaintMachinePriceList: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('metal_paint_machine', ['id', 'machine_name', 'disable_time'], 'id', 'housing_metal', null)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let sprayPaintMachinePriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'machine_name': 'type',
    })

    return {
      date: dateFormat,
      sprayPaintMachinePriceList: sprayPaintMachinePriceList,
    }
  },
  modifySprayPaintMachinePriceList: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySprayPaintMachinePriceList function', err)
      throw err
    }
  },
  fetchPaintTypePrice: async (type) => {
    let typColor = await metalModel.fetchSprayPaintCombinationList(type)
    let results = await metalModel.fetchPaintTypePrice(type)
    let priceDataList = _.chain(results).groupBy(res => res.type_color_bt_id).value()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let paintTypePriceList = []

    let vendorList = await metalModel.fetchPaintVendor()
    vendorList = _.sortBy(_.uniqBy(_.map(vendorList, (v) => _.pick(v, ['id', 'name'])), 'id'), 'name')

    let vendorObject = {}
    _.chain(typColor)
      .groupBy(res => res.id)
      .map((data, key) => {
        let priceData = priceDataList.hasOwnProperty(key) ? priceDataList[key] : []
        _.chain(vendorList)
          .sortBy('name')
          .map((vendor) =>{
            let vendorData = _.filter(priceData, (d) => vendor.id == d.vendor_id)
            let price = {
              last: null,
              current: null,
              next: null,
            }

            if(vendorData) {
              let vendorUniq = _.sortBy(_.uniqBy(vendorData, 'activate_date'), 'activate_date')
              price = databaseUtils.getValueByDateFormat(vendorUniq, 'value', 'activate_date')
            }

            vendorObject[vendor.name] = {
              vendorId: vendor.id,
              ...price,
            }
          })
          .value()

        paintTypePriceList.push({
          id: data[0].id,
          name: data[0].type_name,
          colorName: data[0].color_name,
          ...vendorObject,
        })
      })
      .value()

    return {
      date: dateFormat,
      paintTypePriceList: paintTypePriceList,
      vendorList: vendorList,
    }
  },
  fetchPaintFormulaPrice: async (paintId, vendorId, dateId) => {
    let defaultRes = await metalModel.fetchPaintFormulaPriceDefault()
    let queryRes = await metalModel.fetchPaintFormulaPrice(paintId, vendorId, dateId)
    let paintFormulaPirce = []
    defaultRes.forEach((item) => {
      let matchDefault = queryRes.find((obj) => obj.label === item.label)
      paintFormulaPirce.push({
        key: item.label,
        label: item.label_name,
        fieldType: item.field_type,
        dataType: item.data_type,
        value: matchDefault ? matchDefault.value : item.value,
      })
    })
    return {
      paintId,
      vendorId,
      paintFormulaPirce,
    }
  },
  fetchPaintVendor: async () => {
    let results = await metalModel.fetchPaintVendor()

    return {
      paintVendor: _.sortBy(results, 'name'),
    }
  },
  fetchPaintTypeColor: async () => {
    let results = await metalModel.fetchPaintTypeColor()
    let paintTypeColorList = []

    _.chain(results)
      .groupBy(res => res.type_id)
      .map((data, key) => {
        let ColorList = _.map(data, color => {
          return {
            colorId: color.color_id,
            colorName: color.color_name,
          }
        })
        paintTypeColorList.push({
          paintTypeId: key,
          paintTypeName: data[0].type_name,
          color: _.sortBy(ColorList, 'colorName'),
        })
      })
      .value()
    return {
      paintTypeColorList: _.sortBy(paintTypeColorList, 'paintTypeName'),
    }
  },
  fetchPaintManPowerHour: async () => {
    let price = await metalModel.fetchPaintManPowerUnitPrice('usd_min')
    let manHours = await metalModel.fetchPaintManPowerUnitPrice('man_hour')

    let dateFormat = databaseUtils.getDateFormat(price, 'activate_date', 'activation_date_id')
    let paintManPowerHourList = []

    _.chain(price)
      .groupBy(res => res.product_id)
      .map((infoData, key) => {
        let manHour = _.filter(manHours, (_manHour) => _manHour.product_id == key)
        let data = _.sortBy(_.uniqBy(infoData, 'activate_date'), 'activate_date')

        let  priceAndManHour = databaseUtils.calcPriceByDateObject(data, manHour, {
          'usd_min': 'price',
          'man_hour': 'manHour',
        })

        paintManPowerHourList.push({
          id: key,
          name: data[0].type_name,
          ...priceAndManHour,
        })
      })
      .value()

    return {
      date: dateFormat,
      paintManPowerHourList: paintManPowerHourList,
    }
  },
  fetchPaintManPowerPrice: async (productTypeId) => {
    let results = await metalModel.fetchPaintManPowerPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let paintManPowerPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'category_name': 'name',
    })

    let priceByProductId = await metalModel.fetchPaintManPowerUnitPrice('usd_min', productTypeId)
    let manHourByProductId = await metalModel.fetchPaintManPowerUnitPrice('man_hour', productTypeId)

    let priceAndManHour = databaseUtils.calcPriceByDateObject(priceByProductId, manHourByProductId, {
      'usd_min': 'price',
      'man_hour': 'manHour',
    })

    return {
      date: dateFormat,
      paintManPowerPriceList: _.sortBy(paintManPowerPriceList, 'name'),
      paintManPowerHourList: priceAndManHour,
    }
  },
  putPaintVendor: async (items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifyStringById(client, items, 'metal_paint_vendor', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putPaintVendor function', err)
      throw err
    }
  },
  putPaintFormulaPrice: Metal.putPaintFormulaPrice,
  modifyPaintManPowerHour: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await metalModel.modifyPaintManPowerHourByColumn(client, nextId, items, 'price', 'usd_min')
      await metalModel.modifyPaintManPowerHourByColumn(client, nextId, items, 'manHour', 'man_hour')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putPaintTypePrice function', err)
      throw err
    }
  },
  modifyPaintManPowerPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyPaintManPowerPrice function', err)
      throw err
    }
  },
}
