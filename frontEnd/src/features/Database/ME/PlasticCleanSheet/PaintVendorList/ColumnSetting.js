import React from 'react';
import StringInput from '~~features/Database/components/StringInput';

const columns = props => {
  const {
    isEditMode,
    handleOnEditItem,
  } = props;

  return [
    {
      dataIndex: 'name',
      title: 'Name',
      width: '45%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: '50%',
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
  ];
};

export default columns;
