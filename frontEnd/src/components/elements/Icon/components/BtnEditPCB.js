import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    opacity:${props => props.config.opacity}};
    transition: 0.3s ease all;
  }
  .cls-2 {
    fill:${props => props.config.fill};
    opacity:${props => props.config.opacity};
    transition: 0.3s ease all;
  }
  .cls-3 { 
    fill:#fff;
  }
  .cls-4 {
    fill:none;
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


export default class BtnEditPCB extends Component {
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
    const { config } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        config={config}
      >
        <g id="icon/Edit" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Union-257" transform="translate(4.000000, 4.000000)" fill="#333333" fillRule="nonzero" className="cls-2">
            <path d="M0,15.8514286 L0,12.08 L3.77142857,15.8514286 L0,15.8514286 Z M0.627428571,11.456 L10.6731429,1.41028571 L14.4445714,5.18171429 L4.39542857,15.2228571 L0.627428571,11.456 Z M11.3005714,0.782857143 L11.7485714,0.334857143 C12.194857,-0.111293644 12.9182859,-0.111293644 13.3645714,0.334857143 L15.5154286,2.48571429 C15.9615794,2.93199983 15.9615794,3.65542874 15.5154286,4.10171429 L15.0685714,4.54857143 L11.3005714,0.782857143 Z" id="Union_257" />
          </g>
        </g>
      </Svg>
    );
  }
}
