import { handleActions } from 'redux-actions';
import { actionTypes } from './DashBoardActions';


const initialState = {
  // project view
  projectList: [],
  searchInfo: {
    lv1: '',
    lv2: '',
    keyword: '',
    currentPage: 1,
    pageSize: 10,
    totalDataCount: 0
  },
  // filter的下拉
  filterList: {
    lv1: ['customer'], // FIXME: 先帶default 不知道以後會不會要從API來
    lv2: [],
    supplyType: [], // for summarize of EE
    manufacturer: [], // for summarize of ME
  },
  summarizeCondition: { // summarize
    supplyType: [],
    manufacturer: [],
  },
  loadingStatus: {
    lv1: false,
    lv2: false,
  },


  // project view頁面點Add之後出來的選擇version
  versions: {
    meVersions: [],
    eeVersions: [],
    prpojectInfo: {}
  },
  isVersionOpen: false,
  alertMsg: '',

  // dashBoard
  info: {}, // detail頁上面那五塊
  lists: [], // detail下面others/me/ee那三塊
  moduleList: [], // detail頁點開的modal
  isModuleDetailOpen: false,
  moduleName: '',
  columnType: false,
  listType: '',
  expandedRows: []
};

export default handleActions({
  [actionTypes.DASHBOARD___GET_LIST_DETAIL]: (state, payload) => {
    return {
      ...state,
    };
  },

  [actionTypes.DASHBOARD___GET_PROJECT_LIST_SUCCESS]: (state, payload) => {
    const { projectList } = payload;
    return {
      ...state,
      total: payload.total,
      projectList,
    };
  },

  // [actionTypes.DASHBOARD_DATABASE___UPDATE_SORT_INFO]: (state, payload) => {
  //   return {
  //     ...state,
  //     sortInfo: payload.sortInfo,
  //   };
  // },

  // [actionTypes.DASHBOARD___UPDATE_PAGE_INFO]: (state, payload) => {
  //   return {
  //     ...state,
  //     currentPage: payload.currentPage,
  //     pageSize: payload.pageSize
  //   };
  // },

  [actionTypes.DASHBOARD___GET_LIST_DETAIL_SUCCESS]: (state, payload) => {
    const { info, lists } = payload;
    return {
      ...state,
      info,
      lists,
    };
  },
  [actionTypes.DASHBOARD___GET_MODULE_LISTS_SUCCESS]: (state, payload) => {
    const { moduleList, moduleName, listType } = payload;
    return {
      ...state,
      moduleList,
      moduleName,
      listType,
    };
  },
  [actionTypes.DASHBOARD___TOGGLE_MODULE_DETAIL]: (state, payload) => {
    const { isModuleDetailOpen, columnType } = payload;
    return {
      ...state,
      isModuleDetailOpen,
      columnType,
    };
  },
  // 版本
  [actionTypes.DASHBOARD___GET_VERSIONS]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.DASHBOARD___GET_VERSIONS_SUCCESS]: (state, payload) => {
    const { versions, isVersionOpen } = payload;
    return {
      ...state,
      versions,
      isVersionOpen,
    };
  },
  [actionTypes.DASHBOARD___CLOSE_VERSION_MODAL]: (state, payload) => {
    const { isVersionOpen } = payload;
    return {
      ...state,
      versions: initialState.versions,
      isVersionOpen,
    };
  },
  // 顯示alert告知已選過version版本配對
  [actionTypes.DASHBOARD___SHOW_PROJECT_VIEW_ALERT]: (state, payload) => {
    const { alertMsg } = payload;
    return {
      ...state,
      alertMsg,
    };
  },
  // 關閉alert
  [actionTypes.DASHBOARD___RESET_PROJECT_VIEW_ALERT]: (state, payload) => {
    return {
      ...state,
      alertMsg: initialState.alertMsg,
    };
  },
  // 拿project view過濾條件選單內容
  [actionTypes.DASHBOARD___GET_PROJECT_FILTER_LV1_SUCCESS]: (state, payload) => {
    const { lv1 } = payload;
    return {
      ...state,
      filterList: {
        ...state.filterList,
        lv1,
      }
    };
  },
  [actionTypes.DASHBOARD___GET_PROJECT_FILTER_LV2_SUCCESS]: (state, payload) => {
    const { lv2 } = payload;
    return {
      ...state,
      filterList: {
        ...state.filterList,
        lv2,
      }
    };
  },
  // 清除左邊filter的篩選條件
  [actionTypes.DASHBOARD___RESET_PROJECT_FILTER]: (state, payload) => {
    return {
      ...state,
      searchInfo: initialState.searchInfo
    };
  },
  [actionTypes.DASHBOARD___SET_PROJECT_FILTER]: (state, payload) => {
    const { searchInfo } = payload;
    return {
      ...state,
      searchInfo: {
        ...state.searchInfo,
        ...searchInfo,
      }
    };
  },

  [actionTypes.DASHBOARD___GET_SUMMARIZE_FILTER_SUCCESS]: (state, payload) => {
    const { data: { EE, ME } } = payload;
    const supplyType = EE.map(val => ({ label: val, value: val }));
    const manufacturer = ME.map(val => ({ label: val, value: val }));
    return {
      ...state,
      filterList: {
        ...state.filterList,
        manufacturer,
        supplyType,
      }
    };
  },
  [actionTypes.DASHBOARD___SET_SUMMARIZE_CONDITION]: (state, payload) => {
    const { data } = payload;
    return {
      ...state,
      summarizeCondition: {
        ...state.summarizeCondition,
        ...data,
      }
    };
  },
  [actionTypes.DASHBOARD___SET_EXPANDEDROWS]: (state, payload) => {
    const { expandedRows } = payload;
    return {
      ...state,
      expandedRows
    };
  },
}, initialState);
