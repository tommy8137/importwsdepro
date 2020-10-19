const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plDiecutModel = require('../../../../../model/cleansheetDatabase/die_cut/plDieCut')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { dieCutMaterialMap, dieCutAreatimeMap, dieCutReleasePaperMap, dieCutStampingMap, dieCutMaterialAdder } = require('../mapping/index')
const _ = require('lodash')

class DieCutMaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  // process data for fit yaml data structure
  processAreatimeData() {
    let res = []
    _.forEach(this.values, (v, idx) => {
      let obj = {}
      obj.id = v.id
      obj.sub_id = v.id
      obj.min_id = v.id
      if (idx == 0) {
        obj.min = 0
        obj.max = v.area_size
        obj.value = v.value
        obj.subMin = 0
        obj.subMax = v.area_size
        obj.subValue = v.value
        obj.minorMin = 0
        obj.minormax = v.area_size
        obj.minorValue = v.value
      } else {
        obj.min = this.values[idx - 1].area_size
        obj.max = v.area_size
        obj.value = v.value
        obj.subMin = this.values[idx - 1].area_size
        obj.subMax = v.area_size
        obj.subValue = v.value
        obj.minorMin = this.values[idx - 1].area_size
        obj.minormax = v.area_size
        obj.minorValue = v.value
      }
      res.push(obj)
    })
    this.values = res
  }

  // process data for fit yaml data structure
  processStampTypeData(){
    let groupValues = _.groupBy(this.values, 'type_name')
    let res = []
    _.forEach(Object.keys(groupValues), (v) =>{
      let obj = {}
      let val = groupValues[v]
      let value = val[0] ? val[0].value : null
      obj.id = val[0].id
      obj.typeName = v
      obj.price = value
      obj.minor_id = val[0].id
      obj.minorTypeName = v
      obj.minorPrice = value
      obj.sub_id = val[0].id
      obj.subTypeName = v
      obj.subPrice = value
      if(v && v.indexOf('沖切') > -1){
        obj.type = 1
        obj.minorType = 1
        obj.subType = 1
      }else{
        obj.type = 0
        obj.minorType = 0
        obj.subType = 0
      }
      res.push(obj)
    })
    this.values = res
  }

  processMaterialData(){
    let res = []
    _.forEach(this.values, (v) =>{
      let obj = {}
      obj.category_2_id = v.parts_ctgy_2_id
      obj.category_2_name = v.category_2_name
      obj.material_spec_id = v.material_spec_id
      obj.material_spec_name = v.material_spec_name
      obj.material_id = v.material_id
      obj.material_name = v.material_name
      obj.value = v.value
      obj.subCategory_2_id = v.parts_ctgy_2_id
      obj.subCategory_2_name = v.category_2_name
      obj.subMaterial_spec_id = v.material_spec_id
      obj.subMaterial_spec_name = v.material_spec_name
      obj.subMaterial_id = v.material_id
      obj.subMaterial_name = v.material_name
      obj.subValue = v.value
      obj.minorCategory_2_name = v.category_2_name
      obj.minorCategory_2_id = v.parts_ctgy_2_id
      obj.minorMaterial_spec_name = v.material_spec_name
      obj.minorMaterial_spec_id = v.material_spec_id
      obj.minorMaterial_name = v.material_name
      obj.minorMaterial_id = v.material_id
      obj.minorValue = v.value
      obj.activate_date = v.activate_date
      res.push(obj)
    })
    this.values = res
  }
}
module.exports = {
  getDiecutMaterial: async (paras) => {
    let getter = new DieCutMaterialGetter(dieCutMaterialMap)
    getter.setValFunc = plDiecutModel.getMaterial
    await getter.setValue(paras)
    getter.processMaterialData()
    return getter.get()
  },
  getDiecutAreaTime:async (paras) =>{
    let getter = new DieCutMaterialGetter(dieCutAreatimeMap)
    getter.setValFunc = plDiecutModel.getAreaTime
    await getter.setValue(paras)
    getter.processAreatimeData()
    return getter.get()
  },
  getDiecutReleasePaper:async(paras) =>{
    let getter = new DieCutMaterialGetter(dieCutReleasePaperMap)
    getter.setValFunc = plDiecutModel.getReleasePaper
    await getter.setValue(paras)
    return getter.get()
  },
  getDiecutStampingType:async(paras) =>{
    let getter = new DieCutMaterialGetter(dieCutStampingMap)
    getter.setValFunc = plDiecutModel.getType
    await getter.setValue(paras)
    getter.processStampTypeData()
    return getter.get()
  },
  getDiecutMaterialAddeer:async(paras) =>{
    let getter = new DieCutMaterialGetter(dieCutMaterialAdder)
    getter.setValFunc = plDiecutModel.getMaterialAdder
    await getter.setValue(paras)
    return getter.get()
  },
}
