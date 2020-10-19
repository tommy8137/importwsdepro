const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { rubberMaterialMap, rubberMaterialSpecDensityMap, rubberMaterialWithSpec, rubberMaterialDropDown } = require('../mapping/index')

class MaterialGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}
module.exports = {
  getRubberMaterial: async (paras) => {
    let getter = new MaterialGetter(rubberMaterialMap)
    getter.setValFunc = plRubberModel.getRubberMaterial
    await getter.setValue(paras)
    return getter.get()
  },
  getRubberMaterialSpecDensity: async (paras) =>{
    let getter = new MaterialGetter(rubberMaterialSpecDensityMap)
    getter.setValFunc = plRubberModel.getRubberMaterialSpecDensity
    await getter.setValue(paras)
    return getter.get()
  },
  getRubberMaterialWithSpec: async (paras) => {
    let getter = new MaterialGetter(rubberMaterialWithSpec)
    getter.setValFunc = plRubberModel.getRubberMaterialWithSpec.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getRubberMaterialDropDownList: async () => {
    let getter = new MaterialGetter(rubberMaterialDropDown)
    getter.setValFunc = plRubberModel.getRubberMaterialDropDownList
    await getter.setValue()
    return getter.get()
  },
}
