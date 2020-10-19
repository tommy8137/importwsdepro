require('core-js/modules/es.promise')
require('core-js/modules/es.string.includes')
require('core-js/modules/es.object.assign')
require('core-js/modules/es.object.keys')
require('core-js/modules/es.symbol')
require('core-js/modules/es.symbol.async-iterator')
require('regenerator-runtime/runtime')
const xlsxPopulate = require('xlsx-populate')
const excelColumnName = require('excel-column-name')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('CleansheetExport')
const dfutils = require('../dataFrame/utils')

const fixMath = require('../../helpers/math/math.js')
const FORMULARE = /(\w+)/g 

const genExcel = require('exceljs/dist/es5')

class Excel {
  constructor() {
    this.workbook = null
    this.workbookByNewModule = null
    this.data = {}
  }

  /**
   * 生成 workbook 物件，並設定資料
   * @param {*} data 資料
   */
  async init(data) {
    this.workbook = await xlsxPopulate.fromBlankAsync()
    this.data = data
    return this
  }

  async initByNewModule(data) {
    this.workbookByNewModule = await new genExcel.Workbook()
    this.data = data
    return this
  }

  /**
   * 新增excel裡面的頁面
   * @param {String} sheetName 要增加的頁面名稱
   * @returns {Number} 目前的SheetId
   */
  addSheet(sheetName) {
    if (this.workbook.sheet(0).name() === 'Sheet1') { // 如果有預設的頁籤，改名成新的名稱
      this.workbook.sheet(0).name(sheetName)
    } else {
      this.workbook.addSheet(sheetName)
    }
    return this.workbook.sheets().length - 1
  }

  addSheetByNewModule(sheetName) {
    this.workbookByNewModule.addWorksheet(sheetName)
    return this.workbookByNewModule.worksheets.length
  }

  /**
   * 產生Excel檔案
   * @param {String} fileName Excel 名稱
   * @param {String} filePath Excel 存放路徑。Default: __dirname
   */
  async export(fileName, filePath = __dirname) {
    await this.workbook.toFileAsync(path.resolve(filePath, `${fileName}.xlsx`))
  }

  async exportByNewModule(fileName, filePath = __dirname) {
    await this.workbookByNewModule.xlsx.writeFile(path.resolve(filePath, `${fileName}.xlsx`))
  }

  /**
   * 產生指定數量的array
   * @param {Number} number array大小
   */
  _genEmptyArray(number) {
    return Array.from(Array(number)).map((nouse, idx) => idx)
  }

  /**
   *
   * 建立檔案資料夾
   * @param {String} path 資料夾路徑
   */
  async _creatFileFolder(folderPath) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
  }

  /**
   * 設定 sheet 欄寬，基本樣式，
   * @param {*} sheet xlsxPopulate 的 Sheet 物件
   */
  setCommonStyle(sheet) {
    const CELL_UNIT_WIDTH = 1.6
    const CELL_MIN_WIDTH = 16
    const CELL_MAX_WIDTH = 160
    const values = sheet.usedRange().value()
    const maxWordCount = values[0].map((nouse, idx) => {
      return values.reduce((maxLength, items) => {
        const val = items[idx]
        if (!val) return maxLength
        return val.length > maxLength ? val.length : maxLength
      }, 0)
    })
    // console.log('maxWordCount :', maxWordCount);
    maxWordCount.forEach((val, idx) => {
      const defaultWidth = val < 10 ? CELL_MIN_WIDTH : val * CELL_UNIT_WIDTH
      const wrapWidth = (defaultWidth > CELL_MAX_WIDTH ? CELL_MAX_WIDTH : defaultWidth)

      sheet.column(idx + 1).width(wrapWidth)
      sheet.column(idx + 1).style({
        fontFamily: 'arial',
        horizontalAlignment: 'left',
        verticalAlignment: 'center',
        fontSize: 12,
        wrapText: true,
      })
    })
  }
  /**
   * 設定 sheet 欄寬，基本樣式，
   * @param {*} sheet xlsxPopulate 的 Sheet 物件
   */
  setCommonStyleByNewModule(sheet) {
    const CELL_UNIT_WIDTH = 1.6
    const CELL_MIN_WIDTH = 16
    const CELL_MAX_WIDTH = 160
    let handleArray = []
    sheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
      let toArray = Object.values(row.values)
      let leakCount = toArray.length <= 8 ? 8 - toArray.length : 0
      let fillArray = toArray.concat(...Array(leakCount).fill('null'))
      handleArray.push(fillArray)
    });
    const maxWordCount = handleArray[0].map((nouse, idx) => {
      return handleArray.reduce((maxLength, items) => {
        const val = items[idx]
        if (!val) return maxLength
        return val.length > maxLength ? val.length : maxLength
      }, 0)
    })
    // console.log('maxWordCount :', maxWordCount);
    maxWordCount.forEach((val, idx) => {
      const defaultWidth = val < 10 ? CELL_MIN_WIDTH : val * CELL_UNIT_WIDTH
      const wrapWidth = (defaultWidth > CELL_MAX_WIDTH ? CELL_MAX_WIDTH : defaultWidth)
      let adjustCol = sheet.getColumn(idx + 1)
      adjustCol.width = wrapWidth
      adjustCol.alignment = {
        wrapText: true,
        vertical: this.VERTICALALIGNMENT,
        horizontal: this.HORIZONTALALIGNMENT,
      }
    })
  }
}

class CleansheetExport extends Excel {
  constructor() {
    super()
    this.STYLE_BORDER_THICK = 'thick'
    this.STYLE_BORDER_THIN = 'thin'
    this.FONT_CATEGORY = 'arial'
    this.FONT_SIZE = 12
    this.VERTICALALIGNMENT = 'middle'
    this.HORIZONTALALIGNMENT = 'left'

    // this.projectValue = []
    // this.nextProjectRow = 0
    // this.nowDataCount = null
    this.endRow = null
    this.endRowByNewModule = null
  }
  _getProjectInfoHeaderByNewModule(sheet, startRow = 1, startCell = 1) {
    const  { projectInfo = {} } = this.data
    const values = [
      [
        'Project Name', projectInfo.projectName,
        'Stage', projectInfo.stage,
        'Project Code', projectInfo.projectCode,
        '日期', new Date().toLocaleDateString(),
      ],
      [
        'Site', projectInfo.site,
        'Product Type', projectInfo.productType,
        'Product Spec', projectInfo.productSpec,
        'Customer', projectInfo.customer,
      ],
    ]
    sheet.addRows(values)
    // let headerRow = sheet.getRow(startRow)
    values.forEach((row, rowIdx) => {
      row.forEach((nouse, colIdx) => {
        const style = {
          top: { style:'thin' },
          left: { style:'thin' },
          bottom: { style:'thin' },
          right: { style:'thin' }
        }
        const font = {
          bold: false,
          name: this.FONT_CATEGORY,
          size: this.FONT_SIZE,
        }
        if (colIdx % 2 === 0) {
          font.bold = true
        }

        if (rowIdx !== 0) {
          style.top.style = this.STYLE_BORDER_THIN
        }
        if (rowIdx + 1 === values.length) {
          style.bottom.style = this.STYLE_BORDER_THICK
        }
        if (colIdx !== 0) {
          style.left.style = this.STYLE_BORDER_THIN
        }
        if (colIdx + 1 === row.length) {
          style.right.style = this.STYLE_BORDER_THICK
        }
        sheet.getCell(`${excelColumnName.intToExcelCol(colIdx + 1)}${rowIdx + 1}`).font = font
        sheet.getCell(`${excelColumnName.intToExcelCol(colIdx + 1)}${rowIdx + 1}`).border = style
      })
    })


  }

