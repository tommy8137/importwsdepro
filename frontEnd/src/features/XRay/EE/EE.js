import React, { useEffect } from 'react';
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

const EE = (props) => {
  const { setSpecItem, specItem } = props;

  useEffect(() => {
    props.initXrayAction(XRAY_ROLES.EE);
  }, []);

  // 當specBox的內容被勾選時
  const onSpecItemChange = (index, key, value) => {
    const temp = R.set(R.lensPath(['specGroup', key]), value, specItem);
    // EE的行為
    setSpecItem(temp);
  };

  return (
    <React.Fragment>
      <GroupWrap>
        <GroupListComponent canSelectAll canSelectCE />
        <SpecboxList onSpecItemChange={onSpecItemChange} />
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
      specItem: state.xray.specItem,
    };
  },
  {
    getSpecItemsListAction: XrayActions.getSpecItemsList,
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    initXrayAction: XrayActions.initXray,
    setSpecItem: XrayActions.setSpecItem,
    goToRouter: push,
  }
)(EE);
