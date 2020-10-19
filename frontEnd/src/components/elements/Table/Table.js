import styled from 'styled-components';
import { Table } from 'antd';


/**
 * 用顏色名稱拿到對應的色碼
 * @param {} colorName 樣式名稱 'black', 'blue', 'gray'
 */
const getTableHeaderColor = colorName => {
  switch (colorName) {
    case 'black':
      return '#333333';
    case 'blue':
      return '#7C90A9';
    case 'gray':
      return '#808080';
    default:
      return '#7C90A9';
  }
};

// tbody的顏色
const getTableBodyColor = colorName => {
  switch (colorName) {
    case 'white':
      return '#ffffff';
    case 'gray':
      return '#f0f0f0';
    default:
      return '#ffffff';
  }
};

// hover row的顏色
const getTableHoverColor = colorName => {
  switch (colorName) {
    case 'blue':
      return '#d7dde5';
    case 'gray':
      return '#d7d7d7';
    default:
      return '#e6f7ff';
  }
};

const StyledTable = styled(Table)`
  /* table header style */
  table {
    table-layout: fixed;
  }

  .ant-table-title{
    padding: 0
  }

  .ant-table-thead > tr > th{
    color: white;
    background: ${({ headerColor }) => getTableHeaderColor(headerColor)};
  }
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters,
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters:hover{
    background: ${({ headerColor }) => getTableHeaderColor(headerColor)};
  }

  .ant-table-thead > tr >th.ant-table-selection-column{
    border-right: 1px solid #d8d8d8;
  }
  /* table header style */

  /* sorter style */
  .ant-table-thead > tr > th
  .ant-table-column-sorter
  .ant-table-column-sorter-inner {
    .ant-table-column-sorter-up.on, .ant-table-column-sorter-down.on {
      color: white
    }
  }
  /* sorter style */

  /* table body style */
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: ${({ hoverColor }) => getTableHoverColor(hoverColor)};
  }
  .ant-table-body{
    border: 1px solid #d7d7d7
  }

  .ant-table-tbody > .ant-table-expanded-row > td {
   padding: 0;
  }
  .ant-table-tbody > tr > td.ant-table-selection-column{
    border-right: 1px solid #d8d8d8;
  }

  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #333333;
    border-color: #333333;
  }

  .bold-border-right.bold-border-right{
    border-right: 1px solid #d8d8d8;
  }

  /* table body style */

  .ant-table-thead > tr {
    height: ${({ headerHeight }) => headerHeight};
  }

  .ant-table-thead > tr > th{
    padding: 8px 8px;
    white-space: pre-line;
  }
  .ant-table-tbody > tr > td {
    padding: 8px 8px;
    word-break: break-word;
    background-color: ${({ tableBodyColor }) => getTableBodyColor(tableBodyColor)};
    vertical-align: ${({ verticalAlign }) => verticalAlign};
    .ant-table-wrapper {
      margin: 0;
    }

    &.custom-colspan {
      background-color: #88D4E5;
      font-weight: 700;
    }
  }
  .ant-disabled-row {
    cursor: not-allowed;
  }

`;

StyledTable.defaultProps = {
  headerColor: 'black',
  // 預設的header高度為70px
  headerHeight: '70px',
  tableBodyColor: 'white',
  hoverColor: 'gray',
  verticalAlign: 'middle'
};

export default StyledTable;
