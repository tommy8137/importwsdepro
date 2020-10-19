import * as moment from 'moment';
import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';
import uuidv4 from 'uuid/v4';
import { actionTypes } from './BomManagementActions';


export const initialState = {
  table: 'ME',
  bomList: [],
  currentPage: 1,
  total: 0,
  pageSize: 10,
  sortInfo: [
    {
      sortOrder: 'desc',
      dataIndex: 'create_time'
    }
  ],
  // filter bar
  filterTypeList: [],
  filterType: '',
  filterValueList: [],
  filterValue: '',

  // search bar
  searchValue: '',

  // archive
  disable: false,

  // modal of create bom (ME)
  isCreateOpen: false,
  formvalue: null,
  bomData: {
    bomProject: {
      approved_by: {
        key: sessionStorage.getItem('userid'),
        value: sessionStorage.getItem('username')
      },
      project_leader: {
        key: sessionStorage.getItem('userid'),
        value: sessionStorage.getItem('username')
      },
    },
    bomDesignee: [{
      id: 'me_default',
      seq: 0,
      function_team: '',
      isfunctionteam: false,
      user: {
        key: sessionStorage.getItem('userid'),
        value: sessionStorage.getItem('username')
      },
    },
    ...Array.from({ length: 3 }).map((item, idx) => ({
      id: uuidv4(),
      seq: idx + 1,
      function_team: '',
      isfunctionteam: false,
    })),
    ...Array.from({ length: 2 }).map((item, idx) => ({
      id: uuidv4(),
      seq: idx + 10,
      function_team: '',
      isfunctionteam: true,
    }))
    ]
  },
  highlightid: -1,

  // modal of edit bom (ME)
  isEditOpen: false,
  isParameterOpen: false,
  isPermissionModalOpen: false,
  permissionModalBomId: '',
  parameterData: {
    bomParams: []
  },
  parameterDataBomId: '',
  // modal of choose version (EE)
  edmVersions: [],
  isVersionOpen: false,
  eeBomProjectID: null,

  // modal of edit bom (EE)
  eeBomData: null,
  isEeEditOpen: false,
  plantCodeList: [],
};

