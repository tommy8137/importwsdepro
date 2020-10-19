/* eslint-env mocha */
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const verifyHelper = require('../property-verify-helper.js')
const { asyncForEach } = require('../../../server/helpers/utils.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
describe('database/diecut', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  const materialPriceRoute = 'database/diecut/materialPrice'
  describe(`api GET ${materialPriceRoute}`, () => {
    let testRoute = materialPriceRoute
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode, done)
    })
    /* it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(PassCode)
        .end(async (err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('date')
          verifyHelper.verifyPropertyDate(res.body.date)
          expect(res.body).to.have.property('materialPriceList')
          expect(res.body.materialPriceList).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['materialSpec', 'string'],
            ['remark', 'string'],
            // ['disable', 'boolean'],
            ['subMaterial', 'array'],
          ]
          let subPropertyList = [
            ['id', 'string'],
            ['material', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            // ['disable', 'boolean'],
          ]
          await asyncForEach(res.body.materialPriceList, async (item) => {
            verifyHelper.propertyTypeVerify(item, propertyList)
            await asyncForEach(item.subMaterial, async (valueObj) => {
              verifyHelper.propertyTypeVerify(valueObj, subPropertyList)
            })
          })
          await verifyHelper.verifySubItemsValue(res.body.date, res.body.materialPriceList, 'subMaterial')
          done()
        })
    }) */
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })


  const diecutParameterRoute = 'database/diecut/diecutParameter'
  describe(`api GET ${diecutParameterRoute}`, () => {
    let testRoute = diecutParameterRoute
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
          expect(res.body).to.have.property('diecutParameter')
          expect(res.body.diecutParameter).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['type', 'string'],
            ['items', 'array'],
          ]
          let subPropertyList = [
            ['id', 'string'],
            ['item', 'string'],
            ['unit', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            // ['disable', 'boolean'],
          ]
          await asyncForEach(res.body.diecutParameter, async (item) => {
            verifyHelper.propertyTypeVerify(item, propertyList)
            await asyncForEach(item.items, async (valueObj) => {
              verifyHelper.propertyTypeVerify(valueObj, subPropertyList)
            })
          })
          await verifyHelper.verifySubItemsValue(res.body.date, res.body.diecutParameter)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })

  const materialSizeAdderPriceRoute = 'database/diecut/materialSizeAdderPrice'
  describe(`api GET ${materialSizeAdderPriceRoute}`, () => {
    let testRoute = materialSizeAdderPriceRoute
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
          expect(res.body).to.have.property('materialSizeAdderPrice')
          expect(res.body.materialSizeAdderPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['size', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.materialSizeAdderPrice.length; i++) {
            let item = res.body.materialSizeAdderPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.materialSizeAdderPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })

  const releasePaperPriceRoute = 'database/diecut/releasePaperPrice'
  describe(`api GET ${releasePaperPriceRoute}`, () => {
    let testRoute = releasePaperPriceRoute
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
          expect(res.body).to.have.property('releasePaperPrice')
          expect(res.body.releasePaperPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['name', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.releasePaperPrice.length; i++) {
            let item = res.body.releasePaperPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.releasePaperPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })

  const typePriceRoute = 'database/diecut/typePrice'
  describe(`api GET ${typePriceRoute}`, () => {
    let testRoute = typePriceRoute
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
          expect(res.body).to.have.property('typePrice')
          expect(res.body.typePrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['name', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.typePrice.length; i++) {
            let item = res.body.typePrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.typePrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })

  const areaTimesPriceRoute = 'database/diecut/areaTimesPrice'
  describe(`api GET ${areaTimesPriceRoute}`, () => {
    let testRoute = areaTimesPriceRoute
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
          expect(res.body).to.have.property('areaTimesPrice')
          expect(res.body.areaTimesPrice).to.be.a('array')
          let propertyList = [
            ['id', 'string'],
            ['areaSize', 'string'],
            ['last', 'number', 'can_be_null'],
            ['current', 'number', 'can_be_null'],
            ['next', 'number', 'can_be_null'],
            ['disable', 'boolean'],
          ]
          for (let i = 0; i < res.body.areaTimesPrice.length; i++) {
            let item = res.body.areaTimesPrice[i]
            verifyHelper.propertyTypeVerify(item, propertyList)
          }
          await verifyHelper.verifyValue(res.body.date, res.body.areaTimesPrice)
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(UNAuthorizedCode, done)
    })
  })
})
