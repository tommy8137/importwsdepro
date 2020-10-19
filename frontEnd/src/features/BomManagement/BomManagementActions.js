import FileSaver from 'file-saver';

export const actionTypes = {
  BOMMANAGEMENT___RESET_ALL_DATA: 'BOMMANAGEMENT___RESET_ALL_DATA',
  BOMMANAGEMENT___GET_BOM_LIST: 'BOMMANAGEMENT___GET_BOM_LIST',
  BOMMANAGEMENT___GET_BOM_LIST_SUCCESS: 'BOMMANAGEMENT___GET_BOM_LIST_SUCCESS',
  BOMMANAGEMENT___GET_BOM_LIST_FAILED: 'BOMMANAGEMENT___GET_BOM_LIST_FAILED',
  BOMMANAGEMENT___UPDATE_SORT_INFO: 'BOMMANAGEMENT___UPDATE_SORT_INFO',
  BOMMANAGEMENT___UPDATE_PAGE_INFO: 'BOMMANAGEMENT___UPDATE_PAGE_INFO',
  BOMMANAGEMENT___SWITCH_TABLE: 'BOMMANAGEMENT___SWITCH_TABLE',

  // filter & search bar
  BOMMANAGEMENT___GET_FILTER_TYPE: 'BOMMANAGEMENT___GET_FILTER_TYPE',
  BOMMANAGEMENT___GET_FILTER_TYPE_SUCCESS: 'BOMMANAGEMENT___GET_FILTER_TYPE_SUCCESS',
  BOMMANAGEMENT___GET_FILTER_TYPE_FAILED: 'BOMMANAGEMENT___GET_FILTER_TYPE_FAILED',
  BOMMANAGEMENT___UPDATE_FILTER_TYPE: 'BOMMANAGEMENT___UPDATE_FILTER_TYPE',
  BOMMANAGEMENT___GET_FILTER_VALUE: 'BOMMANAGEMENT___GET_FILTER_VALUE',
  BOMMANAGEMENT___GET_FILTER_VALUE_SUCCESS: 'BOMMANAGEMENT___GET_FILTER_VALUE_SUCCESS',
  BOMMANAGEMENT___GET_FILTER_VALUE_FAILED: 'BOMMANAGEMENT___GET_FILTER_VALUE_FAILED',
  BOMMANAGEMENT___UPDATE_FILTER_VALUE: 'BOMMANAGEMENT___UPDATE_FILTER_VALUE',
  BOMMANAGEMENT___UPDATE_SEARCH_KEYWORD: 'BOMMANAGEMENT___UPDATE_SEARCH_KEYWORD',

  // create bom button
  BOMMANAGEMENT___TOGGLE_CREATE_MODAL: 'BOMMANAGEMENT___TOGGLE_CREATE_MODAL',
  BOMMANAGEMENT___CLOSE_CREATE_MODAL: 'BOMMANAGEMENT___CLOSE_CREATE_MODAL',
  BOMMANAGEMENT___CREATE_GET_BASEDATA: 'BOMMANAGEMENT___CREATE_GET_BASEDATA',
  BOMMANAGEMENT___CREATE_GET_BASEDATA_FAILED: 'BOMMANAGEMENT___CREATE_GET_BASEDATA_FAILED',
  BOMMANAGEMENT___SEARCH_USER_LIST: 'BOMMANAGEMENT___SEARCH_USER_LIST',
  BOMMANAGEMENT___SEARCH_USER_LIST_SUCCESS: 'BOMMANAGEMENT___SEARCH_USER_LIST_SUCCESS',
  BOMMANAGEMENT___CREATE_BOM_SAVE_STEP_1: 'BOMMANAGEMENT___CREATE_BOM_SAVE_STEP_1',
  BOMMANAGEMENT___DO_CREATE_BOM: 'BOMMANAGEMENT___DO_CREATE_BOM',
  BOMMANAGEMENT___HIGHLIGHT_BOM_PROJECT: 'BOMMANAGEMENT___HIGHLIGHT_BOM_PROJECT',

  // Edit bom
  BOMMANAGEMENT___TOGGLE_EDIT_MODAL: 'BOMMANAGEMENT___TOGGLE_EDIT_MODAL',
  BOMMANAGEMENT___CLOSE_EDIT_MODAL: 'BOMMANAGEMENT___CLOSE_EDIT_MODAL',
  BOMMANAGEMENT___GET_BOM_DETAIL_SUCCESS: 'BOMMANAGEMENT___GET_BOM_DETAIL_SUCCESS',
  BOMMANAGEMENT___EDIT_BOM_DETAIL_SUCCESS: 'BOMMANAGEMENT___EDIT_BOM_DETAIL_SUCCESS',
  BOMMANAGEMENT___UPDATE_BOM_DETAIL: 'BOMMANAGEMENT___UPDATE_BOM_DETAIL',
  BOMMANAGEMENT___DO_UPDATE_BOM: 'BOMMANAGEMENT___DO_UPDATE_BOM',

  // Parameters Modal
  BOMMANAGEMENT___OPEN_PARAMETER_MODAL: 'BOMMANAGEMENT___OPEN_PARAMETER_MODAL',
  BOMMANAGEMENT___OPEN_PARAMETER_MODAL_SUCCESS: 'BOMMANAGEMENT___OPEN_PARAMETER_MODAL_SUCCESS',
  BOMMANAGEMENT___TOGGLE_PARAMETER_MODAL: 'BOMMANAGEMENT___TOGGLE_PARAMETER_MODAL',
  BOMMANAGEMENT___PUT_BOM_PARAMETER: 'BOMMANAGEMENT___PUT_BOM_PARAMETER',
  BOMMANAGEMENT___PUT_BOM_PARAMETER_SUCCESS: 'BOMMANAGEMENT___PUT_BOM_PARAMETER_SUCCESS',
  // EE BOM
  BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL: 'BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL',
  BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_SUCCESS: 'BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_SUCCESS',
  BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_FAILED: 'BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_FAILED',
  BOMMANAGEMENT___CLOSE_CHOOSE_VERSION_MODAL: 'BOMMANAGEMENT___CLOSE_CHOOSE_VERSION_MODAL',
  BOMMANAGEMENT___TOGGLE_EE_EDIT_MODAL: 'BOMMANAGEMENT___TOGGLE_EE_EDIT_MODAL',
  BOMMANAGEMENT___CLOSE_EE_EDIT_MODAL: 'BOMMANAGEMENT___CLOSE_EE_EDIT_MODAL',
  BOMMANAGEMENT___GET_EE_BOM_DETAIL_SUCCESS: 'BOMMANAGEMENT___GET_EE_BOM_DETAIL_SUCCESS',
  BOMMANAGEMENT___DO_UPDATE_EE_BOM: 'BOMMANAGEMENT___DO_UPDATE_EE_BOM',
  BOMMANAGEMENT___GET_NEXT_EDMVERSION_ID: 'BOMMANAGEMENT___GET_NEXT_EDMVERSION_ID',
  BOMMANAGEMENT___GET_EEBOM_PLANT_CODE_LIST_SUCCESS: 'BOMMANAGEMENT___GET_EEBOM_PLANT_CODE_LIST_SUCCESS',

  BOMMANAGEMENT___ARCHIVE_EMDM_BOM_PROJECT: 'BOMMANAGEMENT___ARCHIVE_EMDM_BOM_PROJECT',
  BOMMANAGEMENT___UNARCHIVE_EMDM_BOM_PROJECT: 'BOMMANAGEMENT___UNARCHIVE_EMDM_BOM_PROJECT',
  BOMMANAGEMENT___UPDATE_ARCHIVE_TOGGLE: 'BOMMANAGEMENT___UPDATE_ARCHIVE_TOGGLE',


  BOMMANAGEMENT___TOGGLE_PERMISSION_MODAL: 'BOMMANAGEMENT___TOGGLE_PERMISSION_MODAL',
};

