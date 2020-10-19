import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class IcoMenu extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="#333" fillRule="evenodd">
          <rect width="2" height="18" x="11" y="3" rx="1" transform="rotate(90 12 12)" />
          <rect width="2" height="18" x="11" y="-2" rx="1" transform="rotate(90 12 7)" />
          <rect width="2" height="18" x="11" y="8" rx="1" transform="rotate(90 12 17)" />
        </g>
      </svg>
    );
  }
}
