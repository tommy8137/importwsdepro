/* eslint-env mocha */
const supertest = require('supertest')
const helper = require('../api-test-helper')
const DatabaseTestMod = require('./testMod/index.js')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()
const PassCode = 200
const UNAuthorizedCode = 401
const testMod = new DatabaseTestMod(api, Authorization)
const BASE_ROUTE = 'database/plastic/'
const apiTestList = [{
  'method': 'GET',
  'route': `${BASE_ROUTE}plasticParameter`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
    ['items', 'array'],
  ],
  'listName':'plasticParameter',
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
  'route': `${BASE_ROUTE}materialLossRate`,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['remark', 'string', 'can_be_null'],
  ],
  'listName':'materialLossRate',
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['productTypeId', 'number'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'item', 'disable', 'remark'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}machineTonnes `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'machineTonnesList',
  'propertyList':[
    ['id', 'string'],
    ['ton', 'string'],
    ['remark', 'string', 'can_be_null'],
    // 目前版本還沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['modulePlasticId', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
    ],
    'notObjPropertyList':['id', 'ton', 'remark', 'disable'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}sprayPaintMachinePrice `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'sprayPaintMachinePriceList',
  'propertyList':[
    ['id', 'string'],
    ['type', 'string'],
    ['disable', 'boolean'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}paintVendor `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'paintVendor',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['remark', 'string', 'can_be_null'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}paintTypeColor `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'paintTypeColorList',
  'propertyList':[
    ['paintTypeId', 'string'],
    ['paintTypeName', 'string'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': 'color',
    'type': 'array',
    'propertyList': [
      ['colorId', 'string'],
      ['colorName', 'string'],
      // 目前沒有 ['disable', 'boolean'],
    ],
    'notObjPropertyList':['paintTypeId', 'paintTypeName', 'disable'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}sprayPaintCombinationList `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'paintCombinationList',
  'propertyList':[
    ['paintTypeId', 'string'],
    ['paintType', 'string'],
    ['colorId', 'string'],
    ['color', 'string'],
    ['top', 'boolean'],
    ['bottom', 'boolean'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}printingProcessPrice `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'printingProcessPriceList',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}EmbeddedPrice `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'embeddedPriceList',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['remark', 'string', 'can_be_null'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}grindingPrice `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'grindingPriceList',
  'propertyList':[
    ['id', 'string'],
    ['item', 'string'],
    ['remark', 'string', 'can_be_null'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}emiSputtering `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'emiSputteringList',
  'propertyList':[
    ['id', 'string'],
    ['label', 'string'],
    ['remark', 'string', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
    ['value', 'number', 'can_be_null'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}emiSputteringBase `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'emiSputteringBaseList',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}emiSputteringSiteGroup `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'emiSputteringSiteGroupList',
  'propertyList':[
    ['id', 'string'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': 'siteList',
    'type': 'array',
    'propertyList': [
      ['siteId', 'number'],
      ['siteName', 'string'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}emiSiteGroup `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': false,
  'listName':'emiSiteGroupList',
  'propertyList':[
    ['id', 'string'],
    ['siteList', 'string'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': '',
    'propertyList': [
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}materialPrice `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'materialPriceList',
  'propertyList':[
    ['id', 'string'],
    ['materialSpec', 'string'],
    ['remark', 'string', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': 'subMaterial',
    'type': 'array',
    'propertyList': [
      ['id', 'string'],
      ['material', 'string'],
      ['last', 'number', 'can_be_null'],
      ['current', 'number', 'can_be_null'],
      ['next', 'number', 'can_be_null'],
      // 目前沒有 ['disable', 'boolean'],
    ],
    'notObjPropertyList':[],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}paintManPowerHour `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'paintManPowerHourList',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    // 目前沒有 ['disable', 'boolean'],
  ],
  'subList':{
    'name': '',
    'type': 'object',
    'propertyList': [
      ['price', 'number', 'can_be_null'],
      ['manHour', 'number', 'can_be_null'],
      // 目前沒有 ['disable', 'boolean'],
    ],
    'notObjPropertyList':['id', 'name'],
  },
}, {
  'method': 'GET',
  'route': `${BASE_ROUTE}paintManPowerPrice?productTypeId=1 `,
  'isAuth': true,
  'statusCode':PassCode,
  'isCheckDate': true,
  'listName':'paintManPowerPriceList',
  'propertyList':[
    ['id', 'string'],
    ['name', 'string'],
    ['last', 'number', 'can_be_null'],
    ['current', 'number', 'can_be_null'],
    ['next', 'number', 'can_be_null'],
    // 目前沒有 ['disable', 'boolean'],
  ],
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
