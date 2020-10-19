import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import _ from 'lodash';
import { actionTypes } from './PartlistActions';

const initialState = {
  partlistName: '',
  isPartItemOpen: false,
  partItemInfo: {
    productTypeName: '',
    productTypeId: '',
    bom_id: '',
    type1: '',
    type2: '',
  },
  bomDetail: {},
  partItemValues: {},
  partItemPrice: {},
  partItemLayout: {},
};

export default handleActions({
  [actionTypes.PARTLIST___TOGGLE_PART_ITEM]: (state, payload) => {
    return {
      ...state,
      isPartItemOpen: payload.status,
    };
  },

  [actionTypes.PARTLIST___UPDATE_PART_ITEM_INFO]: (state, payload) => {
    const { id, type1, type2 } = payload;
    return {
      ...state,
      partItemInfo: {
        bom_id: id,
        type1,
        type2,
      },
    };
  },
  [actionTypes.PARTLIST___GET_PART_ITEM_DETAIL_SUCCESS]: (state, payload) => {
    const { res } = payload;
    return {
      ...state,
      partItemValues: res,
    };
  },
  [actionTypes.PARTLIST___GET_PART_ITEM_PRICE_SUCCESS]: (state, payload) => {
    const { res } = payload;
    return {
      ...state,
      partItemPrice: res,
    };
  },
  [actionTypes.PARTLIST___UPDATE_PART_ITEM_DETAIL_SUCCESS]: (state, payload) => {
    const { unEditCount } = payload;
    return {
      ...state,
      bomData: {
        ...state.bomData,
        unEditCount
      },
    };
  },
  [actionTypes.PARTLIST___UPDATE_PART_ITEM_INFO]: (state, payload) => {
    const { id, type1, type2 } = payload;
    return {
      ...state,
      partItemInfo: {
        bom_id: id,
        type1,
        type2,
      },
    };
  },
  [actionTypes.PARTLIST___GET_PART_ITEM_DATA]: (state, payload) => {
    const { partlistName, bomId, type1, type2, productTypeName, productTypeId } = payload;
    return {
      ...state,
      partlistName,
      partItemInfo: {
        bom_id: bomId,
        type1,
        type2,
        productTypeName,
        productTypeId,
      },
    };
  },
  [actionTypes.PARTLIST___GET_PART_ITEM_DATA_SUCCESS]: (state, payload) => {
    const { bomItemData } = payload;
    return {
      ...state,
      isPartItemOpen: true,
      partItemInfo: {
        ...state.partItemInfo,
        ...bomItemData,
      },
    };
  },
  [actionTypes.PARTLIST___PARTLIST___GET_PART_ITEM_LAYOUT_SUCCESS]: (state, payload) => {
    const { res } = payload;
    return {
      ...state,
      partItemLayout: res
    };
  },
}, initialState);
