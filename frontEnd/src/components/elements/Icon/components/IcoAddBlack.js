import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class IcoAddBlack extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Permission---GUI-Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="1-2_Setting_Permission_Role-Management_view" transform="translate(-1197.000000, -261.000000)" fill="#333333">
            <g id="Group-2" transform="translate(80.000000, 203.000000)">
              <g id="icon/Add-black" transform="translate(1116.000000, 57.000000)">
                <rect id="Rectangle" x="9" y="1" width="2" height="18" rx="1" />
                <rect id="Rectangle-Copy" transform="translate(10.000000, 10.000000) rotate(-270.000000) translate(-10.000000, -10.000000) " x="9" y="1" width="2" height="18" rx="1" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
