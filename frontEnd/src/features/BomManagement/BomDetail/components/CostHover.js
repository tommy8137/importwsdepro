import React, { Fragment, useState, useEffect } from 'react';
import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import _get from 'lodash/get';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';

const EnhanceTooltip = styled(Tooltip)`
&.spa-tooltip {
  opacity: 1;
  .spa-tooltip-inner {
    border-radius: 4px;
    padding: 1rem;
    max-width: none;
    min-width: 14.375rem;
    border-radius: 4px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    color: black;
    .content {
      .item {
        display: flex;
        font-size: 0.75rem;
        .title {
          width: 6rem;
          text-align: left;
          color: #9f9f9f;
        }
        .content {

        }
      }
    }
  }
  .spa-tooltip-arrow {
    display: none;
  }

  .title {
    text-align: left;
  }
}
`;


function CostHover(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { value, id, content, amount } = props;
  return (
    <Fragment>
      <div className="tooltip-container" id={`tooltip-${id}`}>
        {value}
      </div>
      <EnhanceTooltip
        boundariesElement="window"
        placement="bottom-start"
        isOpen={tooltipOpen}
        target={`tooltip-${id}`}
        toggle={() => setTooltipOpen(!tooltipOpen)}
        offset={250}
        className="spa-tooltip"
        innerClassName="spa-tooltip-inner"
        arrowClassName="spa-tooltip-arrow"
        delay={{ show: 0, hide: 0 }}
      >
        {/* <div className="title">Price</div>
        <div className="content">
          {
            R.keys(content).map(k => (
              <div className="item">
                <div className="title">{k.split('-')[0]}</div>
                <div className="content">{content[k]}</div>
              </div>
            ))
          }
        </div>
        <hr /> */}
        <div className="title">QTY</div>
        <div className="content">
          {
            R.keys(amount).map(k => (
              <div className="item">
                <div className="title">{k.split('-')[0]}</div>
                <div className="content">{amount[k]}</div>
              </div>
            ))
          }
        </div>
      </EnhanceTooltip>
    </Fragment>
  );
}

CostHover.defaultProps = {
  id: 123,
  content: {}
};


export default CostHover;
