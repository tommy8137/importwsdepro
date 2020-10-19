import React, { Component } from 'react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: papayawhip;
  height: 3rem;
`;


export default class Header extends Component {
  render() {
    return (
      <Wrapper className="header">
        <p>這裡是Header</p>
      </Wrapper>
    );
  }
}
