import React, { Fragment } from 'react';
import _get from 'lodash/get';
import NumberInput from '~~features/Database/components/NumberInput';
import Icon, { IconName } from '~~elements/Icon';
import { comma } from '~~utils/Math';


const left = props => {
  const {
    checkboxColumn,
    selectedColumn,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'paintTypeName',
      title: 'Name',
      defaultSortOrder: 'ascend',
      width: '90%',
      sorter: true,
    },
    selectedColumn,
  ];
};


const right = props => {
  const {
    checkboxColumn,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'colorName',
      title: '噴塗顏色',
      width: '100%',
      defaultSortOrder: 'ascend',
      sorter: true,
    }
  ];
};

export default {
  left,
  right,
};
