const fixMath = require('../../helpers/math/math.js')
const xlsxPopulate = require('xlsx-populate')
const _ = require('lodash')
const fs = require('fs')
const moment = require('moment')

class CleanSheet {
  constructor(filePath, folderPath, data, cleanSheetType, partlistName, type, sheetNumber) {
    this.cls = cleanSheetType
    this.pln = partlistName
    this.fpath = filePath
    this.rpath = folderPath
    this.workbook = null
    this.sheets = []
    this.data = data
    this.type = type
    this.sheetNumber = sheetNumber
  }

  /**
 *
 * 用套件建立初始excel
 * @returns {Object} excel workbook的設定
 */
  async initExcel(sheetName) {
    this.workbook = await xlsxPopulate.fromBlankAsync()
    const oriSheet = this.workbook.sheet(0)
    oriSheet.name(sheetName)
    this.sheets.push(oriSheet)
    return this.workbook
  }

  /**
 *
 * 新增excel裡面的頁面
 * @param {String} sheetName 要增加的頁面名稱
 * @returns {Number} 存放workbook的陣列長度
 */
  addSheet(sheetName) {
    const newSheet = this.workbook.addSheet(sheetName)
    this.sheets.push(newSheet)
    return this.sheets.length
  }

  /**
 *
 * 建立檔案資料夾
 * @param {String} path 資料夾路徑
 */
  async _creatFileFolder(path) {
    if (!fs.existsSync(path)) fs.mkdirSync(path)
  }

  /**
 *
 * 生成excel
 * @param {Object} workbook 要生成的workbook
 * @param {String} path 生成的檔案路徑
 */
  async exportExcel(workbook, path) {
    await workbook.toFileAsync(path)
  }

  /**
 *
 * 設定excel欄位寬度
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {String} pos 設定寬度的欄位
 * @param {Number} length 欄位寬度
 * @returns {Boolean}
 */
  setColumnWidth(sheetIdx, pos, length) {
    if (Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.sheets[sheetIdx]
      sheet.column(`${pos}`).width(length)
      return true
    }
    return false
  }

  /**
 *
 * 寫入basic header的欄位資料及設定
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Object} data 欄位資料
 * @param {String} pos 塞入資料的位置
 * @param {Boolean} style 是否要進行粗體的設定
 * @returns {Boolean}
 */
  setHeader(sheetIdx, pos, data, style = false) {
    if (Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.sheets[sheetIdx]
      sheet.cell(pos).value(data).style({ bold: true, fontFamily: 'arial', border: true, wrapText: true })
      return true
    }
    return false
  }

  /**
 *
 * 將值塞入excel指定的位置
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Object} data 欄位資料
 * @param {String} pos 塞入的位置
 * @param {Boolean} style 是否要進行顏色的設定
 * @returns {Boolean}
 */
  setData(sheetIdx, pos, data, style = 'data') {
    if (Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.sheets[sheetIdx]
      if(style == 'header') {
        sheet.cell(pos).value(data).style({ bold: true, fontFamily: 'arial' })
      }else if(style == 'data') {
        sheet.cell(pos).value(data).style({  fontFamily: 'arial', horizontalAlignment: 'left' })
      }
      return true
    }
    return false
  }

  /**
 *
 * 將傳進來資料的的顏色以及數字格式去設定
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Number} itemLength 資料總共有幾欄
 * @param {String} type 哪一個sheet要使用的
 * @param {String} color 所要設置的顏色
 * @param {String} format 所要設置的數字格式
 */
  setStyle(sheetIdx, pos, itemLength, type, color, format, mergeCount) {
    if(Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.sheets[sheetIdx]
      if(color) sheet.cell(`A${pos}`).style({ fontColor: '0000FF' })
      if(mergeCount == 0) {
        if(format) {
          for(let i = 2; i <= itemLength + 1; i++) {
            let column = fixMath.numberToEnglish(i)
            sheet.cell(`${column}${pos}`).style({ numberFormat: `${format}` })
          }
        }else {
          return true
        }
      }else {
        if(format) {
          for(let i = 3; i <= itemLength + 2; i++) {
            let column = fixMath.numberToEnglish(i)
            sheet.cell(`${column}${pos}`).style({ numberFormat: `${format}` })
          }
        }else {
          return true
        }
      }
    }
  }

