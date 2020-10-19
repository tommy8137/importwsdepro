const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('eeBomService')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const eeBomMainModel = require('../../model/bom/eeBomMain.js')
const eeBomDetailModel = require('../../model/bom/eeBomDetail.js')
const { pcb: pcbModel } = require('../../model/bom/pcb.js')
const rbacService = require('../admin/rbac.js')
const userService = require('../admin/user.js')
const fixMath = require('../../helpers/math/math.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const excelHeader = require('../../utils/excelHeader/getExportHeader.js')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const xlsxPopulate = require('xlsx-populate')
const exchangeRate = require('../../utils/exchangeRateExport/exchangeRate.js')
const { dbSyncConfig } = require('../../../config.js')
const axios = require('axios')
const { formatFloat } = require('../../helpers/utils.js')
const eeBomUtils = require('../../utils/eebom/eebomUtils')
const { hitRate, eebomItem, eebomSummary } = require('../../../test/unit/dataFrame/data')
const { Excel } = require('../../utils/dataFrame/excel')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

// const pcbService = require('../../service/bom/pcb.js').pcb
const uuidv1 = require('uuid/v1')
const util = require('util')
const eeFloatPoint = new DecimalGetter('EEBom')

class EeBom {
  static async getEdmVersionStatusVersionByID (eebomProjectId, edmVersion) {
    let result = []
    logger.info(`use projectId: ${eebomProjectId}, edmVersion: ${edmVersion}`)
    result = await eeBomDetailModel.getEdmVersionStatusVersionByID(eebomProjectId, edmVersion)
    for(let x of result) {
      x.status_version = parseFloat(x.status_version).toFixed(1)
    }
    return result
  }
  static async refreshBomDetail(edm_version_id) {
    let result = await pcbModel.getEdmVersionInfo(edm_version_id)
    if (result.is_saved == true) return 'unrefreshable'

    let url = `http://${dbSyncConfig.dbsyncIp}:${dbSyncConfig.dbsyncPort}/eedm/syncEEBOMDetail_BY_VERSION?version=${edm_version_id}`
    let data
    await axios.get(url)
      .then(response => {
        logger.debug(response.data)
        data = response.data
      })
      .catch(error => {
        logger.error(error)
        data = error.code
      })
    return data
  }
  static async getEeBomInfoByID(id){
    let result = await eeBomMainModel.getEeBomInfoByID(id)
    return {
      bomInfo: result,
    }
  }
  static async getEeBomPlantCodeDropDown(id) {
    let plantCodeByProjectId = await eeBomMainModel.getEeBomPlantCodeByID(id)
    let originPlantCode = plantCodeByProjectId.origin_plant_code
    let plantCode = plantCodeByProjectId.plant_code

    let res = []
    _.forEach(originPlantCode, (origin) => {
      let plants = []

      _.forEach(origin.plants, (originPlant) => {
        let value = false
        let plantCodeByPurchaseOrg = _.find(plantCode, { purchasing_organization : origin.purchasing_organization })

        if (plantCodeByPurchaseOrg) {
          let plant = plantCodeByPurchaseOrg.plants
          if (plant.includes(originPlant)) {
            value = true
          }
        }
        plants.push({
          plant: originPlant,
          value: value,
        })
      })

      res.push({
        purchasing_organization: origin.purchasing_organization,
        plants: plants,
      })
    })

    return res
  }
  static async getEeBomInfoByEdmVersionId(id, edm_version_id){
    let result = await eeBomMainModel.getEeBomInfoByEdmVersionID(id, edm_version_id)
    return {
      bomInfo: result,
    }
  }
  static async updateEeBomInfo(info, plant_code){

    let plantCodeSortOut = []
    _.forEach(plant_code, (plantCode) => {
      let plant = _.filter(plantCode.plants, ['value', true])
      if(plant.length > 0) {
        plantCodeSortOut.push({
          purchasing_organization: plantCode.purchasing_organization,
          plants: _.map(plant, 'plant'),
        })
      }
    })

    try {
      let client = await new tsystemDB()
      await eeBomMainModel.updateEeBomInfo(client, info)
      await eeBomMainModel.updateEeBomProjectPlantCode(client, info.id, plantCodeSortOut)

      await client.commit()

    } catch(err) {
      logger.error(err)
      throwApiError(`updateEeBomInfoID: ${info.id} occur error`, errorCode.BAD_REQUEST)
    }
  }
  static async updateEeBomInfoByEdmVersionId(info) {
    try {
      let client = await new tsystemDB()
      await eeBomMainModel.updateEeBomInfoByEdmVersionId(client, info)

      await client.commit()

    } catch(err) {
      logger.error(err)
      throwApiError(`updateEeBomInfoByEdmVersionId: id: ${info.id}, edm_version_id: ${info.edm_version_id} occur error`, errorCode.BAD_REQUEST)
    }
  }
  /**
   * give eebom project id and get edm_version info
   * @param {UUID}} id  eebom project id
   */
  static async getEdmVersion(id, userID = null){
    let result = {}
    let res = []
    result = await eeBomMainModel.getVersions(id, null)
    for(let x of result) {
      x.status_version_compare = parseFloat(x.status_version)
    }
    result = _.groupBy(result, 'version')
    let versions = Object.keys(result)
    for(let version of versions) {
      let tmp = _.orderBy(result[version], ['status_version_compare'], ['desc'])
      res.push(tmp[0])
    }
    let permission
    if(userID)  permission = await rbacService.getPolicyByUser(userID, { resource: 'ee_bom_projects.detail', action: 'Edit' })
    for(let x of res) {
      let version = parseFloat(x.status_version)
      x.status_version = parseFloat(x.status_version).toFixed(1)
      if((version > 0 && (version / 0.5) % 2 == 1)) {
        x.is_next_version = false
      }else if(userID && _.isEmpty(permission.Edit)) {
        x.is_next_version = false
      } else {
        x.is_next_version = true
      }
    }
    return {
      edmVersions: res,
    }
  }
  static async getEdmVersionByVersionID(edm_version_id){
    let result = {}
    result = await eeBomDetailModel.getEdmVersionInfo(edm_version_id)
    return result
  }
  static async updatePersonalCheck(info){
    let client = await new tsystemDB()
    for(let i = 0;i < info.length; i++) {
      // await eeBomDetailModel.updatePersonalCheck(client, info[i])
      await eeBomDetailModel.updateEeBomDetailInfo(client, info[i])
    }
    await client.commit()

  }
  static async updateLeaderCheck(infos){
    let client = await new tsystemDB()
    for(let info of infos) {
      if(info.leader_checked_status == 'approve' || info.leader_checked_status == 'reject') {
        info['is_personal_checked'] = true
        info['is_personal_submitted'] = true
      }
      await eeBomDetailModel.updateEeBomDetailInfo(client, info)
    }
    await client.commit()
  }
  static async updateLeaderSubmitted(userID, infos, version_remark){
    let client = await new tsystemDB()
    for(let info of infos) {
      if(info.leader_submitted_status == 'reject') {
        info['is_personal_checked'] = false
        info['is_personal_submitted'] = false
        info['leader_checked_status'] = null
        info['leader_submitted_status'] = null
        info['is_reject'] = true
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      } else if(info.leader_submitted_status == 'approve') {
        info['is_personal_checked'] = true
        info['is_personal_submitted'] = true
        info['is_reject'] = false
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      } else {
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      }
    }
    await eeBomDetailModel.upsertEeBomDetailInfo(client, infos)
    await client.commit()
    let record = await eeBomDetailModel.getEeBomDetailInfo(infos[0].id)
    let details = await eeBomDetailModel.getAllBomDetail(record)
    let count = 0
    for(let detail of details) {
      if(detail.leader_submitted_status == 'approve') {
        count += 1
      }
    }
    if(count == details.length) {
      await pcbModel.updateEdmVersion({ id:record.edm_version_id, is_bom_approved: true })
      let info = {
        edm_version_id: record.edm_version_id,
        type: 'bom',
        user: userID,
      }
      if(typeof version_remark != 'undefined') {
        info.version_remark = version_remark
      }
      await this.approve(info)
    }
  }
  static async updatePersonalSubmitted(infos){
    let client = await new tsystemDB()
    let ids = []
    for(let info of infos) ids.push(info.id)
    let eebomDetails = await eeBomDetailModel.getEeBomDetailInfoByIds(ids)
    for(let detail of eebomDetails) {
      if(!detail.is_personal_checked) {
        throwApiError('update bom personal submitted err, member is not checked', errorCode.DATANOTFOUND)
        logger.debug('update bom personal submitted err, member is not checked')
      }
    }
    await eeBomDetailModel.upsertEeBomDetailInfo(client, infos)
    await client.commit()
  }
  static async upadteVersion(eeBomMainInfo){
    let version = parseFloat(eeBomMainInfo.version)
    // 判斷version是否為整數，是的話就進版+0.5，否則就表示編輯中繼續維持原版本
    if( version == 0 || (version > 0 && (version / 0.5) % 2 == 0)) {
      await eeBomDetailModel.updateMainProjectVersion(eeBomMainInfo)
    }
  }
  static async getProxyInfoByUserID(userID){
    return await eeBomDetailModel.getProxyInfoByUserID(userID)
  }
  static async getPicType1(userID){
    return await eeBomDetailModel.getPicType1(userID)
  }
  static async getProxyType1(userID){
    return await eeBomDetailModel.getProxyType1(userID)
  }

  static getMatchAVLRule(upperType1, upperType2, avlList) {
    return _.filter(avlList, (avl) => {
      return avl.type1.toUpperCase() == upperType1 &&
        (avl.type2 == null || avl.type2 && avl.type2.toUpperCase() == upperType2)
    })
  }

  static async genSuggestionInfoFromEEDetail(eeBomDetails, avl = true){
    let commonParts = await eeBomDetailModel.getCommonParts()
    // sprint 26, 2020/04/09
    // 1. spa 不在列入比較項目
    // 2. last cost 改用 lowest cost 計算
    // 3. 移除 優先序2
    _.forEach(eeBomDetails, (eeBomInfo)=> {
      let compareData = []
      if (avl) {
        compareData = [
          {
            part_number: eeBomInfo.avl_alt_other_info_without_main_pn ? eeBomInfo.avl_alt_other_info_without_main_pn.alt_lowest_partnumber : null,
            manufacturer: eeBomInfo.avl_alt_other_info_without_main_pn ? eeBomInfo.avl_alt_other_info_without_main_pn.alt_manufacturer : null,
            price: parseFloat(eeBomInfo.avl_alt_without_main_pn),
            type: 'AVL ALT',
            order: 3,
          },
        ]
      } else {
        compareData = [
          {
            part_number: eeBomInfo.alt_lowest_partnumber_without_main_pn,
            manufacturer: eeBomInfo.alt_manufacturer_without_main_pn,
            price: parseFloat(eeBomInfo.alt_lowest_price_without_main_pn),
            type: 'ALT',
            order: 3,
          },
        ]
      }

      // const upperType1 = _.isNil(eeBomInfo.type1) ? '' : eeBomInfo.type1.toUpperCase()
      // const upperType2 = _.isNil(eeBomInfo.type2) ? '' : eeBomInfo.type2.toUpperCase()
      if(eeBomInfo.ce_cost) { // priority 1.1
        eeBomInfo.suggestion_cost = eeBomInfo.ce_cost
        eeBomInfo.suggestion_part_number = null
        eeBomInfo.suggestion_manufacturer = null
        eeBomInfo.suggestion_from = 'CE COST'
      } else if (eeBomInfo.currrent_price_adj_percentage && eeBomInfo.lowest_price) { // priority 1.2
        eeBomInfo.suggestion_cost = formatFloat(formatFloat(eeBomInfo.lowest_price, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.currrent_price_adj_percentage), eeFloatPoint.get('default'))
        eeBomInfo.suggestion_part_number = eeBomInfo.part_number
        eeBomInfo.suggestion_manufacturer = eeBomInfo.manufacturer
        eeBomInfo.suggestion_from = 'Adj.%'
      // } else if((upperType1 === 'RES' && upperType2 !== 'THERMISTOR') || // priority 2
      // (upperType1 === 'MLCC' && upperType2 !== 'DIP')) {
      //   // Analysis Comments已經在dbsync做完了
      //   eeBomInfo.suggestion_cost = eeBomInfo.current_price
      //   eeBomInfo.suggestion_part_number = eeBomInfo.part_number
      //   eeBomInfo.suggestion_manufacturer = eeBomInfo.manufacturer
      } else if(_.isNull(eeBomInfo.supply_type) || eeBomInfo.supply_type === 'W' || eeBomInfo.supply_type === 'AV' || eeBomInfo.supply_type === 'S' ) { // priority 3
        // Spa與Alt的最低價已經在dbsync做完了
        if(eeBomInfo.lowest_price) {
          compareData.push({
            part_number: eeBomInfo.part_number,
            price: parseFloat(eeBomInfo.lowest_price),
            manufacturer: eeBomInfo.manufacturer,
            type: 'Main Source',
            order: 1,
          })
        } else if(eeBomInfo.sourcer_cost) {
          compareData.push({
            part_number: null,
            price: parseFloat(eeBomInfo.sourcer_cost),
            manufacturer: null,
            type: 'Sourcer Cost',
            order: 2,
          })
        }else {
          compareData.push({
            part_number:null,
            price: null,
            manufacturer: null,
            type: '',
          })
        }
        let result = _.orderBy(compareData, ['price', 'order'], ['asc', 'asc'])
        eeBomInfo.suggestion_cost = result[0].price
        eeBomInfo.suggestion_part_number = result[0].part_number
        eeBomInfo.suggestion_manufacturer = result[0].manufacturer
        eeBomInfo.suggestion_from = result[0].type
      } else { // priority 4
        if(eeBomInfo.lowest_price) {
          eeBomInfo.suggestion_cost = eeBomInfo.lowest_price
          eeBomInfo.suggestion_part_number = eeBomInfo.part_number
          eeBomInfo.suggestion_manufacturer = eeBomInfo.manufacturer
          eeBomInfo.suggestion_from = 'Main Source'
        }else {
          eeBomInfo.suggestion_cost = eeBomInfo.sourcer_cost
          eeBomInfo.suggestion_part_number = null
          eeBomInfo.suggestion_manufacturer = null
          eeBomInfo.suggestion_from = 'Sourcer Cost'
        }
      }
      eeBomInfo.sub_total_suggestion_cost = eeBomInfo.suggestion_cost ? formatFloat(formatFloat(eeBomInfo.suggestion_cost, eeFloatPoint.get('default')) * parseFloat(eeBomInfo.qty), eeFloatPoint.get('default')) : null
      let isCommonPart = _.find(commonParts, function(commonPartInfo) { return commonPartInfo.partnumber == eeBomInfo.suggestion_part_number })
      eeBomInfo.suggestion_is_common_part = _.isUndefined(isCommonPart) ? 'N' : 'Y'
      // console.log(eeBomInfo.suggestion_part_number, eeBomInfo.suggestion_manufacturer)
    })
    return  eeBomDetails
  }
  static async getPersonalBomDetail(info) {
    let bomDetailInfos = await eeBomDetailModel.getPersonalBomDetail(info)
    let versionInfos = await eeBomDetailModel.getEdmVersionInfo(info.edm_version_id)
    if(bomDetailInfos.length > 0 && Object.keys(versionInfos).length > 0) {
      bomDetailInfos = await this.genSuggestionInfoFromEEDetail(bomDetailInfos, versionInfos.avl)
    }

    eeBomUtils.calculationTotalBomPrice(bomDetailInfos)

    bomDetailInfos = this.covertPriceFromStrToFloat(bomDetailInfos)
    let isEdit = judgeIsEditByVersion(versionInfos)

    if(info.isPCB) {
      versionInfos.pcbTotalPrice = await genPcbTotalPrice(info.edm_version_id)
    }

    let { partNumberLenght, picCount, ...bomCountRes } = countBomStatusAndInfo(bomDetailInfos)
    let pcbCountRes = countPcbStatusAndInfo(versionInfos)
    let { checked, reject } = plusBomAndPcb(bomCountRes, pcbCountRes)

    return {
      itemType: partNumberLenght,
      checked: checked,
      picCount: picCount,
      reject: reject,
      isPCB: info.isPCB,
      is_saved: versionInfos.is_saved,
      isEdit: isEdit,
      edm_version: versionInfos.version,
      refresh_time: versionInfos.refresh_time == null ? null : moment(versionInfos.refresh_time).tz('Asia/Taipei').format('YYYY-MM-DD'),
      pcbInfo: versionInfos,
      infos: bomDetailInfos,
      status_version: parseFloat(versionInfos.status_version).toFixed(1),
    }
  }

  /**
 * 找EEBOM personal的copy cost, 用EEBOM List所有的料號去找符合的project,其project版本為x.0
 * 用info提供的weeks去找project符合approve_time的範圍
 * 最後再比較manufacturer,current_price, spa_partnumber, spa, lpp是否相等
 * 相等的話回
 *
 * @param {array} bomdetail 從getPersonalBomDetail抓到的EEBOM List的資料
 * @param {Object} info 包含 edm_version_id, weeks 等參數for query用的
 * @returns {array} 整個EEBOM List的內容以及要copy的資料
 */
  static async getPersonalCopyCost(bomdetail, info) {
    let end_time = moment(new Date()).format('YYYY-MM-DD')
    let start_time = moment(end_time).subtract(info.weeks, 'week').format('YYYY-MM-DD')
    let bomDetailInfos = bomdetail
    let partlist = _.map(bomDetailInfos.infos, i => { return i.part_number })
    let projectCopyList = await eeBomDetailModel.getProjectCopyList(info.edm_version_id, partlist, start_time, end_time)
    let copycostresult = []
    _.map(bomDetailInfos.infos, (detailInfo) => {
      let copy_value = projectCopyList.find(cl =>{
        return compareCopyCost(detailInfo, cl)
      })
      if(detailInfo.is_personal_checked == false && detailInfo.is_personal_submitted == false
        && detailInfo.leader_checked_status != 'approve' && detailInfo.leader_submitted_status != 'approve'
        && copy_value
        && (copy_value.currrent_price_adj_percentage || copy_value.ce_cost || copy_value.remark || copy_value.sourcer_cost)) {
        copycostresult.push({
          ...detailInfo,
          currrent_price_adj_percentage: copy_value.currrent_price_adj_percentage,
          ce_cost: copy_value.ce_cost,
          remark: copy_value.remark,
          copy_edm_version_id: copy_value.edm_version_id,
          sourcer_cost: copy_value.sourcer_cost,
          is_by_copy: true,
        })
      } else {
        copycostresult.push({
          ...detailInfo,
          is_by_copy: false,
        })
      }
    })
    copycostresult = _.orderBy(copycostresult, ['is_by_copy', 'type1'], ['desc', 'asc'])
    return copycostresult
  }
  static covertPriceFromStrToFloat(obj) {
    _.forEach(obj, info =>{
      info.current_price = info.current_price == null ? null : info.current_price = parseFloat(info.current_price)
      info.sub_total_last_price = info.sub_total_last_price == null ? null : info.sub_total_last_price = parseFloat(info.sub_total_last_price)
      info.sub_total_suggestion_cost = info.sub_total_suggestion_cost == null ? null : info.sub_total_suggestion_cost = parseFloat(info.sub_total_suggestion_cost)
    })
    return obj
  }
  static async getAllBomDetail(info, isEditPCB) {
    let { bomDetailInfos, bomVersionInfo } = await this.genAllBomInfosByVersion(info)
    let leaderPageTitleInfo = await genLeaderPageInfo(info, bomDetailInfos, bomVersionInfo)

    return {
      approved: leaderPageTitleInfo.approved,
      checked: leaderPageTitleInfo.checked,
      reject: leaderPageTitleInfo.reject,
      totalType2: leaderPageTitleInfo.totalType2,
      totalPartsCount: leaderPageTitleInfo.totalPartsCount,
      totalSuggestionCost: leaderPageTitleInfo.totalSuggestionCost,
      totalCost: leaderPageTitleInfo.totalCost,
      totalLowestCost: leaderPageTitleInfo.totalLowestCost,
      total2ndHighestCost: leaderPageTitleInfo.total2ndHighestCost,

      is_saved: leaderPageTitleInfo.pcbInfo.is_saved,
      isEdit: leaderPageTitleInfo.isEdit,
      edm_version: leaderPageTitleInfo.pcbInfo.version,
      isPCBApproved: bomVersionInfo.is_pcb_approved,
      isBomApproved: bomVersionInfo.is_bom_approved,
      isPCB: isEditPCB,
      status_version: parseFloat(bomVersionInfo.status_version).toFixed(1),
      refresh_time: bomVersionInfo.refresh_time == null ? null : moment(bomVersionInfo.refresh_time).tz('Asia/Taipei').format('YYYY-MM-DD'),
      pcbInfo: leaderPageTitleInfo.pcbInfo,
      infos: bomDetailInfos,
    }
  }
  static async getTypes() {
    let type_list = []
    let types = await eeBomDetailModel.getTypes()
    _.chain(types)
      .groupBy(k => k.type1)
      .map((t, k) => {
        type_list.push({
          type1: k,
          type2: _.uniq(_.map(t, 'type2')),
        })
      })
      .value()
    return type_list
  }
  static async updateEeBomDetail(infos, userID, version_remark = false){
    let client = await new tsystemDB()
    for(let info of infos) {
      if(info.leader_submitted_status == 'reject') {
        info['is_personal_checked'] = false
        info['is_personal_submitted'] = false
        info['leader_checked_status'] = null
        info['leader_submitted_status'] = null
        info['is_reject'] = true
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      } else if(info.leader_submitted_status == 'approve') {
        info['is_personal_checked'] = true
        info['is_personal_submitted'] = true
        info['is_reject'] = false
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      }  else if(info.is_reject && (info.leader_checked_status == 'approve' || info.leader_checked_status == 'reject')) {
        info['is_personal_checked'] = true
        info['is_personal_submitted'] = true
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      } else {
        // await eeBomDetailModel.updateEeBomDetailInfo(client, info)
      }
    }
    await eeBomDetailModel.upsertEeBomDetailInfo(client, infos)

    let record = await eeBomDetailModel.getEeBomDetailInfo(infos[0].id)
    let updateEdmVersionObj = { id: record.edm_version_id, is_saved: true }
    if(version_remark) {
      updateEdmVersionObj.version_remark = version_remark
    }
    await eeBomDetailModel.updateEdmVersion(client, updateEdmVersionObj)
    await client.commit()
    if(infos[0].leader_submitted_status == 'approve') {
      let details = await eeBomDetailModel.getAllBomDetail(record)
      let count = 0
      for(let detail of details) {
        if(detail.leader_submitted_status == 'approve') {
          count += 1
        }
      }
      if(count == details.length) {
        await pcbModel.updateEdmVersion({ id:record.edm_version_id, is_bom_approved: true })
        let info = {
          edm_version_id: record.edm_version_id,
          type: 'bom',
          user: userID,
        }
        await this.approve(info)
      }
    }
    // let res = await this.forPromiseAll(info, eeBomDetailModel.updateEeBomDetail, 2)
    return true
  }
  // static async forPromiseAll(elements, asyncFunc, pallelNum = 100) {
  //   let idx = 0
  //   while(idx < elements.length) {
  //     let selectedElms
  //     if((idx + pallelNum) < elements.length) {
  //       selectedElms = elements.slice(idx, (idx + pallelNum))
  //     } else {
  //       selectedElms = elements.slice(idx)
  //     }
  //     let res = await Promise.all(selectedElms.map(elm => asyncFunc(elm)))
  //     idx += pallelNum
  //   }
  //   return true
  // }
  static async genAllBomInfosByVersion(info) {
    let bomDetailInfos = await eeBomDetailModel.getAllBomDetail(info)
    let bomVersionInfo = await eeBomDetailModel.getEdmVersionInfo(info.edm_version_id)
    if(bomDetailInfos.length > 0 && Object.keys(bomVersionInfo).length > 0) {
      bomDetailInfos = await this.genSuggestionInfoFromEEDetail(bomDetailInfos, bomVersionInfo.avl)
    }
    return {
      bomDetailInfos,
      bomVersionInfo,
    }
  }
  static async getBomDetailByModule(info) {
    let { bomDetailInfos, bomVersionInfo } = await this.genAllBomInfosByVersion(info)
    let moduleResult = genModuleInfo(bomDetailInfos)
    let leaderPageTitleInfo = await genLeaderPageInfo(info, bomDetailInfos, bomVersionInfo)

    return {
      approved: leaderPageTitleInfo.approved,
      checked: leaderPageTitleInfo.checked,
      totalType2: leaderPageTitleInfo.totalType2,
      totalPartsCount: leaderPageTitleInfo.totalPartsCount,
      totalSuggestionCost: leaderPageTitleInfo.totalSuggestionCost,
      totalCost: leaderPageTitleInfo.totalCost,
      totalLowestCost: leaderPageTitleInfo.totalLowestCost,
      total2ndHighestCost: leaderPageTitleInfo.total2ndHighestCost,
      reject: leaderPageTitleInfo.reject,
      pcbInfo: leaderPageTitleInfo.pcbInfo,
      isPCB: false,
      infos: moduleResult,
    }
  }
  static async approve(info) {
    if(info.type == 'pcb') {
      await approvePCB(info)
    } else {
      await approveBom(info)
    }
  }
  static async getEebomProjectInfoByDetailID(id) {
    let eeBomDetailInfo =  await eeBomDetailModel.getEeBomDetailInfo(id)
    if(!eeBomDetailInfo) {
      throwApiError('eebom detail id not correct', errorCode.DATANOTFOUND)
      logger.debug('eebom detail id not correct')
    }
    let edmversionInfo =  await eeBomDetailModel.getEdmVersionInfo(eeBomDetailInfo.edm_version_id)
    let eeBomInfo = await eeBomMainModel.getEeBomInfoByID(edmversionInfo.eebom_project_id)
    logger.debug('eeBomInfo', eeBomInfo)
    return eeBomInfo
  }

  static async exportEeAlternative(sheetData, commonData) {
    const exportFrom = 'Alternative'
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}/${commonData.filePath}.xlsx`)
    let excelYmlPath = path.join('eebom-alternative', 'excel-alternative.yaml')
    sheetData.alternative.summary.export_from = exportFrom
    let rawData = {
      // summaryItem2nd_lowest: sheetData.secondSummary.odm_lowest,
      // summaryItem2nd_highest: sheetData.secondSummary.odm_highest,
      // summaryItem2nd_mlcc: sheetData.secondSummary.mlcc,
      odmPartSummary_2nd: sheetData.alternative.summary,
      odmPartItem_2nd: sheetData.alternative.altrenativeDetail,
      exchangeRateDefault_2nd: commonData.exchangeRateDefault,
      opportunityFilter_2nd: sheetData.alternative.summary,
      costFilter_2nd: sheetData.alternative.summary,
      odmPartNewOpportunity_2nd: null,
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)
  }
  // static async exportEeBom(fullBomPartsList, odmPartsList, pcbPartsList, secondOdmPartBom, secondSummary, filePath, excelFolder) {
  static async exportEeBom(sheetData, commonData) {

    const exportFrom = 'BOM'
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}/${commonData.filePath}.xlsx`)
    let excelYmlPath = path.join('eebom-tmp', 'excel-eebom.yaml')
    sheetData.fullBomPartsList.summary.export_from = exportFrom
    sheetData.pcbPartsList.summary.export_from = exportFrom
    sheetData.odmBomRawData.summary.export_from = exportFrom

    let rawData = {
      // full bom
      fullBomSummary: sheetData.fullBomPartsList.summary,
      fullBomItem: sheetData.fullBomPartsList.detail,
      opportunity: sheetData.fullBomPartsList.summary,
      cost: sheetData.fullBomPartsList.summary,

      // hit rate
      hitRate: excelHeader.getNewModuleCommonParts(sheetData.fullBomPartsList.detail),
      odmHitRate: excelHeader.getNewModuleCommonParts(sheetData.odmBomRawData.detail),

      // pcb
      pcbSummary: sheetData.pcbPartsList.summary,
      pcbItem: sheetData.pcbPartsList.detail,

      // ep-299 new bom sheet
      // ODM BOM Summary
      summaryItem2nd_lowest: sheetData.odmBomSummary.odm_lowest,
      summaryItem2nd_mlcc: sheetData.odmBomSummary.mlcc,

      // ODM BOM
      odmPartSummary_2nd: sheetData.odmBomRawData.summary,
      odmPartItem_2nd: sheetData.odmBomRawData.detail,

      // ODM BOM Summary 和 ODM BOM Summary 共同使用
      opportunityFilter_2nd: sheetData.odmBomRawData.summary,
      costFilter_2nd: sheetData.odmBomRawData.summary,

      // ?
      odmPartNewOpportunity: null,

      // 每個 sheet 中的 exchange rate
      exchangeRateDefault: commonData.exchangeRateDefault,
      exchangeRateDefault_2nd: commonData.exchangeRateDefault,
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)
  }
  /**
   * 使用edm_version_id判斷edm_version版號是否要 + 0.5以及複製eebom_detail和pcb
   * @param {UUID} edm_version_id  edm_version_id
   */
  static async getUpgradeEdmversionID(edm_version_id) {
    let client = await new tsystemDB()
    let edmVersion  = await eeBomDetailModel.getEdmVersionInfo(edm_version_id)
    if(_.isEmpty(edmVersion)) {
      logger.debug(`table edm_version id:${edm_version_id} data is empty`)
      throwApiError('edm_version data  not found', errorCode.BAD_REQUEST)
    }
    let version = parseFloat(edmVersion.status_version)
    if( version == 0 || (version > 0 && (version / 0.5) % 2 == 0)) {
      let newEdmVersionID
      try {
        newEdmVersionID =  await eeBomDetailModel.copyEdmVersion(edm_version_id)
        logger.debug(`copy edm_version_id from ${edm_version_id} to new edm_version_id: ${newEdmVersionID}`)
        await this.copyEEbomDetail(client, edm_version_id, newEdmVersionID)
        await pcbServices.copyPCBsByEdmVersionID(edm_version_id, newEdmVersionID)
        await eeBomDetailModel.updateEdmVersion(client, { id: newEdmVersionID, status_version: fixMath.fixedPoint(version + 0.5, 2), is_saved: false })
        await client.commit()
        return  newEdmVersionID
      } catch(e) {
        await eeBomDetailModel.deleteEdmVersionByID(newEdmVersionID)
        await client.rollback()
        logger.debug(`getUpgradeEdmversionID ${edm_version_id} occur error , reuslt:: ${e}`)
        throwApiError(`getUpgradeEdmversionID: ${edm_version_id} occur error`, errorCode.BAD_REQUEST)
      }
    } else {
      return edm_version_id
    }
  }
  /**
   * 給予舊的edm_version_id然後複製eebom_detail 一份出來,並把edm_version_id塞回 eebom_deteail 的 foriegn
   * @param {*} client
   * @param {UUID} oldEdmVersionID
   * @param {UUID} newEdmVersionID
   */
  static async copyEEbomDetail(client, oldEdmVersionID, newEdmVersionID) {
    let eebomDetails = await eeBomDetailModel.getEEbomDetailByVersionID(oldEdmVersionID)
    if(eebomDetails.length > 0) {
      for(let x of  eebomDetails) {
        x.id = uuidv1 ()
        x.is_personal_checked = false
        x.is_personal_submitted = false
        x.leader_checked_status = null
        x.leader_submitted_status = null
        x.is_reject = false
        x.edm_version_id = newEdmVersionID
        x.create_time = x.create_time ? moment(x.create_time).format() : null
        x.update_time = x.update_time ? moment(x.update_time).format() : null
        x.supply_type_list = JSON.stringify(x.supply_type_list)

        // last price
        x.valid_from = x.valid_from ? moment(x.valid_from).format() : null
        x.lowest_price_valid_from = x.lowest_price_valid_from ? moment(x.lowest_price_valid_from).format() : null
        x.second_highest_price_valid_from = x.second_highest_price_valid_from ? moment(x.second_highest_price_valid_from).format() : null

        // spa
        x.exp_other_manufacture_info = JSON.stringify(x.exp_other_manufacture_info)
        x.other_manufacture_info = JSON.stringify(x.other_manufacture_info)

        // alt
        x.alt_grouping = JSON.stringify(x.alt_grouping)
        x.alt_other_info = JSON.stringify(x.alt_other_info)
        x.alt_other_info_without_main_pn = JSON.stringify(x.alt_other_info_without_main_pn)

        // avl
        x.avl_spa_other_info = JSON.stringify(x.avl_spa_other_info)
        x.avl_alt_other_info = JSON.stringify(x.avl_alt_other_info)
        x.avl_alt_other_info_without_main_pn = JSON.stringify(x.avl_alt_other_info_without_main_pn)
      }
      await eeBomDetailModel.copyEEbomDetail(client, eebomDetails)
    }
  }

  static async checkUserEEProductType(userID, bom_id) {
    let result = false
    let bomProductType = await eeBomDetailModel.getEEBomProductType(bom_id)
    if (bomProductType && bomProductType.length) {
      let productType = bomProductType[0].product_type
      result = await userService.checkUserProductTypePermission(userID, 'EE', productType)
    }
    /* let userProductTypePermission = await userService.getPersonalUserProductType(userID, 'bom')
    if(!_.isNil(bomProductType[0].product_type)) {
      let userPtPermission = _.map(userProductTypePermission.ee, i => i.toUpperCase().trim())
      let bomPtPermission = bomProductType[0].product_type.toUpperCase().trim()
      result = userPtPermission.includes(bomPtPermission)
    } */
    return result
  }
  static async getEdmVersionRefreshTime(edm_version_id) {
    return await eeBomMainModel.getEdmVersionRefreshTime(edm_version_id)
  }
}
function judgeIsEditByVersion(info) {
  let version = parseFloat(info.status_version).toFixed(1)
  if(version.includes('.0')) return false
  else return true
}
async function genPcbTotalPrice(edm_version_id){
  let pcbTotalPrice = 0
  let pcbResults = await pcbService.getPCB(edm_version_id)
  for(const result of pcbResults.list){
    if(result.is_count) pcbTotalPrice += formatFloat(result.sub_total_suggestion_cost, eeFloatPoint.get('default'))
  }
  return fixMath.fixedPoint(pcbTotalPrice, eeFloatPoint.get('default'))
}

