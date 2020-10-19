const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetterWithMap } = require('../../../plCommon')
const { rubbberAdhesiveMap, rubberAdhesiveSetting } = require('../mapping/index')

class AdhesiveGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberAdhesive: async (paras) => {
    let getter = new AdhesiveGetter(rubbberAdhesiveMap)
    getter.setValFunc = plRubberModel.getRubberAdhesive
    await getter.setValue(paras)
    return getter.get()
  },
  getRubberAdhesiveSetting: async (paras) => {
    let getter = new AdhesiveGetter(rubberAdhesiveSetting)
    getter.setValFunc = plRubberModel.getRubberAdhesiveSetting
    await getter.setValue(paras)
    return getter.get()
  },
}
