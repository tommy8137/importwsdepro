const router = require('koa-router')
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

const testRouter = new router()
const Test = require('../../../api/test/test.js')
const test = new Test()

/**
*
* @api{post} /test/eebom/fakedata create fake data by projectCode
* @apiName test fake data Generator
* @apiGroup test
* @apiHeader {String} Authorization Bearer access-token.
* @apiParam {String} projectCode 
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 projectCode required
 * @apiSampleRequest /test/eebom/fakedata?projectCode=20191203123456
 */
testRouter.post('/eebom/fakedata', authHelpers.isJWTAuthenticated, test.addFackData)

/**
*
* @api{delete} /test/eebom/fakedata delete fake data by using specific version key
* @apiName delete test fake data
* @apiGroup test
* @apiHeader {String} Authorization Bearer access-token.
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /test/eebom/fakedata
 */
testRouter.delete('/eebom/fakedata', authHelpers.isJWTAuthenticated, test.deleteFackData)


/**
*
* @api{put} /test/partlist/metal/202005 convert partlist value for metal hmToolingMaterialSize
* @apiName convert partlist value format for housing metal NB 2020/05 change.
* @apiGroup test
* @apiHeader {String} Authorization Bearer access-token.
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /test/eebom/fakedata
 */
testRouter.put('/partlist/metal/202005', test.convertMetal202005)


/**
*
* @api{get} /test/partlist/metal/nb convert partlist value for metal hmToolingMaterialSize
* @apiName convert partlist value format for housing metal NB 2020/05 change.
* @apiGroup test
* @apiHeader {String} Authorization Bearer access-token.
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /test/eebom/fakedata
 */
testRouter.get('/partlist/metal/nb', test.getMetalNbList)
// testRouter.get('partlist/metal/nb', authHelpers.isJWTAuthenticated, test.getMetalNbList)


/**
*
* @api{get} /test/partlist/metal/nb convert partlist value for metal hmToolingMaterialSize
* @apiName convert partlist value format for housing metal NB 2020/05 change.
* @apiGroup test
* @apiHeader {String} Authorization Bearer access-token.
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /test/eebom/fakedata
 */
testRouter.get('/partlist/searchproject', test.searchProject)
// testRouter.get('partlist/searchproject', authHelpers.isJWTAuthenticated, test.getMetalNbList)




module.exports = testRouter