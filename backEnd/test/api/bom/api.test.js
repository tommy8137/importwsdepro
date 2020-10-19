const supertest = require('supertest')

const helper = require('../api-test-helper')
const { expect } = require('chai')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const path = require('path')
const moment = require('moment')


describe('bom Manager', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  describe('api GET bom/bomDatas', () => {
    it('should return 200, get bomDatas list', (done) => {
      let page = '1'
      let items = '10'
      let orderBy = 'id'
      let role = 'ME'
      api.get(`bom/bomDatas?pages=${page}&items=${items}&orderBy=${orderBy}&role=${role}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.have.property('bomInfo')
          expect(res.body.bomInfo).to.be.a('object')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      let page = '1'
      let items = '10'
      let orderBy = 'id'
      let role = 'ME'
      api.get(`bom/bomDatas?pages=${page}&items=${items}&orderBy=${orderBy}&role=${role}`)
        .expect(401, done)
    })
  })
  describe('api get bom/bomDatas/:id', () => {
    it('should return 200, get detail bom list', (done) => {
      let id = '31'
      api.get(`bom/bomDatas/${id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.be.a('object')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      let id = '31'
      api.get(`bom/bomDatas/${id}`)
        .expect(401, done)
    })
  })
  describe('api GET bom/bomFilterType', () => {
    it('should return 200, get bomFilterType list', (done) => {
      api.get('bom/bomFilterType')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('bom/bomFilterType')
        .expect(401, done)
    })
  })
  describe('api /bomFilterType/column', () => {
    it('should return 200, get bomFilterType column value list', (done) => {
      let column = 'customer'
      let role = 'ME'
      api.get(`bom/bomFilterType/${column}?role=${role}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.be.a('object')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      let column = 'customer'
      let role = 'ME'
      api.get(`bom/bomFilterType/${column}?role=${role}`)
        .expect(401, done)
    })
  })
  // describe('api insert bom/bomDatas', () => {
  //   it('should return 200, insert bom data', (done) => {
  //     const body = {
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
  //     api.post('bom/bomDatas')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(body)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           done(err)
  //         }
  //         done()
  //       })
  //   })

  //   it('should return a 401 response without Authorization ', (done) => {
  //     const body = {
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
  //     api.post('bom/bomDatas')
  //       .send(body)
  //       .expect(401, done)
  //   })
  // })
  describe('api update bom/bomDatas', () => {
    /*
    it('should return 200, update bom data', (done) => {
      let id = '113'
      let body = {
        'bomProject': {
          'project_name': '12345',
          'version_id': '9682cdfa-9996-454e-9a27-9d6901ebed3a',
          'version': 'V0.0',
          'create_by': '10403304',
          'project_code': '10403304',
          'approved_by':'10403304',
          'site':'WIH',
          'system_model_pn':'PN12345',
          'id_cmf_file_data':'20181230102_FILE',
          'product_spec':'15',
          'sku_desc':'THIS IS DESC',
        },
        'bomDesignee': [
          {
            'id': '027a0534-517b-49d7-93ba-2f7387839690',
            'user_id': '10709306',
            'function_team_name': '',
          },
          {
            'id': '14b31cf1-8163-4da4-94a3-db59648b1de1',
            'user_id': '10411304',
            'function_team_name': 'Tooling',
          },
          {
            'id': '6da3704e-84e5-40be-90bf-4c5fa1b1baf0',
            'user_id': '10503307',
            'function_team_name': 'Thermal',
          },
        ],
      }
      api.put(`bom/bomDatas/${id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })
    */
    it('should return a 401 response without Authorization ', (done) => {
      let id = '59'
      let body = {
        'bomProject': {
          'customer':'123',
          'product_type':'123',
          'stage':'1',
          'version_id':'cff48bd9-085e-4931-80b3-40ee074c1a4e',
          'project_leader':'10403304',
          'approved_by':'10403304',
          'project_code':'12345',
          'project_name':'12345',
          'site':'WIH',
          'system_model_pn':'PN12345',
          'id_cmf_file_data':'20181230102_FILE',
          'product_spec':'15',
          'sku_desc':'THIS IS DESC',
        },
        'bomDesignee': [
          {
            'id': '5a07d061-e862-49b8-abac-7471b6bde4c3',
            'user_id': '10709306',
            'function_team_name': '',
          },
          {
            'id': '2cfd1780-083c-491e-b7f7-94b5788b9cd6',
            'user_id': '10411304',
            'function_team_name': 'Tooling',
          },
          {
            'id': '22df19f8-33f1-445gitf-bea3-a7e927e96a41',
            'user_id': '10503307',
            'function_team_name': 'Thermal',
          },
        ],
      }
      api.put(`bom/bomDatas/${id}`)
        .send(body)
        .expect(401, done)
    })
  })

  describe('api GET bom/<bimID>/bomAssignList', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () =>  {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () =>  {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })

    it('should return 200, get bomAssign list', (done) => {
      let id = '113'
      api.get(`bom/${id}/bomAssignList`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('assignList')
          expect(res.body).to.have.property('approvalAble')
          expect(res.body).to.have.property('completeAble')
          expect(res.body.assignList).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      let id = '2'
      api.get(`bom/${id}/bomAssignList`)
        .expect(401, done)
    })

  })
  // describe('api upload image', () => {
  //   it('should return 200 response with image id', (done) => {
  //     let filePath = path.resolve(__dirname, '../image/test.png')
  //     api.post('bom/upload')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .attach('image', filePath)
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('id')
  //         expect(res.body.id).to.be.a('string')
  //         done()
  //       })
  //   })
  //   it('should return 401 response without Authorization', (done) => {
  //     let filePath = path.resolve(__dirname, '../image/test.png')
  //     api.post('bom/upload')
  //       .attach('image', filePath)
  //       .expect(401, done)
  //   })
  //   it('should return 413 response with oversize image', (done) => {
  //     let filePath = path.resolve(__dirname, '../image/oversizetest.jpg')
  //     api.post('bom/upload')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .attach('image', filePath)
  //       .expect(413, done)
  //   })
  // })

  describe('api upload bom item excel', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () =>  {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () =>  {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    let tmp_id = ''
    /*it('should return 200 response with bom item file', (done) => {
      let bomId = '122'
      let filePath = path.resolve(__dirname, '../bomUploadFile/G2-02-01-001 ME Input BOM_CE_051419.xlsm')
      api.post(`bom/uploadTempBomItem/${bomId}`)
        .timeout(160000)
        .set('Authorization', `Bearer ${Authorization}`)
        .attach('file', filePath)
        .expect(200)
        .end((err, res) => {
          tmp_id = res.body.upload_tmp_id
          expect(res.body).to.have.property('upload_tmp_id')
          expect(res.body).to.have.property('passCount')
          expect(res.body).to.have.property('failCount')
          expect(res.body.upload_tmp_id).to.be.a('string')
          done()
        })
    }).timeout(160000)*/

    it('should return 401 response without Authorization', (done) => {
      let bomId = '122'
      let filePath = path.resolve(__dirname, '../bomUploadFile/G2-02-01-001 ME Input BOM_CE_051419.xlsm')
      api.post(`bom/uploadTempBomItem/${bomId}`)
        .attach('files', filePath)
        .expect(401, done)
    })
/*
    it('should return 200 response with get transfer people', (done) => {
      let bomId = '122'
      api.get(`bom/uploadBomItem/${bomId}/${tmp_id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('uploadItemOwner')
          expect(res.body).to.have.property('bomDesignee')
          done()
        })
    })

    it('should return 200 response start transfer data', (done) => {
      let bomId = '122'
      let body = {
        "bomID": bomId,
        "transferOwner": [
          {
            source: 'Kit Chen',
            destion: '3b715fa6-a7db-4c07-a5eb-16322038101f',
          },
          {
            source: 'Test',
            destion: '2ed741e8-3436-4e6a-bc87-4a5f9e163169',
          }
        ]
      }
      api.post(`bom/confirmUploadBomItem/${tmp_id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('version_id')
          done()
        })
    })

    it('should delete tmp bom item data', (done) => {
      api.delete(`bom/uploadTempBomItem/${tmp_id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200, done)
    })
*/
    it('should delete upload bom item record', (done) => {
      let bomId = '122'
      let stage_id = '2'
      api.delete(`bom/uploadBomItemRecord/${bomId}/${stage_id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200, done)
    })
  })
/*
  describe('api get bom part list item', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10403304')
    before(async () =>  {
      await helper.insertToken(Authorization_for_permission, '10403304')
    })
    after(async () =>  {
      await helper.deleteAuthToken(Authorization_for_permission, '10403304')
    })

    it('should return 200 response with get bom part list item', (done) => {
      let bom_item_Id = '6e1671d4-c92b-4a5b-92c0-d629f41899b0'
      api.get(`bom/bomItems/partlist/${bom_item_Id}`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('partlist_value')
          done()
        })
    }).timeout(160000)

    it('should return 401 response without Authorization', (done) => {
      let bom_item_Id = '1a91cbcb-3996-422c-ac8f-b2ac8417d963'
      api.get(`bom/bomItems/partlist/${bom_item_Id}`)
        .expect(401, done)
    })
  })
*/
  describe('api get partlist default info', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () =>  {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () =>  {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*
    it('should return 200 response with partlist default info', (done) => {
      let bom_id = '52407e4c-7b69-11e9-88b7-0242ac110002'
      let type1 = 'Housing'
      let type2 = 'Plastic'
      let key = 'hpmaterial'
      api.get(`bom/partlist/getInfo/${bom_id}/${type1}/${type2}/${key}`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('item')
          done()
        })
    })
    */
    it('should return 401 response without Authorization', (done) => {
      let bom_id = '52407e4c-7b69-11e9-88b7-0242ac110002'
      let type1 = 'Housing'
      let type2 = 'Plastic'
      let key = 'hpmaterial'
      api.get(`bom/partlist/getInfo/${bom_id}/${type1}/${type2}/${key}`)
        .expect(401, done())
    })
  })

  describe('api get die count and type', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with die count and type', (done) => {
      let stageDie = 10
      let progressiveDie = 15
      let rivetingDie = 13
      api.get(`bom/partlist/getDieInfo/${stageDie}/${progressiveDie}/${rivetingDie}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let stageDie = 10
      let progressiveDie = 15
      let rivetingDie = 13
      api.get(`bom/partlist/getDieInfo/${stageDie}/${progressiveDie}/${rivetingDie}`)
        .expect(401, done())
    })
  })

  describe('api get material expand size width and length', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with material expand size width and length', (done) => {
      let hmpartsexpandwidth = 10
      let hmpartsexpandlength = 20
      let hmToolingMaterialWidth = 25
      let hmToolingMaterialLength = 30
      api.get(`bom/partlist/getMaterialExpandSize/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmToolingMaterialWidth}/${hmToolingMaterialLength}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hmpartsexpandwidth = 10
      let hmpartsexpandlength = 20
      let hmToolingMaterialWidth = 25
      let hmToolingMaterialLength = 30
      api.get(`bom/partlist/getMaterialExpandSize/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmToolingMaterialWidth}/${hmToolingMaterialLength}`)
        .expect(401, done())
    })
  })
  describe('api get net weight', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with net weight', (done) => {
      let hmthickness = 10
      let hmpartsexpandwidth = 20
      let hmpartsexpandlength = 25
      let hmmaterial = 'AL5052'
      api.get(`bom/partlist/netWeight/${hmthickness}/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmmaterial}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hmthickness = 10
      let hmpartsexpandwidth = 20
      let hmpartsexpandlength = 25
      let hmmaterial = 'AL5052'
      api.get(`bom/partlist/netWeight/${hmthickness}/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmmaterial}`)
        .expect(401, done())
    })
  })

  describe('api get gross weight', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with gross weight', (done) => {
      let hmthickness = 20
      let hmpartsexpandwidth = 40
      let hmpartsexpandlength = 55
      let hmmaterial = 'AL5052'
      api.get(`bom/partlist/grossWeight/${hmthickness}/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmmaterial}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hmthickness = 20
      let hmpartsexpandwidth = 40
      let hmpartsexpandlength = 55
      let hmmaterial = 'AL5052'
      api.get(`bom/partlist/grossWeight/${hmthickness}/${hmpartsexpandwidth}/${hmpartsexpandlength}/${hmmaterial}`)
        .expect(401, done())
    })
  })

  describe('api get stage die machine ton and Price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*it('should return 200 response with stage die machine ton and Price', (done) => {
      let hmToolingStageDieCount = 20
      let hmToolingMaterialExpandWidth = 40
      let hmToolingMaterialExpandLength = 55
      api.get(`bom/partlist/stageDiePress/${hmToolingStageDieCount}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })*/
    it('should return 401 response without Authorization', (done) => {
      let hmToolingStageDieCount = 20
      let hmToolingMaterialExpandWidth = 40
      let hmToolingMaterialExpandLength = 55
      api.get(`bom/partlist/stageDiePress/${hmToolingStageDieCount}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(401, done())
    })
  })

  describe('api get progress die machine ton and Price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with progress die machine ton and Price', (done) => {
      let hmToolingProgressDieCount = 10
      let hmToolingProgressiveDieStation = 10
      let hmToolingMaterialExpandWidth = 40
      let hmToolingMaterialExpandLength = 55
      api.get(`bom/partlist/progressiveDiePress/${hmToolingProgressDieCount}/${hmToolingProgressiveDieStation}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hmToolingProgressDieCount = 10
      let hmToolingProgressiveDieStation = 10
      let hmToolingMaterialExpandWidth = 40
      let hmToolingMaterialExpandLength = 55
      api.get(`bom/partlist/progressiveDiePress/${hmToolingProgressDieCount}/${hmToolingProgressiveDieStation}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(401, done())
    })
  })

  describe('api get riveting die machine ton and Price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*it('should return 200 response with riveting die machine ton and Price', (done) => {
      let hmToolingRivetingDieCount = 10
      let hmToolingMaterialExpandWidth = 55
      let hmToolingMaterialExpandLength = 20
      api.get(`bom/partlist/rivetingDiePress/${hmToolingRivetingDieCount}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })*/
    it('should return 401 response without Authorization', (done) => {
      let hmToolingRivetingDieCount = 10
      let hmToolingMaterialExpandWidth = 55
      let hmToolingMaterialExpandLength = 20
      api.get(`bom/partlist/rivetingDiePress/${hmToolingRivetingDieCount}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(401, done())
    })
  })

  describe('api get glue weight', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with glue weight', (done) => {
      let productType = 'NB'
      let cmfProcessListThermalBondingPathLength = 10
      let cmfProcessListThermalBondingGlueSyringeDiameter = 40
      api.get(`bom/partlist/getGlueWeight/${productType}/${cmfProcessListThermalBondingPathLength}/${cmfProcessListThermalBondingGlueSyringeDiameter}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let productType = 'NB'
      let cmfProcessListThermalBondingPathLength = 10
      let cmfProcessListThermalBondingGlueSyringeDiameter = 40
      api.get(`bom/partlist/getGlueWeight/${productType}/${cmfProcessListThermalBondingPathLength}/${cmfProcessListThermalBondingGlueSyringeDiameter}`)
        .expect(401, done())
    })
  })

  describe('api get housing plastic material selector content', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with housing plastic material selector content', (done) => {
      let type2 = 'Double_Injection'
      api.get(`bom/partlist/confirm/${type2}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let type2 = 'Double_Injection'
      api.get(`bom/partlist/confirm/${type2}`)
        .expect(401, done())
    })
  })

  describe('api confirm whether column can fill or not', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with confirm whether column can fill or not', (done) => {
      let type2 = 'Double_Injection'
      api.get(`bom/partlist/getPartWeightEnable/${type2}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let type2 = 'Double_Injection'
      api.get(`bom/partlist/getPartWeightEnable/${type2}`)
        .expect(401, done())
    })
  })

  describe('api get plastic machine ton', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with plastic machine ton', (done) => {
      let type2 = 'Double Injection'
      let hpToolingSizeWidth = 10
      let hpToolingSizeLength = 10
      let hpToolingSizeHigh = 20
      api.get(`bom/partlist/machineTon/${type2}/${hpToolingSizeWidth}/${hpToolingSizeLength}/${hpToolingSizeHigh}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let type2 = 'Double Injection'
      let hpToolingSizeWidth = 10
      let hpToolingSizeLength = 10
      let hpToolingSizeHigh = 20
      api.get(`bom/partlist/machineTon/${type2}/${hpToolingSizeWidth}/${hpToolingSizeLength}/${hpToolingSizeHigh}`)
        .expect(401, done())
    })
  })

  describe('api get plastic painting color', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*it('should return 200 response with plastic painting color', (done) => {
      let cmfPPaintingType = 'UV painting'
      api.get(`bom/partlist/getPaintingColor/${cmfPPaintingType}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })*/
    it('should return 401 response without Authorization', (done) => {
      let cmfPPaintingType = 'UV painting'
      api.get(`bom/partlist/getPaintingColor/${cmfPPaintingType}`)
        .expect(401, done())
    })
  })

  describe('api get plastic painting vendor', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*it('should return 200 response with plastic painting vendor', (done) => {
      let cmfPPaintingType = 'PU painting'
      api.get(`bom/partlist/getPaintingVendor/${cmfPPaintingType}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })*/
    it('should return 401 response without Authorization', (done) => {
      let cmfPPaintingType = 'UV painting'
      api.get(`bom/partlist/getPaintingVendor/${cmfPPaintingType}`)
        .expect(401, done())
    })
  })

  describe('api get plastic machine Price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with plastic machine Price', (done) => {
      let hpToolingMachineTon = '50T'
      let hpModule = 'module3'
      api.get(`bom/partlist/machinePrice/${hpToolingMachineTon}/${hpModule}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hpToolingMachineTon = '50T'
      let hpModule = 'module3'
      api.get(`bom/partlist/machinePrice/${hpToolingMachineTon}/${hpModule}`)
        .expect(401, done())
    })
  })

  describe('api get housing metal material Price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with housing metal material Price', (done) => {
      let hmmaterial = 'AL5052'
      let hmthickness = 0.8
      api.get(`bom/partlist/gethmMaterialPrice/${hmmaterial}/${hmthickness}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let hmmaterial = 'AL5052'
      let hmthickness = 0.8
      api.get(`bom/partlist/gethmMaterialPrice/${hmmaterial}/${hmthickness}`)
        .expect(401, done())
    })
  })

  describe('api get interval price', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with interval price', (done) => {
      let bom_id = '52407e4c-7b69-11e9-88b7-0242ac110002'
      let hmToolingMaterialExpandWidth = 10
      let hmToolingMaterialExpandLength = 15
      api.get(`bom/partlist/getIntervalPrice/${bom_id}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(200)
        .end((err, res) => {
          //expect(res.body).to.have.property('values')
          done()
        })
    })
    it('should return 401 response without Authorization', (done) => {
      let bom_id = '52407e4c-7b69-11e9-88b7-0242ac110002'
      let hmToolingMaterialExpandWidth = 10
      let hmToolingMaterialExpandLength = 15
      api.get(`bom/partlist/getIntervalPrice/${bom_id}/${hmToolingMaterialExpandWidth}/${hmToolingMaterialExpandLength}`)
        .expect(401, done())
    })
  })


