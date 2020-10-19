import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

// 每筆record 資料列
const RowDiv = styled.div`
  background: #F0F0F0;
  height: 3.125rem;
  padding: .3rem;
  border-bottom: 1px solid #d7d7d7;
  padding-left: 6.25rem;
  cursor: pointer;
  position: relative;
  display: flex;

  .info-box {
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-of-type) {
      margin-right: 2.8125rem;
    }
    .label {
      margin-right: 1.25rem;
      font-size: 0.875rem;
      color: #808080;
    }
    .content {
      font-weight: 500;
      color: #333333;
      min-width: 7.5rem;
    }
  }
`;

export default class ProjectRow extends Component {
  // 點內容列表  直接進入已經combined過的detail頁面
  handleClickRow = (e) => {
    const { data } = this.props;
    this.props.onClickRow(data);
  }

  render() {
    const { data: { ee, me, create_time: createTime } } = this.props;
    return (
      <RowDiv
        key={uuidv4()}
        // className="table-tr"
        {...this.props}
        onClick={this.handleClickRow}
      >
        {/* EE sku / version */}
        <div className="info-box">
          <div className="label">EE SKU/Version</div>
          <div className="content">{ee.sku || '-'}/{ee.version || '-'}</div>
        </div>
        {/* ME sku / version */}
        <div className="info-box">
          <div className="label">ME SKU/Version</div>
          <div className="content">{me.sku || '-'}/{me.version || '-'}</div>
        </div>
        {/* create time */}
        <div className="info-box">
          <div className="label">Create Time</div>
          <div className="content">{createTime ? moment(createTime).format('MM/DD/YY HH:mm') : '-'}</div>
        </div>
      </RowDiv>
    );
  }
}
