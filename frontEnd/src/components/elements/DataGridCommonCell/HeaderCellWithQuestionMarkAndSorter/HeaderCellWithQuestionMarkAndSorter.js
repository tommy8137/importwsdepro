import React, { useRef } from 'react';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';
import * as R from 'ramda';

import Icon from '~~elements/Icon';
import IconCircle from './IconCircle';

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

function HeaderCellWithQuestionMarkAndSorter(props) {
  const {
    value,
    sortInfo,
    columnInfo,
    tooltip,
    handleSort
  } = props;

  // 尋找此key有沒有排序的設定
  let target = R.find(R.propEq('dataIndex', columnInfo.key))(sortInfo);
  let finalSortOrder = null;
  if (target) {
    finalSortOrder = target.sortOrder;
  }
  const iconEl = useRef(null);

  return (
    <Div className="header-wrapper">
      <div className="header-wrapper__content">
        {value}&nbsp;&nbsp;
        <IconCircle innerRef={iconEl}>&#63;</IconCircle>
        <EnhanceTooltip
          target={iconEl}
        >
          {tooltip}
        </EnhanceTooltip>
      </div>
      <div className={finalSortOrder === null ? 'header-wrapper__arrow hidden' : 'header-wrapper__arrow'}>
        <SorterComponent
          sortOrder={finalSortOrder}
          onSort={(newOrder) => {
            handleSort({
              sortOrder: newOrder,
              dataIndex: columnInfo.key
            });
          }}
        />
      </div>
    </Div>
  );
}

export default HeaderCellWithQuestionMarkAndSorter;
