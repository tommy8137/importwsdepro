const router = require('koa-router')
const spending = require('../../../api/spending/spending.js')
const spendingRouter = new router()
const spendings = new spending()
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()
/**
 *
 * @api {get} /spending/plants get plant list
 * @apiName spending plant list
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {Object[]} plantList List of Plant (Array of Objects).
 * @apiSuccess {String}   plantList.plant Plant Code (unique)
 * @apiSuccess {String}   plantList.plantName Plant Name
 * @apiSuccess {String}   plantList.bg BG Name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "plantList": [
        {
             "plant": "F135",
             "plantName": "WZS-3",
             "bg": "CSBG"
        },
        {
             "plant": "F135",
             "plantName": "WZS-3"
             "bg": "CSBG"
        },
   ]
  }
 *
 * @apiSuccessExample {json} Empty-Response:
 *     HTTP/1.1 200 OK
  {
    "plantList": [
   ]
  }
 *
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.get('/plants', authHelpers.isJWTAuthenticated, spendings.getPlants)
/**
 *
 * @api {get} /spending/users get user list
 * @apiName spending user list
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
 *  "plantCode": ["A711","B500"],
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "userList": [
          {
              "role": "EE",
              "scode": "D51",
              "name": "Daniel Kuo",
          },
          {
              "role": "EE",
              "scode": "D51",
              "name": "Daniel Kuo",
          },
   ]
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.get('/users', authHelpers.isJWTAuthenticated, spendings.userList)
/**
 *
 * @api {post} /spending/types get type list
 * @apiName spending type list
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String[]} plant Plant Code List
 * @apiParam {String[]} scode Sourcer Code List
 * @apiParamExample {json} Request-Example:
{
	"plant": ["F021","F137"],
	"scode": ["S73","S65"]
}
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/spending/types?plant=F021,F137&scode=S73,S65
 *
 * @apiSampleRequest off
 * @apiSuccess {Object[]} typeList List of Type (Array of Objects).
 * @apiSuccess {String}   typeList.type1 Type I
 * @apiSuccess {String}   typeList.type2 Type II
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "typeList": [
        {
            "type1": "Capacitor",
            "type2": null
        },
        {
            "type1": "ASIC1",
            "type2": "Others"
        },
        {
            "type1": "ASIC",
            "type2": null
        },
        {
            "type1": "CONVERTER",
            "type2": "CONVERTER"
        },
        {
            "type1": "ASIC",
            "type2": "Others"
        },
        {
            "type1": "Capacitor",
            "type2": "Polymer"
        },
        {
            "type1": "Capacitor",
            "type2": "E-Cap"
        }
    ]
  }
 *
 * @apiSuccessExample {json} Empty-Response:
 *     HTTP/1.1 200 OK
  {
    "typeList": [
    ]
  }
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.post('/types', authHelpers.isJWTAuthenticated, spendings.getTypes)
/**
 *
 * @api {get} /spending/supplys get supply list
 * @apiName get supply List
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "supplyList": [
          {
              "typeID": "S",
              "category": "ODM",
              "sapID": "15"
          },
          {
              "typeID": "W",
              "category": "ODM",
              "sapID": "14"
          },
          {
              "typeID": "V-ODM",
              "category": "ODM",
              "sapID": "13"
          },
          {
              "typeID": "V-OEM",
              "category": "OEM",
              "sapID": "13"
          },
    ]
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.get('/supplys', authHelpers.isJWTAuthenticated, spendings.getSupplyList)

/**
 *
 * @api {post}  /spending/analysis/waterful 瀑布圖
 * @apiName get waterful information
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
{
	"plant": ["F230","F231","F715"],
	"user": ["S01","S02","S98"],
	"dateFrom": "2018-10-09",
	"dateTo": "2018-10-30",
	"type1": ["BTY","CONVERTER"],
	"type2": ["CONVERTER",null],
	"supplyType": [1],
	"category": "none" | "manufacturer" | "vendor",
	"measure": "amount" | "grQty",
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "requestData": {
        "plant": [
            "F230",
            "F231",
            "F715"
        ],
        "user": [
            "S01",
            "S02",
            "S98"
        ],
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-30",
        "type1": [
            "BTY",
            "CONVERTER"
        ],
        "type2": [],
        "supplyType": [],
        "category": "manufacturer",
        "measure": "amount"
    },
    "waterfall": [
        {
            "quantity": 0,
            "USDAmount": 0.01,
            "NTDAmount": 0.37,
            "pn": 6,
            "suppliers": 6,
            "percentage": "94%"
        },
        {
            "quantity": 0,
            "USDAmount": 0,
            "NTDAmount": 0.02,
            "pn": 5,
            "suppliers": 5,
            "percentage": "6%"
        },
        {
            "category": "total",
            "quantity": 12.45,
            "USDAmount": 0.01,
            "NTDAmount": 0.4,
            "percentage": "100%",
            "suppliers": 11,
            "pn": 11
        }
    ]
}
 *
 * @apiError 400 exchange rate not found
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.post('/analysis/waterful', authHelpers.isJWTAuthenticated, spendings.getWaterful)
/**
 *
 * @api {post} /spending/analysis/month 月份
 *
 * @apiName get month information
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam {String[]} plant Plant Code List
 * @apiParam {String[]} scode Sourcer Code List
 * @apiParam {timestamp} dateFrom Date FROM
 * @apiParam {timestamp} dateTo Date TO
 * @apiParam {String[]} type1 TYPE I List
 * @apiParam {String[]} type2 TYPE II List
 * @apiParam {Integer[]} supplyType Supply type ID List
 * @apiParam {String="base","group"} vendorSelection Vendor Base or Vendor Group
 * @apiParamExample  {json} Request-Example:
{
   "plant": ["F601", "F232", "F130", "F131", "F715", "F230"],
   "scode": ["S99", "S81", "S60", "S77", "S65", "S98", "L04", "100", "S01"],
   "dateFrom": "2018/01/01",
   "dateTo": "2018/04/30",
   "type1": ["Capacitor", "CONVERTER", "BTY"],
   "type2": ["CONVERTER"],
   "supplyType": [1, 3],
   "vendorSelection": "group"
}
 * @apiSampleRequest off
 * @apiSuccess {Object} query 傳入的報表查詢條件
 *
 * @apiSuccess {Object[]} data List of data, 只回傳10筆 (Array of Objects).
 * @apiSuccess {Integer} data.key Data Ordering Key by amount (1 to 10, unique)
 * @apiSuccess {String}   data.name Vendor (base or group) name, 最後一筆為Others, 剩餘金額加總
 * @apiSuccess {Float}   data.amountNTD NTD Amount, 小數4位
 * @apiSuccess {Float}   data.amountUSD USD Amount, 小數4位
 * @apiSuccess {Float}   data.percentage 百分筆, 小數2位
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "query": {
        "plants": [ "F601", "F232", "F130", "F131", "F715", "F230" ],
        "scodes": [ "S99", "S81", "S60", "S77", "S65", "S98", "L04", "100", "S01" ],
        "dateFrom": "2017-12-31T16:00:00.000Z",
        "dateTo": "2018-04-29T16:00:00.000Z",
        "type1": [ "Capacitor", "CONVERTER", "BTY" ],
        "type2": [ "CONVERTER" ],
        "supplyType": [ 1, 3 ],
        "selection": "group"
    },
    "data": [
        {
            "key": 1,
            "name": "WISTRON",
            "amountNTD": 1000,
            "amountUSD": 34.4828,
            "percentage": 15.38
        },
        {
            "key": 2,
            "name": "ACER",
            "amountNTD": 900,
            "amountUSD": 31.0345,
            "percentage": 13.85
        },
        {
            "key": 3,
            "name": "VENDOR03",
            "amountNTD": 800,
            "amountUSD": 27.5862,
            "percentage": 12.31
        },
        {
            "key": 4,
            "name": "VENDOR04",
            "amountNTD": 600,
            "amountUSD": 20.6897,
            "percentage": 9.23
        },
        {
            "key": 5,
            "name": "VENDOR05",
            "amountNTD": 600,
            "amountUSD": 20.6897,
            "percentage": 9.23
        },
        {
            "key": 6,
            "name": "VENDOR06",
            "amountNTD": 500,
            "amountUSD": 17.2414,
            "percentage": 7.69
        },
        {
            "key": 7,
            "name": "VENDOR07",
            "amountNTD": 400,
            "amountUSD": 13.7931,
            "percentage": 6.15
        },
        {
            "key": 8,
            "name": "VENDOR08",
            "amountNTD": 300,
            "amountUSD": 10.3448,
            "percentage": 4.62
        },
        {
            "key": 9,
            "name": "VENDOR09",
            "amountNTD": 200,
            "amountUSD": 6.8966,
            "percentage": 3.08
        },
        {
            "key": 10,
            "name": "Others",
            "amountNTD": 1200,
            "amountUSD": 41.3793,
            "percentage": 18.46
        }
    ]
  }
 *
 * @apiError 400 [NTD] to [USD] exchange rate not found
 * @apiError 401 Unauthorized.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.post('/analysis/month', authHelpers.isJWTAuthenticated, spendings.chartMonthAnalysis)

/**
 * @api {post} /spending/analysis/report 報表
 * @apiName get report information
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
{
   "plant": ["F130","F131","F135","F132","F138","F136","F230"],
   "user": ["S87","S46","SH3","S20","S06","SA2","S56"],
   "dateForm": "2017-02-28",
   "dateTo": "2018-02-28",
   "type1": ["Antenna","Cable","EMC","Electro-Mechanical","Housing","ME-Others","Memory","Module","NOR Flash","Power IC","Sensor","Thermal"],
   "type2": ["External Cable","FFC","FIO","FPC","Other","Power Cord","Mic","Buzzer","Aluminum","Speaker"] | [],
   "supplyType": [1,3,11,13,14,15] | [],
 }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

     download summary report

 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */

