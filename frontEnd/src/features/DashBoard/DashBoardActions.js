import FileSaver from 'file-saver';

export const actionTypes = {
  // project view
  DASHBOARD___GET_PROJECT_LIST: 'DASHBOARD___GET_PROJECT_LIST',
  DASHBOARD___GET_PROJECT_LIST_SUCCESS: 'DASHBOARD___GET_PROJECT_LIST_SUCCESS',
  DASHBOARD___GET_PROJECT_LIST_FAILED: 'DASHBOARD___GET_PROJECT_LIST_FAILED',
  DASHBOARD___GET_PROJECT_FILTER: 'DASHBOARD___GET_PROJECT_FILTER',
  DASHBOARD___GET_PROJECT_FILTER_LV1_SUCCESS: 'DASHBOARD___GET_PROJECT_FILTER_LV1_SUCCESS',
  DASHBOARD___GET_PROJECT_FILTER_LV2_SUCCESS: 'DASHBOARD___GET_PROJECT_FILTER_LV2_SUCCESS',
  DASHBOARD___RESET_PROJECT_FILTER: 'DASHBOARD___RESET_PROJECT_FILTER',
  DASHBOARD___SET_PROJECT_FILTER: 'DASHBOARD___SET_PROJECT_FILTER',
  // project detail
  DASHBOARD___GET_LIST_DETAIL: 'DASHBOARD___GET_LIST_DETAIL',
  DASHBOARD___GET_LIST_DETAIL_SUCCESS: 'DASHBOARD___GET_LIST_DETAIL_SUCCESS',
  DASHBOARD___GET_LIST_DETAIL_FAILED: 'DASHBOARD___GET_LIST_DETAIL_FAILED',
  DASHBOARD___EXPORT_EXCEL: 'DASHBOARD___EXPORT_EXCEL',
  DASHBOARD___EXPORT_EXCEL_SUCCESS: 'DASHBOARD___EXPORT_EXCEL_SUCCESS',
  DASHBOARD___TOGGLE_EXPORT_MODAL: 'DASHBOARD___TOGGLE_EXPORT_MODAL',
  DASHBOARD___GET_SUMMARIZE_FILTER: 'DASHBOARD___GET_SUMMARIZE_FILTER',
  DASHBOARD___GET_SUMMARIZE_FILTER_SUCCESS: 'DASHBOARD___GET_SUMMARIZE_FILTER_SUCCESS',
  DASHBOARD___SET_SUMMARIZE_CONDITION: 'DASHBOARD___SET_SUMMARIZE_CONDITION',
  // detail module
  DASHBOARD___GET_MODULE_LISTS: 'DASHBOARD___GET_MODULE_LISTS',
  DASHBOARD___GET_MODULE_LISTS_SUCCESS: 'DASHBOARD___GET_MODULE_LISTS_SUCCESS',
  DASHBOARD___TOGGLE_MODULE_DETAIL: 'DASHBOARD___TOGGLE_MODULE_DETAIL',
  DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL: 'DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL',
  DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL_SUCCESS: 'DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL_SUCCESS',
  // version choose
  DASHBOARD___GET_VERSIONS: 'DASHBOARD___GET_VERSIONS',
  DASHBOARD___GET_VERSIONS_SUCCESS: 'DASHBOARD___GET_VERSIONS_SUCCESS',
  DASHBOARD___CHOOSE_VERSION: 'DASHBOARD___CHOOSE_VERSION',
  DASHBOARD___CLOSE_VERSION_MODAL: 'DASHBOARD___CLOSE_VERSION_MODAL',
  DASHBOARD___SHOW_PROJECT_VIEW_ALERT: 'DASHBOARD___SHOW_PROJECT_VIEW_ALERT',
  DASHBOARD___RESET_PROJECT_VIEW_ALERT: 'DASHBOARD___RESET_PROJECT_VIEW_ALERT',
  // set expandedrow
  DASHBOARD___SET_EXPANDEDROWS: 'DASHBOARD___SET_EXPANDEDROWS',
};

// Get: project list
export function getProjectList(isInit = false) {
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_LIST,
    isInit, // 是否要reset分頁狀態
  };
}

export function getProjectListSuccess(data) {
  const { projectList } = data;
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_LIST_SUCCESS,
    projectList,
  };
}

export function getProjectListFailed(response) {
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_LIST_FAILED,
  };
}

// Get: project list detail
export function getListDetail(params) {
  return {
    type: actionTypes.DASHBOARD___GET_LIST_DETAIL,
    params,
  };
}

