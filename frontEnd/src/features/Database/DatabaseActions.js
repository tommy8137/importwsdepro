export const actionTypes = {
  /* 共用的 -------------------------------------------------------------------------------------------------------*/
  DATABASE___SET_NEXT_SCHEDULE: 'DATABASE___SET_NEXT_SCHEDULE',
  DATABASE___GET_NEXT_SCHEDULE: 'DATABASE___GET_NEXT_SCHEDULE',
  DATABASE___GET_NEXT_SCHEDULE_SUCCESS: 'DATABASE___GET_NEXT_SCHEDULE_SUCCESS',

  DATABASE___GET_PRODUCT_TYPE: 'DATABASE___GET_PRODUCT_TYPE',
  DATABASE___GET_PRODUCT_TYPE_SUCCESS: 'DATABASE___GET_PRODUCT_TYPE_SUCCESS',
  DATABASE___SET_PRODUCT_TYPE: 'DATABASE___SET_PRODUCT_TYPE',

  /* Common Parameters -------------------------------------------------------------------------------------------*/
  DATABASE___GET_COMMON_PARAMETERS: 'DATABASE___GET_COMMON_PARAMETERS',
  DATABASE___GET_COMMON_PARAMETERS_SUCCESS: 'DATABASE___GET_COMMON_PARAMETERS_SUCCESS',
  DATABASE___PUT_COMMON_PARAMETERS: 'DATABASE___PUT_COMMON_PARAMETERS',
  DATABASE___PUT_COMMON_PARAMETERS_SUCCESS: 'DATABASE___PUT_COMMON_PARAMETERS_SUCCESS',
  DATABASE___POST_COMMON_PARAMETERS: 'DATABASE___POST_COMMON_PARAMETERS',
  DATABASE___POST_COMMON_PARAMETERS_SUCCESS: 'DATABASE___POST_COMMON_PARAMETERS_SUCCESS',
  DATABASE___SET_COMMON_PARAMETERS_ADD_MODAL_OPEN: 'DATABASE___SET_COMMON_PARAMETERS_ADD_MODAL_OPEN',
  DATABASE___SET_COMMON_PARAMETERS_SCHEDULE: 'DATABASE___SET_COMMON_PARAMETERS_SCHEDULE',

  /* Product Type List -------------------------------------------------------------------------------------------*/
  DATABASE___GET_PRODUCT_TYPE_LIST: 'DATABASE___GET_PRODUCT_TYPE_LIST',
  DATABASE___GET_PRODUCT_TYPE_LIST_SUCCESS: 'DATABASE___GET_PRODUCT_TYPE_LIST_SUCCESS',
  DATABASE___PUT_PRODUCT_TYPE_LIST: 'DATABASE___PUT_PRODUCT_TYPE_LIST',
  DATABASE___PUT_PRODUCT_TYPE_LIST_SUCCESS: 'DATABASE___PUT_PRODUCT_TYPE_LIST_SUCCESS',
  DATABASE___POST_PRODUCT_TYPE_LIST: 'DATABASE___POST_PRODUCT_TYPE_LIST',
  DATABASE___POST_PRODUCT_TYPE_LIST_SUCCESS: 'DATABASE___POST_PRODUCT_TYPE_LIST_SUCCESS',
  DATABASE___SET_PRODUCT_TYPE_LIST_ADD_MODAL_OPEN: 'DATABASE___SET_PRODUCT_TYPE_LIST_ADD_MODAL_OPEN',

  /* Site Actions ------------------------------------------------------------------------------------------------*/
  DATABASE___GET_SITE_LIST: 'DATABASE___GET_SITE_LIST',
  DATABASE___GET_SITE_LIST_SUCCESS: 'DATABASE___GET_SITE_LIST_SUCCESS',
  DATABASE___UPDATE_SITE_LIST: 'DATABASE___UPDATE_SITE_LIST',
  DATABASE___UPDATE_SITE_LIST_SUCCESS: 'DATABASE___UPDATE_SITE_LIST_SUCCESS',
  DATABASE___CREATE_SITE: 'DATABASE___CREATE_SITE',
  DATABASE___CREATE_SITE_SUCCESS: 'DATABASE___CREATE_SITE_SUCCESS',

  /* Material Price ----------------------------------------------------------------------------------------------*/
  DATABASE___SET_MATERIAL_PRICE_SELECTED_PART_CATE: 'DATABASE___SET_MATERIAL_PRICE_SELECTED_PART_CATE',
  DATABASE___GET_MATERIAL_PRICE_LIST: 'DATABASE___GET_MATERIAL_PRICE_LIST',
  DATABASE___GET_MATERIAL_PRICE_LIST_SUCCESS: 'DATABASE___GET_MATERIAL_PRICE_LIST_SUCCESS',
  DATABASE___SET_MATERIAL_PRICE_LINK_MODAL: 'DATABASE___SET_MATERIAL_PRICE_LINK_MODAL',
  DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY: 'DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY',
  DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY_SUCCESS: 'DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY_SUCCESS',
  DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY: 'DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY',
  DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY_SUCCESS: 'DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY_SUCCESS',
  DATABASE___UPDATE_MATERIAL_PRICE: 'DATABASE___UPDATE_MATERIAL_PRICE',
  DATABASE___SET_MATERIAL_PRICE_SCHEDULE: 'DATABASE___SET_MATERIAL_PRICE_SCHEDULE',
  DATABASE___PUT_MATERIAL_PRICE_MATERIAL_SPEC: 'DATABASE___PUT_MATERIAL_PRICE_MATERIAL_SPEC',
  DATABASE___PUT_MATERIAL_PRICE_DIECUT_MATERIAL_SPEC: 'DATABASE___PUT_MATERIAL_PRICE_DIECUT_MATERIAL_SPEC',
  DATABASE___ADD_NEW_MATERIAL_PRICE_ITEM: 'DATABASE___ADD_NEW_MATERIAL_PRICE_ITEM',
  DATABASE___ARCHIVE_MATERIAL_PRICE_ITEM: 'DATABASE___ARCHIVE_MATERIAL_PRICE_ITEM',
  DATABASE___UNARCHIVE_MATERIAL_PRICE_ITEM: 'DATABASE___UNARCHIVE_MATERIAL_PRICE_ITEM',
  // metal
  DATABASE___PUT_MATERIAL_PRICE_COMMON_PARAMETER: 'DATABASE___PUT_MATERIAL_PRICE_COMMON_PARAMETER',
  DATABASE___SET_MATERIAL_PRICE_IS_EDITMODE: 'DATABASE___SET_MATERIAL_PRICE_IS_EDITMODE',

  // Import Material Price
  DATABASE___TOGGLE_IMPORT_MODAL: 'DATABASE___TOGGLE_IMPORT_MODAL',
  DATABASE___UPDATE_STEP: 'DATABASE___UPDATE_STEP',
  DATABASE___UPDATE_IMPORT_FILE: 'DATABASE___UPDATE_IMPORT_FILE',
  DATABASE___RESET_MODAL: 'DATABASE___RESET_MODAL',

  DATABASE___UPLOAD_FILE: 'DATABASE___UPLOAD_FILE',
  DATABASE___UPLOAD_FILE_SUCCESS: 'DATABASE___UPLOAD_FILE_SUCCESS',
  DATABASE___UPLOAD_FILE_FAILED: 'DATABASE___UPLOAD_FILE_FAILED',

  // turning
  DATABASE___PUT_MATERIAL_PRICE_NUT_TYPE: 'DATABASE___PUT_MATERIAL_PRICE_NUT_TYPE',
  DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN: 'DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN',
  DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN_SUCCESS: 'DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN_SUCCESS',

  // diecut
  DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN: 'DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN',
  DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN_SUCCESS: 'DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN_SUCCESS',
};