spendingRouter.post('/analysis/report', authHelpers.isJWTAuthenticated, spendings.genSummaryExcel)
/**
 *
 * @api {post} /spending/analysis/rawData raw data
 * @apiName get raw data excel
 * @apiGroup SPENDING
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
{
   "plant": ["F130","F131","F135","F132","F138","F136","F230"],
   "user": ["S87","S46","SH3","S20","S06","SA2","S56"],
   "dateForm": "2017-02-28",
   "dateTo": "2018-02-28",
   "type1": ["Antenna","Cable","EMC","Electro-Mechanical","Housing","ME-Others","Memory","Module","NOR Flash","Power IC","Sensor","Thermal"],
   "type2": ["External Cable","FFC","FIO","FPC","Other","Power Cord","Mic","Buzzer","Aluminum","Speaker"] | [],
   "supplyType": [1,3,11,13,14,15] | [],
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

     download raw data report

 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
spendingRouter.post('/analysis/rawData', authHelpers.isJWTAuthenticated, spendings.genRawDataExcel)

/**
 *
 * @api {get} /spenging/eecost/detail/:edm_version_id/module_id get ee cost module detail
 * @apiName get ee cost module detail
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {{
    "response": [
        {
            "part_number": "72.12873.003",
            "type1": "NOR Flash",
            "type2": "SPI",
            "current_price": "0.575",
            "spa": null,
            "lpp": null
        },
    ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /spending/eecost/243c6ce6-600b-11e9-9e86-0242ac110002
 */
