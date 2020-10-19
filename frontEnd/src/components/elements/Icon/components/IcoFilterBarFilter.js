import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
`;

export default class IcoFilterBarFilter extends Component {
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
          viewBox="0 0 24 24"
        >
          <g id="Search/icon/Filter" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group" transform="translate(2.000000, 5.000000)">
              <rect id="Rectangle" fill="#333333" x="0" y="1.66666667" width="20" height="1.66666667" rx="0.833333333" />
              <rect id="Rectangle-Copy" fill="#333333" x="0" y="10" width="20" height="1.66666667" rx="0.833333333" />
              <circle id="Oval" stroke="#333333" strokeWidth="1.66666667" fill="#F0F0F0" cx="13.3333333" cy="2.5" r="2.5" />
              <circle id="Oval-Copy" stroke="#333333" strokeWidth="1.66666667" fill="#F0F0F0" cx="6.66666667" cy="10.8333333" r="2.5" />
            </g>
          </g>
        </Svg>
      );
    }
}
