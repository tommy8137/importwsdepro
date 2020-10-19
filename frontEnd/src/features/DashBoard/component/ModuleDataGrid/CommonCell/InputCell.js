import React, { useState, useCallback, Fragment, useRef, useEffect } from 'react';
import styled, { injectGlobal }  from 'styled-components';
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap_white.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .black-theme-tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    visibility: visible;
    line-height: 1.5;
    font-size: 12px;
    background-color: #373737;
    padding: 1px;
    opacity: 0.9;
  }

  .black-theme-tooltip-arrow,
  .black-theme-tooltip-arrow-inner {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .black-theme-tooltip-placement-top .black-theme-tooltip-arrow,
  .black-theme-tooltip-placement-topLeft .black-theme-tooltip-arrow,
  .black-theme-tooltip-placement-topRight .black-theme-tooltip-arrow {
    bottom: -5px;
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #373737;
  }
  .black-theme-tooltip-placement-top .black-theme-tooltip-arrow-inner,
  .black-theme-tooltip-placement-topLeft .black-theme-tooltip-arrow-inner,
  .black-theme-tooltip-placement-topRight .black-theme-tooltip-arrow-inner {
    bottom: 1px;
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #ffffff;
  }
  .black-theme-tooltip-placement-top .black-theme-tooltip-arrow {
    left: 50%;
  }
  .black-theme-tooltip-placement-topLeft .black-theme-tooltip-arrow {
    left: 15%;
  }
  .black-theme-tooltip-placement-topRight .black-theme-tooltip-arrow {
    right: 15%;
  }

  .black-theme-tooltip-inner {
    padding: 4px;
    min-height: 0;
    border: none;
    color: #fff;
    background-color: #373737;
    border-radius: 0;
  }
`;

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
  }

  .error-hint {
    color: red;
  }

`;


function InputCell(props) {
  let { value, onChange, onBlur, errors } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setTooltipOpen(true);
    }
    if (errors.length === 0) {
      setTooltipOpen(false);
    }
  }, [errors.length]);


  return (
    <Fragment>
      <InputWrapper>
        <Tooltip
          overlay={errors.join(',')}
          placement="top"
          visible={tooltipOpen}
          prefixCls="black-theme-tooltip"
          destroyTooltipOnHide={true}
        >
          <input
            className="input-wrapper__input"
            type="text"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        </Tooltip>
      </InputWrapper>
    </Fragment>
  );
}

// export default InputCell;

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.value === nextProps.value && JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors);
  // return true;
}

export default React.memo(InputCell, areEqual);