spendingRouter.get('/eecost/detail/:edm_version_id/:module_id', authHelpers.isJWTAuthenticated, spendings.getModuleDetail)

/**
 *
 * @api {get} /spenging/eeCostV2?projectID=&moduleID=&category=&supply_type= get ee module detail
 * @apiName get ee module detail
 * @apiGroup dashboard
 * @apiParam  {String} projectID projectID
 * @apiParam  {String} moduleID ee module
 * @apiParam  {String} category bu or module
 * @apiParam  {String} supply_type supply_type
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {{
    "response": [
        {
            "part_number": "83.R2003.A8M",
            "type1": "Discrete",
            "type2": "Schottky Diode",
            "last_price": "0.0046",
            "spa": "0.0046",
            "lpp": "0.005211",
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "0.0046",
            "remark": null,
            "description": "DIODE S.B RB520S30 30V SOD-523",
            "qty": "6",
            "sub_total_suggestion_cost": "0.0276",
            "sourcer_cost": null,
            "clean_sheet_cost": null,
            "subTotalLastPrice": 0.0276,
            "exp": "N"
        },
    ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 parameter error
 * @apiSampleRequest /spending/eeCostV2?projectID=479a36d3-5e1c-4ba7-8515-2c1d6becb2ab&moduleID=Power&category=module&supply_type=w,h,a,av
 */
