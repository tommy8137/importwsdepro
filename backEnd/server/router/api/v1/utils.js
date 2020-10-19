const router = require('koa-router')
const Formula = require('../../../api/utils/formula.js')
// const PartListApi = require('../../../api/bom/partlistCtrl')
// const V2Utils = require('../../../../part-list-layout/V1ToV2/V2Utils')
const utilsRouter = new router()
const formula = new Formula()
// const partListApi = new PartListApi()

utilsRouter.post('/calculatePrice', formula.calculatePrice)
utilsRouter.post('/getPriceObj', formula.getPriceObj)

// utilsRouter.post('/formula/save', formula.saveFormula)
// utilsRouter.post('/partlist/v1tov2', V2Utils.transferV1ToV2Partlist)
// utilsRouter.post('/pcb/v1tov2', V2Utils.transferV1ToV2PCB)
/**
 * 取得supply_type的下拉式選單列表
* @api {get} /utils/supplyTypeDropDownList
* @apiName get Supply Type Drop Down List
* @apiGroup utils
* @apiSuccessExample {json} Success-Response:
{
    "values": [
        "B",
        "C",
        "A",
        "AV",
        "W",
        "S",
        "Empty"
    ]
}
* @apiError 500 Internal Server Error
* @apiSampleRequest  /utils/supplyTypeDropDownList
*/
utilsRouter.get('/supplyTypeDropDownList', formula.getSupplyTypeDropDownList)

/**
 * 取得product_type的下拉式選單列表
* @api {get} /utils/productTypeDropDownList
* @apiName get Product Type Drop Down List
* @apiGroup utils
* @apiSuccessExample {json} Success-Response:
[
{
 "label":"NB",
 "value":1, // NB's product_type_id
}...
]
* @apiError 500 Internal Server Error
* @apiSampleRequest  /utils/productTypeDropDownList
*/
utilsRouter.get('/productTypeDropDownList', formula.getProductTypeDropDownList)
module.exports = utilsRouter
