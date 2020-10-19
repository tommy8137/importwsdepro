import * as R from 'ramda';
import _includes from 'lodash/includes';

export default function getRowColor(style, row, rowIndex, hoverIndex, keyVal, highLightIndexList = []) {
  let extendStyle = { ...style };
  if (!row) {
    return extendStyle;
  }

  // 如果被hover就變底色
  if (rowIndex === hoverIndex) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: '#ededed'
    };
  }

  // 如果是第０格的話, 底下會由藍色的border
  if (rowIndex === 0) {
    extendStyle = {
      ...extendStyle,
      borderBottom: '2px solid #7c90a9'
    };
  }
  // 如果是第０行的unitPrice就是紅色的
  if (keyVal === 'unitPrice' && rowIndex === 0) {
    extendStyle = {
      ...extendStyle,
      color: 'red'
    };
  }

  // 如果rowIndex有在hight list 裡面的話就給他一個黃色底
  if (_includes(highLightIndexList, rowIndex)) {
    extendStyle = {
      ...extendStyle,
      backgroundColor: '#fff3d2'
    };
  }
  return extendStyle;
}
