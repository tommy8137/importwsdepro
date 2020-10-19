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

const SearchByTabsContainer = styled.div`
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

const SearchByTabs = (props) => {
  const {
    roleType,
    searchBy,
    setSearchBy
  } = props;

  const searchTypes = XRAY_SEARCHBY_CONFIG[roleType] || [];

  function handleClickSearchType(type) {
    setSearchBy(type);
  }
  return (
    <SearchByTabsContainer className="search-bar">
      <div className="inline-button">
        <p>Search by</p>
        {
          searchTypes.map((config) => {
            const { title = '', key } = config;
            const color = searchBy === key ? 'black' : 'transparent';
            return (
              <Button
                onClick={() => handleClickSearchType(key)}
                round
                color={color}
                border
              >
                {title}
              </Button>);
          })
        }
      </div>
    </SearchByTabsContainer >
  );
};

SearchByTabs.defaultProps = {

};


const mapStateToProps = state => {
  return {
    searchBy: state.xray.searchBy,
    roleType: state.xray.roleType,
  };
};

const mapDispatchToProps = {
  getSpecGroupListAction: XrayActions.getSpecGroupList,
  setSearchBy: XrayActions.setSearchBy,
  getSearchbarListAction: XrayActions.getSearchbarList,
  goToRouter: push
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SearchByTabs);
