/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')

const meBomUtil = require('../../utils/mebom/meBomUtils.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { formatFloat, asyncForEach } = require('../../helpers/utils.js')
const log4js = require('../../utils/logger/logger')
const { DecimalGetter } = require('../../utils/decimalConfig/index.js')

const rbacService = require('../../service/admin/rbac.js')
const bomItemService = require('../../service/bom/bomItem.js')

const bomItemModel = require('../../model/bom/bomItem.js')
const spendingModel = require('../../model/spending/spending.js')

const logger = log4js.getLogger('MeBomExport')
const meFloatPoint = new DecimalGetter('MEBom')
const sourcerExchangeColumnList = [
  ['sourcer_shipping', 'ori_sourcer_shipping',  'sourcerShipping'],
  ['sourcer_pl',       'ori_sourcer_pl',        'sourcerPL'],
  ['sourcer_assembly', 'ori_sourcer_assembly',  'sourcerAssembly'],
  ['sourcer_cost_up',     'ori_sourcer_cost_up',   'sourcerCostUP'],
]

/**
 * 產生export需要的格式資
 */
class MeBomExport {
  /**
   * 初始化 export資訊
   * @param {number} bomId bom project id 例:123
   * @param {number} userID 使用者 id 例:10700001
   * @param {string} sku 要匯出的sku 例:sku1
   * @param {string} versionid bom project 版本 id 例:bd11a466-0192-4bda-9e3b-593209b1eba1
   * @param {string} currency 要 export 的幣別 例:RMB
   */
  constructor(bomId, userID, sku, versionid = null, currency = 'USD') {
    this.bomId = bomId
    this.userID = userID
    this.sku = sku
    this.versionid = versionid
    this.currency = currency

    this.isExportPrice = false // 是否能夠匯出價格資訊
    this.isCurrent = (this.versionid.trim().toUpperCase() === 'CURRENT') // 是否匯出最新版本
    this.exchangeRateCache = new Map() // 匯率快取
    // eslint-disable-next-line no-magic-numbers
    this.exchangeRateDate = 0 // 匯率日期
  }
  /**
   * 產生export object
   */
  async createExportData() {
    let result = {
      'meSummary': [],
      'meItem': [],
      'meCurrency': [],
      'exchangeRate': [],
      'spaceRateDetail': {
        'total_summary':[],
        'total_summary_detail':[],
      },
      'spaceRate':{
        'bom':{
          'rd_space': 0,
          'new_material': 0,
          'bom_list': [],
        },
        'cost': [],
      },
    }
    let permissionRes = await this._checkPermission() // 檢查權限
    if (permissionRes.error){
      throwApiError(permissionRes.error[0], permissionRes.error[1])
    } else {
      this.isExportPrice = permissionRes.isExportPrice
    }
    this.exchangeRateDate = await bomItemService.getExchangeRateDate(this.bomId, this.versionid) // 選擇匯率日期
    let bomTableRes = await this._getBomTable() // 取得bom project
    result.meSummary = await this._getHeader(bomTableRes) // 取得 專案資訊
    result.meItem = await this._parseBomTable(bomTableRes) // 產生 bom item
    if (this.isExportPrice) {
      result.meCurrency = await this._parseOriCurrTable(bomTableRes) // 產生 bom item 原始幣別資訊
      result.exchangeRate = await this._parseExchangeTable(result.meCurrency) // 產生 有用到的 匯率
    }
    result.spaceRate = await this._getSpaceRate(bomTableRes.bomItems)
    result.spaceRateDetail = this._getSpaceRateDetail(bomTableRes.bomItems)
    result.spaceRate.bom.bom_list[0]['rd_space'] = result.spaceRate.bom.rd_space
    result.spaceRate.bom.bom_list[0]['new_material'] = result.spaceRate.bom.new_material
    return result
  }
  /**
   * 檢查權限
   */
  async _checkPermission() {
    let result = {
      error: null,
      isExportPrice: false,
    }
    let viewPermission = await rbacService.getPolicyByUser(this.userID, {
      action: 'View',
      resource: 'me_bom_projects.bom_item.source_cost',
    })
    let exportPermission = await rbacService.getPolicyByUser(this.userID, {
      action: 'Export',
      resource: 'me_bom_projects',
    })
  
    if(_.isEmpty(exportPermission)) {
      result.error = ['permission deny', errorCode.UNAUTHORIZED]
      return result
    }
  
    // if viewPermission is not empty == user is a RDME, then check RDME assigned
    if (!_.isEmpty(viewPermission)) {
      let permission = await bomItemModel.bomRDMEPermission(this.bomId, this.userID)
      if (!permission){
        result.error = ['permission deny', errorCode.UNAUTHORIZED]
        return result
      }
    }
    // RD ME 的權限是可以export的，但因為某些價格不讓他看到，所以deny裡面也會有resource，會把不能看到的資料設成null
    // { Export:
    //   { allow: [ 'me_bom_projects' ],
    //     deny:
    //       [ 'me_bom_projects.bom_item.system_cost',
    //         'me_bom_projects.bom_item.source_cost' ]
    //   }
    // }
    result.isExportPrice = !(exportPermission.Export.allow.length && exportPermission.Export.deny.length)
    return result
  }

  /**
   * 取得bom project
   */
  async _getBomTable() {
    let bomTableRes = null
    if (this.isCurrent) {
      bomTableRes = await meBomUtil.getBomCurrentBomTable(this.bomId, 'all', this.sku, null, true)
    } else {
      bomTableRes = await meBomUtil.getBomTableByCompleteVersionId(this.versionid, this.sku, 'all')
    }
    return bomTableRes
  }
  _getHeaderBase(headerRes, bomTableRes){
    return {
      'export_from': 'BOM Management',
      'export_date': moment().locale('zh-tw').format('YYYY/MM/DD hh:mm:ss a'),
      'export_curr': this.currency,
      'customer': headerRes.customer,
      'sku_select': this.sku,
      'project_name': headerRes.project_name,
      'sku_desc': headerRes.sku_desc,
      'project_code': headerRes.project_code,
      'total_bom_items': bomTableRes.totalItems,
      'product': headerRes.product,
      'sku_cost': null,
      'site_name': headerRes.site_name,
      'emdm_version': headerRes.emdm_version,
      'stage_name': headerRes.stage_name,
      'version': bomTableRes.version,
      'create_time': moment(headerRes.create_time).locale('zh-tw').format('YYYY/MM/DD'), // spaceRate用
    }
  }
  /**
   * 取得 專案資訊
   * @param {Object} bomTableRes bom project
   */
  async _getHeader(bomTableRes) {
    let header = null
    let headerRes = null
    if (this.isCurrent) {
      headerRes = await bomItemModel.getMeBomHeader(this.bomId)
    } else {
      headerRes = await bomItemModel.getMeBomHeader(this.bomId, this.versionid)
    }
    header = this._getHeaderBase(headerRes, bomTableRes)
    if (this.isExportPrice) {
      // eslint-disable-next-line no-magic-numbers
      header['sku_cost'] = (
        bomTableRes.skuCost
        && Array.isArray(bomTableRes.skuCost)
        && bomTableRes.skuCost.find((obj) => obj.hasOwnProperty(this.sku))
      ) ? bomTableRes.skuCost.find((obj) => obj.hasOwnProperty(this.sku))[this.sku] : 0
    }
    return header
  }
  _getItemBase(item){
    return {
      'sku_qty': !_.isNil(item[this.sku]) ? parseFloat(item[this.sku]) : null,
      'level': item.level,
      'part_number': item.part_number,
      'part_name': item.part_name,
      'part_name_highlight': false,
      'last_price_up': null,
      'valid_from': null,
      'is_valid_price': null,
      'clean_sheet_cost_up': null,
      'spa_cost_up': null,
      'spa_part_number': null,
      'sourcer_shipping': null,
      'sourcer_pl': null,
      'sourcer_assembly': null,
      'sourcer_cost_up': null,
      'sourcer_cost_sku_amount': null,
      'sourcer_remark': item.sourcer_remark,
      'ce_shipping': null,
      'ce_pl': null,
      'ce_assembly': null,
      'inquiry_cost_up': null,
      'ce_cost_up': null,
      'ce_cost_sku_amount': null,
      'ce_remark': item.ce_remark,
      'initaddmodidel': item.initaddmodidel,
      'owner': item.owner,
      'odm_oem': item.odm_oem,
      'gb_assy_ctgy': item.gb_assy_ctgy,
      'func_ctgy': item.func_ctgy,
      'parts_ctgy_1': item.parts_ctgy_1,
      'parts_ctgy_2': item.parts_ctgy_2,
      'material_spec': item.material_spec,
      'material': item.material,
      'part_size_l': item.part_size_l,
      'part_size_w': item.part_size_w,
      'part_size_h': item.part_size_h,
      'part_size_ef': item.part_size_ef,
      'part_size_m': item.part_size_m,
      'part_size_l2': item.part_size_l2,
      'part_size_w2': item.part_size_w2,
      'thickness': item.thickness,
      'part_weight': item.part_weight,
      'remark': item.remark,
      'update_time': item.update_time,
      'id': item.id,
      'emdm_id': item.emdm_id,
      'has_child': item.has_child, // spaceRate用
    }
  }
  /**
   * 產生 bom item
   * @param {*} bomTableRes bom project
   */
  async _parseBomTable(bomTableRes) {
    let bomTable = []
    await asyncForEach(bomTableRes.bomItems, async (item) => {
      let obj = this._getItemBase(item)
      if (this.isExportPrice) {
        let priceKeys = [ // 價格有關的key
          ['last_price_up',       'lastPrice'],
          ['valid_from',          ''],
          ['is_valid_price',      ''], // 是否有效價格，僅判斷last_price_up的刪除線用，不會在export時出現
          ['clean_sheet_cost_up', 'cleanSheetCost'],
          ['spa_cost_up',         'SPACost'],
          ['spa_part_number',     ''],
          ['ce_shipping',         'ceShipping'],
          ['ce_pl',               'cePL'],
          ['ce_assembly',         'ceAssembly'],
          ['ce_cost_sku_amount',  'ceCostSKU'],
          ['inquiry_cost_up',     'inquiryCostUP'],
          ['ce_cost_up',          'ceCostUP'],
        ]
        await asyncForEach(priceKeys, async (keyItem) => {
          let key = keyItem[0]
          let floatKey = keyItem[1]
          switch (key) {
            case 'spa_part_number':
              obj[key] = item.material_name // item.material_name => spa P/N
              break
            case 'is_valid_price':
              obj[key] = (item.hasOwnProperty('tooltip') && item.tooltip.last_price.hasOwnProperty(key)) ? item.tooltip.last_price[key] : null
              break
            case 'valid_from':
              obj[key] = item[key]
              break
            case 'last_price_up':
              // last price 有原始幣別時 優先使用
              if (item.ori_last_price_curr && item.ori_last_price_curr !== 'USD') {
                obj[key] = item[key] ? await this._exchangeCurrency(item.ori_last_price_curr, this.currency, parseFloat(item.ori_last_price_up), meFloatPoint.get(floatKey || 'default')) : null
              } else if (!_.isNil(item[key]) && item[key] !== '-') {
                obj[key] = item[key] ? await this._exchangeCurrency('USD', this.currency, parseFloat(item[key]), meFloatPoint.get(floatKey || 'default')) : null
              } else {
                obj[key] = item[key]
              }
              break
            case 'ce_pl':
              // eslint-disable-next-line no-magic-numbers
              obj[key] = item[key] && item[key] !== '-' ? await this._exchangeCurrency('USD', this.currency, parseFloat(item[key]), meFloatPoint.get(floatKey || 'default')) : 0
              break
            case 'clean_sheet_cost_up':
              if (item[key]){
                if (item[key] === '-'){
                  obj[key] = item[key]
                } else {
                  obj[key] = await this._exchangeCurrency('USD', this.currency, parseFloat(item[key]), meFloatPoint.get(floatKey || 'default'))
                }
              } else {
                obj[key] = null
              }
              break
            default:
              obj[key] = item[key] && item[key] !== '-' ? await this._exchangeCurrency('USD', this.currency, parseFloat(item[key]), meFloatPoint.get(floatKey || 'default')) : null
              break
          }
        })
        // sourcer cost 有原始幣別時 優先使用
        await asyncForEach(sourcerExchangeColumnList, async (key) => {
          let priceKey = key[0]
          let oriKey = key[1]
          let floatKey = key[2]
          if (item[oriKey]) {
            obj[priceKey] = await this._exchangeCurrency(item.sourcer_import_curr, this.currency, parseFloat(item[oriKey]), meFloatPoint.get(floatKey))
          } else if (item[priceKey]) {
            obj[priceKey] = await this._exchangeCurrency('USD', this.currency, parseFloat(item[priceKey]), meFloatPoint.get(floatKey))
          }
        })
        if (item['ori_sourcer_cost_up']) {
          obj['sourcer_cost_sku_amount'] = await this._exchangeCurrency(item.sourcer_import_curr, this.currency, parseFloat(item['ori_sourcer_cost_up']) * parseFloat(item[this.sku]), meFloatPoint.get('sourcerCostUP'))
        } else if (item['sourcer_cost_sku_amount']) {
          obj['sourcer_cost_sku_amount'] = await this._exchangeCurrency('USD', this.currency, parseFloat(item['sourcer_cost_sku_amount']), meFloatPoint.get('sourcerCostUP'))
        }
        let isLastPrice = MeBomExport._lastPriceRule(obj)
        let isCleanSheet = MeBomExport._cleanSheetCostRule(obj)
        let isOtherFill = MeBomExport._otherFillMeRemarkRule(obj)
        let isBaseRule = MeBomExport._baseRule(item, this.sku)
        obj.part_name_highlight = isBaseRule && !isLastPrice && !isCleanSheet && !isOtherFill // rd空格 及 other fill 黃底
      }
      bomTable.push(obj)
    })
    return bomTable
  }
  async _getSpaceRate(meItem){
    let rdTotalSpace = 0
    let othrtFillMeRemarkCount = 0
    let levelCountObj = {}
    let totalSpaceCount = 0
    let lastPriceCount = 0
    let cleanSheetCount = 0
    for (let i = 2 ; i <= 9 ; i++) {
      levelCountObj[i] = {
        'itemTotalCount': 0,
        'itemWithoutParentCount': 0,
        'sourcerSpaceCount': 0,
      }
    }
    let debugList = {
      space:[],
      lastPrice:[],
      otherFill:[],
    }
    for(let item of meItem) {
      let isBase = MeBomExport._baseRule(item, this.sku)
      let isLastPrice = MeBomExport._lastPriceRule(item)
      let isOtherFill = MeBomExport._otherFillMeRemarkRule(item)
      let isCleanSheet = MeBomExport._cleanSheetCostRule(item)
      if (MeBomExport._hasQty(item, this.sku)) {
        if (levelCountObj.hasOwnProperty(item.level)) {
          levelCountObj[item.level].itemTotalCount++
          if(!item.has_child){
            levelCountObj[item.level].itemWithoutParentCount++
          }
          if(_.isNull(item.sourcer_cost_up) && !isLastPrice) {
            levelCountObj[item.level].sourcerSpaceCount++
          }
        }
      }
      if (isBase) {
        totalSpaceCount++
        if(isOtherFill){
          debugList.otherFill.push(item.part_name)
          othrtFillMeRemarkCount++
        } else if(isCleanSheet){
          cleanSheetCount++
        }else if (isLastPrice) {
          debugList.lastPrice.push(item.part_name)
          lastPriceCount++
        }
        if(!isLastPrice && !isOtherFill && !isCleanSheet){
          debugList.space.push(item.part_name)
          rdTotalSpace++
        }
      }
    }
    logger.debug('[_getSpaceRate] debugInfo:', debugList)
    let bomList = []
    let itemTotalCountSum = 0
    let itemWithoutParentCountSum = 0
    let sourcerSpaceCountSum = 0
    for(let level in levelCountObj){
      if (!levelCountObj.hasOwnProperty(level)) {
        continue
      }
      let levelItem = levelCountObj[level]
      bomList.push(this._getSpaceRateBomListBaseObj(
        `${level}階`,
        levelItem.itemTotalCount,
        levelItem.itemWithoutParentCount,
        levelItem.sourcerSpaceCount
      ))
      itemTotalCountSum += levelItem.itemTotalCount
      itemWithoutParentCountSum += levelItem.itemWithoutParentCount
      sourcerSpaceCountSum += levelItem.sourcerSpaceCount
    }
    bomList.push(this._getSpaceRateBomListBaseObj(
      'Total item數量',
      itemTotalCountSum,
      itemWithoutParentCountSum,
      sourcerSpaceCountSum
    ))
    return {
      'bom':{
        'rd_space': rdTotalSpace,
        'new_material': othrtFillMeRemarkCount,
        'bom_list': bomList,
      },
      'cost': [
        {
          'count': totalSpaceCount,
          'last_price_count': lastPriceCount,
          'clean_sheet_count': cleanSheetCount,
        },
      ],
    }
  }
  _getSpaceRateBomListBaseObj(stage, itemTotalCount, itemWithoutParentCount, sourerSpaceCount) {
    return {
      'stage': stage ? stage : '',
      'bom_item_include': itemTotalCount ? itemTotalCount : 0,
      'bom_item_not_include': itemWithoutParentCount ? itemWithoutParentCount : 0,
      'sourcer_space': sourerSpaceCount ? sourerSpaceCount : 0,
    }
  }
  _getSpaceRateDetail(meItem, maxLevel = 2) {
    let result = {
      'total_summary':[],
      'total_summary_detail':[],
    }
    let meItemGroup = {}
    meItem.forEach((item) => {
      if(item.level <= maxLevel && MeBomExport._isODM(item)) {
        if (!meItemGroup.hasOwnProperty(item.parts_ctgy_1)){
          meItemGroup[item.parts_ctgy_1] = {}
        }
        if (!meItemGroup[item.parts_ctgy_1].hasOwnProperty(item.parts_ctgy_2)){
          meItemGroup[item.parts_ctgy_1][item.parts_ctgy_2] = []
        }
        meItemGroup[item.parts_ctgy_1][item.parts_ctgy_2].push(item)
      }
    })
    let skuSum = 0 // sku 加總
    let ceCostSum = 0 // ce Cost 加總
    let courcerCostSum = 0 // sourcer cost加總
    let ctgy1KeyList = Object.keys(meItemGroup)

    ctgy1KeyList.sort()
    ctgy1KeyList.forEach((ctgyKey1) => {
      let skuSumL1 = 0 // category 1 sku 加總
      let ceCostSumL1 = 0 // category 1 ce Cost 加總
      let courcerCostSumL1 = 0 // category 1 sourcer cost加總
      let isShowTagL1 = true // 是否印出 category 1 名稱
      let ctgy2ItemList = meItemGroup[ctgyKey1]
      let ctgy2KeyList = Object.keys(ctgy2ItemList)

      ctgy2KeyList.sort()
      ctgy2KeyList.forEach((ctgyKey2) => {
        let skuSumL2 = 0 // category 2 sku 加總
        let ceCostSumL2 = 0 // category 2 ce Cost 加總
        let courcerCostSumL2 = 0 // category 2 sourcer cost加總
        let isShowTagL2 = true // 是否印出 category 2 名稱
        let itemList = meItemGroup[ctgyKey1][ctgyKey2]

        itemList.forEach((item) => {
          let ctgy1 = isShowTagL1 ? ctgyKey1 : ''
          let ctgy2 = isShowTagL2 ? ctgyKey2 : ''
          result.total_summary_detail.push(
            this._getSpaceRateDetailBaseObj(
              ctgy1,
              ctgy2,
              item.part_name,
              item[this.sku],
              item.ce_cost_sku_amount,
              item.sourcer_cost_sku_amount
            )
          )
          isShowTagL1 = false
          isShowTagL2 = false
          skuSumL2 += parseFloat(item[this.sku])
          ceCostSumL2 += item.ce_cost_sku_amount
          courcerCostSumL2 += item.sourcer_cost_sku_amount
        })

        result.total_summary_detail.push(
          this._getSpaceRateDetailBaseObj(
            '',
            `${ctgyKey2} 合計`,
            '',
            skuSumL2,
            ceCostSumL2,
            courcerCostSumL2
          )
        )
        skuSumL1 += skuSumL2
        ceCostSumL1 += ceCostSumL2
        courcerCostSumL1 += courcerCostSumL2
      })

      result.total_summary.push(
        this._getSpaceRateDetailBaseObj(
          ctgyKey1,
          '',
          '',
          skuSumL1,
          ceCostSumL1,
          courcerCostSumL1
        )
      )
      result.total_summary_detail.push(
        this._getSpaceRateDetailBaseObj(
          `${ctgyKey1} 合計`,
          '',
          '',
          skuSumL1,
          ceCostSumL1,
          courcerCostSumL1
        )
      )
      skuSum += skuSumL1
      ceCostSum += ceCostSumL1
      courcerCostSum += courcerCostSumL1
    })

    let finalSumItem = this._getSpaceRateDetailBaseObj(
      '總計',
      '',
      '',
      skuSum,
      ceCostSum,
      courcerCostSum
    )
    result.total_summary.push(finalSumItem)
    result.total_summary_detail.push(finalSumItem)
    return result
  }
  _getSpaceRateDetailBaseObj(ctgy1, ctgy2, name, sku, ceCost, SuorcerCost){
    let obj = {
      'part_category1': ctgy1 ? ctgy1 : '',
      'part_category2': ctgy2 ? ctgy2 : '',
      'part_name': name ? name : '',
      'sku1_total': sku ? formatFloat(sku, meFloatPoint.get('SKU')) : 0,
      'ce_cost_total': 0,
      'sourcer_cost_total': 0,
      'gap': 0,
    }
    if (this.isExportPrice) {
      if (ceCost) {
        obj.ce_cost_total = formatFloat(ceCost, meFloatPoint.get('default'))
      } else {
        obj.ce_cost_total = 0
      }
      if(SuorcerCost) {
        obj.sourcer_cost_total = formatFloat(SuorcerCost, meFloatPoint.get('sourcerCostUP'))
      } else {
        obj.sourcer_cost_total = 0
      }
      obj.gap = formatFloat((obj.ce_cost_total - obj.sourcer_cost_total), meFloatPoint.get('default'))
    }
    return obj
  }

  /**
   * 產生 bom item 原始幣別資訊
   * @param {*} bomTableRes bom project
   */
  async _parseOriCurrTable(bomTableRes) {
    let oriBomTable = []
    let getObj = (item) => {
      return {
        'sku_qty': !_.isNil(item[this.sku]) ? parseFloat(item[this.sku]) : null,
        'level': item.level,
        'part_number': item.part_number,
        'part_name': item.part_name,
        'ori_curr_last_price': null,
        'ori_last_price_up': (!_.isNil(item.last_price_up) && item.last_price_up !== '-') ? parseFloat(item.last_price_up) : item.last_price_up,
        'validDate': item.valid_from,
        'ori_curr_clean_sheet_cost': (item.clean_sheet_cost_up && item.clean_sheet_cost_up !== '-') ? 'USD' : null,
        'ori_clean_sheet_cost_up': item.clean_sheet_cost_up,
        'ori_curr_spa': item.spa_cost_up ? 'USD' : null,
        'ori_spa_cost_up': item.spa_cost_up,
        'spa_material_name': item.material_name,
        'ori_curr_sourcer': item.sourcer_import_curr ? item.sourcer_import_curr : null,
        'ori_sourcer_shipping': null,
        'ori_sourcer_pl': null,
        'ori_sourcer_assembly': null,
        'ori_sourcer_cost_up': null,
        'ori_sourcer_cost_sku_amount': null,
        'sourcer_remark': item.sourcer_remark,
        'ori_curr_ce': null,
        'ori_ce_shipping': item.ce_shipping,
        'ori_ce_pl': item.ce_pl,
        'ori_ce_assembly': item.ce_assembly,
        'ori_inquiry_cost_up': item.inquiry_cost_up,
        'ori_ce_cost_up': item.ce_cost_up,
        'ori_ce_cost_sku_amount': item.ce_cost_sku_amount,
        'ce_remark': item.ce_remark,
        'update_time': item.update_time,
        'id': item.id,
        'is_valid_price': item.tooltip.last_price.hasOwnProperty('is_valid_price') ? item.tooltip.last_price['is_valid_price'] : null,
      }
    }
    await asyncForEach(bomTableRes.bomItems, async (item) => {
      let obj = getObj(item)
      // last_price 有 原幣別資訊時 優先使用
      if (item.ori_last_price_curr && item.ori_last_price_curr !== 'USD') {
        obj['ori_curr_last_price'] = item.ori_last_price_curr
        obj['ori_last_price_up'] = formatFloat(parseFloat(item.ori_last_price_up), meFloatPoint.get('lastPrice'))
      } else if(obj['ori_last_price_up'] && obj['ori_last_price_up'] !== '-') {
        obj['ori_curr_last_price'] = 'USD'
      }
      await asyncForEach(sourcerExchangeColumnList, async (key) => {
        let priceKey = key[0]
        let oriKey = key[1]
        let floatKey = key[2]
        if (item[oriKey]) {
          obj[oriKey] = formatFloat(item[oriKey], meFloatPoint.get('lastPrice'))
        } else if (item[priceKey]) {
          if (!obj.ori_curr_sourcer) {
            obj.ori_curr_sourcer = 'USD'
          }
          obj[oriKey] = await this._exchangeCurrency('USD', obj.ori_curr_sourcer, parseFloat(item[priceKey]), meFloatPoint.get(floatKey))
        }
      })

      if (item['ori_sourcer_cost_up']) {
        obj['ori_sourcer_cost_sku_amount'] = formatFloat(item.ori_sourcer_cost_up * parseFloat(item[this.sku]), meFloatPoint.get('sourcerCostSKU'))
      } else if (item['sourcer_cost_sku_amount']) {
        if (!obj.ori_curr_sourcer) {
          obj.ori_curr_sourcer = 'USD'
        }
        obj['ori_sourcer_cost_sku_amount'] = await this._exchangeCurrency('USD', obj.ori_curr_sourcer, parseFloat(item['sourcer_cost_sku_amount']), meFloatPoint.get('sourcerCostSKU'))
      }
      // ce_cost
      let ceKeys = [
        'ori_ce_shipping',
        'ori_ce_pl',
        'ori_ce_assembly',
        'ori_inquiry_cost_up',
        'ori_ce_cost_up',
        'ori_ce_cost_sku_amount',
      ]
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && ceKeys.find((ceKey) => ceKey === key)) {
          const element = obj[key]
          if (element && element !== '-') {
            obj['ori_curr_ce'] = 'USD'
            break
          }
        }
      }

      oriBomTable.push(obj)
    })
    return oriBomTable
  }
  /**
   * 產生 有用到的 匯率
   * @param {array} oriBomTable bom item 原始幣別資訊
   */
  async _parseExchangeTable(oriBomTable) {
    let exchangeRateTable = []
    let exchangeRateMap = new Map()
    let currKeys = [
      'ori_curr_last_price',
      'ori_curr_clean_sheet_cost',
      'ori_curr_spa',
      'ori_curr_sourcer',
      'ori_curr_ce',
    ]
    await asyncForEach(oriBomTable, async (item) => {
      await asyncForEach(currKeys, async (key) => {
        let from = item[key]
        let to = this.currency
        if (from && from !== to) {
          let rateKey = `${from}_${to}`
          if (!exchangeRateMap.has(rateKey)) {
            let rateRes = await this._getExchangeRate(from, to)
            exchangeRateMap.set(rateKey, 1)
            exchangeRateTable.push({
              'from': from,
              'to': to,
              'sap_exchange_rate': parseFloat(rateRes.exange_rate, meFloatPoint.get('exchangeRate')),
              'date': rateRes.date,
            })
          }
        }
      })
    })
    return exchangeRateTable
  }
  /**
   * 轉換幣別
   * @param {string} from 來源幣別 例:USD
   * @param {string} to 目標幣別 例:RMB
   * @param {number} value 金額
   */
  async _exchangeCurrency(from, to, value, floatPoint) {
    if (from === to) {
      return value
    }
    // eslint-disable-next-line no-magic-numbers
    let rate = await this._getExchangeRate(from, to, floatPoint * 2) // 傳換金額時使用兩倍精度
    return formatFloat(value * rate.exange_rate, floatPoint)
  }
  /**
   * 取得匯率資訊
   * @param {string} from 來源幣別 例:USD
   * @param {string} to 目標幣別 例:RMB
   */
  async _getExchangeRate(from, to) {
    let key = `${from}_${to}`
    if (!from || !to) {
      logger.error(`Unexpect get exchange from_to:${key}.`, new Error().stack)
      throwApiError('exchange error', errorCode.INTERNAL_ERROR)
    }
    let result = null
    if (this.exchangeRateCache.has(key)) {
      result = this.exchangeRateCache.get(key)
    } else {
      let res = await spendingModel.getCurrencys(from, to, moment(this.exchangeRateDate).format('YYYYMMDD'))
      result = res[0]
      this.exchangeRateCache.set(key, result)
    }
    logger.debug(key, ':', result)
    return result
  }

  static _hasQty(item, sku) {
    return item[sku] != '0'
  }

  static _isChild(item){
    return !item.partInfo.haschild
  }

  static _isODM(item){
    return !item.partInfo.noNeedByOdmOem
  }

  static _isFormate(item){
    return !item.partInfo.noFormate
  }

  static _baseRule(item, sku) {
    return this._hasQty(item, sku) && this._isChild(item) && this._isODM(item) && this._isFormate(item)
  }
  static _lastPriceRule(item) {
    return !_.isNull(item.last_price_up)
  }
  static _cleanSheetCostRule(item) {
    return !_.isNull(item.clean_sheet_cost_up) && item.clean_sheet_cost_up !== '-'
  }
  static _otherFillMeRemarkRule(item) {
    // let isOtherFillMeRemark = item.partInfo.isOtherFillMeRemark
    return item.clean_sheet_cost_up === '-' // || isOtherFillMeRemark
  }
  async generateAllBomResult(baseBomId){
    let projectInfo = []
    let permissionRes = await this._checkPermission() // 檢查權限
    if (permissionRes.error){
      throwApiError(permissionRes.error[0], permissionRes.error[1])
    } else {
      this.isExportPrice = permissionRes.isExportPrice
    }
    this.exchangeRateDate = await bomItemService.getExchangeRateDate(this.bomId, this.versionid) // 選擇匯率日期
    let bomTableRes = await this._getBomTable() // 取得bom project
    projectInfo = await this._getHeader(bomTableRes) // 取得 專案資訊
    let totalCount = 0 // Total Clean Sheet 不含 QTY = 0, 母階, OEM/TBD
    // let lastPriceCount = 0 // 有 last price 的項目
    let otherFillMeRemarkCount = 0 // 新材料&製程
    // let cleanSheetCostCount = 0 // 有算出價格的項目
    let spaceCount = 0 // 空格項目
    let lastPriceCount = 0
    let spacePartInfo = []

    for (let item of bomTableRes.bomItems) {
      let isBase = MeBomExport._baseRule(item, this.sku)
      if (isBase) {
        totalCount++
        let isLastPrice = MeBomExport._lastPriceRule(item)
        let isOtherFill = MeBomExport._otherFillMeRemarkRule(item)
        let isCleanSheet = MeBomExport._cleanSheetCostRule(item)
        if(isOtherFill) {
          otherFillMeRemarkCount++
        }if (!isCleanSheet && isLastPrice) {
          lastPriceCount++
        }
        if(!isOtherFill && !isCleanSheet && !isLastPrice) {
          spaceCount++
          spacePartInfo.push(item.part_info)
        }
      }
    }
    let spaceRate = (totalCount - lastPriceCount) > 0 ? formatFloat(((spaceCount + otherFillMeRemarkCount) / (totalCount - lastPriceCount)), 4) : 0
    return{
      'no': baseBomId,
      'product': projectInfo.product,
      'project_name': projectInfo.project_name,
      'project_code': projectInfo.project_code,
      'customer': projectInfo.customer,
      'stage_name': projectInfo.stage_name,
      'site_name': projectInfo.site_name,
      'emdm_version': projectInfo.emdm_version,
      'version': projectInfo.version,
      'create_time': projectInfo.create_time,
      'space_rate': spaceRate,
      'rd_space_count': spaceCount,
      'other_fill_me_remark_count': otherFillMeRemarkCount,
    }
  }
}

module.exports = MeBomExport
