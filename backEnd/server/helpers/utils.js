const yaml = require('js-yaml');
const fs = require('fs')
const util = require('util')
const _ = require('lodash')
const moment = require('moment')
const { throwApiError, errorCode } = require('./errorCode/apiErrorHelper.js')
const log4js = require('../utils/logger/logger')
const logger = log4js.getLogger('helpers')
const readFile = util.promisify(fs.readFile)
const yml2json = function (yml, ctype = 'p') {
  let content = ''
  try {
    if (ctype === 'p') {
      content = fs.readFileSync(yml, 'utf8');
    } else {
      content = yml
    }
    let doc = yaml.safeLoad(content);
    return Object.assign({}, doc)
  } catch (e) {
    logger.error(`load yaml ${yml} fail`)
    logger.error("Error", e.stack);
    logger.error("Error", e.name)
    logger.error("Error", e.message)
    throwApiError('CAN_NOT_LOAD_YML', errorCode.ERRORFORMAT)
  }
}

const forPromiseAll = async function (elements, asyncFunc, pallelNum = 100) {
  let idx = 0
  let ret = []
  while (idx < elements.length) {
    let inStart = Date.now()
    let selectedElms
    if (idx + pallelNum < elements.length) {
      selectedElms = elements.slice(idx, idx + pallelNum)
    } else {
      selectedElms = elements.slice(idx)
    }
    let res = await Promise.all(selectedElms.map(elm => asyncFunc(elm)))
    console.log(idx, ' : ', Date.now() - inStart);
    ret = ret.concat(res)
    idx += pallelNum
  }
  return ret
}
const formatNumberLength = function (num, length) {
  let r = "" + num;
  while (r.length < length) {
    r = "0" + r;
  }
  return r;
}
const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
const isNumber = function (num) {
  if (num == null || num.toString().replace(/\s/g, '') == '') {
    return false
  }
  // check Number
  num = Number(num)
  if(isNaN(num)){
    return false
  } else {
    return true
  }
}
const formatFloat = function (num, pos){
  //check Number
  num = Number(num)
  if(isNaN(num)){
    num = 0
  }
  let size = Math.pow(10, pos)
  return Math.round(num * size) / size
}

const formatFloatNotNull = function (num, pos) {
  if (num === null) {
    return null
  } else {
    return formatFloat(num, pos)
  }
}

const checkFileExist = (filePath) => {
  if (!fs.existsSync(filePath)) {
    logger.error(`file not exists: ${filePath}`)
    throwApiError('FILE_NOT_EXIST', errorCode.ERRORFORMAT)
  }
}

/**
 * 將Array等分的切開
 * @param {array} myArray array資料
 * @param {integer} chunk_size 切割的size
 */
const chunkArray = (myArray, chunk_size) => {
  let index = 0
  let arrayLength = myArray.length
  let tempArray = []

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }
  return tempArray
}


const parseUniqDataByKey = (data, key = 'wistronPN') => {
  return _.uniq(_.map(data, key))
}

const formatDate = (date, format = 'YYYYMMDD') => {
  return moment(date).format(format)
}

const yml2jsonAsync = async function (yml, ctype = 'p') {
  let content = ''
  try {
    if (ctype === 'p') {
      content = await readFile(yml, 'utf8')
    } else {
      content = yml
    }
    let doc = yaml.safeLoad(content);
    return Object.assign({}, doc)
  } catch (e) {
    logger.error(`load yaml ${yml} fail`)
    logger.error("Error", e.stack);
    logger.error("Error", e.name)
    logger.error("Error", e.message)
    throwApiError('CAN_NOT_LOAD_YML', errorCode.ERRORFORMAT)
  }
}

module.exports = {
  yml2json,
  forPromiseAll,
  formatNumberLength,
  asyncForEach,
  formatFloat,
  formatFloatNotNull,
  formatDate,
  checkFileExist,
  chunkArray,
  parseUniqDataByKey,
  yml2jsonAsync,
  isNumber,
}

