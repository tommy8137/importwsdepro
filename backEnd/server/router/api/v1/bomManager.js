const router = require('koa-router')

const bomManagerRouter = new router()
const authHelper = require('../../../helpers/authHelper/index.js')
const bomManager = require('../../../api/bom/bomManager.js')
const user = require('../../../api/admin/user.js')
const itemCtrller = require('../../../api/bom/itemCtrl.js')
const bomItems = require('../../../api/bom/bomItem.js')
const partListCls = require('../../../api/bom/partlistCtrl')

const authHelpers = new authHelper()
const bomManagers = new bomManager()
// const itemCtrller = new itemCtrlCls()
const users = new user()
const bomItem = new bomItems()

const partList = new partListCls()

/**
 *
 * @api {get} /bom/bomDatas?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=ME get bom list
 * @apiName bom list
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Integer} numberOfBom  BomData總數
 * @apiSuccess {String} number  number
 * @apiSuccess {String} bg bg
 * @apiSuccess {String} customer customer
 * @apiSuccess {String} product  product
 * @apiSuccess {String} stage   stage
 * @apiSuccess {String} version  version
 * @apiSuccess {String} project_leader   project_leader
 * @apiSuccess {String} approved_by  approved_by
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "bomInfo": {
        "numberOfBom": 3,
        "bomList": [
            {
                "id": 5,
                "customer": "123",
                "project_name": null,
                "product": "123",
                "stage_id": "1",
                "stage": "RFI",
                "version_id": "6faa7106-debf-4571-937a-af79e7cb3161",
                "version": "V1.0",
                "project_leader": null,
                "approved_by": null,
                "create_by": "10700001",
                "sku_desc": null
            },
            {
                "id": 6,
                "customer": "123",
                "project_name": null,
                "product": "123",
                "stage_id": null,
                "stage": null,
                "version_id": null,
                "version": null,
                "project_leader": null,
                "approved_by": null,
                "create_by": "10700001",
                "sku_desc": null
            }
        ]
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomDatas?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=ME
 */

/**
 *
 * @api {get} /bom/bomDatas?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=EE get EE bom list
 * @apiName eeBom list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Integer} numberOfBom  BomData總數
 * @apiSuccess {String} customer  customer
 * @apiSuccess {String} product_type product_type
 * @apiSuccess {String} project_name project_name
 * @apiSuccess {String} project_code  project_code
 * @apiSuccess {String} stage   stage
 * @apiSuccess {String} version  version
 * @apiSuccess {String} sku   sku
 * @apiSuccess {String} version_remark  version_remark
 * @apiSuccess {String} project_leader  project_leader
 * @apiSuccess {Boolean} is_approved  is_approved
 * @apiSuccess {String} approve_time  approve_time
 *  * @apiSuccess {String} is_next_stage  is_next_stage
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "bomInfo": {
        "numberOfBom": 3,
        "bomList": [
            {
                "id": "4PD0DV010001_Discrete",
                "project_code": "4PD0DV010001",
                "customer": "Acer",
                "product_type": "Notebook.Computer",
                "project_name": "SLINKY",
                "stage": "-1",
                "version": "0",
                "sku": "Discrete",
                "version_remark": "10205031",
                "project_leader": "SCOTT HSU",
                "eedm_version": null,
                "is_eedm_version_edit": null,
                "plant": "711",
                "purchasing_organization": null,
                "create_time": "2019-04-18T10:28:07.236Z",
                "caculation_date": null,
                "update_time": null,
                "approve_time": null,
                "is_pcb_approved": false,
                "is_bom_approved": false,
                "pcb_approved_by": null,
                "bom_approved_by": null,
                "is_next_stage": true
            }
        ]
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomDatas?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=EE
 */
bomManagerRouter.get('/bomDatas', authHelpers.isJWTAuthenticated, bomManagers.getBomData)
/**
 *
 * @api {get} /bom/bomDatasBySearch?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=EE&project_code=4PD&project_name=kl&disable=false get EE/ME/EMDM bom list
 * @apiName eeBom list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * -- Common
 * @apiParam {Number} pages 頁數
 * @apiParam {Number} items 每頁數量
 * @apiParam {String} orderBy
 * @apiParam {String} column filter by XXX 欄位
 * @apiParam {String} keyword filter 欄位為XXX
 * @apiParam {String} role EE/ME/EMDM
 *
 * -- ME/EMDM
 * @apiParam {String} project 依照project_code or project_name 搜尋
 *
 * -- EMDM
 * @apiParam {Boolean} disable
      * ture: 只顯示封存項目
      * false: 沒有被封存的項目
 *
 * @apiSuccess {Integer} numberOfBom  BomData總數
 * @apiSuccess {String} customer  customer
 * @apiSuccess {String} product_type product_type
 * @apiSuccess {String} project_name project_name
 * @apiSuccess {String} project_code  project_code
 * @apiSuccess {String} stage   stage
 * @apiSuccess {String} version  version
 * @apiSuccess {String} sku   sku
 * @apiSuccess {String} version_remark  version_remark
 * @apiSuccess {String} project_leader  project_leader
 * @apiSuccess {Boolean} is_approved  is_approved
 * @apiSuccess {String} approve_time  approve_time
 * @apiSuccess {String} is_next_stage  is_next_stage
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
--EE
 {
    "bomInfo": {
        "numberOfBom": 3,
        "bomList": [
            {
                "id": "4PD0DV010001_Discrete",
                "project_code": "4PD0DV010001",
                "customer": "Acer",
                "product_type": "Notebook.Computer",
                "project_name": "SLINKY",
                "stage": "-1",
                "version": "0",
                "sku": "Discrete",
                "version_remark": "10205031",
                "project_leader": "SCOTT HSU",
                "eedm_version": null,
                "is_eedm_version_edit": null,
                "plant": "711",
                "purchasing_organization": null,
                "create_time": "2019-04-18T10:28:07.236Z",
                "caculation_date": null,
                "update_time": null,
                "approve_time": null,
                "is_pcb_approved": false,
                "is_bom_approved": false,
                "pcb_approved_by": null,
                "bom_approved_by": null,
                "is_next_stage": true
            }
        ]
    }
}
-- ME
{
  "bomInfo": {
    "numberOfBom":481,
    "bomList":[{
      "id":1880,
      "customer":"ACA",
      "project_code":"12312",
      "project_name":"[DT] Other fill me remark",
      "product":"DT",
      "stage_id":"1",
      "stage":"RFI",
      "version_id":"36bd049b-9265-4d18-8239-fb6ceb6e64db",
      "version":"V0.5",
      "project_leader":"10611048",
      "approved_by":"9410130",
      "create_by":"10700001",
      "sku_desc":"",
      "create_time":"2020-07-22T01:16:20.817Z",
      "duration":[
          {
            "version_name":"V0.5",
            "timeDiff":"1 day 2 hr 35 min"
          },
          {
            "version_name":"V0.0",
            "timeDiff":"0 day 0 hr 7 min"
          }
      ],
      "own_created":true
    }]
  }
}

-- EMDM
{
  "bomInfo":{
    "numberOfBom":46,
    "bomList":[{
      "id":1876,
      "product":"NB",
      "project_name":"tommy-test-nb-metal",
      "project_code":"EMDM202005140150433",
      "customer":"Amanda",
      "stage_id":"2",
      "stage":"RFQ",
      "site":"WCD",
      "cost_version":"0.7",
      "create_time":"2020-07-21T01:29:30.000Z",
      "versions":[
          {
            "id":1872,
            "emdm_version":"27_202007171649",
            "cost_version_id":"ee6ebd27-b992-4433-a5b7-4c29791722c2",
            "cost_version":"0.7",
            "approve_time":null,
            "is_next_version":false
          },
      ],
      "fav_id":"962002dc-cbfd-11ea-9918-0242ac110003",
      "archive_id": null,
    }]
  }
}

 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomDatasBySearch?pages=1&items=10&orderBy=id&column=bg&keyword=CPB&role=EE&project_code=pd&project_name=kl
 */
bomManagerRouter.get('/bomDatasBySearch', authHelpers.isJWTAuthenticated, bomManagers.getBomDataBySearch)
/**
 *
 * @api {get} /bom/bomDatas/:id get bom detail info
 * @apiName bom list
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Integer} id  BomData id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "bomProject": {
        "id": 20,
        "project_name": "12345",
        "version_id": "70912932-5e4a-432f-8a86-743f580926ef",
        "version": "V0.0",
        "create_by": "10700001",
        "project_code": "10403304",
        "system_model_pn": "PN12345",
        "product_spec": "15",
        "customer": {
            "key": "123",
            "value": "123"
        },
        "product_type": {
            "key": "123",
            "value": "123"
        },
        "stage": {
            "key": "2",
            "value": "RFQ"
        },
        "site": {
            "key": "WIH",
            "value": "WIH"
        },
        "project_leader": {
            "key": "10403304",
            "value": "IAN KUO"
        },
        "approved_by": {
            "key": "10403304",
            "value": "IAN KUO"
        }
    },
    "bomDesignee": [
        {
            "id": "64813f4d-5a77-4841-a03c-63f91f3c3b9c",
            "seq": 1,
            "user": {
                "key": "10403304",
                "value": "IAN KUO"
            },
            "function_team": "",
            "isfunctionteam": false
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomDatas/1
 */
bomManagerRouter.get('/bomDatas/:id', authHelpers.isJWTAuthenticated, bomManagers.getBomDetailInfo)

/**
 *
 * @api {put} /bomDatas/:id bomData update
 * @apiName bom project Data update
 * @apiGroup BomManager
 * @apiDescription 取得bom project 內容
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} id  serial number
 * @apiParamExample  {json} Request-Example:
       {
            "bomProject": {
               "customer":"123",
                "product_type":"123",
                "stage":"RFQ",
                "project_leader":"10403304",
                "approved_by":"10403304",
                "project_code":"12345",
                "project_name":"12345",
                "site":"WIH",
                "system_model_pn":"PN12345",
                "id_cmf_data":"20181230102_FILE",
                "system_model_pn":"12345678"
                "product_spec":"15",
                "sku_desc":"THIS IS DESC"
            },
            "bomDesignee": [
                {
                    "id": "e754000f-ebd5-4443-a56d-717c3f200838",
                    "user_id": "22222",
                    "function_team_name": "",
                    "isfunctionteam": false
                },
                {
                    "id": "80dfd242-6a82-4469-9708-e730ab7f223e",
                    "user_id": "33333",
                    "function_team_name": "Tooling",
                    "isfunctionteam": true
                },
                {
                    "id": "24c697dd-d7f2-4524-b0d0-7e878cbb12c9",
                    "user_id": "666666",
                    "function_team_name": "Tooling",
                    "isfunctionteam": true
                }
            ]
        }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        id:10
    }
 *
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/bomDatas/:id/', authHelpers.isJWTAuthenticated, bomManagers.updateBomData)

/**
 *
 * @api {post} /bomDatas bomData insert
 * @apiName bom project Data insert
 * @apiGroup BomManager
 * @apiDescription 新增bom project 內容
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} id  serial number
 *
 * @apiParamExample  {json} Request-Example:
       {
            "bomProject":{
                "customer":"123",
                "product_type":"123",
                "stage":"RFQ",
                "project_leader":"10403304",
                "approved_by":"10403304",
                "project_code":"12345",
                "project_name":"12345",
                "site":"WIH",
                "system_model_pn":"PN12345",
                "id_cmf_data":"20181230102_FILE",
                "product_spec":"15",
                "sku_desc":"THIS IS DESC"
            },
            "bomDesignee":[{
                    "user_id":"22222",
                    "function_team_name":""
                },{
                    "user_id":"33333",
                    "function_team_name":"Tooling"
                }
            ]
        }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
    {
        id:10
    }
 *
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/bomDatas/ME
 */
