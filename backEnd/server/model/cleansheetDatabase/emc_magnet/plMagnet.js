let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class magnet {
  static async getCommon(paras){
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null

    let scheduleDateId = await schedule.getScheduleDate('emc_magnet')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'emc_magnet'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMagnetMaterial() {
    let scheduleDateId = await schedule.getScheduleDate('emc_magnet')

    let sql = squel.select()
      .field('a.id')
      .field('a.material_name')
      .field('c.value')
      .field('c.activate_date')
      .from(squel.select().from('formula.magnet_material').where('disable_time is null'), 'a')
      .join(
        squel.select()
          .field('b.id', 'cate_2_id')
          .from(squel.select().from('formula.part_category_1').where('disable_time is null').where('category_name = ?', 'EMC'), 'a')
          .join(squel.select().from('formula.part_category_2').where('disable_time is null').where('category_name = ?', 'Magnet'), 'b', 'a.id = b.part_category_1_id')
        , 'b', 'a.part_category_2_id = b.cate_2_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'magnet_material', scheduleDateId.schdeule_id)
        , 'c', 'a.id = c.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMagnetCutLossrate(paras){
    let scheduleDateId = await schedule.getScheduleDate('emc_magnet')
    let cut_begin = paras[0] ? paras[0] : null
    let cut_end = paras[1] ? paras[1] : null

    let sql = squel.select().from(squel.select().from('formula.magnet_cut_loss_rate').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'magnet_cut_loss_rate', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    if (cut_begin) { sql.where('a.cut_size_begin = ?', cut_begin) }
    else { sql.where('a.cut_size_begin = ?', '0') }
    if (cut_end) { sql.where('a.cut_size_end = ?', cut_end) }
    else { sql.where('a.cut_size_end = ?', '60') }
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMagnetManPower(paras){
    let scheduleDateId = await schedule.getScheduleDate('emc_magnet')
    let size_begin = paras[0] ? paras[0] : null
    let size_end = paras[1] ? paras[1] : null

    let sql = squel.select().from(squel.select().from('formula.magnet_manpower').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'magnet_manpower', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    if (size_begin) { sql.where('a.area_size_begin = ?', size_begin) }
    else { sql.where('a.area_size_begin = ?', '0') }
    if (size_end) { sql.where('a.area_size_end = ?', size_end) }
    else { sql.where('a.area_size_end = ?', '200') }
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}
module.exports = magnet
