import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    stroke:#333
  }
  .cls-2 {
    fill:#333
  }
  .cls-3 {
    stroke:none
  }
  .cls-1, .cls-4 {
    fill: none;
  }
`;

export default class IcoInstruction extends Component {
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
          viewBox="0 0 12.359 12.359"
        >
          <g id="ico_instruction" transform="translate(10558 -1538)">
            <g id="Ellipse_310" className="cls-1" data-name="Ellipse 310" transform="translate(-10558 1538)">
              <circle cx="6.179" cy="6.179" r="6.179" className="cls-3" />
              <circle cx="6.179" cy="6.179" r="5.679" className="cls-4" />
            </g>
            <path id="Path_1359" d="M.99-16.576h1.229a.83.83 0 0 1 .893-.821.762.762 0 0 1 .861.721c0 .422-.177.639-.762.988a1.4 1.4 0 0 0-.816 1.5l.009.249h1.2v-.24c0-.435.168-.657.771-1.006a1.691 1.691 0 0 0 .97-1.532c0-1.047-.857-1.768-2.153-1.768A1.941 1.941 0 0 0 .99-16.576zm2.063 4.828a.738.738 0 0 0 .821-.771.739.739 0 0 0-.821-.775.743.743 0 0 0-.825.775.742.742 0 0 0 .825.771z" className="cls-2" data-name="Path 1359" transform="translate(-10554.989 1559.177)" />
          </g>
        </Svg>
      );
    }
}
