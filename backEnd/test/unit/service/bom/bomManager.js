const { expect } = require('chai')
const sinon = require('sinon')

const bomManagerService = require('../../../../server/service/bom/bomManager.js')
const bomManagerModel = require('../../../../server/model/bom/bomManager.js')
const bomDesigneeModel = require('../../../../server/model/bom/bomDesignee.js')
const bomVersionModel = require('../../../../server/model/bom/bomVersion.js')
const rbacService = require('../../../../server/service/admin/rbac.js')
const bomItemModel = require('../../../../server/model/bom/bomItem.js')

describe('BOM manager', () => {
  /*
  describe('bom manager service getBomData function', () => {
    it('bom manager service getBomData function', async () => {
      let mockResult =  {
        'bomInfo': {
          'numberOfBom': 18,
          'bomList': [
            { id: 49,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '1bd4e980-bc44-4a7b-8e1a-55c7b46efb6e',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              own_created: false,
              system_model_pn: 'PN12345',
              
              create_time: '2019-03-13T08:50:27.666Z' },
            { id: 48,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '19863306-f3c0-4e36-b968-a81af4a207a3',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:49:45.105Z' },
            { id: 47,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: 'e71e5a12-a781-40a8-bc6b-2b8c7b7d4df9',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:48:28.344Z' },
            { id: 46,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: 'bec62333-8929-4b26-9577-6a0ce2b25378',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:48:00.986Z' },
            { id: 45,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '17221fdd-fe58-40b5-88e9-ffd5d98d9364',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:47:23.631Z' },
            { id: 44,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: 'fccb1338-a239-4bda-a929-207a06084dec',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:40:45.252Z' },
            { id: 43,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '7850e720-6a92-4daf-a0d8-fc2bb34fd278',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:40:14.060Z' },
            { id: 42,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '837a4a26-9944-4e0e-9a72-62e935fe0247',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:39:37.745Z' },
            { id: 41,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: '92a0ee01-b240-45bf-8dfb-d7ccdf80f267',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:38:36.870Z' },
            { id: 40,
              customer: '123',
              project_name: '12345',
              product: '123',
              status_id: '1',
              stage: 'RFI',
              version_id: 'b2f2ef67-f8ed-4289-91ae-c9e413af6bbc',
              version: 'V0.0',
              project_leader: '10403304',
              approved_by: '10403304',
              create_by: '10501999',
              sku_desc: 'THIS IS DESC',
              system_model_pn: 'PN12345',
              own_created: false,
              create_time: '2019-03-13T08:37:48.574Z' },
          ],
        },
      }

      sinon.stub(bomManagerModel, 'getMeData').returns([{ id: 49,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '1bd4e980-bc44-4a7b-8e1a-55c7b46efb6e',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:50:27.666Z' },
      { id: 48,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '19863306-f3c0-4e36-b968-a81af4a207a3',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:49:45.105Z' },
      { id: 47,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: 'e71e5a12-a781-40a8-bc6b-2b8c7b7d4df9',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:48:28.344Z' },
      { id: 46,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: 'bec62333-8929-4b26-9577-6a0ce2b25378',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:48:00.986Z' },
      { id: 45,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '17221fdd-fe58-40b5-88e9-ffd5d98d9364',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:47:23.631Z' },
      { id: 44,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: 'fccb1338-a239-4bda-a929-207a06084dec',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:40:45.252Z' },
      { id: 43,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '7850e720-6a92-4daf-a0d8-fc2bb34fd278',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:40:14.060Z' },
      { id: 42,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '837a4a26-9944-4e0e-9a72-62e935fe0247',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:39:37.745Z' },
      { id: 41,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: '92a0ee01-b240-45bf-8dfb-d7ccdf80f267',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:38:36.870Z' },
      { id: 40,
        customer: '123',
        project_name: '12345',
        product: '123',
        status_id: '1',
        stage: 'RFI',
        version_id: 'b2f2ef67-f8ed-4289-91ae-c9e413af6bbc',
        version: 'V0.0',
        project_leader: '10403304',
        approved_by: '10403304',
        create_by: '10501999',
        sku_desc: 'THIS IS DESC',
        system_model_pn: 'PN12345',
        create_time: '2019-03-13T08:37:48.574Z' }])

      sinon.stub(bomManagerModel, 'getMeCount').returns(18)
      let result = await bomManagerService.getMeBomData('', '', '', '', '', '')
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })*/

  /* describe('bom manager service getBomDetailData function', () => {
    it('bom manager service getBomDetailData function', async () => {
      let mockResult =  {
        'bomProject': {
          'id': 113,
          'project_name': '12345',
          'version_id': '9682cdfa-9996-454e-9a27-9d6901ebed3a',
          'version': 'V0.0',
          'create_by': '10403304',
          'project_code': '10403304',
          'product_spec': '15',
          'sku_desc': 'THIS IS DESC',
          'customer': {
            'key': '123',
            'value': '123',
          },
          'product_type': {
            'key': '123',
            'value': '123',
          },
          'stage': {
            'key': '1',
            'value': 'RFI',
          },
          'site': {
            'key': 'WIH',
            'value': 'WIH',
          },
          'project_leader': {
            'key': '10403304',
            'value': 'IAN KUO',
          },
          'approved_by': {
            'key': '10403304',
            'value': 'IAN KUO',
          },
        },
        'bomDesignee': [
          {
            'id': '027a0534-517b-49d7-93ba-2f7387839690',
            'seq': 1,
            'user': {
              'key': '10709306',
              'value': 'REX CY CHEN',
            },
            'function_team': '',
            'isfunctionteam': false,
          },
          {
            'id': '14b31cf1-8163-4da4-94a3-db59648b1de1',
            'seq': 2,
            'user': {
              'key': '10411304',
              'value': 'RICK CS CHEN',
            },
            'function_team': {
              'key': 'Tooling',
              'value': 'Tooling',
            },
            'isfunctionteam': true,
          },
          {
            'id': '6da3704e-84e5-40be-90bf-4c5fa1b1baf0',
            'seq': 3,
            'user': {
              'key': '10503307',
              'value': 'joe_cy_chen',
            },
            'function_team': {
              'key': 'Thermal',
              'value': 'Thermal',
            },
            'isfunctionteam': true,
          },
        ],
      }

      sinon.stub(bomManagerModel, 'getMeBomDetailById').returns([
        { id: 113,
          customer: '123',
          project_name: '12345',
          product_type: '123',
          stage_id: '1',
          stage: 'RFI',
          version_id: '9682cdfa-9996-454e-9a27-9d6901ebed3a',
          version: 'V0.0',
          project_leader: '10403304',
          project_leader_name: 'IAN KUO',
          approved_by: '10403304',
          approved_by_name: 'IAN KUO',
          create_by: '10403304',
          project_code: '10403304',
          system_model_pn: 'PN12345',
          id_cmf_file_data: '20181230102_FILE',
          sku_desc: 'THIS IS DESC',
          product_spec: '15',
          site: 'WIH' }])

      sinon.stub(bomDesigneeModel, 'getMeBomDesigneeData').returns([{ id: '027a0534-517b-49d7-93ba-2f7387839690',
        seq: 1,
        user_id: '10709306',
        user_name: 'REX CY CHEN',
        function_team_name: '',
        isfunctionteam: false },
      { id: '14b31cf1-8163-4da4-94a3-db59648b1de1',
        seq: 2,
        user_id: '10411304',
        user_name: 'RICK CS CHEN',
        function_team_name: 'Tooling',
        isfunctionteam: true },
      { id: '6da3704e-84e5-40be-90bf-4c5fa1b1baf0',
        seq: 3,
        user_id: '10503307',
        user_name: 'joe_cy_chen',
        function_team_name: 'Thermal',
        isfunctionteam: true }])

      let result = await bomManagerService.getMeBomDetailData(20)
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('upload image function', () => {
    it('upload image function', async () => {
      let mockResult = 'testImageID'
      let name = 'imageName'
      let fpath = 'uploadImage/folder'
      let user = 'ADMIN'
      sinon.stub(bomManagerModel, 'uploadImage').returns('testImageID')
      let result = await bomManagerService.uploadImage(name, fpath, user)
      expect(result).to.be.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })*/
/*
  describe('bom manager service post bomApproval function', () => {

    it('bomApproval function, have to be true', async () => {
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'bomVersionActionPermission').returns(1)
      sinon.stub(bomManagerModel, 'bomGetVersion').returns([{
        stage_id: '1',
        id: '123',
      }])
      sinon.stub(bomVersionModel, 'getNextVersion').returns('0.7')
      sinon.stub(bomVersionModel, 'updateVersionById').returns({})

      let bomID = 2, userID = '10700001'
      let result = await bomManagerService.bomApproval(bomID, userID)
      expect(result).to.equal(true)
    })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
*/
/*
  describe('bom manager service post bomComplete function', () => {

    it('bomComplete function, have to be true', async () => {
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomManagerModel, 'bomGetVersion').returns([{
        stage_id: '1',
        id: '123',
      }])
      sinon.stub(bomVersionModel, 'getNextVersion').returns('1.0')
      sinon.stub(bomVersionModel, 'updateVersionById').returns({})

      let bomID = 2, userID = '10700001'
      let result = await bomManagerService.bomComplete(bomID, userID)
      expect(result).to.equal(true)
    })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
*/
  // describe('bom manager service insert bom data function', () => {
  //   it('bom manager service insert bom data function', async () => {
  //     let mockResult =  { id:1 }
  //     let request =  {
  //       'bomProject':{
  //         'customer':'123',
  //         'product_type':'123',
  //         'stage':'1',
  //         'project_leader':'10403304',
  //         'approved_by':'10403304',
  //         'project_code':'12345',
  //         'project_name':'12345',
  //         'site':'WIH',
  //         'system_model_pn':'PN12345',
  //         'id_cmf_file_data':'20181230102_FILE',
  //         'product_spec':'15',
  //         'sku_desc':'THIS IS DESC',
  //       },
  //       'bomDesignee':[{
  //         'user_id':'22222',
  //         'function_team_name':'',
  //       }, {
  //         'user_id':'55555',
  //         'function_team_name':'',
  //       }, {
  //         'user_id':'33333',
  //         'function_team_name':'Tooling',
  //       },
  //       ],
  //     }

  //     sinon.stub(bomManagerModel, 'insertData').returns(1)
  //     sinon.stub(bomDesigneeModel, 'insertDesigneeData')
  //     sinon.stub(bomVersionModel, 'insertVersionDataWithTran')
  //     let result = await bomManagerService.insertBomData('10403304', request)
  //     expect(result).to.deep.equal(mockResult)
  //   })
  //   afterEach(() => {
  //     // Restore the default sandbox here
  //     sinon.restore()
  //   })
  // })
  
  // describe('bom manager service update bom data function', () => {
  //   it('bom manager service update bom data function', async () => {
  //     let mockResult =  { id:1 }
  //     let request = {
  //       'bomProject': {
  //         'customer':'123',
  //         'product_type':'123',
  //         'stage_id':'1',
  //         'version_id':'70912932-5e4a-432f-8a86-743f580926ef',
  //         'project_leader':'10403304',
  //         'approved_by':'10403304',
  //         'project_code':'12345',
  //         'project_name':'12345',
  //         'site':'WIH',
  //         'system_model_pn':'PN12345',
  //         'id_cmf_file_data':'20181230102_FILE',
  //         'product_spec':'15',
  //         'sku_desc':'THIS IS DESC',
  //       },
  //       'bomDesignee': [
  //         {
  //           'id': 'e754000f-ebd5-4443-a56d-717c3f200838',
  //           'user_id': '22222',
  //           'function_team_name': '',
  //           'isfunctionteam': false,
  //         },
  //         {
  //           'id': '80dfd242-6a82-4469-9708-e730ab7f223e',
  //           'user_id': '33333',
  //           'function_team_name': 'Tooling',
  //           'isfunctionteam': true,
  //         },
  //         {
  //           'id': '24c697dd-d7f2-4524-b0d0-7e878cbb12c9',
  //           'user_id': '666666',
  //           'function_team_name': 'Thermal',
  //           'isfunctionteam': true,
  //         },
  //       ],
  //     }

  //     sinon.stub(bomManagerModel, 'updateData').returns({ id:1 })
  //     sinon.stub(bomDesigneeModel, 'updateDesigneeData')
  //     sinon.stub(bomVersionModel, 'updateStageAndVersion')
  //     let result = await bomManagerService.updateBomData(1, request)
  //     expect(result).to.deep.equal(mockResult)
  //   })
  //   afterEach(() => {
  //     // Restore the default sandbox here
  //     sinon.restore()
  //   })
  // })
})