/*
  describe('api update bom part list item', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () =>  {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () =>  {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    it('should return 200 response with update bom part list item', (done) => {
      let reqBody = {
        "formate":"housing-plastic",
        "partlistValue":{
          "Price": {
            "Fan": {
              "fanLabel": "Fan",
              "fanAmount": 2,
              "fanType": "Axial(軸流扇)",
              "fanSize": "60*60*3.5",
              "fanSizePrice": null,
              "motorArchitecture": "1_phase_H<=7.5",
              "motorArchitecturePrice": null,
              "bearingAndSleeve": "Sleeve+塑膠_H<=7.5",
              "bearingAndSleevePrice": null,
              "fanBladeMaterial": "PBT_H<=7.5",
              "fanBladeMaterialPrice": null,
              "magnetMaterialAndSize": "橡膠_H<=7.5",
              "magnetMaterialAndSizePrice": null,
              "hasHalogen": true,
              "fanAppearanceProcess1": "塗黑",
              "fanAppearanceProcess2": "塗黑"
            },
            "Pipe": {
              "pipeLabel": "Pipe",
              "pipeAmount": 1,
              "pipeType": "Powder(結燒管)",
              "outerDiameter": "D8_",
              "pipeLength": 1,
              "pipiLenODiaToCost": null,
              "pipeFlatteningThickness": 0.3,
              "pipiFlThickODiaToCost": null,
              "pipeAppearanceProcess1": "塗黑",
              "pipeAppearanceProcess2": "塗黑"
            },
            "Fin": {
              "finLabel": "Fin",
              "finAmount": 1,
              "finMaterial": "AL1050",
              "finPitch": 1111,
              "finProductionLength": 2,
              "finProductionWidth": 2,
              "finProductionHigh": 3,
              "finProductionExpandLength": 5,
              "finProductionExpandWidth": 6,
              "finMaterialCostPerKilogram": 3.6,
              "finDensity": null,
              "finMaterialThickness": 0.15,
              "finNickelPlating": true,
              "finAppearanceProcess1": "塗黑",
              "finAppearanceProcess2": "塗黑"
            },
            "ThermalPlate": {
              "thPlLabel": "ThermalPlate",
              "thPlAmount": 1,
              "thPlMaterial": "CU1100",
              "thPlMaterialCostPerKilogram": 4.5,
              "thPlMaterialThickness": 0.6,
              "thPlProductionLength": 1,
              "thPlProductionWidth": 2,
              "thPlProductionHigh": 3,
              "thPlProductionExpandLength": 4,
              "thPlProductionExpandWidth": 5,
              "thPlNickelPlating": true,
              "thPlAppearanceProcess1": "塗黑",
              "thPlAppearanceProcess2": "塗黑",
              "thPlDensity": null
            },
            "ThermalBlock": {
              "thBlLabel": "ThermalBlock",
              "thBlAmount": 1,
              "thBlMaterial": "CU1100",
              "thBlMaterialCostPerKilogram": 8.2,
              "thBlMaterialThickness": 0.2,
              "thBlProductionLength": 11,
              "thBlProductionWidth": 22,
              "thBlNickelPlating": true,
              "thBlDensity": 8.9
            },
            "Screw": {
              "screwLabel": "Screw",
              "screwAmount": 2,
              "screwToothpath": 3,
              "screwHeadDiameter": 4,
              "screwHeadThickness": 1,
              "screwLength": 2,
              "screwPolishedRod": true,
              "screwNeckDiameter": 3,
              "screwNeckLength": 4,
              "screwResistantFall": true
            },
            "Spring": {
              "springLabel": "Spring",
              "springAmount": 1,
              "springWireDiameter": 2,
              "springCoilCenterDiameter": 3,
              "springFreeLong": 4
            },
            "ORing": {
              "oRLabel": "O-Ring",
              "oRAmount": 11,
              "oROuterDiameter": 2,
              "oRInnerDiameter": 3,
              "oRThickness": 4
            },
            "Clip": {
              "clipLabel": "Clip",
              "clipAmount": 1,
              "clipMaterial": "KU400",
              "clipMaterialCostPerKilogram": null,
              "clipWireDiameter": 2,
              "clipProductionLength": 3,
              "clipProductionWidth": null
            },
            "PushPin": {
              "pupiLabel": null,
              "pupiAmount": 1,
              "pupiLength": 2,
              "pupiHeadDiameter": 3
            },
            "Label": {
              "labelLabel": "Label",
              "labelAmount": 1,
              "labelLength": 2,
              "labelWidth": 3,
              "labelThickness": 4
            },
            "Sponge": {
              "spongeLabel": "Sponge",
              "spongeAmount": 1,
              "spongeMaterial": "CR1015",
              "spongeLength": 333,
              "spongeWidth": 2,
              "spongeMaterialThickness": 0.8,
              "spongeMaterialCostPerMM": 1.15
            },
            "Grease": {
              "greaseLabel": "Grease",
              "greaseAmount": 33,
              "greaseMaterial": 7783,
              "greaseMaterialCost": null,
              "greaseLength": 333,
              "greaseWidth": 1,
              "greaseThickness": 2
            },
            "ThermalPad": {
              "thermalPadLabel": "Thermal Pad",
              "thermalPadAmount": 1,
              "thermalPadHeatTransferCoefficient": 6,
              "thermalPadShore": 45,
              "thermalPadThickness": 0.8,
              "thermalPadLength": 33,
              "thermalPadWidth": 222,
              "thermalPadPrice": 300
            },
            "ThermalPadMultiImage": {}
          }
        }
      }
      let bom_item_Id = '1a91cbcb-3996-422c-ac8f-b2ac8417d963'
      api.put(`bom/bomItems/partlist/${bom_item_Id}`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .send(reqBody)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('unEditCount')
          done()
        })
    })

    it('should return 401 response without Authorization', (done) => {
      let bom_item_Id = '1a91cbcb-3996-422c-ac8f-b2ac8417d963'
      api.put(`bom/bomItems/partlist/${bom_item_Id}`)
        .expect(401, done)
    })
  })*/
  describe('api update bom item cost', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10411304')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10411304')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10411304')
    })
    /*it('should return 200 response with update bom item cost', (done) => {
      let reqBody = {
        "bomItems": [{
          "id": "95539ad0-86cb-11e9-82d9-0242ac110002",
          "sourcer_cost": null,
          "spa_cost": {
            "cost": null,
            "material_name": null

          },
          "suggestion_cost_type": null
        }, {
          "id": "a647bb14-86cb-11e9-8d7f-0242ac110002",
          "sourcer_cost": "102",
          "spa_cost": {
            "cost": "102",
            "material_name": "RFG113"
          },
          "suggestion_cost_type": "system_cost"
        }]
      }
      let bom_Id = '190'
      api.put(`bom/${bom_Id}/bomItems/cost/`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .send(reqBody)
        .expect(200)
        .end((err, res) => {
          done()
        })
    })*/
    it('should return 401 response without Authorization', (done) => {
      let bom_Id = '190'
      api.put(`bom/${bom_Id}/bomItems/cost/`)
        .expect(401, done)
    })
  })
  /*
  describe('api GET Me Bom Excel', () => {
    const Authorization_for_permission = helper.genToken('TEST USER', '10700001')
    before(async () => {
      await helper.insertToken(Authorization_for_permission, '10700001')
    })
    after(async () => {
      await helper.deleteAuthToken(Authorization_for_permission, '10700001')
    })
    it('should return 200 response, and get meBom excel', (done) => {
      let bom_id = '120'
      let sku = 'sku3'
      const fileDate = moment(new Date()).format('YYYYMMDD')
      api.get(`bom/${bom_id}/export/${sku}`)
        .set('Authorization', `Bearer ${Authorization_for_permission}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect('content-disposition', `attachment; filename="Eprocurement_BOM_ME_12345_${fileDate}.xlsx"`)
          done()
        })
    })
    it('should return 401 response without Authorization', (done) =>　{
      let bom_id = '120'
      let sku = 'sku3'
      api.get(`bom/${bom_id}/export/${sku}`)
        .expect(401, done)
    })
  })*/
})
