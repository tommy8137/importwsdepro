const _ = require('lodash')
const moment = require('moment')
const diecutModel = require('../../model/database/diecut.js')
const commonModel = require('../../model/database/common.js').Common
const commonService = require('../../service/database/common.js')

const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const fileUtils = require('../../utils/importExcel/fileUtils.js')
const { isNumber, asyncForEach } = require('../../helpers/utils')
const UUID = require('uuid/v4')
const path = require('path')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Diecut Service')

const NodeCache = require( 'node-cache' )
const uploadCache = new NodeCache({ stdTTL: 600, checkperiod: 30 })
const { Excel } = require('../../utils/dataFrame/excel')
const exportKey = {
  mylar: 'Mylar_of_Mylar_Sponge_Poron',
  absorber: 'Absorber',
  acetateTape: 'Acetate_Tape_of_Mylar_Sponge_Poron',
  adhesive: 'Adhesive_of_Mylar_Sponge_Poron',
  alCuFoil: 'Al_Cu_Foil',
  conductiveTape: 'Conductive_Tape',
  gasket: 'Gasket',
  nonWoven: 'Non_Woven_of_Mylar_Sponge_Poron',
  protectionFilm: 'Protection_Film_of_Mylar_Sponge_Poron',
  sponge: 'Sponge_of_Mylar_Sponge_Poron',
}

class Diecut {
  static async postDiecutMaterial(client, materialSpecId, material, materialValue) {

    try {
      let inoperable = databaseUtils.checkItemInoperable(material)
      if(inoperable) {
        logger.warn(`material: ${material} 不可被新增/刪除(封存) 項目`)
        throwApiError('F000113', errorCode.BAD_REQUEST)
      }

      let materialExist = await diecutModel.checkDiecutMaterial(materialSpecId, material)
      if (materialExist) {
        logger.warn(`duplicate material: ${material}, material Spec id: ${materialSpecId}`)
        throwApiError('F000110', errorCode.BAD_REQUEST)
      }

      let materialId = await insertMaterial(client, materialSpecId, material, materialValue)
      return {
        materialId: materialId,
      }
    } catch (err) {
      logger.debug('Update table fail, postDiecutMaterial function', err)
      throw err
    }
  }

