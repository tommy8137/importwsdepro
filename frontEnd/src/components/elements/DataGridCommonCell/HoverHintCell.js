import React, { Fragment, useState, useEffect } from 'react';

import { Tooltip } from 'reactstrap';
import styled from 'styled-components';

import ErrorBoundary from '~~elements/ErrorBoundary';


const EnhanceTooltip = styled(Tooltip)`
&.cell-tooltip {
  opacity: 1;
  .cell-tooltip-inner {
    border-radius: 4px;
    padding: 1rem;
    max-width: none;
    min-width: 11.25rem;
    border-radius: 4px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    color: black;
    .tooltip-content {
      font-size: 0.875rem;
    }
  }
  .cell-tooltip-arrow {
    display: none;
  }
}
`;


function HoverHintCell(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { value, cellInfo, helperInfo, tooltipRender, onClick } = props;
  useEffect(() => {
    const scrollHandler = () => {
      setTooltipOpen(false);
    };
    window.addEventListener('scroll', scrollHandler, true);
    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);
  // console.log('>>>>>>>>>>>>>>', cellInfo, cellInfo.rowIndex, tooltipOpen, `cell-tooltip-id-${cellInfo.key}`);

  return (
    <ErrorBoundary>
      <div className="grid-cell" style={{ ...cellInfo.style, cursor: 'pointer' }} id={`cell-tooltip-id-${cellInfo.key}`} onClick={onClick} onKeyUp={() => { }}>
        {value}
      </div>
      {value ?
        (
          <EnhanceTooltip
            boundariesElement="window"
            placement="bottom"
            isOpen={tooltipOpen}
            target={`cell-tooltip-id-${cellInfo.key}`}
            toggle={() => setTooltipOpen(!tooltipOpen)}
            className="cell-tooltip"
            innerClassName="cell-tooltip-inner"
            arrowClassName="cell-tooltip-arrow"
            delay={{ show: 0, hide: 0 }}
          >
            <div className="tooltip-content">
              {tooltipRender()}
            </div>
          </EnhanceTooltip>) : null}
    </ErrorBoundary>
  );
}

HoverHintCell.defaultProps = {
  onClick: () => { },
};

export default HoverHintCell;
