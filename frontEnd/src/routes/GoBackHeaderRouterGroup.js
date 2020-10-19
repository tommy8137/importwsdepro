import React, { Fragment } from 'react';
import { PartlistContextProvider } from '~~elements/PartListForm';

import {
  Route,
  Switch,
} from 'react-router-dom';

import loadable from '@loadable/component';

import Nav from '~~elements/Nav';
import Layout from '~~elements/Layout';
import MEBomDetail from './MEBomRouter';
import EMDMBomDetail from './EMDMBomRouter';

import DatabaseRouter, { CleanSheetDatabase } from './DatabaseRouter';


const LoadableComponent = {
  // Xray
  XRayLpp: loadable(() => import(/* webpackChunkName: "XRay-Lpp" */ '~~features/XRay/Lpp')),
  XRaySpa: loadable(() => import(/* webpackChunkName: "XRay-Spa" */ '~~features/XRay/Spa')),

  // Clean Sheet - EE
  PCBCalculator: loadable(() => import(/* webpackChunkName: "Pcb" */ '~~features/CleanSheet/EE/Pcb')),
  PCBCalculateResult: loadable(() => import(/* webpackChunkName: "Pcb" */ '~~features/CleanSheet/EE/Pcb/PCBCalculatorResult')),

  // Clean Sheet - ME
  ThermalModuleCalculator: loadable(() => import(/* webpackChunkName: "ThermalModule" */ '~~features/CleanSheet/ME/ThermalModule')),

  // Dashboard
  DashBoard: loadable(() => import(/* webpackChunkName: "DashBoard" */ '~~features/DashBoard')),

  // Setting
  AllAccounts: loadable(() => import(/* webpackChunkName: "AllAccounts" */ '~~features/Setting/AllAccounts')),
  RoleManagement: loadable(() => import(/* webpackChunkName: "EEbomAssignment" */ '~~features/Setting/RoleManagement')),
  EEbomAssignment: loadable(() => import(/* webpackChunkName: "EEbomAssignment" */ '~~features/Setting/EEbomAssignment')),
  XraySpecTitle: loadable(() => import(/* webpackChunkName: "XraySpecTitle" */ '~~features/Setting/XraySpecTitle')),

};

/** Setting */
const setting = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/AllAccounts`}
          render={p => <LoadableComponent.AllAccounts {...p} />}
        />
        <Route
          exact
          path={`${props.match.url}/EEbomAssignment`}
          render={p => <LoadableComponent.EEbomAssignment {...p} />}
        />
        <Route
          exact
          path={`${props.match.url}/RoleManagement`}
          render={p => <LoadableComponent.RoleManagement {...p} />}
        />
        <Route
          exact
          path={`${props.match.url}/XraySpecTitle`}
          render={p => <LoadableComponent.XraySpecTitle {...p} />}
        />
      </Switch>
    </div>
  );
};

/** Dashboard */
const board = (props) => {
  return (
    <div>
      <Route
        exact
        path={`${props.match.url}/dashboard/:id`}
        render={p => <LoadableComponent.DashBoard {...p} />}
      />
    </div>
  );
};

/** Xray */
const Analysis = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/spa`}
          render={p => <LoadableComponent.XRaySpa {...p} />}
        />
        <Route
          exact
          path={`${props.match.url}/lpp`}
          render={p => <LoadableComponent.XRayLpp {...p} />}
        />
      </Switch>
    </div>
  );
};

/** CleanSheet */
const cleanSheet = (props) => {
  return (
    <div>
      <PartlistContextProvider>
        <Switch>
          <Route
            exact
            path={`${props.match.url}/pcbCalculator`}
            render={p => <LoadableComponent.PCBCalculator {...p} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path={`${props.match.url}/thermalModuleCalculator`}
            render={p => <LoadableComponent.ThermalModuleCalculator {...p} />}
          />
        </Switch>
      </PartlistContextProvider>
    </div>
  );
};
/** CleanSheet - EE */
const cleanSheetPcb = (props) => {
  return (
    <div>
      <PartlistContextProvider>
        <Switch>
          <Route
            exact
            path={`${props.match.url}/pcbResult`}
            render={p => <LoadableComponent.PCBCalculateResult {...p} />}
          />
        </Switch>
      </PartlistContextProvider>
    </div>
  );
};


const CostGeneratorCE = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/chart`}
          render={p => <LoadableComponent.CostGeneratorCEChart {...p} />}
        />
      </Switch>
    </div>
  );
};


// FIXME: 使用這個方式，第一次進入此頁面，會造成頁面重新render三次。所以render沒有header的版本，之後要用直接在ProjectStage加header去
// import PS from '~~features/CostGenerator/ProjectList/ME/ProjectStage';
// const TEST = (props) => {
//   const EEE = Layout('goBackHeader', {
//     backLink: '/s/costgenerator/projectlist',
//     render: (
//       <div>{props.match.params.projectId}</div>
//     )
//   })(PS);
//   return (
//     <EEE {...props} key="spsppsps" />
//   );
// };

const Setting = Layout('goBackHeader', {
  backLink: '/s/setting',
  render: (
    null
  )
})(setting);

const DashBoard = Layout('goBackHeader', {
  backLink: '/s/board/ProjectView',
  render: (
    null
  )
})(board);

const XRayAnalysis = Layout('goBackHeader', {
  backLink: '/s/xRay',
  render: (
    <Nav
      routes={[
        { link: '/g/xRay/analysis/spa', title: 'SPA' },
        { link: '/g/xRay/analysis/lpp', title: 'LPP' }
      ]}
    />
  )
})(Analysis);

const CleanSheet = Layout('goBackHeader', {
  backLink: '/s/cleanSheet/cleanSheet',
  render: (
    null
  )
})(cleanSheet);

const CleanSheetPcb = Layout('goBackHeader', {
  backLink: '/g/cleanSheet/pcbCalculator',
  render: (
    null
  )
})(cleanSheetPcb);
const GoBackHeaderRouterGroup = (props) => {
  const { match: { url } } = props;
  return (
    <Fragment>
      <Route
        path={`${url}/setting`}
        render={p => <Setting {...p} />}
      />
      <Route
        path={`${url}/board`}
        render={p => <DashBoard {...p} />}
      />
      <Route
        path={`${url}/bomDetail`}
        render={p => <MEBomDetail {...p} />}
      />
      <Route
        path={`${url}/emdmBomDetail`}
        render={p => <EMDMBomDetail {...p} />}
      />
      <Route
        path={`${url}/xRay/analysis`}
        render={p => <XRayAnalysis {...p} />}
      />
      <Route
        path={`${url}/cleanSheet`}
        render={p => <CleanSheet {...p} />}
      />
      <Route
        path={`${url}/calculator`}
        render={p => <CleanSheetPcb {...p} />}
      />
      <Route
        path={`${url}/database`}
        render={p => <DatabaseRouter {...p} />}
      />
    </Fragment>
  );
};


export default GoBackHeaderRouterGroup;
