import FileSaver from 'file-saver';
import jest from 'jest';
import CommonUtils from '~~utils/CommonUtils';
import * as PanelActions from '../PanelActions';

const { actionTypes, actionPrefix } = PanelActions;

describe('[PanelActions]', () => {
  test('[PanelActions][toggleFirstTime()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const status = false;
    await store.dispatch(PanelActions.toggleFirstTime(status));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}TOGGLE_FIRST_TIME`]);
    expect(store.getActions()[0].status).toEqual(status);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });
  test('[PanelActions][resetTypeOptions()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.resetTypeOptions());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}RESET_TYPE_OPTIONS`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });
  test('[PanelActions][initAction()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.initAction());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}INIT_ACTION`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][getTypes()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const typeList = [
      { type1: 'Connector', type2: null },
      { type1: 'HDD', type2: null },
      { type1: 'RES', type2: 'RES-SMD' },
      { type1: 'MLCC', type2: 'MLCC-SMD' }
    ];

    await store.dispatch(PanelActions.getTypes(typeList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').BASE);
    expect(store.getActions()[0].typeList).toMatchObject(typeList);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][updateType1SelectedOptions()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedItemList = [
      { label: 'CPU', value: 'CPU' },
      { label: 'RES', value: 'RES' }
    ];
    await store.dispatch(PanelActions.updateType1SelectedOptions(selectedItemList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_TYPE1_SELECTED_OPTIONS`]);
    expect(store.getActions()[0].selectedType1List).toMatchObject(selectedItemList);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][updateType2SelectedOptions()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedItemList = [
      { label: 'MLCC-SMD', value: 'MLCC-SMD' },
      { label: 'Others', value: 'Others' }
    ];
    await store.dispatch(PanelActions.updateType2SelectedOptions(selectedItemList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_TYPE2_SELECTED_OPTIONS`]);
    expect(store.getActions()[0].selectedType2List).toMatchObject(selectedItemList);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][updateSupplyTypeSelectedOptions()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const selectedItemList = [
      {
        label: 'B',
        originalData: { typeID: 'B', category: 'OEM', sapID: 1 },
        value: 1
      }
    ];
    await store.dispatch(PanelActions.updateSupplyTypeSelectedOptions(selectedItemList));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`]);
    expect(store.getActions()[0].selectedSupplyTypeList).toMatchObject(selectedItemList);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][getSupplyTypes()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.getSupplyTypes());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_SUPPLY_TYPE`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][updateDates()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const dates = {
      startDate: '2018-11-01',
      endDate: '2018-11-10',
    };
    await store.dispatch(PanelActions.updateDates(dates));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_DATES`]);
    expect(store.getActions()[0].startDate).toEqual(dates.startDate);
    expect(store.getActions()[0].endDate).toEqual(dates.endDate);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(3);
  });

  test('[PanelActions][resetPanel()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.resetPanel());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}RESET_PANEL`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][updateWaterfallSubmitData()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const key = 'category';
    const value = { label: 'Manufacturer', value: 'manufacturer' };
    await store.dispatch(PanelActions.updateWaterfallSubmitData(key, value));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_WATERFALL_SUBMIT_DATA`]);
    expect(store.getActions()[0].key).toEqual(key);
    expect(store.getActions()[0].value).toMatchObject(value);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(3);
  });

  test('[PanelActions][getWaterfallAnalysis()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.getWaterfallAnalysis());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_WATERFALL_ANALYSIS`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][setDefaultTypesRelatedOptions()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.setDefaultTypesRelatedOptions());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}SET_DEFAULT_TYPES_RELATED__OPTIONS`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][getMonthAnalysis()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.getMonthAnalysis());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}GET_MONTH_ANALYSIS`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][updateMonthSubmitData()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const key = 'vendorCategory';
    const value = { label: 'Vendor Base', value: 'base' };
    await store.dispatch(PanelActions.updateMonthSubmitData(key, value));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}UPDATE_MONTH_SUBMIT_DATA`]);
    expect(store.getActions()[0].key).toEqual(key);
    expect(store.getActions()[0].value).toMatchObject(value);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(3);
  });

  test('[PanelActions][toggleWaterfallChartModal()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.toggleWaterfallChartModal());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}TOGGLE_WATERFALL_CHART_MODAL`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  test('[PanelActions][toggleMonthChartModal()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(PanelActions.toggleMonthChartModal());
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}TOGGLE_MONTH_CHART_MODAL`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(1);
  });

  /**
   * 下載raw data報表
   */
  test('[PanelActions][downloadRawReport()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const querydata = {
      plant: ['F120'],
      user: ['SM3'],
      dateForm: '2018-01-01',
      dateTo: '2018-01-02',
      type1: ['ASIC'],
      type2: [],
      supplyType: [1],
    };
    await store.dispatch(PanelActions.downloadRawReport(querydata));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_RAW_REPORT`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][downloadRawReportSuccess()]可以發action: 後端給正確檔名', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const getOptions = (filename) => ({
      'content-disposition': `attachment; filename="${filename}"`,
      'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const mockblob = global.Blob;

    const filename1 = 'Spending_raw_2018125.xlsx';
    const options1 = getOptions(filename1);
    await store.dispatch(PanelActions.downloadRawReportSuccess({ data: 'fake data', headers: { ...options1 } }));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_RAW_REPORT_SUCCESS`]);
    // 測試有FileSaver收到的資料是正確的
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      mockblob(['fake data'], { type: options1['content-type'] }),
      filename1
    );

    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][downloadRawReportSuccess()]可以發action: 後端沒有給正確檔名', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const mockblob = global.Blob;

    const defaultFilename = 'Spending_raw.zip';
    const options2 = {
      'content-type': 'application/zip',
    };
    await store.dispatch(PanelActions.downloadRawReportSuccess({ data: 'fake data', headers: { ...options2 } }));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_RAW_REPORT_SUCCESS`]);
    // 測試有FileSaver收到的資料是正確的
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      mockblob(['fake data'], { type: options2['content-type'] }),
      defaultFilename
    );
  });

  test('[PanelActions][downloadRawReportFailed()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const error = 'some error...';
    await store.dispatch(PanelActions.downloadRawReportFailed(error));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_RAW_REPORT_FAILED`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });


  /**
   * 下載summary report報表
 */
  test('[PanelActions][downloadSummaryReport()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const querydata = {
      plant: ['F120'],
      user: ['SM3'],
      dateForm: '2018-01-01',
      dateTo: '2018-01-02',
      type1: ['ASIC'],
      type2: [],
      supplyType: [1],
    };
    await store.dispatch(PanelActions.downloadSummaryReport(querydata));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_SUMMARY_REPORT`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][downloadSummaryReportSuccess()]可以發action: 後端給正確檔名', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const getOptions = (filename) => ({
      'content-disposition': `attachment; filename="${filename}"`,
      'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const mockblob = global.Blob;

    const filename1 = 'Spending_sum_20181205.xlsx';
    const options1 = getOptions(filename1);
    await store.dispatch(PanelActions.downloadSummaryReportSuccess({ data: 'fake data', headers: { ...options1 } }));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_SUMMARY_REPORT_SUCCESS`]);
    // 測試有FileSaver收到的資料是正確的
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      mockblob(['fake data'], { type: options1['content-type'] }),
      filename1
    );

    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][downloadSummaryReportSuccess()]可以發action: 後端沒有給正確檔名', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const mockblob = global.Blob;

    const defaultFilename = 'Spending_sum.xlsx';
    const options2 = {
      'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    await store.dispatch(PanelActions.downloadSummaryReportSuccess({ data: 'fake data', headers: { ...options2 } }));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_SUMMARY_REPORT_SUCCESS`]);
    // 測試有FileSaver收到的資料是正確的
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      mockblob(['fake data'], { type: options2['content-type'] }),
      defaultFilename
    );


    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });

  test('[PanelActions][downloadSummaryReportFailed()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const error = 'some error...';
    await store.dispatch(PanelActions.downloadSummaryReportFailed(error));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(actionTypes[`${actionPrefix}DOWNLOAD_SUMMARY_REPORT_FAILED`]);
    // 確認參數個數
    expect(Object.keys(store.getActions()[0]).length).toEqual(2);
  });
});
