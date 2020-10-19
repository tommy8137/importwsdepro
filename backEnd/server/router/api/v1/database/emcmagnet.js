const router = require('koa-router')
const emcmagnet = require('../../../../api/database/emcmagnet.js')
const emcmagnetRouter = new router()
const emcmagnets = new emcmagnet()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/emcmagnet/emcMagnetParameter get EMC Magnet Parameter
 * @apiName get EMC Magnet Parameter
 * @apiGroup EMC Magnet
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
  "emcMagnetParameter": [{
    "id": 1,
    "type": "加工",
    "items": [{
        "id":1,
        "item": "才切加工費單價",
        "unit": "USD",
        "last": 5.00,
        "current": 2.5,
        "next": 1.5,
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/emcmagnet/emcMagnetParameter
 */
emcmagnetRouter.get('/emcMagnetParameter', authHelpers.isJWTAuthenticated, emcmagnets.getEmcMagnetParameter)
/**
 *
 * @api {get} /database/emcmagnet/cutLossRate get EMC Magnet cutLossRate
 * @apiName get EMC Magnet CutLossRate
 * @apiGroup EMC Magnet
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
    "cutLossRate": [{
        "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
        "item": "(成品尺寸L*成品尺寸W*成品尺寸H) < 60",
        "last":  45,
        "current": 45,
        "next":  45,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/emcmagnet/cutLossRate
 */
emcmagnetRouter.get('/cutLossRate', authHelpers.isJWTAuthenticated, emcmagnets.getCutLossRate)

/**
 *
 * @api {get} /database/emcmagnet/materialPrice get EMC Magnet material Price
 * @apiName get EMC Magnet material Price
 * @apiGroup EMC Magnet
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
  "materialPrice": [{
    "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
    "item": "N48磁鋼",
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
 * @apiSampleRequest /database/emcmagnet/materialPrice
 */
emcmagnetRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, emcmagnets.getEmcMagnetMaterialPrice)

/**
 *
 * @api {put} /database/emcmagnet/modify/cutLossRate put EMC Magnet cutLossRate
 * @apiName put EMC Magnet CutLossRate
 * @apiGroup EMC Magnet
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/emcmagnet/modify/cutLossRate
{
    "nextId": 3,
    "items": [{
        "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
        "next": 55
    },{
        "id": "c2eac716-fc4b-11e9-b46a-0242ac110002",
        "next": 60
    }]
}
 */
emcmagnetRouter.put('/modify/cutLossRate', authHelpers.isJWTAuthenticated, emcmagnets.putCutLossRate)

/**
 *
 * @api {get} /database/emcmagnet/manPowerPrice get EMC Magnet Man Power Price
 * @apiName get EMC Man Power Price
 * @apiGroup EMC Magnet
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
    "manPowerPrice": [{
        "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
        "item": "(成品尺寸L*成品尺寸W*成品尺寸H) < 200",
        "last":  0.1124,
        "current": 0.2246,
        "next":  0.3368,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/emcmagnet/manPowerPrice
 */
emcmagnetRouter.get('/manPowerPrice', authHelpers.isJWTAuthenticated, emcmagnets.getManPowerPrice)
module.exports = emcmagnetRouter
