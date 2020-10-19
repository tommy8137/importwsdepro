const bomItemService = require('../../service/bom/bomItem.js')
const xrayService = require('../../service/xray/xray.js')
const analysisService = require('../../service/xray/analysis.js')
const multiAnalysisService = require('../../service/xray/multiAnalysis.js')

const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const path = require('path')
const send = require('koa-send')
const moment = require('moment')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Xray')
const _ = require('lodash')
const rbacService = require('../../service/admin/rbac.js')

class Xray {
  async fetchProductType(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      }

      const result = await xrayService.fetchProductType(userID, query.role)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchTypeI(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      // let { productType } = ctx.query
      let { productType } = ctx.request.body

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType) {
        throwApiError('body parse error', errorCode.METHOD_WRONG)
        return
      } else if (!Array.isArray(productType) || (query.role.toUpperCase() == 'EE' && productType.length == 0)) {
        throwApiError('body parse error', errorCode.METHOD_WRONG)
        return
      }

      const result = await xrayService.fetchTypeI(userID, query.role, productType)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchTypeII(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      // let { productType, type1 } = ctx.query
      let { productType, type1 } = ctx.request.body

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if (!Array.isArray(productType) || (query.role.toUpperCase() == 'EE' && productType.length == 0)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.fetchTypeII(userID, query.role, productType, type1)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchSourcers(ctx) {

    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      // let { productType, type1, type2 } = ctx.query
      let { productType, type1, type2 } = ctx.request.body

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1 || !type2) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if(!Array.isArray(productType) || (query.role.toUpperCase() == 'EE' && productType.length == 0) ){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.fetchSourcers(userID, query.role, productType, type1, type2)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  // async fetchSpecTitle(ctx) {
  //   try {
  //     const query = ctx.params
  //     let { userID } = ctx.request.user
  //     let { productType, type1, type2 } = ctx.query

  //     if (!checkRole(query.role)) {
  //       throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
  //       return
  //     } else if (!productType || !type1 || !type2) {
  //       throwApiError('body parse error', errorCode.UNPROCESSABLE)
  //       return
  //     }
  //     const result = await xrayService.fetchSpecTitle(userID, query.role, productType, type1, type2)
  //     ctx.body = result
  //     ctx.status = 200

  //   } catch (err) {
  //     logger.warn('error request for Xray', err)
  //     throwApiError(err.message, err.status)
  //   }
  // }

  async fetchSpecItemsForEE(ctx) {

    try {
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { productType, sourcer, type1, type2 } = req

      if (!productType || !type1 || !type2) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }else if(!Array.isArray(productType) || productType.length == 0){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.fetchSpecItemsForEE(userID, productType, type1, type2, sourcer)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchSpecItemsForME(ctx) {

    try {
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { productType, sourcer, type1, type2, specN, spec } = req

      if (!productType || !type1 || !type2 || (typeof specN != 'number' || specN <= 0 || specN > 30) || (!spec || _.isEmpty(spec))) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if(!Array.isArray(productType)){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.fetchSpecItemsForME(userID, productType, type1, type2, sourcer, specN, spec)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchPartNumber(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      let req = ctx.request.body
      let { partNumber } = req

      if (!query.role) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!partNumber){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.fetchPartNumber(userID, query.role, partNumber)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchSpecGroups(ctx) {
    try {
      let { userID } = ctx.request.user
      const query = ctx.params

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      }

      const result  = await xrayService.fetchSpecGroups(userID, query.role)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async fetchSpecGroupByGroupID(ctx) {
    try {

      const query = ctx.params
      let { userID } = ctx.request.user
      let { groupID } = ctx.query

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!groupID) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result  = await xrayService.fetchSpecGroupByGroupID(userID, query.role, groupID)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async addSpecGroup(ctx) {
    try {
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { role, specGroupName, productType, type1, type2, sourcerList, specGroup } = req

      if (!checkRole(role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1 || !type2 || !specGroupName || !checkSpecGroupExist(specGroup)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if (!Array.isArray(productType) || (role.toUpperCase() == 'EE' && productType.length == 0)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.addSpecGroup(userID, role, specGroupName, productType, type1, type2, sourcerList, specGroup)
      ctx.body = result
      ctx.status = 200

    } catch(err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async modifySpecGroup(ctx) {
    try {
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { role, specGroupName, productType, type1, type2, sourcerList, specGroup } = req
      let groupId = ctx.params.g_id

      if (!checkRole(role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1 || !type2 || !specGroupName || !/^-?[0-9]+$/.test(groupId) || !checkSpecGroupExist(specGroup)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if(!Array.isArray(productType) || (role.toUpperCase() == 'EE' && productType.length == 0)){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await xrayService.modifySpecGroup(userID, role, specGroupName, productType, type1, type2, sourcerList, specGroup, groupId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async deleteSpecGroup(ctx) {
    try {
      let { userID } = ctx.request.user
      let groupId = ctx.params.g_id

      if (!/^-?[0-9]+$/.test(groupId)){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
      }

      const result = await xrayService.deleteSpecGroup(userID, groupId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async spaAnalysis(ctx) {

    try {
      const query = ctx.params
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { productType, sourcer, type1, type2, dateFrom, dateTo, mrp, block, spec, exp, referencePN } = req

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1 || !type2 || mrp == null || block == null || (!spec || _.isEmpty(spec)) || !_.isBoolean(mrp) || !_.isBoolean(block)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      } else if(!Array.isArray(productType) || (query.role.toUpperCase() == 'EE' && productType.length == 0)){
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }

      const result = await analysisService.spaAnalysis(userID, query.role, productType, sourcer, type1, type2, dateFrom, dateTo, mrp, block, spec, referencePN, exp)

      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }

  async spaExport(ctx) {
    try {
      const query = ctx.params
      let { userID } = ctx.request.user
      let req = ctx.request.body
      let { productType, sourcer, type1, type2, dateFrom, dateTo, mrp, block, spec, exp, referencePN } = req

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      }

      let resource = null
      if (query.role.toUpperCase() == 'ME') {
        resource = 'xray.me'
      } else if(query.role.toUpperCase() == 'EE'){
        resource = 'xray.ee'
      }

      let exportPermission = await rbacService.getPolicyByUser(userID, {
        action: 'Export',
        resource,
      })

      if(!exportPermission || !exportPermission.Export || exportPermission.Export.allow.indexOf(resource) < 0 ) {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
        return
      }

      if (!productType || !type1 || !type2 || (!spec || _.isEmpty(spec)) || !_.isBoolean(mrp) || !_.isBoolean(block)) {
        throwApiError('body parse error', errorCode.UNPROCESSABLE)
        return
      }
      const spaFileDate = moment(new Date()).format('YYYYMMDD')
      let timeStamp = moment(new Date()).format('YYYYMMDDhmmss')
      const fileName = `Eprocurement_XRay_SPA_${query.role}_${spaFileDate}.xlsx`
      const folderPath = `Eprocurement_XRay_SPA_${query.role}_${timeStamp}`
      const spaPath = `/server/utils/excel/${folderPath}/${fileName}`
      const res = await analysisService.spaAnalysis(userID, query.role, productType, sourcer, type1, type2, dateFrom, dateTo, mrp, block, spec, referencePN, exp)
      const result = await xrayService.spaExport(res, query.role.toUpperCase(), fileName, folderPath)
      if(result == false) {
        ctx.body = { message: 'no record' }
        ctx.status = 401
      } else {
        ctx.attachment(spaPath)
        ctx.body = result
        ctx.status = 200
        await send(ctx, spaPath)
      }

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }
  }
  
  async lppAnalysis(ctx) {
    try {
      const query = ctx.params
      let req = ctx.request.body
      let { userID } = ctx.request.user
      let { productType, sourcer, type1, type2, mrp, spec } = req

      if (!checkRole(query.role)) {
        throwApiError('Method Not Allowed.', errorCode.METHOD_WRONG)
        return
      } else if (!productType || !type1 || !type2 || mrp == null ||  (!spec || _.isEmpty(spec)) || !_.isBoolean(mrp) ) {
        throwApiError('body parse error11111', errorCode.UNPROCESSABLE)
        return
      }

      const result  = await analysisService.lppAnalysis(userID, query.role, productType, sourcer, type1, type2, mrp, spec)
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Xray', err)
      throwApiError(err.message, err.status)
    }

    // const { request: req } = ctx

    // const result  = await analysisService.lppAnalysis(req.body)
    // ctx.body = result
    // ctx.status = 200
  }
}

function checkRole(role) {
  if (!role || (role.toUpperCase() != 'ME' && role.toUpperCase() != 'EE')) {
    return false
  } else {
    return true
  }
}

function checkSpecGroupExist(group) {
  return Object.values(group).map((key) => {
    return (key != null && key.length > 0)
  }).some(i => i)
}
module.exports = Xray
