export const actionTypes = {

  ALLACCOUNTS___GET_USER_LIST: 'ALLACCOUNTS___GET_USER_LIST',
  ALLACCOUNTS___GET_USER_LIST_SUCCESS: 'ALLACCOUNTS___GET_USER_LIST_SUCCESS',
  ALLACCOUNTS___GET_USER_LIST_FAILED: 'ALLACCOUNTS___GET_USER_LIST_FAILED',

  ALLACCOUNTS___UPDATE_SORT_INFO: 'ALLACCOUNTS___UPDATE_SORT_INFO',
  ALLACCOUNTS___UPDATE_KEYWORD: 'ALLACCOUNTS___UPDATE_KEYWORD',
  ALLACCOUNTS___UPDATE_PAGE_INFO: 'ALLACCOUNTS___UPDATE_PAGE_INFO',

  // PERMISSSION : copy form permission
  ALLACCOUNTS___TOGGLE_USER_MODAL: 'ALLACCOUNTS___TOGGLE_USER_MODAL',
  // get user info
  ALLACCOUNTS___GET_USER_INFO: 'ALLACCOUNTS___GET_USER_INFO',
  ALLACCOUNTS___GET_USER_INFO_SUCCESS: 'ALLACCOUNTS___GET_USER_INFO_SUCCESS',
  ALLACCOUNTS___GET_USER_INFO_FAILED: 'ALLACCOUNTS___GET_USER_INFO_FAILED',
  // update user info
  ALLACCOUNTS___UPDATE_USER_INFO: 'ALLACCOUNTS___UPDATE_USER_INFO',
  ALLACCOUNTS___UPDATE_USER_INFO_SUCCESS: 'ALLACCOUNTS___UPDATE_USER_INFO_SUCCESS',
  ALLACCOUNTS___UPDATE_USER_INFO_FAILED: 'ALLACCOUNTS___UPDATE_USER_INFO_FAILED',
  // remove user
  ALLACCOUNTS___REMOVE_USER: 'ALLACCOUNTS___REMOVE_USER',
  ALLACCOUNTS___REMOVE_USER_SUCCESS: 'ALLACCOUNTS___REMOVE_USER_SUCCESS',
  ALLACCOUNTS___REMOVE_USER_FAILED: 'ALLACCOUNTS___REMOVE_USER_FAILED',
  // create user
  ALLACCOUNTS___CREATE_USER: 'ALLACCOUNTS___CREATE_USER',
  ALLACCOUNTS___CREATE_USER_SUCCESS: 'ALLACCOUNTS___CREATE_USER_SUCCESS',
  ALLACCOUNTS___CREATE_USER_FAILED: 'ALLACCOUNTS___CREATE_USER_FAILED',

  ALLACCOUNTS___SET_USER_MODAL_STEP: 'ALLACCOUNTS___SET_USER_MODAL_STEP',

  ALLACCOUNTS___GET_TYPE1_MENUS: 'ALLACCOUNTS___GET_TYPE1_MENUS',
  ALLACCOUNTS___GET_TYPE1_MENUS_SUCCESS: 'ALLACCOUNTS___GET_TYPE1_MENUS_SUCCESS',
  ALLACCOUNTS___GET_TYPE1_MENUS_FAILED: 'ALLACCOUNTS___GET_TYPE1_MENUS_FAILED',

  ALLACCOUNTS___GET_PRODUCTTYPE_MENUS: 'ALLACCOUNTS___GET_PRODUCTTYPE_MENUS',
  ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_SUCCESS: 'ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_SUCCESS',
  ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_FAILED: 'ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_FAILED',

  ALLACCOUNTS___RESET_TYPE1_MENUS: 'ALLACCOUNTS___RESET_TYPE1_MENUS',

  ALLACCOUNTS___RESET_PRODUCTTYPE_MENUS: 'ALLACCOUNTS___RESET_PRODUCTTYPE_MENUS',

  ALLACCOUNTS___SET_SELECTED: 'ALLACCOUNTS___SET_SELECTED',

  ALLACCOUNTS___SET_SELECT_PRODUCTTYPE: 'ALLACCOUNTS___SET_SELECT_PRODUCTTYPE',

  ALLACCOUNTS___OPEN_ADD_MODAL: 'ALLACCOUNTS___OPEN_ADD_MODAL',
  ALLACCOUNTS___OPEN_EDIT_MODAL: 'ALLACCOUNTS___OPEN_EDIT_MODAL',

  ALLACCOUNTS___SET_USERINFO_VALUE: 'ALLACCOUNTS___SET_USERINFO_VALUE',
  ALLACCOUNTS___RESET_USERINFO: 'ALLACCOUNTS___RESET_USERINFO',

  ALLACCOUNTS___GET_RBAC_LIST: 'ALLACCOUNTS___GET_RBAC_LIST',
  ALLACCOUNTS___GET_RBAC_LIST_FAILED: 'ALLACCOUNTS___GET_RBAC_LIST_FAILED',
  ALLACCOUNTS___GET_RBAC_LIST_SUCCESS: 'ALLACCOUNTS___GET_RBAC_LIST_SUCCESS',

  ALLACCOUNTS___SET_FILTER_TYPE: 'ALLACCOUNTS___SET_FILTER_TYPE',


  ALLACCOUNTS___GET_CHECK_TYPE1_MENUS: 'ALLACCOUNTS___GET_CHECK_TYPE1_MENUS',
  ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_SUCCESS: 'ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_SUCCESS',
  ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_FAILED: 'ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_FAILED',

  ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS: 'ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS',
  ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_SUCCESS: 'ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_SUCCESS',
  ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_FAILED: 'ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_FAILED',
};


