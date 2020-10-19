const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plPlasticModel = require('../../../../../model/cleansheetDatabase/housing_plastic/plPlastic')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { plasticPaintVendorMap, plasticPaintTypeMap, plasticPaintProcessMap, plasticPaintMachineMap, plasticPaintManpowerMap, plasticPaintPriceMap, plasticPaintManpowerNCVMMap } = require('../mapping/index')
const _ = require('lodash')

class PlasticPaintGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  async processPainPriceData() {
    // 轉換資料格式 底漆面漆不同列，轉換成依據供應商及類型成一列
    let transferRes = []
    _.forEach(this.values, (s) => {
      let checkDuplicate = _.find(transferRes, (v) => { return v.vendor_name == s.vendor_name && v.type_name == s.type_name && v.color_name == s.color_name })
      let filiterRes = _.filter(this.values, (v) => { return v.vendor_name == s.vendor_name && v.type_name == s.type_name && v.color_name == s.color_name })
      if (!checkDuplicate && (filiterRes && filiterRes.length > 0)) {
        let obj = {
          vendor_name: filiterRes[0].vendor_name,
          type_name: filiterRes[0].type_name,
          color_name: filiterRes[0].color_name,
          topcoatPrice: null,
          topcoatMainUnitPrice: null,
          topcoatMainAmount: null,
          topcoatHardenerUnitPrice: null,
          topcoatHardenerAmount: null,
          topcoatSolventUnitPrice: null,
          topcoatSolventAmount: null,
          primerPrice: null,
          primerMainUnitPrice: null,
          primerMainAmount: null,
          primerHardenerUnitPrice: null,
          primerHardenerAmount: null,
          primerSolventUnitPrice: null,
          primerSolventAmount: null,
        }

        _.forEach(filiterRes, (v) => {
          if (v.bottom_top_name && v.bottom_top_name.indexOf('底漆') > -1) {
            obj.primerPrice = v.value
          } else if (v.bottom_top_name && v.bottom_top_name.indexOf('面漆') > -1) {
            obj.topcoatPrice = v.value
          }
        })
        transferRes.push(obj)
      }
    })
    let paintFormulaPrice = await plPlasticModel.getPaintFormulaPrice()
    let paintFormulaPriceGroup = {}
    paintFormulaPrice.forEach((item) => {
      let type = item.type_name
      let color = item.color_name
      let vendor = item.vendor_name
      let paintKey = `${type}_${color}_${vendor}`
      if (!paintFormulaPriceGroup.hasOwnProperty(paintKey)) {
        paintFormulaPriceGroup[paintKey] = []
      }
      paintFormulaPriceGroup[paintKey].push(item)
    })
    
    let getPaintPriceKey = function(bottom_top, label) {
      let key = ''
      switch (bottom_top) {
        case '底漆':
          key = 'primer'
          break;
        case '面漆':
          key = 'topcoat'
          break;
        default:
          throw new Error(`processPainPriceData unexpect bottom_top:${bottom_top}`)
      }
      switch (label) {
        case 'main_unit_price':
          key += 'MainUnitPrice'
          break;
        case 'main_amount':
          key += 'MainAmount'
          break;
        case 'hardener_unit_price':
          key += 'HardenerUnitPrice'
          break;
        case 'hardener_amount':
          key += 'HardenerAmount'
          break;
        case 'solvent_unit_price':
          key += 'SolventUnitPrice'
          break;
        case 'solvent_amount':
          key += 'SolventAmount'
          break;
        default:
          throw new Error(`processPainPriceData unexpect label:${label}`)
      }
      return key
    }
    transferRes.forEach((item) => {
      let type = item.type_name
      let color = item.color_name
      let vendor = item.vendor_name
      let paintKey = `${type}_${color}_${vendor}`
      if (paintFormulaPriceGroup.hasOwnProperty(paintKey)) {
        paintFormulaPriceGroup[paintKey].forEach((obj) => {
          let priceKey = getPaintPriceKey(obj.bottom_top_name, obj.label)
          item[priceKey] = obj.value
        })
      }
    })
    this.values = transferRes
  }
}
module.exports = {
  getPlasticPaintVendor: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintVendorMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintVendor
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPainType: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintTypeMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintType
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPaintProcess: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintProcessMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintProcess
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPainMachine: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintMachineMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintMachine
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPaintManpower: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintManpowerMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintManPower
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPaintManpowerForNCVM: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintManpowerNCVMMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintManPower
    await getter.setValue(paras)
    return getter.get()
  },
  getPlasticPainPrice: async (paras) => {
    let getter = new PlasticPaintGetter(plasticPaintPriceMap)
    getter.setValFunc = plPlasticModel.getPlasticPaintPrice
    await getter.setValue(paras)
    await getter.processPainPriceData()
    return getter.get()
  },
}
