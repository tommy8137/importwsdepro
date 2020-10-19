const formulaService = require('../../service/utils/formula')
const partListSvc = require('../../service/bom/partList')
const meBomCost = require('../../utils/cost/meBomCost')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('ApiFormulaUtil')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const traverse = require('traverse')
const _ForEach = require('lodash/forEach')
const _Set = require('lodash/set')
const _UniqBy = require('lodash/uniqBy')
const _fpSet = require('lodash/fp/set')
const _fpGet = require('lodash/fp/get')
const { getPartlistConfig } = require('../../model/bom/bomPartList')
const { asyncForEach } = require('../../helpers/utils')
const { suggestionCostType } = require('../../../config.js')
const UUID = require('uuid/v4')


function handleEval(func, rest = []) {
  try {
    // eslint-disable-next-line no-eval
    return eval(func)(...rest)
  } catch (err) {
    logger.warn('error request for eval', err)
  }
  return null
}

/**
 * 統一處理取值邏輯  default/defaultCalc/idKeys
 * 取值邏輯前後端須一致
 * @param {*} item layout object
 * @param {*} cmfForm 來自emdm而來的 cmfForm data
 * @param {*} partItemInfo bom item info
 */
function getFieldValue(layoutItem, cmfForm, bomItemInfo, layout, rootLayout = {}) {
  const { productType } = bomItemInfo
  const {
    fieldType,
    emdmKey = '',
    key,
    defaultCalc = '',
    default: defaultVal = '',
    selectorConfig = {},
    replaceBy = [],
    func = '',
  } = layoutItem

  const selectorValues = _fpGet(['values'])(selectorConfig) || false
  const idKey = _fpGet(['idKey'])(selectorConfig) || ''
  const defaultValues = _fpGet(['defaultValues'])(layoutItem) || []
  let fieldValue = _fpGet(emdmKey)(cmfForm)
  let defaultValue = defaultCalc ? handleEval(defaultCalc, [defaultVal, bomItemInfo, defaultValues]) : defaultVal



  // 如果在 cmfForm 找不到的話，就用預設值
  let value = fieldValue || defaultValue

  // 如果遇到下拉，用idKey去找到uuid, 取得他下拉選擇到的選項
  if (selectorValues && idKey && fieldType === 'selector') {
    const mappedItem = selectorValues.find(o => o[idKey] == value)
    value = mappedItem ? mappedItem[layoutItem.key] : value
  }

  // 判斷他是否是可以被其他欄位replace的欄位
  // 畫面而言是一個可以改有可以自動代的欄位

  let isReplaceField = (fieldType === 'input' && replaceBy.length && func) || fieldType === 'realtimeFormula'


  if (isReplaceField) {
    const params = replaceBy.map((k) => {
      // 如果找不到layout, 就從最大一層裡面找
      const layoutObj = findLayoutObj(layout, k) || findLayoutObj(rootLayout, k)


      if (layoutObj) {
        const val = getFieldValue(layoutObj, cmfForm, bomItemInfo)
        return val
      }
      return null
    })

    const replaceByValue = handleEval(func, params)

    if (replaceByValue !== null) {
      value = replaceByValue
    }
  }

  return value
}


/**
 * 用key來找layout object
 * @param {Object} layout 整個layout object
 * @param {String} key key名稱
 */
function findLayoutObj(layout, key) {
  const findedObj = traverse(layout).reduce(function r(acc, item) {
    if (item && item.key === key) {
      this.stop()
      return item
    }
    return acc
  }, null)
  return findedObj
}

function getPriceData(formData, layout) {
  const treeGroup = traverse(layout).reduce(function r(acc, item) {
    if (this.isLeaf || !item.key || !item.group) return acc
    return { ...acc, [item.key]: item }
  }, {})
  return traverse(formData).reduce(function r(acc, item) {
    if (!this.isLeaf || !this.key || this.key === 'uuid') return acc
    const isArrayNode = this.parent && Array.isArray(this.parent.node) && typeof item !== 'object'
    let nowPath = this.path
    if (isArrayNode) {
      nowPath = this.parent.path
    }
    const groupPath = nowPath.reduce((groupPathConfig, path, index) => {
      const fieldConfig = treeGroup[path]
      if (!fieldConfig) return groupPathConfig
      const uuid = fieldConfig.multiple ? _fpGet(nowPath.slice(0, index + 2))(formData).uuid : null
      const layoutKey = (fieldConfig.multiple && fieldConfig.multipleItems) ? _fpGet(nowPath.slice(0, index + 2))(formData).layoutKey : null
      if (uuid) {
        if (layoutKey) {
          const field = fieldConfig.multipleItems.find(d => d.item === layoutKey)
          const tempPath = field.group ? `${field.group}-${uuid}` : `${treeGroup[path].group}-${uuid}`
          return {
            pathArr: groupPathConfig.pathArr.concat(tempPath),
            parentUUID: uuid,
          }
        }
        const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}-${uuid}` : `${treeGroup[path].group}-${uuid}`
        return {
          pathArr: groupPathConfig.pathArr.concat(tempPath),
          parentUUID: uuid,
        }
      }
      const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}` : treeGroup[path].group
      return {
        ...groupPathConfig,
        pathArr: groupPathConfig.pathArr.concat(tempPath),
      }
    }, { pathArr: [], parentUUID: null })
    if (isArrayNode) {
      return _fpSet(groupPath.pathArr.concat(this.parent.key), this.parent.node)(acc)
    }
    // if (this.key.endsWith('Switch')) {
    //   return _fpSet(groupPath.pathArr.concat(this.key.split('Switch')[0]), item)(acc);
    // }
    return _fpSet(groupPath.pathArr.concat(this.key), item)(acc)
  }, {})
}

