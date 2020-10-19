import React, { Fragment } from 'react';
import Select from '~~elements/Select';
import StringInput from '~~features/Database/components/StringInput';


const getColumns = props => {
  const {
    idColumn,
    checkBoxDataIndex,
    isEditMode,
    checkboxColumn,
    handleOnEditItem,
    category2List,
    dropdownColumns
  } = props;


  function getContent(val, isListOnly = false) {
    let result;
    if (isListOnly) {
      const list = val.map(item => item.name);
      result = list.length > 0 ? list.join(', ') : '－';
    } else {
      result = val.map(item => ({ label: item.name, value: item.id }));
    }
    return result;
  }

  return [
    idColumn,
    // checkboxColumn,
    {
      dataIndex: 'moduleName',
      title: 'Module Name',
      width: 150,
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: 150,
      sorter: !isEditMode,
      render: (val, record) => (
        isEditMode ?
          <StringInput
            maxLength={400}
            value={val}
            onChange={(value) => handleOnEditItem(value, record[checkBoxDataIndex], 'remark')}
          /> : val || '－')
    },
    ...dropdownColumns.map(column => (
      {
        ...column,
        width: 150,
        dataIndex: `${column.path}.category2List`,
        sorter: !isEditMode,
        render: (val, record) => {
          return (
            isEditMode ?
              <Select
                placeholder=""
                target="box"
                options={category2List}
                value={getContent(val, false)}
                isMulti
                onChange={(values) => handleOnEditItem(values.map(opt => ({ id: opt.value, name: opt.label })), record[checkBoxDataIndex], `${column.path}.category2List`)}
                onClose={() => { }}
              /> :
              getContent(val, true)
          );
        }
      }
    ))
  ];
};

export default getColumns;
