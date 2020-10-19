let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class screw {
  static async getTurningCommon(paras) {
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null

    let scheduleDateId = await schedule.getScheduleDate('me_others_screw')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'me_others_screw'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getScrewNylok() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_screw')
    let sql = squel.select()
      .field('b.material_name')
      .field('c.color_name')
      .field('d.diameter_begin')
      .field('d.diameter_end')
      .field('f.id', 'length_id')
      .field('f.length_begin')
      .field('f.length_end')
      .field('e.value')
      .field('e.activate_date')
      .from(squel.select().from('formula.turning_nylok').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.turning_material').where('disable_time is null'), 'b', 'a.material_id = b.id')
      .join(squel.select().from('formula.part_category_turning_material').where('disable_time is null'), 'b1', 'b1.material_id = b.id')
      .left_join(squel.select().from('formula.turning_nylok_color').where('disable_time is null'), 'c', 'a.color_id = c.id')
      .left_join(squel.select().from('formula.turning_nylok_diameter').where('disable_time is null'), 'd', 'a.diameter_id = d.id')
      .left_join(squel.select().from('formula.turning_nylok_length').where('disable_time is null'), 'f', 'f.id = a.length_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'turning_nylok', scheduleDateId.schdeule_id)
        , 'e', 'a.id = e.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getScrewPlating() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_screw')
    let sql = squel.select()
      .field('a.id')
      .field('a.plating_name')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.turning_plating').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'turning_plating', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getTurningHeatTreatment() {
    let scheduleDateId = await schedule.getScheduleDate('material')
    let heatTreatMentscheduleDateId = await schedule.getScheduleDate('me_others_screw')
    let sql = squel.select()
      .field('c.category_1_name')
      .field('c.category_2_name')
      .field('b.material_name')
      .field('b.density')
      .field('case when d.value is null then 0::numeric else d.value::numeric end', 'heat_treatment')
      .field('d.activate_date')
      .field('e.value::numeric', 'price')
      .from(squel.select().from('formula.turning_material').where('disable_time is null'), 'b')
      .join(squel.select().from('formula.part_category_turning_material').where('disable_time is null'), 'b1', 'b1.material_id = b.id')
      .join(
        squel.select()
          .field('a.id', 'part_cate1_id').field('a.category_name', 'category_1_name')
          .field('b.id', 'part_cate2_id').field('b.category_name', 'category_2_name')
          .from(squel.select().from('formula.part_category_1').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'b', 'a.id = b.part_category_1_id')
        , 'c', 'b1.part_category_2_id = c.part_cate2_id')
      .left_join(squel.select().from('formula.turning_heat_treatment').where('disable_time is null'), 'a', 'a.turning_material_id = b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'turning_heat_treatment', heatTreatMentscheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'turning_material', scheduleDateId.schdeule_id)
        , 'e', 'b.id = e.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getTurningDiameter() {
    let sql = squel.select()
      .field('a.id')
      .field('a.outter_diameter')
      .field('a.inner_diameter')
      .field('a.min_toolth_diameter')
      .field('a.max_toolth_diameter')
      .from(squel.select().from('formula.turning_screw_diameter').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getScrewNylokColor() {
    let sql = squel.select()
      .distinct()
      .field('color.id')
      .field('color.color_name')
      .field('substring(color.color_name,1,1)', 'color_nick')
      .field('tm.material_name')
      .from('formula.part_category_turning_material', 'pc_tm')
      .join('formula.turning_material', 'tm', 'tm.id = pc_tm.material_id')
      .join(squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'screw'), 'pc2', 'pc2.id = pc_tm.part_category_2_id')
      .left_join(squel.select().from('formula.turning_nylok').where('disable_time is null'), 'nylok', 'nylok.material_id = tm.id')
      .left_join(squel.select().from('formula.turning_nylok_color').where('disable_time is null'), 'color', 'color.id = nylok.color_id')
      .where('pc_tm.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getNylokLength() {
    let sql = squel.select()
      .field('a.id')
      .field('a.length_begin')
      .field('a.length_end')
      .from(squel.select().from('formula.turning_nylok_length').where('disable_time is null'), 'a')
      .where('a.length_begin > -1')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async nutTypeValues() {
    let sql = squel.select()
      .distinct()
      .field('tm.material_name')
      .field('nut_type.name')
      .from('formula.part_category_turning_material', 'pc_tm')
      .join('formula.turning_material', 'tm', 'tm.id = pc_tm.material_id')
      .left_join('formula.turning_nut_type', 'nut_type', 'pc_tm.nut_type_id = nut_type.id')
      .join(squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'nut'), 'pc2', 'pc2.id = pc_tm.part_category_2_id')
      .where('pc_tm.disable_time is null')
      .order('name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async screwMaterialSpec() {

    let sql = squel.select()
      .distinct()
      .field('b.material_name')
      .field('c.color_name')
      .from('formula.part_category_turning_material', 'pc_tm')
      .join(squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'screw'), 'pc2', 'pc2.id = pc_tm.part_category_2_id')
      .join(squel.select().from('formula.turning_material').where('disable_time is null'), 'b', 'b.id = pc_tm.material_id')
      .left_join(squel.select().from('formula.turning_nylok').where('disable_time is null'), 'a', 'a.material_id = b.id')
      .left_join(squel.select().from('formula.turning_nylok_color').where('disable_time is null'), 'c', 'a.color_id = c.id')
      .where('pc_tm.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async standoffMaterialSpec() {
    let sql = squel.select()
      .distinct()
      .field('b.material_name')
      .from('formula.part_category_turning_material', 'pc_tm')
      .join(squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'standoff'), 'pc2', 'pc2.id = pc_tm.part_category_2_id')
      .join(squel.select().from('formula.turning_material').where('disable_time is null'), 'b', 'b.id = pc_tm.material_id')
      .where('pc_tm.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}
module.exports = screw
