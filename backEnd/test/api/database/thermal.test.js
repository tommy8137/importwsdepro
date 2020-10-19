/* eslint-env mocha */
const supertest = require('supertest')
const helper = require('../api-test-helper')
const DatabaseTestMod = require('./testMod/index.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
const testMod = new DatabaseTestMod(api, Authorization)
const BASE_ROUTE = 'database/thermal/'
const apiTestList = [{
  'method': 'GET',
  'route': `${BASE_ROUTE}thermalParameter`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
    ['items', 'array'],
  ],
  'listName':'thermalParameter',
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
  'route': `${BASE_ROUTE}fanBaselinePrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['fanSize', 'string'],
    ['disable', 'boolean'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'fanBaselinePrice',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, /* {
  'method': 'GET',
  'route': `${BASE_ROUTE}fanBearing`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['disable', 'boolean'],
  ],
  'listName':'fanBearingList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
},*/ {
  'method': 'GET',
  'route': `${BASE_ROUTE}fanBearingPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['fanSize', 'string'],
  ],
  'listName':'fanBearingList',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['bearingId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'fanSize'],
  },
}, /* {
  'method': 'GET',
  'route': `${BASE_ROUTE}fanMaterial`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['disable', 'boolean'],
  ],
  'listName':'',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
      
    ],
    'notObjPropertyList':[],
  },
}, */{
  'method': 'GET',
  'route': `${BASE_ROUTE}fanMaterialPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['fanSize', 'string'],
  ],
  'listName':'fanMaterialList',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['materialId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'fanSize'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}magnetMaterial`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['magnetId', 'string'],
    ['magnetName', 'string'],
    ['disable', 'boolean'],
  ],
  'listName':'magnetMaterialList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}magnetMaterialPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['fanSize', 'string'],
  ],
  'listName':'magnetMaterialPriceList',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['magnetId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'fanSize'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}motorDiff`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'propertyList':[
    ['motorId', 'string'],
    ['item', 'string'],
    ['disable', 'boolean'],
  ],
  'listName':'motorDiffList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}motorDiffPrice`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['fanSize', 'string'],
  ],
  'listName':'motorDiffPriceList',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['motorId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'fanSize'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}grease`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['greaseName', 'string'],
    ['disable', 'boolean'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'greaseList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}pipe`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['pipeName', 'string'],
    ['diameterName', 'string'],
    ['pipeLength', 'string'],
    ['thinkess', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'pipeList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}thermalPad`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['heatTransfer', 'string'],
    ['hardness', 'string'],
    ['thickness', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'listName':'thermalPadList',
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
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
