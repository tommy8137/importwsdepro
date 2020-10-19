import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Collapse } from 'reactstrap';
import RoundButton from '~~elements/RoundButton';
import Icon, { IconName } from '~~elements/Icon';

const hintDisplay = keyframes`
  from {
      visibility: hidden;
      opacity: 0;
      left: 3rem;
  }
  to {
      visibility: visible;
      opacity: 1;
      left: 4rem;
  }
`;

// 每筆record 資料列
const RowDiv = styled.div`
  background: ${props => (props.isHighLight ? '#CED4DB' : 'transparent')};

  .hint-cell { /* 有提示訊息的cell */
    position: relative;
    width: 100%;
    cursor: pointer;
    .table-td {
      width: 100%;
    }
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .hint { /* 提示訊息 */
      width: 16.1875rem;
      border-radius: 4px;
      box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      position: absolute;
      z-index: 9;
      padding: 1rem;
      visibility: hidden;
      opacity: 0;
      left: 3rem;
      cursor: normal;
      .title {
        height: 16px;
        font-family: Roboto;
        font-size: 1rem;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #333333;
      }
      .content {
        margin-top: 8px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #333333;
        word-break: break-all;
      }
      .cross {
        background: #E9E9E9;
        position: absolute;
        right: 1rem;
        top: 1rem;
        border-radius: 100%;
        height: 20px;
        width: 20px;
        cursor: pointer;
        &:after {
          content: "";
          display: block;
          height: 0;
          left: 4px;
          top: 10px;
          width: 12px;
          transform: rotate(45deg);
          position: absolute;
          background: #939393;
          border: 0.5px solid #939393;
        }
        &:before {
          content: "";
          display: block;
          height: 0;
          left: 4px;
          top: 10px;
          width: 12px;
          transform: rotate(-45deg);
          background: #939393;
          border: 0.5px solid #939393;
          position: absolute;
        }
      }
    }
    & .active {
      animation: ${hintDisplay} .3s ease-in;
      animation-fill-mode: forwards;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  /* Add New的按鈕 */
  .functions {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    right: -1%;
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: .3s ease all;
    &.active {
      transition: .3s ease all;
      right: 6%;
      visibility: visible;
      opacity: 1;
    }
    .btn {
      height: 2rem;
    }
  }

  /* 展開、資料筆數 */
  .expand {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 1.25rem;
    top: 0;
    align-items: center;
    height: 100%;
    width: 3rem;
    .count {
      font-size: 1rem;
    }
    .arrow {
      width: 0.8rem;
    }
  }
`;

export default class ProjectRow extends Component {
  state = {
    toggleInfo: false, // Hint
    hover: false,
    collapse: false,
  }


  handleClickTd = (e, hintRow, hintColumn) => {
    e.stopPropagation();
    this.props.onClickHint(hintRow, hintColumn);
  }

  handleClickClose = (e) => {
    e.stopPropagation();
    this.props.onClickHint(-1, '');
  }

  // 點內容列表  直接進入已經combined過的detail頁面
  handleClickRow = (e) => {
    const { row } = this.props;
    this.props.onClickRow(row);
  }

  // 點Add鈕  打開version的modal
  handleClickAdd = (e) => {
    e.stopPropagation();
    const { row } = this.props;
    this.props.onClickAdd(row);
  }
  handleMouseEnter = (e) => {
    this.setState({
      hover: true,
    });
  }
  handleMouseLeave = (e) => {
    this.setState({
      hover: false,
    });
  }

  toggleCollapse = (e) => {
    e.stopPropagation();
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse
    });
  }


  render() {
    const { row, isHighLight, hintCellsKey, hint, compositeCellKey, children } = this.props;
    const { hover, collapse } = this.state;
    const isHintCell = id => hintCellsKey.includes(id);
    const isComposite = id => compositeCellKey.includes(id);
    const collapseLength = row.detail.length;

    return (
      <Fragment>
        <RowDiv
          className="table-tr"
          style={{ cursor: 'pointer' }}
          {...this.props}
          isHighlight={isHighLight}
          onClick={this.toggleCollapse}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {/* render各欄位 */}
          {
          row.cells.map((cell) => {
          // 有hint的欄位
          if (isHintCell(cell.id) && (cell.value)) {
            return (
              <div
                className={`hint-cell ${cell.id}`}
                key={cell.id}
                onClick={e => this.handleClickTd(e, `${row.me_id}_${row.ee_id}`, cell.id)}
                onKeyPress={null}
              >
                <div className="table-td">
                  {cell.value || '-'}
                </div>
                <div className={`hint ${hint === cell.id ? 'active' : ''}`}>
                  <div className="title">
                    { cell.id === 'version_remark' ? 'Version Remark (EE)' : 'SKU Description (ME)' }
                  </div>
                  <div
                    className="cross"
                    onClick={this.handleClickClose}
                    onKeyPress={null}
                  />
                  <div className="content">{cell.value}</div>
                </div>
              </div>);
          }

          // 有ME/EE的欄位
          if (isComposite(cell.id)) {
            const { me, ee } = cell.value;
            return (
              <div
                className={`table-td ${cell.id}`}
                key={cell.id}
                title={`${ee || '-'}/${me || '-'}`}
              >
                {ee || '-'}/{me || '-'}
              </div>);
          }

          // 一般欄位
          return (
            <div
              className={`table-td ${cell.id}`}
              key={cell.id}
              title={cell.value || '-'}
            >
              {cell.value || '-'}
            </div>);
        })
        }

          <div className={`functions ${hover ? 'active' : ''}`}>
            <RoundButton.BlackButton onClick={this.handleClickAdd}>
            Add New
            </RoundButton.BlackButton>
          </div>
          <div className="expand">
            <div className="count">({collapseLength})</div>
            {!!collapseLength &&
              <div className="arrow" onClick={this.toggleCollapse} onKeyPress={null}>
                <Icon icon={IconName.IconArrowDownBlack} size="16px" />
              </div>}
          </div>
        </RowDiv>
        {/* project version組合展開的部份 */}
        <Collapse isOpen={collapse}>
          {children}
        </Collapse>
      </Fragment>
    );
  }
}
