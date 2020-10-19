/* eslint-disable no-magic-numbers */
const excelColumnName = require('excel-column-name')
const utils = require('./utils')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('dtaFrame.table')
const cellClasses = require('./cell')
const _ = require('lodash')

// const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i) // not used
const fillColor = {
  'G': 'D9D9D9',
  'Y': 'FFFF00',
  'BLUE': 'DDEBF7',
  'RED': 'FF0000',
  'BLACK': '00000',
  'WHITE': 'FFFFFF',
}

const isValidCell = (checkKey) => {
  if(!cellClasses.hasOwnProperty(checkKey)){
    log.error(`not allowed fieldType: ${checkKey}, needed: ${Object.keys(cellClasses).join(',')}`)
    throw new Error('FIELD_TYPE_NOT_ALLOW')
  } else {
    return cellClasses[checkKey]
  }
}

class Table {
  constructor(sheet, tableJson){
    this.sheet = sheet
    this.tableJson = tableJson
    this.cells = []
  }
  validate() {
    this.validateAnchor()
  }
  validateAnchor() {
    if(!this.tableJson.hasOwnProperty('anchor')){
      log.error('no anchor in table')
      throw new Error('WRONG_TABLE_ANCHOR')
    }
    if(!this.tableJson.anchor.hasOwnProperty('x')) {
      log.error('no anchor.x in table')
      throw new Error('WRONG_TABLE_ANCHOR')
    }
    if(!this.tableJson.anchor.hasOwnProperty('y')) {
      log.error('no anchor.y in table')
      throw new Error('WRONG_TABLE_ANCHOR')
    }
    if(!this.tableJson.anchor.y > 0) {
      log.error('anchor.y not > 0')
      throw new Error('WRONG_TABLE_ANCHOR')
    }
  }
  getAnchorIntX() {
    try {
      this.tableJson.anchor.int_x = excelColumnName.excelColToInt(this.tableJson.anchor.x)
    } catch(e) {
      log.error(`can not get anchorInt: ${utils.inspect(this.tableJson.anchor)}`)
      throw new Error('WRONG_TABLE_ANCHOR')
    }
  }
  setHeader(){
    log.error('parent setHeader() is not implemented')
    throw new Error('NOT_IMPLEMENT')
  }
  setData(){
    log.error('parent setData() is not implemented')
    throw new Error('NOT_IMPLEMENT')
  }
  setAutoFilter(){
    log.error('parent setAutoFilter() is not implemented')
    throw new Error('NOT_IMPLEMENT')
  }
  _setAutoFilter(filterAnchorX, filterAnchorY) {
    this.sheet.autoFilter = `${this.tableJson.anchor.x}${filterAnchorY}:${filterAnchorX}${filterAnchorY}`
  }
  _setAreaMerge(initAnchorX, finalAnchorX, initAnchorY, finalAnchorY) {
    this.sheet.mergeCells(`${initAnchorX}${initAnchorY}:${finalAnchorX}${finalAnchorY}`)
  }
  execute(){
    this.validate()
    this.getAnchorIntX()
    this.setHeader()
    this.setData()
    this.setAutoFilter()
    this.setAreaMerge()
  }
}
class xraySummaryTable extends Table {
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  _setHeader(data, itemTotalLength = 0) {
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
      let cellAnchorY = this.tableJson.anchor.y + itemTotalLength
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()
    })


  }
  setHeader() {
    let itemLength = 0// data have how many type2 items
    let odmItemTotalLength = 0
    let itemTotalLength = 0
    let totalKeysLength = 0
    Object.keys(this.tableData).forEach((summaryKey, vidx) => {
      let typeLength = 0// data have how many type1Cost items
      let totalCostLength// the ODM total column
      this.tableJson.headers['keys'].label = summaryKey

      if(!_.isEmpty(this.tableData[summaryKey])){
        totalKeysLength += Object.keys(this.tableData[summaryKey].type1Cost).length

        Object.keys(this.tableData[summaryKey].type1Cost).forEach((type1Key) => {// calculate odm have how many subItems
          if(vidx == 0) {
            itemLength = 0
            typeLength = 0
            totalCostLength = 0
            odmItemTotalLength += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          }else {
            itemLength = odmItemTotalLength
            typeLength = totalKeysLength - Object.keys(this.tableData[summaryKey].type1Cost).length
            totalCostLength = 3
          }
        })
      }else {
        if(vidx == 0) {
          itemLength = 0
          typeLength = 0
          totalCostLength = 0
        }else {
          itemLength = odmItemTotalLength
          typeLength = totalKeysLength
          totalCostLength = 3
        }
      }
      itemTotalLength = itemLength + typeLength + totalCostLength
      this._setHeader(this.tableData[summaryKey], itemTotalLength)
      
    })
  }
  setData() {
    let odmItemTotalLength = 0
    // let oemItemTotalLength = 0
    let totalKeysLength = 0
    Object.keys(this.tableData).forEach((summaryKey, sidx) => {
      let itemLength = 0// data have how many type2 items
      let typeLength = 0// data have how many type1Cost items
      let totalCostLength// the ODM total column
      let type1TotalCostSite = 0
      let itemKeyLength = 0
      if(!_.isEmpty(this.tableData[summaryKey])) {
        totalKeysLength += Object.keys(this.tableData[summaryKey].type1Cost).length
        Object.keys(this.tableData[summaryKey].type1Cost).forEach((type1Key) => {// calculate odm have how many subItems
          if(sidx == 0) {
            itemLength = 0
            typeLength = 0
            totalCostLength = 1
            odmItemTotalLength += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          }else {
            itemLength = odmItemTotalLength
            typeLength = totalKeysLength - Object.keys(this.tableData[summaryKey].type1Cost).length
            totalCostLength = 4
          }
          type1TotalCostSite += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          itemKeyLength = Object.keys(this.tableData[summaryKey].type1Cost).length
        })
        let defaultSpace = 0
        let diffLength
        Object.keys(this.tableData[summaryKey].type1Cost).forEach((type1Key, ttidx) => {// asic, xtal
          let cellAnchorY
          let cellAnchorX
          defaultSpace += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          diffLength = defaultSpace - this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          this.tableData[summaryKey].type1Cost[type1Key].subItems.forEach((valueArray, vidx) => {// subItems Array
            Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
              cellAnchorY = this.tableJson.anchor.y + itemLength + typeLength + totalCostLength + vidx + ttidx + diffLength
              cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
              let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
              let params = {
                sheet: this.sheet,
                cellJson: this.tableJson.headers[headerKey],
                anchor: { x: cellAnchorX, y: cellAnchorY },
                style: this.tableJson.headers[headerKey].style.value,
                serial: 1,
                value: valueArray[headerKey],
              }
              let cellObj = new cell(params)
              this.cells.push(cellObj)
              cellObj.execute()
            })
          })
          // fill item keys total cost
          Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
            let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
            cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
            this.tableData[summaryKey].type1Cost[type1Key].subTotalCost['type1'] = type1Key + '合計'
            let totalStyle = {
              bold: true,
              border: true,
              bottomBorderStyle: 'thick',
              numberFormat: '#,##0.00000',
            }
            // set item keys total style
            if(cidx == this.tableJson.totalMergeLength - 1 || cidx == Object.keys(this.tableJson.headers).length - 1) totalStyle['rightBorderStyle'] = 'thick'
            if(cidx == 1) totalStyle['leftBorderStyle'] = 'thick'
            let params = {
              sheet: this.sheet,
              cellJson: this.tableJson.headers[headerKey],
              anchor: { x: cellAnchorX, y: cellAnchorY + 1 },
              style: totalStyle,
              serial: 1,
              value: this.tableData[summaryKey].type1Cost[type1Key].subTotalCost[headerKey],
            }
            let cellObj = new cell(params)
            this.cells.push(cellObj)
            cellObj.execute()
          })
        })
      }else {
        if(sidx == 0) {
          itemLength = 0
          typeLength = 0
          totalCostLength = 0
        }else {
          itemLength = odmItemTotalLength
          typeLength = totalKeysLength
          totalCostLength = 4
        }

      }
      // fill odm, oem total cost
      let nonData = {
        keys: summaryKey + '合計',
        lastPrice: '-',
        suggestionCost: '-',
        opportunity: '-',
        opportunityPercent: '-',
      }
      Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
        let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
        let cellAnchorY = this.tableJson.anchor.y + itemLength + typeLength + totalCostLength + type1TotalCostSite + itemKeyLength
        let totalStyle = {
          fill: 'FFC000',
          bold: true,
          border: true,
          topBorderStyle: 'thick',
          bottomBorderStyle: 'thick',
          numberFormat: '#,##0.00000',
        }
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: totalStyle,
          serial: 1,
        }
        
        if(!_.isEmpty(this.tableData[summaryKey])) {
          this.tableData[summaryKey].type1TotalCost['keys'] = summaryKey + '合計'
          params['value'] = this.tableData[summaryKey].type1TotalCost[headerKey]
        }else {
          if(sidx == 0) {
            params['anchor'].y = this.tableJson.anchor.y + 1
          }
          params['value'] = nonData[headerKey]
        }
        let cellObj = new cell(params)
        this.cells.push(cellObj)
        cellObj.execute()
      })
      
    })
  }
  setAutoFilter(){
    log.info('ColumnTable no need to do autoFilter')
  }
  setAreaMerge(){
    // odm oem merge data
    let initSiteX = this.tableJson.anchor.x
    let finalAnchorX = excelColumnName.intToExcelCol(this.tableJson.totalMergeLength)
    let initSiteY = 0
    let finalSiteY = 0
    let odmKeyLength = 0
    let oemKeyLength = 0
    let odmSubItemsTotal = 0
    let oemSubItemsTotal = 0
    let odmItemLength = 0
    let oemItemLength = 0
    Object.keys(this.tableData).forEach((summaryKey, sidx) => {
      if(!_.isEmpty(this.tableData[summaryKey])) {
        Object.keys(this.tableData[summaryKey].type1Cost).forEach((type1Key) => {
          if(sidx == 0) {
            initSiteY = this.tableJson.anchor.y
            odmKeyLength = Object.keys(this.tableData[summaryKey].type1Cost).length
            odmSubItemsTotal += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          }else {
            initSiteY = this.tableJson.anchor.y + odmKeyLength + odmSubItemsTotal + 3
            oemKeyLength = Object.keys(this.tableData[summaryKey].type1Cost).length
            oemSubItemsTotal += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
          }
        })
        if(sidx == 0) {
          finalSiteY = initSiteY + odmKeyLength + odmSubItemsTotal
          this._setAreaMerge(initSiteX, initSiteX, initSiteY, finalSiteY)
        }else {
          finalSiteY = initSiteY + oemKeyLength + oemSubItemsTotal
          this._setAreaMerge(initSiteX, initSiteX, initSiteY, finalSiteY)
        }
        this._setAreaMerge(initSiteX, finalAnchorX, finalSiteY + 1, finalSiteY + 1)
      }else {
        if(sidx == 0) {
          finalSiteY = this.tableJson.anchor.y + 1
          this._setAreaMerge(initSiteX, finalAnchorX, finalSiteY, finalSiteY)
        }else {
          let diffLength = 4
          finalSiteY = this.tableJson.anchor.y + odmSubItemsTotal + diffLength + odmKeyLength
          this._setAreaMerge(initSiteX, finalAnchorX, finalSiteY, finalSiteY)
        }
      }
      // merge item area
      if(!_.isEmpty(this.tableData[summaryKey])) {
        Object.keys(this.tableData[summaryKey].type1Cost).forEach((type1Key, ttidx) => {
          let initItemSiteX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 1)
          if(sidx == 0) {
            initSiteY = this.tableJson.anchor.y + 1
            odmItemLength += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
            let diffLength = odmItemLength - this.tableData[summaryKey].type1Cost[type1Key].subItems.length
            if(ttidx != 0) {
              initSiteY = this.tableJson.anchor.y + 1 + diffLength + ttidx
            }
            finalSiteY = initSiteY + this.tableData[summaryKey].type1Cost[type1Key].subItems.length - 1
          }else {
            initSiteY = this.tableJson.anchor.y + 1 + odmSubItemsTotal + odmKeyLength + 3
            oemItemLength += this.tableData[summaryKey].type1Cost[type1Key].subItems.length
            let diffLength = oemItemLength - this.tableData[summaryKey].type1Cost[type1Key].subItems.length
            if(ttidx != 0) {
              initSiteY = this.tableJson.anchor.y + 1 + odmSubItemsTotal + odmKeyLength + 3 + diffLength + ttidx
            }
            finalSiteY = initSiteY + this.tableData[summaryKey].type1Cost[type1Key].subItems.length - 1
          }
          this._setAreaMerge(initItemSiteX, initItemSiteX, initSiteY, finalSiteY)
        })
      }
      



    })
  }
}

