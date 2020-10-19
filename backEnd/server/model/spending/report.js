const { systemDB } = require('../../helpers/database')
const {  useParenthesesForArr } = require('../../helpers/query/processString.js')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
let squel = require('squel').useFlavour('postgres')

class Report {
  static async getSpendingBase(info) {
    let { plant, user, dateFrom, dateTo, type1, type2, supplyType } = info
    supplyType = _.remove(supplyType, function(n) {
      return n != 3
    })
    let querySql = squel.select()
      .field('plant')
      .field('vendorcode')
      .field('materialnumber')
      .field('material_desc')
      .field('currency')
      .field('po_price')
      .field('inforecord')
      .field('quantity')
      .field('date')
      .field('sourcer')
      .field('po_no')
      .field('profit_center')
      .field('po_price * cast( quantity as float)', 'usd_amount')
      .field('exchange_rate')
      .field('supply_type_name', 'supply_type')
      .field('odmoem')
      .field('type1')
      .field('type2')
      .field('vendor_base')
      .field('vendor_group')
      .field('short_name')
      .field('vendor_name')
      .field('site')
      .field('product_name')
      .field('bu2_description')
      .field('sourcername')
      .field('buyername')
      .field('buyer')
      .from('spending_base')
      .where('DATE >= to_date(?, \'YYYY-MM-DD\') AND DATE <= to_date(?, \'YYYY-MM-DD\')', dateFrom, dateTo)
      .where('plant = ? AND sourcer = ? AND type1 = ?',
        squel.rstr(`ANY(VALUES ${useParenthesesForArr(plant)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(user)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(type1)})`))

    // let sql = `SELECT  plant, vendorcode, materialnumber, material_desc, currency, po_price, inforecord, quantity, date, sourcer,
    //          po_no, profit_center, brand, po_price * cast( quantity as float) as usd_amount, exchange_rate, supply_type_name as supply_type,odmoem,
    //          type1, type2, vendor_base, vendor_group, short_name, vendor_name, site, product_name, bu2_description, sourcername, buyername,buyer
    //          FROM wiprocurement.spending_base WHERE date >= to_date('${dateFrom}', 'YYYY-MM-DD') and date <= to_date('${dateTo}', 'YYYY-MM-DD')
    //          AND plant = ANY(VALUES ${useParenthesesForArr(plant)}) AND sourcer = ANY(VALUES ${useParenthesesForArr(user)})
    //          AND type1= ANY(VALUES ${useParenthesesForArr(type1)}) `

    if(type2 && type2.length > 0) {
      querySql.where('type2 = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(type2)})`))
      // sql +=  ` AND type2 = ANY(VALUES ${useParenthesesForArr(type2)}) `
    }
    if(supplyType && supplyType.length > 0) {
      querySql.where('supply_type = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(supplyType)})`))
      // sql += ` AND  supply_type = ANY(VALUES ${useParenthesesForArr(supplyType)})`
    }
    // const result = await systemDB.Query(sql)
    const result = await systemDB.Query(querySql.toParam())
    return result.rowCount > 0 ? result.rows : throwApiError('spending base not found', errorCode.DATANOTFOUND)

  }

  static async getProductName(profit_center) {
    // let sql = `SELECT product_type_desc  FROM wiprocurement.v_businessorg_bo where profit_center_key='${profit_center}' `    
    let querySql = squel.select()
      .from('wiprocurement.v_businessorg_bo')
      .field('product_type_desc')
      .where('profit_center_key = ?', profit_center)
    const res = await systemDB.Query(querySql.toParam())

    return res.rowCount == 1 ? res.rows[0].product_type_desc : null
  }
  static async getSummaryRawData(info) {
    let { plant, user, dateFrom, dateTo, type1, type2, supplyType } = info
    supplyType = _.remove(supplyType, function(n) {
      return n != 3
    })
    let querySql = squel.select()
    querySql
      .field('currency')
      .field('vendorcode')
      .field('vendor_base')
      .field('vendor_group')
      .field('site')
      .field('brand')
      .field('plant')
      .field('type1')
      .field('type2')
      .field('supply_type_name', 'supply_type')
      .field('odmoem')
      .field('month')
      .field('profit_center')
      .field('product_name')
      .field('bu2_description')
      .field('sum(cast (quantity as float))', 'gr_qty')
      .field('sum(po_price * cast( quantity as float) * exchange_rate )', 'usdamount')
      .from('spending_base')
      .where('DATE >= to_date(?, \'YYYY-MM-DD\') AND DATE <= to_date(?, \'YYYY-MM-DD\')', dateFrom, dateTo)
      .where('plant = ? AND sourcer = ? AND type1 = ?',
        squel.rstr(`ANY(VALUES ${useParenthesesForArr(plant)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(user)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(type1)})`))

    // let sql = `SELECT  currency, vendorcode, vendor_base, vendor_group, site, brand, plant, type1, type2, supply_type_name as supply_type,odmoem, month, profit_center,product_name,bu2_description, sum(cast (quantity as float)) as gr_qty
    //         , sum(po_price * cast( quantity as float) * exchange_rate )as usdamount
    //          FROM wiprocurement.spending_base WHERE date >= to_date('${dateFrom}', 'YYYY-MM-DD') and date <= to_date('${dateTo}', 'YYYY-MM-DD')
    //          AND plant = ANY(VALUES ${useParenthesesForArr(plant)}) AND sourcer = ANY(VALUES ${useParenthesesForArr(user)})
    //          AND type1= ANY(VALUES ${useParenthesesForArr(type1)})
    //          `
    if(type2 && type2.length > 0) {
      querySql.where('type2 = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(type2)})`))
      // sql +=  ` AND type2 = ANY(VALUES ${useParenthesesForArr(type2)}) `
    }
    if(supplyType && supplyType.length > 0) {
      querySql.where('supply_type = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(supplyType)})`))
      // sql += ` AND  supply_type = ANY(VALUES ${useParenthesesForArr(supplyType)})`
    }
    querySql.group('currency').group('site').group('type1').group('type2').group('supply_type_name').group('odmoem').group('month').group('profit_center')
      .group('product_name').group('bu2_description').group('vendorcode').group('vendor_base').group('vendor_group').group('brand')
      .group('plant')
    // sql += ' group by currency, site, type1, type2, supply_type_name,odmoem,month, profit_center, product_name, bu2_description, vendorcode, vendor_base, vendor_group, brand, plant'
    // const result = await systemDB.Query(sql)
    const result = await systemDB.Query(querySql.toParam())
    return result.rowCount > 0 ? result.rows : throwApiError('SummaryRawData not found', errorCode.DATANOTFOUND)
  }


  static async genSummary(info) {
    let { plant, user, dateFrom, dateTo, type1, type2, supplyType } = info
    supplyType = _.remove(supplyType, function(n) {
      return n != 3
    })
    let querySql = squel.select()
    querySql
      .field('currency')
      .field('odmoem')
      .field('SUM(po_price * cast( quantity as float))', 'usd_amount')
      .field('month')
      .field('product_name')
      .field('profit_center')
      .field('site')
      .field('type1')
      .field('vendor_base')
      .field('short_name')
      .field('brand')
      .field('plant')
      .field('type2')
      .from('spending_base')
      .where('DATE >= to_date(?, \'YYYY-MM-DD\') AND DATE <= to_date(?, \'YYYY-MM-DD\')', dateFrom, dateTo)
      .where('plant = ? AND sourcer = ? AND type1 = ?',
        squel.rstr(`ANY(VALUES ${useParenthesesForArr(plant)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(user)})`), squel.rstr(`ANY(VALUES ${useParenthesesForArr(type1)})`))

    let sql = `SELECT  currency, odmoem, SUM(po_price * cast( quantity as float))as usd_amount, month, product_name,
              profit_center, site, type1, vendor_base, short_name, brand, plant, type2
             FROM wiprocurement.spending_base WHERE date >= to_date('${dateFrom}', 'YYYY-MM-DD') and date <= to_date('${dateTo}', 'YYYY-MM-DD')
             AND plant = ANY(VALUES ${useParenthesesForArr(plant)}) AND sourcer = ANY(VALUES ${useParenthesesForArr(user)})
             AND type1= ANY(VALUES ${useParenthesesForArr(type1)}) `
    if(type2 && type2.length > 0) {
      querySql.where('type2 = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(type2)})`))
      sql +=  ` AND type2 = ANY(VALUES ${useParenthesesForArr(type2)}) `
    }
    if(supplyType && supplyType.length > 0) {
      querySql.where('supply_type = ?', squel.rstr(`ANY(VALUES ${useParenthesesForArr(supplyType)})`))
      sql += ` AND  supply_type = ANY(VALUES ${useParenthesesForArr(supplyType)})`
    }
    querySql.group('short_name').group('brand').group('plant').group('type1').group('type2').group('month').group('currency').group('odmoem')
      .group('product_name').group('profit_center').group('site').group('vendor_base')
      
    sql += 'GROUP BY short_name, brand, plant, type1, type2, month, currency, odmoem, product_name, profit_center, site, vendor_base'
    // const result = await systemDB.Query(sql)
    const result = await systemDB.Query(querySql.toParam())
    return result.rowCount > 0 ? result.rows : throwApiError('genType not found', errorCode.DATANOTFOUND)
  }

}

module.exports = Report
