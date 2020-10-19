import FileSaver from 'file-saver';

export const actionTypes = {

  PCB_CALCULATOR___SWITCH_SEARCH_METHOD: 'PCB_CALCULATOR___SWITCH_SEARCH_METHOD',
  PCB_CALCULATOR___UPDATE_WISTRON_PN_VALUE: 'PCB_CALCULATOR___UPDATE_WISTRON_PN_VALUE',
  PCB_CALCULATOR___SET_IS_VIEW_MODE: 'PCB_CALCULATOR___SET_IS_VIEW_MODE',
  PCB_CALCULATOR___KEEP_ORIGINAL_FORM_DATA: 'PCB_CALCULATOR___KEEP_ORIGINAL_FORM_DATA',
  PCB_CALCULATOR___RESET_DATA_SOURCE: 'PCB_CALCULATOR___RESET_DATA_SOURCE',

  PCB_CALCULATOR___GET_FORM_LAYOUT: 'PCB_CALCULATOR___GET_FORM_LAYOUT',
  PCB_CALCULATOR___GET_FORM_LAYOUT_SUCCESS: 'PCB_CALCULATOR___GET_FORM_LAYOUT_SUCCESS',
  PCB_CALCULATOR___RESET_FORM_LAYOUT: 'PCB_CALCULATOR___RESET_FORM_LAYOUT',

  PCB_CALCULATOR___GET_PCB_SPEC: 'PCB_CALCULATOR___GET_PCB_SPEC',
  PCB_CALCULATOR___GET_PCB_SPEC_SUCCESS: 'PCB_CALCULATOR___GET_PCB_SPEC_SUCCESS',

  PCB_CALCULATOR___CALCULATE_PCB: 'PCB_CALCULATOR___CALCULATE_PCB',
  PCB_CALCULATOR___CALCULATE_PCB_SUCCESS: 'PCB_CALCULATOR___CALCULATE_PCB_SUCCESS',

  PCB_CALCULATOR___RE_CALCULATE_PCB: 'PCB_CALCULATOR___RE_CALCULATE_PCB',
  PCB_CALCULATOR___RE_CALCULATE_PCB_SUCCESS: 'PCB_CALCULATOR___RE_CALCULATE_PCB_SUCCESS',

  PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB: 'PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB',
  PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB_SUCCESS: 'PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB_SUCCESS',

  PCB_CALCULATOR___EXPORT_PCB: 'PCB_CALCULATOR___EXPORT_PCB',
  PCB_CALCULATOR___EXPORT_PCB_SUCCESS: 'PCB_CALCULATOR___EXPORT_PCB_SUCCESS',
};

export function switchSearchMethod(method) {
  return {
    type: actionTypes.PCB_CALCULATOR___SWITCH_SEARCH_METHOD,
    method
  };
}

export function updateWistronPnValue(val) {
  return {
    type: actionTypes.PCB_CALCULATOR___UPDATE_WISTRON_PN_VALUE,
    val
  };
}

export function setIsViewMode(status) {
  return {
    type: actionTypes.PCB_CALCULATOR___SET_IS_VIEW_MODE,
    status
  };
}

export function getFormLayout(layoutName) {
  return {
    type: actionTypes.PCB_CALCULATOR___GET_FORM_LAYOUT,
    layoutName
  };
}

export function getFormLayoutSuccess(response) {
  return {
    type: actionTypes.PCB_CALCULATOR___GET_FORM_LAYOUT_SUCCESS,
    pcbLayout: response.data
  };
}

export function resetFormLayout() {
  return {
    type: actionTypes.PCB_CALCULATOR___RESET_FORM_LAYOUT,
  };
}

export function getPcbSpec(params) {
  return {
    type: actionTypes.PCB_CALCULATOR___GET_PCB_SPEC,
    params
  };
}

export function getPcbSpecSuccess(response) {
  return {
    type: actionTypes.PCB_CALCULATOR___GET_PCB_SPEC_SUCCESS,
    spec: response.data.spec
  };
}

export function calculatePcb(data) {
  return {
    type: actionTypes.PCB_CALCULATOR___CALCULATE_PCB,
    data
  };
}

export function calculatePcbSuccess(response) {
  return {
    type: actionTypes.PCB_CALCULATOR___CALCULATE_PCB_SUCCESS,
    list: response.data
  };
}

export function reCalculatePcb(data) {
  return {
    type: actionTypes.PCB_CALCULATOR___RE_CALCULATE_PCB,
    data
  };
}

export function reCalculatePcbSuccess(response) {
  return {
    type: actionTypes.PCB_CALCULATOR___RE_CALCULATE_PCB_SUCCESS,
    list: response.data
  };
}

export function calculateWistronPnPcb(data) {
  return {
    type: actionTypes.PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB,
    data
  };
}

export function calculateWistronPnPcbSuccess(response) {
  return {
    type: actionTypes.PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB_SUCCESS,
    list: response.data
  };
}

export function keepOriginalFormData(formData) {
  return {
    type: actionTypes.PCB_CALCULATOR___KEEP_ORIGINAL_FORM_DATA,
    formData
  };
}

export function resetDataSource() {
  return {
    type: actionTypes.PCB_CALCULATOR___RESET_DATA_SOURCE,
  };
}

export function exportPcb(infoList) {
  return {
    type: actionTypes.PCB_CALCULATOR___EXPORT_PCB,
    infoList
  };
}

export function exportPcbSuccess(response) {
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_PCB_Calculator.xlsx';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );
  return {
    type: actionTypes.PCB_CALCULATOR___EXPORT_PCB_SUCCESS,
  };
}

