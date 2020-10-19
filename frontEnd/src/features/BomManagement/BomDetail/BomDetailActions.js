import FileSaver from 'file-saver';

export const actionTypes = {
  /* ***************** ME BOM 修改功能 ***************** */
  BOM___LEAVE_EDIT_MODE: 'BOM___LEAVE_EDIT_MODE',
  BOM___SET_IS_EDIT_MODE: 'BOM___SET_IS_EDIT_MODE',
  BOM___UPDATE_ROW_ITEM_VALIDATE_ERROR: 'BOM___UPDATE_ROW_ITEM_VALIDATE_ERROR',
  BOM___UPDATE_ME_BOM_TABLE_CELL_BY_ID: 'BOM___UPDATE_ME_BOM_TABLE_CELL_BY_ID',
  BOM___CANCEL_EDIT_MEBOM_TABLE: 'BOM___CANCEL_EDIT_MEBOM_TABLE',
  BOM___SAVE_MEBOM_TABLE: 'BOM___SAVE_MEBOM_TABLE',
  BOM___SAVE_MEBOM_TABLE_SUCCESS: 'BOM___SAVE_MEBOM_TABLE_SUCCESS',
  BOM___SAVE_MEBOM_TABLE_FAILED: 'BOM___SAVE_MEBOM_TABLE_FAILED',
  /* ***************** ME BOM 修改功能 END ***************** */
  BOM___UPDATE_BOM_ITEM_ID: 'BOM___UPDATE_BOM_ITEM_ID',
  // GET InputBom detail
  BOM___GET_BOMDETAIL: 'BOM___GET_BOMDETAIL',
  // BOM___GET_BOMDETAIL_SUCCESS: 'BOM___GET_BOMDETAIL_SUCCESS',
  // BOM___GET_BOMDETAIL_FAILED: 'BOM___GET_BOMDETAIL_FAILED',

  // Search BOM detail by part name / number
  BOM___UPDATE_SEARCH_KEYWORD: 'BOM___UPDATE_SEARCH_KEYWORD',


  BOM___GET_BOMITEMLIST: 'BOM___GET_BOMITEMLIST',
  BOM___GET_BOMITEMLIST_SUCCESS: 'BOM___GET_BOMITEMLIST_SUCCESS',
  BOM___GET_BOMITEMLIST_FAILED: 'BOM___GET_BOMITEMLIST_FAILED',

  // 版本下拉
  BOM___UPDATE_CURRENT_VERSION: 'BOM___UPDATE_CURRENT_VERSION',
  BOM___GET_VERSIONS_SUCCESS: 'BOM___GET_VERSIONS_SUCCESS',
  BOM___REFRESH_VERSION_LIST: 'BOM___REFRESH_VERSION_LIST',

  // GET InputBom Assign List
  BOM___GET_BOM_ASSIGNLIST: 'BOM___GET_BOM_ASSIGNLIST',
  BOM___GET_BOM_ASSIGNLIST_SUCCESS: 'BOM___GET_BOM_ASSIGNLIST_SUCCESS',
  BOM___GET_BOM_ASSIGNLIST_FAILED: 'BOM___GET_BOM_ASSIGNLIST_FAILED',


  BOM___SET_BOM_ASSIGN: 'BOM___SET_BOM_ASSIGN',


  // handle Modal
  // BOM___TOGGLE_PART_LIST_EDIT_MODAL: 'BOM___TOGGLE_EDIT_MODAL',
  BOM___TOGGLE_BOM_ITEM_MODAL: 'BOM___TOGGLE_BOM_ITEM_MODAL',


  // get dropdown value
  BOM___GET_DROPDOWN_VALUE: 'BOM___GET_DROPDOWN_VALUE',
  BOM___GET_DROPDOWN_VALUE_SUCCESS: 'BOM___GET_DROPDOWN_VALUE_SUCCESS',
  BOM___GET_DROPDOWN_VALUE_FAILED: 'BOM___GET_DROPDOWN_VALUE_FAILED',


  // get bom parentlevel
  BOM___GET_BOM_PARENTLEVEL: 'BOM___GET_BOM_PARENTLEVEL',
  BOM___GET_BOM_PARENTLEVEL_SUCCESS: 'BOM___GET_BOM_PARENTLEVEL_SUCCESS',
  BOM___GET_BOM_PARENTLEVEL_FAILED: 'BOM___GET_BOM_PARENTLEVEL_FAILED',

  BOM___UPDATE_BOM_FORM: 'BOM___UPDATE_BOM_FORM',
  BOM___VERSION_COMPLETE: 'BOM___VERSION_COMPLETE',
  BOM___APPROVE_BOM: 'BOM___APPROVE_BOM',

  BOM___SET_BOM_MODAL_INFO: 'BOM___SET_BOM_MODAL_INFO',

  // Import excel file
  BOM___TOGGLE_IMPORT_MODAL: 'BOM___TOGGLE_IMPORT_MODAL',
  BOM___UPDATE_STEP: 'BOM___UPDATE_STEP',
  BOM___UPDATE_IMPORT_FILE: 'BOM___UPDATE_IMPORT_FILE',
  BOM___RESET_MODAL: 'BOM___RESET_MODAL',

  BOM___UPLOAD_FILE: 'BOM___UPLOAD_FILE',
  BOM___UPLOAD_FILE_SUCCESS: 'BOM___UPLOAD_FILE_SUCCESS',
  BOM___UPLOAD_FILE_FAILED: 'BOM___UPLOAD_FILE_FAILED',

  BOM___RESET_IMPORT_MODAL: 'BOM___RESET_IMPORT_MODAL',
  BOM___SET_ACTIVETAB: 'BOM___SET_ACTIVETAB',
  BOM___DELETE_TEMP_DATA: 'BOM___DELETE_TEMP_DATA',
  BOM___DELETE_TEMP_DATA_SUCCESS: 'BOM___DELETE_TEMP_DATA_SUCCESS',
  BOM___DELETE_TEMP_DATA_FAILED: 'BOM___DELETE_TEMP_DATA_FAILED',

  BOM___GET_MAPPING_INFO: 'BOM___GET_MAPPING_INFO',
  BOM___GET_MAPPING_INFO_SUCCESS: 'BOM___GET_MAPPING_INFO_SUCCESS',
  BOM___GET_MAPPING_INFO_FAILED: 'BOM___GET_MAPPING_INFO_FAILED',

  BOM___CONFIRM_UPLOAD_ITEM: 'BOM___CONFIRM_UPLOAD_ITEM',
  BOM___CONFIRM_UPLOAD_ITEM_SUCCESS: 'BOM___CONFIRM_UPLOAD_ITEM_SUCCESS',
  BOM___CONFIRM_UPLOAD_ITEM_FAILED: 'BOM___CONFIRM_UPLOAD_ITEM_FAILED',

  // HOTFIX: RD 在n.7的版本不能編BOM表和partlist(為了不讓n.7變回n.5)
  BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_SUCCESS: 'BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_SUCCESS',
  BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_ERROR: 'BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_ERROR',

  // 按返回後要RESET BOM detail的所有state
  BOM___RESET_BOM_DETAIL: 'BOM___RESET_BOM_DETAIL',

  // ME BOM 下載 Import BOM 的Template
  BOM___DOWNLOAD_BOM_TEMPLATE: 'BOM___DOWNLOAD_BOM_TEMPLATE',
  BOM___DOWNLOAD_BOM_TEMPLATE_SUCCESS: 'BOM___DOWNLOAD_BOM_TEMPLATE_SUCCESS',
  BOM___DOWNLOAD_BOM_TEMPLATE_FAILED: 'BOM___DOWNLOAD_BOM_TEMPLATE_FAILED',

  // ME INPUT BOM上方的INFO開關
  BOM___TOGGLE_INPUTBOM_INFO: 'BOM___TOGGLE_INPUTBOM_INFO',

  // 過濾Grid的欄位
  BOM___FILTER_GRID_COLUMNS: 'BOM___FILTER_GRID_COLUMNS',

  BOM___SET_SELECTED_SKU_NUM: 'BOM___SET_SELECTED_SKU_NUM',

  BOM___INFORM_SOURCER: 'BOM___INFORM_SOURCER',
  BOM___INFORM_CE: 'BOM___INFORM_CE',

  BOM___GET_EMDM_IMAGES: 'BOM___GET_EMDM_IMAGES',
  BOM___RESET_EMDM_IMAGES: 'BOM___RESET_EMDM_IMAGES',
  BOM___GET_EMDM_IMAGES_SUCCESS: 'BOM___GET_EMDM_IMAGES_SUCCESS',

};

