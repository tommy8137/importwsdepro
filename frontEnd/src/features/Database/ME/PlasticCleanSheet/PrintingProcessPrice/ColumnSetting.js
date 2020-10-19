import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getcolumns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    idColumn,
  } = props;

  return [
    idColumn,
    {
      dataIndex: 'name',
      title: 'Name',
      width: '20%',
      align: 'center',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
      render: (val) => val ||  '－',
    },
    {
      dataIndex: 'last',
      title: date.last || '－',
      width: '20%',
      align: 'center',
      render: (val) => comma(val, 8, '－')
    },
    {
      dataIndex: 'current',
      title: date.current || '－',
      width: '20%',
      align: 'center',
      render: (val) => comma(val, 8, '－')
    },
    {
      dataIndex: 'next',
      title: date.next || '－',
      width: '20%',
      align: 'center',
      render: (val, record) => (
        isEditMode ?
          <NumberInput
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'next')}
          /> :
          comma(val, 8, '－')
      ),
    },
  ];
};

export default getcolumns;