class RowTable extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader(){
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
      let cellAnchorY = this.tableJson.anchor.y
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      let site = this.tableJson.headers[headerKey].dynamicSite
      
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
      }
      if(site) {
        let replace = [this.tableJson.headers[headerKey].label.slice(0, site + 1), this.dynamicName,
          this.tableJson.headers[headerKey].label.slice(site)].join('')
        params['value'] = replace
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()
    })
  }
  setData(){
    this.tableData.forEach((rowData, ridx)=>{
      let checkAvlSpa = rowData['avl_spa_bolder']
      let checkAvlAlt = rowData['avl_alt_bolder']
      let checkStrikeThrough = rowData['is_valid_price']
      let checkPartName = rowData['part_name_highlight']

      Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
        if(checkAvlSpa === true && !_.isNil(this.tableJson.headers['avl_spa_cost'])) {
          this.tableJson.headers['avl_spa_cost'].bolder = true
        }else if(checkAvlSpa !== true && !_.isNil(this.tableJson.headers['avl_spa_cost'])){
          this.tableJson.headers['avl_spa_cost'].bolder = false
        }
        if(checkAvlAlt === true && !_.isNil(this.tableJson.headers['avl_alt_lowest_cost'])) {
          this.tableJson.headers['avl_alt_lowest_cost'].bolder = true
        }else if(checkAvlAlt !== true && !_.isNil(this.tableJson.headers['avl_alt_lowest_cost'])){
          this.tableJson.headers['avl_alt_lowest_cost'].bolder = false
        }
        // check value need to add strike through style
        if(checkStrikeThrough === false && rowData[headerKey] != '-' && !_.isNil(this.tableJson.headers[headerKey].deleteLine)) {
          this.tableJson.headers[headerKey].strikethrough = true
        } else {
          this.tableJson.headers[headerKey].strikethrough = false
        }
        if(checkPartName === true && !_.isNil(this.tableJson.headers['part_name'])) {
          this.tableJson.headers['part_name'].style.value['fill'] = fillColor['Y']
        }else if(checkPartName !== true && !_.isNil(this.tableJson.headers['part_name'])){
          this.tableJson.headers['part_name'].style.value['fill'] = fillColor['WHITE']
        }
        let cellAnchorY = this.tableJson.anchor.y + 1 + ridx
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
        let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: this.tableJson.headers[headerKey].style.value,
          serial: 1 + ridx,
          value: rowData[headerKey],
          bolder: this.tableJson.headers[headerKey].bolder,
          strikethrough: this.tableJson.headers[headerKey].strikethrough,
        }
        let cellObj = new cell(params)
        this.cells.push(cellObj)
        cellObj.execute()
      })
    })
  }
  setAutoFilter(){
    if(this.tableJson.autoFilter) {
      let filterAnchorY = this.tableJson.anchor.y
      let headerCount = Object.keys(this.tableJson.headers).length
      let filterAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + headerCount - 1)
      this._setAutoFilter(filterAnchorX, filterAnchorY)
    }else {
      log.info('RowTable no need to do autoFilter')
    }
  }
  setAreaMerge(){
    log.info('RowTable no need to do merged')
  }
}
class spaTable extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader(){
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
      let cellAnchorY = this.tableJson.anchor.y
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      let site = this.tableJson.headers[headerKey].dynamicSite
      
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
      }
      if(site) {
        let replace = [this.tableJson.headers[headerKey].label.slice(0, site + 1), this.dynamicName,
          this.tableJson.headers[headerKey].label.slice(site)].join('')
        params['value'] = replace
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()
    })
  }
  setData() {
    let cellAnchorYtmp = 0
    let color = ['FFCDD3', 'FFDFB3', 'FFF8C4', 'C8E6C9', 'BBDEFB', 'E1BEE7', 'C5CAE9', 'D7CCC8', 'CFD8DC', 'E0E0E0']
    this.tableData.forEach((rowData, ridx) => {
      if(ridx == 0) cellAnchorYtmp = 0
      else cellAnchorYtmp += this.tableData[ridx - 1].data.length
      this.tableJson.headers['wistronPN'].style.value['fill'] = color[ridx % 10]
      rowData.data.forEach((itemData, iidx) => {
        Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
          let cellAnchorY = this.tableJson.anchor.y + iidx + cellAnchorYtmp + 1
          let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
          let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
          let params = {
            sheet: this.sheet,
            cellJson: this.tableJson.headers[headerKey],
            anchor: { x: cellAnchorX, y: cellAnchorY },
            style: this.tableJson.headers[headerKey].style.value,
            serial: 1 + ridx,
            value: itemData[headerKey],
          }
          let cellObj = new cell(params)
          this.cells.push(cellObj)
          cellObj.execute()
        })
      })

    })
  }
  setAutoFilter(){
    if(this.tableJson.autoFilter) {
      let filterAnchorY = this.tableJson.anchor.y
      let headerCount = Object.keys(this.tableJson.headers).length
      let filterAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + headerCount - 1)
      this._setAutoFilter(filterAnchorX, filterAnchorY)
    }else {
      log.info('ColumnTable no need to do autoFilter')
    }
  }
  setAreaMerge(){
    log.info('RoeTable no need to do merged')
  }
}

