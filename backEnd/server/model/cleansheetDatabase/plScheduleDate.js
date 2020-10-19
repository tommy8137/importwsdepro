let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const moment = require('moment')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plScheduleDate')
const NodeCache = require( 'node-cache' )
const scheduleDateCache = new NodeCache({ stdTTL: 300, checkperiod: 30 })
const _ = require('lodash')

class scheduleDate {
  /**
     *
     * @param {String} formula_type
     * @param {Number} product_type_id default為1 (NB) -1代表共通的參數（在table顯示為NULL)
     */
  static async getScheduleDate(formula_type, product_type_id = 1) {
    
    let value = scheduleDateCache.get(`${formula_type}_${product_type_id}`)
    if (typeof value == 'undefined') {
      // select schedule date
      let sql = squel.select()
        .field('s.id', 'schdeule_id')
        .from('formula.schedule_date', 's')
      if(product_type_id === -1){
        sql = sql.where('s.activate_date = ? and s.formula_type_id = ?',
          squel.select()
            .field('max(sd.activate_date)')
            .from('formula.schedule_date', 'sd')
            .where('sd.activate_date < now() and sd.formula_type_id = ?',
              squel.select().field('id').from('formula.formula_type').where('name=?', formula_type)
            ).where('sd.product_type_id is Null'),
          squel.select().field('id').from('formula.formula_type').where('name=?', formula_type)
        )
          .where('s.product_type_id is Null')
      } else {
        sql = sql.where('s.activate_date = ? and s.formula_type_id = ?',
          squel.select()
            .field('max(sd.activate_date)')
            .from('formula.schedule_date', 'sd')
            .where('sd.activate_date < now() and sd.formula_type_id = ?',
              squel.select().field('id').from('formula.formula_type').where('name=?', formula_type)
            ).where('sd.product_type_id = ?', product_type_id),
          squel.select().field('id').from('formula.formula_type').where('name=?', formula_type)
        )
          .where('s.product_type_id = ?', product_type_id)
      }
      if (process.env.USE_FORMULA_INIT_DATA === 'true') {
        sql = squel.select()
          .field('min(sd.id) as schdeule_id')
          .from('formula.schedule_date', 'sd')
          .join('formula.formula_type', 'ft', 'sd.formula_type_id = ft.id')
          .where('ft.name=?', formula_type)
      }
      let result = await systemDB.Query(sql.toParam())
      if (result.rowCount > 0) {
        value = result.rows[0]
        scheduleDateCache.set(formula_type, value)
      } else {
        return null
      }
    }
    return value
  }
}
module.exports = scheduleDate