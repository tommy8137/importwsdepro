import React from 'react';

import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import Icon, { IconName } from '~~elements/Icon';

function MemberCheckStatusCell(props) {
  const {
    cellInfo: { key, style },
    helperInfo: { row },
  } = props;
  const extendStyle = {
    ...style,
    ...DataGridStyles.borderRightStyle
  };

  // 個人submit -> 綠色空心圓勾
  if (row.is_personal_submitted) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.EmptyGreenCheck} />
      </div>
    );
  }

  // else !row.is_personal_submitted
  // 個人check, 個人沒submit -> 灰色空心圓勾
  if (row.is_personal_checked) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.EmptyGreyCheck} />
      </div>
    );
  }

  if (row.is_reject) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.EmptyReject} />
      </div>
    );
  }

  // else !row.is_personal_submitted && !row.is_personal_checked
  return (
    <div className="grid-cell" key={key} style={extendStyle} />
  );
}

export default MemberCheckStatusCell;
