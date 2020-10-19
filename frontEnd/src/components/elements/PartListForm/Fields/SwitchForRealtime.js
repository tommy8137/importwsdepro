import React, { useState, useEffect, useRef, useContext, } from 'react';

import styled from 'styled-components';
import _get from 'lodash/get';
import _isBoolean from 'lodash/isBoolean';
import Switch from '~~elements/Switch';
import { PartlistFormContext } from '~~elements/PartListForm';

import LabelField from './LabelField';
import { getValuesByKeys } from '../PartlistUtils';

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

// realtimeFormulaBoolean
function SwitchForRealtime(props) {
  const [fieldValue, setFieldValue] = useState(false);
  const [contextValue] = useContext(PartlistFormContext);
  const { formData } = contextValue;

  const { fieldConfig } = props;


  const {
    name = '',
    value = '',
    fieldConfig: {
      func = '',
      key = '',
      replaceBy = [],
      checkboxConfig = {}
    },
    isShown,
    partItemInfo,
    formDataPaths,
    onChange = () => { }
  } = props;

  // 用replaceBy的key去formdata找，監聽是否value有改變
  const groupValues = getValuesByKeys(formData, replaceBy, formDataPaths);

  // 找到這些key的value: group的value, partitemInfo, 個自己的key
  const formValues = {
    ...groupValues,
    ...partItemInfo,
    key
  };

  // 要丟進去func裡面eval的array
  const replaceByValues = replaceBy.map(k => _get(formValues, [k]));

  useEffect(
    () => {
      try {
        // eslint-disable-next-line no-eval
        const newFieldValue = eval(func)(...replaceByValues);
        if (_isBoolean(newFieldValue)) {
          onChange(newFieldValue);
        }
      } catch (e) {
        console.log('switchForRealtime error >>>', e);
      }
    }, [JSON.stringify(replaceByValues)]);


  useEffect(() => {
    if (_isBoolean(value)) {
      setFieldValue(value);
    }
  }, [value]);

  // 左右顯示的label
  const checkboxLabel = _get(checkboxConfig, ['label'], {});
  const labelTrue = _get(checkboxLabel, 'true', null);
  const labelFalse = _get(checkboxLabel, 'false', null);

  return (
    isShown ? (
      <Div className="duck-field" disabled={true}>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <div className="duck-field--switch-zone">
          {labelFalse ? <div className="duck-field--switch-zone--label left">{labelFalse}</div> : null}
          <Switch
            checked={fieldValue}
            disabled
            className={`e2e-switch---${key}`}
          />
          {labelTrue ? <div className="duck-field--switch-zone--label right">{labelTrue}</div> : null}
        </div>
      </Div>
    ) : null
  );
}

export default SwitchForRealtime;
