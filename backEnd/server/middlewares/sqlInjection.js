
let sql = /’|=|;|>|<|--|%/i
const { throwApiError, errorCode } = require('../helpers/errorCode/apiErrorHelper.js')
function isSqlInjection(datas) {
  let keys = Object.keys(datas)
  let isInjection = false
  keys.forEach((key) => {
    if(sql.test(datas[key])) {
      isInjection = true
    }
  })
  return isInjection
}

function sqlInjection(ctx) {
  let bodyStr = ctx.request.body || {}
  let queryStr = ctx.request.query || {}
  let paramsStr = ctx.params || {}
  if(isSqlInjection(ctx.origin) || isSqlInjection(bodyStr) || isSqlInjection(queryStr) || isSqlInjection(paramsStr)) {
    throwApiError('INVALID REQUEST', errorCode.INVALIDCONTENT)
  }
}

module.exports = {
  sqlInjection,
}
