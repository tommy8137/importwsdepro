/* eslint-env mocha */
const supertest = require('supertest')
const helper = require('../api-test-helper')
const DatabaseTestMod = require('./testMod/index.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
const testMod = new DatabaseTestMod(api, Authorization)
const BASE_ROUTE = 'database/metal/'
const apiTestList = [{
  'method': 'GET',
  'route': `${BASE_ROUTE}materialPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['material', 'string'],
    ['density', 'string'],
  ],
  'listName':'materialPriceList',
  'subList':{
    'name': 'subMaterial',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['thickness', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}metalParameter`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
  ],
  'listName':'metalParameter',
  'subList':{
    'name': 'items',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['item', 'string'],
      ['unit', 'string', 'can_be_null'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}anodeColorPriceList`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
  ],
  'listName':'anodeColorPrice',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['price', 'number', 'can_be_null'],
      ['lossRate', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'item'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}sprayPaintPriceList`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['color', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'sprayPaintPriceList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}glueModelPriceList`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['glueType', 'string'],
    ['density', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'glueModelPriceList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}syringeList`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['syringeName', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'syringeList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}machineModule`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['moduleId', 'string'],
    ['moduleName', 'string'],
    ['remark', 'string', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'listName':'machineModule',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['productTypeId', 'number'],
      ['metalTypeId', 'string', 'can_be_null'],
      ['metalTypeName', 'string'],
    ],
    'notObjPropertyList':['moduleId', 'moduleName', 'remark'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}machineModule`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
  ],
  'listName':'metalType',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}MachineTonnes`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['ton', 'string'],
    ['remark', 'string', 'can_be_null'],
    ['bloster', 'string', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'listName':'machineTonnesList',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['moduleMetalId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'ton', 'remark', 'bloster'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}drillPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
    ['disable', 'boolean'],
  ],
  'listName':'drillPrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}drillPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
    ['disable', 'boolean'],
  ],
  'listName':'drillPrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}partCategory`,
  'isAuth': false,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
  ],
  'listName':'partCategory',
  'subList':{
    'name': 'items',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['name', 'string'],
      ['isSelected', 'boolean'],
    ],
    'notObjPropertyList':[],
  },
}]
describe(BASE_ROUTE, () => {
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
          if(apiTestInfo.isAuth){
            it('should return a 401 response without Authorization', (done) => {
              let copyObj = Object.assign({}, apiTestInfo)
              copyObj.isAuth = false
              copyObj.statusCode = UNAuthorizedCode
              testMod.checkGetStatusCode(copyObj, done)
            })
          }
        })
        break
      case 'PUT':
        break
      default:
        break
    }
  }
})
