const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticCNCProcessMap, plasticCNCRemoveProcessMap } = require('../mapping/index')
const _ = require('lodash')
const CNCPROCESSAREA = {
  CNCPROCESSCOST:'cnc_processing_area_cost',
  CNCPROCESSLOSSRATE:'cnc_processing_area_loss_rate',
  CNCPROCESSMANUALCOST:'cnc_processing_manual_cost',
  CNCPROCESSMANUALLOSSRATE:'cnc_processing_manual_loss_rate',
}

const CNCPROCESSREMOVE = {
  CNCPROCESSCOST:'cnc_remove_area_cost',
  CNCPROCESSLOSSRATE:'cnc_remove_area_loss_rate',
  CNCPROCESSMANUALCOST:'cnc_remove_manual_cost',
  CNCPROCESSMANUALLOSSRATE:'cnc_remove_manual_loss_rate',
}

const CNCAREA = 'cnc_processing_area'
const CNCREMOVE = 'cnc_remove_area'

class MESPECNameGetter extends ValueGetterWithMap {
  constructor(keyMap, type) {
    super(keyMap)
    this.type = type
  }
}

class CNCProcessGetter extends ValueGetterWithMap {
  constructor(keyMap, type) {
    super(keyMap)
    this.type = type
    this.setValFunc = plPlasticModel.getPlasticCommon
  }

  processData(src) {
    /*
   * 轉換data 與 yaml範例一致
     values:
   - cmfPCNCProcessingAreaType: N/A
     cmfPCNCProcessingAreaUP: 0
     cmfPCNCProcessingAreaLossRate: 0

   - cmfPCNCProcessingAreaType: CNC Area
     cmfPCNCProcessingAreaUP: 0.065
     cmfPCNCProcessingAreaLossRate: 0

   - cmfPCNCProcessingAreaType: 人工
     cmfPCNCProcessingAreaUP: 0.065
     cmfPCNCProcessingAreaLossRate: 0
   */
    let filterCond = this.type == CNCAREA ? CNCPROCESSAREA : CNCPROCESSREMOVE
    let findAreaCost = _.filter(this.values, (v) => { return v.label == filterCond.CNCPROCESSCOST })
    let findAreaLossrate = _.filter(this.values, (v) => { return v.label == filterCond.CNCPROCESSLOSSRATE })
    let findMaualCost = _.filter(this.values, (v) => { return v.label == filterCond.CNCPROCESSMANUALCOST })
    let findMaualLossRate = _.filter(this.values, (v) => { return v.label == filterCond.CNCPROCESSMANUALLOSSRATE })
    
    let findCNCName = (name) => {
      let res = _.find(src, (v) => {return v.name === name})
      return res ? res.id : null
    }

    let res = [
      {
        id: findCNCName('N/A'),
        label_name: 'N/A',
        cost: '0',
        loss_rate: '0',
      }, {
        id: findCNCName(this.type == CNCAREA ? 'CNC Area' : 'CNC'),
        label_name: this.type == CNCAREA ? 'CNC Area' : 'CNC',
        cost: findAreaCost && findAreaCost.length > 0 ? findAreaCost[0].value : null,
        loss_rate: findAreaLossrate && findAreaLossrate.length > 0 ? findAreaLossrate[0].value : null,
      }, {
        id: findCNCName('人工'),
        label_name: '人工',
        cost: findMaualCost && findMaualCost.length > 0 ? findMaualCost[0].value : null,
        loss_rate: findMaualLossRate && findMaualLossRate.length > 0 ? findMaualLossRate[0].value : null,
      },
    ]
    this.values = res
  }
}
module.exports = {
  getPlasticCNCArea: async function(paras) {
    let getter = new CNCProcessGetter(plasticCNCProcessMap, CNCAREA)
    let cncGetter = new MESPECNameGetter({})
    cncGetter.setValFunc = plPlasticModel.getPlasticCNCProcess
    getter.setValFunc = plPlasticModel.getPlasticCommon.bind(this)
    await cncGetter.setValue(paras)
    await getter.setValue(paras)
    getter.processData(cncGetter.get().values)
    
    return getter.get()
  },
  getPlasticCNCRemove: async function(paras) {
    let getter = new CNCProcessGetter(plasticCNCRemoveProcessMap, CNCREMOVE)
    let cncGetter = new MESPECNameGetter({})
    cncGetter.setValFunc = plPlasticModel.getPlasticCNCFeeder
    getter.setValFunc = plPlasticModel.getPlasticCommon.bind(this)
    await cncGetter.setValue(paras)
    await getter.setValue(paras)
    getter.processData(cncGetter.get().values)
    return getter.get()
  },
}
