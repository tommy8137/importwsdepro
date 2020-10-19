const _ = require('lodash')
const moment = require('moment')
const UUID = require('uuid/v4')
const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')
const NodeCache = require('node-cache')

const eebomModel = require('../../model/database/eebom.js')
const { Excel } = require('../../utils/dataFrame/excel')
const databaseUtils = require('../../utils/database/databaseUtils.js')
const fileUtils = require('../../utils/importExcel/fileUtils.js')
const { asyncForEach, chunkArray } = require('../../helpers/utils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Eebom Service')

const AVL_EXCEL_FOLDER_PATH = 'utils//database/AVL'
const AVL_EXCEL_FOLDER_ABS_PATH = path.join(__dirname, '../../', AVL_EXCEL_FOLDER_PATH)

const CONNECTOR_EXCEL_FOLDER_PATH = 'utils//database/CONNECTORCOMMONPOOL'
const CONNECTOR_EXCEL_FOLDER_ABS_PATH = path.join(__dirname, '../../', CONNECTOR_EXCEL_FOLDER_PATH)
const COMMON_PART_SHEET_NAME = 'Connector'

const AVL_EXCEL_YAML_PATH = path.join('eebomAvl', 'excel-avl.yaml')
const AVL_EXCEL_SHEET_NAME = 'AVL by customer'

const TEMPORARY_EXCEL_FOLDER_PATH = 'utils//database/TEMPORARYFILE'
const TEMPORARY_EXCEL_FOLDER_ABS_PATH = path.join(__dirname, '../../', TEMPORARY_EXCEL_FOLDER_PATH)
const SPLIT_INSERT_LENGTH = 100

const cache = new NodeCache({
  'stdTTL': 300,
  'checkperiod': 100,
})
const ERROR_HEADER = '[database][eebomService]'
/**
 *
 * @param {String} fileName
 * @returns {String} avl excel path
 */
function _getAvlExcelPath(fileName){
  const timeStamp = moment(new Date()).format('YYYYMMDDDhmmss')
  return  path.join(AVL_EXCEL_FOLDER_ABS_PATH, `${fileName}_${timeStamp}.xlsx`)
}

/**
 * 從EXCEL中 parse AVL的資料
 * @param {Array} avlExcel
 *
 * @returns {Oject}
 *  rawData {Array} parse出來的原始資料
 *  headerMapping {Array} excel的header
 *
 */
async function _parseAvlFromExcel(avlExcel){
  let fileUtil = new fileUtils()
  const numberLength = 5
  let { rawData, headerMapping } = await fileUtil.prepareData(avlExcel, AVL_EXCEL_SHEET_NAME, numberLength)
  return {
    rawData,
    headerMapping,
  }
}

/**
 * 將avl 的檔案存下, 用於下載
 * @param {*} avlExcel
 */
async function _saveAvlExcel(avlExcel){
  let fileUtil = new fileUtils()
  await fileUtil.saveExcel(avlExcel, AVL_EXCEL_FOLDER_ABS_PATH)
  return
}

/**
 * 將connector common pool 的檔案存下, 用於下載
 * @param {*} connectorExcel
 */
async function _saveConnectorExcel(connectorExcel){
  let fileUtil = new fileUtils()
  await fileUtil.saveExcel(connectorExcel, CONNECTOR_EXCEL_FOLDER_ABS_PATH)
  return
}

/**
 * 將 temporary 的檔案存下, 用於下載
 * @param {*} temporaryExcel
 */
async function _saveTemporaryExcel(temporaryExcel){
  let fileUtil = new fileUtils()
  await fileUtil.saveFile(temporaryExcel, TEMPORARY_EXCEL_FOLDER_ABS_PATH)
  return
}

/**
 * 將avl 的檔案刪除
 * @param {*} avlExcel
 */
async function _removeAvlExcel(filename){
  let fileUtil = new fileUtils()
  await fileUtil.removeExcel(AVL_EXCEL_FOLDER_ABS_PATH, filename)
  return
}
/**
 * 將connector common pool 的檔案刪除
 * @param {*} connectorExcel
 */
async function _removeConnectorExcel(filename){
  let fileUtil = new fileUtils()
  await fileUtil.removeExcel(CONNECTOR_EXCEL_FOLDER_ABS_PATH, filename)
  return
}

