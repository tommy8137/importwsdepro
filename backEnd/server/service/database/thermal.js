const _ = require('lodash')
const thermalModel = require('../../model/database/thermal.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Thermal Service')

class Thermal {

}
module.exports = {
  Thermal,
  fetchFanBaselinePrice: async () => {
    let results = await thermalModel.fetchFanBaselinePrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let fanBaselinePrice = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'fan_size': 'fanSize',
    })

    return {
      date: dateFormat,
      fanBaselinePrice: fanBaselinePrice,
    }
  },
  modifyFanBaselinePrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, items, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyFanBaselinePrice function', err)
      throw err
    }
  },

  fetchGreaseList: async () => {
    let results = await commonModel.fetchSingleTableParameterValues(
      'thermal_grease',
      ['id', 'grease_name', 'disable_time'],
      'id',
      'thermal_module'
    )
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let greaseList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'grease_name': 'greaseName',
    })
    return {
      date: dateFormat,
      greaseList: greaseList,
    }
  },

  modifyGreasePrice: async (nextId, greaseList) => {
    try {
      let client = await new tsystemDB()
      let greaseListLength = greaseList.length
      for (let i = 0; i < greaseListLength; i++) {
        let item = greaseList[i]
        await commonModel.insertPriceWithSourceName(client, item.id, nextId, item.next, 'number', 'thermal_grease')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyGreaseList function', err)
      throw err
    }
  },

  fetchThermalPadList: async () => {
    // 2019/12/19 table normalization by William
    // let results = await commonModel.fetchSingleTableParameterValues(
    //   'thermal_pad',
    //   ['id', 'heat_transfer', 'hardness', 'thickness'],
    //   'id',
    //   'thermal_module'
    // )
    let results = await thermalModel.fetchPadList()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let thermalPadList = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'heat_transfer': 'heatTransfer',
      'hardness': 'hardness',
      'thickness': 'thickness',
    })
    return {
      date: dateFormat,
      thermalPadList: thermalPadList,
    }
  },

  modifyThermalPadList: async (nextId, thermalPadList) => {
    try {
      let client = await new tsystemDB()
      let thermalPadListLength = thermalPadList.length
      for (let i = 0; i < thermalPadListLength; i++) {
        let item = thermalPadList[i]
        await commonModel.insertPriceWithSourceName(client, item.id, nextId, item.next, 'number', 'thermal_pad')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyThermalPadList function', err)
      throw err
    }
  },
  fetchPipeList: async () => {
    let results = await thermalModel.fetchPipeList()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let pipeList = []
    _.chain(results)
      .groupBy(res => res.id)
      .map((data, key) => {
        let itemData = _.sortBy(_.uniqBy(data, 'activate_date'), 'activate_date')

        let itemValue = databaseUtils.getValueByDateFormat(itemData, 'value', 'activate_date')

        let pipeLength = `${data[0].length_begin} ${data[0].length_begin <= 0 ? '<=' : '<'} L <= ${data[0].length_end}`
        if (data[0].length_begin >= data[0].length_end) {
          pipeLength += ' ERROR!'
        }
        let thinkess = `${data[0].thickness_begin} <= T < ${data[0].thickness_end}`
        if (data[0].thickness_begin >= data[0].thickness_end) {
          pipeLength += ' ERROR!'
        }

        pipeList.push({
          id: key,
          pipeName: data[0].pipe_name,
          diameterName: data[0].diameter_name,
          pipeLength: pipeLength,
          thinkess: thinkess,
          ...itemValue,
        })
      })
      .value()

    return {
      date: dateFormat,
      pipeList: pipeList,
    }
  },
  modifyPipePrice: async (nextId, pipeList) => {
    try {
      let client = await new tsystemDB()
      let pipeListLength = pipeList.length
      for (let i = 0 ; i < pipeListLength ; i++) {
        let item = pipeList[i]
        await commonModel.insertPriceWithSourceName(client, item.id, nextId, item.next, 'number', 'thermal_pipe_diameter_length_thickness')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, insertPriceWithSourceName function', err)
      throw err
    }
  },

  fetchThermalParameter: async () => {
    let results = await thermalModel.fetchThermalParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    // let thermalParameter = []
    let type_label = {
      'thermal_module_processing': '加工',
      'thermal_module_components': '零件',
      'thermal_module_management_and_profit': '管銷利潤',
    }
    let thermalParameter = databaseUtils.collateParameter(type_label, results)
    return {
      date: dateFormat,
      thermalParameter: thermalParameter,
    }
  },
  fetchFanBearing: async () => {
    let results = await thermalModel.fetchFanBearing()
    return _.map(results, (r) => {
      return {
        ...r,
        disable: r.disable ? true : false,
      }
    })
  },
  fetchFanBearingPrice: async () => {
    let results = await thermalModel.fetchFanBearingPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    
    let fanBearingRes = databaseUtils.formatMultiItemPriceData(
      results,
      'fan_size_id',
      {
        'fan_size_id': 'id',
        'fan_size': 'fanSize',
      },
      'bearing_name',
      {
        'id': 'bearingId',
      }
    )
    return {
      date: dateFormat,
      fanBearingList: fanBearingRes,
    }
  },
  modifyFanBearingPrice: async (nextId, fanBearingList) => {
    try {
      let client = await new tsystemDB()
      for(let i = 0; i < fanBearingList.length; i++) {
        await commonModel.modifyPrice(client, nextId, fanBearingList[i].items, 'bearingId')
      }

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyFanBearingPrice function', err)
      throw err
    }
  },
  // -- Fan 扇葉材料 --
  fetchFanMaterial: async () => {
    let results = await thermalModel.fetchFanMaterial()
    return _.map(results, (r) => {
      return {
        ...r,
        disable: r.disable ? true : false,
      }
    })
  },
  fetchFanMaterialPrice: async () => {
    let results = await thermalModel.fetchFanMaterialPrice()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let fanMaterialRes = databaseUtils.formatMultiItemPriceData(
      results,
      'fan_size_id',
      {
        'fan_size_id': 'id',
        'fan_size': 'fanSize',
      },
      'material_name',
      {
        'id': 'materialId',
      }
    )
    return {
      date: dateFormat,
      fanMaterialList: fanMaterialRes,
    }
  },
  modifyFanMaterialPrice: async (nextId, fanMaterialList) => {
    try {
      let client = await new tsystemDB()
      for(let i = 0; i < fanMaterialList.length; i++) {
        await commonModel.modifyPrice(client, nextId, fanMaterialList[i].items, 'materialId')
      }

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyFanMaterialPrice function', err)
      throw err
    }
  },
  // -- Fan 扇葉材料 --

  getMagnetMaterialList: async () => {
    let result = await thermalModel.getMagnetMaterialList()
    result = result.map((info)=>{
      return {
        'magnetId': info.id,
        'magnetName': info.magnet_name,
        'disable':info.disable_time ? true : false,
      }
    })
    return {
      magnetMaterialList: result,
    }
  },
  getMagnetMaterialPrice : async () => {
    let priceList = await thermalModel.getMagnetMaterialPrice()
    priceList.sort((a, b) => a.sort_order - b.sort_order)
    let dateFormat = databaseUtils.getDateFormat(priceList, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatMultiItemPriceData(
      priceList,
      'id',
      {
        'id': 'id',
        'fanSize': 'fanSize',
      },
      'magnetName',
      {
        'magnetId': 'magnetId',
      }
    )
    return {
      date: dateFormat,
      magnetMaterialPriceList : result,
    }
  },
  modifyMagnetMaterialPrice : async (nextId, magnetMaterialPriceList) => {
    try {
      let client = await new tsystemDB()
      for(let priceInfo of magnetMaterialPriceList){
        await commonModel.modifyPrice(client, nextId, priceInfo.items, 'magnetId')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMagnetMaterialPrice function', err)
      throw err
    }
  },
  getMotorDiffList : async () => {
    let result = await thermalModel.getMotorDiffList()
    result = result.map((info)=>{
      return {
        'motorId': info.id,
        'item': info.motor_name,
        'disable':info.disable_time ? true : false,
      }
    })
    return {
      motorDiffList : result,
    }
  },
  getMotorDiffPrice : async () => {
    let priceList = await thermalModel.getMotorDiffPrice()
    priceList.sort((a, b) => a.sort_order - b.sort_order)
    
    let dateFormat = databaseUtils.getDateFormat(priceList, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatMultiItemPriceData(
      priceList,
      'id',
      {
        'id': 'id',
        'fanSize': 'fanSize',
      },
      'motorName',
      {
        'motorId': 'motorId',
      }
    )
    return {
      date: dateFormat,
      motorDiffPriceList : result,
    }
  },
  modifyMotorDiffPrice : async (nextId, motorDiffPriceList) => {
    try {
      let client = await new tsystemDB()
      for(let priceInfo of motorDiffPriceList){
        await commonModel.modifyPrice(client, nextId, priceInfo.items, 'motorId')
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMotorDiffPrice function', err)
      throw err
    }
  },
}
