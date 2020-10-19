import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill:#fff;
  }
  .cls-2{
    fill:#333;
    stroke:#fff;
    stroke-width:2px
  }
  .cls-3{
    fill:none;
  }
  .cls-4{
    stroke:none;
  }
`;

export default class IcoFilter extends Component {
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
        viewBox="0 0 30 17"
      >
        <g id="ico_filter" transform="translate(-996 -55)">
          <rect id="Rectangle_219" width="30" height="2" className="cls-1" data-name="Rectangle 219" rx="1" transform="translate(996 58)" />
          <rect id="Rectangle_220" width="30" height="2" className="cls-1" data-name="Rectangle 220" rx="1" transform="translate(996 67)" />
          <g id="Ellipse_10" className="cls-2" data-name="Ellipse 10" transform="translate(1001 64)">
            <circle cx="4" cy="4" r="4" className="cls-4" />
            <circle cx="4" cy="4" r="3" className="cls-3" />
          </g>
          <g id="Ellipse_9" className="cls-2" data-name="Ellipse 9" transform="translate(1013 55)">
            <circle cx="4" cy="4" r="4" className="cls-4" />
            <circle cx="4" cy="4" r="3" className="cls-3" />
          </g>
          <path id="ico_filter-2" d="M0 0h30v17H0z" className="cls-3" data-name="ico_filter" transform="translate(996 55)" />
        </g>
      </Svg>
    );
  }
}
