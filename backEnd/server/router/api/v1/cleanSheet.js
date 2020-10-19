const router = require('koa-router')
const authHelper = require('../../../helpers/authHelper/index.js')
const authHelpers = new authHelper()
const cleanSheet = require('../../../api/cleanSheet/cleanSheet.js')
const me = require('../../../api/cleanSheet/me.js')

const cleanSheetRouter = new router()
const cleanSheets = new cleanSheet()
const mes = new me()

cleanSheetRouter.get('/calc', cleanSheets.cleanSheetCalc)
/**
 *
 * @api {get} /cleansheet/projects/ce CE Project List
 * @apiName CE Project List
 * @apiGroup CleanSheet-CE
 * @apiDescription (1-0) CE可看到的trigger project list (含底下ME)
 *
 * @apiParam  {Integer} page 頁次 ex. ?page=10&page_size=5
 * @apiParam  {Integer} page_size 單頁數量
 * @apiParam  {Integer} sort ex. -manufacture+model
 * @apiParam  {Integer} filter ex. ?color=red
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "projectList": [
 *      {
 *          "projectCode" : "91.73F41.301",
 *          "projectName": "SOFHD_42_MT01_PA",
 *          "product": "TV", //PRODUCTTYPE
 *          "bg": "CPBG", //用PROFITCENTER mapping V_BUSINESSORG_BO
 *          "stage": "C0",
 *          "stageName": "RFI", //用stage+pruduct+customer去mapping stage name
 *          "sourcerCost": 950.0,
 *          "systemCost": 950.0,
 *          "currency": "USD",
 *          "productSpec": "14\"",
 *          "costBOMVersion": "V.02",   //當前stage的最後一個版本
 *          "bomFileDate": "2014/09/05 18:39:20",
 *          "lastSubmitBy": "Sky Lin", //ME
 *          "lastSubmitDate": "2014/09/05 18:39:20",
 *          "confirmedBy": "CE Wang", //CE
 *          "confirmedDate": "2014/09/05 18:39:20",
 *      },
 * ]
 * }
 *
 */
cleanSheetRouter.get('/projects/ce', cleanSheets.cleanSheet)

/**
 *
 * @api {GET} /cleansheet/projects/me ME Project List
 * @apiName Get ME Project List
 * @apiGroup CleanSheet-ME
 * @apiDescription (5-0) ME可看到的trigger project list
 * @apiParam  {Integer} pages 頁次 ex. ?page=10&items=10
 * @apiParam  {Integer} items 單頁數量
 * @apiParam  {String} orderBy ex. projectCode,-product
 * @apiParam  {String}  key ex. ?key=projectName
 * @apiParam  {String}  keyword ex. ?keyword=Bucky
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "numberOfProjects": 1,
 *  "projectList": [
 *      {
 *          "projectCode" : "91.73F41.301",
 *          "projectName": "SOFHD_42_MT01_PA",
 *          "product": "TV", //PRODUCTTYPE
 *          "bg": "CPBG", //用PROFITCENTER mapping V_BUSINESSORG_BO
 *          "stage": "C0",
 *          "stageName": "RFI", //用stage+pruduct+customer去mapping stage name
 *          "sourcerCost": 950.0,
 *          "systemCost": 950.0,
 *          "currency": "USD",
 *          "productSpec": "14\"",
 *          "lastSubmitBy": "Sky Lin", //ME
 *          "confirmedBy": "CE Wang", //CE
 *          "bomFileDate": "2014/09/05 18:39:20"
 *      },
 * ]
 * }
 *
 *
 */
cleanSheetRouter.get('/projects/me', authHelpers.isJWTAuthenticated, mes.meProjectList)

/**
 *
 * @api {GET} /cleansheet/projects/plm PLM Project List
 * @apiName Get PLM Project List
 * @apiGroup CleanSheet-ME
 * @apiDescription (7-0) PLM的全緯創Project List (Trigger新增用)
 *
 * @apiParam  {String} filter projectCode, projectName, bg, product ex. ?projectCode=91.73F41.301
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "projectList": [
 *      {
 *          "projectCode" : "91.73F41.301",
 *          "projectName": "SOFHD_42_MT01_PA",
 *          "product": "TV", //PRODUCTTYPE
 *          "bg": "CPBG", //用PROFITCENTER mapping V_BUSINESSORG_BO
 *          "stage": "C0",
 *          "stageName": "RFI", //用stage+pruduct+customer去mapping stage name
 *      },
 * ]
 * }
 *
 *
 */

