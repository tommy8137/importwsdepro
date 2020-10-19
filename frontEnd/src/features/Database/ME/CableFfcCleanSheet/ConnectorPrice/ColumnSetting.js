import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';

const getColumns = props => {
  const { isEditMode, date, handleOnEditItem } = props;
  return [
    {
      dataIndex: 'id',
      title: 'ID',
      width: '5%',
      align: 'center',
      render: (val, record, index) => index + 1,
    },
    {
      dataIndex: 'connectorName',
      title: 'vendorName',
      width: '18%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'vendorName',
      title: 'Connector Type',
      width: '18%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'vendorPN',
      title: 'Vendor',
      width: '15%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
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

export default getColumns;
