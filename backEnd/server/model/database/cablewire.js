const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Cable Wire model')

class CableWire {
  static async fetchCableWireParameter() {
    let res = await generalSQL.Common.fetchParameterByType('cable_wire')
    return res
  }
  static async fetchCableWireMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('cable_wire')

    let sql = squel.select()
      .distinct()
      .field('cable.id')
      .field('type.cable_type', 'item')
      .field('gauge.gauge')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.cablewire_cable_type_gauge', 'cable')
      .from('formula.cablewire_cable_type', 'type')
      .from('formula.cablewire_cable_gauge', 'gauge')

      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')

      .where('cable.cable_id = type.id')
      .where('cable.gauge_id = gauge.id')

      .where('cable.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('type.cable_type', false)
      .order('gauge.gauge', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchCableWireConnectorPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('cable_wire')

    let sql = squel.select()
      .distinct()
      .field('item.connector_item', 'item')
      .field('type_v1.connector_type', 'type')
      .field('vendor.vendor_pn')
      .field('vendor.id', 'vendor_id')
      .field('item.id')
      .field('pvsd0.value', 'unit_price')
      .field('pvsd1.value', 'process_time')
      .field('pvsd0.activate_date')
      .field('pvsd0.activate_date_id')
      .from('formula.cablewire_connector_vendor vendor')
      .left_join('formula.cablewire_connector_type_v1', 'type_v1', 'type_v1.id = vendor.connector_type_id')
      .left_join('formula.cablewire_connector_item', 'item', 'item.id = type_v1.connector_item_id')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
          .from('formula.parameter_value', 'pv')
          .from('formula.schedule_date', 'sd')
          .where('sd.id = pv.activate_date_id')
          .where('sd.id in ?', subSQL), 'pvsd0', 'vendor.price = pvsd0.parameter_id'
      )
      .left_join(
        squel.select()
          .field('pv.*')
          .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
          .from('formula.parameter_value', 'pv')
          .from('formula.schedule_date', 'sd')
          .where('sd.id = pv.activate_date_id')
          .where('sd.id in ?', subSQL), 'pvsd1', 'vendor.process_time = pvsd1.parameter_id'
      )
      .where('pvsd0.activate_date_id = pvsd1.activate_date_id')

    // console.log(sql.toString())
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async modifyCableWireConnectorPrice(client, nextId, items, valueKey, tableKey) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from('formula.cablewire_connector_vendor it')
          .where(`it.${tableKey} = parameter_id`)
          .where('activate_date_id = ?', nextId)
          .where('it.id = ?', item.id)

        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyCableWireConnectorPrice', err)
      throw err
    }
  }


}

module.exports = CableWire
