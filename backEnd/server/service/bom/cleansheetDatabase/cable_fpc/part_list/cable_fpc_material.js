const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plFPCModel = require('../../../../../model/cleansheetDatabase/cable_fpc/plFpc')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { cableFpcMaterialMap, cableFpcShieldingMap } = require('../mapping/index')

class FpcMaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getFpcMaterial: async (paras) => {
    let getter = new FpcMaterialGetter(cableFpcMaterialMap)
    getter.setValFunc = plFPCModel.geFpcMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getFpcShielding: async (paras) => {
    let getter = new FpcMaterialGetter(cableFpcShieldingMap)
    getter.setValFunc = plFPCModel.geFpcShielding
    await getter.setValue(paras)
    return getter.get()
  },
}
