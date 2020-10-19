import React from 'react';
import Icon, { IconName } from '~~elements/Icon';


const getColumns = props => {
  const {
    checkboxColumn,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      title: 'Name',
      dataIndex: 'paintType',
      width: '30%',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width: '30%',
      sorter: true,
    },
    {
      title: '面漆',
      dataIndex: 'top',
      width: '20%',
      sorter: true,
      render: (val) => (val ? <Icon icon={IconName.IcoGreenCheck} size="1.5rem" /> : '－')
    },
    {
      title: '底漆',
      dataIndex: 'bottom',
      width: '20%',
      sorter: true,
      render: (val) => (val ? <Icon icon={IconName.IcoGreenCheck} size="1.5rem" /> : '－')
    },
  ];
};

export default getColumns;
