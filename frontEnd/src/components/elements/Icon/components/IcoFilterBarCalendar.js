import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
`;

export default class IcoFilterBarCalendar extends Component {
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
          viewBox="0 0 24 24"
        >
          <g id="Search/icon/calendar" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-7" transform="translate(3.000000, 4.000000)">
              <path d="M1.125,1.6875 C0.814339828,1.6875 0.5625,1.93933983 0.5625,2.25 L0.5625,15.75 C0.5625,16.0606602 0.814339828,16.3125 1.125,16.3125 L16.875,16.3125 C17.1856602,16.3125 17.4375,16.0606602 17.4375,15.75 L17.4375,2.25 C17.4375,1.93933983 17.1856602,1.6875 16.875,1.6875 L1.125,1.6875 Z M0.5625,1.6875 L17.4375,1.6875 L17.4375,16.3125 L0.5625,16.3125 L0.5625,1.6875 Z" id="Combined-Shape" stroke="#333333" strokeWidth="1.125" />
              <path d="M3.9375,0 L3.9375,3.375" id="Line-3" stroke="#333333" strokeWidth="1.125" />
              <path d="M14.0625,0 L14.0625,3.375" id="Line-3-Copy" stroke="#333333" strokeWidth="1.125" />
              <path d="M1.125,5.0625 L16.875,5.0625" id="Line-4" stroke="#333333" strokeWidth="1.125" strokeLinecap="square" />
              <rect id="Rectangle" fill="#333333" x="3.375" y="7.875" width="2.25" height="2.25" />
            </g>
          </g>
        </Svg>
      );
    }
}
