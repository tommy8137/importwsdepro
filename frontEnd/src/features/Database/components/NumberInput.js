import React, { useState, useCallback, Fragment, useRef } from 'react';
import { comma, round } from '~~utils/Math';
import _debounce from 'lodash/debounce';
import Field from '~~elements/Field';


const NumberInput = (props) => {
  const {
    value,
    onChange,
    disabled,
  } = props;


  return (
    <Fragment>
      <Field.Input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => {
          const isFloat =  (/^\d+(\.\d+)?$/g).test(value);
          const isInt =  (/^\d+$/).test(value);
          if (!isInt && !isFloat) {
            onChange(0);
          }
          if (isFloat) {
            onChange(round(value, 8));
          }
        }}
      />
    </Fragment>
  );
};

NumberInput.defaultProps = {
  value: '',
  onChange: () => {},
  disabled: false,
};

export default NumberInput;
