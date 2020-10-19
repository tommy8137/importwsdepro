import React from 'react';
import Field from '~~elements/Field';
import StringInput from '~~features/Database/components/StringInput';

const columns = (props) => {
  const {
    editMode,
    handleOnEditItem
  } = props;
  return (
    [
      {
        title: 'Site Name',
        dataIndex: 'site_name',
        defaultSortOrder: 'ascend',
        sorter: !editMode,
        width: '50%',
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        sorter: !editMode,
        width: '50%',
        render: (val, record) => (editMode ?
          <StringInput
            maxLength={400}
            value={val}
            onChange={(value) => handleOnEditItem(value, record, 'remark')}
          /> :
          val)
      },
    ]
  );
};

export default columns;
