const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('service.bom.plCommon')
const plGatterModel = require('../../model/bom/plCommon')
const _ = require('lodash')

class ValueGetter {
  constructor(){
    this.values = {}
    this.date = Date.now()
    log.info(`Gatter get now date: ${this.date}`)
  }
  setQueryDate(para) {
    log.error('parent setQueryDate is not implemented')
    throw Error('NOT_IMPLEMENT')
  }
  async setValue(paras) {
    log.error('parent getValue is not implemented')
    throw Error('NOT_IMPLEMENT')
  }
  sortValue(callback){
    if(this.values && Array.isArray(this.values) && this.values.length) {
      this.values.sort(callback)
    }
  }
  get(){
    return this.values
  }
  transferKey(keyFromTo, data) {
    return data.map(dt => {
      let newObj = {}
      Object.keys(dt).forEach((dataKey)=>{
        if( keyFromTo.hasOwnProperty(dataKey)) {
          newObj = {...newObj, [keyFromTo[dataKey]]: dt[dataKey]}
        } else {
          newObj = {...newObj, [dataKey]: dt[dataKey]}
        }
      })
      return newObj
    })
  }
}

class ValueGetterWithMap extends ValueGetter {
  constructor(keyMap){
    super()
    this.keyMap = keyMap
    this.setValFunc = null
  }
  async setValue(paras) {
    if (this.setValFunc == null) {
      log.error('no setvalue function can be used')
      throw Error('NO_SETVALUE_FUNC')
    }
    this.values = await this.setValFunc(paras)
  }
  get(){
    let result = this.transferKey(this.keyMap, this.values)
    return { values: result }
  }
  toNumber(value){
    if(!value || isNaN(value)){
      return null
    }
    return Number(value)
  }
}

class ValueGetterWithoutMap extends ValueGetter {
  constructor(){
    super()
    this.setValFunc = null
  }
  async setValue(paras) {
    if (this.setValFunc == null) {
      log.error('no setvalue function can be used')
      throw Error('NO_SETVALUE_FUNC')
    }
    this.values = await this.setValFunc(paras)
  }
  toNumber(value){
    if(!value || isNaN(value)){
      return 0
    }
    return Number(value)
  }
  get(){
    return { values: this.values }
  }

  getValue(){
    if(this.values && this.values.length > 0){
      _.forEach(this.values, (v) =>{
        v.value = this.toNumber(v.value)
      })
    }
    let constValue = this.values.length > 0 ? this.values[0].value : 0
    return { value: constValue }
  }
}


module.exports = {
  ValueGetter,
  ValueGetterWithMap,
  ValueGetterWithoutMap,
}
