import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill:#717171;
  }
`;

export default class IcoHeadGray extends Component {
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
        viewBox="0 0 15.999 14"
      >
        <path id="ico_head_gray" d="M-2 12a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zM2 2a4 4 0 1 1 4 4 4 4 0 0 1-4-4z" className="cls-1" transform="translate(2 2)" />
      </Svg>
    );
  }
}
