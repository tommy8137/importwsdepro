/* eslint-disable no-magic-numbers */
const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const { formatFloat } = require('../../helpers/utils')

const commonModel = require('../common/common.js')
const generalSQL = require('../database/common.js')

const logger = log4js.getLogger('database Turning model')
const dbFloatPoint = new DecimalGetter('Database')


class Turning {
  static async fetchTurningParameter() {
    let res = await generalSQL.Common.fetchParameterByType('me_others_screw')
    return res
  }
  static async fetchHeatTreatmentPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('me_others_screw')

    let sql = squel.select()
      .distinct()
      .field('tab.id', 'id')
      .field('material.material_name')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id activate_date_id')
      .from('formula.turning_heat_treatment tab')
      .from('formula.turning_material material')

      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('material.id = tab.turning_material_id')
      .where('sd.id = pv.activate_date_id')
      .where('tab.id = pv.parameter_id')
      .where('pv.activate_date_id in ?', subSQL)
      .order('material.material_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchDiameter() {
    let sql = squel.select()
      .distinct()
      .field('id')
      .field('outter_diameter', '"outterDiameter"')
      .field('inner_diameter', '"innerDiameter"')
      .from('formula.turning_screw_diameter')
      .order('outter_diameter', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async modifyDiameter(client, items) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .set('inner_diameter', formatFloat(item.innerDiameter, dbFloatPoint.get('turningScrewDiameter')))
          .table('formula.turning_screw_diameter it')
          .where('it.id = ?', item.id)

        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyDiameter', err)
      throw err
    }
  }

  static async fetchNylokPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('me_others_screw')

    let sql = squel.select()
      .distinct()
      .field('nylok.id', 'id')
      .field('material.material_name')
      .field('color_name')
      .field('diameter.diameter_begin')
      .field('diameter.diameter_end')
      .field('length.length_begin')
      .field('length.length_end')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id activate_date_id')

      .from('formula.turning_nylok nylok')
      .from('formula.turning_material material')
      .from('formula.turning_nylok_color color')
      .from('formula.turning_nylok_diameter diameter')
      .from('formula.turning_nylok_length length')

      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')

      .where('nylok.id = pv.parameter_id')
      .where('nylok.material_id = material.id')
      .where('nylok.color_id = color.id')
      .where('nylok.diameter_id = diameter.id')
      .where('nylok.length_id = length.id')

      .where('sd.id = pv.activate_date_id')
      .where('pv.activate_date_id in ?', subSQL)
      .order('material.material_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []

  }
  static async fetchTurningMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      .distinct()
      .field('pctm.id', '"mappingId"')
      .field('material.id', '"materialId"')
      .field('material.material_name', '"materialName"')
      .field('material.density', 'density')
      .field('pctm.disable_time', '"materialDisable"')

      .field('p2.category_name', '"partCategory2Name"')
      .field('p2.id', '"partCategory2Id"')

      .field('nt.name', '"nutTypeName"')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.part_category_turning_material pctm')
      .join('formula.turning_material', 'material', 'material.id = pctm.material_id')
      .join('formula.part_category_2', 'p2', 'p2.id = pctm.part_category_2_id')
      .join('formula.parameter_value', 'pv', 'material.id = pv.parameter_id')
      .join('formula.schedule_date', 'sd', 'pv.activate_date_id = sd.id')
      .left_join('formula.turning_nut_type', 'nt', 'nt.id = pctm.nut_type_id')

      .where('sd.id in ?', subSQL)
      .order('p2.category_name')
      .order('material.material_name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchTurningPartCategory() {
    let sql = squel.select()
      .distinct()
      .field('pc2.id', '"partCategory2Id"')
      .field('pc2.category_name', '"partCategory2Name"')
      .from('formula.part_category_2 pc2')
      .where('lower(category_name) in ?', ['screw', 'standoff', 'nut'])
      .order('pc2.category_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkNutByMaterialId(materialId) {
    let sql = squel.select()
      .distinct()
      .field('id')
      .from('formula.part_category_turning_material')
      .where('material_id = ?', materialId)
      .where('part_category_2_id = ? ', squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'nut'))

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }

  static async checkNutByPartCate2List(partCate2List) {
    let sql = squel.select()
      .distinct()
      .field('pctm.id')
      .from('formula.part_category_turning_material', 'pctm')
      .join('formula.part_category_2', 'p2', 'p2.id = pctm.part_category_2_id')
      .where('part_category_2_id in ? ', partCate2List)
      .where('lower(p2.category_name) = ?', 'nut')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? true : false
  }

  static async fetchTurningNutType() {
    let sql = squel.select()
      .distinct()
      .field('id', '"nutTypeId"')
      .field('name', '"nutTypeName"')
      .from('formula.turning_nut_type nut_type')
      .order('name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchTurningMaterialPartCate() {
    let sql = squel.select()
      .field('pctm.material_id', '"materialId"')
      .field('tm.material_name', '"materialName"')
      .field('array_agg(pctm.part_category_2_id)', '"partCategory2Id"')
      .from('formula.part_category_turning_material pctm')
      .join('formula.turning_material', 'tm', 'tm.id = pctm.material_id')
      .where('lower(tm.material_name) != ?', 'other_fill_me_remark')
      .group('pctm.material_id')
      .group('tm.material_name')
      .order('tm.material_name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async modifyTurningNutType(client, materialId, nutTypeId) {
    let sql = squel.update()
      .set('nut_type_id', nutTypeId)
      .table('formula.part_category_turning_material')
      .where('material_id = ?', materialId)
      .where('part_category_2_id = ? ', squel.select().field('id').from('formula.part_category_2').where('lower(category_name) = ?', 'nut'))

    const result = await client.query(sql.toParam())
    return result
  }

  static async getMaterialId(material) {
    let sql = squel.select()
      .distinct()
      .field('id')
      .from('formula.turning_material')
      .where('lower(material_name) = ?', material.toLowerCase())

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].id : null
  }

  static async addTurningMaterial(client, material, density) {
    // let partCateSQL = generalSQL.getPartCate2Id(TURNING_PART_CATEGORY2_NAME)

    let sql = squel.insert()
      .into('formula.turning_material')
      .set('id', uuidv1())
      .set('material_name', material)
      // .set('part_category_2_id', (partCateSQL))
      .set('density', density)
      .set('create_time', 'now()')
      .returning('id')

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async addTurningMaterialMapping(client, partCate2IdList, materialId) {

    for(let partCate2Id of partCate2IdList) {
      try {
        let sql = squel.insert()
          .into('formula.part_category_turning_material')
          .set('id', uuidv1())
          .set('material_id', materialId)
          .set('part_category_2_id', partCate2Id)
          .set('create_time', 'now()')
          .onConflict()

        await Promise.all([
          await client.query(sql.toParam()),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  static async archiveTurningMaterial(client, materialList){
    // const plasticPartCtgy2Id = await databaseCommonModel.Common.getPartCate2IdByName(RUBBER_PART_CATEGORY2_NAME)
    for(let material of materialList) {
      try {
        await Promise.all([
          commonModel.archiveData(client, 'formula.part_category_turning_material', { material_id : material.materialId, part_category_2_id: material.partCategory2Id }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  static async unblockTurningMaterial(client, materialList){
    for(let material of materialList) {
      try {
        await Promise.all([
          commonModel.unblockData(client, 'formula.part_category_turning_material', { material_id : material.materialId, part_category_2_id: material.partCategory2Id }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

module.exports = Turning
