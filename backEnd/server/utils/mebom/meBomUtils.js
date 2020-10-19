/* eslint-disable no-undefined */
/* eslint-disable no-magic-numbers */
const moment = require('moment')
const _ = require('lodash')
const fs = require('fs')


const meBomCost = require('../cost/meBomCost.js')
const { formatFloat } = require('../../helpers/utils.js')
const CacheHelper = require('../../utils/helper/cacheHelper.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')
const log4js = require('../../utils/logger/logger')

const rbacService = require('../../service/admin/rbac.js')

const bomItemModel = require('../../model/bom/bomItem')
const bomVersionModel = require('../../model/bom/bomVersion')
const emdmMainModel = require('../../model/bom/emdmBomMain.js')

const cache = new CacheHelper()
const meFloatPoint = new DecimalGetter('MEBom')
const logger = log4js.getLogger('MeBomUtils')

const checkBomVersion = async (bomId, targetVersion) => {
  let splitTarget = targetVersion.split('.')

  let bomVersion = await bomVersionModel.getBomStage(bomId)
  if (bomVersion && bomVersion.length > 0) {
    let currentVersion = bomVersion[0].version_name
    let subVersion = currentVersion.split('.')[1]
    if (splitTarget.length > 1) {
      return currentVersion == targetVersion
    } else {
      return targetVersion == subVersion
    }
  }
  return false
}

