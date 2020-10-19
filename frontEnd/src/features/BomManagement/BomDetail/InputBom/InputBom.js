import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { comma } from '~~utils/Math';
import Icon, { IconName } from '~~elements/Icon';
import { connect } from 'react-redux';
import * as R from 'ramda';
import _get from 'lodash/get';
import checkingRbac from '~~hoc/CheckingRbac';
import Button from '~~elements/Button';
// import RoundButton from '~~elements/RoundButton';
import Select from '~~elements/Select';
import { ReadOnlyModal } from '~~features/BomManagement/component/Modal';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';

import BomTable from '../components/BomTable';
import BomTabs from '../BomTabs';
import BomItemModal from '../BomItemModal';
import ImportBomItem from '../components/ImportBomItem';
import ImportSourcerCost from '../components/ImportSourcerCost';
import ExportBtn from '../components/ExportBtn';

const IMPORT_TYPE = {
  bomItem: 'bomItem',
  sourcerCost: 'sourcerCost',
};


const InfoModalBtn = styled.p`
  margin: 0;
  margin-top: 0.625rem;
  font-size: 1rem;
  font-weight: bolder;
  color: #333333;
  font-weight: bolder;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;;
  &:hover {
    text-decoration: underline;
  }
`;

const BomHead = styled.div`
  margin-bottom: 0.5rem;
  padding: 0rem 1rem 0 3rem;
  border-bottom: 1px solid #d0d0d0;
  .bom-info {
    display: flex;
    margin-bottom: 1rem;
    label {
      flex: 0 10%;
      max-width: 10%;
      padding: 0 6px;
      &.des {
        flex: 0 20%;
        max-width: 20%;
      }
      span {
        color: #808080;
        font-size: 0.875rem;
        white-space: nowrap;
      }
      p {
        margin: 0;
        margin-top: 0.625rem;
        font-size: 1rem;
        font-weight: bolder;
        color: #333333;
        font-weight: bolder;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }


  .bom-tabs {
    position: relative;
    display: flex;
    .right-control {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0, -50%);
      z-index: 9;
      display: flex;
      align-items: center;
      button {
        margin: 0 0.4rem;
        .round-btn--icon {
          width: 0.9rem;
          margin-right: 0.4rem;
        }
      }
      .btn-info {
        table-layout: fixed;
        padding: 0;
        border-radius: 100%;
        border: none;
        background-color: transparent;
        position: relative;
        width: 30px;
        cursor: initial;
        transition: 0.3s ease all;
        &:focus {
          box-shadow: none;
          outline: 0;
        }
        &:hover {
          .info-tooltip {
            opacity:1;
            visibility: visible;
            transform: translate(0,0);
          }
        }
        .info-tooltip {
          width: max-content;
          position: absolute;
          right: 0;
          top: 100%;
          background-color: white;
          text-align: left;
          padding: 1rem;
          border-radius: 0.6rem;
          font-size: 0.8rem;
          margin-top: 12px;
          opacity:0;
          visibility: hidden;
          transform: translate(0, -12px);
          transition: 0.3s ease all;
          box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
          p {
            color: #333;
            margin: 0;
            .icon {
              width: 16px;
              margin-right: 4px;
            }
            span,
            .icon {
              display: inline-block;
              vertical-align: middle;
            }
            &.tit {
              margin-top: 0.6rem;
              margin-bottom: 0.2rem;
              opacity: 0.8;
              &:first-child {
                margin: 0;
              }
            }
          }
        }
      }
      /* 選擇版本的下拉 */
      .version-select {
        width: 9.6875rem;
      }
    }
  }
`;

