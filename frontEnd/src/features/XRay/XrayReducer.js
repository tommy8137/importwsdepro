import { handleActions } from 'redux-actions';
import FakeXrayData from '~~apis/fakeData/FakeXrayData';
import _ from 'lodash';
import * as R from 'ramda';
import {
  getCeSpecGroup,
  setSpecGroupSpecN,
  getIsHighlightSpecGroup,
} from '~~features/XRay/XrayUtils';
import { actionTypes } from '~~features/XRay/XrayActions';
import { XRAY_ROLES, XRAY_TYPES, XRAY_EMPTY_SPECITEM, XRAY_EMPTY_SPECGROUP } from '~~features/XRay/XrayConst';

const { fakeSpaData } = FakeXrayData;

const defaultSelected = {
  productType: [],
  type1: [],
  type2: [],
  sourcer: [],
};

const emptySpaForm = {
  dateFrom: null,
  dateTo: null,
  mrp: false,
  block: false,
  type1: '',
  type2: '',
  productType: '',
  spec: XRAY_EMPTY_SPECGROUP
};

const emptyLppForm = {
  mrp: false,
  type1: '',
  type2: '',
  spec: XRAY_EMPTY_SPECGROUP
};

const emptySpaData = {
  specProperty: [],
  infoProperty: [],
  materialList: [],
  minUnitPrice: 0,
  maxUnitPrice: 0,
  supplyTypeList: []
};

const emptyLppData = {
  materialPriceList: [],
  supplyTypeList: []
};


const initialState = {
  referencePN: '',
  roleType: '',
  searchBy: XRAY_TYPES.CATEGORY,
  analysisForm: {
    spaForm: emptySpaForm,
    lppForm: emptyLppForm
  },
  edit: false,
  specGroupList: [],
  spaData: {
    specTitle: [],
    specProperty: [],
    infoProperty: [],
    materialList: [],
    minUnitPrice: 0,
    maxUnitPrice: 0,
    supplyTypeList: [],
  },
  maxPriceDiff: 0,
  spaFilter: {
    supplyTypeList: [],
    minPrice: 0,
    maxPrice: 0,
    intervalEnable: false,
    rangeEnable: false,
    interval: {
      min: 0,
      max: 0
    },
    range: {
      min: 10,
      max: 10000
    },
  },
  specGroupID: '',
  selected: defaultSelected,
  specItem: XRAY_EMPTY_SPECITEM,
  originSpecItem: XRAY_EMPTY_SPECITEM,
  productType: [],
  type1List: [],
  type2List: [],
  sourcerList: [],
  searchbarStatus: {
    productType: false,
    type1: false,
    type2: false,
    sourcerList: false
  },
  // 30個spec的Spec title
  specTitle: [],
  // 套用 CE 提供的Spec Grouping 組合
  ceSpecGroup: [],
  mrp: false,
  block: false,
  exp: false,
};