spendingRouter.get('/eeCostV2', authHelpers.isJWTAuthenticated, spendings.getModuleDetailV2)
/**
 *
 * @api {get} /spending/dashboardCost?dashboard=&supply_type=&manufacturer= get dashboard me/ee and total cost
 * @apiName get ee complete version list
 * @apiGroup dashboard
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} dashboard  serial number
 * @apiParam  {String} supply_type supply_type
 * @apiParam  {String} manufacturer manufacturer

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "edm_version_id": "cae53646-3b50-4c00-9637-2ef3289b8a56",
  "me_version_id": "cfaadd84-9154-4759-8e31-b2db826743fc",
  "project_name": "TESTIMPORT",
  "ee_show_detail": true,
  "me_show_detail": true,
  "project_code": "10410301",
  "total_last": 45.214,
  "total_suggestion": 191.4648,
  "sku": {
    "ee": "18730_-1_Discrete_20181211164332",
    "me": "sku1"
  },
  "lists": [
    {
      "id": "Others"
    },
    {
      "id": "EE",
      "total_suggestion": 185.78077,
      "total_last": 189.48494,
      "bu": [
        {
          "module": "Connector",
          "suggestion": 2.43282,
          "total_last": 2.7129
        },
        {
          "module": "Power",
          "suggestion": 2.51094,
          "total_last": 3.08093
        },
        {
          "module": "Others",
          "suggestion": 180.83701,
          "total_last": 183.69110999999998
        },
        {
          "module": "RTC Bty",
          "suggestion": null,
          "total_last": null
        }
      ],
      "module": [
        {
          "module": "Display",
          "total_last": 0.51826,
          "suggestion": 0.32946
        },
        {
          "module": "EXTIO_TypeC",
          "total_last": 0.74,
          "suggestion": 0.69422
        },
        {
          "module": "Audio",
          "total_last": 0.5513,
          "suggestion": 0.50864
        },
        {
          "module": "Sequence",
          "total_last": 0.14523,
          "suggestion": 0.08457
        },
        {
          "module": "INTIO_KB/TP",
          "total_last": 0.1689,
          "suggestion": 0.1502
        },
        {
          "module": "CARDREADER",
          "total_last": 0.3876,
          "suggestion": 0.38214
        },
        {
          "module": "Power",
          "total_last": 2.60576,
          "suggestion": 2.12546
        },
        {
          "module": "Sensor_Hall",
          "total_last": 0.0233,
          "suggestion": 0.02284
        },
        {
          "module": "DDR",
          "total_last": 9.71661,
          "suggestion": 9.68327
        },
        {
          "module": "Platform_CPU",
          "total_last": 131.0123,
          "suggestion": 131.00856
        },
        {
          "module": "Platform_PCH",
          "total_last": 0.13941,
          "suggestion": 0.11205
        },
        {
          "module": "GPU",
          "total_last": 40.45952,
          "suggestion": 38.42124
        },
        {
          "module": "INTIO_ATX/DCIN",
          "total_last": 0.41645,
          "suggestion": 0.321
        },
        {
          "module": "EC",
          "total_last": 0.40304,
          "suggestion": 0.4011
        },
        {
          "module": "LAN",
          "total_last": 0.85943,
          "suggestion": 0.80948
        },
        {
          "module": "USB",
          "total_last": 0.34098,
          "suggestion": 0.28235
        },
        {
          "module": "UnusedParts",
          "total_last": 0.03294,
          "suggestion": 0.02501
        },
        {
          "module": "LED/BTN",
          "total_last": 0.0246,
          "suggestion": 0.02368
        },
        {
          "module": "INTIO_Storage_WiFi",
          "total_last": 0.37315,
          "suggestion": 0.35069
        },
        {
          "module": "INTIO_Thermal",
          "total_last": 0.02371,
          "suggestion": 0.023
        },
        {
          "module": "Flash",
          "total_last": 0.54245,
          "suggestion": 0.02182
        }
      ]
    },
    {
      "project_name": "TESTIMPORT",
      "project_code": "10410301",
      "total_last": 45.214,
      "total_suggest": 5.684,
      "list": {
        "id": "ME",
        "total_last": 45.214,
        "total_suggest": 5.684,
        "module": [
          {
            "module": "Thermal",
            "total_last": 1.924,
            "module_suggest": 0
          },
          {
            "module": "EMC",
            "total_last": 1.924,
            "module_suggest": 0
          },
          {
            "module": "Housing",
            "total_last": 12.506,
            "module_suggest": 5.684
          },
          {
            "module": "MEothers",
            "total_last": 13.468,
            "module_suggest": 0
          },
          {
            "module": "Cable",
            "total_last": 6.734,
            "module_suggest": 0
          },
          {
            "module": "Electro_Mechanical",
            "total_last": 0.962,
            "module_suggest": 0
          },
          {
            "module": "null",
            "total_last": 7.696,
            "module_suggest": 0
          }
        ]
      }
    }
  ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /spending/dashboardCost?dashboard=243c6ce6-600b-11e9-9e86-0242ac110002&supply_type=A,H,B&manufacturer=OEM,ODM
 */
