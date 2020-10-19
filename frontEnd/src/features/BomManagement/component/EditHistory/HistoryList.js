import React from 'react';
import Table from '~~elements/Table';
import styled from 'styled-components';


const HistoryText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const getColumns = () => [
  {
    dataIndex: 'edit_user_name',
    key: 'edit_user_name',
    title: 'Modify by',
    width: '15%',
  },
  {
    dataIndex: 'edit_time',
    key: 'edit_time',
    title: 'Edit time',
    width: '15%',
  },
  {
    dataIndex: 'cost_version',
    key: 'cost_version',
    title: 'Cost Version',
    width: '15%',
  },
  {
    dataIndex: 'history',
    key: 'history',
    title: 'Item',
    width: '55%',
    render: (val) => {
      if (!Array.isArray(val)) return null;
      return (
        <React.Fragment>
          {val.map(item =>
            (
              <HistoryText>
                {`${item.item_name} → ${item.field_label} : ${item.value}`}
              </HistoryText>
            )
          )}
        </React.Fragment>
      );
    }
  },
];

const HistoryList = props => {
  const { data = [], } = props;
  const columns = getColumns();

  return (
    <Table
      scroll={{ y: 360 }}
      headerColor="blue"
      columns={columns}
      dataSource={data}
      pagination={false}
      verticalAlign="top"
    />
  );
};

export default HistoryList;
