const { expect } = require('chai')
const sinon = require('sinon')

const xrayService = require('../../../../server/service/xray/xray.js')
const rbacService = require('../../../../server/service/admin/rbac.js')

const xrayModel = require('../../../../server/model/xray/xray.js')
const path = require('path')
const moment = require('moment')
const fs = require('fs')

describe('Xray', () => {
  describe('xray service checkViewPermissionByRole function', () => {
    it('user have xray api permission, return true', async () => {
      sinon.stub(rbacService, 'getPolicyByUser').returns({
        View: {
          allow: ['xray.ee'],
          deny: [],
        },
      })

      let result = await xrayService.checkViewPermissionByRole('10700001', 'EE')

      expect(result).to.equal(true)
    })

    it('user without xray api permission, throw error permission denid', async () => {
      sinon.stub(rbacService, 'getPolicyByUser').returns({
        View: {
          allow: [],
          deny: [],
        },
      })

      try {
        await xrayService.checkViewPermissionByRole('10700001', 'EE')
      } catch(err) {
        let error = new Error('permission denid')
        expect(err.message).to.deep.eql(error.message)
      }
    })
  })

  describe('xray service getType1InPerm function', () => {
    it('user have xray api permission, return true', async () => {
      sinon.stub(xrayModel, 'getType1ByUser').returns([{
        type1: 'Cable',
      }])

      let result = await xrayService.getType1InPerm('10700001', 'EE', ['Cable', 'EMC'])

      expect(result).to.deep.equal(['Cable'])
    })
  })

  describe('xray service checkType1Permission function', () => {
    it('user have xray api permission, return true', async () => {
      sinon.stub(xrayService, 'getType1InPerm').returns(['Cable'])

      let result = await xrayService.checkType1Permission('10700001', 'EE', ['Cable', 'EMC'])

      expect(result).to.equal(true)
    })

    it('user without xray api permission, throw error type1 permission denid', async () => {
      sinon.stub(xrayService, 'getType1InPerm').returns([])

      try {
        let result = await xrayService.checkType1Permission('10700001', 'EE', 'EMC')
      } catch(err) {
        let error = new Error('type1 permission denid')
        expect(err.message).to.deep.eql(error.message)
      }
    })
  })

  describe('xray service fetchProductType function', () => {
    it('service fetchProductType return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getProductTypeByRole').returns([{
        product_type: 'a1',
      }, {
        product_type: 'b1',
      }])

      let result = await xrayService.fetchProductType('10700001', 'EE')

      expect(result).to.be.a('array')
      expect(result).to.deep.equal(['a1', 'b1'])
    })
  })

  describe('xray service fetchTypeI function', () => {
    it('service fetchTypeI return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getTypeI').returns([{
        type1: 'a1',
      }, {
        type1: 'b1',
      }])

      sinon.stub(xrayService, 'getType1InPerm').returns(['a1'])

      let result = await xrayService.fetchTypeI('10700001', 'EE')

      expect(result).to.be.a('array')
      expect(result).to.deep.equal(['a1'])
    })

    it('user without type1 permission, service fetchTypeI return empty array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getTypeI').returns([{
        type1: 'a1',
      }, {
        type1: 'b1',
      }])

      sinon.stub(xrayService, 'getType1InPerm').returns([])

      let result = await xrayService.fetchTypeI('10700001', 'EE')

      expect(result).to.be.a('array')
      expect(result).to.deep.equal([])
    })
  })

  describe('xray service fetchTypeII function', () => {
    it('service fetchTypeII return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)

      sinon.stub(xrayModel, 'getTypeII').returns([{
        type2: 'a1',
      }, {
        type2: 'b1',
      }])

      let result = await xrayService.fetchTypeII('10700001', 'EE', [], 'type1')

      expect(result).to.be.a('array')
      expect(result).to.deep.equal(['a1', 'b1'])
    })

    it('user without type1 permission, throw Error', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      let error = new Error('type1 permission denid')
      sinon.stub(xrayService, 'checkType1Permission').throws(error)
      sinon.stub(xrayModel, 'getTypeII').returns([{
        type2: 'a1',
      }, {
        type2: 'b1',
      }])

      try {
        let result = await xrayService.fetchTypeII('10700001', 'EE', [], 'type1')
      } catch(err) {
        expect(err).to.eql(error)
      }
    })
  })

  describe('xray service fetchSourcers function', () => {
    it('service fetchSourcers return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)
      sinon.stub(xrayModel, 'getSourcer').returns([{
        sourcer: 'Zoe JY Chen',
        scode: 's32',
      }, {
        sourcer: 'Susan Hsieh',
        scode: 's87',
      }])

      let result = await xrayService.fetchSourcers('10700001', 'EE', 'type1')

      expect(result).to.be.a('object')
      expect(result.sourcerList).to.be.a('array')
      expect(result.sourcerList).to.deep.equal([{
        sourcer: 'Zoe JY Chen',
        scode: 's32',
      }, {
        sourcer: 'Susan Hsieh',
        scode: 's87',
      }])
    })
  })

  describe('xray service fetchSpecTitle function', () => {
    it('service fetchSpecTitle return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getSpecTitleByRole').returns([{
        spec1: 'a',
        spec2: 'b',
        spec3: 'c',
      }])

      let result = await xrayService.fetchSpecTitle('10700001', 'EE', 'type1', 'type2', null)

      expect(result).to.be.a('array')
      expect(result).to.deep.equal(['a', 'b', 'c'])
    })
  })
