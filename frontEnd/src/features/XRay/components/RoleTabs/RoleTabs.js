import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import * as R from 'ramda';
import { Tabs, Tab } from '~~elements/Tabs';
import checkingRbac from '~~hoc/CheckingRbac';

import {
  XRAY_ROLES,
  XRAY_TYPES,
  XRAY_SEARCHBY_CONFIG
} from '~~features/XRay/XrayConst';

import * as XrayActions from '../../XrayActions';


const RoleTabsComponent = (props) => {
  const { roleType, getRbacPath } = props;

  const ME = getRbacPath(['View', 'allow', 'xray.me']);
  const EE = getRbacPath(['View', 'allow', 'xray.ee']);

  const handleClick = type => {
    props.resetSpecItemAction();
    props.setRoleTypeAction(type);
    props.setSearchByAction(XRAY_TYPES.CATEGORY);
  };
  return (
    <Tabs>
      {ME ?
        <Tab
          active={roleType === XRAY_ROLES.ME}
          onClick={() => handleClick(XRAY_ROLES.ME)}
        >
          ME
        </Tab>
        :
        (null)}
      {EE ?
        <Tab
          active={roleType === XRAY_ROLES.EE}
          onClick={() => handleClick(XRAY_ROLES.EE)}
        >
          EE
        </Tab>
        :
        (null)}
    </Tabs >
  );
};


RoleTabsComponent.defaultProps = {

};

export default checkingRbac()(connect(
  (state) => {
    return {
      roleType: state.xray.roleType,
    };
  },
  {
    initXrayAction: XrayActions.initXray,
    setEditAction: XrayActions.setEdit,
    setSearchByAction: XrayActions.setSearchBy,
    resetSpecItemAction: XrayActions.resetSpecItem,
    setRoleTypeAction: XrayActions.setRoleType,
    goToRouter: push
  }
)(RoleTabsComponent));
