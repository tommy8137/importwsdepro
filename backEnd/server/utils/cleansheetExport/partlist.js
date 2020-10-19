const fixMath = require('../../helpers/math/math.js')
const CleanSheet = require('./cleansheet.js')
const _ = require('lodash')

class Partlist extends CleanSheet {
  constructor(filePath, folderPath, data, cleanSheetType, partlistName, type, sheetNumber) {
    super(filePath, folderPath, data, cleanSheetType, partlistName, type, sheetNumber)
    this.partlistName = partlistName
    this.sheetNumber = sheetNumber
  }

  /**
 *
 * 將傳進來的資料寫進excel partlist sheet裏面
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Object} data ex: { projectInfo: { projectName: 'xxx'}, bomItems: [{cleanSheet: [], partlist: []}]}
 * @param {String} pos header所佔的長度
 * @returns {Object} ex: {
      headerKey: [[ '442.0GG0I.0002111', null, '439.0F805.0011', '1' ],],// 組合過後的數值
      itemMerge: [ 'Part name',
       'Part number',
       'Currency',
       'SKU',
      ],// header的值
      titleLength: [ 9,
       11,
       8,
       3,
      ],// header值的長度
 }
 */

  writePartlist(sheetIdx, data, pos, order, type) {
    let dataTrans = _.map(data, i => {
      return i[type]
    })
    let mergeCount = 0
    let item = []
    let itemMerge = []
    let dataMerge = []
    let dataCombine = []
    let headerKey = []
    let titleLength = []

    // if(order == 'housing-metal' || order == 'housing-plastic') {
    //   _.map(dataTrans, (o, oid)=> {
    //     let dataInsert = []
    //     _.map(o, (v)=> {
    //       _.map(v.contents, (j) => {
    //         dataInsert.push(j.value)
    //         if(oid == 0) {
    //           let headerInsert = [v.key, j.label]
    //           let obj = {
    //             key: v.key,
    //             value: j.label,
    //             style: j.style.merged
    //           }
    //           item.push(headerInsert)
    //           itemMerge.push(v.key)
    //           // obj[v.key] = j.label
    //           dataMerge.push(obj)
    //           titleLength.push(v.key.length)
    //           this.setHeader(sheetIdx, `A${pos + 1 + item.length}`, [headerInsert])
    //           this.setStyle(sheetIdx, pos + 1 + item.length, dataTrans.length, 'partlist', j.style.color, j.style.format)
    //           this.setHeaderBorder(sheetIdx, pos + 1 + item.length, j.style.border, dataTrans.length, 'partlist')
    //         }
    //       })
    //     })
    //     dataCombine.push(dataInsert)
    //   })

    // }else {
    let final = []
    let arrange = _.reduce(dataTrans, (pre, acc, index) => {// 先把所有partlist底下的array先攤平 變成一個array
      return pre.concat(acc)
    }, [])
    let key = _.chain(arrange)
      .map(i => Object.values(i)[0])
      .uniq()
      .value()// 將灘平過後array的第一個key值撈出來並過慮掉重複部份ex:['Part Name', 'Part Number']

    _.map(key, (i, idx) => {
      let temp = _.filter(arrange, o => o.key == i)
      final.push(_.maxBy(temp, max => max.contents.length))
    })// array object裏面同一個key的進行比較，並將contents長度較長的塞入新的array中成為excel左半邊的header

    _.map(final, num => {// 資料是否有合併儲存格的需求
      _.map(num.contents, count => {
        if(!num.isGroup) {
          if(!count.style.merged) {
            mergeCount += count.label.length
          }
        }else {
          mergeCount += count.contents.length
        }
      })
    })


    _.map(final, (i, idx) => {
      _.map(i.contents, (j, jdx) => {
        let headerInsert
        let obj
        if(i.isGroup) {// is isGroup=true 就表示他有子項目，要將子項目裡的值再提出來做運算
          _.map(j.contents, (o, odx) => {
            headerInsert = [j.key, o.label]
            obj = {
              key: j.key,
              value: o.label,
              style: o.style.merged,
            }
            item.push(headerInsert)// 這邊是拿來計算一個一個塞入excel左半邊的header的長度，方便作為cell的位置
            itemMerge.push(j.key)// 所有塞入excel左半邊的header的值的array,是為了後面合併儲存格做計算使用
            dataMerge.push(obj)// 將左半邊header的值以及他們對應的B欄位的子項目塞入一個陣列，方便合併儲存格做計算
            titleLength.push(j.key.length)// 設置欄寬用
            this.setHeader(sheetIdx, `A${pos + 1 + item.length}`, [headerInsert])
            this.setStyle(sheetIdx, pos + 1 + item.length, dataTrans.length, 'partlist', o.style.color, o.style.format, mergeCount)
            this.setHeaderBorder(sheetIdx, pos + 1 + item.length, o.style.border, dataTrans.length, 'partlist', mergeCount)
          })
        }else {
          headerInsert = [i.key, j.label]
          obj = {
            key: i.key,
            value: j.label,
            style: j.style.merged,
          }
          item.push(headerInsert)
          itemMerge.push(i.key)
          dataMerge.push(obj)
          titleLength.push(i.key.length)
          this.setHeader(sheetIdx, `A${pos + 1 + item.length}`, [headerInsert])
          this.setStyle(sheetIdx, pos + 1 + item.length, dataTrans.length, 'partlist', j.style.color, j.style.format, mergeCount)
          this.setHeaderBorder(sheetIdx, pos + 1 + item.length, j.style.border, dataTrans.length, 'partlist', mergeCount)
        }
      })
    })

    _.map(dataTrans, (i, idx) => {
      let dataInsert = []
      _.map(i, (v)=> {
        _.map(v.contents, (j) => {
          dataInsert.push(j.value)
          if(oid == 0) {
            let headerInsert = [v.key, j.label]
            let obj = {
              key: v.key,
              value: j.label,
              style: j.style.merged
            }
            item.push(headerInsert)
            itemMerge.push(v.key)
            // obj[v.key] = j.label
            dataMerge.push(obj)
            titleLength.push(v.key.length)
            this.setHeader(sheetIdx, `A${pos + 1 + item.length}`, [headerInsert])
            this.setStyle(sheetIdx, pos + 1 + item.length, dataTrans.length, 'partlist', j.style.color, j.style.format)
            this.setHeaderBorder(sheetIdx, pos + 1 + item.length, j.style.border, dataTrans.length, 'partlist')
          }
        })
      })
      dataCombine.push(dataInsert)
    })
    
    for(let i = 0 ;i < dataCombine[0].length; i++) {
      headerKey.push([dataCombine[0][i]])
    }
    _.map(dataCombine, (i, idx) => {
      if(idx != 0) {
        _.map(i, (o, odx) => {
          headerKey[odx].push(o)
        })
      }
    })


    if(mergeCount > 0) {
      this.setData(sheetIdx, `C${pos + 2}`, headerKey)
    } else {
      this.setData(sheetIdx, `B${pos + 2}`, headerKey)
    }
    return {
      headerKey: headerKey,
      itemMerge: itemMerge,
      dataMerge: dataMerge,
      titleLength: titleLength,
      dataLength: dataTrans.length,
      mergeCount: mergeCount
    }
    // })
  }

