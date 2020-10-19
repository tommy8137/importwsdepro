const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plDiecutModel = require('../../../../../model/cleansheetDatabase/die_cut/plDieCut')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { dieCutDebrisCleaningMap } = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plDiecutModel.getCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getDiecutCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
  getDiecutDebriscleaning:async (paras) =>{
    let getter = new CommonMapGetter(dieCutDebrisCleaningMap)
    getter.setValFunc = plDiecutModel.getDiecutDebrisCleaning
    await getter.setValue(paras)
    return getter.get()
  },
}
