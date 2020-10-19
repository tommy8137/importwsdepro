/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')
const UUID = require('uuid/v4')
const https = require('https')
const axios = require('axios')
const path = require('path')

const { emdmServerConfig, eproDomain, port } = require('../../../config')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { formatFloat, asyncForEach } = require('../../helpers/utils')

const meBomUtil = require('../../utils/mebom/meBomUtils.js')
const { sendmail, mailMessage } = require('../../utils/mail/index.js')

const { Excel } = require('../../utils/dataFrame/excel')
const MeBomExport = require('../../utils/mebom/meBomExport.js')
const meBomSpaceRate = require('../../utils/mebom/meBomSpaceRate.js')
const emdmBomUtil = require('../../utils/emdmBom/emdmBomUtils.js')
const emdmUtils = require('../../utils/emdm/index.js')
const log4js = require('../../utils/logger/logger')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

const bomItemService = require('../../service/bom/bomItem.js')
const userService = require('../../service/admin/user.js')
const eeBomService = require('../../service/bom/eeBom.js')
const rbacService = require('../admin/rbac.js')
const emdmBomService = require('../../service/bom/emdmBom.js')

const bomManagerModel = require('../../model/bom/bomManager.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const bomDesigneeModel = require('../../model/bom/bomDesignee.js')
const bomVersionModel = require('../../model/bom/bomVersion.js')
const bomItemModel = require('../../model/bom/bomItem.js')
const emdmMainModel = require('../../model/bom/emdmBomMain.js')
const eeBomMainModel = require('../../model/bom/eeBomMain.js')
const userModel = require('../../model/admin/user.js')

const logger = log4js.getLogger('bomManagerService')
const meFloatPoint = new DecimalGetter('MEBom')
const emdmBomItemListBaseDomain = `https://${eproDomain}/#/g/emdmBomDetail`

const getVersionDuration = async (src) => {
  let bomids = _.map(src, (v) => { return v.id })
  const versionDuration = await bomManagerModel.getVersionDuration(bomids)
  // transfer date time to zh-tw
  _.map(versionDuration, (v) => { v.create_time = moment(v.create_time).locale('zh-tw').format('YYYY-MM-DD HH:mm:ss') })
  // group by bom id
  let groupByBomId = _.groupBy(versionDuration, 'bom_id')

  _.forEach(src, (v) => {
    v.duration = null
    if (groupByBomId[v.id] && groupByBomId[v.id].length > 0) {
      let tmpData = groupByBomId[v.id]
      let findLast = _.maxBy(tmpData, (o) => { return o.create_time })
      let durationArr = []
      _.forEach(tmpData, (dv) => {
        let obj = {}
        let showtimeDiff = true
        let diffTime = null
        let duration = null
        if (findLast.version_name != dv.version_name && findLast.version_name > dv.version_name) {
          obj.version_name = 'V' + dv.version_name
          // showtimeDiff = dv.version_name.split('.')[0] > 0 && dv.version_name.split('.')[1] == 0 ? false : true
          diffTime = moment(findLast.create_time).diff(dv.create_time)
          findLast = dv
        } else if (findLast.version_name && findLast.version_name == dv.version_name) {
          obj.version_name = 'V' + dv.version_name
          // showtimeDiff = dv.version_name.split('.')[0] > 0 && dv.version_name.split('.')[1] == 0 ? false : true
          diffTime = moment().diff(dv.create_time)
        }
        if (obj.version_name && diffTime != null) {
          duration = moment.duration(diffTime)
          let daysStr = duration.days() > 1 ? 'days' : 'day'
          obj.timeDiff = showtimeDiff ? `${duration.days()} ${daysStr} ${duration.hours()} hr ${duration.minutes()} min` : null
          durationArr.push(obj)
        }
      })
      v.duration = durationArr
    }
  })
}

const getEmdmVersions = async (src, userId = null) => {
  let rowData = await emdmMainModel.getVersions(src)
  let editHistories = await emdmMainModel.getBomEditHistory(_.map(rowData, 'id'))
  let itemDetail = await emdmMainModel.getBomItemPartName(_.map(rowData, 'id'))

  // only CE/ ME or CE ME/EE
  let permission = await rbacService.getPolicyByUser(userId, {
    action: 'ForceApprove',
    resource: 'me_bom_projects',
  })

  let result = []
  src.forEach((item) => {

    let resItem = {
      id: item.id,
      product: item.product,
      project_name: item.project_name,
      project_code: item.project_code,
      customer: item.customer,
      stage_id: item.stage_id,
      stage: item.stage,
      site: item.site,
      cost_version: null,
      create_time: item.create_time,
      versions: [],
      fav_id: item.fav_id,
      archive_id: item.archive_id,
    }
    let versionList = rowData.filter((filterItem) => {
      return filterItem.project_code === item.project_code &&
        filterItem.site === item.site &&
        filterItem.stage_id === item.stage_id
    })
    if (versionList.length > 1) {
      versionList.sort((a, b) => b.cost_create_time - a.cost_create_time)
    }

    versionList.sort(function (a, b) {
      if (b.source_version && a.source_version) {
        return b.source_version.split('_')[0] - a.source_version.split('_')[0]
      }
    })

    resItem.cost_version = versionList[0].cost_version

    // _.orderBy(versionList, ['id', 'source_version', 'create_time'], ['desc', 'desc', 'desc'])
    versionList.forEach((versionItem) => {
      let isApproved = false
      let approveTime = null
      let isNextVersion = false
      let version = parseFloat(versionItem.cost_version).toFixed(1)

      if (version % 1 !== 0) {
        isNextVersion = false
      } else if (permission && _.isEmpty(permission.ForceApprove)) {
        isNextVersion = false
      } else {
        isNextVersion = true
        if (version > 0) {
          isApproved = true
        }
      }

      if (isApproved) {
        approveTime = versionItem.cost_create_time
      }

      // sprint 33, 新增edit history 紀錄使用者操作行為

      let editHistory = _.filter(editHistories, (history) => history.bom_id == versionItem.id)
      let itemDetailByBom =  _.filter(itemDetail, (d) => d.bom_id == versionItem.id)
      let editHistoryRes = []
      let ce_user_name = null, sourcer_user_name = null, ce_edit_time = null, sourcer_edit_time = null

      if (editHistory.length > 0) {
        editHistoryRes = meBomUtil.editHistoryFormat(editHistory, itemDetailByBom)
          
        _.chain(editHistory)
          .orderBy(['create_time'], ['desc'])
          .groupBy((h) => h.role)
          .forEach((data, key) => {
            if (key.toUpperCase() == 'SOURCER') {
              sourcer_user_name = data[0].user_name
              sourcer_edit_time = moment(data[0].create_time).format('YYYY-MM-DD HH:mm')
            } else {
              ce_user_name = data[0].user_name
              ce_edit_time = moment(data[0].create_time).format('YYYY-MM-DD HH:mm')
            }
          })
          .value()
      }

      resItem.versions.push({
        id: versionItem.id,
        emdm_version: emdmUtils.genEmdmVersion(versionItem.source_version, versionItem.create_time),
        cost_version_id: versionItem.cost_version_id,
        cost_version: versionItem.cost_version,
        approve_time: approveTime,
        is_next_version: isNextVersion,
        ce_user_name,
        ce_edit_time,
        sourcer_user_name,
        sourcer_edit_time,
        edit_history: editHistoryRes,
      })

      // sprint 25 Project NO，以最舊一版 eMDM BOM 呈現
      resItem.id = versionItem.id
    })

    result.push(resItem)
  })

  return result
}

class BomManager {
  static async exportMeBom(param, id, userID, assign, sku, fileName, folderPath) {
    let { versionid, currency } = param
    if (!currency) {
      currency = 'USD'
    }
    let meBomExport = new MeBomExport(id, userID, sku, versionid, currency)
    let rawData = await meBomExport.createExportData()
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = ''
    if (rawData.meCurrency.length) {
      excelYmlPath = path.join('mebom', 'excel-mebom-price-auth.yaml')
    } else {
      excelYmlPath = path.join('mebom', 'excel-mebom.yaml')
    }
    let skuCount = sku.substring(3)
    rawData['spaceRateSummary'] = rawData.spaceRateDetail.total_summary
    rawData['spaceRateDetail'] = rawData.spaceRateDetail.total_summary_detail
    rawData['spaceRateBomList'] = rawData.spaceRate.bom.bom_list
    rawData['spaceRateCost'] = rawData.spaceRate.cost
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath, skuCount)
    logger.debug(`get the excel path: ${await excel.execute()}`)
  }
  static async getMeBomData(pages, items, orderBy, column, keyword, userId = '') {
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    const result = await bomManagerModel.getMeData(items, offset, orderBy, column, keywordToLowerCase)
    await getVersionDuration(result)

    _.forEach(result, (v) => {
      if (v.create_by === userId) {
        v.own_created = true
      } else {
        v.own_created = false
      }
    })
    let resCount = await bomManagerModel.getMeCount(column, keywordToLowerCase)
    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async getMeBomDataBySearch(pages, items, orderBy, column, keyword, project, userId = '', userProductType){
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    let projectToLowerCase = project.toLowerCase()
    let result = []
    let resCount = 0

    let productTypePermission = userProductType.me.join('|')
    if(productTypePermission.length > 0) {
      result = await bomManagerModel.getMeDataBySearch(items, offset, orderBy, column, keywordToLowerCase, projectToLowerCase, productTypePermission)
      resCount = await bomManagerModel.getMeCountBySearch(productTypePermission, column, keywordToLowerCase, projectToLowerCase)
    }
    if(result.length > 0) {
      await getVersionDuration(result)
    }
    _.forEach(result, (v) => {
      if (v.create_by === userId) {
        v.own_created = true
      } else {
        v.own_created = false
      }
    })
    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async getBomDataByUser(userId, pages, items, orderBy, column, keyword) {
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    const result = await bomManagerModel.getDataByUser(userId, items, offset, orderBy, column, keywordToLowerCase)
    let resCount = await bomManagerModel.getCount('', column, keywordToLowerCase, userId)
    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async getMeBomDetailData(id) {
    let bomProjectId = id
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomProjectId)
    let pjResult = {}
    if (isEmdmProject) {
      // 串接Function Team 的PIC名單用的id，等確定要改在打開
      // const getNewestEmdmBomProjectId = await emdmMainModel.getNewestEmdmBomProjectIdByBomProjectId (bomProjectId)
      // bomProjectId = getNewestEmdmBomProjectId[0].id
      pjResult = await emdmMainModel.getEmdmBomDetailById(bomProjectId)
      pjResult[0].version_id = pjResult[0].cost_version_id ? pjResult[0].cost_version_id : null
      pjResult[0].version = pjResult[0].cost_version ? pjResult[0].cost_version : null
    } else {
      pjResult = await bomManagerModel.getMeBomDetailById(bomProjectId)
    }
    const desResult = await bomDesigneeModel.getMeBomDesigneeData(bomProjectId)
    let pjFilterRes = {}
    let desFilterRes = []
    if (pjResult && pjResult.length > 0) {
      if (pjResult[0].id) pjFilterRes.id = pjResult[0].id
      pjFilterRes.project_name = pjResult[0].project_name ? pjResult[0].project_name : ''
      pjFilterRes.version_id = pjResult[0].version_id ? pjResult[0].version_id : ''
      pjFilterRes.version = pjResult[0].version ? pjResult[0].version : ''
      pjFilterRes.create_by = pjResult[0].create_by ? pjResult[0].create_by : ''
      pjFilterRes.project_code = pjResult[0].project_code ? pjResult[0].project_code : ''
      // pjFilterRes.system_model_pn = pjResult[0].system_model_pn ? pjResult[0].system_model_pn : ''
      // pjFilterRes.id_cmf_file_data = pjResult[0].id_cmf_file_data ? pjResult[0].id_cmf_file_data : ''
      pjFilterRes.product_spec = pjResult[0].product_spec ? pjResult[0].product_spec : ''
      pjFilterRes.sku_desc = pjResult[0].sku_desc ? pjResult[0].sku_desc : ''
      let tmp = {}
      pjFilterRes.customer = { key:'-', value:'-' }
      pjFilterRes.product_type = { key:'-', value:'-' }
      pjFilterRes.stage = { key:'-', value:'-' }
      pjFilterRes.site = { key:'-', value:'-' }
      pjFilterRes.project_leader = { key:'-', value:'-' }
      pjFilterRes.approved_by = { key:'-', value:'-' }

      if (pjResult[0].customer) {
        tmp = { key: pjResult[0].customer, value: pjResult[0].customer ? pjResult[0].customer : null }
        pjFilterRes.customer = tmp
      }
      if (pjResult[0].product_type) {
        tmp = { key: pjResult[0].product_type, value: pjResult[0].product_type ? pjResult[0].product_type : null }
        pjFilterRes.product_type = tmp
      }
      if (pjResult[0].stage_id) {
        tmp = { key: pjResult[0].stage_id, value: pjResult[0].stage }
        pjFilterRes.stage = tmp
      }
      if (pjResult[0].site) {
        tmp = { key: pjResult[0].site, value: pjResult[0].site }
        pjFilterRes.site = tmp
      }
      if (pjResult[0].project_leader) {
        tmp = { key: pjResult[0].project_leader, value: pjResult[0].project_leader_name ? pjResult[0].project_leader_name : pjResult[0].project_leader }
        pjFilterRes.project_leader = tmp
      }
      if (pjResult[0].approved_by) {
        tmp = { key: pjResult[0].approved_by, value: pjResult[0].approved_by_name ? pjResult[0].approved_by_name : pjResult[0].approved_by }
        pjFilterRes.approved_by = tmp
      }
    }

    if (desResult && desResult.length > 0) {
      _.forEach(desResult, (v) => {
        let res = {}
        res.id = v.id
        res.seq = v.seq
        res.user = { key: v.user_id, value: v.user_name ? v.user_name : v.user_id }
        res.function_team = v.function_team_name ? { key: v.function_team_name, value: v.function_team_name } : ''
        res.isfunctionteam = v.isfunctionteam ? v.isfunctionteam : false
        desFilterRes.push(res)
      })
    }

    let result = {}
    result.bomProject = pjFilterRes
    result.bomDesignee = desFilterRes
    return result
  }

  static async insertBomData(userid, info) {
    // Get next version and update version sample
    // let nextVersion = await bomVersionModel.getNextVersion(21, 1, 'VERSIONCOMPLETE')
    // let res = await bomVersionModel.updateVersionByStage(21, 1, nextVersion)
    let checkProjectCodeRepeat = 0
    if (info.bomProject && info.bomProject.project_code) {
      checkProjectCodeRepeat = await bomManagerModel.getMeCountByProjectCode(info.bomProject.project_code)
    }
    if (checkProjectCodeRepeat > 0) {
      return 'C000401' // 建立了重複的project code
    }
    if (info.bomDesignee.length > 0) {
      let client = await new tsystemDB()
      let prjId = await bomManagerModel.insertData(client, userid, info.bomProject)
      await bomDesigneeModel.insertDesigneeData(client, prjId, info.bomDesignee)
      await bomVersionModel.insertVersionDataWithTran(client, prjId, info.bomProject.stage, '0.0')
      await bomManagerModel.insertBomProjectParams(client, prjId, info.bomProject.product_type)
      await client.commit()
      return { id: prjId }
    } else {
      return false
    }
  }

  static async updateBomData(id, info) {
    let checkProjectCodeRepeat = 0
    if (info.bomProject && info.bomProject.project_code) {
      checkProjectCodeRepeat = await bomManagerModel.getMeCountByProjectCode(info.bomProject.project_code, id)
    }
    if (checkProjectCodeRepeat > 0) {
      return 'C000401' // 建立了重複的project code
    }
    let isProductTypeChange = false
    if (info.bomProject && info.bomProject.product_type){
      isProductTypeChange = await bomVersionModel.checkNeedUpdateProductType(id, info.bomProject.product_type)
    }

    try {
      let client = await new tsystemDB()
      await bomManagerModel.updateData(client, id, info.bomProject)
      if (info.bomDesignee && info.bomDesignee.length > 0) {
        await bomDesigneeModel.updateDesigneeData(client, id, info.bomDesignee)
      }
      if (info.bomProject && info.bomProject.version_id && info.bomProject.stage) {
        let version_id = info.bomProject.version_id
        let stage = info.bomProject.stage
        let isStageChange = await bomVersionModel.checkNeedUpdateStage(id, version_id, stage)
        if (isStageChange) {
          await bomVersionModel.updateStage(client, id, version_id, stage)
        }
      }
      if (isProductTypeChange) {
        await bomManagerModel.insertBomProjectParams(client, id, info.bomProject.product_type, true)
      }
      await client.commit()
    } catch (err) {
      logger.error(err)
      throw err
    }
    return { id: id }
  }

  static getBomFilterType(role) {
    return bomManagerModel.getBomFilterType(role)
  }


  static async getBomFilterItems(column, userID, projectSource = ''){
    return await bomManagerModel.getBomFilterItems(column, userID, projectSource)
  }

  static async getEEBomFilterItems(column, userID){
    return await bomManagerModel.getEEBomFilterItems(column, userID)
  }


  static async getCreateBomBaseData(userID){
    let response = {}
    try {
      let customerData = await bomManagerModel.getCustomerBaseData()
      // let productTypeBaseData = await bomManagerModel.getProductTypeBaseData()
      let productTypeBaseData = await bomManagerModel.getCreateProductTypeData(userID)
      let stageBaseData = await bomManagerModel.getStageData()
      let siteBaseData = await bomManagerModel.getSiteData()
      let functionTeamNameBaseData = await bomManagerModel.getFunctionTeamName()

      response = {
        customer: customerData,
        productType: productTypeBaseData,
        stage: stageBaseData,
        site: siteBaseData,
        functionTeamName: functionTeamNameBaseData,
      }
    } catch (err) {
      throw err
    }
    return response
  }

  static async uploadImage(name, fpath, userName) {
    return await bomManagerModel.uploadImage(name, fpath, userName)
  }

  static async checkEditUser(id, userId) {
    try {
      return await bomDesigneeModel.checkEditUser(id, userId)
    } catch (err) {
      throw err
    }
  }

  static async getAlreadyDesigneeCount(id) {
    try {
      return await bomDesigneeModel.getAlreadyDesigneeCount(id)
    } catch (err) {
      throw err
    }
  }
  static async getCopyProjectList(userID) {
    let result = []
    let userProductTypePermission = await userService.getPersonalUserProductType(userID, 'bom')
    let productTypePermission = userProductTypePermission.me
    let projectRes = []
    if(productTypePermission.length > 0) {
      let favResult = await emdmMainModel.getFavEmdmDataBySearch(null, '', null, null, null, null, productTypePermission, userID, false)
      projectRes.push(...favResult)

      let othersResult = await emdmMainModel.getEmdmDataBySearch(null, '', null, null, null, null, productTypePermission, '', userID, false)
      othersResult = _.filter(othersResult, (res) => res.fav_id == null)
      projectRes.push(...othersResult)
    }
    projectRes.forEach((project) => {
      let bom_id = project.id
      let label  = `${project.project_name}(${project.project_code})`
      let exists = result.findIndex((item) => item.label === label) >= 0
      if (!exists) {
        result.push({
          bom_id,
          label,
        })
      }
    })
    return {
      'projectList': result,
    }
  }

  static async getCopyVersionList(bomID) {

    let checkBomProjectExist = await bomItemModel.checkBomProjectExist(bomID)
    if (!checkBomProjectExist) {
      throwApiError('bom id not found', errorCode.NOT_FOUND)
    }
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomID)
    if (!isEmdmProject) {
      throwApiError('This api is only for EMDM projects.', errorCode.BAD_REQUEST)
    }
    let result = []
    let projectInfo = await emdmMainModel.getEmdmBomDetailById(bomID)

    let projectCode = projectInfo[0].project_code
    let projectSite = projectInfo[0].site
    let avaliableProjectList = await emdmMainModel.getEmdmDataBySearch('', '', '', '', '', projectCode, '', projectSite)

    let versionList = await emdmMainModel.getVersions(avaliableProjectList)
    versionList.forEach((item) => {
      if (item.cost_version != '0.0') {
        result.push({
          'bom_id': item.id,
          'label': `${item.source_version}_${moment(item.create_time).format('YYYYMMDDHHmm')} -- Cost ${item.cost_version}`,
          'stage': item.stage,
        })
      }
    })
    result.sort((a, b) => {
      return parseInt(b.label.split('_')[0], 10) - parseInt(a.label.split('_')[0], 10)
    })
    return {
      'copyList': result,
    }
  }

  static async bomApproval(bomID, userID, copyCostBomID) {

    let checkBomProjectExist = await bomItemModel.checkBomProjectExist(bomID)
    if (!checkBomProjectExist) {
      throwApiError('bom id not found', errorCode.NOT_FOUND)
    }

    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomID)
    let checkApproveRes = false
    if (isEmdmProject) {
      checkApproveRes = await emdmBomUtil.checkAllowApprove(bomID, userID)
    } else {
      checkApproveRes = await meBomUtil.checkAllowApprove(bomID, userID)
    }

    if (checkApproveRes) {
      let client = await new tsystemDB()

      if (isEmdmProject) {
        await bomItemService.reCalPartlistPrice(client, bomID, true)
      }
      // Update versionId
      // if new version uuid diff with old version uuid update all bom item version_id
      let getUUid = await bomVersionModel.getNextVersionUuid(client, bomID, 'APPROVE')
      if (getUUid && getUUid.isNewRecord) {
        // new uuid update bom item
        await bomVersionModel.updateBomItemVersionId(client, getUUid.old_version_id, getUUid.new_version_id)
      }
      await client.commit()

      if (isEmdmProject) {
        await bomItemService.updateBomItemSourcerCostByBomId(bomID) // 更新 sourcer cost 匯率
        await bomItemService.updateBomItemLastPriceByBomId(bomID, true)// 更新last price
        if (copyCostBomID) {
          await emdmBomService.copyBomCost(bomID, copyCostBomID)
        }
        await this.sendMailToSourcer(bomID)
      }
      return true
    } else {
      throwApiError('permission deney', errorCode.UNAUTHORIZED)
    }

    // ME FM/TM
    // let approvalPermission = await rbacService.getPolicyByUser(userID, {
    //   action: 'Approve',
    //   resource: 'me_bom_projects',
    // })

    // let userPermission = await bomItemModel.bomVersionActionPermission(bomID, 'APPROVE', userID)
    // if (!_.isEmpty(approvalPermission) && userPermission > 0) {
    //   let version = await bomManagerModel.bomGetVersion(bomID, 5)
    //   if (version.length > 0) {
    //     // let nextVersion = await bomVersionModel.getNextVersion(bomID, version[0].stage_id, 'APPROVE')
    //     // let result = await bomVersionModel.updateVersionById(bomID, version[0].id, nextVersion)
    //     let client = await new tsystemDB()
    //     // Update versionId
    //     // if new version uuid diff with old version uuid update all bom item version_id
    //     let getUUid = await bomVersionModel.getNextVersionUuid(client, bomID, 'APPROVE')
    //     if (getUUid && getUUid.isNewRecord) {
    //       //new uuid update bom item
    //       await bomVersionModel.updateBomItemVersionId(client, getUUid.old_version_id, getUUid.new_version_id)
    //     }
    //     await client.commit()
    //     return true
    //   } else {
    //     throwApiError('version does not match', errorCode.ERRORFORMAT)
    //   }
    // }
    // throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }

  /** @TODO eMDM sync completed bom price */
  static async bomComplete(id, userID) {

    let checkBomProjectExist = await bomItemModel.checkBomProjectExist(id)
    if (!checkBomProjectExist) {
      throwApiError('bom id not found', errorCode.NOT_FOUND)
    }

    // CE
    let versionCompletePermission = await rbacService.getPolicyByUser(userID, {
      action: 'VersionComplete',
      resource: 'me_bom_projects',
    })

    if (!_.isEmpty(versionCompletePermission)) {
      let version = await bomManagerModel.bomGetVersion(id, 7)
      if (version.length > 0) {
        // let nextVersion = await bomVersionModel.getNextVersion(id, version[0].stage_id, 'VERSIONCOMPLETE')
        // let result = await bomVersionModel.updateVersionById(id, version[0].id, nextVersion)
        let client = await new tsystemDB()
        // let nextVersion = await bomVersionModel.getNextVersionUuid(client, id, 'VERSIONCOMPLETE')
        // Update versionId
        // if new version uuid diff with old version uuid update all bom item version_id

        try {
          let getUUid = await bomVersionModel.getNextVersionUuid(client, id, 'VERSIONCOMPLETE')
          if (getUUid && getUUid.isNewRecord) {
            await copyCompleteVersionBomItem(client, getUUid.old_version_id, getUUid.new_version_id)
          }
          let isEmdmProject = await emdmBomUtil.isEmdmProject(id)
          if (!isEmdmProject) {
            await client.commit()
            return true
          }
          const bom = await bomManagerModel.getMeBomDetailById(id, 'EMDM')
          if (bom.length > 0 && bom[0].project_source && bom[0].project_source.toUpperCase() === 'EMDM') {

            const bomItemInfo = await bomItemService.getBomItem(id, userID, 'all', 'sku1', false)
            const bomItemsWithPartList = await bomItemModel.getPartlistExportData(id)

            const bomItems = (bomItemInfo.bomItems || []).map((item) => {

              const bomItemWithPartlist = bomItemsWithPartList.find(biwp => biwp.id === item.id) || {}
              return {
                ...bomItemWithPartlist,
                ...item,
              }
            })


            let skuArr = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']
            let comparisonCostItems = {
              'sku1': bomItemInfo.bomItems,
            }
            await asyncForEach(skuArr, async (skuKey) => {
              if (skuKey !== 'sku1') {
                let infoRes = await bomItemService.getBomItem(id, userID, 'all', skuKey, false)
                comparisonCostItems[skuKey] = infoRes.bomItems
              }
            })

            const emdmComparisonInfo = emdmUtils.getEmdmComparisonTable(bom[0], bomItems, comparisonCostItems)
            let url = `${emdmServerConfig.emdmServerProtocol}://${emdmServerConfig.emdmServerIp}:${emdmServerConfig.emdmServerPort}/eprocurement/sendProjectValuationInfo`
            const agent = {
              httpsAgent: new https.Agent({
                rejectUnauthorized: false,
              }),
              headers: { 'content-type': 'application/json; charset=utf-8' },
            }
            await axios.post(url, emdmComparisonInfo, agent)
            await client.commit()
          }
        } catch (err) {
          await client.rollback()
          logger.error(err)
          throwApiError('bom complete with error', errorCode.INTERNAL_ERROR)
        }
        return true
      } else {
        throwApiError('version does not match', errorCode.ERRORFORMAT)
      }
    }
    throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }
  static async getEeBomData(pages, items, orderBy, column, keyword, userId = '') {
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    let result = await eeBomMainModel.getEeData(items, offset, orderBy, column, keywordToLowerCase)
    let versionResult
    for (let i = 0; i < result.length; i++) {
      if (result[i].approve_time != null) {
        result[i].approve_time = moment(result[i].approve_time).format('YYYY/MM/DD')

      }
      versionResult = await eeBomService.getEdmVersion(result[i].id)
      if (versionResult.edmVersions.length == 0) {
        result[i].is_next_stage = false
      } else {
        result[i].is_next_stage = true
      }
    }
    let resCount = await eeBomMainModel.getEeCount(column, keywordToLowerCase)
    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async getEeBomDataBySearch(pages, items, orderBy, column, keyword, project, userId = '', userProductType) {
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    let projectToLowerCase = project.toLowerCase()
    let result = []
    let resCount = 0
    let productTypePermission = userProductType.ee.join('|')
    if(productTypePermission.length > 0) {
      result = await eeBomMainModel.getEeDataBySearch(items, offset, orderBy, column, keywordToLowerCase, projectToLowerCase, productTypePermission)
      resCount = await eeBomMainModel.getEeCountBySearch(productTypePermission, column, keywordToLowerCase, projectToLowerCase)
    }
    let versionResult
    for (let i = 0; i < result.length; i++) {
      if (result[i].approve_time != null) {
        result[i].approve_time = moment(result[i].approve_time).format('YYYY/MM/DD')
      }
      result[i].version = parseFloat(result[i].version).toFixed(1)
      versionResult = await eeBomService.getEdmVersion(result[i].id)
      if (versionResult.edmVersions.length == 0) {
        result[i].is_next_stage = false
      } else {
        result[i].is_next_stage = true
      }
      result[i].platform = {
        platform: result[i].platform,
        panel_size: result[i].panel_size,
      }
      result[i] = _.omit(result[i], ['panel_size'])
    }
    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async exportSpaceRateSummary(userID, fileName, folderPath, param) {
    let { product, customer, stage, after, before } = param
    let userProductTypePermission = await userService.getPersonalUserProductType(userID, 'bom')
    product = product ? [product] : null
    let getRes = await emdmMainModel.getSpaceRateFilterBy(product, customer, stage, after, before)
    getRes = _.filter(getRes, (res) => userProductTypePermission.me.includes(res.product))
    let versionsRes = await getEmdmVersions(getRes, userID)
    let spaceRateSummaryIdList = []
    versionsRes.forEach((versionItem) => {
      let baseBomId = versionItem.id// 顯示用的bomId
      let realBomId = versionItem.versions[0].id // 真正的emdmVersion bomId
      spaceRateSummaryIdList.push([baseBomId, realBomId])
    })
    let spaceRateRes = await meBomSpaceRate.createSpaceRateAllBom(spaceRateSummaryIdList, userID)
    let rawData = {
      spaceRateRes,
    }

    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = ''
    excelYmlPath = path.join('space-rate', 'excel-space-rate.yaml') // Tommy TODO
    // let skuCount = sku.substring(3)
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    logger.debug(`get the excel path: ${await excel.execute()}`)
  }

  static async getSpaceRateFilterBy(userID, param) {
    let result = {
      product: [],
      customer: [],
      stage: [],
      count: 0,
    }
    let { product, customer, stage, after, before } = param
    let userProductTypePermission = await userService.getPersonalUserProductType(userID, 'bom')
    product = product ? [product] : null
    let getRes = await emdmMainModel.getSpaceRateFilterBy(product, customer, stage, after, before)
    getRes = _.filter(getRes, (res) => userProductTypePermission.me.includes(res.product))
    result.count = getRes.length
    getRes.forEach((res) => {
      if (!result.product.includes(res.product) && !_.isNil(res.product)) {
        result.product.push(res.product)
      }
      if (!result.customer.includes(res.customer) && !_.isNil(res.customer)) {
        result.customer.push(res.customer)
      }
      if (!result.stage.includes(res.stage) && !_.isNil(res.stage)) {
        result.stage.push(res.stage)
      }
    })
    return result
  }


  static async getEmdmBomDataBySearch(pages, items, orderBy, column, keyword, project, userId, userProductType, disable = false){
    const offset = (pages - 1) * items
    let keywordToLowerCase = keyword.toLowerCase()
    let projectToLowerCase = project.toLowerCase()
    let result = []
    let resCount = 0
    let productTypePermission = userProductType.me// .join('|')

    if(productTypePermission.length > 0) {
      let favResult = await emdmMainModel.getFavEmdmDataBySearch(items, offset, orderBy, column, keywordToLowerCase, projectToLowerCase, productTypePermission, userId, disable)
      result.push(...favResult)

      let othersResult = await emdmMainModel.getEmdmDataBySearch(items, offset, orderBy, column, keywordToLowerCase, projectToLowerCase, productTypePermission, '', userId, disable)
      othersResult = _.filter(othersResult, (res) => res.fav_id == null)
      result.push(...othersResult)

      resCount = await emdmMainModel.getEmdmCountBySearch(productTypePermission, column, keywordToLowerCase, projectToLowerCase, disable)
    }

    if(result.length > 0) {
      result = await getEmdmVersions(result, userId)
    }

    let response = {
      bomInfo: {
        numberOfBom: resCount,
        bomList: result,
      },
    }
    return response
  }

  static async getBomProjectParams(bomId){
    let queryRes = await bomManagerModel.getBomProjectParams(bomId)
    queryRes.forEach((item) => {
      let splitGorupName = item.group_name.split('_')
      if (splitGorupName.length === 2) {
        item.group_name = splitGorupName[1]
      }
      if (item.unit === '%') {
        item.value = formatFloat(parseFloat(item.value) * 100, meFloatPoint.get('ceProjectParameters'))
      }
    })
    return {
      bomParams:queryRes,
    }
  }

  static async updateBomProjectParams(bomId, bomParams, userID){
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
    let updateItemList = []
    let formatPercentValue = function (value) {
      return formatFloat(parseFloat(value) / 100, meFloatPoint.get('ceProjectParameters') + 2)
    }

    let pushUpdateItem = function(id, value, unit) {
      if (unit === '%') {
        updateItemList.push({
          id,
          value: formatPercentValue(value),
        })
      } else {
        updateItemList.push({
          id,
          value,
        })
      }

    }
    let checkValueChangeOrNot = function (updateValue, oriValue, unit) {
      if (unit === '%') {
        updateValue = formatPercentValue(updateValue)
      }
      return updateValue != oriValue
    }

    let reCalBomId = null

    let history = []
    if (isEmdmProject) {
      let versions = await emdmBomService.getEmdmVersionsById(bomId)
      let emdmIdList = []
      let emdmVersionIdList = []

      versions.sort((a, b) => parseInt(b.source_version) - parseInt(a.source_version)) // emdm version 大到小
      let lastEditingVersion = versions.find((item) => item.cost_version.split('.')[1] === '7')// 找到最新.7版
      versions.forEach((item) => {
        emdmIdList.push(item.id)
        emdmVersionIdList.push({
          bom_id: item.id,
          version_id: item.cost_version_id,
        })
      })

      reCalBomId = lastEditingVersion ? lastEditingVersion.id : null
      
      let bomParamsFromDb = await bomManagerModel.getBomProjectParams(bomId)
      let paramsLength = bomParamsFromDb.length
      let allParams = await bomManagerModel.getMultiBomProjectParams(emdmIdList)
      let edit_type = await bomItemModel.getBomEditType('project_parameters')

      allParams.forEach((param) => {

        for (let i = 0; i < paramsLength; i++) {
          let originParam = bomParamsFromDb[i]
          if (param.label_name === originParam.label_name && param.group_name === originParam.group_name) {
 
            let updateValue = bomParams.find((inParam) => inParam.id === originParam.id).value
            pushUpdateItem(param.id, updateValue, originParam.unit)
            
            let changeFlag = checkValueChangeOrNot(updateValue, originParam.value, originParam.unit)
            if (changeFlag) {
              history.push({
                bom_id: param.bom_id,
                field_type_id: _.find(edit_type, (type) => type.part_type == param.group_name && type.label_name == param.label_name).id,
                // field_type_label_name: _.find(edit_type, (type) => type.part_type == param.group_name && type.label_name == param.label_name).label_name,
                value: updateValue.toString(),
                bom_version_id: _.find(emdmVersionIdList, (bom) => bom.bom_id == param.bom_id).version_id,
                role: 'CE',
                user_id: userID,
                action: 'EditProjectParameters',
                source_item_id: null,
              })
            }

            break
          }
        }
      })
    } else {
      reCalBomId = bomId
      let bomParamsFromDb = await bomManagerModel.getBomProjectParams(bomId)
      let paramsLength = bomParamsFromDb.length
      bomParams.forEach((param) => {
        for (let i = 0; i < paramsLength; i++) {
          let originParam = bomParamsFromDb[i]
          if (param.id === originParam.id) {
            pushUpdateItem(param.id, param.value, originParam.unit)
            break
          }
        }
      })
    }
    let updateItemListLength = updateItemList.length
    if (updateItemListLength === 0) {
      throwApiError('Nothing to update.', errorCode.NOT_FOUND) // 沒東西要更新
      return
    }
    let client = await new tsystemDB()

    try{
      for (let i = 0; i < updateItemListLength; i++) {
        let updateItem = updateItemList[i]
        await bomManagerModel.setBomProjectParams(client, updateItem.id, updateItem.value)
      }

      if(isEmdmProject) {
        await bomItemModel.insertBomEditHistory(client, history)
      }

      await client.commit()// 先存入 db 在重算

      client = await new tsystemDB()
      if (reCalBomId) {
        await bomItemService.reCalPartlistPrice(client, reCalBomId)
      }

      await client.commit()
    } catch (error) {
      logger.error(error)
      await client.rollback()
      throwApiError('server error', errorCode.INTERNAL_ERROR)
    }
  }
  static async checkUserMEProductType(userID, bom_id) {
    let result = false
    let bomProductType = await bomManagerModel.getBomMEProductType(bom_id)
    if (bomProductType && bomProductType.length) {
      let productType = bomProductType[0].product_type
      result = await userService.checkUserProductTypePermission(userID, 'ME', productType)
    }
    /* let userProductTypePermission = await userService.getPersonalUserProductType(userID, 'bom')
    if(!_.isNil(bomProductType[0].product_type)) {
      let userPtPermission = _.map(userProductTypePermission.me, i => i.toUpperCase().trim())
      let bomPtPermission = bomProductType[0].product_type.toUpperCase().trim()
      result = userPtPermission.includes(bomPtPermission)
    } */
    return result
  }

  static async setBomFavorite(user_id, project_code, site, stage_id) {
    let obj = {
      user_id,
      project_code,
      site,
      stage_id,
    }

    let exist = await emdmMainModel.checkBomManagementListExist('wiprocurement.bom_user_favorite', obj)

    if (exist == false) {
      let client = await new tsystemDB()
      try {
        let res = await emdmMainModel.setBomManagementList(client, 'wiprocurement.bom_user_favorite', obj)
        await client.commit()
        return {
          fav_id: res,
        }
      } catch (error) {
        logger.error(error)
        await client.rollback()
        throwApiError(error, errorCode.BAD_REQUEST)
      }
    } else {
      throwApiError('C000501', errorCode.BAD_REQUEST)
    }
  }

  static async delBomFavorite(fav_id) {

    let client = await new tsystemDB()
    try {
      await emdmMainModel.delBomManagementList(client, 'wiprocurement.bom_user_favorite', { id: fav_id })
      await client.commit()

    } catch (error) {
      logger.error(error)
      await client.rollback()
      throwApiError(error, errorCode.BAD_REQUEST)
    }
  }
  static async setBomArchive(project_code, site, stage_id) {
    let obj = {
      project_code,
      site,
      stage_id,
    }

    let exist = await emdmMainModel.checkBomManagementListExist('wiprocurement.bom_projects_archive', obj)
    if (exist == false) {
      let client = await new tsystemDB()
      try {
        let res = await emdmMainModel.setBomManagementList(client, 'wiprocurement.bom_projects_archive', obj)
        await client.commit()

        return {
          archive_id: res,
        }
      } catch(error) {
        logger.error(error)
        await client.rollback()
        throwApiError(error, errorCode.BAD_REQUEST)
      }
    } else {
      throwApiError('C000501', errorCode.BAD_REQUEST)
    }
  }
  static async delBomArchive(archive_id) {
    let client = await new tsystemDB()
    try {
      await emdmMainModel.delBomManagementList(client, 'wiprocurement.bom_projects_archive', { id : archive_id })
      await client.commit()
    } catch(error) {
      logger.error(error)
      await client.rollback()
      throwApiError(error, errorCode.BAD_REQUEST)
    }
  }
  /**
   *
   * @param {Number} bomId bom project id
   */
  static async getSourcerPermission(bomId) {
    try {
      const result = {
        sourcer_permission: [],
      }
      const getSourcerPermissionResult = await bomManagerModel.getSourcerPermission(bomId)
      if(getSourcerPermissionResult.rowCount > 0){
        result.sourcer_permission = getSourcerPermissionResult.rows[0].sourcer_permission
      }
      return result
    } catch(error) {
      logger.error('[bomManager][getSourcerPermission] error : ', error)
      throwApiError(error, errorCode.BAD_REQUEST)
    }
  }
  /**
   *
   * @param {Number} bomId bom project id
   * @param {Array} sourcerPermission sourcer list
   */
  static async setSourcerPermission(bomId, sourcerPermission) {
    const dbClient = await new tsystemDB()
    try {
      let sourcerPermissionId = null
      const getSourcerPermissionResult = await bomManagerModel.getSourcerPermission(bomId)
      if(getSourcerPermissionResult.rowCount === 0){
        sourcerPermissionId = await this._updateBomProjectSourcerPermissionId(dbClient, bomId)
      } else {
        sourcerPermissionId = getSourcerPermissionResult.rows[0].id
      }
      await this._updateSourcerPermission(dbClient, sourcerPermissionId, sourcerPermission)
      return {
        sourcer_permission: sourcerPermission,
      }
    } catch(error) {
      logger.error('[bomManager][setSourcerPermission] error : ', JSON.stringify(error, null, 2))
      throwApiError(error, errorCode.BAD_REQUEST)
    }
  }
  static async _updateSourcerPermission(dbClient, sourcerPermissionId, sourcerPermission) {
    try {
      await bomManagerModel.upsertSourcerPermission(dbClient, sourcerPermissionId, sourcerPermission)
      await dbClient.commit()
    } catch (error) {
      logger.error('[bomManager][_updateSourcerPermission] error : ', error)
      await dbClient.rollback()
      throw new Error(error)
    }
  }
  static async _updateBomProjectSourcerPermissionId(dbClient, bomId) {
    try {
      const isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
      const updateBomProjectIdList = []
      let sourcerPermissionId = null
      if(isEmdmProject){
        const bomProjectList = await emdmBomService.getEmdmVersionsById(bomId)
        for(const bomProject of bomProjectList){
          if(_.isNil(bomProject.sourcer_permission_id)){
            updateBomProjectIdList.push(bomProject.id)
          } else {
            sourcerPermissionId = bomProject.sourcer_permission_id
          }
        }
      } else {
        updateBomProjectIdList.push(bomId)
      }
      sourcerPermissionId = _.isNil(sourcerPermissionId) ? UUID() : sourcerPermissionId
      await bomManagerModel.updateSourcerPermissionIdByBomProjectIdList(dbClient, sourcerPermissionId, updateBomProjectIdList)
      return sourcerPermissionId
    } catch (error) {
      logger.error('[bomManager][_updateBomProjectSourcerPermissionId] error : ', error)
      await dbClient.rollback()
      throw new Error(error)
    }
  }
  static async sendMailToCE(bomId){
    try {
      const searchCEInfo = {
        roleGroup:'CE',
        offset: 0,
        orderBy: 'name_a',
        keyword: '',
      }
      const numberOfMeUser = await userModel.getUserByKeywordNumber(searchCEInfo.keyword, searchCEInfo.roleGroup, 'ME')
      const numberOfMeEeUser = await userModel.getUserByKeywordNumber(searchCEInfo.keyword, searchCEInfo.roleGroup, 'ME_EE')
      const getCeMeUserList = await userModel.getUserByKeyword(numberOfMeUser, searchCEInfo.offset, searchCEInfo.orderBy, searchCEInfo.keyword, searchCEInfo.roleGroup, 'ME')
      const getCeMeEeUserList = await userModel.getUserByKeyword(numberOfMeEeUser, searchCEInfo.offset, searchCEInfo.orderBy, searchCEInfo.keyword, searchCEInfo.roleGroup, 'ME_EE')
      const ceMemberList = getCeMeUserList.concat(getCeMeEeUserList)
      const ceMailList = ceMemberList.map((ceUserInfo) => ceUserInfo.email_address)
      const bomProjectInfo = await this._getEmailBomProjectInfo(bomId)
      const bomItemListDomain = `${emdmBomItemListBaseDomain}/${bomId}`
      const mailInfo = mailMessage.sourcerToCEMsg(bomProjectInfo, ceMailList, bomItemListDomain)
      await sendmail(mailInfo)
    } catch (error) {
      logger.error('[bomManager][_updateSourcerPermissionId] error : ', error)
      throw new Error(error)
    }
  }
  static async sendMailToSourcer(bomId){
    try {
      const { sourcer_permission : sourcerPermissionList } = await this.getSourcerPermission(bomId)
      if(sourcerPermissionList.length === 0){
        return
      }
      const bomProjectInfo = await this._getEmailBomProjectInfo(bomId)
      const bomItemListDomain = `${emdmBomItemListBaseDomain}/${bomId}`
      const sourcerMailList = sourcerPermissionList.map((sourcerInfo)=> sourcerInfo.email_address)
      const mailInfo = mailMessage.CEToSourcerMsg(bomProjectInfo, sourcerMailList, bomItemListDomain)
      await sendmail(mailInfo)
    } catch (error) {
      logger.error('[bomManager][_updateSourcerPermissionId] error : ', error)
      throw new Error(error)
    }
  }
  static async _getEmailBomProjectInfo(bomId){
    const isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
    let bomProjectInfo = {}
    let result = {
      bomId: bomId,
      projectName: '',
      projectCode: '',
      customer: '',
      productType: '',
      emdmVersion: '',
      costVersion: '',
    }
    if(isEmdmProject){
      const emdmProjectList = await emdmBomService.getEmdmVersionsById(bomId)
      bomProjectInfo = emdmProjectList.find((emdmProjectInfo) => emdmProjectInfo.id === bomId)
      result.productType = bomProjectInfo.product
      result.costVersion = bomProjectInfo.cost_version
    } else {
      bomProjectInfo = await bomManagerModel.getMeBomDetailById(bomId)[0]
      result.productType = bomProjectInfo.product_type
      result.costVersion = bomProjectInfo.version
    }
    result.projectName = bomProjectInfo.project_name
    result.projectCode = bomProjectInfo.project_code
    result.customer = bomProjectInfo.customer
    result.emdmVersion = emdmUtils.genEmdmVersion(bomProjectInfo.source_version, bomProjectInfo.create_time)
    return result
  }

  static async getBomHistory(bomID, fileName, folderPath) {
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = path.join('history', 'excel-history.yaml')
    let edit_history = await emdmMainModel.getBomEditHistory([bomID])
    let item_detail = await emdmMainModel.getBomItemPartName([bomID])

    let historyData = []
    if (edit_history.length > 0) {
      historyData = meBomUtil.editHistoryFormat(edit_history, item_detail)
    }
    let historyList = _.map(historyData, (data, idx) => {
      let string = ''
      _.forEach(data.history, (hData, hidx) => {
        if(hidx == data.history.length - 1) {
          string = string.concat(`${hData.item_name} -> ${hData.field_label} : ${hData.value}`)
        } else {
          string = string.concat(`${hData.item_name} -> ${hData.field_label} : ${hData.value} \n `)
        }
      })
      let compose = {
        cost_version: data['cost_version'],
        edit_user_name: data['edit_user_name'],
        edit_time: data['edit_time'],
        item: string,
      }
      return compose
    })
    let rawData = {
      historyList,
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    logger.debug(`get the excel path: ${await excel.execute()}`)
  }

  static async exportWsdBom(fileName, folderPath) {
    // fake data
    let rawData = {
      bomSummary: {},
      totalSummary: [],
      totalSummaryDetail: [],
      'metal': [
        {
          "epro": {
            "part_name": "BOOT HARD BOT MIC QA218",
            "part_number": "142.0250Y.0001",
            "currency": "USD",
            "part_category1": "Housing",
            "part_category2": "Metal",
            "material_cost": 33,
            "stamping_cost": 22,
            "second_process_cost": 12,
            "percent": "12%",
            "profit": 3,
            "transfer_cost": 243,
            "total_cost": 111,
            "module_cost": 23,
            "remark": "test",
          },
          "sourcer": {
            "part_name": "BOOT HARD BOT MIC QA218",
            "part_number": "142.0250Y.0001",
            "currency": "USD",
            "part_category1": "Housing",
            "part_category2": "Metal",
            "material_cost": 333,
            "stamping_cost": 22,
            "second_process_cost": 512,
            "percent": "12%",
            "profit": 38,
            "transfer_cost": 123,
            "total_cost": 100,
            "module_cost": 23,
            "remark": "test",
          },
        },
        {
          "epro": {
            "part_name": "BOOT HARD BOT MIC QA218",
            "part_number": "142.0250Y.0001",
            "currency": "USD",
            "part_category1": "Housing",
            "part_category2": "Metal",
            "material_cost": 313,
            "stamping_cost": 22,
            "second_process_cost": 12,
            "percent": 43,
            "profit": 3,
            "transfer_cost": 23,
            "total_cost": 44,
            "module_cost": 23,
            "remark": "test",
          },
          "sourcer": {
            "part_name": "BOOT HARD BOT MIC QA218",
            "part_number": "142.0250Y.0001",
            "currency": "USD",
            "part_category1": "Housing",
            "part_category2": "Metal",
            "material_cost": 353,
             "stamping_cost": 22,
            "second_process_cost": 12,
            "percent": 17,
            "profit": 31,
            "transfer_cost": 27,
            "total_cost": 20,
            "module_cost": 23,
            "remark": "test",
          },
        }
      ],
      'plastic': []
    }
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${fileName}.xlsx`)
    let excelYmlPath = path.join('bom-summary', 'excel.yaml')
    
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    logger.debug(`get the excel path: ${await excel.execute()}`)
  }
}
async function copyCompleteVersionBomItem(client, oldVersionID, newVersionID) {
  await bomItemModel.updateBomItemsVer(client, oldVersionID, newVersionID)
  // let bomItems = await bomItemModel.getBomItems(client, newVersionID)
  let bomItemList = await bomItemModel.getBomItemsWithOwnerId(client, newVersionID)
  if (!bomItemList) throwApiError('bom item not found', errorCode.DATANOTFOUND)

  let bomItemArr = []
  let partItem = []

  // group patent_level
  let groupParentRes = _.groupBy(bomItemList, (item) => { return item.parent_level })
  _.forEach(Object.keys(groupParentRes), (parentId) => {
    // has child parent
    if (parentId != 'null') {
      // find parent item and set parent item
      let parentbomItemId = UUID()
      _.forEach(bomItemList, (bomItem) => {
        if (bomItem.id == parentId) {
          bomItem.id = parentbomItemId
          bomItem.owner_emplid = bomItem.user_id
          if (bomItem.part_id) {
            bomItem.part_id = UUID()
            bomItem.bom_item_id = parentbomItemId
          }
        }
        if (bomItem.parent_level == parentId) {
          bomItem.parent_level = parentbomItemId
          let checkHasChild = _.find(bomItemList, (v) => { return v.parent_level == bomItem.id })
          if (!checkHasChild) {
            let childBomItemId = UUID()
            bomItem.id = childBomItemId
            bomItem.owner_emplid = bomItem.user_id
            if (bomItem.part_id) {
              bomItem.part_id = UUID()
              bomItem.bom_item_id = childBomItemId
            }
          }
        }
      })
    } else {
      // no child parent item
      let groupParent = groupParentRes[parentId]
      _.forEach(groupParent, (dv) => {
        let find = _.find(bomItemList, (v) => { return dv.id == v.parent_level })
        if (!find) {
          let parentbomItemId = UUID()
          dv.id = parentbomItemId
          dv.owner_emplid = dv.user_id
          if (dv.part_id) {
            dv.part_id = parentbomItemId
            dv.bom_item_id = parentbomItemId
          }
        }
      })
    }
  })
  _.forEach(bomItemList, (item) => {
    let bomItmeObj = {
      id: item.id,
      customer_pn: item.customer_pn,
      system_cost: item.system_cost,
      source_cost: item.source_cost,
      level: item.level,
      parent_level: item.parent_level,
      rfq_pn: item.rfq_pn,
      ref_part_num: item.ref_part_num,
      qty: item.qty,
      part_size_l: item.part_size_l,
      part_size_w: item.part_size_w,
      part_size_h: item.part_size_h,
      part_size_ef: item.part_size_ef,
      part_size_l2: item.part_size_l2,
      part_size_w2: item.part_size_w2,
      thickness: item.thickness,
      part_weight: item.part_weight,
      created_time: item.created_time,
      modified_time: item.modified_time,
      parts_ctgy_1: item.parts_ctgy_1,
      parts_ctgy_2: item.parts_ctgy_2,
      material_spec: item.material_spec,
      material: item.material,
      gb_assy_ctgy: item.gb_assy_ctgy,
      func_ctgy: item.func_ctgy,
      image_id: item.image_id,
      supply_type: item.supply_type,
      part_name: item.part_name,
      sub_leve: item.sub_leve,
      owner: item.owner,
      version_id: item.version_id,
      part_size_m: item.part_size_m,
      extra: item.extra ? JSON.stringify(item.extra) : null,
      sku0: item.sku0,
      sku1: item.sku1,
      sku2: item.sku2,
      sku3: item.sku3,
      sku4: item.sku4,
      sku5: item.sku5,
      odm_oem: item.odm_oem,
      initaddmodidel: item.initaddmodidel,
      part_number: item.part_number,
      spa_cost: item.spa_cost,
      spa_cost_material_remark: item.spa_cost_material_remark,
      suggestion_cost_type: item.suggestion_cost_type,
      last_price: JSON.stringify(item.last_price),
      suggestion_cost_remark: item.suggestion_cost_remark,
      order_id: item.order_id,
      remark: item.remark,
      owner_emplid: item.user_id,
      shipping_check_cost: item.shipping_check_cost,
      sourcer_shipping: item.sourcer_shipping,
      sourcer_pl: item.sourcer_pl,
      sourcer_assembly: item.sourcer_assembly,
      sourcer_remark: item.sourcer_remark,
      sourcer_cost_up: item.sourcer_cost_up,
      ce_pl: item.ce_pl,
      source_item_id: item.source_item_id,
      has_child: item.has_child,
      need_tooling: item.need_tooling,
      inquiry_cost_up: item.inquiry_cost_up,
      sourcer_import_curr: item.sourcer_import_curr,
      ori_sourcer_shipping: item.ori_sourcer_shipping,
      ori_sourcer_pl: item.ori_sourcer_pl,
      ori_sourcer_assembly: item.ori_sourcer_assembly,
      ori_sourcer_cost_up: item.ori_sourcer_cost_up,
    }
    bomItemArr.push(bomItmeObj)

    if (item.part_id) {
      let partItemObj = {
        id: item.part_id,
        partlist_value: JSON.stringify(item.partlist_value),
        bom_item_id: item.bom_item_id,
        update_time: item.part_update_time,
        create_time: item.part_create_time,
        partlist_price: JSON.stringify(item.partlist_price),
        formate: item.part_formate,
        image_value: JSON.stringify(item.part_image_value),
        partlist_amount: JSON.stringify(item.partlist_amount),
      }
      partItem.push(partItemObj)
    }
  })
  if (bomItemArr.length > 0) {
    await bomItemModel.copyBomItemToCompleteVersion(client, bomItemArr)
    if (partItem.length > 0) {
      await bomItemModel.copyCompleteBomPartItem(client, partItem)
    }
  }
  // await Promise.all(_.map(bomItems, async (bomItem) =>{
  //   bomItem.last_price = JSON.stringify(bomItem.last_price)
  //   bomItem.extra = JSON.stringify(bomItem.extra)
  //   await bomItemModel.copyBomItemToCompleteVersion(client, bomItem)
  // }))
}
module.exports = BomManager
