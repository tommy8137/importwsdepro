const router = require('koa-router')
const xrayRouter = new router()
const xray = require('../../../api/xray/xray.js')
const xrays = new xray()

const multiAnalysis = require('../../../api/xray/multiAnalysis.js')
const newMultiAnalysis = new multiAnalysis()

const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()

// ======== spec search bar ======
/**
 *
 * @api {get} /xray/productType/:role get product type list
 * @apiName xray product type list by role
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    'Hand Held',
    'LCM Business',
    'Audio',
    'Storage',
    'Industrial PC',
    ...
  ]

 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.get('/productType/:role', authHelpers.isJWTAuthenticated, xrays.fetchProductType)

/**
 *
 * @api {post} /xray/type1/:role get type1 list
 * @apiName xray type1 list by role & product_type
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 * @apiParamExample  {json} Request-Example:
 * {
 *    "productType":["Audio","CE"]
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    'Cable',
    'Electro-Mechanical',
    'Housing',
    'ME-Others',
    'Packing',
    'Thermal'
  ]

 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/type1/:role', authHelpers.isJWTAuthenticated, xrays.fetchTypeI)

/**
 *
 * @api {get} /xray/type2/:role get type2 list
 * @apiName xray type2 list by role & product_type & type1
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 * @apiParam  {String} product_type
 * @apiParam  {String} type1
 * @apiParamExample  {json} Request-Example:
 * {
 *    "productType":["Audio","CE"]
 *    "type1" : "EMC"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [
    'External Cable',
    'FFC',
    'Power Cord',
    'Wire/Harness',
  ]

 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/type2/:role', authHelpers.isJWTAuthenticated, xrays.fetchTypeII)


// ========sourcer list ==============
/**
 *
 * @api {get} /xray/sourcers/:role /Sponge/Poron get sourcer list
 * @apiName xray sourcer list by role & product_type & type1 & type2
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 * @apiParam  {String} productType
 * @apiParam  {String} type1
 * @apiParam  {String} type2
 * @apiParamExample  {json} Request-Example:
 * {
 *    "productType":["Audio","CE"],
 *    "type1" : "EMC",
 *    "type2": "Mylar"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "sourcerList": [
      {
        "sourcer": "Zoe JY Chen",
        "scode": "s32",
      }, {
        "sourcer": "Susan Hsieh",
        "scode": "s87",
      }
    ]
  }
 *
 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/sourcers/:role', authHelpers.isJWTAuthenticated, xrays.fetchSourcers)

// ============= spec item =============
/**
 *
 * @api {post} /xray/EE/specs get EE spec items list
 * @apiName EE xray spec items list by search bar
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} product_type
 * @apiParam  {String} type1
 * @apiParam  {String} type2
 * @apiParam  {Array} sourcer sourcer code (option)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "productType": ["Audio", "CE"],
 *    "sourcer": ["S51", "S01"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "spec": {
      "spec01": ['LDO', 'VATRA', 'USB'],
      "spec02": ['PIN', '5pin'],
      "spec03": [],
      // ...
      "spec29": [],
      "spec30": [],
    },
    "specTitle": ['Material Type', '長', '寬', '寬', '高( or 厚度)', '二次加工工序', '包裝貼Label', '印刷區域','沖切方式','輔料',
        '承受力', null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null ]
  }
 *
 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/EE/specs', authHelpers.isJWTAuthenticated, xrays.fetchSpecItemsForEE)

/**
 *
 * @api {post} /xray/ME/specs get ME spec N items
 * @apiName ME xray spec items list by search bar
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} product_type
 * @apiParam  {String} type1
 * @apiParam  {String} type2
 * @apiParam  {Array} sourcer sourcer code (option)
 * @apiParam  {Number} specN next spec number
 * @apiParam  {Object} spec spec option
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "productType": ["Audio"],
 *    "sourcer": ["S51", "S01"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "specN": 2,
 *    "spec": {
 *      "spec01": ['LDO', 'VATRA', 'USB'],
        "spec02": [],
        "spec03": [],
        // ...
        "spec29": [],
        "spec30": [],
 *    },
 *    "ceSpecGroup": [ true, false, false, false, false, false, false, false, false, false,
        false, true, true, true, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false ]
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "spec": [
        "3"
    ],
    "key": "spec02",
    "specTitle": ['Material Type', '長', '寬', '寬', '高( or 厚度)', '二次加工工序', '包裝貼Label', '印刷區域','沖切方式','輔料',
        '承受力', null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null ]
}
 *
 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/ME/specs', authHelpers.isJWTAuthenticated, xrays.fetchSpecItemsForME)

// ====ref part number ====

/**
 *
 * @api {post} /xray/partNumber/:role get xray search bar & spec items by Reference partNumber
 * @apiName xray items by partNumber
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 * @apiParam  {String} partNumber ex: '434.0F801.0001'
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "partNumber": "434.0F801.0001",
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "productType": ["Audio"],
  "type1": "Add-on card",
  "type2": "Controller BD",
  "spec": {
    "spec01": [
      {
        "item_name": 'LDO',
        "isHighlight": true,
        "value": true,
      },
      {
        "item_name": 'LED',
        "isHighlight": false,
        "value": true,
      },
    ],
    "spec02": [
      {
        "item_name": 'PIN',
        "isHighlight": true,
        "value": false,
      }, {
        "item_name": 'PIN2.0',
        "isHighlight": false,
        "value": false,
      },
    ],
    "spec03": [],
    // ...
    "spec29": [],
    "spec30": [],
  },
  "specTitle": ['Material Type', '長', '寬', '寬', '高( or 厚度)', '二次加工工序', '包裝貼Label', '印刷區域','沖切方式','輔料',
        '承受力', null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null ],
  "ceSpecGroup": [ true, false, false, false, false, false, false, false, false, false,
        false, true, true, true, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false ] //如果是ME則回傳[]
}
 *
 * @apiError 400 ERROR FORMAT
 * @apiError 404 Not found
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/partNumber/:role', authHelpers.isJWTAuthenticated, xrays.fetchPartNumber)


// ======== spec group ======
/**
 *
 * @api {get} /xray/specgroups/:role get spec group list
 * @apiName xray spec group list
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "specGroupList": [{
    "specGroupName": "SPEC_Group_180824",
    "specGroupID": "abcd-1111-feca-4444",
    "owner": "Sky Lin",
    "productType": ["NB", "Audio"],
    "sourcer": ["S01", "S02"],
    "type1": "Connector",
    "type2": "USB3.0",
    "specGroup": {
      "spec01": ['LDO','VATRA'],
      "spec02": ['PIN'],
      "spec03": [],
      // ...
      "spec29": [],
      "spec30": [],
    },
  }],
}
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.get('/specgroups/:role', authHelpers.isJWTAuthenticated, xrays.fetchSpecGroups)
/**
 *
 * @api {get} /xray/specgroup/:role?groupID=1 get spec group item by group id
 * @apiName xray spec group item by id
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 * @apiParam  {String} groupID group id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "specGroupName": "SPEC_Group_180824",
    "specGroupID": "abcd-1111-feca-4444",
    "owner": "Sky Lin",
    "productType": ["NB"],
    "sourcer": ["S01", "S02"],
    "type1": "Connector",
    "type2": "USB3.0",
    "specGroup": {
      "spec01": [
        {
          "item_name": 'LDO',
          "value": true,
        },
        {
          "item_name": 'VATRA',
          "value": false,
        }
      ],
      "spec02": [
        {
          "item_name": 'PIN',
          "value": true,
        },
        {
          "item_name": '5pin',
          "value": true,
        }
      ],
      "spec03": [],
      // ...
      "spec29": [],
      "spec30": [],
    },
    "specTitle": ['Material Type', '長', '寬', '寬', '高( or 厚度)', '二次加工工序', '包裝貼Label', '印刷區域','沖切方式','輔料',
        '承受力', null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null ]
}
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 404 group not found.
 *
 * @apiError 405 Method Not Allowed.
 *
 * @apiError 500 Internal Server Error.
 */