bomManagerRouter.post('/bomDatas', authHelpers.isJWTAuthenticated, bomManagers.insertBomData)

/**
 *
 * @api {get} /bom/bomFilterType?role=ME get filter type
 * @apiName bomFilterType
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    {
        "key": "Customer",
        "value": "customer"
    },
    {
        "key": "Product",
        "value": "product_type"
    },
    {
        "key": "Stage",
        "value": "stage_id"
    },
    {
        "key": "ProjectLeader",
        "value": "project_leader"
    }
]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest bom/bomFilterType?role=ME
 */

/**
 *
 * @api {get} /bom/bomFilterType?role=EE get ee filter type
 * @apiName EEbomFilterType
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    {
        "key": "product_type",
        "value": "product_type"
    },
    {
        "key": "sku",
        "value": "sku"
    }
  ]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest bom/bomFilterType?role=EE
 */
bomManagerRouter.get('/bomFilterType/', authHelpers.isJWTAuthenticated, bomManagers.getBomFilterType)

/**
 *
 * @api {get} /bom/bomFilterType/:filter?role=ME get filter value
 * @apiName bomFilterValue
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "res": [
        "CPBG",
        "CPBGE",
        "CPBGEV"
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomFilterType/bg?role='ME'
 */

/**
 *
 * @api {get} /bom/bomFilterType/:filter?role=EE get EE filter value
 * @apiName EEbomFilterValue
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "res": [
        "CPBG",
        "CPBGE",
        "CPBGEV"
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomFilterType/product_type?role='ME'
 */

bomManagerRouter.get('/bomFilterType/:column', authHelpers.isJWTAuthenticated, bomManagers.getBomFilterItems)

// bomManagerRouter.put('/bomDatasStage/:bomId', authHelpers.isJWTAuthenticated, bomManagers.getBomFilterItems)


/**
 *
 * @api {get} /bom/bomBaseData get create bom basic value
 * @apiName bomFilterValue
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
   "customer": [
       {
           "key": "ACA DIGITAL",
           "value": "ACA DIGITAL"
       },
       {
           "key": "ACCORDANCE",
           "value": "ACCORDANCE"
       },
       {
           "key": "ACCTON",
           "value": "ACCTON"
       },
       {
           "key": "ADAM",
           "value": "ADAM"
       },
       {
           "key": "ADATA",
           "value": "ADATA"
       },
       {
           "key": "AG NEOVO",
           "value": "AG NEOVO"
       },
       {
           "key": "AIRO WIRELESS",
           "value": "AIRO WIRELESS"
       },
       {
           "key": "AIRVANA",
           "value": "AIRVANA"
       },
       {
           "key": "ALCATEL",
           "value": "ALCATEL"
       },
       {
           "key": "ALPHA",
           "value": "ALPHA"
       },
       {
           "key": "AMD Inc.",
           "value": "AMD Inc."
       },
   ],
   "productType": [
       {
           "key": "Board/Card",
           "value": "Board/Card"
       },
       {
           "key": "Board_Card",
           "value": "Board_Card"
       },
       {
           "key": "Control Unit",
           "value": "Control Unit"
       },
       {
           "key": "Control.Unit",
           "value": "Control.Unit"
       },
       {
           "key": "Cradle/Docking",
           "value": "Cradle/Docking"
       },
       {
           "key": "Cradle_Docking",
           "value": "Cradle_Docking"
       },
       {
           "key": "Desktop Computer/AIO",
           "value": "Desktop Computer/AIO"
       },
       {
           "key": "Desktop.Computer_AIO",
           "value": "Desktop.Computer_AIO"
       },
   ],
   "stage": [
       {
           "key": 1,
           "value": "RFI"
       },
       {
           "key": 2,
           "value": "RFQ"
       },
       {
           "key": 3,
           "value": "TSR"
       },
       {
           "key": 4,
           "value": "ENG1"
       },
       {
           "key": 5,
           "value": "ENG2"
       },
       {
           "key": 6,
           "value": "PD"
       },
       {
           "key": 7,
           "value": "MP"
       }
   ],
   "site": [
        {
            "key": "WCD",
            "value": "WCD"
        },
        {
            "key": "WCQ",
            "value": "WCQ"
        },
        {
            "key": "WIH",
            "value": "WIH"
        },
        {
            "key": "WKS",
            "value": "WKS"
        },
        {
            "key": "WZS",
            "value": "WZS"
        }
    ],
    "functionTeamName": [
        {
            "key": "Thermal",
            "value": "Thermal"
        },
        {
            "key": "Tooling",
            "value": "Tooling"
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /bom/bomBaseData
 */
bomManagerRouter.get('/bomBaseData', authHelpers.isJWTAuthenticated, bomManagers.getCreateBomBaseData)

bomManagerRouter.get('/bomBaseData/user/:type', authHelpers.isJWTAuthenticated, users.getUserByType)

/**
*
* @api {post} /bom/upload image upload
* @apiName image upload
* @apiGroup BomManager
* @apiDescription update image to db and return base64 data and image id to front-end
* @apiHeader {String} Authorization Bearer access-token
*
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     upload success
        {
                "id": "image id",
                "data":"image base64 data"
        }
*
* @apiError 500 Update Failed.
* @apiError 500 Internal Server Error.
* @apiError 413 Image Oversize
*
*/
bomManagerRouter.post('/upload/', authHelpers.isJWTAuthenticated, bomManagers.uploadImage)
/**
 *
 * @api {post} /bom/item bomItem create
 * @apiName bom item create
 * @apiGroup BomManager
 * @apiDescription 新增bom item 內容
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
    "product_type_id": 1,
    "product_type_name": 'nb',
    "bom_id": 21,
    "customer_pn":"一開始不一定存在",
    "level":"DC/65",
    "sub_leve": false,
    "parent_level": "32",
    "part_name":"N0",
    "qty":1,
    "func_ctgy":"48bb3134-43a9-11e9-b34d-0242ac110002",
    "parts_ctgy_1":"69af7322-43d7-11e9-b34d-0242ac110002",
    "parts_ctgy_2":"7eeb2b00-43d7-11e9-b34d-0242ac110002",
    "material_spec":"48bb3134-43a9-11e9-b34d-0242ac110002",
    "supply_type":"a6560172-43cf-11e9-b34d-0242ac110002",
    "part_size_l":1.1,
    "part_size_w":2.1,
    "part_size_h":3.1,
    "part_size_ef":4.1,
    "part_size_l2":5.1,
    "part_size_w2":6.1,
    "thickness":7.1,
    "part_weight":8.1,
    "sku0":"1",
    "sku1":"1",
    "sku2":"1",
    "sku3":"1",
    "sku4":"1",
    "sku5":"1",
    "initaddmodidel":"0dab4b52-8106-11e9-9d03-0242ac110002",
    "part_number":"460.0GG0N.0001",
    "odm_oem":"7e9a2be0-8105-11e9-9d03-0242ac110002",
    }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "id": 109
    }
 ]
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/item', authHelpers.isJWTAuthenticated, itemCtrller.createItem.bind(itemCtrller))


/**
 *
 * @api {put} /bom/item/{id} bomItem update
 * @apiName bom item update
 * @apiGroup BomManager
 * @apiDescription 修改bom item 內容
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} id  serial number bom item id
 * @apiParamExample  {json} Request-Example:
 * {
    "product_type_id": 1,
    "product_type_name": 'nb',
    "bom_id": 21,
    "customer_pn":"一開始不一定存在",
    "level":"DC/65",
    "sub_leve": false,
    "has_child": false,
    "parent_level": "32",
    "part_name":"N0",
    "qty":1,
    "func_ctgy":"48bb3134-43a9-11e9-b34d-0242ac110002",
    "parts_ctgy_1":"69af7322-43d7-11e9-b34d-0242ac110002",
    "parts_ctgy_2":"7eeb2b00-43d7-11e9-b34d-0242ac110002",
    "material_spec":"48bb3134-43a9-11e9-b34d-0242ac110002",
    "supply_type":"a6560172-43cf-11e9-b34d-0242ac110002",
    "part_size_l":1.1,
    "part_size_w":2.1,
    "part_size_h":3.1,
    "part_size_ef":4.1,
    "part_size_l2":5.1,
    "part_size_w2":6.1,
    "thickness":7.1,
    "part_weight":8.1,
    "sku0":"1",
    "sku1":"1",
    "sku2":"1",
    "sku3":"1",
    "sku4":"1",
    "sku5":"1",
    "initaddmodidel":"0dab4b52-8106-11e9-9d03-0242ac110002",
    "ref_part_num": "460.0GG0N.0001",
    "part_number":"460.0GG0N.0001",
    "odm_oem":"7e9a2be0-8105-11e9-9d03-0242ac110002",
    "need_tooling": false,
    }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "id": 109
    }
 ]
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/item/:id', authHelpers.isJWTAuthenticated, itemCtrller.putItem.bind(itemCtrller))

/**
 *
 * @api {get} /bom/dropdownvalue get bomItem dropdown items val
 * @apiName bom item dropdown values
 * @apiGroup BomManager
 * @apiDescription 取的bom item下拉選單內容
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "id": "a65a7478-43cf-11e9-b34d-0242ac110002",
        "item_name": "CoSign",
        "path": "CONSIGN",
        "field_name": "supply_type",
        "layout_name": "bom_item"
    },
    {
        "id": "48b79de4-43a9-11e9-b34d-0242ac110002",
        "item_name": "ME",
        "path": "ME",
        "field_name": "func_ctgy",
        "layout_name": "bom_item"
    }]
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/dropdownvalue/:productType', authHelpers.isJWTAuthenticated, itemCtrller.getDropDownVal.bind(itemCtrller))


/**
 *
 * @api {get} /bom/parentlevel?level=4&bom_id=21&item_id=164 get parent node by the level
 * @apiName get parents node by level
 * @apiGroup BomManager
 * @apiDescription 取得對應level的node
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} level serial number
 * @apiParam  {String} bom_id bom project id
 * @apiParam  {String} item_id when edit bom item id / null when create bom item
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 [
    {
        "id": 86,
        "part_name": "N0",
        "path": "85.86"
    },
    {
        "id": 84,
        "part_name": "N0",
        "path": "82.84"
    }
]
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */

bomManagerRouter.get('/parentlevel', authHelpers.isJWTAuthenticated, itemCtrller.getParentLevel.bind(itemCtrller))

