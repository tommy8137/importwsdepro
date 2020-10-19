// 使用history的東西取帶 hashHistory
import { createHashHistory as createHistory } from 'history';
// import { createBrowserHistory as createHistory } from 'history';
import configureStore from './configureStore';

export const history = createHistory();
export const store = configureStore(history, {});
