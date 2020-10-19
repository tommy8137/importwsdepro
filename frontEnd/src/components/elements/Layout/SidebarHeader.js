import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import media from 'styled-media-query';
import Sidebar from '~~elements/Sidebar';
import Icon from '~~elements/Icon';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import { logout } from '~~features/Auth/AuthActions';

const headerHeight = '3.875rem';
const sidebarWidth = '13rem';
const hmBarHeight = 3;
const Wrapper = styled.div`
  .section {
    display: flex;
    .section-left {
      .sidebar {
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #333333;
        z-index: 901;
        width: ${sidebarWidth};
        transition: 0.3s ease all;
        overflow: hidden;
        overflow-y: auto;
        ${media.lessThan('large')`
            top: ${headerHeight};
            width:100%;
            visibility: ${props => (props.open ? 'visible' : 'hidden')};
            transform: ${props => (props.open ? 'translate(0, 0%)' : 'translate(0, -100%)')};
        `}
      }
      .header {
        height: ${headerHeight};
        background-color: #808080;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 900;
        ${media.lessThan('large')`
          z-index: 902;
        `}
      }
    }
    .section-right {
      display: flex;
      width: 100%;
      padding-left: ${sidebarWidth};
      background-color: #e6e6e6;
      ${media.lessThan('large')`
        padding-left: 0;
      `}

      .main {
        padding-top: ${headerHeight};
        display: block;
        width: 100%;
        height: 100%;
        /* min-height: 100vh; */
        min-height: -webkit-fill-available;
      }
    }
  }
`;

// 上方fixed bar
const HeaderContainer = styled.div`
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
  z-index: 99;
  padding-left: ${sidebarWidth};
  ${media.lessThan('large')`
    padding: 0 1rem;
    justify-content: flex-start;
  `}
  .logout {
    width: 1.6rem;
    margin-left: 1rem;
    cursor: pointer;
    .icon {
      display: block;
      width: 100%;
    }
  }
  .hm {
    display: none;
    position: absolute;
    /* background-color: red; */
    background-color: transparent;
    box-shadow: none;
    outline: 0;
    border: none;
    &:focus,
    &:hover{
      box-shadow: none;
      outline: 0;
      border: none;
    }
    right: 0.5rem;
    top: 50%;
    height: 30px;
    width: 36px;
    transform: translate(0%, -50%);
    ${media.lessThan('large')`
      display: block;
      z-index: 902;
    `}
    >span{
      position: absolute;
      height: ${hmBarHeight}px;
      width: 100%;
      background-color: white;
      transition: 0.3s ease all;
      &:nth-child(1){
        left: 0px;
        top: 0px;
        transform-origin: right center;
        transform: ${props => (props.open ? 'translate(0, -50%) rotate(-45deg) scaleX(1.05)' : 'translate(0, -50%) rotate(0deg)')};
      }
      &:nth-child(2){
        left: 0px;
        top: 50%;
        margin-top: -${hmBarHeight / 2}px;
        transform: ${props => (props.open ? 'translate(0, -50%) scaleX(0)' : 'translate(0, -50%) scaleX(1)')};
      }
      &:nth-child(3){
        left: 0px;
        bottom: 0px;
        transform-origin: right center;
        transform: ${props => (props.open ? 'translate(0, -50%) rotate(45deg) scaleX(1.05)' : 'translate(0, -50%) rotate(0deg)')};
      }
    }
  }
  .account {
    white-space: nowrap;
    .icon,
    p{
      display: inline-block;
      vertical-align: middle;
    }
    .icon {
      width: 1rem;
      margin-right: 0.4rem;
    }
    p{
      font-size: 1rem;
      margin: 0;
    }
  }

`;

@connect(
  state => ({

  }),
  {
    logout
  }
)
export default class SidebarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      open: false
    };
  }

  toggleAlert = () => {
    this.setState({
      ...this.state,
      alert: !this.state.alert,
    });
  }

  handleConfirmLogout = (e) => {
    this.toggleAlert();
    this.props.logout();
  }
  toggleMenu = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  }
  render() {
    const { open } = this.state;
    return (
      <Wrapper open={open}>
        <Alert isOpen={this.state.alert} type="alarm">
          <div className="row">請確認是否要登出？</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={this.handleConfirmLogout}
            >
              確定
            </Button>
            <Button
              color="black"
              onClick={this.toggleAlert}
            >
              取消
            </Button>
          </div>
        </Alert>
        <div className="section">
          {/* 側邊欄 */}
          <div className="section-left">
            <div className="header">
              <HeaderContainer open={open}>
                <div className="account">
                  <Icon icon="IcoHeadGray4" />
                  <p>{sessionStorage.getItem('username')}</p>
                </div>
                <div className="logout">
                  <Icon icon="BtnLogout" onClick={this.toggleAlert} />
                </div>
                <Button className="hm" onClick={this.toggleMenu}>
                  <span />
                  <span />
                  <span />
                </Button>
              </HeaderContainer>
            </div>
            <div className="sidebar">
              <Sidebar {...this.props} />
            </div>
          </div>
          <div className="section-right">
            {/* 上方fixed bar */}
            {/* 下方主內容 */}
            <div className="main" key="main">
              <div>{this.props.children}</div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