const PARTLIST_STATUS = {
  NORMAL: 0,
  ITEMS: 1,
  MULTIPLE_ITEMS: 2,
}

function layoutTraverse(l, d, parent, nestedParent, data, type = PARTLIST_STATUS.NORMAL, layoutKey = '', totalCount = 0, partItemInfo = {}, rootLayout = l) {
  l.forEach(i => {
    if (i.multipleItems && Array.isArray(i.multipleItems)) {
      let path = parent.concat(i.key)

      const itemsLength = i.multipleItems.map(mi => (_fpGet(mi.emdmMultipleKey)(data) || []).length)
      _Set(d, path, [])
      i.multipleItems.forEach((mi, idx) => {
        const nowAccCount = itemsLength.slice(0, idx + 1).reduce((sum, count) => sum + count, 0)
        layoutTraverse(mi.layout, d, path, [], data, PARTLIST_STATUS.MULTIPLE_ITEMS, mi.item, nowAccCount, partItemInfo, rootLayout)
      })
    } else if (i.items && Array.isArray(i.items)) {
      let path = i.fieldType === 'compositeInline' ? parent : parent.concat(i.key)
      let status = i.multiple ? PARTLIST_STATUS.ITEMS : PARTLIST_STATUS.NORMAL
      if (i.multiple) _Set(d, path, [])
      layoutTraverse(i.items, d, path, (i.fieldType === 'compositeInline' ? [i.key] : []), data, type !== PARTLIST_STATUS.NORMAL ? type : status, layoutKey, totalCount, partItemInfo, rootLayout)
    } else {
      if (type === PARTLIST_STATUS.NORMAL) {
        let value = getFieldValue(i, data, partItemInfo, l, rootLayout)

        if ((i.selectorConfig && i.selectorConfig.values && i.selectorConfig.values.length && i.fieldType === 'selector')) {
          const mappedItem = i.selectorConfig.values.find(o => o[i.selectorConfig.idKey] == value)
          value = mappedItem ? mappedItem[i.key] : value
        }

        _Set(d, parent.concat(nestedParent).concat(i.key), value)
      } else if (type === PARTLIST_STATUS.ITEMS && i.emdmMultipleKey) {
        let items = _fpGet(i.emdmMultipleKey)(data) || []
        items.forEach((item, idx) => {
          let value = getFieldValue(i, item, partItemInfo, l, rootLayout)

          _Set(d, parent.concat(idx).concat('uuid'), UUID())
          _Set(d, parent.concat(idx).concat(nestedParent).concat(i.key), value)
        })
      } else if (type === PARTLIST_STATUS.MULTIPLE_ITEMS && i.emdmMultipleKey) {
        let items = _fpGet(i.emdmMultipleKey)(data) || []

        items.forEach((item, idx) => {
          let value = getFieldValue(i, item, partItemInfo, l, rootLayout)
          if (layoutKey) {
            _Set(d, parent.concat(idx + (totalCount - items.length)).concat('layoutKey'), layoutKey)
          }
          _Set(d, parent.concat(idx + (totalCount - items.length)).concat('uuid'), UUID())
          _Set(d, parent.concat(idx + (totalCount - items.length)).concat(nestedParent).concat(i.key), value)
        })
      }

    }
  })
}

const avaiablePartlist = [
  'housing-plastic',
  'housing-metal',
  'thermal-module',
  'thermal-pad',
  'thermal-fan',
  'die-cut',
  'cable-wire',
  'cable-ffc',
  'cable-fpc',
  'emc-magnet',
  'thermal-graphite',
  'meothers-rubber',
  'meothers-nut',
  'meothers-standoff',
  'meothers-screw',
  'thermal-fan',
  'thermal-pad',

]

class Formula {
  async getPriceObj(ctx) {
    const { request: { body: { formData, layout } } } = ctx
    ctx.body = getPriceData(formData, layout)
    ctx.status = 200
    // } else {
    //   throwApiError('No Data', errorCode.DATANOTFOUND)
    //   return
    // }
  }

