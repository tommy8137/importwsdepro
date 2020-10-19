import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
 .cls-1{
    fill: #333;
  }
  .cls-2{
    fill: #f5c910;
  }
  .cls-3{
    fill: none
  }
`;

export default class IcoBookmark extends Component {
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
        viewBox="0 0 12 18"
      >
        <g id="ico_bookmark" transform="translate(-177 -275)">
          <path id="Path_7" d="M.311.015h12v18l-6-4-6 4z" className="cls-1" data-name="Path 7" transform="translate(176.689 274.985)" />
          <path id="Path_8" d="M2.978 6.124L1 4.056l2.753-.449L5.043 1l1.2 2.607L9 4.056 7.022 6.124 7.452 9 5.043 7.562 2.548 9z" className="cls-2" data-name="Path 8" transform="translate(178 277)" />
          <path id="ico_bookmark-2" d="M.311.015h12v18l-6-4-6 4z" className="cls-3" data-name="ico_bookmark" transform="translate(176.689 274.985)" />
        </g>
      </Svg>
    );
  }
}
