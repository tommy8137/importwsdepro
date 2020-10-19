const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')
const _ = require('lodash')
const UUID = require('uuid/v4')
const saveFilePath = path.resolve(__dirname, '../excel/')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('file utils')

class fileUtils {
  async getFile(reader, upStream) {
    return new Promise(function (result) {
      let stream = reader.pipe(upStream)
      stream.on('finish', function (err) {
        result(err)
      })
    })
  }

  createFileName(length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    _.times(length, () => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    })

    return text
  }

  toLetters(num) {
    let mod = num % 26,
      pow = num / 26 | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
    return pow ? this.toLetters(pow) + out : out
  }

  async deleteFile(path) {
    try {
      fs.unlinkSync(path)
    } catch (err) {
      console.log(`fail deleted ${path}`)
    }
  }
  /**
   *
   * @param {*} file import excel 檔案
   * @param {*} sheet 要抓取的 sheet 名稱 ex: 'ItemList'
   *
   * @returns arr, 從 import excel的raw data
   * @returns headerMapping, execl 欄位 所對應的header名稱 ex: { A: 'No.', B: 'Define_Y/N_', C: 'OEM/ODM', }
   * ** excel header 的名稱, 如果有'(', ')'會將其轉換為'_'
   */
  async prepareData(file, sheet, numberLength, isFristHeader = true) {

    const downPath = saveFilePath
    const reader = fs.createReadStream(file.path) // read file strem
    const ext = file.name.split('.').pop()    // get upload file extensio
    let type = ''
    if (ext != 'xlsx' && ext != 'xls' && ext != 'xlsm') {
      // Wrong Formate
      throw new Error('C000101')
    }
    const filename = this.createFileName(10)
    const filePath = path.resolve(`${downPath}/${filename}.${ext}`)
    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)
    const workbook = xlsx.readFile(filePath)
    const sheetNames = workbook.SheetNames

    // const numberLength = 5
    let arr = []
    let headerMapping = {}

    _.forEach(sheetNames, (v) => {
      if (v.toUpperCase().replace(/ /g, '').trim() != sheet.toUpperCase().replace(/ /g, '').trim()) {
        return
      }

      type = v
      let worksheet = workbook.Sheets[v]
      if (!isFristHeader) {
        type = v
        worksheet['!ref'] = worksheet['!ref'].replace('A1', 'A2')
      }

      let data = xlsx.utils.sheet_to_json(worksheet, { raw: true, defval: true })

      if (!data && data.length <= 0) {
        return
      }

      _.forEach(data, (v, idx) => {
        let obj = {}
        let index = 1
        _.forEach(v, (dv, key) => {

          // trim string space and fix number
          let header = key.replace(/(?:\\[rn]|[\u4E00-\u9FA5]|[*]|[\r\n]+)+/g, '').replace(/ /g, '')
          // header = header.replace(/\-?\d+\.\d+/g, '').replace(/\-?\d+\.+/g)
          let value = ''
          if (header.indexOf('(') > -1) {
            // 如果key 有()時, ex: Pur.Group(WWL) -> Pur.Group_WWL_
            header = header.toString().replace(/[()]/g, '_').trim() // header.substring(0, header.indexOf('('))
          }

          if (header.indexOf('__EMPTY') > -1) return

          if (typeof dv === 'string') {
            value = !dv ? null : dv.toString().replace(/(?:\\[rn])+/g, '').trim()
          } else if (dv && typeof dv === 'number' && dv.toString().length > numberLength) {
            value = Number(dv.toFixed(numberLength))
          } else {
            value = typeof dv == 'boolean' || dv == null || dv == undefined ? null : dv.toString().replace(/(?:\\[rn])+/g, '').trim()
          }

          headerMapping[this.toLetters(index)] = header
          obj[header] = value
          index++
        })
        // obj.supply_type = 'AVAP'
        obj.id = UUID()
        // obj.bom_id = bomId
        arr.push(obj)

      })
    })

    if(!arr[0]){
      // Column number is not match
      throw new Error('C000105')
    }

    this.deleteFile(filePath)
    return { rawData: arr, headerMapping }
  }

  static checkDataVal(data, colRules) {
    /**
    check data dependency by db table col_definite & col_dependence
    **/

    for (let i = 0; i < colRules.length; i++) {
      let ruleKey = colRules[i].key

      // logger.debug(`key check: ${ruleKey}`)
      if (ruleKey in data) {
        if (!(data[ruleKey]) || data[ruleKey].length == 0) {
          throw new Error(colRules[i].errorCode)
        }
      } else {
        logger.info(`rule val: ${colRules[i].key}, no need for check`)
      }
    }
  }

  /**
   *
   * @param items {Array} 檢查的資料
   * @param colRules {Array} 檢查欄位以及錯誤代碼 ex: [{
      key: 'no',
      errorCode: 'X000101',
    }]
   *
   * @returns failmessage {Array} [{ item: 1, errorCode: 'X00011' }]
   * @returns failRes {Array} 回傳fail的資料
   */
  static confirmData (items, colRules) {
    let failmessage = []
    logger.debug('col Rules:', colRules)

    _.forEach(items, (item, idx) => {
      idx++
      try {
        this.checkDataVal(item, colRules)
        item.pass = true
      } catch (err) {
        item.pass = false
        failmessage.push({
          item: idx + 1,
          errorCode: err.message,
        })
        // idx + 1: excel 有 header, 所以item要+1
        logger.warn('validate fail', idx + 1, err)
      }
    })

    let failRes = _.filter(items, (v) => { return !v.pass })
    let successRes = _.filter(items, (v) => { return v.pass })
    return {
      failmessage,
      failRes,
      successRes,
    }
  }

  /**
  *  @param {*} file import excel 檔案
  */
  async saveExcel(file, savePath) {
    const filename = file.name
    const filePath = path.resolve(`${savePath}/${filename}`)
    logger.info('save file: ', filename, 'to:', path.resolve(savePath))

    const reader = fs.createReadStream(file.path) // read file strem
    const ext = file.name.split('.').pop() // get upload file extensio
    if (ext != 'xlsx' && ext != 'xls' && ext != 'xlsm') {
      // Wrong Formate
      throw new Error('C000101')
    }

    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)
    return
  }

  /**
  *  @param {*} file import Temporary File 檔案
  */
  async saveFile(file, savePath) {
    const filename = file.name
    const filePath = path.resolve(`${savePath}/${filename}`)
    logger.info('save file: ', filename, 'to:', path.resolve(savePath))

    const reader = fs.createReadStream(file.path) // read file strem
    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)
    return
  }

  async removeExcel(filePath, filename) {
    let fileFullPath = path.resolve(`${filePath}/${filename}`)
    logger.debug('remove file from: ', fileFullPath)
    this.deleteFile(fileFullPath)
  }
}

module.exports = fileUtils
