const _ = require('lodash')
const ffcModel = require('../../model/database/ffc.js')
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable Ffc Service')

class CableFFC {
}
module.exports = {
  CableFFC,
  // -- Cable Ffc Parameters --
  fetchFfcParameter: async () => {
    let results = await ffcModel.fetchFfcParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'cable_ffc_material': '材料',
      'cable_ffc_components': '零件',
      'cable_ffc_secondary_processing': '二次加工',
      'cable_ffc_management_and_profit': '管銷利潤',
    }
    let ffcParameter = databaseUtils.collateParameter(type_label, results)
    return {
      date: dateFormat,
      cableffcParameter: ffcParameter,
    }
  },
  // -- Cable FFC Connector 清單 --
  fetchFfcConnector: async () => {
    let results = await ffcModel.fetchFfcConnector()
    return {
      connector: results.map((info)=>{
        return {
          'id': info.id,
          'connectorName': info.type_name,
          'disable':info.disable_time ? true : false,
        }
      }),
    }
  },
  // -- Cable FFC Connector 價目表 --
  fetchFfcConnectorPrice: async () => {
    let unitPrizeList = await ffcModel.fetchFfcConnectorPrice('unit_price', 'unit_price')
    let processTimeList = await ffcModel.fetchFfcConnectorPrice('process_time', 'process_time')
    let dateFormat = databaseUtils.getDateFormat(unitPrizeList, 'activate_date', 'activation_date_id')
    let result =  []
    _.chain(unitPrizeList)
      .groupBy(info => info.id)
      .map((unitPrizeInfo, id) => {
        const processTimeInfo = _.filter(processTimeList, info => id === info.id)
        const priceDateInfo = databaseUtils.calcPriceByDateObject(unitPrizeInfo, processTimeInfo, {
          'unit_price':'price',
          'process_time':'processTime',
        })
        result.push({
          id: id,
          connectorName: unitPrizeInfo[0].type_name,
          vendorPN:unitPrizeInfo[0].vendor_pn,
          vendorName:unitPrizeInfo[0].vendor_name,
          ...priceDateInfo,
        })
      })
      .value()
    return {
      date: dateFormat,
      connectorPrice: result,
    }
  },
  modifyFfcConnectorPrice: async (nextId, ffcConnectorPrice)=>{
    try {
      let client = await new tsystemDB()
      await ffcModel.modifyFfcConnectorPrice(client, nextId, ffcConnectorPrice)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyFfcConnectorPrice function', err)
      throw err
    }
  },
}
