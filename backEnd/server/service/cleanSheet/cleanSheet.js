const cleanSheetModel = require('../../model/cleanSheet/cleanSheet.js')
const cleanSheetFormat = require('../../utils/excel/excelFormat.js')
const XlsxPopulate = require('xlsx-populate')
const ProjectModel = require('../../model/cleanSheet/project.js')
const VersionModel = require('../../model/cleanSheet/version.js')
const { Part, PartCleansheet, CleansheetCost } = require('../../model/cleanSheet/part.js')
const { File, FileCostbom } = require('../../model/cleanSheet/file.js')
const moment = require('moment')

class CleanSheet {
  static async cleanSheet(){
    const result  = await cleanSheetModel.getProjects()
    return result
  }
  static async triggerProjectME(data) {
    const { body, user } = data
    const { costbomData } = body

    let version = new VersionModel({
      stage: body.stage,
      versionnumber: body.bomVersion,
      submitby: body.initator,
      submittime: new Date().toISOString(),
      confirmby: body.initator,
      confirmtime: new Date().toISOString(),
      confirmstatus: true,
    })

    let project = new ProjectModel({
      projectcode: body.projectCode,
      projectname: body.projectName,
      product: body.product,
      bgkey: body.bg,
      productspec: body.productSpec,
      createby: user.userID,
      versionid: version.uuid, // assign version id
      profitcenter: 'PCL300', //TODO: Need to assign
      site: body.site,
    })
    
    let parts = costbomData.map((x) => {
      return new Part({
        partlevel: x.partLevel,
        partname: x.partName,
        partnumber: x.customerPN,
      })
    })

    let file = new File({
      versionid: version.uuid, // assign version id
      fileid: null,
      filetype: 'costbom',
      fileversion: 'V01',
      filedate: new Date().toISOString(),
    })

    // assign part id for each part
    let fileCostbom = parts.map((x) => {
      return new FileCostbom({
        partid: x.partid,
        fileid: file.fileid, // assign file id after new file
        versionid: version.uuid,
      })
    })

    // TODO: if part.newTooling = "Y" 需要生成Tooling
    let partsCleansheet = parts.map((x) => {
      return new PartCleansheet({
        partid: x.partid,
        type: 'metal',
        vendor: 'CNP',
        parttype: 'Single',
        sourcercost: 0,
      })
    })

    let cleansheetCost = partsCleansheet.map((x) => {
      return new CleansheetCost({
        cleansheetid: x.cleansheetid,
        //TODO: Get real cost detail
        costname: '開發費',
        costdata: null,
        costprice: 10,
      })
    })

    let projectME = {
      project: project, version: version, parts: parts, file: file, filecostbom: fileCostbom, partscleansheet: partsCleansheet, cleansheetcost: cleansheetCost,
    }
    const result  = await cleanSheetModel.triggerProjectME(projectME)
    
    return result
  }

  static async fetchPlm(projectCode = null, projectName = null, bg = null, product = null){

    let result, stage = 'C0'
    let today = moment().format('YYYY-MM-DD')
    let plmProjects = await cleanSheetModel.getPlm(projectCode, projectName, bg, product)
    result = await Promise.all(
      plmProjects.map(async (plmProject) => {
        if(moment(plmProject.projectionc0duedate).format('YYYY-MM-DD') < today) {
          stage = 'C1'
        }
        if (moment(plmProject.projectionc1duedate).format('YYYY-MM-DD') < today) {
          stage = 'C2'
        }
        if (moment(plmProject.projectionc2duedate).format('YYYY-MM-DD') < today) {
          stage = 'C3'
        }
        if (moment(plmProject.projectionc3duedate).format('YYYY-MM-DD') < today) {
          stage = 'C4'
        }
        if (moment(plmProject.projectionc4duedate).format('YYYY-MM-DD') < today) {
          stage = 'C5'
        }
        if (moment(plmProject.projectionc5duedate).format('YYYY-MM-DD') < today) {
          stage = 'C6'
        }
        let stageNames = await cleanSheetModel.getStageName(stage, plmProject.producttype, plmProject.profitcenter)
        let bgs = await cleanSheetModel.getBgByProfitcenter(plmProject.profitcenter)
        let stageName = null
        if(stageNames.length > 0) {
          stageName = stageNames.stagename
        }
        let bg = null
        if(bgs.length > 0) {
          bg = bgs[0].bg_key
        }
        return {
          projectCode: plmProject.projectname,
          projectName: plmProject.acrprjname,
          product: plmProject.producttype,
          stage: stage,
          bg: bg,
          stagename: stageName
        }
      })
    ).then(result => {
      return result
    })
    return {
      projectList: result,
    }
  }
  static async getSinglePartCleanSheet(partID, versionCode) {
    const materialName = '材料費'
    const stampingName = '沖壓費'
    const processName = '二次加工費'
    const componentName = '零件費'
    const packageName = '運包檢'
    const project = await cleanSheetModel.getProjectInfo(versionCode)
    const version = await cleanSheetModel.getStage(versionCode)
    const parts = await cleanSheetModel.getPartsInfo(partID)
    const vendor = await cleanSheetModel.getVendor(partID)
    if(parts.partlevel == 2) {
      var assy = parts.partnumber
      var single = ''
    }else {
      var assy = ''
      var single = parts.partnumber
    }
    const material = await cleanSheetModel.getDataCost(partID, materialName)
    const stamping = await cleanSheetModel.getDataCost(partID, stampingName)
    const processInfo = await cleanSheetModel.getDataCost(partID, processName)
    const component = await cleanSheetModel.getDataCost(partID, componentName)
    const packageInfo  = await cleanSheetModel.getDataCost(partID, packageName)
    const result = JSON.stringify({
      info: {
        projectCode: `${project.projectcode}`,
        projectName: `${project.projectname}`,
        product: `${project.product}`,
        bg: `${project.bg}`,
        stage: `${version.stage}`,
        stageName: `${version.stagename}`,
        currency: `${parts.currency}`,
        partName: `${parts.partname}`,
        site: `${project.site}`,
        partNumberAssy: `${assy}`,
        partNumberSingle: `${single}`,
        bomFileDate: `${project.createtime}`,
        vendor: `${vendor.vendor}`,
        productSpec: `${project.producrspec}`,
        remark: `${parts.remark}`
      },
      cost: {
        material: `${material.costprice}`,
        process: `${processInfo.costprice}`,
        component: `${component.costprice}`,
        stamping: `${stamping.costprice}`,
        package: `${packageInfo.costprice}`,
        profit: `${(stamping.costprice + processInfo.costprice) * 0.1}`,
        sourceCost: `${material.costprice + processInfo.costprice + component.costprice + stamping.costprice + packageInfo.costprice + (stamping.costprice + processInfo.costprice) * 0.1}`
      },
      data: {
        material: `${material.costdata}`,
        process: `${processInfo.costdata}`,
        component: `${component.costdata}`,
        stamping: `${stamping.costdata}`
      }
    })
    return result
  }
}
module.exports = CleanSheet
