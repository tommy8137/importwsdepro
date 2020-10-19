import React from 'react';
import styled from 'styled-components';
import Radio from '~~elements/Radio';


const CheckRect = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 4px;
  padding: 0.78125rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  border: solid 1px #c0c0c0;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: .3s ease all;
  &.active {
    border: solid 1px #93adcd;
    background-color: #7c90a9;
    color: #ffffff;
    transition: .3s ease all;
  }
  &.disabled {
    border: solid 1px #c0c0c0;
    background-color: #f0f0f0;
    color: #c0c0c0;
    cursor: not-allowed;

  }
`;

function Check({ children, isChecked, onChange, value, isDisabled, ...rest }) {
  const handleClick = (e) => {
    if (!isDisabled) {
      onChange();
    }
  };

  return (
    <CheckRect
      className={`${(isChecked ? 'active' : '')}${(isDisabled ? 'disabled' : '')}`}
      onClick={handleClick}
      onKeyDown={null}
      {...rest}
    >
      <Radio
        className="radio"
        name={value}
        value={value}
        onChange={handleClick}
        checked={isChecked}
        disabled={isDisabled}
      />
      {children}
    </CheckRect>
  );
}

export default Check;
