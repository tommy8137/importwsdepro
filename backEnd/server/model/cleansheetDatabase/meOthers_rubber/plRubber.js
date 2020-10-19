let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class rubber {
  static async getRubberCommon(paras) {
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null

    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'me_others_rubber'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberMaterial() {
    let scheduleDateId = await schedule.getScheduleDate('material')
    let sql = squel.select()
      .field('b.category_1_name').field('b.category_2_name')
      .field('a.material_spec_name').field('a.material_name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select()
        .field('a.spec_name', 'material_spec_name').field('b.material_name')
        .field('b.id', 'material_id').field('a.part_category_2_id')
        .from(squel.select().from('formula.rubber_material_spec').where('disable_time is null'), 'a')
        .left_join(squel.select().from('formula.rubber_material').where('disable_time is null'), 'b', 'a.id = b.spec_id'), 'a')
      .join(
        squel.select()
          .field('a.id', 'category_1_id').field('a.category_name', 'category_1_name')
          .field('b.id', 'category_2_id').field('b.category_name', 'category_2_name')
          .from(squel.select().from('formula.part_category_1').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'b', 'a.id = b.part_category_1_id')
        , 'b', 'a.part_category_2_id = b.category_2_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('(d.source_table= ? or d.source_table = ?) and d.activate_date_id = ?', 'material', 'rubber_material', scheduleDateId.schdeule_id)
        , 'd', 'a.material_id = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberMaterialWithSpec(paras) {
    let scheduleDateId = await schedule.getScheduleDate('material')
    let joinSql = squel.select()
      .field('b.format_key')
      .field('c.category_name')
      .field('c.id')
      .from('wiprocurement.bom_partlist_config', 'a')
      .join('wiprocurement.bom_partlist_format', 'b', 'a.format = b.id')
      .join('formula.part_category_2', 'c', 'c.id = a.parts_ctgy_2')
      .where('b.format_key = ?', 'meothers-rubber')

    let sql = squel.select()
      .field('a.id', 'id')
      .field('c.id', 'material_id')
      .field('c.material_name', 'material_name')
      .field('c.spec_id', 'material_spec_id')
      .field('a.spec_name', 'material_spec_name')
      .field('b.id', 'part_category_2_id')
      .field('b.category_name', 'part_category_2_name')
      .field('d.value', 'value')
      .field('d.activate_date', 'activate_date')
      .from(squel.select().from('formula.rubber_material_spec').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.rubber_material').where('disable_time is null'), 'c', 'a.id = c.spec_id')
      .join(joinSql, 'b', 'a.part_category_2_id = b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material', scheduleDateId.schdeule_id)
        , 'd', 'd.parameter_id = c.id')
    // if (product_type) sql.where('c.type_name = ?', product_type.toUpperCase())
    let result = await systemDB.Query(sql.toParam())
    
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberMaterialDropDownList() {
    let sql = squel.select()
      .distinct()
      .field('material.id', 'material_id')
      .field('material.material_name', 'material_name')
      .field('ms.spec_name', 'material_spec_name')
      .field('ms.id', 'material_spec_id')
      .from('formula.rubber_material material')
      .join('formula.rubber_material_spec', 'ms', 'ms.id = material.spec_id')
      .where('material.disable_time is null')
      .where('ms.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberPrinting() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
    let sql = squel.select()
      .field('a.id')
      .field('a.printing_name')
      .field('b.value', 'price')
      .field('c.value', 'amount')
      .field('c.activate_date', 'activate_date')
      .from(squel.select().from('formula.rubber_printing').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_printing', scheduleDateId.schdeule_id)
        , 'b', 'a.unit_price = b.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_printing', scheduleDateId.schdeule_id)
        , 'c', 'a.usage_amount = c.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberPrittingAmount() {
    let sql = squel.select()
      .field('id')
      .field('spec_name')
      .from('formula.me_spec')
      .where('spec_category = \'rubber_printing_times\'')
      .where('disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberAdhesive() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
    let sql = squel.select()
      .field('a.adhesive_name')
      .field('b.value', 'price')
      .field('c.value', 'process_time')
      .field('d.value', 'usage_amount')
      .field('c.activate_date', 'activate_date')
      .from(squel.select().from('formula.rubber_adhesive').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_adhesive', scheduleDateId.schdeule_id)
        , 'b', 'a.unit_price = b.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_adhesive', scheduleDateId.schdeule_id)
        , 'c', 'a.process_time = c.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_adhesive', scheduleDateId.schdeule_id)
        , 'd', 'a.usage_amount = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberStamping() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
    let sql = squel.select()
      .field('a.id')
      .field('a.stamping_name')
      .field('b.value', 'price')
      .field('c.value', 'process_time')
      .field('d.value', 'usage_amount')
      .field('c.activate_date', 'activate_date')
      .from(squel.select().from('formula.rubber_stamping').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_stamping', scheduleDateId.schdeule_id)
        , 'b', 'a.unit_price = b.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_stamping', scheduleDateId.schdeule_id)
        , 'c', 'a.process_time = c.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_stamping', scheduleDateId.schdeule_id)
        , 'd', 'a.usage_amount = d.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberMachine() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
    let sql = squel.select()
      // eslint-disable-next-line quotes
      .field(`case when a.product_type_id = 0 then 'Others' else c.type_name end`, 'type_name')
      .field('b.ton')
      .field('d.value').field('d.activate_date')
      .from('formula.rubber_machine_product_type', 'a')
      .join(squel.select().from('formula.rubber_machine').where('disable_time is null'), 'b', 'a.machine_id = b.id')
      .left_join(squel.select().from('formula.product_type').where('disable_time is null'), 'c', 'a.product_type_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'rubber_machine_product_type', scheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberMaterialSpecDensity(){
    let sql = squel.select()
      .field('a.spec_name').field('a.density')
      .from('formula.rubber_material_spec', 'a')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getRubberSite() {
    let sql = squel.select()
      .field('site_name')
      .from('formula.site')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getRubberMachineRate() {
    let scheduleDateId = await schedule.getScheduleDate('me_others_rubber')
    let sql = squel.select()
      .field('rmt.ton')
      .field('rmp.param_name')
      .field('parameter.value')
      .field('parameter.activate_date')
      .from('formula.rubber_machine_rate_related', 'rubber_machine_rate')
      .left_join('formula.rubber_machine_ton', 'rmt', 'rmt.id = rubber_machine_rate.machine_ton_id')
      .left_join('formula.rubber_machine_param', 'rmp', 'rmp.id = rubber_machine_rate.machine_param_id')
      .left_join(
        squel.select()
          .field('parameter_value.*')
          .field('sd.activate_date')
          .from('formula.parameter_value', 'parameter_value')
          .join('formula.schedule_date', 'sd', ' sd.id = parameter_value.activate_date_id')
          .where('parameter_value.activate_date_id = ?', scheduleDateId.schdeule_id)
        , 'parameter', 'rubber_machine_rate.id = parameter.parameter_id')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getRubberAdhesiveSetting() {
    let scheduleDateId = await schedule.getScheduleDate('material')
    let sql = squel.select()
      .field('view_rubber_adhesive_setting.thickness_id')
      .field('view_rubber_adhesive_setting.thickness_name')
      .field('view_rubber_adhesive_setting.material_id')
      .field('view_rubber_adhesive_setting.material_name')
      .field('parameter.value')
      .field('parameter.activate_date')
      .from('formula.v_rubber_adhesive_setting_of_diecut_material', 'view_rubber_adhesive_setting')
      .left_join(
        squel.select()
          .field('parameter_value.*')
          .field('sd.activate_date')
          .from('formula.parameter_value', 'parameter_value')
          .join('formula.schedule_date', 'sd', ' sd.id = parameter_value.activate_date_id')
          .where('parameter_value.activate_date_id = ?', scheduleDateId.schdeule_id)
        , 'parameter', 'view_rubber_adhesive_setting.material_id = parameter.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    // console.log(`result :`, result);
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = rubber
