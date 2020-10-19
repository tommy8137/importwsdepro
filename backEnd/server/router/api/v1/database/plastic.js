const router = require('koa-router')
const plastic = require('../../../../api/database/plastic.js')
const plasticRouter = new router()
const plastics = new plastic()

const authHelper = require('../../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()


/**
 *
 * @api {get} /database/plastic/materialPrice get Plastic Material Price
 * @apiName get Plastic Material Price
 * @apiGroup database plastic
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
        "id": 1,
        "materialSpec": "FR PC",
        "remark": "remark",
        "subMaterial": [{
           "id": 1,
           "material": "Sabic_EXL1414",
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
 * @apiSampleRequest /database/plastic/materialPrice
 */

plasticRouter.get('/materialPrice', authHelpers.isJWTAuthenticated, plastics.getPlasticMaterialPrice)

/**
 *
 * @api {post} /database/plastic/materialSpec Plastic Material Price ADD Material Spec
 * @apiName add Plastic Material Price Material Spec
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
{
  "materialSpec": "FR PC",
  "remark": "remark"
}

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "materialSpec": "111122-222222-333333-44444"
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/materialSpec
 */

plasticRouter.post('/materialSpec', authHelpers.isJWTAuthenticated, plastics.postPlasticMaterialSpec)

/**
 *
 * @api {post} /database/plastic/material Plastic Material Price ADD Material
 * @apiName add Plastic Material Price Material
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/material
 */

plasticRouter.post('/material', authHelpers.isJWTAuthenticated, plastics.postPlasticMaterial)


/**
 *
 * @api {get} /database/plastic/partCategory get Part Category
 * @apiName get Part Category
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
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
 * @apiSampleRequest /database/plastic/partCategory?material=2a0e5b5e-f0be-11e9-93de-0242ac110002
 */
plasticRouter.get('/partCategory', authHelpers.isJWTAuthenticated, plastics.getPartCategory)

// Printing製程價目表 getPrintingProcessPrice
/**
 *
 * @api {get} /database/plastic/printingProcessPrice?productTypeId=1 get Printing Process Price
 * @apiName get Printing Process Price
 * @apiGroup database plastic
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
    "printingProcessPriceList": [
      {
        "id": 1,
        "name": "鋼印",
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
 * @apiSampleRequest /database/plastic/printingProcessPrice?productTypeId=1
 */

plasticRouter.get('/printingProcessPrice', authHelpers.isJWTAuthenticated, plastics.getPrintingProcessPrice)
// 埋釘製程價目表 getEmbeddedPrice
/**
 *
 * @api {get} /database/plastic/embeddedPrice?productTypeId=1 get Embedded Price
 * @apiName get Embedded Price
 * @apiGroup database plastic
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
    "embeddedPriceList": [
      {
        "id": 1,
        "name": "人工",
        "remark": "remark",
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
 * @apiSampleRequest /database/plastic/embeddedPrice?productTypeId=1
 */

plasticRouter.get('/embeddedPrice', authHelpers.isJWTAuthenticated, plastics.getEmbeddedPrice)
// 噴漆類型 getPaintBottonTop
/**
 *
 * @api {get} /database/plastic/paintBottomTop get Paint Botton Top List
 * @apiName get Paint Botton Top List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/paintBottomTop
 */

plasticRouter.get('/paintBottomTop', authHelpers.isJWTAuthenticated, plastics.getPaintBottomTop)

/**
 *
 * @api {get} /database/plastic/plasticParameter?productTypeId=1 get Plastic Parameter by product type
 * @apiName get Plastic Parameter
 * @apiGroup database plastic
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
    "plasticParameter": [{
        "id": 1,
        "type": "材料",
        "items": [{
            "id":1,
            "item": "埋釘 Loss Rate",
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
 * @apiSampleRequest /database/plastic/plasticParameter?productTypeId=1
 */

plasticRouter.get('/plasticParameter', authHelpers.isJWTAuthenticated, plastics.getPlasticParameter)

// sprayPaintCombinationList 噴漆類型組合清單
/**
 *
 * @api {get} /database/plastic/sprayPaintCombinationList get 噴漆類型組合清單
 * @apiName get 噴漆類型組合清單
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/sprayPaintCombinationList
 */

plasticRouter.get('/sprayPaintCombinationList', authHelpers.isJWTAuthenticated, plastics.getSprayPaintCombinationList)

// sprayPaintMachinePrice 噴漆機台價目表
/**
 *
 * @api {get} /database/plastic/sprayPaintMachinePrice get 噴漆機台價目表
 * @apiName get 噴漆機台價目表
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/sprayPaintMachinePrice
 */

plasticRouter.get('/sprayPaintMachinePrice', authHelpers.isJWTAuthenticated, plastics.getSprayPaintMachinePriceList)

// modify sprayPaintMachinePrice 噴漆機台價目表
/**
 *
 * @api {get} /database/plastic/modify/sprayPaintMachinePrice put 噴漆機台價目表
 * @apiName put 噴漆機台價目表
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/sprayPaintMachinePrice
 */

plasticRouter.put('/modify/sprayPaintMachinePrice', authHelpers.isJWTAuthenticated, plastics.putSprayPaintMachinePriceList)

// 噴漆類型 getPaintTypePriceList
/**
 *
 * @api {get} /database/plastic/paintTypePrice get Type Price List
 * @apiName get Paint Type Price List
 * @apiGroup database plastic
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
    "id": "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: plastic_paint_type_color_bottom_top 面漆, 顏色, printing_type的uuid
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
 * @apiSampleRequest /database/plastic/paintTypePrice?paintBottomTopId=753c15a8-f1a9-11e9-baa0-0242ac110002
 */

plasticRouter.get('/paintTypePrice', authHelpers.isJWTAuthenticated, plastics.getPaintTypePrice)

// 噴漆配方價格 paintFormulaPirce
/**
 *
 * @api {get} /database/plastic/paintFormulaPirce get Paint Formula Pirce
 * @apiName get Paint Formula Pirce
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  paintId: "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: plastic_paint_type_color_bottom_top 面漆, 顏色, painting_type的uuid
  vendorId: "c700a406-f3b3-11e9-8d42-0242ac110002", // table: plastic_paint_vendor 廠商id
  dateId: 1
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  paintId: "4f326e38-f0a6-11e9-a8a0-0242ac110002", // table: plastic_paint_type_color_bottom_top 面漆, 顏色, painting_type的uuid
  vendorId: "c700a406-f3b3-11e9-8d42-0242ac110002", // table: plastic_paint_vendor 廠商id
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
 * @apiSampleRequest /database/plastic/paintFormulaPirce
 */
plasticRouter.get('/paintFormulaPirce', authHelpers.isJWTAuthenticated, plastics.getPaintFormulaPrice)

// 塗料廠商 getPaintVendor
/**
 *
 * @api {get} /database/plastic/paintVendor get Paint Vendor
 * @apiName get Paint Vendor
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/paintVendor
 */

plasticRouter.get('/paintVendor', authHelpers.isJWTAuthenticated, plastics.getPaintVendor)

// materialLossRate 材料 Loss Rate 維護表
/**
 *
 * @api {get} /database/plastic/materialLossRate get 材料 Loss Rate 維護表
 * @apiName get 材料 Loss Rate 維護表
 * @apiGroup database plastic
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
    "materialLossRate": [
    {
        "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002", //plastic_material_loss_rate 的 id
        "item:": "NORMAL(咬花)",
        "remark": null,
        "NB": {
            "productTypeId": 1,
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
        "DT": {
            "productTypeId": 2,
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        }
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/plastic/materialLossRate
 */

plasticRouter.get('/materialLossRate', authHelpers.isJWTAuthenticated, plastics.getMaterialLossRate)

// 機台Module清單 getMachineModel
/**
 *
 * @api {get} /database/plastic/machineModule 機台Module清單
 * @apiName 機台Module清單
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "machineModule": [
        {
            "moduleName": "Module_1",
            "moduleId":"73fd9860-5a91-11e9-8606-6666"
            "remark": "",
            "NB":{
                "productTypeId": "1",
                "category2List":[
                    {
                        "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                        "name": "Plastic"
                    }
                ]
            },
            "DT":{
                "productTypeId": "1",
                "category2List":[
                    {
                        "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                        "name": "Plastic"
                    }
                ]
            }
        }
    ],
    "category2":[
            {
                "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                "name": "Plastic"
            },
            {
                "id": "73fd9860-5a91-11e9-8606-0242ac110002",
                "name": "Insert_Molding"
            }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/machineModule
 */

plasticRouter.get('/machineModule', authHelpers.isJWTAuthenticated, plastics.fetchMachineModule)

// 機台噸數價目表 getMachineTonnesList
/**
 *
 * @api {get} /database/plastic/machineTonnes 機台噸數價目表
 * @apiName 機台噸數價目表
 * @apiGroup database plastic
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
        "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
        "ton:": "0T",
        "remark": null,
        "module_1": {
            "modulePlasticId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
            "last": 5.00,
            "current": 2.5,
            "next": 1.5,
        },
        "module_2": {
            "modulePlasticId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
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
 * @apiSampleRequest /database/plastic/machineTonnes
 */

plasticRouter.get('/machineTonnes', authHelpers.isJWTAuthenticated, plastics.fetchMachineTonnesList)

// 機台頓數價目表
// putMachineTonnesList
/**
 *
 * @api {put} /database/plastic/modify/machineTonnes modify Machine Tonnes
 * @apiName modify Machine Tonnes
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "machineTonnesList": [
    {
      "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
      "remark": null,
      "modules": [{
        "modulePlasticId": "c1d78d9c-e642-11e9-9d04-0242ac110002",
        "next": 1.5,
      }],
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/machineTonnes
 */

plasticRouter.put('/modify/machineTonnes', authHelpers.isJWTAuthenticated, plastics.putMachineTonnes)

// 噴漆類型及顏色清單 getPaintTypeColorList
/**
 *
 * @api {get} /database/plastic/paintTypeColor get Paint Type Color List
 * @apiName get Paint Type Color List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/paintTypeColor
 */

plasticRouter.get('/paintTypeColor', authHelpers.isJWTAuthenticated, plastics.getPaintTypeColor)

// 產品打磨費用明細
/**
 *
 * @api {get} /database/plastic/grindingPrice?productTypeId=1 get 產品打磨費用明細
 * @apiName get 產品打磨費用明細
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "grindingPriceList": [
        {
            "id": 1,
            "item": "A件",
            "price": 2.5,
            "loss": 1.5,
            "remark": "人工remark",
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/plastic/grindingPrice?productTypeId=1
 */

plasticRouter.get('/grindingPrice', authHelpers.isJWTAuthenticated, plastics.getGrindingPriceList)

// EMI Sputtering 清單 getEmiSputteringList
/**
 *
 * @api {get} /database/plastic/emiSputtering?productTypeId=1 get EMI Sputtering List
 * @apiName get EMI Sputtering List
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "emiSputteringList":[
    {
      "id":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
      "label":'10"',
      "remark":"",
      "value":10
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/emiSputtering?productTypeId=1
 */

plasticRouter.get('/emiSputtering', authHelpers.isJWTAuthenticated, plastics.fetchEmiSputteringList)

// EMI Sputtering Base 本體材料清單 getEmiSputteringBaseList
/**
 *
 * @api {get} /database/plastic/emiSputteringBase?productTypeId=1 get EMI Sputtering Base List
 * @apiName get EMI Sputtering Base List
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "emiSputteringBaseList": [{
    "id": 1,
    "name": "PC+ABS",
    "remark": "remark",
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/emiSputteringBase?productTypeId=1
 */

plasticRouter.get('/emiSputteringBase', authHelpers.isJWTAuthenticated, plastics.getEmiSputteringBase)

// EMI Sputtering 價目表 getEmiSputteringPrice
/**
 *
 * @api {get} /database/plastic/emiSputteringPrice?siteGroupId=5505bcfc-f0a6-11e9-a8a0-0242ac110002&productTypeId=1 get EMI Sputtering Price
 * @apiName get EMI Sputtering Price
 * @apiGroup database plastic
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
  "emiSputteringPriceList": [
    {
      "id": "1", // plastic_emi_sputtering_link.size_id
      "name": "11\"",
      "PC+ABS": {
          "sputteringId": "2", // plastic_emi_sputtering_link.id group, size, base uniq id
          "last": 5.00,
          "current": 2.5,
          "next": 1.5,
      }
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/emiSputteringPrice?siteGroupId=5505bcfc-f0a6-11e9-a8a0-0242ac110002&productTypeId=1
 */

plasticRouter.get('/emiSputteringPrice', authHelpers.isJWTAuthenticated, plastics.getEmiSputteringPrice)

// 噴塗人工單價及工時表 getPaintManPowerHour
/**
 *
 * @api {get} /database/plastic/paintManPowerHour get Paint Man Power Hour List
 * @apiName get Paint Man Power Hour List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/paintManPowerHour
 */

plasticRouter.get('/paintManPowerHour', authHelpers.isJWTAuthenticated, plastics.getPaintManPowerHour)

// EMI Sputtering Site Group
/**
 *
 * @api {get} /database/plastic/emiSputteringSiteGroup?productTypeId=1 get EMI Sputtering Site Group
 * @apiName get EMI Sputtering Site Group
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "emiSputteringSiteList": [{
        "id":"5505bcfc-f0a6-11e9-a8a0-0242ac110002",
        "siteList": [{
            "siteId": 1,
            "siteName": "WKS",
        },{
            "siteId": 2,
            "siteName": "WZS",
        }]
    },
    {
        "id":"c8a1b304-f228-11e9-9516-0242ac110002",
        "siteList": [{
            "siteId": 1,
            "siteName": "WCQ",
        },{
            "siteId": 2,
            "siteName": "WCD",
        }]
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/plastic/emiSputteringSiteGroup?productTypeId=1
 */

plasticRouter.get('/emiSputteringSiteGroup', authHelpers.isJWTAuthenticated, plastics.getEmiSputteringSiteGroupList)

// EMI Site Group 下拉
/**
 *
 * @api {get} /database/plastic/emiSiteGroup?productTypeId=1 get  EMI Site Group 下拉
 * @apiName get  EMI Site Group 下拉
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "siteGroupList": [{
        "siteGroupId": "5505bcfc-f0a6-11e9-a8a0-0242ac110002",
        "siteGroupName": "WKS/WZS",
    },
    {
        "siteGroupId": "55106544-f0a6-11e9-a8a0-0242ac110002",
        "siteName": "WCQ/WCD",
    }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/plastic/emiSiteGroup?productTypeId=1
 */

plasticRouter.get('/emiSiteGroup', authHelpers.isJWTAuthenticated, plastics.getEmiSiteGroupList)

// 噴塗線人工及總人工費用表 getPaintManPowerPriceList
/**
 *
 * @api {get} /database/plastic/paintManPowerPrice get Paint Man Power Price List
 * @apiName get Paint Man Power Price List
 * @apiGroup database plastic
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
    "name": "Plastic",
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
 * @apiSampleRequest /database/plastic/paintManPowerPrice?productTypeId=1 // NB
 */

plasticRouter.get('/paintManPowerPrice', authHelpers.isJWTAuthenticated, plastics.getPaintManPowerPrice)

// linkPlasticMaterialPrice
/**
 *
 * @api {post} /database/plastic/link/materialPrice link Plastic Material Price
 * @apiName link Plastic Material Price
 * @apiGroup database
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
{
  "materialSpecId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
  "materialSpecName": "PC",
  "materialId": "68cd8460-efd7-11e9-9f9c-0242ac110002",
  "materialName": "Sabic_EXL1414",
  "partCategory": [{
    "category1Id": 1,
    "category1Name": "Housing",
    "category2": [{
      category2Id: "31"
      category2Name: "Plastic",
    }, {
      category2Id: "45"
      category2Name: "Plastic_NB",
    }]
  }]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/link/materialPrice
 */

plasticRouter.post('/link/materialPrice', authHelpers.isJWTAuthenticated, plastics.linkPlasticMaterialPrice)

// 機台Module清單 putMachineModule
/**
 *
 * @api {put} /database/plastic/modify/machineModule modify Machine Module
 * @apiName modify Machine Module
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "machineModule": [
        {
            "moduleId": "73fd9860-5a91-11e9-8606-6666",
            "remark": null,
            "items": [{
                "productTypeId": "1",
                "category2List": [
                    "73fd9860-5a91-11e9-8606-0242ac110002"
                ],
            }],
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/machineModule
 */

plasticRouter.put('/modify/machineModule', authHelpers.isJWTAuthenticated, plastics.modifyMachineModule)

// Printing製程價目表 putPrintingProcessPriceList
/**
 *
 * @api {put} /database/plastic/modify/printingProcessPrice modify Printing Process Price
 * @apiName modify Printing Process Price
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "nextId": 3,
  "printingProcessPriceList":[
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
 * @apiSampleRequest /database/plastic/modify/printingProcessPrice
 */

plasticRouter.put('/modify/printingProcessPrice', authHelpers.isJWTAuthenticated, plastics.putPrintingProcessPrice)

// 埋釘製程價目表 putEmbeddedPriceList
/**
 *
 * @api {put} /database/plastic/modify/embeddedPrice modify Embedded Price
 * @apiName modify Embedded Price
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{

  "nextId": 3,
  "embeddedPriceList": [
    {
      "id": 1,
      "remark": "remark",
      "next": 1.5,
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/embeddedPrice
 */

plasticRouter.put('/modify/embeddedPrice', authHelpers.isJWTAuthenticated, plastics.putEmbeddedPrice)

// 塗料廠商 putPaintVendor
/**
 *
 * @api {put} /database/plastic/modify/paintVendor modify Paint Vendor
 * @apiName modify Paint Vendor
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/paintVendor
 */
plasticRouter.put('/modify/paintVendor', authHelpers.isJWTAuthenticated, plastics.putPaintVendor)

// putMaterialSpec
/**
 *
 * @api {put} /database/plastic/modify/materialSpec modify Metal Parameter
 * @apiName modify Plastic Material Spec
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/MaterialSpec
 */
plasticRouter.put('/modify/materialSpec', authHelpers.isJWTAuthenticated, plastics.putMaterialSpec)

// 噴漆配方價目表 putPaintFormulaPriceList
/**
 *
 * @api {put} /database/plastic/modify/paintFormulaPirce modify Paint Formula Price List
 * @apiName modify Paint Formula Price List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/paintFormulaPirce
 */

plasticRouter.put('/modify/paintFormulaPirce', authHelpers.isJWTAuthenticated, plastics.putPaintFormulaPrice)

// EMI Sputtering 價目表 putEmiSputteringPrice
/**
 *
 * @api {put} /database/plastic/emiSputteringPrice modify EMI Sputtering Price
 * @apiName modify EMI Sputtering Price
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "nextId": 5,
    "emiSputteringPriceList": [{
    	"sputteringId": "d3ae0be4-f3c7-11e9-9238-0242ac110002",
    	"next": 1.5
    }, {
    	"sputteringId": "d3af19e4-f3c7-11e9-9238-0242ac110002",
    	"next": 1.55
    }]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/emiSputteringPrice
 */

plasticRouter.put('/modify/emiSputteringPrice', authHelpers.isJWTAuthenticated, plastics.putEmiSputteringPrice)
// 噴塗人工單價及工時表 putPaintManPowerHourList
/**
 *
 * @api {put} /database/plastic/modify/paintManPowerHour modify Paint Man Power Hour List
 * @apiName modify Paint Man Power Hour List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/paintManPowerHour
 */

plasticRouter.put('/modify/paintManPowerHour', authHelpers.isJWTAuthenticated, plastics.putPaintManPowerHour)

// 噴塗線人工及總人工費用表 putPaintManPowerPrice
/**
 *
 * @api {put} /database/plastic/modify/paintManPowerPrice modify Paint Man Power Price List
 * @apiName modify Paint Man Power Price List
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/modify/paintManPowerPrice
 */

plasticRouter.put('/modify/paintManPowerPrice', authHelpers.isJWTAuthenticated, plastics.putPaintManPowerPrice)
// 材料 Loss Rate 維護表 putMaterialLossRate
/**
 *
 * @api {put} /database/plastic/modify/materialLossRate modify 材料 Loss Rate 維護表
 * @apiName modify 材料 Loss Rate 維護表
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
{
  "nextId": 3,
  "materialLossRate": [
    {
      "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
      "remark": null,
      "productTypes": [{
          "productTypeId": "c1d78d9c-e642-11e9-9d04-0242ac110002",
          "next": 1.5,
      }],
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/materialLossRate
 */

plasticRouter.put('/modify/materialLossRate', authHelpers.isJWTAuthenticated, plastics.putMaterialLossRate)
/**
 *
 * @api {put} /database/plastic/modify/grindingPrice modify Plastic Grinding Price
 * @apiName Modify Grinding Price
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 * {
    "nextId": 3,
    "grindingPriceList": [
        {
            "id": "c8df5312-f228-11e9-9516-0242ac110002",
            "next": 5,
            "remark": "人工remark",
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /database/plastic/modify/grindingPrice
 */
plasticRouter.put('/modify/grindingPrice', authHelpers.isJWTAuthenticated, plastics.modifyGrindingPrice)
// EMI Sputtering 清單 putemiSputteringList
/**
 *
 * @api {put} /database/plastic/modify/emiSputteringList modify EMI Sputtering list
 * @apiName modify EMI Sputtering List
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "emiSputteringList":[
            {
                "id":"4eff8734-f0a6-11e9-a8a0-0242ac110002",
                "remark":"remark",
                "value":11
            }
        ]
    }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/emiSputteringList
 */

plasticRouter.put('/modify/emiSputteringList', authHelpers.isJWTAuthenticated, plastics.putEmiSputteringList)
// EMI Sputtering Site Group
/**
 *
 * @api {put} /database/plastic/modify/emiSputteringSiteGroup modify Emi Sputtering Group
 * @apiName modify EMI Sputtering Group
 * @apiGroup database plastic
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam {String} productTypeId product Type Id, default:1
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {

      "productTypeId": 2,
      "emiSputteringSiteGroupList": [{
        "id":"5505bcfc-f0a6-11e9-a8a0-0242ac110002",
        "siteList": [1, 2]
      }]
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /database/plastic/modify/emiSputteringSiteGroup
 */

plasticRouter.put('/modify/emiSputteringSiteGroup', authHelpers.isJWTAuthenticated, plastics.putEmiSputteringSiteGroup)

/**
 *
 * @api {post} /database/plastic/archive/material Archive Plastic Material
 * @apiName Archive Plastic Material
 * @apiGroup database plastic
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
  * @apiSampleRequest /database/plastic/archive/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

plasticRouter.post('/archive/material', authHelpers.isJWTAuthenticated, plastics.archivePlasticMaterial)

/**
 *
 * @api {post} /database/plastic/unblock/material Unblock Plastic Material
 * @apiName Unblock Plastic Material
 * @apiGroup database plastic
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
  * @apiSampleRequest /database/plastic/unblock/material
  * @apiError 401 Unauthorized
  * @apiError 400 MISSING PARAMETER
 */

plasticRouter.post('/unblock/material', authHelpers.isJWTAuthenticated, plastics.unblockPlasticMaterial)

/**
 *
 * @api {post} /database/plastic/archive/materialSpec Archive Plastic Material Spec
 * @apiName Archive Plastic Material Spec
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/archive/materialSpec
 */

plasticRouter.post('/archive/materialSpec', authHelpers.isJWTAuthenticated, plastics.archivePlasticMaterialSpec)

/**
 *
 * @api {post} /database/plastic/unblock/materialSpec Unblock Plastic Material Spec
 * @apiName Unblock Plastic Material Spec
 * @apiGroup database plastic
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
 * @apiSampleRequest /database/plastic/unblock/materialSpec
 */

plasticRouter.post('/unblock/materialSpec', authHelpers.isJWTAuthenticated, plastics.unblockPlasticMaterialSpec)


module.exports = plasticRouter
