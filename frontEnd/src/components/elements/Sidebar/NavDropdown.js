import React, { Component } from 'react';
import styled from 'styled-components';
import NavLink from '~~elements/NavLink';

import NavItem from './NavItem';

const Div = styled.div`
  .dropdown-title {
    position: relative;
    &.active {
      .navitem--link--item > .title {
        color: #ffffff;
      }
      i {
        border-color: #ffffff;
      }
    }

    &--icon-zone {
      width: 2rem;
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .dropdown--menu {
    &.active {
      display: block;
    }
    display: none;
    &--item {
      background-color: black;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding-left: 2rem;
      }
      a {
        color: #939393;
        width: 100%;
        height: 100%;
      }
      &.active {
        background-color: #f5c910;
        a {
          color: #000000;
        }
      }
    }
  }
`;

const ArrowIcon = styled.i`
  /* border: solid;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  border-color: #939393; */
  border: solid;
  border-width: 0 1px 1px 0;
  display: inline-block;
  border-color: #333333;
  transition: 0.3s ease all;
  width: 0.5rem;
  height: 0.5rem;
  transform: ${props => (props.down ?  'translateY(0px) rotate(-135deg)' : 'translateY(-3px) rotate(45deg)')};
`;

function isLinkActive(routesList, pathname) {
  return routesList.map(item => item.link).includes(pathname);
}

export default class NavDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: isLinkActive(this.props.routes, this.props.location.pathname),
    };
  }

  /* eslint camelcase: "off" */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // componentWillReceiveProps
    const isNextLinkActive = isLinkActive(nextProps.routes, nextProps.location.pathname);
    if (isLinkActive(this.props.routes, this.props.location.pathname) !== isNextLinkActive) {
      this.setState({
        on: isNextLinkActive,
      });
    }
  }

  toggle = () => {
    this.setState((currState) => ({ on: !currState.on }));
  }

  render() {
    const { props } = this;
    return (
      <Div>
        <div className={`dropdown-title ${isLinkActive(this.props.routes, this.props.location.pathname) ? 'active' : ''}`}>
          <NavItem title={props.title} link={props.link} icon={props.icon} active={false} />
          <div className="dropdown-title--icon-zone" onKeyUp={() => { }} onClick={this.toggle} >
            <ArrowIcon down={this.state.on} />
          </div>
        </div>
        <div className={`dropdown--menu ${this.state.on ? 'active' : ''}`}>
          {props.routes.map(route => (
            <div key={route.link} className={`dropdown--menu--item ${props.location.pathname === route.link ? 'active' : ''}`}>
              <NavLink to={route.link} className="navitem--link"><span>{route.title}</span></NavLink>
            </div>
          ))}
        </div>
      </Div>
    );
  }
}
