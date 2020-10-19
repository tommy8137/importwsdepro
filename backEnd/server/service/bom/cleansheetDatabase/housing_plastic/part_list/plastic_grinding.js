const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticGrinding } = require('../mapping/index')
const _ = require('lodash')

class GrindingGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  combineLossRateData(lossRateData) {
    // all grinding are some printing loss rate
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
  getPlasticGrinding: async function(paras) {
    let getter = new GrindingGetter(plasticGrinding)
    getter.setValFunc = plPlasticModel.getPlasticGrinding.bind(this)
    await getter.setValue(paras)

    let lossRategetter = new GrindingGetter(plasticGrinding)
    lossRategetter.setValFunc = plPlasticModel.getPlasticCommon.bind(this)
    await lossRategetter.setValue(paras)
    
    getter.combineLossRateData(lossRategetter.get())
    return getter.get()
  },
}
