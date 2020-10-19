import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import _get from 'lodash/get';
import _isBoolean from 'lodash/isBoolean';
import Switch from '~~elements/Switch';
import LabelField from './LabelField';

const Div = styled.div`
  .field {
    &:focus {
      outline: none;
      border: none;
    }
  }
  .duck-field {
    margin-bottom: 1rem;
    &--switch-zone {
      display: flex;
      &--label{
        color: ${({ disabled }) => (disabled ? 'rgba(0,0,0,0.5)' : '#333333')};
        font-size: 0.9rem;
        padding-top: 0.1rem;
        &.left{
          margin-right: 0.5rem
        }
        &.right{
          margin-left: 0.5rem
        }
      }
    }
  }
`;

function checkIsEval(evalValue, value) {
  try {
    // eslint-disable-next-line no-eval
    return eval(evalValue)(value);
  } catch (e) {
    return false;
  }
}

function SwitchField(props) {
  const [fieldValue, setFieldValue] = useState(false);

  const {
    name = '',
    value = false,
    fieldConfig: { label, require, key, checkboxConfig },
    fieldConfig,
    isShown,
    disabled,
    onChange = () => { }
  } = props;

  // 收到value時的對應表
  const checkboxMapped = _get(checkboxConfig, ['mapped'], null);
  // set formdata時是否轉換成新的value
  const convert = _get(checkboxConfig, ['convert'], false);

  const checkboxLabel = _get(checkboxConfig, ['label'], {});

  useEffect(() => {
    // 如果value不是布林值, 則需要帶入轉換把Y=true, N=false, 則帶入mapped轉換
    if (checkboxMapped && !_isBoolean(value)) {
      let newValue = value;
      // 在收到新的value時, 將value轉換為true/false供顯示使用    ex.Y => true, N => false
      newValue = Object.keys(checkboxMapped).reduce((prev, mappedKey) => {
        const mappedVal = _get(checkboxMapped, [mappedKey], null);
        const isEvalEqual = checkIsEval(mappedVal, value);
        if (mappedVal === value || isEvalEqual) {
          const newVal = mappedKey === 'true';
          return newVal;
        }
        return prev;
      }, false);
      onChange(newValue);
    }
  }, [value]);

  // 假如傳進來的是boolean, 則直接套用boolean
  useEffect(() => {
    if (_isBoolean(value)) {
      setFieldValue(value);
    }
  }, [value]);


  function handleOnChange(e) {
    // onchange時改為相反
    const newValue = !fieldValue;
    if (typeof props.onChange === 'function') {
      // 如果有設定convert為true, 則在set formdata時將value轉換  true => 'Y', false => 'N'
      if (checkboxMapped && convert) {
        const convertValue = _get(checkboxMapped, [newValue]);
        onChange(convertValue);
      } else {
        // 一般情況直接set true/false 進 formdata
        onChange(newValue);
      }
    }
  }

  // 左右顯示的label
  const labelTrue = _get(checkboxLabel, 'true', null);
  const labelFalse = _get(checkboxLabel, 'false', null);

  return (
    isShown ? (
      <Div className="duck-field" disabled={props.disabled}>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <div className="duck-field--switch-zone">
          {labelFalse ? <div className="duck-field--switch-zone--label left">{labelFalse}</div> : null}
          <Switch
            checked={fieldValue}
            onChange={handleOnChange}
            disabled={disabled}
            className={`e2e-switch---${key}`}
          />
          {labelTrue ? <div className="duck-field--switch-zone--label right">{labelTrue}</div> : null}
        </div>
      </Div>
    ) : (null)
  );
}

SwitchField.defaultProps = {
  name: '',
  value: '',
  onChange: () => { },
  fieldConfig: { label: '', require: false, selectorConfig: { values: [] } }
};

export default SwitchField;

