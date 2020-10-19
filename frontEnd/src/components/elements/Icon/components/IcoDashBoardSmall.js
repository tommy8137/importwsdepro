import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill:rgba(255,255,255,.3);
  }
  .cls-2{
    fill:#fff;
  }
`;

export default class IcoDashBoardSmall extends Component {
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
        viewBox="0 0 30 30"
      >
        <g id="ico_dashboard_small_0" transform="translate(-605 -4997)">
          <path id="Union_241" d="M3.189 12.478H0V9.705h3.189a3.466 3.466 0 1 0 0-6.932H0V0h3.189A6.237 6.237 0 0 1 7.6 10.651a6.22 6.22 0 0 1-4.411 1.827z" className="cls-1" data-name="Union 241" transform="translate(614.773 5002.546)" />
          <path id="Union_242" d="M5.962 23.57V20.8a9.012 9.012 0 0 0 0-18.024V0a11.733 11.733 0 0 1 6.589 2.013A11.853 11.853 0 0 1 15.734 5.2a11.807 11.807 0 0 1 1.087 2 11.823 11.823 0 0 1 0 9.174 11.8 11.8 0 0 1-1.087 2 11.856 11.856 0 0 1-3.183 3.183 11.731 11.731 0 0 1-6.589 2.013zM0 23.57V20.8h5.962v2.77zm0-2.77v-5.549h2.773V20.8zM0 8.319V2.773h2.773v5.546zm0-5.546V0h5.962v2.773z" className="cls-2" data-name="Union 242" transform="translate(612 4997)" />
        </g>
      </Svg>
    );
  }
}
