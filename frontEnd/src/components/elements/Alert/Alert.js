import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';

const Wrapper = styled.div`
.alert{
  top: -10%;
  left: 0;
  /* 調整無法正確置中問題
  width: 100vw;
  height: 100vh; */
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  opacity: 0;
  z-index: 9999;
  /* background: rgba(0,0,0,0.2); */
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: .3s ease all;
  &.active {
    top: 0;
    opacity: 1;
    visibility: visible;
    transition: .3s ease all;
  }

  .body {
    color: #fff;
    width: 496px;
    min-height: 240px;
    border-radius: 4px;
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.38);
    border: solid 1px #1e1e1e;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    &-icon {
      position: absolute;
      width: 100px;
      top: -45px;
    }
    .content {
      width: 100%;
      min-height: 60%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      margin: 4.5rem 3rem 1rem 3rem;
      .row {
        display: flex;
        min-height: 4rem;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        /* 矯正被bootstrap覆蓋的style */
        margin-left: 0;
        margin-right: 0;
        padding: .5rem 3rem;
        text-align: center;
      }
    }
  }
}
`;


export default class Alert extends Component {
  static propTypes = {
    /** alarm | fail | success */
    type: PropTypes.oneOf(['alarm', 'fail', 'success']),
    /** true | false */
    isOpen: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    type: 'alarm',
    isOpen: false,
    children: null,
  };

  render() {
    const ICON = {
      alarm: {
        icon: IconName.IcoAlarm,
        size: '100px',
      },
      fail: {
        icon: IconName.IcoFail,
        size: '100px',
      },
      success: {
        icon: IconName.IcoSuccess,
        size: '100px',
      },
    };
    const { type, children, isOpen } = this.props;
    return (
      <Wrapper type={type}>
        <div className={isOpen ? 'alert active' : 'alert'}>
          <div className="body">
            <div className="body-icon">
              <Icon icon={ICON[type].icon} size={ICON[type].size} />
            </div>
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