/* *************************** 修改MEBOM價錢相關 ******************** */
// 進入修改模式
export function setIsEditMode(boolean) {
  return {
    type: actionTypes.BOM___SET_IS_EDIT_MODE,
    boolean
  };
}

// 沒有過validate，記到error裡面
export function updateRowItemValidateError(rowId, rowKey, errorsList) {
  return {
    type: actionTypes.BOM___UPDATE_ROW_ITEM_VALIDATE_ERROR,
    rowId,
    rowKey,
    errorsList
  };
}

// 修改某列，某欄位的值
export function updateMEBomTableCellById(id, rowKey, rowValue) {
  // console.log('把某個key的值更新', id, id, rowKey, rowValue);
  return {
    type: actionTypes.BOM___UPDATE_ME_BOM_TABLE_CELL_BY_ID,
    id,
    rowKey,
    rowValue
  };
}

// 取消修改
export function cancelEditMEBomTable() {
  console.log('[取消修改]');
  return {
    type: actionTypes.BOM___CANCEL_EDIT_MEBOM_TABLE,
  };
}

// 存檔
export function saveMEBomTable(editPolicy) {
  return {
    type: actionTypes.BOM___SAVE_MEBOM_TABLE,
    editPolicy,
  };
}


/* *************************** 修改MEBOM價錢相關 ******************** */

