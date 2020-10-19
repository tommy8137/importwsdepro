export const actionTypes = {
  // all account & role management 共用
  SETTING___UPDATE_ROLE_GROUP: 'SETTING___UPDATE_ROLE_GROUP',
  SETTING___UPDATE_ROLE_NAME: 'SETTING___UPDATE_ROLE_NAME',
  SETTING___UPDATE_PRODUCT_TYPE: 'SETTING___UPDATE_PRODUCT_TYPE',
  SETTING___RESET_FILTER_BAR_INFO: 'SETTING___RESET_FILTER_BAR_INFO',

  SETTING__GET_ROLE_GROUP_OPTIONS: 'SETTING__GET_ROLE_GROUP_OPTIONS',
  SETTING__GET_ROLE_GROUP_OPTIONS_SUCCESS: 'SETTING__GET_ROLE_GROUP_OPTIONS_SUCCESS',
  SETTING__GET_ROLE_GROUP_OPTIONS_FAILED: 'SETTING__GET_ROLE_GROUP_OPTIONS_FAILED',

  SETTING__GET_ROLE_NAME_OPTIONS: 'SETTING__GET_ROLE_NAME_OPTIONS',
  SETTING__GET_ROLE_NAME_OPTIONS_SUCCESS: 'SETTING__GET_ROLE_NAME_OPTIONS_SUCCESS',
  SETTING__GET_ROLE_NAME_OPTIONS_FAILED: 'SETTING__GET_ROLE_NAME_OPTIONS_FAILED',
};


/*
  Role management & All Accounts共用
*/

export function getRoleGroupOptions() {
  return {
    type: actionTypes.SETTING__GET_ROLE_GROUP_OPTIONS,
  };
}

export function getRoleGroupOptionsSuccess(response) {
  // console.log('Action get Role Group Options Success >>>', response);
  return {
    type: actionTypes.SETTING__GET_ROLE_GROUP_OPTIONS_SUCCESS,
    list: response.data
  };
}

export function getRoleGroupOptionsFailed(response) {
  console.log('Action get Role Group Option Failed >>>', response);
  return {
    type: actionTypes.SETTING__GET_ROLE_GROUP_OPTIONS_FAILED,
  };
}

export function getRoleNameOptions(roleGroup) {
  return {
    type: actionTypes.SETTING__GET_ROLE_NAME_OPTIONS,
    roleGroup
  };
}

export function getRoleNameOptionsSuccess(response) {
  // console.log('Action get Role Name Options Success >>>', response);
  return {
    type: actionTypes.SETTING__GET_ROLE_NAME_OPTIONS_SUCCESS,
    list: response.data
  };
}

export function getRoleNameOptionsFailed(response) {
  console.log('Action get Role Name Options Failed >>>', response);
  return {
    type: actionTypes.SETTING__GET_ROLE_NAME_OPTIONS_FAILED,
  };
}

export function updateRoleGroup(newRoleGroup) {
  return {
    type: actionTypes.SETTING___UPDATE_ROLE_GROUP,
    roleGroup: newRoleGroup
  };
}

export function updateRoleName(newRoleName) {
  return {
    type: actionTypes.SETTING___UPDATE_ROLE_NAME,
    roleName: newRoleName
  };
}

export function resetFilterBarInfo() {
  return {
    type: actionTypes.SETTING___RESET_FILTER_BAR_INFO,
  };
}

export default {};
