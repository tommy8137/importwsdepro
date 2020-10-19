import React from 'react';
import styled from 'styled-components';

const FieldErrorDiv = styled.span`
  color: #f00;
  font-size: 0.75rem;
  font-weight: 200;
  position: absolute;
  bottom: 0;
`;
const FieldError = (props) => {
  const { errorMessage = '' } = props;
  if (!errorMessage) { return null; }
  return (
    <FieldErrorDiv>
      {errorMessage}
    </FieldErrorDiv>
  );
};

export default FieldError;
