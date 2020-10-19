import React from 'react';


const getColumns = props => {
  const { checkboxColumn, idColumn, } = props;
  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'item',
      title: '項目',
      width: '90%',
      defaultSortOrder: 'ascend',
      sorter: true,
    },
  ];
};

export default getColumns;
