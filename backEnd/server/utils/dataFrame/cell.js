const excelColumnName = require('excel-column-name');
const utils = require('./utils')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('dtaFrame.cell')
const _ = require('lodash')
const COLUMN_LIMIT_WIDTH = 45// excel column width limit
const CHINESE_COLUMN_LIMIT_WIDTH = 30// if value include chinese then there is excel column width limit
const CHINESE_FILL_UP_LENGTH = 15// if value include chinese and value length < 30, then must use this variable to fill up this column width
const CHINESE_VARIFY = /[\u4e00-\u9fa5]/

class Cell {
  constructor(sheet, cellJson, anchor = null, style = {}){
    this.sheet = sheet
    this.cellJson = cellJson // maybe no need
    this.anchor = anchor
    this.style = style
    this.cellWidth = 0
  }
  /**
   * 替換特殊控制字元，防止excel損毀。
   * 資料來源：https://en.wikipedia.org/wiki/Valid_characters_in_XML
   * utf-8 字元對照:http://www.fileformat.info/info/charset/UTF-8/list.htm
   * @param {any} value
   */
  _removeUnvaildChart(value) {
    if(value && typeof value === 'string'){
      // eslint-disable-next-line no-control-regex
      value = value.replace(/[\u0001–\u0008\u000E–\u001F]/g, ' ') // 換成空格
      // eslint-disable-next-line no-control-regex
      value = value.replace(/[\u000B–\u000C]/g, '\n') // 換成換行
    }
    return value
  }
  _setValue(value){
    value = this._removeUnvaildChart(value)
    let border = {
      top: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      bottom: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      left: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      right: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
    }
    if(this.style.borderTop) border.top.style = 'medium'
    if(this.style.borderBottom) border.bottom.style = 'medium'
    if(this.style.borderRight) border.right.style = 'medium'
    if(this.style.borderLeft) border.left.style = 'medium'
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).value = value
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).border = border
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).font = {
      name: this.style.fontFamily,
      bold: this.style.bold ? this.style.bold : false,
      strike: this.style.strikethrough ? this.style.strikethrough : false,
      color: { argb: this.style.fontColor },
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb: this.style.fill }
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).alignment = {
      horizontal: this.style.horizontalAlignment,
      vertical: this.style.verticalAlignment,
      wrapText: this.style.wrapText ? true : false,
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).numFmt = this.style.numberFormat ? this.style.numberFormat : null
    
  }
  _setFormula(formula){
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).value =  { formula: formula }
  }
  _setValueWithNoStyle(value) {
    value = this._removeUnvaildChart(value)
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).value = value
  }
  _setMerge(mergeAnchorX, mergeAnchorY) {
    this.sheet.mergeCells(`${this.anchor.x}${this.anchor.y}:${mergeAnchorX}${mergeAnchorY}`)
  }
  _setStyle() {
    let border = {
      top: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      bottom: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      left: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
      right: {
        style: this.style.border ? 'thin' : null,
        color: { argb: this.style.borderColor },
      },
    }
    if(this.style.borderTop) border.top.style = 'medium'
    if(this.style.borderBottom) border.bottom.style = 'medium'
    if(this.style.borderRight) border.right.style = 'medium'
    if(this.style.borderLeft) border.left.style = 'medium'
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).border = border
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).font = {
      name: this.style.fontFamily,
      bold: this.style.bold ? this.style.bold : false,
      strike: this.style.strikethrough ? this.style.strikethrough : false,
      color: { argb: this.style.fontColor },
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb: this.style.fill }
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).alignment = {
      horizontal: this.style.horizontalAlignment,
      vertical: this.style.verticalAlignment,
    }
    this.sheet.getCell(`${this.anchor.x}${this.anchor.y}`).numFmt = this.style.numberFormat ? this.style.numberFormat : null
  }
  setValue(){
    log.error('parent setValue is not implemented')
    throw Error('NOT_IMPLEMENT')
  }
  setCellWitdh(){
    log.error('parent setCellWitdh is not implemented')
    throw Error('NOT_IMPLEMENT')
  }
  setAutoFilter(){
    log.error('parent setAutoFilter is not implemented')
    throw Error('NOT_IMPLEMENT')
  }
  getCellWidth() {
    let widthInfo = {
      col: this.anchor.x,
      width: this.cellWidth,
    }
    return widthInfo
  }
  execute(){
    this.setCellWitdh()
    this.setValue()
  }
}

class Data extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null }){
    super(sheet, cellJson, anchor, style)
    this.value = value
  }
  setValue() {
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
}
class arrayValue extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null }){
    super(sheet, cellJson, anchor, style)
    this.value = value
  }
  setValue() {
    if(_.isNull(this.value)) {
      this._setValue(this.value)
    } else {
      this._setValue(this.value.join(','))
    }
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = this.value.reduce((init, sum) => init + sum.length, 0) <= CHINESE_COLUMN_LIMIT_WIDTH ? this.value.reduce((init, sum) => init + sum.length, 0) + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = this.value.reduce((init, sum) => init + sum.length, 0) <= COLUMN_LIMIT_WIDTH ? this.value.reduce((init, sum) => init + sum.length, 0) : COLUMN_LIMIT_WIDTH
      }
    }
  }
}
class noStyleData extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null }){
    super(sheet, cellJson, anchor, style)
    this.value = value
  }
  setValue() {
    if(this.style.fill) {
      this._setValue(this.value)

    } else {
      this._setValueWithNoStyle(this.value)

    }
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
  
}

