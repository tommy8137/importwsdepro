import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { compose } from 'recompose';
import Resource from '~~apis/resource';
import Table from '~~elements/Table';
import checkingRbac from '~~hoc/CheckingRbac';
import ChooseVersionModal from '~~features/BomManagement/component/ChooseVersionModal';

import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { dispatchNotification, dispatchLoading } from '~~utils/CommonUtils';

import ColumnSetting from './ColumnSetting';
// import VersionModalColumnSetting from './VersionModalColumnSetting';

const MEBomTableSection = (props) => {
  const [versionList, setVersionList] = useState([]);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  const {
    location,
    getRbacPath,
    bomList = [],
  } = props;

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
    if (canMEView) {
      const { versions = [] } = record;
      event.stopPropagation();
      setVersionList(versions);
      setIsVersionModalOpen(true);
    }
  };

  /**
   * 關閉version modal
   */
  function handleCloseVersionModal() {
    setIsVersionModalOpen(false);
  }

  /**
   * 當點擊version row時
   * @param {Object} record version list row object
   */
  function handleChooseVersion(record) {
    const { id: bomID } = record;
    const search = _get(location, 'search', '');
    props.history.push({
      pathname: `/g/emdmBomDetail/${bomID}`,
      state: {
        prevSearch: search
      }
    });
  }

  async function handleClickNextVersion(bomID, copyCostBomID) {
    dispatchLoading(true);
    try {
      const data = { bomID, copyCostBomID };
      // console.log('data >>>>', data);
      await Resource.BomDetailResource.approveBom(data);
      const search = _get(location, 'search', '');
      props.history.push({
        pathname: `/g/emdmBomDetail/${bomID}`,
        state: {
          prevSearch: search
        }
      });
    } catch (error) {
      console.log('handleNextVersion error', error);
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  const columns = ColumnSetting(props);

  return (
    <React.Fragment>
      <ChooseVersionModal
        isOpen={isVersionModalOpen}
        versionList={versionList}
        onClickCancel={handleCloseVersionModal}
        onClickChoose={handleChooseVersion}
        onClickNextVersion={handleClickNextVersion}
      />

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
    </React.Fragment>
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
  toggleLoadingStatus,
  pushNotification,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  checkingRbac([['List', 'allow', 'me_bom_projects']])
)(MEBomTableSection);
