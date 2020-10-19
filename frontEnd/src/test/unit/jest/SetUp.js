
import Rx from 'rxjs';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import middlewares from '~~middlewares';

import LocalStorageMock from './__mocks__/LocalStorageMock';
import SessionStorageMock from './__mocks__/BeforeTestSetUp';
import FileMock from './__mocks__/FileMock';

// enzyme
require('./EnzymeSetUp');
// 多國語系
require('./IntlSetUp');
// file-saver
require('./__mocks__/FileSaverMock');


// export const sagaMiddleware = middlewares[1];
// export const epicMiddleware = middlewares[2];
export default {};
// export default configureMockStore(middlewares);


// # 假的LocalStorage和SessionStorage
global.localStorage = LocalStorageMock;
global.sessionStorage = SessionStorageMock;
global.mockStore = configureMockStore([middlewares.epicMiddleware]);
global.Blob = FileMock;
