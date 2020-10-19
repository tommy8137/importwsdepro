import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import { BaseCell, BaseInput } from '~~elements/DataGridCommonCell';

import CurrrentPriceAdjPercentageCellEditMode from './CurrrentPriceAdjPercentageCellEditMode';


function CurrrentPriceAdjPercentageCell(props) {
  const { columnIndex, parentKey, rowIndex, style, row, column, isEditMode, statusInfo, lock } = props;
  if (isEditMode && lock) {
    return (
      <div className="grid-cell e2e_last_adj" key={parentKey} style={style}><BaseInput disabled errors={[]} /></div>
    );
  }
  if (isEditMode) {
    return (
      <CurrrentPriceAdjPercentageCellEditMode
        cellInfo={{ columnIndex, key: parentKey, rowIndex, style }}
        helperInfo={{ statusInfo, row, value: column.key }}
        updatePersonalTableRowItemById={props.updatePersonalTableRowItemById}
        updateItemValidateError={props.updateItemValidateError}
        itemsValidateError={props.itemsValidateError}
        value={row[column.key]}
      />
    );
  }
  return (
    <BaseCell
      value={row[column.key]}
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


export default connect(mapStateToProps, mapDispatchToProps)(CurrrentPriceAdjPercentageCell);