xrayRouter.get('/specgroup/:role', authHelpers.isJWTAuthenticated, xrays.fetchSpecGroupByGroupID)

/**
 *
 * @api {post} /xray/specgroup add Spec group
 * @apiName xray specgroup
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
 *    "role": "ME",
 *    "specGroupName": "SPEC_Group_180824",
 *    "sourcerList": ["S51", "S01"],
 *    "productType": ["NB"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "specGroup": {
 *      "spec01": ['LDO', 'VATRA'],
 *      "spec02": ['PIN', '5pin'],
 *      "spec03": [],
 *      "spec04": [],
 *      "spec05": [],
 *      "spec06": [],
 *      // ...
 *      "spec29": [],
 *      "spec30": [],
 *    },
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
   "specGroupID": "abcd-1111-feca-4444",
  }
 * @apiError 400 The Group Name already existed.
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/specgroup', authHelpers.isJWTAuthenticated, xrays.addSpecGroup)

/**
 *
 * @api {put} /xray/specgroup/:g_id modify Spec group
 * @apiName xray modify spec group
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} g_id spec group id
 * @apiParamExample  {json} Request-Example:
 * {
*    "role": "ME",
 *    "specGroupName": "SPEC_Group_180824",
 *    "sourcerList": ["S51", "S01"],
 *    "productType": ["NB"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "specGroup": {
 *      "spec01": ['LDO', 'VATRA'],
 *      "spec02": ['PIN', '5pin'],
 *      "spec03": [],
 *      // ...
 *      "spec29": [],
 *      "spec30": [],
 *    }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
   "specGroupID": "abcd-1111-feca-4444",
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 400 body parse error.
 * @apiError 404 The Group Name not found.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.put('/specgroup/:g_id', authHelpers.isJWTAuthenticated, xrays.modifySpecGroup)

/**
 *
 * @api {DELETE} /xray/specgroup/:g_id delete Spec group
 * @apiName xray delete spec group
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} g_id spec group id
 * @apiParamExample  {json} Request-Example:
 * {
    // none
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
   "specGroupID": "abcd-1111-feca-4444",
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 400 body parse error.
 * @apiError 404 The Group Name not found.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.del('/specgroup/:g_id', authHelpers.isJWTAuthenticated, xrays.deleteSpecGroup)


// ======== analysis ======
/**
 *
 * @api {post} /xray/spa/analysis/:role SPA 分析表
 * @apiName xray spa analysis table
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "dateFrom": "2018/02/08",  //若不選該條件則給null, 抓最新的
 *    "dateTo": "2018/08/08",
 *    "mrp": true,
 *    "block": true,
 *    "exp": false,
 *    "referencePN": "78.10612.5BL", //若分析by Category則為null
 *    "productType": ["Notebook", "Service"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "sourcer": [],
 *    "spec": {
 *      "spec01": ['LDO', 'VATRA'],
 *      "spec02": ['PIN', '5pin'],
 *      "spec03": [],
 *      "spec04": [],
 *      // ...
 *      "spec29": [],
 *      "spec30": [],
 *    },
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "referencePN": "78.10612.5BL", //若分析by Category則為null
    "manufacturer": "FOXCONN", //若分析by Category則為null
    "type1": "Add-on card",
    "type2": "Controller BD",
    "specProperty": ["spec4", "spec5","spec6","spec7"],
    "specOthers": ["spec1", "spec2", ...],
    "specTitle": {
      "spec01": "Voltage"
      "spec02": "ABC",
        ....
      "spec29": null,
      "spec30": null
    },
    "infoProperty": [
      "partNumber",
      "partDesc",
      "manufacturer",
      "vendor",
      "vendorPN",
      "supplyType",
      "mrp",
      "currency",
      "originalCurrency",
      "exchangeRate",
      "unitPrice"
      "priceDiff",
      "isCommonPart",
      "obs",
      "exp"
    ],
    "materialList": [
      {
        "infoList": {
          "partNumber": "020.80054.009",
          "partDesc": "FOXCONN",
          "manufacturer": "FOXCONN",
          "vendor": "200706",
          "vendorPN": "020.80054.009(2018.v01)",
          "supplyType": "M",
          "mrp": 20,
          "currency": "USD",
          "originalCurrency": "JPY",
          "exchangeRate": 0.27,
          "unitPrice": 0.32,
          "priceDiff": "0.1",
          "isCommonPart": false,
          "obs": "Y",
          "exp": "N",
        },
        "specList":{
          "spec4": "8bit AVR MCU",
          "spec5": "1K bytes Flash",
          "spec6": "1-Kbyte SRAM",
          "spec7": "512 Byte EEPROM"
        },
        "moreSpec": {
          "spec4": "8bit AVR MCU",
          "spec5": "1K bytes Flash",
          "spec6": "1-Kbyte SRAM",
          "spec7": "512 Byte EEPROM",
          "spec1": "A",
          "spec2": "B",
          "spec3": "C",
          "spec8": "D",
          ...
        }
      }
    ],
    "minUnitPrice": 0.001,
    "maxUnitPrice": 3.52,
    "supplyTypeList": ["A", "M", "C"]
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/spa/analysis/:role', authHelpers.isJWTAuthenticated, xrays.spaAnalysis)

/**
 *
 * @api {post} /xray/spa/export/:role SPA export excel
 * @apiName xray spa export excel
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "dateFrom": "2018/02/08",  //若不選該條件則給null, 抓最新的
 *    "dateTo": "2018/08/08",
 *    "mrp": true,
 *    "block": true,
 *    "exp": false,
 *    "referencePN": "78.10612.5BL", //若分析by Category則為null
 *    "productType": ["Notebook", "Service"],
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "sourcer": [],
 *    "spec": {
 *      "spec01": ['LDO', 'VATRA'],
 *      "spec02": ['PIN', '5pin'],
 *      "spec03": [],
 *      "spec04": [],
 *      // ...
 *      "spec29": [],
 *      "spec30": [],
 *    },
 * }
 * // response for export function
 {
    "referencePN": "78.10612.5BL", //若分析by Category則為null
    "manufacturer": "FOXCONN", //若分析by Category則為null
    "type1": "Add-on card",
    "type2": "Controller BD",
    "specProperty": ["spec4", "spec5","spec6","spec7"],
    "specOthers": ["spec1", "spec2", ...],
    "specTitle": {
      "spec01": "Voltage"
      "spec02": "ABC",
        ....
      "spec29": null,
      "spec30": null
    },
    "infoProperty": [
      "partNumber",
      "partDesc",
      "manufacturer",
      "vendor",
      "vendorPN",
      "supplyType",
      "mrp",
      "currency",
      "originalCurrency",
      "exchangeRate",
      "unitPrice"
      "priceDiff",
      "isCommonPart",
      "obs",
      "exp"
    ],
    "materialList": [
      {
        "infoList": {
          "partNumber": "020.80054.009",
          "partDesc": "FOXCONN",
          "manufacturer": "FOXCONN",
          "vendor": "200706",
          "vendorPN": "020.80054.009(2018.v01)",
          "supplyType": "M",
          "mrp": 20,
          "currency": "USD",
          "originalCurrency": "JPY",
          "exchangeRate": 0.27,
          "unitPrice": 0.32,
          "priceDiff": "0.1",
          "isCommonPart": false,
          "obs": "Y",
          "exp": "N",
        },
        "specList":{
          "spec4": "8bit AVR MCU",
          "spec5": "1K bytes Flash",
          "spec6": "1-Kbyte SRAM",
          "spec7": "512 Byte EEPROM"
        },
        "moreSpec": {
          "spec4": "8bit AVR MCU",
          "spec5": "1K bytes Flash",
          "spec6": "1-Kbyte SRAM",
          "spec7": "512 Byte EEPROM",
          "spec1": "A",
          "spec2": "B",
          "spec3": "C",
          "spec8": "D",
          ...
        }
      }
    ],
    "minUnitPrice": 0.001,
    "maxUnitPrice": 3.52,
    "supplyTypeList": ["A", "M", "C"]
  }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名TBD
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/spa/export/:role', authHelpers.isJWTAuthenticated, xrays.spaExport)

/**
 *
 * @api {post} /xray/lpp/analysis/:role LPP 分析圖
 * @apiName xray lpp analysis table
 * @apiGroup XRAY
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} role 為 ME or EE
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "mrp": true,
 *    "type1": "Add-on card",
 *    "type2": "Controller BD",
 *    "specGroup": {
 *      "spec01": ['LDO', 'VATRA'],
 *      "spec02": ['PIN', '5pin'],
 *      "spec03": [],
 *      "spec04": [],
 *      // ...
 *      "spec29": [],
 *      "spec30": [],
 *    }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "materialPriceList": [
      {
        specCombination: ["CHIP RES", "402"],
        lowestPrice: 1.1,
        averageValue: 5.2,
        materialList: [
          {
            partNumber: "aaa.bbb.ccc",
            price: 3.2,
            supplyType: A,
          }, {
            partNumber: "aaa.bbb.ccc",
            price: 3.2,
            supplyType: A,
          }
        ]
      }, {
        specCombination: ["SMD", "WIREWOUND"],
        lowestPrice: 1.1,
        averageValue: 5.2,
        materialList: [
          {
            partNumber: "aaa.bbb.ccc",
            price: 3.2,
            supplyType: A,
          }, {

          }
        ]
      },
   ],
    "supplyTypeList": ["A", "M", "C"]
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 */
xrayRouter.post('/lpp/analysis/:role', authHelpers.isJWTAuthenticated, xrays.lppAnalysis)

