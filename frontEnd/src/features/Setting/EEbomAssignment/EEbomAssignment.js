import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from '~~elements/DataTable';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import { connect } from 'react-redux';
import checkingRbac from '~~hoc/CheckingRbac';
import _filter from 'lodash/filter';
import TableBodyRow from './TableBodyRow';
import * as EEbomAssignmentActions from './EEbomAssignmentActions';
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
.filterBarArea{
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
      &.type1 {
        max-width: 16%;
      }
      &.type2 {
        max-width: 42%;
      }
      &.pic {
        max-width: 16%;
      }
     &.proxy {
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
    &.type1 {
      max-width: 16%;
    }
    &.type2 {
      max-width: 42%;
      padding-right: 5rem;
      &:hover {
        text-decoration: underline;
        cursor: pointer
      }
    }
    &.pic {
      max-width: 16%;
      display: flex;
      align-items: center;
      overflow: visible;
      position: relative;
    }
    &.proxy {
      max-width: 16%;
      display: flex;
      align-items: center;
      overflow: visible;
      position: relative;
    }
  }

  .table-tbody {
    background: transparent;
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
  { dataIndex: 'type1', key: 'type1', title: 'Type I', sortable: false, sortOrder: null },
  { dataIndex: 'type2', key: 'type2', title: 'Type II', sortable: false, sortOrder: null },
  { dataIndex: 'pic', key: 'pic', title: 'PIC', sortable: false, sortOrder: null },
  { dataIndex: 'proxy', key: 'proxy', title: 'Proxy', sortable: false, sortOrder: null },
];

const allowList = [
  ['View', 'allow', 'setting.ee'],
];

const EEbomAssignment = (props) => {
  const {
    // state
    eeBomList,
    filteredEEBomList,
    filterInfo,
    // action
    getEEbomList,
    getFilteredEEBomList,
    updateFilterInfo,
    resetFilterBar
  } = props;

  useEffect(() => {
    getEEbomList();
  }, []);

  return (
    <Div>
      <div className="pageTitle">
          EEBOM Assignment
      </div>
      <div className="filterBarArea">
        <FilterBar
          eeBomList={eeBomList}
          filterInfo={filterInfo}
          updateFilterInfo={updateFilterInfo}
          resetFilterBar={resetFilterBar}
          getFilteredEEBomList={getFilteredEEBomList}
        />
      </div>
      <div className="table-area">
        <Table rows={filteredEEBomList} headers={headerBase}>
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
                    <div className="table-tbody">
                      {
                        rows.map((row, index) => {
                          return (
                            <TableBodyRow
                              e2e={row.type1}
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
      eeBomList: state.eebomAssignment.eeBomList,
      filteredEEBomList: state.eebomAssignment.filteredEEBomList,
      filterInfo: state.eebomAssignment.filterInfo
    };
  },
  {
    getEEbomList: EEbomAssignmentActions.getEEbomList,
    getFilteredEEBomList: EEbomAssignmentActions.getFilteredEEBomList,
    resetFilterBar: EEbomAssignmentActions.resetFilterBar,
    updateFilterInfo: EEbomAssignmentActions.updateFilterInfo,
  }
)(EEbomAssignment));
