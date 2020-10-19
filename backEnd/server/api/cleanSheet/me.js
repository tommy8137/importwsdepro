const meService = require('../../service/cleanSheet/me.js')
const path = require('path')
const send = require('koa-send')

class Me {
  async meProjectList(ctx) {
    let { pages, items, orderBy, key, keyword } = ctx.query
    const result  = await meService.getMeprojectList(pages, items, orderBy, key, keyword)
    ctx.body = result
    ctx.status = 200
  }
  async meBomDownload(ctx) {
    const projectCode = ctx.request.body.projectCode
    const projectName = ctx.request.body.projectName
    const product = ctx.request.body.product
    const bg = ctx.request.body.bg
    const stage = ctx.request.body.stage
    const stageName = ctx.request.body.stageName
    const productSpec = ctx.request.body.productSpec
    const site = ctx.request.body.site
    const result = await meService.getMeBom(ctx, projectCode, projectName, product, bg, stage, stageName, productSpec, site)
    const bomPath = '/server/utils/excel/bom.xlsx'
    ctx.attachment(bomPath)
    ctx.body = result
    ctx.status = 200
    await send(ctx, bomPath)
  }
  async meSingleProject(ctx) {
    let { projectCode } = ctx.params
    const result  = await meService.getMeprojectInfo(projectCode)
    ctx.body = result
    ctx.status = 200
  }
  async meBomUpdate(ctx) {
    const key = ctx.request.files.file
    const result = await meService.updateMeBom(key)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = Me
