import React from 'react';
import styled from 'styled-components';

import NavLink from '~~elements/NavLink';

const CustomNavLink = styled(NavLink)`
  height: 100%;
  color: #404040;
  display: flex;
  align-items: center;
  opacity: 0.3;

  &.active {
    border-bottom: 0.4rem solid #f5c910;
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 10rem;
  }
`;

const Nav = (props) => {
  return (
    props.routes.map(route => (
      <CustomNavLink to={route.link} key={route.link}>
        <span className="title">{route.title}</span>
      </CustomNavLink>
    )));
};

export default Nav;
