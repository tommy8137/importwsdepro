const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const { useSemicolonForArr, useParenthesesForArr } = require('../../helpers/query/processString.js')
class Spending {
  static async getSpendingBaseTableGrouping(query) {
    let sql = squel.select().from('spending_base', 's')
      .field('SUM(po_price)', 'po_price')
      .field('currency')
      .field('vendor_base', 'vbase')
      .field('vendor_group', 'vgname')
    if (query.dateFrom) sql.where('date >= to_date(?, \'YYYY-MM-DD\')', query.dateFrom)
    if (query.dateTo) sql.where('date <= to_date(?, \'YYYY-MM-DD\')', query.dateTo)
    if (query.plants) sql.where('plant in ?', query.plants)
    if (query.scodes) sql.where('sourcer in ?', query.scodes)
    if (query.type1) sql.where('type1 in ?', query.type1)
    if (query.type2) sql.where('type2 in ?', query.type2)
    if (query.supplyType) sql.where('supply_type in ?', query.supplyType)
    sql.group('currency').group('vendor_base').group('vendor_group')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
  static async getExchangeRate(date, currency, toCurrency) {
    // By轉換分組後找最新的一筆
    let sqlPartition = squel.select().field('UKURS*TFACT/FFACT', 'exchangeRate')
      .field('rank() OVER (PARTITION BY fcurr,tcurr ORDER BY GDATU DESC)', 'pr')
      .field('exchange_rate.*')
      .from('exchange_rate')
      .where('GDATU <= ?', date)
      .where('tcurr in ?', toCurrency)
    if (currency) sqlPartition.where('fcurr in ?', currency)
    let sql = squel.select().from(sqlPartition, 's').where('s.pr = ?', 1)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }
}

module.exports = Spending