  static async postDiecutMaterialSpec(client, partCategory2Id, materialSpec, remark) {

    let inoperable = databaseUtils.checkItemInoperable(materialSpec)
    if(inoperable) {
      logger.warn(`material spec: ${materialSpec} 不可被新增/刪除(封存) 項目`)
      throwApiError('F000113', errorCode.BAD_REQUEST)
    }

    let materialSpecExist = await diecutModel.checkDiecutMaterialSpec(materialSpec)
    if (materialSpecExist) {
      logger.warn(`duplicate material spec:${materialSpec}`)
      throwApiError('F000112', errorCode.BAD_REQUEST)
    }

    try {

      let materialSpecId = await diecutModel.addDiecutMaterialSpec(client, materialSpec, remark)
      await diecutModel.addMaterialSpecPartCate2(client, partCategory2Id, materialSpecId)

      let partCate2List = await diecutModel.fetchDiecutPartCategory()
      let partCate2Info = _.find(partCate2List, (partCate2) => partCate2.partCategory2Id == partCategory2Id)

      let commonPartCate2Name = null
      if (partCate2Info.partCategory2Name.toUpperCase() == 'CU_FOIL') {
        commonPartCate2Name = 'AL_CU_FOIL'
      } else if (partCate2Info.partCategory2Name.toUpperCase() == 'AL_CU_FOIL') {
        commonPartCate2Name = 'CU_FOIL'
      }

      if (commonPartCate2Name) {
        let commonPartCate2 = _.find(partCate2List, (partCate2) => partCate2.partCategory2Name.toUpperCase() == commonPartCate2Name)
        if (commonPartCate2) {
          await diecutModel.addMaterialSpecPartCate2(client, commonPartCate2.partCategory2Id, materialSpecId)
        }
      }

      let material = 'Other_Fill_ME_Remark'
      let materialValue = null
      await insertMaterial(client, materialSpecId, material, materialValue)

      // await client.commit()
      return {
        materialSpecId: materialSpecId,
      }
    } catch (err) {
      // await client.rollback()
      logger.debug('Update table fail, postDiecutMaterialSpec function', err)
      throw err
    }
  }
}
const insertMaterial = async (client, materialSpecId, material, materialValue) => {
  let materialSpecInfo = await diecutModel.checkDiecutMaterialSpecById(materialSpecId)
  let materialId = await diecutModel.addDiecutMaterial(client, materialSpecId, material, materialSpecInfo.disable_time)

  let formulaType = 'material'
  let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
  let sourceTable = 'diecut_material'
  await commonModel.addParameterValue(client, materialId, materialValue, scheduleList, sourceTable)

}
module.exports = {
  Diecut,
  fetchMaterialSizeAdderPrice: async () => {
    let results = await diecutModel.fetchMaterialSizeAdderPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let result = _.chain(results)
      .groupBy((priceInfo)=>priceInfo.id)
      .map((subPriceList, id)=>{
        let adderPriceData = _.sortBy(_.uniqBy(subPriceList, 'activate_date'), 'activate_date')
        let adderPriceValue = databaseUtils.getValueByDateFormat(adderPriceData, 'value', 'activate_date')
        return {
          id: id,
          size: `${subPriceList[0].size_begin} < size <= ${subPriceList[0].size_end}`,
          disable: subPriceList[0].disable_time ? true : false,
          ...adderPriceValue,
        }
      }).value()
    return {
      date: dateFormat,
      materialSizeAdderPrice: result,
    }
  },
  modifyMaterialSizeAdderPrice: async (nextId, materialSizeAdderPriceList)=>{
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, materialSizeAdderPriceList, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMaterialSizeAdderPrice function', err)
      throw err
    }
  },
  fetchTypePrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues(
      'diecut_type',
      ['id', 'type_name', 'disable_time'],
      'id',
      'die_cut'
    )
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let typePrice = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data) => {
        let sortedData = _.sortBy(_.uniqBy(data, 'activate_date'), 'activate_date')
        let values = databaseUtils.getValueByDateFormat(sortedData, 'value', 'activate_date')
        typePrice.push({
          id: data[0].id,
          name: data[0].type_name,
          ...values,
          disable: data[0].disable_time !== null,
        })
      })
      .value()
    return {
      date: dateFormat,
      typePrice: typePrice,
    }
  },
  modifyTypePrice: async (nextId, typePrice) => {
    try {
      let client = await new tsystemDB()
      let typePriceLength = typePrice.length
      for (let i = 0; i < typePriceLength; i++) {
        let item = typePrice[i]
        await commonModel.insertPriceWithSourceName(client, item.id, nextId, item.next, 'number', 'diecut_type')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyTypePrice function', err)
      throw err
    }
  },
  fetchAreaTimesPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues(
      'diecut_area_times',
      ['id', 'area_size', 'disable_time'],
      'id',
      'die_cut'
    )
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let areaTimesPrice = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data) => {
        let sortedData = _.sortBy(_.uniqBy(data, 'activate_date'), 'activate_date')
        let values = databaseUtils.getValueByDateFormat(sortedData, 'value', 'activate_date')
        areaTimesPrice.push({
          id: data[0].id,
          areaSize: `材料面積 <= ${data[0].area_size}`,
          ...values,
          disable: data[0].disable_time !== null,
        })
      })
      .value()
    return {
      date: dateFormat,
      areaTimesPrice: areaTimesPrice,
    }
  },
  modifyAreaTimesPrice: async (nextId, areaTimesPrice) => {
    try {
      let client = await new tsystemDB()
      let areaTimesPriceLength = areaTimesPrice.length
      for (let i = 0; i < areaTimesPriceLength; i++) {
        let item = areaTimesPrice[i]
        await commonModel.insertPriceWithSourceName(client, item.id, nextId, item.next, 'number', 'diecut_area_times')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyAreaTimesPrice function', err)
      throw err
    }
  },
  fetchDiecutMaterialPrice: async () => {
    let results = await diecutModel.fetchDiecutMaterialPrice()
    return databaseUtils.collateMaterialPrice(results)
  },
  // ---Material Price Material Spec---
  fetchDiecutPartCategory: async () => {
    let results = await diecutModel.fetchDiecutPartCategory()
    return results
  },
  exportDiecutMaterialPrice: async (sheetData, commonData) => {
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}/${commonData.filePath}.xlsx`)
    let excelYmlPath = path.join('database-diecut', 'excel-diecut.yaml')
    let partCate2List = await diecutModel.fetchDiecutPartCategory()

    let diecutData = []
    _.map(sheetData.dieCutInitData.materialPriceList, (value, idx) => {
      _.map(value.subMaterial, (subValue, ddx) => {
        if(!subValue.disable) {
          diecutData.push(subValue)
        }
      })
      diecutData.push({
        id: value.id,
        type2Id: value.type2Id,
        materialSpec: '',
        material: '',
        disable: false,
        last: null,
        current: null,
        next: null
      })
    })
    let mapObj = {}
    _.map(partCate2List, (i, idx) => {
      mapObj[`${i.partCategory2Name}`] = i.partCategory2Id
    })


    let rawData = {
      mylar: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['mylar']}`] }),
      absorber: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['absorber']}`] }),
      acetateTape: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['acetateTape']}`] }),
      adhesive: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['adhesive']}`] }),
      alCuFoil: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['alCuFoil']}`] }),
      conductiveTape: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['conductiveTape']}`] }),
      gasket: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['gasket']}`] }),
      nonWoven: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['nonWoven']}`] }),
      protectionFilm: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['protectionFilm']}`] }),
      sponge: _.filter(diecutData, { 'type2Id': mapObj[`${exportKey['sponge']}`] }),
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)

  },
  modifyMaterialSpec: async (items) => {
    try {
      let client = await new tsystemDB()
      let res = await commonModel.modifyStringById(client, items, 'diecut_material_spec', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMaterialSpec function', err)
      throw err
    }
  },
  postDiecutMaterialSpec: Diecut.postDiecutMaterialSpec,
  archiveDiecutMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await diecutModel.archiveDiecutMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveDiecutMaterialSpec function', err)
      throw err
    }
  },
  unblockDiecutMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await diecutModel.unblockDiecutMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockDiecutMaterialSpec function', err)
      throw err
    }
  },
  // ---Material Price Material---
  postDiecutMaterial: Diecut.postDiecutMaterial,
  archiveDiecutMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await diecutModel.archiveDiecutMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveDiecutMaterial function', err)
      throw err
    }
  },
  unblockDiecutMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await diecutModel.unblockDiecutMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockDiecutMaterial function', err)
      throw err
    }
  },

  fetchDiecutParameter: async () => {
    let results = await diecutModel.fetchDiecutParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'die_cut_main_material': '材料',
      'die_cut_single_printing': '印刷',
      'die_cut_secondary_processing': '二次加工',
      'die_cut_management_and_profit': '管銷利潤',
      'die_cut_machine': '沖切加工',
    }
    let diecutParameter = databaseUtils.collateParameter(type_label, results)
    return {
      date: dateFormat,
      diecutParameter,
    }
  },
  fetchReleasePaperPrice: async ()=>{
    let results = await commonModel.fetchSingleTableParameterValues('diecut_release_paper', ['id', 'paper_name', 'disable_time'], 'id', 'die_cut')
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let result = _.chain(results)
      .groupBy((priceInfo)=>priceInfo.id)
      .map((subPriceList, id)=>{
        let adderPriceData = _.sortBy(_.uniqBy(subPriceList, 'activate_date'), 'activate_date')
        let adderPriceValue = databaseUtils.getValueByDateFormat(adderPriceData, 'value', 'activate_date')
        return {
          id: id,
          name: subPriceList[0].paper_name,
          disable: subPriceList[0].disable_time ? true : false,
          ...adderPriceValue,
        }
      }).value()
    return {
      date: dateFormat,
      releasePaperPrice: result,
    }
  },
  modifyPutReleasePaperPrice: async (nextId, releasePaperPriceList) =>{
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, releasePaperPriceList, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyPutReleasePaperPrice function', err)
      throw err
    }
  },
  // ---upload material price by excel
  prepareDataFromExcel: async (file, sheetList) => {
    let fileUtil = new fileUtils()
    const numberLength = 8

    let dataBySheet = {}
    for(let i = 0; i < sheetList.length; i++) {
      let { rawData } = await fileUtil.prepareData(file, sheetList[i], numberLength)
      if(rawData.length > 0){
        dataBySheet[sheetList[i]] = rawData
      }
    }
    return dataBySheet
  },
  sortOutData: async(dataSet, partCateList) => {
    let perpareArr = []

    _.forEach(Object.keys(dataSet), (key) => {
      for (const data of dataSet[key]) {
        if (data['MaterialSpec'] && data['Material'] && data['PriceUSD/m2']) {
          let obj = {}
          obj.sheetName = key
          obj.partCategory2Name = partCateList[key]
          obj.materialSpec = data['MaterialSpec'] ? data['MaterialSpec'] : null
          obj.material = data['Material'] ? data['Material'] : null
          obj.next = data['PriceUSD/m2'] ? data['PriceUSD/m2'] : null
          obj.newName = data['Modify'] ? data['Modify'] : null

          perpareArr.push(obj)
        }
      }
    })
    return perpareArr
  },
  confirmSheetContrast: async(sortData, partCateList) => {
    let partCate2List = await diecutModel.fetchDiecutPartCategory()
    try {
      _.forEach(sortData, (data, idx) => {

        let type2 = _.find(partCate2List, (item) => item.partCategory2Name == partCateList[data.sheetName])
        if (_.isNil(type2)) {
          logger.debug(`cant find this ${data.partCategory2Name} partCategory2Name`)
          throwApiError('F000201', errorCode.BAD_REQUEST)
          return
        }
        data.partCategory2Id = type2.partCategory2Id
      })
    } catch(error) {
      logger.debug('confirmSheetContrast error', error)
      throw error
    }
  },
  confirmData: async(sortData) => {
    let failMessage = []
    let failCount = 0
    let uuid = UUID()
    let materialSpecList = await diecutModel.fetchDiecutMaterialSpecList()
    let materialList = await diecutModel.fetchDiecutMaterialList()

    _.forEach(sortData, (data, idx) => {
      data.uploadId = uuid
      try {
        if (!data.materialSpec || !data.material) {
          throw new Error('F000207')
        }

        // 檢查價格是否是null
        if ((data.material != 'Other_Fill_ME_Remark' && data.next == null) || (data.material != 'Other_Fill_ME_Remark' && isNumber(data.next) == false )) {
          throw new Error('F000205')
        }

        // logger.debug('sortOutData: ', data.materialSpec, data.material)
        let materialSpec = checkMaterialSpecId(materialSpecList, data)

        // 檢查在系統 material spec 中是否 有此 Material, 如果有此Material 代表要update price, 沒有則需要新增Material
        let material = _.find(materialList, (material) => materialSpec &&
          material.materialSpecId == materialSpec.materialSpecId &&
          material.materialName.toUpperCase() == data.material.toUpperCase())

        // material 需要新增
        if(_.isNil(material)) {
          logger.debug('sheetName', data.sheetName, 'material 需要新增 ', data.materialSpec, data.material)
          data.materialId = null

          // 檢查在excel中 同一個 material spec 是否有重複 material 需要新增
          let materialExistExcel = _.filter(sortData, (sd) => sd.materialSpec.toUpperCase() == data.materialSpec.toUpperCase() &&
          sd.material.toUpperCase() == data.material.toUpperCase())
          if (materialExistExcel.length >= 2) {
            throw new Error('F000204')
          }
        } else {
          data.materialId = material.materialId
        }

        // Material 更名
        if(data.newName != null) {
          // 檢查在系統 同一個 material spec 中 Material 會不會改名後 在系統有相同名字
          let materialExistDatabase = _.find(materialList, (material) => materialSpec &&
            material.materialSpecId == materialSpec.materialSpecId &&
            material.materialName.toUpperCase() == data.newName.toUpperCase())

          if (materialExistDatabase) {
            throw new Error('F000202')
          }

          // 檢查在excel 同一個 material spec 中 Material 會不會改名後 在系統有相同名字
          let materialExistExcel = _.find(sortData, (sd) => sd.materialSpecId == data.materialSpecId &&
            sd.materialId != data.materialId &&
            // excel material 與 更名後相同
            ((sd.material.toUpperCase() == data.newName.toUpperCase() && sd.material.newName == null) ||
            (sd.newName && sd.newName.toUpperCase() == data.newName.toUpperCase())))

          if (materialExistExcel) {
            throw new Error('F000203')
          }
        }

        data.pass = true

      } catch (err) {
        data.pass = false
        failCount++
        failMessage.push({
          errorCode: err.message,
          sheetName: data.sheetName,
          materialSpec: data.materialSpec,
          material: data.material,
          modify: data.newName,
          price: data.next,
        })
      }
    })

    if(failCount === 0){
      await diecutModel.insertUploadData(sortData)
      // uploadCache.set(uuid, sortData)
    }

    return {
      uploadId: uuid,
      failMessage,
      failCount,
    }
  },
  getInsertData: async(uploadId) => {
    try {
      // let uploadData = uploadCache.get(uploadId)
      let uploadData = await diecutModel.getUploadData(uploadId)
      if(uploadData.length <= 0){
        throw new Error('F000206')
      }
      return uploadData
    } catch (error) {
      logger.debug('getInsertData error', error)
      throw error
    }
  },
  deleteUploadData: async(uploadId) => {
    let client = await new tsystemDB()
    try {
      await diecutModel.deleteOldUploadData(client, uploadId)
      await client.commit()
    } catch (error) {
      await client.rollback()
      logger.debug('deleteUploadData error', error)
      throw error
    }
  },
  insertMaterialPrice: async(dataSet) => {
    let client = await new tsystemDB()
    try {

      // 新增 material Spec
      let addMaterialList = await multipleInsertMaterialSpec(client, dataSet)
      // 新增 material
      await multipleInsertMaterial(client, addMaterialList)

      await client.commit()
    } catch (error) {
      await client.rollback()
      throw error
    }
  },
  updateMaterialPrice: async(dataSet) => {
    let client = await new tsystemDB()
    try {
      // schelude new 必須要先 新增(覆蓋)未來的日期
      let nextDate = moment(Date().now).add(1, 'day').format('YYYY-MM-DD')
      logger.debug('schelude new', nextDate)
      await commonService.scheduleNewByFormulaType('material', nextDate, '1')

      // update price
      await multipleUpdateMaterialPrice(client, dataSet)
      // 更名
      await multipleUpdateMaterialName(client, dataSet)

      await client.commit()
      return
    } catch (error) {
      await client.rollback()
      throw error
    }
  },
}
const checkMaterialSpecId = (materialSpecList, data) => {
  let materialSpec = _.find(materialSpecList, (spec) => spec.materialSpecName.toUpperCase() == data.materialSpec.toUpperCase() && spec.partCategory2Id == data.partCategory2Id)
  // material spec 需要新增
  if (_.isNil(materialSpec)) {
    logger.debug('sheetName', data.sheetName, 'material spec 需要新增 ', data.materialSpec)
    data.materialSpecId = null
  } else {
    data.materialSpecId = materialSpec.materialSpecId
  }
  return materialSpec
}
/**
 * 多筆更新 Material Price by materialId
 */
