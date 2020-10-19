import React, { useEffect } from 'react';
import _get from 'lodash/get';
import Field from '~~elements/Field';
import LabelField from './LabelField';

const TextField = props => {
  const { isShown, value, name, fieldConfig, disabled, onChange } = props;
  const { placeholder, key, maxLength = 500 } = fieldConfig;

  const handleInputChange = e => {
    if (typeof onChange === 'function') {
      const val = _get(e, ['target', 'value'], '');
      const newValue = val.slice(0, maxLength);
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (value && value.length && value.length > maxLength) {
      const newValue = value.slice(0, maxLength);
      props.onChange(newValue);
    }
  }, [value]);

  if (!isShown) return null;
  return (
    <React.Fragment>
      <LabelField name={name} fieldConfig={fieldConfig} disabled={props.disabled} />
      <Field.Textarea
        id={props.name}
        onChange={handleInputChange}
        disabled={disabled}
        value={value || ''}
        placeholder={placeholder}
        className={`e2e-textarea---${key}`}
      />
    </React.Fragment>
  );
};

export default TextField;
