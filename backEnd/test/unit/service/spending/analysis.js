const { expect } = require('chai')
const sinon = require('sinon')

const analsisService = require('../../../../server/service/spending/analysis.js')
const analsisModel = require('../../../../server/model/spending/analysis.js')

describe('Spending Analysis', () => {
  describe('Analysis service chartMonthAnalysis function', () => {
    it('get chartMonthAnalysis', async () => {
      let mockResult = {
        'data': [{
          key: 1,
          name: 'AVNET',
          amountNTD: 0.011959,
          amountUSD: 0.000387,
          percentage: 82.9,
        },
        {
          key: 2,
          name: 'DIODES',
          amountNTD: 0.002466,
          amountUSD: 0.00008,
          percentage: 17.1,
        }],
      }

      sinon.stub(analsisModel, 'getSpendingBaseTableGrouping').returns([
        {
          po_price: '2.68500000000000000000',
          currency: 'RMB',
          vbase: 'AVNET',
          vgname: 'AVNET',
        },
        {
          po_price: '0.55360000000000000000',
          currency: 'RMB',
          vbase: 'DIODES',
          vgname: 'DIODES',
        },
      ])
      sinon.stub(analsisModel, 'getExchangeRate').returns([
        {
          exchangerate: '4.4540000000000000',
          pr: 1,
          kurst: 'M',
          fcurr: 'RMB',
          tcurr: 'NTD',
          gdatu: '20181201',
          kursm: '1.000',
          ukurs: '4.454',
          ffact: '1.000',
          tfact: '1.000',
          opmod: 'C',
          crtdt: '2018-11-27 16:00:00',
          crttm: '18:38:56',
        },
        {
          exchangerate: '0.14400000000000000000',
          pr: 1,
          kurst: 'M',
          fcurr: 'RMB',
          tcurr: 'USD',
          gdatu: '20181201',
          kursm: '1.000',
          ukurs: '0.144',
          ffact: '1.000',
          tfact: '1.000',
          opmod: 'C',
          crtdt: '2018-11-27 16:00:00',
          crttm: '16:49:34',
        },
      ])
      let result = await analsisService.chartMonthAnalysis({
        'user': ['SM3', 'S40', 'S56', 'S87', 'S08'],
        'plant': ['F130', 'F131', 'F132', 'F135'],
        'dateFrom': '2018-09-01',
        'dateTo': '2018-12-31',
        'type1': ['Antenna', 'MOSFET', 'Memory', 'PCB', 'Power IC'],
        'type2': ['N CHANNEL', 'P CHANNEL'],
        'supplyType': [11, 13, 14, 15],
        'category': 'none',
        'measure': 'amount',
        'currency': 'USD',
      })
      expect(result).to.have.property('data')
      expect(result.data).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
  })
})