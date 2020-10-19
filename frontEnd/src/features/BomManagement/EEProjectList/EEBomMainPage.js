import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';

import Pagination from '~~elements/Pagination';
import Button from '~~elements/Button';
import CommonUtils from '~~utils/CommonUtils';
import CheckingRbac from '~~hoc/CheckingRbac';
import Resource from '~~apis/resource';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import useSearch from '~~features/BomManagement/component/useSearch';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import FilterBar from '~~features/BomManagement//component/FilterBar';
import Div from '~~features/BomManagement/ProjectListStyles';
import { BOM_MANAGMENT_TABLE_TYPES } from '~~features/BomManagement/BomManagementConst';

import ChooseVersionModal from './Modal/ChooseVersionModal';
import EditEEBomModal from './Modal/ViewBomModal';
import EEBomTableSection from './EEBomTableSection';

function EEBomMainPage(props) {
  const {
    switchTable,
    getBomList,
    handleReset,
    handleOnFilter,
    handleSorterChange,
    handlePageChange
  } = useSearch(props);

  const {
    location,
    isVersionOpen,
    edmVersions,
    isEeEditOpen,
    eeBomProjectID,
    openEditEEBomModal
  } = props;

  const search = _get(location, 'search', '');


  // useEffect(() => {
  // for debug
  //   openEditEEBomModal('4062a09c-9917-4ac8-8247-806122266482');
  // }, []);

  /**
   * 當點擊table row的時候，直接進入該版本
   * @param {*} edmVersionID 從choose version modal的table row 來
 */
  const handleClickChoose = (edmVersionID) => {
    props.history.push({
      pathname: `${props.match.url}/detail/${eeBomProjectID}/${edmVersionID}`,
      state: {
        prevSearch: search
      }
    });
  };


  /**
   * 當點擊next version的時候， 先call進版api， 再進去那一頁
   * @param {*} edmVersionID edmVersionID
   */
  const handleClickNextVersion = (edmVersionID) => {
    props.toggleLoadingStatus(true);
    Resource.EEBomResource.getNextEdmVersionId(edmVersionID)
      .then(response => {
        props.toggleLoadingStatus(true);
        const { edm_version_id: newEdmVersionID } = response.data;
        props.history.push({
          pathname: `${props.match.url}/detail/${eeBomProjectID}/${newEdmVersionID}`,
          state: {
            prevSearch: search
          }
        });
      })
      .catch(error => {
        props.toggleLoadingStatus(true);
        NotificationSystemActions.pushNotification({
          message: '網路連線有誤，請稍後再試',
          level: 'error'
        });
      });
  };
  return (
    <div>
      <ChooseVersionModal
        isOpen={isVersionOpen}
        versionList={edmVersions}
        // defaultValue={edmVersions.length > 0 ? edmVersions[0].id : null}
        onClickCancel={props.closeChooseVersionModal}
        onClickChoose={handleClickChoose}
        onClickNextVersion={handleClickNextVersion}
      />
      <EditEEBomModal
        isOpen={isEeEditOpen}
        onClickCancel={props.closeEditEEBomModal}
        onClickSave={props.doEditEEBom}
      />

      <div className="upper-area">
        <div className="upper-left">
          {/* Filter bar */}
          <FilterBar
            handleOnFilter={handleOnFilter}
            handleReset={handleReset}
          />
        </div>
      </div>
      <EEBomTableSection onSorterChange={handleSorterChange} />
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
    edmVersions: state.bomManagement.edmVersions,
    isVersionOpen: state.bomManagement.isVersionOpen,
    isEeEditOpen: state.bomManagement.isEeEditOpen,
    eeBomProjectID: state.bomManagement.eeBomProjectID,
  };
};
const mapDispatchToProps = {
  toggleLoadingStatus,
  closeChooseVersionModal: BomManagementActions.closeChooseVersionModal,
  doEditEEBom: BomManagementActions.doEditEEBom,
  closeEditEEBomModal: BomManagementActions.closeEditEEBomModal,
  updatePageInfo: BomManagementActions.updatePageInfo,
  getBomList: BomManagementActions.getBomList,
  resetAllData: BomManagementActions.resetAllData,
  getFilterType: BomManagementActions.getFilterType,
  switchTable: BomManagementActions.switchTable,
  updateSortInfo: BomManagementActions.updateSortInfo,
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
};

const allowList = [
  ['List', 'allow', 'ee_bom_projects']
];

export default connect(mapStateToProps, mapDispatchToProps)(CheckingRbac(allowList)(EEBomMainPage));
