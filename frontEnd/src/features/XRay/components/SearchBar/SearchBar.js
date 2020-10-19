import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Button from '~~elements/Button';
import { push } from 'connected-react-router';
import _find from 'lodash/find';
import * as XrayActions from '~~features/XRay/XrayActions';
import {
  XRAY_TYPES,
  XRAY_SEARCHBY_CONFIG
} from '~~features/XRay/XrayConst';

import ByType from './ByType';
import ByReference from './ByReference';


const SearchBarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 1rem;
  z-index: 4;
  position: relative;
  .inline-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    >.button,
    >p {
      margin-right: 1rem;
      margin-bottom: 0px;
    }
  }`;

const SearchBar = (props) => {
  const {
    searchBy,
  } = props;

  return (
    <SearchBarContainer className="search-bar">
      {searchBy === XRAY_TYPES.CATEGORY && <ByType />}
      {searchBy === XRAY_TYPES.REFPN && <ByReference />}
    </SearchBarContainer >
  );
};


const mapStateToProps = state => {
  return {
    searchBy: state.xray.searchBy,
    roleType: state.xray.roleType,
  };
};

const mapDispatchToProps = {
  goToRouter: push
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SearchBar);
