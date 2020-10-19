import React from 'react';
import _get from 'lodash/get';
import NumberInput from '~~features/Database/components/NumberInput';
import { comma } from '~~utils/Math';


const Columns = (isEditMode, handleDataChange, date) => {
  return (
    [
      {
        title: '項目',
        dataIndex: 'item',
        defaultSortOrder: 'ascend',
        sorter: !isEditMode,
      },
      {
        title: 'Unit',
        dataIndex: 'unit',
        defaultSortOrder: 'ascend',
        sorter: !isEditMode,
        render: (val) => val || '－',
      },
      {
        title: _get(date, 'last', '－'),
        dataIndex: 'last',
        render: (val) => comma(val, 8, '－')
      },
      {
        title: _get(date, 'current', '－'),
        dataIndex: 'current',
        render: (val) => comma(val, 8, '－')
      },
      {
        title: _get(date, 'next', '－'),
        dataIndex: 'next',
        render: (val, record) => (isEditMode && _get(date, 'next', false) ?
          <NumberInput
            value={val}
            onChange={(value) => handleDataChange(value, record.id, 'next')}
          />  : comma(val, 8, '－'))
      },
    ]
  );
};

export default Columns;
