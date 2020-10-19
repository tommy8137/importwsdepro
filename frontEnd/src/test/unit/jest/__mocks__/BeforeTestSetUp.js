import Rx from 'rxjs';
// import ApiService from '~~apis/ApiService';
import configureMockStore from 'redux-mock-store';

import middlewares from '~~middlewares';

export const epicMiddleware = middlewares[2];

export default configureMockStore(middlewares);

