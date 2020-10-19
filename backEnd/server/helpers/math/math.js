const _ = require('lodash')

class FixMath {
  static fixedPoint(value, n) {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
  }

  static fixPercent(l, target) {
    let result = []
    let tmp = 0
    let off = target - _.reduce(l, function (acc, x) { return acc + Math.round(x) }, 0)
    _.chain(l).sortBy((x) => { return Math.round(x) - x }).forEach((x, i) => {
      // Get bigger then 0 index
      if(isNaN(x)){
        result.push(0)
      }else{
        if ((x + off) > 0) {
          tmp = i
        }
        // add shorter
        if (off > i) {
          result.push(Math.round(x) + off)
          off = 0
        }else {
          // sub high value
          if (i >= l.length - 1 && off < 0) {
            if (x > 0 && (x + off) > 0) {
              result.push(Math.round(x) + off)
            } else {
              result[tmp] = result[tmp] + off
              result.push(x)
            }
          } else {
            result.push(Math.round(x))
          }
        }
      }
    }).value()

    return result
  }
  /**
  * transform from string to float
  * @param {String} value value
  * @return {Number}
  */
  static transStringToFloat(value) {
    if(value != null && !isNaN(value)) {
      let result = this.fixedPoint(value, 5)
      return result
    }else {
      return null
    }
  }

  /**
  * 在data內，將參數裡的key的value轉成數字
  * @param {Object} data 要處理的對象
  * @param {Array} keys 針對data裡的要改變的key值
  * @returns {Number} 改變的數量
  */
  // static str2floatByKeys(data, keys) {
  //   if(!Array.isArray(keys)) return
  //   data.map(i =>{
  //     keys.forEach(e => {
  //       let cnt = 0
  //       if(e in i) {
  //         i[e] = this.transStringToFloat(i[e])
  //         cnt++
  //       }
  //     })
  //   })
  // }

  /**
  * 將excel的欄位依照他的header或是最長的資料長度做設定
  * @param {Object} sheet 要設定哪一個sheet
  * @param {Array} rowHeader 資料的title
  * @param {Array} item 各欄位中的資料，用來尋找最長資料用的
  *
  */
  static setExcelColumnWidth(sheet, rowHeader, item = null, site = 'A') {
    let compareHeaderWidth = []
    for(let i = 1; i <= rowHeader.length; i++) {
      if(item != null) {
        let width = []
        let widthNumber
        _.map(item, (e, idx) => {
          if(e[i - 1] != null) {
            width.push(e[i - 1].toString().length)
          }else {
            width.push(0)
          }
        })
        widthNumber = rowHeader[i - 1].length > _.max(width) ? rowHeader[i - 1].length : _.max(width)
        if(i <= 7) {
          compareHeaderWidth.push(widthNumber)
        }
        // for sheet start column is 'A'
        if(site == 'A') {
          if(widthNumber <= 6) {
            sheet.column(i).width(widthNumber + 10)
          }else{
            if(widthNumber > 45) widthNumber = 35
            sheet.column(i).width(widthNumber + 10)
          }

        }else {
          if(widthNumber <= 6) {
            sheet.column(i + 1).width(widthNumber + 10)
          }else{
            if(widthNumber > 45) widthNumber = 37
            sheet.column(i + 1).width(widthNumber + 8)
          }
        }
      }else {
        let width = rowHeader[i - 1].length
        if(i <= 7) {
          compareHeaderWidth.push(width)
        }
        if(site == 'A') {
          if(width <= 6) {
            sheet.column(i).width(width + 10)
          }else{
            if(width > 45) width = 35
            sheet.column(i).width(width + 10)
          }
        }else {
          if(width <= 6) {
            sheet.column(i + 1).width(width + 10)
          }else{
            if(width > 45) width = 37
            sheet.column(i + 1).width(width + 8)
          }
        }
      }
    }
    return compareHeaderWidth
  }
  static summaryWidth(sheet, rawData, column) {
    let widthCount = []
    let maxCount
    _.map(rawData, i => {
      if(i[0] != null) {
        widthCount.push(i[0].toString().length)
      }
    })
    maxCount = Math.max(...widthCount)
    if(maxCount > 45) {
      sheet.column(column).width(45)
    }else {
      sheet.column(column).width(maxCount + 10)
    }
    return maxCount
  }

  /**
   * @param {Number} num version 的版本
   * @returns {String} 回傳加上v 的版本數
   * ex: 0 => v0.0, 1 => v1.0, 0.5 => v0.5
   */
  static versionNumberToFloat(num) {
    let point = new RegExp(/[.]/)
    if (!point.test(num)) {
    // if(parseFloat(num) % 1 === 0) {
      return 'V' + num + '.0'
    } else {
      return 'V' + num
    }
  }
  /**
   * @param {Number} num 要轉成英文的數字
   * @returns {String} 回傳的英文字母
   * ex: 3 => 'C'
   */
  static numberToEnglish(num) {
    let mod = num % 26,
      pow = num / 26 | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
    return pow ? this.numberToEnglish(pow) + out : out
  }

  static compareHeaderAndItem(sheet, columnA, columnB, columnC, columnD, columnG, itemLength) {
    this.setCompareColumnWidth(sheet, columnA, itemLength[0], 'A')
    this.setCompareColumnWidth(sheet, columnB, itemLength[1], 'B')
    this.setCompareColumnWidth(sheet, columnC, itemLength[2], 'C')
    this.setCompareColumnWidth(sheet, columnD, itemLength[3], 'D')
    this.setCompareColumnWidth(sheet, columnG, itemLength[6], 'G')
  }

  static setCompareColumnWidth(sheet, header, itemLength, pos) {
    if (header >= itemLength) {
      if (header > 45) header = 35
      sheet.column(pos).width(header + 10)
    } else {
      if(itemLength > 45) itemLength = 35
      sheet.column(pos).width(itemLength + 10)
    }
  }

  static toNumber(value) {
    if (value === null || value === '' || isNaN(+value)) return value
    return +value
  }

  /**
   * 金額格式, ex: "1,234"
   */
  static numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

module.exports = FixMath