function countBomStatusAndInfo(bomList) {
  let approved = 0
  let checked = 0
  let reject = 0
  let picCount = 0 // personal
  let partNumbers = [] // personal
  let type2s = [] // all

  _.forEach(bomList, (item) => {
    if(item.is_personal_checked) checked += 1
    if(item['leader_submitted_status'] == 'approve') approved += 1
    if(item.is_reject) reject += 1
    if(!_.isNil(item.qty)) picCount += parseInt(item.qty)
    partNumbers.push(item.part_number)
    type2s.push(item.type2)
  })

  return {
    approved,
    checked,
    reject,
    picCount,
    partNumberLenght: _.uniq(partNumbers).length,
    totalType2: _.uniq(type2s).length,
  }
}

function countPcbStatusAndInfo(pcbInfo) {
  let approved = 0
  let checked = 0
  let reject = 0

  if(pcbInfo.is_pcb_personal_checked) checked = 1
  if(pcbInfo.is_reject) reject = 1
  if(pcbInfo['leader_submitted_status'] == 'approve') approved = 1

  return {
    approved,
    checked,
    reject,
  }
}

function plusBomAndPcb(bom, pcb) {
  let approved = bom.approved + pcb.approved
  let checked = bom.checked + pcb.checked
  let reject = bom.reject + pcb.reject
  return {
    approved,
    checked,
    reject,
  }
}

