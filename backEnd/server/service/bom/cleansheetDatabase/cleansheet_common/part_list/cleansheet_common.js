const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plCommonModel = require('../../../../../model/cleansheetDatabase/cleansheet_common/plCommon')
const { ValueGetter, ValueGetterWithMap, ValueGetterWithoutMap } = require('../../../plCommon')
const { siteMap  } = require('../mapping/index')
const _ = require('lodash')

class CommonGetter extends ValueGetterWithoutMap {
  constructor() {
    super()
    this.setValFunc = plCommonModel.getCommon
  }
}

class CommonMapGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }

  processSiteData(){
    let arr = []
    _.forEach(this.values, (v) =>{
      let obj = {}
      obj.id = v.id
      obj.site_name = v.site_name
      obj.payout_site = v.site_name
      arr.push(obj)
    })
    this.values = arr
  }
}

module.exports = {
  getCleanSheetCommon: async (paras) => {
    let getter = new CommonGetter()
    await getter.setValue(paras)
    return getter.getValue()
  },
  getCommonSite:async(paras) =>{
    let getter = new CommonMapGetter(siteMap)
    getter.setValFunc = plCommonModel.getSite
    await getter.setValue(paras)
    getter.processSiteData()
    return getter.get()
  },
  getProjectParameter: async function (paras){
    let getter = new CommonGetter()
    getter.setValFunc = plCommonModel.getProjectParameter.bind(this)
    await getter.setValue(paras)
    return getter.getValue()
  }
}
