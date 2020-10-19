const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plGraphiteModel = require('../../../../../model/cleansheetDatabase/thermal_graphite/plGraphite')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { thermalGraphiteLayerMap, thermalGraphiteLayerMap1, thermalGraphiteLayerMap2 } = require('../mapping/index')

class GraphiteLayerGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

}
module.exports = {
  getGraphiteLayer: async (paras) => {
    let getter = new GraphiteLayerGetter(thermalGraphiteLayerMap)
    getter.setValFunc = plGraphiteModel.getGraphiteLayer
    await getter.setValue(paras)
    return getter.get()
  },
  getGraphiteLayer1: async (paras) => {
    let getter = new GraphiteLayerGetter(thermalGraphiteLayerMap1)
    getter.setValFunc = plGraphiteModel.getGraphiteLayer
    await getter.setValue(paras)
    return getter.get()
  },
  getGraphiteLayer2: async (paras) => {
    let getter = new GraphiteLayerGetter(thermalGraphiteLayerMap2)
    getter.setValFunc = plGraphiteModel.getGraphiteLayer
    await getter.setValue(paras)
    return getter.get()
  },
}