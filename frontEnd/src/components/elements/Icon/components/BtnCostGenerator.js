import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
     fill: url(#linear-gradient);
  }
  .cls-2{
    fill: #555;
  }
  .cls-3{
    fill: #f5c910;
  }
  .cls-4{
    fill: none;
  }
`;

export default class BtnCostGenerator extends Component {
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
        <g id="btn_cleansheet_n" transform="translate(-533 -221)">
          <rect id="Rectangle_1656" width="300" height="300" className="cls-1" data-name="Rectangle 1656" transform="translate(533 221)" />
          <path id="Subtraction_8" d="M-2787 1306a84.463 84.463 0 0 1-33.086-6.68 84.992 84.992 0 0 1-14.438-7.837 85.626 85.626 0 0 1-12.58-10.379 85.609 85.609 0 0 1-10.379-12.58 84.987 84.987 0 0 1-7.837-14.438A84.465 84.465 0 0 1-2872 1221a84.467 84.467 0 0 1 6.68-33.086 85 85 0 0 1 7.837-14.439 85.609 85.609 0 0 1 10.379-12.58 85.617 85.617 0 0 1 12.58-10.379 85 85 0 0 1 14.438-7.837A84.466 84.466 0 0 1-2787 1136a84.47 84.47 0 0 1 33.086 6.68 85.007 85.007 0 0 1 14.438 7.837 85.63 85.63 0 0 1 12.58 10.379 85.593 85.593 0 0 1 10.379 12.58 84.975 84.975 0 0 1 7.837 14.439A84.467 84.467 0 0 1-2702 1221a84.465 84.465 0 0 1-6.68 33.086 84.977 84.977 0 0 1-7.837 14.438 85.583 85.583 0 0 1-10.379 12.58 85.626 85.626 0 0 1-12.58 10.379 85 85 0 0 1-14.438 7.837A84.467 84.467 0 0 1-2787 1306zm0-150a65.074 65.074 0 0 0-65 65 65.073 65.073 0 0 0 65 65 65.074 65.074 0 0 0 65-65 65.074 65.074 0 0 0-65-65z" className="cls-2" data-name="Subtraction 8" transform="translate(3470 -850)" />
          <path id="Subtraction_7" d="M-2787 1306a84.463 84.463 0 0 1-33.086-6.68 84.992 84.992 0 0 1-14.438-7.837 85.626 85.626 0 0 1-12.58-10.379 85.609 85.609 0 0 1-10.379-12.58 85 85 0 0 1-7.837-14.438A84.465 84.465 0 0 1-2872 1221a84.467 84.467 0 0 1 6.68-33.086 85.009 85.009 0 0 1 7.837-14.439 85.609 85.609 0 0 1 10.379-12.58 85.63 85.63 0 0 1 12.58-10.379 85 85 0 0 1 14.438-7.837A84.466 84.466 0 0 1-2787 1136a85.568 85.568 0 0 1 18.032 1.916 84.548 84.548 0 0 1 16.7 5.482 85.066 85.066 0 0 1 14.976 8.647 85.621 85.621 0 0 1 12.848 11.412l-2.061-2.061-14.092 14.092A64.515 64.515 0 0 0-2787 1156a65.074 65.074 0 0 0-65 65 65.073 65.073 0 0 0 65 65 64.581 64.581 0 0 0 45.911-18.986l14.142 14.142a85.6 85.6 0 0 1-12.574 10.359 85 85 0 0 1-14.427 7.82A84.473 84.473 0 0 1-2787 1306z" className="cls-3" data-name="Subtraction 7" transform="translate(3470 -850)" />
          <rect id="btn_cleansheet_n-2" width="300" height="300" className="cls-4" data-name="btn_cleansheet_n" rx="10" transform="translate(533 221)" />
        </g>
      </Svg>
    );
  }
}
