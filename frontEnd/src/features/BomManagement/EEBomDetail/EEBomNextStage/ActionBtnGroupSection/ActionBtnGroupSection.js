
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Icon, { IconName } from '~~elements/Icon';
import Button, { BTN_COLOR } from '~~elements/Button';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import TableGridUtils from '~~utils/TableGridUtils';
import BeforeSubmitAlert from './BeforeSubmitAlert';
import CopyPriceModal from './CopyPriceModal';

const Wrapper = styled.div`
  &.action-btn-group-section-wrapper {
    /* width: 200px; */
    .button:not(last-child) {
      margin-right: 0.5rem;
    }
    .update-time-text {
      margin-right: 0.5rem;
      display: inline-block;
      vertical-align: middle;
      p {
        color: #333;
        font-size: 1rem;
        margin: 0%;
      }
      span {
        display: block;
        color: #949494;
        font-size: 0.95rem;
      }
    }
  }
`;


function ActionBtnGroupSection(props) {
  const {
    originalTableData,
    tableData,
    itemsValidateError,
    isBomApproved,
    edmVersionID,
    alertMessage,
    setAlertMessage,
    toggleCopyModal,
    triggerRefresh,
    refreshInfo,
    isEditMode
  } = props;
  const [isSubmitAlertShow, setIsSubmitAlertShow] = useState(false);


  // 可以submit的item
  const canSubmitItems = tableData.filter(i => i.is_personal_checked && !i.is_personal_submitted);
  // 修改的項目
  const modifiedItems = TableGridUtils.getModifiedItems(tableData, originalTableData);
  // 沒有修改也沒有錯誤才可以save
  const canSave = modifiedItems.length > 0 && TableGridUtils.getErrorCounts(itemsValidateError) === 0;
  const canSubmit = modifiedItems.length === 0 && TableGridUtils.getErrorCounts(itemsValidateError) === 0 && canSubmitItems.length > 0;
  /* ************************* 全部的item都submit，這個區塊就hide ************************* */
  if (isBomApproved) {
    return <div />;
  }
  if (originalTableData.every(i => i.is_personal_submitted)) {
    return <div />;
  }
  // 如果全部都已經被submit, 就不顯示按鈕
  if (tableData.every(i => i.is_personal_submitted)) {
    return <div />;
  }
  // 如果不可以編輯，就不顯示按鈕（x.0都不可以編輯）
  if (!isEditMode) {
    return <div />;
  }
  /* ************************* 全部的item都submit，這個區塊就hide END ************************* */

  const handleCloseCopyModal = () => {
    toggleCopyModal(false);
  };

  return (
    <Wrapper className="action-btn-group-section-wrapper">
      {refreshInfo.refreshTime &&
        <div className="update-time-text">
          <span>Update Time</span>
          <p>{refreshInfo.refreshTime}</p>
        </div>}
      {/* Refresh 按鈕 */}
      <Button
        className="e2e_action_refresh"
        round
        color={BTN_COLOR.TRANSPARENT}
        onClick={() => triggerRefresh(edmVersionID)}
        disabled={refreshInfo.isSaved}
      >
        <Icon icon={IconName.IcoRefresh} size="1.5rem" />
        Refresh
      </Button>

      {/* Copy Price按鈕 */}
      <Button
        className="e2e_action_copy"
        round
        color={BTN_COLOR.TRANSPARENT}
        onClick={() => toggleCopyModal(true)}
      >
        <Icon icon={IconName.IcoCopy} size="1.5rem" />
        Copy Price
      </Button>

      {/* Submit按鈕 */}
      <Button
        className="e2e_action_submit"
        round
        color={BTN_COLOR.GREEN}
        disabled={!canSubmit}
        onClick={() => setIsSubmitAlertShow(prevState => !prevState)}
      >Submit
      </Button >

      {/* Save按鈕 */}
      <Button
        className="e2e_action_save"
        round
        color={BTN_COLOR.BLACK}
        onClick={() => {
          // 整理資料格式
          const data = modifiedItems.map(item => {
            return {
              id: item.id,
              currrent_price_adj_percentage: item.currrent_price_adj_percentage,
              sourcer_cost: item.sourcer_cost,
              ce_cost: item.ce_cost,
              remark: item.remark,
              is_personal_checked: item.is_personal_checked,
              // 新的key
              is_leader_checked: item.is_leader_checked,
              is_personal_submitted: item.is_personal_submitted,
              leader_checked_status: item.leader_checked_status,
              leader_submitted_status: item.leader_submitted_status,
              is_reject: item.is_reject,
              is_common_parts: item.is_common_parts,
              // 傳入type1 type2
              type1: item.type1,
              type2: item.type2
            };
          });
          props.savePersonalTable(data);
        }}
        disabled={!canSave}
      >Save
      </Button>

      {/* Submit提示 */}
      <BeforeSubmitAlert
        content={<div>提交後您將無法針對已提交的項目做變更，<br />是否確定要提交?</div>}
        isOpen={isSubmitAlertShow}
        toggleAlert={() => setIsSubmitAlertShow(prevState => !prevState)}
        onSure={() => {
          const data = canSubmitItems.map(item => {
            return {
              id: item.id,
              currrent_price_adj_percentage: item.currrent_price_adj_percentage,
              sourcer_cost: item.sourcer_cost,
              ce_cost: item.ce_cost,
              remark: item.remark,
              is_personal_checked: item.is_personal_checked,
              // 新的key
              is_leader_checked: item.is_leader_checked,
              is_personal_submitted: true,
              leader_checked_status: item.leader_checked_status,
              leader_submitted_status: item.leader_submitted_status,
              is_reject: item.is_reject,
              is_common_parts: item.is_common_parts,
              // 傳入type1 type2
              type1: item.type1,
              type2: item.type2
            };
          });
          // call submit api
          props.submitPersonalTable(data);
          // 關窗
          setIsSubmitAlertShow(false);
        }}
      />

      {/* Refresh after edit alert */}
      <BeforeSubmitAlert
        content={<div>{alertMessage}</div>}
        isOpen={!!alertMessage}
        closeOnly
        onClose={() => setAlertMessage('')}
      />

      <CopyPriceModal />
    </Wrapper>
  );
}


const mapStateToProps = (state) => {
  return {
    isEditMode: state.eeBomPersonalReducer.isEditMode,
    tableData: state.eeBomPersonalReducer.tableData,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
    itemsValidateError: state.eeBomPersonalReducer.itemsValidateError,
    isBomApproved: state.eeBomPersonalReducer.isBomApproved,
    isOpenCopy: state.eeBomPersonalReducer.isOpenCopy,
    edmVersionID: state.eeBom.edmVersionID,
    alertMessage: state.eeBomPersonalReducer.alertMessage,
    refreshInfo: state.eeBomPersonalReducer.refreshInfo,
  };
};

const mapDispatchToProps = {
  savePersonalTable: EEBomPersonalActions.savePersonalTable,
  submitPersonalTable: EEBomPersonalActions.submitPersonalTable,
  toggleCopyModal: EEBomPersonalActions.toggleCopyModal,
  triggerRefresh: EEBomPersonalActions.triggerRefresh,
  setAlertMessage: EEBomPersonalActions.setAlertMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBtnGroupSection);
