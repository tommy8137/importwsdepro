import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: #e93823;
  }
  .cls-2 {
    fill:none;
    stroke:#fff;
    stroke-linecap:round;
  }
`;

export default class IcoRedFail extends Component {
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
          <g id="ico_red_fail_0" transform="translate(10813 -1531)">
            <g id="btn_reset_n" transform="translate(-11130 1197)">
              <circle id="Ellipse_6" cx="9" cy="9" r="9" className="cls-1" data-name="Ellipse 6" transform="translate(317 334)" />
            </g>
            <g id="Group_5958" data-name="Group 5958" transform="translate(-185 -246)">
              <path id="Line_270" d="M0 0l7 7" className="cls-2" data-name="Line 270" transform="translate(-10622.5 1782.5)" />
              <path id="Line_271" d="M7 0L0 7" className="cls-2" data-name="Line 271" transform="translate(-10622.5 1782.5)" />
            </g>
          </g>
        </Svg>
      );
    }
}
