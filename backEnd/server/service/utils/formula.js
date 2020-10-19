const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { yml2json } = require('../../helpers/utils.js')
const formulaPath = path.join(path.resolve(__dirname), '../../../part-list-layout')
const CONFIG_SUPPLY_TYPE = require('../../../config.js').supplyType
let supplyTypeList = []
let productTypeList = []
const commonModule = require('../../model/common/common.js')

const checkFileExist = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throwApiError('FILE_NOT_EXIST', errorCode.ERRORFORMAT)
  }
}

function write(err) {
  if (err) console.error(err)
  else console.info('Write operation complete.')
}

class Utils {
  /** 取得supply Type為null時的預設值
   * @returns {String}
   */
  static getDefaultSupplyType(){
    return 'Empty'
  }
  static async getFormula (format = 'thermal-module') {
    const realpath = `${formulaPath}/${format}/${format}.yaml`
    // const result = fs(realpath).map(file => {
    // checkFileExist(file)
    return {
      name: realpath.split('.')[0],
      content: yml2json(realpath),
    }
    // })
    // return result
  }

  static async saveFormula (formula, name) {
    const result = yaml.safeDump(formula, {
      lineWidth: 2000,
      noCompatMode: true,
    }).replace(/(')/gm, () => '')

    fs.writeFile(path.join(formulaPath, `${name}.yaml`), result, write)
    return result
  }
  static getSupplyTypeDropDownList(){
    return {
      values: supplyTypeList,
    }
  }
  static getProductTypeDropDownList(){
    return productTypeList
  }
}
/** 產生supply_type清單，並加入額外的預設值:Empty
 * @returns {Array}
 */
const genSupplyTypeDropDownList = () => {
  supplyTypeList = Object.keys(CONFIG_SUPPLY_TYPE)
    .map((supplyTypeCode) => CONFIG_SUPPLY_TYPE[supplyTypeCode])
  supplyTypeList.push(Utils.getDefaultSupplyType())
}
const getProductTypeDropDownList = async ()=> {
  let result = await commonModule.getDataByTable(['id', 'type_name'], 'formula.product_type', ['disable_time is Null'])
  for(let productInfo of result){
    productTypeList.push({
      'label':productInfo.type_name,
      'value':productInfo.id,
    })
  }
}
genSupplyTypeDropDownList()
getProductTypeDropDownList()
module.exports = Utils

