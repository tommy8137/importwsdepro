const router = require('koa-router')

const eeBomRouter = new router()
const authHelper = require('../../../helpers/authHelper/index.js')
const EEbom = require('../../../api/bom/eeBom.js')
const pcb = require('../../../api/bom/pcb.js')

const authHelpers = new authHelper()
const eEbom = new EEbom()
const pcbs = new pcb()

/**
 *
 * @api {get} /eeBom/main/project/:id get EE Bom Info
 * @apiName ee bom info
 * @apiGroup eeBom
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
        "id": "1234_k1",
        "project_code": "1234",
        "customer": "joe",
        "product_type": "111",
        "project_name": "222",
        "stage": "333",
        "version": "1.5",
        "sku": "666",
        "version_remark": "224",
        "project_leader": "REXX",
        "eedm_version": "17859_-2_UMA_20190325224415",
        "plant": null,
        "purchasing_organization": null,
        "create_time": "2019-04-11T03:10:57.004Z",
        "caculation_date": null,
        "update_time": "2019-04-11T03:10:57.004Z",
        "approve_time": "2019-04-11T03:10:57.004Z",
        "is_pcb_approved": false,
        "is_bom_approved": false,
        "pcb_approved_by": null,
        "bom_approved_by": null,
        "is_next_stage": true,
        "plant_code": [{
          purchasing_organization: 'PWCD',
          plant: ['F130', 'F131']
        }, {
          purchasing_organization: 'PWIH',
          plant: ['F140']
        }]
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/main/project/1234_k1
 */

eeBomRouter.get('/main/project/:id', authHelpers.isJWTAuthenticated, eEbom.getEeBomInfo)

/**
 * @api {get} /eeBom/main/project/plantcode/:id get EE Bom Plant code drop down list
 * @apiName ee bom info
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  [{
    purchasing_organization: "PWCD",
    plants: [{
      plant: "F130",
      value: false
    }, {
      plant: "F131",
      value: true
    }]
  }, {
    purchasing_organization: "PWHI"
    plants: [{
      plant: "F120",
      value: true
    }],
  }]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/main/project/plantcode/1234_k1
 */
eeBomRouter.get('/main/project/plantcode/:id', authHelpers.isJWTAuthenticated, eEbom.getEeBomPlantCode)


/**
 *
 * @api {get} /eeBom/main/project/:id/version/:edm_version_id get EE Bom Info by project_id and edm_version_id
 * @apiName ee bom info
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String} project_code project_code
 * @apiSuccess {String} customer customer
 * @apiSuccess {String} product_type product_type
 * @apiSuccess {String} project_name  project_name
 * @apiSuccess {String} stage   stage
 * @apiSuccess {String} version  version
 * @apiSuccess {String} sku  sku
 * @apiSuccess {String} version_remark  version_remark
 * @apiSuccess {String} project_leader   project_leader
 * @apiSuccess {String} eedm_version   eedm_version
 * @apiSuccess {String} plant   plant
 * @apiSuccess {String} purchasing_organization   purchasing_organization
 * @apiSuccess {String} caculation_date   caculation_date
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "bomInfo": {
        "project_code": "4PD0F8010001",
        "customer": "Rosa",
        "product_type": "Notebook.Computer",
        "project_name": "BUCKY N5 15 WHL",
        "stage": "-1",
        "sku": "Discrete",
        "project_leader": "ALEX H ZHENG",
        "plant": "F721",
        "purchasing_organization": "PWCD",
        "caculation_date": "2019-09-11T05:13:26.235Z",
        "version": "1",
        "version_remark": "aa",
        "eedm_version": "20180709140523",
        "plant_code": [{
          purchasing_organization: 'PWCD',
          plant: ['F130', 'F131']
        }, {
          purchasing_organization: 'PWIH',
          plant: ['F140']
        }],
        "avl": true,
    }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/main/project/1234_k1/version/aa-ddd-vvv-dddd
 */

