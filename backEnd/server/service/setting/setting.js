const SettingModel = require('../../model/setting/setting.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const rbacService = require('../admin/rbac.js')
const _ = require('lodash')
const { type1InFilter, type12InFilter } = require('../../utils/dirty/dirty_filter')
class Setting {
  static async getEeAssignmentList(userID) {
    let flag
    let res = await rbacService.getPolicyByUser(userID)
    if (res) {
      if (res && res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.ee') > -1) {
        flag = true
      } else if (res && res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.me') > -1) {
        flag = false
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }
    const resTmp = await SettingModel.getEeAssignmentList()
    let obj = {}
    let result = []
    _.forEach(resTmp, ({ type1, type2, pic, pic_emplid, proxy, proxy_emplid }) => {
      let cur = obj[type1]
      if (cur) {
        let index = cur.index
        result[index].type2 += ',' + type2
      } else {
        let index = result.length
        obj[type1] = {
          type1,
          index,
        }
        result.push({ type1, type2, pic, pic_emplid, proxy, proxy_emplid })
      }
    })
    let response = {
      isEditable: flag,
      list: result,
    }
    return response
  }
  static async assign(type1, pic, pic_emplid, proxy, proxy_emplid) {
    const result = await SettingModel.assign(type1, pic, pic_emplid, proxy, proxy_emplid)
    return result
  }

  static async searchUser(keyword) {
    const result = await SettingModel.searchUser(keyword)
    return { 'userList': result }
  }

  static async fetchProductType(userID, role) {
    await this.checkViewPermissionByRole(userID, role)
    let productType = await SettingModel.getProductTypeByRole(role)
    let list = _.map(productType, 'product_type')
    return list
  }

  static async fetchTypeI(userID, role) {
    await this.checkViewPermissionByRole(userID, role)
    let type1 = await SettingModel.getTypeI(role)
    let list = _.map(type1, 'type1')

    // this is fucking stupid & dirty code
    //
    if (role.toUpperCase() == 'ME') {
      list = list.filter((e) => type1InFilter(e))
    }
    return list
  }

  static async fetchTypeII(userID, role, type1) {
    await this.checkViewPermissionByRole(userID, role)
    let type2 = await SettingModel.getTypeII(role, type1)
    let list = _.map(type2, 'type2')
    // this is fucking stupid & dirty code
    //
    if (role.toUpperCase() == 'ME') {
      list = list.filter((e) => type12InFilter(type1, e))
    }
    return list
  }

  static async fetchSpec01(userID, type1, type2) {
    await this.checkViewPermissionByRole(userID, 'ME')
    let specItems = await SettingModel.getItemSpec(type1, type2)
    let specNitem = []
    if (specItems.length > 0) {
      specNitem = _.chain(specItems)
        .map('spec1')
        .uniq()
        .filter(v => !!v)
        .sort()
        .value()
    }
    return specNitem

  }



  static async getMeSpecTitle(userID, spec1, type1, type2) {
    let flag
    let res = await rbacService.getPolicyByUser(userID)
    if (res) {
      if (res && res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.me') > -1) {
        flag = true
      } else if (res && res.EditAll && res.EditAll.allow && res.EditAll.allow.indexOf('setting.ee') > -1) {
        flag = false
      } else {
        throwApiError('permission denid', errorCode.ERRORFORMAT)
      }
    } else {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
    }
    const result = await SettingModel.getMeSpecTitle(spec1, type1, type2)
    let resTmp = []
    for (let i = 2; i < 31; i++) {
      resTmp.push({ 'spec_no': i, 'title': result[`spec_t${i}`] || null, 'edit_by': result[`ins${i}by`] || null, 'edit_time': result[`ins${i}date`] || null })
    }
    let response = {
      isEditable: flag,
      res: resTmp
    }
    return response
  }
  static async updateMeSpecTitle(spec1, type1, type2, spec_no, title, username) {
    let getType1ID = await SettingModel.getType1ID(type1)
    let getType2ID = await SettingModel.getType2ID(type1, type2)
    if(getType1ID.length <= 0 || getType2ID.length <= 0) {
      throwApiError('Bad request', errorCode.BAD_REQUEST)
    }else {
      const res = await SettingModel.insertKey(spec1, type1, type2, getType1ID[0].type1id, getType2ID[0].type2id)
      const result = await SettingModel.updateMeSpecTitle(spec1, type1, type2, spec_no, title, username)
      return result
    }
    
  }

  static async checkViewPermissionByRole(userID, role) {
    let resource
    if (role == 'ME') resource = 'setting.me'
    else resource = 'setting.ee'
    let permission = await rbacService.getPolicyByUser(userID, {
      action: 'View',
      resource: resource,
    })
    if (!permission || !permission.View || permission.View.allow.indexOf(resource) < 0) {
      throwApiError('permission denid', errorCode.ERRORFORMAT)
      return
    } else {
      return true
    }
  }
}
module.exports = Setting
