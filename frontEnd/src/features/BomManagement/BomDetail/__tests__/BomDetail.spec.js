import FakeBomDetail from '~~apis/fakeData/FakeBomDetail';
import * as BomDetailActions from '../BomDetailActions';

describe('[BomDetailActions]', () => {
  // GET: Assignlist
  test('[BomDetailActions][getBomAssignlist()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const params = {
      bomID: 21,
    };
    await store.dispatch(BomDetailActions.getBomAssignlist(params));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_BOM_ASSIGNLIST);
    expect(store.getActions()[0].params).toMatchObject(params);
  });

  test('[BomDetailActions][getBomAssignlistSuccess()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: FakeBomDetail.fakeBomAssignList
    };
    await store.dispatch(BomDetailActions.getBomAssignlistSuccess(response));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_BOM_ASSIGNLIST_SUCCESS);
    expect(store.getActions()[0].assignData).toMatchObject(response.data);
  });

  test('[BomDetailActions][getBomAssignlistFailed()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: 'Error Message',
    };
    await store.dispatch(BomDetailActions.getBomAssignlistFailed(response));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_BOM_ASSIGNLIST_FAILED);
    expect(store.getActions()[0].error).toEqual(response.data);
  });

  // GET: Bom Detail
  test('[BomDetailActions][getBomDetail()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const params = {
      bomID: 21
    };
    await store.dispatch(BomDetailActions.getBomDetail(params));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_BOMDETAIL);
    expect(store.getActions()[0].params).toMatchObject(params);
  });

  // Set Bom Assign Item
  test('[BomDetailActions][setBomAssignItem()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const assignItem = {
      assign: 'ME',
      employeeID: '10700001',
      employeeName: 'ADMIN',
      isFunctionTeam: false,
      order: '2'
    };
    await store.dispatch(BomDetailActions.setBomAssignItem(assignItem));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___SET_BOM_ASSIGN);
    expect(store.getActions()[0].assignItem).toMatchObject(assignItem);
  });

  // Toggle Bom Item Create/Edit Modal
  test('[BomDetailActions][toggleBomItemModal()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const action = 'Edit';
    const status = true;
    const bomItem = {
      customer_pn: 'asdfaasdfa',
      func_ctgy: 'EMC↵',
      gb_assy_ctgy: null,
      id: 182,
      image_id: null,
      image_path: null,
      item: 1,
      level: 'DC/65',
      material: null,
      material_spec: null,
      parent_level: null,
      part_name: 'N0',
      part_size_ef: '4.1',
      part_size_h: '3.1',
      part_size_l: '1.1',
      part_size_l2: '5.1',
      part_size_m: null,
      part_size_w: '2.1',
      part_size_w2: '6.1',
      part_weight: '8.1',
      parts_ctgy_1: 'Thermal',
      parts_ctgy_2: 'Fan',
      qty: 1,
      reference_pn: null,
      rfq_pn: 'VAF1553592464559',
      sub_leve: false,
      supply_type: 'CoSign',
      system_cost: null,
      thickness: '7.1',
      update_time: '2019年3月26日 5:25pm',
    };
    await store.dispatch(BomDetailActions.toggleBomItemModal(action, status, bomItem));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___TOGGLE_BOM_ITEM_MODAL);
    expect(store.getActions()[0].action).toEqual(action);
    expect(store.getActions()[0].status).toEqual(status);
  });


  // GET: ADD, EDIT ITEM 時要先取得下拉的data
  test('[BomDetailActions][getDropdownValue()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(BomDetailActions.getDropdownValue());
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_DROPDOWN_VALUE);
  });

  test('[BomDetailActions][getDropdownValueSuccess()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: [
        {
          field_name: 'supply_type',
          id: 'a65a7478-43cf-11e9-b34d-0242ac110002',
          item_name: 'CoSign',
          layout_name: 'bom_item',
          path: 'CONSIGN',
        }
      ]
    };
    await store.dispatch(BomDetailActions.getDropdownValueSuccess(response));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_DROPDOWN_VALUE_SUCCESS);
    expect(store.getActions()[0].response).toMatchObject(response);
  });

  test('[BomDetailActions][getDropdownValueFailed()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const response = {
      data: 'Error Message',
    };
    await store.dispatch(BomDetailActions.getDropdownValueFailed(response));
    expect(store.getActions()[0].type).toEqual(BomDetailActions.actionTypes.BOM___GET_DROPDOWN_VALUE_FAILED);
  });
});

