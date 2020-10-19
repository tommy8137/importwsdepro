const costgenService = require('../../service/cleanSheet/costgen.js')
const bomItemService = require('../../service/bom/bomItem.js')
const { throwApiError, errorCode, apiErrorRes } = require('../../helpers/errorCode/apiErrorHelper.js')
const send = require('koa-send')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const JsZip = require('jszip')
const moment = require('moment')
const { formatDate } = require('../../helpers/query/processString.js')
const fileNameMapping = require('../../utils/cleansheetExport/fileNameMapping.js')
const  delDir = require('../../helpers/clean/deleteDir.js')
const dfutils = require('../../utils/dataFrame/utils')
const exportSettings = require('../../utils/cleansheetExport/index.js')

class Costgen {
  constructor() {
  }

  async getDatabase(ctx){
    const { query } = ctx
    let result = await costgenService.getData(query)
    ctx.body = result
    ctx.status = 200
  }

  async exportDatabase(ctx) {
    const query = ctx.params
    if (!query.type || !query.name) {
      throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
      return
    }
    let result = await costgenService.getData(query)
    const excelRes = await costgenService.exportTableData(query.type, query.name, result)

    if(!excelRes) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
      return
    } else {
      const fileDate = formatDate(new Date())
      const baseDataPath = `/server/utils/excel/${query.type}_${query.name}_${fileDate}.xlsx`
      ctx.attachment(baseDataPath)
      ctx.body = excelRes
      ctx.status = 200
      await send(ctx, baseDataPath)
    }
  }

  async uploadData(ctx) {
    const query = { ...ctx.params, user: ctx.request.user.userID }
    if(!ctx.request.files.file){
      throwApiError('Please attachment file.', errorCode.METHOD_WRONG)
      return
    }
    const res = await costgenService.uploadBaseData(ctx.request.files.file, query)
    if(!res.Res){
      throwApiError(res.Msg)
    }else{
      ctx.status = 200
    }
  }

  async getResult(ctx) {
    const resultFileDate = moment(new Date()).format('YYYYMMDD')
    const result = await costgenService.getResult(ctx.request.body)
    if(result == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    } else {
      const resultPath = `/server/utils/excel/Cost_Result_${resultFileDate}.xlsx`
      ctx.attachment(resultPath)
      ctx.body = result
      ctx.status = 200
      await send(ctx, resultPath)
    }
  }

  async getTables(ctx) {
    const { query } = ctx
    const basedata  = await costgenService.getTables(query)
    ctx.body = basedata
    ctx.status = 200
  }

  async getTypes(ctx) {
    const basedata  = await costgenService.getTypes()
    ctx.body = basedata
    ctx.status = 200
  }

  async postHeaderAndData(ctx) {
    const query = { ...ctx.params, user: ctx.request.user.userID }
    const result = await costgenService.addHeaderAndData(ctx.request.body, query)
    if(!result.Res){
      throwApiError(result.Msg, errorCode.updateFailed)
      return
    }
    ctx.status = 200
  }

  async exportMeCleanSheet(ctx) {
    try {
      const { bomId, versionId, partlistFormat } = ctx.query
      if (typeof bomId == 'undefined' || typeof versionId == 'undefined' || typeof partlistFormat == 'undefined') {
        throwApiError('bomId or versionId or partlistFormat required', errorCode.ERRORFORMAT)
      }
      let type = partlistFormat.split(',')
      const userID = ctx.request.user.userID
      const fileName = fileNameMapping[type[0]] ? fileNameMapping[type[0]].name : ''
      const resultFileDate = moment(new Date()).format('YYYYMMDD_HHmm')
      const timeStamp = moment().locale('zh-tw').format('YYYY_MM_DD_hhmmss')
      let excelFolder = `Eprocurement_CleanSheet_ME_${timeStamp}`
      let exportData = await bomItemService.getPartlistExportData(bomId, type, versionId)
      let filePath = `ME_${exportData.projectInfo.projectName.replace(/(?:\\[rn]|[*]|[/]+)+/g, '_')}_${exportData.projectInfo.stage}_${resultFileDate}`
      let resultPath = `/server/utils/excel/${excelFolder}/${filePath}.xlsx`
      let result = await costgenService.exportMeCleanSheet(bomId, userID, type, exportData, filePath, excelFolder, fileName)

      if(result == false) {
        throwApiError('no record.', errorCode.DATANOTFOUND)
      } else {
        // ctx.attachment(filePath + '.xlsx')
        ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(filePath)}.xlsx"`)
        ctx.body = result
        ctx.status = 200
        await send(ctx, resultPath)
        // await delDir(filePath)
      }
    }catch(e) {
      throwApiError(e)
      return
    }
  }


  async exportMeQuotation(ctx) {
    try {
      const { bomId, versionId, partlistFormat } = ctx.query
      if (typeof bomId == 'undefined' || typeof versionId == 'undefined' || typeof partlistFormat == 'undefined') {
        throwApiError('bomId or versionId or partlistFormat required', errorCode.ERRORFORMAT)
      }
      let typeList = partlistFormat.split(',')
      const userID = ctx.request.user.userID
      // 暫存資料夾名稱
      const timeStamp = moment().locale('zh-tw').format('YYYY_MM_DD_hhmmss')
      let tmpFolderName = `Eprocurement_Quotation_ME_${timeStamp}`
      // 暫存資料夾完整位址 (Server)
      const excelBasePath = `/server/utils/excel/${tmpFolderName}`

      // 不同part category 2 或超過100個sheet要拆檔案並壓縮
      let chunkList = []
      for (let index = 0; index < typeList.length; index++) {
        let exportData = await bomItemService.getQuotationExportData(bomId, [typeList[index]], versionId)
        // 一個xlsx裡放幾個sheet
        const chunkBase = 100
        const type = typeList[index]
        // 計算這坨資料會被切成幾個excel
        const listCount = Math.ceil(exportData.length / chunkBase)
        const sheets = _.chunk(exportData, chunkBase).map((subList, listIndex) => ({ type, subList, listIndex, listCount }))
        chunkList = [
          ...chunkList,
          ...sheets,
        ]
      }

      // 檔案名稱依據不同sheet數量而不同
      let outputFileName
      if (chunkList.length > 1) {
        outputFileName = await genZip(chunkList, {  bomId, userID, tmpFolderName }, excelBasePath)
      } else if (chunkList.length === 1) {
        outputFileName = await genSingleExcel(chunkList[0], {  bomId, userID, tmpFolderName })
      } else {
        throwApiError('no record.', errorCode.DATANOTFOUND)
      }

      ctx.attachment(`${excelBasePath}/${outputFileName}`)
      ctx.set('content-disposition', `attachment; filename="${encodeURIComponent(outputFileName)}"`)
      ctx.body = 'ok'
      // ctx.body = result
      ctx.status = 200
      await send(ctx, `${excelBasePath}/${outputFileName}`)
      // await delDir(path.resolve(__dirname, `../../../${excelBasePath}`))
    }catch(e) {
      console.log('>>>>>>>>>>>>>>>>>>e.message', e.message)
      apiErrorRes(ctx, e.message, e.status, null)
      return
    }
  }


  async getPartlistSetting(ctx) {
    try {
     console.log(exportSettings)
     ctx.body = exportSettings
     ctx.status = 200
    }catch(e) {
      console.log(e)
      throwApiError(e)
      return
    }
  }
  async getKeyPath(ctx) {
    let { bomId, versionId, partlistId, searchKey, returnKey, needData } = ctx.query
    try {
      if (typeof bomId == 'undefined' ||
          typeof partlistId == 'undefined' ||
          typeof searchKey == 'undefined') {
        throwApiError('bomId or partlistId or searchKey are required', errorCode.ERRORFORMAT)
      }
     versionId = versionId || 'CURRENT'
     returnKey = returnKey || 'byKey'
     needData = (needData === undefined || needData.toLowerCase() === 'true') ? true : false
     let res = await costgenService.queryKeyPath(bomId, partlistId, versionId, searchKey, returnKey, needData)
     ctx.body = res
     ctx.status = 200
    }catch(e) {
      console.log(e)
      throwApiError(e)
      return
    }
  }


}
/**
 * 產生zip檔，回傳建立的檔案名稱
 * @param {*} datas [xlsx content, xlsx content ...]
 * @param {*} bomInfo { bomId, userID, tmpFolderName }
 * @param {*} xlsxFolderPath /server/utils/excel/${tmpFolderName}
 */
