const router = require('koa-router')
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()
const costgen = require('../../../api/cleanSheet/costgen.js')

const costgenRouter = new router()
const costgens = new costgen()
/**
 *
 * @api {get} /costgen/database Get database
 * @apiName Get database
 * @apiGroup CostGenerator
 * @apiDescription 取得計算機 base data
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type Table type ex. Screw, Fan
 * @apiSuccess {Object} _tabletype_ Table Type
 * @apiSuccess {Object} _tabletype_._tablename_ Table Name
 * @apiSuccess {Object[]} _tabletype_._tablename_.header Table欄位定義
 * @apiSuccess {Object} _tabletype_._tablename_.header.key Table欄位名稱(unique)
 * @apiSuccess {Object} _tabletype_._tablename_.header.name Table欄位描述
 * @apiSuccess {Object} _tabletype_._tablename_.header.typeof Table欄位型態
 * @apiSuccess {Object[]} _tabletype_._tablename_.data Table資料內容
 * @apiSuccessExample {json} Success-Response:
{
    "Screw": {
        "polishedRodTable": {
            "header": [
                {
                    "key": "type",
                    "name": "光桿",
                    "typeof": "string"
                }
            ],
            "data": [
                { "type": "Yes" },
                { "type": "No" }
            ]
        }
    },
    "Fan": {
        "fanTypeTable": {
            "header": [
                {
                    "key": "fanType",
                    "name": "風扇類型",
                    "typeof": "string"
                }
            ],
            "data": [
                { "fanType": "Axial(軸流扇)" },
                { "fanType": "Blower(離心扇)" },
                { "fanType": "Cross Flow Fan(橫流扇)" }
            ]
        },
        "fanSizeTable": {
            "header": [
                {
                    "key": "fanSize",
                    "name": "Size",
                    "typeof": "string"
                },
                {
                    "key": "price",
                    "name": "價格",
                    "typeof": "number"
                }
            ],
            "data": [
                { "fanSize": "60*60*3.5", "price": 5.5 },
                { "fanSize": "60*60*4", "price": 3.7 },
                { "fanSize": "60*60*4.5", "price": 3.5 },
                { "fanSize": "60*60*5", "price": 2.5 },
                { "fanSize": "60*60*5.5", "price": 2.1 },
                { "fanSize": "60*60*6", "price": 1.75 },
                { "fanSize": "60*60*6.5", "price": 1.65 },
                { "fanSize": "60*60*7", "price": 1.4 },
                { "fanSize": "60*60*7.5", "price": 1.4 },
                { "fanSize": "80*80*5.5", "price": 2.2 }
            ]
        },
        "motorArchitectureTable": {
            "header": [
                {
                    "key": "type",
                    "name": "馬達",
                    "typeof": "string"
                },
                {
                    "key": "price",
                    "name": "價格",
                    "typeof": "number"
                }
            ],
            "data": [
                { "type": "1_phase_H<=7.5", "price": 0 },
                { "type": "3_phase_H<=4.5", "price": 0 },
                { "type": "3_phase_H>=5.0", "price": 0.25 }
            ]
        },
        "bearingAndSleeveTable": {
            "header": [
                {
                    "key": "type",
                    "name": "軸承+套筒類別",
                    "typeof": "string"
                },
                {
                    "key": "price",
                    "name": "價格",
                    "typeof": "number"
                }
            ],
            "data": [
                { "type": "Sleeve+塑膠_H<=7.5", "price": 0 },
                { "type": "Sleeve+金屬_H<=7.5", "price": 0 },
                { "type": "FDB+金屬_H<=4.5", "price": 0 },
                { "type": "FDB+金屬_H>=5.0", "price": 0.35 }
            ]
        },
        "fanBladeMaterialTable": {
            "header": [
                {
                    "key": "type",
                    "name": "扇葉材料",
                    "typeof": "string"
                },
                {
                    "key": "price",
                    "name": "價格",
                    "typeof": "number"
                }
            ],
            "data": [
                { "type": "PBT_H<=7.5", "price": 0 },
                { "type": "LCP_H<= 5.5", "price": 0.1 },
                { "type": "LCP_H>=6", "price": 0.6 }
            ]
        },
        "magnetMaterialAndSizeTable": {
            "header": [
                {
                    "key": "type",
                    "name": "磁石材料",
                    "typeof": "string"
                },
                {
                    "key": "price",
                    "name": "價格",
                    "typeof": "number"
                }
            ],
            "data": [
                { "type": "橡膠_H<=7.5", "price": 0 },
                { "type": "MQ_H<= 5.5", "price": 0.1 },
                { "type": "MQ_H>=6", "price": 0.15 }
            ]
        },
        "materialTable": {
            "header": [
                {
                    "key": "type",
                    "name": "材質",
                    "typeof": "string"
                }
            ],
            "data": [
                { "type": "有鹵" },
                { "type": "無鹵" }
            ]
        }
    },
    "Fin": {
        "densityTable": {
            "header": [
                {
                    "key": "material",
                    "name": "材料",
                    "typeof": "string"
                },
                {
                    "key": "density",
                    "name": "密度",
                    "typeof": "number"
                },
                {
                    "key": "price",
                    "name": "Price USD",
                    "typeof": "number"
                }
            ],
            "data": [
                { "material": "AL1050", "density": 2.71, "price": 2.71 },
                { "material": "CU1100", "density": 8.9, "price": 8.9 }
            ]
        },
        "materialCostPerKilogramTable": {
            "header": [
                {
                    "key": "material",
                    "name": "材料",
                    "typeof": "string"
                },
                {
                    "key": "materialThickness",
                    "name": "材料厚度",
                    "typeof": "number"
                },
                {
                    "key": "materialCostPerKilogram",
                    "name": "材料每公斤費用",
                    "typeof": "number"
                }
            ],
            "data": [
                { "material": "AL1050", "materialThickness": 0.1, "materialCostPerKilogram": 4.2 },
                { "material": "AL1050", "materialThickness": 0.2, "materialCostPerKilogram": 4.2 },
                { "material": "AL1050", "materialThickness": 0.3, "materialCostPerKilogram": 4.2 },
                { "material": "CU1100", "materialThickness": 0.1, "materialCostPerKilogram": 4.5 },
                { "material": "CU1100", "materialThickness": 0.2, "materialCostPerKilogram": 4.5 },
                { "material": "CU1100", "materialThickness": 0.3, "materialCostPerKilogram": 4.5 }
            ]
        }
    },
}
 *
 */
