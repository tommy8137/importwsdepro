const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xrayAnalysis')
const EMPTY_ARRAY_LENGTH = 0

class Items {
  static async getMRPSummury(partNumbers, org = null) {
    let sql = squel
      .select()
      .field('sum(CAST(split_part(zmrp_nreq, \'-\', 1) as numeric))', 'demand')
      .field('mat_plant', 'partnumber')
      .from('mrp_bw mrp')
      .where('mat_plant in ? and zmrp_nreq like \'%-\'', partNumbers)
      .group('mat_plant')

    if (org) {
      sql.field('purchase_org')
        .join('plant_list', 'plant', 'plant.plant = mrp.plant')
        .where('purchase_org = ?', org)
        .group('purchase_org')
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getCommonPartList(partNumbers = []) {

    let sql = squel.select()
      .field('array_agg(DISTINCT partnumber)', 'cmp')
      .from('view_common_parts')

    if (partNumbers.length > 0) {
      sql.where('partnumber in ?', partNumbers)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0].cmp : []
  }

  static async getBlockList(partNumbers) {

    let sql = squel.select()
      .field('array_agg(DISTINCT partnumber)', 'block')
      .from('wiprocurement.pdmparts')
      .where('lifecyclestate = ?', 'LcsObsoleted')

    if (partNumbers.length > 0) {
      sql.where('partnumber in ?', partNumbers)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0].block : []
  }

  // static async getSupplyTypeList(partNumbers, supply) {
  //   // let sql = squel.select()
  //   //   .distinct('matnr')
  //   //   .field('matnr', 'part_number')
  //   //   .field('supplytype.supply_type', 'supply_type')
  //   //   .from('wiprocurement.marc', 'marc')
  //   //   .left_join('wiprocurement.supplytypemapping', 'supplytype', 'supplytype.key = marc.zzbsar')
  //   //   .order('matnr')
  //   //   .order('marc.zzbsar')

  //   // if (partNumbers != null && partNumbers.length != EMPTY_ARRAY_LENGTH) {
  //   //   sql.where('marc.matnr in ?', partNumbers)
  //   // }

  //   let sql = squel.select()
  //     // .field('marc.werks', 'plant')
  //     .field('ZZBSAR', 'supply')
  //     .field('marc.matnr', 'partnumber')
  //     .from('wiprocurement.marc', 'marc')
  //     .where('matnr IN ?', partNumbers)
  //     .where('(ZZBSAR in ? or ZZBSAR is null)', supply)
  //     .order('matnr')
  //     .order('werks')

  //   const result = await systemDB.Query(sql.toParam())
  //   return result.rowCount > 0 ? result.rows : []
  // }

  static async getSupplyTypeList(partNumbers, supply) {

    let sql = squel.select()
      .distinct()
      .field('marc.matnr', 'partnumber')
      .field('marc.werks', 'plant')
      .field('marc.zzbsar', 'supply_type_key')
      // .field('sp.supply_type')
      .field('case when sp.supply_type is null then \'W\' else sp.supply_type end', 'supply_type')

      .from('wiprocurement.marc', 'marc')

      .left_join('wiprocurement.supplytypemapping', 'sp', 'sp.key = marc.zzbsar')
      .where('matnr IN ?', partNumbers)
      // .where('matnr = ?', '001.00603.0001')
      .where('marc.zzbsar in ? or marc.zzbsar is null', supply)
      .order('marc.matnr')
      .order('marc.werks')

    // if(purchase_org) {
    //   sql.field('plant.purchase_org')
    //     .left_join('wiprocurement.plant_list', 'plant', 'plant.plant = marc.werks')
    //     .where('purchase_org = ?', purchase_org)
    // }

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getDescriptionList(partNumbers) {
    let sql = squel.select().distinct()
      .field('matnr', 'item')
      .field('MAKTX', '"partDesc"')
      .from('mara')
      .where('matnr in ?', partNumbers)

    let res = await systemDB.Query(sql.toString())
    return res.rows
  }

  static async getPartNumberTypes(partNums) {
    let sql = squel.select()
      .field('type1.type1name', 'type1')
      .field('type2.type2name', 'type2')
      .field('type.item', 'partnumber')
      .from('wiprocurement.epur_itemtype', 'type')
      .left_join('wiprocurement.epur_type1', 'type1', 'type.type1id=type1.type1id')
      .left_join('wiprocurement.epur_type2', 'type2', 'type.type2id=type2.type2id')
      .where('type.item IN ?', partNums)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ?  result.rows : []
  }

  static async getPartNumberLastPrice(partNums, purchaseOrg = null) {

    let sql = squel.select()
      .field('eina.BMATN', 'partnumber')
      // .field('mara.maktx', 'description')
      .field('a018_konp.ekorg', 'purchaseorg')
      .field('a018_konp.matnr', 'mpnno')
      .field('eina.lifnr', 'vendor_code')
      .field('vgroup.vgName', 'vendor_name')
      .field('eina.mfrnr', 'manufacturer')
      .field('eina.mfrpn', 'vendor_pn')
      .field('cast(a018_konp.KBETR::NUMERIC/a018_konp.KPEIN*a018_konp.KUMZA/a018_konp.KUMNE as Float)', 'price')
      .field('a018_konp.konwa', 'currency')
      .field('to_char(a018_konp.datab, \'YYYYMMDD\')', 'valid_from')
      .field('to_char(a018_konp.datbi, \'YYYYMMDD\')', 'valid_to')
      .field('a018_konp.knumh', 'knumh')
      .from('wiprocurement.eina', 'eina')
      // .left_join('wiprocurement.mara', 'mara', 'eina.bmatn = mara.matnr')
      .left_join('wiprocurement.a018_konp', 'a018_konp', 'eina.MATNR = a018_konp.MATNR and eina.lifnr=a018_konp.lifnr')
      .left_join('wiprocurement.epur_vgroup', 'vgroup', 'a018_konp.LIFNR = vgroup.vcode')
      .where('eina.BMATN in ?', partNums)
      // .where('eina.BMATN = ?', '001.00603.0001')
      .where('a018_konp.datbi = ?', '2099-12-31')
      // .where('a018_konp.datab <= Current_date')
      .order('purchaseorg')
      .order('price', false)

    if(purchaseOrg) {
      sql.where('a018_konp.ekorg = ?', purchaseOrg)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPlantAndSupplyTypeAndOdmOem(allPartNums, supply, purchase_org = null) {
    /*
      SELECT matnr, werks, zzbsar, sp.odmoem, sp.supply_type, plant.purchase_org
      FROM wiprocurement.marc marc
      left join wiprocurement.supplytypemapping sp on (sp.key = marc.zzbsar and sp.zzeeme like '%EE%')
      left join wiprocurement.plant_list as plant on (plant.plant = marc.werks)
      WHERE matnr = '40.4J903.001'
      and purchase_org in ('PWCD', 'PWKS')
      */
    let sql = squel.select()
      .distinct()
      .field('marc.matnr', 'partnumber')
      .field('marc.werks', 'plant')
      .field('marc.zzbsar', 'supply_type_key')
      // .field('case when sp.supply_type is null then \'W\' else sp.supply_type end', 'supply_type')
      // .field('case when sp.odmoem is null then \'ODM\' else sp.odmoem end', 'odm_oem')
      .field('sp.supply_type', 'supply_type')
      .field('sp.odmoem', 'odm_oem')

      .from('wiprocurement.marc', 'marc')
      .left_join('wiprocurement.supplytypemapping', 'sp', 'sp.key = marc.zzbsar and sp.zzeeme like \'%EE%\'')
      .left_join('wiprocurement.plant_list', 'plant', 'plant.plant = marc.werks')
      .where('matnr IN ?', allPartNums)
      // .where('matnr = ?', '001.00603.0001')
      // .where('marc.zzbsar in ? or marc.zzbsar is null', supply)

    if(purchase_org) {
      sql.field('plant.purchase_org')
        .where('purchase_org = ?', purchase_org)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ?  result.rows : []
  }

}

module.exports = Items
