const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticPrinting } = require('../mapping/index')
const _ = require('lodash')

class PrintingGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processData(lossRateData) {
    // all printing are some printing loss rate
    if (lossRateData.values && lossRateData.values.length > 0) {
      _.forEach(this.values, (v) => {
        v.loss_rate_value = lossRateData.values[0].value
        v.loss_rate_id = lossRateData.values[0].id
        v.loss_rate_activate_date = lossRateData.values[0].activate_date
      })
    }
  }
}
module.exports = {
  getPlasticPrinting: async function(paras) {
    let lossRategetter = new PrintingGetter(plasticPrinting)
    lossRategetter.setValFunc = plPlasticModel.getPlasticCommon.bind(this)
    await lossRategetter.setValue(paras)
    
    let getter = new PrintingGetter(plasticPrinting)
    getter.setValFunc = plPlasticModel.getPlasticPrinting.bind(this)
    await getter.setValue(paras)
    getter.processData(lossRategetter.get())
    return getter.get()
  },
}