cleanSheetRouter.get('/projects/plm', authHelpers.isJWTAuthenticated, cleanSheets.fetchPlm)

/**
 *
 * @api {GET} /cleansheet/project/:projectCode Get Single Project
 * @apiName Get Single Project
 * @apiGroup CleanSheet-ME
 * @apiDescription (5-1) 取得特定Porject資訊
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "projectCode" : "91.73F41.301",
 *  "projectName": "SOFHD_42_MT01_PA",
 *  "product": "TV",
 *  "bg": "CPBG",
 *  "stage": "C0",
 *  "stageName": "RFI",
 *  "productSpec": "14\"",
 *  "stageList": [
 *      {
 *          "stage": "C0",
 *          "stageNmae": "RFI",
 *          "currentVersion": "V0.2",
 *          "updateBy": "Travis Wu",
 *          "lastUpdateTime": "2018/08/09 13:50:30",
 *          "isActive": false  //當前版本
 *      },
 *      {
 *          "stage": "C0",
 *          "stageNmae": "RFQ",
 *          "currentVersion": "V0.3",
 *          "updateBy": "Travis Wu",
 *          "lastUpdateTime": "2018/08/09 13:50:30",
 *          "isActive": true  //當前版本
 *      },
 *     ]
 * }
 *
 *
 */
cleanSheetRouter.get('/project/:projectCode', authHelpers.isJWTAuthenticated, mes.meSingleProject)


/**
 *
 * @api {POST} /cleansheet/project/:projectCode/mebom ME BOM Download
 * @apiName POST ME BOM
 * @apiGroup CleanSheet-ME
 * @apiDescription (7-0) ME BOM 檔案下載 (需寫回product spec)
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     "projectCode" : "91.73F41.301",
 *     "projectName": "SOFHD_42_MT01_PA",
 *     "product": "TV",
 *     "bg": "CPBG",
 *     "stage": "C0",
 *     "stageName": "RFI",
 *     "productSpec": "14\""
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     EXCEL FILE
 * }
 *
 *
 */
cleanSheetRouter.post('/project/:projectCode/mebom', mes.meBomDownload)

/**
 *
 * @api {PUT} /cleansheet/project/:projectCode/mebom ME BOM Update
 * @apiName PUT ME BOM
 * @apiGroup CleanSheet-ME
 * @apiDescription (7-1) ME填完Part List的檔案上傳
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     上傳excel file
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  // 成功回傳欲新增的ME PROJECT JSON
 *  "projectCode" : "91.73F41.301",
 *  "idCMFFileDate": "V0.5",
 *  "initator": "Some people",
 *  "projectLeader": "Some people",
 *  "approveBy": "Some people",
 *  "costbomData": [
 *      {
 *          "partLevel": 1,
 *          "customerPN": "10KG8",
 *          "modifiedVersion": "",
 *          "partName": "LCD ASSY",
 *          "qty": 3,
 *      }
 *  ]
 *  // level 1: partName
 *  // level 2: 後面的內容, 全部都要填, 若真沒值要寫NA
 * }
 * @apiErrorExample {type} Error-Response:
 * {   //依form填的內容為主
 *     "errorList": [
 *         {
 *             "columeNmae": "A1",
 *             "errorReason": "Value is empty"
 *         }
 *     ]

 * }
 */
cleanSheetRouter.put('/project/:projectCode/mebom', mes.meBomUpdate)


/**
 *
 * @api {POST} /cleansheet/project/me Trigger Project
 * @apiName POST ME PROJECT
 * @apiGroup CleanSheet-ME
 * @apiDescription (7-0) Trigger Project, 將UPDATE上傳驗證無誤的內容新增一筆ME PROJECT記錄
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "bg": "CPBG",
 *  "projectName" : "Bucky N5 14\"",
 *  "projectCode" : "91.73F41.301",
 *  "product": "NB",
 *  "site": "WCD",
 *  "productSpec": "15\"",
 *  "bomFileDate": "2018/07/06",
 *  "bomVersion": "V01",
 *  "stage": "MP",
 *  "idCMFFileDate": "V0.5", //ME BOM excel A10 (目前不寫入DB)
 *  "initator": "Some people", //ME BOM excel A11 (目前不寫入DB)
 *  "projectLeader": "Some people",  //ME BOM excel A12 (目前不寫入DB)
 *  "approveBy": "Some people",  //ME BOM excel A13 (目前不寫入DB)
 *  "costbomData": [
 *      {
 *          "partLevel": 1,
 *          "customerPN": "10KG8",
 *          "modifiedVersion": "",
 *          "partName": "LCD ASSY",
 *          "qty": 3,
 *          //內容待補完(EXCEL15列後方欄位)
 *      }
 *  ]
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "message" : "Trigger Success",
 * }
 *
 *
 */
