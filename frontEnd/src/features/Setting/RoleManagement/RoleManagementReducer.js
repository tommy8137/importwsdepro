import { handleActions } from 'redux-actions';
import filter from 'lodash/filter';
import * as moment from 'moment';
import { actionTypes } from './RoleManagementActions';


const initialState = {
  // role management
  isAddRoleShow: false,
  editRole: -1, // FIXME: 正在編輯的角色 (還不確定是不是id)
  policyRole: {},
  policies: [],
  roles: [],
  resources: [],
  selectedResource: {
    label: '',
    value: null,
    record: {},
  },
  sorter: {},
  selectedGroupOpt: null
};

export default handleActions({
  [actionTypes.SETTING_ROLE_MAGT___TOGGLE_CREATE_ROLE_MODAL]: (state, payload) => {
    const { isAddRoleShow, selectedGroupOpt } = payload;
    return {
      ...state,
      isAddRoleShow,
      selectedGroupOpt,
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___DO_CREATE_ROLE]: (state, payload) => {
    return {
      ...state,
    };
  },


  [actionTypes.SETTING_ROLE_MAGT___GET_POLICY_SUCCESS]: (state, payload) => {
    const { policies } = payload;

    return {
      ...state,
      policies,
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___GET_ROLES_SUCCESS]: (state, payload) => {
    const { roles } = payload;

    return {
      ...state,
      roles,
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___GET_RESOURCES_SUCCESS]: (state, payload) => {
    const { resources } = payload;

    return {
      ...state,
      resources,
      selectedResource: resources[0]
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___GET_POLICY_ROLE_SUCCESS]: (state, payload) => {
    const { policyRole } = payload;

    return {
      ...state,
      policyRole,
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___SET_SELECTED_RESOURCE]: (state, payload) => {
    const { resource } = payload;

    return {
      ...state,
      selectedResource: {
        label: resource.description || resource.rs_path,
        value: resource.id,
        record: resource,
      },
    };
  },
  [actionTypes.SETTING_ROLE_MAGT___UPDATE_SORTER]: (state, payload) => {
    const { sorter } = payload;

    return {
      ...state,
      sorter,
    };
  },
}, initialState);
