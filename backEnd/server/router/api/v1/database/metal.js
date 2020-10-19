const router = require('koa-router')
const metal = require('../../../../api/database/metal.js')
const metalRouter = new router()
const metals = new metal()

const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

/**
 *
 * @api {get} /database/metal/materialPrice get Metal Material Price
 * @apiName get Metal Material Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "date": {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/10/31',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    "materialPriceList": [{
      "id": 1,
      "material": "AL1050",
      "density": "2.75",
      "disable": false,
      "subMaterial": [{
          "id": 1,
          "thickness": "0.15",
          "last": 5.00,
          "current": 2.5,
          "next": 1.5,
          "disable": false,
      }]
    }]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/materialPrice
 */

metalRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, metals.getMetalMaterialPrice)

/**
 *
 * @api {post} /database/metal/material add Metal Material in Material Price
 * @apiName add Metal Material
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
  {
    "material": "AL1234",
    "density": 1.5,
  }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "materialId": "111122-222222-333333-44444"
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/material
 */

metalRouter.post('/material', authHelpers.isJWTAuthenticated, metals.postMetalMaterial)


/**
 *
 * @api {post} /database/metal/materialThickness add Metal Material Thickness in Material Price
 * @apiName add Metal Material Thickness
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "materialId": "5598f7d8-f6cd-11e9-ab12-0242ac110002",
  "thickness": "0.1234",
  "price": 0.1234
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/materialThickness
 */

metalRouter.post('/materialThickness', authHelpers.isJWTAuthenticated, metals.postMetalMaterialThickness)

/**
 *
 * @api {post} /database/metal/archive/material Archive Metal Material
 * @apiName Archive Metal Material
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
  "materialId": [
      "d35ecebc-f3c7-11e9-9238-0242ac110002",
      "d35ed984-f3c7-11e9-9238-0242ac110002"
  ]
}
  * @apiSampleRequest /database/metal/archive/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

metalRouter.post('/archive/material', authHelpers.isJWTAuthenticated, metals.archiveMetalMaterial)

/**
 *
 * @api {post} /database/metal/unblock/material unblock Metal Material
 * @apiName unblock Metal Material
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
  "materialId": [
      "d35ecebc-f3c7-11e9-9238-0242ac110002",
      "d35ed984-f3c7-11e9-9238-0242ac110002"
  ]
}
  * @apiSampleRequest /database/metal/unblock/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

metalRouter.post('/unblock/material', authHelpers.isJWTAuthenticated, metals.unblockMetalMaterial)

/**
 *
 * @api {post} /database/metal/archive/materialThickness Archive Metal Material Thickness
 * @apiName Archive Metal Material Thickness
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
  {
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002",
    "materialThickness": [
        "d35ed984-f3c7-11e9-9238-0242ac112233",
        "d35ed984-f3c7-11e9-9238-0242ac110002"
    ]
  }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/metal/archive/materialThickness
 */

metalRouter.post('/archive/materialThickness', authHelpers.isJWTAuthenticated, metals.archiveMetalMaterialThickness)

/**
 *
 * @api {post} /database/metal/unblock/materialThickness Unblock Metal Material Thickness
 * @apiName Unblock Metal Material Thickness
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample {json} Request-Example:
  {
    "materialId": "d35ecebc-f3c7-11e9-9238-0242ac110002",
    "materialThickness": [
        "d35ed984-f3c7-11e9-9238-0242ac112233",
        "d35ed984-f3c7-11e9-9238-0242ac110002"
    ]
  }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 MISSING PARAMETER
 * @apiSampleRequest /database/metal/unblock/materialThickness
 */

metalRouter.post('/unblock/materialThickness', authHelpers.isJWTAuthenticated, metals.unblockMetalMaterialThickness)

/**
 *
 * @api {get} /database/metal/metalParameter?productTypeId=1 get Metal Parameter by product type
 * @apiName get Metal Parameter
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "date": {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/10/31',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    "metalParameter": [{
      id: 1,
      type: "材料",
      items: [{
        "id":1,
        "item"": "超音波清洗",
        "unit": "USD",
        "last": 5.00,
        "current": 2.5,
        "next": 1.5,
      }]
    }]

}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/metalParameter?productTypeId=1
 */

