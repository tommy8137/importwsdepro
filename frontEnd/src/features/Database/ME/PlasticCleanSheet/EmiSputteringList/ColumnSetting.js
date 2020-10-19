import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';
import StringInput from '~~features/Database/components/StringInput';


const getColumns = props => {
  const {
    isEditMode,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      title: 'Label',
      dataIndex: 'label',
      width: '20%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '20%',
      sorter: !isEditMode,
      render: (val, record) => (
        isEditMode ?
          <NumberInput
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'value')}
          />  :
          comma(val, 8, '－'))
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: '35%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      render: (val, record) => (
        isEditMode ?
          <StringInput
            maxLength={400}
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'remark')}
          /> :
          val || '－')
    },
  ];
};

export default getColumns;
