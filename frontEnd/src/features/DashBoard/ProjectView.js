import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Fade } from 'reactstrap';

import Pagination from '~~elements/Pagination';
import Table from '~~elements/Table';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import checkingRbac from '~~hoc/CheckingRbac';

import { FilterBar, VersionModal } from './component';
import * as DashBoardActions from './DashBoardActions';
import { columns, expandingColumns } from './ColumnSetting';

const Div = styled.div`
.upper-area {
  width: 95%;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem 0px 0.55rem;
  margin: auto;
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
.table-container {
  width: 95%;
  margin: auto;
  .table-area {
    background-color: white;
  }
}


.pagination {
  margin: 2.5rem 0rem;
  display: flex;
  justify-content: center;
}
`;
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
      expandedRows: state.dashBoard.expandedRows,
    };
  },
  {
    setExpandedRow: DashBoardActions.setExpandedRow,
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
      isSearch: false,
      isFilter: false,
    };
  }

  componentDidMount() {
    this.props.getProjectList();
    this.props.getFilterList();
  }

  /**
   * 取得展開的row table
   */
  getEeExpandedRow = (record, index, indent, expanded) => {
    const { detail } = record;
    return detail.length ? (
      <Table
        headerHeight="35px"
        tableBodyColor="gray"
        headerColor="gray"
        dataSource={detail}
        columns={expandingColumns({ ...this.props })}
        pagination={false}
        onRow={(rec, rowIndex) => ({
          onClick: event => {
            this.handleClickDetail(rec);
          },
        })}
      />) : (null);
  }
  /**
   * 關閉verison modal
   */
  handleClickCancelVersion = (e) => {
    this.props.closeVersionModal();
  }
  /**
   * 關閉verison modal
   */
  handleClickChoose = (selectedVersions, projectCode) => {
    this.props.chooseVersion(selectedVersions, projectCode);
  }
  /**
   * 展開row之後， 點擊進入dashboard內頁
   * @param {} record 傳入點擊的那一列record
   */
  handleClickDetail = (record) => {
    const { id } = record;
    this.props.history.push(`/g/board/dashboard/${id}`);
  }
  /**
   * 當頁碼改變時
   * @param {} currentPage 目前第幾頁
   * @param {} pageSize 總共幾頁
   */
  handlePageChange = (currentPage, pageSize) => {
    this.props.setFilterCondition({ currentPage, pageSize });
    this.props.getProjectList();
    this.props.setExpandedRow([]);
  }

  // 真正的搜尋在component裡，這裡只做筆數顯示
  handleSetSearch = (searchStatus) => {
    this.setState({
      ...searchStatus
    });
  }
  /**
   * 展開row
  * @param {} event click event
  * @param {} event record 點擊的那一列
  * @param {} rowIndex  點擊的那一列的index
   */
  handleChangeExpandingRows = (event, record, rowIndex) => {
    const { setExpandedRow, expandedRows } = this.props;
    if (!record.detail.length) return;
    if (expandedRows.includes(rowIndex)) {
      const newkeys = expandedRows.filter(item => item !== rowIndex);
      setExpandedRow(newkeys);
    } else {
      const newkeys = [...expandedRows, rowIndex];
      setExpandedRow(newkeys);
    }
  }
  render() {
    const { isSearch, isFilter } = this.state;
    const {
      isVersionOpen,
      versions,
      projectList,
      searchInfo: { currentPage, totalDataCount, pageSize, keyword, lv2 },
      alertMsg,
      resetAlert,
      expandedRows
    } = this.props;

    const extendsProps = {
      ...this.props,
      handleClickAddNew: this.props.getVersions,
    };

    return (
      <Div>
        <div className="upper-area">
          <FilterBar onFilter={this.handleSetSearch} />
          {/* <SearchBar onSearch={this.handleSetSearch} /> */}
          <Fade in={!!((keyword || lv2) && isFilter)} className="result-count">
            <p>
              (有{totalDataCount.toLocaleString('zh-tw')}筆結果符合)
            </p>
          </Fade>
        </div>
        <div className="table-container">
          <div className="table-area">
            <Table
              headerColor="black"
              dataSource={projectList}
              columns={columns(extendsProps)}
              pagination={false}
              defaultExpandAllRows={true}
              expandedRowRender={this.getEeExpandedRow}
              expandIconAsCell={false}
              expandIcon={() => null}
              expandedRowKeys={expandedRows}
              indentSize={0}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => this.handleChangeExpandingRows(event, record, rowIndex),
                };
              }}
            />
          </div>
          <div className="pagination">
            <Pagination
              pageSize={pageSize}
              total={totalDataCount}
              currentPage={currentPage}
              onChange={this.handlePageChange}
            />
          </div>
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
              color="transparentInModal"
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
