import React, { useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Table from '~~elements/Table';
import CommonUtils from '~~utils/CommonUtils';
import CheckingRbac from '~~hoc/CheckingRbac';

import ColumnSetting from './ColumnSetting';
import * as BomManagementActions from '../BomManagementActions';
import * as EEBomActions from '../EEBomDetail/EEBomActions';


const EEBomTableSection = (props) => {
  const { getRbacPath, bomList } = props;
  const canEEViewDetailPage = getRbacPath(['List', 'allow', 'ee_bom_projects.detail']);
  const canEEViewInfo = getRbacPath(['View', 'allow', 'ee_bom_projects']);
  const canEEViewNextStage = getRbacPath(['List', 'allow', 'ee_bom_projects.version']);


  /**
   * 當點擊row時
   * @param {} event click event
   * @param {*} record 點擊的這行row的data
   * @param {*} rowIndex 點擊的這行row的index
   */
  const handleEeClicNextStage = (event, record, rowIndex) => {
    const { is_next_stage: isNextStage } = record;
    if (isNextStage && canEEViewDetailPage && canEEViewNextStage) {
      event.stopPropagation();
      props.openChooseVersionModal(record.id);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let { columnKey: dataIndex, order: sortOrder } = sorter;
    props.onSorterChange([{ dataIndex, sortOrder }]);
  };

  return (
    <Table
      headerColor="black"
      dataSource={bomList}
      columns={ColumnSetting(props)}
      pagination={false}
      onChange={handleTableChange}
      onRow={(record, rowIndex) => ({
        onClick: event => handleEeClicNextStage(event, record, rowIndex),
      })}
    />
  );
};


const mapStateToProps = (state) => {
  return {
    bomList: state.bomManagement.bomList,
    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    total: state.bomManagement.total,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
  };
};

const mapDispatchToProps = {
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  openChooseVersionModal: BomManagementActions.openChooseVersionModal,
  getEEBomDetailTab: EEBomActions.getEEBomDetailTab,
  updateSortInfo: BomManagementActions.updateSortInfo,
  getBomList: BomManagementActions.getBomList,
};


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  CheckingRbac([['List', 'allow', 'ee_bom_projects']])
)(EEBomTableSection);
