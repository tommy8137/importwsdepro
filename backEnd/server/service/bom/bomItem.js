/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')
const fs = require('fs')
const validator = require('validator')

const { suggestionCostType } = require('../../../config.js')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { formatFloat, asyncForEach } = require('../../helpers/utils.js')

const meBomUtil = require('../../utils/mebom/meBomUtils.js')
const emdmBomUtil = require('../../utils/emdmBom/emdmBomUtils.js')
const V2Utils = require('../../../part-list-layout/V1ToV2/V2Utils')

const meBomCost = require('../../utils/cost/meBomCost')
const log4js = require('../../utils/logger/logger')
const dbHelper = require('../../utils/helper/db_helper')
const CacheHelper = require('../../utils/helper/cacheHelper.js')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

const rbacService = require('../admin/rbac.js')
const partListService = require('../../service/bom/partList.js')

const bomItemModel = require('../../model/bom/bomItem')
const bomVersionModel = require('../../model/bom/bomVersion')
const bomAssignModel = require('../../model/bom/bomDesignee')
const bomPartListModel = require('../../model/bom/bomPartList')
const emdmMainModel = require('../../model/bom/emdmBomMain.js')
const spendingModel = require('../../model/spending/spending')
const bomManagerModel = require('../../model/bom/bomManager.js')


const bomItemValidator = require('../../validator/bom/bomItem')
const cleansheetExportSetting = require('../../utils/cleansheetExport')

