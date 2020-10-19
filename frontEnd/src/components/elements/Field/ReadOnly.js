import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.p`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #333333;
  width: 100%;
  margin: 0;
  font-size: 1rem;
  height: 2.375rem;
  line-height: 2.375rem;
`;

const Input = forwardRef((props, ref) => {
  return (
    <StyledInput
      className="field--input"
      type="text"
      innerRef={ref}
      {...props}
    >
      {props.value}
    </StyledInput>
  );
});


export default Input;