metalRouter.get('/metalParameter', authHelpers.isJWTAuthenticated, metals.getMetalParameter)

/**
 * 陽極顏色價目表
 * @api {get} /database/metal/anodeColorPriceList?productTypeId=1 get Anode Color Price List
 * @apiName get Anode Color Price List
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
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
    "anodeColorPrice":[
      {
        "id": 1,
        "item": "鋁本色",
        "last": {
          "price": 5,
          "lossRate": "30%",
        },
        "current": {
          "price": 5,
          "lossRate": "50%",
        },
        "next": {
          "price": 5,
          "lossRate": "99%",
        },
      }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/anodeColorPriceList?productTypeId=1
 */

metalRouter.get('/anodeColorPriceList', authHelpers.isJWTAuthenticated, metals.getAnodeColorPriceList)

/**
 * 噴漆類型價目表
 * @api {get} /database/metal/sprayPaintPriceList get Spray Paint Price List
 * @apiName get Spray Paint Price List
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  "sprayPaintPriceList": [
    {
      "id": 1,
      "color": "一般素色(粉體漆)"
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/sprayPaintPriceList
 */

metalRouter.get('/sprayPaintPriceList', authHelpers.isJWTAuthenticated, metals.getSprayPaintPriceList)

/**
 * 膠水型號價目表
 * @api {get} /database/metal/glueModelPriceList?productTypeId=1 get Glue Model Price List
 * @apiName get Glue Model Price List
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  "glueModelPriceList": [
    {
      "id": 1,
      "glueType": "DEVCON",
      "density": "0.97",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/glueModelPriceList?productTypeId=1
 */

metalRouter.get('/glueModelPriceList', authHelpers.isJWTAuthenticated, metals.getGlueModelPriceList)

/**
 * 熱壓膠水針筒內徑表
 * @api {get} /database/metal/syringeList?productTypeId=1 get syringe List
 * @apiName get syringe List
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "date": {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  "syringeList": [{
    "id": "0322a1d0-ea51-11e9-b396-0242ac110002",
    "syringeName": "0.2",
    "last": 0.2,
    "current": null,
    "next": null,
  }]
}

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/syringeList?productTypeId=1
 */

metalRouter.get('/syringeList', authHelpers.isJWTAuthenticated, metals.getSyringeList)

/**
 *
 * @api {get} /database/metal/machineModule get Machine Module List
 * @apiName get Machine Module List
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "machineModule": [
        {
            "moduleId":"73fd9860-5a91-11e9-8606-6666",
            "moduleName": "Module_1",
            "remark": "",
            "disable": true,
            "NB":{
                "productTypeId": "1",
                "category2Id": "666-666-666",
                "category2Name": "Metal",
            },
            "DT":{
                "productTypeId": "2",
                "category2Id": "666-666-666",
                "category2Name": "Metal",
            }
        }
    ],
    "category2":[ // 表格裡的下拉選項
            {
                "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                "name": "Metal"
            },
            {
                "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                "name": "Aluminum"
            }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/machineModule
 */

metalRouter.get('/machineModule', authHelpers.isJWTAuthenticated, metals.getMachineModuleList)

// 機台 Module 清單
// putMachineList
/**
 *
 * @api {put} /database/metal/modify/machineModule modify Machine Module
 * @apiName modify Machine Module
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "machineModule": [
        {
            "moduleId": "73fd9860-5a91-11e9-8606-6666",
            "remark": null,
            "items": [{
                "productTypeId": "1",
                "metalTypeId": "73fd9860-5a91-11e9-8606-0242ac110002",
            }],
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/machineModule
 */

metalRouter.put('/modify/machineModule', authHelpers.isJWTAuthenticated, metals.putMachineModule)

