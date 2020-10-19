
// import FakePermissionData from '~~apis/fakeData/FakePermissionData';
import * as CalculatorActions from '../CalculatorActions';

const { actionTypes, actionPrefix } = CalculatorActions;

describe('[CalculatorActions]', () => {
  test('[CalculatorActions][getThermalConfigs()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(CalculatorActions.getThermalConfigs());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_THERMAL_CONFIGS`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[CalculatorActions][updateThermalCalculatorTabsByName()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const calculatorName = 'Fin';
    const tabsData = [];
    await store.dispatch(CalculatorActions.updateThermalCalculatorTabsByName(calculatorName, tabsData));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`]);
    expect(store.getActions()[0].calculatorName).toEqual(calculatorName);
    expect(store.getActions()[0].tabsData).toMatchObject(tabsData);
  });

  test('[CalculatorActions][updateThermalCalculatorTotal()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const thermalCalculatorTotal = 100;
    await store.dispatch(CalculatorActions.updateThermalCalculatorTotal(thermalCalculatorTotal));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`]);
    expect(store.getActions()[0].thermalCalculatorTotal).toEqual(thermalCalculatorTotal);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[CalculatorActions][exportReport()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(CalculatorActions.exportReport());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}EXPORT_REPORT`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[CalculatorActions][resetData()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(CalculatorActions.resetData());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}RESET_DATA`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });
});
