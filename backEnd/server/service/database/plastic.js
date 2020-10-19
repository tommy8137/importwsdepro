const _ = require('lodash')

const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { formatFloat } = require('../../helpers/utils.js')
const log4js = require('../../utils/logger/logger')
const cacheHelper = require('../../utils/helper/cacheHelperDaily')// singleton
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

const bomItemSvc = require('../../service/bom/bomItem.js')

const plasticModel = require('../../model/database/plastic.js')
const commonModel = require('../../model/database/common.js').Common
const productTypeModel = require('../../model/database/productType.js')

const dbFloatPoint = new DecimalGetter('Database')
const logger = log4js.getLogger('database Plastic Service')

class Plastic {
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
          let checkRes = await plasticModel.checkPaintTypeVendor(items[i].id, items[i].vendorList[j].vendorId)
          let typeColorVendorId = null
          if (!checkRes) {
            typeColorVendorId = await plasticModel.insertPaintTypeVendor(client, items[i].id, items[i].vendorList[j])
          } else {
            typeColorVendorId = checkRes.id
            if (checkRes.disable_time) {
              await plasticModel.updatePaintTypeVendor(client, typeColorVendorId, false) // 取消disable
            }
          }
          let checkPriceRes = await plasticModel.checkPaintTypePrice(nextId, items[i].id, items[i].vendorList[j])
          if (checkPriceRes) {
            await plasticModel.modifyPaintTypePrice(client, nextId, items[i].id, items[i].vendorList[j])
          } else {
            await commonModel.insertPriceWithSourceName(client, typeColorVendorId, nextId, items[i].vendorList[j].next, 'number', 'plastic_paint_vendor_type_color_bottom_top')
          }
        }
        // let result = await plasticModel.modifyPaintTypePrice(client, nextId, items[i].id, items[i].vendorList)
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
      'solvent_amount':getter(paintFormulaPirce, 'solvent_amount')
    }

    let totalAmount = vars.main_amount + vars.hardener_amount + vars.solvent_amount
    let getUnitPrice = function (key) {
      let unitPrice = vars[`${key}_unit_price`] || 0
      let amount = vars[`${key}_amount`] || 0
      if (amount === 0 || totalAmount === 0) {
        return 0
      }
      return unitPrice * (amount/totalAmount)
    }
    let totalPrice = getUnitPrice('main') + getUnitPrice('hardener') + getUnitPrice('solvent')
    let priceObj = [{
      "id": paintId,
      "vendorList": [{
        "vendorId": vendorId,
        "next": formatFloat(totalPrice, dbFloatPoint.get('default')),
      }]
    }]
    let client = await new tsystemDB()
    try{
      await Plastic.putPaintTypePrice(nextId, priceObj)
      let checkRes = await plasticModel.checkPaintTypeVendor(paintId, vendorId)
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
        let formulaId = await plasticModel.getPaintFormulaId(linkId, key)
        if (!formulaId) {
          formulaId = await plasticModel.insertPaintFormulaId(linkId, key)
        }
        await commonModel.insertPriceWithSourceName(client, formulaId, nextId, value, 'number', 'plastic_paint_formula')
      }
      client.commit()
    }catch(err){
      await client.rollback()
      logger.error('Update table fail, fetchPaintFormulaPrice function', err)
      throw err
    }
  }

}