/*
  describe('xray service fetchSpecItemsForEE function', () => {
    it('service fetchSpecItemsForEE return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)
      sinon.stub(xrayModel, 'getSpecItemForEE').returns([{
        spec1: '1',
        spec2: '2',
        spec3: '3',
      }])
      sinon.stub(xrayService, 'fetchSpecTitle').returns(['a', 'b', 'c'])

      let result = await xrayService.fetchSpecItemsForEE('10700001', 'EE', 'type1', 'type2')

      expect(result).to.be.a('object')
      expect(result.spec).to.be.a('object')
      expect(result.specTitle).to.deep.equal(['a', 'b', 'c'])
    })
  })
*/
  describe('xray service fetchSpecItemsForME function', () => {
    let spec = {
      spec01: [], spec02: [], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
      spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
      spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
    }

    it('service fetchSpecItemsForME return array', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)
      sinon.stub(xrayModel, 'getSpecItemForME').returns([{
        spec1: '1',
      }])
      sinon.stub(xrayService, 'fetchSpecTitle').returns(['a', 'b', 'c'])

      let result = await xrayService.fetchSpecItemsForME('10700001', 'EE', 'type1', 'type2', [], 1, spec)

      expect(result).to.be.a('object')
      expect(result.spec).to.be.a('array')
      expect(result.spec).to.deep.equal(['1'])
      expect(result.key).to.equal('spec01')
      expect(result.specTitle).to.deep.equal(['a', 'b', 'c'])
    })
  })
/*
  describe('xray service addSpecGroup function', () => {
    // let requestSpecGroup = {
    //   'specGroupName': 'SPEC_Group_180824',
    //   'sourcerList': ['S51', 'S01'],
    //   'type1': 'Add-on card',
    //   'type2': 'Controller BD',
    //   'specGroup': {
    //     'spec01': ['LDO', 'VATRA'], 'spec02': ['PIN', '5pin'], 'spec03': [], 'spec04': [], 'spec05': [], 'spec06': [], 'spec07': [], 'spec08': [], 'spec09': [], 'spec10': [],
    //     'spec11': [], 'spec12': [], 'spec13': [], 'spec14': [], 'spec15': [], 'spec16': [], 'spec17': [], 'spec18': [], 'spec19': [], 'spec20': [],
    //   },
    // }

    let spec = {
      spec01: [], spec02: [], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
      spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
      spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
    }

    it('return spec group & return spec group ID', async () => {
      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'checkSpecGroup').returns(true)
      sinon.stub(xrayModel, 'postSpecGroup').returns({ g_id: 12345 })
      sinon.stub(xrayModel, 'postSpecGroupSourcer').returns([])
      sinon.stub(xrayModel, 'postSpecGroupSpec').returns([])

      let result = await xrayService.addSpecGroup('10700001', 'EE', 'specGroupName', ['productType'], 'type1', 'type2', [], spec)
      expect(result).to.have.property('specGroupID')
      expect(result).to.deep.equal({
        specGroupID: 12345,
      })
    })
  })*/
