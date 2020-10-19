import React from 'react';
import styled from 'styled-components';
import getTheme from './Theme';


const Svg = styled.svg`
  .cls-1 {
     stroke:${props => props.config.fill};
     opacity: ${props => props.config.opacity};
     transition:0.3s ease all;
  }
`;

function IconArrowUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 7"
      config={getTheme(props.theme)[props.type] || getTheme(props.theme)['normal']}
    >
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
        <g className="cls-1" transform="translate(1.000000, 1.000000)" stroke="#333333" strokeWidth="1.5">
          <g id="icon/收合箭頭-copy">
            <polyline id="Path" transform="translate(5.000000, 2.500000) scale(1, -1) translate(-5.000000, -2.500000) " points="0 0 5 5 10 0" />
          </g>
        </g>
      </g>
    </Svg>
  );
}

export default IconArrowUp;
