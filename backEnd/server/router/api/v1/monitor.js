const router = require('koa-router')
const monitor = require('../../../api/admin/monitor.js')

const monitorRouter = new router()
const monitors = new monitor()


/**
 * @api {get} /monitor/info service資訊
 * @apiName monitor service
 * @apiGroup Monitor
 *
 *
 *
 * @apiSuccess {Boolean} db_is_live DB health
 * @apiSuccess {String} msg service Info
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "is_live": true,
    "msg": "service  ok"
  }
  or
  {
    "db_is_live": false,
    "msg": {
        "errno": "ETIMEDOUT",
        "code": "ETIMEDOUT",
        "syscall": "connect",
        "address": "192.168.100.1",
        "port": 5432
    }
}
*
* @apiError 500 Internal Server Error.
* @apiSampleRequest /admin/login
*/
monitorRouter.get('/info', monitors.info)
module.exports = monitorRouter