/**
 *
 * @api {get} /bom/getPartCategoryByReferencePartNumber/:partNumber get part category by reference partNumber
 * @apiName get part category by reference partNumber
 * @apiGroup BomManager
 * @apiDescription 用料號取得系統中的part_ctgy_1 及 part_ctgy_2
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} partNumber
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "parts_ctgy_1": "6942ff04-55d8-11e9-b564-0242ac110002",
    "parts_ctgy_2": null,
    "part_name": "KR_13_2N1_SSD_BKT",
    "error_code": "C000304"
}
 * @apiError 401 Unauthorized
 * @apiError 500 Internal Server Error.
 */

bomManagerRouter.get('/getPartCategoryByReferencePartNumber/:partNumber', authHelpers.isJWTAuthenticated, itemCtrller.getPartCategoryByReferencePartNumber.bind(itemCtrller))

/**
 *
 * @api {get} /bom/:bomID/bomAssignList bom assignment list
 * @apiName ME input bom assignment list
 * @apiGroup BomManager
 * @apiDescription 拿到 這個bom 被assign 的人清單
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "approvalAble": false,
    "completeAble": false,
    "assignList":[{
        "bomDesigneeID": "abcde",
        "isFunctionTeam": false,
        "assign":"ME",
        "order": 1,
        "employeeName": "Allan Zhang",
        "employeeID":"10101011",
        "tabOwner": false,
      },
      {
        "bomDesigneeID": "abcd2",
        "isFunctionTeam": false,
        "assign":"ME",
        "order": 2,
        "employeeName": "Alexander Perez",
        "employeeID":"10101012",
        "tabOwner": false,
      },
      {
        "bomDesigneeID": "abcd3",
        "isFunctionTeam": true,
        "assign":"Thermal",
        "order": null,
        "employeeName": "Alfred Wu",
        "employeeID":"10101013",
        "tabOwner": false,
      },
      {
        "bomDesigneeID": "abcd4",
        "isFunctionTeam": true,
        "assign":"Tooling",
        "order": null,
        "employeeName": "Alisa XP Li",
        "employeeID":"10101014",
        "tabOwner": true,
      },
    ]
  }

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/:bomID/bomAssignList', authHelpers.isJWTAuthenticated, bomItem.getBomAssignList)

/**
 *
 * @api {post} /bom/spacerate/export/bysearch
 * @apiName All bon space rate summary Export
 * @apiGroup BomManager
 * @apiDescription 空格率總表
 * @apiHeader {String} Authorization Bearer access-token.
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名 Eprocurement_BOM_SpaceRate_report_<date:YYYYmmdd>
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 400 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/spacerate/export/bysearch
 */
bomManagerRouter.post('/spacerate/export/bysearch', authHelpers.isJWTAuthenticated, bomManagers.spaceRateExportBySearch)

/**
 *
 * @api {post} /bom/:bomID/export/:sku Export Me Bom Export
 * @apiName Me Bom Export
 * @apiGroup BomManager
 * @apiDescription 輸出Me Bom Result
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 * @apiParam  {String} sku user chose which sku number
 *
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "versionid": a4daa2f2-a076-4316-93ee-b886d3057097,
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名 Eprocurement_BOM_ME_<Project_Name>_<date:YYYYmmdd>
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/92/export/sku3
 */
bomManagerRouter.post('/:bomID/export/:sku', authHelpers.isJWTAuthenticated, bomManagers.exportMeBom)
bomManagerRouter.get('/wsd/export', authHelpers.isJWTAuthenticated, bomManagers.exportWsdBom)

/**
 *
 * @api {get} /bom/spacerate/export/filterType
 * @apiName All bon space rate drop down
 * @apiGroup BomManager
 * @apiDescription 空格率查詢下拉
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} [product] product type name EX: 'NB'
 * @apiParam  {String} [customer] customer name EX: 'Rosa'
 * @apiParam  {String} [stage] customer name EX: 'WCQ'
 * @apiParam  {String} [after] projects after date(包含當天) EX: '2020-05-07'
 * @apiParam  {String} [before] projects before date(包含當天) EX: '2020-09-18'
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "product":["NB", "DT"],
    "customer":["ACA", "ADATA"],
    "stage":["WCQ", "WIH"],
    "count": 12,
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 400 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/spacerate/export/filterType
 */
bomManagerRouter.get('/spacerate/export/filterType', authHelpers.isJWTAuthenticated, bomManagers.spaceRateFilterBy)

/**
 *
 * @api {get} /bom/copylist/byproject Get Copy Project List
 * @apiName Emdm Get Copy Project List
 * @apiGroup BomManager
 * @apiDescription 輸出 Emdm 可複製專案列表
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "projectList": [
            {
            "bom_id": 456455,
            "label": "R-CREATOR7(QRQY00001113)",
            },
            {
            "bom_id": 456456,
            "label": "R-CREATOR8(QRQY00001115)",
            },
            {
            "bom_id": 456457,
            "label": "R-CREATOR9(QRQY00001117)",
            }
        ]
    }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/copylist/byproject
 */
bomManagerRouter.get('/copylist/byproject', authHelpers.isJWTAuthenticated, bomManagers.getCopyVersionByProject)
/**
 *
 * @api {get} /bom/copylist/:bom_id Get Copy Version List
 * @apiName Emdm Get Copy Version List
 * @apiGroup BomManager
 * @apiDescription 輸出 Emdm 可複製版本列表
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "copyList": [
            {
                "bom_id": 456455,
                "label": "89_202002111058 -- Cost 2.0",
                "stage": "ENG1"
            },
            {
                "bom_id": 456456,
                "label": "90_202002111058 -- Cost 2.0",
                "stage": "ENG2"
            },
            {
                "bom_id": 456457,
                "label": "91_202002111058 -- Cost 2.0",
                "stage": "ENG2"
            }
        ]
    }
 *
 * @apiError 400 param or user product permission incorrect.
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/copylist/92
 */