/**
 *
 * @api {post} /spa/multiple/partnumber/analysis 多條料號 SPA分析結果 Excel
 * @apiName 多條料號 SPA分析結果 Excel for export function
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 *  * @apiParamExample  {json} Request-Example:
 * {
 *    "mrp": true,
 *    "exp": true,
 *    "obs": true,
 *    "cmp": {
 *      'Y': ture,
 *      'N': false,
 *    },
 *    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
 * }
 *
 * // response for export function
 {
    "importFile": "",
    "importDate": "yyyymmdd hh:mm",
    "unit": "USD",
    "exchangeRateDefaultList": [{
      exchange_rate: null,
      "RMB": 0.145,
    }, {
      exchange_rate: null,
      "NTD": 0.35,
    }, {
      exchange_rate: null,
      "JPY": 0.75,
    }],
    "exchangeRateForSheet": [{
      "from": "NTD",
      "to": "USD",
      "sap_exchange_rate": 0.35,
      "date": "2019-09-05",
    }],
    "summaryType": {
      "ODM": {
        "type1Cost": {
          "ASIC": {
            "subItems": [{
              "type1": "ASIC",
              "type2": "DP",
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
              }, {
              "type1": "ASIC",
              "type2": "HDMI",
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
            }],
            "subTotalCost": {
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
            },
          },
        },
        "type1TotalCost": {
          "lastPrice": "$2",
          "suggestionCost": "$1.5",
          "opportunity": "$0.5",
          "opportunityPercent": "0.25%"
        }
      },
      "OEM": {}
    },
    "summaryByVendor": {
      "ODM": {
        "type1Cost": {
          "ASIC": {
            "subItems": [{
              "type1": "ASIC",
              "manufacturer": "ANALOGIX",
              "vendorName": "EDOM",
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
            }, {
              "type1": "ASIC",
              "manufacturer": "DIODES",
              "vendorName": "WTMEC",
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
            }],
            "subTotalCost": {
              "lastPrice": "$2",
              "suggestionCost": "$1.5",
              "opportunity": "$0.5",
              "opportunityPercent": "0.25%"
            },
          },
        },
        "type1TotalCost": {
          "lastPrice": "$2",
          "suggestionCost": "$1.5",
          "opportunity": "$0.5",
          "opportunityPercent": "0.25%"
        }
      },
      "OEM": {}
    },
    "spaRawData": [{
      data: [{
        "wistronPN": "5050001900G$CA",
        "spaPartNumber": "071.03204.0003",

        "spaDescription": "IC AUDIO CODEC ALC3204-CG MQFN 40P",
        "spaManufacturer": "REALTEK",
        "spaVendor": "WINTECH",
        "spaVendorPN": "ALC3204-CG",
        "spaSupplyType": "W",

        "spaCurrency": "USD",
        "spaLastPrice": 0.27,
        "spaOriginalCurrency": "USD",
        "spaOriginalPrice": 0.27,
        "spaValidFrom": "2019-07-01",
        "spaPriceDiff": "15.22%",

        "spaMrp": "1,993,689",
        "spaCmp": "Y",
        "spaObs": "Y",
        "spaExp": "Y",

        "spec01": "CODEC",
        "spec02": "HD-A",
          ...,
        "spec29": "0~70",
        "spec30": "COMMERCIAL",
      }, {
        ...,
      }, {
        ...,
      }]
      key: "5050001900G$CA",
    }],
    "opportunityPN": [{
      "no" 1,
      "purGroup": "S73",
      "oemODM": "ODM",
      "typeI", "ASIC",
      "typeII", "Audio",
      "wistronPN": "071.03204.0003",
      "description": "IC AUDIO CODEC ALC3204-CG MQFN 40P",
      "manufacturer": "REALTEK",
      "vendorName": "WINTECH",
      "vendorPN": "ALC3204-CG",
      "supplyType": "W",

      "price": 0.27,
      "currency": "USD",
      "originalCurrency": "USD",
      "originalPrice": 0.27,
      "validFrom": "2019Q4Price",
      "mrp": "1,993,689",
      "cmp": "Y",
      // ---藍色---
      "spaPartNumber": "071.03204.0003",
      "spaDescription": "IC AUDIO CODEC ALC3204-CG MQFN 40P",
      "spaVendor": "WINTECH",
      "spaManufacturer": "REALTEK",
      "spaVendorPN": "ALC3204-CG",
      "spaSupplyType": "W",
      "spaMrp": "1,993,689",
      "spaCurrency": "USD",
      "spaLastPrice": 0.27,
      "spaOriginalCurrency": "USD",
      "spaOriginalPrice": 0.27,
      "spaValidFrom": "2019-07-01",
      "spaCmp": "Y",
      "spaObs": "Y",
      "spaExp": "Y",
      // ---藍色---
      // ---黃色---
      "altPartNumber": "071.03204.0003",
      "altDescription": "IC AUDIO CODEC ALC3204-CG MQFN 40P",
      "altVendor": "WINTECH",
      "altManufacturer": "REALTEK",
      "altVendorPN": "ALC3204-CG",
      "altSupplyType": "W",
      "altMrp": "1,993,689",
      "altCurrency": "USD",
      "altLastPrice": 0.27,
      "altOriginalCurrency": "USD",
      "altOriginalPrice": 0.27,
      "altValidFrom": "2019-07-01",
      "altCmp": "Y",
      "altObs": "Y",
      "altExp": "Y",
      // ---黃色---
      // ---綠色---
      "suggCmp": "Y",
      "suggObs": "Y",
      "suggExp": "Y",
      "suggPartNumber": "071.03204.0003",
      "suggDescription": "IC AUDIO CODEC ALC3204-CG MQFN 40P",
      "suggLastPrice": 0.27,
      "opportunity": 0.005,
      "opportunityPercent": "50%",
      "suggInAltGroup": "Y",
      "suggFrom": "ALT"
      // ---綠色---
    }],
  }

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_XRay_SPA_Summary_Sourcer_Cost_<date:YYYYmmdd>
  }
 *
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/analysis
 */