const DEFAULT_SUPPLY_TYPE = 'AVAP'
const ONLINE_EDIT = 'OnlineEdit'
const BOM_ITEM_LEVEL = ['DC/65', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const sourcerExchangeColumnList = [
  ['sourcer_shipping', 'ori_sourcer_shipping',  'sourcerShipping',  'sourcer_shipping'],
  ['sourcer_pl',       'ori_sourcer_pl',        'sourcerPL',        'sourcer_pl'],
  ['sourcer_assembly', 'ori_sourcer_assembly',  'sourcerAssembly',  'sourcer_assembly'],
  ['sourcer_cost',     'ori_sourcer_cost_up',   'sourcerCostUP',    'sourcer_cost_up'],
]

const logger = log4js.getLogger('BomItemService')
const cache = new CacheHelper()
const meFloatPoint = new DecimalGetter('MEBom')


const checkBomSubVersion = async (bomId, subVersion) => {
  let result = false
  // check version
  // only version = x.7 can edit cost
  let version = await bomItemModel.getVersionbyBomitem(bomId)

  if(version && version.length > 0){
    if(version[0].version_name){
      let splitVersion = version[0].version_name.split('.')
      if(splitVersion && splitVersion.length > 1){
        if(splitVersion[1] === subVersion){
          result = true
        }
      }
    }
  }else{
    throwApiError('the bom id is not exist', errorCode.UNAUTHORIZED)
  }
  return result
}
/**
   * 選擇匯率日期
   * 根據要匯出的版本而定
   * 0.0, x.7 使用版本建立時間
   * 0.5 使用 0.0 版 的建立時間
   * x.0, x.5 使用前一個版本建立時間 例:2.0/2.5 使用 1.7 版 的建立時間
   * @param {number} bomId
   * @param {string} versionId
   */
const getExchangeRateDate = async (bomId, versionId) => {
  if (versionId.trim().toUpperCase() === 'CURRENT') {
    let res = await bomItemModel.getLastVersionById(bomId)
    versionId = res.id
  }
  let version_info = await bomItemModel.getVersionDetail(versionId)
  let nameSplit = version_info.version_name.split('.')
  if (version_info.version_name === '0.0' || nameSplit[1] === '7') {
    return version_info.create_time
  } else {
    let versionSelect = ''
    let versionList = await bomItemModel.getVersionListById(bomId)
    if (version_info.version_name === '0.5') { // 0.5 -> 0.0
      versionSelect = '0.0'
    } else if (nameSplit[1] === '5' || nameSplit[1] === '0') { // x.0/x.5 -> (x-1).7
      versionSelect = `${parseInt(nameSplit[0], 10) - 1}.7`
    }
    if (versionSelect) {
      let versionRes = versionList.find((item) => item.version_name === versionSelect)
      version_info = await bomItemModel.getVersionDetail(versionRes.id)
    }
  }
  return version_info.create_time
}
/**
 * 重新計算整個project的 partlist
 * @param {tPosgres} client postgres db transaction client
 * @param {number} bomId bom project id
 * @param {boolean} forceUpdate 無視x.0不能更新的限制
 * @param {uuid Array} ignoreItemIdList 免更新清單
 */
const reCalPartlistPrice =  async function(client, bomId, forceUpdate = false, ignoreItemIdList = []) {
  let isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
  let lastVersion = await bomItemModel.getLastVersionById(bomId)
  if (lastVersion.version_name.split('.')[1] === '0' && forceUpdate === false) { // x.0 版無法更新
    return
  } else {
    let bomItemIdList = await bomItemModel.getBomItemId(lastVersion.id) // 取得 bom_item_id 列表
    if (!bomItemIdList.length) {// 沒有 bom_item 免更新
      return
    }
    let idForSearch = []
    bomItemIdList.forEach((item) => {// 過濾 ignoreItemIdList(免更新清單) 中的 id
      // eslint-disable-next-line no-magic-numbers
      if (!ignoreItemIdList.length || ignoreItemIdList.indexOf(item.id) < 0) {
        idForSearch.push(item.id)
      }
    })
    logger.info(`bom projects ${bomId} has ${idForSearch.length} items to recalculate partlist`)
    if (!idForSearch.length) { // 排除 ignore 後 沒有 bom_item 免更新
      return
    }
    let partLists = await bomPartListModel.getPartlistForReCla(idForSearch, ['housing-plastic', 'housing-metal'])// 用 bom_item_id 列表 取出所有 partlist
    let partListsLength = partLists.length
    let catchedLayouts = {}// layout 快取
    let projectInfo = {}// 專案資訊
    if (isEmdmProject) {
      projectInfo = await emdmMainModel.getEmdmBomDetailById(bomId)
    } else {
      projectInfo = await bomManagerModel.getMeBomDetailById(bomId)
    }

    for (let i = 0; i < partListsLength; i++) {
      let partlist = partLists[i]
      if (partlist.partlist_value && partlist.partlist_value.hasOwnProperty('Price')) {
        if (!catchedLayouts[partlist.formate]) {
          const { layout = [], formulas, autoCalculation } = await partListService.getPartListLayout(partlist.formate, projectInfo[0].product_type_id, projectInfo[0].product_type, bomId)
          catchedLayouts[partlist.formate] = {
            layout,
            formulas,
            autoCalculation,
          }
        }
        const layout = catchedLayouts[partlist.formate]
        let calRes = null
        try {
          calRes = partListService.calPartlistPrice(partlist.partlist_value, layout.formulas, layout.layout)// 計算 partlist
        } catch (err) {
          logger.error('calPartlistPrice with error:', err)
        }
        if(calRes && !isNaN(calRes.totalPrices)){
          await bomItemModel.updateBomItem(client, partlist.bom_item_id, { 'system_cost': calRes.totalPrices, 'modified_time': moment().utc().format() })
        }else{
          await bomItemModel.updateBomItem(client, partlist.bom_item_id, { 'system_cost': 0, 'modified_time': moment().utc().format() })
        }
        await bomItemModel.updatePartList(client, partlist.bom_item_id, {
          partlistPrice: calRes,
        })
      } else {
        continue
      }
    }
  }
}
const makeShortId = () => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const checkTreeCircle = (items) => {

  let tStrct = items.map(e => ({ 'id': e.id, 'sub_leve': e.sub_leve, 'parent_level': e.parent_level }))
  // get tree root
  let roots = _.filter(tStrct, (o) => { return o.sub_leve == false && o.parent_level == null })
  let passNodes = roots.map(o => o.id)
  logger.debug(`get root nodes, start to check is loop exist. ${passNodes}`)
  passNodes.forEach(r => {
    let subtree = [r]
    while (subtree.length > 0 && passNodes.length <= tStrct.length) {
      let id = subtree.pop()
      // find nodes whose parent is the pop id
      let ns = _.filter(tStrct, (o) => { return o.parent_level == id })
      for (let i = 0; i < ns.length; i++) {
        // pass node can not in the passed nodes array
        if (passNodes.indexOf(ns[i]['id']) >= 0) {
          logger.error(`the node ${ns[i]['id']} is casing a tree loop`)
          throw new Error('tree loop exist')
        } else {
          subtree.push(ns[i]['id'])
          passNodes.push(ns[i]['id'])
        }
      }
    }
  })
  items.map(e => { e['pass'] = true; return e })
  // if go through node length is not equal to all item
  // then means some nodes is not in tree structure
  if (tStrct.length != passNodes.length) {
    let allNdes = tStrct.map(o => o.id)
    let diffNodes = _.difference(allNdes, passNodes)
    items.map(e => { if (diffNodes.indexOf(e.id) >= 0) { e['pass'] = false } return e })
    logger.debug('node doesnt pass thrpough', diffNodes)
    logger.error(`bom item node length: ${tStrct.length}, go through nodes lengh: ${passNodes.length}`)
    throw new Error('can not go through every node')
  }
  logger.debug('loop check pass.')
}

const checkDependencyVal = (data, colRules, type = null) => {
  /**
  check data dependency by db table col_definite & col_dependence
  **/
  for (let i = 0; i < colRules.length; i++) {
    let ruleKey = colRules[i].col_key
    let depKey = colRules[i].need_col_key
    logger.debug(`key check: ${ruleKey} -> ${depKey}`)
    if (ruleKey in data) {
      // only dependency value is '*' or match input val require to be verified
      if (colRules[i].col_val == '*' || data[ruleKey] == colRules[i].col_val) {

        // check if dependency key is exist
        if (!(depKey in data)) {
          logger.warn(`bom item key: ${ruleKey} required ${depKey} dosent exist`)
          throw new Error(`dependency key: ${depKey} not exist.`)
        }
        if (!(data[depKey]) || data[depKey].length == 0) {
          logger.warn(`bom item key: ${ruleKey} required ${depKey} to filled`)
          if(!type){
            throw new Error(transferErrorCode(depKey))
          }else {
            throw new Error(transferOnlineErrorCode(depKey))
            // throw new Error(`dependency key: ${depKey} can not empty.`)
          }

        }
      } else {
        logger.info(`rule val: ${colRules[i].col_val}, and req val:${data[ruleKey]}, no need for check`)
      }
    }
  }
  logger.debug('dependency check pass.')
}

const transferOnlineErrorCode = (src) => {
  let errorCode = null
  switch (src) {
    case 'part_size_l':
      errorCode = 'C000163'
      break
    case 'part_size_w':
      errorCode = 'C000164'
      break
    case 'part_size_h':
      errorCode = 'C000165'
      break
    case 'part_size_ef':
      errorCode = 'C000166'
      break
    case 'part_size_m':
      errorCode = 'C000167'
      break
    case 'part_size_l2':
      errorCode = 'C000168'
      break
    case 'part_size_w2':
      errorCode = 'C000169'
      break
    case 'thickness':
      errorCode = 'C000170'
      break
    case 'part_weight':
      errorCode = 'C000171'
      break
    default:
      break
  }
  return errorCode
}

const transferErrorCode = (src) => {
  let errorCode = null
  switch (src) {
    case 'part_size_l':
      errorCode = 'C000140'
      break
    case 'part_size_w':
      errorCode = 'C000141'
      break
    case 'part_size_h':
      errorCode = 'C000142'
      break
    case 'part_size_ef':
      errorCode = 'C000143'
      break
    case 'part_size_m':
      errorCode = 'C000144'
      break
    case 'part_size_l2':
      errorCode = 'C000145'
      break
    case 'part_size_w2':
      errorCode = 'C000146'
      break
    case 'thickness':
      errorCode = 'C000147'
      break
    case 'part_weight':
      errorCode = 'C000148'
      break
    default:
      break
  }
  return errorCode
}

const checkDropDownVal = (data, dropdownVals) => {
  const checkFields = ['func_ctgy', 'gb_assy_ctgy', 'material', 'material_spec', 'parts_ctgy_1', 'parts_ctgy_2', 'supply_type', 'odm_oem', 'initaddmodidel']
  checkFields.forEach(f => {
    if (f in data && data[f]) {
      let res = _.find(dropdownVals, (o) => {
        return o.id == data[f] && o.field_name == f
      })
      if (!res) {
        logger.warn(`field: ${f} val: ${data[f]} is not match dropdown spec`)
        throw new Error('drop down value not match')
      }
    }
  })
  logger.debug('dropdown value check pass.')
}

const getAllChildIds = (id, items) => {
  logger.debug(`try to get node: ${id}'s children`)
  if (!id) return []
  let itemIdx = [id.toString()]
  let childItems = []
  let passCounter = 0
  while (itemIdx.length > 0 && passCounter <= items.length) {
    let id = itemIdx.pop()
    passCounter += 1
    for (let i = 0; i < items.length; i++) {
      if (id == items[i].parent_level) {
        if (items[i].id != id) {
          itemIdx.push(items[i].id.toString())
          childItems.push(items[i])
        } else {
          logger.warn(`item id: ${id}, loop to itself`)
        }
      }
    }
  }
  if (passCounter > items.length) {
    logger.error(`the pass count is ${passCounter} > items length :${items.length}`)
  } else {
    logger.debug(`node: ${id}'s children`, childItems.map(o => o.id))
  }
  return childItems
}

const checkPermission = async (user, objOwner) => {
  let permission = await rbacService.getPolicyByUser(user, {
    action: 'EditAll',
    resource: 'me_bom_projects',
  })
  if (!('EditAll' in permission) || _.isEmpty(permission['EditAll']['allow'])) {
    logger.debug(`user: ${user} has no right to 'EditAll' on 'me_bom_projects'`)
    let permission = await rbacService.getPolicyByUser(user, {
      action: 'EditOwn',
      resource: 'me_bom_projects',
    })
    if (objOwner != user || !('EditOwn' in permission) || _.isEmpty(permission['EditOwn']['allow'])) {
      logger.debug(`user: ${user} has no right to 'EditOwn' on 'me_bom_projects'`)
      throw new Error('permission deny')
    } else {
      logger.debug(`user: ${user} is allowed to 'EditOwn' on 'me_bom_projects'`)
    }
  } else {
    logger.debug(`user: ${user} is allowed  to 'EditAll' on 'me_bom_projects'`)
  }
}

const checkPartList =  (checkPartListUuid, req) =>{
  if(req && req.parts_ctgy_1 && req.parts_ctgy_2){
    let findRes = _.find(checkPartListUuid, (dv) => { return dv.parts_ctgy_1 == req.parts_ctgy_1 && dv.parts_ctgy_2 == req.parts_ctgy_2})
    if(findRes){
      req.needPartList = true
      req.formate = findRes.format_key
    }else{
      req.needPartList = false
      req.formate = null
    }
  }else{
    req.needPartList = false
    req.formate = null
  }
  return req
}
const filterBomItem = (params) => {
  let {
    item,
    idx,
    viewPermission,
    isEmdmProject,
    getCostDiff,
    diffRes,
    skuNum,
    isNoNeedPartlistObj,
    isOtherFillMeRemark,
  } = params

  let isPartList = false
  let isUnEdit = false
  let version = item.version_name
  let bese64Img
  if (item.image_path != null) {
    let ext = item.image_path.split('.').pop()
    let ba64Convert = `data:image/${ext};base64,`
    let ba64Tmp = fs.readFileSync(item.image_path, 'base64')
    bese64Img = ba64Convert.concat(ba64Tmp)
  }

  // 20190521 remove qty display
  // let qty = item.extra && item.extra.sku1 ? item.extra.sku1 : item.qty

  if (item.partlistvalue != null && typeof item.partlistvalue == 'object') {
    isPartList = true
    // partListCount++
    if (_.isEmpty(item.partlistvalue)) {
      isUnEdit = true
      // unEditCount++
    }
  }
  let resBase =  meBomUtil.getBomBaseObj(item, idx, bese64Img)
  if (isEmdmProject && !getCostDiff) {// getCopyFromProject == false 抓取上一版價格資訊，須額外提供source_item_id。
    resBase.source_item_id = item.source_item_id
  }
  if (_.isEmpty(viewPermission)) {
    meBomUtil.addCostInfoInObj(item, resBase, skuNum, isNoNeedPartlistObj, isOtherFillMeRemark)

    if (isEmdmProject && getCostDiff) { // 有需要 cost_highlight
      resBase.cost_highlight = {
        'last_price_up': resBase.last_price_up === '-' ? resBase.last_price_up : null, // 當輸出'-'時預設值為'-'
        'clean_sheet_cost_up': resBase.clean_sheet_cost_up === '-' ? resBase.clean_sheet_cost_up : null, // 當輸出'-'時預設值為'-'
        'ce_assembly': null,
        'ce_cost_up': null,
      }

      if (diffRes) { // 有取得上一版資訊
        let diffItem = diffRes.bomItems.find((diff) => diff.emdm_id === item.emdm_id)// 找出上一版相對物件
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

  }
  return {
    resBase,
    version,
    isPartList,
    isUnEdit,
  }
}

const filterPartList = (params) => {
  let {
    bomID: bom_id,
    item: bomItem,
    idx,
    permission,
    isNoNeedPartlist,
    isOtherFillMeRemark,
    imagesList,
  } = params
  let result = null
  if (bomItem.partlistvalue != null && typeof bomItem.partlistvalue == 'object') {
    let resPartList = {
      item: idx + 1,
      id: bomItem.id,
      part_name: bomItem.part_name,
      ref_part_num: bomItem.reference_pn,
      part_number: bomItem.part_number,
      material_spec: bomItem.material_spec,
      material: bomItem.material,
      image_path: bomItem.partlistimage != null && !_.isEmpty(bomItem.partlistimage) ? bomItem.partlistimage.images ? bomItem.partlistimage.images : [] : [],
      update_time: moment(bomItem.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
      hasui: bomItem.hasui || false,
      formate: bomItem.partlistformate,
      source_item_id: bomItem.source_item_id,
      bom_id: bom_id,
      image: _.find(imagesList, (image) => image.ppId == bomItem.source_item_id &&
      image.objectList.length > 0 &&
      image.objectList.find(obj => obj.fileCategory != 'drawingFile')) ? true : false,
    }

    if (_.isEmpty(permission)) {
      resPartList.system_cost = meBomUtil.getCleanSheetCost(bomItem.system_cost, isNoNeedPartlist, isOtherFillMeRemark)
    }
    result = {
      type1 : bomItem.parts_ctgy_1,
      type2 : bomItem.parts_ctgy_2,
      partlistItem: resPartList,
    }
  }
  return result
}

const resetSkuQty = async (client, data, skuValue, skuKey, id) =>{
  if (skuValue == 0 || skuValue == '0') {
    logger.debug(`get item id: ${id}, childs: ${data.map(e => e.id)}`)
    await Promise.all(
      _.map(data, async (v) => {
        let obj = {}
        obj[skuKey] = 0
        await bomItemModel.updateBomItem(client, v.id, obj)
      })
    )
    // for (let i = 0; i < childs.length; i++) {
    //   let data = { qty: 0 }
    //   await bomItemModel.updateBomItem(client, childs[i].id, data)
    // }
  }
}

const createResetCostObj = (src) =>{
  let updatData = {}
  if(src){
    if (src.source_cost) {
      updatData.source_cost = null
    }
    if (src.spa_cost) {
      updatData.spa_cost = null
    }
    if (src.spa_cost_material_remark) {
      updatData.spa_cost_material_remark = null
    }
    if (src.suggestion_cost_type) {
      updatData.suggestion_cost_type = suggestionCostType.defaultType// null
    }
    if (src.suggestion_cost_remark) {
      updatData.suggestion_cost_remark = null
    }
  }
  return updatData
}

const searchProject = (src, keyword) => {
  let keywordToLowerCase = keyword.toLowerCase()
  if(src.part_name && src.part_number) {
    return src.part_name.toLowerCase().indexOf(`${keywordToLowerCase}`) != -1 || src.part_number.toLowerCase().indexOf(`${keywordToLowerCase}`) != -1
  }else if(src.part_name && !src.part_number) {
    return src.part_name.toLowerCase().indexOf(`${keywordToLowerCase}`) != -1
  }else if(!src.part_name && src.part_number) {
    return src.part_number.toLowerCase().indexOf(`${keywordToLowerCase}`) != -1
  }else {
    return false
  }
}

const checkNoNeedMaterialSpec =  (checkNoNeedMaterailSpecUuid, req) =>{
  let result = false
  if(checkNoNeedMaterailSpecUuid && checkNoNeedMaterailSpecUuid.length > 0){
    if(req){
      let chkRes = _.find(checkNoNeedMaterailSpecUuid, (dv) => {return dv.parts_ctgy_1 == req.parts_ctgy_1 && dv.parts_ctgy_2 ==  req.parts_ctgy_2})
      if(chkRes){
        result = true
        // req.noNeedMaterialSpec = true
      }else{
        // req.noNeedMaterialSpec = false
      }
    }
  }else{
    // req.noNeedMaterialSpec = false
  }
  // return req
  return result
}

const checkNoNeedDependency = (noNeedCheckDependencyValUuid, req) => {
  if(noNeedCheckDependencyValUuid && noNeedCheckDependencyValUuid.length > 0){
    if(req){
      req.noNeedCheckDependency = false
      let noNeedCheckDependencyValUuidLength = noNeedCheckDependencyValUuid.length
      for (let i = 0; i < noNeedCheckDependencyValUuidLength; i++) {
        let dv = noNeedCheckDependencyValUuid[i]
        let check_part_ctgy_1 = (dv.parts_ctgy_1 == req.parts_ctgy_1)
        let check_part_ctgy_2 = (dv.parts_ctgy_2 ==  req.parts_ctgy_2) && check_part_ctgy_1
        let check_material_spec = (dv.material_spec == req.material_spec) && check_part_ctgy_2
        let check_material = (dv.material == req.material) && check_material_spec
        if((check_material_spec && dv.material == null) || check_material){
          req.noNeedCheckDependency = true

          break
        }
      }
    }
  }else{
    req.noNeedCheckDependency = false
  }
  return req
}

const getCompleteBom = async (versionId, skuNum, assign, bomId = null) =>{
  let queryRes = await meBomUtil.getBomTableByCompleteVersionId(versionId, skuNum, assign)
  let res = []
  let existOriginalOwner = false
  if (queryRes && queryRes.bomItems && queryRes.bomItems.length > 0) {
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
    let historyList = [], imagesList = []
    if (isEmdmProject) {
      let project = await bomItemModel.bomPNameAndDesc(bomId)
      historyList = await emdmMainModel.getBomEditHistory([bomId], _.map(queryRes.bomItems, 'source_item_id'))
      imagesList = await emdmMainModel.getBomImages(project[0].project_code, project[0].source_version)
    }
    _.forEach(queryRes.bomItems, (v) => {
      v.history = _.find(historyList, (history) => history.source_item_id == v.source_item_id) ? true : false
      v.image = _.find(imagesList, (image) => image.ppId == v.source_item_id &&
        image.objectList.length > 0 &&
        image.objectList.find(obj => obj.fileCategory == 'drawingFile')) ? true : false

      if (!v.original_owner) {
        existOriginalOwner = true
        res.push(v)
      } else {
        if (v.original_owner == v.owner) {
          existOriginalOwner = true
          v.owner = v.original_owner
          res.push(v)
        }else{
          // 當選擇為all的tab時，且owner已被修改過，需調整owner為所記錄的original_owner
          if(assign.toLowerCase() == 'all'){
            v.owner = v.original_owner
            res.push(v)
          }
        }
      }
    })
    // 當選擇不為all的tab時，且owner已被修改過，將partItems設定為空
    if(!existOriginalOwner && assign.toLowerCase() != 'all'){
      queryRes.partItems = []
    }
    queryRes.bomItems = res
  }else{
    queryRes = {}
    // can not get any info, get bom basic info
    let basicInfo = await bomItemModel.getMeBomHeader(bomId, versionId)
    if(basicInfo){
      queryRes.projectName = basicInfo.project_name
      queryRes.skuDesc = basicInfo.sku_desc
      queryRes.version = 'V' + basicInfo.version
    }
    queryRes.skuCost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    queryRes.totalItems = 0
    queryRes.editAble = false
    queryRes.bomItems = []
    queryRes.partItems = []
    queryRes.totalPartlistCount = 0
    queryRes.unEditCount = 0
  }
  return queryRes
}


let getThicknessRule = async() => {
  let thicknessRule = {}
  const materialMetalThickness = await bomItemModel.getMetalThickness()
  let groupByType2 = _.groupBy(materialMetalThickness, 'category_name')
  for (let partCategory2 in groupByType2) {
    if (!groupByType2.hasOwnProperty(partCategory2)) {
      continue
    }
    let type2s = groupByType2[partCategory2]
    let options = {}
    let materials = _.groupBy(type2s, 'name')
    for (let materialKey in materials) {
      if (!materials.hasOwnProperty(materialKey)) {
        continue
      }

      let material = materials[materialKey]
      let values = []
      material.forEach((item) => {
        if(item.thickness && parseFloat(item.thickness)) {
          values.push({
            id: item.thickness,
            value: parseFloat(item.thickness),
          })
        }
      })
      options[material[0].id] = values
    }

    thicknessRule[partCategory2] = {
      'byIdName':'material_spec',
      'fieldType': 'selector',
      'hasOwnOptions': options,
    }
  }
  return thicknessRule
}

let getDefaultSupplyType = async () => {
  let supplyTypeRes = await bomItemModel.getSupplyTypeByName(DEFAULT_SUPPLY_TYPE)
  return supplyTypeRes ? supplyTypeRes.id ? supplyTypeRes.id : null : null
}
let getNoNeedConfig = async () => {
  let validateConfig = await bomItemModel.getBomItemValidConfig()
  return {
    materialSpec: _.filter(validateConfig, (v) => {return v.exception_type_key == 'no_need_material_spec'}),
    dependency: _.filter(validateConfig, (v) => {return v.exception_type_key == 'no_need_dependency_val'}),
  }
}
let getCheckRulesBase = async (productTypeName) => {
  // let dropVal = await bomItemModel.getDropDownVals('bom_item')
  let typeRes = await bomItemModel.getTypeNewDropdownValue(productTypeName)
  let assyOtherRes = await bomItemModel.getAssyAndOtherNewDropdownValue(productTypeName)
  let dropVal = meBomUtil.getNewDropdownValue(typeRes, assyOtherRes)
  let colVal = await bomItemModel.getColRules('bom_item')
  return { dropVal, colVal }
}
let getProductType = async (bomId) => {
  let productType = null
  let bomBaseInfo = await bomManagerModel.getMeBomDetailById(bomId)
  if(bomBaseInfo && bomBaseInfo.length > 0){
    productType = bomBaseInfo[0].product_type
  }
  return productType
}
let getType1And2ByRefPartNumber = async (partNumber) => {
  let result = {
    error_code : null,
  }
  let res = await cache.getCacheAsync(`REF_PART_NUM_TYPE:${partNumber}`, bomItemModel.getTypeUseRefPartNumber, partNumber)
  logger.info(`getType1And2ByRefPartNumber:${partNumber}, res:${JSON.stringify(res, 0, 2)}`)
  if (res && res.length) {
    if (res[0].part_category_1_uuid) {
      result.parts_ctgy_1 = res[0].part_category_1_uuid
    }
    if (res[0].part_category_2_uuid) {
      result.parts_ctgy_2 = res[0].part_category_2_uuid
    }
  }
  let getPartNameByRefPartNum = await bomItemModel.getPartNameByRefPartNum(partNumber)
  if(getPartNameByRefPartNum.length > 0){
    result.part_name = getPartNameByRefPartNum[0].maktx
  }
  const noPartCtgy1 = !result.hasOwnProperty('parts_ctgy_1')
  const noPartCtgy2 = !result.hasOwnProperty('parts_ctgy_2')
  const noPartName = !result.hasOwnProperty('part_name')
  if(noPartCtgy1 && noPartCtgy2 && noPartName){
    result.error_code = 'C000302'
  } else if(noPartCtgy1 && noPartCtgy2){
    result.error_code = 'C000301'
  } else if(noPartCtgy2 && noPartName){
    result.error_code = 'C000303'
  } else if(noPartCtgy2){
    result.error_code = 'C000304'
  }  else if(noPartName){
    result.error_code = 'C000305'
  }
  return result
}
/**
   * idKeyValueList Object 為檢查指定keyUper與key是否在dropdown中存在的項目
   * EX: keyUper: type2  key應為material_spec
   * @param {Object} idKeyValueList
   * @param {Array} dropDown
   * @returns {Boolean} true:存在 false:不存在
   */
let checkDropDownUperRelation = (idKeyValueList, dropDown) => {
  if (dropDown && dropDown.length) {
    let findResult = _.cloneDeep(dropDown)

    _.forEach(Object.keys(idKeyValueList), (keyValue) => {
      if (findResult) {
        findResult = findResult.filter((item) => item[keyValue] === idKeyValueList[keyValue])
      }
    })

    if(findResult.length <= 0) {
      return {
        'isExist': false,
        'message': 'No such thing exist in system',
        ...idKeyValueList,
      }
      // throw new Error(`No such thing exist in system { ${idKey} : ${value} }`)
    }
  }
  return {
    'isExist': true,
    'message': '',
  }
}
/**
 *  檢查關連的sepc是否存在
 * @param {String | NULL} parts_ctgy_1
 * @param {String | NULL} parts_ctgy_2
 * @param {String | NULL} material_spec
 * @param {String | NULL} material
 * @returns {Object}
 */
let checkRelationsByDropDown = async (parts_ctgy_1, parts_ctgy_2, material_spec, material) => {
  let dropDown = await cache.getCacheAsync('DROP_DOWN_LIST', bomItemModel.getDropDownVals) // 抓view
  const result = {
    'parts_ctgy_1': {
      'isExist': true,
    },
  }
  if (!parts_ctgy_1) {
    return result
  }
  if (parts_ctgy_2) {
    result.part_ctgy_2 = await checkPartCate2DropDownRelation(parts_ctgy_1, parts_ctgy_2)
  }
  if (material_spec) {
    let materialSpecCheckItem = {
      'part_cate2_id': parts_ctgy_2,
      'material_spec_id': material_spec,
    }
    result.material_spec = checkDropDownUperRelation(materialSpecCheckItem, dropDown)
  }
  if (material) {
    let materialCheckItem = {
      'part_cate2_id': parts_ctgy_2,
      'material_spec_id': material_spec,
      'material_id': material,
    }
    result.material = checkDropDownUperRelation(materialCheckItem, dropDown)
  }
  return result
}
let getByKey = (bomitem, keys) => {
  let result = {}
  keys.forEach((key) => {
    result[key] = bomitem.hasOwnProperty(key) ? bomitem[key] : null
  })
  return result
}
/**
 * 該bom是否不需要檢查必填參數
 * @param {Object} noNeedConfig from : cache.getCacheAsync('NO_NEED_CONFIG', getNoNeedConfig)
 * @param {Object} needPartListRes from : cache.getCacheAsync('NEED_PART_LIST', getBomItemPartlistFormate)
 * @param {Object} bomItem bomItem 單一項Me Bom Item
 * @returns {Boolean}
 */
let isNoDependency = (noNeedConfig, needPartListRes, bomItem) => {
  let checkNoNeedDependencyResult = checkNoNeedDependency(noNeedConfig.dependency, getByKey(bomItem, [
    'parts_ctgy_1',
    'parts_ctgy_2',
    'material_spec',
    'material',
  ]))
  let noNeedCheckDependency = checkNoNeedDependencyResult.noNeedCheckDependency
  const isNoNeedPartListByOdmOem = meBomUtil.noNeedPartListByOdmOem(needPartListRes, bomItem)
  if(bomItem.ref_part_num || bomItem.hasChild || isNoNeedPartListByOdmOem){
    noNeedCheckDependency = true
  }
  return noNeedCheckDependency
}
/**
 * 取得目前已經不在dropdown map中的spec名稱
 * 用於取得舊的spec名稱
 * @param {Object} baseObj 從bomItem產生的回傳用物件
 * @returns {Object}
 */
let getSpecNameReplaceInfo = async (baseObj) =>{
  let checkResultList = await checkRelationsByDropDown(baseObj.parts_ctgy_1, baseObj.parts_ctgy_2, baseObj.material_spec, baseObj.material)

  const result = {}
  const specNameList =  Object.keys(checkResultList)
  for(const specName of specNameList){
    const checkInfo = checkResultList[specName]
    const specUuid = baseObj[specName]
    if(!checkInfo.isExist && validator.isUUID(specUuid)){
      result[specName] = await getReplaceSpecName(specName, baseObj)
    }
  }
  return result
}
/**
 * 用specId取得spec名稱
 * @param {String} specName spec名稱 EX:parts_ctgy_2、material_spec...
 * @param {Object} baseObj 從bomItem產生的回傳用物件
 * @returns {String | Null} spec名稱
 */
let getReplaceSpecName = async (specName, baseObj) => {
  let replaceInfo = null
  let result = null
  switch (specName) {
    case 'parts_ctgy_2':
      replaceInfo = await bomItemModel.getPartCtgy2NameById(baseObj.parts_ctgy_1, baseObj.parts_ctgy_2)
      result = (_.isNil(replaceInfo[0])) ? result : replaceInfo[0].part_cate2_name
      break
    case 'material_spec':
      replaceInfo = await bomItemModel.getMaterialSpecNameById(baseObj.material_spec)
      result = (_.isNil(replaceInfo[0])) ? result : replaceInfo[0].material_spec_name
      break
    case 'material':
      replaceInfo = await bomItemModel.getMaterialNameById(baseObj.material)
      result = (_.isNil(replaceInfo[0])) ? result : replaceInfo[0].material_name
      break
  }
  return result
}
/**
 * 用reference part number搜尋partName並取代之
 * @param {Object} bomItem
 */
let replacePartNameByRefPartNum = async (bomItem) =>{
  let result = await bomItemModel.getPartNameByRefPartNum(bomItem.ref_part_num)
  if(result.length > 0){
    bomItem.part_name = result[0].maktx
  }
}
/**
 * 將specId替換為舊的spec名稱
 * 這是為了不讓前端顯示一個找不到的uuid
 * @param {Object} baseObj 從bomItem產生的回傳用物件
 * @param {Object} replaceInfoList 自getSpecNameReplaceInfo方法取得的物件
 */
let replaceOldSpec = (baseObj, replaceInfoList) => {
  Object.keys(replaceInfoList).forEach((specKey)=>{
    const specName = replaceInfoList[specKey]
    if(!_.isNull(specName)){
      baseObj[specKey] = specName
    }
  })
}
/**
 * check type2 DropDownRelation
 * @param {String} part_ctgy_1 type1
 * @param {String} part_ctgy_2 type2
 */
let checkPartCate2DropDownRelation = async (part_ctgy_1, part_ctgy_2) => {
  let type2InfoList = await cache.getCacheAsync('type2Relation', bomItemModel.getPartCtgy2)
  let findResult = type2InfoList.find((type2Info) => {
    return type2Info.id === part_ctgy_2 && type2Info.part_category_1_id === part_ctgy_1
  })
  let result = {
    'isExist': true,
    'message': '',
  }
  if(_.isUndefined(findResult)){
    result.isExist = false
    result.message = `No such part_ctgy_2 exist in system { part_ctgy_1: ${part_ctgy_1}, part_ctgy_2 : ${part_ctgy_2}}`
    // throw new Error(`No such thing exist in system { ${idKey} : ${value} }`)
  }
  return result
}
class BomItems {
  static async getItemEditAble(id, userID, assign) {
    if (assign != 'all') {
      let editPermission = await rbacService.getPolicyByUser(userID, {
        action: 'EditOwn',
        resource: 'me_bom_projects',
      })
      // w/o edit permission, only view
      if (_.isEmpty(editPermission)) return false
      // if user  == assign_by
      let itemEdit = await bomItemModel.bomItemsDesignee(userID, assign)
      return (itemEdit > 0) ? true : false
    } else {
      // all tag only ME TM/FM can edit
      let editPermission = await rbacService.getPolicyByUser(userID, {
        action: 'EditAll',
        resource: 'me_bom_projects',
      })
      return _.isEmpty(editPermission) ? false : true
    }
  }
  static async prepareItem (item, bomId, type = '') {
    if (item.hasOwnProperty('has_child')){
      item.hasChild = item.has_child
    }
    if (!item.hasOwnProperty('sub_leve')) {
      item.sub_leve = !!item.parent_level
    }
    /* ---- supply type ----*/
    let supplyTypeId = await cache.getCacheAsync('SUPPLY_TYPE', getDefaultSupplyType)
    item.supply_type = supplyTypeId
    /* ---- check need part list ---- */
    let productTypeInfo = await cache.getCacheAsync(`PRODUCT_TYPE_INFO_${bomId}`, bomItemModel.getProductTypeInfoByBomID, bomId)
    let productTypeId = productTypeInfo.product_type_id
    let needPartListRes = await cache.getCacheAsync(`NEED_PART_LIST_${productTypeId}`, meBomUtil.getBomItemPartlistFormate, productTypeId)
    let { needPartList, formate } = checkPartList(needPartListRes.byPartCategory, getByKey(item, [
      'parts_ctgy_1',
      'parts_ctgy_2',
    ]))
    /* ---- check no need part list ----*/
    const _isNoNeedPartlist = meBomUtil.isNoNeedPartlist(needPartListRes, item).noNeedRes
    const partlistFormate = (needPartListRes.byPartCategory || []).find(rule => rule.parts_ctgy_1 === item.parts_ctgy_1 && item.parts_ctgy_2 === rule.parts_ctgy_2)
    const hasui = (partlistFormate ? partlistFormate.hasui : null)
    if(hasui === null ? false : _isNoNeedPartlist && hasui ){
      needPartList = false
      formate = null
    }
    logger.debug('_isNoNeedPartlist:', _isNoNeedPartlist)
    item.needPartList = needPartList
    item.formate = formate
    /* ---- check no need material spec ----*/
    let noNeedConfig = await cache.getCacheAsync('NO_NEED_CONFIG', getNoNeedConfig)
    let noNeedMaterialSpec = checkNoNeedMaterialSpec(noNeedConfig.materialSpec, getByKey(item, [
      'parts_ctgy_1',
      'parts_ctgy_2',
    ]))
    if (item.hasChild) {
      noNeedMaterialSpec = true
      item.material_spec = null
    }
    item.noNeedMaterialSpec = noNeedMaterialSpec
    logger.debug('noNeedMaterialSpec:', noNeedMaterialSpec)
    /* ---- check no need material ----*/
    let noNeedMaterial = true
    if (item.hasChild) {
      noNeedMaterial = true
      item.material = null
    }
    logger.debug('noNeedMaterial:', noNeedMaterial)
    /* ---- check no need dependency ----*/
    // move to function : isNoDependency
    /* let checkNoNeedDependencyResult = checkNoNeedDependency(noNeedConfig.dependency, getByKey(item, [
      'parts_ctgy_1',
      'parts_ctgy_2',
      'material_spec',
      'material',
    ]))
    let noNeedCheckDependency = checkNoNeedDependencyResult.noNeedCheckDependency
    if(item.ref_part_num || item.hasChild || noNeedPartListByOdmOem(needPartListRes, item)){
      noNeedCheckDependency = true
    } */
    const noNeedCheckDependency = isNoDependency(noNeedConfig, needPartListRes, item)
    item.noNeedCheckDependency = noNeedCheckDependency
    logger.debug('noNeedCheckDependency:', noNeedCheckDependency)
    /* ---- check has reference part number ----*/
    if (item.ref_part_num) {
      item.part_number = item.ref_part_num
      await replacePartNameByRefPartNum(item)
    }
    /* ---- check value currect ----*/
    item.createBom_productType = await cache.getCacheAsync(`PRODUCT_TYPE_NAME_${bomId}`, getProductType, bomId)
    item.product_type_id = productTypeId // partlist 計算用
    item.product_type_name = item.createBom_productType // partlist 計算用
    let errorCode = ''
    let baseRule = await cache.getCacheAsync(`BASE_RULE_${item.createBom_productType}`, getCheckRulesBase, item.createBom_productType)
    // filter 優先度 material > material_spec > parts_ctgy_2
    let filterRule = []
    filterRule = _.filter(baseRule.colVal, (dv) => {return dv.col_val == item.material})
    if (!filterRule.length) {
      filterRule = _.filter(baseRule.colVal, (dv) => {return dv.col_val == item.material_spec})
    }
    if (!filterRule.length) {
      filterRule = _.filter(baseRule.colVal, (dv) => {return dv.col_val == item.parts_ctgy_2})
    }
    try {
      // 20190729 hot fix for prd can upload
      // bomItemValid.bomItemValidator(v)
      if (type === ONLINE_EDIT) {
        bomItemValidator.bomItemValidator(item)
      } else {
        bomItemValidator.bomItemUplodaValidator(item)
        /* ---- verify is currect relation ----*/
        let checkReusltList = await checkRelationsByDropDown(item.parts_ctgy_1, item.parts_ctgy_2, item.material_spec, item.material)
        Object.keys(checkReusltList).forEach((specName) => {
          let checkInfo = checkReusltList[specName]
          if(!checkInfo.isExist){
            throw new Error(checkInfo.message)
          }
        })
      }
      // check depend value
      // 20190826 根據spec 提供 part category I、part category II無需填寫Material Spec.
      // https://app.asana.com/0/1132853215335560/1133221324859120/f
      // material Spec填寫「Other_Fill_ME_Remark」，則Material及之後的欄位（L W H…etc）無需填寫)
      if (!noNeedCheckDependency) {
        checkDependencyVal(item, filterRule, type)
      }
      // check drop value
      checkDropDownVal(item, baseRule.dropVal)
      item.pass = true
    } catch (err) {
      if (type === ONLINE_EDIT){
        throw err
      }
      item.pass = false
      errorCode = err.message
    }
    return {
      item,
      errorCode,
    }
  }
  static async updatePartList (item, id, productTypeId, productTypeName) {
    const partlistItem = await this.checkUpdatePartListNoUi(item, productTypeId)// getByHasUI(false, req.parts_ctgy_2, req.parts_ctgy_1);// moved
    if (partlistItem && partlistItem.needPartList) {
      await partListService.calPriceByAddOrUpdateMeBom(partlistItem.formate, item, id, productTypeId, productTypeName)
    }
  }
  static async checkUpdatePartListNoUi (item, productTypeId) {
    let partListNoUi = await cache.getCacheAsync(`PART_NO_UI_${productTypeId}`, bomItemModel.getBomItemPartlistFormateNoUi, productTypeId)
    return checkPartList(partListNoUi, getByKey(item, [
      'parts_ctgy_1',
      'parts_ctgy_2',
    ]))
  }
}

/**
 *
 * @param {Int} bomID bomID
 * @param {String} userID call api 的user id
 * @param {String} assign all or Designee id
 * @param {String} skuNum sku0~sku5
 * @param {Bool} getCostDiff 是有需要 cost_highlight
 */

let getBomItem = async (bomID, userID, assign, skuNum) => {
  let checkBomProjectExist = await bomItemModel.checkBomProjectExist(bomID)
  if (!checkBomProjectExist) {
    throwApiError('bom id not found', errorCode.NOT_FOUND)
  }
  let isEmdmProject = await emdmBomUtil.isEmdmProject(bomID)

  let viewPermission = await rbacService.getPolicyByUser(userID, {
    action: 'View',
    resource: 'me_bom_projects.bom_item.source_cost',
  })
  let isExprotPrice = _.isEmpty(viewPermission)

  // if viewPermission is not empty == user is a RDME, then check RDME assigned
  if (!_.isEmpty(viewPermission)) {
    let permission = await bomItemModel.bomRDMEPermission(bomID, userID)
    if (!permission)
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }

  if (isEmdmProject && assign.toLowerCase() != 'all') {
    throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }
  let editAble = await BomItems.getItemEditAble(bomID, userID, assign)
  /* // let unmodified = await bomItemModel.getPartListUnmodified(id, assign)
  let result = await bomItemModel.getBomTable(bomID, assign)

  // get upload record
  let uploadFlag = await bomItemModel.getUploadFileRecord(bomID)
  uploadFlag = !uploadFlag

  // root
  let root = _.chain(result.rows)
    .filter((o) => { return o.level == 'DC/65' || (o.level == '2' && !o.sub_level) })
    .sortBy((s) => s.order_id)
    .value()

  let recordCount = {}
  _.chain(result.rows)
    .filter((o) => { return o.sub_level && o.parent_level != null })
    .groupBy((o) => { return o.level })
    .sort((s) => s.order_id)
    .map((value) => {
      value.map(v => {
        let idx = root.findIndex(r => v.parent_level == r.id)
        let count = isNaN(recordCount[v.parent_level]) ? 0 : recordCount[v.parent_level] + 1
        root.splice(idx + 1 + count, 0, v)
        recordCount[v.parent_level] = count
      })
    })
    .value()

  // compute clean sheet cost
  let skuSum = null
  let tmpRoot = _.cloneDeep(root)

  if (assign.toLowerCase() == 'all') {
    // 取得計算組工費參數
    let laboragePara = await meBomCost.getLaborageParamater()
    meBomCost.computeLaborage(root, skuNum, laboragePara)
    // skuSum = meBomCost.computeSkuSumCost(root)
    skuSum = meBomCost.computeAllSkuSumCost(tmpRoot, laboragePara)
  }

  let unEditCount = 0
  let partListCount = 0
  let version = 'V0.0'
  let productTypeInfo = await cache.getCacheAsync(`PRODUCT_TYPE_INFO_${bomID}`, bomItemModel.getProductTypeInfoByBomID, bomID)
  let productTypeId = productTypeInfo.product_type_id
  let needPartListRes = await cache.getCacheAsync(`NEED_PART_LIST_${productTypeId}`, meBomUtil.getBomItemPartlistFormate, productTypeId)
  let diffProjectID = null // 要比較的bom_id
  let diffRes = null // 要比較的bomProject內容
  if (isEmdmProject && getCostDiff) { // getCostDiff == true 才能取diff 防止無窮循環
    diffProjectID = await emdmMainModel.getCopyFromProjectID(bomID) // 根據複製紀錄取bomID
    if (diffProjectID) {
      // diffRes = await getBomItem(diffProjectID, userID, assign, skuNum, false)// 取上一版 bom 內容
      diffRes = await meBomUtil.getBomCurrentBomTable(diffProjectID, assign, skuNum)
    }
  }
  let bomItemsPart = []
  let bomItems = []
  let historyList = []
  let imagesList = []
  if (isEmdmProject) {
    historyList = await emdmMainModel.getBomEditHistory([bomID], _.map(root, 'source_item_id'))
    imagesList = await emdmMainModel.getBomImages(project[0].project_code, project[0].source_version)
  }

  _.forEach(root, (item, idx) => {
    let isNoNeedPartlistObj = meBomUtil.isNoNeedPartlist(needPartListRes, meBomUtil.formatCheckNoNeedPartlistObj(item))
    const isNoNeedPartlist = isNoNeedPartlistObj.noNeedRes
    const isOtherFillMeRemark = meBomUtil.isOtherFillMeRemark(needPartListRes, meBomUtil.formatCheckNoNeedPartlistObj(item))
    let filterBomItemRes = filterBomItem({
      item,
      idx,
      viewPermission,
      isEmdmProject,
      getCostDiff,
      diffRes,
      skuNum,
      isNoNeedPartlistObj,
      isOtherFillMeRemark,
    })
    version = filterBomItemRes.version
    if (filterBomItemRes.isPartList) {
      partListCount++
    }
    if (filterBomItemRes.isUnEdit) {
      unEditCount++
    }

    filterBomItemRes.resBase['history'] = _.find(historyList, (history) => history.source_item_id == filterBomItemRes.resBase.source_item_id) ? true : false
    filterBomItemRes.resBase['image'] = _.find(imagesList, (image) => image.ppId == filterBomItemRes.resBase.source_item_id &&
      image.objectList.length > 0 &&
      image.objectList.find(obj => obj.fileCategory == 'drawingFile')) ? true : false

    bomItems.push(filterBomItemRes.resBase)

    let filterPartListRes = filterPartList({
      bomID,
      item,
      idx,
      permission : viewPermission,
      isNoNeedPartlist,
      isOtherFillMeRemark,
      imagesList,
    })
    if (filterPartListRes) {
      let findSamePart = bomItemsPart.find((findItem) => findItem.type1 === filterPartListRes.type1 && findItem.type2 === filterPartListRes.type2)
      if (findSamePart) {
        findSamePart.partlist.push(filterPartListRes.partlistItem)
      } else {
        bomItemsPart.push({
          type1: filterPartListRes.type1,
          type2: filterPartListRes.type2,
          partlist: [filterPartListRes.partlistItem],
        })
      }
    }
  })
  bomItemsPart.forEach((item) => {
    item.partlist = _.orderBy(item.partlist, ['order_id', 'create_time'], ['ASC', 'ASC'])
  })
  bomItemsPart = _.orderBy(bomItemsPart, ['type1', 'type2'], ['asc', 'asc'])

  // if isRDME == empty, user != RDME so can view sku_cost

    let sku_cost = null
  if (_.isEmpty(viewPermission)) {
    if(skuSum != null && skuSum.length > 0){
      sku_cost = [{ sku0: skuSum[0] }, { sku1: skuSum[1] }, { sku2: skuSum[2] }, { sku3: skuSum[3] },
        { sku4: skuSum[4] }, { sku5: skuSum[5] }]
    }else{
      sku_cost = [{ sku0: null }, { sku1: null }, { sku2: null }, { sku3: null }, { sku4: null }, { sku5: null }]
    }
  } */

  let project = await bomItemModel.bomPNameAndDesc(bomID)
  let diffBomItems = []
  let imagesList = []
  if (isEmdmProject) {
    imagesList = await emdmMainModel.getBomImages(project[0].project_code, project[0].source_version)
    let diffProjectID = await emdmMainModel.getCopyFromProjectID(bomID) // 根據複製紀錄取bomID
    if (diffProjectID) {
      let checkDiffBomProjectExist = await bomItemModel.checkBomProjectExist(diffProjectID)
      if (checkDiffBomProjectExist) {
        let diffRes = await meBomUtil.getBomCurrentBomTable(diffProjectID, assign, skuNum, null, isExprotPrice)
        if (diffRes && diffRes.hasOwnProperty('bomItems')){
          diffBomItems = diffRes.bomItems
        }
      }
    }
  }
  let response = await meBomUtil.getBomCurrentBomTable(bomID, assign, skuNum, null, isExprotPrice, { isEmdmProject, diffBomItems, imagesList })

  /* response.bomItems.forEach((item) => {
    if (item.partInfo) {
      delete item.partInfo.isRefPartNumber
      delete item.partInfo.noFormate
      delete item.partInfo.noNeedByOdmOem
      delete item.partInfo.haschild
    }
  }) */
  return {
    editAble,
    projectName: project.length > 0 ? project[0].project_name : null,
    emdmVersion: (project.length > 0 && project[0].source_version != null && project[0].create_time != null) ? `${project[0].source_version}_${moment(project[0].create_time).format('YYYYMMDDHHmm')}` : '--',
    productType: project.length > 0 ? project[0].product_type : null,
    projectSource: project.length > 0 ? project[0].project_source : null,
    site: project.length > 0 ? project[0].site : null,
    totalItems: response.totalItems, // result.rowCount,
    skuCost: response.skuCost, // sku_cost,
    skuDesc: project.length > 0 ? project[0].sku_desc : null,
    bomItems: response.bomItems,
    partItems: response.partItems, // bomItemsPart,
    uploadFlag: response.uploadFlag, // ,
    totalPartlistCount: response.totalPartlistCount, // partListCount,
    unEditCount: response.unEditCount, // unEditCount,
    version: response.version, // version,
  }
}
const getPartlistLawData = async (bomId, partlistFormates, versionId) => {
  const bomProjectInfo = await bomItemModel.getBomInfoByCSExport(bomId, versionId)
  if (!bomProjectInfo) {
    throw new Error('ME bom project not found')
  }


  let productTypeSetting =  cleansheetExportSetting[bomProjectInfo.product_type]
  if (!productTypeSetting) {
    logger.info(`Product type ${bomProjectInfo.product_type} export is not implemented, use default setting`)
    productTypeSetting = cleansheetExportSetting.default
    // throw new Error(`Product type ${bomProjectInfo.product_type} export is not implemented`)
  }

  if (!partlistFormates.every(partlistFormate => productTypeSetting[partlistFormate])) {
    throw new Error('Cleansheet export setting not found')
  }

  let data = []
  if (versionId === 'CURRENT') {
    // 最新版本的Bom Project
    data =  await bomItemModel.getPartlistExportData(bomId, partlistFormates)
  } else {
    // x.0 版本的Bom Project
    data =  await bomItemModel.getPartlistExportDataCompleteVersion(bomId, partlistFormates, versionId)
  }

  return { productTypeSetting, data, bomProjectInfo }
}
// const exportType = ['cleansheet', 'partlist', 'quotation']
const getPartlistFormattedData = async (sortedData, partlistFormates, productTypeSetting, bomProjectInfo) =>{
  const partlist = Object.keys(sortedData).reduce((acc, key) => {
    const item = sortedData[key]
    // console.log(JSON.stringify(item[0]))
    const value = {}
    if (productTypeSetting[key].cleansheet && productTypeSetting[key].cleansheet.length) {
      value.cleansheet = [
        ...getBaseInfo(item),
        ...getCleansheetData(item, productTypeSetting[key].cleansheet),
      ]
    }
    if (productTypeSetting[key].quotation && productTypeSetting[key].quotation.length) {
      value.quotation = [
        ...getBaseInfo(item),
        ...getQuotationData(item, productTypeSetting[key].quotation),
      ]
    }

    if (productTypeSetting[key].partlist && productTypeSetting[key].partlist.length) {
      value.partlist = [
        ...getBaseInfo(item),
        ...getPartListData(item, productTypeSetting[key].partlist),
      ]
    }

    /*
      exportType.forEach((etype)=>{
        if (productTypeSetting[key][etype] && productTypeSetting[key][etype].length) {
          value[etype] = [
            ...getBaseInfo(item, productTypeSetting),
            ...getPartListData(item, productTypeSetting[key][etype]),
          ]
        }
      })
      */
    return {
      ...acc,
      [key]: value,
    }
  }, partlistFormates.reduce((acc, partlistFormate) => {
  // console.log('acc>>>',acc)
  // console.log('partlistFormat>>>',partlistFormate)

    return { ...acc, [partlistFormate]: [] }
  }, []))

  // console.log(dfutils.inspect(partlist))
  // console.log(JSON.stringify(partlist['housing-metal'].quotation))

  // console.log(JSON.stringify(partlist.housing-metal))
  return {
    projectInfo: {
      projectName: bomProjectInfo.project_name,
      projectCode: bomProjectInfo.project_code,
      site: bomProjectInfo.site,
      productType: bomProjectInfo.product_type,
      productSpec: bomProjectInfo.product_spec,
      stage: bomProjectInfo.stage_name,
      customer: bomProjectInfo.customer,
    },
    partlist,
  }
  function getBaseInfo(items) {
    const { bomItemInfo } = cleansheetExportSetting
    return [
      {
        ...bomItemInfo.partname,
        value: items.map(item => [item.part_name]),
      },
      {
        ...bomItemInfo.partnumber,
        value: items.map(item => [item.part_number]),
      },
      {
        ...bomItemInfo.currency,
        value: items.map(() => ['USD']),
      },
      {
        ...bomItemInfo.sku,
        value: items.map(item => [getSkuString(item.sku0, item.sku1, item.sku2, item.sku3, item.sku4, item.sku5)]),
      },
      {
        ...bomItemInfo.partCategory1,
        value: items.map(item => [item.parts_ctgy_1]),
      },
      {
        ...bomItemInfo.partCategory2,
        value: items.map(item => [item.parts_ctgy_2]),
      },
    ]
  }

  function getSkuString(sku0, sku1, sku2, sku3, sku4, sku5) {
    return [sku0, sku1, sku2, sku3, sku4, sku5]
      .map((sku, index) => +sku > 0 ? `SKU${index}` : null)
      .filter(skuName => skuName !== null)
      .join(', ')
  }

  function getKeyValue(searchKeys, items, col) {
    let res = {}
    Object.keys(searchKeys).forEach(k=>{
      let values = []
      if (col.parent || col.groupIdPath) {
        values = items.map(item => (
          _.get(item, col.groupIdPath, [])
            .filter(val => val.layoutKey === col.parentKey || !val.layoutKey)
            // .filter(val => val.layoutKey === col.label || !val.layoutKey)
            .map(val => col.parent ? getDataWithMapper(item, `${col.parent}-${val.uuid}.${col[k]}`, col.mapper) : getDataWithMapper(val, col[k], col.mapper))
        ))
      } else {
        values = items.map(item => [getDataWithMapper(item, col[k], col.mapper)])
      }
      res = {
        ...res,
        ...col,
        [searchKeys[k]]: values,
      }
    })
    return res
  }
  function getQuotationData(items, cols = []) {
    let cleansheetData = cols.map(col => {
      // 非最底層
      if (Array.isArray(col.contents) && col.contents.length) {
        return {
          ...getKeyValue({ existKey: 'existKey' }, items, col),
          forceHidden: col.forceHidden,
          contents: getQuotationData(items, col.contents),
        }
      }

      // 最底層
      return {
        ...getKeyValue({ byKey: 'value', existKey: 'existKey' }, items, col),
        forceHidden: col.forceHidden,
      }
    })
    return cleansheetData.filter(x => !!x)
  }

  function getCleansheetData(items, cols = []) {
    let cleansheetData = cols.map(col => {
      let flag = false
      const { existKey, forceHidden = true } = col
      // 如果同時有existKey又有forceHidden的話，以existKey為主
      if(existKey) {
        items.forEach((item) => {
          if (_.get(item, existKey, false)) {
            flag = true
          }
        })
      } else if (!forceHidden) {
        flag = true
      } else {
        flag = true
      }

      if (!flag) return null
      if (Array.isArray(col.contents) && col.contents.length) {
        return {
          ...col,
          contents: getCleansheetData(items, col.contents),
        }
      }

      if (col.parent || col.groupIdPath) {
        const values = items.map(item => (
          _.get(item, col.groupIdPath, [])
            .filter(val => val.layoutKey === col.label || !val.layoutKey)
            .map(val => col.parent ? getDataWithMapper(item, `${col.parent}-${val.uuid}.${col.byKey}`, col.mapper) : getDataWithMapper(val, col.byKey, col.mapper))
        ))

        return {
          ...col,
          value: values,
        }
      } else {
        return {
          ...col,
          value: items.map(item => [getDataWithMapper(item, col.byKey, col.mapper)]),
        }
      }
    })
    return cleansheetData.filter(x => !!x)
  }
  function getPartListData(items, cols = []) {
    let partListData = cols.map(col => {
      let flag = false
      const { existKey, forceHidden = true } = col
      // 如果同時有existKey又有forceHidden的話，以existKey為主
      if(existKey) {
        items.forEach((item) => {
          if (_.get(item, existKey, false)) {
            flag = true
          }
        })
      } else if (!forceHidden) {
        flag = true
      } else {
        flag = true
      }

      if (!flag) return null
      if (Array.isArray(col.contents) && col.contents.length) {
        return {
          ...col,
          contents: getPartListData(items, col.contents),
        }
      }

      if (col.groupIdPath) {
        const values = items.map(item => (
          _.get(item, col.groupIdPath, [])
            .filter(val => val.layoutKey === col.parentKey || !val.layoutKey)
            .map(val => getDataWithMapper(val, col.byKey, col.mapper))
        ))


        return {
          ...col,
          value: values,
        }
      } else {
        return {
          ...col,
          value: items.map(item => [col.byFunc ? getDataWithFunc(item, col.byFunc, col.params) : getDataWithMapper(item, col.byKey, col.mapper)]),
        }
      }
    })
    return partListData.filter(x => !!x)
  }

  function getDataWithMapper(data, byKey, mapper) {
    return mapper ? mapper[_.get(data, byKey, null)] || mapper._default : _.get(data, byKey, null)
  }

  function getDataWithFunc(data, byFunc, params) {
    const parameters = params.map(p => _.get(data, p, 0))

    // eslint-disable-next-line no-eval
    return byFunc(...parameters)
  }

}

const getLastVersionById = async function(bomId){
  let lastVersion = await bomItemModel.getLastVersionById(bomId)
  return lastVersion
}

const getBomProjectInfoByBomId = async function(bomId){
  let lastVersion = await bomItemModel.getBomProjectInfoByBomId(bomId)
  return lastVersion
}
const updateBomPermission = async (userId) => {
  let cePermission = await rbacService.getPolicyByUser(userId, {
    action: 'EditAll',
    resource: 'me_bom_projects.spa_sourcer_suggestion',
  })
  let isCePermissionDeney = _.isEmpty(cePermission)

  let sourcerPermission = await rbacService.getPolicyByUser(userId, {
    action: 'View',
    resource: 'me_bom_projects.bom_item.source_cost',
  })
  let isSourcerPermissionDeney = Object.keys(sourcerPermission).length !== 0

  let role = isCePermissionDeney && !isSourcerPermissionDeney ? 'sourcer' : 'CE'
  return {
    isCePermissionDeney, isSourcerPermissionDeney, role,
  }
}
const updateSourcerCostItem = async (client, bomId, fromCurrency, uploadBomItemList, userID, role, isUpdateNull = false) => {
  let history = []
  let is_emdm_project = await emdmBomUtil.isEmdmProject(bomId)
  let bom_version = await bomItemModel.getItemVersionByBomId(bomId)
  let bom_items = await bomItemModel.getItemByMultiId(_.map(uploadBomItemList, 'bom_item_id'))
  let edit_type = await bomItemModel.getBomEditType('bom_item_gerenal', ['sourcer'])

  const assembleSourcerCostHistory = (bom_id, label, value, source_item_id, user_id) => {
    history.push({
      bom_id: bom_id.bom_id,
      field_type_id: _.find(edit_type, (type) => type.label == label).id,
      // field_type_name: _.find(edit_type, (type) => type.label == label).label_name,
      value,
      bom_version_id: bom_id.id,
      role,
      user_id,
      action: 'EditSourcerCost',
      source_item_id: source_item_id,
    })
  }

  let exchangeRate = 1
  if (fromCurrency !== 'USD') {
    const exchangeRateDate = await getExchangeRateDate(bomId, 'CURRENT')
    const exchangeRateInfo = await spendingModel.getCurrencys(fromCurrency, 'USD', moment(exchangeRateDate).format('YYYYMMDD'))
    exchangeRate = exchangeRateInfo[0].exange_rate
  }
  uploadBomItemList.forEach((item) => {
    let ori_item = _.find(bom_items, (i) => i.id == item.bom_item_id)
    for(let key of sourcerExchangeColumnList){
      let priceKey = key[0]
      let oriKey = key[1]
      let floatKey = key[2]
      let schemaKey = key[3]
      if (!item.hasOwnProperty(priceKey)) {
        continue
      }
      if (!_.isNil(item[priceKey])) {
        item[oriKey] = item[priceKey]
        let price = formatFloat(item[priceKey] * exchangeRate, meFloatPoint.get(floatKey))
        item[priceKey] = price

        if (is_emdm_project && ori_item[schemaKey] != item[priceKey]) {
          assembleSourcerCostHistory(bom_version[0], priceKey, price, ori_item.source_item_id, userID)
        }

      } else if (isUpdateNull && _.isNull(item[priceKey])) {
        item[oriKey] = null
        item[priceKey] = null
      }
    }
    if (is_emdm_project && item.hasOwnProperty('sourcer_remark') && item.sourcer_remark != ori_item.sourcer_remark) {
      assembleSourcerCostHistory(bom_version[0], 'sourcer_remark', item.sourcer_remark, ori_item.source_item_id, userID)
    }
  })

  await bomItemModel.modifyBomItemBySourcerCostExcel(client, uploadBomItemList, isUpdateNull)
  return history
}

module.exports = {
  reCalPartlistPrice,
  ONLINE_EDIT,
  BomItems,
  checkTreeCircle,
  checkDropDownVal,
  getCheckRulesBase,
  getType1And2ByRefPartNumber,
  getBomItem,
  getCompleteBom,
  createBomItem: dbHelper.atomic(async (client, user, data) => {
    try {
      let { sub_leve, level, parent_level, bom_id, formate, owner, needPartList /* , bomDesigneeID, parts_ctgy1_name, parts_ctgy2_name*/ } = data
      let { userID } = user
      let itemParent = null
      logger.debug(`user: ${userID} try to create new item`, data)

      /**
      check if req drop down value match the filed
      **/
      // let dropdownVals = await bomItemModel.getDropDownVals('bom_item')
      let productTypeName = await getProductType(bom_id)
      let typeRes = await bomItemModel.getTypeNewDropdownValue(productTypeName)
      let assyOtherRes = await bomItemModel.getAssyAndOtherNewDropdownValue(productTypeName)
      let dropdownVals = meBomUtil.getNewDropdownValue(typeRes, assyOtherRes)
      checkDropDownVal(data, dropdownVals)

      /**
       check if item level dependency is correct or not
       **/
      if (sub_leve) {
        itemParent = await bomItemModel.getItemById(parent_level)
        if (itemParent) {
          let pIdx = BOM_ITEM_LEVEL.indexOf(itemParent.level)
          let lIdx = BOM_ITEM_LEVEL.indexOf(level)

          if (lIdx - pIdx != 1) {
            logger.warn(`parent${itemParent.id} level is ${pIdx}, new item level is ${lIdx}, not match.`)
            throw new Error('item dependency incorrect.')
          }
        } else {
          throw new Error('enable sub_leve, but no parent.')
        }

      } else if (level) {
        if (['DC/65', '2'].indexOf(level) < 0) {
          logger.warn('only level == DC/65 or 2, the sub_leve can be enable.')
          throw new Error('item dependency incorrect.')
        }
        // remove parent level if sub_leve is false
        data.parent_level = null
      } else {
        logger.error('no level, no sub_level enable')
        throw new Error('both level and sub_level empty')
      }

      /**
      get designee by user id
      20190730 BOM Item 新增及編輯 BOM Item 時，可以指派 Item Owner
      **/
      logger.debug(`check designee: ${owner} on bom id: ${bom_id}`)
      let checkDesignee = await bomItemModel.checkDesigneeExist(owner, bom_id)
      if (!checkDesignee) {
        logger.warn(`can not find match designee: ${owner} for bom: ${bom_id}`)
        throw new Error('designee match error')
      }

      /**
      get bom item version object
      **/
      let version = await bomItemModel.getItemVersionByBomId(bom_id)
      let verId = version[0].id
      data.version_id = verId

      /*
        when new level all check is pass, ther new parent_level must reset spa_cost, sourcer_cost, suggestion_cost_type, suggestion_cost_remark
      */
      if (itemParent) {
        let updatData = createResetCostObj(itemParent)
        logger.debug('======itemParent========>', updatData)
        if (!_.isEmpty(updatData)) {
          await bomItemModel.updateBomItem(client, parent_level, updatData)
        }
      }

      /**
      find max order id
      **/
      let orderIdRes = await bomItemModel.getBomItemOrderId(verId)
      if(orderIdRes){
        let orderId = orderIdRes.orderid
        data.order_id = Number(orderId) + 1
      }

      /**
       create & update bom
      **/
      data.rfq_pn = `${makeShortId()}${new Date().getTime()}`
      // let filterData = new dbHelper.filterKeys(data).exclude(['bom_id', 'bomDesigneeID', 'needPartList', 'parts_ctgy1_name', 'parts_ctgy2_name', 'formate'])
      // get last price
      await meBomCost.getMaterialLastPriceByBomId([data], bom_id)
      // filterData = new dbHelper.filterKeys(data).exclude(['originCurrency', 'origin_last_price', 'exchangeRate'])
      if (!data.hasOwnProperty('suggestion_cost_type')) {
        data.suggestion_cost_type = suggestionCostType.defaultType
      }
      let createRes = await bomItemModel.createBomItem(client, data)

      /**
       create partlist
      **/
      let { id } = createRes
      if(needPartList) await bomPartListModel.createBomPartlist(client, id, formate)

      // Update versionId
      // if new version uuid diff with old version uuid update all bom item version_id
      // 20190904 add condition
      let isNeedUpdateVersion  = await meBomUtil.checkIsNeedUpdateVersion(bom_id)
      if(isNeedUpdateVersion){
        let getUUid = await bomVersionModel.getNextVersionUuid(client, bom_id, 'EDIT')
        if (getUUid && getUUid.isNewRecord) {
          // new uuid update bom item
          await bomVersionModel.updateBomItemVersionId(client, getUUid.old_version_id, getUUid.new_version_id)
          await reCalPartlistPrice(client, bom_id, true, [id])
        }
      }

      return createRes

    } catch (err) {
      logger.warn('failed to create bom item', err)
      logger.warn(`request data: ${JSON.stringify(data)}`)
      throw err
      // throw new Error('failed to create me bom item.')
    }
  }),

  updateBomItem: dbHelper.atomic(async (client, user, data) => {
    let {
      id,
      level,
      parent_level,
      sub_leve,
      bom_id,
      parts_ctgy_2,
      parts_ctgy_1,
      needPartList,
      formate,
      sku0,
      sku1,
      sku2,
      sku3,
      sku4,
      sku5,
      owner,
      // parts_ctgy1_name,
      // parts_ctgy2_name,
    } = data
    let { userID } = user
    logger.debug(`update item id: ${id}`)
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bom_id)
    if (isEmdmProject) throw new Error('can not edit emdm bom item')
    let prevItem = await bomItemModel.getItemById(id)
    if (!prevItem) throw new Error('can not find bom item')

    let version = await bomItemModel.getItemVersionByBomId(bom_id)
    if (version.length == 0) {
      throw new Error(`can not get version by id: ${bom_id}`)
    }
    let verId = version[0].id
    let items = await bomItemModel.getItemsByVerId(client, verId)
    let childs = getAllChildIds(id, items)

    /**
    check permission
    **/
    let designeeId = prevItem.owner
    let designee = await bomItemModel.getDesigneeById(designeeId)
    await checkPermission(userID, designee.user_id)

    /**
    check if req drop down value match the filed
    **/
    // let dropdownVals = await bomItemModel.getDropDownVals('bom_item')
    let productTypeName = await getProductType(bom_id)
    let typeRes = await bomItemModel.getTypeNewDropdownValue(productTypeName)
    let assyOtherRes = await bomItemModel.getAssyAndOtherNewDropdownValue(productTypeName)
    let dropdownVals = meBomUtil.getNewDropdownValue(typeRes, assyOtherRes)
    checkDropDownVal(data, dropdownVals)

    /**
    update bom item path on the tree
    **/
    let newItemParent = null
    if (sub_leve) {
      newItemParent = await bomItemModel.getItemById(parent_level)
      let chIds = childs.map(e => e.id)
      if (newItemParent) {
        // check if new parent is it's children
        if (chIds.indexOf(newItemParent.id) >= 0) {
          logger.error(`new parent ${newItemParent.id} in its child ${chIds}`)
          throw new Error('parent level can not be its children')
        }
        if (level != prevItem.level || parent_level != prevItem.parent_level) {

          let pIdx = BOM_ITEM_LEVEL.indexOf(newItemParent.level)
          let lIdx = BOM_ITEM_LEVEL.indexOf(level)
          logger.debug(`item's ${id} update to parent (level): ${newItemParent.level}`)
          if (lIdx - pIdx != 1) {
            logger.warn(`parent: ${newItemParent.id} level is ${pIdx}, new item level is ${lIdx}, not match.`)
            throw new Error('item dependency incorrect.')
          } else {

            // await bomItemModel.moveItemTree(client, bom_id, prevItem.path, newItemParent.path)
            logger.debug(`update level from ${prevItem.level} to new level ${level}`)
            logger.debug(`update parent from ${prevItem.parent_level} to new level ${parent_level}`)
          }

        } else {
          logger.debug('level and parent_level remain unchanged.')
        }
      } else {
        throw new Error('enable sub_leve, but no parent.')
      }
    } else if (level) {
      if (['DC/65', '2'].indexOf(level) < 0) {
        logger.warn(`only level == DC/65 or 2, req level: ${level}, the sub_leve can be disable.`)
        throw new Error('item dependency incorrect.')
      }
      // remove parent level if sub_leve is false
      data.parent_level = null
    } else {
      logger.debug('no level, no sub_leve enable')
    }

    /*
    when new level all check is pass, ther new parent_level must reset spa_cost, sourcer_cost, suggestion_cost_type, suggestion_cost_remark
    */
    if (newItemParent) {
      let updatData = createResetCostObj(newItemParent)
      if (!_.isEmpty(updatData)) {
        await bomItemModel.updateBomItem(client, parent_level, updatData)
      }
    }

    /**
    when the level is changed, update all child's level
    **/
    if (level && level != prevItem.level) {
      let nowLvIdx = BOM_ITEM_LEVEL.indexOf(level)
      let prevLvIdx = BOM_ITEM_LEVEL.indexOf(prevItem.level)
      let levelGap = nowLvIdx - prevLvIdx
      logger.debug(`update item level gap ${levelGap}`)
      for (let i = 0; i < childs.length; i++) {
        let c = childs[i]
        let clIdx = BOM_ITEM_LEVEL.indexOf(c.level)
        clIdx += levelGap
        let newLv = BOM_ITEM_LEVEL[clIdx]
        if (!newLv) {
          logger.warn(`item child id: ${c.id},level: ${c.level}, when update level ${clIdx} is overflow`)
          throw new Error('child level overflow')
        }
        logger.debug(`newLv: ${newLv}`)
        let data = { level: newLv }
        await bomItemModel.updateBomItem(client, c.id, data)
        logger.debug(`update item id: ${c.id} from ${c.level} level to ${BOM_ITEM_LEVEL[clIdx]}`)
      }
    }

    /**
    20190730 若設定的 BOM Item 為母階料號，則該母階料號下的所有子階料，都將自動套用設定的 Owner
    **/
    if (owner && owner != prevItem.owner) {
      for (let i = 0; i < childs.length; i++) {
        let c = childs[i]
        let data = { owner: owner }
        await bomItemModel.updateBomItem(client, c.id, data)
        logger.debug(`update item id: ${c.id} from ${c.level} owner to ${owner}`)
      }
    }

    /**
    when the qty is 0, childs should be zero
    **/
    await resetSkuQty(client, childs, sku0, 'sku0', id)
    await resetSkuQty(client, childs, sku1, 'sku1', id)
    await resetSkuQty(client, childs, sku2, 'sku2', id)
    await resetSkuQty(client, childs, sku3, 'sku3', id)
    await resetSkuQty(client, childs, sku4, 'sku4', id)
    await resetSkuQty(client, childs, sku5, 'sku5', id)

    // if (sku0 == 0) {
    //   for (let i = 0; i < childs.length; i++) {
    //     let data = { qty: 0 }
    //     await bomItemModel.updateBomItem(client, childs[i].id, data)
    //   }
    // }

    /**
    filter can not modify attribute and update bom item
    **/
    // let filterData = new dbHelper.filterKeys(data).exclude(['id', 'bom_id', 'rfq_pn', 'needPartList', 'parts_ctgy1_name', 'parts_ctgy2_name', 'formate'])
    // data.modified_time = moment().utc().toDate().toUTCString()
    data.modified_time = moment().utc().format()
    // get last price
    let findRes = _.find(items, (v) => {
      if (v.id === id) {
        let itemPartNumber = v.part_number ? v.part_number.trim().toUpperCase() : null
        let updatePartNumber = data.part_number ? data.part_number.trim().toUpperCase() : null
        if (itemPartNumber == updatePartNumber) {
          return v
        }
      }
    })

    if (findRes) {
      if (!_.isEmpty(findRes.last_price)) {
        // only get unsave part number price
        if (findRes.last_price.unitPrice === null || findRes.last_price.validDate === null ||
          findRes.last_price.currency === null) {
          await meBomCost.getMaterialLastPriceByBomId([data], bom_id)
        }
      } else {
        await meBomCost.getMaterialLastPriceByBomId([data], bom_id)
      }
    }else{
      await meBomCost.getMaterialLastPriceByBomId([data], bom_id)
    }

    logger.debug('update data to', data)
    // filterData = new dbHelper.filterKeys(data).exclude(['originCurrency', 'origin_last_price', 'exchangeRate'])
    let updateRes = await bomItemModel.updateBomItem(client, id, data)

    /**
    check if tree exist loop before commit
    **/
    items = await bomItemModel.getItemsByVerId(client, verId)
    checkTreeCircle(items)

    /**
     if change parts_ctgy_1 or parts_ctgy_2
     update partlist to null
    **/
    let getPartListValue = await bomPartListModel.getPartlistById(id)
    if (!needPartList && getPartListValue.length > 0) {
      await bomPartListModel.deleteBomItemPartListByItemId(client, id)
      await bomItemModel.updateBomItem(client, id, { 'system_cost': 0, 'modified_time': moment().utc().format() })
    } else {
      if ((prevItem.parts_ctgy_1 != parts_ctgy_1 || prevItem.parts_ctgy_2 != parts_ctgy_2) && getPartListValue.length > 0 && needPartList) {
        logger.debug('parts_ctgy_1 or parts_ctgy_2 changed, clean partlist value.')
        logger.debug(`prev: 1,${prevItem.parts_ctgy_1} 2,${prevItem.parts_ctgy_2}, after: 1,${parts_ctgy_1} 2,${parts_ctgy_2}`)
        await bomPartListModel.updatePartlistByBomItemId(client, id, {
          partlist_value: JSON.stringify({}),
          formate: formate,
          partlist_price: JSON.stringify({}),
          image_value:JSON.stringify({}),
          partlist_amount:JSON.stringify({}),
          update_time: moment().utc().format(),
        })
        await bomItemModel.updateBomItem(client, id, { 'system_cost': 0, 'modified_time': moment().utc().format() })
      }else if(needPartList && getPartListValue.length == 0){
        await bomPartListModel.createBomPartlist(client, id, formate)
      }else{
        // do nothing
      }
    }

    // Update versionId
    // if new version uuid diff with old version uuid update all bom item version_id
    // 20190904 add condition
    let isNeedUpdateVersion  = await meBomUtil.checkIsNeedUpdateVersion(bom_id)
    if(isNeedUpdateVersion){
      let getUUid = await bomVersionModel.getNextVersionUuid(client, bom_id, 'EDIT')
      if(getUUid && getUUid.isNewRecord){
        // new uuid update bom item
        await bomVersionModel.updateBomItemVersionId(client, getUUid.old_version_id, getUUid.new_version_id)
        await reCalPartlistPrice(client, bom_id, true, [id])
      }
    }
    return updateRes
  }),

  getDropDownVal: async (productType) => {
    // let aa = await bomItemModel.getDropDownItemByName('T0.25', { parts_ctgy_2: 'Acetate_Tape_of_Mylar_Sponge_Poron' })
    // console.log('this is result ### >>>', aa)
    let typeRes = await bomItemModel.getTypeNewDropdownValue(productType)
    let assyOtherRes = await bomItemModel.getAssyAndOtherNewDropdownValue(productType)
    let res = meBomUtil.getNewDropdownValue(typeRes, assyOtherRes)
    // let res = await bomItemModel.getDropDownVals()
    return res
  },

  getParentLevel: async (bom_id, level, item_id, version_id = null) => {
    let levelIdx = BOM_ITEM_LEVEL.indexOf(level)
    if (levelIdx == 0) {
      return []
    } else {
      let parentLevel = BOM_ITEM_LEVEL[levelIdx - 1]
      let verId = null
      let currentVersion = await bomItemModel.getItemVersionByBomId(bom_id)
      let isCompleteVersion = false
      if(!version_id){
        verId = currentVersion[0].id
      }else{
        verId = version_id
        if (currentVersion[0].id !== version_id) {
          isCompleteVersion = true
        }
      }

      let res = await bomItemModel.getItemByLevel(verId, parentLevel, isCompleteVersion)
      logger.debug(`get parent item id: ${res.map(c => c.id)} on level: ${parentLevel}`)
      /**
      when edit node, remove node's child, in case loop
      **/
      if (item_id) {
        let items = await bomItemModel.getItemsByVerIdNotTrans(verId)
        if(!items || items.length == 0){
          items = await bomItemModel.getHistoryItemsByVerIdNotTrans(verId)
        }
        let childs = getAllChildIds(item_id, items)
        let childsId = childs.map(c => c.id)
        childsId.push(item_id.toString())
        logger.debug('item childs', childsId)
        res = _.filter(res, l => { return (childsId.indexOf((l.id).toString()) < 0) })
      }
      return res
    }
  },

  getBomAssignList: async (id, userID) => {
    let checkBomProjectExist = await bomItemModel.checkBomProjectExist(id)
    if (!checkBomProjectExist) {
      throwApiError('bom id not found', errorCode.NOT_FOUND)
    }

    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: 'me_bom_projects.bom_item.source_cost',
    })

    // if viewPermission is not empty == user is a RDME, then check RDME assigned
    if (!_.isEmpty(viewPermission)) {
      let permission = await bomItemModel.bomRDMEPermission(id, userID)
      if (!permission)
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }

    // can get assign list, only ce, me
    let editAll = await rbacService.getPolicyByUser(userID, {
      action: 'EditOwn',
      resource: 'me_bom_projects',
    })
    let EditOwn = await rbacService.getPolicyByUser(userID, {
      action: 'EditAll',
      resource: 'me_bom_projects',
    })
    if (!_.isEmpty(editAll) || !_.isEmpty(EditOwn)) {
      // check bom version = .5 or .7
      // let approvalResult = await bomItemModel.bomVersionActionPermission(id, 'APPROVE', userID)
      let approvalResult = await meBomUtil.checkAllowApprove(id, userID)
      let completeResult = await bomItemModel.bomVersionActionPermission(id, 'VERSIONCOMPLETE', null)

      // let approvalPermission = await rbacService.getPolicyByUser(userID, {
      //   action: 'Approve',
      //   resource: 'me_bom_projects',
      // })

      let completePermission = await rbacService.getPolicyByUser(userID, {
        action: 'VersionComplete',
        resource: 'me_bom_projects',
      })

      let isEmdmProject = await emdmBomUtil.isEmdmProject(id)
      let assignList = []
      if (!isEmdmProject) {
        let result = await bomItemModel.getBomAssignList(id)
        assignList = _.chain(result)
          .map(k => {
            if(!k.isFunctionTeam) {
              k.assign = 'ME'
            } else {
              k.assign = null
            }
            k.tabOwner = k.employeeID == userID ? true : false
            return k
          })
          .orderBy('order', 'asc')
          .value()
      }

      return {
        // approvalAble: approvalResult > 0 && !_.isEmpty(approvalPermission) ? true : false,
        approvalAble: approvalResult,
        completeAble: completeResult > 0 && !_.isEmpty(completePermission) ? true : false,
        assignList,
      }
    } else {
      return {
        approvalAble: false,
        completeAble: false,
        assignList: [],
      }
    }
  },
  getBomItemBySearch: async (src, project, partList) => {
    let bomItems = src.bomItems
    let bomItemsPart = src.partItems
    if(project && !partList) {// user search part_name or part_number in bom list
      bomItems = _.filter(src.bomItems, o => {
        return searchProject(o, project)
      })
      return {
        ...src,
        bomItems,
      }
    }else if(partList && !project) {// user search part_name or part_number in partlist
      bomItemsPart = _.map(src.partItems, o => {
        let partlistFilter = _.filter(o.partlist, i => {
          return searchProject(i, partList)
        })
        return _.assign(o, { partlist: partlistFilter })
      })
      return {
        ...src,
        partItems: bomItemsPart,
      }
    }else if(project && partList) {
      bomItems = _.filter(src.bomItems, o => {
        return searchProject(o, project)
      })
      bomItemsPart = _.map(src.partItems, o => {
        let partlistFilter = _.filter(o.partlist, i => {
          return searchProject(i, partList)
        })
        return _.assign(o, { partlist: partlistFilter })
      })
      return {
        ...src,
        bomItems,
        partItems: bomItemsPart,
      }
    }else {
      return src
    }
  },

  uploadBomSourcerCostTemp: async (bomItemInfo, userId, upload_tmp_id) => {
    return await bomItemModel.insertUploadBomSourcerCostTemp(bomItemInfo, userId, upload_tmp_id)
  },

  uploadBomItemTemp: async (bomItemInfo, bomId, userId) => {
    let stageRes = await bomVersionModel.getBomStage(bomId)
    return await bomItemModel.insertUploadBomItemTemp(bomItemInfo, stageRes[0].version_id, userId)
  },
  getUploadFileRecord: async (bomId) => {
    let res = await bomItemModel.getUploadFileRecord(bomId)
    return res
  },
  addUploadFileRecord: dbHelper.atomic(async (client, bomId, userId) => {
    let stageRes = await bomVersionModel.getBomStage(bomId)
    let res = await bomItemModel.addUploadFileRecord(client, bomId, stageRes[0].stage_id, userId)
    return res
  }),

  deleteUploadBomItemTemp: dbHelper.atomic(async (client, id) => {
    return await bomItemModel.deleteUploadBomItemTemp(client, id)
  }),
  confirmUploadBomItem: dbHelper.atomic(async (client, id, transferOwner, bomId, userId) => {
    // let stageRes = await bomVersionModel.getBomStage(bomId)
    let getUUid = await bomVersionModel.getNextVersionUuid(client, bomId)

    if (getUUid) {
      // add upload record
      await bomItemModel.addUploadFileRecord(client, bomId, getUUid.stage_id, userId)

      // delete part list
      await bomPartListModel.deleteBomItemPartList(client, getUUid.old_version_id)

      // delete all old data
      await bomItemModel.deleteOldBomItem(client, getUUid.old_version_id)

      const bomItems = []
      // start transfrom temp -> formal and add insert into part list
      for (const v of transferOwner) {
        const bomItem = await bomItemModel.transferBomItem(client, id, v.source, v.destion, getUUid.new_version_id)
        await bomPartListModel.transferBomItemPartList(client, id, v.source)
        bomItems.push(...bomItem)
      }

      // delete temp
      await bomItemModel.deleteUploadBomItemTemp(client, id)
      return {
        new_version_id: getUUid.new_version_id,
        bomItems: bomItems,
      }
    }

  }),
  confirmUploadBomSourcerCost: dbHelper.atomic(async (client, uploadTempId, user) => {

    let { userID } = user
    let { role } = await updateBomPermission(userID)

    let uploadBomItemList = await bomItemModel.getUploadSoucerRecord(uploadTempId)
    if(uploadBomItemList.length === 0){
      throwApiError('bom id not found.', errorCode.NOT_FOUND)
    }
    let bomId = uploadBomItemList[0].bom_id
    const fromCurrency = uploadBomItemList[0].sourcer_import_curr
    let sourcerCostHistory = await updateSourcerCostItem(client, bomId, fromCurrency, uploadBomItemList, userID, role)
    await bomItemModel.deleteSourcerCostExcel(client, uploadTempId)

    await bomItemModel.insertBomEditHistory(client, sourcerCostHistory)
  }),
  deleteSourcerCostExcel: dbHelper.atomic(async (client, uploadTempId) => {
    await bomItemModel.deleteSourcerCostExcel(client, uploadTempId)
  }),
  getBomItemUploadOwner: async (bomId, id) => {
    let uploadRes = await bomItemModel.getBomItemUploadOwner(id)
    let designeeRes = await bomAssignModel.getMeBomDesigneeData(bomId)
    let res = {}
    res.uploadItemOwner = []
    res.bomDesignee = []
    if (uploadRes.rows && uploadRes.rows.length > 0) {
      res.uploadItemOwner = uploadRes.rows
    }

    if (designeeRes && designeeRes.length > 0) {
      let designArr = []
      _.forEach(designeeRes, (v) => {
        let obj = {
          // 'key':v.user_id,
          'value': v.user_name,
          'key': v.id,
        }
        designArr.push(obj)
      })
      res.bomDesignee = designArr
    }

    return res
  },
  getDropDownUuid: async (queryStr, fieldName = null, data = { parts_ctgy_1: null, parts_ctgy_2: null, material_spec: null, material:null }, path = null) => {
    let res = await bomItemModel.getDropDownItemByName(queryStr, fieldName, data, path)
    return res
  },
  checkTransferUser: async (bomId, transferOwner) => {
    let res = true
    let queryRes = await bomAssignModel.getMeBomDesigneeData(bomId)
    _.forEach(transferOwner, (v) => {
      let findRes = _.filter(queryRes, ['id', v.destion])
      if (findRes.length == 0) {
        res = false
      }
    })
    return res
  },
  deleteUploadBomRecord: async (bomId, stageId) => {
    return await bomItemModel.deleteBomItemUploadRecord(bomId, stageId)
  },
  checkIsNeedPartList: (checkPartListUuid, req) => {
    if (Array.isArray(req)) {
      req.forEach((item) => {
        checkPartList(checkPartListUuid, item)
      })
    }else{
      req = checkPartList(checkPartListUuid, req)
    }

    return req
  },
  getPartListDetail:async (bomItemId, productTypeId, productTypeName) =>{
    const { partlist_value: partlistValue, formate } = await bomItemModel.getPartListDetail(bomItemId)

    if (!partlistValue) return null

    // 若沒有 version 表示為第一版
    if (!partlistValue.hasOwnProperty('version') && partlistValue.hasOwnProperty('initialValue')) {

      let bomRes = await bomVersionModel.getBomIdbyItemId(bomItemId)
      let bomId = bomRes[0].bom_id
      let partListLayout = await partListService.getPartListLayout(formate, productTypeId, productTypeName, bomId).layout
      return {
        ...partlistValue,
        formData: V2Utils.v1ToV2(partlistValue.initialValue, partListLayout),
      }
    }
    return partlistValue
  },
  getPartListPrice:async (bomItemId, userID) =>{
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: 'me_bom_projects.bom_item.source_cost',
    })

    if (!_.isEmpty(viewPermission)) {
      return null
    }

    const { partlist_price: partlistPrice } = await bomItemModel.getPartListPrice(bomItemId)

    if (!partlistPrice) return null
    return partlistPrice
  },
  checkBomItemHasChild: async (bomItemId, targetState) => {
    let childList = await bomItemModel.getBomItemIdByParentId(bomItemId)
    let hasChild =  childList ? true : false

    if (hasChild === true && targetState === false) {
      throw new Error('C000201')
    }
  },
  getBomItemByItemId:async (bomID, bomItemId, assign, userID) =>{
    let resObj = {}
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: 'me_bom_projects.bom_item.source_cost',
    })

    // if viewPermission is not empty == user is a RDME, then check RDME assigned
    if (!_.isEmpty(viewPermission)) {
      let permission = await bomItemModel.bomRDMEPermission(bomID, userID)
      if (!permission)
        throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomID)
    if (isEmdmProject && assign.toLowerCase() != 'all') {
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
    let editAble = await BomItems.getItemEditAble(bomID, userID, assign)
    if(editAble){
      let res = await bomItemModel.getBomItemByItemId(bomID, assign, bomItemId)
      // let childList = await bomItemModel.getBomItemIdByParentId(bomItemId)
      let bomItem = res.rows[0]
      let bese64Img

      if (bomItem) {
        if (bomItem.image_path != null) {
          let ext = bomItem.image_path.split('.').pop()
          let ba64Convert = `data:image/${ext};base64,`
          let ba64Tmp = fs.readFileSync(bomItem.image_path, 'base64')
          bese64Img = ba64Convert.concat(ba64Tmp)
        }

        /* resObj = {
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
          material_spec: bomItem.old_material_spec_name ? bomItem.old_material_spec_name : bomItem.material_spec,
          material: bomItem.old_material_name ? bomItem.old_material_name : bomItem.material,
          gb_assy_ctgy_name: bomItem.gb_assy_ctgy_name,
          func_ctgy_name: bomItem.func_ctgy_name,
          parts_ctgy_1_name: bomItem.parts_ctgy_1_name,
          parts_ctgy_2_name: bomItem.parts_ctgy_2_name,
          part_size_l: bomItem.part_size_l,
          part_size_w: bomItem.part_size_w,
          part_size_h: bomItem.part_size_h,
          part_size_ef: bomItem.part_size_ef,
          part_size_m: bomItem.part_size_m,
          part_size_l2: bomItem.part_size_l2,
          part_size_w2: bomItem.part_size_w2,
          thickness: bomItem.thickness,
          part_weight: bomItem.part_weight,
          partlist_price: bomItem.partlistprice ? bomItem.partlistprice : null,
          partlist_amount: bomItem.partlistamount != null && !_.isEmpty(bomItem.partlistamount) ? bomItem.partlistamount.amount ? bomItem.partlistamount.amount : null : null,
          update_time: moment(bomItem.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
          sku0: bomItem.sku0,
          sku1: bomItem.sku1,
          sku2: bomItem.sku2,
          sku3: bomItem.sku3,
          sku4: bomItem.sku4,
          sku5: bomItem.sku5,
          suggestion_cost_remark: bomItem.suggestion_cost_remark,
          odm_oem: bomItem.odm_oem,
          initaddmodidel: bomItem.initaddmodidel,
          part_number: bomItem.part_number,
          remark:bomItem.remark,
          owner:bomItem.designee_id,
        } */
        resObj = meBomUtil.getBomBaseObj(bomItem, 0, bese64Img)
        resObj.material_spec = bomItem.old_material_spec_name ? bomItem.old_material_spec_name : bomItem.material_spec
        resObj.material = bomItem.old_material_name ? bomItem.old_material_name : bomItem.material
        resObj.gb_assy_ctgy_name = bomItem.gb_assy_ctgy_name
        resObj.func_ctgy_name = bomItem.func_ctgy_name
        resObj.parts_ctgy_1_name = bomItem.parts_ctgy_1_name
        resObj.parts_ctgy_2_name = bomItem.parts_ctgy_2_name
        resObj.owner = bomItem.designee_id
        let specReplaceInfoList = await getSpecNameReplaceInfo(resObj)
        replaceOldSpec(resObj, specReplaceInfoList)
      }
      return resObj
    }else{
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }
  },
  updateBomItemCost:dbHelper.atomic(async (client, bomId, data, userId) => {
    let isCurrectVersion = await checkBomSubVersion(bomId, '7')
    if (!isCurrectVersion) {
      throwApiError('the bom id version not allow edit cost', errorCode.UNAUTHORIZED)
    }
    // only CE|ME or CE|ME/EE can edit cost
    let viewPermission = await rbacService.getPolicyByUser(userId, {
      action: 'EditAll',
      resource: 'me_bom_projects.spa_sourcer_suggestion',
    })

    if (_.isEmpty(viewPermission)) {
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }

    let failData = []
    let updateColumn = []
    let verifyKeys = {
      'spa_cost_up':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'material_name':{
        validatorType: 'isLength',
        validatorParam: [{ min: 1, max: 24 }],
      },
      'ce_shipping':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'ce_pl':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      /* 'shipping_check_cost':{
        validatorType: 'isNumeric',
        validatorParam: [],
      }, */
      'inquiry_cost_up':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'ce_remark':{
        validatorType: 'isLength',
        validatorParam: [{ min: 1, max: 48 }],
      },
    }
    // check all data include bomItemid
    _.forEach(data, (v, idx) => {
      let _id = v.id
      if(!v.id || !validator.isUUID(v.id)) {
        failData.push([idx, 'id', v.id])
        return
      }
      let costTypeDebugInfo = [_id, 'suggestion_cost_type', v.suggestion_cost_type]
      if(!_.isNil(v.suggestion_cost_type)){
        let chkRes = _.find(suggestionCostType.optionsAvailable, (dv) => {return dv.toLowerCase().trim() == v.suggestion_cost_type.toLowerCase().trim() })
        if(!chkRes){
          failData.push(costTypeDebugInfo)
        } else {
          updateColumn.push(costTypeDebugInfo)
        }
      }
      for(let key in verifyKeys){
        if (!_.has(v, key)) {
          continue
        }
        let debugInfo = [_id, key, v[key]]
        if (_.isNull(v[key])) {
          updateColumn.push(debugInfo)
        } else {
          if(!validator[verifyKeys[key].validatorType](typeof v[key] === 'string' ?  v[key] : v[key].toString(), ...verifyKeys[key].validatorParam)){
            failData.push(debugInfo)
          } else {
            updateColumn.push(debugInfo)
          }
        }
      }
    })

    if(failData.length > 0){
      logger.warn('[updateBomItemCost] varify with error:', JSON.stringify(failData, 0, 2))
      throwApiError('the bomitem object has wrong type paramaters', errorCode.ERRORFORMAT)
    }


    let is_emdm_project = await emdmBomUtil.isEmdmProject(bomId)
    let bom_version_id = await bomItemModel.getItemVersionByBomId(bomId)
    let origin_dataset = await bomItemModel.getItemsByVerId(client, bom_version_id[0].id)
    let edit_type = await bomItemModel.getBomEditType('bom_item_gerenal', ['spa', 'ce'])

    let assemble = (reqObj, reqName, sourceData) => {
      if (sourceData || sourceData === '' || sourceData === 0 || _.isNull(sourceData)) {
        reqObj[reqName] = sourceData
      }
    }

    let assembleHistory = (historyArr, bom_id, label, source_item_id, user_id, value) => {

      historyArr.push({
        bom_id: bom_id.bom_id,
        field_type_id: _.find(edit_type, (type) => type.label == label).id,
        // field_type_name: _.find(edit_type, (type) => type.label == label).label_name,
        value: value,
        bom_version_id: bom_id.id,
        role: 'CE',
        user_id: user_id,
        action: 'EditCECost',
        source_item_id: source_item_id,
      })
    }

    let dataLength = data.length
    let history = []
    let sugg_cost_change = []

    for(let i = 0; i < dataLength; i++){
      let bomItem = data[i]
      let oriBomItem = _.find(origin_dataset, (ori) => ori.id == bomItem.id)

      let reqObj = {}
      assemble(reqObj, 'spa_cost_material_remark', bomItem.material_name)
      assemble(reqObj, 'spa_cost', bomItem.spa_cost_up)
      assemble(reqObj, 'shipping_check_cost', bomItem.ce_shipping)
      assemble(reqObj, 'ce_pl', bomItem.ce_pl)
      assemble(reqObj, 'inquiry_cost_up', bomItem.inquiry_cost_up)

      if(typeof bomItem.suggestion_cost_type === 'string'){
        reqObj.suggestion_cost_type = bomItem.suggestion_cost_type.toLowerCase().trim()
        if (is_emdm_project) {
          assembleHistory(sugg_cost_change, bom_version_id[0], 'ce_cost_up', oriBomItem.source_item_id, userId, null)
        }
      }

      assemble(reqObj, 'suggestion_cost_remark', bomItem.ce_remark)

      if(Object.keys(reqObj).length > 0) {
        logger.debug('update ce cost list:', updateColumn)
        await bomItemModel.updateBomItem(client, bomItem.id, reqObj)

        if (is_emdm_project) {
          Object.keys(reqObj).forEach((obj) => {
            let value = reqObj[obj] ? reqObj[obj].toString() : reqObj[obj]
            assembleHistory(history, bom_version_id[0], obj, oriBomItem.source_item_id, userId, value)
          })
        }
      }
    }
    return { history, sugg_cost_change }
  }),
  insertItemCostEditHistory: dbHelper.atomic(async (client, bomID, userID, sourcerHistory = [], ceCostHistory = { history: [], sugg_cost_change: [] }) => {
    let history = []
    let sugg_cost_change = ceCostHistory.sugg_cost_change

    if (sugg_cost_change.length > 0) {
      let fullBom = await getBomItem(bomID, userID, 'all')
      _.forEach(sugg_cost_change, (sugg) =>{
        let item = _.find(fullBom.bomItems, (bom) => bom.source_item_id == sugg.source_item_id)
        sugg.value = item.ce_cost_up
      })
    }

    history = _.concat(ceCostHistory.history, sugg_cost_change, sourcerHistory)

    await bomItemModel.insertBomEditHistory(client, history)
  }),
  getBomItemHistory: async (bomID, itemSourceId) => {
    let edit_history = await emdmMainModel.getBomEditHistory([bomID], [itemSourceId])
    let itemDetail = await emdmMainModel.getBomItemPartName([bomID])
    if (edit_history.length > 0) {
      return meBomUtil.editHistoryFormat(edit_history, itemDetail)
    }

    return []
  },
  updateBomItemSourcerCost: dbHelper.atomic(async (client, bomId, data, userId) => {
    let isCurrectVersion = await checkBomSubVersion(bomId, '7')
    if (!isCurrectVersion) {
      throwApiError('the bom id version not allow edit cost', errorCode.UNAUTHORIZED)
    }
    // let cePermission = await rbacService.getPolicyByUser(userId, {
    //   action: 'EditAll',
    //   resource: 'me_bom_projects.spa_sourcer_suggestion',
    // })
    // let isCePermissionDeney = _.isEmpty(cePermission)

    // let sourcerPermission = await rbacService.getPolicyByUser(userId, {
    //   action: 'View',
    //   resource: 'me_bom_projects.bom_item.source_cost',
    // })
    // let isSourcerPermissionDeney = Object.keys(sourcerPermission).length !== 0
    let { role, ...permission } = await updateBomPermission(userId)
    if(permission.isCePermissionDeney && permission.isSourcerPermissionDeney){
      throwApiError('permission deny', errorCode.UNAUTHORIZED)
    }

    let failData = []
    let updateColumn = []
    let verifyKeys = {
      'sourcer_assembly':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'sourcer_cost_up':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'sourcer_pl':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'sourcer_shipping':{
        validatorType: 'isNumeric',
        validatorParam: [],
      },
      'sourcer_remark':{
        validatorType: 'isLength',
        validatorParam: [{ min: 1, max: 48 }],
      },
    }
    // check all data include bomItemid
    _.forEach(data, (v, idx) => {
      let _id = v.id
      v.bom_item_id = v.id
      v.sourcer_cost = v.sourcer_cost_up // db 內部key實際為 sourcer_cost
      v.sourcer_import_curr = 'USD' // 線上編輯僅提供USD編輯
      if(!v.id || !validator.isUUID(v.id)) {
        failData.push([idx, 'id', v.id])
        return
      }
      for(let key in verifyKeys){
        if (!_.has(v, key)) {
          continue
        }
        let debugInfo = [_id, key, v[key]]
        if (_.isNull(v[key])) {
          updateColumn.push(debugInfo)
        } else {
          if(!validator[verifyKeys[key].validatorType](typeof v[key] === 'string' ?  v[key] : v[key].toString(), ...verifyKeys[key].validatorParam)){
            failData.push(debugInfo)
          } else {
            updateColumn.push(debugInfo)
          }
        }
      }
    })

    if(failData.length > 0){
      logger.warn('[updateBomItemSourcerCost] varify with error:', JSON.stringify(failData, 0, 2))
      throwApiError('the bomitem object has wrong type paramaters', errorCode.ERRORFORMAT)
    }
    logger.debug('update sourcer cost list:', updateColumn)
    if (updateColumn.length) {
      return await updateSourcerCostItem(client, bomId, 'USD', data, userId, role, true)
    }
    return []
  }),
  /**
   * approve 時更新匯率
   */
  updateBomItemSourcerCostByBomId:dbHelper.atomic(async (client, bomId) => {
    let version = await bomItemModel.getItemVersionByBomId(bomId)
    if (version.length == 0) {
      throw new Error(`can not get version by id: ${bomId}`)
    }
    let verId = version[0].id
    let bomItemRes = await bomItemModel.getItemsByVerId(client, verId)
    let exchangeRateDate = moment().format('YYYYMMDD')
    await asyncForEach(bomItemRes, async (item) => {
      if (item.sourcer_import_curr && item.sourcer_import_curr !== 'USD') {
        let from = item.sourcer_import_curr
        let to = 'USD'
        let key = `${from}_${to}_${exchangeRateDate}`
        let exchangeInfo = await cache.getCacheAsync(key, spendingModel.getCurrencys, from, to, exchangeRateDate)
        let exchangeRate = exchangeInfo[0].exange_rate

        let updateCeShipping = (!_.isNil(item['sourcer_shipping']) && item['sourcer_shipping'] === item['shipping_check_cost']) // 兩者一樣 代表ce沒改過 同步更新匯率
        let updateInquiryCost = (!_.isNil(item['sourcer_cost_up']) && item['sourcer_cost_up'] === item['inquiry_cost_up']) // 兩者一樣 代表ce沒改過 同步更新匯率

        sourcerExchangeColumnList.forEach((keys) => {
          let priceKey = keys[0]
          let oriKey = keys[1]
          let floatKey = key[2]
          if (item[oriKey]) {
            item[priceKey] = formatFloat(item[oriKey] * exchangeRate, meFloatPoint.get(floatKey))
          }
        })
        await bomItemModel.updateSourcerCost(client, item, updateInquiryCost, updateCeShipping)
      }
    })
  }),
  updateBomItemLastPriceByBomId:dbHelper.atomic(async (client, bomId, isUpdateAll = true) => {
    // get version by bom id
    let version = await bomItemModel.getItemVersionByBomId(bomId)
    if (version.length == 0) {
      throw new Error(`can not get version by id: ${bomId}`)
    }
    let verId = version[0].id
    let items = await bomItemModel.getItemsByVerId(client, verId)

    // isUpdate all is false 的話，只更新沒有last price的料
    if(!isUpdateAll){
      items = _.filter(items, (v) => {
        if(_.isEmpty(v.last_price)){
          return v
        }else{
          if( v.last_price.unitPrice === null || v.last_price.validDate === null){
            return v
          }
        }
      })
    }

    // get last price
    await meBomCost.getMaterialLastPriceByBomId(items, bomId)
    items = _.uniqBy(items, 'part_number')

    // update bom item last price column
    await Promise.all(
      _.map(items, async (v) =>{
        await bomItemModel.updateBomIemLastPrice(client, v, verId)
      })
    )
  }),

  updateBomItemCostWhenIsParent:dbHelper.atomic(async (client) => {
    // get all bomitem
    let bmItemRes = await bomItemModel.getAllBomItem()
    await Promise.all(
      _.map(bmItemRes, async (v) =>{
        let findRes = _.find(bmItemRes, (dv) =>{return dv.id == v.parent_level} )
        let updatData = createResetCostObj(findRes)
        if(!_.isEmpty(updatData)){
          await bomItemModel.updateBomItem(client, findRes.id, updatData)
        }
      })
    )
  }),

  setAllOrderId:dbHelper.atomic(async (client) => {
    let versionRes = await bomItemModel.getVersionIdfromBomItem()
    if(versionRes.length > 0){
      for (let v of versionRes) {
        let bomInfoRes = await bomItemModel.getItemsByVerId(client, v.version_id)
        let completeBomInfo = await bomItemModel.getCompleteItemsByVerId(client, v.version_id)
        if(bomInfoRes && bomInfoRes.length > 0){
          let count = 1
          for (let dv of bomInfoRes) {

            let updatData = {}
            updatData.order_id = count
            await bomItemModel.updateBomItem(client, dv.id, updatData)
            await bomItemModel.updateCompleteBomItem(client, dv.id, updatData)
            count++
          }
        }
        if(completeBomInfo && completeBomInfo.length > 0){
          let count = 1
          for (let dv of completeBomInfo) {
            let updatData = {}
            updatData.order_id = count
            await bomItemModel.updateCompleteBomItem(client, dv.id, updatData)
            count++
          }
        }
      }
    }
  }),
  getTypeUseRefPartNumber: async (src) => {
    let res = await bomItemModel.getTypeUseRefPartNumber(src)
    return res
  },
  getBomDetailInfo:async (id) => {
    let res = await bomManagerModel.getMeBomDetailById(id)
    return res
  },
  getConfigUUid:async() =>{
    let res = await bomItemModel.getBomItemValidConfig()
    return res
  },

  /* checkNoNeedMaterialSpec: (checkPartListUuid, req) => {
    if (Array.isArray(req)) {
      if (req.length > 0) {
        _.forEach(req, (v) => {
          v = checkNoNeedMaterialSpec(checkPartListUuid, v)
        })
      }
    }else{
      req = checkNoNeedMaterialSpec(checkPartListUuid, req)
    }

    return req
  }, */

  checkNoNeedDependency: (noNeedDependUuid, req) => {
    if (Array.isArray(req)) {
      req.forEach((item) => {
        checkNoNeedDependency(noNeedDependUuid, item)
      })
    }else{
      req = checkNoNeedDependency(noNeedDependUuid, req)
    }

    return req
  },

  getMappingPartCtgy: async () => {
    let res = await bomItemModel.getMappingPartCtgyConfig()
    return res
  },

  getAllCompleteVersion: async(bomId) =>{
    let res = []
    let isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
    let queryRes = []
    if (isEmdmProject) {
      queryRes = await spendingModel.getEmdmCompleteVersion(null, bomId)
    } else {
      queryRes = await spendingModel.getMeCompleteVersion(null, bomId)
    }
    let currentRes = await bomItemModel.getCurrnetVersion(bomId)
    if(queryRes && queryRes.length){
      queryRes.sort((a, b) => parseFloat(b.version_name) - parseFloat(a.version_name))
      _.forEach(queryRes, (v) => {
        let obj = {}
        obj.key = v.version_id
        obj.value = 'Version ' + v.version_name
        res.push(obj)
      })
    }
    if(currentRes && currentRes.length > 0){
      // if is current version key is CURRENT
      let findRes = _.find(res, (v) => { return v.key == currentRes[0].id })
      if (!findRes) {
        res.unshift({ key: 'CURRENT', value: 'Version ' + currentRes[0].version_name })
      }else{
        _.forEach(res, (v) =>{
          if(v.key == currentRes[0].id){
            v.key = 'CURRENT'
          }
        })
      }
    }
    /* if(res && res.length > 0){
      res = _.orderBy(res, ['value'], ['desc'])
    } */
    return res
  },

  getAllCompleteBomByVersion: async (versionId, assign, bomID, skuNum = 'sku1') => {
    return await getCompleteBom(versionId, skuNum, assign, bomID)
  },
  getBomItemHistroyByItemId:async (versionid, bomItemId) =>{
    let res = await bomItemModel.getBomTableByCompleteVersionId(versionid, 'all', bomItemId)
    let bomItem = res.rows[0]
    let bese64Img
    let resObj = {}

    if (bomItem) {
      if (bomItem.image_path != null) {
        let ext = bomItem.image_path.split('.').pop()
        let ba64Convert = `data:image/${ext};base64,`
        let ba64Tmp = fs.readFileSync(bomItem.image_path, 'base64')
        bese64Img = ba64Convert.concat(ba64Tmp)
      }
      resObj = {
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
        func_ctgy: bomItem.func_ctgy_id,
        parts_ctgy_1: bomItem.parts_ctgy_1_id,
        parts_ctgy_2: bomItem.parts_ctgy_2_id,
        material_spec: bomItem.old_material_spec_name ? bomItem.old_material_spec_name : bomItem.material_spec_id,
        material: bomItem.old_material_name ? bomItem.old_material_name : bomItem.material_id,
        gb_assy_ctgy: bomItem.gb_assy_ctgy,
        func_ctgy_name: bomItem.func_ctgy_name_id,
        parts_ctgy_1_name: bomItem.parts_ctgy_1,
        parts_ctgy_2_name: bomItem.parts_ctgy_2,
        material_spec_name: bomItem.material_spec,
        material_name: bomItem.material,
        part_size_l: bomItem.part_size_l,
        part_size_w: bomItem.part_size_w,
        part_size_h: bomItem.part_size_h,
        part_size_ef: bomItem.part_size_ef,
        part_size_m: bomItem.part_size_m,
        part_size_l2: bomItem.part_size_l2,
        part_size_w2: bomItem.part_size_w2,
        thickness: bomItem.thickness,
        part_weight: bomItem.part_weight,
        // partlist_price: bomItem.partlistprice ? bomItem.partlistprice : null,
        partlist_amount: bomItem.partlistamount != null && !_.isEmpty(bomItem.partlistamount) ? bomItem.partlistamount.amount ? bomItem.partlistamount.amount : null : null,
        update_time: moment(bomItem.update_time).locale('zh-tw').format('MM/DD/YY HH:mm:ss'),
        sku0: bomItem.sku0,
        sku1: bomItem.sku1,
        sku2: bomItem.sku2,
        sku3: bomItem.sku3,
        sku4: bomItem.sku4,
        sku5: bomItem.sku5,
        suggestion_cost_remark: bomItem.suggestion_cost_remark,
        odm_oem: bomItem.odm_oem_id,
        initaddmodidel: bomItem.initaddmodidel_id,
        part_number: bomItem.part_number,
        remark: bomItem.remark,
        owner: bomItem.original_owner ? bomItem.original_owner : bomItem.owner,
      }
      let specReplaceInfoList = await getSpecNameReplaceInfo(resObj)
      replaceOldSpec(resObj, specReplaceInfoList)
    }
    return resObj
  },
  getHistoryPartListPrice:async (bomItemId, userID) =>{
    let viewPermission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: 'me_bom_projects.bom_item.source_cost',
    })

    if (!_.isEmpty(viewPermission)) {
      return null
    }

    let partlistPrice = null
    let res = await bomItemModel.getHistoryPartListPrice(bomItemId)
    if(res){
      if(res.complete_partlist_price){
        partlistPrice = res.complete_partlist_price
      }else if(res.partlist_price){
        partlistPrice = res.partlist_price
      }
    }

    return partlistPrice
  },
  getHistoryPartListDetail:async (bomItemId, productTypeId, productTypeName) =>{
    let partlistValue = null
    let formate = null
    let res =  await bomItemModel.getHistoruPartListDetail(bomItemId)
    if(res){
      if(res.complete_formate){
        formate = res.complete_formate
      }else if(res.formate){
        formate = res.formate
      }

      if(res.complete_partlist_value){
        partlistValue = res.complete_partlist_value
      }else if(res.partlist_value){
        partlistValue = res.partlist_value
      }
    }

    if (!partlistValue) return null


    let bomRes = await bomVersionModel.getBomIdbyHistoryItemId(bomItemId)
    let bomId = bomRes[0].bom_id

    let partListLayout = await partListService.getPartListLayout(formate, productTypeId, productTypeName, bomId).layout

    // 若沒有 version 表示為第一版
    if (!partlistValue.hasOwnProperty('version') && partlistValue.hasOwnProperty('initialValue')) {
      return {
        ...partlistValue,
        formData: V2Utils.v1ToV2(partlistValue.initialValue, partListLayout),
      }
    }
    return partlistValue
  },
  /**
   * 取得 匯出 Cleansheet export 所需資料
   * @param {number} bomId ME Bom ID
   * @param {array} partlistFormates Partlist format, ex: [hosuing-metal, housing-plastic]
   * @param {string} versionId ME Bom's version, latest version should be 'CURRENT'
   *
   * @returns {object} Data Object
   * {
   *    projectInfo: {},
   *    bomItems: [{
   *      cleansheet: [{
   *        label, key, value
   *      }],
   *      partlist: [{
   *        key,
   *        contents: [{
   *          label, key, value
   *        }]
   *      }]
   *    }]
   * }
   */
  getPartlistExportData: async (bomId, partlistFormates, versionId) => {
    let { productTypeSetting, data, bomProjectInfo } = await getPartlistLawData( bomId, partlistFormates, versionId )
    const sortedData = data.reduce((acc, item) => {
      return {
        ...acc,
        [item.format]: (acc[item.format] || []).concat(item),
      }
    }, {})
    return await getPartlistFormattedData(sortedData, partlistFormates, productTypeSetting, bomProjectInfo)
  },
  getQuotationExportData: async (bomId, partlistFormates, versionId) => {
    let { productTypeSetting, data, bomProjectInfo } = await getPartlistLawData( bomId, partlistFormates, versionId )
    const sortedData = data.reduce((acc, item) => {
      return {
        ...acc,
        [item.format]: (acc[item.format] || []).concat(item),
      }
    }, {})
    let res = []
    await asyncForEach(Object.keys(sortedData), async (k)=>{
      await asyncForEach( sortedData[k],  async (val)=>{
        let fData = await getPartlistFormattedData({ [k]:[val] }, partlistFormates, productTypeSetting, bomProjectInfo)
        res.push(fData)
      })
    })
    return res
  },

  // 取得BOM item的驗証規則
  getRuleData: async () => {
    let ruleResList = []
    let sizeRule =  await bomItemModel.getSizeValidatorRules()
    let disableRule = await bomItemModel.getValidatorDisableRules()
    let allRule = sizeRule.concat(disableRule)
    const colKeyGroup = _.groupBy(allRule, 'col_key')
    let colKeyGroupKeys = Object.keys(colKeyGroup)
    await asyncForEach(colKeyGroupKeys, async (colKey) => {
      let colValList = []
      colKeyGroup[colKey].forEach((colItem) => {
        colValList.push(colItem.col_val)
      })
      let res = await bomItemModel.getDefineItem(colKey, colValList)
      res.forEach((resItem) => {
        let ruleItem = allRule.filter((item) => item.col_val === resItem.id)
        ruleItem.forEach((item) => {
          item.item_name = resItem.name
          ruleResList.push(item)
        })
      })
    })
    const thicknessRule = await getThicknessRule()

    if (!sizeRule) {
      return null
    }

    const groupData = _.groupBy(ruleResList, 'item_name')
    const size = Object.keys(groupData)
      .map((item) => {
        const requiredField = _.chain(groupData)
          .get(item, [])
          .filter(d => d.require_field != null)
          .map(d => d.require_field)
          .uniq() // 去除重複的 require_field
          .value()

        const disableField = _.chain(groupData)
          .get(item, [])
          .filter(d => d.disable_field != null)
          .map(d => d.disable_field)
          .uniq() // 去除重複的 disable_field
          .value()

        let result = {
          item,
          requiredField,
          disableField,
          // path: _.get(groupData, [item, 0, 'path'], ''),
          colKey: _.get(groupData, [item, 0, 'col_key'], ''),
          fieldTypeChangingInfo: {},
        }
        if (result.colKey === 'parts_ctgy_2' && thicknessRule.hasOwnProperty(result.item)){
          result.fieldTypeChangingInfo.thickness = thicknessRule[result.item]
        }
        return result
      })

    return { size }
  },

  getPartCtgy1Value: async (item_name) => {
    let res = await bomItemModel.getPartCtgy1ByName(item_name)
    return res
  },
  getPartCtgy2Value:async(part_ctgy1_id, item_name)=>{
    let res = await bomItemModel.getPartCtgy2ByName(part_ctgy1_id, item_name)
    return res
  },
  getMaterialSpecValue:async(part_ctgy2_id, item_name) =>{
    let res = await bomItemModel.getMaterialSpecByName(part_ctgy2_id, item_name)
    return res
  },
  getMaterialValue:async(part_ctgy2_id, material_spec_id, item_name) =>{
    let res = await bomItemModel.getMaterialByName(part_ctgy2_id, material_spec_id, item_name)
    return res
  },
  getAssyCtgyValue:async(item_name, productType)=>{
    let res = await bomItemModel.getAssyCtgyByName(item_name, productType)
    return res
  },
  getFunCtgyValue:async(item_name)=>{
    let res = await bomItemModel.getFuncCtgyByName(item_name)
    return res
  },
  getOdmoemValue:async(item_name)=>{
    let res = await bomItemModel.getOdmoemByName(item_name)
    return res
  },
  getSupplyTypeValue:async(item_name)=>{
    let res = await bomItemModel.getSupplyTypeByName(item_name)
    return res
  },
  getOperationValue:async(item_name)=>{
    let res = await bomItemModel.getOperationByName(item_name)
    return res
  },
  getBomItemsNoDependencyRule:async()=>{
    const noNeedDependencyConfig = await bomItemModel.getExceptionTypeConfig('no_need_dependency_val')
    const noNeedPartlistConfig = await bomItemModel.getExceptionTypeConfig('no_need_partlist')
    const configList = noNeedPartlistConfig.concat(noNeedDependencyConfig)
    const repeatConfigList = configList.map((configInfo)=> `${configInfo.parts_ctgy_1}.${configInfo.parts_ctgy_2}.${configInfo.material_spec}.${configInfo.material}`)
    const noDependencyOemOdmList = await bomItemModel.getNoNeedPartListOdmOem()
    const noRepeatConfigList = [...new Set(repeatConfigList)]
    const result = noRepeatConfigList.map((configInfoStr) => {
      const configInfo = configInfoStr.split('.')
      return {
        parts_ctgy_1 : configInfo[0],
        parts_ctgy_2 : configInfo[1] === 'null' ? null : configInfo[1],
        material_spec: configInfo[2] === 'null' ? null : configInfo[2],
        material: configInfo[3] === 'null' ?  null : configInfo[3],
      }
    })
    return {
      noDependencyRule : result,
      noDependencyOemOdmRule: noDependencyOemOdmList.map((configInfo) => {
        return {
          'odm_oem':configInfo.id, // 配合前端欄位更名
        }
      }),
    }
  },
  getExchangeRateDate,
  getLastVersionById,
  getBomProjectInfoByBomId,
  getBomItemImage: async(bomId, sourceitemId, type) =>{
    let project = await bomItemModel.bomPNameAndDesc(bomId)
    let imagesList = await emdmMainModel.getBomImages(project[0].project_code, project[0].source_version)

    let images = _.find(imagesList, (images) => images.ppId == sourceitemId && images.objectList.length > 0)
    if (images) {
      let objectKeys = []
      if (type == 'item') {
        objectKeys = _.filter(images.objectList, (obj) => obj.fileCategory == 'drawingFile')
      } else {
        objectKeys = _.filter(images.objectList, (obj) => obj.fileCategory != 'drawingFile')
      }
      if (objectKeys.length > 0) {
        let imagesUrl = await emdmMainModel.getImageURL(_.map(objectKeys, 'objectKey'))
        if (imagesUrl && imagesUrl.hasOwnProperty('data')) {
          let res = []
          _.forEach(objectKeys, (obj) => {
            let image = _.find(imagesUrl.data, (url) => url.objectKey == obj.objectKey)
            if (image) {
              let filename = type == 'item' ? 'drawingFile.' + image.url.split('?')[0].split('.').pop() : obj.fileName
              res.push({
                fileName: filename,
                url: image.url,
              })
            }
          })
          return res
        }
      }
    }
    return []
  },
}
