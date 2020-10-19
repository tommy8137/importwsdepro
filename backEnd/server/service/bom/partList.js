/* eslint-disable no-magic-numbers */
const _ = require('lodash')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const log4js = require('../../utils/logger/logger')
const dbHelper = require('../../utils/helper/db_helper')
const partListModel = require('../../model/bom/bomPartList')
const bomManagerModel = require('../../model/bom/bomManager.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
// const { yml2json } = require('../../helpers/utils.js')
const logger = log4js.getLogger('partListService')
// const layoutPath = path.join(path.resolve(__dirname), '..', '..', '..', 'part-list-layout')
const bomItemModel = require('../../model/bom/bomItem')
const productTypeModel = require('../../model/database/productType')
// const tv = require('traverse')
// const REMOVEDKEYS = ['version']
const mkdirp = require('async-mkdirp')
const { imageLimit } = require('../../../config.js')
const { Formula } = require('./formula')
const plRouter = require('./plRouter')
const bomVersionModel = require('../../model/bom/bomVersion.js')
const fixMath = require('../../helpers/math/math.js')
const meBomUtil = require('../../utils/mebom/meBomUtils.js')
const emdmBomUtil = require('../../utils/emdmBom/emdmBomUtils.js')


const { PartListYml2JsonComposer } = require('./plYamlParser.js')
const PartListYml2JsonComposerBindThis = require('./plYamlParserBindThis.js')
const metal_glue = require('./cleansheetDatabase/housing_metal/part_list/metal_glue')
const DEFAULT_PRODUCTTYPE_INFO = {
  productTypeId : 1,
  productTypeName : 'nb',
}
const DFROOTPATH = path.join(path.resolve(__dirname), '..', '..', '..', 'part-list-layout')
const cacheHelper = require('../../utils/helper/cacheHelperDaily')// singleton

/*
const checkFileExist = (filePath) => {
  if (!fs.existsSync(filePath)) {
    logger.error(`file not exists: ${filePath}`)
    throwApiError('FILE_NOT_EXIST', errorCode.ERRORFORMAT)
  }
}

const getTemplate = (fileName = 'Template.yaml') => {
  let tmpPath = path.join(layoutPath, fileName)
  checkFileExist(tmpPath)
  return yml2json(tmpPath)
}

// not used
const getComponentsFromMain = (mainObj) => {
  let retObj = {}
  Object.keys(mainObj).forEach((k) => {
    if (!REMOVEDKEYS.includes(k.toLowerCase())) {
      mainObj[k].map((cmp) => {
        let cmpPath = path.join(layoutPath, `${cmp}.yaml`)
        checkFileExist(cmpPath)
        retObj[k] = { ...retObj[k], ...{ [cmp]: yml2json(cmpPath) } }
      })
    } else {
      retObj = { ...retObj, [k]: mainObj[k] }
    }
  })
  return retObj
}


// not used
const applyTemplate = (protoLayout) => {

  let tmpPool = getTemplate()
  let finalLayout = {}
  Object.entries(protoLayout).map((pair) => {
    if (pair[0] === 'items') {
      let items = pair[1].map((item) => {
        let tmpList = item.template || []
        let ind = {}
        tmpList.forEach((tmp) => {
          ind = { ...ind, ...tmpPool[tmp] }
        })
        return { ...ind, ...item, template: undefined }
      })
      finalLayout = { ...finalLayout, items }
    } else {
      finalLayout = { ...finalLayout, [pair[0]]: pair[1] }
    }
  })
  return finalLayout
}
// not used already replace by plYamlParser.js
const applyReplacement = (protoLayout) => {
  let needToNext = false
  let fullLayout = tv(protoLayout).map(function (item) {
    if (typeof (this.key) === 'string' && this.key.startsWith('$')) {
      needToNext = true
      let fileName = this.key.slice(1)
      let point2slash = path.join(...fileName.split('.'))
      let tmpPool = getTemplate(`${point2slash}.yaml`)
      let obj = {}
      let parentTmp = { ...this.parent.node }
      this.node.map(function (tmp) {
        let tmpKey = tmp
        if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
          tmpKey = tmp.slice(1)
        }
        if (!tmpPool.hasOwnProperty(tmpKey)) {
          logger.error(`${tmpKey} is not in ${Object.keys(tmpPool)} of ${fileName}.yaml`)
          throwApiError('PART_LIST_FORMAT_ERROR', errorCode.ERRORFORMAT)
        }
        if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
          obj = { ...obj, [tmpKey]: tmpPool[tmpKey] }
        } else {
          obj = { ...obj, ...tmpPool[tmp] }
        }
      })
      this.parent.node = { ...this.parent.node, ...obj }
      this.parent.node = { ...this.parent.node, ...parentTmp }
      this.delete(true)
    }
  })
  if (needToNext) {
    fullLayout = applyReplacement(fullLayout)
  }
  return fullLayout
} */


const calPartlistPrice = (input, formulas, layout) => {
  let cal = new Formula(input, formulas, layout)
  return cal.calPartlistPrice()
}

/**
 *  把尚未實做的product Type Id替換為NB
 * @param {Number} productTypeId
 * @param {String} productTypeName
 * @param {String} formate part list formate EX: housing-metal, cable-ffc
 * @returns {Number}
 */
async function _formatNowProductType(productTypeId, productTypeName, formate){
  const iProductTypeId = _.isNil(productTypeId) ? 1 : parseInt(productTypeId)
  let productTypeList = await productTypeModel.getProductTypeByPartlistFormat(formate) // 找出 formate 支援的productTypeId

  const findResult = productTypeList.findIndex((typeObj) => typeObj.id === iProductTypeId)
  let result = {
    'productTypeId' : iProductTypeId,
    'productTypeName': (productTypeName && typeof productTypeName === 'string') ? productTypeName.trim().toLowerCase() : 'nb',
  }
  if(findResult === -1){ // 找不到就給NB
    result = DEFAULT_PRODUCTTYPE_INFO
  }
  return result
}
/**
 * 配合product type id的更改新增的方法
 *  取得yaml layout file的path
 * @param {String} partListName
 * @param {Object} productTypeInfo
 * @returns {String} yaml layout file path
 */
function _getYamlLayoutFilePath(partListName, productTypeInfo){
  let yamlLayoutFilePath = path.join(partListName, productTypeInfo.productTypeName, `${partListName}.yaml`)
  const isFileExist = fs.existsSync(path.join(DFROOTPATH, yamlLayoutFilePath))
  const commonYamlLayoutFilePath = path.join(partListName, `${partListName}.yaml`)
  if(!isFileExist) { // 不存在就嘗試預設的product type路徑
    logger.warn(`[_getYamlLayoutFilePath] yaml path not exist path:${yamlLayoutFilePath}`)
    const nbYamlLayoutFilePath = path.join(partListName, DEFAULT_PRODUCTTYPE_INFO.productTypeName, `${partListName}.yaml`)
    let isNBFileExist = fs.existsSync(path.join(DFROOTPATH, nbYamlLayoutFilePath))
    // 預設product type路徑不存在，改採共用路徑
    yamlLayoutFilePath = (isNBFileExist) ? nbYamlLayoutFilePath : commonYamlLayoutFilePath
  }
  return yamlLayoutFilePath
}

module.exports = {
  calPartlistPrice: calPartlistPrice,
  /*
  getPartListLayout: (partListName) => {
    let layoutFile = path.join(layoutPath, partListName, `${partListName}.yaml`)
    logger.debug('layout file path:', layoutFile)
    checkFileExist(layoutFile)
    let main = yml2json(layoutFile)
    let layout = applyReplacement(main)
    return layout
  },
  */
  calPriceByAddOrUpdateMeBom: dbHelper.atomic(async (client, format, data, meBomItmeId, productTypeId, productTypeName) => {
    let bomRes = await bomVersionModel.getBomIdbyItemId(meBomItmeId)
    const formulaJson = await module.exports.getPartListLayout(format, productTypeId, productTypeName, bomRes[0].bom_id)
    const autoCalculation = formulaJson.autoCalculation
    if (!autoCalculation) return

    const price = {
      Price: {
        [autoCalculation.group]: Object.keys(autoCalculation.keys).reduce((res, key) => ({
          ...res,
          [key]: data[autoCalculation.keys[key]],
        }), {
        }),
      },
    }
    const calResult = module.exports.calPartlistPrice(price, formulaJson.formulas, formulaJson.layout)

    let saveData = {
      bom_item_id: meBomItmeId,
      update_time: moment().utc().toDate().toUTCString(),
      partlist_value: JSON.stringify(price),
      partlist_price: JSON.stringify(calResult),
    }
    await partListModel.updatePartlistById(meBomItmeId, saveData)
    await bomItemModel.updateBomItem(client, meBomItmeId, { 'system_cost': _.get(calResult, 'totalPrices', 0), 'modified_time': moment().utc().format() })
  }),
  /**
   * @param {String} partListName
   * @param {Number} productTypeId 2020/01/13增加product type id參數，預設為NB(NB的productTypeId = 1)，用於篩選partlist value
   * @param {String} productTypeName 2020/01/13增加product type name參數，預設為'nb'，用於YAML檔路徑
   * @param {Number} bomId 2020/03/16增加bomId參數，預設為-1，用於篩選partlist value
   */
  getPartListLayout: async (partListName, productTypeId = 1, productTypeName = 'nb', bomId = 0) => {
    const productTypeInfo = await _formatNowProductType(productTypeId, productTypeName, partListName)
    const yamlLayoutFilePath = _getYamlLayoutFilePath(partListName, productTypeInfo)
    logger.debug('layout file path:', yamlLayoutFilePath)
    const options = {
      productTypeId: productTypeInfo.productTypeId,
      bomId: parseInt(bomId, 10),
    }
    let composer = new PartListYml2JsonComposerBindThis( null, options)
    let layout = await composer.getJsonByYamlPathWithCache(yamlLayoutFilePath, cacheHelper)
    return layout
  },

  listPartListByBomId: async (bom_id) => {
    let listRes = await partListModel.getPartlistById(bom_id)
    return listRes
  },
  // 前端已不使用
  updatePartListByBomId: async (bom_item_id, part_type, data) => {
    // let filterData = new dbHelper.filterKeys(data).exclude(['create_time', 'bom_item_id', 'id'])
    let formulaJson = await module.exports.getPartListLayout(part_type)
    let priceResult = calPartlistPrice(data, formulaJson.formulas, formulaJson.layout)
    logger.debug('total price for the part list', priceResult)
    let saveData = {}
    saveData['bom_item_id'] = bom_item_id
    saveData['update_time'] = moment().utc().toDate().toUTCString()
    saveData['partlist_value'] = JSON.stringify(data)
    saveData['partlist_price'] = JSON.stringify(priceResult.prices)
    await partListModel.updatePartlistById(bom_item_id, saveData)
    return priceResult
  },

  getDefaultData: async (bom_id, type1, type2, key) => {
    let getData = await partListModel.getDefaultData(bom_id, type1, type2, key)
    const item = type2.substring(0, 1) + bom_id
    if(getData) {
      return {
        item: item,
        values: getData,
      }
    }else {
      return 0
    }
  },

  getDieInfo: async (hmToolingStageDieCount, hmToolingProgressiveDieCount, hmToolingRivetingDieCount) => {
    const total = parseInt(hmToolingStageDieCount) + parseInt(hmToolingProgressiveDieCount) + parseInt(hmToolingRivetingDieCount)
    let moduleType
    if (hmToolingStageDieCount > 0 && hmToolingProgressiveDieCount == 0 && hmToolingRivetingDieCount == 0) {
      moduleType = '工程模'
    } else if (hmToolingStageDieCount == 0 && hmToolingProgressiveDieCount > 0 && hmToolingRivetingDieCount == 0) {
      moduleType = '連續模'
    } else if (hmToolingStageDieCount == 0 && hmToolingProgressiveDieCount > 0 && hmToolingRivetingDieCount > 0) {
      moduleType = '連續模+鉚合模'
    } else if (hmToolingStageDieCount > 0 && hmToolingProgressiveDieCount == 0 && hmToolingRivetingDieCount > 0) {
      moduleType = '工程模+鉚合模'
    } else if (hmToolingStageDieCount > 0 && hmToolingProgressiveDieCount > 0 && hmToolingRivetingDieCount == 0) {
      moduleType = '連續模+工程模'
    } else if (hmToolingStageDieCount > 0 && hmToolingProgressiveDieCount > 0 && hmToolingRivetingDieCount > 0) {
      moduleType = '連續模+工程模+鉚合模'
    }


    return {
      values: {
        hmToolingTotalCount: total,
        hmToolingModuleMode: moduleType,
      },
    }
  },

  getMaterialExpandSize: async (materialW2, materialL2, materialW, materialL) => {
    let Weight = parseFloat(materialW2) + parseFloat(materialW)
    let Length = parseFloat(materialL2) + parseFloat(materialL)
    return {
      values: {
        hmToolingMaterialExpandWidth: Weight,
        hmToolingMaterialExpandLength: Length,
      },
    }
  },

  getNetWeight: async (thickness, materialW2, materialL2, material) => {
    let type = 'housing-metal'
    let product = 'HmMaterialDensity'
    let weight
    let formulaJson = await module.exports.getMapLayout(type, product)
    const result = formulaJson.values

    _.map(result, i => {
      if(material == i.hmmaterial) {
        weight = parseFloat(thickness) * parseFloat(materialW2) * parseFloat(materialL2) * parseFloat(i.hmmaterialdensity) / 1000
      }
    })
    return {
      values: {
        hmToolingWeight: weight,
      },
    }
  },

  getGrossWeight: async (thickness, materialW2, materialL2, material) => {
    let type = 'housing-metal'
    let product = 'HmMaterialDensity'
    let weight
    let formulaJson = await module.exports.getMapLayout(type, product)
    const result = formulaJson.values

    _.map(result, i => {
      if(material == i.hmmaterial) {
        weight = parseFloat(thickness) * parseFloat(materialW2) * parseFloat(materialL2) * parseFloat(i.hmmaterialdensity) / 1000
      }
    })
    return {
      values: {
        hmToolingMaterialWeight: weight,
      },
    }
  },

  /*
    IF(AND('工程模工程數'<=0),"0",
    IF(AND('width'*('連續模工站'+2)+220<=220,'length'+220<=220),"0",
    IF(AND('width'+220<480,'length'+220<400),"60",
    IF(AND('width'+220<560,'length'+220<440),"80",
    IF(AND('width'+220<550,'length'+220<500),"110",
    IF(AND('width'+220<720,'length'+220<580),"160",
    IF(AND('width'+220<1200,'length'+220<800),"200",
    IF(AND('width'+220<2100,'length'+220<700),"250",
    IF(AND('width'+220<3000,'length'+220<1200),"300",
    IF(AND('width'+220<4000,'length'+220<1400),"400",
    IF(AND('width'+220<4300,'length'+220<1550),"600",
    IF(AND('width'+220<5300,'length'+220<1830),"800",
  */
  getStageDiePress: async (count, w, l, s) => {
    let width = parseFloat(w)
    let length = parseFloat(l)
    let station = parseFloat(s)
    let machine
    if (count <= 0 || width * (station + 2) + 220 <= 220 && length + 220 <= 220) {
      machine = '0T'
    } else if (width + 220 < 480 && length + 220 < 400) {
      machine = '60T'
    } else if (width + 220 < 560 && length + 220 < 440) {
      machine = '80T'
    } else if (width + 220 < 550 && length + 220 < 500) {
      machine = '110T'
    } else if (width + 220 < 720 && length + 220 < 580) {
      machine = '160T'
    } else if (width + 220 < 1200 && length + 220 < 800) {
      machine = '200T'
    } else if (width + 220 < 2100 && length + 220 < 700) {
      machine = '250T'
    } else if (width + 220 < 3000 && length + 220 < 1200) {
      machine = '300T'
    } else if (width + 220 < 4000 && length + 220 < 1400) {
      machine = '400T'
    } else if (width + 220 < 4300 && length + 220 < 1550) {
      machine = '600T'
    } else if (width + 220 < 5300 && length + 220 < 1830) {
      machine = '800T'
    }
    return {
      values: {
        hmToolingStageDiePress: machine,
      },
    }

  },


  /*
    IF(AND('連續模工程數'<=1,'連續模工站'<=1),"0",
    IF(AND('width'*('連續模工站'+2)+220<480,'length'+220<400),"60",
    IF(AND('width'*('連續模工站'+2)+220<560,'length'+220<440),"80",
    IF(AND('width'*('連續模工站'+2)+220<550,'length'+220<500),"110",
    IF(AND('width'*('連續模工站'+2)+220<720,'length'+220<580),"160",
    IF(AND('width'*('連續模工站'+3)+220<1200,'length'+220<800),"200",
    IF(AND('width'*('連續模工站'+3)+220<2100,'length'+220<700),"250",
    IF(AND('width'*('連續模工站'+3)+220<3000,'length'+220<1200),"300",
    IF(AND('width'*('連續模工站'+3)+220<4000,'length'+220<1400),"400",
    IF(AND('width'*('連續模工站'+3)+220<4300,'length'+220<1550),"600",
    IF(AND('width'*('連續模工站'+3)+220<5300,'length'+220<1830),"800"
  */
  getProgressiveDiePress: async (count, s, w, l) => {
    let width = parseFloat(w)
    let length = parseFloat(l)
    let stat = parseInt(s)
    let machine
    if (count <= 1 && stat <= 1) {
      machine = '0T'
    } else if (width * (stat + 2) + 220 < 480 && length + 220 < 400) {
      machine = '60T'
    } else if (width * (stat + 2) + 220 < 560 && length + 220 < 440) {
      machine = '80T'
    } else if (width * (stat + 2) + 220 < 550 && length + 220 < 500) {
      machine = '110T'
    } else if (width * (stat + 2) + 220 < 720 && length + 220 < 580) {
      machine = '160T'
    } else if (width * (stat + 3) + 220 < 1200 && length + 220 < 800) {
      machine = '200T'
    } else if (width * (stat + 3) + 220 < 2100 && length + 220 < 700) {
      machine = '250T'
    } else if (width * (stat + 3) + 220 < 3000 && length + 220 < 1200) {
      machine = '300T'
    } else if (width * (stat + 3) + 220 < 4000 && length + 220 < 1400) {
      machine = '400T'
    } else if (width * (stat + 3) + 220 < 4300 && length + 220 < 1550) {
      machine = '600T'
    } else if (width * (stat + 3) + 220 < 5300 && length + 220 < 1830) {
      machine = '800T'
    }
    return {
      values: {
        hmToolingProgressiveDiePress: machine,
      },
    }
  },

  /*
    IF(AND('鉚合模工程數'<=0),"0",
    IF(AND('width'*('連續模工站'+2)+120<=220,'length'+120<=220),"0",
    IF(AND('width'+120<480,'length'+120<400),"60",
    IF(AND('width'+120<560,'length'+120<440),"80",
    IF(AND('width'+120<550,'length'+120<500),"110",
    IF(AND('width'+120<720,'length'+120<580),"160",
    IF(AND('width'+120<1200,'length'+120<800),"200",
    IF(AND('width'+120<2100,'length'+120<700),"250",
    IF(AND('width'+120<3000,'length'+120<1200),"300",
    IF(AND('width'+120<4000,'length'+120<1400),"400",
    IF(AND('width'+120<4300,'length'+120<1550),"600",
    IF(AND('width'+120<5300,'length'+120<1830),"800"
  */
  getRivetingDiePress: async (count, w, l, s) => {
    let width = parseFloat(w)
    let length = parseFloat(l)
    let station = parseFloat(s)
    let machine
    if (count <= 0 || width * (station + 2) + 120 <= 220 && length + 120 <= 220) {
      machine = '0T'
    } else if (width + 120 < 480 && length + 120 < 400) {
      machine = '60T'
    } else if (width + 120 < 560 && length + 120 < 440) {
      machine = '80T'
    } else if (width + 120 < 550 && length + 120 < 500) {
      machine = '110T'
    } else if (width + 120 < 720 && length + 120 < 580) {
      machine = '160T'
    } else if (width + 120 < 1200 && length + 120 < 800) {
      machine = '200T'
    } else if (width + 120 < 2100 && length + 120 < 700) {
      machine = '250T'
    } else if (width + 120 < 3000 && length + 120 < 1200) {
      machine = '300T'
    } else if (width + 120 < 4000 && length + 120 < 1400) {
      machine = '400T'
    } else if (width + 120 < 4300 && length + 120 < 1550) {
      machine = '600T'
    } else if (width + 120 < 5300 && length + 120 < 1830) {
      machine = '800T'
    }
    return {
      values: {
        hmToolingRivetingDiePress: machine,
      },
    }

  },

  getGlueWeight: async (productType, pl, dia) => {
    let pathLength = parseFloat(pl)
    let diameter = parseFloat(dia)


    const productTypeList = await productTypeModel.getProductTypeByPartlistFormat('housing-metal') // 找出 formate 支援的productTypeId
    const typeItem = productTypeList.find(typeObj => String(typeObj.name).toLocaleLowerCase().trim() === String(productType).toLocaleLowerCase().trim())
    const bindMetalGlue = metal_glue.getGlue.bind({ productTypeId: typeItem.id })
    const glue = await bindMetalGlue()
    const cmfProcessListThermalBondingGlueDensity = glue.values[0].cmfProcessListThermalBondingGlueDensity

    const total = fixMath.fixedPoint(3.1416 * (diameter / 2) * (diameter / 2) * cmfProcessListThermalBondingGlueDensity / 1000 * pathLength, 8)
    return {
      values: {
        cmfProcessListThermalBondingGlueWeight: total,
      },
    }
  },

  confirm: async (type2) => {
    let type = 'housing-plastic'
    let product = 'HPDIMaterial'
    let formulaJson = await module.exports.getMapLayout(type, product)
    const result = formulaJson.values
    if (type2 == 'Double_Injection') {
      return {
        values: result,
      }
    } else {
      return 0
    }
  },


  getPartWeightEnable: async (type2) => {
    if (type2 == 'Double_Injection') {
      return {
        values: true,
      }
    } else {
      return 0
    }
  },
  getMachineTon: async (type2, weight, length, height) => {
    let ton
    let w = parseInt(weight)
    let l = parseInt(length)
    let h = parseInt(height)
    if (type2 == 'Double_Injection') {
      if (l == 0 && w == 0 && h == 0) {
        ton = 'N/A'
      } else if (l < 460 && w < 460 && h < 445) {
        ton = '160T'
      } else if (l < 510 && w < 510 && h < 495) {
        ton = '210T'
      } else if (l < 560 && w < 560 && h < 540) {
        ton = '250T'
      } else if (l < 610 && w < 610 && h < 590) {
        ton = '300T'
      } else if (l < 655 && w < 655 && h < 635) {
        ton = '350T'
      } else if (l < 705 && w < 705 && h < 680) {
        ton = '400T'
      } else if (l < 780 && w < 780 && h < 800) {
        ton = '450T'
      } else if (l < 880 && w < 880 && h < 950) {
        ton = '600T'
      } else if (l < 1005 && w < 1005 && h < 1000) {
        ton = '800T'
      } else if (l < 1120 && w < 1120 && h < 1100) {
        ton = '1060T'
      }
    } else {
      if ((l + w) / 2 == 0 && h == 0) {
        ton = 'N/A'
      } else if ((l + w) / 2 < 360 && h < 350) {
        ton = '80T'
      } else if ((l + w) / 2 < 450 && h < 450) {
        ton = '160T'
      } else if ((l + w) / 2 < 510 && h < 510) {
        ton = '210T'
      } else if ((l + w) / 2 < 550 && h < 550) {
        ton = '250T'
      } else if ((l + w) / 2 < 700 && h < 700) {
        ton = '350T'
      } else if ((l + w) / 2 < 820 && h < 820) {
        ton = '450T'
      } else if ((l + w) / 2 < 850 && h < 850) {
        ton = '550T'
      } else if ((l + w) / 2 < 920 && h < 920) {
        ton = '650T'
      } else if ((l + w) / 2 < 1100 && h < 1100) {
        ton = '850T'
      } else if ((l + w) / 2 < 1260 && h < 1320) {
        ton = '1200T'
      } else if ((l + w) / 2 < 1380 && h < 1450) {
        ton = '1400T'
      } else if ((l + w) / 2 < 1580 && h < 1550) {
        ton = '1680T'
      } else if ((l + w) / 2 < 1780 && h < 1650) {
        ton = '2200T'
      }
    }
    return {
      values: {
        hpToolingMachineTon: ton,
      },
    }

  },

  getPaintingColor: async (type) => {
    let type1 = 'housing-plastic'
    let product = 'CmfPaintingTypeVendorColorValues'
    let formulaJson = await module.exports.getMapLayout(type1, product)
    const result = formulaJson.values
    if (type == 'UV painting') {
      return {
        values: result,
      }
    } else {
      return 0
    }
  },

  getPaintingVendor: async (type) => {
    let type1 = 'housing-plastic'
    let product = 'CmfPaintingTypeVendorColorValues'
    let formulaJson = await module.exports.getMapLayout(type1, product)
    const result = formulaJson.values

    if (type == 'Rubber painting' || type == 'PU painting') {
      return {
        values: result,
      }
    }else {
      return 0
    }
  },

  getMapLayout: async (type, product) => {
    let layoutFile = path.join(`${type}/dropdown/${product}.yaml`)
    logger.debug('layout file path:', layoutFile)
    let composer = new PartListYml2JsonComposer()
    let layout = await composer.getJsonByYamlPath(layoutFile)
    return layout
  },
  /*
  getMapLayout: (type, product) => {
    let layoutFile = path.join(layoutPath, `${type}/dropdown/${product}.yaml`)
    logger.debug('layout file path:', layoutFile)
    checkFileExist(layoutFile)
    let main = yml2json(layoutFile)
    let composer = new PartListYml2JsonComposer()
    let layout = composer.applyReplacement(main)
    return layout
  },
*/
  getMachinePrice: async (ton, mType) => {
    let type = 'housing-plastic'
    let product = 'machinePrice'
    let formulaJson = await module.exports.getMapLayout(type, product)
    let price
    const result = formulaJson.values
    _.map(result, i => {
      if (ton == i.hpToolingMachineTon && mType == 'module1') {
        price = i.module1
      } else if (ton == i.hpToolingMachineTon && mType == 'module2') {
        price = i.module2
      } else if (ton == i.hpToolingMachineTon && mType == 'module3') {
        price = i.module3
      }
    })
    return {
      values: {
        hpToolingMachinePrice: price,
      },
    }

  },

  gethmMaterialPrice: async (material, thickness) => {
    let type = 'housing-metal'
    let product = 'HmMaterialPrice'
    let formulaJson = await module.exports.getMapLayout(type, product)
    const result = formulaJson.values
    let price
    _.map(result, i => {
      if (material == i.hmmaterial && thickness == i.hmthickness) {
        price = i.hmmaterialprice
      }
    })
    return {
      values: {
        hmmaterialprice: price,
      },
    }
  },

  getIntervalPrice: async (id, w, l) => {
    let getData = await partListModel.getItemLevel(id)
    let level = getData.level
    let weight = parseFloat(w)
    let length = parseFloat(l)
    let price
    if ( parseInt(level) > 2) {
      price = 0
    } else {
      if (0 <= weight * length && weight * length < 5000) {
        price = 0.025
      } else if (5000 <= weight * length && weight * length < 40000) {
        price = 0.035
      } else if (40000 <= weight * length && weight * length < 70000) {
        price = 0.045
      } else if (weight * length >= 70000) {
        price = 0.120
      }
    }
    logger.info(`getIntervalPrice id:${id}, w: ${w}, l:${l}, price: ${price}`)
    return {
      values: {
        hmToolingIntervalPrice: price,
      },
    }

  },

  uploadImage: async(file, userName) => {
    const dirDate = moment(new Date()).format('YYYYMMDD')
    let filePath = path.resolve(__dirname, `../../utils/uploadImage/${dirDate}`)
    const ext = file.name.split('.').pop()
    const fileNameTmp = file.path.slice(5)
    let fileResource = filePath + `/${fileNameTmp}.${ext}`
    const reader = fs.createReadStream(file.path)
    if(file.size > imageLimit) {
      throwApiError('Image Oversize', errorCode.SIZELIMIT)
    }
    if(!fs.existsSync(filePath)) {
      await mkdirp(filePath)
      let upStream = fs.createWriteStream(fileResource)
      await reader.pipe(upStream)
    }else {
      let upStream = fs.createWriteStream(fileResource)
      await reader.pipe(upStream)
    }
    const res = await bomManagerModel.uploadImage(fileNameTmp, fileResource, userName)
    return {
      values: res,
    }
  },
  getImage: async(id) => {
    const result = await partListModel.getImage(id)
    const ext = result.data.split('.').pop()
    const ba64Convert = `data:image/${ext};base64,`
    let ba64Tmp = fs.readFileSync(result.data, 'base64')
    const ba64Img = ba64Convert.concat(ba64Tmp)
    if(result) {
      return{
        values: ba64Img,
      }
    }else {
      return 0
    }
  },
  getDropdownWithFilter: async(parentItemName, fieldName, key) => {
    const items = await partListModel.getDropdownWithFilter(parentItemName, fieldName)
    return { values: items.map(item => ({ [key]: item.item_name })) }
  },
  updatePartList:dbHelper.atomic(async (client, bomItemId, data, userID) =>{
    let assemble = (reqObj, reqName, reqValue, oriValue) => {
      if ((reqValue || reqValue === 0) && (reqValue != oriValue)) {
        reqObj[reqName] = reqValue
      }
    }

    let assembleHistory = (edit_type_list, reqArr, bom_id, source_item_id, user_id) => {
      let historyArr = _.map(Object.keys(reqArr), (reqKey) => {

        return {
          bom_id: bom_id.bom_id,
          field_type_id: _.find(edit_type_list, (type) => type.label == reqKey).id,
          // field_type_name: _.find(edit_type_list, (type) => type.label == reqKey).label_name,
          value: reqArr[reqKey],
          bom_version_id: bom_id.id,
          role: 'CE',
          user_id: user_id,
          action: 'EditPartlistCEParams',
          source_item_id: source_item_id,
        }
      })
      return historyArr
    }

    // canclute price send data.partlistValue, then will get price
    let res
    let priceResult = {}
    let bomId
    let isNeedUpdateVersion = false
    let history = []
    if (!_.isEmpty(data.partlistValue)) {
      let bomRes = await bomVersionModel.getBomIdbyItemId(bomItemId)

      bomId = bomRes[0].bom_id
      let isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)

      let formulaJson = await module.exports.getPartListLayout(data.formate.toLowerCase(), data.product_type_id, data.product_type_name, bomId)

      let ceParameters = _.find(formulaJson.layout, (l) => l.label && l.label.replace(/\s*/g, '') == 'CE可調整係數')
      if (isEmdmProject && ceParameters) {

        let bomVersion = await bomItemModel.getItemVersionByBomId(bomId)
        let bomItem = await bomItemModel.getItemByMultiId([bomItemId])
        let editType = await bomItemModel.getBomEditType('ce_parameters', [data.formate.toLowerCase()])
        let { partlist_value: oriPartlistValue } = await bomItemModel.getPartListDetail(bomItemId)

        let ceParametersTabKey = ceParameters.key
        let ceParametersKeyList = _.map(ceParameters.items, 'key')
        let ceParametersItemsDisplay = {}
        _.forEach(ceParameters.items, (ceItems) => {

          ceParametersItemsDisplay[ceItems.key] =  _.reduce(ceItems.items, function(result, item) {
            let key = item.key
            result[key] = item.displayConfig.display
            return result
          }, {})

        })

        let ceParametersTab = data.partlistValue.formData[ceParametersTabKey]
        let oriCeParametersTab = oriPartlistValue.formData[ceParametersTabKey]

        let reqObj = {}
        _.forEach(ceParametersKeyList, (ceParametersKey) => {
          let reqCeParameters = ceParametersTab[ceParametersKey]
          let oriCeParameters = oriCeParametersTab[ceParametersKey]

          let formulaLayout = ceParametersItemsDisplay[ceParametersKey]

          for (let key in reqCeParameters) {
            if (formulaLayout[key]) {
              assemble(reqObj, key, reqCeParameters[key], oriCeParameters[key])
            }
          }
        })

        history = assembleHistory(editType, reqObj, bomVersion[0], bomItem[0].source_item_id, userID)
      }

      priceResult = calPartlistPrice(data.partlistValue, formulaJson.formulas, formulaJson.layout)
      data.partlistPrice = priceResult
      // update bom item table price cloumn
      if(priceResult && !isNaN(priceResult.totalPrices)){
        res = await bomItemModel.updateBomItem(client, bomItemId, { 'system_cost': priceResult.totalPrices, 'modified_time': moment().utc().format() })
      }else{
        res = await bomItemModel.updateBomItem(client, bomItemId, { 'system_cost': 0, 'modified_time': moment().utc().format() })
      }

      // Update versionId
      // if new version uuid diff with old version uuid update all bom item version_id

      // 20190904 add check is need update version condition
      isNeedUpdateVersion = await meBomUtil.checkIsNeedUpdateVersion(bomId)
      if (isNeedUpdateVersion){
        let getUUid = await bomVersionModel.getNextVersionUuid(client, bomId, 'EDIT')
        if (getUUid && getUUid.isNewRecord) {
          // new uuid update bom item
          await bomVersionModel.updateBomItemVersionId(client, getUUid.old_version_id, getUUid.new_version_id)
        } else {
          isNeedUpdateVersion = false
        }
      }
    }

    res = await bomItemModel.updatePartList(client, bomItemId, data)
    let unEdit = []
    if (res) {
      let queryRes = await bomItemModel.getPartListById(bomItemId)
      unEdit = _.filter(queryRes.rows, (v) => { return v.partlist_value != null && typeof v.partlist_value == 'object' && _.isEmpty(v.partlist_value) })
    }

    await bomItemModel.insertBomEditHistory(client, history)

    return {
      unEditCount: unEdit.length,
      calulateResult: priceResult,
      isNeedUpdateVersion:isNeedUpdateVersion,
    }
  }),
  getHistoryDefaultData: async (bom_id, type1, type2, key) => {
    let getData = await partListModel.getHistoryDefaultData(bom_id, type1, type2, key)
    const item = type2.substring(0, 1) + bom_id
    if(getData) {
      return {
        item: item,
        values: getData,
      }
    }else {
      return 0
    }
  },
  getCmfPaintingMachineType: async (emdmVersion, projectCode, emdmppid) => {
    const tmpRes = await partListModel.getPartlistDataByEmdmInfo(emdmVersion, projectCode, emdmppid)
    if (tmpRes.length === 0) {
      logger.warn('[_getCmfPaintingMachineType]can not find any result')
      throwApiError('NO_RESULT_ERROR', errorCode.ERRORFORMAT)
    }
    if (tmpRes.length > 1) {
      logger.warn('[_getCmfPaintingMachineType]should have only one result')
      throwApiError('NOT_UNIQUE_ERROR', errorCode.ERRORFORMAT)
    }
    const { partlist_value, formate } = tmpRes[0]
    const parsingFormate = {
      'housing-metal':  'formData.hmCeParametersTab.hmCeParameters.cmfPaintingMachineType',
      'housing-plastic':  'formData.hpCeParametersTab.hpCeParameters.cmfPaintingMachineType',
    }
    const cmfPaintingMachineType = _.get(partlist_value, parsingFormate[formate], 'NOTHING')
    if (cmfPaintingMachineType === 'NOTHING') {
      throwApiError('PARSING_ERROR', errorCode.ERRORFORMAT)
    }
    return {
      values: {
        cmfPaintingMachineType,
      },
    }
  },
  getCmfPaintingCycleTime: async (emdmVersion, projectCode, emdmppid) => {
    const tmpRes = await partListModel.getPartlistDataByEmdmInfo(emdmVersion, projectCode, emdmppid)
    if (tmpRes.length === 0) {
      logger.warn('[_getCmfPaintingMachineType]can not find any result')
      throwApiError('NO_RESULT_ERROR', errorCode.ERRORFORMAT)
    }
    if (tmpRes.length > 1) {
      logger.warn('[_getCmfPaintingMachineType]should have only one result')
      throwApiError('NOT_UNIQUE_ERROR', errorCode.ERRORFORMAT)
    }
    const { partlist_value, formate } = tmpRes[0]
    const parsingFormate = {
      'housing-metal':  'formData.hmCeParametersTab.hmCeParameters.cmfPaintingCycleTime',
      'housing-plastic':  'formData.hpCeParametersTab.hpCeParameters.cmfPaintingCycleTime',
    }
    // TODO 要改成重hmCeParametersTab拿資料
    const cmfPaintingCycleTime = _.get(partlist_value, parsingFormate[formate], 'NOTHING')
    if (cmfPaintingCycleTime === 'NOTHING') {
      throwApiError('PARSING_ERROR', errorCode.ERRORFORMAT)
    }
    return {
      values: {
        cmfPaintingCycleTime: String(cmfPaintingCycleTime),
      },
    }
  },
  getHmToolingMaterialExpand: async (emdmVersion, projectCode, emdmppid) => {
    const tmpRes = await partListModel.getPartlistDataByEmdmInfo(emdmVersion, projectCode, emdmppid, true)
    if (tmpRes.length === 0) {
      logger.warn('[_getHmToolingMaterialExpand]can not find any result')
      throwApiError('NO_RESULT_ERROR', errorCode.ERRORFORMAT)
    }
    if (tmpRes.length > 1) {
      logger.warn('[_getHmToolingMaterialExpand]should have only one result')
      throwApiError('NOT_UNIQUE_ERROR', errorCode.ERRORFORMAT)
    }
    const { partlist_value, formate, product_type_id, partlist_price } = tmpRes[0]
    const source = {
      partlist_value,
      partlist_price,
    }
    if (formate !== 'housing-metal') {
      throwApiError('FORMATE_NOT_MATCH', errorCode.ERRORFORMAT)
    }
    let parsingFormate = {
      'hmToolingMaterialExpandLength': 'partlist_price.forDebug.debugInfo.housingMetal.hmToolingMaterialExpandLength.value',
      'hmToolingMaterialExpandWidth': 'partlist_price.forDebug.debugInfo.housingMetal.hmToolingMaterialExpandWidth.value',

    }
    switch(parseInt(product_type_id, 10)){
      case 1: // nb
        parsingFormate.edgeMaterialSizeLength = 'partlist_value.formData.hmCeParametersTab.hmCeParameters.hmToolingMaterialLength'
        parsingFormate.edgeMaterialSizeWidth = 'partlist_value.formData.hmCeParametersTab.hmCeParameters.hmToolingMaterialWidth'
        break
      default: // dt/aio/voip
        parsingFormate.edgeMaterialSizeLength = 'partlist_value.formData.toolingPartList.hmTooling.hmToolingMaterialSize.hmToolingMaterialLength'
        parsingFormate.edgeMaterialSizeWidth = 'partlist_value.formData.toolingPartList.hmTooling.hmToolingMaterialSize.hmToolingMaterialWidth'
    }
    let getDataRes = {}
    for(let key in parsingFormate){
      if(!parsingFormate.hasOwnProperty(key)) {
        continue
      }
      let value = _.get(source, parsingFormate[key], 'NOTHING')
      if (value === 'NOTHING') {
        throwApiError('PARSING_ERROR', errorCode.ERRORFORMAT)
        return null
      } else {
        getDataRes[key] = value
      }
    }
    return {
      values:getDataRes,
    }
  },
  calHmToolingMaterialExpand: async (sizeL, sizeW, partCategory2Id, productTypeId) => {
    let edgeSizeL, edgeSizeW  = 0
    let getResL, getResW = null
    productTypeId = parseInt(productTypeId, 10)
    let productTypeList = await productTypeModel.getProductType()
    let findProductTypeRes = productTypeList.find((item) => item.id === productTypeId )
    if (!findProductTypeRes) {
      throwApiError('productTypeId not exist.', errorCode.ERRORFORMAT)
      return
    }
    switch(productTypeId){
      case 1: // nb
        getResL = await plRouter.getMaterialSideConstant.bind({ productTypeId })(['housing_metal_material', 'l'])
        if (!(getResL.hasOwnProperty('values') &&  Array.isArray(getResL.values))) {
          throwApiError('get hmToolingMaterialLength failed', errorCode.INTERNAL_ERROR)
          return
        }
        getResL = getResL.values.find((item) => item.type2Id === partCategory2Id)
        if(!getResL) {
          throwApiError('unexpected partCategory2Id', errorCode.ERRORFORMAT)
          return
        }
        edgeSizeL = getResL.hmToolingMaterialLength
        getResW = await plRouter.getMaterialSideConstant.bind({ productTypeId })(['housing_metal_material', 'w'])
        if (!(getResW.hasOwnProperty('values') &&  Array.isArray(getResW.values))) {
          throwApiError('get hmToolingMaterialWidth failed', errorCode.INTERNAL_ERROR)
          return
        }
        getResW = getResW.values.find((item) => item.type2Id === partCategory2Id)
        if(!getResW) {
          throwApiError('unexpected partCategory2Id', errorCode.ERRORFORMAT)
          return
        }
        edgeSizeW = getResW.hmToolingMaterialWidth
        break
      default: // dt/aio/voip...etc
        getResL = await plRouter.getCommon.bind({ productTypeId })(['housing_metal_material', 'material_metal_l_side_constant'])
        if (!getResL.hasOwnProperty('value')) {
          throwApiError('get hmToolingMaterialLength failed', errorCode.INTERNAL_ERROR)
          return
        }
        edgeSizeL = getResL.value
        getResW = await plRouter.getCommon.bind({ productTypeId })(['housing_metal_material', 'material_metal_w_side_constant'])
        if (!getResW.hasOwnProperty('value')) {
          throwApiError('get hmToolingMaterialWidth failed', errorCode.INTERNAL_ERROR)
          return
        }
        edgeSizeW = getResW.value
    }
    return {
      values:{
        'edgeMaterialSizeLength':edgeSizeL,
        'hmToolingMaterialExpandLength':edgeSizeL + parseInt(sizeL, 10),
        'edgeMaterialSizeWidth':edgeSizeW,
        'hmToolingMaterialExpandWidth': edgeSizeW + parseInt(sizeW, 10),
      },
    }
  },
  getCmfPaintingAreaInfo: async (emdmVersion, projectCode, emdmppid) => {
    const tmpRes = await partListModel.getPartlistDataByEmdmInfo(emdmVersion, projectCode, emdmppid)
    if (tmpRes.length === 0) {
      logger.warn('[_getCmfPaintingAreaInfo]can not find any result')
      throwApiError('NO_RESULT_ERROR', errorCode.ERRORFORMAT)
    }
    if (tmpRes.length > 1) {
      logger.warn('[_getCmfPaintingAreaInfo]should have only one result')
      throwApiError('NOT_UNIQUE_ERROR', errorCode.ERRORFORMAT)
    }
    const { partlist_value } = tmpRes[0]
    // TODO 要改成重hmCeParametersTab拿資料
    const cmfPaintingAreaLW = _.get(partlist_value, 'formData.hpCeParametersTab.hpCeParameters.cmfPaintingAreaLW', 'NOTHING')
    const cmfPaintingAreaLH = _.get(partlist_value, 'formData.hpCeParametersTab.hpCeParameters.cmfPaintingAreaLH', 'NOTHING')
    const cmfPaintingAreaWH = _.get(partlist_value, 'formData.hpCeParametersTab.hpCeParameters.cmfPaintingAreaWH', 'NOTHING')
    if ([cmfPaintingAreaLW, cmfPaintingAreaLH, cmfPaintingAreaWH].includes('NOTHING')) {
      throwApiError('PARSING_ERROR', errorCode.ERRORFORMAT)
    }
    return {
      values: {
        cmfPaintingAreaLW,
        cmfPaintingAreaLH,
        cmfPaintingAreaWH,
      },
    }
  },
  getToolingMaterialInfo: async (emdmVersion, projectCode, emdmppid) => {
    const tmpRes = await partListModel.getPartlistDataByEmdmInfo(emdmVersion, projectCode, emdmppid)
    if (tmpRes.length === 0) {
      logger.warn('[_getToolingMaterialInfo]can not find any result')
      throwApiError('NO_RESULT_ERROR', errorCode.ERRORFORMAT)
    }
    if (tmpRes.length > 1) {
      logger.warn('[_getToolingMaterialInfo]should have only one result')
      throwApiError('NOT_UNIQUE_ERROR', errorCode.ERRORFORMAT)
    }
    const { partlist_value } = tmpRes[0]
    // TODO 要改成重hmCeParametersTab拿資料
    const hmToolingMaterialWidth = _.get(partlist_value, 'formData.hmCeParametersTab.hmCeParameters.hmToolingMaterialWidth', 'NOTHING')
    const hmToolingMaterialLength = _.get(partlist_value, 'formData.hmCeParametersTab.hmCeParameters.hmToolingMaterialLength', 'NOTHING')

    if ([hmToolingMaterialWidth, hmToolingMaterialLength].includes('NOTHING')) {
      throwApiError('PARSING_ERROR', errorCode.ERRORFORMAT)
    }
    return {
      values: {
        hmToolingMaterialWidth,
        hmToolingMaterialLength,
      },
    }
  },
}
