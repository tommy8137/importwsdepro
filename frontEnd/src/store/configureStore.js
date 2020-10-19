import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import reducers from '~~reducers';

import middlewares from '~~middlewares';
import rootEpic from '~~epics';


export default function configureStore(history, preloadedState = {}) {
  // Build the middleware for intercepting and dispatching navigation actions
  const routerMiddleware = createRouterMiddleware(history);
  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const enhancers = composeEnhancers(applyMiddleware(middlewares.epicMiddleware, routerMiddleware));
  const store = createStore(
    reducers(history),
    preloadedState,
    enhancers
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  // 開始跑rx
  middlewares.epicMiddleware.run(rootEpic);
  return store;
}
