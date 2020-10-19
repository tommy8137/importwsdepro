const validator = require('validator')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('BomItemValidator')
const BOM_ITEM_LEVEL = ['DC/65', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

class MeBomItemValidBase {
  constructor(data, needCheckProductType = false) {
    this.data = data
    this.needCheckProductType = needCheckProductType
    this.validBase()
  }

  validInterface() {
  }

  validBase() {
    if(this.needCheckProductType){
      if (!this.data.product_type) {
        logger.warn('bom item : missing Product Type')
        throw new Error('C000106')
      }
      //20190711 需判斷此 Product Type 與 Create BOM 時選擇之 Product Type 是否一致。 
      if (this.data.product_type && this.data.product_type != this.data.createBom_productType) {
        logger.warn('bom item : Product Type has wrong type')
        throw new Error('C000107')
      }
    }
   
    if (this.data.sku0 == null || this.data.sku0 == undefined) {
      logger.warn('bom item : missing sku0')
      throw new Error('C000108')
    }
    if (this.data.sku0 != null && this.data.sku0 != undefined && !validator.isNumeric(this.data.sku0.toString())) {
      logger.warn('bom item : sku0 has wrong type')
      throw new Error('C000109')
    }
    if (this.data.sku1 == null || this.data.sku1 == undefined) {
      logger.warn('bom item : missing sku1')
      throw new Error('C000153')
    }
    if (this.data.sku1 != null && this.data.sku1 != undefined && !validator.isNumeric(this.data.sku1.toString())) {
      logger.warn('bom item :sku1 has wrong type')
      throw new Error('C000154')
    }

    if (this.data.sku2 == null || this.data.sku2 == undefined) {
      logger.warn('bom item :missing sku2')
      throw new Error('C000155')
    }
    if (this.data.sku2 != null && this.data.sku2 != undefined && !validator.isNumeric(this.data.sku2.toString())) {
      logger.warn('bom item :sku2 has wrong type')
      throw new Error('C000156')
    }

    if (this.data.sku3 == null || this.data.sku3 == undefined) {
      logger.warn('bom item :missing sku3')
      throw new Error('C000157')
    }
    if (this.data.sku3 != null && this.data.sku3 != undefined && !validator.isNumeric(this.data.sku3.toString())) {
      logger.warn('bom item :sku3 has wrong type')
      throw new Error('C000158')
    }

    if (this.data.sku4 == null || this.data.sku4 == undefined) {
      logger.warn('bom item :missing sku4')
      throw new Error('C000159')
    }
    if (this.data.sku4 != null && this.data.sku4 != undefined && !validator.isNumeric(this.data.sku4.toString())) {
      logger.warn('bom item :sku4 has wrong type')
      throw new Error('C000160')
    }

    if (this.data.sku5 == null || this.data.sku5 == undefined) {
      logger.warn('bom item :missing sku5')
      throw new Error('C000161')
    }
    if (this.data.sku5 != null && this.data.sku5 != undefined && !validator.isNumeric(this.data.sku5.toString())) {
      logger.warn('bom item :missing sku5')
      throw new Error('C000162')
    }

    if (this.data.level == null || this.data.level == undefined) {
      logger.warn('bom item : missing level')
      throw new Error('C000110')
    }

    if (BOM_ITEM_LEVEL.indexOf(this.data.level) < 0) {
      logger.warn('bom item :level has wrong value')
      throw new Error('C000111')
    }
    // if is not parent level need parent part
    if (this.data.level != null && this.data.level != undefined && BOM_ITEM_LEVEL.indexOf(this.data.level) > 1) {
      if (this.data.parent_level == null || this.data.parent_level == undefined) {
        logger.warn('bom item :missing Parents Part Name')
        throw new Error('C000112')
      }
    }

    if (this.data.part_number && !validator.isLength(this.data.part_number, { min: 1, max: 64 })) {
      logger.warn('wistron part number has wrong type')
      throw new Error('C000151')
    }

    if (this.data.material && !validator.isUUID(this.data.material)) {
      logger.warn('material has wrong type')
      throw new Error('C000129')
    }

    if (this.data.need_new_tooling && (this.data.need_new_tooling.toUpperCase() != 'Y' && this.data.need_new_tooling.toUpperCase() != 'N')) {
      logger.warn('bom item If need new tooling click Y has wrong type')
      throw new Error('C000127')
    }

    if (this.data.part_size_l && !validator.isNumeric(this.data.part_size_l.toString())) {
      logger.warn('bom item L has wrong type')
      throw new Error('C000130')
    }
    if (this.data.part_size_w && !validator.isNumeric(this.data.part_size_w.toString())) {
      logger.warn('bom item W has wrong type')
      throw new Error('C000131')
    }
    if (this.data.part_size_h && !validator.isNumeric(this.data.part_size_h.toString())) {
      logger.warn('bom item H has wrong type')
      throw new Error('C000132')
    }
    if (this.data.part_size_ef && !validator.isNumeric(this.data.part_size_ef.toString())) {
      logger.warn('bom item Ф has wrong type')
      throw new Error('C000133')
    }
    if (this.data.part_size_m && !validator.isNumeric(this.data.part_size_m.toString())) {
      logger.warn('bom item M has wrong type')
      throw new Error('C000134')
    }
    if (this.data.part_size_l2 && !validator.isNumeric(this.data.part_size_l2.toString())) {
      logger.warn('bom item L2 has wrong type')
      throw new Error('C000135')
    }
    if (this.data.part_size_w2 && !validator.isNumeric(this.data.part_size_w2.toString())) {
      logger.warn('bom item W2 has wrong type')
      throw new Error('C000136')
    }
    if (this.data.thickness && !validator.isNumeric(this.data.thickness.toString())) {
      logger.warn('bom item Thickness has wrong type')
      throw new Error('C000137')
    }
    if (this.data.part_weight && !validator.isNumeric(this.data.part_weight.toString())) {
      logger.warn('bom item Weight has wrong type')
      throw new Error('C000138')
    }
    if (this.data.remark && !validator.isLength(this.data.remark, { min: 1, max: 500 })) {
      logger.warn('bom item remark over than length 500')
      throw new Error('C000139')
    }
  }
}

class BomValidWithRefNumber extends MeBomItemValidBase {
  constructor(data, needCheckProductType = false) {
    super(data, needCheckProductType)
    this.data = data
    this.needCheckProductType = needCheckProductType
  }
  validInterface() {
    // 20200508 Server VoIP 還沒有此項目 改為非必填
    /* if (!this.data.gb_assy_ctgy) {
      logger.warn('bom item missing Assy Category')
      throw new Error('C000118')
    } */
    if (this.data.gb_assy_ctgy && !validator.isUUID(this.data.gb_assy_ctgy)) {
      logger.warn('bom item Assy Category has wrong value')
      throw new Error('C000119')
    }

    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
  }
}

class BomValidWithParent extends MeBomItemValidBase {
  constructor(data, needCheckProductType = false) {
    super(data, needCheckProductType)
    this.data = data
    this.needCheckProductType = needCheckProductType
  }
  validInterface() {
    if (!this.data.odm_oem) {
      logger.warn('bom item missing odm/oem')
      throw new Error('C000115')
    }
    if (!validator.isUUID(this.data.odm_oem)) {
      logger.warn('bom item odm/oem has wrong value')
      throw new Error('C000116')
    }
    // 20200508 Server VoIP 還沒有此項目 改為非必填
    /* if (!this.data.gb_assy_ctgy) {
      logger.warn('bom item missing Assy Category')
      throw new Error('C000118')
    } */
    if (this.data.gb_assy_ctgy && !validator.isUUID(this.data.gb_assy_ctgy)) {
      logger.warn('bom item Assy Category has wrong value')
      throw new Error('C000119')
    }
    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
    if (!this.data.parts_ctgy_1) {
      logger.warn('bom item missing Part Category 1')
      throw new Error('C000122')
    }
    if (!validator.isUUID(this.data.parts_ctgy_1)) {
      logger.warn('bom itemPart Category 1 has wrong value')
      throw new Error('C000123')
    }
    if (!this.data.parts_ctgy_2) {
      logger.warn('bom item missing Part Category 2')
      throw new Error('C000124')
    }
    if (!validator.isUUID(this.data.parts_ctgy_2)) {
      logger.warn('bom item Part Category 2 has wrong value')
      throw new Error('C000125')
    }
    if (!this.data.part_name) {
      logger.warn('missing wistron part name')
      throw new Error('C000113')
    }
    if (!validator.isLength(this.data.part_name, { min: 1, max: 100 })) {
      logger.warn('wistron part name has erong type')
      throw new Error('C000114')
    }
  }
}

class BomValidAll extends MeBomItemValidBase {
  constructor(data, needCheckProductType = false) {
    super(data, needCheckProductType)
    this.data = data
    this.needCheckProductType = needCheckProductType
  }
  validInterface() {
    //20190711 following by import bom check spec
    if (!this.data.product_type) {
      logger.warn('bom item : missing Product Type')
      throw new Error('C000106')
    }
    //20190711 需判斷此 Product Type 與 Create BOM 時選擇之 Product Type 是否一致。 
    if (this.data.product_type && this.data.product_type != this.data.createBom_productType) {
      logger.warn('bom item : Product Type has wrong type')
      throw new Error('C000107')
    }
    // 20200508 Server VoIP 還沒有此項目 改為非必填
    /* if (!this.data.gb_assy_ctgy) {
      logger.warn('bom item missing Assy Category')
      throw new Error('C000118')
    } */
    if (this.data.gb_assy_ctgy && !validator.isUUID(this.data.gb_assy_ctgy)) {
      logger.warn('bom item Assy Category has wrong value')
      throw new Error('C000119')
    }

    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
    if (!this.data.odm_oem) {
      logger.warn('bom item missing odm/oem')
      throw new Error('C000115')
    }
    if (!validator.isUUID(this.data.odm_oem)) {
      logger.warn('bom item odm/oem has wrong value')
      throw new Error('C000116')
    }
    if (!this.data.parts_ctgy_1) {
      logger.warn('bom item missing Part Category 1')
      throw new Error('C000122')
    }
    if (!validator.isUUID(this.data.parts_ctgy_1)) {
      logger.warn('bom itemPart Category 1 has wrong value')
      throw new Error('C000123')
    }
    if (!this.data.part_name) {
      logger.warn('missing wistron part name')
      throw new Error('C000113')
    }
    if (!validator.isLength(this.data.part_name, { min: 1, max: 100 })) {
      logger.warn('wistron part name has erong type')
      throw new Error('C000114')
    }
    if (!this.data.parts_ctgy_2) {
      logger.warn('bom item missing Part Category 2')
      throw new Error('C000124')
    }
    if (!validator.isUUID(this.data.parts_ctgy_2)) {
      logger.warn('bom item Part Category 2 has wrong value')
      throw new Error('C000125')
    }
    if (!this.data.material_spec) {
      logger.warn('bom item missing Material Spec')
      throw new Error('C000128')
    }
    if (!validator.isUUID(this.data.material_spec)) {
      logger.warn('bom item Material Spec has wrong value')
      throw new Error('C000129')
    }

    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
  }
}

class BomValidWithNoNeedMaterialSpec extends MeBomItemValidBase {
  constructor(data, needCheckProductType = false) {
    super(data, needCheckProductType)
    this.data = data
    this.needCheckProductType = needCheckProductType
  }
  validInterface() {
    //20190711 following by import bom check spec
    if (!this.data.product_type) {
      logger.warn('bom item : missing Product Type')
      throw new Error('C000106')
    }
    //20190711 需判斷此 Product Type 與 Create BOM 時選擇之 Product Type 是否一致。 
    if (this.data.product_type && this.data.product_type != this.data.createBom_productType) {
      logger.warn('bom item : Product Type has wrong type')
      throw new Error('C000107')
    }
    // 20200508 Server VoIP 還沒有此項目 改為非必填
    /* if (!this.data.gb_assy_ctgy) {
      logger.warn('bom item missing Assy Category')
      throw new Error('C000118')
    } */
    if (this.data.gb_assy_ctgy && !validator.isUUID(this.data.gb_assy_ctgy)) {
      logger.warn('bom item Assy Category has wrong value')
      throw new Error('C000119')
    }

    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
    if (!this.data.odm_oem) {
      logger.warn('bom item missing odm/oem')
      throw new Error('C000115')
    }
    if (!validator.isUUID(this.data.odm_oem)) {
      logger.warn('bom item odm/oem has wrong value')
      throw new Error('C000116')
    }
    if (!this.data.parts_ctgy_1) {
      logger.warn('bom item missing Part Category 1')
      throw new Error('C000122')
    }
    if (!validator.isUUID(this.data.parts_ctgy_1)) {
      logger.warn('bom itemPart Category 1 has wrong value')
      throw new Error('C000123')
    }
    if (!this.data.part_name) {
      logger.warn('missing wistron part name')
      throw new Error('C000113')
    }
    if (!validator.isLength(this.data.part_name, { min: 1, max: 100 })) {
      logger.warn('wistron part name has erong type')
      throw new Error('C000114')
    }
    if (!this.data.parts_ctgy_2) {
      logger.warn('bom item missing Part Category 2')
      throw new Error('C000124')
    }
    if (!validator.isUUID(this.data.parts_ctgy_2)) {
      logger.warn('bom item Part Category 2 has wrong value')
      throw new Error('C000125')
    }
    if (this.data.material_spec && !validator.isUUID(this.data.material_spec)) {
      logger.warn('bom item Material Spec has wrong value')
      throw new Error('C000129')
    }
    if (!this.data.func_ctgy) {
      logger.warn('bom item missing Fuction Category')
      throw new Error('C000120')
    }
    if (!validator.isUUID(this.data.func_ctgy)) {
      logger.warn('bom item Fuction Category has wrong value')
      throw new Error('C000121')
    }
  }
}

module.exports = { BomValidWithRefNumber, BomValidWithParent, BomValidAll, BomValidWithNoNeedMaterialSpec }
