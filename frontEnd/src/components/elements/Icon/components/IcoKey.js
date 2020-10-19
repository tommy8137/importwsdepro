import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
 .cls-1{
   fill:rgba(255, 255, 255, 0);
  }
  .cls-2{
   fill: #a4a4a4;
  }
`;

export default class IcoKey extends Component {
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
        viewBox="0 0 15.001 8"
      >
        <g id="ico_key" className="cls-1">
          <path d="M-1436 4240a4 4 0 0 1 4-4 4 4 0 0 1 3.873 3h7.127v2h-1v2h-2v-2h-4.127a4 4 0 0 1-3.873 3 4 4 0 0 1-4-4z" transform="translate(1436.001 -4236)" />
        </g>
        <g className="cls-2">
          <path d="M-1432 4238a2.002 2.002 0 0 0-2 2c0 1.103.897 2.001 2 2.001.913 0 1.71-.617 1.937-1.5l.129-.501-.13-.501A1.997 1.997 0 0 0-1432 4238m0-2a4 4 0 0 1 3.874 3h7.126v2h-1V4243h-2V4241h-4.126a4.002 4.002 0 0 1-7.875-1 4 4 0 0 1 4.001-4z" transform="translate(1436.001 -4236)" />
        </g>
      </Svg>
    );
  }
}
