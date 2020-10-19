
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import RoundButton from '~~elements/RoundButton';
import Button, { BTN_COLOR } from '~~elements/Button';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import TableGridUtils from '~~utils/TableGridUtils';
import BeforeSubmitAlert from './BeforeSubmitAlert';
import VersionRemarkAlert from './VersionRemarkAlert';

const Wrapper = styled.div`
  &.action-btn-group-section-wrapper {
    /* width: 200px; */
    .button:not(last-child) {
      margin-right: 0.5rem;
    }
  }
`;


function ActionBtnGroupSection(props) {
  const {
    originalTableData,
    tableData,
    itemsValidateError,
    isBomApproved,
    isPCBApproved
  } = props;
  const [isApproveAlertShow, setIsApproveAlertShow] = useState(false);
  const [isVersionRemarkAlertShow, setVersionRemarkAlert] = useState(false);

  // 可以submit的item
  const canSubmitItems = tableData.filter(i => i.leader_submitted_status !== 'approve' && i.leader_checked_status !== null);
  // 修改的項目
  const modifiedItems = TableGridUtils.getModifiedItems(tableData, originalTableData);
  // 有修改，沒有錯誤才可以save
  const canSave = modifiedItems.length > 0 && TableGridUtils.getErrorCounts(itemsValidateError) === 0;
  // 沒有修改，沒有錯誤就可以submit (因為submit的狀態可能是approve, reject, null，無法區分已經有submit過的就不要再submit，全部都送給後端處理)
  const canSubmit = modifiedItems.length === 0 && TableGridUtils.getErrorCounts(itemsValidateError) === 0 && canSubmitItems.length > 0;
  // FIXME 可以送出的item有誰？
  const submittedInfo = canSubmitItems.map(item => {
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
      leader_submitted_status: item.leader_checked_status,
      is_reject: item.is_reject,
      is_common_parts: item.is_common_parts,
      // 傳入type1 type2
      type1: item.type1,
      type2: item.type2
    };
  });

  if (isBomApproved) {
    return <div />;
  }
  if (tableData.every(i => i.leader_submitted_status === 'approve')) {
    return <div />;
  }
  return (
    <Wrapper className="action-btn-group-section-wrapper e2e_approver_action">
      <Button
        className="e2e_action_submit"
        round
        border={false}
        color={BTN_COLOR.GREEN}
        disabled={!canSubmit}
        onClick={() => setIsApproveAlertShow(prevState => !prevState)}
      >Submit
      </Button>
      <Button
        className="e2e_action_save"
        round
        border={false}
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
          props.saveLeaderTable(data);
        }}
        disabled={!canSave}
      >Save
      </Button>
      <BeforeSubmitAlert
        content={<div>提交後您將無法針對已核准的項目做變更，<br />是否確定要提交?</div>}
        isOpen={isApproveAlertShow}
        toggleAlert={() => setIsApproveAlertShow(prevState => !prevState)}
        onSure={() => {
          if (isPCBApproved && originalTableData.every(i => i.leader_checked_status === 'approve')) {
            // 再跳一個編remark的窗
            setVersionRemarkAlert(true);
            setIsApproveAlertShow(false);
          } else {
            props.updateLeaderSubmit({ info: submittedInfo });
            // 關窗
            setIsApproveAlertShow(false);
          }
        }}
      />
      {isVersionRemarkAlertShow &&
        <VersionRemarkAlert
          isOpen={isVersionRemarkAlertShow}
          toggleAlert={() => setVersionRemarkAlert(prevState => !prevState)}
          onSure={(values) => {
            props.updateLeaderSubmit({ info: submittedInfo, version_remark: values.versionRemark });
            // 關窗
            setVersionRemarkAlert(false);
          }}
        />}
    </Wrapper>
  );
}


const mapStateToProps = (state) => {
  return {
    tableData: state.eeBomPersonalReducer.tableData,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
    itemsValidateError: state.eeBomPersonalReducer.itemsValidateError,
    isBomApproved: state.eeBomPersonalReducer.isBomApproved,
    isPCBApproved: state.eeBomPersonalReducer.isPCBApproved,
  };
};

const mapDispatchToProps = {
  saveLeaderTable: EEBomPersonalActions.saveLeaderTable,
  updateLeaderSubmit: EEBomPersonalActions.updateLeaderSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBtnGroupSection);
