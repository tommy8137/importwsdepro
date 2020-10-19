import React, { Fragment, useEffect } from 'react';
import {
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

import SidebarHeader from '~~elements/Layout/SidebarHeader';
import ReactGA from '../googleAnalysis/index';


const LoadableComponent = {
  // Xray
  XRay: loadable(() => import(/* webpackChunkName: "XRay" */ '~~features/XRay')),

  // Clean Sheet
  CleanSheet: loadable(() => import(/* webpackChunkName: "CleanSheet" */ '~~features/CleanSheet')),
  CostGeneratorCalculator: loadable(() => import(/* webpackChunkName: "CostGenerator-Calculator" */ '~~features/CostGenerator/Calculator')),
  CostGeneratorDatabase: loadable(() => import(/* webpackChunkName: "CostGenerator-Database" */ '~~features/CostGenerator/Database')), // 舊的database

  // Dashboard
  ProjectView: loadable(() => import(/* webpackChunkName: "DashBoard" */ '~~features/DashBoard/ProjectView')),
  SpendingWaterfall: loadable(() => import(/* webpackChunkName: "Spending-Waterfall" */ '~~features/Spending/Waterfall')),
  SpendingMonth: loadable(() => import(/* webpackChunkName: "Spending-Month" */ '~~features/Spending/Month')),

  // BomManagement
  BomRedirect: loadable(() => import(/* webpackChunkName: "BomManagement" */ '~~features/BomManagement/BomRedirect')),
  BomManagement: loadable(() => import(/* webpackChunkName: "BomManagement" */ '~~features/BomManagement')),
  EEBomDetail: loadable(() => import(/* webpackChunkName: "EEBomDetail" */ '~~features/BomManagement/EEBomDetail/EEBom')),

  // Setting
  Setting: loadable(() => import(/* webpackChunkName: "Setting" */ '~~features/Setting')),

  // Database
  Database: loadable(() => import(/* webpackChunkName: "DataBase" */ '~~features/Database')),
  PlasticCleanSheet: loadable(() => import(/* webpackChunkName: "PlasticCleanSheet" */ '~~features/Database/ME/PlasticCleanSheet')),
};


const SidebarHeaderRouterGroup = (props) => {
  const { match: { url } } = props;
  useEffect(() => {
    // console.log('會來幾次', props);
    const { history, location } = props;
    ReactGA.pageview(location.pathname);
    history.listen(l => ReactGA.pageview(l.pathname));
  }, []);


  return (
    <Fragment>
      <SidebarHeader {...props}>
        {/* Xray */}
        <Route
          exact
          path={`${url}/xRay`}
          render={(p) => <LoadableComponent.XRay {...p} />}
        />

        {/* Clean Sheet */}
        <Route
          exact
          path={`${url}/cleanSheet/cleanSheet`}
          render={(p) => <LoadableComponent.CleanSheet {...p} />}
        />
        {/* <Route
          exact
          path={`${url}/costgenerator/calculator`}
          render={(p) => <LoadableComponent.CostGeneratorCalculator {...p} />}
        /> */}
        <Route
          exact
          path={`${url}/costgenerator/database`}
          render={(p) => <LoadableComponent.CostGeneratorDatabase {...p} />}
        />

        {/* Dashboard */}
        <Route
          exact
          path={`${props.match.url}/board/ProjectView`}
          render={p => <LoadableComponent.ProjectView {...p} />}
        />
        <Route
          exact
          path={`${url}/spending/waterfall`}
          render={(p) => <LoadableComponent.SpendingWaterfall {...p} />}
        />
        <Route
          exact
          path={`${url}/spending/month`}
          render={(p) => <LoadableComponent.SpendingMonth {...p} />}
        />

        {/* BomManagement */}
        <Route
          exact
          path={`${url}/bomManagement`}
          render={(p) => <LoadableComponent.BomRedirect {...p} />}
        />
        <Route
          exact
          path={`${url}/bomManagement/:roleType`}
          render={(p) => <LoadableComponent.BomManagement {...p} />}
        />
        <Route
          exact
          path={`${url}/bomManagement/ee/detail/:eeBomProjectID/:edmVersionID`}
          render={(p) => <LoadableComponent.EEBomDetail {...p} />}
        />

        {/* Setting */}
        <Route
          exact
          path={`${url}/setting`}
          render={(p) => <LoadableComponent.Setting {...p} />}
        />

        {/* Database */}
        <Route
          exact
          path={`${url}/database`}
          render={(p) => <LoadableComponent.Database {...p} />}
        />
        <Route
          exact
          path={`${url}/database/:tab`}
          render={(p) => <LoadableComponent.Database {...p} />}
        />
        <Route
          exact
          path={`${url}/database/:tab/:type2`}
          render={(p) => <LoadableComponent.Database {...p} />}
        />
      </SidebarHeader>
    </Fragment>
  );
};


export default SidebarHeaderRouterGroup;
