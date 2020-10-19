// import intl from 'react-intl-universal';
import FileSaver from 'file-saver';

export const actionTypes = {
  /* ************ Inspecton ****************** */
  // GET spec group
  XRAY___GET_SPEC_GROUP_LIST: 'XRAY___GET_SPEC_GROUP_LIST',
  XRAY___GET_SPEC_GROUP_LIST_SUCCESS: 'XRAY___GET_SPEC_GROUP_LIST_SUCCESS',
  XRAY___GET_SPEC_GROUP_LIST_FAILED: 'XRAY___GET_SPEC_GROUP_LIST_FAILED',
  // GET sourcer list
  XRAY___GET_SOURCER_LIST: 'XRAY___GET_SOURCER_LIST',
  XRAY___GET_SOURCER_LIST_SUCCESS: 'XRAY___GET_SOURCER_LIST_SUCCESS',
  XRAY___GET_SOURCER_LIST_FAILED: 'XRAY___GET_SOURCER_LIST_FAILED',
  // POST add spec group
  XRAY___POST_ADD_SPEC_GROUP: 'XRAY___POST_ADD_SPEC_GROUP',
  XRAY___POST_ADD_SPEC_GROUP_SUCCESS: 'XRAY___POST_ADD_SPEC_GROUP_SUCCESS',
  XRAY___POST_ADD_SPEC_GROUP_FAILED: 'XRAY___POST_ADD_SPEC_GROUP_FAILED',
  // Delete specGroup
  XRAY___DELETE_SPEC_GROUP: 'XRAY___DELETE_SPEC_GROUP',
  XRAY___DELETE_SPEC_GROUP_SUCCESS: 'XRAY___DELETE_SPEC_GROUP_SUCCESS',
  XRAY___DELETE_SPEC_GROUP_FAILED: 'XRAY___DELETE_SPEC_GROUP_FAILED',
  // PUT specGroup
  XRAY___PUT_SPEC_GROUP: 'XRAY___PUT_SPEC_GROUP',
  XRAY___PUT_SPEC_GROUP_SUCCESS: 'XRAY___PUT_SPEC_GROUP_SUCCESS',
  XRAY___PUT_SPEC_GROUP_FAILED: 'XRAY___PUT_SPEC_GROUP_FAILED',
  // POST SPA analysis
  XRAY___POST_SPA_ANALYSIS: 'XRAY___POST_SPA_ANALYSIS',
  XRAY___POST_SPA_ANALYSIS_SUCCESS: 'XRAY___POST_SPA_ANALYSIS_SUCCESS',
  XRAY___POST_SPA_ANALYSIS_FAILED: 'XRAY___POST_SPA_ANALYSIS_FAILED',
  // POST SPA analysis
  XRAY___POST_SPA_EXPORT: 'XRAY___POST_SPA_EXPORT',
  XRAY___POST_SPA_EXPORT_SUCCESS: 'XRAY___POST_SPA_EXPORT_SUCCESS',
  XRAY___POST_SPA_EXPORT_FAILED: 'XRAY___POST_SPA_EXPORT_FAILED',
  // Init Xray
  XRAY___INIT_XRAY: 'XRAY___INIT_XRAY',
  XRAY___INIT_XRAY_SUCCESS: 'XRAY___INIT_XRAY_SUCCESS',
  XRAY___INIT_XRAY_FAILED: 'XRAY___INIT_XRAY_FAILED',
  // Init ME Xray
  XRAY___INIT_ME_XRAY: 'XRAY___INIT_ME_XRAY',
  XRAY___INIT_ME_XRAY_SUCCESS: 'XRAY___INIT_ME_XRAY_SUCCESS',
  XRAY___INIT_ME_XRAY_FAILED: 'XRAY___INIT_ME_XRAY_FAILED',
  // set Edit
  XRAY___SET_EDIT: 'XRAY___SET_EDIT',
  // XRAY___SET_DOTINFO
  XRAY___RESET_ANALYSIS: 'XRAY___RESET_ANALYSIS',
  //
  XRAY___SET_SPA_FILTER: 'XRAY___SET_SPA_FILTER',
  //
  XRAY___GET_PRODUCTTYPE_LIST: 'XRAY___GET_PRODUCTTYPE_LIST',
  XRAY___GET_PRODUCTTYPE_LIST_SUCCESS: 'XRAY___GET_PRODUCTTYPE_LIST_SUCCESS',
  XRAY___GET_PRODUCTTYPE_LIST_FAILED: 'XRAY___GET_PRODUCTTYPE_LIST_FAILED',
  //
  XRAY___GET_TYPE1_LIST: 'XRAY___GET_TYPE1_LIST',
  XRAY___GET_TYPE1_LIST_SUCCESS: 'XRAY___GET_TYPE1_LIST_SUCCESS',
  XRAY___GET_TYPE1_LIST_FAILED: 'XRAY___GET_TYPE1_LIST_FAILED',
  //
  XRAY___GET_TYPE2_LIST: 'XRAY___GET_TYPE2_LIST',
  XRAY___GET_TYPE2_LIST_SUCCESS: 'XRAY___GET_TYPE2_LIST_SUCCESS',
  XRAY___GET_TYPE2_LIST_FAILED: 'XRAY___GET_TYPE2_LIST_FAILED',
  //
  XRAY___SET_ROLETYPE: 'XRAY___SET_ROLETYPE',
  //
  XRAY___SET_SPECITEM: 'XRAY___SET_SPECITEM',
  XRAY___RESET_SPECITEM: 'XRAY___RESET_SPECITEM',
  // GET spec items list
  XRAY___GET_SPEC_ITEMS_LIST: 'XRAY___GET_SPEC_ITEMS_LIST',
  XRAY___GET_SPEC_ITEMS_LIST_SUCCESS: 'XRAY___GET_SPEC_ITEMS_LIST_SUCCESS',
  XRAY___GET_SPEC_ITEMS_LIST_FAILED: 'XRAY___GET_SPEC_ITEMS_LIST_FAILED',

  XRAY___GET_ME_SPEC_ITEMS_LIST: 'XRAY___GET_ME_SPEC_ITEMS_LIST',
  XRAY___GET_ME_SPEC_ITEMS_LIST_SUCCESS: 'XRAY___GET_ME_SPEC_ITEMS_LIST_SUCCESS',
  XRAY___GET_ME_SPEC_ITEMS_LIST_FAILED: 'XRAY___GET_ME_SPEC_ITEMS_LIST_FAILED',
  //
  XRAY___SET_SELECTED: 'XRAY___SET_SELECTED',

  XRAY___SET_FAKE_SPA: 'XRAY___SET_FAKE_SPA',
  XRAY___SET_SEARCHBY: 'XRAY___SET_SEARCHBY',


  XRAY___GET_GROUPITEM: 'XRAY___GET_GROUPITEM',
  XRAY___GET_GROUPITEM_SUCCESS: 'XRAY___GET_GROUPITEM_SUCCESS',
  XRAY___GET_GROUPITEM_FAILED: 'XRAY___GET_GROUPITEM_FAILED',

  XRAY___GET_SPECITEM_BY_PARTNUMBER: 'XRAY___GET_SPECITEM_BY_PARTNUMBER',
  XRAY___GET_SPECITEM_BY_PARTNUMBER_SUCCESS: 'XRAY___GET_SPECITEM_BY_PARTNUMBER_SUCCESS',
  XRAY___GET_SPECITEM_BY_PARTNUMBER_FAILED: 'XRAY___GET_SPECITEM_BY_PARTNUMBER_FAILED',

  XRAY___SET_REFERENCEPN: 'XRAY___SET_REFERENCEPN',
  XRAY___RESET_SPA: 'XRAY___RESET_SPA',
  XRAY___SET_XRAY_ANALYSIS_FORM: 'XRAY___SET_XRAY_ANALYSIS_FORM',
};

