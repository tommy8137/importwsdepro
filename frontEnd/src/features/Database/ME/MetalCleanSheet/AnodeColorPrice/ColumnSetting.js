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
      width: '10%',
      align: 'center',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: date.last || '－',
      width: '28%',
      align: 'center',
      children: [
        {
          dataIndex: 'last.price',
          title: 'USD/M²',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'last.lossRate',
          title: 'Lost Rate(%)',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
      ]
    },
    {
      dataIndex: date.current,
      title: date.current || '－',
      width: '28%',
      align: 'center',
      children: [
        {
          dataIndex: 'current.price',
          title: 'USD/M²',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.currentId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'current.lossRate',
          title: 'Lost Rate(%)',
          width: '14%',
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
      children: [
        {
          dataIndex: 'next.price',
          title: 'USD/M²',
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
          dataIndex: 'next.lossRate',
          title: 'Lost Rate(%)',
          width: '14%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.lossRate')}
              /> :
              comma(val, 8, '－')),
        },
      ]
    },
  ];
};

export default columns;
