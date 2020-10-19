import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { MultiGrid } from 'react-virtualized';

import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import useComponentSize from '~~hooks/useComponentSize';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import {
  BaseCell,
  HeaderSorterCell,
} from '~~elements/DataGridCommonCell';


import Columns from '../ColumnSetting/ApproverPageColumn';
import getRowColor from './getRowColor';
import DataGridWrapper from '../DataGridStyles';


function DataGrid(props) {
  const {
    isEditMode,
    selectedInfo,
    tableData,
    lastModifiedItems,
    showEXPSpa = false,
    showPriceDiff = false,
  } = props;

  const rows = tableData;
  const { selectedList } = selectedInfo;
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
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={Columns[columnIndex].name}
      />
    );
  }
  function getIsEditMode(item) {
    if (item.leader_submitted_status === 'approve') {
      return false;
    }

    if (isEditMode && item.is_personal_submitted && !item.is_reject) {
      return true;
    }

    if (isEditMode && item.is_reject) {
      return true;
    }
    return false;
  }

  function renderGridBody({ columnIndex, key, rowIndex, style, isBottom }) {
    const item = rows[rowIndex];

    // ***************************************** row的底色處理 *****************************************
    let extendStyle = getRowColor(style, item, selectedList, lastModifiedItems);
    // ***************************************** row的底色處理 *****************************************

    if (Columns[columnIndex].renderCustomBody) {
      return Columns[columnIndex].renderCustomBody({
        columnIndex,
        key,
        rowIndex,
        style: extendStyle,
        row: rows[rowIndex],
        column: Columns[columnIndex],
        isEditMode: getIsEditMode(item),
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
          fixedColumnCount={2}
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
    selectedInfo: state.eeBomPersonalReducer.selectedInfo,
    tableData: state.eeBomPersonalReducer.tableData,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
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

