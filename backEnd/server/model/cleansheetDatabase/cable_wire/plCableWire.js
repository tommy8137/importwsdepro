let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class wire {
  static async getWireCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('cable_wire')
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null
    let sql = squel.select()
      .field('a.id', 'id')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .field('a.unit', 'unit')
      .field('a.part_type', 'part_type')
      .field('a.label', 'label')
      .field('a.label_name', 'label_name')
      .from('formula.common_parameter', 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'common_parameter', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getWireConnector() {
    let scheduleDateId = await schedule.getScheduleDate('cable_wire')
    let sql = squel.select()
      .field('v.price', 'price_id')
      .field('v.process_time', 'process_time_id')
      .field('a.id', 'connector_item_id')
      .field('a.connector_item', 'connector_item')
      .field('b.id', 'connector_type_id')
      .field('b.connector_type', 'connector_type')
      .field('v.id', 'vendor_pn_id')
      .field('v.vendor_pn', 'vendor_pn')
      .field('c.value', 'price')
      .field('d.value', 'process_time')
      .field('c.activate_date', 'price_activate_date')
      .field('d.activate_date', 'process_time_activate_date')
      .from(squel.select().from('formula.cablewire_connector_item').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.cablewire_connector_type_v1').where('disable_time is null'), 'b', 'a.id = b.connector_item_id')
      .join(squel.select().from('formula.cablewire_connector_vendor').where('disable_time is null'), 'v', 'v.connector_type_id = b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cablewire_connector_type', scheduleDateId.schdeule_id)
        , 'c', 'v.price = c.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cablewire_connector_type', scheduleDateId.schdeule_id)
        , 'd', 'v.process_time = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getGuage(paras) {
    let guageType = paras[0] ? paras[0] : null

    let scheduleDateId = await schedule.getScheduleDate('cable_wire')
    let sql = squel.select()
      .field('a.cable_id', 'cable_id')
      .field('b.cable_type', 'cable_type')
      .field('a.gauge_id', 'gauge_id')
      .field('c.gauge', 'gauge')
      .field('d.value', 'value')
      .field('d.activate_date', 'value_activate_date')
      .from(squel.select().from('formula.cablewire_cable_type_gauge').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.cablewire_cable_type').where('disable_time is null'), 'b', 'a.cable_id = b.id')
      .join(squel.select().from('formula.cablewire_cable_gauge').where('disable_time is null'), 'c', 'a.gauge_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cablewire_cable_type_gauge', scheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')
    if (guageType) sql.where('b.cable_type = ?', guageType)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = wire