import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .st0{
    fill:#333333;
  }
  .st1{
    opacity:0.3;
    fill:#333333;
  }
`;
export default class IcoXraySmall1 extends Component {
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
        <g transform="translate(7 -44)">
          <path
            className="st0"
            d="M-1.2,70L-1.2,70L-1.2,70L-1.2,70z M0.7,68.1H-3L6.3,59L-3,49.9h3.7l7.4,7.3L10,59
            l-1.9,1.8C8.2,60.8,0.7,68.1,0.7,68.1z M-1.1,48L-1.1,48L-1.1,48L-1.1,48L-1.1,48z"
          />
          <path
            className="st1"
            d="M17.2,70L17.2,70L17.2,70L17.2,70z M19,68.1h-3.7l-6.5-6.4l1.9-1.8L19,68.1L19,68.1z
            M10.6,58.1l-1.9-1.8l6.5-6.4H19L10.6,58.1z M17.2,48L17.2,48L17.2,48L17.2,48L17.2,48z"
          />
        </g>
      </Svg>
    );
  }
}
