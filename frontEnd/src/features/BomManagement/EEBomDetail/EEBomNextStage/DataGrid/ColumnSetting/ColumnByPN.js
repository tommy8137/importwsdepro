import React from 'react';
import moment from 'moment';
// import _isNumber from 'lodash/isNumber';
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';

import {
  BaseCell,
  HeaderCellWithQuestionMarkAndSorter,
  BaseCellWithTooltip,
  ClickHintCell,
} from '~~elements/DataGridCommonCell';
import { comma } from '~~utils/Math';

import Utils from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Utils';
import Star from '~~features/BomManagement/EEBomDetail/component/Star';
import { SPACell } from '../CommonCell';
import RemarkCell from '../CommonCell/Remark/Remark';
import CurrrentPriceAdjPercentageCell from '../CommonCell/CurrrentPriceAdjPercentageCell';
import SourcerCostCell from '../CommonCell/SourcerCostCell';
import CECostCell from '../CommonCell/CECostCell';
import Type1Cell from '../CommonCell/Type1Cell';
import Type2Cell from '../CommonCell/Type2Cell';


// 淺規則
// Last Price 與 SPA 價錢不同時，在 Last Price 及 SPA 數字後用螢光黃 highlight
// Last Price 與 ALT 價錢不同時，在 Last Price 及 ALT 數字後用螢光黃 highlight
// Copy Price 符合條件者，該料壓上黃底
// SPA 價格高於 Last Price ，Last Price呈現紅字
// Show EXP 功能開啟後，價錢有變動者，在 SPA 後加 *
// Last Price*Adj.% 跟 CE Cost 兩個欄位只能選填一個

