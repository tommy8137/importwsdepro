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


export default class BtnAddGroup extends Component {
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
        viewBox="0 0 36 36"
        config={config}
      >
        <g id="btn_add_group_d" className="cls-1" transform="translate(-1161 -264)">
          <circle id="Ellipse_3" cx="18" cy="18" r="18" className="cls-2" data-name="Ellipse 3" transform="translate(1161 264)" />
          <path id="Union_2" d="M6 14v-4H2a2 2 0 1 1 0-4h4V2a2 2 0 1 1 4 0v4h4a2 2 0 0 1 0 4h-4v4a2 2 0 0 1-4 0z" className="cls-3" data-name="Union 2" transform="translate(1171 274)" />
          <circle id="btn_add_group_d-2" cx="18" cy="18" r="18" className="cls-4" data-name="btn_add_group_d" transform="translate(1161 264)" />
        </g>
      </Svg>
    );
  }
}
