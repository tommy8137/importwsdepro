const moment = require('moment')
const XlsxPopulate = require('xlsx-populate')
const xlsx = require('xlsx')
const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const tv = require('traverse');
const rbacService = require('../admin/rbac.js')
const bomItemModel = require('../../model/bom/bomItem')
const { DatabaseModel } = require('../../model/cleanSheet/database.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { formatDate } = require('../../helpers/query/processString.js')
const fileNameMapping = require('../../utils/cleansheetExport/fileNameMapping.js')
const Partlist = require('../../utils/cleansheetExport/partlist.js')
const {CleansheetExport, CleansheetExportWithRecoder}= require('../../utils/cleansheetExport/CleansheetExport')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('service/cleanSheet/costgen')
const dfutils = require('../../utils/dataFrame/utils')

class Costgen {
  constructor() {
    this.exportTableData = this.exportTableData.bind(this)
    this.uploadBaseData = this.uploadBaseData.bind(this)
    this.prepareData = this.prepareData.bind(this)
    this.getData = this.getData.bind(this)
    this.addHeaderAndData = this.addHeaderAndData.bind(this)
  }

  static getCellNumber(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let columnHeader = []
    _.times(length, (i) => {

      if (i + 1 > alphabet.length) {
        const prefix = parseInt((i / alphabet.length)) - 1
        columnHeader.push(alphabet[prefix] + alphabet[(i % alphabet.length)])
      } else {
        columnHeader.push(alphabet[i])
      }
    })
    return columnHeader
  }


  static createFileName(length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    _.times(length, () => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    })

    return text
  }

  static async getFile(reader, upStream) {
    return new Promise(function (result) {
      let stream = reader.pipe(upStream)
      stream.on('finish', function (err) {
        result(err)
      })
    })
  }


  static async deleteFile(path) {
    try {
      fs.unlinkSync(path)
    } catch (err) {
      console.log(`fail deleted ${path}`)
    }
  }

  static async getData(query) {
    let result = {}
    result = await this.getDatabase()
    if (result) {
      if (query.type) result = _.pick(result, [query.type])
      if (query.name) {
        _.forEach(result, (value) => {
          return result[query.type] = _.pick(value, [query.name])
        })
      }
    }
    return result
  }

  static async getDatabase() {
    let result = await DatabaseModel.getAll()
    return result
  }

  static async getTables(query) {
    const data = await DatabaseModel.getTable(query)

    let result = _(data).groupBy(x => x.tabletype)
      .map((value, key) => ({ tableType: key, tables: value.map( v => ({ tableName: v.tablename, updateBy: v.updateby, updateDate: moment(v.updatetime).format('YYYY/MM/DD hh:mm:ss'), version: `V${v.versionnumber}` })) }))
    return { list: result.value() }
  }

  static async getTypes() {
    const data = await DatabaseModel.getType()
    return { list: data.map(x => x.tabletype) }
  }

  static async exportTableData(type, name, data) {
    let res = false
    data = data[Object.keys(data)]
    if(_.isEmpty(data)){
      return false
    }

    if (data) {
      // const date = new Date()
      // const fileDate = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate()
      const fileDate = formatDate(new Date())
      const savePath = path.resolve(__dirname, '../../utils/excel')
      await XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          const costBaseData = workbook.sheet('Sheet1')
          _.forEach(data, (v) => {
            costBaseData.name(`${type}_${name}`)
            if (v.hasOwnProperty('header')) {
              let headerData = _.pick(v, ['header'])
              let columHeader = this.getCellNumber(headerData.header.length)
              let valueData = _.pick(v, ['data'])
              if (headerData.header) {
                _.forEach(headerData.header, (hv, hIdx) => {
                  costBaseData.cell(`${columHeader[hIdx] + 1}`).value(hv.name).style('bold', true)
                })
              }
              if (valueData.data) {
                _.forEach(valueData.data, (hv, hIdx) => {
                  _.map(Object.keys(hv), (v, vi) => {
                    const index = hIdx + 2
                    costBaseData.cell(`${columHeader[vi] + index}`).value(hv[v])
                  })
                })
              }
            } else {
              this.exportTableData(type, name, v)
            }
          })
          res = true
          return workbook.toFileAsync(savePath + `/${type}_${name}_${fileDate}.xlsx`)
        }).catch((er) => {
          res = false
        })
    }
    return res
  }

  static async prepareData(file, query) {
    const downPath = path.resolve(__dirname, '../../utils/excel/')
    const reader = fs.createReadStream(file.path)	// read file strem
    const ext = file.name.split('.').pop()		// get upload file extensio
    const filename = this.createFileName(10)
    const filePath = path.resolve(`${downPath}/${filename}.${ext}`)
    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)

    let type = ''
    const datas = {}
    const workbook = xlsx.readFile(filePath)
    const sheetNames = workbook.SheetNames
    const isFristHeader = true
    const numberLength = 5
    _.forEach(sheetNames, (v) => {
      type = v
      let worksheet = workbook.Sheets[v]
      if (!isFristHeader) {
        type = worksheet['B1'] ? worksheet['B1'].v : v
        worksheet['!ref'] = worksheet['!ref'].replace('A1', 'A2')
      }
      let data = xlsx.utils.sheet_to_json(worksheet, { raw: true, defval: null })
      data = _.map(data, (d) => {
        return _.mapValues(d, (dv) => {
          // trim string space and fix number
          if (typeof dv === 'string') return dv.trim()
          if (typeof dv === 'number' && dv.toString().length > numberLength) return Number(dv.toFixed(numberLength))
          return dv
        })
      })

      if (!datas.hasOwnProperty(type)) {
        datas[type] = data
      }else {
        datas[type].push(data)
      }
    })

    // console.log('datas', datas)
    // after data prepare finished, delete the file
    this.deleteFile(filePath)
    return datas
  }

  static async checkBaseData(uploadData, dataHeaderDef, query, checkHeaderType = 'name') {
    let res = { Res: true, Msg: '', InsertData: [] }
    let wrongTypeKey = []
    let resArr = []

    if (dataHeaderDef && uploadData) {
      const tmpData = uploadData[Object.keys(uploadData)]
      let headerDef = dataHeaderDef[Object.keys(dataHeaderDef)]
      headerDef = headerDef[Object.keys(headerDef)]


      if (headerDef.header) {
        if (tmpData.length == 0) {
          res = { Res: false, Msg: 'Without Data' }
          return res
        }
        _.forEach(headerDef.header, (def, key) => {
          // Check Header
          let getName = checkHeaderType === 'name' ? _.property(def.name) : _.property(def.key)
          let checkHeaderRes = _.map(tmpData, getName)

          if (checkHeaderRes && checkHeaderRes.length > 0 && String(checkHeaderRes[0]) != 'undefined'  && checkHeaderRes[0].toString() != 'null' ) {
            // Reset Header column value when type is string; eq: 123.45 => '123.45'
            _.map(checkHeaderRes, (v, idx) => {
              let restVal =  resArr[idx]
              if(restVal){
                restVal[def.key] = v
              } else {
                let resObj = {}
                resObj[def.key] = v.toString()
                resArr.push(resObj)
              }
            })
            if (resArr.length > 0) {
              let checkValueRes = _.map(checkHeaderRes, (v) => {
                // Check value type
                return typeof v === def.typeof
              })
              _.find(checkValueRes, (v, k) => {
                if (!v) {
                  wrongTypeKey.push(k + 1)
                }
              })

              if (wrongTypeKey && wrongTypeKey.length > 0) {
                res = { Res: false, Msg: `Value type is wrong in row ${JSON.stringify(wrongTypeKey)}` }
                return false
              }else{
                res['InsertData'] = resArr
              }
            }
          }else{
            res = { Res: false, Msg: 'Wrong Header' }
            return false
          }
        })
      }
    } else {
      res = { Res: false, Msg: 'Can not find Header name & type' }
    }
    return res
  }

  static async uploadBaseData(file, query) {
    const uploadData = await this.prepareData(file, query)
    let checkRes = await this.checkBaseData(uploadData, await this.getData(query), query) // check data formate
    if (checkRes.Res) {
      // Delete data
      let result = await DatabaseModel.delete(query.type, query.name)
      if (result) {
        let tmpData = checkRes.InsertData
        if(_.isEmpty(tmpData)){
          return { Res: false, Msg: 'Without Data' }
        }
        // Filter duplicate data
        let filterDupData = _.map(
          _.uniq(
            _.map(tmpData, (obj) => {
              return JSON.stringify(obj)
            })
          ), (obj) => {
            return JSON.parse(obj)
          }
        )
        // Insert data
        result = await DatabaseModel.insertDetailData(filterDupData, query.type, query.name)
        if (result.length > 0 && _.find(result, (v) => { return v != '' })) {
          return { Res: false, Msg: result }
        } else {
          // Update table version
          const updateResult = await DatabaseModel.updateTable(query.type, query.name, query.user)
          if (updateResult) return { Res: true, Msg: '' }
          else return { Res: false, Msg: 'Update table fail' }
        }

      }else {
        return { Res: false, Msg: 'Delete baseData fail' }
      }
    }else {
      return checkRes
    }
  }

  static async getResult(info) {
    let excel = await genResultExcel(info)
    return excel
  }

  static async exportMeCleanSheet(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName = 'Partlist') {
    let excel = await genMeCleanSheet(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName)
    return excel
  }
  static async exportQuotation(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName = 'Partlist') {
    let excel = await genMeQuotation(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName)
    return excel
  }

  static async exportQuotationByNewModule(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName = 'Partlist') {
    let excel = await genMeQuotationByNewModule(bomId, userID, type, data, filepath, excelFolder, cleanSheetType, partlistName)
    return excel
  }

  static async addHeaderAndData(data, query) {
    let res = { Res: true, Msg: '' }
    if(!data.header || data.header.length  == 0){
      res.Res = false
      res.Msg = 'Missing Header data'
      return res
    }
    if(!data.data || data.data.length == 0){
      res.Res = false
      res.Msg = 'Missing Data data'
      return res
    }

    // Prepare Header part
    let headereDef = {}
    let headerNameDef = {}
    headerNameDef[query.name] = _.pick(data, ['header'])
    headereDef[query.type] = headerNameDef
    // check detail data
    let checkRes = await this.checkBaseData(_.pick(data, ['data']), headereDef, query, 'key')
    if(!checkRes.Res){
      return checkRes
    }

    // insert or update data
    let result = await DatabaseModel.insertOrUpdateData(query.type, query.name, query.user, data)
    if(!result){
      res.Res = result
      res.Msg = 'Insert fail'
    }
    return res
  }
  static async queryKeyPath(bomId, partlistId, versionId, searchKey, returnKey, needData=true) {
    let data = await getPartListData(bomId, versionId, partlistId)
    let dataTv = tv(data)
    let paths = dataTv.paths()
    let pathsWithSearchKey = paths.filter((path)=>{
      if (path.includes(searchKey)) {
        return path
      }
    })
    let returnData = data
    if (needData===false) {
      returnData={}
    }
    return {
      result: pathsWithSearchKey.map((path)=>{
        let digitReg = /\.\d+\./g
        let value = dataTv.get(path) 
        let keypath = path.join('.')
        if (keypath.search(digitReg) > 0) {
          let matchp = keypath.match(digitReg)[0]
          let [groupIdPath, returnKeyValue] = keypath.split(matchp) 
          return {
            groupIdPath: groupIdPath,
            split: matchp.split('.').join(''),
            [returnKey]: returnKeyValue,
            value,
          }
        }
        return {
          [returnKey]: keypath,
          value
        }
      }),
     data: returnData
    } 
  }
}
async function getPartListData(bomId, versionId, bomItemId) {
  if (versionId === 'CURRENT') {
    // 最新版本的Bom Project
    return  await bomItemModel.getPartlistExportDataByBomItemId(bomId, bomItemId)
  } else {
    // x.0 版本的Bom Project
    return  await bomItemModel.getPartlistExportDataCompleteVersionByBomItemId(bomId, versionId, bomItemId)
  }
}
async function genResultExcel(data) {
  const initResultPath = path.resolve(__dirname, '../../utils/excel')
  const resultFileDate = moment(new Date()).format('YYYYMMDD')
  if(Object.keys(data).length !== 0) {
    await XlsxPopulate.fromBlankAsync()
      .then(workbook => {
        const resultSheet = workbook.sheet(0).name('Result')
        resultSheet.column('A').width(8)
        resultSheet.column('B').width(10)
        resultSheet.column('C').width(17)
        resultSheet.column('D').width(15)
        resultSheet.column('E').width(12)
        resultSheet.column('F').width(17)
        resultSheet.column('G').width(15)
        resultSheet.column('H').width(14)
        resultSheet.column('I').width(14)
        resultSheet.column('J').width(10)
        const constLossRate = 0.015 // LOSS Rate定值
        const constAssyTime = 12 // 單一零件組裝工時定值
        const constAssyCost = 0.0450 // 工時費定值
        const headers = ['NO:', 'wistron料號', '品名', '單價', '用量', 'LOSS(%)', '零件費', '組裝工時(sec)', 'Remark']
        const rawData = []
        let totalPartCost = 0 // 總計-零件費
        let totalAssyTime = 0 // 總計-組裝工時(sec)
        let idx = 1
        Object.keys(data).forEach(value => {
          data[value].forEach(items => {
            const tmp = []
            let partCost = +(items.unitprice * items.usage * (1 + constLossRate)).toFixed(4) // 零件費
            let partAssyTime = items.usage * constAssyTime // 組裝工時
            tmp.push(idx, '', items.name, items.unitprice, items.usage, constLossRate, partCost, partAssyTime, '')
            rawData.push(tmp)
            idx++
            totalPartCost += partCost
            totalAssyTime += partAssyTime
          })
        })
        resultSheet.cell('B7').value('A.零件費用：').style({ fontColor: 'ff0000ff', bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
        resultSheet.cell('B8').value([headers]).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' }).style({ border: { top: 'medium', left: 'thin' } })
          .cell(0, 0).style({ border: { top: 'medium', left: 'medium' } })  // The first cell of header (Top-left)
          .relativeCell(0, headers.length - 1).style({ border: { top: 'medium', right: 'medium' } }) // The first cell of header (Top-right)

        // A.零件費用 - 畫框線, 格式
        let tmp = 0
        rawData.forEach( (t, tid, tarr) => {
          t.map( (v, vid, varr) => {
            let style = { top: 'thin', bottom: 'thin', left: 'thin', right: 'thin' }
            if(tid == rawData.length - 1) style.bottom = 'medium'
            if(vid == 0) {
              style.left = 'medium'
              resultSheet.row(tmp + 9).cell(vid + 2).value(v).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 3) {
              resultSheet.row(tmp + 9).cell(vid + 2).value(Number(v)).style('border', style).style({ numberFormat: '$#,##0.0000', bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 4) {
              resultSheet.row(tmp + 9).cell(vid + 2).value(Number(v)).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 5) {
              resultSheet.row(tmp + 9).cell(vid + 2).value(Number(v)).style('border', style).style({ numberFormat: '0.0%', bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 6) {
              resultSheet.row(tmp + 9).cell(vid + 2).value(Number(v)).style('border', style).style({ numberFormat: '_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-', bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 7) {
              resultSheet.row(tmp + 9).cell(vid + 2).value(Number(v)).style('border', style).style({ numberFormat: '0 "sec"', bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else if(vid == 8) {
              style.right = 'medium'
              resultSheet.row(tmp + 9).cell(vid + 2).value(v).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            } else {
              resultSheet.row(tmp + 9).cell(vid + 2).value(v).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
            }
          })
          tmp += 1
        })

        // A.零件費用總計(G,H,I)
        resultSheet.cell(`G${9 + rawData.length}`).value('總計:').style({ fill:'000000', fontColor:'ffffff', bold: true, fontFamily: 'arial' })
        resultSheet.cell(`H${9 + rawData.length}`).value([[Number(totalPartCost.toFixed(4)), Number(totalAssyTime)]]).style({ numberFormat: [['_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-'], ['0 "sec"']] }).style({ fill:'ffff6f', border:'medium', bold: true, fontFamily: 'arial', horizontalAlignment: 'center'  })

        // B.加工費
        let tmpLength = rawData.length
        let processHeader = ['NO:', '加工內容：', '', '', '', '', '費用(USD)', 'Remark']
        let assyCost = +((totalAssyTime / 60) * constAssyCost).toFixed(4) // 加工費
        let processData = [1, 'Assembly組裝', '工時費(Min)', constAssyCost, 'SEC:', Number(totalAssyTime.toFixed(4)), Number(assyCost.toFixed(4)), '']
        resultSheet.cell(`B${14 + tmpLength}`).value('B.加工費:').style({ fontColor: 'ff0000ff', bold: true, fontFamily: 'arial' })
        resultSheet.range(`C${15 + tmpLength}:G${15 + tmpLength}`).merged(true)
        resultSheet.cell(`B${15 + tmpLength}`).value([processHeader]).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' }).style({ border: { top: 'medium', left: 'thin' } })
          .cell(0, 0).style({ border: { top: 'medium', left: 'medium' } })  // The first cell of header (Top-left)
          .relativeCell(0, processHeader.length - 1).style({ border: { top: 'medium', right: 'medium' } }) // Insert process headers and draw the top, left and right border

        // B.加工費 - 畫框線
        processData.forEach(( i, index) => {
          let style = { top: 'thin', bottom: 'medium', left: 'thin', right: 'thin' }
          if(index == 5) {
            resultSheet.row(16 + tmpLength).cell(index + 2).value(i).style('border', style).style({ fontFamily: 'arial', horizontalAlignment: 'center' })
          } else if(index == 3 || index == 6) {
            resultSheet.row(16 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', numberFormat: '_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-', horizontalAlignment: 'center' })
          } else if(index == 0) {
            style.left = 'medium'
            resultSheet.row(16 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
          } else if(index == processData.length - 1) {
            style.right = 'medium'
            resultSheet.row(16 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
          } else {
            resultSheet.row(16 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
          }
        })
        // B.加工費總計 (G,H)
        resultSheet.cell(`G${17 + tmpLength}`).value('加工費總計:').style({ fill: '000000', fontColor: 'ffffff', bold: true, fontFamily: 'arial' })
        resultSheet.cell(`H${17 + tmpLength}`).value(Number(assyCost.toFixed(4))).style({ fill:'ffff6f', border:'medium', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', numberFormat: '_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-' })

        // 最後總計
        const constCheckPackTransCost = 0.0300 // 運包檢定值
        let marketProfit = +(assyCost * 0.1).toFixed(4) // 管銷利潤10% (加工費*10%)
        let finalCost = totalPartCost + assyCost + constCheckPackTransCost + marketProfit// 成品總價
        let totalHeader = ['零件費用', '', '加工費', '檢/包/運', '管銷&利潤(10%)', '成品總價(USD)', '成品核價', 'Remark']
        let totalPrice = [Number(totalPartCost.toFixed(4)), '', Number(assyCost.toFixed(4)), Number(constCheckPackTransCost.toFixed(4)), Number(marketProfit.toFixed(4)), Number(finalCost.toFixed(4)), '', '']
        resultSheet.range(`B${20 + tmpLength}:C${20 + tmpLength}`).merged(true)
        resultSheet.range(`B${21 + tmpLength}:C${21 + tmpLength}`).merged(true)

        // 最後總計-畫框線
        totalHeader.forEach(( i, index) => {
          let style = { top: 'medium', bottom: 'thin', left: 'thin', right: 'thin' }
          if(index == 0) style.left = 'medium'
          else if(index == totalHeader.length - 1) style.right = 'medium'
          if(index == 5) {
            resultSheet.row(20 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', fill: '000000', fontColor: 'ffffff', horizontalAlignment: 'center' })
          } else if(index == 6 || index == 7) {
            resultSheet.row(20 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', fill: 'ffff00', fontColor: 'ff0000', horizontalAlignment: 'center' })
          } else {
            resultSheet.row(20 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
          }
        })
        // 最後總計-Cell Format
        totalPrice.forEach((i, index) => {
          let style = { top: 'thin', bottom: 'medium', left: 'thin', right: 'thin' }
          if(index == 0) style.left = 'medium'
          else if(index == totalPrice.length - 1) style.right = 'medium'

          if(index == 0 || index == 2 || index == 3 || index == 4) {
            resultSheet.row(21 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center', numberFormat: '_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-' })
          } else if(index == 5) {
            resultSheet.row(21 + tmpLength).cell(index + 2).value(i).style('border', style).style({ fill: 'ffff6f', bold: true, fontFamily: 'arial', horizontalAlignment: 'center', numberFormat: '_-$* #,##0.0000_-;-$* #,##0.0000_-;_-$* "-"????_-;_-@_-' })
          } else {
            resultSheet.row(21 + tmpLength).cell(index + 2).value(i).style('border', style).style({ bold: true, fontFamily: 'arial', horizontalAlignment: 'center' })
          }
        })
        return workbook.toFileAsync(initResultPath + `/Cost_Result_${resultFileDate}.xlsx`)
      })
  }else {
    return false
  }
}

async function genMeCleanSheet(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName) {
  const excelFolder = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
  // const rawPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${filePath}.xlsx`)
  let exportPermission = await rbacService.getPolicyByUser(userID, {
    action: 'Export',
    resource: 'me_bom_projects',
  })
  if(_.isEmpty(exportPermission)) {
    throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }
  // let sheetNumber = []
  let cleanSheetOrNot = exportPermission.Export.allow.length > 0 && exportPermission.Export.deny.length > 0
  // if(exportPermission.Export.allow.length > 0 && exportPermission.Export.deny.length > 0) {
  //   cleanSheetOrNot = 'N'
  //   _.map(type, i => {
  //     sheetNumber.push(fileNameMapping[i].partlist)
  //   })
  // }else {
  //   cleanSheetOrNot = 'Y'
  //   _.map(type, i => {
  //     sheetNumber.push(fileNameMapping[i].cleansheet)
  //     sheetNumber.push(fileNameMapping[i].partlist)
  //   })
  // }
  try{
    // let cleanSheet = await new Partlist(excelFolder, rawPath, data, cleanSheetType, partlistName, type,sheetNumber)
    // await cleanSheet.createExcel(cleanSheetOrNot)
//    const excel = new CleansheetExport()
    const excel = new CleansheetExport()

    await excel.init(data)
    Object.keys(excel.data.partlist).forEach(partlistFormat => {
      const partlist = excel.data.partlist[partlistFormat]

      if (partlist.partlist) {
        excel._genPartlistFormat(partlistFormat)
      }
      if (!cleanSheetOrNot && partlist.cleansheet) {
        excel._genCleansheetFormat(partlistFormat)
      }
    })
    await excel._creatFileFolder(excelFolder)
    await excel.export(filePath, excelFolder)
    console.log('generate excel')
  }catch(e) {
    console.log(e)
    throwApiError(e)
    return
  }
}

async function genMeQuotation_remove(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName) {
  const excelFolder = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
  // const rawPath = path.resolve(__dirname, `../../utils/excel/${folderPath}/${filePath}.xlsx`)
  let exportPermission = await rbacService.getPolicyByUser(userID, {
    action: 'Export',
    resource: 'me_bom_projects.quotation_reference',
  })
  if(_.isEmpty(exportPermission)) {
    throwApiError('permission deny', errorCode.UNAUTHORIZED)
  }
  let cleanSheetOrNot = exportPermission.Export.allow.length > 0 && exportPermission.Export.deny.length > 0
  try{
    const excel = new CleansheetExportWithRecoder()

    await excel.init(data)
    data.forEach((da,idx)=>{
      excel.resetData(da)
      let usedNames = []
      Object.keys(da.partlist).forEach((partlistFormat) => {
        const partlist = da.partlist[partlistFormat]
        if (partlist.quotation) {
          let id = partlist.quotation[_.findIndex(partlist.quotation, {xlsxKey: 'partnumber'})].value[0][0] || ''
          id = `${id}_ ${idx}`
          log.info(`generate sheet for ${id}`)
          excel.genFormat(partlistFormat, 'Quotation', true, id)
        } else {
          log.error('no quotation setting')
        }
      })
    })
    excel._creatFileFolder(excelFolder)
    await excel.export(filePath, excelFolder)
    console.log('generate excel')
  }catch(e) {
    log.error(e)
    throwApiError(e)
    return
  }
}
async function genMeQuotation(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName) {
  let helper = new ExporterHelper(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName)
  await helper.exec()
}

async function genMeQuotationByNewModule(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName) {
  let helper = new ExporterHelper(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName)
  await helper.execByNewModule()
}
class ExporterHelper {
  constructor(bomId, userID, type, data, filePath, folderPath, cleanSheetType, partlistName) {
    this.excel =  new CleansheetExportWithRecoder()
    this.userID = userID
    this.data = data
    this.sheetNames = {}
    this.excelFolder = path.resolve(__dirname, `../../utils/excel/${folderPath}`)
    this.filePath = filePath
    //not in use------------------------------
    this.bomId = bomId
    this.type = type
    this.folderPath = filePath
    this.cleanSheetType = cleanSheetType
    this.partlistName = partlistName
  }
  async init() {
    await this.excel.init(this.data[0])
  }

  async initByNewModule() {
    await this.excel.initByNewModule(this.data[0])
  }

  async checkPermission() {
    let exportPermission = await rbacService.getPolicyByUser(this.userID, {
      action: 'Export',
      resource: 'me_bom_projects.quotation_reference',
    })
    if(_.isEmpty(exportPermission)) {
      throw throwApiError('PERMISSION_DENY', errorCode.UNAUTHORIZED)
    } 
  }
  reset(newData){
    this.excel.resetData(newData)
  }
  async render() {
    const self = this
    this.data.forEach((da,idx)=>{
      this.reset(da)
      Object.keys(da.partlist).forEach((partlistFormat) => {
        const partlist = da.partlist[partlistFormat]
        if (partlist.quotation) {
          let sheetname = self.getValidSheetName( partlist.quotation[_.findIndex(partlist.quotation, {xlsxKey: 'partname'})].value[0][0] || '')
          let uniquename = self.getUniqueSheetName(sheetname)
          log.info(`start to gen sheet ${uniquename}`)
          this.excel.genFormat(partlistFormat, 'Quotation', true, uniquename)
        } else {
          throwApiError('NO_QUOTATION_SETTING', errorCode.INTERNAL_ERROR)
        }
      })
    })
  }

  async renderByNewModule() {
    const self = this
    this.data.forEach((da,idx)=>{
      this.reset(da)
      Object.keys(da.partlist).forEach((partlistFormat) => {
        const partlist = da.partlist[partlistFormat]
        if (partlist.quotation) {
          let sheetname = self.getValidSheetName( partlist.quotation[_.findIndex(partlist.quotation, {xlsxKey: 'partname'})].value[0][0] || '')
          let uniquename = self.getUniqueSheetName(sheetname)
          log.info(`start to gen sheet ${uniquename}`)
          this.excel.genFormatByNewModule(partlistFormat, 'Quotation', true, uniquename)
        } else {
          throwApiError('NO_QUOTATION_SETTING', errorCode.INTERNAL_ERROR)
        }
      })
    })
  }

  async genFile() {
    await this.excel._creatFileFolder(this.excelFolder)
    await this.excel.export(this.filePath, this.excelFolder)
    log.info(`generate excel successfully at: ${this.filePath}\${this.excelFolder}`)
  }
  async genFileByNewModule() {
    await this.excel._creatFileFolder(this.excelFolder)
    await this.excel.exportByNewModule(this.filePath, this.excelFolder)
    log.info(`generate excel successfully at: ${this.filePath}\${this.excelFolder}`)

  }
  async exec() {
    await this.init()
    await this.checkPermission()
    await this.render()
    await this.genFile()
  }

  async execByNewModule() {
    await this.initByNewModule()// make new workbool
    await this.checkPermission()
    await this.renderByNewModule()// gen data
    await this.genFileByNewModule()// gen excel file
  }

  getUniqueSheetName(sheetName) {
    if (! Object.keys(this.sheetNames).includes(sheetName)){
      this.sheetNames[sheetName] = [sheetName]     
      return sheetName 
    } else {
      let idx = this.sheetNames[sheetName].length
      let uniqueName = `${sheetName}(${idx})`
      this.sheetNames[sheetName].push(uniqueName)
      return uniqueName
    }
  }
  getValidSheetName(sheetName) {
    sheetName = sheetName.replace(/(\\|\*|\?|\/|\:|\[|\])/g,'_')
    const maxlength = 25
    if (sheetName.length > maxlength ) {
      return sheetName.slice(0,maxlength) 
    } else {
      return sheetName
    }
  }
}

module.exports = Costgen