const columns = [
  {
    key: 'type1',
    name: 'Type I',
    width: 140,
    justifyContent: 'flex-start',
    paddingLeft: 12,
    paddingRight: 0,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      return (
        <Type1Cell
          value={row[column.key]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, columnKey: column.key }}
          isEditMode={isEditMode}
        />
      );
    }
  },
  {
    key: 'type2',
    name: 'Type II',
    width: 140,
    justifyContent: 'flex-start',
    paddingLeft: 12,
    paddingRight: 0,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      return (
        <Type2Cell
          value={row[column.key]}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row, columnKey: column.key }}
          isEditMode={isEditMode}
        />
      );
    }
  },
  { key: 'part_number', name: 'Part Number', width: 105, justifyContent: 'flex-start', paddingLeft: 13, paddingRight: 13, sortable: true },
  {
    key: 'description',
    name: 'Description',
    width: 272,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      const value = row['description'];
      const valueEl = (<span className="hoverUnderline">{value || '-'}</span>);
      const label = value ? (
        <div>
          <div style={{ fontWeight: 500, color: '#333' }}>Description</div>
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '-' : value}</div>
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
  {
    key: 'manufacturer',
    name: 'Manufacturer',
    width: 105,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true
  },
  // 20190807 加入sourcer cost
  {
    key: 'sourcer_cost',
    name: 'Sourcer Cost',
    width: 60,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: (props) => {
      // 自填，只有擋數字
      // FIXME: key 會消失，只好再傳一次parentKey進去
      return (
        <SourcerCostCell {...props} parentKey={props.key} />
      );
    }
  },
  {
    key: 'lowest_price',
    name: 'Price(L)',
    width: 105,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="Price(L)"
            tooltip={<p>All Lowest Price。游標懸浮於價錢可顯示Valid Date</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      const value = row['lowest_price'];
      const commaValue = comma(value, 5);

      // 如果有開啟exp spa, 就拿exp spa下去比較
      const spaValue = showEXPSpa ? row['exp_spa'] : row['spa'];

      // 如果price(L) 跟 SPA/ALT 不相同的話，就給他黃色底色
      const isDiff =
        Utils.checkIsDiff(row.lowest_price, spaValue) ||
        Utils.checkIsDiff(row.lowest_price, row.alt_lowest_price);

      // 如果spa大於price(L)的話, 字會變成紅色
      const isLarge = Number(spaValue) > Number(value);

      const validDateValue = row['lowest_price_valid_from'];

      const spanStyle = {
        backgroundColor: isDiff && 'yellow',
        color: isLarge && 'red'
      };
      const label = commaValue ? (
        <div className="content">
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '4.5rem', textAlign: 'left', color: '#808080' }}>Valid Date </div>
            <div className="content" style={{ color: '#333333' }}>{validDateValue ? moment(validDateValue).format('YYYYMMDD') : ''}</div>
          </div>
        </div>
      ) : null;

      const valueEl = commaValue ? <span style={{ backgroundColor: isDiff && 'yellow' }}>{commaValue}</span> : null;

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
  {
    key: 'second_highest_price',
    name: 'Price(M)',
    width: 105,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="Price(M)"
            tooltip={<p>MLCC 2nd Highest & Eles Lowest Price。游標懸浮於價錢可顯示Valid Date</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      const value = row['second_highest_price'];
      const commaValue = comma(value, 5);

      // 如果有開啟exp spa, 就拿exp spa下去比較
      const spaValue = showEXPSpa ? row['exp_spa'] : row['spa'];

      // 如果price(M) 跟 SPA/ALT 不相同的話，就給他黃色底色
      const isDiff =
        Utils.checkIsDiff(row.second_highest_price, spaValue) ||
        Utils.checkIsDiff(row.second_highest_price, row.alt_lowest_price);

      // 如果spa大於price(M)的話, 字會變成紅色
      const isLarge = Number(spaValue) > Number(value);

      const validDateValue = row['second_highest_price_valid_from'];

      const spanStyle = {
        backgroundColor: isDiff && 'yellow',
        color: isLarge && 'red'
      };
      const label = commaValue ? (
        <div className="content">
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '4.5rem', textAlign: 'left', color: '#808080' }}>Valid Date </div>
            <div className="content" style={{ color: '#333333' }}>{validDateValue ? moment(validDateValue).format('YYYYMMDD') : ''}</div>
          </div>
        </div>
      ) : null;

      const valueEl = commaValue ? <span style={{ backgroundColor: isDiff && 'yellow' }}>{commaValue}</span> : null;

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
  {
    key: 'current_price',
    name: 'Price(H)',
    width: 105,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="Price(H)"
            tooltip={<p>All Highest Price。游標懸浮於價錢可顯示Valid Date</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      const value = row['current_price'];
      const commaValue = comma(value, 5);

      // 如果有開啟exp spa, 就拿exp spa下去比較
      const spaValue = showEXPSpa ? row['exp_spa'] : row['spa'];

      // 如果price(H) 跟 SPA/ALT 不相同的話，就給他黃色底色
      const isDiff =
        Utils.checkIsDiff(row.current_price, spaValue) ||
        Utils.checkIsDiff(row.current_price, row.alt_lowest_price);

      // 如果spa大於current price的話, 字會變成紅色
      const isLarge = Number(spaValue) > Number(value);

      const validDateValue = row['valid_from'];

      const spanStyle = {
        backgroundColor: isDiff && 'yellow',
        color: isLarge && 'red'
      };
      const label = commaValue ? (
        <div className="content">
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '4.5rem', textAlign: 'left', color: '#808080' }}>Valid Date </div>
            <div className="content" style={{ color: '#333333' }}>{validDateValue ? moment(validDateValue).format('YYYYMMDD') : ''}</div>
          </div>
        </div>
      ) : null;

      const valueEl = commaValue ? <span style={{ backgroundColor: isDiff && 'yellow' }}>{commaValue}</span> : null;

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
  {
    key: 'spa',
    name: 'SPA',
    width: 70,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="SPA"
            tooltip={<p>游標懸浮於SPA價錢上，可查看該價錢之料號及廠家</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      // 根據show EXP的開關，切換exp的價格
      const spaValue = showEXPSpa ? row['exp_spa'] : row['spa'];
      // exp spa 跟spa是否相同
      const isSpaDiff = Utils.checkIsDiff(row.exp_spa, row.spa);
      // 如果spa value 跟 last price不相同的話， 就給他黃色底色
      const isDiff = Utils.checkIsDiff(row.current_price, spaValue);
      // Show EXP 功能開啟後，價錢有變動者，在 SPA 後加 *
      const showStar = showEXPSpa && isSpaDiff;
      // 經過comma處理後的spa value
      const commaValue = comma(spaValue, 5);

      const valueEl = commaValue ? (
        <span style={{ backgroundColor: isDiff && 'yellow' }}>
          {commaValue}
          {showStar && <Star />}
        </span>
      ) : null;
      return (
        <SPACell
          value={valueEl}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          showEXPSpa={showEXPSpa}
        />
      );
    }
  },
  {
    key: 'avl_spa',
    name: 'AVL SPA',
    width: 100,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="AVL SPA"
            tooltip={<p>游標懸浮於SPA價錢上，可查看該價錢之料號及廠家</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      const tooltip = _get(row, 'avl_spa_other_info', {});
      const manufacturerList = JSON.parse(_get(tooltip, 'spa_manufacturer', '[]'));
      const partNumber = _get(tooltip, 'spa_partnumber', '');
      // 有底線(avl_spa_bolder = true) 代表 avl_spa 不為空 是有找到價錢的
      // 沒底線(avl_spa_bolder = false) 代表 avl_spa 為空的 就要帶 spa的資訊
      const cellStyle =  _get(row, 'avl_spa_bolder', false)
        ? { ...style, fontWeight: 'bolder', textDecoration: 'underline', }
        : style;
      return (
        <ClickHintCell
          value={comma(row[column.key], 5)}
          cellInfo={{ columnIndex, key, rowIndex, style: cellStyle }}
          helperInfo={{ row }}
          tooltipRender={() => (
            <div className="content">
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>Part Number: </div>
                <div className="content">{partNumber}</div>
              </div>
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>Manufacturer: </div>
                <div className="content">{manufacturerList.map(mf => <p style={{ marginBottom: '0rem' }}>{mf}</p>)}</div>
              </div>
            </div>
          )}
        />
      );
    }
  },
  {
    key: 'alt_lowest_price_without_main_pn',
    name: 'ALT. Lowest Cost',
    width: 150,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="ALT. Lowest Cost"
            tooltip={<p>游標懸浮於價錢上，可查看該價錢之料號及廠商</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      const value = row['alt_lowest_price_without_main_pn'];
      // 黃色底的規則： value 跟 last_price_currency_price 不一樣
      const commaValue = comma(value, 5);
      // 如果ALT 跟 current price不ㄧ樣的話就給他黃色底色
      const isDiff = Utils.checkIsDiff(row.current_price, row.alt_lowest_price_without_main_pn);
      const valueEl = commaValue ? <span style={{ backgroundColor: isDiff && 'yellow' }}>{commaValue}</span> : null;
      // 料號
      const altPartNumber = row['alt_lowest_partnumber_without_main_pn'];
      // 廠商
      const altManufacturer = row['alt_manufacturer_without_main_pn'];
      return (
        <ClickHintCell
          value={valueEl}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          tooltipRender={() => (
            <div className="content">
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Part Number: </div>
                <div className="content" style={{ color: '#333333' }}>{altPartNumber || '－'}</div>
              </div>
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Manufacturer: </div>
                <div className="content" style={{ color: '#333333' }}>{altManufacturer || '－'}</div>
              </div>
            </div>
          )}
        />
      );
    }
  },
  {
    key: 'avl_alt_without_main_pn',
    name: 'AVL ALT. Lowest Cost',
    width: 180,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomHeader: ({ columnIndex, key, rowIndex, style, sortInfo, handleSort, columnInfo }) => {
      return (
        <div className="grid-cell" key={key} style={{ ...style }}>
          <HeaderCellWithQuestionMarkAndSorter
            value="AVL ALT. Lowest Cost"
            tooltip={<p>游標懸浮於價錢上，可查看該價錢之料號及廠商</p>}
            sortInfo={sortInfo}
            handleSort={handleSort}
            columnInfo={columnInfo}
          />
        </div>
      );
    },
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode, showEXPSpa }) => {
      // 料號
      const altPartNumber = _get(row, ['avl_alt_other_info_without_main_pn', 'alt_lowest_partnumber']);
      // 廠商
      const altManufacturer = _get(row, ['avl_alt_other_info_without_main_pn', 'alt_manufacturer']);
      // 請參考 avl_spa_bolder 的註解
      const cellStyle =  _get(row, 'avl_alt_bolder_without_main_pn', false)
        ? { ...style, fontWeight: 'bolder', textDecoration: 'underline', }
        : style;
      return (
        <ClickHintCell
          value={comma(row[column.key], 5)}
          cellInfo={{ columnIndex, key, rowIndex, style: cellStyle }}
          tooltipRender={() => (
            <div className="content">
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Part Number: </div>
                <div className="content" style={{ color: '#333333' }}>{altPartNumber || '－'}</div>
              </div>
              <div className="item" style={{ display: 'flex' }}>
                <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#808080' }}>Manufacturer: </div>
                <div className="content" style={{ color: '#333333' }}>{altManufacturer || '－'}</div>
              </div>
            </div>
          )}
        />
      );
    }
  },
  {
    key: 'lpp',
    name: 'LPP',
    width: 70,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      const value = row['lpp'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },

  {
    key: 'currrent_price_adj_percentage',
    name: 'Last Price*Adj.%',
    width: 150,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: (props) => {
      // 自填，只能填整數
      // FIXME: key 會消失，只好再傳一次parentKey進去
      // 如果有填寫過 CE Cost 這個欄位要被鎖住
      const lock = Boolean(props.row['ce_cost']);
      return (
        <CurrrentPriceAdjPercentageCell {...props} parentKey={props.key} lock={lock} />
      );
    }
  },

  {
    key: 'ce_cost',
    name: 'CE Cost',
    width: 80,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: (props) => {
      // 自填，input沒有擋, 顯示價格加comma
      // FIXME: key 會消失，只好再傳一次parentKey進去
      // 如果有填寫過 Last Price*Adj.% 這個欄位要被鎖住
      const lock = Boolean(props.row['currrent_price_adj_percentage']);
      return (
        <CECostCell {...props} parentKey={props.key} lock={lock} />
      );
    }
  },

  {
    key: 'suggestion_cost',
    name: 'Suggestion Cost',
    width: 150,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      // 非自填，擋comma
      const value = row['suggestion_cost'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  {
    key: 'remark',
    name: 'Remark',
    width: 297,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: (props) => {
      // FIXME: key 會消失，只好再傳一次parentKey進去
      return (
        <RemarkCell {...props} parentKey={props.key} />
      );
    }
  },
  { key: 'qty', name: 'QTY', width: 47, justifyContent: 'flex-end', paddingLeft: 13, paddingRight: 13, sortable: true },

  {
    key: 'sub_total_lowest_price',
    name: 'Sub Total Price(L)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      // 非自填, 擋comma
      const value = row['sub_total_lowest_price'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  {
    key: 'sub_total_2nd_highest_price',
    name: 'Sub Total Price(M)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      // 非自填, 擋comma
      const value = row['sub_total_2nd_highest_price'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  {
    key: 'sub_total_last_price',
    name: 'Sub Total Price(H)',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      // 非自填, 擋comma
      const value = row['sub_total_last_price'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  {
    key: 'sub_total_suggestion_cost',
    name: 'Sub Total Suggestion Cost',
    width: 200,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      // 非自填, 擋comma
      const value = row['sub_total_suggestion_cost'];
      const commaValue = comma(value, 5);
      return (
        <BaseCell
          value={commaValue}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  { key: 'vendor', name: 'Vendor', width: 86, justifyContent: 'flex-start', paddingLeft: 13, paddingRight: 13, sortable: true },
  {
    key: 'vendor_part_no',
    name: 'Vendor Part No.',
    width: 165,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ columnIndex, key, rowIndex, style, row, column, isEditMode }) => {
      const value = row['vendor_part_no'];
      const label = value ? (
        <div>
          <div style={{ fontWeight: 500, color: '#333' }}>Vendor Part No.</div>
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }} >{value == null ? '-' : value}</div>
        </div>
      ) : null;
      return (
        <BaseCellWithTooltip
          value={value}
          cellInfo={{ columnIndex, key, rowIndex, style }}
          helperInfo={{ row }}
          label={label}
        />
      );
    }
  },
  {
    key: 'supply_type',
    name: 'Supply Type',
    width: 100,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      const value = row['supply_type'];
      const isDiff = row['supply_type_diff'];
      const cellStyle =  isDiff && value
        ? { ...style, color: '#ff0000', }
        : style;
      return  (
        <BaseCell
          value={value}
          cellInfo={{ columnIndex, key, rowIndex, style: cellStyle }}
        />
      );
    }
  },
  { key: 'avap', name: 'eEDM AVAP', width: 100, justifyContent: 'center', paddingLeft: 13, paddingRight: 13, sortable: true },
  {
    key: 'is_common_parts',
    name: 'Common Parts',
    width: 130,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    sortable: true,
    renderCustomBody: ({ row, columnIndex, key, rowIndex, style }) => {
      return (
        <BaseCell
          value={row['is_common_parts'] ? 'Y' : 'N'}
          cellInfo={{ columnIndex, key, rowIndex, style }}
        />
      );
    }
  },
  { key: 'obs', name: 'OBS', width: 40, justifyContent: 'center', paddingLeft: 13, paddingRight: 15, sortable: true },
  { key: 'exp', name: 'EXP', width: 120, justifyContent: 'center', paddingLeft: 13, paddingRight: 15, sortable: true },
];


export default columns;
