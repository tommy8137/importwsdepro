const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const { ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { thermal_fan_type } = require('../mapping/index')
const _ = require('lodash')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plThermalModel.getThermalCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
  processApperanceData(){
    let res = []
    _.forEach(this.values, (v) =>{
      let obj = {}
      obj['id'] = v.id
      obj[v.spec_category] = v.name
      obj[v.spec_category + '_qty'] = v.value
      res.push(obj)
    })
    this.values = res
  }
}

module.exports = {
  getThermalCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
  getThermalFanType:async(paras) =>{
    let getter = new CommonMapGetter(thermal_fan_type)
    getter.setValFunc = plThermalModel.getThermalFanType
    await getter.setValue(paras)
    return getter.get()
  },
}
