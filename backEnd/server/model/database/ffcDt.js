const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const generalSQL = require('../database/common.js')
const { asyncForEach } = require('../../helpers/utils')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper')

class CableFFC {
  static async fetchFfcConnectorPrice(productTypeId){
    let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc', productTypeId)
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
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_dt_connector', 'link')
      .join('formula.cableffc_dt_connector_category', 'cat', 'cat.id = link.category_id ')
      .join('formula.cableffc_dt_connector_spec', 'spe', 'spe.id = link.spec_id')
      .join('formula.cableffc_dt_connector_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id in ?', subSQL)
      .where('link.product_type_id = ?', productTypeId)
    
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchFfcMaterialPrice(productTypeId){
    let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc', productTypeId)
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
      .where('sd.id in ?', subSQL)
      .where('link.product_type_id = ?', productTypeId)
    
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchFfcAccessoriesPrice(productTypeId){
    let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc', productTypeId)
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
      .where('sd.id in ?', subSQL)
      .where('link.product_type_id = ?', productTypeId)
    
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchFfcgetFfcDtReinforcementBoardPrice(productTypeId){
    let subSQL = generalSQL.generalScheduleDateSQL('cable_ffc', productTypeId)
    let sql = squel.select()
      .field('link.id')
      .field('link.spec')
      .field('link.material_l')
      .field('link.material_w')
      .field('link.thickness')
      .field('ven.vendor_name')
      .field('link.part_number')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.cableffc_dt_reinforcement_board', 'link')
      .join('formula.cableffc_dt_reinforcement_board_vendor', 'ven', 'ven.id = link.vendor_id')
      .join('formula.parameter_value', 'pv', 'pv.parameter_id = link.id')
      .join('formula.schedule_date', 'sd', 'sd.id = pv.activate_date_id')
      .where('sd.id in ?', subSQL)
      .where('link.product_type_id = ?', productTypeId)
    
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  /**
   * for ffc DT/AIO 修改
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {Object} params {
   *    param {String} finalPath API 路由的最後一個字(寫入防呆)
   *    param {Number} nextId 要修改的 date id
   *    param {Array} items 修改的資料 ex: [{ id: '1', next: '500' }], [{ thicknessId: '1', next: '500' }]
   *    param {String} itemKey 修改資料對應id的Key, 第一個ex的Key: id,  第一個ex的Key: thicknessId
   * }
   */
  static async modifyFfcDtPrice(client, params) {
    try {
      let { finalPath, nextId, items, itemKey } = params
      let sourceTable = ''
      switch (finalPath) {
        case 'connectorPrice':
          sourceTable = 'cableffc_dt_connector'
          break
        case 'materialPrice':
          sourceTable = 'cableffc_dt_material'
          break
        case 'accessoriesPrice':
          sourceTable = 'cableffc_dt_accessories'
          break
        case 'reinforcementBoardPrice':
          sourceTable = 'cableffc_dt_reinforcement_board'
          break
        default:
          throwApiError(`unexpected finalPath:${finalPath}`, errorCode.BAD_REQUEST)
      }
      await asyncForEach(items, async (item) => {
        let sql = squel.update()
          .table('formula.parameter_value pv')
          .set('value = ?', item.next)
          .where('parameter_id = ?', item[itemKey])
          .where('activate_date_id = ?', nextId)
          .where('source_table = ?', sourceTable)

        await client.query(sql.toString())
      })
    } catch (err) {
      throw err
    }
  }
}

module.exports = CableFFC
