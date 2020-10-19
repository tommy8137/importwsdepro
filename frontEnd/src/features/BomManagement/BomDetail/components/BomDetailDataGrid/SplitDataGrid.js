import React, { useState, useEffect, useRef } from 'react';
import { ScrollSync } from 'react-virtualized';
import styled from 'styled-components';
import _findIndex from 'lodash/findIndex';
import useComponentSize from '~~hooks/useComponentSize';
import DataGrid from './DataGrid';

const GridBox = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: nowrap;
    .grid-single {
      width: 100%;
    }
    .grid-double:last-of-type {
      border-left: 2px solid #7c90a9;
      width: 100%;
      margin-left: 1px;
    }

  }
`;

function SplitDataGrid(props) {
  const { columns } = props;
  const [isSpliting, setIsSpliting] = useState(false);
  const [splitId, setSplitId] = useState(false);
  const [splitKey, setSplitKey] = useState(null);
  const gridBox1 = useRef(null);
  const [dgUuid, setDgUuid] = useState(Math.random());

  useEffect(() => {
    const id = splitKey ? _findIndex(columns, { key: splitKey }) : -1;
    const splited = id >= 0;
    setIsSpliting(splited);
    setSplitId(id);
    const uuid = Math.random();
    setDgUuid(uuid);
  }, [splitKey]);

  function handleClickSplit(key, split) {
    if (split) {
      setSplitKey(key);
    } else {
      setSplitKey(null);
    }
  }

  const leftColumns = isSpliting ? columns.filter((d, idx) => idx <= splitId) : columns;
  const rightColumns = isSpliting ? columns.filter((d, idx) => idx > splitId) : [];
  const [size] = useComponentSize(gridBox1);
  const limitWidth = size.width * 0.5;
  const leftDefaultWidth = leftColumns.reduce((prev, current) => prev + current.width + current.paddingLeft + current.paddingRight, 0);
  const leftWidth = isSpliting && leftDefaultWidth > limitWidth ? limitWidth : leftDefaultWidth;
  return (
    <GridBox>
      <ScrollSync>
        {
          ({
            onScroll,
            scrollTop,
          }) => (
            <div className="wrapper" ref={gridBox1}>
              <div className={!isSpliting ? 'grid-single' : 'grid-double'} style={{ width: `${leftWidth}px` }}>
                <DataGrid
                  {...props}
                  onScroll={onScroll}
                  scrollTop={scrollTop}
                  withSplit={true}
                  isSpliting={isSpliting}
                  onClickSplit={handleClickSplit}
                  columns={leftColumns}
                  width={leftWidth}
                />
              </div>
              {isSpliting &&
              <div key={dgUuid} className={!isSpliting ? 'grid-single' : 'grid-double'} style={{ width: `calc(100% - ${leftWidth}px - 2px)` }}>
                <DataGrid
                  {...props}
                  onScroll={onScroll}
                  scrollTop={scrollTop}
                  withSplit={true}
                  isSpliting={isSpliting}
                  onClickSplit={handleClickSplit}
                  columns={rightColumns}
                  width={size.width - leftWidth}
                />
              </div>}
            </div>)
        }
      </ScrollSync>
    </GridBox>
  );
}

export default SplitDataGrid;
