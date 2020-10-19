import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getcolumns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
  } = props;

  return [
    {
      dataIndex: 'name',
      title: '項目',
      width: '10%',
      align: 'center',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: date.last || '－',
      align: 'center',
      children: [
        {
          dataIndex: 'last.price',
          title: 'USD/min',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－'),
        },
        {
          dataIndex: 'last.manHour',
          title: '工時',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－'),
        },
      ]
    },
    {
      dataIndex: date.current,
      title: date.current || '－',
      align: 'center',
      children: [
        {
          dataIndex: 'current.price',
          title: 'USD/min',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－'),
        },
        {
          dataIndex: 'current.manHour',
          title: '工時',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－'),
        },
      ]
    },
    {
      dataIndex: date.next,
      title: date.next || '－',
      align: 'center',
      children: [
        {
          dataIndex: 'next.price',
          title: 'USD/min',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.price')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.manHour',
          title: '工時',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.manHour')}
              /> :
              comma(val, 8, '－')),
        },
      ]
    },
  ];
};

export default getcolumns;