costgenRouter.get('/database', authHelpers.isJWTAuthenticated, costgens.getDatabase)
/**
 *
 * @api {post} /costgen/result Result Export
 * @apiName Result Export
 * @apiGroup CostGenerator
 * @apiDescription 輸出計算機Result
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {Object[]} _type_ Part category (type) ex. Screw, Fan, Fin... 共計14項
 * @apiParam  {string} _type_.name 品名
 * @apiParam  {number} _type_.unitprice 單價
 * @apiParam  {number} _type_.usage 用量
 * @apiParam  {object} _type_.data 料屬性 [optional]
 * @apiParam  {object} _type_.loss Lost rate [optional], default 0.015
 * @apiParam  {object} _type_.assysec 組裝工時(sec) [optional], default 12
 * @apiParamExample  {json} Request-Example:
 * {
 *  "Fin": [
 *      { "name": "Fin 1", "unitprice": 0.3748, "usage": 1, "data": {} }
 *  ],
 *  "Fan": [
 *      { "name": "Block", "unitprice": 3.6000, "usage": 1, "data": {} }
 *  ],
 *  "Screw": [],
 *  "ThermalPlate": [
 *      { "name": "Plate 1", "unitprice": 0.2410, "usage": 1, "data": {} }
 *      { "name": "Plate 2", "unitprice": 0.7410, "usage": 3, "data": {} }
 *  ],
 *  "ThermalPad": [],
 *  "ThermalBlock": [
 *      { "name": "Block 1", "unitprice": 0.2410, "usage": 1, "data": {} }
 *  ],
 *  "Pipe": [
 *      { "name": "Pipe", "unitprice": 1, "usage": 1, "data": {} }
 *  ],
 *  "Sponge": [],
 *  "Grease": [],
 *  "Spring": [],
 *  "ORing": [],
 *  "Label": [],
 *  "Clip": [],
 *  "PushPin": []
 * }
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
 *
 */
