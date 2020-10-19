import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sorter from './Sorter';

const Div = styled.div`
  &:hover {
    .initial {
      display: block;
    }
  }
  .initial {
    display: none;
  }
`;

export default class TableHeaderColumn extends Component {
  static propTypes = {
    data: PropTypes.shape({
      // 要用哪個key抓出api資料的value。
      // 可以不填，因為這個欄位也可能是由n個key的資料組合起來的，不填的時候，要使用renderCell來表示render的規則
      dataIndex: PropTypes.string,
      renderCell: PropTypes.func,
      // unique的對column命名
      key: PropTypes.string.isRequired,
      // 要顯示在畫面上的header名稱
      title: PropTypes.string.isRequired,
      // 可不可以排序
      sortable: PropTypes.bool.isRequired,
      // null: 重未排過 | asc: 正排 | desc: 反排
      // sortOrder: PropTypes.string.isRequired,
      sortOrder: PropTypes.oneOf([null, 'asc', 'desc']),
    }).isRequired,
    // 排序發生改變的時候的callback
    onSortChange: PropTypes.func
  }

  static defaultProps = {
    onSortChange: () => { }
  }

  handleSwitchOrder = () => {
    const { dataIndex, sortOrder } = this.props.data;
    const newSortOrder = sortOrder === null || sortOrder === 'desc' ? 'asc' : 'desc';
    console.log('[handleSwitchOrder]===============> :', this.props.data, newSortOrder);
    this.props.onSortChange(newSortOrder, dataIndex);
  }
  render() {
    const { dataIndex, title, sortable, sortOrder } = this.props.data;
    return (
      <div className={`table-th ${dataIndex}`}>
        <Div
          className="title"
          onClick={sortable ? this.handleSwitchOrder : null}
          onKeyUp={() => { }}
        // onMouseDown={this.handle}
        >
          {title}
          <Sorter
            sortable={sortable}
            sortOrder={sortOrder}
            onSwitchSortOrder={(newSortOrder) => (sortable ? this.props.onSortChange(newSortOrder, dataIndex) : null)}
          >
            <Sorter.Asc />
            <Sorter.Desc />
            <div className="initial"><Sorter.Initial /></div>
          </Sorter>
        </Div>
      </div>
    );
  }
}
