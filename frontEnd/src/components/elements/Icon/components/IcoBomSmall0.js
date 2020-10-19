import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill:#FFFFFF;
  }
  .cls-2{
    opacity:0.3;
    fill:#FFFFFF;
  }
`;

export default class IcoBomSmall0 extends Component {
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
        <g id="ico_bom_small_0" transform="translate(6258 -2401)">
          <path id="Union_234" d="M7.624 23.566v-2.775c.091 0 .184.007.277.007a4.853 4.853 0 0 0 0-9.706c-.093 0-.185 0-.277.008V8.32a2.773 2.773 0 0 0 0-5.547H2.772v20.8A2.772 2.772 0 0 1 0 20.8V0h7.624a5.545 5.545 0 0 1 4.06 9.323A7.625 7.625 0 0 1 7.9 23.572c-.091 0-.184-.002-.276-.006z" className="cls-1" data-name="Union 234" transform="translate(-6250 2401)" />
          <path id="Rectangle_2743" d="M0 0h5.129v2.773H0z" className="cls-2" data-name="Rectangle 2743" transform="translate(-6247.228 2421.799)" />
        </g>
      </Svg>
    );
  }
}
