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
    /* opacity:${props => props.config.opacity}}; */
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
    opacity: 0
  },
  hover: {
    fill: '#333',
    opacity: 0.1
  },
  press: {
    fill: '#333',
    opacity: 0.2
  },
  disable: {
    fill: '#333',
    opacity: 0.2
  }
};


export default class BtnDelete extends Component {
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
        <g id="btn_search_to_default_n" transform="translate(-1640 -8566)">
          <circle id="Ellipse_6" data-name="Ellipse 6" className="cls-1" cx="12" cy="12" r="12" transform="translate(1640 8566)" />
          <rect id="Rectangle_1761" data-name="Rectangle 1761" className="cls-2" width="14" height="2" rx="1" transform="translate(1657.657 8573.758) rotate(135)" />
          <rect id="Rectangle_1762" data-name="Rectangle 1762" className="cls-2" width="14" height="2" rx="1" transform="translate(1656.243 8583.657) rotate(-135)" />
        </g>
      </Svg>
    );
  }
}
