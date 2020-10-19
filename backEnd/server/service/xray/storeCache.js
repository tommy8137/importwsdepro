const _ = require('lodash')

class StoreCache {
  constructor() {
    this.cache = []
  }
  findSameKey(specString) {
    let findObject = _.find(this.cache, (c) => c.key == specString)
    if(findObject) {
      return findObject.value
    } else {
      return []
    }
  }

  storeCache(specString, spa_result) {
    this.cache.push({
      key: specString,
      value: spa_result,
    })

    return this.cache
  }

  cleanCache() {
    this.cache = []
  }
}

module.exports = StoreCache
