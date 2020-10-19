let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class dieCut {
  static async getCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('die_cut')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'die_cut'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)

    sql.where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMaterial() {
    let scheduleDateId = await schedule.getScheduleDate('material')

    // only filter die-cut material
    let joinSql = squel.select()
      .field('d.id', 'parts_ctgy_1_id')
      .field('d.category_name', 'category_1_name')
      .field('c.id', 'parts_ctgy_2_id')
      .field('c.category_name', 'category_2_name')
      .from('wiprocurement.bom_partlist_config', 'a')
      .join(squel.select().from('wiprocurement.bom_partlist_format').where('format_key= ? ', 'die-cut'), 'b', 'a.format = b.id')
      .join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'c', 'c.id = a.parts_ctgy_2')
      .join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'd', 'd.id = a.parts_ctgy_1')


    let sql = squel.select()
      .field('b.parts_ctgy_1_id').field('b.parts_ctgy_2_id')
      .field('b.category_1_name').field('b.category_2_name')
      .field('e.id', 'material_spec_id').field('c.id', 'material_id')
      .field('e.material_spec_name').field('c.material_name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.part_category_diecut_material_spec').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.diecut_material_spec').where('disable_time is null'), 'e', 'a.material_spec_id = e.id')
      .join(joinSql, 'b', 'a.part_category_2_id = b.parts_ctgy_2_id')
      // .join(
      //   squel.select()
      //     .field('a.id', 'category_1_id').field('a.category_name', 'category_1_name')
      //     .field('b.id', 'category_2_id').field('b.category_name', 'category_2_name')
      //     .from(squel.select().from('formula.part_category_1').where('disable_time is null'), 'a')
      //     .join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'b', 'a.id = b.part_category_1_id')
      //   , 'b', 'a.part_category_2_id = b.category_2_id')
      .left_join(squel.select().from('formula.diecut_material').where('disable_time is null'), 'c', ' e.id = c.diecut_material_spec_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'diecut_material', scheduleDateId.schdeule_id)
        , 'd', 'c.id = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMaterialAdder(){
    let scheduleDateId = await schedule.getScheduleDate('die_cut')
    let sql = squel.select()
      .field('a.size_begin')
      .field('a.size_end')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.diecut_material_size_adder').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'diecut_material_size_adder', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getAreaTime(){
    let scheduleDateId = await schedule.getScheduleDate('die_cut')
    let sql = squel.select()
      .field('a.id')
      .field('a.area_size')
      .field('b.value')
      .from(squel.select().from('formula.diecut_area_times').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'diecut_area_times', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
      .order('a.area_size', true)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getType(){
    let scheduleDateId = await schedule.getScheduleDate('die_cut')
    let sql = squel.select()
      .field('a.id')
      .field('a.type_name')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.diecut_type').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'diecut_type', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getReleasePaper(){
    let scheduleDateId = await schedule.getScheduleDate('die_cut')
    let sql = squel.select()
      .field('a.id')
      .field('a.paper_name')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.diecut_release_paper').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'diecut_release_paper', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getDiecutDebrisCleaning(){
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'diecut_debrisCleaning'), 'a')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

}

module.exports = dieCut