import React, { Component } from 'react';
import styled from 'styled-components';

import baseFieldStyles, { baseReactSelect } from './FieldStyles';

const NormalFieldDiv = styled.div`
  ${baseFieldStyles};
  .duck-field {
    &--input {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #333333;
      width: 100%;
      /* height: 2.05rem; */
      height: 38px;
      font-size: 0.9rem;
      background: transparent;

      &:focus {
        outline: none;
        border-color: #00a99d;
      }

      &.read-only {
        pointer-events: none;
        border-bottom: 1px solid #bfbdbd;
      }
    }
  }
`;


const NormalField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  // console.log('[NormalField]', field);
  // console.log('[NormalField]', props);
  const { label, require } = props.filedConfig;
  return (
    <NormalFieldDiv className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={field.name}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <div>
        <input
          className={props.readOnly ? 'duck-field--input read-only' : 'duck-field--input'}
          id={field.name}
          type="text"
          autoComplete="off"
          {...field}
          {...props}
        />
      </div>
    </NormalFieldDiv>
  );
};


export default NormalField;
