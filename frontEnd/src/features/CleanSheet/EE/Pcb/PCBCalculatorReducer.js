import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import _mapKeys from 'lodash/mapKeys';
import _get from 'lodash/get';
import { actionTypes } from './PCBCalculatorActions';
import { SEARCH_METHOD } from './PCBCalculatorConst';

const initialState = {
  activeSearchMethod: SEARCH_METHOD.BY_CATERGORY,
  isViewMode: false,
  wistronpn: '',

  pcbLayout: null,
  resultList: [],
  fixedList: [{ info: {
    formula1: null,
    formula2: 0,
    formula3: null,
    formula4: null,
    formula5: null,
    formula6: null,
    other5Adder: 0,
    sapPrice: null,
    originCurrency: null,
    currency: null,
    exchangeDate: null,
    sum_adder: 0,
    typeii: null,
    supply_type: null,
    manufacturer: null,
    typei: null,
    SPEC01: null,
    SPEC02: 0,
    SPEC03: null,
    SPEC04: 0,
    SPEC05: 0,
    SPEC06: 0,
    SPEC07: 0,
    SPEC08: null,
    SPEC09: null,
    SPEC10: null,
    SPEC11: null,
    SPEC12: null,
    SPEC13: null,
    SPEC14: null,
    SPEC15: null,
    SPEC16: 0,
    SPEC17: [],
    SPEC18: [],
    SPEC19: [],
    SPEC20: [],
    SPEC21: null,
    SPEC22: 0,
    SPEC23: null,
    SPEC24: null,
    SPEC25: null,
    SPEC26: null,
    PcbStageNo: null,
    remark: null,
    wistronpn: null
  } }],
  originalSpecByPn: {
    item: null,
    typei: null,
    typeii: null,
    manufacturer: [],
    spec01: null,
    spec02: null,
    spec03: null,
    spec04: null,
    spec05: null,
    spec06: null,
    spec07: null,
    spec08: null,
    spec09: null,
    spec10: null,
    spec11: null,
    spec12: null,
    spec13: null,
    spec14: null,
    spec15: null,
    spec16: null,
    spec17: [],
    spec18: [],
    spec19: [],
    spec20: [],
    spec21: null,
    spec22: null,
    spec23: null,
    spec24: null,
    spec25: null,
    spec26: null,
    spec27: null,
    spec28: null,
    spec29: null,
    spec30: null,
    PcbStageNo: null,
    supply_type: null,
  },
  originalFormData: {},
};

export default handleActions({

  [actionTypes.PCB_CALCULATOR___SWITCH_SEARCH_METHOD]: (state, payload) => {
    const { method } = payload;
    return {
      ...state,
      activeSearchMethod: method,
    };
  },

  [actionTypes.PCB_CALCULATOR___UPDATE_WISTRON_PN_VALUE]: (state, payload) => {
    const { val } = payload;
    return {
      ...state,
      wistronpn: val,
    };
  },

  [actionTypes.PCB_CALCULATOR___SET_IS_VIEW_MODE]: (state, payload) => {
    const { status } = payload;
    return {
      ...state,
      isViewMode: status,
    };
  },

  [actionTypes.PCB_CALCULATOR___GET_FORM_LAYOUT_SUCCESS]: (state, payload) => {
    const { pcbLayout } = payload;
    return {
      ...state,
      pcbLayout,
    };
  },

  [actionTypes.PCB_CALCULATOR___RESET_FORM_LAYOUT]: (state, payload) => {
    return {
      ...state,
      pcbLayout: null,
    };
  },

  [actionTypes.PCB_CALCULATOR___GET_PCB_SPEC_SUCCESS]: (state, payload) => {
    const { spec } = payload;
    const querySpec = spec || {
      ...initialState.originalSpecByPn,
      item: state.wistronpn
    };
    const convertData = _mapKeys(querySpec, (value, key) => {
      if (key.indexOf('spec') === 0) { return key.toUpperCase(); }
      return key;
    });
    // 如果有spec的話，把空的廠商過濾掉
    const originalSpecByPn = {
      ...convertData,
      manufacturer: convertData.manufacturer.filter(item => !!item)
    };

    return {
      ...state,
      originalSpecByPn
    };
  },

  [actionTypes.PCB_CALCULATOR___CALCULATE_PCB_SUCCESS]: (state, payload) => {
    const { list } = payload;
    const resultList = list.map(item => {
      return {
        id: item.id,
        content: item.content,
        info: {
          ...item.calcost.result,
          ...item.Price,
          highest_last_price_info: { ...item.calcost.highest_last_price_info },
          lowest_last_price_info: { ...item.calcost.lowest_last_price_info },
          sum_adder: item.calcost.result.sum_adder * 100,
          other5Adder: item.calcost.result.other5Adder * 100,
        }
      };
    });
    console.log('PCB_CALCULATOR___CALCULATE_PCB_SUCCESS', resultList);
    return {
      ...state,
      resultList
    };
  },

  [actionTypes.PCB_CALCULATOR___RE_CALCULATE_PCB_SUCCESS]: (state, payload) => {
    const { list } = payload;
    const organizedList = list.map(item => {
      return {
        id: item.id,
        content: item.content,
        info: {
          ...item.calcost.result,
          ...item.Price,
          highest_last_price_info: { ...item.calcost.highest_last_price_info },
          lowest_last_price_info: { ...item.calcost.lowest_last_price_info },
          sum_adder: item.calcost.result.sum_adder * 100,
          other5Adder: item.calcost.result.other5Adder * 100,
        }
      };
    });
    const resultList = state.resultList.map(item => {
      if (item.id === organizedList[0].id) {
        return {
          ...item,
          ...organizedList[0]
        };
      }
      return item;
    });
    return {
      ...state,
      resultList
    };
  },

  [actionTypes.PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB_SUCCESS]: (state, payload) => {
    const { list } = payload;
    let fixedList = [];
    if (list.length === 0) {
      return {
        ...state,
        fixedList: initialState.fixedList,
      };
    }
    fixedList = list.map(item => {
      return {
        id: item.id,
        content: item.content,
        isFixed: true,
        info: {
          ...item.calcost.result,
          ...item.Price,
          highest_last_price_info: { ...item.calcost.highest_last_price_info },
          lowest_last_price_info: { ...item.calcost.lowest_last_price_info },
          sum_adder: item.calcost.result.sum_adder * 100,
          other5Adder: item.calcost.result.other5Adder * 100,
        }
      };
    });
    return {
      ...state,
      fixedList
    };
  },

  [actionTypes.PCB_CALCULATOR___KEEP_ORIGINAL_FORM_DATA]: (state, payload) => {
    const { formData } = payload;
    return {
      ...state,
      originalFormData: formData,
    };
  },

  [actionTypes.PCB_CALCULATOR___RESET_DATA_SOURCE]: (state, payload) => {
    return {
      ...state,
      originalSpecByPn: initialState.originalSpecByPn,
      resultList: initialState.resultList,
      fixedList: initialState.fixedList
    };
  },


}, initialState);
