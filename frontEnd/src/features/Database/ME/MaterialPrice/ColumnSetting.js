import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import Field from '~~elements/Field';
import TableUtils from '~~features/Database/utils/TableUtils';
import NumberInput from '~~features/Database/components/NumberInput';

const { getIsCheckable } = TableUtils;

const getLeftTableColumn = (props) => {
  const {
    partCate,
    isEditMode,
    handleOnEditItem,
    checkboxColumn,
    unArchiveColumn,
    selectedColumn,
    showArchive,
  } = props;


  const LEFT_COLUMNS = {
    plastic: [
      {
        title: 'Material Spec',
        dataIndex: 'materialSpec',
        defaultSortOrder: 'ascend',
        width: '35%',
        sorter: !isEditMode,
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        width: '35%',
        sorter: !isEditMode,
        render: (val, record) => {
          const isCheckable = getIsCheckable(record);
          return (isEditMode && isCheckable ?
            <Field.ConvertInput
              value={val}
              onChange={value => handleOnEditItem(value, record.id, 'remark')}
            /> : val);
        }
      },
    ],
    metal: [
      {
        title: 'Material',
        dataIndex: 'material',
        defaultSortOrder: 'ascend',
        width: '35%',
        sorter: !isEditMode,
      },
      {
        title: 'Density\n(g/cm³)',
        dataIndex: 'density',
        width: '35%',
        sorter: !isEditMode,
        render: (val) => comma(val, 8, '－'),
      },
    ],
    diecut: [
      {
        title: 'Material Spec',
        dataIndex: 'materialSpec',
        defaultSortOrder: 'ascend',
        width: '35%',
        sorter: !isEditMode,
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        width: '35%',
        sorter: !isEditMode,
        render: (val, record) => {
          const isCheckable = getIsCheckable(record);
          return (isEditMode && isCheckable ?
            <Field.ConvertInput
              dataType="string"
              value={val}
              onChange={value => handleOnEditItem(value, record.id, 'remark')}
            /> :
            val);
        }
      },
    ],
    rubber: [
      {
        title: 'Material Spec',
        dataIndex: 'materialSpec',
        defaultSortOrder: 'ascend',
        width: '25%',
        sorter: !isEditMode,
      },
      {
        title: 'Density (g/cm3)',
        dataIndex: 'density',
        width: '25%',
        sorter: !isEditMode,
        render: (val, record) => {
          const isCheckable = getIsCheckable(record);
          return (isEditMode && isCheckable ?
            <Field.ConvertInput
              dataType="float"
              value={val}
              onChange={value => handleOnEditItem(value, record.id, 'density')}
            /> : val
          );
        }
      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        width: '50%',
        sorter: !isEditMode,
        render: (val, record) => {
          const isCheckable = getIsCheckable(record);
          return (isEditMode && isCheckable ?
            <Field.ConvertInput
              dataType="string"
              value={val}
              onChange={value => handleOnEditItem(value, record.id, 'remark')}
            /> : val
          );
        }
      },
    ],
  };

  // 取得跟partCate對應的Columns
  const leftColumns = _get(LEFT_COLUMNS, partCate, []);
  return (
    [
      showArchive ? unArchiveColumn : checkboxColumn,
      ...leftColumns,
      selectedColumn
    ]
  );
};

const getRightTableColumn = (props) => {
  const {
    partCate,
    isEditMode,
    date,
    handleOnEditItem,
    checkboxColumn,
    unArchiveColumn,
    showArchive,
  } = props;


  const RIGHT_COLUMNS = {
    plastic: [
      {
        title: 'Material',
        dataIndex: 'material',
        defaultSortOrder: 'ascend',
        sorter: !isEditMode,
        width: '30%',
      },
    ],
    metal: [
      {
        title: 'Thickness',
        dataIndex: 'thickness',
        defaultSortOrder: 'ascend',
        width: '30%',
        sorter: !isEditMode,
        render: (val) => comma(val, 8, '－'),
      },
    ],
    diecut: [
      {
        title: 'Material',
        dataIndex: 'material',
        defaultSortOrder: 'ascend',
        width: '30%',
        sorter: !isEditMode,
      },
    ],
    rubber: [
      {
        title: 'Material',
        dataIndex: 'material',
        defaultSortOrder: 'ascend',
        width: '30%',
        sorter: !isEditMode,
      },
    ]
  };

  // 取得跟partCate對應的Columns
  const rightColumns = _get(RIGHT_COLUMNS, partCate, []);
  return (
    [
      showArchive ? unArchiveColumn : checkboxColumn,
      ...rightColumns,
      {
        title: date.last || '－',
        dataIndex: 'last',
        width: '20%',
        sorter: !isEditMode && date.last,
        render: (val) => comma(val, 8, '－'),
      },
      {
        title: date.current || '－',
        dataIndex: 'current',
        width: '20%',
        sorter: !isEditMode && date.current,
        render: (val) => comma(val, 8, '－'),
      },
      {
        title: date.next || '－',
        dataIndex: 'next',
        width: '20%',
        sorter: !isEditMode && date.next,
        render: (val, record) => {
          const isCheckable = getIsCheckable(record);
          return (isEditMode && isCheckable ?
            <Field.ConvertInput
              value={val}
              dataType="float"
              onChange={(value) => handleOnEditItem(value, record.id, 'next')}
            /> : comma(val, 8, '－'));
        }
      },
    ]
  );
};

export default {
  getLeftTableColumn,
  getRightTableColumn,
};
