
const plMetalModel = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const {
  housingMetalAnodeNameMap,
  housingMetalGlueCycleTimeMap,
  housingMetalBladeSiedMMap,
  housing_metal_tonnes,
  housing_metal_press_type,
  housingMetalPaintingThickness,
  housing_metal_module_machine_press,
  housing_metal_ultra_sonic_price,
} = require('../mapping/index')
const _ = require('lodash')


class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plMetalModel.getCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processUltrasonic(hosingMetalCtgy2){
    let res = []
    _.forEach(hosingMetalCtgy2.values, (ctgyItem) =>{
      let obj = {}
      if(ctgyItem.category_name && ctgyItem.category_name.indexOf('Aluminum') !== -1){
        let findALLossRate = _.find(this.values, (alItem) => {return alItem.label == 'ultrasonic_cleaning_cost_aluminum'})
        obj.id = findALLossRate ? findALLossRate.id : null
        obj.type2 = ctgyItem.category_name
        obj.unit_price = findALLossRate ? findALLossRate.value : null
      }else{
        let findALLossRate = _.find(this.values, (item) => {return item.label == 'ultrasonic_cleaning_cost'})
        obj.id = findALLossRate ? findALLossRate.id : null
        obj.type2 = ctgyItem.category_name
        obj.unit_price = findALLossRate ? findALLossRate.value : null
      }
      res.push(obj)
    })
    this.values = res
  }
}

module.exports = {
  getCommon: async function(paras) {
    let getter = new CommonGetter()
    getter.setValFunc = plMetalModel.getCommon.bind(this)
    await getter.setValue(paras)
    return getter.getValue()
  },
  /**
   * 一次取多個common value
   * @param {Array} paras
   * input
   * ?getMultiCommon:
        - key:test
        - housing_metal_material
        - material_metal_l_side_constant
        - key:test2
        - housing_metal_material
        - material_metal_l_side_constant
        - key:test3
        - housing_metal_material
        - material_metal_l_side_constant
   * output:
     { test: { value: 5 }, test2: { value: 5 }, test3: { value: 5 } }
   */
  getMultiCommon: async function(paras) {
    let paraGroup = []
    let result = {}
    paras.forEach((para, idx) => {
      let paraSplit = para.split(':')
      if (paraSplit[0].trim() === 'key') {
        let obj = {
          'key':paraSplit[1].trim(),
          'paras': [],
        }
        for (let i = idx + 1; i < paras.length; i++) {
          if (paras[i].split(':').length < 2) {
            obj.paras.push(paras[i])
          } else {
            break
          }
        }
        paraGroup.push(obj)
      }
    })
    for(let i = 0 ; i < paraGroup.length; i++){
      let obj = paraGroup[i]
      let getter = new CommonGetter()
      getter.setValFunc = plMetalModel.getCommon.bind(this)
      await getter.setValue(obj.paras)
      result[obj.key] = getter.getValue()
    }
    return result
  },
  getMetalTonnes: async function(paras) {
    let getter = new CommonMapGetter(housing_metal_tonnes)
    getter.setValFunc = plMetalModel.getTonnes.bind(this)
    await getter.setValue(paras)
    getter.sortValue((a, b) => {
      if (a.ton && b.ton) {
        return parseInt(a.ton) - parseInt(b.ton)
      } else {
        return 0
      }
    })
    return getter.get()
  },
  getMetalPressType:async function(paras){
    let getter = new CommonMapGetter(housing_metal_press_type)
    getter.setValFunc = plMetalModel.getPressType.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getMetalModuleMachinePressRate:async function(paras){
    let getter = new CommonMapGetter(housing_metal_module_machine_press)
    getter.setValFunc = plMetalModel.getModuleMachinePressPrice.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getMetalAnodeName:async(paras) =>{
    let getter = new CommonMapGetter(housingMetalAnodeNameMap)
    getter.setValFunc = plMetalModel.getMetalAnode
    await getter.setValue(paras)
    return getter.get()
  },
  getMetalGlueCycleTime:async(paras) =>{
    let getter = new CommonMapGetter(housingMetalGlueCycleTimeMap)
    getter.setValFunc = plMetalModel.getMetalGlueCycleTime
    await getter.setValue(paras)
    return getter.get()
  },
  getMetalSandBlastSide:async(paras) =>{
    let getter = new CommonMapGetter(housingMetalBladeSiedMMap)
    getter.setValFunc = plMetalModel.getMetalSandBlastSide
    await getter.setValue(paras)
    return getter.get()
  },
  getMetalPaintingThickness:async(paras) => {
    let getter = new CommonMapGetter(housingMetalPaintingThickness)
    getter.setValFunc = plMetalModel.getMetalPaintingThickness
    await getter.setValue(paras)
    return getter.get()
  },
  /**
   * 取得超音波清洗各type2的價格
   * @returns
    {
      values:[
        {
          ultrasonicCleanId: 'ba29f7f6-fa24-11e9-bc93-0242ac110002',
          type2: 'Metal',
          ultrasonicCleanUP: 0.00029
        },
        {
          ultrasonicCleanId: '44bde308-bba6-11ea-8a9b-0242ac110002',
          type2: 'Aluminum鋁皮外觀件單件or組立',
          ultrasonicCleanUP: 0.0016
        },
        {
          ultrasonicCleanId: 'ba29f7f6-fa24-11e9-bc93-0242ac110002',
          type2: 'Shielding_Can',
          ultrasonicCleanUP: 0.00029
        },
        {
          ultrasonicCleanId: 'ba29f7f6-fa24-11e9-bc93-0242ac110002',
          type2: 'C_GPU_BKT',
          ultrasonicCleanUP: 0.00029
        },
        {
          ultrasonicCleanId: 'ba29f7f6-fa24-11e9-bc93-0242ac110002',
          type2: 'HDD_SSD_BKT',
          ultrasonicCleanUP: 0.00029
        }
      ]
    }
   */
  getUltrasonicCleanUP:async function(paras)  {
    // 取得使用housing metal 的type2
    let typeGetter = new CommonGetter({})
    typeGetter.setValFunc = plMetalModel.getHosingMetalCatg2
    await typeGetter.setValue()

    // 取得 超音波清洗
    let getter = new CommonMapGetter(housing_metal_ultra_sonic_price)
    getter.setValFunc = plMetalModel.getCommon.bind(this)
    await getter.setValue(paras)
    getter.processUltrasonic(typeGetter.get())
    return getter.get()
  },
}