const InputBom = (props) => {
  const {
    isInputBomInfoOpen,
    bomData: {
      skuCost = [], projectName, totalItems, skuDesc, editAble, unEditCount
    },
    assignItem: { assign, bomDesigneeID },
    versionsList,
    currentVersion,
    bomID,
    historyMode,
    uploadInfo,
    isImportModalOpen,
    // FOR BOM INFO
    isEditOpen,
    closeEditBomModal,
    openEditBomModal,
  } = props;

  const [infoModalOpen, setInfoModalOpen] = useState(true);
  const [importType, setImportType] = useState('');

  useEffect(() => {
    props.toggleImportModal(false);
  }, []);

  useEffect(() => {
    if (uploadInfo.uploadTempID) {
      props.deleteTemp();
    }
    props.resetModal();
  }, [isImportModalOpen]);

  const userName = sessionStorage.getItem('username');
  const denySourceCost = props.getRbacPath(['View', 'deny', 'me_bom_projects.bom_item.source_cost']);
  const denySystemCost = props.getRbacPath(['View', 'deny', 'me_bom_projects.bom_item.system_cost']);
  // 可以complete version的人才可以看到版本下拉選單
  const allowComplete = props.getRbacPath(['VersionComplete', 'allow', 'me_bom_projects']);

  // 在All的tab才可以看到價錢
  const canViewCost = assign === '' && (!denySourceCost && !denySystemCost);
  // 在All的tab, 有RBAC權限, 版本要n.7
  let versionRegex = /^V\d+\.7$/g;
  let validVersion = versionRegex.test(props.version);

  // 這條policy沒有在頁面上，但是與後端都是用這個policy來判斷 "CE" 可以Edit cost
  const ceCanEditCost = props.getRbacPath(['EditAll', 'allow', 'me_bom_projects.spa_sourcer_suggestion']);
  const sourcerCanEditCost = !ceCanEditCost && !denySourceCost;
  const canEditCost = assign === '' && (ceCanEditCost || sourcerCanEditCost) && validVersion;

  const skuMapping = {
    sku0: {
      title: 'SKU 0 Cost',
      enabled: false,
    },
    sku1: {
      title: 'SKU 1 Cost',
      enabled: true,
    },
    sku2: {
      title: 'SKU 2 Cost',
      enabled: true,
    },
    sku3: {
      title: 'SKU 3 Cost',
      enabled: true,
    },
    sku4: {
      title: 'SKU 4 Cost',
      enabled: true,
    },
    sku5: {
      title: 'SKU 5 Cost',
      enabled: true,
    },
  };

  const canExport = props.getRbacPath(['Export', 'allow', 'me_bom_projects']);
  const isAssigneeCurrent = props.assignItem.employeeName === userName && !historyMode;

  const handleToggleInfo = () => {
    props.toggleInputBomInfo(!isInputBomInfoOpen);
  };

  const handleSelectChange = (option) => {
    props.updateCurrentVersion(option);
    props.getBomAssignlist({ bomID, assign: bomDesigneeID || 'all' });
    props.getBomItemList({ bomID, assign: bomDesigneeID || 'all' });
    props.cancelEditMEBomTable(); // 在Edit cost時切換版本要取消編輯
    props.setIsEditMode(false);
  };

  const toggleImportBomItem = (isOpen = true) => {
    props.toggleImportModal(isOpen);
    setImportType(IMPORT_TYPE.bomItem);
  };

  const toggleImportSourcerCost = (isOpen = true) => {
    props.toggleImportModal(isOpen);
    setImportType(IMPORT_TYPE.sourcerCost);
  };
  /**
   * Assignee tab會有的按鈕
   */
  const getDesigneeTabFunctions = () => {
    if (isAssigneeCurrent) {
      return (
        <Fragment>
          {/* 下載template的按鈕 */}
          <Button
            round
            color="transparent"
            onClick={() => props.downloadBomTemplate()}
            disabled={false}
          >
            <Icon icon="IcoDownload" className="round-btn--icon" />
            Template
          </Button>
          {/* Import的按鈕 */}
          <Button
            round
            color="transparent"
            onClick={() => toggleImportBomItem(true)}
            disabled={!(props.version === 'V0.0' && props.bomData.uploadFlag)}
          >
            <Icon icon="IcoImport" className="round-btn--icon" />
            Import
          </Button>
        </Fragment>);
    }

    return null;
  };

  /**
   * All tab會有的按鈕
   */
  const getAllTabFunctions = () => {
    return (
      <Fragment>
        {/* Export的按鈕 */}
        <ExportBtn disabled={!canExport} meBomId={props.meBomId} />

        {/* Import的按鈕 */}
        <Button
          round
          color="transparent"
          onClick={() => toggleImportSourcerCost(true)}
          disabled={!(validVersion || denySourceCost)}
        >
          <Icon icon="IcoImport" className="round-btn--icon" />
          Import
        </Button>
      </Fragment>
    );
  };

  const getButtonsByTab = (tab) => {
    if (tab === '') {
      return getAllTabFunctions();
    }
    return getDesigneeTabFunctions();
  };

  function openBomInfoModal() {
    openEditBomModal({ id: bomID });
  }

  function handleClickCancel() {
    closeEditBomModal();
  }

  return (
    <React.Fragment>
      <ReadOnlyModal
        isOpen={isEditOpen}
        onClickCancel={handleClickCancel}
      />
      <BomHead>
        {/* BOM Project資訊 */}
        <Collapse isOpen={isInputBomInfoOpen}>
          <div className="bom-info">
            <label>
              <span>Project Name</span>
              <InfoModalBtn title={projectName} onClick={openBomInfoModal}>
                {projectName}
              </InfoModalBtn>
            </label>
            <label>
              <span>Total BOM Items</span>
              <p title={totalItems}>{totalItems}</p>
            </label>
            <label className="des">
              <span>SKU Description</span>
              <p alt={skuDesc}>{skuDesc}</p>
            </label>
            {
              canViewCost && skuCost && R.is(Array, skuCost) ?
                <React.Fragment>
                  {
                    skuCost
                      .map(skuItem => {
                        const keys = R.keys(skuItem);
                        if (!keys.length) return (null);
                        const key = keys[0];
                        const price = skuItem[key];
                        return (
                          <label key={key}>
                            <span>{skuMapping[key].title}</span>
                            <p>${skuMapping[key].enabled ? comma(price || 0) : '-'}</p>
                          </label>
                        );
                      })
                  }
                </React.Fragment> : (null)
            }
          </div>
        </Collapse>
        {/* TAB切換、Add New Item、Import */}
        <div className="bom-tabs">
          <BomTabs unEditCount={unEditCount} />
          <div className="right-control">
            {/* 問號icon */}
            <Button
              className="btn-info"
            >
              <Icon className="icon" icon="BtnInstruction" />
              <div className="info-tooltip">
                <p className="tit">刪除功能</p>
                <p>欲刪除 Item 請將 QTY 數值改為 0</p>
                <p className="tit">提醒說明</p>
                <p><Icon className="icon" icon="IcoAlarmRed" /><span>表示您有 Part List 尚未填寫</span></p>
              </div>
            </Button>
            {getButtonsByTab(assign)}
            {/* 選擇版本的下拉選單 */}
            {allowComplete &&
              <div className="version-select">
                <Select
                  target="box"
                  options={versionsList}
                  value={currentVersion}
                  onChange={handleSelectChange}
                />
              </div>}

            {/* 上方info的開關 */}
            <Button
              round
              color="transparent"
              onClick={handleToggleInfo}
            >
              <Icon className="icon-menu" icon="IcoMenu" />
              {
                isInputBomInfoOpen ?
                  <Icon className="icon-arrow" icon={IconName.IconArrowUpBlack} size="0.8rem" /> :
                  <Icon className="icon-arrow" icon={IconName.IconArrowDownBlack} size="0.8rem" />
              }

            </Button>
          </div>
        </div>
      </BomHead>

      {/* 表格 + 搜尋列、按鈕區塊 */}
      <BomTable
        ceCanEditCost={ceCanEditCost}
        sourcerCanEditCost={sourcerCanEditCost}
        canEditCost={canEditCost}
        isAtAllTab={assign === ''}
      />
      {props.modalInfo.isModalOpen ? <BomItemModal modalInfo={props.modalInfo} /> : <div />}
      <ImportBomItem
        isOpen={props.isImportModalOpen && importType === IMPORT_TYPE.bomItem}
        onSureLeave={() => props.toggleImportModal(false)}
      />
      <ImportSourcerCost
        isOpen={props.isImportModalOpen && importType === IMPORT_TYPE.sourcerCost}
        onSureLeave={() => props.toggleImportModal(false)}
      />
    </React.Fragment>
  );
};

