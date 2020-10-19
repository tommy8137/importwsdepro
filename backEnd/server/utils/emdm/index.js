const _ = require('lodash')
const moment = require('moment')
const comparsionTableTemplate = require('./comparsionTableTemplate.js')
const SKU_KEY_LIST = ['sku0', 'sku1', 'sku2', 'sku3', 'sku4', 'sku5']

class EmdmUtils {
  static getEmdmComparisonTable(bomInfo, bomItems, comparisonCostItems){
    let template = comparsionTableTemplate.getEmdmComparsionTableTemplate(bomInfo.product_type_id)
    const comparsionTableTemplateKeyList = {
      plasticCostKeyList : Object.keys(template.plasticCost),
      paintingCostKeyList : Object.keys(template.paintingCost),
      metalCostKeyList : Object.keys(template.metalCost),
      metalPaintingCostList : Object.keys(template.metalPaintingCost),
      aluminumCostKeyList : Object.keys(template.aluminumCost),
      metalParameterKeyList : Object.keys(template.metalParameters),
      thermalFanCostKeyList : Object.keys(template.thermalFanCost),
      thermalModuleCostKeyList : Object.keys(template.thermalModuleCost),
      thermalGraphiteSheetCostKeyList : Object.keys(template.thermalGraphiteSheetCost),
      thermalPadCostKeyList : Object.keys(template.thermalPadCost),
      dieCutCostKeyList : Object.keys(template.dieCutCost),
    }
    return {
      productTypeId: bomInfo.product_type_id,
      projectCode: bomInfo.project_code,
      version: parseInt(bomInfo.source_version, 10),
      eProVersion: Math.ceil((bomInfo.version || '').substring(1)),
      partList: bomItems.map(bomItem => {
        return this._generatePartlistByBomItem(bomItem, comparisonCostItems, template, comparsionTableTemplateKeyList)
      }),
    }
  }
  /**
   *
   * @param {Object} bomItem
   * @param {Object} comparisonCostItems
   * @param {Object} template comparsionTableTemplate. from comparsionTableTemplate.getEmdmComparsionTableTemplate
   * @param {Object} comparsionTableTemplateKeyList
   */
  static _generatePartlistByBomItem(bomItem, comparisonCostItems, template, comparsionTableTemplateKeyList){
    const result = {
      partCategory1Id: bomItem.parts_ctgy_1_id,
      partCategory2Id: bomItem.parts_ctgy_2_id,
      assyCategory: bomItem.gb_assy_ctgy,
      functionCategory: bomItem.func_ctgy,
      // majorPart: 'boolean',
      ppId: bomItem.source_item_id,
      lastPrice: this._formatLastPrice(bomItem.last_price),
      sourcerCost: bomItem.sourcer_cost_up,
      cePL: bomItem.ce_pl,
      ceShipping: bomItem.ce_shipping,
      skuPrice: this._generateSkuPrice(bomItem, comparisonCostItems),
      plasticCost: comparsionTableTemplateKeyList.plasticCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.plasticCost[key], null) }), {}),
      paintingCost: comparsionTableTemplateKeyList.paintingCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.paintingCost[key], null) }), {}),
      metalCost: comparsionTableTemplateKeyList.metalCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.metalCost[key], null) }), {}),
      aluminumCost: comparsionTableTemplateKeyList.aluminumCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.aluminumCost[key], null) }), {}),
      metalPaintingCost: comparsionTableTemplateKeyList.metalPaintingCostList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.metalPaintingCost[key], null) }), {}),
      metalParameters: comparsionTableTemplateKeyList.metalParameterKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.metalParameters[key], null) }), {}),
      thermalFanCost: comparsionTableTemplateKeyList.thermalFanCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.thermalFanCost[key], null) }), {}),
      thermalModuleCost: comparsionTableTemplateKeyList.thermalModuleCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.thermalModuleCost[key], null) }), {}),
      thermalGraphiteSheetCost: comparsionTableTemplateKeyList.thermalGraphiteSheetCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.thermalGraphiteSheetCost[key], null) }), {}),
      thermalPadCost: comparsionTableTemplateKeyList.thermalPadCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.thermalPadCost[key], null) }), {}),
      dieCutCost: comparsionTableTemplateKeyList.dieCutCostKeyList.reduce((res, key) => ({ ...res, [key]: _.get(bomItem, template.dieCutCost[key], null) }), {}),
    }
    result.thermalModuleCost = this._processSpecialCost(result.thermalModuleCost, 'thermalModule')
    result.thermalFanCost = this._processSpecialCost(result.thermalFanCost, 'thermalFan')
    result.thermalPadCost = this._processSpecialCost(result.thermalPadCost, 'ThermalPad')
    return result
  }
  /**
   * 需要做特殊處理的cost物件，這類物件不像metal那些，可以直接用路徑對到價格，需要額外用物件屬性的前綴字符來判斷是否為需要的價格 
   * ex : Fan-1ba7359e-7b1a-49de-ba91-2e5cc1312ae3
   * @param {Object} costList 
   * @param {String} partlistType 
   */
  static _processSpecialCost(costList, partlistType){
    const costKeyList = Object.keys(costList)
    for(const costKey of costKeyList){
      const costInfo = costList[costKey]
      if(_.isNull(costInfo)){
        costList[costKey] = []
        continue
      } else if(_.isNumber(costInfo) || _.isString(costInfo)){ // 部份已經直接取到價格的項目，只將其格式化，讓輸出的結果統一
        costList[costKey] = [{
          totalCost: costInfo
        }]
        continue
      }
      const costInfoKeyList = Object.keys(costInfo)
      const newCostInfo = []
      for(const costInfoKey of costInfoKeyList){
        const costInfoKeyHeader = costInfoKey.split('-').shift()
        const costDetail = costInfo[costInfoKey]
        if(costKey === costInfoKeyHeader && costDetail.parentGroupId === partlistType){
          newCostInfo.push({
            totalCost: costDetail.total
          })
        }
      }
      costList[costKey] = newCostInfo
    }
    return costList
  }

  static _generateSkuPrice(bomItem, comparisonCostItems){
    return SKU_KEY_LIST.map((skuKey, index)=>{
      let res = {
        skuOrder: index,
        suggestCost: null,
        ceAssembly: null,
      }
      if (comparisonCostItems.hasOwnProperty(skuKey)) {
        let _bomItem = comparisonCostItems[skuKey].find((it) => it.id === bomItem.id)
        if (_bomItem) {
          res.suggestCost =  !_.isNil(_bomItem.ce_cost_up) ? _bomItem.ce_cost_up : null
          res.ceAssembly =  !_.isNil(_bomItem.ce_assembly) ? _bomItem.ce_assembly : null
        }
      }
      return res
    })
  }
  static _formatLastPrice(lastPriceInfo){
    if(_.isNil(lastPriceInfo)){
      return null
    } else if(lastPriceInfo.hasOwnProperty('unitPrice')){
      if(lastPriceInfo.unitPrice === '-'){
        return null
      } else if(lastPriceInfo.hasOwnProperty('isValidPrice') && !lastPriceInfo.isValidPrice){
        return null
      } else {
        return lastPriceInfo.unitPrice
      }
    } else {
      return null
    }
  }
  static genEmdmVersion(sourcerVersion, createTime){
    return (!_.isNull(sourcerVersion) && !_.isNull(createTime)) ? `${sourcerVersion}_${moment(createTime).format('YYYYMMDDHHmm')}` : '--'
  }
}

module.exports = EmdmUtils
