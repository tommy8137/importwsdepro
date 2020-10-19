
export default function getRowColor(style, row, editAble) {
  let extendStyle = { ...style, backgroundColor: '#f0f0f0' };
  // 如果可以編輯的話就給他手勢
  if (editAble) {
    extendStyle = {
      ...extendStyle,
      cursor: 'pointer'
    };
  }
  // level2時背景是白色
  if (row.level && row.level === '2') {
    extendStyle = {
      ...extendStyle,
      backgroundColor: 'white'
    };
  }

  return extendStyle;
}
