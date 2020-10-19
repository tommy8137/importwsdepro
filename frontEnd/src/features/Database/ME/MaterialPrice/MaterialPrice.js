import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import moment from 'moment';
import _get from 'lodash/get';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import Resource from '~~apis/resource';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ScheduleModal from '~~features/Database/components/ScheduleModal';
import { PARTCATE } from '~~features/Database/ME/MaterialPrice/MaterialConst';
import ImportMaterialPrice from '~~features/Database/components/ImportMaterialPrice';


import Metal from './Metal';
import Plastic from './Plastic';
import Diecut from './Diecut';
import Turning from './Turning';
import Rubber from './Rubber';

const IMPORT_TYPE = {
  materialPrice: 'materialPrice',
};

function MaterialPrice(props) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const {
    // state
    isEditMode,
    partCateOptions,
    selectedPartCate,
    selectedPartCate: { value: partCate },
    materialPriceDate,
    materialPriceDate: { next: nextDate },
    // actions
    setMaterialPriceSelectedPartCate,
    getMaterialPriceList,
    setMaterialPriceSchedule,
    isImportModalOpen,
  } = props;


  useEffect(() => {
    // 下拉改變時，call新的列表、清空active row id、清空右邊table
    getMaterialPriceList(partCate);
  }, [partCate]);


  /**
   * 右上角下拉改變時
   * @param {} option 
   */
  function handleChangePartCate(option) {
    setMaterialPriceSelectedPartCate(option);
  }
  function handleAddMaterial() { }

  /**
   * 開啟日期modal
   */
  function handleOpenScheduleModal() {
    setIsScheduleModalOpen(true);
  }

  /**
   * 關閉日期modal
   */
  function handleCancelScheduleModal() {
    setIsScheduleModalOpen(false);
  }

  /**
   * 當按下日期modal的save時
   * @param {*} date 所選擇的日期
   */
  function handleSaveScheduleModal(date) {
    setIsScheduleModalOpen(false);
    setMaterialPriceSchedule(date);
  }

  function getMaterialTable() {
    switch (partCate) {
      case PARTCATE.METAL:
        return <Metal />;
      case PARTCATE.PLASTIC:
        return <Plastic />;
      case PARTCATE.DIECUT:
        return <Diecut />;
      case PARTCATE.TURNING:
        return <Turning />;
      case PARTCATE.RUBBER:
        return <Rubber />;
      default:
        return <Metal />;
    }
  }
  async function exportMaterialPrice() {
    props.toggleLoadingStatus(true);
    try {
      const response = await Resource.DatabaseResource.exportDiecutMaterialPrice();
      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_.xlsx';
      FileSaver.saveAs(
        new Blob([response.data], { type }),
        filename
      );
    } catch (err) {
      props.pushNotification({ message: '下載檔案失敗，請稍後再試', level: 'error' });
    }
    props.toggleLoadingStatus(false);
  }

  const [importType, setImportType] = useState('');
  useEffect(() => {
    props.toggleImportModal(false);
  }, []);


  const toggleImportMaterialPrice = (isOpen = true) => {
    props.toggleImportModal(isOpen);
    setImportType(IMPORT_TYPE.materialPrice);
  };


  function handleCloseImporModal() {
    props.toggleImportModal(false);
  }

  /**
   * 重新取得material price列表
   */
  function handleRefresh() {
    getMaterialPriceList(partCate);
  }
  const scheduleDefault = nextDate || moment().add(1, 'days').format('YYYY/MM/DD');

  // 如果 PartCate 選擇 die cut, 才會出現 import/export按鈕
  const isDieCut = _get(selectedPartCate, ['value']) === PARTCATE.DIECUT;

  return (
    <React.Fragment>
      <InnerContainer>
        <div className="inner-content">
          <div className="content-header">
            <div className="title">Material Price</div>
            <InlineBtns>
              {isDieCut ?
                <Fragment>
                  <Button
                    round
                    color="transparent"
                    onClick={exportMaterialPrice}
                    disabled={isEditMode}
                  >
                    <Icon icon={IconName.IcoExport} size="1rem" />
                    Export
                  </Button>
                  <Button
                    round
                    color="transparent"
                    onClick={() => toggleImportMaterialPrice(true)}
                    disabled={false}
                  >
                    <Icon icon={IconName.IcoImport} size="1rem" />
                    Import
                  </Button>
                </Fragment>
                : null
              }
              <p>View by</p>
              <div className="select-container">
                <Select
                  onChange={handleChangePartCate}
                  width="10rem"
                  target="box"
                  placeholder=""
                  options={partCateOptions}
                  value={selectedPartCate}
                />
              </div>
              <Button
                color="black"
                border={false}
                round
                onClick={handleOpenScheduleModal}
                disabled={isEditMode}
              >
                <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={handleAddMaterial}
                />
                Schedule New
              </Button>
            </InlineBtns>
          </div>
          {getMaterialTable()}
        </div>
        <ScheduleModal
          defaultValue={scheduleDefault}
          onSave={handleSaveScheduleModal}
          onCancel={handleCancelScheduleModal}
          isOpen={isScheduleModalOpen}
        />
      </InnerContainer >
      <ImportMaterialPrice
        isOpen={props.isImportModalOpen && importType === IMPORT_TYPE.materialPrice}
        onSureLeave={handleCloseImporModal}
        refresh={handleRefresh}
      />
    </React.Fragment>
  );
}

MaterialPrice.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    isEditMode: state.dataBase.materialPrice.isEditMode,
    selectedPartCate: state.dataBase.materialPrice.selectedPartCate,
    partCateOptions: state.dataBase.materialPrice.partCateOptions,
    materialPriceList: state.dataBase.materialPrice.materialPriceList,
    materialPriceDate: state.dataBase.materialPrice.materialPriceDate,
    isImportModalOpen: state.dataBase.isImportModalOpen,
  };
};

const mapDispatchToProps = {
  toggleLoadingStatus,
  pushNotification,
  getMaterialPriceList: DatabaseActions.getMaterialPriceList,
  setMaterialPriceSelectedPartCate: DatabaseActions.setMaterialPriceSelectedPartCate,
  setMaterialPriceSchedule: DatabaseActions.setMaterialPriceSchedule,
  toggleImportModal: DatabaseActions.toggleImportModal,
  resetModal: DatabaseActions.resetModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MaterialPrice);
