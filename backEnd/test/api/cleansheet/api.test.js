
const { expect } = require('chai')
const supertest = require('supertest')

const helper = require('../api-test-helper')
const fs = require('fs')
const path = require('path')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const moment = require('moment')


// before((done) => {
//   api.post('admin/login') // 登入測試
//     .set('Accept', 'application/json')
//     .send({
//       'username': username,
//       'password': password,
//     })
//     .expect(200)
//     .end((err, res) => {
//       Authorization = res.body.access_token // 登入成功取得 JWT
//       done()
//     })
// })

describe('Cleansheet', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  describe('projects/me', () => {
    // it('should return a 200 response', (done) => {
    //   api.get('cleansheet/projects/me')
    //     .set('Authorization', `Bearer ${Authorization}`) // 將 Bearer Token 放入 Header 中的 Authorization
    //     .expect(200, done)
    // })

    // it('should return a 401 response without Authorization ', (done) => {
    //   api.get('cleansheet/projects/me')
    //     .expect(401, done)
    // })
  })
  describe('api POST /partjects/projectCode/mebom', () => {
    it('should return a 200 response', (done) => {
      let code = '91.73F41.301'
      // let projects = {
      //   'projectCode' : '91.73F41.301',
      //   'projectName': 'SOFHD_42_MT01_PA',
      //   'product': 'TV',
      //   'bg': 'CPBG',
      //   'stage': 'C0',
      //   'stageName': 'RFI',
      //   'productSpec': '14\"'
      // }
      let projects = {
        "projectCode": "91.73F41.301",
        "projectName": "SOFHD_42_MT01_PA",
        "product": "TV",
        "bg": "CPBG",
        "stage": "C0",
        "stageName": "RFI",
        "productSpec": "14\""
      }
      api.post(`cleanSheet/project/${code}/mebom`)
        // .set('Authorization', `Bearer ${Authorization}`)
        .send(projects)
        .expect(200, done())
    })
  })
})

