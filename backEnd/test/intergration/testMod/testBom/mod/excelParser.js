/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
const XLSX = require('xlsx')
const path = require('path')
const _ = require('lodash')
const UUID = require('uuid/v4')
const { bomRoute } = require('../config')
const NUMBER_REG = /^[\d]+$/ig

class ExcelParsrer {
  constructor() {
    this.testDataList = []
    this.mappingConfig = null
  }

  _readExcelObj(_fileName) {
    let xlsxPath = path.join(__dirname, '..', 'excelBomData', _fileName)
    this.workbook = XLSX.readFile(xlsxPath)
  }

  _getSheetSchema() {
    return {
      'configFilename': '',
      'metaData': {},
      'formData': {},
      'verifyData': {},
    }
  }

  _setStartHorizontalCoordinate() {
    this.horizontalCoordinate = this.mappingConfig.startHorizontalCoordinates
  }

  _incHorizontalCoordinate() {
    this.horizontalCoordinate = String.fromCharCode(this.horizontalCoordinate.charCodeAt() + 1)
  }
  _getStartHorizontalCoordinate(){
    return this.mappingConfig.startLongitudinalCoordinates || '1'
  }

  _cellLoc(_LongitudinalCoordinates) {
    return this.horizontalCoordinate + _LongitudinalCoordinates.toString()
  }

  getTestDataList(configFileParams = null) {
    let bomRouteKeyList = Object.keys(bomRoute)
    for (const key of bomRouteKeyList) {
      if (configFileParams && key !== configFileParams) {
        continue
      }
      this.mappingConfig = bomRoute[key]
      this._readExcelObj(this.mappingConfig.xlsxName)
      let xlsxData = this.workbook.Sheets[this.mappingConfig.sheetName]
      this._setStartHorizontalCoordinate()
      while (true) {
        let sheetSchema = this._getSheetSchema()
        sheetSchema['configFilename'] = key
        // 檢查新的檢查項目是否存在，若不存在則跳過
        const startHorizontalCoordinate = this._getStartHorizontalCoordinate()
        if (!(this._cellLoc(startHorizontalCoordinate) in xlsxData))
          break
        let desiredCell = xlsxData[this._cellLoc(startHorizontalCoordinate)]
        if ([null, ''].indexOf(desiredCell) >= 0)
          break

        // metadata Session
        let metadataKeyList = Object.keys(this.mappingConfig.metadata)
        for (const metadataKey of metadataKeyList) {
          let metadataItem = this.mappingConfig.metadata[metadataKey]
          let desiredCell = xlsxData[this._cellLoc(metadataItem.excelValueLongitudinalCoordinates)]
          sheetSchema['metaData'][metadataItem.valuekey] = (desiredCell ? desiredCell.v : null)
        }

        // formdata session
        let formdataKeyList = Object.keys(this.mappingConfig.transferPartlistInfo)
        for (const formdataKey of formdataKeyList) {
          let formdataItem = this.mappingConfig.transferPartlistInfo[formdataKey]
          const objectList = formdataItem['createPath'].split('.').slice(1)

          // 建立物件屬性
          let rootObj = sheetSchema['formData']
          let lastRootObj = {}
          let lastCreatePathKey = ''
          objectList.forEach((createPathKey, index)=>{
            const nextCreatePathKey = objectList[index + 1]
            // 下個key是數字代表其為一個陣列
            if(NUMBER_REG.test(nextCreatePathKey) && _.isUndefined(rootObj[createPathKey])){
              rootObj[createPathKey] = []
            } else if (!(createPathKey in rootObj)) {
              rootObj[createPathKey] = {}
            }
            lastRootObj = rootObj
            lastCreatePathKey = createPathKey
            rootObj = rootObj[createPathKey]
          })
          if (formdataItem.excelValueLongitudinalCoordinates == null) {
            if(lastCreatePathKey === 'uuid'){
              lastRootObj[lastCreatePathKey] = UUID()
            } else if (formdataItem.valueType == 'boolean'){
              if (formdataItem.default == 1){
                lastRootObj[lastCreatePathKey] = true
              } else if (formdataItem.default == 0){
                lastRootObj[lastCreatePathKey] = false
              }else {
                lastRootObj[lastCreatePathKey] = formdataItem.default
              }
            } else {
              lastRootObj[lastCreatePathKey] = formdataItem.default
            }
          } else {
            let desiredCell = xlsxData[this._cellLoc(formdataItem.excelValueLongitudinalCoordinates)]
            if(desiredCell){
              lastRootObj[lastCreatePathKey] = (formdataItem.valueType === 'string') ? desiredCell.v.toString() : desiredCell.v
            } else {
              lastRootObj[lastCreatePathKey] = null
            }
          }
        }

        // verifyInfo session
        let verifyInfoKeyList = Object.keys(this.mappingConfig.verifyInfo)
        for (const verifyInfoKey of verifyInfoKeyList) {
          let verifyInfoItem = this.mappingConfig.verifyInfo[verifyInfoKey]
          let desiredCell = xlsxData[this._cellLoc(verifyInfoItem.excelValueLongitudinalCoordinates)]
          sheetSchema['verifyData'][verifyInfoItem.valuekey] = (desiredCell ? desiredCell.v : null)
        }
        this.testDataList.push(sheetSchema)
        this._incHorizontalCoordinate()
      }
    }
    return this.testDataList
  }
}
module.exports = ExcelParsrer
