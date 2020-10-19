import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import _get from 'lodash/get';
import { store, history } from '~~store';

import CommonUtils from '~~utils/CommonUtils';
import TableGridUtils from '~~utils/TableGridUtils';
import {
  EEBOM_NEXTSTAGE_INITIAL_FILTERINFO,
  EEBOM_NEXTSTAGE_INITIAL_APPROVER_FILTERINFO
} from '~~features/BomManagement/EEBomDetail/EEBomNextStage/EEBomNextStageConst';
import {
  actionPrefix,
} from './EEBomPersonalActions';
import Utils from '../Utils';

const initialSelectedInfo = {
  selectedList: [],
};

const initialState = {
  // 要做filter和進入editmode之前都會reset selectedInfo
  showEXPSpa: false,
  showPriceDiff: false,
  odmPart: false,
  selectedInfo: {
    ...initialSelectedInfo
  },
  twoLevelFilterInfo: EEBOM_NEXTSTAGE_INITIAL_FILTERINFO,
  sortInfo: [
    {
      sortOrder: 'asc',
      dataIndex: 'type1'
    },
  ],
  tableData: [],
  originalTableData: [],
  analysisData: {
    checkedCount: 0,
    itemTypeCount: 0,
    PICPartsCount: 0,
    approvedCount: 0,
    totalType2Count: 0,
    totalPartsCount: 0,
    totalSuggestionCost: 0,
    total2ndHighestCost: 0,
    totalLowestCost: 0,
    totalCost: 0
  },
  PCBInfo: {
    isPCB: false,
    pcbInfo: null
  },
  /*
  格式如下：
  {
    uuid-0001: { errors: { ce_cost: [] }},
    uuid-0002: { errors: { supply_type: ['不得為空'] }}
  }
  */
  itemsValidateError: null,
  isEditMode: true,
  isBomApproved: false,
  isPCBApproved: false,
  lastModifiedItems: [],
  isOpenCopy: false,
  alertMessage: '',
  refreshInfo: {
    isSaved: true,
    refreshTime: null,
  },
};