/**
 * 將temporary 的檔案刪除
 * @param {*} temporaryExcel
 */
async function _removeTemporaryExcel(filename){
  let fileUtil = new fileUtils()
  await fileUtil.removeExcel(TEMPORARY_EXCEL_FOLDER_ABS_PATH, filename)
  return
}

/**
 * 檢查EXCEL的欄位資訊是否為空
 * @param {*} avlData 從EXCEL parse出來的資料
 *
 */
function _checkAvlData(avlData){
  let passCount = 0
  let failCount = 0
  let failMessage = []
  return {
    passCount,
    failCount,
    failMessage,
  }
}

/**
 * 將EXCEL的Brand 資料, 回傳BRAND Array
 *
 * @param {Object} data ex: {
    BRAND01: 'PANASONIC',
    BRAND02: 'TDK',
 }
 * @param {Array} headers 從excel中拿到的 Spec header ex: ['BRAND01', 'BRAND02']
 *
 * @returns {Array} ex: ['PANASONIC', 'TDK']
 */
const getBrandByHeader = (data, headers) => {
  let json = []
  _.forEach(headers, (header) => {
    json.push(data[header])
  })
  return _.compact(_.uniq(json))
}

/**
 * 將EXCEL的SPEC 資料 整理成系統/資料庫的格式, 並SPEC 以“分號”做區隔
 *
 * @param {*} data ex: { Spec01: 'ABC',
  Spec02: '>=30;<10',
 }
 * @param {*} headers 從excel中拿到的 Spec header ex: ['Spec01', 'Spec02']
 *
 * @returns {Object} specString ex: { Spec01: 'ABC' ... }
 * @returns {Object} specArray ex: { Spec02: ['A', 'B', 'C'] }
 *
 */
const getSpecByHeader = (data, headers) => {
  let json_string = {}
  let json_array = {}

  _.forEach(headers, (header) => {
    let spec = data[header]
    if (spec){
      let specBySemicolon = spec.split(';').filter((el) => el)
      if(specBySemicolon.length <= 1) {
        json_string[header] = spec
      } else {
        json_array[header] = specBySemicolon
      }
    }
  })

  return {
    specString: json_string,
    specArray: json_array,
  }
}
/**
 * 遞迴，以spec 作為key, 將spec的內容 做整理
 */
const spreadKeys = (master, objects = [{}]) => {
  const masterKeys = Object.keys(master)
  const nextKey = masterKeys.pop()
  const nextValue = master[nextKey]

  const newObjects = []
  for (const value of nextValue) {
    for (const ob of objects) {
      const newObject = Object.assign({ [nextKey]: value }, ob)
      newObjects.push(newObject)
    }
  }

  if (masterKeys.length === 0) {
    return newObjects
  }

  const masterClone = Object.assign({}, master)
  delete masterClone[nextKey]
  return spreadKeys(masterClone, newObjects)
}

const sortByObjectKey = (unordered) => {
  let ordered = {}
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key]
  })

  return ordered
}

const _parseAvlBySpec = (baseObj, spec) => {
  let specArray = spec.specArray ? spec.specArray : []
  let specString = spec.specString
  let avlBySpecList = []

  if (Object.keys(specArray).length > 0) {
    let specCombin = spreadKeys(specArray)
    _.forEach(specCombin, (spec) => {
      avlBySpecList.push({
        ...baseObj,
        spec: JSON.stringify(sortByObjectKey({
          ...specString,
          ...spec,
        })),
      })
    })
  } else {
    avlBySpecList.push({
      ...baseObj,
      spec: JSON.stringify(sortByObjectKey(specString)),
    })
  }

  return avlBySpecList
}

const _parseAvlByBu = (buList, avlBySpecList) => {
  let avl = []
  _.forEach(buList, (bu) => {
    _.forEach(avlBySpecList, (spec) => {
      avl.push({
        ...spec,
        bu: bu,
      })
    })
  })
  return avl
}

/**
 * 將EXCEL的資料 整理成系統/資料庫的格式
 * @param {*} avlData {
  rawData: [{
    Customer: 'ROSA',
    BU: 'Desktop.Computer_AIO/Notebook.Computer',
  }],
  headerMapping: {
    A: 'Customer',
    B: 'BU',...
  }]
 */