spendingRouter.get('/dashboardCost', authHelpers.isJWTAuthenticated, spendings.getDashboardCost)
/**
 *
 * @api {get} /spenging/dashboard/eeBoms?pages=1&items=10&column=&keyword=&project=
 * @apiName get ee complete version list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "numberOfProject": 10,
  "projectList": [
    {
      "ee_id": null,
      "me_id": 190,
      "customer": "ACA DIGITAL",
      "project_code": "10410301",
      "project_name": "YYYY2",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "YYYY2",
      "detail": [
        {
          "id": "c4b8dac4-96fc-11e9-8442-0242ac110002",
          "ee": {
            "id": "661ed6d1-ac3d-45c6-a5d5-35d0bcb48301",
            "sku": "Discrete",
            "version": "20181211164332",
            "platform": "WHISKEYLAKE-U",
            "panel_size": "Panel = 14/15/17, Z > 18 mm",
            "status_version": "1"
          },
          "me": {
            "id": "cfaadd84-9154-4759-8e31-b2db826743fc",
            "sku": "MEBOM_V1.0_sku1",
            "version": "1.0"
          },
          "create_time": "2019-06-25T03:53:18.786Z"
        }
      ]
    },
    {
      "ee_id": null,
      "me_id": 204,
      "customer": "ACA DIGITAL",
      "project_code": "10410301",
      "project_name": "TTYYH",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "TTYYH",
      "detail": [
        {
          "id": "c4b8dac4-96fc-11e9-8442-0242ac110002",
          "ee": {
            "id": "661ed6d1-ac3d-45c6-a5d5-35d0bcb48301",
            "sku": "Discrete",
            "version": "20181211164332",
            "platform": "WHISKEYLAKE-U",
            "panel_size": "Panel = 14/15/17, Z > 18 mm",
            "status_version": "1"
          },
          "me": {
            "id": "cfaadd84-9154-4759-8e31-b2db826743fc",
            "sku": "MEBOM_V1.0_sku1",
            "version": "1.0"
          },
          "create_time": "2019-06-25T03:53:18.786Z"
        }
      ]
    },
    {
      "ee_id": null,
      "me_id": 200,
      "customer": "ACA DIGITAL",
      "project_code": "10410301",
      "project_name": "DDER",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "DDER",
      "detail": [
        {
          "id": "c4b8dac4-96fc-11e9-8442-0242ac110002",
          "ee": {
            "id": "661ed6d1-ac3d-45c6-a5d5-35d0bcb48301",
            "sku": "Discrete",
            "version": "20181211164332",
            "platform": "WHISKEYLAKE-U",
            "panel_size": "Panel = 14/15/17, Z > 18 mm",
            "status_version": "1"
          },
          "me": {
            "id": "cfaadd84-9154-4759-8e31-b2db826743fc",
            "sku": "MEBOM_V1.0_sku1",
            "version": "1.0"
          },
          "create_time": "2019-06-25T03:53:18.786Z"
        }
      ]
    },
    {
      "ee_id": null,
      "me_id": 205,
      "customer": "ACA DIGITAL",
      "project_code": "12345",
      "project_name": "pricetestttttt",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "440.0FK0C.0001",
      "detail": []
    },
    {
      "ee_id": null,
      "me_id": 203,
      "customer": "ACA DIGITAL",
      "project_code": "10410301",
      "project_name": "TESTIMPORT",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V7.0"
      },
      "version_remark": null,
      "sku_description": null,
      "detail": [
        {
          "id": "c4b8dac4-96fc-11e9-8442-0242ac110002",
          "ee": {
            "id": "661ed6d1-ac3d-45c6-a5d5-35d0bcb48301",
            "sku": "Discrete",
            "version": "20181211164332",
            "platform": "WHISKEYLAKE-U",
            "panel_size": "Panel = 14/15/17, Z > 18 mm",
            "status_version": "1"
          },
          "me": {
            "id": "cfaadd84-9154-4759-8e31-b2db826743fc",
            "sku": "MEBOM_V1.0_sku1",
            "version": "1.0"
          },
          "create_time": "2019-06-25T03:53:18.786Z"
        }
      ]
    },
    {
      "ee_id": null,
      "me_id": 180,
      "customer": "AIRO WIRELESS",
      "project_code": "10403304",
      "project_name": "sfgsfdg",
      "product_type": "AIO",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "",
      "detail": []
    },
    {
      "ee_id": null,
      "me_id": 113,
      "customer": "123",
      "project_code": "10403304",
      "project_name": "12345",
      "product_type": "123",
      "stage": {
        "ee": null,
        "me": "RFI"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "THIS IS DESC",
      "detail": []
    },
    {
      "ee_id": null,
      "me_id": 129,
      "customer": "ACCORDANCE",
      "project_code": "10709306",
      "project_name": "Rex s",
      "product_type": null,
      "stage": {
        "ee": null,
        "me": "RFQ"
      },
      "version": {
        "ee": null,
        "me": "V1.0"
      },
      "version_remark": null,
      "sku_description": "fgsdfg",
      "detail": []
    },
    {
      "ee_id": "f4974fd6-b666-4ef0-906f-494d54348f7e",
      "me_id": null,
      "customer": "Acer",
      "project_code": "4PD0DV010001",
      "project_name": "SLINKY",
      "product_type": "Notebook.Computer",
      "stage": {
        "ee": "-1",
        "me": null
      },
      "version": {
        "ee": "1",
        "me": null
      },
      "version_remark": "EEDM",
      "sku_description": null,
      "detail": [
        {
          "id": "1a548360-9758-11e9-a80b-0242ac110002",
          "ee": {
            "id": "661ed6d1-ac3d-45c6-a5d5-35d0bcb48301",
            "sku": "Discrete",
            "version": "20181211164332",
            "platform": "WHISKEYLAKE-U",
            "panel_size": "Panel = 14/15/17, Z > 18 mm",
            "status_version": "1"
          },
          "me": {
            "id": null,
            "sku": null,
            "version": null
          },
          "create_time": "2019-06-25T14:47:06.614Z"
        }
      ]
    }
  ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /spending/eecost/243c6ce6-600b-11e9-9e86-0242ac110002
 */
