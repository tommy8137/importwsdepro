import React from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _boolean from 'lodash/isBoolean';
import { comma } from '~~utils/Math';
import Icon, { IconName } from '~~elements/Icon';
import { HoverHintCell, BaseCell, BaseCellWithTooltip } from '~~elements/DataGridCommonCell';

import {
  ImageCell,
  EmdmImageCell,
  SourcerCostCell,
  SPACostCell,
  SuggestionCostCell,
  dropdownConfig,
  SuggestionRemarkCell
} from './CommonCell';

const highlightSpan = (val) => <span style={{ backgroundColor: 'yellow' }}>{val}</span>;
const COMM_VALUE = 5;

const beseColumns = (props = {}) => {
  const { selectedSkuNum = 'sku1' } = props;
  // 專門給 Sourcer Cost Amount 顯示用的文字
  const skuNumText = selectedSkuNum.toUpperCase();

  return {
    item: { key: 'item', name: 'Item', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku0: { key: 'sku0', name: 'SKU 0 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku1: { key: 'sku1', name: 'SKU 1 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku2: { key: 'sku2', name: 'SKU 2 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku3: { key: 'sku3', name: 'SKU 3 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku4: { key: 'sku4', name: 'SKU 4 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    sku5: { key: 'sku5', name: 'SKU 5 (QTY)', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    level: { key: 'level', name: 'Level', width: 40, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_number: { key: 'part_number', name: 'Part Number', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_name: { key: 'part_name', name: 'Part Name', width: 400, justifyContent: 'flex-start', textAlign: 'left', paddingLeft: 15, paddingRight: 13 },
    initaddmodidel: { key: 'initaddmodidel', name: 'Initial/Add/ Modify/Delete', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    owner: { key: 'owner', name: 'Owner', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    odm_oem: { key: 'odm_oem', name: 'ODM/OEM', width: 80, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    gb_assy_ctgy: { key: 'gb_assy_ctgy', name: 'Assy Category', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    func_ctgy: { key: 'func_ctgy', name: 'Function Category', width: 60, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    parts_ctgy_1: { key: 'parts_ctgy_1', name: 'Part Category I', width: 120, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    parts_ctgy_2: { key: 'parts_ctgy_2', name: 'Part Category II', width: 220, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    material_spec: { key: 'material_spec', name: 'Material Spec.', width: 160, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    material: { key: 'material', name: 'Material', width: 160, justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 13 },
    part_size_l: { key: 'part_size_l', name: 'L(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_w: { key: 'part_size_w', name: 'W(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_h: { key: 'part_size_h', name: 'H(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_ef: { key: 'part_size_ef', name: 'Ф(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_m: { key: 'part_size_m', name: 'M(mm)', width: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_l2: { key: 'part_size_l2', name: 'L2(成品展開) (mm)', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_size_w2: { key: 'part_size_w2', name: 'W2(成品展開) (mm)', width: 120, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    thickness: { key: 'thickness', name: 'Thickness (mm)', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    part_weight: { key: 'part_weight', name: 'Weight(g)', width: 80, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    // epro圖片
    image_path: {
      key: 'image_path',
      name: 'Image',
      width: 80,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick }) => {
        return (
          <ImageCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />
        );
      }
    },
    // eMDM 圖片
    emdm_image: {
      key: 'image',
      name: 'Image',
      width: 80,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, bomID }) => {
        return (
          <EmdmImageCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style, row, bomID }}
          />
        );
      }
    },
    update_time: { key: 'update_time', name: 'Update Time (月/日/年)', width: 140, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
    // 紅色驚歎號
    unedit: {
      key: 'unedit',
      name: 'Part List',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick }) => {
        let columnValue = row[column['key']];
        // 如果是非CE的 Part List 欄位，只顯示驚歎號
        return (columnValue ?
          <BaseCell
            onClick={onClick}
            value={<Icon icon={IconName.IcoAlarmRed} size="1.4rem" />}
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
    remark: {
      key: 'remark',
      name: 'Remark',
      width: 250,
      justifyContent: 'flex-start',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column }) => {
        const value = row[column['key']];
        const valueEl = (<span className="hoverUnderline">{value || ''}</span>);
        const label = value ? (
          <div>
            <div style={{ fontWeight: 500, color: '#333' }}>Remark</div>
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '' : value}</div>
          </div>
        ) : null;

        return (
          <BaseCellWithTooltip
            value={valueEl}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row }}
            label={label}
          />
        );
      }
    },
    history: {
      key: 'history',
      name: 'Edit History',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column }) => {
        const val = row?.[column?.key] || false;
        const { source_item_id: sourceItemId = '' } = row;
        return (
          <BaseCell
            value={val ?
              <Icon
                icon={IconName.BtnDiration}
                size="1.25rem"
                onClick={e => {
                  e.stopPropagation();
                  props.onOpenHistoryModal(sourceItemId);
                }}
              /> : null}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />
        );
      }
    },
    last_price_up: {
      key: 'last_price_up',
      name: 'CBG Price ',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick }) => {
        const validDate = _get(row, 'tooltip.last_price.valid_date', '');
        const purchaseOrg = _get(row, 'tooltip.last_price.purchase_org', '');
        const isValidPrice = _get(row, 'tooltip.last_price.is_valid_price', '');
        const isHighlight = _get(row, 'cost_highlight', false) && _get(row, ['cost_highlight', column['key']], null) !== _get(row, column['key'], null);
        const value = comma(row[column['key']], COMM_VALUE, '');
        if (_boolean(isValidPrice) && !isValidPrice && value !== '') {
          style = { ...style, textDecorationLine: 'line-through' };
        }
        return (
          <HoverHintCell
            onClick={onClick}
            value={isHighlight ? highlightSpan(value) : value}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row }}
            tooltipRender={() => (
              <div className="content">
                <div className="item" style={{ display: 'flex' }}>
                  <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Valid Date </div>
                  <div className="content" style={{ color: '#333333' }}>{validDate}</div>
                </div>
                <div className="item" style={{ display: 'flex' }}>
                  <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Purchase Org </div>
                  <div className="content" style={{ color: '#333333' }}>{purchaseOrg}</div>
                </div>
              </div>
            )}
          />
        );
      }
    },
    spa_cost_up: {
      key: 'spa_cost_up',
      name: 'SPA Cost (U/P)',
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
        return (
          <SPACostCell
            onClick={onClick}
            value={row[column['key']]}
            row={row}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />
        );
      }
    },
    sourcer_cost_up: {
      key: 'sourcer_cost_up',
      name: 'Sourcer Cost(U/P)',
      sourcerCanEdit: true,
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, isEditMode }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    clean_sheet_cost_up: {
      key: 'clean_sheet_cost_up',
      name: 'Clean sheet Cost(U/P)',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, }) => {
        const value = row[column['key']];
        const commaValue = typeof value === 'string' ? value : comma(value, COMM_VALUE);
        const isHighlight = _get(row, 'cost_highlight', false) && _get(row, ['cost_highlight', column['key']], null) !== _get(row, column['key'], null);

        return (
          <BaseCell
            value={isHighlight ? highlightSpan(commaValue) : commaValue}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />);
      }
    },
    ce_cost_up: {
      key: 'ce_cost_up',
      name: 'CE Cost (U/P)',
      ceCanEdit: true,
      width: 130,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
        const compareList = [
          'ce_assembly', // CE組工
          'clean_sheet_cost_up', // Clean sheet Cost(U/P)
          'last_price_up', // CBG Price
        ];

        const shouldHighlight = _get(row, 'cost_highlight', false);
        const isHighlight = shouldHighlight && compareList.reduce((prev, columnKey) => prev || _get(row, ['cost_highlight', columnKey], null) !== _get(row, columnKey, null), false);
        const value = comma(row[column['key']]);
        return (
          <SuggestionCostCell
            onClick={onClick}
            value={isHighlight ? highlightSpan(value) : value}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />
        );
      }
    },
    lowest_cost: {
      key: 'lowest_cost',
      name: 'Lowest Price Item',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, }) => {
        const value = row[column['key']];
        const lowestItem = _find(dropdownConfig, d => d.key === value);
        const lowestName = _get(lowestItem, 'title', '');
        return (
          <BaseCell
            value={lowestName}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />);
      }
    },
    ce_remark: {
      key: 'ce_remark',
      name: 'CE Remark',
      ceCanEdit: true,
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
    sourcer_shipping: {
      key: 'sourcer_shipping',
      name: 'Sourcer 運包',
      sourcerCanEdit: true,
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, isEditMode }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    sourcer_pl: {
      key: 'sourcer_pl',
      name: 'Sourcer P/L',
      sourcerCanEdit: true,
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, isEditMode }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    sourcer_assembly: {
      key: 'sourcer_assembly',
      name: 'Sourcer 組工',
      sourcerCanEdit: true,
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, isEditMode }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    sourcer_cost_sku_amount: {
      key: 'sourcer_cost_sku_amount',
      name: `Sourcer Cost (${skuNumText} Amount)`,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, onClick, isEditMode }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']]}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    sourcer_remark: {
      key: 'sourcer_remark',
      name: 'Sourcer Remark',
      sourcerCanEdit: true,
      ceCanEdit: true,
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
    ce_shipping: {
      key: 'ce_shipping',
      name: 'CE 運包',
      ceCanEdit: true,
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
    ce_pl: {
      key: 'ce_pl',
      name: 'CE P/L',
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
        return (
          <SourcerCostCell
            onClick={onClick}
            value={row[column['key']] || 0}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />
        );
      }
    },
    ce_assembly: {
      key: 'ce_assembly',
      name: 'CE 組工',
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, }) => {
        const value = row[column['key']];
        const commaValue = comma(value, COMM_VALUE);
        const isHighlight = _get(row, 'cost_highlight', false) && _get(row, ['cost_highlight', column['key']], null) !== _get(row, column['key'], null);

        return (
          <BaseCell
            value={isHighlight ? highlightSpan(commaValue) : commaValue}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />);
      }
    },
    inquiry_cost_up: {
      key: 'inquiry_cost_up',
      name: 'Inquiry Cost (U/P)',
      ceCanEdit: true,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, onClick }) => {
        const value = row[column['key']];
        return (
          <SourcerCostCell
            onClick={onClick}
            value={value}
            cellInfo={{ columnIndex, key, rowIndex, style }}
            helperInfo={{ row, isEditMode, columnKey: column['key'] }}
          />);
      }
    },
    ce_cost_sku_amount: {
      key: 'ce_cost_sku_amount',
      name: `CE Cost (${skuNumText} Amount)`,
      width: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 13,
      renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, }) => {
        const value = row[column['key']];
        const commaValue = comma(value, COMM_VALUE);
        return (
          <BaseCell
            value={commaValue}
            cellInfo={{ columnIndex, key, rowIndex, style }}
          />);
      }
    },
    emdm_id: { key: 'emdm_id', name: 'eMDM ID', width: 400, justifyContent: 'center', paddingLeft: 15, paddingRight: 13 },
  };
};


