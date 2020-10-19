const plThermalModel = require('../../../../../model/cleansheetDatabase/thermal_module/plThermal')
const { ValueGetterWithoutMap, ValueGetterWithMap } = require('../../../plCommon')
const {
  thermal_bearin_and_sleeve_fan,
  thermal_fan_size,
  thermal_fan_magnet,
  thermal_fan_motor,
  thermal_fan_vendor_locate,
  thermal_fan_loss_rate,
  thermal_fan_voltage,
} = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plThermalModel.getThermalCommon
  }
}
class FanGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
  processFanVoltage(price5v, price12v) {
    this.values.forEach(element => {
      element.price = null
      if (element.name === '12V') {
        element.price = price12v
      }
      if (element.name === '5V') {
        element.price = price5v
      }
    })
  }
}
module.exports = {

  getThermalBearingAndSleeveFan:async(paras) =>{
    let getter = new FanGetter(thermal_bearin_and_sleeve_fan)
    getter.setValFunc = plThermalModel.getThermalBearingAndSleeveFan
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFanSize:async(paras) =>{
    let getter = new FanGetter(thermal_fan_size)
    getter.setValFunc = plThermalModel.getFanSize
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFanMagnet:async(paras) =>{
    let getter = new FanGetter(thermal_fan_magnet)
    getter.setValFunc = plThermalModel.getThermalFanMagnet
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFanMotor:async(paras) =>{
    let getter = new FanGetter(thermal_fan_motor)
    getter.setValFunc = plThermalModel.getThermalFanMotor
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFamVerdorLocate:async(paras) => {
    let getter = new FanGetter(thermal_fan_vendor_locate)
    getter.setValFunc = plThermalModel.getThermalFanVendorLocate
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFamLossRate:async(paras) => {
    let getter = new FanGetter(thermal_fan_loss_rate)
    getter.setValFunc = plThermalModel.getThermalFanLossRate
    await getter.setValue(paras)
    return getter.get()
  },
  getThermalFanVoltage:async (paras) => {
    let priceGetter12v = new CommonGetter()
    await priceGetter12v.setValue(['thermal_module_components', 'thermal_fan_voltage_12v'])
    let price12v = priceGetter12v.getValue()

    let priceGetter5v = new CommonGetter()
    await priceGetter5v.setValue(['thermal_module_components', 'thermal_fan_voltage_5v'])
    let price5v = priceGetter5v.getValue()

    let getter = new FanGetter(thermal_fan_voltage)
    getter.setValFunc = plThermalModel.getThermalFanVoltage
    await getter.setValue(paras)
    getter.processFanVoltage(price5v.value, price12v.value)
    return getter.get()
  },
}
