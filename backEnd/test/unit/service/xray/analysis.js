const { expect } = require('chai')
const sinon = require('sinon')
const analysisService = require('../../../../server/service/xray/analysis.js')
const analysisModel = require('../../../../server/model/xray/analysis.js')
const xrayService = require('../../../../server/service/xray/xray.js')
const xrayModel = require('../../../../server/model/xray/xray.js')

describe('Xray Analysis', () => {
  /*
  describe('Analysis service spaAnalysis function', () => {
    // it('spaAnalysis without param', async () => {
    //   try{
    //     let res =  await analysisService.spaAnalysis(null)
    //   }catch(err){
    //     expect(err.message).equal('body parse error')
    //   }
    // })
    it('spaAnalysis', async () => {
      let mockResult = {
        specTitle: {
          spec01: 'ABC',
          spec02: 'ZXC',
        },
        specProperty:['spec01', 'spec02'],
        specOthers: ['spec01', 'spec02', 'spec03'],
        infoProperty:[
          'partNumber',
          'partDesc',
          'manufacturer',
          'vendor',
          'vendorPN',
          'supplyType',
          'mrp',
          'currency',
          'originalCurrency',
          'exchangeRate',
          'unitPrice',
          'priceDiff',
          'isCommonPart',
          'obs',
          'exp',
        ],
        minUnitPrice: 11.2,
        maxUnitPrice: 11.2,
        supplyTypeList: ['B'],
        materialList: [{
          infoList: {
            partNumber: 'AFVCASD',
            partDesc: 'TEST',
            manufacturer: 'M1',
            vendor: 'UT11',
            vendorPN: 'AFVCASD-2018',
            currency: 'NTD',
            supplyType: 'B',
            priceDiff: '0%',
            originalCurrency: 'NTD',
            exchangeRate: 1,
            datab: '2018-11-30T16:00:00.000Z',
            unitPrice: 11.2,
            mrp: null,
            isCommonPart: false,
            obs: 'N',
            exp: 'N',
          },
          specList: {
            spec01:'TEST',
            spec02:'TEST2',
          },
          moreList: {
            spec01: 'TEST',
            spec02: 'TEST2',
            spec03: 'TEST3',
          },
        }],
      }

      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)
      sinon.stub(analysisService, 'getMaterialList').returns({
        materialList: [{
          infoList: {
            partNumber: 'AFVCASD',
            partDesc: 'TEST',
            manufacturer: 'M1',
            vendor: 'UT11',
            vendorPN: 'AFVCASD-2018',
            currency: 'NTD',
            supplyType: 'B',
            priceDiff: '0%',
            originalCurrency: 'NTD',
            exchangeRate: 1,
            datab: '2018-11-30T16:00:00.000Z',
            unitPrice: 11.2,
            mrp: null,
            exp: 'N',
          },
          specList: {
            spec01: 'TEST',
            spec02: 'TEST2',
          },
          moreList: {
            spec01: 'TEST',
            spec02: 'TEST2',
            spec03: 'TEST3',
          },
        }],
        specProperty: ['spec01', 'spec02'],
        specOthers: ['spec03'],
        currency: 'USD',
      })

      sinon.stub(analysisModel, 'isItemBlock').returns([])
      sinon.stub(xrayModel, 'getSpecTitleByRole').returns([{
        'spec_t1': 'ABC',
        'spec_t2': 'ZXC',
      }])
      sinon.stub(analysisModel, 'getCommonPartByPN').returns([])

      let spec = {
        spec01: ['TEST'], spec02: ['TEST2'], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
        spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
        spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
      }

      let res = await analysisService.spaAnalysis('10700001', 'EE', 'productType', [], 'type1', 'type2', '2019-01-01', '2019-01-30', false, false, spec)
      expect(res).to.deep.equal(mockResult)
    })
  })
*/
  describe('Analysis service lppAnalysis function', () => {
  //   it('lppAnalysis without param', async () => {
  //     try{
  //       let res =  await analysisService.lppAnalysis(null)
  //     }catch(err){
  //       expect(err.message).equal('body parse error')
  //     }
  //   })
  //   it('lppAnalysis', async () => {
  //     let req =   {
  //       'dateFrom': '2018/02/08',  // 若不選該條件則給null, 抓最新的
  //       'dateTo': '2018/08/08',
  //       'mrp': true,
  //       'block': true,
  //       'type1': 'Add-on card',
  //       'type2': 'Controller BD',
  //       'spec': {
  //         'spec01': ['LDO', 'VATRA'],
  //         'spec02': ['PIN', '5pin'],
  //         'spec03': [],
  //         'spec04': [],
  //         'spec19': [],
  //         'spec20': [],
  //       },
  //     }
  //     let mockResult =  {
  //       materialPriceList:[
  //         {
  //           specCombination:['TEST', 'TEST2'],
  //           lowestPrice:11.2,
  //           averageValue:11.2,
  //           materialList:[
  //             {
  //               partNumber:'AFVCASD',
  //               price:11.2,
  //               supplyType:'B',
  //             }],
  //         }
  //       ],
  //       supplyTypeList:['B'],
  //       currency:'NTD',
  //     }
  //     sinon.stub(analysisModel, 'isItemBlock').returns([{ partNumber:'TTRRESA' }])
  //     sinon.stub(analysisModel, 'getItembySpec').returns([
  //       {
  //         spec01:'TEST',
  //         spec02:'TEST2',
  //         scode:'A',
  //         partNumber : 'AFVCASD',
  //         partDesc:'TEST',
  //         supply : '1',
  //         plant : 'F301',
  //       },
  //     ])
  //     sinon.stub(analysisModel, 'getManufacturer').returns([
  //       {
  //         manufacturer:'M1',
  //         matnr :'M2',
  //         partNumber:'AFVCASD',
  //       },
  //     ])
  //     sinon.stub(analysisModel, 'getUnitPrice').returns([
  //       {
  //         currency:'NTD',
  //         price:112.0,
  //         unit:10,
  //         matnr :'M2',
  //       },
  //     ])
  //     sinon.stub(analysisModel, 'getVendor').returns([
  //       {
  //         vendorName:'UT11',
  //         matnr:'M2',
  //       },
  //     ])
  //     sinon.stub(analysisModel, 'getExchangeRate').returns([
  //       {
  //         date:'2019-01-30 04:00:00',
  //         fcurr :'NTD',
  //         exchangeRate : 22.0,
  //       },
  //     ])
  //     sinon.stub(analysisModel, 'getMrpValue').returns([
  //       {
  //         zmrp_nreq:'123-43',
  //         mat_plant : 'AFVCASD',
  //         plant : 'F301',
  //       },
  //     ])
  //     let res = await analysisService.lppAnalysis(req)
  //     expect(res).to.deep.equal(mockResult)
  //   })
  //   afterEach(() => {
  //     // Restore the default sandbox here
  //     sinon.restore()
  //   })
  })

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })
})