function genModuleInfo(info) {
  let modules = _.groupBy(info, 'module')
  let keys = Object.keys(modules)
  let response = {}

  keys.forEach((key)=> {
    let moduleInfo = []
    let partsCount = 0
    let partNumberCount = 0
    let shouldCost = 0
    let totalCost =  0
    let totalLowestCost = 0
    let total2ndHighestCost = 0

    let partNumbers = []
    moduleInfo = modules[key]
    // partsCount為該module下的row data總數
    partsCount = 0
    moduleInfo.map((x)=>{
      eeBomUtils.calculationSubTotalLastPrice(x)
      if(!_.isNil(x.suggestion_cost)) shouldCost = fixMath.fixedPoint(shouldCost + parseFloat(x.suggestion_cost), eeFloatPoint.get('viewAllByModulePrice'))
      if(!_.isNil(x.current_price)) totalCost = fixMath.fixedPoint(totalCost + parseFloat(x.current_price), eeFloatPoint.get('viewAllByModulePrice'))
      if(!_.isNil(x.lowest_price)) totalLowestCost = fixMath.fixedPoint(totalLowestCost + parseFloat(x.lowest_price), eeFloatPoint.get('viewAllByModulePrice'))
      if(!_.isNil(x.second_highest_price)) total2ndHighestCost = fixMath.fixedPoint(total2ndHighestCost + parseFloat(x.second_highest_price), eeFloatPoint.get('viewAllByModulePrice'))
      if(!_.isNil(x.qty)) partsCount = fixMath.fixedPoint(partsCount + parseFloat(x.qty), eeFloatPoint.get('viewAllByModulePrice'))
      partNumbers.push(x.part_number)
    })
    partNumberCount = _.uniq(partNumbers).length

    response[key] = {
      partsCount: partsCount,
      partNumberCount: partNumberCount,
      shouldCost: shouldCost,
      totalCost: totalCost,
      totalLowestCost: totalLowestCost,
      total2ndHighestCost: total2ndHighestCost,
      info: moduleInfo,
    }
  })
  return response
}

