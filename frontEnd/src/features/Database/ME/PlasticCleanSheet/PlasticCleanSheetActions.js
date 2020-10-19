export const actionTypes = {
  /* Plastic Parameters -------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS: 'PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS',
  PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_PLASTIC_PARAMETERS: 'PLASTIC_CLEAN_SHEET___PUT_PLASTIC_PARAMETERS',

  /* Material LossRate --------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE: 'PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE',
  PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_MATERIAL_LOSS_RATE: 'PLASTIC_CLEAN_SHEET___PUT_MATERIAL_LOSS_RATE',

  /* Machine Module -----------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST: 'PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST',
  PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST_SUCCESS',

  PLASTIC_CLEAN_SHEET___UPDATE_MACHINE_MODULE_LIST: 'PLASTIC_CLEAN_SHEET___UPDATE_MACHINE_MODULE_LIST',
  PLASTIC_CLEAN_SHEET___SET_IS_UPDATE_SUCCESSED: 'PLASTIC_CLEAN_SHEET___SET_IS_UPDATE_SUCCESSED',

  /* Machine Tonnage Price ----------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE: 'PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE',
  PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_MACHINE_TONNAGE_PRICE: 'PLASTIC_CLEAN_SHEET___PUT_MACHINE_TONNAGE_PRICE',

  /* Labor Unit Price And WorkSheet -------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST: 'PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST',
  PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST: 'PLASTIC_CLEAN_SHEET___UPDATE_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST',

  /* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_PAINT_MACHINE_PRICE: 'PLASTIC_CLEAN_SHEET___UPDATE_PAINT_MACHINE_PRICE',

  /* Paint Man Power Price-----------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_PAINT_MAN_POWER_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___PUT_PAINT_MAN_POWER_PRICE_LIST',

  PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___SET_PAINT_MAN_POWER_SELECTED_PRODUCT_TYPE: 'PLASTIC_CLEAN_SHEET___SET_PAINT_MAN_POWER_SELECTED_PRODUCT_TYPE',

  /* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST_SUCCESS',

  /* Paint Type Price ----------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS',
  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_SELECTED_PAINT_TYPE: 'PLASTIC_CLEAN_SHEET___UPDATE_SELECTED_PAINT_TYPE',

  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS',

  PLASTIC_CLEAN_SHEET___UPDATE_PAINT_TYPE_PRICE: 'PLASTIC_CLEAN_SHEET___UPDATE_PAINT_TYPE_PRICE',

  /* Print Process Price -------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE: 'PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE',
  PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_PRINT_PROCESS_PRICE: 'PLASTIC_CLEAN_SHEET___UPDATE_PRINT_PROCESS_PRICE',

  /* Embedded Nail Price ------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_EMBEDDED_NAIL_PRICE: 'PLASTIC_CLEAN_SHEET___UPDATE_EMBEDDED_NAIL_PRICE',

  /* Grinding Price ------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_GRINDING_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___PUT_GRINDING_PRICE_LIST',

  /* Emi Sputtering List ------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST',
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING: 'PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING_LIST',

  /* Emi Sputtering Base List ------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST',
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST_SUCCESS',

  /* Paint Type List ------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST_SUCCESS',

  /* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST: 'PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST',
  PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_PAINT_VENDOR_LIST: 'PLASTIC_CLEAN_SHEET___UPDATE_PAINT_VENDOR_LIST',

  /* EmiSputteringPrice ------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST',
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_EMI_SPUTTERING_PRICE_LIST: 'PLASTIC_CLEAN_SHEET___PUT_EMI_SPUTTERING_PRICE_LIST',

  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST',
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST_SUCCESS',
  PLASTIC_CLEAN_SHEET___SET_EMI_SPUTTERING_PRICE_SELECTED_SITE: 'PLASTIC_CLEAN_SHEET___SET_EMI_SPUTTERING_PRICE_SELECTED_SITE',

  /* Emi Sputtering Site ------------------------------------------------------------------------------------------------------------------------------*/
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE',
  PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE_SUCCESS: 'PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE_SUCCESS',
  PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING_SITE: 'PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING_SITE',

  // 打開噴漆modal
  PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL: 'PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL',
  PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL_SUCCESS: 'PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL_SUCCESS',
  PLASTIC_CLEAN_SHEET___TOGGLE_PAINT_FORMULA_PRICE_MODAL_SUCCESS: 'PLASTIC_CLEAN_SHEET___TOGGLE_PAINT_FORMULA_PRICE_MODAL_SUCCESS',
  PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE: 'PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE',
  PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS: 'PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS',
};


