import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import Icon, { IconName } from '~~elements/Icon';
import MultiCircleCheck from '../../../../component/CircleCheck/MultiCircleCheck';


function ApproverCheckedHeaderCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    tableData,
    isBomApproved
  } = props;

  const extendStyle = {
    ...style,
    ...DataGridStyles.borderRightStyle
  };

  /*
  可以修改的項目
  1. 個人submit  -> i.is_personal_submitted
  2. 被拒絕的項目  -> is_reject
  3. leader_submitted_status !== 'approve'
  tableData.filter(i => i.is_personal_submitted || i.is_reject)
  */
  const canEditItems = tableData.filter(i => (i.is_reject || i.is_personal_submitted)).filter(i => i.leader_submitted_status !== 'approve');


  function getCheckedStatus() {
    // 全approve：可以修改的項目的leader_checked_status皆為'approve'
    const isLeaderAllApprove = canEditItems.every(x => x.leader_checked_status === 'approve');
    // 全reject：可以修改的項目的leader_checked_status皆為'approve'
    const isLeaderAllReject = canEditItems.every(x => x.leader_checked_status === 'reject');
    // 全reset：可以修改的項目的leader_checked_status皆為null
    const isLeaderAllNull = canEditItems.every(x => x.leader_checked_status === null);

    if (isLeaderAllApprove) {
      return 'approve';
    }
    if (isLeaderAllReject) {
      return 'reject';
    }
    if (isLeaderAllNull) {
      return null;
    }
    return null;
  }


  // 全部的item都submit，就是灰色的
  if (isBomApproved) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.GreyCheck} />
      </div>
    );
  }

  // 沒有可以改的項目
  if (canEditItems.length === 0) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.Disable} />
      </div>
    );
  }

  return (
    <div
      className="grid-cell"
      key={key}
      style={extendStyle}
    >
      <MultiCircleCheck
        id="approver-header"
        checkedStatus={getCheckedStatus()}
        handleClick={(option) => {
          // 全選的id清單
          const selectAllIdList = canEditItems.map(i => i.id);
          props.updatePersonalTableRowItemByIdList(selectAllIdList, 'leader_checked_status', option);
        }}
      />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    tableData: state.eeBomPersonalReducer.tableData,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
    isBomApproved: state.eeBomPersonalReducer.isBomApproved,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemByIdList: EEBomPersonalActions.updatePersonalTableRowItemByIdList,
};


export default connect(mapStateToProps, mapDispatchToProps)(ApproverCheckedHeaderCell);

