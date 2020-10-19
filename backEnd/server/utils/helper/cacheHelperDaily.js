
let CacheHelper = require('./cacheHelper.js')
let moment = require('moment')

class CacheHelperDaily extends CacheHelper {
  constructor () {
    super({stdTTL: 86400, checkperiod: 300})
    this.lastCheckDate = 0
  }
  _checkCrossDay () {
    let nowDate = moment().date()
    if (nowDate !== this.lastCheckDate) {
      this.cache.flushAll()
      this.lastCheckDate = nowDate
    }
  }
  async getCacheAsync(...args) {
    this._checkCrossDay()
    let result = await super.getCacheAsync(...args)
    return result
  }

  getCache(...args) {
    this._checkCrossDay()
    return super.getCache(...args)
  }
}

/*let test = new CacheHelperDaily()
let res = test.getCache('test', (one, two) => {
  return [one, two]
}, 1, 2)
console.log(res);

setInterval(() => {
  res = test.getCache('test', (one, two) => {
    return [one, two]
  }, 3, 4)
console.log(res);
}, 1000)*/
module.exports = new CacheHelperDaily() // singleton