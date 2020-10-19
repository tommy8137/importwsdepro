import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: url(#linear-gradient);
  }
  .cls-2 {
    fill: #f5c910;
  }
  .cls-3 {
    fill: #555;
  }
`;

export default class BtnXray extends Component {
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
        viewBox="0 0 300 300"
      >
        <defs>
          <linearGradient id="linear-gradient" x1=".368" x2=".675" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#2f3843" />
            <stop offset="1" stopColor="#1d1d1d" />
          </linearGradient>
        </defs>
        <g id="btn_bom_n" transform="translate(-522 -4458)">
          <rect id="Rectangle_1656" width="300" height="300" className="cls-1" data-name="Rectangle 1656" rx="10" transform="translate(522 4458)" />
          <g id="Group_3673" data-name="Group 3673" transform="translate(6872 2122)">
            <path id="Union_234" d="M55 169.964v-20.02c.656.037 1.328.057 2 .057a35 35 0 0 0 0-70c-.665 0-1.338.019-2 .056V60a20 20 0 1 0 0-40H20v150H10a10 10 0 0 1-10-10V0h55a39.987 39.987 0 0 1 29.295 67.236A55 55 0 0 1 57 170c-.664 0-1.336-.012-2-.036z" className="cls-2" data-name="Union 234" transform="translate(-6250 2401)" />
            <path id="Rectangle_2743" d="M0 0h37v20H0z" className="cls-3" data-name="Rectangle 2743" transform="translate(-6230 2551)" />
          </g>
        </g>
      </Svg>
    );
  }
}