  /**
 *
 * 寫入basic header到excel
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Object} data 基本資料
 * @returns {Object} headerLength為header有幾行,headerWidth為header有幾欄
 */
  writeHeader(sheetIdx, data, dataLength) {
    let date = moment().format('YYYY/MM/DD')
    let header = [
      ['Project Name', data.projectName, 'Stage', data.stage, 'Project Code', data.projectCode,
        '日期: ', date],
      ['Site', data.site, 'Product Type', data.productType, 'Product Spec', data.productSpec, 'Customer',
        data.customer],
    ]
    this.setHeader(sheetIdx, 'A1', header)
    let borderNumber = fixMath.numberToEnglish(header[1].length)
    
    this.sheets[sheetIdx].range(`A2:${borderNumber}2`).style({ bottomBorder: true, bottomBorderStyle: 'thick' })
    this.sheets[sheetIdx].range(`${borderNumber}1:${borderNumber}2`).style({ rightBorder: true, rightBorderStyle: 'thick' })
    if(dataLength == 0) {
      for(let i = 1; i <= header[0].length; i++) {
        let pos = fixMath.numberToEnglish(i)
        this.setColumnWidth(sheetIdx, pos, 25)
      }
    }
    return {
      headerLength: header.length,
      headerWidth: header[0].length,
    }
  }

  /**
 *
 * 將傳進來的資料寫進excel cleansheet sheet裏面
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Object} data 整個cleansheet/partlist資料
 * @param {Number} pos basic header的欄位長度
 * @returns {Object} headerKey組合過後的數值,titleLength為左邊header的字串長度
 */
  writeMetalPlastic(sheetIdx, data, pos) {
    // return _.map(Object.keys(data.partlist), partlistItem => {
    let dataTrans = _.map(data, i => {
      return i.cleansheet
    })
    let header = []
    let title = []
    let titleLength = []
    _.map(dataTrans, (i, idx) => {
      let store = {}
      _.map(i, (s, sid) => {
        if(idx == 0) {
          title.push(s.label)
          titleLength.push(s.label.length)
          this.setData(sheetIdx, `A${sid + pos + 2}`, [[s.label]], 'header')
          this.setHeaderBorder(sheetIdx, `${sid + pos + 2}`, s.style.border, dataTrans.length, 'cleansheet')
          this.setStyle(sheetIdx, sid + pos + 2, dataTrans.length, 'cleansheet', s.style.color, s.style.format)
        }
        store[s.label] = s.value
      })
      header.push(store)
    })
    let headerKey = _.map(title, s => {
      let temp = _.map(header, i => {
        return i[s]
      })
      return temp
    })
    this.setData(sheetIdx, `B${pos + 2}`, headerKey)
    this.wrapTextOrNot(sheetIdx, headerKey)
    return {
      headerKey: headerKey,
      titleLength: titleLength,
    }
    // })
  }

  /**
 *
 * 設定凍結視窗欄位
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {String} sheetType 哪個頁面要設定凍結
 */
  setFrozen(sheetIdx, sheetType) {
    let sheet =  this.workbook.sheet(sheetIdx)
    if(sheetType == 'cleansheet') sheet.freezePanes('B3')
    if(sheetType == 'partlist') sheet.freezePanes('C3')
  }
  

