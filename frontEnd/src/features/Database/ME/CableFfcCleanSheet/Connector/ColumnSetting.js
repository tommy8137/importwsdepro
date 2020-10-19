import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';

const getColumns = props => {
  const { isEditMode, date, handleOnEditItem } = props;
  return [
    {
      dataIndex: 'id',
      title: 'ID',
      width: '5%',
      align: 'center',
      render: (val, record, index) => index + 1,
    },
    {
      dataIndex: 'connectorName',
      title: 'connector',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
  ];
};

export default getColumns;
