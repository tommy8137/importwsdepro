import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import Icon, { IconName } from '~~elements/Icon';
import MultiCircleCheck from '../../../../component/CircleCheck/MultiCircleCheck';


function ApproverCheckedCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { row },
    value,
    updatePersonalTableRowItemById
  } = props;

  const extendStyle = {
    ...style,
    ...DataGridStyles.borderRightStyle
  };

  // 只能修改leader_submitted_status: true的項目，除非is_reject: true
  // leader_submitted_status: true -> 不能改

  if (row.leader_submitted_status === 'approve') {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.GreyCheck} />
      </div>
    );
  }

  // [特殊]relect member的項目，還是可以改
  // is_personal_submitted 可以改
  if (row.is_reject || row.is_personal_submitted) {
    return (
      <div
        className="grid-cell"
        key={key}
        style={extendStyle}
      >
        <MultiCircleCheck
          id={key}
          checkedStatus={value}
          handleClick={(option) => {
            updatePersonalTableRowItemById(row.id, 'leader_checked_status', option);
          }}
        />
      </div>
    );
  }

  // 其他情況都不能改
  return (
    <div className="grid-cell" key={key} style={extendStyle}>
      <Icon icon={IconName.Disable} />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
};


export default connect(mapStateToProps, mapDispatchToProps)(ApproverCheckedCell);

