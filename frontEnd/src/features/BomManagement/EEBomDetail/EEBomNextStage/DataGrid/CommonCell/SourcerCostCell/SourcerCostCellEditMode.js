import React, { useState } from 'react';
import * as yup from 'yup';
import * as R from 'ramda';
import { BaseInput } from '~~elements/DataGridCommonCell';

function checkValue(rowValue) {
  const pattern = /^\d+$/;
  return pattern.test(rowValue) && rowValue >= 0 && rowValue <= 1000;
}
function checkFloatValue(rowValue) {
  // const validationSchema = yup.number()
  //   .transform((convertedValue, originalvalue) => {
  //     return Number(originalvalue);
  //   })
  //   .typeError('請輸入數字')
  //   .nullable()
  //   .positive('請勿輸入負數');
  // return validationSchema.isValidSync(rowValue);
  const pattern = /^\d+(\.\d+)?$/g;
  return pattern.test(String(rowValue));
}

function SourcerCostCellEditMode(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { statusInfo, selectorHelper, row, value: fieldKey },
    value,
  } = props;

  return (
    <div className="grid-cell e2e_sourcecost" key={key} style={style}>
      <BaseInput
        uniqueId={key}
        placeholder="－"
        value={value}
        onChange={(e) => {
          const rowValue = e.target.value;
          // 如果使用者清空，就記錄null
          if (rowValue === '') {
            props.updateItemValidateError(row.id, fieldKey, []);
            props.updatePersonalTableRowItemById(row.id, fieldKey, null);
            return;
          }

          if (checkFloatValue(rowValue)) {
            const resultValue = rowValue.endsWith('0') ? rowValue : Number(rowValue);
            props.updateItemValidateError(row.id, fieldKey, []);
            props.updatePersonalTableRowItemById(row.id, fieldKey, resultValue);
          } else {
            props.updateItemValidateError(row.id, fieldKey, ['請輸入數字']);
            props.updatePersonalTableRowItemById(row.id, fieldKey, rowValue);
          }
        }}
        onBlur={() => { }}
        errors={R.path([row.id, 'errors', fieldKey], props.itemsValidateError) || []}
      />
    </div>
  );
}

export default SourcerCostCellEditMode;
