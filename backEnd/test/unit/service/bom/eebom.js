const { expect } = require('chai')
const sinon = require('sinon')

const eebomService = require('../../../../server/service/bom/eeBom.js')
const eebomMainModel = require('../../../../server/model/bom/eeBomMain.js')

describe('eebom', () => {
  describe('get eebom main info', () => {
    it('get eebom main info', async () => {
      let mockResult = {
        'project_code': '1234',
        'customer': 'joe',
        'product_type': '111',
        'project_name': '222',
        'stage': '333',
        'version': '444',
        'sku': '666',
        'version_remark': '777',
        'project_leader': 'REXX',
        'eedm_version': null,
        'is_eedm_version_edit': false,
        'plant': null,
        'purchasing_orgnization': null,
        'create_time': '2019-04-11T03:10:57.004Z',
        'caculation_date': null,
        'update_time': '2019-04-11T03:10:57.004Z',
        'approve_time': '2019-04-11T03:10:57.004Z',
        'is_approved': false,
        'approved_by': null,
      }

      sinon.stub(eebomMainModel, 'getEeBomInfoByID').returns(mockResult)

      let result = await eebomService.getEeBomInfoByID('1234')
      expect(result).to.be.a('object')
    })
  })
  /*describe('getEdmVersionStatusVersionByID', () => {
    it('should get edmVersion, statusVersion and evid', async () => {
      let result = await eebomService.getEdmVersionStatusVersionByID('c742a71a-6988-4fd0-9682-80d0fc02ad4d','17945_-1_UMA_20190313163214')
      expect(result).to.be.a('array')
    })
  })*/
})
