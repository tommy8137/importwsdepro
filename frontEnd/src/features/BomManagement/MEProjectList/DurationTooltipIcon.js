import React, { Fragment, useState, useEffect } from 'react';

import { Tooltip } from 'reactstrap';
import styled from 'styled-components';

import Icon from '~~elements/Icon';

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
      color: #999999;
    }

    .content {
      color: #333333;
      margin-top: 0.5rem;
      word-wrap: break-word;
      word-break:break-all;
    }
  }
}
`;


function DurationTooltipIcon(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { id, duration, row } = props;

  useEffect(() => {
    const scrollHandler = () => {
      setTooltipOpen(false);
    };
    window.addEventListener('scroll', scrollHandler, true);
    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);

  // 最多只取三筆
  function getDurationList() {
    if (!Array.isArray(duration)) {
      return [];
    }
    let versionRegex = /^V\d+\.0$/g;
    let finalDuration = duration.filter(item => {
      if (item.version_name === 'V0.0') {
        return true;
      }
      return !versionRegex.test(item.version_name);
    });
    return finalDuration.slice(0, 3);
  }

  return (
    <Div>
      <div id={`duration-hint-${id}`}>
        <Icon
          icon="BtnDiration"
          onClick={e => {
            e.stopPropagation();
            console.log('you click');
          }}
        />
      </div>
      <EnhanceTooltip
        boundariesElement="window"
        trigger="click"
        placement="bottom"
        isOpen={tooltipOpen}
        target={`duration-hint-${id}`}
        // toggle={() => {
        //   setTooltipOpen(!tooltipOpen);
        // }}
        toggle={() => setTooltipOpen(true)}
        className="base-hint-cell-tooltip"
        innerClassName="base-hint-cell-tooltip-inner"
        arrowClassName="base-hint-cell-tooltip-arrow"
        delay={{ show: 0, hide: 0 }}
      // autohide={false}
      >
        <div className="hint-wrapper">
          <div className="title">Duration for past three versions</div>
          <div
            className="cross"
            onClick={() => setTooltipOpen(false)}
            onKeyPress={null}
          />
          <div className="content">
            {getDurationList().map((item, idx) => {
              return (<div key={idx}>{item.version_name} &nbsp;&nbsp; lasting for &nbsp;&nbsp; {item.timeDiff}</div>);
            })}
          </div>
        </div>
      </EnhanceTooltip>
    </Div>
  );
}

DurationTooltipIcon.defaultProps = {
  onClick: () => { },
};


export default DurationTooltipIcon;
