const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')
const moment = require('moment')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('importData Model')

class Data {
  static async insertImportData(insertArr, uuid) {

    _.forEach(insertArr, (a) => {
      a['upload_id'] = uuid
      a['upload_time'] = moment().utc().format()
    })

    if(insertArr.length > 0){
      let sql =  squel.insert()
        .into('wiprocurement.xray_item_upload_temp')
        .setFieldsRows(insertArr)

      await systemDB.Query(sql.toParam())
      return uuid
    }
  }

  static async deleteImportData (client, tempId) {
    let sql = squel.delete()
      .from('wiprocurement.xray_item_upload_temp')
      .where('upload_id = ? or upload_time < (now() - \'1 days\'::interval)', tempId)


    await client.query(sql.toParam())
    return true
  }

  static async selectImportData(id) {
    let sql =  squel.select()
      .field('no')
      .field('pur_group', '"purGroup"')
      .field('oem_odm', '"oemODM"')
      .field('wistron_pn', '"wistronPN"')
      .field('description')
      .field('vendor_name', '"vendorName"')
      .field('manufacturer')
      .field('vendor_pn', '"vendorPN"')
      .field('currency')
      .field('last_price', 'price')
      .field('valid_from', '"validFrom"')

      .field('type1.type1name', '"typeI"')
      .field('type2.type2name', '"typeII"')
      .from('wiprocurement.xray_item_upload_temp tmp')
      .join('epur_itemtype', 'item', 'item.item = tmp.wistron_pn')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')

      .where('upload_id = ?', id)
      .where('pass = true')
      .order('no')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getImportFileName(id) {
    let sql = squel.select()
      .distinct()
      .field('file_name')
      .from('wiprocurement.xray_item_upload_temp tmp')
      .where('upload_id = ?', id)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0].file_name : null
  }
}

module.exports = Data
