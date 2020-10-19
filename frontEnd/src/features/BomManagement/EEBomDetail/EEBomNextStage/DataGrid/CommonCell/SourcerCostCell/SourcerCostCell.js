import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import { BaseCell } from '~~elements/DataGridCommonCell';
import { comma } from '~~utils/Math';
import SourcerCostCellEditMode from './SourcerCostCellEditMode';


function SourcerCostCell(props) {
  const { columnIndex, parentKey, rowIndex, style, row, column, isEditMode, statusInfo } = props;
  const value = row[column.key];
  const commaValue = comma(value, 5);
  const val = commaValue ? <span className="e2e_sourcercost">{commaValue}</span> : null;
  if (isEditMode) {
    return (
      <SourcerCostCellEditMode
        cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
        helperInfo={{ statusInfo, row, value: column.key }}
        updatePersonalTableRowItemById={props.updatePersonalTableRowItemById}
        updateItemValidateError={props.updateItemValidateError}
        itemsValidateError={props.itemsValidateError}
        value={value}
      />
    );
  }
  return (
    <BaseCell
      value={val}
      cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
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


export default connect(mapStateToProps, mapDispatchToProps)(SourcerCostCell);

