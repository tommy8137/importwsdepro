const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const generalSQL = require('../database/common.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database ThermalGraphite Model')
const FORMULA_TYPE = 'thermal_graphite'

class ThermalGraphite {
  static async fetchThicknessPrice() {

    let subSQL = generalSQL.generalScheduleDateSQL(FORMULA_TYPE)

    let sql = squel.select()
      .field('tab.id')
      .field('grap.graphite_name', 'type')
      .field('tab.thickness')
      .field('tab.disable_time')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id activate_date_id')
      .from('formula.graphite_graphite_thickness tab')
      .from('formula.graphite_graphite', 'grap')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('sd.id = pv.activate_date_id')
      .where('tab.id = pv.parameter_id')
      .where('tab.graphite_id = grap.id')
      .where('pv.activate_date_id in ?', subSQL)
    
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}
module.exports = ThermalGraphite