export function togglePermissionModal(data) {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_PERMISSION_MODAL,
    data,
  };
}

export function resetAllData(initialData) {
  return {
    type: actionTypes.BOMMANAGEMENT___RESET_ALL_DATA,
    initialData
  };
}

export function getBomList(params) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_BOM_LIST,
    params
  };
}

export function getBomListSuccess(response) {
  const { bomInfo: { numberOfBom, bomList } } = response.data;
  return {
    type: actionTypes.BOMMANAGEMENT___GET_BOM_LIST_SUCCESS,
    bomList,
    total: numberOfBom
  };
}

export function getBomListFailed() {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_BOM_LIST_FAILED
  };
}

export function updateSortInfo(sortInfo) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_SORT_INFO,
    sortInfo
  };
}

export function updatePageInfo(current, pageSize) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_PAGE_INFO,
    current,
    pageSize
  };
}

// filter bar

export function getFilterType(role) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE,
    role
  };
}

export function getFilterTypeSuccess(response) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE_SUCCESS,
    filterTypeList: response.data
  };
}

export function getFilterTypeFailed() {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE_FAILED,
  };
}

export function updateFilterType(type) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_FILTER_TYPE,
    filterType: type,
  };
}

export function getFilterValue(params) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE,
    params
  };
}

export function getFilterValueSuccess(response) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE_SUCCESS,
    filterValueList: response.data.res
  };
}

export function getFilterValueFailed() {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE_FAILED,
  };
}

export function updateFilterValue(filterValue) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_FILTER_VALUE,
    filterValue
  };
}

// search bar
export function updateSearchKeyword(searchValue) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_SEARCH_KEYWORD,
    searchValue
  };
}

// 切換ME/EE
export function switchTable(table) {
  // console.log('Action update Filter Value >>>', filterValue);
  return {
    type: actionTypes.BOMMANAGEMENT___SWITCH_TABLE,
    table
  };
}

export function openCreateBom() {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_CREATE_MODAL,
  };
}

export function closeCreateBomModal() {
  return {
    type: actionTypes.BOMMANAGEMENT___CLOSE_CREATE_MODAL,
    isCreateOpen: false,
  };
}

