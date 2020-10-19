import React, { Fragment } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@loadable/component';

import { PrivateRoute } from '~~elements/Route';
import App from '~~features/App';


import SidebarHeaderRouterGroup from './SidebarHeaderRouterGroup';
import GoBackHeaderRouterGroup from './GoBackHeaderRouterGroup';


// 代替indexRoute的方式 http://stackoverflow.com/questions/42254929/how-to-nest-routes-in-react-router-v4
const Routes = () => (
  <App>
    <Switch>
      <Route
        exact
        path="/login"
        component={loadable(() => import(/* webpackChunkName: "Auth" */ '~~features/Auth'))}
      />
      <PrivateRoute
        exact
        path="/"
        component={loadable(() => import(/* webpackChunkName: "Home" */ '~~features/Home'))}
      />
      <PrivateRoute
        path="/s"
        component={SidebarHeaderRouterGroup}
      />
      <PrivateRoute
        path="/g"
        component={GoBackHeaderRouterGroup}
      />
      <Route
        exact
        path="/backdoor/entrance"
        component={loadable(() => import(/* webpackChunkName: "BackDoor" */ '~~features/BackDoor'))}
      />
      <Route
        exact
        path="/backdoor/formula"
        component={loadable(() => import(/* webpackChunkName: "BackDoorFormula" */ '~~features/BackDoor/Formula'))}
      />
      <Route
        exact
        path="/backdoor/tools"
        component={loadable(() => import(/* webpackChunkName: "BackDoorSecretTools" */ '~~features/BackDoor/SecretTools'))}
      />
      <Route
        component={loadable(() => import(/* webpackChunkName: "NotFound" */ '~~features/NotFound'))}
      />
    </Switch>
  </App>
);

export default Routes;
