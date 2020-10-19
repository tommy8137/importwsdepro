const router = require('koa-router')
const fpc = require('../../../../api/database/fpc.js')
const fpcRouter = new router()
const fpcs = new fpc()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/cablefpc/cablefpcParameter
 * @apiName get FPC Parameter
 * @apiGroup FPC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "date": {
        "current": "1970-01-01",
        "currentId": 27
    },
    "cablefpcParameter": [
        {
            "id": "cable_fpc_material",
            "type": "材料",
            "items": [
                {
                    "id": "eb3c415e-fbba-11e9-87c7-0242ac110002",
                    "item": "導體 Loss Rate(%)",
                    "unit": "%",
                    "last": null,
                    "current": 0.044,
                    "next": null
                }
            ]
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/cablefpc/cablefpcParameter
 */
fpcRouter.get('/cablefpcParameter', authHelpers.isJWTAuthenticated,  fpcs.getFpcParameter)
/**
 *
 * @api {get} /database/cablefpc/materialUnitPrice
 * @apiName get Fpc Material Unit Price
 * @apiGroup FPC
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
  "materialUnitPrice": [
        {
            "id": "eb3db58e-fbba-11e9-87c7-0242ac110002",
            "materialName": "Single side (單面板、一般材料)",
            "disable": false,
            "last": null,
            "current": 170,
            "next": null
        },
    ]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cablefpc/materialUnitPrice
 */
fpcRouter.get('/materialUnitPrice', authHelpers.isJWTAuthenticated, fpcs.getFpcMaterialUnitPrice)
/**
 *
 * @api {put}} /database/cablefpc/modify/materialUnitPrice
 * @apiName put FpcMaterial Price
 * @apiGroup FPC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cablefpc/modify/materialUnitPrice
{
    "nextId": 27,
    "items": [{
        "id": "eb3db58e-fbba-11e9-87c7-0242ac110002",
        "next": 170
    },{
        "id": "eb3dd582-fbba-11e9-87c7-0242ac110002",
        "next": 310
    }]
}
 */
fpcRouter.put('/modify/materialUnitPrice', authHelpers.isJWTAuthenticated, fpcs.putMaterialUnitPrice)

/**
 *
 * @api {get} /database/cablefpc/shieldingPrice
 * @apiName get Fpc Shielding Price
 * @apiGroup FPC
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
    "shieldingPrice": [{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "name": "NA",
        "last": 0,
        "current": 0,
        "next": 0,
        "disable": false
    },{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "name": "銀漿+mask",
        "last": 70,
        "current": 70,
        "next": 70,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cablefpc/shieldingPrice
 */
fpcRouter.get('/shieldingPrice', authHelpers.isJWTAuthenticated, fpcs.getFpcShieldingPrice)
/**
 *
 * @api {put}} /database/cablefpc/modify/shieldingPrice
 * @apiName put Shielding Price
 * @apiGroup FPC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cablefpc/modify/shieldingPrice
{
    "nextId": 3,
    "items": [{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "next": 5
    },{
        "id": "cb1e0b00-fab1-11e9-a4c6-0242ac110002",
        "next": 5
    }]
}
 */
fpcRouter.put('/modify/shieldingPrice', authHelpers.isJWTAuthenticated, fpcs.putShieldingPrice)
module.exports = fpcRouter
