import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ResetBtn, DownBtn, UpBtn } from './Btns';

const OutBox = styled.div`
  border: 1px solid #999999;
  /* height: 4.5rem; */
  height: 2.5rem;
  width: 31rem;
  border-radius: .25rem;
  border: solid 0.5px #cccccc;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: flex-start;
  opacity:${props => (props.disabled ? '0.8' : '1')};
  pointer-events:${props => (props.disabled ? 'none' : '')};
  cursor:${props => (props.disabled ? 'not-allowed' : '')};
  .dropdown-wrap {
    display: flex;
    width: 100%;
    flex: 0 100%;
    height: 100%;
  }
  .reset {
    margin: 0px .5rem;
    display: flex;
    align-items: center;
  }
  .dropdown {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: stretch;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 0.8rem);
    height: 100%;
    cursor:${props => (props.disabled ? 'not-allowed' : '')};
    &:not(:last-child)::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 70%;
      border: 0.5px solid #ccc;
      position: absolute;
      right: 0px;
    }
  }
`;

const FunctionBtnBox = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 3.5rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
  overflow: hidden;
  transition: 0.3s ease all;
  .icon {
    width: 1.8rem;
  }
`;

export default class Dropdown extends Component {
  static propTypes = {
    /** 要不要顯示reset的鈕: true | false */
    resetBtn: PropTypes.bool,
    disabled: PropTypes.bool,
    /** 可能是搜尋或是其他奇怪的按鈕，黑底的功能鈕: 建議放Icon的comonent */
    functionBtn: PropTypes.node,
    /** 奇怪按鈕的function */
    onClickFunction: PropTypes.func,
    /** 放<Dropdown /> 可以隨意放幾個都可以 */
    children: PropTypes.node,
    /** 全部清空的function */
    onClickReset: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    resetBtn: false,
    children: null,
    functionBtn: null,
    onClickFunction: () => { },
    onClickReset: () => { },
  }


  render() {
    const { children, resetBtn, functionBtn, onClickFunction, onClickReset, disabled } = this.props;
    return (
      <OutBox className={functionBtn ? 'has-btn' : ''} disabled={disabled}>
        <div className="dropdown-wrap">
          {children}
        </div>
        {/* 預留給清除的按鈕... */}
        {resetBtn &&
          <div className="reset">
            <ResetBtn onClick={onClickReset} />
          </div>}
        {functionBtn &&
          <FunctionBtnBox onClick={onClickFunction}>
            {functionBtn}
          </FunctionBtnBox>}
      </OutBox>
    );
  }
}
