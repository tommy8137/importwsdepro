import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import { BaseCell, BaseInput } from '~~elements/DataGridCommonCell';
import { comma } from '~~utils/Math';

import CECostCellEditMode from './CECostCellEditMode';


function CECostCell(props) {
  const { columnIndex, parentKey, rowIndex, style, row, column, isEditMode, lock } = props;
  const value = row[column.key];
  const commaValue = comma(value, 5);
  if (isEditMode && lock) {
    return (
      <div className="grid-cell e2e_cecost" key={parentKey} style={style}><BaseInput disabled errors={[]} /></div>
    );
  }
  if (isEditMode) {
    return (
      <CECostCellEditMode
        cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
        helperInfo={{ row, value: column.key }}
        updatePersonalTableRowItemById={props.updatePersonalTableRowItemById}
        updateItemValidateError={props.updateItemValidateError}
        itemsValidateError={props.itemsValidateError}
        value={value}
        lock={lock}
      />
    );
  }
  return (
    <BaseCell
      value={commaValue}
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


export default connect(mapStateToProps, mapDispatchToProps)(CECostCell);

