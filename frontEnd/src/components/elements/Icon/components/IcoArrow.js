import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: #00a99d;
  }
  .cls-2{
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 3px;
  }
  .cls-3{
    fill: #f5c910;
    opacity: 0;
  }
`;

export default class IcoArrow extends Component {
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
        viewBox="0 0 40 40"
      >
        <g id="ico_arrow" transform="translate(-1072 -1202)">
          <circle id="Ellipse_4" cx="20" cy="20" r="20" className="cls-1" data-name="Ellipse 4" transform="translate(1072 1202)" />
          <g id="Group_8" data-name="Group 8" transform="translate(-72.5 .5)">
            <path id="Path_21" d="M1155.5 1222.5h18" className="cls-2" data-name="Path 21" />
            <path id="Path_22" d="M1161.748 1223.5l11-1" className="cls-2" data-name="Path 22" transform="rotate(45 1173.384 1223.279)" />
            <path id="Path_23" d="M1162.172 1225.132l10.576-2.632" className="cls-2" data-name="Path 23" transform="rotate(-30 1173.137 1221.047)" />
          </g>
          <circle id="ico_arrow-2" cx="20" cy="20" r="20" className="cls-3" data-name="ico_arrow" transform="translate(1072 1202)" />
        </g>
      </Svg>
    );
  }
}
