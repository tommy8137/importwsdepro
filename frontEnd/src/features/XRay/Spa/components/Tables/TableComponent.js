import React, { Component, useState, useEffect, useRef } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import * as R from 'ramda';
import { ScrollSync } from 'react-virtualized';
import TableLeftComponent from './TableLeftComponent';
import TableRightComponent from './TableRightComponent';
import getColumns from '../DataGrid/ColumnSetting/RightColumn';

const SpaTable = styled.div`
  display: block;
  width: 100%;
  white-space: nowrap;
  padding: 1rem 0 ;
  .grid {
    display: inline-block;
    vertical-align: top;
    white-space: initial;
  }
`;


/**
 * 由於spa table是由三個table組成， 傳入data得到三個table的array
 * @param {} data material的list
 * @param {*} spaData 傳入整個spaData, 以防以後又要比對什麼東西
 */
function getSpaTables(data, spaData) {
  const { referencePN } = spaData;
  return data.reduce((prev, curr, result) => {
    const { infoList, specList, moreSpec } = curr;
    const isHighLight = referencePN === curr.infoList.referencePN;
    console.log('curr >>>', curr, curr.infoList.referencePN);
    return {
      infoData: [...prev.infoData, { ...infoList, isHighLight }],
      specData: [...prev.specData, { ...specList, isHighLight }],
      moreSpecData: [...prev.moreSpecData, { ...moreSpec, isHighLight }]
    };
  }, {
    infoData: [],
    specData: [],
    moreSpecData: []
  });
}

const TableComponent = (props) => {
  const [contextValue, dispatch] = useContextValue();
  const {
    tableData,
    spaData, spaFilter,
    spaData: {
      materialList,
      infoProperty,
      specOthers,
      specProperty,
      specTitle
    },
    // 頁面上方filter control帶得值
    spaFilter: { supplyTypeList, intervalEnable, rangeEnable, interval, range } } = props;

  const { width, height, seeMore, leftRatio, rightRatio, sortInfo } = contextValue;

  const tableEl = useRef(null);
  const leftWidth = width * leftRatio;
  const rightWidth = width * rightRatio;

  // 控制table高度
  useEffect(() => {
    const setWidthAndHeight = () => {
      const $wrap = tableEl.current;
      const tableWidth = $wrap.clientWidth;
      const tableHeight = document.documentElement.clientHeight - 250;
      dispatch({ type: 'SET_WIDTH_AND_HEIGHT', width: tableWidth, height: tableHeight });
    };
    setWidthAndHeight();
    window.addEventListener('resize', setWidthAndHeight);
    return () => {
      window.removeEventListener('resize', setWidthAndHeight);
    };
  }, []);

  // 如果referencePN跟spaData的相同的話, 會變成藍色的底
  const highLightIndexList = tableData.reduce((acc, curr, index) => {
    if (curr.infoList.partNumber && curr.infoList.partNumber === spaData.referencePN) { acc.push(index); }
    return acc;
  }, []);

  const infoData = tableData.map(m => m.infoList);
  const specData = tableData.map(m => m.specList);
  const moreSpecData = tableData.map(m => m.moreSpec);

  const columnSpecConfig = getColumns(specProperty, specTitle);
  const columnMoreConfig = getColumns(specOthers, specTitle);

  return (
    <SpaTable innerRef={tableEl} >
      <ScrollSync>
        {({ scrollTop, onScroll }) => (
          <React.Fragment>
            <TableLeftComponent
              scrollTop={scrollTop}
              onScroll={onScroll}
              width={leftWidth}
              height={height}
              data={infoData}
              highLightIndexList={highLightIndexList}
            />
            {
              seeMore ?
                <TableRightComponent
                  scrollTop={scrollTop}
                  onScroll={onScroll}
                  width={rightWidth}
                  height={height}
                  data={moreSpecData}
                  columnConfig={columnMoreConfig}
                  highLightIndexList={highLightIndexList}
                /> :
                <TableRightComponent
                  scrollTop={scrollTop}
                  onScroll={onScroll}
                  width={rightWidth}
                  height={height}
                  data={specData}
                  columnConfig={columnSpecConfig}
                  highLightIndexList={highLightIndexList}
                />
            }
          </React.Fragment>
        )}
      </ScrollSync>
    </SpaTable>
  );
};


TableComponent.defaultProps = {
  onChange: () => { },
  specTitle: [],
  key: '',
  specItemList: []
};

export default connect(
  (state) => {
    return {
      minPriceItem: state.xray.minPriceItem,
      spaData: state.xray.spaData,
      materialList: state.xray.materialList,
      spaFilter: state.xray.spaFilter,
      specTitle: state.xray.specTitle,
    };
  },
  {
    goToRouter: push
  }
)(TableComponent);
