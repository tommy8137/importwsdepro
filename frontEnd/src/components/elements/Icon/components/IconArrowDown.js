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

function IconArrowDown(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 7"
      config={getTheme(props.theme)[props.type] || getTheme(props.theme)['normal']}
    >
      <g id="Dashbaord-Project---GUI-Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
        <g className="cls-1" transform="translate(-418.000000, -110.000000)" stroke="#333333" strokeWidth="1.5">
          <g id="Group-2" transform="translate(240.000000, 92.000000)">
            <polyline id="Path" points="179 19 184 24 189 19" />
          </g>
        </g>
      </g>
    </Svg>
  );
}

export default IconArrowDown;
