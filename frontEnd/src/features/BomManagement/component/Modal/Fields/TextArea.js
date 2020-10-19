import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import _get from 'lodash/get';

import * as Mixins from '~~styles/_mixins';
import ErrorMsg from './ErrorMsg';

const InputBox = styled.div`
  .field {
    &--label {
      color: #808080;
      font-family: Roboto;
      font-size: 0.875rem;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1rem;
      letter-spacing: normal;
      text-align: left;
      margin-bottom: unset;
    }

    &--textarea {
      border-radius: 0;
      border: ${props => (props.isError ? '1px solid #ec0c0c' : '1px solid #333333')};
      width: 100%;
      height: 4.625rem;
      color: #333333;
      border-radius: 4px;
      background-color: #ffffff;

      &:focus {
        outline: none;
        border-color: ${props => (props.isError ? '#ec0c0c' : '#00a99d')};
        box-shadow: none;
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
  const { id, form: { touched, errors } } = props;
  const { name } = field;
  const errmsg = _get(errors, name, '');
  const isTouched = _get(touched, name, false);
  const isError = isTouched && (errmsg.length > 0);
  const { isRequired } = props;
  return (
    <InputBox isError={isError} id={id}>
      <label htmlFor={name} className="field--label">
        {label}
      </label>
      {isRequired && <span className="require-star">*</span>}
      <Input
        type="textarea"
        className="field--textarea"
        id={name}
        {...field}
        {...props}
      />
      <ErrorMsg name={name} />
    </InputBox>
  );
};


export default TextField;
