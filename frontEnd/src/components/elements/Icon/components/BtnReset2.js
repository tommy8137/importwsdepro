import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill: ${props => props.config.fill};
    opacity: ${props => props.config.opacity};
    transition: 0.3s ease all;
  }
  .cls-2{
    fill: #939393
  }
  .cls-3{
    opacity:0
  }
`;

const types = {
  normal: {
    fill: '#939393',
    opacity: 0.2
  },
  hover: {
    fill: '#939393',
    opacity: 0.3
  },
  press: {
    fill: '#939393',
    opacity: 0.2
  },
  disable: {
    fill: '#333',
    opacity: 0.2
  }
};

export default class BtnReset2 extends Component {
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
        <g id="btn_reset_n" transform="translate(-656 -4669)">
          <circle id="Ellipse_6" cx="15" cy="15" r="15" className="cls-1" data-name="Ellipse 6" transform="translate(656 4669)" />
          <path id="Union_4" d="M7.5 16V8.5H0v-1h7.5V0h1v7.5H16v1H8.5V16z" className="cls-2" data-name="Union 4" transform="rotate(45 -5305.153 3146.848)" />
          <circle id="btn_reset_n-2" cx="15" cy="15" r="15" className="cls-3" data-name="btn_reset_n" transform="translate(656 4669)" />
        </g>
      </Svg>
    );
  }
}
