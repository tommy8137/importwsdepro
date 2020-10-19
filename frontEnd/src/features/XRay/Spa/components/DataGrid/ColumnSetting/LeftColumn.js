import React from 'react';
import { BaseCell, BaseCellWithTooltip } from '~~elements/DataGridCommonCell';
import { comma } from '~~utils/Math';
import * as moment from 'moment';
import { HoverHintCell, HoverHintOverCell } from '../CommonCell';


const columns = [
  { key: 'partNumber', name: 'Part Number', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5, sortable: true },
  { key: 'partDesc', name: 'Part Description', width: 240, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5, sortable: true },
  { key: 'manufacturer', name: 'Manufacturer', width: 150, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  { key: 'vendor', name: 'Vendor', width: 100, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  {
    key: 'vendorPN',
    name: 'Vendor Part No.',
    width: 150,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row = {} }) => {
      const value = row['vendorPN'];
      const valueEl = (<span className="hoverUnderline">{value || '-'}</span>);
      const label = value ? (
        <div>
          <div style={{ fontWeight: 500, color: '#333' }}>Vendor Part No.</div>
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '-' : value}</div>
        </div >
      ) : null;
      return (
        <BaseCellWithTooltip
          value={valueEl}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          label={label}
        />
      );
    },
  },
  { key: 'supplyType', name: 'Supply Type', width: 150, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  {
    key: 'mrp',
    name: 'Last MRP',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      return (
        <BaseCell
          value={comma(row['mrp'])}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />

      );
    }
  },
  { key: 'currency', name: 'Currency', width: 120, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  {
    key: 'unitPrice',
    name: 'Last Price',
    width: 150,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row = {} }) => {
      const getValidDate = val => moment.utc(val).local().format('YYYY-MM-DD');
      const validDate = getValidDate(row.datab);
      const value = row['unitPrice'];

      return validDate ?
        (
          <HoverHintCell
            value={value}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row }}
            label="validDate"
            tooltipRender={() => (
              <div style={{ display: 'flex' }}>
                <div style={{ width: '5rem', textAlign: 'left', color: '#808080' }}>Valid Date</div>
                <div style={{ color: '#333333' }}>{validDate}</div>
              </div>
            )}
          />
        ) :
        (
          <BaseCell
            value={value}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />
        );
    }
  },
  { key: 'priceDiff', name: '價差%', width: 100, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  {
    key: 'isCommonPart',
    name: 'Common Parts',
    width: 130,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      return (
        <BaseCell
          value={row['isCommonPart'] ? 'Y' : 'N'}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  { key: 'obs', name: 'OBS', width: 100, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
  { key: 'exp', name: 'EXP/EOL', width: 100, justifyContent: 'center', paddingLeft: 5, paddingRight: 5, sortable: true },
];


const meColumns = columns.filter(x => x.key !== 'isCommonPart');
const eeColumns = columns;

export {
  meColumns,
  eeColumns,
};
