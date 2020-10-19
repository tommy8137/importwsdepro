let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')
const SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID = -1
class metal {
  static async getGlue() {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'metal_glue_id')
      .field('a.glue_name', 'glue_name')
      .field('b.value', 'usd_g')
      .field('c.value', 'density')
      .field('b.activate_date', 'usd_g_activate_date')
      .field('c.activate_date', 'density_activate_date')
      .from(
        squel.select()
          .from('formula.metal_glue')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId),
        'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_glue', scheduleDateId.schdeule_id)
        , 'b', 'a.usd_g = b.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_glue', scheduleDateId.schdeule_id)
        , 'c', 'a.density = c.parameter_id')
      // .left_join(
      //   squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
      //   , 'b', 'a.usd_g = b.parameter_id')
      // .left_join(
      //   squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
      //   , 'c', 'a.density = c.parameter_id')
      // .where('b.source_table = ? and c.source_table = ? and b.activate_date_id = ? and c.activate_date_id = ?', 'metal_glue', 'metal_glue', scheduleDateId.schdeule_id, scheduleDateId.schdeule_id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getCommon(paras){
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null
    let materialName = paras[2] ? paras[2] : null
    if(materialName) {
      materialName.split(0, 2) == 'AL' ? label = 'material_AL_loss_rate' : label = 'material_Metal_loss_rate'
    }
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('b.value', 'value')
      .field('CAST(b.value AS double precision)', 'value')
      .field('b.activate_date', 'activate_date')
      .field('a.unit', 'unit')
      .field('a.part_type', 'part_type')
      .field('a.label', 'label')
      .field('a.label_name', 'label_name')
      .from('formula.common_parameter', 'a')
      .left_join(
        squel.select()
          .field('d.*')
          .field('e.activate_date')
          .from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', `e.id = d.activate_date_id and e.product_type_id = ${this.productTypeId}`)
          .where('d.source_table= ?', 'common_parameter')
        , 'b', 'a.id = b.parameter_id')
      .where('a.formula_type_id = ? and b.activate_date_id = ?',
        squel.select().field('id').from('formula.formula_type')
          .where('name = ?', 'housing_metal')
        , scheduleDateId.schdeule_id)
      .where('a.product_type_id = ?', this.productTypeId)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPressType(){
    let sql = squel.select()
      .field('pt.id')
      .field('pt.type_name')
      .from('formula.metal_press_type', 'pt')
      .where('pt.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getTonnes(){
    let sql = squel.select()
      .field('mm.id')
      .field('mm.ton')
      .field('link.press_type_id')
      .from('formula.machine_metal', 'mm')
      .left_join('formula.metal_press_module_machine_type', 'link', 'mm.id = link.machine_id')
      .left_join('formula.module_metal', 'mmetal', 'mmetal.id = link.module_id')
      .where('mmetal.disable_time is null')
      .where('mmetal.product_type_id  = ?', this.productTypeId)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }


  static async getAnode() {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'anode_color_id')
      .field('a.name', 'anode_color_name')
      .field('b.value', 'anode_time')
      .field('b.activate_date', 'anode_time_activate_date')
      .field('CAST(c.value AS double precision)', 'loss_rate')
      .field('c.activate_date', 'loss_rate_activate_date')
      .field('d.value', 'usd_mm2')
      .field('d.activate_date', 'usd_mm2_activate_date')
      .field('e.value', 'ratio')
      .field('e.activate_date', 'ratio_activate_date')
      .from(
        squel.select()
          .from('formula.metal_anode_color')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId),
        'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ?', 'metal_anode_color')
        , 'b', 'a.anode_time = b.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ?', 'metal_anode_color')
        , 'c', 'a.loss_rate = c.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ?', 'metal_anode_color')
        , 'd', 'a.usd_mm2 = d.parameter_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ?', 'metal_anode_color')
        , 'e', 'a.ratio = e.parameter_id')
      .where('b.activate_date_id = ? and c.activate_date_id = ? and d.activate_date_id = ? and e.activate_date_id = ?', scheduleDateId.schdeule_id, scheduleDateId.schdeule_id, scheduleDateId.schdeule_id, scheduleDateId.schdeule_id )
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPaint(){
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.painting_name', 'painting_name')
      .field('f.value', 'usd_kg')
      .field('f.activate_date', 'activate_date')
      .from(squel.select().from('formula.metal_painting').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
        , 'f', 'a.usd_kg = f.parameter_id')
      .where('f.activate_date_id = ?', scheduleDateId.schdeule_id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMaterial(){
    let scheduleDateId = await schedule.getScheduleDate('material')
    let sql = squel.select()
      .field('c.id', 'id')
      .field('a.id', 'material_id')
      .field('a.name', 'name')
      .field('a.density', 'density')
      .field('c.thickness', 'thickness')
      .field('f.value', 'value')
      .field('f.activate_date', 'activate_date')
      .from(squel.select().from('formula.material_metal').where('disable_time is null'), 'a')
      // .join(
      //   squel.select().field('material_metal_id').from('formula.part_category_material_metal').where('disable_time is null'), 'b', 'a.id = b.material_metal_id')
      .join(squel.select().from('formula.material_thinkness').where('disable_time is null'), 'c', 'a.id = c.material_metal_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
        , 'f', 'c.id = f.parameter_id')
      .where('f.activate_date_id = ?', scheduleDateId.schdeule_id).distinct()
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalMaterialDropDownList(){

    let sql = squel.select().distinct()
      .field('a.id', 'material_id')
      .field('a.name', 'material_name')
      .field('pc2.category_name', 'part_category_2_name')
      .field('pc2.id', 'part_category_2_id')
      .from('formula.material_metal a')
      .join('formula.part_category_material_metal', 'pcmm', 'pcmm.material_metal_id = a.id')
      .join('formula.part_category_2', 'pc2', 'pc2.id = pcmm.pategory_category_2_id')
      .join('formula.part_category_1', 'pc1', 'pc1.id = pc2.part_category_1_id')
      .where('a.disable_time is null')
      .where('pcmm.disable_time is null')
      .where('pc2.disable_time is null')
      .where('pc1.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getGlueSyringeDiameter() {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', this.productTypeId)
    let sql = squel.select()
      .field('syringe_name')
      .field('metal_syringe.id', 'syringe_id')
      .field('value')
      .field('activate_date')
      .from(
        squel.select()
          .from('formula.metal_syringe')
          .where('disable_time is null'), 'metal_syringe')
      .where('product_type_id = ?', this.productTypeId)
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_syringe', scheduleDateId.schdeule_id)
        , 'b', 'metal_syringe.syringe_diameter = b.parameter_id')
      .order('syringe_name', true)
      // .join('formula.parameter_value', 'parameter_value', 'metal_syringe.syringe_diameter = parameter_value.parameter_id')
      // .join('formula.schedule_date', 'schedule_date', 'schedule_date.id = parameter_value.activate_date_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getModuleMachinePressPrice() {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID) // 共用參數product type id給null
    let subSql = squel.select()
      .field('d.*')
      .field('e.activate_date')
      .from('formula.parameter_value', 'd')
      .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
      .where('d.source_table= ? and d.activate_date_id = ?', 'metal_press_module_machine_type', scheduleDateId.schdeule_id)

    let sql = squel.select()
      .field('machine_metal.id', 'machine_metal_id')
      .field('machine_metal.ton')
      .field('ma_remark.bolster')
      .field('link.press_type_id')
      .field('press_type.type_name', 'press_type_name')
      .field('b.value')
      .field('b.activate_date')
      .field('pc2.category_name')
      .from('formula.metal_press_module_machine_type', 'link')
      .join('formula.module_metal', 'module_metal', 'link.module_id = module_metal.id and module_metal.disable_time is null')
      .join('formula.machine_metal', 'machine_metal', 'link.machine_id = machine_metal.id and machine_metal.disable_time is null')
      .join('formula.metal_press_type', 'press_type', 'link.press_type_id = press_type.id and press_type.disable_time is null')
      .join('formula.metal_press_machine_remark', 'ma_remark', 'ma_remark.machine_id = link.machine_id and ma_remark.press_type_id = link.press_type_id')
      .left_join(subSql, 'b', 'link.id = b.parameter_id')
      .left_join('formula.metal_type_part_category', 'mtpc', 'mtpc.metal_type_id = module_metal.metal_type_id')
      .left_join('formula.part_category_2', 'pc2', 'pc2.id = mtpc.part_category_2_id')
      .where('link.disable_time is null')
      .where('module_metal.product_type_id = ?', this.productTypeId)
    console.log(sql.toString());
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getHosingMetalCatg2() {
    let sql = squel.select()
      .field('b.id', 'category_id')
      .field('b.category_name', 'category_name')
      .field('c.format_key', 'format_key')
      .from('wiprocurement.bom_partlist_config', 'a')
      .join('formula.part_category_2', 'b', 'a.parts_ctgy_2 = b.id')
      .join('wiprocurement.bom_partlist_format', 'c', 'a.format = c.id')
      .where('c.format_key=?', 'housing-metal')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMetalDrill(paras){
    let drill_type = paras[2] ? paras[2] : null
    let scheduleDateId = await schedule.getScheduleDate('housing_metal') // 共用參數product type id給null
    let sql = squel.select()
      .field('a.id', 'metal_material_drill_feature_id')
      .field('b.id', 'drill_type_id')
      .field('c.id', 'drill_feature_id')
      .field('CONCAT(b.name, c.name)', 'drill_type_name')
      .field('d.value', 'price')
      .field('d.activate_date', 'price_activate_date')
      .from(squel.select().from('formula.metal_material_drill_feature').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.metal_material_drill_type').where('disable_time is null'), 'b', 'a.material_drill_id = b.id')
      .left_join(squel.select().from('formula.metal_material_drill_feature_type').where('disable_time is null'), 'c', 'a.material_drill_feature_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd').join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_material_drill_feature', scheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')
    if(drill_type) sql.where('b.drill_type = ?', drill_type)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMetalAnode() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'metal_anode_process'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMetalGlueCycleTime(){
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'metal_glue_cycle_time'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getMetalSandBlastSide() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'metal_sand_process'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintingThickness(){
    let sql = squel.select()
      .field('id')
      .field('name')
      .field('disable_time')
      .from('formula.v_metal_painting_thickness')
      // .where('disable_time is null') // eMDM 舊資料處理，後端不濾掉 disabled 的項目，由前端濾掉
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPaintFormulaPrice() {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('vlink.paint_type_name', 'type_name')
      .field('vlink.paint_color_name', 'color_name')
      .field('vlink.paint_bottom_top_name', 'bottom_top_name')
      .field('vlink.paint_vendor_name', 'vendor_name')
      .field('pt.label')
      .field('pt.label_name')
      .field('pt.field_type')
      .field('pt.data_type')
      .field('pv.value', 'value')
      .from('formula.v_metal_painting_vendor_type_color_bottom_top', 'vlink')
      .left_join('formula.metal_paint_formula', 'pf', 'vlink.id = pf.paint_id')
      .left_join('formula.metal_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = pf.id')
      .where('pv.activate_date_id = ?', scheduleDateId.schdeule_id)
    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getMetalPaintVendor(paras){
    let sql = squel.select()
      .field('*')
      .from('formula.v_metal_painting_vendor_v2')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintType(paras){
    let sql = squel.select()
      .field('a.id')
      .field('a.paint_type_id')
      .field('c.type_name', 'type_name')
      .field('a.paint_color_id')
      .field('b.color_name', 'color_name')
      .from(squel.select().from('formula.metal_paint_type_color').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.metal_paint_color').where('disable_time is null'), 'b', 'a.paint_color_id = b.id')
      .join(squel.select().from('formula.metal_paint_type').where('disable_time is null'), 'c', 'a.paint_type_id = c.id')
      .order('c.type_name', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintProcess (paras) {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('b.type_name', 'product_type')
      .field('c.usd_min_id', 'usd_min_id')
      .field('c.usd_min_value', 'usd_min_value')
      .field('c.man_hour_id', 'man_hour_id')
      .field('c.man_hour_value', 'man_hour_value')
      .from(
        squel.select().field('product_type_id').from('formula.metal_paint_man_power').distinct(), 'a'
      )
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'b', 'a.product_type_id=b.id')
      .left_join(
        squel.select().field('c.usd_min', 'usd_min_id').field('d.value', 'usd_min_value')
          .field('c.man_hour', 'man_hour_id').field('e.value', 'man_hour_value').field('c.product_type_id')
          .from(squel.select().from('formula.metal_paint_info').where('disable_time is null'), 'c')
          .left_join(
            squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
              .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
              .where('d.source_table= ? and d.activate_date_id = ?', 'metal_paint_info', scheduleDateId.schdeule_id)
            , 'd', 'c.usd_min = d.parameter_id')
          .left_join(
            squel.select().field('f.*').field('g.activate_date').from('formula.parameter_value', 'f')
              .join('formula.schedule_date', 'g', ' g.id = f.activate_date_id')
              .where('f.source_table= ? and f.activate_date_id = ?', 'metal_paint_info', scheduleDateId.schdeule_id)
            , 'e', 'c.man_hour = e.parameter_id')
        , 'c', 'c.product_type_id=b.id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintMachine(){
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.machine_name', 'machine_name')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .from(squel.select().from('formula.metal_paint_machine').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_paint_machine', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
      .order('a.machine_name', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintManPower (paras) {
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)

    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.category_name', 'category_name')
      .field('b.id', 'product_id')
      .field('b.type_name', 'product_type')
      .field('c.value', 'value')
      .field('c.activate_date', 'activate_date')
      .from(squel.select().from('formula.metal_paint_man_power').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'b', 'a.product_type_id=b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_paint_man_power', scheduleDateId.schdeule_id)
        , 'c', 'a.id = c.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintPrice(paras){
    let scheduleDateId = await schedule.getScheduleDate('housing_metal', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let joinSql = squel.select()
      .field('a.id', 'metal_paint_type_color_bottom_top_id')
      .field('b.id', 'bottom_top_id')
      .field('b.bottom_top_name')
      .field('c.paint_type_id', 'paint_type_id')
      .field('c.paint_color_id', 'paint_color_id')
      .field('c.color_name')
      .field('c.type_name')
      .from(squel.select().from('formula.metal_paint_type_color_bottom_top').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.metal_paint_bottom_top').where('disable_time is null'), 'b', 'a.paint_bottom_top_id = b.id')
      .join(
        squel.select().field('a.id').field('a.paint_color_id', 'paint_color_id').field('a.paint_type_id', 'paint_type_id')
          .field('c.type_name').field('b.color_name')
          .from(squel.select().from('formula.metal_paint_type_color').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.metal_paint_color').where('disable_time is null'), 'b', 'a.paint_color_id = b.id')
          .join(squel.select().from('formula.metal_paint_type').where('disable_time is null'), 'c', 'a.paint_type_id = c.id')
        , 'c', 'a.paint_type_color_id = c.id')

    let sql = squel.select().from(squel.select().from('formula.metal_paint_vendor').where('disable_time is null'), 'a')
      .field('b.id', 'id')
      .field('a.id', 'vendor_id')
      .field('a.vendor_name', 'vendor_name')
      .field('c.bottom_top_id', 'bottom_top_id')
      .field('c.bottom_top_name', 'bottom_top_name')
      .field('c.paint_type_id', 'paint_type_id')
      .field('c.paint_color_id', 'paint_color_id')
      .field('c.color_name', 'color_name')
      .field('c.type_name', 'type_name')
      .field('e.value', 'value')
      .field('e.activate_date', 'activate_date')
      .join(squel.select().from('formula.metal_paint_vendor_type_color_bottom_top').where('disable_time is null'), 'b', 'a.id = b.paint_vendor_id')
      .join(joinSql, 'c', 'c.metal_paint_type_color_bottom_top_id = b.type_color_bottom_top_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'metal_paint_vendor_type_color_bottom_top', scheduleDateId.schdeule_id)
        , 'e', 'b.id = e.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMetalPaintTypeThickness() {
    let sql = squel.select()
      // .field('id')
      .field('type_id')
      .field('type_name')
      .field('thickness_id')
      .field('thickness::float')
      .from('formula.metal_paint_type_and_thickness')
      .order('type_name')
      .order('thickness')
      .where('disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = metal