bomManagerRouter.get('/copylist/:bom_id', authHelpers.isJWTAuthenticated, bomManagers.getCopyVersionList)
/**
 *
 * @api {post} /bom/approve me/meee approve bom
 * @apiName approve bom
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "bomID": 123123,
 * }
 *
 * @apiSuccessExample {json} Success-Response:
  {

  }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/approve', authHelpers.isJWTAuthenticated, bomManagers.bomApproval)

/**
 *
 * @api {post} /bom/complete me/meee bom version complete
 * @apiName bom version complete
 * @apiGroup BomManager
 * @apiDescription complete and change bom version
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *
  {
    "bomID": 123124,
  }
 *
 * @apiSuccessExample {json} Success-Response:
  {

  }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/complete', authHelpers.isJWTAuthenticated, bomManagers.bomComplete)



/**
 *
 * @api {get} /bom/partlist/:part_type/:bom_id get all partlist by bom id
 * @apiName bom partlist get
 * @apiGroup BomManager
 * @apiDescription list part list by bom id
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} bom_id bom id
 * @apiParam  {String} part_type part type name, ex: thermal-module
 * @apiSuccessExample {json} Success-Response:
  [
    {
        "id": "cae3bab4-46e7-11e9-91ea-0242ac110002",
        "partlist_value": "{\"value\":\"您就假裝當做這有值\"}",
        "bom_item_id": 90,
        "update_time": "2019-03-15T05:55:23.820Z",
        "create_time": "2019-03-15T05:55:23.820Z"
    }
    ]
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/partlist/:bom_id', authHelpers.isJWTAuthenticated, partList.getPartList)
/**
 * 20200115 此API經前端確認 目前無使用
 * @api {put} /bom/partlist/:partlist_id update partlist by partlist_id
 * @apiName bom partlist update
 * @apiGroup BomManager
 * @apiDescription update part list by partlist_id id
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} partlist_id partlist id

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
// bomManagerRouter.put('/partlist/:part_type/:bom_id', authHelpers.isJWTAuthenticated, partList.updatePartList)

/**
 *
 * @api {get} /bom/partlistlayout/:partlistname/:product_type_id/:product_type_name get Bom partlist layout
 * @apiName get Bom partlist layout by product type
 * @apiGroup BomManager
 * @apiDescription get Bom partlist layout by partlistname and product_type_id
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} partlistname partlistname
 * @apiParam  {Number} product_type_id product type id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "version": 2,
    "layout": [
        {
            "key": "thermal-module",
            "group": [
                "thermalModule"
            ],
            "label": "default",
            "visiable": false,
            "fieldType": "tab",
            "items": [
                {
                    "key": "Fan",
                    "fieldType": "composite",
                    "multiple": true,
                    "items": [
                        {
                            "key": "fanLabel",
                            "label": "Fan",
                            "fieldType": "label",
                            "editable": true,
                            "dataType": "string",
                            "multiple": false,
                            "require": false,
                            "constrains": [],
                            "default": "Fan",
                            "needExe": true,
                            "level": 2,
                            "switchable": false,
                            "maxGroupCount": null,
                            "visiable": true,
                            "displayConfig": {
                                "display": true,
                                "grids": 3
                            },
                            "emdmMultipleKey": "emdmBomInfo.cmfForm.fan",
                            "emdmKey": "fanLabel"
                        }, ...
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/partlistlayout/:partlistname/:product_type_id/:product_type_name/:bom_id', authHelpers.isJWTAuthenticated, partList.getPartListLayout)
bomManagerRouter.get('/partlistlayout/:partlistname/:product_type_id/:product_type_name/', authHelpers.isJWTAuthenticated, partList.getPartListLayout)

/**
 * 用於不需要product type的partlistlayout  ex： pcb
 * @api {get} /bom/partlistlayout/:partlistname get Bom partlist layout
 * @apiName get Bom partlist layout
 * @apiGroup BomManager
 * @apiDescription get Bom partlist layout by partlistname and product_type_id
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} partlistname partlistname
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "version": 2,
    "layout": [
        {
            "key": "thermal-module",
            "group": [
                "thermalModule"
            ],
            "label": "default",
            "visiable": false,
            "fieldType": "tab",
            "items": [
                {
                    "key": "Fan",
                    "fieldType": "composite",
                    "multiple": true,
                    "items": [
                        {
                            "key": "fanLabel",
                            "label": "Fan",
                            "fieldType": "label",
                            "editable": true,
                            "dataType": "string",
                            "multiple": false,
                            "require": false,
                            "constrains": [],
                            "default": "Fan",
                            "needExe": true,
                            "level": 2,
                            "switchable": false,
                            "maxGroupCount": null,
                            "visiable": true,
                            "displayConfig": {
                                "display": true,
                                "grids": 3
                            },
                            "emdmMultipleKey": "emdmBomInfo.cmfForm.fan",
                            "emdmKey": "fanLabel"
                        }, ...
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/partlistlayout/:partlistname/', authHelpers.isJWTAuthenticated, partList.getPartListLayout)

/**
 *
 * @api {get} /bom/partlist/getInfo/:bom_id/:type1/:type2/:key partlist default data
 * @apiName bom partlist get partlist default data
 * @apiGroup BomManager
 * @apiDescription get partlist default data
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} bom_id bom item id
 * @apiParam  {String} type1 type1 name, ex: Housing
 * @apiParam  {String} type2 type2 name, ex: Metal
 * @apiParam  {String} key you want to search key, ex: partName
 * @apiParam  {String} item partlist housing-metal item column value
 * @apiParam  {String} value if you search thickness, the value will return
 * @apiParamExample  {json} Request-Example:
 * {
 *    "versionid": a4daa2f2-a076-4316-93ee-b886d3057097,
 * }
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "item": "M749387ab-c0ef-4b00-8df7-e498fb2354cf",
    "value": {
        "thickness": "0.5"
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getInfo/:version/:bom_id/:type1/:type2/:key', partList.getDefaultData)


/**
 *
 * @api {get} /bom/partlist/getDieInfo/:stageDie/:progressiveDie/:rivetingDie 取得工程模具型式以及總工程數
 * @apiName bom partlist 取得工程模具型式以及總工程數
 * @apiGroup BomManager
 * @apiDescription get 取得工程模具型式以及總工程數
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} stageDie 工程模
 * @apiParam  {String} progressiveDie 連續模
 * @apiParam  {String} rivetingDie 鉚合模
 * @apiSuccessExample {json} Success-Response:
{
    "total": 40,
    "moduleType": "連續模+工程模"
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getDieInfo/:hmToolingStageDieCount/:hmToolingProgressiveDieCount/:hmToolingRivetingDieCount', partList.getDieInfo)


/**
 * @api {get} /bom/partlist/getMaterialExpandSize/:hmpartsexpandwidth/:hmpartsexpandlength/:hmToolingMaterialWidth/:hmToolingMaterialLength 取得素材展開尺寸
 * @apiName bom partlist 取得素材展開尺寸
 * @apiGroup BomManager
 * @apiDescription get 取得素材展開尺寸
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingMaterialExpandWidth 取得素材展開尺寸 寬度
 * @apiParam  {String} hmToolingMaterialExpandLength 取得素材展開尺寸 長度
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingMaterialExpandWidth": 30,
        "hmToolingMaterialExpandLength": 35
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getMaterialExpandSize/:hmpartsexpandwidth/:hmpartsexpandlength/:hmToolingMaterialWidth/:hmToolingMaterialLength', partList.getMaterialExpandSize)
/**
 * @api {get} /bom/partlist/netWeight/:hmthickness/:hmpartsexpandwidth/:hmpartsexpandlength/:hmmaterial 取得淨重
 * @apiName bom partlist 取得淨重
 * @apiGroup BomManager
 * @apiDescription get 取得淨重
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingWeight 淨重
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingWeight": 2.75
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/netWeight/:hmthickness/:hmpartsexpandwidth/:hmpartsexpandlength/:hmmaterial', partList.getNetWeight)



/**
 * @api {get} /bom/partlist/grossWeight/:hmthickness/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength/:hmmaterial 取得毛重
 * @apiName bom partlist 取得毛重
 * @apiGroup BomManager
 * @apiDescription get 取得毛重
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingMaterialWeight 毛重
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingMaterialWeight": 2.75
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/grossWeight/:hmthickness/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength/:hmmaterial', partList.getGrossWeight)


/**
 * @api {get} /bom/partlist/stageDiePress/:hmToolingStageDieCount/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength 取得工程模沖壓機台噸數及機台費
 * @apiName bom partlist 取得工程模沖壓機台噸數及機台費
 * @apiGroup BomManager
 * @apiDescription get 取得工程模沖壓機台噸數及機台費
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingStageDiePress 工程模沖壓機台噸數
 * @apiParam  {String} Bolster_Area 沖壓面積
 * @apiParam  {String} Die_Height 高度
 * @apiParam  {String} hmToolingStageDieModuleCost 機台費
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingStageDiePress": "60T",
        "Bolster_Area": "900mm*500mm",
        "Die_Height": "300mm",
        "hmToolingStageDieModuleCost": 0.0099
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/stageDiePress/:hmToolingStageDieCount/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength/:hmToolingProgressiveDieStation', partList.getStageDiePress)

/**
 * @api {get} /bom/partlist/progressiveDiePress/:hmToolingProgressiveDieCount/:hmToolingProgressiveDieStation/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength 取得連續模沖壓機台噸數及機台費
 * @apiName bom partlist 取得連續模沖壓機台噸數及機台費
 * @apiGroup BomManager
 * @apiDescription get 取得連續模沖壓機台噸數及機台費
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingProgressiveDiePress 連續模沖壓機台噸數
 * @apiParam  {String} Bolster_Area 沖壓面積
 * @apiParam  {String} Die_Height 高度
 * @apiParam  {String} hmToolingProgressiveDieModuleCost 機台費
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingProgressiveDiePress": "60T",
        "Bolster_Area": "900mm*500mm",
        "Die_Height": "300mm",
        "hmToolingProgressiveDieModuleCost": 0.0099
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/progressiveDiePress/:hmToolingProgressiveDieCount/:hmToolingProgressiveDieStation/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength', partList.getProgressiveDiePress)


/**
 * @api {get} /bom/partlist/rivetingDiePress/:hmToolingRivetingDieCount/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength 取得鉚合模沖壓機台噸數及機台費
 * @apiName bom partlist 取得鉚合模沖壓機台噸數及機台費
 * @apiGroup BomManager
 * @apiDescription get 取得鉚合模沖壓機台噸數及機台費
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingRivetingDiePress 鉚合模沖壓機台噸數
 * @apiParam  {String} Bolster_Area 沖壓面積
 * @apiParam  {String} Die_Height 高度
 * @apiParam  {String} hmToolingRivetingDieModuleCost 機台費
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingRivetingDiePress": "60T",
        "Bolster_Area": "900mm*500mm",
        "Die_Height": "300mm",
        "hmToolingRivetingDieModuleCost": 0.0099
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/rivetingDiePress/:hmToolingRivetingDieCount/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength/:hmToolingProgressiveDieStation', partList.getRivetingDiePress)


/**
 * @api {get} /bom/partlist/getGlueWeight/:cmfProcessListThermalBondingPathLength/:cmfProcessListThermalBondingGlueSyringeDiameter 取得膠水重量
 * @apiName bom partlist 取得膠水重量
 * @apiGroup BomManager
 * @apiDescription get 取得膠水重量
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} cmfProcessListThermalBondingGlueWeight 取得膠水重量
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "cmfProcessListThermalBondingGlueWeight": 76.18379999999999
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getGlueWeight/:productType/:cmfProcessListThermalBondingPathLength/:cmfProcessListThermalBondingGlueSyringeDiameter', partList.getGlueWeight)


/**
 * @api {get} /bom/partlist/getCmfPaintingMachineType/:projectCode/:emdmVersion/:emdmppid 取得噴塗製程/塗裝噴漆的機台類型
 * @apiName bom partlist getCmfPaintingMachineType 取得噴塗製程/塗裝噴漆的機台類型
 * @apiGroup BomManager
 * @apiDescription get 取得噴塗製程/塗裝噴漆的機台類型
 * @apiParam  {String} emdmVersion eMDM的partlist version
 * @apiParam  {String} projectCode eMDM的partlist projectCode
 * @apiParam  {String} emdmppid eMDM的partlist partlist Id
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "cmfPaintingMachineType": "Robert"
    }
}
// 查不到回傳空字串
{
    "values": {
        "cmfPaintingMachineType": ""
    }
}
 *
 * @apiError 400 Bad Request (取得超過一筆資料，也會回傳400)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getCmfPaintingMachineType/:projectCode/:emdmVersion/:emdmppid', partList.getCmfPaintingMachineType)


/**
 * @api {get} /bom/partlist/cmfPaintingCycleTime/:projectCode/:emdmVersion/:emdmppid 取得噴塗CycleTime
 * @apiName bom partlist cmfPaintingCycleTime 取得噴塗CycleTime
 * @apiGroup BomManager
 * @apiDescription get 取得噴塗CycleTime
 * @apiParam  {String} emdmVersion eMDM的partlist version
 * @apiParam  {String} projectCode eMDM的partlist projectCode
 * @apiParam  {String} emdmppid eMDM的partlist partlist Id
 * @apiSuccess {String}  values.cmfPaintingCycleTime 噴塗CycleTime
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "cmfPaintingCycleTime": "120"
    }
}
// 查不到回傳空字串
{
    "values": {
        "cmfPaintingMachineType": ""
    }
}
 *
 * @apiError 400 Bad Request (取得超過一筆資料，也會回傳400)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/cmfPaintingCycleTime/:projectCode/:emdmVersion/:emdmppid', partList.getCmfPaintingCycleTime)

/**
 * @api {get} /bom/partlist/hmToolingMaterialExpand/:projectCode/:emdmVersion/:emdmppid/:sizeL/:sizeW/:partCategory2Id/:productTypeId
 * @apiName bom partlist hmToolingMaterialExpand 取得素材展開尺寸
 * @apiGroup BomManager
 * @apiDescription get 取得取得素材展開尺寸
 * @apiParam  {String} emdmVersion eMDM的partlist version
 * @apiParam  {String} projectCode eMDM的partlist projectCode
 * @apiParam  {String} emdmppid eMDM的partlist partlist Id
 * @apiParam  {number} sizeL 成品展開L
 * @apiParam  {number} sizeW 成品展開W
 * @apiParam  {string} partCategory2Id Parts Category II ID
 * @apiParam  {number} productTypeId Product Type ID
 * @apiSuccessExample {json} Success-Response:
{
  "values":{
    "edgeMaterialSizeLength": 10 // 邊料尺寸 L
    "hmToolingMaterialExpandLength": 150 // 素材展開尺寸 L
    "edgeMaterialSizeWidth": 10 // 邊料尺寸 W
    "hmToolingMaterialExpandWidth": 170 // 素材展開尺寸 W
  }
}
 *
 * @apiError 400 Bad Request
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/partlist/hmToolingMaterialExpand/EMDM20200601131322/21/d25b83c0-1ecf-49c0-b7c5-d5bb576504ee/10/10/69431458-55d8-11e9-b564-0242ac110002/1
 */
bomManagerRouter.get('/partlist/hmToolingMaterialExpand/:projectCode/:emdmVersion/:emdmppid/:sizeL/:sizeW/:partCategory2Id/:productTypeId', partList.getHmToolingMaterialExpand)


