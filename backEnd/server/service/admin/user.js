/* eslint-disable no-magic-numbers */
const userModel = require('../../model/admin/user.js')
const rbacModel = require('../../model/admin/rbac.js')
const permModel = require('../../model/permission/permission.js')
const permService = require('../../service/permissions/roleManagement.js')
// const rbacService = require('../../service/admin/rbac.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const _ = require('lodash')
const xray = 1

const createOrUpdateUserRole = async (uInf) => {
  let roles = []
  let rbacUserRolesInfo = await rbacModel.getRbacRoleList()
  if (uInf.is_contact_window) roles.push('CONTACT_WINDOW:CONTACT_WINDOW')
  let roleType = `${uInf.role_group}:${uInf.role_name}`
  roles.push(roleType)
  let roleIds = []
  for (let i = 0; i < roles.length; i++) {
    for (let t of rbacUserRolesInfo) {
      if (roles[i] == t.role_type) {
        roleIds.push(t.id)
      }
    }
  }
  let { /* del_type1,*/ add_type1, add_product_type } = uInf
  let result = await rbacModel.createOrUpdateUserRole(uInf.emplid, roleIds)
  let  userRoleTypes = await userModel.getRoleType(uInf.emplid)
  if(userRoleTypes.length > 0) {
    await permModel.deleteAllUserType1(uInf.emplid)
    await permModel.deleteAllUserMeProductType(uInf.emplid)
    await permModel.deleteAllUserEeProductType(uInf.emplid)
  }
  // if (Array.isArray(del_type1)) {
  //   await permService.deleteUserType1Scope(uInf.emplid, del_type1)
  // }
  if (Array.isArray(add_type1)) {
    await permService.createUserType1Scope(uInf.emplid, add_type1)
  }
  if (Array.isArray(add_product_type)) {
    await permService.createUserProductTypePermission(uInf.emplid, add_product_type)
  }
  
  return result
}

class User {
  static async compositeUserInfo(results, response) {
    let userEmplids = []
    for (let result of results) {
      result.type1 = []
      result.product_type = {}
      result.product_type.me = []
      result.product_type.ee = []
      result.is_contact_window = false
      let roleNames = await userModel.getRoleType(result.emplid)
      for (let res of roleNames) {
        let roleGroup = res.role_group
        let roleName = res.role_name
        if (roleName == 'CONTACT_WINDOW') {
          result.is_contact_window = true
        } else {
          result.role_group = roleGroup
          result.role_name = roleName
        }
      }
      userEmplids.push(result.emplid)
      response.userInfo.userList.push(result)
    }
    let userType1s = await userModel.getUserType1(userEmplids)

    for (let userType of userType1s) {
      let index = userEmplids.indexOf(userType.emplid)
      let { type1, id } = userType
      response.userInfo.userList[index].type1.push({ type1, id })
    }

    let userProductType = await userModel.getComebineProductType(userEmplids)
    let allProductTypeMe = await permService.getProductTypeScopeByReq({ eeme: '1' })
    let allProductTypeEe = await permService.getProductTypeScopeByReq({ eeme: '2' })
    for (let userProduct of userProductType) {
      let index = userEmplids.indexOf(userProduct.emplid)
      let { product_type_me, product_type_ee } = userProduct
      if(!_.isNil(product_type_me)) _.forEach(allProductTypeMe, (all) => { if(all['product_type'] == product_type_me) response.userInfo.userList[index].product_type.me.push(all)})
      if(!_.isNil(product_type_ee)) _.forEach(allProductTypeEe, (all) => { if(all['product_type'] == product_type_ee) response.userInfo.userList[index].product_type.ee.push(all)})
    }

    let productTypeDefIds = {
      'all': _.map(allProductTypeMe, item => item.id).concat(_.map(allProductTypeEe, item=> item.id)),
      'all_me': _.map(allProductTypeMe, item => item.id),
      'all_ee': _.map(allProductTypeEe, item => item.id),
    }
    let permRes = await permModel.getType1ByEEME([1, 2, 3], 1)
    let type1Def = {
      'all': _.flatMap(permRes, o => o.id),
      'all_me': _.flatMap(_.filter(permRes, o => { return [1, 3].includes(o.category) }), o => o.id),
      'all_ee': _.flatMap(_.filter(permRes, o => { return [2, 3].includes(o.category) }), o => o.id),
    }
    response.type1DefIds = type1Def
    response.productTypeDefIds = productTypeDefIds
    return response
  }
  static async getUserByKeyword(pages, items, orderBy, keyword, role_group, role_name) {
    if(orderBy.includes('is_contact_window')) orderBy = orderBy.replace('is_contact_window', 'contact_window')
    try {
      const offset = (pages - 1) * items
      let results = await userModel.getUserByKeyword(items, offset, orderBy, keyword, role_group, role_name)
      const numberOfUser = await userModel.getUserByKeywordNumber(keyword, role_group, role_name)
      let response = { userInfo: { numberOfUser: numberOfUser, userList: [] } }
      if(results.length == 0) return response
      let userEmplids = []
      results = results.map(result => result.emplid)
      userEmplids = Array.from(new Set(results))
      let usersInfo = await userModel.getUsers(userEmplids)
      let infos = []
      for(let emplid of userEmplids) {
        for(let user of usersInfo) {
          if(emplid == user.emplid) {
            infos.push(user)
            break
          }
        }
      }
      response = await this.compositeUserInfo(infos, response)
      return response
    } catch (err) {
      throwApiError('role group or name is not found', errorCode.BAD_REQUEST)
    }
  }

