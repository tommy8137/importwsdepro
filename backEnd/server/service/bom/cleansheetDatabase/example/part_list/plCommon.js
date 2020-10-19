const log4js = require('../../../../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plGatterModel = require('../../../../../model/bom/plCommon')
const { exampleKeyMap } = require('../mapping/plKeyMapCommon')
const { ValueGetter } = require('../../../plCommon')


class ExampleValueGatter extends ValueGetter {
  async setValue([p1, p2]){
    log.info(`ExampleValueGatter get paras: ${p1}, ${p2}`)
    let exampleValues = await plGatterModel.getExampleValue({data:this.date, p1})
    exampleValues = this.transferKey( exampleKeyMap, exampleValues)
    this.values = { values: exampleValues }
  }
}

module.exports = {
  route: {
    examplevalue: async (paras) => {
      let getter = new ExampleValueGatter()
      await getter.setValue(paras)
      return  getter.get()
    }
  },
}
