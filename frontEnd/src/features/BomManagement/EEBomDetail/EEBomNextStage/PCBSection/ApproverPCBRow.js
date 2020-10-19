import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { comma } from '~~utils/Math';
import Button from '~~elements/Button';
import MultiCircleCheck from '~~features/BomManagement/EEBomDetail/component/CircleCheck/MultiCircleCheck';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import Icon, { IconName } from '~~elements/Icon';
import BeforeSubmitAlert from '~~features/BomManagement/EEBomDetail/EEBomNextStage/ActionBtnGroupSection/BeforeSubmitAlert';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import VersionRemarkAlert from '~~features/BomManagement/EEBomDetail/EEBomNextStage/ActionBtnGroupSection/VersionRemarkAlert';
import PCBRowWrap from './PCBRowStyles';
import SetPCBDetailModal from './SetPCBDetailModal';


// TODO isBomApproved 要跳version alert
const ApproverPCBRow = (props) => {
  const { PCBInfo, tabInfo: { edm_version_id: edmVersionID } } = props;
  const [originInfo, setOriginInfo] = useState(PCBInfo.pcbInfo);
  const [presentInfo, setPresentInfo] = useState(PCBInfo.pcbInfo);
  const [isSubmitAlertShow, setIsSubmitAlertShow] = useState(false);
  const [PCBModalOpen, setPCBModalOpen] = useState(false);
  const [isViewMode, setIsview] = useState(false);
  const [isVersionRemarkAlertShow, setVersionRemarkAlert] = useState(false);

  // leader_checked_status是什麼(只能送approve, reject，null不能送)，leader_submitted_status 就送什麼
  const submitData = {
    edm_version_id: edmVersionID,
    leader_submitted_status: presentInfo.leader_checked_status
  };

  // 有修改，才可以存檔
  const canSave = !R.equals(originInfo, presentInfo);
  // 沒有修改，presentInfo.leader_checked_status !== null(approve和reject才可以送)
  const canSubmit = R.equals(originInfo, presentInfo) && presentInfo.leader_checked_status !== null;
  useEffect(() => {
    setOriginInfo(PCBInfo.pcbInfo);
    setPresentInfo(PCBInfo.pcbInfo);
    return () => {
      setOriginInfo(null);
      setPresentInfo(null);
    };
  }, [JSON.stringify(PCBInfo.pcbInfo)]);


  function renderLeaderStatus() {
    if (originInfo.leader_submitted_status === 'approve') {
      return (
        <Icon icon={IconName.GreyCheck} />
      );
    }

    if (originInfo.is_reject || originInfo.is_pcb_personal_submitted) {
      return (
        <MultiCircleCheck
          id="pcbPopover"
          checkedStatus={presentInfo.leader_checked_status}
          handleClick={(option) => {
            setPresentInfo(prevState => {
              return {
                ...prevState,
                leader_checked_status: option
              };
            });
          }}
        />
      );
    }
    // 其他情況都不能改
    return (
      <Icon icon={IconName.Disable} />
    );
  }

  function renderMemberStatus() {
    if (originInfo.is_pcb_personal_submitted) {
      return (
        <Icon icon={IconName.EmptyGreenCheck} />
      );
    }
    // else !originInfo.is_pcb_personal_submitted
    if (originInfo.is_pcb_personal_checked) {
      return (
        <Icon icon={IconName.EmptyGreyCheck} />
      );
    }
    if (originInfo.is_reject) {
      return (
        <Icon icon={IconName.EmptyReject} />
      );
    }
    // else !originInfo.is_pcb_personal_submitted && !originInfo.is_pcb_personal_checked
    return (
      <div />
    );
  }

  function renderPCBDetailBtn() {
    if (originInfo.leader_submitted_status === 'approve') {
      return (
        <Button
          round
          color="transparent"
          onClick={() => {
            setIsview(true);
            setPCBModalOpen(true);
            props.getTableData();
          }}
        >View PCB Detail
        </Button>
      );
    }

    if (originInfo.is_reject || originInfo.is_pcb_personal_submitted) {
      return (
        <Button
          round
          color="transparent"
          onClick={() => {
            setIsview(false);
            setPCBModalOpen(true);
            props.getTableData();
          }}
        >Set PCB Detail
        </Button>
      );
    }
    // 其他情況都不能改
    return (
      <div />
    );
  }

  function renderActionBtn() {
    // 如果已經被approve過，或不可編輯就不顯示按鈕
    if (originInfo.leader_submitted_status === 'approve') {
      return <div className="action-btn-group-section-wrapper" />;
    }
    return (
      <div className="action-btn-group-section-wrapper e2e_pcb_row">
        <Button
          className="e2e_action_submit"
          round
          color="green"
          onClick={() => {
            setIsSubmitAlertShow(prevState => !prevState);
          }}
          disabled={!canSubmit}
        >Submit
        </Button>
        <Button
          className="e2e_action_save"
          round
          color="black"
          disabled={!canSave}
          onClick={() => {
            const data = {
              edm_version_id: edmVersionID,
              leader_checked_status: presentInfo.leader_checked_status
            };
            props.updatePCBLeaderCheck(data);
          }}
        >Save
        </Button>
        <BeforeSubmitAlert
          content={<div>提交後您將無法針對已核准的項目做變更，<br />是否確定要提交?</div>}
          isOpen={isSubmitAlertShow}
          toggleAlert={() => {
            setIsSubmitAlertShow(prevState => !prevState);
          }}
          onSure={() => {
            if (PCBInfo.pcbInfo.is_bom_approved && presentInfo.leader_checked_status === 'approve') {
              setVersionRemarkAlert(true);
              setIsSubmitAlertShow(false);
            } else {
              props.updatePCBLeaderSubmit(submitData);
              // 關窗
              setIsSubmitAlertShow(false);
            }
          }}
        />
        {isVersionRemarkAlertShow && <VersionRemarkAlert
          isOpen={isVersionRemarkAlertShow}
          toggleAlert={() => {
            setVersionRemarkAlert(prevState => !prevState);
          }}
          onSure={(values) => {
            const submitDataWithVersionRemark = { ...submitData, version_remark: values.versionRemark };
            props.updatePCBLeaderSubmit(submitDataWithVersionRemark);
            setVersionRemarkAlert(false);
          }}
        />}
      </div>
    );
  }

  function getRowColor() {
    // 灰
    if (presentInfo.leader_submitted_status === 'approve') {
      return DataGridStyles.SUBMIT_BACKGROUND_COLOR;
    }

    // 藍
    if (presentInfo.leader_checked_status === 'approve') {
      return DataGridStyles.CHECKED_BACKGROUND_COLOR;
    }

    // TODO reject的顏色
    if (presentInfo.leader_checked_status === 'reject' || presentInfo.is_reject) {
      return DataGridStyles.REJECTED_COLOR;
    }

    return '#fff';
  }
  return (
    <PCBRowWrap backgroundColor={getRowColor()}>
      <SetPCBDetailModal
        isViewMode={isViewMode}
        edmVersionID={edmVersionID}
        isOpen={PCBModalOpen}
        toggle={(value) => {
          if (!value) {
            setPCBModalOpen(false);
            props.getTableData();
          }
        }}
      />
      <div className="left">
        <div style={{ display: 'flex' }}>
          <div style={{ width: '26px', textAlign: 'center' }}>{renderLeaderStatus()}</div>
          <div style={{ width: '76px', textAlign: 'center' }}>{renderMemberStatus()}</div>
        </div>
        <div className="title">PCB</div>
        {renderPCBDetailBtn()}
      </div>
      <div className="right">
        <div className="priceInfo">
          <div className="priceTitle">PCB Total Cost</div>
          <div className="price">USD${comma(originInfo.pcbTotalPrice)}</div>
        </div>
        {renderActionBtn()}
      </div>
    </PCBRowWrap>
  );
};


const mapStateToProps = (state) => {
  return {
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
  };
};

const mapDispatchToProps = {
  getTableData: EEBomPersonalActions.getTableData,
  updatePCBLeaderCheck: EEBomPersonalActions.updatePCBLeaderCheck,
  updatePCBLeaderSubmit: EEBomPersonalActions.updatePCBLeaderSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproverPCBRow);