/**
 * @api {get} /bom/partlist/cmfPaintingAreaInfo/:projectCode/:emdmVersion/:emdmppid 取得partlist噴漆面頂面數, 長側面數, 短側面數
 * @apiName bom partlist cmfPaintingAreaInfo 取得partlist噴漆面頂面數, 長側面數, 短側面數
 * @apiGroup BomManager
 * @apiDescription get 取得partlist噴漆面頂面數, 長側面數, 短側面數
 * @apiParam  {String} emdmVersion eMDM的partlist version
 * @apiParam  {String} projectCode eMDM的partlist projectCode
 * @apiParam  {String} emdmppid eMDM的partlist partlist Id
 * @apiSuccess {String}  values.cmfPaintingAreaLW 噴漆面 頂面數
 * @apiSuccess {String}  values.cmfPaintingAreaLH 噴漆面 長側面數
 * @apiSuccess {String}  values.cmfPaintingAreaWH 噴漆面 短側面數
 * @apiError 400__NO_RESULT_ERROR 給定的參數找不到任何資訊
 * @apiError 400__PARSING_ERROR 系統錯誤
 * @apiError 400__NOT_UNIQUE_ERROR 給定的參數找到多筆資訊
 * @apiError 400__BadRequest 其他錯誤
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "cmfPaintingAreaLW": "0",
        "cmfPaintingAreaLH": "1",
        "cmfPaintingAreaWH": "2",
    }
}
 *
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getCmfPaintingAreaInfo/:projectCode/:emdmVersion/:emdmppid', partList.getCmfPaintingAreaInfo)



/**
 * @api {get} /partlist/getToolingMaterialInfo/:projectCode/:emdmVersion/:emdmppid 取得partlist邊料尺寸
 * @apiName bom partlist getToolingMaterialInfo 取得partlist邊料尺寸
 * @apiGroup BomManager
 * @apiDescription get 取得partlist取得partlist邊料尺寸
 * @apiParam  {String} emdmVersion eMDM的partlist version
 * @apiParam  {String} projectCode eMDM的partlist projectCode
 * @apiParam  {String} emdmppid eMDM的partlist partlist Id
 * @apiSuccess {String}  values.toolingMaterialWidth 邊料尺寸 -W
 * @apiSuccess {String}  values.toolingMaterialLength 邊料尺寸 -L
 * @apiError 400__NO_RESULT_ERROR 給定的參數找不到任何資訊
 * @apiError 400__PARSING_ERROR 系統錯誤
 * @apiError 400__NOT_UNIQUE_ERROR 給定的參數找到多筆資訊
 * @apiError 400__BadRequest 其他錯誤
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "toolingMaterialWidth": 5,
        "toolingMaterialLength": 5,
    }
}
 *
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getToolingMaterialInfo/:projectCode/:emdmVersion/:emdmppid', partList.getToolingMaterialInfo)




/**
 * @api {get} /bom/partlist/confirm/:type2 確認type2是否為Double_Injection,並且拿到material下拉選單內容
 * @apiName bom partlist 確認type2是否為Double_Injection,並且拿到material下拉選單內容
 * @apiGroup BomManager
 * @apiDescription get 確認type2是否為Double_Injection,並且拿到material下拉選單內容
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hpmaterial2 material下拉選單內容
 * @apiSuccessExample {json} Success-Response:
{
    "values": [
        {
            "hpmaterial2": "PC"
        },
        {
            "hpmaterial2": "PC_with_25percent_PCR"
        },
        {
            "hpmaterial2": "PC_with_30percent_PCR"
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/confirm/:type2', partList.confirm)


/**
 * @api {get} /bom/partlist/getPartWeightEnable/:type2 確認欄位是否能填寫
 * @apiName bom partlist 確認欄位是否能填寫
 * @apiGroup BomManager
 * @apiDescription get 確認欄位是否能填寫
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} values 是否能填寫
 * @apiSuccessExample {json} Success-Response:
{
    "values": false
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getPartWeightEnable/:type2', partList.getPartWeightEnable)


/**
 * @api {get} /bom/partlist/machineTon/:type2/:hpToolingSizeWidth/:hpToolingSizeLength/:hpToolingSizeHigh 取得plastic機台噸數
 * @apiName bom partlist 取得plastic機台噸數
 * @apiGroup BomManager
 * @apiDescription get 取得plastic機台噸數
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hpToolingMachineTon plastic機台噸數
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hpToolingMachineTon": "850T"
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/machineTon/:type2/:hpToolingSizeWidth/:hpToolingSizeLength/:hpToolingSizeHigh', partList.getMachineTon)



/**
 * @api {get} /bom/partlist/getPaintingColor/:cmfPPaintingType 取得plastic painting type為uv painting時的顏色種類
 * @apiName bom partlist 取得plastic painting type為uv painting時的顏色種類
 * @apiGroup BomManager
 * @apiDescription get 取得plastic painting type為uv painting時的顏色種類
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} cmfPPaintingColor 顏色種類
 * @apiSuccessExample {json} Success-Response:
{
    "values": [
        {
            "cmfPPaintingType": "PU底漆",
            "cmfPPaintingTypeYield": 0.9,
            "cmfPPaintingTypeLoss": 0.05,
            "cmfPPaintingPreprocessor": 5,
            "cmfPPaintingGrinder": 3,
            "cmfPPaintingPainter": 3,
            "cmfPPaintingValidator": 3,
            "cmfPPaintingLaborCost": 0.04,
            "cmfPPaintingVendor": "Akzo",
            "cmfPPaintingColor": null,
            "cmfPPaintingPrice": 9.72
        },
        {
            "cmfPPaintingType": "PU底漆",
            "cmfPPaintingTypeYield": 0.9,
            "cmfPPaintingTypeLoss": 0.05,
            "cmfPPaintingPreprocessor": 5,
            "cmfPPaintingGrinder": 3,
            "cmfPPaintingPainter": 3,
            "cmfPPaintingValidator": 3,
            "cmfPPaintingLaborCost": 0.04,
            "cmfPPaintingVendor": "东端",
            "cmfPPaintingColor": null,
            "cmfPPaintingPrice": 8.05
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getPaintingColor/:cmfPPaintingType', partList.getPaintingColor)


/**
 * @api {get} /bom/partlist/getPaintingVendor/:cmfPPaintingType 取得塗料廠商
 * @apiName bom partlist 取得塗料廠商
 * @apiGroup BomManager
 * @apiDescription get 取得塗料廠商
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} cmfPPaintingVendor 塗料廠商
 * @apiSuccessExample {json} Success-Response:
{
    "values": [
        {
            "cmfPPaintingType": "PU底漆",
            "cmfPPaintingTypeYield": 0.9,
            "cmfPPaintingTypeLoss": 0.05,
            "cmfPPaintingPreprocessor": 5,
            "cmfPPaintingGrinder": 3,
            "cmfPPaintingPainter": 3,
            "cmfPPaintingValidator": 3,
            "cmfPPaintingLaborCost": 0.04,
            "cmfPPaintingVendor": "Akzo",
            "cmfPPaintingColor": null,
            "cmfPPaintingPrice": 9.72
        },
        {
            "cmfPPaintingType": "PU底漆",
            "cmfPPaintingTypeYield": 0.9,
            "cmfPPaintingTypeLoss": 0.05,
            "cmfPPaintingPreprocessor": 5,
            "cmfPPaintingGrinder": 3,
            "cmfPPaintingPainter": 3,
            "cmfPPaintingValidator": 3,
            "cmfPPaintingLaborCost": 0.04,
            "cmfPPaintingVendor": "东端",
            "cmfPPaintingColor": null,
            "cmfPPaintingPrice": 8.05
        },
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getPaintingVendor/:cmfPPaintingType', partList.getPaintingVendor)


/**
 * @api {get} /bom/partlist/getMachinePrice/:hpToolingMachineTon/:hpModule取得plastic機台費用
 * @apiName bom partlist 取得plastic機台費用
 * @apiGroup BomManager
 * @apiDescription get 取得plastic機台費用
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hpToolingMachinePrice plastic機台費用
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hpToolingMachinePrice": 0.0706
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/machinePrice/:hpToolingMachineTon/:hpModule', partList.getMachinePrice)


/**
 * @api {get} /bom/partlist/gethmMaterialPrice/:hmmaterial/:hmthickness get material price
 * @apiName bom partlist get material price
 * @apiGroup BomManager
 * @apiDescription get get material price
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmmaterialprice material price
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmmaterialprice": 4.2
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/gethmMaterialPrice/:hmmaterial/:hmthickness', partList.gethmMaterialPrice)

/**
 * @api {get} /bom/partlist/getIntervalPrice/:bom_id/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength 取得區間價錢
 * @apiName bom partlist 取得區間價錢
 * @apiGroup BomManager
 * @apiDescription get 取得區間價錢
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} hmToolingIntervalPrice 區間價錢
 * @apiSuccessExample {json} Success-Response:
{
    "values": {
        "hmToolingIntervalPrice": 0.12
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
bomManagerRouter.get('/partlist/getIntervalPrice/:bom_id/:hmToolingMaterialExpandWidth/:hmToolingMaterialExpandLength', partList.getIntervalPrice)

/**
*
* @api {post} /bom/partlist/uploadImage image upload
* @apiName image upload
* @apiGroup BomManager
* @apiDescription update image to db and return image id to front-end
* @apiHeader {String} Authorization Bearer access-token
*
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     upload success
        {
                "values": "image id",
        }
*
* @apiError 500 Update Failed.
* @apiError 500 Internal Server Error.
* @apiError 413 Image Oversize
*
*/
bomManagerRouter.post('/partlist/uploadImage', authHelpers.isJWTAuthenticated, partList.uploadImage)
/**
*
* @api {get} /bom/partlist/getImage/:imageID get image
* @apiName get image
* @apiGroup BomManager
* @apiDescription user imageID to get image base64 data
* @apiHeader {String} Authorization Bearer access-token
* @apiParam  {String} values image base64 data
*
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     get success
        {
                "values": "data",
        }
*
* @apiError 500 Update Failed.
* @apiError 500 Internal Server Error.
* @apiError 413 Image Oversize
*
*/
bomManagerRouter.get('/partlist/getImage/:imageid', partList.getImage)
/**
*
* @api {get} /bom/partlist/dropdownfilter/:parentItemName/:field_name/:key
* @apiName 取得 type1/type2/materialSpec/material 下拉選單
* @apiGroup BomManager
* @apiDescription 取得 type1/type2/materialSpec/material 下拉選單
* @apiHeader {String} Authorization Bearer access-token
* @apiParam  {String} itemName parent item value
* @apiParam  {String} field_name parts_ctgy_1/parts_ctgy_2/material_spec/material 其中一個
* @apiParam  {String} key 下拉選單對應的Key
*
* @apiSuccessExample {json} Success-Response:
  []
*
* @apiError 500 Update Failed.
* @apiError 500 Internal Server Error.
* @apiError 413 Image Oversize
*
*/
bomManagerRouter.get('/partlist/dropdownfilter/:parentItemName/:fieldName/:key', partList.getDropdownWithFilter)

// bomManagerRouter.get('/test/:versionID', bomManagers.test)
/**
 *
 * @api {post} /bom/uploadTempBomItem/:bom_id upload bom item excel
 * @apiName upload bom item excel to temp
 * @apiGroup BomManager
 * @apiDescription upload bom item excel
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} bom_id bom_id
 * * @apiSuccessExample {json} Success-Response:
{
    "upload_tmp_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
    "passCount": 160,
    "failCount": 0
}
 *

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */

bomManagerRouter.post('/uploadTempBomItem/:bom_id', authHelpers.isJWTAuthenticated, itemCtrller.uploadBomItems.bind(itemCtrller))