  _getProjectInfoHeader(sheet, startRow = 1, startCell = 1) {
    const { projectInfo = {} } = this.data
    const values = [
      [
        'Project Name', projectInfo.projectName,
        'Stage', projectInfo.stage,
        'Project Code', projectInfo.projectCode,
        '日期', new Date().toLocaleDateString(),
      ],
      [
        'Site', projectInfo.site,
        'Product Type', projectInfo.productType,
        'Product Spec', projectInfo.productSpec,
        'Customer', projectInfo.customer,
      ],
    ]
    sheet.row(startRow).cell(startCell).value(values) // 設定專案基本資訊
    // 設定樣式
    values.forEach((row, rowIdx) => {
      row.forEach((nouse, colIdx) => {
        const style = {
        }
        if (colIdx % 2 === 0) {
          style.bold = true
        }

        if (rowIdx !== 0) {
          style.topBorderStyle = this.STYLE_BORDER_THIN
        }
        if (rowIdx + 1 === values.length) {
          style.bottomBorderStyle = this.STYLE_BORDER_THICK
        }
        if (colIdx !== 0) {
          style.leftBorderStyle = this.STYLE_BORDER_THIN
        }
        if (colIdx + 1 === row.length) {
          style.rightBorderStyle = this.STYLE_BORDER_THICK
        }
        sheet
          .row(rowIdx + 1)
          .cell(colIdx + 1)
          .style(style)
      })
    })
  }

  /**
   * 計算表頭橫向合併存儲格數量
   */
  _getMergedCellCount(cols) {
    return cols.reduce((max, col) => {
      if (!col.contents.length || (col.contents.length && !col.label)) return max
      return 2
    }, 1)
  }



  setData(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    if (!col.contents.length) {
      this._setOneTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    } else if (col.contents.length && !col.label) {
      this._setOneTierGroupHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    } else {
      this._setTwoTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    }
  }

  setDataByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    if (!col.contents.length) {
      this._setOneTierHeaderByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    } else if (col.contents.length && !col.label) {
      this._setOneTierGroupHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    } else {
      this._setTwoTierHeaderByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber)
    }
  }

  _setOneTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.value && col.value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      const headerLV1 = this._genEmptyArray(maxMergeCell).map((nouse, idx) => {
        return !idx ? col.label + (dataCount > 1 ? dataIdx + 1 : '') : ''
      })

      sheet // 產生表頭
        .row(startRow + dataIdx)
        .cell(startCell)
        .value([headerLV1])
        .merged(maxMergeCell > 1)
        .style({
          borderStyle: this.STYLE_BORDER_THIN,
          bold: (col.style && col.style.bold),
          fontColor: (col.style && col.style.color) ? col.style.color : '000000',
          rightBorderStyle: col.contents.length ? this.STYLE_BORDER_THIN : this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
          fill: (col.style && col.style.fill) ? col.style.color : 'ffffff',
        })

      col.value.forEach((val, valIdx) => {
        sheet // 設定資料
          .row(startRow + dataIdx)
          .cell(startCell + maxMergeCell + valIdx)
          .value([[needToNumber ? fixMath.toNumber(val[dataIdx]) : val[dataIdx]]])
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            ...((col.style && col.style.border) || {}),
            fill: (col.style && col.style.fill) ? col.style.fill : 'ffffff',
            ...(needToNumber ? { numberFormat: '#,##0.00000' } : {}),
          })
      })
      this.endRow = startRow + dataIdx + 1
    })
  }

  _setOneTierGroupHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      col.contents.forEach((content, headerIndex) => {
        sheet // 產生巢狀表頭 第二層
          .row(startRow + (dataIdx * col.contents.length) + headerIndex)
          .cell(startCell)
          .value([[content.label, ...this._genEmptyArray(maxMergeCell - 1).map(() => '')]])
          .merged(maxMergeCell > 1)
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            topBorderStyle: headerIndex === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            bottomBorderStyle: headerIndex === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
          })
      })

      col.contents.forEach((content, idx) => {
        sheet // 設定資料
          .row(startRow + (dataIdx * col.contents.length) + idx)
          .cell(startCell + maxMergeCell)
          .value([content.value.map(v => v[dataIdx])])
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            topBorderStyle: idx === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            bottomBorderStyle: idx === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            ...((content.style && content.style.border) || {}),
            fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
            ...(needToNumber ? { numberFormat: '#,##0.00000' } : {}),
          })
      })

      this.endRow = startRow + ((dataIdx + 1) * col.contents.length)
    })
  }

  _setTwoTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {

    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      const headerLV1 = this._genEmptyArray(col.contents.length).map((idx) => !idx ? [`${col.label} ${dataCount > 1 ? dataIdx + 1 : ''}`] : [''])
      sheet // 產生巢狀表頭 第一層
        .row(startRow + (dataIdx * headerLV1.length))
        .cell(startCell)
        .value(headerLV1)
        .merged(true)
        .style({
          bold: true,
          borderStyle: this.STYLE_BORDER_THIN,
          bottomBorderStyle: this.STYLE_BORDER_THICK,
          topBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })

      const headerLV2 = col.contents.forEach((content, lv2Idx) => {
        sheet // 產生巢狀表頭 第二層
          .row(startRow + (dataIdx * headerLV1.length) + lv2Idx)
          .cell(startCell + 1)
          .value([[content.label]])
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            ...((content.style && content.style.border) || {}),
            bold: (content.style && content.style.bold) ? content.style.bold : false,
            fontColor: (content.style && content.style.color) ? content.style.color : '000000',
          })
      })
      // const headerLV2 = col.contents.map((content) => [content.label])
      // sheet // 產生巢狀表頭 第二層
      //   .row(startRow + (dataIdx * headerLV1.length))
      //   .cell(startCell + 1)
      //   .value(headerLV2)
      //   .style({
      //     borderStyle: this.STYLE_BORDER_THIN,
      //     rightBorderStyle: this.STYLE_BORDER_THICK,
      //     ...((col.style && col.style.border) || {}),
      //     fontColor: (col.style && col.style.color) ? col.style.color : '000000',
      //   })
      this.endRow = startRow + ((dataIdx + 1) * headerLV1.length)

      sheet // 產生巢狀表頭結束的下底線
        .row(startRow + ((dataIdx + 1) * headerLV1.length) - 1)
        .cell(startCell + 1)
        .style({
          bottomBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })
      sheet // 產生巢狀表頭結束的上底線
        .row(startRow)
        .cell(startCell + 1)
        .style({
          topBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })

      col.contents.forEach((content, idx) => {
        sheet // 設定資料
          .row(startRow + (dataIdx * headerLV1.length) + idx)
          .cell(startCell + maxMergeCell)
          .value([content.value.map(v => v[dataIdx])])
          .style({
            bold: (content.style && content.style.bold) ? content.style.bold : false,
            borderStyle: this.STYLE_BORDER_THIN,
            topBorderStyle: idx === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            bottomBorderStyle: idx === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            ...((content.style && content.style.border) || {}),
            fontColor: (content.style && content.style.color) ? content.style.color : '000000',
            fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
            ...(needToNumber ? { numberFormat: '#,##0.00000' } : {}),
          })
      })

    })
  }


  _getProjectColumns(sheet, partlistFormat, tab, startRow = 4, startCell = 1, needToNumber = false) {
    const { partlist = {} } = this.data
    const cols = partlist[partlistFormat][tab]
    const maxMergeCell = this._getMergedCellCount(cols)

    sheet.freezePanes(maxMergeCell, 0) // 設定凍結窗格
    this.endRow = startRow
    cols.forEach((col) => {
      // this.nowDataCount = null
      this.setData(sheet, col, maxMergeCell, this.endRow, startCell, needToNumber)
    })
  }

  _getProjectColumnsByNewModule(sheet, partlistFormat, tab, startRow = 4, startCell = 1, needToNumber = false) {
    const { partlist = {} } = this.data
    const cols = partlist[partlistFormat][tab]
    const maxMergeCell = this._getMergedCellCount(cols)
    sheet.views = [
      {
        state: 'frozen',
        xSplit: maxMergeCell,
      }
    ]
    this.endRowByNewModule = startRow
    cols.forEach((col) => {
      this.setDataByNewModule(sheet, col, maxMergeCell, this.endRowByNewModule, startCell, needToNumber)
    })
    
  }

  //deprecated
  _genPartlistFormat(partlistFormat) {
    const sheetIndex = this.addSheet(`Partlist_${partlistFormat}`)
    const sheet = this.workbook.sheet(sheetIndex)
    this._getProjectInfoHeader(sheet)
    this._getProjectColumns(sheet, partlistFormat, 'partlist', 4, 1, false)
    this.setCommonStyle(sheet)

  }
  //deprecated
  _genCleansheetFormat(partlistFormat) {
    const sheetIndex = this.addSheet(`Cleansheet_${partlistFormat}`)
    const sheet = this.workbook.sheet(sheetIndex)
    this._getProjectInfoHeader(sheet)
    this._getProjectColumns(sheet, partlistFormat, 'cleansheet', 4, 1, true)
    this.setCommonStyle(sheet)
  }


  /**
   * 計算巢狀表頭第二欄直向合併存儲格數量
   */
  /*
  _getDataMergedCellCountGroup(data = [], count = 1) {
    return data.forEach(item => {
      if (Array.isArray(item.contents) && item.contents.length) {
        return this._getDataMergedCellCountGroup([item.contents[0]], item.contents.length)
      }

      this.nextProjectRow += (item.value.length || 1) * count
      return
    })
  }
  */
  /*
  getValue(data = [], needToNumber) {
    return data.map(item => {
      if (Array.isArray(item.contents) && item.contents.length) {
        return this.getValue(item.contents, needToNumber)
      }

      if (!item.value.length) {
        this.projectValue.push([''])
      } else {
        item.value.forEach(val => {
          this.projectValue.push([needToNumber ? fixMath.toNumber(val) : val])
        })
      }
      return
    })
  }
  */
  /*
  getHeader(sheet, data = [], maxMergeCell, startRow, startCell, colCount = 0) {
    data.forEach((item, itemIdx) => {
      if (Array.isArray(item.contents) && item.contents.length) {
        this.getHeader(sheet, item.contents, maxMergeCell - 1, startRow, startCell + 1, item.contents.length)
      }

      if (!this.nowDataCount) {
        this.nowDataCount = item.value.length ? item.value[0].length : null
      }

      this._genEmptyArray(this.nowDataCount).forEach((nouse, idx) => {
        const header = this._genEmptyArray(item.contents.length || 1).map(() => {
          return this._genEmptyArray(item.contents.length ? 1 : maxMergeCell).map((nouse, idx) => !idx ? item.label : '')
        })

        sheet // 產生表頭
          .row(startRow + itemIdx + (colCount * idx))
          .cell(startCell)
          .value(header)
          .merged(maxMergeCell > 1)
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            bold: (item.style && item.style.bold),
            fontColor: (item.style && item.style.color) ? item.style.color : '000000',
            rightBorderStyle: item.contents.length ? this.STYLE_BORDER_THIN : this.STYLE_BORDER_THICK,
            ...((item.style && item.style.border) || {}),
          })
      })

    })
  }
  */
  /**
   * 處理單一資料表頭及資料: e.g: Part Name, Part Number...
   */
  /*
  _getSingleHeaderColumn(sheet, cellData, maxMergeCell, itemIdx, startRow, startCell, needToNumber) {
    if (itemIdx === 0) {// 第一筆資料時要產生表頭
      const header0 = this._genEmptyArray(maxMergeCell).map((nouse, idx) => {
        return !idx ? cellData.key : ''
      })

      sheet // 產生表頭
        .row(startRow + 1)
        .cell(startCell)
        .value([header0])
        .merged(maxMergeCell > 1)
        .style({
          bold: true,
          fontColor: cellData.contents[0].style.color ? '0000ff' : '000000',
          borderStyle: this.STYLE_BORDER_THIN,
          rightBorderStyle: this.STYLE_BORDER_THICK,
          ...cellData.contents[0].style.border,
        })
    }

    sheet // 設定資料
      .row(startRow + 1)
      .cell(startCell + maxMergeCell + itemIdx)
      .value(needToNumber ? fixMath.toNumber(cellData.contents[0].value) : cellData.contents[0].value)
      .style({
        borderStyle: this.STYLE_BORDER_THIN,
        rightBorderStyle: this.STYLE_BORDER_THICK,
        ...cellData.contents[0].style.border,
        ...(needToNumber ? { numberFormat: '#,##0.00000' } : {}),
      })
  }
  */

  /**
   * 處理巢狀資料表頭及資料: e.g: Fin, Fan, Connector...
   */
  /*
  _getNestedeHeaderColumn(sheet, cellData, maxMergeCell, maxDataCountGroup, itemIdx, startRow, startCell, needToNumber) {
    this._genEmptyArray(maxDataCountGroup[cellData.key] || 0).forEach((nouse, i) => {
      if (itemIdx === 0) { // 第一筆資料時要產生表頭
        const header1 = this._genEmptyArray(cellData.contents[0].contents.length).map((nouse, idx) => !idx ? [`${cellData.key} ${i + 1}`] : [''])
        sheet // 產生巢狀表頭 第一層
          .row(startRow + 1 + (i * header1.length))
          .cell(startCell)
          .value(header1)
          .merged(true)
          .style({
            bold: true,
            borderStyle: this.STYLE_BORDER_THIN,
            bottomBorderStyle: this.STYLE_BORDER_THICK,
          })

        const header2 = cellData.contents[0].contents.map((content) => [content.label])
        sheet // 產生巢狀表頭 第二層
          .row(startRow + 1 + (i * header2.length))
          .cell(startCell + 1)
          .value(header2)
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
          })
        sheet // 產生巢狀表頭結束的下底線
          .row(startRow + 1 + (i * header2.length) + header2.length - 1)
          .cell(startCell + 1)
          .style({ bottomBorderStyle: this.STYLE_BORDER_THICK })
      }
      const values = !cellData.contents[i]
        ? this._genEmptyArray(cellData.contents[0].contents.length).map(() => [''])
        : cellData.contents[i].contents.map((content) => [needToNumber ? fixMath.toNumber(content.value) : content.value])
      sheet // 設定資料
        .row(startRow + 1 + (i * values.length))
        .cell(startCell + maxMergeCell + itemIdx)
        .value(values)
        .style({
          borderStyle: this.STYLE_BORDER_THIN,
          rightBorderStyle: this.STYLE_BORDER_THICK,
          ...(needToNumber ? { numberFormat: '#,##0.00000' } : {}),
        })
      sheet // 產生巢狀資料結束的下底線
        .row(startRow + 1 + (i * values.length) + values.length - 1)
        .cell(startCell + maxMergeCell + itemIdx)
        .style({
          bottomBorderStyle: this.STYLE_BORDER_THICK,
        })
    })
  }
  */
}

