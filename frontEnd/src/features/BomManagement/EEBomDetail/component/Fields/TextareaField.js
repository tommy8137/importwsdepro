import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import _get from 'lodash/get';

import * as Mixins from '~~styles/_mixins';
// import ErrorMsg from './ErrorMsg';
import baseFieldStyles from './FieldStyles';


const InputBox = styled.div`
  ${baseFieldStyles};
  .field {
    /* &--label {
      ${Mixins.formLabel};
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.17;
      letter-spacing: normal;
      text-align: left;
    } */

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
  /* .require-star {
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
  } */
`;


const TextField = ({ field, ...props }) => {
  const { form: { touched, errors } } = props;
  const { name } = field;
  const errmsg = _get(errors, name, '');
  const isTouched = _get(touched, name, false);
  const isError = isTouched && (errmsg.length > 0);
  // const { isRequired } = props;
  const { label, require } = props.filedConfig;
  return (
    <InputBox isError={isError} className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={field.name}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>

      <Input
        type="textarea"
        className="field--textarea"
        id={name}
        {...field}
        {...props}
      />
      {/* <ErrorMsg name={name} /> */}
    </InputBox>
  );
};


export default TextField;
