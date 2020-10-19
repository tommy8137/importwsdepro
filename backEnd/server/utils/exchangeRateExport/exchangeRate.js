const fixMath = require('../../helpers/math/math.js')

class exchangeRate {
  constructor(workbook, data) {
    this.workbook = workbook
    this.data = data
    this.sheets = []
  }
  addSheet() {
    const newSheet = this.workbook.addSheet('Exchange Rate')
    this.sheets.push(newSheet)
    return this.sheets.length
  }
  setData(sheetIdx, pos, data, style) {
    if (Number.isInteger(sheetIdx) && sheetIdx >= 0 && sheetIdx < this.sheets.length) {
      let sheet = this.sheets[sheetIdx]
      if(style == 'header') {
        sheet.cell(pos).value(data).style({ fontColor: 'FFFFFF', fill: '0070C0', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', border: true})
      }else if(style == 'data') {
        sheet.cell(pos).value(data).style({ border: true, numberFormat: '#,##0.00000' })
      }
      return true
    }
    return false
  }
  writeExcel() {
    let length = this.sheets.length
    let header = [['From', 'To', 'SAP Exchange Rate', 'Date']]
    this.setData(length - 1, 'A1', header, 'header')
    this.setData(length - 1, 'A2', this.data, 'data')
    fixMath.setExcelColumnWidth(this.sheets[length - 1], header[0])
    return true
  }
  async export() {
    this.addSheet()
    this.writeExcel()
    return true
  }
}
module.exports = exchangeRate