const router = require('koa-router')
const login = require('../../../api/admin/login.js')
const logout = require('../../../api/admin/logout.js')
const user = require('../../../api/admin/user.js')
const RBAC = require('../../../api/admin/rbac.js')

const adminRouter = new router()
const logins = new login()
const logouts = new logout()
const users = new user()
const rbac = new RBAC()
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 * @api {post} /admin/login 使用者登入
 * @apiName Login
 * @apiGroup Admin
 *
 * @apiParam {String} username 使用者工號
 * @apiParam {String} password 使用者密碼
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "username": "10709101",
 *  "password": "Passw0rd"
 * }
 *
 * @apiSuccess {String} username username
 * @apiSuccess {String} access_token Success token
 * @apiSuccess {String} token_type Token type
 * @apiSuccess {String} expires_in token expire time
 * @apiSuccess {Boolean} isAdmin user permission
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "username": "Punto Lin"
    "access_token": "JQ_RCYU7iDyf4J6JObUH4Vp0gjTcRbOtD1pfPhGPZGawLQLZILsKtqd4fd4A9hu9O_PNVzDdb4ZBnnqWaUnHib-0pXhG6ilKLVwcB8hq9kxROhDtSQ3RJqYG42XHTgztZIjqPIaaL1Z2ACOSZJkJo9qrPq6xWJ8UuarH42QfBVg_A7B0x-lEGmGdpFh1N3nKlJjey0FdbhirX3c1PMyqqcaavC6MI6uVApT22NqCPYE",
    "token_type": "bearer",
    "expires_in": 86399,
    "isAdmin": true,
    "isMe": true,
    "isCe": true,
    "isEe": true,
    "isSourcer": false,
    "isRd": false,
    "isPm": false,
    "isMeTmFm": false,
    "isAccount": false,
    "isContactWindow": false
  }
*
* @apiError 401 Account or Password is not correct.
* @apiError 401 Error Password Over Five Times.
* @apiError 401 User Not Sync To User Table.
* @apiError 405 Method Not Allowed.
* @apiError 422 body parse error.
* @apiError 500 Internal Server Error.
* @apiSampleRequest /admin/login
*/
adminRouter.post('/login', logins.login)
/**
 *
 * @api {post} /admin/logout 使用者登出
 * @apiName Logout
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess (200) {type} msg return logout success message
 *
 * @apiError 401 Unauthorized without token in request hearer
 * @apiSampleRequest /admin/logout
 */

adminRouter.post('/logout', authHelpers.isJWTAuthenticated, logouts.logout)
/**
 *
 * @api {get} /admin/users?pages=1&&items=10&&orderBy=name_a&&keyword=joe&&isCW=0&&role_group=CE&&role_name=ME get user list
 * @apiName user list
 * @apiGroup Admin
 * @apiParam {String} isCW If isCW=0 then is for admin all user list, if isCW=1 is for contact window user list

 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Integer} numberOfUser  人員總數
 * @apiSuccess {String} emplid  工號
 * @apiSuccess {String} name name
 * @apiSuccess {String} phone phone
 * @apiSuccess {Boolean} is_me  me permission
 * @apiSuccess {Boolean} is_ce   ce permission
 * @apiSuccess {Boolean} is_ee   ee permission
 * @apiSuccess {Boolean} is_superuser   admin permission
 * @apiSuccess {Boolean} is_sourcer sourcer permission
 * @apiSuccess {Boolean} is_rd rd permission
 * @apiSuccess {Boolean} is_pm pm permission
 * @apiSuccess {Boolean} is_me_tm_fm me-tm/fm permission
 * @apiSuccess {Boolean} is_account account permission
 * @apiSuccess {Boolean} is_contact_window contact window permission
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "userInfo":{
      numberOfUser: 150
      userList:[
      {
        "emplid": "10503314",
        "name_a": "ALLIE CHANG",
        "email_address": "Allie_Chang@wistron.com",
        "type1": [ "Xformer", "Electro-Mechanical"],
        "phone": "305",
        "is_contact_window": false,
        "role_group": "RD",
        "role_name": "ME"
      },
      {
        "emplid": "10510307",
        "name_a": "JIMMY HOU",
        "email_address": "Jimmy_Hou@wistron.com",
        "type1": [ "Xformer", "Electro-Mechanical"],
        "phone": "357",
        "is_contact_window": false,
        "role_group": "CE",
        "role_name": "ME_EE"
      }
      ]
    }
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiError 400 role group or name is not found
 * @apiSampleRequest /admin/users?pages=1&&items=10&&orderBy=name_a&&isCW=0
 */

