
const validator = require('validator')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('BomItemValidator')
const BOM_ITEM_LEVEL = ['DC/65', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const { BomValidWithRefNumber, BomValidWithParent, BomValidAll, BomValidWithNoNeedMaterialSpec } = require('./bomValidBase')

const generalItemCheck = (data) => {
  logger.debug('check by general verifier', data)
  let { bom_id, part_name, level, qty, func_ctgy, parts_ctgy_1, parts_ctgy_2, material_spec, supply_type, sub_leve, parent_level, odm_oem, initaddmodidel, part_number,
    sku0, sku1, sku2, sku3, sku4, sku5, spa_cost, suggestion_cost } = data
  if (!bom_id || !validator.isInt(bom_id.toString())) throw new Error('bom_id')
  if (!part_name || !validator.isLength(part_name, { min: 1, max: 100 })) throw new Error('part_name')
  // if (!qty || !validator.isInt(qty.toString(), { allow_leading_zeroes: false, min: 0 })) throw new Error('qty')
  if (!func_ctgy || !validator.isUUID(func_ctgy)) throw new Error('func_ctgy')
  if (!parts_ctgy_1 || !validator.isUUID(parts_ctgy_1)) throw new Error('parts_ctgy_1')
  // parts_ctgy_2為Null或是parts_ctgy_2不為UUID時
  if (!parts_ctgy_2 || !validator.isUUID(parts_ctgy_2)) {
    // 當level的選擇為'2'時，不一定需要填寫part category II
    if (BOM_ITEM_LEVEL.indexOf(level) != 1) {
      throw new Error('parts_ctgy_2')
    }
  }
  if (material_spec && !validator.isUUID(material_spec)) throw new Error('material_spec')
  if (supply_type != null && !validator.isUUID(supply_type)) throw new Error('supply_type')
  // 只有parent_level存在且不等於integer時
  if (parent_level && !validator.isLength(parent_level, { min: 1, max: 64 })) throw new Error('parent_level')
  if (BOM_ITEM_LEVEL.indexOf(level) < 0) throw new Error('level')
  if (sub_leve == null || !validator.isBoolean(sub_leve.toString())) throw new Error('sub_leve')
  if (!odm_oem || !validator.isUUID(odm_oem)) throw new Error('odm_oem')
  if (!initaddmodidel || !validator.isUUID(initaddmodidel)) throw new Error('initaddmodidel')
  if (part_number && !validator.isLength(part_number, { min: 1, max: 64 })) throw new Error('part_number')
  if (sku0 == null || sku0 == undefined || !validator.isNumeric(sku0.toString())) throw new Error('sku0')
  if (sku1 == null || sku1 == undefined || !validator.isNumeric(sku1.toString())) throw new Error('sku1')
  if (sku2 == null || sku2 == undefined || !validator.isNumeric(sku2.toString())) throw new Error('sku2')
  if (sku3 == null || sku3 == undefined || !validator.isNumeric(sku3.toString())) throw new Error('sku3')
  if (sku4 == null || sku4 == undefined || !validator.isNumeric(sku4.toString())) throw new Error('sku4')
  if (sku5 == null || sku5 == undefined || !validator.isNumeric(sku5.toString())) throw new Error('sku5')
  if(spa_cost && !validator.isNumeric(spa_cost)) throw new Error('spa_cost')
  if(suggestion_cost && !validator.isNumeric(suggestion_cost)) throw new Error('suggestion_cost')
}

const specificCheckOnSupplyType = (data) => {
  logger.debug('check by specific verifier, with supply type')
  let { bom_id, part_name, spa_cost, suggestion_cost, part_number, sku0, sku1, sku2, sku3, sku4, sku5 } = data
  if (!validator.isInt(bom_id.toString())) throw new Error('bom_id')
  if (!validator.isLength(part_name, { min: 1, max: 100 })) throw new Error('part_name')
  if (part_number && !validator.isLength(part_number, { min: 1, max: 64 })) throw new Error('part_number')
  if (spa_cost && !validator.isNumeric(spa_cost)) throw new Error('spa_cost')
  if (suggestion_cost && !validator.isNumeric(suggestion_cost)) throw new Error('suggestion_cost')
  if (sku0 != null && sku0 != undefined && !validator.isNumeric(sku0.toString())) throw new Error('sku0')
  if (sku1 != null && sku1 != undefined && !validator.isNumeric(sku1.toString())) throw new Error('sku1')
  if (sku2 != null && sku2 != undefined && !validator.isNumeric(sku2.toString())) throw new Error('sku2')
  if (sku3 != null && sku3 != undefined && !validator.isNumeric(sku3.toString())) throw new Error('sku3')
  if (sku4 != null && sku4 != undefined && !validator.isNumeric(sku4.toString())) throw new Error('sku4')
  if (sku5 != null && sku5 != undefined && !validator.isNumeric(sku5.toString())) throw new Error('sku5')
}

const specificCheckOnRFQ_PN = (data) => {
  logger.debug('check by specific verifier, with rfq pn')
  let { bom_id, part_name, qty } = data
  if (!validator.isInt(bom_id.toString())) throw new Error('bom_id')
  if (!validator.isLength(part_name, { min: 1, max: 40 })) throw new Error('part_name')
  if (!validator.isInt(qty.toString(), { allow_leading_zeroes: false, min: 0 })) throw new Error('qty')
}

const specificBomitemUploadCheck = (data, needCheckProductType) =>{
 
  if (needCheckProductType) {
    //20190711 following by import bom check spec
    if (!data.product_type) {
      logger.warn('bom item : missing Product Type')
      throw new Error('C000106')
    }
    //20190711 需判斷此 Product Type 與 Create BOM 時選擇之 Product Type 是否一致。 
    if (data.product_type && data.product_type != data.createBom_productType) {
      logger.warn('bom item : Product Type has wrong type')
      throw new Error('C000107')
    }
  }
  
  if (data.sku0 == null || data.sku0 == undefined) {
    logger.warn('bom item : missing sku0')
    throw new Error('C000108')
  }
  if (data.sku0 != null && data.sku0 != undefined && !validator.isNumeric(data.sku0.toString())) {
    logger.warn('bom item : sku0 has wrong type')
    throw new Error('C000109')
  }
  if (data.sku1 == null || data.sku1 == undefined) {
    logger.warn('bom item : missing sku1')
    throw new Error('C000108')
  }
  if (data.sku1 != null && data.sku1 != undefined && !validator.isNumeric(data.sku1.toString())) {
    logger.warn('bom item :sku1 has wrong type')
    throw new Error('C000109')
  }

  if (data.sku2 == null || data.sku2 == undefined) {
    logger.warn('bom item :missing sku2')
    throw new Error('C000108')
  }
  if (data.sku2 != null && data.sku2 != undefined && !validator.isNumeric(data.sku2.toString())) {
    logger.warn('bom item :sku2 has wrong type')
    throw new Error('C000109')
  }

  if (data.sku3 == null || data.sku3 == undefined) {
    logger.warn('bom item :missing sku3')
    throw new Error('C000108')
  }
  if (data.sku3 != null && data.sku3 != undefined && !validator.isNumeric(data.sku3.toString())) {
    logger.warn('bom item :sku3 has wrong type')
    throw new Error('C000109')
  }

  if (data.sku4 == null || data.sku4 == undefined) {
    logger.warn('bom item :missing sku4')
    throw new Error('C000108')
  }
  if (data.sku4 != null && data.sku4 != undefined && !validator.isNumeric(data.sku4.toString())) {
    logger.warn('bom item :sku4 has wrong type')
    throw new Error('C000109')
  }

  if (data.sku5 == null || data.sku5 == undefined) {
    logger.warn('bom item :missing sku5')
    throw new Error('C000108')
  }
  if (data.sku5 != null && data.sku5 != undefined && !validator.isNumeric(data.sku5.toString())) {
    logger.warn('bom item :missing sku5')
    throw new Error('C000109')
  }

  if (data.level == null || data.level == undefined) {
    logger.warn('bom item : missing level')
    throw new Error('C000110')
  }
  if (BOM_ITEM_LEVEL.indexOf(data.level) < 0) {
    logger.warn('bom item :level has wrong value')
    throw new Error('C000111')
  }
  // if is not parent level need parent part
  if (data.level != null && data.level != undefined && BOM_ITEM_LEVEL.indexOf(data.level) > 1) {
    if (data.parent_level == null || data.parent_level == undefined) {
      logger.warn('bom item :missing Parents Part Name')
      throw new Error('C000112')
    }
  }
 
  if (data.part_number && !validator.isLength(data.part_number, { min: 1, max: 64 })) {
    logger.warn('wistron part number has wrong type')
    throw new Error('C000151')
  }

  // 20190729 若 Leverage Common Part 或 Reference P/N 欄位有值，僅需填 
  // Part Number, SKU QTY, Level, Assy Category, Function Category
  if(data.ref_part_num && data.product_type){

    // 20200508 Server VoIP 還沒有此項目 改為非必填
    /* if (!data.gb_assy_ctgy) {
      logger.warn('bom item missing Assy Category')
      throw new Error('C000118')
    } */
    if (data.gb_assy_ctgy && !validator.isUUID(data.gb_assy_ctgy)) {
      logger.warn('bom item Assy Category has wrong value')
      throw new Error('C000119')
    }
  
    if (!data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
  }

  if(!data.ref_part_num){
    if (!data.odm_oem) {
      logger.warn('bom item missing odm/oem')
      throw new Error('C000115')
    }
    if (!validator.isUUID(data.odm_oem)) {
      logger.warn('bom item odm/oem has wrong value')
      throw new Error('C000116')
    }
    if (!data.parts_ctgy_1) {
      logger.warn('bom item missing Part Category 1')
      throw new Error('C000122')
    }
    if (!validator.isUUID(data.parts_ctgy_1)) {
      logger.warn('bom itemPart Category 1 has wrong value')
      throw new Error('C000123')
    }
    if (!data.part_name) {
      logger.warn('missing wistron part name')
      throw new Error('C000113')
    }
    if(!validator.isLength(data.part_name, { min: 1, max: 100 })){
      logger.warn('wistron part name has erong type')
      throw new Error('C000114')
    }
    // 20190729 母階有子階的料(level2 or DC/65)，僅需填SKU QTY, Level, Part Name, ODM/OEM, Assy Category, Function Category, Part Category I
    if(!data.hasChild){
      if (!data.parts_ctgy_2) {
        logger.warn('bom item missing Part Category 2')
        throw new Error('C000124')
      }
      if (!validator.isUUID(data.parts_ctgy_2)) {
        logger.warn('bom item Part Category 2 has wrong value')
        throw new Error('C000125')
      }
      if (!data.material_spec) {
        logger.warn('bom item missing Material Spec')
        throw new Error('C000128')
      }
      if (!validator.isUUID(data.material_spec)) {
        logger.warn('bom item Material Spec has wrong value')
        throw new Error('C000129')
      }
      // 20200508 Server VoIP 還沒有此項目 改為非必填
      /* if (!data.gb_assy_ctgy) {
        logger.warn('bom item missing Assy Category')
        throw new Error('C000118')
      } */
      if (data.gb_assy_ctgy && !validator.isUUID(data.gb_assy_ctgy)) {
        logger.warn('bom item Assy Category has wrong value')
        throw new Error('C000119')
      }
    
      if (!data.func_ctgy) {
        logger.warn('bom item missing Fuction Category')
        throw new Error('C000120')
      }
      if (!validator.isUUID(data.func_ctgy)) {
        logger.warn('bom item Fuction Category has wrong value')
        throw new Error('C000121')
      }
    }
  }

  if (data.material && !validator.isUUID(data.material)) {
    logger.warn('material has wrong type')
    throw new Error('C000129')
  }

  // 20190729 modofy by sepc If need new tooling click Y 欄位，改為非必填
  // if (!data.need_new_tooling) {
  //   logger.warn('bom item missing If need new tooling click Y')
  //   throw new Error('C000126')
  // }
  if (data.need_new_tooling && (data.need_new_tooling.toUpperCase() != 'Y' && data.need_new_tooling.toUpperCase() != 'N')) {
    logger.warn('bom item If need new tooling click Y has wrong type')
    throw new Error('C000127')
  }

  // if (!data.material) throw new Error('missing Material')

  if (data.part_size_l && !validator.isNumeric(data.part_size_l.toString())) {
    logger.warn('bom item L has wrong type')
    throw new Error('C000130')
  }
  if (data.part_size_w && !validator.isNumeric(data.part_size_w.toString())) {
    logger.warn('bom item W has wrong type')
    throw new Error('C000131')
  }
  if (data.part_size_h && !validator.isNumeric(data.part_size_h.toString())) {
    logger.warn('bom item H has wrong type')
    throw new Error('C000132')
  }
  if (data.part_size_ef && !validator.isNumeric(data.part_size_ef.toString())) {
    logger.warn('bom item Ф has wrong type')
    throw new Error('C000133')
  }
  if (data.part_size_m && !validator.isNumeric(data.part_size_m.toString())) {
    logger.warn('bom item M has wrong type')
    throw new Error('C000134')
  }
  if (data.part_size_l2 && !validator.isNumeric(data.part_size_l2.toString())) {
    logger.warn('bom item L2 has wrong type')
    throw new Error('C000135')
  }
  if (data.part_size_w2 && !validator.isNumeric(data.part_size_w2.toString())) {
    logger.warn('bom item W2 has wrong type')
    throw new Error('C000136')
  }
  if (data.thickness && !validator.isNumeric(data.thickness.toString())) {
    logger.warn('bom item Thickness has wrong type')
    throw new Error('C000137')
  }
  if (data.part_weight && !validator.isNumeric(data.part_weight.toString())) {
    logger.warn('bom item Weight has wrong type')
    throw new Error('C000138')
  }
  if (data.remark && !validator.isLength(data.remark, { min: 1, max: 100 })) {
    logger.warn('bom item remark over than length 100')
    throw new Error('C000139')
  }
}

module.exports = {
  bomItemValidator: (req) => {
    let { supply_type, ref_part_num } = req
    // check request parameter
    if (supply_type == 'a6560172-43cf-11e9-b34d-0242ac110002'/* AVAP */ || supply_type == 'a65a7478-43cf-11e9-b34d-0242ac110002' /* CoSign */) {
      specificCheckOnSupplyType(req)
    } else if (ref_part_num && ref_part_num.length > 0) {
      specificCheckOnRFQ_PN(req)
    } else {
      generalItemCheck(req)
    }
  },
  bomItemUplodaValidator:(req, needCheckProductType = true) =>{
    let validCheck = null
    
    if(req.ref_part_num){
      validCheck = new BomValidWithRefNumber(req, needCheckProductType)
    }else if(req.hasChild){
      validCheck = new BomValidWithParent(req, needCheckProductType)
    }else if(req.noNeedMaterialSpec){
      // 20190826 add without need check material spec
      validCheck = new BomValidWithNoNeedMaterialSpec(req, needCheckProductType)
    }else{
      validCheck = new BomValidAll(req, needCheckProductType)
    }
    validCheck.validInterface()
    // specificBomitemUploadCheck(req, needCheckProductType)
  },
}