export function resetSpa() {
  return {
    type: actionTypes.XRAY___RESET_SPA,
  };
}


export function setReferencePN(referencePN) {
  return {
    type: actionTypes.XRAY___SET_REFERENCEPN,
    referencePN
  };
}

export function setSearchBy(searchBy) {
  return {
    type: actionTypes.XRAY___SET_SEARCHBY,
    searchBy
  };
}

export function getSpecItemByPartNumber(roleType, data) {
  return {
    type: actionTypes.XRAY___GET_SPECITEM_BY_PARTNUMBER,
    roleType,
    data
  };
}

export function getSpecItemByPartNumberSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_SPECITEM_BY_PARTNUMBER_SUCCESS,
    specData: response.data,
  };
}

export function getSpecItemByPartNumberFailed() {
  return {
    type: actionTypes.XRAY___GET_SPECITEM_BY_PARTNUMBER_FAILED,
  };
}


export function getGroupItem(roleType, specGroupID) {
  return {
    type: actionTypes.XRAY___GET_GROUPITEM,
    roleType,
    specGroupID
  };
}
export function getGroupItemSuccess(response) {
  const { specItem, specTitle, ceSpecGroup = [] } = response.data;

  return {
    type: actionTypes.XRAY___GET_GROUPITEM_SUCCESS,
    specItem: response.data,
    ceSpecGroup
  };
}
export function getGroupItemFailed(error) {
  return {
    type: actionTypes.XRAY___GET_GROUPITEM_FAILED,
  };
}

