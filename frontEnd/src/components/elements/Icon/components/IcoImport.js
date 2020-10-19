import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill:#00a99d;
  }
`;

export default class IcoImport extends Component {
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
        viewBox="0 0 14.999 14.999"
      >
        <g id="ic_import" transform="translate(-855 -626)">
          <g id="Group_5737" data-name="Group 5737" transform="translate(855 626.052)">
            <path id="Path_1464" d="M41.461 43.447H30.486a1.988 1.988 0 0 1-1.986-1.986V30.486a1.988 1.988 0 0 1 1.986-1.986h4.442v1.463h-4.442a.53.53 0 0 0-.523.523v10.975a.53.53 0 0 0 .523.523h10.975a.53.53 0 0 0 .523-.523v-4.442h1.463v4.442a1.988 1.988 0 0 1-1.986 1.986z" className="cls-1" data-name="Path 1464" transform="translate(-28.5 -28.5)" />
          </g>
          <path id="Path_1465" d="M76.865 28.214a.732.732 0 0 0-1.035 0l-8.367 8.367V33.54a.732.732 0 1 0-1.463 0v4.91c0 .01 0 .028.006.042s.005.022.008.034l.009.036.011.033c.003.011.008.023.013.035l.014.03.017.035.016.027.021.035.02.027.023.03.036.04.012.014.013.012a.7.7 0 0 0 .04.037l.028.021.029.022.032.02.029.017.033.016.032.015.032.012.036.012.032.008.037.009.038.006h.033a.722.722 0 0 0 .072 0h4.818a.732.732 0 0 0 0-1.463H68.5l8.367-8.367a.732.732 0 0 0-.002-1.031z" className="cls-1" data-name="Path 1465" transform="translate(792.92 598)" />
        </g>
      </Svg>
    );
  }
}
