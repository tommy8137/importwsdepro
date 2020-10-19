import { handleActions } from 'redux-actions';
import * as moment from 'moment';
import { actionTypes } from './XraySpecTitleActions';
import { FILTER_INFO, LOADING_STATUS } from './XraySpecTitleConst';

const emptySpecTitleList = [...Array(29).keys()].map(item => {
  return {
    spec_no: `${item + 2}`,
    title: '－',
    edit_by: '－',
    edit_time: '－',
  };
});

const initialState = {
  // XraySpecTitle
  isAllEditClose: false,
  isEmpty: true,
  isEditable: false,
  specTitleList: emptySpecTitleList,
  filterInfo: {
    [FILTER_INFO.TYPE_I]: '',
    [FILTER_INFO.TYPE_I_OPTIONS]: [],
    [FILTER_INFO.TYPE_II]: '',
    [FILTER_INFO.TYPE_II_OPTIONS]: [],
    [FILTER_INFO.PRODUCT_TYPE]: '',
    [FILTER_INFO.PRODUCT_TYPE_OPTIONS]: [],
  },

  loadingStatus: {
    [LOADING_STATUS.TYPE_I]: false,
    [LOADING_STATUS.TYPE_II]: false,
    [LOADING_STATUS.PRODUCT_TYPE]: false,
  },
};

export default handleActions({
  /*
  XraySpecTitle
  */

  [actionTypes.XRAY_SPEC_TITLE___DISABLE_ALL_EDIT]: (state, payload) => {
    return {
      ...state,
      isAllEditClose: payload.status,
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST_SUCCESS]: (state, payload) => {
    const { list, isEditable } = payload;
    const specTitleList = list.map(item => {
      let time = item.edit_time ? moment.utc(item.edit_time).local().format('YYYY/MM/DD HH:mm') : null;
      return {
        ...item,
        edit_time: time
      };
    });
    return {
      ...state,
      isEmpty: false,
      isEditable,
      specTitleList,
    };
  },


  [actionTypes.XRAY_SPEC_TITLE___RESET_FILTER_BAR]: (state, payload) => {
    return {
      ...state,
      isEmpty: true,
      isEditable: false,
      specTitleList: emptySpecTitleList,
      filterInfo: {
        ...state.filterInfo,
        [FILTER_INFO.TYPE_I]: '',
        [FILTER_INFO.TYPE_II]: '',
        [FILTER_INFO.TYPE_II_OPTIONS]: [],
        [FILTER_INFO.PRODUCT_TYPE]: '',
        [FILTER_INFO.PRODUCT_TYPE_OPTIONS]: [],
      }
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___UPDATE_FILTER_INFO]: (state, payload) => {
    const { field, value } = payload;
    return {
      ...state,
      filterInfo: {
        ...state.filterInfo,
        [field]: value,
      }
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS_SUCCESS]: (state, payload) => {
    const options = payload.list.map(o => {
      return { label: o, value: o };
    });
    return {
      ...state,
      filterInfo: {
        ...state.filterInfo,
        [FILTER_INFO.TYPE_I]: '',
        [FILTER_INFO.TYPE_I_OPTIONS]: options,
        [FILTER_INFO.TYPE_II]: '',
        [FILTER_INFO.TYPE_II_OPTIONS]: [],
        [FILTER_INFO.PRODUCT_TYPE]: '',
        [FILTER_INFO.PRODUCT_TYPE_OPTIONS]: [],
      }
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS_SUCCESS]: (state, payload) => {
    const options = payload.list.map(o => {
      return { label: o, value: o };
    });
    return {
      ...state,
      filterInfo: {
        ...state.filterInfo,
        [FILTER_INFO.TYPE_II]: '',
        [FILTER_INFO.TYPE_II_OPTIONS]: options,
        [FILTER_INFO.PRODUCT_TYPE]: '',
        [FILTER_INFO.PRODUCT_TYPE_OPTIONS]: [],
      }
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS_SUCCESS]: (state, payload) => {
    const options = payload.list.map(o => {
      return { label: o, value: o };
    });
    return {
      ...state,
      filterInfo: {
        ...state.filterInfo,
        [FILTER_INFO.PRODUCT_TYPE]: '',
        [FILTER_INFO.PRODUCT_TYPE_OPTIONS]: options,
      }
    };
  },

  [actionTypes.XRAY_SPEC_TITLE___UPDATE_LOADING_STATUS]: (state, payload) => {
    const { field, status } = payload;
    return {
      ...state,
      loadingStatus: {
        ...state.loadingStatus,
        [field]: status
      }
    };
  },

}, initialState);
