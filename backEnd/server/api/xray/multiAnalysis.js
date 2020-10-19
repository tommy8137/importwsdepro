const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const fileUtils = require('../../utils/importExcel/fileUtils.js')
const xrayService = require('../../service/xray/xray.js')
const multiAnalysisService = require('../../service/xray/multiAnalysis.js')
const send = require('koa-send')
const moment = require('moment')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('multiPNCtrller')

const generateSummaryExport = async (exportData, type) => {

  // use SPA分析結果 Excel
  let spaFileDate = moment(new Date()).format('YYYYMMDD')
  let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
  let fileName = `Eprocurement_XRay_SPA_Summary_${type}_${spaFileDate}`
  let folderPath = `Eprocurement_XRay_SPA_Summary_${type}_${timeStamp}`
  let spaPath = `/server/utils/excel/${folderPath}/${fileName}.xlsx`
  let result = await xrayService.spaSummaryExport(exportData, fileName, folderPath)

  return {
    result,
    spaPath,
  }
}
class multiAnalysis {

  async readFileAndCheck(ctx) {
    try {
      let maxSize = 31457280 //30MB
      // let { userID } = ctx.request.user
      // let req = ctx.request.body
      let { type } = ctx.query

      if (!ctx.request.files) {
        throwApiError('FILE NOT FOUND', errorCode.ERRORFORMAT)
        // apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      if(ctx.request.files.file && ctx.request.files.file.size > maxSize){
        console.log('FILE SIZE', ctx.request.files.file.size)
        throwApiError('FILE SIZE', errorCode.ERRORFORMAT)
        // apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }
      let fileUtil = new fileUtils()
      let fileName = ctx.request.files.file.name
      logger.info('start to fetch data from ', fileName)
      const numberLength = 5
      let { rawData, headerMapping } = await fileUtil.prepareData(ctx.request.files.file, 'ItemList', numberLength)

      if(rawData.length <= 0){
        throwApiError('X000201', errorCode.ERRORFORMAT)
        return
      } else {
        let sortData = await multiAnalysisService.sortOutData(rawData, headerMapping, fileName)

        logger.info('start to confirm data column')
        let confirmRes = null
        if(type && type.toLowerCase() == 'bom') {
          confirmRes = await multiAnalysisService.confirmBomData(sortData)
        } else {
          confirmRes = await multiAnalysisService.confirmSourcerData(sortData)
        }
        let failLength = confirmRes.failRes.length

        // sort data, insert to db
        if(confirmRes.successRes.length > 0) {
          // tmpId = await multiAnalysisService.insertTmpData(confirmRes.successRes)

          let tmpId = await multiAnalysisService.insertTmpData(sortData)
          ctx.body = {
            uploadId: tmpId,
            passCount: sortData.length - failLength,
            failCount: failLength,
            failMessage: confirmRes.failMessage,
          }
          ctx.status = 200
        } else {
          throwApiError('X000201', errorCode.ERRORFORMAT)
          return
        }
      }

    } catch (err) {
      logger.warn('error request for Multiple Reference P/N Search', err)
      throwApiError(err.message, err.status)
    }
  }

  async deleteTempImportData(ctx){
    let { uploadId } = ctx.request.query

    try {
      if (!uploadId) {
        throwApiError('upload id NOT FOUND', errorCode.ERRORFORMAT)
      }
      let res = await multiAnalysisService.deleteTmpDataByID(uploadId)
      ctx.body = { uploadId: res }
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for cancal import', err)
      throwApiError('error request for cancal import', errorCode.BAD_REQUEST)
    }
  }

  async analysisSourcerMultiPN(ctx) {
    try {
      let req = ctx.request.body
      let { mrp, obs, exp, uploadId, cmp } = req

      // get data from db by id
      let { rawData, importFile } = await multiAnalysisService.fetchImportDataByID(uploadId)
      let res = {
        importFile,
        importDate: moment().format('YYYYMMDD hh:mm'),
        unit: 'USD',
      }

      let exportData = {}
      if (rawData.length > 0) {
        let analysisRes = await multiAnalysisService.multiAnalysis(rawData, mrp, obs, exp, cmp)
        exportData = Object.assign(res, analysisRes)
        // success remove tmp data
        // await multiAnalysisService.deleteTmpDataByID(uploadId)
      } else {
        throwApiError('X000201', errorCode.ERRORFORMAT)
      }

      let { result, spaPath } = await generateSummaryExport(exportData, 'Sourcer_Cost')
      if(result == false) {
        ctx.body = { message: 'no record' }
        ctx.status = 401
      } else {
        ctx.attachment(spaPath)
        ctx.body = result
        ctx.status = 200
        await send(ctx, spaPath)
      }
    } catch (err) {
      logger.warn('error request for Sourcer Multiple Reference P/N Search', err)
      throwApiError(err.message, err.status)
    }
  }

  async downloadTemplate(ctx) {
    try {

      const resultPath = '/server/utils/template/SPA_Multiple_PN_Search_Template.xlsx'
      ctx.attachment(resultPath)
      ctx.body = 'download successs'
      ctx.status = 200

      await send(ctx, resultPath)
    } catch (err) {
      throwApiError(err, errorCode.DATANOTFOUND)
      return
    }
  }

  async downloadBomTemplate(ctx) {
    try {

      const resultPath = '/server/utils/template/SPA_BOMAnalysis_Template.xlsx'
      ctx.attachment(resultPath)
      ctx.body = 'download successs'
      ctx.status = 200

      await send(ctx, resultPath)
    } catch (err) {
      throwApiError(err, errorCode.DATANOTFOUND)
      return
    }
  }

  async analysisBomMultiPN(ctx) {
    try {
      let req = ctx.request.body
      let { mrp, obs, exp, uploadId, cmp, purchaseOrg } = req

      // get data from db by id
      let { rawData, importFile } = await multiAnalysisService.fetchImportDataByID(uploadId)
      let res = {
        importFile,
        importDate: moment().format('YYYYMMDD hh:mm'),
        unit: 'USD',
      }

      let exportData = {}
      if (rawData.length > 0) {

        let initData = await multiAnalysisService.getInitDataInfoAndPrice(rawData, purchaseOrg)
        let analysisRes = await multiAnalysisService.multiBomAnalysis(initData, mrp, obs, exp, cmp)
        exportData = Object.assign(res, analysisRes)
        // ctx.body = exportData
        // ctx.status = 200
      } else {
        throwApiError('X000201', errorCode.ERRORFORMAT)
      }

      let { result, spaPath } = await generateSummaryExport(exportData, 'BOM')
      if(result == false) {
        ctx.body = { message: 'no record' }
        ctx.status = 401
      } else {
        ctx.attachment(spaPath)
        ctx.body = result
        ctx.status = 200
        await send(ctx, spaPath)
      }
    } catch (err) {
      logger.warn('error request for BOM Multiple Reference P/N Search', err)
      throwApiError(err.message, err.status)
    }
  }

  async analysisCmpMultiPN(ctx) {
    try {
      let req = ctx.request.body
      let { mrp, obs, exp, cmp } = req

      let res = {
        importFile: '',
        importDate: moment().format('YYYYMMDD hh:mm'),
        unit: 'USD',
      }

      let exportData = {}
      // let purchaseOrg = await multiAnalysisService.getPurchaseOrgList()
      let rawData = await multiAnalysisService.getCmpPartnumbers()

      if (rawData.length > 0) {
        let initData = await multiAnalysisService.getInitDataInfoAndPrice(rawData)
        // ctx.body = initData
        let analysisRes = await multiAnalysisService.multiBomAnalysis(initData, mrp, obs, exp, cmp)
        exportData = Object.assign(res, analysisRes)
        // ctx.body = exportData
        // ctx.status = 200
      } else {
        throwApiError('X000201', errorCode.ERRORFORMAT)
      }

      let { result, spaPath } = await generateSummaryExport(exportData, 'CMP')
      if(result == false) {
        ctx.body = { message: 'no record' }
        ctx.status = 401
      } else {
        ctx.attachment(spaPath)
        ctx.body = result
        ctx.status = 200
        await send(ctx, spaPath)
      }
    } catch (err) {
      logger.warn('error request for CMP Multiple Reference P/N Search', err)
      throwApiError(err.message, err.status)
    }
  }

  async getPurchaseOrg(ctx) {
    try {
      const result  = await multiAnalysisService.getPurchaseOrgList()
      ctx.body = result
      ctx.status = 200
    } catch(err) {
      logger.warn('error getPurchaseOrg', err)
      throwApiError(err.message, err.status)
    }
  }

}

module.exports = multiAnalysis
