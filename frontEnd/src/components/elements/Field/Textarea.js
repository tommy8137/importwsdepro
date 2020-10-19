import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';

const StyledTextarea = styled(Input)`
  width: 100%;
  height: 4.625rem;
  color: #333333;
  background-color: #ffffff;
  border: ${props => (props.isError ? '1px solid #ec0c0c' : '1px solid #333333')};
  border-radius: 4px;

  ::placeholder {
    color: rgba(0, 0, 0,0.3);
    font-size: 0.9rem;
    visibility: ${props => (props.disabled ? 'hidden' : 'visibile')};
  }

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
`;


const Textarea = (props) => {
  return (
    <StyledTextarea
      className="field-textarea"
      type="textarea"
      {...props}
    />
  );
};


export default Textarea;
