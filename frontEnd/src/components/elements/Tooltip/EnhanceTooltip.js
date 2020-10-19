import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import Tooltip from './Tooltip';


const TooltipStyle = styled(Tooltip)`
  .base-tooltip-inner {
    border: none;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    .tooltip-content {
      display: block;
      overflow: hidden;
      overflow-y: auto;
      position: relative;
      text-align: left;
      max-height: 7.8125rem;;
      max-width: 15.625rem;
      box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.5);
      background-color: #ffffff;
      font-size: 0.875rem;
      background-color: ${({ color }) => color};
      color: ${({ color }) => `${color === 'black' ? 'white' : 'black'}`};
      padding: ${({ color }) => `${color === 'black' ? '0.3125rem 0.65625rem' : '0.9375rem'}`};
      border-radius: ${({ color }) => `${color === 'black' ? '0' : '0.225rem'}`};
      p {
        margin-bottom: 0;
      }
      .close {
        position: absolute;
        right: 0rem;
        top: 0rem;
        width: 1rem;
        cursor: pointer;
        .icon {
          display: block;
          width: 100%;
        }
      }
    }
  }
  &.bs-tooltip-bottom  .arrow:before{
    border-bottom-color: ${({ color }) => color};
  }
  &.bs-tooltip-top .arrow:before{
    border-top-color: ${({ color }) => color};
  }
  &.bs-tooltip-right .arrow:before{
    border-right-color: ${({ color }) => color};
  }
  &.bs-tooltip-left .arrow:before{
    border-left-color: ${({ color }) => color};
  }
`;

class EnhanceTooltip extends React.Component {
  static defaultProps = {
    // boundariesElement window 用來防止tooltip爆掉
    boundariesElement: 'window',
    // tooltip 顯示位置
    placement: 'auto',
    // tigger方式, 預設為hover
    trigger: 'hover',
    /** Ref | id */
    target: null,
    /** 自訂tooltip的className */
    className: 'base-tooltip',
    innerClassName: 'base-tooltip-inner',
    arrowClassName: 'base-tooltip-arrow',
    delay: { show: 500, hide: 200 },
    autohide: false,
    /** 是否隱藏arrow */
    hideArrow: false,
    // 自訂義的一些props
    /** 當點擊關閉按鈕時 */
    onClickClose: () => { },
    /** black | white */
    color: 'white',
  }
  constructor(props) {
    super(props);
    this.state = { tooltipOpen: false };
    this.tooltipEl = React.createRef();
  }
  // handle toggle tooltip
  handleToggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }
  // handle close toggle tooltip
  handleClose = () => {
    this.setState({ tooltipOpen: false });
    if (typeof (this.props.onClickClose) === 'function') {
      this.props.onClickClose();
    }
  }
  render() {
    const { tooltipOpen } = this.state;
    const { target, closeBtn } = this.props;

    return target ? (
      <TooltipStyle
        tooltipRef={this.tooltipEl}
        isOpen={tooltipOpen}
        toggle={this.handleToggle}
        {...this.props}
      >
        <div
          className="tooltip-content"
        >
          {this.props.children}
        </div>
      </TooltipStyle>
    ) :
      (null);
  }
}

export default EnhanceTooltip;