// 合併 all bom detail 與 pcb 的資料
async function genLeaderPageInfo(info, eebomInfoList, bomVersionInfo) {

  // 從 bom version info 中去計算pcb 的資料
  let isEdit = judgeIsEditByVersion(bomVersionInfo)

  bomVersionInfo.pcbTotalPrice = await genPcbTotalPrice(info.edm_version_id)
  let pcbInfoList = await pcbService.pcbExportFormat(info.edm_version_id, false, false)
  let calAllPriceInfo = eeBomUtils.calculationAllPrice(eebomInfoList, pcbInfoList)

  let { totalType2, ...bomCountRes } = countBomStatusAndInfo(eebomInfoList)
  let pcbCountRes = countPcbStatusAndInfo(bomVersionInfo)
  let { approved, checked, reject } = plusBomAndPcb(bomCountRes, pcbCountRes)

  return {
    eebom_project_id: bomVersionInfo.eebom_project_id,
    approved: approved,
    checked: checked,
    totalType2: totalType2,
    totalPartsCount: calAllPriceInfo.totalPartsCount,
    totalSuggestionCost: calAllPriceInfo.totalSuggestionCost,
    totalCost: calAllPriceInfo.totalLastPrice,
    totalLowestCost: calAllPriceInfo.totalLowestPrice,
    total2ndHighestCost: calAllPriceInfo.total2ndHighestPrice,
    isPCB: true,
    pcbInfo: bomVersionInfo,
    infos: eebomInfoList,
    reject: reject,
    isEdit: isEdit,
  }
}

