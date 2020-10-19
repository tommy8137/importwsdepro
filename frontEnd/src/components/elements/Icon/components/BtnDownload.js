import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Svg = styled.svg`
  .cls-1 {
    fill:${props => props.config.fill};
    opacity:${props => props.config.opacity};
    transition: 0.3s ease all;
  }
  .cls-2 {
    fill: #fff;
  }
  .cls-3 {
    fill:none
  }
  .cls-4{}
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

export default class BtnDownload extends Component {
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
        viewBox="0 0 30 30"
        config={config}
      >
        <g id="btn_download_n" transform="translate(-1177 -404)">
          <g className="cls-4" transform="translate(1168 398)">
            <rect id="Rectangle_233-2" width="30" height="30" className="cls-1" data-name="Rectangle 233" rx="15" transform="translate(9 6)" />
          </g>
          <path id="Union_138" d="M-1252-11247v-5h-3l5-7 5 7h-3v5zm8-12v-4h2v4zm-14 0v-4h14v2h-12v2z" className="cls-2" data-name="Union 138" transform="rotate(180 -29 -5418.5)" />
          <rect id="btn_download_n-2" width="30" height="30" className="cls-3" data-name="btn_download_n" rx="4" transform="translate(1177 404)" />
        </g>
      </Svg>
    );
  }
}