/**
 *
 * @api {delete} /bom/uploadTempBomItem/:bom_id delete upload temp bom item
 * @apiName delete upload temp bom item
 * @apiGroup BomManager
 * @apiDescription delete upload temp bom item
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} id bom_item_temp id
 * * @apiSuccessExample {json} Success-Response:
{
    "res": true
}
 *

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.delete('/uploadTempBomItem/:id', authHelpers.isJWTAuthenticated, itemCtrller.deleteTempBom.bind(itemCtrller))

/**
 *
 * @api {post} /bom/approve me/meee approve bom
 * @apiName approve bom
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *{
 *  "bomID": 123124,
 *  "transferOwner":[
 *     {
 *         source:'Kit Chen',
 *         destion:'3b715fa6-a7db-4c07-a5eb-16322038101f'
 *     },
 *     {
 *         source:'Test',
 *         destion:'2ed741e8-3436-4e6a-bc87-4a5f9e163169'
 *     }
 *  ]
 *}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "version_id": "42401c43-f241-408a-a727-343d1798a5c1"
 * }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/confirmUploadBomItem/:id', authHelpers.isJWTAuthenticated, itemCtrller.confirmUploadBomItem.bind(itemCtrller))

/**
 *
 * @api {get} /bom/uploadBomItem/:bom_id/:id get upload owner and bom project designee
 * @apiName get pload owner and bom project designee
 * @apiGroup BomManager
 * @apiDescription get upload owner and bom project designee
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} partlist_id partlist id
 * * @apiSuccessExample {json} Success-Response:
{
    "uploadItemOwner": [
        {
            "key": "Kit Chen",
            "value": "Kit Chen"
        },
        {
            "key": "Test",
            "value": "Test"
        }
    ],
    "bomDesignee": [
        {
            "value": "RICK CHEN",
            "key": "3b715fa6-a7db-4c07-a5eb-16322038101f"
        },
        {
            "value": "PAUL CF CHEN",
            "key": "15f11747-0dcd-480a-8f82-942789667767"
        },
        {
            "value": "IAN KUO",
            "key": "2ed741e8-3436-4e6a-bc87-4a5f9e163169"
        },
        {
            "value": "ALLIE CHANG",
            "key": "192b9ea1-6c00-411b-be18-1e4f4ff41ae9"
        },
        {
            "value": "TOMMY TSAI",
            "key": "f193b9d5-d06b-4c2b-8ece-9681a468244f"
        }
    ]
}
 *

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/uploadBomItem/:bom_id/:id', authHelpers.isJWTAuthenticated, itemCtrller.getUploadItemOwner.bind(itemCtrller))

/**
 *
 * @api {delete} /bom/uploadBomItemRecord/:bom_id/:stage_id delete upload record
 * @apiName delete upload record
 * @apiGroup BomManager
 * @apiDescription delete upload record
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} bom_id bom_id, stage_id stage_id
 * * @apiSuccessExample {json} Success-Response:
    {
        "res": true
    }
 *

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.delete('/uploadBomItemRecord/:bom_id/:stage_id', authHelpers.isJWTAuthenticated, itemCtrller.deleteUploadRecord.bind(itemCtrller))

/**
 *
 * @api {post} /bomItems/partlist/:bom_item_id get part list detail
 * @apiName get partlist
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
{
        "versionid":"d9d9ad66-9236-4839-ad4c-9149a1847246",
        "product_type_id": 1,
        "product_type_name": 'nb'
}
 * @apiSuccessExample {json} Success-Response:
 {
	"formate":"Housing-Plastic",
	"partlistValue":{
		"Price": {
    "Fan": {
      "fanLabel": "Fan",
      "fanAmount": 2,
      "fanType": "Axial(軸流扇)",
      "fanSize": "60*60*3.5",
      "fanSizePrice": null,
      "motorArchitecture": "1_phase_H<=7.5",
      "motorArchitecturePrice": null,
      "bearingAndSleeve": "Sleeve+塑膠_H<=7.5",
      "bearingAndSleevePrice": null,
      "fanBladeMaterial": "PBT_H<=7.5",
      "fanBladeMaterialPrice": null,
      "magnetMaterialAndSize": "橡膠_H<=7.5",
      "magnetMaterialAndSizePrice": null,
      "hasHalogen": true,
      "fanAppearanceProcess1": "塗黑",
      "fanAppearanceProcess2": "塗黑"
    },
    "Pipe": {
      "pipeLabel": "Pipe",
      "pipeAmount": 1,
      "pipeType": "Powder(結燒管)",
      "outerDiameter": "D8_",
      "pipeLength": 1,
      "pipiLenODiaToCost": null,
      "pipeFlatteningThickness": 0.3,
      "pipiFlThickODiaToCost": null,
      "pipeAppearanceProcess1": "塗黑",
      "pipeAppearanceProcess2": "塗黑"
    },
    "Fin": {
      "finLabel": "Fin",
      "finAmount": 1,
      "finMaterial": "AL1050",
      "finPitch": 1111,
      "finProductionLength": 2,
      "finProductionWidth": 2,
      "finProductionHigh": 3,
      "finProductionExpandLength": 5,
      "finProductionExpandWidth": 6,
      "finMaterialCostPerKilogram": 3.6,
      "finDensity": null,
      "finMaterialThickness": 0.15,
      "finNickelPlating": true,
      "finAppearanceProcess1": "塗黑",
      "finAppearanceProcess2": "塗黑"
    },
    "ThermalPlate": {
      "thPlLabel": "ThermalPlate",
      "thPlAmount": 1,
      "thPlMaterial": "CU1100",
      "thPlMaterialCostPerKilogram": 4.5,
      "thPlMaterialThickness": 0.6,
      "thPlProductionLength": 1,
      "thPlProductionWidth": 2,
      "thPlProductionHigh": 3,
      "thPlProductionExpandLength": 4,
      "thPlProductionExpandWidth": 5,
      "thPlNickelPlating": true,
      "thPlAppearanceProcess1": "塗黑",
      "thPlAppearanceProcess2": "塗黑",
      "thPlDensity": null
    },
    "ThermalBlock": {
      "thBlLabel": "ThermalBlock",
      "thBlAmount": 1,
      "thBlMaterial": "CU1100",
      "thBlMaterialCostPerKilogram": 8.2,
      "thBlMaterialThickness": 0.2,
      "thBlProductionLength": 11,
      "thBlProductionWidth": 22,
      "thBlNickelPlating": true,
      "thBlDensity": 8.9
    },
    "Screw": {
      "screwLabel": "Screw",
      "screwAmount": 2,
      "screwToothpath": 3,
      "screwHeadDiameter": 4,
      "screwHeadThickness": 1,
      "screwLength": 2,
      "screwPolishedRod": true,
      "screwNeckDiameter": 3,
      "screwNeckLength": 4,
      "screwResistantFall": true
    },
    "Spring": {
      "springLabel": "Spring",
      "springAmount": 1,
      "springWireDiameter": 2,
      "springCoilCenterDiameter": 3,
      "springFreeLong": 4
    },
    "ORing": {
      "oRLabel": "O-Ring",
      "oRAmount": 11,
      "oROuterDiameter": 2,
      "oRInnerDiameter": 3,
      "oRThickness": 4
    },
    "Clip": {
      "clipLabel": "Clip",
      "clipAmount": 1,
      "clipMaterial": "KU400",
      "clipMaterialCostPerKilogram": null,
      "clipWireDiameter": 2,
      "clipProductionLength": 3,
      "clipProductionWidth": null
    },
    "PushPin": {
      "pupiLabel": null,
      "pupiAmount": 1,
      "pupiLength": 2,
      "pupiHeadDiameter": 3
    },
    "Label": {
      "labelLabel": "Label",
      "labelAmount": 1,
      "labelLength": 2,
      "labelWidth": 3,
      "labelThickness": 4
    },
    "Sponge": {
      "spongeLabel": "Sponge",
      "spongeAmount": 1,
      "spongeMaterial": "CR1015",
      "spongeLength": 333,
      "spongeWidth": 2,
      "spongeMaterialThickness": 0.8,
      "spongeMaterialCostPerMM": 1.15
    },
    "Grease": {
      "greaseLabel": "Grease",
      "greaseAmount": 33,
      "greaseMaterial": 7783,
      "greaseMaterialCost": null,
      "greaseLength": 333,
      "greaseWidth": 1,
      "greaseThickness": 2
    },
    "ThermalPad": {
      "thermalPadLabel": "Thermal Pad",
      "thermalPadAmount": 1,
      "thermalPadHeatTransferCoefficient": 6,
      "thermalPadShore": 45,
      "thermalPadThickness": 0.8,
      "thermalPadLength": 33,
      "thermalPadWidth": 222,
      "thermalPadPrice": 300
    },
    "ThermalPadMultiImage": {}
  }
	}
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/bomItems/partlist/:bom_item_id', authHelpers.isJWTAuthenticated, itemCtrller.getPartListDetail.bind(itemCtrller))

/**
 *
 * @api {post} ／bom/bomItems/partlist/:bom_item_id/price get partlist price info
 * @apiName get partlist price info
 * @apiGroup BomManager
 * @apiDescription get partlist price info by bom_item_id
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
{
        "versionid":"d9d9ad66-9236-4839-ad4c-9149a1847246"
}
 * @apiSuccessExample {json} Success-Response:
{
  "totalPrices": 0.3449041666666667,
  "prices": {
    "housingPlastic": {
      "parentGroupId": null,
      "total": 0.3449041666666667
    }
  },
  "forDebug": {
    "order": [
      "housingPlastic"
    ],
    "debugInfo": {
      "housingPlastic": {
        "cmfPPadPrinting_cost": {
          "label": "Printing移印價錢",
          "value": 0.08
        },
        "cmfPCNCFeeder_cost": {
          "label": "CNC料頭價錢",
          "value": 0
        },
      }
    }
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/bomItems/partlist/:bom_item_id/price', authHelpers.isJWTAuthenticated, itemCtrller.getPartListPrice.bind(itemCtrller))

/**
 *
 * @api {put} /bomItems/partlist/:bom_item_id update part list detail
 * @apiName get partlist
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 {
    "formate":"Hosuing-Plastic",
    "partlistValue":{
        "HousingPlastic": {
                    "hpItem": "123",
                    "hppartname": "",
                    "hppartnumber": "",
                    "hpuploadimage": "",
                    "hpComponent": "NB-LCD_COVER",
                    "hpProcess": "NORMAL (咬花)",
                    "hpModule": "123",
                    "ce": "123",
                    "hpmaterial": "",
                    "hpPrice": "123",
                    "hpmaterialspec1": "",
                    "hpmaterial2s": "PC",
                    "hpMaterialColor": "123",
                    "hpthickness": "",
                    "hppartweightone": "123",
                    "hppartweighttwo": "",
                    "hppartssizewidth": "",
                    "hppartssizelength": "",
                    "hppartssizehigh": "",
                    "hpToolingPartsWeightSpec1": "123",
                    "hpToolingPartsWeightSpec2": "123",
                    "hpToolingModuleMode": "熱膠道正灌開放式",
                    "hpToolingSizeWidth": "123",
                    "hpToolingSizeLength": "123",
                    "hpToolingSizeHigh": "123",
                    "hpToolingMachineTon": "",
                    "hpToolingMachinePrice": "",
                    "hpToolingHoleProduct1": "123",
                    "hpToolingHoleProduct2": "123",
                    "hpToolingCT": "123",
                    "hpToolingShrinkRate": "123",
                    "hpToolingModuleFactory": "1",
                    "hpToolingMoldingManufacturer": "1",
                    "hpToolingSource": "1",
                    "hpToolingBonded": "保稅",
                    "hpToolingTSDate": "1",productTypeName
                    "hpToolingRemark": "1",
                    "cmfPPaintingCheckBox": true,
                    "cmfPPaintingType": "PU painting",
                    "cmfPPaintingTypePrimerYield": "1",
                    "cmfPPaintingTypeTopcoatYield": "1",
                    "cmfPPaintingTypePrimerLoss": "1",
                    "cmfPPaintingTypeTopcoatLoss": "1",
                    "cmfPPaintingColor": "",
                    "cmfPPaintingColorPrice": "1",
                    "cmfPPaintingVendor": "Akzo",
                    "cmfPInch": "1",
                    "cmfPLengthOutside": "1",
                    "cmfPWidthOutside": "1",
                    "cmfPLengthInside": "1",
                    "cmfPWidthInside": "1",
                    "cmfPPrimerQTY": "1",
                    "cmfPPrimerThickness": "1",
                    "cmfPTopcoatQTY": "1",
                    "cmfPTopcoatThickness": "1",
                    "cmfPHotMeltCheckBox": true,
                    "cmfPHotMeltCount": "1",
                    "cmfPEmbedNailCheckBox": true,
                    "cmfPEmbedNailCount": "1",
                    "cmfPEmbedNailAuto": "人工",
                    "cmfPScreenPrintingCheckBox": true,
                    "cmfPScreenPrintingCount": "1",
                    "cmfPPadPrintingCheckBox": true,
                    "cmfPPadPrintingCount": "1",
                    "cmfPCNCFeederCheckBox": true,
                    "cmfPCNCFeederCount": "1",
                    "cmfPEMISputteringCheckBox": true,
                    "cmfPEMISputteringCount": "1",
                    "cmfPrice": "1"
                }
    },
}
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "unEditCount": 123
 * }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/bomItems/partlist/:bom_item_id', authHelpers.isJWTAuthenticated, partList.updatePartListDetail)

/**
 *
 * @api {get} /bom/:bomID/bomItems/:assign/:itemId get bom item detail
 * @apiName ME input bom item
 * @apiGroup BomManager
 * @apiDescription 拿到 這個bom item 內容
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 * @apiParam  {String} assign assign的內容為all/bomDesigneeID
 *
 * @apiParamExample  {json} Request-Example:
    {
        "versionid":"d9d9ad66-9236-4839-ad4c-9149a1847246"
    }
 * @apiSuccessExample {json} Success-Response:
  {
    "id": "720475cf-e093-464b-a80f-9e1123afff27",
    "customer_pn": null,
    "supply_type": "AVAP",
    "level": "2",
    "parent_level": null,
    "sub_leve": false,
    "rfq_pn": "FXW1559031350577",
    "ref_part_num": null,
    "part_name": "Bezel 60 ASSY AIR FAROE14 YH",
    "image_id": null,
    "image_path": null,
    "gb_assy_ctgy": "LCD Bezel",
    "func_ctgy": null,
    "parts_ctgy_1": null,
    "parts_ctgy_2": null,
    "material_spec": null,
    "material": null,
    "part_size_l": null,
    "part_size_w": null,
    "part_size_h": null,
    "part_size_ef": null,
    "part_size_m": null,
    "part_size_l2": null,
    "part_size_w2": null,
    "thickness": null,
    "part_weight": null,
    "partlist_price": null,
    "partlist_amount": null,
    "update_time": "05/28/19 16:15:57",
    "sku0": "1",
    "sku1": "0",
    "sku2": "0",
    "sku3": "0",
    "sku4": "0",
    "sku5": "0",
    "odm_oem": "7e9a2be0-8105-11e9-9d03-0242ac110002",
    "initaddmodidel": "ef54198e-8116-11e9-a328-0242ac110002",
    "part_number": "460.0GG0T.0001",
    "suggestion_cost_type": 'system_cost',
    "spa_cost":{
            "material_name":"test",
            "cost":123.45
    },
    "sub_cost": {
                "laborage_cost": "66.66667",
                "partlist_cost": "10.00000"
    },
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/:bomID/bomItems/:assign/:bomItemID', authHelpers.isJWTAuthenticated, bomItem.getBomItemByItemId)

/**
 *
 * @api {put} bom/:bomid/bomItems/cost update bom item cost
 * @apiName update bom item cost
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 {
    "bomItems":[{
      "id":'95539ad0-86cb-11e9-82d9-0242ac110002',
      "spa_cost":{
          "cost":100,
          "material_name":"RFG112"
      },
      "ce_shipping":100,
      "ce_pl":100,
      "suggestion_cost_type":"system_cost",
      "suggestion_cost_remark":"15",
      "sourcer_assembly": 10,
      "sourcer_cost_up": 10,
      "sourcer_import_curr": 10,
      "sourcer_pl": 10,
      "sourcer_shipping": 10,
      "sourcer_remark": "123",
  }, ...]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/:bomID/bomItems/cost/', authHelpers.isJWTAuthenticated, bomItem.updateBomItemCost)

/**
 *
 * @api {put} bom/:bomid/lastprice update bom item cost
 * @apiName update bom item last price
 * @apiGroup BomManager
 * @apiDescription approve and change bom status
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * optional
    {
	    "updatesomepart":false
    }
 * @apiSuccessExample {json} Success-Response:
 * {
 *  OK
 * }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/:bomID/lastprice', authHelpers.isJWTAuthenticated, bomItem.updateBomItemLastPriceByBomId)

bomManagerRouter.get('/updateBomItemCostWhenIsParent', authHelpers.isJWTAuthenticated, bomItem.updateBomItemCostWhenIsParent)

bomManagerRouter.get('/setAllOrderId', authHelpers.isJWTAuthenticated, bomItem.setAllOrderId)

bomManagerRouter.get('/template/download', authHelpers.isJWTAuthenticated, bomItem.downloadTemplate)

bomManagerRouter.post('/template/update', authHelpers.isJWTAuthenticated, bomItem.updateTemplate)

/**
 *
 * @api {get} bom/completeversion/:bomid get bom complete version list
 * @apiName get bom complete version list
 * @apiGroup BomManager
 * @apiDescription get bom complete version list
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
 * [
 *   {
 *       "key": "869f42d5-709d-4dd4-8dec-f82846f3d4a1",
 *       "value": "1.0"
 *   },
 *   {
 *       "key": "07dc1f27-4793-4abc-b27d-cdd6ca5db23e",
 *       "value": "2.0"
 *   },
 *   {
 *       "key": "1f3d6d0a-3420-4ca2-a2d3-bfa8ae2b7377",
 *       "value": "3.0"
 *   },
 *   {
 *       "key": "54e3eaec-5875-4968-8cd4-6c955dfbf74b",
 *       "value": "4.0"
 *   }
 *  {
 *       "key": "CURRENT",
 *       "value": "4.5"
 *   }
* ]
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/completeversion/:bomID', authHelpers.isJWTAuthenticated, bomItem.getCompleteVersion)

/**
 *
 * @api {post} /bom/:bomID/bomItems/:assign bom item table context
 * @apiName ME input bom table
 * @apiGroup BomManager
 * @apiDescription 拿到 這個bom table 內容
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 * @apiParam  {String} assign assign的內容為all/bomDesigneeID
 *
 * @apiParamExample  {json} Request-Example:
    {
        "project": null,
        "partlist": null,
        "versionid":"d9d9ad66-9236-4839-ad4c-9149a1847246"
    }
 * @apiSuccessExample {json} Success-Response:
  {
    "editable": false,
    "projectName": "Bucky N15",
    "totalItems": 30,
    "skuDesc": "描述",
    "skuCost": [
        {
            "sku0": null
        },
        {
            "sku1": null
        },
        {
            "sku2": null
        },
        {
            "sku3": null
        },
        {
            "sku4": null
        },
        {
            "sku5": null
        }
    ]
    "bomItems":
    "bomItems":[{
      "item": 1,
      "id": 172,
      "customer_pn": "test",
      "supply_type": "AVAP",
      "level": "2",
      "parent_level": null,
      "sub_leve": false,
      "rfq_pn": "ABC11122223333",
      "ref_part_num": null,
      "part_name": "NO",
      "image_id": "0242ac110002",
      "image_path": "data:image/jpg;base64,a/b/c",
      "qty": 1,
      "gb_assy_ctgy": "KB Support ",
      "func_ctgy": "EMC\n",
      "parts_ctgy_1": "Thermal",
      "parts_ctgy_2": "Fan",
      "material_spec": "EMC\n",
      "material": null,
      "part_size_l": "1.1",
      "part_size_w": "2.1",
      "part_size_h": "3.1",
      "part_size_ef": "4.1",
      "part_size_m": "9.1",
      "part_size_l2": "5.1",
      "part_size_w2": "6.1",
      "thickness": "7.1",
      "part_weight": "8.1",
      "update_time": "2019年3月25日 3:38pm",
      "owner": "REX CY CHEN", // only assign == all
      "sourcer_cost": null,
      "system_cost":null,
      "suggestion_cost":null,
      "odmOem":"7e9a2be0-8105-11e9-9d03-0242ac110002",
      "initAddModiDel":"0dab4b52-8106-11e9-9d03-0242ac110002",
      "partNumber":"460.0GG0N.0001",
      "sku0":"1",
      "sku1":"1",
      "sku2":"1",
      "sku3":"1",
      "sku4":"1",
      "sku5":"1",
      "initaddmodidel":"0dab4b52-8106-11e9-9d03-0242ac110002",
      "part_number":"460.0GG0N.0001",
      "odm_oem":"7e9a2be0-8105-11e9-9d03-0242ac110002",
      "suggestion_cost": [
            {
              "key": null,
              "value": null
            },
            {
              "key": null,
              "value": null
            },
            {
              "key": null,
              "value": null
            }
          ],
        "spa_cost":{
            "material_name":"test",
            "cost":123.45
        },
      "history": true,
    }],
    "partItems":[{
        "type1":"Housing",
        "type2":"Metal",
        "partlist":[{
            "id":"asda-asdasdgeadad"
            "part_name":"test",
            "ref_part_num":"1234-23123",
            "material_spec":"WHAT",
            "material":"the",
            "image_path":"base64Img",
            "update_time":"2019-07-09 13:00:00",
            "formate":"Housting-Metal"
        },{
        "type1":"Housing",
        "type2":"Whatever",
        "partlist":[{
            "id":"asda-asdasdgeadad"
            "part_name":"test",
            "ref_part_num":"1234-23123",
            "material_spec":"WHAT",
            "material":"the",
            "image_path":"base64Img",
            "update_time":"2019-07-09 13:00:00",
            "formate":"Housting-Metal"
        }],
    }],
    "uploadFlag": false,
    "unEditCount": 48,
    "totalPartlistCount":48
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/:bomID/bomItems/:assign', authHelpers.isJWTAuthenticated, bomItem.getBomDetailByVersion)

/**
 *
 * @api {get} bom/bomItems/validRule bomItems validation rule
 * @apiName get bom items validation rules
 * @apiGroup BomManager
 * @apiDescription 取得add bom item的part category II 必填欄位
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
 * [
 *  {
 *      "item": "Pad",
 *      "requiredField": [
 *          "thickness",
 *          "part_size_w",
 *          "part_size_l"
 *      ],
 *      "disableField": [
 *          "part_size_h",
 *      ],
 *      "colKey": "parts_ctgy_2"
 *  },
 *  {
 *      "item": "Painting",
 *      "requiredField": [
 *          "part_weight",
 *          "thickness",
 *          "part_size_h",
 *          "part_size_w",
 *          "part_size_l"
 *      ],
 *      "disableField": [
 *      ],
 *      "colKey": "parts_ctgy_2"
 *  },
 * ]
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/bomItems/validRule', authHelpers.isJWTAuthenticated, bomItem.getBomItemsValidRules)

/**
 *
 * @api {put} bom/sourcerCost/cost
 * @apiName update Sourcer cost cost
 * @apiGroup BomManager
 * @apiDescription 線上編輯並驗證是否符合格式
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 {
    "bomItems":[{
      "id":'95539ad0-86cb-11e9-82d9-0242ac110002',
      "sourcer_assembly": 10,
      "sourcer_cost_up": 10,
      "sourcer_import_curr": 10,
      "sourcer_pl": 10,
      "sourcer_shipping": 10,
      "sourcer_remark": "123",
  }, ...]
}
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/sourcerCost/cost/:bomID/', authHelpers.isJWTAuthenticated, bomItem.updateBomItemSourcerCost)
/**
 *
 * @api {post} bom/sourcerCost/excel
 * @apiName upload Sourcer cost excel
 * @apiGroup BomManager
 * @apiDescription 上傳excel並驗證excel是否符合格式
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
{
    "upload_tmp_id": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
    "passCount": 160,
    "failCount": 0,
    "failMessage": []
}
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/sourcerCost/excel/:bom_id/', authHelpers.isJWTAuthenticated, itemCtrller.uploadSorcerCostExcel.bind(itemCtrller))
/**
 *
 * @api {put} bom/sourcerCost/excel
 * @apiName put Sourcer cost excel
 * @apiGroup BomManager
 * @apiDescription 將已經經過驗證的excel套用
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
{
    "id"": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9"
}
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/sourcerCost/excel/', authHelpers.isJWTAuthenticated, itemCtrller.putSorcerCostExcel.bind(itemCtrller))
/**
 *
 * @api {get} bom/bomItems/noDependencyRule
 * @apiName get noDependencyRule rule
 * @apiGroup BomManager
 * @apiDescription 將已經經過驗證的excel套用
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
{
    "noDependencyRule": [
        {
            "parts_ctgy_1": "73fd7d30-5a91-11e9-8606-0242ac110002",
            "parts_ctgy_2": "73fde5d6-5a91-11e9-8606-0242ac110002",
            "material_spec": "ba0652ec-fa24-11e9-bc93-0242ac110002",
            "material": "d1a5cdfe-1fce-11ea-8fc8-0242ac110002"
        },...
    ],
    "noDependencyOemOdmRule": [
        {
            "id": "842921b0-8105-11e9-9d03-0242ac110002"
        },
        {
            "id": "27990340-810d-11e9-a346-0242ac110002"
        }
    ]
}
 * @apiError 401 Unauthorized
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/bomItems/noDependencyRule', authHelpers.isJWTAuthenticated, bomItem.getBomItemsNoDependencyRule)
/**
 *
 * @api {get} bom/bomParams/:id
 * @apiName get bom params
 * @apiGroup BomManager
 * @apiDescription 取得 project 的獨立參數
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
{
    bomParams:[
      {
        id:"123",
        lable_name: "成型費FCST寬放值",
        group_name: "plastic",
        value: 0,
        value_type: "number",
        unit: "k"
      }
    ]
}
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/bomParams/:id', authHelpers.isJWTAuthenticated, bomManagers.getBomProjectParams)
/**
 *
 * @api {put} bom/bomParams/:id
 * @apiName put noDependencyRule rule
 * @apiGroup BomManager
 * @apiDescription 設定 project 的獨立參數
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiParamExample  {json} Request-Example:
 * {
    bomParams:[
      {
        id:"123",
        value: 0
      }
    ]
   }
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/bomParams/:id', authHelpers.isJWTAuthenticated, bomManagers.updateBomProjectParams)

/**
 *
 * @api {post} /bom/favorite
 * @apiName set user bom favorite
 * @apiGroup BomManager
 * @apiDescription set user bom favorite
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
  {
    "project_code":"EMDM202005140150433",
    "stage_id":"2",
    "site":"WCD",
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/favorite
 */
