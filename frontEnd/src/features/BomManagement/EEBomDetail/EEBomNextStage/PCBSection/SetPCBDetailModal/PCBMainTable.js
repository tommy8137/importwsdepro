import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '~~elements/Table';
import * as R from 'ramda';
import _find from 'lodash/find';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';
import Input from '~~features/BomManagement/EEBomDetail/component/Input/Input';
import { comma } from '~~utils/Math';
import HoverHintCell from './components/HoverHintCell';

const CustomWrap = styled.div`
  padding: 0rem 0rem 1rem;
  .icon{
    width: 1.5rem
  }

  .bold-border-right.bold-border-right{
    border-right: 1px solid #d8d8d8;
  }

  .bold-border-left.bold-border-left{
    border-left: 1px solid #d8d8d8;
  }
  .ant-table-tbody > tr > td {
    background: white;
    overflow: hidden;
    max-width: 0;
    text-overflow: ellipsis;
  }
  .ant-table-thead > tr > th {
    padding: 2px 8px;
  }
  .ant-table-tbody > tr > td {
    padding: 8px 8px;
}
`;

const SelectAllComponent = (props) => {
  const { isSelectAll, disabled, toggleSelectAll } = props;
  return (
    <Checkbox
      checked={isSelectAll && !disabled}
      disabled={disabled}
      onChange={toggleSelectAll}
    />
  );
};

