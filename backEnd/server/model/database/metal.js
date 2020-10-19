const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Metal model')

const commonModel = require('../common/common.js')
const databaseCommonModel = require('./common.js')
const METAL_PART_CATEGORY2_NAME = 'Metal'

class Metal {
  static async fetchMetalMaterial() {

    let sql = squel.select()
      .distinct()
      .field('mm.id', '"materialId"')
      .field('mm.name')
      .field('mm.density')
      .field('mm.disable_time', '"materialDisable"')
      .from('formula.material_metal', 'mm')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchMetalMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      .distinct()
      .field('mm.id', '"materialId"')
      .field('mt.id', '"thicknessId"')
      .field('p2.category_name')
      .field('mm.name')
      .field('mm.density')
      .field('mm.disable_time', '"materialDisable"')
      .field('mt.thickness')
      .field('mt.disable_time')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.material_metal', 'mm')
      .left_join('formula.material_thinkness', 'mt', 'mm.id = mt.material_metal_id')
      .left_join('formula.part_category_material_metal', 'pm', 'mm.id= pm.material_metal_id')
      .left_join('formula.part_category_2', 'p2', 'p2.id = pm.pategory_category_2_id')
      .left_join('formula.parameter_value', 'pv', 'mt.id = pv.parameter_id')
      .left_join('formula.schedule_date', 'sd', 'pv.activate_date_id = sd.id')
      // .where('mm.id= pm.material_metal_id')
      // .where('p2.id = pm.pategory_category_2_id')
      // .where('mm.id = mt.material_metal_id')
      // .where('mt.id = pv.parameter_id')
      // .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('mt.thickness', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async addMetalMaterial(client, material, density) {
    let uuid = uuidv1()

    let sql = squel.insert()
      .into('formula.material_metal')
      .set('id', uuid)
      .set('name', material)
      .set('density', density)
      .set('create_time', 'now()')
      .returning('id')

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }
  static async checkMetalMaterial(material) {
    let sql = squel.select()
      .field('id')
      .from('formula.material_metal')
      .where('UPPER(name) = ?', material.toUpperCase())
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addPartCateMaterial(client, materialId) {
    const metalPartCtgy2Id = await databaseCommonModel.Common.getPartCate2IdByName(METAL_PART_CATEGORY2_NAME)

    let sql = squel.insert()
      .into('formula.part_category_material_metal')
      .set('pategory_category_2_id', metalPartCtgy2Id)
      .set('material_metal_id', materialId)
      .set('create_time', 'now()')

    await client.query(sql.toString())
  }

  static async archiveMetalMaterial(client, materialIdList){
    for(let materialId of materialIdList) {
      let getThinknessIdListResult = await commonModel.getDataByTable(['id'], 'formula.material_thinkness', [
        `material_metal_id = '${materialId}'`,
        'disable_time is Null',
      ])

      let materialThicknessList = getThinknessIdListResult.map((result) => result.id)
      await Promise.all([
        commonModel.archiveData(client, 'formula.material_metal', { id : materialId }),
        this.archiveMetalMaterialThickness(client, materialId, materialThicknessList),
        commonModel.archiveData(client, 'formula.part_category_material_metal', { material_metal_id : materialId }),
      ])
    }
  }

  static async unblockMetalMaterial(client, materialIdList) {
    for(let materialId of materialIdList) {
      let getThinknessIdListResult = await commonModel.getDataByTable(['id'], 'formula.material_thinkness', [
        `material_metal_id = '${materialId}'`,
        'disable_time is not Null',
      ])

      let materialThicknessList = getThinknessIdListResult.map((result) => result.id)
      await Promise.all([
        commonModel.unblockData(client, 'formula.material_metal', { id : materialId }),
        this.unblockMetalMaterialThickness(client, materialId, materialThicknessList),
        commonModel.unblockData(client, 'formula.part_category_material_metal', { material_metal_id : materialId }),
      ])
    }
  }

  static async addMetalMaterialThickness(client, materialId, thickness) {
    let uuid = uuidv1()

    let sql = squel.insert()
      .into('formula.material_thinkness')
      .set('id', uuid)
      .set('material_metal_id', materialId)
      .set('thickness', thickness)
      .set('create_time', 'now()')
      .returning('id')

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async checkMetalMaterialThickness(materialId, thickness) {
    let sql = squel.select()
      .field('id')
      .from('formula.material_thinkness')
      .where('thickness = ?', thickness)
      .where('material_metal_id = ?', materialId)
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async archiveMetalMaterialThickness(client, materialId, materialThicknessList){
    for(let thicknessId of materialThicknessList) {
      try {
        await Promise.all([
          commonModel.archiveData(client, 'formula.material_thinkness', { id : thicknessId, material_metal_id: materialId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  static async unblockMetalMaterialThickness(client, materialId, materialThicknessList) {
    for(let thicknessId of materialThicknessList) {
      try {
        await Promise.all([
          commonModel.unblockData(client, 'formula.material_thinkness', { id : thicknessId, material_metal_id: materialId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  static async fetchMetalParameter(productTypeId) {
    let res = await generalSQL.Common.fetchParameterByType('housing_metal', productTypeId)
    return res
  }

  static async fetchAnodeColorPriceList(valueKey, productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', productTypeId)

    let sql = squel.select()
      // .distinct()
      .field('g.name')
      .field('g.id', 'anode_color_id')
      .field('pv2.value', valueKey)
      // .field('pv3.value', 'loss_rate')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.metal_anode_color g')
      .left_join('formula.parameter_value', 'pv2', `pv2.parameter_id = g.${valueKey}`)
      // .left_join('formula.parameter_value', 'pv3', 'pv3.parameter_id = g.loss_rate')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv2.activate_date_id')
      .where('sd.id in ?', subSQL)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchSprayPaintPriceList() {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal')

    let sql = squel.select()
      .field('mp.id')
      .field('mp.painting_name')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.metal_painting mp')
      .left_join('formula.parameter_value', 'pv', 'mp.usd_kg = pv.parameter_id')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id in ?', subSQL)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchGlueModelPriceList(valueKey, productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', productTypeId)

    let sql = squel.select()
      .field('g.id', 'glue_id')
      .field('g.glue_name')
      .field('pv1.value', valueKey)
      // .field('pv2.value', 'density')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.metal_glue g')
      .left_join('formula.parameter_value', 'pv1', `pv1.parameter_id = g.${valueKey}`)
      // .left_join('formula.parameter_value', 'pv2', 'pv2.parameter_id = g.density')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv1.activate_date_id')
      .where('sd.id in ?', subSQL)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchSyringeList(productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', productTypeId)

    let sql = squel.select()
      .field('ms.id')
      .field('ms.syringe_name')
      .field('pv.value', 'value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.metal_syringe ms')
      .from('formula.parameter_value pv')
      .from('formula.schedule_date sd')
      .where('ms.syringe_diameter = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('ms.syringe_name', true)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchMdouleList () {
    let sql = squel.select()
      .field('id')
      .field('module_name')
      .field('remark')
      .field('disable_time')
      .from('formula.module_metal')
      .where('disable_time is null')
      .order('id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchMetalType() {
    let sql = squel.select()
      .field('mt.id')
      .field('mt.type_name')
      .from('formula.metal_type mt')
      .where('mt.type_name = ?', 'Metal') // 2020-06-05 EP-302 機台 Module 清單 取消可選Aluminum
      .where('mt.disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchMachineModuleList() {
    let sql = squel.select()
      .field('mo.id', 'module_id')
      .field('mo.module_name')
      .field('mo.remark')
      .field('pt.type_name')
      .field('pt.id', 'type_id')
      .field('mt.type_name', 'metal_type_name')
      .field('mt.id', 'metal_type_id')
      .from('formula.module_metal mo')
      .from('formula.metal_type mt')
      .from('formula.product_type pt')
      .where('mo.product_type_id = pt.id')
      .where('mo.metal_type_id = mt.id')
      .where('mo.disable_time is null')
      .order('mo.module_name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async modifyMachineModuleString(client, moduleId, remark) {
    let sql = squel.update()
      .table('formula.module_metal')
      .set('remark', remark)
      .where('id = ?', moduleId)

    await client.query(sql.toParam())
  }

  static async modifyMachineModule(client, moduleId, metalTypeId, productTypeId) {
    let sql = squel.update()
      .table('formula.module_metal')
      .set('metal_type_id', metalTypeId)
      .set('product_type_id', productTypeId)
      .where('id = ?', moduleId)

    await client.query(sql.toParam())
  }

  static async fetchMachineTonnesList() {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', null)
    // 取得 模組 + 噸數(機台) + 模具 所有組合
    let allResSql = squel.select()
      .field('pt.id', 'press_type_id')
      .field('pt.type_name', 'press_type_name')
      .field('mo.id', 'module_id')
      .field('mo.module_name')
      .field('ma.id', 'machine_id')
      .field('ma.ton')
      // .field('ma.bloster')
      // .field('ma.remark')
      .from('formula.metal_press_type', 'pt')
      .from('formula.module_metal', 'mo')
      .from('formula.machine_metal', 'ma')
      .where('mo.disable_time is null')
      .where('ma.disable_time is null')
      .where('pt.disable_time is null')

    // 取得現有維護價格
    let valueSql = squel.select()
      .field('link.*')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.metal_press_module_machine_type', 'link')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
    
    // 將價格帶入所有組合中
    let sql = squel.select()
      .field('concat(allres.machine_id, \'_\', allres.press_type_id)', 'unique_id')
      .field('allres.module_id', 'module_metal_id')
      .field('allres.module_name')
      .field('allres.machine_id', 'machine_metal_id')
      .field('allres.ton')
      .field('ma_remark.bolster', 'bloster')
      .field('ma_remark.remark')
      .field('allres.press_type_id')
      .field('allres.press_type_name')
      .field('values.value')
      .field('values.activate_date')
      .field('values.activation_date_id')
      .from(allResSql, 'allres')
      .left_join('formula.metal_press_module_machine_type', 'link', 'link.machine_id = allres.machine_id and link.module_id = allres.module_id and link.press_type_id = allres.press_type_id')
      .left_join(valueSql, 'values', 'values.id = link.id')
      .left_join('formula.metal_press_machine_remark', 'ma_remark', 'ma_remark.machine_id = allres.machine_id and ma_remark.press_type_id = allres.press_type_id')
      .order('values.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async modifyMachineTonnesString(client, params) {
    let { bloster, remark, machineId, pressTypeId } = params
    let sql = squel.update()
      .table('formula.metal_press_machine_remark')
      .set('bolster', bloster)
      .set('remark', remark)
      .where('machine_id = ?', machineId)
      .where('press_type_id = ?', pressTypeId)

    // console.log(sql.toString())
    await client.query(sql.toParam())
  }

  /**
   * 取得沖壓關聯id
   * @param {Object} client transaction client
   * @param {Object} param { tonnesId uuid, pressTypeId uuid, moduleMetalId uuid }
   */
  static async getMachinePressLink(client, param) {
    try {
      let { tonnesId, pressTypeId, moduleMetalId } = param
      let sql = squel.select()
        .field('link.id')
        .field('link.disable_time')
        .from('formula.metal_press_module_machine_type', 'link')
        .where('link.module_id = ?', moduleMetalId)
        .where('link.machine_id = ?', tonnesId)
        .where('link.press_type_id = ?', pressTypeId)
      
      if (client) {
        let res = await client.query(sql.toParam())
        return res.length > 0 ? res[0] : null
      } else {
        let res = await systemDB.Query(sql.toParam())
        return res.rowCount > 0 ? res.rows[0] : null
      }
    } catch (err) {
      logger.error('checkMachineTonnesPrice', err)
      throw err
    }
  }
  /**
   * 更新沖壓關聯
   * @param {Object} client transaction client
   * @param {Object} param { linkId uuid, newStatus bool }
   */
  static async updateMachinePressLink(client, param) {
    try {
      let { linkId, newStatus } = param
      let sql = squel.update()
        .table('formula.metal_press_module_machine_type')
        .where('id = ?', linkId)
      if (newStatus) {
        sql.set('disable_time = null')
      } else {
        sql.set('disable_time = now()')
      }

      await client.query(sql.toParam())
    } catch (err) {
      logger.error('updateMachinePressLink', err)
      throw err
    }
  }
  /**
   * 新增沖壓關聯
   * @param {Object} client transaction client
   * @param {Object} param { tonnesId uuid, pressTypeId uuid, moduleMetalId uuid }
   */
  static async insertMachinePressLink(client, param) {
    try {
      let { tonnesId, pressTypeId, moduleMetalId } = param
      let sql = squel.insert()
        .into('formula.metal_press_module_machine_type')
        .set('module_id ', moduleMetalId)
        .set('machine_id ', tonnesId)
        .set('press_type_id ', pressTypeId)
      await client.query(sql.toParam())
    } catch (err) {
      logger.error('insertMachinePressLink', err)
      throw err
    }
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
      sql.join('formula.part_category_material_metal', 'pcmm', 'pcmm.pategory_category_2_id = pc2.id')
        .join('formula.material_metal', 'mm', 'mm.id= pcmm.material_metal_id')
        .where('mm.id = ?', material)
        .where('pcmm.disable_time is null')
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkPartCategoryMetalMaterial(materialId, category2) {
    let sql = squel.select()
      .field('*')
      .from('formula.part_category_material_metal')
      .where('pategory_category_2_id = ?', category2.category2Id)
      .where('material_metal_id = ? ', materialId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }

  static async updatePartCategoryMetalMaterial(client, materialId, category2) {

    let sql = squel.update()
      .table('formula.part_category_material_metal')
      .set('disable_time', null)
      .where('pategory_category_2_id = ?', category2.category2Id)
      .where('material_metal_id = ? ', materialId)

    await client.query(sql.toString())
  }

  static async linkPartCategoryMetalMaterial(client, materialId, category2) {

    let sql = squel.insert()
      .into('formula.part_category_material_metal')
      .set('pategory_category_2_id', category2.category2Id)
      .set('material_metal_id', materialId)
      .set('create_time', 'now()')

    await client.query(sql.toString())
  }

  static async unlinkPartCategoryMetalMaterial(client, materialId, category1Id, category2) {

    // need update
    let sql = squel.update()
      .table('formula.part_category_material_metal')
      .set('disable_time', moment().utc().format())
      .from('formula.part_category_2 pc2')
      .where('pategory_category_2_id = ?', category2.category2Id)
      .where('pc2.id = pategory_category_2_id')
      .where('pc2.part_category_1_id = ?', category1Id)
      .where('material_metal_id = ?', materialId)

    await client.query(sql.toParam())

  }

  static async updateDropDown(client, materialName, path) {

    let sql = squel.update()
      .table('drop_down_item')
      .set('disable_time', null)
      .where('path = ?', path)
      .where('item_name = ?', materialName)
      .where('field_name = ?', 'material_spec')
      .where('layout_name = ?', 'bom_item')

    await client.query(sql.toString())
  }
  static async insertDropDown(client, materialName, path) {
    let sql = squel.insert()
      .into('drop_down_item')
      // .from('formula.part_category_2 pc2')
      .set('id', uuidv1())
      .set('item_name', materialName)
      .set('path', path)
      .set('field_name', 'material_spec')
      .set('layout_name', 'bom_item')
      .set('create_time', 'now()')

    await client.query(sql.toString())
  }

  static async getDropDownPathWithMaterialSpec(materialName, field) {

    let sql = squel.select()
      .field('path')
      .from('drop_down_item')
      .where('field_name = ? ', field)
      .where('TRIM(upper(item_name)) = ?', materialName)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].path : null
  }

  static async updateDropDownDisable(client, materialName, updatePath) {
    let sql = squel.update()
      .table('drop_down_item')
      .set('disable_time', moment().utc().format())
      .where('TRIM(upper(item_name)) = ?', materialName)
      .where('field_name = ?', 'material_spec')
      .where('layout_name = ?', 'bom_item')
      .where('path = ?', updatePath)

    await client.query(sql.toParam())
  }
  static async fetchDrillPrice() {
    let subSQL =  generalSQL.generalScheduleDateSQL('housing_metal')
    let haveFeatureTypeSQL = squel.select()
      .field('mdf.id', 'id')
      .field('mdf.disable_time')
      .field('mdt.name', '"typeName"')
      .field('mdft.name', '"featureTypeName"')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activate_date_id')
      .from('formula.metal_material_drill_feature', 'mdf')
      .from('formula.metal_material_drill_type', 'mdt')
      .from('formula.metal_material_drill_feature_type', 'mdft')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('mdf.material_drill_id = mdt.id')
      .where('mdf.material_drill_feature_id = mdft.id')
      .where('sd.id = pv.activate_date_id')
      .where('mdf.id = pv.parameter_id')
      .where('pv.activate_date_id in ?', subSQL)
    let noFeatureTypeSQL = squel.select()
      .field('mdf.id', 'id')
      .field('mdf.disable_time')
      .field('mdt.name', '"typeName"')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activate_date_id')
      .from('formula.metal_material_drill_feature', 'mdf')
      .from('formula.metal_material_drill_type', 'mdt')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('mdf.material_drill_id = mdt.id')
      .where('mdf.material_drill_feature_id IS NULL')
      .where('sd.id = pv.activate_date_id')
      .where('mdf.id = pv.parameter_id')
      .where('pv.activate_date_id in ?', subSQL)

    let haveFeatureTypeRes = await systemDB.Query(haveFeatureTypeSQL.toParam())
    let noFeatureTypeRes = await systemDB.Query(noFeatureTypeSQL.toParam())
    let res = haveFeatureTypeRes.rows.concat(noFeatureTypeRes.rows)
    return res
  }
  static async fetchPaintBottomTop() {
    let sql = squel.select()
      .distinct()
      .field('bottom_top.id', '"paintBottomTopId"')
      .field('bottom_top_name', '"paintBottomTopName"')
      .from('formula.metal_paint_bottom_top bottom_top')
      .join('formula.metal_paint_type_color_bottom_top', 'type_color_bottom_top', 'type_color_bottom_top.paint_bottom_top_id = bottom_top.id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
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
      .from('formula.metal_paint_type_color_bottom_top', 'paint')
      .from('formula.metal_paint_type', 'pt')
      .from('formula.metal_paint_color', 'pc')
      .from('formula.metal_paint_type_color', 'ptc')
      .from('formula.metal_paint_bottom_top', 'pbt')
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
  static async fetchPaintTypePrice(bottom_top_id = null) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', null)

    let bottom_top_sql = squel.select()
      .field('paint_type.type_name')
      .field('color.color_name')
      .field('color.id', 'color_id')
      .field('bottom_top.bottom_top_name')
      .field('type_color_bottom_top.id', 'type_color_bt_id')
      .from('formula.metal_paint_type paint_type')
      .from('formula.metal_paint_bottom_top bottom_top')
      .from('formula.metal_paint_color color')
      .from('formula.metal_paint_type_color type_color')
      .from('formula.metal_paint_type_color_bottom_top type_color_bottom_top')
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
      .from('formula.metal_paint_vendor paint_vendor')
      .order('a.type_name', true)
      .order('a.color_name', true)

    let sql = squel.select()
      .field('metal_paint.*')
      // .field('ppvtcbt.id')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pv.activate_date_id', 'activation_date_id')
      .from(vendor_sql, 'metal_paint')

      .left_join('formula.metal_paint_vendor_type_color_bottom_top', 'ppvtcbt', 'ppvtcbt.paint_vendor_id = metal_paint.vendor_id and ppvtcbt.type_color_bottom_top_id = metal_paint.type_color_bt_id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = ppvtcbt.id')
      .left_join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('pv.activate_date_id in ?', subSQL)

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintVendor() {
    let sql = squel.select()
      .distinct()
      .field('id')
      .field('vendor_name', 'name')
      .field('remark')
      .from('formula.metal_paint_vendor paint_vendor')
      .where('disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintFormulaPriceDefault() {
    let sql = squel.select()
      .field('pt.label')
      .field('pt.label_name')
      .field('pt.field_type')
      .field('pt.data_type')
      .field('null', 'value')
      .from('formula.metal_paint_formula_type', 'pt', 'pf.type_id = pt.id')

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
      .from('formula.metal_paint_vendor_type_color_bottom_top', 'link')
      .left_join('formula.metal_paint_formula', 'pf', 'link.id = pf.paint_id')
      .left_join('formula.metal_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .left_join('formula.parameter_value', 'pv', 'pv.parameter_id = pf.id')
      .where('link.type_color_bottom_top_id = ?', paintId)
      .where('link.paint_vendor_id = ?', vendorId)
      .where('pv.activate_date_id = ?', parseInt(dateId, 10))

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintTypeColor() {
    let sql = squel.select()
      .distinct()
      .field('type.id', 'type_id')
      .field('type.type_name')
      .field('color.id', 'color_id')
      .field('color.color_name')
      .from('formula.metal_paint_type_color paint')
      .join('formula.metal_paint_type', 'type', 'paint.paint_type_id = type.id')
      .join('formula.metal_paint_color', 'color', 'paint.paint_color_id = color.id')
      .where('paint.disable_time is null')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchPaintManPowerUnitPrice(valueKey, productTypeId = null) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', null)

    let sql = squel.select()
      .field('pt.id', 'product_id')
      .field('pt.type_name')
      .field('pvsd.value', valueKey)
      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.metal_paint_info ppi')
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
  static async fetchPaintManPowerPrice(productTypeId) {
    let subSQL = generalSQL.generalScheduleDateSQL('housing_metal', null)

    let sql = squel.select()
      .field('ppmp.id')
      .field('ppmp.category_name')
      .field('pvsd.value')

      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.metal_paint_man_power ppmp')
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
  static async checkPaintTypeVendor(paintTypeId, vendorId) {
    let sql = squel.select()
      .field('id')
      .field('disable_time')
      .from('formula.metal_paint_vendor_type_color_bottom_top')
      .where('type_color_bottom_top_id = ? ', paintTypeId)
      .where('paint_vendor_id = ? ', vendorId)
      .limit(1)

    // console.log(sql.toString())
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : null
  }
  static async insertPaintTypeVendor(client, id, item){
    let sql = squel.insert()
      .into('formula.metal_paint_vendor_type_color_bottom_top')
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
      .table('formula.metal_paint_vendor_type_color_bottom_top')
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
  static async checkPaintTypePrice(nextId, id, item) {
    let sql = squel.select()
      .field('pv.id')
      .from('formula.parameter_value', 'pv')
      .from('formula.metal_paint_vendor_type_color_bottom_top it')
      .where('it.id = pv.parameter_id')
      .where('pv.activate_date_id = ? and it.type_color_bottom_top_id = ?', nextId, id)
      .where('it.paint_vendor_id = ?', item.vendorId)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }
  static async modifyPaintTypePrice(client, nextId, id, item){
    let sql = squel.update()
      .table('formula.parameter_value')
      .set('value', item.next)
      .from('formula.metal_paint_vendor_type_color_bottom_top it')
      .where('it.id = parameter_id')
      .where('activate_date_id = ? and it.type_color_bottom_top_id = ?', nextId, id)
      .where('it.paint_vendor_id = ?', item.vendorId)
    await client.query(sql.toParam())
  }
  static async getPaintFormulaId(linkId, key) {
    let sql = squel.select()
      .field('pf.id')
      .from('formula.metal_paint_formula', 'pf')
      .left_join('formula.metal_paint_formula_type', 'pt', 'pf.type_id = pt.id')
      .where('pf.paint_id = ?', linkId)
      .where('pt.label = ?', key)
      .limit(1)
    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows[0].id : null
  }
  static async insertPaintFormulaId(linkId, key) {
    let subSql = squel.select()
      .field('id')
      .from('formula.metal_paint_formula_type')
      .where('label = ?', key)
    let sql = squel.insert()
      .into('formula.metal_paint_formula')
      .set('paint_id', linkId)
      .set('type_id', subSql)
    let res = await systemDB.Query(sql.toString() + 'RETURNING id')
    return res.rowCount > 0 ? res.rows[0].id : null
  }
  static async modifyPaintManPowerHourByColumn(client, nextId, items, valueKey, tableKey){

    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from('formula.metal_paint_info it')
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
}

module.exports = Metal
