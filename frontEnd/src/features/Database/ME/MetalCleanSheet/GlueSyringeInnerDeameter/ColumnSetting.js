import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getColumns = props => {
  const {
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  } = props;
  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'syringeName',
      title: '針筒內徑',
      width: '45%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
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
      sorter: !isEditMode && date.next,
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
