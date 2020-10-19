const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMagnetModel = require('../../../../../model/cleansheetDatabase/emc_magnet/plMagnet')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
  }
}
module.exports = {
  getMagnetCommon: async (paras) => {
    let getter = new CommonGetter()
    getter.setValFunc = plMagnetModel.getCommon
    await getter.setValue(paras)
    return getter.getValue()
  },
  getMagnetCutLossRate:async (paras) =>{
    let getter = new CommonGetter()
    getter.setValFunc = plMagnetModel.getMagnetCutLossrate
    await getter.setValue(paras)
    return getter.getValue()
  },
  getMagnetManPower:async (paras) =>{
    let getter = new CommonGetter()
    getter.setValFunc = plMagnetModel.getMagnetManPower
    await getter.setValue(paras)
    return getter.getValue()
  }
}
