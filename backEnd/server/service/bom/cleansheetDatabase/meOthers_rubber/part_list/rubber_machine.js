const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { rubberMachineMap } = require('../mapping/index')

class MachineGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberMachine: async (paras) => {
    let getter = new MachineGetter(rubberMachineMap)
    getter.setValFunc = plRubberModel.getRubberMachine
    await getter.setValue(paras)
    return getter.get()
  },
}