export function updateBomItemId(bomItemId) {
  return {
    type: actionTypes.BOM___UPDATE_BOM_ITEM_ID,
    bomItemId
  };
}

export function setActiveTab(activeTab) {
  return {
    type: actionTypes.BOM___SET_ACTIVETAB,
    activeTab
  };
}

// SET: BOM MODAL OPEN
export function setModalInfo(modalInfo) {
  return {
    type: actionTypes.BOM___SET_BOM_MODAL_INFO,
    modalInfo
  };
}

// GET: Assignlist  目前只有新增、更新bom item時才會呼叫此function
export function getBomAssignlist(params) {
  const { bomID, assign } = params;
  return {
    type: actionTypes.BOM___GET_BOM_ASSIGNLIST,
    params: {
      bomID
    }
  };
}

export function getBomAssignlistSuccess(response, assignItem) {
  return {
    type: actionTypes.BOM___GET_BOM_ASSIGNLIST_SUCCESS,
    assignData: response.data,
    assignItem
  };
}

export function getBomAssignlistFailed(response) {
  const error = response.data;
  return {
    type: actionTypes.BOM___GET_BOM_ASSIGNLIST_FAILED,
    error
  };
}


// GET: 同時取得bomtem-list跟assignlist，用於BomManagement => inputBom 時api都拿到後才進行轉頁
export function getBomDetail(params, disableChangeTab) {
  const { bomID, assign } = params;
  // console.log('ACTION getBomDetail', params);
  return {
    type: actionTypes.BOM___GET_BOMDETAIL,
    params: {
      bomID,
    },
    disableChangeTab
  };
}

// GET: getBomItemList
export function getBomItemList(params) {
  return {
    type: actionTypes.BOM___GET_BOMITEMLIST,
    params
  };
}

