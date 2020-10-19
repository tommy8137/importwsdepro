const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plCableWireModel = require('../../../../../model/cleansheetDatabase/cable_wire/plCableWire')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { cableWireConnectorMap } = require('../mapping/index')

class CableWireConnectorGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getCableWireConnector: async (paras) => {
    let getter = new CableWireConnectorGetter(cableWireConnectorMap)
    getter.setValFunc = plCableWireModel.getWireConnector
    await getter.setValue(paras)
    return getter.get()
  },
}