adminRouter.get('/users', authHelpers.isJWTAuthenticated, users.userList)
/**
 *
 * @api {get} /admin/contactwindowlist get contact window list
 * @apiName contact window list
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String} name  roleName
 * @apiSuccess {String} type  roleType
 * @apiSuccess {String} emplid  工號
 * @apiSuccess {String} name_a name
 * @apiSuccess {String} phone phone
 * @apiSuccess {string} email_address email address
 * @apiSuccess {Boolean} is_me  me permission
 * @apiSuccess {Boolean} is_ce   ce permission
 * @apiSuccess {Boolean} is_ee   ee permission
 * @apiSuccess {Boolean} is_superuser   admin permission
 * @apiSuccess {Boolean} is_sourcer   sourcer permission
 * @apiSuccess {Boolean} is_rd   rd permission
 * @apiSuccess {Boolean} is_pm   pm permission
 * @apiSuccess {Boolean} is_me_tm_fm   me-tm/fm permission
 * @apiSuccess {Boolean} is_account   account permission
 * @apiSuccess {Boolean} is_contact_window   contact window permission

* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "contactWindow": [
    {
      "name": "RD",
      "type": "ME",
      "list": [
        {
          "is_contact_window": true,
          "emplid": "10503307",
          "name_a": "JOE CY CHEN",
          "email_address": "Joe_CY_Chen@wistron.com",
          "phone": "296",
          "role_type": "rd:me"
        }
      ]
    },
    {
      "name": "RD",
      "type": "EE",
      "list": []
    },
    {
      "name": "RD",
      "type": "METMFM",
      "list": []
    },
    {
      "name": "SOURCER",
      "type": "ME",
      "list": []
    },
    {
      "name": "SOURCER",
      "type": "EE",
      "list": [
        {
          "is_contact_window": true,
          "role_type": "sourcer:ee",
          "emplid": "10700001",
          "name_a": "ADMIN",
          "email_address": null,
          "phone": null
        }
      ]
    },
    {
      "name": "PM",
      "type": "ACCOUNT",
      "list": []
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/contactwindowlist
 */
adminRouter.get('/contactwindowlist', authHelpers.isJWTAuthenticated, users.getContactWindow)

/**
 *
 * @api {get} /admin/user/10503307 get user information
 * @apiName user info
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "userInfo": {
    "role_group": "RD",
    "role_name": "ME",
    "emplid": "10503307",
    "name_a": "JOE CY CHEN",
    "email_address": "Joe_CY_Chen@wistron.com",
    "phone": "296",
    "is_contact_window": true,
    "xray_types": {
            "All": [
                {
                    "id": 8,
                    "type1": "Xformer",
                    "category": 2
                }
            ]
        }
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /admin/user/10503307
 */
adminRouter.get('/user/:id', authHelpers.isJWTAuthenticated, users.getUserInfo)

/**
 *
 * @api {put} /admin/user/:id update user
 * @apiName update user
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *{
 * "role_name": "pm",
 * "role_type": "account",
 * "is_contact_window":true,
 * "del_type1": [1,2,3],
 * "add_type1": [4,5,6]
 *}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 no match roleName and roleType

 * @apiSampleRequest /admin/user/10503307
 */
adminRouter.put('/user/:id', authHelpers.isJWTAuthenticated, users.updateUser)

/**
 * @api {post} /admin/user create user
 * @apiName create user
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} emplid  工號
 * @apiParam {String} name name
 * @apiParam {String} phone phone
 * @apiParam {String} role_name   permission
 * @apiParam {String} role_type   permission
 * @apiParam {Boolean} isContactWindow   permission
 *
 * @apiParamExample  {json} Request-Example:
 *{
 *  "emplid": "10503314",
 *  "name": "ALLIE CHANG",
 *  "phone": "305",
 *  "email": "Allie_Chang@wistron.com",
 *  "role_group": "RD",
 *  "role_name": "ME",
 *  "is_contact_window":true
 *  "del_type1": [1,2,3]
 *  "add_type1": [4,5,6]
 *}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
 *
 * @apiError 400 no match roleName and roleType
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 account already exist
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/user
 */

