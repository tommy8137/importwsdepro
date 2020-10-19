import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Pagination from '~~elements/Pagination';
import checkingRbac from '~~hoc/CheckingRbac';
import Button from '~~elements/Button';
import checkingUserInfo from '~~hoc/CheckingUserInfo';
import useSearch from '~~features/BomManagement/component/useSearch';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import FilterBar from '~~features/BomManagement/component/FilterBar';
import Switch from '~~elements/Switch';
import { ReadOnlyModal, PorjectParametersModal, SetPermissionModal } from '~~features/BomManagement/component/Modal';

import MEBomTableSection from './EMDMBomTableSection';


function EMDMBomMainPage(props) {
  const {
    // isCreateOpen,
    isEditOpen,
    isPermissionModalOpen,
    disable,
    isParameterOpen
  } = props;

  const {
    handleReset,
    handleOnFilter,
    handleSorterChange,
    handlePageChange,
    handleToggleArchive,
  } = useSearch(props);

  return (
    <Fragment>
      <ReadOnlyModal
        isOpen={isEditOpen}
        onClickCancel={props.closeEditBomModal}
      />
      <PorjectParametersModal
        isOpen={isParameterOpen}
      />
      <SetPermissionModal
        isOpen={isPermissionModalOpen}
      />
      <div className="upper-area">
        <div className="upper-left">
          <FilterBar
            handleOnFilter={handleOnFilter}
            handleReset={handleReset}
          />
        </div>
        <div className="btn-space-rate">
          {/* <ExportSpaceBtn disabled={false} meBomId={props.meBomId} /> */}
          <div className="upper-right">
            <p>顯示封存項目</p>
            <Switch
              checked={disable}
              onChange={handleToggleArchive}
            />
          </div>
        </div>
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
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isParameterOpen: state.bomManagement.isParameterOpen,
    table: state.bomManagement.table,
    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    total: state.bomManagement.total,
    isCreateOpen: state.bomManagement.isCreateOpen,
    isEditOpen: state.bomManagement.isEditOpen,
    isPermissionModalOpen: state.bomManagement.isPermissionModalOpen,
    isSetPermissionModalOpen: state.bomManagement.isSetPermissionModal,
    disable: state.bomManagement.disable,
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
  toggleShowArchive: BomManagementActions.toggleShowArchive,
};


const allowList = [
  ['List', 'allow', 'me_bom_projects'],
];


export default compose(
  withRouter,
  checkingUserInfo(),
  checkingRbac(allowList),
  connect(mapStateToProps, mapDispatchToProps),
)(EMDMBomMainPage);