xrayRouter.post('/spa/multiple/partnumber/analysis', authHelpers.isJWTAuthenticated, newMultiAnalysis.analysisSourcerMultiPN)

/**
 *
 * @api {post} /spa/multiple/partnumber/readFileAndCheck?type=Bom 多條料號 SPA分析import and check
 * @apiName 多條料號 SPA分析 Excel import and check
 * @apiGroup Multi SPA Analysis
 * @apiParam  {String} type 為 Bom or sourcer
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
    "passCount": 10,
    "failCount": 3
    "failMessage": [
      {
        "item": 1,
        "errorCode": "X000101"
      },
      {
        "item": 2,
        "errorCode": "X000102"
      },
      {
        "item": 3,
        "errorCode": "X000103"
      },
    ]
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/readFileAndCheck
 */
xrayRouter.post('/spa/multiple/partnumber/readFileAndCheck', authHelpers.isJWTAuthenticated, newMultiAnalysis.readFileAndCheck)

/**
 *
 * @api {delete} /spa/multiple/partnumber/cancel?uploadId=c5ac70a5-4b36-4be3-858d-128ee9a9a4d9 取消多條料號 SPA分析
 * @apiName 取消多條料號 SPA分析
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
  }
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/cancel?uploadId=c5ac70a5-4b36-4be3-858d-128ee9a9a4d9
 */
