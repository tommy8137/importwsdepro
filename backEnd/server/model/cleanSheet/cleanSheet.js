const { systemDB } = require('../../helpers/database')
const ProjectModel = require('./project')
const VersionModel = require('./version')
const { File:FileModel, FileCostbom: FileCostbomModel } = require('./file')
const { Part:PartModel, PartCleansheet: PartCleansheetModel, CleansheetCost: CleansheetCostModel } = require('./part')

class CleanSheet {
  static async testQ() {
    const result = await systemDB.Query('SELECT * from c_projects')
    return result
  }
  static async triggerProjectME(data) {
    // const result = await systemDB.Query(ProjectModel.insert(data))
    // TODO: FINE THE TX
    let querys = []
    // 1. add project
    querys.push(ProjectModel.insert(data.project))
    // 2. add version
    querys.push(VersionModel.insert(data.version))
    // 3. add file
    querys.push(FileModel.insert(data.file))
    // 4. add parts
    querys.push(...data.parts.map((x) => PartModel.insert(x)))
    // 5. add file_costbom
    querys.push(...data.filecostbom.map((x) => FileCostbomModel.insert(x)))
    // 6. add part cleansheet
    querys.push(...data.partscleansheet.map((x) => PartCleansheetModel.insert(x)))
    // 7. add cleaansheet cost
    querys.push(...data.cleansheetcost.map((x) => CleansheetCostModel.insert(x)))
    const result = await systemDB.transactions(querys)
    return result
  }
  static async getPlm(projectCode, projectName, bg, product) {
    let query = `SELECT plm.projectname, plm.acrprjname, plm.producttype, plm.profitcenter,
    plm.projectionc0duedate, plm.projectionc1duedate, plm.projectionc2duedate,
    plm.projectionc3duedate, plm.projectionc4duedate, plm.projectionc5duedate, plm.projectionc6duedate, fi.bg_key
    FROM wiprocurement.all_pmprjtbl_for_dashboard as plm
    INNER JOIN  wiprocurement.v_businessorg_bo as fi
    ON plm.profitcenter = fi.profit_center_key WHERE plm.projectionc0duedate IS NOT NULL and
    plm.projectionc1duedate IS NOT NULL and plm.projectionc2duedate IS NOT NULL and
    plm.projectionc3duedate IS NOT NULL and plm.projectionc4duedate IS NOT NULL and
    plm.projectionc5duedate IS NOT NULL and plm.projectionc6duedate IS NOT NULL`

    if(projectCode != null) {
      query = query + ' and plm.projectname = ' + `'${projectCode}'`
    }
    if(projectName != null) {
      query = query + ' and plm.acrprjname = ' + `'${projectName}'`
    }
    if(bg != null) {
      query = query + ' and fi.bg_key = ' + `'${bg}'`
    }
    if(product != null) {
      query =  query + ' and plm.producttype = ' + `'${product}'`
    }

    const result = await systemDB.Query(query)
    return result.rows
  }
  static async getStageName(stage, product, profitcenter) {
    const result = await systemDB.Query(`SELECT stagename
    FROM wiprocurement.product_profitcenter_to_stage where stage ='${stage}'
    and product='${product}' and profitcenter ='${profitcenter}'`)
    return result.rows
  }
  static async getBgByProfitcenter(profitcenter) {
    const result = await systemDB.Query(`SELECT bg_key
    FROM wiprocurement.v_businessorg_bo
    where profit_center_key ='${profitcenter}'`)
    return result.rows
  }
  static async getPartsInfo(partID) {
    const result = await systemDB.Query(`select * from wiprocurement.c_parts \
     where partid='${partID}';`)
    return result.rows[0]
  }

  static async getProjectInfo(versionCode) {
    const result = await systemDB.Query(`select * from wiprocurement.c_projects \
      where versionid='${versionCode}';`)
    return result.rows[0]
  }
  static async getVendor(partID) {
    const result = await systemDB.Query(`select * from wiprocurement.c_part_cleansheets \
      where partid='${partID}';`)
    return result.rows[0]
  }
  static async getStage(versionCode) {
    const result = await systemDB.Query(`select * from wiprocurement.c_versions \
      where versionid='${versionCode}';`)
    return result.rows[0]
  }
  static async getDataCost(partID, costname) {
    const result = await systemDB.Query(`select * from wiprocurement.c_cleansheet_cost \
      inner join wiprocurement.c_part_cleansheets on \
      wiprocurement.c_cleansheet_cost.cleansheetid=wiprocurement.c_part_cleansheets.cleansheetid \
      where partid='${partID}' and costname='${costname}';`)
    return result.rows[0]

  }
}
module.exports = CleanSheet
