const router = require('koa-router')
const thermal = require('../../../../api/database/thermal.js')
const thermalRouter = new router()
const thermals = new thermal()
const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/thermal/fanBaselinePrice get Fan Baseline Price
 * @apiName get Fan Baseline Price
 * @apiGroup Thermal
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
  "fanBaselinePrice": [
    {
      "id": 1,
      "fanSize": "60*60*35",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
      "disable": false,
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/fanBaselinePrice
 */
thermalRouter.get('/fanBaselinePrice', authHelpers.isJWTAuthenticated, thermals.getFanBaselinePrice)

/**
 *
 * @api {get} /database/thermal/grease get Grease List
 * @apiName get Grease List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "date": {
        "last": '2019/01/01',
        "lastId": 1,
        "current": '2019/06/01',
        "currentId": 2,
        "next": '2019/12/01',
        "nextId": 3,
    },
    "greaseList": [
        {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002", // thermal_grease.id
            "greaseName": "7783",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
            "disable": false
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/grease
 */
thermalRouter.get('/grease', authHelpers.isJWTAuthenticated, thermals.getGreaseList)

/**
 *
 * @api {put} /database/thermal/modify/grease put Grease List
 * @apiName put Grease List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "nextId": 3,
    "greaseList": [
        {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "next": 145
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/grease
 */
thermalRouter.put('/modify/grease', authHelpers.isJWTAuthenticated, thermals.putGreaseList)

/**
 *
 * @api {get} /database/thermal/thermalPad get Thermal Pad
 * @apiName get Thermal Pad
 * @apiGroup Thermal
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
    "thermalPadList": [
        {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "heatTransfer": 13,
            "hardness": 24,
            "thickness": 0.5
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
        {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "heatTransfer": 13,
            "hardness": 24,
            "thickness": 0.5
            "last": 1.00,
            "current": 2.5,
            "next": 1.5,
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/thermalPad
 */
thermalRouter.get('/thermalPad', authHelpers.isJWTAuthenticated, thermals.getThermalPadList)

/**
 *
 * @api {put} /database/thermal/modify/thermalPad put Thermal Pad List
 * @apiName put Thermal Pad List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "thermalPadList": [
        {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "next": 300
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/thermalPad
 */
thermalRouter.put('/modify/thermalPad', authHelpers.isJWTAuthenticated, thermals.putThermalPadList)

/**
 *
 * @api {get} /database/thermal/pipe get Pipe List
 * @apiName get Pipe List
 * @apiGroup Thermal
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
    "pipeList": [
        {
            "id": 666,
            "pipeName":"Complex(複合管)",
            "diameterName": "D6",
            "pipeLength": "0 <= L < 150",
            "thinkess": "T <= 1.0",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/pipe
 */

thermalRouter.get('/pipe', authHelpers.isJWTAuthenticated, thermals.fetchPipeList)

/**
 *
 * @api {put} /database/thermal/modify/pipe put Pipe List
 * @apiName put Pipe List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "pipeList": [
        {
            "id": 666,
            "next": 0.7
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/pipe
 */
thermalRouter.put('/modify/pipe', authHelpers.isJWTAuthenticated, thermals.putPipeList)

/**
 *
 * @api {put} /database/thermal/modify/fanBaselinePrice modify Fan Baseline Price
 * @apiName modify Fan Baseline Price
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "nextId": 5,
  "fanBaselinePrice":[{
    "id": 1,
    "next": 8
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/fanBaselinePrice
 */
thermalRouter.put('/modify/fanBaselinePrice', authHelpers.isJWTAuthenticated, thermals.putFanBaselinePrice)

/**
 *
 * @api {get} /database/thermal/thermalParameter get Thermal Parameter
 * @apiName get Thermal Parameter
 * @apiGroup Thermal
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
  "thermalParameter": [{
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
 * @apiSampleRequest /database/thermal/thermalParameter
 */
thermalRouter.get('/thermalParameter', authHelpers.isJWTAuthenticated, thermals.getThermalParameter)

// Fan 軸承差異 價目表單
/**
 *
 * @api {get} /database/thermal/fanBearing get FanBearing List
 * @apiName get FanBearing List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
  {
    "id": "1",
    "name": "Sleeve+塑膠",
    "disable": false,
  }, {
    "id": "2",
    "name": "FDB+金屬",
    "disable": false,
  }
]

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/fanBearing
 */
thermalRouter.get('/fanBearing', authHelpers.isJWTAuthenticated, thermals.getFanBearing)

/**
 *
 * @api {get} /database/thermal/fanBearingPrice get FanBearing Price
 * @apiName get Fan FanBearing Price
 * @apiGroup Thermal
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
  "fanBearingList": [{
    "id": "1",
    "fanSize:": "60x60x3.5",
    "Sleeve+塑膠": {
      "bearingId": 1, // thermal_fan_fan_bearing table id unit: fan size & fan bearing
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    },
    "FDB+金屬": {
      "bearingId": 2,
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/fanBearingPrice
 */
thermalRouter.get('/fanBearingPrice', authHelpers.isJWTAuthenticated, thermals.getFanBearingPrice)

/**
 *
 * @api {put} /database/thermal/modify/fanBearingPrice modify Fan FanBearing Price
 * @apiName modify Fan FanBearing Price
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "fanBearingList": [
  {
    "id": "1",
    "items":[{
      "bearingId": 1,
      "next": 1.5,
    },
    {
      "bearingId": 2,
      "next": 1.5,
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/fanBearingPrice
 */
thermalRouter.put('/modify/fanBearingPrice', authHelpers.isJWTAuthenticated, thermals.putFanBearingPrice)

// Fan 扇葉材料
/**
 *
 * @api {get} /database/thermal/fanMaterial get FanMaterial List
 * @apiName get FanMaterial List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
  {
    "id": "1",
    "name": "PBT",
    "disable": false,
  }, {
    "id": "2",
    "name": "LCP",
    "disable": false,
  }
]

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/fanMaterial
 */
thermalRouter.get('/fanMaterial', authHelpers.isJWTAuthenticated, thermals.getFanMaterial)

/**
 *
 * @api {get} /database/thermal/fanMaterialPrice get FanMaterial Price
 * @apiName get Fan FanMaterial Price
 * @apiGroup Thermal
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
  "fanMaterialList": [{
    "id": "1",
    "fanSize:": "60x60x3.5",
    "PBT": {
      "materialId": 1, // thermal_fan_fan_material table id unit: fan size & fan Material
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    },
    "LCP": {
      "materialId": 2,
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/fanMaterialPrice
 */
thermalRouter.get('/fanMaterialPrice', authHelpers.isJWTAuthenticated, thermals.getFanMaterialPrice)

/**
 *
 * @api {put} /database/thermal/modify/fanMaterialPrice modify Fan FanMaterial Price
 * @apiName modify Fan FanMaterial Price
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "fanMaterialList": [
  {
    "id": "1",
    "items":[{
      "materialId": 1,
      "next": 1.5,
    },
    {
      "materialId": 2,
      "next": 1.5,
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/thermal/modify/fanMaterialPrice
 */
thermalRouter.put('/modify/fanMaterialPrice', authHelpers.isJWTAuthenticated, thermals.putFanMaterialPrice)


/**
 *
 * @api {get} /database/thermal/magnetMaterial
 * @apiName get MagnetMaterialList
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "magnetMaterialList": [
        {
            "magnetId": "e45257fe-f95b-11e9-ba04-0242ac110002",
            "magnetName": "橡膠",
            "remark": "test",
            "disable": false
        },
        {
            "magnetId": "e4526730-f95b-11e9-ba04-0242ac110002",
            "magnetName": "MQ",
            "remark": null,
            "disable": false
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/thermal/magnetMaterial
 */
thermalRouter.get('/magnetMaterial', authHelpers.isJWTAuthenticated, thermals.getMagnetMaterialList)
/**
 *
 * @api {get} /database/thermal/magnetMaterialPrice
 * @apiName get magnetMaterialPrice
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "date": {
        "last": "1970-01-01",
        "lastId": 6,
        "current": "2019-10-28",
        "currentId": 32,
        "next": "2019-11-01",
        "nextId": 33
    },
    "magnetMaterialPriceList": [
        {
            "id": "e44d5880-f95b-11e9-ba04-0242ac110002",
            "fanSize": "60x60x3.5",
            "MQ": {
                "magnetId": "e4526730-f95b-11e9-ba04-0242ac110002",//thermal_fan_fan_magnet 的id
                "last": 5.5,
                "current": 5.5,
                "next": 5.5
            },
            "橡膠": {
                "magnetId": "e45257fe-f95b-11e9-ba04-0242ac110002",
                "last": 5.5,
                "current": 5.5,
                "next": 5.5
            }
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/thermal/magnetMaterialPrice
 */
thermalRouter.get('/magnetMaterialPrice', authHelpers.isJWTAuthenticated, thermals.getMagnetMaterialPrice)
/**
 *
 * @api {put} /database/thermal/modify/magnetMaterialPrice
 * @apiName modify Magnet Material Price
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/thermal/modify/magnetMaterialPrice
{
    "nextId": 3,
    "magnetMaterialPriceList": [
        {
            "id": "4f326e38-f0a6-11e9-a8a0-0242ac110002",
            "items": [
                {
                    "magnetId": "4f326e38-f0a6-11e9-a8a0-0242ac110003",
                    "next": 0,
                },
                {
                    "magnetId": "4f326e3f-f0a6-11e9-a8a0-0242ac110003",
                    "next": 0.15,
                },
            ]
        }
    ]
}
 */
thermalRouter.put('/modify/magnetMaterialPrice', authHelpers.isJWTAuthenticated, thermals.modifyMagnetMaterialPrice)
/**
 *
 * @api {get} /database/thermal/motorDiff
 * @apiName get Motor Different List
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "motorDiffList": [
        {
            "motorId": "e0dcb59c-fa2d-11e9-957f-0242ac110002",//thermal_fan_motor的id
            "item": "單相",
            "disable": false
        },
        {
            "motorId": "e0dcc0c8-fa2d-11e9-957f-0242ac110002",
            "item": "三相",
            "disable": false
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/thermal/motorDiff
 */
thermalRouter.get('/motorDiff', authHelpers.isJWTAuthenticated, thermals.getMotorDiffList)
/**
 *
 * @api {get} /database/thermal/motorDiffPrice
 * @apiName get motor Diff Price
 * @apiGroup Thermal
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
    "motorDiffPriceList": [
        {
            "id": "e0d4c936-fa2d-11e9-957f-0242ac110002",
            "fanSize": "60x60x3.5",
            "三相": {
                "motorId": "e0dd6f82-fa2d-11e9-957f-0242ac110002",//thermal_fan_fan_motor 的id
                "last": null,
                "current": 1,
                "next": null
            },
            "單相": {
                "motorId": "e0dcceb0-fa2d-11e9-957f-0242ac110002",
                "last": null,
                "current": 0.5,
                "next": null
            }
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/thermal/motorDiffPrice
 */
thermalRouter.get('/motorDiffPrice', authHelpers.isJWTAuthenticated, thermals.getMotorDiffPrice)
/**
 *
 * @api {put} /database/thermal/modify/motorDiffPrice
 * @apiName modify Motor Diff Price
 * @apiGroup Thermal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/thermal/modify/motorDiffPrice
{
    "nextId": 5,
    "motorDiffPriceList": [
        {
            "id": "e0d4c936-fa2d-11e9-957f-0242ac110002",
            "items":[
                {
                    "motorId": "e0dd6f82-fa2d-11e9-957f-0242ac110002",
                    "next": 1
                },
                {
                    "motorId": "e0dcceb0-fa2d-11e9-957f-0242ac110002",
                    "next": 0.5
                }
            ]
        }
    ]
}
 */
thermalRouter.put('/modify/motorDiffPrice', authHelpers.isJWTAuthenticated, thermals.modifyMotorDiffPrice)
module.exports = thermalRouter