const insertMaterial = async (client, materialSpecId, material, materialValue) => {
  let materialId = await plasticModel.addPlasticMaterial(client, materialSpecId, material)

  await plasticModel.addPartCateMaterial(client, materialId)

  let formulaType = 'material'
  let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
  await commonModel.addParameterValue(client, materialId, materialValue, scheduleList)

}
const getMaterialSpecPath = async (category1Name, category2Name, materialSpecName, materialName) => {
  logger.info('category1Name: ', category1Name, 'category2Name: ', category2Name, 'materialSpecName: ', materialSpecName, 'materialName:', materialName)

  let ctgy1 = await bomItemSvc.getDropDownUuid(category1Name, 'parts_ctgy_1', { parts_ctgy_1: null, parts_ctgy_2: null, material_spec: null })
  let ctg1Path = ctgy1.path ? ctgy1.path : null

  let ctgy2 = await bomItemSvc.getDropDownUuid(category2Name, 'parts_ctgy_2', { parts_ctgy_1: category1Name, parts_ctgy_2: category2Name, material_spec: null }, ctg1Path)
  let ctg2Path = ctgy2.path ? ctgy2.path : null

  let materialSpec = await bomItemSvc.getDropDownUuid(materialSpecName, 'material_spec',
    { parts_ctgy_1: category1Name, parts_ctgy_2: category2Name, material_spec: materialSpecName }, ctg2Path)

  let materialSpecPath = !_.isNull(materialSpec) && materialSpec.hasOwnProperty('path') ?
    materialSpec.path.includes(ctg2Path) ? materialSpec.path : null : null

  let material = null
  if (materialSpecPath) {
    material = await bomItemSvc.getDropDownUuid(materialName, 'material',
      { parts_ctgy_1: category1Name, parts_ctgy_2: category2Name, material_spec: materialSpecName, material: materialName }, materialSpecPath)
  }

  return {
    materialSpecPath: materialSpecPath,
    materialPath: !_.isNull(material) && material.hasOwnProperty('path') ?
      material.path.includes(materialSpecPath) ? material.path : null : null,
    ctg2Path: ctg2Path ? ctg2Path : null,
  }
}


