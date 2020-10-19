const cleanSheetService = require('../../service/cleanSheet/cleanSheet.js')
const cleanSheetCalcService = require('../../service/cleanSheet/cleanSheetCalc.js')
const pcbService = require('../../service/bom/pcb.js')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class CleanSheet {
  async cleanSheetCalc(ctx) {
    const result  = await cleanSheetCalcService.cleanSheetCalc()
    console.log('result', result)
    console.log('params', ctx.params)
    console.log('query', ctx.params)
    console.log('querystring', ctx.querystring)
    console.log('url', ctx.url)
    ctx.body = ctx
    ctx.status = 200
  }
  async cleanSheet(ctx) {
    const result  = await cleanSheetService.cleanSheet()
    console.log('result', result)
    console.log('params', ctx.params)
    console.log('query', ctx.params)
    console.log('querystring', ctx.querystring)
    console.log('url', ctx.url)
    ctx.body = ctx
    ctx.status = 200
  }
  async fetchPlm(ctx) {
    const projectCode = ctx.query.projectCode
    const projectName = ctx.query.projectName
    const bg = ctx.query.bg
    const product = ctx.query.product
    const result  = await cleanSheetService.fetchPlm(projectCode, projectName, bg, product)
    ctx.body = result
  }
  async triggerProjectME(ctx) {
    const { request: req } = ctx
    // TODO: prarmeter check
    // TODO: permission check
    const result  = await cleanSheetService.triggerProjectME(req)
    // TODO: result handling in service
    // if (result.rowCount != 1) {
    //   throwApiError('Insert data error', errorCode.INTERNAL_ERROR)
    // }
    ctx.body = { 'message': 'Trigger Success' }
    ctx.status = 200
  }
  async getSinglePartCleanSheet(ctx) {
    const partID = ctx.params.pardID
    const versionCode = ctx.params.versionCode
    const result = await cleanSheetService.getSinglePartCleanSheet(partID, versionCode)
    ctx.body = result
    ctx.status = 200
  }
  async calculatePCBs(ctx) {
    console.log(ctx.request.body)
    let calData=ctx.request.body || []
    let result = await pcbService.calculatePCBs(calData) 
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = CleanSheet
