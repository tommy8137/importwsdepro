const router = require('koa-router')
const turning = require('../../../../api/database/turning.js')
const turningRouter = new router()
const turnings = new turning()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/turning/turningParameter get Turning Parameter
 * @apiName get Turning Parameter
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    "last": '2019/01/01',
    "lastId": 1,
    "current": '2019/06/01',
    "currentId": 2,
    "next": '2019/12/01',
    "nextId": 3,
  },
  "turningParameter": [{
    "id": 1,
    "type": "材料",
    "items": [{
      "id":1,
      "item": "成品沖型 Loss Rate",
      "unit": "%",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/turning/turningParameter
 */
turningRouter.get('/turningParameter', authHelpers.isJWTAuthenticated, turnings.getTurningParameter)

/**
 *
 * @api {get} /database/turning/materialPrice get Turning material Price
 * @apiName get Turning material Price
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    "last": '2019/01/01',
    "lastId": 1,
    "current": '2019/06/01',
    "currentId": 2,
    "next": '2019/12/01',
    "nextId": 3,
  },
  "materialPriceList": [{
    "partCategory2Id": "73fda832-5a91-11e9-8606-0242ac110002",
    "partCategory2Name": "Nut",
    "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
    "item": "低碳銅1018",
    "nutTypeName": "Insert NUT",
    "density": 0.18,
    "last": 0.09,
    "current": 0.95,
    "next": 0.1,
    "disable": null,
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/materialPrice
 */
turningRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, turnings.getTurningMaterialPrice)

/**
 *
 * @api {get} /database/turning/material/partCategory get Turning material & partCategory list
 * @apiName get Turning material & partCategory list
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[{
  "materialId": "快削鋼-1215",
  "partCategory2Id": [
    "73fda832-5a91-11e9-8606-0242ac110002",
    "73fdb412-5a91-11e9-8606-0242ac110002"
  ]
}, {
  "materialId": "黃銅-C3604",
  "partCategory2Id": [
    "73fda832-5a91-11e9-8606-0242ac110002",
    "73fdb412-5a91-11e9-8606-0242ac110002"
  ]
}]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/material/partCategory
 */
turningRouter.get('/material/partCategory', authHelpers.isJWTAuthenticated, turnings.getTurningMaterialPartCate)


/**
 *
 * @api {get} /database/turning/partCategory get Turning partCategory2 list
 * @apiName get Turning partCategory
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[{
  "partCategory2Id": "73fda832-5a91-11e9-8606-0242ac110002",
  "partCategory2Name": "Nut"
}, {
  "partCategory2Id": "73fdb412-5a91-11e9-8606-0242ac110002",
  "partCategory2Name": "Standoff"
}, {
  "partCategory2Id": "73fsw131-5a91-11e9-8606-0242ac110002",
  "partCategory2Name": "Screw"
}]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/partCategory
 */
turningRouter.get('/partCategory', authHelpers.isJWTAuthenticated, turnings.getTurningPartCategory)

/**
 *
 * @api {get} /database/turning/nutType get Turning Material Nut Type drop down
 * @apiName get Turning Material Nut Type drop down
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[{
  "nutTypeId": "64621ebe-fa1c-11e9-8153-0242a1324",
  "nutTypeName": "Insert NUT"
}, {
  "nutTypeId": "64621ebe-fa1c-11e9-8153-0222222",
  "nutTypeName": "Bracket NUT"
}]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/nutType
 */
turningRouter.get('/nutType', authHelpers.isJWTAuthenticated, turnings.getTurningNutType)

/**
 *
 * @api {post} /database/turning/material modify Turning Material Nut Type
 * @apiName modify Turning Material Nut Type
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
  "materialId": "64621ebe-fa1c-11e9-8153-0242ac110002",
  "nutTypeId": "64621ebe-fa1c-11e9-8153-0242a1324"
}
 *
  * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/turning/nutType
 */
turningRouter.post('/nutType', authHelpers.isJWTAuthenticated, turnings.postTurningNutType)


/**
 *
 * @api {post} /database/turning/material Turning Material Price ADD Material
 * @apiName add Turning Material Price Material
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
  {
    "material": "黃銅-C999",
    "partCategory2Id": [
      "73fda832-5a91-11e9-8606-0242ac110002"
    ],
    "nutTypeId": "64621ebe-fa1c-11e9-8153-0242a1324", // part category 不是Nut的時候為 null
    "density": 1.5,
    "value": 1.5,
  }
 *
  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
      materialId: '111111-2222222-333333-444444'
 * }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/turning/material
 */

turningRouter.post('/material', authHelpers.isJWTAuthenticated, turnings.postTurningMaterial)

/**
 *
 * @api {post} /database/turning/archive/material Archive Turning Material
 * @apiName Archive Turning Material
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
[{
    "partCategory2Id": "73fda832-5a91-11e9-8606-0242ac110002",
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002"
}, {
    "partCategory2Id": "73fdb412-5a91-11e9-8606-0242ac110002",
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002"
}]
  * @apiSampleRequest /database/turning/archive/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

turningRouter.post('/archive/material', authHelpers.isJWTAuthenticated, turnings.archiveTurningMaterial)

/**
 *
 * @api {post} /database/turning/unblock/material unblock Turning Material
 * @apiName unblock Turning Material
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
[{
    "partCategory2Id": "73fda832-5a91-11e9-8606-0242ac110002",
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002"
}, {
    "partCategory2Id": "73fdb412-5a91-11e9-8606-0242ac110002",
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002"
}]
  * @apiSampleRequest /database/turning/unblock/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

turningRouter.post('/unblock/material', authHelpers.isJWTAuthenticated, turnings.unblockTurningMaterial)

/**
 *
 * @api {get} /database/turning/platingPrice get Turning plating Price
 * @apiName get Turning platingPrice
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    "last": '2019/01/01',
    "lastId": 1,
    "current": '2019/06/01',
    "currentId": 2,
    "next": '2019/12/01',
    "nextId": 3,
  },
  "platingPrice": [{
    "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
    "item": "鍍黑鋅",
    "last":  0.1124,
    "current": 0.2246,
    "next":  0.3368
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/platingPrice
 */
turningRouter.get('/platingPrice', authHelpers.isJWTAuthenticated, turnings.getPlatingPrice)

/**
 *
 * @api {get} /database/turning/heatTreatmentPrice get Turning Heat Treatment Price
 * @apiName get Turning Heat Treatment Price
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    "last": '2019/01/01',
    "lastId": 1,
    "current": '2019/06/01',
    "currentId": 2,
    "next": '2019/12/01',
    "nextId": 3,
  },
  "heatTreatmentPrice": [{
    "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
    "item": "鍍黑鋅",
    "last":  0.1124,
    "current": 0.2246,
    "next":  0.3368
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/heatTreatmentPrice
 */
turningRouter.get('/heatTreatmentPrice', authHelpers.isJWTAuthenticated, turnings.getHeatTreatmentPrice)

/**
 *
 * @api {get} /database/turning/diameter get Turning diameter list
 * @apiName get Turning diameter list
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "items" : [{
    "id": 1,
    "item": 16,
    "value": 125
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/diameter
 */
turningRouter.get('/diameter', authHelpers.isJWTAuthenticated, turnings.getDiameter)

/**
 *
 * @api {put} /database/turning/modify/diameter modify Turning diameter
 * @apiName modify Turning diameter
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK

{
  "items": [{
      "id":1,
      "innerDiameter": 1.5,
  }]
}

 * @apiSampleRequest /database/turning/modify/diameter
 */

turningRouter.put('/modify/diameter', authHelpers.isJWTAuthenticated, turnings.putDiameter)

/**
 *
 * @api {get} /database/turning/nylokPrice get Turning nylok Price
 * @apiName get Turning nylok Price
 * @apiGroup Turning
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    "last": '2019/01/01',
    "lastId": 1,
    "current": '2019/06/01',
    "currentId": 2,
    "next": '2019/12/01',
    "nextId": 3,
  },
  "nylokPrice": {
    "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
    "material": "低碳銅 18A",
    "color": "Blue",
    "diameter": "M <= 2",
    "length": null,
    "last": 0.09,
    "current": 0.95,
    "next": 0.1,
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/turning/nylokPrice
 */
turningRouter.get('/nylokPrice', authHelpers.isJWTAuthenticated, turnings.getNylokPrice)


module.exports = turningRouter
