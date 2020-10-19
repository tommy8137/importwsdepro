
const emdmModel = require('../../model/bom/emdmBomMain')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')

class EmdmUtil {
  static async isEmdmProject(id){
    let res = await emdmModel.getEmdmBomDetailById(id)
    return res.length > 0
  }
  static async checkAllowApprove(id, userId){
    let res = await emdmModel.getEmdmBomDetailById(id)
    // only CE/ ME or CE ME/EE
    let permission = await rbacService.getPolicyByUser(userId, {
      action: 'ForceApprove',
      resource: 'me_bom_projects',
    })
    let allowApprove = false
    let version = parseFloat(res[0].cost_version).toFixed(1)

    if(version % 1 !== 0) {
      allowApprove = false
    }else if(permission && _.isEmpty(permission.ForceApprove)) {
      allowApprove = false
    } else {
      allowApprove = true
    }
    return allowApprove
  }
  /**
   * 取得上一版emdm project 的 bomId
   * @param {number} bomId 目前emdm project 的 bomId
   * @return {number} 上一版emdm project 的 bomId
   */
  /* static async getUpperVersion(bomId) {
    let result = null
    let projectDetail = await emdmModel.getEmdmBomDetailById(bomId)
    let nowVersion = parseInt(projectDetail[0].source_version)
    let versionList = await emdmModel.getVersions(projectDetail, '')
    versionList.sort((a, b) => parseInt(b.source_version) - parseInt(a.source_version))
    let findRes = versionList.find((bomProject) => parseInt(bomProject.source_version) < nowVersion)
    if (findRes && findRes.cost_version != '0.0') {// 0.0版沒價格
      result = findRes.id
    }
    return result
  } */
}
module.exports = EmdmUtil