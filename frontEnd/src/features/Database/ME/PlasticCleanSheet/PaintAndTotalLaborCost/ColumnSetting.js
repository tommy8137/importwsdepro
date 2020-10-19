import React, { Fragment } from 'react';
import { comma, round } from '~~utils/Math';
import StringInput from '~~features/Database/components/StringInput';
import NumberInput from '~~features/Database/components/NumberInput';
import _get from 'lodash/get';

const columns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    checkboxColumn,
    hourList,
    idColumn
  } = props;


  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'name',
      title: '項目',
      width: '20%',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: date.last || '－',
      width: '20%',
      children: [
        {
          dataIndex: 'last',
          title: '人數',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'lastTotalPrice',
          title: '總人工費用',
          render(val, record) {
            const columnKey = 'last';
            const manCount = _get(record, [columnKey], 0); // 人數
            const manHour = _get(hourList, [columnKey, 'manHour'], 0); // 工時
            const price = _get(hourList, [columnKey, 'price'], 0); // USD/min
            // 公式： USD/min * 60 * 工時 ＊人數
            const total = price * 60 * manHour * manCount;
            return comma(total, 8, '－');
          }
        },
      ]
    },
    {
      dataIndex: date.current,
      title: date.current || '－',
      width: '20%',
      children: [
        {
          dataIndex: 'current',
          title: '人數',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'currentTotalPrice',
          title: '總人工費用',
          render(val, record) {
            const columnKey = 'current';
            const manCount = _get(record, [columnKey], 0); // 人數
            const manHour = _get(hourList, [columnKey, 'manHour'], 0); // 工時
            const price = _get(hourList, [columnKey, 'price'], 0); // USD/min
            // 公式： USD/min * 60 * 工時 ＊人數
            const total = price * 60 * manHour * manCount;
            return comma(total, 8, '－');
          }
        },
      ]
    },
    {
      dataIndex: date.next,
      title: date.next || '－',
      width: '20%',
      children: [
        {
          dataIndex: 'next',
          title: '人數',
          sorter: !isEditMode && date.nextId,
          render(val, record) {
            return (isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next')}
              /> : comma(val, 8, '－'));
          }
        },
        {
          dataIndex: 'nextTotalPrice',
          title: '總人工費用',
          render(val, record) {
            const columnKey = 'next';
            const manCount = _get(record, [columnKey], 0); // 人數
            const manHour = _get(hourList, [columnKey, 'manHour'], 0); // 工時
            const price = _get(hourList, [columnKey, 'price'], 0); // USD/min
            // 公式： USD/min * 60 * 工時 ＊人數
            const total = price * 60 * manHour * manCount;
            return comma(total, 8, '－');
          }
        },
      ]
    },
  ];
};

export default columns;
