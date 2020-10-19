import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './TableStyles';


const denormalize = (rowIds, rowsById, cellsById) => {
  return rowIds.map(id => ({
    ...rowsById[id],
    cells: rowsById[id].cells.map(cellId => cellsById[cellId]),
  }));
};


export default class DataTable extends Component {
  static propTypes = {

    /**
     * dataIndex: 要用哪個key抓出api資料的value。可以不填，因為這個欄位也可能是由n個key的資料組合起來的，不填的時候，要使用renderCell來表示render的規則
     * renderCell: 客製化cell要render的東西。和dataIndex是相對的，如果有renderCell就會先以renderCell為準
     * key: unique的對column命名
     * title: 要顯示在畫面上的header名稱
     * sortable: 可不可以排序
     * sortOrder: null: 重未排過 | asc: 正排 | desc: 反排
     */
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        dataIndex: PropTypes.string,
        renderCell: PropTypes.func,
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        sortable: PropTypes.bool.isRequired,
        sortOrder: PropTypes.oneOf([null, 'asc', 'desc']),
      })).isRequired,
    /**
     *  table的資料
     * */
    rows: PropTypes.arrayOf(PropTypes.shape).isRequired
  }
  handleSortBy = headerKey => () => {
    console.log('???????', headerKey);
  };

  render() {
    const { rows, headers } = this.props;
    const renderProps = {
      // // Data derived from state
      // rows: denormalize(filteredRowIds, rowsById, cellsById),
      // headers: this.props.headers,
      // selectedRows: denormalize(this.getSelectedRows(), rowsById, cellsById),
      // // Prop accessors/getters
      // getHeaderProps: this.getHeaderProps,
      // getRowProps: this.getRowProps,
      // getSelectionProps: this.getSelectionProps,
      // getBatchActionProps: this.getBatchActionProps,
      // // Custom event handlers
      // onInputChange: this.handleOnInputValueChange,
      // Expose internal state change actions
      rows: rows.map(row => {
        return {
          ...row,
          cells: headers.map(header => {
            let value;
            if (header.renderCell) {
              value = header.renderCell(row);
            } else {
              value = row[header.dataIndex];
            }
            return {
              value,
              id: header.key,
            };
          })
        };
      }),
      headers,
      sortBy: headerKey => this.handleSortBy(headerKey)(),
    };

    // if (render !== undefined) {
    //   return render(renderProps);
    // }
    return <styles.TableWrapper>{this.props.children(renderProps)}</styles.TableWrapper>;
  }
}


// https://github.com/IBM/carbon-components-react/blob/master/src/components/DataTable/tools/denormalize.js
// https://github.com/IBM/carbon-components-react/blob/master/src/components/DataTable/DataTable.js
// https://github.com/IBM/carbon-components-react/blob/master/src/components/DataTable/tools/normalize.js
// https://medium.com/carbondesign/data-table-updates-in-carbon-react-v5-22-0-6da0c24a96d6
