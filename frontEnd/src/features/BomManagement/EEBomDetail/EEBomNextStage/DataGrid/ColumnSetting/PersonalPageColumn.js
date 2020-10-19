import React from 'react';
import ColumnByPN from './ColumnByPN';
import PersonalCheckedCell from '../PersonalDataGrid/Cell/PersonalCheckedCell';
import PersonalCheckedHeaderCell from '../PersonalDataGrid/Cell/PersonalCheckedHeaderCell';
import ApproverCheckedCell from '../ApproverDataGrid/Cell/ApproverCheckedCell';

const columns = [
  {
    key: 'is_personal_checked',
    name: 'isPersonalChecked',
    width: 30,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo, isEditMode }) => {
      return (
        <div className="grid-cell" key={key} style={style}>
          <PersonalCheckedHeaderCell
            cellInfo={{ columnIndex, key, rowIndex, style }}
            isEditMode={isEditMode}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      return (
        <PersonalCheckedCell
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, columnKey: column.key }}
          isEditMode={isEditMode}
        />
      );
    }
  },
  ...ColumnByPN
];


export default columns;
