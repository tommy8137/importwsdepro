import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import _get from 'lodash/get';
import * as R from 'ramda';

// import * as Mixins from '~~styles/_mixins';
// import ErrorMsg from './ErrorMsg';

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
      opacity: ${({ readOnly }) => (readOnly ? 0.5 : 1)};

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
  .error-message {
    height: 17px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #ec0c0c;
    margin-top: 6px;
    .icon {
      width: 0.8rem;
      margin-left: 5px;
    }
  }
`;


const TextField = ({ field, ...props }) => {
  const { label, require, key, readOnly = false, disabled = false, dataType } = field;
  const { value, onChange, errors } = props;

  const isDisabled = readOnly || disabled;
  // const isTouched = _get(touched, name, false);
  // const isError = isTouched && (errmsg.length > 0);
  const isError = errors.length > 0;

  return (
    <InputBox isError={isError} readOnly={isDisabled}>
      {
        _get(field, 'maxLength', 0) ?
          <label htmlFor={key} className="field--label">
            {label} ({_get(value, 'length', 0)}/{field.maxLength})
          </label> :
          <label htmlFor={key} className="field--label">
            {label}
          </label>
      }

      {require && <span className="require-star">*</span>}
      <Input
        type="textarea"
        className="field--textarea"
        id={key}
        disabled={readOnly}
        {...field}
        {...props}
        value={R.isNil(value) ? '' : value}
        onChange={e => onChange(key, e.target.value)}
      />
      <div className="error-message">{errors}</div>
    </InputBox>
  );
};


function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  // return true;
}

export default React.memo(TextField, areEqual);
