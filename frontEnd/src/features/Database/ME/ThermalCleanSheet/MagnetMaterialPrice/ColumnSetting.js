import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getColumns = props => {
  const {
    isEditMode,
    date,
    handleOnEditItem,
    dropdownColumns = []
  } = props;

  return [
    {
      dataIndex: 'fanSize',
      title: 'Fan Size',
      width: '10%',
      align: 'center',
      sorter: !isEditMode && date.lastId,
      render: (val, record, index) => {
        return val;
      },
    },
    ...dropdownColumns.map(column => {
      return {
        ...column,
        children: [
          {
            dataIndex: `${column.path}.last`,
            title: date.last || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.lastId,
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.current`,
            title: date.current || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.next`,
            title: date.next || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.nextId,
            render(val, record) {
              return (isEditMode ?
                <NumberInput
                  value={val}
                  onChange={(value) => handleOnEditItem(value, record.id, `${column.path}.next`)}
                /> : comma(val, 8, '－'));
            }
          },
        ]
      };
    })
  ];
};

export default getColumns;
