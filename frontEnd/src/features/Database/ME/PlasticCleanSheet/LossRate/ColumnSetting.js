import React, { Fragment } from 'react';
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
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'item',
      title: '項目',
      width: '25%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: '20%',
      sorter: !isEditMode,
      render: (val, record, index) => {
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
        width: '30%',
        children: [
          {
            dataIndex: `${column.path}.last`,
            title: date.last || '－',
            width: '15%',
            align: 'center',
            sorter: !isEditMode && date.lastId,
            render: (val) =>  comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.current`,
            title: date.current || '－',
            width: '15%',
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render: (val) =>  comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.next`,
            title: date.next || '－',
            width: '15%',
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

export default columns;
