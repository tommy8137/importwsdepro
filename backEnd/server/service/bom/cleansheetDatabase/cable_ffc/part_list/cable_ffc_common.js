const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plFFCModel = require('../../../../../model/cleansheetDatabase/cable_ffc/plFfc')
const plFfcDtAioModel = require('../../../../../model/cleansheetDatabase/cable_ffc/plFfcDtAio')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const {
  cable_ffc_dt_aio_accessory_assembly_seconds,
  cable_ffc_dt_aio_accessory,
  cable_ffc_dt_aio_coating_spec,
  cable_ffc_dt_aio_copper_spec,
  cable_ffc_dt_aio_reinforcement_board,
  cable_ffc_dt_aio_gold_plating_pitch,
} = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
  }
}
class CableWireFfcGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
  filter(key, type){
    this.values = this.values.filter((item) => {
      return (item.hasOwnProperty(key) && item[key] === type)
    })
  }
}
module.exports = {
  getFFCCommon: async function (paras){
    let getter = new CommonGetter()
    getter.setValFunc = plFFCModel.geFfcCommon.bind(this)
    await getter.setValue(paras)
    return getter.getValue()
  },
  getFFCAccessoryAssemblySeconds: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_accessory_assembly_seconds)
    getter.setValFunc = plFfcDtAioModel.getFFCAccessoryAssemblySeconds.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getFFCAccessoryPart: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_accessory)
    getter.setValFunc = plFfcDtAioModel.getFfcAccessoryPart.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getFFCAccessories: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_accessory)
    getter.setValFunc = plFfcDtAioModel.getFfcAccessories.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getFFCCoatingSpec: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_coating_spec)
    getter.setValFunc = plFfcDtAioModel.getFfcMaterial.bind(this)
    await getter.setValue(paras)
    getter.filter('category_name', '皮膜')
    return getter.get()
  },
  getFFCCopperWireSpec: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_copper_spec)
    getter.setValFunc = plFfcDtAioModel.getFfcMaterial.bind(this)
    await getter.setValue(paras)
    getter.filter('category_name', '銅線')
    return getter.get()
  },
  getFFCReinforcingPlateSpec: async function (paras){
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_reinforcement_board)
    getter.setValFunc = plFfcDtAioModel.getFfcReinforcementBoard.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getGgoldPlatingPitchMapped: async function (paras) {
    let getter = new CableWireFfcGetter(cable_ffc_dt_aio_gold_plating_pitch)
    getter.setValFunc = plFfcDtAioModel.getGgoldPlatingPitchMapped.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getAccessoryMaterialType: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCAccessoryMaterialType' })
    getter.setValFunc = plFfcDtAioModel.getAccessoryMaterialType.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getAccessoryAssemblyType: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCAccessoryAssemblyType' })
    getter.setValFunc = plFfcDtAioModel.getAccessoryAssemblyType.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getReinforcingPlateQty1: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCReinforcingPlateQty1' })
    getter.setValFunc = plFfcDtAioModel.getReinforcingPlateQty1.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getReinforcingPlateQty2: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCReinforcingPlateQty2' })
    getter.setValFunc = plFfcDtAioModel.getReinforcingPlateQty2.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getStopLine: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCStopLine' })
    getter.setValFunc = plFfcDtAioModel.getStopLine.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getPrintArea: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCPrintArea' })
    getter.setValFunc = plFfcDtAioModel.getPrintArea.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getFlushCount: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCFlushCount' })
    getter.setValFunc = plFfcDtAioModel.getFlushCount.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getBendTImes: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCBendTImes' })
    getter.setValFunc = plFfcDtAioModel.getBendTImes.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
  getSprayCodeCount: async function (paras) {
    let getter = new CableWireFfcGetter({ name:'FFCSprayCodeCount' })
    getter.setValFunc = plFfcDtAioModel.getSprayCodeCount.bind(this)
    await getter.setValue(paras)
    return getter.get()
  },
}