async function approvePCB(info) {
  let edmVersionInfo  = await eeBomDetailModel.getEdmVersionInfo(info.edm_version_id)
  if(!edmVersionInfo) {
    logger.debug('approve err, edm version id not correct')
    throwApiError('edm version id not correct', errorCode.DATANOTFOUND)
  }
  let { leader_submitted_status } = edmVersionInfo
  let updatePcbObj = {}
  if(leader_submitted_status == 'approve') {
    let pcbCheckInfo  = await eeBomDetailModel.getEdmVersionInfo(info.edm_version_id)
    if(pcbCheckInfo.is_bom_approved) {
      let version = parseFloat(pcbCheckInfo.status_version)
      if ((version > 0 && (version / 0.5) % 2 == 1)) {
        version += 0.5
        updatePcbObj = {
          is_pcb_approved: true,
          pcb_approved_by: info.user,
        }
        let client = await new tsystemDB()
        await eeBomMainModel.approve(client, updatePcbObj, info.edm_version_id)
        let updateMainObj = {
          // version: version,
          eedm_version: edmVersionInfo.version,
          edm_version_id: info.edm_version_id,
          is_next_stage: true,
          version_remark: info.version_remark,
        }
        await eeBomDetailModel.updateEdmVersion(client, { id: info.edm_version_id, status_version: version, approve_time:moment.utc().format(), version_remark: info.version_remark })
        await eeBomMainModel.updateMainBom(client, updateMainObj, edmVersionInfo.eebom_project_id)
        await client.commit()
      } else {
        logger.debug('approve err, version not equal x.5')
        throwApiError('version error', errorCode.APPROVEERROR)
      }
    } else{
      updatePcbObj = {
        is_pcb_approved: true,
        pcb_approved_by: info.user,
      }
      let client = await new tsystemDB()
      await eeBomMainModel.approve(client, updatePcbObj, info.edm_version_id)
      await client.commit()
    }
  } else {
    logger.debug('leader do not check complete')
    throwApiError('leader do not check complete', errorCode.APPROVEERROR)
  }
}

