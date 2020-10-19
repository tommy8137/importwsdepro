import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: #ec0c0c;
  }
`;

export default class IcoAlarmRed extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 16"
      >
        <path id="ico_alarm_red" d="M-2854 16h-18l9-16 9 16zm-10-4v2h2v-2zm0-6v5h2V6h-2z" className="cls-1" transform="translate(2872)" />
      </Svg>
    );
  }
}
