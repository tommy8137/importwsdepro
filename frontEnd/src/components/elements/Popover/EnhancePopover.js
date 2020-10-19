import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import Popover from './Popover';

const PopoverStyle = styled(Popover)`
  border: none;
  box-shadow: none;
  padding: 0;
  background-color: transparent;
  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.6rem;
    cursor: pointer;
  }
  .popover-content {
    border: none;
    padding: 0.9375rem;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.5);
    background-color: #ffffff;
    border-radius: 0.225rem;
    min-width: none;
    font-size: 0.875rem;
    background-color: white;
    border-radius: 0.225rem;
    padding-right: ${({ closeBtn }) => (closeBtn ? '2rem' : '')};
  }
  /* arrow樣式 */
  &.bs-popover-left
  &.bs-popover-auto[x-placement^="left"] {
    .arrow::after {
      border-bottom-color: ${({ color }) => color};
    }
  }
  &.bs-popover-top
  &.bs-popover-auto[x-placement^="top"] {
    .arrow::after {
      border-bottom-color: ${({ color }) => color};
    }
  }
  &.bs-popover-bottom
  &.bs-popover-auto[x-placement^="bottom"] {
    .arrow::after {
      border-bottom-color: ${({ color }) => color};
    }
  }
  &.bs-popover-right
  &.bs-popover-auto[x-placement^="right"] {
    .arrow::after {
      border-bottom-color: ${({ color }) => color};
    }
  }
`;


class EnhancePopover extends React.Component {
  static defaultProps = {
    // boundariesElement window 用來防止tooltip爆掉
    boundariesElement: 'window',
    // tooltip 顯示位置
    placement: 'auto',
    // tigger方式, 預設為hover
    trigger: 'click',
    /** Ref | id */
    target: null,
    /** 是否有箭頭 true | false */
    hasArrow: true,
    /** 自訂tooltip的className */
    autohide: false,
    /** 是否隱藏arrow */
    hideArrow: false,
    // 自訂義的一些props
    /** 是否有close的btn */
    closeBtn: false,
    /** 當點擊關閉按鈕時 */
    onClickClose: () => { },
    /** 當點擊popover之外時 */
    onClickOutside: () => { }
  }

  constructor(props) {
    super(props);
    this.state = { tooltipOpen: false };
    this.popoverEl = React.createRef();
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickoutside);
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // 收集錯誤 Popover錯誤：  找不到target id
    // console.log(error, info);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickoutside);
  }
  /**
   * 當click tooltip以外的地方時, 把popover關掉
   */
  handleClickoutside = event => {
    // popover本身的div
    const popoverEl = this.popoverEl.current;
    if (popoverEl) {
      const node = event.target;
      const isClickInner = popoverEl.contains(node);
      if (!isClickInner) {
        this.props.onClickOutside();
        this.setState({ tooltipOpen: false }, () => { });
      }
    }
  }
  /**
   * toggle popover 時的callback事件
   */
  handleToggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }
  // handle close toggle tooltip
  handleClose = (e) => {
    e.stopPropagation();
    this.setState({ tooltipOpen: false });
    if (typeof (this.props.onClickClose) === 'function') {
      this.props.onClickClose();
    }
  }
  render() {
    const { tooltipOpen } = this.state;
    const { target, closeBtn = false, useContentStyle = true } = this.props;

    // popoverRef:popoverRef的innerRef跟styledComponent互相衝突，如果要拿到tooltip的ref, 可以用tooltipRef
    return target ? (
      <PopoverStyle
        popoverRef={this.popoverEl}
        boundariesElement="window"
        isOpen={tooltipOpen}
        toggle={this.handleToggle}
        target={target}
        trigger="click"
        {...this.props}
      >
        {
          closeBtn &&
          <div className="close-btn" onClick={this.handleClose} onKeyDown={() => { }}>
            <Icon icon="BtnCloseImage" size="1.2rem" />
          </div>
        }
        {
          useContentStyle ?
            <div className="popover-content" onClick={e => e.stopPropagation()} onKeyDown={() => { }}>
              {this.props.children}
            </div> :
            <Fragment>
              {this.props.children}
            </Fragment>
        }
      </PopoverStyle>
    ) : null;
  }
}


export default EnhancePopover;

