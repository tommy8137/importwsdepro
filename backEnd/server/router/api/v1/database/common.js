const router = require('koa-router')
const common = require('../../../../api/database/common.js')
const commonRouter = new router()
const commons = new common()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/common/commonParameter get commonParameter
 * @apiName get commonParameter
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    date:{
        last: '2019/01/01',
        currnet: '2019/06/01',
        next: '2019/12/01',
    },
    values:[
        {
            id: 1,
            item: '組立',
            unit: 'K',
            last: 0.15,
            current: 0.2,
            next: 0.2,
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/commonParameter
 */
commonRouter.get('/commonParameter', authHelpers.isJWTAuthenticated, commons.getCommonParameter)


/**
 *
 * @api {get} /database/common/site get site list
 * @apiName get site list
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    siteList:[
        {
            id: 1,
            site:'WKS',
            remark:'remark',
        },
    ]

}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/site
 */
commonRouter.get('/site', authHelpers.isJWTAuthenticated, commons.getSite)

/**
 *
 * @api {get} /database/common/productType get product type list
 * @apiName get product type list
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    productTypeList: [
        {
            id: 1,
            productType: 'NB',
            remark: 'remark',
        },
        {
            id: 2,
            productType: 'DT',
            remark: 'remark',
        },
        {
            id: 3,
            productType: 'Others',
            remark: 'remark',
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/productType
 */
commonRouter.get('/productType', authHelpers.isJWTAuthenticated, commons.getProductType)

// putCommonParameter
/**
 *
 * @api {put} /database/common/modify/commonParameter modify common Parameter price
 * @apiName modify common Parameter price
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
  {
    "nextId": 12,
    "items": [
      {
        "id": "54734620-e8ad-11e9-8423-0242ac110002",
        "next": 112
      }
    ]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/common/modify/commonParameter
 */

commonRouter.put('/modify/commonParameter', authHelpers.isJWTAuthenticated, commons.putCommonParameter)

// putProductType
/**
 *
 * @api {put} /database/common/modify/productType modify put Product Type
 * @apiName modify ProductT ype
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  productTypeList: [
    {
      id: 1,
      remark: 'remark',
    },
    {
      id: 3,
      remark: 'remark',
    },
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/common/modify/productType
 */

commonRouter.put('/modify/productType', authHelpers.isJWTAuthenticated, commons.putProductType)

// putSite
/**
 *
 * @api {put} /database/common/modify/site modify put Site
 * @apiName modify site
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  siteList:[
    {
      id: 1,
      remark:'remark',
    },
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/common/modify/site
 */

commonRouter.put('/modify/site', authHelpers.isJWTAuthenticated, commons.putSite)
/**
 *
 * @api {post} /database/common/scheduleNew post scheduleNew
 * @apiName schedule new
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    formulaType: 'common',
    nextDate: '2019/12/31',
    productTypeId: 1,
}
formulaType Request By
        Common Parameter -> 'common'
        Metal CleanSheet -> 'housing_metal'
        Plastic CleanSheet ->'housing_plastic'
        Material Price Metal -> 'material'
        Thermal Module -> 'thermal_module'
        Die Cut -> 'die_cut'
        Cable Wire -> 'cable_wire'
        Cable FFC -> 'cable_ffc'
        Cable FPC -> 'cable_fpc'
        EMC Magnet -> 'emc_magnet'
        Thermal Graphite -> 'thermal_graphite'
        Rubber -> 'me_others_rubber'
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/scheduleNew
 */
commonRouter.post('/scheduleNew', authHelpers.isJWTAuthenticated, commons.scheduleNew)

/**
 *
 * @api {get} /database/common/nextDate?formulaType=housing_metal&?productTypeId=1 get nextDate by formulaType
 * @apiName get NextDate
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId
 * @apiParam {String} formulaType
 *
 * @apiParamExample  {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    nextDate: '2019/12/31',
    nextID: 1,
}
formulaType Request By
        Common Parameter -> 'common'
        Metal CleanSheet -> 'housing_metal'
        Plastic CleanSheet ->'housing_plastic'
        Material Price Metal -> 'material'
        Thermal Module -> 'thermal_module'
        Die Cut -> 'die_cut'
        Cable Wire -> 'cable_wire'
        Cable FFC -> 'cable_ffc'
        Cable FPC -> 'cable_fpc'
        EMC Magnet -> 'emc_magnet'
        Thermal Graphite -> 'thermal_graphite'
        Rubber -> 'me_others_rubber'
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/nextDate?formulaType=housing_metal&?productTypeId=1
 */
commonRouter.get('/nextDate', authHelpers.isJWTAuthenticated, commons.getNextDate)

// putCommonPrice
/**
 *
 * @api {put} /database/common/modify/price modify price
 * @apiName modify price by nextID & parameter id
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
  {
    "nextId": 12,
    "items": [
      {
        "id": "54734620-e8ad-11e9-8423-0242ac110002",
        "next": 112
      }
    ]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/common/modify/price
 */

commonRouter.put('/modify/price', authHelpers.isJWTAuthenticated, commons.putCommonPrice)

/**
 *
 * @api {get} /database/common/productType/dropdown get product type dropdown list by formula type
 * @apiName get product type dropdown list
 * @apiGroup Common
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} formulaType housing_metal or housing_plastic
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  productTypeList: [
    {
      id: 1,
      productType: 'NB',
    },
    {
      id: 2,
      productType: 'DT',
    },
    {
      id: 3,
      productType: 'AIO',
    },
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/common/productType/dropdown?formulaType=housing_metal
 */
commonRouter.get('/productType/dropdown', authHelpers.isJWTAuthenticated, commons.getProductTypeByformulaType)


module.exports = commonRouter
