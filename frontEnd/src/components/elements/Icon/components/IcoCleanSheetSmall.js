import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .st0{
    fill:#717171;
  }
.st1{
    fill:#FFFFFF;
  }
`;

export default class IcoCleanSheetSmall extends Component {
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
        viewBox="0 0 30 30"
      >
        <g id="ico_clean_sheet_small" transform="translate(-12 -194)">
          <path
            className="st0"
            d="M27,220c-2.2,0-4.3-0.7-6.1-1.9c-1.8-1.2-3.2-2.9-4-4.8c-1.4-3.4-1.1-7.3,1-10.4
            c1.2-1.8,2.9-3.2,4.8-4c3.4-1.4,7.4-1.1,10.4,1c1.8,1.2,3.2,2.9,4,4.8c1.4,3.4,1.1,7.3-1,10.4c-1.2,1.8-2.9,3.2-4.8,4
            C29.9,219.7,28.5,220,27,220z M27,200.6c-4.6,0-8.4,3.8-8.4,8.4c0,4.6,3.8,8.4,8.4,8.4s8.4-3.8,8.4-8.4
            C35.4,204.4,31.6,200.6,27,200.6z"
          />
          <path
            className="st1"
            d="M27.1,220c-2.9,0-5.7-1.2-7.8-3.2c-4.3-4.3-4.3-11.2-0.1-15.5c0,0,0,0,0.1-0.1
            c4.3-4.3,11.4-4.3,15.7,0c0.1,0.1,0.2,0.2,0.3,0.3l-0.3-0.3l-1.8,1.8c-3.3-3.3-8.6-3.4-11.9-0.1c-3.3,3.3-3.4,8.6-0.1,11.9
            s8.6,3.4,11.9,0.1c0,0,0,0,0.1-0.1l1.8,1.8C32.8,218.8,30,220,27.1,220z"
          />
        </g>
      </Svg>
    );
  }
}
