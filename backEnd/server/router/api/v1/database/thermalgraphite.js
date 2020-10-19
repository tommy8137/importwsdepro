const router = require('koa-router')
const thermalGraphite = require('../../../../api/database/thermalgraphite.js')
const thermalGraphiteRouter = new router()
const thermalGraphites = new thermalGraphite()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/thermalGraphite/thicknessPrice
 * @apiName getThicknessPrice
 * @apiGroup ThermalGraphite
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
    "thicknessPrice": [{
        "id": 1,
        "type": "合成石墨(K<=500)",
        "thickness": 0.045,
        "last": 5.00,
        "current": 2.5,
        "next": 1.5,
        "disable": false,
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermalGraphite/thicknessPrice
 */
thermalGraphiteRouter.get('/thicknessPrice', authHelpers.isJWTAuthenticated, thermalGraphites.getThicknessPrice)

/**
 *
 * @api {get} /database/thermalGraphite/gluePrice
 * @apiName getGraphiteGluePrice
 * @apiGroup ThermalGraphite
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
    "gluePrice": [{
        "id": "440f0e40-006d-11ea-a919-0242ac110002",
        "thickness": "0.01",
        "last": 0.09,
        "current": 0.95,
        "next": 0.1,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermalGraphite/gluePrice
 */
thermalGraphiteRouter.get('/gluePrice', authHelpers.isJWTAuthenticated, thermalGraphites.getGluePrice)

/**
 *
 * @api {get} /database/thermalGraphite/petPrice
 * @apiName getGraphitePetPrice
 * @apiGroup ThermalGraphite
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
    "petPrice": [{
        "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
        "thickness": "0.01",
        "last":  9,
        "current": 9,
        "next":  9,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermalGraphite/petPrice
 */
thermalGraphiteRouter.get('/petPrice', authHelpers.isJWTAuthenticated, thermalGraphites.getPetPrice)


/**
 *
 * @api {get} /database/thermalGraphite/processPrice
 * @apiName getProcessPrice
 * @apiGroup ThermalGraphite
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
    "processPrice": [{
        "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
        "item": "單封邊",
        "last":  0.1124,
        "current": 0.2246,
        "next":  0.3368,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermalGraphite/processPrice
 */
thermalGraphiteRouter.get('/processPrice', authHelpers.isJWTAuthenticated, thermalGraphites.getProcessPrice)

module.exports = thermalGraphiteRouter
