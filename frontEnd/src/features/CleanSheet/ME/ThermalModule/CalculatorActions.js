import * as R from 'ramda';

import CommonUtils from '~~utils/CommonUtils';


export const actionPrefix = 'COST_GENERATOR_CALCULATOR___';
export const actionTypes = {
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_THERMAL_CONFIGS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'EXPORT_REPORT').template,
  [`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`]: `${actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`,
  [`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`]: `${actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`,
  [`${actionPrefix}RESET_DATA`]: `${actionPrefix}RESET_DATA`,
};


export function getThermalConfigs() {
  return {
    type: actionTypes[`${actionPrefix}GET_THERMAL_CONFIGS`]
  };
}

export function updateThermalCalculatorTabsByName(calculatorName, tabsData) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`],
    calculatorName,
    tabsData
  };
}

export function updateThermalCalculatorTotal(thermalCalculatorTotal) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`],
    thermalCalculatorTotal
  };
}

export function exportReport() {
  return {
    type: actionTypes[`${actionPrefix}EXPORT_REPORT`]
  };
}

export function resetData() {
  return {
    type: actionTypes[`${actionPrefix}RESET_DATA`]
  };
}
