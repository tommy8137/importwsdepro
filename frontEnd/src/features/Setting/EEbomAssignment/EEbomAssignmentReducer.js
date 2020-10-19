import { handleActions } from 'redux-actions';
import _filter from 'lodash/filter';
import { actionTypes } from './EEbomAssignmentActions';
import { FILTER_INFO, USER_OPTIONS } from './EEbomAssignmentConst';


const initialState = {
  // EEbomAssignment
  isAllEditClose: false,
  isEditable: false,
  eeBomList: [],
  filterInfo: {
    [FILTER_INFO.FILTER_ITEM]: '',
    [FILTER_INFO.FILTER_VALUE]: '',
  },
  filteredEEBomList: [],
  options: {
    [USER_OPTIONS.PIC]: [],
    [USER_OPTIONS.PROXY]: []
  },
};

export default handleActions({

  /*
  EEbomAssignment
  */

  [actionTypes.EEBOM_ASSIGNMENT___DISABLE_ALL_EDIT]: (state, payload) => {
    return {
      ...state,
      isAllEditClose: payload.status,
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___GET_EEBOM_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      eeBomList: payload.list,
      filteredEEBomList: payload.list,
      isEditable: payload.isEditable,
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___UPDATE_FILTER_INFO]: (state, payload) => {
    const { field, val } = payload;
    return {
      ...state,
      filterInfo: {
        ...state.filterInfo,
        [field]: val,
      }
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___GET_FILTERED_EEBOM_LIST]: (state, payload) => {
    const { eeBomList, filterInfo: { filterItem, filterValue } } = state;
    // 開始filter EEbom list
    const filteredEEBomList = _filter(eeBomList, (item) => {
      return item[filterItem] === filterValue;
    });
    return {
      ...state,
      filteredEEBomList,
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___RESET_FILTER_BAR]: (state, payload) => {
    return {
      ...state,
      filterInfo: initialState.filterInfo,
      filteredEEBomList: state.eeBomList,
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___SEARCH_USERS_SUCCESS]: (state, payload) => {
    const { options } = state;
    const { userList, field } = payload;
    const list = userList.map(item => {
      return {
        label: item.value,
        value: item.key
      };
    });
    return {
      ...state,
      options: {
        ...options,
        [field]: list
      }
    };
  },

  [actionTypes.EEBOM_ASSIGNMENT___RESET_OPTIONS]: (state, payload) => {
    const { options } = state;
    const { field } = payload;
    return {
      ...state,
      options: {
        ...options,
        [field]: []
      }
    };
  },


}, initialState);