class ColumnTable extends Table{
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  validate() {
    super.validate()
    this.validateColLength()
  }
  validateColLength() {
    if(!this.tableJson.colLength > 0) {
      log.error('column length not > 0')
      throw new Error('WRONG_TABLE_COLUMN_LENGTH')
    }
  }
  setHeader(){
    log.info('ColumnTable no need to do setHeader')
  }
  setData(){
    let cellAnchorY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx)=>{
      let cellIntX = Math.floor(idx / this.tableJson.colLength)
      let headerX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 2 * cellIntX)
      let dataX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 2 * cellIntX + 1)
      let cellY = cellAnchorY + (idx % this.tableJson.colLength)
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let site = this.tableJson.headers[headerKey].dynamicSite
      let dataParams = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: dataX, y:cellY },
        style: this.tableJson.headers[headerKey].style.value,
        serial: 1 + idx,
        value: this.tableData[headerKey],
      }
      let dataCellObj = new cellClasses.data(dataParams)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
      let headerParams = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: headerX, y: cellY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        mergeLength: this.tableJson.headers[headerKey].mergeLength,
        verticalDirection: this.tableJson.headers[headerKey].verticalDirection,
        horizontalDirection: this.tableJson.headers[headerKey].horizontalDirection,
      }
      if(site) {
        let replace = [this.tableJson.headers[headerKey].label.slice(0, site + 1), this.dynamicName,
          this.tableJson.headers[headerKey].label.slice(site)].join('')
        headerParams['value'] = replace
      }
      let headerCellObj = new dataCell(headerParams)
      this.cells.push(headerCellObj)
      headerCellObj.execute()
      // set remark
      if(this.tableJson.headers[headerKey].remarkSite != null && this.tableJson.headers[headerKey].remarkSite.length > 0) {
        _.forEach(this.tableJson.headers[headerKey].remarkSite, (i, index) => {
          let remarkCellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 2 * cellIntX + i)
          let remarkParams = {
            sheet: this.sheet,
            cellJson: this.tableJson.headers[headerKey],
            anchor: { x: remarkCellAnchorX, y: cellY },
            style: this.tableJson.headers[headerKey].style.data,
            value: this.tableJson.headers[headerKey].remark[index],
            autoFilter: this.tableJson.headers[headerKey].autoFilter,
          }
          let remarkCellObj = new cellClasses.data(remarkParams)
          this.cells.push(remarkCellObj)
          remarkCellObj.execute()
        })
      }
    })
  }
  setAutoFilter(){
    log.info('ColumnTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('RoeTable no need to do merged')
  }

}

