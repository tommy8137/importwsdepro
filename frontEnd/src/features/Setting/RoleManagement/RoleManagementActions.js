export const actionTypes = {
  // Role management
  // create role modal
  SETTING_ROLE_MAGT___TOGGLE_CREATE_ROLE_MODAL: 'SETTING_ROLE_MAGT___TOGGLE_CREATE_ROLE_MODAL',
  SETTING_ROLE_MAGT___DO_CREATE_ROLE: 'SETTING_ROLE_MAGT___DO_CREATE_ROLE',
  SETTING_ROLE_MAGT___CREATE_ROLE_SUCCESS: 'SETTING_ROLE_MAGT___CREATE_ROLE_SUCCESS',

  SETTING_ROLE_MAGT___GET_ROLES: 'SETTING_ROLE_MAGT___GET_ROLES',
  SETTING_ROLE_MAGT___GET_ROLES_SUCCESS: 'SETTING_ROLE_MAGT___GET_ROLES_SUCCESS',

  SETTING_ROLE_MAGT___GET_POLICY: 'SETTING_ROLE_MAGT___GET_POLICY',
  SETTING_ROLE_MAGT___GET_POLICY_SUCCESS: 'SETTING_ROLE_MAGT___GET_POLICY_SUCCESS',

  SETTING_ROLE_MAGT___GET_RESOURCES: 'SETTING_ROLE_MAGT___GET_RESOURCES',
  SETTING_ROLE_MAGT___GET_RESOURCES_SUCCESS: 'SETTING_ROLE_MAGT___GET_RESOURCES_SUCCESS',

  SETTING_ROLE_MAGT___GET_POLICY_ROLE: 'SETTING_ROLE_MAGT___GET_POLICY_ROLE',
  SETTING_ROLE_MAGT___GET_POLICY_ROLE_SUCCESS: 'SETTING_ROLE_MAGT___GET_POLICY_ROLE_SUCCESS',

  SETTING_ROLE_MAGT___UPDATE_ROLE: 'SETTING_ROLE_MAGT___UPDATE_ROLE',
  SETTING_ROLE_MAGT___UPDATE_ROLE_SUCCESS: 'SETTING_ROLE_MAGT___UPDATE_ROLE_SUCCESS',

  SETTING_ROLE_MAGT___DELETE_ROLE: 'SETTING_ROLE_MAGT___DELETE_ROLE',
  SETTING_ROLE_MAGT___DELETE_ROLE_SUCCESS: 'SETTING_ROLE_MAGT___DELETE_ROLE_SUCCESS',

  SETTING_ROLE_MAGT___SET_SELECTED_RESOURCE: 'SETTING_ROLE_MAGT___SET_SELECTED_RESOURCE',
  SETTING_ROLE_MAGT___UPDATE_SORTER: 'SETTING_ROLE_MAGT___UPDATE_SORTER',
};

/*
  Role management
*/

export function toggleCreateRoleModal(isAddRoleShow = false, selectedGroupOpt = null) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___TOGGLE_CREATE_ROLE_MODAL,
    isAddRoleShow,
    selectedGroupOpt,
  };
}

export function doCreateRole(roleInfo) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___DO_CREATE_ROLE,
    roleInfo
  };
}

export function createRoleSuccess(editRole) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___CREATE_ROLE_SUCCESS,
    editRole,
  };
}

export function getRoles() {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_ROLES,
  };
}

export function getRolesSuccess(roles) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_ROLES_SUCCESS,
    roles,
  };
}

export function getPolicy(rsId) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_POLICY,
    rsId,
  };
}

export function getPolicySuccess(policies) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_POLICY_SUCCESS,
    policies,
  };
}

export function getResources() {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_RESOURCES,
  };
}

export function getResourcesSuccess(resources) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_RESOURCES_SUCCESS,
    resources,
  };
}

export function setSelectedResource(resource) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___SET_SELECTED_RESOURCE,
    resource,
  };
}

export function getPolicyRole(rsId) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_POLICY_ROLE,
    rsId,
  };
}

export function getPolicyRoleSuccess(policyRole) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___GET_POLICY_ROLE_SUCCESS,
    policyRole,
  };
}

export function updateRole(roleInfo, policyRoleInfo) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___UPDATE_ROLE,
    roleInfo,
    policyRoleInfo,
  };
}
export function deleteRoles(roleIds) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___DELETE_ROLE,
    roleIds,
  };
}

export function updateSorter(sorter) {
  return {
    type: actionTypes.SETTING_ROLE_MAGT___UPDATE_SORTER,
    sorter,
  };
}
export default {};
