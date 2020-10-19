let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class common {
  static async getCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('common')
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

  static async getSite(paras){
    let sql = squel.select()
      .field('id', 'id')
      .field('site_name')
      .from('formula.site')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getProjectParameter(paras){
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null
    let sql
    if (this.bomId > 0) {
      sql = squel.select()
        .field('value.id')
        .field('value.value')
        .field('value.value_type')
        .from('wiprocurement.bom_project_parameter_value', 'value')
        .left_join('wiprocurement.bom_project_parameter', 'type', 'type.id = value.type_id')
        .where('value.bom_id = ?', this.bomId)
        .where('type.product_type_id = ?', this.productTypeId)
        .where('type.part_type = ?', part_type)
        .where('type.label = ?', label)
    } else {
      sql = squel.select()
        .field('pv.value')
        .field('pv.value_type')
        .from('wiprocurement.bom_project_parameter', 'type')
        .from('formula.parameter_value', 'pv')
        .where('type.product_type_id = ?', this.productTypeId)
        .where('pv.parameter_id = type.default_value_parameter_id')
        .where('pv.activate_date_id = ?', 
          squel.select()
            .field('MAX(id)')
            .from('formula.schedule_date')
            .where('formula_type_id = type.formula_type_id')
            .where('product_type_id = type.product_type_id')
        )
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = common
