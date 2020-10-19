import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import { Tooltip } from '~~elements/Tooltip';

const Div = styled.div`
    text-overflow: ellipsis;
    cursor: pointer;
    max-width: 55rem;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    padding: 0.2rem
    &:hover{
      text-decoration: underline;
    }
`;

const EnhanceTooltipComponent = styled(Tooltip)`
 &.cell-tooltip{
  opacity: 1;
  .cell-tooltip-inner {
    border-radius: 4px;
    padding: 1rem 1.5rem;
    min-width: 14rem;
    max-width: 20rem;
    border-radius: 4px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    color: black;
    text-align: left;
    &--closeBtn{
      width: 1.2rem;
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      cursor: pointer
    }
    &--label{
      line-height: 1.5rem;
    }
    &--content{
      line-height: 1.5rem;
      opacity: 0.7;
      word-break: break-word;
      margin: 0.5rem 0rem;
    }
  }
  .cell-tooltip-arrow {
    display: none;
  }
}
`;

const ClickTooltip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);
  const {
    value,
    children,
    placement,
    trigger,
    delay
  } = props;


  return  (
    <Fragment>
      <Div innerRef={tooltipRef} className="value-box" onClick={() => setTooltipOpen(true)} onKeyUp={() => {}}>
        {value}
      </Div>
      {value && tooltipRef.current &&
      <EnhanceTooltipComponent
        trigger={trigger}
        placement={placement}
        boundariesElement="window"
        isOpen={tooltipOpen}
        target={tooltipRef}
        toggle={() => { setTooltipOpen(!tooltipOpen); }}
        className="cell-tooltip"
        innerClassName="cell-tooltip-inner"
        arrowClassName="cell-tooltip-arrow"
        delay={delay}
        autohide={false}
      >
        <Icon
          icon="BtnReset2"
          className="cell-tooltip-inner--closeBtn"
          onClick={() => setTooltipOpen(false)}
        />
          {children}
      </EnhanceTooltipComponent>
    }
    </Fragment>
  );
};

ClickTooltip.defaultProps = {
  children: null,
  placement: 'bottom',
  trigger: 'click',
  delay: { show: 500, hide: 200 },
  color: 'white'
};


export default ClickTooltip;