function PCBMainTable(props) {
  const {
    onChange,
    data,
    boardType,
    isViewMode,
    delItems,
    setDelInfo,
  } = props;
  const [list, setList] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    setList(data);
    return () => setIsSelectAll(false);
  }, [JSON.stringify(data)]);

  function onCheckboxChange(item) {
    const temp = R.set(R.lensProp('is_count'), !item.is_count, item);
    onChange(temp);
  }

  function onQtyChange(val, item)  {
    const temp = R.set(R.lensProp('qty'), val, item);
    onChange(temp);
  }

  function onSourcerCostChange(val, item)  {
    const temp = R.set(R.lensProp('sourcer_cost'), val, item);
    onChange(temp);
  }

  function onCheckDelBox(id) {
    const items = delItems.map(item => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return { ...item };
    });
    setDelInfo(boardType, items);


    /* ***************************** 處理全選部分 ***************************** */
    // 目前是'全選'，但是user操作完已經不是全選
    if (isSelectAll) {
      if (!items.every(item => item.isChecked)) {
        setIsSelectAll(!isSelectAll);
      }
    }
    // 目前不是'全選'，但是user操作完是全選
    if (!isSelectAll) {
      if (items.every(item => item.isChecked)) {
        setIsSelectAll(!isSelectAll);
      }
    }
    /* ***************************** 處理全選部分 END ***************************** */
  }

  function handleSelectAll() {
    let temp;
    // 全選變成全不選
    if (isSelectAll) {
      temp = delItems.map(item => {
        return {
          ...item,
          isChecked: false
        };
      });
    } else {
      // 全不選變成全選
      temp = delItems.map(item => {
        return {
          ...item,
          isChecked: true
        };
      });
    }
    setIsSelectAll(!isSelectAll);
    setDelInfo(boardType, temp);
  }

  const columns = [
    {
      title: (
        <SelectAllComponent
          isSelectAll={isSelectAll}
          toggleSelectAll={handleSelectAll}
          disabled={list.length === 0 || isViewMode}
        />),
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      align: 'center',
      className: 'bold-border-right',
      width: 50,
      render: (val, record) => {
        const obj = _find(delItems, (item) => item.id === val);
        const checked = obj ? obj.isChecked : false;
        return (
          <Checkbox
            value={val}
            checked={checked}
            onChange={() => onCheckDelBox(val)}
            disabled={isViewMode}
          />
        );
      }
    },
    {
      title: 'Part Number',
      dataIndex: 'wistronpn',
      key: 'wistronpn',
      width: 140,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Dummy P/N',
      dataIndex: 'part_number',
      key: 'part_number',
      width: 140,
      render: (val) => (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 280,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'PCB No._Stage',
      dataIndex: 'PcbStageNo',
      key: 'PcbStageNo',
      width: 120,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Manufacturer',
      dataIndex: 'content.Price.manufacturer',
      key: 'content.Price.manufacturer',
      width: 120,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Supply Type',
      dataIndex: 'supply_type',
      key: 'supply_type',
      width: 60,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: '併板',
      dataIndex: 'content.Price.SPEC24',
      key: 'content.Price.SPEC24',
      width: 50,
      align: 'center',
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
      render: (val) =>  (val === 'null' || val === '' || val == null ?  '−' : val)
    },
    {
      title: 'Sourcer Cost (U/P)',
      dataIndex: 'sourcer_cost',
      key: 'sourcer_cost',
      width: 90,
      render: (val, record) => {
        return isViewMode ?
          <div>{val == null ? '−' : `$${comma(val)}`}</div> :
          (
            <Input
              type="number"
              value={val == null ? '' : val}
              onChange={value => onSourcerCostChange(value, record)}
              setCanSave={props.setCanSave}
              disabled={record.last_price}
              needFloat={true}
            />
          );
      }
    },
    {
      title: 'Price (L)(U/P)',
      dataIndex: 'lowest_last_price_info.unitPrice',
      key: 'lowest_last_price_info.unitPrice',
      width: 90,
      render: (val, record) => {
        const validate = record.lowest_last_price_info.validDate;
        return (
          <HoverHintCell value={val == null ? '−' : `$${comma(val)}`} >
            <div className="cell-tooltip-inner--label">Valid Date</div>
            <div className="cell-tooltip-inner--content">
              {validate}
            </div>
          </HoverHintCell>

        );
      }
    },
    {
      title: 'Price(H)(U/P)',
      dataIndex: 'highest_last_price_info.unitPrice',
      key: 'highest_last_price_info.unitPrice',
      width: 90,
      render: (val, record) => {
        const validate = record.highest_last_price_info.validDate;
        return (
          <HoverHintCell value={val == null ? '−' : `$${comma(val)}`} >
            <div className="cell-tooltip-inner--label">Valid Date</div>
            <div className="cell-tooltip-inner--content">
              {validate}
            </div>
          </HoverHintCell>

        );
      }
    },
    {
      title: 'Clean Sheet Cost (U/P)',
      dataIndex: 'clean_sheet_cost',
      key: 'clean_sheet_cost',
      width: 100,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'CE Cost (U/P)',
      dataIndex: 'ce_cost',
      key: 'ce_cost',
      width: 70,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'Suggestion Cost (U/P)',
      dataIndex: 'suggestion_cost',
      key: 'suggestion_cost',
      width: 90,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      width: 70,
      render: (val, record) => {
        return isViewMode ?
          val :
          (
            <Input
              type="number"
              value={val}
              onChange={value => onQtyChange(value, record)}
              setCanSave={props.setCanSave}
              needFloat={false}
            />
          );
      }
    },
    {
      title: 'Sub Total Price(L)',
      dataIndex: 'sub_total_lowest_last_price',
      key: 'sub_total_lowest_last_price',
      width: 90,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'Sub Total Price(H)',
      dataIndex: 'sub_total_highest_last_price',
      key: 'sub_total_highest_last_price',
      width: 90,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'Sub Total Suggestion Price',
      dataIndex: 'sub_total_suggestion_cost',
      key: 'sub_total_suggestion_cost',
      width: 130,
      render: (val) => <div>{val == null ? '−' : `$${comma(val)}`}</div>
    },
    {
      title: 'Count',
      dataIndex: 'is_count',
      key: 'is_count',
      fixed: 'right',
      align: 'center',
      className: 'bold-border-left',
      width: 'auto',
      render: (val, record) => {
        return (
          <GreenCircleCheckBox
            isCheck={val}
            handleClick={() => onCheckboxChange(record)}
            disabled={isViewMode}
          />
        );
      }
    },
    {
      title: 'Action',
      fixed: 'right',
      align: 'center',
      width: 'auto',
      render: (val, record) => {
        return (
          <Icon
            icon="BtnEditPCB"
            onClick={() =>  props.onEdit(record)}
          />
        );
      }
    },

  ];
  return (
    <CustomWrap>
      <Table
        headerColor="blue"
        rowKey="rowId"
        columns={columns}
        dataSource={list}
        scroll={{ x: 2120 }}
        pagination={false}
      />
    </CustomWrap>
  );
}
PCBMainTable.defaultProps = {
  setCanSave: () => { },
  onChange: () => { },
  onEdit: () => { },
  data: [],
};

export default PCBMainTable;
