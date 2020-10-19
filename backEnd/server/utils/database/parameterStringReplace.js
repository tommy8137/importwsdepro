const commonModel = require('../../model/database/common').Common
class ParameterStringReplace {
  /**
   * 在labelName 中 找出所有的替換字元 {{aa,bb,cc}} 
   * @param {String} labelName 例:'這是個測試{{aa,bb,cc}}'
   * @returns {Array} replaceConfig [{stringToReplace:'{{aa,bb,cc}}', valuePath:['aa', 'bb', 'cc']}]
   */
  static checkStringReplacement(labelName) {
    let replaceMentKeys = []
    let lableLength = typeof labelName === 'string' ? labelName.length : null
    if (lableLength && labelName.includes('{{')){ // 包含 {{ 字串
      let replaceIndexes = []
      let replaceCount = 1
      for(let i = 0 ; i < lableLength ; i++) {
        if (labelName[i] + labelName[i + 1] === '{{') {
          if (replaceIndexes.length < replaceCount) {
            replaceIndexes.push({
              'start': 0,
              'end': 0,
            })
          }
          replaceIndexes[replaceCount - 1].start = (i + 2)
        }
        if (labelName[i] + labelName[i + 1] === '}}') {
          if (replaceIndexes.length < replaceCount || replaceIndexes[replaceCount - 1].start === 0) {
            throw new Error('checkReplacement with error. missing \'{{\' in lable_name of item:', JSON.stringify(parameterItem, 0, 4))
          }
          replaceIndexes[replaceCount - 1].end = i
          replaceCount++
        }
      }
      replaceIndexes.forEach((replaceIdxItem) => {
        if (replaceIdxItem.start && replaceIdxItem.end) { // 2, 10
          let stringToReplace = labelName.substring(replaceIdxItem.start - 2, replaceIdxItem.end + 2) // {{aa,bb,cc}}
          let pathKey = labelName.substring(replaceIdxItem.start, replaceIdxItem.end) // aa,bb,cc
          replaceMentKeys.push({
            stringToReplace,
            'valuePath':pathKey.split(','),
          })
        }
      })
    }
    return replaceMentKeys
  }
  /**
   * 取parameterValue
   * @param {Array} replaceConfig [{stringToReplace:'{{aa,bb,cc}}', valuePath:['aa', 'bb', 'cc']}]
   * @param {Number} productTypeId 例：DT === 2
   * @returns {Array} replaceConfigWithValue [{stringToReplace:'{{aa,bb,cc}}', valuePath:['aa', 'bb', 'cc'], 'value':'100'}]
   */
  static async getReplaceValue (replaceConfig, productTypeId) {
    let res = await Promise.all(replaceConfig.map(async (item) => {
      let formulaName = item.valuePath[0].trim()
      let partType = item.valuePath[1].trim()
      let label = item.valuePath[2].trim()
      let valueRes = await commonModel.fetchParameter(formulaName, partType, label, productTypeId)
      item.value = valueRes.value
      return item
    })).catch((err) => {
      throw err
    })
    return res
  }
  /**
   * 替換lable中的字元
   * @param {String} labelName 例:'這是個測試{{aa,bb,cc}}'
   * @param {Array} replaceConfig [{stringToReplace:'{{aa,bb,cc}}', valuePath:['aa', 'bb', 'cc'], 'value':'100'}]
   * @returns {String} result:'這是個測試100'
   */
  static applyReplacement(labelName, replaceConfig) {
    let result = labelName
    replaceConfig.forEach((item) => {
      result = result.replace(item.stringToReplace, item.value)
    })
    return result
  }
}
module.exports = ParameterStringReplace