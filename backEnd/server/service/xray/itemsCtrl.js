const itemModel = require('../../model/xray/item.js')
const bomModel = require('../../model/bom/bomItem.js')

const moment = require('moment')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { asyncForEach } = require('../../helpers/utils')
const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xray SPA class')

class Items {
  constructor(partNumbers) {
    this.partNumbers = partNumbers
  }

  async getMRP(purchase_org = null){
    let mrpList = await itemModel.getMRPSummury(this.partNumbers, purchase_org)
    return mrpList
  }
  /**
   * @returns {Array} 是Common part的料號 ex: ['071.05824.A001','072.05824.000U']
   */
  async getCommonPart(){
    let cmpList = await itemModel.getCommonPartList(this.partNumbers)
    return cmpList
  }
  /**
   * @returns {Array} 被block的料號 ex: ['071.05824.A001','072.05824.000U']
   */
  async getBlock(){
    let blockList = await itemModel.getBlockList(this.partNumbers)
    return blockList
  }

  async getSupplyTypeList(sypply){
    let supplyTypeList = await itemModel.getSupplyTypeList(this.partNumbers, sypply)
    return supplyTypeList
  }

  async getDescription() {
    let descriptionList = await itemModel.getDescriptionList(this.partNumbers)
    return descriptionList
  }

  async getPartNumberTypes() {
    let typeList = await itemModel.getPartNumberTypes(this.partNumbers)
    return typeList
  }

  async getPartNumberLastPrice(purchase_org = null) {
    let priceList = await itemModel.getPartNumberLastPrice(this.partNumbers, purchase_org)
    return priceList
  }

  async getPlantAndSupplyTypeAndOdmOem(supply, purchase_org = null) {
    let infoList = await itemModel.getPlantAndSupplyTypeAndOdmOem(this.partNumbers, supply, purchase_org)
    return infoList
  }

}

module.exports = Items
