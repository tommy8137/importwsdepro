import React, { Fragment, useState, useEffect } from 'react';
import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import _get from 'lodash/get';

const Div = styled.div`
  .grid-cell-value {
    cursor: pointer;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const EnhanceTooltip = styled(Tooltip)`
&.base-hint-cell-tooltip {
  opacity: 1;
  .base-hint-cell-tooltip-inner {
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
  .base-hint-cell-tooltip-arrow {
    display: none;
  }

  .hint-wrapper {
    font-size: 0.875rem;
    width: 16.6875rem;
    text-align: left;
    .cross {
        background: #E9E9E9;
        position: absolute;
        right: 1rem;
        top: 1rem;
        border-radius: 100%;
        height: 20px;
        width: 20px;
        cursor: pointer;
        &:after {
          content: "";
          display: block;
          height: 0;
          left: 4px;
          top: 10px;
          width: 12px;
          transform: rotate(45deg);
          position: absolute;
          background: #939393;
          border: 0.5px solid #939393;
        }
        &:before {
          content: "";
          display: block;
          height: 0;
          left: 4px;
          top: 10px;
          width: 12px;
          transform: rotate(-45deg);
          background: #939393;
          border: 0.5px solid #939393;
          position: absolute;
        }
    }

    .title {
      font-weight: 500;
      color: #333333;
    }

    .content {
      word-wrap: break-word;
      word-break: break-all;
      font-size: 0.875rem;
      .title {
        width: 4.75rem;
        color: #808080;
        display: inline-block;
      }
      .price {
        width: 4.75rem;
        color: #333333;
        display: inline-block;
      }
    }
  }
}
`;


function BaseCellWithTooltip(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { value, cellInfo, label, helperInfo, ...restProps } = props;

  useEffect(() => {
    const scrollHandler = () => {
      setTooltipOpen(false);
    };
    window.addEventListener('scroll', scrollHandler, true);
    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);

  if (value === null || value === '') {
    return (
      <div>
        <div
          className="grid-cell"
          style={{ ...cellInfo.style }}
        >
          <div className="grid-cell-value">{value}</div>
        </div>
      </div>
    );
  }
  return (
    <Div {...restProps}>
      <div
        className="grid-cell"
        style={{ ...cellInfo.style }}
        id={`base-hint-cell-tooltip-id-${cellInfo.key}`}
      >
        <div className="grid-cell-value">{value}</div>
      </div>
      <EnhanceTooltip
        boundariesElement="window"
        trigger="click"
        placement="bottom"
        isOpen={tooltipOpen}
        target={`base-hint-cell-tooltip-id-${cellInfo.key}`}
        toggle={(e) => {
          e.stopPropagation();
          setTooltipOpen(!tooltipOpen);
        }}
        // toggle={() => setTooltipOpen(true)}
        className="base-hint-cell-tooltip"
        innerClassName="base-hint-cell-tooltip-inner"
        arrowClassName="base-hint-cell-tooltip-arrow"
        delay={{ show: 0, hide: 0 }}
      // autohide={false}
      >
        <div className="hint-wrapper">
          <div className="title">{label}</div>
          <div
            className="cross"
            onClick={() => setTooltipOpen(false)}
            onKeyPress={null}
          />
          <div className="content">
            <div>
              <div className="title">SPA Cost</div>
              {/* <div className="price">還沒有值</div> */}
            </div>
            <div>
              <div className="title">料號</div>
              {/* <div className="price">還沒有值</div> */}
            </div>
          </div>
        </div>
      </EnhanceTooltip>
    </Div>
  );
}


export default BaseCellWithTooltip;
