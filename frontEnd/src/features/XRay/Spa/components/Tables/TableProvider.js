import React, { Component, useState, useEffect, useRef } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import * as R from 'ramda';
import TableWrap from './TableWrap';

const initialState = {
  leftRatio: 0.7,
  rightRatio: 0.3,
  width: 1200,
  height: 600,
  seeMore: false,
  hoverIndex: 0,
  sortInfo: [{ dataIndex: 'unitPrice', sortOrder: 'asc' }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEEMORE':
      return {
        ...state,
        seeMore: action.seeMore
      };
    case 'SET_TABLE_WIDTH':
      return {
        ...state,
        width: action.width
      };
    case 'SET_HOVER_INDEX':
      return {
        ...state,
        hoverIndex: action.hoverIndex
      };
    case 'SET_SORTINFO':
      return {
        ...state,
        sortInfo: action.sortInfo
      };
    case 'SET_WIDTH':
      return {
        ...state,
        width: action.width
      };
    case 'SET_WIDTH_AND_HEIGHT':
      return {
        ...state,
        width: action.width,
        height: action.height,
      };
    default:
      return state;
  }
};


const TableProvider = (props) => {
  return (
    <ContextProvider initialState={initialState} reducer={reducer}>
      <TableWrap {...props} />
    </ContextProvider>
  );
};


TableProvider.defaultProps = {};

export default TableProvider;
