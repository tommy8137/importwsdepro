const router = require('koa-router')
const setting = require('../../../api/setting/setting.js')
const settingRouter = new router()
const settings = new setting()
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()
/**
 *
 * @api {get} /setting/list get ee assignment list
 * @apiName setting ee assignment list
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Object[]} ee assignment list of Setting (Array of Objects).
 * @apiSuccess {String}   setting.type1 type1 Name
 * @apiSuccess {String}   setting.type2 type2 Name
 * @apiSuccess {String}   setting.pic pic Name
 * @apiSuccess {String}   setting.pic_emplid pic_emplid  PIC emplyee ID
 * @apiSuccess {String}	  setting.proxy proxy Name
 * @apiSuccess {String}	  setting.proxy_emplid proxy_emplid PROXY emplyee ID
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
		isEditAble: true,
		list: {
		  type1:'PCB',
		  type2:'PTH,PCB,HDI',
		  pic:'Tommy_Tsai',
		  pic_emplid:'10611079',
		  proxy:'test user',
		  proxy_emplid:'10011000',
		}
  }
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/list', authHelpers.isJWTAuthenticated, settings.getEeAssignmentList)

/**
 *
 * @api {put} /setting/assign assign pic proxy
 * @apiName assign pic proxy
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String}	  update success update response
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *		assign success
 *
 * @apiParamExample  {json} Request-Example:
	{
		"type1": "LED",
		"pic": "Tommy_Tsai",
		"pic_emplid": "10611079",
		"proxy": "test",
		"proxy_emplid":"10804100"
	}
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.put('/assign', authHelpers.isJWTAuthenticated, settings.assign)


/**
 *
 * @api {get} /setting/search/user get ce team permission group
 * @apiName get ce team permission group
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Object[]} ce team permission group of Setting (Array of Objects).
 * @apiSuccess {String}   setting.key emplid
 * @apiSuccess {String}   setting.value Name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "userList": [
      {
        "key": "10611079",
        "value": "TOMMY TSAI"
      }
    ]
  }
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/search/user', authHelpers.isJWTAuthenticated, settings.searchUser)

/**
 *
 * @api {get} /setting/meSpec/list?spec1=product55&type1=B&type2=j get me spec title list by product_type & type1 & type2
 * @apiName setting me spec title list by spec1 & type1& type2
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} spec1
 * @apiParam  {String} type1
 * @apiParam  {String} type2

 * @apiSuccess {Object[]} ee assignment list of Setting (Array of Objects).
 * @apiSuccess {String}   setting.spec_no spec number
 * @apiSuccess {String}   setting.title title Name
 * @apiSuccess {String}   setting.edit_by who edit it
 * @apiSuccess {String}   setting.edit_time Edit Time

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
  	isEditable: true,
		res:[
			{ 'spec_no': '', 'title': '', 'edit_by': 'tommy', 'edit_time': ''},
			{ 'spec_no': '', 'title': '', 'edit_by': 'tommy', 'edit_time': ''},
			{ 'spec_no': '', 'title': '', 'edit_by': 'tommy', 'edit_time': ''},
		]
  }
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/meSpec/list', authHelpers.isJWTAuthenticated, settings.getMeSpecTitle)

/**
 *
 * @api {put} /setting/meSpec/update update me spec title
 * @apiName  update me spec title
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String}	  update success update response
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *		update success
 *
 * @apiParamExample  {json} Request-Example:
	{
		"spec1":"AIO",
		"type1":"Solder",
		"type2":"Solder",
		"spec_no": 6,
		"title": "this is for test",
	}
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.put('/meSpec/update', authHelpers.isJWTAuthenticated, settings.updateMeSpecTitle)


settingRouter.get('/productType/:role', authHelpers.isJWTAuthenticated, settings.fetchProductType)
/**
 *
 * @api {get} /setting/type1/me get type1
 * @apiName get type1
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Array} type1 array
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  ['Cable', 'Connector', 'EMc', 'Electro-Mechanical']
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/type1/:role', authHelpers.isJWTAuthenticated, settings.fetchTypeI)

/**
 *
 * @api {get} /setting/type1/me?type1=Cable get type2
 * @apiName get type2
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Array} type2 Array
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  ['FFC', 'Cable']
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/type2/:role', authHelpers.isJWTAuthenticated, settings.fetchTypeII)

/**
 *
 * @api {get} /setting/getSpec01/?type1=Cable&type2=FFC get spec1 item
 * @apiName get spec1
 * @apiGroup SETTING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Array} get spec1 item array
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  ['AIO', 'FFC']
 *
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
settingRouter.get('/getSpec01', authHelpers.isJWTAuthenticated, settings.fetchSpec01)

module.exports = settingRouter