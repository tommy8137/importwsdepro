import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'connected-react-router';
import _ from 'lodash';
import checkingRbac from '~~hoc/CheckingRbac';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import Button from '~~elements/Button';
import SearchBar from '~~elements/SearchInput';
import CancelEditAlert from '~~features/BomManagement/component/CancelEditAlert';
import TableGridUtils from '~~utils/TableGridUtils';
import BomItemHistoryModal from '~~features/BomManagement/component/EditHistory/BomItemHistoryModal';
import { emdmNotCeColumns, emdmCeColumns, } from './BomDetailDataGrid/ColumnSetting';
import ColumnFilter from './ColumnFilter';
import SkuSelector from './SkuSelector';
import { SplitDataGrid } from './BomDetailDataGrid';


const TableContainer = styled.div`
  background-color: #fff;
  .table-action-group {
    padding: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__button-group {
      button {
        margin-right: 1rem;
      }
    }
    &-left {
      display: flex;
    }
  }
  /* TODO 這個是table list圖片 */
  .btn-image {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    display: block;
    padding: 0;
    width: 26px;
    border: none;
    box-shadow: none;
    transition: 0.3s ease all;
    &:hover {
      opacity: 0.85;
    }
    >svg {
      width: 100%;
      display: block;
    }
  }
`;

const EmptyRow = styled.div`
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${() => `${document.documentElement.clientHeight - 380}px`};
  .title {
    font-size: 1.375rem;
    font-weight: bolder;
    line-height: 3rem;
  }
  .context {
    font-size: 1rem;
  }
`;

