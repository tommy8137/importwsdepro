import React from 'react';
import _get from 'lodash/get';
import NumberInput from '~~features/Database/components/NumberInput';
import { comma } from '~~utils/Math';


const left = (props) => {
  const {
    isEditMode,
    selectedColumn,
  } = props;

  return [
    {
      dataIndex: 'type',
      title: '類型',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
      width: '90%',
    },
    selectedColumn
  ];
};


const right = (props) => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
  } = props;

  return [
    {
      dataIndex: 'type',
      title: 'Connector Type',
      width: 200,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: 'vendorPN',
      title: 'Vendor PN',
      width: 200,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: _get(date, 'last', '－'),
      align: 'center',
      children: [
        {
          dataIndex: 'last.price',
          title: '單價',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'lastId', false),
          render: (val) => comma(val, 8, '－'),
        },
        {
          dataIndex: 'last.processTime',
          title: '工時',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'lastId', false),
          render: (val) => comma(val, 8, '－'),
        },
      ]
    },
    {
      dataIndex: date.current,
      title: _get(date, 'current', '－'),
      align: 'center',
      children: [
        {
          dataIndex: 'current.price',
          title: '單價',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'currentId', false),
          render: (val) => comma(val, 8, '－'),
        },
        {
          dataIndex: 'current.processTime',
          title: '工時',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'currentId', false),
          render: (val) => comma(val, 8, '－'),
        },
      ]
    },
    {
      dataIndex: date.next,
      title: _get(date, 'next', '－'),
      align: 'center',
      children: [
        {
          dataIndex: 'next.price',
          title: '單價',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'nextId', false),
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.price')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.processTime',
          title: '工時',
          width: 120,
          align: 'center',
          sorter: !isEditMode && _get(date, 'nextId', false),
          render: (val, record) => (
            isEditMode ?
              <NumberInput
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.processTime')}
              /> :
              comma(val, 8, '－')),
        },
      ]
    },
  ];
};

export default {
  left,
  right,
};
