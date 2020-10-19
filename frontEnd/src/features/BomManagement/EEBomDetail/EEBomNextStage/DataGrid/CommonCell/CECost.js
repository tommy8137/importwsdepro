// import React, { useState, useEffect } from 'react';
// import * as yup from 'yup';
// import * as R from 'ramda';

// import { BaseInput } from '~~elements/DataGridCommonCell';

// function checkValue(rowValue) {
//   const pattern = /^\d+$/;
//   return pattern.test(rowValue) && rowValue >= 0 && rowValue <= 1000;
// }
// function checkFloatValue(rowValue) {
//   const validationSchema = yup.number()
//     .transform((convertedValue, originalvalue) => {
//       return Number(originalvalue);
//     })
//     .typeError('請輸入數字')
//     .nullable()
//     .positive('請勿輸入負數');
//   return validationSchema.isValidSync(rowValue);
// }

// function CECost(props) {
//   const {
//     cellInfo: { columnIndex, key, rowIndex, style },
//     helperInfo: { statusInfo, selectorHelper, row },
//     value,
//   } = props;

//   function handleChange(e) {
//     const rowValue = e.target.value;
//     // 如果使用者清空，就記錄null
//     if (rowValue === '') {
//       props.updateItemValidateError(row.id,
//         'currrent_price_adj_percentage',
//         []);
//       props.updateItemValidateError(row.id,
//         'ce_cost',
//         []);
//     } else if (checkValue(row.currrent_price_adj_percentage)) {
//       props.updateItemValidateError(row.id,
//         'ce_cost',
//         ['% & CE Cost只能擇一填寫']);
//     } else if (checkFloatValue(rowValue)) {
//       console.log('合法', rowValue);
//       props.updateItemValidateError(row.id,
//         'ce_cost',
//         []);
//     } else {
//       console.log('不合法', rowValue);
//       props.updateItemValidateError(row.id,
//         'ce_cost',
//         ['請輸入數字']);
//     }
//     if (row.currrent_price_adj_percentage && !checkValue(row.currrent_price_adj_percentage)) {
//       props.updateItemValidateError(row.id,
//         'currrent_price_adj_percentage',
//         ['請輸入數字(0~1000)且不能為負值']);
//     }
//     if (rowValue === '') {
//       props.updatePersonalTableRowItemById(row.id,
//         'ce_cost',
//         null);
//       return false;
//     }
//     // else if (
//     //   ((rowValue.split('.')).length - 1) === 1 &&
//     //   rowValue.substr(rowValue.length - 1, 1) === '.'
//     // ) {
//     //   props.updatePersonalTableRowItemById(row.id,
//     //     'ce_cost',
//     //     rowValue);
//     //   return false;
//     // }
//     // props.updatePersonalTableRowItemById(row.id,
//     //   'ce_cost',
//     //   (parseFloat(rowValue)) ? parseFloat(rowValue) : rowValue);
//     props.updatePersonalTableRowItemById(row.id,
//       'ce_cost',
//       rowValue);
//     return false;
//   }

//   return (
//     <div className="grid-cell" key={key} style={style}>
//       <BaseInput
//         uniqueId={key}
//         placeholder="－"
//         value={value}
//         onChange={handleChange}
//         onBlur={() => { }}
//         errors={R.path([row.id, 'errors', 'ce_cost'], props.itemsValidateError) || []}
//       />
//     </div>
//   );
// }
// export default CECost;
