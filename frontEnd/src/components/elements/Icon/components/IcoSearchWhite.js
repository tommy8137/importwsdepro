import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill:none;
  } 
  .cls-2,
  .cls-3{
    stroke:none;
  }
  .cls-3{
    fill:#fff;
  }
`;

export default class IcoSearchWhite extends Component {
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
        viewBox="0 0 17.678 17.678"
      >
        <g id="ico_search_black" transform="rotate(-45 315.384 1249.636)">
          <g id="Union_93" className="cls-1" data-name="Union 93">
            <path d="M-3662-114v-3h2v3a1 1 0 0 1-1 1 1 1 0 0 1-1-1zm-4-9a5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5z" className="cls-2" transform="translate(4637 276)" />
            <path d="M-3661-120c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3m0 7a1 1 0 0 1-1-1v-3h2v3a1 1 0 0 1-1 1zm0-5a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" className="cls-3" transform="translate(4637 276)" />
          </g>
        </g>
      </Svg>
    );
  }
}
