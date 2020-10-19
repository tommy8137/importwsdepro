const Router = require('koa-router')
const EebomApi = require('../../../../api/database/eebom.js')
const eebomRouter = new Router()
const eebomApi = new EebomApi()
const AuthHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new AuthHelper()

/**
 *
 * @api {post} /database/eebom/avl upload Avl Excel
 * @apiName upload Avl Excel
 * @apiGroup database Eebom AVL
 * @apiDescription 上傳avl
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "avl_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/avl
 */
eebomRouter.post('/avl', authHelpers.isJWTAuthenticated, eebomApi.postAvlExcel.bind(eebomApi))

/**
 *
 * @api {get} /database/eebom/avl/:avl_id Export Avl Excel
 * @apiName Export Avl Excel
 * @apiGroup database Eebom AVL
 * @apiDescription 匯出Avl Excel
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/avl/:avl_id
 */
eebomRouter.get('/avl/:avl_id', authHelpers.isJWTAuthenticated, eebomApi.exportAvl.bind(eebomApi))

/**
 *
 * @api {get} /database/eebom/avl/ Get AVL List
 * @apiName Get AVL List
 * @apiGroup database Eebom AVL
 * @apiDescription Get Avl List
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "avl_list": [
      {
        "avl_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
        "file_name": "aabbcc",
        "update_by": "jojo",
        "update_time": "2019-04-18T10:28:07.236Z",
        "version": 2,
      } ...
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/avl/
 */
eebomRouter.get('/avl', authHelpers.isJWTAuthenticated, eebomApi.getAvlList.bind(eebomApi))
/**
 *
 * @api {post} /database/eebom/connector/commonpool upload Connector Common Pool Excel
 * @apiName upload Connector Common Pool Excel
 * @apiGroup database Eebom ConnectorCommonPool
 * @apiDescription 上傳Connector Common Pool
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "common_pool_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/connector/commonpool
 */
eebomRouter.post('/connector/commonpool', authHelpers.isJWTAuthenticated, eebomApi.postConnectorExcel.bind(eebomApi))
/**
 *
 * @api {get} /database/eebom/export/commonpool/:commonId Export Common Pool Excel
 * @apiName Export Common Pool Excel
 * @apiGroup database Eebom Common Pool
 * @apiDescription Common Pool Excel
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/export/commonpool/:commonId
 */
eebomRouter.get('/export/commonpool/:commonId', authHelpers.isJWTAuthenticated, eebomApi.exportCommonPool.bind(eebomApi))
/**
 *
 * @api {get} /database/eebom/commonpool/ Get Common Pool List
 * @apiName Get Common Pool List
 * @apiGroup database Eebom Common Pool
 * @apiDescription Get Common Pool List
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "common_pool_list": [
      {
        "common_pool_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
        "file_name": "aabbcc",
        "update_by": "jojo",
        "update_time": "2019-04-18T10:28:07.236Z",
        "version": 2,
      } ...
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/commonpool/
 */
eebomRouter.get('/commonpool', authHelpers.isJWTAuthenticated, eebomApi.getCommonPoolInfo.bind(eebomApi))

/**
 *
 * @api {get} /database/eebom/temporary/ Get Temporary File List
 * @apiName Get Temporary File List
 * @apiGroup database Eebom Temporary File
 * @apiDescription Get Avl List
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "temporary_list": [
      {
        "temporary_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
        "file_name": "aabbcc",
        "update_by": "jojo",
        "update_time": "2019-04-18T10:28:07.236Z",
      } ...
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/temporary/
 */
eebomRouter.get('/temporary', authHelpers.isJWTAuthenticated, eebomApi.getTemporaryFileList.bind(eebomApi))

/**
 *
 * @api {post} /database/eebom/temporary upload Temporary File Excel
 * @apiName upload Temporary File Excel
 * @apiGroup database Eebom Temporary File
 * @apiDescription 上傳temporary
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
{
    "temporary_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/temporary
 */
eebomRouter.post('/temporary', authHelpers.isJWTAuthenticated, eebomApi.postTemporaryExcel.bind(eebomApi))

/**
 *
 * @api {get} /database/eebom/temporary/:temporary_id Export Temporary File
 * @apiName Export Temporary File
 * @apiGroup database Eebom Temporary
 * @apiDescription 匯出Temporary File
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Response-Example:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 missing parameter
 * @apiSampleRequest /database/eebom/temporary/:temporary_id
 */
eebomRouter.get('/temporary/:temporary_id', authHelpers.isJWTAuthenticated, eebomApi.exportTemporary.bind(eebomApi))
eebomRouter.delete('/temporary/:temporary_id', authHelpers.isJWTAuthenticated, eebomApi.removeTemporary.bind(eebomApi))
module.exports = eebomRouter
