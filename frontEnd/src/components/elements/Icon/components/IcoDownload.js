import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill:#00a99d;
  }
`;

export default class IcoDownload extends Component {
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
        viewBox="0 0 15.999 16.002"
      >
        <path id="ico_download" d="M-1252-11247v-5h-3l5-7 5 7h-3v5zm8-12v-4h2v4zm-14 0v-4h14v2h-12v2z" className="cls-1" transform="rotate(180 -621 -5623.5)" />
      </Svg>
    );
  }
}
