const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticMachine, plasticModuleMachine, plasticModuleMachintPrice } = require('../mapping/index')

class MachineGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getPlasticMachine: async (paras) => {
    let getter = new MachineGetter(plasticMachine)
    getter.setValFunc = plPlasticModel.getPlasticMacine
    await getter.setValue(paras)
    getter.sortValue((a, b) => {
      if (a.ton && b.ton) {
        return parseInt(a.ton) - parseInt(b.ton)
      } else {
        return 0
      }
    })
    return getter.get()
  },
  getPlasticModuleMachine: async function (paras) {
    let getter = new MachineGetter(plasticModuleMachine)
    getter.setValFunc = plPlasticModel.getPlasticMachinePrice.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticModuleMachinePrice: async function (paras) {
    let getter = new MachineGetter(plasticModuleMachintPrice)
    getter.setValFunc = plPlasticModel.getPlasticMachinePrice.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
}
