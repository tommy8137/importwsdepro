const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('multi Analysis Model')

class Data {

  static async getCmpPartnumbers() {
    let sql = squel.select()
      .field('partnumber', '"wistronPN"')
      .field('type1.type1name', '"typeI"')
      .field('type2.type2name', '"typeII"')
      // .field('RANK() OVER (ORDER BY type1.type1name ASC, type2.type2name ASC, partnumber ASC)', 'no')
      .from('view_common_parts cmp')
      .left_join('wiprocurement.epur_itemtype', 'type', 'cmp.partnumber = type.item')
      .left_join('wiprocurement.epur_type1', 'type1', 'type.type1id=type1.type1id')
      .left_join('wiprocurement.epur_type2', 'type2', 'type.type2id=type2.type2id')
      .where('type1.type1name is not null')
      .where('type2.type2name is not null')
      .order('type1.type1name')
      .order('type2.type2name')
      .order('partnumber')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : null
  }

  static async getPurchaseOrgList() {
    let sql = squel.select()
      .distinct()
      .field('purchase_org')
      .from('wiprocurement.plant_list')
      .where('purchase_org is not null')
      .order('purchase_org')

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : null

  }
}

module.exports = Data
