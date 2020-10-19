import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import CommonUtils from '~~utils/CommonUtils';

import { actionTypes, actionPrefix } from './CalculatorActions';
import CalculatorUtils from './CalculatorUtils';


const thermalCalculatorTabsGroupByKey = CalculatorUtils.calculatorList.reduce((prev, curr) => {
  return {
    ...prev,
    [curr.value]: []
  };
}, {});

const initialState = {
  thermalStore: {},
  calculatorList: CalculatorUtils.calculatorList,
  thermalConfig: [],
  thermalCalculatorTabs: CalculatorUtils.calculatorList.map(item => ({ calcName: item.label, calcValue: item.value, tabs: [] })),
  thermalCalculatorTotal: 0,
  ...thermalCalculatorTabsGroupByKey
};


export default handleActions({
  [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_THERMAL_CONFIGS').SUCCESS]: (state, payload) => {
    return {
      ...state,
      thermalStore: payload.thermalStore,
      thermalConfig: payload.thermalConfig,
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`]]: (state, payload) => {
    const { calculatorName, tabsData } = payload;
    return {
      ...state,
      [calculatorName]: tabsData
    };
  },
  [actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`]]: (state, payload) => {
    return {
      ...state,
      // thermalCalculatorTotal: CalculatorUtils.checkDecimal(payload.thermalCalculatorTotal),
      thermalCalculatorTotal: payload.thermalCalculatorTotal
    };
  },
  [actionTypes[`${actionPrefix}RESET_DATA`]]: (state, payload) => {
    return initialState;
  }
}, initialState);
