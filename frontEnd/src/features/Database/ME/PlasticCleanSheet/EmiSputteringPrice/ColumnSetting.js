import React, { Fragment } from 'react';
import { comma, round } from '~~utils/Math';
import StringInput from '~~features/Database/components/StringInput';
import NumberInput from '~~features/Database/components/NumberInput';
import _get from 'lodash/get';

const columns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    checkboxColumn,
    dropdownColumns,
    idColumn,
  } = props;


  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'name',
      title: '項目',
      width: '20%',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    ...dropdownColumns.map(column => {
      return {
        ...column,
        width: '30%',
        children: [
          {
            dataIndex: `${column.path}.last`,
            title: date.last || '－',
            width: '10%',
            align: 'center',
            sorter: !isEditMode && date.lastId,
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.current`,
            title: date.current || '－',
            width: '10%',
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.next`,
            title: date.next || '－',
            width: '10%',
            align: 'center',
            sorter: !isEditMode && date.nextId,
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

export default columns;
