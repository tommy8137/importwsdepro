import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '~~elements/Switch';
import baseFieldStyles from './FieldStyles';


const Div = styled.div`
  ${baseFieldStyles};
  .field {
    &:focus {
        outline: none;
        border: none
      }
  }
  .formik-select {
    margin-bottom: 1rem;
    &--label-zone{
      display: flex;
      flex-direcion: row
    }
    &--label {
    color: #939393;
    font-size: 0.5rem;
    font-weight: 100;
    margin-bottom: 0.2rem;
    &--requiredMark{
      color: red;
      margin-left: 0.5rem;
      font-size: 0.5rem;
      }
    }
  }
`;

const SwitchField = (props) => {
  const { key, label, require, readOnly = false, disabled = false } = props.field;
  const { value, formData, onChange } = props;

  const isDisabled = readOnly || disabled;
  return (
    <Div className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={label}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <Switch
        disabled={isDisabled}
        checked={value}
        onChange={(e) => onChange(key, e.target.checked)}
      />
    </Div>
  );
};


SwitchField.defaultProps = {
  disabled: true
};


export default SwitchField;

