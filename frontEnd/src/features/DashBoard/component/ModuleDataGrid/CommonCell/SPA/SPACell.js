import React, { Fragment, useState, useEffect } from 'react';
import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import _get from 'lodash/get';
import uuid from 'uuid';


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
}
`;


function SPACell(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { value, cellInfo, helperInfo } = props;
  const tooltip = helperInfo.row['other_manufacture_info'];
  const mfs = JSON.parse(_get(tooltip, 'spa_manufacturer', '[]'));
  const pn = _get(tooltip, 'spa_partnumber', '');

  useEffect(() => {
    const scrollHandler = () => {
      setTooltipOpen(false);
    };
    window.addEventListener('scroll', scrollHandler, true);
    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);


  return (
    <Fragment>
      <div className="grid-cell" style={{ ...cellInfo.style, cursor: 'pointer' }} id={`spa-tooltip-id-${cellInfo.key}`}>
        {value}
      </div>
      <EnhanceTooltip
        boundariesElement="window"
        placement="bottom"
        isOpen={tooltipOpen}
        target={`spa-tooltip-id-${cellInfo.key}`}
        toggle={() => setTooltipOpen(!tooltipOpen)}
        // toggle={() => setTooltipOpen(true)}
        className="spa-tooltip"
        innerClassName="spa-tooltip-inner"
        arrowClassName="spa-tooltip-arrow"
        delay={{ show: 0, hide: 0 }}
      >
        <div className="content">
          <div className="item">
            <div className="title">Part Number: </div>
            <div className="content">{pn}</div>
          </div>
          <div className="item">
            <div className="title">Manufacturer: </div>
            <div className="content">{mfs.map(mf => <p>{mf}</p>)}</div>
          </div>
        </div>
      </EnhanceTooltip>
    </Fragment>
  );
}


export default SPACell;
