import React, { Fragment } from 'react';
import _get from 'lodash/get';
import { comma, round } from '~~utils/Math';
import StringInput from '~~features/Database/components/StringInput';
import NumberInput from '~~features/Database/components/NumberInput';

const columns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    checkboxColumn,
    dropdownColumns,
    idColumn
  } = props;


  return [
    // {
    //   ...checkboxColumn,
    //   width: 50,
    // },
    {
      ...idColumn,
      width: 50,
    },
    {
      dataIndex: 'ton',
      title: '噸數',
      width: 80,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
      render: (val) =>  val || '－'
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: 200,
      sorter: !isEditMode,
      render: (val, record) => {
        return isEditMode ?
          <StringInput
            maxLength={400}
            onChange={(value) => handleOnEditItem(value, record.id, 'remark')}
            value={val}
          /> : val ||  '－';
      }
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
            sorter: !isEditMode && date.lastId,
            render: (val) => comma(val, 8, '－'),
          },
          {
            dataIndex: `${column.path}.current`,
            title: _get(date, 'current', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render: (val) => comma(val, 8, '－'),
          },
          {
            dataIndex: `${column.path}.next`,
            title: _get(date, 'next', '－'),
            width: 120,
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