function _parseAvlData(avlData, avlVersionId) {
  let avl = []

  let specHeader = _.filter(Object.values(avlData.headerMapping), (header) => header.toUpperCase().indexOf('SPEC') >= 0)
  let brandHeader = _.filter(Object.values(avlData.headerMapping), (header) => header.toUpperCase().indexOf('BRAND') >= 0)
  // console.log(specHeader, brandHeader)

  _.forEach(avlData.rawData, (data) => {
    let baseObj = {
      id: UUID(),
      avl_version_id: avlVersionId,
      customer: data.Customer,
      type1: data.TYPEI,
      type2: data.TYPEII ? data.TYPEII : null,
      avl_supply_type: data['AVL_S/W/AV_'],
      customer_doc: data['CustomerDoc.Date_Ver.'],
      remark: data.REMARK,
      brand: JSON.stringify(getBrandByHeader(data, brandHeader)),
      update_time: moment().utc().format(),
    }

    // 1. 先拿到SPEC 資料 && 用;切割
    let spec = getSpecByHeader(data, specHeader)
    let avlBySpecList = _parseAvlBySpec(baseObj, spec)
    // console.log(avlBySpecList)

    // 2. BU by "/" 切分
    let buList = data.BU.split('/').filter((el) => el)
    let avlByBu = _parseAvlByBu(buList, avlBySpecList)
    avl.push(...avlByBu)
  })

  return avl
}

/**
 * return insert to avl_version 的資料
 */
const _parseAvlVersion = (avlId, avlInfo, version) => {
  return {
    ...avlInfo,
    id: avlId,
    update_time: moment().utc().format(),
    version: parseInt(version) + 1,
  }
}

/**
 * return insert to connector_common_pool_version 的資料
 */
const _parseConnectorCommonPoolVersion = (connectorCommonPoolId, connectorCommonPoolInfo, version) => {
  return {
    ...connectorCommonPoolInfo,
    id: connectorCommonPoolId,
    update_time: moment().utc().format(),
    version: parseInt(version) + 1,
  }
}

/**
 * return insert to temporary_version 的資料
 */
const _parseTemporaryVersion = (temporaryId, temporaryInfo) => {
  return {
    ...temporaryInfo,
    id: temporaryId,
    update_time: moment().utc().format(),
  }
}

async function _parseCommonPoolFromExcel(commonPoolExcel) {
  let fileUtil = new fileUtils()
  const numberLength = 5
  let { rawData, headerMapping } = await fileUtil.prepareData(commonPoolExcel, COMMON_PART_SHEET_NAME, numberLength)
  return {
    rawData,
    headerMapping,
  }
}

const _parseCommonPoolData = (rawData, versionId) => {

  return _.map(rawData, (data) => {
    return {
      id: UUID(),
      version_id: versionId,
      partnumber: data['PartNumber'],
    }
  })

}

class EebomService {
  async uploadAvl(avlExcel, avlInfo) {
    let client = await new tsystemDB()
    try {
      let newAvlId = UUID()

      // sprint25: 要記錄版本
      // avl version
      let avlPreVersion = await eebomModel.getAvlVersion()
      let avlVersionInfo = _parseAvlVersion(newAvlId, avlInfo, avlPreVersion.version)
      logger.info('get avl version for upload', avlVersionInfo, 'and remove pre-version', avlPreVersion.id)
      await eebomModel.cleanAvlVersion(client, avlPreVersion.id)
      await eebomModel.uploadAvlVersion(client, avlVersionInfo)

      // avl data
      logger.info('parse avl data from excel')
      let avlData = await _parseAvlFromExcel(avlExcel)
      let avlDataSet = _parseAvlData(avlData, newAvlId)

      // 舊版的資料，不需要留下來
      logger.info('cleanAvl data!!')
      await eebomModel.cleanAvl(client)
      // 資料過多時 會超過 squel 參數的限制, 須將data切分insert
      let chunkUpsertArray = chunkArray(avlDataSet, SPLIT_INSERT_LENGTH)
      await asyncForEach(chunkUpsertArray, async (subArr, idx) => {
        await eebomModel.uploadAvl(client, subArr)
      })

      await client.commit()

      // 存下檔案, 刪除舊的檔案
      if (avlPreVersion.filename){
        logger.info('remove pre-file', avlPreVersion.filename)
        await _removeAvlExcel(avlPreVersion.filename)
      }

      await _saveAvlExcel(avlExcel)

      return {
        id : newAvlId,
      }
    } catch (error) {
      await client.rollback()
      throw new Error(`${ERROR_HEADER}[uploadAvl] upload faied : ${error}`)
    }
  }

