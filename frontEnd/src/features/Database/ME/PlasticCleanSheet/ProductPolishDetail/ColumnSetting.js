import React, { Fragment } from 'react';
import { comma, round } from '~~utils/Math';
import StringInput from '~~features/Database/components/StringInput';
import NumberInput from '~~features/Database/components/NumberInput';

const columns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    checkboxColumn,
    idColumn,
  } = props;


  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'item',
      title: '產品類別',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: 'remark',
      title: '備註',
      sorter: !isEditMode,
      render: (val, record, index) => {
        return isEditMode ?
          <StringInput
            maxLength={400}
            onChange={(value) => handleOnEditItem(value, record.id, 'remark')}
            value={val}
          /> : val;
      }
    },
    {
      dataIndex: 'last',
      title: date.last || '－',
      sorter: !isEditMode,
      render: (val) => comma(val, 8, '－')
    },
    {
      dataIndex: 'current',
      title: date.current || '-',
      sorter: !isEditMode,
      render: (val) => comma(val, 8, '－')
    },
    {
      dataIndex: 'next',
      title: date.next || '－',
      sorter: !isEditMode,
      render: (val, record, index) => {
        return isEditMode ?
          <NumberInput
            onChange={(value) => handleOnEditItem(value, record.id, 'next')}
            value={val}
          /> : comma(val, 8, '－');
      }
    },
  ];
};

export default columns;
