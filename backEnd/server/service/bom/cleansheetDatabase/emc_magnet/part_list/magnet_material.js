const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMagnetModel = require('../../../../../model/cleansheetDatabase/emc_magnet/plMagnet')
const { ValueGetterWithMap } = require('../../../plCommon')
const { magnetMaterialMap } = require('../mapping/index')
const _ = require('lodash')

class MagnetMaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getMagnetMaterial: async (paras) => {
    let getter = new MagnetMaterialGetter(magnetMaterialMap)
    getter.setValFunc = plMagnetModel.getMagnetMaterial
    await getter.setValue(paras)
    return getter.get()
  },
}
