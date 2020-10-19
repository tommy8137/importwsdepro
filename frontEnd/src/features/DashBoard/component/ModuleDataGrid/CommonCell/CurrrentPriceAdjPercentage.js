import React, { useState } from 'react';

import InputCell from './InputCell';


function renderCurrrentPriceAdjPercentage(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { statusInfo, selectorHelper, row },
    value,
    isBottom
  } = props;
  console.log('cellInfocellInfo', key);
  return (
    <div className="grid-cell" key={key} style={style}>
      <InputCell
        uniqueId={key}
        placeholder="－"
        value={value}
        onChange={(e) => {
          // 如果使用者清空，就記錄null
          if (e.target.value === '') {
            props.updatePersonalTableRowItemById(row.id,
              'currrent_price_adj_percentage',
              null);
          } else {
            props.updatePersonalTableRowItemById(row.id,
              'currrent_price_adj_percentage',
              (Number.isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value)));
          }
          // 檢查是否合法
          const rowValue = e.target.value;
          // 如果user 清空資料也沒關係
          if (rowValue === '') {
            console.log('rowValue合法', rowValue);
            return props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              []);
          }
          // 要是0~1000的數字
          const pattern = /^\d+$/;
          if (pattern.test(rowValue) && rowValue >= 0 && rowValue <= 1000) {
            console.log('合法', rowValue);
            props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              []);
          } else {
            console.log('不合法', rowValue);
            props.updateItemValidateError(row.id,
              'currrent_price_adj_percentage',
              ['請輸入數字(0~1000)且不能為負值']);
          }
          return false;
        }}
        onBlur={() => { }}
        errors={props.itemsValidateError ? props.itemsValidateError[row.id].errors['currrent_price_adj_percentage'] : []}
        isBottom={isBottom}
      />
    </div>
  );
}

export default renderCurrrentPriceAdjPercentage;
