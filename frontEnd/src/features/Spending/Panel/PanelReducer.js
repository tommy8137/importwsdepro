import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import moment from 'moment';

import CommonUtils from '~~utils/CommonUtils';

import { actionTypes, actionPrefix } from './PanelActions';

const waterfallCategoryOptions = [{ label: 'None', value: 'none' }, { label: 'Manufacturer', value: 'manufacturer' }, { label: 'Vendor', value: 'vendor' }];
const waterfallMeasureOptions = [{ label: 'Amount', value: 'amount' }, { label: 'GR-Qty', value: 'grQty' }];
const waterfallCurrencyOptions = [{ label: 'USD', value: 'USD' }, { label: 'NTD', value: 'NTD' }];
const monthVendorSelectionOptions = [{ label: 'Vendor Base', value: 'base' }, { label: 'Vendor Group', value: 'group' }];


const initialState = {
  isFirstTime: true,
  typeList: [],
  filterTypeList: [],
  selectedType1List: [],
  selectedType2List: [],
  type1OptionsList: [],
  type2OptionsList: [],
  supplyTypeList: [],
  supplyTypeOptionsList: [],
  selectedSupplyTypeList: [],
  startDate: null,
  endDate: null,
  waterfallSubmitData: {
    category: waterfallCategoryOptions[0],
    measure: waterfallMeasureOptions[0],
    currency: waterfallCurrencyOptions[0],
    categoryOptions: waterfallCategoryOptions,
    measureOptions: waterfallMeasureOptions
  },
  monthSubmitData: {
    vendorCategoryOptions: monthVendorSelectionOptions,
    vendorCategory: monthVendorSelectionOptions[0]
  },
  waterfallDataChartData: null,
  monthChartData: null,
  waterfallChartModal: false,
  monthChartModal: false,
};

const getTypeOptions = (dataList, typeName) => R.pipe(
  R.map(R.prop(typeName)),
  R.uniq,
  R.map(d => ({ label: d, value: d })),
)(dataList);


const getSupplyTypeOptionsList = (supplyTypeList) => supplyTypeList.map(item => {
  return {
    originalData: item,
    label: item.typeID,
    value: item.sapID
  };
});


const handledefaultTypes = (typeList, newSelectedType1List, newType1OptionsList, currentSelectedType2List) => {
  let specialCondition = {};
  // 如果type1有選項(newType1OptionsList)，但被選到的 Type1是空的(newSelectedType1List)，就以第一個為預設值
  if (newSelectedType1List.length === 0 && newType1OptionsList.length > 0) {
    let selectedType1List = [].concat(newType1OptionsList[0]);

    // selectedType1List 會改變type2OptionsList和selectedType2List
    const type2CandidateList = typeList.filter(item => selectedType1List.find(d => d.value === item.type1));
    const type2OptionsList = getTypeOptions(type2CandidateList, 'type2');
    const selectedType2List = currentSelectedType2List.filter(item => type2OptionsList.find(d => d.value === item.value));
    return {
      selectedType1List,
      type2OptionsList,
      selectedType2List,
    };
  }

  return specialCondition;
};