spendingRouter.get('/dashboard/eeBoms', authHelpers.isJWTAuthenticated, spendings.getEeBomProjects)
spendingRouter.get('/dashBoardFilterType/:column', authHelpers.isJWTAuthenticated, spendings.getDashBoardFilterItems)
spendingRouter.get('/:bom_id/getmecost/:sku', authHelpers.isJWTAuthenticated, spendings.getMeCost)
/**
 *
 * @api {get} /spending/meModule/detail?projectID=&moduleID=&sku=&manufacturer= get me module detail
 * @apiName get me detail list
 * @apiGroup dashboard
 * @apiParam  {String} projectID  me_version_id
 * @apiParam  {String} moduleID  type1
 * @apiParam  {String} sku  sku0-5
 * @apiParam  {String} manufacturer manufacturer type
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "response": [
        {
            "part_number": "433.0F801.0001",
            "type1": "Housing",
            "type2": "HINGE",
            "gb_assy_ctgy": "LCD DC-Level",
            "last_price": 0.962,
            "clean_sheet_cost": 0,
            "spa_cost": null,
            "sourcer_cost": null,
            "suggestion_cost": 0,
            "remark": ""
        },
        {
            "part_number": "433.0F803.0001",
            "type1": "Housing",
            "type2": "Metal",
            "gb_assy_ctgy": "System DC-Level",
            "last_price": 0.962,
            "clean_sheet_cost": 0,
            "spa_cost": null,
            "sourcer_cost": null,
            "suggestion_cost": 0,
            "remark": ""
        },
        {
            "part_number": "056.17008.M007",
            "type1": "Housing",
            "type2": "Module",
            "gb_assy_ctgy": "System DC-Level",
            "last_price": 0.962,
            "clean_sheet_cost": 0,
            "spa_cost": null,
            "sourcer_cost": null,
            "suggestion_cost": 0,
            "remark": ""
        },
        {
            "part_number": "460.0F806.0002",
            "type1": "Housing",
            "type2": null,
            "gb_assy_ctgy": "KB Support ",
            "last_price": 0.962,
            "clean_sheet_cost": 0.144,
            "spa_cost": null,
            "sourcer_cost": null,
            "suggestion_cost": 0.144,
            "remark": ""
        },
    ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
  @apiSampleRequest /spending/meModule/detail?projectID=cfaadd84-9154-4759-8e31-b2db826743fc&moduleID=Housing&sku=sku1&manufacturer=OEM,ODM
 */
