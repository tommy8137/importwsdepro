
const TestGet = require('./testGet.js')
class DatabaseTestMod {
  constructor(api, Authorization){
    this.authorization = Authorization
    this.testGet = new TestGet(api)
  }
  getAuthorization(isAuth){
    return (isAuth) ? this.authorization : ''
  }
  checkGetStatusCode(apiTestInfo, callback){
    const { route, isAuth, statusCode } = apiTestInfo
    this.testGet.checkStatusCode(route, this.getAuthorization(isAuth), statusCode, callback)
  }
  checkGetResBody(apiTestInfo, callback){
    const { isAuth, statusCode } = apiTestInfo
    this.testGet.checkGetResBody(this.getAuthorization(isAuth), statusCode, apiTestInfo, callback)
  }
}

module.exports = DatabaseTestMod