describe('Costgen', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  describe('api GET costgen/database', () => {
    it('should return 200, get sourcers list', (done) => {
      let type = 'Fan'
      api.get(`costgen/database?type=${type}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.have.property('Fan')
          expect(res.body.Fan).to.be.a('object')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('costgen/database')
        .expect(401, done)
    })
  })
  describe('api PUT costgen/table', () => {
    it('should return a 401 response without Authorization ', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      api.put(`costgen/table/${type}/${tablename}`)
        .expect(401, done)
    })

    it('should return 200, upload sourcers list', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      let filePath = path.resolve(__dirname, '../../../test/api/cleansheet/Fan_motorArchitectureTable_20181119.xlsx')

      api.put(`costgen/table/${type}/${tablename}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .attach('file', filePath)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })

    it('should return 500, fail upload sourcers list', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      let filePath = path.resolve(__dirname, '../../../test/api/cleansheet/Fan_motorArchitectureTable_WrongValue.xlsx')

      api.put(`costgen/table/${type}/${tablename}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .attach('file', filePath)
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })

    it('should return 500, fail upload sourcers list', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      let filePath = path.resolve(__dirname, '../../../test/api/cleansheet/Fan_motorArchitectureTable_WrongHeader.xlsx')

      api.put(`costgen/table/${type}/${tablename}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .attach('file', filePath)
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })
  })
  describe('api get costgen/table', () => {
    it('should return a 401 response without Authorization ', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      api.put(`costgen/table/${type}/${tablename}`)
        .expect(401, done)
    })

    // it('should return 200, get sourcers list', (done) => {
    //   let type = 'Fan'
    //   let tablename = 'motorArchitectureTable'
    //   api.get(`costgen/table/${type}/${tablename}`)
    //     .set('Authorization', `Bearer ${Authorization}`)
    //     .expect(200)
    //     .buffer()
    //     .parse(binaryParser)
    //     .end((err, res) => {
    //       if (err) {
    //         done(err)
    //       }
    //       done()
    //     })
    // })

    it('should return 400, can not get sourcers list', (done) => {
      let type = 'Fin'
      let tablename = 'motorArchitectureTable'
      api.get(`costgen/table/${type}/${tablename}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          done()
        })
    })
  })
  describe('api POST costgen/result', () => {
    let testRoute = 'costgen/result'
    it('should return 200, get cost result excel', (done) => {
      const body = {
        "Fin": [

          { "name": "Fin 1", "unitprice": 0.3748, "usage": 1, "data": {} }
        ],
        "Fan": [
          { "name": "Block", "unitprice": 3.6000, "usage": 1, "data": {} }
        ],
        "Screw": [],
        "ThermalPlate": [
          { "name": "Plate 1", "unitprice": 0.2410, "usage": 1, "data": {} },
          { "name": "Plate 2", "unitprice": 0.7410, "usage": 3, "data": {} }
        ],
        "ThermalPad": [],
        "ThermalBlock": [
          { "name": "Block 1", "unitprice": 0.2410, "usage": 1, "data": {} }
        ],
        "Pipe": [
          { "name": "Pipe", "unitprice": 1, "usage": 1, "data": {} }
        ],
        "Sponge": [],
        "Grease": [],
        "Spring": [],
        "ORing": [],
        "Label": [],
        "Clip": [],
        "PushPin": []
      }
      const date = new Date()
      const fileDate = moment(new Date()).format('YYYYMMDD')
      api.post(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect('content-disposition', `attachment; filename="Cost_Result_${fileDate}.xlsx"`)
          done()
        })
    })
    it('should return 400 response without request', (done) => {
      api.post(testRoute)
        .expect(400, done)
    })
  })
  describe('api GET /costgen/tables', () => {
    let testRoute = 'costgen/tables'
    it('body check, should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('list')
          expect(res.body.list).to.be.a('array')
          if (res.body.list.length) {
            expect(res.body.list[0]).to.have.property('tableType')
            expect(res.body.list[0].tableType).to.be.a('string')
            expect(res.body.list[0]).to.have.property('tables')
            expect(res.body.list[0].tables).to.be.a('array')
          }
          done()
        })
    })
    it('query check, should have table type', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .query({ type: 'Fin' })
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          if (res.body.list.length) {
            expect(res.body.list[0].tableType).to.eq('Fin')
          }
          done()
        })
    })
    it('sort check', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .query({ type: 'Fin' })
        .query({ orderBy: '-updateDate' })
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          if (res.body.list.length && res.body.list[0].tables.length >= 2) {
            const time1 = new Date(res.body.list[0].tables[0].updateDate)
            const time2 = new Date(res.body.list[0].tables[1].updateDate)
            expect(time1).to.be.at.least(time2)
          }
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(401, done)
    })
  })
  describe('api GET /costgen/types', () => {
    let testRoute = 'costgen/types'
    it('body check, should return a 200 response', (done) => {
      api.get(testRoute)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('list')
          expect(res.body.list).to.be.a('array')
          if (res.body.list.length) {
            expect(res.body.list[0]).to.be.a('string')
          }
          done()
        })
    })
    it('should return a 401 response without Authorization', (done) => {
      api.get(testRoute)
        .expect(401, done)
    })
  })

  describe('api post costgen/table', () => {
    it('should return a 401 response without Authorization ', (done) => {
      let type = 'Fan'
      let tablename = 'motorArchitectureTable'
      api.put(`costgen/table/${type}/${tablename}`)
        .expect(401, done)
    })
  })

  it('should return 200, post sourcers list', (done) => {
    let type = 'Pipe'
    let tablename = 'outerDiameterLengthTable'
    let postData = {
      'header': [
        { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
        { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
        { 'key': 'math', 'name': '數學', 'typeof': 'number' },
        { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
      ],
      'data': [
        { 'outerDiameter': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.2 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '1.2mm', 'math': 1.2, 'cost': 0.35 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '1.0mm', 'math': 1.0, 'cost': 0.45 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '0.8mm', 'math': 0.8, 'cost': 0.6 },
        { 'outerDiameter': 'D4_', 'flatteningThickness': '0.6mm', 'math': 0.6, 'cost': 0.8 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '1.2mm', 'math': 1.2, 'cost': 0.35 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '1.0mm', 'math': 1.0, 'cost': 0.45 },
        { 'outerDiameter': 'D6_', 'flatteningThickness': '0.8mm', 'math': 0.8, 'cost': 0.6 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.25 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.3 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.4 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '1.2mm', 'math': 1.2, 'cost': 0.5 },
        { 'outerDiameter': 'D8_', 'flatteningThickness': '1.0mm', 'math': 1.0, 'cost': 0.6 },
      ]
    }

    api.post(`costgen/table/${type}/${tablename}`)
      .set('Authorization', `Bearer ${Authorization}`)
      .send(postData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  /*it('should return 500, post sourcers list', (done) => {
    let type = 'Pipe'
    let tablename = 'outerDiameterLengthTable'
    let postData = {
      'header': [
        { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
        { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
        { 'key': 'math', 'name': '數學', 'typeof': 'number' },
        { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
      ]
    }

    api.post(`costgen/table/${type}/${tablename}`)
      .set('Authorization', `Bearer ${Authorization}`)
      .send(postData)
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })*/
})

const binaryParser = (res, cb) => {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    cb(null, new Buffer(res.data, 'binary'));
  })
}