class ValueTable extends Table{
  constructor({ sheet, tableJson }){
    super(sheet, tableJson)
  }
  setHeader(){
    log.info('ColumnTable no need to do setHeader')
  }
  validate() {
    super.validate()
    this.validateColLength()
  }
  validateColLength() {
    if(!this.tableJson.colLength > 0) {
      log.error('column length not > 0')
      throw new Error('WRONG_TABLE_COLUMN_LENGTH')
    }
  }
  setData(){
    let cellAnchorY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx)=>{
      let cellIntX = Math.floor(idx / this.tableJson.colLength)
      let dataX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cellIntX)
      let cellY = cellAnchorY + (idx % this.tableJson.colLength)
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let style = this.tableJson.headers[headerKey].style.value
      if(this.tableJson.headers[headerKey].borderAdjust) {
        if(idx == 0) style['borderLeft'] = true
        if(idx == Object.keys(this.tableJson.headers).length - 1) style['borderRight'] = true
      }
      let dataParams = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: dataX, y: cellY },
        style: style,
      }
      let dataCellObj = new dataCell(dataParams)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
    })
  }
  setAutoFilter(){
    log.info('ColumnTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('RoeTable no need to do merged')
  }
}
class dynamicHeaderTable extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader(){
    this.tableData.header.forEach((headerKey, idx) => {
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + idx)
      let cellAnchorY = this.tableJson.anchor.y
      let params
      if(this.tableData.headerKey[headerKey]) {
        params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: this.tableJson.headers[headerKey].style.header,
          value: this.tableData.headerKey[headerKey],
          autoFilter: this.tableJson.headers[headerKey].autoFilter,
        }
      }else {
        params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: this.tableJson.headers[headerKey].style.header,
          value: this.tableJson.headers[headerKey].label,
          autoFilter: this.tableJson.headers[headerKey].autoFilter,
        }
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()


    })
  }
  setData(){
    this.tableData.value.forEach((data, idx) => {
      this.tableData.header.forEach((headerKey, sidx) => {
        let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)

        let cellAnchorY = this.tableJson.anchor.y + idx + 1
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + sidx)
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: this.tableJson.headers[headerKey].style.value,
          serial: 1,
          value: data[headerKey],
        }
        let cellObj = new cell(params)
        this.cells.push(cellObj)
        cellObj.execute()
      })
    })

  }
  setAutoFilter(){
    if(this.tableJson.autoFilter) {
      let filterAnchorY = this.tableJson.anchor.y
      let headerCount = Object.keys(this.tableJson.headers).length
      let filterAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + headerCount - 1)
      this._setAutoFilter(filterAnchorX, filterAnchorY)
    }else {
      log.info('RowTable no need to do autoFilter')
    }
  }
  setAreaMerge(){
    log.info('RoeTable no need to do merged')
  }

}

