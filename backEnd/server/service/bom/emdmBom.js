const bomItemModel = require('../../model/bom/bomItem')
// const emdmBomUtil = require('../../utils/emdmBom/emdmBomUtils.js')
const emdmMainModel = require('../../model/bom/emdmBomMain.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')

class EmdmBomService {
  static async copyBomCost (bomId, copyCostBomID) {
    let projectDetail = await emdmMainModel.getEmdmBomDetailById(bomId)
    let copyCostProjectDetail = await emdmMainModel.getEmdmBomDetailById(copyCostBomID)
    if (projectDetail[0].cost_version === '0.7') {
      // let upperVersion = await emdmBomUtil.getUpperVersion(bomId)
      if (copyCostBomID) {
        let client = await new tsystemDB()
        let upperResult = await bomItemModel.getBomTable(copyCostBomID, 'all')
        let bomItemList = upperResult.rows
        let bomLength = bomItemList.length
        try{
          for (let i = 0; i < bomLength; i++) {
            let bomItem = bomItemList[i]
            await emdmMainModel.setCostOfNewEmdmVersion(client, bomItem, bomId, projectDetail[0].cost_version_id, bomItem.emdm_id)
          }
          await emdmMainModel.insertCopyCostRecord(client, bomId, copyCostBomID, copyCostProjectDetail[0].cost_version)
          await client.commit()
        }catch(e){
          await client.rollback()
        }
      }
    }
  }

  static async getEmdmVersionsById(bomId) {
    let bomInfo = await emdmMainModel.getEmdmBomDetailById(bomId)
    let rowData = await emdmMainModel.getVersions(bomInfo)
    return rowData
  }
}

module.exports = EmdmBomService