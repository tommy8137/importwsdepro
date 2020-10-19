import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
 .cls-1{fill:#333}.cls-2{fill:#f7f7f7}
`;

export default class BtnInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { config } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        config={config}
      >
        <g id="btn_instruction_n" transform="translate(-1304 -169)">
          <circle id="Ellipse_309" cx="15" cy="15" r="15" className="cls-1" data-name="Ellipse 309" transform="translate(1304 169)" />
          <path id="Path_1333" d="M.99-13.14h3.44a2.325 2.325 0 0 1 2.5-2.3 2.133 2.133 0 0 1 2.412 2.019c0 1.181-.5 1.79-2.133 2.768a3.931 3.931 0 0 0-2.285 4.2l.025.7h3.366v-.673c0-1.219.47-1.841 2.158-2.818a4.734 4.734 0 0 0 2.717-4.291c0-2.933-2.4-4.951-6.03-4.951-3.897.002-6.106 2.186-6.17 5.346zM6.767.381a2.067 2.067 0 0 0 2.3-2.158 2.07 2.07 0 0 0-2.3-2.171 2.08 2.08 0 0 0-2.311 2.171A2.077 2.077 0 0 0 6.767.381z" className="cls-2" data-name="Path 1333" transform="translate(1312 193)" />
        </g>
      </Svg>
    );
  }
}
