const path = require('path')
const _ = require('lodash')

const ROOT = path.join(__dirname, '../../../../../')
const { bomRoute } = require('../config')
const ExcelParser = require('./excelParser')
const TestfileGenerator = require('./testfileGenerator.js')
const ReportGenerator = require('./reportGenerator.js')
const fileProcess = require('./fileProcess.js')
const partlistService = require(path.join(ROOT, 'server/service/bom/partList.js'))
const commonMod = require(path.join(ROOT, 'server/model/common/common.js'))
const { formatFloat } = require(path.join(ROOT, 'server/helpers/utils.js'))
const Formula = require(path.join(ROOT, 'server/api/utils/formula.js'))
const formula = new Formula()
const FLOAT_DIGIT = 8
const MAXIMUM_DEVIATION = 0.0001
class TestBomManager {
  constructor(){
    this.productTypeList = {}
  }
  async _init(){
    const productTypeList = await commonMod.getDataByTable(['id', 'type_name'], 'formula.product_type')
    for(const productTypeInfo of productTypeList){
      const productTypeNameLower = productTypeInfo.type_name.toLowerCase()
      this.productTypeList[productTypeNameLower] = {
        'productTypeId':productTypeInfo.id,
        'productTypeName':productTypeNameLower,
      }
    }
  }
  _getProductTypeInfo(productTypeName){
    const productTypeNameLower =  productTypeName.toLowerCase()
    return this.productTypeList[productTypeNameLower]
  }
  _generatePartlistValue(bomTestData, layout, productTypeInfo){
    const priceData = formula.getPriceData(bomTestData.formData, layout)
    return {
      'Images':[],
      'Price':{
        ...priceData,
        'partItemInfo':{
          'bom_id':null, // 不使用任何bom，因此給null
          'type1':bomTestData.metaData.type1,
          'type2':bomTestData.metaData.type2,
          'productTypeName':productTypeInfo.productTypeName,
          'productTypeId':productTypeInfo.productTypeId,
          'productType':productTypeInfo.productTypeName.toUpperCase(),
          'site':bomTestData.metaData.site || null,  // 不使用任何site，因此給空字串
          'version':'', // 不使用任何version，因此給空字串
        },
      },
      'formData':bomTestData.formData,
    }
  }
  _getCommonFileName(bomTestData){
    return `${bomTestData.configFilename}-${bomTestData.metaData.testLabel}`
  }
  async _generateTestfile(bomTestData, priceResult){
    const config = bomRoute[bomTestData.configFilename]
    const verifyInfoList = config.verifyInfo
    const verifyKeyList = Object.keys(verifyInfoList)
    const excelVerifyData = bomTestData.verifyData
    const testfileName = this._getCommonFileName(bomTestData)
    let testfile = new TestfileGenerator(testfileName)
    testfile.addDescribeUpper(`${bomTestData.configFilename} ${bomTestData.metaData.testLabel}`)
    for(let verifyKey of verifyKeyList){
      let excelVerifyValue = excelVerifyData[verifyKey]
      if(excelVerifyValue === '-' || _.isNil(excelVerifyValue)){
        continue
      }
      const verifyInfo = verifyInfoList[verifyKey]
      const itDescription = verifyInfo.label || verifyKey
      let systemCalulatorItemValue = this._getSystemCalculatorItemValue(priceResult, verifyInfo.comparisonValuePath)
      excelVerifyValue = this._fixFloat(excelVerifyValue)
      systemCalulatorItemValue = this._fixFloat(systemCalulatorItemValue)
      if(this._isDeviation(systemCalulatorItemValue, excelVerifyValue)){
        systemCalulatorItemValue = excelVerifyValue
      }
      testfile.addItUpper(itDescription)
      testfile.addAssertEqual(
        systemCalulatorItemValue,
        excelVerifyValue,
        `${itDescription}`
      )
      testfile.addContextEnd()
    }
    testfile.addContextEnd()
    await testfile.save()
  }
  async _generateReport(bomTestData, partlistValue, priceResult){
    const reportName = this._getCommonFileName(bomTestData)
    const report = new ReportGenerator(reportName)
    report.addContent({
      bomTestData : bomTestData,
      partlistValue : partlistValue,
      priceResult : priceResult,
    })
    await report.save()
  }
  _getSystemCalculatorItemValue(priceResult, valuePath){
    const pathList = valuePath.split('.')
    let value = priceResult
    for(const path of pathList){
      if(value.hasOwnProperty(path)){
        value = value[path]
      } else {
        value = null
        break
      }
    }
    return value
  }
  _fixFloat(value){
    if(_.isNumber(value) && value !== 0){
      return formatFloat(value, FLOAT_DIGIT)
    }
    return value
  }
  _isDeviation(systemCalulatorItemValue, excelVerifyValue){
    let deviation = Math.abs(systemCalulatorItemValue - excelVerifyValue)
    deviation = this._fixFloat(deviation)
    return MAXIMUM_DEVIATION >= deviation
  }
  async _process(bomTestData){
    const config = bomRoute[bomTestData.configFilename]
    const formateLower = config.formate.toLowerCase()
    const productTypeInfo = this._getProductTypeInfo(bomTestData.metaData.productType)
    const formulaJson = await partlistService.getPartListLayout(formateLower, productTypeInfo.productTypeId, productTypeInfo.productTypeName)
    let partlistValue = this._generatePartlistValue(bomTestData, formulaJson.layout, productTypeInfo)
    if(formateLower === 'emc-magnet'){
      partlistValue = {
        Price : {
          emcmagnet:partlistValue.Price,
        },
      }
    }
    const priceResult = partlistService.calPartlistPrice(partlistValue, formulaJson.formulas, formulaJson.layout)
    await Promise.all([this._generateTestfile(bomTestData, priceResult), this._generateReport(bomTestData, partlistValue, priceResult)])
  }
  async _initPartlistLayoutCache(bomTestDataList){
    let formateList = {}
    bomTestDataList.forEach((bomTestData)=>{
      const config = bomRoute[bomTestData.configFilename]
      const formateLower = config.formate.toLowerCase()
      const partlistLayoutKey = `${formateLower}_${bomTestData.metaData.productType}`
      const productTypeInfo = this._getProductTypeInfo(bomTestData.metaData.productType)
      formateList[partlistLayoutKey] = {
        formate:formateLower,
        ...productTypeInfo,
      }
    })
    let partlistLayoutKeyList = Object.keys(formateList)
    await Promise.all(partlistLayoutKeyList.map(async(partlistLayoutKey)=>{
      let formateData = formateList[partlistLayoutKey]
      await partlistService.getPartListLayout(formateData.formate, formateData.productTypeId, formateData.productTypeName)
    }))
  }
  async setup(configFileParams){
    try {
      const startTime = new Date().toISOString()
      await this._init()
      const excelParser = new ExcelParser()
      const bomTestDataList = excelParser.getTestDataList(configFileParams)
      await this._initPartlistLayoutCache(bomTestDataList)
      await Promise.all(bomTestDataList.map(this._process.bind(this)))
      const endTime = new Date().toISOString()
      console.log(`create test file finish！`)
      console.log(`start at ${startTime}`)
      console.log(`end at ${endTime}`)
    } catch (error) {
      console.log(`Error :`)
      console.log(error)
      process.exit(1)
    }
    
  }
  async removeAllTestFile(){
    await fileProcess.removeAllTestFile()
  }
}
module.exports = TestBomManager