export default handleActions({
  [actionTypes.BOMMANAGEMENT___TOGGLE_PERMISSION_MODAL]: (state, payload) => {
    const { isOpen, bomId } = payload?.data || {};
    return {
      ...state,
      isPermissionModalOpen: isOpen,
      permissionModalBomId: bomId,
    };
  },
  [actionTypes.BOMMANAGEMENT___RESET_ALL_DATA]: (state, payload) => {
    return {
      ...initialState,
      table: state.table,
    };
  },
  [actionTypes.BOMMANAGEMENT___GET_BOM_LIST_SUCCESS]: (state, payload) => {
    const bomList = payload.bomList.map(item => {
      return {
        ...item,
        create_time: moment.utc(item.create_time).local().format('YYYY-MM-DD'),
        update_time: moment.utc(item.update_time).local().format('YYYY-MM-DD'),
        approve_time: item.approve_time ? moment.utc(item.approve_time).local().format('YYYY-MM-DD') : '',
      };
    });
    return {
      ...state,
      total: payload.total,
      bomList,
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_SORT_INFO]: (state, payload) => {
    return {
      ...state,
      sortInfo: payload.sortInfo,
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_PAGE_INFO]: (state, payload) => {
    return {
      ...state,
      currentPage: payload.current,
      pageSize: payload.pageSize
    };
  },

  // search bar
  [actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE_SUCCESS]: (state, payload) => {
    const filterTypeList = payload.filterTypeList.map(item => {
      return {
        label: item.value,
        value: item.key
      };
    });
    return {
      ...state,
      filterTypeList,
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_FILTER_TYPE]: (state, payload) => {
    return {
      ...state,
      filterType: payload.filterType,
      // filterValueList: []
    };
  },
  [actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE]: (state, payload) => {
    return {
      ...state,
      filterValueList: []
    };
  },
  [actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE_SUCCESS]: (state, payload) => {
    const options = payload.filterValueList.map(o => {
      return { label: o, value: o };
    });
    return {
      ...state,
      filterValueList: options,
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_FILTER_VALUE]: (state, payload) => {
    return {
      ...state,
      filterValue: payload.filterValue,
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_SEARCH_KEYWORD]: (state, payload) => {
    const { searchValue } = payload;
    return {
      ...state,
      searchValue,
    };
  },

  [actionTypes.BOMMANAGEMENT___SWITCH_TABLE]: (state, payload) => {
    return {
      ...state,
      table: payload.table
    };
  },
  [actionTypes.BOMMANAGEMENT___TOGGLE_CREATE_MODAL]: (state, payload) => {
    const { isCreateOpen } = payload;
    return {
      ...state,
      isCreateOpen,
    };
  },
  [actionTypes.BOMMANAGEMENT___CLOSE_CREATE_MODAL]: (state, payload) => {
    const { isCreateOpen } = payload;
    return {
      ...state,
      isCreateOpen,
      formvalue: null,
      baseData: {},
      bomData: initialState.bomData,
      approveby: [],
      leader: [],
      designee: [],
    };
  },
  [actionTypes.BOMMANAGEMENT___CREATE_GET_BASEDATA]: (state, payload) => {
    const { baseData, isCreateOpen } = payload;
    return {
      ...state,
      baseData,
      isCreateOpen,
    };
  },
  [actionTypes.BOMMANAGEMENT___CREATE_BOM_SAVE_STEP_1]: (state, payload) => {
    const { bomProject } = payload;
    return {
      ...state,
      bomData: {
        ...state.bomData,
        bomProject
      },
    };
  },
  // [actionTypes.BOMMANAGEMENT___DO_CREATE_BOM]: (state, payload) => {
  //   const { bomDesignee } = payload;
  //   return {
  //     ...state,
  //     bomData: {
  //       ...state.bomData,
  //       bomDesignee
  //     },
  //   };
  // },
  [actionTypes.BOMMANAGEMENT___GET_BOM_DETAIL_SUCCESS]: (state, payload) => {
    const { bomData, baseData, isEditOpen } = payload;
    return {
      ...state,
      bomData,
      baseData,
      isEditOpen,
    };
  },
  [actionTypes.BOMMANAGEMENT___TOGGLE_EDIT_MODAL]: (state, payload) => {
    const { isEditOpen } = payload;
    return {
      ...state,
      isEditOpen,
    };
  },
  [actionTypes.BOMMANAGEMENT___CLOSE_EDIT_MODAL]: (state, payload) => {
    const { isEditOpen } = payload;
    return {
      ...state,
      isEditOpen,
      formvalue: null,
      baseData: {},
      bomData: initialState.bomData,
      approveby: [],
      leader: [],
      designee: [],
    };
  },
  [actionTypes.BOMMANAGEMENT___UPDATE_BOM_DETAIL]: (state, payload) => {
    const { bomData: { bomProject: orip, bomDesignee: orid } } = state;
    const { bomProject: bomp, bomDesignee: bomd, } = payload;
    let { bomData: { bomProject } } = state;
    let { bomData: { bomDesignee } } = state;
    if (bomp) {
      bomProject = { ...orip, ...bomp };
    }
    if (bomd) {
      bomDesignee = _cloneDeep(bomd);
    }
    return {
      ...state,
      bomData: {
        bomProject,
        bomDesignee,
      },
    };
  },
  [actionTypes.BOMMANAGEMENT___DO_UPDATE_BOM]: (state) => {
    return {
      ...state,
    };
  },
  [actionTypes.BOMMANAGEMENT___HIGHLIGHT_BOM_PROJECT]: (state, payload) => {
    const { highlightid } = payload;
    return {
      ...state,
      highlightid
    };
  },

  // choose version
  [actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL]: (state, payload) => {
    return {
      ...state,
      eeBomProjectID: payload.id,
    };
  },
  [actionTypes.BOMMANAGEMENT___CLOSE_CHOOSE_VERSION_MODAL]: (state, payload) => {
    const { isVersionOpen } = payload;
    return {
      ...state,
      isVersionOpen,
      edmVersions: [],
    };
  },
  [actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL_SUCCESS]: (state, payload) => {
    const { isVersionOpen, edmVersions } = payload;

    return {
      ...state,
      isVersionOpen,
      edmVersions,
    };
  },

  // ee bom project detail
  [actionTypes.BOMMANAGEMENT___TOGGLE_EE_EDIT_MODAL]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.BOMMANAGEMENT___GET_EE_BOM_DETAIL_SUCCESS]: (state, payload) => {
    const { eeBomData, isEeEditOpen } = payload;
    return {
      ...state,
      eeBomData,
      isEeEditOpen,
    };
  },
  [actionTypes.BOMMANAGEMENT___CLOSE_EE_EDIT_MODAL]: (state, payload) => {
    const { isEeEditOpen } = payload;
    return {
      ...state,
      isEeEditOpen,
      formvalue: null,
      eeBomData: null,
    };
  },
  [actionTypes.BOMMANAGEMENT___GET_EEBOM_PLANT_CODE_LIST_SUCCESS]: (state, payload) => {
    const { plantCodeList = [] } = payload;
    return {
      ...state,
      plantCodeList
    };
  },
  [actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL]: (state, payload) => {
    const { plantCodeList = [] } = payload;
    return {
      ...state,
      plantCodeList
    };
  },
  [actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL]: (state, payload) => {
    const { plantCodeList = [] } = payload;
    return {
      ...state,
      plantCodeList
    };
  },
  [actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL]: (state, payload) => {
    const { bomId } = payload;
    return {
      ...state,
      parameterDataBomId: bomId,
      parameterData: []
    };
  },
  [actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL_SUCCESS]: (state, payload) => {
    const { data } = payload;
    return {
      ...state,
      isParameterOpen: true,
      parameterData: data
    };
  },
  [actionTypes.BOMMANAGEMENT___TOGGLE_PARAMETER_MODAL]: (state, payload) => {
    const { isOpen } = payload;
    return {
      ...state,
      isParameterOpen: isOpen
    };
  },

  [actionTypes.BOMMANAGEMENT___PUT_BOM_PARAMETER_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isParameterOpen: false
    };
  },

  [actionTypes.BOMMANAGEMENT___UPDATE_ARCHIVE_TOGGLE]: (state, payload) => {
    return {
      ...state,
      disable: payload.showArchive,
    };
  },
}, initialState);