costgenRouter.post('/result', costgens.getResult)
/**
 *
 * @api {get} /costgen/tables Get table list
 * @apiName Get Tables
 * @apiGroup CostGenerator
 * @apiDescription 取得Table(database)列表
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} type Table type ex. Screw, Fan
 * @apiParam  {String} orderBy ex. tableType,-updateDate
 *
 * @apiSuccess {Object[]} tableList Table List
 * @apiSuccess {String} tableList.tableType Table type
 * @apiSuccess {String} tableList.tableName Table name
 * @apiSuccess {String} tableList.updateBy Last update user
 * @apiSuccess {String} tableList.updateDate Last update time
 * @apiSuccess {String} tableList.version Table version
 * @apiSuccessExample {json} Success-Response:
 {
    "list": [
      {
        "tableType": "Screw",
        "tables": [
            {
                "tableName": "polishedRodTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/09/16 14:26:00",
                "version": "v02"
            }
        ]
      },
      {
        "tableType": "Fan",
        "tables": [
            {
                "tableName": "fanTypeTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/09/16 14:26:00",
                "version": "v02"
            },
            {
                "tableName": "fanSizeTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/09/16 14:26:00",
                "version": "v02"
            },
            {
                "tableName": "motorArchitectureTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/08/09 13:50:30",
                "version": "v02"
            },
            {
                "tableName": "bearingAndSleeveTable",
                "updateBy": "Jin Chiu",
                "updateDate": "2018/08/09 13:50:30",
                "version": "v01"
            },
            {
                "tableName": "fanBladeMaterialTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/08/09 13:50:30",
                "version": "v02"
            },
            {
                "tableName": "materialTable",
                "updateBy": "Claire Chen",
                "updateDate": "2018/08/09 13:50:30",
                "version": "v02"
            }
        ]
      },
      {
        "tableType": "Fin",
        "tables": [
            {
                "tableName": "densityTable",
                "updateBy": "Sam Chen",
                "updateDate": "2018/09/16 14:26:00",
                "version": "v02"
            }
        ]
      },
    ]
 }
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
costgenRouter.get('/tables', authHelpers.isJWTAuthenticated, costgens.getTables)
/**
 *
 * @api {get} /costgen/table/:type/:name Table Download
 * @apiName Table Download
 * @apiGroup CostGenerator
 * @apiDescription 取得Table內容, 下載Excel
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} type Table type ex. Screw, Fan
 * @apiParam  {String} name Table name ex. polishedRodTable, fanTypeTable
 *
 * @apiSuccess 200 Excel download, 檔名TBD *
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
costgenRouter.get('/table/:type/:name', authHelpers.isJWTAuthenticated, costgens.exportDatabase)
/**
 *
 * @api {put} /costgen/table/:type/:name Table Upload
 * @apiName Table Upload
 * @apiGroup CostGenerator
 * @apiDescription 上傳Excel, 修改Table內容
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} type Table type ex. Screw, Fan
 * @apiParam  {String} name Table name ex. polishedRodTable, fanTypeTable
 * @apiParam  {Buffer} file Excel file
 *
 * @apiSuccess {String} type Table type
 * @apiSuccess {String} name Table name
 * @apiSuccess {String} version Version
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "type": "Fan",
    "name": "FanType",
    "version": "V02"
}
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
costgenRouter.put('/table/:type/:name', authHelpers.isJWTAuthenticated, costgens.uploadData)
/**
 *
 * @api {get} /costgen/types Get type list
 * @apiName Get Table Types
 * @apiGroup CostGenerator
 * @apiDescription (database) 取得Table type列表
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String[]} list Type List
 * @apiSuccessExample {json} Success-Response:
 {
    "list": ["Pipe", "Screw", "Fin", "ThermalBlock", "Grease", "Sponge", "Fan", "ThermalPad", "ThermalPlate"]
 }
 * @apiError 4XX Update failed (Table not found)
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
costgenRouter.get('/types', authHelpers.isJWTAuthenticated, costgens.getTypes)

/**
 *
 * @api {post} /costgen/table/:type/:name Table generate
 * @apiName Table Generate
 * @apiGroup CostGenerator
 * @apiDescription 新增/更新Table Header/Data 
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} type Table type ex. Screw, Fan
 * @apiParam  {String} name Table name ex. polishedRodTable, fanTypeTable
 * @apiParamExample  {json} Request-Example:
 * {
        "header": [
            { "key": "outerDiameter", "name": "外徑", "typeof": "string" },
            { "key": "flatteningThickness", "name": "打扁", "typeof": "string" },
            { "key": "math", "name": "數學", "typeof": "number" },
            { "key": "cost", "name": "cost", "typeof": "number" }
        ],
        "data": [
            { "outerDiameter": "D4_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 },
            { "outerDiameter": "D4_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.15 },
            { "outerDiameter": "D4_", "flatteningThickness": "1.6mm", "math": 1.6, "cost": 0.2 },
            { "outerDiameter": "D4_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.25 },
            { "outerDiameter": "D4_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.35 },
            { "outerDiameter": "D4_", "flatteningThickness": "1.0mm", "math": 1.0, "cost": 0.45 },
            { "outerDiameter": "D4_", "flatteningThickness": "0.8mm", "math": 0.8, "cost": 0.6 },
            { "outerDiameter": "D4_", "flatteningThickness": "0.6mm", "math": 0.6, "cost": 0.8 },
            { "outerDiameter": "D6_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 },
            { "outerDiameter": "D6_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.15 },
            { "outerDiameter": "D6_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.25 },
            { "outerDiameter": "D6_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.35 },
            { "outerDiameter": "D6_", "flatteningThickness": "1.0mm", "math": 1.0, "cost": 0.45 },
            { "outerDiameter": "D6_", "flatteningThickness": "0.8mm", "math": 0.8, "cost": 0.6 },
            { "outerDiameter": "D8_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 },
            { "outerDiameter": "D8_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.25 },
            { "outerDiameter": "D8_", "flatteningThickness": "1.6mm", "math": 1.6, "cost": 0.3 },
            { "outerDiameter": "D8_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.4 },
            { "outerDiameter": "D8_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.5 },
            { "outerDiameter": "D8_", "flatteningThickness": "1.0mm", "math": 1.0, "cost": 0.6 }
        ]
    }
 *
 * @apiSuccess 200 Create, Update success
 * @apiError 405 Method Not Allowed.
 * @apiError 500 Internal Server Error.
 *
 */
