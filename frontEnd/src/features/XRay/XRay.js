import React, { Component, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { push } from 'connected-react-router';
import checkingRbac from '~~hoc/CheckingRbac';

import {
  XRAY_ROLES,
  XRAY_TYPES,
  XRAY_SEARCHBY_CONFIG
} from '~~features/XRay/XrayConst';

import RoleTabs from './components/RoleTabs';
import SearchByTabs from './components/SearchByTabs';
import SearchBar from './components/SearchBar';

import SourcerCostImport from './MultipleImport/SourcerCostImport';
import CmpBomImport from './MultipleImport/CmpBomImport';

import ME from './ME/';
import EE from './EE/';


import * as XrayActions from './XrayActions';


const GroupContainer = styled.div`
  display: block;
  width: 100%;
  padding: 2% 4%;
  background-color: #f2f2f2;
`;

function SpecGroupList(props) {
  const { roleType, searchBy, } = props;
  if (!roleType) { return null; }
  if (roleType === XRAY_ROLES.ME) {
    return (<ME />);
  }
  switch (searchBy) {
    case XRAY_TYPES.SORCERCOST:
      return (<SourcerCostImport />);
    case XRAY_TYPES.CMP:
      return (<CmpBomImport />);
    default:
      return (<EE />);
  }
}
const Xray = props => {
  const { searchBy, roleType, specItem, originSpecItem, getRbacPath } = props;
  const unsave = !R.equals(specItem, originSpecItem);

  const isME = getRbacPath(['View', 'allow', 'xray.me']);
  const isEE = getRbacPath(['View', 'allow', 'xray.ee']);


  useEffect(() => {
    if (!roleType) {
      switch (true) {
        case (isME && isEE):
          props.setRoleTypeAction('ME');
          break;
        case (isME && !isEE):
          props.setRoleTypeAction('ME');
          break;
        case (!isME && isEE):
          props.setRoleTypeAction('EE');
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const unlisten = props.history.listen((location, action) => {
      const { pathname } = location;
      const inXray = pathname.indexOf('xRay') > -1;
      if (!inXray) {
        props.resetSpecItemAction();
        props.setRoleTypeAction('');
        unlisten();
      }
    });
  }, []);

  return (
    <GroupContainer>
      <Prompt
        when={unsave}
        message={location => (
          `<p>Do you want to leave without save the changes made to the spec group?</p>
             <p>Your changes will be lost if you don't save them.</p>`)
        }
      />
      <RoleTabs />
      <SearchByTabs />
      <SearchBar />
      <SpecGroupList  {...props} />
    </GroupContainer >
  );
};

// 有在名單上才可以進來
const allowList = [
  ['View', 'allow', 'xray.me'],
  ['View', 'allow', 'xray.ee']
];

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      searchBy: state.xray.searchBy,
      roleType: state.xray.roleType,
      specItem: state.xray.specItem,
      originSpecItem: state.xray.originSpecItem,
    };
  },
  {
    setRoleTypeAction: XrayActions.setRoleType,
    initXrayAction: XrayActions.initXray,
    resetSpecItemAction: XrayActions.resetSpecItem,
    goToRouter: push
  }
)(Xray));

