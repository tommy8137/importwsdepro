/* eslint-disable no-magic-numbers */
let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const { asyncForEach } = require('../../helpers/utils')
const { suggestionCostType } = require('../../../config.js')
const _ = require('lodash')
const moment = require('moment')
const UUID = require('uuid/v4')
const schemaFilter = require('../getSchemaColumns')
const common = require('../common/common.js')

const getProductTypeIdSQL = (productType) =>{
  let sql = squel.select()
      .field('id')
      .from('formula.product_type')
      .where('type_name = ?', productType)
  return sql
}

/**
 * 依據splitNum將陣列切塊
 * @param {Array} dataArray 要被分切的陣列
 * @param {Num} splitNum 要分切的數量
 */
const splitData = (dataArray, splitNum = 100) =>{
  const arrayLength = dataArray.length
  const arrayPartNum = Math.ceil(arrayLength / splitNum)
  let dataArrayList = []
  for(let i = 0; i < arrayPartNum; i++){
    dataArrayList.push([])
  }
  for(let i = 0; i < arrayLength; i++){
    const partIndex = Math.floor(i / splitNum)
    dataArrayList[partIndex].push(dataArray[i])
  }
  return dataArrayList
}

const getLatestVersionID = async (Bid) => {
  let sql = squel.select()
    .field('id')
    .from('bom_stage_version')
    .where('bom_id = ?', Bid)
    .order('create_time', false)
    .limit(1)

  let res = await systemDB.Query(sql.toParam())
  if (res.rowCount > 0)
    return res.rows[0].id
  else
    return null
}

