const { httpTimeout } = require('../../config.js')
module.exports = {
  async koa2timeout (ctx, next){
    let tmr = null
    const timeout = httpTimeout * 1000
    await Promise.race([
      new Promise(function(resolve, reject) {
        tmr = setTimeout(function() {
          let e = new Error('Request timeout')
          e.status = 408
          reject(e)
        }, timeout)
      }),
      new Promise(function(resolve, reject) {
        (async function() {
          await next()
          clearTimeout(tmr)
          resolve()
        })()
      }),
    ])
  },
}