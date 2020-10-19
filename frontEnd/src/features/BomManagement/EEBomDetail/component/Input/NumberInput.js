import React, { useState, useCallback, Fragment, useRef } from 'react';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';

const InputWrapper = styled.div`
  .input-wrapper__input {
    width: 3.125rem;
    height: 1.875rem;
    border-radius: 4px;
    border: solid 1px #333333;
    text-align: center;
    border-color: ${props => (props.disabled ? '#c1bfbf' : '#333333')};
    color: ${props => (props.disabled ? '#7d7d7d' : '')};

    &:focus {
      outline: none;
    }
  }

  .error-hint {
    color: red;
  }
`;

function NumberInput(props) {
  const [errorStr, setErrorStr] = useState('');
  let { onChange, disabled, max, min, } = props;
  const inputEl = useRef(null);

  return (
    <Fragment>
      <InputWrapper disabled={disabled}>
        <input
          ref={inputEl}
          className="input-wrapper__input"
          {...props}
          onChange={(e) => {
            const { value } = e.target;
            let error = '';
            const val = Number(value);
            try {
              if (val > max) {
                error = `不可超過${max}`;
              } else if (val < min) {
                error = `不可低於${min}`;
              } else if (Math.ceil(val) > val) {
                error = '請輸入整數';
              }

              setErrorStr(error);
            } catch (err) {
              error = '請輸入正整數';
            } finally {
              onChange(value, error);
            }
          }}
        />
        {
          errorStr.length > 0 &&
          <EnhanceTooltip
            isOpen={errorStr.length}
            placement="top"
            color="black"
            textColor="white"
            target={inputEl}
          >
            {errorStr}
          </EnhanceTooltip>
        }

      </InputWrapper>
    </Fragment>
  );
}

NumberInput.defaultProps = {
  disabled: false,
  needFloat: false,
  type: 'number',
  min: 0,
  max: 100,
};

export default NumberInput;