/*
  describe('xray service deleteSpecGroup function', () => {
    // it('deleteSpecGroup group not exist', async () => {
    //   try{
    //     sinon.stub(xrayModel, 'checkPermission').returns(0)
    //     let result = await xrayService.deleteSpecGroup(123, 1)
    //   }catch(err){
    //     expect(err.message).equal('The Group Name not found.')
    //   }
    // })
    it('deleteSpecGroup', async () => {
      let mockResult = { specGroupID: 1 }
      sinon.stub(xrayModel, 'checkGroupPermission').returns(true)
      sinon.stub(xrayModel, 'deleteGroupSpec').returns(true)

      let result = await xrayService.deleteSpecGroup('10700001', 1)
      expect(result).to.deep.equal(mockResult)
    })
  })
*/
/*
  describe('xray service modifySpecGroup function', () => {
    let spec = {
      spec01: [], spec02: [], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
      spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
      spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
    }

    it('modifySpecGroup', async () => {
      let mockResult = { specGroupID: 99 }

      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'checkGroupPermission').returns(true)
      sinon.stub(xrayModel, 'checkOtherSpecGroupName').returns(true)
      sinon.stub(xrayModel, 'deleteGroupSpec').returns(true)
      sinon.stub(xrayService, 'addSpecGroup').returns({ specGroupID: 99 })

      let result = await xrayService.modifySpecGroup('10700001', 'EE', 'specGroupName', ['productType'], 'type1', 'type2', [], spec, 1)
      expect(result).to.deep.equal(mockResult)
    })
  })
*/
  describe('xray service fetchSpecGroups function', () => {
    it('return specGroupList', async () => {
      let mockResult = {
        specGroupList: [
          {
            specGroupName: 'ABCDF',
            specGroupID: 123,
            owner: '10700001',
            type1: 'type1',
            type2: 'type2',
            productType: ['productType'],
            sourcer: [],
            specGroup: {
              spec01: ['218-0844014', '938954'], spec02: [], spec03: [], spec04: ['FCBGA'], spec05: ['C612'], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
              spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
              spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
            },
          },
        ],
      }

      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getSpecGroup').returns([{
        g_id: 123,
        g_name: 'ABCDF',
        owner: '10700001',
        type1: 'type1',
        type2: 'type2',
        product_type: 'productType',
      }])
      sinon.stub(xrayModel, 'getSpecGroupScode').returns([])
      sinon.stub(xrayModel, 'getSpecGroupSpec').returns([
        { g_id: 123, spec: 1, item: '218-0844014' },
        { g_id: 123, spec: 1, item: '938954' },
        { g_id: 123, spec: 5, item: 'C612' },
        { g_id: 123, spec: 4, item: 'FCBGA' },
      ])

      sinon.stub(xrayService, 'fetchSpecTitle').returns(['a', 'b', 'c'])

      let result = await xrayService.fetchSpecGroups('10700001', 'EE')

      expect(result).to.have.property('specGroupList')
      expect(result.specGroupList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
  })

  describe('xray service fetchSpecGroupByGroupID function', () => {
    it('return specGroupList', async () => {
      let mockResult = {
        specGroupName: 'ABCDF',
        specGroupID: 123,
        owner: '10700001',
        type1: 'type1',
        type2: 'type2',
        productType: ['productType'],
        sourcer: [],
        specGroup: {
          spec01: [{
            item_name: 'a1',
            value: true,
          }, {
            item_name: 'a2',
            value: true,
          }],
          spec02: [{
            item_name: 'b1',
            value: false,
          }, {
            item_name: 'b2',
            value: false,
          }],
          spec03: [{
            item_name: 'c1',
            value: false,
          }],
          spec04: [{
            item_name: 'd1',
            value: true,
          }],
          spec05: [{
            item_name: 'e1',
            value: true,
          }], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
          spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
          spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
        },
        specTitle: ['a', 'b', 'c'],
      }

      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayModel, 'getSpecGroup').returns([{
        g_id: 123,
        g_name: 'ABCDF',
        owner: '10700001',
        type1: 'type1',
        type2: 'type2',
        product_type: 'productType',
      }])
      sinon.stub(xrayModel, 'getSpecGroupScode').returns([])
      sinon.stub(xrayModel, 'getSpecGroupSpec').returns([
        { g_id: 123, spec: 1, item: 'a1' },
        { g_id: 123, spec: 1, item: 'a2' },
        { g_id: 123, spec: 5, item: 'e1' },
        { g_id: 123, spec: 4, item: 'd1' },
      ])

      sinon.stub(xrayModel, 'getSpecItemForEE').returns([{
        spec01: 'a1', spec02: 'b1', spec03: 'c1', spec04: 'd1', spec05: 'e1',
        spec06: null, spec07: null, spec08: null, spec09: null, spec10: null,
        spec11: null, spec12: null, spec13: null, spec14: null, spec15: null,
        spec16: null, spec17: null, spec18: null, spec19: null, spec20: null,
        spec21: null, spec22: null, spec23: null, spec24: null, spec25: null,
        spec26: null, spec27: null, spec28: null, spec29: null, spec30: null }, {
        spec01: 'a2', spec02: 'b2', spec03: null, spec04: null, spec05: null,
        spec06: null, spec07: null, spec08: null, spec09: null, spec10: null,
        spec11: null, spec12: null, spec13: null, spec14: null, spec15: null,
        spec16: null, spec17: null, spec18: null, spec19: null, spec20: null,
        spec21: null, spec22: null, spec23: null, spec24: null, spec25: null,
        spec26: null, spec27: null, spec28: null, spec29: null, spec30: null }])

      sinon.stub(xrayService, 'fetchSpecTitle').returns(['a', 'b', 'c'])

      let result = await xrayService.fetchSpecGroupByGroupID('10700001', 'EE', 1)

      expect(result).to.be.a('object')
      expect(result).to.deep.equal(mockResult)
      expect(result.specTitle).to.deep.equal(['a', 'b', 'c'])
    })
  })
