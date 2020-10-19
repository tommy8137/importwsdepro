import React, { useState } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';

import { comma } from '~~utils/Math';
import Colors from '~~styles/_variables';
import Button, { BTN_COLOR } from '~~elements/Button';
import Select from '~~elements/Select';
import ModuleList from './ModuleList';
import BuList from './BuList';
import Type1List from './Type1List';

const SummarizeWrapper = styled.div`
background: ${Colors.WHITE};
width: calc((100% - 2.5rem) / 3);
display: flex;
flex-direction: column;
border-radius: 4px 4px 4px 4px;


/* block上面的色塊 */
.color-head {
  height: 5px;
  border-radius: 4px 4px 0 0;
  &.green {
    background-color:  ${Colors.GREEN};
  }
  &.blue {
    background-color: ${Colors.BLUE};
  }
  &.orange {
    background-color: ${Colors.ORANGE};
  }
}

.label {
  font-size: 0.875rem;
  color: ${Colors.MEDIUM};
}

`;

/* EE、ME、Others的上半部 價錢區塊 */
const UpperSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem 1.2rem;
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  font-size: 1.1rem;
  .text-roleType {
    font-family: Roboto;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0px;
    color: ${Colors.MAIN};
    height: 4.375rem;
    width: 100%;
    text-align: left;
    font-size: 1.6rem;
    font-weight: 600;
    padding-left: 0.9375rem;
    display: flex;
    align-items: center;
  }
  .filter {
    flex: 0 100%;
    max-width: 12rem;
  }
  .dollar-zone {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-size: 1rem;
    width: 100%;
    padding: 0 1rem;
    &-item {
      height: 4.9375rem;
      font-size: 1.25rem;
      padding: 1rem 0;
      min-width: 42.7%;
    }
    .total_suggestion {
      font-size: 1.3rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      /* max-width: 60%; */
    }
    .current {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 100%;
      &.warn {
        color: ${Colors.RED}
      }
      &.health {
        color: ${Colors.GREEN};
      }
    }
  }
`;

/* EE的切換按鈕 */
const SwitchSection = styled.div`
  font-size: 0.875rem;
  color: ${Colors.MAIN};
  transition: .3s ease all;
  padding: 0.875rem 1.875rem;
  .button {
    width: 4.75rem;
    /* height: 2rem; */
    &:first-of-type {
      margin-left: 1rem;
    }
    &:not(:first-of-type) {
      margin-left: 0.625rem;
    }
    &:not(:disabled):focus {
      box-shadow: none;
    }
    /* &.active {
      background: ${Colors.MAIN};
      color: ${Colors.WHITE};
      transition: .3s ease all;
    } */
  }
`;


const mapColor = (id) => {
  let color = 'black';
  switch (id) {
    case 'ME':
      color = 'blue';
      break;
    case 'EE':
      color = 'green';
      break;
    case 'Others':
      color = 'orange';
      break;
    default:
      break;
  }
  return color;
};

const List = (props) => {
  const {
    list,
    getModuleLists,
    paramsInfo,
    filterList,
    summarizeCondition,
  } = props;

  /**
   * 控制要從API給的資料拿哪個property、EE切換BU/Module
   */
  const [column, setColumn] = useState(list.id === 'EE' ? 'bu' : 'module');

  /**
   * 控制表頭
   */
  const listType = list.id === 'EE' ? column : 'type1';

  /**
   * 顯示的List
   */
  const ListComponent = {
    bu: BuList,
    module: ModuleList,
    type1: Type1List,
  }[listType];

  /**
   * 切換BU/Module的鈕
   */
  const canSwitch = list.id === 'EE';

  const optionType = canSwitch ? 'supplyType' : 'manufacturer';

  const handleOnClose = (values) => {
    props.onFilterClose({
      [optionType]: values,
    });
  };

  /**
   * 打開modal
   * @param {shape} row
   */
  const handleToggleModule = (row) => {
    const { module: moduleId } = row;
    const { edmVersion, meVersion, sku } = paramsInfo;
    getModuleLists({
      columnType: (moduleId === 'PCB' ? moduleId : list.id),
      meVersion,
      sku,
      edmVersion,
      moduleId: moduleId || '',
      listType, // bu | module | type1
    });
  };

  return (
    <SummarizeWrapper>
      <div className={`color-head ${mapColor(list.id)}`} />
      {/* EE / ME */}
      <UpperSection>
        <div className="text-roleType"> {list.id} </div>

        {list.id !== 'Others' &&
        <div className="filter">
          <Select
            options={filterList[optionType]}
            value={summarizeCondition[optionType]}
            target="box"
            isMulti
            onClose={handleOnClose}
            // onChange={values => console.log('on__change', values)}
          />
        </div>}
      </UpperSection>
      {/* 價格 */}
      <UpperSection>
        <div className="dollar-zone">
          {/* Total Current */}
          <div className="dollar-zone-item">
            <div className="label">Total Last (SAP)</div>
            <div
              className={`current ${list.total_last > list.total_suggestion ? 'warn' : ''} ${list.total_last < list.total_suggestion ? 'health' : ''}`}
            >
              ${list.total_last == null ? '-' : comma(list.total_last, 5)}
            </div>
          </div>
          {/* Total Suggestion */}
          <div className="dollar-zone-item">
            <div className="label">Total Suggestion</div>
            <div className="total_suggestion">${list.total_suggestion == null ? '-' : comma(list.total_suggestion, 5)}</div>
          </div>
        </div>
      </UpperSection>
      {canSwitch &&
      <SwitchSection>
        View by
        <Button
          color={BTN_COLOR.WHITE}
          inverse={column === 'bu'}
          width="4.75rem"
          round
          onClick={() => setColumn('bu')}
        >
          BU
        </Button>
        <Button
          color={BTN_COLOR.WHITE}
          inverse={column === 'module'}
          width="4.75rem"
          round
          onClick={() => setColumn('module')}
        >
          Module
        </Button>
      </SwitchSection>}
      {/* 資料列表 */}
      <ListComponent
        data={_get(list, column, [])}
        onClickRow={row => handleToggleModule(row)}
      />
    </SummarizeWrapper>
  );
};

export default List;
