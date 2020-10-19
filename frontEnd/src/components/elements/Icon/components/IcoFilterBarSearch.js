import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
`;

export default class IcoFilterBarSearch extends Component {
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
          <g id="Search/icon/Search" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="search" transform="translate(1.000000, 0.000000)">
              <g id="Ellipse_2" transform="translate(9.899831, 10.617354) rotate(-45.000000) translate(-9.899831, -10.617354) translate(2.899831, 3.617354)">
                <circle id="Oval" cx="6.8" cy="6.8" r="6.8" />
                <circle id="Oval" stroke="#333333" strokeWidth="1.6" cx="6.8" cy="6.8" r="6" />
              </g>
              <path d="M15.770899,15.1712641 L18.170899,15.1712641 L18.170899,19.5712641 C18.170899,20.2340058 17.6336407,20.7712641 16.970899,20.7712641 L16.970899,20.7712641 C16.3081573,20.7712641 15.770899,20.2340058 15.770899,19.5712641 L15.770899,15.1712641 Z" id="Rectangle_7" fill="#333333" fillRule="nonzero" transform="translate(16.970899, 17.971264) rotate(-45.000000) translate(-16.970899, -17.971264) " />
            </g>
          </g>
        </Svg>
      );
    }
}
