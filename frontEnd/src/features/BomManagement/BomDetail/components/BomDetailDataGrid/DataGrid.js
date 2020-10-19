import React, { useRef } from 'react';
import { MultiGrid } from 'react-virtualized';
import styled from 'styled-components';
import _find from 'lodash/find';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';

import { HeaderCellWithQuestionMark, BaseCell, HeaderDropdownCell } from '~~elements/DataGridCommonCell';
import useComponentSize from '~~hooks/useComponentSize';
import getRowColor from './getRowColor';

const Dropdown = styled.div`
  transition: .3s ease all;
  cursor: normal;
  &:hover {
    background: #F0F0F0;
    transition: .3s ease all;
    cursor: pointer;
  }
`;

function DataGrid(props) {
  const {
    rows,
    useCE,
    editAble,
    isEditMode: propsEditMode,
    isAtAllTab,
    columns: ColumnSetting,
    withSplit = false,
    isSpliting = false,
    onClickSplit = () => {},
    onScroll,
    scrollTop,
    editableColumns,
    bomID,
  } = props;

  // CE決定有哪些欄位需要顯示 問號icon
  const tooltipHeaders = isAtAllTab && useCE ? ['current_price', 'system_cost', 'spa_cost'] : [];
  const tooltipContentInfo = {
    current_price: <p>游標懸浮於價錢可顯示Valid Date</p>,
    system_cost: <p>游標懸浮於母階價錢，可顯示<br />組工費與子階總價</p>,
    spa_cost: <p>游標懸浮於SPA Cost，可顯示您<br />輸入的價錢與料號</p>,
  };
  // ===== start: Render Grid Header =========================
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    let extendStyle = { ...style };
    const columnKey = ColumnSetting[columnIndex]['key'];
    const columnName = ColumnSetting[columnIndex].name;
    const lastColKey = ColumnSetting[ColumnSetting.length - 1].key;

    if (tooltipHeaders.includes(columnKey)) {
      return (
        <div className="grid-cell" key={`header_${columnName}_${columnIndex}`} style={{ ...extendStyle }}>
          <HeaderCellWithQuestionMark
            value={columnName}
            tooltip={tooltipContentInfo[columnKey]}
          />
        </div>
      );
    }

    if (withSplit) {
      return (
        <HeaderDropdownCell
          key={`header_${columnName}_${columnIndex}`}
          cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
          value={ColumnSetting[columnIndex].name}
        >
          <Dropdown onClick={e => onClickSplit(columnKey, !(isSpliting && columnKey === lastColKey))}>
            {isSpliting && columnKey === lastColKey ? '解除凍結' : '凍結欄位'}
          </Dropdown>
        </HeaderDropdownCell>
      );
    }

    return (
      <BaseCell
        key={`header_${columnName}_${columnIndex}`}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={ColumnSetting[columnIndex].name}
      />);
  }
  // ===== end: Render Grid Header =========================

  // ===== start: Render Grid Body =========================
  function renderGridBody({ columnIndex, key, rowIndex, style, onClick }) {
    const item = rows[rowIndex];

    const columnKey = ColumnSetting[columnIndex]['key'];
    const columnValue = item[columnKey];
    const isEditMode = propsEditMode && !!_find(editableColumns, o => o.key === columnKey);
    let extendStyle = getRowColor(style, item, editAble);


    if (ColumnSetting[columnIndex].renderCustomBody) {
      return ColumnSetting[columnIndex].renderCustomBody({
        columnIndex,
        key,
        rowIndex,
        style: extendStyle,
        row: rows[rowIndex],
        column: ColumnSetting[columnIndex],
        isEditMode,
        onClick,
        bomID,
      });
    }

    return (<BaseCell
      key={`${rowIndex}_${columnIndex}`}
      onClick={onClick}
      value={columnValue}
      cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
    />);
  }
  // ===== end: Render Grid Body =========================


  // ===== start: Render ALL Cells =========================
  const cellRenderer = ({ columnIndex, key, rowIndex, style, ...rest }) => {
    switch (rowIndex) {
      case 0: { // 表頭
        return renderGridHeader({ columnIndex, key, rowIndex, style: DataGridStyles.getHeaderStyle(style, ColumnSetting[columnIndex]) });
      }
      default: { // 內容
        const index = rowIndex - 1;
        return renderGridBody({
          columnIndex,
          key,
          rowIndex: index,
          style: DataGridStyles.getGridBodyStyle(style, ColumnSetting[columnIndex]),
          onClick: propsEditMode ? () => { } : () => props.onClickRow(rows[index].id, rows[index])
        });
      }
    }
  };
  // ===== end: Render ALL Cells =========================


  /** =======================================================
   *      Main component
   ======================================================= */

  let dataGridWrapperRef = useRef();
  let [size, setSize] = useComponentSize(dataGridWrapperRef);

  function getHeight() {
    const infoHeight = props.isInputBomInfoOpen ? 72 : 0;
    let maxHeight = document.documentElement.clientHeight - 220 - infoHeight;
    return !rows.length ?
      DataGridStyles.getRowHeight({ index: 0 }) :
      maxHeight;
  }

  return (
    <div ref={dataGridWrapperRef}>
      <MultiGrid
        onScroll={onScroll}
        scrollTop={scrollTop}
        key={JSON.stringify(isAtAllTab && useCE)}
        style={{ backgroundColor: 'white', textAlign: 'center' }}
        cellRenderer={cellRenderer}
        columnWidth={({ index }) => DataGridStyles.getColumnWidth(index, ColumnSetting)}
        columnCount={ColumnSetting.length}
        fixedRowCount={1}
        rowHeight={DataGridStyles.getRowHeight}
        rowCount={rows.length + 1}
        width={props.width > size.width ? size.width : props.width}
        height={getHeight()}
        classNameBottomRightGrid="datagrid-bottom-right"
      />
      {!rows.length && props.emptyRow}
    </div>
  );
}

export default DataGrid;