const filterPartList = (data, skuNum) =>{
  data.forEach((item, idx) => {
    item.index = idx + 1
  })
  data = _.filter(data, (v) => {
    return (v.partlistvalue != null && typeof v.partlistvalue == 'object') ||
      (v.complete_partlistvalue != null && typeof v.complete_partlistvalue == 'object')
  })
  let groupCtgy1Res = _.groupBy(data, (v)=>{return v.parts_ctgy_1})
  _.forEach(groupCtgy1Res, (v, key) => {
    groupCtgy1Res[key] = _.groupBy(groupCtgy1Res[key], (ctgy2) => {
      return ctgy2.parts_ctgy_2
    })
  })

  let res = []
  _.forEach(Object.keys(groupCtgy1Res), (v) =>{
    let val = groupCtgy1Res[v]
    _.forEach(Object.keys(val), (dv) =>{
      let obj = {}
      let parListArr = []
      let partValue = val[dv]
      obj.type1 = v
      obj.type2 = dv
      _.forEach(partValue, (item) => {
        if (MebomUtil.isFilterBySku(item, skuNum)) {
          return
        }
        let partListImagePath  = []
        if(item.complete_partlistimage != null && !_.isEmpty(item.complete_partlistimage)){
          if(item.complete_partlistimage.images){
            partListImagePath = item.complete_partlistimage.images
          }
        }else{
          partListImagePath = item.partlistimage != null && !_.isEmpty(item.partlistimage) ?
            item.partlistimage.images ? item.partlistimage.images : [] : []
        }

        let resPartList = {
          item: item.index,
          id: item.id,
          part_name: item.part_name,
          ref_part_num: item.reference_pn,
          part_number: item.part_number,
          material_spec: item.material_spec,
          material: item.material,
          image_path: partListImagePath,
          update_time: moment(item.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
          hasui: item.hasui || false,
          formate: item.complete_partlistformate ? item.complete_partlistformate : item.partlistformate,
        }
        resPartList.system_cost = item.system_cost != null || item.systemCost != undefined ? formatFloat(item.system_cost, meFloatPoint.get('cleanSheetCost')) : null
        parListArr.push(resPartList)
      })
      // parListArr = _.orderBy(parListArr, ['order_id', 'create_time'], ['ASC', 'ASC'])
      obj.partlist = parListArr
      res.push(obj)
    })
  })
  const resSort = _.orderBy(res, ['type1', 'type2'], ['asc', 'asc'])
  return resSort
}

class MebomUtil {
  /**
   * 取得partlist 判定列表
   * @param {number} productTypeId
   */
  static async getBomItemPartlistFormate (productTypeId) {
    let needPartListRes = await cache.getCacheAsync(`NEED_PART_LIST_${productTypeId}`, MebomUtil._getBomItemPartlistFormate, productTypeId)
    return needPartListRes
  }
  static async _getBomItemPartlistFormate (productTypeId) {
    let needPartListRes = await bomItemModel.getBomItemPartlistFormate(productTypeId) // 需要 part list 的 category1,2
    let noNeedPartListRes = await bomItemModel.getNoNeedPartList() // material 及 material_spec 例外項目 例：Other_Fill_ME_Remark 免填 part list
    let noNeedPartListOdmOem = await bomItemModel.getNoNeedPartListOdmOem() // OEM, TBD 免填 part list
    return {
      byPartCategory: needPartListRes ? needPartListRes : null,
      noPartList: noNeedPartListRes ? noNeedPartListRes : null,
      notByOdmOem: noNeedPartListOdmOem ? noNeedPartListOdmOem : null,
    }
  }
  /**
  ** 依據規則檢查是否可進行APPROVE
  * @param  {string} bomId
  * @param  {string} userId
  * @returns {boolean} false 為不可進行APPROVE, true為可進行APPROVE
  */
  static async checkAllowApprove(bomId, userId){
    let isApprove = await this._checkApprove(bomId, userId)
    let isForceApprove = await this._checkForceApprove(bomId, userId)
    logger.debug(`checkAllowApprove { bomId:${bomId}, userId:${userId} } isApprove:${isApprove}, isForceApprove:${isForceApprove}`)

    return isApprove || isForceApprove
  }

  /**
   * 一般Approve，user要是該 bom 的 approver 而且有 Approve Bom 權限，而且 bom 的版本為n.5。
   * @param {string} bomId
   * @param {String} userId
   * @returns {boolean} false 為不可進行APPROVE, true為可進行APPROVE
   */
  static async _checkApprove(bomId, userId){
    let result = false
    let approvalPermission = await rbacService.getPolicyByUser(userId, {
      action: 'Approve',
      resource: 'me_bom_projects',
    })

    if (!_.isEmpty(approvalPermission)) {
      let approvalResult = await bomItemModel.bomVersionActionPermission(bomId, 'APPROVE', userId)
      if (approvalResult > 0) {
        // check version only n.5 can approve
        let checkVersion = await checkBomVersion(bomId, '5')
        result = checkVersion
      }
    }
    return result
  }

  /**
   * 強制 Approve，擁有Approve 0.5 權限而且 bom 的版本為0.5
   * @param {string} bomId
   * @param {String} userId
   * @returns {boolean} false 為不可進行APPROVE, true為可進行APPROVE
   */
  static async _checkForceApprove(bomId, userId){
    let result = false
    let forceApprove = await rbacService.getPolicyByUser(userId, {
      action: 'ForceApprove',
      resource: 'me_bom_projects',
    })
    if (!_.isEmpty(forceApprove)) {
      // get bom version only 0.5 can approve
      let checkVersion = await checkBomVersion(bomId, '0.5')
      result = checkVersion
    }
    return result
  }
  /**
  ** 依據規則檢查是否需於編輯後進行修改版本至0.5
  ** 20190904 當權限為擁有權限me_bom_projects.edit_without_revert且bom版本等於0.7編輯時不退回0.5
  ** 20190910 no matter what x.7 version can not revert to x.5 version
  * @param  {string} bomId
  * @returns {boolean} false 為不須進行進版 true為須進行進版
  */
  static async checkIsNeedUpdateVersion(bomId){
    // 20190904  CE/ME,EE & CE/ME 編輯不退回0.5
    // 20190910 no matter what x.7 version can not revert to x.5 version

    let checkVersion = await checkBomVersion(bomId, '7')
    if (checkVersion) {
      return false
    }
    return true
  }
  /**
  ** 依據 me bom version id 取得已進版至X.0 me bom data info
  * @param  {string} versionid
  * @param  {string} sku(Option)
  */
  static async getBomTableByCompleteVersionId(version_id, skuNum = 'sku1', assign = 'all'){
    let result = await bomItemModel.getBomTableByCompleteVersionId(version_id, assign)
    let product_type_id = await cache.getCacheAsync(`PRODUCT_TYPE_ID_${version_id}`, bomItemModel.getProductTypeIDByVersionID, version_id)
    let needPartListRes = await this.getBomItemPartlistFormate(product_type_id)
    // can not find data
    if (result.rows.length == 0) {
      return null
    }

    // root
    let root = _.chain(result.rows)
      .filter((o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      .sortBy((s) => s.order_id)
      .value()
    let recordCount = {}
    _.chain(result.rows)
      .filter((o) => { return o.sub_level && o.parent_level != null })
      .groupBy((o) => { return o.level })
      .sortBy((s) => s.order_id)
      .map((value) => {
        value.map(v => {
          let idx = root.findIndex(r => v.parent_level == r.id)
          let count = isNaN(recordCount[v.parent_level]) ? 0 : recordCount[v.parent_level] + 1
          root.splice(idx + 1 + count, 0, v)
          recordCount[v.parent_level] = count
        })
      })
      .value()
    let bomItemsPart = filterPartList(root, skuNum)

    // compute clean sheet cost
    let skuSum = null
    let tmpRoot = _.cloneDeep(root)
    if (assign.toLowerCase() == 'all') {
      // 取得計算組工費參數
      let datetimeCondition = root && root[0].version_create_time ? root[0].version_create_time : null
      let laboragePara = await meBomCost.getLaborageParamater(datetimeCondition)

      // let lastLeaf = await bomItemModel.findLastLeafByCompleteVersionId(version_id)
      // if(skuNum){
      meBomCost.computeLaborage(root, skuNum, laboragePara)
      // }else{
      //   meBomCost.computeLaborage(root, lastLeaf, null, laboragePara)
      // }

      skuSum = meBomCost.computeAllSkuSumCost(tmpRoot, laboragePara)
    }

    let unEditCount = 0
    let partListCount = 0
    let completePartListCount = 0
    let version = 'V0.0'
    // let project_code = ''
    let project_name = ''
    // let bom_id = ''
    // let customer = ''
    // let stage_name = ''
    // let bom_project_create_time = ''
    let sku_desc = ''
    let source_version = ''
    let emdm_create_time = ''
    let bomItems = []
    _.forEach(root, (item, idx) => {
      // 除了sku0的狀況 排除QTY=0的項目
      if (this.isFilterBySku(item, skuNum)) {
        return
      }
      version = item.version_name

      if (item.complete_partlistvalue != null && typeof item.complete_partlistvalue == 'object') {
        completePartListCount++
      }

      if (item.partlistvalue != null && typeof item.partlistvalue == 'object') {
        partListCount++
      }

      // project_code = item.project_code
      project_name = item.project_name
      source_version = item.source_version
      emdm_create_time = item.bom_project_create_time
      // bom_id = item.bom_id
      // customer = item.customer
      // stage_name = item.stage_name
      sku_desc = item.sku_desc
      // bom_project_create_time = item.bom_project_create_time
      let resBase =  this.getBomBaseObj(item, idx)
      const isNoNeedPartlistObj = this.isNoNeedPartlist(needPartListRes, this.formatCheckNoNeedPartlistObj(item))
      const isOtherFillMeRemark =  this.isOtherFillMeRemark(needPartListRes, this.formatCheckNoNeedPartlistObj(item))
      this.addPartInfo(resBase, isNoNeedPartlistObj, isOtherFillMeRemark)
      this.addCostInfoInObj(item, resBase, skuNum, isNoNeedPartlistObj, isOtherFillMeRemark)
      bomItems.push(resBase)
    })

    // if isRDME == empty, user != RDME so can view sku_cost
    let sku_cost = null
    if (skuSum != null && skuSum.length > 0) {
      sku_cost = [{ sku0: skuSum[0] }, { sku1: skuSum[1] }, { sku2: skuSum[2] }, { sku3: skuSum[3] },
        { sku4: skuSum[4] }, { sku5: skuSum[5] }]
    } else {
      sku_cost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    }
    return {
      editAble: true,
      projectName: project_name ? project_name : null,
      emdmVersion: (source_version != null && emdm_create_time != null) ? `${source_version}_${moment(emdm_create_time).format('YYYYMMDDHHmm')}` : '--',
      totalItems: result.rowCount,
      skuCost: sku_cost,
      skuDesc: sku_desc ? sku_desc : null,
      bomItems,
      partItems: bomItemsPart,
      uploadFlag: true,
      totalPartlistCount:completePartListCount > 0 ? completePartListCount : partListCount > 0 ? partListCount : 0,
      unEditCount: unEditCount,
      version: version,
    }
  }
  static isFilterBySku(item, skuName){
    // 除了sku0的狀況 排除QTY=0的項目
    return skuName !== 'sku0' && parseFloat(item[skuName]) === 0
  }
  /**
   * 取最新版 bom item 列表
   * @param {number} bomID  project id
   * @param {string} assign 'all' or assign_uuid
   * @param {number} sku    sku amount to calcuate price
   * @param {string} version_id 版本uuid 暫不使用 未來refactor保留參數
   * @param {boolean} isExportPrice 是否匯出價格
   * @param {object} options 可選參數
   */
  static async getBomCurrentBomTable(bomID, assign, sku = null, version_id = null, isExportPrice = false, options = {}){
    sku = sku ? sku : 'sku1'
    let {
      isEmdmProject = false, // 是否為emdm project
      diffBomItems = [], // 複製來源bonItem 顯示高亮用
      imagesList = [], // emdm 圖片資訊
    } = options
    let bomTableRes = null
    if (version_id) {
      bomTableRes = await bomItemModel.getBomTableByCompleteVersionId(version_id, assign)
    } else {
      bomTableRes = await bomItemModel.getBomTable(bomID, assign)
    }
    let productTypeInfo = await cache.getCacheAsync(`PRODUCT_TYPE_INFO_${bomID}`, bomItemModel.getProductTypeInfoByBomID, bomID)
    let productTypeId = productTypeInfo.product_type_id
    let needPartListRes = await this.getBomItemPartlistFormate(productTypeId)
    // root
    let root = _.chain(bomTableRes.rows)
      .filter((o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
      .sortBy((s) => s.order_id)
      .value()

    let recordCount = {}
    _.chain(bomTableRes.rows)
      .filter((o) => {
        return o.sub_level && o.parent_level != null
      })
      .groupBy((o) => { return o.level })
      .sortBy((s) => s.order_id)
      .map((value) => {
        value.map(v => {
          let idx = root.findIndex(r => v.parent_level == r.id)
          let count = isNaN(recordCount[v.parent_level]) ? 0 : recordCount[v.parent_level] + 1
          root.splice(idx + 1 + count, 0, v)
          recordCount[v.parent_level] = count
        })
      })
      .value()
    // let bomItemsPart = filterPartList(root)
    // compute clean sheet cost
    let skuSum = null
    let tmpRoot = _.cloneDeep(root)
    if (assign.toLowerCase() == 'all') {
      // 取得計算組工費參數
      let laboragePara = await meBomCost.getLaborageParamater()
      if(sku){
        meBomCost.computeLaborage(root, sku, laboragePara)
      }else{
        meBomCost.computeLaborage(root, null, laboragePara)
      }

      // skuSum = meBomCost.computeSkuSumCost(root)
      skuSum = meBomCost.computeAllSkuSumCost(tmpRoot, laboragePara)
    }
    let unEditCount = 0
    let partListCount = 0
    let version = 'V0.0'
    // let project_code, customer, stage_name, sku_desc, bom_project_create_time= ''
    let sku_desc
    let project_name = ''
    // 20190918 remove filter sku != 0 condition
    let historyList = await emdmMainModel.getBomEditHistory([bomID], _.map(root, 'source_item_id'))

    let completePartListCount = 0
    let partItems = []
    let bomItems = []
    _.forEach(root, (item, idx) => {
      version = item.version_name
      // 除了sku0的狀況 排除QTY=0的項目
      if (this.isFilterBySku(item, sku)) {
        return
      }
      // project_code = item.project_code
      project_name = item.project_name
      // customer = item.customer
      // stage_name = item.stage_name
      sku_desc = item.sku_desc
      // bom_project_create_time = item.bom_project_create_time
      if (item.partlistvalue != null && typeof item.partlistvalue == 'object') {
        partListCount++
        if (_.isEmpty(item.partlistvalue)) {
          unEditCount++
        }
      }
      let resBase = this.getBomBaseObj(item, idx)
      const isNoNeedPartlistObj = this.isNoNeedPartlist(needPartListRes, this.formatCheckNoNeedPartlistObj(item))
      const isOtherFillMeRemark =  this.isOtherFillMeRemark(needPartListRes, this.formatCheckNoNeedPartlistObj(item))
      this.addPartInfo(resBase, isNoNeedPartlistObj, isOtherFillMeRemark)
      if (isExportPrice) {
        this.addCostInfoInObj(item, resBase, sku, isNoNeedPartlistObj, isOtherFillMeRemark)
      }
      if (isEmdmProject) {
        this.addCostDiffObj(resBase, diffBomItems)
        if (historyList) {
          this.addHistoryInfo(resBase, historyList)
        }
        if (imagesList) {
          this.addImageInfo(resBase, imagesList)
        }
      }
      bomItems.push(resBase)

      let type1 = resBase.parts_ctgy_1
      let type2 = resBase.parts_ctgy_2
      let filterRes = this._filterPartList({
        item,
        idx,
        bomID,
        isExportPrice,
        imagesList,
        isNoNeedPartlistObj,
        isOtherFillMeRemark,
      })
      let resPartList = filterRes.resPartList
      if (resPartList) {
        completePartListCount++
        let partFindRes = partItems.find((partListItem) => partListItem.type1 === type1 && partListItem.type2 === type2)
        if (partFindRes){
          partFindRes.partlist.push(resPartList)
        } else {
          partItems.push({
            type1,
            type2,
            partlist:[resPartList],
          })
        }
      }
    })
    partItems = _.orderBy(partItems, ['type1', 'type2'], ['asc', 'asc'])

    let sku_cost = null
    if (skuSum != null && skuSum.length > 0) {
      sku_cost = [{ sku0: skuSum[0] }, { sku1: skuSum[1] }, { sku2: skuSum[2] }, { sku3: skuSum[3] },
        { sku4: skuSum[4] }, { sku5: skuSum[5] }]
    } else {
      sku_cost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    }

    let uploadFlag = await bomItemModel.getUploadFileRecord(bomID)
    uploadFlag = !uploadFlag
    return {
      editAble: false,
      projectName: project_name ? project_name : null,
      totalItems: bomTableRes.rowCount,
      skuCost: sku_cost,
      skuDesc: sku_desc ? sku_desc : null,
      bomItems,
      partItems,
      uploadFlag,
      totalPartlistCount:completePartListCount > 0 ? completePartListCount : partListCount > 0 ? partListCount : 0,
      unEditCount: unEditCount,
      version: version,
    }
  }
  static _filterPartList(params) {
    let {
      item,
      idx,
      bomID,
      isExportPrice = false,
      imagesList = [],
      isNoNeedPartlistObj = { noNeedRes: false },
      isOtherFillMeRemark = false,
    } = params
    let resPartList = null
    if (item.partlistvalue != null && typeof item.partlistvalue == 'object'){
      resPartList = {
        item: idx + 1,
        id: item.id,
        part_name: item.part_name,
        ref_part_num: item.reference_pn,
        part_number: item.part_number,
        material_spec: item.material_spec,
        material: item.material,
        image_path: item.partlistimage != null && !_.isEmpty(item.partlistimage) ? item.partlistimage.images ? item.partlistimage.images : [] : [],
        update_time: moment(item.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
        hasui: item.hasui || false,
        formate: item.partlistformate,
        source_item_id: item.source_item_id,
        bom_id: bomID,
        image: this.checkEmdmImage(item.source_item_id, imagesList, 'partList'),
      }
      if (isExportPrice) {
        resPartList.system_cost = this.getCleanSheetCost(item.system_cost, isNoNeedPartlistObj.noNeedRes, isOtherFillMeRemark)
      }
    }
    return {
      resPartList,
    }
  }
  static getNewDropdownValue(typeData, gbAssyOtherData){
    let res = []
    // 處理新查詢資料為原本response格式
    _.forEach(typeData, (v) =>{
      let findPartCtgy1Res = _.find(res, (dv) => { return dv.part_ctgy1_id == v.part_ctgy1_id })
      let findPartCtgy2Res = _.find(res, (dv) => { return dv.part_ctgy2_id == v.part_ctgy2_id && dv.part_ctgy1_id == v.part_ctgy1_id})
      let findMaterialRes = _.find(res, (dv) => {
        return dv.part_ctgy2_id == v.part_ctgy2_id && dv.part_ctgy1_id == v.part_ctgy1_id
         && dv.material_id == v.material_id && dv.material_spec_id == v.material_spec_id
      })
      let findMaterialSpecRes = _.find(res, (dv) => {
        return dv.part_ctgy2_id == v.part_ctgy2_id && dv.part_ctgy1_id == v.part_ctgy1_id &&
         dv.id == v.material_spec_id
      })
      // let findMetalMaterialSpecRes = _.find(res, (dv) => { return dv.id == v.metal_material_spec_id})
      if (!findPartCtgy1Res) {
        let part_ctgy1_obj = {
          field_name: 'parts_ctgy_1',
          id: v.part_ctgy1_id,
          part_ctgy1_id:v.part_ctgy1_id,
          part_ctgy2_id:null,
          material_spec_id:null,
          material_id:null,
          item_name: v.part_ctgy1,
          path: v.part_ctgy1_path ? v.part_ctgy1_path.replace(/(?:\\[rn]|[(]|[)]|[*]|[%]|[+]|[\r\n]+)+/g, '').replace(/ /g, '')  : null,
        }
        if(v.part_ctgy1_id) res.push(part_ctgy1_obj)
      }
      if (!findPartCtgy2Res) {
        let part_ctgy2_obj = {
          field_name: 'parts_ctgy_2',
          id: v.part_ctgy2_id,
          part_ctgy1_id:v.part_ctgy1_id,
          part_ctgy2_id:v.part_ctgy2_id,
          material_spec_id:null,
          material_id:null,
          item_name: v.part_ctgy2,
          path: v.part_ctgy2_path ? v.part_ctgy2_path.replace(/(?:\\[rn]|[(]|[)]|[*]|[%]|[+]|[\r\n]+)+/g, '').replace(/ /g, '') : null,
        }
        if(v.part_ctgy2_id) res.push(part_ctgy2_obj)
      }
      if (!findMaterialRes) {
        let material_obj = {
          field_name: 'material',
          id: v.material_id,
          part_ctgy1_id:v.part_ctgy1_id,
          part_ctgy2_id:v.part_ctgy2_id,
          material_spec_id:v.material_spec_id,
          material_id: v.material_id,
          item_name: v.material_name,
          path: v.material_path ? v.material_path.replace(/(?:\\[rn]|[(]|[)]|[*]|[%]|[+]|[\r\n]+)+/g, '').replace(/ /g, '')  : null,
        }
        if(v.material_id) res.push(material_obj)
      }
      if (!findMaterialSpecRes) {
        let materialSpecObj = {
          field_name: 'material_spec',
          id: v.material_spec_id,
          part_ctgy1_id:v.part_ctgy1_id,
          part_ctgy2_id:v.part_ctgy2_id,
          material_spec_id:v.material_spec_id,
          material_id: null,
          item_name: v.material_spec_name,
          path: v.material_spec_path ? v.material_spec_path.replace(/(?:\\[rn]|[(]|[)]|[*]|[%]|[+]|[\r\n]+)+/g, '').replace(/ /g, '')  : null,
        }
        if(v.material_spec_id) res.push(materialSpecObj)
      }
    })

    /* _.forEach(gbAssyOtherData, (v) =>{
      let findgbCtgyRes = _.find(res, (dv) => { return dv.id == v.gb_assy_ctgy_id })
      let findOdmoemRes = _.find(res, (dv) => { return dv.id == v.odm_oem_id })
      let findSupplyTypeRes = _.find(res, (dv) => { return dv.id == v.supply_type_id })
      let findOperationRes = _.find(res, (dv) => { return dv.id == v.operation_id })
      let findOperationFunCtgyRes = _.find(res, (dv) => { return dv.id == v.func_ctgy_id })
      if (!findgbCtgyRes) {
        let gbAssyCtgyObj = {
          field_name: 'gb_assy_ctgy',
          id: v.gb_assy_ctgy_id,
          item_name: v.gb_assy_ctgy_name,
          path: v.gb_assy_ctgy_path.trim(),
        }
        if(v.gb_assy_ctgy_id) res.push(gbAssyCtgyObj)
      }
      if (!findOdmoemRes) {
        let odmOemObj = {
          field_name: 'odm_oem',
          id: v.odm_oem_id,
          item_name: v.odm_oem_name,
          path: v.odm_oem_path.trim(),
        }
        if(v.odm_oem_id) res.push(odmOemObj)
      }
      if (!findSupplyTypeRes) {
        let supplyObj = {
          field_name: 'supply_type',
          id: v.supply_type_id,
          item_name: v.supply_type_name,
          path: v.supply_type_path.trim(),
        }
        if(v.supply_type_id) res.push(supplyObj)
      }
      if (!findOperationRes) {
        let operationObj = {
          field_name: 'initaddmodidel',
          id: v.operation_id,
          item_name: v.operation_name,
          path: v.operation_path.trim(),
        }
        if(v.operation_id) res.push(operationObj)
      }
      if (!findOperationFunCtgyRes) {
        let funCtgyObj = {
          field_name: 'func_ctgy',
          id: v.func_ctgy_id,
          item_name: v.func_ctgy_name,
          path: v.func_ctgy_path.trim(),
        }
        if(v.func_ctgy_id) res.push(funCtgyObj)
      }
    })*/
    return res.concat(gbAssyOtherData)
  }
  /**
 * 取得基本的BomItem資訊，此資訊不包含價格相關資訊
 * @param {Object} bomItem
 * @param {Object} idx
 * @param {String} bese64Img
 * @returns {Object}
 */
  static getBomBaseObj(bomItem, idx, bese64Img) {
    if (bomItem.image_path != null) {
      let ext = bomItem.image_path.split('.').pop()
      let ba64Convert = `data:image/${ext};base64,`
      let ba64Tmp = fs.readFileSync(bomItem.image_path, 'base64')
      bese64Img = ba64Convert.concat(ba64Tmp)
    }
    return {
      item: idx + 1,
      id: bomItem.id,
      customer_pn: bomItem.customer_pn,
      supply_type: bomItem.supply_type,
      level: bomItem.level,
      parent_level: bomItem.parent_level,
      sub_leve: bomItem.sub_level,
      rfq_pn: bomItem.rfq_pn,
      ref_part_num: bomItem.reference_pn,
      part_name: bomItem.part_name,
      image_id: bomItem.image_id,
      image_path: bomItem.image_path != null ? bese64Img : null,
      gb_assy_ctgy: bomItem.gb_assy_ctgy,
      func_ctgy: bomItem.func_ctgy,
      parts_ctgy_1: bomItem.parts_ctgy_1,
      parts_ctgy_2: bomItem.parts_ctgy_2,
      material_spec: bomItem.material_spec,
      material: bomItem.material,
      part_size_l: bomItem.part_size_l,
      part_size_w: bomItem.part_size_w,
      part_size_h: bomItem.part_size_h,
      part_size_ef: bomItem.part_size_ef,
      part_size_m: bomItem.part_size_m,
      part_size_l2: bomItem.part_size_l2,
      part_size_w2: bomItem.part_size_w2,
      thickness: bomItem.thickness,
      part_weight: bomItem.part_weight,
      unedit: bomItem.partlistvalue != null && _.isEmpty(bomItem.partlistvalue) ? true : false,
      // partlist_price: bomItem.partlistprice ? bomItem.partlistprice : null,
      partlist_amount: bomItem.partlistamount != null && !_.isEmpty(bomItem.partlistamount) ? bomItem.partlistamount.amount ? bomItem.partlistamount.amount : null : null,
      update_time: moment(bomItem.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
      sku0: bomItem.sku0,
      sku1: bomItem.sku1,
      sku2: bomItem.sku2,
      sku3: bomItem.sku3,
      sku4: bomItem.sku4,
      sku5: bomItem.sku5,
      odm_oem: bomItem.odm_oem,
      initaddmodidel: bomItem.initaddmodidel,
      part_number: bomItem.part_number ? bomItem.part_number : null,
      owner: bomItem.owner,
      haschild: bomItem.haschild, // 是否有子階，前端cost編輯頁面判斷用
      has_child: bomItem.has_child, // 是否有子階，使用者維護值
      need_tooling: bomItem.need_tooling, // 是否有tooling，使用者註記用
      remark: bomItem.remark,
      lowest_cost: null, // 自動最低價 價格類型
      lowest_cost_info: null,
      source_item_id: bomItem.source_item_id, // edit history 用
      emdm_id : bomItem.emdm_id ? bomItem.emdm_id : null, // diff highlight 用
      history: false, // emdm編輯紀錄
      image: false, // emdm圖片
    }
  }
  /**
   * clean sheet cost 顯示邏輯
   * @param {String} systemCost
   * @param {Boolean} isNoNeedFillPartlist 不需要填partlist (影響到clean_sheet_cost呈現)
   * @param {Boolean} isOtherFillMeRemark 是否為OtherFillMeRemar (影響到clean_sheet_cost呈現)
   */
  static getCleanSheetCost(systemCost, isNoNeedFillPartlist, isOtherFillMeRemark) {
    let cleanSheetCost = _.isNil(systemCost) ? null : formatFloat(systemCost, meFloatPoint.get('cleanSheetCost'))
    // 20200825統一前後端規則
    // 非0數字 => 數字
    // 0 or 負數 or 無限 => null
    // isNoNeedFillPartlist => null
    // isOtherFillMeRemark => '-'
    // null(partlist 內部有OtherFillMeRemark 會輸出 null) => '-'
    if (isNoNeedFillPartlist) {
      cleanSheetCost = null
    } else if (isOtherFillMeRemark || _.isNull(cleanSheetCost)) {
      cleanSheetCost = '-'
    } else if (cleanSheetCost <= 0 || !_.isFinite(cleanSheetCost)) {
      cleanSheetCost = null
    }
    return cleanSheetCost
  }
  /**
   * last price 顯示邏輯
   * @param {Object} bomItem
   */
  static getLastPrice(bomItem){
    let isValidPrice = _.has(bomItem, 'last_price.isValidPrice') ?  _.get(bomItem, 'last_price.isValidPrice') : null
    let unitPrice = _.has(bomItem, 'last_price.unitPrice') ? _.get(bomItem, 'last_price.unitPrice') : null
    let validDate = (_.has(bomItem, 'last_price.validDate') && !_.isNull(_.get(bomItem, 'last_price.validDate'))) ? moment(_.get(bomItem, 'last_price.validDate')).format('YYYYMMDD') : null
    let purchaseOrg = _.has(bomItem, 'last_price.purchaseOrg') ? _.get(bomItem, 'last_price.purchaseOrg') : null
    if (unitPrice === '-') { // 舊資料 找不到價格時會寫入'-' 現在改回空白
      unitPrice = null
    }else if (unitPrice){
      unitPrice = formatFloat(unitPrice, meFloatPoint.get('lastPrice'))
    }
    if (isValidPrice === false) { // 舊資料 找到失效價格時會顯示 價格+刪除線 現在改回空白
      unitPrice = null
      isValidPrice = null
      validDate = null
      purchaseOrg = null
    }
    return {
      unitPrice,
      validDate,
      isValidPrice,
      purchaseOrg,
    }
  }

  static addPartInfo(baseObj, isNoNeedFillPartlistObj = { noNeedRes:false }, isOtherFillMeRemark = false) {
    baseObj.partInfo = {
      isOtherFillMeRemark,
      'isRefPartNumber': isNoNeedFillPartlistObj.isRefPartNumber,
      'haschild': isNoNeedFillPartlistObj.haschild,
      'noNeedByOdmOem': isNoNeedFillPartlistObj.noNeedByOdmOem,
      'noFormate': isNoNeedFillPartlistObj.noFormate,
    }
  }
  /**
 * 在物件上追加MEBOM的價格相關資訊
 * 請注意，此方法會直接修改傳入的baseObj
 * @param {Object} bomItem
 * @param {Object} baseObj 來源:getBomBaseObj或任何物件
 * @param {Number} skuNum user選擇的sku ex:'sku3'，預設使用sku1
 * @param {Boolean} isNoNeedFillPartlist 不需要填partlist (影響到clean_sheet_cost呈現)
 * @param {Boolean} isOtherFillMeRemark 是否為OtherFillMeRemar (影響到clean_sheet_cost呈現)
 */
  static addCostInfoInObj(bomItem, baseObj, skuNum, isNoNeedFillPartlistObj = { noNeedRes:false }, isOtherFillMeRemark = false){
    let isNoNeedFillPartlist = isNoNeedFillPartlistObj.noNeedRes
    let cleanSheetCost = this.getCleanSheetCost(bomItem.system_cost, isNoNeedFillPartlist, isOtherFillMeRemark)
    let resCeShipping =  _.isNil(bomItem.shipping_check_cost) ? null : formatFloat(bomItem.shipping_check_cost, meFloatPoint.get('ceShipping'))
    let sku = skuNum ? formatFloat(bomItem[skuNum], meFloatPoint.get('SKU')) : bomItem.sku1 ? formatFloat(bomItem.sku1, meFloatPoint.get('SKU')) : 0
    const sourceCostUp = meBomCost.getSourcerCost(bomItem)
    let inquiryCost = meBomCost.getInquiryCost(bomItem)
    inquiryCost = (inquiryCost === 0) ? null : inquiryCost // 0就是沒有填，所以要改為null
    let lastPrice = this.getLastPrice(bomItem)
    let resCeAssembly = _.isNil(bomItem.laborageCost) ? null : formatFloat(bomItem.laborageCost / sku, meFloatPoint.get('ceAssembly'))// 顯示用的ce組工費
    let resCepl = meBomCost.getCepl(bomItem) // 顯示用的cepl cepl,
    baseObj.tooltip = { // tooltip所有的價格皆為單價(U/P)
      'last_price':{
        'total_cost': lastPrice.unitPrice,
        'valid_date': lastPrice.validDate,
        'is_valid_price': lastPrice.isValidPrice,
        'purchase_org': lastPrice.purchaseOrg,
      },
      'spa_cost':{
        'material_name': bomItem.spa_cost_material_remark,
        'total_cost': _.isNil(bomItem.spa_cost) ? null : formatFloat(bomItem.spa_cost, meFloatPoint.get('SPACost')),
      },
      'inquiry_cost':{
        'inquiry_cost_up': inquiryCost,
        'ce_pl': resCepl,
        'ce_assembly': resCeAssembly,
        'ce_shipping': resCeShipping,
        'total_cost': inquiryCost,
      },
      'clean_sheet_cost':{
        'ce_pl': resCepl,
        'ce_shipping': resCeShipping,
        'clean_sheet_cost_up': cleanSheetCost ? cleanSheetCost : null,
        'total_cost': null,
      },
      'ce_cost_assembly':{
        'ce_pl': resCepl,
        'ce_assembly': resCeAssembly,
        'ce_shipping': resCeShipping,
        'sub_suggestion_cost': null,
        'total_cost': null,
      },
      'sourcer_cost':{
        'sourcer_cost_up': sourceCostUp,
        'ce_pl': resCepl,
        'ce_assembly': resCeAssembly,
        'ce_shipping': resCeShipping,
        'total_cost': sourceCostUp,
      },
    }
    // const ceCostSkuAmout =  _.isNil(bomItem.suggestionCost)?  null : formatFloat(bomItem.suggestionCost, FLOAT_POINT)
    let ceCostUp = bomItem.calCeCostUp /* _.isNil(ceCostSkuAmout)? null : formatFloat(ceCostSkuAmout / sku, FLOAT_POINT)*/
    let ceCostSkuAmout = _.isNil(bomItem.suggestionCost) ?  null : formatFloat(bomItem.suggestionCost, meFloatPoint.get('ceCostSKU'))
    let suggestionType = bomItem.lowestCost
    if (bomItem.suggestion_cost_type !== 'auto_lowest_cost') {
      suggestionType = bomItem.suggestion_cost_type
    }
    switch (suggestionType) {
      case 'ce_cost_assembly':
        baseObj.tooltip.ce_cost_assembly.sub_suggestion_cost = formatFloat((ceCostUp - resCeAssembly - resCeShipping - resCepl), meFloatPoint.get('ceCostUP'))
        baseObj.tooltip.total_cost = ceCostUp
        break
      case 'clean_sheet_cost':
      case 'inquiry_cost':
      case 'sourcer_cost':
        baseObj.tooltip.clean_sheet_cost.total_cost = ceCostUp
        break
      case 'last_price':
      case 'spa_cost':
        break
      case 'auto_lowest_cost':
        if (!bomItem.lowestCost) { // 沒有選出最低價(代表所有類別都沒有價格)
          ceCostUp = null
          ceCostSkuAmout = null
        }
        break
      default: // 沒有選suggestion_cost_type，所以強制設為null
        ceCostUp = null
        ceCostSkuAmout = null
        break
    }
    baseObj.sourcer_shipping = _.isNil(bomItem.sourcer_shipping) ? null : formatFloat(bomItem.sourcer_shipping, meFloatPoint.get('sourcerShipping'))
    baseObj.sourcer_pl = _.isNil(bomItem.sourcer_pl) ? null : formatFloat(bomItem.sourcer_pl, meFloatPoint.get('sourcerPL'))
    baseObj.sourcer_assembly = _.isNil(bomItem.sourcer_assembly) ? null : formatFloat(bomItem.sourcer_assembly, meFloatPoint.get('sourcerAssembly'))
    baseObj.sourcer_remark = bomItem.sourcer_remark
    baseObj.spa_cost_up = _.isNil(bomItem.spa_cost) ? null : formatFloat(bomItem.spa_cost, meFloatPoint.get('sourcerCostUP'))
    baseObj.last_price_up = lastPrice.unitPrice
    baseObj.ori_last_price_up = bomItem.last_price.oriUnitPrice // export 用
    baseObj.ori_last_price_curr = bomItem.last_price.oriCurrency // export 用
    baseObj.valid_from = lastPrice.validDate
    baseObj.clean_sheet_cost_up = cleanSheetCost
    baseObj.sourcer_import_curr = bomItem.sourcer_import_curr // export 用
    baseObj.ori_sourcer_shipping =  bomItem.ori_sourcer_shipping // export 用
    baseObj.ori_sourcer_pl =  bomItem.ori_sourcer_pl // export 用
    baseObj.ori_sourcer_assembly =  bomItem.ori_sourcer_assembly // export 用
    baseObj.ori_sourcer_cost_up =  bomItem.ori_sourcer_cost_up // export 用
    baseObj.sourcer_cost_up = sourceCostUp
    baseObj.inquiry_cost_up =  inquiryCost
    baseObj.suggestion_cost_type = bomItem.suggestion_cost_type
    baseObj.ce_shipping =  resCeShipping // 原運檢包，由CE運檢包取代之
    baseObj.ce_assembly = resCeAssembly
    baseObj.ce_pl = resCepl
    baseObj.ce_cost_up = ceCostUp
    baseObj.ce_cost_sku_amount = ceCostSkuAmout
    baseObj.ce_remark = bomItem.suggestion_cost_remark
    baseObj.material_name = bomItem.spa_cost_material_remark // 讓前端方便做事，因此抽出spa material_name在這
    baseObj.sourcer_cost_sku_amount = _.isNil(sourceCostUp) ? null : formatFloat(sourceCostUp * sku, meFloatPoint.get('sourcerCostSKU')) // export excel用
    baseObj.suggestionCost = bomItem.suggestionCost // dashboard用
    baseObj.lowest_cost = bomItem.lowestCost ? bomItem.lowestCost : null // 自動最低價 價格類型
    baseObj.lowest_cost_info = bomItem.costInfo ? bomItem.costInfo : null // 所有價格資訊(計算自動最低價用)
  }
  static addCostDiffObj(resBase, diffBomItems){
    resBase.cost_highlight = {
      'last_price_up': resBase.last_price_up === '-' ? resBase.last_price_up : null, // 當輸出'-'時預設值為'-'
      'clean_sheet_cost_up': resBase.clean_sheet_cost_up === '-' ? resBase.clean_sheet_cost_up : null, // 當輸出'-'時預設值為'-'
      'ce_assembly': null,
      'ce_cost_up': null,
    }
    if (diffBomItems && diffBomItems.length) { // 有取得上一版資訊
      let diffItem = diffBomItems.find((diff) => diff.emdm_id === resBase.emdm_id)// 找出上一版相對物件
      if (diffItem) { // 檢查是否有價格
        if (typeof diffItem.last_price_up === 'number') {
          resBase.cost_highlight.last_price_up = diffItem.last_price_up
        }
        if (typeof diffItem.clean_sheet_cost_up === 'number' || diffItem.clean_sheet_cost_up === '-') { // 無須計算時呈現 '-'
          resBase.cost_highlight.clean_sheet_cost_up = diffItem.clean_sheet_cost_up
        }
        if (typeof diffItem.ce_assembly === 'number') {
          resBase.cost_highlight.ce_assembly = diffItem.ce_assembly
        }
        if (typeof diffItem.ce_cost_up === 'number') {
          resBase.cost_highlight.ce_cost_up = diffItem.ce_cost_up
        }
      }
    } else { // 沒有上一版專案 提供與本版一樣的內容
      resBase.cost_highlight.last_price_up = resBase.last_price_up
      resBase.cost_highlight.clean_sheet_cost_up = resBase.clean_sheet_cost_up
      resBase.cost_highlight.ce_assembly = resBase.ce_assembly
      resBase.cost_highlight.ce_cost_up = resBase.ce_cost_up
    }
  }
  static addHistoryInfo(resBase, historyList) {
    let historyRes = _.find(historyList, (history) => history.source_item_id == resBase.source_item_id)
    if (historyRes) {
      resBase.history = true
    }
  }
  static addImageInfo(resBase, imagesList) {
    if (this.checkEmdmImage(resBase.source_item_id, imagesList, 'bomItem')) {
      resBase.image = true
    }
  }
  static checkEmdmImage(source_item_id, imagesList, checkType = 'bomItem'){
    let res = false
    let imageRes = _.find(imagesList, (image) => {
      let matchID = image.ppId == source_item_id
      let length = image.objectList.length > 0
      let drawingFile = false
      if (checkType === 'bomItem') {
        drawingFile = !_.isNil(image.objectList.find(obj => obj.fileCategory == 'drawingFile'))
      } else {
        drawingFile = !_.isNil(image.objectList.find(obj => obj.fileCategory !== 'drawingFile'))
      }
      return matchID && length && drawingFile
    } )
    if (imageRes) {
      res = true
    }
    return res
  }
  /**
 * @param {Object} needPartListRes from :cache.getCacheAsync('NEED_PART_LIST', getBomItemPartlistFormate)
 * @param {Object} bomItem 單一項Me Bom Item
 * @returns {Boolean}
 */
  static isOtherFillMeRemark(needPartListRes, bomItem){
    let result = false
    let regexp = /Other_Fill_ME_Remark/
    let otherNoNeed = this.checkNoNeedPartList(needPartListRes.noPartList, bomItem)
    result = otherNoNeed
    if (!result) {
      let jsonstr = JSON.stringify(bomItem.partlistValue)
      result = regexp.test(jsonstr)
    }
    return result
  }
  /**
 * @param {Object} needPartListRes from :cache.getCacheAsync('NEED_PART_LIST', getBomItemPartlistFormate)
 * @param {Object} bomItem 單一項Me Bom Item
 * @returns {Boolean}
 */
  static isNoNeedPartlist(needPartListRes, bomItem){
    const partlistFormate = (needPartListRes.byPartCategory || []).find(rule => rule.parts_ctgy_1 === bomItem.parts_ctgy_1 && bomItem.parts_ctgy_2 === rule.parts_ctgy_2)
    const noFormate = _.isNil(partlistFormate) // 找不到Formate
    let noNeedRes = false
    let noNeedByOdmOem = this.noNeedPartListByOdmOem(needPartListRes, bomItem)
    let hasChild = bomItem.haschild || bomItem.has_child || bomItem.hasChild
    if (_.isNull(hasChild)) {
      throw new Error('HasChild Flag not found.')
    }
    if (bomItem.ref_part_num || hasChild || noNeedByOdmOem || noFormate) {
      noNeedRes = true
    }
    let noNeedInfo = {
      'isRefPartNumber': !_.isNil(bomItem.ref_part_num),
      'haschild': hasChild,
      noNeedByOdmOem,
      noFormate,
      noNeedRes,
    }
    return noNeedInfo// noNeedRes
  }
  /**
 * 該bom的odm oem是否不需要partlist
 * @param {Object} needPartListRes from :cache.getCacheAsync('NEED_PART_LIST', getBomItemPartlistFormate)
 * @param {Object} bomItem 單一項Me Bom Item
 * @returns {Boolean} true = OEM/TBD
 */
  static noNeedPartListByOdmOem(needPartListRes, bomItem){
    return needPartListRes.notByOdmOem.findIndex((item) => item.id === bomItem.odm_oem) >= 0
  }
  /**
 * 將bomItem格式化為CheckNoNeedPartlist用的物件
 * 此方法目前用於資料來源是bomItemModel.getBomTable時使用
 * @param {Object} bomItem
 * @returns {Object}
 */
  static formatCheckNoNeedPartlistObj(bomItem){
    return {
      ref_part_num: bomItem.reference_pn ? bomItem.reference_pn : bomItem.ref_part_num ? bomItem.ref_part_num : null,
      odm_oem :bomItem.odm_oem_id,
      material: bomItem.material_id,
      material_spec: bomItem.material_spec_id,
      parts_ctgy_1: bomItem.parts_ctgy_1_id,
      parts_ctgy_2: bomItem.parts_ctgy_2_id,
      haschild: bomItem.haschild || bomItem.has_child, // 是否有子階，前端cost編輯頁面判斷用
      partlistValue: bomItem.partlistvalue,
    }
  }
  static checkNoNeedPartList(noNeedPartListUuid, item){
    let result = false

    let findRes = _.find(noNeedPartListUuid, (data) =>{
      return data['parts_ctgy_1'] === item['parts_ctgy_1'] &&
      data['parts_ctgy_2'] === item['parts_ctgy_2'] &&
      data['material_spec'] === item['material_spec'] &&
      data['material'] === item['material']
    }
    )
    if (findRes) {
      result = true
    }
    return result
  }
  static editHistoryFormat(edit_history, item_detail) {
    let res = _.chain(edit_history)
      .orderBy(['create_time'], ['desc'])
      .groupBy(d => d.user_name + moment(d.create_time).format('YYYY-MM-DD HH:mm'))
      .map((data) => {

        return {
          cost_version: data[0].version_name,
          edit_user_name: data[0].user_name,
          edit_time: moment(data[0].create_time).format('YYYY-MM-DD HH:mm'),
          history: _.map(data, (d) => {
            let detail = _.find(item_detail, (item) => item.source_item_id == d.source_item_id)
            return {
              // part_type: d.part_type.toUpperCase(),
              item_name: detail ? `${detail.part_name}(${detail.part_number ? detail.part_number : ''})` : _.startCase(d.action_type.replace(/_/g, ' ')),
              field_label: d.label_name,
              value: d.value,
            }
          }),
        }
      })
      .value()
    return res
  }
}

module.exports = MebomUtil