adminRouter.post('/user', authHelpers.isJWTAuthenticated, users.createUser)

/**
 *
 * @api {delete} /admin/user/:id delete user
 * @apiName delete user
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} id  工號
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/user
 */
adminRouter.delete('/user/:id', authHelpers.isJWTAuthenticated, users.deleteUser)

/**
 * @api {post} /admin/search/user  search user
 * @apiName search user
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} name User Name
 * @apiParam {String} phone User Extension
 * @apiParam {String} emplid User Employee Number (工號)
 * @apiParam {String} email User Email
 * @apiParamExample {json} Request-Example:
{
  "name": "ian k",
  "phone": null,
  "emplid": null,
  "email": null
}
 * @apiSuccess {Object[]} userList List of Users (Array of Objects).
 * @apiSuccess {String} userList.emplid  工號
 * @apiSuccess {String} userList.name name
 * @apiSuccess {String} userList.email  email
 * @apiSuccess {String} userList.phone phone
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "userList": [
        {
            "emplid": "9701045",
            "name": "BRIAN KUO",
            "email": "Brian_Kuo@wistron.com",
            "phone": "2340"
        },
        {
            "emplid": "10403304",
            "name": "IAN KUO",
            "email": "Ian_Kuo@wistron.com",
            "phone": "213"
        }
    ]
}
*
* @apiError 401 Unauthorized
* @apiError 403 PERMISSION DENIED
* @apiError 500 Internal Server Error.
*/

adminRouter.post('/search/user', authHelpers.isJWTAuthenticated, users.searchUser)
/**
 * @api {get} /admin/permission/:token  get permission
 * @apiName get user permission
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} userID  工號
 * @apiSuccess {Boolean} isAdmin isAdmin
 * @apiSuccess {Boolean} isCe isCe
 * @apiSuccess {Boolean} isMe  isMe
 * @apiSuccess {Boolean} isEe  isEe
 * @apiSuccess {Boolean} isSourcer  isSourcer
 * @apiSuccess {Boolean} isRd  isRd
 * @apiSuccess {Boolean} isPm  isPm
 * @apiSuccess {Boolean} isMeTmFm  isMeTmFm
 * @apiSuccess {Boolean} isAccount  isAccount
 * @apiSuccess {Boolean} isContactWindow  isContactWindow
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
   {
    "userID": "10503307",
    "isAdmin": true,
    "isCe": false,
    "isMe": false,
    "isEe": true,
    "isSourcer": true,
    "isRd": false,
    "isPm": false,
    "isMeTmFm": false,
    "isAccount": false,
    "isContactWindow": false
}
  }
*

* @apiError 401 Unauthorized
* @apiError 500 Internal Server Error.
* @apiSampleRequest /admin/user
*/

adminRouter.get('/permission/:token', authHelpers.isJWTAuthenticated, users.getPermission)
/**
 *
 * @api {get} /admin/rbacpermission?resource=me_bom_projects&action=View get rbac permission
 * @apiName get rbac permission
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} resource - ee_bom_projects
 * - me_bom_projects
 * - me_bom_projects.bom_item.system_cost
 * - me_bom_projects.bom_item.source_cost
 * * @apiParam {String} action - Approve
 * - CreateNextStatus
 * - EditOwn
 * - EditAll
 * - List
 * - VersionComplete
 * -  View
 * @apiSuccess {Object} action  List, CreateNextStatus, EditAll, EditOwn, Export, View, Approve
 * @apiSuccess {Object[]} allow list of allowed resources
 * @apiSuccess {Object[]} deny list of denied resources

* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "List": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "CreateNextStatus": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "Edit": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "Export": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": [
            "me_bom_projects.bom_item.system_cost",
            "me_bom_projects.bom_item.source_cost"
        ]
    },
    "View": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": [
            "me_bom_projects.bom_item.system_cost",
            "me_bom_projects.bom_item.source_cost"
        ]
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbacpermission
 */

