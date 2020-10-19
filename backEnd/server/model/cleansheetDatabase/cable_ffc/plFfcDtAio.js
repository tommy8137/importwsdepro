let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../../helpers/database')
const moment = require('moment')
const log4js = require('../../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const schedule = require('../plScheduleDate')

class ffc {

  static async getFfcConnector() {
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc', this.productTypeId)
    let sql = squel.select()
      .field('link.id')
      .field('cat.category_name')
      .field('spe.spec_name')
      .field('link.pitch')
      .field('link.row_num  "row"')
      .field('link.pin')
      .field('ven.vendor_name')
      .field('link.part_number')
      .field('pv.value')
      .from('formula.cableffc_dt_connector', 'link')
      .join('formula.cableffc_dt_connector_category', 'cat', 'cat.id = link.category_id ')
      .join('formula.cableffc_dt_connector_spec', 'spe', 'spe.id = link.spec_id')
      .join('formula.cableffc_dt_connector_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id = ?', scheduleDateId.schdeule_id)
      .where('link.product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFfcMaterial() {
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc', this.productTypeId)
    let sql = squel.select()
      .field('link.id')
      .field('cat.category_name')
      .field('link.spec')
      .field('link.material_l')
      .field('link.material_w')
      .field('link.thickness')
      .field('ven.vendor_name')
      .field('link.part_number')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_dt_material', 'link')
      .join('formula.cableffc_dt_material_category', 'cat', 'cat.id = link.category_id ')
      .join('formula.cableffc_dt_material_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id = ?', scheduleDateId.schdeule_id)
      .where('link.product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFfcAccessoryPart() {
    let sql = squel.select()
      .field('cat.id')
      .field('cat.category_name')
      .from('formula.cableffc_dt_accessories_category', 'cat')
      .where('cat.disable_time is null')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFfcAccessories() {
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc', this.productTypeId)
    let sql = squel.select()
      .field('link.id')
      .field('cat.category_name')
      .field('link.spec')
      .field('link.material_l')
      .field('link.material_w')
      .field('link.thickness')
      .field('ven.vendor_name')
      .field('link.part_number')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_dt_accessories', 'link')
      .join('formula.cableffc_dt_accessories_category', 'cat', 'cat.id = link.category_id ')
      .left_join('formula.cableffc_dt_accessories_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id = ?', scheduleDateId.schdeule_id)
      .where('link.product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFFCAccessoryAssemblySeconds() {
    let sql = squel.select()
      .field('*')
      .from('formula.v_ffc_assembly_seconds')
      .where('product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getFfcReinforcementBoard() {
    let scheduleDateId = await schedule.getScheduleDate('cable_ffc', this.productTypeId)
    let sql = squel.select()
      .field('link.id')
      .field('link.spec', 'spec1')
      .field('link.spec', 'spec2')
      .field('link.material_l')
      .field('link.material_w')
      .field('link.thickness')
      .field('ven.vendor_name')
      .field('link.part_number')
      .field('pv.value', 'value1')
      .field('pv.value', 'value2')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_dt_reinforcement_board', 'link')
      .join('formula.cableffc_dt_reinforcement_board_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id = ?', scheduleDateId.schdeule_id)
      .where('link.product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getGgoldPlatingPitchMapped() {
    let sql = squel.select()
      .field('*')
      .from('formula.v_ffc_pitch_size')
      .where('product_type_id = ?', this.productTypeId)
    
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getAccessoryMaterialType() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_accessory_material_type'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getAccessoryAssemblyType() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_accessory_assembly_type'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getReinforcingPlateQty1() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_reinforcing_plate_qty1'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getReinforcingPlateQty2() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_reinforcing_plate_qty2'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getStopLine() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_stop_line'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getPrintArea() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_print_area'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getFlushCount() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_flush_count'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getBendTImes() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_bend_times'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  
  static async getSprayCodeCount() {
    let sql = squel.select()
      .field('a.id')
      .field('a.spec_name', 'name')
      .field('a.spec_value', 'value')
      .from(squel.select().from('formula.me_spec').where('disable_time is null').where('spec_category = ?', 'ffc_spray_code'), 'a')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

}

module.exports = ffc