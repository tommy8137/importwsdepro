const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const generalSQL = require('../database/common.js')

class CableFFC {
  static async fetchFfcParameter() {
    let res = await generalSQL.Common.fetchParameterByType('cable_ffc')
    return res
  }
  static async fetchFfcConnector(){
    let sql = squel.select()
      .field('id')
      .field('type_name')
      .field('disable_time')
      .from('formula.cableffc_connector_type')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async fetchFfcConnectorPrice(column, asName){
    let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc')
    let sql = squel.select()
      .distinct()
      .field('ccv.id')
      .field('ccv.vendor_pn')
      .field('ccv.vendor_name')
      .field('ccv.disable_time')
      .field('cct.type_name')
      .field('pv.value', asName)
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_connector_type', 'cct')
      .from('formula.cableffc_connector_vendor', 'ccv')
      .from('formula.parameter_value', 'pv')
      .from('formula.schedule_date', 'sd')
      .where('ccv.connector_type_id = cct.id')
      .where(`ccv.${column} = pv.parameter_id`)
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
    /* let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc')
    let sql = squel.select()
      .distinct()
      .field('ccv.id')
      .field('ccv.vendor_pn')
      .field('ccv.disable_time')
      .field('cct.type_name')
      .field('pvsd1.value', 'price')
      .field('pvsd2.value', 'process_time')
      .field('pvsd1.activate_date')
      .field('pvsd1.activate_date_id')
      .from('formula.cableffc_connector_vendor ccv')
      .left_join('formula.cableffc_connector_type', 'cct', 'ccv.connector_type_id = cct.id')
      .left_join(
        squel.select()
          .field('pv1.*')
          .field('to_char(sd1.activate_date, \'YYYY-MM-DD\')', 'activate_date')
          .from('formula.parameter_value', 'pv1')
          .from('formula.schedule_date', 'sd1')
          .where('sd1.id = pv1.activate_date_id')
          .where('sd1.id in ?', subSQL),
        'pvsd1',
        'ccv.unit_price = pvsd1.parameter_id')
      .left_join(
        squel.select()
          .field('pv2.*')
          .field('to_char(sd2.activate_date, \'YYYY-MM-DD\')', 'activate_date')
          .from('formula.parameter_value', 'pv2')
          .from('formula.schedule_date', 'sd2')
          .where('sd2.id = pv2.activate_date_id')
          .where('sd2.id in ?', subSQL),
        'pvsd2',
        'ccv.process_time = pvsd2.parameter_id')
      .where('pvsd1.activate_date_id = pvsd2.activate_date_id')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []*/
  }
  static async modifyFfcConnectorPrice(client, nextId, ffcConnectorPrice){
    for(const priceInfo of ffcConnectorPrice){
      const seletSql = squel.select()
        .field('unit_price')
        .field('process_time')
        .from('formula.cableffc_connector_vendor')
        .where('id = ?', priceInfo.id)
      const getParameterIdListResult = await systemDB.Query(seletSql.toParam())
      if(getParameterIdListResult.rowCount > 0){
        const parameterIdList = getParameterIdListResult.rows[0]
        const updatePriceSql = squel.update()
          .table('formula.parameter_value')
          .set('value', priceInfo.price)
          .where('activate_date_id = ? and parameter_id = ?', nextId, parameterIdList.unit_price)
        const updateProcessTimeSql = squel.update()
          .table('formula.parameter_value')
          .set('value', priceInfo.processTime)
          .where('activate_date_id = ? and parameter_id = ?', nextId, parameterIdList.process_time)
        await client.query(updatePriceSql.toParam())
        await client.query(updateProcessTimeSql.toParam())
      }
    }
  }
}

module.exports = CableFFC
