const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { rubberPrintingMap, rubber_printing_amount } = require('../mapping/index')

class PrintingGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberPrinting: async (paras) => {
    let getter = new PrintingGetter(rubberPrintingMap)
    getter.setValFunc = plRubberModel.getRubberPrinting
    await getter.setValue(paras)
    return getter.get()
  },
  getRubberPrintingAmount: async (paras) => {
    let getter = new PrintingGetter(rubber_printing_amount)
    getter.setValFunc = plRubberModel.getRubberPrittingAmount
    await getter.setValue(paras)
    return getter.get()
  },
}