class Serial extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, serial = null }){
    super(sheet, cellJson, anchor, style)
    this.serial = serial
  }
  setValue() {
    this._setValue(this.serial)
  }
  setCellWitdh(){
    if (this.serial) {
      this.cellWidth = String(this.serial).length <= COLUMN_LIMIT_WIDTH ? String(this.serial).length : COLUMN_LIMIT_WIDTH
    }
  }
}


class Value extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {} }){
    super(sheet, cellJson, anchor, style)
  }
  setValue() {
    this._setValue(this.cellJson.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.cellJson.value) {
      if(reg.test(this.cellJson.value)) {
        this.cellWidth = String(this.cellJson.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.cellJson.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.cellJson.value).length <= COLUMN_LIMIT_WIDTH ? String(this.cellJson.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
}

class Formula extends Value {
  setValue() {
    this._setFormula(this.cellJson.value)
    this._setStyle()
  }
  setCellWitdh(){
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    }
  }
}

class Merged extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null, mergeLength = 1, verticalDirection, horizontalDirection }){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.mergeLength = mergeLength
    this.verticalDirection = verticalDirection
    this.horizontalDirection = horizontalDirection
  }
  setValue() {
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
  setMerge() {
    let anchorIntX = excelColumnName.excelColToInt(this.anchor.x)
    let mergeAnchorX
    let mergeAnchorY
    if(this.verticalDirection && !this.horizontalDirection) {
      mergeAnchorX = this.anchor.x
      mergeAnchorY = this.anchor.y + this.mergeLength - 1
    } else if(!this.verticalDirection && this.horizontalDirection) {
      mergeAnchorX = excelColumnName.intToExcelCol(anchorIntX + this.mergeLength)
      mergeAnchorY = this.anchor.y
    } else if(this.verticalDirection && this.horizontalDirection) {
      mergeAnchorX = excelColumnName.intToExcelCol(anchorIntX + this.mergeLength)
      mergeAnchorY = this.anchor.y + this.mergeLength - 1
    }
    this._setMerge(mergeAnchorX, mergeAnchorY)
  }

  execute(){
    this.setCellWitdh()
    this.setValue()
    this.setMerge()
  }
}

class subHeaderMerged extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null, mergeLength = 1}){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.mergeLength = mergeLength
    
  }
  setValue() {
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
  setMerge() {
    let anchorIntX = excelColumnName.excelColToInt(this.anchor.x)
    let mergeAnchorX = excelColumnName.intToExcelCol(anchorIntX + this.mergeLength - 1)
    let mergeAnchorY = this.anchor.y
    this._setMerge(mergeAnchorX, mergeAnchorY)
  }

  execute(){
    this.setCellWitdh()
    this.setValue()
    this.setMerge()
  }
}
class rowHeaderMerged extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null, mergeLength = 1}){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.mergeLength = mergeLength
    
  }
  setValue() {
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
  setMerge() {
    let anchorIntX = excelColumnName.excelColToInt(this.anchor.x)
    let mergeAnchorX = excelColumnName.intToExcelCol(anchorIntX)
    let mergeAnchorY = this.anchor.y + this.mergeLength - 1
    this._setMerge(mergeAnchorX, mergeAnchorY)
  }

  execute(){
    this.setCellWitdh()
    this.setValue()
    this.setMerge()
  }
}

class Bold extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null }){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.style = style
  }
  setValue() {
    if(this.value == 'Y') {
      this.style = this.style.thick
    } else {
      this.style = this.style.thin
    }
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
}
class SetKeyBolder extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null, bolder = false }){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.style = style
    this.bolder = bolder
  }
  setValue() {
    if(this.bolder) {
      this.style = this.style.thick
    }else {
      this.style = this.style.thin
    }
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
  
}
class FontToRed extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null }){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.style = style
  }
  setValue() {
    if(this.value == 'Y') {
      this.style = this.style.exist
    } else {
      this.style = this.style.no_exist
    }
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
}

class StrikeThrough extends Cell {
  constructor({ sheet, cellJson, anchor = null, style = {}, value = null, strikethrough = false }){
    super(sheet, cellJson, anchor, style)
    this.value = value
    this.strikethrough = strikethrough
  }
  setValue() {
    if(this.strikethrough === true) {
      this.style = this.style.delete
    } else {
      this.style = this.style.non_delete
    }
    this._setValue(this.value)
  }
  setCellWitdh(){
    let reg = CHINESE_VARIFY
    if (this.style.numberFormat) {
      this.cellWidth = String(this.style.numberFormat).length <= COLUMN_LIMIT_WIDTH ? String(this.style.numberFormat).length : COLUMN_LIMIT_WIDTH
    } else if (this.value) {
      if(reg.test(this.value)) {
        this.cellWidth = String(this.value).length <= CHINESE_COLUMN_LIMIT_WIDTH ? String(this.value).length + CHINESE_FILL_UP_LENGTH : COLUMN_LIMIT_WIDTH
      } else {
        this.cellWidth = String(this.value).length <= COLUMN_LIMIT_WIDTH ? String(this.value).length : COLUMN_LIMIT_WIDTH
      }
    }
  }
}

module.exports = {
  data: Data,
  serial: Serial,
  value: Value,
  formula: Formula,
  merged: Merged,
  subheadermerged: subHeaderMerged,
  rowheadermerges: rowHeaderMerged,
  boldChange: Bold,
  keyBold: SetKeyBolder,
  noStyle: noStyleData,
  array: arrayValue,
  fontToRed: FontToRed,
  strikethrough: StrikeThrough,
}
