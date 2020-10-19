const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticPrintCountMap, plasticToolingBondedMap, plasticPaintingThicknessMap } = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor(keyMap) {
    super(keyMap)
    this.setValFunc = plPlasticModel.getPlasticCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}

module.exports = {
  getPlasticCommon: async function(paras) {
    let getter = new CommonGetter()
    getter.setValFunc = plPlasticModel.getPlasticCommon.bind(this)
    await getter.setValue(paras)
    return getter.getValue()
  },
  getPlasticPrintCount:async(paras) =>{
    let getter = new CommonMapGetter(plasticPrintCountMap)
    getter.setValFunc = plPlasticModel.getPlasticPrintCount
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticToolingBonder:async(paras) =>{
    let getter = new CommonMapGetter(plasticToolingBondedMap)
    getter.setValFunc = plPlasticModel.getPlasticToolingBonder
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPaintingThickness:async(paras) => {
    let getter = new CommonMapGetter(plasticPaintingThicknessMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintingThickness
    await getter.setValue(paras)
    return getter.get()
  },
}
