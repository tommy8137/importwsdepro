import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import { Tooltip } from '~~elements/Tooltip';

const ValueBox = styled.div`
    text-overflow: ellipsis;
    max-width: 55rem;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    display: inline-block;
    cursor: ${props => (props.hasValue ? 'pointer' : 'normal')};
`;

const EnhanceTooltipComponent = styled(Tooltip)`
 &.cell-tooltip{
  opacity: 1;
  .cell-tooltip-inner {
    border-radius: 4px;
    padding: 0.5rem 2rem;
    max-width: 20rem;
    border-radius: 4px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    color: black;
    text-align: left;
    &--label{
      opacity: 0.7;
      line-height: 1.5rem;
    }
    &--content{
      line-height: 1.5rem;
      word-break: break-word;
    }
  }
  .cell-tooltip-arrow {
    display: none;
  }
}
`;

const HoverHintCell = (props) => {
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
      <ValueBox innerRef={tooltipRef} hasValue={value && value !== '−'}>
        {value}
      </ValueBox>
      {value && value !== '−' && tooltipRef.current &&
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
          {children}
      </EnhanceTooltipComponent>
    }
    </Fragment>
  );
};

HoverHintCell.defaultProps = {
  children: null,
  placement: 'bottom',
  trigger: 'hover',
  delay: { show: 500, hide: 200 },
  color: 'white'
};


export default HoverHintCell;
