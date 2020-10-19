const pcbService = require('../../service/bom/pcb.js').pcb
const pcbFormulaService = require('../../service/bom/pcbFormula.js')
const pcbSvc = require('../../service/bom/pcb.js')
const eeBomService = require('../../service/bom/eeBom.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Eebom|Pcb')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../../service/admin/rbac.js')
const _ = require('lodash')
const eeUtilies = require('../../utils/eebom/eebomUtils')
const send = require('koa-send')
const moment = require('moment')
const STATUS_OK = 200
const ERROR_CODE_MAPPING = {
  'Missing paramater': errorCode.ERRORFORMAT,
}
function _getErrorStatusCode (err){
  return  ERROR_CODE_MAPPING.hasOwnProperty(err.message) ? ERROR_CODE_MAPPING[err.message] : err.status
}
class pcb {
  async updatePersonalCheck(ctx) {
    let info = {
      id: ctx.request.body.edm_version_id,
      is_pcb_personal_checked:  ctx.request.body.is_pcb_personal_checked,
    }
    let userID = ctx.request.user.userID
    let res = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    if(_.isEmpty(res))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await pcbService.updatePersonalCheck(info)
    ctx.body = 'update success'
    ctx.status = STATUS_OK
  }
  async updateLeaderCheck(ctx) {
    let info = {
      id: ctx.request.body.edm_version_id,
      leader_checked_status:  ctx.request.body.leader_checked_status,
    }
    let userID = ctx.request.user.userID
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Approve' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await pcbService.updateLeaderCheck(info)
    ctx.body = 'update success'
    ctx.status = STATUS_OK
  }
  async updateLeaderSubmitted(ctx) {
    let { version_remark } = ctx.request.body
    let info = {
      id: ctx.request.body.edm_version_id,
      leader_submitted_status:  ctx.request.body.leader_submitted_status,
    }
    let userID = ctx.request.user.userID
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Approve' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    await pcbService.updateLeaderSubmitted(userID, info, version_remark)
    ctx.body = 'update success'
    ctx.status = STATUS_OK
  }
  async updatePersonalSubmitted(ctx) {
    let userID = ctx.request.user.userID
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let info = {
      id: ctx.request.body.edm_version_id,
      is_pcb_personal_submitted:  ctx.request.body.is_personal_submitted,
    }
    await pcbService.updatePersonalSubmitted(info)
    let eeBomInfo = await pcbService.getProjectInfoByVersionID(info)
    await eeBomService.upadteVersion(eeBomInfo)
    ctx.body = 'update success'
    ctx.status = STATUS_OK
  }
  async createOrUpdatePCBs(ctx) {
    // console.log('createOrUpdate', ctx.request.body)
    try {
      let data = ctx.request.body
      if(!pcbService.checkPcbListSupplyType(data)){
        throw new Error('Missing paramater')
      }
      let result = await pcbSvc.createOrUpdatePCBs(data)
      ctx.body = result
      ctx.status = STATUS_OK
    } catch (err) {
      logger.warn('error request for pcb createOrUpdatePCBs', err)
      throwApiError(err.message, _getErrorStatusCode(err))
    }
  }
  async getPCB(ctx) {
    let { edm_version_id, column, keyword, supply_type } = ctx.query
    if(typeof edm_version_id == 'undefined') {
      throwApiError('edm_version_id required', errorCode.ERRORFORMAT)
    }
    if(typeof column == 'undefined' || typeof keyword == 'undefined') {
      column = ''
      keyword = ''
    }
    let result = await pcbService.getPCB(edm_version_id, column, keyword, false)
    // 20190909 add filter
    let eeSupplyFilter = supply_type ? supply_type.toUpperCase().split(',') : []
    let filterResult = eeUtilies.eeBomFilter(result.list, 'supply_type', eeSupplyFilter)
    result.list = filterResult
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async deletePCB(ctx) {
    let   { ids }  = ctx.request.body
    const result = await pcbService.deletePCB(ids)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getType2(ctx) {
    let userID = ctx.request.user.userID
    let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'List' })
    if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    let type2 = await pcbService.getType2()
    ctx.body = type2
    ctx.status = STATUS_OK
  }
  async importAdder(ctx) {
    let { type } = ctx.request.body
    let result = await pcbService.importPCBAdder(type, ctx.request.files.file)
    if(result) {
      ctx.status = STATUS_OK
    }
  }
  async importBasePrice(ctx) {
    // console.log('======>', ctx.request.files)
    // let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'List' })
    // if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    const result = await pcbService.importBasePrice(ctx.request.files.file)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async calculateAdderFormula(ctx) {
    const result = await pcbFormulaService.calculateFormula(ctx.request.body)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getPCBSpecByWistronPN(ctx) {
    let { wistron_pn, edmVersionID, plant } = ctx.params
    // let { userID } = ctx.request.user
    // let { versionRemark } = ctx.request.body
    // let permissionRes = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Approve' })
    // if(_.isEmpty(permissionRes))  throwApiError('permission denid', errorCode.ERRORFORMAT)
    const result = await pcbService.getPCBSpecByWistronPN(wistron_pn, edmVersionID, plant)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async getPCBSpecByWistronPNWithQuery(ctx) {
    let { wistron_pn } = ctx.params
    let { edmversionid, plant } = ctx.query
    const result = await pcbService.getPCBSpecByWistronPN(wistron_pn, edmversionid, plant)
    ctx.body = result
    ctx.status = STATUS_OK
  }
  async exportPCBResult(ctx) {
    let userID = ctx.request.user.userID
    let data = ctx.request.body
    let response = null
    let exportDate = moment(new Date()).format('YYYYMMDD')
    let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
    let folderPath = `Eprocurement_CleanSheet_EE_PCB_${timeStamp}`
    let fileName = `Eprocurement_CleanSheet_EE_PCB_${exportDate}`
    let filePath = `/server/utils/excel/${folderPath}/${fileName}.xlsx`
    response = await pcbService.exportPCBResult(userID, data, fileName, folderPath)
    ctx.attachment(filePath)
    ctx.body = response
    ctx.status = STATUS_OK
    await send(ctx, filePath)
  }
  async syncEedmPcbBomItem(ctx){
    ctx.status = STATUS_OK
    pcbService.syncEedmPcbBomItem().catch((error)=>{
      logger.error('[pcbAPI][syncEedmPcbBomItem] error :', JSON.stringify(error, null, 2))
    })
  }
}

module.exports = pcb
