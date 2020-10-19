import React, { Component, useState, useEffect, useRef } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import DataGrid from '../DataGrid/LeftDataGrid';


const TableComponent = (props) => {
  const { data, width } = props;
  const [contextValue, dispatch] = useContextValue();


  const { sortInfo, hoverIndex } = contextValue;

  const onMouseEnter = (rowIndex) => {
    dispatch({ type: 'SET_HOVER_INDEX', hoverIndex: rowIndex });
  };
  const onMouseLeave = () => {
    dispatch({ type: 'SET_HOVER_INDEX', hoverIndex: -1 });
  };
  const updateSortInfo = updatedObj => {
    let updatedList = [].concat(updatedObj);
    // 更新sort
    dispatch({ type: 'SET_SORTINFO', sortInfo: updatedList });
  };

  return (
    <div className="grid grid-left" style={{ width }}>
      <DataGrid
        {...props}
        width={width}
        onEnter={onMouseEnter}
        onLeave={onMouseLeave}
        tableData={data}
        sortInfo={sortInfo}
        hoverIndex={hoverIndex}
        updateSortInfo={updateSortInfo}
      />
    </div >
  );
};


TableComponent.defaultProps = {};

export default connect(
  (state) => {
    return {};
  },
  {
    goToRouter: push
  }
)(TableComponent);
