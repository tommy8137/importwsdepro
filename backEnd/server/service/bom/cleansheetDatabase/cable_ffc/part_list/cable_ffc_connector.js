const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plFfcModel = require('../../../../../model/cleansheetDatabase/cable_ffc/plFfc')
const plFfcDtAioModel = require('../../../../../model/cleansheetDatabase/cable_ffc/plFfcDtAio')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { cable_ffc_connector, cable_ffc_dt_aio_connector } = require('../mapping/index')

class CableWireFfcConnectorGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getCableWireFfcConnector: async function (paras){
    let getter = new CableWireFfcConnectorGetter(cable_ffc_connector)
    getter.setValFunc = plFfcModel.getFfcConnector
    await getter.setValue(paras)
    return getter.get()
  },
  getFFCConnectorType: async function (paras){ // DT AIO
    let getter = new CableWireFfcConnectorGetter(cable_ffc_dt_aio_connector)
    getter.setValFunc = plFfcDtAioModel.getFfcConnector.bind(this)
    await getter.setValue(paras)
    getter.sortValue((a, b) => {
      let type = a.category_name - b.category_name
      let assemblyType = a.spec_name - b.spec_name
      let pitch = parseInt(a.pitch, 10) - parseInt(b.pitch, 10)
      let row = parseInt(a.row, 10) - parseInt(b.row, 10)
      let pin = parseInt(a.pin, 10) - parseInt(b.pin, 10)
      let value = parseFloat(a.value) - parseFloat(b.value)
      return (type) ? type : (assemblyType) ? assemblyType : (pitch) ? pitch : (row) ? row : (pin) ? pin : (value) ? value : 0
    })
    return getter.get()
  },
}