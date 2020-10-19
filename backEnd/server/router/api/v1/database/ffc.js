const router = require('koa-router')
const ffc = require('../../../../api/database/ffc.js')
const ffcRouter = new router()
const ffcs = new ffc()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/cableffc/cableffcParameter get FFC Parameter
 * @apiName get FFC Parameter
 * @apiGroup FFC
 * @apiParam {Number} productTypeId     product type id
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
  "cableffcParameter": [{
    "id": "cable_ffc_components",
    "type": "零件",
    "items": [{
        "id":"29309bb8-fbac-11e9-9e65-0242ac110002",
        "item": "AI Foil單價",
        "unit": "USD",
        "last":2.97,
        "current": 2.97,
        "next": 2.97,
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/cableffcParameter?productTypeId=1
 */
ffcRouter.get('/cableffcParameter', authHelpers.isJWTAuthenticated, ffcs.getFfcParameter)

/**
 *
 * @api {get} /database/cableffc/connector
 * @apiName get Connector
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "connector":[
        {
         "id":"4f326e38-f0a6-11e9-a8a0-0242ac110002",
         "connectorName":"HDD",
         "disable": false
        },
        {
         "id":"4f326e38-f0a6-11e9-a8a0-0242ac11000ˇ",
         "connectorName":"ODD",
         "disable": false
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/connector
 */
ffcRouter.get('/connector', authHelpers.isJWTAuthenticated, ffcs.getFfcConnector)

/**
 *
 * @api {get} /database/cableffc/connectorPrice
 * @apiName get connector Price
 * @apiGroup FFC
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
    "connectorPrice": [{
            "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
            "connectorName": "HDD Connector",
            "vendorPN": "ST13113-11101加錫",
            "vendorName": "",
            "last": {
                "price": 0.1124,
                "processTime": 44,
            },
            "current": {
                "price": 0.2246,
                "processTime": 33,
            },
            "next": {
                "price": 0.3368,
                "processTime": 22,
            },
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/connectorPrice
 */
ffcRouter.get('/connectorPrice', authHelpers.isJWTAuthenticated, ffcs.getFfcConnectorPrice)
/**
 *
 * @api {put} /database/cableffc/modify/connectorPrice
 * @apiName put connector Price
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/cableffc/modify/connectorPrice
{
    "nextId": 14,
    "items": [{
        "id": "ebcc007a-ff8c-11e9-af17-0242ac110002",
        "price": 0.777,
        "processTime": 44
    },{
        "id": "ebcc0e58-ff8c-11e9-af17-0242ac110002",
        "price": 0.666,
        "processTime": 55
    }]
}
 */
ffcRouter.put('/modify/connectorPrice', authHelpers.isJWTAuthenticated, ffcs.putFfcConnectorPrice)


/**
 *
 * @api {get} /database/cableffc/dt/connectorPrice get FFC DT/AIO connectorPrice
 * @apiName get FFC DT/AIO connectorPrice
 * @apiGroup FFC
 * @apiHeader {String} Authorization    Bearer access-token.
 * @apiParam {Number} productTypeId     product type id
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
    "items": [{
        "id": '1588-1684-54531',
        "category": "壓接/刺破式",
        "spec": "FFC",
        "pitch": 1,
        "row": 1,
        "pin": 30,
        "vendor": "QY",
        "partNumber": "FFC-30XZHL-A-03",
        "last": 5.00,
        "current": 2.5,
        "next": 1.5
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/dt/connectorPrice?productTypeId=2
 */
ffcRouter.get('/dtaio/connectorPrice', authHelpers.isJWTAuthenticated, ffcs.getFfcDtConnector)

/**
 *
 * @api {put} /database/cableffc/dt/modify/connectorPrice
 * @apiName put dt/aio connector Price
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 400 id required
 * @apiSampleRequest /database/cableffc/dt/modify/connectorPrice
{
    "nextId": 14,
    "items": [{
        "id": "ebcc007a-ff8c-11e9-af17-0242ac110002",
        "next": 0.777
    },{
        "id": "ebcc0e58-ff8c-11e9-af17-0242ac110002",
        "next": 0.666
    }]
}
 */
ffcRouter.put('/dtaio/modify/connectorPrice', authHelpers.isJWTAuthenticated, ffcs.putFfcDtPrice)

/**
 *
 * @api {get} /database/cableffc/dt/materialPrice get FFC DT/AIO materialPrice
 * @apiName get FFC DT/AIO materialPrice
 * @apiGroup FFC
 * @apiHeader {String} Authorization    Bearer access-token.
 * @apiParam {Number} productTypeId     product type id
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
    "items": [
        {
            "last": null,
            "current": 0.1049,
            "next": null,
            "id": "47757cb6-b203-11ea-8151-0242ac110003",
            "category": "皮膜",
            "spec": "皮膜RoHS 2.0",
            "length": "1000",
            "width": "120",
            "thickness": "0.06",
            "vendor": "樺晟",
            "partNumber": null
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/dt/materialPrice?productTypeId=2
 */
ffcRouter.get('/dtaio/materialPrice', authHelpers.isJWTAuthenticated, ffcs.getFfcDtMaterial)

/**
 *
 * @api {put} /database/cableffc/dt/modify/materialPrice
 * @apiName put dt/aio material Price
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 400 id required
 * @apiSampleRequest /database/cableffc/dt/modify/materialPrice
{
    "nextId": 14,
    "items": [{
        "id": "ebcc007a-ff8c-11e9-af17-0242ac110002",
        "next": 0.777
    },{
        "id": "ebcc0e58-ff8c-11e9-af17-0242ac110002",
        "next": 0.666
    }]
}
 */
ffcRouter.put('/dtaio/modify/materialPrice', authHelpers.isJWTAuthenticated, ffcs.putFfcDtPrice)

/**
 *
 * @api {get} /database/cableffc/dt/accessoriesPrice get FFC DT/AIO accessoriesPrice
 * @apiName get FFC DT/AIO accessoriesPrice
 * @apiGroup FFC
 * @apiHeader {String} Authorization    Bearer access-token.
 * @apiParam {Number} productTypeId     product type id
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
    "items": [
        {
            "last": null,
            "current": 0.1049,
            "next": null,
            "id": "47757cb6-b203-11ea-8151-0242ac110003",
            "category": "皮膜",
            "spec": "皮膜RoHS 2.0",
            "length": "1000",
            "width": "120",
            "thickness": "0.06",
            "vendor": "樺晟",
            "partNumber": null
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/dt/accessoriesPrice?productTypeId=2
 */
ffcRouter.get('/dtaio/accessoriesPrice', authHelpers.isJWTAuthenticated, ffcs.getFfcDtAccessories)

/**
 *
 * @api {put} /database/cableffc/dt/modify/accessoriesPrice
 * @apiName put dt/aio accessories Price
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 400 id required
 * @apiSampleRequest /database/cableffc/dt/modify/accessoriesPrice
{
    "nextId": 14,
    "items": [{
        "id": "ebcc007a-ff8c-11e9-af17-0242ac110002",
        "next": 0.777
    },{
        "id": "ebcc0e58-ff8c-11e9-af17-0242ac110002",
        "next": 0.666
    }]
}
 */
ffcRouter.put('/dtaio/modify/accessoriesPrice', authHelpers.isJWTAuthenticated, ffcs.putFfcDtPrice)

/**
 *
 * @api {get} /database/cableffc/dt/reinforcementBoardPrice get FFC DT/AIO reinforcementBoardPrice
 * @apiName get FFC DT/AIO reinforcementBoardPrice
 * @apiGroup FFC
 * @apiHeader {String} Authorization    Bearer access-token.
 * @apiParam {Number} productTypeId     product type id
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
    "items": [
        {
            "last": null,
            "current": 0.1049,
            "next": null,
            "id": "47757cb6-b203-11ea-8151-0242ac110003",
            "category": "皮膜",
            "spec": "皮膜RoHS 2.0",
            "length": "1000",
            "width": "120",
            "thickness": "0.06",
            "vendor": "樺晟",
            "partNumber": null
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/cableffc/dt/reinforcementBoardPrice?productTypeId=2
 */
ffcRouter.get('/dtaio/reinforcementBoardPrice', authHelpers.isJWTAuthenticated, ffcs.getFfcDtReinforcementBoard)

/**
 *
 * @api {put} /database/cableffc/dt/modify/reinforcementBoardPrice
 * @apiName put dt/aio reinforcement Board Price
 * @apiGroup FFC
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 400 id required
 * @apiSampleRequest /database/cableffc/dt/modify/reinforcementBoardPrice
{
    "nextId": 14,
    "items": [{
        "id": "ebcc007a-ff8c-11e9-af17-0242ac110002",
        "next": 0.777
    },{
        "id": "ebcc0e58-ff8c-11e9-af17-0242ac110002",
        "next": 0.666
    }]
}
 */
ffcRouter.put('/dtaio/modify/reinforcementBoardPrice', authHelpers.isJWTAuthenticated, ffcs.putFfcDtPrice)
module.exports = ffcRouter
