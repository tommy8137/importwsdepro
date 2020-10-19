let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const moment = require('moment')

module.exports = {

  getPartlistById: async (id) => {
    let sql = squel.select()
      .from('bom_partlist_value')
      .where('bom_item_id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  // 取得重新計算 part list 所需參數
  getPartlistForReCla: async (bomItemIdList = [], formateList = []) => {
    let sql = squel.select()
      .field('bom_item_id')
      .field('formate')
      .field('partlist_value')
      .field('bom_item_id')
      .from('bom_partlist_value')
      .where('bom_item_id in ?', bomItemIdList)
      .where('formate is not null')
      .where('formate in ?', formateList)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },

  updatePartlistById: async (id, data) => {
    let sql = squel.update()
      .table('bom_partlist_value')
      .where('bom_item_id = ?', id)
      .setFields(data)
      .returning('id')
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },

  getDefaultData: async(id, type1, type2, key) => {
    let sql = squel.select()
      .field('part_name', 'partname')
      .field('part_number', 'partnumber')
      .field('material_spec.material_spec_name', 'materialspec')
      .field('material.material_name', 'material')
      .field('part_size_l', 'partssizelength')
      .field('part_size_w', 'partssizewidth')
      .field('part_size_h', 'partssizehigh')
      .field('part_size_m', 'partssizem')
      .field('part_size_ef', 'partssizeef')
      .field('part_size_w2', 'partsexpandwidth')
      .field('part_size_l2', 'partsexpandlength')
      .field('thickness', 'thickness')
      .field('PC1.category_name', 'type1')
      .field('PC2.category_name', 'type2')
      .field('level', 'level')

    if(key == 'hmpartname') {
      sql.field('part_name', 'hmpartname')
    }else if(key == 'hmpartnumber') {
      sql.field('part_number', 'hmpartnumber')
    }else if(key == 'hppartnumber') {
      sql.field('part_number', 'hppartnumber')
    }else if(key == 'hppartname') {
      sql.field('part_name', 'hppartname')
    }else if(key == 'hmmaterial') {
      sql.field('material_spec.material_spec_name', 'hmmaterial')
    }else if(key == 'hmthickness') {
      sql.field('thickness', 'hmthickness')
    }else if(key == 'hmpartssizespec') {
      sql.field('part_size_l', 'hmpartssizelength')
        .field('part_size_w', 'hmpartssizewidth')
        .field('part_size_h', 'hmpartssizehigh')
    }else if(key == 'hmpartssizewidth') {
      sql.field('part_size_w', 'hmpartssizewidth')
    }else if(key == 'hmpartssizelength') {
      sql.field('part_size_l', 'hmpartssizelength')
    }else if(key == 'hmpartssizehigh') {
      sql.field('part_size_h', 'hmpartssizehigh')
    }else if(key == 'hmpartsexpandsize') {
      sql.field('part_size_w2', 'hmpartsexpandwidth')
        .field('part_size_l2', 'hmpartsexpandlength')
    }else if(key == 'hmpartsexpandwidth') {
      sql.field('part_size_w2', 'hmpartsexpandwidth')
    }else if(key == 'hmpartsexpandlength') {
      sql.field('part_size_l2', 'hmpartsexpandlength')
    }else if(key == 'hpmaterialspec1') {
      sql.field('material_spec.material_spec_name', 'hpmaterialspec1')
    }else if(key == 'hpmaterial') {
      sql.field('material.material_name', 'hpmaterial')
    }else if(key == 'hpthickness') {
      sql.field('thickness', 'hpthickness')
    }else if(key == 'hppartssizespec') {
      sql.field('part_size_l', 'hppartssizelength')
        .field('part_size_w', 'hppartssizewidth')
        .field('part_size_h', 'hppartssizehigh')
    }else if(key == 'hppartssizelength') {
      sql.field('part_size_l', 'hppartssizelength')
    }else if(key == 'hppartssizewidth') {
      sql.field('part_size_w', 'hppartssizewidth')
    }else if(key == 'hppartssizehigh') {
      sql.field('part_size_h', 'hppartssizehigh')
    }else {
      sql.field('PC1.category_name', 'parts_ctgy_1')
        .field('PC2.category_name', 'parts_ctgy_2')
    }
    sql.from('bom_item', 'Item')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join('formula.part_category_1', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join('formula.part_category_2', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').distinct()
        , 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join('formula.v_me_bom_materialspec_and_material_value', 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .where('Item.id = ? and PC1.category_name = ? and PC2.category_name = ?', id, type1, type2)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },
  getItemLevel: async(id) => {
    let sql = squel.select()
      .field('level')
      .from('bom_item', 'Item')
      .where('Item.id = ?', id)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },
  updatePartlistByBomItemId: async (client, bomItemId, data) => {
    let sql = squel.update()
      .table('bom_partlist_value')
      .where('bom_item_id = ?', bomItemId)
      .setFields(data)
      .returning('*')
    const result = await client.query(sql.toParam())
    return result.rowCount
  },

  createBomPartlist: async (client, bomItemId, formate) => {
    let sql = squel.insert()
      .into('bom_partlist_value')
      .set('bom_item_id', bomItemId)
      .set('formate', formate)
      .set('create_time', moment().utc().format())
      .set('update_time', moment().utc().format())
      .returning('*')
      .toParam()

    const result = await client.query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },

  transferBomItemPartList: async (client, id, sourceOwner) => {
    let sql = squel.insert()
      .into('wiprocurement.bom_partlist_value')
      // .into('wiprocurement.bom_item_upload_test')
      .fromQuery(
        ['partlist_value', 'bom_item_id', 'formate', 'create_time', 'update_time'],
        squel.select().field(squel.str(`'${JSON.stringify({})}'`), 'partlist_value').field('id', 'bom_item_id').field('formate', 'formate')
          .field(squel.str(`'${moment().utc().format()}'`, 'create_time')).field(squel.str(`'${moment().utc().format()}'`, 'update_time'))
          .from('wiprocurement.bom_item_upload_temp').where('upload_tmp_id = ? and owner = ? and need_part_list', id, sourceOwner)
      )
    await client.query(sql.toParam())
  },

  deleteBomItemPartList:async(client, versionId) =>{
    let sql = squel.delete()
      .from('wiprocurement.bom_partlist_value')
      .where('bom_item_id IN ?', squel.select().field('id', 'id').from('wiprocurement.bom_item').where('version_id = ?', versionId))
    await client.query(sql.toParam())
    return true
  },

  deleteBomItemPartListByItemId:async(client, bomItemId) =>{
    let sql = squel.delete()
      .from('wiprocurement.bom_partlist_value')
      .where('bom_item_id = ?', bomItemId)
    await client.query(sql.toParam())
    return true
  },
  getImage: async(id) => {
    let sql = squel.select()
      .field('fpath', 'data')
      .from('image')
      .where('id = ?', id)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },

  getDropdownWithFilter: async(parentItemName, fieldName) => {
    const item_relation = {
      parts_ctgy_2: 'parts_ctgy_1',
      material_spec: 'parts_ctgy_2',
      material: 'material_spec',
    }

    let sql = squel.select()
      .field('parent_item.item_name as parent_item_name, parent_item.path as parent_path, parent_item.field_name as parent_field_name, item.*')
      .from('drop_down_item', 'parent_item')
      .join('drop_down_item', 'item', 'item.field_name = \'' + fieldName + '\' and parent_item.field_name = \'' + item_relation[fieldName] + '\' and item.path like \'%\' || parent_item.path || \'%\'')
      .where('parent_item.item_name = ?', parentItemName)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount > 0 ? result.rows : []
  },

  getV1PartlistData: async() => {
    let sql = squel.select()
      .field('partlist_value->>\'initialValue\' as initialValue, partlist_price->>\'totalPrices\' as price, formate, bom_item_id as bomItemId, image_value as images, partlist_value as partlistValue, partlist_price as partlistPrice')
      .from('wiprocurement.bom_partlist_value')
      .where('partlist_value->>\'version\' is null and partlist_value->>\'initialValue\' is not null and partlist_price->>\'totalPrices\' is not null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  getV1PCBData: async() => {
    let sql = squel.select()
      .field('content, id, cost')
      .from('wiprocurement.pcb')
      .where('content->>\'formData\' is null')
      .where('content->>\'Price\' is null')
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  setV2PartlistData: async(bomItemId, partlistValue, priceResult) => {
    let sql = squel.update()
      .table('wiprocurement.bom_partlist_value')
      .set('partlist_value', JSON.stringify(partlistValue))
      .set('partlist_price', JSON.stringify(priceResult))
      .where('bom_item_id = ?', bomItemId)
      .returning('*')
      .toParam()
    const result = await systemDB.Query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },
  setV2PCBData: async(content, id) => {
    let sql = squel.update()
      .table('wiprocurement.pcb')
      .set('content', JSON.stringify(content))
      .where('id = ?', id)
      .returning('*')
      .toParam()
    const result = await systemDB.Query(sql)
    return result.rowCount == 1 ? result.rows[0] : null
  },
  getHistoryDefaultData: async(id, type1, type2, key) => {
    let sql = squel.select()
      .field('part_name', 'partname')
      .field('part_number', 'partnumber')
      .field('material_spec.material_spec_name', 'materialspec')
      .field('material.material_name', 'material')
      .field('part_size_l', 'partssizelength')
      .field('part_size_w', 'partssizewidth')
      .field('part_size_h', 'partssizehigh')
      .field('part_size_m', 'partssizem')
      .field('part_size_ef', 'partssizeef')
      .field('part_size_w2', 'partsexpandwidth')
      .field('part_size_l2', 'partsexpandlength')
      .field('thickness', 'thickness')
      .field('PC1.category_name', 'type1')
      .field('PC2.category_name', 'type2')
      .field('level', 'level')

    if(key == 'hmpartname') {
      sql.field('part_name', 'hmpartname')
    }else if(key == 'hmpartnumber') {
      sql.field('part_number', 'hmpartnumber')
    }else if(key == 'hppartnumber') {
      sql.field('part_number', 'hppartnumber')
    }else if(key == 'hppartname') {
      sql.field('part_name', 'hppartname')
    }else if(key == 'hmmaterial') {
      sql.field('material_spec.material_spec_name', 'hmmaterial')
    }else if(key == 'hmthickness') {
      sql.field('thickness', 'hmthickness')
    }else if(key == 'hmpartssizespec') {
      sql.field('part_size_l', 'hmpartssizelength')
        .field('part_size_w', 'hmpartssizewidth')
        .field('part_size_h', 'hmpartssizehigh')
    }else if(key == 'hmpartssizewidth') {
      sql.field('part_size_w', 'hmpartssizewidth')
    }else if(key == 'hmpartssizelength') {
      sql.field('part_size_l', 'hmpartssizelength')
    }else if(key == 'hmpartssizehigh') {
      sql.field('part_size_h', 'hmpartssizehigh')
    }else if(key == 'hmpartsexpandsize') {
      sql.field('part_size_w2', 'hmpartsexpandwidth')
        .field('part_size_l2', 'hmpartsexpandlength')
    }else if(key == 'hmpartsexpandwidth') {
      sql.field('part_size_w2', 'hmpartsexpandwidth')
    }else if(key == 'hmpartsexpandlength') {
      sql.field('part_size_l2', 'hmpartsexpandlength')
    }else if(key == 'hpmaterialspec1') {
      sql.field('material_spec.material_spec_name', 'hpmaterialspec1')
    }else if(key == 'hpmaterial') {
      sql.field('material.material_name', 'hpmaterial')
    }else if(key == 'hpthickness') {
      sql.field('thickness', 'hpthickness')
    }else if(key == 'hppartssizespec') {
      sql.field('part_size_l', 'hppartssizelength')
        .field('part_size_w', 'hppartssizewidth')
        .field('part_size_h', 'hppartssizehigh')
    }else if(key == 'hppartssizelength') {
      sql.field('part_size_l', 'hppartssizelength')
    }else if(key == 'hppartssizewidth') {
      sql.field('part_size_w', 'hppartssizewidth')
    }else if(key == 'hppartssizehigh') {
      sql.field('part_size_h', 'hppartssizehigh')
    }else {
      sql.field('PC1.category_name', 'parts_ctgy_1')
        .field('PC2.category_name', 'parts_ctgy_2')
    }
    sql.from('bom_item_complete_version', 'Item')
      // .left_join('drop_down_item', 'material_spec', 'Item.material_spec = material_spec.id')
      // .left_join('drop_down_item', 'material', 'Item.material = material.id')
      // .left_join('drop_down_item', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      // .left_join('drop_down_item', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join('formula.part_category_1', 'PC1', 'Item.parts_ctgy_1 = PC1.id')
      .left_join('formula.part_category_2', 'PC2', 'Item.parts_ctgy_2 = PC2.id')
      .left_join(squel.select().field('part_cate1_id').field('part_cate1_name')
        .field('part_cate2_id').field('part_cate2_name').field('material_spec_id').field('material_spec_name')
        .from('formula.v_me_bom_materialspec_and_material_value').distinct()
        , 'material_spec', 'Item.material_spec = material_spec.material_spec_id and Item.parts_ctgy_1 = material_spec.part_cate1_id and Item.parts_ctgy_2 = material_spec.part_cate2_id')
      .left_join('formula.v_me_bom_materialspec_and_material_value', 'material'
        , 'Item.material = material.material_id and Item.parts_ctgy_1 = material.part_cate1_id and Item.parts_ctgy_2 = material.part_cate2_id and Item.material_spec=material.material_spec_id')
      .where('Item.id = ? and PC1.category_name = ? and PC2.category_name = ?', id, type1, type2)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? result.rows[0] : null
  },

  getPartlistConfig: async() => {
    let sql = squel.select()
      .field('b.format_key', 'format')
      .field('d.id', 'part_category_1_id')
      .field('d.category_name', 'part_category_1')
      .field('c.id', 'part_category_2_id')
      .field('c.category_name', 'part_category_2')
      .field('b.hasui', 'hasui')
      .from('wiprocurement.bom_partlist_config', 'a')
      .join('wiprocurement.bom_partlist_format', 'b', 'a.format = b.id')
      .right_join('formula.part_category_2', 'c', 'c.id = a.parts_ctgy_2')
      .left_join('formula.part_category_1', 'd', 'd.id = c.part_category_1_id')
      .toParam()
    const result = await systemDB.Query(sql)
    return result.rows
  },

  // eMDM 機台類型&CycleTime
  getPartlistDataByEmdmInfo: async(emdmVersion, projectCode, emdmppid, getPrice = false) => {
    let sql = squel.select()
      .field('bpv.partlist_value')
      .field('bpv.formate')
      .field('bp.project_code')
      .field('bp.source_version')
      .field('bi.id')
      .field('bi.version_id')
      .field('bi.source_item_id')
      .field('pt.id', 'product_type_id')
      .from('wiprocurement.bom_projects', 'bp')
      .left_join('wiprocurement.bom_stage_version', 'bsv', 'bp.id=bsv.bom_id')
      .left_join('wiprocurement.bom_item', 'bi', 'bi.version_id=bsv.id')
      .left_join('wiprocurement.bom_partlist_value', 'bpv', 'bpv.bom_item_id = bi.id')
      .left_join('formula.product_type', 'pt', 'bp.product_type = pt.type_name')
      .where('bp.project_code = ?', projectCode)
      .where('bp.source_version = ?', emdmVersion)
      .where('bi.source_item_id = ?', emdmppid)
    if (getPrice) {
      sql.field('bpv.partlist_price')
    }
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  },
  // eMDM 機台類型&CycleTime END
}
