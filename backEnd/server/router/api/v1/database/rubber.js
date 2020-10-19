const router = require('koa-router')
const rubber = require('../../../../api/database/rubber.js')
const rubberRouter = new router()
const rubbers = new rubber()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()


/**
 *
 * @api {get} /database/rubber/materialPrice get Rubber Material Price
 * @apiName get Rubber Material Price
 * @apiGroup Rubber
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
    "materialPrice": [{
        "id": "64621ebe-fa1c-11e9-8153-0242ac110002",
        "materialSpec": "TPU",
        "density": 13.3,
        "remark": "remark",
        "disable": false,
        "subMaterial": [{
            "id": "6462bc8e-fa1c-11e9-8153-0242ac110002",
            "material": "Covestro_8785A",
            "last": 0.63823529,
            "current": 0.63823529,
            "next": 0.63823529,
            "disable": false,
        }]
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/materialPrice
 */
rubberRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, rubbers.getMaterialPrice)

/**
 *
 * @api {post} /database/rubber/materialSpec Rubber Material Price ADD Material Spec
 * @apiName add Rubber Material Price Material Spec
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "materialSpec": "FR PC",
  "density": "0.5",
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
 * @apiSampleRequest /database/rubber/materialSpec
 */

rubberRouter.post('/materialSpec', authHelpers.isJWTAuthenticated, rubbers.postRubberMaterialSpec)

/**
 *
 * @api {post} /database/rubber/material Rubber Material Price ADD Material
 * @apiName add Rubber Material Price Material
 * @apiGroup Rubber
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
 * @apiSampleRequest /database/rubber/material
 */

rubberRouter.post('/material', authHelpers.isJWTAuthenticated, rubbers.postRubberMaterial)
/**
 *
 * @api {post} /database/rubber/archive/material Archive Rubber Material
 * @apiName Archive Rubber Material
 * @apiGroup Rubber
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
  * @apiSampleRequest /database/rubber/archive/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

rubberRouter.post('/archive/material', authHelpers.isJWTAuthenticated, rubbers.archiveRubberMaterial)

/**
 *
 * @api {post} /database/rubber/unblock/material Unblock Rubber Material
 * @apiName Unblock Rubber Material
 * @apiGroup Rubber
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
  * @apiSampleRequest /database/rubber/unblock/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

rubberRouter.post('/unblock/material', authHelpers.isJWTAuthenticated, rubbers.unblockRubberMaterial)

/**
 *
 * @api {post} /database/rubber/archive/materialSpec Archive Rubber Material Spec
 * @apiName Archive Rubber Material Spec
 * @apiGroup Rubber
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
 * @apiSampleRequest /database/rubber/archive/materialSpec
 */

rubberRouter.post('/archive/materialSpec', authHelpers.isJWTAuthenticated, rubbers.archiveRubberMaterialSpec)

/**
 *
 * @api {post} /database/rubber/unblock/materialSpec Unblock Rubber Material Spec
 * @apiName Unblock Rubber Material Spec
 * @apiGroup Rubber
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
 * @apiSampleRequest /database/rubber/unblock/materialSpec
 */

rubberRouter.post('/unblock/materialSpec', authHelpers.isJWTAuthenticated, rubbers.unblockRubberMaterialSpec)

/**
 *
 * @api {put} /database/rubber/modify/materialSpec put Rubber Material Spec
 * @apiName put Rubber Material Spec
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/modify/materialSpec
{
    "items":[{
       "id":"401ca21a-f3e4-11e9-b3e7-0242ac110002",
       "remark": "this is a book",
       "density": 1.5,
    }]
}
 */
rubberRouter.put('/modify/materialSpec', authHelpers.isJWTAuthenticated, rubbers.putRubberMaterialSpec)

/**
 *
 * @api {get} /database/rubber/rubberParameter get Rubber Parameter
 * @apiName get Rubber Parameter
 * @apiGroup Rubber
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
    "rubberParameter": [{
        "id": 1,
        "type": "材料",
        "items": [{
            "id":1,
            "item": "成品沖型 Loss Rate",
            "unit": "%",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        }]
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/rubberParameter
 */
rubberRouter.get('/rubberParameter', authHelpers.isJWTAuthenticated, rubbers.getRubberParameter)


// -- 機台費用價目表 --
/**
 *
 * @api {get} /database/rubber/machinePrice get Rubber Machine Price
 * @apiName get Rubber Machine Price
 * @apiGroup Rubber
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
  "machinePrice": [
  {
    "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
    "ton:": "290T",
    "disable": false,
    "NB": {
      "productTypeId": "1",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    },
    "DT": {
      "productTypeId": "2",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/machinePrice
 */
rubberRouter.get('/machinePrice', authHelpers.isJWTAuthenticated, rubbers.getMachinePrice)

/**
 *
 * @api {put} /database/rubber/modify/machinePrice modify Rubber Machine Price
 * @apiName modify Rubber Machine Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "machinePrice": [
    {
      "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
      "productTypes": [{
          "productTypeId": 5,
          "next": 1.5,
      }],
    }
  ]
}

 * @apiSampleRequest /database/rubber/modify/machinePrice
 */

rubberRouter.put('/modify/machinePrice', authHelpers.isJWTAuthenticated, rubbers.putMachinePrice)


// -- 成品沖型價目表 --
/**
 *
 * @api {get} /database/rubber/stampingPrice get Rubber Stamping Price
 * @apiName get Rubber Stamping Price
 * @apiGroup Rubber
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
  "stampingPrice": [{
    "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
    "item": "大版下料",
    "last": {
      "unitPrice": 5,
      "cycleTime": 50,
      "usageAmount": 5,
    },
    "current": {
      "unitPrice": 5,
      "cycleTime": 50,
      "usageAmount": 5,
    },
    "next": {
      "unitPrice": 5,
      "cycleTime": 50,
      "usageAmount": 5,
    },
    "disable": false
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/stampingPrice
 */