spendingRouter.get('/meModule/detail', authHelpers.isJWTAuthenticated, spendings.getMeDetail)
/**
 *
 * @api {get} /spending/version?project_code=10410301&me_id=190&ee_id=
 * @apiName get combine me & ee version list
 * @apiGroup eeBom
 * @apiParam  {String} project_code  project_code
 * @apiParam  {String} me_id  me_bom_id
 * @apiParam  {String} ee_id  ee_project_id
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "meVersions": [
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku0",
      "sku": "sku0"
    },
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku1",
      "sku": "sku1"
    },
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku2",
      "sku": "sku2"
    },
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku3",
      "sku": "sku3"
    },
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku4",
      "sku": "sku4"
    },
    {
      "id": "05981c3e-bf80-4ce6-afd8-a95e618743d5",
      "version_num": "1.0",
      "version": "MEBOM_V1.0_sku5",
      "sku": "sku5"
    }
  ],
  "eeVersions": []
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /spending/version?project_code=10410301&me_id=190&ee_id=
 */
spendingRouter.get('/version', authHelpers.isJWTAuthenticated, spendings.getCombineVersion)
/**
 *
 * @api {put} /spending/combine/version add combine version
 * @apiName  add combine version
 * @apiGroup spending
 * @apiDescription  add combine version
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} id  serial number
 * @apiParamExample  {json} Request-Example:
    {
        "ee_sku": "Discrete",
        "ee_version_id": "cae53646-3b50-4c00-9637-2ef3289b8a56",
        "ee_version_name": "18730_-1_Discrete_20181211164332",
        "ee_version": "1",
        "me_version_name": null,
        "me_version_id": null,
        "me_version": null,
        "project_code": "4PD0DV010001"
    }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
   {
    "id": "1a548360-9758-11e9-a80b-0242ac110002"
   }
 *
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
spendingRouter.post('/combine/version', authHelpers.isJWTAuthenticated, spendings.insertCombineVersion)
/**
 *
 * @api {get} /dashboard/export/:dashboardID?supply_type=&manufacturer= get dashboard export excel
 * @apiName  get dashboard export excel
 * @apiGroup dashboard
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} dashboardID dashboard version id
 * @apiParam  {String} type 為 ME, EE , others (單選)
 * @apiParam  {String} supply_type supply_type
 * @apiParam  {String} manufacturer manufacturer type
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_Dashboard_<EE|ME|Others>_<Project_Name>_<date:YYYYmmdd>
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 dashboard_version_id required
 * @apiSampleRequest /dashboard/export/243c6ce6-600b-11e9-9e86-0242ac110002?supply_type=w,h,a,av&manufacturer=odm,oem
 */