export function getCreateBaseDataSuccess({ baseData, isCreateOpen }) {
  return {
    type: actionTypes.BOMMANAGEMENT___CREATE_GET_BASEDATA,
    baseData,
    isCreateOpen,
  };
}

export function getCreateBaseDataFail() {
  return {
    type: actionTypes.BOMMANAGEMENT___CREATE_GET_BASEDATA_FAILED,
    isCreateOpen: false,
  };
}

export function saveCreateBomStep1(bomProject) {
  return {
    type: actionTypes.BOMMANAGEMENT___CREATE_BOM_SAVE_STEP_1,
    bomProject,
  };
}

export function doCreateBom(bomDesignee) {
  return {
    type: actionTypes.BOMMANAGEMENT___DO_CREATE_BOM,
    bomDesignee,
  };
}

export function openEditBomModal(info) {
  const { id: bomid } = info;
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_EDIT_MODAL,
    bomid
  };
}

export function getBomDetailSuccess({ bomData, baseData, isEditOpen }) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_BOM_DETAIL_SUCCESS,
    bomData,
    baseData,
    isEditOpen,
  };
}

export function closeEditBomModal() {
  return {
    type: actionTypes.BOMMANAGEMENT___CLOSE_EDIT_MODAL,
    isEditOpen: false,
  };
}

export function updateBomDetail({ bomProject, bomDesignee }) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_BOM_DETAIL,
    bomProject,
    bomDesignee
  };
}

export function doEditBom() {
  return {
    type: actionTypes.BOMMANAGEMENT___DO_UPDATE_BOM,
  };
}

export function highlightBom(highlightid) {
  return {
    type: actionTypes.BOMMANAGEMENT___HIGHLIGHT_BOM_PROJECT,
    highlightid,
  };
}

// == Start: EE BOM ===========================

// choose version
export function openChooseVersionModal(id) {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL,
    id,
  };
}
export function closeChooseVersionModal() {
  return {
    type: actionTypes.BOMMANAGEMENT___CLOSE_CHOOSE_VERSION_MODAL,
    isVersionOpen: false,
  };
}
export function getVersionDataSuccess({ edmVersions, isVersionOpen }) {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_SUCCESS,
    edmVersions,
    isVersionOpen,
  };
}
export function getVersionDataFail() {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_FAILED,
    isVersionOpen: false,
  };
}

// edit info
export function openEditEEBomModal(id, edmVersionId) {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_EE_EDIT_MODAL,
    id,
    edmVersionId
  };
}
export function closeEditEEBomModal() {
  return {
    type: actionTypes.BOMMANAGEMENT___CLOSE_EE_EDIT_MODAL,
    isEeEditOpen: false,
  };
}
export function getEEBomDetailSuccess({ eeBomData, isEeEditOpen }) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_EE_BOM_DETAIL_SUCCESS,
    eeBomData,
    isEeEditOpen,
  };
}

export function doEditEEBom(formvalue, projectId = null, edmVersionID = null) {
  return {
    type: actionTypes.BOMMANAGEMENT___DO_UPDATE_EE_BOM,
    formvalue,
    projectId,
    edmVersionID,
  };
}

/**
 * choose version control時， 按下進版按鈕
 * @param {*} edmVersionId edm_version_id
 */
export function getNextVersionId(edmVersionId) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_NEXT_EDMVERSION_ID,
    edmVersionId,
  };
}

export function getEeBomPlantCodeListSuccess(plantCodeList = []) {
  return {
    type: actionTypes.BOMMANAGEMENT___GET_EEBOM_PLANT_CODE_LIST_SUCCESS,
    plantCodeList,
  };
}


export function openParameterModal(bomId) {
  return {
    type: actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL,
    bomId
  };
}

export function openParameterModalSuccess(response) {
  return {
    type: actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL_SUCCESS,
    data: response.data
  };
}

export function toggleParameterModal(isOpen) {
  return {
    type: actionTypes.BOMMANAGEMENT___TOGGLE_PARAMETER_MODAL,
    isOpen
  };
}

export function putBomParameter(bomId, data) {
  return {
    type: actionTypes.BOMMANAGEMENT___PUT_BOM_PARAMETER,
    bomId,
    data
  };
}

export function putBomParameterSuccess() {
  return {
    type: actionTypes.BOMMANAGEMENT___PUT_BOM_PARAMETER_SUCCESS,
  };
}

export function toggleShowArchive(showArchive) {
  return {
    type: actionTypes.BOMMANAGEMENT___UPDATE_ARCHIVE_TOGGLE,
    showArchive,
  };
}

export function archiveEmdmBom(data) {
  return {
    type: actionTypes.BOMMANAGEMENT___ARCHIVE_EMDM_BOM_PROJECT,
    data,
  };
}

export function unarchiveEmdmBom(data) {
  return {
    type: actionTypes.BOMMANAGEMENT___UNARCHIVE_EMDM_BOM_PROJECT,
    data,
  };
}

export default {};
