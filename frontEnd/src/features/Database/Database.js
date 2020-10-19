import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import checkingRbac from '~~hoc/CheckingRbac';

import ME from './ME';
import EE from './EE';
import Metal from './ME/MetalCleanSheet';
import Plastic from './ME/PlasticCleanSheet';
import Thermal from './ME/ThermalCleanSheet';
import CableWire from './ME/CableWireCleanSheet';
import DieCut from './ME/DieCutCleanSheet';
import CableFfc from './ME/CableFfcCleanSheet';
import CableFpc from './ME/CableFpcCleanSheet';
import EmcMagnet from './ME/EmcMagnetCleanSheet';
import ThermalGraphite from './ME/ThermalGraphiteCleanSheet';
import Rubber from './ME/RubberCleanSheet';
import Turning from './ME/TurningCleanSheet';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 4rem 0; */

  .groupTitle{
    margin-bottom: 0.5rem;
    font-weight: 800;
    letter-spacing: 0.5px
  }
  .groupBox{
    display: flex;
    flex-direction: column;
    width: 65%;
    margin: 1rem 0rem;
  }
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 3rem 0rem;
  font-size: 1.25rem;
  color: #404040;
  & > div {
    margin-right: 1rem;
    opacity: 0.45;
    cursor: pointer;
    & :disabled {
      background: hotpink;
    }
  }
  & > .active {
    opacity: 1;
    border-bottom: 5px solid #f5c910;
    cursor: default;
  }
`;

const allowList = [
  ['Edit', 'allow', 'database.me'],
  ['Edit', 'allow', 'database.ee']
];

function Database(props) {
  const { getRbacPath } = props;
  const canSeeME = getRbacPath(['Edit', 'allow', 'database.me']);
  const canSeeEE = getRbacPath(['Edit', 'allow', 'database.ee']);
  const tab = String(_get(props, 'match.params.tab', (!canSeeME ? 'ee' : 'me')));
  const type2 = String(_get(props, 'match.params.type2', ''));
  const showTabs = !type2;
  const componentType = type2 ? String(type2).toLowerCase() : String(tab).toLowerCase();
  const Component = {
    me: ME,
    ee: EE,
    metal: Metal,
    plastic: Plastic,
    thermal: Thermal,
    cablewire: CableWire,
    diecut: DieCut,
    cableffc: CableFfc,
    cablefpc: CableFpc,
    emcmagnet: EmcMagnet,
    thermalgraphite: ThermalGraphite,
    rubber: Rubber,
    turning: Turning,
  }[componentType];

  return (
    <Wrapper>
      {showTabs &&
        <Tabs>
          {canSeeME &&
            <div
              className={tab === 'me' ? 'active' : ''}
              onClick={e => props.history.push('/s/database/me')}
              onKeyUp={() => {}}
            >
              ME
            </div>}
          {canSeeEE &&
            <div
              className={tab === 'ee' ? 'active' : ''}
              onClick={e => props.history.push('/s/database/ee')}
              onKeyUp={() => {}}
            >
              EE
            </div>}
        </Tabs>}
      {<Component {...props} />}
    </Wrapper>
  );
}

export default checkingRbac(allowList)(Database);

