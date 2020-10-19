import { handleActions } from 'redux-actions';

import CommonUtils from '~~utils/CommonUtils';

import { actionTypes, actionPrefix } from './PlantSourcerSelectorActions';


const initialState = {
  plants: [],
  filteredPlants: [],
  selectedPlantCodeList: [],
  selectedFilteredBgList: [],
  plantsGroupByBg: {},

  sourcers: [],
  filteredSourcers: [],
  selectedSourcerCodeList: [],
  selectedFilteredRoleList: [],
  sourcersGroupByRole: {},

  checkoutPoint: {
    plant: [],
    scode: []
  }
};

export default handleActions({
  [actionTypes[`${actionPrefix}SELECT_ALL_PLANTS_AND_SOURCERS`]]: (state, payload) => {
    const { selectedPlantCodeList, selectedSourcerCodeList } = payload;
    return {
      ...state,
      selectedPlantCodeList,
      selectedSourcerCodeList
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_PLANTS').success]: (state, payload) => {
    const { data, dataBroupByBageName } = payload;
    return {
      ...state,
      plants: data,
      filteredPlants: data,
      plantsGroupByBg: dataBroupByBageName
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'FILTER_AVAILABLE_PLANT_LIST').success]: (state, payload) => {
    const { filteredDataList, newSelectedBadgeList } = payload;
    return {
      ...state,
      filteredPlants: filteredDataList,
      selectedFilteredBgList: newSelectedBadgeList
    };
  },
  /* **********************************  Sourcer  ********************************** */
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_SOURCERS').success]: (state, payload) => {
    const { data, dataBroupByBageName } = payload;
    return {
      ...state,
      sourcers: data,
      filteredSourcers: data,
      sourcersGroupByRole: dataBroupByBageName
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'FILTER_AVAILABLE_SOURCER_LIST').success]: (state, payload) => {
    const { filteredDataList, newSelectedBadgeList } = payload;
    return {
      ...state,
      filteredSourcers: filteredDataList,
      selectedFilteredRoleList: newSelectedBadgeList
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_SELECTED_PLANT_OR_SOURCER').base]: (state, payload) => {
    if (payload.plantOrSourcer === 'plant') {
      return {
        ...state,
        selectedPlantCodeList: payload.newSelectedDataIdList
      };
    }
    if (payload.plantOrSourcer === 'sourcer') {
      return {
        ...state,
        selectedSourcerCodeList: payload.newSelectedDataIdList
      };
    }
    return {
      ...state,
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_SELECTED_PLANT_OR_SOURCER').success]: (state, payload) => {
    console.log('payload.checkoutPoint', payload.checkoutPoint);
    // 記錄這次成功的組合
    return {
      ...state,
      checkoutPoint: payload.checkoutPoint
    };
  },
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_SELECTED_PLANT_OR_SOURCER').failed]: (state, payload) => {
    console.log('payload', payload);
    // console.log('返回上一次紀錄的checkpoint', state.filteredPlants);
    // console.log('返回上一次紀錄的checkpoint', state.filteredSourcers);
    // // 如果有使用filter的功能，那回到checkpoint資料也不會正確，這時應該直接把type1, typ2的資料也清空
    // let selectedPlantCodeList = state.checkoutPoint.plant.filter(item => state.filteredPlants.find(i => i.plant === item));
    // let selectedSourcerCodeList = state.checkoutPoint.scode.filter(item => state.filteredSourcers.find(i => i.scode === item));
    return {
      ...state,
      selectedPlantCodeList: payload.selectedPlantCodeList,
      selectedSourcerCodeList: payload.selectedSourcerCodeList
    };
  },
  [actionTypes[`${actionPrefix}RESET_PANEL`]]: (state, payload) => {
    return {
      ...state,
      filteredPlants: state.plants,
      selectedPlantCodeList: [],
      selectedFilteredBgList: [],
      filteredSourcers: state.sourcers,
      selectedSourcerCodeList: [],
      selectedFilteredRoleList: [],
      checkoutPoint: {
        plant: [],
        scode: []
      }
    };
  },
}, initialState);