const notCeColumns = (props = {}) => {
  const base = beseColumns(props);
  const { selectedSkuNum = 'sku1' } = props;
  return [
    'item',
    selectedSkuNum,
    'level',
    'part_number',
    'part_name',
    'unedit',
    'initaddmodidel',
    'owner',
    'odm_oem',
    'gb_assy_ctgy',
    'func_ctgy',
    'parts_ctgy_1',
    'parts_ctgy_2',
    'material_spec',
    'material',
    'part_size_l',
    'part_size_w',
    'part_size_h',
    'part_size_ef',
    'part_size_m',
    'part_size_l2',
    'part_size_w2',
    'thickness',
    'part_weight',
    'image_path',
    'remark',
    'update_time',
  ].map(k => base[k]);
};

const ceColumns = (props = {}) => {
  const base = beseColumns(props);
  const { selectedSkuNum = 'sku1' } = props;
  return [
    'item',
    selectedSkuNum,
    'level',
    'part_number',
    'part_name',
    'last_price_up',
    'clean_sheet_cost_up',
    'spa_cost_up',
    'sourcer_shipping',
    'sourcer_pl',
    'sourcer_assembly',
    'sourcer_cost_up',
    'sourcer_cost_sku_amount',
    'sourcer_remark',
    'ce_shipping',
    'ce_pl',
    'ce_assembly',
    'inquiry_cost_up',
    'ce_cost_up',
    'lowest_cost',
    'ce_cost_sku_amount',
    'ce_remark',
    'initaddmodidel',
    'owner',
    'odm_oem',
    'gb_assy_ctgy',
    'func_ctgy',
    'parts_ctgy_1',
    'parts_ctgy_2',
    'material_spec',
    'material',
    'part_size_l',
    'part_size_w',
    'part_size_h',
    'part_size_ef',
    'part_size_m',
    'part_size_l2',
    'part_size_w2',
    'thickness',
    'part_weight',
    'image_path',
    'remark',
    'update_time',
  ].map(k => base[k]);
};

