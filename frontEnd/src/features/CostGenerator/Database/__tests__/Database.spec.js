import FileSaver from 'file-saver';
import moment from 'moment';
import * as DatabaseActions from '../CostGeneratorDatabaseActions';

jest.mock('file-saver');
jest.mock('moment', () => ({
  utc: jest.fn(() => {
    return {
      local: jest.fn(() => {
        return {
          format: jest.fn(() => '2018-12-17 13:02')
        };
      }),
    };
  }),
}));

describe('[CostGeneratorDatabaseActions]', () => {
  test('[CostGeneratorDatabaseActions][getTableTypeList()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getTableTypeList());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action key只有一個
    expect(store.getActions()[0]).toEqual({ type: DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST });
  });

  test('[CostGeneratorDatabaseActions][getTableTypeListSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: {
        list: [
          'Pipe',
          'Screw',
          'Fin',
          'ThermalBlock',
          'Grease',
          'Sponge',
          'Fan',
          'ThermalPad',
          'ThermalPlate'
        ] }
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getTableTypeListSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_SUCCESS);
    expect(store.getActions()[0].tableTypeList).toMatchObject(response.data.list);
  });

  test('[CostGeneratorDatabaseActions][getTableTypeListFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getTableTypeListFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_FAILED);
    expect(store.getActions()[0].error).toEqual(response.data);
  });

  test('[CostGeneratorDatabaseActions][getContentTables()]可以發action', async () => {
    const getState = {};
    const params = {
      type: 'Screw',
      orderBy: 'tableName'
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getContentTables(params));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES);
    expect(store.getActions()[0].params).toMatchObject(params);
  });

  test('[CostGeneratorDatabaseActions][getContentTablesSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: {
        list: [
          { tableType: 'ThermalPad',
            tables: [
              {
                tableName: 'thicknessTable',
                updateBy: 'ADMIN',
                updateDate: '2018/12/17 05:02:40',
                version: 'V6',
              }
            ]
          }
        ]
      }
    };
    const tableList = [
      {
        tableName: 'thicknessTable',
        updateBy: 'ADMIN',
        updateDate: '2018-12-17 13:02',
        version: 'V6',
      }
    ];
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getContentTablesSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    console.log('>>>>>', store.getActions()[0].contentTables);
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_SUCCESS);
    expect(store.getActions()[0].contentTables).toMatchObject(tableList);
    jest.restoreAllMocks();
  });

  test('[CostGeneratorDatabaseActions][getContentTablesFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.getContentTablesFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_FAILED);
    expect(store.getActions()[0].error).toEqual(response.data);
  });

  test('[CostGeneratorDatabaseActions][updateSortInfo()]可以發action', async () => {
    const getState = {};
    const sortInfo = [
      {
        sortOrder: 'desc',
        dataIndex: 'tableName'
      }
    ];
    const store = global.mockStore(getState);
    store.dispatch(DatabaseActions.updateSortInfo(sortInfo));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___UPDATE_SORT_INFO);
    expect(store.getActions()[0].sortInfo).toEqual(sortInfo);
  });

  test('[CostGeneratorDatabaseActions][updateActiveTableType()]可以發action', async () => {
    const getState = {};
    const tableType = 'Fan';
    const store = global.mockStore(getState);
    store.dispatch(DatabaseActions.updateActiveTableType(tableType));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___UPDATE_ACTIVE_TABLE_TYPE);
    expect(store.getActions()[0].tableType).toEqual(tableType);
  });

  test('[CostGeneratorDatabaseActions][download()]可以發action', async () => {
    const getState = {};
    const tableType = 'Pipe';
    const tableName = 'pipeTypeTable';
    const store = global.mockStore(getState);
    store.dispatch(DatabaseActions.download(tableType, tableName));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD);
    expect(store.getActions()[0].tableType).toEqual(tableType);
    expect(store.getActions()[0].tableName).toEqual(tableName);
  });

  test('[CostGeneratorDatabaseActions][downloadSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: {
        size: 6195,
        type: 'application/json'
      },
      headers: {
        'content-disposition': 'attachment; filename="Pipe_pipeTypeTable_20181126.xlsx"',
        'content-type': 'application/json; charset=utf-8'
      }
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.downloadSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action key只有一個
    expect(store.getActions()[0]).toEqual({ type: DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD_SUCCESS });
  });

  test('[CostGeneratorDatabaseActions][downloadFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.downloadFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD_FAILED);
    expect(store.getActions()[0].error).toEqual(response.data);
  });

  test('[CostGeneratorDatabaseActions][upload()]可以發action', async () => {
    const getState = {};
    const tableType = 'Pipe';
    const tableName = 'pipeTypeTable';
    const file = new FormData();
    const store = global.mockStore(getState);
    store.dispatch(DatabaseActions.upload(tableType, tableName, file));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___UPLOAD);
    expect(store.getActions()[0].tableType).toEqual(tableType);
    expect(store.getActions()[0].tableName).toEqual(tableName);
    expect(store.getActions()[0].file).toEqual(file);
  });

  test('[CostGeneratorDatabaseActions][uploadSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'OK',
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.uploadSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action key只有一個
    expect(store.getActions()[0]).toEqual({ type: DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___UPLOAD_SUCCESS });
  });

  test('[CostGeneratorDatabaseActions][uploadFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    await store.dispatch(DatabaseActions.uploadFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(DatabaseActions.actionTypes.COSTGENERATOR_DATABASE___UPLOAD_FAILED);
    expect(store.getActions()[0].error).toEqual(response.data);
  });
});