bomManagerRouter.post('/favorite', authHelpers.isJWTAuthenticated, bomManagers.setBomFavorite)

/**
 *
 * @api {delete} /bom/favorite
 * @apiName remove user bom favorite
 * @apiGroup BomManager
 * @apiDescription remove user bom favorite
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/favorite/411d67b4-cbfa-11ea-8ae1-0242ac110003
 */
bomManagerRouter.delete('/favorite/:fav_id', authHelpers.isJWTAuthenticated, bomManagers.delBomFavorite)

/**
 *
 * @api {post} /bom/archive
 * @apiName bom archive
 * @apiGroup BomManager
 * @apiDescription bom archive
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
  {
    "project_code":"EMDM202005140150433",
    "stage_id":"2",
    "site":"WCD",
  }
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/archive
 */
bomManagerRouter.post('/archive', authHelpers.isJWTAuthenticated, bomManagers.setBomArchive)

/**
 *
 * @api {post} /bom/archive
 * @apiName remove bom archive
 * @apiGroup BomManager
 * @apiDescription remove bom archive
 * @apiHeader {String} Authorization Bearer access-token.
 *
 *
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/archive
 */
bomManagerRouter.delete('/archive/:archive_id', authHelpers.isJWTAuthenticated, bomManagers.delBomArchive)