export default checkingRbac([['View', 'allow', 'me_bom_projects']])(connect(
  (state) => {
    return {
      bomData: state.bomDetail.bomData,
      version: state.bomDetail.bomData.version,
      modalInfo: state.bomDetail.modalInfo,
      assignItem: state.bomDetail.assignItem,
      isImportModalOpen: state.bomDetail.isImportModalOpen,
      canEditWhenNPointSeven: state.bomDetail.canEditWhenNPointSeven,
      isInputBomInfoOpen: state.bomDetail.isInputBomInfoOpen,
      currentVersion: state.bomDetail.currentVersion,
      versionsList: state.bomDetail.versionsList,
      bomID: state.bomDetail.bomID,
      historyMode: state.bomDetail.historyMode,
      uploadInfo: state.bomDetail.uploadInfo,
      // FOR MODAL INFO
      bomInfoData: state.bomManagement.bomData,
      isEditOpen: state.bomManagement.isEditOpen,
    };
  },
  {
    toggleBomItemModal: BomDetailActions.toggleBomItemModal,
    toggleBomItemModalAction: BomDetailActions.toggleBomItemModal,
    toggleImportModal: BomDetailActions.toggleImportModal,
    resetModal: BomDetailActions.resetModal,
    downloadBomTemplate: BomDetailActions.downloadBomTemplate,
    toggleInputBomInfo: BomDetailActions.toggleInputBomInfo,
    getBomAssignlist: BomDetailActions.getBomAssignlist,
    getBomItemList: BomDetailActions.getBomItemList,
    updateCurrentVersion: BomDetailActions.updateCurrentVersion,
    setIsEditMode: BomDetailActions.setIsEditMode,
    cancelEditMEBomTable: BomDetailActions.cancelEditMEBomTable,
    deleteTemp: BomDetailActions.deleteTemp,
    // FOR MODAL INFO
    openEditBomModal: BomManagementActions.openEditBomModal,
    closeEditBomModal: BomManagementActions.closeEditBomModal,
  }
)(InputBom));
