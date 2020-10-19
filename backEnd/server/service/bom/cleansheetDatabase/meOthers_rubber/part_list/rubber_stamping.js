const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetterWithMap } = require('../../../plCommon')
const { rubbberStampingMap } = require('../mapping/index')

class StampingGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberStamping: async (paras) => {
    let getter = new StampingGetter(rubbberStampingMap)
    getter.setValFunc = plRubberModel.getRubberStamping
    await getter.setValue(paras)
    return getter.get()
  },
}
