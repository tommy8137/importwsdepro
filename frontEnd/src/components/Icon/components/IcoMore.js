import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class IcoMore extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
        <g id="icon/more" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Group" transform="translate(4.000000, 10.000000)" fill="#333333">
            <circle id="Oval" cx="2" cy="2" r="2" />
            <circle id="Oval-Copy" cx="8" cy="2" r="2" />
            <circle id="Oval-Copy-2" cx="14" cy="2" r="2" />
          </g>
        </g>
      </svg>
    );
  }
}
