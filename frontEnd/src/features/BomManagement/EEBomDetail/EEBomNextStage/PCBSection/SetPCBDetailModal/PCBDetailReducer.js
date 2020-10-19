import { handleActions } from 'redux-actions';
import _mapKeys from 'lodash/mapKeys';
import _has from 'lodash/has';
import _set from 'lodash/set';
import { actionTypes } from './PCBDetailActions';
import { PATH, MODAL_ACTION, BOARD_TYPE } from './PcbDetailConst';

const defaultPcbItem = {
  edm_version_id: '',
  is_count: false,
  type: BOARD_TYPE.MAIN,
  qty: 1,
  content: {},
  supply_type: null,
};

const initialState = {
  edmVersionID: '',
  PCBList: [],
  pcbItem: defaultPcbItem,
  pcbModalInfo: {
    plant: '',
    wistronpn: '',
    title: 'Set PCB Detail',
    path: PATH.PCB_DETAIL_MODAL,
    boardType: BOARD_TYPE.MAIN,
    actionType: MODAL_ACTION.ADD,
    isViewMode: false,
  },
  pcbLayout: null,
  delInfo: {
    [BOARD_TYPE.MAIN]: [],
    [BOARD_TYPE.SMALL]: []
  },
  pcbSortInfo: [
    {
      sortOrder: 'ascend',
      dataIndex: 'name_a'
    }
  ],
};

export default handleActions({
  [actionTypes.EEBOM___GET_PCB_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      PCBList: payload.list,
      pcbModalInfo: {
        ...state.pcbModalInfo,
        plant: payload.plant,
      },
      edmVersionID: payload.edmVersionID
    };
  },

  [actionTypes.EEBOM___SET_PCB_ITEM]: (state, payload) => {
    const { pcbItem } = payload;
    let item;
    if (pcbItem) {
      // 處理PcbPartNumber沒有supply_type的舊資料
      const pathOfSupplyType = ['content', 'formData', 'pcbTab', 'PcbPartNumber', 'supply_type'];
      const hasSupplyType = _has(pcbItem, pathOfSupplyType);
      item = hasSupplyType ? pcbItem : _set(pcbItem, pathOfSupplyType, pcbItem.supply_type);
    } else item = defaultPcbItem;
    return {
      ...state,
      pcbItem: item,
    };
  },

  [actionTypes.EEBOM___SET_PCB_MODAL_PATH]: (state, payload) => {
    return {
      ...state,
      pcbModalInfo: {
        ...state.pcbModalInfo,
        ...payload.info,
      }
    };
  },

  [actionTypes.EEBOM___GET_SPEC_BY_PN_SUCCESS]: (state, payload) => {
    const convertData = _mapKeys(payload.spec, (value, key) => {
      if (key.indexOf('spec') === 0) { return key.toUpperCase(); }
      return key;
    });
    const spec = Object.keys(convertData).reduce((acc, key) => {
      const item = convertData[key];
      if (typeof item === 'string') return { ...acc, [key]: item.trim() };
      if (Array.isArray(item)) return { ...acc, [key]: item.map(i => (typeof i === 'string' ? i.trim() : i)) };
      return { ...acc, [key]: item };
    }, {});
    return {
      ...state,
      pcbItem: {
        ...state.pcbItem,
        content: spec,
        supply_type: spec.supply_type,
        spec,
      }
    };
  },

  [actionTypes.EEBOM___GET_PCB_LAYOUT_SUCCESS]: (state, payload) => {
    const { pcbLayout } = payload;
    return {
      ...state,
      pcbLayout,
    };
  },

  [actionTypes.EEBOM___RESET_PCB_LAYOUT]: (state, payload) => {
    return {
      ...state,
      pcbLayout: null,
    };
  },

  [actionTypes.EEBOM___SET_DEL_INFO]: (state, payload) => {
    const { board, list } = payload;
    return {
      ...state,
      delInfo: {
        ...state.delInfo,
        [board]: list
      },
    };
  },

  [actionTypes.EEBOM___UPDATE_PCB_SORT_INFO]: (state, payload) => {
    return {
      ...state,
      pcbSortInfo: payload.sortInfo,
    };
  },
}, initialState);
