const { expect } = require('chai')
const sinon = require('sinon')

const spendingService = require('../../../../server/service/spending/spending.js')
const spendingModel = require('../../../../server/model/spending/spending.js')
const xrayModel = require('../../../../server/model/xray/xray.js')

describe('Spending', () => {
  describe('Spending service getPlants function', () => {
    it('isCE = false & return getPlants with Proxy', async () => {
      let mockResult = {
        'plantList': [
          {
            'plant': 'F135',
            'plantName': 'WZS-3',
            'bg': 'CSBG',
          },
          {
            'plant': 'F135',
            'plantName': 'WZS-3',
            'bg': 'CSBG',
          },
        ],
      }

      sinon.stub(spendingModel, 'getPlants').returns([
        {
          'plant': 'F135',
          'plantname': 'WZS-3',
          'bg': 'CSBG',
        },
        {
          'plant': 'F135',
          'plantname': 'WZS-3',
          'bg': 'CSBG',
        },
      ])

      let result = await spendingService.getPlants()
      expect(result).to.have.property('plantList')
      expect(result.plantList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
  })

  describe('Spending service getUserList function', () => {
    it('isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'MM-EE',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'MM-EE',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })
    it('group name= CPBG-EE,isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'CPBG-EE',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'CPBG-EE',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })
    it('group name= WIWYNN888, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'WIWYNN888',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'WIWYNN888',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })
    it('group name= CPBG01-ME,anf role= me, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'CPBG01-ME',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'CPBG01-ME',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })

    it('group name = CPBG02-ME,anf role= me, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'CPBG02-ME',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'CPBG02-ME',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })
    it('group name = CSBG-ME,anf role= me, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'CSBG-ME',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'CSBG-ME',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })

    it('group name = EBG-ME,anf role= me, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'EBG-ME',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'EBG-ME',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })

    it('group name = CBG,anf role= me, isCE = false & return getUserList with Proxy', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(true)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'EBG-ME',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'EBG-ME',
      },
      ])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
    })
    it('isCE = false & Supervisor = false & return sourcerList', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'ME',
            'scode': 'S26',
            'name': 'TEST2',
          },
          {
            'role': 'ME',
            'scode': 'S91',
            'name': 'APPLE LAI - TEST',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(false)
      sinon.stub(xrayModel, 'getSCode').returns([{
        scode: 'S26',
        sourcer: 'TEST1',
        deptid: 'MGS100',
        groupname: 'CBG',
      },
      {
        scode: 'S26',
        sourcer: 'TEST2',
        deptid: 'MGS100',
        groupname: 'CBG',
      },
      ])
      sinon.stub(spendingModel, 'getColleague').returns([{
        scode: 'S91',
        sourcer: 'APPLE LAI - TEST',
        deptid: 'MGS100',
        groupname: 'CBG',
      }])

      sinon.stub(xrayModel, 'getProxy').returns([{
        scode: 'S91',
        sourcer: 'APPLE LAI - TEST',
        deptid: 'MGS100',
        groupname: 'CBG',
      }])
      sinon.stub(xrayModel, 'getSubordinateSCode').returns([])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
      expect(result.userList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)

      spendingModel.isSupervisor.restore()
      spendingModel.getColleague.restore()
      xrayModel.getSubordinateSCode.restore()
    })

    it('sourcer length is 0', async () => {
      let mockResult = {
        'userList': [
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST1',
          },
          {
            'role': 'EE',
            'scode': 'S26',
            'name': 'TEST2',
          },
          {
            'role': 'EE',
            'scode': 'S91',
            'name': 'APPLE LAI - TEST',
          },
        ],
      }

      sinon.stub(spendingModel, 'isSupervisor').returns(false)
      sinon.stub(xrayModel, 'getSCode').returns([])
      let result = await spendingService.getUserList('10403304')
      expect(result).to.have.property('userList')
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
  describe('Spending service getTypes function', () => {
    it('getTypes return typeList', async () => {
      let mockResult = {
        'typeList': [
          {
            'type1': 'Capacitor',
            'type2': null,
          },
          {
            'type1': 'ASIC1',
            'type2': 'Others',
          },
        ],
      }

      sinon.stub(spendingModel, 'getSpendingTypes').returns([{
        'type1': 'Capacitor',
        'type2': null,
      },
      {
        'type1': 'ASIC1',
        'type2': 'Others',
      }])
      let result = await spendingService.getTypes()
      expect(result).to.have.property('typeList')
      expect(result.typeList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
  })
  describe('Spending service supplyList function', () => {
    it('getTypes return supplyList', async () => {
      let mockResult = {
        'supplyList': [
          {
            'category': 'OEM',
            'sapID': 1,
            'typeID': 'B',
          },
          {
            'category': 'OEM',
            'sapID': 3,
            'typeID': 'C',
          },
          {
            'category': 'OEM',
            'sapID': 11,
            'typeID': 'A',
          },
          {
            'category': 'OEM',
            'sapID': 13,
            'typeID': 'AV',
          },
          {
            'category': 'ODM',
            'sapID': 14,
            'typeID': 'W',
          },
          {
            'category': 'ODM',
            'sapID': 15,
            'typeID': 'S',
          },
        ],
      }

      let result = await spendingService.getSupplyList()
      expect(result).to.have.property('supplyList')
      expect(result.supplyList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
  })
  describe('Spending service getWaterful function', () => {
    it('getWaterful without type2 & currency is NTD return waterfallList', async () => {
      let mockResult = {
        'category': 'type1',
        'requestData': {
          'user': [
            'SM3',
            'S40',
            'S56',
            'S87',
            'S08',
          ],
          'plant': [
            'F130',
            'F131',
            'F132',
            'F135',
          ],
          'dateFrom': '2018-09-01',
          'dateTo': '2018-12-31',
          'type1': [
            'Antenna',
            'MOSFET',
            'Memory',
            'PCB',
            'Power IC',
          ],
          'type2': [],
          'supplyType': [
            11,
            13,
            14,
            15,
          ],
          'category': 'none',
          'measure': 'amount',
          'currency': 'USD',
        },
        'waterfall': [
          {
            'category': 'PCB',
            'quantity': 0,
            'USDAmount': 59.232534,
            'NTDAmount': 59.232534,
            'pn': 42,
            'suppliers': 3,
            'percentage': '78%',
          },
          {
            'category': 'Antenna',
            'quantity': 0,
            'USDAmount': 13.311857,
            'NTDAmount': 13.311857,
            'pn': 114,
            'suppliers': 9,
            'percentage': '18%',
          },
          {
            'category': 'MOSFET',
            'quantity': 0,
            'USDAmount': 2.092279,
            'NTDAmount': 2.092279,
            'pn': 280,
            'suppliers': 10,
            'percentage': '3%',
          },
          {
            'category': 'Power IC',
            'quantity': 0,
            'USDAmount': 0.576053,
            'NTDAmount': 0.576053,
            'pn': 48,
            'suppliers': 9,
            'percentage': '1%',
          },
          {
            'category': 'total',
            'quantity': 0,
            'USDAmount': 75.212723,
            'NTDAmount': 75.212723,
            'percentage': '100%',
            'suppliers': 31,
            'pn': 484,
          },
        ],
      }

      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type1',
        'info':
                    [{
                      category: 'PCB',
                      quantity: '13298.72798000000000000000',
                      pn: 42,
                      suppliers: 3,
                      currency: 'RMB',
                    },
                    {
                      category: 'Antenna',
                      quantity: '2988.74195000000000000000',
                      pn: 114,
                      suppliers: 9,
                      currency: 'RMB',
                    },
                    {
                      category: 'MOSFET',
                      quantity: '469.75282000000000000000',
                      pn: 280,
                      suppliers: 10,
                      currency: 'RMB',
                    },
                    {
                      category: 'Power IC',
                      quantity: '129.33380000000000000000',
                      pn: 48,
                      suppliers: 9,
                      currency: 'RMB',
                    }],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
      ])
      let result = await spendingService.getWaterful({
        'user': ['SM3', 'S40', 'S56', 'S87', 'S08'],
        'plant': ['F130', 'F131', 'F132', 'F135'],
        'dateFrom': '2018-09-01',
        'dateTo': '2018-12-31',
        'type1': ['Antenna', 'MOSFET', 'Memory', 'PCB', 'Power IC'],
        'type2': [],
        'supplyType': [11, 13, 14, 15],
        'category': 'none',
        'measure': 'amount',
        'currency': 'USD',
      })
      // console.log('result', result)
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })

    it('getWaterful with type2 return waterfallList', async () => {
      let mockResult = {
        'category': 'type2',
        'requestData': {
          'user': [
            'SM3',
            'S40',
            'S56',
            'S87',
            'S08',
          ],
          'plant': [
            'F130',
            'F131',
            'F132',
            'F135',
          ],
          'dateFrom': '2018-09-01',
          'dateTo': '2018-12-31',
          'type1': [
            'Antenna',
            'MOSFET',
            'Memory',
            'PCB',
            'Power IC',
          ],
          'type2': ['N CHANNEL', 'P CHANNEL'],
          'supplyType': [
            11,
            13,
            14,
            15,
          ],
          'category': 'none',
          'measure': 'amount',
          'currency': 'USD',
        },
        'waterfall': [
          {
            'category': 'N CHANNEL',
            'quantity': 0,
            'USDAmount': 0.872542,
            'NTDAmount': 0.872542,
            'pn': 127,
            'suppliers': 9,
            'percentage': '63%',
          },
          {
            'category': 'P CHANNEL',
            'quantity': 0,
            'USDAmount': 0.508745,
            'NTDAmount': 0.508745,
            'pn': 57,
            'suppliers': 8,
            'percentage': '37%',
          },
          {
            'category': 'total',
            'quantity': 0,
            'USDAmount': 1.381287,
            'NTDAmount': 1.381287,
            'percentage': '100%',
            'suppliers': 17,
            'pn': 184,
          },
        ],
      }

      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
                    [{
                      category: 'N CHANNEL',
                      quantity: '195.90076000000000000000',
                      pn: 127,
                      suppliers: 9,
                      currency: 'RMB',
                    },
                    {
                      category: 'P CHANNEL',
                      quantity: '114.22208000000000000000',
                      pn: 57,
                      suppliers: 8,
                      currency: 'RMB',
                    }],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
      ])
      let result = await spendingService.getWaterful({
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
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
      // spendingModel.getWaterful.restore()
    })

    it('getWaterful with type2 return waterfallList', async () => {

      sinon.stub(spendingModel, 'getWaterful').returns('null')
      let result = await spendingService.getWaterful({
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
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
    })

    it('test ntd exchange rate = 1 ', async () => {
      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
                    [{
                      category: 'N CHANNEL',
                      quantity: '195.90076000000000000000',
                      pn: 127,
                      suppliers: 9,
                      currency: 'NTD',
                    },
                    {
                      category: 'P CHANNEL',
                      quantity: '114.22208000000000000000',
                      pn: 57,
                      suppliers: 8,
                      currency: 'NTD',
                    }],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
        { from_currency: 'NTD', exange_rate: '4.454', date: '20181201' },
      ])
      let result = await spendingService.getWaterful({
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
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
    })

    it('test usd exchange rate = 1 ', async () => {
      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
                    [{
                      category: 'N CHANNEL',
                      quantity: '195.90076000000000000000',
                      pn: 127,
                      suppliers: 9,
                      currency: 'USD',
                    },
                    {
                      category: 'P CHANNEL',
                      quantity: '114.22208000000000000000',
                      pn: 57,
                      suppliers: 8,
                      currency: 'USD',
                    }],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
        { from_currency: 'USD', exange_rate: '32', date: '20181201' },
      ])
      let result = await spendingService.getWaterful({
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
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
    })
    it('test others amount can work ', async () => {
      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
        [{
          category: 'N CHANNEL',
          quantity: '195.90076000000000000000',
          pn: 127,
          suppliers: 9,
          currency: 'USD',
        },
        {
          category: 'PA',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PB',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PC',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PD',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PE',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PF',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PG',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PH',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PI',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        {
          category: 'PI',
          quantity: '114.22208000000000000000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        ],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
        { from_currency: 'USD', exange_rate: '32', date: '20181201' },
      ])
      let result = await spendingService.getWaterful({
        'user': ['SM3', 'S40', 'S56', 'S87', 'S08'],
        'plant': ['F130', 'F131', 'F132', 'F135'],
        'dateFrom': '2018-09-01',
        'dateTo': '2018-12-31',
        'type1': ['Antenna', 'MOSFET', 'Memory', 'PCB', 'Power IC'],
        'type2': ['N CHANNEL', 'P CHANNEL'],
        'supplyType': [11, 13, 14, 15],
        'category': 'none',
        'measure': 'gr-qty',
        'currency': 'USD',
      })
      expect(result).to.have.property('waterfall')
      expect(result.waterfall).to.be.a('array')
    })

    it('test usd exchange rate = 1 ', async () => {
      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
        [{
          category: 'N CHANNEL',
          quantity: '300000',
          pn: 127,
          suppliers: 9,
          currency: 'USD',
        },
        {
          category: 'PA',
          quantity: '60000',
          pn: 57,
          suppliers: 8,
          currency: 'USD',
        },
        ],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
      ])
      try{
        let result = await spendingService.getWaterful({
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
      }catch(e) {
        expect(e).to.exist
      }
    })
    it('test usd exchange rate = 1 ', async () => {
      sinon.stub(spendingModel, 'getWaterful').returns({
        'category': 'type2',
        'info':
        [{
          category: 'N CHANNEL',
          quantity: '300000',
          pn: 127,
          suppliers: 9,
          currency: 'NTD',
        },
        {
          category: 'PA',
          quantity: '60000',
          pn: 57,
          suppliers: 8,
          currency: 'NTD',
        },
        ],
      })
      sinon.stub(spendingModel, 'getCurrencys').returns([
        { from_currency: 'RMB', exange_rate: '4.454', date: '20181201' },
      ])
      try{
        let result = await spendingService.getWaterful({
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
      }catch(e) {
        expect(e).to.exist
      }
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
})
