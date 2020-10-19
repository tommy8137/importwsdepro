import React, { useState, useEffect } from 'react';
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
  // console.log('validationSchema.isValidSync(rowValue)', validationSchema.isValidSync(rowValue));
  // return validationSchema.isValidSync(rowValue);
  const pattern =  /^\d+(\.\d+)?$/g;
  return pattern.test(String(rowValue));
}

function CECost(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { row },
    value,
  } = props;

  function handleChange(e) {
    const rowValue = e.target.value;
    // 如果使用者清空，就記錄null
    if (rowValue === '') {
      props.updateItemValidateError(row.id, 'currrent_price_adj_percentage', []);
      props.updateItemValidateError(row.id, 'ce_cost', []);
      props.updatePersonalTableRowItemById(row.id, 'ce_cost', null);
      return;
    }

    if (checkFloatValue(rowValue)) {
      const resultValue = rowValue.endsWith('0') ? rowValue : Number(rowValue);
      props.updateItemValidateError(row.id, 'ce_cost', []);
      props.updatePersonalTableRowItemById(row.id, 'ce_cost', resultValue);
    } else {
      props.updateItemValidateError(row.id, 'ce_cost', ['請輸入數字']);
      props.updatePersonalTableRowItemById(row.id, 'ce_cost', rowValue);
    }

    if (row.currrent_price_adj_percentage && !checkValue(row.currrent_price_adj_percentage)) {
      props.updateItemValidateError(row.id, 'currrent_price_adj_percentage', ['請輸入數字(0~1000)且不能為負值']);
      props.updatePersonalTableRowItemById(row.id, 'ce_cost', rowValue);
    }
  }
  return (
    <div className="grid-cell e2e_cecost" key={key} style={style}>
      <BaseInput
        uniqueId={key}
        placeholder="－"
        value={value}
        onChange={handleChange}
        onBlur={() => { }}
        errors={R.path([row.id, 'errors', 'ce_cost'], props.itemsValidateError) || []}
      />
    </div>
  );
}
export default CECost;
