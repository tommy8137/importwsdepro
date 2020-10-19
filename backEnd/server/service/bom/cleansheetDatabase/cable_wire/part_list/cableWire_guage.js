const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plCableWireModel = require('../../../../../model/cleansheetDatabase/cable_wire/plCableWire')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { cableWireFlonguageMap, cableWireCoaxialguageMap } = require('../mapping/index')

class CableWireGuageGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getCableWireCoaxialGuage: async (paras) => {
    let getter = new CableWireGuageGetter(cableWireCoaxialguageMap)
    getter.setValFunc = plCableWireModel.getGuage
    await getter.setValue(paras)
    return getter.get()
  },
  getCableWireteflonGuage: async (paras) => {
    let getter = new CableWireGuageGetter(cableWireFlonguageMap)
    getter.setValFunc = plCableWireModel.getGuage
    await getter.setValue(paras)
    return getter.get()
  },
}