cleanSheetRouter.post('/project/me', authHelpers.isJWTAuthenticated, cleanSheets.triggerProjectME)

/**
 *
 * @api {get} /cleansheet/version/:versionCode/file/:fileType 檔案下載 File Download
 * @apiName Get File
 * @apiGroup CleanSheet-ME
 * @apiDescription 透過VersionCode及FileType下載檔案
 *
 * @apiParam  {String} versionCode 版本編碼
 * @apiParam  {String} fileType 檔案類型(eg. prebom, tooling)
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     excel file
 * }
 *
 *
 */
cleanSheetRouter.get('/version/:versionCode/file/:fileType', cleanSheets.cleanSheet)

/**
 *
 * @api {put} /cleansheet/version/:versionCode/file/:fileType 檔案上傳 File Update
 * @apiName Put File
 * @apiGroup CleanSheet-ME
 * @apiDescription 透過VersionCode及FileType上傳檔案
 *
 * @apiParam  {String} versionCode 版本編碼
 * @apiParam  {String} fileType 檔案類型(eg. prebom, tooling, & CostBOM)
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     excel file
 * }
 *
 *
 */
cleanSheetRouter.put('/version/:versionCode/file/:fileType', cleanSheets.cleanSheet)

/**
 *
 * @api {post} /cleansheet/files Files Submit
 * @apiName Post files
 * @apiGroup CleanSheet-ME
 * @apiDescription ME Submit all files to CE then wait confirm
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *  "prebom": {
 *      "versionCode": "",
 *      "fileID": ""
 *  },
 *  "tooling": {
 *      "versionCode": "",
 *      "fileID": ""
 *  },
 *  "thermal": {
 *      "versionCode": "",
 *      "fileID": ""
 *  },
 *  "speaker": {
 *      "versionCode": "",
 *      "fileID": ""
 *  },
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.post('/files', cleanSheets.cleanSheet)

/**
 *
 * @api {get} /cleansheet/version/:versionCode/costbom/view CostBOM View (Parts list)
 * @apiName Get CostBOM View
 * @apiGroup CleanSheet-CE
 * @apiDescription (2-0) CE看Project內的所有Part List with Cost
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     "partNumber": "",
 *     "partName": "",
 *     "functionCategory": "",
 *     "partsCategory1": "",
 *     "partsCategory2": "",
 *     "materialType": "",
 *     "remark": "",
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 */
cleanSheetRouter.get('/version/:versionCode/costbom/view', cleanSheets.cleanSheet)

