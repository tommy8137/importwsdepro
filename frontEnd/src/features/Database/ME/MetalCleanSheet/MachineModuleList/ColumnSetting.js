import React from 'react';
import _get from 'lodash/get';
import * as R from 'ramda';
import StringInput from '~~features/Database/components/StringInput';
import Select from '~~elements/Select';


const getColumns = props => {
  const {
    dropdownColumns = [],
    idColumn,
    isEditMode,
    checkBoxDataIndex,
    checkboxColumn,
    handleOnEditItem,
    metalTypeOptions = [],
    editModeList = [],
    setEditModeList = () => { },
    handleSelectChange = () => { }

  } = props;
  return [
    idColumn,
    {
      title: 'Module Name',
      dataIndex: 'moduleName',
      width: 150,
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      align: 'center',
      render: (val, record) => val
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: 150,
      sorter: !isEditMode,
      align: 'center',
      render: (val, record) => (
        isEditMode ?
          <StringInput
            maxLength={400}
            value={val}
            onChange={(value) => handleOnEditItem(value, record[checkBoxDataIndex], 'remark')}
          /> :
          val)

    },
    ...dropdownColumns.map(column => {
      return {
        ...column,
        width: 150,
        align: 'center',
        render(val = {}, record = {}) {
          const { metalTypeId = '', metalTypeName = '' } = val;
          const { moduleName = '' } = record;
          const showSelect = moduleName !== 'Module 4' && isEditMode;

          return showSelect ?
            <Select
              target="box"
              options={metalTypeOptions}
              onClose={() => { }}
              value={{
                value: metalTypeId,
                label: metalTypeName,
              }}
              onChange={opt => handleSelectChange(opt, record, column)}
            /> : metalTypeName;
        }
      };
    })
  ];
};

export default getColumns;
