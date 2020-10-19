import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill: ${props => props.config.fill};
    opacity:${props => props.config.opacity};
    transition:0.3s ease all;
  }
  .cls-2{
    fill:none;
  }
  .cls-3{
    fill:#fff;
  }
  .cls-4{
    display:none;
    filter:url(#Rectangle_233);
  }
`;

const types = {
  normal: {
    fill: '#333',
    opacity: 1
  },
  hover: {
    fill: '#555',
    opacity: 1
  },
  press: {
    fill: '#1e1e1e',
    opacity: 1
  },
  disable: {
    fill: '#333',
    opacity: 0.2
  }
};

export default class BtnUpdate extends Component {
  static propTypes = {
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'normal',
  }
  constructor(props) {
    super(props);
    this.state = {
      config: {
        ...types.normal
      }
    };
  }
  componentWillMount() {
    if (this.props.type) {
      this.changePath(this.props.type);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.changePath(nextProps.type);
    }
  }
  changePath = (type) => {
    switch (type) {
      case 'normal':
        this.setState({
          config: {
            ...types.normal
          }
        });
        break;
      case 'hover':
        this.setState({
          config: {
            ...types.hover
          }
        });
        break;
      case 'press':
        this.setState({
          config: {
            ...types.press
          }
        });
        break;
      case 'disable':
        this.setState({
          config: {
            ...types.disable
          }
        });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        config={this.state.config}
      >
        <defs>
          <filter id="Rectangle_233" width="48" height="48" x="0" y="0" filterUnits="userSpaceOnUse">
            <feOffset dy="3" />
            <feGaussianBlur result="blur" stdDeviation="3" />
            <feFlood floodOpacity=".161" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="btn_update_h-2" data-name="btn_update_h" transform="translate(-1177 -404)">
          <g className="cls-6" transform="translate(1168 398)">
            <rect id="Rectangle_233-2" width="30" height="30" className="cls-1" data-name="Rectangle 233" rx="15" transform="translate(9 6)" />
          </g>
          <rect id="btn_update_n" width="30" height="30" className="cls-2" rx="4" transform="translate(1177 404)" />
          <path id="Union_152" d="M-1244-11259v-4h2v4zm-14 0v-4h14v2h-12v2z" className="cls-3" data-name="Union 152" transform="rotate(180 -29 -5418.5)" />
          <path id="Path_972" d="M14 21h3v5h4v-5h3l-5-7z" className="cls-3" data-name="Path 972" transform="translate(1173 395)" />
          <g className="cls-5" transform="translate(1168 398)">
            <rect id="btn_update_h-3" width="30" height="30" className="cls-4" data-name="btn_update_h" rx="15" transform="translate(9 6)" />
          </g>
        </g>
      </Svg>
    );
  }
}
