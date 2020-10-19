const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const graphiteModel = require('../../../../../model/cleansheetDatabase/thermal_graphite/plGraphite.js')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = graphiteModel.getGraphiteCommon
  }
}
module.exports = {
  getGraphiteCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue() // {value: 8}
  },
}