class traverseTable extends Table {
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader(){
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
      let cellAnchorY
      let cellAnchorX
      let headerCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let horizontalWithNoData = this.tableJson.headers[headerKey].horizontalWithNoData
      let mergeSite = 1 + this.tableJson.headers[headerKey].mergeLength// 要進行合併的位置, 加一的話是合併儲存格完的下一個位置
      if(!this.tableJson.headers[headerKey].data) {
        cellAnchorX = horizontalWithNoData ? excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + mergeSite * cidx) : excelColumnName.intToExcelCol(this.tableJson.anchor.int_x)
        cellAnchorY = this.tableJson.anchor.y
      }else{
        cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 1)
        cellAnchorY = this.tableJson.anchor.y + cidx - 1
      }
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        mergeLength: this.tableJson.headers[headerKey].mergeLength,
        verticalDirection: this.tableJson.headers[headerKey].verticalDirection,
        horizontalDirection: this.tableJson.headers[headerKey].horizontalDirection,
      }
      let cellObj = new headerCell(params)
      this.cells.push(cellObj)
      cellObj.execute()
    })
  }
  setData(){
    this.tableData.forEach((rowData, ridx)=>{
      let params = {}
      Object.keys(rowData).forEach((headerKey, cidx)=>{
        if(this.tableJson.headers[headerKey].data) {
          let cellAnchorY = this.tableJson.anchor.y + ridx
          let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx + 1)
          let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
          params = {
            sheet: this.sheet,
            cellJson: this.tableJson.headers[headerKey],
            anchor: { x: cellAnchorX, y: cellAnchorY },
            style: this.tableJson.headers[headerKey].style.value,
            serial: 1 + ridx,
            value: rowData[headerKey],
          }
          
          let cellObj = new cell(params)
          this.cells.push(cellObj)
          cellObj.execute()
        }else {
          log.info('This cell noes not need to setData()')
        }
        
      })
    })
  }
  setAutoFilter(){
    log.info('ColumnTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('RoeTable no need to do merged')
  }
}

class listTable extends Table{
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  validate() {
    super.validate()
    this.validateColLength()
  }
  validateColLength() {
    if(!this.tableJson.colLength > 0) {
      log.error('column length not > 0')
      throw new Error('WRONG_TABLE_COLUMN_LENGTH')
    }
  }
  setHeader(){
    log.info('ColumnTable no need to do setHeader')
  }
  setData(){
    
    Object.keys(this.tableJson.headers).forEach((headerKey, idx)=>{
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x)
      let cellAnchorY = this.tableJson.anchor.y + idx
      let dataParams
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      if(!this.tableJson.headers[headerKey].data) {
        dataParams = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y:cellAnchorY },
          style: this.tableJson.headers[headerKey].style.header,
          serial: 1 + idx,
          value: this.tableJson.headers[headerKey].label,
        }
      }else {
        dataParams = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y:cellAnchorY },
          style: this.tableJson.headers[headerKey].style.value,
          serial: 1 + idx,
          value: this.tableData[headerKey],
        }
      }
      
      let dataCellObj = new dataCell(dataParams)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
    })
  }
  setAutoFilter(){
    log.info('ColumnTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('RowTable no need to do merged')
  }
}
class unitTable extends Table {
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader(){
    log.info('unitTable no need to do setHeader')
  }
  setData(){
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x)
      let cellAnchorY = this.tableJson.anchor.y
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y:cellAnchorY },
        style: this.tableJson.headers[headerKey].style.value,
        serial: 1 + idx,
        value: `${this.tableJson.headers[headerKey].label}:${this.tableData[0][headerKey]}`,
      }
      let dataCellObj = new cell(params)
      this.cells.push(dataCellObj)
      dataCellObj.execute()

    })
  }
  setAutoFilter(){
    log.info('unitTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('unitTable no need to do merged')
  }
}

