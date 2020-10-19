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
  const pattern = /^((\d+\.?\d*)|(\.\d+))$/;
  return pattern.test(rowValue);
}

function CurrrentPriceAdjPercentageCellEditMode(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { statusInfo, selectorHelper, row },
    value,
  } = props;
  // console.log('cellInfocellInfo', key);
  return (
    <div className="grid-cell e2e_last_adj" key={key} style={style}>
      <BaseInput
        uniqueId={key}
        placeholder="－"
        value={value}
        onChange={(e) => {
          const rowValue = e.target.value;
          // 如果使用者清空，就記錄null
          if (rowValue === '') {
            props.updateItemValidateError(row.id,
              'ce_cost',
              []);
            props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              []);
          } else if (checkValue(rowValue)) {
            props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              []);
          } else {
            props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              ['請輸入數字(0~1000)且不能為負值']);
          }
          if (row.ce_cost && !checkFloatValue(row.ce_cost)) {
            props.updateItemValidateError(row.id,
              'ce_cost',
              ['請輸入數字']);
          }
          if (rowValue === '') {
            props.updatePersonalTableRowItemById(row.id,
              'currrent_price_adj_percentage',
              null);
            return false;
          }
          props.updatePersonalTableRowItemById(row.id,
            'currrent_price_adj_percentage',
            (Number.isNaN(Number(rowValue)) ? rowValue : Number(rowValue)));

          return false;
        }}
        onBlur={() => { }}
        errors={R.path([row.id, 'errors', 'currrent_price_adj_percentage'], props.itemsValidateError) || []}
      />
    </div>
  );
}

export default CurrrentPriceAdjPercentageCellEditMode;