/**
 *
 * @api {put} /cleansheet/version/:versionCode/costbom/part/:partID/soucercost 修改 Part Sourcer Cost
 * @apiName Put Part SourcerCost
 * @apiGroup CleanSheet-CE
 * @apiDescription (2-0) CE修改單一part的sourcer cost
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     "soucercost": 30.5
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.put('/version/:versionCode/costbom/part/:partID/soucercost', cleanSheets.cleanSheet)


/**
 *
 * @api {post} /cleansheet/version/:versionCode/costbom/priceconfirm Price Confirm
 * @apiName Post Price Confirm
 * @apiGroup CleanSheet-CE
 * @apiDescription (2-0) CE按下Price Confirm按鈕
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.post('/version/:versionCode/costbom/priceconfirm', cleanSheets.cleanSheet)

/**
 *
 * @api {get} /cleansheet/version/:versionCode/costbom/part/:partID/cleansheet Get Single Part Clean sheet
 * @apiName Get Single Part Clean sheet
 * @apiGroup CleanSheet-CE
 * @apiDescription (2-1) CE取得某一part的cleansheet明細
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "info": {
 *      "projectCode" : "91.73F41.301",
 *      "projectName": "SOFHD_42_MT01_PA",
 *      "product": "TV",
 *      "bg": "CPBG",
 *      "stage": "C0",
 *      "stageName": "RFI",
 *      "currency": "USD",
 *      "partName": "BUCKY N14 LCD Cover AL Silver",
 *      "site": "WCD"
 *      "partNumberAssy": "", //組合料號 (兩者只存其一)
 *      "partNumberSingle": "", //單件料號
 *      "bomFileDate": "2018/09/25",
 *      "vendor": "CNP",
 *      "productSpec": "14\"",
 *      "remark": ""
 *  },
 *  "cost": {
 *      "material": 300,    //A.材料費:
 *      "process": 500, //C.二次加工費:
 *      "component": 700,   //D.零件費:
 *      "stamping": 600,    //B.沖壓費:
 *      "package": 30,   //運包檢
 *      "profit": 3000, //管銷利潤為(沖壓費+二次加工費)*0.1(後端算給前端)
 *      // 總價即為上方加總=systemCost
 *      "sourceCost": 5000
 *  },
 *  "data": {
 *      "material": {},
 *      "process": {},
 *      "component": {},
 *      "stamping": {}
 *  }
 * }
 */
cleanSheetRouter.get('/version/:versionCode/costbom/part/:partID/cleansheet', cleanSheets.getSinglePartCleanSheet)


/**
 *
 * @api {put} /cleansheet/version/:versionCode/costbom/part/:partID/remark Update part remark
 * @apiName Put part remark
 * @apiGroup CleanSheet-CE
 * @apiDescription (2-0) 編輯REMARK
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *      "remark": "remark string string string"
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
cleanSheetRouter.put('/version/:versionCode/costbom/part/:partID/remark', cleanSheets.cleanSheet)

/**
 *
 * @api {get} /cleansheet/version/:versionCode/costbom/parts Get Parts List
 * @apiName Get parts list
 * @apiGroup CleanSheet-CE
 * @apiDescription (3-0) 取得特定類型的part list(給tab list用)
 *
 * @apiParam  {String} materialType material type (eg. metal)
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "partList": [
 *     {"partName": "BUCKY N14 LCD Cover 60 ASSY Silver", "partNumber": "460.0F706.0001", "partID": "EAC3-1123-23AF-3295"},
 *     {"partName": "BUCKY N14 LCD Cover AL Silver", "partNumber": "434.0F706.0001", "partID": "EAC3-2324-23AF-2312"},
 *     {"partName": "BUCKY_N14_LCD COVER INNER FRAME", "partNumber": "441.0F701.0001", "partID": "EAC3-1123-3435-3295"},
 *  ]
 * }
 *
 *
 */
cleanSheetRouter.put('/version/:versionCode/costbom/parts', cleanSheets.cleanSheet)


/**
 *
 * @api {GET} /cleansheet/project/:projectCode/chart/barchart [Chart] Get Bar Chart
 * @apiName Get Bar Chart
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-0) 取得Bar Chart, 呈現該Project by stage & by type(functionCategory, PartsCategory1, PartsCategory2 )的系統總價佔比
 *
 * @apiParam  {String} stage stage list (eg. "RFI", "RFQ")
 * @apiParam  {String} type X軸內容 (eg. functionCategory or PartsCategory1 or byPartsCategory2)
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {json} Request-Example:
 * {
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *  //TBD
 * }
 *
 *
 */
cleanSheetRouter.get('/project/:projectCode/chart/barchart', cleanSheets.cleanSheet)
/**
 *
 * @api {GET} /cleansheet/project/:projectCode/chart/stagechart [Chart] Get Stage Chart
 * @apiName Get Stage Chart
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-1) Stage Chart, 呈現該Project每一Stage最後的日期,系統價,採購價
 *
 * @apiSuccess (200) {type} name description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "stageList": [
 *      {"stageName": "RFI", "date": "2018/01/03", "systemCost": 560, "sourceCost": 530 },
 *      {"stageName": "RFQ", "date": "2018/01/05", "systemCost": 520, "sourceCost": 430 },
 *  ]
 * }
 *
 *
 */
cleanSheetRouter.get('/project/:projectCode/chart/stagechart', cleanSheets.cleanSheet)

