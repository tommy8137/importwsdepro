import * as AuthActions from '../AuthActions';

describe('[AuthAction]', () => {
  test('[AuthAction][login()]可以發action', async () => {
    const getState = {};
    const value = {
      username: '10700000',
      password: '1234'
    };
    const fromPath = {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    };
    const store = global.mockStore(getState);
    await store.dispatch(AuthActions.login(value, fromPath));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(AuthActions.actionTypes.AUTH___LOGIN);
    expect(store.getActions()[0].value).toMatchObject(value);
    expect(store.getActions()[0].fromPath).toMatchObject(fromPath);
  });

  test('[AuthAction][loginSuccess()]可以發action', async () => {
    const getState = {};
    const response = {
      config: {},
      data: {
        access_token: '123ab/@',
        expires_in: '12345',
        isAdmin: false,
        isCe: true,
        isEe: true,
        isMe: true,
        token_type: 'bearer',
        username: 'WHQ/0000'
      },
      headers: {},
      request: {},
      status: 200,
      statusText: 'OK',
    };
    const fromPath = {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    };
    const store = global.mockStore(getState);
    await store.dispatch(AuthActions.loginSuccess(response, fromPath));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(AuthActions.actionTypes.AUTH___LOGIN_SUCCESS);
    expect(store.getActions()[0].response).toMatchObject(response);
    expect(store.getActions()[0].fromPath).toMatchObject(fromPath);
    // 測試response.data的key
    expect(store.getActions()[0].response.data).toHaveProperty('access_token');
    expect(store.getActions()[0].response.data).toHaveProperty('expires_in');
    expect(store.getActions()[0].response.data).toHaveProperty('isAdmin');
    expect(store.getActions()[0].response.data).toHaveProperty('isCe');
    expect(store.getActions()[0].response.data).toHaveProperty('isEe');
    expect(store.getActions()[0].response.data).toHaveProperty('isMe');
    expect(store.getActions()[0].response.data).toHaveProperty('token_type');
    expect(store.getActions()[0].response.data).toHaveProperty('username');
  });

  test('[AuthAction][loginFailed()]可以發action', async () => {
    const getState = {};
    const error = {
      config: {},
      data: 'Error Message',
      headers: {},
      request: {},
      status: 401,
      statusText: 'text',
    };
    const store = global.mockStore(getState);
    await store.dispatch(AuthActions.loginFailed(error));
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action Type 是正確的
    expect(store.getActions()[0].type).toEqual(AuthActions.actionTypes.AUTH___LOGIN_FAILED);
    expect(store.getActions()[0].error).toEqual(error.data);
  });

  test('[AuthAction][logout()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    await store.dispatch(AuthActions.logout());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action key 只有一個
    expect(store.getActions()[0]).toEqual({ type: AuthActions.actionTypes.AUTH___LOGOUT });
  });

  test('[AuthAction][initializeLoginErrorMsg()]可以發action', async () => {
    const getState = {};
    const store = global.mockStore(getState);
    store.dispatch(AuthActions.initializeLoginErrorMsg());
    // console.log('store.getActions()', store.getActions().map(item => item.type));
    // 測試action key 只有一個
    expect(store.getActions()[0]).toEqual({ type: AuthActions.actionTypes.AUTH___INITIALIZE_LOGIN_ERROR_MSG });
  });
});
