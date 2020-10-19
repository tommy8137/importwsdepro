import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { BaseCell, BaseInput } from '~~elements/DataGridCommonCell';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';

function SuggestionRemarkCell(props) {
  const { value, cellInfo, helperInfo, onClick } = props;
  const { columnIndex, key, rowIndex, style } = cellInfo;
  const { isEditMode, row, columnKey } = helperInfo;
  if (isEditMode) {
    return (
      <div className="grid-cell" key={key} style={style}>
        <BaseInput
          value={value}
          onChange={(e) => {
            let inputValue = e.target.value;
            if (inputValue === '') {
              // 更新表單為null
              props.updateRowItemValidateError(row.id, columnKey, []);
              props.updateMEBomTableCellById(row.id, columnKey, null);
              return;
            }
            props.updateMEBomTableCellById(row.id, columnKey, inputValue);

            const validationSchema = yup
              .string()
              .max(48, '長度限制為 48 字');

              validationSchema.validate(inputValue)
              .then(() => {
                // console.log('>>>>>>>>>>合法', inputValue);
                props.updateRowItemValidateError(row.id, columnKey, []);
              })
              .catch(err => {
                console.error('>>>>>>>>>>不合法', err.errors);
                props.updateRowItemValidateError(row.id, columnKey, err.errors);
              });
          }}
          errors={props.itemsValidateErrorObj ? props.itemsValidateErrorObj[row.id].errors[columnKey] : []}
        />
      </div>
    );
  }
  return (
    <BaseCell
      onClick={onClick}
      value={value}
      cellInfo={cellInfo}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    itemsValidateErrorObj: state.bomDetail.itemsValidateErrorObj,
  };
};

const mapDispatchToProps = {
  updateRowItemValidateError: BomDetailActions.updateRowItemValidateError,
  updateMEBomTableCellById: BomDetailActions.updateMEBomTableCellById,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionRemarkCell);

