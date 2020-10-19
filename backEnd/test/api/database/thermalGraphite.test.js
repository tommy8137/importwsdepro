/* eslint-env mocha */
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const verifyHelper = require('../property-verify-helper.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
describe('database/thermalGraphite', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  const thicknessRoute = 'database/thermalGraphite/thicknessPrice'
  describe(`api GET ${thicknessRoute}`, () => {
    let testRoute = thicknessRoute
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode, done)
    })
    it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode)
        .end(async (err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
          expect(res.body).to.have.property('thicknessPrice')
          expect(res.body.thicknessPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['type', 'string'],
            ['thickness', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.thicknessPrice.length; i++) {
            let item = res.body.thicknessPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.thicknessPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })

  const glueRoute = 'database/thermalGraphite/gluePrice'
  describe(`api GET ${glueRoute}`, () => {
    let testRoute = glueRoute
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode, done)
    })
    it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode)
        .end(async (err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
          expect(res.body).to.have.property('gluePrice')
          expect(res.body.gluePrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['thickness', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.gluePrice.length; i++) {
            let item = res.body.gluePrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.gluePrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })
  
  const petRoute = 'database/thermalGraphite/petPrice'
  describe(`api GET ${petRoute}`, () => {
    let testRoute = petRoute
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode, done)
    })
    it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode)
        .end(async (err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
          expect(res.body).to.have.property('petPrice')
          expect(res.body.petPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['thickness', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.petPrice.length; i++) {
            let item = res.body.petPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.petPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })
  
  const processRoute = 'database/thermalGraphite/processPrice'
  describe(`api GET ${processRoute}`, () => {
    let testRoute = processRoute
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode, done)
    })
    it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode)
        .end(async (err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
          expect(res.body).to.have.property('processPrice')
          expect(res.body.processPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['item', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.processPrice.length; i++) {
            let item = res.body.processPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.processPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })
})