  // async confirmAvl(avlExcel){
  //   try {
  //     let avlId = UUID()
  //     let avlData = await _parseAvlFromExcel(avlExcel)

  //     const checkAvlDataResult = _checkAvlData(avlData)
  //     if(checkAvlDataResult.failCount === 0){
  //       cache.set(avlId, avlData)
  //     }
  //     return {
  //       'avl_id' : (checkAvlDataResult.failCount === 0) ? avlId : null,
  //       'pass_count': checkAvlDataResult.passCount,
  //       'fail_count': checkAvlDataResult.failCount,
  //       'fail_message': checkAvlDataResult.failMessage,
  //     }
  //   } catch (error) {
  //     throw new Error(`${ERROR_HEADER} upload faied : ${JSON.stringify(error, null, 1)}`)
  //   }
  // }

  // async uploadAvl(avlId){
  //   try {
  //     if(!cache.has(avlId)){
  //       throw new Error(`${ERROR_HEADER} no record`)
  //     }
  //     const client = await new tsystemDB()
  //     let avlExcel = cache.take(avlId)
  //     let avlDataSet = _parseAvlData(avlExcel)

  //     await eebomModel.uploadAvl(client, avlDataSet)

  //     await client.commit()
  //     return {
  //       id : avlId,
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async exportAvl(avlId){
    const avlData = await eebomModel.getAvlInfoById(avlId)
    if (avlData) {
      const fileName = avlData.filename
      return {
        fileName: fileName,
        excelPath: AVL_EXCEL_FOLDER_PATH,
      }
    } else {
      return null
    }

    // await new Excel(_getAvlExcelPath(fileName), AVL_EXCEL_YAML_PATH, exportData, AVL_EXCEL_FOLDER_PATH)
  }

  async getAvlList(){
    const result = await eebomModel.getAvlList()
    return {
      avl_list: result,
    }
  }
  async getCommonPoolInfo() {
    let connector_version_info = await eebomModel.getConnectorList()
    let connector_id_tmp = UUID()
    let common_pool_list = [
      {
        common_pool_id: 1,
        file_name: 'EE_Common_Part_List',
        update_by: '-',
        update_time: '-',
        version: '-',
      },
    ]
    if(connector_version_info.length > 0) {
      connector_version_info[0].file_name = 'Connector_Common_Pool_List'
      common_pool_list.push(connector_version_info[0])
    } else {
      let connector_version_tmp = {
        common_pool_id: connector_id_tmp,
        file_name: 'Connector_Common_Pool_List',
        update_by: '-',
        update_time: '-',
        version: '-',
      }
      common_pool_list.push(connector_version_tmp)
    }
    return {
      common_pool_list,
    }
  }
  async getCommonPoolList(){
    const result = await eebomModel.getCommonPoolList()
    return {
      common_pool_list: result,
    }
  }

