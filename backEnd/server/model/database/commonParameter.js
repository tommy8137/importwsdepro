let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const generalSQL = require('../database/common.js')

class commonParameterModel {
  static async getCommonParameter(id) {
    let subSQL = generalSQL.generalScheduleDateSQL('common')

    let sql = squel.select()
      .field('cp.id')
      .field('cp.label_name', 'name')
      .field('cp.unit')
      .field('pv.value')
      .field('pv.value_type')
      .field('sd.activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.formula_type', 'ft')
      .from('formula.common_parameter', 'cp')
      .from('formula.schedule_date','sd')
      .from('formula.parameter_value', 'pv')
      .where('ft."name" = ?', 'common')
      .where('ft.id = cp.formula_type_id')
      .where('cp.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('sd.id in ?', subSQL)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = commonParameterModel
