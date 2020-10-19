const fs = require('fs')
const path = require('path')
const util = require('util')
const _ = require('lodash')

const traverse = require('traverse')
const writeFile = util.promisify(fs.writeFile)

const INPUT_PATH = path.join(__dirname, './input')
const OUTPUT_PATH = path.join(__dirname, './output')
let excludeVerifyInfoObj = ['calulateResult.forDebug.order']
excludeVerifyInfoObj = excludeVerifyInfoObj.map((str) => str.toLowerCase())
class MappingConfigGenerator {
  constructor(configName){
    this.configName = configName
  }
  _isExcludeVerifyInfoObj(objPath){
    const strObjPath = objPath.join('.').toLowerCase()
    for(let excludePath of excludeVerifyInfoObj){
      if(strObjPath.includes(excludePath)){
        return true
      }
    }
    return false
  }
  _generatorVerifyInfoObj(verifyObj, objPath, objKey, value){
    let _objKey = objKey
    if(objKey === 'value' || objKey === 'label'){
      _objKey = objPath.slice(-2, -1)[0]
    }
    if(!verifyObj.hasOwnProperty(_objKey)){
      verifyObj[_objKey] = {
        'label':'',
        'excelValueLongitudinalCoordinates':'',
        'valuekey':_objKey,
        'valueType':this._getValueType(value),
        'comparisonValuePath':objPath.slice(1).join('.'),
      }
    }
    if(objKey === 'label'){
      verifyObj[_objKey].label = value
    } else {
      verifyObj[_objKey].comparisonValuePath = objPath.slice(1).join('.')
      verifyObj[_objKey].valuekey = _objKey
      verifyObj[_objKey].valueType = _objKey
    }
  }
  _generatorTransgerPartlistInfoObj(objPath, objKey, value){
    return {
      'createPath':objPath.join('.'),
      'valuekey':objKey,
      'valueType': this._getValueType(value),
      'excelValueLongitudinalCoordinates':null,
      'default': this._getDefaultValue(value),
    }
  }
  _getDefaultValue(value){
    if(value === '' ||
      value === 0 ||
      typeof value === 'boolean'){
      return value
    }
    return null
  }
  _getValueType(value){
    const valueType = typeof value
    return (_.isNull(value)) ? null : valueType.toLowerCase()
  }
  _getInputData(){
    const data = require(path.join(INPUT_PATH, this.configName))
    return data
  }
  _generatorMappingConfigData(inputData) {
    const transferPartlistInfo = {}
    const verifyInfo = {}
    let traverseInputData = traverse(inputData)
    let objPathList = traverseInputData.paths()
    for(let objPath of objPathList){
      const targetValue = traverseInputData.get(objPath)
      if(_.isPlainObject(targetValue) ||
        Array.isArray(targetValue)){
        continue
      }
      const objFirstKey = objPath[0].toLowerCase()
      const objLastKey = objPath.slice(-1)[0]
      switch (objFirstKey) {
        case 'formdata':
          transferPartlistInfo[objPath] = this._generatorTransgerPartlistInfoObj(objPath, objLastKey, targetValue)
          break
        case 'calulateresult':
          if(!this._isExcludeVerifyInfoObj(objPath)){
            this._generatorVerifyInfoObj(verifyInfo, objPath, objLastKey, targetValue)
          }
          break
      }
    }
    return {
      'xlsxName': '',
      'sheetName': '',
      'startHorizontalCoordinates':'C',
      'transferMode':'createPath',
      'formate':'',
      'metadata':{
        'productType':{
          'createPath':'productType',
          'valuekey':'productType',
          'valueType':'string',
          'excelValueLongitudinalCoordinates':'1',
        },
        'testLabel':{
          'createPath':'testLabel',
          'valuekey':'testLabel',
          'valueType':'string',
          'excelValueLongitudinalCoordinates':'2',
        },
        'type1':{
          'createPath':'type1',
          'valuekey':'type1',
          'valueType':'string',
          'excelValueLongitudinalCoordinates':'3',
        },
        'type2':{
          'createPath':'type2',
          'valuekey':'type2',
          'valueType':'string',
          'excelValueLongitudinalCoordinates':'4',
        },
      },
      transferPartlistInfo : transferPartlistInfo,
      verifyInfo : verifyInfo,
    }
  }
  async save(data){
    await writeFile(path.join(OUTPUT_PATH, this.configName), JSON.stringify(data, null, 2))
  }
  async setup(){
    const inputData = this._getInputData()
    const configData = this._generatorMappingConfigData(inputData)
    await this.save(configData)
  }
}

module.exports = (async function(){
  let configList = fs.readdirSync(INPUT_PATH)
  await Promise.all(configList.map((configName)=>{
    const mappingConfigGenerator = new MappingConfigGenerator(configName)
    return mappingConfigGenerator.setup()
  }))
  console.log('Generator Finish')
})()