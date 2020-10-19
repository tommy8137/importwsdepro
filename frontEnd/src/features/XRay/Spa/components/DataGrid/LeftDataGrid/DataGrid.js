import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MultiGrid } from 'react-virtualized';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import useComponentSize from '~~hooks/useComponentSize';
import * as R from 'ramda';
import {
  HeaderCellWithQuestionMark,
  HeaderSorterCell
} from '~~elements/DataGridCommonCell';

import { meColumns, eeColumns } from '../ColumnSetting/LeftColumn';
import * as DataGridStyles from '../DataGridStyles';
import getRowColor from '../getRowColor';
import { BaseHoverCell } from '../CommonCell';


const { DataGridWrapper } = DataGridStyles;

function DataGrid(props) {
  const {
    tableData,
    hoverIndex,
    sortInfo,
    roleType,
    highLightIndexList
  } = props;

  const rows = tableData;
  const Columns = roleType === 'ME' ? meColumns : eeColumns;

  // Tooltip列表
  const tooltipContentInfo = {
    unitPrice: <p>游標懸浮於價錢可顯示Valid Date</p>,
  };

  // 第一列 表頭
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    const row = rows[rowIndex];
    let extendStyle = { ...style };
    // ***************************************** 其他欄位的處理 ***************************************** //
    if (Columns[columnIndex].renderCustomHeader) {
      return Columns[columnIndex].renderCustomHeader({ columnIndex, key, rowIndex, style: extendStyle, row });
    }

    // 如果他有 tooltipContent 就顯示 HeaderCellWithQuestionMark
    const tooltipContent = tooltipContentInfo[Columns[columnIndex].key];

    const cellValue =
      tooltipContent ?
        (<HeaderCellWithQuestionMark
          value={Columns[columnIndex].name}
          tooltip={tooltipContent}
        />) : Columns[columnIndex].name;

    if (Columns[columnIndex].sortable) {
      return (
        <HeaderSorterCell
          cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
          value={cellValue}
          sortInfo={props.sortInfo}
          handleSort={props.updateSortInfo}
          columnInfo={Columns[columnIndex]}
        />
      );
    }

    return (
      <BaseHoverCell
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={cellValue}
      />
    );
  }

  function renderGridBody({ columnIndex, key, rowIndex, style, isBottom }) {
    const row = rows[rowIndex];
    const keyVal = R.path([columnIndex, 'key'], Columns);
    const value = R.path([keyVal], row);

    // ***************************************** row的底色處理 *****************************************
    const extendStyle = getRowColor(style, row, rowIndex, hoverIndex, keyVal, highLightIndexList);
    // ***************************************** row的底色處理 *****************************************

    // ***************************************** 其他欄位的處理 ***************************************** //
    if (Columns[columnIndex].renderCustomBody) {
      return Columns[columnIndex].renderCustomBody({ columnIndex, key, rowIndex, style: extendStyle, row });
    }
    // ***************************************** 其他欄位的處理 ***************************************** //
    return (
      <BaseHoverCell
        value={value}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        onMouseEnter={props.onEnter}
        onMouseLeave={props.Leave}
      />
    );
  }

  const cellRenderer = ({ columnIndex, key, rowIndex, style, ...rest }) => {
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
        width={props.width < 500 ? 500 : props.width}
        height={height}
        classNameBottomRightGrid="grid-bottom-right"
        enableFixedRowScroll={rows.length === 1}
      />
    </DataGridWrapper>
  );
}

// export default DataGrid;

const mapStateToProps = (state) => {
  return {
    roleType: state.xray.roleType
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);