/**
 *
 * @api {get} /cleansheet/project/:projectCode/:stage/versions Get BOM Version List
 * @apiName Get Versions
 * @apiGroup CleanSheet-CE
 * @apiDescription (1-1) Version List, 該Stage底下所有檔案版本列表
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *  "versionList": [
 *      {
 *          "bomFileDate": "2017/10/19 13:55:39",
 *          "bomVersion": "V0.1",
 *          "confirmBy": "Alan Chiu"
 *      },
 *      {
 *          "bomFileDate": "2017/10/20 13:55:39",
 *          "bomVersion": "V0.2",
 *          "confirmBy": "Bill Chiu"
 *      },
 *      {
 *          "bomFileDate": "2017/10/22 13:55:39",
 *          "bomVersion": "V0.3",
 *          "confirmBy": "Charles Chiu"
 *      }
 *  ]
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.get('/project/:projectCode/:stage/versions', cleanSheets.cleanSheet)


/**
 *
 * @api {get} /cleansheet/basedatas [BaseData] List
 * @apiName Get Base Data
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-2) Base data list, 列出目前所有base data
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.get('/basedatas', cleanSheets.cleanSheet)
/**
 *
 * @api {get} /cleansheet/basedata/:baseDataName [BaseData] Content List
 * @apiName Get Base Data Content
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-3) Base data (eg. Material price) content list
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.get('/basedata/:baseDataName', cleanSheets.cleanSheet)
/**
 *
 * @api {get} /cleansheet/basedata/:baseDataName/:baseDataItem/file [BaseData] Item file D/L
 * @apiName Get Base Data Item File
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-3) Base data item (eg. Metal) file download
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.get('/basedata/:baseDataName/:baseDataItem/file', cleanSheets.cleanSheet)

/**
 *
 * @api {put} /cleansheet/basedata/:baseDataName/:baseDataItem/file [BaseData] Item file Update
 * @apiName Put Base Data Item File
 * @apiGroup CleanSheet-CE
 * @apiDescription (4-3) Base data item (eg. Metal) file Update
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
cleanSheetRouter.put('/basedata/:baseDataName/:baseDataItem/file', cleanSheets.cleanSheet)
/**
*
* @api {post} /pcb PCB Calculator
* @apiName calculator pcb
* @apiGroup CleanSheet-CE
* @apiDescription calculator of PCBs
* @apiHeader {String} Authorization Bearer access-token
* @apiParam {object} [content] pcb detail
* @apiParam {object} [Price] pcb spec detail
* @apiParamExample  {json} Request-Example:
*[
  {
    "id": "d340fd12-fa3c-4bf4-b6c4-f73cb21ced88",
    "content": {
      "formData": {
        "pcbTab": {
          "PcbInfo": {
            "typeii": "PCB",
            "supply_type": "Empty"
          },
          "PcbManufacturer": {
            "manufacturer": "GCE"
          },
          "PcbContent": {
            "typei": "PCB",
            "SPEC01": null,
            "SPEC02": 0,
            "SPEC03": null,
            "SPEC04": 0,
            "SPEC05": 0,
            "SPEC06": 0,
            "SPEC07": 0,
            "SPEC08": null,
            "SPEC09": "Y",
            "SPEC10": null,
            "SPEC11": null,
            "SPEC12": null,
            "SPEC13": null,
            "SPEC14": null,
            "SPEC15": null,
            "SPEC16": 0,
            "SPEC17": [],
            "SPEC18": [],
            "SPEC19": [],
            "SPEC20": [],
            "SPEC21": null,
            "SPEC22": 0,
            "SPEC23": null,
            "SPEC24": null,
            "SPEC25": null,
            "SPEC26": null
          },
          "PcbRemarks": {
            "PcbStageNo": null,
            "remark": null
          }
        }
      },
      "Price": {
        "typeii": "PCB",
        "supply_type": "Empty",
        "manufacturer": "GCE",
        "typei": "PCB",
        "SPEC01": null,
        "SPEC02": 0,
        "SPEC03": null,
        "SPEC04": 0,
        "SPEC05": 0,
        "SPEC06": 0,
        "SPEC07": 0,
        "SPEC08": null,
        "SPEC09": "Y",
        "SPEC10": null,
        "SPEC11": null,
        "SPEC12": null,
        "SPEC13": null,
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": 0,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [],
        "SPEC21": null,
        "SPEC22": 0,
        "SPEC23": null,
        "SPEC24": null,
        "SPEC25": null,
        "SPEC26": null,
        "PcbStageNo": null,
        "remark": null,
        "wistronpn": "548.02701.00SA"
      },
      "spec": {
        "item": "548.02701.00SA",
        "typei": "PCB",
        "typeii": "PCB",
        "manufacturer": [
          "GCE",
          "HANNSTAR"
        ],
        "SPEC01": null,
        "SPEC02": null,
        "SPEC03": null,
        "SPEC04": null,
        "SPEC05": null,
        "SPEC06": null,
        "SPEC07": null,
        "SPEC08": null,
        "SPEC09": null,
        "SPEC10": null,
        "SPEC11": null,
        "SPEC12": null,
        "SPEC13": null,
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": null,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [],
        "SPEC21": null,
        "SPEC22": null,
        "SPEC23": null,
        "SPEC24": null,
        "SPEC25": null,
        "SPEC26": null,
        "SPEC27": null,
        "SPEC28": null,
        "SPEC29": null,
        "SPEC30": null,
        "PcbStageNo": null,
        "supply_type": "Empty"
      }
    },
    "calcost": {
      "adderRules": {},
      "usdRules": {},
      "basePrices": {},
      "adder": [
        0
      ],
      "usd": {
        "GCE": []
      },
      "adderItems": {
        "GCE": [
          []
        ]
      },
      "result": {
        "formula1": null,
        "formula2": 0,
        "formula3": null,
        "formula4": null,
        "formula5": null,
        "formula6": null,
        "other5Adder": 0,
        "sapPrice": "3.1253",
        "originCurrency": "RMB",
        "currency": "USD",
        "exchangeDate": null,
        "sum_adder": 0
      },
      "highest_last_price_info": {
        "unitPrice": "3.22",
        "validDate": "2018-06-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "548.02701.00SAHANNSTAR",
        "originCurrency": "USD",
        "originLastPriceup": 3.22
      },
      "lowest_last_price_info": {
        "unitPrice": "3.1253",
        "validDate": "2019-02-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "548.02701.00SAHANNSTAR",
        "originCurrency": "RMB",
        "originLastPriceup": 21.8554
      }
    },
    "Price": {
      "typeii": "PCB",
      "supply_type": "Empty",
      "manufacturer": "GCE",
      "typei": "PCB",
      "SPEC01": null,
      "SPEC02": 0,
      "SPEC03": null,
      "SPEC04": 0,
      "SPEC05": 0,
      "SPEC06": 0,
      "SPEC07": 0,
      "SPEC08": null,
      "SPEC09": "Y",
      "SPEC10": null,
      "SPEC11": null,
      "SPEC12": null,
      "SPEC13": null,
      "SPEC14": null,
      "SPEC15": null,
      "SPEC16": 0,
      "SPEC17": [],
      "SPEC18": [],
      "SPEC19": [],
      "SPEC20": [],
      "SPEC21": null,
      "SPEC22": 0,
      "SPEC23": null,
      "SPEC24": null,
      "SPEC25": null,
      "SPEC26": null,
      "PcbStageNo": null,
      "remark": null,
      "wistronpn": "548.02701.00SA"
    },
    "cost": null,
    "qty": null
  },
  {
    "id": "b11449cf-5f84-465c-9501-4362e1e2df6a",
    "content": {
      "formData": {
        "pcbTab": {
          "PcbInfo": {
            "typeii": "PCB",
            "supply_type": "Empty"
          },
          "PcbManufacturer": {
            "manufacturer": "HANNSTAR"
          },
          "PcbContent": {
            "typei": "PCB",
            "SPEC01": null,
            "SPEC02": 0,
            "SPEC03": null,
            "SPEC04": 0,
            "SPEC05": 0,
            "SPEC06": 0,
            "SPEC07": 0,
            "SPEC08": null,
            "SPEC09": "Y",
            "SPEC10": null,
            "SPEC11": null,
            "SPEC12": null,
            "SPEC13": null,
            "SPEC14": null,
            "SPEC15": null,
            "SPEC16": 0,
            "SPEC17": [],
            "SPEC18": [],
            "SPEC19": [],
            "SPEC20": [],
            "SPEC21": null,
            "SPEC22": 0,
            "SPEC23": null,
            "SPEC24": null,
            "SPEC25": null,
            "SPEC26": null
          },
          "PcbRemarks": {
            "PcbStageNo": null,
            "remark": null
          }
        }
      },
      "Price": {
        "typeii": "PCB",
        "supply_type": "Empty",
        "manufacturer": "HANNSTAR",
        "typei": "PCB",
        "SPEC01": null,
        "SPEC02": 0,
        "SPEC03": null,
        "SPEC04": 0,
        "SPEC05": 0,
        "SPEC06": 0,
        "SPEC07": 0,
        "SPEC08": null,
        "SPEC09": "Y",
        "SPEC10": null,
        "SPEC11": null,
        "SPEC12": null,
        "SPEC13": null,
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": 0,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [],
        "SPEC21": null,
        "SPEC22": 0,
        "SPEC23": null,
        "SPEC24": null,
        "SPEC25": null,
        "SPEC26": null,
        "PcbStageNo": null,
        "remark": null,
        "wistronpn": "548.02701.00SA"
      },
      "spec": {
        "item": "548.02701.00SA",
        "typei": "PCB",
        "typeii": "PCB",
        "manufacturer": [
          "GCE",
          "HANNSTAR"
        ],
        "SPEC01": null,
        "SPEC02": null,
        "SPEC03": null,
        "SPEC04": null,
        "SPEC05": null,
        "SPEC06": null,
        "SPEC07": null,
        "SPEC08": null,
        "SPEC09": null,
        "SPEC10": null,
        "SPEC11": null,
        "SPEC12": null,
        "SPEC13": null,
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": null,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [],
        "SPEC21": null,
        "SPEC22": null,
        "SPEC23": null,
        "SPEC24": null,
        "SPEC25": null,
        "SPEC26": null,
        "SPEC27": null,
        "SPEC28": null,
        "SPEC29": null,
        "SPEC30": null,
        "PcbStageNo": null,
        "supply_type": "Empty"
      }
    },
    "calcost": {
      "adderRules": {},
      "usdRules": {},
      "basePrices": {},
      "adder": [
        0
      ],
      "usd": {
        "HANNSTAR": []
      },
      "adderItems": {
        "HANNSTAR": [
          []
        ]
      },
      "result": {
        "formula1": null,
        "formula2": 0,
        "formula3": null,
        "formula4": null,
        "formula5": null,
        "formula6": null,
        "other5Adder": 0,
        "sapPrice": "3.1253",
        "originCurrency": "RMB",
        "currency": "USD",
        "exchangeDate": null,
        "sum_adder": 0
      },
      "highest_last_price_info": {
        "unitPrice": "3.22",
        "validDate": "2018-06-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "548.02701.00SAHANNSTAR",
        "originCurrency": "USD",
        "originLastPriceup": 3.22
      },
      "lowest_last_price_info": {
        "unitPrice": "3.1253",
        "validDate": "2019-02-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "548.02701.00SAHANNSTAR",
        "originCurrency": "RMB",
        "originLastPriceup": 21.8554
      }
    },
    "Price": {
      "typeii": "PCB",
      "supply_type": "Empty",
      "manufacturer": "HANNSTAR",
      "typei": "PCB",
      "SPEC01": null,
      "SPEC02": 0,
      "SPEC03": null,
      "SPEC04": 0,
      "SPEC05": 0,
      "SPEC06": 0,
      "SPEC07": 0,
      "SPEC08": null,
      "SPEC09": "Y",
      "SPEC10": null,
      "SPEC11": null,
      "SPEC12": null,
      "SPEC13": null,
      "SPEC14": null,
      "SPEC15": null,
      "SPEC16": 0,
      "SPEC17": [],
      "SPEC18": [],
      "SPEC19": [],
      "SPEC20": [],
      "SPEC21": null,
      "SPEC22": 0,
      "SPEC23": null,
      "SPEC24": null,
      "SPEC25": null,
      "SPEC26": null,
      "PcbStageNo": null,
      "remark": null,
      "wistronpn": "548.02701.00SA"
    },
    "cost": null,
    "qty": null
  }
]
*
* @apiError 500 Internal Server Error.
* @apiError 413 Reach to limited size
* @apiError 400 Data not found
*/
cleanSheetRouter.post('/pcb', authHelpers.isJWTAuthenticated, cleanSheets.calculatePCBs)

module.exports = cleanSheetRouter
