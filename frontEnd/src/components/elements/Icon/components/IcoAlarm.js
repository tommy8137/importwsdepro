import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1,
  .cls-2 {
    fill: #fae800;
  }
  .cls-2 {
    opacity:0;
  }
`;

export default class IcoAlarm extends Component {
  static propTypes = {
    type: PropTypes.string
  };
  static defaultProps = {
    type: 'normal'
  };
  constructor(props) {
    super(props);
    this.state = {
      color: '#555'
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.changePath(nextProps.type);
    }
  }
  changePath = type => { };
  render() {
    const { color, opacity } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 90"
        color={color}
        opacity={opacity}
        type={this.props.type}
      >
        <g id="ico_alarm" transform="translate(-633 -300)">
          <path
            id="Path_558"
            d="M13.6 90.5a12.764 12.764 0 0 1-11.373-6.632 12.823 12.823 0 0 1 0-13.026l36.967-63.71A13.245 13.245 0 0 1 50.568.5a12.764 12.764 0 0 1 11.375 6.632l36.73 63.711a12.823 12.823 0 0 1 0 13.026A13.245 13.245 0 0 1 87.3 90.5H13.6z"
            className="cls-1"
            data-name="Path 558"
            transform="translate(632.55 299.5)"
          />
          <path
            id="Union_19"
            d="M-2872-3554v-9h10v9zm0-13v-33h10v33z"
            data-name="Union 19"
            transform="translate(3550 3930)"
          />
          <path
            id="ico_alarm-2"
            d="M13.6 90.5a12.764 12.764 0 0 1-11.373-6.632 12.823 12.823 0 0 1 0-13.026l36.967-63.71A13.245 13.245 0 0 1 50.568.5a12.764 12.764 0 0 1 11.375 6.632l36.73 63.711a12.823 12.823 0 0 1 0 13.026A13.245 13.245 0 0 1 87.3 90.5H13.6z"
            className="cls-2"
            data-name="ico_alarm"
            transform="translate(632.55 299.5)"
          />
        </g>
      </Svg>
    );
  }
}
