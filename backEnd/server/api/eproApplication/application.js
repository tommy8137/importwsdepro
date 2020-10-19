const applicationService = require('../../service/eproApplication/application.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Application {
  async getProjectInfoByProjectCode(ctx) {
    const { project_code } = ctx.params
    const result  = await applicationService.getProjectInfoByProjectCode(project_code)
    ctx.body = result
    ctx.status = 200
  }
  async getSkus(ctx) {
    const { project_code, stage } = ctx.params
    const result  = await applicationService.getSkus(project_code, stage)
    ctx.body = result
    ctx.status = 200
  }
}
module.exports = Application
