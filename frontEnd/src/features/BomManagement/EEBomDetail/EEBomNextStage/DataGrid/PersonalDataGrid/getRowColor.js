import * as R from 'ramda';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';

export default function getRowColor(style, row, lastModifiedItems) {
  let extendStyle = { ...style };
  // // FIXME 要再確認一下 leader介入就是灰色
  // if (row.leader_checked_status !== null) {
  //   extendStyle = {
  //     ...extendStyle,
  //     backgroundColor: DataGridStyles.SUBMIT_BACKGROUND_COLOR
  //   };
  //   return extendStyle;
  // }
  // 紅
  if (row.is_reject) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.REJECTED_COLOR
    };
    return extendStyle;
  }

  // 灰
  if (row.is_personal_submitted) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.SUBMIT_BACKGROUND_COLOR
    };
    return extendStyle;
  }

  // 藍
  if (row.is_personal_checked) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.CHECKED_BACKGROUND_COLOR
    };
    return extendStyle;
  }

  // 黃
  if (row.is_by_copy) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.BY_COPY_BACKGROUND_COLOR,
    };
    return extendStyle;
  }


  // TODO 測試的時候先不要打開
  // if (R.contains(row.id, lastModifiedItems)) {
  //   extendStyle = {
  //     ...extendStyle,
  //     backgroundColor: DataGridStyles.LAST_MODIFIED_BACKGROUND_COLOR
  //   };
  //   return extendStyle
  // }

  return extendStyle;
}