xrayRouter.delete('/spa/multiple/partnumber/cancel', authHelpers.isJWTAuthenticated, newMultiAnalysis.deleteTempImportData)

/**
 *
 * @api {get} /spa/multiple/template/download 下載 multiple SPA analysis template
 * @apiName 下載 multiple SPA analysis template
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/template/download
 */
xrayRouter.get('/spa/multiple/template/download', authHelpers.isJWTAuthenticated, newMultiAnalysis.downloadTemplate)

/**
 *
 * @api {post} /spa/multiple/partnumber/Bom/analysis Bom 多條料號 SPA分析結果
 * @apiName Bom 多條料號 SPA分析結果 Excel for export function
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "mrp": true,
 *    "exp": true,
 *    "obs": true,
 *    "cmp": {
 *      'Y': ture,
 *      'N': false,
 *    },
 *    "purchaseOrg": "PWCD",
 *    "uploadId": "c5ac70a5-4b36-4be3-858d-128ee9a9a4d9",
 * }
 *
 * // export 資料格式與 analysisSourcerMultiPN 相同
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_XRay_SPA_Summary_BOM_<date:YYYYmmdd>
  }
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/Bom/analysis
 */

xrayRouter.post('/spa/multiple/partnumber/Bom/analysis', authHelpers.isJWTAuthenticated, newMultiAnalysis.analysisBomMultiPN)

