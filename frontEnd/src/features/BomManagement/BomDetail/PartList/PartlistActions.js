
export const actionTypes = {
  PARTLIST___TOGGLE_PART_ITEM: 'PARTLIST___TOGGLE_PART_ITEM',
  PARTLIST___GET_PART_ITEM_DETAIL_SUCCESS: 'PARTLIST___GET_PART_ITEM_DETAIL_SUCCESS',
  PARTLIST___GET_PART_ITEM_DETAIL_FAILED: 'PARTLIST___GET_PART_ITEM_DETAIL_FAILED',

  PARTLIST___GET_PART_ITEM_PRICE_SUCCESS: 'PARTLIST___GET_PART_ITEM_PRICE_SUCCESS',

  PARTLIST___UPDATE_PART_ITEM_DETAIL: 'PARTLIST___UPDATE_PART_ITEM_DETAIL',
  PARTLIST___UPDATE_PART_ITEM_DETAIL_SUCCESS: 'PARTLIST___UPDATE_PART_ITEM_DETAIL_SUCCESS',
  PARTLIST___UPDATE_PART_ITEM_DETAIL_FAILED: 'PARTLIST___UPDATE_PART_ITEM_DETAIL_FAILED',

  PARTLIST___GET_PART_ITEM_DATA: 'PARTLIST___GET_PART_ITEM_DATA',
  PARTLIST___GET_PART_ITEM_DATA_SUCCESS: 'PARTLIST___GET_PART_ITEM_DATA_SUCCESS',
  PARTLIST___GET_PART_ITEM_DATA_FAILED: 'PARTLIST___GET_PART_ITEM_DATA_FAILED',

  PARTLIST___GET_PART_ITEM_LAYOUT: 'PARTLIST___GET_PART_ITEM_LAYOUT',
  PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_SUCCESS: 'PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_SUCCESS',
  PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_FAILED: 'PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_FAILED',

};


// part list

export function togglePartItem(status) {
  return {
    type: actionTypes.PARTLIST___TOGGLE_PART_ITEM,
    status
  };
}

export function updatePartItemDetail(bomId, partlistName, initialValues) {
  return {
    type: actionTypes.PARTLIST___UPDATE_PART_ITEM_DETAIL,
    bomId,
    partlistName,
    initialValues
  };
}

export function updatePartItemDetailSuccess(response) {
  return {
    type: actionTypes.PARTLIST___UPDATE_PART_ITEM_DETAIL_SUCCESS,
    unEditCount: response.data.unEditCount
  };
}

export function updatePartItemDetailFailed(response) {
  console.log('Action update Part Item Detail failed >>>', response);
  return {
    type: actionTypes.PARTLIST___UPDATE_PART_ITEM_DETAIL_FAILED,
  };
}
export function getPartItemDetailSuccess(response) {
  // console.log('Action get Part Item Detail success', response);
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_DETAIL_SUCCESS,
    res: response.data
  };
}

export function getPartItemPriceSuccess(response) {
  // console.log('Action get Part Item Detail success', response);
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_PRICE_SUCCESS,
    res: response.data
  };
}

export function getPartItemDetailFailed(response) {
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_DETAIL_FAILED,
  };
}

export function getPartItemData(data) {
  const { partlistName, bomId, type1, type2, productTypeName, productTypeId } = data;
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_DATA,
    partlistName,
    bomId,
    type1,
    type2,
    productTypeName,
    productTypeId,
  };
}

export function getPartItemDataSuccess(bomItemData) {
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_DATA_SUCCESS,
    bomItemData,
  };
}

export function getPartItemLayout(partlistName) {
  return {
    type: actionTypes.PARTLIST___GET_PART_ITEM_LAYOUT,
    partlistName
  };
}

export function getPartItemLayoutSuccess(response) {
  return {
    type: actionTypes.PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_SUCCESS,
    res: response.data
  };
}

export function getPartItemLayoutFailed(error) {
  return {
    type: actionTypes.PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_FAILED,
  };
}
export default {};
