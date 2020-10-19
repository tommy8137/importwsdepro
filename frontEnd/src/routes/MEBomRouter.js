import React, { Fragment } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@loadable/component';


import BomMenu from '~~features/BomManagement/BomDetail/BomMenu';
import Layout from '~~elements/Layout';

const LoadableComponent = {
  MEBomDetail: loadable(() => import(/* webpackChunkName: "MEBomDetail" */ '~~features/BomManagement/BomDetail')),
};

const BomRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/:meBomId`}
          render={p => {
            return <LoadableComponent.MEBomDetail {...p} />;
          }}
        />
      </Switch>
    </div>
  );
};


const MEBomDetailComponent = Layout('goBackHeader', {
  backLink: '/s/bomManagement/me',
  render: (
    <BomMenu />
  )
})(BomRouter);


export default MEBomDetailComponent;
