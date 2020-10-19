import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1,.cls-5 {
    fill: none;
  }
  .cls-1 {
    stroke: ${props => props.config.fill};
    opacity:${props => props.config.opacity};
    transition:0.3s ease all;
  }
  .cls-2 {
    fill: ${props => props.config.fill};
    opacity:${props => props.config.opacity};
    transition:0.3s ease all;
  }
  .cls-3 {
    fill: #fff;
  }
  .cls-4 {
    stroke: none;
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


export default class BtnSaveGroup extends Component {
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
        viewBox="0 0 36 36"
        config={this.state.config}
      >
        <g id="btn_save_group_n" transform="translate(-1161 -264)">
          <g id="Ellipse_3" className="cls-1" data-name="Ellipse 3" transform="translate(1161 264)">
            <circle cx="18" cy="18" r="18" className="cls-4" />
            <circle cx="18" cy="18" r="17.5" className="cls-5" />
          </g>
          <circle id="btn_save_group_n-2" cx="18" cy="18" r="18" className="cls-2" data-name="btn_save_group_n" transform="translate(1161 264)" />
          <path id="Subtraction_10" d="M-1373-2318h-16a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1h13l4 4v13a1 1 0 0 1-1 1zm-8-8a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm-7-8v4h10v-4z" className="cls-3" data-name="Subtraction 10" transform="translate(2560 2609)" />
          <g id="btn_save_group_n-3" className="cls-1" data-name="btn_save_group_n" transform="translate(1161 264)">
            <circle cx="18" cy="18" r="18" className="cls-4" />
            <circle cx="18" cy="18" r="17.5" className="cls-5" />
          </g>
        </g>
      </Svg>
    );
  }
}
