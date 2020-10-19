const diecutService = require('../../service/database/diecut.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const fileUtils = require('../../utils/importExcel/fileUtils.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Diecut')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const moment = require('moment')
const _ = require('lodash')
const koaSend = require('koa-send')

class Diecut{
  async getMaterialSizeAdderPrice(ctx) {
    try {
      let result = await diecutService.fetchMaterialSizeAdderPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut getMaterialSizeAdderPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putMaterialSizeAdderPrice(ctx) {
    try {
      let { nextId, materialSizeAdderPrice } = ctx.request.body
      let result = await diecutService.modifyMaterialSizeAdderPrice(nextId, materialSizeAdderPrice)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut modifyMaterialSizeAdderPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getTypePrice(ctx) {
    try {
      let result = await diecutService.fetchTypePrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut fetchTypePrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putTypePrice(ctx) {
    try {
      let { nextId, typePrice } = ctx.request.body
      const result = await diecutService.modifyTypePrice(nextId, typePrice)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Diecut modifyTypePrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async getAreaTimesPrice(ctx) {
    try {
      let result = await diecutService.fetchAreaTimesPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut fetchAreaTimesPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putAreaTimesPrice(ctx) {
    try {
      let { nextId, areaTimesPrice } = ctx.request.body
      const result = await diecutService.modifyAreaTimesPrice(nextId, areaTimesPrice)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Diecut modifyAreaTimesPrice function', err)
    }
  }
  async getReleasePaperPrice(ctx){
    try {
      let result = await diecutService.fetchReleasePaperPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut getReleasePaperPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Die Cut Material Price --
  async getDiecutMaterialPrice(ctx) {

    try {

      const result = await diecutService.fetchDiecutMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Diecut getDiecutMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putMaterialSpec(ctx) {
    try {
      let { items } = ctx.request.body
      let result = await diecutService.modifyMaterialSpec(items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut putMaterialSpec function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
  async getDiecutPartCategory(ctx) {
    try {
      let result = await diecutService.fetchDiecutPartCategory()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut getDiecutPartCategory function', err)
      throwApiError(err.message, err.status)
    }
  }
  async postDiecutMaterialSpec(ctx) {
    let { partCategory2Id, materialSpec, remark = null } = ctx.request.body
    if(!partCategory2Id || !materialSpec || materialSpec == '') {
      throwApiError('not found request data', errorCode.NOT_FOUND)
    }

    let client = await new tsystemDB()
    try {
      const result = await diecutService.postDiecutMaterialSpec(client, partCategory2Id, materialSpec, remark)
      await client.commit()

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      await client.rollback()
      logger.warn('error request for Database Diecut postDiecutMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }
  async archiveDiecutMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await diecutService.archiveDiecutMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut archiveDiecutMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }
  async unblockDiecutMaterialSpec(ctx) {
    try {
      let { materialSpecId } = ctx.request.body
      await diecutService.unblockDiecutMaterialSpec(materialSpecId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut unblockDiecutMaterialSpec function', err)
      throwApiError(err.message, err.status)
    }
  }
  async postDiecutMaterial(ctx) {
    let { materialSpecId, material, value = 0 } = ctx.request.body
    if(!materialSpecId || !material || material == '') {
      throwApiError('not found request data', errorCode.NOT_FOUND)
    }

    let client = await new tsystemDB()
    try {
      const result = await diecutService.postDiecutMaterial(client, materialSpecId, material, value)

      await client.commit()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      await client.rollback()
      logger.warn('error request for Database Diecut postDiecutMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }
  async archiveDiecutMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await diecutService.archiveDiecutMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut archiveDiecutMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }
  async unblockDiecutMaterial(ctx) {
    try {
      let { materialSpecId, materialId } = ctx.request.body
      await diecutService.unblockDiecutMaterial(materialSpecId, materialId)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut unblockDiecutMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }
  async readMaterialPriceAndCheck(ctx) {
    try {
      let maxSize = 31457280 // 30MB

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

      let fileName = ctx.request.files.file.name
      logger.info('start to fetch data from ', fileName)

      const sheetContrast = {
        'Mylar': 'Mylar_of_Mylar_Sponge_Poron',
        'Sponge': 'Sponge_of_Mylar_Sponge_Poron',
        'Protection Film': 'Protection_Film_of_Mylar_Sponge_Poron',
        'Adhesive': 'Adhesive_of_Mylar_Sponge_Poron',
        '醋酸膠布': 'Acetate_Tape_of_Mylar_Sponge_Poron',
        'Absorber': 'Absorber',
        'Al_Cu_Foil': 'Al_Cu_Foil',
        '不織布': 'Non_Woven_of_Mylar_Sponge_Poron',
      }
      let sheetList = Object.keys(sheetContrast)
      let rawData = await diecutService.prepareDataFromExcel(ctx.request.files.file, sheetList)

      if(Object.keys(rawData).length <= 0){
        throwApiError('X000201', errorCode.ERRORFORMAT)
        return
      } else {
        let sortData = await diecutService.sortOutData(rawData, sheetContrast)

        await diecutService.confirmSheetContrast(sortData, sheetContrast)
        let res = await diecutService.confirmData(sortData)

        ctx.body = {
          uploadId: res.failCount <= 0 ? res.uploadId : null,
          passCount: sortData.length - res.failCount,
          failCount: res.failCount,
          failMessage: res.failMessage,
        }

        ctx.status = 200
      }
    } catch (err) {
      logger.warn('error request for upload die cut material price', err)
      throwApiError(err.message, err.status)
    }
  }

  async uploadMaterialPrice(ctx) {
    try {
      let { uploadId } = ctx.request.body
      if(!uploadId){
        throw new Error('F000206')
      }
      let sortData = await diecutService.getInsertData(uploadId)
      await diecutService.insertMaterialPrice(sortData)
      await diecutService.updateMaterialPrice(sortData)
      await diecutService.deleteUploadData(uploadId)

      ctx.body = 'ok'
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for upload die cut material price', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Die Cut Material Price --
  async getDiecutParameter(ctx) {
    try {
      let result = await diecutService.fetchDiecutParameter()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut getDiecutParameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putReleasePaperPrice(ctx){
    try {
      let { nextId, releasePaperPrice } = ctx.request.body
      let result = await diecutService.modifyPutReleasePaperPrice(nextId, releasePaperPrice)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut putReleasePaperPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async exportDiecutMaterialPrice(ctx) {

    try {
      let filePath
      let resultPath
      let response
      const resultFileDate = moment(new Date()).format('YYYYMMDD')
      let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
      const excelFolder = `Die_Cut_Material_Price_${timeStamp}`
      filePath = `Die_Cut_Material_Price_${resultFileDate}`
      resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`


      const dieCutInitData = await diecutService.fetchDiecutMaterialPrice()

      let sheetData = {
        dieCutInitData,
      }
      let commonData = {
        filePath,
        excelFolder,
      }
      response = await diecutService.exportDiecutMaterialPrice(sheetData, commonData)
      if(_.isNull(response)) {
        return throwApiError('no record.', errorCode.DATANOTFOUND)
      }
      ctx.body = response
      // 中文需要前端 使用 decodeURIComponent 轉換
      ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(filePath)}"`)
      ctx.status = 200
      await koaSend(ctx, resultPath)

    } catch (err) {
      logger.warn('error request for Export Database Diecut exportDiecutMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = Diecut
