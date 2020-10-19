const router = require('koa-router')
const cablewire = require('../../../../api/database/cablewire.js')
const cablewireRouter = new router()
const cablewires = new cablewire()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/cablewire/cablewireParameter get Cable Wire Parameter
 * @apiName get Cable Wire Parameter
 * @apiGroup Cable Wire
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
  "cableWireParameter": [{
    "id": 1,
    "type": "零件",
    "items": [{
      "id":1,
      "item": "地片 單價",
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
 * @apiError 400 id required
 * @apiSampleRequest /database/cablewire/cableWireParameter
 */
cablewireRouter.get('/cableWireParameter', authHelpers.isJWTAuthenticated,  cablewires.getCableWireParameter)

/**
 *
 * @api {get} /database/cablewire/materialPrice get Cable Wire material Price
 * @apiName get Cable Wire material Price
 * @apiGroup Cable Wire
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
    "item": "同軸線",
    "gauge": 24,
    "last": 0.09,
    "current": 0.95,
    "next": 0.1,
  }, {
    "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
    "item": "鐵氟龍線",
    "gauge": 24,
    "last": 0.19,
    "current": 0.54,
    "next": 0.12,
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/cablewire/materialPrice
 */
cablewireRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, cablewires.getCableWireMaterialPrice)

/**
 *
 * @api {get} /database/cablewire/connectorPrice get Cable Wire Connector Price
 * @apiName get Cable Connector Price
 * @apiGroup Cable Wire
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
    "id": 1,
    "type": "CCD Connector",
    "items": [{
      "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
      "type": "Panel connector(with pull bar/30 pin)",
      "vendorPN": "LWC：LV03130-21201",
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
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/cablewire/connectorPrice
 */
cablewireRouter.get('/connectorPrice', authHelpers.isJWTAuthenticated, cablewires.getCableWireConnectorPrice)

/**
 *
 * @api {put} /database/cablewire/modify/materialSpec modify Cable Wire Connector Price
 * @apiName modify Cable Wire Connector Price
 * @apiGroup Cable Wire
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "items": [{
    "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
    "price": 0.2298,
    "processTime": 45
  }, {
    "id": "c2eac716-fc4b-11e9-b46a-0242ac110002",
    "price": 0.1234,
    "processTime": 50
  }]
}

 * @apiSampleRequest /database/cablewire/modify/connectorPrice
 */

cablewireRouter.put('/modify/connectorPrice', authHelpers.isJWTAuthenticated, cablewires.putCableWireConnectorPrice)


module.exports = cablewireRouter
