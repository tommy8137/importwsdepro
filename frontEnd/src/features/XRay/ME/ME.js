import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  XRAY_ROLES,
} from '~~features/XRay/XrayConst';

import SpecboxList from '../components/SpecboxList';
import BottomControl from '../components/BottomControl';
import GroupListComponent from '../components/GroupListComponent';

import * as XrayActions from '../XrayActions';

const GroupWrap = styled.div`
  display: block;
  margin: 0 auto;
  background-color: white;
  margin-bottom: 6rem;
`;

const FixBottomControl = styled.div`
  width: calc(100% - 13rem);
  position: fixed;
  bottom: 0rem;
  z-index: 10;
  margin-bottom: 2rem;
  left: 13rem;
  padding: 0 3.4%;
`;


const ME = (props) => {
  const { specItem, specItem: { specGroup: { spec01 = [] } } } = props;

  useEffect(() => {
    props.initMEXrayAction(XRAY_ROLES.ME);
  }, []);

  //  當specBox改變時
  const onSpecItemChange = (index, key, value) => {
    const temp = R.set(R.lensPath(['specGroup', key]), value, specItem);
    // ME 的行為：每勾選玩一個box, call一次api呼叫下一個
    const specN = index + 2;
    const selectCount = R.path(['specGroup', key], temp).filter(o => o.value).length;
    props.setSpecItem(temp, specN);
    if (selectCount) {
      props.getMeSpecItemsListAction(specN);
    }
  };

  return (
    <React.Fragment>
      <GroupWrap>
        <GroupListComponent />
        <SpecboxList
          isSingle
          onSpecItemChange={onSpecItemChange}
        />
      </GroupWrap>
      <FixBottomControl>
        <BottomControl />
      </FixBottomControl>
    </React.Fragment >
  );
};

export default connect(
  (state) => {
    return {
      selected: state.xray.selected,
      specItem: state.xray.specItem,
    };
  },
  {
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    initMEXrayAction: XrayActions.initMEXray,
    setSpecItem: XrayActions.setSpecItem,
    goToRouter: push
  })(ME);

