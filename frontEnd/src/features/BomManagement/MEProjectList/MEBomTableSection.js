import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as R from 'ramda';
import _get from 'lodash/get';
import { compose } from 'recompose';

import Table from '~~elements/Table';
import checkingRbac from '~~hoc/CheckingRbac';

import * as BomManagementActions from '../BomManagementActions';

import ColumnSetting from './ColumnSetting';

const MEBomTableSection = (props) => {
  const { getRbacPath, bomList = [], location } = props;

  // 是否能進入bom detail
  const canMEView = getRbacPath(['View', 'allow', 'me_bom_projects']);

  /**
   * Callback executed when pagination, filters or sorter is changed
   * @param {*} pagination pagination
   * @param {*} filters filters
   * @param {*} sorter sorter
   */
  const handleTableChange = (pagination, filters, sorter) => {
    let { columnKey: dataIndex, order: sortOrder } = sorter;
    props.onSorterChange([{ dataIndex, sortOrder }]);
  };

  /**
   * @param {*} event click event
   * @param {*} record 該橫列的data
   * @param {*} rowIndex 該列的index
   */
  const handleBomClickRow = (event, record) => {
    const { id: bomID } = record;
    if (canMEView) {
      // 如果有view的權限才可以進入
      event.stopPropagation();
      const search = _get(location, 'search', '');
      props.history.push({
        pathname: `/g/Bomdetail/${bomID}`,
        state: {
          prevSearch: search
        }
      });
    }
  };
  const extnedsProps = {
    ...props,
  };

  const columns = ColumnSetting(extnedsProps);
  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: event => handleBomClickRow(event, record),
        };
      }}
      rowKey={record => `${record.id}-${record.create_time}`}
      columns={columns}
      dataSource={bomList}
      onChange={handleTableChange}
      pagination={false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    bomList: state.bomManagement.bomList,
    highlightid: state.bomManagement.highlightid,
    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    total: state.bomManagement.total,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
  };
};

const mapDispatchToProps = {
  highlightBom: BomManagementActions.highlightBom,
  updateSortInfo: BomManagementActions.updateSortInfo,
  getBomList: BomManagementActions.getBomList,
  openEditBomModal: BomManagementActions.openEditBomModal,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  checkingRbac([['List', 'allow', 'me_bom_projects']])
)(MEBomTableSection);
