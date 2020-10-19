/* eslint-env mocha */
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const verifyHelper = require('../property-verify-helper.js')
const { asyncForEach } = require('../../../server/helpers/utils.js')
const DatabaseTestMod = require('./testMod/index.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
const testMod = new DatabaseTestMod(api, Authorization)
const apiTestList = [{
  'method': 'GET',
  'route': 'database/rubber/materialPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['materialSpec', 'string'],
    ['remark', 'string', 'can_be_null'],
    ['disable', 'boolean'],
    ['subMaterial', 'array'],
  ],
  'listName':'materialPriceList',
  'subList':{
    'name': 'subMaterial',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['material', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
      ['disable', 'boolean'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': 'database/rubber/rubberParameter',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
    ['items', 'array'],
  ],
  'listName':'rubberParameter',
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
  'route': 'database/rubber/machinePrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['ton', 'string'],
  ],
  'listName':'machinePrice',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['productTypeId', 'number'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'ton'],
  },
}, {
  'method': 'GET',
  'route': 'database/rubber/stampingPrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
  ],
  'listName':'stampingPrice',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['unitPrice', 'number', 'can_be_null'],
      ['cycleTime', 'number', 'can_be_null'],
      ['usageAmount', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'item'],
  },
}, {
  'method': 'GET',
  'route': 'database/rubber/adhesivePrice',
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['disable', 'boolean'],
  ],
  'listName':'adhesivePrice',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['unitPrice', 'number', 'can_be_null'],
      ['cycleTime', 'number', 'can_be_null'],
      ['usageAmount', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'item', 'disable'],
  },
}]
describe('database/rubber', () => {
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