// 主component
const BomTable = (props) => {
  const [allColumns, setAllColumns] = useState([]);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [dgUuid, setDgUuid] = useState(Math.random());
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedSourceItemId, setSelectedSourceItemId] = useState('');
  const {
    bomID,
    bomData: { version, bomItems, editAble },
    getRbacPath,
    isEditMode,
    tmpMEBomTableList,
    originalMEBomTableList,
    isAtAllTab,
    searchValue,
    historyMode,
    assignItem,
    columns,
    selectedSkuNum,
    canEditCost,
    ceCanEditCost,
    sourcerCanEditCost,
    informSourcer,
    informCE,
    userInfo = {},
  } = props;
  const { role_group: roleGroup } = userInfo;

  const versionRegex = /^V\d+\.7$/g;
  const isInformValidVersion = versionRegex.test(version);
  const showCeInform = isInformValidVersion && roleGroup === 'CE';
  const showSourcerInform = isInformValidVersion && roleGroup === 'SOURCER';

  const denySourceCost = getRbacPath(['View', 'deny', 'me_bom_projects.bom_item.source_cost']);
  const denySystemCost = getRbacPath(['View', 'deny', 'me_bom_projects.bom_item.system_cost']);

  const isCe = (!denySourceCost && !denySystemCost);
  let tableRows = isEditMode ? tmpMEBomTableList : bomItems;
  // NOTE: 可以編輯的欄位 by 權限
  const editableColumns = sourcerCanEditCost ?
    columns.filter(d => _.get(d, 'sourcerCanEdit', false)) :
    columns.filter(d => _.get(d, 'ceCanEdit', false));

  // update all columns
  useEffect(() => {
    // 要傳進去的columns 的 props
    const columnsProps = { selectedSkuNum, bomID, onOpenHistoryModal: handleOpenHistoryModal };
    // 先依照權限取得columns
    const authorityColumns = (isCe && assignItem.assign === '') ? emdmCeColumns(columnsProps) : emdmNotCeColumns(columnsProps);
    const newAllColumns = authorityColumns.map((d, colIdx) => ({ ...d, colIdx }));
    setAllColumns(newAllColumns);
    props.filterGridColumns(newAllColumns);
  }, [
    // JSON.stringify(tableRows),
    JSON.stringify(assignItem),
    selectedSkuNum,
  ]);


  // force Grid re-render for change columns.
  useEffect(() => {
    const uuid = Math.random();
    setDgUuid(uuid);
  }, [JSON.stringify(columns)]);

  function handleOpenHistoryModal(sourceItemId) {
    if (sourceItemId) {
      setSelectedSourceItemId(sourceItemId);
      setIsHistoryModalOpen(true);
    }
  }

  const handleClickRow = (id, row) => {
    // EMDM的bom只有view的功能
    props.updateBomItemId(id);
    // GET eMDM  images
    props.getEmdmBomImage(bomID, row['source_item_id']);
    props.toggleBomItemModalAction('EmdmView', true);
  };

  const handleClickSearch = () => {
    const { assignItem: { bomDesigneeID: assign = 'all' }, } = props;
    props.getBomItemList({
      bomID,
      assign
    });
  };

  const handleComplete = () => {
    props.completeBomAction();
  };

  // 判斷要給哪一種編輯的按鈕
  const getButtons = () => {
    const {
      assignData: { completeAble },
    } = props;
    // editAble: 從後端api得到 /bom/bom_id/bomItems/
    // RD 在n.7的版本不能編BOM表和partlist(為了不讓n.7變回n.5)

    // 只要不是現在最新版本，就不允許編輯功能
    if (historyMode) {
      return null;
    }

    function handleInformSourcer() {
      informSourcer(bomID);
    }
    function handleInformCE() {
      informCE(bomID);
    }
    // edit btns
    const getEditBtns = () => {
      // ce && version === 0.7 才可以編輯
      if (!canEditCost) return (null);
      return isEditMode ?
        <React.Fragment>
          <Button
            round
            color="white"
            border
            onClick={() => {
              // 檢查有沒有修改過，有修改過要先跳alert，沒有修改過直接回到檢視模式
              const modifiedItems = TableGridUtils.getModifiedFields(tmpMEBomTableList, originalMEBomTableList);
              if (modifiedItems && modifiedItems.length > 0) {
                setIsAlertShow(prevState => !prevState);
              } else {
                // 回到檢視模式
                props.setIsEditMode(false);
                props.cancelEditMEBomTable();
              }
            }}
          >取消
          </Button>
          <Button
            round
            color="green"
            border={false}
            disabled={TableGridUtils.getErrorCounts(props.itemsValidateErrorObj) > 0}
            onClick={() => props.saveMEBomTable({ ceCanEditCost, sourcerCanEditCost })}
          >
            儲存
          </Button>
        </React.Fragment> :
        <Button
          color="black"
          round
          border={false}
          onClick={() => props.setIsEditMode(true)}
        >
          Edit Cost
        </Button>;
    };

    return (
      <div className="table-action-group__button-group">
        {completeAble &&
          <Button
            round
            color="green"
            disabled={!completeAble}
            onClick={handleComplete}
          >
            Version Complete
          </Button>
        }
        {
          showCeInform &&
          <Button
            round
            color="yellow"
            onClick={handleInformSourcer}
          >
            Inform Sourcer
          </Button>
        }
        {
          showSourcerInform &&
          <Button
            round
            color="yellow"
            onClick={handleInformCE}
          >
            Inform CE
          </Button>
        }
        {getEditBtns()}
      </div>
    );
  };


  const handleFilterColumns = (chooseItems) => {
    props.filterGridColumns(chooseItems);
  };

  return (
    <TableContainer>
      <BomItemHistoryModal
        isOpen={isHistoryModalOpen}
        toggleOpen={setIsHistoryModalOpen}
        bomId={bomID}
        sourceItemId={selectedSourceItemId}
      />
      <CancelEditAlert
        disabled={TableGridUtils.getErrorCounts(props.itemsValidateErrorObj) > 0}
        isOpen={isAlertShow}
        onSure={() => {
          // 存檔
          props.saveMEBomTable({ ceCanEditCost, sourcerCanEditCost });
          // 關窗
          setIsAlertShow(false);
        }}
        onCancel={() => {
          // 回到檢視模式
          props.setIsEditMode(false);
          // 關窗
          setIsAlertShow(false);
          // 回到為修改前的talbe
          props.cancelEditMEBomTable();
        }}
      />
      <div className="table-action-group">
        <div className="table-action-group-left">
          {/* 搜尋 */}
          <SearchBar
            value={searchValue.inputbom}
            placeholder="請輸入Part Name or Number"
            onKeywordChange={inputbom => props.updateSearchValue({ inputbom })}
            onClickSearch={handleClickSearch}
          />
          <SkuSelector />
          {/* 選顯示欄位的下拉 */}
          <ColumnFilter
            allColumns={allColumns}
            columns={columns}
            onClose={handleFilterColumns}
          />
        </div>
        {/* 按鈕們 */}
        {getButtons()}
      </div>
      {/* 表格 */}
      <SplitDataGrid
        key={dgUuid}
        bomID={bomID}
        updateRowItemValidateError={props.updateRowItemValidateError}
        updateMEBomTableCellById={props.updateMEBomTableCellById}
        itemsValidateErrorObj={props.itemsValidateErrorObj}
        isEditMode={isEditMode}
        rows={tableRows}
        onClickRow={handleClickRow}
        useCE={isCe}
        isAtAllTab={isAtAllTab}
        editAble={editAble && !historyMode}
        canEditCost={props.canEditCost}
        isInputBomInfoOpen={props.isInputBomInfoOpen}
        columns={columns}
        editableColumns={editableColumns}
        emptyRow={
          <EmptyRow>
            <div className="title">目前尚無資料</div>
            <div className="context">您可以透過 Add New Item 或 Import 按鈕新增</div>
          </EmptyRow>}
      />
    </TableContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    bomData: state.bomDetail.bomData,
    tmpMEBomTableList: state.bomDetail.tmpMEBomTableList,
    originalMEBomTableList: state.bomDetail.originalMEBomTableList,
    isEditMode: state.bomDetail.isEditMode,
    itemsValidateErrorObj: state.bomDetail.itemsValidateErrorObj,
    searchValue: state.bomDetail.searchValue,
    bomID: state.bomDetail.bomID,
    assignItem: state.bomDetail.assignItem,
    assignData: state.bomDetail.assignData,
    canEditWhenNPointSeven: state.bomDetail.canEditWhenNPointSeven,
    isInputBomInfoOpen: state.bomDetail.isInputBomInfoOpen,
    historyMode: state.bomDetail.historyMode,
    columns: state.bomDetail.columns,
    selectedSkuNum: state.bomDetail.selectedSkuNum,
    emdmImgList: state.bomDetail.emdmImgList,
  };
};

const mapDispatchToProps = {
  goToRouter: push,
  approveBomAction: BomDetailActions.approveBom,
  completeBomAction: BomDetailActions.completeBom,
  toggleBomItemModalAction: BomDetailActions.toggleBomItemModal,
  updateBomItemId: BomDetailActions.updateBomItemId,
  setIsEditMode: BomDetailActions.setIsEditMode,
  updateRowItemValidateError: BomDetailActions.updateRowItemValidateError,
  updateMEBomTableCellById: BomDetailActions.updateMEBomTableCellById,
  cancelEditMEBomTable: BomDetailActions.cancelEditMEBomTable,
  saveMEBomTable: BomDetailActions.saveMEBomTable,
  updateSearchValue: BomDetailActions.updateSearchValue,
  getBomItemList: BomDetailActions.getBomItemList,
  filterGridColumns: BomDetailActions.filterGridColumns,
  informSourcer: BomDetailActions.informSourcer,
  informCE: BomDetailActions.informCE,
  resetEmdmBomImage: BomDetailActions.resetEmdmBomImage,
  getEmdmBomImage: BomDetailActions.getEmdmBomImage,
};

export default compose(
  checkingRbac(),
  connect(mapStateToProps, mapDispatchToProps),
)(BomTable);
