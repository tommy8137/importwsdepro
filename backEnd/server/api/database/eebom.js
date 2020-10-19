const _ = require('lodash')
const koaSend = require('koa-send')

const { errorCode, apiErrorRes, throwApiError } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('DatabaseEebom')
const moment = require('moment')
const validator = require('validator')

const rbacService = require('../../service/admin/rbac.js')
const EebomService = require('../../service/database/eebom.js')
const eebomService = new EebomService()
const FILE_MAX_SIZE = 31457280 // 30MB
const HTTP_OK = 200

class Eebom {
  async postAvlExcel(ctx){
    try {
      // let userID = '10700001'
      let { userID } = ctx.request.user
      if (!ctx.request.files) {
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      let fileName = ctx.request.files.file.name
      let file = ctx.request.files.file

      if(file && file.size > FILE_MAX_SIZE){
        console.log('FILE SIZE', file.size)
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      let avlInfo = {
        filename: fileName,
        update_by: userID,
      }
      let result = await eebomService.uploadAvl(file, avlInfo)

      ctx.body = result
      ctx.status = HTTP_OK
    } catch (err) {
      logger.warn('error request for uploadAvlExcel', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }

  async getAvlList(ctx){
    let result = await eebomService.getAvlList()
    ctx.body = result
    ctx.status = HTTP_OK
  }

  async exportAvl(ctx){
    try {
      let { avl_id } = ctx.params
      const result = await eebomService.exportAvl(avl_id)
      if(_.isNull(result)) {
        return throwApiError('no record.', errorCode.DATANOTFOUND)
      }

      let filePath = `${result.fileName.replace(/(?:\\[rn]|[*]|[/]+)+/g, '_')}`
      let resultPath = `/server/${result.excelPath}/${filePath}`

      // 中文需要前端 使用 decodeURIComponent 轉換
      ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(filePath)}"`)
      ctx.body = null
      ctx.status = HTTP_OK
      await koaSend(ctx, resultPath)

    } catch (err) {
      logger.warn('error request for uploadAvlExcel', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
  async getCommonPoolInfo(ctx) {
    let result = await eebomService.getCommonPoolInfo()
    ctx.body = result
    ctx.status = HTTP_OK
  }

  async postConnectorExcel(ctx) {
    try {
      let { userID } = ctx.request.user
      if(!ctx.request.files) {
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }
      let fileName = ctx.request.files.file.name
      let file = ctx.request.files.file
      let validFileName = new RegExp('Connector_Common_Pool_List')

      if(!validFileName.test(fileName)) {
        console.log('FILE NAME', fileName)
        apiErrorRes(ctx, 'C000402', errorCode.ERRORFORMAT)
        return
      }

      if(file && file.size > FILE_MAX_SIZE) {
        console.log('FILE SIZE', file.size)
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      let connectorCommonPoolInfo = {
        filename: fileName,
        update_by: userID,
      }
      let result = await eebomService.uploadConnectorCommonPool(file, connectorCommonPoolInfo)

      ctx.body = result
      ctx.status = HTTP_OK
    } catch (err) {
      logger.warn('error request for uploadConnectorExcel', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }

  async exportCommonPool(ctx) {
    try {
      let { commonId } = ctx.params
      let filePath
      let resultPath
      let response
      if(!validator.isUUID(commonId)) {
        const resultFileDate = moment(new Date()).format('YYYYMMDD')
        let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
        let commonPoolList = await eebomService.getCommonPoolList()
        const excelFolder = `EE_Common_Part_List_${timeStamp}`
        filePath = `EE_Common_Part_List_${resultFileDate}`
        resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`
        let sheetData = {
          commonPoolList,
        }
        let commonData = {
          filePath,
          excelFolder,
        }
        response = await eebomService.exportCommonPool(sheetData, commonData)
        
      } else {
        response = await eebomService.exportConnector(commonId)
        filePath = response.fileName != null ? response.fileName.indexOf('/') != -1 ? response.fileName.replace(/\//g, '_') : response.fileName : response.fileName
        resultPath = `/server/${response.excelPath}/${filePath}`
      }

      if(_.isNull(response)) {
        return throwApiError('no record.', errorCode.DATANOTFOUND)
      }
      ctx.body = response
      // 中文需要前端 使用 decodeURIComponent 轉換
      ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(filePath)}"`)
      ctx.status = HTTP_OK
      await koaSend(ctx, resultPath)
    
    } catch (err) {
      logger.warn('error request for download common pool', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
  async getTemporaryFileList(ctx){
    let result = await eebomService.getTemporaryFileList()
    ctx.body = result
    ctx.status = HTTP_OK
  }

  async postTemporaryExcel(ctx){
    try {
      // let userID = '10700001'
      let { userID } = ctx.request.user
      if (!ctx.request.files) {
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      let fileName = ctx.request.files.file.name
      let file = ctx.request.files.file

      let temporaryInfo = {
        filename: fileName,
        update_by: userID,
      }
      let result = await eebomService.uploadTemporary(file, temporaryInfo)

      ctx.body = result
      ctx.status = HTTP_OK
    } catch (err) {
      logger.warn('error request for uploadTemporaryExcel', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
  async exportTemporary(ctx){
    try {
      let { temporary_id } = ctx.params
      const result = await eebomService.exportTemporary(temporary_id)
      if(_.isNull(result)) {
        return throwApiError('no record.', errorCode.DATANOTFOUND)
      }

      let filePath = result.fileName != null ? result.fileName.indexOf('/') != -1 ? result.fileName.replace(/\//g, '_') : result.fileName : result.fileName
      let resultPath = `/server/${result.excelPath}/${filePath}`

      // 中文需要前端 使用 decodeURIComponent 轉換
      ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(filePath)}"`)
      ctx.body = null
      ctx.status = HTTP_OK
      await koaSend(ctx, resultPath)

    } catch (err) {
      logger.warn('error request for uploadTemporaryFile', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }

  async removeTemporary(ctx) {
    try {
      let { temporary_id } = ctx.params
      const result = await eebomService.removeTemporary(temporary_id)
      ctx.body = result
      ctx.status = HTTP_OK

    } catch (err) {
      logger.warn('error request for uploadTemporaryFile', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
}

module.exports = Eebom