/* Material Price  Actions ---------------------------------------------------------------------------------------*/
export function getMaterialPriceDieCutDropDown() {
  return  {
    type: actionTypes.DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN
  };
}
export function getMaterialPriceDieCutDropDownSuccess(response) {
  return {
    type: actionTypes.DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN_SUCCESS,
    dieCutType2DropDwon: response.data,
  };
}

export function setMaterialPriceIsEditMode(isEditMode) {
  return {
    type: actionTypes.DATABASE___SET_MATERIAL_PRICE_IS_EDITMODE,
    isEditMode
  };
}

export function setMaterialPriceSchedule(nextDate) {
  return {
    type: actionTypes.DATABASE___SET_MATERIAL_PRICE_SCHEDULE,
    data: {
      nextDate
    },
  };
}

export function putMaterialPricePartCategory(partCategoryType, data) {
  return {
    type: actionTypes.DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY,
    partCategoryType,
    data
  };
}

export function putMaterialPricePartCategorySuccess() {
  return {
    type: actionTypes.DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY_SUCCESS,
  };
}

/**
 * 取的partCategory的list
 * @param {*} linkItem 打開link modal所需要用到的資訊
 * {id: materialId, name: materialName, type: housing_metal}
 */
export function getMaterialPricePartCategory(partCategoryType, linkItem) {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY,
    partCategoryType,
    linkItem
  };
}