/* Plastic Parameters --------------------------------------------------------------------------------*/
export function getPlasticParameters() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS,
  };
}

export function getPlasticParametersSuccess(data) {
  const { plasticParameter: list, date } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS_SUCCESS,
    date,
    list,
  };
}

export function putPlasticParameters(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_PLASTIC_PARAMETERS,
    data,
  };
}

/* Material LossRate --------------------------------------------------------------------------------*/
export function getMaterialLossRate() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE,
  };
}

export function getMaterialLossRateSuccess(data) {
  const { materialLossRate: list, date } = data;

  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE_SUCCESS,
    date,
    list,
  };
}

export function putMaterialLossRate(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_MATERIAL_LOSS_RATE,
    data
  };
}

/* Machine Module -------------------------------------------------------------------------------------------------------------------------------------*/
export function getMachineModuleList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST,
  };
}

export function getMachineModuleListSuccess(response) {
  const { machineModule: list, category2 } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST_SUCCESS,
    machineModuleList: list,
    category2,
  };
}

export function updateMachineModuleList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_MACHINE_MODULE_LIST,
    data
  };
}

export function setIsUpdateSuccessed(status) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___SET_IS_UPDATE_SUCCESSED,
    status
  };
}

/* Machine Tonnage Price --------------------------------------------------------------------------------*/
export function getMachineTonnagePrice() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE,
  };
}

export function getMachineTonnagePriceSuccess(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE_SUCCESS,
    ...data,
  };
}

export function putMachineTonnagePrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_MACHINE_TONNAGE_PRICE,
    data
  };
}

/* Labor Unit Price And WorkSheet ---------------------------------------------------------------------------------------------------------------------*/
export function getLaborUnitPriceAndWorkSheetList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST,
  };
}

export function getLaborUnitPriceAndWorkSheetListSuccess(response) {
  const { paintManPowerHourList: list, date } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST_SUCCESS,
    date,
    laborUnitPriceAndWorkSheetList: list,
  };
}

export function updateLaborUnitPriceAndWorkSheetList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST,
    data
  };
}

/* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------*/
export function getPaintMachinePriceList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST,
  };
}

export function getPaintMachinePriceListSuccess(response) {
  const { sprayPaintMachinePriceList: list, date } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST_SUCCESS,
    paintMachinePriceList: list,
    date,
  };
}

export function updatePaintMachinePrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_MACHINE_PRICE,
    data
  };
}

/* Paint Man Power Price List --------------------------------------------------------------------------------*/
export function getPaintManPowerProductTypeList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST,
  };
}

export function getPaintManPowerProductTypeListSuccess(data) {
  const {
    productTypeList
  } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST_SUCCESS,
    productTypeList
  };
}

export function getPaintManPowerPriceList(productTypeId) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST,
    productTypeId
  };
}

export function getPaintManPowerPriceListSuccess(data) {
  const {
    paintManPowerPriceList: list,
    paintManPowerHourList: hourList,
    date,
  } = data;

  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST_SUCCESS,
    date,
    list,
    hourList,
  };
}

export function putPaintManPowerPriceList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_MAN_POWER_PRICE_LIST,
    data
  };
}

export function setPaintManPowerSelectedProductType(selectedProductType) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___SET_PAINT_MAN_POWER_SELECTED_PRODUCT_TYPE,
    selectedProductType
  };
}

/* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
export function getPaintGroupList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST,
  };
}

export function getPaintGroupListSuccess(response) {
  const { paintCombinationList: list } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST_SUCCESS,
    paintGroupList: list
  };
}

/* Paint Type Price ----------------------------------------------------------------------------------------------------------------------------------------------*/
export function getPaintTypeOptions() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS,
  };
}

export function getPaintTypeOptionsSuccess(response) {
  const { paintBottomTopList: list } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS_SUCCESS,
    paintTypeOptions: list.map(item => ({ label: item.paintBottomTopName, value: item.paintBottomTopId }))
  };
}

export function updateSelectedPaintType(newOption) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_SELECTED_PAINT_TYPE,
    newOption
  };
}

export function getPaintTypePriceList(paintBottomTopId) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST,
    paintBottomTopId
  };
}

export function getPaintTypePriceListSuccess(response) {
  const { paintTypePriceList, date } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS,
    paintTypePriceList,
    date,
  };
}