const multipleUpdateMaterialPrice = async(client, dataSet) => {
  try{
    let lastestDate = await diecutModel.getLastestScheduleDateId()

    // 需要update price 與material Name的資料, 去除需要新增Material Spec, Material的資料
    let updateData = _.filter(dataSet, (data) => data.materialSpecId != null && data.materialId != null && data.next != null)
    logger.debug('multipleUpdateMaterialPrice: nextDateId', lastestDate.activation_date_id, 'by materialId')

    await commonModel.modifyPrice(client, lastestDate.activation_date_id, updateData, 'materialId')
  } catch(err) {
    logger.debug('multipleUpdateMaterialPrice error', err)
    throw err
  }

}

/**
 * 多筆更新 Material 名稱 by materialId
 */
const multipleUpdateMaterialName = async(client, dataSet) => {
  try{
    let updateMaterialNameList = _.filter(dataSet, (data) => data.materialSpecId != null && data.materialId != null && data.newName != null)

    // 檢查 改名後 是否有相同的名字
    logger.debug('multipleUpdateMaterialName')
    await diecutModel.updateMaterialName(client, updateMaterialNameList)
  } catch(err) {
    logger.debug('multipleUpdateMaterialName error', err)
    throw err
  }
}
/**
 * 多筆新增 Material Spec by partCategory2Id
 * @param {*} dataSet ex: [{
    partCategory2Name: 'Mylar_of_Mylar_Sponge_Poron',
    materialSpec: 'T0.05Mylar',
    material: 'DFR117-1',
    next: 0.19853,
    newName: '透明PET',
    partCategory2Id: '73fdbb10-5a91-11e9-8606-0242ac110002',
    materialSpecId: null,
    materialId: null },
  }]
 */
