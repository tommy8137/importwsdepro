import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';
import StringInput from '~~features/Database/components/StringInput';


const getColumns = props => {
  const {
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'name',
      title: 'Name',
      width: '20%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: '25%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      render: (val, record) => (
        isEditMode ?
          <StringInput
            maxLength={400}
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'remark')}
          /> :
          val)
    },
    {
      title: date.last || '－',
      dataIndex: 'last',
      width: '15%',
      sorter: !isEditMode && date.lastId,
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: date.current || '－',
      dataIndex: 'current',
      width: '15%',
      sorter: !isEditMode && date.currentId,
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: date.next || '－',
      dataIndex: 'next',
      width: '15%',
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