class RowTableFor2nd extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader(){
    let adjustSite = this._setAdjustSite()
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{

      let cellAnchorY = this.tableJson.anchor.y + adjustSite
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()

      // remark
      if(this.tableJson.headers[headerKey].remarkSite != null && this.tableJson.headers[headerKey].remarkSite.length > 0) {
        _.forEach(this.tableJson.headers[headerKey].remarkSite, (i, idx) => {
          let remarkCellAnchorY = this.tableJson.anchor.y - i + adjustSite
          let remarkParams = {
            sheet: this.sheet,
            cellJson: this.tableJson.headers[headerKey],
            anchor: { x: cellAnchorX, y: remarkCellAnchorY },
            style: this.tableJson.headers[headerKey].style.data,
            value: this.tableJson.headers[headerKey].remark[idx],
            autoFilter: this.tableJson.headers[headerKey].autoFilter,
          }
          let remarkCellObj = new cellClasses.data(remarkParams)
          this.cells.push(remarkCellObj)
          remarkCellObj.execute()
        })
      }

      // subHeader
      if(this.tableJson.headers[headerKey].subHeader && this.tableJson.headers[headerKey].subHeader.length > 0) {
        let subHeaderCellAnchorY = this.tableJson.anchor.y - this.tableJson.headers[headerKey].subHeaderSite + adjustSite
        let style = this.tableJson.headers[headerKey].subHeaderColor ? this.tableJson.headers[headerKey].style.sub_color : this.tableJson.headers[headerKey].style.header
        if(this.tableJson.headers[headerKey].twoHeader) style = this.tableJson.headers[headerKey].style.subHeader
        let subParams = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: subHeaderCellAnchorY },
          style: style,
          value: this.tableJson.headers[headerKey].subHeader,
          mergeLength: this.tableJson.headers[headerKey].subHeaderMerge,
          autoFilter: this.tableJson.headers[headerKey].autoFilter,
        }
        let subHeaderCellObj = new cellClasses.subheadermerged(subParams)
        this.cells.push(subHeaderCellObj)
        subHeaderCellObj.execute()
      }

      // mainHeader
      if(this.tableJson.headers[headerKey].mainHeader && this.tableJson.headers[headerKey].mainHeader.length > 0) {
        let mainHeaderCellAnchorY = this.tableJson.anchor.y - this.tableJson.headers[headerKey].mainHeaderSite + adjustSite
        let style = this.tableJson.headers[headerKey].style.header
        if(this.tableJson.headers[headerKey].threeHeader) style = this.tableJson.headers[headerKey].style.mainHeader
        let mainParams = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: mainHeaderCellAnchorY },
          style: style,
          value: this.tableJson.headers[headerKey].mainHeader,
          mergeLength: this.tableJson.headers[headerKey].mainHeaderMerge,
          autoFilter: this.tableJson.headers[headerKey].autoFilter,
        }
        let mainHeaderCellObj = new cellClasses.subheadermerged(mainParams)
        this.cells.push(mainHeaderCellObj)
        mainHeaderCellObj.execute()
      }
    })
  }
  setData(){
    let adjustSite = this._setAdjustSite()
    this.tableData.forEach((rowData, ridx)=>{
      Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
        if(this.tableJson.headers[headerKey].needFillAlter) {
          this.tableJson.headers[headerKey].style.value['fill'] = fillColor[`${rowData['alter_sugg_sourcer_color']}`]
        }
        if(this.tableJson.headers[headerKey].needFillMain) {
          this.tableJson.headers[headerKey].style.value['fill'] = fillColor[`${rowData['main_sourcer_color']}`]
        }
        if(this.tableJson.lastColor && this.tableData.length > 0 && ridx == this.tableData.length - 1) {
          this.tableJson.headers[headerKey].style.value['fill'] = fillColor['BLUE']
          this.tableJson.headers[headerKey].style.value['bold'] = true
        }
        if(this.tableJson.headers[headerKey].discolor && rowData[headerKey] < 0) {
          this.tableJson.headers[headerKey].style.value['fontColor'] = fillColor['RED']
        } else if(this.tableJson.headers[headerKey].discolor && rowData[headerKey] >= 0){
          this.tableJson.headers[headerKey].style.value['fontColor'] = fillColor['BLACK']
        }
        let style = this.tableJson.headers[headerKey].totalColor && ridx == this.tableData.length - 1 ? this.tableJson.headers[headerKey].style.total_color : this.tableJson.headers[headerKey].style.value
        let cellAnchorY = this.tableJson.anchor.y + 1 + ridx + adjustSite
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
        let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: style,
          serial: 1 + ridx,
          value: rowData[headerKey],
          bolder: this.tableJson.headers[headerKey].bolder,
        }
        let cellObj = new cell(params)
        this.cells.push(cellObj)
        return cellObj.execute()
      })
    })
  }
  setAutoFilter(){
    if(this.tableJson.autoFilter) {
      let filterAnchorY = this.tableJson.anchor.y
      let headerCount = Object.keys(this.tableJson.headers).length
      let filterAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + headerCount - 1)
      this._setAutoFilter(filterAnchorX, filterAnchorY)
    }else {
      log.info('RowTable2nd no need to do autoFilter')
    }
  }
  setAreaMerge(){
    log.info('RowTable2nd no need to do merged')
  }
  _setAdjustSite() {
    let adjustSite = 0
    if(this.tableJson.adjustSite) {
      let count = _.reduce(this.tableData, (acc, curr) => {
        if(curr['part_category1'].length > 0) {
          return acc + 1
        }
        return acc
      }, 0)
      adjustSite = ((count - 1)/2 + 1) + this.tableJson.baseSite
    }
    return adjustSite
  }
}
class summaryFor2nd extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader() {
    // 直向
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let cellAnchorY = this.tableJson.anchor.y + idx
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x)
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
        mergeLength: 2,
      }
      let cellObj = new cellClasses.data(params)
      if(idx == 0) {
        cellObj = new cellClasses.rowheadermerges(params)
      }
      this.cells.push(cellObj)
      cellObj.execute()
    })
    let headerCount = 0
    let subHeaderCount = 0
    // 橫列
    if(Object.keys(this.tableData).length > 0) {
      Object.keys(this.tableData[Object.keys(this.tableData)[0]]).forEach((headerKey, cidx) => {
        let cellAnchorY = this.tableJson.anchor.y
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx + headerCount + 1)
        let params = {
          sheet: this.sheet,
          cellJson: null,
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: {
            fontColor: 'FFFFFF',
            fill: '0070C0',
            border: true,
            bold: true,
            horizontalAlignment: 'center',
          },
          mergeLength: 2,
          value: this.tableJson.headerConfig[headerKey],
        }
        let cellObj = new cellClasses.subheadermerged(params)
        this.cells.push(cellObj)
        cellObj.execute()
        headerCount++
        let total_cost = Object.keys(this.tableData)[0]
        Object.keys(this.tableData[total_cost][headerKey]).forEach((subHeader, sidx) => {
          let subCellAnchorY = this.tableJson.anchor.y + 1
          let subCellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx + sidx + subHeaderCount + 1)
          let subParams = {
            sheet: this.sheet,
            cellJson: null,
            anchor: { x: subCellAnchorX, y: subCellAnchorY },
            style: {
              fontColor: 'FFFFFF',
              fill: '0070C0',
              border: true,
              bold: true,
              horizontalAlignment: 'center',
            },
            value: this.tableJson.headerConfig[subHeader],
          }
          cellObj = new cellClasses.data(subParams)
          this.cells.push(cellObj)
          cellObj.execute()
        })
        subHeaderCount++
      })

    }
    
  }
  setData() {
    delete this.tableJson.headers[Object.keys(this.tableJson.headers)[0]]
    delete this.tableJson.headers[Object.keys(this.tableJson.headers)[0]]
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let sum = 0
      if(Object.keys(this.tableData).length > 0) {
        Object.keys(this.tableData[headerKey]).forEach((typeKey, cidx) => {
          Object.keys(this.tableData[headerKey][typeKey]).forEach((rowDataKey, vidx) => {
            let cellAnchorY = this.tableJson.anchor.y + 2 + idx
            let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx + vidx + sum + 1)
            let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
            let params = {
              sheet: this.sheet,
              cellJson: this.tableJson.headers[headerKey],
              anchor: { x: cellAnchorX, y: cellAnchorY },
              style: this.tableJson.headers[headerKey].style.value,
              value: this.tableData[headerKey][typeKey][rowDataKey],
            }
            let cellObj = new cell(params)
            this.cells.push(cellObj)
            cellObj.execute()
          })
          sum++
        })

      }
      
    })
  }
  setAutoFilter(){
    log.info('unitTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('unitTable no need to do merged')
  }
}

