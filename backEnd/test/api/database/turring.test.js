/* eslint-env mocha */
const supertest = require('supertest')
const helper = require('../api-test-helper')
const DatabaseTestMod = require('./testMod/index.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
const testMod = new DatabaseTestMod(api, Authorization)
const apiTestList = [{
  'method': 'GET',
  'route': 'database/turning/turningParameter',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
    ['items', 'array'],
  ],
  'listName':'turningParameter',
  'subList':{
    'name': 'items',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['item', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
      ['unit', 'string', 'can_be_null'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/turning/diameter',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['outterDiameter', 'string'],
    ['innerDiameter', 'string'],
  ],
  'listName':'items',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/turning/heatTreatmentPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'heatTreatmentPrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/turning/platingPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'platingPrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/turning/materialPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['density', 'string'],
    ['disable', 'boolean'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'materialPriceList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/turning/nylokPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['material', 'string'],
    ['color', 'string'],
    ['diameter', 'string'],
    ['length', 'string', 'can_be_null'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'nylokPrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [],
    'notObjPropertyList':[],
  },
}]
describe('database/turning', () => {
  before(async () =>  {
    await helper.insertToken(Authorization)
  })
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  for(const apiTestInfo of apiTestList){
    switch (apiTestInfo.method) {
      case 'GET':
        describe(`#.API {GET} ${apiTestInfo.route}`, () => {
          it('should return a 200 response', (done) => {
            testMod.checkGetStatusCode(apiTestInfo, done)
          })
          it('body Check', (done) => {
            testMod.checkGetResBody(apiTestInfo, done)
          })
          it('should return a 401 response without Authorization', (done) => {
            let copyObj = Object.assign({}, apiTestInfo)
            copyObj.isAuth = false
            copyObj.statusCode = UNAuthorizedCode
            testMod.checkGetStatusCode(copyObj, done)
          })
        })
        break
      case 'PUT':
        break
      default:
        break
    }
  }
})
