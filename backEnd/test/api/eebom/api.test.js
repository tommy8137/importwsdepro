const supertest = require('supertest')

const helper = require('../api-test-helper')
const { expect } = require('chai')
const api = supertest(helper.testHost)
let Authorization = helper.genEEToken()
const path = require('path')
const moment = require('moment')



describe('ee bom', () => {
  before(async () =>  {
    Authorization = helper.genEEToken()
    await helper.insertEEToken(Authorization)
    /* await api.put('admin/user/10503307')
      .set('Authorization', `Bearer ${Authorization}`)
      .send( {
        isCe: true,
        isRd: true,
        isSourcer: false,
        isMe: true,
        isEe: true,
        isMeTmFm: false,
        isPm: false,
        isAccount: false,
        isContactWindow:false,
      })
      .expect(200)
    await api.put('setting/assign')
      .set('Authorization', `Bearer ${Authorization}`)
      .send({
        pic: null,
        pic_emplid: '10503307',
        proxy: null,
        proxy_emplid: '10503307',
        type1: 'ASIC',
      })
      .expect(200) */ 
  })
  after(async () =>  {
    await helper.deleteEEAuthToken(Authorization)
  })
  describe('api GET bom/bomDatas', () => {
    it('should return 200, get ee bomDatas main list', (done) => {
      let page = '1'
      let items = '10'
      let orderBy = 'customer'
      let role = 'EE'
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
      let orderBy = 'customer'
      let role = 'EE'
      api.get(`bom/bomDatas?pages=${page}&items=${items}&orderBy=${orderBy}&role=${role}`)
        .expect(401, done)
    })
  })


  describe('api GET /eeBom/main/project/ info', () => {
    it('should return 200, get ee bomData  main list info', (done) => {
      let page = '1'
      let items = '10'
      let orderBy = 'customer'
      let role = 'EE'
      api.get('eeBom/main/project/1234_k1')
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

      api.get('eeBom/main/project/1234_k1')
        .expect(401, done)
    })
  })

  describe('api update /eeBom/main/project/:id', () => {
    it('should return 200, update ee bomData  main list info', (done) => {

      api.put('eeBom/main/project/1234_k1')
        .set('Authorization', `Bearer ${Authorization}`)
        .send({
          'version_remark':'224',
        })
        .expect(200, done)

    })

    it('should return a 401 response without Authorization ', (done) => {

      api.put('eeBom/main/project/1234_k1')
        .expect(401, done)
    })
  })

  describe('api get /eeBom/edm/version/:project_code', () => {
    it('should return 200, get ee bomData  main list info', (done) => {

      api.get('eeBom/main/project/1234')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {

      api.get('eeBom/main/project/1234')
        .expect(401, done)
    })
  })

  describe('api get /eeBom/detail/project/tab/projectID/:eebom_project_id/edmID/:edm_version_id', () => {
    it('should return 200,it should get eebom detail list tabs', (done) => {
      api.get('eeBom/detail/project/tab/projectID/5e252719-f526-4e3a-89be-6ab638189104/edmID/ef219f9e-1bd6-11ea-8fcb-0242ac110002')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('eeBom/main/project/1234')
        .expect(401, done)
    })
  })

  describe('api get /eeBom/detail/project/type/:type/edm_version/:edm_version_id', () => {
    it('should return 200, get ee bomData  it should get eebom personal detail list', (done) => {

      api.get('eeBom/detail/project/type/personal/edm_version/243c6ce6-600b-11e9-9e86-0242ac110001')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('picCount')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })

    it('should return 200, get ee bomData  it should get eebom proxy detail list', (done) => {
      api.get('eeBom/detail/project/type/proxy/edm_version/243c6ce6-600b-11e9-9e86-0242ac110001')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('picCount')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })

    /* it('should return 200, get ee bomData  it should get eebom all detail list', (done) => {
      api.get('eeBom/detail/project/type/all/edm_version/243c6ce6-600b-11e9-9e86-0242ac110001')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('totalType2')
          expect(res.body).to.have.property('totalSuggestionCost')
          expect(res.body).to.have.property('totalCost')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })*/
    it('should return a 401 response without Authorization ', (done) => {
      api.get('eeBom/main/project/1234')
        .expect(401, done)
    })
  })

  /*describe('api get /eeBom/detail/project/all/type/:type/edm_version/:edm_version_id', () => {
    /* it('should return 200, it should get eebom detail list tabs', (done) => {
      api.get('eeBom/detail/project/all/type/pn/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('totalType2')
          expect(res.body).to.have.property('totalPartsCount')
          expect(res.body).to.have.property('totalSuggestionCost')
          expect(res.body).to.have.property('totalCost')
          expect(res.body).to.have.property('isPCBApproved')
          expect(res.body).to.have.property('isBomApproved')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })*/
  /* it('should return 200,it should get eebom detail list tabs', (done) => {
      api.get('eeBom/detail/project/all/type/moudle/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('totalType2')
          expect(res.body).to.have.property('totalPartsCount')
          expect(res.body).to.have.property('totalSuggestionCost')
          expect(res.body).to.have.property('totalCost')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })
    it('should return a 401 response without Authorization ', (done) => {
      api.get('eeBom/main/project/1234')
        .expect(401, done)
    })
  })*/
  describe('api get /eeBom/detail/project/all/type/:type/edm_version/:edm_version_id', () => {
    /*it('should return 200,it should get eebom detail list tabs', (done) => {
      api.get('eeBom/detail/project/all/type/pn/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('totalType2')
          expect(res.body).to.have.property('totalPartsCount')
          expect(res.body).to.have.property('totalSuggestionCost')
          expect(res.body).to.have.property('totalCost')
          expect(res.body).to.have.property('isPCBApproved')
          expect(res.body).to.have.property('isBomApproved')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })*/
    /*
    it('should return 200,it should get eebom detail list tabs', (done) => {
      api.get('eeBom/detail/project/all/type/moudle/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('checked')
          expect(res.body).to.have.property('totalType2')
          expect(res.body).to.have.property('totalPartsCount')
          expect(res.body).to.have.property('totalSuggestionCost')
          expect(res.body).to.have.property('totalCost')
          expect(res.body).to.have.property('isPCB')
          expect(res.body).to.have.property('pcbInfo')
          expect(res.body).to.have.property('infos')
          done()
        })
    })*/
    it('should return a 401 response without Authorization ', (done) => {
      api.get('eeBom/main/project/1234')
        .expect(401, done)
    })
  })
  describe('api GET eeBom/export/:edm_version_id', () => {
    /* it('should return 200 response, and get eebom excel', (done) => {
      let edm_version_id = 'ed535eaf-d40b-4420-8d7c-f58829bf5824'
      const fileDate = moment(new Date()).format('YYYYMMDD')
      api.get(`eeBom/export/${edm_version_id}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect('content-disposition', `attachment; filename="Eprocurement_BOM_EE_null_${fileDate}.xlsx"`)
          done()
        })

    })*/
    it('should return 401 response without Authorization', (done) => {
      let edm_version_id = 'ed535eaf-d40b-4420-8d7c-f58829bf5824'
      api.get(`eeBom/export/${edm_version_id}`)
        .expect(401, done)
    })
  })
})