/**
 *
 * @api {get} /database/metal/MachineTonnes get Machine Tonnes List
 * @apiName get Machine Tonnes List
 * @apiGroup database matal
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
    "machineTonnesList": [
    {
        "uniqueId": "2eb48fc0-e5bf-11e9-af51-0242ac110002_2eb48fc0-e5bf-11e9-af51-0242ac110003"
        "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
        "ton:": "0T",
        "bloster": null,
        "remark": null,
        "pressTypeId": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
        "pressTypeName": "工程模",
        "module_1": {
            "moduleMetalId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
        "module_2": {
            "moduleMetalId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        }
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/MachineTonnes
 */

metalRouter.get('/MachineTonnes', authHelpers.isJWTAuthenticated, metals.getMachineTonnesList)


// putMetalMaterialPrice
/**
 *
 * @api {put} /database/metal/modify/materialPrice modify Metal Material Price
 * @apiName modify Metal Material Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
  {
    "nextId": 3,
    "materialId": 5,
    "subMaterial": [{
      "id": 1,
      "next": 1.5,
    }]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/materialPrice
 */

metalRouter.put('/modify/materialPrice', authHelpers.isJWTAuthenticated, metals.putMetalMaterialPrice)

// putMetalParameter
/**
 *
 * @api {put} /database/metal/modify/metalParameter modify Metal Parameter
 * @apiName modify Metal Parameter
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "typeId": 1,
    "items": [{
      "id":1,
      "next": 1.5,
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/metalParameter
 */

metalRouter.put('/modify/metalParameter', authHelpers.isJWTAuthenticated, metals.putMetalParameter)

// putAnodeColorPriceList 陽極顏色價目表
/**
 *
 * @api {put} /database/metal/modify/anodeColorPrice modify Anode Color Price
 * @apiName modify Anode Color Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "anodeColorPrice":[
      {
        "id": 1,
        "price": 1.5,
        "lossRate": "50",
      }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/anodeColorPrice
 */

metalRouter.put('/modify/anodeColorPrice', authHelpers.isJWTAuthenticated, metals.putAnodeColorPrice)

// putSprayPaintPriceList 噴漆類型價目表
/**
 *
 * @api {put} /database/metal/modify/sprayPaintPrice modify Spray Paint Price
 * @apiName modify Spray Paint Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "sprayPaintPriceList": [
      {
        "id": 1,
        "next": 1.5,
      }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/sprayPaintPrice
 */

metalRouter.put('/modify/sprayPaintPrice', authHelpers.isJWTAuthenticated, metals.putSprayPaintPrice)

// putGlueModelPriceList 膠水型號價目表
/**
 *
 * @api {put} /database/metal/modify/glueModelPrice modify Glue Model Price
 * @apiName modify Glue Model Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "glueModelPriceList": [
      {
        "id": 1,
        "density": "0.97",
        "next": 1.5,
      }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/glueModelPrice
 */

metalRouter.put('/modify/glueModelPrice', authHelpers.isJWTAuthenticated, metals.putGlueModelPrice)

// putSyringeList 熱壓膠水針筒內徑表
/**
 *
 * @api {put} /database/metal/modify/syringePrice modify Syringe Price
 * @apiName modify Syringe Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "syringeList": [{
      "id": "0322a1d0-ea51-11e9-b396-0242ac110002",
      "next": null,
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/syringePrice
 */

metalRouter.put('/modify/syringePrice', authHelpers.isJWTAuthenticated, metals.putSyringePrice)

// 機台頓數價目表
// putMachineTonnesList
/**
 *
 * @api {put} /database/metal/modify/machineTonnes modify Machine Tonnes
 * @apiName modify Machine Tonnes
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "machineTonnesList": [
    {
      "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
      "bloster": null,
      "remark": null,
      "pressTypeId": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
      "modules": [{
        "moduleMetalId": "c1d78d9c-e642-11e9-9d04-0242ac110002",
        "next": 1.5,
      }],
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/machineTonnes
 */

metalRouter.put('/modify/machineTonnes', authHelpers.isJWTAuthenticated, metals.putMachineTonnes)