/**
 *
 * @api {get} bom/sourcerPermission/:bom_id
 * @apiName get bom sourcerPermission
 * @apiGroup BomManager
 * @apiDescription 取得 sourcer通知信的發送名單
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
{
    "sourcer_permission":["10810305", "10810304", ...]
}
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.get('/sourcerPermission/:bom_id', authHelpers.isJWTAuthenticated, bomManagers.getSourcerPermission)
/**
 *
 * @api {put} bom/sourcerPermission/
 * @apiName put sourcerPermission
 * @apiGroup BomManager
 * @apiDescription 修改 sourcer通知信的發送名單
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiParamExample  {json} Request-Example:
{
    "bom_id":10
    "sourcer_permission":["10810305", "10810304", ...]
}
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.put('/sourcerPermission/', authHelpers.isJWTAuthenticated, bomManagers.setSourcerPermission)

/**
 *
 * @api {put} bom/mailToCE/
 * @apiName post mailToCE
 * @apiGroup BomManager
 * @apiDescription Sourcer發送通知信給CE
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiParamExample  {json} Request-Example:
{
    "bom_id":10
}
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/mailToCE/', authHelpers.isJWTAuthenticated, bomManagers.postMailToCE)

/**
 *
 * @api {put} bom/mailToSourcer/
 * @apiName post mailToCE
 * @apiGroup BomManager
 * @apiDescription  CE發送通知信給Sourcer
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiParamExample  {json} Request-Example:
{
    "bom_id":10
}
 * @apiError 400 BAD_REQUEST.
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 500 Internal Server Error.
 *
 */
bomManagerRouter.post('/mailToSourcer/', authHelpers.isJWTAuthenticated, bomManagers.postMailToSourcer)

/**
 * @api {get} /bom/:bomID/bomHistory bom history download
 * @apiName bom history download
 * @apiGroup BomManager
 * @apiDescription bom history
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 *
 * @apiSuccessExample {json} Success-Response:
 [{
  "cost_version": 0.7,
  "edit_user_name": "ZOE_JY_CHEN",
  "edit_time": "2020-07-21T01:29:30.000Z",
  "history": [{
    "item_name": "Part Name(Part Number)",
    "fields_label": "CE Cost",
    "value": 1.2,
  }],
}, {
  "cost_version": 0.7,
  "edit_user_name": "Cindy_Hsiao",
  "edit_time": "2020-07-20T01:00:30.000Z",
  "history": [{
    "item_name": "Part Name(Part Number)",
    "fields_label": "Sourcer Cost",
    "value": 1.2,
  }, {
    "item_name": "Part Name(Part Number)",
    "fields_label": "Sourcer 運包",
    "value": 1.2,
  }]
}]

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/1920/bomHistory

 */
bomManagerRouter.get('/:bomID/bomHistory', authHelpers.isJWTAuthenticated, bomManagers.getBomHistory)

/**
 *
 * @api {get} /bom/:bomID/itemHistory?sourceItemID=1111-2222222-3333-444 bom item history
 * @apiName bom item history
 * @apiGroup BomManager
 * @apiDescription bom item history
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 *
 * @apiSuccessExample {json} Success-Response:
 [
  {
    "cost_version": 1.7,
    "edit_user_name": "ZOE_JY_CHEN",
    "edit_time": "2020-07-21T01:29:30.000Z",
    "history": [{
      "field_label": "CE Cost",
      "value": 1.2,
    }],
  }, {
    "cost_version": 0.7,
    "edit_user_name": "Cindy_Hsiao",
    "edit_time": "2020-07-20T01:00:30.000Z",
    "history": [{
      "field_label": "Sourcer Cost",
      "value": 1.2,
    }, {
      "field_label": "Sourcer 運包",
      "value": 1.2,
    }]
  }
]

 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/1920/itemHistory?sourceItemID=405046f0-c1fa-482e-8dca-4fe2054f4327

 */
bomManagerRouter.get('/:bomID/itemHistory', authHelpers.isJWTAuthenticated, bomItem.getBomItemHistory)

/**
 *
 * @api {get} /bom/:bomID/bomItemImage/:sourceItemID/:type
 * @apiName bom item image
 * @apiGroup BomManager
 * @apiDescription bom item image
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} bomID serial number
 * @apiParam  {String} sourceItemID source item number
 * @apiParam  {String} type item/partlist
 *
 * @apiSuccessExample {json} Success-Response:
{
  "fileName": "aaaa",
  "url": "https://",
}
 * @apiError 401 Unauthorized
 * @apiError 404 bom id Not found
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /bom/:bomID/bomItemImage/:sourceItemID/:type

 */
bomManagerRouter.get('/:bomID/bomItemImage/:sourceItemID/:type', authHelpers.isJWTAuthenticated, bomItem.getBomItemImage)

/**
 *
 * @api {get} /bom/sourcerList
 * @apiName get Sourcer List
 * @apiGroup BomManager
 * @apiHeader {String} Authorization Bearer access-token.
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
 * @apiSampleRequest /bom/sourcerList
 */

bomManagerRouter.get('/sourcerList', authHelpers.isJWTAuthenticated, bomManagers.getSourcerList)

module.exports = bomManagerRouter

