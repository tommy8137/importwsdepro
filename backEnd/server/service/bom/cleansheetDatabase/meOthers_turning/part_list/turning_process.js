const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plTurningModel = require('../../../../../model/cleansheetDatabase/meOthers_truning/plTurning')
const { formatFloat } = require('../../../../../helpers/utils')
const { DecimalGetter } = require('../../../../../utils/decimalConfig/index.js')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const {  turningMaterialMap, turningDiameterMap, screwPlatingMap, screwNylokMap, screwNylokColorMap, screwNylokLengthMap, screwToothDiameter, nutTypeMap, screwMaterialSpecMap,
  standoffMaterialSpecMap } = require('../mapping/index')
const _ = require('lodash')
const floatPoint = new DecimalGetter('PartList')

class TurnningGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processDimeterValue(){
    _.forEach(this.values, (v) =>{
      v.dimterName = 'M' + v.outter_diameter
    })
  }
  processToothDimeterValue(){
    _.forEach(this.values, (v) =>{
      v.dimterName = 'M' + v.outter_diameter
      if (v.dimterName.split('.').length < 2) {
        v.dimterName += '.0'
      }
      v.outter_diameter = formatFloat(v.outter_diameter, floatPoint.get('turningScrewToothDiameter'))
    })
  }
}

module.exports = {
  getScrewNylok: async (paras) => {
    let getter = new TurnningGetter(screwNylokMap)
    getter.setValFunc = plTurningModel.getScrewNylok
    await getter.setValue(paras)
    return getter.get()
  },
  getScrewToothDiameter:async(paras) =>{
    let getter = new TurnningGetter(screwToothDiameter)
    getter.setValFunc = plTurningModel.getTurningDiameter
    await getter.setValue(paras)
    getter.processToothDimeterValue()
    return getter.get()
  },
  getTurningMaterial:async(paras) =>{
    let getter = new TurnningGetter(turningMaterialMap)
    getter.setValFunc = plTurningModel.getTurningHeatTreatment
    await getter.setValue(paras)
    return getter.get()

  },
  getTurningDiameter:async(paras) =>{
    let getter = new TurnningGetter(turningDiameterMap)
    getter.setValFunc = plTurningModel.getTurningDiameter
    await getter.setValue(paras)
    getter.processDimeterValue()
    return getter.get()
  },
  getScrewPlating:async(paras) =>{
    let getter = new TurnningGetter(screwPlatingMap)
    getter.setValFunc = plTurningModel.getScrewPlating
    await getter.setValue(paras)
    return getter.get()
  },
  getScrewNylokColor:async(paras) =>{
    let getter = new TurnningGetter(screwNylokColorMap)
    getter.setValFunc = plTurningModel.getScrewNylokColor
    await getter.setValue(paras)
    return getter.get()
  },
  getScrewNylokLength:async(paras) =>{
    let getter = new TurnningGetter(screwNylokLengthMap)
    getter.setValFunc = plTurningModel.getNylokLength
    await getter.setValue(paras)
    return getter.get()
  },
  getNutTypeValues: async () => {
    let getter = new TurnningGetter(nutTypeMap)
    getter.setValFunc = plTurningModel.nutTypeValues
    await getter.setValue()
    return getter.get()
  },
  getScrewMaterialSpec:async(paras) =>{
    let getter = new TurnningGetter(screwMaterialSpecMap)
    getter.setValFunc = plTurningModel.screwMaterialSpec
    await getter.setValue(paras)
    return getter.get()
  },
  getStandoffMaterialSpec:async(paras) =>{
    let getter = new TurnningGetter(standoffMaterialSpecMap)
    getter.setValFunc = plTurningModel.standoffMaterialSpec
    await getter.setValue(paras)
    return getter.get()
  },
}
