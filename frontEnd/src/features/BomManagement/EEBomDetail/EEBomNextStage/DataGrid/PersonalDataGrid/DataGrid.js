import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { MultiGrid } from 'react-virtualized';


import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import useComponentSize from '~~hooks/useComponentSize';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import {
  BaseCell,
  HeaderSorterCell
} from '~~elements/DataGridCommonCell';

import Columns from '../ColumnSetting/PersonalPageColumn';
import DataGridWrapper from '../DataGridStyles';
import getRowColor from './getRowColor';


function DataGrid(props) {
  const {
    isEditMode,
    tableData,
    lastModifiedItems,
    showEXPSpa
  } = props;
  const rows = tableData;

  // 第一列 表頭
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    if (Columns[columnIndex].renderCustomHeader) {
      return Columns[columnIndex].renderCustomHeader({
        columnIndex,
        key,
        rowIndex,
        style,
        sortInfo: props.sortInfo,
        handleSort: props.updateSortInfo,
        columnInfo: Columns[columnIndex]
      });
    }

    if (Columns[columnIndex].sortable) {
      return (
        <HeaderSorterCell
          cellInfo={{ columnIndex, key, rowIndex, style }}
          value={Columns[columnIndex].name}
          sortInfo={props.sortInfo}
          handleSort={props.updateSortInfo}
          columnInfo={Columns[columnIndex]}
        />
      );
    }

    return (
      <BaseCell
        cellInfo={{ columnIndex, key, rowIndex, style }}
        value={Columns[columnIndex].name}
      />
    );
  }

  function renderGridBody({ columnIndex, key, rowIndex, style }) {
    const item = rows[rowIndex];

    // ***************************************** row的底色處理 *****************************************
    let extendStyle = getRowColor(style, item, lastModifiedItems);
    // ***************************************** row的底色處理 *****************************************

    if (Columns[columnIndex].renderCustomBody) {
      return Columns[columnIndex].renderCustomBody({
        columnIndex,
        key,
        rowIndex,
        style: extendStyle,
        row: rows[rowIndex],
        column: Columns[columnIndex],
        isEditMode: isEditMode && !item.is_personal_submitted,
        showEXPSpa,
      });
    }

    return (
      <BaseCell
        value={rows[rowIndex][Columns[columnIndex]['key']]}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
      />
    );
  }

  const cellRenderer = ({ columnIndex, key, rowIndex, style, ...rest }) => {
    switch (rowIndex) {
      case 0: {
        return renderGridHeader({ columnIndex, key, rowIndex, style: DataGridStyles.getHeaderStyle(style, Columns[columnIndex]), isEditMode });
      }
      default: {
        const index = rowIndex - 1;
        return renderGridBody({ columnIndex, key, rowIndex: index, style: DataGridStyles.getGridBodyStyle(style, Columns[columnIndex]), isEditMode });
      }
    }
  };


  let dataGridWrapperRef = useRef();
  let [size, setSize] = useComponentSize(dataGridWrapperRef);
  // 計算table可以多高
  let height = document.documentElement.clientHeight - 260;
  if (props.PCBInfo.isPCB) {
    height -= 55;
  }

  return (
    <DataGridWrapper>
      <div ref={dataGridWrapperRef}>
        <MultiGrid
          style={{ backgroundColor: 'white' }}
          cellRenderer={cellRenderer}
          columnWidth={({ index }) => DataGridStyles.getColumnWidth(index, Columns)}
          columnCount={Columns.length}
          fixedColumnCount={1}
          fixedRowCount={1}
          rowHeight={DataGridStyles.getRowHeight}
          rowCount={rows.length + 1}
          width={size.width < 500 ? 500 : size.width}
          height={height}
          classNameBottomRightGrid="datagrid-bottom-right"
        />
      </div>
    </DataGridWrapper>
  );
}


const mapStateToProps = (state) => {
  return {
    tableData: state.eeBomPersonalReducer.tableData,
    isEditMode: state.eeBomPersonalReducer.isEditMode,
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
    sortInfo: state.eeBomPersonalReducer.sortInfo,
    lastModifiedItems: state.eeBomPersonalReducer.lastModifiedItems,
  };
};

const mapDispatchToProps = {
  updateSortInfo: EEBomPersonalActions.updateSortInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);