export default handleActions({
  [actionTypes.XRAY___SET_REFERENCEPN]: (state, payload) => {
    const { referencePN } = payload;
    return {
      ...state,
      referencePN
    };
  },
  [actionTypes.XRAY___SET_SEARCHBY]: (state, payload) => {
    const { searchBy } = payload;

    // EE預設全選所有的product type
    const needSelectAllProductType =
      state.roleType === XRAY_ROLES.EE && searchBy === XRAY_TYPES.CATEGORY;

    return {
      ...state,
      searchBy,
      edit: false,
      selected: {
        ...initialState.selected,
        productType: needSelectAllProductType ? state.productType : initialState.productType
      },
      specTitle: [],
      specItem: initialState.specItem,
      originSpecItem: initialState.specItem,
      referencePN: initialState.referencePN,
    };
  },
  [actionTypes.XRAY___GET_SPECITEM_BY_PARTNUMBER_SUCCESS]: (state, payload) => {
    const { specData: { productType, type1, type2, ceSpecGroup = [], specTitle, spec: specGroup } } = payload;

    // 預設把所有isHighlight勾起來
    const newCeSpecGroup = getIsHighlightSpecGroup(specGroup, ceSpecGroup);

    const newSpecItem = {
      ...initialState.specItem,
      type1,
      type2,
      sourcer: [],
      productType,
      specGroup: newCeSpecGroup
    };

    return {
      ...state,
      selected: {
        productType,
        type1: [type1],
        type2: [type2],
        sourcer: [],
      },
      specTitle,
      specItem: newSpecItem,
      originSpecItem: newSpecItem,
      ceSpecGroup
    };
  },
  /**
   * 點選我的最愛下拉的specGroup後，call api回傳得到的specGroup組合
   */
  [actionTypes.XRAY___GET_GROUPITEM_SUCCESS]: (state, payload) => {
    const { ceSpecGroup, specItem, specItem: { specTitle, type1, type2, sourcer, productType } } = payload;

    return {
      ...state,
      // 拿到下拉選單的值之後，把所選擇的type1, type2帶入下拉選單中
      selected: {
        productType,
        type1: [type1],
        type2: [type2],
        sourcer,
      },
      specTitle: specTitle || [],
      specItem,
      originSpecItem: specItem,
      // 選擇下拉選單時， 沒有預設CE specGroup 給他選
      ceSpecGroup: []
    };
  },
  /**
   * 設定下拉的目前所選的值
   */
  [actionTypes.XRAY___SET_SELECTED]: (state, payload) => {
    return {
      ...state,
      selected: payload.selected || defaultSelected
    };
  },
  /**
   * 當按下 reset 的叉叉的時候
   */
  [actionTypes.XRAY___RESET_SPECITEM]: (state, payload) => {
    return {
      ...state,
      referencePN: initialState.referencePN,
      edit: initialState.edit,
      specItem: initialState.specItem,
      originSpecItem: initialState.originSpecItem,
      specTitle: initialState.specTitle,
      // reset filter
      type1List: initialState.type1List,
      type2List: initialState.type2List,
      sourcerList: initialState.sourcerList,
      // ce group 預設組合
      ceSpecGroup: initialState.ceSpecGroup,
      selected: {
        ...state.selected,
        // product type預設全選所以就不重置了
        type1: initialState.selected.type1,
        type2: initialState.selected.type2,
        sourcer: initialState.selected.sourcer,
      },
    };
  },
  /**
   * reset spa table
   */
  [actionTypes.XRAY___RESET_SPA]: (state, payload) => {
    return {
      ...state,
      spaData: initialState.spaData,
      spaFilter: initialState.spaFilter
    };
  },
  /**
   * 設定me/ee的tab
   */
  [actionTypes.XRAY___SET_ROLETYPE]: (state, payload) => {
    return {
      ...state,
      roleType: payload.roleType,
      searchBy: initialState.searchBy,
      ceSpecGroup: initialState.ceSpecGroup,
    };
  },
  //  GET PRODUCTTYPE LIST SUCCESS
  [actionTypes.XRAY___GET_PRODUCTTYPE_LIST]: (state, payload) => {
    return {
      ...state,
      searchbarStatus: {
        ...state.searchbarStatus,
        productType: true
      }
    };
  },
  [actionTypes.XRAY___GET_PRODUCTTYPE_LIST_SUCCESS]: (state, payload) => {
    const { productType } = payload;
    return {
      ...state,
      productType,
      type1List: [],
      type2List: [],
      sourcerList: [],
      selected: {
        ...state.selected,
        // 因為預設全選的關係，所以一開始就把拿到的product
        productType
      },
      searchbarStatus: {
        ...state.searchbarStatus,
        productType: false
      }
    };
  },
  //  GET TYPE1 LIST SUCCESS
  [actionTypes.XRAY___GET_TYPE1_LIST]: (state, payload) => {
    return {
      ...state,
      searchbarStatus: {
        ...state.searchbarStatus,
        type1: true
      }
    };
  },
  [actionTypes.XRAY___GET_TYPE1_LIST_SUCCESS]: (state, payload) => {
    const { type1List } = payload;
    return {
      ...state,
      type1List,
      type2List: [],
      sourcerList: [],
      searchbarStatus: {
        ...state.searchbarStatus,
        type1: false
      }
    };
  },
  //  GET TYPE2 LIST SUCCESS
  [actionTypes.XRAY___GET_TYPE2_LIST]: (state, payload) => {
    return {
      ...state,
      type2List: [],
      searchbarStatus: {
        ...state.searchbarStatus,
        type2: true
      }
    };
  },
  [actionTypes.XRAY___GET_TYPE2_LIST_SUCCESS]: (state, payload) => {
    const { type2List } = payload;
    return {
      ...state,
      type2List,
      sourcerList: [],
      searchbarStatus: {
        ...state.searchbarStatus,
        type2: false
      }
    };
  },
  /** GET SOURCER LIST */
  [actionTypes.XRAY___GET_SOURCER_LIST]: (state, payload) => {
    const { sourcerList } = payload;
    return {
      ...state,
      searchbarStatus: {
        ...state.searchbarStatus,
        sourcerList: true
      }
    };
  },
  // GET SOURCER LIST SUCCESS
  [actionTypes.XRAY___GET_SOURCER_LIST_SUCCESS]: (state, payload) => {
    const { sourcerList } = payload;
    return {
      ...state,
      sourcerList,
      searchbarStatus: {
        ...state.searchbarStatus,
        sourcerList: false
      }
    };
  },
  [actionTypes.XRAY___GET_SOURCER_LIST_FAILED]: (state, payload) => {
    return {
      ...state,
      sourcerList: [],
      searchbarStatus: {
        ...state.searchbarStatus,
        sourcerList: false
      }
    };
  },
  //  GET SPECGROUP LIST
  [actionTypes.XRAY___GET_SPEC_GROUP_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      specGroupList: payload.specGroupList,
    };
  },
  // GET [EE] SPEC ITEMS LIST SUCCESS: 按下搜尋後的事件
  [actionTypes.XRAY___GET_SPEC_ITEMS_LIST_SUCCESS]: (state, payload) => {
    const { specTitle, specItemsList, ceSpecGroup = [] } = payload;
    const specGroup = _.mapValues(specItemsList, sp => sp.map(o => ({ item_name: o, value: false })));

    const specItem = {
      ...initialState.specItem,
      specGroup
    };
    // 把ceSpecgroup預設值帶入目前的specGroup
    const newCeSpecGroup = getCeSpecGroup(specGroup, ceSpecGroup);

    const ceSpecItem = {
      ...specItem,
      specGroup: newCeSpecGroup
    };

    // 是否需要套用預設ce_group: 假如list是空的 且 list裡面不是全部都是false
    const needUseCeSpecGroup = ceSpecGroup.length > 0;

    // 有ceGroup的話就用ceGroup組合當預設值
    const newSpecItem = needUseCeSpecGroup ? ceSpecItem : specItem;

    return {
      ...state,
      specTitle: specTitle || [],
      specItem: newSpecItem,
      originSpecItem: newSpecItem,
      ceSpecGroup
    };
  },

  /**
 * ME:設定specN的時候, 把後面的spec都清掉
 */
  [actionTypes.XRAY___SET_SPECITEM]: (state, payload) => {
    const { specItem, specItem: { specGroup }, specN } = payload;
    const keys = R.keys(specGroup);
    const clearSpecItem = R.set(R.lensProp('specGroup'), _.mapValues(specGroup, (o, k) => (keys.indexOf(k) + 1 >= specN ? [] : o)), specItem);
    return {
      ...state,
      specItem: specN ? clearSpecItem : specItem,
    };
  },

  [actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST]: (state, payload) => {
    return {
      ...state,
    };
  },
  /**
   * ME: 取得specN的spec list, 由於ME是一個一個選的， 所以只能一次取得一個specN的值
   */
  [actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST_SUCCESS]: (state, payload) => {
    const { specItem } = state;
    const { specItemsList: { key: specN, spec, specTitle } } = payload;
    const newSpecItem = setSpecGroupSpecN(specItem, specN, spec);

    return {
      ...state,
      // 在ME搜尋的時候, 不使用specTitle
      specTitle: specTitle || [],
      specItem: newSpecItem,
      originSpecItem: newSpecItem,
    };
  },
  // POST ADD SEPECGROUP
  [actionTypes.XRAY___POST_ADD_SPEC_GROUP]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.XRAY___POST_ADD_SPEC_GROUP_SUCCESS]: (state, payload) => {
    return {
      ...state,
      edit: false,
      specGroupID: payload.specGroupID,
    };
  },

  [actionTypes.XRAY___POST_ADD_SPEC_GROUP_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  // DELETE SPECGROUP
  [actionTypes.XRAY___DELETE_SPEC_GROUP]: (state, payload) => {
    return {
      ...state,
      specGroupID: payload.specGroupID,
    };
  },
  [actionTypes.XRAY___DELETE_SPEC_GROUP_SUCCESS]: (state, payload) => {
    return {
      ...state,
      edit: false,
      specItem: initialState.specItem,
      specGroupID: payload.specGroupID,
    };
  },
  [actionTypes.XRAY___DELETE_SPEC_GROUP_FAIL]: (state, payload) => {
    return {
      ...state,
    };
  },
  // PUT SPECGROUP
  [actionTypes.XRAY___PUT_SPEC_GROUP]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.XRAY___PUT_SPEC_GROUP_SUCCESS]: (state, payload) => {
    return {
      ...state,
      edit: false,
      specGroupID: payload.specGroupID,
    };
  },
  [actionTypes.XRAY___PUT_SPEC_GROUP_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  // POST SPA ANALYSIS
  [actionTypes.XRAY___POST_SPA_ANALYSIS]: (state, payload) => {
    return {
      ...state,
      spaForm: payload.data,
    };
  },
  [actionTypes.XRAY___POST_SPA_ANALYSIS_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  // GET_XRAY_ANALYSIS : SPA
  [actionTypes.XRAY___SET_XRAY_ANALYSIS_FORM]: (state, payload) => {
    return {
      ...state,
      analysisForm: payload.analysisForm
    };
  },
  [actionTypes.XRAY___INIT_XRAY]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.XRAY___INIT_XRAY_SUCCESS]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.XRAY___INIT_XRAY_FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  // SET SPEC
  [actionTypes.XRAY___SET_EDIT]: (state, payload) => {
    return {
      ...state,
      edit: payload.edit
    };
  },
  // SET FAKE ANALYSIS
  [actionTypes.XRAY___RESET_ANALYSIS]: (state, payload) => {
    return {
      ...state,
      lppData: {
        ...emptyLppData
      },
      spaData: {
        ...emptySpaData
      }
    };
  },
  // SET SPA FILTER
  [actionTypes.XRAY___SET_SPA_FILTER]: (state, payload) => {
    const getSpaFilter = (filter) => {
      if (filter) { return filter; }
      const { spaData, spaData: { minUnitPrice, maxUnitPrice, materialList, supplyTypeList } } = state;
      const maxPriceDiff = _.max(materialList.map(m => parseFloat(m.infoList.priceDiff)));
      return {
        supplyTypeList,
        interval: {
          min: minUnitPrice,
          max: maxUnitPrice
        },
        range: {
          min: 0,
          max: maxPriceDiff
        }
      };
    };
    return {
      ...state,
      spaFilter: getSpaFilter(payload.filter)
    };
  },
  // GET SPA ANALYSIS SUCCESS
  [actionTypes.XRAY___POST_SPA_ANALYSIS_SUCCESS]: (state, payload) => {
    const { spaData, spaData: { minUnitPrice, maxUnitPrice, materialList, supplyTypeList } } = payload;
    // 最高的價差百分比
    const maxPriceDiff = _.max(materialList.map(m => parseFloat(m.infoList.priceDiff)));

    return {
      ...state,
      maxPriceDiff,
      spaData,
      spaFilter: {
        supplyTypeList,
        interval: {
          min: minUnitPrice || 0,
          max: maxUnitPrice || 0
        },
        range: {
          min: 0,
          max: maxPriceDiff || 0
        }
      },
    };
  },
  [actionTypes.XRAY___SET_FAKE_SPA]: (state, payload) => {
    const { minUnitPrice, maxUnitPrice, materialList, supplyTypeList } = fakeSpaData;
    // 找到最高的價差百分比，把他設定成filter的最大值
    const maxPriceDiff = _.max(materialList.map(m => parseFloat(m.infoList.priceDiff)));

    return {
      ...state,
      maxPriceDiff,
      spaData: fakeSpaData,
      spaFilter: {
        supplyTypeList,
        interval: {
          min: minUnitPrice,
          max: maxUnitPrice
        },
        range: {
          min: 0,
          max: maxPriceDiff
        }
      },
    };
  },
}, initialState);
