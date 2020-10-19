let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class fpc {
  static async geFpcCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('cable_fpc')
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
    sql.where('a.disable_time is null')
    
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async geFpcMaterial() {
    let scheduleDateId = await schedule.getScheduleDate('cable_fpc')
    let sql = squel.select()
      .field('a.id', 'material_id')
      .field('a.material_name', 'material_name')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .from(squel.select().from('formula.cablefpc_material').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cablefpc_material', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async geFpcShielding() {
    let scheduleDateId = await schedule.getScheduleDate('cable_fpc')
    let sql = squel.select()
      .field('a.id', 'shielding_id')
      .field('a.shielding_name', 'shielding_name')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .from(squel.select().from('formula.cablefpc_shielding').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'cablefpc_shielding', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFpcBendTime(paras) {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_fpc_bend_times').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFpcPrintTime(paras) {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_fpc_print').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFPCProductNumber(paras) {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_fpc_product_number').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getShieldingQty(paras) {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_fpc_shielding_qty').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getStopLine(paras) {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_fpc_bend_times').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
}

module.exports = fpc