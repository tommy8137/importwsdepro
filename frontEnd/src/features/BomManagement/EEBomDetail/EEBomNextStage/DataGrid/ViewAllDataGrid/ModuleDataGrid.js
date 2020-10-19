import React, { useRef, useState } from 'react';
import { MultiGrid } from 'react-virtualized';

import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import useComponentSize from '~~hooks/useComponentSize';
import {
  BaseCell,
  BaseCellWithTooltip,
  HeaderSorterCell
} from '~~elements/DataGridCommonCell';

import ColumnByModule from '../ColumnSetting/ColumnByModule';
import DataGridWrapper from '../DataGridStyles';


function DataGrid(props) {
  const {
    rows,
    columnType
  } = props;

  const Columns = ColumnByModule;

  // 第一列 表頭
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    let extendStyle = { ...style };

    if (Columns[columnIndex].renderCustomHeader) {
      return Columns[columnIndex].renderCustomHeader({
        columnIndex,
        key,
        rowIndex,
        style: extendStyle,
        sortInfo: props.sortInfo,
        handleSort: props.updateSortInfo,
        columnInfo: Columns[columnIndex]
      });
    }


    if (Columns[columnIndex].sortable) {
      return (
        <HeaderSorterCell
          cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
          value={Columns[columnIndex].name}
          sortInfo={props.sortInfo}
          handleSort={props.updateSortInfo}
          columnInfo={Columns[columnIndex]}
        />
      );
    }

    return (
      <BaseCell
        key={columnIndex}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={Columns[columnIndex].name}
      />
    );
  }

  function renderGridBody({ columnIndex, key, rowIndex, style, isBottom }) {
    const item = rows[rowIndex];
    let extendStyle = {
      ...style
    };

    if (Columns[columnIndex].renderCustomBody) {
      return Columns[columnIndex].renderCustomBody({
        columnIndex,
        key,
        rowIndex,
        style: extendStyle,
        row: rows[rowIndex],
        column: Columns[columnIndex],
        isEditMode: false
      });
    }

    return (
      <BaseCell
        value={rows[rowIndex][Columns[columnIndex]['key']]}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
      />
    );
  }

  console.log(rows, Columns);
  const cellRenderer = ({ columnIndex, key, rowIndex, style, ...rest }) => {
    console.log(key, '==============cellrenderer');
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


  let dataGridWrapperRef = useRef();
  let [size, setSize] = useComponentSize(dataGridWrapperRef);

  return (
    <DataGridWrapper>
      <div ref={dataGridWrapperRef}>
        <MultiGrid
          style={{ backgroundColor: 'white' }}
          cellRenderer={cellRenderer}
          columnWidth={({ index }) => DataGridStyles.getColumnWidth(index, Columns)}
          columnCount={Columns.length}
          fixedRowCount={1}
          rowHeight={DataGridStyles.getRowHeight}
          rowCount={rows.length + 1}
          width={size.width < 500 ? 500 : size.width}
          height={props.height}
          classNameBottomRightGrid="datagrid-bottom-right"
        />
      </div>
    </DataGridWrapper>
  );
}

export default DataGrid;
