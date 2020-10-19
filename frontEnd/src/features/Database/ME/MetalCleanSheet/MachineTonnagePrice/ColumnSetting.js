import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import StringInput from '~~features/Database/components/StringInput';
import NumberInput from '~~features/Database/components/NumberInput';
import NumberInputCanEmpty from '~~features/Database/components/NumberInputCanEmpty';


const getColumns = props => {
  const {
    isEditMode,
    handleOnEditItem,
    dropdownColumns,
    date,
    // 工程模
    hmToolingStageDieCostLength,
    uniqueIdNameForIndex,
    getOriginValueByUniquIdAndPath
  } = props;

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0 || index === (hmToolingStageDieCostLength + 1)) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  return [
    {
      dataIndex: 'uniqueId',
      title: 'ID',
      width: 50,
      align: 'center',
      render: (val, row, index) => {
        if (index === 0) {
          return {
            children: '工程模',
            props: {
              colSpan: 4 + dropdownColumns.length * 3,
              className: 'custom-colspan'
            },
          };
        }
        if (index === hmToolingStageDieCostLength + 1) {
          return {
            children: '連續模',
            props: {
              colSpan: 4 + dropdownColumns.length * 3,
              className: 'custom-colspan'
            },
          };
        }
        if (row.pressTypeName === '工程模') {
          return index;
        }
        // 1是工程模的colspan
        return hmToolingStageDieCostLength > 0 ? index - (hmToolingStageDieCostLength + 1) : index - 1;
      },
    },
    {
      dataIndex: 'ton',
      title: '噸數',
      width: 80,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
      render: (val, record, index) => {
        const content = val || '－';
        return renderContent(content, record, index);
      }
    },
    {
      title: 'Bolster area (L*W)',
      dataIndex: 'bloster',
      width: 180,
      sorter: !isEditMode,
      render: (val, record, index) => {
        const content = isEditMode ?
          (<StringInput
            onChange={(value) => handleOnEditItem(value, record[uniqueIdNameForIndex], 'bloster')}
            value={val}
          />) : val || '－';
        return renderContent(content, record, index);
      }
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      width: 200,
      sorter: !isEditMode,
      render: (val, record, index) => {
        const content = isEditMode ?
          (<StringInput
            maxLength={400}
            onChange={(value) => handleOnEditItem(value, record[uniqueIdNameForIndex], 'remark')}
            value={val}
          />) : val || '－';
        return renderContent(content, record, index);
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
            render: (val, record, index) => {
              const content = comma(val, 8, '－');
              return renderContent(content, record, index);
            }
          },
          {
            dataIndex: `${column.path}.current`,
            title: _get(date, 'current', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render: (val, record, index) => {
              const content = comma(val, 8, '－');
              return renderContent(content, record, index);
            }
          },
          {
            dataIndex: `${column.path}.next`,
            title: _get(date, 'next', '－'),
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.nextId,
            render: (val, record, index) => {
              if (isEditMode) {
                const origiValue = getOriginValueByUniquIdAndPath(record[uniqueIdNameForIndex], [column.path, 'next']);
                if (origiValue === null) {
                  return renderContent(
                    (
                      <NumberInputCanEmpty
                        value={val}
                        onChange={(value) => handleOnEditItem(value, record[uniqueIdNameForIndex], `${column.path}.next`)}
                      />), record, index);
                }
                return renderContent(
                  (
                    <NumberInput
                      value={val}
                      onChange={(value) => handleOnEditItem(value, record[uniqueIdNameForIndex], `${column.path}.next`)}
                    />), record, index);
              }
              return renderContent(comma(val, 8, '－'), record, index);
            }
          },
        ]
      };
    })
  ];
};

export default getColumns;