  setHeaderBorder(sheetIdx, pos, border, itemLength, type, mergeCount) {
    if(Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.workbook.sheet(sheetIdx)
      if(mergeCount == 0) {
        if(border) {
          let itemTrans = fixMath.numberToEnglish(itemLength + 1)
          if(border.topBorder) {
            sheet.cell(`A${pos}`).style({ topBorder: true, topBorderStyle: 'thick', bottomBorder: true, bottomBorderStyle: 'thin' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ topBorder: true, topBorderStyle: 'thick', bottomBorder: true, bottomBorderStyle: 'thin', rightBorder: true, rightBorderStyle: 'thick' })
          }else if( border.bottomBorder) {
            sheet.cell(`A${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thick' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thick', rightBorder: true, rightBorderStyle: 'thick' })
          }else if(!border.bottomBorder && !border.topBorder) {
            sheet.cell(`A${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thin' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thin', rightBorder: true, rightBorderStyle: 'thick' })
          }
        }
      }else {

        if(border) {
          let itemTrans = fixMath.numberToEnglish(itemLength + 2)
          if(border.topBorder) {
            sheet.cell(`A${pos}`).style({ topBorder: true, topBorderStyle: 'thick', bottomBorder: true, bottomBorderStyle: 'thin' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ topBorder: true, topBorderStyle: 'thick', bottomBorder: true, bottomBorderStyle: 'thin', rightBorder: true, rightBorderStyle: 'thick' })
          }else if( border.bottomBorder) {
            sheet.cell(`A${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thick' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thick', rightBorder: true, rightBorderStyle: 'thick' })
          }else if(!border.bottomBorder && !border.topBorder && !border.leftBorder) {
            sheet.cell(`A${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thin' })
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thin', rightBorder: true, rightBorderStyle: 'thick' })
          }
          else if(border.leftBorder && !border.bottomBorder && !border.topBorder) {
            sheet.range(`A${pos}:${itemTrans}${pos}`).style({ bottomBorder: true, bottomBorderStyle: 'thin', rightBorder: true, rightBorderStyle: 'thick' })
            sheet.cell(`A${pos}`).style({ rightBorder: true, rightBorderStyle: 'thin' })
          }
        }
      }
    }else {
      return true
    }
  }

  /**
 *
 * 設定欄寬
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Array} array 組合過後的資料
 * @param {String} type 哪一個sheet要設定欄寬
 * @param {Array} itemLength 左邊header的字串長度陣列
 * @param {Number} basicLength basic header的欄位數
 */
  writeColumnWidth(sheetIdx, array, type = 'cleansheet', itemLength, basicLength, mergeCount = 0) {
    let maxTitleLength = _.max(itemLength)
    let  arr = []
    for(let  i = 0;i < array[0].length;i++){
      arr[i] = []
      for(let  j = 0;j < array.length;j++){
        if(array[j][i] != null) {
          arr[i][j] = array[j][i].toString().length
        }else {
          arr[i][j] = 0
        }
      }
    }
    _.map(arr, (i, idx) => {
      let column
      if(mergeCount != 0) {
        column = fixMath.numberToEnglish(idx + 3)
      }else {
        column = fixMath.numberToEnglish(idx + 2)
      }
      let max = Math.max(...i)
      this.setColumnWidth(sheetIdx, column, max)
    })
    for(let i = 1; i <= basicLength; i++) {
      let pos = fixMath.numberToEnglish(i)
      if(i == 1 && maxTitleLength > 20) {
        this.setColumnWidth(sheetIdx, pos, maxTitleLength + 5)
      }else {
        this.setColumnWidth(sheetIdx, pos, 25)
      }
    }
  }

  /**
 *
 * 判斷是否需要進行換行的style
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Array} item 組合過後要塞入欄位的數值
 * @param {String} type 哪一個sheet要進行欄位換行設定
 * @returns {Boolean}
 */
  wrapTextOrNot(sheetIdx, item, type = 'cleansheet', mergeCount = 0) {
    let sheet = this.sheets[sheetIdx]
    let pos
    if(item.length > 0) {
      for(let i = 1; i <= item.length; i++) {
        if(mergeCount != 0) {
          pos = fixMath.numberToEnglish(i + 2)
        }else {
          pos = fixMath.numberToEnglish(i + 1)
        }
        _.map(item, (e, idx) => {
          if(e[i - 1] != null && e[i - 1].toString().length > 15) {
            sheet.cell(`${pos}${idx + 4}`).style('wrapText', true)
          }
        })
      }
      return true
    }else {
      return false
    }
  }

  /**
 *
 * 合併儲存格的設定
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {String} startColumn 開始合併的欄位
 * @param {Number} startRow 開始合併的行位
 * @param {String} endColumn 結束合併的欄位
 * @param {Number} endRow 結束合併的行位
 * @returns {Boolean}
 */
  setColumnMerge(sheetIdx, startColumn, startRow, endColumn, endRow) {
    let sheet = this.sheets[sheetIdx]
    sheet.range(`${startColumn}${startRow}:${endColumn}${endRow}`).merged(true)
    return true
  }

  async export(data, length, order) {
    this._creatFileFolder(this.fpath)
    if(this.sheets.length == 0) {
      await this.initExcel(this.sheetNumber[0])
      length = 0
    }
    let basicLength = this.writeHeader(length, this.data.projectInfo, data.length)
    if(data.length > 0) {

      // let header = this.writeMetalPlastic(length, data, basicLength.headerLength, order)
      let header = this.writePartlist(length, data, basicLength.headerLength, order, 'partlist')
      if(header.mergeCount > 0) {
        this.mergeCell(length, header.itemMerge, header.dataMerge, header.dataLength)
      }
      this.writeColumnWidth(length, header.headerKey, 'cleansheet', header.titleLength, basicLength.headerWidth, header.mergeCount)
      this.wrapTextOrNot(length, header.headerKey, 'partlist', header.mergeCount)
    }
    this.setFrozen(length, 'cleansheet')
    // await this.exportExcel(this.workbook, this.rpath)
  }
}
module.exports = CleanSheet