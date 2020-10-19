const _ = require('lodash')
const moment = require('moment')
const fpcModel = require('../../model/database/fpc.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable FPC Service')

class CableFPC {
}
module.exports = {
  CableFPC,
  // -- Cable Fpc Parameters --
  fetchFpcParameter: async () => {
    let results = await fpcModel.fetchFpcParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'cable_fpc_auxiliary_materials': '輔料',
      'cable_fpc_management_and_profit': '管銷利潤',
    }
    let fpcParameter = databaseUtils.collateParameter(type_label, results)
    return {
      date: dateFormat,
      cablefpcParameter: fpcParameter,
    }
  },
  // -- Cable FPC 材料單價Price m2 價目表 --
  fetchFpcMaterialUnitPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('cablefpc_material', ['id', 'material_name', 'disable_time'], 'id', 'cable_fpc')
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'id': 'id',
      'material_name': 'name',
    })
    return {
      date: dateFormat,
      materialUnitPrice: result,
    }
  },
  modifyMaterialUnitPrice: async (nextId, materialPrice)=>{
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, materialPrice, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyFfcConnectorPrice function', err)
      throw err
    }
  },
  // -- Cable FPC Shielding 價目表 --
  fetchFpcShieldingPrice: async ()=>{
    let results = await commonModel.fetchSingleTableParameterValues('cablefpc_shielding', ['id', 'shielding_name', 'disable_time'], 'id', 'cable_fpc')
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let result =  databaseUtils.formatSigleTablePriceData(results, 'id', {
      id: 'id',
      shielding_name: 'name' })
    return {
      date: dateFormat,
      shieldingPrice: result,
    }
  },
  modifyShieldingPrice: async (nextId, shieldingPrice)=>{
    try {
      let client = await new tsystemDB()
      await commonModel.modifyPrice(client, nextId, shieldingPrice, 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyShieldingPrice function', err)
      throw err
    }
  },
}
