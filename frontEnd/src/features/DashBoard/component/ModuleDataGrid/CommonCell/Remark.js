import React, { useState } from 'react';
import * as yup from 'yup';
import InputCell from './InputCell';

function Remark(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { statusInfo, selectorHelper, row },
    value,
    isBottom,
  } = props;
  return (
    <div className="grid-cell" key={key} style={style}>
      <InputCell
        value={value}
        onChange={(e) => {
          props.updatePersonalTableRowItemById(row.id, 'remark', e.target.value);
          const validationSchema = yup.string().max(200);
          validationSchema.isValid(e.target.value)
            .then(isValid => {
              console.log('>>>>>>>>>>', isValid);
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
              console.log('<<<<<<<<<<<', err);
            });
        }}
        errors={props.itemsValidateError ? props.itemsValidateError[row.id].errors['remark'] : []}
        isBottom={isBottom}
      />
    </div>
  );
}

export default Remark;
