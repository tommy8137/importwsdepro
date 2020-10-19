import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Fade } from 'reactstrap';

import CommonUtils from '~~utils/CommonUtils';
import Pagination from '~~elements/Pagination';
import Table from '~~elements/DataTable';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import checkingRbac from '~~hoc/CheckingRbac';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import { SearchBar, FilterBar, VersionModal, Project, Version } from './component';
import * as DashBoardActions from './DashBoardActions';

const Div = styled.div`
.upper-area {
  padding: 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  .result-count {
    font-size: 0.875rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    margin-left: 1rem;
    height: 2.5rem;
    width: 10rem;
    color: #808080;
    position: relative;
    display: flex;
    align-content: flex-end;
    p {
      position: absolute;
      bottom: 0;
      margin-bottom: 0;
      line-height: 1rem;
    }
  }
}
.table-area {
  // header的css
  .table-thead {
    border: 0.4rem solid #e6e6e6;
    font-size: 0.875rem;
    .table-th {
      padding: 0rem 0.5rem;

      .customer {
        max-width: 8%;
      }
      .project_name {
        max-width: 10%;
      }
      .project_code {
        max-width: 12%;
      }
      .stage {
        max-width: 9%;
      }
      .version {
        max-width: 18%;
      }
      .version_remark {
        max-width: 16%;
      }
      .sku_description {
        max-width: 16%;
      }
    }
  }


  // 橫排的css
  .table-td {
    font-size: 1rem;
    padding: 0rem 0.5rem;
    text-overflow: ellipsis;
    /* width: 100%; */
    overflow: hidden;
    white-space: nowrap;
  }
  .customer {
    max-width: 8%;
  }
  .project_name {
    max-width: 10%;
  }
  .project_code {
    max-width: 12%;
  }
  .stage {
    max-width: 11%;
  }
  .version {
    max-width: 16%;
  }
  .version_remark {
    max-width: 16%;
  }
  .sku_description {
    max-width: 16%;
  }


  .table-tbody {
    background: #ffffff;
    .table-tr {
      padding: .3rem;
      border-bottom: 1px solid #d7d7d7;
    }
  }
}

.pagination {
  margin: 2.5rem 0rem;
  display: flex;
  justify-content: center;
}
`;

const headerBase = [
  { dataIndex: 'customer', key: 'customer', title: 'Customer', sortable: false, sortOrder: null },
  { dataIndex: 'project_name', key: 'project_name', title: 'Project Name', sortable: false, sortOrder: null },
  { dataIndex: 'project_code', key: 'project_code', title: 'Project Code', sortable: false, sortOrder: null },
  { dataIndex: 'stage', key: 'stage', title: 'Stage (EE/ME)', sortable: false, sortOrder: null },
  { dataIndex: 'version', key: 'version', title: 'Version (EE/ME)', sortable: false, sortOrder: null },
  { dataIndex: 'version_remark', key: 'version_remark', title: 'Version Remark (EE)', sortable: false, sortOrder: null },
  { dataIndex: 'sku_description', key: 'sku_description', title: 'SKU Description (ME)', sortable: false, sortOrder: null },
];

const allowList = [
  ['List', 'allow', 'dashboard']
];
@connect(
  (state) => {
    return {
      projectList: state.dashBoard.projectList,
      versions: state.dashBoard.versions,
      isVersionOpen: state.dashBoard.isVersionOpen,
      searchInfo: state.dashBoard.searchInfo,
      alertMsg: state.dashBoard.alertMsg,
    };
  },
  {
    getProjectList: DashBoardActions.getProjectList,
    getFilterList: DashBoardActions.getFilterList,
    setFilterCondition: DashBoardActions.setFilterCondition,
    getListDetail: DashBoardActions.getListDetail,
    // 版本
    getVersions: DashBoardActions.getVersions,
    closeVersionModal: DashBoardActions.closeVersionModal,
    chooseVersion: DashBoardActions.chooseVersion,
    resetAlert: DashBoardActions.resetAlert,
  }
)