eeBomRouter.get('/main/project/:id/version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getEeBomInfoByEdmVersionId)

/**
 *
 * @api {put} /eeBom/main/project/:id update eeBom main project
 * @apiName update eebom main project
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 {
    "version_remark": "this is command",
    "plant_code": [{
      "purchasing_organization": "PWCD",
      "plants": [{
        "plant": "F130",
        "value": false
      }, {
        "plant": "F131",
        "value": true
      }]
    }, {
      "purchasing_organization": "PWHI",
      "plants": [{
        "plant": "F120",
        "value": true
      }],
    }]
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "id": "1234"
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/main/project/1234
 */
eeBomRouter.put('/main/project/:id', authHelpers.isJWTAuthenticated, eEbom.updateEeBomInfo)

/**
 *
 * @api {put} /eeBom/main/project/:id/version/:edm_version_id modify EE Bom Info by project_id and edm_version_id
 * @apiName update eebom main project info by project_id and edm_version_id
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "avl": false
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    "id": "1234",
    "version": "aa-ddd-vvv-dddd"
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/main/project/1234_k1/version/aa-ddd-vvv-dddd
 */
eeBomRouter.put('/main/project/:id/version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.updateEeBomInfoByEdmVersionId)

/**
 *
 * @api {get} /eeBom/edm/version/{id} get edm version list
 * @apiName edm version list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String} version  version
 * @apiSuccess {String} project_code   project_code
 * @apiSuccess {String} upload_time  upload_time
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "edmVersions": [
    {
      "id": "81035d94-5eba-47c1-a9b0-e4d5bf757a22",
      "status_version": "2.5",
      "approve_time": "2019-09-05T07:11:52.714Z",
      "version": "18762_-1_UMA_20181005141218",
      "eebom_project_id": "41b4a4cb-9feb-4cd6-9b9e-b879be717bbf",
      "upload_time": "20181005",
      "is_next_version": true
    }
  ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/edm/version/7de37cf2-bb74-4945-a63a-20f7d7c4a16b
 */

eeBomRouter.get('/edm/version/:id', authHelpers.isJWTAuthenticated, eEbom.getEdmVersion)

/**
 *
 * @api {put} /eeBom/detail/project/personal/check/ update personal check
 * @apiName update personal check
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  info:[
 *    {
 *       "id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *       "is_personal_checked": true
 *    }
 *  ]
  *}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/detail/project/personal/check/
 */
eeBomRouter.put('/detail/project/personal/check/', authHelpers.isJWTAuthenticated, eEbom.updatePersonalCheck)
/**
 *
 * @api {put} /eeBom/detail/project/leader/check/ update leader check
 * @apiName update leader check
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  info:[
 *    {
 *      "id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *      "leader_checked_status": 'approve' || 'reject'|| null
 *     }
 *    ]
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 update bom personal submitted err, member is not submitted
 * @apiSampleRequest /eeBom/detail/project/leader/check/
 */
eeBomRouter.put('/detail/project/leader/check/', authHelpers.isJWTAuthenticated, eEbom.updateLeaderCheck)
/**
 * @api {put} /eeBom/detail/project/personal/submitted/ update personal submitted
 * @apiName update personal submitted
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  info:[
 *    {
 *      "id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *      "is_personal_submitted": true,
 *    }
 *  ]
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiError 400 eebom detail id not correct
 * @apiError 400 update bom personal submitted err, member is not checked
 * @apiSampleRequest /eeBom/detail/project/personal/submitted/
 */
eeBomRouter.put('/detail/project/personal/submitted/', authHelpers.isJWTAuthenticated, eEbom.updatePersonalSubmitted)
/**
 *
 * @api {put} /eeBom/pcb/personal/check/ update pcb personal check
 * @apiName update pcb personal check
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "edm_version_id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *  "is_pcb_personal_checked": true,
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/pcb/personal/check/
 */
eeBomRouter.put('/pcb/personal/check/', authHelpers.isJWTAuthenticated, pcbs.updatePersonalCheck)

/**
 *
 * @api {put} /eeBom/pcb/leader/check/ update pcb leader check
 * @apiName update pcb leader check
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "edm_version_id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *  "leader_checked_status": 'approve' || 'reject'|| null
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiError 400 update pcb leader check err, edmversion info is empty
 * @apiError 400 update pcb leader check err, personal submitted is not complete
 * @apiSampleRequest /eeBom/pcb/leader/check/
 */
eeBomRouter.put('/pcb/leader/check/', authHelpers.isJWTAuthenticated, pcbs.updateLeaderCheck)
/**
 * @api {put} /eeBom/pcb/personal/submitted/ update pcb personal submitted
 * @apiName update pcb personal submitted
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "edm_version_id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *  "is_personal_submitted": true,
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 update pcb personal submitted err, edmversion info is empty
 * @apiError 400 update pcb personal submitted err, personal check is not complete
 * @apiSampleRequest /eeBom/pcb/personal/submitted/
 */
eeBomRouter.put('/pcb/personal/submitted/', authHelpers.isJWTAuthenticated, pcbs.updatePersonalSubmitted)

/**
 *
 * @api {get} /eeBom/detail/project/tab/projectID/:eebom_project_id/edmID/:edm_version_id get eebom detail tab
 * @apiName ee bom detail tab
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String} type  type
 * @apiSuccess {String} emplid emplid
 * @apiSuccess {String} user_name user_name
 * @apiSuccess {String} project_code  project_code
 * @apiSuccess {String} project_name   project_name
 * @apiSuccess {String} edm_version_id  edm_version_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "type": "personal",
        "emplid": "10503307",
        "user_name": "joe_cy_chen",
        "eebom_project_id": "1234_k1",
        "project_code": "1234",
        "project_name": "222",
        "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002",
        "edm_version": "18730_-1_Discrete_20181211164332"
    },
    {
        "type": "proxy",
        "emplid": "10503307",
        "user_name": "joe_cy_chen",
        "eebom_project_id": "1234_k1",,
        "project_code": "1234",
        "project_name": "222",
        "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002",
        "edm_version": "18730_-1_Discrete_20181211164332",
    },
   {
        "type": "approver",
        "emplid": "10503307",
        "user_name": "joe_cy_chen",
        "project_code": "1234",
        "project_name": "222",
        "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002",
        "edm_version": "18730_-1_Discrete_20181211164332",
    },
]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/detail/project/tab/projectID/1234_k1/edmID/243c93f6-600b-11e9-9e86-0242ac110002
 */
eeBomRouter.get('/detail/project/tab/projectID/:eebom_project_id/edmID/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getDetailTabInfo)

/**
 *
 * @api {get} /eeBom/copycost/type/:type/edm_version/:edm_version_id get eebom copy cost list by edm_version_id
 * @apiName copy cost list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type 為 personal or proxy (approver 可能沒有)
 * @apiParam  {Int} weeks 為週數
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
If type is personal or proxy:
{
    "itemType": 2,
    "checked": 1,
    "picCount": 35,
    "isPCB": false,
    "pcbInfo": {},
    "infos": [
        {
            "id": "59fbe45e-603a-11e9-b34e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": null,
            "remark": null,
            "qty": "4",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": null,
            "is_personal_checked": true,
            "is_leader_checked": true,
            "is_personal_submitted": true,
            "create_time": "2019-04-16T11:25:33.977Z",
            "update_time": "2019-04-16T11:25:33.977Z",
            "is_by_copy": true,
        },
        {
            "id": "f1395702-60f8-11e9-a82e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": null,
            "remark": null,
            "qty": "31",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": null,
            "is_personal_checked": false,
            "is_leader_checked": false,
            "is_personal_submitted": false,
            "create_time": "2019-04-17T10:09:52.052Z",
            "update_time": "2019-04-17T10:09:52.052Z",
            "is_by_copy": false,
        }
    ]
}
If type is approver or all:
{
    "approved": 0,
    "checked": 0,
    "totalType2": 1,
    "totalPartsCount": 3,
    "totalSuggestionCost": 0,
    "totalCost": 0,
    "isPCBApproved": true,
    "isBomApproved": true,
    "isPCB": true,
    "pcbInfo": {
        "pcbTotalPrice": 64.64,
        "is_pcb_personal_submitted": false,
        "is_pcb_personal_checked": false,
        "is_pcb_leader_checked": false
    },
    "infos": [
        {
            "id": "406b20ea-60a8-11e9-869d-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "ASIC",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": null,
            "remark": null,
            "qty": "4",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": "hello",
            "reference": "true",
            "is_personal_checked": false,
            "is_leader_checked": false,
            "is_personal_submitted": false,
            "create_time": "2019-04-17T00:32:16.262Z",
            "update_time": "2019-04-20T08:53:49.000Z",
            "other_manufacture_info": null,
            "is_by_copy": true,
        },
        {
            "id": "59fbe45e-603a-11e9-b34e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "200.5",
            "remark": null,
            "qty": "4",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": "hello",
            "reference": "true",
            "is_personal_checked": false,
            "is_leader_checked": false,
            "is_personal_submitted": false,
            "create_time": "2019-04-16T11:25:33.977Z",
            "update_time": "2019-04-16T11:25:33.977Z",
            "other_manufacture_info": null,
            "is_by_copy": false,
        },
        {
            "id": "f1395702-60f8-11e9-a82e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "400",
            "remark": null,
            "qty": "31",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": "chicken",
            "reference": "false",
            "is_personal_checked": false,
            "is_leader_checked": false,
            "is_personal_submitted": false,
            "create_time": "2019-04-17T10:09:52.052Z",
            "update_time": "2019-04-17T10:09:52.052Z",
            "other_manufacture_info": null,
            "is_by_copy": false,
        }
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/copycost/type/personal/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002?weeks=2
 */
eeBomRouter.get('/copycost/type/:type/edm_version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getCopyCost)

/**
 *
 * @api {post} /eeBom/detail/project/modify update eebom current Price*Adj. & Remark
 * @apiName ee bom update remark & percentage
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParam  {String} eebom_detail_id eebom datail id
 * @apiParam  {String} currrent_price_adj_percentage update percentage
 * @apiParam  {String} remark eebom detail remark
 *
 * @apiParamExample  {json} Request-Example:
 *{
 * "info": [
 *   {
 *     "id": "084fb402-86f1-4d4c-b1fb-4c6d2c27f707-",
 *     "currrent_price_adj_percentage": 22,
 *     "ce_cost": null,
 *     "remark": null,
 *     "is_personal_checked": true,
 *     "is_personal_submitted": true,
 *     "is_reject":false,
 *     "leader_checked_status": "approve",
 *     "leader_submitted_status": "approve"
 *
 *   }
 * ]
 *}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/detail/project/modify
 */

eeBomRouter.post('/detail/project/modify', authHelpers.isJWTAuthenticated, eEbom.updateEeBomDetail)

/**
 *
 * @api {get} /eeBom/detail/types get eebom type1, type2 list for update part_number info
 * @apiName ee bom get type list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
   {
        "type_list":
        [   {
                "type1": "ASIC",
                "type2":["XXX", "EEE"]
            },
            {   "type1":"BLU",
                "type2":["BLU", "BLU2"]
            },
        ]
   }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/detail/project/types
 */

eeBomRouter.get('/detail/project/types', authHelpers.isJWTAuthenticated, eEbom.getTypes)
/**
 *
 * @api {get} /eeBom/detail/project/all/type/:type/edm_version/:edm_version_id?orderBy=ce_cost&isOdmParts=false get all eebom detail list
 * @apiName allee bom detail list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type 為 pn or module
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
If type is module:
{
   "approved":233,
   "checked":233,
   "totalType2":45,
   "totalPartsCount":1354,
   "totalSuggestionCost":358.09655,
   "totalCost": 361.50381, // 最高價的 totalCost
   "totalLowestCost": 360, // 最低價的 totalCost
   "total2ndHighestCost": 355, // MLCC 第二高價的 totalCost
   "reject":0,
   "isPCB":false,
   "pcbInfo":{
      "id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
      "version":"20191230162008",
      "eebom_project_id":"1ed37b56-8d0e-4da4-8c52-fa9b113c0997",
      "upload_time":"20191230162008",
      "is_pcb_personal_submitted":true,
      "is_pcb_personal_checked":true,
      "is_pcb_leader_checked":false,
      "is_pcb_approved":true,
      "is_bom_approved":true,
      "bom_approved_by":"10700001",
      "pcb_approved_by":"10700001",
      "approve_time":"2020-01-17T02:27:00.000Z",
      "leader_checked_status":"approve",
      "leader_submitted_status":"approve",
      "is_reject":false,
      "status_version":"2",
      "refresh_time":"2019-12-30T18:18:31.615Z",
      "is_saved":true,
      "version_remark":"20200117 2.0 test",
      "update_time":"2020-01-17T02:27:00.766Z",
      "pcbTotalPrice":12
   },
   "infos":{
      "Platform_PCH":{
         "partsCount":78,
         "partNumberCount":18,
         "shouldCost":0.08566,
         "totalCost":0.13688,
         "totalLowestCost": 0.133,
         "total2ndHighestCost": 0.131,
         "info":[
            {
              "id":"38b20d00-38cf-11ea-98e5-bfb3bbdbd33a",
              "edm_version_id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
              "type1":"XTAL",
              "type2":"Crystal",
              "part_number":"082.30028.0491",
              "description":"XTAL 48MHZ 12PF10PPM HCX-3FB  SMD",
              "manufacturer":"HOSONIC",
              "current_price":"0.03610",
              "spa":null,
              "lpp":null,
              "ce_cost":null,
              "suggestion_cost":0.0361,
              "sub_total_suggestion_cost":0.0361,
              "sub_total_last_price":0.0361,
              "exp":"N",
              "currrent_price_adj_percentage":null,
              "remark":null,
              "qty":"1",
              "vendor":"HOSONIC",
              "vendor_part_no":"E3FB48E00000VE",
              "supply_type":"W",
              "obs":"N",
              "module":"Platform_PCH",
              "is_personal_checked":true,
              "is_leader_checked":false,
              "is_personal_submitted":true,
              "create_time":"2019-12-30T18:18:31.000Z",
              "update_time":"2019-12-30T18:18:30.000Z",
              "other_manufacture_info":{
                "spa_partnumber":null,
                "spa_manufacturer":"[]",
                "original_currency":null,
                "original_spa_price":null,
                "spa_valid_from":null
              },
              "sheet":"16",
              "valid_from":"2019-11-30T16:00:00.000Z",
              "is_reject":false,
              "leader_checked_status":"approve",
              "leader_submitted_status":"approve",
              "exp_spa":null,
              "exp_other_manufacture_info":{
                "spa_partnumber":null,
                "spa_manufacturer":"[]"
              },
              "spa_expire":null,
              "is_common_parts":false,
              "sourcer_cost":null,
              "last_price_currency_price":"0.0361",
              "last_price_currency":"USD",
              "alt_lowest_price":null,
              "alt_lowest_partnumber":null,
              "alt_manufacturer":null,
              "alt_grouping":null,
              "alt_other_info":null,
              "suggestion_part_number":"082.30028.0491",
              "suggestion_is_common_part":"N",
              "avl_spa": "0.123",
              "avl_spa_other_info": {
                "spa_partnumber": "77.21571.111",
                "spa_manufacturer": "PANASONIC",
              },
              "avl_alt": "0.234",
              "avl_alt_other_info": {
                "alt_lowest_partnumber": "77.21571.111",
                "alt_manufacturer": "PANASONIC",
              },
              "avl_alt_bolder": false,
              "avl_spa_bolder": false,
              "lowest_price": "0.00071",
              "lowest_price_valid_from": "2020-03-31T16:00:00.000Z",
              "second_highest_price": "0.0009",
              "second_highest_price_valid_from": "2020-03-31T16:00:00.000Z",
              "sub_total_lowest_price": 0.00568,
              "sub_total_2nd_highest_price": 0.0072,
            }
         ]
      }
   }
}

If type is pn:
{
   "approved":233,
   "checked":233,
   "reject":0,
   "totalType2":45,
   "totalPartsCount":1354,
   "totalSuggestionCost":358.09655,
   "totalCost": 361.50381, // 最高價的 totalCost
   "totalLowestCost": 360, // 最低價的 totalCost
   "total2ndHighestCost": 355, // MLCC 第二高價的 totalCost
   "isPCBApproved":true,
   "isBomApproved":true,
   "isPCB":false,
   "is_saved":true,
   "isEdit":false,
   "status_version":"2.0",
   "edm_version":"20191230162008",
   "refresh_time":"2019-12-31",
   "pcbInfo":{
      "id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
      "version":"20191230162008",
      "eebom_project_id":"1ed37b56-8d0e-4da4-8c52-fa9b113c0997",
      "upload_time":"20191230162008",
      "is_pcb_personal_submitted":true,
      "is_pcb_personal_checked":true,
      "is_pcb_leader_checked":false,
      "is_pcb_approved":true,
      "is_bom_approved":true,
      "bom_approved_by":"10700001",
      "pcb_approved_by":"10700001",
      "approve_time":"2020-01-17T02:27:00.000Z",
      "leader_checked_status":"approve",
      "leader_submitted_status":"approve",
      "is_reject":false,
      "status_version":"2",
      "refresh_time":"2019-12-30T18:18:31.615Z",
      "is_saved":true,
      "version_remark":"20200117 2.0 test",
      "update_time":"2020-01-17T02:27:00.766Z",
      "pcbTotalPrice":12
   },
   "infos":[
      {
        "id":"38b23415-38cf-11ea-98e5-bfb3bbdbd33a",
        "edm_version_id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
        "type1":"ASIC",
        "type2":"USB 3.0-5.0Gbs",
        "part_number":"071.08719.0A03",
        "description":"IC RE-DRV PS8719BTQFN24GTR2-A0 TQFN 24P",
        "manufacturer":"PARADE",
        "current_price":"0.21000",
        "spa":"0.144",
        "lpp":null,
        "ce_cost":null,
        "suggestion_cost":0.144,
        "sub_total_suggestion_cost":0.288,
        "sub_total_last_price":0.42,
        "exp":"N",
        "currrent_price_adj_percentage":null,
        "remark":null,
        "qty":"2",
        "vendor":"YOSUN",
        "vendor_part_no":"PS8719BTQFN24GTR2-A0",
        "supply_type":"W",
        "obs":"N",
        "module":"DB-1",
        "is_personal_checked":true,
        "is_leader_checked":false,
        "is_personal_submitted":true,
        "create_time":"2019-12-30T18:18:31.000Z",
        "update_time":"2019-12-30T18:18:30.000Z",
        "other_manufacture_info":{
          "spa_partnumber":"071.08719.0A03",
          "spa_manufacturer":"[\"PARADE\"]",
          "original_currency":"USD",
          "original_spa_price":"0.144",
          "spa_valid_from":"2020-01-01"
        },
        "sheet":"7",
        "valid_from":"2018-12-13T16:00:00.000Z",
        "is_reject":false,
        "leader_checked_status":"approve",
        "leader_submitted_status":"approve",
        "exp_spa":"0.144",
        "exp_other_manufacture_info":{
          "spa_partnumber":"071.08719.0A03",
          "spa_manufacturer":"[\"PARADE\"]"
        },
        "spa_expire":"N",
        "is_common_parts":true,
        "sourcer_cost":null,
        "last_price_currency_price":"0.21",
        "last_price_currency":"USD",
        "alt_lowest_price":null,
        "alt_lowest_partnumber":null,
        "alt_manufacturer":null,
        "alt_grouping":null,
        "alt_other_info":null,
        "suggestion_part_number":"071.08719.0A03",
        "suggestion_is_common_part":"Y",
        "pic":null,
        "avl_spa": "0.123",
        "avl_spa_other_info": {
          "spa_partnumber": "77.21571.111",
          "spa_manufacturer": "PANASONIC",
        },
        "avl_alt": "0.234",
        "avl_alt_other_info": {
          "alt_lowest_partnumber": "77.21571.111",
          "alt_manufacturer": "PANASONIC",
        },
        "avl_alt_bolder": false,
        "avl_spa_bolder": false,
        "lowest_price": "0.00071",
        "lowest_price_valid_from": "2020-03-31T16:00:00.000Z",
        "second_highest_price": "0.0009",
        "second_highest_price_valid_from": "2020-03-31T16:00:00.000Z",
        "sub_total_lowest_price": 0.00568,
        "sub_total_2nd_highest_price": 0.0072,
      }
   ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/detail/project/all/type/:type/edm_version/26bafe6e-f4a9-11e9-8ea5-0242ac110002?orderBy=ce_cost&isOdmParts=false
 */
eeBomRouter.get('/detail/project/all/type/:type/edm_version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getAllDetailProject)
/**
 *
 * @api {get} /eeBom/detail/project/type/:type/edm_version/:edm_version_id get eebom detail list
 * @apiName ee bom detail list
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type 為 personal or proxy or approver
 * @apiSuccess {String} itemType  itemType
 * @apiSuccess {String} checked checked
 * @apiSuccess {String} picCount picCount
 * @apiSuccess {String} infos  object
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
If type is personal or proxy:
{
   "itemType":256,
   "checked":0,
   "picCount":1437,
   "reject":0,
   "isPCB":true,
   "is_saved":false,
   "isEdit":true,
   "edm_version":"20200121102948",
   "refresh_time":"2020-01-22",
   "pcbInfo":{
      "id":"267da1f2-3cc7-11ea-b8d7-0242ac110002",
      "version":"20200121102948",
      "eebom_project_id":"c8fec0f4-5664-40e6-891a-777c87aac238",
      "upload_time":"20200121102948",
      "is_pcb_personal_submitted":false,
      "is_pcb_personal_checked":false,
      "is_pcb_leader_checked":false,
      "is_pcb_approved":false,
      "is_bom_approved":false,
      "bom_approved_by":null,
      "pcb_approved_by":null,
      "approve_time":null,
      "leader_checked_status":null,
      "leader_submitted_status":null,
      "is_reject":false,
      "status_version":"0.5",
      "refresh_time":"2020-01-21T18:39:36.336Z",
      "is_saved":false,
      "version_remark":null,
      "update_time":"2020-01-22T03:27:42.915Z",
      "pcbTotalPrice":0
   },
   "infos":[
      {
         "id":"269f6444-3cc7-11ea-8766-51c67cdb00de",
         "edm_version_id":"267da1f2-3cc7-11ea-b8d7-0242ac110002",
         "type1":"Capacitor",
         "type2":"Polymer",
         "part_number":"79.33719.20C",
         "description":"CHIP CAP 330U2V M7343 EEFSX0D",
         "manufacturer":"PANASONIC",
         "current_price":0.073,
         "spa":"0.073",
         "lpp":null,
         "ce_cost":null,
         "suggestion_cost":0.073,
         "sub_total_suggestion_cost":0.219,
         "sub_total_last_price":0.219,
         "exp":"N",
         "currrent_price_adj_percentage":null,
         "remark":null,
         "qty":"3",
         "vendor":"PANASONIC",
         "vendor_part_no":"EEFSX0D331EY",
         "supply_type":"W",
         "obs":"N",
         "module":"GPU",
         "is_personal_checked":false,
         "is_leader_checked":false,
         "is_personal_submitted":false,
         "create_time":"2020-01-21T18:39:36.000Z",
         "update_time":"2020-01-21T18:39:35.000Z",
         "other_manufacture_info":{
            "spa_partnumber":"79.33719.20C",
            "spa_manufacturer":"[\"PANASONIC\"]",
            "original_currency":"USD",
            "original_spa_price":"0.073",
            "spa_valid_from":"2019-11-11"
         },
         "sheet":"85",
         "valid_from":"2019-06-30T16:00:00.000Z",
         "is_reject":false,
         "leader_checked_status":null,
         "leader_submitted_status":null,
         "exp_spa":"0.073",
         "exp_other_manufacture_info":{
            "spa_partnumber":"79.33719.20C",
            "spa_manufacturer":"[\"PANASONIC\"]"
         },
         "spa_expire":"N",
         "is_common_parts":true,
         "sourcer_cost":null,
         "last_price_currency_price":"0.073",
         "last_price_currency":"USD",
         "alt_lowest_price":"0.075",
         "alt_lowest_partnumber":"077.53371.0081",
         "alt_manufacturer":"APAQ",
         "alt_grouping":[
            "077.53371.0081"
         ],
         "alt_other_info":{
            "currency":"USD",
            "origin_currency":"USD",
            "origin_lowest_price":"0.075",
            "valid_from":"2019-10-01"
         },
         "suggestion_part_number":"79.33719.20C",
         "suggestion_is_common_part":"Y",
         "avl_spa": "0.123",
          "avl_spa_other_info": {
            "spa_partnumber": "77.21571.111",
            "spa_manufacturer": "PANASONIC",
          },
          "avl_alt": "0.234",
          "avl_alt_other_info": {
            "alt_lowest_partnumber": "77.21571.111",
            "alt_manufacturer": "PANASONIC",
          },
          "avl_alt_bolder": true,
          "avl_spa_bolder": true,
          "lowest_price": "0.00071",
          "lowest_price_valid_from": "2020-03-31T16:00:00.000Z",
          "second_highest_price": "0.0009",
          "second_highest_price_valid_from": "2020-03-31T16:00:00.000Z",
          "sub_total_lowest_price": 0.00568,
          "sub_total_2nd_highest_price": 0.0072,
      }
   ],
   "status_version":"0.5"
}
If type is approver:
{
   "approved":242,
   "checked":242,
   "reject":0,
   "totalType2":52,
   "totalPartsCount":1371,
   "totalSuggestionCost":387.68165,
   "totalCost":391.08891,
   "isPCBApproved":true,
   "isBomApproved":true,
   "isPCB":true,
   "is_saved":true,
   "isEdit":false,
   "status_version":"2.0",
   "edm_version":"20191230162008",
   "refresh_time":"2019-12-31",
   "pcbInfo":{
      "id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
      "version":"20191230162008",
      "eebom_project_id":"1ed37b56-8d0e-4da4-8c52-fa9b113c0997",
      "upload_time":"20191230162008",
      "is_pcb_personal_submitted":true,
      "is_pcb_personal_checked":true,
      "is_pcb_leader_checked":false,
      "is_pcb_approved":true,
      "is_bom_approved":true,
      "bom_approved_by":"10700001",
      "pcb_approved_by":"10700001",
      "approve_time":"2020-01-17T02:27:00.000Z",
      "leader_checked_status":"approve",
      "leader_submitted_status":"approve",
      "is_reject":false,
      "status_version":"2",
      "refresh_time":"2019-12-30T18:18:31.615Z",
      "is_saved":true,
      "version_remark":"20200117 2.0 test",
      "update_time":"2020-01-17T02:27:00.766Z",
      "pcbTotalPrice":12
   },
   "infos":[
      {
         "id":"38b23415-38cf-11ea-98e5-bfb3bbdbd33a",
         "edm_version_id":"38ae43a0-38cf-11ea-94a3-0242ac110002",
         "type1":"ASIC",
         "type2":"USB 3.0-5.0Gbs",
         "part_number":"071.08719.0A03",
         "description":"IC RE-DRV PS8719BTQFN24GTR2-A0 TQFN 24P",
         "manufacturer":"PARADE",
         "current_price":"0.21000",
         "spa":"0.144",
         "lpp":null,
         "ce_cost":null,
         "suggestion_cost":0.144,
         "sub_total_suggestion_cost":0.288,
         "sub_total_last_price":0.42,
         "exp":"N",
         "currrent_price_adj_percentage":null,
         "remark":null,
         "qty":"2",
         "vendor":"YOSUN",
         "vendor_part_no":"PS8719BTQFN24GTR2-A0",
         "supply_type":"W",
         "obs":"N",
         "module":"DB-1",
         "is_personal_checked":true,
         "is_leader_checked":false,
         "is_personal_submitted":true,
         "create_time":"2019-12-30T18:18:31.000Z",
         "update_time":"2019-12-30T18:18:30.000Z",
         "other_manufacture_info":{
            "spa_partnumber":"071.08719.0A03",
            "spa_manufacturer":"[\"PARADE\"]",
            "original_currency":"USD",
            "original_spa_price":"0.144",
            "spa_valid_from":"2020-01-01"
         },
         "sheet":"7",
         "valid_from":"2018-12-13T16:00:00.000Z",
         "is_reject":false,
         "leader_checked_status":"approve",
         "leader_submitted_status":"approve",
         "exp_spa":"0.144",
         "exp_other_manufacture_info":{
            "spa_partnumber":"071.08719.0A03",
            "spa_manufacturer":"[\"PARADE\"]"
         },
         "spa_expire":"N",
         "is_common_parts":true,
         "sourcer_cost":null,
         "last_price_currency_price":"0.21",
         "last_price_currency":"USD",
         "alt_lowest_price":null,
         "alt_lowest_partnumber":null,
         "alt_manufacturer":null,
         "alt_grouping":null,
         "alt_other_info":null,
         "suggestion_part_number":"071.08719.0A03",
         "suggestion_is_common_part":"Y",
         "pic":null,
          "avl_spa": "0.123",
          "avl_spa_other_info": {
            "spa_partnumber": "77.21571.111",
            "spa_manufacturer": "PANASONIC",
          },
          "avl_alt": "0.234",
          "avl_alt_other_info": {
            "alt_lowest_partnumber": "77.21571.111",
            "alt_manufacturer": "PANASONIC",
          },
          "avl_alt_bolder": true,
          "avl_spa_bolder": true,
          "lowest_price": "0.00071",
          "lowest_price_valid_from": "2020-03-31T16:00:00.000Z",
          "second_highest_price": "0.0009",
          "second_highest_price_valid_from": "2020-03-31T16:00:00.000Z",
          "sub_total_lowest_price": 0.00568,
          "sub_total_2nd_highest_price": 0.0072,
      }
   ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/detail/project/type/proxy/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002
 */
eeBomRouter.get('/detail/project/type/:type/edm_version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getDetailProject)

/**
* 新增pcb
請注意，陣列內的每一個物件的supply_type必須一致才能成功新增
* @api {post} /pcb create pcb
* @apiName create pcb
* @apiGroup eeBom
* @apiDescription create PCBs
* @apiHeader {String} Authorization Bearer access-token
* @apiParam {uuid} edm_version_id edm version id
* @apiParam {String} [description] description
* @apiParam {float} [cost] cost
* @apiParam {boolen} is_count check whether need count
* @apiParam {number} type
* - 0: 主板
* - 1: 小板
* @apiParam {number} qty 數量
* @apiParam {object} [content] pcb detail
* @apiParamExample  {json} Request-Example:
* 所有的supply_type的值必須相同
[
  {
    "edm_version_id": "8855f0da-f4ad-11e9-818a-0242ac110002",
    "is_count": false,
    "type": 0,
    "qty": 1,
    "content": {
      "formData": {
        "pcbTab": {
          "PcbPartNumber": {
            "wistronpn": "448.02G04.001M",
            "supply_type": "W"
          },
          "PcbManufacturer": {
            "manufacturer": "HANNSTAR"
          },
          "PcbContent": {
            "typeii": "PTH",
            "SPEC01": "6",
            "SPEC02": "NCM",
            "SPEC03": "2",
            "SPEC04": "1",
            "SPEC05": "OSP",
            "SPEC06": "305",
            "SPEC07": "329.7",
            "SPEC08": "155.865986731973",
            "SPEC09": "5.59454964025915",
            "SPEC10": "5.581718104387",
            "SPEC11": "14810-1",
            "SPEC12": "0.1",
            "SPEC13": "4.35",
            "SPEC14": null,
            "SPEC15": null,
            "SPEC16": 0,
            "SPEC17": [],
            "SPEC18": [],
            "SPEC19": [],
            "SPEC20": [
              "6.01"
            ],
            "SPEC21": null,
            "SPEC22": 0,
            "SPEC23": null,
            "SPEC24": null
          },
          "PcbRemarks": {
            "PcbFillInPrice": null,
            "PcbStageNo": "NA_NA",
            "remark": "create by 448.02G04.001M"
          }
        }
      },
      "Price": {
        "wistronpn": "448.02G04.001M",
        "manufacturer": "HANNSTAR",
        "supply_type": "S",//此處的supply_type源自於talbe -pcb的content的json，無參考任何值
        "typeii": "PTH",
        "SPEC01": "6",
        "SPEC02": "NCM",
        "SPEC03": "2",
        "SPEC04": "1",
        "SPEC05": "OSP",
        "SPEC06": "305",
        "SPEC07": "329.7",
        "SPEC08": "155.865986731973",
        "SPEC09": "5.59454964025915",
        "SPEC10": "5.581718104387",
        "SPEC11": "14810-1",
        "SPEC12": "0.1",
        "SPEC13": "4.35",
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": 0,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [
          "6.01"
        ],
        "SPEC21": null,
        "SPEC22": 0,
        "SPEC23": null,
        "SPEC24": null,
        "PcbFillInPrice": null,
        "PcbStageNo": "NA_NA",
        "remark": "create by 448.02G04.001M"
      },
      "spec": {
        "item": "448.02G04.001M",
        "typei": "PCB",
        "typeii": "PTH",
        "manufacturer": [
          "HANNSTAR"
        ],
        "SPEC01": "6",
        "SPEC02": "NCM",
        "SPEC03": "2",
        "SPEC04": "1",
        "SPEC05": "OSP",
        "SPEC06": "305",
        "SPEC07": "329.7",
        "SPEC08": "155.865986731973",
        "SPEC09": "5.59454964025915",
        "SPEC10": "5.581718104387",
        "SPEC11": "14810-1",
        "SPEC12": "0.1",
        "SPEC13": "4.35",
        "SPEC14": null,
        "SPEC15": null,
        "SPEC16": null,
        "SPEC17": [],
        "SPEC18": [],
        "SPEC19": [],
        "SPEC20": [
          "6.01"
        ],
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
        "PcbStageNo": "NA_NA",
        "supply_type": "W"
      }
    },
    "supply_type": "W",//此處的supply_type源自於talbe -pcb的supply_type欄位
    "spec": {
      "item": "448.02G04.001M",
      "typei": "PCB",
      "typeii": "PTH",
      "manufacturer": [
        "HANNSTAR"
      ],
      "SPEC01": "6",
      "SPEC02": "NCM",
      "SPEC03": "2",
      "SPEC04": "1",
      "SPEC05": "OSP",
      "SPEC06": "305",
      "SPEC07": "329.7",
      "SPEC08": "155.865986731973",
      "SPEC09": "5.59454964025915",
      "SPEC10": "5.581718104387",
      "SPEC11": "14810-1",
      "SPEC12": "0.1",
      "SPEC13": "4.35",
      "SPEC14": null,
      "SPEC15": null,
      "SPEC16": null,
      "SPEC17": [],
      "SPEC18": [],
      "SPEC19": [],
      "SPEC20": [
        "6.01"
      ],
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
      "PcbStageNo": "NA_NA",
      "supply_type": "W"
    }
  }
]
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
{
    "cost": [
        {
            "adderRules": {},
            "usdRules": {},
            "basePrices": {},
            "adder": {
                "ACCL": [
                    0
                ]
            },
            "usd": {
                "ACCL": []
            },
            "adderItems": {
                "ACCL": [
                    []
                ]
            },
            "result": {
                "ACCL": {
                    "formula1": 0.0015500031000062003,
                    "formula2": 0,
                    "formula3": 0,
                    "formula4": 0,
                    "formula5": 0,
                    "formula6": null,
                    "other5Adder": 0,
                    "sapPrice": null,
                    "originCurrency": null,
                    "currency": null,
                    "exchangeDate": null
                }
            }
        }
    ],
    "result": [
        {
            "id": "44cc672d-de69-468d-b174-8e01960234fb",
            "edm_version_id": "8855f0da-f4ad-11e9-818a-0242ac110002",
            "cost": 0,
            "is_count": false,
            "type": 0,
            "qty": 1,
            "content": {
                "formData": {
                    "pcbTab": {
                        "PcbPartNumber": {
                            "wistronpn": "0",
                            "supply_type": "W",
                            "aabbcc": 0
                        },
                        "PcbManufacturer": {
                            "manufacturer": "ACCL"
                        },
                        "PcbContent": {
                            "typeii": "HDI",
                            "SPEC01": "NCD",
                            "SPEC02": 0,
                            "SPEC03": "NA",
                            "SPEC04": 1,
                            "SPEC05": 10,
                            "SPEC06": 10,
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
                            "SPEC24": null
                        },
                        "PcbRemarks": {
                            "PcbFillInPrice": null,
                            "PcbStageNo": null,
                            "remark": "111111"
                        }
                    }
                },
                "Price": {
                    "wistronpn": "0",
                    "supply_type": "S",
                    "manufacturer": "ACCL",
                    "typeii": "HDI",
                    "SPEC01": "NCD",
                    "SPEC02": 0,
                    "SPEC03": "NA",
                    "SPEC04": 1,
                    "SPEC05": 10,
                    "SPEC06": 10,
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
                    "PcbFillInPrice": null,
                    "PcbStageNo": null,
                    "remark": "111111"
                }
            },
            "update_time": "2019-12-04T08:46:20.736Z",
            "create_time": "2019-12-04T08:46:20.736Z",
            "part_number": "48U.18734.D003",
            "supply_type": "S",
            "stage_no": null,
            "sourcer_cost": null,
            "Price": {
                "wistronpn": "0",
                "supply_type": "S",
                "manufacturer": "ACCL",
                "typeii": "HDI",
                "SPEC01": "NCD",
                "SPEC02": 0,
                "SPEC03": "NA",
                "SPEC04": 1,
                "SPEC05": 10,
                "SPEC06": 10,
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
                "PcbFillInPrice": null,
                "PcbStageNo": null,
                "remark": "111111"
            }
        }
    ]
}

*
* @apiError 500 Internal Server Error.
* @apiError 413 Reach to limited size
* @apiError 400 Data not found
*/
eeBomRouter.post('/pcb', authHelpers.isJWTAuthenticated, pcbs.createOrUpdatePCBs)
/**
 * 修改PCB資訊
 * 請注意，物件內的所有suppley_type的值必須一致
* @api {put} /pcb update pcb
* @apiName update pcb
* @apiGroup eeBom
* @apiDescription update PCBs
* @apiHeader {String} Authorization Bearer access-token
* @apiParam {uuid} id the modified pcb's id
* @apiParam {String} [description] description
* @apiParam {float} [cost] cost
* @apiParam {boolen} [is_count] check whether need count
* @apiParam {number} [type]
* - 0: 主板
* - 1: 小板
* @apiParam {number} [qty] 數量
* @apiParam {object} [content] pcb detail
* @apiParamExample  {json} Request-Example:
[
  {
    "id": "40fdc062-0d36-45a6-bd78-b82eb7e94502",
    "edm_version_id": "8855f0da-f4ad-11e9-818a-0242ac110002",
    "is_count": false,
    "type": 0,
    "qty": 1,
    "content": {
      "formData": {
        "pcbTab": {
          "PcbPartNumber": {
            "wistronpn": "0",
            "supply_type": "S",
          },
          "PcbManufacturer": {
            "manufacturer": "ACCL"
          },
          "PcbContent": {
            "typeii": "HDI",
            "SPEC01": "NCD",
            "SPEC02": 0,
            "SPEC03": "NA",
            "SPEC04": 1,
            "SPEC05": 10,
            "SPEC06": 10,
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
            "SPEC24": null
          },
          "PcbRemarks": {
            "PcbFillInPrice": null,
            "PcbStageNo": null,
            "remark": "111111"
          }
        }
      },
      "Price": {
        "wistronpn": "0",
        "supply_type": "S",
        "manufacturer": "ACCL",
        "typeii": "HDI",
        "SPEC01": "NCD",
        "SPEC02": 0,
        "SPEC03": "NA",
        "SPEC04": 1,
        "SPEC05": 10,
        "SPEC06": 10,
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
        "PcbFillInPrice": null,
        "PcbStageNo": null,
        "remark": "111111"
      }
    },
    "supply_type": "S"
  }
]
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     create success
{
    "cost": [
        {
            "adderRules": {},
            "usdRules": {},
            "basePrices": {},
            "adder": {
                "ACCL": [
                    0
                ]
            },
            "usd": {
                "ACCL": []
            },
            "adderItems": {
                "ACCL": [
                    []
                ]
            },
            "result": {
                "ACCL": {
                    "formula1": 0.0015500031000062003,
                    "formula2": 0,
                    "formula3": 0,
                    "formula4": 0,
                    "formula5": 0,
                    "formula6": null,
                    "other5Adder": 0,
                    "sapPrice": null,
                    "originCurrency": null,
                    "currency": null,
                    "exchangeDate": null
                }
            }
        }
    ],
    "result": []
}
*
* @apiError 500 Internal Server Error.
* @apiError 413 Reach to limited size
* @apiError 400 Data not found
*/

eeBomRouter.put('/pcb', authHelpers.isJWTAuthenticated, pcbs.createOrUpdatePCBs)
/**
 *
 * @api {get} /eeBom/pcb/personal/getPcbInfo?edm_version_id=&column=&keyword= get PCB Info
 * @apiName PCB info
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} edm_version_id edm_version_id
 * @apiParam  {String} column column name
 * @apiParam  {String} keyword keyword
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "status_version": "2.5",
    "edm_version_id": "8855f0da-f4ad-11e9-818a-0242ac110002",
    "plant": "F711",
    "list": [
        {
            "id": "40fdc062-0d36-45a6-bd78-b82eb7e94502",
            "edm_version_id": "8855f0da-f4ad-11e9-818a-0242ac110002",
            "cost": 0,
            "is_count": false,
            "type": 0,
            "qty": 1,
            "content": {
                "formData": {
                    "pcbTab": {
                        "PcbPartNumber": {
                            "wistronpn": "0",
                            "supply_type": ""
//2019.12.4 此處的supply_type源自於talbe -pcb的content的json，
前端傳入甚麼就記甚麼
                        },
                        "PcbManufacturer": {
                            "manufacturer": "ACCL"
                        },
                        "PcbContent": {
                            "typeii": "HDI",
                            "SPEC01": "NCD",
                            "SPEC02": 0,
                            "SPEC03": "NA",
                            "SPEC04": 1,
                            "SPEC05": 10,
                            "SPEC06": 10,
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
                            "SPEC24": null
                        },
                        "PcbRemarks": {
                            "PcbFillInPrice": null,
                            "PcbStageNo": null,
                            "remark": "111111"
                        }
                    }
                },
                "Price": {
                    "wistronpn": "0",
                    "supply_type": "S",
//2019.12.4 此處的supply_type源自於talbe -pcb的content的json，前端傳入什麼就記什麼
                    "manufacturer": "ACCL",
                    "typeii": "HDI",
                    "SPEC01": "NCD",
                    "SPEC02": 0,
                    "SPEC03": "NA",
                    "SPEC04": 1,
                    "SPEC05": 10,
                    "SPEC06": 10,
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
                    "PcbFillInPrice": null,
                    "PcbStageNo": null,
                    "remark": "111111"
                }
            },
            "create_time": "2019-12-04T06:26:12.812Z",
            "update_time": "2019-12-04T07:01:24.000Z",
            "part_number": "48U.18734.D009",
            "supply_type": "S",
//2019.12.4 此處的supply_type源自於talbe -pcb的supply_type欄位
            "stage_no": null,
            "sourcer_cost": null,
            "suggestion_cost": 0,
            "part_number_tmp": "48U.18734.D009",
            "last_price": null, //舊 last price留下避免excel export抓不到錢
            "obs": "N",
            "Price": {
                "wistronpn": "0",
                "supply_type": "S",
//2019.12.4 此處的supply_type源自於talbe -pcb的content的json，前端傳入什麼就記什麼
                "manufacturer": "ACCL",
                "typeii": "HDI",
                "SPEC01": "NCD",
                "SPEC02": 0,
                "SPEC03": "NA",
                "SPEC04": 1,
                "SPEC05": 10,
                "SPEC06": 10,
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
                "PcbFillInPrice": null,
                "PcbStageNo": null,
                "remark": "111111"
            },
            "description": "PCB 18742-1 FAROE_DIS_X32_MB_MV 8L GLOBA",
      "wistronpn": "448.0GG03.0011",
      "remark": null,
      "type1": "PCB",
      "type2": "PTH",
      "PcbStageNo": "NA_NA",
      "ce_cost": null,
      "clean_sheet_cost": 4.00794,
      "highest_last_price_info": {
        "unitPrice": "3.58",
        "validDate": "2020-04-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "448.0GG03.0011GLOBALBRAN",
        "originCurrency": "USD",
        "originLastPriceup": 3.58
      },
      "lowest_last_price_info": {
        "unitPrice": "3.58",
        "validDate": "2020-04-01",
        "currency": "USD",
        "vendor": null,
        "vendor_pn": "448.0GG03.0011GLOBALBRAN",
        "originCurrency": "USD",
        "originLastPriceup": 3.58
      }
      "exp": "N",
      "valid_date": "2020-04-01",
      "sub_total_last_price": 3.58,
      "sub_total_highest_last_price": 3.58,
      "sub_total_lowest_last_price": 3.58,
      "sub_total_suggestion_cost": 3.58,
      "vendor": null,
      "vendor_pn": "448.0GG03.0011GLOBALBRAN"
        },...
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 400 edm_version_id required
 * @apiSampleRequest /eeBom/pcb/personal/getPcbInfo?edm_version_id=a80fee02-61c4-11e9-abdc-0242ac110002&column=supply_type&keyword=w,h,a,av
 */
eeBomRouter.get('/pcb/personal/getPcbInfo', pcbs.getPCB)

/**
 *
 * @api {post} /eeBom/pcb/personal/delete/ delete pcb
 * @apiName delete pcb
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccess {String} id  pcb id
 * @apiParamExample  {json} Request-Example:
 * {
 *        "ids":["c416e2ed-1150-467a-81f7-0c56965c6b1f","5aae2334-988b-4767-847b-bad7a17bf9a9"]
 *
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     delete success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/pcb/delete/
 */
eeBomRouter.post('/pcb/personal/delete/', pcbs.deletePCB)

/**
 *
 * @api {post} /eeBom/detail/project/approve/type/:type/edm_version/:edm_version_id  approve eebom
 * @apiName approve eebom
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParam  {String} type 為 pcb or bom
 *     HTTP/1.1 200 OK
 * @apiParamExample  {json} Request-Example:
 * {
 *        "versionRemark":"hello"
 *
 * }
 * @apiSuccessExample {json} Success-Response:
 * approve success
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 version error
 * @apiError 400 approve err, bomDetails check not complete
 * @apiError 400 approve err, bomDetails not found
 * @apiError 400 approve err, bomDetails check not complete
 * @apiSampleRequest /eeBom/detail/project/approve/type/bom/edm_version/243c6ce6-600b-11e9-9e86-0242ac110002
 */
eeBomRouter.post('/detail/project/approve/type/:type/edm_version/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.approve)
/**
 *
 * @api {get} /eeBom/pcb/type2 get pcb type2
 * @apiName get pcb type2
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "type2": [
        "HDI",
        "PCB",
        "PTH"
    ]
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiSampleRequest /eeBom/pcb/type2
 */
eeBomRouter.get('/pcb/type2', authHelpers.isJWTAuthenticated, pcbs.getType2)
/**
 *
 * @api {post} /eeBom/pcb/import/adder upload general adder or usd adder excel
 * @apiName upload adder excel
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  "type":"general"||"usd",
 *  "file": "file"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pcb adder import error
 * @apiError 400 request body error, type not give
 * @apiSampleRequest /eeBom/pcb/import/adder
 */
eeBomRouter.post('/pcb/import/adder', pcbs.importAdder)
/**
 *
 * @api {post} /eeBom/pcb/import/basePrice upload base price excel
 * @apiName upload base price excel
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiParamExample  {json} Request-Example:
 * {
 *  "file": "file"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 import base price error
 * @apiSampleRequest /eeBom/pcb/import/adder
 */
eeBomRouter.post('/pcb/import/basePrice', authHelpers.isJWTAuthenticated, pcbs.importBasePrice)
eeBomRouter.put('/pcb/formula/adder', pcbs.calculateAdderFormula)

/**
 *
 * @api {get} /eeBom/pcb/wistronpn/:wistron_pn/edmVersion/:edmVersionID/plant/:plant get PCB data by wistron P/N
 * @apiName 用 Wistron P/N 找到 PCB 的資料
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
  "data": [
    {
      "item": "448.02G04.001M",
      "typei": "PCB",
      "typeii": "PTH",
      "manufacturer": "HANNSTAR",
      "spec01": "6",
      "spec02": "NCM",
      "spec03": "2",
      "spec04": "1",
      "spec05": "OSP",
      "spec06": "305",
      "spec07": "329.7",
      "spec08": "155.865986731973",
      "spec09": "5.59454964025915",
      "spec10": "5.581718104387",
      "spec11": "14810-1",
      "spec12": "0.1",
      "spec13": "4.35",
      "spec14": null,
      "spec15": null,
      "spec16": null,
      "spec17": null,
      "spec18": null,
      "spec19": null,
      "spec20": "6.01",
      "spec21": null,
      "spec22": null,
      "spec23": null,
      "spec24": null,
      "spec25": null,
      "spec26": null,
      "spec27": null,
      "spec28": null,
      "spec29": null,
      "spec30": null
    }
  ],
  "spec": {
    "item": "448.02G04.001M",
    "typei": "PCB",
    "typeii": "PTH",
    "manufacturer": [
      "HANNSTAR"
    ],
    "spec01": "6",
    "spec02": "NCM",
    "spec03": "2",
    "spec04": "1",
    "spec05": "OSP",
    "spec06": "305",
    "spec07": "329.7",
    "spec08": "155.865986731973",
    "spec09": "5.59454964025915",
    "spec10": "5.581718104387",
    "spec11": "14810-1",
    "spec12": "0.1",
    "spec13": "4.35",
    "spec14": null,
    "spec15": null,
    "spec16": null,
    "spec17": [],
    "spec18": [],
    "spec19": [],
    "spec20": [
      "6.01"
    ],
    "spec21": null,
    "spec22": null,
    "spec23": null,
    "spec24": null,
    "spec25": null,
    "spec26": null,
    "spec27": null,
    "spec28": null,
    "spec29": null,
    "spec30": null,
    "PcbStageNo": "NA_NA",
    "supply_type": "Empty"
  }
}
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 wistron_pn required
 * @apiSampleRequest /eeBom/pcb/wistronpn/448.0GG03.0011
 */
eeBomRouter.get('/pcb/wistronpn/:wistron_pn/edmVersion/:edmVersionID/plant/:plant', authHelpers.isJWTAuthenticated, pcbs.getPCBSpecByWistronPN)
/**
 *
 * @api {get} /eeBom/pcb/wistronpn/:wistron_pn?edmversionid=:edmvid?plant=:plant get PCB data by wistron P/N with query
 * @apiName 用 Wistron P/N 找到 PCB 的資料
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "data": [
        {
            "item": "071.00546.0003",
            "typei": "ASIC",
            "typeii": "USB 3.0-5.0Gbs",
            "manufacturer": "TI",
            "spec01": "MUX/DEMUX",
            "spec02": "USB3.1-5G",
            "spec03": "4",
            "spec04": "6",
            "spec05": "USB3.1-5G;DP 1.4-8.1G",
            "spec06": "USB3.1-5G;DP 1.4-8.1G",
            "spec07": "4096*2160",
            "spec08": "NA",
            "spec09": "NA",
            "spec10": "NA",
            "spec11": "PASSIVE",
            "spec12": "NA",
            "spec13": "NA",
            "spec14": "NA",
            "spec15": "NA",
            "spec16": "NA",
            "spec17": "4*6",
            "spec18": "WQFN",
            "spec19": "40",
            "spec20": "NA",
            "spec21": "NA",
            "spec22": "NA",
            "spec23": "NA",
            "spec24": "NA",
            "spec25": "-40~85",
            "spec26": "INDUSTRY",
            "spec27": null,
            "spec28": null,
            "spec29": null,
            "spec30": null
        }
    ],
    "spec": {
        "item": "071.00546.0003",
        "typei": "ASIC",
        "typeii": "USB 3.0-5.0Gbs",
        "manufacturer": [
            "TI"
        ],
        "spec01": "MUX/DEMUX",
        "spec02": "USB3.1-5G",
        "spec03": "4",
        "spec04": "6",
        "spec05": "USB3.1-5G;DP 1.4-8.1G",
        "spec06": "USB3.1-5G;DP 1.4-8.1G",
        "spec07": "4096*2160",
        "spec08": "NA",
        "spec09": "NA",
        "spec10": "NA",
        "spec11": "PASSIVE",
        "spec12": "NA",
        "spec13": "NA",
        "spec14": "NA",
        "spec15": "NA",
        "spec16": "NA",
        "spec17": [
            "4*6"
        ],
        "spec18": [
            "WQFN"
        ],
        "spec19": [
            "40"
        ],
        "spec20": [
            "NA"
        ],
        "spec21": "NA",
        "spec22": "NA",
        "spec23": "NA",
        "spec24": "NA",
        "spec25": "-40~85",
        "spec26": "INDUSTRY",
        "spec27": null,
        "spec28": null,
        "spec29": null,
        "spec30": null,
        "PcbStageNo": null,
        "supply_type": null
    }
}
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 wistron_pn required
 * @apiSampleRequest /eeBom/pcb/wistronpn/448.0GG03.0011
 */
eeBomRouter.get('/pcb/wistronpn/:wistron_pn', authHelpers.isJWTAuthenticated, pcbs.getPCBSpecByWistronPNWithQuery)
/**
*
* @api{get} /eeBom/export/me/:edm_version_id get ee bom export excel file
* @apiName get ee bom export excel
* @apiGroup eeBom
* @apiHeader {String} Authorization Bearer access-token.
* @apiParam {String} edm_version_id  Ee Bom version id
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_BOM_EE_<Project_Name>_<date:YYYYmmdd>:
  }
  // New Function format for ee excel by using new export module
  // function name: exportEENewModuleData(edm_version_id, supplyType)
  // response-example:
  { summary:
     {
        export_from: 'BOM Management',
        eecost_gap: null,
        others: 'N/A',
        export_date: '20191128 13:20',
        customer: 'Rosa',
        project_name: 'MOCKINGBIRD-H N7 15 CML-H AL',
        project_code: '4PD0KG010001',
        version: 'V0.0',
        bom_create_date: '20191121 12:10',
        rfq_finish_date: '20191122',
        total_parts_count: 2512,
        total_part_number_count: 374,
        total_last_price_sap: 311.02319,
        total_suggestion_cost: 299.71859,
        total_opportunity: 11.304599999999994,
        pcb_last_price: 0,
        opp_common_parts: 1.0888300000000002,
        opp_sbm: 4.773370000000001,
        opp_ee: 7.692229999999978,
        total_opp_type1: 'ASIC/Capacitor/Connector/Discrete/EMI/LED/Logic/MLCC/MOSFET/NOR Flash/Power IC/RES/XTAL',
        opp_common_parts_type1: 'ASIC/Discrete/EMI/MLCC/MOSFET/NOR Flash/Power IC/RES/XTAL',
        opp_sbm_type1: 'Discrete/EMI/MLCC/MOSFET/Power IC/RES',
        opp_ee_type1: 'ASIC/Capacitor/Connector/Discrete/EMI/LED/Logic/MLCC/MOSFET/NOR Flash/Power IC/RES/XTAL',
        bu_target_date: null,
        bu_target_cost: null,
        hit_rate: null,
        eedm_ver: '20191121113838',
        status_version: '0.0'
      },
    detail:
    [
      {
        type1: 'ASIC',
        type2: 'Audio',
        part_number: '071.03204.0003',
        description: 'IC AUDIO CODEC ALC3204-CG MQFN 40P',
        manufacturer: 'REALTEK',
        current_price: 0.27,
        sub_total_last_price: 0.27,
        spa: 0.27,
        lpp: null,
        ce_cost: null,
        currrent_price_adj_percentage: null,
        remark: null,
        qty: 1,
        vendor: 'NUVISION',
        vendor_part_no: 'ALC3204-CG',
        obs: 'N',
        supply_type: 'A',
        valid_date: '20191001',
        sourcer_cost: null,
        is_common_parts: 'N',
        last_price_currency: 'USD',
        last_price_currency_price: 0.27,
        alt_lowest_price: null,
        alt_lowest_partnumber: null,
        alt_manufacturer: null,
        alt_grouping: null,
        alt_other_info: null,
        exp: 'N',
        suggestion_cost: '0.27000',
        suggestion_part_number: '071.03204.0003',
        sub_total_suggestion_cost: 0.27,// for new export module
        suggestion_is_common_part: 'N',
        partNumber: '071.03204.0003',
        lastPrice: 0.27,
        subTotalLastPrice: 0.27,
        suggestionCost: 0.27,
        ceAdj: null,
        totalSuggestionCost: 0.27,
        vendorPartNumber: 'ALC3204-CG',
        spaCost: 0.27,
        ceCost: null,
        supplyType: 'A',
        currency: 'USD',
        PcbStageNo: null,
        parallelBoard: null,
        spaPartNumber: '071.03204.0003',
        spaManufacturer: 'REALTEK',
        spaOriginCurrency: 'USD',
        spaOriginPrice: 0.27,
        spaValidFrom: '20191001',
        cleanSheetCost: null,
        spaPNCommonPart: 'N',
        altPNCommonPart: 'N',
        RBopportunity: null,
        costDiff: 0,
        feedback: null,
        spaSupplyType: 'A,W'
      },
    by_bu:
    { Connector:
        {
          total_parts_count: 22,
          suggestion: 2.7944,
          total_last: 2.8093,
          hit_rate_FG: 0.00533,
          bu_target_cost: null,
          hit_rate_GI: 0
        },
    },
    by_module:
    { Audio:
        {
          total_parts_count: 22,
          suggestion: 2.7944,
          total_last: 2.8093,
          hit_rate_FG: 0.00533,
          bu_target_cost: null,
          hit_rate_GI: 0
        },
    },
    exchangeRate:
    [ {
        from: 'NTD',
        to: 'USD',
        sap_exchange_rate: 0.033,
        date: '20191101'
      },
     { from: 'RMB',
       to: 'USD',
       sap_exchange_rate: 0.142,
       date: '20191101'
      }
    ],
  exchangeRateDefault:
   [
      { exchange_rate: null, RMB: 0.142 },
      { exchange_rate: null, NTD: 0.033 },
      { exchange_rate: null, JPY: 0.009 }
    ],
  }
* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 dashboard_version_id required
 * @apiSampleRequest /eeBom/export/me/479a36d3-5e1c-4ba7-8515-2c1d6becb2ab
 */
eeBomRouter.get('/export/me/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.exportEeBom)
/**
*
* @api{get} /eeBom/export/alternative/:edm_version_id get ee alternative export excel file
* @apiName get ee alternative export excel
* @apiGroup eeBom
* @apiHeader {String} Authorization Bearer access-token.
* @apiParam {String} edm_version_id  Ee Bom version id
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_Alternative_EE_<Project_Name>_<date:YYYYmmdd>:
  }
  // New Function format for ee excel by using new export module
  // function name: getExport2ndOdmPartBom(edm_version_id, supplyType)
* @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 dashboard_version_id required
 * @apiSampleRequest /eeBom/export/alternative/479a36d3-5e1c-4ba7-8515-2c1d6becb2ab
 */
eeBomRouter.get('/export/alternative/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.exportAlternative)
/**
 *
 * @api {put} /eeBom/detail/project/leader/submitted/ update leader submitted
 * @apiName update leader submitted
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *  version_remark: "hello",
 *  info:[
 *    {
 *      "id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *      "leader_submitted_status": 'approve' || 'reject'|| null
 *     }
 *    ]
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 update bom personal submitted err, member is not submitted
 * @apiSampleRequest /eeBom/detail/project/leader/check/
 */
eeBomRouter.put('/detail/project/leader/submitted/', authHelpers.isJWTAuthenticated, eEbom.updateLeaderSubmitted)

/**
 *
 * @api {put} /eeBom/pcb/leader/submitted/ update pcb leader submitted
 * @apiName update pcb leader submitted
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
*   version_remark: "hello",
 *  "edm_version_id":"406b20ea-60a8-11e9-869d-0242ac110002",
 *  "leader_submitted_status": 'approve' || 'reject'|| null
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required
 * @apiError 400 pages or items or orderBy required
 * @apiError 400 update pcb leader submitted err, edmversion info is empty
 * @apiError 400 update pcb leader submitted err, personal submitted is not complete
 * @apiSampleRequest /eeBom/pcb/leader/submitted/
 */
eeBomRouter.put('/pcb/leader/submitted/', authHelpers.isJWTAuthenticated, pcbs.updateLeaderSubmitted)
/**
 *
 * @api {get} /eeBom/upgrade/edmVersion/:edm_version_id  取得進版的edm version id
 * @apiName  取得進版的 edm_version_id
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "edm_version_id": "e69cd0c6-ac72-48c6-90ff-bd2d2d9f2804"
 * }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 id required

 * @apiSampleRequest /eeBom/upgrade/edmVersion/e69cd0c6-ac72-48c6-90ff-bd2d2d9f2804
 */
eeBomRouter.get('/upgrade/edmVersion/:edm_version_id', authHelpers.isJWTAuthenticated, eEbom.getUpgradeEdmversionID)
/**
 *
 * @api {get} /eeBom/edm/statusversion/:projectid/:edmversion get edm version id and status version
 * @apiName ee bom edm version
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiSuccess {String} edm_version_id  uuid
 * @apiSuccess {String} status_version float
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "edm_version_id": "1406bd98-7c62-440a-9c59-c63e01b1372e",
        "status_version": "1.5"
    },
    {
        "edm_version_id": "65472b8d-96d2-45bd-95de-8a5ae6ba3813",
        "status_version": "1.0"
    }
]
 *
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 pages or items or orderBy required
 * @apiSampleRequest /eeBom/edm/statusversion/:projectid/:edmversion
 */
eeBomRouter.get('/edm/statusversion/:projectid/:edmversion', authHelpers.isJWTAuthenticated, eEbom.getEdmVersionStatusVersionByID)


/**
 * @api {put} /eeBom/detail/refreshBom/
 * @apiName refresh eeBom detail
 * @apiGroup eeBom
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "edm_version_id":"406b20ea-60a8-11e9-869d-0242ac110002"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     update success
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 edm version id required
 * @apiError 400 Bom already start editing
 * @apiError 424 ECONNREFUSED
 * @apiSampleRequest /eeBom/detail/refreshBom/
 */
eeBomRouter.post('/detail/refreshBom/', authHelpers.isJWTAuthenticated, eEbom.refreshBomDetail)


/**
 * @api {post} /eeBom/pcb/export/
 * @apiName export calculate pcb result
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *
 * {
 *   "info":[
 *   {
 *     "PcbStageNo": null
 *     "SPEC01": "NM"
 *     "SPEC02": "10"
 *     "SPEC03": "NA"
 *     "SPEC04": "208"
 *     "SPEC05": "179.32"
 *     "SPEC06": "2"
 *     "SPEC07": "0.8"
 *     "SPEC08": "OSP"
 *     "SPEC09": "Y"
 *     "SPEC10": "NA"
 *     "SPEC11": "NA"
 *     "SPEC12": "GAHFPF5"
 *     "SPEC13": "3.5/5"
 *     "SPEC14": "10"
 *     "SPEC15": "Black"
 *     "SPEC16": "3"
 *     "SPEC17": ["Hoz"]
 *     "SPEC18": (2) ["106MR", "1080MR"]
 *     "SPEC19": []
 *     "SPEC20": []
 *     "SPEC21": "0.77"
 *     "SPEC22": 0
 *     "SPEC23": null
 *     "SPEC24": "N"
 *     "SPEC25": "28.91"
 *     "SPEC26": null
 *     "formula1": 28.906441812883624
 *     "formula2": 0.105
 *     "formula3": 3.0351763903527806
 *     "formula4": 3.42975
 *     "formula5": null
 *     "formula6": null
 *     "manufacturer": "HANNSTAR"
 *     "remark": null
 *     "sum_adder": 0.13
 *     "typei": "PCB"
 *     "typeii": "PTH"
 *     "wistronpn": ""
 *   },
 * ]}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  {
    // 輸出Excel, 檔名: Eprocurement_CleanSheet_EE_PCB_<date:YYYYmmdd>
  }
 * @apiError 401 Unauthorized
 * @apiError 403 PERMISSION DENIED
 * @apiError 400 dashboard_version_id required
 * @apiSampleRequest /eeBom/pcb/export
 */
eeBomRouter.post('/pcb/export/', authHelpers.isJWTAuthenticated, pcbs.exportPCBResult)
/**
 * @api {post} /eeBom/syncPcbBomItem/
 * @apiName sync Pcb BomItem
 * @apiGroup pcb
 * @apiHeader {String} Authorization Bearer access-token.
 *
 * @apiParamExample  {json} Request-Example:
 *
 * {}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * @apiError 401 Unauthorized
 * @apiSampleRequest /eeBom/syncPcbBomItem
 */
eeBomRouter.post('/syncEedmPcbBomItem', pcbs.syncEedmPcbBomItem)
module.exports = eeBomRouter

