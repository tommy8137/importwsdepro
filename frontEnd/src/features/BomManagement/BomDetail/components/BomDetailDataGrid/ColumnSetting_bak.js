import React from 'react';
import * as R from 'ramda';

import Icon from '~~elements/Icon';
import { HoverHintCell, BaseCell } from '~~elements/DataGridCommonCell';
import {
  ImageCell,
  SourcerCostCell,
  SPACostCell,
  SuggestionCostCell,
  SuggestionRemarkCell
} from './CommonCell';

let BaseColumns = [
  { key: 'item', name: 'Item', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku0', name: 'SKU 0\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku1', name: 'SKU 1\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku2', name: 'SKU 2\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku3', name: 'SKU 3\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku4', name: 'SKU 4\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'sku5', name: 'SKU 5\n(QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'level', name: 'Level', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_number', name: 'Part Number', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_name', name: 'Part Name', width: 200, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'initaddmodidel', name: 'Initial/Add/\nModify/Delete', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'owner', name: 'Owner', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'odm_oem', name: 'ODM/OEM', width: 80, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'gb_assy_ctgy', name: 'Assy Category', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'func_ctgy', name: 'Function\nCategory', width: 60, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'parts_ctgy_1', name: 'Part Category I', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'parts_ctgy_2', name: 'Part Category II', width: 220, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'material_spec', name: 'Material Spec.', width: 160, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'material', name: 'Material', width: 160, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_l', name: 'L(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_w', name: 'W(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_h', name: 'H(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_ef', name: 'Ф(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_m', name: 'M(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_l2', name: 'L2(成品展開)\n(mm)', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_size_w2', name: 'W2(成品展開)\n(mm)', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'thickness', name: 'Thickness\n(mm)', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  { key: 'part_weight', name: 'Weight(g)', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  // 圖片
  {
    key: 'image_path',
    name: 'Image',
    width: 80,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <ImageCell
          onClick={onClick}
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  { key: 'update_time', name: 'Update Time\n(月/日/年)', width: 140, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
];

// 非CE
const notCeColumns = [
  ...BaseColumns.slice(0, 10),
  // 紅色驚歎號
  {
    key: 'unedit',
    name: 'Part List',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      let columnValue = row[column['key']];
      // 如果是非CE的 Part List 欄位，只顯示驚歎號
      return (columnValue ?
        <BaseCell
          onClick={onClick}
          value={<Icon className="btn-image" icon="IcoAlarmRed" />}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        /> :
        <BaseCell
          onClick={onClick}
          value={columnValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  ...BaseColumns.slice(10, 29),
  {
    key: 'remark',
    name: 'Remark',
    width: 250,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <HoverHintCell
          onClick={onClick}
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          tooltipRender={() => (
            <div className="content">
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '5rem', textAlign: 'left', color: '#808080' }}>Remark </div>
                <div className="content" style={{ color: '#333333' }}>{row[column['key']]}</div>
              </div>
            </div>
          )}
        />
      );
    }
  },
  ...BaseColumns.slice(29, 30),
];


const ceColumns = [
  ...BaseColumns.slice(0, 10),
  {
    key: 'current_price',
    name: 'Last Price',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <HoverHintCell
          onClick={onClick}
          value={R.path(['price'], row[column['key']])}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          tooltipRender={() => (
            <div className="content">
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '5rem', textAlign: 'left', color: '#808080' }}>Valid Date </div>
                <div className="content" style={{ color: '#333333' }}>{R.path(['validDate'], row[column['key']])}</div>
              </div>
            </div>
          )}
        />
      );
    }
  },
  // Clean sheet cost如果不是unedit 要給system_cost
  {
    key: 'system_cost',
    name: 'Clean sheet\nCost(U/P)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    // renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
    //   // 可以看到價錢相關的欄位，會顯示"system_cost"，此欄位要搭配'unedit'，來決定要顯示驚嘆號還是數字
    //   // unedit為true表示partlist還沒填完
    //   let columnValue = row[column['key']];
    //   return (!row['unedit'] ?
    //     <HoverHintCell
    //       onClick={onClick}
    //       value={columnValue}
    //       cellInfo={{ columnIndex, key, rowIndex, style }}
    //       helperInfo={{ row }}
    //       tooltipRender={() => (
    //         <div className="content">
    //           <div className="item" style={{ display: 'flex' }}>
    //             <div className="title" style={{ width: '4rem', textAlign: 'left', color: '#9f9f9f' }}>組工費 </div>
    //             <div className="content">${R.path(['sub_cost', 'laborage_cost'], row)}</div>
    //           </div>
    //           <div className="item" style={{ display: 'flex' }}>
    //             <div className="title" style={{ width: '4rem', textAlign: 'left', color: '#9f9f9f' }}>子階總價 </div>
    //             <div className="content">${R.path(['sub_cost', 'partlist_cost'], row)}</div>
    //           </div>
    //         </div>
    //       )}
    //     /> :
    //     <BaseCell
    //       onClick={onClick}
    //       value={<Icon className="btn-image" icon="IcoAlarmRed" />}
    //       cellInfo={{ columnIndex, key, rowIndex, style }}
    //     />);
    // }
  },
  // 這3個 都先給空值 // TODO: DataGrid要記得改
  {
    key: 'spa_cost',
    name: 'SPA Cost\n(U/P)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <SPACostCell
          onClick={onClick}
          value={row['spa_cost']}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, isEditMode, columnKey: column['key'] }}
        />
      );
    }
  },
  {
    key: 'sourcer_cost',
    name: 'Sourcer\nCost(U/P)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <SourcerCostCell
          onClick={onClick}
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, isEditMode, columnKey: column['key'] }}
        />
      );
    }
  },
  {
    key: 'suggestion_cost_type',
    name: 'Suggestion\nCost(U/P)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <SuggestionCostCell
          onClick={onClick}
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, isEditMode, columnKey: column['key'] }}
        />
      );
    }
  },
  {
    key: 'suggestion_cost_remark',
    name: 'Remark',
    width: 250,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 13,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
      return (
        <SuggestionRemarkCell
          onClick={onClick}
          value={row[column['key']]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, isEditMode, columnKey: column['key'] }}
        />
      );
    }
  },
  ...BaseColumns.slice(10)
];

export {
  notCeColumns,
  ceColumns,
};


// Tooltips 出現的不同會根據 Suggestion Cost 的選擇不同
// 在 Suggestion Cost 那欄選擇 Clean Sheet Cost 之後，就會出現 Clean Sheet Cost 和 運檢包的 tooltips
// 如果選擇 子階建議價＋組工費，之後hover 的 tooltips 就會出現 子階建議價、組工費、運檢包
