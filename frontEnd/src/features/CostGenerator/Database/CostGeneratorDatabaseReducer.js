import { handleActions } from 'redux-actions';
import { actionTypes } from './CostGeneratorDatabaseActions';

const initialState = {
  tableTypeList: [],
  contentTables: [],
  activeTableType: '',
  sortInfo: [
    {
      sortOrder: 'desc',
      dataIndex: 'tableName'
    },
  ],
};

export default handleActions({
  [actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      tableTypeList: payload.tableTypeList,
      activeTableType: payload.tableTypeList[0]
    };
  },

  [actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_SUCCESS]: (state, payload) => {
    return {
      ...state,
      contentTables: payload.contentTables,
    };
  },

  [actionTypes.COSTGENERATOR_DATABASE___UPDATE_ACTIVE_TABLE_TYPE]: (state, payload) => {
    return {
      ...state,
      activeTableType: payload.tableType
    };
  },

  [actionTypes.COSTGENERATOR_DATABASE___UPDATE_SORT_INFO]: (state, payload) => {
    return {
      ...state,
      sortInfo: payload.sortInfo,
    };
  },


}, initialState);
