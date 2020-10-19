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
    opacity: 0.7
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


export default class BtnDelPCB extends Component {
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
        <g id="icon/Delete" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" className="cls-2">
          <path d="M17.999,7 L5.999,7 L5.999,19 C5.999,20.104 6.895,21 8,21 L15.999,21 C17.105,21 17.999,20.104 17.999,19 L17.999,7 M14.499,2.999 L9.499,2.999 L8.5,4 L5.999,4 C5.448,4 5,4.448 5,4.999 L5,6 L19,6 L19,4.999 C19,4.448 18.552,4 17.999,4 L15.5,4 L14.499,2.999" id="Fill-3" fill="#333333" />
        </g>
      </Svg>
    );
  }
}
