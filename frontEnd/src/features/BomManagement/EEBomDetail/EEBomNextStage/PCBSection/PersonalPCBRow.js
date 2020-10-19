import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { comma } from '~~utils/Math';
import Button from '~~elements/Button';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import BeforeSubmitAlert from '~~features/BomManagement/EEBomDetail/EEBomNextStage/ActionBtnGroupSection/BeforeSubmitAlert';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import Icon, { IconName } from '~~elements/Icon';
import SetPCBDetailModal from './SetPCBDetailModal';
import PCBRowWrap from './PCBRowStyles';

const PersonalPCBRow = (props) => {
  const { PCBInfo, tabInfo: { edm_version_id: edmVersionID }, isEditMode } = props;
  const [originInfo, setOriginInfo] = useState(PCBInfo.pcbInfo);
  const [presentInfo, setPresentInfo] = useState(PCBInfo.pcbInfo);
  const [isSubmitAlertShow, setIsSubmitAlertShow] = useState(false);
  const [PCBModalOpen, setPCBModalOpen] = useState(false);
  const [isViewMode, setIsview] = useState(false);

  // 1. 個人已經submit -> 檢視模式
  const isSubmit = originInfo.is_pcb_personal_submitted;
  // 有修改item，才可以存檔
  const canSave = !R.equals(originInfo, presentInfo);
  // 沒有修改item，而且is_pcb_personal_checked=true
  const canSubmit = presentInfo.is_pcb_personal_checked && R.equals(originInfo, presentInfo);
  useEffect(() => {
    setOriginInfo(PCBInfo.pcbInfo);
    setPresentInfo(PCBInfo.pcbInfo);
    return () => {
      setOriginInfo(null);
      setPresentInfo(null);
    };
  }, [JSON.stringify(PCBInfo.pcbInfo)]);

  function renderLeft() {
    // 被submit: 只能view, 顯示灰色勾勾

    if (isSubmit) {
      return (
        <div className="left">
          <div><Icon icon={IconName.GreyCheck} /></div>
          <div className="title">PCB</div>
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
        </div>
      );
    }
    // 被submit: 只能view, 顯示
    if (!isEditMode) {
      return (
        <div className="left">
          <div><Icon icon={IconName.Disable} /></div>
          <div className="title">PCB</div>
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
        </div>
      );
    }
    return (
      <div className="left">
        <GreenCircleCheckBox
          isCheck={presentInfo.is_pcb_personal_checked}
          handleClick={() => {
            setPresentInfo(prevState => {
              return {
                ...prevState,
                is_pcb_personal_checked: !presentInfo.is_pcb_personal_checked
              };
            });
          }}
        />
        <div className="title">PCB</div>
        <Button
          e2e="setPcbBtn"
          round
          color="transparent"
          onClick={() => {
            setIsview(false);
            setPCBModalOpen(true);
            props.getTableData();
          }}
        >Set PCB Detail
        </Button>
      </div>
    );
  }


  function renderActionBtn() {
    // 如果已經被submit 或是 不能編輯，就不顯示任何按鈕
    if (!isEditMode || isSubmit) {
      return <div className="action-btn-group-section-wrapper" />;
    }
    //
    return (
      <div className="action-btn-group-section-wrapper e2e_pcb_row">
        <Button
          round
          color="green"
          onClick={() => setIsSubmitAlertShow(prevState => !prevState)}
          disabled={!canSubmit}
        >Submit
        </Button>
        <Button
          round
          color="black"
          disabled={!canSave}
          onClick={() => {
            const data = {
              edm_version_id: edmVersionID,
              is_pcb_personal_checked: presentInfo.is_pcb_personal_checked
            };
            props.updatePCBPersonalCheck(data);
          }}
        >Save
        </Button>
        <BeforeSubmitAlert
          content={<div>提交後您將無法針對已提交的項目做變更，<br />是否確定要提交?</div>}
          isOpen={isSubmitAlertShow}
          toggleAlert={() => setIsSubmitAlertShow(prevState => !prevState)}
          onSure={() => {
            // submit 只能送true
            const data = {
              edm_version_id: edmVersionID,
              is_personal_submitted: true
            };
            props.updatePCBPersonalSubmit(data);
            // 關窗
            setIsSubmitAlertShow(false);
          }}
        />
      </div>
    );
  }

  function getRowColor() {
    // 紅
    if (presentInfo.is_reject) {
      return DataGridStyles.REJECTED_COLOR;
    }
    // 灰
    if (presentInfo.is_pcb_personal_submitted) {
      return DataGridStyles.SUBMIT_BACKGROUND_COLOR;
    }
    // 藍
    if (presentInfo.is_pcb_personal_checked) {
      return DataGridStyles.CHECKED_BACKGROUND_COLOR;
    }

    // 白
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
      {renderLeft()}
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
    isEditMode: state.eeBomPersonalReducer.isEditMode,
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
  };
};

const mapDispatchToProps = {
  getTableData: EEBomPersonalActions.getTableData,
  updatePCBPersonalCheck: EEBomPersonalActions.updatePCBPersonalCheck,
  updatePCBPersonalSubmit: EEBomPersonalActions.updatePCBPersonalSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPCBRow);

/*
不應該發生的情況：
{
  "is_pcb_personal_checked": true,
  "is_pcb_personal_submitted": true,
  "leader_checked_status": 'approve',
  "leader_submitted_status": 'approve',
  "is_reject": true,
}
送出"leader_submitted_status": 'approve'，後端就應該把is_reject改成false


{
  "is_pcb_personal_checked": false,
  "is_pcb_personal_submitted": false,
  "leader_checked_status": 'approve',
  "leader_submitted_status": 'approve',
  "is_reject": true,
}

送出"leader_submitted_status": 'approve'，後端就應該把is_reject改成false, is_pcb_personal_checked和is_pcb_personal_submitted改成true


{
  "is_pcb_personal_checked": false,
  "is_pcb_personal_submitted": false,
  "leader_checked_status": null,
  "leader_submitted_status": null,
  "is_reject": true,
}

null不應該被submit

*/
