let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class productTypeModel {
  static async getProductType() {
    let sql = squel.select()
      .field('id')
      .field('type_name')
      .field('remark')
      .from('formula.product_type')
      .where('disable_time is null')
      .order('type_name')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getProductTypeByformulaType(type) {
    let sql = squel.select()
      .distinct()
      .field('pt.id')
      .field('pt.type_name')
      .from('formula.common_parameter', 'cp')
      .left_join('formula.formula_type', 'ft', 'ft.id = cp.formula_type_id')
      .left_join('formula.product_type', 'pt', 'pt.id = cp.product_type_id')
      .where('pt.disable_time is null')
      .where('cp.disable_time is null')
      .where('ft."name" = ?', type)
      .order('pt.id', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getProductTypeByPartlistFormat(formate) {
    let sql = squel.select()
      .distinct()
      .field('pt.id')
      .field('pt.type_name', 'name')
      .from('formula.product_type', 'pt')
      .left_join('wiprocurement.bom_partlist_config_product_type', 'bpt', 'bpt.product_type_id = pt.id')
      .left_join('wiprocurement.bom_partlist_config', 'bpc', 'bpc.id = bpt.config_id')
      .left_join('wiprocurement.bom_partlist_format', 'bpf', 'bpf.id = bpc.format')
      .where('bpf.format_key = ?', formate)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
}

module.exports = productTypeModel
