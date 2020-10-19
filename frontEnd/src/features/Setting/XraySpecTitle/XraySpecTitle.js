import React, { useEffect } from 'react';
import styled from 'styled-components';
import Table from '~~elements/DataTable';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import { connect } from 'react-redux';
import checkingRbac from '~~hoc/CheckingRbac';
import TableBodyRow from './TableBodyRow';
import * as XraySpecTitleActions from './XraySpecTitleActions';
import FilterBar from './components/FilterBar';

const Div = styled.div`
background: #f2f2f2;
margin: 2rem 6rem;
border: 1px solid rgba(0, 0, 0, 0.1);
border-bottom: none;
.pageTitle {
  color: rgba(0,0,0,0.75);
  padding: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.searchBarArea{
    display: flex;
    align-items: center;
    margin: 1rem;
}
.table-area {
  letter-spacing: 1px;
  > div {
    width: 100%;
  }
  .table{
    margin: 0rem;
  }
  // header的css
  .table-thead {
    background: #7790ab;
    opacity: 1;
    color: white;
    .title{
      border: none;
    };
    .table-th {
      padding: 0.8rem 1.5rem;
      &.spec_no {
        max-width: 10%;
      }
      &.title {
        max-width: 48%;
      }
      &.edit_by {
        max-width: 16%;
      }
     &.edit_time {
        max-width: 16%;
      }
    }
  }

  // 橫排的css
  .table-td {
    padding: 0.3rem 1.5rem;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    &.spec_no {
      max-width: 10%;
      padding-right: 3rem;
      text-align: center;
    }
    &.title {
      max-width: 48%;
      padding-right: 4rem;
    }
    &.edit_by {
      max-width: 16%;
    }
    &.edit_time {
      max-width: 16%;
    }
  }

  .table-tbody {
    background: transparent;
    &.empty {
      color: #c0c0c0
    }
    .table-tr {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &:hover {
        background: transparent;
      }
    }
  }
}

`;

const headerBase = [
  { dataIndex: 'spec_no', key: 'spec_no', title: 'SPEC No.', sortable: false, sortOrder: null },
  { dataIndex: 'title', key: 'title', title: 'Title', sortable: false, sortOrder: null },
  { dataIndex: 'edit_by', key: 'edit_by', title: 'Edit By', sortable: false, sortOrder: null },
  { dataIndex: 'edit_time', key: 'edit_time', title: 'Edit Time', sortable: false, sortOrder: null },
];

const allowList = [
  ['View', 'allow', 'setting.me'],
];

const XraySpecTitle = (props) => {
  const {
    // state
    isEmpty,
    specTitleList,
    loadingStatus,
    filterInfo,
    // action
    getSpecTitleList,
    getProductTypeOptions,
    getTypeIOptions,
    getTypeIIOptions,
    resetFilterBar,
    updateLoadingStatus,
    updateFilterInfo,
  } = props;

  useEffect(() => {

  }, []);


  return (
    <Div>
      <div className="pageTitle">
          X-Ray Spec Title Management
      </div>
      <div className="searchBarArea">
        <FilterBar
          getSpecTitleList={getSpecTitleList}
          filterInfo={filterInfo}
          updateFilterInfo={updateFilterInfo}
          getProductTypeOptions={getProductTypeOptions}
          getTypeIOptions={getTypeIOptions}
          getTypeIIOptions={getTypeIIOptions}
          loadingStatus={loadingStatus}
          updateLoadingStatus={updateLoadingStatus}
          resetFilterBar={resetFilterBar}
        />
      </div>
      <div className="table-area">
        <Table rows={specTitleList} headers={headerBase}>
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
                              key={item.key}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className={`${isEmpty ? 'table-tbody empty' : 'table-tbody'}`}>
                      {
                        rows.map((row, index) => {
                          return (
                            <TableBodyRow
                              row={row}
                              key={index}
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
      </div>
    </Div>
  );
};

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      filterInfo: state.xraySpecTitle.filterInfo,
      specTitleList: state.xraySpecTitle.specTitleList,
      isEmpty: state.xraySpecTitle.isEmpty,
      loadingStatus: state.xraySpecTitle.loadingStatus,
    };
  },
  {
    getSpecTitleList: XraySpecTitleActions.getSpecTitleList,
    getProductTypeOptions: XraySpecTitleActions.getProductTypeOptions,
    getTypeIOptions: XraySpecTitleActions.getTypeIOptions,
    getTypeIIOptions: XraySpecTitleActions.getTypeIIOptions,
    resetFilterBar: XraySpecTitleActions.resetFilterBar,
    updateLoadingStatus: XraySpecTitleActions.updateLoadingStatus,
    updateFilterInfo: XraySpecTitleActions.updateFilterInfo,
  }
)(XraySpecTitle));
