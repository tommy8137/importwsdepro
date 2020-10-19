const _ = require('lodash')
const moment = require('moment')
const cablewireModel = require('../../model/database/cablewire.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable Wire Service')

class CableWire {
}
module.exports = {
  CableWire,
  // -- Cable Wire Parameters --
  fetchCableWireParameter: async () => {
    let results = await cablewireModel.fetchCableWireParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'cable_wire_material': '材料',
      'cable_wire_auxiliary_materials': '輔料',
      'cable_wire_expendables': '耗材',
      'cable_wire_connector': 'Connector',
      'cable_wire_management_and_profit': '管銷利潤',
      'cable_wire_secondary_processing': '二次加工',
    }

    let cableWireParameter = databaseUtils.collateParameter(type_label, results)

    return {
      date: dateFormat,
      cableWireParameter,
    }
  },

  // -- Cable Wire Material Price --
  fetchCableWireMaterialPrice: async () => {
    let results = await cablewireModel.fetchCableWireMaterialPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'item': 'item',
      'gauge': 'gauge',
    })

    return {
      date: dateFormat,
      materialPrice: result,
    }
  },

  // -- Cable Wire Connector Price --
  fetchCableWireConnectorPrice: async () => {
    let results = await cablewireModel.fetchCableWireConnectorPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    let connectorPrice = []

    _.chain(results)
      .groupBy(res => res.id)
      .map((res, key) => {

        let items = _.chain(res)
          .groupBy(itemTypeRes => itemTypeRes.vendor_id)
          .map((itemTypeData) => {

            let res = databaseUtils.calcMultiPriceDataByDateObject(
              [itemTypeData],
              [
                ['vendor_id'],
              ],
              [
                ['unit_price', 'process_time'],
              ],
              [
                {
                  'vendor_id': 'id',
                  'type': 'type',
                  'vendor_pn': 'vendorPN',
                  'unit_price': 'price',
                  'process_time': 'processTime',
                },
              ]
            )
            return res

          })
          .value()

        connectorPrice.push({
          id: key,
          type: res[0].item,
          items: _.flatten(items),
        })
      })
      .value()

    return {
      date: dateFormat,
      connectorPrice: connectorPrice,
    }
  },
  modifyCableWireConnectorPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      let price = await cablewireModel.modifyCableWireConnectorPrice(client, nextId, items, 'price', 'price')
      let processTime = await cablewireModel.modifyCableWireConnectorPrice(client, nextId, items, 'processTime', 'process_time')

      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyCableWireConnectorPrice function', err)
      throw err
    }
  },

}
