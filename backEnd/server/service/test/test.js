const testModel = require('../../model/test/test.js')
const _ = require('lodash')

class Test {
  static async addFackData(projectCode) {
    let res = await testModel.addFackData(projectCode)
  }
  static async deleteFackData() {
    let res = await testModel.deleteFackData()
  }
  /**
   * 取得需要轉格式的資料列表
   */
  static async getMetalNbList() {
    const list = await testModel.getMetalNbList()
    const result = list.map((data) => {
      const w = _.get(data, ['partlist_value', 'formData', 'hmCeParametersTab', 'hmCeParameters', 'hmToolingMaterialWidth'], false)
      const l = _.get(data, ['partlist_value', 'formData', 'hmCeParametersTab', 'hmCeParameters', 'hmToolingMaterialLength'], false)
      const oldExist = _.get(data, ['partlist_value', 'formData', 'toolingPartList', 'hmTooling', 'hmToolingMaterialSize'], false)
      const newExist = w >= 0 || l >= 0
      return {
        ...data,
        done: !oldExist && !!newExist,
      }
    })
    return result
  }

  /**
   * 轉格式
   */
  static async convertMetal202005(ids) {
    const itemList = ids.split(',')
    let newFormat = null
    for (let idx = 0; idx < itemList.length; idx++) {
      const itemId = itemList[idx]
      const { partlist_value: oldFormat } = await testModel.getPartlistByItem(itemId)
      newFormat = _.cloneDeep(oldFormat)
      const hmToolingMaterialSize = _.get(oldFormat, ['formData', 'toolingPartList', 'hmTooling', 'hmToolingMaterialSize'], {})
      if (hmToolingMaterialSize) {
        delete newFormat.formData.toolingPartList.hmTooling.hmToolingMaterialSize
        _.set(newFormat, ['formData', 'hmCeParametersTab', 'hmCeParameters'], {
          ..._.get(newFormat, ['formData', 'hmCeParametersTab', 'hmCeParameters'], {}),
          ...hmToolingMaterialSize,
        })
        await testModel.updatePartlistByItem(itemId, newFormat)
      }
    }
  }

  /**
   * 取得需要轉格式的資料列表
   */
  static async searchProject(params) {
    const { list, count } = await testModel.searchProject(params)
    // partlist format
    const formatRes = await testModel.getFormats()
    const formats = formatRes.map(d => d['format_key'])

    // product type
    const ptRes = await testModel.getProductTypes()
    const productTypes = ptRes.map(d => d['product_type'])

    const result = { list, count, formats, productTypes }
    return result
  }
  
}

module.exports = Test

