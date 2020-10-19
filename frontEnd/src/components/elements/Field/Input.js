import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #333333;
  width: 100%;
  height: 2.375rem;
  background-color: transparent;

  &:disabled{
    border-color: ${props => (props.isInvalid ? 'red' : '#c3c3c3')} !important;
  }

  &:focus {
    outline: none;
    border-color: #00a99d;
  }

  ::placeholder {
    color: rgba(0, 0, 0,0.3);
    font-size: 0.9rem;
    visibility: ${props => (props.disabled ? 'hidden' : 'visibile')};
  }

  /* filter bar的styled */
  &.filterBar-styled {
    border: none;
    height: 70%;
    letter-spacing: 1px;
    padding-left: 0.8rem;
    border-left: 0.5px solid #ccc;
    ::placeholder {
      font-size: 0.8rem;
    }
  }
`;


const Input = (props) => {
  const { styledType, onChange, placeholder, className, ...restProps } = props;
  const name = styledType === 'filterBar' ? `filterBar-styled ${className}` : `field--input ${className}`;
  return (
    <StyledInput
      className={name}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      {...restProps}
    />
  );
};

Input.defaultProps = {
  styledType: 'field',
  placeholder: null,
  onChange: () => {},
  className: ''
};

export default Input;