/**
 *
 * @api {get} /database/metal/partCategory get Part Category
 * @apiName get Part Category
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type 為 housing_metal or housing_metal
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  partCategory: [{
      id: 1,
      name: "Housing",
      items: [{
          id: 2,
          name: "Metal",
          isSelected: true,
      }, {
          id: 3,
          name: "Alumium",
          isSelected: false,
      }]
  },
  {
      id: 2,
      category1Name: "EMC",
      items: [{
          id: 2,
          name: "AAA",
          isSelected: false,
      }, {
          id: 3,
          name: "BBB",
          isSelected: false,
      }]
  }]
}

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiSampleRequest /database/metal/partCategory?material=0e10caa8-e59d-11e9-a30d-0242ac110002
 */
metalRouter.get('/partCategory', metals.getPartCategory)


// linkMetalMaterialPrice
/**
 *
 * @api {post} /database/metal/link/materialPrice link Metal Material Price
 * @apiName link Metal Material Price
 * @apiGroup database
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "materialId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
  "materialName": "AL250"
  "partCategory": [{
    "category1Id": 1,
    "category1Name": "Housing",
    "category2": [{
      category2Id: "31"
      category2Name: "Aluminum",
    }, {
      category2Id: "45"
      category2Name: "Metal",
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/link/materialPrice
 */

metalRouter.post('/link/materialPrice', metals.linkMetalMaterialPrice)

/**
 *
 * @api {get} /database/metal/drillPrice get Metal Drill Price
 * @apiName get Metal Drill Price
 * @apiGroup database matal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "date": {
        "last": "2019-11-08",
        "lastId": 78,
        "current": "2019-11-10",
        "currentId": 86,
        "next": "2019-11-15",
        "nextId": 113
    },
    "drillPrice": [
        {
            "last": 0.8,
            "current": 0.8,
            "next": 1.5,
            "id": "4d7578cc-01d3-11ea-a853-0242ac110002",
            "name": "全週4週邊鑽切13\"",
            "disable": false
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/metal/drillPrice
 */
metalRouter.get('/drillPrice', authHelpers.isJWTAuthenticated, metals.getDrillPrice)

// 噴漆類型 getPaintBottonTop
/**
 *
 * @api {get} /database/metal/paintBottomTop get Paint Botton Top List
 * @apiName get Paint Botton Top List
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "paintBottomTopList": [{
    "paintBottomTopId": "4f19e11a-f0a6-11e9-a8a0-0242ac110002",
    "paintBottomTopName": "底漆"

  },{
    "paintBottomTopId": "4f19e11a-f0a6-11e9-a8a0-0242ac110002",
    "paintBottomTopName": "面漆"
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintBottomTop
 */

metalRouter.get('/paintBottomTop', authHelpers.isJWTAuthenticated, metals.getPaintBottomTop)

// sprayPaintCombinationList 噴漆類型組合清單
/**
 *
 * @api {get} /database/metal/sprayPaintCombinationList get 噴漆類型組合清單
 * @apiName get 噴漆類型組合清單
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "paintCombinationList":[
        {
            "paintTypeId":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
            "paintType":"PU_painting",
            "colorId":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
            "color":"一般或霧面",
            "top":true,
            "bottom":true
        },
        {
            "paintTypeId":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
            "paintType":"PU_painting",
            "colorId":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
            "color":"彩色或高光",
            "top":true,
            "bottom":false
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/metal/sprayPaintCombinationList
 */

metalRouter.get('/sprayPaintCombinationList', authHelpers.isJWTAuthenticated, metals.getSprayPaintCombinationList)

// sprayPaintMachinePrice 噴漆機台價目表
/**
 *
 * @api {get} /database/metal/sprayPaintMachinePrice get 噴漆機台價目表
 * @apiName get 噴漆機台價目表
 * @apiGroup database metal
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
    "sprayPaintMachinePriceList": [
        {
            "id": 1,
            "type": "往復機"
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
        {
            "id": 2,
            "type": "SPINDLE"
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/metal/sprayPaintMachinePrice
 */

