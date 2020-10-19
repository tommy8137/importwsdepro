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
      dataIndex: 'item',
      title: '項目',
      width: '35%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'unit',
      title: '單位',
      width: '15%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      render: (val) => val || '－',
    },
    {
      title: _get(date, 'last', '－'),
      dataIndex: 'last',
      width: '16%',
      sorter: !isEditMode && _get(date, 'lastId', false),
      render: (val) => comma(val, 8, '－')
    },
    {
      title: _get(date, 'current', '－'),
      dataIndex: 'current',
      width: '16%',
      sorter: !isEditMode && _get(date, 'currentId', false),
      render: (val) => comma(val, 8, '－')
    },
    {
      title: _get(date, 'next', '－'),
      dataIndex: 'next',
      width: '16%',
      sorter: !isEditMode && _get(date, 'nextId', false),
      render: (val, record) => (isEditMode && _get(date, 'nextId', false) ?
        <NumberInput
          value={val}
          onChange={(value) => handleOnEditItem(value, record.id, 'next')}
        />  :
        comma(val, 8, '－')),
    },
  ];
};

export default {
  left,
  right,
};
