import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const columns = props => {
  const {
    isEditMode,
    checkboxColumn,
    date,
    handleOnEditItem,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'item',
      title: '項目',
      align: 'center',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: date.last || '－',
      width: '27%',
      align: 'center',
      children: [
        {
          dataIndex: 'last.unitPrice',
          title: 'Unit Price',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'last.cycleTime',
          title: 'Cycle Time',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'last.usageAmount',
          title: 'Usage Amount',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
      ]
    },
    {
      dataIndex: date.current,
      title: date.current || '－',
      width: '27%',
      align: 'center',
      children: [
        {
          dataIndex: 'current.unitPrice',
          title: 'Unit Price',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'current.cycleTime',
          title: 'Cycle Time',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'current.usageAmount',
          title: 'Usage Amount',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－')
        },
      ]
    },
    {
      dataIndex: date.next,
      title: date.next || '－',
      align: 'center',
      width: '27%',
      children: [
        {
          dataIndex: 'next.unitPrice',
          title: 'Unit Price',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.unitPrice')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.cycleTime',
          title: 'Cycle Time',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.cycleTime')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.usageAmount',
          title: 'Usage Amount',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.usageAmount')}
              /> :
              comma(val, 8, '－')),
        },
      ]
    },
  ];
};

export default columns;
