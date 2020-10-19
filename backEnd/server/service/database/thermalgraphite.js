const _ = require('lodash')
const thermalGraphiteModel = require('../../model/database/thermalgraphite.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database ThermalGraphite Service')
const FORMULA_TYPE = 'thermal_graphite'

class ThermalGraphite {

}
module.exports = {
  ThermalGraphite,
  fetchThicknessPrice: async () => {
    let results = await thermalGraphiteModel.fetchThicknessPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let graphitePrice = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'type': 'type',
      'thickness': 'thickness',
    })

    return {
      date: dateFormat,
      thicknessPrice: _.sortBy(graphitePrice, 'type'),
    }
  },
  fetchGluePrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('graphite_glue', ['id', 'thickness', 'disable_time'], 'id', FORMULA_TYPE)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let gluePrice = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'thickness': 'thickness',
    })

    return {
      date: dateFormat,
      gluePrice: _.sortBy(gluePrice, 'thickness'),
    }
  },
  fetchPetPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('graphite_pet', ['id', 'thickness', 'disable_time'], 'id', FORMULA_TYPE)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let petPrice = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'thickness': 'thickness',
    })

    return {
      date: dateFormat,
      petPrice: _.sortBy(petPrice, 'thickness'),
    }
  },
  fetchProcessPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('graphite_second_process', ['id', 'process_name', 'disable_time'], 'id', FORMULA_TYPE)
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let processPrice = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'process_name': 'item',
    })

    return {
      date: dateFormat,
      processPrice,
    }
  },
}
