const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plCableWireModel = require('../../../../../model/cleansheetDatabase/cable_wire/plCableWire')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plCableWireModel.getWireCommon
  }
}
module.exports = {
  getCableWireCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
}
