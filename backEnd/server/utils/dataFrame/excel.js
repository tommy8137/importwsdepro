/* eslint-disable no-magic-numbers */
const xlsxPopulate = require('xlsx-populate')
require('core-js/modules/es.promise')
require('core-js/modules/es.string.includes')
require('core-js/modules/es.object.assign')
require('core-js/modules/es.object.keys')
require('core-js/modules/es.symbol')
require('core-js/modules/es.symbol.async-iterator')
require('regenerator-runtime/runtime')

const ExcelJS = require('exceljs/dist/es5')
const tv = require('traverse')
const fs = require('fs')
// const path = require('path')
const log4js = require('../../utils/logger/logger')
const { /* DFROOTPATH,*/ PADDING } = require('./const')
const utils = require('./utils')
const tableClasses = require('./table')
const log = log4js.getLogger('dtaFrame.excel')

const ignoreDataTable = ['valuetable', 'spaceRateCostTable', 'odmoemTable']

class Sheet {
  constructor(sheet, sheetJson, sheetData, dynamicName = null) {
    this.sheet = sheet
    this.sheetFormat = sheetJson
    this.sheetData = sheetData
    this.tables = {}
    this.colWidth = {}
    this.dynamicName = dynamicName
  }
  isValidTableClass(tableType) {
    if(!tableClasses.hasOwnProperty(tableType)){
      log.error(`not allowed table type: ${tableType}, needed: ${Object.keys(tableClasses).join(',')}`)
      throw new Error('TABLE_TYPE_NOT_ALLOW')
    }
  }
  isValidDataTableClass(tableKey, tableType){
    if(!this.sheetData.hasOwnProperty(tableKey)) {
      if (!ignoreDataTable.includes(tableType)) {
        log.error(`no matched key: ${tableKey} in sheet data: ${Object.keys(this.sheetData).join(',')}`)
        throw new Error('SHEET_DATA_NOT_MATCHED')
      }
    }
  }
  setTables() {
    this.sheetFormat.tables.forEach((tableFormat, index)=>{
      this.isValidTableClass(tableFormat.tableType)
      this.isValidDataTableClass(tableFormat.key, tableFormat.tableType)
      let tableKey = tableFormat.key// eebomSummary, eebomItem
      if (this.tables.hasOwnProperty(tableKey)){
        tableKey = tableKey.concat('-', index)
      }
      log.info(`sheet data keys: ${Object.keys(this.sheetData)}`)
      log.info(`start to create table: ${tableFormat.key} with table type: ${tableFormat.tableType}, validated talbe: ${Object.keys(tableClasses)}`)
      let para = {
        sheet: this.sheet,
        tableJson: tableFormat,
        tableData: this.sheetData[tableFormat.key],
        dynamicName: this.dynamicName,
      }
      let tableObj =  new tableClasses[tableFormat.tableType](para)
      tableObj.execute()
      this.tables = { ...this.tables, [tableKey]: tableObj }
    })
  }
  getColWidth(){
    Object.keys(this.tables).forEach((tableKey)=>{
      this.tables[tableKey].cells.forEach((cell)=>{
        let { col, width } = cell.getCellWidth()
        if (this.colWidth.hasOwnProperty(col)){
          if (this.colWidth[col] < width) {
            this.colWidth[col] = width
          }
        } else {
          this.colWidth = { ...this.colWidth, [col]: width }
        }
      })
    })
  }
  setColWidth(){
    // log.info(`start to set sheet column width using: ${utils.inspect(this.colWidth)}`)
    Object.keys(this.colWidth).forEach((col)=>{
      let sheetWidth = this.sheet.getColumn(col)
      sheetWidth.width = this.colWidth[col] + PADDING
    })
  }
  execute() {
    this.setTables()
    this.getColWidth()
    this.setColWidth()
  }
}

class Excel {
  constructor(savePath, excelYamlPath, rawData = {}, folderPath = '', dynamicName = null) {
    this.savePath = savePath
    this.excelYamlPath = excelYamlPath
    this.rawData = rawData
    this.workbook = null
    this.excelFormat = {}
    this.sheets = {}
    this.needInit = true
    this.folderPath = folderPath
    this.dynamicName = dynamicName
  }
  async _initAsync() {
    this.workbook = await new ExcelJS.Workbook()
    log.info('init async related function already')
  }
  async _createFolder() {
    if(!fs.existsSync(this.folderPath)) fs.mkdirSync(this.folderPath)
  }
 
  async _getExcel() {
    await this.workbook.xlsx.writeFile(this.savePath)
    log.info(`saved already, to the path`)
  }
   
  async _getExcelJsonFromYaml() {
    this.excelFormat = utils.getFrameInfoFromYamlPath(this.excelYamlPath)
    // log.info(`get excel json ${utils.inspect(JSON.stringify(this.excelFormat), 10)}`)
  }

  _generateSheets() {
    // log.info(`start to generate sheets, raw data: ${utils.inspect(this.rawData, 10)}`)
    this.excelFormat.excel.sheets.forEach((sheetJson, index)=>{
      let label = sheetJson.label || index
      if(this.sheets.hasOwnProperty(label)){
        label = label.concat('-', index)
      }
      let initSheet
      initSheet = this.workbook.addWorksheet(label)
      let sheetObj = new Sheet(initSheet, sheetJson, this.rawData, this.dynamicName)
      log.info(`=========  ${label} ===========`)
      sheetObj.execute()
      this.sheets = { ...this.sheets, [label]: sheetObj }
    })
    log.info(`create sheets with labels: ${Object.keys(this.sheets).join(',')}`)
  }

  async addExtraHeaders(extraHeaders) {
    await this.initJob()
    let needExtraTableKeys = Object.keys(extraHeaders)
    log.info(`the headers in tables: ${needExtraTableKeys.join(',')} will be modified`)
    this.excelFormat = tv(this.excelFormat).forEach(function(item) {
      if (needExtraTableKeys.includes(item)) {
        let exHeader = extraHeaders[item].header ? extraHeaders[item].header : {}
        let insertInto = typeof (extraHeaders[item].insert) === 'number' ? extraHeaders[item].insert : -1
        log.info(`insert extra header: ${utils.inspect(extraHeaders[item])}`)
        log.info(`insert position: ${insertInto}`)
        let newHeaders = utils.overwriteOrConcatJsonWithInsert(this.parent.node.headers, exHeader, insertInto)
        this.parent.node.headers = newHeaders
      }
    })
    log.info(`after add extra header, the format: ${utils.inspect(this.excelFormat)}`)
  }

  async initJob(){
    try {
      await this._createFolder()
      await this._initAsync()
      await this._getExcelJsonFromYaml()
      this.needInit = false
    } catch (e) {
      log.error(`export Excel error: ${e}`)
      log.error('Error', e.stack)
      log.error('Error', e.name)
      log.error('Error', e.message)
    }
  }

  async execute(){
    try {
      if (this.needInit) {
        await this.initJob()
      }
      this._generateSheets()
      await this._getExcel()
      return this.savePath
    } catch (e) {
      log.error(`export Excel error: ${e}`)
      log.error('Error', e.stack)
      log.error('Error', e.name)
      log.error('Error', e.message)
    }
  }
}
module.exports = { Excel }
