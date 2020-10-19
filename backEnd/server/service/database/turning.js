const _ = require('lodash')
const moment = require('moment')
const turningModel = require('../../model/database/turning.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Turning Service')
const cacheHelper = require('../../utils/helper/cacheHelperDaily')// singleton

class Turning {
  static async modifyTurningNutType(client, materialId, nutTypeId){
    try {
      let exist = turningModel.checkNutByMaterialId(materialId)
      if (!exist) throw Error('material have not Nut part category')

      await turningModel.modifyTurningNutType(client, materialId, nutTypeId)
      return {
        materialId: materialId,
        nutTypeId: nutTypeId,
      }
    } catch (err) {
      logger.debug('Update table fail, modifyTurningNutType function', err)
      throw err
    }
  }
}

const volumeByBeginEndValue = (items, VOLUME_DESCRIPTION, mappingKey) => {
  items.map(item =>{

    if(item[mappingKey.begin] <= 0 && item[mappingKey.end] > 0){
      item[mappingKey.key] = `${VOLUME_DESCRIPTION} < ${item[mappingKey.end]}`
    } else if(item[mappingKey.begin] > 0 && item[mappingKey.end] <= 0){
      item[mappingKey.key] = `${item[mappingKey.begin]} < ${VOLUME_DESCRIPTION}`
    } else if (item[mappingKey.begin] > 0 && item[mappingKey.end] > 0){
      item[mappingKey.key] = `${item[mappingKey.begin]} <= ${VOLUME_DESCRIPTION} <= ${item[mappingKey.end]}`
    } else {
      item[mappingKey.key] = null
    }
    return item
  })
}

module.exports = {
  Turning,
  // -- Turning Parameters --
  fetchTurningParameter: async () => {
    let results = await turningModel.fetchTurningParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let type_label = {
      'me_others_screw_molding': '成型費',
      'me_others_screw_second_process': '加工費',
      'me_others_screw_management_and_profit': '管銷利潤',
    }

    let turningParameter = databaseUtils.collateParameter(type_label, results)

    return {
      date: dateFormat,
      turningParameter,
    }
  },

  // -- 牙徑清單 --
  fetchDiameter: async () => {
    let results = await turningModel.fetchDiameter()

    return {
      items: results,
    }
  },
  modifyDiameter: async (items) => {
    cacheHelper.flushAll()
    try {
      let client = await new tsystemDB()
      await turningModel.modifyDiameter(client, items)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyDiameter function', err)
      throw err
    }
  },

  // -- 加工費 熱處理 單位費用 --
  fetchHeatTreatmentPrice: async () => {
    let results = await turningModel.fetchHeatTreatmentPrice()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'material_name': 'item',
    })

    return {
      date: dateFormat,
      heatTreatmentPrice: result,
    }
  },

  // -- 加工費 電鍍 單位費用 --
  fetchPlatingPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('turning_plating', ['id', 'plating_name', 'disable_time'], 'id', 'me_others_screw')
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'plating_name': 'item',
    })

    return {
      date: dateFormat,
      platingPrice: result,
    }
  },

  // -- Turning Material Price --
  fetchTurningMaterialPrice: async () => {
    let results = await turningModel.fetchTurningMaterialPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatSigleTablePriceData(results, 'mappingId', {
      'materialId': 'id',
      'materialName': 'item',
      'density': 'density',
      'partCategory2Name': 'partCategory2Name',
      'partCategory2Id': 'partCategory2Id',
      'nutTypeName': 'nutType',
      'materialDisable': 'disable',
    })

    return {
      date: dateFormat,
      materialPriceList: _.map(result, r => _.omit(r, ['mappingId'])),
    }
  },
  fetchTurningPartCategory: async () => {
    let results = await turningModel.fetchTurningPartCategory()
    return results
  },
  fetchTurningNutType: async () => {
    let results = await turningModel.fetchTurningNutType()
    return results
  },
  fetchTurningMaterialPartCate: async () => {
    let results = await turningModel.fetchTurningMaterialPartCate()
    return results
  },
  modifyTurningNutType: Turning.modifyTurningNutType,
  postTurningMaterial: async (partCate2IdList, material, nutTypeId, density, materialValue) => {
    let client = await new tsystemDB()

    try {
      let materialId = await turningModel.getMaterialId(material)

      // materialId不存在, 新的material 需要新增material與價格
      if (!materialId) {
        materialId = await turningModel.addTurningMaterial(client, material, density)

        let formulaType = 'material'
        let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
        let sourceTable = 'turning_material'
        await commonModel.addParameterValue(client, materialId, materialValue, scheduleList, sourceTable)
      }

      await turningModel.addTurningMaterialMapping(client, partCate2IdList, materialId)

      // update Nut material 的 nut type
      let exist = await turningModel.checkNutByPartCate2List(partCate2IdList)
      if (exist && nutTypeId == null) {
        let nutTypeList = await turningModel.fetchTurningNutType()
        nutTypeId = nutTypeList[0].nutTypeId
      }

      if (exist) {
        await Turning.modifyTurningNutType(client, materialId, nutTypeId)
      }

      await client.commit()
      return {
        materialId: materialId,
      }
    } catch (err) {
      await client.rollback()
      logger.debug('Update table fail, postTurningMaterial function', err)
      throw err
    }
  },
  archiveTurningMaterial: async (materialList) => {
    try {
      if (materialList.length <= 0) throw Error('material list length <= 0')

      let client = await new tsystemDB()
      await turningModel.archiveTurningMaterial(client, materialList)
      await client.commit()

    } catch (err) {
      logger.debug('Update table fail, archiveTurningMaterial function', err)
      throw err
    }
  },
  unblockTurningMaterial: async (materialList) => {
    try {
      if (materialList.length <= 0) throw Error('material list length <= 0')

      let client = await new tsystemDB()
      await turningModel.unblockTurningMaterial(client, materialList)
      await client.commit()

    } catch (err) {
      logger.debug('Update table fail, unblockTurningMaterial function', err)
      throw err
    }
  },
  // -- 加工費 耐落 --
  fetchNylokPrice: async () => {
    let results = await turningModel.fetchNylokPrice()

    volumeByBeginEndValue(results, 'M', {
      begin: 'diameter_begin',
      end: 'diameter_end',
      key: 'diameter',
    })
    volumeByBeginEndValue(results, 'L', {
      begin: 'length_begin',
      end: 'length_end',
      key: 'length',
    })

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'material_name': 'material',
      'color_name': 'color',
      'diameter': 'diameter',
      'length': 'length',
    })

    return {
      date: dateFormat,
      nylokPrice: result,
    }
  },

}