adminRouter.get('/rbacpermission', authHelpers.isJWTAuthenticated, rbac.getPermission)

/**
 * @api {post} /admin/backLogin 使用者登入
 * @apiName backLogin
 * @apiGroup Admin
 *
 * @apiParam {String} username 使用者工號
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "username": "10709101"
 * }
 *
 * @apiSuccess {String} username username
 * @apiSuccess {String} access_token Success token
 * @apiSuccess {String} token_type Token type
 * @apiSuccess {String} expires_in token expire time
 * @apiSuccess {Boolean} isAdmin user permission
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "username": "Punto Lin"
    "access_token": "JQ_RCYU7iDyf4J6JObUH4Vp0gjTcRbOtD1pfPhGPZGawLQLZILsKtqd4fd4A9hu9O_PNVzDdb4ZBnnqWaUnHib-0pXhG6ilKLVwcB8hq9kxROhDtSQ3RJqYG42XHTgztZIjqPIaaL1Z2ACOSZJkJo9qrPq6xWJ8UuarH42QfBVg_A7B0x-lEGmGdpFh1N3nKlJjey0FdbhirX3c1PMyqqcaavC6MI6uVApT22NqCPYE",
    "token_type": "bearer",
    "expires_in": 86399,
    "isAdmin": true,
    "isMe": true,
    "isCe": true,
    "isEe": true,
    "isSourcer": false,
    "isRd": false,
    "isPm": false,
    "isMeTmFm": false,
    "isAccount": false,
    "isContactWindow": false
  }
*
* @apiError 401 Account or Password is not correct.
* @apiError 401 Error Password Over Five Times.
* @apiError 401 User Not Sync To User Table.
* @apiError 405 Method Not Allowed.
* @apiError 422 body parse error.
* @apiError 500 Internal Server Error.
* @apiSampleRequest /admin/backLogin
*/
adminRouter.post('/backLogin', logins.bcakLogin)

/**
 * @api {post} /admin/rbac/role create rbac role
 * @apiName create rbac role
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} rolename role name
 *
 * @apiParamExample  {json} Request-Example:
 * {
      "groupName": "",
      "roleName": "",
      "refRole": "role_id"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 role name is already exist
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/role
 */
adminRouter.post('/rbac/role', authHelpers.isJWTAuthenticated, rbac.createRbacRole)

/**
 * @api {get} /admin/rbac/role/list get rbac roles list
 * @apiName get rbac role list
 * @apiDescription 取得rabc role list, 依照role group 分群
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} orderBy sorter
 * @apiParam {String} roleGroups
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    {
        "role_group": "sourcer",
        "roles": [
            {
                "id": 4,
                "role_name": "me"
            },
            {
                "id": 9,
                "role_name": "me_ee"
            },
            {
                "id": 6,
                "role_name": "ee"
            }
        ]
      }
    ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin//rbac/role/list
 */
adminRouter.get('/rbac/role/list', authHelpers.isJWTAuthenticated, rbac.getRbacRoleList)

/**
 * @api {delete} /admin/rbac/role/:roleId delete role name
 * @apiName delete role name
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} roleId  role name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/role/:roleId
 */
adminRouter.delete('/rbac/role/:roleId', authHelpers.isJWTAuthenticated, rbac.deleteRbacRole)

/**
 * @api {put} /admin/rbac/role  update role name
 * @apiName update role name
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
  [
    {
      roleId: "role_id",
      groupName: "",
      roleName: ""
    }
  ]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 new role name is already exist
 * @apiSampleRequest /admin/rbac/role
 */
adminRouter.put('/rbac/role', authHelpers.isJWTAuthenticated, rbac.updateRbacRole)

/**
 * @api {get} /admin/rbac/actions  get rbac actions list
 * @apiName get rbac actions list
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "RbacActionList": [
        {
            "action": "List",
            "rs": "common"
        },
        {
            "action": "CreateNextStatus",
            "rs": "me_bom_projects"
        }
    ]
 }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/actions
 */
adminRouter.get('/rbac/actions', authHelpers.isJWTAuthenticated, rbac.getRbacActionList)