async function approveBom(info) {
  let { bomDetailInfos: bomDetails, bomVersionInfo: edmVersionInfo } = await EeBom.genAllBomInfosByVersion(info)

  if(Object.keys(edmVersionInfo).length == 0) {
    logger.debug('approve err, edm version id not correct')
    throwApiError('edm version id not correct', errorCode.DATANOTFOUND)
  }
  if (bomDetails.length == 0) {
    logger.debug('approve err, bomDetails not found')
    throwApiError('approve err, bomDetails not found', errorCode.DATANOTFOUND)
  }
  // let leaderCheckCount = 0
  // bomDetails.map((bomDetail)=>{
  //   if(bomDetail.is_leader_checked) leaderCheckCount += 1
  // })
  // if(bomDetails.length != leaderCheckCount) {
  //   logger.debug('approve err, bomDetails  check not complete')
  //   throwApiError('approve err, bomDetails check not complete', errorCode.APPROVEERROR)
  // }
  let updateBomObj = {}

  if(edmVersionInfo.is_pcb_approved) {
    let version = parseFloat(edmVersionInfo.status_version)
    if ((version > 0 && (version / 0.5) % 2 == 1)) {
      version += 0.5
      updateBomObj = {
        is_bom_approved: true,
        bom_approved_by: info.user,
      }
      let client = await new tsystemDB()
      await eeBomMainModel.approve(client, updateBomObj, info.edm_version_id)
      let updateMainObj = {
        // version: version,
        eedm_version: edmVersionInfo.version,
        edm_version_id: info.edm_version_id,
        is_next_stage: true,
        version_remark: info.version_remark,
      }
      await eeBomDetailModel.updateEdmVersion(client, { id: info.edm_version_id, status_version: version, approve_time: moment.utc().format() })
      await eeBomMainModel.updateMainBom(client, updateMainObj, edmVersionInfo.eebom_project_id)
      // await eeBomMainModel.resetCheckAndSubmitted(client, info.edm_version_id)
      await client.commit()
    } else {
      logger.debug('approve err, version not equal x.5')
      throwApiError('version error', errorCode.APPROVEERROR)
    }
  } else{
    updateBomObj = {
      is_bom_approved: true,
      bom_approved_by: info.user,
    }
    let client = await new tsystemDB()
    await eeBomMainModel.approve(client, updateBomObj, info.edm_version_id)
    await client.commit()

  }
}
/**
 * 比對bom list 以及舊的bom資料中 manufacturer,current_price, spa_partnumber, spa, lpp 是否相同
 *
 */
function compareCopyCost(info, cl) {

  return cl.part_number == info.part_number &&
    cl.manufacturer == info.manufacturer &&
    cl.current_price == info.current_price &&
    cl.last_price_currency && info.last_price_currency &&
    cl.last_price_currency == info.last_price_currency &&
    cl.last_price_currency_price && info.last_price_currency_price &&
    cl.last_price_currency_price == info.last_price_currency_price &&
    cl.other_manufacture_info && info.other_manufacture_info &&
    cl.other_manufacture_info.spa_partnumber == info.other_manufacture_info.spa_partnumber &&
    cl.other_manufacture_info.original_currency && info.other_manufacture_info.original_currency &&
    cl.other_manufacture_info.original_currency == info.other_manufacture_info.original_currency &&
    cl.other_manufacture_info.original_spa_price && info.other_manufacture_info.original_spa_price &&
    cl.other_manufacture_info.original_spa_price == info.other_manufacture_info.original_spa_price &&
    cl.spa == info.spa &&
    cl.lpp == info.lpp
}

module.exports = EeBom

// 避免循環載入導致 import 出錯，請勿拿掉!!!!!
const pcbService = require('../../service/bom/pcb.js').pcb
const pcbServices = require('../../service/bom/pcb.js')

