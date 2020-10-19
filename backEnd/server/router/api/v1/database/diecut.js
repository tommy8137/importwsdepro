const router = require('koa-router')
const diecut = require('../../../../api/database/diecut.js')
const diecutRouter = new router()
const diecuts = new diecut()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/diecut/materialSizeAdderPrice
 * @apiName get Material Size Adder Price
 * @apiGroup Diecut
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
    "materialSizeAdderPrice": [{
        {
            "id": "dacc4858-fb9e-11e9-9e65-0242ac110002",
            "size": "0.1 <= size <= 5",
            "disable": false,
            "last": null,
            "current": 6,
            "next": null
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/diecut/materialSizeAdderPrice
 */
diecutRouter.get('/materialSizeAdderPrice', authHelpers.isJWTAuthenticated, diecuts.getMaterialSizeAdderPrice)

/**
 *
 * @api {put} /database/diecut/modify/materialSizeAdderPrice
 * @apiName put Material Size Adder Price
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/modify/materialSizeAdderPrice
{
    "nextId": 7,
    "materialSizeAdderPrice": [
        {
            "id": "dacc4858-fb9e-11e9-9e65-0242ac110002",
            "next":2
        }
    ]
}
 */
diecutRouter.put('/modify/materialSizeAdderPrice', authHelpers.isJWTAuthenticated, diecuts.putMaterialSizeAdderPrice)

/**
 *
 * @api {get} /database/diecut/typePrice
 * @apiName get Type Price
 * @apiGroup Diecut
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
    "typePrice": [{
        "id": "cb1f7e7c-fab1-11e9-a4c6-0242ac110002",
        "name": "模切",
        "last": 0,
        "current": 0,
        "next": 0,
        "disable": false
    },{
        "id": "cb1f8ffc-fab1-11e9-a4c6-0242ac110002",
        "name": "沖切",
        "last": 0.0088,
        "current": 0.0088,
        "next": 0.0088,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/typePrice
 */
diecutRouter.get('/typePrice', authHelpers.isJWTAuthenticated, diecuts.getTypePrice)

/**
 *
 * @api {put} /database/diecut/modify/typePrice
 * @apiName put Type Price
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "typePrice": [{
        "id": "cb1f7e7c-fab1-11e9-a4c6-0242ac110002",
        "next": 0
    },{
        "id": "cb1f8ffc-fab1-11e9-a4c6-0242ac110002",
        "next": 0.0088
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/modify/typePrice
 */
diecutRouter.put('/modify/typePrice', authHelpers.isJWTAuthenticated, diecuts.putTypePrice)

/**
 *
 * @api {get} /database/diecut/areaTimesPrice
 * @apiName get Area Times Price
 * @apiGroup Diecut
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
    "areaTimesPrice": [{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "areaSize": "材料面積 <= 25",
        "last": 5,
        "current": 5,
        "next": 5,
        "disable": false
    },{
        "id": "cb1e0b00-fab1-11e9-a4c6-0242ac110002",
        "areaSize": "材料面積 <= 2500",
        "last": 5,
        "current": 5,
        "next": 5,
        "disable": false
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/diecut/areaTimesPrice
 */
diecutRouter.get('/areaTimesPrice', authHelpers.isJWTAuthenticated, diecuts.getAreaTimesPrice)

/**
 *
 * @api {put} /database/diecut/modify/areaTimesPrice
 * @apiName put Area Times Price
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "areaTimesPrice": [{
        "id": "cb1df6d8-fab1-11e9-a4c6-0242ac110002",
        "next": 5
    },{
        "id": "cb1e0b00-fab1-11e9-a4c6-0242ac110002",
        "next": 5
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/modify/areaTimesPrice
 */
diecutRouter.put('/modify/areaTimesPrice', authHelpers.isJWTAuthenticated, diecuts.putAreaTimesPrice)

/**
 *
 * @api {get} /database/diecut/materialPrice get Diecut Material Price
 * @apiName get Diecut Material Price
 * @apiGroup Diecut
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
    "materialPriceList": [{
      "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
      "materialSpec": "T0.05Mylar",
      "remark": "remark",
      "disable": false,
      "subMaterial": [{
        "id": "6462bc8e-fa1c-11e9-8153-0242ac110002",
        "material": "透明",
        "last": 0.63823529,
        "current": 0.63823529,
        "next": 0.63823529,
        "disable": false,
      },{
        "id": "6462d606-fa1c-11e9-8153-0242ac110002",
        "material": "CY28_PET",
        "last": 0.51176471,
        "current": 0.51176471,
        "next": 0.51176471,
        "disable": false,
      }]
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/diecut/materialPrice
 */

diecutRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, diecuts.getDiecutMaterialPrice)

// putMaterialSpec
/**
 *
 * @api {put} /database/diecut/modify/materialSpec modify Diecut Material Spec
 * @apiName modify Diecut Material Spec
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
	"items":[{
    "id":"401ca21a-f3e4-11e9-b3e7-0242ac110002",
    "remark":"this is a book"
  }]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/diecut/modify/materialSpec
 */
diecutRouter.put('/modify/materialSpec', authHelpers.isJWTAuthenticated, diecuts.putMaterialSpec)

/**
 *
 * @api {get} /database/diecut/partCategory get Diecut part Category 2 list
 * @apiName get Diecut Diecut part Category 2 list
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[{
  "partCategory2Id": "73fda832-5a91-11e9-8606-0242ac110002",
  "partCategory2Name": "Al_Cu_Foil"
}, {
  "partCategory2Id": "73fdb412-5a91-11e9-8606-0242ac110002",
  "partCategory2Name": "Adhesive_of_Mylar_Sponge_Poron"
}]

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/diecut/partCategory
 */

diecutRouter.get('/partCategory', authHelpers.isJWTAuthenticated, diecuts.getDiecutPartCategory)

/**
 *
 * @api {post} /database/diecut/materialSpec Diecut Material Price ADD Material Spec
 * @apiName add Diecut Material Price Material Spec
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "partCategory2Id": "73fd9f68-5a91-11e9-8606-0242ac110002",
  "materialSpec": "FR PC",
  "remark": "remark"
}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "materialSpecId": "111122-222222-333333-44444"
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/diecut/materialSpec
 */

diecutRouter.post('/materialSpec', authHelpers.isJWTAuthenticated, diecuts.postDiecutMaterialSpec)

/**
 *
 * @api {post} /database/diecut/material Diecut Material Price ADD Material
 * @apiName add Diecut Material Price Material
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
  "materialSpecId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
  "material": "Teijin_8787878787",
  "value": 1.5,
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/diecut/material
 */

diecutRouter.post('/material', authHelpers.isJWTAuthenticated, diecuts.postDiecutMaterial)
/**
 *
 * @api {post} /database/diecut/archive/material Archive Diecut Material
 * @apiName Archive Diecut Material
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
    "materialSpecId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
    "materialId": [
        "d35ecebc-f3c7-11e9-9238-0242ac110002",
        "d35ed984-f3c7-11e9-9238-0242ac110002"
    ]
}
  * @apiSampleRequest /database/diecut/archive/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

diecutRouter.post('/archive/material', authHelpers.isJWTAuthenticated, diecuts.archiveDiecutMaterial)

/**
 *
 * @api {post} /database/diecut/unblock/material Unblock Diecut Material
 * @apiName Unblock Diecut Material
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
    "materialSpecId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
    "materialId": [
        "d35ecebc-f3c7-11e9-9238-0242ac110002",
        "d35ed984-f3c7-11e9-9238-0242ac110002"
    ]
}
  * @apiSampleRequest /database/diecut/unblock/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

diecutRouter.post('/unblock/material', authHelpers.isJWTAuthenticated, diecuts.unblockDiecutMaterial)

/**
 *
 * @api {post} /database/diecut/archive/materialSpec Archive Diecut Material Spec
 * @apiName Archive Diecut Material Spec
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
 {
   "materialSpecId": [
     "68cd8460-efd7-11e9-9f9c-0242ac110002",
     "68cd8460-efd7-11e9-9f9c-0242ac111234"
   ]
 }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/diecut/archive/materialSpec
 */

diecutRouter.post('/archive/materialSpec', authHelpers.isJWTAuthenticated, diecuts.archiveDiecutMaterialSpec)

/**
 *
 * @api {post} /database/diecut/unblock/materialSpec Unblock Diecut Material Spec
 * @apiName Unblock Diecut Material Spec
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
 {
   "materialSpecId": [
     "68cd8460-efd7-11e9-9f9c-0242ac110002",
     "68cd8460-efd7-11e9-9f9c-0242ac111234"
   ]
 }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/diecut/unblock/materialSpec
 */

diecutRouter.post('/unblock/materialSpec', authHelpers.isJWTAuthenticated, diecuts.unblockDiecutMaterialSpec)


/**
 *
 * @api {post} /database/diecut/check/materialprice check Diecut Material price excel content
 * @apiName check Diecut Material price excel content
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
 {
    "file": "file"
 }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
    "passCount": 10,
    "failCount": 3
    "failMessage": [
      {
        "sheetName": "Sponge",
        "material": "ABC",
        "materialSpec": "DEF",
        "modify": null,
        "errorCode": "F000204"
      },
      {
        "sheetName": "Sponge",
        "material": "ABC",
        "materialSpec": "DEF",
        "modify": null,
        "errorCode": "F000204"
      },
    ]
  }

 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/diecut/check/materialprice
 */

diecutRouter.post('/check/materialprice', authHelpers.isJWTAuthenticated, diecuts.readMaterialPriceAndCheck)

/**
 *
 * @api {post} /database/diecut/upload/materialprice upload Diecut Material price by excel
 * @apiName upload Diecut Material price by excel
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
 {
    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9"
 }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/diecut/upload/materialprice
 */

diecutRouter.post('/upload/materialprice', authHelpers.isJWTAuthenticated, diecuts.uploadMaterialPrice)

/**
 *
 * @api {get} /database/diecut/diecutParameter get Diecut Parameter
 * @apiName get Diecut Parameter
 * @apiGroup Diecut
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
    "nextId": 3
  },
  "diecutParameter": [{
    "id": 1,
    "type": "加工",
    "items": [{
        "id":1,
        "item": "Clip單價",
        "unit": "USD",
        "last": 5.00,
        "current": 2.5,
        "next": 1.5
    },{
        "id":2,
        "item": "Clip Loss Rate",
        "unit": "%",
        "last": 5.00,
        "current": 2.5,
        "next": 1.5
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/diecutParameter
 */
diecutRouter.get('/diecutParameter', authHelpers.isJWTAuthenticated, diecuts.getDiecutParameter)
/**
 *
 * @api {get} /database/diecut/releasePaperPrice
 * @apiName get Release Paper Price
 * @apiGroup Diecut
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
    "releasePaperPrice": [
        {
            "id": "dacc885e-fb9e-11e9-9e65-0242ac110002",
            "name": "離型紙/透明離型膜",
            "disable": false,
            "last": null,
            "current": 0.7353,
            "next": null
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/diecut/releasePaperPrice
 */
diecutRouter.get('/releasePaperPrice', authHelpers.isJWTAuthenticated, diecuts.getReleasePaperPrice)

/**
 *
 * @api {put} /database/diecut/modify/releasePaperPrice
 * @apiName put Release Paper Price
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/modify/releasePaperPrice
{
    "nextId": 7,
    "releasePaperPrice": [
        {
            "id": "dacc4858-fb9e-11e9-9e65-0242ac110002",
            "next":2
        }
    ]
}
 */
diecutRouter.put('/modify/releasePaperPrice', authHelpers.isJWTAuthenticated, diecuts.putReleasePaperPrice)
/**
 *
 * @api {get} /database/diecut/export
 * @apiName export diecut material price excel
 * @apiGroup Diecut
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/diecut/export
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名 Die_Cut_Material_Price_{ExportDate}
  }
 */
diecutRouter.get('/export', authHelpers.isJWTAuthenticated, diecuts.exportDiecutMaterialPrice)
module.exports = diecutRouter
