
let NodeCache = require('node-cache')
const _ = require('lodash')

class CacheHelper {
  constructor (setting = { stdTTL: 30, checkperiod: 10 }) {
    this.cache = new NodeCache(setting)
  }
  has (key){
    return _.isUndefined(this.cache.get(key)) ? false : true
  }
  async getCacheAsync(key, dataFunction, ...args) {
    let value = null
    if (this.has(key)) {
      value = this.cache.get(key)
    } else {
      value = await dataFunction(...args)
      if (value) {
        this.cache.set(key, value)
      }
    }
    return value
  }
  getCache(key, dataFunction, ...args) {
    let value = null
    if (this.has(key)) {
      value = this.cache.get(key)
    } else {
      value = dataFunction(...args)
      if (value) {
        this.cache.set(key, value)
      }
    }
    return value
  }

  flushAll(){
    this.cache.flushAll()
  }
}

/* let test = new CacheHelper()
let res = test.getCache('test', (one, two) => {
  return [one, two]
}, 1, 2)
console.log(res);

res = test.getCache('test', (one, two) => {
  return [one, two]
}, 3, 4)
console.log(res);*/
module.exports = CacheHelper