module.exports = {
  getLastVersionById: async (bomId) => {
    let sql = squel.select()
      .field('id')
      .field('version_name')
      .from('wiprocurement.bom_stage_version')
      .where('bom_id = ?', bomId)
      .order('create_time', false)
    let result = await systemDB.Query(sql.toParam())
    return result.rows[0]
  },
  getVersionListById: async (bomId) => {
    let sql = squel.select()
      .field('id')
      .field('version_name')
      .from('wiprocurement.bom_stage_version')
      .where('bom_id = ?', bomId)
      .order('create_time', false)
    let result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getVersionDetail: async (versionId) => {
    let sql = squel.select()
      .field('bom_id')
      .field('version_name')
      .field('create_time')
      .from('wiprocurement.bom_stage_version')
      .where('id = ?', versionId)

    let result = await systemDB.Query(sql.toParam())
    return result.rows[0]
  },

  getMaxRefPN: async () => {
    let sql = squel.select()
      .field('rfq_pn')
      .from('bom_item')
      .where('rfq_pn IS NOT NULL')
      .order('rfq_pn', false)
      .limit(1)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  createBomItem: async (client, data) => {
    let insertData = await schemaFilter('bom_item', data)
    if (!insertData) {
      return null
    }
    let sql = squel.insert()
      .into('bom_item')
      .setFields(insertData)
      .returning('id')
      .toParam()

    const result = await client.query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },

  updateBomItem: async (client, itemId, data) => {
    let updatetData = await schemaFilter('bom_item', data)
    if (!updatetData) {
      return null
    }
    let sql = squel.update()
      .table('bom_item')
      .where('id = ?', itemId)
      .setFields(updatetData)
      .returning('id')
      .toParam()
    const result = await client.query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },

  // getDropDownItemByName('T0.25', { parts_ctgy_2: 'Acetate_Tape_of_Mylar_Sponge_Poron' })
  getDropDownItemByName: async (name, fieldName = null, data = { parts_ctgy_1: null, parts_ctgy_2: null, material_spec: null, material: null }, valuePath = null) => {
    let ctgySql = squel.select()
      .field('*')
      .from('drop_down_item')
      .where('TRIM(upper(item_name)) =  ?', name)
    // .where(`TRIM(upper(item_name)) like '%${name}%'`)
    if (fieldName) ctgySql.where('field_name = ?', fieldName)
    const result = await systemDB.Query(ctgySql.toParam())
    if (result.rowCount == 0) {
      return null
    } else if (result.rowCount == 1) {
      return result.rows[0]
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        let path = result.rows[i].path.split('.')
        path.splice(-1, 1)
        let subpath = path.join('.')
        if (valuePath) {
          if (data[result.rows[i].field_name] === result.rows[i].item_name.toUpperCase() && subpath == valuePath) {
            return result.rows[i]
          }
        }

        // let sql = squel.select()
        //   .field('*')
        //   .from('drop_down_item')
        //   .where('path =?', subpath)
        // let res = await systemDB.Query(sql.toParam())
        // let possibleItem = res.rows[0]
        // if (data[possibleItem['field_name']] == possibleItem.item_name.toUpperCase()) {
        //   return result.rows[i]
        // }
      }
      return null
    }

  },

  /* getDropDownVals: async (layoutName = 'bom_item') => {
    let sql = squel.select()
      .field('*')
      .from('drop_down_item')
      .where('layout_name = ?', layoutName)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },*/
  getDropDownVals: async () => {
    let sql = squel.select()
      .field('*')
      .from('formula.v_me_bom_materialspec_and_material_value')
      .where('part_cate1_disable_time is null')
      .where('part_cate2_disable_time is null')
      .where('material_spec_disable_time is null')
      .where('material_disable_time is null')
      .where('link_disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getItemByLevel: async (verId, level, isCompleteVersion = false) => {
    let sql = squel.select()
      .field('id')
      .field('part_name')
    if (isCompleteVersion) {
      sql.from('bom_item_complete_version')
    } else {
      sql.from('bom_item')
    }
    sql.where('level = ?', level)
      .where('version_id = ?', verId)
      .where('has_child = ?', true)
      .order('modified_time', false)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getItemById: async (id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item')
      .where('id = ?', id)
      .order('modified_time', false)
      
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },
  getItemByMultiId: async (id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item')
      .where('id in ?', id)
      .order('modified_time', false)
      
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : null
  },

  getItemsByVerId: async (client, id) => {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.bom_item')
      .where('version_id = ?', id)
      .toParam()
    
    const result = await client.query(sql)
    return result.rows
  },
  getItemsByVerIdNotTrans: async (id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item')
      .where('version_id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  checkDesigneeExist: async (id, bomId) => {
    let sql = squel.select()
      .field('*')
      .from('bom_designee')
      .where('id = ? and bom_project_id=?', id, bomId)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? true : false
  },

  getItemVersionByBomId: async (id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_stage_version')
      .where('bom_id = ?', id)
      .order('create_time', false)
      
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getDesigneeById: async (id) => {

    let sql = squel.select()
      .field('*')
      .from('bom_designee')
      .where('id = ? ', id)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },

  getColRules: async (used_by) => {
    let sql = squel.select()
      .field('def.col_name')
      .field('def.col_key')
      .field('dep.col_val')
      .field('dep.col_key', 'need_col_key')
      .from('col_definite', 'def')
      .where('def.used_by = ?', used_by)
      .join(squel
        .select()
        .field('*')
        .from('col_dependence')
        .join('col_definite', null, 'col_dependence.required_col_id = col_definite.id'),
      'dep',
      'def.id = dep.col_id')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },


  // moveItemTree: async (client, bom_id, oldPath, newParentPath) => {
  //   let path = oldPath.split('.')
  //   path.pop()
  //   let pathPrefix = path.join('.')
  //   let getSQL = squel.select()
  //     .field('*')
  //     .from('bom_item')
  //     .where('bom_id=?', bom_id)
  //     .where('start_with = ?', oldPath)
  //     .toParam()
  //   const getRes = await client.query(getSQL)
  //   let results = getRes.rows
  //   for (let i = 0; i < results.length; i++) {
  //     let updateObj = results[i]
  //     let newPath = updateObj.path.replace(pathPrefix, newParentPath)
  //     let updateSQL = squel.update()
  //       .table('bom_item')
  //       .where('id = ?', updateObj.id)
  //       .set('path', newPath)
  //       .toParam()
  //     await client.query(updateSQL)
  //   }
  //   return results.length
  // },
  checkBomProjectExist: async (Bid) => {
    let vid = await getLatestVersionID(Bid)

    let sql = squel.select()
      .field('Bom.id')
      .from('bom_projects', 'Bom')
      .where('id = ?', Bid)
      .limit(1)

    let res = await systemDB.Query(sql.toParam())

    if (res.rowCount == 0 || vid == null)
      return false
    else
      return true
  },
  getBomAssignList: async (Bid) => {

    let sql = squel.select()
      .field('id', '"bomDesigneeID"')
      .field('seq', 'order')
      .field('function_team_name', 'assign')
      .field('isfunctionteam', '"isFunctionTeam"')
      .field('Designee.user_id', '"employeeID"')
      .field('usertable.name_a', '"employeeName"')
      .from('bom_designee', 'Designee')
      .join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')
      .where('Designee.bom_project_id = ? ', Bid)

    const result = await systemDB.Query(sql.toParam())

    return result.rows
  },
  bomVersionActionPermission: async (bom, eventType, user) => {
    let Vid = await getLatestVersionID(bom)

    let sql = squel.select()
      .field('Bom.id')
      .from('bom_projects', 'Bom')
      .join('bom_stage_version', 'Stage', 'Stage.bom_id = Bom.id')
      .where('Bom.id = ? and Stage.id = ? ', bom, Vid)

    if (eventType == 'APPROVE')
      sql.where('approved_by = ? and Stage.version_name like ? ', user, '%.5')
    else
      sql.where('Stage.version_name like ? ', '%.7')

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  },
  bomItemsDesignee: async (user, assign) => {

    let sql = squel.select()
      .field('Designee.user_id')
      .from('bom_designee', 'Designee')
      .where('Designee.id = ? and Designee.user_id = ? ', assign, user)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount
  },
  bomPNameAndDesc: async (Bid) => {
    let sql = squel.select()
      .field('project_name')
      .field('sku_desc')
      .field('product_type')
      .field('site')
      .field('project_source')
      .field('source_version')
      .field('create_time')
      .field('project_code')
      .from('bom_projects')
      .where('id = ?', Bid)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getBomItemId: async (Vid) => {
    let sql = squel.select()
      .field('bi.id')
      .from('wiprocurement.bom_item', 'bi')
      .where('bi.version_id = ?', Vid)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getBomTable: async (Bid, assign) => {
    let Vid = await getLatestVersionID(Bid)
    let sql = squel.select()
      .field('Item.id')
      .field('customer_pn')
      .field('rfq_pn')
      .field('ref_part_num', 'reference_pn')
      .field('part_name')
      .field('image_id')
      .field('image.fpath', 'image_path')
      .field('level')
      .field('parent_level')
      .field('sub_leve', 'sub_level')
      .field('qty')
      .field('part_size_l')
      .field('part_size_w')
      .field('part_size_h')
      .field('part_size_m')
      .field('part_size_ef')
      .field('part_size_l2')
      .field('part_size_w2')
      .field('Item.parts_ctgy_1', 'parts_ctgy_1_id')
      .field('Item.parts_ctgy_2', 'parts_ctgy_2_id')
      .field('Item.material_spec', 'material_spec_id')
      .field('Item.material', 'material_id')
      .field('Item.odm_oem', 'odm_oem_id')
      // .field('PC1.item_name', 'parts_ctgy_1')
      // .field('PC2.item_name', 'parts_ctgy_2')
      // .field('BG.item_name', 'gb_assy_ctgy')
      // .field('FC.item_name', 'func_ctgy')
      // .field('ST.item_name', 'supply_type')
      // .field('material_spec.item_name', 'material_spec')
      // .field('material.item_name', 'material')
      // .field('odmoem.item_name', 'odm_oem')
      // .field('initAddDel.item_name', 'initaddmodidel')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('BG.gb_assy_ctgy_name', 'gb_assy_ctgy')
      .field('FC.func_ctgy_name', 'func_ctgy')
      .field('ST.supply_type_name', 'supply_type')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('odmoem.odm_oem_name', 'odm_oem')
      .field('initAddDel.operation_name', 'initaddmodidel')
      .field('thickness')
      .field('part_weight')
      .field('modified_time', 'update_time')
      .field('Item.source_cost')
      .field('Item.system_cost')
      .field('Item.spa_cost_material_remark')
      .field('Item.spa_cost')
      .field('Item.suggestion_cost_type', 'suggestion_cost_type')
      .field('partlist.partlist_value', 'partlistvalue')
      // .field('partlist.partlist_price', 'partlistprice')
      .field('partlist.image_value', 'partlistimage')
      .field('partlist.partlist_amount', 'partlistamount')
      .field('partlist.formate', 'partlistformate')
      .field('Item.extra', 'extra')
      .field('Item.sku0', 'sku0')
      .field('Item.sku1', 'sku1')
      .field('Item.sku2', 'sku2')
      .field('Item.sku3', 'sku3')
      .field('Item.sku4', 'sku4')
      .field('Item.sku5', 'sku5')
      .field('Item.last_price', 'last_price')
      .field('Item.part_number', 'part_number')
      .field('Item.suggestion_cost_remark', 'suggestion_cost_remark')
      .field(' \'V\' || Version.version_name', 'version_name')
      .field('Version.create_time', 'version_create_time')
      .field('Item.remark', 'remark')
      .field('Item.shipping_check_cost', 'shipping_check_cost')
      .field('PT.hasui', 'hasui')
      .field('Item.sourcer_shipping', 'sourcer_shipping')
      .field('Item.sourcer_pl', 'sourcer_pl')
      .field('Item.sourcer_assembly', 'sourcer_assembly')
      .field('Item.sourcer_remark', 'sourcer_remark')
      .field('Item.sourcer_cost_up', 'sourcer_cost_up')
      // .field('Item.ce_shipping', 'ce_shipping') ce運包 = sourcer 運包
      .field('Item.ce_pl', 'ce_pl')
      .field('Item.need_tooling')
      .field('Item.has_child')
      .field('Item.source_item_id')
      .field('emdm_extra.emdm_id')
      .field('Item.inquiry_cost_up')
      .field('Item.sourcer_import_curr')
      .field('Item.ori_sourcer_shipping')
      .field('Item.ori_sourcer_pl')
      .field('Item.ori_sourcer_assembly')
      .field('Item.ori_sourcer_cost_up')
      .from('bom_stage_version', 'Version')
      .join('bom_item', 'Item', 'Item.version_id = Version.id')
      // .join('bom_item_newdrop', 'Item', 'Item.version_id = Version.id')
      // .left_join('drop_down_item', 'ST', 'Item.supply_type = ST.id')
      // .left_join('drop_down_item', 'BG', 'Item.gb_assy_ctgy = BG.id')
      // .left_join('drop_down_item', 'FC', 'Item.func_ctgy = FC.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      // .left_join('drop_down_item', 'odmoem', 'Item.odm_oem = odmoem.id')
      // .left_join('drop_down_item', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join(squel.select().from('formula.supply_type').where('disable_time is null'), 'ST', 'Item.supply_type = ST.id')
      .left_join(squel.select().from('formula.gb_assy_ctgy').where('disable_time is null'), 'BG', 'Item.gb_assy_ctgy = BG.id')
      .left_join(squel.select().from('formula.func_ctgy').where('disable_time is null'), 'FC', 'Item.func_ctgy = FC.id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').where('material_spec_disable_time is null').distinct()
      , 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .left_join(squel.select().from('formula.odm_oem').where('disable_time is null'), 'odmoem', 'Item.odm_oem = odmoem.id')
      .left_join(squel.select().from('formula.operation').where('disable_time is null'), 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('image', 'image', 'image.id = Item.image_id')
      .join('bom_designee', 'Designee', 'Designee.id = owner')
      .left_join('bom_partlist_value', 'partlist', 'partlist.bom_item_id = Item.id')
      .left_join(squel.select().field('a.*').field('b.hasui').from('wiprocurement.bom_partlist_config', 'a')
        .join('wiprocurement.bom_partlist_format', 'b', 'a.format = b.id'), 'PT',
      'Item.parts_ctgy_1 = PT.parts_ctgy_1 and Item.parts_ctgy_2 = PT.parts_ctgy_2')
      .left_join('wiprocurement.bom_item_emdm_extra', 'emdm_extra', 'emdm_extra.bom_id = Version.bom_id and emdm_extra.source_item_id = Item.source_item_id')
      .where('Version.bom_id = ? and Version.id = ? ', Bid, Vid)

    if (assign != 'all') {
      sql.where('Designee.id = ?', assign)
    }
    sql.field('usertable.name_a', 'owner')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')
    sql.order('Item.created_time', true)
    sql.order('Item.order_id', true)
    const result = await systemDB.Query(sql.toParam())
    return result
  },
  getBomTableByCompleteVersionId: async (Vid, assign = 'all', itemId = null) => {
    let sql = squel.select()
      .field('Item.id')
      .field('customer_pn')
      .field('rfq_pn')
      .field('ref_part_num', 'reference_pn')
      .field('part_name')
      .field('image_id')
      .field('image.fpath', 'image_path')
      .field('level')
      .field('parent_level')
      .field('sub_leve', 'sub_level')
      .field('qty')
      .field('part_size_l')
      .field('part_size_w')
      .field('part_size_h')
      .field('part_size_m')
      .field('part_size_ef')
      .field('part_size_l2')
      .field('part_size_w2')
      .field('Item.parts_ctgy_1', 'parts_ctgy_1_id')
      .field('Item.parts_ctgy_2', 'parts_ctgy_2_id')
      .field('Item.gb_assy_ctgy', 'gb_assy_ctgy_id')
      .field('Item.func_ctgy', 'func_ctgy_id')
      .field('Item.supply_type', 'supply_type_id')
      .field('Item.material_spec', 'material_spec_id')
      .field('dropMateSpec.item_name', 'old_material_spec_name')
      .field('Item.material', 'material_id')
      .field('dropMate.item_name', 'old_material_name')
      .field('Item.odm_oem', 'odm_oem_id')
      .field('Item.initaddmodidel', 'initaddmodidel_id')
      // .field('PC1.item_name', 'parts_ctgy_1')
      // .field('PC2.item_name', 'parts_ctgy_2')
      // .field('BG.item_name', 'gb_assy_ctgy')
      // .field('FC.item_name', 'func_ctgy')
      // .field('ST.item_name', 'supply_type')
      // .field('material_spec.item_name', 'material_spec')
      // .field('material.item_name', 'material')
      // .field('odmoem.item_name', 'odm_oem')
      // .field('initAddDel.item_name', 'initaddmodidel')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('FC.func_ctgy_name', 'func_ctgy')
      .field('ST.supply_type_name', 'supply_type')
      .field('BG.gb_assy_ctgy_name', 'gb_assy_ctgy')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('odmoem.odm_oem_name', 'odm_oem')
      .field('initAddDel.operation_name', 'initaddmodidel')
      .field('thickness')
      .field('part_weight')
      .field('modified_time', 'update_time')
      .field('Item.source_cost')
      .field('Item.system_cost')
      .field('Item.spa_cost_material_remark')
      .field('Item.spa_cost')
      .field('Item.suggestion_cost_type', 'suggestion_cost_type')
      .field('partlist.partlist_value', 'partlistvalue')
      // .field('partlist.partlist_price', 'partlistprice')
      .field('partlist.image_value', 'partlistimage')
      .field('partlist.partlist_amount', 'partlistamount')
      .field('partlist.formate', 'partlistformate')
      .field('complete_partlist.partlist_value', 'complete_partlistvalue')
      // .field('complete_partlist.partlist_price', 'complete_partlistprice')
      .field('complete_partlist.image_value', 'complete_partlistimage')
      .field('complete_partlist.partlist_amount', 'complete_partlistamount')
      .field('complete_partlist.formate', 'complete_partlistformate')
      .field('complete_partlist.image_value', 'complete_partlistimage')
      .field('Item.extra', 'extra')
      .field('Item.sku0', 'sku0')
      .field('Item.sku1', 'sku1')
      .field('Item.sku2', 'sku2')
      .field('Item.sku3', 'sku3')
      .field('Item.sku4', 'sku4')
      .field('Item.sku5', 'sku5')
      .field('Item.last_price', 'last_price')
      .field('Item.part_number', 'part_number')
      .field('users.name_a', 'original_owner')
      .field('Item.shipping_check_cost', 'shipping_check_cost')
      .field('Item.suggestion_cost_remark', 'suggestion_cost_remark')
      .field(' \'V\' || Version.version_name', 'version_name')
      .field('Version.create_time', 'version_create_time')
      .field('bomProject.id', 'bom_id')
      .field('bomProject.sku_desc', 'sku_desc')
      .field('bomProject.project_name', 'project_name')
      .field('bomProject.source_version', 'source_version')
      .field('bomProject.project_code', 'project_code')
      .field('bomProject.customer', 'customer')
      .field('bomProject.create_time', 'bom_project_create_time')
      .field('bom_stage.stage_name', 'stage_name')
      .field('Item.remark', 'remark')
      // .field('Item.shipping_check_cost', 'shipping_check_cost')
      .field('Item.sourcer_shipping', 'sourcer_shipping')
      .field('Item.sourcer_pl', 'sourcer_pl')
      .field('Item.sourcer_assembly', 'sourcer_assembly')
      .field('Item.sourcer_remark', 'sourcer_remark')
      .field('Item.sourcer_cost_up', 'sourcer_cost_up')
      .field('Item.ce_pl', 'ce_pl')
      .field('Item.owner_emplid', 'owner_emplid')
      .field('PT.hasui', 'hasui')
      .field('Item.need_tooling')
      .field('Item.has_child')
      .field('Item.inquiry_cost_up')
      .field('Item.sourcer_import_curr')
      .field('Item.ori_sourcer_shipping')
      .field('Item.ori_sourcer_pl')
      .field('Item.ori_sourcer_assembly')
      .field('Item.ori_sourcer_cost_up')
      .field('Item.source_item_id')
      .field('emdm_extra.emdm_id')
      .from('bom_stage_version', 'Version')
      .join('bom_item_complete_version', 'Item', 'Item.version_id = Version.id')
      .join('bom_projects', 'bomProject', 'bomProject.id = Version.bom_id')
      // .left_join('drop_down_item', 'ST', 'Item.supply_type = ST.id')
      // .left_join('drop_down_item', 'BG', 'Item.gb_assy_ctgy = BG.id')
      // .left_join('drop_down_item', 'FC', 'Item.func_ctgy = FC.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      // .left_join('drop_down_item', 'odmoem', 'Item.odm_oem = odmoem.id')
      // .left_join('drop_down_item', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('formula.supply_type', 'ST', 'Item.supply_type = ST.id')
      .left_join('formula.gb_assy_ctgy', 'BG', 'Item.gb_assy_ctgy = BG.id')
      .left_join('formula.func_ctgy', 'FC', 'Item.func_ctgy = FC.id')
      .left_join('formula.part_category_1', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join('formula.part_category_2', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(
        squel.select()
          .distinct()
          .field('part_cate1_id')
          .field('part_cate1_name')
          .field('part_cate2_id')
          .field('part_cate2_name')
          .field('material_spec_id')
          .field('material_spec_name')
          .from('formula.v_me_bom_materialspec_and_material_value'),
        'material_spec',
        'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id'
      )
      .left_join('formula.v_me_bom_materialspec_and_material_value', 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .left_join('formula.odm_oem', 'odmoem', 'Item.odm_oem = odmoem.id')
      .left_join('formula.operation', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('image', 'image', 'image.id = Item.image_id')
      .left_join('bom_stage', 'bom_stage', 'bom_stage.id::text = Version.stage_id')
      .join('bom_designee', 'Designee', 'Designee.id = owner')
      .left_join('bom_partlist_value', 'partlist', 'partlist.bom_item_id = Item.id')
      .left_join('bom_partlist_value_complete', 'complete_partlist', 'complete_partlist.bom_item_id = Item.id')
      .left_join('wiprocurement.user', 'users', 'users.emplid = item.owner_emplid')
      .left_join(squel.select().field('a.*').field('b.hasui').from('wiprocurement.bom_partlist_config', 'a')
        .join('wiprocurement.bom_partlist_format', 'b', 'a.format = b.id'), 'PT', 'Item.parts_ctgy_1 = PT.parts_ctgy_1 and Item.parts_ctgy_2 = PT.parts_ctgy_2')
      .left_join('wiprocurement.drop_down_item', 'dropMateSpec', 'dropMateSpec.id = Item.material_spec')
      .left_join('wiprocurement.drop_down_item', 'dropMate', 'dropMate.id = Item.material')
      .left_join('wiprocurement.bom_item_emdm_extra', 'emdm_extra', 'emdm_extra.bom_id = Version.bom_id and emdm_extra.source_item_id = Item.source_item_id')
      .where('Version.id = ? ', Vid)

    if (assign != 'all') {
      sql.where('Designee.id = ?', assign)
    }

    if (itemId) {
      sql.where('Item.id = ?', itemId)
    }

    sql.field('usertable.name_a', 'owner')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')

    sql.order('Item.created_time', true)
    sql.order('Item.order_id', true)
    const result = await systemDB.Query(sql.toParam())
    return result
  },
  bomRDMEPermission: async (Bid, userID) => {

    let sql = squel.select()
      .field('id')
      .from('bom_designee', 'Designee')
      .where('Designee.bom_project_id = ? and  Designee.user_id = ?', Bid, userID)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount >= 1 ? true : false
  },

  getExportData: async (Bid, assign) => {
    let Vid = await getLatestVersionID(Bid)
    let sql = squel.select()
      .field('PT.product_type', 'product_type')
      .field('Item.id')
      .field('ref_part_num', 'reference_pn')
      .field('part_name')
      .field('level')
      .field('parent_level')
      .field('sub_leve', 'sub_level')
      .field('qty')
      .field('part_size_l')
      .field('part_size_w')
      .field('part_size_h')
      .field('part_size_m')
      .field('part_size_ef')
      .field('part_size_l2')
      .field('part_size_w2')
      // .field('PC1.item_name', 'parts_ctgy_1')
      // .field('PC2.item_name', 'parts_ctgy_2')
      // .field('BG.item_name', 'gb_assy_ctgy')
      // .field('FC.item_name', 'func_ctgy')
      // .field('ST.item_name', 'supply_type')
      // .field('material_spec.item_name', 'material_spec')
      // .field('material.item_name', 'material')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('BG.gb_assy_ctgy_name', 'gb_assy_ctgy')
      .field('FC.func_ctgy_name', 'func_ctgy')
      .field('ST.supply_type_name', 'supply_type')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('odmoem.odm_oem_name', 'odm_oem')
      .field('initAddDel.operation_name', 'initaddmodidel')
      .field('thickness')
      .field('part_weight')
      .field('Version.create_time', 'version_create_time')
      .field('Item.need_tooling')
      .field('Item.has_child')
      .from('bom_stage_version', 'Version')
      .join('bom_item', 'Item', 'Item.version_id = Version.id')
      .join('bom_projects', 'PT', 'PT.id = Version.bom_id')
      // .left_join('drop_down_item', 'ST', 'Item.supply_type = ST.id')
      // .left_join('drop_down_item', 'BG', 'Item.gb_assy_ctgy = BG.id')
      // .left_join('drop_down_item', 'FC', 'Item.func_ctgy = FC.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      .left_join('formula.supply_type', 'ST', 'Item.supply_type = ST.id')
      .left_join('formula.gb_assy_ctgy', 'BG', 'Item.gb_assy_ctgy = BG.id')
      .left_join('formula.func_ctgy', 'FC', 'Item.func_ctgy = FC.id')
      .left_join('formula.part_category_1', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join('formula.part_category_2', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(
        squel.select()
          .distinct()
          .field('part_cate1_id')
          .field('part_cate1_name')
          .field('part_cate2_id')
          .field('part_cate2_name')
          .field('material_spec_id')
          .field('material_spec_name')
          .from('formula.v_me_bom_materialspec_and_material_value'), 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join('formula.v_me_bom_materialspec_and_material_value', 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .left_join('formula.odm_oem', 'odmoem', 'Item.odm_oem = odmoem.id')
      .left_join('formula.operation', 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .join('bom_designee', 'Designee', 'Designee.id = owner')
      .where('Version.bom_id = ? and Version.id = ? ', Bid, Vid)

    if (assign != 'all') {
      sql.where('Designee.id = ?', assign)
    } else {
      sql.field('usertable.name_a', 'owner')
        .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')
    }

    const result = await systemDB.Query(sql.toParam())
    return result
  },
  getBomItems: async (client, versionID) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item')
      .where('version_id = ?', versionID)

    const result = await client.query(sql.toParam())
    return result.length > 0 ? result : false
  },
  copyBomItemToCompleteVersion: async (client, bomItemArr) => {
    // bomItem.created_time = moment(bomItem.created_time).format('YYYY-MM-DD HH:mm:ss.SSSS')
    // bomItem.modified_time = moment(bomItem.modified_time).format('YYYY-MM-DD HH:mm:ss.SSSS')
    // let sql = squel.insert()
    //   .into('bom_item_complete_version')
    //   .setFields(bomItem)
    // await client.query(sql.toParam())
    if (bomItemArr.length > 0) {
      const bomItemArrList = splitData(bomItemArr)
      await asyncForEach(bomItemArrList, async(_bomItemArr)=>{
        let sql = squel.insert().into('bom_item_complete_version').setFieldsRows(_bomItemArr)
        await client.query(sql.toParam())
      })
    }
  },
  copyCompleteBomPartItem: async (client, partItemArr) => {
    if (partItemArr.length > 0) {
      const partItemArrList = splitData(partItemArr)
      await asyncForEach(partItemArrList, async(_partItemArr)=>{
        let sql = squel.insert().into('bom_partlist_value_complete').setFieldsRows(_partItemArr)
        await client.query(sql.toParam())
      })
    }
  },
  updateBomItemsVer: async (client, oldVersionID, newVersionID) => {
    let sql = squel.update()
      .table('bom_item')
      .where('version_id = ?', oldVersionID)
      .setFields({
        version_id: newVersionID,
      })
    await client.query(sql.toParam())
  },
  addUploadFileRecord: async (client, bomId, stageId, userId) => {
    let sql = squel.insert().into('bom_item_upload_record')
    if (bomId) sql.set('bom_id', bomId)
    if (stageId) sql.set('stage_id', stageId)
    if (userId) sql.set('user_id', userId)
    sql.set('create_time', moment().utc().format())

    const result = await client.query(sql.toParam())
    return result.rowCount >= 1 ? true : false
  },
  getUploadFileRecord: async (bomId) => {
    let joinSql = squel.select().field('bom_id').field('stage_id').field('create_time').from('bom_stage_version')
      .where('create_time = ?', squel.select().field('max(create_time)', 'create_time').from('bom_stage_version').where('bom_id = ?', bomId).group('bom_id'))

    let sql = squel.select()
      .field('a.bom_id', 'bom_id')
      .field('a.stage_id', 'stage_id')
      .field('a.user_id', 'user_id')
      .field('a.create_time', 'create_time')
      .from('bom_item_upload_record', 'a')
      .join(joinSql, 'b', 'a.bom_id = b.bom_id::text and a.stage_id=b.stage_id')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount >= 1 ? true : false
  },
  insertUploadBomItemTemp: async (bomItemInfo, versionId, userId) => {
    let insertArr = []
    let uuid = UUID()
    _.forEach(bomItemInfo, (bomItem, idx) => {
      insertArr.push({
        upload_tmp_id: uuid,
        id: bomItem.id,
        order_id: idx + 1,
        customer_pn: bomItem.customer_pn,
        level: bomItem.level,
        parent_level: bomItem.parent_level,
        rfq_pn: bomItem.rfq_pn,
        ref_part_num: bomItem.ref_part_num,
        qty: bomItem.qty,
        part_size_l: bomItem.part_size_l,
        part_size_w: bomItem.part_size_w,
        part_size_h: bomItem.part_size_h,
        part_size_m: bomItem.part_size_m,
        part_size_ef: bomItem.part_size_ef,
        part_size_l2: bomItem.part_size_l2,
        part_size_w2: bomItem.part_size_w2,
        thickness: bomItem.thickness,
        part_weight: bomItem.part_weight,
        parts_ctgy_1: bomItem.parts_ctgy_1,
        parts_ctgy_2: bomItem.parts_ctgy_2,
        material_spec: bomItem.material_spec,
        material: bomItem.material,
        func_ctgy: bomItem.func_ctgy,
        gb_assy_ctgy: bomItem.gb_assy_ctgy,
        supply_type: bomItem.supply_type,
        part_name: bomItem.part_name,
        sub_leve: bomItem.sub_leve,
        owner: bomItem.owner,
        version_id: versionId,
        extra: JSON.stringify(bomItem.extension),
        user_id: userId,
        need_part_list: bomItem.needPartList ? bomItem.needPartList : false,
        formate: bomItem.formate ? bomItem.formate : null,
        sku0: bomItem.sku0,
        sku1: bomItem.sku1,
        sku2: bomItem.sku2,
        sku3: bomItem.sku3,
        sku4: bomItem.sku4,
        sku5: bomItem.sku5,
        odm_oem: bomItem.odm_oem,
        part_number: bomItem.part_number,
        initAddModiDel: bomItem.initAddModiDel,
        last_price: bomItem.last_price,
        remark: bomItem.remark,
        has_child: bomItem.hasChild,
        need_tooling: bomItem.need_tooling || false,
      })
    })
    if (insertArr.length > 0) {
      let sql = squel.insert().into('bom_item_upload_temp').setFieldsRows(insertArr)
      await systemDB.Query(sql.toParam())
      return uuid
    }
  },
  deleteUploadBomItemTemp: async (client, tempId) => {
    let sql = squel.delete()
      .from('wiprocurement.bom_item_upload_temp')
      .where('upload_tmp_id = ?', tempId)
    await client.query(sql.toParam())
    return true
  },
  deleteBomItem: async (client, versionId) => {
    let sql = squel.delete()
      .from('wiprocurement.bom_item')
      // .from('wiprocurement.bom_item_upload_test')
      .where('version_id = ?', versionId)
    await client.query(sql.toParam())
    return true
  },
  transferBomItem: async (client, id, sourceOwner, destOwner, versionId) => {
    // let sql = squel.select().field('id').field('customer_pn')
    //   .field('level').field('parent_level').field('rfq_pn').field('ref_part_num').field('qty')
    //   .field('part_size_l').field('part_size_w').field('part_size_h').field('part_size_ef').field('part_size_l2').field('part_size_w2')
    //   .field('thickness').field('part_weight').field('parts_ctgy_1').field('parts_ctgy_2').field('material_spec').field('material')
    //   .field('gb_assy_ctgy').field('func_ctgy').field('supply_type').field('part_name').field('sub_leve')
    //   .field(squel.str(`'${destOwner}'`), 'owner').field(squel.str(`'${versionId}'`), 'version_id').field('part_size_m').field('extra')
    //   .field('sku0').field('sku1').field('sku2').field('sku3').field('sku4').field('sku5').field('odm_oem').field('initAddModiDel').field('part_number')
    //   .field('last_price')
    //   .from('wiprocurement.bom_item_upload_temp').where('upload_tmp_id = ? and owner = ?', id, sourceOwner)
    // let queryResult = await client.query(sql.toParam())

    // if (queryResult.rows.length > 0) {
    //   await Promise.all(
    //     _.map(queryResult.rows, async (v) => {
    //       v.created_time = moment().utc().format('YYYY-MM-DD HH:MM:SS.sss')
    //       v.modified_time = moment().utc().format('YYYY-MM-DD HH:MM:SS.sss')
    //       v.extra = JSON.stringify(v.extra)
    //       v.last_price = JSON.stringify(v.last_price)
    //       let insertSql = squel.insert()
    //         .into('bom_item')
    //         .setFields(v)
    //       await client.query(insertSql.toParam())
    //     })
    //   )
    // }

    let sql = squel.insert()
      .into('wiprocurement.bom_item')
      .fromQuery(
        ['id', 'customer_pn', 'level', 'parent_level', 'rfq_pn', 'ref_part_num', 'qty',
          'part_size_l', 'part_size_w', 'part_size_h', 'part_size_ef', 'part_size_l2', 'part_size_w2', 'thickness', 'part_weight',
          'parts_ctgy_1', 'parts_ctgy_2', 'material_spec', 'material', 'gb_assy_ctgy', 'func_ctgy',
          'supply_type', 'part_name', 'sub_leve', 'owner', 'version_id', 'part_size_m', 'extra', 'created_time', 'modified_time',
          'sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5', 'odm_oem', 'initAddModiDel', 'part_number', 'last_price', 'order_id', 'remark', 'need_tooling', 'has_child',
          'suggestion_cost_type'],
        squel.select()
          .field('id')
          .field('customer_pn')
          .field('level')
          .field('parent_level')
          .field('rfq_pn')
          .field('ref_part_num')
          .field('qty')
          .field('part_size_l')
          .field('part_size_w')
          .field('part_size_h')
          .field('part_size_ef')
          .field('part_size_l2')
          .field('part_size_w2')
          .field('thickness')
          .field('part_weight')
          .field('parts_ctgy_1')
          .field('parts_ctgy_2')
          .field('material_spec')
          .field('material')
          .field('gb_assy_ctgy')
          .field('func_ctgy')
          .field('supply_type')
          .field('part_name')
          .field('sub_leve')
          .field(squel.str(`'${destOwner}'`), 'owner')
          .field(squel.str(`'${versionId}'`), 'version_id')
          .field('part_size_m')
          .field('extra')
          .field(squel.str(`'${moment().utc().format()}'`, 'created_time'))
          .field(squel.str(`'${moment().utc().format()}'`, 'modified_time'))
          .field('sku0').field('sku1').field('sku2').field('sku3').field('sku4').field('sku5')
          .field('odm_oem')
          .field('initAddModiDel')
          .field('part_number')
          .field('last_price')
          .field('order_id')
          .field('remark')
          .field('need_tooling')
          .field('has_child')
          .field(`'${suggestionCostType.defaultType}'`, 'suggestion_cost_type')
          .from('wiprocurement.bom_item_upload_temp').where('upload_tmp_id = ? and owner = ?', id, sourceOwner)

      ).returning('*')
    const res = await client.query(sql.toParam())
    return res.rows
  },
  getBomItemUploadOwner: async (id) => {
    let sql = squel.select()
      .field('owner', 'key')
      .field('owner', 'value')
      .from('bom_item_upload_temp')
      .distinct()
      .where('upload_tmp_id = ?', id)
    return await systemDB.Query(sql.toParam())
  },
  deleteOldBomItem: async (client, version_id) => {
    let sql = squel.delete()
      .from('wiprocurement.bom_item')
      // .from('wiprocurement.bom_item_upload_test')
      .where('version_id = ?', version_id)
    await client.query(sql.toParam())
    return true
  },
  deleteBomItemUploadRecord: async (bomId, stageId) => {
    let sql = squel.delete()
      .from('wiprocurement.bom_item_upload_record')
      .where('bom_id = ? and stage_id = ?', bomId, stageId)
    await systemDB.Query(sql.toParam())
    return true
  },
  updatePartList: async (client, bomItemId, data) => {
    let sql = squel.update().table('bom_partlist_value')
    if (data.formate) sql.set('formate', data.formate)
    if (data.partlistValue) sql.set('partlist_value', JSON.stringify(data.partlistValue))
    if (data.partlistPrice) sql.set('partlist_price', JSON.stringify(data.partlistPrice))
    if (data.partlistValue && data.partlistValue.Images) sql.set('image_value', JSON.stringify({ images: data.partlistValue.Images }))
    sql.set('update_time', moment().utc().format())
    sql.where('bom_item_id = ?', bomItemId)
    sql.returning('*')
    await client.query(sql.toParam())
    return true
  },
  getPartListById: async (bomItemId) => {
    let sql = squel.select()
      .field('a.partlist_value')
      .from('bom_partlist_value', 'a')
      .join(squel.select().field('id').from('wiprocurement.bom_item').where('version_id IN ?', squel.select().field('version_id')
        .from('wiprocurement.bom_item').where('id = ?', bomItemId)), 'b', 'a.bom_item_id = b.id')
    return await systemDB.Query(sql.toParam())
  },
  getPartListDetail: async (bomItemId) => {
    let sql = squel.select()
      .field('partlist_value')
      .field('formate')
      // .field('partlist_price')
      .from('bom_partlist_value')
      .where('bom_item_id = ?', bomItemId)
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getPartListPrice: async (bomItemId) => {
    let sql = squel.select()
      .field('partlist_price')
      .from('bom_partlist_value')
      .where('bom_item_id = ?', bomItemId)
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getBomItemIdByParentId: async (itemId) => {
    let sql = squel.select()
      .field('Item.id')
      .from('bom_item', 'Item')
      .where('Item.parent_level = ?', itemId)
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : null
  },
  getBomItemByItemId: async (bomId, assign, itemId) => {
    let Vid = await getLatestVersionID(bomId)
    let sql = squel.select()
      .field('Item.id')
      .field('customer_pn')
      .field('rfq_pn')
      .field('ref_part_num', 'reference_pn')
      .field('part_name')
      .field('image_id')
      .field('image.fpath', 'image_path')
      .field('level')
      .field('parent_level')
      .field('sub_leve', 'sub_level')
      .field('qty')
      .field('part_size_l')
      .field('part_size_w')
      .field('part_size_h')
      .field('part_size_m')
      .field('part_size_ef')
      .field('part_size_l2')
      .field('part_size_w2')
      // .field('PC1.item_name', 'parts_ctgy_1_name')
      // .field('PC2.item_name', 'parts_ctgy_2_name')
      // .field('BG.item_name', 'gb_assy_ctgy_name')
      // .field('FC.item_name', 'func_ctgy_name')
      // .field('ST.item_name', 'supply_type_name')
      // .field('material_spec.item_name', 'material_spec_name')
      // .field('material.item_name', 'material_name')
      .field('PC1.category_name', 'parts_ctgy_1_name')
      .field('PC2.category_name', 'parts_ctgy_2_name')
      .field('BG.gb_assy_ctgy_name', 'gb_assy_ctgy_name')
      .field('FC.func_ctgy_name', 'func_ctgy_name')
      .field('ST.supply_type_name', 'supply_type_name')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('odmoem.odm_oem_name', 'odm_oem')
      .field('initAddDel.operation_name', 'initaddmodidel')
      .field('thickness')
      .field('part_weight')
      .field('modified_time', 'update_time')
      .field('source_cost')
      .field('system_cost')
      .field('partlist.partlist_value', 'partlistvalue')
      .field('partlist.partlist_price', 'partlistprice')
      .field('partlist.image_value', 'partlistimage')
      .field('partlist.partlist_amount', 'partlistamount')
      .field('partlist.formate', 'partlistformate')
      .field('Item.extra', 'extra')
      .field('Item.sku0', 'sku0')
      .field('Item.sku1', 'sku1')
      .field('Item.sku2', 'sku2')
      .field('Item.sku3', 'sku3')
      .field('Item.sku4', 'sku4')
      .field('Item.sku5', 'sku5')
      .field('Item.odm_oem', 'odm_oem')
      .field('Item.initaddmodidel', 'initaddmodidel')
      .field('Item.supply_type', 'supply_type')
      .field('Item.gb_assy_ctgy', 'gb_assy_ctgy')
      .field('Item.func_ctgy', 'func_ctgy')
      .field('Item.parts_ctgy_1', 'parts_ctgy_1')
      .field('Item.parts_ctgy_2', 'parts_ctgy_2')
      .field('Item.material_spec', 'material_spec')
      .field('Item.material', 'material')
      .field('dropMateSpec.item_name', 'old_material_spec_name')
      .field('dropMate.item_name', 'old_material_name')
      .field('Item.part_number', 'part_number')
      .field('Item.suggestion_cost_remark', 'suggestion_cost_remark')
      .field('Item.remark', 'remark')
      .field('Designee.id', 'designee_id')
      .field('Item.need_tooling')
      .field('Item.has_child')
      .from('bom_stage_version', 'Version')
      .join('bom_item', 'Item', 'Item.version_id = Version.id')
      // .join('bom_item', 'Item', 'Item.version_id = Version.id')
      // .left_join('drop_down_item', 'ST', 'Item.supply_type = ST.id')
      // .left_join('drop_down_item', 'BG', 'Item.gb_assy_ctgy = BG.id')
      // .left_join('drop_down_item', 'FC', 'Item.func_ctgy = FC.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      .left_join(squel.select().from('formula.supply_type').where('disable_time is null'), 'ST', 'Item.supply_type = ST.id')
      .left_join(squel.select().from('formula.gb_assy_ctgy').where('disable_time is null'), 'BG', 'Item.gb_assy_ctgy = BG.id')
      .left_join(squel.select().from('formula.func_ctgy').where('disable_time is null'), 'FC', 'Item.func_ctgy = FC.id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(
        squel.select()
          .distinct()
          .field('part_cate1_id')
          .field('part_cate1_name')
          .field('part_cate2_id')
          .field('part_cate2_name')
          .field('material_spec_id')
          .field('material_spec_name')
          .from('formula.v_me_bom_materialspec_and_material_value')
          .where('material_spec_disable_time is null'), 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .left_join(squel.select().from('formula.odm_oem').where('disable_time is null'), 'odmoem', 'Item.odm_oem = odmoem.id')
      .left_join(squel.select().from('formula.operation').where('disable_time is null'), 'initAddDel', 'Item.initaddmodidel = initAddDel.id')
      .left_join('image', 'image', 'image.id = Item.image_id')
      .join('bom_designee', 'Designee', 'Designee.id = owner')
      .left_join('bom_partlist_value', 'partlist', 'partlist.bom_item_id = Item.id')
      .left_join('wiprocurement.drop_down_item', 'dropMateSpec', 'dropMateSpec.id = Item.material_spec')
      .left_join('wiprocurement.drop_down_item', 'dropMate', 'dropMate.id = Item.material')
      .where('Version.bom_id = ? and Version.id = ? ', bomId, Vid)
      .field('usertable.name_a', 'owner')
      .left_join('wiprocurement.user', 'usertable', 'usertable.emplid = Designee.user_id')
    if (assign != 'all') {
      sql.where('Designee.id = ?', assign)
    }

    sql.where('Item.id = ?', itemId)
    const result = await systemDB.Query(sql.toParam())
    return result
  },
  /* findLastLeaf: async (bomId) => {
    let Vid = await getLatestVersionID(bomId)
    let sql = squel.select()
      .field('Item.id')
      .field('Item.parent_level')
      .from('wiprocurement.bom_stage_version', 'Version')
      .join('wiprocurement.bom_item', 'Item', 'Item.version_id = Version.id')
      .where('Version.bom_id = ? and Version.id = ? ', bomId, Vid)
      .where('Item.id NOT IN ?', squel.select().field('parent_level')
        .from('wiprocurement.bom_stage_version', 'Version')
        .join('wiprocurement.bom_item', 'Item', 'Item.version_id = Version.id')
        .where('Version.bom_id = ? and Version.id = ? AND parent_level is not null', bomId, Vid).distinct())
      .order('Item.level', false)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  findLastLeafByCompleteVersionId: async (vid) => {
    let sql = squel.select()
      .field('Item.id')
      .field('Item.parent_level')
      .from('wiprocurement.bom_stage_version', 'Version')
      .join('wiprocurement.bom_item_complete_version', 'Item', 'Item.version_id = Version.id')
      .where('Version.id = ? ', vid)
      .where('Item.id NOT IN ?', squel.select().field('parent_level')
        .from('wiprocurement.bom_stage_version', 'Version')
        .join('wiprocurement.bom_item', 'Item', 'Item.version_id = Version.id')
        .where('Version.id = ? AND parent_level is not null', vid).distinct())
      .order('Item.level', false)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }, */
  getItemByItemId: async (itemId) => {
    let sql = squel.select()
      .field('Item.id', 'id')
      .field('Item.level', 'level')
      .field('Item.parent_level', 'parent_level')
      .field('Item.system_cost', 'system_cost')
      .field('Item.source_cost', 'source_cost')
      .field('Item.sku0', 'sku0')
      .field('Item.sku1', 'sku1')
      .field('Item.sku2', 'sku2')
      .field('Item.sku3', 'sku3')
      .field('Item.sku4', 'sku4')
      .field('Item.sku5', 'sku5')
      .from('wiprocurement.bom_item', 'Item')
      .where('Item.version_id = ?', squel.select().field('version_id').from('wiprocurement.bom_item').where('id = ?', itemId))
    const result = await systemDB.Query(sql.toParam())
    return result
  },
  getVersionbyBomitem: async (Bid) => {
    let sql = squel.select()
      .from('bom_stage_version')
      .where('bom_id = ?', Bid)
      .order('create_time', false)
      .limit(1)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getPartNumberPrice: async (partNumber) => {
    let sql = squel.select()
      .field('b.matnr', 'matnr')
      .field(squel.str(`to_char(b.datab,'${'YYYY-MM-DD'}')`), 'datab')
      .field(squel.str(`to_char(b.datbi,'${'YYYY-MM-DD'}')`), 'datbi')
      .field('cast(b.KBETR as numeric)', 'price')
      .field('b.kpein', 'unit')
      .field('(cast(b.KBETR as numeric) / b.kpein)', 'unitprice')
      .field('b.konwa', 'currency')
      .field('b.knumh', 'knumh')
      .field('a.bmatn', 'part_number')
      .field('a.lifnr', 'vendor_code')
      .field('c.vbase', 'vendor')
      .field('a.mfrpn', 'vendor_pn')
      .field('b.ekorg', 'purchase_org')
      .from(squel.select().from('eina').where('bmatn in ?', partNumber)
        .where(squel.str(`(MFRNR is not null or MFRNR <> '${''}') AND (LOEKZ is null or LOEKZ = '${''}')`)), 'a')
      .join(squel.select().from('a018_konp').where('datbi >= ?', moment().format('YYYY-MM-DD'))
        .where(squel.str(`LOEVM_KO is null or LOEVM_KO = '${''}'`)), 'b', 'a.matnr=b.matnr')
      .left_join('epur_vgroup', 'c', 'a.lifnr =c.vbase')
      .order('knumh', false)
      .order('matnr')
      .order('datab', false)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  updateBomIemLastPrice: async (client, src, vid) => {
    let sql = squel.update().table('wiprocurement.bom_item')
    if (src.last_price) sql.set('last_price', src.last_price)
    sql.where('part_number = ? and version_id = ?', src.part_number, vid)
    sql.returning('*')
    await client.query(sql.toParam())
    return true
  },

  getCompleteBomItems: async (client, versionID) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item_complete_version')
      .where('version_id = ?', versionID)

    const result = await client.query(sql.toParam())
    return result.length > 0 ? result : false
  },

  getMeBomHeader: async (Bid, Vid = null) => {
    if (!Vid) {
      Vid = await getLatestVersionID(Bid)
    }
    let sql = squel.select()
      .field('project.customer', 'customer')
      .field('project.product_type', 'product')
      .field('project.project_name', 'project_name')
      .field('project.project_code', 'project_code')
      .field('project.site', 'site_name')
      .field('project.create_time', 'create_time')
      .field('project.sku_desc', 'sku_desc')
      .field('stage.stage_name', 'stage_name')
      .field('project.source_version', 'emdm_version')
      .field('Version.version_name', 'version')
      .from('bom_projects', 'project')
      .join('bom_stage_version', 'Version', 'Version.bom_id=project.id')
      .left_join('bom_stage', 'stage', 'stage.id::varchar=Version.stage_id')
      .where('Version.bom_id =? and Version.id=?', Bid, Vid)
    const result = await systemDB.Query(sql.toParam())
    return result.rows[0]
  },

  getAllBomItem: async () => {
    let sql = squel.select()
      .field('*')
      .from('bom_item')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getBomItemOrderId: async (Vid) => {
    let sql = squel.select()
      .field('max(order_id)', 'orderId')
      .from('bom_item')
      .where('version_id= ?', Vid)
    const result = await systemDB.Query(sql.toParam())
    return result.rows[0]
  },
  getVersionIdfromBomItem: async () => {
    let sql = squel.select()
      .field('version_id')
      .from('bom_item')
      .distinct()
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  updateCompleteBomItem: async (client, itemId, data) => {
    let sql = squel.update()
      .table('bom_item_complete_version')
      .where('id = ?', itemId)
      .setFields(data)
      .returning('id')
      .toParam()
    const result = await client.query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },
  getCompleteItemsByVerId: async (client, id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item_complete_version')
      .where('version_id = ?', id)
      .toParam()
    const result = await client.query(sql)
    return result.rows
  },
  getTypeUseRefPartNumber: async (refPartNumber) => {
    let sql = squel.select()
      .from('formula.v_partnumber_category_1_category_2')
      .where('partnumber = ?', refPartNumber)
      .where('isDisabled = false')
    /* let sql = squel.select()
      .field('*')
      .from('epur_item_type')
      .where('item = ? ', refPartNumber) */

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getBomItemPartlistFormate: async (product_type_id) => {
    let sql = squel.select()
      .field('a.*')
      .field('b.format_key')
      .field('b.hasui')
      .from('bom_partlist_config', 'a')
      .join('bom_partlist_format', 'b', 'a.format=b.id')
      .right_join('bom_partlist_config_product_type', 'pt', 'pt.config_id = a.id')
      .where('pt.product_type_id = ?', product_type_id)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getBomItemPartlistFormateNoUi: async (product_type_id) => {
    let sql = squel.select()
      .field('a.*')
      .field('b.format_key')
      .from('bom_partlist_config', 'a')
      .join('bom_partlist_format', 'b', 'a.format=b.id')
      .right_join('bom_partlist_config_product_type', 'pt', 'pt.config_id = a.id')
      .where('pt.product_type_id = ?', product_type_id)
      .where('b.hasui=false')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getNoNeedPartList: async () => {
    let sql = squel.select()
      .field('config.*')
      .from('bom_itme_validate_exception_config', 'config')
      .left_join('bom_itme_validate_exception_type', 'type', 'type.id = config.type')
      .where('type.exception_type_value = ?', 'no_need_partlist')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getNoNeedPartListOdmOem: async () => {
    let sql = squel.select()
      .field('id')
      .from('formula.odm_oem')
      .where('odm_oem_name in ?', ['OEM', 'TBD'])

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getBomItemValidConfig: async (validateType = null) => {
    let sql = squel.select()
      .field('a.*')
      .field('b.exception_type_key')
      .from('bom_itme_validate_exception_config', 'a')
      .join('bom_itme_validate_exception_type', 'b', 'a.type=b.id')
    if (validateType) {
      sql.where('b.exception_type_key = ?', validateType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  getMappingPartCtgyConfig: async (source = null) => {
    let sql = squel.select()
      .field('a.*')
      .field('b.item_name')
      .from('bom_itme_part_ctgy_mapping_config', 'a')
      .join('drop_down_item', 'b', 'b.id=a.part_ctgy')
    if (source) {
      sql.where('a.source = ?', source)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  copyBomPartLietWhenComplete: async (client, partListArr) => {
    if (partListArr && partListArr.length > 0) {
      let sql = squel.insert().into('bom_item_upload_temp').setFieldsRows(partListArr)
      await systemDB.Query(sql.toParam())
    }
  },
  getBomItemsWithOwnerId: async (client, versionID) => {
    let joinSql = squel.select().field('a.id').field('b.user_id').field('c.name_a').field('b.id', 'designId').from('bom_stage_version', 'a')
      .join('bom_designee', 'b', 'a.bom_id=b.bom_project_id').left_join('wiprocurement.user', 'c', 'b.user_id=c.emplid')
      .where('a.id = ?', versionID)

    let sql = squel.select()
      .field('a.*')
      .field('c.id', 'part_id')
      .field('c.partlist_value', 'partlist_value')
      .field('c.bom_item_id', 'bom_item_id')
      .field('c.update_time', 'part_update_time')
      .field('c.create_time', 'part_create_time')
      .field('c.partlist_price', 'partlist_price')
      .field('c.formate', 'part_formate')
      .field('c.image_value', 'part_image_value')
      .field('c.partlist_amount', 'partlist_amount')
      .field('b.user_id')
      .from('bom_item', 'a')
      .join(joinSql, 'b', 'a.version_id = b.id and a.owner=b.designId')
      .left_join('bom_partlist_value', 'c', 'c.bom_item_id = a.id')
      .where('version_id = ?', versionID)
    const result = await client.query(sql.toParam())
    return result.length > 0 ? result : false
  },
  getCurrnetVersion: async (bomId) => {
    let sql = squel.select()
      .field('id')
      .field('version_name')
      .from('bom_stage_version')
      .where('bom_id = ?', bomId)
      .order('create_time', false)
      .limit(1)

    let res = await systemDB.Query(sql.toParam())
    return res.rows
  },
  getHistoryPartListPrice: async (bomItemId) => {
    let completeSql = squel.select()
      .field('bom_item_id').field('partlist_price', 'complete_partlist_price')
      .from('bom_partlist_value_complete').where('bom_item_id = ?', bomItemId)
    let partSql = squel.select()
      .field('bom_item_id').field('partlist_price', 'partlist_price')
      .from('bom_partlist_value').where('bom_item_id = ?', bomItemId)
    let sql = squel.select().from(completeSql, 'a FULL')
      .outer_join(partSql, 'b', 'a.bom_item_id = b.bom_item_id')

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getHistoruPartListDetail: async (bomItemId) => {
    let completeSql = squel.select()
      .field('bom_item_id').field('partlist_value', 'complete_partlist_value')
      .field('formate', 'complete_formate')
      .from('bom_partlist_value_complete').where('bom_item_id = ?', bomItemId)
    let partSql = squel.select()
      .field('bom_item_id').field('partlist_value', 'partlist_value')
      .field('formate', 'formate')
      .from('bom_partlist_value').where('bom_item_id = ?', bomItemId)
    let sql = squel.select().from(completeSql, 'a FULL')
      .outer_join(partSql, 'b', 'a.bom_item_id = b.bom_item_id')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getLaborageParamater: async (datetime) => {
    let joinSql = squel.select()
      .field('s.id', 'schdeule_id')
      .field('s.activate_date')
      .from('formula.schedule_date', 's')
      .where('s.activate_date = ? and s.formula_type_id = ?',
        squel.select()
          .field('max(sd.activate_date)')
          .from('formula.schedule_date', 'sd')
          .where('sd.activate_date <= ? and sd.formula_type_id = ?',
            datetime, squel.select().field('id').from('formula.formula_type').where('name=?', 'common')
          )
        ,
        squel.select().field('id').from('formula.formula_type').where('name=?', 'common')
      )
    let sql = squel.select()
      .field('a.id', 'id')
      .field('b.value', 'value')
      .field('b.activate_date', 'activate_date')
      .field('a.unit', 'unit')
      .field('a.part_type', 'part_type')
      .field('a.label', 'label')
      .field('a.label_name', 'label_name')
      .from('formula.common_parameter', 'a')
      .left_join(
        squel.select().field('d.*').field('e.activate_date').from('formula.parameter_value', 'd')
          .join(joinSql, 'e', ' e.schdeule_id = d.activate_date_id')
          .where('d.source_table= ?', 'common_parameter')
        , 'b', 'a.id = b.parameter_id')
    sql.where('a.part_type = ?', 'standup_assembly')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : null
  },
  getPartlistExportData: async (bomId, partlistFormates = []) => {
    let sql = squel.select()
      .field('bi.*')
      .field('bi.parts_ctgy_1', 'parts_ctgy_1_id')
      .field('bi.parts_ctgy_2', 'parts_ctgy_2_id')
      .field('bi.material_spec', 'material_spec_id')
      .field('bi.material', 'material_id')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('bpv.partlist_value', 'partlistValue')
      .field('bpv.partlist_price', 'partlistPrice')
      .field('bpv.formate', 'format')
      .from('wiprocurement.bom_item', 'bi')
      .join('wiprocurement.bom_stage_version', 'bsv', 'bsv.id = bi.version_id')
      .left_join('wiprocurement.bom_partlist_value', 'bpv', 'bi.id = bpv.bom_item_id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'bi.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'bi.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').where('material_spec_disable_time is null').distinct()
      , 'material_spec', 'bi.material_spec = material_spec.material_spec_id and bi.parts_ctgy_1 = material_spec.part_cate1_id and bi.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'bi.material = material.material_id and bi.parts_ctgy_1 = material.part_cate1_id and bi.parts_ctgy_2 = material.part_cate2_id and bi.material_spec=material.material_spec_id')
      .where('bsv.bom_id = ?', bomId)

    if (partlistFormates.length) {
      sql.where('bpv.formate in ?', partlistFormates)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : []
  },
  getPartlistExportDataByBomItemId: async (bomId, bomItemId) => {
    let sql = squel.select()
      .field('bi.*')
      .field('bi.parts_ctgy_1', 'parts_ctgy_1_id')
      .field('bi.parts_ctgy_2', 'parts_ctgy_2_id')
      .field('bi.material_spec', 'material_spec_id')
      .field('bi.material', 'material_id')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('bpv.partlist_value', 'partlistValue')
      .field('bpv.partlist_price', 'partlistPrice')
      .field('bpv.formate', 'format')
      .field('bpv.bom_item_id', 'bom_item_id')
      .from('wiprocurement.bom_item', 'bi')
      .join('wiprocurement.bom_stage_version', 'bsv', 'bsv.id = bi.version_id')
      .left_join('wiprocurement.bom_partlist_value', 'bpv', 'bi.id = bpv.bom_item_id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'bi.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'bi.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').where('material_spec_disable_time is null').distinct()
      , 'material_spec', 'bi.material_spec = material_spec.material_spec_id and bi.parts_ctgy_1 = material_spec.part_cate1_id and bi.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'bi.material = material.material_id and bi.parts_ctgy_1 = material.part_cate1_id and bi.parts_ctgy_2 = material.part_cate2_id and bi.material_spec=material.material_spec_id')
      .where('bsv.bom_id = ?', bomId)
      .where('bpv.bom_item_id = ?', bomItemId)

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : {}
  },

  getPartlistExportDataCompleteVersion: async (bomId, partlistFormates = [], versionId) => {
    let sql = squel.select()
      .field('bi.*')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('CASE WHEN bpvc.partlist_value is not null THEN bpvc.partlist_value ELSE bpv.partlist_value END', 'partlistValue')
      .field('CASE WHEN bpvc.partlist_price is not null THEN bpvc.partlist_price ELSE bpv.partlist_price END', 'partlistPrice')
      .field('CASE WHEN bpvc.formate is not null THEN bpvc.formate ELSE bpv.formate END', 'format')
      .from('wiprocurement.bom_item_complete_version', 'bi')
      .join('wiprocurement.bom_stage_version', 'bsv', 'bsv.id = bi.version_id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'bi.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'bi.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').where('material_spec_disable_time is null').distinct()
      , 'material_spec', 'bi.material_spec = material_spec.material_spec_id and bi.parts_ctgy_1 = material_spec.part_cate1_id and bi.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'bi.material = material.material_id and bi.parts_ctgy_1 = material.part_cate1_id and bi.parts_ctgy_2 = material.part_cate2_id and bi.material_spec=material.material_spec_id')
      .left_join('wiprocurement.bom_partlist_value_complete', 'bpvc', 'bi.id = bpvc.bom_item_id')
      .left_join('wiprocurement.bom_partlist_value', 'bpv', 'bi.id = bpv.bom_item_id')
      .where('bsv.bom_id = ?', bomId)
      .where('bpvc.formate in ? or bpv.formate in ?', partlistFormates, partlistFormates)
      .where('bsv.id = ?', versionId)

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : []
  },
  getPartlistExportDataCompleteVersionByBomItemId: async (bomId, versionId, bomItemId) => {
    let sql = squel.select()
      .field('bi.*')
      .field('PC1.category_name', 'parts_ctgy_1')
      .field('PC2.category_name', 'parts_ctgy_2')
      .field('material_spec.material_spec_name', 'material_spec')
      .field('material.material_name', 'material')
      .field('CASE WHEN bpvc.partlist_value is not null THEN bpvc.partlist_value ELSE bpv.partlist_value END', 'partlistValue')
      .field('CASE WHEN bpvc.partlist_price is not null THEN bpvc.partlist_price ELSE bpv.partlist_price END', 'partlistPrice')
      .field('CASE WHEN bpvc.formate is not null THEN bpvc.formate ELSE bpv.formate END', 'format')
      .field('bpvc.bom_item_id', 'bom_item_id')
      .from('wiprocurement.bom_item_complete_version', 'bi')
      .join('wiprocurement.bom_stage_version', 'bsv', 'bsv.id = bi.version_id')
      .left_join(squel.select().from('formula.part_category_1').where('disable_time is null'), 'PC1', 'bi.parts_ctgy_1 = PC1.id')
      .left_join(squel.select().from('formula.part_category_2').where('disable_time is null'), 'PC2', 'bi.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').where('material_spec_disable_time is null').distinct()
      , 'material_spec', 'bi.material_spec = material_spec.material_spec_id and bi.parts_ctgy_1 = material_spec.part_cate1_id and bi.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join(squel.select().from('formula.v_me_bom_materialspec_and_material_value').where('material_disable_time is null'), 'material'
        , 'bi.material = material.material_id and bi.parts_ctgy_1 = material.part_cate1_id and bi.parts_ctgy_2 = material.part_cate2_id and bi.material_spec=material.material_spec_id')
      .left_join('wiprocurement.bom_partlist_value_complete', 'bpvc', 'bi.id = bpvc.bom_item_id')
      .left_join('wiprocurement.bom_partlist_value', 'bpv', 'bi.id = bpv.bom_item_id')
      .where('bsv.bom_id = ?', bomId)
      .where('bsv.id = ?', versionId)
      .where('bpvc.bom_item_id = ?', bomItemId)

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : {}
  },

  getBomInfoByCSExport: async (bomId, versionId) => {
    let sql = squel.select()
      .field('bp.project_name')
      .field('bp.site')
      .field('bp.project_code')
      .field('bp.product_spec')
      .field('bp.product_type')
      .field('bs.stage_name')
      .field('bp.customer')
      .from('bom_projects', 'bp')
      .join('bom_stage_version', 'bsv', 'bsv.bom_id = bp.id')
      .join('bom_stage', 'bs', 'bs.id::text = bsv.stage_id')
      .where('bsv.bom_id = ?', bomId)

    if (versionId === 'CURRENT') {
      sql.where('bsv.version_name = ?', squel.select().field('MAX(version_name) as version_name').from('bom_stage_version').where('bom_id=?', bomId))
    } else {
      sql.where('bsv.id = ?', versionId)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  // 取得BOM item的size驗証規則
  getSizeValidatorRules: async () => {
    const sqlColDep = squel.select()
      .from('col_dependence', 'a')
      .join('col_definite', 'b', 'a.required_col_id = b.id')

    const sql = squel.select()
      .field('def.col_name')
      .field('def.col_key')
      .field('dep.col_val')
      .field('dep.col_key', 'require_field')
      // .field('d.item_name')
      // .field('d.path')
      .from('col_definite', 'def')
      .join(sqlColDep, 'dep', 'def.id = dep.col_id')
      // .join('drop_down_item', 'd', 'd.id::character varying = dep.col_val')
      .where('def.used_by = ?', 'bom_item')

    const result = await systemDB.Query(sql.toParam())
    return _.get(result, 'rows', [])
  },
  // 取得BOM item的欄位disable規則
  getValidatorDisableRules: async () => {
    const sqlColDep = squel.select()
      .from('col_disable', 'a')
      .join('col_definite', 'b', 'a.disable_col_id = b.id')

    const sql = squel.select()
      .field('def.col_name')
      .field('def.col_key')
      .field('dep.col_val')
      .field('dep.col_key', 'disable_field')
      .from('col_definite', 'def')
      .join(sqlColDep, 'dep', 'def.id = dep.col_id')
      .where('def.used_by = ?', 'bom_item')

    const result = await systemDB.Query(sql.toParam())
    return _.get(result, 'rows', [])
  },
  getDefineItem: async (colKey, colValueList) => {
    let colMap = {
      parts_ctgy_1: {
        id:'id',
        name: 'category_name',
        source: 'formula.part_category_1',
      },
      parts_ctgy_2: {
        id:'id',
        name: 'category_name',
        source: 'formula.part_category_2',
      },
      material_spec: {
        id:'material_spec_id',
        name: 'material_spec_name',
        source: 'formula.v_me_bom_materialspec_and_material_value',
      },
      material: {
        id:'material_id',
        name: 'material_name',
        source: 'formula.v_me_bom_materialspec_and_material_value',
      },
    }
    if (colMap.hasOwnProperty(colKey)) {
      let rule = colMap[colKey]
      let sql = squel.select()
        .field(rule.id, 'id')
        .field(rule.name, 'name')
        .from(rule.source)
        .where(`${rule.id} in ?`, colValueList)
      
      let result = await systemDB.Query(sql.toParam())
      return _.get(result, 'rows', [])
    } else {
      return []
    }
  },
  getMetalThickness: async () => {
    let metalType2Sql = squel.select()
      .field('pc2.category_name')
      .from('wiprocurement.bom_partlist_config', 'bpc')
      .left_join('wiprocurement.bom_partlist_format', 'bpf', 'bpc.format = bpf.id')
      .left_join('formula.part_category_2', 'pc2', 'pc2.id = bpc.parts_ctgy_2')
      .where('bpf.format_key = ?', 'housing-metal')

    const sql = squel.select()
      .field('pc2.category_name')
      .field('mm.name')
      .field('mm.id')
      .field('mt.id as thickness_id')
      .field('mt.thickness')
      .from('formula.material_metal', 'mm')
      .join('formula.material_thinkness', 'mt', 'mt.material_metal_id = mm.id')
      .join('formula.part_category_material_metal', 'pcmm', 'mt.material_metal_id = pcmm.material_metal_id')
      .join('formula.part_category_2', 'pc2', 'pc2.id = pcmm.pategory_category_2_id')
      .where('pc2.category_name in ?', metalType2Sql)
      .where('mt.disable_time is null')
      .order('mt.thickness', true)

    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : []
  },
  getTypeNewDropdownValue: async (productType) => {
    let productTypeSql = getProductTypeIdSQL(productType)
    let type2productTypeSQL = squel.select()
      .field('type2.id')
      .field('type2.part_category_1_id')
      .field('type2.category_name')
      .field('type2_product_type.product_type_id')
      .from('formula.part_category_2', 'type2')
      .join('formula.part_category_2_product_type', 'type2_product_type', 'type2.id = type2_product_type.part_category_2_id')
      .where('type2_product_type.product_type_id = ?', productTypeSql)
      .where('type2.disable_time is NULL')
      .where('type2_product_type.disable_time is NULL')
    let sql = squel.select().from(squel.select().from('formula.part_category_1').where('disable_time is null'), 'a')
      .field('a.id', 'part_ctgy1_id')
      .field('a.category_name', 'part_ctgy1')
      .field(squel.str(`UPPER(REPLACE(a.category_name, '${'.'}', ''))`), 'part_ctgy1_path')
      .field('b.id', 'part_ctgy2_id')
      .field('b.category_name', 'part_ctgy2')
      .field(squel.str(`CONCAT(UPPER(REPLACE(a.category_name, '${'.'}', '')), '.', UPPER(REPLACE(b.category_name, '${'.'}', '')))`), 'part_ctgy2_path')
      .field('c.material_id', 'material_id')
      .field('c.material_name', 'material_name')
      .field(squel.str(`CASE WHEN c.material_spec_name IS NULL THEN NULL ELSE CONCAT(UPPER(REPLACE(a.category_name, '${'.'}', '')), '.', UPPER(REPLACE(b.category_name, '${'.'}', '')), '.', UPPER(REPLACE(c.material_spec_name, '${'.'}', '')), '.', UPPER(REPLACE(c.material_name, '${'.'}', ''))) END`), 'material_path')
      // .field('UPPER(a.category_name) || \'.\' || UPPER(b.category_name) || \'.\' || UPPER(c.material_spec_name) || \'.\' || UPPER(c.material_name)', 'material_path')
      .field('c.material_spec_id', 'material_spec_id')
      .field('c.material_spec_name', 'material_spec_name')
      .field(squel.str(`CONCAT(UPPER(REPLACE(a.category_name, '${'.'}', '')), '.', UPPER(REPLACE(b.category_name, '${'.'}', '')), '.', UPPER(REPLACE(c.material_spec_name, '${'.'}', '')))`), 'material_spec_path')
      // .field('UPPER(a.category_name) || \'.\' || UPPER(b.category_name) || \'.\' || UPPER(c.material_spec_name)', 'material_spec_path')
      .join(type2productTypeSQL, 'b', 'a.id = b.part_category_1_id')
    sql.left_join('formula.v_me_bom_materialspec_and_material_value', 'c', 'c.part_cate1_id = a.id and c.part_cate2_id = b.id')
      .where('material_spec_disable_time is null')
      .where('material_disable_time is null')
      .where('link_disable_time is null')
      .order('a.category_name')
      .order('b.category_name')
      .order('c.material_spec_name')
      .order('c.material_name')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : null
  },
  getAssyAndOtherNewDropdownValue: async (productType = '') => {
    let product_type_sql = getProductTypeIdSQL(productType)
    /* let assy_sql = squel.select()
      .field('*')
      .from('formula.gb_assy_ctgy')
      .where('disable_time is null')
    if (productType) {
      assy_sql.where(`product_type_id = (${product_type_sql.toString()})`)
    }
    let sql = squel.select()
      .field('a.id', 'gb_assy_ctgy_id')
      .field('a.gb_assy_ctgy_name', 'gb_assy_ctgy_name')
      .field('UPPER(a.gb_assy_ctgy_name)', 'gb_assy_ctgy_path')
      .field('a.product_type_id')
      .field('b.id', 'odm_oem_id')
      .field('b.odm_oem_name', 'odm_oem_name')
      .field('UPPER(b.odm_oem_name)', 'odm_oem_path')
      .field('c.id', 'supply_type_id')
      .field('c.supply_type_name', 'supply_type_name')
      .field('UPPER(c.supply_type_name)', 'supply_type_path')
      .field('d.id', 'operation_id')
      .field('UPPER(d.operation_name)', 'operation_path')
      .field('d.operation_name', 'operation_name')
      .field('e.id', 'func_ctgy_id')
      .field('UPPER(e.func_ctgy_name)', 'func_ctgy_path')
      .field('e.func_ctgy_name', 'func_ctgy_name')
      .from(`(${assy_sql.toString()})`, 'a')
      .from('(select * from formula.odm_oem where disable_time is null) b, \
             (select * from formula.supply_type where disable_time is null) c,\
             (select * from formula.operation where disable_time is null) d, \
             (select * from formula.func_ctgy where disable_time is null) e') */
    let sql = squel.select()
      .field('\'gb_assy_ctgy\'', 'field_name')
      .field('id')
      .field('gb_assy_ctgy_name', 'item_name')
      .field('trim(upper(gb_assy_ctgy_name))', 'path')
      .from('formula.gb_assy_ctgy')
      .where('disable_time IS NULL')
      .where('product_type_id = ?', product_type_sql)
      .union(
        squel.select()
          .field('\'odm_oem\'', 'field_name')
          .field('id')
          .field('odm_oem_name', 'item_name')
          .field('trim(upper(odm_oem_name))', 'path')
          .from('formula.odm_oem')
          .where('disable_time IS NULL')
      )
      .union(
        squel.select()
          .field('\'supply_type\'', 'field_name')
          .field('id')
          .field('supply_type_name', 'item_name')
          .field('trim(upper(supply_type_name))', 'path')
          .from('formula.supply_type')
          .where('disable_time IS NULL')
      )
      .union(
        squel.select()
          .field('\'initaddmodidel\'', 'field_name')
          .field('id')
          .field('operation_name', 'item_name')
          .field('trim(upper(operation_name))', 'path')
          .from('formula.operation')
          .where('disable_time IS NULL')
      )
      .union(
        squel.select()
          .field('\'func_ctgy\'', 'field_name')
          .field('id')
          .field('func_ctgy_name', 'item_name')
          .field('trim(upper(func_ctgy_name))', 'path')
          .from('formula.func_ctgy')
          .where('disable_time IS NULL')
      )
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows : null
  },
  getPartCtgy1ByName: async (item_name) => {
    let sql = squel.select().from('formula.part_category_1', 'a')
      // eslint-disable-next-line quotes
      .field('*').where("TRIM(upper(category_name)) = replace(replace(?, '-', '_'), ' ', '_')", item_name)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getPartCtgy2ByName: async (part_ctgy1_id, item_name) => {
    let itemName = item_name.trim()
    switch (item_name) {
      case 'MYLAR/SPONGE/PORON':
        itemName = 'MYLAR_OF_MYLAR_SPONGE_PORON'
        break
      case 'BOND & DETACH ADHESI':
        itemName = 'BOND_DETACH_ADHESIVE'
        break
      case 'AL FOIL':
        itemName = 'AL_CU_FOIL'
        break
      case 'METAL+PLASTIC':
        itemName = 'METAL_AND_PLASTIC'
        break
      case 'ALUMINUM':
        itemName = 'ALUMINUM鋁皮外觀件單件OR組立'
        break
      default:
        itemName = itemName.replace(/[- &]/g, '_')
        break
    }
    let specialItemName = itemName.replace(/[\\/]/g, '_')
    let sql = squel.select().from('formula.part_category_2', 'a')
      // eslint-disable-next-line quotes
      .field('*')
      .where('part_category_1_id = ?', part_ctgy1_id)
      // eslint-disable-next-line quotes
      .where(`TRIM(upper(category_name)) = '${itemName}' OR TRIM(upper(category_name)) = '${specialItemName}'`)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getMaterialSpecByName: async (part_ctgy2_id, item_name) => {
    let sql = squel.select()
      .field('part_cate1_id').field('part_cate1_name')
      .field('part_cate2_id').field('part_cate2_name')
      .field('material_spec_id', 'id').field('material_spec_name')
      .from('formula.v_me_bom_materialspec_and_material_value').where('part_cate2_id = ?', part_ctgy2_id).where('TRIM(upper(material_spec_name)) = ?', item_name)
      .where('material_spec_disable_time is null').distinct()
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getMaterialByName: async (part_ctgy2_id, material_spec_id, item_name) => {
    let sql = squel.select()
      .field('part_cate1_id').field('part_cate1_name')
      .field('part_cate2_id').field('part_cate2_name')
      .field('material_spec_id').field('material_spec_name')
      .field('material_id', 'id').field('material_name')
      .from('formula.v_me_bom_materialspec_and_material_value').where('part_cate2_id = ?', part_ctgy2_id)
      .where('material_spec_id = ?', material_spec_id).where('TRIM(upper(material_name)) = ?', item_name)
      .where('material_disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getAssyCtgyByName: async (item_name, productType) => {
    let product_type_sql = getProductTypeIdSQL(productType)
    let sql = squel.select()
      .field('id')
      .field('gb_assy_ctgy_name', 'name')
      .from('formula.gb_assy_ctgy').where('TRIM(upper(gb_assy_ctgy_name)) = ?', item_name)
      .where('disable_time is null')
    if (productType) {
      sql.where(`product_type_id = (${product_type_sql.toString()})`)
    }
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getOperationByName: async (item_name) => {
    let sql = squel.select()
      .field('id')
      .field('operation_name', 'name')
      .from('formula.operation').where('TRIM(upper(operation_name)) = ?', item_name)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getFuncCtgyByName: async (item_name) => {
    let sql = squel.select()
      .field('id')
      .field('func_ctgy_name', 'name')
      .from('formula.func_ctgy').where('TRIM(upper(func_ctgy_name)) = ?', item_name)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getOdmoemByName: async (item_name) => {
    let sql = squel.select()
      .field('id')
      .field('odm_oem_name', 'name')
      .from('formula.odm_oem').where('TRIM(upper(odm_oem_name)) = ?', item_name)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getSupplyTypeByName: async (item_name) => {
    let sql = squel.select()
      .field('id')
      .field('supply_type_name', 'name')
      .from('formula.supply_type').where('TRIM(upper(supply_type_name)) = ?', item_name)
      .where('disable_time is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows.length > 0 ? result.rows[0] : null
  },
  insertUploadBomSourcerCostTemp: async (bomItemList, userId, upload_tmp_id) => {
    let insertArr = []
    _.forEach(bomItemList, (bomItemInfo) => {
      let obj = {}
      obj.upload_tmp_id = upload_tmp_id
      obj.bom_id = bomItemInfo.bomId
      obj.bom_item_id = bomItemInfo.bomItemId
      obj.user_id = userId.toString()
      obj.sourcer_shipping = bomItemInfo.sourcerShipping
      obj.sourcer_pl = bomItemInfo.sourcerPl
      obj.sourcer_assembly = bomItemInfo.sourcerAssembly
      obj.sourcer_cost = bomItemInfo.sourcerCost
      obj.sourcer_remark = bomItemInfo.sourcerRemark
      obj.sourcer_import_curr = bomItemInfo.sourcer_import_curr
      insertArr.push(obj)
    })
    if (insertArr.length > 0) {
      let sql = squel.insert().into('bom_sourcer_cost_temp').setFieldsRows(insertArr)
      await systemDB.Query(sql.toParam())
    }
  },
  getUploadSoucerRecord: async (upload_tmp_id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_sourcer_cost_temp')
      .where('bom_sourcer_cost_temp.upload_tmp_id = ?', upload_tmp_id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows || []
  },
  updateSourcerCost: async (client, bomItem, updateInquiryCost = false, updateCeShipping = false) => {
    const updateColumnList = [
      'sourcer_shipping',
      'sourcer_pl',
      'sourcer_assembly',
      'sourcer_cost_up',
    ]
    let isNeedUpdate = false
    let sql = squel.update()
      .table('wiprocurement.bom_item', 'bom_item')

    updateColumnList.forEach((key) => {
      if (!_.isNil(bomItem[key])) {
        isNeedUpdate = true
        sql.set(key, bomItem[key])
      }
    })
    if (bomItem.sourcer_cost_up && updateInquiryCost) {
      isNeedUpdate = true
      sql.set('inquiry_cost_up', bomItem.sourcer_cost_up)
    }
    if (bomItem.sourcer_shipping && updateCeShipping) {
      isNeedUpdate = true
      sql.set('shipping_check_cost', bomItem.sourcer_shipping)
    }
    if (isNeedUpdate) {
      sql.where('id = ?', bomItem.id)
      await client.query(sql.toParam())
    }
  },
  modifyBomItemBySourcerCostExcel: async (client, bomItemList, isUpdateNull = false) => {
    const updateColumnList = [
      'sourcer_shipping',
      'sourcer_pl',
      'sourcer_assembly',
      'sourcer_remark',
      'ori_sourcer_shipping',
      'ori_sourcer_pl',
      'ori_sourcer_assembly',
      'ori_sourcer_cost_up',
    ]

    for (let bomItem of bomItemList) {
      let isNeedUpdate = false
      let sql = squel.update()
        .table('wiprocurement.bom_item', 'bom_item')
      updateColumnList.forEach((columnName) => {
        if (!_.isNil(bomItem[columnName]) || (isUpdateNull && _.isNull(bomItem[columnName]))) {
          isNeedUpdate = true
          sql = sql.set(columnName, bomItem[columnName])
        }
      })
      if (!_.isNil(bomItem.sourcer_cost) || (isUpdateNull && _.isNull(bomItem.sourcer_cost))) {
        isNeedUpdate = true
        // 20200211 把sourcer cost資料複製到inquiry cost up後蓋前
        sql = sql.setFields({
          sourcer_cost_up: bomItem.sourcer_cost,
        })
        // sql = sql.set('sourcer_cost_up', bomItem.sourcer_cost)
      }
      // 20191224 sourcer運包與ce運包 後蓋前
      if (!_.isNil(bomItem.sourcer_shipping) || (isUpdateNull && _.isNull(bomItem.sourcer_shipping))) {
        isNeedUpdate = true
        sql = sql.set('shipping_check_cost', bomItem.sourcer_shipping)
      }
      if (!isNeedUpdate) {
        continue
      } else {// 有更新 價格參數就寫入幣別
        sql = sql.set('sourcer_import_curr', bomItem['sourcer_import_curr'])
      }
      sql = sql.where('id = ?', bomItem.bom_item_id)
      await client.query(sql.toParam())
    }
  },
  deleteSourcerCostExcel: async (client, tempId) => {
    let sql = squel.delete()
      .from('wiprocurement.bom_sourcer_cost_temp')
      .where('upload_tmp_id = ?', tempId)
    await client.query(sql.toParam())
    return true
  },
  getProductTypeInfoByBomID: async (Bid) => {
    let sql = squel.select()
      .field('pt.id', 'product_type_id')
      .field('pt.type_name', 'product_type_name')
      .from('wiprocurement.bom_projects', 'bp')
      .left_join('formula.product_type', 'pt', 'pt.type_name = bp.product_type')
      .where('bp.id = ? ', Bid)
    const result = await systemDB.Query(sql.toParam())
    return result.rows[0] || null
  },
  getProductTypeIDByVersionID: async (Vid) => {
    let sql = squel.select()
      .field('pt.id', 'product_type_id')
      .from('wiprocurement.bom_stage_version', 'bv')
      .left_join('wiprocurement.bom_projects', 'bp', 'bp.id = bv.bom_id')
      .left_join('formula.product_type', 'pt', 'pt.type_name = bp.product_type')
      .where('bv.id = ? ', Vid)
    const result = await systemDB.Query(sql.toParam())
    return result.rows[0].product_type_id || null
  },
  getHistoryItemsByVerIdNotTrans: async (id) => {
    let sql = squel.select()
      .field('*')
      .from('bom_item_complete_version')
      .where('version_id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  /**
 * 取得MaterialSpecName
 * @param {String} materialSpecId mebom Item
 * @returns {Array}
 */
  getMaterialSpecNameById: async (materialSpecId) => {
    const result = await common.getDataByTable(['material_spec_name'], 'formula.v_me_bom_materialspec_and_material_value', [`material_spec_id = '${materialSpecId}'`], 1)
    return result
  },
  /**
 * 取得MaterialName
 * @param {String} materialId mebom Item
 * @returns {Array}
 */
  getMaterialNameById: async (materialId) => {
    const result = await common.getDataByTable(['material_name'], 'formula.v_me_bom_materialspec_and_material_value', [`material_id = '${materialId}'`], 1)
    return result
  },
  /**
 * 取得PartsCtgy2 Name
 * @param {String} partsCtgy1Id mebom Item
 * @param {String} partsCtgy2Id mebom Item
 * @returns {Array}
 */
  getPartCtgy2NameById: async (partsCtgy1Id, partsCtgy2Id) => {
    const result = await common.getDataByTable(['category_name'], 'formula.part_category_2', [`id = '${partsCtgy2Id}'`, `part_category_1_id = '${partsCtgy1Id}'`], 1)
    return result
  },
  /**
 * 取得PartsCtgy2的資訊
 * @returns {Array}
 */
  getPartCtgy2: async () => {
    const result = await common.getDataByTable(['id', 'part_category_1_id'], 'formula.part_category_2')
    return result
  },
  getExceptionTypeConfig: async (exceptionTypeKey) => {
    const getTypeIdSql = squel.select()
      .field('id')
      .from('bom_itme_validate_exception_type')
      .where('exception_type_key = ?', exceptionTypeKey)
    const sql = squel.select()
      .field('*')
      .from('bom_itme_validate_exception_config')
      .where('type = ?', getTypeIdSql)
    const result = await systemDB.Query(sql.toParam())
    return result.rows || []
  },
  getPartNameByRefPartNum: async (referencePartNumber) => {
    const result = await common.getDataByTable(['maktx'], 'wiprocurement.mara', [`matnr = '${referencePartNumber}'`])
    return result
  },
  getBomProjectInfoByBomId: async (bomId) => {
    const result = await common.getDataByTable(['*'], 'wiprocurement.bom_projects', [`id = ${bomId}`])
    return result
  },
  insertBomEditHistory: async (client, insertData) => {
    if (insertData.length > 0) {
      let sql = squel.insert()
        .into('wiprocurement.bom_project_edit_history')
        .setFieldsRows(insertData)
        .returning('id')
        .toParam()

      const result = await client.query(sql)
      return result.rowCount == 1 ? result.rows[0] : null
    }
  },
  
  getBomEditType: async(action, part_type = []) => {
    let sql = squel.select()
      .field('id')
      .field('label')
      .field('label_name')
      .field('part_type')
      .from('wiprocurement.bom_project_edit_type', 'edit_type')
      .where('action_type = ?', action)

    if (part_type.length > 0) {
      sql.where('part_type in ?', part_type)
    }

    let result = await systemDB.Query(sql.toParam())
    return result.rows
  },
}
