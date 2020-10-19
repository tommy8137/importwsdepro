const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plMetalModel = require('../../../../../model/cleansheetDatabase/housing_metal/plMetal')
const { ValueGetter, ValueGetterWithMap } = require('../../../plCommon')
const { powerbuttonDrillMap, tpDrillMap, powerholeDrillMap, fingerprintDrillMap, allsideDrillMap } = require('../mapping/index')
const _ =  require('lodash')


class DrillGetter extends ValueGetterWithMap {
  constructor(paras) {
    let keyMap = null
    if(paras && paras[2]){
      if(paras[2] == 'power_button_cutting'){
        keyMap = powerbuttonDrillMap
      }else if(paras[2] == 'tp_cutting'){
        keyMap = tpDrillMap
      }
      else if(paras[2] == 'fingerprint_hole_cutting'){
        keyMap = fingerprintDrillMap
      }
      else if(paras[2] == 'power_hole_cutting'){
        keyMap = powerholeDrillMap
      }else{
        keyMap = allsideDrillMap
      }
    }
    super(keyMap)
  }

  procseeData(lossRate){
    _.forEach(this.values, (v) =>{
      v.loss_rate = lossRate && lossRate.value ? lossRate.value : 0
    })
  }
}

module.exports = {
  getMetalDrill: async (paras) => {
    let getter = new DrillGetter(paras)
    getter.setValFunc = plMetalModel.getMetalDrill
    await getter.setValue(paras)

    // let lossRateGetter = new DrillGetter(paras)
    // lossRateGetter.setValFunc = plMetalModel.getCommon
    // await lossRateGetter.setValue(paras)

    // getter.procseeData(lossRateGetter.get())
    return getter.get()
  },
}