export function getMaterialPricePartCategorySuccess(response) {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY_SUCCESS,
    partCategory: response.data.partCategory
  };
}

/**
 * material link modal
 * @param {*} isLinkModalOpen 打開連結modal的開關
 */
export function setMaterialPriceLinkModal(isLinkModalOpen) {
  return {
    type: actionTypes.DATABASE___SET_MATERIAL_PRICE_LINK_MODAL,
    isLinkModalOpen
  };
}

/**
 * 更新右上角的下拉的value
 * @param {} selectedPartCate {label: '', value:''}
 */
export function setMaterialPriceSelectedPartCate(selectedPartCate) {
  return {
    type: actionTypes.DATABASE___SET_MATERIAL_PRICE_SELECTED_PART_CATE,
    selectedPartCate
  };
}

/**
 * 取得目前material price 的 ist
 * @param {*} partCate metal/plastic
 */
export function getMaterialPriceList(partCate) {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_LIST,
    partCate
  };
}

export function getMaterialPriceListSuccess(response) {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_LIST_SUCCESS,
    materialPriceDate: response.data.date,
    materialPriceList: response.data.materialPriceList,
  };
}

export function addNewMaterialPriceItem(info) {
  return {
    type: actionTypes.DATABASE___ADD_NEW_MATERIAL_PRICE_ITEM,
    info,
  };
}

export function archiveMaterialPriceItem(info) {
  return {
    type: actionTypes.DATABASE___ARCHIVE_MATERIAL_PRICE_ITEM,
    info,
  };
}

export function unArchiveMaterialPriceItem(info) {
  return {
    type: actionTypes.DATABASE___UNARCHIVE_MATERIAL_PRICE_ITEM,
    info,
  };
}

// Metal專用
export function updateMaterialPrice(partCate, data) {
  return {
    type: actionTypes.DATABASE___UPDATE_MATERIAL_PRICE,
    partCate,
    data
  };
}

export function putMaterialSpec(partCate, data) {
  return {
    type: actionTypes.DATABASE___PUT_MATERIAL_PRICE_MATERIAL_SPEC,
    partCate,
    data
  };
}

export function putMaterialPriceCommonParameter(partCate, data) {
  return {
    type: actionTypes.DATABASE___PUT_MATERIAL_PRICE_COMMON_PARAMETER,
    partCate,
    data
  };
}


export function getMaterialPriceTurningDropdown() {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN,
  };
}

export function getMaterialPriceTurningDropdownSuccess(data) {
  return {
    type: actionTypes.DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN_SUCCESS,
    data
  };
}


export function putMaterialPriceNutType(partCate, data) {
  return {
    type: actionTypes.DATABASE___PUT_MATERIAL_PRICE_NUT_TYPE,
    partCate,
    data
  };
}

/* 共用的 Actions --------------------------------------------------------------------------------*/
export function setSchedule(nextDate) {
  return {
    type: actionTypes.DATABASE___SET_NEXT_SCHEDULE,
    nextDate,
  };
}

export function getSchedule(formulaType) {
  return {
    type: actionTypes.DATABASE___GET_NEXT_SCHEDULE,
    formulaType,
  };
}

export function getScheduleSuccess(data) {
  return {
    type: actionTypes.DATABASE___GET_NEXT_SCHEDULE_SUCCESS,
    ...data,
  };
}

export function getProductType(formulaType) {
  return {
    type: actionTypes.DATABASE___GET_PRODUCT_TYPE,
    formulaType,
  };
}

export function getProductTypeSuccess(productTypeList) {
  return {
    type: actionTypes.DATABASE___GET_PRODUCT_TYPE_SUCCESS,
    productTypeList,
  };
}

export function setProductType(activeProductType) {
  return {
    type: actionTypes.DATABASE___SET_PRODUCT_TYPE,
    activeProductType,
  };
}

