let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const schedule = require('../cleansheetDatabase/plScheduleDate')
const moment = require('moment')
const _ = require('lodash')
const uuidv1 = require('uuid/v1')
const { asyncForEach } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Common model')
const CacheHelper = require('../../utils/helper/cacheHelper')
const cacheHelper = new CacheHelper()

const generalScheduleDateSQL = (formula_type_id, product_type = '1') => {
  let subSQL = squel.select()
    .field('sd1.id')
    .from('formula.schedule_date', 'sd1')
    .from('formula.formula_type', 'ft1')
    .where('sd1.formula_type_id = ft1.id')
    .where(`ft1.name = '${formula_type_id}'`)
    .order('sd1.activate_date', false)
    .limit(3)

  if(product_type) {
    subSQL.where('sd1.product_type_id = ?', product_type)
  } else {
    subSQL.where('sd1.product_type_id is null')
  }

  return subSQL
}

const getPartCate2Id = (categoryName) => {
  let partCategory2SQL = squel.select()
    .field('id')
    .from('formula.part_category_2')
    .where('lower(category_name) = lower(?)', categoryName)

  return partCategory2SQL
}

/**
   * get PartCate2Id by category2Name
   * @param {String} category2Name
   * @returns {UUid} category2 id
   */
const _getPartCate2IdByName = async (category2Name) => {
  const sql = getPartCate2Id(category2Name)
  const res = await systemDB.Query(sql.toParam())
  if(_.isUndefined(res.rows[0])){
    throw new Error(`[database][common][getPartCate2IdByName] can not find category2Id by category2Name :${category2Name}`)
  }
  return res.rows[0].id
}
class Common {

  static async getScheduleDateForAdd(formulaType) {
    let sql = squel.select()
      .field('sd1.id')
      .field('sd1.activate_date')
      .from('formula.schedule_date', 'sd1')
      .from('formula.formula_type', 'ft1')
      .where('sd1.formula_type_id = ft1.id')
      .where('ft1.name = ?', formulaType)
      .order('sd1.activate_date', false)
      .limit(2)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async addParameterValue(client, materialId, value, scheduleList, sourceTable = 'material') {

    let insertData = scheduleList.map((schedule)=>{
      return {
        parameter_id : materialId,
        value: value,
        value_type: 'number',
        activate_date_id: schedule,
        source_table: sourceTable,
        create_time: 'now()',
      }
    })

    // need insert
    let sql = squel.insert()
      .into('formula.parameter_value')
      .setFieldsRows(insertData)

    await client.query(sql.toParam())
  }
  static async getPartCategoryByType(type) {

    let sql = squel.select()
      .field('pc1.id ', 'pc1_id')
      .field('pc1.category_name', 'pc1_name')
      .field('pc2.id ', 'pc2_id')
      .field('pc2.category_name', 'pc2_name')
      .field('ft.name')
      .from('formula.part_category_1 pc1')
      .join('formula.part_category_2', 'pc2', 'pc2.part_category_1_id = pc1.id')
      .join('formula.part_category_formula_type', 'pcft', 'pc2.id = pcft.part_category_2_id')
      .join('formula.formula_type', 'ft', 'pcft.formula_type_id = ft.id')
      .where('pc1.disable_time is NULL and pc2.disable_time is NULL')

    if (type != null) {
      sql.where('ft.name = ? ', type)
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  /**
   * 修改 parameter_value value, where 條件為 nextID與 parameter_id 對應到 table 的id
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {*} nextId 要修改的 date id
   * @param {*} items 修改的資料 ex: [{ id: '1', next: '500' }], [{ thicknessId: '1', next: '500' }]
   * @param {*} itemKey 修改資料對應id的Key, 第一個ex的Key: id,  第一個ex的Key: thicknessId
   */
  static async modifyPrice(client, nextId, items, itemKey) {
    try {
      await asyncForEach(items, async (item) => {
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item.next)
          // .set('update_time', moment().utc().format())
          .where('activate_date_id = ? and parameter_id = ?', nextId, item[itemKey])
        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyPrice', err)
      throw err
    }
  }

  /**
   * for commonParameter 修改
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {*} nextId 要修改的 date id
   * @param {*} items 修改的資料 ex: [{ id: '1', next: '500' }], [{ thicknessId: '1', next: '500' }]
   * @param {*} itemKey 修改資料對應id的Key, 第一個ex的Key: id,  第一個ex的Key: thicknessId
   */
  static async modifyCommonParameterPrice(client, nextId, items, itemKey) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value pv')
          .set(`value = CASE
            WHEN cp.unit = '%' THEN round(${item.next}::numeric/100::numeric, 8)
            ELSE ${item.next}
            END`)
          .from('formula.common_parameter cp')
          .where('cp.id = pv.parameter_id')
          .where('parameter_id = ?', item[itemKey])
          .where('activate_date_id = ?', nextId)

        await client.query(sql.toString())
      })
    } catch (err) {
      logger.error('modifyCommonParameterPrice', err)
      throw err
    }
  }

