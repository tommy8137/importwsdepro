export const actionTypes = {

  EEBOM_ASSIGNMENT___DISABLE_ALL_EDIT: 'EEBOM_ASSIGNMENT___DISABLE_ALL_EDIT',
  // get list
  EEBOM_ASSIGNMENT___GET_EEBOM_LIST: 'EEBOM_ASSIGNMENT___GET_EEBOM_LIST',
  EEBOM_ASSIGNMENT___GET_EEBOM_LIST_SUCCESS: 'EEBOM_ASSIGNMENT___GET_EEBOM_LIST_SUCCESS',
  EEBOM_ASSIGNMENT___GET_EEBOM_LIST_FAILED: 'EEBOM_ASSIGNMENT___GET_EEBOM_LIST_FAILED',
  // filter bar
  EEBOM_ASSIGNMENT___UPDATE_FILTER_INFO: 'EEBOM_ASSIGNMENT___UPDATE_FILTER_INFO',
  EEBOM_ASSIGNMENT___GET_FILTERED_EEBOM_LIST: 'EEBOM_ASSIGNMENT___GET_FILTERED_EEBOM_LIST',
  EEBOM_ASSIGNMENT___RESET_FILTER_BAR: 'EEBOM_ASSIGNMENT___RESET_FILTER_BAR',
  // search users
  EEBOM_ASSIGNMENT___SEARCH_USERS: 'EEBOM_ASSIGNMENT___SEARCH_USERS',
  EEBOM_ASSIGNMENT___SEARCH_USERS_SUCCESS: 'EEBOM_ASSIGNMENT___SEARCH_USERS_SUCCESS',
  EEBOM_ASSIGNMENT___SEARCH_USERS_FAILED: 'EEBOM_ASSIGNMENT___SEARCH_USERS_FAILED',
  EEBOM_ASSIGNMENT___RESET_OPTIONS: 'EEBOM_ASSIGNMENT___RESET_OPTIONS',
  // update users
  EEBOM_ASSIGNMENT___UPDATE_USERS: 'EEBOM_ASSIGNMENT___UPDATE_USERS',
  EEBOM_ASSIGNMENT___UPDATE_USERS_SUCCESS: 'EEBOM_ASSIGNMENT___UPDATE_USERS_SUCCESS',
  EEBOM_ASSIGNMENT___UPDATE_USERS_FAILED: 'EEBOM_ASSIGNMENT___UPDATE_USERS_FAILED',
};

/*
EEbomAssignment
*/

export function disableAllEdit(status) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___DISABLE_ALL_EDIT,
    status
  };
}

export function getEEbomList() {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___GET_EEBOM_LIST,
  };
}

export function getEEbomListSuccess(response) {
  // console.log('Action get EEbom List Success', response);
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___GET_EEBOM_LIST_SUCCESS,
    list: response.data.list,
    isEditable: response.data.isEditable
  };
}

export function getEEbomListFailed(response) {
  console.log('Action get EEbom List Failed >>>', response);
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___GET_EEBOM_LIST_FAILED,
  };
}

export function updateFilterInfo(field, val) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___UPDATE_FILTER_INFO,
    field,
    val
  };
}

export function getFilteredEEBomList() {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___GET_FILTERED_EEBOM_LIST,
  };
}

export function resetFilterBar() {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___RESET_FILTER_BAR,
  };
}

export function searchUsers(field, keyword) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___SEARCH_USERS,
    field,
    keyword
  };
}

export function searchUsersSuccess(field, response) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___SEARCH_USERS_SUCCESS,
    field,
    userList: response.data.userList
  };
}

export function searchUsersFailed(response) {
  console.log('Action search Users Failed >>>', response);
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___SEARCH_USERS_FAILED,
  };
}

export function updateUsers(data) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___UPDATE_USERS,
    data
  };
}

export function updateUsersSuccess(response) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___UPDATE_USERS_SUCCESS,
  };
}

export function updateUsersFailed(response) {
  console.log('Action update Users Failed >>>', response);
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___UPDATE_USERS_FAILED,
  };
}

export function resetOptions(field) {
  return {
    type: actionTypes.EEBOM_ASSIGNMENT___RESET_OPTIONS,
    field
  };
}

