const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMetalModel = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { anodeColorMap, secondAnodeColorMap } = require('../mapping/index')

class ListAnodeColor extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}

module.exports = {
  getAnodeColor: async function(paras) {
    let getter = new ListAnodeColor(anodeColorMap)
    getter.setValFunc = plMetalModel.getAnode.bind(this)
    await getter.setValue()
    return getter.get()
  },
  getSecondAnodeColor: async function(paras) {
    let getter = new ListAnodeColor(secondAnodeColorMap)
    getter.setValFunc = plMetalModel.getAnode.bind(this)
    await getter.setValue()
    return getter.get()
  },
}
