const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Plastic model')
const commonModel = require('../common/common.js')
const databaseCommonModel = require('./common.js')
const PLASTIC_PART_CATEGORY2_NAME = 'Plastic'
class Plastic {

  static async fetchMdouleList () {
    let sql = squel.select()
      .field('id')
      .field('module_name')
      .field('remark')
      .from('formula.module')
      .where('disable_time is null')
      .order('id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPlasticMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      .distinct()
      .field('material.id', '"materialId"')
      .field('material.material_name', '"materialName"')
      .field('material.disable_time', '"materialDisable"')

      .field('material_spec.id', '"materialSpecId"')
      .field('material_spec.material_spec_name', '"materialSpecName"')
      .field('material_spec.remark')
      .field('material_spec.disable_time', '"materialSpecDisable"')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.material', 'material')
      .from('formula.material_spec', 'material_spec')
      .from('formula.part_category_material', 'pcm')
      // .from('formula.part_category_2', 'p2')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .where('material.id= pcm.material_id')
      // .where('pcm.pategory_category_2_id = p2.id')
      .where('material.material_spec_id = material_spec.id')
      .where('material.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async addPlasticMaterialSpec(client, materialSpec, remark) {
    let uuid = uuidv1()

    let sql = squel.insert()
      .into('formula.material_spec')
      .set('id', uuid)
      .set('material_spec_name', materialSpec)
      .set('create_time', 'now()')
      .returning('id')

    if(remark) {
      sql.set('remark', remark)
    }
    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async checkPlasticMaterialSpec(materialSpec) {
    let sql = squel.select()
      .field('id')
      .from('formula.material_spec')
      .where('UPPER(material_spec_name) = ?', materialSpec.toUpperCase())
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addPlasticMaterial(client, materialSpecId, material) {

    let sql = squel.insert()
      .into('formula.material')
      .set('id', uuidv1())
      .set('material_name', material)
      .set('material_spec_id', materialSpecId)
      .set('create_time', 'now()')
      .returning('id')

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async checkPlasticMaterial(materialSpecId, material) {
    let sql = squel.select()
      .field('id')
      .from('formula.material')
      .where('UPPER(material_name) = ?', material.toUpperCase())
      .where('material_spec_id = ?', materialSpecId)
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addPartCateMaterial(client, materialId) {
    let partCateSQL = generalSQL.getPartCate2Id('Plastic')

    let sql = squel.insert()
      .into('formula.part_category_material')
      .set('part_category_2_id', (partCateSQL))
      .set('material_id', materialId)
      .set('create_time', 'now()')

    await client.query(sql.toString())
  }

  static async fetchSprayPaintCombinationList(bottom_top_id = null){
    let sql = squel.select()
      .field('paint.id', 'id')
      .field('pt.id', 'type_id')
      .field('pt.type_name', 'type_name')
      .field('pc.id', 'color_id')
      .field('pc.color_name', 'color_name')
      .field('pbt.id', 'bottom_top_id')
      .field('pbt.bottom_top_name')
      .from('formula.plastic_paint_type_color_bottom_top', 'paint')
      .from('formula.plastic_paint_type', 'pt')
      .from('formula.plastic_paint_color', 'pc')
      .from('formula.plastic_paint_type_color', 'ptc')
      .from('formula.plastic_paint_bottom_top', 'pbt')
      .where('paint.paint_bottom_top_id = pbt.id')
      .where('paint.paint_type_color_id = ptc.id')
      .where('ptc.paint_type_id = pt.id')
      .where('ptc.paint_color_id = pc.id')
    if (bottom_top_id) {
      sql.where('paint.paint_bottom_top_id = ?', bottom_top_id)
    }
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getPartCategoryWithMaterial(type, material) {
    let sql = squel.select()
      .field('pc1.id ', 'pc1_id')
      .field('pc1.category_name', 'pc1_name')
      .field('pc2.id ', 'pc2_id')
      .field('pc2.category_name', 'pc2_name')
      .field('ft.name')
      .from('formula.part_category_1 pc1')
      .join('formula.part_category_2', 'pc2', 'pc2.part_category_1_id = pc1.id')
      .join('formula.part_category_formula_type', 'pcft', 'pc2.id = pcft.part_category_2_id')
      .join('formula.formula_type', 'ft', 'pcft.formula_type_id = ft.id')
      .where('pc1.disable_time is NULL and pc2.disable_time is NULL')

    if (type != null) {
      sql.where('ft.name = ? ', type)
    }

    if (material != null) {
      sql.join('formula.part_category_material', 'pcm', 'pcm.part_category_2_id = pc2.id')
        .join('formula.material', 'material', 'material.id= pcm.material_id')
        .where('material.id = ?', material)
        .where('pcm.disable_time is null')
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchPrintingProcessPrice(productTypeId) {

    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', productTypeId)

    let sql = squel.select()
      .field('pp.id')
      .field('pp.printing_name')
      .field('pvsd.value')
      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.plastic_printing pp')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('sd.activate_date')
          .from('formula.parameter_value pv')
          .from('formula.schedule_date sd')
          .where('sd.id = pv.activate_date_id'),
        'pvsd',
        'pp.unit_price = pvsd.parameter_id'
      )
      .where('pp.disable_time is null')
      .where('pvsd.activate_date_id in ?', subSQL)
      .order('pvsd.activate_date', true)
      .order('pp.printing_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchEmbeddedPrice(productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', productTypeId)

    let sql = squel.select()
      .field('pen.id')
      .field('pen.embed_nail_name')
      .field('pen.remark')
      .field('pvsd.value')
      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.plastic_embed_nail pen')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('sd.activate_date')
          .from('formula.parameter_value pv')
          .from('formula.schedule_date sd')
          .where('sd.id = pv.activate_date_id'),
        'pvsd',
        'pen.unit_price = pvsd.parameter_id'
      )
      .where('pen.disable_time is null')
      .where('pvsd.activate_date_id in ?', subSQL)
      .order('pvsd.activate_date', true)
      .order('pen.embed_nail_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchPaintBottomTop() {
    let sql = squel.select()
      .distinct()
      .field('bottom_top.id', '"paintBottomTopId"')
      .field('bottom_top_name', '"paintBottomTopName"')
      .from('formula.plastic_paint_bottom_top bottom_top')
      .join('formula.plastic_paint_type_color_bottom_top', 'type_color_bottom_top', 'type_color_bottom_top.paint_bottom_top_id = bottom_top.id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchPaintTypePrice(bottom_top_id = null) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', null)

    let bottom_top_sql = squel.select()
      .field('paint_type.type_name')
      .field('color.color_name')
      .field('color.id', 'color_id')
      .field('bottom_top.bottom_top_name')
      .field('type_color_bottom_top.id', 'type_color_bt_id')
      .from('formula.plastic_paint_type paint_type')
      .from('formula.plastic_paint_bottom_top bottom_top')
      .from('formula.plastic_paint_color color')
      .from('formula.plastic_paint_type_color type_color')
      .from('formula.plastic_paint_type_color_bottom_top type_color_bottom_top')
      .where('type_color.paint_type_id = paint_type.id')
      .where('type_color.paint_color_id = color.id')
      .where('type_color_bottom_top.paint_type_color_id = type_color.id')
      .where('type_color_bottom_top.paint_bottom_top_id = bottom_top.id')
      .where('paint_type.disable_time is null')
      .where('color.disable_time is null')
      .where('type_color.disable_time is null')

    if (bottom_top_id) {
      bottom_top_sql.where('type_color_bottom_top.paint_bottom_top_id = ?', bottom_top_id)
    }

    let vendor_sql = squel.select()
      .field('a.*')
      .field('paint_vendor.id', 'vendor_id')
      .field('paint_vendor.vendor_name')
      .from(bottom_top_sql, 'a')
      .from('formula.plastic_paint_vendor paint_vendor')
      .order('a.type_name', true)
      .order('a.color_name', true)

    let sql = squel.select()
      .field('plastic_paint.*')
      // .field('ppvtcbt.id')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pv.activate_date_id', 'activation_date_id')
      .from(vendor_sql, 'plastic_paint')

      .left_join('formula.plastic_paint_vendor_type_color_bottom_top', 'ppvtcbt', 'ppvtcbt.paint_vendor_id = plastic_paint.vendor_id and ppvtcbt.type_color_bottom_top_id = plastic_paint.type_color_bt_id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = ppvtcbt.id')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('pv.activate_date_id in ?', subSQL)

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchPaintFormulaPrice(paintId, vendorId, dateId) {
    let sql = squel.select()
      .field('pt.label')
      .field('pt.label_name')
      .field('pt.field_type')
      .field('pt.data_type')
      .field('pv.value', 'value')
      .from('formula.plastic_paint_vendor_type_color_bottom_top', 'link')
      .left_join('formula.plastic_paint_formula', 'pf', 'link.id = pf.paint_id')
      .left_join('formula.plastic_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = pf.id')
      .where('link.type_color_bottom_top_id = ?', paintId)
      .where('link.paint_vendor_id = ?', vendorId)
      .where('pv.activate_date_id = ?', parseInt(dateId, 10))

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintFormulaPriceDefault() {
    let sql = squel.select()
      .field('pt.label')
      .field('pt.label_name')
      .field('pt.field_type')
      .field('pt.data_type')
      .field('null', 'value')
      .from('formula.plastic_paint_formula_type', 'pt', 'pf.type_id = pt.id')

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getPaintFormulaId(linkId, key) {
    let sql = squel.select()
      .field('pf.id')
      .from('formula.plastic_paint_formula', 'pf')
      .left_join('formula.plastic_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .where('pf.paint_id = ?', linkId)
      .where('pt.label = ?', key)
      .limit(1)
    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows[0].id : null
  }

  static async insertPaintFormulaId(linkId, key) {
    let subSql = squel.select()
      .field('id')
      .from('formula.plastic_paint_formula_type')
      .where('label = ?', key)
    let sql = squel.insert()
      .into('formula.plastic_paint_formula')
      .set('paint_id', linkId)
      .set('type_id', subSql)
    let res = await systemDB.Query(sql.toString() + 'RETURNING id')
    return res.rowCount > 0 ? res.rows[0].id : null
  }

  static async fetchPlasticParameter(productTypeId) {
    let res = await generalSQL.Common.fetchParameterByType('housing_plastic', productTypeId)
    return res
  }

  static async fetchPaintVendor() {
    let sql = squel.select()
      .distinct()
      .field('id')
      .field('vendor_name', 'name')
      .field('remark')
      .from('formula.plastic_paint_vendor paint_vendor')
      .where('disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getMaterialLossRate() {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', null)
    let sql = squel.select()
      .field('pl.id')
      .field('pl.loss_rate_name item')
      .field('pl.remark')
      .field('pt.type_name')
      .field('pt.id "productTypeId"')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id activate_date_id')
      .from('formula.plastic_material_loss_rate pl')
      .from('formula.plastic_material_loss_rate_product_type plpt')
      .from('formula.product_type pt')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('pl.id = plpt.plastic_material_loss_rate_id')
      .where('plpt.product_type_id = pt.id')
      .where('sd.id = pv.activate_date_id')
      .where('plpt.id = pv.parameter_id')
      .where('pv.activate_date_id in ?', subSQL)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchMachineModule() {
    let sql = squel.select()
      .field('pc2.id', 'category_id')
      .field('pc2.category_name')
      .field('mo.id', 'module_id')
      .field('mo.module_name')
      .field('mo.remark')
      .field('pt.type_name')
      .field('pt.id', 'type_id')
      .from('formula."module" mo')
      .from('formula.product_type pt')
      .from('formula.product_type_category_module ptmo')
      .from('formula.part_category_2 pc2')
      .where('mo.id = ptmo.module_id')
      .where('ptmo.product_type_id = pt.id')
      .where('pc2.id = ptmo.part_category_2_id')
      .where('ptmo.disable_time is null')
      .order('mo.module_name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async disableMachineModule(client, productTypeId, moduleId) {

    let sql = squel.update()
      .table('formula.product_type_category_module')
      .set('disable_time', moment().utc().format())
      .where('product_type_id = ?', productTypeId)
      .where(`module_id::text = '${moduleId}'`)
      .where('disable_time is null')

    await client.query(sql.toParam())
  }

  static async upsertMachineModule(client, productTypeId, category2Id, moduleId) {
    let sqlInsert = squel.insert()
      .into('formula.product_type_category_module')
      .set('module_id', moduleId)
      .set('product_type_id', productTypeId)
      .set('part_category_2_id', category2Id)
      .set('create_time', moment().utc().format())
    let upsert = ' ON CONFLICT ON CONSTRAINT product_type_category_module_pk DO UPDATE '
    upsert += `SET disable_time = NULL, create_time = '${moment().utc().format()}'`

    await client.query(sqlInsert.toString() + upsert)
  }

  static async modifyModuleRemark(client, moduleId, remark) {
    let sql = squel.update()
      .table('formula."module"')
      .set('remark', remark)
      .where('id = ?', moduleId)

    await client.query(sql.toParam())
  }

  static async fetchMachineTonnesList(){
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', null)

    let sql = squel.select()
      .field('mac.id', 'machine_id')
      .field('mac.ton', 'machine_ton')
      .field('mac.remark')
      .field('md_mac.module_id')
      .field('md.module_name', '')
      .field('pv.value', '')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.machine mac')
      .from('formula.module_machine md_mac')
      .from('formula."module" md')
      .from('formula.parameter_value pv')
      .from('formula.schedule_date sd')
      .where('md_mac.machine_id = mac.id')
      .where('md_mac.module_id = md.id')
      .where('pv.parameter_id = md_mac.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('mac.id', true)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }


  static async modifyMachineTonnesString(client, item) {
    let sql = squel.update()
      .table('formula.machine')
      .set('remark', item.remark)
      .where('id = ?', item.id)

    await client.query(sql.toParam())
  }

  static async getMachineTonnesParameterId(machine_id, modulePlasticId) {
    let sql = squel.select()
      .field('mm.id')
      .from('formula.module_machine mm')
      .where('mm.machine_id = ?', machine_id)
      .where('mm.module_id = ?', modulePlasticId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].id : ''
  }

  static async fetchPaintTypeColor() {
    let sql = squel.select()
      .distinct()
      .field('type.id', 'type_id')
      .field('type.type_name')
      .field('color.id', 'color_id')
      .field('color.color_name')
      .from('formula.plastic_paint_type_color paint')
      .join('formula.plastic_paint_type', 'type', 'paint.paint_type_id = type.id')
      .join('formula.plastic_paint_color', 'color', 'paint.paint_color_id = color.id')
      .where('paint.disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getGrindingPriceList(paintBottomTopId) {
    let subSQL0 = generalSQL.generalScheduleDateSQL('housing_plastic', paintBottomTopId)
    // let subSQL1 = squel.select()
    //   .field('pv.*')
    //   .field('sd.activate_date')
    //   .from('formula.parameter_value pv')
    //   .from('formula.schedule_date as sd')
    //   .where('sd.id = pv.activate_date_id')
    let subSQL2 = squel.select()
      .field('pv.*')
      .field('sd.activate_date')
      .from('formula.parameter_value pv')
      .from('formula.schedule_date as sd')
      .where('sd.id = pv.activate_date_id')
    let sql = squel.select()
      .distinct()
      .field('pp.id')
      .field('pp.grinding_name item')
      .field('pp.remark')
      // .field('pvsd.value loss_rate')
      .field('pvsd1.value')
      .field('pvsd1.activate_date')
      .field('pvsd1.activate_date_id')
      .from('formula.plastic_grinding pp')
      // .left_join(subSQL1, 'pvsd', 'pp.lost_rate = pvsd.parameter_id')
      .left_join(subSQL2, 'pvsd1', 'pp.total_cost = pvsd1.parameter_id')
      .where('pp.disable_time is null')
      .where('pvsd1.activate_date_id in ?', subSQL0)
      .order('pvsd1.activate_date, pp.grinding_name')
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchEmiSputteringList(productTypeId) {
    let sql = squel.select()
      .distinct()
      .field('id')
      .field('emi_size', 'label')
      .field('remark')
      .field('size', 'value')
      .from('formula.plastic_emi_sputtering_size')
      .where('disable_time is null')
      .where('product_type_id = ?', productTypeId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchEmiSputteringBase(productTypeId) {
    let sql = squel.select()
      .distinct()
      .field('id')
      .field('emi_base', 'name')
      .field('remark')
      .from('formula.plastic_emi_sputtering_base')
      .where('disable_time is null')
      .where('product_type_id = ?', productTypeId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchEmiSputteringPrice(productTypeId, siteGroupId = null) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', productTypeId)

    let sql = squel.select()
      .field('link.id')
      .field('link.size_id', 'size_id')
      .field('link.base_id', 'base_id')

      .field('emi_base.emi_base', 'base_name')
      .field('emi_size.emi_size', 'size_name')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.plastic_emi_sputtering_link link')

      .join('formula.plastic_emi_sputtering_base', 'emi_base', 'link.base_id = emi_base.id')
      .join('formula.plastic_emi_sputtering_size', 'emi_size', 'link.size_id = emi_size.id')
      .join('formula.plastic_emi_sputtering_group', 'emi_group', 'link.group_id = emi_group.id')

      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id in ?', subSQL)


    if (siteGroupId) {
      sql.where('link.group_id = ?', siteGroupId)
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchPaintManPowerUnitPrice(valueKey, productTypeId = null) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', null)

    let sql = squel.select()
      .field('pt.id', 'product_id')
      .field('pt.type_name')
      .field('pvsd.value', valueKey)
      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.plastic_paint_info ppi')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('sd.activate_date')
          .from('formula.parameter_value pv')
          .from('formula.schedule_date sd')
          .where('sd.id = pv.activate_date_id'),
        'pvsd',
        `ppi.${valueKey} = pvsd.parameter_id`
      )
      .left_join('formula.product_type', 'pt', 'ppi.product_type_id = pt.id')
      .where('ppi.disable_time is null')
      .where('pvsd.activate_date_id in ?', subSQL)
      .order('pvsd.activate_date', true)
      .order('pt.type_name', true)

    if(productTypeId) {
      sql.where('pt.id = ?', productTypeId)
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getEmiSputteringSiteGroupList(productTypeId) {
    let sql = squel.select()
      .field('pesg.group_id id')
      .field('pesg.remark')
      .field('site.site_name "siteName"')
      .field('site.id "siteId"')
      .from('formula.plastic_emi_sputtering_site_group pesg')
      .from('formula.site site')
      .where('pesg.site_id = site.id')
      .where('pesg.product_type_id = ?', productTypeId)
      .where('pesg.disable_time is null')
      .where('site.disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintManPowerPrice(productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_plastic', null)

    let sql = squel.select()
      .field('ppmp.id')
      .field('ppmp.category_name')
      .field('pvsd.value')

      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.plastic_paint_man_power ppmp')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('sd.activate_date')
          .from('formula.parameter_value pv')
          .from('formula.schedule_date sd')
          .where('sd.id = pv.activate_date_id'),
        'pvsd',
        'ppmp.id = pvsd.parameter_id'
      )
      .left_join('formula.product_type', 'pt', 'ppmp.product_type_id = pt.id')
      .where('ppmp.disable_time is null')
      .where('pvsd.activate_date_id in ?', subSQL)

      .order('pvsd.activate_date', true)
      .order('pt.type_name', true)

    if(productTypeId) {
      sql.where('pt.id = ?', productTypeId)
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkPartCategoryMaterial(materialId, category2) {
    let sql = squel.select()
      .field('*')
      .from('formula.part_category_material')
      .where('part_category_2_id = ?', category2.category2Id)
      .where('material_id = ? ', materialId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }

  static async linkPartCategoryMaterial(client, materialId, category2) {

    let sql = squel.insert()
      .into('formula.part_category_material')
      .set('part_category_2_id', category2.category2Id)
      .set('material_id', materialId)
      .set('create_time', 'now()')

    // console.log(sql.toString())
    await client.query(sql.toString())
  }
  static async updatePartCategoryMaterial(client, materialId, category2) {

    let sql = squel.update()
      .table('formula.part_category_material')
      .set('disable_time', null)
      .where('part_category_2_id = ?', category2.category2Id)
      .where('material_id = ? ', materialId)

    // console.log(sql.toString())
    await client.query(sql.toString())
  }

  static async unlinkPartCategoryMaterial(client, materialId, category1Id, category2) {

    // need update
    let sql = squel.update()
      .table('formula.part_category_material')
      .set('disable_time', moment().utc().format())
      .from('formula.part_category_2 pc2')
      .where('part_category_2_id = ?', category2.category2Id)
      .where('pc2.id = part_category_2_id')
      .where('pc2.part_category_1_id = ?', category1Id)
      .where('material_id = ?', materialId)

    await client.query(sql.toParam())

  }
  static async selectDropDown(field, materialPath) {
    let sql = squel.select()
      .field('path')
      .from('drop_down_item')
      .where('field_name = ? ', field)
      .where('path like ? ', `${materialPath}.%`)

    // console.log(sql.toString())
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount
  }

  static async modifyMaterialSpec(client, items) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.material_spec', 'pms' )
          .set('remark', item.remark)
          .where('pms.id = ?', item.id)
        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyMaterialSpec', err)
      throw err
    }
  }

  static async modifyPaintTypePrice(client, nextId, id, item){

    // await Promise.all(
    //   _.forEach(items, async (item, idx) =>{
    // need update
    let sql = squel.update()
      .table('formula.parameter_value')
      .set('value', item.next)
      .from('formula.plastic_paint_vendor_type_color_bottom_top it')
      .where('it.id = parameter_id')
      .where('activate_date_id = ? and it.type_color_bottom_top_id = ?', nextId, id)
      .where('it.paint_vendor_id = ?', item.vendorId)
    await client.query(sql.toParam())
    //   })
    // )
  }
  static async insertPaintTypeVendor(client, id, item){
    let sql = squel.insert()
      .into('formula.plastic_paint_vendor_type_color_bottom_top')
      .set('id', uuidv1())
      .set('paint_vendor_id', item.vendorId)
      .set('type_color_bottom_top_id', id)
      .set('create_time', 'now()')
      .returning('id')

    let res = await client.query(sql.toParam())
    return res[0].id
  }
  static async updatePaintTypeVendor(client, id, isDisable){
    let sql = squel.update()
      .table('formula.plastic_paint_vendor_type_color_bottom_top')
      .where('id = ?', id)
    if (isDisable) {
      sql.set('disable_time', 'now()')
    } else {
      sql.set('disable_time', null)
      sql.set('create_time', 'now()')
    }
    let res = await client.query(sql.toParam())
    return res
  }

  static async modifyPaintManPowerHourByColumn(client, nextId, items, valueKey, tableKey){

    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from('formula.plastic_paint_info it')
          .where(`it.${tableKey} = parameter_id`)
          .where('activate_date_id = ?', nextId)
          .where('it.product_type_id = ?', item.id)

        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyPaintManPowerHourByColumn', err)
      throw err
    }
  }

  static async modifyPaintManPowerPrice(client, nextId, items, valueKey, tableKey){

    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from('formula.plastic_paint_info it')
          .where(`it.${tableKey} = parameter_id`)
          .where('activate_date_id = ?', nextId)
          .where('it.product_type_id = ?', item.id)

        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyPaintManPowerPrice', err)
      throw err
    }
  }

  static async modifyMaterialLossRate(client, nextId, id, items){

    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item.next / 100)
          .from('formula.plastic_material_loss_rate_product_type it')
          .where('it.id = parameter_id')
          .where('activate_date_id = ? and it.plastic_material_loss_rate_id = ?', nextId, id)
          .where('it.product_type_id = ?', item.productTypeId)

        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyMaterialLossRate', err)
      throw err
    }
  }
  static async modifyGrindingPrice(client, nextId, grindingPriceList) {
    for (let grindingPriceInfo of grindingPriceList) {
      let getTotoalCostSql = squel.select()
        .from('formula.plastic_grinding')
        .field('total_cost')
        .where('id = ?', grindingPriceInfo.id)
      let getTotoalCostRes = await systemDB.Query(getTotoalCostSql.toParam())
      if (getTotoalCostRes.rowCount === 0) {
        throw new Error(`Can not find totoalCostID by id:${grindingPriceInfo.id}`)
      }
      let updatePriceSql = squel.update()
        .table('formula.parameter_value')
        .set('value', grindingPriceInfo.next)
        .where('parameter_id = ?', getTotoalCostRes.rows[0].total_cost)
        .where('activate_date_id = ?', nextId)
      let updateRemarkSql = squel.update()
        .table('formula.plastic_grinding')
        .set('remark', grindingPriceInfo.remark)
        .where('id = ?', grindingPriceInfo.id)
      let updatePriceRes = await client.query(updatePriceSql.toParam())
      let updateRemarkRes = await client.query(updateRemarkSql.toParam())
      if (updatePriceRes.rowCount === 0) {
        throw new Error(`Can not update price by id:${grindingPriceInfo.id}`)
      }
      if (updateRemarkRes.rowCount === 0) {
        throw new Error(`Can not update remark by id:${grindingPriceInfo.id}`)
      }
    }
  }
  static async modifySputteringList(client, items) {

    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.plastic_emi_sputtering_size', 'pms' )
          .set('size', item.value)
          .set('remark', item.remark)
          .where('pms.id = ?', item.id)

        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifySputteringList', err)
      throw err
    }
  }
  static async modifyEmiSputteringSiteGroup(client, items, productTypeId) {
    for(let item of items) {
      let insertDatas = []
      for(let i = 0 ; i < item.siteList.length ; i++) {
        insertDatas.push({ group_id: item.id, site_id: item.siteList[i], product_type_id: productTypeId })
      }
      let deleteSql = squel.delete()
        .from('formula.plastic_emi_sputtering_site_group')
        .where('group_id = ?', item.id)

      await client.query(deleteSql.toParam())
      let sql = squel.insert()
        .into('formula.plastic_emi_sputtering_site_group')
        .setFieldsRows(insertDatas)
        .toParam()
      sql.text += 'ON CONFLICT ("site_id", "product_type_id") DO UPDATE SET group_id = EXCLUDED.group_id'

      await client.query(sql)
    }
  }
  static async checkPaintTypeVendor(paintTypeId, vendorId) {
    let sql = squel.select()
      .field('id')
      .field('disable_time')
      .from('formula.plastic_paint_vendor_type_color_bottom_top')
      .where('type_color_bottom_top_id = ? ', paintTypeId)
      .where('paint_vendor_id = ? ', vendorId)
      .limit(1)

    // console.log(sql.toString())
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : null
  }
  static async checkPaintTypePrice(nextId, id, item) {
    let sql = squel.select()
      .field('pv.id')
      .from('formula.parameter_value', 'pv')
      .from('formula.plastic_paint_vendor_type_color_bottom_top it')
      .where('it.id = pv.parameter_id')
      .where('pv.activate_date_id = ? and it.type_color_bottom_top_id = ?', nextId, id)
      .where('it.paint_vendor_id = ?', item.vendorId)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }
  static async archivePlasticMaterial(client, materialSpecId, materialIdList){
    // const plasticPartCtgy2Id = await databaseCommonModel.Common.getPartCate2IdByName(PLASTIC_PART_CATEGORY2_NAME)
    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.archiveData(client, 'formula.material', { id : materialId, material_spec_id : materialSpecId }),
          commonModel.archiveData(client, 'formula.part_category_material', { material_id : materialId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  static async unblockPlasticMaterial(client, materialSpecId, materialIdList){
    // const plasticPartCtgy2Id = await databaseCommonModel.Common.getPartCate2IdByName(PLASTIC_PART_CATEGORY2_NAME)
    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.unblockData(client, 'formula.material', { id : materialId, material_spec_id : materialSpecId }),
          commonModel.unblockData(client, 'formula.part_category_material', { material_id : materialId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  static async archivePlasticMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.material', [
          `material_spec_id = '${materialSpecId}'`,
          'disable_time is Null',
        ])
        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.archiveData(client, 'formula.material_spec', { id : materialSpecId }),
          this.archivePlasticMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 1))
    }
  }
  static async unblockPlasticMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.material', [
          `material_spec_id = '${materialSpecId}'`,
          'disable_time is not Null',
        ])
        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.unblockData(client, 'formula.material_spec', { id : materialSpecId }),
          this.unblockPlasticMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 1))
    }
  }
}
module.exports = Plastic
