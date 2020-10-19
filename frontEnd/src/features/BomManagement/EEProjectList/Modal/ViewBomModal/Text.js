import React, { Component } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';

import * as Mixins from '~~styles/_mixins';
import ErrorMsg from './ErrorMsg';

const InputBox = styled.div`
  .field {
    &--label {
      ${Mixins.formLabel};
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.17;
      letter-spacing: normal;
      text-align: left;
    }

    &--input {
      background: transparent;
      border: none;
      border-radius: 0;
      border-bottom: ${props => (props.isError ? '1px solid #ec0c0c' : '1px solid #333333')};
      width: 100%;
      height: 2.375rem;
      color: #333333;
      padding-left: 8px;

      &:focus {
        outline: none;
        border-color: ${props => (props.isError ? '#ec0c0c' : '#00a99d')};
      }

      &.read-only {
        pointer-events: none;
      }
      &:disabled {
        color: rgba(51, 51, 51, 0.5);
      }
    }
  }
  .require-star {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #ec0c0c;
    margin-left: 5px;
  }
`;


const TextField = ({ field, label, ...props }) => {
  const { form: { touched, errors } } = props;
  const { name } = field;
  const errmsg = _get(errors, name, '');
  const isTouched = _get(touched, name, false);
  const isError = isTouched && (errmsg.length > 0);
  const { isRequired } = props;
  return (
    <InputBox isError={isError}>
      <label htmlFor={name} className="field--label">
        {label}
      </label>
      {isRequired && <span className="require-star">*</span>}
      <input
        className="field--input"
        type="text"
        id={name}
        {...field}
        {...props}
      />
      <ErrorMsg name={name} />
    </InputBox>
  );
};


export default TextField;
