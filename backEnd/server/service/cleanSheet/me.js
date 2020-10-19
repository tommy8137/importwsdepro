const meModel = require('../../model/cleanSheet/me.js')
const XlsxPopulate = require('xlsx-populate')
const path = require('path')
const send = require('koa-send')
const moment = require('moment')

const replaceMeKey = (str) =>{
  str = str.toLowerCase()
  str = str.replace('bg', 'bgkey')
  str = str.replace('lastSubmitBy', 'submitby')
  str = str.replace('confirmedBy', 'confirmby')
  str = str.replace('bomFileDate', 'filedate')
  return str
}

class Me {

  static async getMeprojectList(pages, items, orderBy, key, keyword){
    const offset = (pages - 1) * items
    if(typeof orderBy == 'undefined') orderBy = 'projectname'
    if (typeof key == 'undefined' || typeof keyword == 'undefined' || key.trim() == '' || keyword.trim() == '') {
      key = 'none'
      keyword = 'none'
    }
    orderBy = replaceMeKey(orderBy)
    key = replaceMeKey(key)
    let result  = await meModel.getMeprojectList(items, offset, orderBy, key, keyword)
    const amount  = await meModel.getMeprojectAmount(key, keyword)
    let response = { numberOfProjects: amount, projectList:[] }
    for(let i = 0 ; i < result.length ; i++) {
      let tmp =  {
        projectCode : result[i].projectcode,
        projectName: result[i].projectname,
        product: result[i].product,
        bg: result[i].bgkey,
        stage: result[i].stage,
        stageName: result[i].stagename,
        sourcerCost: parseFloat(result[i].sourcercost),
        systemCost: parseFloat(result[i].systemcost),
        currency: result[i].currency,
        productSpec: result[i].productspec,
        lastSubmitBy: result[i].submitby,
        confirmedBy: result[i].confirmby,
        bomFileDate: result[i].filedate,
      }
      response.projectList.push(tmp)
    }
    return response
  }
  static async getMeBom(ctx, projectCode, projectName, product, bg, stage, stageName, productSpec, site) {
    const date = new Date()

    const bomFileDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    const initBomPath = path.resolve(__dirname, '../../utils/excel')
    await XlsxPopulate.fromFileAsync(initBomPath + '/init.xlsx')
      .then(workbooks => {
        const bomSheet = workbooks.sheet(7)
        bomSheet.cell('D1').value(bg)
        bomSheet.cell('D2').value(projectName)
        bomSheet.cell('D3').value(projectCode)
        bomSheet.cell('D4').value(product)
        bomSheet.cell('D5').value(site)
        bomSheet.cell('D6').value(productSpec)
        bomSheet.cell('D7').value(bomFileDate)
        bomSheet.cell('D8').value('V01')
        bomSheet.cell('D9').value(stage)
        return workbooks.toFileAsync(initBomPath + '/bom.xlsx')
      })
  }

  static async getMeprojectInfo(projectCode){
    const projectInfo =  await meModel.getMeprojectInfo(projectCode)
    let versionInfo = await meModel.getVersionInfo(projectInfo)
    const dashBoardInfo = await meModel.getDashBoardInfo(projectInfo.projectname)
    let stage = 'C0'
    let today = moment().format('YYYY-MM-DD')
    if(moment(dashBoardInfo.projectionc0duedate).format('YYYY-MM-DD') < today) {
      stage = 'C1'
    }
    if (moment(dashBoardInfo.projectionc1duedate).format('YYYY-MM-DD') < today) {
      stage = 'C2'
    }
    if (moment(dashBoardInfo.projectionc2duedate).format('YYYY-MM-DD') < today) {
      stage = 'C3'
    }
    if (moment(dashBoardInfo.projectionc3duedate).format('YYYY-MM-DD') < today) {
      stage = 'C4'
    }
    if (moment(dashBoardInfo.projectionc4duedate).format('YYYY-MM-DD') < today) {
      stage = 'C5'
    }
    if (moment(dashBoardInfo.projectionc5duedate).format('YYYY-MM-DD') < today) {
      stage = 'C6'
    }
    let result = {
      projectCode:projectInfo.projectcode,
      projectName:projectInfo.projectname,
      product:projectInfo.product,
      bg: projectInfo.bgkey,
      productSpec: projectInfo.productspec,
      stageList:[],
    }

    for(let i = 0 ;i < versionInfo.length ; i++) {
      let stage = {}
      stage['stage'] = versionInfo[i].stage
      stage['stageName'] = versionInfo[i].stagename
      stage['currentVersion'] = versionInfo[i].versionnumber
      stage['updateBy'] = projectInfo.createby
      stage['lastUpdateTime'] = versionInfo[i].submittime
      stage['isActive'] = false
      if(versionInfo[i].stage == stage){
        stage['isActive'] = true
      }
      result.stageList.push(stage)
    }
    return result
  }
  static async updateMeBom(key) {
    const filePath = key.path
    const result =  await XlsxPopulate.fromFileAsync(filePath)
      .then(workbooks => {
        let sheet = workbooks.sheet(7)
        let array = []
        let length = sheet.usedRange()._numRows
        let level
        for(let i = 1; i <= length; i++) {
          if(sheet.cell(`K${i + 17}`).value() != null) {
            if(sheet.cell(`G${i + 17}`).value() == null && sheet.cell(`H${i + 17}`).value() == null && sheet.cell(`I${i + 17}`).value() == null) {
              level = sheet.cell(`F${i + 17}`).value()
            } else if(sheet.cell(`F${i + 17}`).value() == null && sheet.cell(`H${i + 17}`).value() == null && sheet.cell(`I${i + 17}`).value() == null) {
              level = sheet.cell(`G${i + 17}`).value()
            } else if(sheet.cell(`F${i + 17}`).value() == null && sheet.cell(`G${i + 17}`).value() == null && sheet.cell(`I${i + 17}`).value() == null) {
              level = sheet.cell(`H${i + 17}`).value()
            } else if(sheet.cell(`F${i + 17}`).value() == null && sheet.cell(`G${i + 17}`).value() == null && sheet.cell(`G${i + 17}`).value() == null) {
              level = sheet.cell(`I${i + 17}`).value()
            }
            array[i] = {
              partLevel: level,
              customerPN: sheet.cell(`B${i + 17}`).value() || '',
              modifiedVersion: sheet.cell(`C${i + 17}`).value() || '',
              partName: sheet.cell(`K${i + 17}`).value() || '',
              qty: sheet.cell(`L${i + 17}`).value() || '',
            }
          }
        }
        let response = {
          projectCode: sheet.cell('D3').value(),
          idCMFFileDate: sheet.cell('D10').value(),
          initator: sheet.cell('D11').value(),
          projectLeader: sheet.cell('D12').value(),
          approveBy: sheet.cell('D13').value(),
          costbomData: array,
        }
        return response
      })
    return result
  }
}
module.exports = Me
