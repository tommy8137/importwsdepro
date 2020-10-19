import React from 'react';
import { BaseCell } from '~~elements/DataGridCommonCell';
import { HoverHintOverCell, SeeMoreCell } from '../CommonCell';

const getColumns = (specList, specTitle) => {
  if (!specList || !specTitle) return [];
  const Columns = specList.map((s, i) => ({
    key: s,
    name: s,
    width: 100,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    sortable: false,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row = {} }) => {
      const value = row[s];
      return (
        <BaseCell
          value={value}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    },
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, row }) => {
      const tooltipContent = specTitle[s];
      return (
        <HoverHintOverCell
          value={tooltipContent || s}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          label={tooltipContent}
          tooltipRender={() => tooltipContent}
        />
      );
    }
  }));
  return [
    ...Columns,
    {
      key: 'seeMore',
      name: 'seeMore',
      width: 150,
      justifyContent: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      sortable: false,
      renderCustomHeader: ({ columnIndex, key, rowIndex, style, row }) => {
        return (
          <SeeMoreCell
            value=""
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />
        );
      }
    }
  ];
};
export default getColumns;
