let squel = require('squel').useFlavour('postgres')
const schemaFilter = require('../getSchemaColumns')
const { systemDB } = require('../../helpers/database')
const { forPromiseAll } = require('../../helpers/utils.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('pcbModel')
const moment = require('moment')

const getPcbWithQuery = async (info) => {
  let sql = squel.select().field('*').from('pcb')
  Object.entries(info).forEach((pair)=>{
    sql.where(`${pair[0]} = ?`, pair[1])
  })
  let result = await systemDB.Query(sql.toParam())
  return result
}

const getCost = async (item, cost = -1) =>{
  item = typeof (item.content) === 'string' ?  { ...item, content: (item.content) } : item
  let pcbInDb = await getPcbWithQuery({ id:item.id })
  pcbInDb = pcbInDb.rowCount == 1 ? { ...pcbInDb.rows[0], content: (pcbInDb.rows[0].content) } : { content:{} }
  let qty = isNaN(parseInt(item.qty)) == false ? item.qty : pcbInDb.qty || 1
  let PcbFillInPrice = isNaN(parseFloat(item.content.PcbFillInPrice)) == false ? item.content.PcbFillInPrice : cost
  logger.info(`
    modified.qty: ${item.qty}, modified.PcbFillInPrice: ${item.content.PcbFillInPrice}
    db.qty: ${pcbInDb.qty}, db.PcbFillInPrice: ${pcbInDb.content.PcbFillInPrice}
    qty: ${qty}, PcbFillInPrice: ${PcbFillInPrice}
  `)
  return parseFloat(PcbFillInPrice)
  //  return parseInt(qty) * parseFloat(PcbFillInPrice)
}
class pcb {
  static async getEedmPcbBomItemListByPcbTemp(){
    const sql = squel.select()
      .field('*')
      .from('wiprocurement.eedm_pcb_temp')
      .where('update_time is NULL')
    try {
      const result = await systemDB.Query(sql.toParam())
      return result.rows
    } catch (error) {
      logger.error('[pcbModule][gePcbBomItemListByPcbTemp] Error : ', error)
      throw new Error(error)
    }
  }
  static async updateEedmPcbTempUploadTime(client, tempIdList){
    const sql = squel.update()
      .table('wiprocurement.eedm_pcb_temp')
      .set('update_time = NOW()')
      .where('update_time is NULL')
      .where('id in ?', tempIdList)
    try {
      const result = await client.query(sql.toParam())
      return result.rows
    } catch (error) {
      logger.error('[pcbModule][gePcbBomItemListByPcbTemp] Error : ', error)
      throw new Error(error)
    }
  }
  static async schemaFilter(data) {
    return schemaFilter('pcb', data)
  }
  static async getPcbInfo(info) {
    let sql = squel.select().field('*').from('pcb').where('id = ?', info.id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : false
  }
  static async getPcbByQuery(info) {
    return await getPcbWithQuery(info)
  }
  static async getEdmVersionInfo(id) {
    let sql = squel.select().field('*').from('edm_version').where('id = ?', id)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : false
  }
  static async updateMainProjectVersioin(info) {
    let sql = squel.update()
      .table('eebom_projects')
      .where('id = ?', info.id)
      .set('version', parseFloat(info.version) + 0.5)
      .set('is_next_stage', true)
    await systemDB.Query(sql.toParam())
  }
  static async updateEdmVersion(info) {
    let sql = squel.update().table('edm_version').where('id = ?', info.id).setFields(info).returning('id')
    const result = await systemDB.Query(sql.toParam())
    if(result.rowCount > 0) {
      logger.warn(` update edm_version ${result.rowCount} records`)
    } else {
      logger.warn('update edm_version 0 records')
    }
  }
  static async createPCBs(client, data) {
    const payload = await pcb.schemaFilter(data)
    logger.info('model create:', payload)
    let sql = squel.insert()
      .into('wiprocurement.pcb')
      .setFieldsRows(payload)
      .returning('*')
    let result = await client.query(sql.toParam())
    return result.rowCount > 0 ? result.rows : null
  }
  static async updatePCBs(client, data) {
    const payload = await pcb.schemaFilter(data)
    logger.info('model update:', payload)
    let result = await forPromiseAll(payload, async (item) => {
      let pcbQuery = await getPcbWithQuery({ id:item.id })
      if (pcbQuery.rowCount === 0) {
        return null
      }
      let sql = squel.update()
        .table('wiprocurement.pcb')
        .where('id = ?', item.id)
      Object.entries(item).forEach((pair) => {
        if (pair[0] !== 'id') {
          if (typeof (pair[1]) === 'object') {
            pair[1] =  pair[1] == null ? null : JSON.stringify(pair[1])
            sql.set(pair[0], pair[1])
          } else {
            sql.set(pair[0], pair[1])
          }
        }
      })

      sql.set('update_time', moment().utc().format())
        .returning('*')
      let res = await client.query(sql.toParam())
      return res.rowCount > 0 ? res.rows[0] : null
    }, 10)
    return result
  }
  static async getPCB(edm_version_id, column, keyword, filterCountField) {
    let sql = squel.select()
      .field('*')
      .from('view_pcb')
    if(column && keyword){
      sql.where(
        squel.expr().and('edm_version_id = ?', edm_version_id)
          .and(`${column} = ?`, keyword)
      )
    }else {
      sql.where('edm_version_id = ?', edm_version_id)
    }
    if (filterCountField) {
      sql.where('is_count')
    }
    let res = await systemDB.Query(sql.toParam())
    return res.rows
  }
  static async deletePCB(ids) {
    let sql = squel.delete()
      .from('pcb')
      .where('id in ?', ids)
    await systemDB.Query(sql.toParam())
    return 'delete success'
  }
  static async getType2() {
    let sql = squel.select().field('type2').distinct().from('ee_assignment').where('type1 = ?', 'PCB')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async insertBasePrice(client, data) {
    let sql = squel.insert()
      .onConflict()
      .into('pcb_base_price')
      .setFieldsRows(data)
    await client.query(sql.toParam())
    return 'import success'
  }
  static async insertPCBSpec( pcbSpec) {
    let sql = squel.insert()
      .into('wiprocurement.pcb_typeii_spec01')
      .setFields(pcbSpec)
      .returning('uuid')
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0].uuid : null
  }
  static async truncatePCBSpec(type) {
    let sql = squel.delete().from('wiprocurement.pcb_typeii_spec01').where('insert_type = ?', type)
    await systemDB.Query(sql.toParam())
    return true
  }
  static async insertUSDAdderRules(client, reference) {
    let sql = squel.insert()
      .into('wiprocurement.pcb_formula_usd_rules')
      .setFieldsRows(reference)
    await client.query(sql.toParam())
    return true
  }
  static async insertAdderRules(client, reference) {
    let sql = squel.insert()
      .into('wiprocurement.pcb_formula_adder_rules')
      .setFieldsRows(reference)
    await client.query(sql.toParam())
    return true
  }
  static async insertPCBManufacturerUsd(client, data) {
    let sql = squel.insert()
      .into('wiprocurement.pcb_manufacturer_usd')
      .setFieldsRows(data)
    await client.query(sql.toParam())
    return true
  }
  static async insertPCBManufacturerAdder(client, data) {
    let sql = squel.insert()
      .into('wiprocurement.pcb_manufacturer_adder')
      .setFieldsRows(data)
    await client.query(sql.toParam())
    return true
  }
  static async isGeneralAdderExist() {
    let sql = squel.select().field('*') .from('wiprocurement.pcb_typeii_spec01').where('insert_type = ?', 'general').limit(1)
    let  result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }
  static async isUSDAdderExist() {
    let sql = squel.select().field('*') .from('wiprocurement.pcb_typeii_spec01').where('insert_type = ?', 'usd').limit(1)
    let  result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }
  static async getBasePrice() {
    let sql = squel.select().field('*') .from('wiprocurement.pcb_base_price').limit(1)
    let  result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? true : false
  }
  static async truncateBasePrice() {
    let sql = squel.delete().from('wiprocurement.pcb_base_price')
    await systemDB.Query(sql.toParam())
    return true
  }

  static async getPcbAdderRules(type2, manufacturers, spec01) {
    let sql = squel.select()
      .field('pts.uuid', 'uuid')
      .field('pts.spec01', 'spec01')
      .field('pfar.id', 'ruleId')
      .field('pfar.reference', 'reference')
      .field('pfar.spec', 'spec')
      .field('pfar.reference_value', 'referenceValue')
      .field('pma.id', 'manufacturerId')
      .field('pma.percentage', 'percentage')
      .field('upper(pma.manufacturer)', 'manufacturer')
      .from('pcb_typeii_spec01', 'pts')
      .left_join('pcb_manufacturer_adder', 'pma', 'pma.pcb_typeii_spec01_uuid = pts.uuid')
      .left_join('pcb_formula_adder_rules', 'pfar', 'pfar.pcb_typeii_spec01_uuid = pts.uuid')
      .where('pts.typeii like ?', `%${type2}%`)
      .where('upper(pma.manufacturer) in ?', manufacturers)
      .where('spec01 like ?', `%${spec01}%`)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPcbUsdRules(type2, manufacturers, spec01) {
    let sql = squel.select()
      .field('pts.uuid', 'uuid')
      .field('pts.spec01', 'spec01')
      .field('pfur.id', 'ruleId')
      .field('pfur.reference', 'reference')
      .field('pfur.spec', 'spec')
      .field('pfur.reference_value', 'referenceValue')
      .field('pmu.id', 'manufacturerId')
      .field('pmu.price', 'price')
      .field('upper(pmu.manufacturer)', 'manufacturer')
      .from('pcb_typeii_spec01', 'pts')
      .left_join('pcb_manufacturer_usd', 'pmu', 'pmu.pcb_typeii_spec01_uuid = pts.uuid')
      .left_join('pcb_formula_usd_rules', 'pfur', 'pfur.pcb_typeii_spec01_uuid = pts.uuid')
      .where('pts.typeii like ?', `%${type2}%`)
      .where('upper(pmu.manufacturer) in ?', manufacturers)
      .where('spec01 like ?', `%${spec01}%`)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPcbBasePrice(type2, manufacturers, spec01, spec02, spec03) {
    let sql = squel.select()
      .field('id')
      .field('typeii')
      .field('upper(manufacturer)', 'manufacturer')
      .field('base_price', 'basePrice')
      .from('pcb_base_price')
      .where('typeii = ?', type2)
      .where('upper(manufacturer) in ?', manufacturers)
      .where('spec01 like ?', `%${spec01}%`)
      .where('spec02 = ?', `${spec02}`)
      .where('spec03 = ?', spec03)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getPCBSpecByWistronPN(wistron_pn) {
    let sql = squel.select().field(`item.item,
    type1.type1name AS typei,
    type2.type2name AS typeii,
    MFRNR as manufacturer,
    spec.spec1 as spec01, spec.spec2 as spec02, spec.spec3 as spec03, spec.spec4 as spec04, spec.spec5 as spec05,
    spec.spec6 as spec06, spec.spec7 as spec07, spec.spec8 as spec08, spec.spec9 as spec09, spec.spec10,
    spec.spec11, spec.spec12, spec.spec13, spec.spec14, spec.spec15, spec.spec16, spec.spec17, spec.spec18, spec.spec19, spec.spec20,
    spec.spec21, spec.spec22, spec.spec23, spec.spec24, spec.spec25, spec.spec26, spec.spec27, spec.spec28, spec.spec29, spec.spec30`).distinct()
      .from('epur_itemtype', 'item')
      .left_join('epur_itemspec', 'spec', 'item.item = spec.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('eina', 'eina', 'eina.bmatn = item.item')
      .join('a018_konp', 'a018', 'eina.matnr = a018.matnr')
      .join('epur_vgroup', 'vgroup', 'A018.LIFNR = vgroup.vcode')
      .where('item.item = ?', wistron_pn)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getSupplyType(wistron_pn, plant) {
    let sql = squel.select().field('supplytype.supply_type', 'supply_type')
      .from('marc', 'marc')
      .left_join('supplytypemapping', 'supplytype', 'supplytype.key = marc.zzbsar')
      .where('marc.matnr = ?', wistron_pn)
      .where('marc.werks = ? ', plant)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0].supply_type : null
  }

  static async getDescriptions(wistron_pns) {
    let sql = squel.select()
      .field('maktx', 'description')
      .field('matnr', 'wistron_pn')
      .from('mara', 'mara')
      .where('matnr in ?', wistron_pns)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async copyPCBsByEdmVersionID(client, fromEdmVId, toEdmVId) {
    let fields = ['edm_version_id',
      'cost',
      'is_count',
      'type',
      'qty',
      'content',
      'update_time',
      'create_time',
      'part_number',
      'supply_type',
      'stage_no',
      'sourcer_cost',
      'board',
      'module',
    ]
    let selectQuery = squel.select()
      .from('wiprocurement.pcb')
      .where(`edm_version_id = ?`, fromEdmVId)

    fields.forEach(f=>{
      if (f=='edm_version_id'){
        selectQuery.field(`'${toEdmVId}'`)
      }
      else {
        selectQuery.field(f)
      }
    })


    let sql = squel.insert()
      .into('wiprocurement.pcb')
      .fromQuery(
        fields,
        selectQuery
      ).returning('id')
    let result =  await client.query(sql.toParam())
    return result.rowCount
  }
  static async getPcbPcbTypeDateFromProject(edmVId) {
    let sql = squel.select()
      .field('*')
      .from('eebom_projects', 'eps')
      .join('edm_version', 'ev', 'eps.id = ev.eebom_project_id')
      .where('ev.id = ?', edmVId)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : {}
  }
  static async getPdmpartsByPns(partNumbers) {
    let sql = squel.select()
      .field('*')
      .from('pdmparts')
      .where('partnumber in ?', partNumbers)
    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async getPCBStageByPartNumber(partNumber) {

    let sql = squel.select()
      .distinct()
      .field('pcb_version', 'stage')
      .field('pcb_no', 'pcbno')
      .from('plm_pcbform')
      .where('pcb_partnumber = ?', partNumber)

    let result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows[0] : []
  }
}

module.exports = {
  pcb,
  getCost,
}

