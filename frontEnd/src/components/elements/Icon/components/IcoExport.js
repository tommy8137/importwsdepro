import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill:#00a99d;
  }
`;

export default class IcoExport extends Component {
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
        <path id="ico_export" d="M18.444 18.444H7.556V7.556H13V6H7.556A1.555 1.555 0 0 0 6 7.556v10.888A1.555 1.555 0 0 0 7.556 20h10.888A1.555 1.555 0 0 0 20 18.444V13h-1.556zM14.556 6v1.556h2.788L9.7 15.2l1.1 1.1 7.646-7.646v2.788H20V6z" className="cls-1" transform="translate(-6 -6)" />
      </Svg>
    );
  }
}