// set SpecItem
export function resetSpecItem() {
  return {
    type: actionTypes.XRAY___RESET_SPECITEM,
  };
}
// set SpecItem
export function setSpecItem(specItem, specN) {
  return {
    type: actionTypes.XRAY___SET_SPECITEM,
    specItem,
    specN
  };
}

// INIT Xray
export function initXray(roleType) {
  return {
    type: actionTypes.XRAY___INIT_XRAY,
    roleType
  };
}

export function initXraySuccess() {
  return {
    type: actionTypes.XRAY___INIT_XRAY_SUCCESS,
  };
}

export function initXrayFailed() {
  return {
    type: actionTypes.XRAY___INIT_XRAY_FAILED,
  };
}

// INIT ME Xray
export function initMEXray(roleType) {
  return {
    type: actionTypes.XRAY___INIT_ME_XRAY,
    roleType
  };
}

export function initMEXraySuccess() {
  return {
    type: actionTypes.XRAY___INIT_ME_XRAY_SUCCESS,
  };
}

export function initMEXrayFailed() {
  return {
    type: actionTypes.XRAY___INIT_ME_XRAY_FAILED,
  };
}

// GET SpecGroupList
export function getSpecGroupList(roleType) {
  return {
    type: actionTypes.XRAY___GET_SPEC_GROUP_LIST,
    roleType
  };
}
export function getSpecGroupListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_SPEC_GROUP_LIST_SUCCESS,
    specGroupList: response.data.specGroupList,
  };
}
export function getSpecGroupListFailed(error) {
  return {
    type: actionTypes.XRAY___GET_SPEC_GROUP_LIST_FAILED
  };
}

// GET getProductTypeList
export function getProductTypeList(role) {
  return {
    type: actionTypes.XRAY___GET_PRODUCTTYPE_LIST,
    role
  };
}

export function getProductTypeListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_PRODUCTTYPE_LIST_SUCCESS,
    productType: response.data
  };
}
export function getProductTypeListFailed() {
  return {
    type: actionTypes.XRAY___GET_PRODUCTTYPE_LIST_FAILED
  };
}

// GET getType1List
export function getType1List(role, productType) {
  return {
    type: actionTypes.XRAY___GET_TYPE1_LIST,
    role,
    productType
  };
}

export function getType1ListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_TYPE1_LIST_SUCCESS,
    type1List: response.data
  };
}
export function getType1ListFailed() {
  return {
    type: actionTypes.XRAY___GET_TYPE1_LIST_FAILED
  };
}

// GET getType2List
export function getType2List(role, productType, type1) {
  return {
    type: actionTypes.XRAY___GET_TYPE2_LIST,
    role,
    productType,
    type1
  };
}

export function getType2ListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_TYPE2_LIST_SUCCESS,
    type2List: response.data
  };
}
export function getType2ListFailed() {
  return {
    type: actionTypes.XRAY___GET_TYPE2_LIST_FAILED
  };
}

// GET sourcerlist
export function getSourcerList(role, productType, type1, type2) {
  return {
    type: actionTypes.XRAY___GET_SOURCER_LIST,
    role,
    productType,
    type1,
    type2
  };
}

export function getSourcerListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_SOURCER_LIST_SUCCESS,
    sourcerList: response.data.sourcerList
  };
}

export function getSourcerListFailed(payload) {
  return {
    type: actionTypes.XRAY___GET_SOURCER_LIST_FAILED,
    payload
  };
}
export function setRoleType(roleType) {
  return {
    type: actionTypes.XRAY___SET_ROLETYPE,
    roleType
  };
}


// GET SpecItemsList
export function getSpecItemsList(data) {
  return {
    type: actionTypes.XRAY___GET_SPEC_ITEMS_LIST,
    data,
  };
}

export function getSpecItemsListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_SPEC_ITEMS_LIST_SUCCESS,
    specItemsList: response.data.spec,
    specTitle: response.data.specTitle,
    ceSpecGroup: response.data.ceSpecGroup,
  };
}

export function getSpecItemsListFailed(payload) {
  return {
    type: actionTypes.XRAY___GET_SPEC_ITEMS_LIST_FAILED,
  };
}

