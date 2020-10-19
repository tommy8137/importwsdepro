

import React from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';


const InputWrapper = styled.div`
  width: 100%;
  min-height: 2.5rem;
  margin-bottom: 0.125rem;
  background: #FFFFFF;
  border: ${({ border }) => (border ? '1px' : '0px')} solid #4D4D4D;
  border-radius: 5px;
  padding: 0.125rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ease .3s all;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  :hover {
    transition: ease .3s all;
    border: ${({ border }) => (border ? '1px' : '0px')} solid ${({ disabled }) => (disabled ? '#4D4D4D' : '#00ac9d')};
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
  .content {
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 0.5rem 0 0;
    font-size: 1rem;
    .placeholder {
      color: #C0C0C0;
    }
    .ellipsis-box {
      flex: 0 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .count-box,
    .arrow,
    .reset{
      flex: 0 auto;
    }
    .count-box {
      margin: 0 0.4rem;
    };
    .arrow { }
    .reset {
      margin: 0 0.2rem;
    }
  }
`;

function BoxComponent(props) {
  const { isMulti, value, placeholder, disabled, border, isOpen, innerRef, resetable, } = props;


  const displayValue = (input) => {
    if (Array.isArray(input)) {
      return input.map(item => item.label).join(', ');
    }
    return String(_get(input, 'label', '') == null ? '' : _get(input, 'label', ''));
  };

  const getCount = (input) => {
    if (displayValue(input) && Array.isArray(input)) {
      return `(${input.length})`;
    }
    return '';
  };

  const handleReset = (e) => {
    e.stopPropagation();
    props.onReset();
  };

  const handleClick = (e) => {
    if (!disabled) {
      props.onClick();
    }
  };

  const showReset = !!displayValue(value) && resetable && !disabled;
  return (
    <InputWrapper
      {...props}
      border={border}
      disabled={disabled}
      onClick={disabled ? null : props.onClick}
      title={displayValue(value)}
      innerRef={innerRef}

    >
      <div className="content">
        {/* place holder */}
        {!displayValue(value) && <div className="ellipsis-box placeholder">{placeholder}</div>}
        {/* 選擇的值 */}
        {!!displayValue(value) && <div className="ellipsis-box">{displayValue(value)}</div>}
        {/* 數量 */}
        {isMulti && <div className="count-box">{getCount(value)}</div>}
        {showReset &&
          <div className="reset">
            <Icon
              icon={IconName.BtnReset2}
              onClick={handleReset}
              size="1.2rem"
            />
          </div>
        }
        <div className="arrow">
          {isOpen
            ? <Icon icon={IconName.IconArrowUpBlack} size="0.85rem" />
            : <Icon icon={IconName.IconArrowDownBlack} size="0.85rem" />}
        </div>
      </div>
    </InputWrapper>
  );
}

BoxComponent.defaultProps = {
  onClick: e => console.log('Select Target onClick'),
  value: null,
  placeholder: '',
  isOpen: false,
};

export default BoxComponent;