const emdmNotCeColumns = (props = {}) => {
  const base = beseColumns(props);
  const { selectedSkuNum = 'sku1' } = props;
  return [
    'item',
    selectedSkuNum,
    'level',
    'part_number',
    'part_name',
    'unedit',
    'initaddmodidel',
    'odm_oem',
    'gb_assy_ctgy',
    'func_ctgy',
    'parts_ctgy_1',
    'parts_ctgy_2',
    'material_spec',
    'material',
    'part_size_l',
    'part_size_w',
    'part_size_h',
    'part_size_ef',
    'part_size_m',
    'part_size_l2',
    'part_size_w2',
    'thickness',
    'part_weight',
    'emdm_image',
    'remark',
    'history',
    'emdm_id',
    'update_time',
  ].map(k => base[k]);
};

const emdmCeColumns = (props = {}) => {
  const base = beseColumns(props);
  const { selectedSkuNum = 'sku1' } = props;
  return [
    'item',
    selectedSkuNum,
    'level',
    'part_number',
    'part_name',
    'last_price_up',
    'clean_sheet_cost_up',
    'spa_cost_up',
    'sourcer_shipping',
    'sourcer_pl',
    'sourcer_assembly',
    'sourcer_cost_up',
    'sourcer_cost_sku_amount',
    'sourcer_remark',
    'ce_shipping',
    'ce_pl',
    'ce_assembly',
    'inquiry_cost_up',
    'ce_cost_up',
    'lowest_cost',
    'ce_cost_sku_amount',
    'ce_remark',
    'initaddmodidel',
    'odm_oem',
    'gb_assy_ctgy',
    'func_ctgy',
    'parts_ctgy_1',
    'parts_ctgy_2',
    'material_spec',
    'material',
    'part_size_l',
    'part_size_w',
    'part_size_h',
    'part_size_ef',
    'part_size_m',
    'part_size_l2',
    'part_size_w2',
    'thickness',
    'part_weight',
    'emdm_image',
    'remark',
    'history',
    'emdm_id',
    'update_time',
  ].map(k => base[k]);
};

export {
  notCeColumns,
  ceColumns,
  // emdm columns
  emdmNotCeColumns,
  emdmCeColumns
};


// Tooltips 出現的不同會根據 Suggestion Cost 的選擇不同
// 在 Suggestion Cost 那欄選擇 Clean Sheet Cost 之後，就會出現 Clean Sheet Cost 和 運檢包的 tooltips
// 如果選擇 子階建議價＋組工費，之後hover 的 tooltips 就會出現 子階建議價、組工費、運檢包
