import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: ${props => props.color};
    transition:0.3s ease all;
  }
  .cls-2 {
    fill: #919191;
  }
  .cls-3 {
    fill: none;
  }
`;

export default class BtnEditBomGray extends Component {
  static propTypes = {
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'normal',
  }
  constructor(props) {
    super(props);
    this.state = {
      color: '#555'
    };
  }
  componentWillMount() {
    if (this.props.type) {
      this.changePath(this.props.type);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.changePath(nextProps.type);
    }
  }
  changePath = (type) => {
    switch (type) {
      case 'normal':
        this.setState({
          color: '#333',
          opacity: 1
        });
        break;
      case 'hover':
        this.setState({
          color: '#555',
          opacity: 1
        });
        break;
      case 'press':
        this.setState({
          color: '#1e1e1e',
          opacity: 1
        });
        break;
      case 'disable':
        this.setState({
          color: '#333',
          opacity: 0.2
        });
        break;
      default:
        break;
    }
  }
  render() {
    const { color, opacity } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        color={color}
        opacity={opacity}
      >
        <g id="btn_edit_bom_p" transform="translate(-1161 -263)">
          {/* <circle id="Ellipse_3" cx="15" cy="15" r="15" className="cls-1" data-name="Ellipse 3" transform="translate(1161 263)" /> */}
          <path id="Union_3" d="M0 13.87v-3.3l3.3 3.3zm.549-3.846l8.79-8.79 3.3 3.3-8.793 8.786zM9.888.685l.392-.392a1 1 0 0 1 1.414 0l1.882 1.882a1 1 0 0 1 0 1.414l-.391.391z" className="cls-2" data-name="Union 3" transform="translate(1169 272.104)" />
        </g>
      </Svg>
    );
  }
}
