import React, { Fragment } from 'react';
import { round } from '~~utils/Math';
import _debounce from 'lodash/debounce';
import Field from '~~elements/Field';

// 可以為空
const NumberInputCanEmpty = (props) => {
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
          console.log('=====>value', value);
          const isFloat =  (/^\d+(\.\d+)?$/g).test(value);
          const isInt =  (/^\d+$/).test(value);
          if (value === '') {
            onChange('');
            return;
          }
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

NumberInputCanEmpty.defaultProps = {
  value: '',
  onChange: () => {},
  disabled: false,
};

export default NumberInputCanEmpty;
