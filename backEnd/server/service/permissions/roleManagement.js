const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const { roleMenus } = require('../../../config.js')
const permModel = require('../../model/permission/permission.js')
const userModel = require('../../model/admin/user.js')
const MEEEENUM = ['0', '1', '2', '3'] //0: all, 1:me, 2:ee, 3:ee/me
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('RoleManagementService')
const bomManagerModel = require('../../model/bom/bomManager.js')
const eeBomModel = require('../../model/bom/eeBomMain.js')
const { type1InFilter } = require('../../utils/dirty/dirty_filter')

const createUserType1Scope = async (empId, type1) => {
  if (!type1 || type1.length == 0) return 0
  let isExist = await userModel.checkIfEmpExist(empId)
  if (!isExist) throwApiError('can not find user', errorCode.BAD_REQUEST)
  type1 = type1.map(t => { return { 'type1_id': t, 'emplid': empId } })
  let createRes = null
  try {
    createRes = await permModel.createUserType1(type1)
    logger.debug(`create relation on user: ${empId}, type1:${type1}`)
  } catch (error) {
    throwApiError('faile to create', errorCode.BAD_REQUEST)
  }
  return createRes
}

const createUserProductTypePermission = async (empId, product_type) => {
  let me = []
  let ee = []
  let pt_me = []
  let pt_ee = []
  if (!product_type || product_type.length == 0) return 0
  let isExist = await userModel.checkIfEmpExist(empId)
  if (!isExist) throwApiError('can not find user', errorCode.BAD_REQUEST)
  let productTypeSiteMe = await getProductTypeScopeByReq({eeme: '1'})
  let productTypeSiteEe = await getProductTypeScopeByReq({eeme: '2'})
  product_type = product_type.sort()
  _.map(product_type, (item, index) => {
    if(item <= productTypeSiteMe.length) {
      pt_me.push(item)
    } else {
      pt_ee.push(item)
    }
  })

  _.map(pt_me, product_type => {
    _.map(productTypeSiteMe, site => {
      if(product_type == site.id && product_type <= productTypeSiteMe.length) me.push({ 'product_type_me': site.product_type, 'emplid': empId})
    })
  })
  _.map(pt_ee, product_type => {
    _.map(productTypeSiteEe, site => {
      if(product_type == site.id && product_type <= productTypeSiteMe.length + productTypeSiteEe.length) ee.push({ 'product_type_ee': site.product_type, 'emplid': empId})
    })
  })
  let createMeRes = null
  let createEeRes = null
  try {
    if(me.length > 0) createMeRes = await permModel.createUserMeProductTypePermission(me)
    if(ee.length > 0) createEeRes = await permModel.createUserEeProductTypePermission(ee)
    logger.debug(`create relation on user: ${empId}, product_type_me:${pt_me}, product_type_ee:${pt_ee}`)
  } catch (error) {
    throwApiError('faile to create', errorCode.BAD_REQUEST)
  }
  return createMeRes + createEeRes
}

const deleteUserType1Scope = async (empId, type1) => {
  if (!type1 || type1.length == 0) return 0
  let isExist = await userModel.checkIfEmpExist(empId)
  if (!isExist) throwApiError('can not find user', errorCode.BAD_REQUEST)
  if (!Array.isArray(type1)) throwApiError('can not find user', errorCode.BAD_REQUEST)
  let deleteRes = await permModel.deleteUserType1(empId, type1)
  logger.debug(`delete relation on user: ${empId}, type1:${type1}`)
  return deleteRes
}

const getType1ScopeByReq = async (param) => {
  let eeme = (isNaN(param.eeme) || MEEEENUM.indexOf(param.eeme) < 0) ? ['-1'] : [param.eeme, '3']
  if (eeme.includes('0')) eeme = eeme.concat(['1', '2'])
  let sCode = param.scode || ''
  let usedOn = (isNaN(param.on)) ? 1 : param.on
  let permRes = null
  if (sCode === '') {
    permRes = await permModel.getType1ByEEME(eeme, usedOn)
  } else {
    permRes = await permModel.getType1ByScode(sCode, usedOn)
  }



  // this is fucking stupid & dirty code
  //
  permRes = permRes.filter((e) => {
    return (e.category != 1 || type1InFilter(e.type1))
  })
  return permRes
}
const getProductTypeScopeByReq = async (param) => {
  let result = []
  if(isNaN(param.eeme) || MEEEENUM.indexOf(param.eeme) < 0) {
    return []
  } else {
    let meProductTypeBaseData = await bomManagerModel.getProductTypeBaseData()
    let eeProductTypeBaseData = null
    /* let eeProductTypeBaseDataPLM = await eeBomModel.getProductTypeBaseDataPLM()
    let eeProductTypeBaseDataRFQ = await eeBomModel.getProductTypeBaseDataRFQ()
    let eeProductTypeBaseDataCombine = eeProductTypeBaseDataPLM.concat(eeProductTypeBaseDataRFQ)
    let eeProductTypeBaseData = _.chain(eeProductTypeBaseDataCombine)
      .uniqBy('product_type')
      .orderBy('product_type')
      .value()
    */
    switch (param.eeme) {
      case '0':
        eeProductTypeBaseData = await eeBomModel.getProductTypeBaseData()
        _.map(meProductTypeBaseData, (type, index) => {
          result.push({ id: index + 1, product_type: type.key})
        })
        _.map(eeProductTypeBaseData, (type, index) => {
          result.push({ id: index + 1 + meProductTypeBaseData.length, product_type: type.product_type})
        })
        break;
      case '1':
        _.map(meProductTypeBaseData, (type, index) => {
          result.push({ id: index + 1, product_type: type.key})
        })
        break;
      case '2':
        eeProductTypeBaseData = await eeBomModel.getProductTypeBaseData()
        _.map(eeProductTypeBaseData, (type, index) => {
          result.push({ id: index + 1 + meProductTypeBaseData.length, product_type: type.product_type})
        })
        break;
      default: 
        return []
    }
    return result

  }
}

module.exports = {
  createUserType1Scope,
  deleteUserType1Scope,
  getType1ScopeByReq,
  createUserProductTypePermission,
  getProductTypeScopeByReq,
}