@checkingRbac(allowList)
export default class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintRow: -1,
      hintColumn: '',
      isSearch: false,
      isFilter: false,
    };
  }

  componentDidMount() {
    this.props.getProjectList();
    this.props.getFilterList();
  }

  handleClickHint = (hintRow, hintColumn) => {
    this.setState({
      hintRow,
      hintColumn,
    });
  }

  resetHint = () => {
    this.setState({
      hintRow: -1,
      hintColumn: ''
    });
  }

  handleClickCancelVersion = (e) => {
    this.props.closeVersionModal();
  }

  handleClickChoose = (selectedVersions, projectCode) => {
    this.props.chooseVersion(selectedVersions, projectCode);
  }
  handleClickDetail = (row) => {
    const { id } = row;
    this.props.history.push(`/g/board/dashboard/${id}`);
  }

  handlePageChange = (currentPage, pageSize) => {
    this.props.setFilterCondition({ currentPage, pageSize });
    this.props.getProjectList();
  }

  // 真正的搜尋在component裡，這裡只做筆數顯示
  handleSetSearch = (searchStatus) => {
    this.setState({
      ...searchStatus
    });
  }

  render() {
    const { hintRow, hintColumn, isSearch, isFilter } = this.state;
    const {
      isVersionOpen,
      versions,
      projectList,
      searchInfo: { currentPage, totalDataCount, pageSize, keyword, lv2 },
      alertMsg,
      resetAlert
    } = this.props;

    return (
      <Div>
        <div className="upper-area">
          <FilterBar onFilter={this.handleSetSearch} />
          <SearchBar onSearch={this.handleSetSearch} />
          <Fade in={!!((keyword || lv2) && (isSearch || isFilter))} className="result-count">
            <p>
                (有{totalDataCount.toLocaleString('zh-tw')}筆結果符合)
            </p>
          </Fade>
        </div>

        <div className="table-area">
          <Table rows={projectList} headers={headerBase}>
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
                              // onSortChange={this.onSortChange}
                              key={item.key}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="table-tbody">
                      {
                        rows.map(row => (
                          <Project
                            row={row}
                            key={`${row.me_id}_${row.ee_id}`}
                            hintCellsKey={['version_remark', 'sku']}
                            onClickHint={this.handleClickHint}
                            hint={`${row.me_id}_${row.ee_id}` === hintRow ? hintColumn : ''}
                            compositeCellKey={['stage', 'version']}
                            onClickAdd={this.props.getVersions}
                            // onClickRow={this.handleClickDetail} // FIXME: 要改成將toggle的存起來，以便detail返回時可以維持狀態
                          >
                            {
                              // 版本資料
                              row.detail.map((data, idx) => (
                                <Version
                                  key={idx}
                                  data={data}
                                  onClickRow={this.handleClickDetail}
                                />
                              ))
                            }
                          </Project>))
                      }
                    </div>

                  </div>
                </div>
              );
            }}
          </Table>
        </div>
        <div className="pagination">
          <Pagination
            pageSize={pageSize}
            total={totalDataCount}
            currentPage={currentPage}
            onChange={this.handlePageChange}
          />
        </div>

        <VersionModal
          isOpen={isVersionOpen}
          versions={versions}
          onClickCancel={this.handleClickCancelVersion}
          onClickChoose={this.handleClickChoose}
        // onDetailChange={data => this.props.updateBomDetail(data)}
        // onClickSave={() => this.props.doEditBom()}
        />

        <Alert isOpen={alertMsg} type="alarm">
          <div className="row">{alertMsg}</div>
          <div className="row">
            <Button
              color="auto"
              border={false}
              onClick={() => resetAlert()}
            >
            離開
            </Button>
          </div>
        </Alert>
      </Div>
    );
  }
}