/**
 * @api {post} /admin/rbac/actions create rbac actions
 * @apiName create rbac actions
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} action  rbac action
 * @apiParam {String} rs
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "action": "List",
 *  "rs": "common"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 action is already exist
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/action
 */
adminRouter.post('/rbac/actions', authHelpers.isJWTAuthenticated, rbac.createRbacAction)

/**
 * @api {delete} /admin/rbac/actions/:action  delete role action
 * @apiName delete role action
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParams {String} action  action
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/actions/:action
 */
adminRouter.delete('/rbac/actions/:action', authHelpers.isJWTAuthenticated, rbac.deleteRbacAction)

/**
 * @api {put} /admin/rbac/actions/update/:action  update rbac action rs
 * @apiName update rs in rbac action
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "rs": "common"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/actions/update/:action
 */
adminRouter.put('/rbac/actions/update/:action', authHelpers.isJWTAuthenticated, rbac.updateRbacAction)

/**
 * @api {post} /admin/rbac/resources  create rbac resources
 * @apiName create rbac resources
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} rsNode  rs node
 * @apiParam {String} rsPath  rs path
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "rsNode": "spec"
 *  "rsPath": "xray.spec"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "id": 1
 }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 path is already exist
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/resources
 */
adminRouter.post('/rbac/resources', authHelpers.isJWTAuthenticated, rbac.createRbacResources)

/**
 * @api {get} /admin/rbac/resources  get rbac resources list
 * @apiName get rbac resources list
 * @apiDescription 取得rabc resource列表,過濾是否為root
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {Boolean} is_root
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    [
      {
        "id": 2,
        "rs_node": "me_bom_projects",
        "rs_path": "me_bom_projects",
        "description": null,
        "is_root": true
      }
    ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/resources
 */
adminRouter.get('/rbac/resources', authHelpers.isJWTAuthenticated, rbac.getRbacResourcesList)

/**
 * @api {delete} /admin/rbac/resources/:id  delete role resources
 * @apiName delete role resources
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} id  role resources id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/resources/:id
 */
adminRouter.delete('/rbac/resources/:id', authHelpers.isJWTAuthenticated, rbac.deleteRbacResources)

/**
 * @api {put} /admin/rbac/resources/:id  update role resources
 * @apiName update role resources
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
* @apiParam {String} id  resources id
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "rsNode": "spec"
 *  "rsPath": "xray.spec"
 * }
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 path is already exist
 * @apiSampleRequest /admin/rbac/resources/:id
 */
adminRouter.put('/rbac/resources/:id', authHelpers.isJWTAuthenticated, rbac.updateRbacResources)


/**
 * @api {post} /admin/rbac/policies create rbac policies
 * @apiName create rbac policies
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} action  rbac action
 * @apiParam {Integer} rsId  rbac resources id
 * @apiParam {Boolean} effect  effect
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "action": "List",
 *  "rsId": 1,
 *  "effect": true
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/policies
 */
adminRouter.post('/rbac/policies', authHelpers.isJWTAuthenticated, rbac.createRbacPolicies)

/**
 * @api {get} /admin/rbac/policies  get rbac policies list
 * @apiName get rbac policies list
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {Integer} rsId  rbac resources id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
        {
            "id": 2,
            "action": "List",
            "rs_id": 2,
            "effect": true
        },
        {
            "id": 3,
            "action": "CreateNextStatus",
            "rs_id": 2,
            "effect": true
        }
   ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/policies
 */
adminRouter.get('/rbac/policies', authHelpers.isJWTAuthenticated, rbac.getRbacPoliciesList)

/**
 * @api {delete} /admin/rbac/policies/:id  delete rbac policies
 * @apiName delete role policies
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} id  rbac policies id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/policies/:id
 */
adminRouter.delete('/rbac/policies/:id', authHelpers.isJWTAuthenticated, rbac.deleteRbacPolicies)

/**
 * @api {put} /admin/rbac/policies/:id  update rbac policies
 * @apiName update rbac policies
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} id  rbac policies id
 * @apiParam {String} action  rbac action
 * @apiParam {Integer} rsId  rbac resources id
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "action": "List",
 *  "rsId": 1,
 *  "effect": true
 * }
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /admin/rbac/policies/:id
 */
