import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import _ from 'lodash';
import baseFieldStyles, { baseReactSelect } from './FieldStyles';

const InputFieldDiv = styled.div`
  ${baseFieldStyles};
  .duck-field {
    &--label-zone {
      font-size: 0.875rem;
    }
    &--input {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #333333;
      width: 100%;
      /* height: 2.05rem; */
      height: 38px;
      font-size: 1rem;
      background: transparent;

      &:focus {
        outline: none;
        border-color: #00a99d;
      }

      &.read-only {
        pointer-events: none;
        border-bottom: 1px solid #333;
        opacity: 0.5;
      }
    }
  }
`;


const InputField = (props) => {
  const { label, require, key, readOnly = false, disabled = false } = props.field;
  const { value, onChange, errors, onBlur } = props;

  const isDisabled = readOnly || disabled;

  useEffect(() => {
    if (disabled === true) {
      onChange(key, null);
    }
  }, [disabled]);

  return (
    <InputFieldDiv className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={key}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <div>
        <input
          className={isDisabled ? 'duck-field--input read-only' : 'duck-field--input'}
          id={key}
          disabled={isDisabled}
          type="text"
          autoComplete="off"
          // 當value變成null的時候，input還是會取到上一次的值，要把它變成空字串
          value={R.isNil(value) ? '' : value}
          onChange={e => onChange(key, e.target.value)}
          onBlur={e => onBlur(e.target.value)}
        />
      </div>
      <div className="duck-field--error-hint-section">{errors}</div>
    </InputFieldDiv>
  );
};

InputField.defaultProps = {
  onBlur: () => { }
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

export default React.memo(InputField, areEqual);


// export default InputField;
