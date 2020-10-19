let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')
const SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID = -1
class plastic {
  static async getPlasticCommon(paras) {
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', this.productTypeId)
    let part_type = paras[0] ? paras[0] : null
    let label = paras[1] ? paras[1] : null
    let sql = squel.select()
      .field('a.id', 'id')
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
        squel.select()
          .field('id')
          .from('formula.formula_type')
          .where('name = ?', 'housing_plastic'),
        scheduleDateId.schdeule_id)
      .where('a.product_type_id = ?', this.productTypeId)
    if (part_type) sql.where('a.part_type = ?', part_type)
    if (label) sql.where('a.label = ?', label)
    sql.where('a.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticMaterial(paras) {
    // let product_type = paras[0] ? paras[0] : null
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('c.id', 'type_id')
      .field('c.type_name', 'type_name')
      .field('b.id', 'loss_rate_id')
      .field('b.loss_rate_name', 'loss_rate_name')
      .field('CAST(d.value AS double precision)', 'value')
      .field('d.activate_date', 'activate_date')
      .from(squel.select().from('formula.plastic_material_loss_rate_product_type').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.plastic_material_loss_rate').where('disable_time is null'), 'b', 'a.plastic_material_loss_rate_id = b.id')
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'c', 'a.product_type_id=c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_material_loss_rate_product_type', scheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')
    if (this.productTypeId) {
      sql.where('c.id = ?', this.productTypeId)
    }
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticMaterialDropDownList() {
    let sql = squel.select()
      .distinct()
      .field('material.id', 'material_id')
      .field('material.material_name', 'material_name')
      .field('ms.material_spec_name', 'material_spec_name')
      .field('ms.id', 'material_spec_id')
      .field('pc2.category_name', 'part_category_2_name')
      .field('pc2.id', 'part_category_2_id')
      .from('formula.material material')
      .join('formula.material_spec', 'ms', 'ms.id = material.material_spec_id')
      .join('formula.part_category_material', 'pcm', 'pcm.material_id = material.id')
      .join('formula.part_category_2', 'pc2', 'pc2.id = pcm.part_category_2_id')
      .join('formula.part_category_1', 'pc1', 'pc1.id = pc2.part_category_1_id')
      .where('material.disable_time is null')
      .where('ms.disable_time is null')
      .where('pcm.disable_time is null')
      .where('pc2.disable_time is null')
      .where('pc1.disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getHousingPlasticMaterialWithSpec(paras) {
    // let product_type = paras[0] ? paras[0] : null
    let scheduleDateId = await schedule.getScheduleDate('material')

    let joinSql = squel.select()
      .field('b.format_key')
      .field('c.category_name')
      .field('c.id')
      .from('wiprocurement.bom_partlist_config', 'a')
      .join('wiprocurement.bom_partlist_format', 'b', 'a.format = b.id')
      .join('formula.part_category_2', 'c', 'c.id = a.parts_ctgy_2')
      .where('b.format_key = ?', 'housing-plastic')

    let sql = squel.select()
      .field('a.material_id', 'id')
      .field('c.id', 'material_id')
      .field('c.material_name', 'material_name')
      .field('e.id', 'material_spec_id')
      .field('e.material_spec_name', 'material_spec_name')
      .field('b.id', 'part_category_2_id')
      .field('b.category_name', 'part_category_2_name')
      .field('d.value', 'value')
      .field('d.activate_date', 'activate_date')
      .from(squel.select().from('formula.part_category_material').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.material').where('disable_time is null'), 'c', 'a.material_id = c.id')
      .join(squel.select().from('formula.material_spec').where('disable_time is null'), 'e', 'c.material_spec_id = e.id')
      .join(joinSql, 'b', 'a.part_category_2_id = b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material', scheduleDateId.schdeule_id)
        , 'd', 'd.parameter_id = a.material_id')
    // if (product_type) sql.where('c.type_name = ?', product_type.toUpperCase())
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getHousingPlastic_DoubleInjection(paras) {
    // let product_type = paras[0] ? paras[0] : null
    let scheduleDateId = await schedule.getScheduleDate('material')

    // 20191204 add double injection with plastic material link
    // only query double injection material
    // let joinSql = squel.select()
    //   .field('a.category_name', 'categroy_1_name')
    //   .field('a.id', 'categroy_1_id')
    //   .field('b.category_name', 'categroy_2_name')
    //   .field('b.id', 'categroy_2_id')
    //   .from('formula.part_category_1', 'a')
    //   .join('formula.part_category_2', 'b', 'a.id = b.part_category_1_id')
    //   .where('a.category_name= ?', 'Housing').where('b.category_name= ?', 'Double_Injection')
    //   .where('a.disable_time is null').where('b.disable_time is null')

    let sql = squel.select()
      .field('a.material_id', 'id')
      .field('a.material_name', 'material_name')
      .field('a.material_spec_id', 'material_spec_id')
      .field('a.material_spec_name', 'material_spec_name')
      .field('d.value', 'value')
      .field('d.activate_date', 'activate_date')
      .from(squel.select().from('formula.v_double_injection_material').where('disable_time is null'), 'a')
      // .from(squel.select().from('formula.part_category_material').where('disable_time is null'), 'a')
      // .join(squel.select().from('formula.material').where('disable_time is null'), 'c', 'a.material_id = c.id')
      // .join(squel.select().from('formula.material_spec').where('disable_time is null'), 'e', 'c.material_spec_id = e.id')
      // .join(joinSql, 'b', 'a.part_category_2_id = b.categroy_2_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'material', scheduleDateId.schdeule_id)
        , 'd', 'd.parameter_id = a.material_id')
    // if (product_type) sql.where('c.type_name = ?', product_type.toUpperCase())

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPaintProcess (paras) {
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('b.type_name', 'product_type')
      .field('c.usd_min_id', 'usd_min_id')
      .field('c.usd_min_value', 'usd_min_value')
      .field('c.man_hour_id', 'man_hour_id')
      .field('c.man_hour_value', 'man_hour_value')
      .from(
        squel.select().field('product_type_id').from('formula.plastic_paint_man_power').distinct(), 'a'
      )
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'b', 'a.product_type_id=b.id')
      .left_join(
        squel.select().field('c.usd_min', 'usd_min_id').field('d.value', 'usd_min_value')
          .field('c.man_hour', 'man_hour_id').field('e.value', 'man_hour_value').field('c.product_type_id')
          .from(squel.select().from('formula.plastic_paint_info').where('disable_time is null'), 'c')
          .left_join(
            squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
              .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
              .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_paint_info', scheduleDateId.schdeule_id)
            , 'd', 'c.usd_min = d.parameter_id')
          .left_join(
            squel.select().field('f.*').field('g.activate_date').from('formula.parameter_value', 'f')
              .join('formula.schedule_date', 'g', ' g.id = f.activate_date_id')
              .where('f.source_table= ? and f.activate_date_id = ?', 'plastic_paint_info', scheduleDateId.schdeule_id)
            , 'e', 'c.man_hour = e.parameter_id')
        , 'c', 'c.product_type_id=b.id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPlasticPaintManPower (paras) {
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)

    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.category_name', 'category_name')
      .field('b.id', 'product_id')
      .field('b.type_name', 'product_type')
      .field('c.value', 'value')
      .field('c.activate_date', 'activate_date')
      .from(squel.select().from('formula.plastic_paint_man_power').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'b', 'a.product_type_id=b.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_paint_man_power', scheduleDateId.schdeule_id)
        , 'c', 'a.id = c.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPaintMachine(){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.machine_name', 'machine_name')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .from(squel.select().from('formula.plastic_paint_machine').where('disable_time is null'), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_paint_machine', scheduleDateId.schdeule_id)
        , 'b', 'a.id = b.parameter_id')
      .order('a.machine_name', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticSinglePaint(paras){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let paint_type = paras[0] ? paras[0] : null
    let vendor = paras[1] ? paras[1] : null

    let sql = squel.select().from('formula.plastic_paint_vendor_type_color', 'a')
      .field('a.id', 'id')
      .field('b.id', 'vendor_id')
      .field('b.vendor_name', 'vendor_name')
      .field('c.id', 'bottom_top_id')
      .field('c.bottom_top_name', 'botton_top_name')
      .field('d.paint_type_id', 'paint_type_id')
      .field('d.type_name', 'type_name')
      .field('d.paint_color_id', 'paint_color_id')
      .field('d.color_name', 'color_name')
      .field('e.value', 'value')
      .field('e.activate_date', 'activate_date')
      .join(squel.select().from('formula.plastic_paint_vendor').where('disable_time is null'), 'b', 'a.paint_vendor_id = b.id')
      .join(squel.select().from('formula.plastic_paint_bottom_top').where('disable_time is null'), 'c', 'a.paint_button_top_id = c.id')
      .join(
        squel.select().field('a.id', 'id').field('a.paint_color_id', 'paint_color_id').field('a.paint_type_id', 'paint_type_id')
          .field('c.type_name').field('b.color_name')
          .from(squel.select().from('formula.plastic_paint_type_color').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.plastic_paint_color').where('disable_time is null'), 'b', 'a.paint_color_id = b.id')
          .join(squel.select().from('formula.plastic_paint_type').where('disable_time is null'), 'c', 'c.id = a.paint_type_id')
        , 'd', ' a.paint_type_color_id = d.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_paint_vendor_type_color', scheduleDateId.schdeule_id)
        , 'e', 'a.id = e.parameter_id')
    if(paint_type) sql.where('c.botton_top_name = ?', paint_type)
    if(vendor) sql.where('c.vendor_name = ?', vendor)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPaintType(paras){
    let sql = squel.select()
      .field('a.id')
      .field('a.paint_type_id')
      .field('c.type_name', 'type_name')
      .field('a.paint_color_id')
      .field('b.color_name', 'color_name')
      .from(squel.select().from('formula.plastic_paint_type_color').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.plastic_paint_color').where('disable_time is null'), 'b', 'a.paint_color_id = b.id')
      .join(squel.select().from('formula.plastic_paint_type').where('disable_time is null'), 'c', 'a.paint_type_id = c.id')
      .order('c.type_name', true)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPaintVendor(paras){
    let sql = squel.select()
      .field('a.*')
      .from(squel.select().from('formula.v_plastic_painting_vendor_v2'), 'a')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPaintPrice(paras){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let joinSql = squel.select()
      .field('a.id', 'plastic_paint_type_color_bottom_top_id')
      .field('b.id', 'bottom_top_id')
      .field('b.bottom_top_name')
      .field('c.paint_type_id', 'paint_type_id')
      .field('c.paint_color_id', 'paint_color_id')
      .field('c.color_name')
      .field('c.type_name')
      .from(squel.select().from('formula.plastic_paint_type_color_bottom_top').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.plastic_paint_bottom_top').where('disable_time is null'), 'b', 'a.paint_bottom_top_id = b.id')
      .join(
        squel.select().field('a.id').field('a.paint_color_id', 'paint_color_id').field('a.paint_type_id', 'paint_type_id')
          .field('c.type_name').field('b.color_name')
          .from(squel.select().from('formula.plastic_paint_type_color').where('disable_time is null'), 'a')
          .join(squel.select().from('formula.plastic_paint_color').where('disable_time is null'), 'b', 'a.paint_color_id = b.id')
          .join(squel.select().from('formula.plastic_paint_type').where('disable_time is null'), 'c', 'a.paint_type_id = c.id')
        , 'c', 'a.paint_type_color_id = c.id')

    let sql = squel.select().from(squel.select().from('formula.plastic_paint_vendor').where('disable_time is null'), 'a')
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
      .join(squel.select().from('formula.plastic_paint_vendor_type_color_bottom_top').where('disable_time is null'), 'b', 'a.id = b.paint_vendor_id')
      .join(joinSql, 'c', 'c.plastic_paint_type_color_bottom_top_id = b.type_color_bottom_top_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_paint_vendor_type_color_bottom_top', scheduleDateId.schdeule_id)
        , 'e', 'b.id = e.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPaintFormulaPrice() {
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
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
      .from('formula.v_plastic_painting_vendor_type_color_bottom_top', 'vlink')
      .left_join('formula.plastic_paint_formula', 'pf', 'vlink.id = pf.paint_id')
      .left_join('formula.plastic_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = pf.id')
      .where('pv.activate_date_id = ?', scheduleDateId.schdeule_id)

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getPlasticMachinePrice(paras){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', SCHEDULE_DATE_COMMON_PRODUCT_TYPE_ID)
    let category_name = paras[0] ? paras[0] : null
    // let product_type = paras[1] ? paras[1] : null
    let moduleSql = squel.select()
      .field('a.module_id')
      .field('c.type_name')
      .field('b.id', 'category_id')
      .field('b.category_name')
      .field('d.module_name')
      .field('a.product_type_id')
      .field('a.part_category_2_id')
      .from(squel.select().from('formula.product_type_category_module').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'b', 'a.part_category_2_id = b.id')
      .join(squel.select().from('formula.product_type').where('disable_time is null'), 'c', 'a.product_type_id = c.id')
      .join(squel.select().from('formula.module').where('disable_time is null'), 'd', 'a.module_id = d.id')
    if(category_name) moduleSql.where('b.category_name = ?', category_name)
    // if(product_type) moduleSql.where('c.type_name = ?', product_type)
    moduleSql.where('c.id = ?', this.productTypeId)

    let sql = squel.select().from('formula.module_machine', 'a')
      .field('a.id', 'id')
      .field('pl_ma.loss_rate_name', 'process_name')
      .field('b.category_name', 'category_name')
      .field('b.product_type_id', 'product_type_id')
      .field('b.type_name', 'product_type')
      .field('b.module_id', 'module_id')
      .field('b.module_name', 'module_name')
      .field('c.id', 'ton_id')
      .field('c.ton', 'ton')
      .field('d.value', 'value')
      .field('d.activate_date', 'activate_date')
      .join(moduleSql, 'b', 'a.module_id = b.module_id')
      .join(squel.select().from('formula.machine').where('disable_time is null'), 'c', 'a.machine_id = c.id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'module_machine', scheduleDateId.schdeule_id)
        , 'd', 'a.id = d.parameter_id')
      .left_join('formula.plastic_material_loss_rate', 'pl_ma', 'pl_ma.category_2_id = b.category_id and pl_ma.disable_time is null')
    let result = await systemDB.Query(sql.toParam())

    // console.log('================>', sql.toString())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticMacine(){
    let sql = squel.select().field('a.id', 'id').field('a.ton', 'ton').from(squel.select().from('formula.machine').where('disable_time is null'), 'a')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticGrinding(paras){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.grinding_name', 'grinding_name')
      .field('a.total_cost', 'unit_price_id')
      .field('c.value', 'unit_price_value')
      .field('c.activate_date', 'unit_price_activate_date')
      .from(
        squel.select()
          .from('formula.plastic_grinding')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId),
        'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_grinding', scheduleDateId.schdeule_id)
        , 'c', 'a.total_cost = c.parameter_id'
      )
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticEmbedNail(){
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'nail_id')
      .field('a.unit_price', 'id')
      .field('a.embed_nail_name', 'embed_nail_name')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .from(
        squel.select().from('formula.plastic_embed_nail')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId), 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_embed_nail', scheduleDateId.schdeule_id)
        , 'b', 'a.unit_price = b.parameter_id'
      )
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }


  static async getPlasticEmiPrice(paras){
    // let scheduleDateId = await schedule.getScheduleDate('housing_plastic')
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', this.productTypeId)


    let site = paras[0] ? paras[0] : null
    let siteSql = squel.select().from(squel.select().from('formula.plastic_emi_sputtering_site_group').where('disable_time is null'), 'a')
      .join(squel.select().from('formula.plastic_emi_sputtering_group').where('disable_time is null'), 'b', ' a.group_id = b.id')
      .join(squel.select().from('formula.site'), 'c', 'c.id = a.site_id')
    if(site) siteSql.where('c.site_name = ? ', site.toUpperCase())
    let sql = squel.select()
      .field('a.id', 'id')
      .field('b.id', 'emi_size_id')
      .field('b.emi_size', 'emi_size')
      .field('b.size', 'size')
      .field('c.id', 'emi_base_id')
      .field('c.emi_base', 'emi_base')
      .field('d.site_name', 'site_name')
      .field('e.value', 'value')
      .field('e.activate_date', 'activate_date')
      .field('a.product_type_id')
      .from(
        squel.select()
          .from('formula.plastic_emi_sputtering_link')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId),
        'a')
      .join(squel.select().from('formula.plastic_emi_sputtering_size').where('disable_time is null'), 'b', 'b.id = a.size_id')
      .join(squel.select().from('formula.plastic_emi_sputtering_base').where('disable_time is null'), 'c', 'c.id = a.base_id')
      .join(siteSql, 'd', 'a.group_id = d.group_id')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_emi_sputtering_link', scheduleDateId.schdeule_id)
        , 'e', 'a.id = e.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticEmiBase() {
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.emi_base', 'emi_base')
      .from(squel.select().from('formula.plastic_emi_sputtering_base').where('disable_time is null'), 'a')
      .where('product_type_id = ?', this.productTypeId)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticEmiSize() {
    let sql = squel.select()
      .field('a.id', 'id')
      .field('a.emi_size', 'emi_size')
      .field('a.size', 'size')
      .from(squel.select().from('formula.plastic_emi_sputtering_size').where('disable_time is null'), 'a')
      .where('product_type_id = ?', this.productTypeId)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPrinting() {
    let scheduleDateId = await schedule.getScheduleDate('housing_plastic', this.productTypeId)
    let sql = squel.select()
      .field('a.id', 'printing_id')
      .field('a.printing_name', 'printing_name')
      .field('a.unit_price', 'unit_price_id')
      .field('c.value', 'unit_price_value')
      .field('c.activate_date', 'unit_price_activate_date')
      .from(
        squel.select()
          .from('formula.plastic_printing')
          .where('disable_time is null')
          .where('product_type_id = ?', this.productTypeId),
        'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join('formula.schedule_date', 'e', ' e.id = d.activate_date_id')
          .where('d.source_table= ? and d.activate_date_id = ?', 'plastic_printing', scheduleDateId.schdeule_id)
        , 'c', 'a.unit_price = c.parameter_id')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticPrintCount(){
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_plastic_printing_count').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlasticToolingBonder() {
    let sql = squel.select()
      .field('a.id')
      .field('a.name')
      .from(squel.select().from('formula.v_tooling_plastic_tax').where('disable_time is null'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPlasticPaintingThickness(){
    let sql = squel.select()
      .field('id')
      .field('name')
      .field('disable_time')
      .from('formula.v_plastic_painting_thickness')
      // .where('disable_time is null') // eMDM 舊資料處理，後端不濾掉 disabled 的項目，由前端濾掉

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPlasticCNCProcess(){
    let sql = squel.select()
      .field('id')
      .field('name')
      .from('formula.v_plastic_cnc_process_area')
      .where('disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPlasticCNCFeeder(){
    let sql = squel.select()
      .field('id')
      .field('name')
      .from('formula.v_plastic_cnc_feeder_type')
      .where('disable_time is null')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = plastic
