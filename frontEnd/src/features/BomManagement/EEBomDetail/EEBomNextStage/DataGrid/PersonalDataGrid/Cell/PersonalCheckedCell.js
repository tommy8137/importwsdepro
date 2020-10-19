import React from 'react';
import { connect } from 'react-redux';

import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import Icon, { IconName } from '~~elements/Icon';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';

function PersonalCheckedCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    helperInfo: { row, columnKey },
    value,
    isEditMode
  } = props;

  const extendStyle = {
    ...style,
    ...DataGridStyles.borderRightStyle
  };

  // 灰色check的勾勾： 如果它已經被submit，就不可以編輯，只會顯示灰色check勾勾
  const isSubmit = row.is_personal_submitted;
  // 如果personal submit就不能修改了
  if (isSubmit) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.GreyCheck} />
      </div>
    );
  }

  // TODO:  唯讀模式: 如果有 isEditMode 才可以編輯
  if (!isEditMode) {
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
      <GreenCircleCheckBox
        isCheck={value}
        handleClick={(check) => {
          props.updatePersonalTableRowItemById(row.id, columnKey, !row[columnKey]);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isEditMode: state.eeBomPersonalReducer.isEditMode,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
};


export default connect(mapStateToProps, mapDispatchToProps)(PersonalCheckedCell);
