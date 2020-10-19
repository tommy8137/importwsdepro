const ffcDtModel = require('../../model/database/ffcDt.js')
const commonService = require('./common')
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable Ffc DT/AIO Service')

class CableFFCDt {
  // -- Cable Ffc Parameters --
  static async fetchFfcParameter(productTypeId = 2){
    let results = await commonService.getParameters({ formulaType: 'cable_ffc', productTypeId })
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'cable_ffc_material': '材料',
      'cable_ffc_components': '零件',
      'cable_ffc_secondary_processing': '二次加工',
      'cable_ffc_management_and_profit': '管銷利潤',
    }
    let ffcParameter = databaseUtils.collateParameter(type_label, results, 'label')
    return {
      date: dateFormat,
      cableffcParameter: ffcParameter,
    }
  }
  static async fetchFfcConnector(productTypeId = 2){
    let fetchRes = await ffcDtModel.fetchFfcConnectorPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(fetchRes, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatSigleTablePriceData(fetchRes, 'id', {
      'id': 'id',
      'category_name':'category',
      'spec_name':'spec',
      'pitch':'pitch',
      'row':'row',
      'pin':'pin',
      'vendor_name':'vendor',
      'part_number':'partNumber',
    })
    return {
      date: dateFormat,
      items: result,
    }
  }
  static async fetchFfcMaterial(productTypeId = 2){
    let fetchRes = await ffcDtModel.fetchFfcMaterialPrice(productTypeId)
    
    let dateFormat = databaseUtils.getDateFormat(fetchRes, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatSigleTablePriceData(fetchRes, 'id', {
      'id': 'id',
      'category_name':'category',
      'spec':'spec',
      'material_l':'length',
      'material_w':'width',
      'thickness':'thickness',
      'vendor_name':'vendor',
      'part_number':'partNumber',
    })
    return {
      date: dateFormat,
      items: result,
    }
  }
  static async fetchFfcAccessories(productTypeId = 2){
    let fetchRes = await ffcDtModel.fetchFfcAccessoriesPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(fetchRes, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatSigleTablePriceData(fetchRes, 'id', {
      'id': 'id',
      'category_name':'category',
      'spec':'spec',
      'material_l':'length',
      'material_w':'width',
      'thickness':'thickness',
      'vendor_name':'vendor',
      'part_number':'partNumber',
    })
    return {
      date: dateFormat,
      items: result,
    }
  }
  static async fetchFfcReinforcementBoard(productTypeId = 2){
    let fetchRes = await ffcDtModel.fetchFfcgetFfcDtReinforcementBoardPrice(productTypeId)
    let dateFormat = databaseUtils.getDateFormat(fetchRes, 'activate_date', 'activation_date_id')
    let result = databaseUtils.formatSigleTablePriceData(fetchRes, 'id', {
      'id': 'id',
      'spec':'spec',
      'material_l':'length',
      'material_w':'width',
      'thickness':'thickness',
      'vendor_name':'vendor',
      'part_number':'partNumber',
    })
    return {
      date: dateFormat,
      items: result,
    }
  }
  static async putFfcDtPrice(params){
    let { finalPath, nextId, items } = params
    try {
      let client = await new tsystemDB()
      await ffcDtModel.modifyFfcDtPrice(client, { finalPath, nextId, items, 'itemKey': 'id' })
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, putFfcDtPrice function', err)
      throw err
    }
  }
}

module.exports = CableFFCDt
