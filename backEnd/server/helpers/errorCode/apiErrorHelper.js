const errorCode = {
  AUTH_WRONG: 401,
  UNPROCESSABLE: 422,
  NOT_FOUND: 404,
  METHOD_WRONG: 405,
  INTERNAL_ERROR: 500,
  UNAUTHORIZED: 401,
  INSERT_DUPLICATE: 400,
  BAD_REQUEST: 400,
  NOTADMIN: 403,
  ERRORFORMAT: 400,
  updateFailed: 400,
  accountAlreadyExist: 400,
  exchangeRateNotFound: 400,
  INVALIDCONTENT: 403,
  DATANOTFOUND: 400,
  ROLENOTMATCH: 400,
  SIZELIMIT: 413,
  APPROVEERROR: 400,
  FORBIDDEN:403,
  FAILED_DEPENDENCY:424,
}

const throwApiError = (message, status) => {
  const err = new Error(message)
  err.status = status
  err.expose = true
  throw err
}

const apiErrorRes = (ctx, message, status, data) => {

  const err = new Error('error')
  ctx.status = status
  ctx.body = { code: message, data }
  ctx.app.emit('error', err, ctx)
}

module.exports = {
  errorCode,
  throwApiError,
  apiErrorRes,
}
