const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMetalModel = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { materialMap, housing_metal_material_loss_rate, housing_metal_material_width, housing_metal_material_length, materialDropDown } = require('../mapping/index')
const _ = require('lodash')


class MaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processLossRate(hosingMetalCtgy2){
    let res = []
    _.forEach(hosingMetalCtgy2.values, (v) =>{
      let obj = {}
      if(v.category_name && v.category_name.indexOf('Aluminum') !== -1){
        let findALLossRate = _.find(this.values, (v) => {return v.label == 'material_AL_loss_rate'})
        obj.id = findALLossRate ? findALLossRate.id : null
        obj.type2 = v.category_name
        obj.loss_rate = findALLossRate ? findALLossRate.value : null
      }else{
        let findALLossRate = _.find(this.values, (v) => {return v.label == 'material_Metal_loss_rate'})
        obj.id = findALLossRate ? findALLossRate.id : null
        obj.type2 = v.category_name
        obj.loss_rate = findALLossRate ? findALLossRate.value : null
      }
      res.push(obj)
    })
    this.values = res
  }

  processSideConstant(hosingMetalCtgy2, side){
    let res = []
    _.forEach(hosingMetalCtgy2.values, (v) =>{
      let obj = {}
      if(v.category_name && v.category_name.indexOf('Aluminum') !== -1){
        let findRes = _.find(this.values, (v) => {return v.label == `material_aluminum_${side}_side_constant`})
        obj.id = findRes ? findRes.id : null
        obj.type2Id = v.category_id
        obj.type2 = v.category_name
        obj.side_constant = findRes ? findRes.value : null
      }else{
        let findRes = _.find(this.values, (v) => {return v.label == `material_metal_${side}_side_constant`})
        obj.id = findRes ? findRes.id : null
        obj.type2Id = v.category_id
        obj.type2 = v.category_name
        obj.side_constant = findRes ? findRes.value : null
      }
      res.push(obj)
    })
    this.values = res
  }
}
module.exports = {
  getMaterial: async (paras) => {
    let getter = new MaterialGetter(materialMap)
    getter.setValFunc = plMetalModel.getMaterial
    await getter.setValue()
    return getter.get()
  },
  getMaterialLossRate: async function(paras) {
    // 取得使用housing metal 的type2
    let typeGetter = new MaterialGetter({})
    typeGetter.setValFunc = plMetalModel.getHosingMetalCatg2
    await typeGetter.setValue()

    // 取得 material_loss_rate
    let getter = new MaterialGetter(housing_metal_material_loss_rate)
    getter.setValFunc = plMetalModel.getCommon.bind(this)
    await getter.setValue(paras)
    getter.processLossRate(typeGetter.get())

    return getter.get()
  },
  getMaterialSideConstant: async function(paras) {
    // 取得使用housing metal 的type2
    let typeGetter = new MaterialGetter({})
    typeGetter.setValFunc = plMetalModel.getHosingMetalCatg2
    await typeGetter.setValue()

    let type = paras[1].trim().toLowerCase()
    let keyMap = null
    if (type === 'l') {
      keyMap = housing_metal_material_length
    }
    if (type === 'w') {
      keyMap = housing_metal_material_width
    }
    let getter = new MaterialGetter(keyMap)
    getter.setValFunc = plMetalModel.getCommon.bind(this)
    await getter.setValue([paras[0]])
    getter.processSideConstant(typeGetter.get(), type)

    return getter.get()
  },
  getMetalMaterialDropDownList: async function() {
    let getter = new MaterialGetter(materialDropDown)
    getter.setValFunc = plMetalModel.getMetalMaterialDropDownList
    await getter.setValue()
    return getter.get()
  }
}
