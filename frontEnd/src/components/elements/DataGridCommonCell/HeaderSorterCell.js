import React, { useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';

import Icon from '~~elements/Icon';

const Div = styled.div`
  &.header-wrapper {
    display: flex;
    .header-wrapper__arrow.hidden {
      visibility: hidden;
    }
    &:hover {
      .header-wrapper__arrow.hidden {
        visibility: visible;
      }
    }
  }

`;


const Sorter = styled.div`
  &.header-sorter {
    width: 0.8rem;
    margin-left: 0.3rem;
    cursor: pointer;
  }
`;

function SorterComponent(props) {
  const { sortOrder, onSort } = props;
  switch (sortOrder) {
    case 'asc': {
      return (
        <Sorter className="header-sorter up" onClick={() => onSort('desc')}>
          <Icon icon="IconArrowUp" size="16px" />
        </Sorter>
      );
    }
    case 'desc': {
      return (
        <Sorter className="header-sorter down" onClick={() => onSort('asc')}>
          <Icon icon="IconArrowDown" size="16px" />
        </Sorter>
      );
    }
    default:
      return (
        <Sorter className="header-sorter up" onClick={() => onSort('asc')}>
          <Icon icon="IconArrowUp" size="16px" />
        </Sorter>
      );
  }
}


/*
Usage:
<HeaderSorterCell
  value={rows[rowIndex][Columns[columnIndex]['key']]}
  cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
/>

*/
function HeaderSorterCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    value,
    onClick,
    sortInfo,
    columnInfo
  } = props;

  // 尋找此key有沒有排序的設定
  let target = R.find(R.propEq('dataIndex', columnInfo.key))(sortInfo);
  let finalSortOrder = null;
  if (target) {
    finalSortOrder = target.sortOrder;
  }

  return (
    <div className="grid-cell" key={key} style={style} onClick={onClick} onKeyUp={() => { }}>
      <Div className="header-wrapper">
        <div className="header-wrapper__content">{value}</div>
        <div className={finalSortOrder === null ? 'header-wrapper__arrow hidden' : 'header-wrapper__arrow'}>
          <SorterComponent
            sortOrder={finalSortOrder}
            onSort={(newOrder) => {
              props.handleSort({
                sortOrder: newOrder,
                dataIndex: columnInfo.key
              });
            }}
          />
        </div>
      </Div>
    </div>
  );
}

HeaderSorterCell.defaultProps = {
  onClick: () => { },
};

export default HeaderSorterCell;