const multipleInsertMaterialSpec = async(client, dataSet) => {

  try {
    // 下一個要新增Material 步驟的list
    let addMaterialList = _.filter(dataSet, (data) => data.materialSpecId != null && data.materialId == null)

    // materialSpecId 為空，代表在系統內 沒有這個 materialSpec
    let addMaterialSpecList = _.filter(dataSet, (data) => data.materialSpecId == null)
    let materialSpecGroupBy = _.groupBy(addMaterialSpecList, (item) => item.partCategory2Id + '-' + item.materialSpec)
    let groupByKey = Object.keys(materialSpecGroupBy)

    for(let i = 0 ; i < groupByKey.length; i++){
      let insertMaterialSpec = materialSpecGroupBy[groupByKey[i]][0]

      logger.debug('insert Material Spec: ', insertMaterialSpec.partCategory2Name, insertMaterialSpec.partCategory2Id, insertMaterialSpec.materialSpec)
      let materialSpec = await Diecut.postDiecutMaterialSpec(client, insertMaterialSpec.partCategory2Id, insertMaterialSpec.materialSpec)

      // materialSpecId 為空, 代表 Material 也是新的 需要做新增, 所以push 到addMaterialSpecList中
      _.forEach(materialSpecGroupBy[groupByKey[i]], (item) => item.materialSpecId = materialSpec.materialSpecId)
      addMaterialList.push(...materialSpecGroupBy[groupByKey[i]])
    }
    return addMaterialList
  } catch(error) {
    logger.debug('multipleInsertMaterialSpec error', error)
    throw error
  }
}
/**
 * 多筆新增 Material by material Spec id
 * @param {*} addMaterialList ex: [{
    partCategory2Name: 'Mylar_of_Mylar_Sponge_Poron',
    materialSpec: 'T0.05Mylar',
    material: 'DFR117-1',
    next: 0.19853,
    newName: '透明PET',
    partCategory2Id: '73fdbb10-5a91-11e9-8606-0242ac110002',
    materialSpecId: 'cc42463e-0756-11ea-aac6-0242ac110002',
    materialId: null },
  }]
 */
const multipleInsertMaterial = async(client, addMaterialList) => {
  try {
    for(let i = 0 ; i < addMaterialList.length; i++) {
      // 使用 newName 來新增 Material
      let insertMaterialName = addMaterialList[i].newName ? addMaterialList[i].newName : addMaterialList[i].material

      if(insertMaterialName == 'Other_Fill_ME_Remark') continue
      logger.debug('insert Material: ', addMaterialList[i].materialSpec, addMaterialList[i].materialSpecId, insertMaterialName, addMaterialList[i].next)

      let material = await Diecut.postDiecutMaterial(client, addMaterialList[i].materialSpecId, insertMaterialName, addMaterialList[i].next)
      addMaterialList[i].materialId = material.materialId
    }

    return addMaterialList
  } catch(error) {
    logger.debug('multipleInsertMaterial error', error)
    throw error
  }
}
