import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import { BaseCellWithTooltip } from '~~elements/DataGridCommonCell';

import RemarkEditMode from './RemarkEditMode';


function Remark(props) {
  const { columnIndex, parentKey, rowIndex, style, row, column, isEditMode } = props;
  if (isEditMode) {
    return (
      <RemarkEditMode
        cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
        helperInfo={{ row, value: row[column.key] }}
        updatePersonalTableRowItemById={props.updatePersonalTableRowItemById}
        updateItemValidateError={props.updateItemValidateError}
        itemsValidateError={props.itemsValidateError}
        value={row[column.key]}
      />
    );
  }
  const value = row[column.key];
  // const valueEl = (<span className="hoverUnderline">{value || '-'}</span>);
  const label = value ? (
    <div>
      <div style={{ fontWeight: 500, color: '#333' }}>{column.name}</div>
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '-' : value}</div>
    </div >
  ) : null;
  return (
    <BaseCellWithTooltip
      value={value}
      cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
      helperInfo={{ row }}
      label={label}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    itemsValidateError: state.eeBomPersonalReducer.itemsValidateError,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
  updateItemValidateError: EEBomPersonalActions.updateItemValidateError,
};


export default connect(mapStateToProps, mapDispatchToProps)(Remark);

