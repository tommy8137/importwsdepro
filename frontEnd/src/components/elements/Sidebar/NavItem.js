import React from 'react';
import styled from 'styled-components';
import NavLink from '~~elements/NavLink';

const Wrapper = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.active ? '#f5c910' : 'none')};


  span:not(:last-child) {
    margin-right: 0.5rem;
  }

  .icon {
    width: 16px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    color: ${props => (props.active ? '#333333' : '#939393')};
  }

  .navitem--link {
    width: 100%;
    height: 100%;
    &--item {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 auto;
    }
  }
`;

const NavItem = (props) => {
  return (
    <Wrapper active={props.active}>
      <NavLink to={props.link} className="navitem--link">
        <div className="navitem--link--item">
          <span>{props.icon}</span>
          <span className="title">{props.title}</span>
        </div>
      </NavLink>
    </Wrapper>
  );
};


export default NavItem;
