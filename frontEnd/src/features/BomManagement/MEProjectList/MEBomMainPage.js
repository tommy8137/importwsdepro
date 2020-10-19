import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import Pagination from '~~elements/Pagination';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import checkingRbac from '~~hoc/CheckingRbac';
import useSearch from '~~features/BomManagement/component/useSearch';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import FilterBar from '~~features/BomManagement/component/FilterBar';
import Div from '~~features/BomManagement/ProjectListStyles';

import { CreateBomModal, EditBomModal, PorjectParametersModal } from '~~features/BomManagement/component/Modal';
import MEBomTableSection from './MEBomTableSection';


function MEBomMainPage(props) {
  const {
    isCreateOpen,
    isEditOpen,
    bomData,
    getRbacPath,
    switchTable,
    isParameterOpen,
    toggleParameterModal,
    openParameterModal,
  } = props;

  const {
    handleReset,
    handleOnFilter,
    handleSorterChange,
    handlePageChange,

  } = useSearch(props);

  // useEffect(() => {
  //   openParameterModal(1219);
  // }, []);

  const canCreate = getRbacPath(['CreateNextStatus', 'allow', 'me_bom_projects']);

  return (
    <div>
      <CreateBomModal
        isOpen={isCreateOpen}
        onClickCancel={props.closeCreateBomModal}
        onSubmitStep1={props.updateBomDetail}
        onSubmitStep2={props.doCreateBom}
      />
      <EditBomModal
        isOpen={isEditOpen}
        bomData={bomData}
        onClickCancel={props.closeEditBomModal}
        onDetailChange={props.updateBomDetail}
        onClickSave={props.doEditBom}
      />

      <PorjectParametersModal
        isOpen={isParameterOpen}
      />

      <div className="upper-area">
        <div className="upper-left">
          <FilterBar
            handleOnFilter={handleOnFilter}
            handleReset={handleReset}
          />
        </div>
        {/* Add Button */}
        {canCreate &&
          <Button
            round
            className="btn-create"
            onClick={props.openCreateBom}
          >
            <Icon icon="IcoAddWhite" className="icon" />
            Create BOM
          </Button>
        }
      </div>

      <MEBomTableSection
        onSorterChange={handleSorterChange}
      />

      <div className="pagination">
        <Pagination
          pageSize={props.pageSize}
          total={props.total}
          currentPage={props.currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    table: state.bomManagement.table,
    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    total: state.bomManagement.total,
    isCreateOpen: state.bomManagement.isCreateOpen,
    isEditOpen: state.bomManagement.isEditOpen,
    bomData: state.bomManagement.bomData,
    isParameterOpen: state.bomManagement.isParameterOpen,
  };
};
const mapDispatchToProps = {
  closeCreateBomModal: BomManagementActions.closeCreateBomModal,
  updateBomDetail: BomManagementActions.updateBomDetail,
  doEditBom: BomManagementActions.doEditBom,
  getBomList: BomManagementActions.getBomList,
  updatePageInfo: BomManagementActions.updatePageInfo,
  openCreateBom: BomManagementActions.openCreateBom,
  saveCreateBomStep1: BomManagementActions.saveCreateBomStep1,
  doCreateBom: BomManagementActions.doCreateBom,
  closeEditBomModal: BomManagementActions.closeEditBomModal,
  resetAllData: BomManagementActions.resetAllData,
  switchTable: BomManagementActions.switchTable,
  updateSortInfo: BomManagementActions.updateSortInfo,
  toggleParameterModal: BomManagementActions.toggleParameterModal,
  openParameterModal: BomManagementActions.openParameterModal
};


const allowList = [
  ['List', 'allow', 'me_bom_projects'],
];

export default compose(
  withRouter,
  checkingRbac(allowList),
  connect(mapStateToProps, mapDispatchToProps),
)(MEBomMainPage);
