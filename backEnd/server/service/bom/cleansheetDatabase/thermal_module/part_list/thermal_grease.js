const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const { ValueGetterWithMap } = require('../../../plCommon')
const { thermal_grease } = require('../mapping/index')

class FanGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getThermalGrease: async (paras) => {
    let getter = new FanGetter(thermal_grease)
    getter.setValFunc = plThermalModel.getThermalGrease
    await getter.setValue(paras)
    return getter.get()
  },
}