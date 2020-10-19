import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _get from 'lodash/get';
import * as R from 'ramda';
import {
  XRAY_ROLES,
} from '~~features/XRay/XrayConst';

import Specbox from './Specbox';

import * as XrayActions from '../../XrayActions';

const gutter = '1rem';

const SpecboxContainer = styled.div`
  padding: 2.5rem;
`;

const SpecboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: ${`-${gutter}`};
  .spec-box-col {
    flex: 0 20%;
    padding: ${`${gutter}`};
    max-width: 20%;
  }
`;


const SpecboxListComponent = (props) => {
  const {
    roleType,
    edit,
    specTitle,
    specItem: { owner = [], specGroup = {} },
    singleFirstSpec } = props;

  const specKeys = Object.keys(specGroup);
  // 目前總共勾選幾個
  const selectedCount = specKeys.reduce((prev, key) => prev + _get(specGroup, [key], []).length, 0);
  // 是否可以編輯
  const editable = (edit) || (!owner && selectedCount > 0);
  const isME = roleType === XRAY_ROLES.ME;
  return (
    <SpecboxContainer>
      <SpecboxList
        className="spec-box-list"
      >
        {specKeys.map((k, index) => {
          const specItemList = _get(specGroup, k, []);
          const tit = _get(specTitle, index, '') || k;
          const isSingle = index === 0 && isME;
          return (
            <div className="spec-box-col" key={k}>
              <Specbox
                onChange={(key, val) => props.onSpecItemChange(index, key, val)}
                specKey={k}
                specTitle={tit}
                specItemList={specItemList}
                editable={editable}
                isSingle={isSingle}
              />
            </div>);
        })}
      </SpecboxList >
    </SpecboxContainer>
  );
};


export default connect(
  (state) => {
    return {
      searchBy: state.xray.searchBy,
      edit: state.xray.edit,
      selected: state.xray.selected,
      specItem: state.xray.specItem,
      roleType: state.xray.roleType,
      specTitle: state.xray.specTitle,
    };
  },
  {
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    setSpecItem: XrayActions.setSpecItem,
    goToRouter: push
  }
)(SpecboxListComponent);