const setMap = (recoder, content, rowIdx, cellIdx, dataIdx) => {
  if (!content.hasOwnProperty("xlsxKey")){
    throw new Error('No_XLSXKEY_ATTRIBUTE_EXIT')
  }
  recoder.addMap({
    rowIdx,
    cellIdx,
    xlsxKey: content.xlsxKey,
    groupIdPath: content.groupIdPath,
    dataIdx,
    byKey: content.byKey
  })
} 
class CleansheetExportWithRecoder extends CleansheetExport {
  constructor(recoder=new PositionRecoder()) {
    super()
    this.recoder = recoder 
    this.formulas = []
  }
  resetData(data){
    this.data = data
    this.recoder.resetMap()
    this.formulas = []
  }
  
  _setOneTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.value && col.value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      const headerLV1 = this._genEmptyArray(maxMergeCell).map((nouse, idx) => {
        return !idx ? col.label + (dataCount > 1 ? dataIdx + 1 : '') : ''
      })
      sheet // 產生表頭
        .row(startRow + dataIdx)
        .cell(startCell)
        .value([headerLV1])
        .merged(maxMergeCell > 1)
        .style({
          borderStyle: this.STYLE_BORDER_THIN,
          bold: (col.style && col.style.bold),
          fontColor: (col.style && col.style.color) ? col.style.color : '000000',
          rightBorderStyle: col.contents.length ? this.STYLE_BORDER_THIN : this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
          fill: (col.style && col.style.fill) ? col.style.color : 'ffffff',
        })
      col.value.forEach((val, valIdx) => {
        let rowIdx = startRow + dataIdx
        let cellIdx = startCell + maxMergeCell + valIdx
        setMap(this.recoder, col, rowIdx, cellIdx, dataIdx)
        let style = {
          borderStyle: this.STYLE_BORDER_THIN,
          rightBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
          fill: (col.style && col.style.fill) ? col.style.fill : 'ffffff',
          ...(needToNumber ? { numberFormat: col.style.numberFormat || '#,##0.00000' } : {}),
        }
        let valueObj = {
          type: col.type,
          rowIdx,
          cellIdx,
          description: col.description,
          dataIdx,
          groupIdPath: col.groupIdPath,
          xlsxKey: col.xlsxKey,
          style,
          value: [[needToNumber ? fixMath.toNumber(val[dataIdx]) : val[dataIdx]]],
          forceHidden: col.forceHidden,
          existKey: [(col.existKey || Array.apply(null, {length: col.value.length}))[dataIdx]],
        }
        setCellData(sheet, this.formulas, valueObj)
      })
      this.endRow = startRow + dataIdx + 1
    })
  }
  _setOneTierHeaderByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    let headerStyle = {
      font: {
        color: {
          argb:(col.style && !_.isNil(col.style.color)) ? col.style.color : '000000',
        },
        bold: (col.style && col.style.bold) ? col.style.bold : false,
        name: this.FONT_CATEGORY,
        size: this.FONT_SIZE,
      },
      alignment: {
        vertical: this.VERTICALALIGNMENT,
        horizontal: this.HORIZONTALALIGNMENT,
      },
      border: {
        top: {
          style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.topBorderStyle : this.STYLE_BORDER_THIN,
        },
        left: {
          style: this.STYLE_BORDER_THIN,
        },
        bottom: {
          style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.bottomBorderStyle : this.STYLE_BORDER_THIN,
        },
        right: {
          style: col.contents.length ? this.STYLE_BORDER_THIN : this.STYLE_BORDER_THICK,
        }
      }
    }

    const dataCount = col.value && col.value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      const  headerLV1 = this._genEmptyArray(maxMergeCell).map((nouse, idx) => {
        return !idx ? col.label + (dataCount > 1 ? dataIdx + 1 : '') : ''
      })
      sheet.insertRow(startRow + dataIdx, headerLV1)
      sheet.getCell(`${excelColumnName.intToExcelCol(startCell)}${startRow + dataIdx}`).style = headerStyle
      sheet.mergeCells(startRow + dataIdx, startCell, startRow + dataIdx, startCell + maxMergeCell - 1)

      //setting value
      col.value.forEach((val, valIdx) => {
        let rowIdx = startRow + dataIdx
        let cellIdx = startCell + maxMergeCell + valIdx
        setMap(this.recoder, col, rowIdx, cellIdx, dataIdx)
        let valueStyle = {
          border: {
            top : {
              style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.topBorderStyle : this.STYLE_BORDER_THIN,
            },
            bottom : {
              style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.bottomBorderStyle : this.STYLE_BORDER_THIN,
            },
            right : {
              style: this.STYLE_BORDER_THICK,
            },
            left : {
              style: this.STYLE_BORDER_THIN,
            },
          },
          alignment: {
            vertical: this.VERTICALALIGNMENT,
            horizontal: this.HORIZONTALALIGNMENT,
          },
          font: {
            name: this.FONT_CATEGORY,
            size: this.FONT_SIZE,
          },
          numFmt: (needToNumber && col.style && col.style.numberFormat) ? col.style.numberFormat : '#,##0.00000',
        }
        
        let valueObj = {
          type: col.type,
          rowIdx,
          cellIdx,
          description: col.description,
          dataIdx,
          groupIdPath: col.groupIdPath,
          xlsxKey: col.xlsxKey,
          style: valueStyle,
          value: [[needToNumber ? fixMath.toNumber(val[dataIdx]) : val[dataIdx]]],
          forceHidden: col.forceHidden,
          existKey: [(col.existKey || Array.apply(null, {length: col.value.length}))[dataIdx]],
        }
        setCellDataByNewModule(sheet, this.formulas, valueObj)
      })
      this.endRowByNewModule = startRow + dataIdx + 1
    })
  }

  _setOneTierGroupHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      col.contents.forEach((content, headerIndex) => {
        sheet // 產生巢狀表頭 第二層
          .row(startRow + (dataIdx * col.contents.length) + headerIndex)
          .cell(startCell)
          .value([[content.label, ...this._genEmptyArray(maxMergeCell - 1).map(() => '')]])
          .merged(maxMergeCell > 1)
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            topBorderStyle: headerIndex === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            bottomBorderStyle: headerIndex === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
          })
          this.setHidden(sheet, col.existKey[0][0], startRow + (dataIdx * col.contents.length) + headerIndex, col.forceHidden)
      })
      // 設定資料
      col.contents.forEach((content, idx) => {
        let rowIdx = startRow + (dataIdx * col.contents.length) + idx
        let cellIdx = startCell + maxMergeCell
        setMap(this.recoder, content, rowIdx, cellIdx, dataIdx)
        let style = {
          borderStyle: this.STYLE_BORDER_THIN,
          topBorderStyle: idx === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
          bottomBorderStyle: idx === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
          rightBorderStyle: this.STYLE_BORDER_THICK,
          ...((content.style && content.style.border) || {}),
          fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
          ...(needToNumber ? { numberFormat: content.style.numberFormat || '#,##0.00000' } : {}),
        }
        let valueObj = {
          type: content.type,
          rowIdx,
          cellIdx,
          description: content.description,
          dataIdx,
          groupIdPath: content.groupIdPath,
          xlsxKey: content.xlsxKey,
          style,
          value: [content.value.map(v => v[dataIdx])],
          existKey: [content.existKey.map(v => v[dataIdx])],
        }
        setCellData(sheet, this.formulas, valueObj)
      })
      this.endRow = startRow + ((dataIdx + 1) * col.contents.length)
    })
  }

  _setOneTierGroupHeaderByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      col.contents.forEach((content, headerIndex) => {
        let headerStyle = {
          font: {
            color: {
              argb:(content.style && content.style.color) ? col.style.color : '000000',
            },
            bold: (col.style && col.style.bold) ? col.style.bold : false,
            name: this.FONT_CATEGORY,
            size: this.FONT_SIZE,
          },
          alignment: {
            vertical: this.VERTICALALIGNMENT,
            horizontal: this.HORIZONTALALIGNMENT,
          },
          border: {
            top: {
              style: headerIndex === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            },
            left: {
              style: this.STYLE_BORDER_THIN,
            },
            bottom: {
              style: headerIndex === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            },
            right: {
              style: this.STYLE_BORDER_THICK,
            }
          }
        }
        sheet.insertRow(startRow + (dataIdx * col.contents.length) + headerIndex, [content.label, ...this._genEmptyArray(maxMergeCell - 1).map(() => '')])
        sheet.getCell(`${excelColumnName.intToExcelCol(startCell)}${startRow + (dataIdx * col.contents.length) + headerIndex}`).style = headerStyle
        sheet.mergeCells(startRow + (dataIdx * col.contents.length) + headerIndex, startCell, startRow + (dataIdx * col.contents.length) + headerIndex, startCell + maxMergeCell - 1)
        this.setHiddenByNewModule(sheet, col.existKey[0][0], startRow + (dataIdx * col.contents.length) + headerIndex, col.forceHidden)
      })
      // 設定資料
      col.contents.forEach((content, idx) => {
        let rowIdx = startRow + (dataIdx * col.contents.length) + idx
        let cellIdx = startCell + maxMergeCell
        setMap(this.recoder, content, rowIdx, cellIdx, dataIdx)
        let valueStyle = {
          border: {
            top : {
              style: idx === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            },
            bottom : {
              style: idx === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
            },
            right : {
              style: this.STYLE_BORDER_THICK,
            },
            left : {
              style: this.STYLE_BORDER_THIN,
            },
          },
          alignment: {
            vertical: this.VERTICALALIGNMENT,
            horizontal: this.HORIZONTALALIGNMENT,
          },
          font: {
            name: this.FONT_CATEGORY,
            size: this.FONT_SIZE,
          },
          numFmt: (needToNumber && content.style && content.style.numberFormat) ? content.style.numberFormat : '#,##0.00000',
        }
        let valueObj = {
          type: content.type,
          rowIdx,
          cellIdx,
          description: content.description,
          dataIdx,
          groupIdPath: content.groupIdPath,
          xlsxKey: content.xlsxKey,
          style: valueStyle,
          value: [content.value.map(v => v[dataIdx])],
          existKey: [content.existKey.map(v => v[dataIdx])],
        }
        setCellDataByNewModule(sheet, this.formulas, valueObj)
      })
      this.endRowByNewModule = startRow + ((dataIdx + 1) * col.contents.length)
    })
  }
  setHidden(sheet, exist, startRow, rowRange=1, forceHidden = false) {
    if (exist == false || forceHidden) {
      for (let i = startRow; i < (startRow + rowRange); i++) {
        sheet.row(i).hidden(true)
      }
    }
  }

  setHiddenByNewModule(sheet, exist, startRow, rowRange=1, forceHidden = false) {
    if (exist == false || forceHidden) {
      for (let i = startRow; i < (startRow + rowRange); i++) {
        sheet.getRow(i).hidden = true
      }
    }
  }

  _setTwoTierHeader(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {

    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      const headerLV1 = this._genEmptyArray(col.contents.length).map((idx) => !idx ? [`${col.label} ${dataCount > 1 ? dataIdx + 1 : ''}`] : [''])
      sheet // 產生巢狀表頭 第一層
        .row(startRow + (dataIdx * headerLV1.length))
        .cell(startCell)
        .value(headerLV1)
        .merged(true)
        .style({
          bold: true,
          borderStyle: this.STYLE_BORDER_THIN,
          bottomBorderStyle: this.STYLE_BORDER_THICK,
          topBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })
      this.setHidden(sheet, col.existKey[0][0], startRow, headerLV1.length, col.forceHidden)

      const headerLV2 = col.contents.forEach((content, lv2Idx) => {
        sheet // 產生巢狀表頭 第二層
          .row(startRow + (dataIdx * headerLV1.length) + lv2Idx)
          .cell(startCell + 1)
          .value([[content.label]])
          .style({
            borderStyle: this.STYLE_BORDER_THIN,
            rightBorderStyle: this.STYLE_BORDER_THICK,
            ...((content.style && content.style.border) || {}),
            bold: (content.style && content.style.bold) ? content.style.bold : false,
            fontColor: (content.style && content.style.color) ? content.style.color : '000000',
          })
          this.setHidden(sheet, content.existKey.map(v => v[dataIdx])[dataIdx], startRow + (dataIdx * headerLV1.length) + lv2Idx, content.forceHidden)
      })

      // const headerLV2 = col.contents.map((content) => [content.label])
      // sheet // 產生巢狀表頭 第二層
      //   .row(startRow + (dataIdx * headerLV1.length))
      //   .cell(startCell + 1)
      //   .value(headerLV2)
      //   .style({
      //     borderStyle: this.STYLE_BORDER_THIN,
      //     rightBorderStyle: this.STYLE_BORDER_THICK,
      //     ...((col.style && col.style.border) || {}),
      //     fontColor: (col.style && col.style.color) ? col.style.color : '000000',
      //   })
      this.endRow = startRow + ((dataIdx + 1) * headerLV1.length)

      sheet // 產生巢狀表頭結束的下底線
        .row(startRow + ((dataIdx + 1) * headerLV1.length) - 1)
        .cell(startCell + 1)
        .style({
          bottomBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })
      sheet // 產生巢狀表頭結束的上底線
        .row(startRow)
        .cell(startCell + 1)
        .style({
          topBorderStyle: this.STYLE_BORDER_THICK,
          ...((col.style && col.style.border) || {}),
        })
      // 設定資料
      col.contents.forEach((content, idx) => {
        let rowIdx = startRow + (dataIdx * headerLV1.length) + idx
        let cellIdx = startCell + maxMergeCell
        setMap(this.recoder, content, rowIdx, cellIdx, dataIdx)
        let style = {
          bold: (content.style && content.style.bold) ? content.style.bold : false,
          borderStyle: this.STYLE_BORDER_THIN,
          topBorderStyle: idx === 0 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
          bottomBorderStyle: idx === col.contents.length - 1 ? this.STYLE_BORDER_THICK : this.STYLE_BORDER_THIN,
          rightBorderStyle: this.STYLE_BORDER_THICK,
          ...((content.style && content.style.border) || {}),
          fontColor: (content.style && content.style.color) ? content.style.color : '000000',
          fill: (content.style && content.style.fill) ? content.style.fill : 'ffffff',
          ...(needToNumber ? { numberFormat: content.style.numberFormat || '#,##0.00000' } : {}),
        }
        let valueObj = {
          type: content.type,
          rowIdx,
          cellIdx,
          description: content.description,
          dataIdx,
          groupIdPath: content.groupIdPath,
          xlsxKey: content.xlsxKey,
          style,
          value: [content.value.map(v => v[dataIdx])],
          existKey: [content.existKey.map(v => v[dataIdx])],
          rowHeight: content.rowHeight,
        }
        setCellData(sheet, this.formulas, valueObj)
      })
    })
  }

  _setTwoTierHeaderByNewModule(sheet, col, maxMergeCell, startRow, startCell, needToNumber) {
    const dataCount = col.contents[0].value && col.contents[0].value.reduce((max, val) => max > val.length ? max : val.length, 0) || 0
    this._genEmptyArray(dataCount).forEach((dataIdx) => {
      let tier1Style = {
        font: {
          bold: true,
          name: this.FONT_CATEGORY,
          size: this.FONT_SIZE,
        },
        alignment: {
          vertical: this.VERTICALALIGNMENT,
          horizontal: this.HORIZONTALALIGNMENT,
        },
        border: {
          top: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.topBorderStyle : this.STYLE_BORDER_THICK ,
          },
          left: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.leftBorderStyle : this.STYLE_BORDER_THIN,
          },
          bottom: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.bottomBorderStyle : this.STYLE_BORDER_THICK,
          },
          right: {
            style: this.STYLE_BORDER_THIN,
          }
        }
      }
      const headerLV1 = this._genEmptyArray(col.contents.length).map((idx) => !idx ? [`${col.label} ${dataCount > 1 ? dataIdx + 1 : ''}`] : [''])
      sheet.insertRow(startRow + (dataIdx * headerLV1.length), headerLV1[0])
      sheet.getCell(`${excelColumnName.intToExcelCol(startCell)}${startRow + (dataIdx * headerLV1.length)}`).style = tier1Style
      sheet.mergeCells(startRow + (dataIdx * headerLV1.length), startCell, startRow + ((dataIdx + 1) * headerLV1.length) - 1, startCell)

      this.setHiddenByNewModule(sheet, col.existKey[0][0], startRow, headerLV1.length, col.forceHidden)

      col.contents.forEach((content, lv2Idx) => {
        let tier2Style = {
          font: {
            color: {
              argb: (content.style && content.style.color) ? content.style.color : '000000',
            },
            bold: (content.style && content.style.bold) ? content.style.bold : false,
            name: this.FONT_CATEGORY,
            size: this.FONT_SIZE,
          },
          alignment: {
            vertical: this.VERTICALALIGNMENT,
            horizontal: this.HORIZONTALALIGNMENT,
          },
          border: {
            top: {
              style: this.STYLE_BORDER_THIN,
            },
            left: {
              style: this.STYLE_BORDER_THIN,
            },
            bottom: {
              style: this.STYLE_BORDER_THIN,
            },
            right: {
              style: this.STYLE_BORDER_THICK,
            }
          }
        }

        sheet.getCell(`${excelColumnName.intToExcelCol(startCell + 1)}${startRow + (dataIdx * headerLV1.length) + lv2Idx}`).style = tier2Style
        sheet.getCell(`${excelColumnName.intToExcelCol(startCell + 1)}${startRow + (dataIdx * headerLV1.length) + lv2Idx}`).value = content.label
        this.setHiddenByNewModule(sheet, content.existKey.map(v => v[dataIdx])[dataIdx], startRow + (dataIdx * headerLV1.length) + lv2Idx, content.forceHidden)
      })
      this.endRowByNewModule = startRow + ((dataIdx + 1) * headerLV1.length)
      let bottomBorderStyle = {
        font: {
          color: {
            argb: (col.style && col.style.color) ? col.style.color : '000000',
          },
          bold: (col.style && col.style.bold) ? col.style.bold : false,
          name: this.FONT_CATEGORY,
          size: this.FONT_SIZE,
        },
        alignment: {
          vertical: this.VERTICALALIGNMENT,
          horizontal: this.HORIZONTALALIGNMENT,
        },
        border: {
          top: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.topBorderStyle : this.STYLE_BORDER_THIN,
          },
          left: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.leftBorderStyle : this.STYLE_BORDER_THIN,
          },
          bottom: {
            style: this.STYLE_BORDER_THIN,
          },
          right: {
            style: this.STYLE_BORDER_THICK,
          }
        }
      }
      // 產生巢狀表頭結束的下底線
      sheet.getCell(`${excelColumnName.intToExcelCol(startCell + 1)}${startRow + ((dataIdx + 1) * headerLV1.length) - 1}`).style = bottomBorderStyle
      let topBorderStyle = {
        font: {
          color: {
            argb: (col.style && col.style.color) ? col.style.color : '000000',
          },
          bold: (col.style && col.style.bold) ? col.style.bold : false,
          name: this.FONT_CATEGORY,
          size: this.FONT_SIZE,
        },
        alignment: {
          vertical: this.VERTICALALIGNMENT,
          horizontal: this.HORIZONTALALIGNMENT,
        },
        border: {
          top: {
            style: this.STYLE_BORDER_THIN,
          },
          left: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.leftBorderStyle : this.STYLE_BORDER_THIN,
          },
          bottom: {
            style: (col.style && Object.keys(col.style.border).length != 0) ? col.style.border.bottomBorderStyle : this.STYLE_BORDER_THIN,
          },
          right: {
            style: this.STYLE_BORDER_THICK,
          }
        }
      }
      // 產生巢狀表頭結束的上底線
      sheet.getCell(`${excelColumnName.intToExcelCol(startCell + 1)}${startRow}`).style = topBorderStyle
      // 設定資料
      col.contents.forEach((content, idx) => {
        let rowIdx = startRow + (dataIdx * headerLV1.length) + idx
        let cellIdx = startCell + maxMergeCell
        setMap(this.recoder, content, rowIdx, cellIdx, dataIdx)

        let valueStyle = {
          font: {
            color: {
              argb: (content.style && content.style.color) ? content.style.color : '000000',
            },
            bold: (content.style && content.style.bold) ? content.style.bold : false,
            name: this.FONT_CATEGORY,
            size: this.FONT_SIZE,
          },
          alignment: {
            vertical: this.VERTICALALIGNMENT,
            horizontal: this.HORIZONTALALIGNMENT,
          },
          border: {
            top: {
              style: (content.style && Object.keys(content.style.border).length != 0) ? content.style.border.topBorderStyle : this.STYLE_BORDER_THIN,
            },
            left: {
              style: (content.style && Object.keys(content.style.border).length != 0) ? content.style.border.leftBorderStyle : this.STYLE_BORDER_THIN,
            },
            bottom: {
              style: (content.style && Object.keys(content.style.border).length != 0) ? content.style.border.bottomBorderStyle : this.STYLE_BORDER_THIN,
            },
            right: {
              style: this.STYLE_BORDER_THICK,
            }
          },
          numFmt: (needToNumber && content.style && content.style.numberFormat) ? content.style.numberFormat : '#,##0.00000',
        }
        let valueObj = {
          type: content.type,
          rowIdx,
          cellIdx,
          description: content.description,
          dataIdx,
          groupIdPath: content.groupIdPath,
          xlsxKey: content.xlsxKey,
          style: valueStyle,
          value: [content.value.map(v => v[dataIdx])],
          existKey: [content.existKey.map(v => v[dataIdx])],
          rowHeight: content.rowHeight,
        }
        setCellDataByNewModule(sheet, this.formulas, valueObj)
      })
    })
  }
  doFormulas(){
    this.formulas.forEach((job)=>{
      if (typeof job.description === 'string') {
        this.formulaString(job)
      } else {
        this.formulaObj(job)
      }
    })
  }
  genFormat(partlistFormat, exportTyp, needToNumber, uniqueName){
    const sheetIndex = this.addSheet(uniqueName)
    const sheet = this.workbook.sheet(sheetIndex)
    this._getProjectInfoHeader(sheet)
    this._getProjectColumns(sheet, partlistFormat, exportTyp.toLowerCase(), 4, 1, needToNumber)
    this.setCommonStyle(sheet)
    this.doFormulas()
  }
  doFormulasByNewModule(){
    this.formulas.forEach((job) => {
      if(typeof job.description === 'string') {
        this.formulaStringByNewModule(job)
      } else {
        this.formulaObjByNewModule(job)
      }
    })
  }
  genFormatByNewModule(partlistFormat, exportTyp, needToNumber, uniqueName) {
    const sheetIndex = this.addSheetByNewModule(uniqueName)
    const sheet = this.workbookByNewModule.getWorksheet(sheetIndex)
    this._getProjectInfoHeaderByNewModule(sheet)
    this._getProjectColumnsByNewModule(sheet, partlistFormat, exportTyp.toLowerCase(), 4, 1, needToNumber)
    this.setCommonStyleByNewModule(sheet)
    this.doFormulasByNewModule()
  }


  formulaString(job) {
    let formula = job.description.split(' ').join('')
    let operands = formula.match(FORMULARE)
    //log.info(`get opreands from ${job.description}==>${operands}`)
    operands.forEach((op)=>{
      let res = this.recoder.getPosition({
        xlsxKey: op,
        groupIdPath: job.groupIdPath,
        dataIdx: job.dataIdx
      })
      if (res.length === 1){
        formula = formula.replace(op, `${excelColumnName.intToExcelCol(res[0].cellIdx)}${res[0].rowIdx}`)
      } else if (res.length > 1) {
        log.error(`query length in recorder is more than 1: ${res}`)
        throw new Error('MORE_THAN_ONE_OPERANDS')
      } else {
        // do nothing
      } 
    })
    formula = existFormularWrapper(formula, job.exist)
    //log.info(`translated formula: ${formula}`)
    job.sheet.row(job.rowIdx).cell(job.cellIdx).style(job.style).formula(formula)
  }
  formulaStringByNewModule(job) {
    let formula = job.description.split(' ').join('')
    let operands = formula.match(FORMULARE)
    operands.forEach((op) => {
      let res = this.recoder.getPosition({
        xlsxKey: op,
        groupIdPath: job.groupIdPath,
        dataIdx: job.dataIdx
      })
      if (res.length === 1){
        formula = formula.replace(op, `${excelColumnName.intToExcelCol(res[0].cellIdx)}${res[0].rowIdx}`)
      } else if (res.length > 1) {
        log.error(`query length in recorder is more than 1: ${res}`)
        throw new Error('MORE_THAN_ONE_OPERANDS')
      } else {
        // do nothing
      }
    })
    formula = existFormularWrapper(formula, job.exist)
    job.sheet.getCell(`${excelColumnName.intToExcelCol(job.cellIdx)}${job.rowIdx}`).value = { formula: formula }
    job.sheet.getCell(`${excelColumnName.intToExcelCol(job.cellIdx)}${job.rowIdx}`).style = job.style
  }
  formulaObjByNewModule(job) {
    let jobType = job.description.type
    if(jobType.toLowerCase() == 'sum') {
      this.formulaObjSumByNewModule(job)
    } else {
      throw new Error(`No_GROUP_FORMULA_TYPE: ${jobType}`)
    }
  }

  formulaObj(job){
    let jobType = job.description.type
    switch (jobType.toLowerCase()) {
      case 'sum':
        this.formulaObjSum(job)
        break
      default:
        throw new Error(`No_GROUP_FORMULA_TYPE: ${jobType}`)
    }
  }
  formulaObjSum(job){
    let operands = []
    job.description.set.forEach((item)=>{
      let res = this.recoder.getPosition(item)
      if ( res.length > 0 ) {
        res.map((op)=>{
          let targetOP = `${excelColumnName.intToExcelCol(op.cellIdx)}${op.rowIdx}`
          operands.push(targetOP)
        })
      } else {
        log.warn(`can not find set in group sum, the query: ${JSON.stringify(item)}`)
      }
    })
    let formula = `=${job.defaultValue || 0}`
    if ( operands.length > 0 ) {
      formula = `=${operands.join('+')}`
    }
    formula = objFormularWrapper(formula, job.description.wrapper)
    formula = existFormularWrapper(formula, job.exist)
    //log.info(`translated formula: ${formula}`)
    job.sheet.row(job.rowIdx).cell(job.cellIdx).style(job.style).formula(formula)
  }
  formulaObjSumByNewModule(job){
    let operands = []
    job.description.set.forEach((item)=>{
      let res = this.recoder.getPosition(item)
      if ( res.length > 0 ) {
        res.map((op)=>{
          let targetOP = `${excelColumnName.intToExcelCol(op.cellIdx)}${op.rowIdx}`
          operands.push(targetOP)
        })
      } else {
        log.warn(`can not find set in group sum, the query: ${JSON.stringify(item)}`)
      }
    })
    let formula = `=${job.defaultValue || 0}`
    if ( operands.length > 0 ) {
      formula = `=${operands.join('+')}`
    }
    formula = objFormularWrapper(formula, job.description.wrapper)
    formula = existFormularWrapper(formula, job.exist)
    //log.info(`translated formula: ${formula}`)
    job.sheet.getCell(`${excelColumnName.intToExcelCol(job.cellIdx)}${job.rowIdx}`).value = { formula: formula }
    job.sheet.getCell(`${excelColumnName.intToExcelCol(job.cellIdx)}${job.rowIdx}`).style = job.style
  }
}
const objFormularWrapper = (formula, wrapper) => {
  if (!wrapper) {
    return formula
  }
  return wrapper.replace('FORMULA', formula.replace('=',''))
}
const existFormularWrapper = (formula, exist) => {
  let newFormula = formula
  if (exist === true) {
    newFormula = `=IF(1, ${formula.replace('=','')}, 0)`
  } else if ( exist === false ) {
    newFormula = `=IF(0, ${formula.replace('=','')}, 0)`
  } else {
    //do nothins
  }
  return newFormula
}
const setCellDataByNewModule = (sheet, formulaJobs, valueObj) => {
  let row = sheet.getRow(valueObj.rowIdx)
  if (valueObj.type === 'formula') {
    formulaJobs.push({
      sheet, 
      rowIdx: valueObj.rowIdx,
      cellIdx: valueObj.cellIdx,
      description: valueObj.description,
      dataIdx: valueObj.dataIdx,
      groupIdPath: valueObj.groupIdPath,
      xlsxKey: valueObj.xlsxKey,
      style: valueObj.style,
      exist: valueObj.existKey[0][0],
      rowHeight: valueObj.rowHeight,
    })
  } else if(valueObj.type === 'value') {
    sheet.getCell(`${excelColumnName.intToExcelCol(valueObj.cellIdx)}${valueObj.rowIdx}`).value = valueObj.description
    sheet.getCell(`${excelColumnName.intToExcelCol(valueObj.cellIdx)}${valueObj.rowIdx}`).style = valueObj.style
    if(valueObj.rowHeight > 0) {
      row.height = valueObj.rowHeight
    }
  } else {
    sheet.getCell(`${excelColumnName.intToExcelCol(valueObj.cellIdx)}${valueObj.rowIdx}`).value = valueObj.value[0][0]
    sheet.getCell(`${excelColumnName.intToExcelCol(valueObj.cellIdx)}${valueObj.rowIdx}`).style = valueObj.style
    if(valueObj.rowHeight > 0) {
      row.height = valueObj.rowHeight
    }
  }

}
const setCellData = (sheet, formulaJobs, valueObj) => {
  if (valueObj.type === 'formula') {
    formulaJobs.push({
      sheet, 
      rowIdx: valueObj.rowIdx,
      cellIdx: valueObj.cellIdx,
      description: valueObj.description,
      dataIdx: valueObj.dataIdx,
      groupIdPath: valueObj.groupIdPath,
      xlsxKey: valueObj.xlsxKey,
      style: valueObj.style,
      exist: valueObj.existKey[0][0],
      rowHeight: valueObj.rowHeight,
    })
  } else if(valueObj.type === 'value') {
    sheet
    .row(valueObj.rowIdx)
    .height(valueObj.rowHeight || undefined)
    .cell(valueObj.cellIdx)
    .style(valueObj.style)
    .value(valueObj.description)
  } else {
    sheet
    .row(valueObj.rowIdx)
    .height(valueObj.rowHeight || undefined)
    .cell(valueObj.cellIdx)
    .style(valueObj.style)
    .value(valueObj.value)
  }
}

class PositionRecoder {
  constructor() {
    this.map = []
  }
  addMap(mapping){
    this.map.push(mapping)
  }
  getPosition(query){
    let targets = _.filter(this.map, query)
    //log.debug(`query: ${dfutils.inspect(query)} get ${targets}`)
    return targets 
  }
  resetMap(){
    this.map=[]
  }
}
module.exports = { CleansheetExportWithRecoder, 
                   CleansheetExport,
}
