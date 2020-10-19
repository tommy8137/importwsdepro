const applicationModel = require('../../model/eproApplication/application.js')
const _ = require('lodash')
class Application {
  static async getProjectInfoByProjectCode(project_code) {
    let results = await applicationModel.getProjectInfoByProjectCode(project_code)
    let res = []
    results.map(result=>{
      let tmp = _.find(res, x => x.project_code ==  result.project_code)
      if(_.isEmpty(tmp)) {
        res.push({ project_code: result.project_code, project_name:result.project_name,
          product_type:result.product_type, purchasing_organization:result.purchasing_organization, stage:[result.stage] })
      } else {
        tmp.stage.push(result.stage)
      }
    })
    return res
  }
  static async getSkus(project_code, stage) {
    let results = await applicationModel.getSkus(project_code, stage)
    return  results.map(x => x.sku)
  }
}

module.exports = Application