module.exports = {
  Plastic,
  fetchPlasticMaterialPrice: async () => {
    let results = await plasticModel.fetchPlasticMaterialPrice()
    return databaseUtils.collateMaterialPrice(results)
  },

  linkPlasticMaterialPrice: async (materialId, materialName, materialSpecName, partCategory) => {
    try {
      let type = 'housing_plastic'
      let originMaterial = await plasticModel.getPartCategoryWithMaterial(type, materialId)

      let client = await new tsystemDB()
      for (let i = 0; i < partCategory.length; i++) {

        let originRes = _.chain(originMaterial)
          .filter(origin => origin.pc1_id == partCategory[i].category1Id)
          .map(d => {
            return {
              category2Id: d.pc2_id.toString(),
              category2Name: d.pc2_name,
            }
          })
          .value()

        logger.info('--start to upsert dropdown table and part_category_material table--')

        // 新的link 需要做 upsert
        let insertCategory2 = _.differenceBy(partCategory[i].category2, originRes, 'category2Id')
        logger.info('upsert Category2 to formula.part_category_material', insertCategory2)
        for (let k = 0; k < insertCategory2.length; k++) {
          // 檢查 part_category_material 中 是否已經有 此 material id, 用於 做 insert 還是update disable_time
          let isExist = await plasticModel.checkPartCategoryMaterial(materialId, insertCategory2[k])
          if (isExist == false) {
            logger.debug('insert category2 to table: part_category_material and Category2:', insertCategory2[k].category2Name)
            await plasticModel.linkPartCategoryMaterial(client, materialId, insertCategory2[k])
          } else {
            logger.debug('update distable time, table: part_category_material and Category2:', insertCategory2[k].category2Name)
            await plasticModel.updatePartCategoryMaterial(client, materialId, insertCategory2[k])
          }

          // dropdwon
          let { materialSpecPath, materialPath, ctg2Path } = await getMaterialSpecPath(partCategory[i].category1Name.toUpperCase(), insertCategory2[k].category2Name.toUpperCase(), materialSpecName.toUpperCase(), materialName.toUpperCase())
          logger.info(materialSpecPath, materialPath, ctg2Path)
          // DropDown 中 materialSpecName path 的名字
          let newMaterialSpecPath = await commonModel.getDropDownPath(materialSpecName, 'material_spec')
          let materialSpecPathName = newMaterialSpecPath ? newMaterialSpecPath.split('.')[2] : materialSpecName.toUpperCase()
          let materialSpecInsertPath = ctg2Path + '.' + materialSpecPathName

          if (_.isNull(materialSpecPath)) {
            // materialSpecPath 如果沒有這個路徑 PC1.PC2.MaterialSpecName insert path to dropdwon
            await commonModel.insertDropDown(client, 'material_spec', materialSpecName, materialSpecInsertPath)
          } else {
            // materialSpecPath 如果有這個路徑 PC1.PC2.MaterialSpecName update disable time = null
            await commonModel.updateDropDown(client, 'material_spec', materialSpecName, materialSpecInsertPath)
          }

          // DropDown 中 MaterialName path 的名字
          let newMaterialPath = await commonModel.getDropDownPath(materialName, 'material')
          let materialPathName = newMaterialPath ? newMaterialPath.split('.')[3] : materialName.toUpperCase()
          let materialInsertPath = ctg2Path + '.' + materialSpecPathName + '.' + materialPathName

          if(_.isNull(materialPath)) {
            // insert path to dropdwon
            await commonModel.insertDropDown(client, 'material', materialName, materialInsertPath)
          } else {
            await commonModel.updateDropDown(client, 'material', materialName, materialInsertPath)
          }
        }
        logger.info('--end to upsert--')

        logger.info('--start to update disable time to dropdown table and part_category_material table--')
        // 原本存在 part_category 中 link uncheck
        let removeCategory2 = _.differenceBy(originRes, partCategory[i].category2, 'category2Id')
        for (let k = 0; k < removeCategory2.length; k++) {
          // update disable time to table: part_category_material
          await plasticModel.unlinkPartCategoryMaterial(client, materialId, partCategory[i].category1Id, removeCategory2[k])

          // dropdown
          let { materialSpecPath, materialPath } = await getMaterialSpecPath(partCategory[i].category1Name.toUpperCase(), removeCategory2[k].category2Name.toUpperCase(), materialSpecName.toUpperCase(), materialName.toUpperCase())

          if(materialSpecPath) {
            // update disable time to dropdwon for material spec
            let count = await plasticModel.selectDropDown('material', materialSpecPath)

            if (count == 1) {
              await commonModel.updateDropDownDisable(client, 'material_spec', materialSpecName, materialSpecPath)
            }
          }

          if(materialPath) {
            // update disable time to dropdwon for material
            await commonModel.updateDropDownDisable(client, 'material', materialName, materialPath)
          }
        }
        logger.info('--end to update disable time--')
      }

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, linkPlasticMaterialPrice function', err)
      throw err
    }
  },
  postPlasticMaterialSpec: async (materialSpec, remark) => {
    try {

      let inoperable = databaseUtils.checkItemInoperable(materialSpec)
      if(inoperable) {
        logger.warn(`material spec: ${materialSpec} 不可被新增/刪除(封存) 項目`)
        throwApiError('F000113', errorCode.BAD_REQUEST)
      }

      let materialSpecExist = await plasticModel.checkPlasticMaterialSpec(materialSpec)
      if (materialSpecExist) {
        logger.warn(`duplicate material spec:${materialSpec}`)
        throwApiError('F000112', errorCode.BAD_REQUEST)
      }

      let client = await new tsystemDB()
      let materialSpecId = await plasticModel.addPlasticMaterialSpec(client, materialSpec, remark)

      let material = 'Other_Fill_ME_Remark'
      let materialValue = null
      await insertMaterial(client, materialSpecId, material, materialValue)

      // let materialId = await plasticModel.addPlasticMaterial(client, materialSpecId, material)

      // let partCateId = await plasticModel.addPartCateMaterial(client, materialId)

      // let formulaType = 'material'
      // let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)

      // await commonModel.addParameterValue(client, materialId, materialValue, scheduleList)

      await client.commit()
      return {
        materialSpecId: materialSpecId,
      }
    } catch (err) {
      logger.debug('Update table fail, postPlasticMaterialSpec function', err)
      throw err
    }
  },
  postPlasticMaterial: async (materialSpecId, material, materialValue) => {
    try {
      let inoperable = databaseUtils.checkItemInoperable(material)
      if(inoperable) {
        logger.warn(`material: ${material} 不可被新增/刪除(封存) 項目`)
        throwApiError('F000113', errorCode.BAD_REQUEST)
      }

      let materialExist = await plasticModel.checkPlasticMaterial(materialSpecId, material)
      if (materialExist) {
        logger.warn(`duplicate material: ${material}`)
        throwApiError('F000110', errorCode.BAD_REQUEST)
      }

      let client = await new tsystemDB()
      await insertMaterial(client, materialSpecId, material, materialValue)
      // let materialId = await plasticModel.addPlasticMaterial(client, materialSpecId, material)

      // let partCateId = await plasticModel.addPartCateMaterial(client, materialId)

      // let formulaType = 'material'
      // let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
      // await commonModel.addParameterValue(client, materialId, material_value, scheduleList)

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, postPlasticMaterial function', err)
      throw err
    }
  },
  //
  fetchSprayPaintCombinationList: async () => {
    let results = await plasticModel.fetchSprayPaintCombinationList()
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
  getPartCategory: async (material) => {
    let type = 'housing_plastic'

    let result = await commonModel.getPartCategoryByType(type)
    let materialRes = await plasticModel.getPartCategoryWithMaterial(type, material)
    let partCategory = databaseUtils.collatePartCategory(result, materialRes)

    return {
      partCategory,
    }
  },
  fetchPrintingProcessPrice: async (productTypeId) => {
    let results = await plasticModel.fetchPrintingProcessPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let printingProcessPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'printing_name': 'name',
    })

    return {
      date: dateFormat,
      printingProcessPriceList: printingProcessPriceList,
    }
  },

  putPrintingProcessPrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      let results = await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'next', 'plastic_printing', 'unit_price')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putPrintingProcessPrice function', err)
      throw err
    }
  },

  fetchEmbeddedPrice: async (productTypeId) => {

    let results = await plasticModel.fetchEmbeddedPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let embeddedPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'embed_nail_name': 'name',
      'remark': 'remark',
    })

    return {
      date: dateFormat,
      embeddedPriceList: embeddedPriceList,
    }
  },
  putEmbeddedPrice: async (nextId, items) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      let remark = await commonModel.modifyStringById(client, items, 'plastic_embed_nail', 'remark', 'remark')
      let price = await commonModel.modifyPriceByColumn(client, nextId, items, 'id', 'next', 'plastic_embed_nail', 'unit_price')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putEmbeddedPrice function', err)
      throw err
    }
  },

  fetchPaintBottomTop: async () => {
    let results = await plasticModel.fetchPaintBottomTop()
    return {
      paintBottomTopList: _.sortBy(results, 'paintBottomTopName'),
    }
  },
  fetchPlasticParameter: async (productTypeId) => {
    let results = await plasticModel.fetchPlasticParameter(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    // let plasticParameter = []
    let type_label = {
      'housing_plastic_material': '材料',
      'housing_plastic_molding': '成型',
      'housing_plastic_paint': '塗裝噴漆',
      'housing_plastic_secondary_processing': '二次加工',
      'housing_plastic_management_and_profit': '管銷利潤',
    }

    let plasticParameter = databaseUtils.collateParameter(type_label, results)

    return {
      date: dateFormat,
      plasticParameter: plasticParameter,
    }
  },
  getSprayPaintMachinePriceList: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('plastic_paint_machine', ['id', 'machine_name', 'disable_time'], 'id', 'housing_plastic', null)
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
      let result = await commonModel.modifyPrice(client, nextId, items, 'id')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySprayPaintMachinePriceList function', err)
      throw err
    }
  },
  fetchPaintTypePrice: async (type) => {
    let typColor = await plasticModel.fetchSprayPaintCombinationList(type)
    let results = await plasticModel.fetchPaintTypePrice(type)
    let priceDataList =_.chain(results).groupBy(res => res.type_color_bt_id).value()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let paintTypePriceList = []

    let vendorList = await plasticModel.fetchPaintVendor()
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
    let defaultRes = await plasticModel.fetchPaintFormulaPriceDefault()
    let queryRes = await plasticModel.fetchPaintFormulaPrice(paintId, vendorId, dateId)
    let paintFormulaPirce = []
    defaultRes.forEach((item) => {
      let matchDefault = queryRes.find((obj) => obj.label === item.label)
      paintFormulaPirce.push({
        key: item.label,
        label: item.label_name,
        fieldType: item.field_type,
        dataType: item.data_type,
        value: matchDefault ? matchDefault.value:item.value
      })
    })
    return {
      paintId,
      vendorId,
      paintFormulaPirce
    }
  },
  putPaintFormulaPrice: Plastic.putPaintFormulaPrice,
  fetchPaintVendor: async () => {
    let results = await plasticModel.fetchPaintVendor()

    return {
      paintVendor: _.sortBy(results, 'name'),
    }
  },
  putPaintVendor: async (items) => {
    try {
      let client = await new tsystemDB()
      let remark = await commonModel.modifyStringById(client, items, 'plastic_paint_vendor', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putPaintVendor function', err)
      throw err
    }
  },
  // 材料lossRate維護表
  getMaterialLossRate : async () => {
    let results = await plasticModel.getMaterialLossRate()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    results.forEach((l) => {
      l.value = l.value ? l.value * 100 : null
    })

    let materialLossRate = databaseUtils.formatMultiItemPriceData(
      results,
      'id',
      {
        'id': 'id',
        'item': 'item',
        'remark': 'remark',
      },
      'type_name',
      {
        'productTypeId': 'productTypeId',
      }
    )

    return{
      date: dateFormat,
      materialLossRate: materialLossRate,
    }
  },
  modifyMaterialLossRate: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      for(let i = 0; i < items.length; i++) {

        let reamrk = await commonModel.modifyStringById(client, items, 'plastic_material_loss_rate', 'remark', 'remark')
        let result = await plasticModel.modifyMaterialLossRate(client, nextId, items[i].id, items[i].productTypes)
      }

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMaterialLossRate function', err)
      throw err
    }
  },
  // 機台Module清單
  fetchMachineModule: async () => {
    let moduleList = await plasticModel.fetchMdouleList() // 取出module清單
    let results = await plasticModel.fetchMachineModule()
    let machineModelList = []
    let typeList = await productTypeModel.getProductType()

    moduleList.forEach((module) => {
      let model = {
        'moduleId':module.id,
        'moduleName': module.module_name,
        'remark': module.remark,
      }
      typeList.forEach((type) => {
        if (!model.hasOwnProperty(type.type_name)) {
          model[type.type_name] = {
            'productTypeId':type.id,
            'category2List':[],
          }
        }
      })
      machineModelList.push(model)
    })

    typeList.sort((a, b)=> a.id - b.id)
    _.chain(results)
      .groupBy(res => res.module_id)
      .map((data) => {
        let model = machineModelList.find((item) => item.moduleId === data[0].module_id)
        data.forEach((item) => {
          model[item.type_name].category2List.push({
            'id': item.category_id,
            'name':item.category_name,
          })
        })
      })
      .value()

    let category2ByType = await commonModel.getPartCategoryByType('housing_plastic')
    let category2All = []
    category2ByType.forEach((item) => {
      category2All.push({
        'id' :item.pc2_id,
        'name' :item.pc2_name,
      })
    })

    machineModelList.sort((a, b) => {
      let aNum = parseInt(a.moduleName.split('_')[1]) // module_105 => 105
      let bNum = parseInt(b.moduleName.split('_')[1])
      return aNum - bNum
    })
    return {
      'machineModule': machineModelList,
      'category2':category2All,
    }
  },
  // 檢查機台模組清單設定值
  checkMachineModule: async (machineModule) => {
    let moduleList = await plasticModel.fetchMdouleList() // 取出module清單
    let productTypeList = await productTypeModel.getProductType() // 取出產品類型清單
    let inputModuleList = new Map() // 輸入module清單
    let productCategory2List = new Map() // productType + category2 清單
    machineModule.forEach((module) => {
      if (inputModuleList.has(module.moduleId)) {
        logger.warn(`duplicate moduleId:${module.moduleId}`)
        throwApiError('F000101', errorCode.BAD_REQUEST)// module重複
      } else {
        inputModuleList.set(module.moduleId, 1) // 建立輸入module清單
      }
      let inputProductTypeList = new Map() // 輸入產品類型清單
      module.items.forEach((item) => {
        if (inputProductTypeList.has(item.productTypeId)) {
          logger.warn(`duplicate productTypeId:${item.productTypeId} in module:${module.moduleId}`)
          throwApiError('F000102', errorCode.BAD_REQUEST)// 產品類型重複
        } else {
          inputProductTypeList.set(item.productTypeId, 1)// 建立輸入產品類型清單
        }
        if (item.hasOwnProperty('category2List') === false) {
          throwApiError('no property category2List found in items', errorCode.BAD_REQUEST)
        }
        item.category2List.forEach((category2Id) => {
          let key = item.productTypeId + '--' + category2Id // 用 productType + category2 作為唯一key
          if (productCategory2List.has(key)) {// 檢查是否有已存在的key
            let exist = productCategory2List.get(key)
            logger.warn(`unable to set category2Id:${category2Id} in moduleId:${module.moduleId} productTypeId:${item.productTypeId}, already exist in moduleId:${exist.moduleId} productTypeId:${exist.productTypeId}`)
            throwApiError('F000100', errorCode.INSERT_DUPLICATE)
          } else {
            productCategory2List.set(key, {
              'moduleId': module.moduleId,
              'productTypeId':item.productTypeId,
              'category2Id': category2Id,
            }) // 註冊key
          }
        })
      })
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
  // 修改機台模組清單
  modifyMachineModule: async (machineModule) => {
    cacheHelper.flushAll()
    try {
      let client = await new tsystemDB()
      let moduleLength = machineModule.length
      for (let i = 0; i < moduleLength; i++) {
        let module = machineModule[i]
        if (module.remark){
          await plasticModel.modifyModuleRemark(client, module.moduleId, module.remark)
        }
        let itemLength = module.items.length
        for (let k = 0 ; k < itemLength ; k++ ) {
          let item = module.items[k]
          try {
            // 先 Disable 該區塊所有項目
            await plasticModel.disableMachineModule(client, item.productTypeId, module.moduleId)
          } catch (err) {
            logger.debug('Update table fail, disableMachineModule function', err)
            throw err
          }
          let category2Length = item.category2List.length
          for(let s = 0; s < category2Length ; s++) {
            let category2Id = item.category2List[s]
            try {
              /*
              再 設定 項目至 該區塊
              若項目已存在 更新建立時間
              */
              await plasticModel.upsertMachineModule(client, item.productTypeId, category2Id, module.moduleId)
            } catch (err) {
              logger.debug('Upsert table fail, upsertMachineModule function', err)
              throw err
            }
          }
        }
      }
      cacheHelper.flushAll()
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMachineModule function', err)
      throw err
    }
  },

  fetchMachineTonnesList: async () => {
    let results = await plasticModel.fetchMachineTonnesList()
    let modules = await plasticModel.fetchMdouleList()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let machineTonnesList = _.chain(results)
      .groupBy(res => res.machine_id)
      .map((data) => {
        let moduleList = {}
        let value = databaseUtils.getValueByDateFormat([])
        modules.forEach((module) => {
          moduleList[module.module_name] = {
            modulePlasticId: module.id,
            ...value,
          }
        })
        _.chain(data)
          .groupBy(res => res.module_id)
          .map((data) => {
            let moduleData = _.sortBy(_.uniqBy(data, 'activate_date'), 'activate_date')

            let value = databaseUtils.getValueByDateFormat(moduleData, 'value', 'activate_date')
            moduleList[moduleData[0].module_name] = {
              modulePlasticId: moduleData[0].module_id,
              ...value,
            }
          })
          .value()

        return {
          id: data[0].machine_id,
          ton: data[0].machine_ton,
          remark: data[0].remark,
          ...moduleList,
        }
      })
      .value()

    machineTonnesList.sort((a, b) => {
      return parseInt(a.ton) - parseInt(b.ton)
    })
    return {
      date: dateFormat,
      machineTonnesList: machineTonnesList,
    }
  },

  modifyMachineTonnes: async (nextId, machineTonnesList) => {
    // TODO 檢查是否為最新的 date
    try {
      let client = await new tsystemDB()
      for (let i = 0; i < machineTonnesList.length; i++) {
        let machine = machineTonnesList[i]
        // modify remark
        await plasticModel.modifyMachineTonnesString(client, machine)
        // modify price
        let modulesLength = machine.modules.length
        for(let k = 0 ; k < modulesLength ; k++) {
          let module = machine.modules[k]
          if (typeof module.next === 'number') {
            let parameterId = await plasticModel.getMachineTonnesParameterId(machine.id, module.modulePlasticId).catch((e) => {
              client.rollback()
              return null
            })
            if (parameterId) {
              await commonModel.insertPriceWithSourceName(client, parameterId, nextId, module.next, 'number', 'module_machine')
            } else {
              throwApiError(`can not find result in modulePlasticId:${module.modulePlasticId}`, errorCode.BAD_REQUEST)
            }
          }
        }
      }

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMachineTonnes function', err)
      throw err
    }
  },

  fetchPaintTypeColor: async () => {
    let results = await plasticModel.fetchPaintTypeColor()
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
  // 產品打磨費用明細
  getGrindingPriceList: async (productTypeId) => {
    let results = await plasticModel.getGrindingPriceList(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let grindingPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'item': 'item',
      'remark': 'remark',
    })

    return {
      date: dateFormat,
      grindingPriceList: grindingPriceList,
    }
  },
  fetchEmiSputteringList: async (productTypeId) => {
    let results = await plasticModel.fetchEmiSputteringList(productTypeId)
    let resLength = results.length
    for(let i = 0; i < resLength; i++){
      results[i].value = formatFloat(parseFloat(results[i].value), dbFloatPoint.get('emiSputtering'))
    }
    return {
      emiSputteringList: _.sortBy(results, 'label'),
    }
  },
  fetchEmiSputteringBase: async (productTypeId) => {
    let results = await plasticModel.fetchEmiSputteringBase(productTypeId)

    return {
      emiSputteringBaseList: _.sortBy(results, 'name'),
    }
  },

  fetchEmiSputteringPrice: async (siteGroupId, productTypeId) => {
    let results = await plasticModel.fetchEmiSputteringPrice(productTypeId, siteGroupId)
    results.sort((a, b) => parseFloat(a.size_name) - parseFloat(b.size_name))
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let emiSputteringPriceList = databaseUtils.formatMultiItemPriceData(
      results,
      'size_id',
      {
        'size_id': 'id',
        'size_name': 'name',
      },
      'base_name',
      {
        'id': 'sputteringId',
      }
    )

    return {
      date: dateFormat,
      emiSputteringPriceList: emiSputteringPriceList,
    }
  },
  modifyEmiSputteringPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      let result = await commonModel.modifyPrice(client, nextId, items, 'sputteringId')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyEmiSputteringPrice function', err)
      throw err
    }
  },
  fetchPaintManPowerHour: async () => {
    let price = await plasticModel.fetchPaintManPowerUnitPrice('usd_min')
    let manHours = await plasticModel.fetchPaintManPowerUnitPrice('man_hour')

    let dateFormat = databaseUtils.getDateFormat(price, 'activate_date', 'activation_date_id')
    let paintManPowerHourList = []

    _.chain(price)
      .groupBy(res => res.product_id)
      .map((infoData, key) => {
        let manHour = _.filter(manHours, (manHour) => manHour.product_id == key)
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
  modifyPaintManPowerHour: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      let price = await plasticModel.modifyPaintManPowerHourByColumn(client, nextId, items, 'price', 'usd_min')
      let manHour = await plasticModel.modifyPaintManPowerHourByColumn(client, nextId, items, 'manHour', 'man_hour')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putPaintTypePrice function', err)
      throw err
    }
  },
  // EMI Sputtering Site Group
  getEmiSputteringSiteGroupList: async (productTypeId) => {
    let results = await plasticModel.getEmiSputteringSiteGroupList(productTypeId)
    let emiSputteringSiteGroupList = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data, key) => {
        let siteList = []
        _.chain(data)
          .map((d, k) => {
            siteList.push({
              siteId: d.siteId,
              siteName: d.siteName,
            })
          })
          .value()
        emiSputteringSiteGroupList.push({
          id: data[0].id,
          siteList,
        })
      })
      .value()
    return {
      emiSputteringSiteGroupList,
    }
  },
  // EMI Site Group 下拉
  getEmiSiteGroupList: async (productTypeId) => {
    let results = await plasticModel.getEmiSputteringSiteGroupList(productTypeId)
    let emiSiteGroupList = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data, key) => {
        let siteList = []
        _.chain(data)
          .map((d, k) => {
            siteList.push(d.siteName)
          })
          .value()
        siteList = siteList.toString()
        siteList = siteList.replace(/,/g, '/')
        emiSiteGroupList.push({
          id: data[0].id,
          siteList,
        })
      })
      .value()

    return {
      emiSiteGroupList,
    }
  },
  fetchPaintManPowerPrice: async (productTypeId) => {
    let results = await plasticModel.fetchPaintManPowerPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let paintManPowerPriceList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'category_name': 'name',
    })

    let priceByProductId = await plasticModel.fetchPaintManPowerUnitPrice('usd_min', productTypeId)
    let manHourByProductId = await plasticModel.fetchPaintManPowerUnitPrice('man_hour', productTypeId)

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
  modifyPaintManPowerPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      let res = await commonModel.modifyPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyPaintManPowerPrice function', err)
      throw err
    }
  },
  modifyMaterialSpec: async (items) => {
    try {
      let client = await new tsystemDB()
      let res = await plasticModel.modifyMaterialSpec(client, items)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMaterialSpec function', err)
      throw err
    }
  },
  modifyGrindingPrice: async (nextId, grindingPriceList) => {
    try {
      let client = await new tsystemDB()
      let res = await plasticModel.modifyGrindingPrice(client, nextId, grindingPriceList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyGrindingPrice function', err)
      throw err
    }
  },
  modifySputteringList: async (items) => {
    try {
      let client = await new tsystemDB()
      let res = await plasticModel.modifySputteringList(client, items)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySputteringList function', err)
      throw err
    }
  },
  modifyEmiSputteringSiteGroup: async (items, productTypeId) => {
    cacheHelper.flushAll()
    try {
      let client = await new tsystemDB()
      let res = await plasticModel.modifyEmiSputteringSiteGroup(client, items, productTypeId)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifySputteringList function', err)
      throw err
    }
  },
  // archive Plastic & Rubber共同維護料的話  "不需要" 將Rubber 的料也要一起 archive
  archivePlasticMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await plasticModel.archivePlasticMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archivePlasticMaterial function', err)
      throw err
    }
  },
  unblockPlasticMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await plasticModel.unblockPlasticMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockPlasticMaterial function', err)
      throw err
    }
  },
  // archive Plastic & Rubber 共同維護料的話 "不需要" 將Rubber 的料也要一起 archive
  archivePlasticMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await plasticModel.archivePlasticMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archivePlasticMaterialSpec function', err)
      throw err
    }
  },
  unblockPlasticMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await plasticModel.unblockPlasticMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockPlasticMaterialSpec function', err)
      throw err
    }
  },
}
