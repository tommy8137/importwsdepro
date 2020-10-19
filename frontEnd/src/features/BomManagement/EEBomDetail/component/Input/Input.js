import React, { useState, useCallback, Fragment, useRef } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';


import * as Yup from 'yup';


// // eslint-disable-next-line no-unused-expressions
// injectGlobal`
//   .input-error-hint {
//     .rc-tooltip-arrow {
//       border-top-color: none;
//       .rc-tooltip-arrow-inner {
//         border-top-color: #373737;
//       }
//     }

//       .rc-tooltip-inner {
//           border: none;
//           color: #fff;
//           background-color: #373737;
//       }
//   }
// `;

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

  /* replace rc-tooltip */
  .input-error-hint {
    .rc-tooltip-arrow {
      border-top-color: none;
      .rc-tooltip-arrow-inner {
        border-top-color: #373737;
      }
    }

      .rc-tooltip-inner {
          border: none;
          color: #fff;
          background-color: #373737;
      }
  }
`;

// function useInputValue(initialValue) {
//   let [value, setValue] = useState(initialValue);
//   let onChange = useCallback(function (event) {
//     setValue(event.currentTarget.value);
//   }, []);

//   return {
//     value,
//     onChange,
//     setValue,
//   };
// }


function Input(props) {
  const [errors, setErrors] = useState(null);
  let { value, onChange, setCanSave, disabled, needFloat } = props;
  const id = uuid.v4();
  let inputRef = useRef(null);
  return (
    <Fragment>
      <InputWrapper id={id} innerRef={inputRef} disabled={disabled}>
        <Tooltip
          // getTooltipContainer={() => document.getElementById(id)}
          getTooltipContainer={() => inputRef.current}
          overlay={errors}
          placement="topLeft"
          arrowContent={<div className="rc-tooltip-arrow-inner" />}
          visible={errors}
          overlayClassName="input-error-hint"
        // overlayStyle={{
        //   color: '#fff',
        //   backgroundColor: '#373737',
        //   borderRaduis: 'none'
        // }}
        >
          <input
            className="input-wrapper__input"
            value={value}
            onChange={(e) => {
              let inputValue = e.target.value;
              const pattern = needFloat ? /^\d+(\.\d+)?$/g : /^\d+$/;
              // 如果使用者清空，就記錄null
              if (inputValue === '') {
                setErrors(null);
                setCanSave(true);
                onChange(null);
                return;
              }
              if (pattern.test(String(inputValue))) {
                const resultValue = inputValue.endsWith('0') ? inputValue : Number(inputValue);
                setErrors(null);
                setCanSave(true);
                onChange(resultValue);
              } else {
                setErrors(`${needFloat ? '請輸入正數' : '請輸入正整數'}`);
                setCanSave(false);
                onChange(inputValue);
              }
            }}

              // try {
              //   const schema = Yup.number()
              //   .integer()
              //   // .min(defaultValue, `至少要${defaultValue}`)
              //   // .max(max, `最大是${max}`)
              //   .typeError('需要一個數字');
              //   schema.validateSync(value);
              //   console.log('???????');
              // } catch (error) {
              //   console.log('///////', error.errors);
              //   console.log('defaultValue', defaultValue);
              //   setValue(defaultValue);
              //   // validataError = error.errors;
              // }
            // } : () => {}}
            type="text"
            disabled={disabled}
          />
        </Tooltip>
        {/* <div className="error-hint">{errors} LLL</div> */}
      </InputWrapper>
    </Fragment>
  );
}

Input.defaultProps = {
  disabled: false,
  needFloat: false
};

export default Input;
