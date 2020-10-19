const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMetalModel = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { glueMap, glueSyringeDiameter } = require('../mapping/index')

/*
class Glue extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
    this.setValFunc = plMetalModel.getGlue
  }
}
class GlueSyringeDiameter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
    this.setValFunc = plMetalModel.getGlueSyringeDiameter
  }
}*/
module.exports = {
  getGlue: async function(paras) {
    let getter = new ValueGetterWithMap(glueMap)
    getter.setValFunc = plMetalModel.getGlue.bind(this)
    await getter.setValue()
    return getter.get()
  },
  getGlueSyringeDiameter: async function(paras) {
    let getter = new ValueGetterWithMap(glueSyringeDiameter)
    getter.setValFunc = plMetalModel.getGlueSyringeDiameter.bind(this)
    await getter.setValue()
    return getter.get()
  },
}
