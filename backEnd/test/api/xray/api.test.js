
const { systemDB } = require('../../../server/helpers/database')
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const api = supertest(helper.testHost)
const Authorization = helper.genToken('ADMIN', '10700001')
let postGroupID
let specGroupName = 'SPEC_group_test'
const xrayModel = require('../../../server/model/xray/xray.js')
let Authorization_EE_role
let type1 = []
let type2 = []
let spec1 = []
const tsystemDB = require('../../../server/helpers/database/tPostgres.js')

describe('Xray', () => {
  before(async () =>  {
    await helper.insertToken(Authorization, '10700001')
    await checkTestGroup()
    // CE:EE
    // await api.put('admin/user/10510038')
    //   .set('Authorization', `Bearer ${Authorization}`)
    //   .send({
    //     isContactWindow: false,
    //     isCe: true,
    //     isRd: false,
    //     isSourcer: false,
    //     isPm: false,
    //     isAccount: false,
    //     isMe: false,
    //     isEe: true,
    //     isMeTmFm: false,
    //   })
    //   .expect(200)
    // Authorization_EE_role = helper.genToken('ZOE_JY_CHEN', '10510038')
    // await helper.insertToken(Authorization_EE_role, '10510038')

  })

  async function checkTestGroup() {
    let result = await systemDB.Query(`select g_id from wiprocurement.specgroup where g_name = '${specGroupName}';`)
    if(result.rowCount > 0) {
      let client = await new tsystemDB()
      await xrayModel.deleteGroupSpec(client, result.rows[0].g_id)
      await client.commit()
    }
    return
  }

  after(async () => {
    await helper.deleteAuthToken(Authorization, '10700001')
    // await helper.insertToken(Authorization_EE_role, '10510038')
  })

  describe('api GET xray/productType/:role', () => {
    it('should return 200, get productType list', (done) => {
      api.get('xray/productType/EE')
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

    it('should return 401, with out Token retrun permission error', (done) => {
      api.get('xray/productType/EE')
        .expect(401, done)
    })

    it('should return 405, with error role retrun METHOD_WRONG error', (done) => {
      api.get('xray/productType/CE')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })

    // it('should return 401, role=CE:EE get ME api return permission error', (done) => {
    //   api.get('xray/productType/ME')
    //     .set('Authorization', `Bearer ${Authorization_EE_role}`)
    //     .expect(400, done)
    // })
  })

  describe('api GET xray/type1/:role', () => {
    let body = {
      productType : ['NB', 'Audio']
    }
    it('should return 200, get type1 list', (done) => {
      api.post('xray/type1/EE')
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          type1 = res.body
          // Body validation
          expect(res.body).to.be.a('array')
          done()
        })
    })

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/type1/EE')
        .send(body)
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.post('xray/type1/CE')
        .send(body)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })

    // it('should return 400, role=CE:EE get ME api return permission error', (done) => {
    //   api.post('xray/type1/ME')
    //     .send(body)
    //     .set('Authorization', `Bearer ${Authorization_EE_role}`)
    //     .expect(400, done)
    // })
  })

  describe('api GET xray/type2/:role', () => {
    let body = {
      productType : ['Desktop', 'Audio'],
      type1: 'Connector',
    }

    if (type1.length > 0 ) {
      body = {
        productType : ['Desktop', 'Audio'],
        type1: type1[0],
      }

      it('should return 200, get type2 list', (done) => {
        api.post('xray/type2/EE')
          .set('Authorization', `Bearer ${Authorization}`)
          .send(body)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            type2 = res.body
            // Body validation
            expect(res.body).to.be.a('array')
            done()
          })
      })
    }

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/type2/EE')
        .send(body)
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.post('xray/type2/CE')
        .send(body)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })

    // it('should return 400, role=CE:EE get ME api return permission error', (done) => {
    //   api.post('xray/type2/ME')
    //     .send(body)
    //     .set('Authorization', `Bearer ${Authorization}`)
    //     .expect(400, done)
    // })
  })

  describe('api GET xray/sourcers/:role', () => {

    let body = {
      productType : ['Desktop', 'Audio'],
      type1:'Connector',
      type2:'SD card',
    }

    if (type1.length > 0 && type2.length > 0) {
      body = {
        productType : ['Desktop', 'Audio'],
        type1: type1[0],
        type2: type2[0],
      }

      it('should return 200, get sourcer list', (done) => {
        api.post('xray/sourcers/EE')
          .set('Authorization', `Bearer ${Authorization}`)
          .send(body)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            // Body validation
            expect(res.body).to.have.property('sourcerList')
            expect(res.body.sourcerList).to.be.a('array')
            done()
          })
      })
    }

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/sourcers/EE')
        .send(body)
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.post('xray/sourcers/CE')
        .send(body)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })

    // it('should return 400, role=CE:EE get ME api return permission error', (done) => {
    //   api.post('xray/sourcers/ME')
    //     .send(body)
    //     .set('Authorization', `Bearer ${Authorization}`)
    //     .expect(400, done)
    // })
  })

  // // // ============= spec item =============

  describe('api POST xray/EE/specs', () => {
    let body = {
      productType: ['Desktop'],
      type1: 'Connector',
      type2: 'SD card',
      sourcer: [],
    }

    if (type1.length > 0 && type2.length > 0) {
      body = {
        productType : ['Desktop', 'Audio'],
        type1: type1[0],
        type2: type2[0],
        sourcer: [],
      }
      it('should return 200, get sourcer list', (done) => {
        api.post('xray/EE/specs')
          .set('Authorization', `Bearer ${Authorization}`)
          .send(body)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            spec1 = res.body.spec.spec01
            // Body validation
            expect(res.body.spec).to.be.a('object')
            expect(res.body.specTitle).to.be.a('array')
            done()
          })
      })
    }

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/EE/specs')
        .send(body)
        .expect(401, done)
    })
  })

  describe('api POST xray/ME/specs', () => {
    let body = {
      productType: ['Sever'],
      type1: 'ME-Others',
      type2: 'Niche',
      sourcer: [],
      specN: 1,
      spec: {
        spec01: [], spec02: [], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
        spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
        spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: []
      },
    }

    if (type1.length > 0 && type2.length > 0) {
      body = {
        productType: ['Sever'],
        type1: type1[0],
        type2: type2[0],
        sourcer: [],
        specN: 1,
        spec: {
          spec01: [], spec02: [], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
          spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
          spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: []
        },
      }

      it('should return 200, get sourcer list', (done) => {
        api.post('xray/ME/specs')
          .set('Authorization', `Bearer ${Authorization}`)
          .send(body)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            // Body validation
            expect(res.body.spec).to.be.a('array')
            expect(res.body.specTitle).to.be.a('array')
            expect(res.body.key).to.be.a('string')
            done()
          })
      })
    }

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/ME/specs')
        .send(body)
        .expect(401, done)
    })
  })

  // // ====ref part number ====

  describe('api POST xray/partNumber/:role', () => {
    let body = {
      partNumber: '46.3CT08.001',
    }

    // it('should return 200, xray/partNumber/ME', (done) => {
    //   api.post('xray/partNumber/ME')
    //     .set('Authorization', `Bearer ${Authorization}`)
    //     .send(body)
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) {
    //         done(err)
    //       }
    //       // Body validation
    //       expect(res.body.productType).to.be.a('array')
    //       expect(res.body.type1).to.be.a('string')
    //       expect(res.body.type2).to.be.a('string')
    //       expect(res.body.spec).to.be.a('object')
    //       expect(res.body.specTitle).to.be.a('array')
    //       done()
    //     })
    // })

    it('should return 401, with out Token retrun permission error', (done) => {
      api.post('xray/partNumber/ME')
        .send(body)
        .expect(401, done)
    })

    // it('should return 400, role=CE:EE get ME api return permission error', (done) => {
    //   api.post('xray/partNumber/ME')
    //     .set('Authorization', `Bearer ${Authorization_EE_role}`)
    //     .send(body)
    //     .expect(400, done)
    // })
  })

  // // ======== spec group ======

  describe('api POST /specgroup', () => {
    it('should return 200, post Spec group with id & spec items', (done) => {
      let group = {
        specGroupName,
        sourcerList: [],
        role: 'ME',
        productType: ['LCM Business'],
        type1: 'Cable',
        type2: 'FPC',
        specGroup: {
          spec01: ['100.76'], spec02: ['24.48'], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
          spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
          spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
        },
      }

      api.post('xray/specgroup')
        .set('Authorization', `Bearer ${Authorization}`)
        .send(group)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }

          // Body validation
          expect(res.body.specGroupID).to.be.a('number')
          postGroupID = res.body.specGroupID
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.post('xray/specgroup')
        .expect(401, done)
    })
  })


  describe('api GET /xray/specgroups/:role', () => {
    it('should return 200, GET /xray/specgroups/ME', (done) => {
      api.get('xray/specgroups/ME')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.have.property('specGroupList')
          expect(res.body.specGroupList).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('xray/specgroups/ME')
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.get('xray/specgroups/CE')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })
  })

  describe('api GET /xray/specgroup/:role', () => {
    it('should return 200, GET /xray/specgroup/ME?groupID=postGroupID', (done) => {
      api.get(`xray/specgroup/ME?groupID=${postGroupID}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.be.a('object')
          expect(res.body.specGroupName).to.be.a('string')
          expect(res.body.specGroupID).to.be.a('number')
          expect(res.body.productType).to.be.a('array')
          expect(res.body.type1).to.be.a('string')
          expect(res.body.type2).to.be.a('string')
          expect(res.body.specTitle).to.be.a('array')
          expect(res.body.specGroup).to.be.a('object')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get(`xray/specgroup/ME?groupID=${postGroupID}`)
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.get(`xray/specgroup/CE?groupID=${postGroupID}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })
  })

  describe('api PUT /specgroup', () => {
    let group = {
      specGroupName,
      sourcerList: [],
      role: 'ME',
      productType: ['LCM Business'],
      type1: 'Cable',
      type2: 'FPC',
      specGroup: {
        spec01: ['100.76', '16.67'], spec02: ['24.48', '89.82'], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
        spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
        spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
      },
    }

    it('should return 200, put Spec group with id & spec items', (done) => {

      if (postGroupID != null ) {
        api.put('xray/specgroup/' + postGroupID)
          .set('Authorization', `Bearer ${Authorization}`)
          .send(group)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            // Body validation
            expect(res.body.specGroupID).to.be.a('number')
            postGroupID = res.body.specGroupID
            done()
          })
      } else {
        done('api PUT /specgroup Error, get group id null')
      }

    })

    it('should return a 401 response without Authorization ', (done) => {
      api.put('xray/specgroup/' + postGroupID)
        .expect(401, done)
    })

    it('should return a 422 response with error group ID ', (done) => {
      api.put('xray/specgroup/' + 'postGroupID')
        .set('Authorization', `Bearer ${Authorization}`)
        .send(group)
        .expect(422, done)
    })
  })

  describe('api DELETE /specgroup', () => {
    it('should return 200, delete Spec group with id', (done) => {
      if (postGroupID != null ) {
        api.delete('xray/specgroup/' + postGroupID)
          .set('Authorization', `Bearer ${Authorization}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            // Body validation
            expect(res.body.specGroupID).to.be.a('number')
            done()
          })
      } else {
        done('api DELETE /specgroup Error, get group id null')
      }
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.delete('xray/specgroup/' + postGroupID)
        .expect(401, done)
    })

    it('should return a 422 response with error group ID ', (done) => {
      api.delete('xray/specgroup/' + 'postGroupID')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(422, done)
    })
  })

  // // ======== xray analysis ======

  describe('api POST xray/spa/analysis/:role', () => {

    let analysisReq = {
      dateFrom: '2018/11/01',
      dateTo: '2018/11/02',
      mrp: false,
      block: false,
      productType: ['Desktop'],
      type1: 'MLCC',
      type2: 'SMD',
      sourcer: [],
      spec: {
        spec01: [], spec02: ['100V'], spec03: [], spec04: [], spec05: [], spec06: [], spec07: [], spec08: [], spec09: [], spec10: [],
        spec11: [], spec12: [], spec13: [], spec14: [], spec15: [], spec16: [], spec17: [], spec18: [], spec19: [], spec20: [],
        spec21: [], spec22: [], spec23: [], spec24: [], spec25: [], spec26: [], spec27: [], spec28: [], spec29: [], spec30: [],
      },
    }
    if (type1.length > 0 && type2.length > 0 && spec1.length > 0) {
      analysisReq = {
        ...analysisReq,
        type1: type1[0],
        type2: type2[0],
        spec: {
          ...analysisReq['spec'],
          spec01: spec1.splice(0, 1),
          spec02: [],
        },
      }

      it('should return 200, xray spa analysis', (done) => {
        api.post('xray/spa/analysis/EE')
          .set('Authorization', `Bearer ${Authorization}`)
          .send(analysisReq)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            // Body validation
            expect(res.body.materialList).to.be.a('array')
            expect(res.body.specProperty).to.deep.equal(['spec02'])
            done()
          })
      })
    }

    it('should return a 401 response without Authorization ', (done) => {
      api.post('xray/spa/analysis/ME')
        .expect(401, done)
    })

    it('should return 405, with out role retrun METHOD_WRONG error', (done) => {
      api.post('xray/spa/analysis/CE')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(405, done)
    })

    // it('should return 400, role=CE:EE get ME api return permission error', (done) => {
    //   api.post('xray/spa/analysis/ME')
    //     .set('Authorization', `Bearer ${Authorization}`)
    //     .send(analysisReq)
    //     .expect(400, done)
    // })
  })

  // describe('api POST xray/lpp/analysis', () => {
  //   it('should return 200, xray lpp analysis', (done) => {
  //     let analysisReq = {
  //       'mrp': true,
  //       'type1': 'Memory',
  //       'type2': 'Memory Module',
  //       'spec': {
  //         'spec01': ['Memory Module', 'SODIMM', 'Unb. DIMM w/o ECC', 'Unb. DIMM with ECC'],
  //         'spec02': ['SODIMM', 'DDR2', 'DDR3'],
  //         'spec03': ['DDR3', '667', '800', '1066', '1333'],
  //         'spec04': ['1333', '2GB', '1GB', '512MB', '4GB'],
  //         'spec05': ['1GB', 'C, Tiva Die', 'H', 'C, Tiva die', 'B, Orion Die', 'F', 'D', 'B, Vega die'],
  //         'spec06': ['D', '66', '50', '54', '46', '65', '44', '35', '45', '60', '68', '56', 'n/a'],
  //         'spec07': ['65', '1Gb', '2Gb'],
  //         'spec08': [],
  //         'spec09': [],
  //         'spec10': [],
  //         'spec11': [],
  //         'spec12': [],
  //         'spec13': [],
  //         'spec14': [],
  //         'spec15': [],
  //         'spec16': [],
  //         'spec17': [],
  //         'spec18': [],
  //         'spec19': [],
  //         'spec20': [],
  //         'spec21': [],
  //         'spec22': [],
  //         'spec23': [],
  //         'spec24': [],
  //         'spec25': [],
  //         'spec26': [],
  //         'spec27': [],
  //         'spec28': [],
  //         'spec29': [],
  //         'spec30': [],
  //       },
  //     }

  //     api.post('xray/lpp/analysis')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(analysisReq)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           done(err)
  //         }
  //         // Body validation
  //         expect(res.body.materialPriceList).to.be.a('array')
  //         done()
  //       })
  //   })

  //   it('should return a 401 response without Authorization ', (done) => {
  //     api.post('xray/lpp/analysis')
  //       .expect(401, done)
  //   })
  // })
})
