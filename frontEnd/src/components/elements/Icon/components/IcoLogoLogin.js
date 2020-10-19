import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill: #555;
  }
  .cls-2{
    fill: url(#linear-gradient);
  }
`;

export default class IcoLogoLogin extends Component {
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
        viewBox="0 0 77 92"
      >
        <defs>
          <linearGradient id="linear-gradient" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="gray" />
          </linearGradient>
        </defs>
        <g id="ico_logo_login" transform="translate(-786 -203)">
          <path id="Rectangle_2236" d="M0 0h20v92H0z" className="cls-1" data-name="Rectangle 2236" transform="translate(815 203)" />
          <path id="Subtraction_28" d="M16-802v-20a8.009 8.009 0 0 0 8-8 8.009 8.009 0 0 0-8-8v-20a27.822 27.822 0 0 1 10.9 2.2 27.9 27.9 0 0 1 8.9 6 27.9 27.9 0 0 1 6 8.9A27.833 27.833 0 0 1 44-830a27.833 27.833 0 0 1-2.2 10.9 27.9 27.9 0 0 1-6 8.9 27.9 27.9 0 0 1-8.9 6A27.823 27.823 0 0 1 16-802z" className="cls-1" data-name="Subtraction 28" transform="translate(819 1061)" />
          <path id="Union_160" d="M5 92V72h49v20zm0-36V36h49v20zm0-36V0h49v20z" className="cls-2" data-name="Union 160" transform="translate(781 203)" />
        </g>
      </Svg>
    );
  }
}