export default handleActions({
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'SAVE_PERSONAL_TABLE').SUCCESS]: (state, payload) => {
    return {
      ...state,
      lastModifiedItems: payload.lastModifiedItems
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'SAVE_LEADER_TABLE').SUCCESS]: (state, payload) => {
    return {
      ...state,
      lastModifiedItems: payload.lastModifiedItems
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_PERSONAL_TABLE_DATA').SUCCESS]: (state, payload) => {
    const allStates = store.getState();
    const { infos, isPCB, pcbInfo, checked, reject, itemType, picCount, is_saved: isSaved, refresh_time: refreshTime, isEdit: isEditMode,
      // approver才有的key
      approved, totalType2, totalPartsCount, totalSuggestionCost, totalCost, totalLowestCost, total2ndHighestCost, isBomApproved, isPCBApproved,
    } = payload.data;

    const isApprover = _get(allStates, ['eeBom', 'activeTab', 'type'], false) === 'approver';


    const fitlerConfig = {
      tableData: infos,
      filterInfo: state.twoLevelFilterInfo,
      showPriceDiff: state.showPriceDiff,
      showEXPSpa: state.showEXPSpa,
      isApprover,
    };


    const newTableData = Utils.getTableDataWithFilterInfo(fitlerConfig);
    const filterInfo = Utils.getTableDataFilterInfo(fitlerConfig);

    let newItemsValidateError = state.itemsValidateError;


    return {
      ...state,
      originalTableData: infos,
      tableData: newTableData,
      itemsValidateError: newItemsValidateError,
      twoLevelFilterInfo: filterInfo,
      analysisData: {
        ...state.analysisData,
        checkedCount: checked == null ? '−' : checked,
        rejectCount: reject == null ? '−' : reject,

        itemTypeCount: itemType == null ? '−' : itemType,
        PICPartsCount: picCount == null ? '−' : picCount,

        approvedCount: approved == null ? '−' : approved,
        totalType2Count: totalType2 == null ? '−' : totalType2,
        totalPartsCount: totalPartsCount == null ? '−' : totalPartsCount,
        totalSuggestionCost: totalSuggestionCost == null ? '−' : totalSuggestionCost,
        total2ndHighestCost: total2ndHighestCost == null ? '-' : total2ndHighestCost,
        totalLowestCost: totalLowestCost == null ? '-' : totalLowestCost,
        totalCost: totalCost == null ? '−' : totalCost,
      },
      PCBInfo: {
        isPCB,
        pcbInfo
      },
      isBomApproved,
      isPCBApproved,
      refreshInfo: { // 判斷refresh按鈕區塊的顯示
        isSaved,
        refreshTime,
      },
      isEditMode
    };
  },
  [`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID`]: (state, payload) => {
    const { id, rowKey, rowValue } = payload;
    const alter = R.map(
      R.when(R.propEq('id', id), R.assoc(rowKey, rowValue)),
    )(state.tableData);

    return {
      ...state,
      tableData: alter
    };
  },
  [`${actionPrefix}UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID_LIST`]: (state, payload) => {
    const { idList, rowKey, rowValue } = payload;
    // console.log('[UPDATE_PERSONAL_TABLE_ROW_ITEM_BY_ID_LIST]idList, rowKey, rowValue', idList, rowKey, rowValue);
    const alter = state.tableData.map(item => {
      if (idList.includes(item.id)) {
        return {
          ...item,
          [rowKey]: rowValue
        };
      }
      return item;
    });
    return {
      ...state,
      tableData: alter
    };
  },
  [`${actionPrefix}CANCEL_EDIT_PERSONAL_TABLE`]: (state, payload) => {
    // 把修改的紀錄還原
    const updatedTableData = R.map(
      item => R.find(R.propEq('id', item.id))(state.originalTableData)
    )(state.tableData);

    return {
      ...state,
      tableData: updatedTableData,
      itemsValidateError: null
    };
  },
  /* ************************************************  Filter 相關 ************************************************************ */
  [`${actionPrefix}SET_TWO_LEVEL_FILTER_INFO`]: (state, payload) => {
    const allStates = store.getState();
    const isApprover = R.path(['eeBom', 'activeTab', 'type'], allStates) === 'approver';

    const filterConfig = {
      tableData: state.originalTableData,
      filterInfo: payload.updateInfoObj,
      isApprover
    };
    const filterInfo = Utils.getTableDataFilterInfo(filterConfig);
    return {
      ...state,
      twoLevelFilterInfo: filterInfo
    };
    // return R.set(R.lensProp('twoLevelFilterInfo'), payload.updateInfoObj, state);
  },
  [`${actionPrefix}RESET_TWO_LEVEL_FILTER_INFO`]: (state, payload) => {
    const allStates = store.getState();
    const isApprover = R.path(['eeBom', 'activeTab', 'type'], allStates) === 'approver';

    return {
      ...state,
      twoLevelFilterInfo:
        isApprover ?
          EEBOM_NEXTSTAGE_INITIAL_APPROVER_FILTERINFO :
          EEBOM_NEXTSTAGE_INITIAL_FILTERINFO,
      tableData: state.originalTableData,
    };
  },
  // 在這裏得到過濾過後的table data
  [`${actionPrefix}FILTER_TABLE_DATA`]: (state, payload) => {
    const allStates = store.getState();
    const isApprover = R.path(['eeBom', 'activeTab', 'type'], allStates) === 'approver';
    const filterConfig = {
      tableData: state.originalTableData,
      filterInfo: state.twoLevelFilterInfo,
      isApprover,
      showPriceDiff: state.showPriceDiff,
      showEXPSpa: state.showEXPSpa
    };
    if (state.isEditMode) {
      let presentTableData = Utils.getTableDataWithFilterInfo(filterConfig);
      // 把修改中的資料複寫回去
      presentTableData = TableGridUtils.restoreEditData(presentTableData, state.tableData);

      // 重新整理error，看看有沒有需要移除的
      let newItemsValidateError = TableGridUtils.cleanErrorObj(presentTableData, state.itemsValidateError);

      return {
        ...state,
        tableData: presentTableData,
        itemsValidateError: newItemsValidateError,
      };
    }
    // filter後的資料
    let updatedTableData = Utils.getTableDataWithFilterInfo(filterConfig);
    return R.set(R.lensProp('tableData'), updatedTableData, state);
  },
  [`${actionPrefix}CLEAN_FILTER_TABLE_DATA`]: (state, payload) => {
    const allStates = store.getState();
    const isApprover = R.path(['eeBom', 'activeTab', 'type'], allStates) === 'approver';
    if (state.isEditMode) {
      // 重新merge filter 資料
      const filterConfig = {
        tableData: state.originalTableData,
        filterInfo: state.twoLevelFilterInfo,
        isApprover,
        showPriceDiff: state.showPriceDiff,
        showEXPSpa: state.showEXPSpa
      };
      let updatedTableData = Utils.getTableDataWithFilterInfo(filterConfig);
      const tmpFilteredTableData = updatedTableData.map(item => {
        let tmpITem = state.tableData.find(i => i.id === item.id);
        if (tmpITem) {
          return tmpITem;
        }
        return item;
      });
      updatedTableData = tmpFilteredTableData;
      return {
        ...state,
        tableData: updatedTableData,
      };
    }
    return R.set(R.lensProp('tableData'), state.originalTableData, state);
  },
  /* ************************************************  Filter 相關 END ************************************************************ */
  [`${actionPrefix}SET_SELECTED_INFO`]: (state, payload) => {
    return R.set(R.lensProp('selectedInfo'), payload.updateInfoObj, state);
  },
  [`${actionPrefix}RESET_SELECTED_INFO`]: (state, payload) => {
    return {
      ...state,
      selectedInfo: {
        ...initialSelectedInfo,
      }
    };
  },
  [`${actionPrefix}UPDATE_ITEM_VALIDATE_ERROR`]: (state, payload) => {
    const { rowId, rowKey, errorsList } = payload;
    let updatedItemsValidateError = R.assocPath([rowId, 'errors', rowKey], errorsList, state.itemsValidateError);
    return {
      ...state,
      itemsValidateError: updatedItemsValidateError
    };
  },
  [`${actionPrefix}SET_IS_EDIT_MODE`]: (state, payload) => {
    const { boolean } = payload;
    return {
      ...state,
      isEditMode: boolean
    };
  },
  [`${actionPrefix}RESET_DATA`]: (state, payload) => {
    return initialState;
  },
  [`${actionPrefix}UPDATE_SORT_INFO`]: (state, payload) => {
    const { sortInfo } = payload;
    return {
      ...state,
      sortInfo: [sortInfo]
    };
  },
  [`${actionPrefix}TOGGLE_COPY_PRICE_MODAL`]: (state, payload) => {
    const { isOpenCopy } = payload;
    return {
      ...state,
      isOpenCopy,
    };
  },
  [`${actionPrefix}GET_EEBOM_COPY_PRICE_SUCCESS`]: (state, payload) => {
    const { data: tableData } = payload;
    return {
      ...state,
      tableData,
    };
  },
  [`${actionPrefix}SET_EEBOM_ALERT`]: (state, payload) => {
    const { alertMessage } = payload;
    return {
      ...state,
      alertMessage,
    };
  },
  [`${actionPrefix}SET_SHOW_PRICE_DIFF`]: (state, payload) => {
    const data = {
      tableData: state.originalTableData,
      filterInfo: state.twoLevelFilterInfo,
      showPriceDiff: payload.showPriceDiff,
      showEXPSpa: state.showEXPSpa,
    };
    let newTableData = Utils.getTableDataWithFilterInfo(data);

    return {
      ...state,
      tableData: newTableData,
      showPriceDiff: payload.showPriceDiff,
    };
  },

  [`${actionPrefix}SET_SHOW_EXP_SPA`]: (state, payload) => {
    const data = {
      tableData: state.originalTableData,
      filterInfo: state.twoLevelFilterInfo,
      showPriceDiff: state.showPriceDiff,
      showEXPSpa: payload.showEXPSpa,
    };
    let newTableData = Utils.getTableDataWithFilterInfo(data);
    return {
      ...state,
      tableData: newTableData,
      showEXPSpa: payload.showEXPSpa,
    };
  },
}, initialState);
