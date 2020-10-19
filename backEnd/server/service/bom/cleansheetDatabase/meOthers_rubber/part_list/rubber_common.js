const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { rubberSiteMap  } = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plRubberModel.getRubberCommon
  }
}

class CommonMappingGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
  getRubberSite:async(paras) =>{
    let getter = new CommonMappingGetter(rubberSiteMap)
    getter.setValFunc = plRubberModel.getRubberSite
    await getter.setValue(paras)
    return getter.get()
  }
}
