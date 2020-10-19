import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import _get from 'lodash/get';
import { Fade } from 'reactstrap';

// 功能鈕
const InfoDiv = styled.div`
.info-section {
  background: ${props => (props.isHighLight ? 'transparent' : 'white')};
  position: absolute;
  right: 0.3rem;
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    width: 1.8rem;
    margin-left: 0rem;
    margin-right: 0.3rem;
    cursor: pointer;
  }

  .nextBtn {
    width: 6rem;
    height: 1.8rem;
    border-radius: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
    font-size: 0.75rem;
    cursor: pointer;
    background: #333;
    color: white;
    &:hover {
      background: #555;
      border-color: #555;
    }
  }

  &.hidden {
    display: none
  }
}
`;

// 每筆record 資料列
const RowDiv = styled.div`
  background: ${props => (props.isHighLight ? '#CED4DB' : 'transparent')};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};

  /* 有提示訊息的cell */
  .hint-cell {
    position: relative;
    /* position: static; */

    & > p {
      > span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .hint { /* 提示訊息 */
      width: 16.1875rem;
      border-radius: 4px;
      box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      position: absolute;
      z-index: 9;
      padding: 1rem;
      left: 3rem;
      visibility: hidden;
      cursor: auto;
      &.show {
        visibility: visible;
      }
      &.fade {
        transform: all 0.15s linear;
      }
      .title {
        height: 16px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 700;
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
  }

`;

export default class TableBodyRow extends Component {
  state = {
    toggleInfo: false,
  }

  /**
   * 滑鼠離開row，就隱藏info icon
   */
  onMouseLeave = () => {
    this.setState(() => ({ toggleInfo: false }));
  }
  /**
   * 滑鼠移進row，就顯示info icon
   */
  onMouseEnter = () => {
    this.setState(() => ({ toggleInfo: true }));
  }


  handleClickTd = (e, hintRow, hintColumn) => {
    e.stopPropagation();
    this.props.onClickHint(hintRow, hintColumn);
  }

  handleClickClose = (e) => {
    e.stopPropagation();
    this.props.onClickHint(-1, '');
  }


  render() {
    const { row, isHighLight, hint, column, children } = this.props;
    return (
      <RowDiv
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className="table-tr"
        {...this.props}
        isHighlight={isHighLight}
      >
        {/* render各欄位 */}
        {row.cells.map(cell => {
          const { config = null, title } = column.filter(d => d.dataIndex === cell.id)[0];
          const isDatetime = _get(config, 'isDatetime', false);
          const format = _get(config, 'format', '');
          const isHint = _get(config, 'isHint', false);
          if (isHint) { // 有hint的cell
            return (
              <div
                className={`table-td ${cell.id} hint-cell`}
                key={cell.id}
              >
                <p>
                  <span onClick={e => this.handleClickTd(e, row.id, cell.id)} onKeyPress={null}>{cell.value || '-'}</span>
                </p>
                {/* 提示小方塊 */}
                <Fade className="hint" in={hint === cell.id} onClick={e => e.stopPropagation()}>
                  <div className="title">{title}</div>
                  <div
                    className="cross"
                    onClick={this.handleClickClose}
                    onKeyPress={null}
                  />
                  <div className="content">{cell.value}</div>
                </Fade>
              </div>
            );
          }
          if (isDatetime) {
            const value = cell.value || '';
            return ( // 一般的cell
              <div
                className={`table-td ${cell.id}`}
                key={cell.id}
              >
                <p>
                  {moment(value).format(format) || '-'}
                </p>
              </div>);
          }

          return ( // 一般的cell
            <div
              className={`table-td ${cell.id}`}
              key={cell.id}
            >
              <p>
                {cell.value || '-'}
              </p>
            </div>);
      })}
        {/* 功能按鈕 */}
        <InfoDiv isHighLight={isHighLight}>
          <div className={`${this.state.toggleInfo ? 'info-section' : 'info-section hidden'}`}>
            {children}
          </div>
        </InfoDiv>
      </RowDiv>
    );
  }
}
