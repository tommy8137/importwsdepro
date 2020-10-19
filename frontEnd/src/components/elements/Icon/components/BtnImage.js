import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    opacity:${props => props.config.opacity}};
    transition: 0.3s ease all;
    stroke:#333;
  }
  .cls-2 {
    fill:${props => props.config.fill};
    /* opacity:${props => props.config.opacity}}; */
    transition: 0.3s ease all;
  }
  .cls-3 { 
    fill:#fff;
    stroke:none
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


export default class BtnImage extends Component {
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
        viewBox="0 0 20 16"
        config={config}
      >
        <g id="btn_image_n" transform="translate(-1698.667 -15054)">
          <g id="Rectangle_3198" className="cls-1" data-name="Rectangle 3198">
            <path d="M0 0h20v16H0z" className="cls-3" transform="translate(1698.667 15054)" />
            <path d="M.5.5h19v15H.5z" className="cls-4" transform="translate(1698.667 15054)" />
          </g>
          <ellipse id="Ellipse_306" cx="1.761" cy="1.761" className="cls-2" data-name="Ellipse 306" rx="1.761" ry="1.761" transform="translate(1712.182 15056.993)" />
          <path id="Union_249" d="M0 9.4V4.786L5.4 0l6.112 5.412v-.02L14 3.2l5.261 4.659v1.53h-3.25l.018.016z" className="cls-2" data-name="Union 249" transform="translate(1698.942 15059.654)" />
        </g>
      </Svg>
    );
  }
}
