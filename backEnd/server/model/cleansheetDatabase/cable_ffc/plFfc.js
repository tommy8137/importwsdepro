let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class ffc {
  static async geFfcCommon(paras) {
    // let productTypeId = this.productTypeId
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc')
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
          .where('d.source_table= ?', 'common_parameter')
        , 'b', 'a.id = b.parameter_id')
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'cable_ffc'), scheduleDateId.schdeule_id)
      // .where('a.product_type_id = ?', productTypeId)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getFfcConnector() {
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc')
    let sql = squel.select()
      .field('a.id', 'type_id')
      .field('a.type_name', 'type_name')
      .field('b.id', 'vendor_id')
      .field('b.vendor_name', 'vendor_name')
      .field('b.vendor_pn', 'vendor_pn')
      .field('c.value', 'price')
      .field('d.value', 'processtime')
      .field('c.activate_date', 'price_activate_date')
      .field('d.activate_date', 'processtime_activate_date')
      .from(squel.select().from('formula.cableffc_connector_type').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.cableffc_connector_vendor').where('disable_time is null'), 'b', 'a.id = b.connector_type_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cableffc_connector_vendor', scheduleDateId.schdeule_id)
        , 'c', 'b.unit_price = c.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cableffc_connector_vendor', scheduleDateId.schdeule_id)
        , 'd', 'b.process_time = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = ffc