metalRouter.get('/sprayPaintMachinePrice', authHelpers.isJWTAuthenticated, metals.getSprayPaintMachinePriceList)

// modify sprayPaintMachinePrice 噴漆機台價目表
/**
 *
 * @api {get} /database/metal/modify/sprayPaintMachinePrice put 噴漆機台價目表
 * @apiName put 噴漆機台價目表
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
    "nextId": 3,
    "sprayPaintMachinePriceList": [
        {
            "id": 1,
            "next": 1.5,
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/metal/modify/sprayPaintMachinePrice
 */

metalRouter.put('/modify/sprayPaintMachinePrice', authHelpers.isJWTAuthenticated, metals.putSprayPaintMachinePriceList)

// 噴漆類型 getPaintTypePriceList
/**
 *
 * @api {get} /database/metal/paintTypePrice get Type Price List
 * @apiName get Paint Type Price List
 * @apiGroup database metal
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
  "paintTypePriceList": [{
    "id": "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: metal_paint_type_color_bottom_top 面漆, 顏色, printing_type的uuid
    "name": "PU_painting",
    "colorName": "N/A"
    "Akzo": {
      "vendorId":"c7007df0-f3b3-11e9-8d42-0242ac110002",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    },
    "東端": {
      "vendorId":"c700a406-f3b3-11e9-8d42-0242ac110002",
      "last": 5.00,
      "current": 2.5,
      "next": 1.5,
    }
  }],
  "vendorList": [{
    "id": "c7007df0-f3b3-11e9-8d42-0242ac110002",
    "name": "Akzo"
  },
  {
    "id": "c700a406-f3b3-11e9-8d42-0242ac110002",
    "name": "東端"
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintTypePrice?paintBottomTopId=753c15a8-f1a9-11e9-baa0-0242ac110002
 */

metalRouter.get('/paintTypePrice', authHelpers.isJWTAuthenticated, metals.getPaintTypePrice)

// 噴漆配方價格 paintFormulaPirce
/**
 *
 * @api {get} /database/metal/paintFormulaPirce get Paint Formula Pirce
 * @apiName get Paint Formula Pirce
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  paintId: "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: metal_paint_type_color_bottom_top 面漆, 顏色, painting_type的uuid
  vendorId: "c700a406-f3b3-11e9-8d42-0242ac110002", // table: metal_paint_vendor 廠商id
  dateId: 1
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  paintId: "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: metal_paint_type_color_bottom_top 面漆, 顏色, painting_type的uuid
  vendorId: "c700a406-f3b3-11e9-8d42-0242ac110002", // table: metal_paint_vendor 廠商id
  "paintFormulaPirce": [
         {
            key: "main_unit_price",
            label: "主劑單價(USD/Kg)",
            fieldType: "input",
            dataType: "float",
            value: 14.31,
        },
        {
            key: "main_amount",
            label: "主劑比例",
            fieldType: "input",
            dataType: "float",
            value: 100,
        }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintFormulaPirce
 */
metalRouter.get('/paintFormulaPirce', authHelpers.isJWTAuthenticated, metals.getPaintFormulaPrice)

// 塗料廠商 getPaintVendor
/**
 *
 * @api {get} /database/metal/paintVendor get Paint Vendor
 * @apiName get Paint Vendor
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "paintVendor": [{
    "id": "4eff8734-f0a6-11e9-a8a0-0242ac110002",
    "name": "Akzo",
    "remark": "remark",
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintVendor
 */

metalRouter.get('/paintVendor', authHelpers.isJWTAuthenticated, metals.getPaintVendor)

// 噴漆類型及顏色清單 getPaintTypeColorList
/**
 *
 * @api {get} /database/metal/paintTypeColor get Paint Type Color List
 * @apiName get Paint Type Color List
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "paintTypeColorList": [{
    "paintTypeId": 1,
    "paintTypeName": "N/A",
    "color": [{
      "colorId": 1,
      "colorName": "一般或霧面",
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintTypeColor
 */

