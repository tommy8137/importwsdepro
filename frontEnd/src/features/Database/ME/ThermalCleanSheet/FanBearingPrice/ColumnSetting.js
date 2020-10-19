import React from 'react';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';
import _get from 'lodash/get';

const getColumns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    dropdownColumns
  } = props;

  return [
    {
      dataIndex: 'fanSize',
      title: 'Fan Size',
      width: 120,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    ...dropdownColumns.map(column => {
      return {
        ...column,
        children: [
          {
            dataIndex: `${column.path}.last`,
            title: _get(date, 'last', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && _get(date, 'lastId', false),
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.current`,
            title: _get(date, 'current', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && _get(date, 'currentId', false),
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.next`,
            title: _get(date, 'next', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && _get(date, 'nextId', false),
            render(val, record) {
              return (isEditMode ?
                <NumberInput
                  value={val}
                  onChange={(value) => handleOnEditItem(value, record.id, `${column.path}.next`)}
                /> :
                comma(val, 8, '－'));
            }
          },
        ]
      };
    })
  ];
};

export default getColumns;
