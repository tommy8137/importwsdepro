import React from 'react';


const getColumns = props => {
  const {
    checkboxColumn,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      title: 'Base本體材質',
      dataIndex: 'name',
      width: '80%',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
  ];
};

export default getColumns;