costgenRouter.post('/table/:type/:name', authHelpers.isJWTAuthenticated, costgens.postHeaderAndData)
/**
*
* @api{get} /costgen/export/cleansheet get cleansheet/partlist export excel file
* @apiName get cleansheet/partlist export excel file
* @apiGroup CostGenerator
* @apiHeader {String} Authorization Bearer access-token.
* @param {number} bomId ME Bom ID
* @param {array} partlistFormates Partlist format, ex: [hosuing-metal, housing-plastic]
* @param {string} versionId ME Bom's version, latest version should be 'CURRENT'
*
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_CleanSheet_ME__<Partlist Type>_<date:YYYYmmdd>
  }
* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 bomId, versionId, partlistFormat required
 * @apiError 500 ME bom project not found
 * @apiError 500 Cleansheet export setting not found
 * @apiSampleRequest /costgen/export/cleansheet?bomId=251&partlistFormat=housing-metal&versionId=CURRENT
 */
costgenRouter.get('/export/cleansheet', authHelpers.isJWTAuthenticated, costgens.exportMeCleanSheet)
/**
*
* @api{get} /costgen/export/cleansheet get cleansheet/partlist export excel file
* @apiName get cleansheet/partlist export excel file
* @apiGroup CostGenerator
* @apiHeader {String} Authorization Bearer access-token.
* @param {number} bomId ME Bom ID
* @param {array} partlistFormates Partlist format, ex: [hosuing-metal, housing-plastic]
* @param {string} versionId ME Bom's version, latest version should be 'CURRENT'
*
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_CleanSheet_ME__<Partlist Type>_<date:YYYYmmdd>
  }
* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 bomId, versionId, partlistFormat required
 * @apiError 500 ME bom project not found
 * @apiError 500 Cleansheet export setting not found
 * @apiSampleRequest /costgen/export/cleansheet?bomId=251&partlistFormat=housing-metal&versionId=CURRENT
 */
costgenRouter.get('/export/quotation', authHelpers.isJWTAuthenticated, costgens.exportMeQuotation)
costgenRouter.get('/export/settings', costgens.getPartlistSetting)
costgenRouter.get('/export/keypath',  costgens.getKeyPath)

module.exports = costgenRouter
