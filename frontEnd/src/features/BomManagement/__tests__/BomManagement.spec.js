import FakeBomList from '~~apis/fakeData/FakeBomList';
import * as BomManagementActions from '../BomManagementActions';


describe('[BomManagementActions]', () => {
  test('[BomManagementActions][getBomList()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const params = {
      pages: 1,
      items: 10,
      orderBy: 'id',
      column: '',
      keyword: '',
      role: 'ME',
    };
    await store.dispatch(BomManagementActions.getBomList(params));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_BOM_LIST);
    // 測試params幾個key
    expect(store.getActions()[0].params).toHaveProperty('pages');
    expect(store.getActions()[0].params).toHaveProperty('items');
    expect(store.getActions()[0].params).toHaveProperty('orderBy');
    expect(store.getActions()[0].params).toHaveProperty('column');
    expect(store.getActions()[0].params).toHaveProperty('keyword');
    expect(store.getActions()[0].params).toHaveProperty('role');
    expect(store.getActions()[0].params).toMatchObject(params);
  });

  test('[BomManagementActions][getBomListSuccess()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: FakeBomList.fakeBomList({
        pages: 1,
        items: 10,
        orderBy: 'id',
        column: '',
        keyword: '',
        role: 'ME',
      })
    };
    await store.dispatch(BomManagementActions.getBomListSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_BOM_LIST_SUCCESS);
    const { bomInfo: { numberOfBom, bomList } } = response.data;
    expect(store.getActions()[0].bomList).toMatchObject(bomList);
    expect(store.getActions()[0].total).toEqual(numberOfBom);
  });

  test('[BomManagementActions][getBomListFailed()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: 'Error Message',
    };
    await store.dispatch(BomManagementActions.getBomListFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_BOM_LIST_FAILED);
  });

  test('[BomManagementActions][updateSortInfo()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const sortInfo = [
      {
        sortOrder: 'asc',
        dataIndex: 'id'
      }
    ];
    await store.dispatch(BomManagementActions.updateSortInfo(sortInfo));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___UPDATE_SORT_INFO);
    expect(store.getActions()[0].sortInfo).toEqual(sortInfo);
  });

  test('[BomManagementActions][updatePageInfo()]可以發action', async () => {
    const getState = {};
    const current = 1;
    const pageSize = 10;
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.updatePageInfo(current, pageSize));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___UPDATE_PAGE_INFO);
    expect(store.getActions()[0].current).toEqual(current);
    expect(store.getActions()[0].pageSize).toEqual(pageSize);
  });

  test('[BomManagementActions][getFilterType()]可以發action', async () => {
    const getState = {};
    const role = 'ME';
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterType(role));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE);
    expect(store.getActions()[0].role).toEqual(role);
  });

  test('[BomManagementActions][getFilterTypeSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: [
        { key: 'BG', value: 'bg' },
        { key: 'Customer', value: 'customer' },
        { key: 'Product', value: 'product' },
        { key: 'Status', value: 'status' },
      ]
    };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterTypeSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE_SUCCESS);
    expect(store.getActions()[0].filterTypeList).toEqual(response.data);
  });

  test('[BomManagementActions][getFilterTypeFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterTypeFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE_FAILED);
  });

  test('[BomManagementActions][updateFilterType()]可以發action', async () => {
    const getState = {};
    const type = { label: 'BG', value: 'bg' };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.updateFilterType(type));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___UPDATE_FILTER_TYPE);
    expect(store.getActions()[0].filterType).toEqual(type);
  });

  test('[BomManagementActions][getFilterValue()]可以發action', async () => {
    const getState = {};
    const params = {
      role: 'ME',
      type: 'Customer'
    };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterValue(params));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE);
    expect(store.getActions()[0].params).toMatchObject(params);
    expect(store.getActions()[0].params).toHaveProperty('role');
    expect(store.getActions()[0].params).toHaveProperty('type');
  });

  test('[BomManagementActions][getFilterValueSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      data: {
        res: ['CPBG', 'CPBGE', 'CPBGEA', 'CPBGEV']
      }
    };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterValueSuccess(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE_SUCCESS);
    expect(store.getActions()[0].filterValueList).toMatchObject(response.data.res);
  });

  test('[BomManagementActions][getFilterValueFailed()]可以發action', async () => {
    const getState = {};
    const response = {
      data: 'Error Message',
    };
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.getFilterValueFailed(response));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE_FAILED);
  });

  test('[BomManagementActions][updateFilterValue()]可以發action', async () => {
    const getState = {};
    const filterValue = 'CPBG';
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.updateFilterValue(filterValue));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___UPDATE_FILTER_VALUE);
    expect(store.getActions()[0].filterValue).toEqual(filterValue);
  });

  test('[BomManagementActions][switchTable()]可以發action', async () => {
    const getState = {};
    const table = 'ME';
    const store = global.mockStore(getState);
    store.dispatch(BomManagementActions.switchTable(table));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(BomManagementActions.actionTypes.BOMMANAGEMENT___SWITCH_TABLE);
    expect(store.getActions()[0].table).toEqual(table);
  });
});
