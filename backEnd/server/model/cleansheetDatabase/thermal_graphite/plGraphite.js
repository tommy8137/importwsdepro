let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class graphite {
  static async getGraphiteCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('thermal_graphite')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'thermal_graphite'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getGraphiteLayer() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_graphite')
    let sql = squel.select()
      .field('a.*')
    
      .field('b.value')
      .field('b.activate_date')
      .from(
        squel.select()
          .field('a.id').field('b.graphite_name').field('b.id', 'graphite_id')
          .field('a.thickness')
          .from(squel.select().from('formula.graphite_graphite_thickness').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.graphite_graphite').where('disable_time is null'), 'b', 'a.graphite_id = b.id')
        , 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'graphite_graphite_thickness', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPetLayer() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_graphite')
    let sql = squel.select()
      .field('a.id')
      .field('a.thickness')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.graphite_pet').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'graphite_pet', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getGlueLayer() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_graphite')
    let sql = squel.select()
      .field('a.id')
      .field('a.thickness').field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.graphite_glue').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'graphite_glue', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getGraphiteProcess() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_graphite')
    let sql = squel.select()
      .field('a.id')
      .field('a.process_name').field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.graphite_second_process').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'graphite_second_process', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = graphite
