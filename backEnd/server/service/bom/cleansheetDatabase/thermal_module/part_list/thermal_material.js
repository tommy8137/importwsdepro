const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const plMetal = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetterWithMap } = require('../../../plCommon')
const {
  thermal_modul_adhesive_material,
  thermal_clip_material,
  thermal_fan_blade_material,
  thermal_fin_material_density,
  thermal_fin_material,
  thermal_modul_mylar_material,
  thermal_modul_sponge_material,
  thermal_module_block_material_density,
  thermal_modul_block_material_thickness,
  thermal_module_plate_material_density,
  thermal_modul_plate_material_thickness,
} = require('../mapping/index')
const _ = require('lodash')

class MaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processThicknessData(){
    _.forEach(this.values, (v) =>{
      if(v.material_spec_name){
        // v.thickness = v.material_spec_name.replace(/(?:\\[rn]|[\u4E00-\u9FA5]|[A-Z]|[a-z]|[*]|[\r\n]+)+/g, '').replace(/ /g, '')
        v.thickness = v.material_spec_name
      }
    })
  }

  processMaterialDensity(){
    let res = []
    _.forEach(this.values, (v) =>{
      let obj = {}
      if(v.name){
        let findRes = _.find(res, (dv) => {return dv.material_name == v.name})
        if(!findRes){
          obj.material_name = v.name
          obj.material_density = v.density
          res.push(obj)
        }
      }
    })
    this.values = res
  }

  procseeMaterialThickness() {
    this.values = _.filter(this.values, (v) => {return v.thickness})
  }
}
module.exports = {
  getThermalmylarAdhesiveMaterial: async (paras) => {
    let getter = new MaterialGetter(thermal_modul_adhesive_material)
    getter.setValFunc = plThermalModel.getThermalCommonMaterial
    await getter.setValue(paras)
    // getter.processThicknessData()
    return getter.get()
  },
  getThermalmylarMaterial: async (paras) => {
    let getter = new MaterialGetter(thermal_modul_mylar_material)
    getter.setValFunc = plThermalModel.getThermalCommonMaterial
    await getter.setValue(paras)
    // getter.processThicknessData()
    return getter.get()
  },
  getThermalSpongeMaterial: async (paras) => {
    let getter = new MaterialGetter(thermal_modul_sponge_material)
    getter.setValFunc = plThermalModel.getThermalCommonMaterial
    await getter.setValue(paras)
    // getter.processThicknessData()
    return getter.get()
  },
  getClipMaterial:async(paras) =>{
    let getter = new MaterialGetter(thermal_clip_material)
    getter.setValFunc = plMetal.getMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getFanBladeMaterial:async(paras) =>{
    let getter = new MaterialGetter(thermal_fan_blade_material)
    getter.setValFunc = plThermalModel.getFanBladeMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getFinMaterialDensity:async(paras) =>{
    let getter = new MaterialGetter(thermal_fin_material_density)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getFinMaterialThickness:async(paras) =>{
    let getter = new MaterialGetter(thermal_fin_material)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalBlockMaterialDensity:async(paras) =>{
    let getter = new MaterialGetter(thermal_module_block_material_density)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    getter.processMaterialDensity()
    return getter.get()
  },
  getThermalBlockMaterialThickness:async(paras) =>{
    let getter = new MaterialGetter(thermal_modul_block_material_thickness)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    // getter.procseeMaterialThickness()
    return getter.get()
  },
  getThermalPlateMaterialDensity:async(paras) =>{
    let getter = new MaterialGetter(thermal_module_plate_material_density)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    getter.processMaterialDensity()
    return getter.get()
  },
  getThermalPlateMaterialThickness:async(paras) =>{
    let getter = new MaterialGetter(thermal_modul_plate_material_thickness)
    // getter.setValFunc = plMetal.getMaterial
    getter.setValFunc = plThermalModel.getThermalMaterial
    await getter.setValue(paras)
    // getter.procseeMaterialThickness()
    // console.log('==========getThermalPlateMaterialThickness===========>', getter.get())
    return getter.get()
  },
}