import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';
import Select from '~~elements/Select';

const getColumns = props => {
  const {
    isEditMode,
    date,
    handleOnEditItem,
    nutTypeList = [],
    handleChangeNutType = () => { },
    unArchiveColumn,
    checkboxColumn,
    // selectedColumn,
    showArchive,
  } = props;

  return [
    showArchive ? unArchiveColumn : checkboxColumn,
    {
      dataIndex: 'partCategory2Name',
      title: 'Parts Category II',
      width: '15%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'item',
      title: 'Material',
      width: '20%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      dataIndex: 'nutType',
      title: 'Nut Type',
      width: '15%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      render: (val, record) => {
        const { item, partCategory2Name } = record;
        // 只有Nut才可以選擇 nutType
        const canEdit = item !== 'Other_Fill_ME_Remark' && isEditMode && partCategory2Name === 'Nut';
        const nutTypeOptions = nutTypeList.map(obj => ({ label: obj.nutTypeName, value: obj.nutTypeId }));
        function onChange(opt) {
          const data = {
            materialId: record.id,
            nutTypeId: opt.value,
          };
          handleOnEditItem(opt.value, record.id, 'nutTypeName');
          handleChangeNutType(data);
        }
        if (canEdit) {
          const optionValue = nutTypeOptions.find(obj => obj.label === val);
          return (
            <Select
              target="box"
              value={optionValue}
              onChange={onChange}
              options={nutTypeOptions}
            />
          );
        }
        return val;
      },
    },
    {
      dataIndex: 'density',
      title: 'Density',
      width: '10%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      title: _get(date, 'last', '－'),
      dataIndex: 'last',
      width: '2rem',
      sorter: !isEditMode && _get(date, 'lastId', false),
      render: val => comma(val, 8, '－'),
    },
    {
      title: _get(date, 'current', '－'),
      dataIndex: 'current',
      width: '2rem',
      sorter: !isEditMode && _get(date, 'currentId', false),
      render: val => comma(val, 8, '－'),
    },
    {
      title: _get(date, 'next', '－'),
      dataIndex: 'next',
      width: '2rem',
      sorter: !isEditMode && _get(date, 'nextId', false),
      render: (val, record) => (isEditMode ?
        <NumberInput
          value={val}
          onChange={value => handleOnEditItem(value, record.checkId, 'next')}
        /> :
        comma(val, 8, '－')),
    },
  ];
};

export default getColumns;
