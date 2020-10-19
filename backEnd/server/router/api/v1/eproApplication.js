const router = require('koa-router')
const application = require('../../../api/eproApplication/application.js')
const authHelper = require('../../../helpers/authHelper/index.js')

const applications = new application()
const applicationRouter = new router()

const authHelpers = new authHelper()
/**
 * @api {get} /project/infos/:project_id  get ee info by project_code
 * @apiName  get ee project info by project_code
 * @apiGroup application
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *[
 *    {
 *        "project_code": "4PD0HE010001",
 *        "project_name": "A1_WL",
 *        "product_type": "Notebook.Computer",
 *        "purchasing_organization": "PWCD",
 *        "stage": [
 *            "RFQ",
 *            "SB"
 *        ]
 *    }
 *]
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /application/project/infos/:project_id
 */
applicationRouter.get('/project/infos/:project_code', authHelpers.isJWTAuthenticated, applications.getProjectInfoByProjectCode)

/**
 * @api {get} /project/skus/:project_code/:stage  get sku by project_code and stage
 * @apiName  get sku by project_code and stage
 * @apiGroup application
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *[
 *    "Discrete",
 *    "UMA"
 *]
 * @apiSuccessExample {json} Success-R`esponse:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /project/skus/:project_code/:stage
 */
applicationRouter.get('/project/skus/:project_code/:stage', authHelpers.isJWTAuthenticated, applications.getSkus)

module.exports = applicationRouter
