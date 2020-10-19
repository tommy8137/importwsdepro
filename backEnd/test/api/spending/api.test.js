const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const moment = require('moment')

describe('Spending', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  describe('api GET /spending/plants', () => {
    let testRoute = 'spending/plants'
    it('should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200, done)
    })
    it('body check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('plantList')
          expect(res.body.plantList).to.be.a('array')
          if (res.body.plantList.length) {
            expect(res.body.plantList[0]).to.have.property('plant')
            expect(res.body.plantList[0]).to.have.property('plantName')
            expect(res.body.plantList[0]).to.have.property('bg')
          }
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(401, done)
    })
  })

  describe('api GET /supplys', () => {
    it('should return 200, get supply type list', (done) => {
      api.get('spending/supplys')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.have.property('supplyList')
          expect(res.body.supplyList).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('spending/supplys')
        .expect(401, done)
    })
  })

  // describe('api POST /spending/types', () => {
  //   let testRoute = 'spending/types'
  //   it('body check, should return a 200 response', (done) => {
  //     const body = {
  //       'plant': ['F021', 'F137'],
  //       'scode': ['S73', 'S65'],
  //     }
  //     api.post(testRoute)
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(body)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) done(err)
  //         expect(res.body).to.be.a('object')
  //         expect(res.body).to.have.property('typeList')
  //         expect(res.body.typeList).to.be.a('array')
  //         if (res.body.typeList.length) {
  //           expect(res.body.typeList[0]).to.have.property('type1')
  //           expect(res.body.typeList[0]).to.have.property('type2')
  //         }
  //         done()
  //       })
  //   })
  //   it('should return a 401 response without Authorization', (done) => {
  //     api.post(testRoute)
  //       .expect(401, done)
  //   })
  // })

  // describe('api GET analysis/waterful', () => {
  //   it('should return 200, get waterfull list', (done) => {
  //     let data = {
  //       'plant': ['F230', 'F231', 'F715'],
  //       'user': ['S01', 'S02', 'S98'],
  //       'dateFrom': '2018-11-01',
  //       'dateTo': '2018-11-01',
  //       'type1': ['BTY', 'CONVERTER'],
  //       'type2': [null, null],
  //       'supplyType': [1],
  //       'category': 'none',
  //       'measure': 'amount',
  //       'currency': 'USD',
  //     }
  //     api.post('spending/analysis/waterful')
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(data)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           done(err)
  //         }
  //         // Body validation
  //         expect(res.body).to.have.property('category')
  //         expect(res.body).to.have.property('requestData')
  //         expect(res.body.requestData).to.have.property('type1')
  //         expect(res.body.requestData).to.have.property('type2')
  //         expect(res.body.requestData).to.have.property('supplyType')
  //         expect(res.body.requestData).to.have.property('dateFrom')
  //         expect(res.body.requestData).to.have.property('dateTo')
  //         expect(res.body).to.have.property('waterfall')
  //         expect(res.body.waterfall).to.be.a('array')
  //         done()
  //       })
  //   })

  //   it('should return a 401 response without Authorization ', (done) => {
  //     api.post('spending/analysis/waterful')
  //       .expect(401, done)
  //   })
  // })
  // describe('api POST /spending/analysis/month', () => {
  //   let testRoute = 'spending/analysis/month'
  //   it('body check, should return a 200 response', (done) => {
  //     const body = {
  //       'plant': ['F111', 'F222'],
  //       'scode': ['S01', 'S02'],
  //       'dateFrom': '2018-01-01',
  //       'dateTo': '2018-04-30',
  //       'type1': [],
  //       'type2': [],
  //       'supplyType': ['W', 'A', 'B'],
  //       'vendorSelection': 'base',
  //     }
  //     api.post(testRoute)
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(body)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) done(err)
  //         expect(res.body).to.be.a('object')
  //         expect(res.body).to.have.property('query')
  //         expect(res.body.query).to.be.a('object')
  //         expect(res.body).to.have.property('data')
  //         expect(res.body.data).to.be.a('array')
  //         if (res.body.data.length) {
  //           expect(res.body.data[0]).to.have.property('key')
  //           expect(res.body.data[0]).to.have.property('name')
  //           expect(res.body.data[0]).to.have.property('amountNTD')
  //           expect(res.body.data[0]).to.have.property('amountUSD')
  //           expect(res.body.data[0]).to.have.property('percentage')
  //         }
  //         done()
  //       })
  //   })
  //   it('data check, sum of percentage must equal 100', (done) => {
  //     const body = {
  //       'plant': ['F111', 'F222'],
  //       'scode': ['S01', 'S02'],
  //       'dateFrom': '2018-01-01',
  //       'dateTo': '2018-04-30',
  //       'type1': [],
  //       'type2': [],
  //       'supplyType': ['W', 'A', 'B'],
  //       'vendorSelection': 'base',
  //     }
  //     api.post(testRoute)
  //       .set('Authorization', `Bearer ${Authorization}`)
  //       .send(body)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) done(err)
  //         const { data } = res.body
  //         if (data.length) {
  //           let s = data.reduce((x, pre) => ({ 'percentage': x.percentage + pre.percentage }))
  //           // expect(s.percentage).to.equal(100) // this cannot be pass due to js float handling!!!
  //           expect(s.percentage).to.be.closeTo(100, 0.001)
  //         }
  //         done()
  //       })
  //   })
  //   it('should return a 401 response without Authorization', (done) => {
  //     api.post(testRoute)
  //       .expect(401, done)
  //   })
  // })
   /* /describe('api POST /spending/analysis/report', () => {
    let testRoute = 'spending/analysis/report'
    it('should return 200 response, get spending analysis excel', (done) => {
      const body = {
        "plant":["F130","F131","F132","F135"],
        "user":["S05","SG6","S11","S87","S08"],
        "dateFrom":"2018-11-01",
        "dateTo":"2018-11-30",
        "type1":["ASIC","Add-on card","Adhesive","Xformer"],
        "type2":["Audio","Authentication","BMC","BT","CLK-PLL","Oscillator","Lan","Power"],
        "supplyType":[1,3,11,13,14,15],
        "category":"manufacturer",
        "measure":"amount",
        "currency":"USD"}
      const fileDate = moment(new Date()).format('YYYYMMDD')
      api.post(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .end((err, res) => {
          if(err) {
            done(err)
          }
          expect('content-disposition', `attachment; filename="Spending_sum_${fileDate}.xlsx"`)
          done()
        })
    })
    it('should return 401 response without request', (done) => {
      api.post(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(401, done)
    })
  }) */
  describe('api POST /spending/analysis/rawData', () => {
    let testRoute = 'spending/analysis/rawData'
    it('should return 200 response, get spending rawData excel', (done) => {
      const body = {
        "plant":["F130","F131","F132","F135"],
        "user":["S05","SG6","S11","S87","S08"],
        "dateFrom":"2018-11-01",
        "dateTo":"2018-11-30",
        "type1":["ASIC","Add-on card","Adhesive","Xformer"],
        "type2":["Audio","Authentication","BMC","BT","CLK-PLL","Oscillator","Lan","Power"],
        "supplyType":[1,3,11,13,14,15],
        "category":"manufacturer",
        "measure":"amount",
        "currency":"USD"}

      const fileDate = moment(new Date()).format('YYYYMMDD')
      api.post(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err)
          }
          expect('content-disposition', `attachment; filename="Spending_raw_${fileDate}.zip"`)
          done()
        })
    })
    it('should return 401 response without request', (done) => {
      api.post(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(401, done)
    })
  })
})
