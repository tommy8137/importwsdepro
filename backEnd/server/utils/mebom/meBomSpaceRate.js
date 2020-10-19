/* eslint-disable no-magic-numbers */
let _ = require('lodash')


const MeBomExport = require('./meBomExport.js')


class MeBomSpaceRate {
  static async createSpaceRateAllBom(bomIdList, userID) {
    let result = []
    for(let bomIds of bomIdList){
      let baseBomId = bomIds[0] // 顯示用的bomId
      let realBomId = bomIds[1] // 真正的emdmVersion bomId
      let meBomExport = new MeBomExport(realBomId, userID, 'sku1', 'CURRENT', 'USD')
      let genRes = await meBomExport.generateAllBomResult(baseBomId)
      result.push(genRes)
    }
    return result
  }
}

module.exports = MeBomSpaceRate
/* ;(async () => {
  process.logSpendTime = function (startTime, tag = '') {
    let spend = process.hrtime(startTime)
    console.log(tag, 'spend:', spend[0], 's', spend[1] / 1e6, 'ms')
  }
  let bomIdList = [
    [1959, 1959],
  ]
  let startTime = process.hrtime()
  let result = await MeBomSpaceRate.createSpaceRateAllBom(bomIdList, '10700001')
  console.log(result)
  process.logSpendTime(startTime, 'MeBomSpaceRate')
})() */