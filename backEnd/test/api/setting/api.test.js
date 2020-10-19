// const { test } = require('../../../config.json')
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()



describe('Setting', () => {
  // before(async () =>  {
  //   await helper.insertToken(Authorization)
  // })
  // after(async () =>  {
  //   await helper.deleteAuthToken(Authorization)
  // })
  

  // describe('api GET /setting/list', () => {
  //   it('should return 200, get ee assignment list', (done) => {
  //     api.get('setting/list')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           done(err)
  //         }
  //         // Body validation
  //         expect(res.body).to.have.property('list')
  //         expect(res.body.list).to.be.a('array')
  //         done()
  //       })
  //   })
  //   it('should return a 401 response without Authorization ', (done) => {
  //     api.get('setting/list')
  //       .expect(401, done)
  //   })
  // })
  // describe('api PUT /setting/assign', () => {
  //   it('should return 200, get assign success response', (done) => {
  //     api.put('setting/assign')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send({
  //         'type1':'LED',
  //         'pic':null,
  //         'pic_emplid':null,
  //         'proxy':null,
  //         'proxy_emplid':null,
  //       })
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           done(err)
  //         }
  //         expect(res.status).is.equal(200)
  //         // Body validation
  //         done()
  //       })
  //   })
  //   it('should return 401 response without Authorization', (done) => {
  //     api.put('setting/assign')
  //       .send({
  //         'type1':'LED',
  //         'pic':'tommy tsai',
  //         'pic_emplid':'10611079',
  //         'proxy':'test user',
  //         'proxy_emplid':'10811024',
  //       })
  //       .expect(401, done)
  //   })
  // })
})
