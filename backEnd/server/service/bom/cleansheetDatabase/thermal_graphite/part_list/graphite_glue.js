const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plGraphiteModel = require('../../../../../model/cleansheetDatabase/thermal_graphite/plGraphite')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { thermalGraphiteGlueMap, thermalGraphiteGlueMap1, thermalGraphiteGlueMap2, thermalGraphitePetMap } = require('../mapping/index')

class GraphiteGlueGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getGraphiteGlue: async (paras) => {
    let getter = new GraphiteGlueGetter(thermalGraphiteGlueMap)
    getter.setValFunc = plGraphiteModel.getGlueLayer
    await getter.setValue(paras)
    return getter.get()
  },
  getGraphiteGlue1: async (paras) => {
    let getter = new GraphiteGlueGetter(thermalGraphiteGlueMap1)
    getter.setValFunc = plGraphiteModel.getGlueLayer
    await getter.setValue(paras)
    return getter.get()
  },
  getGraphiteGlue2: async (paras) => {
    let getter = new GraphiteGlueGetter(thermalGraphiteGlueMap2)
    getter.setValFunc = plGraphiteModel.getGlueLayer
    await getter.setValue(paras)
    return getter.get()
  },

  getGraphitePet: async (paras) => {
    let getter = new GraphiteGlueGetter(thermalGraphitePetMap)
    getter.setValFunc = plGraphiteModel.getPetLayer
    await getter.setValue(paras)
    return getter.get()
  },

}