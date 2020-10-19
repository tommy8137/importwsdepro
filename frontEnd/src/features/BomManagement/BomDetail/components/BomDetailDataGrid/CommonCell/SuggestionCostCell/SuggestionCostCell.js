import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _ from 'lodash';
import styled, { injectGlobal } from 'styled-components';
import { PopoverBody } from 'reactstrap';
import Popover from '~~elements/Popover';
import { comma } from '~~utils/Math';
import DownArrowIcon from '~~elements/DownArrowIcon';
import { HoverHintCell, BaseCell } from '~~elements/DataGridCommonCell';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import dropdownConfig from './DropdownConfig';

// @FIXME: 需重構!!!!!!!!!!!!!!!!!

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .popover--content--suggestion-cost {
    border: none;

    &.popover-inner {
      min-width: 10rem;
      border-radius: 4px;
      border: solid 1px #c0c0c0;
      background-color: #ffffff;
    }
    .popover-body {
      padding: 0rem;
    }
    .popover-body > .content {
      /* padding: 1rem; */
      .content__item {
        padding: 0.2rem 0.5rem;
        cursor: pointer;
        min-height: 3rem;

        &:not(:last-of-type) {
          border-bottom: 2px solid #c0c0c0;
        }
      }
      .content__item__title {
        color: #808080;
      }

      .content__item__input {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #333333;

        &:focus {
          outline: none;
          /* border-color: #00a99d; */
        }
      }

      .content__btn {
        float: right;
      }
    }
  }