// GET ME SpecItemsList
export function getMeSpecItemsList(specN) {
  return {
    type: actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST,
    specN,
  };
}

export function getMeSpecItemsListSuccess(response) {
  return {
    type: actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST_SUCCESS,
    specItemsList: response.data,
  };
}

export function getMeSpecItemsListFailed() {
  return {
    type: actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST_FAILED,
  };
}

export function setSelected(selected) {
  return {
    type: actionTypes.XRAY___SET_SELECTED,
    selected
  };
}

// PUT edit specgroup
export function putSpecGroup(id, data) {
  return {
    type: actionTypes.XRAY___PUT_SPEC_GROUP,
    id,
    data,
  };
}

export function putSpecGroupSuccess(response) {
  return {
    type: actionTypes.XRAY___PUT_SPEC_GROUP_SUCCESS,
    specGroupID: response.data.specGroupID,
  };
}

export function putSpecGroupFailed(payload) {
  return {
    type: actionTypes.XRAY___PUT_SPEC_GROUP_FAILED,
    payload,
  };
}


// DELETE specgroup
export function deleteSpecGroup(id) {
  return {
    type: actionTypes.XRAY___DELETE_SPEC_GROUP,
    id,
  };
}

export function deleteSpecGroupSuccess(response) {
  return {
    type: actionTypes.XRAY___DELETE_SPEC_GROUP_SUCCESS,
    specGroupID: response.data.specGroupID,
    edit: false
  };
}

export function deleteSpecGroupFailed(payload) {
  return {
    type: actionTypes.XRAY___DELETE_SPEC_GROUP_FAILED,
    payload,
  };
}
// Add specgroup
export function postAddSpecGroup(data) {
  return {
    type: actionTypes.XRAY___POST_ADD_SPEC_GROUP,
    data,
  };
}

export function postAddSpecGroupSuccess(response) {
  return {
    type: actionTypes.XRAY___POST_ADD_SPEC_GROUP_SUCCESS,
    specGroupID: response.data.specGroupID,
  };
}

export function postAddSpecGroupFailed(payload) {
  return {
    type: actionTypes.XRAY___POST_ADD_SPEC_GROUP_FAILED,
    payload
  };
}
// POST SPA analysis
export function postSpaAnalysis(data) {
  return {
    type: actionTypes.XRAY___POST_SPA_ANALYSIS,
    data,
  };
}
// SET SPA FILTER
export function setSpaFilter(filter) {
  return {
    type: actionTypes.XRAY___SET_SPA_FILTER,
    filter
  };
}
//
export function postSpaAnalysisSuccess(response) {
  return {
    type: actionTypes.XRAY___POST_SPA_ANALYSIS_SUCCESS,
    spaData: response.data,
  };
}

export function postSpaAnalysisFailed(payload) {
  return {
    type: actionTypes.XRAY___POST_SPA_ANALYSIS_FAILED,
    payload
  };
}

// POST SPA EXPORT EXCEL
export function postSpaExport(data) {
  return {
    type: actionTypes.XRAY___POST_SPA_EXPORT,
    data,
  };
}

// POST SPA EXPORT EXCEL SUCCESS
export function postSpaExportSuccess(response) {
  const headers = response.headers['content-disposition'];
  const filename = headers.slice(headers.indexOf('"') + 1, headers.lastIndexOf('"'));
  FileSaver.saveAs(
    new Blob([response.data],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    filename
  );
  return {
    type: actionTypes.XRAY___POST_SPA_EXPORT_SUCCESS,
  };
}

// POST SPA EXPORT EXCEL FAILED

export function postSpaExportFailed(payload) {
  return {
    type: actionTypes.XRAY___POST_SPA_EXPORT_FAILED,
    payload
  };
}

// SET EDIT MODE
export function setEdit(edit) {
  return {
    type: actionTypes.XRAY___SET_EDIT,
    edit
  };
}

// SET Analysis API Form
export function setAnalysisForm(analysisForm) {
  console.log('analysisForm >>>>>>', analysisForm);
  return {
    type: actionTypes.XRAY___SET_XRAY_ANALYSIS_FORM,
    analysisForm
  };
}
// SET reset Xray
export function resetAnalysis() {
  return {
    type: actionTypes.XRAY___RESET_ANALYSIS,
  };
}
export function setFakeSpa() {
  return {
    type: actionTypes.XRAY___SET_FAKE_SPA,
  };
}

export default {};
