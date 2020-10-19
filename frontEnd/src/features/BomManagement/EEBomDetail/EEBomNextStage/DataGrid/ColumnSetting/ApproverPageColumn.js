import React from 'react';
import _get from 'lodash/get';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import { addToArray } from '~~utils/CommonUtils';
import ColumnByPN from './ColumnByPN';
import ApproverCheckedHeaderCell from '../ApproverDataGrid/Cell/ApproverCheckedHeaderCell';
import ApproverCheckedCell from '../ApproverDataGrid/Cell/ApproverCheckedCell';
import MemberCheckStatusCell from '../ApproverDataGrid/Cell/MemberCheckStatusCell';


const columns = [
  {
    key: 'leader_checked_status',
    name: 'LeaderCheckedStatus',
    width: 30,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={style}>
          <ApproverCheckedHeaderCell
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      return (
        <ApproverCheckedCell
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
        />
      );
    }
  },
  {
    key: 'is_personal_submitted',
    name: 'Checked',
    width: 50,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style }) => {
      const extendStyle = {
        ...style,
        ...DataGridStyles.borderRightStyle
      };
      return (
        <div className="grid-cell" key={key} style={extendStyle}>
          Checked
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column }) => {
      return (
        <MemberCheckStatusCell
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, columnKey: column.key  }}
        />
      );
    }
  },
];

const addColumn = addToArray(ColumnByPN);
let result = addColumn(0, ...columns);

export default [...result];
