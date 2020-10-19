const router = require('koa-router')
const lpp = require('../../../api/lpp/lpp.js')
const lppRouter = new router()
const lpps = new lpp()
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {post} /lpp/getLppModule get lpp module price
 * @apiName get lpp module price
 * @apiGroup LPP
 *
 * @apiSuccess {array}	lpp module price 
 * @apiSuccessExample {json} Request-Example:

  {
	"input":[
		{
			"wistron p/n":"020.F0111.0004",
			"Plant":"F230",
			"Profit_Center":"PCL300",
			"Manufacturer":"ACES"
		},
		{
			"wistron p/n":"64.10035.L3L",
			"Plant":"F711",
			"Profit_Center":"PCL100",
			"Manufacturer":"YAGEO"
		},
		{
			"wistron p/n":"075.PUSB3.0073",
			"Plant":"F230",
			"Profit_Center":"PCWTBA",
			"Manufacturer":"NXP"
		}
		
	]
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
  [
    0.020135,
    0.000195,
    0.022052
  ]

 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
lppRouter.post('/getLppModule', lpps.getLppModule)



module.exports = lppRouter