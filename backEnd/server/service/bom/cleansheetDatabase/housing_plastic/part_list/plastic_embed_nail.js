const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticEmbedNail } = require('../mapping/index')

class EmbedNailGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
    this.setValFunc = plPlasticModel.getPlasticEmbedNail
  }
}
module.exports = {
  getPlasticEmbedNail: async function (paras) {
    let getter = new EmbedNailGetter(plasticEmbedNail)
    getter.setValFunc = plPlasticModel.getPlasticEmbedNail.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
}
