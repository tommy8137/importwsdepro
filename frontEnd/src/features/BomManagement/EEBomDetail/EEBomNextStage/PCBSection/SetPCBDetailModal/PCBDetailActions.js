export const actionTypes = {
  EEBOM___GET_PCB_LIST: 'EEBOM___GET_PCB_LIST',
  EEBOM___GET_PCB_LIST_SUCCESS: 'EEBOM___GET_PCB_LIST_SUCCESS',
  EEBOM___GET_PCB_LIST_FAILED: 'EEBOM___GET_PCB_LIST_FAILED',

  EEBOM___DELETE_PCB_ITEM: 'EEBOM___DELETE_PCB_ITEM',
  EEBOM___DELETE_PCB_ITEM_SUCCESS: 'EEBOM___DELETE_PCB_ITEM_SUCCESS',
  EEBOM___DELETE_PCB_ITEM_FAILED: 'EEBOM___DELETE_PCB_ITEM_FAILED',

  EEBOM___CREATE_PCB_ITEM: 'EEBOM___CREATE_PCB_ITEM',
  EEBOM___UPDATE_PCB_ITEM: 'EEBOM___UPDATE_PCB_ITEM',

  EEBOM___GET_PCB_LAYOUT: 'EEBOM___GET_PCB_LAYOUT',
  EEBOM___GET_PCB_LAYOUT_SUCCESS: 'EEBOM___GET_PCB_LAYOUT_SUCCESS',
  EEBOM___GET_PCB_LAYOUT_FAILEDL: 'EEBOM___GET_PCB_LAYOUT_FAILEDL',
  EEBOM___RESET_PCB_LAYOUT: 'EEBOM___RESET_PCB_LAYOUT',

  EEBOM___GET_SPEC_BY_PN: 'EEBOM___GET_SPEC_BY_PN',
  EEBOM___GET_SPEC_BY_PN_SUCCESS: 'EEBOM___GET_SPEC_BY_PN_SUCCESS',

  EEBOM___SET_PCB_MODAL_PATH: 'EEBOM___SET_PCB_MODAL_PATH',
  EEBOM___SET_PCB_ITEM: 'EEBOM___SET_PCB_ITEM',
  EEBOM___SET_DEL_INFO: 'EEBOM___SET_DEL_INFO',
};

export function setPCBItem(pcbItem) {
  return {
    type: actionTypes.EEBOM___SET_PCB_ITEM,
    pcbItem
  };
}

export function getSpecByPn(wistronpn) {
  return {
    type: actionTypes.EEBOM___GET_SPEC_BY_PN,
    wistronpn
  };
}

export function getSpecByPnSuccess(response) {
  return {
    type: actionTypes.EEBOM___GET_SPEC_BY_PN_SUCCESS,
    spec: response.data.spec
  };
}

export function setPcbModalPath(info) {
  return {
    type: actionTypes.EEBOM___SET_PCB_MODAL_PATH,
    info
  };
}

export function createPCBItem(data) {
  return {
    type: actionTypes.EEBOM___CREATE_PCB_ITEM,
    data,
  };
}

export function updatePCBItem(data) {
  return {
    type: actionTypes.EEBOM___UPDATE_PCB_ITEM,
    data,
  };
}


export function getPCBList(edmVersionID) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LIST,
    edmVersionID
  };
}

export function getPCBListSuccess(response, edmVersionID) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LIST_SUCCESS,
    list: response.data.list,
    plant: response.data.plant,
    edmVersionID
  };
}

export function getPCBListFailed(error) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LIST_FAILED,
  };
}

export function deletePCBItem(idList) {
  return {
    type: actionTypes.EEBOM___DELETE_PCB_ITEM,
    idList,
  };
}

export function deletePCBItemSuccess(response) {
  return {
    type: actionTypes.EEBOM___DELETE_PCB_ITEM_SUCCESS,
  };
}

export function deletePCBItemFailed(error) {
  return {
    type: actionTypes.EEBOM___DELETE_PCB_ITEM_FAILED,
  };
}

export function getPcbLayout(layoutName) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LAYOUT,
    layoutName
  };
}

export function getPcbLayoutSuccess(response) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LAYOUT_SUCCESS,
    pcbLayout: response.data
  };
}

export function getPcbLayoutFailed(response) {
  return {
    type: actionTypes.EEBOM___GET_PCB_LAYOUT_FAILEDL,
  };
}

export function resetPcbLayout() {
  return {
    type: actionTypes.EEBOM___RESET_PCB_LAYOUT,
  };
}

export function setDelInfo(board, list) {
  return {
    type: actionTypes.EEBOM___SET_DEL_INFO,
    board,
    list
  };
}

export default {};