  static async getUserInfo(id) {
    let results = await userModel.getUserInfo(id)
    let res = {}
    res.is_contact_window = false
    for (let result of results) {
      if (result.role_name == 'CONTACT_WINDOW') {
        res.is_contact_window = true
      } else {
        res.role_group = result.role_group
        res.role_name = result.role_name
      }
      res.emplid = result.emplid
      res.name_a = result.name_a
      res.email_address = result.email_address
      res.phone = result.phone
      res.isAdmin = result.is_superuser
    }
    res.xray_types = await this.getPersonalUsertype(id, xray)
    res.product_type = await this.getPersonalUserProductType(id)
    let response = { userInfo: res }
    return response
  }
  static async getContactWindowList() {
    let res = await userModel.getContactWindowList()
    let emplids = []
    let results = []
    for (let t of res) {
      let emplidIndex = emplids.indexOf(t.emplid)
      if (emplidIndex == -1) {
        let tmp = { is_contact_window: false }
        if (t.role_name == 'contactwindow') {
          tmp.is_contact_window = true
        } else {
          tmp.role_type = t.role_type
        }
        tmp.emplid = t.emplid
        tmp.name_a = t.name_a
        tmp.email_address = t.email_address
        tmp.phone = t.phone
        emplids.push(t.emplid)
        results.push(tmp)
      } else {
        if (t.role_name == 'contactwindow') {
          results[emplidIndex].is_contact_window = true
        } else {
          results[emplidIndex].role_type = t.role_type
        }
      }
    }
    let rdMe = []
    let rdEe = []
    let rdMeTmFm = []
    let sourcerMe = []
    let sourcerEe = []
    let pmAccount = []
    results.forEach(item => {
      if (item.role_type == 'rd:me' && item.is_contact_window) {
        rdMe.push(item)
      } else if (item.role_type == 'rd:ee' && item.is_contact_window) {
        rdEe.push(item)
      } else if (item.role_type == 'rd:me_tm_fm' && item.is_contact_window) {
        rdMeTmFm.push(item)
      } else if (item.role_type == 'sourcer:me' && item.is_contact_window) {
        sourcerMe.push(item)
      } else if (item.role_type == 'sourcer:ee' && item.is_contact_window) {
        sourcerEe.push(item)
      } else if (item.role_type == 'pm:account' && item.is_contact_window) {
        pmAccount.push(item)
      }
    })
    let response = [
      { name: 'RD', type: 'ME', list: rdMe },
      { name: 'RD', type: 'EE', list: rdEe },
      { name: 'RD', type: 'METMFM', list: rdMeTmFm },
      { name: 'SOURCER', type: 'ME', list: sourcerMe },
      { name: 'SOURCER', type: 'EE', list: sourcerEe },
      { name: 'PM', type: 'ACCOUNT', list: pmAccount },
    ]
    return { contactWindow: response }
  }
  static async updateUser(info) {
    await createOrUpdateUserRole(info)
    return 'update success'
  }
  static async createUser(info) {
    await userModel.createUser(info)
    await createOrUpdateUserRole(info)
  }
  static async deleteUser(id) {
    const result = await userModel.deleteUser(id)
    return result
  }
  static async searchUser(query) {
    const result = await userModel.searchUser(query)
    return { 'userList': result }
  }
  static async getUserByType(type, keyword) {
    const result = await userModel.getUserByType(type, keyword)
    return { 'userList': result }
  }
  static async getPersonalUsertype(emplid, userOn) {
    let emplids = [emplid]
    let results = await userModel.getUserType1(emplids, userOn)
    results.forEach((result) => {
      delete result['emplid']
    })
    return {
      All: results,
    }
  }
  static async getPersonalUserProductType(emplid, type = '') {
    let emplids = [emplid]
    let res = []
    let me = []
    let ee = []
    let results = await userModel.getComebineProductType(emplids)
    let allProductTypeMe = await permService.getProductTypeScopeByReq({ eeme: '1' })
    let allProductTypeEe = await permService.getProductTypeScopeByReq({ eeme: '2' })
    results.forEach((result) => {
      delete result['emplid']
      if(!_.isNil(result.product_type_me)) _.forEach(allProductTypeMe, (all) => { 
        if(all['product_type'] == result['product_type_me']) {
          if(type.toUpperCase() == 'BOM') {
            me.push(all['product_type'])
          } else {
            res.push(all)
          }
        } 
      })
      if(!_.isNil(result.product_type_ee)) _.forEach(allProductTypeEe, (all) => {
        if(all['product_type'] == result['product_type_ee']) {
          if(type.toUpperCase() == 'BOM') {
            ee.push(all['product_type'])
          } else {
            res.push(all)
          }
        }
      })
    })
    if(type.toUpperCase() == 'BOM') {
      return {
        me: me,
        ee: ee,
      }
    } else {
      return  {
        All: res,
      }
    }
  }

  static async checkUserProductTypePermission(emplid, eeme, productType) {
    let result = false
    switch (eeme.trim().toUpperCase()) {
      case 'ME':
        result = await userModel.checkUserMeProductType(emplid, productType)
        break
      case 'EE':
        result = await userModel.checkUserEeProductType(emplid, productType)
        break
    }
    return result
  }

  /* static async getComebineProductType(emplid) {
    let meProductType = await userModel.getUserMeProductType(emplid)
    let eeProductType = await userModel.getUserEEProductType(emplid)
    let combineProductType = meProductType.concat(eeProductType)
    return _.orderBy(combineProductType, 'emplid', 'asc')
  } */
}

module.exports = User