// 取得版本清單
export function getBomVersionListSuccess(versionsList) {
  return {
    type: actionTypes.BOM___GET_VERSIONS_SUCCESS,
    versionsList,
  };
}

// 更新現在觀看的版本
export function updateCurrentVersion(currentVersion) {
  return {
    type: actionTypes.BOM___UPDATE_CURRENT_VERSION,
    currentVersion,
  };
}

// 更新版本清單，並且切換到最新版本 (用於新增/編輯BOM item後)
export function refreshCurrentVersion(bomID) {
  return {
    type: actionTypes.BOM___REFRESH_VERSION_LIST,
    bomID,
  };
}

// 更新關鍵字
export function updateSearchValue(searchValue) {
  // console.log('updateSearchValue', searchValue);
  return {
    type: actionTypes.BOM___UPDATE_SEARCH_KEYWORD,
    searchValue,
  };
}

export function getBomItemListSuccess(response) {
  // console.log('ACTION get BomDetail Success', response);
  return {
    type: actionTypes.BOM___GET_BOMITEMLIST_SUCCESS,
    bomData: response.data,
  };
}


export function getBomItemListFailed(response) {
  // console.log('ACTION getTableTypeList failed >>>', response.data);
  const error = response.data;
  return {
    type: actionTypes.BOM___GET_BOMDETAIL_FAILED,
    error
  };
}

export function setBomAssignItem(assignItem) {
  return {
    type: actionTypes.BOM___SET_BOM_ASSIGN,
    assignItem
  };
}


export function toggleBomItemModal(action, status) {
  return {
    type: actionTypes.BOM___TOGGLE_BOM_ITEM_MODAL,
    action,
    status,
  };
}


// GET: ADD, EDIT ITEM 時要先取得下拉的data
export function getDropdownValue(productType) {
  return {
    type: actionTypes.BOM___GET_DROPDOWN_VALUE,
    productType
  };
}

export function getDropdownValueSuccess(response) {
  return {
    type: actionTypes.BOM___GET_DROPDOWN_VALUE_SUCCESS,
    response
  };
}

export function getDropdownValueFailed(response) {
  return {
    type: actionTypes.BOM___GET_DROPDOWN_VALUE_FAILED,
  };
}


export function getParentlevel(params) {
  return {
    type: actionTypes.BOM___GET_BOM_PARENTLEVEL,
    params
  };
}
export function getParentlevelSuccess(response) {
  return {
    type: actionTypes.BOM___GET_BOM_PARENTLEVEL_SUCCESS,
    parentlevel: response.data
  };
}
export function getParentlevelFailed() {
  return {
    type: actionTypes.BOM___GET_BOM_PARENTLEVEL_FAILED,
  };
}

export function updateBomForm(bomForm) {
  // console.log('====================> [更新表單]', bomForm);
  return {
    type: actionTypes.BOM___UPDATE_BOM_FORM,
    bomForm
  };
}

export function approveBom() {
  return {
    type: actionTypes.BOM___APPROVE_BOM,
  };
}

export function completeBom() {
  return {
    type: actionTypes.BOM___VERSION_COMPLETE,
  };
}


export function toggleImportModal(status) {
  return {
    type: actionTypes.BOM___TOGGLE_IMPORT_MODAL,
    status
  };
}

export function updateStep(status) {
  return {
    type: actionTypes.BOM___UPDATE_STEP,
    status
  };
}

export function updateImportFile(file) {
  return {
    type: actionTypes.BOM___UPDATE_IMPORT_FILE,
    file
  };
}

export function resetModal() {
  return {
    type: actionTypes.BOM___RESET_MODAL,
  };
}


export function uploadFile(file) {
  return {
    type: actionTypes.BOM___UPLOAD_FILE,
    file,
  };
}

export function uploadFileSuccess(response) {
  // console.log('Action upload file success', response);
  return {
    type: actionTypes.BOM___UPLOAD_FILE_SUCCESS,
    res: response.data
  };
}