  async uploadConnectorCommonPool(connectorExcel, connectorCommonPoolInfo) {
    let client = await new tsystemDB()
    try {
      let newConnectorId = UUID()

      // sprint31: 要記錄版本
      // connector common pool version
      let connectorPreVersion = await eebomModel.getConnectorVersion()
      let connectorVersionInfo = _parseConnectorCommonPoolVersion(newConnectorId, connectorCommonPoolInfo, connectorPreVersion.version)

      // get common pool data
      logger.info('parse common pool data from excel')
      let excelData = await _parseCommonPoolFromExcel(connectorExcel)
      let dataSet = _parseCommonPoolData(excelData.rawData, newConnectorId)

      if (dataSet.length > 0) {
        logger.info('get connector common pool version for upload', connectorVersionInfo, 'and remove pre-version', connectorPreVersion.id)
        await eebomModel.cleanConnectorVersion(client, connectorPreVersion.id)
        await eebomModel.uploadConnectorVersion(client, connectorVersionInfo)

        // 舊版的資料，不需要留下來
        logger.info('cleanCommonPart data!!', connectorPreVersion.id)
        await eebomModel.cleanCommonPart(client, connectorPreVersion.id)

        // 資料過多時 會超過 squel 參數的限制, 須將data切分insert
        let chunkUpsertArray = chunkArray(dataSet, SPLIT_INSERT_LENGTH)
        await asyncForEach(chunkUpsertArray, async (subArr, idx) => {
          await eebomModel.uploadCommonPart(client, subArr)
        })

        await client.commit()
        // 存下檔案, 刪除舊的檔案
        if (connectorPreVersion.filename){
          logger.info('remove pre-file', connectorPreVersion.filename)
          await _removeConnectorExcel(connectorPreVersion.filename)
        }

        await _saveConnectorExcel(connectorExcel)
        return {
          id : newConnectorId,
        }
      }

    } catch (error) {
      await client.rollback()
      throw new Error(`${ERROR_HEADER}[CommonPool] upload faied : ${error}`)
    }
  }

  async exportCommonPool(sheetData, commonData) {
    const excelFolderPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}`)
    const excelPath = path.resolve(__dirname, `../../utils/excel/${commonData.excelFolder}/${commonData.filePath}.xlsx`)
    let excelYmlPath = path.join('database-common-pool', 'excel-common-pool.yaml')
    let result = sheetData.commonPoolList.common_pool_list
    result.map(i => {
      i.create_time = moment(i.create_time).format('YYYY-MM-DD hh:mm:ss')
      i.update_time = moment(i.update_time).format('YYYY-MM-DD hh:mm:ss')
    })
    let rawData = {
      commonPoolList: result,
    }
    let excel = await new Excel(excelPath, excelYmlPath, rawData, excelFolderPath)
    console.log(`get the excel path: ${await excel.execute()}`)
  }

  async exportConnector(commonId){
    const commonData = await eebomModel.getConnectorInfoById(commonId)
    if (commonData) {
      const fileName = commonData.filename
      return {
        fileName: fileName,
        excelPath: CONNECTOR_EXCEL_FOLDER_PATH,
      }
    } else {
      return null
    }
  }

  async getTemporaryFileList(){
    const result = await eebomModel.getTemporaryFileList()
    return {
      temporary_list: result,
    }
  }

  async uploadTemporary(temporaryExcel, temporaryInfo) {
    let client = await new tsystemDB()
    try {
      let newTemporaryId = UUID()

      // sprint25: 要記錄版本
      // avl version
      let temporaryVersiomInfo = _parseTemporaryVersion(newTemporaryId, temporaryInfo)
      logger.info('get temporary version for upload', temporaryVersiomInfo)
      await eebomModel.uploadTemporaryVersion(client, temporaryVersiomInfo)

      

      // 舊版的資料，不需要留下來
      logger.info('cleanAvl data!!')

      await client.commit()

      await _saveTemporaryExcel(temporaryExcel)

      return {
        id : newTemporaryId,
      }
    } catch (error) {
      await client.rollback()
      throw new Error(`${ERROR_HEADER}[uploadTemporary] upload faied : ${error}`)
    }
  }

  async exportTemporary(temporaryId){
    const temporaryData = await eebomModel.getTemporaryInfoById(temporaryId)
    if (temporaryData) {
      const fileName = temporaryData.filename
      return {
        fileName: fileName,
        excelPath: TEMPORARY_EXCEL_FOLDER_PATH,
      }
    } else {
      return null
    }
  }

  async removeTemporary(temporaryId) {
    let client = await new tsystemDB()
    try {
      let temporaryPreVersion = await eebomModel.getTemporaryInfoById(temporaryId)
      await eebomModel.cleanTemporaryVersion(client, temporaryId)
      await client.commit()
      await _removeTemporaryExcel(temporaryPreVersion.filename)


      return 'ok'
    } catch (error) {
      await client.rollback()
      throw new Error(`${ERROR_HEADER}[uploadAvl] upload faied : ${error}`)
    }
  }
  
}

module.exports = EebomService
