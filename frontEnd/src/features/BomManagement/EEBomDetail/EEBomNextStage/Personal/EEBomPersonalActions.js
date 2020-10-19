import CommonUtils from '~~utils/CommonUtils';


export const actionPrefix = 'EEBOM_PERSONAL_PAGE___';
export const actionTypes = {
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_PERSONAL_TABLE_DATA').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PERSONAL_CHECK').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'SAVE_PERSONAL_TABLE').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'SUBMIT_PERSONAL_TABLE').template,
  [`${actionPrefix}CANCEL_EDIT_PERSONAL_TABLE`]: `${actionPrefix}CANCEL_EDIT_PERSONAL_TABLE`,
  [`${actionPrefix}SET_SELECTED_INFO`]: `${actionPrefix}SET_SELECTED_INFO`,
  [`${actionPrefix}RESET_SELECTED_INFO`]: `${actionPrefix}RESET_SELECTED_INFO`,
  [`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID`]: `${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID`,
  [`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID_LIST`]: `${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID_LIST`,
  [`${actionPrefix}UPDATE_ITEM_VALIDATE_ERROR`]: `${actionPrefix}UPDATE_ITEM_VALIDATE_ERROR`,
  [`${actionPrefix}SET_IS_EDIT_MODE`]: `${actionPrefix}SET_IS_EDIT_MODE`,
  /* ************************************************  APPROVER ************************************************************ */
  [`${actionPrefix}UPDATE_LEADER_CHECK`]: `${actionPrefix}UPDATE_LEADER_CHECK`,
  [`${actionPrefix}UPDATE_LEADER_SUBMIT`]: `${actionPrefix}UPDATE_LEADER_SUBMIT`,
  [`${actionPrefix}LEADER_APPROVE_EEBOM_BY_TYPE`]: `${actionPrefix}LEADER_APPROVE_EEBOM_BY_TYPE`,
  [`${actionPrefix}SAVE_LEADER_TABLE`]: `${actionPrefix}SAVE_LEADER_TABLE`,
  /* ************************************************  APPROVER END ************************************************************ */
  /* ************************************************  PCB ************************************************************ */
  [`${actionPrefix}UPDATE_PCB_PERSONAL_CHECK`]: `${actionPrefix}UPDATE_PCB_PERSONAL_CHECK`,
  [`${actionPrefix}UPDATE_PCB_PERSONAL_SUBMIT`]: `${actionPrefix}UPDATE_PCB_PERSONAL_SUBMIT`,
  [`${actionPrefix}UPDATE_PCB_LEADER_CHECK`]: `${actionPrefix}UPDATE_PCB_LEADER_CHECK`,
  [`${actionPrefix}UPDATE_PCB_LEADER_SUBMIT`]: `${actionPrefix}UPDATE_PCB_LEADER_SUBMIT`,
  /* ************************************************  PCB END ************************************************************ */
  /* ************************************************  RESET ************************************************************ */
  [`${actionPrefix}RESET_DATA`]: `${actionPrefix}RESET_DATA`,
  /* ************************************************  RESET END ************************************************************ */
  [`${actionPrefix}UPDATE_SORT_INFO`]: `${actionPrefix}UPDATE_SORT_INFO`,
  /* ************************************************  Filter 相關 ************************************************************ */
  [`${actionPrefix}SET_TWO_LEVEL_FILTER_INFO`]: `${actionPrefix}SET_TWO_LEVEL_FILTER_INFO`,
  [`${actionPrefix}RESET_TWO_LEVEL_FILTER_INFO`]: `${actionPrefix}RESET_TWO_LEVEL_FILTER_INFO`,
  [`${actionPrefix}FILTER_TABLE_DATA`]: `${actionPrefix}FILTER_TABLE_DATA`,
  [`${actionPrefix}CLEAN_FILTER_TABLE_DATA`]: `${actionPrefix}CLEAN_FILTER_TABLE_DATA`,
  /* ************************************************  Filter 相關 END ************************************************************ */
  [`${actionPrefix}GET_EEBOM_COPY_PRICE`]: `${actionPrefix}GET_EEBOM_COPY_PRICE`,
  [`${actionPrefix}GET_EEBOM_COPY_PRICE_SUCCESS`]: `${actionPrefix}GET_EEBOM_COPY_PRICE_SUCCESS`,
  [`${actionPrefix}TOGGLE_COPY_PRICE_MODAL`]: `${actionPrefix}TOGGLE_COPY_PRICE_MODAL`,
  [`${actionPrefix}TRIGGER_EEBOM_REFRESH_PRICE`]: `${actionPrefix}TRIGGER_EEBOM_REFRESH_PRICE`,
  [`${actionPrefix}SET_EEBOM_ALERT`]: `${actionPrefix}SET_EEBOM_ALERT`,
  [`${actionPrefix}SET_SHOW_PRICE_DIFF`]: `${actionPrefix}SET_SHOW_PRICE_DIFF`,
  [`${actionPrefix}SET_SHOW_EXP_SPA`]: `${actionPrefix}SET_SHOW_EXP_SPA`,
};


export function setShowEXPSpa(showEXPSpa) {
  return {
    type: actionTypes[`${actionPrefix}SET_SHOW_EXP_SPA`],
    showEXPSpa
  };
}


