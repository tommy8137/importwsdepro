import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: url(#linear-gradient);
  }
  .cls-2 {
    fill:#555;
  }
  .cls-3 {
    fill:#f5c910;
  }
`;

export default class BtnDashboard extends Component {
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
        <g id="btn_dashboard_n" transform="translate(-524 -4932)">
          <rect id="Rectangle_2764" width="300" height="300" className="cls-1" data-name="Rectangle 2764" rx="5" transform="translate(524 4932)" />
          <g id="Group_3674" data-name="Group 3674" transform="translate(6)">
            <path id="Union_241" d="M5125 90h-23V70h23a25 25 0 0 0 0-50h-23V0h23a44.984 44.984 0 0 1 31.818 76.82A44.86 44.86 0 0 1 5125 90z" className="cls-2" data-name="Union 241" transform="translate(-4470 5037)" />
            <path id="Union_242" d="M5125 170v-20a65 65 0 0 0 0-130V0a84.624 84.624 0 0 1 47.525 14.516 85.257 85.257 0 0 1 30.8 37.4 84.894 84.894 0 0 1-7.837 80.611 85.25 85.25 0 0 1-37.4 30.8A84.467 84.467 0 0 1 5125 170zm-43 0v-20h43v20zm0-20v-40h20v40zm0-90V20h20v40zm0-40V0h43v20z" className="cls-3" data-name="Union 242" transform="translate(-4470 4997)" />
          </g>
        </g>
      </Svg>
    );
  }
}
