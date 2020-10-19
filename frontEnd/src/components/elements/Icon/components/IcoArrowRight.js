import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    stroke-linejoin:round
  }
  .cls-1, .cls-2 {
    fill:none;
    stroke:#333;
    stroke-linecap:round;
    stroke-width:2px
  }
`;

export default class IcoArrowRight extends Component {
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
          viewBox="0 0 16.52 16.52"
        >
          <g id="ico_arrow_right" transform="translate(-2831 -1467.5)">
            <path id="Path_1175" d="M9519.646 2045.845l5.706 5.706-5.706 5.706" className="cls-1" data-name="Path 1175" transform="translate(-6678.831 -577.345)" />
            <path id="Path_1176" d="M9527.864 2010h-12.2" className="cls-2" data-name="Path 1176" transform="translate(-6683.664 -536)" />
          </g>
        </Svg>
      );
    }
}