export function getUserList(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_LIST,
    params
  };
}

export function getUserListSuccess(response) {
  // console.log('Action get User List Success >>>', response);
  const { userInfo: { userList, numberOfUser }, type1DefIds, productTypeDefIds } = response.data;
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_LIST_SUCCESS,
    type1DefIds,
    userList,
    numberOfUser,
    productTypeDefIds
  };
}

export function getUserListFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_LIST_FAILED,
  };
}

export function updateSortInfo(sortInfo) {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_SORT_INFO,
    sortInfo
  };
}

export function updateKeyword(term) {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_KEYWORD,
    keyword: term
  };
}

export function updatePageInfo(current, pageSize) {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_PAGE_INFO,
    current,
    pageSize
  };
}

// REX

export function toggleEditModal(status) {
  return {
    type: actionTypes.ALLACCOUNTS___TOGGLE_EDIT_MODAL,
    status,
  };
}

export function toggleUserModal(status) {
  return {
    type: actionTypes.ALLACCOUNTS___TOGGLE_USER_MODAL,
    status,
  };
}
export function getUserInfo(emplid) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_INFO,
    emplid,
  };
}
export function getUserInfoSuccess(response) {
  const { userInfo } = response.data;
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_INFO_SUCCESS,
    userInfo
  };
}

export function getUserInfoFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_USER_INFO_FAILED
  };
}

export function updateUserInfo(info) {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_USER_INFO,
    info
  };
}

export function updateUserInfoSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_USER_INFO_SUCCESS,
    msg: response.data,
  };
}

export function updateUserInfoFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___UPDATE_USER_INFO_FAILED,
  };
}

export function removeUser(emplid) {
  return {
    type: actionTypes.ALLACCOUNTS___REMOVE_USER,
    emplid,
  };
}

export function removeUserSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___REMOVE_USER_SUCCESS,
    msg: response.data,
  };
}

export function removeUserFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___REMOVE_USER_FAILED
  };
}

export function createUser(userToAdd) {
  return {
    type: actionTypes.ALLACCOUNTS___CREATE_USER,
    userToAdd
  };
}

export function createUserSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___CREATE_USER_SUCCESS,
    msg: response.data,
  };
}

export function createUserFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___CREATE_USER_FAILED
  };
}

export function setModalStep(modalStep) {
  return {
    type: actionTypes.ALLACCOUNTS___SET_USER_MODAL_STEP,
    modalStep
  };
}

export function getType1Menus(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS,
    params
  };
}

export function getProductTypeMenus(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS,
    params
  };
}

export function getType1MenusSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS_SUCCESS,
    type1Menus: response.data
  };
}

export function getProductTypeMenusSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_SUCCESS,
    productTypeMenus: response.data
  };
}

export function getType1MenusFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS_FAILED
  };
}

export function getProductTypeMenusFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_FAILED
  };
}

export function resetType1Menus() {
  return {
    type: actionTypes.ALLACCOUNTS___RESET_TYPE1_MENUS,
  };
}

export function resetProductTypeMenus() {
  return {
    type: actionTypes.ALLACCOUNTS___RESET_PRODUCTTYPE_MENUS,
  };
}

export function setSelected(selected) {
  return {
    type: actionTypes.ALLACCOUNTS___SET_SELECTED,
    selected
  };
}

export function setSelectProductType(selectPT) {
  return {
    type: actionTypes.ALLACCOUNTS___SET_SELECT_PRODUCTTYPE,
    selectPT
  };
}

export function openEditModal(emplid) {
  return {
    type: actionTypes.ALLACCOUNTS___OPEN_EDIT_MODAL,
    emplid
  };
}

export function openAddModal() {
  return {
    type: actionTypes.ALLACCOUNTS___OPEN_ADD_MODAL
  };
}

export function setUserInfoValue(name, value) {
  return {
    type: actionTypes.ALLACCOUNTS___SET_USERINFO_VALUE,
    name,
    value
  };
}

export function resetUserInfo() {
  return {
    type: actionTypes.ALLACCOUNTS___RESET_USERINFO,
  };
}

export function getRbacList(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_RBAC_LIST,
    params
  };
}
export function getRbacListSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_RBAC_LIST_SUCCESS,
    rbacList: response.data,
  };
}

export function getRbacListFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_RBAC_LIST_FAILED
  };
}

export function setFilterType(filterType) {
  return {
    type: actionTypes.ALLACCOUNTS___SET_FILTER_TYPE,
    filterType
  };
}

export function getCheckType1Menus(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_TYPE1_MENUS,
    params
  };
}

export function getCheckType1MenusSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_SUCCESS,
    type1Menus: response.data
  };
}

export function getCheckType1MenusFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_FAILED,
  };
}

export function getCheckProductTypeMenus(params) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS,
    params
  };
}

export function getCheckProductTypeMenusSuccess(response) {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_SUCCESS,
    productTypeMenus: response.data,
  };
}
export function getCheckProductTypeMenusFailed() {
  return {
    type: actionTypes.ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_FAILED,
  };
}


export default {};