`;

const SpaCostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .popover--target {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70%;
    text-align: left;
    border-radius: 4px;
    border: solid 1px #333333;
    background-color: #fff;
    &__content {
      padding: 0 3px;
      display: flex;
      align-items: center;
      width: inherit;
      justify-content: space-between;
      /* break line */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

function SuggestionCostCell(props) {
  const { value, cellInfo, helperInfo, onClick } = props;
  const { columnIndex, key, rowIndex, style } = cellInfo;
  const { isEditMode, row } = helperInfo;
  const compareCostType = (originTypeKey) => {
    const isChooseAutoLowest = (!originTypeKey || originTypeKey === 'auto_lowest_cost');
    if (isChooseAutoLowest && !row['lowest_cost']) {
      return 'auto_lowest_cost';
    }
    return (isChooseAutoLowest ? row['lowest_cost'] : originTypeKey);
  };
  const suggestionCostType = _get(row, 'suggestion_cost_type', null);
  const costType = compareCostType(suggestionCostType);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let refId = `table-grid-suggestion-popover-id-${key}`;
  const targetRef = useRef();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [isEditMode, key]);

  const handleClick = (dropdownItem) => {
    // console.log('你選到的type是', dropdownItem);
    const { key: selectedKey, price: pricePath, title } = dropdownItem;
    // 更新資料
    props.updateMEBomTableCellById(row.id, 'suggestion_cost_type', selectedKey);
    props.updateMEBomTableCellById(row.id, 'ce_cost_up', _get(row, pricePath, title));
    // 關窗
    setIsDropdownOpen(false);
  };

  // 有子階就不能修改，直接顯示suggestion_cost 而且要有hover
  if (!isEditMode && !!row.suggestion_cost_type) {
    // suggestion_cost_type的種類
    const tooltipItems = {
      current_price: 'CBG Price ',
      spa_cost: 'SPA Cost',
      sourcer_cost: 'Sourcer Cost (U/P)',
      partlist_cost: 'Clean Sheet Cost (U/P)',
      ce_ship: 'CE 運包',
      ce_pl: 'CE P/L',
      ce_assembly: 'CE 組工',
      sublevel_total: '子階建議總價',
      inquiry_cost: 'Inquiry Cost',
    };

    // Tooltip 顯示的設定
    const tooltip = _get({
      // Last Price
      last_price: [
        { price: 'tooltip.last_price.total_cost', title: tooltipItems.current_price },
      ],
      // Clean Sheet Cost (U/P)
      clean_sheet_cost: [
        { price: 'tooltip.clean_sheet_cost.clean_sheet_cost_up', title: tooltipItems.partlist_cost },
        { price: 'tooltip.clean_sheet_cost.ce_shipping', title: tooltipItems.ce_ship },
        { price: 'tooltip.clean_sheet_cost.ce_pl', title: tooltipItems.ce_pl },
      ],
      // SPA Cost
      spa_cost: [
        { price: 'tooltip.spa_cost.total_cost', title: tooltipItems.spa_cost },
      ],
      // Inquiry Cost (U/P)
      inquiry_cost: [
        { price: 'tooltip.inquiry_cost.inquiry_cost_up', title: tooltipItems.inquiry_cost },
        // { price: 'tooltip.inquiry_cost.ce_shipping', title: tooltipItems.ce_ship },
        // { price: 'tooltip.inquiry_cost.ce_pl', title: tooltipItems.ce_pl },
        // { price: 'tooltip.inquiry_cost.ce_assembly', title: tooltipItems.ce_assembly },
      ],
      // CE Cost組立價 (U/P)
      ce_cost_assembly: [
        { price: 'tooltip.ce_cost_assembly.sub_suggestion_cost', title: tooltipItems.sublevel_total },
        { price: 'tooltip.ce_cost_assembly.ce_shipping', title: tooltipItems.ce_ship },
        { price: 'tooltip.ce_cost_assembly.ce_pl', title: tooltipItems.ce_pl },
        { price: 'tooltip.ce_cost_assembly.ce_assembly', title: tooltipItems.ce_assembly },
      ],
      sourcer_cost: [
        { price: 'tooltip.sourcer_cost.total_cost', title: tooltipItems.sourcer_cost },
      ],
    }, compareCostType(row.suggestion_cost_type), [{ price: '-', title: '-' }]);


    return (
      <HoverHintCell
        onClick={onClick}
        value={value}
        cellInfo={{ columnIndex, key, rowIndex, style }}
        helperInfo={{ row }}
        tooltipRender={() => (
          <div className="content">
            {tooltip.map((item, idx) => {
            return (
              <div className="item" key={`${row.key}_${row.item}_${idx}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="title" style={{ minWidth: '4rem', textAlign: 'left', color: '#9f9f9f' }}>{item.title}</div>
                <div className="content" style={{ minWidth: '2rem', textAlign: 'right' }}>${comma(_get(row, item.price), 5, 0)}</div>
              </div>);
            })}
          </div>
        )}
      />
    );
  }

  // https://github.com/reactstrap/reactstrap/issues/773
  if (isEditMode) {
    const findItem = o => o.key === costType;
    const choosenItem = _.chain(dropdownConfig)
      .find(findItem)
      .get('title')
      .value();
    return (
      <div className="grid-cell" key={key} style={style} ref={targetRef}>
        <SpaCostContainer>
          {/* 顯示 */}
          <div
            id={refId}
            className="popover--target"
            onClick={() => setIsDropdownOpen(prevState => !prevState)}
            onKeyUp={() => { }}
          >
            <div className="popover--target__content">
              <div>{!costType ? 'Select cost' : comma(value, 4, choosenItem)}</div>
              <DownArrowIcon />
            </div>
          </div>
          {/* 下拉 */}
          {targetRef.current &&
          <Popover
            boundariesElement="window"
            className="popover--content--suggestion-cost"
            placement="bottom-start"
            isOpen={isDropdownOpen}
            target={refId}
            innerClassName="popover--content--suggestion-cost"
            hideArrow
          >
            <PopoverBody>
              <div className="content">
                {dropdownConfig
                  .filter(d => !(!row.haschild && d.needChild)) // 最底層不能有子階建議價的item
                  .map(item => {
                  return (
                    <div className="content__item" onClick={() => handleClick(item)} onKeyUp={() => { }}>
                      <div className="content__item__title">{item.title}</div>
                      <div className="content__item__value">{comma(_get(row, item.price, null))}</div>
                    </div>
                  );
                })}
              </div>
            </PopoverBody>
          </Popover>}
        </SpaCostContainer>
      </div>
    );
  }
  return (<BaseCell
    onClick={onClick}
    value={comma(row['ce_cost_up'])}
    cellInfo={cellInfo}
  />);
}


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  updateMEBomTableCellById: BomDetailActions.updateMEBomTableCellById,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionCostCell);

