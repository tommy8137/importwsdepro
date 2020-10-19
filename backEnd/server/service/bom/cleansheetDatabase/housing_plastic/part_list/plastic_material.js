const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticMaterial, plasticMaterialWithSpec, plasticMaterialWithDoubleInjection, plasticMaterialDropDown } = require('../mapping/index')

class MaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)

  }
}
module.exports = {
  getPlasticMaterial: async function (paras) {
    let getter = new MaterialGetter(plasticMaterial)
    getter.setValFunc = plPlasticModel.getPlasticMaterial.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getHousingPlasticMaterialWithSpec: async function (paras) {
    let getter = new MaterialGetter(plasticMaterialWithSpec)
    getter.setValFunc = plPlasticModel.getHousingPlasticMaterialWithSpec.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getHousingPlasticDoubleInjection: async function (paras) {
    let getter = new MaterialGetter(plasticMaterialWithDoubleInjection)
    getter.setValFunc = plPlasticModel.getHousingPlastic_DoubleInjection.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticMaterialDropDownList: async function() {
    let getter = new MaterialGetter(plasticMaterialDropDown)
    getter.setValFunc = plPlasticModel.getPlasticMaterialDropDownList
    await getter.setValue()
    return getter.get()
  },
}
