import * as R from 'ramda';
import uuid from 'uuid';

import CommonUtils from '~~utils/CommonUtils';


export const actionPrefix = 'SPENDING_PANEL_PLANT_SOURCER_SELECTOR___';
export const actionTypes = {
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_PLANTS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'FILTER_AVAILABLE_PLANT_LIST').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_SELECTED_PLANT_OR_SOURCER').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_SOURCERS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'FILTER_AVAILABLE_SOURCER_LIST').template,
  [`${actionPrefix}RESET_PANEL`]: `${actionPrefix}RESET_PANEL`,
  [`${actionPrefix}SELECT_ALL_PLANTS_AND_SOURCERS`]: `${actionPrefix}SELECT_ALL_PLANTS_AND_SOURCERS`,
};


export function selectAllPlantsAndSourcers(selectedPlantCodeList, selectedSourcerCodeList) {
  return {
    type: actionTypes[`${actionPrefix}SELECT_ALL_PLANTS_AND_SOURCERS`],
    selectedPlantCodeList,
    selectedSourcerCodeList
  };
}

// 取得所有廠的資料
export function getPlants() {
  return {
    type: actionTypes[`${actionPrefix}GET_PLANTS`],
  };
}

// 快速篩選想要的部門
export function filterAvailablePlantList(selectedBadgName) {
  return {
    type: actionTypes[`${actionPrefix}FILTER_AVAILABLE_PLANT_LIST`],
    selectedBadgName
  };
}

// 更新 選擇的廠
export function updateSelectedPlantOption(oldSelectedDataIdList, newSelectedDataIdList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_SELECTED_PLANT_OR_SOURCER`],
    oldSelectedDataIdList,
    newSelectedDataIdList,
    plantOrSourcer: 'plant'
  };
}

/* ****************************** sourcer相關 ****************************** */
// 取得所有sourcer的資料
export function getSourcers() {
  return {
    type: actionTypes[`${actionPrefix}GET_SOURCERS`]
  };
}


// 快速篩選想要的角色
export function filterAvailableRoleList(selectedBadgName) {
  return {
    type: actionTypes[`${actionPrefix}FILTER_AVAILABLE_SOURCER_LIST`],
    selectedBadgName
  };
}

// 更新 選擇的sourcer選項
export function updateSelectedSourcerOption(oldSelectedDataIdList, newSelectedDataIdList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_SELECTED_PLANT_OR_SOURCER`],
    oldSelectedDataIdList,
    newSelectedDataIdList,
    plantOrSourcer: 'sourcer'
  };
}
/* ****************************** sourcer相關 END ****************************** */

export function resetPanel() {
  return {
    type: actionTypes[`${actionPrefix}RESET_PANEL`],
  };
}
