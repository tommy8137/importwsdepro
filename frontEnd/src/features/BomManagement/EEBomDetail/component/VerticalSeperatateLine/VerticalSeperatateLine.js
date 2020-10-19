import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  &.vertical-seperatate-line_container {
    height: inherit;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .vertical-seperatate-line_container__line {
      border-left: 1px solid #ccc;
      height: 70%;
      width: 1px;
    }
  }
`;

function VerticalSeperatateLine() {
  return (
    <Wrapper className="vertical-seperatate-line_container">
      <div className="vertical-seperatate-line_container__line" />
    </Wrapper>
  );
}

export default VerticalSeperatateLine;