/**
 *
 * @api {post} /spa/multiple/partnumber/Cmp/analysis Cmp 多條料號 SPA分析結果
 * @apiName Cmp 多條料號 SPA分析結果 Excel for export function
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 *  * @apiParamExample  {json} Request-Example:
 * {
 *    "mrp": true,
 *    "exp": true,
 *    "obs": true,
 *    "cmp": {
 *      'Y': ture,
 *      'N': false,
 *    }
 * }
 *
 * // export 資料格式與 analysisSourcerMultiPN 相同
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_XRay_SPA_Summary_CMP_<date:YYYYmmdd>
  }
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/Cmp/analysis
 */

xrayRouter.post('/spa/multiple/partnumber/Cmp/analysis', authHelpers.isJWTAuthenticated, newMultiAnalysis.analysisCmpMultiPN)

/**
 *
 * @api {get} /spa/multiple/partnumber/purchaseOrg purchase Org list
 * @apiName purchase Org list
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *
 * ['PWCD', 'PWZS']
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/partnumber/purchaseOrg
 */
xrayRouter.get('/spa/multiple/partnumber/purchaseOrg', authHelpers.isJWTAuthenticated, newMultiAnalysis.getPurchaseOrg)

/**
 *
 * @api {get} /spa/multiple/bom/template/download 下載 BOM multiple SPA analysis template
 * @apiName 下載 BOM multiple SPA analysis template
 * @apiGroup Multi SPA Analysis
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError 401 Account or Password is not correct.
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 * @apiSampleRequest /xary/spa/multiple/template/download
 */
xrayRouter.get('/spa/multiple/bom/template/download', authHelpers.isJWTAuthenticated, newMultiAnalysis.downloadBomTemplate)


module.exports = xrayRouter