  async calculatePrice(ctx) {
    // part_category_1, part_category_2, format 的對應表
    const partlistConfig = await getPartlistConfig()
    const data = ctx.request.body.partlistPayload
    const projectInfo = ctx.request.body.bomInfo

    // 開始計算價格
    let catchedLayouts = {}
    const bomInfo = []
    await asyncForEach(data, async (item) => {
      // rename part number for last price
      if (item.hasOwnProperty('emdmBomInfo')) {
        item.emdmBomInfo.part_number = item.emdmBomInfo.commonPart ? item.emdmBomInfo.commonPart : item.emdmBomInfo.wpn ? item.emdmBomInfo.wpn : null
        // suggestion_cost_type 寫入預設值
        item.emdmBomInfo.suggestion_cost_type = (item.emdmBomInfo.suggestion_cost_type) ? item.emdmBomInfo.suggestion_cost_type : suggestionCostType.defaultType
      }
      // 找到對應的 format 及 layout
      const partlist = partlistConfig.find(i => i.part_category_1_id === item.emdmBomInfo.partCategory1Id && i.part_category_2_id === item.emdmBomInfo.partCategory2Id)

      if (!partlist || !partlist.format || !avaiablePartlist.includes(partlist.format)) {
        bomInfo.push({
          ...item.emdmBomInfo,
          priceResult: {},
          formData: {
            Price: {},
            formData: {},
            version: 'emdm_1',
          },
        })
        return
      }

      if (!catchedLayouts[partlist.format]) {
        const { layout = [], formulas, autoCalculation } = await partListSvc.getPartListLayout(partlist.format, projectInfo.productTypeId, projectInfo.productType, projectInfo.hasOlderProject)
        catchedLayouts[partlist.format] = {
          layout,
          formulas,
          autoCalculation,
        }
      }
      const layoutRes = catchedLayouts[partlist.format]

      if (!partlist.hasui) {
        const price = {
          Price: {
            [layoutRes.autoCalculation.group]: Object.keys(layoutRes.autoCalculation.keys).reduce((res, key) => ({
              ...res,
              [key]: item.emdmBomInfo[layoutRes.autoCalculation.emdmKeys[key]],
            }), {
            }),
          },
        }
        const calResult = await partListSvc.calPartlistPrice(price, layoutRes.formulas, layoutRes.layout)

        bomInfo.push({
          ...item.emdmBomInfo,
          priceResult: calResult,
          formData: {
            ...price,
            formData: {},
            version: 'emdm_1',
          },
        })
        return
      }


      // 產生 formData
      const formData = {}

      const { emdmBomInfo = {}, partItemInfo = {} } = item

      const {
        diameter,
        partHeight,
        partLong,
        partLong2,
        metric,
        partWidth,
        partWidth2,
        totalWeight,
        thickness,
      } = emdmBomInfo

      // 轉成emdm需要的bomItemInfo object
      const bomItemInfo = {
        ef: diameter,
        h: partHeight,
        l: partLong,
        l2: partLong2,
        m: metric,
        w: partWidth,
        w2: partWidth2,
        partWeight: totalWeight,
        thickness,
        ...partItemInfo,
      }

      layoutTraverse(layoutRes.layout, formData, [], [], item, PARTLIST_STATUS.NORMAL, '', 0, bomItemInfo)

      // 產生 Price 物件
      const price = {
        Price: {
          ...getPriceData(formData, layoutRes.layout),
          partItemInfo: item.partItemInfo,
        },
      }
      // 開始計算價格

      let priceResult = {}
      try {
        priceResult = await partListSvc.calPartlistPrice(price, layoutRes.formulas, layoutRes.layout)
      } catch (err) {
        bomInfo.push({
          ...item.emdmBomInfo,
          priceResult: {},
          formData: {
            ...price,
            formData,
            version: 'emdm_1',
          },
        })

        return
      }

      // 以下開放寫完資料庫
      bomInfo.push({
        ...item.emdmBomInfo,
        priceResult: priceResult,
        formData: {
          ...price,
          formData,
          version: 'emdm_1',
        },
      })
    })

    await meBomCost.getMaterialLastPrice(bomInfo, projectInfo.site)

    ctx.body = bomInfo
    ctx.status = 200
  }

  async saveFormula(ctx) {
    const { request: { body: { formula, name } } } = ctx
    const result = await formulaService.saveFormula(formula, name)
    ctx.body = result
    ctx.status = 200
  }
  async getSupplyTypeDropDownList(ctx) {
    const result = formulaService.getSupplyTypeDropDownList()
    ctx.body = result
    ctx.status = 200
  }
  async getProductTypeDropDownList(ctx) {
    const result = formulaService.getProductTypeDropDownList()
    ctx.body = result
    ctx.status = 200
  }
  getPriceData(formData, layout) {
    return getPriceData(formData, layout)
  }
}
module.exports = Formula
