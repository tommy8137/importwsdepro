import React, { useRef } from 'react';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';
import * as R from 'ramda';


const InputWrapper = styled.div`
  height: inherit;
  width: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
  .input-wrapper__input {
    height: 70%;
    width: 100%;
    text-align: left;
    border-radius: 4px;
    border: solid 1px #333333;

    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .error-hint {
    color: red;
  }
`;


function BaseInput(props) {
  let { value, onChange, onBlur, errors = [], disabled } = props;
  const inputEl = useRef(null);

  return (
    <InputWrapper>
      <input
        ref={inputEl}
        className="input-wrapper__input"
        type="text"
        // 當value變成null的時候，input還是會取到上一次的值，要把它變成空字串
        value={R.isNil(value) ? '' : value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {/* error tooltip 只有錯誤大於０時才顯示 */}
      {errors.length > 0 &&
        <EnhanceTooltip
          isOpen
          target={inputEl}
          color="black"
          textColor="white"
          placement="top"
        >
          {errors.join(',')}
        </EnhanceTooltip>}
    </InputWrapper>
  );
}

// export default BaseInput;

// function areEqual(prevProps, nextProps) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */
//   return prevProps.value === nextProps.value && JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors);
//   // return true;
// }

// export default React.memo(BaseInput, areEqual);
export default BaseInput;
