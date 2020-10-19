const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const { ValueGetterWithMap } = require('../../../plCommon')
const { thermal_pad } = require('../mapping/index')

class FanGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getThermalPad: async (paras) => {
    let getter = new FanGetter(thermal_pad)
    getter.setValFunc = plThermalModel.getThermalPad
    await getter.setValue(paras)
    return getter.get()
  },

}