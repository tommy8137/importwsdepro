import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill: ${props => props.config.fill};
    opacity: ${props => props.config.opacity};
    transition: 0.3s ease all;
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

export default class BtnReset extends Component {
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
        viewBox="0 0 20 17.144"
        config={this.state.config}
      >
        <path id="btn_reset_n" d="M-8615.786-1572.638l1.349-1.368a6.623 6.623 0 0 0 3.866 1.244 6.669 6.669 0 0 0 6.667-6.667 6.669 6.669 0 0 0-6.667-6.667c-3.681 0-6.666 2.413-6.666 6.1h2.855l-3.808 4-3.811-4h2.858c0-4.734 3.836-8 8.57-8a8.573 8.573 0 0 1 8.571 8.573 8.573 8.573 0 0 1-8.571 8.571 8.519 8.519 0 0 1-5.213-1.786zM-8613-1576v-1h4v1zm0-3v-1h6v1zm0-3v-1h6v1z" className="cls-1" transform="translate(8622 1588.001)" />
      </Svg>
    );
  }
}
