import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: #00a99d;
  }
  .cls-2 {
    fill:none;
    stroke:#fff;
    stroke-linecap:round;
    stroke-linejoin:round
  }
`;

export default class IcoGreenCheck extends Component {
    static propTypes = {};
    static defaultProps = {};
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <g id="ico_green_check_0" transform="translate(14659 14193)">
            <circle id="Ellipse_311" cx="9" cy="9" r="9" className="cls-1" data-name="Ellipse 311" transform="translate(-14659 -14193)" />
            <path id="Path_1431" d="M-22590.752-7140l4 4 6.17-6.17" className="cls-2" data-name="Path 1431" transform="translate(7936 -7044)" />
          </g>
        </Svg>
      );
    }
}
