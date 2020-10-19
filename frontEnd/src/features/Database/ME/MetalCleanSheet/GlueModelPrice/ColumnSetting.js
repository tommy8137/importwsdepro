import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const columns = props => {
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
      dataIndex: 'glueType',
      title: '膠水種類',
      width: '35%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'density',
      title: 'Density\n(g/cm³)',
      width: '15%',
      sorter: !isEditMode,
      render: (val, record) => (
        isEditMode ?
          <NumberInput
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'density')}
          /> :
          comma(val, 8, '－'))
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
          /> :
          comma(val, 8, '－'))
    },
  ];
};

export default columns;