export function updatePaintTypePrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_TYPE_PRICE,
    data
  };
}

export function openPaintFormulaPriceModal(data, readOnly = false) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL,
    data,
    readOnly,
  };
}


export function openPaintFormulaPriceModalSuccess(response) {
  const { data, readOnly } = response;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL_SUCCESS,
    data,
    readOnly,
  };
}


export function togglePaintFormulaPriceModal(isOpen) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___TOGGLE_PAINT_FORMULA_PRICE_MODAL_SUCCESS,
    isOpen
  };
}

export function putPaintFormulaPrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE,
    data
  };
}


export function putPaintFormulaPriceSuccess() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS,
  };
}

/* Print Process Price ---------------------------------------------------------------------------------------------------------------------*/
export function getPrintProcessPrice() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE,
  };
}

export function getPrintProcessPriceSuccess(response) {
  const { printingProcessPriceList: list, date } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE_SUCCESS,
    date,
    list,
  };
}

export function updatePrintProcessPrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PRINT_PROCESS_PRICE,
    data
  };
}

/* Embedded Nail Price ------------------------------------------------------------------------------------------------------------------------------*/
export function getEmbeddedNailPriceList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST,
  };
}

export function getEmbeddedNailPriceListSuccess(response) {
  const { embeddedPriceList: list, date } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST_SUCCESS,
    embeddedNailPriceList: list,
    date,
  };
}

export function updateEmbeddedNailPrice(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMBEDDED_NAIL_PRICE,
    data
  };
}

/* Grinding Price ------------------------------------------------------------------------------------------------------------------------------*/
export function getGrindingPriceList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST,
  };
}

export function getGrindingPriceListSuccess(data) {
  const { grindingPriceList: list, date } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST_SUCCESS,
    list,
    date,
  };
}

export function putGrindingPriceList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_GRINDING_PRICE_LIST,
    data
  };
}

/* Paint Type List ------------------------------------------------------------------------------------------------------------------------------*/
export function getPaintTypeList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST,
  };
}

export function getPaintTypeListSuccess(response) {
  const { data: { paintTypeColorList: list } } = response;
  console.log('getPaintTypeListSuccess :', list);
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST_SUCCESS,
    list,
  };
}

/* Emi Sputtering List ------------------------------------------------------------------------------------------------------------------------------*/
export function getEmiSputteringList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST,
  };
}

export function getEmiSputteringListSuccess(response) {
  const { emiSputteringList } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST_SUCCESS,
    emiSputteringList,
  };
}

export function updateEmiSputtering(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING,
    data
  };
}

/* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
export function getPaintVendorList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST,
  };
}

export function getPaintVendorListSuccess(response) {
  const { paintVendor } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST_SUCCESS,
    paintVendor,
  };
}

export function updatePaintVendorList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_VENDOR_LIST,
    data,
  };
}

/* Emi Sputtering Base List ------------------------------------------------------------------------------------------------------------------------------------------*/
export function getEmiSputteringBaseList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST,
  };
}

export function getEmiSputteringBaseListSuccess(response) {
  const { emiSputteringBaseList } = response.data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST_SUCCESS,
    emiSputteringBaseList
  };
}

/* EmiSputteringPrice ------------------------------------------------------------------------------------------------------------------------------*/
export function getEmiSputteringPriceList(siteGroupId) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST,
    siteGroupId
  };
}

export function getEmiSputteringPriceListSuccess(data) {
  const { emiSputteringPriceList: list, date } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST_SUCCESS,
    list,
    date,
  };
}

export function putEmiSputteringPriceList(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___PUT_EMI_SPUTTERING_PRICE_LIST,
    data
  };
}

export function getEmiSputteringSiteList() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST,
  };
}

export function getEmiSputteringPriceSiteListSuccess(data) {
  const { emiSiteGroupList } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST_SUCCESS,
    siteList: emiSiteGroupList
  };
}

export function setEmiSputteringPriceSeletedSite(selectedSite) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___SET_EMI_SPUTTERING_PRICE_SELECTED_SITE,
    selectedSite
  };
}


/* Emi Sputtering Site ------------------------------------------------------------------------------------------------------------------------------*/
export function getEmiSputteringSite() {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE,
  };
}

export function getEmiSputteringSiteSuccess(data) {
  const { list, dropdown, } = data;
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE_SUCCESS,
    list,
    dropdown,
  };
}

export function updateEmiSputteringSite(data) {
  return {
    type: actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING_SITE,
    data
  };
}

