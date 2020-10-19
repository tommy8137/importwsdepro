import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  opacity: ${props => props.config.opacity};
  .cls-1 {
    fill: #5f738c;
  }
  .cls-2 {
    /* paper */
    fill: #fff;
    transition:0.3s ease all;
    transform:${props => props.config.paper.transform};
  }
  .cls-5{
    /* folder */
    transition:0.3s ease all;
    transform:${props => props.config.folder.transform};
  }
  .cls-3 {
    fill: #7c90a9;
  }
  .cls-4 {
    fill: #00a99d;
    opacity: 0;
  }
`;

const types = {
  normal: {
    paper: {
      transform: 'translate(1214px, 533px)'
    },
    folder: {
      transform: 'translate(1173px, 479px)'
    },
    opacity: 1
  },
  hover: {
    paper: {
      transform: 'translate(1214px, 520px)'
    },
    folder: {
      transform: 'translate(1173px, 490px)'
    },
    opacity: 1
  },
  press: {
    paper: {
      transform: 'translate(1214px, 520px)'
    },
    folder: {
      transform: 'translate(1173px, 490px)'
    },
    opacity: 1
  },
  disable: {
    paper: {
      transform: 'translate(1214px, 533px)'
    },
    folder: {
      transform: 'translate(1173px, 479px)'
    },
    opacity: 0.2
  }
};

export default class BtnFolder extends Component {
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
        viewBox="0 0 132.001 112.00"
        config={this.state.config}
      >
        <g id="btn_foler_h" transform="translate(-1203 -498.999)">
          <g className="cls-6" transform="translate(1173 479)">
            <path id="Union_146-2" d="M6-14537a6 6 0 0 1-6-6v-100a6 6 0 0 1 6-6h46l20 12h54a6 6 0 0 1 6 6v88a6 6 0 0 1-6 6z" className="cls-1" data-name="Union 146" transform="translate(30 14669)" />
          </g>
          <rect id="Rectangle_2092" width="110" height="84" className="cls-2" data-name="Rectangle 2092" rx="2" transform="translate(1214 520)" />
          <g className="cls-5" transform="translate(1173 479)">
            <rect id="Rectangle_2091-2" width="132" height="82" className="cls-3" data-name="Rectangle 2091" rx="6" transform="translate(30 50)" />
          </g>
          <rect id="btn_foler_h-2" width="132" height="112" className="cls-4" data-name="btn_foler_h" rx="6" transform="translate(1203 499)" />
        </g>
      </Svg>
    );
  }
}
