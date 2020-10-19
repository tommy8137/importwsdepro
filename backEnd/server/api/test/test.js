const testService = require('../../service/test/test.js')
const _ = require('lodash')

class Test {
  async addFackData(ctx) {
    let { projectCode } = ctx.request.query
    let response = await testService.addFackData(projectCode)
    ctx.status = 200
  }

  async deleteFackData(ctx) {
    let response = await testService.deleteFackData()
    ctx.status = 200
  }


  async convertMetal202005(ctx) {
    const { request: { query: { ids } } } = ctx
    const response = await testService.convertMetal202005(ids)
    ctx.body = response
    ctx.status = 200
  }

  async getMetalNbList(ctx) {
    const response = await testService.getMetalNbList()
    ctx.body = response
    ctx.status = 200
  }

  async searchProject(ctx) {
    const { request: { query } } = ctx
    const response = await testService.searchProject(query)
    ctx.body = response
    ctx.status = 200
  }
}

module.exports = Test
