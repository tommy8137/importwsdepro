import React, { Component } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _isNumber from 'lodash/isNumber';
import AsyncSelect from 'react-select/lib/Async';
import Icon, { IconName } from '~~elements/Icon';

import ErrorMsg from './ErrorMsg';

const InputBox = styled.div`
  .field-- {
    &label {
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

    &__control {
      border: none;
      background: transparent;
      border-radius: 0;
      border-bottom: ${props => (props.isError ? '1px solid #ec0c0c' : '1px solid #333333')};
      width: 100%;
      height: 2.375rem;
      color: #333333;
      &--is-focused { /* 下拉選單打開時 */
        border-bottom: 1px solid ${props => (props.isError ? '#ec0c0c' : '#00a99d')};
        box-shadow: none;
      }
      &:focus {
        outline: none;
        border-color: ${props => (props.isError ? '#ec0c0c' : '#00a99d')};
      }

      &.read-only {
        pointer-events: none;
      }
    }

    &__indicator-separator { /* x和v中間的分隔線 */
      background-color: transparent;
    }
    &__value-container--has-value {
      padding: unset;
    }
  }
  .asyncselect {
    cursor: pointer;
    > div:nth-of-type(1):hover { /* 輸入框的hover */
      border: none;
      border-bottom: 1px solid ${props => (props.isError ? '#ec0c0c' : '#00a99d')};
    }
  }
  .require-star {
    font-family: Roboto;
    font-size: 0.875rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1rem;
    letter-spacing: normal;
    text-align: left;
    color: #ec0c0c;
    margin-left: 5px;
  }
  .label-row {
    position: relative;
    display: flex;
  }
  .delete-btn {
      padding: 0 0 0 1rem;
      height: 1rem;
      border: none;
      color: #333333;
      font-size: 12px;
      cursor: pointer;
      line-height: 1rem;
      transition: .3s ease all;
      position: absolute;
      right: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 5rem;
      background-color: transparent;

      &:focus {
        outline: none;
      }
      &:hover {
        color: #555;
        &:active {
          background-color: #1e1e1e;
        }
      }
  }
`;


const AsyncSelectComponent = ({ field, label, ...props }) => {
  const { id, form: { touched, errors } } = props;
  const { name } = field;
  const errmsg = _get(errors, name, '');
  const isTouched = _get(touched, name, false);
  const isError = isTouched && (errmsg.length > 0);
  const { isRequired, isDeletable, uuid } = props;
  const { value: fieldvalue, ...fieldprops } = field;
  const renderValue = _isString(fieldvalue) || _isNumber(fieldvalue)
    ? { label: fieldvalue, value: fieldvalue }
    : fieldvalue;

  return (
    <InputBox isError={isError} id={id}>
      <div className="label-row">
        <label htmlFor={name} className="field--label">
          {label}
        </label>
        {isRequired && <span className="require-star">*</span>}
        {isDeletable &&
          (
            <button type="button" className="delete-btn" onClick={() => props.onRemove(uuid)}>
              <Icon icon={IconName.BtnRemove} size="12px" />
              Remove
            </button>
          )
        }
      </div>
      <AsyncSelect
        className="asyncselect"
        classNamePrefix="field--"
        defaultOptions
        inputId={name}
        placeholder=""
        {...field}
        // FIXME: 我也是逼不得已讓你變成工號的QQ
        value={renderValue}
        {...props}
        onChange={(value) => {
          props.onChange(field.name, value);
          props.form.setFieldValue(field.name, value);
        }}
      />
      <ErrorMsg name={name} />
    </InputBox>
  );
};


export default AsyncSelectComponent;
