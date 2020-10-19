import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MultiGrid } from 'react-virtualized';
import * as R from 'ramda';
import {
  BaseCell
} from '~~elements/DataGridCommonCell';

import * as DataGridStyles from '../DataGridStyles';
import getRowColor from '../getRowColor';

const { DataGridWrapper } = DataGridStyles;

function DataGrid(props) {
  const {
    tableData,
    // 這裡的Columns用外面傳進來的props
    columnConfig: Columns,
    hoverIndex,
    highLightIndexList
  } = props;
  const rows = tableData;

  // 第一列 表頭
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    let extendStyle = { ...style };
    // ***************************************** checkbox 特別處理 ***************************************** //

    // ***************************************** 其他欄位的處理 ***************************************** //
    if (Columns[columnIndex].renderCustomHeader) {
      return Columns[columnIndex].renderCustomHeader({ columnIndex, key, rowIndex, style: extendStyle, row: rows[rowIndex], column: Columns[columnIndex], });
    }
    return (
      <BaseCell
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={Columns[columnIndex].name}
      />
    );
  }

  function renderGridBody({ columnIndex, key, rowIndex, style, isBottom }) {
    const row = rows[rowIndex];
    const keyVal = R.path([columnIndex, 'key'], Columns);
    const value = R.path([keyVal], row);

    // ***************************************** row的底色處理 *****************************************
    const extendStyle = getRowColor(style, rows, rowIndex, hoverIndex, keyVal, highLightIndexList);
    // ***************************************** row的底色處理 *****************************************

    // ***************************************** 其他欄位的處理 ***************************************** //
    if (Columns[columnIndex].renderCustomBody) {
      return Columns[columnIndex].renderCustomBody({ columnIndex, key, rowIndex, style: extendStyle, row });
    }

    return (
      <BaseCell
        value={value}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        onMouseEnter={props.onEnter}
        onMouseLeave={props.Leave}
      />
    );
  }

  const cellRenderer = ({ columnIndex, key, rowIndex, style, ...rest }) => {
    // console.log(key);
    switch (rowIndex) {
      case 0: {
        return renderGridHeader({ columnIndex, key, rowIndex, style: DataGridStyles.getHeaderStyle(style, Columns[columnIndex]) });
      }
      default: {
        const index = rowIndex - 1;
        return renderGridBody({ columnIndex, key, rowIndex: index, style: DataGridStyles.getGridBodyStyle(style, Columns[columnIndex]) });
      }
    }
  };
  // 計算table可以多高
  let height = document.documentElement.clientHeight - 260;

  const tableEl = useRef(null);
  useEffect(() => {
    if (tableEl.current) { tableEl.current.recomputeGridSize(); }
  });


  // 全部Columns加起來的寬度
  const totalWidth = R.sum(Columns.map(c => c.width));

  return (
    <DataGridWrapper>
      <MultiGrid
        {...props}
        ref={tableEl}
        style={{ backgroundColor: 'white' }}
        cellRenderer={cellRenderer}
        columnWidth={({ index }) => DataGridStyles.getColumnWidth(index, Columns, props.width)}
        columnCount={Columns.length}
        fixedColumnCount={0}
        fixedRowCount={2}
        rowHeight={DataGridStyles.getRowHeight}
        rowCount={rows.length + 1}
        width={totalWidth < props.width ? totalWidth : props.width}
        height={height}
        classNameBottomRightGrid="datagrid-bottom-right"
        enableFixedRowScroll={rows.length === 1}
      />
    </DataGridWrapper>
  );
}

// export default DataGrid;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);

