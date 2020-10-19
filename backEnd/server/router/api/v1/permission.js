const router = require('koa-router')
const role = require('../../../api/permissions/roleManagement.js')
const authHelper = require('../../../helpers/authHelper/index.js')

const roles = new role()
const permissionRouter = new router()

const authHelpers = new authHelper()
/**
 * @api {get} /permission/role/menus  get setting roles menu
 * @apiName  get setting roles menu
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "Xray/ME": "xray.spec.me",
 *   "Xray/EE": "xray.spec.ee",
 *   "Clean Sheet 計算機": "cleansheet",
 *   "Dashboard": "dashboard",
 *   "Bom Management/ME": "ee_bom_projects",
 *   "Bom Management/EE": "me_bom_projects",
 *   "Permission": "permission",
 *   "Setting/ME": "setting.me",
 *   "Setting/EE": "setting.ee"
 * }
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /permission/role/menus
 */
permissionRouter.get('/role/menus', authHelpers.isJWTAuthenticated, roles.getMenus)

/**
 * @api {get} /permission/type1/scope  get type1 scope by request
 * @apiName  get type1 scope by request
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} scode  sourcer code id (scode, eeme擇一填)
 * @apiParam {String} eeme  user role is ce/me (scode, eeme擇一填)
 * @apiParam {String} on the scope is on which resource
 * @apiSuccessExample  {array} Request-Example:
 * [{
 *       "id": 6,
 *       "type1": "Solder",
 *       "category": 1,
 *       "used_on": 1
 *   }]
 */
permissionRouter.get('/type1/scope', authHelpers.isJWTAuthenticated, roles.getType1Scope)

/**
 * @api {get} /permission/product/scope  get product type scope by request
 * @apiName  get product type scope by request
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} eeme  user role is ce/me
 * @apiParam {String} on the scope is on which resource
 * @apiSuccessExample  {array} Request-Example:
 * [{
 *		"id":1,
 *		"product_type":"AIO"
 *}]
 */
permissionRouter.get('/product/scope', authHelpers.isJWTAuthenticated, roles.getProductTypeScope)

/**
 * @api {post} /permission/user/type1  get type1 scope by request
 * @apiName  get type1 scope by request
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
 *  "emplid": "10504301"
 *  "type1_id": []
 * }
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /permission/role/menus
 */
permissionRouter.post('/user/type1', authHelpers.isJWTAuthenticated, roles.createUserType1Scope)

/**
 * @api {put} /permission/user/type1  get type1 scope by request
 * @apiName  get type1 scope by request
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
 *  "emplid": "10504301",
 *  "type1_id": []
 * }
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /permission/role/menus
 */
permissionRouter.put('/user/type1', authHelpers.isJWTAuthenticated, roles.deleteUserType1Scope)

/**
 * @api {get} /permission/role/list  get roles list
 * @apiName  get roles list
 * @apiGroup permission
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 * }
 */
permissionRouter.post('/role/list', roles.getRoles)

module.exports = permissionRouter
