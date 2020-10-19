import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getColumns = props => {
  const {
    isEditMode,
    date,
    handleOnEditItem,
    idColumn
  } = props;
  return [
    idColumn,
    {
      dataIndex: 'category',
      title: 'Cat.',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'spec',
      title: 'Spec',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'pitch',
      title: 'Pitch',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'row',
      title: 'Row',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'pin',
      title: 'Pin',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'vendor',
      title: 'Vendor',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'partNumber',
      title: 'P/N',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      title: date.last || '－',
      dataIndex: 'last',
      width: '10%',
      sorter: !isEditMode && date.lastId,
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: date.current || '－',
      dataIndex: 'current',
      width: '10%',
      sorter: !isEditMode && date.currentId,
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: date.next || '－',
      dataIndex: 'next',
      width: '10%',
      sorter: !isEditMode && date.nextId,
      render: (val, record) => (
        isEditMode ?
          <NumberInput
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'next')}
          />  :
          comma(val, 8, '－'))
    },
  ];
};

export default getColumns;