rubberRouter.get('/stampingPrice', authHelpers.isJWTAuthenticated, rubbers.getStampingPrice)

/**
 *
 * @api {put} /database/rubber/modify/stampingPrice modify Rubber Stamping Price
 * @apiName modify Rubber Stamping Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "stampingPrice":[{
    "id": "c2d2934e-fc4b-11e9-b46a-0242ac110002",
    "unitPrice": 15,
    "cycleTime": 51,
    "usageAmount": 15,
  }]
}

 * @apiSampleRequest /database/rubber/modify/stampingPrice
 */

rubberRouter.put('/modify/stampingPrice', authHelpers.isJWTAuthenticated, rubbers.putStampingPrice)


/**
 *
 * @api {get} /database/rubber/adhesivePrice get Rubber Adhesive Price
 * @apiName get Rubber Adhesive Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "date": {
        "last": "2019-11-08",
        "lastId": 90,
        "current": "2019-11-11",
        "currentId": 93,
        "next": "2019-11-14",
        "nextId": 105
    },
    "adhesivePrice": [
        {
            "last": {
                "unitPrice": 0.077,
                "cycleTime": 60,
                "usageAmount": 1
            },
            "current": {
                "unitPrice": 0.066,
                "cycleTime": 60,
                "usageAmount": 1
            },
            "next": {
                "unitPrice": 0.066,
                "cycleTime": 60,
                "usageAmount": 1
            },
            "id": "11ee1632-01d9-11ea-9ea5-0242ac110002",
            "item": "整版貼",
            "disable": false
        },
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/adhesivePrice
 */
rubberRouter.get('/adhesivePrice', authHelpers.isJWTAuthenticated, rubbers.getAdhesivePrice)

/**
 *
 * @api {get} /database/rubber/printingPrice get Rubber Printing Price
 * @apiName get Rubber Printing Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "date": {
        "last": "2019-11-08",
        "lastId": 90,
        "current": "2019-11-11",
        "currentId": 93,
        "next": "2019-11-14",
        "nextId": 105
    },
    "printingPrice": [
        {
            "last": {
                "unitPrice": 1,
                "usageAmount": 2
            },
            "current": {
                "unitPrice": 3,
                "usageAmount": 4
            },
            "next": {
                "unitPrice": 5,
                "usageAmount": 6
            },
            "id": "11ecb33c-01d9-11ea-9ea5-0242ac110002",
            "item": "N/A",
            "disable": true
        },
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/printingPrice
 */
rubberRouter.get('/printingPrice', authHelpers.isJWTAuthenticated, rubbers.getPrintingPrice)

/**
 *
 * @api {put} /database/rubber/modify/adhesivePrice modify Rubber Adhesive Price
 * @apiName modify Rubber Adhesive Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 105,
    "adhesivePrice":[
        {
            "id": "11ee1632-01d9-11ea-9ea5-0242ac110002",
            "unitPrice": 0.333,
            "cycleTime": 0.2,
            usageAmount": 0.1
        },
        {
            "id": "11ee1dee-01d9-11ea-9ea5-0242ac110002",
            "unitPrice": 0.6,
            "cycleTime": 0.5,
            "usageAmount": 0.4
        }
    ]
}
 * @apiSampleRequest /database/rubber/modify/adhesivePrice
 */

rubberRouter.put('/modify/adhesivePrice', authHelpers.isJWTAuthenticated, rubbers.putAdhesivePrice)

/**
 *
 * @api {put} /database/rubber/modify/printingPrice modify Rubber Printing Price
 * @apiName modify Rubber Printing Price
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 105,
    "printingPrice":[
        {
            "id": "11ecc53e-01d9-11ea-9ea5-0242ac110002",
            "unitPrice": 0.111,
            "usageAmount": 0.222
        },
        {
            "id": "11eccc82-01d9-11ea-9ea5-0242ac110002",
            "unitPrice": 0.333,
            "usageAmount": 0.44
        }
    ]
}
 * @apiSampleRequest /database/rubber/modify/printingPrice
 */

rubberRouter.put('/modify/printingPrice', authHelpers.isJWTAuthenticated, rubbers.putPrintingPrice)

// Machine Rate / 穴數計算維護表

/**
 *
 * @api {get} /database/rubber/machineRate get Machine Rate / 穴數計算維護表
 * @apiName get Machine Rate / 穴數計算維護表
 * @apiGroup Rubber
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
    "machineRate": [
    {
        "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
        "item:": "300T",
        "last": {
          "cost": 5,
          "l": 50,
          "w": 50,
        },
        "current": {
          "cost": 5,
          "l": 50,
          "w": 50,
        },
        "next": {
          "cost": 5,
          "l": 50,
          "w": 50,
        },
        "disable": false,
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/machineRate
 */
rubberRouter.get('/machineRate', authHelpers.isJWTAuthenticated, rubbers.getMachineRate)

/**
 *
 * @api {put} /database/rubber/modify/machineRate put Machine Rate / 穴數計算維護表
 * @apiName put Machine Rate / 穴數計算維護表
 * @apiGroup Rubber
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 * {
    "nextId": 3,
    "machineRate": [{
        "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
        "cost": 5,
        "l": 50,
        "w": 50,
      }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/rubber/modify/machineRate

 */
rubberRouter.put('/modify/machineRate', authHelpers.isJWTAuthenticated, rubbers.putMachineRate)


module.exports = rubberRouter
