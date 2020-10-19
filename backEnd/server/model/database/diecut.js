const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const commonModel = require('../common/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Diecut model')

class Diecut{
  static async fetchMaterialSizeAdderPrice(){
    let subSQL = generalSQL.generalScheduleDateSQL('die_cut')
    let sql = squel.select()
      .field('dmsa.id')
      .field('dmsa.size_begin')
      .field('dmsa.size_end')
      .field('dmsa.disable_time')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.schedule_date', 'sd')
      .from('formula.diecut_material_size_adder', 'dmsa')
      .from('formula.parameter_value', 'pv')
      .where('pv.parameter_id = dmsa.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async fetchDiecutMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      // .distinct()
      .field('material.id', '"materialId"')
      .field('material.material_name', '"materialName"')
      .field('material.disable_time', '"materialDisable"')
      .field('pcdms.part_category_2_id', '"type2Id"')

      .field('material_spec.id', '"materialSpecId"')
      .field('material_spec.material_spec_name', '"materialSpecName"')
      .field('material_spec.remark')
      .field('material_spec.disable_time', '"materialSpecDisable"')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.diecut_material', 'material')
      .from('formula.diecut_material_spec', 'material_spec')
      .from('formula.part_category_2', 'pc2')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .from('formula.part_category_diecut_material_spec', 'pcdms')

      .where('material.diecut_material_spec_id = material_spec.id')
      .where('material.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('pcdms.material_spec_id = material_spec.id')
      .where('pc2.id = pcdms.part_category_2_id')
      .where('sd.id in ?', subSQL)
      .order('pc2.category_name')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchDiecutParameter() {
    let res = await generalSQL.Common.fetchParameterByType('die_cut')
    return res
  }

  static async fetchDiecutPartCategory() {
    let sql = squel.select()
      .distinct()
      .field('pc2.id', '"partCategory2Id"')
      .field('pc2.category_name', '"partCategory2Name"')
      .from('formula.part_category_2 pc2')
      .from('formula.part_category_formula_type pcft')
      .from('formula.formula_type ft')
      .where('UPPER(ft.name) = ?', 'DIE_CUT')
      .where('ft.id = pcft.formula_type_id')
      .where('pcft.part_category_2_id = pc2.id')
      .order('pc2.category_name', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async checkDiecutMaterial(materialSpecId, material) {
    let sql = squel.select()
      .field('id')
      .from('formula.diecut_material')
      .where('UPPER(material_name) = ?', material.toUpperCase())
      .where('diecut_material_spec_id = ?', materialSpecId)
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addDiecutMaterial(client, materialSpecId, material, disable_time = null) {
    let sql = squel.insert()
      .into('formula.diecut_material')
      .set('id', uuidv1())
      .set('material_name', material)
      .set('diecut_material_spec_id', materialSpecId)
      .set('create_time', 'now()')
      .returning('id')

    if(disable_time) {
      sql.set('disable_time', 'NOW()')
    }

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }
  static async archiveDiecutMaterial(client, materialSpecId, materialIdList){

    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.archiveData(client, 'formula.diecut_material', { id : materialId, diecut_material_spec_id : materialSpecId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  static async unblockDiecutMaterial(client, materialSpecId, materialIdList){

    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.unblockData(client, 'formula.diecut_material', { id : materialId, diecut_material_spec_id : materialSpecId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  static async checkDiecutMaterialSpecById(materialSpecId) {
    let sql = squel.select()
      .field('id')
      .field('disable_time')
      .from('formula.diecut_material_spec')
      .where('id = ?', materialSpecId)
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : []
  }

  static async checkDiecutMaterialSpec(materialSpec) {
    let sql = squel.select()
      .field('id')
      // .field('disable_time')
      .from('formula.diecut_material_spec')
      .where('UPPER(material_spec_name) = ?', materialSpec.toUpperCase())
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addDiecutMaterialSpec(client, materialSpec, remark = null, disable_time = null) {
    let uuid = uuidv1()

    let sql = squel.insert()
      .into('formula.diecut_material_spec')
      .set('id', uuid)
      .set('material_spec_name', materialSpec)
      .set('create_time', 'now()')
      .returning('id')

    if(disable_time) {
      sql.set('disable_time', 'NOW()')
    }
    if(remark) {
      sql.set('remark', remark)
    }

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async addMaterialSpecPartCate2(client, partCategory2Id, materialSpecId) {
    let sql = squel.insert()
      .into('formula.part_category_diecut_material_spec')

      .set('material_spec_id', materialSpecId)
      .set('part_category_2_id', partCategory2Id)
      .set('create_time', 'now()')

    const result = await client.query(sql.toParam())
    return result ? true : false
  }

  static async insertUploadData(dataSet) {
    let sql = squel.insert()
      .into('formula.material_price_diecut_upload_tmp')
      .setFieldsRows(dataSet)

    let result = await systemDB.Query(sql.toParam())
    return result ? true : false

  }
  static async getUploadData(uploadId) {
    let sql = squel.select()
      .field('sheetName', '"sheetName"')
      .field('partCategory2Name', '"partCategory2Name"')
      .field('materialSpec', '"materialSpec"')
      .field('material')
      .field('next')
      .field('newName', '"newName"')
      .field('partCategory2Id', '"partCategory2Id"')
      .field('materialSpecId', '"materialSpecId"')
      .field('materialId', '"materialId"')
      .field('pass')
      .from('formula.material_price_diecut_upload_tmp')
      .where('uploadId = ?', uploadId)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async deleteOldUploadData(client, uploadId) {
    let sql = squel.delete()
      .from('formula.material_price_diecut_upload_tmp')
      .where('uploadId = ? or create_time < (now() - \'1 days\'::interval)', uploadId)

    const result = await client.query(sql.toParam())
    return result ? true : false
  }

  static async archiveDiecutMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.diecut_material', [
          `diecut_material_spec_id = '${materialSpecId}'`,
          'disable_time is Null',
        ])

        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.archiveData(client, 'formula.diecut_material_spec', { id : materialSpecId }),
          commonModel.archiveData(client, 'formula.part_category_diecut_material_spec', { material_spec_id : materialSpecId }),
          this.archiveDiecutMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  static async unblockDiecutMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.diecut_material', [
          `diecut_material_spec_id = '${materialSpecId}'`,
          'disable_time is not Null',
        ])
        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.unblockData(client, 'formula.diecut_material_spec', { id : materialSpecId }),
          commonModel.unblockData(client, 'formula.part_category_diecut_material_spec', { material_spec_id : materialSpecId }),
          this.unblockDiecutMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  static async fetchDiecutMaterialSpecList() {

    let sql = squel.select()
      .distinct()
      .field('pcdms.part_category_2_id', '"partCategory2Id"')
      .field('material_spec.id', '"materialSpecId"')
      .field('material_spec.material_spec_name', '"materialSpecName"')
      .field('material_spec.remark')
      .field('material_spec.disable_time', '"materialSpecDisable"')
      .from('formula.diecut_material_spec', 'material_spec')
      .join('formula.part_category_diecut_material_spec', 'pcdms', 'pcdms.material_spec_id = material_spec.id')


    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchDiecutMaterialList() {

    let sql = squel.select()
      .distinct()
      .field('material.id', '"materialId"')
      .field('material.material_name', '"materialName"')
      .field('material.diecut_material_spec_id', '"materialSpecId"')
      .field('material.disable_time', '"materialDisable"')
      .from('formula.diecut_material', 'material')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getLastestScheduleDateId() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      .distinct()
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.schedule_date', 'sd')
      // .where('pcm.pategory_category_2_id = p2.id')
      .where('sd.id in ?', subSQL)
      .order('sd.id', false)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : []
  }

  static async updateMaterialName(client, materialList) {
    for(let material of materialList) {
      let materialExist = await this.checkDiecutMaterial(material.materialSpecId, material.newName)
      if (materialExist) {
        logger.warn(`duplicate material: ${material}`)
        throwApiError('F000202', errorCode.BAD_REQUEST)
      }
      logger.debug('updateMaterialName: formula.diecut_material', material.material, 'to', material.newName)
      try {
        await Promise.all([
          commonModel.updateItemName(client, 'formula.diecut_material', { key: 'material_name', value: material.newName }, { id : material.materialId, diecut_material_spec_id : material.materialSpecId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }

}

module.exports = Diecut
