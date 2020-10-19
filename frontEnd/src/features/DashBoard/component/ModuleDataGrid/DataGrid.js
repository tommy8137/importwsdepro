import React, { useRef, useState } from 'react';
import { MultiGrid } from 'react-virtualized';
import _get from 'lodash/get';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import useComponentSize from '~~hooks/useComponentSize';

import {
  BaseCell,
  BaseCellWithTooltip,
} from '~~elements/DataGridCommonCell';
import { BaseHeaderCell, CheckboxCell } from './CommonCell';
import { eeColumns, meColumns, pcbColumns, } from './ColumnSetting';


function DataGrid(props) {
  const { rows, columnType } = props;
  const ColumnSetting = {
    ME: meColumns,
    EE: eeColumns,
    PCB: pcbColumns,
  }[columnType];

  // console.log('columnType :', columnType);
  // console.log('ColumnSetting :', ColumnSetting);
  // ===== start: Render Grid Header =========================
  function renderGridHeader({ columnIndex, key, rowIndex, style }) {
    let extendStyle = { ...style };
    // const columnKey = ColumnSetting[columnIndex]['key'];
    // const columnName = ColumnSetting[columnIndex].name;
    return (
      <BaseHeaderCell
        key={columnIndex}
        cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        value={ColumnSetting[columnIndex].name}
      />
    );
  }
  // ===== end: Render Grid Header =========================

  // ===== start: Render Grid Body =========================
  function renderGridBody({ columnIndex, key, rowIndex, style, extProps }) {
    const item = rows[rowIndex];

    const columnKey = ColumnSetting[columnIndex]['key'];
    const columnValue = item[ColumnSetting[columnIndex]['key']];
    const columnName = ColumnSetting[columnIndex]['name'];
    const extendStyle = { ...style, background: '#ffffff' };

    switch (columnKey) {
      case 'description':
      case 'remark':
      case 'part_name': {
        const value = columnValue;
        const valueEl = (<span className="hoverUnderline">{value || '-'}</span>);
        const label = value ? (
          <div>
            <div style={{ fontWeight: 500, color: '#333' }}>{columnName}</div>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '-' : value}</div>
          </div >
        ) : null;
        return (
          <BaseCellWithTooltip
            {...extProps}
            value={valueEl}
            cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
            helperInfo={{ row: rows[rowIndex] }}
            label={label}
          />
        );
      }
      case 'is_count':
        return (<CheckboxCell
          {...extProps}
          value={columnValue}
          cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
          label={columnName}
        />);
      case 'avl_spa':
      case 'avl_alt': {
        const cellStyle =  _get(item, `${columnKey}_bolder`, false)
          ? { ...extendStyle, fontWeight: 'bolder', textDecoration: 'underline', }
          : extendStyle;
        return (<BaseCell
          {...extProps}
          value={columnValue}
          title={columnValue}
          cellInfo={{ columnIndex, key, rowIndex, style: cellStyle }}
        />);
      }
      default:
        return (<BaseCell
          {...extProps}
          value={columnValue}
          title={columnValue}
          cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
        />);
    }
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
          extProps: {
            // onClick: () => props.onClickRow(rows[index].id),
          }
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
  // const autoCalHeight = () => (document.documentElement.clientHeight <= 800 ? 485 : 685);
  const getHeight = () => (!rows.length ?
    DataGridStyles.getRowHeight({ index: 0 }) :
    485);

  return (
    <div>
      <div ref={dataGridWrapperRef}>
        <MultiGrid
          style={{ textAlign: 'left', border: 'solid 1px #d7d7d7' }}
          cellRenderer={cellRenderer}
          columnWidth={({ index }) => DataGridStyles.getColumnWidth(index, ColumnSetting)}
          columnCount={ColumnSetting.length}
          fixedRowCount={1}
          rowHeight={DataGridStyles.getRowHeight}
          rowCount={rows.length + 1}
          width={size.width < 500 ? 500 : 1078}
          height={getHeight()}
          classNameBottomRightGrid="datagrid-bottom-right"
        />
        {!rows.length && props.emptyRow}
      </div>
    </div>
  );
}

export default DataGrid;