adminRouter.put('/rbac/policies/:id', authHelpers.isJWTAuthenticated, rbac.updateRbacPolicies)

/**
 * @api {get} /admin/rbac/policy/roles  get rbac policy role list
 * @apiName get rbac policy role list
 * @apiDescription 取得rabc policy role列表
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} rs_id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    [
      "15": [
        {
            "id": 36,
            "policy_id": 15,
            "role_id": 1,
            "action": "View",
            "effect": true,
            "description": null,
            "rs_path": "xray.me"
        }
      ]
    ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/policy/roles
 */
adminRouter.get('/rbac/policy/roles', authHelpers.isJWTAuthenticated, rbac.getPolicyRoles)

/**
 * @api {post} /admin/rbac/policy/role create rbac policy role
 * @apiName create rbac policy role
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} roleId
 * @apiParam {String} policyId
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "policyId": "List",
 *  "roleId": "common"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 action is already exist
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/policy/role
 */
adminRouter.post('/rbac/policy/role', authHelpers.isJWTAuthenticated, rbac.createPolicyRole)

/**
 * @api {put} /admin/rbac/policy/role update rbac policy role
 * @apiName update rbac policy role
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * [
 *    {
 *      "roleId": "role_id",
 *      "add": ["policy_id"],
 *      "delete": ["policy_id"]
 *    }
 * ]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 action is already exist
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/policy/role
 */
adminRouter.put('/rbac/policy/role', authHelpers.isJWTAuthenticated, rbac.updatePolicyRole)

/**
 * @api {delete} /admin/rbac/policy/role/:id delete rbac policy role
 * @apiName delete rbac policy role
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 action is already exist
 * @apiError 500 Internal Server Error
 * @apiSampleRequest /admin/rbac/policy/role/:id
 */
adminRouter.delete('/rbac/policy/role/:id', authHelpers.isJWTAuthenticated, rbac.deletePolicyRole)

/**
 * @api {get} /admin/roleFilterType/group  get role group filter type list
 * @apiName RoleGroupFilterValue
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    "CE",
    "RD",
    "Sourcer",
    "PM",
    "Contactwindow"
 ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/roleFilterType/group
 */
adminRouter.get('/roleFilterType/group', authHelpers.isJWTAuthenticated, rbac.getRoleGroupFilterType)

/**
 * @api {get} /admin/roleFilterType/name/:gruop  get role name filter type list
 * @apiName RoleNameFilterValue
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    "ME",
    "ME/TM/FM",
    "EE"
 ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/roleFilterType/name/ME
 */
adminRouter.get('/roleFilterType/name/:group', authHelpers.isJWTAuthenticated, rbac.getRoleNameFilterType)

/**
 * @api {get} /admin/rbac/permission?group=CE&name=ME  get rbac permission list
 * @apiName RbacPermissionList
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String} group
 * - CE
 * - RD
 * - Sourcer...
 * @apiParam {String} name
 * - ME
 * - Account
 * - EE
 * - ME/EE...
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "List": [
        "ee_bom_projects.detail",
        "ee_bom_projects.version",
        "dashboard"
    ],
    "Export": [
        "xray.ee"
    ],
    "View": [
        "xray.ee"
    ],
    "Edit": [
        "cleansheet.cal.thermal-module"
    ]
 }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /admin/rbac/permission?group=CE&name=ME
 */
adminRouter.get('/rbac/permission', authHelpers.isJWTAuthenticated, rbac.getRbacPermissions)
/**
 *
 * @api {get} /admin/nop/user/10503307 get user information
 * @apiName user info
 * @apiGroup Admin
 * @apiHeader {String} Authorization Bearer access-token.
 *
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "userInfo": {
    "role_group": "RD",
    "role_name": "ME",
    "emplid": "10503307",
    "name_a": "JOE CY CHEN",
    "email_address": "Joe_CY_Chen@wistron.com",
    "phone": "296",
    "is_contact_window": true,
    "xray_types": {
            "All": [
                {
                    "id": 8,
                    "type1": "Xformer",
                    "category": 2
                }
            ]
        }
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /admin/nop/user/10503307
 */
adminRouter.get('/nop/user/:id', authHelpers.isJWTAuthenticated, users.getNopUserInfo)
module.exports = adminRouter
