import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1 {
    fill: ${props => props.color};
    transition:0.3s ease all;
  }
  .cls-2 {
    fill: #f7f7f7;
  }
  .cls-3 {
    fill: none;
  }
`;

export default class BtnInfo extends Component {
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
        <g id="btn_info_p" transform="translate(-1177 -404)">
          <rect id="Rectangle_233" width="30" height="30" className="cls-1" data-name="Rectangle 233" rx="15" transform="translate(1177 404)" />
          <path id="Rectangle_2112" d="M0 0h12v4H0z" className="cls-2" data-name="Rectangle 2112" transform="rotate(90 388.5 805.5)" />
          <rect id="Rectangle_2180" width="6" height="6" className="cls-2" data-name="Rectangle 2180" rx="3" transform="rotate(90 393 802)" />
          <rect id="btn_info_p-2" width="30" height="30" className="cls-3" data-name="btn_info_p" rx="4" transform="translate(1177 404)" />
        </g>
      </Svg>
    );
  }
}
