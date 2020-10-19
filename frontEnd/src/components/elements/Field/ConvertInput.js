import React, { useEffect, useState } from 'react';
import Field from '~~elements/Field';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isNaN from 'lodash/isNaN';
import _toString from 'lodash/toString';
import _isFinite from 'lodash/isFinite';

import useDebounce from '~~hooks/useDebounce';

// 用來檢查新的value是否合法
const checkValueValid = value => !(!_isFinite(value) && _isNil(value) || _isNaN(value));

// input 最大長度
const DEFAULT_MAX_LENGTH = 999;
const DEFAULT_MAX_STRING_LENGTH = 999;
const DEFAULT_MAX_NUMBER_LENGTH = 20;

const DATA_TYPE_MAX_LENGTH = {
  string: DEFAULT_MAX_STRING_LENGTH,
  float: DEFAULT_MAX_NUMBER_LENGTH,
  int: DEFAULT_MAX_NUMBER_LENGTH,
};

// 格式轉換：從原本的partlist搬過來
const DATA_TYPE_CONVERTER = {
  string: val => _toString(val),
  boolean: val => val,
  int: val => {
    const str = _toString(val);
    const newValue = parseInt(str, 10);
    return newValue;
  },
  float: val => {
    const str = _toString(val);
    const decimalPointCount = str.split('.').length - 1;
    if ((str.endsWith('.') || !!str.match(/\.(0*)$/)) && decimalPointCount === 1) {
      return str;
    }
    const newValue = parseFloat(str.endsWith('.') && decimalPointCount <= 1 ? `${str}0` : str);
    return newValue;
  },
};

function ConvertInput(props) {
  const {
    maxLength: propsMaxLength,
    onChange = () => { },
    dataType = 'string',
    value,
    needDebounce = true
  } = props;


  const [debounceValue, setDebounceValue] = useState(value);

  const maxLength = (propsMaxLength || _get(DATA_TYPE_MAX_LENGTH, [dataType], DEFAULT_MAX_LENGTH));

  const catchedDebounceValue = useDebounce(debounceValue, 150);

  const fieldValue = needDebounce ? debounceValue : value;

  useEffect(() => {
    onChange(debounceValue);
  }, [catchedDebounceValue]);


  useEffect(() => {
    if (value !== debounceValue) {
      setDebounceValue(value);
    }
  }, [value]);

  function handleOnChange(e) {
    const val = _get(e, ['target', 'value'], '');
    // 把value轉換成符合的格式
    const converter = _get(DATA_TYPE_CONVERTER, dataType, false);
    const convertValue = converter ? converter(val) : val;
    const isValid = checkValueValid(convertValue);
    const newValue = isValid ? convertValue : '';
    setDebounceValue(newValue);
    // onchange(newValue);
  }


  return (
    <Field.Input
      {...props}
      maxLength={maxLength}
      onChange={handleOnChange}
      value={checkValueValid(fieldValue) ? fieldValue : ''}
    />
  );
}


export default ConvertInput;