  /**
 *
 * 判斷哪些欄位要進行合併儲存格,並且進行合併的設定
 * @param {Number} sheetIdx 寫進哪一個頁面
 * @param {Array} header ex: [ 'Part name','Part number','Currency','SKU',]
 */
  mergeCell(sheetIdx, header, data, dataLength) {
    let sheet = this.sheets[sheetIdx]
    let itemTrans = fixMath.numberToEnglish(dataLength + 2)
    let sencondCount = 0
    let  result = header.reduce((obj, item) => {
      obj[item] = obj[item] ? obj[item] + 1 : 1
      return obj
    }, {})
    let dataTrans = data.reduce((obj, item) => {
      if(!obj[item.key]) {
        obj[item.key] = 0
      }
      obj[item.key] += item.value.length
      if(item.style) {
        obj[item.key] = 0
      }
      return obj
    }, {})

    _.map(dataTrans, i => {
      sencondCount += i
    })
    _.map(Object.keys(result), i => {
      if(result[i] == 1) {
        if(sencondCount != 0) {
          if(dataTrans[i] == 0) {
            this.setColumnMerge(sheetIdx, 'A', header.indexOf(i) + 4, 'B', header.indexOf(i) + 4)
          }
        }
      }else {
        this.setColumnMerge(sheetIdx, 'A', header.indexOf(i) + 4, 'A',
          header.indexOf(i) + 3 + result[i])
        sheet.cell(`A${header.indexOf(i) + 4}`).style({ verticalAlignment: 'center', horizontalAlignment: 'left' })
      }
    })
  }