metalRouter.get('/paintTypeColor', authHelpers.isJWTAuthenticated, metals.getPaintTypeColor)
// 噴塗人工單價及工時表 getPaintManPowerHour
/**
 *
 * @api {get} /database/metal/paintManPowerHour get Paint Man Power Hour List
 * @apiName get Paint Man Power Hour List
 * @apiGroup database metal
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
  "paintManPowerHourList": [{
    "id": 1,
    "name": "NB",
    "last": {
      "price": 5,
      "manHour": 30,
    },
    "current": {
      "price": 5,
      "manHour": 50,
    },
    "next": {
      "price": 5,
      "manHour": 99,
    },
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintManPowerHour
 */

metalRouter.get('/paintManPowerHour', authHelpers.isJWTAuthenticated, metals.getPaintManPowerHour)
// 噴塗線人工及總人工費用表 getPaintManPowerPriceList
/**
 *
 * @api {get} /database/metal/paintManPowerPrice get Paint Man Power Price List
 * @apiName get Paint Man Power Price List
 * @apiGroup database metal
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
  "paintManPowerPriceList": [{
    "id": 1,
    "name": "metal",
    "last": 5.00,
    "current": 2.5,
    "next": 1.5,
  }],
  "paintManPowerHourList": {
    "last": {
      "price": 5,
      "manHour": 30,
    },
    "current": {
      "price": 5,
      "manHour": 50,
    },
    "next": {
      "price": 5,
      "manHour": 99,
    },
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/paintManPowerPrice?productTypeId=2 // DT
 */

metalRouter.get('/paintManPowerPrice', authHelpers.isJWTAuthenticated, metals.getPaintManPowerPrice)
// 塗料廠商 putPaintVendor
/**
 *
 * @api {put} /database/metal/modify/paintVendor modify Paint Vendor
 * @apiName modify Paint Vendor
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "paintVendor": [{
    "id": "4eff8734-f0a6-11e9-a8a0-0242ac110002",
    "remark": "remark",
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/paintVendor
 */
metalRouter.put('/modify/paintVendor', authHelpers.isJWTAuthenticated, metals.putPaintVendor)
// 噴漆配方價目表 putPaintFormulaPriceList
/**
 *
 * @api {put} /database/metal/modify/paintFormulaPirce modify Paint Formula Price List
 * @apiName modify Paint Formula Price List
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  paintId:"123456",
  vendorId: "44556",
  nextId:1,
  paintFormulaPirce:[
         {
            key: "main_unit_price",
            value: 14.31,
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/paintFormulaPirce
 */

metalRouter.put('/modify/paintFormulaPirce', authHelpers.isJWTAuthenticated, metals.putPaintFormulaPrice)
// 噴塗人工單價及工時表 putPaintManPowerHourList
/**
 *
 * @api {put} /database/metal/modify/paintManPowerHour modify Paint Man Power Hour List
 * @apiName modify Paint Man Power Hour List
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
{
  "nextId": 3,
  "paintManPowerHourList": [{
      "id": 1,
      "price": 0.45,
      "manHour": 10,
  },
  {
      "id": 2,
      "price": 0.45,
      "manHour": 10,
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/paintManPowerHour
 */

metalRouter.put('/modify/paintManPowerHour', authHelpers.isJWTAuthenticated, metals.putPaintManPowerHour)
// 噴塗線人工及總人工費用表 putPaintManPowerPrice
/**
 *
 * @api {put} /database/metal/modify/paintManPowerPrice modify Paint Man Power Price List
 * @apiName modify Paint Man Power Price List
 * @apiGroup database metal
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
{

  "nextId": 5,
  "paintManPowerPriceList": [
    {
      "id": "d3da1252-f3c7-11e9-9238-0242ac110002",
      "next": "22"
    },
    {
      "id": "d3d9f3bc-f3c7-11e9-9238-0242ac110002",
      "next": "11"
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/metal/modify/paintManPowerPrice
 */

metalRouter.put('/modify/paintManPowerPrice', authHelpers.isJWTAuthenticated, metals.putPaintManPowerPrice)

module.exports = metalRouter