class newOpportunityTable extends Table {
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader(){
    let cellAnchorY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx)=>{
      let cellIntX = Math.floor(idx / this.tableJson.colLength)
      let headerX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cellIntX)
      let cellY = cellAnchorY + (idx % this.tableJson.colLength)
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let headerParams = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: headerX, y: cellY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
      }
      let headerCellObj = new dataCell(headerParams)
      this.cells.push(headerCellObj)
      return headerCellObj.execute()
    })
  }
  setData(){
    log.info('newOpportunityTable no need to set data')
  }
  setAutoFilter(){
    log.info('RowTable no need to do autoFilter')
  }
  setAreaMerge(){
    let cellAnchorY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let cellIntX = Math.floor(idx / this.tableJson.colLength)
      let initAnchorX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cellIntX)
      let finalAnchorX
      let finalAnchorY = cellAnchorY + (idx % this.tableJson.colLength)
      if(this.tableJson.headers[headerKey].rowMerge && this.tableJson.headers[headerKey].columnMerge) {
        finalAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cellIntX + 1)
        return this._setAreaMerge(initAnchorX, finalAnchorX, finalAnchorY, finalAnchorY + 1)
      }
      if(this.tableJson.headers[headerKey].rowMerge && !this.tableJson.headers[headerKey].columnMerge) {
        finalAnchorX = initAnchorX
        return this._setAreaMerge(initAnchorX, finalAnchorX, finalAnchorY, finalAnchorY + 1)
      }
    })
  }
}

class SpaceRateTable extends Table {
  constructor({ sheet, tableJson, tableData, dynamicName = null }){
    super(sheet, tableJson)
    this.tableData = tableData
    this.dynamicName = dynamicName
  }
  setHeader(){
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
      let cellAnchorY = this.tableJson.anchor.y
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
        autoFilter: this.tableJson.headers[headerKey].autoFilter,
      }
      let cellObj = new cellClasses.data(params)
      this.cells.push(cellObj)
      cellObj.execute()

     

      // subHeader
      if(this.tableJson.headers[headerKey].subHeader && this.tableJson.headers[headerKey].subHeader.length > 0) {
        let subHeaderCellAnchorY = this.tableJson.anchor.y - this.tableJson.headers[headerKey].subHeaderSite
        let style = this.tableJson.headers[headerKey].style.header
        if(this.tableJson.headers[headerKey].twoHeader) style = this.tableJson.headers[headerKey].style.subHeader
        let subParams = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: subHeaderCellAnchorY },
          style: style,
          value: this.tableJson.headers[headerKey].subHeader,
          mergeLength: this.tableJson.headers[headerKey].subHeaderMerge,
          autoFilter: this.tableJson.headers[headerKey].autoFilter,
        }
        let subHeaderCellObj = new cellClasses.subheadermerged(subParams)
        this.cells.push(subHeaderCellObj)
        subHeaderCellObj.execute()
      }
    })
  }
  setData(){
    this.tableData.forEach((rowData, ridx)=>{
      Object.keys(this.tableJson.headers).forEach((headerKey, cidx)=>{
        let style = this.tableJson.headers[headerKey].style.value
        let cellAnchorY = this.tableJson.anchor.y + 1 + ridx
        let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
        let cell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        if(ridx == this.tableData.length - 1) style['borderBottom'] = true
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: style,
          serial: 1 + ridx,
          value: rowData[headerKey],
          bolder: this.tableJson.headers[headerKey].bolder,
        }
        let cellObj = new cell(params)
        this.cells.push(cellObj)
        return cellObj.execute()
      })
    })
  }
  setAutoFilter(){
    log.info('RowTable2nd no need to do autoFilter')
    
  }
  setAreaMerge(){
    let initAnchorY = this.tableJson.anchor.y + 1
    let finalAnchorY = this.tableJson.anchor.y + this.tableData.length
    Object.keys(this.tableJson.headers).forEach((headerKey, cidx) => {
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + cidx)
      if(this.tableJson.headers[headerKey].needMerge){
        return this._setAreaMerge(cellAnchorX, cellAnchorX, initAnchorY, finalAnchorY)
      }
    })
  }
}

class SpaceRateCostTable extends Table {
  constructor({ sheet, tableJson }){
    super(sheet, tableJson)
    // this.tableData = tableData
  }
  setHeader(){
    log.info('SpaceRateCostTable no need to do setHeader')
  }
  setData(){
    let cellAnchorY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx)=>{
      let dataX =  excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + this.tableJson.headers[headerKey].xSite)
      let cellY = cellAnchorY + this.tableJson.headers[headerKey].ySite
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let dataParams = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: dataX, y: cellY },
        style: this.tableJson.headers[headerKey].style.value,
      }
      let dataCellObj = new dataCell(dataParams)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
    })
  }
  setAutoFilter(){
    log.info('spaceRateCostTable no need to do autoFilter')
    
  }
  setAreaMerge(){
    let cellY = this.tableJson.anchor.y
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let initCellX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + idx * 3)
      let finalCellX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + idx * 3 + this.tableJson.headers[headerKey].mergeSiteX)
      let initCellY = cellY + this.tableJson.headers[headerKey].ySite
      let finalCellY = initCellY + this.tableJson.headers[headerKey].mergeSiteY
      this._setAreaMerge(initCellX, finalCellX, initCellY, finalCellY)
    })
  }
}

