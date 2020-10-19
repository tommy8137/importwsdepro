import React, { useState } from 'react';
import * as yup from 'yup';
import * as R from 'ramda';
import { BaseInput } from '~~elements/DataGridCommonCell';


function RemarkEditMode(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { statusInfo, selectorHelper, row },
    value,
  } = props;
  return (
    <div className="grid-cell" key={key} style={style}>
      <BaseInput
        value={value}
        onChange={(e) => {
          props.updatePersonalTableRowItemById(row.id, 'remark', e.target.value);
          const validationSchema = yup.string().max(200);
          validationSchema.isValid(e.target.value)
            .then(isValid => {
              // console.log('>>>>>>>>>>', isValid);
              if (isValid) {
                props.updateItemValidateError(row.id,
                  'remark',
                  []);
              } else {
                props.updateItemValidateError(row.id,
                  'remark',
                  ['不能超過200字']);
              }
            })
            .catch(err => {
              console.error('<<<<<<<<<<<', err);
            });
        }}
        errors={R.path([row.id, 'errors', 'remark'], props.itemsValidateError) || []}
      />
    </div>
  );
}

export default RemarkEditMode;
