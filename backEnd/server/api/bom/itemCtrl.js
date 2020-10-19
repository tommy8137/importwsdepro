const _ = require('lodash')
const bomItemSvc = require('../../service/bom/bomItem.js')
const partListSvc = require('../../service/bom/partList')
const bomItemModel = require('../../model/bom/bomItem')
const { errorCode, apiErrorRes } = require('../../helpers/errorCode/apiErrorHelper.js')
const validator = require('validator')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('BomItemCtrl')
const bomItemValidator = require('../../validator/bom/bomItem')
const BOM_ITEM_LEVEL = ['DC/65', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')
const UUID = require('uuid/v4')
const bomItemValid = require('../../validator/bom/bomItem')
const meBomCost = require('../../utils/cost/meBomCost')
const { asyncForEach } = require('../../helpers/utils')
const rbacService = require('../../service/admin/rbac.js')
const emdmBomUtil = require('../../utils/emdmBom/emdmBomUtils.js')
const moment = require('moment')
const { getPartlistConfig } = require('../../model/bom/bomPartList')
const CREATE_ITEM = 'CreateItem'
const UPDATE_ITEM = 'UpdateItem'
const SOURCER_COST_EXCEL_COLUMN_LENGTH = 44 // sourcer cost excel的bomItem欄位長度
const IMPORT_SOUCERCOST_VALID_CURRENCY = {
  'RMB':true,
  'USD':true,
}
class BomItemCtrller {
  /* constructor() {
    this.uploadBomItems = this.uploadBomItems.bind(this)
    this.prepareData = this.prepareData.bind(this)
    this.sortOutData = this.sortOutData.bind(this)
    this.uploadSorcerCostExcel = this.uploadSorcerCostExcel.bind(this)
  } */
  static async createItem(ctx) {
    await this.editItem(ctx, CREATE_ITEM)
  }

  static async putItem(ctx) {
    await this.editItem(ctx, UPDATE_ITEM)
  }

  static async editItem (ctx, type) {
    let id = ''
    switch(type){
      case UPDATE_ITEM:
        id = ctx.params.id
        break
    }
    try {
      let item = ctx.request.body
      let user = ctx.request.user
      switch(type){
        case UPDATE_ITEM:
          item.id = id
          break
      }
      let preparedItem = await bomItemSvc.BomItems.prepareItem(item, item.bom_id, bomItemSvc.ONLINE_EDIT)
      item = preparedItem.item
      let sqlResult = {}

      await meBomCost.getMaterialLastPriceByBomId([item], item.bom_id)
      switch(type){
        case UPDATE_ITEM:
          await bomItemSvc.checkBomItemHasChild(item.id, item.hasChild)
          sqlResult = await bomItemSvc.updateBomItem(user, item)
          break
        case CREATE_ITEM:
          sqlResult = await bomItemSvc.createBomItem(user, item)
          break
      }
      await bomItemSvc.BomItems.updatePartList(item, sqlResult.id, item.product_type_id, item.product_type_name)
      ctx.body = sqlResult
      ctx.status = 200
    } catch (err) {
      if(err.message){
        logger.warn(err.stack)
        apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
      }else{
        let apiErrorCode = ''
        switch(type){
          case CREATE_ITEM:
            apiErrorCode = 'C000100'
            break
          case UPDATE_ITEM:
            apiErrorCode = 'C000200'
            break
        }
        apiErrorRes(ctx, apiErrorCode, errorCode.ERRORFORMAT)
      }
    }
  }

  static async getDropDownVal(ctx) {
    let productType = (ctx.params.productType)? ctx.params.productType: ''
    let res = await bomItemSvc.getDropDownVal(productType)
    ctx.body = res
    ctx.status = 200
  }

  static async getParentLevel(ctx) {
    let { level, bom_id, item_id, version_id } = ctx.query
    try {
      if (BOM_ITEM_LEVEL.indexOf(level) < 0) throw new Error('level')
      if (!validator.isInt(bom_id.toString())) throw new Error('bom_id')
      if (item_id != 'null' && item_id != undefined && !validator.isLength(item_id, { min: 1, max: 64 })) throw new Error('item_id')
      // if (item_id != 'null' && !validator.isInt(item_id)) throw new Error('item_id')
      if (item_id == 'null' && item_id != undefined)
        item_id = null

      let res = await bomItemSvc.getParentLevel(bom_id, level, item_id, version_id)
      ctx.body = res
      ctx.status = 200
    } catch (err) {
      logger.warn('error request:', err)
      apiErrorRes(ctx, 'C000300', errorCode.ERRORFORMAT)
    }
  }

  static async getPartCategoryByReferencePartNumber(ctx) {
    let partNumber = ctx.params.partNumber
    let result = await bomItemSvc.getType1And2ByRefPartNumber(partNumber)
    ctx.body = result
    ctx.status = 200
  }

  static async uploadBomItems(ctx) {
    try {
      let user = ctx.request.user
      let maxSize = 31457280 // 30MB
      const { bom_id } = ctx.params

      if (!ctx.request.files || !bom_id) {
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      if(ctx.request.files.file && ctx.request.files.file.size > maxSize){
        console.log('FILE SIZE', ctx.request.files.file.size)
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }

      let res = await bomItemSvc.getUploadFileRecord(bom_id)
      if (res) {
        apiErrorRes(ctx, 'C000103', errorCode.ERRORFORMAT)
        return
      }

      let preData = await this.prepareData(bom_id, ctx.request.files.file)
      if(preData.length <= 0){
        apiErrorRes(ctx, 'C000104', errorCode.ERRORFORMAT)
        return
      }
      this.setParentId(preData)
      let sortData = await this.sortOutData(preData)
      this.checkHasChild(sortData)

      // bomItemSvc.checkIsNeedPartList(needPartListRes, sortData)// moved

      // 20190826 check is need material spec
      // let validateConfig = await bomItemSvc.getConfigUUid()
      // let noCheckMaterial = _.filter(validateConfig, (v) => {return v.exception_type_key == 'no_need_material_spec'})
      // bomItemSvc.checkNoNeedMaterialSpec(noCheckMaterial, sortData)// moved

      // 20180826 add get no need check Dependency value
      // let noCheckDependency = _.filter(validateConfig, (v) => {return v.exception_type_key == 'no_need_dependency_val'})
      // bomItemSvc.checkNoNeedDependency(noCheckDependency, sortData)// moved

      // 20190720 modify by spec  Leverage Common Part / Reference Part Number 若此欄位有填寫，則該相目不需填寫 Part list
      // 如果 if need new tooling click Y 填了N，且ref partnumber有填就不出partlist;  填了Y，則須填寫partlist
      // 20190801 母階有子階的料，皆不需填 Part List,Type II 後之欄位 (不含 Type II) 皆不讀取儲存至系統(Material Spec., Material)。
      /* _.forEach(sortData, (v) => {// moved
        if ((v.ref_part_num && (!v.need_new_tooling || (v.need_new_tooling.toUpperCase().trim() == 'N'))) || v.hasChild) {
          v.needPartList = null
          v.noNeedCheckDependency = true
          v.formate = null
        }
        if(v.hasChild){
          v.material_spec = null
          v.material = null
          v.noNeedCheckDependency = true
        }
      })*/

      // let checkVaildRes = await this.checkInputValue(sortData, bom_id)// moved
      let failmessage = []
      let sortLength = sortData.length
      for (let i = 0; i < sortLength; i++) {
        let v = sortData[i]
        let prepareRes = await bomItemSvc.BomItems.prepareItem(v, bom_id)
        v = prepareRes.item
        if(!v.pass){
          let message = {}
          // 20190821 add rom number include import excel header
          message.item = i + 1 + 1
          message.errorCode = prepareRes.errorCode
          failmessage.push(message)
        }
      }

      // this.checkTreeCircle(checkVaildRes)
      // let passRes = _.filter(checkVaildRes, (v) => {return v.pass})
      let failRes = _.filter(sortData, (v) => { return !v.pass })

      // 20190712 modify by spec 有錯誤項目就不能完成上傳
      let tmpId = null
      if (failRes.length <= 0) {
        // check tree circle
        this.checkTreeCircle(sortData)
        failRes = _.filter(sortData, (v) => { return !v.pass })
        if (failRes.length <= 0) {
          await meBomCost.getMaterialLastPriceByBomId(sortData, bom_id)
          // insert to temp table
          tmpId = await bomItemSvc.uploadBomItemTemp(sortData, bom_id, user.userID)
        }else{
          _.forEach(sortData, (v, idx) =>{
            if(!v.pass){
              let message = {}
              message.item = idx + 1
              message.errorCode = 'C000149'
              failmessage.push(message)
            }
          })
        }
      }

      // ctx.body = { upload_tmp_id: tmpId, passCount: passRes.length, failCount: preData.length - passRes.length, failMessage: failmessage }
      ctx.body = { upload_tmp_id: tmpId, passCount:  preData.length - failRes.length, failCount:failRes.length, failMessage: failmessage }
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for uploadBomItems', err.message, err.stack)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }

  static async deleteTempBom(ctx){
    const { id } = ctx.params
    try {
      if (!id) {
        apiErrorRes(ctx, 'C000200', errorCode.ERRORFORMAT)
        return
      }
      let res = await bomItemSvc.deleteUploadBomItemTemp(id)
      ctx.body = { res: res }
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C000200', errorCode.ERRORFORMAT)
    }
  }

  static async confirmUploadBomItem(ctx){
    /* const partlistConfig = await getPartlistConfig()
    const getByHasUI = function(hasUI, partCategory2Id, partCategory1Id) {
      return partlistConfig
        .filter(value => value.hasui === hasUI)
        .find(value => value.part_category_1_id === partCategory1Id && value.part_category_2_id === partCategory2Id)
    } */
    let user = ctx.request.user
    const { id } = ctx.params
    let item = ctx.request.body
    let { transferOwner, bomID } = item
    try {
      if (!id || !transferOwner || transferOwner.length == 0 || !bomID) {
        apiErrorRes(ctx, 'missing paramater', errorCode.ERRORFORMAT)
        return
      }
      // check transfer destion
      let checkRes = await bomItemSvc.checkTransferUser(bomID, transferOwner)
      if(!checkRes){
        apiErrorRes(ctx, 'wrong transfer owner', errorCode.ERRORFORMAT)
        return
      }
      let res =  await bomItemSvc.confirmUploadBomItem(id, transferOwner, bomID, user.userID)
      let productTypeInfo = await bomItemModel.getProductTypeInfoByBomID(bomID)
      await asyncForEach(res.bomItems, async (bomItem) => {
        await bomItemSvc.BomItems.updatePartList(bomItem, bomItem.id, productTypeInfo.product_type_id, productTypeInfo.product_type_name)
      })

      ctx.body = { version_id: res.new_version_id }
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for confirmUploadBomItem', err)
      apiErrorRes(ctx, 'C000200', errorCode.ERRORFORMAT)
    }
  }

  static async getUploadItemOwner(ctx){
    const { bom_id, id } = ctx.params
    try {
      if (!bom_id) {
        apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
        return
      }
      let res = await bomItemSvc.getBomItemUploadOwner(bom_id, id)
      ctx.body = res
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for bom_item', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }

  static async deleteUploadRecord(ctx){
    const { bom_id, stage_id } = ctx.params
    try {
      if (!bom_id || !stage_id) {
        apiErrorRes(ctx, 'missing paramaters', errorCode.ERRORFORMAT)
        return
      }
      let res = await bomItemSvc.deleteUploadBomRecord(bom_id, stage_id)
      ctx.body = res
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for deleteUploadRecord', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }


  static async getPartListDetail(ctx){
    const { bom_item_id } = ctx.params
    const { versionid, product_type_id, product_type_name } = ctx.request.body
    try {
      if (!bom_item_id) {
        apiErrorRes(ctx, 'missing paramaters', errorCode.ERRORFORMAT)
        return
      }
      let res = {}
      if(versionid && versionid.toUpperCase() != 'CURRENT'){
        res = await bomItemSvc.getHistoryPartListDetail(bom_item_id, product_type_id, product_type_name)
      }else{
        res = await bomItemSvc.getPartListDetail(bom_item_id, product_type_id, product_type_name)
      }
      ctx.body = { partlist_value: res }
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for getPartListDetail', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }

  static async getPartListPrice(ctx){
    const { userID } = ctx.request.user
    const { bom_item_id } = ctx.params
    const { versionid } = ctx.request.body

    try {
      if (!bom_item_id) {
        apiErrorRes(ctx, 'missing paramaters', errorCode.ERRORFORMAT)
        return
      }
      let res = {}
      if(versionid && versionid.toUpperCase() != 'CURRENT'){
        res = await bomItemSvc.getHistoryPartListPrice(bom_item_id, userID)
      }else{
        res = await bomItemSvc.getPartListPrice(bom_item_id, userID)
      }
      ctx.body = { partlist_price: res }
      ctx.status = 200
    }catch (err) {
      logger.warn('error request for getPartListPrice', err)
      apiErrorRes(ctx, 'C000100', errorCode.ERRORFORMAT)
    }
  }

  static async getFile(reader, upStream) {
    return new Promise(function (result) {
      let stream = reader.pipe(upStream)
      stream.on('finish', function (err) {
        result(err)
      })
    })
  }

  static createFileName(length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    _.times(length, () => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    })

    return text
  }

  static async deleteFile(path) {
    try {
      fs.unlinkSync(path)
    } catch (err) {
      console.log(`fail deleted ${path}`)
    }
  }

  static async prepareData(bomId, file) {
    const downPath = path.resolve(__dirname, '../../utils/excel/')
    const reader = fs.createReadStream(file.path)	// read file strem
    const ext = file.name.split('.').pop()		// get upload file extensio
    let type = ''
    if (ext != 'xlsx' && ext != 'xls' && ext != 'xlsm') {
      // Wrong Formate
      throw new Error('C000101')
    }
    const filename = this.createFileName(10)
    const filePath = path.resolve(`${downPath}/${filename}.${ext}`)
    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)
    const workbook = xlsx.readFile(filePath)
    const sheetNames = workbook.SheetNames
    const isFristHeader = true
    const numberLength = 5
    let arr = []

    _.forEach(sheetNames, (v) => {
      if (v.toUpperCase().replace(/ /g, '').trim() != 'UPLOADBOM') {
        return
      }
      type = v
      let worksheet = workbook.Sheets[v]
      if (!isFristHeader) {
        type = v
        worksheet['!ref'] = worksheet['!ref'].replace('A1', 'A2')
      }
      let data = xlsx.utils.sheet_to_json(worksheet, { raw: true, defval: null })

      if (!data && data.length <= 0) {
        return
      }

      _.forEach(data, (v, idx) => {
        let obj = {}
        _.forEach(v, (dv, key) => {
          // trim string space and fix number
          let header = key.replace(/(?:\\[rn]|[\u4E00-\u9FA5]|[*]|[\r\n]+)+/g, '').replace(/ /g, '')
          // header = header.replace(/\-?\d+\.\d+/g, '').replace(/\-?\d+\.+/g)
          let value = ''
          if (header.indexOf('(') > -1) header = header.substring(0, header.indexOf('('))
          if(header.indexOf('__EMPTY') > -1) return
          if (typeof dv === 'string') value = !dv ? '' : dv.toString().replace(/(?:\\[rn])+/g, '').trim()
          if (dv && typeof dv === 'number' && dv.toString().length > numberLength) {
            value = Number(dv.toFixed(numberLength))
          }else{
            value = dv == null || dv == undefined ? '' : dv.toString().replace(/(?:\\[rn])+/g, '').trim()
          }
          obj[header] = value.toString()
        })
        obj.supply_type = 'AVAP'
        obj.id = UUID()
        obj.bom_id = bomId
        arr.push(obj)
      })
    })
    // excel template has 53 column header, add three cloumn for id, bom_id, supplyType = 56
    if(!arr[0] || Object.keys(arr[0]).length != 56){
      // Column number is not match
      throw new Error('C000105')
    }
    this.deleteFile(filePath)
    return arr
  }

  static setParentId(data){
    _.forEach(data, (v) => {
      if (v.ParentsPartName) {
        // 20190829 new excel format
        // let parentFilterRes = _.find(data, ['WistronPartName',  v.ParentsPartName])
        let parentFilterRes = _.find(data, ['PartName',  v.ParentsPartName])
        if(parentFilterRes){
          v.parentId = parentFilterRes.id
        }
      }
    })
    return data
  }

  static async sortOutData(data){
    let dropDownItemObj = {}
    let refPartNumType = {}
    // let parentFilterRes = _.filter(data, (dv)=>{return !dv.ParentsPartName})
    let perpareArr = []
    dropDownItemObj.parts_ctgy_1 = {}
    dropDownItemObj.parts_ctgy_2 = {}
    dropDownItemObj.material_spec = {}
    dropDownItemObj.material = {}
    dropDownItemObj.gb_assy_ctgy = {}
    dropDownItemObj.func_ctgy = {}
    dropDownItemObj.supply_type = {}
    dropDownItemObj.odm_oem = {}
    dropDownItemObj.initModifyDel  = {}
    let notFindArr = []
    let productType = null
    // let mappingConfig = await bomItemSvc.getMappingPartCtgy()
    for (const v of data) {
      try{
        let obj = {}
        let notFindObj = {}
        let extensionObj = {}
        productType = productType ? productType : v.ProductType ? v.ProductType : null
        obj.product_type = productType
        obj.id = v.id
        obj.bom_id = v.bom_id
        obj.level = v.Level ? v.Level.toString() : null
        obj.qty = v.QTY ? v.QTY : 1
        // obj.part_name = v.WistronPartName ? v.WistronPartName : null
        // 20190829 for new excel format
        obj.part_name = v.PartName ? v.PartName : null
        obj.sub_leve =  v.ParentsPartName ? true : false
        obj.part_size_l = v.L ? v.L : null
        obj.part_size_w = v.W ? v.W : null
        obj.part_size_h = v.H ? v.H : null
        obj.part_size_ef = v['Ф'] ? v['Ф'] : null
        obj.part_size_m = v.M ? v.M : null
        obj.part_size_l2 = v.L2 ? v.L2 : null
        obj.part_size_w2 = v.W2 ? v.W2 : null
        obj.thickness = v.Thickness ? v.Thickness : null
        obj.part_weight = v.Weight ? v.Weight : null
        obj.rfq_pn = `${this.makeShortId()}${new Date().getTime()}`
        obj.customer_pn = null
        obj.owner = v.Owner ? v.Owner : 'TBD'
        // let filterRes = _.find(parentFilterRes, (dv)=>{return v.ParentsPartName === dv.WistronPartName})
        obj.parent_level = v.parentId ? v.parentId : null
        obj.ref_part_num = v['LeverageCommonPart/ReferencePartNumber'] ? v['LeverageCommonPart/ReferencePartNumber'] : null
        obj.sku0 = v.SKU0 != null &&  v.SKU0 != '' ? v.SKU0 : null
        obj.sku1 = v.SKU1 != null &&  v.SKU1 != '' ? v.SKU1 : null
        obj.sku2 = v.SKU2 != null &&  v.SKU2 != '' ? v.SKU2 : null
        obj.sku3 = v.SKU3 != null &&  v.SKU3 != '' ? v.SKU3 : null
        obj.sku4 = v.SKU4 != null &&  v.SKU4 != '' ? v.SKU4 : null
        obj.sku5 = v.SKU5 != null &&  v.SKU5 != '' ? v.SKU5 : null
        obj.parts_ctgy_1_name = v.PartCategoryI
        obj.parts_ctgy_2_name = v.PartCategoryII

        // 帶入 Leverage Common Part 或Reference P/N 的 Type I 及 Type II
        let refPartNum = v['LeverageCommonPart/ReferencePartNumber']
        if (refPartNum) {
          if(!v.PartCategoryI && !v.PartCategoryII){
            if (!refPartNumType.hasOwnProperty(refPartNum)) {

              // 帶入Leverage Common Part時更換partName的部份在bomItemService.prepareItem時替換
              // online edit由前端換type1 type2 因此只有import excel才有此段
              let partNumTypeRes = await bomItemSvc.getTypeUseRefPartNumber(refPartNum)
              if (partNumTypeRes && partNumTypeRes.length > 0) {
                refPartNumType[refPartNum] = {
                  type1: partNumTypeRes[0].category_1_name ? partNumTypeRes[0].category_1_name : partNumTypeRes[0].type1name,
                  type2: partNumTypeRes[0].category_2_name ? partNumTypeRes[0].category_2_name : partNumTypeRes[0].type2name,
                }
                v.PartCategoryI = refPartNumType[refPartNum].type1
                v.PartCategoryII = refPartNumType[refPartNum].type2
              }
            } else {
              v.PartCategoryI = refPartNumType[refPartNum].type1 ? refPartNumType[refPartNum].type1 : null
              v.PartCategoryII = refPartNumType[refPartNum].type2 ? refPartNumType[refPartNum].type2 : null
            }
          }
        }

        // the following need get uuid
        // parts_ctgy_1
        // { 'parts_ctgy_1' : {'HOUSING' : {....}, 'THEMAL'}}
        if (v.PartCategoryI && !dropDownItemObj['parts_ctgy_1'][v.PartCategoryI]) {
          // dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] = await bomItemSvc.getDropDownUuid(v.PartCategoryI.toUpperCase(), 'parts_ctgy_1', { parts_ctgy_1: null, parts_ctgy_2: null, material_spec: null })
          dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] = await bomItemSvc.getPartCtgy1Value(v.PartCategoryI.toUpperCase())
          if(!dropDownItemObj['parts_ctgy_1'][v.PartCategoryI]){
            notFindObj['parts_ctgy_1'] = v.PartCategoryI
          }
          obj.parts_ctgy_1 = dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI].id : null
        } else {
          obj.parts_ctgy_1 = v.PartCategoryI ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI].id : null : null
        }

        // parts_ctgy_2
        if (v.PartCategoryII && !dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII]) {
          let ctgy1 = dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] : v.PartCategoryI
          let ctg1Name = ctgy1.item_name ? ctgy1.item_name : ctgy1
          let ctg1Path = ctgy1.path ? ctgy1.path : null
          let ctg1Id = ctgy1.id ? ctgy1.id : null
          // dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] = await bomItemSvc.getDropDownUuid(v.PartCategoryII.toUpperCase(), 'parts_ctgy_2', { parts_ctgy_1: ctg1Name.toUpperCase(), parts_ctgy_2: v.PartCategoryII.toUpperCase(), material_spec: null }, ctg1Path)
          dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] = await bomItemSvc.getPartCtgy2Value(ctg1Id, v.PartCategoryII.toUpperCase())
          if (!dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII]) {
            notFindObj['parts_ctgy_2'] = v.PartCategoryII
          }
          obj.parts_ctgy_2 = dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] ? dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII].id : null
        } else {
          obj.parts_ctgy_2 = v.PartCategoryII ? dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] ? dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII].id : null : null
        }

        // material_spec
        if (v['MaterialSpec.'] && !dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']]) {
          let ctgy1 = dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] : v.PartCategoryI
          let ctgy2 = dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] ? dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] : v.PartCategoryII
          let ctg2Id = ctgy2.id ? ctgy2.id : null
          // dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] = await bomItemSvc.getDropDownUuid(v['MaterialSpec.'].toUpperCase(), 'material_spec',
          //   { parts_ctgy_1: ctg1Name.toUpperCase(), parts_ctgy_2: ctg2Name.toUpperCase(), material_spec:v['MaterialSpec.'].toUpperCase() }, ctgPath)
          dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] = await bomItemSvc.getMaterialSpecValue(ctg2Id, v['MaterialSpec.'].toUpperCase())
          obj.material_spec = dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] ? dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']].id : null
          if (!dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']]) {
            notFindObj['material_spec'] = v['MaterialSpec.']
          }
        } else {
          obj.material_spec = v['MaterialSpec.'] ? dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] ? dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']].id : null : null
        }

        // material
        if (v.Material && !dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material]) {
          let ctgy1 = dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] ? dropDownItemObj['parts_ctgy_1'][v.PartCategoryI] : v.PartCategoryI
          let ctgy2 = dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] ? dropDownItemObj['parts_ctgy_2'][v.PartCategoryI + '_' + v.PartCategoryII] : v.PartCategoryII
          let materSpec = dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] ? dropDownItemObj['material_spec'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.']] : v['MaterialSpec.']
          let ctgy2Id = ctgy2.id ? ctgy2.id : null
          let materSpecId = materSpec.id ? materSpec.id : null
          // dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material] = await bomItemSvc.getDropDownUuid(v.Material.toUpperCase(), 'material',
          //   { parts_ctgy_1: ctg1Name.toUpperCase(), parts_ctgy_2: ctg2Name.toUpperCase(), material_spec: materSpecName.toUpperCase(), material:v.Material.toUpperCase() }, materSpecPath)
          dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material] = await bomItemSvc.getMaterialValue(ctgy2Id, materSpecId, v.Material.toUpperCase())
          obj.material = dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material] ? dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material].id : null
          if(!dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material]){
            notFindObj['material'] = v.Material
          }
        } else {
          obj.material = v.Material ? dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material] ? dropDownItemObj['material'][v.PartCategoryI + '_' + v.PartCategoryII + '_' + v['MaterialSpec.'] + '_' + v.Material].id : null : null
        }

        // gb_assy_ctgy
        if (v.AssyCategory && !dropDownItemObj['gb_assy_ctgy'][v.AssyCategory]) {
          // dropDownItemObj['gb_assy_ctgy'][v.AssyCategory] = await bomItemSvc.getDropDownUuid(v.AssyCategory.toUpperCase(), 'gb_assy_ctgy',
          //   { parts_ctgy_1: null, parts_ctgy_2: null, material: null })
          dropDownItemObj['gb_assy_ctgy'][v.AssyCategory] = await bomItemSvc.getAssyCtgyValue(v.AssyCategory.toUpperCase(), productType)
          obj.gb_assy_ctgy = dropDownItemObj['gb_assy_ctgy'][v.AssyCategory] ? dropDownItemObj['gb_assy_ctgy'][v.AssyCategory].id : v.AssyCategory
          if(!dropDownItemObj['gb_assy_ctgy'][v.AssyCategory]){
            notFindObj['gb_assy_ctgy'] = v.AssyCategory
          }
        } else {
          obj.gb_assy_ctgy = v.AssyCategory ? dropDownItemObj['gb_assy_ctgy'][v.AssyCategory] ? dropDownItemObj['gb_assy_ctgy'][v.AssyCategory].id : null : null
        }

        // func_ctgy
        if (v.FunctionCategory && !dropDownItemObj['func_ctgy'][v.FunctionCategory]) {
          // dropDownItemObj['func_ctgy'][v.FunctionCategory] = await bomItemSvc.getDropDownUuid(v.FunctionCategory.toUpperCase(), 'func_ctgy',
          //   { parts_ctgy_1: null, parts_ctgy_2: null, material: null })
          dropDownItemObj['func_ctgy'][v.FunctionCategory] = await bomItemSvc.getFunCtgyValue(v.FunctionCategory.toUpperCase())
          obj.func_ctgy = dropDownItemObj['func_ctgy'][v.FunctionCategory] ? dropDownItemObj['func_ctgy'][v.FunctionCategory].id : null
          if(!dropDownItemObj['func_ctgy'][v.FunctionCategory]){
            notFindObj['func_ctgy'] = v.FunctionCategory
          }
        } else {
          obj.func_ctgy = v.FunctionCategory ? dropDownItemObj['func_ctgy'][v.FunctionCategory] ? dropDownItemObj['func_ctgy'][v.FunctionCategory].id : null : null
        }

        // supply_type
        if (v['supply_type'] && !dropDownItemObj['supply_type'][v['supply_type']]) {
          // dropDownItemObj['supply_type'][v['supply_type']] = await bomItemSvc.getDropDownUuid(v['supply_type'].toUpperCase(), 'supply_type',
          //   { parts_ctgy_1: null, parts_ctgy_2: null, material: null })
          dropDownItemObj['supply_type'][v['supply_type']] = await bomItemSvc.getSupplyTypeValue(v['supply_type'].toUpperCase())
          obj.supply_type = dropDownItemObj['supply_type'][v['supply_type']] ? dropDownItemObj['supply_type'][v['supply_type']].id : null
        } else {
          obj.supply_type = v['supply_type'] ? dropDownItemObj['supply_type'][v['supply_type']] ? dropDownItemObj['supply_type'][v['supply_type']].id : null : null
        }

        // ODM/OEM
        if (v['ODM/OEM'] && !dropDownItemObj['odm_oem'][v['ODM/OEM']]) {
          // dropDownItemObj['odm_oem'][v['ODM/OEM']] = await bomItemSvc.getDropDownUuid(v['ODM/OEM'].toUpperCase(), 'odm_oem',
          //   { parts_ctgy_1: null, parts_ctgy_2: null, material: null })
          dropDownItemObj['odm_oem'][v['ODM/OEM']] = await bomItemSvc.getOdmoemValue(v['ODM/OEM'].toUpperCase())
          obj.odm_oem = dropDownItemObj['odm_oem'][v['ODM/OEM']] ? dropDownItemObj['odm_oem'][v['ODM/OEM']].id : null
        } else {
          obj.odm_oem = v['ODM/OEM'] ? dropDownItemObj['odm_oem'][v['ODM/OEM']] ? dropDownItemObj['odm_oem'][v['ODM/OEM']].id : null : null
        }

        // Initial/Add/Modify/Delete
        // 20190710 modify by spec 匯入後，Default 皆帶 initial
        v['Initial/Add/Modify/Delete'] = 'Initial'
        if (v['Initial/Add/Modify/Delete'] && !dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']]) {
          // dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']] = await bomItemSvc.getDropDownUuid(v['Initial/Add/Modify/Delete'].toUpperCase(), 'initaddmodidel',
          //   { parts_ctgy_1: null, parts_ctgy_2: null, material: null })
          dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']] = await bomItemSvc.getOperationValue(v['Initial/Add/Modify/Delete'].toUpperCase())
          obj.initAddModiDel = dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']] ? dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']].id : null
        } else {
          obj.initAddModiDel = v['Initial/Add/Modify/Delete'] ? dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']] ? dropDownItemObj['initModifyDel'][v['Initial/Add/Modify/Delete']].id : null : null
        }

        // 20190720 modify by spec 如果Wistron Part Number 為空, 帶入 Leverage Common Part 或Reference P/N 的 Part Number
        // 20190829 for new excel format
        // obj.part_number = v.WistronPartNumber ?  v.WistronPartNumber : v['LeverageCommonPart/ReferencePartNumber'] ? v['LeverageCommonPart/ReferencePartNumber'] : null
        obj.part_number = v.PartNumber ?  v.PartNumber : v['LeverageCommonPart/ReferencePartNumber'] ? v['LeverageCommonPart/ReferencePartNumber'] : null
        obj.need_new_tooling = v.IfneednewtoolingclickY
        obj.remark = v.Remark
        // extension column
        // extensionObj['Initial/Add/Modify/Delete'] = v['Initial/Add/Modify/Delete']
        // extensionObj['ODM/OEM'] = v['ODM/OEM']
        // extensionObj.remark = v.Remark
        // extensionObj.ifneednewtoolingclickY = v.IfneednewtoolingclickY
        extensionObj['1.ID/METreatmentProcess'] = v['1.ID/METreatmentProcess']
        extensionObj['1.1Finsih/Spec'] = v['1.1Finsih/Spec']
        extensionObj['1.2Color'] = v['1.2Color']
        extensionObj['2.ID/METreatmentProcess'] = v['2.ID/METreatmentProcess']
        extensionObj['2.1Finsih/Spec'] = v['2.1Finsih/Spec']
        extensionObj['2.2Color'] = v['2.2Color']
        extensionObj['3.ID/METreatmentProcess'] = v['3.ID/METreatmentProcess']
        extensionObj['3.1Finsih/Spec'] = v['3.1Finsih/Spec']
        extensionObj['3.2Color'] = v['3.2Color']
        extensionObj['4.ID/METreatmentProcess'] = v['4.ID/METreatmentProcess']
        extensionObj['4.1Finsih/Spec'] = v['4.1Finsih/Spec']
        extensionObj['4.2Color'] = v['4.2Color']
        extensionObj['1.FixtureCreateProcess'] = v['1.FixtureCreateProcess']
        extensionObj['1.1Finsih/Spec_1'] = v['1.1Finsih/Spec_1']
        extensionObj['1.2Color_1'] = v['1.2Color_1']
        extensionObj['2.FixtureCreateProcess'] = v['1.FixtureCreateProcess']
        extensionObj['2.1Finsih/Spec_1'] = v['1.1Finsih/Spec_1']
        extensionObj['2.2Color_1'] = v['1.2Color_1']
        extensionObj['3.FixtureCreateProcess'] = v['3.FixtureCreateProcess']
        extensionObj['3.1Finsih/Spec_1'] = v['3.1Finsih/Spec_1']
        extensionObj['3.2Color_1'] = v['3.2Color_1']
        // extensionObj.wistronPartNumber = v.WistronPartNumber
        obj.extension = extensionObj
        obj.created_time = moment.utc().format()
        obj.modified_time = moment.utc().format()
        perpareArr.push(obj)
        notFindArr.push(notFindObj)
      }catch(err){
        logger.error('ERROR', err)
        logger.warn('sortOutData', v)
      }
    }
    logger.warn('not found base data uuid =======================>', JSON.stringify(notFindArr))
    dropDownItemObj = {}
    notFindArr = []
    return perpareArr
  }

  static checkHasChild(bomItemList){
    for(const bomItem of bomItemList){
      let findRes = bomItemList.find((subBomItem) => {return bomItem.id === subBomItem.parent_level})
      if(!_.isUndefined(findRes)){
        bomItem.hasChild = true
      } else {
        bomItem.hasChild = false
      }
    }
  }

  static async checkTreeCircle(src) {
    try {
      // check tree hierarchy
      bomItemSvc.checkTreeCircle(src)
    } catch (err) {
      let fails = _.filter(src, (v) => {return !v.pass})
      logger.info('check Tree Circle fail', fails)
    }
  }

  static makeShortId() {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }

  static async uploadSorcerCostExcel(ctx){
    try {
      let user = ctx.request.user
      let maxSize = 31457280 // 30MB
      const { bom_id } = ctx.params
      if (!ctx.request.files || !bom_id) {
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }
      let permission = await rbacService.getPolicyByUser(user.userID, {
        action: 'View',
        resource: 'me_bom_projects.bom_item.source_cost',
      })
      if(Object.keys(permission).length !== 0){
        return apiErrorRes(ctx, 'permission deny', errorCode.UNAUTHORIZED)
      }

      if(ctx.request.files.file && ctx.request.files.file.size > maxSize){
        logger.debug('FILE SIZE', ctx.request.files.file.size)
        apiErrorRes(ctx, 'C000102', errorCode.ERRORFORMAT)
        return
      }
      const upload_tmp_id = UUID()
      let meExcelDataList = await this.parserMeExcel(upload_tmp_id, bom_id, ctx.request.files.file)
      if(meExcelDataList.length <= 0){
        apiErrorRes(ctx, 'C000104', errorCode.ERRORFORMAT)
        return
      }
      let failResult = this.checkMeExcelData(meExcelDataList)
      if(failResult.count === 0){ // 無錯誤，上傳至temp
        await bomItemSvc.uploadBomSourcerCostTemp(meExcelDataList, user.userID, upload_tmp_id)
      }
      // 設定5分鐘後自動刪除暫存檔
      setTimeout(()=>{
        bomItemSvc.deleteSourcerCostExcel(upload_tmp_id)
      }, 5 * 60 * 1000)
      ctx.body = { upload_tmp_id: upload_tmp_id, passCount:  meExcelDataList.length - failResult.count, failCount:failResult.count, failMessage: failResult.message }
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for uploadSorcerCostExcel', err.message, err.stack)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
  /**
   * @param {String} upload_tmp_id
   * @param {String} bomId
   * @param {Object} file
   */
  static async parserMeExcel(upload_tmp_id, bomId, file) {
    const downPath = path.resolve(__dirname, '../../utils/excel/')
    const reader = fs.createReadStream(file.path)	// read file strem
    const ext = file.name.split('.').pop()		// get upload file extensio
    if (ext != 'xlsx' && ext != 'xls' && ext != 'xlsm') {
      // Wrong Formate
      throw new Error('C000101')
    }
    const filename = this.createFileName(10)
    const filePath = path.resolve(`${downPath}/${filename}.${ext}`)
    const upStream = fs.createWriteStream(filePath)
    await this.getFile(reader, upStream)
    const workbook = xlsx.readFile(filePath)
    const sheetNames = workbook.SheetNames
    const lastVersionInfo = await bomItemSvc.getLastVersionById(bomId)
    if(_.isNil(lastVersionInfo)){
      logger.warn(`Can not find bomIdVersionInfo by BomId :${bomId}`)
      throw new Error('C000202')
    }
    let result = []
    for(const sheetName of sheetNames){
      if (this._isMeSheet(sheetName)) {
        continue
      }
      let worksheet = workbook.Sheets[sheetName]
      let bomItemList = xlsx.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 12,
        raw: true,
        defval: null,
      })
      if(bomItemList[0].length !== SOURCER_COST_EXCEL_COLUMN_LENGTH){ // 欄位數檢查，避免欄位數被偷改
        logger.warn(`wrong column length : ${bomItemList[0].length}.The SOURCER_COST_EXCEL_COLUMN_LENGTH should be ${SOURCER_COST_EXCEL_COLUMN_LENGTH}`)
        throw new Error('C000205')
      }
      await this._checkSourcerCostExcelCurrency(worksheet)
      await this._checkSourcerCostExcelVersion(bomId, worksheet, lastVersionInfo)
      for(let bomItem of bomItemList){
        result.push({
          'upload_tmp_id':upload_tmp_id,
          'bomId': bomId,
          'bomItemId':bomItem[42],
          'sourcerShipping': bomItem[9],
          'sourcerPl': bomItem[10],
          'sourcerAssembly': bomItem[11],
          'sourcerCost': bomItem[12],
          'sourcerRemark': bomItem[14],
          'sourcer_import_curr': this._getExcelCurrency(worksheet),
        })
      }
    }
    await this.deleteFile(filePath)
    return result
  }
  /**
   * 檢查sheet名稱是否為ME
   * @param {String} sheetName SourcerCost excel sheet name
   */
  static _isMeSheet(sheetName){
    return sheetName.toUpperCase().replace(/ /g, '').trim() != 'ME'
  }
  /**
   * 檢查上傳的excel版本
   * @param {Number} bomId bom Project Id
   * @param {Object} worksheet SourcerCost excel worksheet
   * @param {Object} lastVersionInfo 該bom project最新的版本資訊
   */
  static async _checkSourcerCostExcelVersion(bomId, worksheet, lastVersionInfo){

    const costVersionInfo = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 'D7',
      raw: true,
      defval: null,
    })
    let excelEmdmVersionInfo = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 'D6',
      raw: true,
      defval: null,
    })
    excelEmdmVersionInfo = excelEmdmVersionInfo[0][0]
    const isEmdmProject = await emdmBomUtil.isEmdmProject(bomId)
    if(isEmdmProject){
      if(_.isNil(excelEmdmVersionInfo)){
        logger.warn('wrong emdmVersionInfo. excel EmdmVersionInfo is empty.')
        throw new Error('C000206')
      }
      const emdmProjectInfo = await bomItemSvc.getBomProjectInfoByBomId(bomId)
      const emdmProjectSourceVersion = parseInt(emdmProjectInfo[0].source_version, 10)
      const excelEmdmVersionInfoToNumber = parseInt(excelEmdmVersionInfo, 10)
      if(emdmProjectSourceVersion !== excelEmdmVersionInfoToNumber){
        logger.warn(`wrong emdmVersionInfo. excel EmdmVersionInfo is ${excelEmdmVersionInfo}. bom Project EmdmVersionInfo is ${emdmProjectInfo[0].source_version}`)
        throw new Error('C000206')
      }
    }
    const excelVersionInfo = costVersionInfo[0][0]
    if(!excelVersionInfo){
      logger.warn('wrong versionInfo. excel Version is empty.')
      throw new Error('C000203')
    }
    const versionInfo = costVersionInfo[0][0].substring(1)
    const lastVersionNum = versionInfo[versionInfo.length - 1]
    if(versionInfo !== lastVersionInfo.version_name) { // 檢查excel版本是否跟目前的最新版本相同
      logger.warn(`wrong versionInfo. excel Version : ${versionInfo}  real Version:${lastVersionInfo.version_name}`)
      throw new Error('C000203')
    } else if (lastVersionNum !== '7'){ // 檢查是否為.7版
      logger.warn(`wrong CostVersion. excel Version : ${versionInfo}. only version x.7 can upload.`)
      throw new Error('C000204')
    }
  }
  /**
   * 檢查幣別是否正確
   * @param {Object} worksheet SourcerCost excel worksheet
   * @param {String} currency 幣別
   */
  static _checkSourcerCostExcelCurrency(worksheet){
    const currencyInfo = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 'F1',
      raw: true,
      defval: null,
    })
    const currency = (_.has(currencyInfo, '0.0') && typeof currencyInfo[0][0] === 'string') ? currencyInfo[0][0].trim() : ''
    if (!Object.prototype.hasOwnProperty.call(IMPORT_SOUCERCOST_VALID_CURRENCY, currency)) {
      logger.error(`Expect file currency to be ${Object.keys(IMPORT_SOUCERCOST_VALID_CURRENCY)} instead of ${currency}`)
      throw new Error('C000199')
    }
  }
  /**
   * 取得excel幣別
   * @param {Object} worksheet SourcerCost excel worksheet
   */
  static _getExcelCurrency(worksheet){
    const currencyInfo = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 'F1',
      raw: true,
      defval: null,
    })
    return currencyInfo[0][0]
  }
  /**
   * 檢查exceldata是否符合規範
   * @param {Array} excelDataList
   */
  static checkMeExcelData(excelDataList){
    let failResult = {
      count : 0,
      message: [],
    }
    excelDataList.forEach((excelData, index) =>{
      let errorCode = null
      if(!_.isString(excelData.bomItemId)){
        errorCode = 'C000177'
      } else if(!checkMeExcelSourcerCostDataNum(excelData.sourcerShipping)){
        errorCode = 'C000172'
      } else if(!checkMeExcelSourcerCostDataNum(excelData.sourcerPl)){
        errorCode = 'C000173'
      } else if(!checkMeExcelSourcerCostDataNum(excelData.sourcerAssembly)){
        errorCode = 'C000174'
      } else if(!checkMeExcelSourcerCostDataNum(excelData.sourcerCost)){
        errorCode = 'C000175'
      } else if(!_.isNil(excelData.sourcerRemark) && !_.isString(excelData.bomItemId)){
        errorCode = 'C000176'
      }
      if(!_.isNull(errorCode)){
        failResult.count += 1
        failResult.message.push({
          item: index + 13,
          errorCode: errorCode,
        })
      }
    })
    return failResult
  }
  static async putSorcerCostExcel(ctx){
    try {
      let user = ctx.request.user
      const { id } = ctx.request.body
      await bomItemSvc.confirmUploadBomSourcerCost(id, user)
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for uploadSorcerCostExcel', err.message)
      apiErrorRes(ctx, err.message, errorCode.ERRORFORMAT)
    }
  }
}
/**
 * 檢查import進來的excel資料的數字，是否符合規範
 * @param {Any} value
 */
function checkMeExcelSourcerCostDataNum(value){
  if(_.isNull(value) || _.isNumber(value)){
    return true
  }
  return false
}

module.exports = BomItemCtrller
