import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import * as R from 'ramda';

import Table from '~~elements/DataTable';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import CommonUtils from '~~utils/CommonUtils';
import checkingRbac from '~~hoc/CheckingRbac';
import TableBodyRow from './TableBodyRow';
import * as CostgeneratorDatabaseActions from './CostGeneratorDatabaseActions';
import Folders from './Folders';

const Div = styled.div`
  .folder-section {
    // margin: 1rem 2rem;
  }

  .table {
    background: #f7f7f7;
    padding: 0rem 1.5rem 1.5rem;
    border-radius: 0.3rem;
    letter-spacing: 1px;
  }

  .table-thead {
    margin: 1rem 0rem 0.2rem 0rem;
    border: 0.4rem solid #f7f7f7;
    .table-th {
      padding: 0rem 1rem;
      &.tableName {
        width: 10rem;
      }
    }
  }

  .table-td {
    padding: 0rem 1rem;
    &.tableName {
      width: 10rem;
    }
  }

  .table-tbody {
    background: #e6e6e6;
    .table-tr {
      border: 0.4rem solid #e6e6e6;
      &:hover {
        background: #f7f7f7
        border: 0.4rem solid #e6e6e6;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }

`;

const headerBase = [
  { dataIndex: 'tableName', key: 'tableName', title: 'Item', sortable: true, sortOrder: null },
  { dataIndex: 'updateBy', key: 'updateBy', title: 'Update By', sortable: true, sortOrder: null },
  { dataIndex: 'updateDate', key: 'updateDate', title: 'Update Date', sortable: true, sortOrder: null },
  { dataIndex: 'version', key: 'version', title: 'Version', sortable: true, sortOrder: null },
];

const allowList = [
  ['Edit', 'allow', 'cleansheet.me.cal.thermal-module']
];

@connect(
  (state) => {
    return {
      tableTypeList: state.costgeneratorDatabase.tableTypeList,
      contentTables: state.costgeneratorDatabase.contentTables,
      activeTableType: state.costgeneratorDatabase.activeTableType,
      sortInfo: state.costgeneratorDatabase.sortInfo,
    };
  },
  {
    getTableTypeList: CostgeneratorDatabaseActions.getTableTypeList,
    getContentTables: CostgeneratorDatabaseActions.getContentTables,
    updateActiveTableType: CostgeneratorDatabaseActions.updateActiveTableType,
    updateSortInfo: CostgeneratorDatabaseActions.updateSortInfo,
    download: CostgeneratorDatabaseActions.download,
    upload: CostgeneratorDatabaseActions.upload,
  }
)

@checkingRbac(allowList)
export default class Database extends Component {
  componentDidMount() {
    this.props.getTableTypeList();
  }

  componentWillReceiveProps(nextProps) {
    // 改變activeTableType就找新的content tables
    if (nextProps.activeTableType !== this.props.activeTableType) {
      this.props.getContentTables({
        type: nextProps.activeTableType,
        orderBy: CommonUtils.genOrderByFormat(this.props.sortInfo),
      });
    }
  }

  onSortChange = (sortOrder, dataIndex) => {
    const tmpSortedInfo = R.map(
      R.when(R.propEq('dataIndex', dataIndex), R.assoc('sortOrder', sortOrder)),
    )(this.props.sortInfo);
    let updatedSortedInfo = [];
    if (!tmpSortedInfo.find(item => item.dataIndex === dataIndex)) {
      updatedSortedInfo = [
        // ...tmpSortedInfo,
        {
          sortOrder,
          dataIndex
        }
      ];
    } else {
      updatedSortedInfo = tmpSortedInfo;
    }
    this.props.updateSortInfo(updatedSortedInfo);
    this.props.getContentTables({
      type: this.props.activeTableType,
      orderBy: CommonUtils.genOrderByFormat(updatedSortedInfo),
    });
  }

  handleTableTypeChange = (tableType) => {
    this.props.updateActiveTableType(tableType);
  }

  handleUpload = (tableName, file) => {
    const { activeTableType } = this.props;
    this.props.upload(activeTableType, tableName, file);
  }

  handleDownload = (tableName) => {
    const { activeTableType } = this.props;
    this.props.download(activeTableType, tableName);
  }

  render() {
    // console.log('PROPS >>>', this.props);
    const headersFormat = headerBase.map(item => {
      const info = item.dataIndex && this.props.sortInfo.find(d => d.dataIndex === item.dataIndex);
      if (info) {
        return {
          ...item,
          sortOrder: info.sortOrder
        };
      }
      return item;
    });
    return (
      <Div>
        <div className="folder-section">
          <Folders
            tableTypeList={this.props.tableTypeList}
            handleTableTypeChange={this.handleTableTypeChange}
            activeTableType={this.props.activeTableType}
          />
        </div>
        <Table rows={this.props.contentTables} headers={headersFormat}>
          {({ rows, headers, ...rest }) => {
            return (
              <div>
                <div className="table">
                  <div className="table-thead">
                    <div className="table-tr">
                      {headers.map(item => {
                        return (
                          <TableHeaderColumn
                            data={item}
                            onSortChange={this.onSortChange}
                            key={item.key}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="table-tbody">
                    {
                      rows.map(row => {
                        return (
                          <TableBodyRow
                            row={row}
                            upload={this.handleUpload}
                            download={this.handleDownload}
                            key={uuid.v4()}
                          />
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            );
          }}
        </Table>
      </Div>
    );
  }
}