/* Common Parameters Actions ---------------------------------------------------------------------------------------------*/
export function getCommonParameters() {
  return {
    type: actionTypes.DATABASE___GET_COMMON_PARAMETERS,
  };
}

export function getCommonParametersSuccess(data) {
  return {
    type: actionTypes.DATABASE___GET_COMMON_PARAMETERS_SUCCESS,
    data,
  };
}

export function setCommonParameters(data) {
  return {
    type: actionTypes.DATABASE___PUT_COMMON_PARAMETERS,
    data,
  };
}

export function setCommonParameterSchedule(data) {
  return {
    type: actionTypes.DATABASE___SET_COMMON_PARAMETERS_SCHEDULE,
    data,
  };
}

/* Product Type List Actions --------------------------------------------------------------------------------*/
/**
 * 取得product Type list
 */
export function getProductTypeList() {
  return {
    type: actionTypes.DATABASE___GET_PRODUCT_TYPE_LIST,
  };
}

export function getProductTypeListSuccess(response) {
  return {
    type: actionTypes.DATABASE___GET_PRODUCT_TYPE_LIST_SUCCESS,
    productTypeList: response.data.productTypeList
  };
}

/**
 * 修改product list item
 * @param {*} data 只回傳更改過的array
 */
export function putProductTypeList(data) {
  return {
    type: actionTypes.DATABASE___PUT_PRODUCT_TYPE_LIST,
    data
  };
}

export function putProductTypeListSuccess() {
  return {
    type: actionTypes.DATABASE___PUT_PRODUCT_TYPE_LIST_SUCCESS,
  };
}


/**
 * 新增 product type
 * @param {*} data 回傳要新增的object
 */
export function postProductTypeList(data) {
  return {
    type: actionTypes.DATABASE___POST_PRODUCT_TYPE_LIST,
    data
  };
}

export function postProductTypeListSuccess() {
  return {
    type: actionTypes.DATABASE___POST_PRODUCT_TYPE_LIST_SUCCESS,
  };
}


/**
 * 新增 product type
 * @param {*} data 回傳要新增的object
 */
export function setProductTypeAddModal(addModalOpen) {
  return {
    type: actionTypes.DATABASE___SET_PRODUCT_TYPE_LIST_ADD_MODAL_OPEN,
    addModalOpen
  };
}

/* Site Actions ---------------------------------------------------------------------------------------------*/
export function getSiteList() {
  return {
    type: actionTypes.DATABASE___GET_SITE_LIST,
  };
}

export function getSiteListSuccess(response) {
  return {
    type: actionTypes.DATABASE___GET_SITE_LIST_SUCCESS,
    siteList: response.data.siteList
  };
}

export function updateSiteList(data) {
  return {
    type: actionTypes.DATABASE___UPDATE_SITE_LIST,
    data
  };
}

export function updateSiteListSuccess(response) {
  return {
    type: actionTypes.DATABASE___UPDATE_SITE_LIST_SUCCESS,
  };
}

export function createSite(data) {
  return {
    type: actionTypes.DATABASE___CREATE_SITE,
    data
  };
}

export function createSiteSuccess(response) {
  return {
    type: actionTypes.DATABASE___CREATE_SITE_SUCCESS,
  };
}

export function toggleImportModal(status) {
  return {
    type: actionTypes.DATABASE___TOGGLE_IMPORT_MODAL,
    status
  };
}

export function updateStep(status) {
  return {
    type: actionTypes.DATABASE___UPDATE_STEP,
    status
  };
}

export function updateImportFile(file) {
  return {
    type: actionTypes.DATABASE___UPDATE_IMPORT_FILE,
    file
  };
}

export function resetModal() {
  return {
    type: actionTypes.DATABASE___RESET_MODAL,
  };
}


export function uploadFile(file) {
  return {
    type: actionTypes.DATABASE___UPLOAD_FILE,
    file,
  };
}

export function uploadFileSuccess(response) {
  // console.log('Action upload file success', response);
  return {
    type: actionTypes.DATABASE___UPLOAD_FILE_SUCCESS,
    res: response.data
  };
}

export function uploadFileFailed(response) {
  console.log('Action upload file failed >>>', response);
  return {
    type: actionTypes.DATABASE___UPLOAD_FILE_FAILED,
  };
}

export default {};
