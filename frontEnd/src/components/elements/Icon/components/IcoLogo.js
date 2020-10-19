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

export default class IcoLogo extends Component {
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
        viewBox="0 0 59 62"
      >
        <defs>
          <linearGradient id="linear-gradient" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="gray" />
          </linearGradient>
        </defs>
        <g id="ico_logo" transform="translate(-71 -24)">
          <path id="Subtraction_28" d="M5.169 38.363a19.018 19.018 0 0 1-6.113-1h6.113v-12a6 6 0 1 0 0-12v-13A18.875 18.875 0 0 1 18.6 5.928a19 19 0 0 1 0 26.87 18.879 18.879 0 0 1-13.431 5.565z" className="cls-1" data-name="Subtraction 28" transform="translate(105.831 23.637)" />
          <path id="Rectangle_2213" d="M0 0h62v15H0z" className="cls-1" data-name="Rectangle 2213" transform="rotate(90 43.5 67.5)" />
          <path id="Union_166" d="M0-796v-13h40v13zm0-24v-13h40v13zm0-25v-13h40v13z" className="cls-2" data-name="Union 166" transform="translate(71 882)" />
        </g>
      </Svg>
    );
  }
}