spendingRouter.get('/dashboard/export/:dashboardID', authHelpers.isJWTAuthenticated, spendings.ExportDashboardByID)
/**
 *
 * @api {get} /dashboard/filter get dashboard filter item
 * @apiName  get dashboard filter item
 * @apiGroup dashboard
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} dashboardID dashboardID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    supply_type: ['W', 'S', 'Empty', 'B', 'C', 'A', 'AV', ''],
    manufacturer: ['OEM', 'ODM', 'TBD']
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 dashboardID required
 * @apiSampleRequest /dashboard/filter
 */
spendingRouter.get('/dashboard/filter', authHelpers.isJWTAuthenticated, spendings.getDashboadrFilterItems)
/**
 *
 * @api {get} /dashboardItem/export?edm_version_id=&item=&category=&supply_type= get dashboard export item excel
 * @apiName  get dashboard item export excel
 * @apiGroup dashboard
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} edm_version_id edm_version_id
 * @apiParam  {String} item ee item
 * @apiParam  {String} category bu or module
 * @apiParam  {String} supply_type supply_type
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_Dashboard_<bu|module>_<Item_name>_<date:YYYYmmdd>
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /dashboardItem/export?edm_version_id=479a36d3-5e1c-4ba7-8515-2c1d6becb2ab&item=Connector&category=bu&supply_type=A,H,B
 */
spendingRouter.get('/dashboardItem/export', authHelpers.isJWTAuthenticated, spendings.exportItemView)

/**
 *
 * @api {get} /spenging/eecost/:edm_version_id get ee cost
 * @apiName get ee cost
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "id": "EE",
    "total_suggestion": 400,
    "current": 3.47,
    "module": [
        {
            "module": "GOGORO",
            "current": 3.47,
            "suggestion": 400
        }
    ]
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /spending/eecost/243c6ce6-600b-11e9-9e86-0242ac110002
 */
spendingRouter.get('/eecost/:edm_version_id', authHelpers.isJWTAuthenticated, spendings.getEeCost)
spendingRouter.get('/eeCostV2/:edm_version_id', authHelpers.isJWTAuthenticated, spendings.getEeCostV2)



module.exports = spendingRouter