  /**
   *
   * 修改 parameter_value value, where 條件為 nextID與 parameter_id 對應到 table 的某一個欄位, 並非用table的 id
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {Number} nextId 要修改的 date id
   * @param {Array} items 修改的資料 ex: [{ id: '1', price: '500', lossRate: '50' }], [{ thicknessId: '1', next: '50' }]
   * @param {String} itemKey 修改資料對應id的Key, 第一個ex的Key: id,  第一個ex的Key: thicknessId
   * @param {String} valueKey items object 要更新的value key, 第一個ex的Key: price,  第一個ex的Key: next
   * @param {String} innerTable value的 table name
   * @param {String} tableKey value的 table哪個欄位 對應到 parameter_id
   */
  static async modifyPriceByColumn(client, nextId, items, itemKey, valueKey, innerTable, tableKey) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from(`formula.${innerTable} it`)
          .where(`it.${tableKey} = parameter_id`)
          .where('activate_date_id = ? and it.id = ?', nextId, item[itemKey])

        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyPriceByColumn', err)
      throw err
    }
  }
  /**
   *
   * 修改 parameter_value value, where 條件 只有 parameter_id 對應到 table 的某一個欄位,
   * 並無對應到 schedule_date id, 會將這個parameter_id所有日期的 value更新
   *
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {Array} items 修改的資料 ex: [{ id: '1', price: '500', lossRate: '50' }], [{ thicknessId: '1', next: '50' }]
   * @param {String} itemKey 修改資料對應id的Key, 第一個ex的Key: id,  第一個ex的Key: thicknessId
   * @param {String} valueKey items object 要更新的value key, 第一個ex的Key: price,  第一個ex的Key: next
   * @param {String} innerTable value的 table name
   * @param {String} tableKey value的 table哪個欄位 對應到 parameter_id
   */
  static async modifyNumberByColumnId(client, items, itemKey, valueKey, innerTable, tableKey) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table('formula.parameter_value')
          .set('value', item[valueKey])
          .from(`formula.${innerTable} it`)
          .where(`it.${tableKey} = parameter_id`)
          .where('it.id = ?', item[itemKey])

        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyNumberByColumnId', err)
      throw err
    }
  }

  /**
   *
   * 修改 table 中的 字串, 用於 remark..等
   *
   * @param {*} client query clien, 在service page 需做 client.commit()
   * @param {Array}} items 修改的資料 ex: [{ id: '1', remark: '10T remark' }]
   * @param {String} table 修改的 value table name
   * @param {String} tableKey table 哪個欄位需要更新
   * @param {String} valueKey items的 哪個key 是要更新的值
   */
  static async modifyStringById(client, items, table, tableKey, valueKey) {
    try {
      await asyncForEach(items, async (item) => {
        // need update
        let sql = squel.update()
          .table(`formula.${table} tb`)
          .set(tableKey, item[valueKey])
          .where('tb.id = ?', item.id)

        // console.log(sql.toString())
        await client.query(sql.toParam())
      })
    } catch (err) {
      logger.error('modifyStringById', err)
      throw err
    }
  }

  static async isActiveDateExist(formulaType, nextDate, productTypeId) {
    let subSQL = squel.select()
      .field('id')
      .from('formula.formula_type ft')
      .where('ft."name" = ?', formulaType)

    let sql = squel.select('*')
      .from('formula.schedule_date sd')
      .where('sd.activate_date = ?', nextDate)
      .where('sd.formula_type_id in ?', subSQL)

    if(productTypeId) {
      sql.where('sd.product_type_id = ?', productTypeId)
    } else {
      sql.where('sd.product_type_id is null')
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  static async insertActivateDate(formulaType, nextDate, productTypeId) {
    let productTypeSql = squel.select()
      .field('replace(trim(lower(type_name)), \' \', \'_\')', 'type_name')
      .from('formula.product_type')
      .where('id = ?', productTypeId)


    let productTypeSqlRes = await systemDB.Query(productTypeSql.toParam())
    let productTypeName = productTypeSqlRes.rowCount > 0 ? productTypeSqlRes.rows[0].type_name : 'common'


    let formulaIdSql = squel.select()
      .field('id')
      .from('formula.formula_type')
      .where('name = ?', formulaType)

    let nextDateisExistSql = squel.select(1)
      .from('formula.schedule_date sd')
      .where('activate_date = ?', nextDate)
      .where(`formula_type_id = (${formulaIdSql.toString()})`)

    if(productTypeId) {
      nextDateisExistSql.where('sd.product_type_id = ?', productTypeId)
    } else {
      nextDateisExistSql.where('sd.product_type_id is null')
    }

    let sql = `INSERT INTO formula.schedule_date
      ("name", formula_type_id, activate_date, create_time, product_type_id)
      SELECT '${formulaType}_${productTypeName}', (${formulaIdSql.toString()}), '${nextDate}', now(), ${productTypeId}
        WHERE NOT EXISTS (${nextDateisExistSql.toString()})
      RETURNING id, formula_type_id, to_char(activate_date, \'YYYY-MM-DD\') activate_date`

    const result = await systemDB.Query(sql.toString())
    return result.rowCount > 0 ? result.rows : []
  }

  static async copyParameterByFormulaType(formulaType, nextDate, copyDate) {
    let nextDateId = nextDate[0].id
    let sql = `insert into formula.parameter_value
              (id, parameter_id, value, value_type, source_table, create_time, activate_date_id)
              select nextval('formula.parameter_value_id_seq'), pv.parameter_id, pv.value, pv.value_type, pv.source_table, now() as create_time, ${nextDateId} as activate_date_id
              FROM formula.parameter_value pv	WHERE activate_date_id = ${copyDate}`
    const result = await systemDB.Query(sql.toString())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getCountByformulaType(formulaType, productTypeId) {
    let sql = squel.select()
      .field('sd1.id, to_char(sd1.activate_date, \'YYYY/MM/DD\') activate_date')
      .from('formula.schedule_date', 'sd1')
      .from('formula.formula_type', 'ft1')
      .where('sd1.formula_type_id = ft1.id')
      .where(`ft1."name" = '${formulaType}'`)
      .order('sd1.activate_date', false)
      .limit(3)

    if(productTypeId) {
      sql.where('sd1.product_type_id = ?', productTypeId)
    } else {
      sql.where('sd1.product_type_id is null')
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async updateDateByCopyDate(formulaType, nextDate, copyDateId) {
    let sql = squel.update()
      .table('formula.schedule_date')
      .set('activate_date', nextDate)
      .where('id = ?', copyDateId)
      .where(`formula_type_id in (select ft1.id from formula.formula_type AS ft1
        where ft1."name" = '${formulaType}')`)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }
  static async getNextDateByformulaType(formulaType, productTypeId) {
    let sql = squel.select()
      .field('sd1.id, to_char(sd1.activate_date, \'YYYY/MM/DD\') activate_date')
      .from('formula.schedule_date', 'sd1')
      .from('formula.formula_type', 'ft1')
      .where('sd1.formula_type_id = ft1.id')
      .where('ft1."name" = ?', formulaType)
      .where('sd1.product_type_id = ?', productTypeId)
      .order('sd1.activate_date', false)
      .limit(3)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  }

  /**
   * 找dropdown中 item 的path
   * @param {*} materialName item_name
   * @param {*} field ex: material_spec, material, part_cate_2
   */
  static async getDropDownPath(materialName, field) {

    let sql = squel.select()
      .field('path')
      .from('drop_down_item')
      .where('field_name = ? ', field)
      .where('item_name = ?', materialName)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0].path : null
  }

  /**
 * insert New path to dropdown
 * @param {*} client
 * @param {*} field ex: material_spec, material, part_cate_2
 * @param {*} itemName FR_PC_NEW
 * @param {*} path ex: 'HOUSING.PLAST_NB.FR_PC_NEW'
 */
  static async insertDropDown(client, field, itemName, path) {
    let sql = squel.insert()
      .into('drop_down_item')
      // .from('formula.part_category_2 pc2')
      .set('id', uuidv1())
      .set('item_name', itemName)
      .set('path', path)
      .set('field_name', field)
      .set('layout_name', 'bom_item')
      .set('create_time', 'now()')

    // console.log(sql.toString())
    await client.query(sql.toString())
  }

  /**
   * 將對應的路徑 disable time 設為 null
   * @param {*} client
   * @param {*} field ex: material_spec, material, part_cate_2
   * @param {*} itemName FR_PC_NEW
   * @param {*} path ex: 'HOUSING.PLAST_NB.FR_PC_NEW'
   */
  static async updateDropDown(client, field, itemName, path) {

    let sql = squel.update()
      .table('drop_down_item')
      .set('disable_time', null)
      .where('path = ?', path)
      .where('item_name = ?', itemName)
      .where('field_name = ?', field)
      .where('layout_name = ?', 'bom_item')

    // console.log(sql.toString())
    await client.query(sql.toString())
  }

  static async updateDropDownDisable(client, field, itemName, updatePath) {
    let sql = squel.update()
      .table('drop_down_item')
      .set('disable_time', moment().utc().format())
      .where('item_name = ?', itemName)
      .where('field_name = ?', field)
      .where('layout_name = ?', 'bom_item')
      .where('path = ?', updatePath)

    // console.log(sql.toString())
    await client.query(sql.toParam())
  }

  /**
   * 新增 parameter_value value, where 條件為 nextID與 parameter_id 對應到 table 的id
   * 若存在則修改
   * @param {*} client
   * @param {String} id
   * @param {Number} nextId
   * @param {*} next
   * @param {String} value_type
   * @param {String} source_table
   */
  static async insertPriceWithSourceName(client, id, nextId, next, value_type, source_table) {

    let sqlInsert = squel.insert()
      .into('formula.parameter_value')
      .set('parameter_id', id)
      .set('activate_date_id', nextId)
      .set('value', next)
      .set('value_type', value_type)
      .set('source_table', source_table)
      .set('create_time', 'now()')
    let upsert = ' ON CONFLICT ON CONSTRAINT parameter_value_pk DO UPDATE '
    upsert += `SET value = ${next}`
    await client.query(sqlInsert.toString() + upsert)
  }

  static async fetchParameterByType(type, productTypeId = 1) {
    let subSQL = generalScheduleDateSQL(type, productTypeId)

    let sql = squel.select()
      .field('ft.name')
      .field('cp.id', 'common_parameter_id')
      .field('cp.label_name')
      .field('cp.label')
      .field('cp.unit')
      .field('cp.part_type')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.common_parameter cp')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .from('formula.formula_type ft')
      .where('ft.name = ?', type)
      .where('ft.id = cp.formula_type_id')
      .where('cp.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('cp.disable_time is null')
      .where('sd.id in ?', subSQL)

    if(productTypeId) {
      sql.where('cp.product_type_id = ?', productTypeId)
    }

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async fetchParameter(formulaName, partType, label, productTypeId) {
    let scheduleDateId = await schedule.getScheduleDate(formulaName, productTypeId)

    let sql = squel.select()
      .field('ft.name')
      .field('cp.id', 'common_parameter_id')
      .field('cp.label_name')
      .field('cp.label')
      .field('cp.unit')
      .field('cp.part_type')
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id', 'activation_date_id')
      .from('formula.common_parameter cp')
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .from('formula.formula_type ft')
      .where('ft.name = ?', formulaName)
      .where('cp.part_type = ?', partType)
      .where('cp.label = ?', label)
      .where('ft.id = cp.formula_type_id')
      .where('cp.id = pv.parameter_id')
      .where('pv.activate_date_id = sd.id')
      .where('cp.disable_time is null')
      .where('sd.id = ?', scheduleDateId.schdeule_id)
      .where('cp.product_type_id = ?', productTypeId)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : []
  }

  /**
   * 查詢 formula 資料只需要一張 table 時，自動查詢對應的 parameter_value
   * @param {String} tableName
   * @param {*} fields EX:['id', 'name', ['disable_time', 'disableTime']]
   * @param {String} parameterFieldId
   * @param {String} formulaType
   * @param {String} productTypeId default: 1
   *
   */
  static async fetchSingleTableParameterValues(tableName, fields, parameterFieldId, formulaType, productTypeId = 1) {
    let subSQL = generalScheduleDateSQL(formulaType, productTypeId)
    let sql = squel.select()
    fields.forEach((name) => {
      if(Array.isArray(name)) {
        sql = sql.field(`tab.${name[0]}`, `"${name[1]}"`)
      } else {
        sql = sql.field(`tab.${name}`)
      }
    })
    sql = sql
      .field('pv.value')
      .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
      .field('sd.id activate_date_id')
      .from(`formula.${tableName} tab`)
      .from('formula.schedule_date sd')
      .from('formula.parameter_value pv')
      .where('sd.id = pv.activate_date_id')
      .where(`tab.${parameterFieldId} = pv.parameter_id`)
      .where('pv.activate_date_id in ?', subSQL)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  /**
   * 查詢當一張table有多個parameter_id 自動對應多個parameter_value
   * @param {String} formulaType
   * @param {String} tableName  parameter_id來源的table名稱
   * @param {Array} fields EX:['id', 'name', ['disable_time', 'disableTime']]
   * @param {Array} valueKeyList parameter_id名稱與 EX: ['unit_price', 'process_time', 'usage_amount']
   */
  static async fetchSingleTableMultiParameterValues(formulaType, tableName, fields, valueKeyList){
    let subSQL = generalScheduleDateSQL(formulaType)
    const filterColumList = []
    let paramTableList = []
    let sql = squel.select()
      .distinct()
    fields.forEach((name) => {
      if(Array.isArray(name)) {
        sql = sql.field(`tab.${name[0]}`, `"${name[1]}"`)
      } else {
        sql = sql.field(`tab.${name}`)
      }
    })
    valueKeyList.forEach((valueKey, index) => {
      const paramTableName = `pvsd${index}`
      paramTableList.push(paramTableName)
      sql = sql.field(`${paramTableName}.parameter_id`, `"${valueKey}Id"`)
      sql = sql.field(`${paramTableName}.value`, `"${valueKey}"`)
    })
    sql = sql.field(`${paramTableList[0]}.activate_date`)
      .field(`${paramTableList[0]}.activate_date_id`)
      .from(`formula.${tableName} tab`)
    paramTableList.forEach((paramTable, index) => {
      const subParameterSQL = squel.select()
        .field('pv.*')
        .field('to_char(sd.activate_date, \'YYYY-MM-DD\')', 'activate_date')
        .from('formula.parameter_value', 'pv')
        .from('formula.schedule_date', 'sd')
        .where('sd.id = pv.activate_date_id')
        .where('sd.id in ?', subSQL)
      sql = sql.left_join(subParameterSQL, paramTable, `tab.${valueKeyList[index]} = ${paramTable}.parameter_id`)
      if(index > 0){
        filterColumList.push(`${paramTable}.activate_date_id`)
      }
    })
    for(const filterColum of filterColumList){
      sql = sql.where(`${paramTableList[0]}.activate_date_id = ${filterColum}`)
    }
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }
  /**
   *
   * @param {Object} client Database Client
   * @param {Number} nextId
   * @param {Array} items 欲更新的資訊清單
   * @param {String} tableName parameter_id來源的talbeName
   * @param {Object} parameterInfoList 以key-value的方式，key為parameter_id欄位名稱，而value則為對應items的value名稱
EX:
 items = [{'id':1, 'processTime':5.6}]
{
  'process_time':'processTime'
}
此輸入將會去取得table中欄位名稱為process_time的parameterId，並將items的processTime set到parameter_value表的value上
   */
  static async modifySingleTableMultiParameterValue(client, nextId, items, tableName, parameterInfoList) {
    try {
      await Promise.all(items.map(async (item) =>{
        let getPvIdSql = squel.select()
        const parameterIdKeyList =  Object.keys(parameterInfoList)
        parameterIdKeyList.forEach((parameterIdName) => {
          getPvIdSql = getPvIdSql.field(`tab.${parameterIdName}`)
        })
        getPvIdSql = getPvIdSql.from(`formula.${tableName}`, 'tab')
          .where('tab.id = ?', item.id)
        const getParameterIdListResult = await systemDB.Query(getPvIdSql.toParam())
        if(getParameterIdListResult.rowCount > 0) {
          const parameterIdList = getParameterIdListResult.rows[0]
          for(const pvIdKey of parameterIdKeyList){
            const inputValueKey = parameterInfoList[pvIdKey]
            if(!parameterIdList.hasOwnProperty(pvIdKey) ||
               !item.hasOwnProperty(inputValueKey)
            ){
              continue
            }
            const updateSql = squel.update()
              .table('formula.parameter_value')
              .set('value', item[inputValueKey])
              .where('activate_date_id = ? and parameter_id = ?', nextId, parameterIdList[pvIdKey])
            await client.query(updateSql.toParam())
          }
        }
      }))
    } catch (err) {
      logger.error('modifySingleTableMultiParameterValue', err)
      throw err
    }
  }
  /**
   * get PartCate2Id by category2Name
   * @param {String} category2Name
   * @returns {UUid} category2 id
   */
  static async getPartCate2IdByName(category2Name){
    try {
      const partCategory2id = await cacheHelper.getCacheAsync(category2Name, _getPartCate2IdByName, category2Name)
      return partCategory2id
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = {
  Common,
  generalScheduleDateSQL,
  getPartCate2Id,
}
