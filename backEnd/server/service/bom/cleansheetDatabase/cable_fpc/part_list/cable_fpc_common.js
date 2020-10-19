const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plFPCModel = require('../../../../../model/cleansheetDatabase/cable_fpc/plFpc')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { cableFpcBendTimeMap, cableFpcPrintTimeMap, cableFpcProductNumberMap, cableShieldingQtyMap, cableFPCStoplineMap } = require('../mapping/index')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plFPCModel.geFpcCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
}

module.exports = {
  getFPCCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
  getFPCBendtime:async (paras) =>{
    let getter = new CommonMapGetter(cableFpcBendTimeMap)
    getter.setValFunc = plFPCModel.getFpcBendTime
    await getter.setValue(paras)
    return getter.get()
  },
  getFPCPrinttime:async (paras) =>{
    let getter = new CommonMapGetter(cableFpcPrintTimeMap)
    getter.setValFunc = plFPCModel.getFpcPrintTime
    await getter.setValue(paras)
    return getter.get()
  },
  getFPCProductNumber:async (paras) =>{
    let getter = new CommonMapGetter(cableFpcProductNumberMap)
    getter.setValFunc = plFPCModel.getFPCProductNumber
    await getter.setValue(paras)
    return getter.get()
  },
  getFPCShieldingQty:async (paras) =>{
    let getter = new CommonMapGetter(cableShieldingQtyMap)
    getter.setValFunc = plFPCModel.getShieldingQty
    await getter.setValue(paras)
    return getter.get()
  },
  getFPCStopLine:async (paras) =>{
    let getter = new CommonMapGetter(cableFPCStoplineMap)
    getter.setValFunc = plFPCModel.getStopLine
    await getter.setValue(paras)
    return getter.get()
  },
}
