const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plGraphiteModel = require('../../../../../model/cleansheetDatabase/thermal_graphite/plGraphite')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { thermalProcessLayerMap } = require('../mapping/index')

class GraphiteProcessGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getGraphiteProcess: async (paras) => {
    let getter = new GraphiteProcessGetter(thermalProcessLayerMap)
    getter.setValFunc = plGraphiteModel.getGraphiteProcess
    await getter.setValue(paras)
    return getter.get()
  },

}