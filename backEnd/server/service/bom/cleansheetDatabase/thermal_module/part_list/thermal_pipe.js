const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const { formatFloat } = require('../../../../../helpers/utils.js')
const { ValueGetterWithMap } = require('../../../plCommon')
const { DecimalGetter } = require('../../../../../utils/decimalConfig/index.js')
const {
  thermal_pipe_diameter_type,
  thermal_pipe_type,
  thermal_pipe_length_outdiameter_cost,
} = require('../mapping/index')
const _ = require('lodash')
const floatPoint = new DecimalGetter('PartList')

class FanGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processDiameterTypeData(){
    let res = []
    _.forEach(this.values, (dv) =>{
      let checkRes = _.find(res, (v) => {return v.diameter_name == dv.diameter_name && v.pipe_name == dv.pipe_name})
      if(!checkRes){
        // obj.diameter_name = diameterName
        res.push(dv)
      }
    })
    this.values = res
  }
  processLenODiaCoatData() {
    let res = []
    _.forEach(this.values, (item) =>{
      let isPushAble = false
      let pipeType = ''
      switch(item.pipe_name){
        case 'Complex(複合管)':
          isPushAble = true
          pipeType = 'C'
          break
        case 'Powder(結燒管)':
          isPushAble = true
          pipeType = 'P'
          break
      }
      pipeType += item.diameter_name
      if (isPushAble) {
        res.push({
          pipe_type: pipeType,
          length_begin: item.length_begin,
          length_end: item.length_end,
          thickness_begin: formatFloat(item.thickness_begin, floatPoint.get('thermalPipeThickness')),
          thickness_end: formatFloat(item.thickness_end, floatPoint.get('thermalPipeThickness')),
          value: formatFloat(item.value, floatPoint.getWithCategory('Database', 'price')),
        })
      }
    })
    this.values = res
  }
}
module.exports = {
  getThermalPipeDiameterType: async (paras) => {
    let getter = new FanGetter(thermal_pipe_diameter_type)
    getter.setValFunc = plThermalModel.getThermalPipe
    await getter.setValue(paras)
    getter.processDiameterTypeData()
    return getter.get()
  },
  getThermalPipeType:async(paras) =>{
    let getter = new FanGetter(thermal_pipe_type)
    getter.setValFunc = plThermalModel.getThermalPipeType
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalPipeLenODiaCost: async (paras) => {
    let getter = new FanGetter(thermal_pipe_length_outdiameter_cost)
    getter.setValFunc = plThermalModel.getThermalPipe
    await getter.setValue(paras)
    getter.processLenODiaCoatData()
    return getter.get()
  },
}