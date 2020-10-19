import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { actionTypes } from './AllAccountsActions';
import { USER_MODAL_STEP, USER_MODAL_HEADER_TEXT, USER_MODAL_MODE, USER_MODAL_TRANSFORM_RBACLIST } from './AllAccountConst';


const initialState = {
  type1DefIds: null,
  productTypeDefIds: null,
  userList: [],
  numberOfUser: 0,
  currentPage: 1,
  pageSize: 10,
  keyword: '',
  sortInfo: [
    {
      sortOrder: 'ascend',
      dataIndex: 'name_a'
    }
  ],
  // Permission
  userInfo: {
    email: null,
    emplid: null,
    name: null,
    phone: null,
    roleGroup: null,
    roleName: null,
    isContactWindow: false
  },
  modalStep: USER_MODAL_STEP.USER,
  userModalMode: USER_MODAL_MODE.ADD,
  isUserModalOpen: false,
  type1Menus: [],
  productTypeMenus: [],
  beforeSelectPT: [],
  beforeSelected: [],
  beforeRoleGroup: '',
  beforeRoleName: '',
  selectPT: [],
  selected: [],
  rbacList: {},
  filterType: false
};

export default handleActions({

  [actionTypes.ALLACCOUNTS___GET_USER_LIST_SUCCESS]: (state, payload) => {
    const { userList, numberOfUser, type1DefIds, productTypeDefIds } = payload;
    return {
      ...state,
      userList,
      numberOfUser,
      type1DefIds,
      productTypeDefIds
    };
  },

  [actionTypes.ALLACCOUNTS___UPDATE_KEYWORD]: (state, payload) => {
    return {
      ...state,
      keyword: payload.keyword,
    };
  },

  [actionTypes.ALLACCOUNTS___UPDATE_SORT_INFO]: (state, payload) => {
    return {
      ...state,
      sortInfo: payload.sortInfo,
    };
  },

  [actionTypes.ALLACCOUNTS___UPDATE_PAGE_INFO]: (state, payload) => {
    const { current, pageSize } = payload;
    return {
      ...state,
      currentPage: current,
      pageSize,
    };
  },

  // Permission
  [actionTypes.ALLACCOUNTS___GET_USER_INFO_SUCCESS]: (state, payload) => {
    const selectedType1 = R.path(['xray_types', 'All'], payload.userInfo) || [];
    const selectedProductType = R.path(['product_type', 'All'], payload.userInfo) || [];
    const selected = selectedType1.map(opt => opt.id);
    const selectPT = selectedProductType.map(opt => opt.id);
    const { userInfo } = payload;
    return {
      ...state,
      userInfo: {
        emplid: userInfo.emplid,
        name: userInfo.name_a,
        email: userInfo.email_address,
        phone: userInfo.phone,
        roleGroup: userInfo.role_group,
        roleName: userInfo.role_name,
        isContactWindow: userInfo.is_contact_window
      },
      beforeRoleGroup: userInfo.role_group,
      beforeRoleName: userInfo.role_name,
      beforeSelected: selected,
      beforeSelectPT: selectPT,
      selected,
      selectPT,
    };
  },
  [actionTypes.ALLACCOUNTS___TOGGLE_USER_MODAL]: (state, payload) => {
    return {
      ...state,
      isUserModalOpen: payload.status
    };
  },
  [actionTypes.ALLACCOUNTS___SET_USER_MODAL_STEP]: (state, payload) => {
    const { modalStep } = payload;
    return {
      ...state,
      modalStep,
      type1Menus: [],
      productTypeMenus: [],
      filterType: false
    };
  },
  [actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS_SUCCESS]: (state, payload) => {
    const { type1Menus } = payload;

    return {
      ...state,
      type1Menus,
    };
  },
  [actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_SUCCESS]: (state, payload) => {
    const { productTypeMenus } = payload;

    return {
      ...state,
      productTypeMenus,
    };
  },
  [actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.ALLACCOUNTS___RESET_TYPE1_MENUS]: (state, payload) => {
    return {
      ...state,
      type1Menus: [],
    };
  },
  [actionTypes.ALLACCOUNTS___RESET_PRODUCTTYPE_MENUS]: (state, payload) => {
    return {
      ...state,
      productTypeMenus: [],
    };
  },

  [actionTypes.ALLACCOUNTS___SET_SELECTED]: (state, payload) => {
    return {
      ...state,
      selected: payload.selected
    };
  },
  [actionTypes.ALLACCOUNTS___SET_SELECT_PRODUCTTYPE]: (state, payload) => {
    return  {
      ...state,
      selectPT: payload.selectPT,
    };
  },
  [actionTypes.ALLACCOUNTS___RESET_USERMODAL]: (state, payload) => {
    return {
      ...state,
      beforeSelected: initialState.beforeSelected,
      selected: initialState.selected,
      beforeSelectPT: initialState.beforeSelectPT,
      selectPT: initialState.selectPT,
      modalStep: initialState.modalStep,
      userInfo: initialState.userInfo,
      rbacList: initialState.rbacList
    };
  },
  [actionTypes.ALLACCOUNTS___OPEN_ADD_MODAL]: (state, payload) => {
    return {
      ...state,
      userModalMode: USER_MODAL_MODE.ADD,
      isUserModalOpen: true,
      modalStep: initialState.modalStep,
    };
  },
  [actionTypes.ALLACCOUNTS___OPEN_EDIT_MODAL]: (state, payload) => {
    return {
      ...state,
      userModalMode: USER_MODAL_MODE.EDIT,
      userInfo: initialState.userInfo,
      modalStep: initialState.modalStep,
    };
  },
  [actionTypes.ALLACCOUNTS___SET_USERINFO_VALUE]: (state, payload) => {
    const { name, value } = payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        [name]: value
      }
    };
  },
  [actionTypes.ALLACCOUNTS___RESET_USERINFO]: (state, payload) => {
    return {
      ...state,
      userInfo: initialState.userInfo,
      userModalMode: USER_MODAL_MODE.ADD,
      modalStep: initialState.modalStep,
      beforeSelected: initialState.beforeSelected,
      selected: initialState.selected,
      beforeSelectPT: initialState.beforeSelectPT,
      selectPT: initialState.selectPT,
      beforeRoleGroup: initialState.beforeRoleGroup,
      beforeRoleName: initialState.beforeRoleName,
      rbacList: {}
    };
  },
  [actionTypes.ALLACCOUNTS___GET_RBAC_LIST]: (state, payload) => {
    return {
      ...state,
      rbacList: {},
    };
  },
  [actionTypes.ALLACCOUNTS___GET_RBAC_LIST_SUCCESS]: (state, payload) => {
    const rbacList = USER_MODAL_TRANSFORM_RBACLIST(payload.rbacList);
    return {
      ...state,
      rbacList
    };
  },
  [actionTypes.ALLACCOUNTS___GET_RBAC_LIST_FAILED]: (state, payload) => {
    return {
      ...state,
      rbacList: {}
    };
  },
  [actionTypes.ALLACCOUNTS___SET_FILTER_TYPE]: (state, payload) => {
    return {
      ...state,
      filterType: payload.filterType
    };
  },
  [actionTypes.ALLACCOUNTS___GET_CHECK_TYPE1_MENUS_SUCCESS]: (state, payload) => {
    const { beforeSelected } = state;
    const { type1Menus } = payload;
    const selectAllList = type1Menus.map(opt => opt.id);    // 全選的選項
    const isAddMode = state.userModalMode === USER_MODAL_MODE.ADD; // 是否為add mode
    const isChangeRole = state.userInfo.roleName !== state.beforeRoleName;// 是否為改變角色

    // 如果有改變roleName, 就預設全選，否則讀取一開始的選擇
    const needSelected = isChangeRole ? selectAllList : beforeSelected;

    return {
      ...state,
      selected: isAddMode ? selectAllList : needSelected
    };
  },
  [actionTypes.ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS_SUCCESS]: (state, payload) => {
    const { beforeSelectPT } = state;
    const { productTypeMenus } = payload;
    const isAddMode = state.userModalMode === USER_MODAL_MODE.ADD;
    const selectProductTypeAllList = productTypeMenus.map(opt => opt.id);
    const isChangeRole = state.userInfo.roleName !== state.beforeRoleName;// 是否為改變角色
    const needSelectPT = isChangeRole ? selectProductTypeAllList : beforeSelectPT;

    return  {
      ...state,
      selectPT: isAddMode ? selectProductTypeAllList : needSelectPT,
    };
  }
}, initialState);