async function genZip(datas, bomInfo, xlsxFolderPath) {
  try {
    const { bomId, userID, tmpFolderName } = bomInfo

    const zip = new JsZip()
    const resultFileDate = moment(new Date()).format('YYYYMMDD_HHmm')
    let baseOutputName = `ME_${datas[0].subList[0].projectInfo.projectName.replace(/(?:\\[rn]|[*]|[/]+)+/g, '_')}_${datas[0].subList[0].projectInfo.stage}_${resultFileDate}`

    // 將分好組的excel內容產出來
    for (let index = 0; index < datas.length; index++) {
      const { subList: xlsxData, type, listIndex, listCount } = datas[index]
      const partlistName = fileNameMapping[type]
      const type2 = partlistName.name.split('_')[1]
      // Excel檔案命名規則: ME_ProjectName_Stage_yyyymmdd_hhmm_typ2_NO
      let xlsxName = listCount > 1 ? `${baseOutputName}_${type2}_${listIndex + 1}` : `${baseOutputName}_${type2}`
      // 產出的Excel檔案完整路徑 (Server)
      const xlsxPath = `${xlsxFolderPath}/${xlsxName}.xlsx`
      // 產出excel檔案
      const result = await costgenService.exportQuotationByNewModule(bomId, userID, type, xlsxData, xlsxName, tmpFolderName, partlistName)

      if(result == false) {
        // throwApiError('no record.', errorCode.DATANOTFOUND)
        // 沒資料就繼續跑下一個
      } else {
        // 將產出來的xlsx讀到zip裡
        zip.file(`${xlsxName}.xlsx`, fs.readFileSync(path.resolve(__dirname, `../../../${xlsxPath}`)))
      }
    }

    // Generate zip file content
    const zipContent = await zip.generateAsync({
      type: 'nodebuffer',
      comment: 'ser-web-manangement',
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    })

    // Create zip file
    fs.writeFileSync(path.resolve(__dirname, `../../../${xlsxFolderPath}/${baseOutputName}.zip`), zipContent)

    return `${baseOutputName}.zip`
  } catch (error) {
    console.log(error)
    throwApiError('genZip failure.', errorCode.ERRORFORMAT)
  }
}

 /**
  * 產生單獨的excel檔，回傳建立的檔案名稱
  * @param {*} data xlsx content
  * @param {*} bomInfo { bomId, userID, tmpFolderName }
  */
async function genSingleExcel(data, bomInfo) {
  try {
    const { bomId, userID, tmpFolderName } = bomInfo

    const resultFileDate = moment(new Date()).format('YYYYMMDD_HHmm')
    let baseOutputName = null
    const { subList: xlsxData, type } = data
    const partlistName = fileNameMapping[type]

    // Excel檔案命名規則: ME_ProjectName_Stage_yyyymmdd_hhmm_type2
    baseOutputName = `ME_${xlsxData[0].projectInfo.projectName.replace(/(?:\\[rn]|[*]|[/]+)+/g, '_')}_${xlsxData[0].projectInfo.stage}_${resultFileDate}_${partlistName.name.split('_')[1]}`
    // 產出excel檔案
    const result = await costgenService.exportQuotationByNewModule(bomId, userID, type, xlsxData, baseOutputName, tmpFolderName, partlistName)

    if(result == false) {
      throwApiError('no record.', errorCode.DATANOTFOUND)
    }
    return `${baseOutputName}.xlsx`
  } catch (error) {
    console.log(error)
    throwApiError('genSingleExcel failure.', errorCode.ERRORFORMAT)
  }
}
module.exports = Costgen
