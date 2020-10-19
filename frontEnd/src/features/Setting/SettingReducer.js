import { handleActions } from 'redux-actions';
import { actionTypes } from './SettingActions';
import { CONTACT_WINDOW } from './AllAccounts/AllAccountConst';


const initialState = {
  filterBarInfo: {
    roleGroup: [],
    roleGroupOptions: [],
    roleName: '',
    roleNameOptions: [],
  },
};

export default handleActions({

  /*
  Role management & All Accounts
  */

  [actionTypes.SETTING__GET_ROLE_GROUP_OPTIONS_SUCCESS]: (state, payload) => {
    const { list } = payload;
    const options = list.length > 0 ?
      list
        .filter(o => o !== CONTACT_WINDOW)
        .map(o => {
          return {
            label: o, value: o
          };
        }) : [];
    return {
      ...state,
      filterBarInfo: {
        ...state.filterBarInfo,
        roleGroupOptions: options
      },
    };
  },

  [actionTypes.SETTING__GET_ROLE_NAME_OPTIONS_SUCCESS]: (state, payload) => {
    const { list } = payload;
    const options = list.length > 0 ?
      list.map(o => {
        return {
          label: o, value: o
        };
      }) : [];
    return {
      ...state,
      filterBarInfo: {
        ...state.filterBarInfo,
        roleNameOptions: options
      },
    };
  },

  [actionTypes.SETTING___UPDATE_ROLE_GROUP]: (state, payload) => {
    return {
      ...state,
      filterBarInfo: {
        ...state.filterBarInfo,
        roleGroup: payload.roleGroup,
        roleName: '',
        roleNameOptions: [],
      },
    };
  },

  [actionTypes.SETTING___UPDATE_ROLE_NAME]: (state, payload) => {
    return {
      ...state,
      filterBarInfo: {
        ...state.filterBarInfo,
        roleName: payload.roleName,
      },
    };
  },

  [actionTypes.SETTING___RESET_FILTER_BAR_INFO]: (state, payload) => {
    return {
      ...state,
      filterBarInfo: {
        ...state.filterBarInfo,
        roleGroup: [],
        roleName: '',
        roleNameOptions: [],
      },
    };
  },
}, initialState);