export function setShowPriceDiff(showPriceDiff) {
  return {
    type: actionTypes[`${actionPrefix}SET_SHOW_PRICE_DIFF`],
    showPriceDiff
  };
}

export function updateSortInfo(sortInfo) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_SORT_INFO`],
    sortInfo
  };
}


export function EEBomDetailReset() {
  return {
    type: actionTypes[`${actionPrefix}RESET_DATA`],
  };
}


export function setIsEditMode(boolean) {
  return {
    type: actionTypes[`${actionPrefix}SET_IS_EDIT_MODE`],
    boolean
  };
}

export function updateItemValidateError(rowId, rowKey, errorsList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_ITEM_VALIDATE_ERROR`],
    rowId,
    rowKey,
    errorsList
  };
}


/**
 * 所有項目都check過，可以submit
 */
export function submitPersonalTable(data) {
  return {
    type: actionTypes[`${actionPrefix}SUBMIT_PERSONAL_TABLE`],
    submitData: data
  };
}


export function getTableData() {
  return {
    type: actionTypes[`${actionPrefix}GET_PERSONAL_TABLE_DATA`],
  };
}


/**  copy price們 */

export function getCopyPrice(data) {
  return {
    type: actionTypes[`${actionPrefix}GET_EEBOM_COPY_PRICE`],
    data
  };
}

export function getCopyPriceSuccess(data) {
  return {
    type: actionTypes[`${actionPrefix}GET_EEBOM_COPY_PRICE_SUCCESS`],
    data
  };
}

export function toggleCopyModal(isOpenCopy = true) {
  return {
    type: actionTypes[`${actionPrefix}TOGGLE_COPY_PRICE_MODAL`],
    isOpenCopy,
  };
}

/** refresh price們 */

export function triggerRefresh(edmVersion) {
  return {
    type: actionTypes[`${actionPrefix}TRIGGER_EEBOM_REFRESH_PRICE`],
    edmVersion,
  };
}

export function setAlertMessage(alertMessage) {
  return {
    type: actionTypes[`${actionPrefix}SET_EEBOM_ALERT`],
    alertMessage,
  };
}

/* ************************************************  Filter 相關 ************************************************************ */
export function setTwoLevelFilterInfo(updateInfoObj) {
  return {
    type: actionTypes[`${actionPrefix}SET_TWO_LEVEL_FILTER_INFO`],
    updateInfoObj
  };
}

export function resetTwoLevelFilterInfo() {
  return {
    type: actionTypes[`${actionPrefix}RESET_TWO_LEVEL_FILTER_INFO`],
  };
}

export function filterTableData() {
  return {
    type: actionTypes[`${actionPrefix}FILTER_TABLE_DATA`],
  };
}

export function cleanFilterTableData() {
  return {
    type: actionTypes[`${actionPrefix}CLEAN_FILTER_TABLE_DATA`],
  };
}
/* ************************************************  Filter 相關 END ************************************************************ */

export function updatePersonalCheck(idList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PERSONAL_CHECK`],
    idList
  };
}

export function updateLeaderCheck(idList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_LEADER_CHECK`],
    idList
  };
}

export function updatePersonalTableRowItemByIdList(idList, rowKey, rowValue) {
  // console.log('[updatePersonalTableRowItemByIdList]');
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID_LIST`],
    idList,
    rowKey,
    rowValue
  };
}


export function updatePersonalTableRowItemById(id, rowKey, rowValue) {
  // console.log('[updatePersonalTableRowItemById]');
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID`],
    id,
    rowKey,
    rowValue
  };
}


export function cancelEditPersonalTable() {
  return {
    type: actionTypes[`${actionPrefix}CANCEL_EDIT_PERSONAL_TABLE`],
  };
}

/**
 * 存取修改後的table
 */
export function savePersonalTable(data) {
  return {
    type: actionTypes[`${actionPrefix}SAVE_PERSONAL_TABLE`],
    data
  };
}

export function saveLeaderTable(data) {
  return {
    type: actionTypes[`${actionPrefix}SAVE_LEADER_TABLE`],
    data
  };
}


export function setSelectedInfo(updateInfoObj) {
  return {
    type: actionTypes[`${actionPrefix}SET_SELECTED_INFO`],
    updateInfoObj
  };
}

export function resetSelectedInfo() {
  return {
    type: actionTypes[`${actionPrefix}RESET_SELECTED_INFO`],
  };
}

/*
bomType: pcb or bom
*/
export function leaderApproveEEBomByType(bomType, versionRemark = null) {
  return {
    type: actionTypes[`${actionPrefix}LEADER_APPROVE_EEBOM_BY_TYPE`],
    bomType,
    versionRemark
  };
}

/* ********************************************* PCB ********************************************* */
export function updatePCBPersonalCheck(data) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PCB_PERSONAL_CHECK`],
    data
  };
}

export function updatePCBPersonalSubmit(data) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PCB_PERSONAL_SUBMIT`],
    data
  };
}

export function updatePCBLeaderCheck(data) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PCB_LEADER_CHECK`],
    data
  };
}

export function updatePCBLeaderSubmit(data) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_PCB_LEADER_SUBMIT`],
    data
  };
}
/* ********************************************* PCB END ********************************************* */

export function updateLeaderSubmit(data) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_LEADER_SUBMIT`],
    data
  };
}