/*
  describe('xray service fetchPartNumber function', () => {
    it('fetchPartNumber', async () => {
      let mockResult = {
        type1: 'type1',
        type2: 'type2',
        productType: ['abc', 'zxc'],
        spec: {
          spec01: [{
            item_name: '218-0844014',
            value: true,
          }],
          spec02: [{
            item_name: '456',
            value: true,
          }],
          spec03: [{
            item_name: '789',
            value: true,
          }],
          spec04: [{
            item_name: 'FCBGA',
            value: true,
          }],
          spec05: [{
            item_name: 'C612',
            value: true,
          }],
          spec06: [],
          spec07: [],
          spec08: [],
          spec09: [],
          spec10: [],
          spec11: [],
          spec12: [],
          spec13: [],
          spec14: [],
          spec15: [],
          spec16: [],
          spec17: [],
          spec18: [],
          spec19: [],
          spec20: [],
          spec21: [],
          spec22: [],
          spec23: [],
          spec24: [],
          spec25: [],
          spec26: [],
          spec27: [],
          spec28: [],
          spec29: [],
          spec30: [],
        },
        specTitle: ['a', 'b', 'c'],
      }

      sinon.stub(xrayService, 'checkViewPermissionByRole').returns(true)
      sinon.stub(xrayService, 'checkType1Permission').returns(true)
      sinon.stub(xrayModel, 'getPartNumberSearchBar').returns([{
        productType: 'abc',
        type1: 'type1',
        type2: 'type2',
      }, {
        productType: 'zxc',
        type1: 'type1',
        type2: 'type2',
      }])

      sinon.stub(xrayModel, 'getPartNumberSpec').returns([{
        spec01: '218-0844014', spec02: '456', spec03: '789', spec04: 'FCBGA', spec05: 'C612', spec06: null, spec07: null, spec08: null, spec09: null, spec10: null,
        spec11: null, spec12: null, spec13: null, spec14: null, spec15: null, spec16: null, spec17: null, spec18: null, spec19: null, spec20: null,
        spec21: null, spec22: null, spec23: null, spec24: null, spec25: null, spec26: null, spec27: null, spec28: null, spec29: null, spec30: null,
      }])

      // sinon.stub(xrayModel, 'getSpecItemForMEBySpec').returns([{
      //   spec01: '218-0844014', spec02: '456', spec03: '789', spec04: 'FCBGA', spec05: 'C612', spec06: null, spec07: null, spec08: null, spec09: null, spec10: null,
      //   spec11: null, spec12: null, spec13: null, spec14: null, spec15: null, spec16: null, spec17: null, spec18: null, spec19: null, spec20: null,
      //   spec21: null, spec22: null, spec23: null, spec24: null, spec25: null, spec26: null, spec27: null, spec28: null, spec29: null, spec30: null,
      // }])

      sinon.stub(xrayService, 'fetchSpecTitle').returns(['a', 'b', 'c'])

      let result = await xrayService.fetchPartNumber('10700001', 'ME', 1)

      expect(result).to.be.a('object')
      expect(result).to.deep.equal(mockResult)
      expect(result.specTitle).to.deep.equal(['a', 'b', 'c'])
    })
  })*/

  // describe('xray service spaExport function', () => {
  //   it('spaExport', async () => {
  //     let spaFileDate = moment(new Date()).format('YYYYMMDD')
  //     let fileName = `../../../../server/utils/excel/SPA_${spaFileDate}.xlsx`
  //     let filePath = path.resolve(__dirname, fileName)
  //     let req =  {
  //       specTitle: ['ABC', null, 'ABC2', 'ABC3', null],
  //       specProperty: ['spec1', 'spec2', 'spec3', 'spec4'],
  //       specOthers: ['spec1', 'spec2', 'spec3', 'spec4', 'spec5'],
  //       infoProperty: [
  //         'partNumber',
  //         'partDesc',
  //         'manufacturer',
  //         'vendor',
  //         'vendorPN',
  //         'supplyType',
  //         'mrp',
  //         'currency',
  //         'originalCurrency',
  //         'exchangeRate',
  //         'unitPrice',
  //         'priceDiff',
  //       ],
  //       materialList: [
  //         {
  //           infoList: {
  //             partNumber: '020.80054.009',
  //             partDesc: 'FOXCONN',
  //             vendor: '200706',
  //             vendorPN: '020.80054.009-2018',
  //             manufacturer: 'FOXCONN',
  //             supplyType: 'M',
  //             mrp: 20,
  //             currency: 'USD',
  //             originalCurrency: 'JPY',
  //             exchangeRate: 0.27,
  //             unitPrice: 0.32,
  //           },
  //           specList:{
  //             spec1: '8bit AVR MCU',
  //             spec2: '1K bytes Flash',
  //             spec3: '1-Kbyte SRAM',
  //             spec4: '512 Byte EEPROM',
  //           },
  //           moreSpec: {
  //             spec1: '8bit AVR MCU',
  //             spec2: '1K bytes Flash',
  //             spec3: '1-Kbyte SRAM',
  //             spec4: '512 Byte EEPROM',
  //             spec5: 'abcd',
  //           },
  //         },
  //       ],
  //     }
  //     await xrayService.spaExport(req)
  //     fs.exists(filePath, (isExist) =>{
  //       expect(isExist).to.be.true
  //     })
  //   })
  // })

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })
})
