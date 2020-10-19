const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const moment = require('moment')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')
const uuidv1 = require('uuid/v1')

const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Thermal model')


class Thermal {
  static async fetchFanBaselinePrice() {

    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module')

    let sql = squel.select()
      .field('fan.baseline', 'id')
      .field('fan.fan_size')
      .field('pvsd.value')
      .field('fan.disable_time')
      .field('to_char(pvsd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pvsd.activate_date_id', 'activation_date_id')
      .from('formula.thermal_fan fan')
      .left_join(
        squel.select()
          .field('pv.*')
          .field('sd.activate_date')
          .from('formula.parameter_value pv')
          .from('formula.schedule_date sd')
          .where('sd.id = pv.activate_date_id'),
        'pvsd',
        'fan.baseline = pvsd.parameter_id'
      )
      // .where('fan.disable_time is null')
      .where('pvsd.activate_date_id in ?', subSQL)
      .order('pvsd.activate_date', true)
      .order('fan.sort_order', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async fetchPadList() {
    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module')
    let sql = squel.select()
    .field('tp.id')
    .field('tphs.hardness', 'hardness')
    .field('tph.heat_transfer','heat_transfer')
    .field('tpt.thickness','thickness')
    .field('pv.value')
    .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
    .field('pv.activate_date_id')
    .from('formula.thermal_pad', 'tp')
    .from('formula.thermal_pad_hardness','tphs')
    .from('formula.thermal_pad_heat','tph')
    .from('formula.thermal_pad_thickness','tpt')
    .from('formula.schedule_date sd')
    .from('formula.parameter_value pv')
    .where('sd.id = pv.activate_date_id')
    .where('pv.activate_date_id in ?', subSQL)
    .where('pv.parameter_id = tp.id')
    .where('tp.thickness_id = tpt.id')
    .where('tp.heat_transfer_id = tph.id')
    .where('tp.hardness_id = tphs.id')
    .where('tp.disable_time is null')
    .order('tph.heat_transfer')
    .order('tphs.hardness')
    .order('tpt.thickness')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async fetchPipeList() {
    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module')
    let sql = squel.select()
      .field('link.id')
      .field('pipe.pipe_name')
      .field('dia.diameter_name')
      .field('len.length_begin')
      .field('len.length_end')
      .field('thick.thickness_begin')
      .field('thick.thickness_end')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('pv.activate_date_id')
      .from('formula.thermal_pipe_diameter_length_thickness link')
      .from('formula.thermal_pipe pipe')
      .from('formula.thermal_pipe_diameter dia')
      .from('formula.thermal_pipe_thickness thick')
      .from('formula.thermal_pipe_length len')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('sd.id = pv.activate_date_id')
      .where('pv.parameter_id = link.id')
      .where('link.diameter_id = dia.id')
      .where('link.length_id = len.id')
      .where('link.thickness_id = thick.id')
      .where('dia.pipe_id = pipe.id')
      .where('pv.activate_date_id in ?', subSQL)
      .order('pipe.pipe_name', true)
      .order('dia.diameter_name', true)
      .order('sd.activate_date', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async fetchThermalParameter() {
    let res = await generalSQL.Common.fetchParameterByType('thermal_module')
    return res
  }

  static async fetchFanBearing() {
    let sql = squel.select()
      .field('id')
      .field('bearing_name', 'name')
      .field('disable_time', 'disable')
      .from('formula.thermal_fan_bearing bearing')
      .order('bearing_name', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async fetchFanBearingPrice() {

    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module')

    let sql = squel.select()
      .field('fan_fan.id', 'id')
      .field('fan_fan.fan_id', 'fan_size_id')
      .field('fan_fan.bearing_id')

      .field('fanBearing.bearing_name')
      .field('fanSize.fan_size')

      .field('pv.value', '')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.thermal_fan_bearing fanBearing')
      .from('formula.thermal_fan_fan_bearing fan_fan')
      .from('formula.thermal_fan fanSize')
      .from('formula.parameter_value pv')
      .from('formula.schedule_date sd')

      .where('fan_fan.bearing_id = fanBearing.id')
      .where('fan_fan.fan_id = fanSize.id')

      .where('pv.parameter_id = fan_fan.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('fanSize.sort_order', true)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchFanMaterial() {
    let sql = squel.select()
      .field('id')
      .field('material_name', 'name')
      .field('disable_time', 'disable')
      .from('formula.thermal_fan_material material')
      .order('material_name', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async fetchFanMaterialPrice() {
    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module')

    let sql = squel.select()
      .field('fan_fan.id', 'id')
      .field('fan_fan.fan_id', 'fan_size_id')
      .field('fan_fan.material_id')

      .field('fanMaterial.material_name')
      .field('fanSize.fan_size')

      .field('pv.value', '')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')

      .from('formula.thermal_fan_material fanMaterial')
      .from('formula.thermal_fan_fan_material fan_fan')
      .from('formula.thermal_fan fanSize')
      .from('formula.parameter_value pv')
      .from('formula.schedule_date sd')

      .where('fan_fan.material_id = fanMaterial.id')
      .where('fan_fan.fan_id = fanSize.id')

      .where('pv.parameter_id = fan_fan.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
      .order('fanSize.sort_order', true)
      .order('sd.activate_date', true)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  static async getMagnetMaterialList(){
    let sql = squel.select()
      .field('id')
      .field('magnet_name')
      .field('disable_time')
      .from('formula.thermal_fan_magnet')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMagnetMaterialPrice(){
    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module') 
    let sql = squel.select()
      .distinct()
      .field('tfm.magnet_name', '"magnetName"')
      .field('tffm.fan_id', '"id"')
      .field('tffm.id', '"magnetId"')
      .field('tf.fan_size', '"fanSize"')
      .field('tf.sort_order')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.thermal_fan_magnet', 'tfm')
      .from('formula.thermal_fan_fan_magnet', 'tffm')
      .from('formula.thermal_fan', 'tf')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .where('tf.id = tffm.fan_id')
      .where('tffm.magnet_id = tfm.id')
      .where('pv.parameter_id = tffm.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMotorDiffList(){
    let sql = squel.select()
      .field('id')
      .field('motor_name')
      .field('disable_time')
      .from('formula.thermal_fan_motor')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getMotorDiffPrice(){
    let subSQL = generalSQL.generalScheduleDateSQL('thermal_module') 
    let sql = squel.select()
      .distinct()
      .field('tfm.motor_name', '"motorName"')
      .field('tffm.fan_id', '"id"')
      .field('tffm.id', '"motorId"')
      .field('tf.fan_size', '"fanSize"')
      .field('tf.sort_order')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.thermal_fan_motor', 'tfm')
      .from('formula.thermal_fan_fan_motor', 'tffm')
      .from('formula.thermal_fan', 'tf')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .where('tf.id = tffm.fan_id')
      .where('tffm.motor_id = tfm.id')
      .where('pv.parameter_id = tffm.id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = Thermal
