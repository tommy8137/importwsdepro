export const actionTypes = {
  EEBOM___GET_EEBOM_DETAIL_TAB: 'EEBOM___GET_EEBOM_DETAIL_TAB',
  EEBOM___GET_EEBOM_DETAIL_TAB_SUCCESS: 'EEBOM___GET_EEBOM_DETAIL_TAB_SUCCESS',
  EEBOM___GET_EEBOM_DETAIL_TAB_FAILED: 'EEBOM___GET_EEBOM_DETAIL_TAB_FAILED',
  EEBOM___SET_CURRENT_TAB_INFO: 'EEBOM___SET_CURRENT_TAB_INFO',
  EEBOM___SET_VIEWALL_PROJECT_INFO: 'EEBOM___SET_VIEWALL_PROJECT_INFO',
  EEBOM___RESET_EEBOM_DETAIL_DATA: 'EEBOM___RESET_EEBOM_DETAIL_DATA',
  // 用來取得 edm version的下拉
  EEBOM___GET_EEBOM_VERSION_ID_LIST: 'EEBOM___GET_EEBOM_VERSION_ID_LIST',
  EEBOM___GET_EEBOM_VERSION_ID_LIST_SUCCESS: 'EEBOM___GET_EEBOM_VERSION_ID_LIST_SUCCESS',
  //
  EEBOM___SET_PROJECT_INFO_COLLAPSE: 'EEBOM___SET_PROJECT_INFO_COLLAPSE',

  EEBOM___GET_TYPES_LIST: 'EEBOM___GET_TYPES_LIST',
  EEBOM___GET_TYPES_LIST_SUCCESS: 'EEBOM___GET_TYPES_LIST_SUCCESS'
};

/**
 * type1 + type2的列表：  用在eebom-detail: 如果type1是<NULL>, 列表就會出現下拉讓他選擇type1, type2
 */
export function getTypesList() {
  return {
    type: actionTypes.EEBOM___GET_TYPES_LIST,
  };
}

export function getTypesListSuccess(response) {
  return {
    type: actionTypes.EEBOM___GET_TYPES_LIST_SUCCESS,
    typesList: response.data
  };
}

/**
 * eebom detail 右上角收合 project info的按鈕
 * @param {*} eeBomProjectCollapse true | false
 */
export function setEEBomPorjectInfoCollapse(eeBomProjectCollapse) {
  return {
    type: actionTypes.EEBOM___SET_PROJECT_INFO_COLLAPSE,
    eeBomProjectCollapse
  };
}

/**
 * eebom detail 右上角edm version 下拉
 * @param {*} params { eeBomProjectID, edmVersion }
 */
export function getEdmVersionIdList(params) {
  return {
    type: actionTypes.EEBOM___GET_EEBOM_VERSION_ID_LIST,
    params
  };
}

export function getEdmVersionIdListSuccess(edmVersionIdList, statusVersion, avlSetting) {
  return {
    type: actionTypes.EEBOM___GET_EEBOM_VERSION_ID_LIST_SUCCESS,
    edmVersionIdList,
    statusVersion,
    avlSetting,
  };
}

export function resetEEBomDetailData() {
  return {
    type: actionTypes.EEBOM___RESET_EEBOM_DETAIL_DATA,
  };
}


export function getEEBomDetailTab(params) {
  return {
    type: actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB,
    params
  };
}

export function getEEBomDetailTabSuccess(response) {
  return {
    type: actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB_SUCCESS,
    list: response.data,
  };
}

export function getEEBomDetailTabFailed(response) {
  return {
    type: actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB_FAILED,
  };
}


export function setEEBomCurrentTabInfo(data) {
  return {
    type: actionTypes.EEBOM___SET_CURRENT_TAB_INFO,
    data
  };
}

export function setEEBomViewallInfo(viewallInfo) {
  return {
    type: actionTypes.EEBOM___SET_VIEWALL_PROJECT_INFO,
    viewallInfo
  };
}
export default {};
