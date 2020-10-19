const { expect } = require('chai')
const meBomUtils = require('../../../../server/utils/mebom/meBomUtils.js')
  

describe('meBomUtils', () => {
  describe('get clean sheet cost', () => {
    it('noCost', () => {
      let noCost = meBomUtils.getCleanSheetCost('0', false, false)
      expect(noCost).equals(null)
    })
    
    it('infinityCost', () => {
      let infinityCost = meBomUtils.getCleanSheetCost((1 / 0), false, false)
      expect(infinityCost).equals(null)
    })
    
    it('negative', () => {
      let negative = meBomUtils.getCleanSheetCost('-1', false, false)
      expect(negative).equals(null)
    })
    
    it('noPartList', () => {
      let noPartList = meBomUtils.getCleanSheetCost(null, true, false)
      expect(noPartList).equals(null)
    })
    
    it('outterOtherFill', () => {
      let outterOtherFill = meBomUtils.getCleanSheetCost(null, false, true)
      expect(outterOtherFill).equals('-')
    })
    
    it('innerOtherFill', () => {
      let innerOtherFill = meBomUtils.getCleanSheetCost(null, false, false)
      expect(innerOtherFill).equals('-')
    })
    
    it('normalCost', () => {
      let normalCost = meBomUtils.getCleanSheetCost('3.1415926', false, false)
      expect(normalCost).to.be.a('number')
    })
  })
  describe('get last price', () => {
    it('noCost', () => {
      let noCost = meBomUtils.getLastPrice({
        last_price:{
          'unitPrice' : null,
          'validDate' : null,
          'purchaseOrg': null,
          'isValidPrice': null,
        },
      })
      expect(noCost.unitPrice).equals(null)
    })
    it('costExpire', () => {
      let costExpire = meBomUtils.getLastPrice({
        last_price:{
          'unitPrice' : 100,
          'validDate' : 20200501,
          'purchaseOrg': null,
          'isValidPrice': false,
        },
      })
      expect(costExpire.unitPrice).equals(null)
    })
    it('normalCost', () => {
      let normalCost = meBomUtils.getLastPrice({
        last_price:{
          'unitPrice' : 100,
          'validDate' : 20200501,
          'purchaseOrg': 'PWKS',
          'isValidPrice': true,
        },
      })
      expect(normalCost.unitPrice).equals(100)
    })
  })
})