  /**
 *
 * 將各個區塊的資料利用各個function寫入excel中
 */
  genExcel(data, length, order) {
    let basicLength = this.writeHeader(length, this.data.projectInfo, data.length)
    if(data.length > 0) {
      let header = this.writePartlist(length, data, basicLength.headerLength, order, 'partlist')
      this.mergeCell(length, header.itemMerge, header.dataMerge, header.dataLength)
      this.writeColumnWidth(length, header.headerKey, 'partlist', header.titleLength, basicLength.headerWidth, header.mergeCount)
      this.wrapTextOrNot(length, header.headerKey, 'partlist', header.mergeCount)
    }
    this.setFrozen(length, 'partlist')
  }
 /**
 *
 * 看有幾個partlist就創造幾個頁面併把資料塞進正確的頁面中，並且處理有無權限的狀況
 */
  async createExcel(cleanSheetOrNot) {
    if(cleanSheetOrNot == 'Y') {// 權限為看得到價錢者
      await this.initExcel(this.sheetNumber[0])// sheetNumber：['Clean Sheet-Housing_Metal', 'Partlist-Housing_Metal', 'Clean Sheet-Housing_Plastic', 'Partlist-Housing_Plastic'] or ['Clean Sheet-Housing_Metal', 'Partlist-Housing_Metal']
      for(let i = 1; i <= this.sheetNumber.length - 1; i++) {
        this.addSheet(this.sheetNumber[i])
        if(i % 2 != 0) {// i=1, 3 也就是進入sheetNumber='Partlist-Housing_Metal'跟'Partlist-Housing_Plastic'的情況
          // this.type=['housing-metal', 'housing-plastic']
          let order = this.type[Math.floor(i / 2)]// 這邊是指當sheetNumber='Partlist-Housing_Metal'時就是要塞入this.type=['housing-metal]的情況, sheetNumber='Partlist-Housing_Plastic'時this.type=['housing-plastic]
          this.genExcel(this.data.partlist[order], i, order)// 將partlist資料塞進第1, 3個頁面
          await this.export(this.data.partlist[order], i - 1, order)// 將cleansheet資料塞進第0, 2個頁面
        }
      }
      await this.exportExcel(this.workbook, this.rpath)
    }else {// 權限為看不到價錢者,也就是只有partlist
      this._creatFileFolder(this.fpath)
      await this.initExcel(this.sheetNumber[0])
      for(let i = 0; i < this.sheetNumber.length; i++) {
        if(i != 0) {
          this.addSheet(this.sheetNumber[i])
        }
        this.genExcel(this.data.partlist[this.type[i]], i, this.type[i])
      }
      await this.exportExcel(this.workbook, this.rpath)
    }
  }
}

module.exports = Partlist
