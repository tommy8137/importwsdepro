import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  .cls-1{
    fill: ${props => props.color};
    transition:0.3s ease all;
  }
`;

export default class BtnLogout extends Component {
  static propTypes = {
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'normal',
  }
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff'
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
          color: '#fff'
        });
        break;
      case 'hover':
        this.setState({
          color: '#f2f2f2'
        });
        break;
      case 'press':
        this.setState({
          color: '#fff'
        });
        break;
      default:
        break;
    }
  }
  render() {
    const { color } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21 20"
        color={color}
      >
        <path id="btn_logout_n" d="M0-848a10.011 10.011 0 0 1 10-10 10 10 0 0 1 7.517 3.411l-1.417 1.418A7.989 7.989 0 0 0 10-856a8.009 8.009 0 0 0-8 8 8.01 8.01 0 0 0 8 8 7.991 7.991 0 0 0 6.1-2.831l1.418 1.417A10.006 10.006 0 0 1 10-838a10.011 10.011 0 0 1-10-10zm17 1H9v-2h8v-2l4 3-4 3z" className="cls-1" transform="translate(0 858)" />
      </Svg>
    );
  }
}
