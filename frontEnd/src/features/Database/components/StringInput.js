import React, { useState, useCallback, Fragment, useRef } from 'react';
import { comma, round } from '~~utils/Math';
import _debounce from 'lodash/debounce';
import Field from '~~elements/Field';


const StringInput = (props) => {
  const {
    value,
    onChange,
    disabled,
    maxLength
  } = props;


  function handleOnChange(e) {
    onChange(e.target.value);
  }
  /**
   *  on blur 的時候把字串切掉
   * @param {*} e event
   */
  function handleOnBlur(e) {
    if (e.target.value.length > maxLength) {
      onChange(e.target.value.slice(0, maxLength));
    }
  }
  return (
    <Fragment>
      <Field.Input
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </Fragment>
  );
};

StringInput.defaultProps = {
  value: '',
  onChange: () => { },
  disabled: false,
  // 最大限制兩百字
  maxLength: 200
};

export default StringInput;
