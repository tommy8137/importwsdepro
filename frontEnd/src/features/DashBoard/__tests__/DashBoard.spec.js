import FakeDashBoardData from '~~apis/fakeData/FakeDashBoardData';
import * as DashBoardActions from '../DashBoardActions';


describe('[DashBoardActions]', () => {
  test('[DashBoardActions][getLists()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(DashBoardActions.getListDetail());
    expect(store.getActions()[0].type).toEqual(DashBoardActions.actionTypes.DASHBOARD___GET_LIST_DETAIL);
  });

  test('[DashBoardActions][getDetailSuccess()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    const data = FakeDashBoardData.fakeData();
    await store.dispatch(DashBoardActions.getDetailSuccess(data));
    expect(store.getActions()[0].type).toEqual(DashBoardActions.actionTypes.DASHBOARD___GET_LIST_DETAIL_SUCCESS);
    // expect(store.getActions()[0].info).toMatchObject(data.info);
    expect(store.getActions()[0].lists).toEqual(data.lists);
  });
});