export default handleActions({
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').BASE]: (state, payload) => {
    const { typeList } = payload;

    // plant & sourcer 會改變type1OptionsList。
    const newType1OptionsList = getTypeOptions(typeList, 'type1');
    // type1OptionsList 會改變selectedType1List
    let newSelectedType1List = state.selectedType1List.filter(item => newType1OptionsList.find(d => d.value === item.value));
    // selectedType1List 會改變type2OptionsList和selectedType2List
    const type2CandidateList = newSelectedType1List.length > 0 ?
      typeList.filter(item => newSelectedType1List.find(d => d.value === item.type1)) : typeList;
    const newType2OptionsList = getTypeOptions(type2CandidateList, 'type2');
    const newSelectedType2List = state.selectedType2List.filter(item => newType2OptionsList.find(d => d.value === item.value));

    // 如果是第一次進來，就要預設selectedType1List顯示第一個
    let specialCondition = handledefaultTypes(typeList, newSelectedType1List, newType1OptionsList, state.selectedType2List);
    return {
      ...state,
      typeList,
      filterTypeList: typeList,
      type1OptionsList: newType1OptionsList,
      type2OptionsList: newType2OptionsList,
      selectedType1List: newSelectedType1List,
      selectedType2List: newSelectedType2List,
      ...specialCondition
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'SET_DEFAULT_TYPES_RELATED__OPTIONS').SUCCESS]: (state, payload) => {
    const { typeList } = payload;
    // 取得新的選項 type1OptionsList。
    const newType1OptionsList = getTypeOptions(typeList, 'type1');
    // 預設全選 selectedType1List
    let newSelectedType1List = newType1OptionsList;
    // 取得新的選項 newType2OptionsList
    const newType2OptionsList = getTypeOptions(typeList, 'type2');
    const newSelectedType2List = newType2OptionsList;
    return {
      ...state,
      typeList,
      filterTypeList: typeList,
      type1OptionsList: newType1OptionsList,
      type2OptionsList: newType2OptionsList,
      selectedType1List: newSelectedType1List,
      selectedType2List: newSelectedType2List,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_SUPPLY_TYPE').SUCCESS]: (state, payload) => {
    const { supplyTypeList } = payload;
    const supplyTypeOptionsList = supplyTypeList.map(item => {
      return {
        originalData: item,
        label: item.typeID,
        value: item.sapID
      };
    });
    // supply type預設是全選
    return {
      ...state,
      supplyTypeList,
      supplyTypeOptionsList,
      selectedSupplyTypeList: supplyTypeOptionsList
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_TYPE1_SELECTED_OPTIONS`]]: (state, payload) => {
    const { selectedType1List } = payload;

    // type1的改變，會影響到type2可以選的選項
    const type2CandidateList = selectedType1List.length > 0 ?
      state.filterTypeList.filter(item => selectedType1List.find(d => d.value === item.type1)) : state.filterTypeList;
    const type2OptionsList = getTypeOptions(type2CandidateList, 'type2');
    // console.log('type2的候選人', type2CandidateList);
    // console.log('type2可以用的選項是', type2OptionsList);

    // type1的改變，會影響到type2已經選的選項
    const selectedType2List = state.selectedType2List.filter(item => type2OptionsList.find(d => d.value === item.value));
    // console.log('新的selectedType2List選項', selectedType2List);
    return {
      ...state,
      selectedType1List,
      type2OptionsList,
      selectedType2List
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_TYPE2_SELECTED_OPTIONS`]]: (state, payload) => {
    const { selectedType2List } = payload;
    return {
      ...state,
      selectedType2List,
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`]]: (state, payload) => {
    const { selectedSupplyTypeList } = payload;
    return {
      ...state,
      selectedSupplyTypeList
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_DATES`]]: (state, payload) => {
    const { startDate, endDate } = payload;
    return {
      ...state,
      startDate,
      endDate,
    };
  },
  [actionTypes[`${actionPrefix}RESET_PANEL`]]: (state, payload) => {
    // call api的部分不應該清空
    const supplyTypeOptionsList = getSupplyTypeOptionsList(state.supplyTypeList);
    return {
      ...initialState,
      supplyTypeList: state.supplyTypeList,
      supplyTypeOptionsList,
      selectedSupplyTypeList: supplyTypeOptionsList
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_WATERFALL_SUBMIT_DATA`]]: (state, payload) => {
    const { key, value } = payload;
    return {
      ...state,
      waterfallSubmitData: {
        ...state.waterfallSubmitData,
        [key]: value
      }
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_WATERFALL_ANALYSIS').SUCCESS]: (state, payload) => {
    return {
      ...state,
      waterfallDataChartData: payload.data,
      waterfallChartModal: true
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_MONTH_SUBMIT_DATA`]]: (state, payload) => {
    const { key, value } = payload;
    return {
      ...state,
      monthSubmitData: {
        ...state.monthSubmitData,
        [key]: value
      }
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_MONTH_ANALYSIS').SUCCESS]: (state, payload) => {
    return {
      ...state,
      monthChartData: payload.data,
      monthChartModal: true
    };
  },
  [actionTypes[`${actionPrefix}TOGGLE_WATERFALL_CHART_MODAL`]]: (state, payload) => {
    return {
      ...state,
      waterfallChartModal: !state.waterfallChartModal,
      waterfallDataChartData: null,
    };
  },
  [actionTypes[`${actionPrefix}TOGGLE_MONTH_CHART_MODAL`]]: (state, payload) => {
    return {
      ...state,
      monthChartModal: !state.monthChartModal,
      monthChartData: null,
    };
  },
  // download rawdata report
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').BASE]: (state, payload) => {
    return {
      ...state,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').SUCCESS]: (state, payload) => {
    return {
      ...state,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  // download summary report
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').BASE]: (state, payload) => {
    return {
      ...state,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').SUCCESS]: (state, payload) => {
    return {
      ...state,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').FAILED]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes[`${actionPrefix}RESET_TYPE_OPTIONS`]]: (state, payload) => {
    return {
      ...state,
      typeList: [],
      filterTypeList: [],
      selectedType1List: [],
      selectedType2List: [],
      type1OptionsList: [],
      type2OptionsList: [],
    };
  },
  [actionTypes[`${actionPrefix}TOGGLE_FIRST_TIME`]]: (state, payload) => {
    return {
      ...state,
      isFirstTime: payload.status
    };
  }
}, initialState);
