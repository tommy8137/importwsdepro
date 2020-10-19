import * as R from 'ramda';
import * as DataGridStyles from '~~features/BomManagement/EEBomDetail/EEBomNextStage/DataGrid/DataGridStyles';


export default function getRowColor(style, row, selectedList, lastModifiedItems) {
  let extendStyle = { ...style };

  if (row.leader_submitted_status === 'approve') {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.SUBMIT_BACKGROUND_COLOR
    };
    return extendStyle;
  }

  if (row.leader_checked_status === 'approve') {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.CHECKED_BACKGROUND_COLOR
    };
    return extendStyle;
  }

  if (row.leader_checked_status === 'reject' || row.is_reject) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: DataGridStyles.REJECTED_COLOR
    };
    return extendStyle;
  }

  // TODO 測試的時候先不要打開
  // if (R.contains(row.id, lastModifiedItems)) {
  //   extendStyle = {
  //     ...extendStyle,
  //     backgroundColor: DataGridStyles.LAST_MODIFIED_BACKGROUND_COLOR
  //   };
  //   return extendStyle;
  // }

  return extendStyle;
}
