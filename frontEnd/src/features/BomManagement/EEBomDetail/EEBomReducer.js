import { handleActions } from 'redux-actions';
import { actionTypes } from './EEBomActions';


const initialState = {
  typesList: [],
  eeBomDetailTab: [],
  edmVersionID: null,
  activeTab: null,
  viewallInfo: {},
  edmVersionIdList: [],
  eeBomProjectCollapse: false,
  statusVersion: null,
  avlSetting: {
    showAvl: false,
    disabledAvl: true,
  }
};

export default handleActions({
  [actionTypes.EEBOM___GET_TYPES_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      typesList: payload.typesList
    };
  },
  [actionTypes.EEBOM___SET_PROJECT_INFO_COLLAPSE]: (state, payload) => {
    return {
      ...state,
      eeBomProjectCollapse: payload.eeBomProjectCollapse
    };
  },
  [actionTypes.EEBOM___GET_EEBOM_VERSION_ID_LIST]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.EEBOM___GET_EEBOM_VERSION_ID_LIST_SUCCESS]: (state, payload) => {
    const { edmVersionIdList, statusVersion, avlSetting, } = payload;
    return {
      ...state,
      edmVersionIdList,
      statusVersion,
      avlSetting,
    };
  },
  [actionTypes.EEBOM___RESET_EEBOM_DETAIL_DATA]: (state, payload) => {
    return initialState;
  },
  [actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB]: (state, payload) => {
    return {
      ...state,
      edmVersionID: payload.params.edmVersionID,
    };
  },

  [actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB_SUCCESS]: (state, payload) => {
    return {
      ...state,
      eeBomDetailTab: payload.list,
    };
  },

  [actionTypes.EEBOM___SET_CURRENT_TAB_INFO]: (state, payload) => {
    return {
      ...state,
      activeTab: payload.data,
    };
  },
  [actionTypes.EEBOM___SET_VIEWALL_PROJECT_INFO]: (state, payload) => {
    const { viewallInfo } = payload;
    return {
      ...state,
      viewallInfo,
    };
  },
}, initialState);