class OdmoemTable extends Table {
  constructor({ sheet, tableJson, tableData }){
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader(){
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let cellAnchorY = this.tableJson.anchor.y + idx
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x)
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.header,
        value: this.tableJson.headers[headerKey].label,
      }
      let dataCellObj = new dataCell(params)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
    })
  }
  setData(){
    Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
      let cellAnchorY = this.tableJson.anchor.y + idx
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 1)
      let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
      let params = {
        sheet: this.sheet,
        cellJson: this.tableJson.headers[headerKey],
        anchor: { x: cellAnchorX, y: cellAnchorY },
        style: this.tableJson.headers[headerKey].style.value,
        value: this.tableJson.headers[headerKey].subLabel,
      }
      let dataCellObj = new dataCell(params)
      this.cells.push(dataCellObj)
      dataCellObj.execute()
    })
    
  }
  setAutoFilter(){
    log.info('OdmoemTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('OdmoemTable no need to do autoFilter')
  }
}
class WsdTable extends Table {
  constructor({ sheet, tableJson, tableData }) {
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader() {
    this.tableData.forEach((rowData, ridx) => {
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4))
      Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
        let cellAnchorY = this.tableJson.anchor.y + idx
        let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        let params = {
          sheet: this.sheet,
          cellJson: this.tableJson.headers[headerKey],
          anchor: { x: cellAnchorX, y: cellAnchorY },
          style: this.tableJson.headers[headerKey].style.header,
          value: this.tableJson.headers[headerKey].label,
        }
        let dataCellObj = new dataCell(params)
        this.cells.push(dataCellObj)
        dataCellObj.execute()
      })
    })
  }
  setData() {
    
    this.tableData.forEach((rowData, ridx) => {
      let key = []

      Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
        let cellAnchorY

        if(this.tableJson.headers[headerKey].dataKey) {
          this.tableJson.headers[headerKey].dataKey.forEach((dataKey, didx) => {
            key.push(dataKey)
            let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 1 + (ridx * 4) + didx)
            cellAnchorY = this.tableJson.anchor.y
            let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
            let params = {
              sheet: this.sheet,
              cellJson: this.tableJson.headers[headerKey],
              anchor: { x: cellAnchorX, y: cellAnchorY },
              style: didx == this.tableJson.headers[headerKey].dataKey.length - 1 ? this.tableJson.headers[headerKey].style.gap_style : this.tableJson.headers[headerKey].style.value,
              value: this.tableJson.headers[headerKey].data[didx],
            }
            let dataCellObj = new dataCell(params)
            this.cells.push(dataCellObj)
            dataCellObj.execute()
          })
        } else {
          key.forEach((kData, kidx) => {
            let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + 1 + kidx + (ridx * 4))
            cellAnchorY = this.tableJson.anchor.y + idx
            let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
            let value = rowData[kData] ? rowData[kData][headerKey] : null
            let params = {
              sheet: this.sheet,
              cellJson: this.tableJson.headers[headerKey],
              anchor: { x: cellAnchorX, y: cellAnchorY },
              style: this.tableJson.headers[headerKey].style.value,
              value: value,
            }
            let dataCellObj = new dataCell(params)
            this.cells.push(dataCellObj)
            dataCellObj.execute()

          })
        }
      })
    })
    
  }
  setAutoFilter(){
    log.info('OdmoemTable no need to do autoFilter')
  }
  setAreaMerge(){
    this.tableData.forEach((rowData, ridx) => {
      let initCellX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4) + 1 )
      let endCellX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4) + 2)
      Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
        let cellAnchorY = this.tableJson.anchor.y + idx
        if(this.tableJson.headers[headerKey].needMerge) {
          this._setAreaMerge(initCellX, endCellX, cellAnchorY, cellAnchorY)
        }
      })
    })
  }
}

class CalGapTable extends Table {
  constructor({ sheet, tableJson, tableData }) {
    super(sheet, tableJson)
    this.tableData = tableData
  }
  setHeader(){
    log.info('CalGapTable no need to do setHeader')
  }
  setData(){
    this.tableData.forEach((rowData, ridx) => {
      let cellAnchorX = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4))
      let formula = ''
      Object.keys(this.tableJson.headers).forEach((headerKey, idx) => {
        let cellAnchorY = this.tableJson.anchor.y + idx
        let dataCell = isValidCell(this.tableJson.headers[headerKey].fieldType)
        if(this.tableJson.headers[headerKey].value) {
          let costDiffStyle = (rowData['sourcer'][headerKey] - rowData['epro'][headerKey]) / rowData['sourcer'][headerKey]
          let firstSite = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4) - 1)
          let secondSite = excelColumnName.intToExcelCol(this.tableJson.anchor.int_x + (ridx * 4) - 2)
          let oriFormula = this.tableJson.headers[headerKey].value
          formula = this.tableJson.headers[headerKey].value.replace(/_temp/g, cellAnchorY)
          formula = formula.replace(/_first/g, firstSite)
          formula = formula.replace(/_second/g, secondSite)
          this.tableJson.headers[headerKey].value = formula
          if(costDiffStyle > 0.2 || costDiffStyle < -0.2 ) {
            this.tableJson.headers[headerKey].style.value['fill'] = 'FFFF00'
          }
          let dataParams = {
            sheet: this.sheet,
            cellJson: this.tableJson.headers[headerKey],
            anchor: { x: cellAnchorX, y: cellAnchorY },
            style: this.tableJson.headers[headerKey].style.value,
          }
          let dataCellObj = new dataCell(dataParams)
          this.cells.push(dataCellObj)
          dataCellObj.execute()
          this.tableJson.headers[headerKey].value = oriFormula
          this.tableJson.headers[headerKey].style.value['fill'] = 'FFFFFF'
        }
      })
    })
  }
  setAutoFilter(){
    log.info('CalGapTable no need to do autoFilter')
  }
  setAreaMerge(){
    log.info('CalGapTable no need to do autoFilter')
  }
}

module.exports = {
  rowtable: RowTable,
  rowtable2nd: RowTableFor2nd,
  columntable: ColumnTable,
  valuetable: ValueTable,
  traversetable: traverseTable,
  listtable: listTable,
  spatable: spaTable,
  xraysummarytable: xraySummaryTable,
  unittable: unitTable,
  dynamicheadertable: dynamicHeaderTable,
  summaryfor2nd: summaryFor2nd,
  newOpportunityTable: newOpportunityTable,
  spaceRateTable: SpaceRateTable,
  spaceRateCostTable: SpaceRateCostTable,
  odmoemTable: OdmoemTable,
  wsdTable: WsdTable,
  calGapTable: CalGapTable,
}
