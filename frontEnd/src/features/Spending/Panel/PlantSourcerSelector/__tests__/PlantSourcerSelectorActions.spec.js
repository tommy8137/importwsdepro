
// import FakePermissionData from '~~apis/fakeData/FakePermissionData';
import * as PlantSourcerSelectorActions from '../PlantSourcerSelectorActions';

const { actionTypes, actionPrefix } = PlantSourcerSelectorActions;

describe('[PlantSourcerSelectorActions]', () => {
  test('[PlantSourcerSelectorActions][selectAllPlantsAndSourcers()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedPlantCodeList = ['C01', 'C02'];
    const selectedSourcerCodeList = ['S01', 'S02'];
    await store.dispatch(PlantSourcerSelectorActions.selectAllPlantsAndSourcers(selectedPlantCodeList, selectedSourcerCodeList));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}SELECT_ALL_PLANTS_AND_SOURCERS`]);
    expect(store.getActions()[0].selectedPlantCodeList).toMatchObject(selectedPlantCodeList);
    expect(store.getActions()[0].selectedSourcerCodeList).toMatchObject(selectedSourcerCodeList);
  });

  test('[PlantSourcerSelectorActions][getPlants()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PlantSourcerSelectorActions.getPlants());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_PLANTS`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PlantSourcerSelectorActions][filterAvailablePlantList()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedBadgName = ['EBG'];
    await store.dispatch(PlantSourcerSelectorActions.filterAvailablePlantList(selectedBadgName));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}FILTER_AVAILABLE_PLANT_LIST`]);
    expect(store.getActions()[0].selectedBadgName).toMatchObject(selectedBadgName);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PlantSourcerSelectorActions][updateSelectedPlantOption()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const oldSelectedDataIdList = ['C01', 'C02'];
    const newSelectedDataIdList = ['C01'];
    await store.dispatch(PlantSourcerSelectorActions.updateSelectedPlantOption(oldSelectedDataIdList, newSelectedDataIdList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_SELECTED_PLANT_OR_SOURCER`]);
    expect(store.getActions()[0].oldSelectedDataIdList).toMatchObject(oldSelectedDataIdList);
    expect(store.getActions()[0].newSelectedDataIdList).toMatchObject(newSelectedDataIdList);
    expect(store.getActions()[0].plantOrSourcer).toEqual('plant');
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(4);
  });

  test('[PlantSourcerSelectorActions][getSourcers()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PlantSourcerSelectorActions.getSourcers());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_SOURCERS`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PlantSourcerSelectorActions][filterAvailableRoleList()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedBadgName = ['S01'];
    await store.dispatch(PlantSourcerSelectorActions.filterAvailableRoleList(selectedBadgName));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}FILTER_AVAILABLE_SOURCER_LIST`]);
    expect(store.getActions()[0].selectedBadgName).toMatchObject(selectedBadgName);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PlantSourcerSelectorActions][updateSelectedSourcerOption()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const oldSelectedDataIdList = ['S01', 'S02'];
    const newSelectedDataIdList = ['S01'];
    await store.dispatch(PlantSourcerSelectorActions.updateSelectedSourcerOption(oldSelectedDataIdList, newSelectedDataIdList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_SELECTED_PLANT_OR_SOURCER`]);
    expect(store.getActions()[0].oldSelectedDataIdList).toMatchObject(oldSelectedDataIdList);
    expect(store.getActions()[0].newSelectedDataIdList).toMatchObject(newSelectedDataIdList);
    expect(store.getActions()[0].plantOrSourcer).toEqual('sourcer');
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(4);
  });

  test('[PlantSourcerSelectorActions][resetPanel()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PlantSourcerSelectorActions.resetPanel());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}RESET_PANEL`]);
    // 只有一個參數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });
});
