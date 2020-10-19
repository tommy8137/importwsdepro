import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1,.cls-3{
    fill: #58d145;
  }
  .cls-2{
    fill: #fff;
  }
  .cls-3{
    opacity: 0;
  }
  .cls-4{
    filter: url(#ico_success);
  }
  .cls-5{
    filter: url(#Ellipse_88);
  }
`;

export default class IcoSuccess extends Component {
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
        viewBox="0 0 154 154"
      >
        <defs>
          <filter id="Ellipse_88" width="154" height="154" x="0" y="0" filterUnits="userSpaceOnUse">
            <feOffset dy="10" />
            <feGaussianBlur result="blur" stdDeviation="10" />
            <feFlood floodOpacity=".502" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="ico_success" width="154" height="154" x="0" y="0" filterUnits="userSpaceOnUse">
            <feOffset dy="10" />
            <feGaussianBlur result="blur-2" stdDeviation="10" />
            <feFlood floodOpacity=".502" />
            <feComposite in2="blur-2" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="ico_success-2" data-name="ico_success" transform="translate(-227 -315)">
          <g className="cls-5" transform="translate(227 315)">
            <circle id="Ellipse_88-2" cx="47" cy="47" r="47" className="cls-1" data-name="Ellipse 88" transform="translate(30 20)" />
          </g>
          <path id="Rectangle_826" d="M0 0h50v6H0z" className="cls-2" data-name="Rectangle 826" transform="rotate(-45 631.95 -159.197)" />
          <path id="Rectangle_827" d="M0 0h32v6H0z" className="cls-2" data-name="Rectangle 827" transform="rotate(-135 234.204 140.959)" />
          <g className="cls-4" transform="translate(227 315)">
            <circle id="ico_success-3" cx="47" cy="47" r="47" className="cls-3" data-name="ico_success" transform="translate(30 20)" />
          </g>
        </g>
      </Svg>
    );
  }
}
