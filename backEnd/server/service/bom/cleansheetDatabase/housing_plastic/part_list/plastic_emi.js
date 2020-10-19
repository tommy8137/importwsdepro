const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticEmiBase, plasticEmiSize, plasticEmiPrice } = require('../mapping/index')
const _ = require('lodash')

class EmiGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
  processData(){
    // change to Number
    // ex:0.6300 -> 0.63
    _.forEach(this.values, (v) => {
      v.value = this.toNumber(v.value)
    })
  }
}
module.exports = {
  getPlasticEmiPrice: async function(paras) {
    let getter = new EmiGetter(plasticEmiPrice)
    getter.setValFunc = plPlasticModel.getPlasticEmiPrice.bind(this)
    await getter.setValue(paras)
    getter.processData()
    return getter.get()
  },
  getPlasticBase:async function(paras) {
    let getter = new EmiGetter(plasticEmiBase)
    getter.setValFunc = plPlasticModel.getPlasticEmiBase.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticSize:async function(paras) {
    let getter = new EmiGetter(plasticEmiSize)
    getter.setValFunc = plPlasticModel.getPlasticEmiSize.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
}
