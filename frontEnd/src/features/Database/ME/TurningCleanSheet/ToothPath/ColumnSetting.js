import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';

const getColumns = props => {
  const { isEditMode, date, handleOnEditItem, idColumn } = props;
  return [
    idColumn,
    {
      dataIndex: 'outterDiameter',
      title: '牙徑(M)',
      width: '50%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      title: 'OD內徑',
      dataIndex: 'innerDiameter',
      width: '50%',
      sorter: !isEditMode,
      render: (val, record) => (isEditMode ? <NumberInput value={val} onChange={value => handleOnEditItem(value, record.id, 'innerDiameter')} /> : comma(val, 8, '－')),
    },
  ];
};

export default getColumns;
