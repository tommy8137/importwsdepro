export const actionTypes = {

  XRAY_SPEC_TITLE___DISABLE_ALL_EDIT: 'XRAY_SPEC_TITLE___DISABLE_ALL_EDIT',
  // get spec title list
  XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST: 'XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST',
  XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_SUCCESS: 'XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_SUCCESS',
  XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_FAILED: 'XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_FAILED',
  // filter bar
  XRAY_SPEC_TITLE___RESET_FILTER_BAR: 'XRAY_SPEC_TITLE___RESET_FILTER_BAR',
  XRAY_SPEC_TITLE___UPDATE_FILTER_INFO: 'XRAY_SPEC_TITLE___UPDATE_FILTER_INFO',
  XRAY_SPEC_TITLE___UPDATE_LOADING_STATUS: 'XRAY_SPEC_TITLE___UPDATE_LOADING_STATUS',
  // get typeI options
  XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS: 'XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS',
  XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_SUCCESS: 'XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_SUCCESS',
  XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_FAILED: 'XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_FAILED',
  // get product type options
  XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS: 'XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS',
  XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_SUCCESS: 'XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_SUCCESS',
  XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_FAILED: 'XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_FAILED',
  // get typeII options
  XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS: 'XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS',
  XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_SUCCESS: 'XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_SUCCESS',
  XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_FAILED: 'XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_FAILED',
  // update spec title
  XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE: 'XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE',
  XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_SUCCESS: 'XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_SUCCESS',
  XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_FAILED: 'XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_FAILED',

};


export function disableAllEdit(status) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___DISABLE_ALL_EDIT,
    status
  };
}

/*
  XraySpecTitle
  */

export function getSpecTitleList(data) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST,
    data
  };
}

export function getSpecTitleListSuccess(response) {
  // console.log('Action get Spec Title List Success', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_SUCCESS,
    list: response.data.res,
    isEditable: response.data.isEditable
  };
}

export function getSpecTitleListFailed(response) {
  console.log('Action get Spec Title List Failed >>>', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_FAILED,
  };
}

export function resetFilterBar() {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___RESET_FILTER_BAR,
  };
}

export function updateFilterInfo(field, value) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___UPDATE_FILTER_INFO,
    field,
    value
  };
}

export function getTypeIOptions() {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS,
  };
}

export function getTypeIOptionsSuccess(response) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_SUCCESS,
    list: response.data
  };
}

export function getTypeIOptionsFailed(response) {
  console.log('Action get Type I Optiont Failed >>>', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_FAILED,
  };
}

export function getTypeIIOptions(data) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS,
    data
  };
}

export function getTypeIIOptionsSuccess(response) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_SUCCESS,
    list: response.data
  };
}

export function getTypeIIOptionsFailed(response) {
  console.log('Action get Type II Optiont Failed >>>', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_FAILED,
  };
}

export function getProductTypeOptions(data) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS,
    data
  };
}

export function getProductTypeOptionsSuccess(response) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_SUCCESS,
    list: response.data
  };
}

export function getProductTypeOptionsFailed(response) {
  console.log('Action get Product Type Optiont Failed >>>', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_FAILED,
  };
}

export function updateLoadingStatus(field, status) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___UPDATE_LOADING_STATUS,
    field,
    status
  };
}

export function updateSpecTitle(data) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE,
    data
  };
}

export function updateSpecTitleSuccess(response) {
  return {
    type: actionTypes.XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_SUCCESS,
  };
}

export function updateSpecTitleFailed(response) {
  console.log('Action update Spec Title Failed >>>', response);
  return {
    type: actionTypes.XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE_FAILED,
  };
}

export default {};