export function getDetailSuccess(info) {
  const { lists } = info;
  return {
    type: actionTypes.DASHBOARD___GET_LIST_DETAIL_SUCCESS,
    info,
    lists,
  };
}

/**
 * 取得ME/EE/Others的module或bu詳細內容 (點開的modal)
 * @param {*} { sku, type1, edmVersionId, moduleId, columnType, listType }
 */
export function getModuleLists(params) {
  return {
    type: actionTypes.DASHBOARD___GET_MODULE_LISTS,
    params
  };
}

export function getModuleListsSuccess({ moduleList, moduleId, listType }) {
  return {
    type: actionTypes.DASHBOARD___GET_MODULE_LISTS_SUCCESS,
    moduleList,
    moduleName: moduleId,
    listType, // bu | module | type1
  };
}

export function toggleModuleDetail(isModuleDetailOpen, columnType = 'ME') {
  return {
    type: actionTypes.DASHBOARD___TOGGLE_MODULE_DETAIL,
    isModuleDetailOpen,
    columnType,
  };
}

export function getVersions(projectInfo) {
  return {
    type: actionTypes.DASHBOARD___GET_VERSIONS,
    projectInfo,
  };
}

export function getVersionsSuccess(versions) {
  return {
    type: actionTypes.DASHBOARD___GET_VERSIONS_SUCCESS,
    versions,
    isVersionOpen: true,
  };
}

export function chooseVersion(selectedVersions, projectCode) {
  return {
    type: actionTypes.DASHBOARD___CHOOSE_VERSION,
    selectedVersions,
    projectCode
  };
}

export function showAlert(alertMsg) {
  return {
    type: actionTypes.DASHBOARD___SHOW_PROJECT_VIEW_ALERT,
    alertMsg,
  };
}

export function resetAlert() {
  return {
    type: actionTypes.DASHBOARD___RESET_PROJECT_VIEW_ALERT,
  };
}

export function closeVersionModal() {
  return {
    type: actionTypes.DASHBOARD___CLOSE_VERSION_MODAL,
    isVersionOpen: false,
  };
}

export function getFilterList(item = '') {
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_FILTER,
    item,
  };
}

export function getFilterListLv1Success(lv1) {
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_FILTER_LV1_SUCCESS,
    lv1,
  };
}

export function getFilterListLv2Success(lv2) {
  return {
    type: actionTypes.DASHBOARD___GET_PROJECT_FILTER_LV2_SUCCESS,
    lv2,
  };
}

export function resetFilter() {
  return {
    type: actionTypes.DASHBOARD___RESET_PROJECT_FILTER,
  };
}

export function setFilterCondition(searchInfo) {
  return {
    type: actionTypes.DASHBOARD___SET_PROJECT_FILTER,
    searchInfo,
  };
}


/**
 * 下載dashboard的excel
 */
export function exportDashboardExcel(querydata) {
  return {
    type: actionTypes.DASHBOARD___EXPORT_EXCEL,
    querydata
  };
}

export function exportDashboardExcelSuccess(response) {
  // 檔名的取得 要靠後端
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_Dashboard.xlsx';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );

  return {
    type: actionTypes.DASHBOARD___EXPORT_EXCEL_SUCCESS,
    response,
  };
}

/**
 * 下載module detail的excel
 */
export function exportModuleExcel() {
  return {
    type: actionTypes.DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL,
  };
}

export function exportModuleExcelSuccess(response) {
  // 檔名的取得 要靠後端
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_Dashboard.xlsx';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );

  return {
    type: actionTypes.DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL_SUCCESS,
    response,
  };
}

/**
 * 取得dashboard頁面裡的下拉
 */
export function getSummarizeFilter() {
  return {
    type: actionTypes.DASHBOARD___GET_SUMMARIZE_FILTER,
  };
}
export function getSummarizeFilterSuccess(data) {
  return {
    type: actionTypes.DASHBOARD___GET_SUMMARIZE_FILTER_SUCCESS,
    data,
  };
}

/**
 * 儲存Summarize的filter條件
 */
export function setSummarizeFilter(data) {
  return {
    type: actionTypes.DASHBOARD___SET_SUMMARIZE_CONDITION,
    data,
  };
}

export function setExpandedRow(expandedRows) {
  return {
    type: actionTypes.DASHBOARD___SET_EXPANDEDROWS,
    expandedRows,
  };
}
