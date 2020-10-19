import React from 'react';
import { connect } from 'react-redux';

import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';
import Icon, { IconName } from '~~elements/Icon';

function PersonalCheckedHeaderCell(props) {
  const {
    isEditMode,
    cellInfo: { key, style },
    tableData,
    isBomApproved,
    updatePersonalTableRowItemByIdList
  } = props;

  const extendStyle = {
    ...style,
    ...DataGridStyles.borderRightStyle
  };

  /*
  可以修改的項目
  1. 個人還沒submit !i.is_personal_submitted
  */
  const canEditItems = tableData.filter(i => !i.is_personal_submitted);
  // 全選的條件：可以修改的項目的is_personal_checked皆為true
  const isMemberSelectAll = canEditItems.every(x => x.is_personal_checked);

  // 唯讀模式： 如果是x.0, 就不可以編輯, 只會顯示空的灰色圈圈
  if (!isEditMode) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.disabled} />
      </div>
    );
  }

  // 不可編輯灰色勾勾：全部的item都submit，就是灰色的
  if (isBomApproved) {
    return (
      <div className="grid-cell" key={key} style={extendStyle}>
        <Icon icon={IconName.GreyCheck} />
      </div>
    );
  }

  // 空的： 沒有任何項目可以被編輯，就是空白不能選的框框
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
      <GreenCircleCheckBox
        isCheck={isMemberSelectAll}
        handleClick={() => {
          // 全選的id清單
          const selectAllIdList = canEditItems.map(i => i.id);
          if (isMemberSelectAll) {
            // 變成全不選
            updatePersonalTableRowItemByIdList(selectAllIdList, 'is_personal_checked', false);
          } else {
            // 變成全選
            updatePersonalTableRowItemByIdList(selectAllIdList, 'is_personal_checked', true);
          }
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isEditMode: state.eeBomPersonalReducer.isEditMode,
    tableData: state.eeBomPersonalReducer.tableData,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
    isBomApproved: state.eeBomPersonalReducer.isBomApproved,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
  updatePersonalTableRowItemByIdList: EEBomPersonalActions.updatePersonalTableRowItemByIdList,
};


export default connect(mapStateToProps, mapDispatchToProps)(PersonalCheckedHeaderCell);
