const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Rubber model')

const commonModel = require('../common/common.js')
const databaseCommonModel = require('./common.js')
const RUBBER_PART_CATEGORY2_NAME = 'Rubber'

class Rubber {
  static async fetchRubberParameter() {
    let res = await generalSQL.Common.fetchParameterByType('me_others_rubber')
    return res
  }

  static async fetchMachinePrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('me_others_rubber')

    let sql = squel.select()
      .field('m_pt.id')
      .field('machine.id', 'machine_id')
      .field('machine.ton')
      // eslint-disable-next-line quotes
      .field(`CASE WHEN m_pt.product_type_id = 0 THEN 'Others' ELSE product_type.type_name end`, 'type_name')
      .field('m_pt.product_type_id', 'product_type_id')
      .field('pv.value')
      // eslint-disable-next-line quotes
      .field(`To_char(sd.activate_date, 'YYYY-MM-DD')`, 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.rubber_machine_product_type', 'm_pt')
      .left_join('formula.rubber_machine', 'machine', 'm_pt.machine_id = machine.id')
      .left_join('formula.product_type', 'product_type', 'm_pt.product_type_id = product_type.id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = m_pt.id')
      .join('formula.schedule_date', 'sd', `pv.activate_date_id = sd.id and sd.id IN (${subSQL.toString()})`)
      .order('machine.ton', false)

    /* let sql = squel.select()
      .distinct()
      .field('m_pt.id')
      .field('machine.id', 'machine_id')
      .field('machine.ton')
      .field('product_type.type_name')
      .field('product_type.id', 'product_type_id')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.rubber_machine_product_type', 'm_pt')
      .from('formula.rubber_machine', 'machine')
      .from('formula.product_type', 'product_type')

      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')

      .where('m_pt.machine_id = machine.id')
      .where('m_pt.product_type_id = product_type.id')

      .where('m_pt.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('machine.ton', false) */

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getMachineParameterId(machineId, productTypeId) {
    let sql = squel.select()
      .field('id')
      .from('formula.rubber_machine_product_type')
      .where('machine_id = ? ', machineId)
      .where('product_type_id = ? ', productTypeId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].id : null
  }

  static async newMachinePrice(client, machineId, productTypeId){
    let sql = squel.insert()
      .into('formula.rubber_machine_product_type')
      .set('id', uuidv1())
      .set('machine_id', machineId)
      .set('product_type_id', productTypeId)
      .set('create_time', 'now()')
      .returning('id')

    let res = await client.query(sql.toParam())
    return res[0].id
  }

  static async fetchMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('material')

    let sql = squel.select()
      .distinct()
      .field('material.id', '"materialId"')
      .field('material.material_name', '"materialName"')
      .field('material.disable_time', '"materialDisable"')

      .field('material_spec.id', '"materialSpecId"')
      .field('material_spec.spec_name', '"materialSpecName"')
      .field('material_spec.remark')
      .field('material_spec.disable_time', '"materialSpecDisable"')
      .field('material_spec.density')

      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.rubber_material', 'material')
      .from('formula.rubber_material_spec', 'material_spec')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .where('material.spec_id = material_spec.id')
      .where('material.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async addRubberMaterialSpec(client, materialSpec, density, remark) {
    let uuid = uuidv1()
    let partCateSQL = generalSQL.getPartCate2Id(RUBBER_PART_CATEGORY2_NAME)

    let sql = squel.insert()
      .into('formula.rubber_material_spec')
      .set('id', uuid)
      .set('spec_name', materialSpec)
      .set('density', density)
      .set('part_category_2_id', (partCateSQL))
      .set('create_time', 'now()')
      .returning('id')

    if(remark) {
      sql.set('remark', remark)
    }

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async checkRubberMaterialSpec(materialSpec) {
    let sql = squel.select()
      .field('id')
      .from('formula.rubber_material_spec')
      .where('UPPER(spec_name) = ?', materialSpec.toUpperCase())
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async addRubberMaterial(client, materialSpecId, material) {

    let sql = squel.insert()
      .into('formula.rubber_material')
      .set('id', uuidv1())
      .set('material_name', material)
      .set('spec_id', materialSpecId)
      .set('create_time', 'now()')
      .returning('id')

    const result = await client.query(sql.toParam())
    return result ? result[0].id : []
  }

  static async checkRubberMaterial(materialSpecId, material) {
    let sql = squel.select()
      .field('id')
      .from('formula.rubber_material')
      .where('UPPER(material_name) = ?', material.toUpperCase())
      .where('spec_id = ?', materialSpecId)
      // .where('disable_time is null')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }

  static async archiveRubberMaterial(client, materialSpecId, materialIdList){

    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.archiveData(client, 'formula.rubber_material', { id : materialId, spec_id : materialSpecId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  static async unblockRubberMaterial(client, materialSpecId, materialIdList){

    for(let materialId of materialIdList) {
      try {
        await Promise.all([
          commonModel.unblockData(client, 'formula.rubber_material', { id : materialId, spec_id : materialSpecId }),
        ])
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  static async archiveRubberMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.rubber_material', [
          `spec_id = '${materialSpecId}'`,
          'disable_time is Null',
        ])
        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.archiveData(client, 'formula.rubber_material_spec', { id : materialSpecId }),
          this.archiveRubberMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  static async unblockRubberMaterialSpec(client, materialSpecIdList){
    try {
      for(const materialSpecId of materialSpecIdList){
        let getMaterialIdListResult = await commonModel.getDataByTable(['id'], 'formula.rubber_material', [
          `spec_id = '${materialSpecId}'`,
          'disable_time is not Null',
        ])
        let materialIdList = getMaterialIdListResult.map((materialInfo) => materialInfo.id)
        await Promise.all([
          commonModel.unblockData(client, 'formula.rubber_material_spec', { id : materialSpecId }),
          this.unblockRubberMaterial(client, materialSpecId, materialIdList),
        ])
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async fetchMachineRate() {
    let subSQL = generalSQL.generalScheduleDateSQL('me_others_rubber')

    let sql = squel.select()
      .field('rmt.id')
      .field('rmt.ton')
      .field('rmp.param_name')
      .field('rmp.id', 'param_id')
      .field('parameter.value')
      .field('parameter.activate_date')
      .field('rmt.disable_time')
      .field('parameter.activation_date_id')
      .from('formula.rubber_machine_rate_related', 'rubber_machine_rate')
      .left_join('formula.rubber_machine_ton', 'rmt', 'rmt.id = rubber_machine_rate.machine_ton_id')
      .left_join('formula.rubber_machine_param', 'rmp', 'rmp.id = rubber_machine_rate.machine_param_id')
      .left_join(
        squel.select()
          .field('parameter_value.*')
          .field('sd.activate_date')
          .field('sd.id', 'activation_date_id')
          .from('formula.parameter_value', 'parameter_value')
          .join('formula.schedule_date', 'sd', ' sd.id = parameter_value.activate_date_id')
          .where('parameter_value.activate_date_id in  ?', subSQL)
        , 'parameter', 'rubber_machine_rate.id = parameter.parameter_id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async fetchMachineRateParam() {

    let sql = squel.select()
      .field('param.id', 'param_id')
      .field('param.param_name', 'param_name')
      .field('related.id', 'related_id')
      .field('related.machine_ton_id', 'machine_ton_id')
      .from('formula.rubber_machine_param', 'param')
      .join('formula.rubber_machine_rate_related', 'related', 'related.machine_param_id = param.id')

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
}

module.exports = Rubber
