let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class thermal {
  static async getThermalCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
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
      .where('a.formula_type_id = ? and b.activate_date_id = ?', squel.select().field('id').from('formula.formula_type').where('name = ?', 'thermal_module'), scheduleDateId.schdeule_id)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalBearingAndSleeveFan() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.fan_id')
      .field('b.fan_size')
      .field('a.bearing_id')
      .field('c.bearing_name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.thermal_fan_fan_bearing').where('disable_time is null'), 'a')
      .join(
        squel.select().from('formula.thermal_fan').where('disable_time is null')
        , 'b', 'a.fan_id = b.id')
      .join(
        squel.select().from('formula.thermal_fan_bearing').where('disable_time is null')
        , 'c', 'a.bearing_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan_fan_bearing', scheduleDateId.schdeule_id), 'd', 'a.id = d.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalFanMagnet(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.fan_id')
      .field('b.fan_size')
      .field('a.magnet_id')
      .field('c.magnet_name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.thermal_fan_fan_magnet').where('disable_time is null'), 'a')
      .join(
        squel.select().from('formula.thermal_fan').where('disable_time is null')
        , 'b', 'a.fan_id = b.id')
      .join(
        squel.select().from('formula.thermal_fan_magnet').where('disable_time is null')
        , 'c', 'a.magnet_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan_fan_magnet', scheduleDateId.schdeule_id), 'd', 'a.id = d.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalFanMotor(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.fan_id')
      .field('b.fan_size')
      .field('a.motor_id')
      .field('c.motor_name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.thermal_fan_fan_motor').where('disable_time is null'), 'a')
      .join(
        squel.select().from('formula.thermal_fan').where('disable_time is null')
        , 'b', 'a.fan_id = b.id')
      .join(
        squel.select().from('formula.thermal_fan_motor').where('disable_time is null')
        , 'c', 'a.motor_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan_fan_motor', scheduleDateId.schdeule_id), 'd', 'a.id = d.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalPipe() {
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('b.pipe_id')
      .field('b.pipe_name')
      .field('a.diameter_id')
      .field('b.diameter_name')
      .field('c.length_begin')
      .field('c.length_end')
      .field('d.thickness_begin')
      .field('d.thickness_end')
      .field('f.value')
      .field('f.activate_date')
      .from(squel.select().from('formula.thermal_pipe_diameter_length_thickness').where('disable_time is null'), 'a')
      .join(
        squel.select().field('a.id').field('a.diameter_name').field('b.pipe_name').field('b.id', 'pipe_id')
          .from(squel.select().from('formula.thermal_pipe_diameter').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.thermal_pipe').where('disable_time is null'), 'b', 'a.pipe_id = b.id')
        , 'b', 'a.diameter_id = b.id')
      .left_join(squel.select().from('formula.thermal_pipe_length').where('disable_time is null'), 'c', 'a.length_id = c.id')
      .left_join(squel.select().from('formula.thermal_pipe_thickness').where('disable_time is null'), 'd', 'a.thickness_id = d.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_pipe_diameter_length_thickness', scheduleDateId.schdeule_id), 'f', 'a.id = f.parameter_id')
      .order('b.diameter_name', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalPipeType(){
    let sql = squel.select().field('id').field('pipe_name').from('formula.thermal_pipe').where('disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalPad(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.id')
      .field('a.heat_transfer_id')
      .field('a.hardness_id')
      .field('a.thickness_id')
      .field('heat.heat_transfer')
      .field('h.hardness')
      .field('t.thickness')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.thermal_pad'), 'a')
      .join('formula.thermal_pad_heat','heat','a.heat_transfer_id=heat.id')
      .join('formula.thermal_pad_hardness','h','a.hardness_id=h.id')
      .join('formula.thermal_pad_thickness','t','a.thickness_id=t.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_pad', scheduleDateId.schdeule_id), 'b', 'a.id = b.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalGrease(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.id')
      .field('a.grease_name')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.thermal_grease').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_grease', scheduleDateId.schdeule_id), 'b', 'a.id = b.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalCommonMaterial(paras){
    // type : Adhesive_of_Mylar_Sponge_Poron or Mylar_of_Mylar_Sponge_Poron
    // Sponge_of_Mylar_Sponge_Poron,
    let type = paras[0] ? paras[0] : null
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
      .field('b.parts_ctgy_2_id').field('b.parts_ctgy_2_id')
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
    
    if(type) sql.where('b.category_2_name = ?', type)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getClipMaterial(paras){
    let scheduleDateId = await schedule.getScheduleDate('material')
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.material_metal').where('disable_time is null'), 'a')
      .join(
        squel.select().from('formula.material_thinkness').where('disable_time is null')
        , 'b', 'a.id=b.material_metal_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material_thinkness', scheduleDateId.schdeule_id), 'd', 'b.id = d.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFanBladeMaterial(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.material_id')
      .field('b.material_name')
      .field('a.fan_id')
      .field('c.fan_size')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.thermal_fan_fan_material').where('disable_time is null'), 'a')
      .join(
        squel.select().from('formula.thermal_fan_material').where('disable_time is null')
        , 'b', 'a.material_id = b.id')
      .join(
        squel.select().from('formula.thermal_fan').where('disable_time is null')
        , 'c', 'a.fan_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan_fan_material', scheduleDateId.schdeule_id), 'd', 'a.id = d.parameter_id')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFanSize(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.id')
      .field('a.fan_size')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.thermal_fan').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan', scheduleDateId.schdeule_id), 'b', 'a.baseline = b.parameter_id')
      .order('a.sort_order')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFinMaterial(){
    let scheduleDateId = await schedule.getScheduleDate('material')
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .field('a.density')
      .field('b.thickness')
      .field('d.value')
      .field('d.activate_date')
      .from(squel.select().from('formula.material_metal'), 'a')
      .join(
        squel.select().from('formula.material_thinkness').where('disable_time is null')
        , 'b', 'a.id=b.material_metal_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material_thinkness', scheduleDateId.schdeule_id), 'd', 'b.id = d.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalMaterial(paras) {
    let scheduleDateId = await schedule.getScheduleDate('material')
    let category_type = paras[0] ? paras[0] : null

    let sql = squel.select()
      .field('b.material_id', 'material_id')
      .field('b.name', 'name')
      .field('b.density', 'density')
      .field('b.id')
      .field('b.thickness', 'thickness')
      .field('d.value', 'value')
      .field('d.activate_date', 'activate_date')
      .from(squel.select().from('formula.thermal_category').where('disable_time is null'), 'a')
      .join(
        squel.select()
          .field('a.id', 'material_id')
          .field('a.name', 'name')
          .field('a.density', 'density')
          .field('b.id')
          .field('b.thickness', 'thickness')
          .from('formula.material_metal', 'a')
          .left_join('formula.material_thinkness', 'b', 'a.id = b.material_metal_id')
          .where('a.disable_time is null').where('b.disable_time is null')
        , 'b', 'a.metal_material_id = b.material_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material_thinkness', scheduleDateId.schdeule_id), 'd', 'b.id = d.parameter_id')
      .order('b.thickness', true)
    if (category_type) sql.where('a.category_type = ?', category_type)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalFanType() {
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.name', 'name')
      .from(squel.select().from('formula.v_thermal_fan_type').where('disable_time is null'), 'a')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalFanVendorLocate(){
    let sql = squel.select()
      .field('a.id')
      .field('a.locate')
      .from(squel.select().from('formula.thermal_fan_vendor_locate').where('disable_time is null'), 'a')
      .where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getThermalFanLossRate(){
    let scheduleDateId = await schedule.getScheduleDate('thermal_module')
    let sql = squel.select()
      .field('a.id')
      .field('a.fan_size')
      .field('b.value')
      .field('b.activate_date')
      .from(squel.select().from('formula.thermal_fan').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'thermal_fan', scheduleDateId.schdeule_id), 'b', 'a.loss_rate = b.parameter_id')
      .order('a.sort_order')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getThermalFanVoltage(){
    let sql = squel.select()
      .field('id')
      .field('spec_name', 'name')
      .from('formula.me_spec')
      .where('spec_category = \'thermal_fan_voltage\'')
      .where('disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}
module.exports = thermal