export function uploadFileFailed(response) {
  console.log('Action upload file failed >>>', response);
  return {
    type: actionTypes.BOM___UPLOAD_FILE_FAILED,
  };
}


export function deleteTemp() {
  return {
    type: actionTypes.BOM___DELETE_TEMP_DATA,
  };
}

export function deleteTempSuccess(response) {
  // console.log('Action delete Temp success', response);
  return {
    type: actionTypes.BOM___DELETE_TEMP_DATA_SUCCESS,
  };
}

export function deleteTempFailed(response) {
  console.log('Action delete Temp failed >>>', response);
  return {
    type: actionTypes.BOM___DELETE_TEMP_DATA_FAILED,
  };
}

export function getMappingInfo() {
  return {
    type: actionTypes.BOM___GET_MAPPING_INFO,
  };
}

export function getMappingInfoSuccess(response) {
  // console.log('Action get Mapping Info success', response);
  return {
    type: actionTypes.BOM___GET_MAPPING_INFO_SUCCESS,
    res: response.data
  };
}

export function getMappingInfoFailed(response) {
  console.log('Action get Mapping Info failed >>>', response);
  return {
    type: actionTypes.BOM___GET_MAPPING_INFO_FAILED,
  };
}

export function confirmBomItem(transferOwner) {
  return {
    type: actionTypes.BOM___CONFIRM_UPLOAD_ITEM,
    transferOwner
  };
}

export function confirmBomItemSuccess(response) {
  // console.log('Action confirm Bom Item success', response);
  return {
    type: actionTypes.BOM___CONFIRM_UPLOAD_ITEM_SUCCESS,
  };
}

export function confirmBomItemFailed(response) {
  console.log('Action confirm Bom Item failed >>>', response);
  return {
    type: actionTypes.BOM___CONFIRM_UPLOAD_ITEM_FAILED,
  };
}

export function resetBomDetail() {
  return {
    type: actionTypes.BOM___RESET_BOM_DETAIL,
  };
}

// 下載 bom template
export function downloadBomTemplate() {
  return {
    type: actionTypes.BOM___DOWNLOAD_BOM_TEMPLATE,
  };
}

export function downloadBomTemplateSuccess(response) {
  // console.log('Action download Bom Template success', response);
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_MEBOM_Template.xlsx';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );
  return {
    type: actionTypes.BOM___DOWNLOAD_BOM_TEMPLATE_SUCCESS,
  };
}

export function downloadBomTemplateFailed(response) {
  console.log('Action download Bom Template failed >>>', response);
  return {
    type: actionTypes.BOM___DOWNLOAD_BOM_TEMPLATE_FAILED,
  };
}

export function toggleInputBomInfo(isInputBomInfoOpen) {
  return {
    type: actionTypes.BOM___TOGGLE_INPUTBOM_INFO,
    isInputBomInfoOpen
  };
}

export function filterGridColumns(columns) {
  return {
    type: actionTypes.BOM___FILTER_GRID_COLUMNS,
    columns
  };
}

export function setSelectedSkuNum(selectedSkuNum) {
  return {
    type: actionTypes.BOM___SET_SELECTED_SKU_NUM,
    selectedSkuNum
  };
}

export function informSourcer(bomId) {
  return {
    type: actionTypes.BOM___INFORM_SOURCER,
    bomId
  };
}

export function informCE(bomId) {
  return {
    type: actionTypes.BOM___INFORM_CE,
    bomId
  };
}


export function getEmdmBomImage(bomId, sourceItemId, dataType = 'item') {
  return {
    type: actionTypes.BOM___GET_EMDM_IMAGES,
    bomId,
    sourceItemId,
    dataType, // item | part
  };
}

export function getEmdmBomImageSucccess(emdmImgList) {
  return {
    type: actionTypes.BOM___GET_EMDM_IMAGES_SUCCESS,
    emdmImgList
  };
}

export function resetEmdmBomImage() {
  return {
    type: actionTypes.BOM___RESET_EMDM_IMAGES,
  };
}


export default {};
